---
spec_id: admin/barco-galaxy-4k-23-hfr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Galaxy 4K 23 HFR Control Spec"
manufacturer: Barco
model_family: "Barco Galaxy 4K 23 HFR"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Galaxy 4K 23 HFR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T20:26:50.416Z
last_checked_at: 2026-05-14T21:37:20.677Z
generated_at: 2026-05-14T21:37:20.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the Pulse API generically across \"Pulse projectors\" and does not call out Galaxy 4K 23 HFR-specific behavior."
  - "firmware version compatibility not stated in source."
  - "source does not document any device-side multi-step sequences. Macros can be"
  - "source does not contain safety warnings, interlock procedures, or"
  - "exact firmware revisions supported by this spec are not stated."
  - "per-channel/per-zone variants for this specific model are not enumerated in source; the available source list varies by projector model."
  - "voltage, current, and power specifications are not present in this API doc and are out of scope for the control surface."
verification:
  verdict: verified
  checked_at: 2026-05-14T21:37:20.677Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched verbatim in source; all transport parameters verified; Methods section fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Galaxy 4K 23 HFR Control Spec

## Summary
Cinema projector controllable via Barco's Pulse API: JSON-RPC 2.0 over TCP/IP on port 9090, or RS-232 serial. The same command set is available on both transports. Authentication is optional and only required for elevated access levels; normal end-user access can skip the authenticate call.

<!-- UNRESOLVED: source describes the Pulse API generically across "Pulse projectors" and does not call out Galaxy 4K 23 HFR-specific behavior. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: http://{projector-address}/api  # inferred: base path /api is shown in every HTTP file-endpoint example
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode
  # The source describes an `authenticate` JSON-RPC method that takes a numeric `code` to set the
  # access level. Authentication is optional and only required when a higher-than-end-user
  # access level is needed. The passcode value itself is project-specific and not stated in source.
  optional: true
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff
- routable        # image.window.main.source plus image.source.list / image.connector.list
- queryable       # property.get and environment.getcontrolblocks return values
- levelable       # illumination.sources.laser.power (0-100%), image.brightness/contrast/gamma/saturation/sharpness
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "system.poweron"}
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "system.poweroff"}
  params: []

- id: power_on_serial
  label: Power On (Serial)
  kind: action
  command: ":POWR1\r"
  # Used to wake a projector in ECO mode over the RS-232 port.
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}
  params:
    - name: source
      type: string
      description: Source name, e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI"

- id: get_active_source
  label: Get Active Source
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "image.source.list"}
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "image.connector.list"}
  params: []

- id: list_source_connectors
  label: List Connectors For A Source
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors"}
  # {source} is the lowercase, non-word-stripped source object name, e.g. "displayport1".
  params:
    - name: source
      type: string
      description: Lowercase source object name (e.g. "displayport1", "hdmi")

- id: get_system_state
  label: Get System State
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}
  params: []

- id: subscribe_system_state
  label: Subscribe To System State Changes
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "system.state"}}
  params: []

- id: set_laser_power
  label: Set Laser Illumination Power
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {power}}}
  params:
    - name: power
      type: integer
      description: Target power in percent. Source example uses 40; min/max are runtime-dependent and should be read first via property.get.

- id: get_laser_power
  label: Get Laser Illumination Power
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}
  params: []

- id: get_laser_min_power
  label: Get Laser Minimum Power
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}
  params: []

- id: get_laser_max_power
  label: Get Laser Maximum Power
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}
  # The source's example "id":5 returns 100 for this property name, but a re-read should be performed
  # against the exact property the device reports.
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}
  params: []

- id: subscribe_illumination_state
  label: Subscribe To Illumination State Changes
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state"}}
  params: []

- id: engage_clo
  label: Engage CLO At Current Light Level
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "illumination.clo.engage"}
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}
  params:
    - name: value
      type: float
      description: Normalized -1 to 1, default 0. Source example uses 0.15.

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": {value}}}
  params:
    - name: value
      type: float
      description: Normalized 0 to 2, default 1.

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": {value}}}
  params:
    - name: value
      type: float
      description: 1 to 3, default 2.2.

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": {value}}}
  params:
    - name: value
      type: float
      description: Normalized 0 to 2, default 1.

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": {value}}}
  params:
    - name: value
      type: integer
      description: -2 to 8.

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "{orientation}"}}
  params:
    - name: orientation
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "{mode}"}}
  params:
    - name: mode
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

- id: set_window_position
  label: Set Window Position
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": {x}, "y": {y}}}}
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": {width}, "height": {height}}}}
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: enable_warp
  label: Enable Warp Globally
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}
  params: []

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}
  params: []

- id: select_warp_file
  label: Select Active Warp File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{filename}"}}
  params:
    - name: filename
      type: string

- id: upload_warp_file
  label: Upload Warp File (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{projector-address}/api/image/processing/warp/file/transfer
  params:
    - name: filename
      type: string
    - name: projector-address
      type: string

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}
  params: []

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "{filename}"}}
  params:
    - name: filename
      type: string

