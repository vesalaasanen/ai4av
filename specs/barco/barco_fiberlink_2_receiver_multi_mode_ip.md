---
spec_id: admin/barco-fiberlink-2-receiver-multi-mode
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Control Spec"
manufacturer: Barco
model_family: Pulse
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Pulse
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:23:18.312Z
last_checked_at: 2026-08-05T08:03:21.536Z
generated_at: 2026-08-05T08:03:21.536Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The provided device name \"Barco Fiberlink 2 Receiver Multi Mode\" (a fiber-optic signal extender) does not match the source document, which is the generic Pulse projector API (\"Pulse API\"). This spec reflects the source content (Pulse projectors), not a Fiberlink receiver. Confirm the correct source artifact before publishing."
  - "No single projector model named; \"Pulse\" family inferred. Warp file format cross-references MCM500/MCM400."
  - "firmware version compatibility not stated in source"
  - "source documents no explicit named multi-step macro sequences."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "Device name \"Barco Fiberlink 2 Receiver Multi Mode\" supplied by operator does not match source (Pulse projector API). Likely wrong source artifact paired with this entity."
  - "Specific projector model(s) not stated; \"Pulse\" family assumed."
  - "Authenticate passcode value/format is a credential and not populated; only the method envelope is documented."
  - "HTTP file-transfer endpoints lack documented auth and content-type constraints beyond \"blue channel used for grayscale-as-RGB\"."
  - "No firmware version compatibility ranges stated."
  - "LED/DMX color/mode vocabularies only exemplified, not enumerated exhaustively in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:03:21.536Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec action units map literally to JSON-RPC method tokens or the serial :POWR1 wake string documented in the refined source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Pulse Control Spec

## Summary
JSON-RPC 2.0 control API for Barco Pulse projectors, reachable over TCP/IP (port 9090) and RS-232 serial (19200 8N1). Covers power, source selection, illumination/laser power, picture settings, warping, blending, black-level correction, optics (shutter/zoom/focus/lens shift), DMX, environment telemetry, and firmware management. Property introspection drives much of the surface.

<!-- UNRESOLVED: The provided device name "Barco Fiberlink 2 Receiver Multi Mode" (a fiber-optic signal extender) does not match the source document, which is the generic Pulse projector API ("Pulse API"). This spec reflects the source content (Pulse projectors), not a Fiberlink receiver. Confirm the correct source artifact before publishing. -->
<!-- UNRESOLVED: No single projector model named; "Pulse" family inferred. Warp file format cross-references MCM500/MCM400. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  type: none  # inferred: normal end-user access requires no auth (source: "Authentication is only necessary when a higher level than normal end user is required")
  # NOTE: source documents an `authenticate` method requiring a numeric secret passcode for elevated access.
  # Passcode value/format UNRESOLVED (credential - not populated per policy). Example uses code 98765.
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff
  - queryable     # inferred: property.get / introspect / environment.getcontrolblocks
  - routable      # inferred: image.window.main.source selection
  - levelable     # inferred: brightness/contrast/gamma/laser power set
```

## Actions
```yaml
# JSON-RPC 2.0 method = one action. Parameterized methods carry the variable
# part in params. Literal payloads copied verbatim from source.
# All requests use envelope: { "jsonrpc": "2.0", "method": <m>, "params": {...}, "id": <n> }

