---
spec_id: admin/barco-field-service-kit-hdx-hdf-hdq
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Field Service Kit Hdx Hdf Hdq Control Spec"
manufacturer: Barco
model_family: "Barco Field Service Kit Hdx Hdf Hdq"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Field Service Kit Hdx Hdf Hdq"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T19:10:36.544Z
last_checked_at: 2026-08-05T08:01:14.336Z
generated_at: 2026-08-05T08:01:14.336Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Source notes that some API parts are dynamic and depend on peripherals/configuration; introspection is the canonical way to enumerate the real API surface."
  - "most \"settings\" in this device are modeled as JSON-RPC property.set actions"
  - "the source does not describe any macro/scripting facility on the device."
  - "source does not contain explicit safety warnings, interlocks, or"
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:01:14.336Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions match JSON-RPC methods, HTTP file endpoints, or the serial wake token documented verbatim in the source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Field Service Kit Hdx Hdf Hdq Control Spec

## Summary
This spec covers the Barco Pulse API used to control the Barco Field Service Kit for the Hdx/Hdf/Hdq projector family. The interface uses JSON-RPC 2.0 over TCP port 9090 or over a serial connection using the same JSON-RPC payloads. Authentication is optional and uses a numeric pass code to elevate access above normal end-user level.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Source notes that some API parts are dynamic and depend on peripherals/configuration; introspection is the canonical way to enumerate the real API surface. -->

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
  type: passcode  # Tier 1: source documents optional authenticate method with numeric code
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- routable        # image.window.main.source, image.source.list, image.connector.list present
- queryable       # property.get, introspect, environment.getcontrolblocks, firmware.* present
- levelable       # image.brightness, image.contrast, image.gamma, image.saturation, illumination.sources.*.power present
- subscribable    # property.subscribe / signal.subscribe present
- introspectable  # introspect method present
- observable      # property.changed, signal.callback, modelupdated signals present
- routable_io     # optics.zoom/focus/lensshift, optics.shutter present
```

## Actions
```yaml
# Auth
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Numeric pass code (example: 98765)
  notes: Authentication is only required for elevated access; normal end-user access can skip authentication.

# System
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"property":"system.state"},"id":3}'
- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"property":"system.state"},"id":4}'
  notes: Best practice is to verify system.state == "on" before issuing power off.
- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
- id: system_state_subscribe
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
- id: system_standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":1}'
  notes: Check availability before writing.
- id: system_eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":1}'
  notes: Check availability before writing.

# Sources / windows / connectors
- id: image_window_main_source_get
  label: Get Active Source (Main Window)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
- id: image_window_main_source_set
  label: Set Active Source (Main Window)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name string (e.g. "DisplayPort 1", "HDMI")
- id: image_window_main_source_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","params":{},"id":1}'
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","params":{},"id":3}'
- id: image_source_listconnectors
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","params":{},"id":4}'
  params:
    - name: source_name
      type: string
      description: Lowercase alphanumeric source name (e.g. "displayport1"). Derived from display name by stripping non-word chars and lowercasing.
- id: image_connector_signal_get
  label: Get Connector Detected Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}'
  params:
    - name: connector_name
      type: string
      description: Connector object name (e.g. "displayport1")
- id: image_connector_signal_subscribe
  label: Subscribe to Connector Signal Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.displayport1.detectedsignal"},"id":1}'

# Image / picture settings
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized offset. 0=default, 1=100% offset. Range -1..1.
- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized gain. 1=default. Range 0..2.
- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":1}'
  params:
    - name: value
      type: float
      description: Default 2.2. Range 1..3.
- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized. 1=default. Range 0..2.
- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Range -2..8.
- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":1}'
  params:
    - name: value
      type: enum
      values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: image_window_main_position_set
  label: Set Main Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":1}'
- id: image_window_main_size_set
  label: Set Main Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}},"id":1}'
