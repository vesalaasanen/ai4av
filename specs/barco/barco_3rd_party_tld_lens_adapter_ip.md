---
spec_id: admin/barco-3rd-party-tld-lens-adapter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 3Rd Party Tld Lens Adapter Control Spec"
manufacturer: Barco
model_family: "3Rd Party Tld Lens Adapter"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "3Rd Party Tld Lens Adapter"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:10:29.842Z
last_checked_at: 2026-07-21T20:46:28.909Z
generated_at: 2026-07-21T20:46:28.909Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Pulse projector API catalog and does not explicitly identify the 3Rd Party Tld Lens Adapter model."
  - "firmware compatibility is not stated in source."
  - "source does not state firmware version compatibility."
  - "source does not establish that every documented Pulse API member is available with the named lens adapter."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:46:28.909Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched to documented Pulse API; transport parameters verified; generic invoke/subscribe methods enable full coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-18
---

# Barco 3Rd Party Tld Lens Adapter Control Spec

## Summary

Control spec for Barco Pulse projectors using JSON-RPC over TCP/IP or RS-232, plus HTTP file endpoints. It covers projector power, source routing, illumination, picture settings, warp and blend files, environment monitoring, optics, DMX, firmware, subscriptions, and introspection.

<!-- UNRESOLVED: source is a generic Pulse projector API catalog and does not explicitly identify the 3Rd Party Tld Lens Adapter model. -->
<!-- UNRESOLVED: firmware compatibility is not stated in source. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector-address}/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode
  required_for: elevated_access
```

Normal end-user access may skip authentication. Elevated access starts with the `authenticate` JSON-RPC request containing a secret pass code.

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  params:
    - name: code
      type: integer
      description: Secret pass code
    - name: id
      type: integer
      description: Request identifier

- id: invoke_method
  label: Invoke Method
  kind: action
  command: '{"jsonrpc":"2.0","method":"{method}","params":{params},"id":{id}}'
  params:
    - name: method
      type: string
      description: Dot-notation method name
    - name: params
      type: object
      description: Named method parameters
    - name: id
      type: integer
      description: Request identifier

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: value
      type: object
      description: Property value
    - name: id
      type: integer
      description: Request identifier

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: id
      type: integer
      description: Request identifier

- id: get_properties
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{properties}},"id":{id}}'
  params:
    - name: properties
      type: array
      description: Property names
    - name: id
      type: integer
      description: Request identifier

- id: subscribe_property
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: object
      description: Property name or array of property names
    - name: id
      type: integer
      description: Request identifier

- id: unsubscribe_property
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: object
      description: Property name or array of property names
    - name: id
      type: integer
      description: Request identifier

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: object
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: Request identifier

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: object
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: Request identifier

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name; empty string introspects everything
    - name: recursive
      type: boolean
      description: Whether child objects are included recursively
    - name: id
      type: integer
      description: Request identifier

- id: system_power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: serial_eco_wake
  label: Wake from ECO over RS-232
  kind: action
  command: ":POWR1\\r"
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: list_source_connectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors","id":{id}}'
  params:
    - name: source
      type: string
      description: Lowercase source name with non-word characters removed
    - name: id
      type: integer
      description: Request identifier

- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'
  params:
    - name: source
      type: string
      description: Source name returned by image.source.list
    - name: id
      type: integer
      description: Request identifier

- id: get_projector_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_detected_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"},"id":{id}}'
  params:
    - name: connector
      type: string
      description: Lowercase connector name with non-word characters removed
    - name: id
      type: integer
      description: Request identifier

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_illumination_power
  label: Get Laser Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: set_illumination_power
  label: Set Laser Illumination Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Target power percentage
    - name: id
      type: integer
      description: Request identifier

- id: get_illumination_minimum
  label: Get Minimum Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_illumination_maximum
  label: Get Maximum Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: engage_clo
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      minimum: -1
      maximum: 1
      precision: 0.01
      description: Normalized brightness offset
    - name: id
      type: integer
      description: Request identifier

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      minimum: 0
      maximum: 2
      precision: 0.01
      description: Normalized contrast gain
    - name: id
      type: integer
      description: Request identifier

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      minimum: 1
      maximum: 3
      precision: 0.1
      description: Image gamma
    - name: id
      type: integer
      description: Request identifier

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      minimum: 0
      maximum: 2
      precision: 0.01
      description: Normalized color saturation
    - name: id
      type: integer
      description: Request identifier

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      minimum: -2
      maximum: 8
      description: Image sharpness
    - name: id
      type: integer
      description: Request identifier

- id: set_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: enum
      values:
        - DESKTOP_FRONT
        - DESKTOP_REAR
        - CEILING_FRONT
        - CEILING_REAR
    - name: id
      type: integer
      description: Request identifier

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: enum
      values:
        - Fill
        - OneToOne
        - FillScreen
        - Stretch
    - name: id
      type: integer
      description: Request identifier

- id: enable_warp
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: Request identifier

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: enable_warp_file
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: Request identifier

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: "POST http://{projector-address}/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: enable_blend_file
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: Request identifier

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: select_black_level_file
  label: Select Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: enable_black_level_file
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: Request identifier

- id: upload_black_level_file
  label: Upload Black-Level Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: get_environment_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{value_type}"},"id":{id}}'
  params:
    - name: type
      type: enum
      values:
        - Sensor
        - Filter
        - Controller
        - Actuator
        - Alarm
        - GenericBlock
    - name: value_type
      type: string
      description: Documented sensor value type
    - name: id
      type: integer
      description: Request identifier

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_alarm_info
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: list_firmware_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: schedule_firmware_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: copy_p7_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: reset_p7_preset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: reset_p7_to_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: next_rgb_mode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier
```

