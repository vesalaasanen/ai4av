---
spec_id: admin/barco-extra-long-throw-zoom-lens-en16
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec (EN16 Lens Reference)"
manufacturer: Barco
model_family: "Barco Pulse Projector (Extra Long Throw Zoom Lens En16 reference)"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Pulse Projector (Extra Long Throw Zoom Lens En16 reference)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:40:16.514Z
last_checked_at: 2026-08-05T07:59:43.765Z
generated_at: 2026-08-05T07:59:43.765Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is the generic Pulse API manual; it does not explicitly confirm which projector SKUs ship the EN16 lens. The spec is written as the Pulse platform reference; per-SKU applicability requires a SKU-specific datasheet."
  - "full parameter schemas for type/valuetype lists - see Feedbacks."
  - "the type/valuetype enum lists are exhaustive across many categories"
  - "no explicit multi-step macro sequences documented in source."
  - "no other safety warnings, interlocks, or power-on sequencing"
  - "EN16-specific lens properties (zoom range, throw ratio, focus range) are not enumerated here — they would appear via introspection on a unit fitted with the EN16 lens. Firmware version compatibility, voltage, current, fault/error recovery sequences, and authentication pass-code format are not stated. The source confirms only that the Pulse API is the surface; per-SKU coverage requires a SKU-specific datasheet."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:59:43.765Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions match wire-level tokens in the source; transport (TCP 9090, RS-232 19200/8N1, passcode) is verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Pulse Projector Control Spec (EN16 Lens Reference)

## Summary
This spec covers Barco Pulse projectors accessed via a JSON-RPC 2.0 service. The projector exposes a TCP service on port 9090 and a serial (RS-232) service; both expose the same property/method/signal API. The "EN16" Extra Long Throw Zoom Lens variant is one configuration of this Pulse platform. Power, source selection, image settings, illumination, optics (lens/zoom/focus/shift/shutter), warping, blending, DMX, firmware, and environment telemetry are all addressed through the same property model.

<!-- UNRESOLVED: the source is the generic Pulse API manual; it does not explicitly confirm which projector SKUs ship the EN16 lens. The spec is written as the Pulse platform reference; per-SKU applicability requires a SKU-specific datasheet. -->

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
  type: passcode  # source: authentication is optional; pass code needed only for elevated access
```

## Traits
```yaml
- powerable       # inferred: system.poweron / system.poweroff methods present
- routable        # inferred: image.window.main.source selection present
- queryable       # inferred: property.get returns property values
- levelable       # inferred: image.brightness, contrast, gamma, saturation, sharpness settable
- observable      # inferred: property.subscribe / signal.subscribe present
```

## Actions
```yaml
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example shown as 98765)

- id: property_set
  label: Set property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100}}'
  params:
    - name: property
      type: string
      description: Fully-qualified object.property name (dot notation)
    - name: value
      type: any
      description: JSON-typed value appropriate for target property

- id: property_get
  label: Get property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"}}'
  params:
    - name: property
      type: string
      description: Fully-qualified object.property name

- id: property_get_multiple
  label: Get multiple properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: List of property names

- id: property_subscribe
  label: Subscribe to property changes (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"objectname.propertyname"}}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name

