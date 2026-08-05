---
spec_id: admin/barco-pulse-json-rpc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse API (G Lens 126 158) Control Spec"
manufacturer: Barco
model_family: "G Lens 126 158"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "G Lens 126 158"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:06:57.230Z
last_checked_at: 2026-08-05T08:13:17.467Z
generated_at: 2026-08-05T08:13:17.467Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, specific lens model coverage, exact TCP framing/newline behavior on port 9090"
  - "TCP framing (line endings), HTTP port for /api, RS-232 wake-byte interaction with Pulse JSON-RPC framing, specific lens (G Lens 126 158) compatibility vs. full Pulse API"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:13:17.467Z
  matched_actions: 63
  action_count: 63
  confidence: medium
  summary: "All 63 spec actions match wire-level tokens in the source; transport (port 9090, 19200 8N1) is verbatim; every source method is represented via Actions or Feedbacks/Variables. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco Pulse API (G Lens 126 158) Control Spec

## Summary
JSON-RPC 2.0 control surface for Barco Pulse projectors (sold with G Lens 126 158). Exposes power, illumination, source selection, picture settings, warping, blending, environment telemetry, and DMX/optics control over TCP/IP (port 9090) or RS-232 (19200 8N1). An HTTP file-transfer endpoint is provided for warp/blend/blacklevel assets.

<!-- UNRESOLVED: firmware version compatibility, specific lens model coverage, exact TCP framing/newline behavior on port 9090 -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source: "authenticate" method with "code" param; optional for normal end-user access
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
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code granting elevated access level

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

- id: introspect_recursive
  label: Introspect (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: introspect_nonrecursive
  label: Introspect (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}'
  params:
    - name: object
      type: string

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'

- id: get_property
  label: Property Get
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string

- id: set_property
  label: Property Set
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
    - name: value
      type: string

- id: get_properties_multiple
  label: Property Get (multiple)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array

- id: subscribe_property
  label: Property Subscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string

- id: subscribe_properties_multiple
  label: Property Subscribe (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array

- id: unsubscribe_property
  label: Property Unsubscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string

- id: unsubscribe_properties_multiple
  label: Property Unsubscribe (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array

- id: subscribe_signal
  label: Signal Subscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string

- id: subscribe_signals_multiple
  label: Signal Subscribe (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array

- id: unsubscribe_signal
  label: Signal Unsubscribe
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string

- id: unsubscribe_signals_multiple
  label: Signal Unsubscribe (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array

- id: subscribe_modelupdated
  label: Subscribe Model Updated Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":2}'

- id: image_source_list
  label: List Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'

- id: source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source_object_name
      type: string
      description: Lowercased source name with non-word chars stripped (e.g. displayport1)

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name returned by image.source.list

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'

- id: environment_getcontrolblocks_temperature
  label: Environment Temperature Snapshot
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
    - name: valuetype
      type: string

- id: environment_getcontrolblocks_speed
  label: Environment Fan Speed Snapshot
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":19}'
  params:
    - name: type
      type: string
    - name: valuetype
      type: string

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'

- id: illumination_set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Power percent

- id: p7_copy_preset_to_custom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"..."}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: P7 Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"..."}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'

- id: rgbmode_next
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.rgbmode.nextrgbmode"}'

- id: warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: warp_select_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string

- id: warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: blend_select_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string

- id: blend_file_enable
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: blacklevel_select_file
  label: Select Blacklevel File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string

- id: blacklevel_file_enable
  label: Enable Blacklevel File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'

- id: eco_wake_via_serial
  label: Wake From ECO via Serial
  kind: action
  command: ':POWR1\r'
  notes: Send ASCII :POWR1\r over RS-232 to wake a projector in ECO mode

- id: set_image_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: number
      description: "Range -1 to 1, step 0.01"

- id: set_image_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1},"id":9}'
  params:
    - name: value
      type: number
      description: "Range 0 to 2, step 0.01"

- id: set_image_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":9}'
  params:
    - name: value
      type: number
      description: "Range 1 to 3, step 0.1"

- id: set_image_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1},"id":9}'
  params:
    - name: value
      type: number
      description: "Range 0 to 2, step 0.01"

- id: set_image_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":9}'
  params:
    - name: value
      type: integer
      description: "Range -2 to 8"