actions:
  # --- Authentication ---
  - id: authenticate
    label: Authenticate (elevated access)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
    params:
      - name: code
        type: integer
        description: Secret passcode (value UNRESOLVED - example shows 98765)
    notes: Only required for access levels above normal end user.

  # --- Power ---
  - id: system_poweron
    label: Power On
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: No-op if already on or transitioning. Best practice: verify system.state is standby/ready first.

  - id: system_poweroff
    label: Power Off
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: No-op if already off or transitioning. Best practice: verify system.state is on first.

  - id: eco_wake_serial
    label: ECO Mode Wake (serial only)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII string sent over RS-232 to wake a projector in ECO mode. TCP equivalent not documented.

  # --- Generic property API (parameterized) ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (e.g. image.brightness)
      - name: value
        type: any
        description: Value matching the property type
    notes: Wait for confirmation before re-setting the same property (source guidance).

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names

  # --- Signal API ---
  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  # --- Introspection ---
  - id: introspect
    label: Introspect Object Metadata
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",{recursive}],"id":{id}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty = all)
      - name: recursive
        type: boolean
        description: If false, only immediate object names listed (one level)
    notes: Result restricted by authenticated access level.

  # --- Sources / connectors ---
  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
    params: []
    notes: Returns array of source name strings; contents vary by model.

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
    params: []

  - id: image_source_listconnectors
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors","id":{id}}'
    params:
      - name: name
        type: string
        description: Source object name (source name lowercased, non-word chars removed, e.g. displayport1)

  # --- Environment telemetry ---
  - id: environment_getcontrolblocks
    label: Get Environment Sensor Readings
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
    params:
      - name: type
        type: string
        description: 'Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
      - name: valuetype
        type: string
        description: 'Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'
    notes: Returns dictionary of sensor-name -> reading.

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
    params: []
    notes: Returns array of {severity, timestamp, source, description, custommessage}.

  # --- DMX ---
  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
    params: []

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
    params: []

  # --- Firmware ---
  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
    params: []
    notes: Returns per-component {name, versions{available,running}, status: Unknown|OK|Upgradable}.

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces component upgrade at next reboot.

  # --- Illumination ---
  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []
    notes: Engages CLO at the current light level.

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
    params: []

  # --- Color management ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name to copy

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Preset name to reset

  - id: image_color_p7_custom_resettonative
    label: Reset Color To Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles through all available RGB modes.

  # --- LED control (documented in method-invocation example) ---
  - id: ledctrl_blink
    label: Blink LED
    kind: action
    command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
    params:
      - name: led
        type: string
        description: LED identifier (e.g. systemstatus)
      - name: color
        type: string
        description: LED color (e.g. red)
      - name: period
        type: integer
        description: Blink period
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    access: read
    notes: Queried via property.get on "system.state". Observable via property.changed.

  - id: illumination_state
    type: enum
    values: [On, Off]
    access: read

  - id: laser_minpower
    type: float
    access: read
    notes: Minimum laser power percent. Dynamic; affected by lens type/position.

  - id: laser_maxpower
    type: float
    access: read
    notes: Maximum laser power percent. Dynamic; affected by lens type/position.

  - id: image_connector_detectedsignal
    type: object
    access: read
    notes: |
      Queried via property.get on "image.connector.{name}.detectedsignal".
      Fields: active(bool), name(string), vertical_total, horizontal_total,
      vertical_resolution, horizontal_resolution, vertical_sync_width,
      vertical_front_porch, vertical_back_porch, horizontal_sync_width,
      horizontal_front_porch, horizontal_back_porch, horizontal_frequency(float),
      vertical_frequency(float), pixel_rate(int), scan(enum), bits_per_component(int),
      color_space(enum), signal_range(enum: 0-255|16-235), chroma_sampling(enum: 4:4:4|4:2:2|4:2:0),
      gamma_type(enum: POWER|sRGB|REC_BT1886|SMPTE_ST2084), color_primaries(enum:
      REC709|REC2020|DCI-P3-D65|DCI-P3-Theater), mastering_luminance(float),
      content_aspect_ratio(enum), is_stereo(bool), stereo_mode(enum:
      None|Sequential|FramePacked|TopBottom|SideBySide).

  - id: network_device_lan_ip4config
    type: object
    access: read
    notes: Fields Address, Mask, Gateway, NameServers (all string).

  - id: network_device_lan_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    access: read

  - id: environment_alarmstate
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    access: read

  - id: environment_temperatures
    type: dictionary
    access: read
    notes: |
      Retrieved via environment.getcontrolblocks {type: Sensor, valuetype: Temperature}.
      Example keys: environment.laser.boardN.bankN.temperature,
      environment.laser.boardN.heatsinkN.temperature, environment.temperature.cyclon5,
      environment.temperature.imx6, environment.temperature.inlet,
      environment.temperature.mainboard, environment.temperature.mainpower,
      environment.temperature.outlet, environment.temperature.scalerfpga.

  - id: environment_fanspeeds
    type: dictionary
    access: read
    notes: |
      Retrieved via environment.getcontrolblocks {type: Sensor, valuetype: Speed}.
      Example keys: environment.fan.{ar1..ar5,driver,optics,pcb,phosphorleft,phosphorright,psu}.tacho.

  - id: active_source
    type: string
    access: read
    notes: Queried via property.get on "image.window.main.source".
