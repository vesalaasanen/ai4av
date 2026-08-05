---
spec_id: admin/barco-gld-106
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gld 106 Control Spec"
manufacturer: Barco
model_family: "Barco Gld 106"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Gld 106"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:19:04.483Z
last_checked_at: 2026-08-05T08:07:18.964Z
generated_at: 2026-08-05T08:07:18.964Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated in source; API surface is dynamic and model/configuration-dependent (source notes lens/peripheral-dependent availability)."
  - "source documents an `authenticate` JSON-RPC method with a numeric"
  - "ranges for optics.zoom.position / focus.position / lensshift.*.position,"
  - "source does not define canonical named macros; sequences left as prose."
  - "no explicit safety interlock procedures, lamp/laser exposure warnings,"
  - "auth.type — an authenticate method exists with a numeric passcode for elevated access, but real credentials are not in the source."
  - "firmware version compatibility not stated."
  - "numeric ranges for optics zoom/focus/lensshift positions not stated."
  - "illumination power min/max are dynamic (lens/lens-position dependent); no fixed range in source."
  - "firmware.schedulecomponentupgrade component-selection params not specified in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:07:18.964Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions have literal JSON-RPC method or HTTP endpoint matches in the source; transport (9090, 19200 8N1) verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gld 106 Control Spec

## Summary
Barco Gld 106 is a Pulse-architecture laser projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial (19200 baud). This spec covers power, illumination, source selection, image/picture settings, optics, warp/blend/blacklevel file handling, DMX, environment monitoring, and firmware management commands documented in the Pulse API catalog.

<!-- UNRESOLVED: exact firmware version compatibility not stated in source; API surface is dynamic and model/configuration-dependent (source notes lens/peripheral-dependent availability). -->

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
  # UNRESOLVED: source documents an `authenticate` JSON-RPC method with a numeric
  # passcode for elevated access, but no real credential. Normal end-user access
  # requires no authentication. Cannot resolve a concrete auth.type/value.
  type: null
```

## Traits
```yaml
traits:
  - powerable      # inferred: system.poweron / system.poweroff methods present
  - queryable      # inferred: property.get and list methods return state
  - routable       # inferred: image.window.main.source select / connector list
  - levelable      # inferred: illumination power + image brightness/contrast/etc.
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP (port 9090) and RS-232. Each entry below is a distinct
# documented method or property-setting operation. Parameterized operations show
# the variable part. Literal payloads copied verbatim from source where given.
# `id` is an arbitrary JSON-RPC request id (int/string) omitted from templates.

# ---- Power / system state ----
- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"property":"system.state"},"id":3}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"property":"system.state"},"id":4}'
  params: []

- id: eco_wake_serial
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII characters sent on RS-232 to wake a projector in ECO mode. Alternative wake methods: Wake-on-LAN (MAC address), remote power button, keypad power button.

# ---- Authentication ----
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret numeric passcode (98765 is the source example; real code UNRESOLVED).
  notes: Sets user access level. Required only for higher-than-end-user access; normal end-user access may skip authentication.

# ---- Source / connector management ----
- id: select_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI").

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{objectname}.listconnectors","id":4}'
  params:
    - name: objectname
      type: string
      description: Source object name (source name lowercased, non-word chars stripped; e.g. "DisplayPort 1" -> "displayport1").

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":0}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":0,"height":0}},"id":0}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{mode}"},"id":0}'
  params:
    - name: mode
      type: string
      description: Enum "Fill" | "OneToOne" | "FillScreen" | "Stretch"

# ---- Picture settings ----
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized offset. Min -1, Max 1, step 1, precision 0.01. 0 = default.

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1},"id":0}'
  params:
    - name: value
      type: float
      description: Normalized gain. Min 0, Max 2, step 1, precision 0.01. 1 = default.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":0}'
  params:
    - name: value
      type: float
      description: Min 1, Max 3, step 1, precision 0.1. Default 2.2.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1},"id":0}'
  params:
    - name: value
      type: float
      description: Min 0, Max 2, step 1, precision 0.01. 1 = default.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":0}'
  params:
    - name: value
      type: integer
      description: Min -2, Max 8, step 1, precision 1.

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"},"id":0}'
  params:
    - name: orientation
      type: string
      description: Enum "DESKTOP_FRONT" | "DESKTOP_REAR" | "CEILING_FRONT" | "CEILING_REAR"

# ---- Illumination ----
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: float
      description: Target power in percent. Min/max dynamic (read illumination.sources.laser.minpower / maxpower).

