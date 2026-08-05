---
spec_id: admin/barco-flx-n100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Flx N100 Control Spec"
manufacturer: Barco
model_family: "Flx N100"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Flx N100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:25:43.142Z
last_checked_at: 2026-08-05T08:01:35.910Z
generated_at: 2026-08-05T08:01:35.910Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. API surface is dynamic and varies by projector configuration/peripherals (e.g. lens, DMX mode); full API must be obtained via introspection on the specific unit."
  - "source example shows min 0 but actual min comes from minpower property (dynamic)"
  - "source example shows max 100 but actual max comes from maxpower property (dynamic)"
  - "no explicit multi-step named sequences documented in source."
  - "no formal interlock/error-recovery sequences or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "authentication passcode/credential format is device-specific and not disclosed in source (example code 98765 is illustrative only)."
  - "laser power absolute min/max are dynamic (depend on lens/position); source shows illustrative 0/100 bounds."
  - "no error-recovery sequences or power/voltage/current specifications stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:01:35.910Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literal JSON-RPC method names or the :POWR1 serial token verbatim in the source; transport params (port 9090, baud 19200, 8N1, no flow control) also verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Flx N100 Control Spec

## Summary
The Barco Flx N100 is a Pulse-series projector controlled via the Pulse JSON-RPC 2.0 API ("Pulse API"). The same command set is reachable over TCP/IP (port 9090) and RS-232 serial. This spec covers power control, source selection, illumination, image/picture settings, optics, warping/blending/black-level file management, environment monitoring, DMX, and firmware management.

<!-- UNRESOLVED: firmware version compatibility not stated in source. API surface is dynamic and varies by projector configuration/peripherals (e.g. lens, DMX mode); full API must be obtained via introspection on the specific unit. -->

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
  type: code  # documented: JSON-RPC "authenticate" method with numeric secret passcode.
              # Auth is OPTIONAL - only required to raise access level above normal end user.
              # Credentials are device-specific; value not stated in source.
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff commands
  - queryable    # inferred from property.get query commands and environment/signal queries
  - routable     # inferred from source-selection commands (image.window.main.source)
  - levelable    # inferred from brightness/contrast/gamma/laser-power level controls
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP (port 9090) or RS-232. Each method = one action.
# "authenticate" is the auth handshake; the rest are control/query methods.
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret access passcode (value shown 98765 is source example only)
  notes: Optional for normal end-user access; required to raise access level.

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: No-op if already on or transitioning. Verify system.state is standby/ready first.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: No-op if already off or transitioning. Verify system.state is on first.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. image.brightness)
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: Wait for confirmation before re-setting same property (avoids server flooding).

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property path, or array of paths for multi-read

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property path, or array of paths for multi-subscribe

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property path, or array of paths for multi-unsubscribe

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}, "id": {id}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of names for multi-subscribe

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}, "id": {id}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of names for multi-unsubscribe

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}, "id": {id}}'
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation); empty = everything
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level). Default true.

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": {id}}'
  params: []
  notes: Returns array of source name strings; contents vary by model.

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": {id}}'
  params: []
  notes: Returns array of physical connector name strings; varies by model.

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{name}.listconnectors", "id": {id}}'
  params:
    - name: name
      type: string
      description: Source object name (source name lowercased, non-word chars removed, e.g. displayport1)

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}, "id": {id}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: environment_getcontrolblocks
  label: Get Environment Sensor Data
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}, "id": {id}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'
  notes: Returns dictionary of sensor-name -> reading (e.g. temperatures, fan tachos).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": {id}}'
  params: []
  notes: Returns array of alarm records (severity, timestamp, source, description, custommessage).

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": {id}}'
  params: []
  notes: Returns array of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": {id}}'
  params: []
  notes: Returns array of all DMX modes.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": {id}}'
  params: []
  notes: Returns array of managed firmware component names.

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": {id}}'
  params: []
  notes: 'Returns components with name, versions {available, running}, status enum (Unknown/OK/Upgradable).'

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "id": {id}}'
  params: []
  notes: Forces a component upgrade at next reboot.

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": {id}}'
  params: []
  notes: Engages Constant Light Output at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": {id}}'
  params: []
  notes: Returns laser serial number string.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}, "id": {id}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}, "id": {id}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset to defaults

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": {id}}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": {id}}'
  params: []
  notes: Cycles to the next RGB mode.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII serial-only command to wake projector from ECO/power-save mode. Alternative wake methods are Wake-on-LAN (MAC address) or physical power button.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  property: system.state
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  property: illumination.state
  values: ["On", "Off"]

- id: illumination_laser_minpower
  type: number
  property: illumination.sources.laser.minpower
  unit: percent
  notes: Read-only minimum laser power; dynamic, may change with lens/position.

- id: illumination_laser_maxpower
  type: number
  property: illumination.sources.laser.maxpower
  unit: percent
  notes: Read-only maximum laser power; dynamic.

- id: network_lan_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: network_lan_ip4config
  type: object
  property: network.device.lan.ip4config
  notes: IPv4 config {Address, Mask, Gateway, NameServers}.

- id: environment_alarmstate
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: connector_detectedsignal
  type: object
  property: image.connector.{name}.detectedsignal
  notes: >-
    Signal info for a connector (object name = connector name lowercased, non-word
    chars removed, e.g. displayport1). Contains active, name, resolutions, timings,
    color_space, chroma_sampling, gamma_type, etc. Disregard fields when active is false.
```

## Variables
```yaml
- id: illumination_laser_power
  property: illumination.sources.laser.power
  type: number
  access: read_write
  unit: percent
  min: 0   # UNRESOLVED: source example shows min 0 but actual min comes from minpower property (dynamic)
  max: 100 # UNRESOLVED: source example shows max 100 but actual max comes from maxpower property (dynamic)

