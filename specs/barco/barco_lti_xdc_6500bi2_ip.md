---
spec_id: admin/barco-lti-xdc-6500bi2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Lti Xdc 6500Bi2 Control Spec"
manufacturer: Barco
model_family: "Barco Lti Xdc 6500Bi2"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Lti Xdc 6500Bi2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:19:12.239Z
last_checked_at: 2026-08-19T08:56:37.533Z
generated_at: 2026-08-19T08:56:37.533Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-specific API availability depends on projector configuration and installed peripherals."
  - "firmware version compatibility and HTTP port are not stated in source."
  - "secret pass code is installation-specific"
  - "method parameter schema not stated in source\""
  - "source identifies generic Pulse projector API, not explicit model-specific availability for every documented member."
  - "HTTP port, firmware compatibility, computed authentication code source, and undocumented method parameter schemas are not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:56:37.533Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec action units map to literal JSON-RPC methods/properties/file endpoints/serial commands documented in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Lti Xdc 6500Bi2 Control Spec

## Summary

Barco Lti Xdc 6500Bi2 projector control spec using Pulse JSON-RPC services over TCP/IP or RS-232 and file transfers over HTTP. It covers generic service operations, projector power, source selection, illumination, image processing, optics, DMX, environment monitoring, firmware management, properties, subscriptions, and notifications.

<!-- UNRESOLVED: exact model-specific API availability depends on projector configuration and installed peripherals. -->
<!-- UNRESOLVED: firmware version compatibility and HTTP port are not stated in source. -->

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
  normal_end_user_access: none
  request: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  credentials: null  # UNRESOLVED: secret pass code is installation-specific
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
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  params:
    - name: code
      type: integer
      description: Secret pass code
    - name: id
      type: string_or_number
      required: false

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
      required: false
    - name: id
      type: string_or_number
      required: false

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
      type: string_or_number
      required: false

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: string_or_number
      required: false

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: string_or_number
      required: false

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: string_or_array
    - name: id
      type: string_or_number
      required: false

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
    - name: id
      type: string_or_number
      required: false

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
    - name: id
      type: string_or_number
      required: false

- id: introspect
  label: Introspect API Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      required: false
      default: ""
    - name: recursive
      type: boolean
      required: false
      default: true
    - name: id
      type: string_or_number
      required: false

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: system_state_subscribe
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

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

- id: active_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: active_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'
  params:
    - name: source
      type: string
      description: Name returned by image.source.list
    - name: id
      type: string_or_number
      required: false

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: source_connectors_list
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":{id}}'
  params:
    - name: source_object
      type: string
      description: Lowercase source name with non-word characters removed
    - name: id
      type: string_or_number
      required: false

- id: connector_detected_signal_get
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
      description: Lowercase connector name with non-word characters removed
    - name: id
      type: string_or_number
      required: false

- id: connector_detected_signal_subscribe
  label: Subscribe to Connector Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
    - name: id
      type: string_or_number
      required: false

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: illumination_sources_introspect
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Target power in percent; query dynamic minimum and maximum first
    - name: id
      type: string_or_number
      required: false

- id: laser_power_subscribe
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: laser_minimum_power_get
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: laser_maximum_power_get
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_brightness_set
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
      type: string_or_number
      required: false

- id: image_brightness_subscribe
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_contrast_get
  label: Get Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_contrast_set
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
      type: string_or_number
      required: false

- id: image_gamma_get
  label: Get Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_gamma_set
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
      type: string_or_number
      required: false

- id: image_saturation_get
  label: Get Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_saturation_set
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
      type: string_or_number
      required: false

- id: image_sharpness_get
  label: Get Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      minimum: -2
      maximum: 8
    - name: id
      type: string_or_number
      required: false

- id: image_orientation_get
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: image_orientation_set
  label: Set Image Orientation
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
      type: string_or_number
      required: false

- id: window_position_get
  label: Get Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}},"id":{id}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: window_size_get
  label: Get Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}},"id":{id}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: window_scaling_mode_get
  label: Get Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: window_scaling_mode_set
  label: Set Window Scaling Mode
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
      type: string_or_number
      required: false

