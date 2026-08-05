---
spec_id: admin/barco-b-lens-hc-dc4k-146-210
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco B Lens Hc Dc4K 146 210 Control Spec"
manufacturer: Barco
model_family: "Barco B Lens Hc Dc4K 146 210"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco B Lens Hc Dc4K 146 210"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:39:34.428Z
last_checked_at: 2026-07-21T21:13:39.283Z
generated_at: 2026-07-21T21:13:39.283Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact model variant spelling not confirmed against vendor product page"
  - "actual passcode value not stated in source (example shows code 98765)"
  - "min/max range dynamic, not statically stated in source"
  - "optics.zoom.position / focus.position / lensshift.*.position are"
  - "source documents no explicit named multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility ranges not stated in source"
  - "voltage/current/power specs not stated in source"
  - "protocol version number not stated in source"
  - "laser power min/max static ranges not stated (dynamic per lens/lensshift)"
  - "actual auth passcode not stated (example value 98765)"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:13:39.283Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source JSON-RPC methods and serial command; all transport parameters verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco B Lens Hc Dc4K 146 210 Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 "Pulse API". Connect over TCP/IP (port 9090) or RS-232 serial (19200 baud). Supports power control, source selection, illumination/laser power, picture settings, lens optics (zoom/focus/shift/shutter), warping, blending, black-level masks, DMX, environment sensors, firmware management, and introspection.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model variant spelling not confirmed against vendor product page -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: "http://{projector_ip}/api"  # file transfer endpoints; projector IP not fixed in source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "9-pin female (host) to 9-pin male (projector); pin2-pin2, pin3-pin3, pin5-pin5"
auth:
  type: secret_code  # source documents an "authenticate" method with a passcode
  # UNRESOLVED: actual passcode value not stated in source (example shows code 98765)
  # Source: authentication only required for access levels above normal end-user;
  # may be skipped for normal end-user access.
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: many property.get / *.list query examples
  - levelable    # inferred: brightness, contrast, laser power settable
  - routable     # inferred: image.window.main.source selection present
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP/serial. All methods carry command verbatim per source.
# ECO-wake uses a distinct ASCII serial command outside the JSON-RPC service.

