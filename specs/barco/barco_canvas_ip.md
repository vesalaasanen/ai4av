---
spec_id: admin/barco-canvas
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Canvas Control Spec"
manufacturer: Barco
model_family: Canvas
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Canvas
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:48:11.427Z
last_checked_at: 2026-10-07T13:16:18.501Z
generated_at: 2026-10-07T13:16:18.501Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source uses \"Pulse projectors\" generically; model-specific feature availability (e.g. motorized zoom, DMX channels) depends on configuration per source note"
  - "code length/format not specified; example uses 5-digit integer (98765)"
  - "serial-only ASCII command; sent to RS-232 port to wake from ECO"
  - "authenticate `code` format/length not specified beyond example of 5-digit integer; authentication request required for elevated access only, but exact access-level semantics not enumerated."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:18.501Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 action units match source methods, properties, file endpoints and serial wake command; transport supported; coverage ~71/75. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Canvas Control Spec

## Summary
Control spec for Barco Canvas projectors using the Pulse API. Exposes a JSON-RPC 2.0 service over TCP/IP (port 9090) and over RS-232 serial (19200 baud, 8N1). Covers power, input source selection, illumination/laser power, image properties, warping, blending, environment telemetry, and DMX configuration.

<!-- UNRESOLVED: source uses "Pulse projectors" generically; model-specific feature availability (e.g. motorized zoom, DMX channels) depends on configuration per source note -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: "/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # authenticate method with secret pass code; skippable for normal end-user access
  # UNRESOLVED: code length/format not specified; example uses 5-digit integer (98765)
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff
- routable        # image.window.main.source (input source selection)
- queryable       # property.get / property.subscribe
- levelable       # image.brightness, contrast, gamma, saturation, sharpness; illumination.sources.laser.power
- subscribable    # property.subscribe, signal.subscribe (changes/notification stream)
```

## Actions
```yaml
# CRITICAL: every JSON-RPC method + property.set + property.get + property.subscribe +
# property.unsubscribe + signal.subscribe + signal.unsubscribe + introspect + authenticate
# enumerated below as a separate action. Commands shown as JSON-RPC request bodies verbatim.

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: id
      type: integer
      description: Request identifier
    - name: code
      type: integer
      description: Secret pass code (skippable for normal end-user access)

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

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "system.state")

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: string
      description: Value appropriate for property type (int/float/bool/string)

- id: get_multiple_properties
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: Array of property names

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string
      description: Single property name (or array for multiple)

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string
      description: Single property name (or array for multiple)

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array)

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array)

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation; default empty introspects everything)
    - name: recursive
      type: boolean
      description: If false, only one level listed (default true)

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

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors"}'
  params: []

- id: image_connector_detectedsignal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"}}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params:
    - name: type
      type: string
      description: Sensor type (Sensor/Filter/Controller/Actuator/Alarm/GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature/Speed/PWM/Voltage/Current/Power/...)

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to copy from

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

# --- Property setting actions (one per named property in the source) ---

- id: set_image_window_main_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source-name>"}}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI"); list via image.source.list

- id: set_image_window_main_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: value
      type: object
      description: "Window position: {x:int, y:int}"

- id: set_image_window_main_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}}}'
  params:
    - name: value
      type: object
      description: "Window size: {width:int, height:int}"

- id: set_image_window_main_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: string
      description: "Scaling mode: Fill | OneToOne | FillScreen | Stretch"

- id: set_image_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0}}'
  params:
    - name: value
      type: float
      description: "Normalized -1..1 (step 0.01, default 0)"

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1}}'
  params:
    - name: value
      type: float
      description: "Normalized 0..2 (step 0.01, default 1)"

- id: set_image_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: "1..3 (step 0.1, default 2.2)"

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1}}'
  params:
    - name: value
      type: float
      description: "Normalized 0..2 (step 0.01, default 1)"

- id: set_image_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: "-2..8 (default 0)"

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      description: "DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"

- id: set_illumination_sources_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40}}'
  params:
    - name: value
      type: integer
      description: Target power in percent (within minpower..maxpower range)

- id: set_image_processing_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Globally enable/disable warp

- id: set_image_processing_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
  params:
    - name: value
      type: string
      description: Warp file name to activate

- id: set_image_processing_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable file-based warp

- id: set_image_processing_blend_file_selected
  label: Select Blend File(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["mask.png"]}}'
  params:
    - name: value
      type: array
      description: Array of blend file names

- id: set_image_processing_blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable file-based blend

- id: set_image_processing_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
  params:
    - name: value
      type: string
      description: Black level file name to activate

