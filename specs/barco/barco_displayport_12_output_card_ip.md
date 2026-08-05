---
spec_id: admin/barco-displayport-12-output-card
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Displayport 12 Output Card Control Spec"
manufacturer: Barco
model_family: "Barco Displayport 12 Output Card"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Displayport 12 Output Card"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:21:05.868Z
last_checked_at: 2026-08-05T07:25:47.488Z
generated_at: 2026-08-05T07:25:47.488Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Pulse API catalog; exact command/property surface for this specific card model is not enumerated. Confirm via live introspect against a real unit."
  - "firmware version compatibility not stated in source."
  - "device name \"Displayport 12 Output Card\" not literally present in source text (source speaks of \"Pulse projectors\"). Model mapping unverified."
  - "actual passcode value not stated in source (example used 98765)"
  - "no explicit hard interlock / safety-critical lockout procedures stated in source beyond the power-state best-practice notes."
  - "device name \"Barco Displayport 12 Output Card\" not found verbatim in source; source is the generic Barco Pulse projector API."
  - "real authenticate passcode not stated (source example used 98765)."
  - "exact property/method set for this specific card model — confirm via live introspect."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:25:47.488Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions match the refined Barco Pulse API source verbatim: transport parameters, JSON-RPC methods, HTTP upload endpoints, and ECO serial wake are all confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Displayport 12 Output Card Control Spec

## Summary
Barco Pulse JSON-RPC 2.0 control API, reachable over TCP/IP (port 9090) or RS-232 serial. Covers power on/off, source selection, illumination/laser power, image picture settings, warp/blend/black-level file handling, optics (shutter/zoom/focus/lensshift), DMX, environment telemetry, firmware introspection, and a property/signal subscription model. The source describes the generic Pulse API; the device name above is taken from the scrape token.

<!-- UNRESOLVED: source is the generic Pulse API catalog; exact command/property surface for this specific card model is not enumerated. Confirm via live introspect against a real unit. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: device name "Displayport 12 Output Card" not literally present in source text (source speaks of "Pulse projectors"). Model mapping unverified. -->

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
  connector: "9-pin female (host) to 9-pin male (projector); pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  # Source documents an optional authenticate method using a secret passcode to
  # raise the access level. Normal end-user access may skip it.
  type: secret_code  # inferred from documented authenticate method
  # UNRESOLVED: actual passcode value not stated in source (example used 98765)
```

## Traits
```yaml
traits:
  - powerable   # inferred from system.poweron / system.poweroff
  - queryable   # inferred from property.get query examples
  - routable    # inferred from image.window.main.source selection
  - levelable   # inferred from brightness/contrast/laser power set examples
```

## Actions
```yaml
# Coverage: all JSON-RPC methods named in source, plus documented ECO serial
# wake. Generic property.get/property.set emitted as parameterized actions; the
# specific documented set targets are also listed as separate actions because
# the source documents them as distinct examples.

