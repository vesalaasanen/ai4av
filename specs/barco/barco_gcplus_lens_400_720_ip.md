---
spec_id: admin/barco-gcplus-lens-400-720
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gcplus Lens 400 720 Control Spec"
manufacturer: Barco
model_family: "Gcplus Lens 400 720"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Gcplus Lens 400 720"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:04:51.192Z
last_checked_at: 2026-08-05T08:07:35.763Z
generated_at: 2026-08-05T08:07:35.763Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Exact model variant connector set varies by configuration (source notes API is dynamic). Authentication secret/passcode value not stated (example uses a placeholder)."
  - "actual passcode value not stated in source (example uses code 98765)."
  - "dynamic min per minpower property"
  - "dynamic max per maxpower property"
  - "no explicit multi-step sequences documented as named macros in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated. Authentication passcode value not stated. Exact connector/source set varies by model configuration. Voltage/current/power specs not in this document."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:07:35.763Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions map verbatim to JSON-RPC methods documented in the Pulse API source; transport parameters (port 9090, RS232 19200/8/N/1) and passcode auth are supported. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gcplus Lens 400 720 Control Spec

## Summary
Barco Pulse projector controllable via the Pulse API — a JSON-RPC 2.0 interface exposed over TCP/IP (port 9090) and RS-232 serial. Covers power state, source selection, illumination/laser power, image picture settings, optics (shutter/zoom/focus/lens shift), warp/blend/black-level file management, DMX, environment monitoring, and firmware management. The API is introspectable and uses property get/set/subscribe semantics.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Exact model variant connector set varies by configuration (source notes API is dynamic). Authentication secret/passcode value not stated (example uses a placeholder). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# JSON-RPC 2.0 message framing over both transports. The same commands are
# available for all connection types (source: "The type of connection is not
# important. The same commands are available for all connection types.").
addressing:
  port: 9090  # source: "The service is available on port number 9090."
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # source: RS232 Communication Parameters table. Cable: 9-pin female to host,
  # 9-pin male to projector; pin2-pin2, pin3-pin3, pin5-pin5.
auth:
  type: passcode  # source: "A client session must start with an authentication
                  # request containing a secret pass code."
  # Authentication sets user access level. It is OPTIONAL for normal end-user
  # access: "Authentication is only necessary when a higher level than normal
  # end user is required. For normal end user access the authentication can be
  # skipped."
  # UNRESOLVED: actual passcode value not stated in source (example uses code 98765).
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff methods present
  - queryable     # inferred: property.get queries and status enums present
  - levelable     # inferred: brightness/contrast/gamma/saturation/sharpness/laser power present
  - routable      # inferred: source selection (image.window.main.source) present
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over the Pulse API. `id` is a client-chosen
# request identifier (string|number). Commands are shown verbatim from source.

# ---- Power ----
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: >
    Result is null on success (not an error). If projector is already on or
    transitioning, nothing happens. Best practice: verify system.state is
    standby or ready before issuing.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: >
    Result is null on success. If already off or transitioning, nothing
    happens. Best practice: verify system.state is on before issuing.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: >
    Special ASCII command sent on the RS232 serial port to wake a projector
    in ECO mode. (Wake-on-LAN with HW/MAC address, or remote/keypad power
    button, are alternative wake methods.)

# ---- Authentication ----
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":CODE}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example in source uses 98765; actual value UNRESOLVED).
  notes: >
    Sets user access level. Optional for normal end-user access.

# ---- Property framework methods (generic) ----
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"OBJECT.PROPERTY","value":VALUE}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.
    - name: value
      type: any
      description: Value to set (type per property).
  notes: >
    Wait for confirmation before setting the same property again; flooding
    the server degrades performance.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"OBJECT.PROPERTY"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (or array of names for multi-get).

- id: property_subscribe
  label: Subscribe To Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"OBJECT.PROPERTY"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (or array of names for multi-subscribe).

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"OBJECT.PROPERTY"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (or array of names).

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"SIGNALNAME"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names for multi-subscribe).

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"SIGNALNAME"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names).

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"OBJECT","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything.
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level). Default true.
  notes: >
    Returns metadata (methods/properties/signals/objects) restricted by the
    client's authenticated access level. Recommended to discover the exact API
    of a specific projector configuration.

