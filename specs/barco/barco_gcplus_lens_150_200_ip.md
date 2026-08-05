---
spec_id: admin/barco-gcplus-lens-150-200
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gcplus Lens 150 200 Control Spec"
manufacturer: Barco
model_family: "Barco Gcplus Lens 150 200"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Gcplus Lens 150 200"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:15:06.591Z
last_checked_at: 2026-08-05T08:06:12.857Z
generated_at: 2026-08-05T08:06:12.857Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants and firmware compatibility not stated. API is dynamic and varies by projector configuration / mounted peripherals (per source note)."
  - "actual credential / token format not to be populated; normal end-user access may skip auth"
  - "min/max dynamic - depend on lens type/position; query minpower/maxpower at runtime."
  - "no explicit multi-step sequences named as macros in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated in source."
  - "authentication credential format / access levels not fully specified (only example code 98765 shown)."
  - "DMX extended-mode channel count not documented."
  - "lens motorization availability depends on mounted lens — zoom/focus/lensshift may be absent on some units."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:06:12.857Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions (30 Actions + 2 Feedbacks) are confirmed verbatim in the refined source, including wire-literal JSON-RPC methods, ECO serial command, HTTP endpoints, and notifications. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gcplus Lens 150 200 Control Spec

## Summary
Barco Pulse-series projector (Gcplus Lens 150 200) controlled via the Pulse JSON-RPC 2.0 API. Transport is TCP/IP on port 9090 and/or RS-232 serial (19200 baud). Covers power, sources, illumination/laser power, picture settings, warp/blend/blacklevel file management, optics (shutter/zoom/focus/lensshift), DMX, environment sensing, firmware, and introspection.

<!-- UNRESOLVED: exact model variants and firmware compatibility not stated. API is dynamic and varies by projector configuration / mounted peripherals (per source note). -->

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
  type: code  # source describes `authenticate` method requiring a secret pass code (e.g. 98765)
  # UNRESOLVED: actual credential / token format not to be populated; normal end-user access may skip auth
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff
  - queryable    # inferred from property.get query examples
  - levelable    # inferred from brightness/contrast/gamma/saturation/laser-power settables
  - routable     # inferred from image.window.main.source input-select
```

## Actions
```yaml
# JSON-RPC 2.0 API. Request envelope: { "jsonrpc":"2.0", "method":<m>, "params":{...}, "id":<n> }
# Each action's `command` holds the method name (the literal JSON-RPC method).

# --- Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: 'system.poweron'
  payload: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: 'system.poweroff'
  payload: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII serial wake command for projectors in ECO/power-save mode.

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: 'authenticate'
  payload: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (sets user access level).

# --- Property API (generic) ---
- id: property_set
  label: Set Property
  kind: action
  command: 'property.set'
  payload: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<name>","value":<v>},"id":<n>}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (see Variables).
    - name: value
      type: any
      description: Value to set.

- id: property_get
  label: Get Property
  kind: query
  command: 'property.get'
  payload: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<name>"},"id":<n>}'
  params:
    - name: property
      type: string
      description: Property path in dot notation.

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: 'property.get'
  payload: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["<name1>","<name2>"]},"id":<n>}'
  params:
    - name: property
      type: array
      description: Array of property paths.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: 'property.subscribe'
  payload: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<name>"},"id":<n>}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths).

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: 'property.unsubscribe'
  payload: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<name>"},"id":<n>}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths).

# --- Signal API ---
- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: 'signal.subscribe'
  payload: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<name>"},"id":<n>}'
  params:
    - name: signal
      type: string
      description: Signal name (or array).

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: 'signal.unsubscribe'
  payload: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<name>"},"id":<n>}'
  params:
    - name: signal
      type: string
      description: Signal name (or array).

# --- Introspection ---
- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: 'introspect'
  payload: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<name>","recursive":true},"id":<n>}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty = all).
    - name: recursive
      type: boolean
      description: If false, list only object names one level.

