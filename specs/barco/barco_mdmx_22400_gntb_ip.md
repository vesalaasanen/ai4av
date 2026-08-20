---
spec_id: admin/barco-mdmx-22400-gntb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco MDMX 22400 GNTB Control Spec"
manufacturer: Barco
model_family: "MDMX 22400 GNTB"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "MDMX 22400 GNTB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:07:34.697Z
last_checked_at: 2026-08-19T08:58:23.568Z
generated_at: 2026-08-19T08:58:23.568Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility ranges and exact feature availability per hardware/peripheral configuration are dynamic — source states introspection is required to know actual API for a given configuration"
  - "source documents a sequence (upload warp file → select warp file → enable warp file)"
  - "full property/method/signal catalogue is dynamic; only those documented in the source are listed above. Firmware upgrade procedures and full DMX channel mapping are model/configuration-dependent and must be discovered via introspection."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:58:23.568Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec action units (JSON-RPC methods, HTTP endpoints, serial wake) and all transport values match the source verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco MDMX 22400 GNTB Control Spec

## Summary
The Barco MDMX 22400 GNTB is a projector controllable via JSON-RPC 2.0 over TCP/IP on port 9090, and via RS-232 serial using a fixed ASCII wake-up command. The spec covers the Pulse API: power, input selection, illumination, picture settings, warping, blending, black level, environment telemetry, and DMX/optic/firmware introspection.

<!-- UNRESOLVED: firmware compatibility ranges and exact feature availability per hardware/peripheral configuration are dynamic — source states introspection is required to know actual API for a given configuration -->

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
  type: code  # explicit: source documents an authentication method "authenticate" with params {id, code}
```

## Traits
```yaml
- powerable  # inferred from system.poweron / system.poweroff examples
- routable  # inferred from image.window.main.source input selection examples
- queryable  # inferred from system.state and other property.get examples
- levelable  # inferred from illumination.sources.laser.power (RW) and image.brightness/contrast/gamma/saturation examples
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": 98765 }, "id": 1}'
  params:
    - name: id
      type: integer
      description: Request identifier
    - name: code
      type: integer
      description: Secret pass code that sets user access level

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} }, "id": {id}}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation
    - name: value
      type: string
      description: Value appropriate for the property's type
    - name: id
      type: integer
      description: Request identifier

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" }, "id": {id}}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation
    - name: id
      type: integer
      description: Request identifier

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["{prop1}", "{prop2}"] }, "id": {id}}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name
    - name: id
      type: integer
      description: Request identifier

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" }, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property name to subscribe to
    - name: id
      type: integer
      description: Request identifier

- id: property_subscribe_multi
  label: Subscribe To Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["{prop1}", "{prop2}"] }, "id": {id}}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name
    - name: id
      type: integer
      description: Request identifier

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" }, "id": {id}}'
  params:
    - name: property
      type: string
      description: Property name to stop observing
    - name: id
      type: integer
      description: Request identifier

- id: property_unsubscribe_multi
  label: Unsubscribe From Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["{prop1}", "{prop2}"] }, "id": {id}}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name
    - name: id
      type: integer
      description: Request identifier

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" }, "id": {id}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated)
    - name: id
      type: integer
      description: Request identifier

- id: signal_subscribe_multi
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["{sig1}", "{sig2}"] }, "id": {id}}'
  params:
    - name: sig1
      type: string
      description: First signal name
    - name: sig2
      type: string
      description: Second signal name
    - name: id
      type: integer
      description: Request identifier

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" }, "id": {id}}'
  params:
    - name: signal
      type: string
      description: Signal name
    - name: id
      type: integer
      description: Request identifier

- id: signal_unsubscribe_multi
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["{sig1}", "{sig2}"] }, "id": {id}}'
  params:
    - name: sig1
      type: string
      description: First signal name
    - name: sig2
      type: string
      description: Second signal name
    - name: id
      type: integer
      description: Request identifier

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true }, "id": {id}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed); empty/omitted introspects everything
    - name: id
      type: integer
      description: Request identifier

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": [ "{object}", false ], "id": {id}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed)
    - name: id
      type: integer
      description: Request identifier

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "id": 3, "led": "systemstatus", "color": "{color}", "period": {period} }, "id": 3}'
  params:
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors", "id": 4}'
  params:
    - name: sourcename
      type: string
      description: Lowercase source object name (non-word chars stripped), e.g. "displayport1"

- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "params": {}, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" }, "id": {id}}'
  params:
    - name: type
      type: string
      description: Sensor type - one of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: Sensor value type - e.g. Temperature, Speed, PWM, Voltage, Current, Power
    - name: id
      type: integer
      description: Request identifier

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": { "component": "{component}" }, "id": {id}}'
  params:
    - name: component
      type: string
      description: Firmware component name (from firmware.listcomponents)
    - name: id
      type: integer
      description: Request identifier

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" }, "id": {id}}'
  params:
    - name: presetname
      type: string
      description: Preset name
    - name: id
      type: integer
      description: Request identifier

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset To Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" }, "id": {id}}'
  params:
    - name: presetname
      type: string
      description: Preset name
    - name: id
      type: integer
      description: Request identifier

- id: image_color_p7_custom_resettonative
  label: Reset P7 To Native Colors
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "params": {}, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "params": {}, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" }, "id": 2}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI"); obtain list via image.source.list

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
  params: []

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
  params: []

- id: subscribe_system_state
  label: Subscribe To System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe To Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'
  params: []

- id: set_laser_power
  label: Set Laser Power (percent)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": {percent} }, "id": 5}'
  params:
    - name: percent
      type: integer
      description: Target power in percent (consult minpower/maxpower)

- id: subscribe_laser_power
  label: Subscribe To Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.sources.laser.power" }, "id": 4}'
  params: []

- id: get_laser_minpower
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": 5}'
  params: []

- id: get_image_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" }, "id": 7}'
  params: []

- id: set_image_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": {value} }, "id": 9}'
  params:
    - name: value
      type: float
      description: Normalized offset (0 default, 1 = 100% offset, -1..1)

- id: subscribe_image_brightness
  label: Subscribe To Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params: []

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: float
      description: Normalized gain (1 default, 0..2)
    - name: id
      type: integer
      description: Request identifier

- id: set_image_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: float
      description: Gamma (default 2.2, range 1..3)
    - name: id
      type: integer
      description: Request identifier

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: float
      description: Normalized saturation (1 default, 0..2)
    - name: id
      type: integer
      description: Request identifier

- id: set_image_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness (-2..8)
    - name: id
      type: integer
      description: Request identifier

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "{orientation}" }, "id": {id}}'
  params:
    - name: orientation
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR
    - name: id
      type: integer
      description: Request identifier

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": {x}, "y": {y} } }, "id": {id}}'
  params:
    - name: x
      type: integer
      description: Window X position
    - name: y
      type: integer
      description: Window Y position
    - name: id
      type: integer
      description: Request identifier

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": {width}, "height": {height} } }, "id": {id}}'
  params:
    - name: width
      type: integer
      description: Window width
    - name: height
      type: integer
      description: Window height
    - name: id
      type: integer
      description: Request identifier

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "{mode}" }, "id": {id}}'
  params:
    - name: mode
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch
    - name: id
      type: integer
      description: Request identifier

- id: enable_warp
  label: Enable Warp (global)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params: []

- id: select_warp_file
  label: Select Active Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{filename}" }, "id": 11}'
  params:
    - name: filename
      type: string
      description: Name of previously uploaded warp file (e.g. warp.xml)

- id: enable_warp_file
  label: Enable File-Based Warping
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params: []

- id: upload_warp_file
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{warpfile} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: warpfile
      type: string
      description: Local path to warp XML file (e.g. warp.xml)
    - name: address
      type: string
      description: Projector IP address (e.g. 192.168.1.100)

- id: select_blend_file
  label: Select Active Blend Files
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": ["{filename}"] }, "id": 13}'
  params:
    - name: filename
      type: string
      description: Name of previously uploaded blend mask (e.g. mask.png)

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{maskfile} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: maskfile
      type: string
      description: Local path to blend mask PNG (8 or 16 bit, grayscale)
    - name: address
      type: string
      description: Projector IP address

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{filename}" }, "id": 15}'
  params:
    - name: filename
      type: string
      description: Name of previously uploaded black level mask

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{maskfile} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: maskfile
      type: string
      description: Local path to black level mask PNG (8 or 16 bit, grayscale)
    - name: address
      type: string
      description: Projector IP address

- id: get_signal_info
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.{connectorname}.detectedsignal" }, "id": 5}'
  params:
    - name: connectorname
      type: string
      description: Lowercase connector object name (e.g. "l1hdmi")

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "{mode}" }, "id": {id}}'
  params:
    - name: mode
      type: string
      description: DMX mode (obtain list via dmx.listmodes)
    - name: id
      type: integer
      description: Request identifier

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": {channel} }, "id": {id}}'
  params:
    - name: channel
      type: integer
      description: DMX start channel in range 1..512
    - name: id
      type: integer
      description: Request identifier

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: boolean
      description: True to enable DMX shutdown
    - name: id
      type: integer
      description: Request identifier

