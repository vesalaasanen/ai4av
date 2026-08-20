---
spec_id: admin/barco-hdd-set-3-x-2tb-for-icmp-x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Hdd Set 3 X 2Tb For Icmp X Control Spec"
manufacturer: Barco
model_family: "Barco Hdd Set 3 X 2Tb For Icmp X"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Hdd Set 3 X 2Tb For Icmp X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-09T18:05:58.625Z
last_checked_at: 2026-08-19T08:34:52.860Z
generated_at: 2026-08-19T08:34:52.860Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model variant and feature set vary by hardware config; source states API is partly dynamic and best resolved via introspection. Voltage/current/power specs, fault recovery sequences, and firmware compatibility ranges not stated."
  - "real pass code not documented; source example uses code 98765"
  - "optics.zoom.position, optics.focus.position, optics.lensshift.horizontal.position,"
  - "no explicit multi-step named sequences documented as presets in source."
  - "no explicit safety interlock procedures, power-on sequencing hard requirements,"
  - "exact device model identity ambiguous — \"Hdd Set 3 X 2Tb For Icmp X\" does not appear in source body; source is generic Pulse API reference. Confirm model mapping."
  - "authentication real pass code, token format, and elevated access levels beyond example code 98765 not documented."
  - "DMX extended-mode channel enumeration beyond basic 2-channel mode not listed."
  - "optics set methods (zoom/focus/lensshift motorized movement commands) not explicitly shown; only read positions documented."
  - "full property catalogue is dynamic — source states introspection is the authoritative source for a given configured unit."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:34:52.860Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec action units (27 JSON-RPC methods + 1 ECO serial wake + 5 feedbacks with query_command) are present verbatim in the Pulse API source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Barco Hdd Set 3 X 2Tb For Icmp X Control Spec

## Summary
Barco Pulse-family projector controlled via the Pulse API, a JSON-RPC 2.0 interface reachable over TCP/IP (port 9090) and RS-232 serial (19200 8N1). The API exposes power control, source selection, illumination (laser) power, picture settings (brightness/contrast/gamma/saturation/sharpness), warp/blend/black-level file management, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring (temperatures/fan speeds/alarms), firmware management, and HTTP file-transfer endpoints for upload/download of warp grids and masks.

<!-- UNRESOLVED: exact projector model variant and feature set vary by hardware config; source states API is partly dynamic and best resolved via introspection. Voltage/current/power specs, fault recovery sequences, and firmware compatibility ranges not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # Pulse services TCP port
  base_url: http://{projector_ip}/api  # HTTP file-transfer endpoints; projector IP not fixed by source (example: 192.168.1.100)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: 9-pin female (host) to 9-pin male (projector); pin2-pin2, pin3-pin3, pin5-pin5
auth:
  type: code  # optional pass-code authentication for elevated access; normal end-user access skips it
  # UNRESOLVED: real pass code not documented; source example uses code 98765
```

## Traits
```yaml
traits:
  - powerable   # inferred: system.poweron / system.poweroff present
  - queryable   # inferred: property.get / *list / getcontrolblocks queries present
  - routable    # inferred: image.window.main.source selection present
  - levelable   # inferred: image.brightness/contrast and illumination power present
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP/serial. Each entry's `command` is the verbatim method
# invocation; params shown are templates where the source parameterizes them.

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (98765 shown as example in source)
  notes: Sets user access level; skippable for normal end-user access. Response result true on success.

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: Result null on success (not an error). Verify system.state is standby/ready first.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: Result null on success (not an error). Verify system.state is on first.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Object/property name in dot notation (e.g. image.window.main.source)
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: Wait for confirmation before setting same property again to avoid flooding.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (or array of names for multi-get)

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names (e.g. modelupdated)

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty introspects everything)
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level)

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
  notes: Returns array of source names (varies by model; e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []
  notes: Returns array of physical connector names (varies by model).

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors","id":4}'
  params:
    - name: sourceobject
      type: string
      description: Source object name (source name lowercased, non-word chars removed; e.g. displayport1)

- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: type
      type: string
      description: Sensor type enum (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type enum (Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any)

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}},"id":3}'
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

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm info objects (severity, timestamp, source, description, custommessage).

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns components with available/running version and status (Unknown, OK, Upgradable).

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot.

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages Constant Light Output at current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: Returns laser serial number string.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset To Custom
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
      description: Preset name to reset to defaults

- id: image_color_p7_custom_resettonative
  label: Reset Custom To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to next RGB mode.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII characters sent over RS-232 serial port to wake a projector in ECO mode. Alternatives: Wake-on-LAN (HW/MAC address), IR remote power button, keypad power button.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  # full enum from properties list also includes service, error
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  subscribe: true

- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  subscribe: true

- id: active_source
  type: string
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  subscribe: true

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'

- id: connector_detected_signal
  type: object
  description: Detected signal info (active, name, resolutions, timings, color space, etc.) per connector object image.connector.{name}.detectedsignal
```

## Variables
```yaml
# Settable properties accessed via property.set (value constraints from source introspection data).
- id: illumination_sources_laser_power
  type: float
  min: 0   # minpower (dynamic)
  max: 100 # maxpower (dynamic)
  unit: percent
  access: read_write
  description: Target laser power in percent

- id: image_brightness
  type: float
  min: -1
  max: 1
  precision: 0.01
  access: read_write
  description: Image brightness/offset (0 default, 1 = 100% offset)

- id: image_contrast
  type: float
  min: 0
  max: 2
  precision: 0.01
  access: read_write
  description: Image contrast/gain (1 default)

