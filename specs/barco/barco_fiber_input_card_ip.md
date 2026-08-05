---
spec_id: admin/barco-fiber-input-card
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fiber Input Card Control Spec"
manufacturer: Barco
model_family: "Barco Fiber Input Card"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Fiber Input Card"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:40:16.296Z
last_checked_at: 2026-08-05T08:00:42.677Z
generated_at: 2026-08-05T08:00:42.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The supplied source is the generic Barco \"Pulse API / RS232 and Network Command Catalog\" reference; no model-specific behavior for \"Barco Fiber Input Card\" (e.g. fiber input connector handling) is documented in the text. The device name provided by the operator is used in front matter. Available sources/connectors are reported dynamically by image.source.list / image.connector.list and vary by projector model."
  - "actual passcode value per device not stated (example code 98765 is illustrative only)"
  - "source does not show params for selecting which component; introspect for exact signature."
  - "the source additionally references many property.set targets"
  - "absolute min/max not numerically stated in source (example reads max 100, min 0)."
  - "source documents no explicit named multi-step macro sequences."
  - "source states no hard safety interlocks, power-sequencing lockouts,"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:00:42.677Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match verbatim JSON-RPC method names, HTTP paths, or :POWR1\\r literal in the refined Barco Pulse catalog; transport values supported; spec covers the full documented command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Fiber Input Card Control Spec

## Summary
Barco Pulse-platform control interface exposed as JSON-RPC 2.0 over TCP/IP (port 9090) and over a 19200 baud RS-232 serial link. Covers power state, source/window selection, illumination (laser) power, image picture settings, warp/blend/black-level file management, environment sensors, optics, DMX, firmware and introspection. The same command set is available across all connection types.

<!-- UNRESOLVED: The supplied source is the generic Barco "Pulse API / RS232 and Network Command Catalog" reference; no model-specific behavior for "Barco Fiber Input Card" (e.g. fiber input connector handling) is documented in the text. The device name provided by the operator is used in front matter. Available sources/connectors are reported dynamically by image.source.list / image.connector.list and vary by projector model. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090            # "TCP/IP can be used... available on port number 9090"
  base_url: "http://{projector_ip}/api"  # used for file endpoints; projector IP substituted (e.g. 192.168.1.100)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents `authenticate` method with secret code (e.g. 98765)
  # Authentication sets user access level. "For normal end user access the
  # authentication can be skipped." Required only for higher-than-end-user level.
  # UNRESOLVED: actual passcode value per device not stated (example code 98765 is illustrative only)
```

## Traits
```yaml
traits:
  - powerable   # inferred: system.poweron / system.poweroff commands present
  - queryable   # inferred: property.get, *.list, environment.getcontrolblocks queries present
  - levelable   # inferred: brightness/contrast/gamma/saturation/sharpness + illumination power
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over the TCP/serial transport unless noted.
# Method names are emitted verbatim as documented. Parameterized methods show
# the variable part. `id` is the JSON-RPC request id and is omitted from
# command templates (caller-assigned).

# --- Authentication ---
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Example in source is 98765 (illustrative).
  notes: Required only when higher-than-normal-end-user access is needed.

# --- System / Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: Best practice - verify system.state is standby or ready first. No-op if already on or transitioning.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: Best practice - verify system.state is on first. No-op if already off or transitioning.

- id: eco_wake_serial
  label: ECO Mode Wake (RS-232 ASCII)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Special ASCII command on the RS-232 serial port to wake a projector in ECO/power-save mode. Alternative wake methods are Wake-on-LAN (MAC address), remote power button, or keypad power button.

# --- Generic property/signal/introspect framework ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.window.main.source, image.brightness, illumination.sources.laser.power).
    - name: value
      type: any
      description: Value matching the property's declared type.
  notes: Wait for confirmation before setting the same property again (flooding degrades performance).

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or array of property names for multi-get.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names.

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Single signal name (e.g. modelupdated) or array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Single signal name or array of signal names.

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",{recursive}],"id":{id}}'
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty/default introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed.
  notes: Also accepted as params object {"object":"...","recursive":true}. Result restricted by authenticated access level.

