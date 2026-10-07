---
spec_id: admin/barco-fs400-n4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fs400 N4K Control Spec"
manufacturer: Barco
model_family: "Fs400 N4K"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Fs400 N4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:17:22.637Z
last_checked_at: 2026-10-07T20:33:33.788Z
generated_at: 2026-10-07T20:33:33.788Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact source/connector set per model varies; full API is dynamic and must be discovered via introspect on the real device. Firmware version compatibility not stated. Auth secret pass-code format not specified beyond an example."
  - "real pass-code value/format not stated in source. Skippable for normal end-user access."
  - "component-name parameter not shown in source"
  - "no explicit multi-step named macros documented as sequences; source only"
  - "source contains no explicit interlock procedures, power-sequencing lockouts,"
  - "real auth pass-code value/format (only example 98765 shown). Firmware version compatibility ranges not stated. Laser power min/max are dynamic and only exemplified (0/100). Full per-model source/connector list must be read from the device. No voltage/current/power specs in this control document. firmware.schedulecomponentupgrade params not shown."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:33.788Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 action units match source methods, curl endpoints and :POWR1 wake; transport (9090, 19200 8N1) confirmed; the source is generic Pulse API. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Fs400 N4K Control Spec

## Summary
Barco Pulse-family projector (Fs400 N4K) controlled via the Pulse JSON-RPC 2.0 API. Control interface is available over TCP/IP (port 9090) and over a serial RS-232C cable; identical command set on both transports. Covers power, source selection, illumination (laser) power, picture settings, optics, warp/blend/black-level file handling, DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: exact source/connector set per model varies; full API is dynamic and must be discovered via introspect on the real device. Firmware version compatibility not stated. Auth secret pass-code format not specified beyond an example. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  # base_url for file endpoints: http://<projector-ip>/api  (used for warp/blend/blacklevel uploads and downloads)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Pinout: 9-pin female to host, 9-pin male to projector; pin2-pin2, pin3-pin3, pin5-pin5
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: normal end-user access requires no auth; higher access levels require a secret pass-code via the `authenticate` method)
```

## Traits
```yaml
traits:
  - powerable      # inferred: system.poweron / system.poweroff present
  - queryable      # inferred: property.get / image.source.list / environment.getcontrolblocks etc.
  - routable       # inferred: image.window.main.source selection present
  - levelable      # inferred: brightness/contrast/laser-power set present
```

## Actions
```yaml
# All requests are JSON-RPC 2.0 over the chosen transport. `id` is a client-chosen
# request identifier (string|number); omitted from templates for brevity. Order of
# named params does not matter. Methods return `result`; errors carry an `error` member.

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: Returns result null (not an error). If already on or in transition, nothing happens. Verify system.state is standby/ready first.

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: Returns result null. If already off or in transition, nothing happens. Verify system.state is on first.

- id: eco_wake_serial
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII characters sent on the RS-232 serial port to wake a projector in ECO mode. ECO wake may also be done via Wake-on-LAN (MAC address), remote, or keypad.

- id: authenticate
  label: Authenticate (raise access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass-code. Sets the user access level.
  notes: Example code 98765 shown only as illustration. # UNRESOLVED: real pass-code value/format not stated in source. Skippable for normal end-user access.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. image.window.main.source).
    - name: value
      type: any
      description: Value matching the property type (string|integer|float|boolean|object|array).
  notes: Wait for confirmation before setting the same property again (avoids flooding).

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path, or array of paths.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path, or array of paths.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated), or array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of signal names.

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything.
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level). Default true.
  notes: Returns metadata of methods/properties/signals restricted by access level. Also accepts positional params form ["{object}", {recursive}].

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: Returns array of source-name strings; contents vary by projector model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
  params:
    - name: name
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. "DisplayPort 1" -> "displayport1").
  notes: Returns array of {gridposition:{row,column,plane}, name}.

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor type. Values Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: Value type. Values Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode.
  notes: Returns dictionary of sensor-name -> reading.

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus).
    - name: color
      type: string
      description: Color (e.g. red).
    - name: period
      type: integer
      description: Blink period.

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns array of channel-name strings.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns array of mode-name strings.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns array of managed firmware component names.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns array of {name, versions:{available, running}, status}. status values Unknown, OK, Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []  # UNRESOLVED: component-name parameter not shown in source
  notes: Forces a component upgrade at the following reboot.

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages Constant Light Output at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: Returns string serial number.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset.

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode.

