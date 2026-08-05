---
spec_id: admin/barco-bme-k-rcu-silicon-prot-sleeve
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Bme K Rcu Silicon Prot Sleeve Control Spec"
manufacturer: Barco
model_family: "Barco Bme K Rcu Silicon Prot Sleeve"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Bme K Rcu Silicon Prot Sleeve"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:35:37.181Z
last_checked_at: 2026-07-21T21:18:15.176Z
generated_at: 2026-07-21T21:18:15.176Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model corresponding to \"Bme K Rcu Silicon Prot Sleeve\" not confirmed in source text. Source describes generic \"Pulse projectors\"."
  - "no multi-step macro sequences described explicitly in source"
  - "no explicit safety warnings, voltage/current specs, or hardware interlock procedures stated in source beyond operational notes above."
  - "exact projector model identity — source describes generic \"Pulse projectors,\" not the specific \"Bme K Rcu Silicon Prot Sleeve\" model"
  - "firmware version compatibility not stated in source"
  - "protocol version number not stated"
  - "full list of available source/connector names varies by model — source shows examples (DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI) but notes it is model-dependent"
  - "image.window.main.position and image.window.main.size properties are documented but their set constraints (min/max values) are not specified"
  - "LED identifiers, colors, and valid period values for ledctrl.blink not fully enumerated"
  - "color preset names for image.color.p7.custom operations not enumerated"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:18:15.176Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec action units matched with literal command evidence. Wire tokens fully represented in source with correct parameters and shapes. Transport parameters verbatim verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Bme K Rcu Silicon Prot Sleeve Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200 baud, 8N1). The API exposes power control, input source selection, image adjustment (brightness, contrast, gamma, saturation, sharpness), illumination/laser power management, optics (shutter, zoom, focus, lens shift), warp/blend/black-level file handling, DMX, environment monitoring, and firmware management. The device name "Bme K Rcu Silicon Prot Sleeve" may be an internal/project codename; the source documentation describes the Pulse projector API generically.

<!-- UNRESOLVED: exact projector model corresponding to "Bme K Rcu Silicon Prot Sleeve" not confirmed in source text. Source describes generic "Pulse projectors". -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  # File endpoints use HTTP on the projector IP, base path /api
  # Example: http://192.168.1.100/api/image/processing/warp/file/transfer
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Cable: 9-pin female to host, 9-pin male to projector. Pin 2↔2, 3↔3, 5↔5.
auth:
  type: passcode  # source describes authenticate method with a secret passcode; optional for normal end-user access
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff methods present
  - queryable    # inferred: property.get queries and system.state present
  - routable     # inferred: input source selection via image.window.main.source
  - levelable    # inferred: brightness, contrast, gamma, saturation, sharpness, laser power controls
```

## Actions
```yaml
# ── Power ──
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: "If projector already on or in transition, nothing happens. Verify state is standby or ready before issuing."

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: "If projector already off or in transition, nothing happens. Verify state is on before issuing."

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII characters sent on RS-232 serial port to wake projector from ECO mode. Wake-on-LAN or power button are alternatives."

# ── Authentication ──
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret passcode for elevated access level
  notes: "Only necessary for access above normal end-user level. Normal end-user access skips authentication."

# ── Property Operations ──
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. image.brightness, image.window.main.source)
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: "Best practice: wait for confirmation before setting same property again. See Variables for RW properties and their constraints."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
  notes: "Returns current value of a single property."

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property paths in dot notation
  notes: "Returns values for multiple properties in one request."

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (or array of paths)

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (or array of paths)

# ── Signal Operations ──
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of signal names)

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of signal names)

# ── Introspection ──
- id: introspect
  label: Introspect API
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
  params:
    - name: object
      type: string
      description: "Object name in dot notation. Empty string introspects everything."
    - name: recursive
      type: boolean
      description: "If false, only object names are listed (one level). Default true."
  notes: "Returns metadata of available objects (methods, properties, signals). Restricted by client's authenticated access level. Also accepts positional params: [\"object\", true]."

# ── Input Source Management ──
- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
  notes: "Returns array of source names. Contents vary by projector model."

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []
  notes: "Returns array of physical connector names. Varies by projector model."

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: "Source object name. Derive from source display name by removing non-word chars and lowercasing (e.g. 'DisplayPort 1' → 'displayport1')."
  notes: "Returns array of connector info objects with name and grid position."

- id: select_input_source
  label: Select Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: "Source name from image.source.list (e.g. 'DisplayPort 1', 'HDMI')"

# ── LED Control ──
- id: led_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

# ── Environment Monitoring ──
- id: get_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: "Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
    - name: valuetype
      type: string
      description: "Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any"
  notes: "Returns dictionary of sensor name → reading value. Used for temperatures, fan speeds, voltages, etc."

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: "Returns array of alarm info objects with severity, timestamp, source, description, custommessage."

