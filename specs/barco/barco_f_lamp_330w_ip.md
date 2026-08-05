---
spec_id: admin/barco-f-lamp-330w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F Lamp 330W Control Spec"
manufacturer: Barco
model_family: "F Lamp 330W"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "F Lamp 330W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:20:08.152Z
last_checked_at: 2026-08-05T08:00:31.874Z
generated_at: 2026-08-05T08:00:31.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is the generic Pulse API catalog and does not state which features apply specifically to the F Lamp 330W model; the document notes the API is dynamic and model/configuration dependent. Exact source/connector list, lamp vs laser illumination type, and available optics functions for this model are not confirmed."
  - "actual pass code value, access-level tiers, and token/session lifetime not specified in source"
  - "min/max not stated as fixed; source says minpower/maxpower are dynamic (lens/position dependent)."
  - "source describes no explicit named multi-step macro sequences."
  - "source states no explicit safety interlocks, power-sequencing requirements,"
  - "source is the generic Pulse API catalog, not an F Lamp 330W-specific document — exact feature set, illumination type (lamp vs laser), connector list, and optics capabilities for this model are not confirmed."
  - "firmware version compatibility not stated in source."
  - "authentication pass code values and access-level tiers not specified (only an example value 98765 shown)."
  - "session/token lifetime and connection persistence semantics not specified."
  - "TCP keepalive / idle-timeout behavior not stated."
  - "voltage, current, and power specifications not present in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:00:31.874Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions match literal JSON-RPC methods/properties/HTTP endpoints/serial wake token in source; transport parameters (port 9090, 19200 8N1, /api base) are all sourced verbatim. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco F Lamp 330W Control Spec

## Summary
Barco Pulse-family projector ("F Lamp 330W") controlled via the Pulse API, a JSON-RPC 2.0 service accessible over TCP/IP (port 9090) and over an RS-232 serial line. The API exposes power on/off, source selection, illumination/laser power control, image (brightness/contrast/gamma/saturation/sharpness) adjustment, warp/blend/black-level file handling, optics (shutter/zoom/focus/lens shift), DMX, environment telemetry, and firmware introspection. Commands are JSON-RPC method invocations and property set/get/subscribe operations over either transport; file uploads use HTTP POST.

<!-- UNRESOLVED: the source is the generic Pulse API catalog and does not state which features apply specifically to the F Lamp 330W model; the document notes the API is dynamic and model/configuration dependent. Exact source/connector list, lamp vs laser illumination type, and available optics functions for this model are not confirmed. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: http://{projector-ip}/api  # file endpoints only (upload/download)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents an "authenticate" method with a secret pass code
  # Authentication is optional: required only for access levels above normal end user.
  # Example request: { "jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1 }
  # UNRESOLVED: actual pass code value, access-level tiers, and token/session lifetime not specified in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff
  - queryable    # inferred from property.get / system.state / environment queries
  - routable     # inferred from image.window.main.source selection
  - levelable    # inferred from image.brightness/contrast/gamma and illumination.sources.laser.power
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over TCP (port 9090) or RS-232. The id is a
# client-supplied request identifier (string or number); shown as {id} where
# the source uses arbitrary values. Whitespace/newlines inside the JSON are
# illustrative only - the source shows equivalent compact and pretty forms.

# --- System / power ---
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier
  notes: Result is null on success. No-op if already on or in state transition.

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier
  notes: Result is null on success. No-op if already off or in state transition.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII string sent over RS-232 only, to wake a projector in ECO mode.

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (source example uses 98765)
    - name: id
      type: integer
      description: Client request identifier
  notes: Sets user access level. Optional for normal end-user access.

# --- Source / input routing ---
- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":{source}},"id":{id}}'
  params:
    - name: source
      type: string
      description: Source name, e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI"
    - name: id
      type: integer
      description: Client request identifier

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier
  notes: Returns array of available source names (model-dependent).

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors","id":{id}}'
  params:
    - name: sourceobject
      type: string
      description: Source object name (source name lowercased, non-word chars removed, e.g. "displayport1")
    - name: id
      type: integer
      description: Client request identifier

# --- Property get/set/subscribe (generic RPC methods) ---
- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: id
      type: integer
      description: Client request identifier

- id: property_get_many
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":[{properties}]},"id":{id}}'
  params:
    - name: properties
      type: array
      description: Array of property path strings
    - name: id
      type: integer
      description: Client request identifier

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":{property},"value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: value
      type: any
      description: Value to set (type per property)
    - name: id
      type: integer
      description: Client request identifier
  notes: Wait for confirmation before setting the same property again.

- id: property_subscribe
  label: Subscribe To Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: any
      description: Property path string or array of property path strings
    - name: id
      type: integer
      description: Client request identifier

- id: property_subscribe_many
  label: Subscribe To Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":[{properties}]},"id":{id}}'
  params:
    - name: properties
      type: array
      description: Array of property path strings
    - name: id
      type: integer
      description: Client request identifier

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: any
      description: Property path string or array of property path strings
    - name: id
      type: integer
      description: Client request identifier

