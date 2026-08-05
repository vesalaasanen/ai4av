---
spec_id: admin/barco-300w-uhp-projector-lamp-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 300W UHP Projector Lamp 1 Control Spec"
manufacturer: Barco
model_family: "Barco 300W UHP Projector Lamp 1"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 300W UHP Projector Lamp 1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:26:16.163Z
last_checked_at: 2026-07-21T20:40:32.728Z
generated_at: 2026-07-21T20:40:32.728Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - image.window.main.position
  - image.window.main.size
  - image.window.main.scalingmode
  - optics.shutter.target
  - "specific projector model within Pulse family not confirmed; source describes Pulse API generically. Hardware specs (lumens, resolution, throw ratio) not in source."
  - "default pass code value not documented (example shows code: 98765)"
  - "access level not explicitly documented in source"
  - "RW access not explicitly stated for this property"
  - "RW access not explicitly stated in source"
  - "explicit RW/RO access not documented"
  - "window position/size, scaling mode properties exist but access levels and setter examples not fully documented"
  - "no multi-step sequences explicitly documented as macros in source."
  - "no explicit safety interlock procedures or mandatory confirmation requirements documented in source."
  - "specific projector model within Pulse family not confirmed from this generic API document"
  - "authentication default pass code not documented"
  - "voltage/current/power specifications not in source"
  - "firmware version compatibility not stated"
  - "full enumeration of DMX modes/channels not documented (dynamic per configuration)"
  - "window position/size/scalingmode setter details not fully documented"
  - "access levels (RW/RO) not documented for all listed properties"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:40:32.728Z
  matched_actions: 65
  action_count: 65
  confidence: medium
  summary: "All 65 spec actions matched in source; transport confirmed; spec represents 97% of documented commands. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 300W UHP Projector Lamp 1 Control Spec

## Summary
Barco Pulse-series projector controllable via the Pulse JSON-RPC 2.0 API over TCP/IP (port 9090) and RS-232 serial (19200 baud). Supports power control, source selection, illumination/laser power management, picture settings (brightness, contrast, gamma, saturation, sharpness), warp/blend/black-level file management, optics (shutter, zoom, focus, lens shift), DMX, environment monitoring, firmware management, and introspection.

<!-- UNRESOLVED: specific projector model within Pulse family not confirmed; source describes Pulse API generically. Hardware specs (lumens, resolution, throw ratio) not in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP service port stated in source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # source documents authenticate method with secret pass code; optional for normal end-user access
  # UNRESOLVED: default pass code value not documented (example shows code: 98765)
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff commands documented
  - queryable     # inferred: property.get queries and system.state documented
  - routable       # inferred: image.window.main.source selection documented
  - levelable      # inferred: brightness, contrast, laser power settable properties documented
```

## Actions
```yaml
# --- Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: ECO Mode Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII command sent on RS-232 to wake projector from ECO mode

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765; actual code is device-specific)
  notes: Optional for normal end-user access; required for elevated access levels

# --- Property operations (generic JSON-RPC methods) ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness)
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: Best practice to wait for confirmation before setting same property again

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property name strings

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

# --- Signal operations ---
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

# --- Introspection ---
- id: introspect_recursive
  label: Introspect (Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty string introspects everything

- id: introspect_nonrecursive
  label: Introspect (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": false}}'
  params:
    - name: object
      type: string
      description: Object name; lists only one level of child object names

# --- Source / connector management ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
  notes: Returns array of source names; contents vary by projector model

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: Source object name (source name lowercased, non-word chars removed, e.g. displayport1)

# --- LED control ---
- id: ledctrl_blink
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

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

# --- Color management ---
- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset

- id: color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm objects with severity, timestamp, source, description, custommessage

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  notes: Returns list of available channel names

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: Returns list of all modes

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns components with available version, running version, and upgrade status (Unknown/OK/Upgradable)

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot

# --- File transfer (HTTP) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML filename
    - name: projector_ip
      type: string
      description: Projector IP address (e.g. 192.168.1.100)
  notes: HTTP POST upload; warp file format same as MCM500/400

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask filename (PNG/JPEG/TIFF, grayscale)
    - name: projector_ip
      type: string
      description: Projector IP address

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask filename (PNG/JPEG/TIFF, grayscale)
    - name: projector_ip
      type: string
      description: Projector IP address
```

## Feedbacks
```yaml
# --- System state ---
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'

# --- Illumination state ---
- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'

# --- Active source ---
- id: active_source
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'

# --- Illumination power levels ---
- id: laser_power
  type: float
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}'

- id: laser_minpower
  type: float
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}'

