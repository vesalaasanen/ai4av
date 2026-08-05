---
spec_id: admin/barco-ac-ds01
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ac Ds01 Control Spec"
manufacturer: Barco
model_family: "Barco Ac Ds01"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Ac Ds01"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:12:07.938Z
last_checked_at: 2026-07-21T20:50:29.299Z
generated_at: 2026-07-21T20:50:29.299Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model family not explicitly named \"Ac Ds01\" in source text (source generic to \"Pulse projectors\"); product variants not enumerated."
  - "secret passcode value not stated in source"
  - "many additional properties exist dynamically per projector"
  - "source documents no explicit multi-step named macros; file-upload"
  - "source states no formal safety interlocks, power-sequencing"
  - "device model \"Ac Ds01\" not explicitly named in source text; source is the generic Pulse projector API reference."
  - "auth passcode value not stated (source uses 98765 as example only)."
  - "HTTP base URL host must be supplied at runtime; only path pattern stated."
  - "firmware/protocol version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:50:29.299Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions found verbatim in source; transport parameters verified; no shape mismatches. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-18
---

# Barco Ac Ds01 Control Spec

## Summary
Barco Pulse-based projector controlled via Pulse JSON-RPC API. Source documents TCP/IP control on port 9090 and RS-232 serial at 19200 baud. Covers power on/off, source selection, illumination, picture settings, warp/blend/black-level file handling, environment telemetry, DMX, optics (shutter/zoom/focus/lens shift), firmware management, and JSON-RPC introspection/subscriptions.

<!-- UNRESOLVED: device model family not explicitly named "Ac Ds01" in source text (source generic to "Pulse projectors"); product variants not enumerated. -->

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
  type: passcode  # inferred: source documents `authenticate` method with secret code
  # UNRESOLVED: secret passcode value not stated in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff methods present
  - queryable    # inferred: property.get / property.subscribe present
  - routable     # inferred: image.window.main.source selection present
  - levelable    # inferred: brightness/contrast/saturation/gamma/sharpness settable