# ── DMX ──
- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  notes: "Returns list of available channel names."

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: "Returns list of all modes."

# ── Firmware ──
- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: "Returns names of all managed firmware components."

- id: firmware_list_version_status
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns components with name, available version, running version, and status (Unknown/OK/Upgradable)."

- id: firmware_schedule_upgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Force a component upgrade at the following reboot."

# ── Illumination ──
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: "Engage Constant Light Output at the current light level."

- id: illumination_laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
  notes: "Returns laser serial number string."

# ── Color Management ──
- id: color_copy_preset_to_custom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: color_reset_preset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset to defaults

- id: color_reset_to_native
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: color_next_rgb_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycle to next RGB mode."

# ── Warp File Operations ──
- id: warp_enable
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean
      description: true to enable all warp functions, false to disable

- id: warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Warp grid filename (e.g. warp.xml)

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file path
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "HTTP POST upload. Warp file format same as MCM500/400."

- id: warp_file_download
  label: Download Warp File
  kind: action
  command: 'curl -O -J http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "Downloads current warp grid. May need to specify filename: /api/image/processing/warp/file/transfer/warpgrid.xml"

# ── Blend File Operations ──
- id: blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Blend mask filename (e.g. mask.png)

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask file path
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size must match projector resolution. Blue channel used if RGB."

# ── Black Level File Operations ──
- id: blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": {value}}}'
  params:
    - name: value
      type: boolean

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Black level mask filename (e.g. blacklevel.png)

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask file path
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size must match projector resolution. Blue channel used if RGB."
```

## Feedbacks
```yaml
# ── System State ──
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error, service]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'
  description: "Current projector operation state"

# ── Illumination State ──
- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'
  description: "Light on/off state"

# ── Laser Power ──
- id: laser_power
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}'
  description: "Current laser target power in percent"

- id: laser_min_power
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}'
  description: "Minimum laser power in percent (read-only, dynamic)"

- id: laser_max_power
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}'
  description: "Maximum laser power in percent (read-only, dynamic)"

# ── Active Source ──
- id: active_source
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'
  description: "Currently active input source name"

# ── Image Properties ──
- id: brightness
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}'

- id: contrast
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.contrast"}}'

- id: gamma
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.gamma"}}'

- id: saturation
  type: number
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.saturation"}}'

- id: sharpness
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.sharpness"}}'

# ── Optics ──
- id: shutter_position
  type: enum
  values: [Open, Closed]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'

- id: zoom_position
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position"}}'

- id: focus_position
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position"}}'

- id: lensshift_horizontal_position
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position"}}'

- id: lensshift_vertical_position
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position"}}'

# ── Network ──
- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'

# ── Environment ──
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'

# ── DMX ──
- id: dmx_mode
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}}'

- id: dmx_startchannel
  type: integer
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.startchannel"}}'

# ── Connector Signal Detection ──
- id: connector_detected_signal
  type: object
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{connectorname}.detectedsignal"}}'
  description: "Returns active, name, resolution, frequency, scan type, color info, etc. for the detected signal on a connector."
```

## Variables
```yaml
# ── Image Adjustment (RW) ──
- id: image.brightness
  type: float
  access: RW
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: "Image brightness/offset. Normalized, 0 is default, 1 is 100% offset."

- id: image.contrast
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Image contrast/gain. Normalized, 1 is default."

- id: image.gamma
  type: float
  access: RW
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: "Image gamma. Default is 2.2."

- id: image.saturation
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Image color saturation. Normalized, 1 is default."

- id: image.sharpness
  type: int
  access: RW
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: "Image sharpness. Normalized."

- id: image.orientation
  type: enum
  access: RW
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image.window.main.scalingmode
  type: enum
  access: RW
  values: [Fill, OneToOne, FillScreen, Stretch]

# ── Illumination (RW) ──
- id: illumination.sources.laser.power
  type: float
  access: RW
  description: "Target laser power in percent"

# ── System State Enable Flags (RW) ──
- id: system.standby.enable
  type: bool
  access: RW
  description: "Enable/disable standby state. Check if available first."

- id: system.eco.enable
  type: bool
  access: RW
  description: "Enable/disable ECO state. Check if available first."

# ── Optics (RW) ──
- id: optics.shutter.target
  type: enum
  access: RW
  values: [Open, Closed]

# ── DMX (RW) ──
- id: dmx.mode
  type: string
  access: RW
  description: "Current DMX mode"

- id: dmx.startchannel
  type: int
  access: RW
  description: "DMX start channel [1..512]"

- id: dmx.shutdown
  type: bool
  access: RW
  description: "DMX shutdown enabled or not"

# ── Warp / Blend / Black Level (RW) ──
- id: image.processing.warp.enable
  type: bool
  access: RW
  description: "Enable/disable all warp functions"

- id: image.processing.warp.file.enable
  type: bool
  access: RW
  description: "Enable/disable file warp"