- id: property_subscribe_multiple
  label: Subscribe to property changes (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: List of property names

- id: property_unsubscribe
  label: Unsubscribe from property (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name

- id: property_unsubscribe_multiple
  label: Unsubscribe from properties (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: List of property names

- id: signal_subscribe
  label: Subscribe to signal (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Fully-qualified signal name

- id: signal_subscribe_multiple
  label: Subscribe to signals (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array
      description: List of signal names

- id: signal_unsubscribe
  label: Unsubscribe from signal (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Fully-qualified signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe from signals (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array
      description: List of signal names

- id: introspect_recursive
  label: Introspect object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation; empty = all)
    - name: recursive
      type: boolean
      description: If true, returns nested objects/methods/properties/signals

- id: introspect_nonrecursive
  label: Introspect object (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: recursive
      type: boolean
      description: If false, lists only one level of object names

- id: set_active_source
  label: Set active source (image.window.main.source)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: get_active_source
  label: Get active source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List connectors used by source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors"}'
  params: []

- id: get_connector_detectedsignal
  label: Get detected signal on connector
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"}}'
  params:
    - name: property
      type: string
      description: image.connector.<name>.detectedsignal

- id: set_window_position
  label: Set image window position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: value
      type: object
      description: Object with x,y integers

- id: set_window_size
  label: Set image window size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1080}}}'
  params:
    - name: value
      type: object
      description: Object with width,height integers

- id: set_scalingmode
  label: Set window scaling mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: set_brightness
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15}}'
  params:
    - name: value
      type: float
      min: -1
      max: 1
      step: 0.01

- id: set_contrast
  label: Set image contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0}}'
  params:
    - name: value
      type: float
      min: 0
      max: 2
      step: 0.01

- id: set_gamma
  label: Set image gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      min: 1
      max: 3
      step: 0.1

- id: set_saturation
  label: Set image saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0}}'
  params:
    - name: value
      type: float
      min: 0
      max: 2
      step: 0.01

- id: set_sharpness
  label: Set image sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: int
      min: -2
      max: 8
      step: 1

- id: set_orientation
  label: Set image orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: set_warp_enable
  label: Enable/disable warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: set_warp_file_selected
  label: Select warp grid file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
  params:
    - name: value
      type: string
      description: Uploaded warp file name

- id: set_warp_file_enable
  label: Enable file warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload warp file (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Warp grid file on local filesystem

- id: set_blend_file_selected
  label: Select blend mask file(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["mask.png"]}}'
  params:
    - name: value
      type: array
      description: List of blend file names

- id: set_blend_file_enable
  label: Enable file blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_blend_mask
  label: Upload blend mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string

- id: set_blacklevel_file_selected
  label: Select black level file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
  params:
    - name: value
      type: string

- id: set_blacklevel_file_enable
  label: Enable black level mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_blacklevel_mask
  label: Upload black level mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string

- id: set_shutter_position
  label: Set optics shutter position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"Open"}}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: get_shutter_position
  label: Get optics shutter position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_zoom_position
  label: Set optics zoom position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0}}'
  params:
    - name: value
      type: int

- id: set_focus_position
  label: Set optics focus position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0}}'
  params:
    - name: value
      type: int

- id: set_lensshift_horizontal
  label: Set lens shift horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0}}'
  params:
    - name: value
      type: int

- id: set_lensshift_vertical
  label: Set lens shift vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0}}'
  params:
    - name: value
      type: int

- id: set_illumination_power
  label: Set laser power (percent)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40}}'
  params:
    - name: value
      type: int
      description: Power percent within min/max bounds of installed source

- id: get_illumination_power
  label: Get laser power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: get_illumination_state
  label: Get illumination on/off state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: get_system_state
  label: Get system state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: get_network_lan_ip4config
  label: Get LAN IPv4 config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_lan_state
  label: Get LAN state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: set_standby_enable
  label: Enable/disable standby state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable/disable ECO state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: get_environment_temperatures
  label: Get environment sensor blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []
  # UNRESOLVED: full parameter schemas for type/valuetype lists - see Feedbacks.

- id: get_environment_fanspeeds
  label: Get fan tachometer readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []

- id: get_alarminfo
  label: Get alarm info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_alarmstate
  label: Get aggregate alarm state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: ledctrl_blink
  label: Blink an LED (systemstatus color/period)
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: int

- id: dmx_listchannels
  label: List DMX channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: set_dmx_mode
  label: Set DMX mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"Basic"}}'
  params:
    - name: value
      type: string

- id: set_dmx_startchannel
  label: Set DMX start channel (1..512)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: int
      min: 1
      max: 512

- id: set_dmx_shutdown
  label: Enable DMX shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true}}'
  params:
    - name: value
      type: boolean

