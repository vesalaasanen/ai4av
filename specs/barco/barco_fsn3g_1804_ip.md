---
spec_id: admin/barco-fsn3g-1804
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fsn3G 1804 Control Spec"
manufacturer: Barco
model_family: "Barco Fsn3G 1804"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Fsn3G 1804"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-02T06:04:04.973Z
last_checked_at: 2026-08-05T08:07:26.903Z
generated_at: 2026-08-05T08:07:26.903Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the \"Pulse API\" reference, which applies to the Pulse projector family. The Fsn3G 1804 is a live-video processor/multiviewer; this spec assumes the Pulse API applies to it. Operator must verify."
  - "source does not define composite macros beyond the named"
  - "no hardware-level interlocks, fault-recovery sequences, or"
  - "device-specific firmware compatibility, exact list of runtime properties for the Fsn3G 1804, and any device-specific safety limits are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:07:26.903Z
  matched_actions: 84
  action_count: 84
  confidence: medium
  summary: "All 84 spec actions map to a literal JSON-RPC method, HTTP endpoint, or serial escape present verbatim in the source; transport parameters port 9090 and serial 19200/8/N/1/N all appear verbatim; coverage ratio 84/84. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Barco Fsn3G 1804 Control Spec

## Summary

This spec describes control of the Barco Fsn3G 1804 via the Barco Pulse JSON-RPC 2.0 API over TCP/IP (port 9090), and over RS-232 using the documented serial parameters. The same JSON-RPC command set is available across both transports. Authentication via pass code is optional for end-user access; higher access levels require an `authenticate` call.

<!-- UNRESOLVED: source document is the "Pulse API" reference, which applies to the Pulse projector family. The Fsn3G 1804 is a live-video processor/multiviewer; this spec assumes the Pulse API applies to it. Operator must verify. -->

## Transport

```yaml
# Both TCP and RS-232 documented. Same JSON-RPC command set on both.
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
  type: passcode  # inferred: source documents optional authenticate call with secret code
```

## Traits

```yaml
# powerable - system.poweron / system.poweroff present
# routable - image.window.main.source selection present
# queryable - property.get / system.state / environment.getcontrolblocks present
# levelable - image.brightness, contrast, gamma, saturation, sharpness present
# subscribable - property.subscribe / signal.subscribe present
```

## Actions