- id: set_image_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":9}'
  params:
    - name: value
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: set_window_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":9}'
  params:
    - name: value
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Closed"}}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: set_optics_zoom
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_optics_focus
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_horizontal
  label: Set Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_vertical
  label: Set Lens Shift Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_network_ip4config
  label: Set LAN IPv4 Config
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{"Address":"...","Mask":"...","Gateway":"...","NameServers":"..."}}}'
  params:
    - name: value
      type: object

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: "1..512"

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"..."}}'
  params:
    - name: value
      type: string

- id: set_system_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: set_system_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  default: 0

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]

- id: illumination_laser_power
  type: integer
  range: [0, 100]
  description: percent
  property: illumination.sources.laser.power

- id: illumination_laser_minpower
  type: integer
  property: illumination.sources.laser.minpower

- id: illumination_laser_maxpower
  type: integer
  property: illumination.sources.laser.maxpower

- id: window_position_x
  type: integer
  property: image.window.main.position.x

- id: window_position_y
  type: integer
  property: image.window.main.position.y

- id: window_size_width
  type: integer
  property: image.window.main.size.width

- id: window_size_height
  type: integer
  property: image.window.main.size.height

- id: optics_zoom_position
  type: integer
  property: optics.zoom.position

- id: optics_focus_position
  type: integer
  property: optics.focus.position

- id: optics_lensshift_horizontal
  type: integer
  property: optics.lensshift.horizontal.position

- id: optics_lensshift_vertical
  type: integer
  property: optics.lensshift.vertical.position

- id: dmx_startchannel
  type: integer
  range: [1, 512]
```

## Events
```yaml
- id: property_changed
  notification: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":100}]}}'
  description: Server pushes property value changes after subscribe

- id: signal_callback
  notification: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'
  description: Server pushes signal emissions after subscribe

- id: modelupdated
  notification: modelupdated signal fires when objects are added/removed
```

## Macros
```yaml
- id: warp_upload_and_enable
  label: Upload and Enable Warp Grid
  steps:
    - "curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer"
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'

- id: blend_upload_and_enable
  label: Upload and Enable Blend Mask
  steps:
    - "curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer"
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

- id: blacklevel_upload_and_enable
  label: Upload and Enable Blacklevel Mask
  steps:
    - "curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer"
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
    - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'

- id: safe_power_on
  label: Safe Power On
  steps:
    - "Verify system.state is standby or ready (property.get system.state)"
    - '{"jsonrpc":"2.0","method":"system.poweron"}'

- id: safe_power_off
  label: Safe Power Off
  steps:
    - "Verify system.state is on (property.get system.state)"
    - '{"jsonrpc":"2.0","method":"system.poweroff"}'
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - image.processing.warp.enable
  - image.processing.blend.file.enable
interlocks: []
```

## Notes
Pulse API uses JSON-RPC 2.0 over TCP/9090 and RS-232 (19200 8N1). HTTP file endpoints at `http://{host}/api/...` for warp/blend/blacklevel assets. Authentication optional for end-user access; requires passcode for elevated access levels. Recommend introspecting object model before driving — API surface is dynamic per configuration (lens motorization, DMX mode, etc.).

Serial wake-from-ECO command is ASCII `:POWR1\r` (raw, not JSON-RPC). Wait for property.set confirmation before reissuing same property (avoid request flooding).

<!-- UNRESOLVED: TCP framing (line endings), HTTP port for /api, RS-232 wake-byte interaction with Pulse JSON-RPC framing, specific lens (G Lens 126 158) compatibility vs. full Pulse API -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:06:57.230Z
last_checked_at: 2026-08-05T08:13:17.467Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:13:17.467Z
matched_actions: 63
action_count: 63
confidence: medium
summary: "All 63 spec actions match wire-level tokens in the source; transport (port 9090, 19200 8N1) is verbatim; every source method is represented via Actions or Feedbacks/Variables. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, specific lens model coverage, exact TCP framing/newline behavior on port 9090"
- "TCP framing (line endings), HTTP port for /api, RS-232 wake-byte interaction with Pulse JSON-RPC framing, specific lens (G Lens 126 158) compatibility vs. full Pulse API"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
