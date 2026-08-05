---
spec_id: admin/barco-b-lens-hc-138-dc4k-hc-113-172
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco B Lens Hc 138 Dc4K Hc 113 172 Control Spec"
manufacturer: Barco
model_family: "Barco B Lens Hc 138 Dc4K Hc 113 172"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco B Lens Hc 138 Dc4K Hc 113 172"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:54:15.940Z
last_checked_at: 2026-07-21T21:13:36.452Z
generated_at: 2026-07-21T21:13:36.452Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - network.device.lan.ip4config
  - "source is a generic Pulse projector API reference and does not explicitly identify this lens model or define firmware compatibility. Availability of dynamic API objects depends on projector configuration and attached peripherals."
  - "required upgrade parameters not stated in source\""
  - "protocol framing and message delimiters for JSON-RPC over TCP and serial are not stated in source."
  - "secret pass-code provisioning, encoding, and higher access-level definitions are not stated in source."
  - "firmware compatibility range and exact API availability for this lens model are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:13:36.452Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched source documentation; 68 of 69 command tokens represented (98.5%). Transport verified. One property (network.device.lan.ip4config) documented but not explicitly represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco B Lens Hc 138 Dc4K Hc 113 172 Control Spec

## Summary

Control spec for a Barco Pulse projector using JSON-RPC over TCP/IP or RS-232, plus HTTP file-transfer endpoints. It covers service introspection, property access, notifications, power, source selection, illumination, image processing, optics, environment monitoring, DMX, and firmware operations.

<!-- UNRESOLVED: source is a generic Pulse projector API reference and does not explicitly identify this lens model or define firmware compatibility. Availability of dynamic API objects depends on projector configuration and attached peripherals. -->

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
  type: optional_passcode
  notes: "Normal end-user access may skip authentication. Higher access levels require an authenticate request containing a secret pass code."
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
  label: Authenticate Session
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

- id: blink_led
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params: []

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: value
      type: any
      description: Property value
    - name: id
      type: integer
      description: Request identifier

- id: get_property
  label: Get One or More Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names
    - name: id
      type: integer
      description: Request identifier

- id: subscribe_property
  label: Subscribe to One or More Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names
    - name: id
      type: integer
      description: Request identifier

- id: unsubscribe_property
  label: Unsubscribe from One or More Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names
    - name: id
      type: integer
      description: Request identifier

- id: subscribe_signal
  label: Subscribe to One or More Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: Request identifier

- id: unsubscribe_signal
  label: Unsubscribe from One or More Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: Request identifier

- id: introspect
  label: Introspect API Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name; empty value introspects everything
    - name: recursive
      type: boolean
      description: Whether to inspect child objects recursively
    - name: id
      type: integer
      description: Request identifier

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

- id: get_projector_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: subscribe_projector_state
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: eco_wake_serial
  label: Wake from ECO over Serial
  kind: action
  command: ":POWR1\\r"
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
  params:
    - name: source
      type: string
      description: Name returned by image.source.list

- id: select_displayport_1
  label: Select DisplayPort 1
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params: []

- id: select_hdmi
  label: Select HDMI
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"HDMI"}}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: list_source_connectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":4}'
  params:
    - name: source_object
      type: string
      description: Source name with non-word characters removed and converted to lowercase

- id: get_connector_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":5}'
  params:
    - name: connector_object
      type: string
      description: Connector name with non-word characters removed and converted to lowercase

- id: subscribe_active_source
  label: Subscribe to Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

- id: subscribe_connector_signal
  label: Subscribe to Connector Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
      description: Connector object name
    - name: id
      type: integer
      description: Request identifier

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: introspect_illumination_sources
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: subscribe_laser_power
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}},"id":5}'
  params:
    - name: power
      type: float
      description: Target illumination power percentage within dynamic projector limits