- id: image_gamma
  type: float
  min: 1
  max: 3
  precision: 0.1
  access: read_write
  description: Image gamma (default 2.2)

- id: image_saturation
  type: float
  min: 0
  max: 2
  precision: 0.01
  access: read_write
  description: Image color saturation (1 default)

- id: image_sharpness
  type: integer
  min: -2
  max: 8
  access: read_write
  description: Image sharpness (normalized)

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  access: read_write

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  access: read_write

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
  access: read_write

- id: dmx_mode
  type: string
  access: read_write

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512
  access: read_write

- id: dmx_shutdown
  type: boolean
  access: read_write

- id: system_standby_enable
  type: boolean
  access: read_write

- id: system_eco_enable
  type: boolean
  access: read_write

- id: image_processing_warp_enable
  type: boolean
  access: read_write

- id: image_processing_warp_file_enable
  type: boolean
  access: read_write

- id: image_processing_warp_file_selected
  type: string
  access: read_write

- id: image_processing_blend_file_enable
  type: boolean
  access: read_write

- id: image_processing_blend_file_selected
  type: array
  items: string
  access: read_write

- id: image_processing_blacklevel_file_enable
  type: boolean
  access: read_write

- id: image_processing_blacklevel_file_selected
  type: string
  access: read_write

# UNRESOLVED: optics.zoom.position, optics.focus.position, optics.lensshift.horizontal.position,
# optics.lensshift.vertical.position, image.window.main.position, image.window.main.size are read
# positions; set methods (if any) not shown explicitly in source.
```

## Events
```yaml
- id: property_changed
  description: Unsolicited notification when a subscribed property value changes. Carries array of property/value pairs.
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{objectname.propertyname}":{value}}]}}'
  notes: No id, no response must be returned. Two notifications may fire for source switches (deselect then select).

- id: signal_callback
  description: Unsolicited notification when a subscribed signal is emitted. Carries array of signal/argument-list pairs.
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{objectname.signalname}":{"arg1":100}}]}}'

- id: modelupdated
  description: Signal triggered when object structure changes (objects added/removed); via signal.subscribe. Callback delivers introspect.objectchanged with object name and isnew flag.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named sequences documented as presets in source.
# Warp-grid activation flow documented procedurally (upload via HTTP -> select -> enable) but
# not packaged as a named macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on: source recommends verifying system.state is standby or ready before issuing system.poweron
  - power_off: source recommends verifying system.state is on before issuing system.poweroff
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing hard requirements,
# or hazard warnings stated beyond the soft recommendations above.
```

## Notes
- API is JSON-RPC 2.0; parameters passed by name, order does not matter.
- Property introspection (via `introspect` on owning object) reveals type, min/max/step/precision and access level — recommended before driving settable properties. Individual properties cannot be introspected directly; ask the owning service.
- Notifications carry no `id` and must not be answered.
- Best practice: wait for `property.set` confirmation before re-setting the same property (avoids server flooding).
- ECO wake: Wake-on-LAN, IR remote, keypad, or serial `:POWR1\r`.
- HTTP file endpoints: upload via `curl -F file=@<file> http://{ip}/api/{endpoint}`; download via browser/curl on same URL. Endpoints include `/image/processing/warp/file/transfer`, `/image/processing/blend/file/transfer`, `/image/processing/blacklevel/file/transfer`.
- Blend/black-level masks: grayscale 8/16-bit PNG/JPEG/TIFF; color images accepted but only blue channel used. Mask resolution must match projector (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).
- Warp file format same as MCM500/400.

<!-- UNRESOLVED: exact device model identity ambiguous — "Hdd Set 3 X 2Tb For Icmp X" does not appear in source body; source is generic Pulse API reference. Confirm model mapping. -->
<!-- UNRESOLVED: authentication real pass code, token format, and elevated access levels beyond example code 98765 not documented. -->
<!-- UNRESOLVED: DMX extended-mode channel enumeration beyond basic 2-channel mode not listed. -->
<!-- UNRESOLVED: optics set methods (zoom/focus/lensshift motorized movement commands) not explicitly shown; only read positions documented. -->
<!-- UNRESOLVED: full property catalogue is dynamic — source states introspection is the authoritative source for a given configured unit. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-09T18:05:58.625Z
last_checked_at: 2026-08-19T08:34:52.860Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:34:52.860Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec action units (27 JSON-RPC methods + 1 ECO serial wake + 5 feedbacks with query_command) are present verbatim in the Pulse API source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model variant and feature set vary by hardware config; source states API is partly dynamic and best resolved via introspection. Voltage/current/power specs, fault recovery sequences, and firmware compatibility ranges not stated."
- "real pass code not documented; source example uses code 98765"
- "optics.zoom.position, optics.focus.position, optics.lensshift.horizontal.position,"
- "no explicit multi-step named sequences documented as presets in source."
- "no explicit safety interlock procedures, power-on sequencing hard requirements,"
- "exact device model identity ambiguous — \"Hdd Set 3 X 2Tb For Icmp X\" does not appear in source body; source is generic Pulse API reference. Confirm model mapping."
- "authentication real pass code, token format, and elevated access levels beyond example code 98765 not documented."
- "DMX extended-mode channel enumeration beyond basic 2-channel mode not listed."
- "optics set methods (zoom/focus/lensshift motorized movement commands) not explicitly shown; only read positions documented."
- "full property catalogue is dynamic — source states introspection is the authoritative source for a given configured unit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
