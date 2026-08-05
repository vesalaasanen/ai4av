---
spec_id: admin/barco-black-lampdoor-indicator-left
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Black Lampdoor Indicator Left Control Spec"
manufacturer: Barco
model_family: "Black Lampdoor Indicator Left"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Black Lampdoor Indicator Left"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T09:02:14.140Z
last_checked_at: 2026-07-21T21:18:14.375Z
generated_at: 2026-07-21T21:18:14.375Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model line and firmware compatibility not stated in source. API is dynamic and parts depend on peripherals/configuration (see source note)."
  - "secret pass code format/credentials not specified in source"
  - "optics position properties are listed but read/write access not explicitly stated"
  - "no explicit multi-step sequences described in source"
  - "source notes ECO wake requires special handling (WoL/remote/keypad/serial :POWR1) but"
  - "exact projector model family and firmware compatibility range not stated in source."
  - "authentication secret pass code format not specified (only that one exists for elevated access)."
  - "read/write access for many optics/window position properties not explicitly stated in source."
  - "exact model/firmware, auth passcode format, optics RW access."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:18:14.375Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions map to documented JSON-RPC methods, HTTP endpoints, or special serial commands. Transport verified: TCP 9090, serial 19200 8N1, base_url with /api path, optional auth. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Black Lampdoor Indicator Left Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial (19200 baud). Spec covers power, source selection, illumination, picture, warping, blending, black level, optics, environment, DMX, firmware, and introspection commands documented in the Pulse API catalog.

<!-- UNRESOLVED: exact projector model line and firmware compatibility not stated in source. API is dynamic and parts depend on peripherals/configuration (see source note). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  # http base used for file endpoints (warp/blend/blacklevel transfer)
  base_url: "http://{projector_ip}/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # source: auth only required for higher-than-end-user access; end-user may skip
  # UNRESOLVED: secret pass code format/credentials not specified in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: system.poweron / system.poweroff present
  - queryable  # inferred: property.get queries present
  - levelable  # inferred: brightness/contrast/gamma/saturation/power level controls present
  - routable  # inferred: image.window.main.source selection present
