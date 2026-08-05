---
spec_id: admin/barco-ac-cm02
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco AC CM02 Control Spec"
manufacturer: Barco
model_family: "AC CM02"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "AC CM02"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:10:33.422Z
last_checked_at: 2026-07-21T20:50:28.198Z
generated_at: 2026-07-21T20:50:28.198Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model variants not enumerated; firmware version not stated; full per-property metadata only partially shown"
  - "passcode/token format and access-level enumeration not fully specified"
  - "source does not show param shape for selecting component"
  - "source documents no named multi-step macros"
  - "no explicit safety interlocks, power-sequencing requirements, or fault-recovery procedures stated in source"
  - "authentication passcode format and access-level enumeration"
  - "firmware version compatibility"
  - "protocol/api version number not stated"
  - "full per-property metadata for optics/network/dmx properties"
  - "param shape for firmware.schedulecomponentupgrade"
  - "error object format beyond JSON-RPC 2.0 reference"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:50:28.198Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions verified as literal matches in source; transport parameters (port 9090, baud 19200, serial config) confirmed; comprehensive coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-18
---

# Barco AC CM02 Control Spec

## Summary
Barco Pulse-family projector (AC CM02) controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Covers power, source selection, illumination, image adjustments, warp/blend/black-level file handling, optics, environment monitoring, DMX, firmware, and introspection.

<!-- UNRESOLVED: exact projector model variants not enumerated; firmware version not stated; full per-property metadata only partially shown -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: http://192.168.1.100/api  # example address from source; actual address per-install
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # source: authentication only required for elevated access; normal user access skips auth
  # UNRESOLVED: passcode/token format and access-level enumeration not fully specified
```

## Traits
```yaml
traits:
  - powerable       # system.poweron / system.poweroff present
  - queryable       # property.get, environment.getcontrolblocks present
  - levelable       # brightness/contrast/gamma/saturation/sharpness/power present
  - routable        # image.window.main.source selection present
