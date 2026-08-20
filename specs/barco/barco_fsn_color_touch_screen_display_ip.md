---
spec_id: admin/barco-fsn-color-touch-screen-display
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco FSN Color Touch Screen Display Control Spec"
manufacturer: Barco
model_family: "FSN Color Touch Screen Display"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "FSN Color Touch Screen Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:23:57.863Z
last_checked_at: 2026-08-19T08:29:05.157Z
generated_at: 2026-08-19T08:29:05.157Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device name vs source mismatch (source is the Barco Pulse projector API, not an FSN display). Confirm correct product."
  - "firmware version compatibility not stated in source."
  - "full property catalogue is dynamic and varies by model/peripherals; source recommends runtime introspection."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "device name (FSN Color Touch Screen Display) does not match the source (Barco Pulse projector API — references lamp/laser, lens shift, warp/blend/black-level, DMX, optics). Confirm whether the correct product/family was scraped and re-map model/entity accordingly."
  - "power/voltage/current specifications not stated in source."
  - "ECO wake-on-LAN packet format / port not specified (only that WoL with HW MAC is an option)."
  - "authentication passcode value(s) and access-level scheme not specified beyond a single example (98765)."
  - "blend mask / black-level mask exact layer-resolution mapping per model beyond the table given."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:29:05.157Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "Every spec action's JSON-RPC method/serial command appears verbatim in the source; transport parameters (port 9090, 19200/8N1, /api) match source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco FSN Color Touch Screen Display Control Spec

## Summary
Barco display controlled via the Barco "Pulse" JSON-RPC 2.0 API. The source documents TCP/IP control on port 9090 and an RS-232 serial connection (19200 baud), both carrying the same JSON-RPC command set (power, source selection, illumination, picture, optics, warp/blend/black-level, DMX, environment, firmware). HTTP file endpoints are used to upload/download warp grids, blend masks and black-level masks. Note: the supplied device name (FSN Color Touch Screen Display) does not match the source, which describes Barco Pulse projector hardware (lamp/laser, lens shift, warp/blend); see Notes.

<!-- UNRESOLVED: device name vs source mismatch (source is the Barco Pulse projector API, not an FSN display). Confirm correct product. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full property catalogue is dynamic and varies by model/peripherals; source recommends runtime introspection. -->

## Transport
```yaml
# JSON-RPC 2.0 control is carried identically over TCP (port 9090) and RS-232.
# HTTP is used only for file endpoints (warp/blend/black-level upload & download).
# ECO wake-up over RS-232 uses a special ASCII string (see Actions).
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090              # TCP/IP control port (JSON-RPC over TCP)
  base_url: "http://{host}/api"   # HTTP file endpoints, e.g. /image/processing/warp/file/transfer
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "9-pin male on projector; 9-pin female on host; pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  type: none  # inferred: no authentication required for normal end-user access. Elevated access uses the `authenticate` method with a numeric pass code (see Actions).
```