- id: image_window_main_scalingmode_set
  label: Set Main Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":1}'
  params:
    - name: value
      type: enum
      values: [Fill, OneToOne, FillScreen, Stretch]

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
- id: illumination_sources_introspect
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'
- id: illumination_laser_power_get
  label: Get Laser Power Level (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  notes: Source object name (e.g. "laser") is model-dependent; introspect illumination.sources to enumerate.
- id: illumination_laser_power_set
  label: Set Laser Power Level (%)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent. Read minpower/maxpower first; valid range is dynamic.
- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
- id: illumination_laser_maxpower_get
  label: Get Laser Maximum Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","params":{}}'
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","params":{}}'

# Warp / blend / blacklevel file processing
- id: warp_enable
  label: Enable Global Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
- id: warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
- id: warp_file_upload
  label: Upload Warp File (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  notes: HTTP file endpoint. Address in URL is the projector's LAN IP. Same path also supports GET to download current warp grid (e.g. /api/image/processing/warp/file/transfer/warpgrid.xml).
- id: blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
- id: blend_file_select
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["mask.png"]},"id":13}'
- id: blend_file_upload
  label: Upload Blend Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  notes: Blend masks must be grayscale 8 or 16 bit, resolution must match the project's blend layer (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Color images accepted but only blue channel used.
- id: blacklevel_file_enable
  label: Enable File Black Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
- id: blacklevel_file_upload
  label: Upload Black Level Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'

# Optics
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":1}'
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Closed"},"id":1}'
  params:
    - name: value
      type: enum
      values: [Open, Closed]
- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":1}'
- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":1}'
- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":1}'
- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":1}'

# Network
- id: network_lan_ip4config_get
  label: Get IPv4 LAN Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":1}'
- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":1}'

# DMX
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""},"id":1}'
- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":1}'
  params:
    - name: value
      type: integer
      description: 1..512
- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true},"id":1}'
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","params":{}}'
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","params":{}}'

# Environment
- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":1}'
- id: environment_getcontrolblocks_temperatures
  label: Get Temperature Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
- id: environment_getcontrolblocks_fanspeeds
  label: Get Fan Speed Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":19}'
- id: environment_getalarminfo
  label: Get Alarm Info List
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","params":{}}'

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","params":{}}'
- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions/Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","params":{}}'
- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{}}'

# Color (P7)
- id: color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string
- id: color_p7_custom_resetpreset
  label: Reset P7 Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string
- id: color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","params":{}}'
- id: color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","params":{}}'

# Introspection
- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
- id: introspect_nonrecursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}'

# LED control
- id: ledctrl_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED name (e.g. "systemstatus")
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer
      description: Blink period

# Subscriptions / signals
- id: property_subscribe
  label: Subscribe to One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
- id: property_unsubscribe
  label: Unsubscribe from One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
- id: signal_subscribe
  label: Subscribe to One Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
- id: signal_unsubscribe
  label: Unsubscribe from One Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'

# Serial wake
- id: serial_wake_from_eco
  label: Wake Projector from ECO via Serial (ASCII)
  kind: action
  command: ':POWR1\r'
  notes: ASCII string sent on the RS-232 serial port. Documented wake method for projectors in ECO mode.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state
- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state
- id: image_window_main_source
  type: string
  property: image.window.main.source
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  property: image.orientation
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  property: image.window.main.scalingmode
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position
- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate
- id: firmware_status
  type: enum
  values: [Unknown, OK, Upgradable]
  property: firmware.listcomponentversionstatus
- id: image_contrast
  type: float
  property: image.contrast
- id: image_brightness
  type: float
  property: image.brightness
- id: image_gamma
  type: float
  property: image.gamma
- id: image_saturation
  type: float
  property: image.saturation
- id: image_sharpness
  type: integer
  property: image.sharpness
- id: illumination_laser_power
  type: integer
  property: illumination.sources.laser.power
- id: illumination_laser_minpower
  type: integer
  property: illumination.sources.laser.minpower
- id: illumination_laser_maxpower
  type: integer
  property: illumination.sources.laser.maxpower
- id: optics_zoom_position
  type: integer
  property: optics.zoom.position
