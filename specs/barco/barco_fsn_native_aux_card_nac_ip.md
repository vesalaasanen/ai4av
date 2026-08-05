---
spec_id: admin/barco-fsn-native-aux-card-nac
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fsn Native Aux Card Nac Control Spec"
manufacturer: Barco
model_family: "Fsn Native Aux Card Nac"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Fsn Native Aux Card Nac"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:19:56.054Z
last_checked_at: 2026-08-05T08:04:11.630Z
generated_at: 2026-08-05T08:04:11.630Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source identifies Pulse projectors, not Fsn Native Aux Card Nac; device compatibility requires verification."
  - "HTTP port and firmware compatibility not stated in source."
  - "secret pass code is installation-specific"
  - "method parameters not stated in source\""
  - "source-device mismatch must be resolved before publishing this revision for Fsn Native Aux Card Nac."
  - "firmware compatibility and HTTP port not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:04:11.630Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions map to JSON-RPC methods/properties/HTTP endpoints in the source; transport parameters (port 9090, baud 19200, /api path) all confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco Fsn Native Aux Card Nac Control Spec

## Summary

TCP/IP, RS-232, and HTTP control spec derived from Barco Pulse projector API documentation. Control uses JSON-RPC methods and properties over TCP port 9090, with file transfer endpoints over HTTP.

<!-- UNRESOLVED: source identifies Pulse projectors, not Fsn Native Aux Card Nac; device compatibility requires verification. -->
<!-- UNRESOLVED: HTTP port and firmware compatibility not stated in source. -->

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
  notes: Authentication may be skipped for normal end-user access; higher access levels require an authenticate request.
```

## Traits

```yaml
- powerable  # inferred from system.poweron and system.poweroff
- routable  # inferred from active-source controls
- queryable  # inferred from property.get and query methods
- levelable  # inferred from illumination and image-level controls
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
      description: Secret pass code assigned to client
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: invoke_method
  label: Invoke Method
  kind: action
  command: '{"jsonrpc":"2.0","method":"{method}","params":{params},"id":{id}}'
  params:
    - name: method
      type: string
      description: Dot-notation API method name
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
      description: New property value
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name or array of property names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: introspect
  label: Introspect API Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty value introspects everything
    - name: recursive
      type: boolean
      description: Whether to include descendants
    - name: id
      type: integer
      description: JSON-RPC request identifier

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

- id: system_state_query
  label: Query System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: system_state_subscribe
  label: Subscribe to System State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":{id}}'
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

- id: active_source_query
  label: Query Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: active_source_subscribe
  label: Subscribe to Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_source_list_connectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors","id":{id}}'
  params:
    - name: source_object
      type: string
      description: Lowercase source name with non-word characters removed
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: connector_detected_signal_query
  label: Query Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
      description: Lowercase connector name with non-word characters removed
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: connector_detected_signal_subscribe
  label: Subscribe to Connector Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connector_object}.detectedsignal"},"id":{id}}'
  params:
    - name: connector_object
      type: string
      description: Lowercase connector name with non-word characters removed
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: illumination_state_query
  label: Query Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: illumination_sources_query
  label: Query Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: laser_power_query
  label: Query Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{level}},"id":{id}}'
  params:
    - name: level
      type: float
      description: Target illumination power percentage; query dynamic limits before setting
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: laser_power_subscribe
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: laser_min_power_query
  label: Query Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: laser_max_power_query
  label: Query Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_brightness_query
  label: Query Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Brightness from -1 through 1
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_brightness_subscribe
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_contrast_query
  label: Query Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Contrast from 0 through 2
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_gamma_query
  label: Query Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Gamma from 1 through 3
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_saturation_query
  label: Query Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Saturation from 0 through 2
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_sharpness_query
  label: Query Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      description: Sharpness from -2 through 8
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_orientation_query
  label: Query Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: image_orientation_set
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
      description: JSON-RPC request identifier

- id: window_position_query
  label: Query Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

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
      type: integer
      description: JSON-RPC request identifier

- id: window_size_query
  label: Query Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

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
      type: integer
      description: JSON-RPC request identifier

- id: window_scaling_mode_query
  label: Query Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: window_scaling_mode_set
  label: Set Window Scaling Mode
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
      description: JSON-RPC request identifier

- id: warp_enable_set
  label: Enable or Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: warp_file_enable
  label: Enable or Disable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: "POST http://{projector-address}/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: warp_file_download
  label: Download Warp File
  kind: query
  command: "GET http://{projector-address}/api/image/processing/warp/file/transfer/{filename}"
  params:
    - name: filename
      type: string
      description: File to download; endpoint without filename may return current file when supported

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: blend_file_enable
  label: Enable or Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: black_level_file_select
  label: Select Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}'
  params:
    - name: filename
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: black_level_file_enable
  label: Enable or Disable Black-Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: black_level_file_upload
  label: Upload Black-Level Mask
  kind: action
  command: "POST http://{projector-address}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: Multipart form field named file

- id: dmx_mode_query
  label: Query DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":{id}}'
  params:
    - name: mode
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_start_channel_query
  label: Query DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_start_channel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}},"id":{id}}'
  params:
    - name: channel
      type: integer
      description: DMX start channel from 1 through 512
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_shutdown_query
  label: Query DMX Shutdown Setting
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
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

- id: network_ipv4_config_query
  label: Query IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: network_ipv4_config_set
  label: Set IPv4 Configuration
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{config}},"id":{id}}'
  params:
    - name: config
      type: object
      description: Address, Mask, Gateway, and NameServers fields
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: network_lan_state_query
  label: Query LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: shutter_position_query
  label: Query Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: shutter_target_query
  label: Query Shutter Target
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

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
      type: integer
      description: JSON-RPC request identifier