- id: get_laser_min_power
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: get_laser_max_power
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"image","recursive":false},"id":6}'
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: subscribe_brightness
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness"]},"id":8}'
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{brightness}},"id":9}'
  params:
    - name: brightness
      type: float
      minimum: -1
      maximum: 1
      precision: 0.01
      description: Normalized image brightness; zero is default

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{contrast}},"id":{id}}'
  params:
    - name: contrast
      type: float
      minimum: 0
      maximum: 2
      precision: 0.01
      description: Normalized image contrast; one is default
    - name: id
      type: integer
      description: Request identifier

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{gamma}},"id":{id}}'
  params:
    - name: gamma
      type: float
      minimum: 1
      maximum: 3
      precision: 0.1
      description: Image gamma; default is 2.2
    - name: id
      type: integer
      description: Request identifier

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{saturation}},"id":{id}}'
  params:
    - name: saturation
      type: float
      minimum: 0
      maximum: 2
      precision: 0.01
      description: Normalized image saturation; one is default
    - name: id
      type: integer
      description: Request identifier

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{sharpness}},"id":{id}}'
  params:
    - name: sharpness
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
      description: Request identifier

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
      description: Request identifier

- id: enable_global_warp
  label: Enable or Disable Global Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":10}'
  params:
    - name: enabled
      type: boolean

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: "POST /api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
  params:
    - name: filename
      type: string

- id: enable_warp_file
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":12}'
  params:
    - name: enabled
      type: boolean

- id: download_warp_file
  label: Download Warp File
  kind: query
  command: "GET /api/image/processing/warp/file/transfer/{filename}"
  params:
    - name: filename
      type: string
      description: Optional file name where endpoint requires one

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: "POST /api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart PNG, JPEG, or TIFF image

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":14}'
  params:
    - name: enabled
      type: boolean

- id: upload_blacklevel_mask
  label: Upload Black-Level Mask
  kind: action
  command: "POST /api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart PNG, JPEG, or TIFF image

- id: select_blacklevel_file
  label: Select Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":16}'
  params:
    - name: enabled
      type: boolean

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
      description: Request identifier

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: string
    - name: id
      type: integer
      description: Request identifier

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
      description: Request identifier

- id: set_dmx_shutdown
  label: Enable or Disable DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
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
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{params},"id":{id}}'
  params:
    - name: params
      type: object
      description: "UNRESOLVED: required upgrade parameters not stated in source"
    - name: id
      type: integer
      description: Request identifier

- id: engage_clo
  label: Engage CLO at Current Light Level
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

- id: copy_p7_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer
      description: Request identifier

- id: reset_p7_custom_preset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
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
  source: authenticate.result

- id: property_set_result
  type: boolean
  source: property.set.result

- id: property_value
  type: any
  source: property.get.result

- id: subscription_result
  type: boolean
  source: property.subscribe.result

- id: signal_subscription_result
  type: boolean
  source: signal.subscribe.result

- id: projector_state
  type: enum
  source: system.state
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
  source: image.window.main.source

- id: available_sources
  type: array
  source: image.source.list.result

- id: available_connectors
  type: array
  source: image.connector.list.result

- id: detected_signal
  type: object
  source: image.connector.{connector}.detectedsignal

- id: illumination_state
  type: enum
  source: illumination.state
  values:
    - On
    - Off

- id: laser_power
  type: float
  source: illumination.sources.laser.power

- id: laser_min_power
  type: float
  source: illumination.sources.laser.minpower

- id: laser_max_power
  type: float
  source: illumination.sources.laser.maxpower

- id: brightness
  type: float
  source: image.brightness
  minimum: -1
  maximum: 1

- id: network_state
  type: enum
  source: network.device.lan.state
  values:
    - CONNECTED
    - DISCONNECTED

- id: shutter_position
  type: enum
  source: optics.shutter.position
  values:
    - Open
    - Closed

- id: zoom_position
  type: integer
  source: optics.zoom.position

- id: focus_position
  type: integer
  source: optics.focus.position

- id: lens_shift_horizontal_position
  type: integer
  source: optics.lensshift.horizontal.position

- id: lens_shift_vertical_position
  type: integer
  source: optics.lensshift.vertical.position

- id: alarm_state
  type: enum
  source: environment.alarmstate
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: environment_control_blocks
  type: dictionary
  source: environment.getcontrolblocks.result

- id: firmware_components
  type: array
  source: firmware.listcomponents.result

- id: firmware_component_version_status
  type: array
  source: firmware.listcomponentversionstatus.result
```

## Variables

```yaml
- id: active_source
  property: image.window.main.source
  type: string
  access: read_write

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

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  notes: Minimum and maximum are dynamic and may depend on projector settings, lens type, and lens position.

