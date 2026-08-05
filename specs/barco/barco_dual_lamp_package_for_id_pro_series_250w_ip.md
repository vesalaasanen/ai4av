---
spec_id: admin/barco-dual-lamp-package-for-id-pro-series-250w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Dual Lamp Package For ID Pro Series 250W Control Spec"
manufacturer: Barco
model_family: "Dual Lamp Package For ID Pro Series 250W"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Dual Lamp Package For ID Pro Series 250W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:24:55.685Z
last_checked_at: 2026-08-05T07:28:05.614Z
generated_at: 2026-08-05T07:28:05.614Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Pulse API catalog; exact API subset for this specific lamp-based model (vs. laser examples shown) must be confirmed via introspection on the device. Illumination source type (laser vs lamp) in examples is laser; verify lamp-object names on this model."
  - "read/write access not explicitly stated for ip4config"
  - "no explicit multi-step named sequences documented in source."
  - "no explicit safety interlock procedures or power-on sequencing warnings documented beyond operational good-practice notes."
  - "firmware version compatibility not stated in source."
  - "illumination source object name for this specific dual-lamp 250W model not confirmed (examples use laser); introspection required on device."
  - "exact transport framing/line-terminator for JSON-RPC over RS-232 not specified (TCP framing also not specified)."
  - "Wake-on-LAN packet format and HTTP file-transfer auth not specified."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:28:05.614Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 action units match documented commands, transport values are supported, and the source catalogue is represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Dual Lamp Package For ID Pro Series 250W Control Spec

## Summary
Barco Pulse-family projector (ID Pro Series, Dual Lamp 250W package) controlled via the Pulse API, a JSON-RPC 2.0 interface available over TCP/IP (port 9090) and RS-232 serial. The API exposes power control, input/source selection, image and illumination properties, optics (shutter/zoom/focus/lens shift), warping/blending/black-level file management, DMX, environment telemetry (temperatures, fan speeds, alarms) and firmware management. A serial ECO-mode wake command (`:POWR1\r`) and HTTP file-transfer endpoints are also documented.

<!-- UNRESOLVED: source is the generic Pulse API catalog; exact API subset for this specific lamp-based model (vs. laser examples shown) must be confirmed via introspection on the device. Illumination source type (laser vs lamp) in examples is laser; verify lamp-object names on this model. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: http://{projector_ip}/api  # for HTTP file transfer endpoints (warp/blend/blacklevel upload+download)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # optional: authenticate method with secret passcode; required only for elevated access levels. Normal end-user access skips auth.
  # auth is optional per source ("Authentication is only necessary when a higher level than normal end user is required")
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff commands present
  - queryable    # inferred: property.get + list/query methods present
  - routable     # inferred: source selection (image.window.main.source) present
  - levelable    # inferred: brightness/contrast/gamma/saturation/sharpness/laser-power present