## Traits
```yaml
# - powerable   inferred from system.poweron / system.poweroff commands
# - queryable   inferred from property.get queries and environment/firmware query methods
# - levelable   inferred from illumination power, brightness, contrast, gamma, saturation, sharpness controls
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
# Barco Pulse JSON-RPC 2.0 API. Each action's `command` is the JSON-RPC request
# (verbatim method/params from source). For parameterized operations the variable
# part is shown. Request `id` and the `jsonrpc: 2.0` envelope are omitted for
# brevity but required on the wire.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: '{"method":"system.poweron"}'
  params: []
  notes: No-op if already on or transitioning. Best practice: verify system.state is standby/ready first.

- id: power_off
  label: Power Off
  kind: action
  command: '{"method":"system.poweroff"}'
  params: []
  notes: No-op if already off or transitioning. Best practice: verify system.state is on first.

- id: eco_wake_serial
  label: ECO Mode Wake (RS-232)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII wake command sent over the RS-232 serial port to wake a projector in ECO/power-save mode. Serial-only. Alternatives: Wake-on-LAN (MAC address), IR/keypad power button.

# --- Authentication (optional, elevated access only) ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Numeric secret pass code (source example 98765).
  notes: Only required for access levels above normal end user. Skippable for normal end-user control.

# --- Generic property / signal API (mechanism methods) ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path, e.g. image.brightness.
    - name: value
      type: any
      description: New value (type per property).
  notes: Wait for confirmation before re-setting the same property; flooding degrades performance.

- id: property_get
  label: Get Property
  kind: query
  command: '{"method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_get_many
  label: Get Multiple Properties
  kind: query
  command: '{"method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (or array of paths for multiple).

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (or array of paths for multiple).

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, e.g. modelupdated (or array of names for multiple).

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names for multiple).

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed. Default true.

# --- Source / connector management ---
- id: select_source
  label: Select Active Source
  kind: action
  command: '{"method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: 'Source name. Known: "DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","Dual DVI","Dual DisplayPort","Dual Head DVI","Dual Head DisplayPort","HDBaseT","HDMI","SDI".'

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: Source object name = source name with non-word chars removed and lower-cased, e.g. displayport1.
  notes: Returns connector info with grid position (row/column/plane) and name.

# --- Illumination ---
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"method":"property.set","params":{"property":"illumination.sources.laser.power","value":{level}}}'
  params:
    - name: level
      type: integer
      description: Target power in percent (between minpower and maxpower, dynamic).

- id: engage_clo
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"method":"illumination.laser.getserialnumber"}'
  params: []

# --- Picture settings ---
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized offset, min -1, max 1, step 1, precision 0.01. Default 0.

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized gain, min 0, max 2, step 1, precision 0.01. Default 1.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: min 1, max 3, step 1, precision 0.1. Default 2.2.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized, min 0, max 2, step 1, precision 0.01. Default 1.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: min -2, max 8, step 1, precision 1.

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"method":"property.set","params":{"property":"image.orientation","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: 'Enum: DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR.'

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: 'Enum: Fill | OneToOne | FillScreen | Stretch.'

- id: rgb_mode_next
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: color_copy_preset_to_custom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{name}"}}'
  params:
    - name: name
      type: string
      description: Preset name to copy.

- id: color_reset_preset
  label: Reset Color Preset
  kind: action
  command: '{"method":"image.color.p7.custom.resetpreset","params":{"presetname":"{name}"}}'
  params:
    - name: name
      type: string
      description: Preset name to reset.

- id: color_reset_to_native
  label: Reset Color To Native
  kind: action
  command: '{"method":"image.color.p7.custom.resettonative"}'
  params: []

# --- Warp ---
- id: warp_enable
  label: Enable/Disable All Warp
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded warp grid file name (MCM500/400 format).

- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file path.
    - name: host
      type: string
      description: Projector IP address.
  notes: HTTP file endpoint (implied POST). Download via GET on the same URL.

# --- Blend ---
- id: blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blend_file_select
  label: Select Blend File(s)
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["{filename}"]}}'
  params:
    - name: filename
      type: array
      description: Array of selected blend mask file names.

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local grayscale blend mask (PNG up to 16 bit / JPEG / TIFF).
    - name: host
      type: string
  notes: Mask size must match blend-layer resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K CinemaScope 1280x540).

# --- Black level ---
- id: blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local grayscale black-level mask (PNG up to 16 bit / JPEG / TIFF).
    - name: host
      type: string

# --- Optics (motorized) ---
- id: set_shutter_target
  label: Set Shutter
  kind: action
  command: '{"method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: 'Enum: Open | Closed.'

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"method":"property.set","params":{"property":"optics.zoom.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"method":"property.set","params":{"property":"optics.focus.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  command: '{"method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{value}}}'
  params:
    - name: value
      type: integer

# --- System state enable flags ---
- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
  notes: Check availability first.

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
  notes: Check availability first.

# --- DMX ---
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: Mode name (basic exposes 2 channels; extended exposes more).

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Range 1..512.

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"method":"dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"method":"dmx.listmodes"}'
  params: []

# --- Environment ---
- id: environment_get_controlblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: 'Sensor type: Sensor | Filter | Controller | Actuator | Alarm | GenericBlock.'
    - name: valuetype
      type: string
      description: 'Value type, e.g. Temperature | Speed | Voltage | Current | Power | PWM | Humidity | Pressure | Altitude | Peltier ...'
  notes: Returns dict of sensor-name -> reading (e.g. temperatures in degC, fan tacho in RPM).

- id: environment_get_alarminfo
  label: Get Alarm Info
  kind: query
  command: '{"method":"environment.getalarminfo"}'
  params: []
  notes: Returns severity, timestamp, source, description, custommessage per alarm.

# --- Firmware ---
- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"method":"firmware.listcomponents"}'
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns name, available/running version, status (Unknown | OK | Upgradable).

- id: firmware_schedule_upgrade
  label: Schedule Component Upgrade At Reboot
  kind: action
  command: '{"method":"firmware.schedulecomponentupgrade"}'
  params: []

# --- LED control (example method) ---
- id: led_blink
  label: Blink LED
  kind: action
  command: '{"method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier, e.g. systemstatus.
    - name: color
      type: string
      description: Color, e.g. red.
    - name: period
      type: integer
      description: Blink period.
```

