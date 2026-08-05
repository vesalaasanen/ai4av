---
spec_id: admin/barco-f80-frame
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F80 Frame Control Spec"
manufacturer: Barco
model_family: "Barco F80 Frame"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco F80 Frame"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:14:38.622Z
last_checked_at: 2026-08-05T08:00:21.999Z
generated_at: 2026-08-05T08:00:21.999Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Pulse API catalog; exact property/connector availability varies per device configuration and must be confirmed via runtime introspection. Firmware version compatibility not stated."
  - "projector IP address is per-installation, not stated as a default."
  - "full set of environment sensor keys (temperature/fan/voltage) is"
  - "no explicit multi-step sequences are documented as named macros"
  - "no formal power-on sequencing, thermal interlock thresholds, or"
  - "firmware version compatibility not stated in source"
  - "projector default IP address not stated"
  - "exact environment sensor key set is device-specific (query at runtime)"
  - "connector set beyond the documented examples is model-dependent"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:00:21.999Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec action units match source commands literally; transport values (port 9090, 19200/8N1) verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco F80 Frame Control Spec

## Summary
The Barco F80 Frame is a Pulse-architecture projector controlled via the Pulse API, a JSON-RPC 2.0 interface over TCP/IP (port 9090) and RS-232 serial. This spec covers power control, source selection, illumination (laser) power, picture settings (brightness/contrast/saturation/gamma/sharpness), geometry warp, blend and black-level masks, optics (shutter/zoom/focus/lens shift), environment monitoring (temperatures/fans), DMX, firmware management, and the introspection/property-subscription framework.

<!-- UNRESOLVED: source is the generic Pulse API catalog; exact property/connector availability varies per device configuration and must be confirmed via runtime introspection. Firmware version compatibility not stated. -->

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
  type: none  # inferred: source states auth is optional ("only necessary when a higher level than normal end user is required"); see authenticate action for elevated access
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff
  - routable     # inferred from source selection (image.window.main.source)
  - queryable    # inferred from property.get and list methods
  - levelable    # inferred from brightness/contrast/laser-power settable values
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over TCP:9090 / RS-232 unless noted.
# `id` is the JSON-RPC request identifier (client-chosen) and is omitted from
# templates for brevity; a real request must include it.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: Result is null on success. No-op if already on or transitioning.

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: Result is null on success. No-op if already off or transitioning.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII sequence sent on RS-232 to wake a projector in ECO mode.

# --- Source selection ---
- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI")

# --- Illumination ---
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}}}'
  params:
    - name: power
      type: float
      description: Target power in percent (range per minpower/maxpower properties)
  notes: Best practice to wait for property.set confirmation before re-setting.

- id: engage_clo
  label: Engage Constant Light Output (CLO)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

# --- Picture settings (image.* set via property.set) ---
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized offset, -1..1 (0 default, 1 = 100% offset), precision 0.01

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized gain, 0..2 (1 default), precision 0.01

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized, 0..2 (1 default), precision 0.01

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma, 1..3 (2.2 default), precision 0.1

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Normalized, -2..8, step 1

# --- Geometry warp (image.processing.warp.*) ---
- id: enable_warp
  label: Enable/Disable All Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: true to globally enable warp

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded warp grid filename (e.g. "warp.xml")
  notes: Upload the file first via HTTP POST to /api/image/processing/warp/file/transfer

- id: enable_warp_file
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

# --- Blend (image.processing.blend.*) ---
- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded blend mask filename (e.g. "mask.png")
  notes: Upload via HTTP POST to /api/image/processing/blend/file/transfer

- id: enable_blend_file
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

# --- Black level (image.processing.blacklevel.*) ---
- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded black-level mask filename (e.g. "blacklevel.png")
  notes: Upload via HTTP POST to /api/image/processing/blacklevel/file/transfer

- id: enable_blacklevel_file
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

# --- Optics (shutter) ---
- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"}}'
  params:
    - name: target
      type: string
      description: '"Open" or "Closed"'