# ---- Source / connector management ----
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: >
    Returns array of source names (e.g. DVI 1, DVI 2, DisplayPort 1,
    DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head
    DisplayPort, HDBaseT, HDMI, SDI). Contents vary by model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.SOURCENAME.listconnectors"}'
  params:
    - name: SOURCENAME
      type: string
      description: >
        Source object name derived from the source display name by removing
        all non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
  notes: Returns array of connector info with name and grid position.

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"SOURCE"}}'
  params:
    - name: SOURCE
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI").

# ---- Illumination / laser ----
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":POWER}}'
  params:
    - name: POWER
      type: float
      description: Target power in percent. Range per minpower/maxpower properties.
  notes: Available illumination source kinds vary by projector (laser/LED/xenon/UHP).

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

# ---- Image picture settings ----
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":VALUE}}'
  params:
    - name: VALUE
      type: float
      description: Normalized brightness/offset. Min -1, max 1, default 0, precision 0.01.

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":VALUE}}'
  params:
    - name: VALUE
      type: float
      description: Normalized contrast/gain. Min 0, max 2, default 1, precision 0.01.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":VALUE}}'
  params:
    - name: VALUE
      type: float
      description: Image gamma. Min 1, max 3, default 2.2, precision 0.1.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":VALUE}}'
  params:
    - name: VALUE
      type: float
      description: Normalized color saturation. Min 0, max 2, default 1, precision 0.01.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":VALUE}}'
  params:
    - name: VALUE
      type: integer
      description: Normalized sharpness. Min -2, max 8, step 1.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":NAME}}'
  params:
    - name: NAME
      type: string
      description: Preset name to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":NAME}}'
  params:
    - name: NAME
      type: string
      description: Preset name to reset to defaults.

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode.

# ---- Warp ----
- id: set_warp_enable
  label: Set Warp Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":VALUE}}'
  params:
    - name: VALUE
      type: boolean
      description: Globally enable/disable all warp functions.

- id: set_warp_file_enable
  label: Set Warp File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":VALUE}}'
  params:
    - name: VALUE
      type: boolean

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"FILENAME"}}'
  params:
    - name: FILENAME
      type: string
      description: Warp grid file name (e.g. "warp.xml"). Upload via HTTP POST to /api/image/processing/warp/file/transfer.

# ---- Blend ----
- id: set_blend_file_enable
  label: Set Blend File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":VALUE}}'
  params:
    - name: VALUE
      type: boolean

- id: set_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"FILENAME"}}'
  params:
    - name: FILENAME
      type: string
      description: Blend mask file name (e.g. "mask.png"). Upload via HTTP POST to /api/image/processing/blend/file/transfer.

# ---- Black level ----
- id: set_blacklevel_file_enable
  label: Set Black Level File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":VALUE}}'
  params:
    - name: VALUE
      type: boolean

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"FILENAME"}}'
  params:
    - name: FILENAME
      type: string
      description: Black level mask file name (e.g. "blacklevel.png"). Upload via HTTP POST to /api/image/processing/blacklevel/file/transfer.

# ---- Optics ----
- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"TARGET"}}'
  params:
    - name: TARGET
      type: string
      description: Enum "Open" or "Closed".

# ---- DMX ----
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns list of all modes. Basic mode exposes 2 channels; extended mode exposes more.

# ---- Environment ----
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"TYPE","valuetype":"VALUETYPE"}}'
  params:
    - name: TYPE
      type: string
      description: >
        Sensor type enum: "Sensor","Filter","Controller","Actuator","Alarm","GenericBlock".
    - name: VALUETYPE
      type: string
      description: >
        Value type enum: "Temperature","Speed","PWM","Voltage","Current","Power",
        "Altitude","Pressure","Humidity","ADC","Coordinate","Peltier","Waveform",
        "Average","Delay","Difference","Interpolation","Limit","Median","Noise",
        "Weighting","Comparison","Threshold","Formula","Driver","PID","Mode",
        "State","Pump","Resistance","Simulation","Constant","Manual","Range","Any".
  notes: >
    Returns dictionary of sensor name -> reading. Used for temperatures, fan
    speeds, voltages, etc.

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm info (severity, timestamp, source, description, custommessage).

