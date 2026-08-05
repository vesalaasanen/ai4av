---
spec_id: admin/barco-86-medical-consultation-center
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 86 Medical Consultation Center Control Spec"
manufacturer: Barco
model_family: "Barco 86 Medical Consultation Center"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 86 Medical Consultation Center"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:08:12.194Z
last_checked_at: 2026-07-21T20:50:27.361Z
generated_at: 2026-07-21T20:50:27.361Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the generic Barco \"Pulse API\" guide, not a device-specific 86 Medical Consultation Center manual. Confirm exact model exposes full Pulse API surface via introspection."
  - "HTTP file-transfer port not stated in source (examples show curl to bare IP)."
  - "authentication pass-code format/value not stated (only that elevated access requires a code)."
  - "HTTP file-endpoint base port not stated in source; example URL http://192.168.1.100/api/... implies port 80 but is not declared"
  - "allowed preset values not enumerated in source."
  - "allowed modes not enumerated in source (use dmx.listmodes)."
  - "source does not enumerate which component name parameter (if any) this method takes.\""
  - "source does not enumerate a fixed event catalogue beyond the"
  - "source documents no named multi-step macro sequences."
  - "no formal safety interlocks, lamp/laser exposure warnings, or"
  - "device-specific subset of Pulse API for the 86 Medical Consultation Center not confirmed in source."
  - "authentication credential format/provisioning not documented (only an example numeric code)."
  - "HTTP port for /api file endpoints not stated."
  - "enumeration of valid DMX modes, color preset names, and RGB modes not given — must be discovered at runtime via list/describe methods."
  - "firmware.schedulecomponentupgrade parameter signature not documented."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:50:27.361Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 spec actions matched literally in source; all transport parameters verified; bidirectional coverage achieved. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-18
---

# Barco 86 Medical Consultation Center Control Spec

## Summary
Barco Pulse-family projector controlled via JSON-RPC 2.0. Service reachable over TCP/IP on port 9090 and over RS-232 serial at 19200 baud. API exposes power state, source selection, illumination/laser power, image picture settings, warp/blend/black-level file management, optics (shutter/zoom/focus/lens shift), DMX, environment sensors, and firmware upgrade scheduling. Source describes a generic Pulse projector API; the Barco 86 Medical Consultation Center is presumed to expose this API.

<!-- UNRESOLVED: source document is the generic Barco "Pulse API" guide, not a device-specific 86 Medical Consultation Center manual. Confirm exact model exposes full Pulse API surface via introspection. -->
<!-- UNRESOLVED: HTTP file-transfer port not stated in source (examples show curl to bare IP). -->
<!-- UNRESOLVED: authentication pass-code format/value not stated (only that elevated access requires a code). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  # UNRESOLVED: HTTP file-endpoint base port not stated in source; example URL http://192.168.1.100/api/... implies port 80 but is not declared
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # source: "Authentication is only necessary when a higher level than normal end user is required. For normal end user access the authentication can be skipped."
  notes: "Elevated access requires an authenticate request carrying a numeric code (example code 98765). Credential provisioning not documented."
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff
  - queryable    # inferred from property.get examples
  - routable     # inferred from image.window.main.source selection
  - levelable    # inferred from image.brightness/contrast/gamma/saturation and illumination power
```

## Actions
```yaml
# JSON-RPC 2.0 method calls. Each entry's `command:` is the JSON-RPC request
# payload verbatim from the source. Parameterized methods use a property
# template; per-property variants are listed where the source enumerates them.

# ---- Authentication ----
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765; real value UNRESOLVED - not stated in source)
  notes: "Required only for higher-than-end-user access level. Response: {\"result\":true}."

# ---- System / Power ----
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: "No-op if already on or transitioning. Best practice: verify system.state is standby or ready first."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: "No-op if already off or transitioning. Best practice: verify system.state is on first."

- id: eco_wake_serial
  label: ECO Mode Wake (serial only)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII string sent over RS-232 to wake projector from ECO mode. Alternatives: Wake-on-LAN (MAC address), remote power button, keypad power button."