```

## Variables
```yaml
variables:
  - id: illumination_sources_laser_power
    type: float
    access: read_write
    unit: percent
    notes: Target laser power. Queried/set via property on "illumination.sources.laser.power".

  - id: image_window_main_source
    type: string
    access: read_write
    notes: Active source for main window. Set via property "image.window.main.source".

  - id: image_window_main_position
    type: object
    access: read_write
    notes: '{x: int, y: int}'

  - id: image_window_main_size
    type: object
    access: read_write
    notes: '{width: int, height: int}'

  - id: image_window_main_scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    access: read_write

  - id: image_brightness
    type: float
    access: read_write
    constraints: {min: -1, max: 1, step_size: 1, precision: 0.01}
    notes: Normalized; 0 default, 1 = 100% offset.

  - id: image_contrast
    type: float
    access: read_write
    constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
    notes: Normalized; 1 default.

  - id: image_gamma
    type: float
    access: read_write
    constraints: {min: 1, max: 3, step_size: 1, precision: 0.1}
    notes: Default 2.2.

  - id: image_saturation
    type: float
    access: read_write
    constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
    notes: Normalized; 1 default.

  - id: image_sharpness
    type: integer
    access: read_write
    constraints: {min: -2, max: 8, step_size: 1, precision: 1}
    notes: Normalized.

  - id: image_orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    access: read_write

  - id: image_processing_warp_enable
    type: boolean
    access: read_write
    notes: Globally enable/disable all warp functions.

  - id: image_processing_warp_file_enable
    type: boolean
    access: read_write
    notes: Enable/disable file warp.

  - id: image_processing_warp_file_selected
    type: string
    access: read_write
    notes: Currently selected warp file. Upload via HTTP POST to /api/image/processing/warp/file/transfer.

  - id: image_processing_blend_file_enable
    type: boolean
    access: read_write

  - id: image_processing_blend_file_selected
    type: array
    items: string
    access: read_write
    notes: Upload via HTTP POST to /api/image/processing/blend/file/transfer. PNG/JPEG/TIFF grayscale (blue channel used if RGB).

  - id: image_processing_blacklevel_file_enable
    type: boolean
    access: read_write

  - id: image_processing_blacklevel_file_selected
    type: string
    access: read_write
    notes: Upload via HTTP POST to /api/image/processing/blacklevel/file/transfer.

  - id: dmx_mode
    type: string
    access: read_write

  - id: dmx_startchannel
    type: integer
    access: read_write
    constraints: {min: 1, max: 512}

  - id: dmx_shutdown
    type: boolean
    access: read_write

  - id: optics_shutter_position
    type: enum
    values: [Open, Closed]
    access: read_write

  - id: optics_shutter_target
    type: enum
    values: [Open, Closed]
    access: read_write

  - id: optics_zoom_position
    type: integer
    access: read_write

  - id: optics_focus_position
    type: integer
    access: read_write

  - id: optics_lensshift_horizontal_position
    type: integer
    access: read_write

  - id: optics_lensshift_vertical_position
    type: integer
    access: read_write

  - id: system_standby_enable
    type: boolean
    access: read_write
    notes: Check availability first.

  - id: system_eco_enable
    type: boolean
    access: read_write
    notes: Check availability first.
