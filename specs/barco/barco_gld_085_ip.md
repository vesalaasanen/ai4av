---
spec_id: admin/barco-gld-085
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco GLD 085 Control Spec"
manufacturer: Barco
model_family: "Barco GLD 085"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco GLD 085"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:14:09.436Z
last_checked_at: 2026-10-07T13:18:41.426Z
generated_at: 2026-10-07T13:18:41.426Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device electrical specs (laser power output, lumens, voltage) not stated in this API source."
  - "firmware version compatibility not stated in source."
  - "API is described as dynamic / config-dependent; exact property set varies per device configuration."
  - "no documented macro sequences; remove if not applicable."
  - "source contains no formal safety interlock procedures, power-on"
  - "voltage/current/power electrical specs not stated in source."
  - "protocol/API version number not stated in source."
  - "error/fault recovery sequences beyond JSON-RPC error member not detailed."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:41.426Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 action units match source Pulse API methods and properties; transport supported; no unrepresented source commands found. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco GLD 085 Control Spec

## Summary
Barco GLD 085 is a Pulse-based laser projector controlled via a JSON-RPC 2.0 API ("Pulse API"). The projector exposes Pulse services over TCP/IP (port 9090) and over an RS-232 serial link. This spec covers power, source selection, illumination/laser power, picture settings, warp/blend/black-level file management, optics, environment monitoring, DMX, and firmware methods documented in the Pulse API catalog.

<!-- UNRESOLVED: device electrical specs (laser power output, lumens, voltage) not stated in this API source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: API is described as dynamic / config-dependent; exact property set varies per device configuration. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # "The service is available on port number 9090."
  base_url: "http://{projector_ip}/api"  # HTTP file endpoints for warp/blend/blacklevel uploads
serial:
  baud_rate: 19200  # RS232 Communication Parameters table
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # documented `authenticate` method with secret pass code; "only necessary when a higher level than normal end user is required. For normal end user access the authentication can be skipped."
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff methods
  - routable     # inferred from source selection (image.window.main.source)
  - queryable    # inferred from property.get methods and environment monitoring
  - levelable    # inferred from brightness/contrast/laser power settable properties
```

## Actions
```yaml
# All JSON-RPC payloads are JSON-RPC 2.0. `command` holds the canonical request
# object verbatim from the source. Parameterized actions show the variable part.
# Continuous settable properties (image.brightness, laser power, etc.) are
# enumerated here as property.set actions; see also Variables.

# ---- Core RPC framework methods ----
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code setting the user access level (source example uses 98765).
  notes: Required only for higher-than-end-user access level; skippable for normal end user.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Object.property name in dot notation.
    - name: value
      type: any
      description: Value to set (type depends on property).

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Object.property name in dot notation.

- id: property_subscribe
  label: Subscribe To Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names.

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names.

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated) or array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names.

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty = everything).
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed (default true).

# ---- System / power ----
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: If already on or transitioning, nothing happens. Verify state is standby/ready first.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: If already off or transitioning, nothing happens. Verify state is on first.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII wake command sent on the RS232 serial port to wake a projector in ECO mode. Alternatives include Wake-on-LAN, IR remote power button, keypad power button.

# ---- LED control ----
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (source example: systemstatus).
    - name: color
      type: string
      description: LED color (source example: red).
    - name: period
      type: integer
      description: Blink period (source example: 42).

# ---- Source / connector methods ----
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
  notes: Returns array of source names; contents vary by projector model (source example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []
  notes: Returns array of physical connector names (source example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI).

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors","id":4}'
  params:
    - name: sourceobject
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. DisplayPort 1 -> displayport1).
  notes: Returns array of connector info (name + grid position).

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. DisplayPort 1, HDMI).
  notes: Source switch produces two property.changed notifications (deselect old, select new).

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

# ---- Illumination ----
- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []
  notes: Returns "On" or "Off".

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []
  notes: Read-only; dynamic value.

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []
  notes: Read-only; dynamic value. May be affected by lens type/position.

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}},"id":5}'
  params:
    - name: power
      type: float
      description: Target laser power in percent.

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
  notes: Returns string value.

# ---- Picture settings ----
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{brightness}},"id":9}'
  params:
    - name: brightness
      type: float
      description: Normalized brightness/offset. Min -1, max 1, default 0 (1 = 100% offset), precision 0.01.

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{contrast}},"id":{id}}'
  params:
    - name: contrast
      type: float
      description: Normalized contrast/gain. Min 0, max 2, default 1, precision 0.01.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{gamma}},"id":{id}}'
  params:
    - name: gamma
      type: float
      description: Image gamma. Min 1, max 3, default 2.2, precision 0.1.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{saturation}},"id":{id}}'
  params:
    - name: saturation
      type: float
      description: Normalized saturation. Min 0, max 2, default 1, precision 0.01.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{sharpness}},"id":{id}}'
  params:
    - name: sharpness
      type: integer
      description: Normalized sharpness. Min -2, max 8, step 1.