## Feedbacks
```yaml
# Observable / queryable state (read via property.get or property.changed notifications).
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "service", "error"]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: active_source
  type: string
  property: image.window.main.source

- id: laser_power
  type: number
  property: illumination.sources.laser.power
  notes: Target power in percent (read/write).

- id: laser_min_power
  type: number
  property: illumination.sources.laser.minpower
  notes: Read-only, dynamic.

- id: laser_max_power
  type: number
  property: illumination.sources.laser.maxpower
  notes: Read-only, dynamic.

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position

- id: network_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: detected_signal
  type: object
  property: 'image.connector.{connectorobject}.detectedsignal'
  notes: 'Connector object name = connector name lower-cased, non-word chars removed (e.g. displayport1). Fields: active(bool), name, vertical/horizontal totals & resolution, sync widths, porches, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range (0-255|16-235), chroma_sampling (4:4:4|4:2:2|4:2:0), gamma_type (POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries (REC709|REC2020|DCI-P3-D65|DCI-P3-Theater), is_stereo, stereo_mode.'

- id: ip4_config
  type: object
  property: network.device.lan.ip4config
  notes: Fields Address, Mask, Gateway, NameServers.

# Subscribable source/signal change streams:
# - image.window.main.source (active source change; emits deselection + selection)
# - image.connector.{name}.detectedsignal (per-connector signal change)
```

## Variables
```yaml
# Settable parameters (set via property.set). Type/constraints per source.
- id: brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step: 1
  precision: 0.01
  default: 0

- id: contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01
  default: 1

- id: gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step: 1
  precision: 0.1
  default: 2.2

- id: saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01
  default: 1

- id: sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step: 1
  precision: 1

- id: window_position
  property: image.window.main.position
  type: object
  fields: {x: integer, y: integer}

- id: window_size
  property: image.window.main.size
  type: object
  fields: {width: integer, height: integer}

- id: scaling_mode
  property: image.window.main.scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: image_orientation
  property: image.orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values: ["Open", "Closed"]

- id: zoom_position
  property: optics.zoom.position
  type: integer

- id: focus_position
  property: optics.focus.position
  type: integer

- id: lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer

- id: lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer

- id: standby_enable
  property: system.standby.enable
  type: boolean

- id: eco_enable
  property: system.eco.enable
  type: boolean

- id: dmx_mode
  property: dmx.mode
  type: string

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
```