- id: set_lan_ip4config
  label: Set LAN IPv4 Configuration
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "network.device.lan.ip4config", "value": { "Address": "{address}", "Mask": "{mask}", "Gateway": "{gateway}", "NameServers": "{nameservers}" } }, "id": {id}}'
  params:
    - name: address
      type: string
      description: IPv4 address
    - name: mask
      type: string
      description: IPv4 netmask
    - name: gateway
      type: string
      description: IPv4 gateway
    - name: nameservers
      type: string
      description: DNS servers
    - name: id
      type: integer
      description: Request identifier

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "{target}" }, "id": {id}}'
  params:
    - name: target
      type: string
      description: One of Open, Closed
    - name: id
      type: integer
      description: Request identifier

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_lensshift_horizontal_position
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: get_lensshift_vertical_position
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: set_system_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: boolean
      description: True/false; verify availability via introspection first
    - name: id
      type: integer
      description: Request identifier

- id: set_system_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": {value} }, "id": {id}}'
  params:
    - name: value
      type: boolean
      description: True/false; verify availability via introspection first
    - name: id
      type: integer
      description: Request identifier

- id: get_environment_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": {id}}'
  params:
    - name: id
      type: integer
      description: Request identifier

- id: serial_wake_from_eco
  label: Wake From ECO Mode (RS-232)
  kind: action
  command: ':POWR1\r'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: scan_type
  type: enum
  values: [Progressive]

- id: color_space
  type: enum
  values: [RGB]

- id: signal_range
  type: enum
  values: ["0-255", "16-235"]

- id: chroma_sampling
  type: enum
  values: ["4:4:4", "4:2:2", "4:2:0"]

- id: gamma_type
  type: enum
  values: [POWER, sRGB, REC_BT1886, SMPTE_ST2084]

- id: color_primaries
  type: enum
  values: [REC709, REC2020, "DCI-P3-D65", "DCI-P3-Theater"]

- id: content_aspect_ratio
  type: enum
  values: ["5:4", "4:3", "16:10", "16:9", "1.85:1", "2.20:1", "2.35:1", "2.37:1", "2.39:1", "Unknown"]

- id: stereo_mode
  type: enum
  values: [None, Sequential, FramePacked, TopBottom, SideBySide]

- id: firmware_upgrade_status
  type: enum
  values: [Unknown, OK, Upgradable]

- id: detected_signal
  type: object
  description: |
    Object returned by image.connector.{name}.detectedsignal property.get; includes
    active (bool), name (string), vertical_total, horizontal_total,
    vertical_resolution, horizontal_resolution, vertical_sync_width,
    vertical_front_porch, vertical_back_porch, horizontal_sync_width,
    horizontal_front_porch, horizontal_back_porch, horizontal_frequency,
    vertical_frequency, pixel_rate, scan, bits_per_component, color_space,
    signal_range, chroma_sampling, gamma_type, color_primaries,
    mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode
```

## Variables
```yaml
- id: image_brightness
  type: float
  min: -1
  max: 1
  step: 0.01
  description: Image brightness/offset (0 default, 1 = 100% offset)
- id: image_contrast
  type: float
  min: 0
  max: 2
  step: 0.01
  description: Image contrast/gain (1 default)
- id: image_gamma
  type: float
  min: 1
  max: 3
  step: 0.1
  description: Image gamma (2.2 default)
- id: image_saturation
  type: float
  min: 0
  max: 2
  step: 0.01
  description: Image color saturation (1 default)
- id: image_sharpness
  type: integer
  min: -2
  max: 8
  step: 1
  description: Image sharpness
- id: illumination_laser_power
  type: integer
  min: 0
  max: 100
  description: Laser illumination power in percent (range bounded by minpower/maxpower)
- id: optics_zoom_position
  type: integer
  description: Current zoom motor position
- id: optics_focus_position
  type: integer
  description: Current focus motor position
- id: optics_lensshift_horizontal_position
  type: integer
  description: Current horizontal lens shift position
- id: optics_lensshift_vertical_position
  type: integer
  description: Current vertical lens shift position
- id: dmx_startchannel
  type: integer
  min: 1
  max: 512
  description: DMX start channel
- id: dmx_mode
  type: string
  description: Current DMX mode name
- id: dmx_shutdown
  type: boolean
  description: Whether DMX shutdown is enabled
- id: system_standby_enable
  type: boolean
  description: Whether standby state is enabled
- id: system_eco_enable
  type: boolean
  description: Whether ECO state is enabled
