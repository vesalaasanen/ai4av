---
spec_id: admin/barco-long-throw-zoom-high-resolution-en44
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Long Throw Zoom High Resolution En44 Control Spec"
manufacturer: Barco
model_family: "Long Throw Zoom High Resolution En44"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Long Throw Zoom High Resolution En44"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:12:54.107Z
last_checked_at: 2026-08-19T08:55:57.648Z
generated_at: 2026-08-19T08:55:57.648Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Pulse API command catalog; model-specific command availability varies (lens-dependent, DMX mode-dependent) — introspect at runtime."
  - "actual pass code value not stated in source (example \"code\": 98765 is illustrative only)"
  - "source does not document its parameters."
  - "source contains no explicit safety warnings or interlock procedures."
  - "authentication pass code value/format not stated (example 98765 illustrative only)."
  - "firmware version compatibility not stated in source."
  - "HTTP port for file endpoints not explicitly stated in source (example URLs use default http port 80)."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:55:57.648Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions map to wire-level commands documented in the source (27 JSON-RPC methods + 3 HTTP file endpoints + serial wake command); transport params verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Long Throw Zoom High Resolution En44 Control Spec

## Summary
Barco Pulse-family projector controlled via a JSON-RPC 2.0 API ("Pulse API") over TCP/IP (port 9090) or RS-232 serial, with additional HTTP file endpoints under `/api` for uploading/downloading warp grids, blend masks, and black-level masks. Covers power, source selection, illumination (laser power, CLO), picture settings, warp/blend/black-level file workflows, optics, DMX, environment monitoring, and firmware methods.

<!-- UNRESOLVED: source is the generic Pulse API command catalog; model-specific command availability varies (lens-dependent, DMX mode-dependent) — introspect at runtime. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector-host}/api"  # pattern from source; example given was http://192.168.1.100/api/...
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # Source: authentication optional; only needed for access above normal end-user level.
  type: passcode  # JSON-RPC "authenticate" method with numeric "code" param
  # UNRESOLVED: actual pass code value not stated in source (example "code": 98765 is illustrative only)
```

## Traits
```yaml
# inferred from power on/off commands present in source
- powerable
# inferred from property.get / list methods returning state
- queryable
# inferred from input source selection commands present in source
- routable
# inferred from brightness / laser power / picture setting controls present in source
- levelable
```

## Actions
```yaml
# kind: action
- id: power_on
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: Best practice: verify system.state is standby or ready before issuing.

- id: power_off
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: Best practice: verify system.state is on before issuing.

- id: eco_wake_serial
  label: Wake From ECO Mode (serial only)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII characters sent on RS232 serial port to wake projector in ECO mode. Alternatives: Wake-on-LAN with MAC address, remote/keypad power button.

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {passcode}}, "id": 1}'
  params:
    - name: passcode
      type: integer
      description: Secret pass code; UNRESOLVED - value not stated in source
  notes: Sets user access level. Skippable for normal end-user access.

- id: set_property
  label: Set Property Value (generic)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}, "id": 3}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. objectname.propertyname)
    - name: value
      type: any
      description: Value to set (string/integer/float/boolean/array/object)
  notes: Wait for confirmation before setting the same property again; flooding degrades performance.

- id: select_source
  label: Select Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list; examples seen in source include "DVI 1", "DVI 2", "DisplayPort 1", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "HDMI", "SDI". List varies by model.

- id: set_laser_power
  label: Set Laser Power Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Target power in percent; read illumination.sources.laser.minpower/maxpower for valid range

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}'
  params:
    - name: value
      type: float
      description: Normalized, -1 to 1, 0 is default, precision 0.01

- id: set_warp_enable
  label: Enable/Disable All Warp Functions
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: set_warp_file_selected
  label: Select Warp Grid File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded warp grid file name (e.g. warp.xml)

- id: set_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address (example in source: 192.168.1.100)
  notes: HTTP multipart POST; -X POST implied by -F. Warp file format same as MCM500/400.

- id: set_blend_file_selected
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded blend mask file name (e.g. mask.png)

- id: set_blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
  notes: Grayscale 8/16-bit PNG/JPEG/TIFF; size must match blend layer resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Color images accepted but only blue channel used.

- id: set_blacklevel_file_selected
  label: Select Black Level Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded black level mask file name (e.g. blacklevel.png)

- id: set_blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
  notes: Same format/size rules as blend masks.

- id: engage_clo
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: blink_led
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}, "id": 3}'
  params:
    - name: led
      type: string
      description: LED name (example in source: systemstatus)
    - name: color
      type: string
      description: Color (example in source: red)
    - name: period
      type: integer
      description: Blink period (example in source: 42)

- id: schedule_firmware_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot. UNRESOLVED: source does not document its parameters.

