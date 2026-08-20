---
spec_id: admin/barco-io-gateway
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Control Spec"
manufacturer: Barco
model_family: Pulse
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Pulse
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:09:39.396Z
last_checked_at: 2026-08-19T08:44:49.916Z
generated_at: 2026-08-19T08:44:49.916Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ledctrl.blink
  - "device-name \"Io Gateway\" supplied by operator but source text describes \"Pulse projectors\"; relationship between Io Gateway and Pulse not stated in source. Model-specific source lists, connector rosters, and illumination source types vary per projector and must be obtained via introspection. Firmware version compatibility not stated."
  - "pass-code format not documented (example uses integer code 98765); credential distribution unknown"
  - "code distribution and full value space not documented.\""
  - "params for selecting specific component not shown in source.\""
  - "full set of introspectable signal/callback payloads not exhaustively enumerated; use introspect at runtime."
  - "motorized zoom/focus/lensshift setters not shown as RW in source - list positions as read_only. If a projector has motorized lens, setter methods may exist via introspection."
  - "no explicit safety interlock procedure, fault recovery sequence, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:44:49.916Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions match literal JSON-RPC methods, HTTP endpoints, or :POWR1 serial token in the source; transport params verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Pulse Control Spec

## Summary
Barco Pulse projectors controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. API exposes methods (power, source selection, introspection, firmware, environment), settable properties (image, illumination, optics, warp, blend, black level, DMX), signal/property subscriptions, and HTTP file endpoints for warp/blend/blacklevel mask upload.

<!-- UNRESOLVED: device-name "Io Gateway" supplied by operator but source text describes "Pulse projectors"; relationship between Io Gateway and Pulse not stated in source. Model-specific source lists, connector rosters, and illumination source types vary per projector and must be obtained via introspection. Firmware version compatibility not stated. -->

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
  cable: "9-pin female to host, 9-pin male to projector; pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  type: optional  # source: authentication skippable for normal end-user access; required for higher access levels
  # UNRESOLVED: pass-code format not documented (example uses integer code 98765); credential distribution unknown
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: property.get and introspection methods present
  - levelable    # inferred: brightness/contrast/gamma/saturation/sharpness/laser power settable
  - routable     # inferred: image.window.main.source select + source/connector lists present
```

## Actions
```yaml
# JSON-RPC 2.0 methods enumerated as distinct actions. property.set/get/subscribe
# modelled as parameterized; their property targets also surfaced as named actions
# where the source documents a specific operational payload.

# --- System / power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: "Result null on success. No-op if already on or in transition. Verify state=standby|ready first."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: "Result null on success. No-op if already off or in transition. Verify state=on first."

- id: eco_wake_serial
  label: ECO Mode Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII bytes sent over RS-232 to wake projector in ECO mode. Alternative wake methods: WoL (MAC address), remote power button, keypad power button."

# --- Authentication ---
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: "Secret pass code (example value 98765 shown in source). Format not documented."
  notes: "Sets user access level. Skippable for normal end-user access. # UNRESOLVED: code distribution and full value space not documented."

# --- Property API (parameterized) ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: "Property path in dot notation (e.g. image.brightness, image.window.main.source)."
    - name: value
      type: any
      description: "Value matching property type (string/int/float/bool/array)."
  notes: "Wait for confirmation before re-setting same property; flooding server degrades performance."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property path in dot notation. Accepts a single string or an array of strings for batch reads."

- id: property_get_many
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: "Array of property paths; result returned as object mapping each path to its value."

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property path or array of paths. Subscribing does NOT return current value; use property.get for that."

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property path or array of paths previously subscribed."

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: "Signal name or array of names (e.g. modelupdated, image.processing.warp.gridchanged)."

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: "Signal name or array of names previously subscribed."

