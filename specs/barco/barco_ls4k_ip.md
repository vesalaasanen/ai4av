---
spec_id: admin/barco-ls4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ls4K Control Spec"
manufacturer: Barco
model_family: Ls4K
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Ls4K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:11:05.765Z
last_checked_at: 2026-08-19T08:58:22.695Z
generated_at: 2026-08-19T08:58:22.695Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes a dynamic API whose exact availability depends on projector configuration and installed peripherals."
  - "passcode provisioning and valid credential format not stated in source"
  - "method parameters not stated in source\""
  - "firmware compatibility range and fault recovery procedures not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:58:22.695Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match documented JSON-RPC methods, HTTP file endpoints, and the serial wake command; transport parameters (port 9090, 19200 baud) verbatim in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Ls4K Control Spec

## Summary

Barco Ls4K projector exposes Pulse services through TCP/IP and RS-232 using JSON-RPC 2.0. HTTP endpoints support file upload and download for warp, blend, and black-level data.

<!-- UNRESOLVED: source describes a dynamic API whose exact availability depends on projector configuration and installed peripherals. -->

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
  normal_access: none
  # UNRESOLVED: passcode provisioning and valid credential format not stated in source
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from source selection commands
- queryable  # inferred from property.get and query methods
- levelable  # inferred from illumination and image level controls
```

## Actions

```yaml
- id: authenticate
  label: Authenticate for Elevated Access
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  params:
    - name: code
      type: integer
      description: Secret pass code
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: invoke_method
  label: Invoke Pulse Method
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
      description: JSON-RPC request identifier

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: value
      type: any
      description: Value compatible with property type
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name or array of names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name or array of names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name or array of names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Dot-notation signal name or array of names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Dot-notation signal name or array of names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: introspect
  label: Introspect Pulse Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name; empty value introspects everything
    - name: recursive
      type: boolean
      description: Whether child objects are recursively described
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: serial_eco_wake
  label: Wake from ECO over RS-232
  kind: action
  command: ':POWR1\r'
  params: []

- id: get_projector_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: subscribe_projector_state
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'
  params:
    - name: source
      type: string
      description: Source name returned by image.source.list
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":{id}}'
  params:
    - name: source_object
      type: string
      description: Source name stripped of non-word characters and converted to lowercase
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_connector_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
      description: Connector name stripped of non-word characters and converted to lowercase
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{level}},"id":{id}}'
  params:
    - name: level
      type: float
      description: Target power percentage within dynamic limits reported by projector
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: subscribe_laser_power
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_laser_minimum_power
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_laser_maximum_power
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

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
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: subscribe_brightness
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_warp_enabled
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/warp/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
      type: string
      description: Local warp file path

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_warp_file_enabled
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blend/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
      type: string
      description: Local PNG, JPEG, or TIFF mask path

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_blend_file_enabled
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: upload_black_level_mask
  label: Upload Black-Level Mask
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blacklevel/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
      type: string
      description: Local PNG, JPEG, or TIFF mask path

- id: select_black_level_file
  label: Select Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: set_black_level_file_enabled
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_environment_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{value_type}"},"id":{id}}'
  params:
    - name: type
      type: enum
      values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: value_type
      type: string
      description: Documented sensor value type
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: environment_get_alarm_info
  label: Get Environment Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{params},"id":{id}}'
  params:
    - name: params
      type: object
      description: "UNRESOLVED: method parameters not stated in source"
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: engage_clo
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: copy_color_preset_to_custom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: reset_custom_color_preset
  label: Reset Custom Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: reset_color_to_native
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: next_rgb_mode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier
```

## Feedbacks

```yaml
- id: authentication_result
  type: boolean
  response_field: result

- id: property_set_result
  type: boolean
  response_field: result

- id: property_value
  type: any
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
    - on
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
  property: "image.connector.{connector_object}.detectedsignal"

- id: illumination_state
  type: enum
  property: illumination.state
  values: [On, Off]

- id: laser_power
  type: float
  property: illumination.sources.laser.power

- id: laser_minimum_power
  type: float
  property: illumination.sources.laser.minpower

- id: laser_maximum_power
  type: float
  property: illumination.sources.laser.maxpower

- id: image_brightness
  type: float
  property: image.brightness

- id: environment_control_blocks
  type: dictionary
  method: environment.getcontrolblocks

- id: environment_alarm_state
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  property: optics.shutter.position
  values: [Open, Closed]
