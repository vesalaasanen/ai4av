---
spec_id: admin/barco-ir-remote-control-xlr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco IR Remote Control XLR Control Spec"
manufacturer: Barco
model_family: "Barco IR Remote Control XLR"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco IR Remote Control XLR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:19:43.193Z
last_checked_at: 2026-08-19T08:45:08.935Z
generated_at: 2026-08-19T08:45:08.935Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ledctrl.blink
  - "exact projector model family and firmware version compatibility not stated in source. API is dynamic and parts depend on peripheral/lens configuration (see source \"Important note about the API documentation\")."
  - "exact numeric min/max not fixed in source (dynamic, depends on lens)"
  - "no explicit safety interlock procedures, power-sequencing hardware"
  - "firmware version compatibility range not stated."
  - "full list of available sources/connectors varies by model — source gives an example list only."
  - "numeric min/max for illumination.sources.laser.power are dynamic (lens/position dependent); only example values (0..100, current 30→40) shown."
  - "exact `authenticate` pass code is a site secret; only example 98765 shown."
  - "DMX extended-mode channel layout not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:45:08.935Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions map to JSON-RPC methods or HTTP endpoints in the source; transport port/baud match RS232 section. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco IR Remote Control XLR Control Spec

## Summary
Barco Pulse projector control via the Pulse API, a JSON-RPC 2.0 service accessible over TCP/IP (port 9090) or RS-232 serial (19200 baud). Covers power, source selection, illumination/laser power, picture settings (brightness/contrast/gamma/saturation/sharpness), warp/blend/black-level file handling, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring, and firmware management. A special ASCII wake command (`:POWR1\r`) is documented for waking a projector in ECO mode over the serial port.