- id: brightness
  property: image.brightness
  type: float
  minimum: -1
  maximum: 1
  default: 0
  precision: 0.01

- id: contrast
  property: image.contrast
  type: float
  minimum: 0
  maximum: 2
  default: 1
  precision: 0.01

- id: gamma
  property: image.gamma
  type: float
  minimum: 1
  maximum: 3
  default: 2.2
  precision: 0.1
  access: read_write

- id: saturation
  property: image.saturation
  type: float
  minimum: 0
  maximum: 2
  default: 1
  precision: 0.01

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

- id: global_warp_enabled
  property: image.processing.warp.enable
  type: boolean

- id: warp_file_enabled
  property: image.processing.warp.file.enable
  type: boolean

- id: selected_warp_file
  property: image.processing.warp.file.selected
  type: string

- id: blend_file_enabled
  property: image.processing.blend.file.enable
  type: boolean

- id: selected_blend_files
  property: image.processing.blend.file.selected
  type: array

- id: blacklevel_file_enabled
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: selected_blacklevel_file
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

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values:
    - Open
    - Closed

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
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'
  description: Reports subscribed property changes. Subscription alone does not return current value.

- id: signal_callback
  method: signal.callback
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{arguments}}]}}'
  description: Reports subscribed signal emissions.

- id: model_updated
  signal: modelupdated
  description: Triggered when objects are added or removed.

- id: introspect_object_changed
  signal: introspect.objectchanged
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"{object}","newobject":{is_new}}}]}}'
  description: Reports arrival or removal of an API object.
```

## Macros

```yaml
- id: activate_warp_grid
  label: Upload and Activate Warp Grid
  steps:
    - "POST file to /api/image/processing/warp/file/transfer"
    - "Set image.processing.warp.file.selected to uploaded filename"
    - "Set image.processing.warp.file.enable to true"

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - "POST file to /api/image/processing/blend/file/transfer"
    - "Set image.processing.blend.file.selected to uploaded filename"
    - "Set image.processing.blend.file.enable to true"

- id: activate_blacklevel_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - "POST file to /api/image/processing/blacklevel/file/transfer"
    - "Set image.processing.blacklevel.file.selected to uploaded filename"
    - "Set image.processing.blacklevel.file.enable to true"

- id: wake_from_eco
  label: Wake Projector from ECO Mode
  steps:
    - "Use Wake-on-LAN with projector MAC address, projector remote/keypad power button, or send :POWR1\\r through RS-232."
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
    requirement: Wait for confirmation before setting the same property again to avoid flooding the server and reducing performance.
  - operation: system.eco.wake
    requirement: ECO mode requires Wake-on-LAN, local power control, or the documented RS-232 wake command.
```

## Notes

JSON-RPC parameters are passed by name, and their order does not matter. Notification messages have no request ID and require no response. Property subscriptions report only subsequent changes; use `property.get` for the current value.

The API is dynamic. Available objects can depend on projector model, configuration, attached lens, and peripherals. Use `introspect` to determine the exact API exposed by a specific projector. File endpoints use HTTP multipart upload; supported mask formats are PNG, JPEG, and TIFF.

<!-- UNRESOLVED: protocol framing and message delimiters for JSON-RPC over TCP and serial are not stated in source. -->
<!-- UNRESOLVED: secret pass-code provisioning, encoding, and higher access-level definitions are not stated in source. -->
<!-- UNRESOLVED: firmware compatibility range and exact API availability for this lens model are not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:54:15.940Z
last_checked_at: 2026-07-21T21:13:36.452Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:13:36.452Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched source documentation; 68 of 69 command tokens represented (98.5%). Transport verified. One property (network.device.lan.ip4config) documented but not explicitly represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- network.device.lan.ip4config
- "source is a generic Pulse projector API reference and does not explicitly identify this lens model or define firmware compatibility. Availability of dynamic API objects depends on projector configuration and attached peripherals."
- "required upgrade parameters not stated in source\""
- "protocol framing and message delimiters for JSON-RPC over TCP and serial are not stated in source."
- "secret pass-code provisioning, encoding, and higher access-level definitions are not stated in source."
- "firmware compatibility range and exact API availability for this lens model are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