- id: upload_warp_grid
  label: Upload Warp Grid
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params: []
  notes: Uploads a warp grid file by HTTP POST. The source says -X POST can be omitted when using -F.

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params: []
  notes: Uploads a blend mask by HTTP POST.

- id: upload_black_level_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/ transfer'
  params: []
  notes: Uploads a black level mask by HTTP POST. The source example includes a space before transfer.
```

## Feedbacks
```yaml
# Observable/read state via property.get or subscriptions. Enum-typed states:

- id: system_state
  property: system.state
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  description: Current operation state of the unit.

- id: illumination_state
  property: illumination.state
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  type: enum
  values: [On, Off]

- id: environment_alarmstate
  property: environment.alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_device_lan_state
  property: network.device.lan.state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  property: optics.shutter.position
  type: enum
  values: [Open, Closed]

- id: optics_zoom_position
  property: optics.zoom.position
  type: integer
  description: Current zoom position.

- id: optics_focus_position
  property: optics.focus.position
  type: integer

- id: optics_lensshift_horizontal_position
  property: optics.lensshift.horizontal.position
  type: integer

- id: optics_lensshift_vertical_position
  property: optics.lensshift.vertical.position
  type: integer

- id: network_device_lan_ip4config
  property: network.device.lan.ip4config
  type: object
  description: "{Address, Mask, Gateway, NameServers} (strings)."

- id: illumination_sources_laser_minpower
  property: illumination.sources.laser.minpower
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  type: float
  description: Minimum laser power in percent (read-only, dynamic).

- id: illumination_sources_laser_maxpower
  property: illumination.sources.laser.maxpower
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  type: float
  description: Maximum laser power in percent (read-only, dynamic).

- id: connector_detectedsignal
  property: image.connector.{name}.detectedsignal
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{name}.detectedsignal"}}'
  type: object
  description: >
    Signal info for connector object name (e.g. displayport1, l1hdmi). Object fields:
    active(bool), name(string), vertical_total, horizontal_total, vertical_resolution,
    horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch,
    horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency,
    vertical_frequency, pixel_rate, scan(enum), bits_per_component, color_space(enum),
    signal_range(enum: 0-255,16-235), chroma_sampling(enum: 4:4:4,4:2:2,4:2:0),
    gamma_type(enum: POWER,sRGB,REC_BT1886,SMPTE_ST2084), color_primaries(enum:
    REC709,REC2020,DCI-P3-D65,DCI-P3-Theater), mastering_luminance(float),
    content_aspect_ratio(enum), is_stereo(bool), stereo_mode(enum: None,Sequential,FramePacked,TopBottom,SideBySide).
```

## Variables
```yaml
# Settable properties via property.set. Constraints from source introspection tables.

- id: image_window_main_source
  property: image.window.main.source
  type: string
  description: Source displayed in main window. Values come from image.source.list (e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: illumination_sources_laser_power
  property: illumination.sources.laser.power
  type: float
  min: 0    # from example response for minpower
  max: 100  # from example response for maxpower
  unit: percent
  description: Target laser power in percent (read-write). Min/max are dynamic.

- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Normalized brightness/offset; 0 default, 1 = 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized contrast/gain; 1 default.

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Image gamma; default 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized color saturation; 1 default.

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]

- id: image_processing_warp_enable
  property: image.processing.warp.enable
  type: boolean
  description: Enable/disable all warp functions.

- id: image_processing_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean

- id: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  description: Currently selected warp file (e.g. warp.xml). Upload via HTTP POST /api/image/processing/warp/file/transfer.