- id: image_window_main_source
  property: image.window.main.source
  type: string
  access: read_write
  notes: Source name string (e.g. DisplayPort 1, HDMI). Query image.source.list for valid values.

- id: image_window_main_position
  property: image.window.main.position
  type: object
  access: read_write
  fields: [{name: x, type: int}, {name: y, type: int}]

- id: image_window_main_size
  property: image.window.main.size
  type: object
  access: read_write
  fields: [{name: width, type: int}, {name: height, type: int}]

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

- id: image_contrast
  property: image.contrast
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01

- id: image_gamma
  property: image.gamma
  type: float
  access: read_write
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01

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
  notes: Globally enable/disable all warp functions.

- id: image_processing_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: read_write
  notes: Enable/disable file warp.

- id: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: read_write
  notes: Currently selected warp grid file.

- id: image_processing_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: read_write

- id: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  access: read_write
  notes: Currently selected blend files.

- id: image_processing_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- id: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: read_write
  notes: Currently selected black level file.

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write
  notes: Current DMX mode (basic = 2 channels; extended exposes more).

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
  access: read_write
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
  notes: May be unavailable if lens lacks motorized zoom.

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
  notes: Enable/disable standby state; check availability first.

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: read_write
  notes: Enable/disable ECO state; check availability first.
```

## Events
```yaml
- id: property_changed
  method: property.changed
  direction: server_to_client
  description: Unsolicited notification when a subscribed property value changes. params.property is an array of {propertyName: value} objects.
  payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"image.brightness": 0.15}]}}'
  notes: Notifications have no id; client must NOT respond. Source-select emits two events (deselect then select).

- id: signal_callback
  method: signal.callback
  direction: server_to_client
  description: Unsolicited notification when a subscribed signal is emitted. params.signal is an array of {signalName: {args}} objects.
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'

- id: modelupdated_signal
  method: modelupdated
  direction: server_to_client
  description: Signal triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named sequences documented in source.
# (Warping/blending/black-level workflows are described procedurally in prose,
#  not as discrete named macros.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - field: power_on_precondition
    value: "Best practice: verify system.state is standby or ready before issuing system.poweron (no-op otherwise)."
    source: programmers guide, Power on section
  - field: power_off_precondition
    value: "Best practice: verify system.state is on before issuing system.poweroff (no-op otherwise)."
    source: programmers guide, Power off section
# UNRESOLVED: no formal interlock/error-recovery sequences or power-on sequencing
# requirements stated in source. Power/voltage/current specs not stated.
```

## Notes
- **API model:** Pulse JSON-RPC 2.0. Parameters are passed by name; order does not matter. Responses echo the request `id`. Errors follow JSON-RPC 2.0 error object format. Methods with no meaningful return yield `result: null` (not an error).
- **Object naming:** dot notation, lowercase (JavaScript-like). Objects with multiple instances are indexed (e.g. `tempctrl.fans.mainfan`, `illumination.sources.laser`).
- **Name-to-object translation:** source/connector object names are derived by removing all non-word characters and lowercasing (e.g. "DisplayPort 1" → `displayport1`).
- **Dynamic API:** the documented surface is not guaranteed complete for a given unit/configuration. Motorized zoom absent if lens lacks it; DMX extended mode exposes additional channels. Run `introspect` for the authoritative API of a specific device.
- **Notifications:** subscribing to a property does NOT return its current value — use `property.get` for that. Notifications fire only on actual value change.
- **property.set pacing:** wait for confirmation before re-setting the same property; continuous re-setting floods the server and degrades performance.
- **ECO wake:** Wake-from-ECO over serial uses ASCII `:POWR1\r`; alternatives are Wake-on-LAN (MAC address) or physical power button.
- **File transfers (HTTP):** warp grids, blend masks, and black-level masks are uploaded/downloaded over HTTP at `http://<projector-ip>/api/<endpoint>`. Warp: `/api/image/processing/warp/file/transfer`; blend: `/api/image/processing/blend/file/transfer`; black level: `/api/image/processing/blacklevel/file/transfer`. Blend/black-level masks accept PNG (up to 16-bit), JPEG, TIFF; grayscale only (color images use blue channel). Mask resolution must match projector resolution tier (WUXGA/WQXGA/4K/4K Cinemascope).
- **Warp file format:** same as MCM500/400.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication passcode/credential format is device-specific and not disclosed in source (example code 98765 is illustrative only). -->
<!-- UNRESOLVED: laser power absolute min/max are dynamic (depend on lens/position); source shows illustrative 0/100 bounds. -->
<!-- UNRESOLVED: no error-recovery sequences or power/voltage/current specifications stated in source. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:25:43.142Z
last_checked_at: 2026-08-05T08:01:35.910Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:01:35.910Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literal JSON-RPC method names or the :POWR1 serial token verbatim in the source; transport params (port 9090, baud 19200, 8N1, no flow control) also verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. API surface is dynamic and varies by projector configuration/peripherals (e.g. lens, DMX mode); full API must be obtained via introspection on the specific unit."
- "source example shows min 0 but actual min comes from minpower property (dynamic)"
- "source example shows max 100 but actual max comes from maxpower property (dynamic)"
- "no explicit multi-step named sequences documented in source."
- "no formal interlock/error-recovery sequences or power-on sequencing"
- "firmware version compatibility not stated in source."
- "authentication passcode/credential format is device-specific and not disclosed in source (example code 98765 is illustrative only)."
- "laser power absolute min/max are dynamic (depend on lens/position); source shows illustrative 0/100 bounds."
- "no error-recovery sequences or power/voltage/current specifications stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