- id: clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":0}'
  params: []
  notes: Engages CLO at the current light level.

- id: laser_get_serialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":0}'
  params: []

# ---- Optics ----
- id: set_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"{position}"},"id":0}'
  params:
    - name: position
      type: string
      description: Enum "Open" | "Closed"

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"},"id":0}'
  params:
    - name: target
      type: string
      description: Enum "Open" | "Closed"

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0},"id":0}'
  params:
    - name: value
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0},"id":0}'
  params:
    - name: value
      type: integer

- id: set_lensshift_horizontal
  label: Set Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0},"id":0}'
  params:
    - name: value
      type: integer

- id: set_lensshift_vertical
  label: Set Lens Shift Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0},"id":0}'
  params:
    - name: value
      type: integer

# ---- Warp ----
- id: warp_enable
  label: Enable/Disable All Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST to /api/image/processing/warp/file/transfer.

- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address.
  notes: HTTP file upload (separate from JSON-RPC channel). Warp file format same as MCM500/400.

# ---- Blend ----
- id: blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST.

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
  notes: Grayscale 8/16-bit PNG/JPEG/TIFF. Color images accepted but only blue channel used. Size must match projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).

# ---- Black level ----
- id: blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
  notes: Grayscale 8/16-bit PNG/JPEG/TIFF. Same resolution rules as blend masks.

# ---- System state enables ----
- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":0}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":0}'
  params:
    - name: value
      type: boolean

# ---- DMX ----
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"},"id":0}'
  params:
    - name: mode
      type: string
      description: Mode name (use dmx.listmodes to enumerate). Basic mode exposes 2 channels; extended mode exposes more.

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":0}'
  params:
    - name: value
      type: integer
      description: DMX start channel [1..512].

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true},"id":0}'
  params:
    - name: value
      type: boolean

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":0}'
  params: []

- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":0}'
  params: []

# ---- Color presets / RGB ----
- id: color_p7_copy_preset_to_custom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{name}"},"id":0}'
  params:
    - name: presetname
      type: string

- id: color_p7_reset_preset
  label: Reset Color Preset To Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{name}"},"id":0}'
  params:
    - name: presetname
      type: string

- id: color_p7_reset_to_native
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":0}'
  params: []

- id: rgb_next_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":0}'
  params: []
  notes: Cycles through all possible RGB modes.

# ---- Introspection ----
- id: introspect
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/"object":"" introspects everything.
    - name: recursive
      type: boolean
      description: true (default) returns methods/properties/signals; false returns only child object names.

# ---- Environment / firmware ----
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      description: Enum "Sensor" | "Filter" | "Controller" | "Actuator" | "Alarm" | "GenericBlock".
    - name: valuetype
      type: string
      description: Enum "Temperature" | "Speed" | "PWM" | "Voltage" | "Current" | "Power" | "Altitude" | "Pressure" | "Humidity" | "ADC" | "Coordinate" | "Peltier" | "Waveform" | "Average" | "Delay" | "Difference" | "Interpolation" | "Limit" | "Median" | "Noise" | "Weighting" | "Comparison" | "Threshold" | "Formula" | "Driver" | "PID" | "Mode" | "State" | "Pump" | "Resistance" | "Simulation" | "Constant" | "Manual" | "Range" | "Any".

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":0}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":0}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":0}'
  params: []
  notes: Returns array of {name, versions:{available, running}, status:"Unknown"|"OK"|"Upgradable"}.

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":0}'
  params: []
  notes: Forces a component upgrade at the following reboot. Component selection params UNRESOLVED from source.

# ---- Example LED control (from methods guide) ----
- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
    - name: period
      type: integer
```

## Feedbacks
```yaml
# Queryable state (use property.get to read; subscribe for push notifications).
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: laser_power
  type: number
  property: illumination.sources.laser.power
  unit: percent

- id: laser_min_power
  type: number
  property: illumination.sources.laser.minpower
  unit: percent
  access: read_only

- id: laser_max_power
  type: number
  property: illumination.sources.laser.maxpower
  unit: percent
  access: read_only

- id: active_source
  type: string
  property: image.window.main.source