- id: warp_enable_get
  label: Get Warp Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.warp.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: warp_enable_set
  label: Set Warp Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: file
    - name: projector-address
      type: string

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: string_or_number
      required: false

- id: warp_file_enable_get
  label: Get Warp File Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.warp.file.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: warp_file_enable_set
  label: Set Warp File Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: file
    - name: projector-address
      type: string

- id: blend_file_select
  label: Select Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: string_or_number
      required: false

- id: blend_file_enable_get
  label: Get Blend Mask Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blend.file.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: blend_file_enable_set
  label: Set Blend Mask Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: blacklevel_file_upload
  label: Upload Black-Level Mask
  kind: action
  command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: file
    - name: projector-address
      type: string

- id: blacklevel_file_select
  label: Select Black-Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: string_or_number
      required: false

- id: blacklevel_file_enable_get
  label: Get Black-Level Correction Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blacklevel.file.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: blacklevel_file_enable_set
  label: Set Black-Level Correction Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: string
    - name: id
      type: string_or_number
      required: false

- id: dmx_start_channel_get
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: dmx_start_channel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}},"id":{id}}'
  params:
    - name: channel
      type: integer
      minimum: 1
      maximum: 512
    - name: id
      type: string_or_number
      required: false

- id: dmx_shutdown_get
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: network_ipv4_config_get
  label: Get IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: shutter_target_get
  label: Get Shutter Target
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: shutter_target_set
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
      type: string_or_number
      required: false

- id: zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: lens_shift_horizontal_get
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: lens_shift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: lens_shift_vertical_get
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: lens_shift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: string_or_number
      required: false

- id: standby_enable_get
  label: Get Standby Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: standby_enable_set
  label: Set Standby Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: eco_enable_get
  label: Get ECO Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: eco_enable_set
  label: Set ECO Enabled
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: string_or_number
      required: false

- id: environment_alarm_state_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: environment_get_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
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
    - name: valuetype
      type: string
      description: Supported environment value type from source catalogue
    - name: id
      type: string_or_number
      required: false

- id: environment_get_alarm_info
  label: Get Environment Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{params},"id":{id}}'
  params:
    - name: params
      type: object
      description: "UNRESOLVED: method parameter schema not stated in source"
    - name: id
      type: string_or_number
      required: false

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: string_or_number
      required: false

- id: p7_reset_preset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
    - name: id
      type: string_or_number
      required: false

- id: p7_reset_to_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false

- id: next_rgb_mode
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: string_or_number
      required: false
```

## Feedbacks

```yaml
- id: authentication_result
  type: boolean
  source: authenticate

- id: method_result
  type: any
  source: JSON-RPC result

- id: method_error
  type: object
  source: JSON-RPC error

- id: property_set_confirmation
  type: boolean
  source: property.set

- id: property_value
  type: any
  source: property.get

- id: subscription_confirmation
  type: boolean
  source:
    - property.subscribe
    - property.unsubscribe
    - signal.subscribe
    - signal.unsubscribe

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

- id: connector_detected_signal
  type: object
  property: "image.connector.{connector_object}.detectedsignal"

- id: illumination_state
  type: enum
  property: illumination.state
  values:
    - On
    - Off

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
  minimum: -1
  maximum: 1

- id: image_contrast
  type: float
  property: image.contrast
  minimum: 0
  maximum: 2

- id: image_gamma
  type: float
  property: image.gamma
  minimum: 1
  maximum: 3

- id: image_saturation
  type: float
  property: image.saturation
  minimum: 0
  maximum: 2

- id: image_sharpness
  type: integer
  property: image.sharpness
  minimum: -2
  maximum: 8

- id: image_orientation
  type: enum
  property: image.orientation
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: window_scaling_mode
  type: enum
  property: image.window.main.scalingmode
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: network_lan_state
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

- id: firmware_component_version_status
  type: array
  method: firmware.listcomponentversionstatus
  status_values:
    - Unknown
    - OK
    - Upgradable