```

## Events
```yaml
events:
  - id: property_changed
    direction: server_to_client
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'
    notes: Unsolicited. No id, no response to return. Delivered on subscribed property changes. May fire twice for source switches (deselect then select).

  - id: signal_callback
    direction: server_to_client
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{"arg1":100,"arg2":"cat"}}]}}'
    notes: Unsolicited. Delivered on subscribed signal emission.

  - id: introspect_objectchanged
    direction: server_to_client
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"{object}","newobject":true}}]}}'
    notes: Subscribed via signal "modelupdated". Fires when objects added/removed. Args: object(string), isnew(bool).
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no explicit named multi-step macro sequences.
# Note: programmer's guide describes procedures (e.g. "set source, then enable warp,
# then upload+select+enable warp file") but these are guidance, not named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on_guard: "Verify system.state is standby or ready before issuing system.poweron (no-op otherwise)."
  - power_off_guard: "Verify system.state is on before issuing system.poweroff (no-op otherwise)."
  - property_set_rate: "Wait for property.set confirmation before re-setting the same property (flooding degrades performance)."
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated beyond the operational best-practice notes above.
```

## Notes
- Protocol is JSON-RPC 2.0 over TCP (port 9090) or RS-232 (19200 8N1, no flow control). Serial cable: 9-pin female host to 9-pin male projector, pin 2↔2, 3↔3, 5↔5.
- Parameters passed by name; order insignificant.
- API is partly dynamic — actual surface depends on peripherals/config (e.g. motorized zoom lens, DMX extended mode). Use `introspect` for the authoritative per-device API.
- File endpoints accessed over plain HTTP at `http://<projector-ip>/api/...` (e.g. warp, blend, blacklevel transfers via curl `-F file=@...`). Base URL host is the projector IP; example uses 192.168.1.100.
- ECO-mode wake requires Wake-on-LAN (MAC address), physical power button, or the serial ASCII string `:POWR1\r`.
- Warp file format shared with MCM500/MCM400.
- Source name -> object name translation: lowercase, strip non-word chars (e.g. "DisplayPort 1" -> "displayport1").

<!-- UNRESOLVED: Device name "Barco Fiberlink 2 Receiver Multi Mode" supplied by operator does not match source (Pulse projector API). Likely wrong source artifact paired with this entity. -->
<!-- UNRESOLVED: Specific projector model(s) not stated; "Pulse" family assumed. -->
<!-- UNRESOLVED: Authenticate passcode value/format is a credential and not populated; only the method envelope is documented. -->
<!-- UNRESOLVED: HTTP file-transfer endpoints lack documented auth and content-type constraints beyond "blue channel used for grayscale-as-RGB". -->
<!-- UNRESOLVED: No firmware version compatibility ranges stated. -->
<!-- UNRESOLVED: LED/DMX color/mode vocabularies only exemplified, not enumerated exhaustively in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:23:18.312Z
last_checked_at: 2026-08-05T08:03:21.536Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:03:21.536Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec action units map literally to JSON-RPC method tokens or the serial :POWR1 wake string documented in the refined source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The provided device name \"Barco Fiberlink 2 Receiver Multi Mode\" (a fiber-optic signal extender) does not match the source document, which is the generic Pulse projector API (\"Pulse API\"). This spec reflects the source content (Pulse projectors), not a Fiberlink receiver. Confirm the correct source artifact before publishing."
- "No single projector model named; \"Pulse\" family inferred. Warp file format cross-references MCM500/MCM400."
- "firmware version compatibility not stated in source"
- "source documents no explicit named multi-step macro sequences."
- "no explicit safety warnings, interlock procedures, or power-on"
- "Device name \"Barco Fiberlink 2 Receiver Multi Mode\" supplied by operator does not match source (Pulse projector API). Likely wrong source artifact paired with this entity."
- "Specific projector model(s) not stated; \"Pulse\" family assumed."
- "Authenticate passcode value/format is a credential and not populated; only the method envelope is documented."
- "HTTP file-transfer endpoints lack documented auth and content-type constraints beyond \"blue channel used for grayscale-as-RGB\"."
- "No firmware version compatibility ranges stated."
- "LED/DMX color/mode vocabularies only exemplified, not enumerated exhaustively in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
