---
spec_id: admin/barco-ac-cm01
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ac Cm01 Control Spec"
manufacturer: Barco
model_family: "Ac Cm01"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Ac Cm01"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-22T05:28:13.581Z
last_checked_at: 2026-07-22T07:36:22.780Z
generated_at: 2026-07-22T07:36:22.780Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol compatibility with specific firmware versions not stated in source."
  - "valid passcode values and provisioning procedure not stated in source"
  - "method parameters not stated in source\""
  - "request framing and terminator rules for JSON-RPC over TCP and serial not stated in source."
  - "timeout, retry, and reconnect behavior not stated in source."
  - "valid authentication passcodes and provisioning procedure not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:36:22.780Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions match wire-level tokens in source; semantic-id convention maps property/method combinations to distinct action IDs; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Barco Ac Cm01 Control Spec

## Summary

Barco Ac Cm01 is a Pulse projector controlled through JSON-RPC over TCP/IP or RS-232. HTTP endpoints support file transfer for warp, blend, and black-level data.

<!-- UNRESOLVED: protocol compatibility with specific firmware versions not stated in source. -->

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
  optional_for_normal_access: true
  request_method: authenticate
  credential_field: code
  # UNRESOLVED: valid passcode values and provisioning procedure not stated in source
```

## Traits

```yaml
- powerable  # inferred from power command examples
- routable  # inferred from source-routing command examples
- queryable  # inferred from property and method query examples
- levelable  # inferred from illumination and image-level controls
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
      description: Secret passcode
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
    - name: params
      type: object
    - name: id
      type: integer

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
    - name: value
      type: any
    - name: id
      type: integer

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: integer

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: integer

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: integer

- id: signal_subscribe
  label: Subscribe to Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
    - name: id
      type: integer

- id: signal_unsubscribe
  label: Unsubscribe from Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
    - name: id
      type: integer

- id: introspect
  label: Introspect API Objects
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean
    - name: id
      type: integer

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
  command: ":POWR1\\r"
  params: []

- id: get_projector_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: subscribe_projector_state
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: integer

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'
  params:
    - name: source
      type: string
      description: Name returned by image.source.list
    - name: id
      type: integer

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: integer

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":{id}}'
  params:
    - name: source_object
      type: string
      description: Lowercase source name with non-word characters removed
    - name: id
      type: integer

- id: get_connector_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
    - name: id
      type: integer

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: get_illumination_power
  label: Get Laser Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: set_illumination_power
  label: Set Laser Illumination Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Target illumination percentage; query dynamic limits before setting
    - name: id
      type: integer

- id: get_illumination_min_power
  label: Get Minimum Laser Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: get_illumination_max_power
  label: Get Maximum Laser Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: get_image_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: set_image_brightness
  label: Set Image Brightness
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

- id: enable_warp
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_warp_file
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/warp/file/transfer multipart/form-data file=@{filename}'
  params:
    - name: projector-address
      type: string
    - name: filename
      type: string

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_blend_file
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_blend_file
  label: Upload Blend File
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blend/file/transfer multipart/form-data file=@{filename}'
  params:
    - name: projector-address
      type: string
    - name: filename
      type: string

- id: select_black_level_file
  label: Select Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_black_level_file
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_black_level_file
  label: Upload Black-Level File
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blacklevel/file/transfer multipart/form-data file=@{filename}'
  params:
    - name: projector-address
      type: string
    - name: filename
      type: string

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
    - name: id
      type: integer

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: integer

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: integer

- id: environment_get_alarm_info
  label: Get Environment Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: integer

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: integer

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: integer

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

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer

- id: copy_p7_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer

- id: reset_p7_custom_preset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer

- id: reset_p7_to_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: integer

- id: next_rgb_mode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: integer
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
    - "on"
    - service
    - deconditioning
    - error

- id: active_source
  type: string
  property: image.window.main.source

- id: available_sources
  type: array
  response_field: result

- id: available_connectors
  type: array
  response_field: result

- id: detected_signal
  type: object
  property: "image.connector.{connector_object}.detectedsignal"

- id: illumination_state
  type: enum
  property: illumination.state
  values: ["On", "Off"]

- id: illumination_power
  type: float
  property: illumination.sources.laser.power

- id: illumination_min_power
  type: float
  property: illumination.sources.laser.minpower