<!-- UNRESOLVED: exact projector model family and firmware version compatibility not stated in source. API is dynamic and parts depend on peripheral/lens configuration (see source "Important note about the API documentation"). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# TCP/IP: JSON-RPC 2.0 service on port 9090 (source: "Network" section).
# Serial: 9-pin RS-232, pin2-pin2, pin3-pin3, pin5-pin5 (source: "Serial port" section).
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: source states authentication may be skipped for normal end-user access.
  # NOTE: an `authenticate` method (secret pass code) exists for elevated access levels - see Actions.
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff methods + serial ECO wake command
  - queryable     # inferred: property.get, image.source.list, environment.getcontrolblocks, etc.
  - routable      # inferred: image.window.main.source selection / image.source.list
  - levelable     # inferred: image.brightness/contrast/gamma/saturation/sharpness, illumination.sources.laser.power
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 requests, verbatim from source. The JSON-RPC
# envelope {"jsonrpc":"2.0", method, params, id} is shown per entry. `id` is a
# client-supplied request identifier (string or number).
actions:
  # --- Power ---
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII wake command sent over RS-232 to wake a projector in ECO mode. Only the RS232 path uses this; TCP wake uses Wake-on-LAN with the projector MAC address (not specified here).

  # --- Authentication (optional, elevated access) ---
  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765,"id":1}}'
    params:
      - name: code
        type: integer
        description: Secret pass code. Example value 98765 shown in source.
      - name: id
        type: integer
        description: Request identifier.

  # --- Generic property / signal API (parameterized) ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (e.g. image.window.main.source).
      - name: value
        type: any
        description: Value to set. Type depends on target property.
    notes: Best practice - wait for confirmation before setting the same property again.

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name, or array of property names to read multiple.

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name, or array for multiple properties.

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name, or array for multiple properties.

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated), or array for multiple signals.

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array for multiple signals.

  - id: introspect
    label: Introspect Object Metadata
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/"" introspects everything.
      - name: recursive
        type: boolean
        description: If false, only object names are listed (one level). Default true.
    notes: Also accepts positional params form {"params":["{object}",{recursive}]}.

  # --- Sources & connectors ---
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
    label: List Connectors For Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name derived by stripping non-word chars and lowercasing the source name (e.g. "DisplayPort 1" -> "displayport1").

  # --- Environment ---
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
    params:
      - name: type
        type: string
        description: Sensor type enum - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
      - name: valuetype
        type: string
        description: Value type enum - Temperature, Speed, Voltage, Current, Power, PWM, Humidity, etc. (full list in source).

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []

  # --- DMX ---
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
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces a component upgrade at the following reboot. Component parameter documented as required by context but not shown verbatim in source.

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
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []

  # --- Color / presets ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Preset To Custom (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Preset (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset to defaults.

  - id: image_color_p7_custom_resettonative
    label: Reset To Native (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles to the next RGB mode.

  # --- File transfer (HTTP endpoints, distinct from JSON-RPC) ---
  - id: upload_warp_file
    label: Upload Warp Grid File
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
    params:
      - name: filename
        type: string
        description: Local warp grid XML file (MCM500/400 compatible format).
      - name: host
        type: string
        description: Projector IP address.

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
    params:
      - name: filename
        type: string
        description: Grayscale PNG/JPEG/TIFF (8 or 16 bit). Only blue channel used if color.
      - name: host
        type: string
        description: Projector IP address.

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: filename
        type: string
        description: Grayscale PNG/JPEG/TIFF (8 or 16 bit).
      - name: host
        type: string
        description: Projector IP address.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
    query: property_get
    query_property: system.state
    notification: property.changed

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    query_property: illumination.state
    notification: property.changed

  - id: active_source
    type: string
    query_property: image.window.main.source
    notification: property.changed
    notes: Two notifications delivered on source switch (deselect old, select new).

  - id: network_state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    query_property: network.device.lan.state

  - id: shutter_position
    type: enum
    values: ["Open", "Closed"]
    query_property: optics.shutter.position

  - id: alarm_state
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    query_property: environment.alarmstate

  - id: detected_signal
    type: object
    query_property: image.connector.{name}.detectedsignal
    notes: Object with active, name (resolution@rate), vertical/horizontal totals, sync timings, color_space, chroma_sampling, gamma_type, etc.

  - id: laser_power
    type: number
    query_property: illumination.sources.laser.power
    notification: property.changed
```

## Variables
```yaml
variables:
  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    unit: percent
    access: read_write
    set_via: property_set
    min_property: illumination.sources.laser.minpower  # UNRESOLVED: exact numeric min/max not fixed in source (dynamic, depends on lens)
    max_property: illumination.sources.laser.maxpower

  - id: image_brightness
    property: image.brightness
    type: float
    access: read_write
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    set_via: property_set

  - id: image_contrast
    property: image.contrast
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_via: property_set

  - id: image_gamma
    property: image.gamma
    type: float
    access: read_write
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    set_via: property_set

  - id: image_saturation
    property: image.saturation
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_via: property_set

  - id: image_sharpness
    property: image.sharpness
    type: int
    access: read_write
    min: -2
    max: 8
    step_size: 1
    precision: 1
    set_via: property_set

  - id: image_orientation
    property: image.orientation
    type: enum
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    set_via: property_set

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    set_via: property_set

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: read_write
    set_via: property_set

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: read_write
    set_via: property_set

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: read_write
    set_via: property_set

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: read_write
    set_via: property_set

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    items: string
    access: read_write
    set_via: property_set

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write
    set_via: property_set

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: read_write
    set_via: property_set

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: read_write
    set_via: property_set

  - id: dmx_startchannel
    property: dmx.startchannel
    type: int
    access: read_write
    range: [1, 512]
    set_via: property_set

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: read_write
    set_via: property_set

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: read_write
    set_via: property_set
    notes: Check availability first.

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: read_write
    set_via: property_set
    notes: Check availability first.

  - id: optics_zoom_position
    property: optics.zoom.position
    type: int
    access: read_write
    set_via: property_set

  - id: optics_focus_position
    property: optics.focus.position
    type: int
    access: read_write
    set_via: property_set

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: int
    access: read_write
    set_via: property_set

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: int
    access: read_write
    set_via: property_set

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: ["Open", "Closed"]
    access: read_write
    set_via: property_set
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification sent when a subscribed property value changes. Carries an array of property/value pairs. No response must be returned.
    payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification sent when a subscribed signal is emitted. Carries an array of signal/argument-list pairs. No response must be returned.

  - id: modelupdated
    method: modelupdated  # via signal.callback
    description: Object-structure change signal - fires when objects are added or removed. Subscribe via signal.subscribe with signal "modelupdated". Callback includes object name and isnew flag.
```

## Macros
```yaml
macros:
  - id: apply_warp_file
    description: Three-step sequence documented in source to activate an uploaded warp grid.
    steps:
      - upload warp grid via HTTP POST to /api/image/processing/warp/file/transfer
      - set image.processing.warp.file.selected to the uploaded filename
      - set image.processing.warp.file.enable to true

  - id: apply_blend_mask
    description: Three-step sequence documented in source to activate an uploaded blend mask.
    steps:
      - upload blend mask via HTTP POST to /api/image/processing/blend/file/transfer
      - set image.processing.blend.file.selected to the uploaded filename
      - set image.processing.blend.file.enable to true

  - id: apply_blacklevel_mask
    description: Three-step sequence documented in source to activate an uploaded black level mask.
    steps:
      - upload black level mask via HTTP POST to /api/image/processing/blacklevel/file/transfer
      - set image.processing.blacklevel.file.selected to the uploaded filename
      - set image.processing.blacklevel.file.enable to true

  - id: safe_power_on
    description: Source recommends verifying projector state is standby or ready before issuing power on (no-op otherwise).
    steps:
      - property.get system.state
      - if result in [standby, ready]: system.poweron

  - id: safe_power_off
    description: Source recommends verifying projector state is on before issuing power off (no-op otherwise).
    steps:
      - property.get system.state
      - if result == on: system.poweroff
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on_guard: "Source: if projector already on or in transition, poweron is a no-op. Best practice to verify state is standby/ready first."
  - power_off_guard: "Source: if projector already off or in transition, poweroff is a no-op. Best practice to verify state is on first."
  - property_set_rate: "Source: continuously setting the same property without waiting for confirmation may flood the server and reduce performance."
# UNRESOLVED: no explicit safety interlock procedures, power-sequencing hardware
# interlocks, or critical warnings beyond operational best-practice notes found in source.
```

## Notes
- **Protocol**: Pulse API = JSON-RPC 2.0 over TCP (port 9090) or RS-232. All methods/properties available identically over both transports.
- **Serial cable**: 9-pin female to host, 9-pin male to projector; pin 2↔2, pin 3↔3, pin 5↔5.
- **ECO wake**: serial path uses literal ASCII `:POWR1\r`. Network path uses Wake-on-LAN with the projector's MAC address (MAC address itself not specified here). Keypad/remote power buttons also wake from ECO.
- **Authentication**: optional. Normal end-user access requires no auth. The `authenticate` method (secret pass code, example `98765`) raises the access level for privileged operations.
- **Dynamic API**: source warns the documented API may not be complete for a given projector configuration (e.g. motorized zoom absent without motorized lens; DMX exposes more channels in extended mode). Use `introspect` to discover the exact live API.
- **Source-name → object-name transform**: strip non-word chars and lowercase (e.g. `DisplayPort 1` → `displayport1`) to derive source/connector object names.
- **Notifications carry no `id`** and must not be answered.

<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: full list of available sources/connectors varies by model — source gives an example list only. -->
<!-- UNRESOLVED: numeric min/max for illumination.sources.laser.power are dynamic (lens/position dependent); only example values (0..100, current 30→40) shown. -->
<!-- UNRESOLVED: exact `authenticate` pass code is a site secret; only example 98765 shown. -->
<!-- UNRESOLVED: DMX extended-mode channel layout not enumerated in source. -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:19:43.193Z
last_checked_at: 2026-08-19T08:45:08.935Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:45:08.935Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions map to JSON-RPC methods or HTTP endpoints in the source; transport port/baud match RS232 section. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ledctrl.blink
- "exact projector model family and firmware version compatibility not stated in source. API is dynamic and parts depend on peripheral/lens configuration (see source \"Important note about the API documentation\")."
- "exact numeric min/max not fixed in source (dynamic, depends on lens)"
- "no explicit safety interlock procedures, power-sequencing hardware"
- "firmware version compatibility range not stated."
- "full list of available sources/connectors varies by model — source gives an example list only."
- "numeric min/max for illumination.sources.laser.power are dynamic (lens/position dependent); only example values (0..100, current 30→40) shown."
- "exact `authenticate` pass code is a site secret; only example 98765 shown."
- "DMX extended-mode channel layout not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