- id: optics_focus_position
  type: integer
  property: optics.focus.position
- id: optics_lensshift_horizontal_position
  type: integer
  property: optics.lensshift.horizontal.position
- id: optics_lensshift_vertical_position
  type: integer
  property: optics.lensshift.vertical.position
```

## Variables
```yaml
# UNRESOLVED: most "settings" in this device are modeled as JSON-RPC property.set actions
# rather than as standalone variables. Listed here are the few that the source describes
# as persistent boolean toggles rather than command invocations.
- id: system.standby.enable
  type: bool
  access: RW
  description: Enable/disable the standby state. Check availability before writing.
- id: system.eco.enable
  type: bool
  access: RW
  description: Enable/disable the ECO state. Check availability before writing.
- id: image.processing.warp.enable
  type: bool
  access: RW
  description: Globally enable/disable all warp functions.
- id: image.processing.warp.file.enable
  type: bool
  access: RW
  description: Enable/disable file-based warp.
- id: image.processing.blend.file.enable
  type: bool
  access: RW
  description: Enable/disable file-based blend.
- id: image.processing.blacklevel.file.enable
  type: bool
  access: RW
  description: Enable/disable file-based black level correction.
- id: dmx.shutdown
  type: bool
  access: RW
  description: Whether DMX shutdown is enabled.
```

## Events
```yaml
- id: property_changed
  description: Server-initiated notification containing array of property/value pairs.
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
- id: signal_callback
  description: Server-initiated notification containing array of signal/arg-list pairs.
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
- id: modelupdated
  description: Signal triggered when the object structure changes (objects added or removed).
  signal: modelupdated
- id: introspect_objectchanged
  description: Notification when introspection model adds or removes an object.
  payload: '{"object":"motors.motor1","newobject":true}'
```

## Macros
```yaml
# UNRESOLVED: the source does not describe any macro/scripting facility on the device.
# Power-on is a one-shot method call and does not require sequencing; the only
# documented multi-step procedure is the warp/blend activation flow:
- id: warp_activate
  label: Activate File Warp (Upload → Select → Enable)
  steps:
    - curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
- id: blend_activate
  label: Activate Blend Mask (Upload → Select → Enable)
  steps:
    - curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
- id: blacklevel_activate
  label: Activate Black Level Mask (Upload → Select → Enable)
  steps:
    - curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlocks, or
# power-on sequencing requirements. The only operational guidance is:
#   - Verify system.state is "standby" or "ready" before issuing system.poweron.
#   - Verify system.state is "on" before issuing system.poweroff.
#   - System.poweron/system.poweroff are no-ops when already in the target state
#     or in transition; do not assume error on null result.
```

## Notes
- Protocol is JSON-RPC 2.0. Parameters are passed by name; key order in params object is irrelevant.
- Source notes that the API surface is dynamic (peripherals, lens type, DMX mode). Use `introspect` to discover the actual available methods/properties/signals for a given connected device.
- Notification messages have no `id` and require no response. The client must implement `property.changed` and `signal.callback` handlers.
- Best practice: wait for `property.set` confirmation before issuing another `property.set` on the same property (avoids request flooding).
- Authentication is optional. Pass-code is numeric; default example in source is `98765`.
- File upload/download is plain HTTP, not JSON-RPC. Endpoints under `/api/...`.
- ECO-mode wake: serial port ASCII `:POWR1\r`, or Wake-on-LAN to projector MAC, or remote/keypad power button.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T19:10:36.544Z
last_checked_at: 2026-08-05T08:01:14.336Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:01:14.336Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions match JSON-RPC methods, HTTP file endpoints, or the serial wake token documented verbatim in the source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Source notes that some API parts are dynamic and depend on peripherals/configuration; introspection is the canonical way to enumerate the real API surface."
- "most \"settings\" in this device are modeled as JSON-RPC property.set actions"
- "the source does not describe any macro/scripting facility on the device."
- "source does not contain explicit safety warnings, interlocks, or"
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