```

## Actions
```yaml
# Each named JSON-RPC method documented in the source is one action. Literal
# payload (`command:`) carries the documented JSON-RPC body verbatim.
actions:
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []

  - id: authenticate
    label: Authenticate (set access level)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
    params:
      - name: code
        type: integer
        description: Secret pass code; sample value 98765 shown in source. Real value UNRESOLVED.
    notes: "Sample code 98765 is the source's example only."

  - id: property_set
    label: Set Property Value
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{objectname.propertyname}","value":{value}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property path (e.g. image.window.main.source)
      - name: value
        type: any
        description: Value type varies per property

  - id: property_get
    label: Get Property Value
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{objectname.propertyname}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property path

  - id: property_get_multi
    label: Get Multiple Property Values
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]}}'
    params:
      - name: property
        type: array
        description: Array of property paths

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{objectname.propertyname}"}}'
    params:
      - name: property
        type: string
        description: Property path or array of property paths

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{objectname.propertyname}"}}'
    params:
      - name: property
        type: string
        description: Property path or array of property paths

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signalname}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signalname}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: introspect_recursive
    label: Introspect Object (recursive)
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{name}","recursive":true}}'
    params:
      - name: object
        type: string
        description: Object name (dot notation); empty introspects everything
      - name: recursive
        type: boolean
        description: true (default) recurses into sub-objects

  - id: introspect_nonrecursive
    label: Introspect Object (one level)
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":["{name}",false]}'
    params:
      - name: object
        type: string
        description: Object name (dot notation)
      - name: recursive
        type: boolean
        description: false lists only immediate child object names

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
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name = source name with non-word chars stripped and lowercased (e.g. 'displayport1')

  - id: set_main_source_displayport1
    label: Select DisplayPort 1 As Input Source
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
    params: []

  - id: set_main_source_hdmi
    label: Select HDMI As Input Source
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"HDMI"}}'
    params: []

  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{Sensor|Filter|Controller|Actuator|Alarm|GenericBlock}","valuetype":"{Temperature|Speed|Voltage|...}"}}'
    params:
      - name: type
        type: string
        description: Sensor/Filter/Controller/Actuator/Alarm/GenericBlock
      - name: valuetype
        type: string
        description: Temperature/Speed/PWM/Voltage/Current/Power/Altitude/Pressure/Humidity/ADC/Coordinate/Peltier/Waveform/Average/Delay/Difference/Interpolation/Limit/Median/Noise/Weighting/Comparison/Threshold/Formula/Driver/PID/Mode/State/Pump/Resistance/Simulation/Constant/Manual/Range/Any

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

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade At Next Reboot
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []

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

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom (p7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{name}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name to copy

  - id: image_color_p7_custom_resetpreset
    label: Reset Custom Color Preset (p7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{name}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name to reset

  - id: image_color_p7_custom_resettonative
    label: Reset Custom Color To Native (p7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Cycle To Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []

  - id: eco_wake_serial
    label: Wake From ECO Mode (RS-232 ASCII)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: "Serial-port-only wake command per ECO-mode section."

  - id: upload_warp_file
    label: Upload Warp Grid File (HTTP)
    kind: action
    command: 'curl -X POST -F file=@warp.xml http://{projector-ip}/api/image/processing/warp/file/transfer'
    params:
      - name: projector-ip
        type: string
        description: Projector IP address
      - name: file
        type: string
        description: Local path to warp grid XML

  - id: upload_blend_mask
    label: Upload Blend Mask (HTTP)
    kind: action
    command: 'curl -X POST -F file=@mask.png http://{projector-ip}/api/image/processing/blend/file/transfer'
    params:
      - name: projector-ip
        type: string
      - name: file
        type: string
        description: PNG/JPEG/TIFF grayscale mask path

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask (HTTP)
    kind: action
    command: 'curl -X POST -F file=@blacklevel.png http://{projector-ip}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: projector-ip
        type: string
      - name: file
        type: string
        description: PNG/JPEG/TIFF grayscale mask path
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

  - id: optics_shutter_position
    type: enum
    values: ["Open", "Closed"]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'

  - id: network_device_lan_state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'

  - id: environment_alarmstate
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'

  - id: active_source
    type: string
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

  - id: connector_detectedsignal
    type: object
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{name}.detectedsignal"}}'
    notes: "Returns active, name (e.g. '2560x1600 @ 50.10Hz'), timings, color_space, signal_range, chroma_sampling, gamma_type, etc."

  - id: laser_power
    type: float
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

  - id: laser_minpower
    type: float
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'

  - id: laser_maxpower
    type: float
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'

  - id: temperatures
    type: object
    query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'

  - id: fan_speeds
    type: object
    query_command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
```

## Variables
```yaml
variables:
  - id: image_brightness
    type: float
    access: RW
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'

  - id: image_contrast
    type: float
    access: RW
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'

  - id: image_gamma
    type: float
    access: RW
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'

  - id: image_saturation
    type: float
    access: RW
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'

  - id: image_sharpness
    type: int
    access: RW
    min: -2
    max: 8
    step_size: 1
    precision: 1
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'

  - id: laser_power
    type: float
    access: RW
    unit: percent
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

  - id: main_source
    type: string
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

  - id: dmx_mode
    type: string
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'

  - id: dmx_startchannel
    type: int
    access: RW
    min: 1
    max: 512
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'

  - id: dmx_shutdown
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'

  - id: optics_zoom_position
    type: int
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'

  - id: optics_focus_position
    type: int
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'

  - id: optics_lensshift_horizontal
    type: int
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'

  - id: optics_lensshift_vertical
    type: int
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'

  - id: optics_shutter_target
    type: enum
    access: RW
    values: ["Open", "Closed"]
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{value}}}'
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"}}'

  - id: system_standby_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'

  - id: system_eco_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'

  - id: warp_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'

  - id: warp_file_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'

  - id: warp_file_selected
    type: string
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":{value}}}'

  - id: blend_file_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'

  - id: blend_file_selected
    type: array
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{value}}}'

  - id: blacklevel_file_enable
    type: bool
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'

  - id: blacklevel_file_selected
    type: string
    access: RW
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":{value}}}'

  - id: image_orientation
    type: enum
    access: RW
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":{value}}}'

  - id: image_scalingmode
    type: enum
    access: RW
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":{value}}}'

  - id: image_window_main_position
    type: object
    access: RW
    fields: [{x: int}, {y: int}]
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{value}}}'

  - id: image_window_main_size
    type: object
    access: RW
    fields: [{width: int}, {height: int}]
    set_command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{value}}}'

  - id: network_device_lan_ip4config
    type: object
    access: RO
    fields: [{Address: string}, {Mask: string}, {Gateway: string}, {NameServers: string}]
    query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'

  # UNRESOLVED: many additional properties exist dynamically per projector
  # configuration; source states API must be introspected for full enumeration.
