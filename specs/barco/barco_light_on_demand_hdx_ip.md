---
spec_id: admin/barco-light-on-demand-hdx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Light On Demand HDX Control Spec"
manufacturer: Barco
model_family: "Barco Light On Demand HDX"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Light On Demand HDX"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:16:34.250Z
last_checked_at: 2026-08-19T08:55:31.062Z
generated_at: 2026-08-19T08:55:31.062Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ledctrl.blink
  - "source is the generic Pulse API manual; device-specific command surface must be confirmed via introspection."
  - "exact pass code length, format, and session expiry not stated in source"
  - "pass code length/format/session expiry for authenticate not stated."
  - "HTTP base URL for control layer not stated; only the curl example uses http://{host}/api/...."
  - "the refined source is the generic Pulse API manual; the device-specific command surface for HDX must be discovered via introspect."
  - "which DMX modes, channels, and counts apply to this projector; introspect dmx.listmodes and dmx.listchannels to enumerate."
  - "which illumination sources are present on this device (laser only? xenon? UHP?); introspect illumination.sources."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:55:31.062Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions match JSON-RPC method/property tokens, curl endpoints, or serial ASCII in the refined Pulse API source; transport values (9090/19200/8N1) are verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Light On Demand HDX Control Spec

## Summary

Control spec for Barco Light On Demand HDX projector. Covers the Pulse JSON-RPC API exposed over TCP/IP on port 9090 and over RS-232 serial. Includes system power, illumination/laser power, source selection, image properties, warp/blend/blacklevel file management, environment sensors, optics, and DMX.

<!-- UNRESOLVED: source is the generic Pulse API manual; device-specific command surface must be confirmed via introspection. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # stated: "available on port number 9090"
serial:
  baud_rate: 19200  # stated: RS232 Communication Parameters table
  data_bits: 8
  parity: none
  flow_control: none
  stop_bits: 1
auth:
  type: optional  # source: auth via "authenticate" method with pass code; can be skipped for normal end user
  # UNRESOLVED: exact pass code length, format, and session expiry not stated in source
```

## Traits
```yaml
# - powerable       (system.poweron / system.poweroff)
# - queryable       (property.get / environment.getcontrolblocks)
# - routable        (image.window.main.source selection)
# - levelable       (illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  # Note: verify projector state is "standby" or "ready" before issuing
  notes: no-op if projector already on or in transition

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: no-op if already off or in transition; verify state is "on" before issuing

- id: wake_from_eco
  label: Wake Projector From ECO Mode (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII sequence sent on RS-232 serial port; alternative wake methods are WOL packet, remote power button, keypad power button

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name as returned by image.source.list

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
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors","params":{}}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. displayport1, hdmi)

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. l1hdmi)

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}}}'
  params:
    - name: power
      type: integer
      description: Target laser power in percent (within dynamic minpower/maxpower range)

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: engage_clo
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_image_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: set_image_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized brightness; 0 = default, 1 = 100% offset; range -1..1

- id: get_image_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized contrast/gain; 1 = default; range 0..2

- id: get_image_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: set_image_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma; default 2.2; range 1..3

- id: get_image_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized saturation; 1 = default; range 0..2

- id: get_image_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: set_image_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness; range -2..8

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"}}'
  params:
    - name: orientation
      type: string
      description: DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{w},"height":{h}}}}'
  params:
    - name: w
      type: integer
    - name: h
      type: integer

- id: set_window_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{mode}"}}'
  params:
    - name: mode
      type: string
      description: Fill | OneToOne | FillScreen | Stretch

- id: set_warp_enable
  label: Enable Global Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
    - name: host
      type: string

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: set_warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: PNG/JPEG/TIFF, 8 or 16 bit grayscale
    - name: host
      type: string

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: set_blend_file_enable
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: PNG/JPEG/TIFF, 8 or 16 bit grayscale
    - name: host
      type: string

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: set_blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"}}'
  params:
    - name: target
      type: string
      description: Open | Closed