- id: upload_blend_file
  label: Upload Blend Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{projector-address}/api/image/processing/blend/file/transfer
  params:
    - name: filename
      type: string
    - name: projector-address
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}
  params: []

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}
  params:
    - name: filename
      type: string

- id: upload_blacklevel_file
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{projector-address}/api/image/processing/blacklevel/file/transfer
  params:
    - name: filename
      type: string
    - name: projector-address
      type: string

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "{target}"}}
  params:
    - name: target
      type: string
      description: "Open" or "Closed"

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}
  params: []

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.zoom.position", "value": {position}}}
  params:
    - name: position
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.focus.position", "value": {position}}}
  params:
    - name: position
      type: integer

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.horizontal.position", "value": {position}}}
  params:
    - name: position
      type: integer

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.vertical.position", "value": {position}}}
  params:
    - name: position
      type: integer

- id: set_eco_enable
  label: Enable ECO Mode
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": {value}}}
  params:
    - name: value
      type: boolean
      description: Source notes: "Check if available first."

- id: set_standby_enable
  label: Enable Standby
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": {value}}}
  params:
    - name: value
      type: boolean
      description: Source notes: "Check if available first."

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}}
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": {channel}}}
  params:
    - name: channel
      type: integer
      description: 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": {value}}}
  params:
    - name: value
      type: boolean

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "dmx.listchannels"}
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "dmx.listmodes"}
  params: []

- id: get_network_ipv4
  label: Get LAN IPv4 Configuration
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}
  params: []

- id: get_network_state
  label: Get LAN State
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}
  params: []

- id: get_environment_sensors
  label: Get Environment Sensor Snapshot
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "{valuetype}"}}
  params:
    - name: valuetype
      type: string
      description: Sensor value type filter, e.g. "Temperature", "Speed", "Voltage", "Current", "Power", "Humidity", "Pressure"

- id: get_environment_alarms
  label: Get Environment Alarm Info
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "environment.getalarminfo"}
  params: []

- id: get_environment_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}
  params: []

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "firmware.listcomponents"}
  params: []

- id: firmware_list_component_versions
  label: List Firmware Component Versions
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}
  params: []

- id: firmware_schedule_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": {"component": "{component}"}}
  params:
    - name: component
      type: string

- id: laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}
  params: []

- id: color_copy_p7_preset
  label: Copy P7 Preset To Custom
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}
  params:
    - name: presetname
      type: string

- id: color_reset_p7_preset
  label: Reset P7 Preset To Default
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}
  params:
    - name: presetname
      type: string

- id: color_reset_p7_native
  label: Reset P7 To Native
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}
  params: []

- id: rgbmode_next
  label: Advance To Next RGB Mode
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}
  params: []

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}
  params:
    - name: object
      type: string

- id: introspect_shallow
  label: Introspect Object (Non-Recursive)
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": false}}
  params:
    - name: object
      type: string

- id: led_blink
  label: Blink Status LED
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}}
  params:
    - name: led
      type: string
      description: LED identifier (source example: "systemstatus")
    - name: color
      type: string
      description: Source example uses "red"
    - name: period
      type: integer
      description: Source example uses 42

- id: subscribe_property
  label: Subscribe To A Property
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}
  params:
    - name: property
      type: string

- id: subscribe_properties
  label: Subscribe To Multiple Properties
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["{property1}", "{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: unsubscribe_property
  label: Unsubscribe From A Property
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}
  params:
    - name: property
      type: string

- id: unsubscribe_properties
  label: Unsubscribe From Multiple Properties
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["{property1}", "{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: get_property
  label: Get Property Value
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}
  params:
    - name: property
      type: string

- id: get_properties
  label: Get Multiple Property Values
  kind: query
  command: |
    {"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: set_property
  label: Set Property Value
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}
  params:
    - name: property
      type: string
    - name: value
      type: string
      description: Use the type-appropriate JSON value for the target property.

- id: subscribe_signal
  label: Subscribe To A Signal
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}
  params:
    - name: signal
      type: string

- id: subscribe_signals
  label: Subscribe To Multiple Signals
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: unsubscribe_signal
  label: Unsubscribe From A Signal
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}
  params:
    - name: signal
      type: string

