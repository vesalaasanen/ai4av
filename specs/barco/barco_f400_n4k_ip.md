---
spec_id: admin/barco-f400-n4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F400 N4K Control Spec"
manufacturer: Barco
model_family: "F400 N4K"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "F400 N4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T19:12:51.783Z
last_checked_at: 2026-10-07T17:48:46.560Z
generated_at: 2026-10-07T17:48:46.560Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings or interlocks documented in source"
  - "source documents no explicit safety interlocks, lockout procedures, or power-on sequencing constraints beyond \"verify state before issuing power on/off\""
  - "firmware version compatibility ranges, exact pass-code format/length, complete connector object-name mapping table (only \"DisplayPort 1 -> displayport1\" example given), full image.color.p7.* method parameter set"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:48:46.560Z
  matched_actions: 84
  action_count: 84
  confidence: medium
  summary: "All 84 action units match source methods, properties or HTTP endpoints, transport values are supported, and spec coverage of the Pulse catalogue exceeds 0.9 (S about 71). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco F400 N4K Control Spec

## Summary
Pulse API control spec for Barco F400 N4K projector. JSON-RPC 2.0 over TCP/IP port 9090, plus RS-232 serial (19200 8N1) carrying the same Pulse service. Covers power, source selection, illumination, picture settings, warping, blending, environment telemetry, DMX, optics, and network introspection.

<!-- UNRESOLVED: no safety warnings or interlocks documented in source -->

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
  type: optional_code  # source: authenticate method with pass code; normal end-user access skips it
```

HTTP file transfer endpoint:
- base URL pattern: `http://<projector-ip>/api/...` (e.g. `/api/image/processing/warp/file/transfer`)

