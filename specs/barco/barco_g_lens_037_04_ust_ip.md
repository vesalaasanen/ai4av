---
spec_id: admin/barco-g-lens-037-04-ust
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco G Lens 037 04 Ust Control Spec"
manufacturer: Barco
model_family: "Barco G Lens 037 04 Ust"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco G Lens 037 04 Ust"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:11:16.771Z
last_checked_at: 2026-08-05T08:05:22.562Z
generated_at: 2026-08-05T08:05:22.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /api/image/processing/warp/file/transfer
  - /api/image/processing/blend/file/transfer
  - /api/image/processing/blacklevel/file/transfer
  - "Device-specific API availability depends on projector configuration and peripherals."
  - "Device-specific connector inventory, available illumination source, complete dynamic property catalogue, and firmware compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:05:22.562Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions and transport parameters match source verbatim; HTTP file endpoints are the only extras and are noted in spec Notes. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco G Lens 037 04 Ust Control Spec

## Summary
Barco G Lens 037 04 Ust uses Pulse API over TCP/IP and RS-232. Network service uses TCP port 9090. API uses JSON-RPC methods, property access, subscriptions, signals, introspection, and HTTP file endpoints.

<!-- UNRESOLVED: Device-specific API availability depends on projector configuration and peripherals. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: secret_code  # Higher access levels require secret pass code; normal end-user access may skip authentication
```

## Traits
```yaml
- powerable  # inferred from system.poweron and system.poweroff commands
- routable  # inferred from image.window.main.source commands
- queryable  # inferred from property.get, introspection, and list methods
- levelable  # inferred from illumination and image property controls
```

## Actions
```yaml
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":{code}},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Object property name in dot notation
    - name: value
      type: any
      description: Property value

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Object property name in dot notation

- id: property_get_multiple
  label: Read Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name to observe

- id: property_subscribe_multiple
  label: Subscribe To Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name to stop observing

- id: property_unsubscribe_multiple
  label: Unsubscribe From Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multiple
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
      description: First signal name
    - name: signal2
      type: string
      description: Second signal name

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
      description: First signal name
    - name: signal2
      type: string
      description: Second signal name

- id: introspect_recursive
  label: Introspect Objects Recursively
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_non_recursive
  label: Introspect Objects Non-Recursively
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params: []

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
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: Source object name

- id: environment_getcontrolblocks
  label: Read Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: enum
      values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: enum
      values: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

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

- id: environment_getalarminfo
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resettonative
  label: Reset To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Change To Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: illumination_laser_power
  type: float
  minimum: 0
  maximum: 100

- id: illumination_laser_minpower
  type: float

- id: illumination_laser_maxpower
  type: float

- id: active_source
  type: string

- id: image_brightness
  type: float
  minimum: -1
  maximum: 1
  precision: 0.01

- id: image_contrast
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_gamma
  type: float
  minimum: 1
  maximum: 3
  precision: 0.1

- id: image_saturation
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_sharpness
  type: integer
  minimum: -2
  maximum: 8

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: property_changed
  type: event
  description: Server notification containing changed property/value pairs

- id: signal_callback
  type: event
  description: Server notification containing signal/argument-list pairs
```

## Variables
```yaml
- id: image_window_main_source
  type: string
  description: Active source assigned to main image window

- id: illumination_laser_power
  type: float
  minimum: 0
  maximum: 100

- id: image_brightness
  type: float
  minimum: -1
  maximum: 1
  precision: 0.01

- id: image_contrast
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_gamma
  type: float
  minimum: 1
  maximum: 3
  precision: 0.1

- id: image_saturation
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_sharpness
  type: integer
  minimum: -2
  maximum: 8

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_position
  type: object
  fields: [x, y]

- id: image_window_main_size
  type: object
  fields: [width, height]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array
  items: string

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  minimum: 1
  maximum: 512

- id: dmx_shutdown
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean
```

## Events
```yaml
- id: modelupdated
  description: Triggered when object structure changes

- id: property_changed
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'
  description: Notification containing changed property/value pairs

- id: signal_callback
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{arguments}}]}}'
  description: Notification containing signal/argument-list pairs
```

## Macros
```yaml
- id: wake_from_eco_serial
  label: Wake From ECO Mode
  steps:
    - command: ":POWR1\\r"
      transport: serial
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Verify system.state is standby or ready before system.poweron
  - Verify system.state is on before system.poweroff
```

## Notes
API contents dynamic; exact available objects depend on projector configuration and peripherals. Introspection recommended for determining exact API.

Wait for confirmation after each `property.set` before setting same property again; continuous writes may flood server and reduce performance.

Normal end-user authentication can be skipped. Higher access levels require secret pass code.

HTTP file endpoints include `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, and `/api/image/processing/blacklevel/file/transfer`.

<!-- UNRESOLVED: Device-specific connector inventory, available illumination source, complete dynamic property catalogue, and firmware compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:11:16.771Z
last_checked_at: 2026-08-05T08:05:22.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:05:22.562Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions and transport parameters match source verbatim; HTTP file endpoints are the only extras and are noted in spec Notes. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /api/image/processing/warp/file/transfer
- /api/image/processing/blend/file/transfer
- /api/image/processing/blacklevel/file/transfer
- "Device-specific API availability depends on projector configuration and peripherals."
- "Device-specific connector inventory, available illumination source, complete dynamic property catalogue, and firmware compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
