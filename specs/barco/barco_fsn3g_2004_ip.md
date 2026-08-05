---
spec_id: admin/barco-fsn3g-2004
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fsn3G 2004 Control Spec"
manufacturer: Barco
model_family: "Barco Fsn3G 2004"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Fsn3G 2004"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:09:43.199Z
last_checked_at: 2026-08-05T08:04:57.836Z
generated_at: 2026-08-05T08:04:57.836Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device-specific API availability depends on projector configuration and peripherals."
  - "Firmware compatibility not stated in source."
  - "Device-specific source list, connector list, dynamic API objects, and exact file endpoint availability may vary."
  - "Secret pass code format and value are not specified for normal end-user access."
  - "Error response structure and recovery sequence are not fully specified."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:04:57.836Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions map to JSON-RPC methods documented verbatim in the refined source; transport values (port 9090, RS232 params) are also source-verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco Fsn3G 2004 Control Spec

## Summary

Barco Fsn3G 2004 projector exposes Pulse API control through TCP/IP and RS-232. This spec covers JSON-RPC methods, property access, subscriptions, HTTP file endpoints, and documented projector operations.

<!-- UNRESOLVED: Device-specific API availability depends on projector configuration and peripherals. -->
<!-- UNRESOLVED: Firmware compatibility not stated in source. -->

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
  type: secret_code_optional
```

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

```yaml
- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: property_set_source_displayport_1
  label: Select DisplayPort 1
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1"}}'
  params: []

- id: property_set_source_hdmi
  label: Select HDMI
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "HDMI"}}'
  params: []

- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": "{value}"}, "id": "{id}"}'
  params:
    - name: property
      type: string
      description: Property name
    - name: value
      type: any
      description: Property value
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}, "id": "{id}"}'
  params:
    - name: property
      type: string
      description: Property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property_1}", "{property_2}"]}, "id": "{id}"}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}, "id": "{id}"}'
  params:
    - name: property
      type: string
      description: Property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_subscribe_multiple
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["{property_1}", "{property_2}"]}, "id": "{id}"}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}, "id": "{id}"}'
  params:
    - name: property
      type: string
      description: Property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["{property_1}", "{property_2}"]}, "id": "{id}"}'
  params:
    - name: property_1
      type: string
      description: First property name
    - name: property_2
      type: string
      description: Second property name
    - name: id
      type: string_or_number
      description: Second property name
    - name: id
      type: string_or_number
      description: Request identifier

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}, "id": "{id}"}'
  params:
    - name: signal
      type: string
      description: Signal name
    - name: id
      type: string_or_number
      description: Request identifier

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["{signal_1}", "{signal_2}"]}, "id": "{id}"}'
  params:
    - name: signal_1
      type: string
      description: First signal name
    - name: signal_2
      type: string
      description: Second signal name
    - name: id
      type: string_or_number
      description: Request identifier

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}, "id": "{id}"}'
  params:
    - name: signal
      type: string
      description: Signal name
    - name: id
      type: string_or_number
      description: Request identifier

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["{signal_1}", "{signal_2}"]}, "id": "{id}"}'
  params:
    - name: signal_1
      type: string
      description: First signal name
    - name: signal_2
      type: string
      description: Second signal name
    - name: id
      type: string_or_number
      description: Request identifier

- id: introspect_recursive
  label: Recursive Introspection
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", true], "id": "{id}"}'
  params:
    - name: object
      type: string
      description: Object name
    - name: id
      type: string_or_number
      description: Request identifier

- id: introspect_non_recursive
  label: Non-Recursive Introspection
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", false], "id": "{id}"}'
  params:
    - name: object
      type: string
      description: Object name
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_source_listconnectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors", "id": "{id}"}'
  params:
    - name: source
      type: string
      description: Lowercase source object name
    - name: id
      type: string_or_number
      description: Request identifier

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}, "id": "{id}"}'
  params:
    - name: type
      type: string
      description: Control block type
    - name: valuetype
      type: string
      description: Sensor value type
    - name: id
      type: string_or_number
      description: Request identifier

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: environment_getalarminfo
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}, "id": "{id}"}'
  params:
    - name: presetname
      type: string
      description: Preset name
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}, "id": "{id}"}'
  params:
    - name: presetname
      type: string
      description: Preset name
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_color_p7_custom_resettonative
  label: Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier

- id: image_color_rgbmode_nextrgbmode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": "{id}"}'
  params:
    - name: id
      type: string_or_number
      description: Request identifier
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
  property: image.window.main.source

- id: illumination_laser_power
  type: float
  property: illumination.sources.laser.power

- id: illumination_laser_minpower
  type: float
  property: illumination.sources.laser.minpower