actions:
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: "Returns null. No-op if already on or transitioning. Best practice: verify system.state is standby or ready first."

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: "Returns null. No-op if already off or transitioning. Best practice: verify system.state is on first."

  - id: authenticate
    label: Authenticate Session
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
    params:
      - name: code
        type: integer
        description: Secret passcode. Example value 98765 shown in source; real value UNRESOLVED.
    notes: "Sets user access level. Only required for access above normal end-user; may be skipped otherwise."

  - id: property_set
    label: Set Property Value
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{objectname.propertyname}","value":{value}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (see Variables for settable properties).
      - name: value
        type: any
        description: Value matching the property type.
    notes: "Wait for confirmation before re-setting same property; flooding degrades performance."

  - id: property_get
    label: Get Property Value
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{objectname.propertyname}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name.

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property_or_array}"}}'
    params:
      - name: property
        type: string
        description: Single property name or array of property names.

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property_or_array}"}}'
    params:
      - name: property
        type: string
        description: Single property name or array of property names.

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal_or_array}"}}'
    params:
      - name: signal
        type: string
        description: Single signal name (e.g. modelupdated) or array of signal names.

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal_or_array}"}}'
    params:
      - name: signal
        type: string
        description: Single signal name or array of signal names.

  - id: introspect
    label: Introspect Object Metadata
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{name}","recursive":true}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty introspects everything.
      - name: recursive
        type: boolean
        description: If false, only one level of object names is listed. Default true.

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list"}'
    params: []
    notes: "Result example: [DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI]. Varies by model."

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
    params: []
    notes: "Result example: [DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI]. Varies by model."

  - id: image_source_listconnectors
    label: List Connectors For Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name (source name with non-word chars removed, lowercased, e.g. displayport1).

  - id: environment_getcontrolblocks
    label: Get Environment Sensor Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{Sensor}","valuetype":"{Temperature}"}}'
    params:
      - name: type
        type: string
        description: 'Block type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.'
      - name: valuetype
        type: string
        description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.'

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
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []
    notes: 'Returns components with {name, versions:{available, running}, status}. Status enum: Unknown, OK, Upgradable.'

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: "Forces a component upgrade at next reboot."

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
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset To Defaults
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string

  - id: image_color_p7_custom_resettonative
    label: Reset Color To Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Cycle To Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: "Cycles through all possible RGB modes."

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
    params: []
    notes: "Returns array of available channel names."

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
    params: []
    notes: "Returns array of all modes."

  - id: eco_wake_serial
    label: Wake From ECO Mode (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: "ASCII serial command to wake a projector in ECO/power-save mode over RS-232. Alternative ECO wake methods: wake-on-LAN (MAC address), remote power button, keypad power button."
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    property: system.state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    notes: "boot=booting, eco=power save, standby, ready, conditioning=warming up, on, deconditioning=cooling down."

  - id: illumination_state
    property: illumination.state
    type: enum
    values: [On, Off]

  - id: illumination_laser_minpower
    property: illumination.sources.laser.minpower
    type: float
    notes: "Minimum power in percent. Read-only but dynamic."

  - id: illumination_laser_maxpower
    property: illumination.sources.laser.maxpower
    type: float
    notes: "Maximum power in percent. Read-only but dynamic."

  - id: active_source
    property: image.window.main.source
    type: string
    notes: "Two property.changed notifications delivered on switch (deselect then select)."

  - id: connector_detectedsignal
    property: image.connector.{name}.detectedsignal
    type: object
    notes: 'Fields: active(bool), name(string), vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, sync timings, horizontal_frequency, vertical_frequency, pixel_rate, scan(enum), bits_per_component, color_space(enum), signal_range(0-255|16-235), chroma_sampling(4:4:4|4:2:2|4:2:0), gamma_type(POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries(REC709|REC2020|DCI-P3-D65|DCI-P3-Theater), mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.'

  - id: environment_alarmstate
    property: environment.alarmstate
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: network_device_lan_state
    property: network.device.lan.state
    type: enum
    values: [CONNECTED, DISCONNECTED]

  - id: network_device_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    notes: "Fields: Address, Mask, Gateway, NameServers."

  - id: optics_shutter_position
    property: optics.shutter.position
    type: enum
    values: [Open, Closed]

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer

  - id: optics_focus_position
    property: optics.focus.position
    type: integer

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer

  - id: illumination_sources_available
    via_method: introspect
    notes: "Available illumination sources (laser/LED/xenon/UHP) discovered by introspecting illumination object. Not statically enumerable."
```

## Variables
```yaml
variables:
  - id: illumination_laser_power
    property: illumination.sources.laser.power
    type: float
    access: RW
    description: "Target laser power in percent."
    # UNRESOLVED: min/max range dynamic, not statically stated in source

  - id: image_window_main_source
    property: image.window.main.source
    type: string
    access: RW
    description: "Active source displayed in main window."

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    access: RW
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: image_brightness
    property: image.brightness
    type: float
    access: RW
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: "Normalized brightness/offset; 0 default, 1 = 100% offset."

  - id: image_contrast
    property: image.contrast
    type: float
    access: RW
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: "Normalized contrast/gain; 1 default."

  - id: image_gamma
    property: image.gamma
    type: float
    access: RW
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: "Image gamma. Default 2.2."

  - id: image_saturation
    property: image.saturation
    type: float
    access: RW
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: "Normalized saturation; 1 default."

  - id: image_sharpness
    property: image.sharpness
    type: integer
    access: RW
    min: -2
    max: 8
    step_size: 1
    precision: 1

  - id: image_orientation
    property: image.orientation
    type: enum
    access: RW
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: RW
    description: "Globally enable/disable all warp functions."

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: RW
    description: "Enable/disable file warp."

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: RW
    description: "Currently selected warp grid file (upload via HTTP POST to /api/image/processing/warp/file/transfer)."

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: RW
    description: "Enable/disable file blend."

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    access: RW
    description: "Currently selected blend mask files (string array). Upload via HTTP POST to /api/image/processing/blend/file/transfer."

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: RW
    description: "Enable/disable black level correction."

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: RW
    description: "Currently selected black level mask. Upload via HTTP POST to /api/image/processing/blacklevel/file/transfer."

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: RW

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    access: RW
    description: "DMX start channel [1..512]."

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: RW

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: RW
    description: "Enable/disable use of standby state. Check availability first."

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: RW
    description: "Enable/disable use of ECO state. Check availability first."

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    access: RW
    values: [Open, Closed]

  # UNRESOLVED: optics.zoom.position / focus.position / lensshift.*.position are
  # documented as RW-capable positions but source does not give set ranges or
  # step sizes. They appear in Feedbacks as readable.
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Unsolicited notification. Client must implement this handler. Params: array of {property: value} pairs."
    example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"image.brightness":0.15}]}}'

  - id: signal_callback
    method: signal.callback
    description: "Unsolicited notification when a subscribed signal fires. Params: array of {signalname: {args}}."
    example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'

  - id: modelupdated_signal
    signal: modelupdated
    description: "Introspect signal. Triggers when object structure changes (objects added/removed). Subscribe via signal.subscribe."

  - id: introspect_objectchanged
    signal: introspect.objectchanged
    description: "Callback with {object, newobject:true|false} when objects added/lost."
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Source states: if projector already on (or transitioning), poweron is a no-op;
  if already off (or transitioning), poweroff is a no-op. Best practice: verify
  system.state before issuing power commands. ECO-mode wake requires wake-on-LAN,
  remote/keypad power, or the serial :POWR1 sequence.
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or mandated power-on sequencing beyond the state-check best-practice notes.
```

## Notes
- API is JSON-RPC 2.0 over both TCP (port 9090) and RS-232 (same command set for all connection types).
- Parts of the API are dynamic and depend on projector configuration/peripherals (e.g. motorized zoom lens, DMX extended mode). Exact API per device is best determined via the `introspect` method.
- File endpoints (warp grids, blend masks, black-level masks) use HTTP POST/GET under `http://{ip}/api/...`, separate from the JSON-RPC socket. Supported image formats: PNG (up to 16-bit), JPEG, TIFF; grayscale only (color images use blue channel).
- Warp grid file format is shared with MCM500/400.
- Blend/black-level mask resolution depends on projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).
- Authentication is optional for normal end-user access; only required to raise access level.
- Property.set should await confirmation before re-setting the same property to avoid flooding.
- ECO wake serial command `:POWR1\r` is the only documented non-JSON-RPC serial command.
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: laser power min/max static ranges not stated (dynamic per lens/lensshift) -->
<!-- UNRESOLVED: actual auth passcode not stated (example value 98765) -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:39:34.428Z
last_checked_at: 2026-07-21T21:13:39.283Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:13:39.283Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source JSON-RPC methods and serial command; all transport parameters verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact model variant spelling not confirmed against vendor product page"
- "actual passcode value not stated in source (example shows code 98765)"
- "min/max range dynamic, not statically stated in source"
- "optics.zoom.position / focus.position / lensshift.*.position are"
- "source documents no explicit named multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility ranges not stated in source"
- "voltage/current/power specs not stated in source"
- "protocol version number not stated in source"
- "laser power min/max static ranges not stated (dynamic per lens/lensshift)"
- "actual auth passcode not stated (example value 98765)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