## Traits
```yaml
- powerable       # inferred: system.poweron / system.poweroff
- routable        # inferred: image.window.main.source
- queryable       # inferred: property.get / property.subscribe
- levelable       # inferred: illumination.sources.laser.power, image.brightness, image.contrast, image.gamma, image.saturation, image.sharpness
- introspectable  # inferred: introspect method
- subscribable    # inferred: property.subscribe / signal.subscribe
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":<secret>}}'
  params:
    - name: code
      type: integer
      description: Numeric pass code; user must be at elevated access level

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<name>","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object path in dot notation (default "" = introspect everything)
    - name: recursive
      type: boolean
      description: If false, only one level of object names listed

- id: introspect_array
  label: Introspect Object (array form)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["<object>",<recursive>]}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"<name>","color":"<color>","period":<period>}}'
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<path>","value":<value>}}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation
    - name: value
      type: any
      description: Value matching property type

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<path>"}}'
  params:
    - name: property
      type: string

- id: property_get_multiple
  label: Read Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["<p1>","<p2>"]}}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<path>"}}'
  params:
    - name: property
      type: string

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["<p1>","<p2>"]}}'
  params:
    - name: property
      type: array

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<path>"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["<p1>","<p2>"]}}'
  params:
    - name: property
      type: array

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<name>"}}'
  params:
    - name: signal
      type: string

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["<s1>","<s2>"]}}'
  params:
    - name: signal
      type: array

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<name>"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["<s1>","<s2>"]}}'
  params:
    - name: signal
      type: array

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source>"}}'
  params:
    - name: source
      type: string
      description: One of the source names returned by image.source.list

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
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.<sourcename>.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: Source object name (source name lowercased, non-word chars stripped, e.g. "DisplayPort 1" -> "displayport1")

- id: image_connector_detectedsignal_get
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.<name>.detectedsignal"}}'
  params:
    - name: name
      type: string
      description: Connector object name

- id: set_laser_power
  label: Set Laser Illumination Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<percent>}}'
  params:
    - name: percent
      type: integer
      description: Power in percent; respect minpower/maxpower

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

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<value>}}'
  params:
    - name: value
      type: float
      description: Normalized; 0 = default, 1 = 100% offset; range -1..1, step 0.01

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":<value>}}'
  params:
    - name: value
      type: float
      description: Normalized; 1 = default; range 0..2, step 0.01

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":<value>}}'
  params:
    - name: value
      type: float
      description: Default 2.2; range 1..3, step 0.1

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":<value>}}'
  params:
    - name: value
      type: float
      description: Normalized; 1 = default; range 0..2, step 0.01

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":<value>}}'
  params:
    - name: value
      type: integer
      description: Normalized; range -2..8, step 1

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"<value>"}}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT / DESKTOP_REAR / CEILING_FRONT / CEILING_REAR

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":<x>,"y":<y>}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":<w>,"height":<h>}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"<mode>"}}'
  params:
    - name: mode
      type: string
      description: One of Fill / OneToOne / FillScreen / Stretch

- id: enable_warp
  label: Enable All Warp Functions
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string

- id: upload_warp_file_http
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string
      description: IP address of projector

- id: enable_blend_file
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: select_blend_file
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["<filename>"]}}'
  params:
    - name: filename
      type: string

- id: upload_blend_mask_http
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: projector-ip
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string

- id: upload_blacklevel_mask_http
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector-ip
      type: string

- id: download_warp_file_http
  label: Download Current Warp Grid (HTTP)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string

- id: download_warp_file_named_http
  label: Download Named Warp Grid (HTTP)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer/warpgrid.xml'
  params:
    - name: projector-ip
      type: string

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"<type>","valuetype":"<valuetype>"}}'
  params:
    - name: type
      type: string
      description: One of Sensor / Filter / Controller / Actuator / Alarm / GenericBlock
    - name: valuetype
      type: string
      description: One of Temperature / Speed / PWM / Voltage / Current / Power / Altitude / Pressure / Humidity / ADC / Coordinate / Peltier / Waveform / Average / Delay / Difference / Interpolation / Limit / Median / Noise / Weighting / Comparison / Threshold / Formula / Driver / PID / Mode / State / Pump / Resistance / Simulation / Constant / Manual / Range / Any

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
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

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<mode>"}}'
  params:
    - name: mode
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":<channel>}}'
  params:
    - name: channel
      type: integer
      description: 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":<bool>}}'
  params:
    - name: value
      type: boolean

- id: set_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"<pos>"}}'
  params:
    - name: pos
      type: string
      description: Open or Closed

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"<pos>"}}'
  params:
    - name: pos
      type: string
      description: Open or Closed

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":<pos>}}'
  params:
    - name: pos
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":<pos>}}'
  params:
    - name: pos
      type: integer

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":<pos>}}'
  params:
    - name: pos
      type: integer

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":<pos>}}'
  params:
    - name: pos
      type: integer

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":<bool>}}'
  params:
    - name: value
      type: boolean
      description: Check availability first

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":<bool>}}'
  params:
    - name: value
      type: boolean
      description: Check availability first

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: set_network_ipv4_config
  label: Set LAN IPv4 Config
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{"Address":"<ip>","Mask":"<mask>","Gateway":"<gw>","NameServers":"<ns>"}}}'
  params:
    - name: Address
      type: string
    - name: Mask
      type: string
    - name: Gateway
      type: string
    - name: NameServers
      type: string

- id: rs232_wake_from_eco
  label: Wake From ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII string sent on serial port; used when projector is in ECO/power-save

- id: subscribe_system_state
  label: Subscribe to Projector State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: subscribe_active_source
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: subscribe_laser_power
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: subscribe_image_brightness
  label: Subscribe to Image Brightness Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"}}'
  params: []
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

- id: image_window_main_source
  type: string
  description: Currently active source name
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

- id: illumination_sources_laser_power
  type: float
  description: Current laser power in percent
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

- id: illumination_sources_laser_minpower
  type: float
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'

- id: illumination_sources_laser_maxpower
  type: float

- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01

- id: image_sharpness
  type: integer
  range: [-2, 8]

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

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  fields: [Address, Mask, Gateway, NameServers]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: image_connector_detectedsignal
  type: object
  description: Active flag plus timing/color metadata; see source for full field set
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.<name>.detectedsignal"}}'

- id: environment_temperatures
  type: object
  description: Dictionary keyed by environment.<sensor>.temperature path -> float Celsius
  query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'

- id: environment_fan_speeds
  type: object
  description: Dictionary keyed by environment.fan.<name>.tacho -> RPM
  query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
```

