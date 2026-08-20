---
spec_id: admin/barco-i65-w10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco I65 W10 Control Spec"
manufacturer: Barco
model_family: "I65 W10"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "I65 W10"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:13:53.776Z
last_checked_at: 2026-08-19T08:38:55.606Z
generated_at: 2026-08-19T08:38:55.606Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete enumeration of all sources per model; documentation applies to Pulse platform broadly"
  - "required for elevated access; optional for normal end-user"
  - "source does not enumerate multi-step macros; only the warp and blend upload sequences are documented as inline procedure steps"
  - "additional safety warnings, high-voltage procedures, or service interlocks not present in source"
  - "complete enumeration of all sources per model; firmware version compatibility range; per-channel/zone variants not enumerated in source; service-access password format."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:38:55.606Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec action units (authenticate, system.poweron/off, property.get/set/subscribe/unsubscribe, image.*, illumination.*, environment.*, dmx.*, firmware.*, serial wake) appear verbatim in the source; transport params (9090/19200/8/N/1) match source RS232 table; ratio85/85 above 0.9. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco I65 W10 Control Spec

## Summary
Pulse API control for Barco I65 W10 projector. JSON-RPC 2.0 over TCP port 9090, plus RS-232 serial with ASCII wake-up command. Covers power, source selection, illumination, picture settings, warp/blend, environment, optics, DMX, firmware.

<!-- UNRESOLVED: complete enumeration of all sources per model; documentation applies to Pulse platform broadly -->

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
  type: passcode  # UNRESOLVED: required for elevated access; optional for normal end-user
```

## Traits
```yaml
- powerable       # system.poweron, system.poweroff
- routable        # source selection via property.set
- queryable       # property.get, environment.getcontrolblocks
- levelable       # image.brightness, contrast, gamma, saturation, sharpness, illumination.sources.laser.power
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": 98765}}'
  params:
    - name: id
      type: integer
      description: Request identifier
    - name: code
      type: integer
      description: Secret pass code for elevated access

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: get_power_state
  label: Get Power State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 1, "property": "system.state"}}'
  params: []

- id: subscribe_power_state
  label: Subscribe to Power State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 2, "property": "system.state"}}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI")

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors", "id": 4}'
  params:
    - name: sourcename
      type: string
      description: Source object name (non-word chars stripped, lowercased, e.g. "displayport1")

- id: get_source_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 5, "property": "image.connector.{connectorname}.detectedsignal"}}'
  params:
    - name: connectorname
      type: string
      description: Connector object name (e.g. "displayport1")

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 0, "property": "illumination.state"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 1, "property": "illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power Level
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 3, "property": "illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {power}}}'
  params:
    - name: power
      type: integer
      description: Target power in percent

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 6, "property": "illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 5, "property": "illumination.sources.laser.maxpower"}}'
  params: []

- id: introspect_illumination
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"property": "illumination.sources", "recursive": false, "id": 2}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 7, "property": "image.brightness"}}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Normalized brightness (-1 to 1, 0=default)

- id: subscribe_brightness
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 8, "property": ["image.brightness"]}}'
  params: []

- id: get_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.contrast"}}'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Normalized contrast (0 to 2, 1=default)

- id: get_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.gamma"}}'
  params: []

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Gamma value (1 to 3, default 2.2)

- id: get_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.saturation"}}'
  params: []

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Normalized saturation (0 to 2, 1=default)

- id: get_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.sharpness"}}'
  params: []

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": {value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness (-2 to 8)

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "{orientation}"}}'
  params:
    - name: orientation
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": {x}, "y": {y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": {width}, "height": {height}}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "{mode}"}}'
  params:
    - name: mode
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 10, "property": "image.processing.warp.enable", "value": true}}'
  params: []

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Warp grid file (e.g. warp.xml)

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 11, "property": "image.processing.warp.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 12, "property": "image.processing.warp.file.enable", "value": true}}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: address
      type: string
    - name: filename
      type: string
      description: Blend mask PNG (8 or 16 bit grayscale)

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 13, "property": "image.processing.blend.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 14, "property": "image.processing.blend.file.enable", "value": true}}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: address
      type: string
    - name: filename
      type: string
      description: Black level mask PNG (8 or 16 bit grayscale)

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 15, "property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 16, "property": "image.processing.blacklevel.file.enable", "value": true}}'
  params: []

- id: get_environment_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}, "id": 18}'
  params: []

- id: get_environment_fans
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Speed"}, "id": 19}'
  params: []

- id: get_environment_alarms
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'
  params: []

- id: enable_standby
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": true}}'
  params: []

- id: enable_eco
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": true}}'
  params: []

- id: set_shutter
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "{target}"}}'
  params:
    - name: target
      type: string
      description: "Open" or "Closed"

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'
  params: []

- id: set_zoom
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.zoom.position", "value": {position}}}'
  params:
    - name: position
      type: integer

- id: set_focus
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.focus.position", "value": {position}}}'
  params:
    - name: position
      type: integer

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.horizontal.position", "value": {position}}}'
  params:
    - name: position
      type: integer

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.vertical.position", "value": {position}}}'
  params:
    - name: position
      type: integer

- id: get_network_ipv4
  label: Get IPv4 Network Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get Network State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'
  params: []

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_nonrecursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", false], "id": 2}'
  params:
    - name: object
      type: string