# --- Introspection ---
- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: "Object name in dot notation; empty string introspects everything."
    - name: recursive
      type: boolean
      description: "Default true. If false, only direct child object names are listed (one level)."
  notes: "Metadata restricted by authenticated access level. Also accepts positional params form: {\"params\":[\"foo\",true]}."

# --- Image / source / connector ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: "Returns array of source name strings. Roster varies per projector model (example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: "Returns array of physical connector name strings (example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI)."

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: "Source object name = source name with non-word chars removed and lower-cased (e.g. 'DisplayPort 1' -> 'displayport1')."
  notes: "Returns array of {gridposition:{row,column,plane}, name}."

- id: select_source_displayport1
  label: Select DisplayPort 1 Input
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params: []

- id: select_source_hdmi
  label: Select HDMI Input
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"HDMI"}}'
  params: []

- id: select_source_generic
  label: Select Source (Generic)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: "One of the names returned by image.source.list (e.g. 'DVI 1', 'DisplayPort 2', 'HDBaseT', 'SDI')."
  notes: "Generates two property.changed notifications: first empty string (deselect previous), then new source name."

# --- Color ---
- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset Color Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
  notes: "Resets preset back to its default values."

- id: color_p7_custom_resettonative
  label: Reset Color Custom To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_next
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycles through all possible RGB modes."

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: "Engage Constant Light Output at current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: "Returns string."

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: "Returns array of available channel name strings."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: "Returns array of all mode name strings."

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: "One of: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "One of: Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode."
  notes: "Returns array of {key,value(float)} pairs."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity,timestamp,source,description,custommessage}."

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: "Returns array of managed component name strings."

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns array of {name, versions:{available,running}, status}. status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Forces a component upgrade at next reboot. # UNRESOLVED: params for selecting specific component not shown in source."

# --- Warp / blend / black level toggles (property.set wrappers for documented operations) ---
- id: warp_enable
  label: Enable Global Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: blacklevel_file_enable
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enable}}}'
  params:
    - name: enable
      type: boolean

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

# --- HTTP file endpoints (upload) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector_address}/api/image/processing/warp/file/transfer'
  params:
    - name: localfile
      type: string
      description: "Local warp grid XML path. Format same as MCM500/400."
    - name: projector_address
      type: string
      description: "Projector IP (e.g. 192.168.1.100)."

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector_address}/api/image/processing/blend/file/transfer'
  params:
    - name: localfile
      type: string
      description: "Grayscale PNG/JPEG/TIFF, 8 or 16-bit. Size must match projector blend-layer resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Blue channel used if colour image uploaded."

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector_address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: localfile
      type: string
      description: "Grayscale PNG/JPEG/TIFF, 8 or 16-bit. Same resolution table as blend masks."

# --- HTTP file endpoints (download) ---
- id: download_warp_file
  label: Download Warp Grid File
  kind: query
  command: 'curl -O -J http://{projector_address}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_address
      type: string
  notes: "Append /{filename} (e.g. /warpgrid.xml) when endpoint does not serve the current file directly."
```

## Feedbacks
```yaml
# Observable states surfaced as query results or subscription notifications.

- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  read_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  subscribe_command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  read_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

- id: active_source
  type: string
  read_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  notes: "Two notifications on switch: empty string (deselect), then new source name."

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]

- id: network_device_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]