## Feedbacks

```yaml
- id: authentication_result
  type: boolean
  response_field: result

- id: property_set_confirmation
  type: boolean
  response_field: result

- id: property_value
  type: object
  response_field: result

- id: projector_state
  type: enum
  property: system.state
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - "on"
    - service
    - deconditioning
    - error

- id: active_source
  type: string
  property: image.window.main.source

- id: available_sources
  type: array
  method: image.source.list

- id: available_connectors
  type: array
  method: image.connector.list

- id: detected_signal
  type: object
  property: image.connector.l1hdmi.detectedsignal

- id: illumination_state
  type: enum
  property: illumination.state
  values:
    - "On"
    - "Off"

- id: illumination_power
  type: float
  property: illumination.sources.laser.power

- id: illumination_minimum_power
  type: float
  property: illumination.sources.laser.minpower

- id: illumination_maximum_power
  type: float
  property: illumination.sources.laser.maxpower

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

- id: environment_alarm_state
  type: enum
  property: environment.alarmstate
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: firmware_components
  type: array
  method: firmware.listcomponents

- id: firmware_component_version_status
  type: array
  method: firmware.listcomponentversionstatus
```

## Variables

```yaml
- id: active_source
  property: image.window.main.source
  type: string

- id: window_position
  property: image.window.main.position
  type: object
  fields:
    x: integer
    y: integer

- id: window_size
  property: image.window.main.size
  type: object
  fields:
    width: integer
    height: integer

- id: scaling_mode
  property: image.window.main.scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: brightness
  property: image.brightness
  type: float
  minimum: -1
  maximum: 1
  precision: 0.01
  default: 0

- id: contrast
  property: image.contrast
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01
  default: 1

- id: gamma
  property: image.gamma
  type: float
  minimum: 1
  maximum: 3
  precision: 0.1
  default: 2.2

- id: saturation
  property: image.saturation
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01
  default: 1

- id: sharpness
  property: image.sharpness
  type: integer
  minimum: -2
  maximum: 8
  precision: 1

- id: orientation
  property: image.orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: warp_enabled
  property: image.processing.warp.enable
  type: boolean

- id: warp_file_enabled
  property: image.processing.warp.file.enable
  type: boolean

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string

- id: blend_file_enabled
  property: image.processing.blend.file.enable
  type: boolean

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array

- id: black_level_file_enabled
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: black_level_file_selected
  property: image.processing.blacklevel.file.selected
  type: string

- id: dmx_mode
  property: dmx.mode
  type: string

- id: dmx_start_channel
  property: dmx.startchannel
  type: integer
  minimum: 1
  maximum: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean

- id: ipv4_configuration
  property: network.device.lan.ip4config
  type: object
  fields:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values:
    - Open
    - Closed

- id: zoom_position
  property: optics.zoom.position
  type: integer

- id: focus_position
  property: optics.focus.position
  type: integer

- id: horizontal_lens_shift_position
  property: optics.lensshift.horizontal.position
  type: integer

- id: vertical_lens_shift_position
  property: optics.lensshift.vertical.position
  type: integer

- id: standby_enabled
  property: system.standby.enable
  type: boolean

- id: eco_enabled
  property: system.eco.enable
  type: boolean
```

## Events

```yaml
- id: property_changed
  method: property.changed
  payload_type: array
  description: Property and value pairs changed after subscription

- id: signal_callback
  method: signal.callback
  payload_type: array
  description: Signal and argument-list pairs received after subscription

- id: model_updated
  signal: modelupdated
  description: Object structure changed because objects were added or removed

- id: introspect_object_changed
  signal: introspect.objectchanged
  payload_type: object
  description: Reports object name and whether object is new or lost
```

## Macros

```yaml
- id: activate_warp_file
  steps:
    - upload_warp_file
    - select_warp_file
    - enable_warp_file

- id: activate_blend_mask
  steps:
    - upload_blend_file
    - select_blend_file
    - enable_blend_file

- id: activate_black_level_mask
  steps:
    - upload_black_level_file
    - select_black_level_file
    - enable_black_level_file
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - action: system_power_on
    condition: system.state must be standby or ready
  - action: system_power_off
    condition: system.state should be on
  - action: set_property
    condition: wait for property.set confirmation before setting the same property again
```

## Notes

JSON-RPC parameters are passed by name, and their order does not matter. Notifications omit the request identifier and require no response. Subscribing does not return the current property value; issue `property.get` separately.

Available objects and properties vary by projector model, peripherals, lens capabilities, and configuration. Use `introspect` to discover the exact API exposed by a specific projector.

Normal end-user access requires no authentication. Authentication with a secret pass code is required only when requesting a higher access level.

HTTP file endpoints support downloads and multipart uploads. Warp, blend, and black-level mask support depends on projector configuration.

<!-- UNRESOLVED: source does not state firmware version compatibility. -->
<!-- UNRESOLVED: source does not establish that every documented Pulse API member is available with the named lens adapter. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:10:29.842Z
last_checked_at: 2026-07-21T20:46:28.909Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:46:28.909Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched to documented Pulse API; transport parameters verified; generic invoke/subscribe methods enable full coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Pulse projector API catalog and does not explicitly identify the 3Rd Party Tld Lens Adapter model."
- "firmware compatibility is not stated in source."
- "source does not state firmware version compatibility."
- "source does not establish that every documented Pulse API member is available with the named lens adapter."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
