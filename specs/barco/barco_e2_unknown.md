---
spec_id: admin/barco-e2-control-spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: "Pulse-series projectors"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Pulse-series projectors"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.barco.com
  - audiogeneral.com
  - barco.com
source_urls:
  - https://assets.barco.com/m/3b64ca7d2e0027e/original/E2-Gen-2-BTO-en-Spec-sheet.pdf
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
  - https://www.barco.com/manuals/R5905948/index.html
retrieved_at: 2026-09-02T16:01:10.107Z
last_checked_at: 2026-09-02T22:18:03.569Z
generated_at: 2026-09-02T22:18:03.569Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "refined source document title is \"RS232 and Network Command Catalog / Pulse API\" but does not explicitly name the Barco E2 or any specific model. The user-supplied device name (Barco E2) is not corroborated by the source text. Treat the source as the generic Pulse API and note the gap."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:18:03.569Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions map to source-documented JSON-RPC methods/properties/signals/serial command; transport values verbatim in source's parameter table. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Barco Pulse Projector Control Spec

## Summary
This spec describes the Barco "Pulse" API for controlling Barco Pulse-series projectors. Two transports are documented: a JSON-RPC 2.0 service over TCP on port 9090, and an RS-232 serial connection carrying ASCII commands. The same logical commands are available on both transports.

<!-- UNRESOLVED: refined source document title is "RS232 and Network Command Catalog / Pulse API" but does not explicitly name the Barco E2 or any specific model. The user-supplied device name (Barco E2) is not corroborated by the source text. Treat the source as the generic Pulse API and note the gap. -->

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
  type: passcode  # source: "authenticate" method takes a "code" parameter; end-user access may skip auth
```

## Traits
```yaml
- powerable       # inferred: system.poweron / system.poweroff present
- routable        # inferred: image.window.main.source property set/get
- queryable       # inferred: property.get, system.state, illumination.state
- levelable       # inferred: illumination.sources.laser.power (read/write percent)
- observable      # inferred: property.subscribe, property.changed notifications
```

## Actions
```yaml
# Power
- id: system_poweron
  label: System Power On
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweron"}
  params: []

- id: system_poweroff
  label: System Power Off
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweroff"}
  params: []

- id: system_state_get
  label: Get System State
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}
  params: []

- id: system_state_subscribe
  label: Subscribe System State Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}
  params: []

- id: system_standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}
  params:
    - name: value
      type: boolean

- id: system_eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}
  params:
    - name: value
      type: boolean

# Authentication
- id: authenticate
  label: Authenticate with Passcode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}
  params:
    - name: code
      type: integer
      description: Secret pass code; required only for access above normal end user

# Sources / inputs
- id: image_source_list
  label: List Available Sources
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.list"}
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.connector.list"}
  params: []

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}
  params: []

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "SDI", "HDBaseT", etc.)

- id: image_window_main_source_subscribe
  label: Subscribe Window Source Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"}}
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}
  params:
    - name: sourceobject
      type: string
      description: Lowercase source name with non-word characters removed (e.g. "displayport1")

- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorobject}.detectedsignal"}}
  params:
    - name: connectorobject
      type: string
      description: Lowercase connector name with non-word characters removed

- id: image_connector_detectedsignal_subscribe
  label: Subscribe Connector Signal Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connectorobject}.detectedsignal"}}
  params:
    - name: connectorobject
      type: string

# Picture settings
- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}
  params:
    - name: value
      type: float
      description: Range -1 to 1; 0 is default, 1 is 100% offset

- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}
  params: []

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}
  params:
    - name: value
      type: float
      description: Range 0 to 2; 1 is default

- id: image_contrast_get
  label: Get Contrast
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}
  params: []

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}
  params:
    - name: value
      type: float
      description: Range 1 to 3; default 2.2

- id: image_gamma_get
  label: Get Gamma
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}
  params: []

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}
  params:
    - name: value
      type: float
      description: Range 0 to 2; 1 is default

- id: image_saturation_get
  label: Get Saturation
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}
  params: []

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}
  params:
    - name: value
      type: integer
      description: Range -2 to 8

- id: image_sharpness_get
  label: Get Sharpness
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}
  params: []

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"}}
  params:
    - name: value
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

# Window geometry
- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}
  params:
    - name: value
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}
  params: []

- id: illumination_state_subscribe
  label: Subscribe Illumination State Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power Level
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}
  params:
    - name: value
      type: integer
      description: Target power in percent (constrained dynamically; read minpower/maxpower first)

- id: illumination_laser_power_get
  label: Get Laser Power Level
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}
  params: []

- id: illumination_laser_power_subscribe
  label: Subscribe Laser Power Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]}}
  params: []

- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power Level
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}
  params: []

- id: illumination_laser_maxpower_get
  label: Get Laser Maximum Power Level
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"illumination.clo.engage"}
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}
  params: []

# Optics
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}
  params:
    - name: value
      type: string
      description: "Open" or "Closed"

- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}
  params: []

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}
  params: []

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}
  params: []

- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}
  params: []

- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}
  params: []

# Warp / blend / blacklevel file upload
- id: image_processing_warp_enable_set
  label: Enable Warp Globally
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}
  params:
    - name: value
      type: boolean

- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}
  params:
    - name: value
      type: boolean

- id: image_processing_blend_file_selected_set
  label: Select Blend Files
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":[{filename}]}}
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_enable_set
  label: Enable Blend File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}
  params:
    - name: value
      type: boolean

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}
  params:
    - name: value
      type: boolean

# Network
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Configuration
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}
  params: []

- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}
  params: []

# DMX
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"dmx.listmodes"}
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"dmx.listchannels"}
  params: []

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"}}
  params:
    - name: mode
      type: string

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}
  params: []

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}}}
  params:
    - name: channel
      type: integer
      description: DMX start channel [1..512]

- id: dmx_startchannel_get
  label: Get DMX Start Channel
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}
  params: []

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}
  params:
    - name: value
      type: boolean

- id: dmx_shutdown_get
  label: Get DMX Shutdown
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}
  params: []

# Environment
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}
  params:
    - name: type
      type: string
      description: One of "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"
    - name: valuetype
      type: string
      description: e.g. "Temperature", "Speed", "Voltage", "Current", "Power", "Humidity", etc.

- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getalarminfo"}
  params: []

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"firmware.listcomponents"}
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions/Status
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade at Next Reboot
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}
  params: []

# Color (P7) custom presets
- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset to Default
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}
  params: []

# Introspection
- id: introspect
  label: Introspect Object
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty = introspect everything)
    - name: recursive
      type: boolean

# Signals
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}
  params:
    - name: signal
      type: string

- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

# Property get/set (generic)
- id: property_get
  label: Get Property Value
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}
  params:
    - name: property
      type: string
      description: Dotted property name (e.g. "image.brightness")

- id: property_set
  label: Set Property Value
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}
  params:
    - name: property
      type: string
    - name: value
      description: Property value (type depends on property)

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}
  params:
    - name: property
      type: string

- id: property_subscribe_multi
  label: Subscribe to Multiple Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

# LED control
- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer

# Serial-only: ECO wake
- id: serial_wake_from_eco
  label: Wake Projector from ECO Mode (Serial)
  kind: action
  command: ":POWR1\r"
  params: []
  transport: serial
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: "boot, eco, standby, ready, conditioning, on, service, deconditioning, error"
  description: Result of property.get system.state

- id: illumination_state
  type: enum
  values: "On, Off"
  description: Result of property.get illumination.state

- id: network_lan_state
  type: enum
  values: "CONNECTED, DISCONNECTED"
  description: Result of property.get network.device.lan.state

- id: optics_shutter_position
  type: enum
  values: "Open, Closed"
  description: Result of property.get optics.shutter.position

- id: optics_shutter_target
  type: enum
  values: "Open, Closed"
  description: Result of property.get optics.shutter.target

- id: environment_alarmstate
  type: enum
  values: "Fatal, Error, Alert, Warning, Ok"

- id: firmware_component_status
  type: enum
  values: "Unknown, OK, Upgradable"

- id: image_window_main_scalingmode
  type: enum
  values: "Fill, OneToOne, FillScreen, Stretch"

- id: image_orientation
  type: enum
  values: "DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR"

- id: image_brightness_value
  type: float
  description: Range -1 to 1

- id: image_contrast_value
  type: float
  description: Range 0 to 2

- id: image_gamma_value
  type: float
  description: Range 1 to 3

- id: image_saturation_value
  type: float
  description: Range 0 to 2

- id: image_sharpness_value
  type: integer
  description: Range -2 to 8

- id: illumination_laser_power_value
  type: integer
  description: Percent; read minpower/maxpower for current valid range

- id: environment_temperature_readings
  type: object
  description: Dictionary mapping sensor name (e.g. environment.temperature.inlet) to float Celsius

- id: environment_fan_speed_readings
  type: object
  description: Dictionary mapping fan name (e.g. environment.fan.psu.tacho) to RPM
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: "-1 to 1"
  step_size: 0.01
  property: image.brightness

- id: image_contrast
  type: float
  range: "0 to 2"
  step_size: 0.01
  property: image.contrast

- id: image_gamma
  type: float
  range: "1 to 3"
  step_size: 0.1
  property: image.gamma

- id: image_saturation
  type: float
  range: "0 to 2"
  step_size: 0.01
  property: image.saturation

- id: image_sharpness
  type: integer
  range: "-2 to 8"
  step_size: 1
  property: image.sharpness

- id: illumination_laser_power
  type: integer
  range: "dynamic (see minpower/maxpower)"
  property: illumination.sources.laser.power

- id: dmx_startchannel
  type: integer
  range: "1 to 512"
  property: dmx.startchannel

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

- id: image_window_main_position
  type: object
  property: image.window.main.position

