---
spec_id: admin/barco-g-lens-065-0751-short-throw
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco G Lens 065 0751 Short Throw Control Spec"
manufacturer: Barco
model_family: "Barco G Lens 065 0751 Short Throw"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco G Lens 065 0751 Short Throw"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-02T06:03:59.832Z
last_checked_at: 2026-08-05T08:06:03.785Z
generated_at: 2026-08-05T08:06:03.785Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ledctrl.blink
  - "source describes Pulse services generally; lens-specific API availability depends on projector configuration."
  - "authentication code not specified"
  - "exact model-specific API surface not stated."
  - "HTTP port not stated."
  - "binary command encodings not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:06:03.785Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec action JSON-RPC methods verbatim in source; transport port/serial params verbatim; bidirectional coverage >=0.9 ratio. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Barco G Lens 065 0751 Short Throw Control Spec

## Summary

Barco Pulse projector services support JSON-RPC control over TCP/IP on port 9090 and RS-232. This spec documents power, source, illumination, image, file-processing, introspection, monitoring, firmware, and subscription operations described in the source.

<!-- UNRESOLVED: source describes Pulse services generally; lens-specific API availability depends on projector configuration. -->

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
  description: Authentication request containing secret pass code required only for higher-than-normal end-user access.
  code: null  # UNRESOLVED: authentication code not specified
```

## Traits
```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from image.window.main.source commands
- queryable  # inferred from property.get and introspection commands
- levelable  # inferred from illumination power and image adjustment commands
```

## Actions
```yaml
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

- id: select_input
  label: Select Input
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Available source name.

- id: list_sources
  label: List Sources
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Connectors
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Source Connectors
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: Lowercase source object name with non-word characters removed.

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation.

- id: get_multiple_properties
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property_1}","{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name.
    - name: property_2
      type: string
      description: Second property name.

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Writable property name in dot notation.
    - name: value
      type: any
      description: Property value.

- id: subscribe_property
  label: Subscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name.

- id: subscribe_multiple_properties
  label: Subscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property_1}","{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name.
    - name: property_2
      type: string
      description: Second property name.

- id: unsubscribe_property
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name.

- id: unsubscribe_multiple_properties
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property_1}","{property_2}"]}}'
  params:
    - name: property_1
      type: string
      description: First property name.
    - name: property_2
      type: string
      description: Second property name.

- id: subscribe_signal
  label: Subscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name.

- id: subscribe_multiple_signals
  label: Subscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal_1}","{signal_2}"]}}'
  params:
    - name: signal_1
      type: string
      description: First signal name.
    - name: signal_2
      type: string
      description: Second signal name.

- id: unsubscribe_signal
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name.

- id: unsubscribe_multiple_signals
  label: Unsubscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal_1}","{signal_2}"]}}'
  params:
    - name: signal_1
      type: string
      description: First signal name.
    - name: signal_2
      type: string
      description: Second signal name.

- id: introspect_recursive
  label: Recursive Introspection
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.

- id: introspect_non_recursive
  label: Non-Recursive Introspection
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code.
      required: true

- id: image_source_list
  label: Image Source List
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: Image Connector List
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_list_connectors
  label: Image Source List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: Translated source object name.

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: environment_get_alarm_info
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_get_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Control-block type.
    - name: valuetype
      type: string
      description: Control-block value type.

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: image_color_copy_preset_to_custom
  label: Copy Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name.

- id: image_color_reset_preset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name.

- id: image_color_reset_to_native
  label: Reset To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_next_rgb_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
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
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  values:
    - On
    - Off

- id: active_source
  type: string
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

- id: laser_power
  type: float
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

- id: laser_min_power
  type: float
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'

- id: laser_max_power
  type: float
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'

- id: detected_signal
  type: object
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'

- id: network_state
  type: enum
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  values:
    - CONNECTED
    - DISCONNECTED

- id: shutter_position
  type: enum
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  values:
    - Open
    - Closed

- id: shutter_target
  type: enum
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"}}'
  values:
    - Open
    - Closed

- id: environment_alarm_state
  type: enum
  query:
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: property_changed
  type: notification
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'

- id: signal_callback
  type: notification
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{arguments}}]}}'
```

## Variables
```yaml
- id: illumination_laser_power
  label: Laser Power
  type: float
  property: illumination.sources.laser.power
  range:
    min: 0
    max: 100

- id: image_brightness
  label: Image Brightness
  type: float
  property: image.brightness
  range:
    min: -1
    max: 1
  precision: 0.01

- id: image_contrast
  label: Image Contrast
  type: float
  property: image.contrast
  range:
    min: 0
    max: 2
  precision: 0.01

