---
spec_id: admin/barco-g62-w14
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco G62 W14 Control Spec"
manufacturer: Barco
model_family: "G62 W14"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "G62 W14"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:22:15.349Z
last_checked_at: 2026-10-07T20:47:20.693Z
generated_at: 2026-10-07T20:47:20.693Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes dynamic Pulse API whose availability depends on projector configuration and attached peripherals."
  - "firmware version compatibility and fault-recovery procedures not stated in source."
  - "passcode source and format not stated beyond numeric example."
  - "method parameters not stated in source\""
  - "firmware compatibility range, passcode provisioning, request framing over TCP/serial, command terminator, timeouts, retry policy, and complete model-specific dynamic API are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:47:20.693Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 action units map to Pulse methods, properties or file endpoints in the source, transport values are supported, and the spec covers the source catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco G62 W14 Control Spec

## Summary

Barco G62 W14 projector control through Pulse JSON-RPC services over TCP/IP or RS-232. Spec covers authentication, properties, notifications, introspection, power, source selection, illumination, image controls, optics, DMX, firmware, environment monitoring, and HTTP file transfer.

<!-- UNRESOLVED: source describes dynamic Pulse API whose availability depends on projector configuration and attached peripherals. -->
<!-- UNRESOLVED: firmware version compatibility and fault-recovery procedures not stated in source. -->

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
  normal_user_access: optional
  request:
    jsonrpc: "2.0"
    method: "authenticate"
    params:
      code: "{passcode}"
# UNRESOLVED: passcode source and format not stated beyond numeric example.
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from source-selection commands
- queryable  # inferred from property and method queries
- levelable  # inferred from illumination and image-level controls
```

## Actions

```yaml
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{passcode}},"id":{id}}'
  params:
    - name: passcode
      type: integer
    - name: id
      type: [string, number]

- id: invoke_method
  label: Invoke Pulse Method
  kind: action
  command: '{"jsonrpc":"2.0","method":"{method}","params":{params},"id":{id}}'
  params:
    - name: method
      type: string
    - name: params
      type: object
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: [string, array]
    - name: id
      type: [string, number]

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: [string, array]
    - name: id
      type: [string, number]

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}},"id":{id}}'
  params:
    - name: property
      type: [string, array]
    - name: id
      type: [string, number]

- id: signal_subscribe
  label: Subscribe to Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: [string, array]
    - name: id
      type: [string, number]

- id: signal_unsubscribe
  label: Unsubscribe from Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}},"id":{id}}'
  params:
    - name: signal
      type: [string, array]
    - name: id
      type: [string, number]

- id: introspect
  label: Introspect Pulse API
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
      type: [string, number]

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

- id: system_state_get
  label: Read Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: system_state_subscribe
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: eco_serial_wake
  label: Wake from ECO over RS-232
  kind: action
  command: ":POWR1\r"
  params: []

- id: image_active_source_get
  label: Read Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_active_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}'
  params:
    - name: source
      type: string
      description: Name returned by image.source.list
    - name: id
      type: [string, number]

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_source_connectors_list
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":{id}}'
  params:
    - name: source_object
      type: string
      description: Lowercase source name with non-word characters removed
    - name: id
      type: [string, number]

- id: image_connector_signal_get
  label: Read Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
    - name: id
      type: [string, number]

- id: illumination_state_get
  label: Read Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_sources_introspect
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_laser_power_get
  label: Read Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Target power in percent; query dynamic minimum and maximum first
    - name: id
      type: [string, number]

- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_laser_minpower_get
  label: Read Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_laser_maxpower_get
  label: Read Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_brightness_get
  label: Read Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: image_brightness_subscribe
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_contrast_get
  label: Read Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: image_gamma_get
  label: Read Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: image_saturation_get
  label: Read Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: image_sharpness_get
  label: Read Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

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
      type: [string, number]

- id: image_orientation_get
  label: Read Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_orientation_set
  label: Set Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: enum
      values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    - name: id
      type: [string, number]

- id: image_window_position_get
  label: Read Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}},"id":{id}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
    - name: id
      type: [string, number]

- id: image_window_size_get
  label: Read Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}},"id":{id}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer
    - name: id
      type: [string, number]

- id: image_window_scalingmode_get
  label: Read Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_window_scalingmode_set
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: enum
      values: [Fill, OneToOne, FillScreen, Stretch]
    - name: id
      type: [string, number]

- id: image_warp_enable_set
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: image_warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: [string, number]

- id: image_warp_file_enable
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: "POST http://{projector-address}/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      encoding: multipart/form-data

- id: download_warp_file
  label: Download Warp File
  kind: query
  command: "GET http://{projector-address}/api/image/processing/warp/file/transfer/{filename}"
  params:
    - name: filename
      type: string
      required: false

- id: image_blend_file_select
  label: Select Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: [string, number]

- id: image_blend_file_enable
  label: Enable or Disable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      encoding: multipart/form-data

- id: image_blacklevel_file_select
  label: Select Black-Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: [string, number]

