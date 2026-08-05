---
spec_id: admin/barco-eonis-3d-mdrc-8127
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Eonis 3D Mdrc 8127 Control Spec"
manufacturer: Barco
model_family: "Barco Eonis 3D Mdrc 8127"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Eonis 3D Mdrc 8127"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:16:36.188Z
last_checked_at: 2026-08-05T07:29:51.045Z
generated_at: 2026-08-05T07:29:51.045Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device-specific API availability may vary by projector configuration and peripherals."
  - "Exact device-specific object and method availability not stated beyond generic Pulse API documentation."
  - "Authentication secret code value not stated for this device."
  - "HTTP file endpoint authentication behavior not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:29:51.045Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 action units and declared transport values are supported by the source command catalogue. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Eonis 3D Mdrc 8127 Control Spec

## Summary

Barco Eonis 3D Mdrc 8127 supports Pulse API control over TCP/IP and RS-232. TCP service uses port 9090. API requests use JSON-RPC-style method and property operations; HTTP file endpoints support warp, blend, and black-level file transfers.

<!-- UNRESOLVED: Device-specific API availability may vary by projector configuration and peripherals. -->

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
  type: secret_code  # higher-level access requires authentication; normal end-user access may skip authentication
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from source selection commands
- queryable  # inferred from property.get and introspection commands
- levelable  # inferred from illumination and image property controls
```

## Actions

```yaml
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: Available source name

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: any
      description: Property value

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property_1}", "{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["{property_1}", "{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["{property_1}", "{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["{signal_1}", "{signal_2}"]}}'
  params:
    - name: signal_1
      type: string
      description: First signal name
    - name: signal_2
      type: string
      description: Second signal name

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["{signal_1}", "{signal_2}"]}}'
  params:
    - name: signal_1
      type: string
      description: First signal name
    - name: signal_2
      type: string
      description: Second signal name

- id: image_source_list
  label: List Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []

- id: source_list_connectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: Source object name in lowercase dot notation

- id: introspect_recursive
  label: Recursive Introspection
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_non_recursive
  label: Non-Recursive Introspection
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, or GenericBlock
    - name: valuetype
      type: string
      description: Requested sensor value type

- id: environment_getalarminfo
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Illumination Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resetpreset
  label: Reset Custom Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resettonative
  label: Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
```

## Feedbacks

```yaml
- id: system_state
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - service
    - error

- id: illumination_state
  type: enum
  values:
    - On
    - Off

- id: active_source
  type: string

- id: image_brightness
  type: float
  range:
    min: -1
    max: 1
    step_size: 1
    precision: 0.01

- id: image_contrast
  type: float
  range:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_gamma
  type: float
  range:
    min: 1
    max: 3
    step_size: 1
    precision: 0.1

- id: image_saturation
  type: float
  range:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_sharpness
  type: integer
  range:
    min: -2
    max: 8
    step_size: 1
    precision: 1

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: illumination_laser_power
  type: float
  unit: percent

- id: illumination_laser_minpower
  type: float
  unit: percent

- id: illumination_laser_maxpower
  type: float
  unit: percent

- id: network_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: optics_shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: optics_shutter_target
  type: enum
  values:
    - Open
    - Closed

- id: property_changed
  type: object
  description: Notification containing property/value pairs

- id: signal_callback
  type: object
  description: Notification containing signal/argument-list pairs
```

## Variables

```yaml
- id: illumination_laser_power
  type: float
  unit: percent
  range:
    min: 0
    max: 100

- id: image_brightness
  type: float
  range:
    min: -1
    max: 1
    step_size: 1
    precision: 0.01

- id: image_contrast
  type: float
  range:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_gamma
  type: float
  range:
    min: 1
    max: 3
    step_size: 1
    precision: 0.1

- id: image_saturation
  type: float
  range:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_sharpness
  type: integer
  range:
    min: -2
    max: 8

- id: image_window_main_source
  type: string

- id: image_window_main_position
  type: object
  description: Window x/y position

- id: image_window_main_size
  type: object
  description: Window width/height

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: string

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range:
    min: 1
    max: 512

- id: dmx_shutdown
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: optics_shutter_target
  type: enum
  values:
    - Open
    - Closed
```

## Events

```yaml
- id: property_changed
  command: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"{property}": {value}}]}}'
  description: Server notification sent when property value changes.

- id: signal_callback
  command: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"{signal}": {arguments}}]}}'
  description: Server notification sent when signal is emitted.

- id: modelupdated
  description: Signal triggered when object structure changes.
```

## Macros

```yaml
- id: wake_from_eco_serial
  label: Wake from ECO mode over RS-232
  steps:
    - command: ":POWR1\\r"
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - condition: system.state
    required_values:
      - standby
      - ready
    action: system.poweron
  - condition: system.state
    required_values:
      - on
    action: system.poweroff
```

## Notes

Pulse API documentation states that property.set confirmations should be awaited before setting same property again, to avoid flooding server and reducing performance. Power commands have no effect when projector already is on, off, or transitioning. Exact API availability depends on projector configuration and peripherals; introspection is recommended.

<!-- UNRESOLVED: Exact device-specific object and method availability not stated beyond generic Pulse API documentation. -->
<!-- UNRESOLVED: Authentication secret code value not stated for this device. -->
<!-- UNRESOLVED: HTTP file endpoint authentication behavior not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:16:36.188Z
last_checked_at: 2026-08-05T07:29:51.045Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:29:51.045Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 action units and declared transport values are supported by the source command catalogue. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device-specific API availability may vary by projector configuration and peripherals."
- "Exact device-specific object and method availability not stated beyond generic Pulse API documentation."
- "Authentication secret code value not stated for this device."
- "HTTP file endpoint authentication behavior not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