- id: detected_signal
  type: object
  property: image.connector.{connectorobject}.detectedsignal
  access: read_only
  notes: Fields include active(bool), name, vertical/horizontal totals+resolution+sync+porch, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range (0-255|16-235), chroma_sampling (4:4:4|4:2:2|4:2:0), gamma_type (POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.

- id: network_device_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state

- id: network_ip4config
  type: object
  property: network.device.lan.ip4config
  notes: Fields Address, Mask, Gateway, NameServers (all string).

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate
  access: read_only

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position
```

## Variables
```yaml
# Settable scalar/enum properties exposed as variables (already mirrored as Actions above;
# this section lists the canonical settable property space for UI binding).
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step: 1
  precision: 0.01
  default: 0

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01
  default: 1

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step: 1
  precision: 0.1
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01
  default: 1

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

# UNRESOLVED: ranges for optics.zoom.position / focus.position / lensshift.*.position,
# system.standby.enable / system.eco.enable accept type, dmx.mode string space,
# and image.color.* spaces not enumerated numerically in source.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; client must not respond). Subscribe first.
- id: property_changed
  method: property.changed
  description: Delivered when a subscribed property value changes. params.property is an array of {propertyName: value} objects.
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  method: signal.callback
  description: Delivered when a subscribed signal is emitted. params.signal is an array of {signalName: {args}} objects.

- id: modelupdated_signal
  method: signal.callback (introspect.objectchanged)
  description: Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe with signal "modelupdated".
```

## Macros
```yaml
# Source describes multi-step sequences but does not name them as macros.
# Documented sequences:
# - Warp activation: warp_enable -> warp_file_upload -> warp_file_select -> warp_file_enable
# - Blend activation: blend_file_upload -> blend_file_select -> blend_file_enable
# - Source signal monitoring: image.source.list -> translate names -> per-source listconnectors
#   -> per-connector subscribe image.connector.{name}.detectedsignal
# UNRESOLVED: source does not define canonical named macros; sequences left as prose.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - field: system.poweron
    note: "Verify projector state is 'standby' or 'ready' before issuing power on. If already on or in transition, command is ignored."
  - field: system.poweroff
    note: "Verify projector state is 'on' before issuing power off. If already off or in transition, command is ignored."
  - field: eco_wake_serial
    note: "ECO mode wake requires Wake-on-LAN, remote/keypad power button, or special RS-232 sequence ':POWR1\\r'. Normal JSON-RPC poweron may not wake from ECO."
# UNRESOLVED: no explicit safety interlock procedures, lamp/laser exposure warnings,
# or power-sequencing requirements stated in the refined source.
```

## Notes
- JSON-RPC 2.0 protocol. Parameters passed by name; order does not matter. Request `id` may be string or number; notifications omit `id` and must not be answered.
- Best practice: wait for `property.set` confirmation before re-setting the same property; continuous set-without-confirm may flood the server and reduce performance.
- Notifications are only sent on actual value change — subscribing does NOT return the current value. Use `property.get` to read current value.
- Source notifications fire twice on source switch: first for the deselected source (`""`), then for the newly selected source.
- File endpoints (warp/blend/blacklevel) use a separate HTTP channel (`http://{host}/api/...`), distinct from the JSON-RPC TCP/serial channel.
- API surface is dynamic and model/configuration-dependent (e.g. motorized lens vs. fixed; DMX basic vs. extended). Authoritative per-device API is obtained via `introspect`.

<!-- UNRESOLVED: auth.type — an authenticate method exists with a numeric passcode for elevated access, but real credentials are not in the source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: numeric ranges for optics zoom/focus/lensshift positions not stated. -->
<!-- UNRESOLVED: illumination power min/max are dynamic (lens/lens-position dependent); no fixed range in source. -->
<!-- UNRESOLVED: firmware.schedulecomponentupgrade component-selection params not specified in source. -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:19:04.483Z
last_checked_at: 2026-08-05T08:07:18.964Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:07:18.964Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions have literal JSON-RPC method or HTTP endpoint matches in the source; transport (9090, 19200 8N1) verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated in source; API surface is dynamic and model/configuration-dependent (source notes lens/peripheral-dependent availability)."
- "source documents an `authenticate` JSON-RPC method with a numeric"
- "ranges for optics.zoom.position / focus.position / lensshift.*.position,"
- "source does not define canonical named macros; sequences left as prose."
- "no explicit safety interlock procedures, lamp/laser exposure warnings,"
- "auth.type — an authenticate method exists with a numeric passcode for elevated access, but real credentials are not in the source."
- "firmware version compatibility not stated."
- "numeric ranges for optics zoom/focus/lensshift positions not stated."
- "illumination power min/max are dynamic (lens/lens-position dependent); no fixed range in source."
- "firmware.schedulecomponentupgrade component-selection params not specified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