- id: system_state_get
  label: Query System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []
  notes: "Returns enum: boot, eco, standby, ready, conditioning, on, deconditioning, service, error."

- id: system_standby_enable_set
  label: Set Standby State Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: Enable/disable use of standby state.

- id: system_eco_enable_set
  label: Set ECO State Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: Enable/disable use of ECO state.

# ---- Generic property / signal / introspect primitives ----
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{objectname.propertyname}","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.
    - name: value
      type: any
      description: New value (type per property).
  notes: "Wait for confirmation before re-setting same property to avoid flooding server."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{objectname.propertyname}"},"id":4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string|array
      description: Single property path or array of paths.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string|array

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string|array

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string|array

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything.
    - name: recursive
      type: boolean
      description: Default true. False lists only one level of object names.

# ---- Illumination ----
- id: illumination_state_get
  label: Query Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []
  notes: "Returns On or Off."

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent.

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: illumination_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: illumination_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: "Engages CLO at the current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# ---- Sources / Connectors ----
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
  notes: "Returns array of source names (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors","id":4}'
  params:
    - name: sourcename
      type: string
      description: "Source name with non-word chars removed, lowercased (e.g. 'displayport1')."
  notes: "Example: image.source.displayport1.listconnectors returns array of {gridposition, name}."

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list.

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"},"id":5}'
  params:
    - name: connectorname
      type: string
      description: "Connector name lowercased (e.g. displayport1, l1hdmi)."

# ---- Picture settings ----
- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: "Normalized offset, min -1, max 1, precision 0.01. 0 = default."

- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: "Normalized gain, min 0, max 2, precision 0.01. 1 = default."

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":1}'
  params:
    - name: value
      type: float
      description: "Min 1, max 3, precision 0.1. Default 2.2."

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: "Min 0, max 2, precision 0.01. 1 = default."

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: "Min -2, max 8, step 1."

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":1}'
  params:
    - name: value
      type: enum
      description: "One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR."

- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":1}'
  params:
    - name: value
      type: object
      description: "{x:int, y:int}."

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}},"id":1}'
  params:
    - name: value
      type: object
      description: "{width:int, height:int}."

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":1}'
  params:
    - name: value
      type: enum
      description: "One of Fill, OneToOne, FillScreen, Stretch."

# ---- Color management (methods only - params UNRESOLVED) ----
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string
      description: Preset name. UNRESOLVED: allowed preset values not enumerated in source.

- id: image_color_p7_custom_resetpreset
  label: Reset Custom Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Custom Color To Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycles through all possible RGB modes."

# ---- Warp ----
- id: warp_enable_set
  label: Set Global Warp Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: warp_file_enable_set
  label: Set Warp File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST to /api/image/processing/warp/file/transfer.

- id: warp_file_upload
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector-address}/api/image/processing/warp/file/transfer'
  params:
    - name: projector-address
      type: string
      description: Projector IP (e.g. 192.168.1.100).
  notes: "Warp file format same as MCM500/400."

# ---- Blend ----
- id: blend_file_enable_set
  label: Set Blend File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: blend_file_selected_set
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string|array
      description: "Source lists as [string]; single string also accepted. Filename previously uploaded via HTTP POST to /api/image/processing/blend/file/transfer."

- id: blend_file_upload
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector-address}/api/image/processing/blend/file/transfer'
  params:
    - name: projector-address
      type: string
  notes: "Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size per projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Color images use blue channel only."

# ---- Black level ----
- id: blacklevel_file_enable_set
  label: Set Black Level File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string

- id: blacklevel_file_upload
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector-address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector-address
      type: string
  notes: "Same format/size rules as blend masks."

# ---- Optics ----
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":1}'
  params: []
  notes: "Returns Open or Closed."

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"},"id":1}'
  params:
    - name: value
      type: enum
      description: "Open or Closed."

- id: optics_zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0},"id":1}'
  params:
    - name: value
      type: integer

