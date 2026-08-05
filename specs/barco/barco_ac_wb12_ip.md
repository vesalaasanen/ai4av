---
spec_id: admin/barco-ac-wb12
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ac Wb12 Control Spec"
manufacturer: Barco
model_family: "Barco Ac Wb12"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Ac Wb12"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:56:48.881Z
last_checked_at: 2026-07-21T20:50:30.245Z
generated_at: 2026-07-21T20:50:30.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic \"Pulse API\" document and does not name the \"Ac Wb12\" model explicitly; model mapping assumed from task context. Firmware version compatibility not stated."
  - "no explicit multi-step sequences documented as named macros in source."
  - "no explicit hardware interlock or power-on sequencing requirements beyond the state-check guidance above stated in source."
  - "source is a generic Pulse API document; does not explicitly name the \"Ac Wb12\" model."
  - "firmware version compatibility not stated in source."
  - "protocol/API version number not stated in source."
  - "exact set of available sources/connectors/optics depends on unit configuration; introspect required."
  - "voltage/current/power specs not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:50:30.245Z
  matched_actions: 73
  action_count: 73
  confidence: medium
  summary: "All 73 spec actions matched literally in source; all transport parameters verified in RS232 and network sections; comprehensive API coverage via specific methods plus generic property/signal operations. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Ac Wb12 Control Spec

## Summary
Barco Pulse projector controlled via a JSON-RPC 2.0 API ("Pulse API"). The service is reachable over TCP/IP on port 9090 and over an RS-232 serial connection (19200 baud, 8N1, no flow control). The API exposes power control, input source selection, image/picture settings, illumination (laser power), optics (shutter/zoom/focus/lens shift), warping/blending/black-level file management, DMX, environment monitoring, and firmware management. File uploads/downloads use HTTP POST/GET at `http://{ip}/api/...`.

<!-- UNRESOLVED: source is a generic "Pulse API" document and does not name the "Ac Wb12" model explicitly; model mapping assumed from task context. Firmware version compatibility not stated. -->

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
  type: none  # inferred: auth optional for normal end-user access; source describes an optional passcode `authenticate` method for elevated access levels only
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff commands present
  - routable     # inferred: input source selection commands present
  - queryable    # inferred: property.get query commands and image.source.list present
  - levelable    # inferred: brightness/contrast/gamma/saturation/sharpness/laser-power set commands present
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over TCP (port 9090) or serial. The "command"
# field holds the literal JSON-RPC request payload verbatim from the source.
# File operations use HTTP endpoints at http://{ip}/api/...

# --- System ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: system_state_query
  label: System State Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: system_standby_enable_set
  label: Set Standby State Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean
      description: Enable/disable the standby state

- id: system_eco_enable_set
  label: Set ECO State Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean
      description: Enable/disable the ECO state

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Special ASCII command sent on the RS-232 serial port to wake a projector in ECO mode.

# --- Illumination ---
- id: illumination_state_query
  label: Illumination State Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_laser_power_query
  label: Laser Power Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}}}'
  params:
    - name: power
      type: float
      description: Target laser power in percent (between minpower and maxpower)

- id: illumination_laser_minpower_query
  label: Laser Min Power Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: illumination_laser_maxpower_query
  label: Laser Max Power Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engage Constant Light Output at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Image: source / window ---
- id: image_active_source_query
  label: Active Source Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: image_set_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":{source}}}'
  params:
    - name: source
      type: string
      description: 'Source name (e.g. "DisplayPort 1", "HDMI"); obtain from image.source.list'

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: 'Source object name; derive from source name by removing non-word chars and lowercasing (e.g. "DisplayPort 1" -> "displayport1")'

- id: image_connector_detectedsignal_query
  label: Connector Detected Signal Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"}}'
  params:
    - name: connectorname
      type: string
      description: 'Connector object name (e.g. "displayport1")'

- id: image_window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: image_window_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":{mode}}}'
  params:
    - name: mode
      type: string
      enum: ["Fill", "OneToOne", "FillScreen", "Stretch"]

# --- Image: picture settings ---
- id: image_brightness_query
  label: Brightness Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{brightness}}}'
  params:
    - name: brightness
      type: float
      description: Normalized offset, min -1 max 1, default 0, precision 0.01

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{contrast}}}'
  params:
    - name: contrast
      type: float
      description: Normalized gain, min 0 max 2, default 1, precision 0.01

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{gamma}}}'
  params:
    - name: gamma
      type: float
      description: Image gamma, min 1 max 3, default 2.2, precision 0.1

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{saturation}}}'
  params:
    - name: saturation
      type: float
      description: Normalized, min 0 max 2, default 1, precision 0.01

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{sharpness}}}'
  params:
    - name: sharpness
      type: integer
      description: Normalized, min -2 max 8, step 1

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":{orientation}}}'
  params:
    - name: orientation
      type: string
      enum: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

# --- Image: color ---
- id: image_color_copy_preset_to_custom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string

- id: image_color_reset_preset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string

- id: image_color_reset_to_native
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_next_rgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode.

# --- Image processing: warp ---
- id: warp_enable_set
  label: Set Warp Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: warp_file_enable_set
  label: Set Warp File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":{filename}}}'
  params:
    - name: filename
      type: string
      description: Warp grid file name (MCM500/400 compatible format)

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file path
    - name: ip
      type: string
      description: Projector IP address

# --- Image processing: blend ---
- id: blend_file_enable_set
  label: Set Blend File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: blend_file_selected_set
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{filenames}}}'
  params:
    - name: filenames
      type: array
      items: string
      description: Currently selected blend files

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask image path (PNG up to 16 bit / JPEG / TIFF, grayscale)
    - name: ip
      type: string