## Variables
```yaml
# Properties with read/write access and range constraints:
- id: illumination_sources_laser_power
  type: float
  range: [0, 100]
  description: Target laser power percent

- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01

- id: image_sharpness
  type: integer
  range: [-2, 8]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_source
  type: string

- id: image_window_main_position
  type: object
  fields: {x: int, y: int}

- id: image_window_main_size
  type: object
  fields: {width: int, height: int}

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

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

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when subscribed property value changes; client must implement property.changed
  payload_example: |
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}

- id: signal_callback
  description: Server-pushed notification for subscribed signal; client must implement signal.callback
  payload_example: |
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100}}]}}

- id: modelupdated_signal
  description: Signal triggered when object structure changes (objects added/removed)
  signal_path: modelupdated

- id: introspect_objectchanged_signal
  description: Signal triggered when new objects arrive or objects are removed
  payload_example: |
    {"introspect.objectchanged":{"object":"motors.motor1","isnew":true}}
```

## Macros
```yaml
- id: power_on_sequence
  description: Verify state then issue power on
  steps:
    - property_get: {property: "system.state"}
    - assert_value_in: [standby, ready]
    - system_poweron

- id: power_off_sequence
  description: Verify state then issue power off
  steps:
    - property_get: {property: "system.state"}
    - assert_value_in: [on]
    - system_poweroff

- id: warp_upload_and_enable
  description: Upload warp grid via HTTP then activate
  steps:
    - upload_warp_file_http
    - select_warp_file: {filename: "warp.xml"}
    - enable_warp_file

- id: blend_upload_and_enable
  description: Upload blend mask via HTTP then activate
  steps:
    - upload_blend_mask_http
    - select_blend_file: {filename: "mask.png"}
    - enable_blend_file

- id: blacklevel_upload_and_enable
  description: Upload black level mask via HTTP then activate
  steps:
    - upload_blacklevel_mask_http
    - select_blacklevel_file: {filename: "blacklevel.png"}
    - enable_blacklevel_file

- id: wake_from_eco
  description: Three documented methods to wake projector from ECO mode
  options:
    - wake_on_lan_to_mac
    - power_button_remote
    - power_button_keypad
    - send_serial: ":POWR1\r"
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff
  - firmware_schedulecomponentupgrade
interlocks: []
# UNRESOLVED: source documents no explicit safety interlocks, lockout procedures, or power-on sequencing constraints beyond "verify state before issuing power on/off"
```

## Notes
- Pulse API is a JSON-RPC 2.0 service; same commands available over TCP/9090 and RS-232.
- RS-232 cable pinout: DB9 female to host, DB9 male to projector; pin 2↔2, pin 3↔3, pin 5↔5.
- Best practice: wait for `property.set` confirmation before re-issuing the same property; flooding degrades performance.
- Auth: end-user level requires no auth; elevated access needs `authenticate` with pass code.
- ECO wake: Wake-on-LAN, remote/keypad power button, or RS-232 ASCII `:POWR1\r`.
- Source list and connector list contents are model-dependent; use `introspect` and `property.get` to discover runtime properties rather than hardcoding.
- API surface is dynamic; peripherals (e.g. motorized zoom lens) add or remove properties depending on installed hardware.
- HTTP file endpoints use base URL `http://<projector-ip>/api/...`.

<!-- UNRESOLVED: firmware version compatibility ranges, exact pass-code format/length, complete connector object-name mapping table (only "DisplayPort 1 -> displayport1" example given), full image.color.p7.* method parameter set -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T19:12:51.783Z
last_checked_at: 2026-10-07T17:48:46.560Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:48:46.560Z
matched_actions: 84
action_count: 84
confidence: medium
summary: "All 84 action units match source methods, properties or HTTP endpoints, transport values are supported, and spec coverage of the Pulse catalogue exceeds 0.9 (S about 71). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings or interlocks documented in source"
- "source documents no explicit safety interlocks, lockout procedures, or power-on sequencing constraints beyond \"verify state before issuing power on/off\""
- "firmware version compatibility ranges, exact pass-code format/length, complete connector object-name mapping table (only \"DisplayPort 1 -> displayport1\" example given), full image.color.p7.* method parameter set"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
