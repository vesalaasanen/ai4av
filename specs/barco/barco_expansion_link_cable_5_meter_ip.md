---
spec_id: admin/barco-pulse-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
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
retrieved_at: 2026-07-26T10:17:25.140Z
last_checked_at: 2026-08-05T07:31:17.346Z
generated_at: 2026-08-05T07:31:17.346Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source file was named \"barco_expansion_link_cable_5_meter_ip.refined.md\" but documents the Barco Pulse projector API, not a cable. compatible_with.models set to \"Pulse\" (family name from source); no specific Pulse model number is stated in the source."
  - "source lists position; write access not explicitly stated"
  - "no explicit multi-step sequences described as macros in source."
  - "no explicit safety interlock procedures, power-on sequencing hardware interlocks, or hazard warnings stated in source."
  - "specific projector model number not stated (source describes the \"Pulse\" family generically)."
  - "source filename (\"barco_expansion_link_cable_5_meter\") does not match documented device (Pulse projector API)."
  - "write access (vs read-only) for optics position properties not explicitly confirmed in source."
  - "firmware version compatibility ranges not stated in source."
  - "protocol/API version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:31:17.346Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match verbatim JSON-RPC method names documented in the Pulse API source; transport (port 9090, 19200/8/N/1) is verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Pulse Projector Control Spec

## Summary
Barco Pulse projector control via the Pulse API, a JSON-RPC 2.0 interface accessible over TCP/IP (port 9090) and RS-232 serial. Covers power state, source selection, illumination/laser power, picture settings (brightness, contrast, gamma, saturation, sharpness), warp/blend/black-level file handling, optics (shutter, zoom, focus, lens shift), DMX, environment monitoring (temperatures, fan speeds, alarms), firmware status, and introspection.