```yaml
# JSON-RPC 2.0 over TCP (and same commands over RS-232). All commands are JSON
# objects. The `command:` field below shows the JSON body verbatim. The
# `id` field is optional and not included in the template.
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

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'
  params: []

- id: subscribe_system_state
  label: Subscribe System State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "system.state"}}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from `image.source.list` (e.g. "DisplayPort 1", "HDMI", "DVI 1", "SDI", "HDBaseT")

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'
  params: []

- id: subscribe_active_source
  label: Subscribe Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.window.main.source"}}'
  params: []

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": "{x}", "y": "{y}"}}}'
  params:
    - name: x
      type: integer
      description: X coordinate
    - name: y
      type: integer
      description: Y coordinate

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": "{width}", "height": "{height}"}}}'
  params:
    - name: width
      type: integer
      description: Width in pixels
    - name: height
      type: integer
      description: Height in pixels

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "{mode}"}}'
  params:
    - name: mode
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}'
  params:
    - name: value
      type: float
      min: -1
      max: 1
      description: Normalized brightness; 0 = default, 1 = 100% offset

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}'
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": {value}}}'
  params:
    - name: value
      type: float
      min: 0
      max: 2
      description: Normalized contrast; 1 = default

- id: get_contrast
  label: Get Contrast
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.contrast"}}'
  params: []

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": {value}}}'
  params:
    - name: value
      type: float
      min: 1
      max: 3
      description: Gamma value; default 2.2

- id: get_gamma
  label: Get Gamma
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.gamma"}}'
  params: []

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": {value}}}'
  params:
    - name: value
      type: float
      min: 0
      max: 2
      description: Normalized saturation; 1 = default

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": {value}}}'
  params:
    - name: value
      type: integer
      min: -2
      max: 8
      description: Sharpness level

- id: set_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "{orientation}"}}'
  params:
    - name: orientation
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {value}}}'
  params:
    - name: value
      type: integer
      description: Power in percent

- id: get_laser_min_power
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_max_power
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}'
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

- id: set_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}'
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
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Local path to blend mask PNG (8 or 16-bit grayscale)

- id: select_blend_files
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": ["{filename}"]}}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Local path to black level mask PNG (8 or 16-bit grayscale)

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}'
  params: []

- id: get_environmental_sensors
  label: Get Environmental Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "{valuetype}"}}'
  params:
    - name: valuetype
      type: string
      enum: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

- id: get_environmental_alarms
  label: Get Environmental Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: get_environmental_alarm_state
  label: Get Environmental Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'
  params: []

- id: set_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.position", "value": "{position}"}}'
  params:
    - name: position
      type: string
      enum: [Open, Closed]

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "{target}"}}'
  params:
    - name: target
      type: string
      enum: [Open, Closed]

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position"}}'
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position"}}'
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
      min: 1
      max: 512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: set_system_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: set_system_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: get_network_ip4_config
  label: Get IPv4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get Network State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'
  params: []

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": {code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code; required only for elevated access levels

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}}'
  params:
    - name: object
      type: string
      description: Dot-notation object name (empty string for full introspection)
    - name: recursive
      type: boolean
      description: true for full tree, false for one level

- id: introspect_alt
  label: Introspect Object (Alt Form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", {recursive}]}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: introspect_motors
  label: Introspect Motors (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "motors", "recursive": false}}'
  params: []

- id: introspect_motors_alt
  label: Introspect Motors (Alt Form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["motors", false]}'
  params: []

- id: property_set
  label: Set Property (Generic)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: value
      type: string
      description: New value (string, number, bool, or object as JSON)

- id: property_get
  label: Get Property (Generic)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: property_subscribe
  label: Subscribe Property (Generic)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string

- id: property_subscribe_multi
  label: Subscribe Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: property_unsubscribe
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["{prop1}", "{prop2}"]}}'
  params:
    - name: prop1
      type: string
    - name: prop2
      type: string

- id: signal_subscribe
  label: Subscribe Single Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated")

- id: signal_subscribe_multi
  label: Subscribe Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe Single Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multi
  label: Unsubscribe Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "systemstatus", "color": "red", "period": 42}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: list_firmware_version_status
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: p7_copy_preset_to_custom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{preset}"}}'
  params:
    - name: preset
      type: string

- id: p7_reset_preset
  label: P7 Reset Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{preset}"}}'
  params:
    - name: preset
      type: string

- id: p7_reset_to_native
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: rgb_mode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{name}.detectedsignal"}}'
  params:
    - name: name
      type: string
      description: Concrete connector name (e.g. "l1hdmi", "displayport1")

- id: list_source_connectors
  label: List Connectors of Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{name}.listconnectors"}'
  params:
    - name: name
      type: string
      description: Source object name derived from source name (e.g. "displayport1")

- id: serial_eco_wakeup
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Send as ASCII characters on the serial port to wake projector from ECO mode.
```

## Feedbacks

```yaml
- id: system_state
  type: enum
  description: Operation state of the projector; observed via `property.get` "system.state" or `property.subscribe`
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  description: Light source on/off state
  values: [On, Off]

- id: environment_alarm_state
  type: enum
  description: Aggregated environmental alarm level
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_state
  type: enum
  description: LAN state
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: firmware_component_status
  type: enum
  description: Per-component upgrade status
  values: [Unknown, OK, Upgradable]
```

## Variables

```yaml
- id: image_brightness
  type: float
  min: -1
  max: 1
  description: Normalized brightness; 0 = default, 1 = 100% offset

- id: image_contrast
  type: float
  min: 0
  max: 2
  description: Normalized contrast; 1 = default

- id: image_gamma
  type: float
  min: 1
  max: 3
  description: Gamma value; default 2.2

- id: image_saturation
  type: float
  min: 0
  max: 2
  description: Normalized saturation; 1 = default

- id: image_sharpness
  type: integer
  min: -2
  max: 8

- id: illumination_laser_power
  type: integer
  description: Laser power in percent
  min: 0
  max: 100

- id: illumination_laser_min_power
  type: integer
  description: Read-only dynamic minimum laser power in percent

- id: illumination_laser_max_power
  type: integer
  description: Read-only dynamic maximum laser power in percent

- id: window_position
  type: object
  schema: {x: int, y: int}

- id: window_size
  type: object
  schema: {width: int, height: int}

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: network_ip4_config
  type: object
  schema:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
```