- id: copy_preset_to_custom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: reset_preset
  label: Reset Color Preset To Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: reset_to_native
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: next_rgb_mode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# kind: query
- id: get_property
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}, "id": 4}'
  params:
    - name: property
      type: string
      description: Property path in dot notation

- id: get_properties_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}, "id": 5}'
  params:
    - name: property
      type: array
      description: List of property paths; result is a name/value dictionary

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}, "id": 1}'
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}, "id": 0}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []
  notes: Returns array of source names; contents vary by projector model.

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: list_source_connectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors", "id": 4}'
  params:
    - name: sourceobject
      type: string
      description: Source object name derived from source name by removing non-word chars and lowercasing (e.g. "DisplayPort 1" -> "displayport1")
  notes: Returns connector name and grid position (row/column/plane).

- id: get_detected_signal
  label: Get Connector Detected Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{connectorobject}.detectedsignal"}, "id": 5}'
  params:
    - name: connectorobject
      type: string
      description: Connector object name (e.g. displayport1)
  notes: Returns active, name, resolutions, porches, sync widths, frequencies, pixel rate, scan, bits per component, color space/range, chroma sampling, gamma type.

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}, "id": 0}'
  params: []

- id: get_laser_power
  label: Get Laser Power Level
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}, "id": 3}'
  params: []

- id: get_laser_minpower
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}, "id": 6}'
  params: []
  notes: Read-only but dynamic; lens type/position may affect it.

- id: get_laser_maxpower
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}, "id": 5}'
  params: []
  notes: Read-only but dynamic; lens type/position may affect it.

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}, "id": 7}'
  params: []

- id: subscribe_property
  label: Subscribe To Property Changes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}, "id": 6}'
  params:
    - name: property
      type: any
      description: Single property path (string) or array of property paths
  notes: Notifications only on change; does not return current value - use property.get for that.

- id: unsubscribe_property
  label: Stop Property Subscription
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}, "id": 8}'
  params:
    - name: property
      type: any
      description: Single property path (string) or array of property paths

- id: subscribe_signal
  label: Subscribe To Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}, "id": 10}'
  params:
    - name: signal
      type: any
      description: Signal name (e.g. modelupdated, image.processing.warp.gridchanged) or array of names

- id: unsubscribe_signal
  label: Unsubscribe From Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}, "id": 12}'
  params:
    - name: signal
      type: any
      description: Signal name or array of names

- id: introspect
  label: Introspect API Objects
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything
    - name: recursive
      type: boolean
      description: Default true; false lists only object names one level deep
  notes: Params may also be positional array, e.g. ["foo", true]. Result restricted by authenticated access level. modelupdated signal fires when object structure changes.

- id: get_environment_controlblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}, "id": 18}'
  params:
    - name: type
      type: string
      description: 'One of: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'
  notes: Returns dictionary of sensor name -> float value (e.g. temperatures, fan tacho speeds).

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  notes: Returns list of available channel names; more channels exposed in extended DMX mode.

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: Returns list of all modes.

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components.

- id: firmware_list_component_version_status
  label: List Firmware Component Versions And Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns name, available version, running version, status enum (Unknown/OK/Upgradable).

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
  notes: Returns string.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  notes: Read via property.get "system.state"; changes via property.changed notification.

- id: illumination_state
  type: enum
  values: ["On", "Off"]

- id: laser_power
  type: float
  notes: Percent; read via "illumination.sources.laser.power".

- id: laser_minpower
  type: float
  notes: Read-only, dynamic.

- id: laser_maxpower
  type: float
  notes: Read-only, dynamic.

- id: active_source
  type: string
  notes: e.g. "DisplayPort 1".

