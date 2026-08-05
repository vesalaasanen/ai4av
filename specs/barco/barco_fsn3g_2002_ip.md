---
spec_id: admin/barco-fsn3g-2002
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fsn3G 2002 Control Spec"
manufacturer: Barco
model_family: "Barco Fsn3G 2002"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Fsn3G 2002"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:16:39.551Z
last_checked_at: 2026-08-05T08:05:15.881Z
generated_at: 2026-08-05T08:05:15.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Exact Fsn3G 2002-specific API availability depends on projector configuration and must be confirmed through introspection."
  - "Authentication secret pass-code format and credentials not stated in source."
  - "Exact Fsn3G 2002-specific source, connector, illumination, lens, DMX, environment, firmware, and image API availability not fully identified."
  - "Firmware compatibility ranges not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:05:15.881Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions map verbatim to JSON-RPC methods, HTTP file endpoints, or the RS-232 wake sequence documented in the source; transport parameters match exactly. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco Fsn3G 2002 Control Spec

## Summary

Barco Fsn3G 2002 projector exposes Pulse API control over TCP/IP and RS-232. TCP service uses port 9090; JSON-RPC methods control power, sources, illumination, image processing, introspection, environment data, firmware, and file endpoints.

<!-- UNRESOLVED: Exact Fsn3G 2002-specific API availability depends on projector configuration and must be confirmed through introspection. -->

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
  type: secret_code  # Authentication request requires secret pass code for elevated access; normal end-user access may skip authentication.
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from image.window.main.source and source-management commands
- queryable  # inferred from property.get, introspect, and list/query methods
- levelable  # inferred from illumination and image-property controls
```

## Actions

```yaml
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: select_input
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Available source name returned by image.source.list.

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

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_get_multiple
  label: Read Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property}"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.
    - name: value
      type: any
      description: Value accepted by target property.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_subscribe_multiple
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property}"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property}"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Dot-notation signal name.

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal}"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Dot-notation signal name.

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal}"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: introspect_recursive
  label: Recursive Introspection
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",true]}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.

- id: introspect_nonrecursive
  label: Non-Recursive Introspection
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",false]}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.

- id: image_source_listconnectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: Lowercase source object name.

- id: environment_getcontrolblocks
  label: Read Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, or GenericBlock.
    - name: valuetype
      type: string
      description: Documented environment value type.

- id: environment_getalarminfo
  label: Read Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

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
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Read Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name.

- id: image_color_p7_custom_resetpreset
  label: Reset Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name.

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: warp_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local warp file path.
    - name: address
      type: string
      description: Projector network address.

- id: warp_select_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{file}"}}'
  params:
    - name: file
      type: string
      description: Uploaded warp filename.

- id: warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: blend_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local blend mask path.
    - name: address
      type: string
      description: Projector network address.

- id: blend_select_file
  label: Select Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{file}"}}'
  params:
    - name: file
      type: string
      description: Uploaded blend filename.

- id: blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: blacklevel_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local black-level mask path.
    - name: address
      type: string
      description: Projector network address.

- id: blacklevel_select_file
  label: Select Black Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{file}"}}'
  params:
    - name: file
      type: string
      description: Uploaded black-level filename.

- id: blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: eco_wake_serial
  label: Wake from ECO Mode
  kind: action
  command: ':POWR1\r'
  params: []
```

## Feedbacks

```yaml
- id: system_state
  type: enum
  property: system.state
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

- id: active_source
  type: string
  property: image.window.main.source

- id: illumination_state
  type: enum
  property: illumination.state
  values:
    - On
    - Off

- id: detected_signal
  type: object
  property: image.connector.{connector}.detectedsignal

- id: property_changed
  type: object
  property: property.changed

- id: signal_callback
  type: object
  property: signal.callback

- id: network_state
  type: enum
  property: network.device.lan.state
  values:
    - CONNECTED
    - DISCONNECTED

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