```

## Variables

```yaml
- id: active_source
  property: image.window.main.source
  type: string
  access: read_write

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  description: Target power percentage; minimum and maximum are dynamic

- id: image_brightness
  property: image.brightness
  type: float
  access: read_write
  minimum: -1
  maximum: 1
  precision: 0.01
  default: 0

- id: image_contrast
  property: image.contrast
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  precision: 0.01
  default: 1

- id: image_gamma
  property: image.gamma
  type: float
  access: read_write
  minimum: 1
  maximum: 3
  precision: 0.1
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  precision: 0.01
  default: 1

- id: image_sharpness
  property: image.sharpness
  type: integer
  access: read_write
  minimum: -2
  maximum: 8
  precision: 1

- id: image_orientation
  property: image.orientation
  type: enum
  access: read_write
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_scaling_mode
  property: image.window.main.scalingmode
  type: enum
  access: read_write
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: warp_enabled
  property: image.processing.warp.enable
  type: boolean
  access: read_write

- id: warp_file_enabled
  property: image.processing.warp.file.enable
  type: boolean
  access: read_write

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: read_write

- id: blend_file_enabled
  property: image.processing.blend.file.enable
  type: boolean
  access: read_write

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  access: read_write

- id: black_level_file_enabled
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- id: black_level_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: read_write

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write

- id: dmx_start_channel
  property: dmx.startchannel
  type: integer
  access: read_write
  minimum: 1
  maximum: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write

- id: shutter_target
  property: optics.shutter.target
  type: enum
  access: read_write
  values: [Open, Closed]

- id: standby_enabled
  property: system.standby.enable
  type: boolean
  access: read_write

- id: eco_enabled
  property: system.eco.enable
  type: boolean
  access: read_write
```

## Events

```yaml
- id: property_changed
  method: property.changed
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{property_value_pairs}]}}'
  description: Unsolicited notification carrying property/value pairs; contains no id and requires no response

- id: signal_callback
  method: signal.callback
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{signal_argument_pairs}]}}'
  description: Unsolicited notification carrying signal/argument-list pairs; contains no id and requires no response

- id: model_updated
  signal: modelupdated
  description: Triggered when objects are added or removed
```

## Macros

```yaml
- id: select_active_source
  label: Select Active Source Safely
  steps:
    - command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'

- id: activate_warp_file
  label: Upload and Activate Warp File
  steps:
    - command: 'POST http://{projector-address}/api/image/processing/warp/file/transfer multipart/form-data file=@{file}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - command: 'POST http://{projector-address}/api/image/processing/blend/file/transfer multipart/form-data file=@{file}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'

- id: activate_black_level_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - command: 'POST http://{projector-address}/api/image/processing/blacklevel/file/transfer multipart/form-data file=@{file}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
```

## Safety

```yaml
confirmation_required_for:
  - firmware_schedule_component_upgrade
interlocks:
  - action: power_on
    requirement: Verify system.state is standby or ready before issuing command
  - action: power_off
    requirement: Verify system.state is on before issuing command
  - action: property_set
    requirement: Wait for property.set confirmation before setting same property again
  - action: set_laser_power
    requirement: Read dynamic minimum and maximum power levels before setting value
  - action: serial_eco_wake
    requirement: Use only when projector is in ECO mode
```

## Notes

Pulse object, property, method, and signal availability is dynamic. Installed lenses, peripherals, configuration, and access level can change exposed API members; use `introspect` to discover exact projector capabilities.

Normal end-user access may skip authentication. Elevated access starts with an `authenticate` request containing a secret pass code.

Property subscriptions report later changes only. Use `property.get` separately to obtain current value.

Notifications contain no request identifier, and client must not return a response.

Source-selection notifications can arrive twice: first with an empty source while old source is deselected, then with newly selected source.

HTTP file endpoints may support upload, download, or both. Supported blend and black-level image formats are PNG, JPEG, and TIFF; grayscale data is used, with blue channel selected from color images.

<!-- UNRESOLVED: firmware compatibility range and fault recovery procedures not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:11:05.765Z
last_checked_at: 2026-08-19T08:58:22.695Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:58:22.695Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match documented JSON-RPC methods, HTTP file endpoints, and the serial wake command; transport parameters (port 9090, 19200 baud) verbatim in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes a dynamic API whose exact availability depends on projector configuration and installed peripherals."
- "passcode provisioning and valid credential format not stated in source"
- "method parameters not stated in source\""
- "firmware compatibility range and fault recovery procedures not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