- id: laser_maxpower
  type: float
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}'

# --- Connector signal detection ---
- id: connector_detectedsignal
  type: object
  fields: [active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{connectorname}.detectedsignal"}}'

# --- Alarm state ---
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'

# --- Network device state ---
- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'

# --- Shutter ---
- id: shutter_position
  type: enum
  values: [Open, Closed]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'

# --- Image properties (readable) ---
- id: image_brightness
  type: float
  range: [-1, 1]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}'

- id: image_contrast
  type: float
  range: [0, 2]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.contrast"}}'

- id: image_gamma
  type: float
  range: [1, 3]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.gamma"}}'

- id: image_saturation
  type: float
  range: [0, 2]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.saturation"}}'

- id: image_sharpness
  type: integer
  range: [-2, 8]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.sharpness"}}'

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  # UNRESOLVED: access level not explicitly documented in source

# --- Optics positions (readable) ---
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

# --- Warp/blend/blacklevel file states ---
- id: warp_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.enable"}}'

- id: warp_file_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.file.enable"}}'

- id: warp_file_selected
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.file.selected"}}'

- id: blend_file_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blend.file.enable"}}'

- id: blend_file_selected
  type: array
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blend.file.selected"}}'

- id: blacklevel_file_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blacklevel.file.enable"}}'

- id: blacklevel_file_selected
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blacklevel.file.selected"}}'

# --- DMX state ---
- id: dmx_mode
  type: string
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}}'

- id: dmx_startchannel
  type: integer
  range: [1, 512]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.startchannel"}}'

- id: dmx_shutdown
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.shutdown"}}'

# --- Standby/ECO ---
- id: standby_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.standby.enable"}}'

- id: eco_enable
  type: boolean
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.eco.enable"}}'

# --- IP config ---
- id: lan_ip4config
  type: object
  fields: [Address, Mask, Gateway, NameServers]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}'
```

## Variables
```yaml
# Settable properties accessible via property.set method
- id: var_laser_power
  property: illumination.sources.laser.power
  type: float
  unit: percent
  access: RW
  description: Target illumination power in percent

- id: var_image_brightness
  property: image.brightness
  type: float
  access: RW
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Normalized brightness/offset; 0 is default, 1 is 100% offset

- id: var_image_contrast
  property: image.contrast
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized contrast/gain; 1 is default

- id: var_image_gamma
  property: image.gamma
  type: float
  access: RW
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Image gamma; default is 2.2

- id: var_image_saturation
  property: image.saturation
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized color saturation; 1 is default

- id: var_image_sharpness
  property: image.sharpness
  type: integer
  access: RW
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: Normalized image sharpness

- id: var_image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  # UNRESOLVED: RW access not explicitly stated for this property

- id: var_active_source
  property: image.window.main.source
  type: string
  access: RW
  description: Active source displayed in main window

- id: var_warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: RW
  description: Enable/disable all warp functions

- id: var_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: RW
  description: Enable/disable file warp

- id: var_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: RW
  description: Currently selected warp file

- id: var_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: RW
  description: Enable/disable file blend

- id: var_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  access: RW
  description: Currently selected blend files

- id: var_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: RW
  description: Enable/disable black level correction

- id: var_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: RW
  description: Currently selected black level file

- id: var_shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]
  # UNRESOLVED: RW access not explicitly stated in source

- id: var_dmx_mode
  property: dmx.mode
  type: string
  access: RW  # inferred: property listed as current mode with setter expected
  # UNRESOLVED: explicit RW/RO access not documented

- id: var_dmx_startchannel
  property: dmx.startchannel
  type: integer
  range: [1, 512]
  # UNRESOLVED: explicit RW/RO access not documented