- id: property_unsubscribe_many
  label: Unsubscribe From Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":[{properties}]},"id":{id}}'
  params:
    - name: properties
      type: array
      description: Array of property path strings
    - name: id
      type: integer
      description: Client request identifier

# --- Signals ---
- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: any
      description: Signal name string or array of signal name strings (e.g. "modelupdated", "image.processing.warp.gridchanged")
    - name: id
      type: integer
      description: Client request identifier

- id: signal_subscribe_many
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":[{signals}]},"id":{id}}'
  params:
    - name: signals
      type: array
      description: Array of signal name strings
    - name: id
      type: integer
      description: Client request identifier

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: any
      description: Signal name string or array of signal name strings
    - name: id
      type: integer
      description: Client request identifier

- id: signal_unsubscribe_many
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":[{signals}]},"id":{id}}'
  params:
    - name: signals
      type: array
      description: Array of signal name strings
    - name: id
      type: integer
      description: Client request identifier

# --- Introspection ---
- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":{object},"recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty/"" introspects everything)
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level). Default true.
    - name: id
      type: integer
      description: Client request identifier
  notes: Equivalent positional form: params: [{object}, {recursive}].

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier
  notes: Engages Constant Light Output at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer
      description: Client request identifier

# --- Image processing: warp / blend / black-level file handling ---
- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
      description: true to enable all warp functions
    - name: id
      type: integer
      description: Client request identifier

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
    - name: id
      type: integer

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":{filename}},"id":{id}}'
  params:
    - name: filename
      type: string
      description: Warp grid file name (e.g. "warp.xml")
    - name: id
      type: integer

- id: enable_blend_file
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
    - name: id
      type: integer

- id: select_blend_file
  label: Select Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{filename}},"id":{id}}'
  params:
    - name: filename
      type: string
      description: Blend mask file name (e.g. "mask.png")
    - name: id
      type: integer

- id: enable_blacklevel_file
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
    - name: id
      type: integer

- id: select_blacklevel_file
  label: Select Black Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":{filename}},"id":{id}}'
  params:
    - name: filename
      type: string
      description: Black level mask file name (e.g. "blacklevel.png")
    - name: id
      type: integer

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector-ip}/api/image/processing/warp/file/transfer'
  params:
    - name: localfile
      type: string
      description: Local warp grid file path
    - name: projector-ip
      type: string
      description: Projector IP address
  notes: HTTP POST file upload. -X POST may be omitted (implied by -F).

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector-ip}/api/image/processing/blend/file/transfer'
  params:
    - name: localfile
      type: string
    - name: projector-ip
      type: string

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{localfile} http://{projector-ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: localfile
      type: string
    - name: projector-ip
      type: string

# --- Optics ---
- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{value}},"id":{id}}'
  params:
    - name: value
      type: string
      description: '"Open" or "Closed"'
    - name: id
      type: integer

# --- System state enables ---
- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
    - name: id
      type: integer
  notes: Check availability first.

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean
    - name: id
      type: integer
  notes: Check availability first.

# --- Environment telemetry ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":{type},"valuetype":{valuetype}},"id":{id}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"'
    - name: valuetype
      type: string
      description: 'Value type enum: "Temperature", "Speed", "PWM", "Voltage", "Current", "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate", "Peltier", "Waveform", "Average", "Delay", "Difference", "Interpolation", "Limit", "Median", "Noise", "Weighting", "Comparison", "Threshold", "Formula", "Driver", "PID", "Mode", "State", "Pump", "Resistance", "Simulation", "Constant", "Manual", "Range", "Any"'
    - name: id
      type: integer
  notes: Returns dictionary of sensor-name -> reading (e.g. temperatures, fan tachos).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Returns array of alarms with severity, timestamp, source, description, custommessage.

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Returns list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Returns list of all modes.

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Returns names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Returns components with name, available version, running version, status ("Unknown","OK","Upgradable").

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Forces a component upgrade at the following reboot.

# --- Color management ---
- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":{presetname}},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: integer

- id: color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":{presetname}},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: integer
  notes: Resets preset back to default values.

- id: color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: integer

- id: color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Cycles to the next RGB mode.

# --- LED control (documented via example) ---
- id: led_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":{led},"color":{color},"period":{period}},"id":{id}}'
  params:
    - name: led
      type: string
      description: LED identifier (source example: "systemstatus")
    - name: color
      type: string
      description: Color (source example: "red")
    - name: period
      type: integer
      description: Blink period (source example: 42)
    - name: id
      type: integer
```

## Feedbacks
```yaml
# Observable states retrieved via property.get or pushed via property.changed notifications.
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state
  notes: Current operation state. Subscribable.

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state
  notes: Subscribable.

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: active_source
  type: string
  property: image.window.main.source
  notes: Currently displayed source name. Subscribable.

- id: detected_signal
  type: object
  property: image.connector.{connectorobject}.detectedsignal
  notes: Per-connector signal info (active, name, resolutions, timings, color space, etc.). Subscribable.

- id: laser_power_level
  type: float
  property: illumination.sources.laser.power
  notes: Current laser power in percent. Subscribable.