- id: image_processing_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean

- id: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  description: Currently selected blend files. Upload via HTTP POST /api/image/processing/blend/file/transfer.

- id: image_processing_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  description: Upload via HTTP POST /api/image/processing/blacklevel/file/transfer.

- id: dmx_mode
  property: dmx.mode
  type: string
  description: Current DMX mode. Basic mode exposes 2 channels; extended mode exposes more.

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  description: Enable/disable standby state; check availability first.

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  description: Enable/disable ECO state; check availability first.

- id: image_window_main_position
  property: image.window.main.position
  type: object
  description: "{x:int, y:int} window position."

- id: image_window_main_size
  property: image.window.main.size
  type: object
  description: "{width:int, height:int} window size."
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; client must not respond).

- id: property_changed
  method: property.changed
  description: Fired on any subscribed property value change. params.property is an array of {objectname.propertyname: value} objects. Note: source-select emits two notifications (deselect old, then select new).

- id: signal_callback
  method: signal.callback
  description: Fired when a subscribed signal is emitted. params.signal is an array of {objectname.signalname: {arg..}} objects.

- id: modelupdated_signal
  method: signal.callback (for signal "modelupdated")
  description: Object structure changed (objects added/removed). Callback carries introspect.objectchanged with {object, newobject(bool)}.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named macros documented as sequences; source only
# describes ad-hoc sequences (e.g. wake-from-ECO, upload-then-select-then-enable warp file).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - practice: Verify system.state is standby or ready before issuing system.poweron (command is a no-op otherwise or during transitions).
  - practice: Verify system.state is on before issuing system.poweroff (no-op otherwise).
  - practice: Wait for property.set confirmation before setting the same property again (avoids server flooding / performance loss).
# UNRESOLVED: source contains no explicit interlock procedures, power-sequencing lockouts,
# or hard safety warnings beyond the operational notes above. No voltage/current/power
# values documented in the control section.
```

## Notes
- API is JSON-RPC 2.0; identical over TCP (port 9090) and RS-232. Named params, order-independent.
- API is partly dynamic: availability of objects/methods depends on peripherals and configuration (e.g. motorized zoom lens, DMX extended mode). Discover exact API via `introspect`.
- File transfers (warp grids, blend masks, black-level masks) use HTTP, not JSON-RPC: upload via `curl -F file=@<file> http://<ip>/api/<endpoint>`, download via GET on the same URL. Supported image formats PNG (up to 16-bit), JPEG, TIFF; grayscale only (color images use blue channel).
- Warp file format identical to MCM500/400.
- Blend/black-level mask resolution must match projector resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).
- ECO-mode wake options: Wake-on-LAN (MAC), remote, keypad, or RS-232 ASCII `:POWR1\r`.

<!-- UNRESOLVED: real auth pass-code value/format (only example 98765 shown). Firmware version compatibility ranges not stated. Laser power min/max are dynamic and only exemplified (0/100). Full per-model source/connector list must be read from the device. No voltage/current/power specs in this control document. firmware.schedulecomponentupgrade params not shown. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:17:22.637Z
last_checked_at: 2026-10-07T20:33:33.788Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:33.788Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 action units match source methods, curl endpoints and :POWR1 wake; transport (9090, 19200 8N1) confirmed; the source is generic Pulse API. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact source/connector set per model varies; full API is dynamic and must be discovered via introspect on the real device. Firmware version compatibility not stated. Auth secret pass-code format not specified beyond an example."
- "real pass-code value/format not stated in source. Skippable for normal end-user access."
- "component-name parameter not shown in source"
- "no explicit multi-step named macros documented as sequences; source only"
- "source contains no explicit interlock procedures, power-sequencing lockouts,"
- "real auth pass-code value/format (only example 98765 shown). Firmware version compatibility ranges not stated. Laser power min/max are dynamic and only exemplified (0/100). Full per-model source/connector list must be read from the device. No voltage/current/power specs in this control document. firmware.schedulecomponentupgrade params not shown."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
