---
spec_id: admin/barco-fldx-061-1-en67
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fldx 061 1 En67 Control Spec"
manufacturer: Barco
model_family: "Fldx 061 1 En67"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Fldx 061 1 En67"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:19:02.193Z
last_checked_at: 2026-08-05T08:04:49.265Z
generated_at: 2026-08-05T08:04:49.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model \"Fldx 061 1 En67\" appears as the source filename; specific model line in the manual refers generically to \"Pulse projectors\". Listed as compatible per task input."
  - "firmware version compatibility not stated in source. Model-specific quirks (exact available sources, DMX channel count per mode) require runtime introspection. Voltage, current, and power specs not stated in this control doc."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:04:49.265Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions map to wire-literal methods/properties/signals documented verbatim in the source; transport parameters fully verified. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Fldx 061 1 En67 Control Spec

## Summary
Barco Pulse-platform projector control spec. Same JSON-RPC 2.0 service available over TCP port 9090 and RS-232 serial (19200 8N1). Service exposes properties (system.state, illumination, image.window.main.source, optics, etc.), RPC methods, signals, and file-transfer HTTP endpoints.

<!-- UNRESOLVED: device model "Fldx 061 1 En67" appears as the source filename; specific model line in the manual refers generically to "Pulse projectors". Listed as compatible per task input. -->

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
  type: secret_code  # explicit in source: authenticate with {"method":"authenticate","params":{"code":<code>}}
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff examples
- routable        # inferred from image.window.main.source set + image.source.list
- queryable       # inferred from property.get examples
- levelable       # inferred from image.brightness / contrast / gamma / saturation / sharpness examples
- subscribable    # inferred from property.subscribe / property.unsubscribe and signal.subscribe
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP:9090 or RS-232. Wrap payload in {"jsonrpc":"2.0", "method":..., "params":{...}, "id":...}

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

- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI", "HDBaseT", "SDI", "DVI 1")

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: list_sources
  label: List Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name (lower-case, non-word chars stripped, e.g. "displayport1")

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. "l1hdmi", "displayport1")

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: subscribe_system_state
  label: Subscribe System State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.brightness")

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: any
      description: Value matching the property type

- id: get_multiple_properties
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: subscribe_property
  label: Subscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: subscribe_multiple_properties
  label: Subscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: unsubscribe_property
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: unsubscribe_multiple_properties
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: set_image_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized -1..1, step 0.01, default 0

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized 0..2, step 0.01, default 1

- id: set_image_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: 1..3, step 0.1, default 2.2

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized 0..2, step 0.01, default 1

- id: set_image_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: -2..8, step 1

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"}}'
  params:
    - name: orientation
      type: enum
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{mode}"}}'
  params:
    - name: mode
      type: enum
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{file} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Local path to warp XML file

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: download_warp_file
  label: Download Warp File
  kind: action
  command: 'curl -O -J http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string
      description: PNG/JPEG/TIFF, 8 or 16 bit grayscale; mask resolution must match blend layer (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540)

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["{filename}"]}}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string
      description: PNG/JPEG/TIFF, 8 or 16 bit grayscale; mask resolution must match blacklevel layer

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Percent (within dynamic min/max reported by introspection)

- id: get_laser_min_power
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_max_power
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: engage_clo
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{state}"}}'
  params:
    - name: state
      type: enum
      description: Open | Closed

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: set_lensshift_horizontal
  label: Set Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: set_lensshift_vertical
  label: Set Lens Shift Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"}}'
  params:
    - name: mode
      type: string
      description: Mode name from dmx.listmodes

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}}}'
  params:
    - name: channel
      type: integer
      description: 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: get_network_ip4
  label: Get IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_environment_sensors
  label: Get Environment Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"{valuetype}"}}'
  params:
    - name: valuetype
      type: enum
      description: One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any

- id: get_environment_alarms
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_environment_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: next_rgb_mode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: p7_copy_preset
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: Reset P7 Preset To Default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: Reset P7 Preset To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: list_firmware_versions
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Upgrade On Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{"component":"{component}"}}'
  params:
    - name: component
      type: string

- id: introspect
  label: Introspect Object Tree
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation, empty for whole tree
    - name: recursive
      type: boolean

- id: subscribe_modelupdated
  label: Subscribe Model Updated Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params: []

- id: subscribe_multiple_signals
  label: Subscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: unsubscribe_signal
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string

- id: unsubscribe_multiple_signals
  label: Unsubscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: led_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"{color}","period":{period}}}'
  params:
    - name: color
      type: string
    - name: period
      type: integer

- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Normal end-user access does not require authentication.