# --- DMX ---
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"}}'
  params:
    - name: mode
      type: string
      description: DMX mode name (basic exposes 2 channels; extended exposes more)

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}}}'
  params:
    - name: channel
      type: integer
      description: DMX start channel [1..512]

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean

# --- System state toggles ---
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

# --- Image color management ---
- id: color_copy_preset_to_custom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_reset_preset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_reset_to_native
  label: Reset Color To Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_next_rgb_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# --- Authentication / session ---
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (e.g. 98765) to raise access level
  notes: Optional; only needed for higher-than-end-user access.

# --- LED control ---
- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer
      description: Blink period

# --- Firmware ---
- id: firmware_schedule_upgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the next reboot.

# --- Generic JSON-RPC methods (queries / introspection / listing) ---
- id: get_property
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "system.state", "image.brightness")

- id: get_properties
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property-name strings

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: Returns array of source names (varies by model).

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
  params:
    - name: name
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. "DisplayPort 1" -> "displayport1")

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty = everything)

- id: introspect_nonrecursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Lists only immediate child object names (one level)

- id: get_environment_controlblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: '"Sensor","Filter","Controller","Actuator","Alarm","GenericBlock"'
    - name: valuetype
      type: string
      description: '"Temperature","Speed","PWM","Voltage","Current","Power","Altitude","Pressure","Humidity","ADC","Coordinate","Peltier","Waveform","Average","Delay","Difference","Interpolation","Limit","Median","Noise","Weighting","Comparison","Threshold","Formula","Driver","PID","Mode","State","Pump","Resistance","Simulation","Constant","Manual","Range","Any"'

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns severity, timestamp, source, description, custommessage per alarm.

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: list_firmware_version_status
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns name, available/running versions, status ("Unknown","OK","Upgradable").

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

# --- Subscription management ---
- id: subscribe_property
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: unsubscribe_property
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: subscribe_signal
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated") or array of signal names

- id: unsubscribe_signal
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

# --- HTTP file endpoints (base URL http://<projector-ip>/api/...) ---
# UNRESOLVED: projector IP address is per-installation, not stated as a default.
```

## Feedbacks
```yaml
- id: projector_state
  type: enum
  property: system.state
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  notify: property.changed

- id: illumination_state
  type: enum
  property: illumination.state
  values: ["On", "Off"]
  notify: property.changed

- id: laser_power
  type: number
  property: illumination.sources.laser.power
  unit: percent
  notify: property.changed

- id: laser_min_power
  type: number
  property: illumination.sources.laser.minpower
  unit: percent
  access: read-only

- id: laser_max_power
  type: number
  property: illumination.sources.laser.maxpower
  unit: percent
  access: read-only

- id: active_source
  type: string
  property: image.window.main.source
  notify: property.changed
  notes: Two notifications fire on a switch (deselect old, then select new).

- id: brightness
  type: number
  property: image.brightness
  notify: property.changed

- id: contrast
  type: number
  property: image.contrast

- id: saturation
  type: number
  property: image.saturation

- id: gamma
  type: number
  property: image.gamma

- id: sharpness
  type: integer
  property: image.sharpness

- id: shutter_position
  type: enum
  property: optics.shutter.position
  values: ["Open", "Closed"]

- id: zoom_position
  type: integer
  property: optics.zoom.position

- id: focus_position
  type: integer
  property: optics.focus.position

- id: lensshift_horizontal
  type: integer
  property: optics.lensshift.horizontal.position

- id: lensshift_vertical
  type: integer
  property: optics.lensshift.vertical.position

- id: network_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: alarm_state
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: connector_detected_signal
  type: object
  property: image.connector.{name}.detectedsignal
  fields: [active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode]
  notify: property.changed
  notes: name = connector name lowercased, non-word chars removed (e.g. "l1hdmi").

# UNRESOLVED: full set of environment sensor keys (temperature/fan/voltage) is
# dynamic and device-specific; retrieve at runtime via environment.getcontrolblocks.
```

## Variables
```yaml
# Settable parameters expressed as numeric/enum ranges (already covered by Actions
# above). Listed here for controller/UI binding.
- id: brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step: 1
  precision: 0.01

