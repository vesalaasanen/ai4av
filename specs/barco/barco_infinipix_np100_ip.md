---
spec_id: admin/barco-infinipix-np100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Infinipix NP100 Control Spec"
manufacturer: Barco
model_family: "Infinipix NP100"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Infinipix NP100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:18:34.046Z
last_checked_at: 2026-10-07T13:18:45.951Z
generated_at: 2026-10-07T13:18:45.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - network.device.lan.ip4config
  - optics.shutter.target
  - "complete enumeration of all dynamic objects/methods/signals (e.g. DMX, motors, lens variants) requires runtime introspection against a live device."
  - "no formal interlock procedures stated in source; safety guidance limited to pre-command state verification"
  - "firmware version compatibility ranges, voltage/current/power specifications, fault recovery sequences, and complete enumeration of DMX/motor/lens-variant methods are not documented in the source."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:45.951Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 action units match source methods and properties; transport supported; spec covers essentially the whole catalogue. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Infinipix NP100 Control Spec

## Summary
The Barco Infinipix NP100 is a projector supporting control via TCP/IP (port 9090) and RS-232 serial. The Pulse API is a JSON-RPC 2.0 service exposing methods, properties, and signals for power, sources, illumination, image adjustments, warping, blending, and environment telemetry.

<!-- UNRESOLVED: complete enumeration of all dynamic objects/methods/signals (e.g. DMX, motors, lens variants) requires runtime introspection against a live device. -->

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
  type: code  # source describes authenticate method with secret pass code; default access requires no auth
```

## Traits
```yaml
- powerable  # inferred from system.poweron / system.poweroff
- routable   # inferred from image.window.main.source selection
- queryable  # inferred from property.get / introspect examples
- levelable  # inferred from image.brightness / contrast / saturation / illumination power
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code setting user access level. Required only for elevated access.

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

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name, e.g. "DisplayPort 1" or "HDMI"

- id: list_sources
  label: List Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: property_set
  label: Property Set
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, e.g. "image.brightness"
    - name: value
      type: string
      description: Property value (string, integer, float, boolean, array, or object)

- id: property_get
  label: Property Get
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: id
      type: integer
      description: Request identifier

- id: property_get_multiple
  label: Property Get (Multiple)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]},"id":5}'
  params:
    - name: property1
      type: string
      description: Dot-notation property name
    - name: property2
      type: string
      description: Dot-notation property name

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":6,"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name to observe

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":7,"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"id":8,"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"id":9,"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"id":10,"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, e.g. "modelupdated"

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"id":11,"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"id":12,"signal":"{signal}"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"id":13,"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: introspect
  label: Introspect (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/omitted returns everything

- id: introspect_non_recursive
  label: Introspect (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false},"id":2}'
  params:
    - name: object
      type: string

- id: introspect_positional
  label: Introspect (Positional Params)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",{recursive}],"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"id":3,"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceObject}.listconnectors","id":4}'
  params:
    - name: sourceObject
      type: string
      description: Source object name, derived from source name by lowercasing and stripping non-word chars

- id: get_connector_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorObject}.detectedsignal"},"id":5}'
  params:
    - name: connectorObject
      type: string

- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":10,"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":12,"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":11,"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":14,"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":13,"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":16,"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":15,"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: get_illumination_power
  label: Get Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: set_illumination_power
  label: Set Illumination Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":5,"property":"illumination.sources.laser.power","value":{level}}}'
  params:
    - name: level
      type: integer
      description: Power level in percent

- id: get_illumination_min_power
  label: Get Min Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: get_illumination_max_power
  label: Get Max Illumination Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: get_environment_blocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":18}'
  params:
    - name: type
      type: string
      description: Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: e.g. Temperature, Speed, PWM, Voltage, Current, Power

- id: get_environment_alarm_info
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

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

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
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

- id: rgb_mode_next
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rs232_wake_from_eco
  label: Wake from ECO (RS-232)
  kind: action
  command: ":POWR1\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  query_command: '{"jsonrpc":"2.0","method":"property.get","id":1,"params":{"property":"system.state"}}'

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","id":0,"params":{"property":"illumination.state"}}'