- id: image_blacklevel_file_enable
  label: Enable or Disable Black-Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: upload_blacklevel_mask
  label: Upload Black-Level Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      encoding: multipart/form-data

- id: dmx_mode_get
  label: Read DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
    - name: id
      type: [string, number]

- id: dmx_startchannel_get
  label: Read DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      minimum: 1
      maximum: 512
    - name: id
      type: [string, number]

- id: dmx_shutdown_get
  label: Read DMX Shutdown Setting
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: network_ip4config_get
  label: Read IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: network_lan_state_get
  label: Read LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_shutter_position_get
  label: Read Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: enum
      values: [Open, Closed]
    - name: id
      type: [string, number]

- id: optics_zoom_position_get
  label: Read Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
    - name: id
      type: [string, number]

- id: optics_focus_position_get
  label: Read Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
    - name: id
      type: [string, number]

- id: optics_lensshift_horizontal_get
  label: Read Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_lensshift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
    - name: id
      type: [string, number]

- id: optics_lensshift_vertical_get
  label: Read Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: optics_lensshift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
    - name: id
      type: [string, number]

- id: system_standby_enable_get
  label: Read Standby Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: system_standby_enable_set
  label: Enable or Disable Standby
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: system_eco_enable_get
  label: Read ECO Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: system_eco_enable_set
  label: Enable or Disable ECO Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: [string, number]

- id: environment_alarmstate_get
  label: Read Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: environment_get_control_blocks
  label: Read Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{value_type}"},"id":{id}}'
  params:
    - name: type
      type: enum
      values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: value_type
      type: string
    - name: id
      type: [string, number]

- id: environment_get_alarm_info
  label: Read Environment Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: firmware_list_component_version_status
  label: Read Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: firmware_schedule_component_upgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{params},"id":{id}}'
  params:
    - name: params
      type: object
      description: "UNRESOLVED: method parameters not stated in source"
    - name: id
      type: [string, number]

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: illumination_laser_get_serial_number
  label: Read Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_color_p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: [string, number]

- id: image_color_p7_reset_preset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: [string, number]

- id: image_color_p7_reset_to_native
  label: Reset P7 Custom Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: image_color_rgbmode_next
  label: Select Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params:
    - name: id
      type: [string, number]

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}},"id":{id}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer
    - name: id
      type: [string, number]

- id: warp_gridchanged_subscribe
  label: Subscribe to Warp Grid Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"image.processing.warp.gridchanged"},"id":{id}}'
  params:
    - name: id
      type: [string, number]
```

## Feedbacks

```yaml
- id: jsonrpc_result
  type: any
  description: Successful JSON-RPC result correlated by request id

- id: jsonrpc_error
  type: object
  description: JSON-RPC error object returned when request fails

- id: authentication_result
  type: boolean

- id: property_set_result
  type: boolean

- id: projector_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'

- id: active_source
  type: string
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'

- id: available_sources
  type: array
  items: string
  query_command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'

- id: available_connectors
  type: array
  query_command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'

- id: detected_signal
  type: object
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  fields:
    active: boolean
    name: string
    vertical_total: integer
    horizontal_total: integer
    vertical_resolution: integer
    horizontal_resolution: integer
    vertical_sync_width: integer
    vertical_front_porch: integer
    vertical_back_porch: integer
    horizontal_sync_width: integer
    horizontal_front_porch: integer
    horizontal_back_porch: integer
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: integer
    scan: string
    bits_per_component: integer
    color_space: string
    signal_range: string
    chroma_sampling: string
    gamma_type: string
    color_primaries: string
    mastering_luminance: float
    content_aspect_ratio: string
    is_stereo: boolean
    stereo_mode: string

- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'

- id: illumination_laser_power
  type: float
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'

- id: image_brightness
  type: float
  minimum: -1
  maximum: 1
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'

- id: image_contrast
  type: float
  minimum: 0
  maximum: 2
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":{id}}'

- id: image_gamma
  type: float
  minimum: 1
  maximum: 3
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":{id}}'

- id: image_saturation
  type: float
  minimum: 0
  maximum: 2
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":{id}}'

- id: image_sharpness
  type: integer
  minimum: -2
  maximum: 8
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":{id}}'

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_control_blocks
  type: dictionary
  description: Sensor or control-block names mapped to numeric readings
  query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":{id}}'

- id: firmware_component_status
  type: array
  fields:
    name: string
    available: string
    running: string
    status: enum
  values: [Unknown, OK, Upgradable]
  query_command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
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

- id: image_window_main_scalingmode
  type: enum
  access: read_write
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  type: float
  access: read_write
  minimum: -1
  maximum: 1
  default: 0
  step_size: 1
  precision: 0.01

- id: image_contrast
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  default: 1
  step_size: 1
  precision: 0.01

- id: image_gamma
  type: float
  access: read_write
  minimum: 1
  maximum: 3
  default: 2.2
  step_size: 1
  precision: 0.1

- id: image_saturation
  type: float
  access: read_write
  minimum: 0
  maximum: 2
  default: 1
  step_size: 1
  precision: 0.01