- id: contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01

- id: gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step: 1
  precision: 0.1

- id: saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step: 1
  precision: 0.01

- id: sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  # min/max are dynamic (minpower/maxpower properties) - read at runtime
  unit: percent

- id: window_position
  property: image.window.main.position
  type: object
  fields: [x (int), y (int)]

- id: window_size
  property: image.window.main.size
  type: object
  fields: [width (int), height (int)]

- id: window_scaling_mode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: Unsolicited notification when a subscribed property value changes. Carries an array of {property: value} pairs. No request id; no response must be returned.
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<name>":<value>}]}}'

- id: signal_callback
  method: signal.callback
  description: Unsolicited notification when a subscribed signal fires. Carries an array of {signal: {args}} pairs.
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<signal>":{"arg1":<val>}}]}}'

- id: model_updated
  signal: modelupdated
  description: Fires when the object structure changes (objects added/removed). Subscribe via signal.subscribe with signal "modelupdated". Callback delivers introspect.objectchanged with {object, newobject}.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences are documented as named macros
# in the source. The warp/blend/black-level upload+select+enable flows are
# procedural in the programmers guide but not packaged as single commands.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: system.poweron
    note: "Source recommends verifying state is standby or ready before issuing; no-op if already on or transitioning."
  - command: system.poweroff
    note: "Source recommends verifying state is on before issuing; no-op if already off or transitioning."
# UNRESOLVED: no formal power-on sequencing, thermal interlock thresholds, or
# lamp/laser safety lockout procedures stated in the source. ECO wake procedure
# is described but no interlock constraints are given.
```

## Notes
- **API nature:** Pulse is a JSON-RPC 2.0 API. The same command set works identically over TCP:9090 and RS-232 serial (19200/8N1/no flow control).
- **Serial cable:** Standard 9-pin, female to host / male to projector. Pin 2→2, 3→3, 5→5 (straight-through, not null-modem).
- **Parameter passing:** All RPC params are passed by name; order does not matter.
- **Property.set pacing:** Wait for the confirmation before re-setting the same property; flooding the server degrades performance.
- **Notifications:** Subscribing does not return the current value — use `property.get` for the current value. Notifications only fire on actual value change. Source switching fires two notifications (old deselected, then new selected).
- **Source/connector object naming:** Translate display names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1") to derive object names used in `image.source.<name>.listconnectors` and `image.connector.<name>.detectedsignal`.
- **File transfer:** Warp grids, blend masks, and black-level masks are uploaded via HTTP POST (multipart `file=@`) to `/api/<...>/file/transfer` and downloaded via browser/curl GET. Masks are grayscale (blue channel used if RGB); PNG up to 16-bit, JPEG, TIFF supported. Warp file format matches MCM500/400.
- **API is dynamic:** Availability of objects/properties depends on device configuration (e.g. motorized lens, DMX extended mode). Use `introspect` at runtime for the exact API surface.
- **HTTP base URL:** `http://<projector-ip>/api/...` — the projector IP is per-installation and is not given a fixed default in the source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: projector default IP address not stated -->
<!-- UNRESOLVED: exact environment sensor key set is device-specific (query at runtime) -->
<!-- UNRESOLVED: connector set beyond the documented examples is model-dependent -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:14:38.622Z
last_checked_at: 2026-08-05T08:00:21.999Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:00:21.999Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec action units match source commands literally; transport values (port 9090, 19200/8N1) verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Pulse API catalog; exact property/connector availability varies per device configuration and must be confirmed via runtime introspection. Firmware version compatibility not stated."
- "projector IP address is per-installation, not stated as a default."
- "full set of environment sensor keys (temperature/fan/voltage) is"
- "no explicit multi-step sequences are documented as named macros"
- "no formal power-on sequencing, thermal interlock thresholds, or"
- "firmware version compatibility not stated in source"
- "projector default IP address not stated"
- "exact environment sensor key set is device-specific (query at runtime)"
- "connector set beyond the documented examples is model-dependent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