```

## Actions
```yaml
actions:
  # --- Power ---
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

  - id: eco_serial_wake
    label: ECO Mode Serial Wake
    kind: action
    command: ":POWR1\r"
    params: []
    notes: ASCII sent on RS-232 to wake projector in ECO mode

  # --- Authentication ---
  - id: authenticate
    label: Authenticate (set access level)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
    params:
      - name: code
        type: integer
        description: Secret pass code

  # --- Property set/get (generic; concrete settable properties listed as separate actions) ---
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
        description: Property value

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name

  - id: property_get_multi
    label: Get Multiple Properties
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]}}'
    params:
      - name: property
        type: array
        description: Array of dot-notation property names

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array)

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array)

  # --- Signals ---
  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (or array)

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (or array)

  # --- Introspection ---
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation (default empty = everything)
      - name: recursive
        type: boolean
        description: If false, only object names listed (one level)

  # --- Source / connector management ---
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
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name (lowercase, non-word chars removed; e.g. displayport1)

  - id: set_main_source
    label: Set Active Source (main window)
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
    params:
      - name: source
        type: string
        description: Source name (e.g. DisplayPort 1, HDMI)

  # --- Illumination ---
  - id: set_laser_power
    label: Set Laser Power
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
    params:
      - name: value
        type: float
        description: Target power in percent

  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []

  # --- Picture settings ---
  - id: set_brightness
    label: Set Brightness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
    params:
      - name: value
        type: float
        description: Normalized, -1..1, default 0

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
    params:
      - name: value
        type: float
        description: Normalized, 0..2, default 1

  - id: set_gamma
    label: Set Gamma
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
    params:
      - name: value
        type: float
        description: 1..3, default 2.2

  - id: set_saturation
    label: Set Saturation
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
    params:
      - name: value
        type: float
        description: Normalized, 0..2, default 1

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
    params:
      - name: value
        type: integer
        description: -2..8

  - id: set_orientation
    label: Set Image Orientation
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"}}'
    params:
      - name: value
        type: string
        description: 'Enum: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR'

  - id: set_scalingmode
    label: Set Main Window Scaling Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}'
    params:
      - name: value
        type: string
        description: 'Enum: Fill, OneToOne, FillScreen, Stretch'

  # --- Color management ---
  - id: color_p7_custom_copypresettocustom
    label: Copy Color Preset to Custom (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name

  - id: color_p7_custom_resetpreset
    label: Reset Custom Color Preset (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name

  - id: color_p7_custom_resettonative
    label: Reset Custom Color to Native (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: color_rgbmode_next
    label: Cycle to Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []

  # --- Warping ---
  - id: set_warp_enable
    label: Enable/Disable Warp
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  - id: set_warp_file_enable
    label: Enable/Disable Warp File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  - id: set_warp_file_selected
    label: Select Warp File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
    params:
      - name: filename
        type: string

  - id: upload_warp_file
    label: Upload Warp Grid File (HTTP)
    kind: action
    command: "curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer"
    params:
      - name: projector_ip
        type: string

  # --- Blending ---
  - id: set_blend_file_enable
    label: Enable/Disable Blend File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  - id: set_blend_file_selected
    label: Select Blend File(s)
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{filenames}}}'
    params:
      - name: filenames
        type: array
        description: Array of selected blend file names

  - id: upload_blend_mask
    label: Upload Blend Mask (HTTP)
    kind: action
    command: "curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer"
    params:
      - name: projector_ip
        type: string

  # --- Black level ---
  - id: set_blacklevel_file_enable
    label: Enable/Disable Black Level Correction
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  - id: set_blacklevel_file_selected
    label: Select Black Level File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
    params:
      - name: filename
        type: string

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask (HTTP)
    kind: action
    command: "curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer"
    params:
      - name: projector_ip
        type: string

  # --- Optics ---
  - id: set_shutter_target
    label: Set Shutter Target
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}'
    params:
      - name: value
        type: string
        description: 'Enum: Open, Closed'

  # --- System states toggles ---
  - id: set_standby_enable
    label: Enable/Disable Standby State
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  - id: set_eco_enable
    label: Enable/Disable ECO State
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
    params:
      - name: value
        type: boolean

  # --- DMX ---
  - id: set_dmx_mode
    label: Set DMX Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'
    params:
      - name: value
        type: string

  - id: set_dmx_startchannel
    label: Set DMX Start Channel
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
    params:
      - name: value
        type: integer
        description: 1..512

  - id: set_dmx_shutdown
    label: Enable/Disable DMX Shutdown
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
    params:
      - name: value
        type: boolean

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

  # --- Environment ---
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
    params:
      - name: type
        type: string
        description: 'Enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
      - name: valuetype
        type: string
        description: 'Enum: Temperature, Speed, PWM, Voltage, Current, Power, ...'

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
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
    label: Schedule Component Upgrade at Next Reboot
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []

  # --- LED control (documented in Methods example) ---
  - id: ledctrl_blink
    label: Blink LED
    kind: action
    command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
    params:
      - name: led
        type: string
        description: e.g. systemstatus
      - name: color
        type: string
        description: e.g. red
      - name: period
        type: integer
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    property: system.state

  - id: illumination_state
    type: enum
    values: [On, Off]
    property: illumination.state

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: network_device_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: shutter_position
    type: enum
    values: [Open, Closed]
    property: optics.shutter.position