## Events
```yaml
# Unsolicited JSON-RPC notifications from device (no id, no response expected).
- id: property_changed
  method: property.changed
  description: Emitted when a subscribed property value changes. params.property is an array of {property: value} objects. Subscribe first via property.subscribe.
  examples:
    - '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
    - '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"image.window.main.source":"DisplayPort 2"}]}}'

- id: signal_callback
  method: signal.callback
  description: Emitted when a subscribed signal fires. params.signal is an array of {signal: args} objects. Subscribe first via signal.subscribe.

- id: model_updated
  method: modelupdated
  description: Signal fired when the object structure changes (objects added/removed, e.g. via introspect.objectchanged). Subscribe via signal.subscribe.
```

## Macros
```yaml
# Source documents multi-step procedures (no named macros). Key sequences:
# - Wake from ECO (serial): send ":POWR1\r"
# - Activate uploaded warp file: warp_file_upload -> warp_file_select -> warp_file_enable
# - Activate uploaded blend mask: blend_file_upload -> blend_file_select -> blend_file_enable
# - Activate uploaded black-level mask: blacklevel_file_upload -> blacklevel_file_select -> blacklevel_file_enable
# Best practice before power_on: property.get system.state must be standby|ready.
# Best practice before power_off: property.get system.state must be on.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Power on/off guidance is best-practice (verify
# state before commanding) but not described as a safety interlock.
```

## Notes
- API is JSON-RPC 2.0 over TCP (port 9090) and RS-232 (19200/8N1). Both transports accept the same commands. Notifications carry no `id` and require no response.
- `property.set` best practice: wait for confirmation before re-setting the same property; otherwise server may flood and performance degrades.
- The API is partly dynamic: available methods/properties depend on model, installed peripherals (e.g. motorized lens, DMX extended mode). The source recommends runtime `introspect` to discover the exact API.
- Source-signal monitoring requires reflecting the source/connector tree in the client: call `image.source.list`, translate each source name to an object name (strip non-word chars, lowercase), call `image.source.{name}.listconnectors`, then subscribe to `image.connector.{name}.detectedsignal` per connector.
- Source selection emits two `property.changed` notifications: first for the deselected source (value ""), then for the newly selected source.
- Connector/source object naming: source/connector name with all non-word characters removed and lower-cased (e.g. "DisplayPort 1" -> "displayport1").

<!-- UNRESOLVED: device name (FSN Color Touch Screen Display) does not match the source (Barco Pulse projector API — references lamp/laser, lens shift, warp/blend/black-level, DMX, optics). Confirm whether the correct product/family was scraped and re-map model/entity accordingly. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: power/voltage/current specifications not stated in source. -->
<!-- UNRESOLVED: ECO wake-on-LAN packet format / port not specified (only that WoL with HW MAC is an option). -->
<!-- UNRESOLVED: authentication passcode value(s) and access-level scheme not specified beyond a single example (98765). -->
<!-- UNRESOLVED: blend mask / black-level mask exact layer-resolution mapping per model beyond the table given. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:23:57.863Z
last_checked_at: 2026-08-19T08:29:05.157Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:29:05.157Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "Every spec action's JSON-RPC method/serial command appears verbatim in the source; transport parameters (port 9090, 19200/8N1, /api) match source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device name vs source mismatch (source is the Barco Pulse projector API, not an FSN display). Confirm correct product."
- "firmware version compatibility not stated in source."
- "full property catalogue is dynamic and varies by model/peripherals; source recommends runtime introspection."
- "source contains no explicit safety warnings, interlock procedures, or"
- "device name (FSN Color Touch Screen Display) does not match the source (Barco Pulse projector API — references lamp/laser, lens shift, warp/blend/black-level, DMX, optics). Confirm whether the correct product/family was scraped and re-map model/entity accordingly."
- "power/voltage/current specifications not stated in source."
- "ECO wake-on-LAN packet format / port not specified (only that WoL with HW MAC is an option)."
- "authentication passcode value(s) and access-level scheme not specified beyond a single example (98765)."
- "blend mask / black-level mask exact layer-resolution mapping per model beyond the table given."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