- id: available_sources
  type: array
  notes: From image.source.list; varies by model (examples: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: available_connectors
  type: array
  notes: From image.connector.list (examples: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI).

- id: detected_signal
  type: object
  notes: From image.connector.[name].detectedsignal; fields include active (bool), name, vertical/horizontal total/resolution/sync width/front porch/back porch, vertical/horizontal frequency, pixel rate, scan, bits_per_component, color_space, signal_range (0-255/16-235), chroma_sampling (4:4:4/4:2:2/4:2:0), gamma_type (POWER/sRGB/REC_BT1886/SMPTE_ST2084), color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode (None/Sequential/FramePacked/TopBottom/SideBySide). Disregard all but active when active is false.

- id: environment_temperatures
  type: object
  notes: Dictionary from environment.getcontrolblocks type=Sensor valuetype=Temperature; e.g. environment.laser.board0.bank0.temperature, environment.temperature.inlet, environment.temperature.outlet, environment.temperature.mainboard.

- id: fan_speeds
  type: object
  notes: Dictionary from environment.getcontrolblocks type=Sensor valuetype=Speed; e.g. environment.fan.ar1.tacho ... environment.fan.psu.tacho.

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_lan_ip4config
  type: object
  notes: Fields Address, Mask, Gateway, NameServers (strings).

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: image_brightness
  type: float
  notes: -1..1.

- id: dmx_mode
  type: string
```

## Variables
```yaml
- id: image.window.main.source
  type: string
  description: Source displayed in main window

- id: image.window.main.position
  type: object
  description: "Window position {x: int, y: int}"

- id: image.window.main.size
  type: object
  description: "Window size {width: int, height: int}"

- id: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Normalized brightness/offset; 0 default.

- id: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized contrast/gain; 1 default.

- id: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Default 2.2.

- id: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized; 1 default.

- id: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: Normalized.

- id: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: illumination.sources.laser.power
  type: float
  description: Target power in percent (RW); min/max dynamic - read minpower/maxpower.

- id: image.processing.warp.enable
  type: boolean
  description: Enable/disable all warp functions

- id: image.processing.warp.file.enable
  type: boolean
  description: Enable/disable file warp

- id: image.processing.warp.file.selected
  type: string
  description: Currently selected warp file

- id: image.processing.blend.file.enable
  type: boolean

- id: image.processing.blend.file.selected
  type: array
  description: Currently selected blend files ([string])

- id: image.processing.blacklevel.file.enable
  type: boolean

- id: image.processing.blacklevel.file.selected
  type: string

- id: optics.shutter.target
  type: enum
  values: ["Open", "Closed"]

- id: dmx.mode
  type: string

- id: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: dmx.shutdown
  type: boolean

- id: system.standby.enable
  type: boolean
  description: Enable/disable standby state; check availability first.

- id: system.eco.enable
  type: boolean
  description: Enable/disable ECO state; check availability first.
```

## Events
```yaml
- id: property.changed
  description: Unsolicited JSON-RPC notification when a subscribed property value changes. No id; no response must be returned.
  payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"objectname.propertyname": 100}, {"otherobject.otherproperty": "bar"}]}}'
  notes: Source change delivers two notifications (deselect then select), e.g. image.window.main.source "" then "DisplayPort 2".

- id: signal.callback
  description: Unsolicited notification when a subscribed signal is emitted. Receives array of signal/argument-list pairs.
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {"arg1": 100, "arg2": "cat"}}]}}'

- id: modelupdated
  description: Introspection signal triggered when objects are added or removed. Subscribe via signal.subscribe; callback carries introspect.objectchanged args {object: string, newobject: bool}.
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'

- id: image.processing.warp.gridchanged
  description: Signal name listed in a multi-signal subscribe example; fires on warp grid changes.
```

## Macros
```yaml
- id: warp_grid_setup
  steps:
    - 'curl -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}}'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}'

- id: blend_mask_setup
  steps:
    - 'curl -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}}'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}'

- id: blacklevel_mask_setup
  steps:
    - 'curl -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}}'
    - '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Operational best practices (not safety interlocks) from source: verify state standby/ready before power on, verify on before power off.
```

## Notes
- JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial (19200 8N1, no flow control); same command set on all connection types.
- Serial cable: 9-pin female to host, 9-pin male to projector; pin 2-2, 3-3, 5-5.
- All parameters passed by name; order does not matter.
- Wait for property.set confirmation before setting same property again — flooding the server reduces performance.
- Methods may omit params; extra params are ignored. Methods like system.poweron return result null (not an error).
- Power on/off are no-ops if projector already in target state or transitioning.
- Subscriptions notify only on change; use property.get for current value.
- API is dynamic: parts depend on peripherals (e.g. motorized zoom lens) and modes (DMX basic = 2 channels; extended exposes more). Introspect to discover exact per-unit API.
- File endpoints also support download via browser/curl (`curl -O -J ...`); some endpoints require specifying the file name in the URL.
- Warp file format identical to MCM500/400.
- Blend/black-level masks: PNG (up to 16 bit), JPEG, TIFF; grayscale only — color images accepted but only blue channel used. Mask size must match layer resolution: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540.
- ECO mode wake: Wake-on-LAN (MAC address), remote/keypad power button, or serial `:POWR1\r`.
<!-- UNRESOLVED: authentication pass code value/format not stated (example 98765 illustrative only). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: HTTP port for file endpoints not explicitly stated in source (example URLs use default http port 80). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:12:54.107Z
last_checked_at: 2026-08-19T08:55:57.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:55:57.648Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions map to wire-level commands documented in the source (27 JSON-RPC methods + 3 HTTP file endpoints + serial wake command); transport params verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Pulse API command catalog; model-specific command availability varies (lens-dependent, DMX mode-dependent) — introspect at runtime."
- "actual pass code value not stated in source (example \"code\": 98765 is illustrative only)"
- "source does not document its parameters."
- "source contains no explicit safety warnings or interlock procedures."
- "authentication pass code value/format not stated (example 98765 illustrative only)."
- "firmware version compatibility not stated in source."
- "HTTP port for file endpoints not explicitly stated in source (example URLs use default http port 80)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