- id: set_image_processing_blacklevel_file_enable
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable black level correction

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<mode>"}}'
  params:
    - name: value
      type: string
      description: DMX mode name (from dmx.listmodes)

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: "DMX start channel 1..512"

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false}}'
  params:
    - name: value
      type: boolean
      description: DMX shutdown enabled or not

- id: set_network_device_lan_ip4config
  label: Set LAN IPv4 Config
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{"Address":"","Mask":"","Gateway":"","NameServers":""}}}'
  params:
    - name: value
      type: object
      description: "IPv4 config: {Address, Mask, Gateway, NameServers}"

- id: set_optics_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: string
      description: "Open | Closed"

- id: set_optics_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0}}'
  params:
    - name: value
      type: integer
      description: Zoom position

- id: set_optics_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0}}'
  params:
    - name: value
      type: integer
      description: Focus position

- id: set_optics_lensshift_horizontal_position
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0}}'
  params:
    - name: value
      type: integer
      description: Horizontal lens shift position

- id: set_optics_lensshift_vertical_position
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0}}'
  params:
    - name: value
      type: integer
      description: Vertical lens shift position

- id: set_system_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable use of standby state (check availability first)

- id: set_system_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable use of ECO state (check availability first)

# --- File upload (HTTP) actions ---

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<host>/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address (e.g. 192.168.1.100)

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<host>/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<host>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: download_warp_file
  label: Download Warp Grid File
  kind: action
  command: 'curl -O -J http://<host>/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

# --- Serial-only ECO wake action ---

- id: serial_wake_from_eco
  label: Wake from ECO (Serial)
  kind: action
  command: ":POWR1\r"
  # UNRESOLVED: serial-only ASCII command; sent to RS-232 port to wake from ECO
  params: []

- id: get_illumination_sources_laser_minpower
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params:
    - name: property
      type: string
      description: illumination.sources.laser.minpower

- id: get_illumination_sources_laser_maxpower
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params:
    - name: property
      type: string
      description: illumination.sources.laser.maxpower

- id: get_network_device_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params:
    - name: property
      type: string
      description: network.device.lan.state

- id: get_optics_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params:
    - name: property
      type: string
      description: optics.shutter.position

- id: get_environment_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params:
    - name: property
      type: string
      description: environment.alarmstate
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error, service]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
  query_command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
- id: signal_modelupdated
  type: object
  description: Emitted when object structure changes (objects added/removed); payload {object, isnew}
- id: property_changed
  type: object
  description: Notification sent when a subscribed property value changes; payload {property: [{name: value}]}
- id: signal_callback
  type: object
  description: Notification for subscribed signal; payload {signal: [{name: {args}}]}
```

## Variables
```yaml
- id: illumination_sources_laser_power
  type: integer
  description: Target laser power in percent (RW)
- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent (read-only, dynamic)
- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent (read-only, dynamic)
- id: image_brightness
  type: float
  description: "Normalized -1..1, default 0 (RW)"
- id: image_contrast
  type: float
  description: "Normalized 0..2, default 1 (RW)"
- id: image_gamma
  type: float
  description: "1..3, default 2.2 (RW)"
- id: image_saturation
  type: float
  description: "Normalized 0..2, default 1 (RW)"
- id: image_sharpness
  type: integer
  description: "-2..8, default 0 (RW)"
- id: optics_zoom_position
  type: integer
  description: Current zoom position (RW if motorized)
- id: optics_focus_position
  type: integer
  description: Current focus position (RW if motorized)
- id: optics_lensshift_horizontal_position
  type: integer
  description: Horizontal lens shift position (RW if motorized)
- id: optics_lensshift_vertical_position
  type: integer
  description: Vertical lens shift position (RW if motorized)
- id: dmx_startchannel
  type: integer
  description: "DMX start channel 1..512 (RW)"
- id: dmx_shutdown
  type: boolean
  description: DMX shutdown enable (RW)
- id: dmx_mode
  type: string
  description: Current DMX mode (RW)
- id: system_standby_enable
  type: boolean
  description: Standby state enabled (RW; check availability first)
- id: system_eco_enable
  type: boolean
  description: ECO state enabled (RW; check availability first)
- id: network_device_lan_ip4config
  type: object
  description: "IPv4 config: {Address, Mask, Gateway, NameServers}"
- id: image_window_main_position
  type: object
  description: "Window position: {x, y}"
- id: image_window_main_size
  type: object
  description: "Window size: {width, height}"
- id: image_processing_warp_enable
  type: boolean
  description: Globally enable/disable warp
- id: image_processing_warp_file_enable
  type: boolean
  description: Enable/disable file-based warp