```

## Variables
```yaml
variables:
  - id: laser_power
    property: illumination.sources.laser.power
    type: float
    unit: percent
    access: RW

  - id: laser_minpower
    property: illumination.sources.laser.minpower
    type: float
    unit: percent
    access: R

  - id: laser_maxpower
    property: illumination.sources.laser.maxpower
    type: float
    unit: percent
    access: R

  - id: brightness
    property: image.brightness
    type: float
    access: RW
    constraints: {min: -1, max: 1, precision: 0.01}

  - id: contrast
    property: image.contrast
    type: float
    access: RW
    constraints: {min: 0, max: 2, precision: 0.01}

  - id: gamma
    property: image.gamma
    type: float
    access: RW
    constraints: {min: 1, max: 3, precision: 0.1}

  - id: saturation
    property: image.saturation
    type: float
    access: RW
    constraints: {min: 0, max: 2, precision: 0.01}

  - id: sharpness
    property: image.sharpness
    type: integer
    access: RW
    constraints: {min: -2, max: 8}

  - id: zoom_position
    property: optics.zoom.position
    type: integer
    access: RW

  - id: focus_position
    property: optics.focus.position
    type: integer
    access: RW

  - id: lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer
    access: RW

  - id: lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer
    access: RW
  # UNRESOLVED: optics position properties are listed but read/write access not explicitly stated
```

## Events
```yaml
events:
  - id: property_changed
    description: Unsolicited notification when a subscribed property value changes
    method: property.changed
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{name:value}]}}'

  - id: signal_callback
    description: Unsolicited notification when a subscribed signal is emitted
    method: signal.callback
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{name:{args}}]}}'

  - id: modelupdated
    description: Signal triggered when object structure changes (objects added/removed)
    method: modelupdated
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes ECO wake requires special handling (WoL/remote/keypad/serial :POWR1) but
# no interlock or power-on sequencing requirements stated. Source advises verifying projector state
# before issuing power on/off but does not define a mandatory interlock.
```

## Notes
- API uses JSON-RPC 2.0 over TCP/IP port 9090 and RS-232 (19200 8N1, no flow control). Same command set for all connection types.
- Source warns API is dynamic: parts depend on peripherals and configuration (e.g. lens without motorized zoom omits that API; DMX extended mode exposes more channels). Exact API best obtained via `introspect`.
- Source signal-detection property uses connector-object naming `image.connector.{name}.detectedsignal` (e.g. `l1hdmi`, `displayport1`); names derived by lowercasing and stripping non-word chars.
- File transfer endpoints are HTTP at `http://{ip}/api/...`; upload via HTTP POST multipart (`-F file=@...`).
- ECO-mode wake over serial uses raw ASCII `:POWR1\r`, distinct from JSON-RPC.
<!-- UNRESOLVED: exact projector model family and firmware compatibility range not stated in source. -->
<!-- UNRESOLVED: authentication secret pass code format not specified (only that one exists for elevated access). -->
<!-- UNRESOLVED: read/write access for many optics/window position properties not explicitly stated in source. -->
```

Spec emitted. JSON-RPC Pulse projector, TCP 9090 + serial 19200 8N1. Enumerated all documented methods + settable properties. Gaps marked UNRESOLVED: exact model/firmware, auth passcode format, optics RW access.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T09:02:14.140Z
last_checked_at: 2026-07-21T21:18:14.375Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:18:14.375Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions map to documented JSON-RPC methods, HTTP endpoints, or special serial commands. Transport verified: TCP 9090, serial 19200 8N1, base_url with /api path, optional auth. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model line and firmware compatibility not stated in source. API is dynamic and parts depend on peripherals/configuration (see source note)."
- "secret pass code format/credentials not specified in source"
- "optics position properties are listed but read/write access not explicitly stated"
- "no explicit multi-step sequences described in source"
- "source notes ECO wake requires special handling (WoL/remote/keypad/serial :POWR1) but"
- "exact projector model family and firmware compatibility range not stated in source."
- "authentication secret pass code format not specified (only that one exists for elevated access)."
- "read/write access for many optics/window position properties not explicitly stated in source."
- "exact model/firmware, auth passcode format, optics RW access."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