# --- Sources / Connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: 'image.source.list'
  payload: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: 'image.connector.list'
  payload: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: 'image.source.{name}.listconnectors'
  payload: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: name
      type: string
      description: Source name with non-word chars removed, lowercased (e.g. "DisplayPort 1" -> "displayport1").

# --- LED control (example method) ---
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: 'ledctrl.blink'
  payload: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: 'illumination.clo.engage'
  payload: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: 'illumination.laser.getserialnumber'
  payload: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Color management ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: 'image.color.p7.custom.copypresettocustom'
  payload: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: 'image.color.p7.custom.resetpreset'
  payload: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: 'image.color.p7.custom.resettonative'
  payload: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: 'image.color.rgbmode.nextrgbmode'
  payload: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: 'environment.getcontrolblocks'
  payload: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      description: 'Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.'
    - name: valuetype
      type: string
      description: 'Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: 'environment.getalarminfo'
  payload: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: 'dmx.listchannels'
  payload: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: 'dmx.listmodes'
  payload: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: 'firmware.listcomponents'
  payload: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: 'firmware.listcomponentversionstatus'
  payload: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: 'firmware.schedulecomponentupgrade'
  payload: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot. Specific params not detailed in source.

# --- HTTP file endpoints (upload/download via curl) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string
      description: Projector IP address.

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: projector-ip
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector-ip
      type: string
```

## Feedbacks
```yaml
# JSON-RPC notifications (no id, no response). Client must implement listeners.

- id: property_changed
  type: notification
  method: property.changed
  description: Array of property/value pairs when a subscribed property changes.
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  type: notification
  method: signal.callback
  description: Array of signal/argument pairs when a subscribed signal is emitted.
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'

# Observable query states (via property.get on):
#   system.state            -> enum boot|eco|standby|ready|conditioning|on|deconditioning|service|error
#   illumination.state      -> enum On|Off
#   image.window.main.source-> string (active source name)
#   environment.alarmstate  -> enum Fatal|Error|Alert|Warning|Ok
#   network.device.lan.state-> enum CONNECTED|DISCONNECTED
#   optics.shutter.position -> enum Open|Closed
```

## Variables
```yaml
# Settable via property.set. Each entry: property path, type, constraints from source.

- id: system_state
  property: system.state
  type: enum
  access: read
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  property: illumination.state
  type: enum
  access: read
  values: [On, Off]

- id: illumination_laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  unit: percent
  # UNRESOLVED: min/max dynamic - depend on lens type/position; query minpower/maxpower at runtime.

- id: illumination_laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  access: read

- id: illumination_laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  access: read