- id: connector_detectedsignal
  type: object
  properties:
    active: boolean
    name: string
    vertical_total: integer
    horizontal_total: integer
    vertical_resolution: integer
    horizontal_resolution: integer
    vertical_sync_width: integer
    vertical_front_porch: integer
    vertical_back_porch: integer
    horizontal_sync_width: integer
    horizontal_front_porch: integer
    horizontal_back_porch: integer
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: integer
    scan: string
    bits_per_component: integer
    color_space: string
    signal_range:
      enum: ["0-255", "16-235"]
    chroma_sampling:
      enum: ["4:4:4", "4:2:2", "4:2:0"]
    gamma_type:
      enum: ["POWER", "sRGB", "REC_BT1886", "SMPTE_ST2084"]
    color_primaries:
      enum: ["REC709", "REC2020", "DCI-P3-D65", "DCI-P3-Theater"]
    mastering_luminance: float
    content_aspect_ratio:
      enum: ["5:4", "4:3", "16:10", "16:9", "1.85:1", "2.20:1", "2.35:1", "2.37:1", "2.39:1", "Unknown"]
    is_stereo: boolean
    stereo_mode:
      enum: ["None", "Sequential", "FramePacked", "TopBottom", "SideBySide"]
  read_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorobject}.detectedsignal"}}'
  notes: "Connector object name = connector name lowercased, non-word chars removed. If active=false, ignore remaining fields."

# UNRESOLVED: full set of introspectable signal/callback payloads not exhaustively enumerated; use introspect at runtime.
```

## Variables
```yaml
# Settable parameters reachable via property.set; min/max where source documents constraints.

- id: image_brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: "Image brightness/offset. 0 default, 1 = 100% offset."
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'

- id: image_contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Image contrast/gain. 1 default."

- id: image_gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: "Image gamma. Default 2.2."

- id: image_saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Color saturation. 1 default."

- id: image_sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: image_window_main_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: illumination_sources_laser_power
  type: float
  description: "Target laser power in percent. RW. min/max dynamic - read illumination.sources.laser.minpower / .maxpower at runtime."
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'

- id: illumination_sources_laser_minpower
  type: float
  access: read_only
  description: "Minimum laser power in percent (dynamic)."

- id: illumination_sources_laser_maxpower
  type: float
  access: read_only
  description: "Maximum laser power in percent (dynamic)."

- id: optics_shutter_target
  type: enum
  values: ["Open", "Closed"]
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{value}}}'

- id: optics_zoom_position
  type: integer
  access: read_only

- id: optics_focus_position
  type: integer
  access: read_only

- id: optics_lensshift_horizontal_position
  type: integer
  access: read_only

- id: optics_lensshift_vertical_position
  type: integer
  access: read_only

- id: system_standby_enable
  type: boolean
  description: "Enable/disable standby state. Check availability first."

- id: system_eco_enable
  type: boolean
  description: "Enable/disable ECO state. Check availability first."

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  access: read_only
  properties:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string

# UNRESOLVED: motorized zoom/focus/lensshift setters not shown as RW in source - list positions as read_only. If a projector has motorized lens, setter methods may exist via introspection.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; no response permitted).

- id: property_changed
  method: property.changed
  payload_shape:
    property:
      type: array
      items:
        type: object
        description: "Each element is {<propertyname>: <value>}."
  notes: "Server-pushed on any subscribed property change. Client must implement property.changed handler."

- id: signal_callback
  method: signal.callback
  payload_shape:
    signal:
      type: array
      items:
        type: object
        description: "Each element is {<signalname>: {<argname>: <argval>}} (e.g. {introspect.objectchanged: {object: motors.motor1, newobject: true}})."
  notes: "Server-pushed on any subscribed signal emission. Client must implement signal.callback handler."

- id: modelupdated_signal
  method: signal.callback
  trigger: "Object structure changes (objects added or removed). Subscribe via signal.subscribe with signal=modelupdated."
```

## Macros
```yaml
# Source documents explicit multi-step sequences for warp/blend/blacklevel activation.
# Each macro is the documented sequence; do not skip confirmation waits.

- id: activate_warp_file
  label: Upload + Activate Warp File
  steps:
    - "property.set image.processing.warp.enable=true"
    - "HTTP POST warp grid to /api/image/processing/warp/file/transfer"
    - "property.set image.processing.warp.file.selected=<filename>"
    - "property.set image.processing.warp.file.enable=true"