<!-- UNRESOLVED: source file was named "barco_expansion_link_cable_5_meter_ip.refined.md" but documents the Barco Pulse projector API, not a cable. compatible_with.models set to "Pulse" (family name from source); no specific Pulse model number is stated in the source. -->

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
  type: passcode  # source documents an "authenticate" method using a secret pass code (integer).
  # Auth is optional: "Authentication is only necessary when a higher level than normal end
  # user is required. For normal end user access the authentication can be skipped."
  # Example pass code 98765 shown in source is illustrative, not a real credential.
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff methods present
  - queryable    # inferred: property.get / list methods returning values present
  - levelable    # inferred: brightness, contrast, gamma, saturation, laser power settable
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "system.poweron" }'
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "system.poweroff" }'
    params: []

  - id: authenticate
    label: Authenticate
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 } }'
    params:
      - name: code
        type: integer
        description: Secret pass code (example value 98765 is illustrative only)

  - id: property_set
    label: Set Property
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }'
    params:
      - name: property
        type: string
        description: Property name in dot notation (e.g. image.brightness)
      - name: value
        type: any
        description: Value to set

  - id: property_get
    label: Get Property
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }'
    params:
      - name: property
        type: string
        description: Property name in dot notation

  - id: property_subscribe
    label: Subscribe To Property
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }'
    params:
      - name: property
        type: string
        description: Property name (or array of property names) to observe

  - id: property_unsubscribe
    label: Unsubscribe From Property
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }'
    params:
      - name: property
        type: string
        description: Property name (or array) to stop observing

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated)

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }'
    params:
      - name: signal
        type: string
        description: Signal name (or array) to stop observing

  - id: introspect
    label: Introspect Object
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": {recursive} } }'
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty introspects everything)
      - name: recursive
        type: boolean
        description: If false, only object names are listed (one level)

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "image.source.list" }'
    params: []

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "image.connector.list" }'
    params: []

  - id: image_source_listconnectors
    label: List Connectors For Source
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "image.source.{name}.listconnectors" }'
    params:
      - name: name
        type: string
        description: Source object name (source name lowercased, non-word chars removed, e.g. displayport1)

  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" } }'
    params:
      - name: type
        type: string
        description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
      - name: valuetype
        type: string
        description: 'Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "environment.getalarminfo" }'
    params: []

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "dmx.listchannels" }'
    params: []

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "dmx.listmodes" }'
    params: []

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "firmware.listcomponents" }'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }'
    params: []

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }'
    params: []

  - id: illumination_clo_engage
    label: Engage CLO
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "illumination.clo.engage" }'
    params: []

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{ "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }'
    params: []

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }'
    params:
      - name: presetname
        type: string
        description: Name of preset to copy

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }'
    params:
      - name: presetname
        type: string
        description: Name of preset to reset

  - id: image_color_p7_custom_resettonative
    label: Reset Color To Native
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }'
    params: []

  - id: ledctrl_blink
    label: Blink LED
    kind: action
    command: '{ "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": "{period}" } }'
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

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII serial command to wake a projector in ECO mode. Alternatives: wake-on-LAN with MAC address, remote power button, keypad power button.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    description: Current projector operation state (via property.get on system.state)

  - id: illumination_state
    type: enum
    values: [On, Off]
    description: Light state (via property.get on illumination.state)

  - id: active_source
    type: string
    description: Name of the currently active source (via property.get on image.window.main.source)

  - id: detected_signal
    type: object
    description: Detected signal info per connector (image.connector.{name}.detectedsignal) - active, name, resolutions, frequencies, color space, etc.

  - id: laser_power_level
    type: number
    description: Current laser power level in percent

  - id: temperatures
    type: object
    description: Snapshot of all temperature sensors (environment.getcontrolblocks, valuetype Temperature)

  - id: fan_speeds
    type: object
    description: Snapshot of all fan tacho readings (environment.getcontrolblocks, valuetype Speed)

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    description: Aggregate environment alarm state
```

## Variables
```yaml
variables:
  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    access: READ_WRITE
    description: Target laser power in percent
    min: null  # see illumination.sources.laser.minpower (dynamic)
    max: null  # see illumination.sources.laser.maxpower (dynamic)

  - id: image_brightness
    property: image.brightness
    type: float
    access: READ_WRITE
    min: -1
    max: 1
    precision: 0.01

  - id: image_contrast
    property: image.contrast
    type: float
    access: READ_WRITE
    min: 0
    max: 2
    precision: 0.01

  - id: image_gamma
    property: image.gamma
    type: float
    access: READ_WRITE
    min: 1
    max: 3
    precision: 0.1

  - id: image_saturation
    property: image.saturation
    type: float
    access: READ_WRITE
    min: 0
    max: 2
    precision: 0.01

  - id: image_sharpness
    property: image.sharpness
    type: integer
    access: READ_WRITE
    min: -2
    max: 8

  - id: image_orientation
    property: image.orientation
    type: enum
    access: READ_WRITE
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: image_window_main_source
    property: image.window.main.source
    type: string
    access: READ_WRITE
    description: Source displayed in main window (set via property.set)

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    access: READ_WRITE
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: READ_WRITE

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: READ_WRITE

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: READ_WRITE

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: READ_WRITE

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    access: READ_WRITE

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: READ_WRITE

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: READ_WRITE

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    access: READ_WRITE
    values: [Open, Closed]

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer
    access: READ_WRITE  # UNRESOLVED: source lists position; write access not explicitly stated

  - id: optics_focus_position
    property: optics.focus.position
    type: integer
    access: READ_WRITE  # UNRESOLVED: source lists position; write access not explicitly stated

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer
    access: READ_WRITE  # UNRESOLVED: source lists position; write access not explicitly stated

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer
    access: READ_WRITE  # UNRESOLVED: source lists position; write access not explicitly stated

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: READ_WRITE

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    access: READ_WRITE
    min: 1
    max: 512

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: READ_WRITE

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: READ_WRITE

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: READ_WRITE
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification sent by server when a subscribed property value changes. Params contain an array of property/value pairs.

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification sent by server when a subscribed signal is emitted. Params contain an array of signal/argument-list pairs.

  - id: modelupdated
    method: modelupdated  # via signal.subscribe / signal.callback
    description: Signal triggered when the object structure changes (objects added or removed). Client receives via signal.callback with introspect.objectchanged payload.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described as macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: 'Power on/off are idempotent and no-op during state transitions. Source recommends verifying projector state (standby/ready before power on; on before power off) before issuing the command.'
  - description: 'Best practice: wait for property.set confirmation before setting the same property again; continuous setting without confirmation may flood the server and reduce performance.'
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing hardware interlocks, or hazard warnings stated in source.
```

## Notes
- API is JSON-RPC 2.0. Parameters are passed by name; order does not matter. Requests may carry an `id`; notifications (server-pushed `property.changed`, `signal.callback`) carry no `id` and must not be answered.
- Parts of the API are dynamic and depend on peripherals/configuration (e.g. lens motorization, DMX extended mode). Exact API per device is best obtained via the `introspect` method.
- File endpoints (warp grids, blend masks, black-level masks) are uploaded/downloaded over HTTP at `http://<projector-ip>/api/...` using tools like `curl -F file=@...`. Supported image formats: PNG (up to 16-bit), JPEG, TIFF (grayscale; color images use blue channel only). Example IP `192.168.1.100` is illustrative.
- ECO-mode wake requires wake-on-LAN (MAC address), remote/keypad power button, or the serial ASCII command `:POWR1\r`.
- Authentication is optional for normal end-user access; required only for elevated access levels via the `authenticate` method with a secret pass code.

<!-- UNRESOLVED: specific projector model number not stated (source describes the "Pulse" family generically). -->
<!-- UNRESOLVED: source filename ("barco_expansion_link_cable_5_meter") does not match documented device (Pulse projector API). -->
<!-- UNRESOLVED: write access (vs read-only) for optics position properties not explicitly confirmed in source. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: protocol/API version number not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:17:25.140Z
last_checked_at: 2026-08-05T07:31:17.346Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:31:17.346Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match verbatim JSON-RPC method names documented in the Pulse API source; transport (port 9090, 19200/8/N/1) is verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source file was named \"barco_expansion_link_cable_5_meter_ip.refined.md\" but documents the Barco Pulse projector API, not a cable. compatible_with.models set to \"Pulse\" (family name from source); no specific Pulse model number is stated in the source."
- "source lists position; write access not explicitly stated"
- "no explicit multi-step sequences described as macros in source."
- "no explicit safety interlock procedures, power-on sequencing hardware interlocks, or hazard warnings stated in source."
- "specific projector model number not stated (source describes the \"Pulse\" family generically)."
- "source filename (\"barco_expansion_link_cable_5_meter\") does not match documented device (Pulse projector API)."
- "write access (vs read-only) for optics position properties not explicitly confirmed in source."
- "firmware version compatibility ranges not stated in source."
- "protocol/API version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