```

## Events
```yaml
events:
  - id: property_changed
    description: Unsolicited notification pushed when a subscribed property value changes.
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{name}":{value}}]}}'
    notes: "No response must be returned for notifications."

  - id: signal_callback
    description: Unsolicited notification pushed when a subscribed signal fires.
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{name}":{"arg1":{v}}}...]}}'

  - id: modelupdated
    description: Signal emitted when object structure changes (objects added/removed); also surfaced via signal.callback.
    notes: "Subscribe via signal.subscribe with signal=modelupdated."
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step named macros; file-upload
# + select + enable warp/blend/blacklevel workflows are sequences a client must
# chain, but no named macro is defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power-on: good practice to verify system.state is 'standby' or 'ready' before issuing system.poweron; if already on or transitioning, nothing happens."
  - "Power-off: good practice to verify system.state is 'on' before issuing system.poweroff; if already off or transitioning, nothing happens."
  - "ECO-mode wake requires wake-on-LAN, remote/keypad power button, or serial ':POWR1\\r' command."
  - "property.set: wait for confirmation before re-setting same property to avoid flooding server with requests."
# UNRESOLVED: source states no formal safety interlocks, power-sequencing
# certifications, or hardware interlock procedures. Power/voltage/current
# ratings not stated - never inferred.
```

## Notes
- Pulse API is JSON-RPC 2.0. Parameters passed by name; order does not matter. Notifications have no `id` and require no response.
- API is partly dynamic; available objects/properties/signals depend on projector configuration (lens type, DMX mode, peripherals). Full enumeration requires runtime introspection via the `introspect` method.
- File transfer uses HTTP at `http://<projector-ip>/api/...` endpoints. Warp grid file format is the same as MCM500/400. Blend/black-level masks accept PNG (≤16 bit), JPEG, TIFF; color images are accepted but only the blue channel is used.
- RS-232 cable: 9-pin female on host, 9-pin male on projector, pin 2↔2, 3↔3, 5↔5.
- Property subscription delivers a notification only on actual value change; subscribing does NOT return the current value (use `property.get`).
- Source-select generates two notifications (deselect old, then select new).

<!-- UNRESOLVED: device model "Ac Ds01" not explicitly named in source text; source is the generic Pulse projector API reference. -->
<!-- UNRESOLVED: auth passcode value not stated (source uses 98765 as example only). -->
<!-- UNRESOLVED: HTTP base URL host must be supplied at runtime; only path pattern stated. -->
<!-- UNRESOLVED: firmware/protocol version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:12:07.938Z
last_checked_at: 2026-07-21T20:50:29.299Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:50:29.299Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions found verbatim in source; transport parameters verified; no shape mismatches. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model family not explicitly named \"Ac Ds01\" in source text (source generic to \"Pulse projectors\"); product variants not enumerated."
- "secret passcode value not stated in source"
- "many additional properties exist dynamically per projector"
- "source documents no explicit multi-step named macros; file-upload"
- "source states no formal safety interlocks, power-sequencing"
- "device model \"Ac Ds01\" not explicitly named in source text; source is the generic Pulse projector API reference."
- "auth passcode value not stated (source uses 98765 as example only)."
- "HTTP base URL host must be supplied at runtime; only path pattern stated."
- "firmware/protocol version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