- id: activate_blend_mask
  label: Upload + Activate Blend Mask
  steps:
    - "HTTP POST blend mask to /api/image/processing/blend/file/transfer"
    - "property.set image.processing.blend.file.selected=<filename>"
    - "property.set image.processing.blend.file.enable=true"

- id: activate_blacklevel_mask
  label: Upload + Activate Black Level Mask
  steps:
    - "HTTP POST black level mask to /api/image/processing/blacklevel/file/transfer"
    - "property.set image.processing.blacklevel.file.selected=<filename>"
    - "property.set image.processing.blacklevel.file.enable=true"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power-on: verify system.state is standby or ready before issuing system.poweron; otherwise no-op."
  - "Power-off: verify system.state is on before issuing system.poweroff; otherwise no-op."
  - "property.set: wait for confirmation before re-setting same property; flooding degrades performance."
  - "ECO wake: requires WoL (MAC), IR remote, keypad, or serial :POWR1\\r - standard poweron may not wake from ECO."
# UNRESOLVED: no explicit safety interlock procedure, fault recovery sequence, or power-on sequencing
# requirement documented in source beyond the soft "best practice" notes above. Lamp/laser thermal
# fault behaviour not documented.
```

## Notes
- All JSON-RPC parameter order is insignificant — parameters passed by name.
- API surface is dynamic: actual properties/methods depend on mounted peripherals and projector configuration (e.g. motorized lens vs fixed, DMX basic vs extended mode). Use `introspect` to enumerate the live API for a specific unit.
- Source/connector object names derived by stripping non-word chars and lowercasing the human name (`DisplayPort 1` → `displayport1`).
- Subscriptions deliver change notifications only — they do NOT return the current value. Always pair `property.subscribe` with an initial `property.get`.
- Source-select emits two notifications: empty string for deselect, then new source name.
- Warp file format identical to MCM500/400.
- HTTP file endpoints: blend and black-level masks are grayscale-only (8 or 16-bit); colour images accepted but only blue channel used. Supported formats: PNG (up to 16-bit), JPEG, TIFF.
- File-transfer URL pattern: `http://<projector_address>/api/<endpoint>` (e.g. `/api/image/processing/warp/file/transfer`). Append `/<filename>` to download a specific file when the endpoint does not serve the active one.

<!-- UNRESOLVED: -->
<!-- - "Io Gateway" vs "Pulse" naming: source title is "Pulse API" describing Pulse projectors; operator-supplied device name is "Io Gateway". Reconcile before publishing. -->
<!-- - Authentication pass-code format, value space, and distribution channel not documented. -->
<!-- - firmware.schedulecomponentupgrade params not shown. -->
<!-- - Full enumeration of color presets (p7 custom preset names), DMX channel/mode values, and RGB modes not given — discoverable via introspection only. -->
<!-- - Motorized-lens setter methods (zoom/focus/lensshift target) not in source property table; positions are read_only. -->
<!-- - Signal/callback argument schemas beyond introspect.objectchanged and property.changed not enumerated. -->
<!-- - Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:09:39.396Z
last_checked_at: 2026-08-19T08:44:49.916Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:44:49.916Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions match literal JSON-RPC methods, HTTP endpoints, or :POWR1 serial token in the source; transport params verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ledctrl.blink
- "device-name \"Io Gateway\" supplied by operator but source text describes \"Pulse projectors\"; relationship between Io Gateway and Pulse not stated in source. Model-specific source lists, connector rosters, and illumination source types vary per projector and must be obtained via introspection. Firmware version compatibility not stated."
- "pass-code format not documented (example uses integer code 98765); credential distribution unknown"
- "code distribution and full value space not documented.\""
- "params for selecting specific component not shown in source.\""
- "full set of introspectable signal/callback payloads not exhaustively enumerated; use introspect at runtime."
- "motorized zoom/focus/lensshift setters not shown as RW in source - list positions as read_only. If a projector has motorized lens, setter methods may exist via introspection."
- "no explicit safety interlock procedure, fault recovery sequence, or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