- id: illumination_max_power
  type: float
  property: illumination.sources.laser.maxpower

- id: image_brightness
  type: float
  property: image.brightness

- id: environment_control_blocks
  type: dictionary
  response_field: result

- id: error
  type: object
  response_field: error
```

## Variables

```yaml
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
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: brightness
  property: image.brightness
  type: float
  minimum: -1
  maximum: 1
  precision: 0.01

- id: contrast
  property: image.contrast
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: gamma
  property: image.gamma
  type: float
  minimum: 1
  maximum: 3
  precision: 0.1

- id: saturation
  property: image.saturation
  type: float
  minimum: 0
  maximum: 2
  precision: 0.01

- id: sharpness
  property: image.sharpness
  type: integer
  minimum: -2
  maximum: 8

- id: orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

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

- id: network_state
  property: network.device.lan.state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  property: optics.shutter.position
  type: enum
  values: [Open, Closed]

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]

- id: zoom_position
  property: optics.zoom.position
  type: integer

- id: focus_position
  property: optics.focus.position
  type: integer

- id: horizontal_lens_shift
  property: optics.lensshift.horizontal.position
  type: integer

- id: vertical_lens_shift
  property: optics.lensshift.vertical.position
  type: integer

- id: standby_enabled
  property: system.standby.enable
  type: boolean

- id: eco_enabled
  property: system.eco.enable
  type: boolean

- id: environment_alarm_state
  property: environment.alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

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
```

## Events

```yaml
- id: property_changed
  method: property.changed
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{property_values}]}}'
  description: Carries an array of changed property/value pairs

- id: signal_callback
  method: signal.callback
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{signal_arguments}]}}'
  description: Carries an array of signal/argument-list pairs

- id: model_updated
  signal: modelupdated
  description: Triggered when objects are added or removed

- id: introspect_object_changed
  signal: introspect.objectchanged
  description: Reports object name and whether object is new or lost
```

## Macros

```yaml
- id: activate_warp_file
  label: Upload and Activate Warp File
  steps:
    - Upload file using HTTP POST to /api/image/processing/warp/file/transfer
    - Set image.processing.warp.file.selected to uploaded filename
    - Set image.processing.warp.file.enable to true

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - Upload file using HTTP POST to /api/image/processing/blend/file/transfer
    - Set image.processing.blend.file.selected to uploaded filename
    - Set image.processing.blend.file.enable to true

- id: activate_black_level_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - Upload file using HTTP POST to /api/image/processing/blacklevel/file/transfer
    - Set image.processing.blacklevel.file.selected to uploaded filename
    - Set image.processing.blacklevel.file.enable to true
```

## Safety

```yaml
confirmation_required_for:
  - firmware_schedule_component_upgrade
interlocks:
  - action: power_on
    condition: system.state must be standby or ready
  - action: power_off
    condition: system.state must be "on"
  - action: serial_eco_wake
    condition: projector is in ECO mode
  - action: property_set
    condition: wait for property.set confirmation before setting same property again
```

## Notes

Normal end-user access may skip authentication; higher access levels require an authentication request containing a secret passcode. JSON-RPC parameter order does not matter. Notifications omit request IDs and require no response. Subscribing does not return current property state; issue `property.get` separately. Dynamic API availability depends on projector configuration and attached peripherals, so introspection gives authoritative object availability. Powering on a projector in ECO mode requires Wake-on-LAN, physical controls, or RS-232 command `:POWR1\r`.

<!-- UNRESOLVED: request framing and terminator rules for JSON-RPC over TCP and serial not stated in source. -->
<!-- UNRESOLVED: timeout, retry, and reconnect behavior not stated in source. -->
<!-- UNRESOLVED: valid authentication passcodes and provisioning procedure not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-22T05:28:13.581Z
last_checked_at: 2026-07-22T07:36:22.780Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:36:22.780Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions match wire-level tokens in source; semantic-id convention maps property/method combinations to distinct action IDs; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol compatibility with specific firmware versions not stated in source."
- "valid passcode values and provisioning procedure not stated in source"
- "method parameters not stated in source\""
- "request framing and terminator rules for JSON-RPC over TCP and serial not stated in source."
- "timeout, retry, and reconnect behavior not stated in source."
- "valid authentication passcodes and provisioning procedure not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
