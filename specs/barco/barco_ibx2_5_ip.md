---
spec_id: admin/barco-ibx2-5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco IBX-5 Control Spec"
manufacturer: Barco
model_family: IBX-5
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - IBX-5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:12:55.906Z
last_checked_at: 2026-08-19T08:39:57.611Z
generated_at: 2026-08-19T08:39:57.611Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source names list, detected signal keys, available sensors/fans, lens behavior, and DMX channel mapping all depend on installed peripherals. Spec describes dynamic API; use introspection at runtime."
  - "voltage, current, laser class, and fault-recovery sequences not stated in source"
  - "firmware version compatibility not stated. Authentication pass-code format and rotation policy not stated. Specific source/connector/illumination source availability depends on projector model/peripherals; verify via introspection. DMX channel count depends on mode (basic vs extended)."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:39:57.611Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions match source methods/properties/endpoints; transport port 9090 and 19200/8/N/1 verified; source command catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco IBX-5 Control Spec

## Summary
Pulse API for Barco Pulse projector platform. JSON-RPC 2.0 over TCP port 9090, RS-232 also supported at 19200/8/N/1. Covers power, source selection, illumination, image settings, warp/blend, DMX, optics, environment.

<!-- UNRESOLVED: source names list, detected signal keys, available sensors/fans, lens behavior, and DMX channel mapping all depend on installed peripherals. Spec describes dynamic API; use introspection at runtime. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # TCP service port per source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # optional authenticate() call with pass code, required only for elevated access
```

## Traits
```yaml
- powerable        # system.poweron / system.poweroff methods present
- routable         # image.window.main.source set; image.source.list / image.connector.list
- queryable        # property.get + introspection methods
- levelable        # brightness, contrast, gamma, saturation, sharpness, illumination power
```

## Actions
```yaml
# System / power
- id: system_poweron
  label: System Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"id":3,"property":"system.state"},"id":3}'
  params: []
- id: system_poweroff
  label: System Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"id":4,"property":"system.state"},"id":4}'
  params: []
- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":1,"property":"system.state"},"id":1}'
  params: []
- id: system_state_subscribe
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":2,"property":"system.state"},"id":2}'
  params: []
- id: system_standby_enable_set
  label: Set system.standby.enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":<id>}'
  params:
    - name: value
      type: boolean
      description: Enable/disable the use of the standby state
- id: system_eco_enable_set
  label: Set system.eco.enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":<id>}'
  params:
    - name: value
      type: boolean
      description: Enable/disable the use of the ECO state

# Authentication
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code

# Source / routing
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []
- id: image_window_main_source_get
  label: Get Active Window Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":0,"property":"image.window.main.source"},"id":0}'
  params: []
- id: image_window_main_source_set
  label: Set Active Window Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source>"},"id":<id>}'
  params:
    - name: value
      type: string
      description: Source name (e.g. DisplayPort 1, HDMI) from image.source.list
- id: image_window_main_source_subscribe
  label: Subscribe Window Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":6,"property":"image.window.main.source"},"id":6}'
  params: []
- id: image_source_listconnectors
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.<sourcename>.listconnectors","id":<id>}'
  params:
    - name: sourcename
      type: string
      description: Lowercase alphanumeric object name (e.g. displayport1)
- id: image_connector_detectedsignal_get
  label: Get Detected Signal for Connector
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.<connectorname>.detectedsignal"},"id":<id>}'
  params:
    - name: connectorname
      type: string
      description: Lowercase alphanumeric object name (e.g. l1hdmi, displayport1)
- id: image_connector_detectedsignal_subscribe
  label: Subscribe Connector Signal Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.<connectorname>.detectedsignal"},"id":<id>}'
  params:
    - name: connectorname
      type: string
- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":<x>,"y":<y>}},"id":<id>}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":<w>,"height":<h>}},"id":<id>}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer
- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"<mode>"},"id":<id>}'
  params:
    - name: mode
      type: string
      description: "Fill | OneToOne | FillScreen | Stretch"

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":0,"property":"illumination.state"},"id":0}'
  params: []
- id: illumination_state_subscribe
  label: Subscribe Illumination State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":1,"property":"illumination.state"},"id":1}'
  params: []
- id: illumination_sources_introspect
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'
  params: []
- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":3,"property":"illumination.sources.laser.power"},"id":3}'
  params: []
- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<power>},"id":5}'
  params:
    - name: power
      type: integer
      description: Target power percent (0-100). Use minpower/maxpower for valid range.
- id: illumination_laser_power_subscribe
  label: Subscribe Laser Power Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []
- id: illumination_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":6,"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []
- id: illumination_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":5,"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []
- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":<id>}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":<id>}'
  params: []

# Image / picture settings
- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":7,"property":"image.brightness"},"id":7}'
  params: []
- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<v>},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized [-1, 1], step 0.01, default 0
- id: image_brightness_subscribe
  label: Subscribe Image Brightness Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness"]},"id":8}'
  params: []
- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":<v>},"id":<id>}'
  params:
    - name: value
      type: float
      description: Normalized [0, 2], step 0.01, default 1
- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":<v>},"id":<id>}'
  params:
    - name: value
      type: float
      description: "[1, 3], step 0.1, default 2.2"
- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":<v>},"id":<id>}'
  params:
    - name: value
      type: float
      description: Normalized [0, 2], step 0.01, default 1
- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":<v>},"id":<id>}'
  params:
    - name: value
      type: integer
      description: "[-2, 8], step 1"
- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"<orientation>"},"id":<id>}'
  params:
    - name: orientation
      type: string
      description: "DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"

# Warp
- id: image_processing_warp_enable_set
  label: Globally Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean
- id: image_processing_warp_file_upload
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<ip>/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Warp grid XML filename on local filesystem
- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"},"id":11}'
  params:
    - name: filename
      type: string
- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

# Blend
- id: image_processing_blend_file_upload
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<ip>/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF grayscale blend mask, 8 or 16 bit, size matches projector resolution
- id: image_processing_blend_file_selected_set
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["<filename>"]},"id":13}'
  params:
    - name: filenames
      type: array
      items: string
- id: image_processing_blend_file_enable_set
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

# Black level
- id: image_processing_blacklevel_file_upload
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF grayscale black-level mask, 8 or 16 bit
- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"},"id":15}'
  params:
    - name: filename
      type: string
- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

# Color
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"},"id":<id>}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"},"id":<id>}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":<id>}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":<id>}'
  params: []

# DMX
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<mode>"},"id":<id>}'
  params:
    - name: mode
      type: string
- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":<ch>},"id":<id>}'
  params:
    - name: channel
      type: integer
      description: "[1, 512]"
- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":<bool>},"id":<id>}'
  params:
    - name: value
      type: boolean
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":<id>}'
  params: []
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":<id>}'
  params: []

# Network
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":<id>}'
  params: []
- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":<id>}'
  params: []

# Optics
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":<id>}'
  params: []
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"<target>"},"id":<id>}'
  params:
    - name: target
      type: string
      description: "Open | Closed"
- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":<id>}'
  params: []
- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":<id>}'
  params: []
- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":<id>}'
  params: []
- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":<id>}'
  params: []

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":<id>}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":<id>}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade on Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{"component":"<name>"},"id":<id>}'
  params:
    - name: component
      type: string

# Environment
- id: environment_getcontrolblocks_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":<id>}'
  params: []
- id: environment_getcontrolblocks_speeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":<id>}'
  params: []
- id: environment_getcontrolblocks_generic
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"<type>","valuetype":"<valuetype>"},"id":<id>}'
  params:
    - name: type
      type: string
      description: "Sensor | Filter | Controller | Actuator | Alarm | GenericBlock"
    - name: valuetype
      type: string
      description: "Temperature | Speed | PWM | Voltage | Current | Power | Altitude | Pressure | Humidity | ADC | Coordinate | Peltier | Waveform | Average | Delay | Difference | Interpolation | Limit | Median | Noise | Weighting | Comparison | Threshold | Formula | Driver | PID | Mode | State | Pump | Resistance | Simulation | Constant | Manual | Range | Any"
- id: environment_getalarminfo
  label: Get Environment Alarms
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":<id>}'
  params: []
- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":<id>}'
  params: []