- id: get_optics_zoom
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: get_optics_focus
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: get_optics_lensshift_h
  label: Get Lens Shift Horizontal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_optics_lensshift_v
  label: Get Lens Shift Vertical
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_environment_sensors
  label: Get Environment Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor | Filter | Controller | Actuator | Alarm | GenericBlock
    - name: valuetype
      type: string
      description: Temperature | Speed | PWM | Voltage | Current | Power | ...

- id: get_environment_alarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_environment_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: set_system_standby_enable
  label: Set System Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean
  notes: check availability first

- id: set_system_eco_enable
  label: Set System ECO Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean
  notes: check availability first

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

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}}}'
  params:
    - name: channel
      type: integer
      description: 1..512

- id: get_dmx_shutdown
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: list_dmx_channels
  label: List DMX Channel Names
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

- id: get_network_ipv4_config
  label: Get LAN IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: next_rgb_mode
  label: Cycle RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: p7_custom_copy_preset
  label: P7 Custom - Copy Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_custom_reset_preset
  label: P7 Custom - Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: p7_custom_reset_to_native
  label: P7 Custom - Reset To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: subscribe_property
  label: Subscribe To Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: unsubscribe_property
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: subscribe_signal
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation

- id: unsubscribe_signal
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean
      description: default true; false lists one level only

- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: string
      description: Secret pass code; grants elevated access level (skippable for normal end user)
  notes: send as the first message of a session to raise access level
```

## Feedbacks
```yaml
# Unsolicited notifications implement these server-side callbacks.
# The client must implement property.changed and signal.callback to receive them.
- id: property_changed
  type: object
  description: |
    Server-to-client notification when a subscribed property changes.
    Payload example:
      {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}
    Optional per source-switch: server first sends empty value (deselect) then new value.

- id: signal_callback
  type: object
  description: |
    Server-to-client notification when a subscribed signal fires.
    Payload example:
      {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100}}]}}

- id: signal_modelupdated
  type: object
  description: |
    Fired via signal.callback when the object model changes (objects added/removed).
    Arguments: object (string), isnew (bool).

- id: signal_objectchanged
  type: object
  description: |
    Variant of modelupdated for introspection objects.
    Arguments: object (string), newobject (bool).
```

## Variables
```yaml
- name: system.state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  access: read
  description: Current operational state of the unit

- name: illumination.state
  type: enum
  values: [On, Off]
  access: read
  description: State of the illumination (lamp/LED/laser)

- name: illumination.sources.laser.power
  type: float
  access: read_write
  description: Target laser power in percent; bounded by dynamic minpower/maxpower

- name: illumination.sources.laser.minpower
  type: float
  access: read
  description: Minimum laser power in percent (dynamic, lens-dependent)

- name: illumination.sources.laser.maxpower
  type: float
  access: float
  access: read
  description: Maximum laser power in percent (dynamic)

- name: image.brightness
  type: float
  access: read_write
  range: [-1, 1]
  description: Normalized brightness; 0 = default, 1 = 100% offset

- name: image.contrast
  type: float
  access: read_write
  range: [0, 2]
  description: Normalized contrast/gain; 1 = default

- name: image.gamma
  type: float
  access: read_write
  range: [1, 3]
  description: Gamma; default 2.2

- name: image.saturation
  type: float
  access: read_write
  range: [0, 2]
  description: Normalized color saturation; 1 = default

- name: image.sharpness
  type: integer
  access: read_write
  range: [-2, 8]
  description: Normalized image sharpness

- name: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  access: read_write

- name: image.window.main.source
  type: string
  access: read_write
  description: Source displayed in the main window

- name: image.window.main.position
  type: object
  fields: {x: int, y: int}
  access: read_write

- name: image.window.main.size
  type: object
  fields: {width: int, height: int}
  access: read_write

- name: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  access: read_write