- id: environment_alarm_state
  type: enum
  property: environment.alarmstate
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
```

## Variables

```yaml
- id: laser_power
  type: float
  property: illumination.sources.laser.power
  range:
    min: 0
    max: 100

- id: image_brightness
  type: float
  property: image.brightness
  range:
    min: -1
    max: 1
  precision: 0.01

- id: image_contrast
  type: float
  property: image.contrast
  range:
    min: 0
    max: 2
  precision: 0.01

- id: image_gamma
  type: float
  property: image.gamma
  range:
    min: 1
    max: 3
  precision: 0.1

- id: image_saturation
  type: float
  property: image.saturation
  range:
    min: 0
    max: 2
  precision: 0.01

- id: image_sharpness
  type: integer
  property: image.sharpness
  range:
    min: -2
    max: 8

- id: image_window_position
  type: object
  property: image.window.main.position

- id: image_window_size
  type: object
  property: image.window.main.size

- id: image_scaling_mode
  type: enum
  property: image.window.main.scalingmode
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  type: enum
  property: image.orientation
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: selected_warp_file
  type: string
  property: image.processing.warp.file.selected

- id: selected_blend_file
  type: array
  property: image.processing.blend.file.selected

- id: selected_blacklevel_file
  type: string
  property: image.processing.blacklevel.file.selected

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_start_channel
  type: integer
  property: dmx.startchannel
  range:
    min: 1
    max: 512

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: network_ipv4_config
  type: object
  property: network.device.lan.ip4config

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

- id: standby_enabled
  type: boolean
  property: system.standby.enable

- id: eco_enabled
  type: boolean
  property: system.eco.enable
```

## Events

```yaml
- id: property_changed
  type: notification
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'

- id: signal_callback
  type: notification
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{arguments}}]}}'

- id: model_updated
  type: signal
  name: modelupdated
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"modelupdated":{arguments}}]}}'
```

## Macros

```yaml
- id: activate_uploaded_warp_file
  label: Upload, select, enable warp file
  steps:
    - action: warp_upload
    - action: warp_select_file
    - action: warp_file_enable

- id: activate_uploaded_blend_mask
  label: Upload, select, enable blend mask
  steps:
    - action: blend_upload
    - action: blend_select_file
    - action: blend_file_enable

- id: activate_uploaded_blacklevel_mask
  label: Upload, select, enable black-level mask
  steps:
    - action: blacklevel_upload
    - action: blacklevel_select_file
    - action: blacklevel_file_enable
```

## Safety

```yaml
confirmation_required_for:
  - system_poweroff
interlocks:
  - Verify system.state is standby or ready before system.poweron.
  - Verify system.state is on before system.poweroff.
```

## Notes

Pulse API availability varies by projector configuration and peripherals. Use introspection to determine exact available objects, methods, properties, and signals.

Wait for property.set confirmation before setting same property again; repeated writes without confirmation may flood server and reduce performance.

Authentication requires secret pass code for elevated access. Normal end-user access may skip authentication.

ECO-mode wake may require Wake-on-LAN, remote/keypad power button, or RS-232 command `:POWR1\r`.

<!-- UNRESOLVED: Authentication secret pass-code format and credentials not stated in source. -->
<!-- UNRESOLVED: Exact Fsn3G 2002-specific source, connector, illumination, lens, DMX, environment, firmware, and image API availability not fully identified. -->
<!-- UNRESOLVED: Firmware compatibility ranges not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:16:39.551Z
last_checked_at: 2026-08-05T08:05:15.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:05:15.881Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions map verbatim to JSON-RPC methods, HTTP file endpoints, or the RS-232 wake sequence documented in the source; transport parameters match exactly. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Exact Fsn3G 2002-specific API availability depends on projector configuration and must be confirmed through introspection."
- "Authentication secret pass-code format and credentials not stated in source."
- "Exact Fsn3G 2002-specific source, connector, illumination, lens, DMX, environment, firmware, and image API availability not fully identified."
- "Firmware compatibility ranges not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