# --- Image: sources / connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params: []
  notes: Returns array of source name strings. Contents vary by projector model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors","id":{id}}'
  params:
    - name: sourceobject
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. "DisplayPort 1" -> "displayport1").
  notes: Returns array of {gridposition:{row,column,plane}, name}.

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params: []
  notes: Engages CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params: []

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: type
      type: string
      description: Sensor type enum - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: Value type enum - Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.
  notes: Returns dict of sensor-name -> reading (e.g. fan tacho speeds, temperatures).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params: []
  notes: Returns array of {name, versions:{available, running}, status} where status enum is Unknown|OK|Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade At Next Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":{id}}'
  params: []
  # UNRESOLVED: source does not show params for selecting which component; introspect for exact signature.

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params: []
  notes: Returns array of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params: []
  notes: Returns array of mode name strings. Basic mode exposes 2 channels; extended mode exposes more.

# --- Image color management ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Custom Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Custom Color To Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params: []
  notes: Cycles to the next RGB mode.

# --- LED control (documented in Methods example) ---
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}},"id":{id}}'
  params:
    - name: led
      type: string
      description: LED identifier (source example value "systemstatus").
    - name: color
      type: string
      description: LED color (source example value "red").
    - name: period
      type: integer
      description: Blink period (source example value 42).

# --- HTTP file endpoints (upload/download via browser or curl) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/warp/file/transfer  (multipart: file=@warp.xml)'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address (e.g. 192.168.1.100).
  notes: curl -F file=@warp.xml http://{ip}/api/image/processing/warp/file/transfer. Same format as MCM500/400.

- id: download_warp_file
  label: Download Warp Grid File
  kind: query
  command: 'GET http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
  notes: Browser GET triggers download. For endpoints that don't support current-file download, append filename (e.g. /.../transfer/warpgrid.xml).

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/blend/file/transfer  (multipart: file=@mask.png)'
  params:
    - name: projector_ip
      type: string
  notes: Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size must match projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540). Color images accepted but only blue channel used.

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/blacklevel/file/transfer  (multipart: file=@blacklevel.png)'
  params:
    - name: projector_ip
      type: string
  notes: Same size/format constraints as blend mask.

# UNRESOLVED: the source additionally references many property.set targets
# (image.processing.warp.enable, image.processing.warp.file.selected,
# image.processing.warp.file.enable, image.processing.blend.file.selected,
# image.processing.blend.file.enable, image.processing.blacklevel.file.selected,
# image.processing.blacklevel.file.enable, image.window.main.position/size/
# scalingmode, optics.shutter.target, optics.zoom/focus/lensshift, dmx.mode,
# dmx.startchannel, dmx.shutdown, network.device.lan.*, system.standby.enable,
# system.eco.enable). These are all driven via the generic property_set action
# above and are listed in the Variables section rather than as separate actions.
```

## Feedbacks
```yaml
# Observable state values returned by property.get / emitted via property.changed
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: active_source
  type: string
  property: image.window.main.source
  notes: Source name string (e.g. "DisplayPort 1", "HDMI"). Two notifications on switch - first empty (deselect), then new source name.

- id: connector_detected_signal
  type: object
  property: image.connector.{connectorobject}.detectedsignal
  notes: Fields include active(bool), name, vertical/horizontal totals+resolution+sync+porch, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range(0-255|16-235), chroma_sampling(4:4:4|4:2:2|4:2:0), gamma_type(POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode(None|Sequential|FramePacked|TopBottom|SideBySide).

- id: network_device_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: environment_alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position
```

## Variables
```yaml
# Settable properties driven via property_set. Min/max/step from source introspection example.
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Normalized brightness/offset. 0 default, 1 = 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized contrast/gain. 1 default.

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Image gamma. Default 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Normalized saturation. 1 default.

- id: image_sharpness
  property: image.sharpness
  type: int
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: Normalized sharpness.

- id: image_orientation
  property: image.orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: illumination_sources_laser_power
  property: illumination.sources.laser.power
  type: float
  description: Target laser power in percent. RW. Dynamic min/max depend on lens type/position.
  # UNRESOLVED: absolute min/max not numerically stated in source (example reads max 100, min 0).

- id: dmx_mode
  property: dmx.mode
  type: string
  description: Current DMX mode. Basic mode = 2 channels; extended exposes more.

- id: dmx_startchannel
  property: dmx.startchannel
  type: int
  description: DMX start channel [1..512].

- id: dmx_shutdown
  property: dmx.shutdown
  type: bool

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values: ["Open", "Closed"]

- id: system_standby_enable
  property: system.standby.enable
  type: bool
  description: Enable/disable standby state. Check availability first.

- id: system_eco_enable
  property: system.eco.enable
  type: bool
  description: Enable/disable ECO state. Check availability first.

- id: warp_enable
  property: image.processing.warp.enable
  type: bool
  description: Globally enable/disable all warp functions.

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: bool

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: bool

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  description: Currently selected blend files.

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: bool

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string

# Read-only reference properties (min/max power levels, positions, ip4config) - listed for completeness:
- id: illumination_sources_laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  access: ro
- id: illumination_sources_laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  access: ro
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response to return).
- id: property_changed
  method: property.changed
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":<value>}]}}'
  description: Emitted when a subscribed property value changes. Delivered only on actual value change; subscribing does NOT return current value (use property.get). Two notifications delivered on source switch (deselect then select).