# ---- Firmware ----
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: >
    Returns array of {name, versions:{available, running}, status} where status
    enum is "Unknown","OK","Upgradable".

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot.

# ---- LED control (documented in method example) ----
- id: ledctrl_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"LED","color":"COLOR","period":PERIOD}}'
  params:
    - name: led
      type: string
      description: LED identifier (source example: "systemstatus").
    - name: color
      type: string
      description: Color (source example: "red").
    - name: period
      type: integer
      description: Blink period (source example: 42).
```

## Feedbacks
```yaml
# Observable state via property.get / property.changed notifications.

- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state
  notes: Current operation state of the unit.

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state
  notes: State of light (lamp/LED/laser).

- id: illumination_sources_laser_power
  type: number
  property: illumination.sources.laser.power
  notes: Current laser target power in percent (read/write).

- id: illumination_sources_laser_minpower
  type: number
  property: illumination.sources.laser.minpower
  notes: Minimum laser power in percent (read-only, dynamic).

- id: illumination_sources_laser_maxpower
  type: number
  property: illumination.sources.laser.maxpower
  notes: Maximum laser power in percent (read-only, dynamic).

- id: active_source
  type: string
  property: image.window.main.source
  notes: Source displayed in the main window.

- id: image_brightness
  type: number
  property: image.brightness
  notes: Normalized brightness/offset, -1..1, default 0.

- id: image_contrast
  type: number
  property: image.contrast
  notes: Normalized contrast/gain, 0..2, default 1.

- id: image_gamma
  type: number
  property: image.gamma
  notes: Image gamma, 1..3, default 2.2.

- id: image_saturation
  type: number
  property: image.saturation
  notes: Normalized saturation, 0..2, default 1.

- id: image_sharpness
  type: integer
  property: image.sharpness
  notes: Normalized sharpness, -2..8.

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  property: image.orientation

- id: window_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  property: image.window.main.scalingmode

- id: connector_detectedsignal
  type: object
  property: image.connector.{name}.detectedsignal
  notes: >
    Signal info: active(bool), name, vertical/horizontal totals & resolutions,
    sync widths, porches, frequencies, pixel_rate, scan, bits_per_component,
    color_space, signal_range(0-255|16-235), chroma_sampling(4:4:4|4:2:2|4:2:0),
    gamma_type(POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries, etc.
    Connector object name derived from display name (lowercase, non-word chars removed).

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position

- id: zoom_position
  type: integer
  property: optics.zoom.position

- id: focus_position
  type: integer
  property: optics.focus.position

- id: lensshift_horizontal_position
  type: integer
  property: optics.lensshift.horizontal.position

- id: lensshift_vertical_position
  type: integer
  property: optics.lensshift.vertical.position

- id: network_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: network_lan_ip4config
  type: object
  property: network.device.lan.ip4config
  notes: { Address: string, Mask: string, Gateway: string, NameServers: string }

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: integer
  property: dmx.startchannel
  notes: DMX start channel [1..512].

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: system_standby_enable
  type: boolean
  property: system.standby.enable

- id: system_eco_enable
  type: boolean
  property: system.eco.enable

- id: warp_enable
  type: boolean
  property: image.processing.warp.enable

- id: warp_file_enable
  type: boolean
  property: image.processing.warp.file.enable

- id: warp_file_selected
  type: string
  property: image.processing.warp.file.selected

- id: blend_file_enable
  type: boolean
  property: image.processing.blend.file.enable

- id: blend_file_selected
  type: array
  property: image.processing.blend.file.selected
  notes: Array of selected blend file names.

- id: blacklevel_file_enable
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: blacklevel_file_selected
  type: string
  property: image.processing.blacklevel.file.selected
```

## Variables
```yaml
# Settable parameters (written via property.set). Ranges from source introspection.
- id: var_laser_power
  property: illumination.sources.laser.power
  type: float
  min: null  # UNRESOLVED: dynamic min per minpower property
  max: null  # UNRESOLVED: dynamic max per maxpower property
  access: read_write

- id: var_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  default: 0
  access: read_write

- id: var_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  access: read_write

- id: var_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  default: 2.2
  access: read_write

- id: var_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  access: read_write

- id: var_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  access: read_write

- id: var_dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
  access: read_write

- id: var_dmx_mode
  property: dmx.mode
  type: string
  access: read_write

- id: var_dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write

- id: var_system_standby_enable
  property: system.standby.enable
  type: boolean
  access: read_write
  notes: Enable/disable use of standby state. Check availability first.

- id: var_system_eco_enable
  property: system.eco.enable
  type: boolean
  access: read_write
  notes: Enable/disable use of eco state. Check availability first.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response expected from client).