```

## Actions
```yaml
actions:
  # --- Power / state ---
  - id: power_on
    label: Power On
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: Verify system.state is "standby" or "ready" first. No-op if already on or transitioning.

  - id: power_off
    label: Power Off
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: Verify system.state is "on" first. No-op if already off or transitioning.

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII sequence sent over RS-232 to wake a projector in ECO mode. Alternative wake methods: Wake-on-LAN (MAC address), remote power button, keypad power button.

  # --- Authentication ---
  - id: authenticate
    label: Authenticate (Elevated Access)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
    params:
      - name: code
        type: integer
        description: Secret pass code setting the user access level.
    notes: Optional. Only required for access levels above normal end user.

  # --- Generic property/signal API (parameterized) ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property path in dot notation (e.g. "image.brightness").
      - name: value
        type: any
        description: Value to set (type depends on the property).
    notes: Wait for confirmation before re-setting the same property (avoid flooding server).

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property path, or array of property paths for batch read.

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Single property path or array of property paths.

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Single property path or array of property paths.

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
    params:
      - name: signal
        type: string
        description: Single signal name or array of signal names (e.g. "modelupdated").

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
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/"") introspects everything.
      - name: recursive
        type: boolean
        description: If false, only immediate object names are listed (one level). Default true.

  # --- LED ---
  - id: led_blink
    label: LED Blink
    kind: action
    command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
    params:
      - name: led
        type: string
        description: LED identifier (e.g. "systemstatus").
      - name: color
        type: string
        description: LED color (e.g. "red").
      - name: period
        type: integer
        description: Blink period.

  # --- Sources / connectors ---
  - id: list_sources
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
    params: []
    notes: Returns array of source names; contents vary by projector model. Example values: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI.

  - id: list_connectors
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
    params: []

  - id: source_listconnectors
    label: List Connectors For Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{objectname}.listconnectors","id":4}'
    params:
      - name: objectname
        type: string
        description: Source object name = source name with non-word chars removed and lowercased (e.g. "DisplayPort 1" -> "displayport1").
    notes: Returns array of {gridposition:{row,column,plane}, name}.

  # --- Environment ---
  - id: environment_getcontrolblocks
    label: Get Environment Sensor Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":18}'
    params:
      - name: type
        type: string
        description: Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
      - name: valuetype
        type: string
        description: Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.
    notes: Returns dictionary of sensor-name -> reading (e.g. temperatures in degC, fan tacho in rpm).

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []
    notes: Returns array of {severity, timestamp, source, description, custommessage}.

  # --- DMX ---
  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
    params: []
    notes: Returns list of available channel names.

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
    params: []
    notes: Returns list of all modes.

  # --- Firmware ---
  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
    params: []
    notes: Returns names of all managed firmware components.

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []
    notes: Returns array of {name, versions:{available, running}, status}. status enum: Unknown, OK, Upgradable.

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces a component upgrade at the next reboot.

  # --- Illumination ---
  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []
    notes: Engages CLO at the current light level.

  - id: illumination_laser_getserialnumber
    label: Get Illumination Source Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []
    notes: Method name shown for laser source; object name differs by illumination source type. Returns value string.

  # --- Color management ---
  - id: color_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: color_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset.

  - id: color_resettonative
    label: Reset Color To Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: rgbmode_next
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles to the next RGB mode.
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
    values: ["On", "Off"]
    property: illumination.state

  - id: active_source
    type: string
    property: image.window.main.source

  - id: illumination_power
    type: float
    property: illumination.sources.laser.power

  - id: illumination_minpower
    type: float
    property: illumination.sources.laser.minpower

  - id: illumination_maxpower
    type: float
    property: illumination.sources.laser.maxpower

  - id: environment_alarmstate
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: network_device_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: connector_detectedsignal
    type: object
    property: image.connector.{objectname}.detectedsignal
    notes: Returns {active, name, vertical_total, horizontal_total, resolutions, porches, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range (0-255|16-235), chroma_sampling (4:4:4|4:2:2|4:2:0), gamma_type (POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode}.
```

## Variables
```yaml
variables:
  # --- Image picture settings ---
  - name: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    access: RW
    description: Image brightness/offset. Normalized; 0 default, 1 = 100% offset.

  - name: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    access: RW
    description: Image contrast/gain. Normalized; 1 default.

  - name: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    access: RW
    description: Image gamma. Default 2.2.

  - name: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    access: RW
    description: Image color saturation. Normalized; 1 default.

  - name: image.sharpness
    type: integer
    min: -2
    max: 8
    step_size: 1
    precision: 1
    access: RW
    description: Image sharpness. Normalized.

  - name: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    access: RW

  # --- Window ---
  - name: image.window.main.source
    type: string
    access: RW
    description: Source displayed in main window (use value from image.source.list).

  - name: image.window.main.position
    type: object
    fields: {x: integer, y: integer}
    access: RW

  - name: image.window.main.size
    type: object
    fields: {width: integer, height: integer}
    access: RW

  - name: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    access: RW

  # --- Illumination ---
  - name: illumination.sources.laser.power
    type: float
    access: RW
    description: Target illumination power in percent. Object name varies by source type (laser/LED/lamp).

  # --- Optics ---
  - name: optics.shutter.position
    type: enum
    values: [Open, Closed]
    access: RW

  - name: optics.shutter.target
    type: enum
    values: [Open, Closed]
    access: RW

  - name: optics.zoom.position
    type: integer
    access: RW

  - name: optics.focus.position
    type: integer
    access: RW

  - name: optics.lensshift.horizontal.position
    type: integer
    access: RW

  - name: optics.lensshift.vertical.position
    type: integer
    access: RW

  # --- Processing files ---
  - name: image.processing.warp.enable
    type: boolean
    access: RW
    description: Enable/disable all warp functions.

  - name: image.processing.warp.file.enable
    type: boolean
    access: RW
    description: Enable/disable file warp.

  - name: image.processing.warp.file.selected
    type: string
    access: RW
    description: Currently selected warp file.

  - name: image.processing.blend.file.enable
    type: boolean
    access: RW

  - name: image.processing.blend.file.selected
    type: array
    items: string
    access: RW

  - name: image.processing.blacklevel.file.enable
    type: boolean
    access: RW

  - name: image.processing.blacklevel.file.selected
    type: string
    access: RW

  # --- DMX ---
  - name: dmx.mode
    type: string
    access: RW

  - name: dmx.startchannel
    type: integer
    min: 1
    max: 512
    access: RW

  - name: dmx.shutdown
    type: boolean
    access: RW

  # --- System state enables ---
  - name: system.standby.enable
    type: boolean
    access: RW
    notes: Check availability first.

  - name: system.eco.enable
    type: boolean
    access: RW
    notes: Check availability first.

  # --- Network config ---
  - name: network.device.lan.ip4config
    type: object
    fields: {Address: string, Mask: string, Gateway: string, NameServers: string}
    access: RW  # UNRESOLVED: read/write access not explicitly stated for ip4config
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification when a subscribed property value changes. No response must be returned.
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":<value>}]}}'

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification when a subscribed signal is emitted. No response must be returned.
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{<args>}}]}}'

  - id: modelupdated
    method: modelupdated
    description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe. Introspection objects deliver introspect.objectchanged callbacks with {object, newobject} where newobject true=added, false=removed.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on: "Good practice to verify system.state is standby or ready before issuing power on; no-op if already on or transitioning."
  - power_off: "Good practice to verify system.state is on before issuing power off; no-op if already off or transitioning."
  - property_set: "Wait for confirmation of property.set before setting the same property again; flooding may reduce performance."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing warnings documented beyond operational good-practice notes.