- id: zoom_position_query
  label: Query Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: focus_position_query
  label: Query Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: lens_shift_horizontal_query
  label: Query Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: lens_shift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: lens_shift_vertical_query
  label: Query Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: lens_shift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}},"id":{id}}'
  params:
    - name: position
      type: integer
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: standby_enable_query
  label: Query Standby Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: standby_enable_set
  label: Enable or Disable Standby
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: eco_enable_query
  label: Query ECO Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: eco_enable_set
  label: Enable or Disable ECO Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enabled}},"id":{id}}'
  params:
    - name: enabled
      type: boolean
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: eco_serial_wake
  label: Wake from ECO over RS-232
  kind: action
  command: ":POWR1\\r"
  params: []

- id: environment_alarm_state_query
  label: Query Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: environment_get_control_blocks
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

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params:
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: p7_reset_preset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{preset_name}"},"id":{id}}'
  params:
    - name: preset_name
      type: string
    - name: id
      type: integer
      description: JSON-RPC request identifier

- id: p7_reset_to_native
  label: Reset P7 to Native
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
  description: Value returned by property.get

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

- id: active_source
  type: string

- id: available_sources
  type: array
  items: string

- id: available_connectors
  type: array
  items: string

- id: detected_signal
  type: object
  fields:
    - active
    - name
    - vertical_total
    - horizontal_total
    - vertical_resolution
    - horizontal_resolution
    - vertical_sync_width
    - vertical_front_porch
    - vertical_back_porch
    - horizontal_sync_width
    - horizontal_front_porch
    - horizontal_back_porch
    - horizontal_frequency
    - vertical_frequency
    - pixel_rate
    - scan
    - bits_per_component
    - color_space
    - signal_range
    - chroma_sampling
    - gamma_type
    - color_primaries
    - mastering_luminance
    - content_aspect_ratio
    - is_stereo
    - stereo_mode

- id: illumination_state
  type: enum
  values:
    - On
    - Off

- id: laser_power
  type: float

- id: image_brightness
  type: float

- id: network_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: environment_alarm_state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: environment_control_blocks
  type: dictionary
  description: Sensor or control-block names mapped to floating-point readings

- id: firmware_component_status
  type: array
  fields:
    - name
    - versions
    - available
    - running
    - status
```

## Variables

```yaml
- id: active_source
  property: image.window.main.source
  type: string
  access: read_write

- id: illumination_state
  property: illumination.state
  type: enum
  values:
    - On
    - Off

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  unit: percent
  constraints: dynamic

- id: laser_min_power
  property: illumination.sources.laser.minpower
  type: float
  access: read_only
  unit: percent

- id: laser_max_power
  property: illumination.sources.laser.maxpower
  type: float
  access: read_only
  unit: percent

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
  items: string

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

- id: ipv4_config
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

- id: lens_shift_horizontal_position
  property: optics.lensshift.horizontal.position
  type: integer

- id: lens_shift_vertical_position
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
  command: property.changed
  description: Unsolicited notification containing an array of property/value pairs

- id: signal_callback
  command: signal.callback
  description: Unsolicited notification containing an array of signal/argument-list pairs

- id: model_updated
  signal: modelupdated
  description: Object structure changed because objects were added or removed

- id: introspect_object_changed
  signal: introspect.objectchanged
  fields:
    object: string
    newobject: boolean
```

## Macros

```yaml
- id: select_source
  label: Select Available Source
  steps:
    - command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'

- id: activate_warp_grid
  label: Upload and Activate Warp Grid
  steps:
    - command: "POST http://{projector-address}/api/image/processing/warp/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - command: "POST http://{projector-address}/api/image/processing/blend/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'

- id: activate_black_level_mask
  label: Upload and Activate Black-Level Mask
  steps:
    - command: "POST http://{projector-address}/api/image/processing/blacklevel/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
```

## Safety

```yaml
confirmation_required_for:
  - firmware_schedule_component_upgrade
interlocks:
  - action: system_power_on
    requirement: Verify system.state is standby or ready before issuing command.
  - action: system_power_off
    requirement: Verify system.state is on before issuing command.
  - action: laser_power_set
    requirement: Query dynamic minimum and maximum illumination power values before setting.
  - action: property_set
    requirement: Wait for property.set confirmation before setting same property again.
```

## Notes

JSON-RPC parameter order does not matter. Request identifiers are optional, but notifications contain no identifier and require no response. Subscribing does not return current property value; issue `property.get` separately. API availability is dynamic and depends on model, configuration, peripherals, and authenticated access level; use `introspect` to discover exact supported objects.

Normal end-user access may skip authentication. Higher access levels require a secret pass code. HTTP examples use `/api` endpoints, but source does not state HTTP port.

<!-- UNRESOLVED: source-device mismatch must be resolved before publishing this revision for Fsn Native Aux Card Nac. -->
<!-- UNRESOLVED: firmware compatibility and HTTP port not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:19:56.054Z
last_checked_at: 2026-08-05T08:04:11.630Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:04:11.630Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions map to JSON-RPC methods/properties/HTTP endpoints in the source; transport parameters (port 9090, baud 19200, /api path) all confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source identifies Pulse projectors, not Fsn Native Aux Card Nac; device compatibility requires verification."
- "HTTP port and firmware compatibility not stated in source."
- "secret pass code is installation-specific"
- "method parameters not stated in source\""
- "source-device mismatch must be resolved before publishing this revision for Fsn Native Aux Card Nac."
- "firmware compatibility and HTTP port not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