- id: signal_callback
  method: signal.callback
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":<value>,"arg2":<value>}}]}}'
  description: Emitted when a subscribed signal fires. Receives array of signal/argument-list pairs.

- id: modelupdated
  signal: modelupdated
  description: Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe. Callback delivers introspect.objectchanged with {object, isnew(bool - true=new, false=lost)}.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit named multi-step macro sequences.
# (The warp/blend/black-level upload workflows are implicit sequences: upload via
# HTTP POST -> property.set *.file.selected -> property.set *.file.enable; not
# authoring as Macros since source does not name them as presets.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
warnings:
  - power_on: best practice to verify system.state is "standby" or "ready" first; command is a no-op if already on or transitioning.
  - power_off: best practice to verify system.state is "on" first; command is a no-op if already off or transitioning.
  - eco_wake: ECO-mode wake requires Wake-on-LAN, remote/keypad power button, or the special RS-232 ASCII sequence (":POWR1\r"). Normal JSON-RPC system.poweron may not wake from ECO.
# UNRESOLVED: source states no hard safety interlocks, power-sequencing lockouts,
# or confirmation-gated commands. No voltage/current/power values stated.
```

## Notes
- The API is partly dynamic: available objects/properties depend on projector model, mounted lens, DMX mode, peripherals, etc. Source explicitly states the documentation "may not be complete" for a specific device — use `introspect` to enumerate the exact API.
- All JSON-RPC params are passed by name; parameter order does not matter.
- A `property.set` confirmation should be awaited before re-setting the same property (continuous unconfirmed sets flood the server and reduce performance).
- File transfer endpoints use HTTP at `http://{projector_ip}/api/...` (separate from the JSON-RPC TCP/serial channel). Projector IP example in source is `192.168.1.100`.
- Warp grid file format matches MCM500/400.
- Source name -> object name transform: strip non-word chars, lowercase (e.g. "DisplayPort 1" -> "displayport1"). Same transform for connector names.

<!-- UNRESOLVED: -->
<!-- - "Barco Fiber Input Card" is the operator-supplied model name; the source text is the generic Barco Pulse projector API catalog and does not describe any fiber-input-card-specific behavior or connector. -->
<!-- - Actual per-device passcode for `authenticate` not stated (example 98765 is illustrative). -->
<!-- - Absolute min/max for illumination.sources.laser.power not numerically fixed in source (example response shows max 100 / min 0, but text says these are dynamic per lens). -->
<!-- - Firmware version compatibility ranges not stated. -->
<!-- - Protocol/API version number not stated. -->
<!-- - Exact params signature for firmware.schedulecomponentupgrade not shown; introspect required. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:40:16.296Z
last_checked_at: 2026-08-05T08:00:42.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:00:42.677Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match verbatim JSON-RPC method names, HTTP paths, or :POWR1\\r literal in the refined Barco Pulse catalog; transport values supported; spec covers the full documented command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The supplied source is the generic Barco \"Pulse API / RS232 and Network Command Catalog\" reference; no model-specific behavior for \"Barco Fiber Input Card\" (e.g. fiber input connector handling) is documented in the text. The device name provided by the operator is used in front matter. Available sources/connectors are reported dynamically by image.source.list / image.connector.list and vary by projector model."
- "actual passcode value per device not stated (example code 98765 is illustrative only)"
- "source does not show params for selecting which component; introspect for exact signature."
- "the source additionally references many property.set targets"
- "absolute min/max not numerically stated in source (example reads max 100, min 0)."
- "source documents no explicit named multi-step macro sequences."
- "source states no hard safety interlocks, power-sequencing lockouts,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