```

## Notes
- API is JSON-RPC 2.0. Request `id` is client-chosen (string or number); notifications (property.changed, signal.callback) carry no `id` and must not be answered.
- The same command set is available over both TCP/IP (port 9090) and RS-232 serial (19200 8N1, no flow control). Connection type does not change available commands.
- Object/property naming is dot notation, lowercase, JavaScript-like (e.g. `tempctrl.fans.mainfan.rpm`). When more than one object of a kind exists, they are suffixed (`.motor1`, `.motor2`).
- Source-name to object-name translation: strip non-word characters and lowercase (e.g. `DisplayPort 1` -> `displayport1`). Same rule applies to connector names.
- Best way to determine the exact API for a specific projector/config is runtime introspection (the `introspect` method). The documented catalog may be incomplete for a given model/peripheral combination.
- HTTP file endpoints (warp/blend/blacklevel upload+download) use base `http://{projector_ip}/api/...`. Upload via HTTP POST multipart (`curl -F file=@<file>`). Warp file format is same as MCM500/400.
- Blend/black-level masks: grayscale PNG (up to 16-bit), JPEG, or TIFF; color images accepted but only the blue channel is used. Mask resolution depends on projector resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: illumination source object name for this specific dual-lamp 250W model not confirmed (examples use laser); introspection required on device. -->
<!-- UNRESOLVED: exact transport framing/line-terminator for JSON-RPC over RS-232 not specified (TCP framing also not specified). -->
<!-- UNRESOLVED: Wake-on-LAN packet format and HTTP file-transfer auth not specified. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:24:55.685Z
last_checked_at: 2026-08-05T07:28:05.614Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:28:05.614Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 action units match documented commands, transport values are supported, and the source catalogue is represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Pulse API catalog; exact API subset for this specific lamp-based model (vs. laser examples shown) must be confirmed via introspection on the device. Illumination source type (laser vs lamp) in examples is laser; verify lamp-object names on this model."
- "read/write access not explicitly stated for ip4config"
- "no explicit multi-step named sequences documented in source."
- "no explicit safety interlock procedures or power-on sequencing warnings documented beyond operational good-practice notes."
- "firmware version compatibility not stated in source."
- "illumination source object name for this specific dual-lamp 250W model not confirmed (examples use laser); introspection required on device."
- "exact transport framing/line-terminator for JSON-RPC over RS-232 not specified (TCP framing also not specified)."
- "Wake-on-LAN packet format and HTTP file-transfer auth not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