- id: firmware_listcomponents
  label: List managed firmware components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List firmware version status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule component upgrade on next reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: color_p7_custom_copypresettocustom
  label: Copy P7 preset to custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"P7"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset P7 custom preset to defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"P7"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resettonative
  label: Reset P7 custom to native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: serial_wake_from_eco
  label: Wake projector from ECO mode via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII wake-up sequence sent on the serial port; equivalent to sending Wake-on-LAN with the projector's MAC or pressing the power button on remote/keypad.

- id: introspect_subscribe_objectchanged
  label: Subscribe to modelupdated signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state

- id: illumination_laser_power
  type: int
  property: illumination.sources.laser.power
  description: Target power in percent (RW)

- id: illumination_laser_minpower
  type: int
  property: illumination.sources.laser.minpower

- id: illumination_laser_maxpower
  type: int
  property: illumination.sources.laser.maxpower

- id: active_source
  type: string
  property: image.window.main.source

- id: window_position
  type: object
  property: image.window.main.position
  fields: {x: int, y: int}

- id: window_size
  type: object
  property: image.window.main.size
  fields: {width: int, height: int}

- id: scalingmode
  type: enum
  property: image.window.main.scalingmode
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: brightness
  type: float
  property: image.brightness
  min: -1
  max: 1
  step: 0.01

- id: contrast
  type: float
  property: image.contrast
  min: 0
  max: 2
  step: 0.01

- id: gamma
  type: float
  property: image.gamma
  min: 1
  max: 3
  step: 0.1

- id: saturation
  type: float
  property: image.saturation
  min: 0
  max: 2
  step: 0.01

- id: sharpness
  type: int
  property: image.sharpness
  min: -2
  max: 8
  step: 1

- id: orientation
  type: enum
  property: image.orientation
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: detectedsignal
  type: object
  property: image.connector.<name>.detectedsignal
  fields:
    active: bool
    name: string
    vertical_total: int
    horizontal_total: int
    vertical_resolution: int
    horizontal_resolution: int
    vertical_sync_width: int
    vertical_front_porch: int
    vertical_back_porch: int
    horizontal_sync_width: int
    horizontal_front_porch: int
    horizontal_back_porch: int
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: int
    scan: enum
    bits_per_component: int
    color_space: enum
    signal_range: enum
    chroma_sampling: enum
    gamma_type: enum
    color_primaries: enum
    mastering_luminance: float
    content_aspect_ratio: enum
    is_stereo: bool
    stereo_mode: enum

- id: shutter_position
  type: enum
  property: optics.shutter.position
  values: [Open, Closed]

- id: shutter_target
  type: enum
  property: optics.shutter.target
  values: [Open, Closed]

- id: zoom_position
  type: int
  property: optics.zoom.position

- id: focus_position
  type: int
  property: optics.focus.position

- id: lensshift_horizontal_position
  type: int
  property: optics.lensshift.horizontal.position

- id: lensshift_vertical_position
  type: int
  property: optics.lensshift.vertical.position

- id: lan_ip4config
  type: object
  property: network.device.lan.ip4config
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}

- id: lan_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: alarmstate
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: int
  property: dmx.startchannel
  min: 1
  max: 512

- id: dmx_shutdown
  type: bool
  property: dmx.shutdown

- id: environment_controlblocks
  type: array
  property: environment.getcontrolblocks
  fields: [{key: string, value: float}]
  # UNRESOLVED: the type/valuetype enum lists are exhaustive across many categories
  # (Sensor/Filter/Controller/Actuator/Alarm/GenericBlock and Temperature/Speed/PWM/Voltage/Current/Power/...).
  # The source enumerates them but does not specify per-block permissions or units in full.

- id: alarm_info
  type: array
  method: environment.getalarminfo
  fields: [{severity: string, timestamp: string, source: string, description: string, custommessage: string}]

- id: firmware_components
  type: array
  method: firmware.listcomponents

- id: firmware_component_version_status
  type: array
  method: firmware.listcomponentversionstatus
  fields: [{name: string, versions: {available: string, running: string, status: enum[Unknown,OK,Upgradable]}}]