- id: image_window_main_size
  type: object
  property: image.window.main.size

- id: network_device_lan_ip4config
  type: object
  property: network.device.lan.ip4config
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when a subscribed property value changes. Client must implement property.changed handler. Payload uses {jsonrpc:2.0, method:property.changed, params:{property:[{name:value}]}}

- id: signal_callback
  description: Server-pushed notification when a subscribed signal fires. Client must implement signal.callback handler. Payload uses {jsonrpc:2.0, method:signal.callback, params:{signal:[{name:{args}}]}}

- id: modelupdated
  description: Signal emitted when the introspection object model changes (objects added or removed)
```

## Macros
```yaml
- id: warp_grid_upload_and_apply
  label: Upload, Select, and Enable a Warp Grid
  steps:
    - curl -X POST -F file=@warp.xml http://<projector>/api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected "<warp.xml>"
    - property.set image.processing.warp.file.enable true
  notes: Multi-step sequence described explicitly in source for warping with grid files.

- id: blend_mask_upload_and_apply
  label: Upload, Select, and Enable a Blend Mask
  steps:
    - curl -X POST -F file=@mask.png http://<projector>/api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected "<mask.png>"
    - property.set image.processing.blend.file.enable true

- id: blacklevel_mask_upload_and_apply
  label: Upload, Select, and Enable a Black Level Mask
  steps:
    - curl -X POST -F file=@blacklevel.png http://<projector>/api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected "<blacklevel.png>"
    - property.set image.processing.blacklevel.file.enable true

- id: source_change_notification_subscribe
  label: Subscribe to Source and Signal Updates
  steps:
    - image.source.list
    - Translate source names to object names (lowercase, strip non-word chars)
    - For each source: image.source.<name>.listconnectors
    - For each connector: subscribe image.connector.<name>.detectedsignal
    - Subscribe image.window.main.source

- id: wake_from_eco
  label: Wake Projector from ECO Mode
  steps:
    - Send Wake-on-LAN to projector's MAC address, OR
    - Use remote/keypad power button, OR
    - Send ":POWR1\r" on the RS-232 serial port
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks:
  - Verify system.state is standby or ready before issuing system.poweron (no-op if already on or transitioning)
  - Verify system.state is on before issuing system.poweroff (no-op if already off or transitioning)
  - Read illumination.sources.laser.minpower / maxpower before setting illumination.sources.laser.power (range is dynamic)
  - Avoid setting same property repeatedly without waiting for property.set confirmation to prevent request flooding
```

## Notes
- Source document is generic to the Barco "Pulse" projector platform, not model-specific. The supplied device name "Barco E2" is not corroborated by the source text; treated as a generic Pulse spec.
- Two transports expose the same logical commands: JSON-RPC over TCP (port 9090) and RS-232 ASCII commands (19200 8N1, no flow control).
- For long-running operations (power transitions), the source recommends polling system.state rather than relying on the property.set result, which returns null for system.poweron / system.poweroff.
- The API is dynamic; capabilities vary by installed lens, peripherals, and DMX mode. Introspection (introspect method) is the source-recommended way to discover the actual available surface for a given device.
- All property values in requests may be passed by name; JSON object key order does not matter.
- Notification messages from the server have no id field; clients must not reply to them.
- File endpoints (warp, blend, blacklevel) use HTTP POST to /api/.../file/transfer on the projector's IP; the JSON-RPC port (9090) is distinct from this HTTP service.
```

Saved to `/tmp/barco_e2_spec.md`. Ready for ingest.

Key callouts:
- Source generic to "Pulse" platform, not specifically Barco E2. Marked UNRESOLVED at top + Notes.
- Transport: TCP 9090 + serial 19200 8N1, both stated.
- ~70 actions enumerated from source's method/property/signal catalog (power, sources, picture, illumination, optics, warp/blend/blacklevel, network, DMX, environment, firmware, introspection, signals, led, serial ECO wake).
- Macros: each sequence uses `steps:` as proper block list under the macro key (not bare list lines).
- Safety: fenced YAML with `confirmation_required_for` + `interlocks` mappings, not empty array.

## Provenance

```yaml
source_domains:
  - assets.barco.com
  - audiogeneral.com
  - barco.com
source_urls:
  - https://assets.barco.com/m/3b64ca7d2e0027e/original/E2-Gen-2-BTO-en-Spec-sheet.pdf
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
  - https://www.barco.com/manuals/R5905948/index.html
retrieved_at: 2026-09-02T16:01:10.107Z
last_checked_at: 2026-09-02T22:18:03.569Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:18:03.569Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions map to source-documented JSON-RPC methods/properties/signals/serial command; transport values verbatim in source's parameter table. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source document title is \"RS232 and Network Command Catalog / Pulse API\" but does not explicitly name the Barco E2 or any specific model. The user-supplied device name (Barco E2) is not corroborated by the source text. Treat the source as the generic Pulse API and note the gap."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