# Introspection
- id: introspect_recursive
  label: Introspect (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<object>","recursive":true},"id":<id>}'
  params:
    - name: object
      type: string
- id: introspect_nonrecursive
  label: Introspect (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<object>","recursive":false},"id":<id>}'
  params:
    - name: object
      type: string

# Serial / ECO wake
- id: eco_wake_serial
  label: Wake from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII string sent on RS-232 serial port to wake a projector in ECO mode.

# Notifications / subscriptions (generic)
- id: property_get
  label: Property Get (generic)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<property>"},"id":<id>}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_set
  label: Property Set (generic)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<property>","value":<value>},"id":<id>}'
  params:
    - name: property
      type: string
    - name: value
      type: any
- id: property_subscribe
  label: Property Subscribe (generic)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<property>"},"id":<id>}'
  params:
    - name: property
      type: string
      description: Dot-notation property path or array of paths
- id: property_unsubscribe
  label: Property Unsubscribe (generic)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<property>"},"id":<id>}'
  params:
    - name: property
      type: string
      description: Dot-notation property path or array of paths
- id: property_get_multi
  label: Property Get Multiple
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["<p1>","<p2>"]},"id":<id>}'
  params:
    - name: properties
      type: array
      items: string
- id: property_subscribe_multi
  label: Property Subscribe Multiple
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["<p1>","<p2>"]},"id":<id>}'
  params:
    - name: properties
      type: array
      items: string
- id: property_unsubscribe_multi
  label: Property Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["<p1>","<p2>"]},"id":<id>}'
  params:
    - name: properties
      type: array
      items: string
- id: signal_subscribe
  label: Signal Subscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<signal>"},"id":<id>}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated) or array of names
- id: signal_subscribe_multi
  label: Signal Subscribe Multiple
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["<s1>","<s2>"]},"id":<id>}'
  params:
    - name: signals
      type: array
      items: string
- id: signal_unsubscribe
  label: Signal Unsubscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<signal>"},"id":<id>}'
  params:
    - name: signal
      type: string
- id: signal_unsubscribe_multi
  label: Signal Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["<s1>","<s2>"]},"id":<id>}'
  params:
    - name: signals
      type: array
      items: string
- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
    - name: period
      type: integer
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: image_connector_detectedsignal
  type: object
  description: Detected signal info (active bool, geometry, scan, color space, chroma, gamma, primaries, mastering luminance, content aspect, stereo mode)
- id: environment_controlblocks
  type: object
  description: Map of sensor/key names to numeric readings
```

## Variables
```yaml
- id: image_window_main_source
  type: string
  description: Active source name (e.g. DisplayPort 1, HDMI)
- id: image_window_main_scalingmode
  type: string
  description: "Fill | OneToOne | FillScreen | Stretch"
- id: image_orientation
  type: string
  description: "DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"
- id: image_brightness
  type: float
  description: "[-1, 1], step 0.01, default 0"
- id: image_contrast
  type: float
  description: "[0, 2], step 0.01, default 1"
- id: image_gamma
  type: float
  description: "[1, 3], step 0.1, default 2.2"
- id: image_saturation
  type: float
  description: "[0, 2], step 0.01, default 1"
- id: image_sharpness
  type: integer
  description: "[-2, 8], step 1"
- id: illumination_sources_laser_power
  type: integer
  description: Target laser power percent (0-100)
- id: illumination_sources_laser_minpower
  type: integer
  description: Read-only minimum power percent
- id: illumination_sources_laser_maxpower
  type: integer
  description: Read-only maximum power percent
- id: image_processing_warp_enable
  type: boolean
  description: Globally enable/disable warp
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
- id: dmx_mode
  type: string
- id: dmx_startchannel
  type: integer
  description: "[1, 512]"
- id: dmx_shutdown
  type: boolean
- id: network_device_lan_ip4config
  type: object
  description: "{address, mask, gateway, nameservers}"
- id: optics_zoom_position
  type: integer
- id: optics_focus_position
  type: integer
- id: optics_lensshift_horizontal_position
  type: integer
- id: optics_lensshift_vertical_position
  type: integer
- id: system_standby_enable
  type: boolean
- id: system_eco_enable
  type: boolean
- id: image_window_main_position
  type: object
  description: "{x, y}"
- id: image_window_main_size
  type: object
  description: "{width, height}"