# ---- Warp ----
- id: set_warp_enable
  label: Set Warp Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enable}},"id":10}'
  params:
    - name: enable
      type: boolean
      description: Globally enable/disable all warp functions.

- id: set_warp_file_enable
  label: Set Warp File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enable}},"id":12}'
  params:
    - name: enable
      type: boolean
      description: Enable/disable file warp.

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
  params:
    - name: filename
      type: string
      description: Uploaded warp grid file name (e.g. warp.xml). Format matches MCM500/400.

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file path.
    - name: projector_ip
      type: string
      description: Projector IP address.
  notes: HTTP multipart upload to file endpoint.

# ---- Blend ----
- id: set_blend_file_enable
  label: Set Blend File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enable}},"id":14}'
  params:
    - name: enable
      type: boolean

- id: set_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
  params:
    - name: filename
      type: string
      description: Uploaded blend mask file name (e.g. mask.png). Supported formats PNG (up to 16 bit), JPEG, TIFF; grayscale only (blue channel used if color).

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask path.
    - name: projector_ip
      type: string
  notes: Mask resolution must match projector (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).

# ---- Black level ----
- id: set_blacklevel_file_enable
  label: Set Black Level File Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enable}},"id":16}'
  params:
    - name: enable
      type: boolean

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
  params:
    - name: filename
      type: string
      description: Uploaded black level mask file name (e.g. blacklevel.png).

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask path.
    - name: projector_ip
      type: string
  notes: Mask resolution must match projector (see blend mask table).

# ---- Optics ----
- id: get_optics_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":{id}}'
  params: []
  notes: Returns "Open" or "Closed".

- id: set_optics_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"},"id":{id}}'
  params:
    - name: target
      type: string
      description: '"Open" or "Closed".'

- id: get_optics_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":{id}}'
  params: []

- id: get_optics_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":{id}}'
  params: []

- id: get_optics_lensshift_horizontal
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":{id}}'
  params: []

- id: get_optics_lensshift_vertical
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":{id}}'
  params: []

# ---- Color management ----
- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
  notes: Reset preset back to default values.

- id: color_p7_custom_resettonative
  label: Reset Color To Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycle to next RGB mode.

# ---- Environment ----
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.'
    - name: valuetype
      type: string
      description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.'
  notes: Returns dictionary of sensor-name -> reading (e.g. temperatures, fan tachos).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm objects {severity, timestamp, source, description, custommessage}.

- id: get_environment_alarmstate
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":{id}}'
  params: []
  notes: 'Returns enum: Fatal, Error, Alert, Warning, Ok.'

# ---- DMX ----
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns array of available channel names. Basic mode exposes 2 channels; extended mode exposes more.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns array of mode name strings.

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: string
      description: Mode name from dmx.listmodes.

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{startchannel}},"id":{id}}'
  params:
    - name: startchannel
      type: integer
      description: DMX start channel, range 1..512.

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{shutdown}},"id":{id}}'
  params:
    - name: shutdown
      type: boolean
      description: Shutdown enabled or not.

# ---- System state management ----
- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []
  notes: 'Returns enum: boot, eco, standby, ready, conditioning, on, deconditioning, service, error.'

- id: set_standby_enable
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enable}},"id":{id}}'
  params:
    - name: enable
      type: boolean
      description: Enable/disable use of standby state. Check availability first.

- id: set_eco_enable
  label: Set ECO Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enable}},"id":{id}}'
  params:
    - name: enable
      type: boolean
      description: Enable/disable use of ECO state. Check availability first.

# ---- Network ----
- id: get_network_ip4config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":{id}}'
  params: []
  notes: Returns {Address, Mask, Gateway, NameServers} (all strings).

- id: get_network_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":{id}}'
  params: []
  notes: 'Returns enum: CONNECTED, DISCONNECTED.'

# ---- Connector signal ----
- id: get_connector_detectedsignal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorobject}.detectedsignal"},"id":5}'
  params:
    - name: connectorobject
      type: string
      description: Connector object name (e.g. displayport1, l1hdmi).
  notes: Returns signal info object {active, name, resolutions, timings, color_space, gamma_type, etc.}; disregard if active is false.

# ---- Firmware ----
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns array of managed firmware component name strings.

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns array of {name, versions:{available, running}, status}. Status enum: Unknown, OK, Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Force a component upgrade at the following reboot.

# ---- Image orientation (documented property) ----
- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"},"id":{id}}'
  params:
    - name: orientation
      type: string
      description: 'Enum: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR.'

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}" ]},"id":{id}}'
  params:
    - name: property1
      type: string
      description: First Object.property name in dot notation.
    - name: property2
      type: string
      description: Second Object.property name in dot notation.

- id: get_image_window_position
  label: Get Image Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"},"id":{id}}'
  params: []

- id: get_image_window_size
  label: Get Image Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"},"id":{id}}'
  params: []

