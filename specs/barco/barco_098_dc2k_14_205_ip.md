---
spec_id: admin/barco-098-dc2k-14-205
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 098 Dc2K 14 205 Control Spec"
manufacturer: Barco
model_family: "Barco 098 Dc2K 14 205"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 098 Dc2K 14 205"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:20:51.001Z
last_checked_at: 2026-07-21T20:30:36.860Z
generated_at: 2026-07-21T20:30:36.860Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "HTTP port not explicitly stated (examples use http://192.168.1.100/api/...)"
  - "params for schedulecomponentupgrade not fully shown in source"
  - "no multi-step sequences explicitly described as macros in source"
  - "HTTP port for file endpoints not explicitly stated (examples imply port 80)"
  - "exact DMX mode names not enumerated in source"
  - "firmware.schedulecomponentupgrade params not fully specified in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:30:36.860Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions (37 commands + 16 feedback queries) match verbatim in source; all transport parameters (port 9090, RS-232 settings, auth code) verified; source fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 098 Dc2K 14 205 Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial. The spec covers power control, source selection, illumination (laser) power, picture settings (brightness, contrast, gamma, saturation, sharpness), warp/blend/black-level file management, optics (shutter, zoom, focus, lens shift), DMX, environment monitoring (temperature, fan speeds, alarms), and firmware management.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  # HTTP file endpoints use base path: http://{projector_ip}/api/{endpoint}
  # UNRESOLVED: HTTP port not explicitly stated (examples use http://192.168.1.100/api/...)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # source describes authenticate method with secret pass code
  # Authentication is optional for normal end-user access; required for higher access levels.
  # Pass code example in source: "code": 98765
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff commands
  - queryable    # inferred from property.get query examples
  - levelable    # inferred from brightness/contrast/gamma/saturation/sharpness controls
  - routable     # inferred from source selection commands (image.window.main.source)
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

- id: eco_wake_serial
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ':POWR1\r'
  params: []

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for higher access level

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness)
    - name: value
      type: any
      description: Value to set (type depends on property)

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property names in dot notation

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_subscribe_multiple
  label: Subscribe To Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property names

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_unsubscribe_multiple
  label: Unsubscribe From Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property names

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated)

- id: signal_subscribe_multiple
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: introspect
  label: Introspect API
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty for everything)
    - name: recursive
      type: boolean
      description: If true, full recursive metadata; if false, only object names one level

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: Source object name (lowercase, non-word chars removed, e.g. displayport1)

- id: environment_getcontrolblocks
  label: Get Environment Sensor Data
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, etc.'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  # UNRESOLVED: params for schedulecomponentupgrade not fully shown in source

- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset

- id: color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_next
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: http_upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML file path
    - name: projector_ip
      type: string
      description: Projector IP address

- id: http_download_warp_file
  label: Download Warp Grid File
  kind: action
  command: 'curl -O -J http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address

- id: http_upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask PNG file path
    - name: projector_ip
      type: string
      description: Projector IP address

- id: http_upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask PNG file path
    - name: projector_ip
      type: string
      description: Projector IP address
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

- id: illumination_laser_power
  type: number
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

- id: illumination_laser_minpower
  type: number
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'

- id: illumination_laser_maxpower
  type: number
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'

- id: active_source
  type: string
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'

- id: shutter_position
  type: enum
  values: [Open, Closed]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'

- id: zoom_position
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'

- id: focus_position
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'

- id: lensshift_horizontal_position
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'

- id: lensshift_vertical_position
  type: integer
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'

- id: connector_detected_signal
  type: object
  description: Signal info for a connector (active, resolution, frequencies, color space, etc.)
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"}}'

- id: temperatures
  type: object
  description: Dictionary of temperature sensor readings (laser boards, heatsinks, mainboard, inlet, outlet, etc.)
  query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'

- id: fan_speeds
  type: object
  description: Dictionary of fan tachometer readings
  query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
```

## Variables
```yaml
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'

- id: image_window_main_source
  property: image.window.main.source
  type: string
  description: 'Active source (e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, SDI)'
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{value}"}}'

- id: image_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}'

- id: illumination_laser_power
  property: illumination.sources.laser.power
  type: float
  description: Target laser power in percent (RW)
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{value}"}}'

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{value}}}'

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{value}"}}'

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}'

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"}}'

- id: dmx_mode
  property: dmx.mode
  type: string
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  description: DMX start channel [1..512]
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
```

## Events
```yaml
- id: property_changed
  description: Unsolicited notification when a subscribed property value changes. Client must implement property.changed handler.
  command: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'

- id: signal_callback
  description: Unsolicited notification when a subscribed signal is emitted (e.g. modelupdated, image.processing.warp.gridchanged). Client must implement signal.callback handler.
  command: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signalname}":{"{arg1}":{value}}}]}'

- id: modelupdated
  description: Signal triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe with signal "modelupdated".
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Verify projector state is standby or ready before issuing power on command. If projector already on or transitioning, nothing happens."
  - description: "Verify projector state is on before issuing power off command. If already off or transitioning, nothing happens."
  - description: "ECO mode wake-up requires Wake-on-LAN, remote/keypad power button, or special RS232 command (:POWR1\\r). Standard poweron may not work from ECO."
  - description: "Best practice to wait for property.set confirmation before setting same property again. Continuous setting without confirmation may flood server and reduce performance."
```

## Notes
- The API uses JSON-RPC 2.0 with dot-notation object/member naming. Parameters are passed by name; order does not matter.
- Source selection delivers two property.changed notifications: first when old source deselected (value ""), then when new source selected.
- API is dynamic and may vary by projector configuration (lens type, peripherals, DMX mode). Use `introspect` to discover exact API for a specific unit.
- Warp file format is same as MCM500/400.
- Blend and black level masks are grayscale (8 or 16 bit). Color images accepted but only blue channel used. Supported formats: PNG (up to 16 bit), JPEG, TIFF.
- Mask resolution must match projector blend/black-level layer resolution (WUXGA: 1920x1200, WQXGA/4K: 1280x800, 4K Cinemascope: 1280x540).
- Authentication is optional for normal end-user access; required for higher access levels (service, etc.).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: HTTP port for file endpoints not explicitly stated (examples imply port 80) -->
<!-- UNRESOLVED: exact DMX mode names not enumerated in source -->
<!-- UNRESOLVED: firmware.schedulecomponentupgrade params not fully specified in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:20:51.001Z
last_checked_at: 2026-07-21T20:30:36.860Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:30:36.860Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions (37 commands + 16 feedback queries) match verbatim in source; all transport parameters (port 9090, RS-232 settings, auth code) verified; source fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "HTTP port not explicitly stated (examples use http://192.168.1.100/api/...)"
- "params for schedulecomponentupgrade not fully shown in source"
- "no multi-step sequences explicitly described as macros in source"
- "HTTP port for file endpoints not explicitly stated (examples imply port 80)"
- "exact DMX mode names not enumerated in source"
- "firmware.schedulecomponentupgrade params not fully specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