- id: image.processing.warp.file.selected
  type: string
  access: RW
  description: "Currently selected warp file"

- id: image.processing.blend.file.enable
  type: bool
  access: RW
  description: "Enable/disable file blend"

- id: image.processing.blend.file.selected
  type: array
  access: RW
  description: "Currently selected blend files (array of strings)"

- id: image.processing.blacklevel.file.enable
  type: bool
  access: RW
  description: "Enable/disable black level correction"

- id: image.processing.blacklevel.file.selected
  type: string
  access: RW
  description: "Currently selected black level file"

# ── Network (RO) ──
- id: network.device.lan.ip4config
  type: object
  access: RO
  description: "IPv4 config: Address, Mask, Gateway, NameServers"
```

## Events
```yaml
# ── Property Change Notifications ──
- id: property_changed
  description: "Server pushes property value changes to subscribed clients. No response required."
  payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"system.state": "ready"}]}}'
  notes: "Array of property/value pairs. Subscribe via property.subscribe first. Two notifications may fire for source changes (deselect old + select new)."

# ── Signal Callback ──
- id: signal_callback
  description: "Server pushes emitted signals to subscribed clients. No response required."
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {"arg1": 100, "arg2": "cat"}}]}}'

# ── Model Updated Signal ──
- id: modelupdated
  description: "Triggered when object structure changes (objects added or removed)."
  notes: "Subscribe via signal.subscribe with signal name 'modelupdated'. Callback includes introspect.objectchanged with object name and isnew flag."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: good practice to verify state is standby or ready before issuing. If already on or transitioning, nothing happens."
  - description: "Power off: good practice to verify state is on before issuing. If already off or transitioning, nothing happens."
  - description: "Property set: wait for confirmation before setting the same property again. Continuous setting without confirmation may flood server and reduce performance."
  - description: "ECO mode wake requires special handling: Wake-on-LAN with MAC address, power button on remote/keypad, or serial command :POWR1\\r"
# UNRESOLVED: no explicit safety warnings, voltage/current specs, or hardware interlock procedures stated in source beyond operational notes above.
```

## Notes
- The API is JSON-RPC 2.0. Requests include `jsonrpc`, `method`, optional `params` (object or positional array), and optional `id`. Responses mirror the id. Notifications (server→client) have no `id` and require no response.
- The API is partially dynamic — available methods/properties depend on projector model, configuration, and peripherals (e.g. lens type, DMX mode). Introspection is the definitive way to discover a specific projector's API.
- Source names are in dot notation, lowercase (JavaScript-like). Multiple objects of the same kind are enumerated (e.g. `tempctrl.fans.mainfan`, `tempctrl.fans.lampblower`).
- All parameters are passed by name; order does not matter.
- HTTP file endpoints use base path `http://{projector-ip}/api/`. Supported image formats for masks: PNG (up to 16-bit), JPEG, TIFF. Only grayscale is used; color images use blue channel only.
- Mask resolution must match projector resolution: WUXGA → 1920×1200, WQXGA → 1280×800, 4K → 1280×800, 4K Cinemascope → 1280×540.
- Warp file format is the same as MCM500/400.
- Authentication is optional — only needed for elevated access levels above normal end-user.

<!-- UNRESOLVED: exact projector model identity — source describes generic "Pulse projectors," not the specific "Bme K Rcu Silicon Prot Sleeve" model -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: full list of available source/connector names varies by model — source shows examples (DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI) but notes it is model-dependent -->
<!-- UNRESOLVED: image.window.main.position and image.window.main.size properties are documented but their set constraints (min/max values) are not specified -->
<!-- UNRESOLVED: LED identifiers, colors, and valid period values for ledctrl.blink not fully enumerated -->
<!-- UNRESOLVED: color preset names for image.color.p7.custom operations not enumerated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:35:37.181Z
last_checked_at: 2026-07-21T21:18:15.176Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:18:15.176Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec action units matched with literal command evidence. Wire tokens fully represented in source with correct parameters and shapes. Transport parameters verbatim verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model corresponding to \"Bme K Rcu Silicon Prot Sleeve\" not confirmed in source text. Source describes generic \"Pulse projectors\"."
- "no multi-step macro sequences described explicitly in source"
- "no explicit safety warnings, voltage/current specs, or hardware interlock procedures stated in source beyond operational notes above."
- "exact projector model identity — source describes generic \"Pulse projectors,\" not the specific \"Bme K Rcu Silicon Prot Sleeve\" model"
- "firmware version compatibility not stated in source"
- "protocol version number not stated"
- "full list of available source/connector names varies by model — source shows examples (DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI) but notes it is model-dependent"
- "image.window.main.position and image.window.main.size properties are documented but their set constraints (min/max values) are not specified"
- "LED identifiers, colors, and valid period values for ledctrl.blink not fully enumerated"
- "color preset names for image.color.p7.custom operations not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