- id: get_image_window_scalingmode
  label: Get Image Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"},"id":{id}}'
  params: []
  notes: 'Returns enum: "Fill", "OneToOne", "FillScreen", "Stretch".'
```

## Feedbacks
```yaml
# Observable states / query responses. The device pushes unsolicited
# property.changed and signal.callback notifications (see Events); these
# feedback entries enumerate the documented state values.

- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  source: system.state property
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  source: illumination.state property
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source: environment.alarmstate property
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":{id}}'

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source: network.device.lan.state property
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":{id}}'

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  source: optics.shutter.position property
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":{id}}'

- id: active_source
  type: string
  source: image.window.main.source property (e.g. DisplayPort 1, HDMI)
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'

- id: laser_power
  type: float
  source: illumination.sources.laser.power (percent)
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
```

## Variables
```yaml
# Settable scalar parameters surfaced as distinct property.set targets.
# (Action counterparts also emitted above for implementability; ranges from source.)

- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  default: 0
  precision: 0.01
  step_size: 1
  description: Normalized brightness/offset (1 = 100% offset).

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01
  step_size: 1
  description: Normalized contrast/gain.

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  default: 2.2
  precision: 0.1
  step_size: 1

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01
  step_size: 1

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  unit: percent
  access: read_write
  description: Target laser power in percent.

- id: laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  unit: percent
  access: read_only
  description: Dynamic minimum power.

- id: laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  unit: percent
  access: read_only
  description: Dynamic maximum power (may depend on lens type/position).

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
```

## Events
```yaml
# Unsolicited JSON-RPC notifications the projector pushes to the client.
# Notification messages have no id and must not be answered.

- id: property_changed
  method: property.changed
  description: Pushed when a subscribed property value changes. params.property is an array of {name: value} pairs.
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  method: signal.callback
  description: Pushed when a subscribed signal is emitted. params.signal is an array of {signalname: argobject} pairs.
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'

- id: modelupdated_signal
  method: modelupdated  # via signal.callback
  description: Triggered when the object structure changes (objects added/removed). Subscribe via signal.subscribe to "modelupdated".

- id: objectchanged_signal
  method: introspect.objectchanged  # via signal.callback
  description: Pushed on object add/remove; args {object: string, isnew: bool}.

- id: source_change_notification
  method: property.changed
  description: Two notifications delivered on source switch - first deselected (value ""), then new source selected.
```

## Macros
```yaml
# Source does not document explicit multi-step named macros.
# UNRESOLVED: no documented macro sequences; remove if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on_guard: "Good practice to verify system.state is standby or ready before issuing system.poweron; if already on or transitioning, nothing happens."
  - power_off_guard: "Good practice to verify system.state is on before issuing system.poweroff; if already off or transitioning, nothing happens."
# UNRESOLVED: source contains no formal safety interlock procedures, power-on
# sequencing interlocks, or hard safety warnings beyond operational best-practice
# notes. No thermal/laser safety interlock values stated.
```

## Notes
- The API is **dynamic and configuration-dependent**. The source explicitly warns that properties/methods vary by projector model and fitted peripherals (e.g. a non-motorized lens omits zoom API; DMX extended mode exposes more channels). The authoritative API surface is obtained at runtime via `introspect`.
- **Authentication** uses an `authenticate` JSON-RPC method carrying a secret `code` (source example: `98765`) to raise the access level. It is optional for normal end-user access.
- **Subscriptions** do not return the current value — use `property.get` to read the current value, then `property.subscribe` for change notifications.
- **Best practice:** wait for the `property.set` confirmation before setting the same property again; flooding the server degrades performance.
- **Source switching** emits two `property.changed` events (deselect then select).
- **ECO wake** over serial uses ASCII `:POWR1\r`; alternatives are Wake-on-LAN (MAC address), IR remote, or keypad power button.
- **File endpoints** (warp/blend/black-level) use HTTP multipart POST to `/api/...` paths; download is via plain HTTP GET of the constructed URL.
- Warp file format is the same as on Barco MCM500/400.
- Source name -> object name translation: strip non-word chars and lowercase (e.g. `DisplayPort 1` -> `displayport1`).
<!-- UNRESOLVED: voltage/current/power electrical specs not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol/API version number not stated in source. -->
<!-- UNRESOLVED: error/fault recovery sequences beyond JSON-RPC error member not detailed. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:14:09.436Z
last_checked_at: 2026-10-07T13:18:41.426Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:41.426Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 action units match source Pulse API methods and properties; transport supported; no unrepresented source commands found. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device electrical specs (laser power output, lumens, voltage) not stated in this API source."
- "firmware version compatibility not stated in source."
- "API is described as dynamic / config-dependent; exact property set varies per device configuration."
- "no documented macro sequences; remove if not applicable."
- "source contains no formal safety interlock procedures, power-on"
- "voltage/current/power electrical specs not stated in source."
- "protocol/API version number not stated in source."
- "error/fault recovery sequences beyond JSON-RPC error member not detailed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