- id: firmware_status
  type: object
  description: Per-component version + status (Unknown/OK/Upgradable)
```

## Events
```yaml
- id: modelupdated
  description: Fired when introspection object structure changes (objects added or removed). Subscribe via signal.subscribe.
- id: property_changed
  description: Fired when a subscribed property value changes. Carries object/property name and new value.
- id: signal_callback
  description: Fired when a subscribed signal emits. Carries signal name and argument list.
- id: introspect_objectchanged
  description: Carries {object: string, isnew: bool} for added/removed objects.
```

## Macros
```yaml
- id: power_on_safe
  description: Verify state before powering on
  steps:
    - property.get system.state  # expect standby or ready
    - system.poweron
- id: power_off_safe
  description: Verify state before powering off
  steps:
    - property.get system.state  # expect on
    - system.poweroff
- id: upload_and_apply_warp
  description: Upload warp grid and activate
  steps:
    - POST /api/image/processing/warp/file/transfer (file=@warp.xml)
    - property.set image.processing.warp.file.selected = warp.xml
    - property.set image.processing.warp.file.enable = true
    - property.set image.processing.warp.enable = true
- id: upload_and_apply_blend
  description: Upload blend mask and activate
  steps:
    - POST /api/image/processing/blend/file/transfer (file=@mask.png)
    - property.set image.processing.blend.file.selected = [mask.png]
    - property.set image.processing.blend.file.enable = true
- id: upload_and_apply_blacklevel
  description: Upload black-level mask and activate
  steps:
    - POST /api/image/processing/blacklevel/file/transfer (file=@blacklevel.png)
    - property.set image.processing.blacklevel.file.selected = blacklevel.png
    - property.set image.processing.blacklevel.file.enable = true
- id: switch_source
  description: List then set active source
  steps:
    - image.source.list
    - property.set image.window.main.source = <chosen>
- id: adjust_picture
  description: Adjust a picture property with introspection first
  steps:
    - introspect image (recursive=false)  # get min/max/step/precision
    - property.set image.<prop> = <v>
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff
  - firmware_schedulecomponentupgrade
interlocks:
  - description: Verify system.state is standby or ready before issuing system.poweron
    command_precondition: system.state in [standby, ready]
  - description: Verify system.state is on before issuing system.poweroff
    command_precondition: system.state == on
  - description: ECO mode wake requires WoL packet, remote, keypad, or serial ":POWR1\r"
    command_precondition: system.state == eco
# UNRESOLVED: voltage, current, laser class, and fault-recovery sequences not stated in source
```

## Notes
JSON-RPC 2.0 over TCP port 9090 and over RS-232 at 19200/8/N/1. Object/property/signal names use dot-notation, lowercase, alphanumeric only (e.g. `DisplayPort 1` → `displayport1`). `authenticate` is optional for normal end-user access; required only for elevated access levels. Subscribe vs get: subscription delivers future changes only; use `property.get` for current value. Wait for `property.set` confirmation before issuing another `property.set` on the same property to avoid request flood. Dynamic API: available objects/properties/signals depend on installed peripherals (lens, DMX mode, etc.); use `introspect` to enumerate at runtime. File upload endpoints live under `/api/.../file/transfer`; download by entering URL in browser or `curl -O -J`. ECO wake over serial uses literal ASCII `:POWR1\r`.

<!-- UNRESOLVED: firmware version compatibility not stated. Authentication pass-code format and rotation policy not stated. Specific source/connector/illumination source availability depends on projector model/peripherals; verify via introspection. DMX channel count depends on mode (basic vs extended). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:12:55.906Z
last_checked_at: 2026-08-19T08:39:57.611Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:39:57.611Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions match source methods/properties/endpoints; transport port 9090 and 19200/8/N/1 verified; source command catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source names list, detected signal keys, available sensors/fans, lens behavior, and DMX channel mapping all depend on installed peripherals. Spec describes dynamic API; use introspection at runtime."
- "voltage, current, laser class, and fault-recovery sequences not stated in source"
- "firmware version compatibility not stated. Authentication pass-code format and rotation policy not stated. Specific source/connector/illumination source availability depends on projector model/peripherals; verify via introspection. DMX channel count depends on mode (basic vs extended)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