# --- Image processing: black level ---
- id: blacklevel_file_enable_set
  label: Set Black Level File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":{filename}}}'
  params:
    - name: filename
      type: string

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask image path (PNG up to 16 bit / JPEG / TIFF, grayscale)
    - name: ip
      type: string

# --- Optics ---
- id: optics_shutter_position_set
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":{position}}}'
  params:
    - name: position
      type: string
      enum: ["Open", "Closed"]

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{target}}}'
  params:
    - name: target
      type: string
      enum: ["Open", "Closed"]

- id: optics_zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: optics_focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: optics_lensshift_horizontal_set
  label: Set Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}}}'
  params:
    - name: position
      type: integer

- id: optics_lensshift_vertical_set
  label: Set Lens Shift Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}}}'
  params:
    - name: position
      type: integer

# --- DMX ---
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":{mode}}}'
  params:
    - name: mode
      type: string

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{startchannel}}}'
  params:
    - name: startchannel
      type: integer
      description: DMX start channel [1..512]

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{shutdown}}}'
  params:
    - name: shutdown
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

# --- Network ---
- id: network_lan_ip4config_query
  label: LAN IPv4 Config Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: network_lan_state_query
  label: LAN State Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

# --- Environment ---
- id: environment_getcontrolblocks_temperature
  label: Get Temperature Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []

- id: environment_getcontrolblocks_speed
  label: Get Fan Speed Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []

- id: environment_alarmstate_query
  label: Alarm State Query
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Force a component upgrade at the following reboot.

# --- Core API methods ---
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level
  notes: Optional; only required for access above normal end user.

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":{object},"recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: 'Object name in dot notation (empty = root)'
    - name: recursive
      type: boolean
      description: If false, only object names at one level are listed.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":[{properties}]}}'
  params:
    - name: properties
      type: array
      items: string

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":{property},"value":{value}}}'
  params:
    - name: property
      type: string
    - name: value
      type: any

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: any
      description: Property path (string) or array of property paths

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: any

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: any
      description: Signal name (string) or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: any

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":{led},"color":{color},"period":{period}}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  via: property.changed notification on "system.state"

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  via: property.changed notification on "illumination.state"

- id: active_source
  type: string
  via: property.changed notification on "image.window.main.source"

- id: laser_power
  type: number
  via: property.changed notification on "illumination.sources.laser.power"

- id: brightness
  type: number
  via: property.changed notification on "image.brightness"

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  via: property on "environment.alarmstate"

- id: network_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  via: property on "network.device.lan.state"
```

## Variables
```yaml
# Settable parameters surfaced as properties in the source.
- id: image_brightness
  type: float
  min: -1
  max: 1
  default: 0
  precision: 0.01

- id: image_contrast
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01

- id: image_gamma
  type: float
  min: 1
  max: 3
  default: 2.2
  precision: 0.1

- id: image_saturation
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01

- id: image_sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: laser_power
  type: float
  description: Target laser power in percent (between minpower and maxpower, dynamic)

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512
```

## Events
```yaml
- id: property_changed
  description: Unsolicited notification when a subscribed property value changes. Carries an array of property/value pairs.
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":100}]}}'

- id: signal_callback
  description: Unsolicited notification when a subscribed signal is emitted. Carries an array of signal/argument-list pairs.
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'

- id: modelupdated
  description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as named macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on: verify system.state is 'standby' or 'ready' before issuing system.poweron; otherwise nothing happens."
  - "Power off: verify system.state is 'on' before issuing system.poweroff; otherwise nothing happens."
  - "property.set best practice: wait for confirmation before setting the same property again; flooding may reduce performance."
# UNRESOLVED: no explicit hardware interlock or power-on sequencing requirements beyond the state-check guidance above stated in source.
```

## Notes
- The API is a generic Barco "Pulse API". Parts are dynamic and depend on the specific projector configuration and peripherals (e.g. motorized lens, DMX extended mode). Introspection is the authoritative way to discover the exact available API surface for a given unit.
- Source/connector object names are derived from human-readable names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
- Notifications are only sent when a value actually changes; subscribing does not return the current value (use property.get for that).
- File endpoints (warp grid, blend mask, black level mask) are HTTP at `http://{ip}/api/...`; uploads use `curl -F file=@...` (multipart POST). Supported image formats: PNG (up to 16 bit), JPEG, TIFF — grayscale only (blue channel used if colour image supplied).
- Mask resolution must match projector blend/black-level layer resolution: WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540.
- Warp file format is identical to MCM500/400.
- ECO mode wake options: Wake-on-LAN (MAC address), remote power button, keypad power button, or the special serial ASCII command `:POWR1\r`.
- Available source names vary by projector model; examples in source include DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI.

<!-- UNRESOLVED: source is a generic Pulse API document; does not explicitly name the "Ac Wb12" model. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol/API version number not stated in source. -->
<!-- UNRESOLVED: exact set of available sources/connectors/optics depends on unit configuration; introspect required. -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:56:48.881Z
last_checked_at: 2026-07-21T20:50:30.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:50:30.245Z
matched_actions: 73
action_count: 73
confidence: medium
summary: "All 73 spec actions matched literally in source; all transport parameters verified in RS232 and network sections; comprehensive API coverage via specific methods plus generic property/signal operations. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic \"Pulse API\" document and does not name the \"Ac Wb12\" model explicitly; model mapping assumed from task context. Firmware version compatibility not stated."
- "no explicit multi-step sequences documented as named macros in source."
- "no explicit hardware interlock or power-on sequencing requirements beyond the state-check guidance above stated in source."
- "source is a generic Pulse API document; does not explicitly name the \"Ac Wb12\" model."
- "firmware version compatibility not stated in source."
- "protocol/API version number not stated in source."
- "exact set of available sources/connectors/optics depends on unit configuration; introspect required."
- "voltage/current/power specs not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