- id: image_sharpness
  type: integer
  access: read_write
  minimum: -2
  maximum: 8
  step_size: 1
  precision: 1

- id: image_orientation
  type: enum
  access: read_write
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: illumination_laser_power
  type: float
  access: read_write
  description: Target power in percent; valid minimum and maximum are dynamic

- id: illumination_laser_minpower
  type: float
  access: read_only

- id: illumination_laser_maxpower
  type: float
  access: read_only

- id: image_processing_warp_enable
  type: boolean
  access: read_write

- id: image_processing_warp_file_enable
  type: boolean
  access: read_write

- id: image_processing_warp_file_selected
  type: string
  access: read_write

- id: image_processing_blend_file_enable
  type: boolean
  access: read_write

- id: image_processing_blend_file_selected
  type: array
  items: string
  access: read_write

- id: image_processing_blacklevel_file_enable
  type: boolean
  access: read_write

- id: image_processing_blacklevel_file_selected
  type: string
  access: read_write

- id: dmx_mode
  type: string
  access: read_write

- id: dmx_startchannel
  type: integer
  access: read_write
  minimum: 1
  maximum: 512

- id: dmx_shutdown
  type: boolean
  access: read_write

- id: network_device_lan_ip4config
  type: object
  fields:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string

- id: network_device_lan_state
  type: enum
  access: read_only
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  access: read_only
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  access: read_write
  values: [Open, Closed]

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: environment_alarmstate
  type: enum
  access: read_only
  values: [Fatal, Error, Alert, Warning, Ok]
```

## Events

```yaml
- id: property_changed
  method: "property.changed"
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{property_value_pairs}]}}'
  description: Unsolicited notification containing property/value pairs; message has no id

- id: signal_callback
  method: "signal.callback"
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{signal_argument_pairs}]}}'
  description: Unsolicited notification containing signal/argument-list pairs; message has no id

- id: model_updated
  signal: "modelupdated"
  description: Object structure changed because objects were added or removed

- id: introspect_object_changed
  signal: "introspect.objectchanged"
  params:
    object:
      type: string
    newobject:
      type: boolean
      description: True when object is new; false when object is lost
```

## Macros

```yaml
- id: safe_power_on
  label: Verify State and Power On
  steps:
    - command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
    - condition: "result is standby or ready"
    - command: '{"jsonrpc":"2.0","method":"system.poweron"}'

- id: safe_power_off
  label: Verify State and Power Off
  steps:
    - command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
    - condition: "result is on"
    - command: '{"jsonrpc":"2.0","method":"system.poweroff"}'

- id: activate_warp_file
  label: Upload and Activate Warp Grid
  steps:
    - command: "POST http://{projector-address}/api/image/processing/warp/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":{id}}'

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - command: "POST http://{projector-address}/api/image/processing/blend/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":{id}}'

- id: activate_blacklevel_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - command: "POST http://{projector-address}/api/image/processing/blacklevel/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":{id}}'
```

## Safety

```yaml
confirmation_required_for:
  - firmware_schedule_component_upgrade
interlocks:
  - action: system_power_on
    required_state:
      - standby
      - ready
    note: Verify state before command; command has no effect if already on or transitioning.
  - action: system_power_off
    required_state:
      - on
    note: Verify state before command; command has no effect if already off or transitioning.
  - action: illumination_laser_power_set
    procedure:
      - Read illumination.sources.laser.minpower.
      - Read illumination.sources.laser.maxpower.
      - Set value within current dynamic limits.
  - action: property_set
    note: Wait for property.set confirmation before setting same property again.
```

## Notes

Pulse uses JSON-RPC 2.0 with named parameters; parameter order does not matter. Normal end-user access may skip authentication, while higher access requires a secret passcode. Notification messages have no request ID and require no response.

Property subscriptions do not return current values; issue `property.get` separately. Active-source changes may produce two notifications: an empty source while deselecting, followed by newly selected source. API objects are dynamic and may depend on lens, illumination, DMX mode, peripherals, and projector configuration; use `introspect` to discover exact runtime API.

HTTP file endpoints accept uploads with multipart form field `file`. Warp, blend, and black-level image support includes PNG, JPEG, and TIFF; image-mask behavior and dimensions depend on projector resolution.

<!-- UNRESOLVED: firmware compatibility range, passcode provisioning, request framing over TCP/serial, command terminator, timeouts, retry policy, and complete model-specific dynamic API are not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:22:15.349Z
last_checked_at: 2026-10-07T20:47:20.693Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:47:20.693Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 action units map to Pulse methods, properties or file endpoints in the source, transport values are supported, and the spec covers the source catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes dynamic Pulse API whose availability depends on projector configuration and attached peripherals."
- "firmware version compatibility and fault-recovery procedures not stated in source."
- "passcode source and format not stated beyond numeric example."
- "method parameters not stated in source\""
- "firmware compatibility range, passcode provisioning, request framing over TCP/serial, command terminator, timeouts, retry policy, and complete model-specific dynamic API are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
