---
spec_id: admin/barco-hd-sdi3g-to-hdmidvi-converter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco HD SDI3G To HDMIDVI Converter Control Spec"
manufacturer: Barco
model_family: "Barco HD SDI3G To HDMIDVI Converter"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco HD SDI3G To HDMIDVI Converter"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:10:19.365Z
last_checked_at: 2026-08-19T08:32:01.883Z
generated_at: 2026-08-19T08:32:01.883Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "title refers to \"HD SDI3G To HDMIDVI Converter\" but source content covers Pulse projector API broadly."
  - "passcode format/length not stated"
  - "source describes properties via set/get; limiting to dynamic settable params listed in programmable guide."
  - "no explicit multi-step sequences documented beyond warp/blend upload recipes."
  - "source mentions best practice to verify state before power on/off but no explicit interlock or safety procedure."
  - "source provided is titled \"Barco HD SDI3G To HDMIDVI Converter\" but content describes Barco Pulse projector API. Converter-specific commands not found in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:32:01.883Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions match Barco Pulse API methods/properties documented in the refined source; transport port 9090 and serial params19200/8N1 verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco HD SDI3G To HDMIDVI Converter Control Spec

## Summary
Pulse API control surface for Barco Pulse-based projectors, covering JSON-RPC 2.0 over TCP port 9090 and RS-232 serial. Spec describes power, source selection, illumination, picture settings, warping, blending, environment, and introspection.

Note: provided source document describes Barco Pulse projector API; converter-specific behavior not documented in source.

<!-- UNRESOLVED: title refers to "HD SDI3G To HDMIDVI Converter" but source content covers Pulse projector API broadly. -->

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
  type: code  # source: "authenticate" method with passcode; required for elevated access only
  # UNRESOLVED: passcode format/length not stated
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- routable        # image.window.main.source, input source selection
- queryable       # property.get, image.source.list, environment.getcontrolblocks
- levelable       # brightness, contrast, gamma, saturation, sharpness
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

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: subscribe_system_state
  label: Subscribe System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Passcode

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: string
      description: Value appropriate for property type

- id: get_properties_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: List of property names

- id: subscribe_property
  label: Subscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string
      description: Property name or array

- id: unsubscribe_property
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string
      description: Property name or array

- id: subscribe_signal
  label: Subscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array

- id: unsubscribe_signal
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array

- id: introspect
  label: Introspect (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: recursive
      type: boolean
      description: Recursive enumeration

- id: introspect_nonrecursive
  label: Introspect (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name

- id: select_input
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "SDI")

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. "displayport1")

- id: get_signal_info
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40}}'
  params:
    - name: value
      type: integer
      description: Power percent

- id: get_laser_min_power
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_max_power
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: engage_clo
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15}}'
  params:
    - name: value
      type: float
      description: -1 to 1

- id: get_contrast
  label: Get Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1}}'
  params:
    - name: value
      type: float
      description: 0 to 2

- id: get_gamma
  label: Get Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: 1 to 3

- id: get_saturation
  label: Get Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1}}'
  params:
    - name: value
      type: float
      description: 0 to 2

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: -2 to 8

- id: get_orientation
  label: Get Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"}}'
  params: []

- id: set_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      description: "DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"

- id: get_scaling_mode
  label: Get Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"}}'
  params: []

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: string
      description: "Fill | OneToOne | FillScreen | Stretch"

- id: get_window_position
  label: Get Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"}}'
  params: []

- id: get_window_size
  label: Get Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"}}'
  params: []

- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: Enable/disable

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
  params:
    - name: value
      type: string
      description: Filename

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local filename

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
  params:
    - name: value
      type: string
      description: Filename

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local PNG filename

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
  params:
    - name: value
      type: string
      description: Filename

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local PNG filename

- id: get_temperatures
  label: Get Temperatures
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []

- id: get_fan_speeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []

- id: get_environmental
  label: Get Environmental Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks"}'
  params:
    - name: type
      type: string
      description: "Sensor | Filter | Controller | Actuator | Alarm | GenericBlock"
    - name: valuetype
      type: string
      description: "Temperature | Speed | PWM | Voltage | Current | Power | etc."

- id: get_alarm_state
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_lan_ip4_config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: string
      description: "Open | Closed"

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: get_lensshift_h
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_v
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_standby_enable
  label: Get Standby Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"}}'
  params: []

- id: set_standby_enable
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: get_eco_enable
  label: Get ECO Mode Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"}}'
  params: []

- id: set_eco_enable
  label: Set ECO Mode Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: serial_wake_eco
  label: Wake from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: get_dmx_shutdown
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: list_firmware_versions
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: p7_copy_preset_to_custom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom"}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: P7 Reset Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset"}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rgb_next_mode
  label: RGB Mode Next
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: led_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
      description: LED name
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period
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
- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: firmware_upgrade_status
  type: enum
  values: [Unknown, OK, Upgradable]
```

## Variables
```yaml
# UNRESOLVED: source describes properties via set/get; limiting to dynamic settable params listed in programmable guide.
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  description: Image brightness/offset, 0 default, 1 is 100% offset
- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  description: Image contrast/gain, 1 default
- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  description: Image gamma, 2.2 default
- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  description: Image color saturation, 1 default
- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1
  description: Image sharpness
- id: illumination_laser_power
  type: integer
  range: [0, 100]
  description: Target power percent
- id: dmx_startchannel
  type: integer
  range: [1, 512]
```

## Events
```yaml
- id: property_changed
  description: 'Sent by server when a subscribed property changes. Format: { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "objectname.propertyname": value } ] } }'
- id: signal_callback
  description: 'Sent by server when a subscribed signal is emitted. Format: { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { arg1, arg2 } } ] } }'
- id: modelupdated
  description: Triggered when object structure changes (objects added or removed)
- id: introspect_objectchanged
  description: 'Argument: { object: string, isnew: bool }'
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented beyond warp/blend upload recipes.
# Example macro pattern documented in source: upload_warp_file -> select_warp_file -> enable_warp_file
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions best practice to verify state before power on/off but no explicit interlock or safety procedure.
```

## Notes
- All commands are JSON-RPC 2.0 messages. Order of params keys does not matter.
- File uploads use HTTP POST to `/api/...` endpoints; JSON-RPC is used to select and enable uploaded files.
- API documentation is dynamic; introspection is the authoritative way to discover available properties/methods on a configured unit.
- ECO mode wake requires ASCII `:POWR1\r` on serial port, or Wake-on-LAN, or physical power button.
- Set-property best practice: wait for confirmation before issuing further property.set on same property.
<!-- UNRESOLVED: source provided is titled "Barco HD SDI3G To HDMIDVI Converter" but content describes Barco Pulse projector API. Converter-specific commands not found in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:10:19.365Z
last_checked_at: 2026-08-19T08:32:01.883Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:32:01.883Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions match Barco Pulse API methods/properties documented in the refined source; transport port 9090 and serial params19200/8N1 verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "title refers to \"HD SDI3G To HDMIDVI Converter\" but source content covers Pulse projector API broadly."
- "passcode format/length not stated"
- "source describes properties via set/get; limiting to dynamic settable params listed in programmable guide."
- "no explicit multi-step sequences documented beyond warp/blend upload recipes."
- "source mentions best practice to verify state before power on/off but no explicit interlock or safety procedure."
- "source provided is titled \"Barco HD SDI3G To HDMIDVI Converter\" but content describes Barco Pulse projector API. Converter-specific commands not found in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
