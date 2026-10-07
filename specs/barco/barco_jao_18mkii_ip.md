---
spec_id: admin/barco-jao-18mkii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Jao 18Mkii Control Spec"
manufacturer: Barco
model_family: "Jao 18Mkii"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Jao 18Mkii"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:20:27.012Z
last_checked_at: 2026-10-07T13:20:31.643Z
generated_at: 2026-10-07T13:20:31.643Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete property list varies by model and peripherals; do full introspection against a live device for an authoritative list"
  - "source documents step-by-step sequences (e.g. warp enable + upload + select + enable;"
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "complete dynamic property/method/signal catalogue requires runtime introspection; source only documents a subset."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:20:31.643Z
  matched_actions: 90
  action_count: 90
  confidence: medium
  summary: "All 90 action units match source methods, properties and curl endpoints; transport supported; source is a generic Pulse API guide that does not name the Jao 18Mkii. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Jao 18Mkii Control Spec

## Summary
Barco Jao 18Mkii Pulse-platform projector. This spec covers the JSON-RPC 2.0 control surface exposed over TCP port 9090 and the legacy RS-232 serial interface (19200/8/N/1). Commands include system power, source selection, illumination/laser power control, image adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/blacklevel file upload, optics (zoom/focus/lensshift/shutter), and DMX/network introspection.

<!-- UNRESOLVED: complete property list varies by model and peripherals; do full introspection against a live device for an authoritative list -->

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
  type: passcode  # source: "authenticate" method requires a secret pass code; normal end-user access can skip auth
```

## Traits
```yaml
- powerable      # system.poweron / system.poweroff
- routable       # image.window.main.source (input routing)
- queryable      # property.get across many state properties
- levelable      # illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness
```

## Actions
```yaml
# JSON-RPC 2.0 envelope. All actions are TCP port 9090 by default unless noted.
# command templates use JSON-RPC 2.0 with id field omitted where source omits it.

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":3}'
  params: []
  notes: Verify state is standby or ready before issuing.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":4}'
  params: []
  notes: Verify state is on before issuing.

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: system_state_subscribe
  label: Subscribe to Projector State Changes
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: authenticate
  label: Authenticate (set elevated access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765 in source)
  notes: Required only for access above normal end-user level.

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"id":3,"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"id":3,"property":"objectname.propertyname","value":100}}'
  params:
    - name: property
      type: string
    - name: value
      type: any

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":4,"property":"objectname.propertyname"}}'
  params:
    - name: property
      type: string

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"id":5,"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      items: string

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":6,"property":"image.brightness"}}'
  params:
    - name: property
      type: string_or_array

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"id":7,"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      items: string

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"id":8,"property":"image.brightness"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"id":9,"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      items: string

- id: signal_subscribe
  label: Subscribe to Signal
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"id":10,"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string_or_array

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"id":11,"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array
      items: string

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"id":12,"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"id":13,"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array
      items: string

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: source_connectors_list
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source
      type: string
      description: Object name derived from source name (lowercase, no non-word chars)

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: subscribe_source_changes
  label: Subscribe to Source Changes
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}'
  params:
    - name: connector
      type: string

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: introspect_illumination_sources
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"property":"illumination.sources","recursive":false},"id":2}'
  params: []

- id: get_laser_power
  label: Get Laser Power Level (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: set_laser_power
  label: Set Laser Power Level (%)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: subscribe_laser_power
  label: Subscribe to Laser Power Changes
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []

- id: get_laser_min_power
  label: Get Laser Min Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: get_laser_max_power
  label: Get Laser Max Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":5}'
  params: []
  notes: Source example reuses the .power property as a "max" read in the example block.

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: -1 to 1 (0 default, 1 = 100% offset)

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: subscribe_brightness
  label: Subscribe to Brightness Changes
  kind: subscribe
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness"]},"id":8}'
  params: []

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"image","recursive":false},"id":6}'
  params: []

- id: set_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params: []

- id: upload_warp_file
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params: []
  notes: HTTP file endpoint; replace 192.168.1.100 with projector address.

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params: []

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string

- id: enable_blend_file
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params: []

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string

- id: enable_blacklevel_file
  label: Enable File Black Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1}}'
  params:
    - name: value
      type: float
      description: 0 to 2 (1 default)

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: 1 to 3 (2.2 default)

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1}}'
  params:
    - name: value
      type: float
      description: 0 to 2 (1 default)

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: -2 to 8

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: enum
      description: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: set_window_position
  label: Set Main Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: value
      type: object

- id: set_window_size
  label: Set Main Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}}}'
  params:
    - name: value
      type: object

- id: set_scaling_mode
  label: Set Main Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: enum
      description: Fill, OneToOne, FillScreen, Stretch

- id: set_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"Open"}}'
  params:
    - name: value
      type: enum
      description: Open, Closed

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: enum
      description: Open, Closed

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0}}'
  params:
    - name: value
      type: integer

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: get_environment_temperatures
  label: Get Environment Temperatures
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params: []

- id: get_environment_fan_speeds
  label: Get Environment Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":19}'
  params: []

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"basic"}}'
  params:
    - name: value
      type: string