- id: network_device_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position
```

## Variables
```yaml
# Settable parameters accessed via property.set.
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  access: read_write
  description: Image brightness/offset. 0 default, 1 = 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: read_write
  description: Image contrast/gain. 1 is default.

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  access: read_write
  description: Image gamma. Default 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: read_write
  description: Image color saturation. 1 is default.

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  access: read_write

- id: image_orientation
  property: image.orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  access: read_write

- id: image_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  access: read_write

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  description: Target laser power in percent.
  # UNRESOLVED: min/max not stated as fixed; source says minpower/maxpower are dynamic (lens/position dependent).

- id: laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  access: read_only

- id: laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  access: read_only

- id: window_position
  property: image.window.main.position
  type: object
  access: read_write
  fields: {x: int, y: int}

- id: window_size
  property: image.window.main.size
  type: object
  access: read_write
  fields: {width: int, height: int}

- id: zoom_position
  property: optics.zoom.position
  type: integer
  access: read_write

- id: focus_position
  property: optics.focus.position
  type: integer
  access: read_write

- id: lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer
  access: read_write

- id: lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer
  access: read_write

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  access: read_write
  description: DMX start channel [1..512].

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write

- id: network_lan_ip4config
  property: network.device.lan.ip4config
  type: object
  access: read_write
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response to return).
- id: property_changed
  method: property.changed
  description: Pushed when a subscribed property value changes. params.property is an array of {propertyName: value} objects.
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  method: signal.callback
  description: Pushed when a subscribed signal is emitted. params.signal is an array of {signalName: {args}} objects.
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'

- id: modelupdated_signal
  signal: modelupdated
  description: Triggered when the object structure changes (objects added or removed). Delivered via signal.callback.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on is a no-op if projector already on or in state transition; source recommends verifying system.state is standby or ready before issuing system.poweron."
  - "Power off is a no-op if already off or in transition; source recommends verifying system.state is on before issuing system.poweroff."
  - "Wait for property.set confirmation before setting the same property again; repeated unconfirmed sets may flood the server and reduce performance."
# UNRESOLVED: source states no explicit safety interlocks, power-sequencing requirements,
# or lamp cooldown/lockout procedures beyond the general state-machine notes above.
```

## Notes
- The API is JSON-RPC 2.0 and transport-agnostic: identical commands work over TCP (port 9090) and RS-232 (19200 8N1). Request parameter order does not matter (named params).
- A `result: null` response is not an error — methods that return no value simply yield null. Errors come back as a JSON-RPC `error` member.
- Notifications (no `id`) must not be answered. The client must implement `property.changed` and `signal.callback` handlers.
- Source-selection notifications arrive as a pair: first clearing the prior source, then setting the new one.
- File endpoints (warp/blend/black-level upload) use HTTP POST to `http://{ip}/api/...`, separate from the JSON-RPC control channel. Supported image formats: PNG (up to 16-bit), JPEG, TIFF; grayscale only (color images use blue channel).
- ECO-mode wake requires Wake-on-LAN, the IR/keypad power button, or the serial-only `:POWR1\r` ASCII string.
- The source notes the API is dynamic and model/configuration-dependent (e.g. lens options, DMX extended mode). Introspection is the authoritative way to discover a specific unit's exact API.

<!-- UNRESOLVED: source is the generic Pulse API catalog, not an F Lamp 330W-specific document — exact feature set, illumination type (lamp vs laser), connector list, and optics capabilities for this model are not confirmed. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication pass code values and access-level tiers not specified (only an example value 98765 shown). -->
<!-- UNRESOLVED: session/token lifetime and connection persistence semantics not specified. -->
<!-- UNRESOLVED: TCP keepalive / idle-timeout behavior not stated. -->
<!-- UNRESOLVED: voltage, current, and power specifications not present in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:20:08.152Z
last_checked_at: 2026-08-05T08:00:31.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:00:31.874Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions match literal JSON-RPC methods/properties/HTTP endpoints/serial wake token in source; transport parameters (port 9090, 19200 8N1, /api base) are all sourced verbatim. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is the generic Pulse API catalog and does not state which features apply specifically to the F Lamp 330W model; the document notes the API is dynamic and model/configuration dependent. Exact source/connector list, lamp vs laser illumination type, and available optics functions for this model are not confirmed."
- "actual pass code value, access-level tiers, and token/session lifetime not specified in source"
- "min/max not stated as fixed; source says minpower/maxpower are dynamic (lens/position dependent)."
- "source describes no explicit named multi-step macro sequences."
- "source states no explicit safety interlocks, power-sequencing requirements,"
- "source is the generic Pulse API catalog, not an F Lamp 330W-specific document — exact feature set, illumination type (lamp vs laser), connector list, and optics capabilities for this model are not confirmed."
- "firmware version compatibility not stated in source."
- "authentication pass code values and access-level tiers not specified (only an example value 98765 shown)."
- "session/token lifetime and connection persistence semantics not specified."
- "TCP keepalive / idle-timeout behavior not stated."
- "voltage, current, and power specifications not present in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