actions:
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: "Result is null on success. No-op if already on or in transition. Best practice: verify system.state is standby/ready first."

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: "Result is null on success. No-op if already off or in transition. Best practice: verify system.state is on first."

  - id: eco_wake_serial
    label: ECO Mode Wake via Serial
    kind: action
    command: ':POWR1\r'
    params: []
    notes: "ASCII wake command sent over RS-232 to wake a projector in ECO/power-save mode. Alternative wake methods: Wake-on-LAN (MAC), IR remote power, keypad power."

  - id: authenticate
    label: Authenticate (raise access level)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
    params:
      - name: code
        type: integer
        description: Secret passcode (example value 98765 in source; real code UNRESOLVED).
    notes: "Optional. Only required for higher-than-end-user access level."

  - id: property_set
    label: Set Property (generic)
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (e.g. image.brightness).
      - name: value
        type: any
        description: Value to set (type depends on target property).
      - name: id
        type: integer
        description: Request identifier.
    notes: "Best practice: wait for confirmation before re-setting same property."

  - id: property_get
    label: Get Property (generic)
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name.
      - name: id
        type: integer
        description: Request identifier.

  - id: property_get_multi
    label: Get Multiple Properties
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]},"id":{id}}'
    params:
      - name: property
        type: array
        description: Array of property name strings.
      - name: id
        type: integer

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.
      - name: id
        type: integer

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.
      - name: id
        type: integer

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated) or array of names.
      - name: id
        type: integer

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of names.
      - name: id
        type: integer

  - id: introspect
    label: Introspect Object (recursive)
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true},"id":{id}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/"" introspects everything.
      - name: recursive
        type: boolean
        description: If false, only object names at one level are listed.
      - name: id
        type: integer

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
    params: []
    notes: "Returns array of source names (varies by model, e.g. DVI 1/2, DisplayPort 1/2, HDMI, SDI, HDBaseT, Dual variants)."

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
    params: []

  - id: image_source_listconnectors
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{sourceobj}.listconnectors","id":4}'
    params:
      - name: sourceobj
        type: string
        description: "Source object name = source name with non-word chars removed, lowercased (e.g. 'DisplayPort 1' -> 'displayport1')."
    notes: "Returns array of connector info with name and grid position."

  - id: set_main_source
    label: Set Active Source (main window)
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
    params:
      - name: source
        type: string
        description: "Source name from image.source.list (e.g. 'DisplayPort 1', 'HDMI')."

  - id: set_brightness
    label: Set Image Brightness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":9}'
    params:
      - name: value
        type: float
        description: "Normalized offset, min -1, max 1, step 1, precision 0.01. 0 = default."

  - id: set_contrast
    label: Set Image Contrast
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
    params:
      - name: value
        type: float
        description: "Normalized gain, min 0, max 2, step 1, precision 0.01. 1 = default."

  - id: set_gamma
    label: Set Image Gamma
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
    params:
      - name: value
        type: float
        description: "Min 1, max 3, step 1, precision 0.1. Default 2.2."

  - id: set_saturation
    label: Set Image Saturation
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
    params:
      - name: value
        type: float
        description: "Normalized, min 0, max 2, step 1, precision 0.01. 1 = default."

  - id: set_sharpness
    label: Set Image Sharpness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
    params:
      - name: value
        type: integer
        description: "Min -2, max 8, step 1, precision 1. Normalized."

  - id: set_laser_power
    label: Set Laser Power
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":5}'
    params:
      - name: value
        type: float
        description: "Target power in percent. Bounds = minpower/maxpower (dynamic)."

  - id: set_warp_enable
    label: Enable/Disable Global Warp
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}},"id":10}'
    params:
      - name: value
        type: boolean

  - id: set_warp_file_selected
    label: Select Warp File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
    params:
      - name: filename
        type: string
        description: "Uploaded warp grid filename (e.g. warp.xml)."

  - id: set_warp_file_enable
    label: Enable Warp File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}},"id":12}'
    params:
      - name: value
        type: boolean

  - id: upload_warp_file
    label: Upload Warp Grid File (HTTP)
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
    params:
      - name: filename
        type: string
        description: Local warp grid file path.
      - name: projector_ip
        type: string
        description: Projector IP address (example 192.168.1.100).
    notes: "Warp file format same as MCM500/400. -X POST implied when using -F."

  - id: set_blend_file_selected
    label: Select Blend Mask File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
    params:
      - name: filename
        type: string

  - id: set_blend_file_enable
    label: Enable Blend Mask
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}},"id":14}'
    params:
      - name: value
        type: boolean

  - id: upload_blend_mask
    label: Upload Blend Mask (HTTP)
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
    params:
      - name: filename
        type: string
        description: "Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size must match blend layer (WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540)."
      - name: projector_ip
        type: string

  - id: set_blacklevel_file_selected
    label: Select Black Level Mask File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
    params:
      - name: filename
        type: string

  - id: set_blacklevel_file_enable
    label: Enable Black Level Mask
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}},"id":16}'
    params:
      - name: value
        type: boolean

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask (HTTP)
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: filename
        type: string
        description: "Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Sizes as per blend masks."
      - name: projector_ip
        type: string

  - id: environment_getcontrolblocks
    label: Get Environment Telemetry
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":18}'
    params:
      - name: type
        type: string
        description: "Enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
      - name: valuetype
        type: string
        description: "Enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."
      - name: id
        type: integer
    notes: "Returns dict of sensor-name -> value (e.g. temperatures, fan tacho speeds)."

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
    params: []
    notes: "Returns array of channel names."

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
    params: []

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []
    notes: "Returns array of {severity, timestamp, source, description, custommessage}."

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []
    notes: "Returns array of {name, versions:{available,running}, status: Unknown|OK|Upgradable}."

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: "Forces a component upgrade at next reboot. Component selector UNRESOLVED from source."

  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []
    notes: "Engages CLO at the current light level."

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []
    notes: "Returns string serial number."

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset to Custom (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string

  - id: image_color_p7_custom_resettonative
    label: Reset Color to Native (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: "Cycles to the next RGB mode."
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "service", "error"]
    property: system.state
    notes: "Current projector operation state."

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state

  - id: active_source
    type: string
    property: image.window.main.source
    notes: "Name of currently active source."

  - id: laser_power
    type: float
    property: illumination.sources.laser.power
    notes: "Current target power in percent."

  - id: laser_minpower
    type: float
    property: illumination.sources.laser.minpower
    notes: "Dynamic minimum power bound."

  - id: laser_maxpower
    type: float
    property: illumination.sources.laser.maxpower
    notes: "Dynamic maximum power bound."

  - id: brightness
    type: float
    property: image.brightness

  - id: contrast
    type: float
    property: image.contrast

  - id: gamma
    type: float
    property: image.gamma

  - id: saturation
    type: float
    property: image.saturation

  - id: sharpness
    type: integer
    property: image.sharpness

  - id: image_orientation
    type: enum
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    property: image.orientation

  - id: network_lan_state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    property: network.device.lan.state

  - id: optics_shutter_position
    type: enum
    values: ["Open", "Closed"]
    property: optics.shutter.position

  - id: optics_zoom_position
    type: integer
    property: optics.zoom.position

  - id: optics_focus_position
    type: integer
    property: optics.focus.position

  - id: optics_lensshift_horizontal_position
    type: integer
    property: optics.lensshift.horizontal.position

  - id: optics_lensshift_vertical_position
    type: integer
    property: optics.lensshift.vertical.position

  - id: environment_alarmstate
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    property: environment.alarmstate

  - id: connector_detectedsignal
    type: object
    property: image.connector.{name}.detectedsignal
    notes: "Signal info: active, name, resolutions, timings, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode."
```

## Variables
```yaml
variables:
  - id: main_window_position
    property: image.window.main.position
    type: object
    schema: { x: int, y: int }
    access: RW

  - id: main_window_size
    property: image.window.main.size
    type: object
    schema: { width: int, height: int }
    access: RW

  - id: main_window_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    access: RW

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: RW

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    range: [1, 512]
    access: RW

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: RW

  - id: network_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    schema: { Address: string, Mask: string, Gateway: string, NameServers: string }
    access: RO

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: ["Open", "Closed"]
    access: RW

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: RW
    notes: "Enable/disable use of standby state; check availability first."

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: RW
    notes: "Enable/disable use of ECO state; check availability first."

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: RW

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: RW

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: RW

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: RW

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    items: string
    access: RW

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: RW

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: RW
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Unsolicited notification when a subscribed property value changes. params.property is an array of {name: value} objects. Has no id; client must NOT respond."
    example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"image.brightness":0.15}]}}'

  - id: signal_callback
    method: signal.callback
    description: "Unsolicited notification when a subscribed signal is emitted. params.signal is array of {name: {args}}. Has no id."
    example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'

  - id: modelupdated_signal
    signal: modelupdated
    description: "Signal triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe."