- id: optics_focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0},"id":1}'
  params:
    - name: value
      type: integer

- id: optics_lensshift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0},"id":1}'
  params:
    - name: value
      type: integer

- id: optics_lensshift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0},"id":1}'
  params:
    - name: value
      type: integer

# ---- DMX ----
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""},"id":1}'
  params:
    - name: value
      type: string
      description: Mode name. UNRESOLVED: allowed modes not enumerated in source (use dmx.listmodes).

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":1}'
  params:
    - name: value
      type: integer
      description: "1..512."

- id: dmx_shutdown_set
  label: Set DMX Shutdown Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false},"id":1}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: "Returns array of available channel names for current mode."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: "Returns array of all DMX mode names."

# ---- Network ----
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":1}'
  params: []
  notes: "Returns {Address, Mask, Gateway, NameServers}."

- id: network_device_lan_state_get
  label: Get LAN Device State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":1}'
  params: []
  notes: "Returns CONNECTED or DISCONNECTED."

# ---- Environment ----
- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: enum
      description: "Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: enum
      description: "Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."
  notes: "Returns dictionary of sensor-name -> reading. Examples in source: temperatures (laser board banks/heatsinks, cyclon5, imx6, inlet, mainboard, mainpower, outlet, scalerfpga) and fan tachos (ar1..ar5, driver, optics, pcb, phosphorleft/right, psu)."

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":1}'
  params: []
  notes: "Returns Fatal, Error, Alert, Warning, or Ok."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity, timestamp, source, description, custommessage}."

# ---- Firmware ----
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: "Returns array of managed firmware component names."

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns array of {name, versions:{available, running}, status}. status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Forces a component upgrade at next reboot. UNRESOLVED: source does not enumerate which component name parameter (if any) this method takes."
```

## Feedbacks
```yaml
# Unsolicited JSON-RPC notifications from projector (no id field, no response expected).
- id: property_changed
  type: notification
  method: property.changed
  payload_shape: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":100}]}}'
  description: "Array of property/value pairs. Client must implement this handler to receive subscription notifications. Example on source switch: emits {\"image.window.main.source\":\"\"} then {\"image.window.main.source\":\"DisplayPort 2\"}."

- id: signal_callback
  type: notification
  method: signal.callback
  payload_shape: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'
  description: "Array of signal/argument-list pairs. Client must implement this handler."

- id: modelupdated_signal
  type: signal
  name: modelupdated
  description: "Triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe."
```

## Variables
```yaml
# Settable properties (driven via property.set) treated as continuous variables.
- id: system_state
  property: system.state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  access: RO

- id: illumination_state
  property: illumination.state
  type: enum
  values: ["On", "Off"]
  access: RO

- id: illumination_laser_power
  property: illumination.sources.laser.power
  type: float
  unit: percent
  access: RW

- id: illumination_laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  unit: percent
  access: RO

- id: illumination_laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  unit: percent
  access: RO

- id: image_window_main_source
  property: image.window.main.source
  type: string
  access: RW

- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  access: RW

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: RW

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  access: RW
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: RW

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  access: RW

- id: image_orientation
  property: image.orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  access: RW

- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  access: RW

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: RW

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: RW

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: RW

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: RW

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  access: RW

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: RW

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: RW

- id: dmx_mode
  property: dmx.mode
  type: string
  access: RW

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
  access: RW

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: RW

- id: network_device_lan_state
  property: network.device.lan.state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  access: RO

- id: optics_shutter_position
  property: optics.shutter.position
  type: enum
  values: ["Open", "Closed"]
  access: RO

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values: ["Open", "Closed"]
  access: RW

- id: optics_zoom_position
  property: optics.zoom.position
  type: integer
  access: RW

- id: optics_focus_position
  property: optics.focus.position
  type: integer
  access: RW

- id: optics_lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer
  access: RW

- id: optics_lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer
  access: RW

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  access: RW

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: RW

- id: environment_alarmstate
  property: environment.alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  access: RO
