---
spec_id: admin/barco-b-lens-hc-138-dc4k-hc-146-210
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco B Lens Hc 138 Dc4K Hc 146 210 Control Spec"
manufacturer: Barco
model_family: "Barco B Lens Hc 138 Dc4K Hc 146 210"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco B Lens Hc 138 Dc4K Hc 146 210"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:42:35.571Z
last_checked_at: 2026-07-21T21:13:37.224Z
generated_at: 2026-07-21T21:13:37.224Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model variants and firmware compatibility not stated in source. The API is the generic Pulse API and parts are dynamic/per-configuration (see Notes)."
  - "full enumeration of every environment sensor key is dynamic per model."
  - "no multi-step sequences explicitly described as macros in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "exact projector model variants covered by this entity not specified beyond the family name."
  - "full enumeration of environment sensor keys is dynamic per model/config."
  - "voltage/current/power specifications not stated in source."
  - "protocol/firmware version compatibility ranges not stated."
  - "authenticate passcode value(s) not documented (example only)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:13:37.224Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched to source with literal wire tokens; transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco B Lens Hc 138 Dc4K Hc 146 210 Control Spec

## Summary
Barco Pulse projector (B Lens Hc 138 Dc4K / Hc 146 210 series) controlled via the Pulse JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200 baud). The API exposes power control, source selection, illumination/laser power, image picture settings, lens optics (zoom/focus/lensshift/shutter), warp/blend/black-level file management, DMX, environment monitoring, and firmware management. File transfers use HTTP endpoints under `/api/`.

<!-- UNRESOLVED: exact projector model variants and firmware compatibility not stated in source. The API is the generic Pulse API and parts are dynamic/per-configuration (see Notes). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{host}/api"  # HTTP file endpoints (warp/blend/blacklevel upload+download)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "9-pin male on projector; pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  type: none  # inferred: auth optional for normal end-user access (source: "Authentication is only necessary when a higher level than normal end user is required")
  # Elevated access uses the JSON-RPC "authenticate" method with a passcode (see Actions).
```

## Traits
```yaml
traits:
  - powerable      # inferred from system.poweron / system.poweroff commands
  - queryable      # inferred from property.get query commands
  - routable       # inferred from image.window.main.source routing commands
  - levelable      # inferred from image.brightness/contrast/etc. and illumination power control
```

## Actions
```yaml
# JSON-RPC 2.0 methods documented in the Pulse API. Each carries its literal payload.
# Request id is omitted from command templates (caller assigns); "jsonrpc":"2.0" shown verbatim.

actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
    params: []
    notes: "No-op if already on or transitioning. Verify system.state is standby/ready first."

  - id: power_off
    label: Power Off
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
    params: []
    notes: "No-op if already off or transitioning. Verify system.state is on first."

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ":POWR1\r"
    params: []
    notes: "ASCII string sent on RS-232 to wake a projector in ECO mode. Alternatives: Wake-on-LAN (MAC), remote/keypad power button."

  # --- Authentication ---
  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
    params:
      - name: code
        type: integer
        description: Secret passcode setting the user access level.
    notes: "Only required for higher-than-normal end-user access. Response result is true on success."

  # --- Generic property/signal API methods ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
    params:
      - name: property
        type: string
        description: Property name in dot notation (see Variables for settable properties).
      - name: value
        type: any
        description: Value to set (type depends on property).
    notes: "Wait for confirmation before setting the same property again (flooding degrades performance)."

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names to read multiple at once.

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names.

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names.

  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/"") introspects everything.
      - name: recursive
        type: boolean
        description: "true (default): full metadata; false: list object names one level only."

  # --- Sources / connectors ---
  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
    params: []
    notes: "Returns array of source names, e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI. Varies by model."

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
    params: []
    notes: "Returns array of physical connector names. Varies by model."

  - id: image_source_listconnectors
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors"}'
    params:
      - name: sourceobject
        type: string
        description: "Source object name: source name with non-word chars removed, lowercased (e.g. 'DisplayPort 1' -> 'displayport1')."
    notes: "Returns array of connector info {gridposition:{row,column,plane}, name}."

  # --- Illumination ---
  - id: illumination_clo_engage
    label: Engage CLO
    kind: action
    command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
    params: []
    notes: "Engage Constant Light Output at the current light level."

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
    params: []
    notes: "Returns laser serial number string."

  # --- Environment ---
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
    params:
      - name: type
        type: string
        description: "Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
      - name: valuetype
        type: string
        description: "Value type enum: Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode."
    notes: "Returns dictionary of sensor-name -> reading (e.g. fan tacho speeds, temperatures, voltages)."

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
    params: []
    notes: "Returns array of {severity, timestamp, source, description, custommessage}."

  # --- DMX ---
  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
    params: []
    notes: "Returns array of available channel names."

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
    params: []
    notes: "Returns array of all modes."

  # --- Firmware ---
  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
    params: []
    notes: "Returns array of managed firmware component names."

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
    params: []
    notes: "Returns array of {name, versions:{available, running}, status} where status enum is Unknown, OK, Upgradable."

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
    params: []
    notes: "Force a component upgrade at the following reboot."

  # --- Color management ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to reset to defaults.

  - id: image_color_p7_custom_resettonative
    label: Reset Color To Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: "Cycle to the next RGB mode through all possible modes."

  # --- File endpoints (HTTP) ---
  - id: file_upload_warp
    label: Upload Warp Grid File
    kind: action
    command: "curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer"
    params:
      - name: host
        type: string
        description: Projector IP address.
      - name: filename
        type: string
        description: Local warp grid file (MCM500/400 format).

  - id: file_upload_blend
    label: Upload Blend Mask
    kind: action
    command: "curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer"
    params:
      - name: host
        type: string
        description: Projector IP address.
      - name: filename
        type: string
        description: Grayscale blend mask (PNG up to 16-bit / JPEG / TIFF). Blue channel used if color.

  - id: file_upload_blacklevel
    label: Upload Black Level Mask
    kind: action
    command: "curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer"
    params:
      - name: host
        type: string
        description: Projector IP address.
      - name: filename
        type: string
        description: Grayscale black level mask (PNG up to 16-bit / JPEG / TIFF).

  - id: file_download
    label: Download File Endpoint
    kind: query
    command: "http://{host}/api/{endpoint}"
    params:
      - name: host
        type: string
        description: Projector IP address.
      - name: endpoint
        type: string
        description: "File endpoint path, e.g. image/processing/warp/file/transfer (optionally append /{filename})."
    notes: "GET triggers a download. Not all endpoints support downloading the current file; some require a filename."
```

## Feedbacks
```yaml
feedbacks:
  # Notifications are delivered via the client-implemented "property.changed" and
  # "signal.callback" JSON-RPC methods (no id; no response returned).
  - id: property_changed
    type: notification
    method: property.changed
    description: "Unsolicited notification; params.property is an array of {objectname.propertyname: value} pairs."

  - id: signal_callback
    type: notification
    method: signal.callback
    description: "Unsolicited notification; params.signal is an array of {objectname.signalname: {args}} pairs."

  - id: modelupdated_signal
    type: signal
    name: modelupdated
    description: "Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe."

  - id: system_state
    type: enum
    property: system.state
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    description: "Current operation state. Observable via property.subscribe / property.changed."

  - id: illumination_state
    type: enum
    property: illumination.state
    values: [On, Off]

  - id: illumination_sources_laser_power
    type: number
    property: illumination.sources.laser.power

  - id: illumination_sources_laser_minpower
    type: number
    property: illumination.sources.laser.minpower
    access: read-only

  - id: illumination_sources_laser_maxpower
    type: number
    property: illumination.sources.laser.maxpower
    access: read-only

  - id: active_source
    type: string
    property: image.window.main.source
    notes: "Two notifications delivered on switch: first the deselected (empty) then the new source."

  - id: connector_detectedsignal
    type: object
    property: image.connector.{connectorobject}.detectedsignal
    description: "Signal info: active, name, vertical/horizontal totals & resolutions, sync/porch timings, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode."

  - id: environment_alarmstate
    type: enum
    property: environment.alarmstate
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: network_device_lan_state
    type: enum
    property: network.device.lan.state
    values: [CONNECTED, DISCONNECTED]

  # environment.getcontrolblocks readings (Temperature/Speed/Voltage/etc.) are
  # available as dictionary keys; subscribe per-key for change notifications.
  # UNRESOLVED: full enumeration of every environment sensor key is dynamic per model.