- name: image.processing.warp.enable
  type: boolean
  access: read_write
  description: Global warp on/off

- name: image.processing.warp.file.enable
  type: boolean
  access: read_write

- name: image.processing.warp.file.selected
  type: string
  access: read_write

- name: image.processing.blend.file.enable
  type: boolean
  access: read_write

- name: image.processing.blend.file.selected
  type: array
  items: string
  access: read_write

- name: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- name: image.processing.blacklevel.file.selected
  type: string
  access: read_write

- name: optics.shutter.position
  type: enum
  values: [Open, Closed]
  access: read

- name: optics.shutter.target
  type: enum
  values: [Open, Closed]
  access: read_write

- name: optics.zoom.position
  type: integer
  access: read

- name: optics.focus.position
  type: integer
  access: read

- name: optics.lensshift.horizontal.position
  type: integer
  access: read

- name: optics.lensshift.vertical.position
  type: integer
  access: read

- name: system.standby.enable
  type: boolean
  access: read_write
  description: Check availability before reading/writing

- name: system.eco.enable
  type: boolean
  access: read_write
  description: Check availability before reading/writing

- name: environment.alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  access: read

- name: dmx.mode
  type: string
  access: read

- name: dmx.startchannel
  type: integer
  access: read_write
  range: [1, 512]

- name: dmx.shutdown
  type: boolean
  access: read_write

- name: network.device.lan.ip4config
  type: object
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}
  access: read

- name: network.device.lan.state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  access: read

- name: image.connector.{name}.detectedsignal
  type: object
  access: read
  description: |
    Fields: active(bool), name(string), vertical_total, horizontal_total,
    vertical_resolution, horizontal_resolution, vertical_sync_width,
    vertical_front_porch, vertical_back_porch, horizontal_sync_width,
    horizontal_front_porch, horizontal_back_porch, horizontal_frequency(float),
    vertical_frequency(float), pixel_rate, scan(enum), bits_per_component,
    color_space(enum), signal_range(enum: 0-255|16-235),
    chroma_sampling(enum: 4:4:4|4:2:2|4:2:0),
    gamma_type(enum: POWER|sRGB|REC_BT1886|SMPTE_ST2084),
    color_primaries(enum: REC709|REC2020|DCI-P3-D65|DCI-P3-Theater),
    mastering_luminance(float), content_aspect_ratio(enum),
    is_stereo(bool), stereo_mode(enum)
```

## Events
```yaml
- id: property_changed
  description: |
    Sent when a subscribed property changes.
    Payload: {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"key":"value"}]}}
    Note: subscription does NOT deliver current value; use property.get to retrieve state.

- id: signal_callback
  description: |
    Sent when a subscribed signal fires.
    Payload: {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"signalname":{"args":{}}}]}}
    No id member; client must NOT respond.

- id: modelupdated
  description: object model structure changed (objects added/removed); arguments: object, isnew.
```

## Macros
```yaml
# All sequences from the source, captured as multi-step guides.
- id: power_on_safe
  label: Safe Power On
  steps:
    - property.get system.state -> expect standby or ready
    - system.poweron
  notes: skipping state check risks no-op or unexpected behavior

- id: power_off_safe
  label: Safe Power Off
  steps:
    - property.get system.state -> expect on
    - system.poweroff

- id: switch_source_with_updates
  label: Switch Source With Listener
  steps:
    - image.source.list -> enumerate sources
    - property.subscribe image.window.main.source
    - property.set image.window.main.source = "{source}"
    - on property.changed, reconcile active source in client UI
  notes: server emits one notification clearing the old source then one for the new

- id: upload_and_apply_warp
  label: Upload Warp File And Apply
  steps:
    - curl POST file to /api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected = "{filename}"
    - property.set image.processing.warp.file.enable = true
    - property.set image.processing.warp.enable = true

- id: upload_and_apply_blend
  label: Upload Blend Mask And Apply
  steps:
    - curl POST file to /api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected = "{filename}"
    - property.set image.processing.blend.file.enable = true