- id: illumination_laser_maxpower
  type: float
  property: illumination.sources.laser.maxpower

- id: image_connector_detected_signal
  type: object
  property: image.connector.{connector}.detectedsignal

- id: network_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarm_state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
```

## Variables

```yaml
- id: active_source
  type: string
  property: image.window.main.source

- id: laser_power
  type: float
  property: illumination.sources.laser.power
  constraints:
    minimum: 0
    maximum: 100

- id: image_brightness
  type: float
  property: image.brightness
  constraints:
    minimum: -1
    maximum: 1
    precision: 0.01

- id: image_contrast
  type: float
  property: image.contrast
  constraints:
    minimum: 0
    maximum: 2
    precision: 0.01

- id: image_gamma
  type: float
  property: image.gamma
  constraints:
    minimum: 1
    maximum: 3
    precision: 0.1

- id: image_saturation
  type: float
  property: image.saturation
  constraints:
    minimum: 0
    maximum: 2
    precision: 0.01

- id: image_sharpness
  type: integer
  property: image.sharpness
  constraints:
    minimum: -2
    maximum: 8
    precision: 1

- id: image_orientation
  type: enum
  property: image.orientation
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_window_position
  type: object
  property: image.window.main.position

- id: image_window_size
  type: object
  property: image.window.main.size

- id: image_window_scalingmode
  type: enum
  property: image.window.main.scalingmode
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: warp_enable
  type: boolean
  property: image.processing.warp.enable

- id: warp_file_selected
  type: string
  property: image.processing.warp.file.selected

- id: warp_file_enable
  type: boolean
  property: image.processing.warp.file.enable

- id: blend_file_selected
  type: string
  property: image.processing.blend.file.selected

- id: blend_file_enable
  type: boolean
  property: image.processing.blend.file.enable

- id: blacklevel_file_selected
  type: string
  property: image.processing.blacklevel.file.selected

- id: blacklevel_file_enable
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: integer
  property: dmx.startchannel
  constraints:
    minimum: 1
    maximum: 512

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: network_ip4config
  type: object
  property: network.device.lan.ip4config

- id: system_standby_enable
  type: boolean
  property: system.standby.enable

- id: system_eco_enable
  type: boolean
  property: system.eco.enable

- id: shutter_position
  type: enum
  property: optics.shutter.position
  values:
    - Open
    - Closed

- id: shutter_target
  type: enum
  property: optics.shutter.target
  values:
    - Open
    - Closed

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
```

## Events

```yaml
- id: property_changed
  type: notification
  method: property.changed
  payload: property/value pairs

- id: signal_callback
  type: notification
  method: signal.callback
  payload: signal/argument-list pairs

- id: model_updated
  type: signal
  name: modelupdated

- id: introspect_object_changed
  type: signal
  name: introspect.objectchanged
```

## Macros

```yaml
- id: upload_and_enable_warp_file
  label: Upload and Enable Warp File
  steps:
    - http_post_warp_file
    - select_warp_file
    - enable_warp_file

- id: upload_and_enable_blend_mask
  label: Upload and Enable Blend Mask
  steps:
    - http_post_blend_file
    - select_blend_file
    - enable_blend_file

- id: upload_and_enable_blacklevel_mask
  label: Upload and Enable Black Level Mask
  steps:
    - http_post_blacklevel_file
    - select_blacklevel_file
    - enable_blacklevel_file
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - Verify system.state is standby or ready before system.poweron.
  - Verify system.state is on before system.poweroff.
```

## Notes

Pulse API availability can depend on projector configuration and peripherals. Introspection is documented as the best way to determine the exact API exposed by a projector.

Property.set confirmation should be awaited before setting the same property again, because continuous writes may flood the server and reduce performance.

HTTP file endpoint base pattern is `http://{projector-address}/api`.

RS-232 ECO wake command is `:POWR1\r`.

<!-- UNRESOLVED: Device-specific source list, connector list, dynamic API objects, and exact file endpoint availability may vary. -->
<!-- UNRESOLVED: Secret pass code format and value are not specified for normal end-user access. -->
<!-- UNRESOLVED: Error response structure and recovery sequence are not fully specified. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:09:43.199Z
last_checked_at: 2026-08-05T08:04:57.836Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:04:57.836Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions map to JSON-RPC methods documented verbatim in the refined source; transport values (port 9090, RS232 params) are also source-verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device-specific API availability depends on projector configuration and peripherals."
- "Firmware compatibility not stated in source."
- "Device-specific source list, connector list, dynamic API objects, and exact file endpoint availability may vary."
- "Secret pass code format and value are not specified for normal end-user access."
- "Error response structure and recovery sequence are not fully specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