- id: image_gamma
  label: Image Gamma
  type: float
  property: image.gamma
  range:
    min: 1
    max: 3
  precision: 0.1

- id: image_saturation
  label: Image Saturation
  type: float
  property: image.saturation
  range:
    min: 0
    max: 2
  precision: 0.01

- id: image_sharpness
  label: Image Sharpness
  type: integer
  property: image.sharpness
  range:
    min: -2
    max: 8

- id: image_source
  label: Active Source
  type: string
  property: image.window.main.source

- id: image_scaling_mode
  label: Scaling Mode
  type: enum
  property: image.window.main.scalingmode
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  label: Image Orientation
  type: enum
  property: image.orientation
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: window_position
  label: Main Window Position
  type: object
  property: image.window.main.position

- id: window_size
  label: Main Window Size
  type: object
  property: image.window.main.size

- id: warp_enabled
  label: Warp Enabled
  type: boolean
  property: image.processing.warp.enable

- id: warp_file_selected
  label: Selected Warp File
  type: string
  property: image.processing.warp.file.selected

- id: warp_file_enabled
  label: Warp File Enabled
  type: boolean
  property: image.processing.warp.file.enable

- id: blend_file_selected
  label: Selected Blend File
  type: string
  property: image.processing.blend.file.selected

- id: blend_file_enabled
  label: Blend File Enabled
  type: boolean
  property: image.processing.blend.file.enable

- id: blacklevel_file_selected
  label: Selected Black Level File
  type: string
  property: image.processing.blacklevel.file.selected

- id: blacklevel_file_enabled
  label: Black Level File Enabled
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: dmX_mode
  label: DMX Mode
  type: string
  property: dmx.mode

- id: dmx_start_channel
  label: DMX Start Channel
  type: integer
  property: dmx.startchannel
  range:
    min: 1
    max: 512

- id: dmx_shutdown
  label: DMX Shutdown
  type: boolean
  property: dmx.shutdown

- id: ipv4_configuration
  label: IPv4 Configuration
  type: object
  property: network.device.lan.ip4config

- id: zoom_position
  label: Zoom Position
  type: integer
  property: optics.zoom.position

- id: focus_position
  label: Focus Position
  type: integer
  property: optics.focus.position

- id: horizontal_lens_shift_position
  label: Horizontal Lens Shift Position
  type: integer
  property: optics.lensshift.horizontal.position

- id: vertical_lens_shift_position
  label: Vertical Lens Shift Position
  type: integer
  property: optics.lensshift.vertical.position

- id: standby_enabled
  label: Standby Enabled
  type: boolean
  property: system.standby.enable

- id: eco_enabled
  label: ECO Enabled
  type: boolean
  property: system.eco.enable
```

## Events
```yaml
- id: property_changed
  label: Property Changed
  signal: property.changed
  payload:
    property: array of property/value pairs

- id: signal_callback
  label: Signal Callback
  signal: signal.callback
  payload:
    signal: array of signal/argument-list pairs

- id: model_updated
  label: Model Updated
  signal: modelupdated
  payload:
    object: string
    isnew: boolean
```

## Macros
```yaml
- id: upload_and_enable_warp_file
  label: Upload And Enable Warp File
  steps:
    - command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'

- id: upload_and_enable_blend_mask
  label: Upload And Enable Blend Mask
  steps:
    - command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

- id: upload_and_enable_blacklevel_mask
  label: Upload And Enable Black Level Mask
  steps:
    - command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks:
  - Verify system.state is standby or ready before system.poweron.
  - Verify system.state is on before system.poweroff.
```

## Notes

Pulse API availability can depend on projector configuration and connected peripherals. Introspection provides exact available objects, methods, properties, and signals for a specific projector.

Wait for `property.set` confirmation before setting same property again; repeated writes can flood server and reduce performance.

ECO-mode wake-up can use Wake-on-LAN, remote/keypad power button, or RS-232 ASCII command `:POWR1\r`.

File endpoints use HTTP paths under `/api`; source gives projector-address examples but no fixed HTTP port.

<!-- UNRESOLVED: exact model-specific API surface not stated. -->
<!-- UNRESOLVED: HTTP port not stated. -->
<!-- UNRESOLVED: binary command encodings not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-02T06:03:59.832Z
last_checked_at: 2026-08-05T08:06:03.785Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:06:03.785Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec action JSON-RPC methods verbatim in source; transport port/serial params verbatim; bidirectional coverage >=0.9 ratio. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ledctrl.blink
- "source describes Pulse services generally; lens-specific API availability depends on projector configuration."
- "authentication code not specified"
- "exact model-specific API surface not stated."
- "HTTP port not stated."
- "binary command encodings not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