- id: active_source
  type: string
  query_command: '{"jsonrpc":"2.0","method":"property.get","id":0,"params":{"property":"image.window.main.source"}}'

- id: illumination_power
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","id":3,"params":{"property":"illumination.sources.laser.power"}}'

- id: illumination_min_power
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","id":6,"params":{"property":"illumination.sources.laser.minpower"}}'

- id: illumination_max_power
  type: integer

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
```

## Variables
```yaml
- name: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01
  default: 0
- name: image.contrast
  type: float
  range: [0, 2]
  step: 0.01
  default: 1
- name: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2
- name: image.saturation
  type: float
  range: [0, 2]
  step: 0.01
  default: 1
- name: image.sharpness
  type: int
  range: [-2, 8]
  step: 1
- name: optics.zoom.position
  type: int
- name: optics.focus.position
  type: int
- name: optics.lensshift.horizontal.position
  type: int
- name: optics.lensshift.vertical.position
  type: int
- name: dmx.startchannel
  type: int
  range: [1, 512]
- name: dmx.mode
  type: string
- name: dmx.shutdown
  type: bool
- name: system.standby.enable
  type: bool
- name: system.eco.enable
  type: bool
- name: image.window.main.position
  type: object
- name: image.window.main.size
  type: object
```

## Events
```yaml
- id: property.changed
  description: Triggered when a property value changes. Params: array of {property: value} pairs.
- id: signal.callback
  description: Triggered when a signal is emitted. Params: array of {signal: arguments} pairs.
- id: modelupdated
  description: Triggered when the object structure changes (objects added or removed).
```

## Macros
```yaml
- id: upload_warp_file
  label: Upload Warp Grid File
  steps:
    - description: POST warp grid XML to HTTP endpoint
      command: "curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer"
    - description: Set selected warp file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
    - description: Enable warp processing
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
    - description: Enable warp file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'

- id: upload_blend_mask
  label: Upload Blend Mask
  steps:
    - description: POST blend mask PNG
      command: "curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer"
    - description: Select blend file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
    - description: Enable blend file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  steps:
    - description: POST black level mask PNG
      command: "curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer"
    - description: Select black level file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
    - description: Enable black level file
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
```

## Safety
```yaml
confirmation_required_for:
  - power_on   # inferred: source advises verifying state is standby/ready before power on
  - power_off  # inferred: source advises verifying state is on before power off
interlocks: []
# UNRESOLVED: no formal interlock procedures stated in source; safety guidance limited to pre-command state verification
```

## Notes
- TCP service is on port 9090; RS-232 settings 19200/8N1 with no flow control.
- Authentication is optional for normal end-user access; higher access requires `authenticate` method with secret pass code.
- Source names must be translated to object names by lowercasing and stripping non-word characters.
- API is dynamic: lens type, lens position, peripherals (e.g. DMX mode) affect which objects/methods are present. Use `introspect` to discover runtime API.
- ECO-mode wake-up options: Wake-on-LAN, remote/keypad power button, or RS-232 command `:POWR1\r`.
- JSON-RPC `params` member ordering is insignificant.
- `property.set` requires waiting for confirmation before issuing another set on the same property.
- File uploads use HTTP POST to `/api/...` endpoints, distinct from the JSON-RPC channel.
<!-- UNRESOLVED: firmware version compatibility ranges, voltage/current/power specifications, fault recovery sequences, and complete enumeration of DMX/motor/lens-variant methods are not documented in the source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:18:34.046Z
last_checked_at: 2026-10-07T13:18:45.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:45.951Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 action units match source methods and properties; transport supported; spec covers essentially the whole catalogue. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- network.device.lan.ip4config
- optics.shutter.target
- "complete enumeration of all dynamic objects/methods/signals (e.g. DMX, motors, lens variants) requires runtime introspection against a live device."
- "no formal interlock procedures stated in source; safety guidance limited to pre-command state verification"
- "firmware version compatibility ranges, voltage/current/power specifications, fault recovery sequences, and complete enumeration of DMX/motor/lens-variant methods are not documented in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