- id: serial_wake_eco
  label: Wake From ECO Mode (Serial)
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

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]

- id: source_list
  type: array
  description: Result of image.source.list; entries are model-dependent (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)

- id: connector_list
  type: array
  description: Result of image.connector.list; entries are model-dependent (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI)

- id: detected_signal
  type: object
  description: Connector signal info with fields active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode

- id: environment_sensor_block
  type: object
  description: Dictionary of sensor key->float value, retrieved via environment.getcontrolblocks

- id: alarm_info
  type: array
  description: Array of {severity, timestamp, source, description, custommessage} objects
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  default: 0

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: laser_power_percent
  type: integer
  description: Within dynamic min/max reported by introspection

- id: laser_min_power_percent
  type: integer
  read_only: true

- id: laser_max_power_percent
  type: integer
  read_only: true

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: zoom_position
  type: integer

- id: focus_position
  type: integer

- id: lensshift_horizontal_position
  type: integer

- id: lensshift_vertical_position
  type: integer

- id: standby_enable
  type: boolean

- id: eco_enable
  type: boolean

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: warp_enable
  type: boolean

- id: warp_file_enable
  type: boolean

- id: warp_file_selected
  type: string

- id: blend_file_enable
  type: boolean

- id: blend_file_selected
  type: array

- id: blacklevel_file_enable
  type: boolean

- id: blacklevel_file_selected
  type: string

- id: window_position
  type: object
  description: {x:int, y:int}

- id: window_size
  type: object
  description: {width:int, height:int}
```

## Events
```yaml
- id: property_changed
  description: Server->client notification via method "property.changed"; params.property is array of {key:value} pairs
  example: |
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"image.window.main.source":"DisplayPort 2"}]}}

- id: signal_callback
  description: Server->client notification via method "signal.callback"; params.signal is array of {signalName: {args}}
  example: |
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}

- id: model_updated
  description: Triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe with signal="modelupdated"
```

## Macros
```yaml
# Sequence documented in source for waking from ECO mode:
- id: wake_from_eco
  label: Wake From ECO Mode
  description: ECO state requires one of: Wake-on-LAN (MAC), remote power button, keypad power button, or serial command ":POWR1\r"
  steps:
    - id: serial_wake_eco

# Sequence documented in source for warp file deployment:
- id: deploy_warp_file
  label: Deploy Warp File
  description: Three-step sequence: globally enable warp, upload+select file, enable file warp
  steps:
    - id: enable_warp
    - id: upload_warp_file
    - id: select_warp_file
    - id: enable_warp_file

# Sequence documented in source for blend mask deployment:
- id: deploy_blend_mask
  label: Deploy Blend Mask
  steps:
    - id: upload_blend_mask
    - id: select_blend_file
    - id: enable_blend_file

# Sequence documented in source for black-level mask deployment:
- id: deploy_blacklevel_mask
  label: Deploy Black Level Mask
  steps:
    - id: upload_blacklevel_mask
    - id: select_blacklevel_file
    - id: enable_blacklevel_file
```

## Safety
```yaml
confirmation_required_for:
  - power_off
interlocks:
  - description: "Verify system.state is standby or ready before issuing system.poweron (if on or transitioning, the command is a no-op)"
  - description: "Verify system.state is on before issuing system.poweroff (if off or transitioning, the command is a no-op)"
  - description: "Wait for property.set confirmation before issuing another set on the same property; flooding reduces performance"
```

## Notes
API is dynamic. Available objects/properties/signals vary by projector model, peripherals (e.g. motorized lens), and DMX mode. Use introspect as source of truth. Connection type (TCP:9090 vs RS-232 19200 8N1) does not affect command availability; same JSON-RPC service is exposed on both. Authentication via {"method":"authenticate","params":{"code":<code>","id":N}} only required for elevated access; normal end-user access skips it. File endpoints (warp/blend/blacklevel) accept PNG, JPEG, TIFF (8 or 16 bit grayscale); colour images have only blue channel used.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model-specific quirks (exact available sources, DMX channel count per mode) require runtime introspection. Voltage, current, and power specs not stated in this control doc. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:19:02.193Z
last_checked_at: 2026-08-05T08:04:49.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:04:49.265Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions map to wire-literal methods/properties/signals documented verbatim in the source; transport parameters fully verified. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model \"Fldx 061 1 En67\" appears as the source filename; specific model line in the manual refers generically to \"Pulse projectors\". Listed as compatible per task input."
- "firmware version compatibility not stated in source. Model-specific quirks (exact available sources, DMX channel count per mode) require runtime introspection. Voltage, current, and power specs not stated in this control doc."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
