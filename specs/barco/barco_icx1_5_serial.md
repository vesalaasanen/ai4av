---
spec_id: admin/barco-icx1-5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Icx1 5 Control Spec"
manufacturer: Barco
model_family: "Barco Icx1 5"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Icx1 5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:09:39.443Z
last_checked_at: 2026-08-19T08:41:04.113Z
generated_at: 2026-08-19T08:41:04.113Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "hardware specs (lumens, resolution, power draw) not in source. firmware version range not stated. exact model variants unknown."
  - "full payload args for modelupdated beyond introspect.objectchanged example"
  - "no explicit safety interlocks, voltage/current hazards, or power-sequencing warnings stated beyond operational notes above."
  - "real auth pass code (98765 is example placeholder). firmware version compatibility range. hardware model variants under Icx1 5 family. full field list for image.connector.detectedsignal enums (color_space, signal_range, scan, stereo_mode values partially listed). DMX extended-mode channel list. firmware.schedulecomponentupgrade params. modelupdated full payload schema beyond introspect.objectchanged example."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:41:04.113Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match source JSON-RPC methods/HTTP/serial literals verbatim; all transport parameters (port 9090, 19200/8/N/1) confirmed; source method catalog fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Icx1 5 Control Spec

## Summary
Barco Pulse projector (Icx1 5). Control via Pulse API = JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Same command set both transports. HTTP file endpoints for warp/blend/blacklevel mask upload-download. Laser illumination source.

<!-- UNRESOLVED: hardware specs (lumens, resolution, power draw) not in source. firmware version range not stated. exact model variants unknown. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090                 # TCP Pulse service port (stated)
  base_url: "http://{projector_address}/api/{file_endpoint}"  # HTTP file endpoints (stated)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  wiring: "9-pin male on projector; pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  type: optional  # source: auth only required for higher-than-end-user access; end-user access skips auth
  # authenticate method: {"jsonrpc":"2.0","method":"authenticate","params":{"code":<secret_code>}}
  # example code in source: 98765 (placeholder, real code UNRESOLVED)
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff methods present
  - queryable     # inferred: property.get + many query methods present
  - levelable     # inferred: brightness/contrast/gamma/saturation/power level controls present
  - routable      # inferred: image.window.main.source select + source/connector lists present
```

## Actions
```yaml
# All commands are JSON-RPC 2.0 over TCP (port 9090) or serial. Same payload either transport.
# ECO-wake uses a raw ASCII serial sequence instead of JSON-RPC.

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: "No-op if already on or in transition. Best practice: verify system.state is standby or ready first."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: "No-op if already off or in transition. Best practice: verify system.state is on first."

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "Raw ASCII sent on RS232 port to wake projector from ECO mode. Not JSON-RPC. Alt wake methods: WoL (MAC addr), IR remote power, keypad power."

- id: authenticate
  label: Authenticate (raise access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <secret_code>}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example in source: 98765). Real code UNRESOLVED.
  notes: "Only required for higher-than-end-user access. End-user access skips auth."

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "<objectname.propertyname>", "value": <value>}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (see Variables).
    - name: value
      type: any
      description: Value matching property type.
  notes: "Wait for confirmation before re-setting same property (flood warning in source)."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "<objectname.propertyname>"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or array of names for multi-get.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "<objectname.propertyname>"}}'
  params:
    - name: property
      type: string
      description: Single property name or array of names.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "<objectname.propertyname>"}}'
  params:
    - name: property
      type: string
      description: Single property name or array of names.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "<signalname>"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated) or array of names.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "<signalname>"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names.

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "<name>", "recursive": true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of object names listed.

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
  notes: "Returns array of source names. Varies by projector model. Source names e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []
  notes: "Returns array of physical connector names. Varies by model."

- id: image_source_listconnectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.<sourceobjectname>.listconnectors"}'
  params:
    - name: sourceobjectname
      type: string
      description: Source name lowercased, non-word chars removed (e.g. DisplayPort 1 -> displayport1).
  notes: "Returns array of {gridposition:{row,column,plane}, name}."

- id: select_input
  label: Select Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "<source_name>"}}'
  params:
    - name: source_name
      type: string
      description: Source name from image.source.list (e.g. DisplayPort 1, HDMI).

- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "<sensortype>", "valuetype": "<valuetype>"}}'
  params:
    - name: type
      type: string
      description: Sensor type enum - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: Value type enum - Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.
  notes: "Returns dictionary of sensor-name -> reading. Used for temps, fan speeds, voltages, etc."

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  notes: "Returns array of available channel names."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: "Returns array of mode names. Basic mode = 2 channels; extended mode exposes more."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity, timestamp, source, description, custommessage}."

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: "Returns array of managed firmware component names."

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns array of {name, versions:{available, running}, status}. status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Forces component upgrade at next reboot. Param details UNRESOLVED - source does not specify params."

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: "Engages CLO at current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
  notes: "Returns string serial number."

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "<name>"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "<name>"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset.

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycles through all possible RGB modes."

- id: ledctrl_blink
  label: LED Blink (example method)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "<ledname>", "color": "<color>", "period": <int>}}'
  params:
    - name: led
      type: string
      description: LED name (e.g. systemstatus).
    - name: color
      type: string
      description: Color name (e.g. red).
    - name: period
      type: integer
      description: Blink period.
  notes: "Documented as methods API example. Availability model-dependent."

- id: file_upload
  label: Upload File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@<filename> http://{projector_address}/api/<endpoint>'
  params:
    - name: filename
      type: string
      description: Local file to upload.
    - name: endpoint
      type: string
      description: File endpoint path (e.g. image/processing/warp/file/transfer, image/processing/blend/file/transfer, image/processing/blacklevel/file/transfer).

- id: file_download
  label: Download File (HTTP)
  kind: query
  command: 'curl -O -J http://{projector_address}/api/<endpoint>/<filename>'
  params:
    - name: endpoint
      type: string
      description: File endpoint path.
    - name: filename
      type: string
      description: Optional specific file; some endpoints serve current file without name.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'

- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: image_connector_detectedsignal
  type: object
  description: "Detected signal info per connector (image.connector.<name>.detectedsignal). Fields: active(bool), name, vertical/horizontal totals & resolutions & porches & sync widths, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode."

- id: illumination_sources_laser_minpower
  type: float
  description: Min laser power percent (read-only).

- id: illumination_sources_laser_maxpower
  type: float
  description: Max laser power percent (read-only).
```

## Variables
```yaml
- id: illumination_sources_laser_power
  type: float
  access: RW
  description: Target laser power in percent.
  set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": <value>}}'

- id: image_window_main_source
  type: string
  access: RW
  description: Source displayed in main window.

- id: image_window_main_position
  type: object
  access: RW
  description: "{x:int, y:int}"

- id: image_window_main_size
  type: object
  access: RW
  description: "{width:int, height:int}"

- id: image_window_main_scalingmode
  type: enum
  access: RW
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  type: float
  access: RW
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: "Normalized brightness/offset; 0 default, 1 = 100% offset."

- id: image_contrast
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Normalized contrast/gain; 1 default."

- id: image_gamma
  type: float
  access: RW
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: "Image gamma; default 2.2."

- id: image_saturation
  type: float
  access: RW
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Normalized saturation; 1 default."

- id: image_sharpness
  type: integer
  access: RW
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: image_orientation
  type: enum
  access: RW
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_processing_warp_enable
  type: boolean
  access: RW
  description: Enable/disable all warp functions.

- id: image_processing_warp_file_enable
  type: boolean
  access: RW
  description: Enable/disable file warp.

- id: image_processing_warp_file_selected
  type: string
  access: RW
  description: Currently selected warp file.

- id: image_processing_blend_file_enable
  type: boolean
  access: RW
  description: Enable/disable file blend.

- id: image_processing_blend_file_selected
  type: array
  access: RW
  description: Currently selected blend files (string array).

- id: image_processing_blacklevel_file_enable
  type: boolean
  access: RW
  description: Enable/disable black level correction.

- id: image_processing_blacklevel_file_selected
  type: string
  access: RW
  description: Currently selected black level file.

- id: optics_zoom_position
  type: integer
  access: RW
  description: Current zoom position.

- id: optics_focus_position
  type: integer
  access: RW
  description: Current focus position.

- id: optics_lensshift_horizontal_position
  type: integer
  access: RW
  description: Current horizontal lens shift position.

- id: optics_lensshift_vertical_position
  type: integer
  access: RW
  description: Current vertical lens shift position.

- id: optics_shutter_target
  type: enum
  access: RW
  values: [Open, Closed]

- id: dmx_mode
  type: string
  access: RW
  description: Current DMX mode.

- id: dmx_startchannel
  type: integer
  access: RW
  min: 1
  max: 512
  description: DMX start channel.

- id: dmx_shutdown
  type: boolean
  access: RW
  description: Shutdown enabled or not.

- id: system_standby_enable
  type: boolean
  access: RW
  description: Enable/disable standby state. Check availability first.

- id: system_eco_enable
  type: boolean
  access: RW
  description: Enable/disable ECO state. Check availability first.