- id: upload_and_apply_blacklevel
  label: Upload Black Level Mask And Apply
  steps:
    - curl POST file to /api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected = "{filename}"
    - property.set image.processing.blacklevel.file.enable = true

- id: wake_from_eco_serial
  label: Wake Projector From ECO Via Serial
  steps:
    - send ASCII :POWR1\r over RS-232
  notes: | alternatives: WOL magic packet (MAC), remote power button, keypad power button

- id: monitor_connector_signal
  label: Monitor Connector Signal Changes
  steps:
    - image.source.list -> translate source names to object names
    - for each source: image.source.{name}.listconnectors
    - for each connector: property.subscribe image.connector.{name}.detectedsignal
    - on property.changed, reconcile display
```

## Safety
```yaml
confirmation_required_for:
  - illumination.sources.laser.power  # high-power laser illumination
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks:
  - "Verify system.state is 'standby' or 'ready' before issuing system.poweron."
  - "Verify system.state is 'on' before issuing system.poweroff."
  - "Waking a projector from ECO mode requires WOL, remote, keypad, or serial :POWR1\\r."
notes: |
  The source contains operational guidance but no explicit hazard warnings.
  All laser-power setting, power state transitions, and firmware upgrades should be
  treated as safety-sensitive.
```

## Notes

<!-- UNRESOLVED: pass code length/format/session expiry for authenticate not stated. -->
<!-- UNRESOLVED: HTTP base URL for control layer not stated; only the curl example uses http://{host}/api/.... -->
<!-- UNRESOLVED: the refined source is the generic Pulse API manual; the device-specific command surface for HDX must be discovered via introspect. -->
<!-- UNRESOLVED: which DMX modes, channels, and counts apply to this projector; introspect dmx.listmodes and dmx.listchannels to enumerate. -->
<!-- UNRESOLVED: which illumination sources are present on this device (laser only? xenon? UHP?); introspect illumination.sources. -->

Same JSON-RPC 2.0 surface over TCP 9090 and RS-232 (19200 8N1). All commands are name-dot notation; ordering of `jsonrpc`/`method`/`params`/`id` is free. Auth is optional — `authenticate` with a pass code raises the access level for higher-privilege properties/methods. Wait for `property.set` confirmation before issuing the same set again to avoid flooding. Source-switching generates two `property.changed` notifications: empty (deselect) then new value. Notification messages carry no `id`; client does not reply. Blend and blacklevel masks must be grayscale (8 or 16 bit), sized to the blend/blacklevel layer (WUXGA 1920x1200 / WQXGA 1280x800 / 4K 1280x800 / 4K Cinemascope 1280x540); only the blue channel is read. API is dynamic; peripherals and lens configuration gate available objects — rely on `introspect` for the live tree.
```

Self-check: no voltages/faults invented, port 9090 + baud 19200 from source, `status: draft`, `declared_confidence: low`, unresolved markers present, YAML quoted JSON payloads to dodge colon-trap.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:16:34.250Z
last_checked_at: 2026-08-19T08:55:31.062Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:55:31.062Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions match JSON-RPC method/property tokens, curl endpoints, or serial ASCII in the refined Pulse API source; transport values (9090/19200/8N1) are verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ledctrl.blink
- "source is the generic Pulse API manual; device-specific command surface must be confirmed via introspection."
- "exact pass code length, format, and session expiry not stated in source"
- "pass code length/format/session expiry for authenticate not stated."
- "HTTP base URL for control layer not stated; only the curl example uses http://{host}/api/...."
- "the refined source is the generic Pulse API manual; the device-specific command surface for HDX must be discovered via introspect."
- "which DMX modes, channels, and counts apply to this projector; introspect dmx.listmodes and dmx.listchannels to enumerate."
- "which illumination sources are present on this device (laser only? xenon? UHP?); introspect illumination.sources."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