```

## Macros
```yaml
macros:
  - id: apply_warp_grid
    description: "Upload + select + enable a warp grid file."
    steps:
      - "curl -X POST -F file=@warp.xml http://{ip}/api/image/processing/warp/file/transfer"
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'

  - id: apply_blend_mask
    description: "Upload + select + enable a blend mask."
    steps:
      - "curl -X POST -F file=@mask.png http://{ip}/api/image/processing/blend/file/transfer"
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

  - id: apply_blacklevel_mask
    description: "Upload + select + enable a black level mask."
    steps:
      - "curl -X POST -F file=@blacklevel.png http://{ip}/api/image/processing/blacklevel/file/transfer"
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
      - '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Best practice before system.poweron: verify system.state is standby or ready (no-op if already on or in transition)."
  - "Best practice before system.poweroff: verify system.state is on (no-op if already off or in transition)."
power_on_sequencing:
  - "ECO mode wake requires special handling: Wake-on-LAN (MAC), IR remote power, keypad power, or RS-232 ASCII ':POWR1\\r'."
# UNRESOLVED: no explicit hard interlock / safety-critical lockout procedures stated in source beyond the power-state best-practice notes.
```

## Notes
- All control is JSON-RPC 2.0 over TCP 9090 or RS-232 (19200 8N1, no flow control). Same command surface for both transports.
- Parameters are passed by name; order does not matter.
- Parts of the API are dynamic and configuration-dependent (e.g. motorized lens vs not, DMX basic vs extended). Use the `introspect` method to discover the exact surface of a specific unit.
- File endpoints (warp/blend/blacklevel) use HTTP upload (curl `-F`) and HTTP download by URL `http://{ip}/api/...`; gray scale only (blue channel used for RGB-saved grayscale).
- Warp file format identical to MCM500/400.
- Blend/black-level mask sizes: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540.

<!-- UNRESOLVED: device name "Barco Displayport 12 Output Card" not found verbatim in source; source is the generic Barco Pulse projector API. -->
<!-- UNRESOLVED: real authenticate passcode not stated (source example used 98765). -->
<!-- UNRESOLVED: exact property/method set for this specific card model — confirm via live introspect. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:21:05.868Z
last_checked_at: 2026-08-05T07:25:47.488Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:25:47.488Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions match the refined Barco Pulse API source verbatim: transport parameters, JSON-RPC methods, HTTP upload endpoints, and ECO serial wake are all confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Pulse API catalog; exact command/property surface for this specific card model is not enumerated. Confirm via live introspect against a real unit."
- "firmware version compatibility not stated in source."
- "device name \"Displayport 12 Output Card\" not literally present in source text (source speaks of \"Pulse projectors\"). Model mapping unverified."
- "actual passcode value not stated in source (example used 98765)"
- "no explicit hard interlock / safety-critical lockout procedures stated in source beyond the power-state best-practice notes."
- "device name \"Barco Displayport 12 Output Card\" not found verbatim in source; source is the generic Barco Pulse projector API."
- "real authenticate passcode not stated (source example used 98765)."
- "exact property/method set for this specific card model — confirm via live introspect."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