- id: set_dmx_start_channel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false}}'
  params:
    - name: value
      type: boolean

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
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

- id: p7_preset_copy_to_custom
  label: P7 Preset Copy to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"preset1"}}'
  params:
    - name: presetname
      type: string

- id: p7_preset_reset
  label: P7 Preset Reset to Default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"preset1"}}'
  params:
    - name: presetname
      type: string

- id: p7_preset_reset_native
  label: P7 Preset Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rgbmode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: get_lan_ipv4_config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_lan_state
  label: Get LAN Connection State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: serial_eco_wake
  label: ECO Wake on Serial (RS-232)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII sent on the RS-232 serial port. The same string also wakes projectors in ECO mode.

- id: select_hdmi_source
  label: Select HDMI as Input Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"HDMI"}}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list

- id: introspect_recursive_positional
  label: Introspect Object (recursive positional parameters)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: introspect_nonrecursive_positional
  label: Introspect Object (non-recursive positional parameters)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["motors",false],"id":2}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  notes: Property system.state per source.
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'

- id: illumination_state
  type: enum
  values: [On, Off]
  notes: Property illumination.state.
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  notes: Property environment.alarmstate.

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  notes: Property network.device.lan.state.

- id: shutter_position
  type: enum
  values: [Open, Closed]
  notes: Property optics.shutter.position.

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: content_aspect_ratio
  type: enum
  values: ["5:4", "4:3", "16:10", "16:9", "1.85:1", "2.20:1", "2.35:1", "2.37:1", "2.39:1", "Unknown"]

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
  values: [REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]

- id: stereo_mode
  type: enum
  values: [None, Sequential, FramePacked, TopBottom, SideBySide]

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
```

## Variables
```yaml
- id: brightness
  type: float
  range: [-1, 1]
  default: 0
  description: image.brightness; 0 default, 1 = 100% offset.

- id: contrast
  type: float
  range: [0, 2]
  default: 1

- id: gamma
  type: float
  range: [1, 3]
  default: 2.2

- id: saturation
  type: float
  range: [0, 2]
  default: 1

- id: sharpness
  type: integer
  range: [-2, 8]

- id: laser_power_percent
  type: integer
  range: [0, 100]
  description: illumination.sources.laser.power; runtime min/max dynamic per optics.

- id: laser_min_power_percent
  type: float
  description: illumination.sources.laser.minpower; read-only, dynamic.

- id: laser_max_power_percent
  type: float
  description: illumination.sources.laser.maxpower; read-only, dynamic.

- id: zoom_position
  type: integer

- id: focus_position
  type: integer

- id: lensshift_horizontal_position
  type: integer

- id: lensshift_vertical_position
  type: integer

- id: dmx_start_channel
  type: integer
  range: [1, 512]

- id: lan_ipv4_config
  type: object
  description: network.device.lan.ip4config; fields: Address, Mask, Gateway, NameServers.
```

## Events
```yaml
- id: modelupdated
  description: Emitted when the API object structure changes (objects added or removed). Subscribe via signal.subscribe.
- id: property_changed
  description: Emitted on the client with an array of property/value pairs whenever a subscribed property value changes.
- id: signal_callback
  description: Emitted on the client with an array of signal/argument-list pairs for subscribed signals.
- id: introspect_objectchanged
  description: Signal of the introspect API; payload includes object name and isnew boolean.
```

## Macros
```yaml
# UNRESOLVED: source documents step-by-step sequences (e.g. warp enable + upload + select + enable;
# blend mask upload + select + enable; blacklevel upload + select + enable) but as separate property.set
# calls rather than a named macro. Sequences not modeled here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source.
# Best practice per source: verify system.state is standby/ready before system.poweron, and on before system.poweroff.
```

## Notes
- JSON-RPC 2.0 over TCP/9090. Same commands available over RS-232 framing per source.
- Auth is optional for normal end-user access; required for higher access levels via `authenticate` with a pass code.
- ECO-mode wake: serial `:POWR1\r` ASCII, WOL, remote, or keypad.
- File endpoints under `/api/...` (e.g. `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`) accept HTTP POST uploads.
- Source notes API is dynamic; use `introspect` against a live device for the authoritative property/method/signal list.
- Some properties in source (e.g. service state in `system.state` enum) and the warping grid signal are documented but not enumerated separately above where evidence was ambiguous.
<!-- UNRESOLVED: complete dynamic property/method/signal catalogue requires runtime introspection; source only documents a subset. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:20:27.012Z
last_checked_at: 2026-10-07T13:20:31.643Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:20:31.643Z
matched_actions: 90
action_count: 90
confidence: medium
summary: "All 90 action units match source methods, properties and curl endpoints; transport supported; source is a generic Pulse API guide that does not name the Jao 18Mkii. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete property list varies by model and peripherals; do full introspection against a live device for an authoritative list"
- "source documents step-by-step sequences (e.g. warp enable + upload + select + enable;"
- "no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "complete dynamic property/method/signal catalogue requires runtime introspection; source only documents a subset."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
