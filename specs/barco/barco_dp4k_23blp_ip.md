---
spec_id: admin/barco-dp4k-23blp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Dp4K 23Blp Control Spec"
manufacturer: Barco
model_family: "Dp4K 23Blp"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Dp4K 23Blp"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:18:37.441Z
last_checked_at: 2026-08-05T07:27:24.750Z
generated_at: 2026-08-05T07:27:24.750Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes dynamic APIs whose availability depends on projector configuration and attached peripherals."
  - "secret pass code is installation-specific"
  - "firmware compatibility range and protocol framing details are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:27:24.750Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions match literal method names/property paths/HTTP endpoints in the refined source; transport (port 9090, 19200 8N1) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Dp4K 23Blp Control Spec

## Summary

Barco Dp4K 23Blp projector control spec covering Pulse JSON-RPC services over TCP/IP and RS-232, HTTP file transfer endpoints, projector operation, image processing, illumination, optics, DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: source describes dynamic APIs whose availability depends on projector configuration and attached peripherals. -->

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
  credentials:
    code: null  # UNRESOLVED: secret pass code is installation-specific
  notes: Authentication may be skipped for normal end-user access; higher access levels require authenticate.
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from source-selection commands
- queryable  # inferred from property.get and query methods
- levelable  # inferred from image and illumination level controls
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
    - name: params
      type: object
    - name: id
      type: integer

- id: set_property
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

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
    - name: id
      type: integer

- id: get_multiple_properties
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{properties}},"id":{id}}'
  params:
    - name: properties
      type: array
    - name: id
      type: integer

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: any
      description: Property name or array of property names
    - name: id
      type: integer

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: any
      description: Property name or array of property names
    - name: id
      type: integer

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: any
      description: Signal name or array of signal names
    - name: id
      type: integer

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: any
      description: Signal name or array of signal names
    - name: id
      type: integer

- id: introspect
  label: Introspect API Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name; empty string introspects everything
    - name: recursive
      type: boolean
      description: Defaults to true
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
  command: ":POWR1\r"
  params: []

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: subscribe_system_state
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
      description: Source name stripped of non-word characters and converted to lowercase
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

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}},"id":{id}}'
  params:
    - name: power
      type: float
      description: Target power percentage; supported range is dynamic
    - name: id
      type: integer

- id: get_laser_minimum_power
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: get_laser_maximum_power
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer

- id: engage_clo
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer

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
    - name: id
      type: integer

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
    - name: id
      type: integer

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
    - name: id
      type: integer

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      minimum: -2
      maximum: 8
    - name: id
      type: integer

- id: set_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"},"id":{id}}'
  params:
    - name: orientation
      type: enum
      values:
        - DESKTOP_FRONT
        - DESKTOP_REAR
        - CEILING_FRONT
        - CEILING_REAR
    - name: id
      type: integer

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}},"id":{id}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
    - name: id
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}},"id":{id}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer
    - name: id
      type: integer

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: enum
      values:
        - Fill
        - OneToOne
        - FillScreen
        - Stretch
    - name: id
      type: integer

- id: set_warp_enabled
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/warp/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
      type: string

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: set_warp_file_enabled
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blend/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
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

- id: set_blend_file_enabled
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: upload_black_level_mask
  label: Upload Black-Level Mask
  kind: action
  command: 'POST http://{projector-address}/api/image/processing/blacklevel/file/transfer multipart/form-data file=@{file}'
  params:
    - name: projector-address
      type: string
    - name: file
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

- id: set_black_level_file_enabled
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: string
    - name: id
      type: integer

- id: set_dmx_start_channel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}},"id":{id}}'
  params:
    - name: channel
      type: integer
      minimum: 1
      maximum: 512
    - name: id
      type: integer

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: integer

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: integer

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"},"id":{id}}'
  params:
    - name: target
      type: enum
      values:
        - Open
        - Closed
    - name: id
      type: integer

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer

- id: set_horizontal_lens_shift
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer

- id: set_vertical_lens_shift
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer

- id: set_standby_enabled
  label: Enable or Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

- id: set_eco_enabled
  label: Enable or Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer

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
      description: Documented environment value type
    - name: id
      type: integer

- id: get_alarm_info
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: integer

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: integer

- id: list_firmware_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: integer

- id: schedule_firmware_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":{id}}'
  params:
    - name: id
      type: integer
  notes: Source states this forces a component upgrade at the following reboot, but does not document parameters.

- id: copy_color_preset_to_custom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer

- id: reset_custom_color_preset
  label: Reset Custom Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer

- id: reset_color_to_native
  label: Reset Color to Native
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

- id: property_set_result
  type: boolean
  response_field: result

- id: property_value
  type: any
  response_field: result

- id: system_state
  type: enum
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
  source: system.state

- id: active_source
  type: string
  source: image.window.main.source

- id: available_sources
  type: array
  source: image.source.list

- id: available_connectors
  type: array
  source: image.connector.list

- id: detected_signal
  type: object
  source: image.connector.{connector}.detectedsignal

- id: illumination_state
  type: enum
  values:
    - On
    - Off
  source: illumination.state

- id: laser_power
  type: float
  source: illumination.sources.laser.power

- id: laser_minimum_power
  type: float
  source: illumination.sources.laser.minpower

- id: laser_maximum_power
  type: float
  source: illumination.sources.laser.maxpower

- id: network_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED
  source: network.device.lan.state

- id: shutter_position
  type: enum
  values:
    - Open
    - Closed
  source: optics.shutter.position

- id: environment_alarm_state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
  source: environment.alarmstate