- id: var_dmx_shutdown
  property: dmx.shutdown
  type: boolean
  # UNRESOLVED: explicit RW/RO access not documented

- id: var_standby_enable
  property: system.standby.enable
  type: boolean
  access: RW
  description: Enable/disable standby state availability

- id: var_eco_enable
  property: system.eco.enable
  type: boolean
  access: RW
  description: Enable/disable ECO state availability

# UNRESOLVED: window position/size, scaling mode properties exist but access levels and setter examples not fully documented
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id field, no response expected)
- id: property_changed
  description: Fired when a subscribed property value changes
  method: property.changed
  payload_format: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"{property}": {value}}]}}'

- id: signal_callback
  description: Fired when a subscribed signal is emitted
  method: signal.callback
  payload_format: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"{signalname}": {"arg1": {value}}}]}'

- id: modelupdated
  description: Signal fired when object structure changes (objects added or removed). Subscribe via signal.subscribe with signal: modelupdated.
  method: signal.callback  # delivered through signal.callback when subscribed
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented as macros in source.
# The programmer's guide describes workflows (e.g. upload warp file -> select -> enable)
# but these are procedural instructions, not named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
power_on_sequence: |
  Best practice: verify projector state is "standby" or "ready" before issuing system.poweron.
  If projector is already on or transitioning, poweron has no effect.
power_off_sequence: |
  Best practice: verify projector state is "on" before issuing system.poweroff.
  If projector is already off or transitioning, poweroff has no effect.
# UNRESOLVED: no explicit safety interlock procedures or mandatory confirmation requirements documented in source.
```

## Notes
- API is JSON-RPC 2.0 over TCP port 9090 or RS-232 serial at 19200 baud.
- Parts of the API are dynamic; availability depends on projector model and configuration (e.g. motorized zoom, DMX channel count). Use introspection to determine exact API for a specific unit.
- Source selection uses two notifications: first when previous source deselected, then when new source selected.
- Subscribing to a property does not return current value; use property.get separately.
- File endpoints (warp, blend, black level) use HTTP POST for upload and HTTP GET for download at `http://{ip}/api/{endpoint}`.
- Blend/black level masks are grayscale only (8 or 16 bit); color images accepted but only blue channel used.
- ECO mode wake requires WoL (MAC address), remote/keypad power button, or serial `:POWR1\r` command.
- Source object names derived by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").

<!-- UNRESOLVED: specific projector model within Pulse family not confirmed from this generic API document -->
<!-- UNRESOLVED: authentication default pass code not documented -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: full enumeration of DMX modes/channels not documented (dynamic per configuration) -->
<!-- UNRESOLVED: window position/size/scalingmode setter details not fully documented -->
<!-- UNRESOLVED: access levels (RW/RO) not documented for all listed properties -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:26:16.163Z
last_checked_at: 2026-07-21T20:40:32.728Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:40:32.728Z
matched_actions: 65
action_count: 65
confidence: medium
summary: "All 65 spec actions matched in source; transport confirmed; spec represents 97% of documented commands. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- image.window.main.position
- image.window.main.size
- image.window.main.scalingmode
- optics.shutter.target
- "specific projector model within Pulse family not confirmed; source describes Pulse API generically. Hardware specs (lumens, resolution, throw ratio) not in source."
- "default pass code value not documented (example shows code: 98765)"
- "access level not explicitly documented in source"
- "RW access not explicitly stated for this property"
- "RW access not explicitly stated in source"
- "explicit RW/RO access not documented"
- "window position/size, scaling mode properties exist but access levels and setter examples not fully documented"
- "no multi-step sequences explicitly documented as macros in source."
- "no explicit safety interlock procedures or mandatory confirmation requirements documented in source."
- "specific projector model within Pulse family not confirmed from this generic API document"
- "authentication default pass code not documented"
- "voltage/current/power specifications not in source"
- "firmware version compatibility not stated"
- "full enumeration of DMX modes/channels not documented (dynamic per configuration)"
- "window position/size/scalingmode setter details not fully documented"
- "access levels (RW/RO) not documented for all listed properties"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