## Events

```yaml
- id: property_changed
  method: property.changed
  direction: device=>client
  payload: |
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "<dot.path>": <value> } ] } }
  description: Unsolicited notification when one or more subscribed properties change.

- id: signal_callback
  method: signal.callback
  direction: device=>client
  payload: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "<signal>": { ...args } } ] } }
  description: Unsolicited notification when a subscribed signal fires.

- id: modelupdated_signal
  method: signal.subscribe target
  direction: device=>client
  description: Triggered when the introspect object structure changes (objects added/removed).

- id: introspect_objectchanged
  method: signal.callback payload example
  payload: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }
```

## Macros

```yaml
# UNRESOLVED: source does not define composite macros beyond the named
# procedural examples (power-on / warp / blend / blacklevel workflows).
# Operators may compose these as multi-step scripts at the application layer.
```

## Safety

```yaml
confirmation_required_for:
  - power_off
  - firmware.schedulecomponentupgrade
interlocks:
  # Source notes: power_on is a no-op unless system.state is "standby" or "ready".
  # power_off is a no-op unless system.state is "on". Operators should verify state
  # before issuing power commands.
  - verify_standby_before_power_on
  - verify_on_before_power_off
# UNRESOLVED: no hardware-level interlocks, fault-recovery sequences, or
# safety warnings present in the source beyond the state-check recommendations.
```

## Notes

- **API surface is dynamic**: source explicitly states that the API depends on installed peripherals, lens type, DMX mode, and other runtime factors. Always call `introspect` to discover what is actually present on the connected device.
- Source document covers the Barco Pulse API which is shared across Pulse-family projectors. The Fsn3G 1804 is a live-video processor/multiviewer; some of the optical/illumination properties (zoom, focus, laser, illumination) likely do not apply. Operators must introspect before issuing commands against unfamiliar subsystems.
- ECO-mode wake requires Wake-on-LAN, remote/keypad power, or the serial escape sequence `:POWR1\r`. The JSON-RPC layer is not usable while the projector is in ECO.
- `property.set` is fire-and-confirm; do not flood the server with consecutive sets of the same property without waiting for the confirmation.
- Same JSON-RPC commands work over both TCP (port 9090) and RS-232.
- DMX: in basic mode only 2 channels are present; extended mode exposes more.
- Warp file format matches MCM500/400.
- Blend/blacklevel masks: grayscale PNG up to 16-bit, JPEG, or TIFF. File uploads use HTTP POST to `/api/image/processing/{warp,blend,blacklevel}/file/transfer`.
- "Rs232" command `:POWR1\r` (with CR) is the documented ASCII wake sequence.

<!-- UNRESOLVED: device-specific firmware compatibility, exact list of runtime properties for the Fsn3G 1804, and any device-specific safety limits are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-02T06:04:04.973Z
last_checked_at: 2026-08-05T08:07:26.903Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:07:26.903Z
matched_actions: 84
action_count: 84
confidence: medium
summary: "All 84 spec actions map to a literal JSON-RPC method, HTTP endpoint, or serial escape present verbatim in the source; transport parameters port 9090 and serial 19200/8/N/1/N all appear verbatim; coverage ratio 84/84. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the \"Pulse API\" reference, which applies to the Pulse projector family. The Fsn3G 1804 is a live-video processor/multiviewer; this spec assumes the Pulse API applies to it. Operator must verify."
- "source does not define composite macros beyond the named"
- "no hardware-level interlocks, fault-recovery sequences, or"
- "device-specific firmware compatibility, exact list of runtime properties for the Fsn3G 1804, and any device-specific safety limits are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