- id: environment_control_blocks
  type: object
  source: environment.getcontrolblocks

- id: environment_alarm_info
  type: array
  source: environment.getalarminfo

- id: firmware_components
  type: array
  source: firmware.listcomponents

- id: firmware_component_version_status
  type: array
  source: firmware.listcomponentversionstatus
```

## Variables

```yaml
- id: image_window_main_source
  type: string
  access: read_write

- id: image_window_main_position
  type: object
  access: read_write
  fields:
    x: integer
    y: integer

- id: image_window_main_size
  type: object
  access: read_write
  fields:
    width: integer
    height: integer

- id: image_window_main_scaling_mode
  type: enum
  access: read_write
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_brightness
  type: float
  access: read_write
  minimum: -1
  maximum: 1
  precision: 0.01

- id: image_contrast
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_gamma
  type: float
  access: read_write
  minimum: 1
  maximum: 3
  precision: 0.1
  default: 2.2

- id: image_saturation
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  precision: 0.01

- id: image_sharpness
  type: integer
  access: read_write
  minimum: -2
  maximum: 8

- id: image_orientation
  type: enum
  access: read_write
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: illumination_laser_power
  type: float
  access: read_write
  unit: percent
  notes: Minimum and maximum are dynamic and must be queried.

- id: illumination_laser_minimum_power
  type: float
  access: read_only
  unit: percent

- id: illumination_laser_maximum_power
  type: float
  access: read_only
  unit: percent

- id: dmx_mode
  type: string
  access: read_write

- id: dmx_start_channel
  type: integer
  access: read_write
  minimum: 1
  maximum: 512

- id: dmx_shutdown
  type: boolean
  access: read_write

- id: network_ipv4_configuration
  type: object
  access: read_only
  fields:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string

- id: optics_shutter_target
  type: enum
  access: read_write
  values:
    - Open
    - Closed

- id: optics_zoom_position
  type: integer
  access: read_write

- id: optics_focus_position
  type: integer
  access: read_write

- id: optics_lens_shift_horizontal_position
  type: integer
  access: read_write

- id: optics_lens_shift_vertical_position
  type: integer
  access: read_write

- id: system_standby_enabled
  type: boolean
  access: read_write

- id: system_eco_enabled
  type: boolean
  access: read_write

- id: warp_enabled
  type: boolean
  access: read_write

- id: warp_file_enabled
  type: boolean
  access: read_write

- id: warp_file_selected
  type: string
  access: read_write

- id: blend_file_enabled
  type: boolean
  access: read_write

- id: blend_files_selected
  type: array
  access: read_write
  items: string

- id: black_level_file_enabled
  type: boolean
  access: read_write

- id: black_level_file_selected
  type: string
  access: read_write
```

## Events

```yaml
- id: property_changed
  method: property.changed
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{property-value-pairs}]}}'
  description: Unsolicited property-change notification; has no request identifier and requires no response.

- id: signal_callback
  method: signal.callback
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{signal-argument-pairs}]}}'
  description: Unsolicited subscribed-signal notification; has no request identifier and requires no response.

- id: model_updated
  signal: modelupdated
  description: Triggered when objects are added or removed.
```

## Macros

```yaml
- id: activate_warp_grid
  label: Upload and Activate Warp Grid
  steps:
    - Upload warp file through HTTP POST to /api/image/processing/warp/file/transfer.
    - Set image.processing.warp.file.selected to uploaded filename.
    - Set image.processing.warp.file.enable to true.

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - Upload blend mask through HTTP POST to /api/image/processing/blend/file/transfer.
    - Set image.processing.blend.file.selected to uploaded filename.
    - Set image.processing.blend.file.enable to true.

- id: activate_black_level_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - Upload black-level mask through HTTP POST to /api/image/processing/blacklevel/file/transfer.
    - Set image.processing.blacklevel.file.selected to uploaded filename.
    - Set image.processing.blacklevel.file.enable to true.
```

## Safety

```yaml
confirmation_required_for:
  - firmware.schedulecomponentupgrade
interlocks:
  - operation: system.poweron
    requirement: Verify system.state is standby or ready before issuing command.
  - operation: system.poweroff
    requirement: Verify system.state is on before issuing command.
  - operation: property.set
    requirement: Wait for confirmation before setting same property again.
  - operation: illumination.sources.laser.power
    requirement: Query dynamic minimum and maximum power before setting target.
  - operation: system_eco_wake
    requirement: Network power-on requires Wake-on-LAN while projector is in ECO mode; RS-232 wake uses the documented special command.
```

## Notes

Normal end-user access may skip authentication. Higher access levels require an authentication request containing a secret pass code. Notifications contain no request identifier, and clients must not return responses to them.

API contents are dynamic and may depend on projector model, configuration, lens capabilities, and peripherals. Use recursive or non-recursive `introspect` requests to discover exact available objects, methods, properties, signals, constraints, and access levels.

Property subscriptions only report actual changes; subscribing does not return current state. Query current value separately with `property.get`. Source selection can produce two notifications: an empty source while deselecting old input, followed by newly selected source.

<!-- UNRESOLVED: firmware compatibility range and protocol framing details are not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:18:37.441Z
last_checked_at: 2026-08-05T07:27:24.750Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:27:24.750Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions match literal method names/property paths/HTTP endpoints in the refined source; transport (port 9090, 19200 8N1) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes dynamic APIs whose availability depends on projector configuration and attached peripherals."
- "secret pass code is installation-specific"
- "firmware compatibility range and protocol framing details are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