```

## Variables

```yaml
- id: active_source
  property: image.window.main.source
  type: string

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  constraints: dynamic

- id: image_brightness
  property: image.brightness
  type: float
  minimum: -1
  maximum: 1
  default: 0
  precision: 0.01

- id: image_contrast
  property: image.contrast
  type: float
  minimum: 0
  maximum: 2
  default: 1
  precision: 0.01

- id: image_gamma
  property: image.gamma
  type: float
  minimum: 1
  maximum: 3
  default: 2.2
  precision: 0.1

- id: image_saturation
  property: image.saturation
  type: float
  minimum: 0
  maximum: 2
  default: 1
  precision: 0.01

- id: image_sharpness
  property: image.sharpness
  type: integer
  minimum: -2
  maximum: 8
  precision: 1

- id: image_orientation
  property: image.orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

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

- id: window_scaling_mode
  property: image.window.main.scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

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
  items: string

- id: blacklevel_file_enabled
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: blacklevel_file_selected
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
```

## Events

```yaml
- id: property_changed
  method: property.changed
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{property_value_pairs}]}}'
  description: Unsolicited array of property/value pairs; message has no id and requires no response

- id: signal_callback
  method: signal.callback
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{signal_argument_pairs}]}}'
  description: Unsolicited array of signal/argument-list pairs; message has no id and requires no response

- id: model_updated
  signal: modelupdated
  description: Triggered when API object structure changes

- id: introspect_object_changed
  signal: introspect.objectchanged
  payload:
    object: string
    newobject: boolean
```

## Macros

```yaml
- id: select_active_source
  label: Select Active Source Safely
  steps:
    - command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'

- id: activate_warp_file
  label: Upload and Activate Warp File
  steps:
    - command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/warp/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":{id}}'

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/blend/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":{id}}'

- id: activate_blacklevel_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - command: 'curl -X POST -F file=@{file} http://{projector-address}/api/image/processing/blacklevel/file/transfer'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":{id}}'
```

## Safety

```yaml
confirmation_required_for:
  - firmware_schedule_component_upgrade
interlocks:
  - action: system_power_on
    condition: system.state in ["standby", "ready"]
    description: Verify projector is in standby or ready before power-on
  - action: system_power_off
    condition: system.state == "on"
    description: Verify projector is on before power-off
  - action: laser_power_set
    condition: value >= illumination.sources.laser.minpower and value <= illumination.sources.laser.maxpower
    description: Query dynamic minimum and maximum power values before changing laser power
  - action: property_set
    condition: previous write to same property confirmed
    description: Wait for property.set confirmation before setting same property again
```

## Notes

TCP/IP Pulse service uses port 9090. RS-232 uses 19200 baud, 8 data bits, no parity, one stop bit, and no flow control. Same JSON-RPC commands work through network and serial connections.

Normal end-user access may skip authentication; higher access requires a secret pass code. JSON-RPC parameters are passed by name and parameter order does not matter.

Subscriptions do not return current values. Use `property.get` after subscribing when initial state is required. Notifications have no request ID and must not receive responses.

API availability is dynamic and may depend on projector model, configuration, lens, illumination source, and peripherals. Use `introspect` to discover exact methods, properties, objects, signals, ranges, and access permissions available on connected projector.

<!-- UNRESOLVED: source identifies generic Pulse projector API, not explicit model-specific availability for every documented member. -->
<!-- UNRESOLVED: HTTP port, firmware compatibility, computed authentication code source, and undocumented method parameter schemas are not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:19:12.239Z
last_checked_at: 2026-08-19T08:56:37.533Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:56:37.533Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec action units map to literal JSON-RPC methods/properties/file endpoints/serial commands documented in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-specific API availability depends on projector configuration and installed peripherals."
- "firmware version compatibility and HTTP port are not stated in source."
- "secret pass code is installation-specific"
- "method parameter schema not stated in source\""
- "source identifies generic Pulse projector API, not explicit model-specific availability for every documented member."
- "HTTP port, firmware compatibility, computed authentication code source, and undocumented method parameter schemas are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