```

## Events
```yaml
# See Feedbacks section - property.changed and signal.callback are the two
# unsolicited notification channels. No additional discrete events documented.
# UNRESOLVED: source does not enumerate a fixed event catalogue beyond the
# generic property/signal subscription mechanism.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (not formal interlocks, but operational cautions):
# - system.poweron is a no-op unless state is standby or ready; verify before issuing.
# - system.poweroff is a no-op unless state is on; verify before issuing.
# - Best practice: wait for property.set confirmation before re-setting the same
#   property (flooding the server degrades performance).
# - ECO-mode wake requires Wake-on-LAN, IR/keypad power button, or the serial
#   :POWR1\r sequence - system.poweron may not be sufficient.
# UNRESOLVED: no formal safety interlocks, lamp/laser exposure warnings, or
# power-sequencing requirements stated in source.
```

## Notes
- Source is the generic Barco "Pulse API" reference, not a device-specific 86 Medical Consultation Center document. The API surface is dynamic — many objects (lens motors, DMX extended channels, color management presets) depend on the specific projector configuration. The authoritative API for any individual unit is obtained via the `introspect` method.
- Object/member naming uses JavaScript-like dot notation in lowercase (e.g. `tempctrl.fans.mainfan.rpm`). Source names map to object names by stripping non-word characters and lowercasing (`DisplayPort 1` → `displayport1`).
- JSON-RPC parameters are passed by name; order does not matter.
- All requests use `"jsonrpc":"2.0"` and an integer or string `id`. Notifications (server → client) carry no `id` and require no response.
- HTTP file-transfer endpoints share the base path `/api/...` and use HTTP POST with multipart form field `file=@<path>` (curl-style). PNG (up to 16-bit), JPEG, and TIFF accepted for mask uploads; grayscale only — color images use the blue channel.
- Warp grid file format is identical to MCM500/400.
- API introspection returns metadata describing methods/properties/signals/objects, restricted to the client's authenticated access level. Useful for building OSD menus or dynamic control surfaces.
<!-- UNRESOLVED: device-specific subset of Pulse API for the 86 Medical Consultation Center not confirmed in source. -->
<!-- UNRESOLVED: authentication credential format/provisioning not documented (only an example numeric code). -->
<!-- UNRESOLVED: HTTP port for /api file endpoints not stated. -->
<!-- UNRESOLVED: enumeration of valid DMX modes, color preset names, and RGB modes not given — must be discovered at runtime via list/describe methods. -->
<!-- UNRESOLVED: firmware.schedulecomponentupgrade parameter signature not documented. -->
```

Spec emitted above. Caveman mode stays on.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:08:12.194Z
last_checked_at: 2026-07-21T20:50:27.361Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:50:27.361Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 spec actions matched literally in source; all transport parameters verified; bidirectional coverage achieved. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the generic Barco \"Pulse API\" guide, not a device-specific 86 Medical Consultation Center manual. Confirm exact model exposes full Pulse API surface via introspection."
- "HTTP file-transfer port not stated in source (examples show curl to bare IP)."
- "authentication pass-code format/value not stated (only that elevated access requires a code)."
- "HTTP file-endpoint base port not stated in source; example URL http://192.168.1.100/api/... implies port 80 but is not declared"
- "allowed preset values not enumerated in source."
- "allowed modes not enumerated in source (use dmx.listmodes)."
- "source does not enumerate which component name parameter (if any) this method takes.\""
- "source does not enumerate a fixed event catalogue beyond the"
- "source documents no named multi-step macro sequences."
- "no formal safety interlocks, lamp/laser exposure warnings, or"
- "device-specific subset of Pulse API for the 86 Medical Consultation Center not confirmed in source."
- "authentication credential format/provisioning not documented (only an example numeric code)."
- "HTTP port for /api file endpoints not stated."
- "enumeration of valid DMX modes, color preset names, and RGB modes not given — must be discovered at runtime via list/describe methods."
- "firmware.schedulecomponentupgrade parameter signature not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