- id: image_processing_blend_file_enable
  type: boolean
  description: Enable/disable file-based blend
- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Enable/disable black level correction
- id: environment_temperatures
  type: object
  description: Dictionary of sensor name -> temperature (Celsius) from environment.getcontrolblocks
- id: environment_fan_speeds
  type: object
  description: Dictionary of fan name -> RPM from environment.getcontrolblocks
```

## Events
```yaml
- id: property_changed
  description: "Server-initiated JSON-RPC notification with method 'property.changed'; payload {property: [{name: value}]}"
- id: signal_callback
  description: "Server-initiated JSON-RPC notification with method 'signal.callback'; payload {signal: [{name: {args}}]}"
- id: modelupdated
  description: "Signal emitted when object structure changes (added/removed); payload {object, isnew}"
- id: source_change
  description: "Two property.changed notifications fired on source switch: first with empty value (deselect), then with new source name"
```

## Macros
```yaml
# CRITICAL: only multi-step sequences explicitly described in the source

- id: safe_power_on
  label: Safe Power-On Sequence
  description: Per source guidance: verify projector state is "standby" or "ready" before issuing power on
  steps:
    - action: get_property
      params:
        property: system.state
    - action: power_on
      when: "result in [standby, ready]"

- id: safe_power_off
  label: Safe Power-Off Sequence
  description: Per source guidance: verify projector state is "on" before issuing power off
  steps:
    - action: get_property
      params:
        property: system.state
    - action: power_off
      when: "result == on"

- id: switch_source
  label: Switch Source (with subscription)
  description: Subscribe to source change notifications before switching to receive deselect+select pair
  steps:
    - action: subscribe_property
      params:
        property: image.window.main.source
    - action: set_image_window_main_source
      params:
        value: "<source-name>"

- id: upload_and_activate_warp
  label: Upload and Activate Warp File
  description: Upload warp grid via HTTP then activate via JSON-RPC
  steps:
    - action: upload_warp_file
      params:
        host: "<projector-ip>"
    - action: set_image_processing_warp_file_selected
      params:
        value: "<warp-filename>"
    - action: set_image_processing_warp_file_enable
      params:
        value: true

- id: upload_and_activate_blend_mask
  label: Upload and Activate Blend Mask
  description: Upload blend mask via HTTP then activate via JSON-RPC
  steps:
    - action: upload_blend_mask
      params:
        host: "<projector-ip>"
    - action: set_image_processing_blend_file_selected
      params:
        value: ["<mask-filename>"]
    - action: set_image_processing_blend_file_enable
      params:
        value: true

- id: upload_and_activate_blacklevel_mask
  label: Upload and Activate Black Level Mask
  description: Upload black level mask via HTTP then activate via JSON-RPC
  steps:
    - action: upload_blacklevel_mask
      params:
        host: "<projector-ip>"
    - action: set_image_processing_blacklevel_file_selected
      params:
        value: "<blacklevel-filename>"
    - action: set_image_processing_blacklevel_file_enable
      params:
        value: true
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - firmware_schedulecomponentupgrade
interlocks: []
# Source notes: power commands no-op if projector already in target/transition state (no firmware fault
# behavior or recovery sequences documented). ECO wake requires either Wake-on-LAN, remote/keypad
# power button, or the serial ":POWR1\r" ASCII command.
```

## Notes
JSON-RPC 2.0 framing. `params` order does not matter (params passed by name). Continuous `property.set` without waiting for confirmation can flood server and degrade performance — always wait for ack. Subscribing does NOT return current value — use `property.get` separately. Two notifications are delivered on source switch: deselect (empty) then select (new name). Feature availability is dynamic and depends on projector configuration/peripherals (e.g. motorized lens, DMX mode) — use `introspect` to confirm at runtime. Some object names derive from source names by stripping non-word chars and lowercasing (e.g. `DisplayPort 1` → `displayport1`).

<!-- UNRESOLVED: authenticate `code` format/length not specified beyond example of 5-digit integer; authentication request required for elevated access only, but exact access-level semantics not enumerated. -->
```

---

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:48:11.427Z
last_checked_at: 2026-10-07T13:16:18.501Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:18.501Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 action units match source methods, properties, file endpoints and serial wake command; transport supported; coverage ~71/75. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source uses \"Pulse projectors\" generically; model-specific feature availability (e.g. motorized zoom, DMX channels) depends on configuration per source note"
- "code length/format not specified; example uses 5-digit integer (98765)"
- "serial-only ASCII command; sent to RS-232 port to wake from ECO"
- "authenticate `code` format/length not specified beyond example of 5-digit integer; authentication request required for elevated access only, but exact access-level semantics not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