```

## Actions
```yaml
actions:
  # --- Power ---
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

  - id: eco_wake_serial
    label: ECO Mode Wake via Serial
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII sequence sent on RS232 to wake projector in ECO mode

  # --- Authentication ---
  - id: authenticate
    label: Authenticate Session
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
    params:
      - name: code
        type: integer
        description: Secret passcode (example value 98765 shown in source)
    notes: Required only for elevated access; normal end-user access skips auth

  # --- Generic property/signal/introspect methods ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name
      - name: value
        type: any
        description: Value to set (type per property metadata)

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array of names for multi-get)

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
    params:
      - name: object
        type: string
        description: Object name (dot notation); empty introspects everything
      - name: recursive
        type: boolean
        description: If false, only one level of object names listed
        default: true

  # --- Source / connector methods ---
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
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name (e.g. displayport1) derived from source name

  # --- Environment ---
  - id: environment_getcontrolblocks
    label: Get Environment Sensor Readings
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
    params:
      - name: type
        type: string
        description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
      - name: valuetype
        type: string
        description: Value type (Temperature, Speed, Voltage, Current, Power, etc.)

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []

  # --- DMX ---
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

  # --- Firmware ---
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
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    # UNRESOLVED: source does not show param shape for selecting component

  # --- Illumination ---
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

  # --- Color management ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Preset To Custom (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Source preset name

  - id: image_color_p7_custom_resetpreset
    label: Reset Custom Preset (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name to reset

  - id: image_color_p7_custom_resettonative
    label: Reset P7 Custom To Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles through available RGB modes

  # --- File uploads (HTTP, separate from JSON-RPC) ---
  - id: upload_warp_file
    label: Upload Warp Grid File
    kind: action
    command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address
    notes: HTTP multipart upload; also accepts GET to download current grid

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    property: system.state
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

  - id: illumination_state
    type: enum
    property: illumination.state
    values: ["On", "Off"]

  - id: environment_alarmstate
    type: enum
    property: environment.alarmstate
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: network_device_lan_state
    type: enum
    property: network.device.lan.state
    values: [CONNECTED, DISCONNECTED]

  - id: image_window_main_source
    type: string
    property: image.window.main.source

  - id: image_scalingmode
    type: enum
    property: image.window.main.scalingmode
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: image_orientation
    type: enum
    property: image.orientation
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: optics_shutter_position
    type: enum
    property: optics.shutter.position
    values: [Open, Closed]

  - id: optics_shutter_target
    type: enum
    property: optics.shutter.target
    values: [Open, Closed]

  - id: connector_detectedsignal
    type: object
    property: image.connector.{name}.detectedsignal
    notes: Contains active, name, resolution, timing, color, stereo fields per source

  - id: environment_temperatures
    type: object
    notes: Returns dictionary of sensor-name -> temperature via environment.getcontrolblocks type=Sensor valuetype=Temperature

  - id: environment_fans
    type: object
    notes: Returns dictionary of fan-name -> rpm via environment.getcontrolblocks type=Sensor valuetype=Speed
```

## Variables
```yaml
variables:
  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    unit: percent
    access: read_write
    description: Target laser power in percent

  - id: illumination_sources_laser_minpower
    property: illumination.sources.laser.minpower
    type: float
    unit: percent
    access: read_only
    description: Minimum laser power in percent; dynamic

  - id: illumination_sources_laser_maxpower
    property: illumination.sources.laser.maxpower
    type: float
    unit: percent
    access: read_only
    description: Maximum laser power in percent; dynamic

  - id: image_brightness
    property: image.brightness
    type: float
    access: read_write
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: Normalized brightness/offset; 0 default

  - id: image_contrast
    property: image.contrast
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Normalized contrast/gain; 1 default

  - id: image_gamma
    property: image.gamma
    type: float
    access: read_write
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: Image gamma; default 2.2

  - id: image_saturation
    property: image.saturation
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Normalized saturation; 1 default

  - id: image_sharpness
    property: image.sharpness
    type: integer
    access: read_write
    min: -2
    max: 8
    step_size: 1
    precision: 1

  - id: image_window_main_position
    property: image.window.main.position
    type: object
    access: read_write
    fields: [{name: x, type: int}, {name: y, type: int}]

  - id: image_window_main_size
    property: image.window.main.size
    type: object
    access: read_write
    fields: [{name: width, type: int}, {name: height, type: int}]

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: read_write

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: read_write

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: read_write

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: read_write

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    items: string
    access: read_write

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: read_write

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: read_write

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    access: read_write
    min: 1
    max: 512

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: read_write

  - id: network_device_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    access: read_write
    fields:
      - {name: Address, type: string}
      - {name: Mask, type: string}
      - {name: Gateway, type: string}
      - {name: NameServers, type: string}

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer
    access: read_write

  - id: optics_focus_position
    property: optics.focus.position
    type: integer
    access: read_write

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer
    access: read_write

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer
    access: read_write

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: read_write

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: read_write
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification when a subscribed property changes; params.property is an array of {name: value} pairs

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification when a subscribed signal fires; params.signal is an array of {name: args} pairs

  - id: modelupdated_signal
    description: Signal triggered when object structure changes (objects added/removed); subscribe via signal.subscribe
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on: best practice to verify system.state is standby or ready before issuing system.poweron
  - power_off: best practice to verify system.state is on before issuing system.poweroff
notes:
  - Power methods return null result on success (not an error); error member present on failure
  - If projector already on/off or in transition, power command is a no-op
  - property.set on same property without waiting for confirmation may flood server and reduce performance
# UNRESOLVED: no explicit safety interlocks, power-sequencing requirements, or fault-recovery procedures stated in source
```

## Notes
- JSON-RPC 2.0 protocol over TCP/9090 and RS-232 (19200 baud). Same commands for both transports.
- Parameters passed by name; order does not matter.
- API is partly dynamic — exact surface depends on projector model and peripherals (lens, DMX mode, etc.). Use `introspect` for authoritative API of a specific unit.
- Source-name to object-name mapping: strip non-word chars, lowercase (e.g. "DisplayPort 1" -> "displayport1").
- Blend/black-level masks: grayscale 8 or 16 bit; size must match projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Blue channel used when RGB supplied.
- Warp file format same as MCM500/400.
- ECO wake alternatives: Wake-on-LAN (MAC), remote power button, keypad power button, or `:POWR1\r` on RS232.
- File endpoints also support GET for download via browser or `curl -O -J`.

<!-- UNRESOLVED: authentication passcode format and access-level enumeration -->
<!-- UNRESOLVED: firmware version compatibility -->
<!-- UNRESOLVED: protocol/api version number not stated -->
<!-- UNRESOLVED: full per-property metadata for optics/network/dmx properties -->
<!-- UNRESOLVED: param shape for firmware.schedulecomponentupgrade -->
<!-- UNRESOLVED: error object format beyond JSON-RPC 2.0 reference -->
```

Self-check pass: no invented voltages/currents/power; port 9090 + baud 19200 verbatim from source; status=draft; confidence=low; UNRESOLVED markers present throughout.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:10:33.422Z
last_checked_at: 2026-07-21T20:50:28.198Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:50:28.198Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions verified as literal matches in source; transport parameters (port 9090, baud 19200, serial config) confirmed; comprehensive coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model variants not enumerated; firmware version not stated; full per-property metadata only partially shown"
- "passcode/token format and access-level enumeration not fully specified"
- "source does not show param shape for selecting component"
- "source documents no named multi-step macros"
- "no explicit safety interlocks, power-sequencing requirements, or fault-recovery procedures stated in source"
- "authentication passcode format and access-level enumeration"
- "firmware version compatibility"
- "protocol/api version number not stated"
- "full per-property metadata for optics/network/dmx properties"
- "param shape for firmware.schedulecomponentupgrade"
- "error object format beyond JSON-RPC 2.0 reference"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