```

## Variables
```yaml
# All settable via property.set; readable via property.get; observable via property.subscribe.
variables:
  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    unit: percent
    description: Target laser power in percent.

  - id: image_window_main_source
    property: image.window.main.source
    type: string
    description: "Active source name (from image.source.list, e.g. DisplayPort 1, HDMI, DVI 1)."

  - id: image_window_main_position
    property: image.window.main.position
    type: object
    fields: {x: int, y: int}

  - id: image_window_main_size
    property: image.window.main.size
    type: object
    fields: {width: int, height: int}

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: "Normalized offset; 0 default, 1 = 100% offset."

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: "Normalized gain; 1 default."

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: "Default 2.2."

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: "Normalized; 1 default."

  - id: image_sharpness
    property: image.sharpness
    type: int
    min: -2
    max: 8
    step_size: 1
    precision: 1

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    description: Enable/disable all warp functions.

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    description: Enable/disable file warp.

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    description: Currently selected warp file.

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    items: string
    description: Currently selected blend files.

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string

  - id: optics_shutter_position
    property: optics.shutter.position
    type: enum
    values: [Open, Closed]

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]

  - id: optics_zoom_position
    property: optics.zoom.position
    type: int

  - id: optics_focus_position
    property: optics.focus.position
    type: int

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: int

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: int

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    notes: "Enable/disable standby state. Check availability first."

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    notes: "Enable/disable ECO state. Check availability first."

  - id: dmx_mode
    property: dmx.mode
    type: string
    description: Current DMX mode (basic exposes 2 channels; extended exposes more).

  - id: dmx_startchannel
    property: dmx.startchannel
    type: int
    description: DMX start channel [1..512].

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean

  - id: network_device_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    fields: {Address: string, Mask: string, Gateway: string, NameServers: string}
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Unsolicited; array of property/value pairs. No id, no response to return."

  - id: signal_callback
    method: signal.callback
    description: "Unsolicited; array of signal/argument-list pairs. No id, no response to return."

  - id: modelupdated
    method: signal via signal.callback
    description: "Object structure changed (objects added/removed). Callback arg {object, newobject}."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on: verify system.state is standby or ready first; no-op if already on or transitioning."
  - "Power off: verify system.state is on first; no-op if already off or transitioning."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the power state verification notes above.
```

## Notes
- The Pulse API is JSON-RPC 2.0. Request `id` is a string or number assigned by the caller; notifications (property.changed, signal.callback) carry no `id` and must not be answered.
- Parameter order in `params` does not matter (named parameters).
- "It is best practice to wait for the confirmation of property.set before setting the same property again" — flooding the server degrades performance.
- Source-switch notifications deliver twice: first the deselected source (empty string), then the newly selected source.
- The API is partly dynamic and configuration-dependent (e.g. motorized lens features, DMX channel count in extended mode). The canonical method to discover a specific projector's exact API is `introspect` (recursive).
- File upload uses HTTP POST multipart (`-F file=@...`); `-X POST` is implied and may be omitted. Warp grid format matches MCM500/400.
- Blend/black-level masks: grayscale 8- or 16-bit; supported formats PNG (up to 16-bit), JPEG, TIFF. Color images accepted but only the blue channel is used. Mask size must match the projector's blend/black-level layer resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).
- Source/connector object names are derived by stripping non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").

<!-- UNRESOLVED: exact projector model variants covered by this entity not specified beyond the family name. -->
<!-- UNRESOLVED: full enumeration of environment sensor keys is dynamic per model/config. -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source. -->
<!-- UNRESOLVED: protocol/firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: authenticate passcode value(s) not documented (example only). -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:42:35.571Z
last_checked_at: 2026-07-21T21:13:37.224Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:13:37.224Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched to source with literal wire tokens; transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model variants and firmware compatibility not stated in source. The API is the generic Pulse API and parts are dynamic/per-configuration (see Notes)."
- "full enumeration of every environment sensor key is dynamic per model."
- "no multi-step sequences explicitly described as macros in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "exact projector model variants covered by this entity not specified beyond the family name."
- "full enumeration of environment sensor keys is dynamic per model/config."
- "voltage/current/power specifications not stated in source."
- "protocol/firmware version compatibility ranges not stated."
- "authenticate passcode value(s) not documented (example only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