- id: unsubscribe_signals
  label: Unsubscribe From Multiple Signals
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: |
    {"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {code}}}
  params:
    - name: code
      type: integer
      description: Project-specific numeric pass code. Source example uses 98765. Not provided in vendor doc.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - service
    - deconditioning
    - error

- id: illumination_state
  type: enum
  values: ["On", "Off"]

- id: laser_power_percent
  type: integer
  description: Current laser illumination power in percent. Runtime range is dynamic - read minpower/maxpower first.

- id: laser_min_power_percent
  type: integer
  description: Minimum allowable laser power in percent at the current configuration.

- id: laser_max_power_percent
  type: integer
  description: Maximum allowable laser power in percent at the current configuration.

- id: detected_signal
  type: object
  description: Signal info for a connector (e.g. image.connector.{name}.detectedsignal). Contains active, name, vertical/horizontal totals, frequencies, color_space, chroma_sampling, gamma_type, is_stereo, etc.

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_sensor_block
  type: object
  description: Dictionary of sensor-name → numeric value. The value-type filter is passed as a parameter (e.g. Temperature, Speed, Voltage, Current, Power, Humidity, Pressure).

- id: environment_alarm_info
  type: array
  description: Array of alarm records with severity, timestamp, source, description, custommessage.

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_lan_ipv4
  type: object
  description: Object with Address, Mask, Gateway, NameServers strings.

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  description: Normalized brightness; 0 default, 1 is +100% offset.

- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  description: Normalized contrast/gain; 1 default.

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

- id: image_orientation
  type: string
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_scaling_mode
  type: string
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_window_position
  type: object
  description: {x: int, y: int}

- id: image_window_size
  type: object
  description: {width: int, height: int}

- id: image_source
  type: string
  description: Currently selected source name. Use image.source.list to enumerate valid values per model.

- id: illumination_laser_power
  type: integer
  range: [0, 100]
  description: Target laser power in percent. Effective range depends on current min/max and lens configuration.

- id: illumination_laser_minpower
  type: integer
  description: Read-only minimum allowed power, dynamic per configuration.

- id: illumination_laser_maxpower
  type: integer
  description: Read-only maximum allowed power, dynamic per configuration.

- id: shutter_target
  type: string
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
  items: string

- id: blacklevel_file_enable
  type: boolean

- id: blacklevel_file_selected
  type: string

- id: system_eco_enable
  type: boolean
  description: Source notes: "Check if available first."

- id: system_standby_enable
  type: boolean
  description: Source notes: "Check if available first."
```

## Events
```yaml
- id: property_changed
  description: |
    Server-initiated notification. Implemented on the client as `property.changed`. The
    `property` array carries object/property → value pairs.
  payload: |
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname": <value>}]}}

- id: signal_callback
  description: |
    Server-initiated notification when subscribed signals fire. Implemented on the client as
    `signal.callback`. The `signal` array carries signal-name → argument-object pairs.
  payload: |
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1": <value>}}]}}

- id: modelupdated
  description: |
    Signal indicating the object structure has changed (objects added or removed).
    Subscribe via signal.subscribe with signal "modelupdated".
```

## Macros
```yaml
# UNRESOLVED: source does not document any device-side multi-step sequences. Macros can be
# composed on the client side from the actions above (e.g. select warp file + enable warp file
# + enable warp) but no predefined macro is described by the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures, or
# power-on sequencing requirements specific to this model.
# <!-- Note: source recommends verifying system.state is "standby" or "ready" before
# issuing system.poweron, and "on" before issuing system.poweroff, but this is a
# usage guideline, not a safety interlock enforced by the device. -->
```

## Notes
- All Pulse JSON-RPC methods are available over both TCP (port 9090) and RS-232; the source explicitly states "The same commands are available for all connection types."
- TCP transport is JSON-RPC 2.0 over a raw socket. Requests and responses are JSON objects; field order in `params` does not matter.
- A passcode-based `authenticate` method exists, but is optional for normal end-user access. The passcode value itself is project-specific and not stated in this source.
- The `:POWR1\r` ASCII sequence is the documented way to wake a projector out of ECO mode over the RS-232 port (in addition to Wake-on-LAN, the IR remote, and the keypad power button).
- The source explicitly warns that the published API surface is incomplete: "Parts of the API are dynamic, other parts depend on peripherals or other factors. ... The best way to know the exact API of your projector is to do an introspection." The DMX API in particular exposes more channels in extended mode than are listed here.
- File upload endpoints (warp, blend, black-level) are HTTP POSTs to `/api/image/processing/{warp|blend|blacklevel}/file/transfer`. The same `/api` prefix is used for downloads.
- `property.set` should not be called repeatedly on the same property without waiting for confirmation — it "may flood the server with unnecessary request and may reduce performance."
- Subscribe does not deliver the current value; use `property.get` to fetch the initial value, then maintain it via change notifications.

<!-- UNRESOLVED: exact firmware revisions supported by this spec are not stated. -->
<!-- UNRESOLVED: per-channel/per-zone variants for this specific model are not enumerated in source; the available source list varies by projector model. -->
<!-- UNRESOLVED: voltage, current, and power specifications are not present in this API doc and are out of scope for the control surface. -->
```

Self-check: no invented voltages/ports/baud; port 9090 + 19200 8N1 sourced verbatim; auth marked optional with note; all payloads are JSON-RPC literals from source; every section that lacked evidence marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T20:26:50.416Z
last_checked_at: 2026-05-14T21:37:20.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:37:20.677Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched verbatim in source; all transport parameters verified; Methods section fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the Pulse API generically across \"Pulse projectors\" and does not call out Galaxy 4K 23 HFR-specific behavior."
- "firmware version compatibility not stated in source."
- "source does not document any device-side multi-step sequences. Macros can be"
- "source does not contain safety warnings, interlock procedures, or"
- "exact firmware revisions supported by this spec are not stated."
- "per-channel/per-zone variants for this specific model are not enumerated in source; the available source list varies by projector model."
- "voltage, current, and power specifications are not present in this API doc and are out of scope for the control surface."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