# The client must implement these notification handlers.

- id: property_changed
  signal: property.changed
  description: >
    Triggered when a property value changes. Delivered as
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"name":value},...]}}.
    Note: source-switch delivers TWO notifications (deselect old, select new).
  subscribe_via: property.subscribe

- id: modelupdated
  signal: modelupdated
  description: >
    Triggered when the object structure changes (objects added or removed).
    Subscribe via signal.subscribe. Callback delivers
    introspect.objectchanged with {object, newobject(bool)}.
  subscribe_via: signal.subscribe

- id: signal_callback
  signal: signal.callback
  description: >
    Generic signal callback. Delivered as
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{name:{args}}]}}.
  subscribe_via: signal.subscribe
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as named macros in source.
# The source describes procedures (e.g. warp upload+select+enable, blend
# upload+select+enable, blacklevel upload+select+enable, source/connector
# discovery workflow) but not as named macros. See Notes for the sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond "good practice" advice:
#   - verify system.state is standby/ready before system.poweron
#   - verify system.state is on before system.poweroff
# These are operational recommendations, not stated safety interlocks.
```

## Notes
- **Protocol:** Pulse API is JSON-RPC 2.0. Parameters are passed by name; order does not matter. Request `id` is optional (string|number); notifications carry no `id` and expect no response.
- **Dynamic API:** Parts of the API are dynamic and depend on peripherals/configuration. E.g. a non-motorized lens omits zoom controls; DMX extended mode exposes more channels. The source strongly recommends runtime introspection (`introspect` method) to discover the exact API of a specific unit.
- **Best practice — property.set:** Wait for confirmation before re-setting the same property; otherwise the server may be flooded and performance degrades.
- **Source-switch notifications:** Selecting a new source emits two `property.changed` events — first clearing the old source (`""`), then setting the new one.
- **File upload/download:** Warp grids, blend masks, and black-level masks are transferred via HTTP POST/GET to `/api/.../file/transfer` endpoints (separate from the JSON-RPC TCP channel). Blend/black-level masks are grayscale (8 or 16-bit); PNG/JPEG/TIFF accepted; color images use only the blue channel. Mask resolution must match projector resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540). Warp file format is shared with MCM500/400.
- **Source/connector object naming:** Translate a display name to an object name by removing all non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
- **ECO wake:** Requires Wake-on-LAN (MAC address), physical power button (remote/keypad), or the special serial ASCII sequence `:POWR1\r`.
- **Authentication:** Optional passcode auth elevates access level; normal end-user access skips auth. Actual passcode value not in source.
<!-- UNRESOLVED: firmware version compatibility not stated. Authentication passcode value not stated. Exact connector/source set varies by model configuration. Voltage/current/power specs not in this document. -->
````

Spec generated. TCP 9090 + RS-232 19200/8/N/1. ~40 actions covering power, property framework, sources, illumination/laser, picture settings, warp/blend/blacklevel, optics, DMX, environment, firmware. Auth = optional passcode. All gaps marked `UNRESOLVED`.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:04:51.192Z
last_checked_at: 2026-08-05T08:07:35.763Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:07:35.763Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions map verbatim to JSON-RPC methods documented in the Pulse API source; transport parameters (port 9090, RS232 19200/8/N/1) and passcode auth are supported. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Exact model variant connector set varies by configuration (source notes API is dynamic). Authentication secret/passcode value not stated (example uses a placeholder)."
- "actual passcode value not stated in source (example uses code 98765)."
- "dynamic min per minpower property"
- "dynamic max per maxpower property"
- "no explicit multi-step sequences documented as named macros in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated. Authentication passcode value not stated. Exact connector/source set varies by model configuration. Voltage/current/power specs not in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