- id: image_window_main_source
  property: image.window.main.source
  type: string
  access: read_write
  description: Active source. Available values via image.source.list (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: image_window_main_position
  property: image.window.main.position
  type: object
  access: read_write
  fields: { x: int, y: int }

- id: image_window_main_size
  property: image.window.main.size
  type: object
  access: read_write
  fields: { width: int, height: int }

- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  access: read_write
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  property: image.brightness
  type: float
  access: read_write
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Normalized offset; 0 default, 1 = 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized gain; 1 default.

- id: image_gamma
  property: image.gamma
  type: float
  access: read_write
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Default 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized; 1 default.

- id: image_sharpness
  property: image.sharpness
  type: int
  access: read_write
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: image_orientation
  property: image.orientation
  type: enum
  access: read_write
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_processing_warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: read_write
  description: Enable/disable all warp functions.

- id: image_processing_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: read_write

- id: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: read_write
  description: Currently selected warp grid file.

- id: image_processing_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: read_write

- id: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  access: read_write
  items: string

- id: image_processing_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- id: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: read_write

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write

- id: dmx_startchannel
  property: dmx.startchannel
  type: int
  access: read_write
  min: 1
  max: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write

- id: optics_shutter_position
  property: optics.shutter.position
  type: enum
  access: read
  values: [Open, Closed]

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  access: read_write
  values: [Open, Closed]

- id: optics_zoom_position
  property: optics.zoom.position
  type: int
  access: read_write

- id: optics_focus_position
  property: optics.focus.position
  type: int
  access: read_write

- id: optics_lensshift_horizontal_position
  property: optics.lensshift.horizontal.position
  type: int
  access: read_write

- id: optics_lensshift_vertical_position
  property: optics.lensshift.vertical.position
  type: int
  access: read_write

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  access: read_write
  description: Enable/disable standby state (check availability first).

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: read_write
  description: Enable/disable ECO state (check availability first).

- id: network_device_lan_ip4config
  property: network.device.lan.ip4config
  type: object
  access: read
  fields: { Address: string, Mask: string, Gateway: string, NameServers: string }

- id: environment_alarmstate
  property: environment.alarmstate
  type: enum
  access: read
  values: [Fatal, Error, Alert, Warning, Ok]

- id: image_connector_detectedsignal
  property: image.connector.{name}.detectedsignal
  type: object
  access: read
  description: |
    Detected signal info per connector. Name derived from connector name
    (non-word chars removed, lowercased). Contains active, name, timings,
    color space, gamma, stereo info. Disregard fields when active=false.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications from projector:

- id: modelupdated
  type: signal
  description: Triggered when object structure changes (objects added/removed).
  subscribe_via: signal.subscribe with signal: modelupdated

- id: property_changed_event
  type: notification
  method: property.changed
  description: Emitted on subscribed property value changes.

- id: signal_callback_event
  type: notification
  method: signal.callback
  description: Emitted when a subscribed signal fires.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences named as macros in source.
# (Source describes procedural workflows - e.g. upload+select+enable warp file -
#  but as separate property.set calls, not bundled macros.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note: source recommends verifying
# system.state before power on/off (good practice, not a hard interlock).
```

## Notes
- API is JSON-RPC 2.0; same command set over TCP (port 9090) and RS-232 serial.
- Parameters passed by name; order does not matter.
- Best practice: wait for `property.set` confirmation before re-setting the same property (avoids flooding the server).
- Power on/off is idempotent — no-op if already in target state or transitioning. Verify `system.state` first.
- Source selection emits two `property.changed` notifications: first clearing old source (`""`), then setting new.
- Subscriptions deliver change events only — to read current value use `property.get`.
- File endpoints (warp/blend/blacklevel) use HTTP POST upload via `/api/...` paths alongside the JSON-RPC control channel.
- API surface is dynamic; exact properties depend on mounted lens/peripherals. Use `introspect` to discover the real API for a given unit.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication credential format / access levels not fully specified (only example code 98765 shown). -->
<!-- UNRESOLVED: DMX extended-mode channel count not documented. -->
<!-- UNRESOLVED: lens motorization availability depends on mounted lens — zoom/focus/lensshift may be absent on some units. -->
```

Spec built. JSON-RPC Pulse API, TCP 9090 + serial 19200/8N1. ~25 methods as actions, ~30 settable properties as variables, 2 notification feedbacks, 3 signals. All gaps marked UNRESOLVED. Output above = the Markdown revision, no wrapper.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:15:06.591Z
last_checked_at: 2026-08-05T08:06:12.857Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:06:12.857Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions (30 Actions + 2 Feedbacks) are confirmed verbatim in the refined source, including wire-literal JSON-RPC methods, ECO serial command, HTTP endpoints, and notifications. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants and firmware compatibility not stated. API is dynamic and varies by projector configuration / mounted peripherals (per source note)."
- "actual credential / token format not to be populated; normal end-user access may skip auth"
- "min/max dynamic - depend on lens type/position; query minpower/maxpower at runtime."
- "no explicit multi-step sequences named as macros in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated in source."
- "authentication credential format / access levels not fully specified (only example code 98765 shown)."
- "DMX extended-mode channel count not documented."
- "lens motorization availability depends on mounted lens — zoom/focus/lensshift may be absent on some units."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