- id: dmx_channels
  type: array
  method: dmx.listchannels

- id: dmx_modes
  type: array
  method: dmx.listmodes

- id: laser_serialnumber
  type: string
  method: illumination.laser.getserialnumber
```

## Variables
```yaml
# Per-property settable scalar variables are enumerated above as Feedbacks.
# No additional `Variables[]` entries beyond those.
```

## Events
```yaml
- id: property_changed
  type: notification
  direction: server->client
  method: property.changed
  payload: '{"property": [{"objectname.propertyname": value}, ...]}'

- id: signal_callback
  type: notification
  direction: server->client
  method: signal.callback
  payload: '{"signal": [{"objectname.signalname": {arg1: ..., arg2: ...}}, ...]}'

- id: introspect_objectchanged_signal
  type: notification
  direction: server->client
  signal: introspect.objectchanged
  # Documented only inside signal.callback payload; emit when an object is added or removed.
  payload: '{"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "isnew": true}}]}'

- id: modelupdated
  type: signal
  description: Emitted when the object structure changes (objects added/removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
# Composite "perform these three requests" examples exist for warp upload
# (upload file -> set file.selected -> set file.enable), blend mask, and black
# level mask - treat those as orchestrations at the application layer, not
# device-native macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - state: eco
    wake_methods:
      - Wake-on-LAN to projector's MAC address
      - Power button on remote control
      - Power button on keypad
      - RS-232 ASCII sequence ":POWR1\r"
# UNRESOLVED: no other safety warnings, interlocks, or power-on sequencing
# requirements are documented in source. No voltage/current/fault-recovery data.
```

## Notes
JSON-RPC 2.0 over TCP/9090 or RS-232/19200/8N1; the wire protocol is the same on both. All parameters are passed by name; order is irrelevant. `authenticate` is optional — only required for access above normal end user; example pass code `98765` is illustrative, not a default credential. Property mutation: wait for `property.set` confirmation before issuing the next set on the same property to avoid flooding the server. Two notifications are emitted on source change: deselect followed by select (empty then new source). Server-side types: string, integer, float, boolean, array, object, string-keyed dictionary. Introspection is dynamic; SKUs and peripherals (e.g. EN16 motorized-zoom lens) only expose properties whose hardware is present. Supported blend/black-level mask image formats: PNG (8 or 16 bit), JPEG, TIFF — color images accepted but only the blue channel is used. `system.state` enum in the alphabetical properties table lists `boot, eco, standby, ready, conditioning, on, service, deconditioning, error`; the introductory prose omits `service` and `error`. DMX basic mode exposes 2 channels; extended mode exposes more (not enumerated in source).

<!-- UNRESOLVED: EN16-specific lens properties (zoom range, throw ratio, focus range) are not enumerated here — they would appear via introspection on a unit fitted with the EN16 lens. Firmware version compatibility, voltage, current, fault/error recovery sequences, and authentication pass-code format are not stated. The source confirms only that the Pulse API is the surface; per-SKU coverage requires a SKU-specific datasheet. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:40:16.514Z
last_checked_at: 2026-08-05T07:59:43.765Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:59:43.765Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions match wire-level tokens in the source; transport (TCP 9090, RS-232 19200/8N1, passcode) is verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is the generic Pulse API manual; it does not explicitly confirm which projector SKUs ship the EN16 lens. The spec is written as the Pulse platform reference; per-SKU applicability requires a SKU-specific datasheet."
- "full parameter schemas for type/valuetype lists - see Feedbacks."
- "the type/valuetype enum lists are exhaustive across many categories"
- "no explicit multi-step macro sequences documented in source."
- "no other safety warnings, interlocks, or power-on sequencing"
- "EN16-specific lens properties (zoom range, throw ratio, focus range) are not enumerated here — they would appear via introspection on a unit fitted with the EN16 lens. Firmware version compatibility, voltage, current, fault/error recovery sequences, and authentication pass-code format are not stated. The source confirms only that the Pulse API is the surface; per-SKU coverage requires a SKU-specific datasheet."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