- id: subscribe_property
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 6, "property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: subscribe_properties_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 7, "property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: unsubscribe_property
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"id": 8, "property": "{property}"}}'
  params:
    - name: property
      type: string

- id: unsubscribe_properties_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"id": 9, "property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 4, "property": "{property}"}}'
  params:
    - name: property
      type: string

- id: get_properties_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 5, "property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
    - name: value
      type: any

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"id": 10, "signal": "{signal}"}}'
  params:
    - name: signal
      type: string

- id: subscribe_signals_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"id": 11, "signal": ["{signal1}", "{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"id": 12, "signal": "{signal}"}}'
  params:
    - name: signal
      type: string

- id: unsubscribe_signals_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"id": 13, "signal": ["{signal1}", "{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"id": 3, "led": "{led}", "color": "{color}", "period": {period}}}'
  params:
    - name: led
      type: string
      description: LED name (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode", "value": "{mode}"}}'
  params:
    - name: mode
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": {channel}}}'
  params:
    - name: channel
      type: integer
      description: 1 to 512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_list_versions
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedule_upgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: color_p7_copy_preset
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_reset_preset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_reset_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: rgb_mode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: serial_wake_eco
  label: Wake Projector from ECO via Serial
  kind: action
  command: ":POWR1\r"
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

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: detected_signal
  type: object
  description: Signal info (active, name, resolutions, frequencies, scan, color_space, etc.)

- id: env_temperature
  type: object
  description: Map of sensor name to temperature reading in degrees

- id: env_fan_speed
  type: object
  description: Map of fan name to RPM

- id: env_alarm_info
  type: array
  description: Array of {severity, timestamp, source, description, custommessage}

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
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

- id: laser_power
  type: integer
  unit: percent

- id: laser_minpower
  type: integer
  unit: percent
  read_only: true

- id: laser_maxpower
  type: integer
  unit: percent
  read_only: true

- id: window_position
  type: object
  fields: [x, y]

- id: window_size
  type: object
  fields: [width, height]

- id: zoom_position
  type: integer

- id: focus_position
  type: integer

- id: lensshift_horizontal
  type: integer

- id: lensshift_vertical
  type: integer

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_mode
  type: string

- id: dmx_shutdown
  type: boolean

- id: network_ipv4_config
  type: object
  fields: [Address, Mask, Gateway, NameServers]

- id: standby_enabled
  type: boolean

- id: eco_enabled
  type: boolean
```

## Events
```yaml
- id: property_changed
  signal: property.changed
  description: Server pushes notification when a subscribed property value changes
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"objectname.propertyname": value}]}}'

- id: signal_callback
  signal: signal.callback
  description: Server pushes notification when a subscribed signal is emitted
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {arg1, arg2}}]}}'

- id: modelupdated
  signal: modelupdated
  description: Triggered when object structure changes (objects added or removed)

- id: introspect_objectchanged
  signal: introspect.objectchanged
  description: Triggered when new objects arrive or are removed
  payload: '{"object": "motors.motor1", "newobject": true}'

- id: led_blink
  signal: ledctrl.blink
  description: Command to blink an LED (example of method invocation pattern)
```

## Macros
```yaml
# UNRESOLVED: source does not enumerate multi-step macros; only the warp and blend upload sequences are documented as inline procedure steps
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - firmware_schedule_upgrade
interlocks:
  - Verify system.state is standby or ready before issuing power_on
  - Verify system.state is on before issuing power_off
  - ECO mode requires wake-on-LAN, remote, keypad, or serial ":POWR1\r" before power control
# UNRESOLVED: additional safety warnings, high-voltage procedures, or service interlocks not present in source
```

## Notes
- API is JSON-RPC 2.0 over TCP. RS-232 serial only documented for the `:POWR1\r` wake-up sequence; remaining serial parameters (19200/8/N/1) stated in the source as the connection parameters for the Pulse services serial port.
- Authentication is optional for normal end-user; requires pass code for elevated access.
- All base JSON-RPC examples in source use `id` field; source positions vary between top-level and inside `params` — both are accepted by JSON-RPC 2.0.
- Source list varies by model: typical entries include DVI 1/2, DisplayPort 1/2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI.
- Reflecting source/connector structure on client side recommended for signal update subscriptions.
- DMX basic mode = 2 channels; extended mode exposes more channels (not enumerated in source).
- Properties, methods, and signals are dynamic; best to introspect for the given projector configuration.

<!-- UNRESOLVED: complete enumeration of all sources per model; firmware version compatibility range; per-channel/zone variants not enumerated in source; service-access password format. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:13:53.776Z
last_checked_at: 2026-08-19T08:38:55.606Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:38:55.606Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec action units (authenticate, system.poweron/off, property.get/set/subscribe/unsubscribe, image.*, illumination.*, environment.*, dmx.*, firmware.*, serial wake) appear verbatim in the source; transport params (9090/19200/8/N/1) match source RS232 table; ratio85/85 above 0.9. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete enumeration of all sources per model; documentation applies to Pulse platform broadly"
- "required for elevated access; optional for normal end-user"
- "source does not enumerate multi-step macros; only the warp and blend upload sequences are documented as inline procedure steps"
- "additional safety warnings, high-voltage procedures, or service interlocks not present in source"
- "complete enumeration of all sources per model; firmware version compatibility range; per-channel/zone variants not enumerated in source; service-access password format."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