- id: network_lan_ip4config
  type: object
  description: |
    IPv4 LAN configuration object with keys Address (string), Mask (string),
    Gateway (string), NameServers (string)
```

## Events
```yaml
- id: property_changed
  description: |
    Server-initiated JSON-RPC notification with no id. Params contain an array of
    property/value pairs. Client must implement a listener. Example:
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }
- id: signal_callback
  description: |
    Server-initiated JSON-RPC notification carrying signal/argument-list pairs.
    Example:
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { "arg1": 100, "arg2": "cat" } } ] } }
- id: introspect_objectchanged
  description: |
    Signal payload delivered via signal.callback when the introspect model
    changes (object added/removed). Argument object: { "object": "name", "newobject": true|false }
- id: modelupdated
  description: Signal that fires when the introspected object structure changes (objects added/removed).
```

## Macros
```yaml
# UNRESOLVED: source documents a sequence (upload warp file → select warp file → enable warp file)
# but does not provide a named macro. Listed here as a procedure for implementers.
- id: warp_grid_apply
  description: |
    Three-step procedure to apply a warp grid file:
    1. Upload file via HTTP: curl -X POST -F file=@warp.xml http://<addr>/api/image/processing/warp/file/transfer
    2. Select file: property.set image.processing.warp.file.selected = "warp.xml"
    3. Enable file warp: property.set image.processing.warp.file.enable = true
    (Globally enable warp first: property.set image.processing.warp.enable = true)
- id: blend_mask_apply
  description: |
    Procedure to apply a blend mask:
    1. Upload via HTTP: curl -X POST -F file=@mask.png http://<addr>/api/image/processing/blend/file/transfer
    2. Select file: property.set image.processing.blend.file.selected = ["mask.png"]
    3. Enable: property.set image.processing.blend.file.enable = true
- id: blacklevel_mask_apply
  description: |
    Procedure to apply a black level mask:
    1. Upload via HTTP: curl -X POST -F file=@blacklevel.png http://<addr>/api/image/processing/blacklevel/file/transfer
    2. Select file: property.set image.processing.blacklevel.file.selected = "blacklevel.png"
    3. Enable: property.set image.processing.blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      Verify system.state is "standby" or "ready" before issuing system.poweron;
      verify system.state is "on" before issuing system.poweroff. State transitions
      are no-ops when projector is already in target state or in transition.
  - description: |
      On ECO-mode projectors, sending a TCP request alone will not wake the unit.
      Wake up requires: (a) wake-on-LAN using the projector MAC address, (b)
      the IR remote power button, (c) the keypad power button, or (d) sending
      the ASCII command ":POWR1\r" to the RS-232 serial port.
  - description: |
      When sending property.set repeatedly to the same property, wait for
      confirmation between calls. Continuous fire-and-forget may flood the
      server and reduce performance.
```

## Notes
- Protocol is JSON-RPC 2.0 over TCP port 9090; parameters are passed by name and ordering does not matter.
- The Pulse API is dynamic: feature availability depends on connected peripherals (e.g. motorised lens), DMX mode (basic vs extended), and projector configuration. Always introspect the target projector to confirm available properties, objects, methods, and signals.
- For end-user level access, the authentication request may be skipped; authentication is only required to elevate to a higher access level.
- HTTP file endpoints are used for warp grids, blend masks, and black-level masks. JSON-RPC is used to select/activate uploaded files and to enable file-based processing.
- Image formats accepted for blend and black-level masks: PNG (up to 16-bit), JPEG, TIFF. Only the blue channel is used.
- Blend mask resolutions: WUXGA → 1920x1200; WQXGA → 1280x800; 4K → 1280x800; 4K Cinemascope → 1280x540. Source object names are derived from source names by stripping non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").

<!-- UNRESOLVED: full property/method/signal catalogue is dynamic; only those documented in the source are listed above. Firmware upgrade procedures and full DMX channel mapping are model/configuration-dependent and must be discovered via introspection. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:07:34.697Z
last_checked_at: 2026-08-19T08:58:23.568Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:58:23.568Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec action units (JSON-RPC methods, HTTP endpoints, serial wake) and all transport values match the source verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility ranges and exact feature availability per hardware/peripheral configuration are dynamic — source states introspection is required to know actual API for a given configuration"
- "source documents a sequence (upload warp file → select warp file → enable warp file)"
- "full property/method/signal catalogue is dynamic; only those documented in the source are listed above. Firmware upgrade procedures and full DMX channel mapping are model/configuration-dependent and must be discovered via introspection."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