- id: network_device_lan_ip4config
  type: object
  access: R
  description: "{Address, Mask, Gateway, NameServers} - IPv4 config."
```

## Events
```yaml
- id: property_changed
  direction: server_to_client
  description: "Unsolicited notification when a subscribed property value changes."
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"<objectname.propertyname>": <value>}]}}'
  notes: "No id field; no response must be returned. Two notifications delivered on source switch (deselect then select)."

- id: signal_callback
  direction: server_to_client
  description: "Unsolicited notification when a subscribed signal fires."
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"<objectname.signalname>": {<args>}}]}}'

- id: modelupdated
  direction: server_to_client
  description: "Signal triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe."
  # UNRESOLVED: full payload args for modelupdated beyond introspect.objectchanged example
```

## Macros
```yaml
- id: warp_grid_apply
  description: "Upload + select + enable a warp grid file."
  steps:
    - "Upload via HTTP: curl -X POST -F file=@warp.xml http://{addr}/api/image/processing/warp/file/transfer"
    - "property.set image.processing.warp.file.selected = warp.xml"
    - "property.set image.processing.warp.file.enable = true"
    - "property.set image.processing.warp.enable = true (global warp enable)"

- id: blend_mask_apply
  description: "Upload + select + enable a blend mask."
  steps:
    - "Upload via HTTP: curl -X POST -F file=@mask.png http://{addr}/api/image/processing/blend/file/transfer"
    - "property.set image.processing.blend.file.selected = mask.png"
    - "property.set image.processing.blend.file.enable = true"
  notes: "Grayscale 8 or 16 bit. Size per projector resolution (WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540). PNG/JPEG/TIFF; blue channel used if color image."

- id: blacklevel_mask_apply
  description: "Upload + select + enable a black level mask."
  steps:
    - "Upload via HTTP: curl -X POST -F file=@blacklevel.png http://{addr}/api/image/processing/blacklevel/file/transfer"
    - "property.set image.processing.blacklevel.file.selected = blacklevel.png"
    - "property.set image.processing.blacklevel.file.enable = true"
  notes: "Same size/format constraints as blend mask."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on is no-op if projector already on or in state transition. Best practice: verify system.state is standby or ready before system.poweron."
  - "Power off is no-op if already off or in transition. Best practice: verify system.state is on before system.poweroff."
  - "ECO mode wake requires special handling: WoL (MAC), IR remote power, keypad power, or raw serial ':POWR1\\r'. JSON-RPC system.poweron does not wake from ECO."
  - "property.set: wait for confirmation before re-setting same property - continuous re-set floods server, degrades performance."
  - "Lens/lens-position may affect min/max illumination power levels (dynamic values)."
# UNRESOLVED: no explicit safety interlocks, voltage/current hazards, or power-sequencing warnings stated beyond operational notes above.
```

## Notes
Pulse API = JSON-RPC 2.0. Same commands work over TCP (9090) and RS-232. API is dynamic — availability depends on peripherals/config (e.g. motorized zoom lens, DMX mode). Best method to know exact API per unit: introspect. Object/member naming = lowercase dot notation (JS-like). Multiple objects of a kind modeled as `kind.name` (e.g. `tempctrl.fans.mainfan`). Params passed by name; order irrelevant. Warp file format same as MCM500/400.

<!-- UNRESOLVED: real auth pass code (98765 is example placeholder). firmware version compatibility range. hardware model variants under Icx1 5 family. full field list for image.connector.detectedsignal enums (color_space, signal_range, scan, stereo_mode values partially listed). DMX extended-mode channel list. firmware.schedulecomponentupgrade params. modelupdated full payload schema beyond introspect.objectchanged example. -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:09:39.443Z
last_checked_at: 2026-08-19T08:41:04.113Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:41:04.113Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match source JSON-RPC methods/HTTP/serial literals verbatim; all transport parameters (port 9090, 19200/8/N/1) confirmed; source method catalog fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "hardware specs (lumens, resolution, power draw) not in source. firmware version range not stated. exact model variants unknown."
- "full payload args for modelupdated beyond introspect.objectchanged example"
- "no explicit safety interlocks, voltage/current hazards, or power-sequencing warnings stated beyond operational notes above."
- "real auth pass code (98765 is example placeholder). firmware version compatibility range. hardware model variants under Icx1 5 family. full field list for image.connector.detectedsignal enums (color_space, signal_range, scan, stereo_mode values partially listed). DMX extended-mode channel list. firmware.schedulecomponentupgrade params. modelupdated full payload schema beyond introspect.objectchanged example."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
