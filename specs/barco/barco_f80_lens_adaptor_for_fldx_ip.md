---
spec_id: admin/barco-f80-lens-adaptor-for-fldx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F80 Lens Adaptor For Fldx Control Spec"
manufacturer: Barco
model_family: "Barco F80 Lens Adaptor For Fldx"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco F80 Lens Adaptor For Fldx"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:27:23.073Z
last_checked_at: 2026-08-05T08:00:39.030Z
generated_at: 2026-08-05T08:00:39.030Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product/model string \"F80 Lens Adaptor For Fldx\" not literally present in source text; source is the generic Pulse \"RS232 and Network Command Catalog\". Model-specific API surface (e.g. available sources, illumination source type) must be confirmed via introspection on the actual unit."
  - "no explicit multi-step sequences named as macros in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "exact model string \"F80 Lens Adaptor For Fldx\" not verified against source text."
  - "firmware version compatibility not stated in source."
  - "authentication pass-code value is an example only; real credential not documented."
  - "illumination source type (laser vs LED vs lamp) is model-specific; source examples assume laser."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:00:39.030Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 action units and declared transport values are supported by the source, with no substantial unrepresented commands. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco F80 Lens Adaptor For Fldx Control Spec

## Summary
Barco Pulse-family projector controlled via the Pulse API, a JSON-RPC 2.0 service reachable over TCP/IP (port 9090) or RS-232 serial. Covers power, source selection, illumination/laser power, image picture settings, warp/blend/black-level file handling, optics (shutter/zoom/focus/lens shift), DMX, environment telemetry, and firmware management. The device is named per the entity token "F80 Lens Adaptor For Fldx"; the source document is the generic Pulse API catalog and model-specific surface may vary.

<!-- UNRESOLVED: exact product/model string "F80 Lens Adaptor For Fldx" not literally present in source text; source is the generic Pulse "RS232 and Network Command Catalog". Model-specific API surface (e.g. available sources, illumination source type) must be confirmed via introspection on the actual unit. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # "The service is available on port number 9090."
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source documents an `authenticate` method carrying a secret pass code
  # Note: authentication is OPTIONAL for normal end-user access; required only to raise
  # the access level above normal end user. Pass code value (e.g. 98765) is illustrative
  # in the source, not a fixed credential.
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff commands present
  - queryable    # inferred: property.get / *.list / environment.getcontrolblocks queries present
  - levelable    # inferred: image.brightness/contrast/gamma/saturation + illumination.sources.laser.power
  - routable     # inferred: image.window.main.source selection among listed sources
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over TCP/serial unless noted. `id` is an arbitrary
# client-chosen request identifier; shown verbatim from source examples where given.
actions:
  # --- Power / system ---
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweron" }'
    params: []

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweroff" }'
    params: []

  - id: eco_wake_serial
    label: Wake From ECO Mode (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII string sent on RS-232 to wake a projector in ECO/power-save mode.

  # --- Authentication ---
  - id: authenticate
    label: Authenticate Session
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 } }'
    params:
      - name: code
        type: integer
        description: Secret pass code; 98765 is the source example value, not a fixed credential.
    notes: Sets user access level. Required only for elevated access; normal end-user access skips auth.

  # --- Generic property API (one parameterized action per opcode) ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "<objectname.propertyname>", "value": <value> } }'
    params:
      - name: property
        type: string
        description: Dot-notation property name (e.g. image.brightness).
      - name: value
        type: any
        description: Value matching the property's declared type.
    notes: Wait for confirmation before re-setting the same property (source best practice).

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "<objectname.propertyname>" } }'
    params:
      - name: property
        type: string
        description: Dot-notation property name, or an array of names to read multiple at once.

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "<objectname.propertyname>" } }'
    params:
      - name: property
        type: string
        description: Single property name, or an array of names to subscribe to multiple.

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "<objectname.propertyname>" } }'
    params:
      - name: property
        type: string
        description: Single property name, or an array of names.

  # --- Signal API ---
  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "<signalname>" } }'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated), or an array of names.

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "<signalname>" } }'
    params:
      - name: signal
        type: string
        description: Signal name, or an array of names.

  # --- Introspection ---
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "<object>", "recursive": true } }'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/default introspects everything.
      - name: recursive
        type: boolean
        description: If false, only immediate object names are listed (one level). Default true.
    notes: Alternate positional form documented: {"method":"introspect","params":["foo",true],"id":1}.

  # --- Sources / connectors ---
  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1 }'
    params: []

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3 }'
    params: []

  - id: image_source_listconnectors
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.<sourceobject>.listconnectors", "id": 4 }'
    params:
      - name: sourceobject
        type: string
        description: >
          Source object name derived from the display name by stripping non-word
          chars and lowercasing (e.g. "DisplayPort 1" -> "displayport1").

  # --- Environment telemetry ---
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "<Sensor|Filter|Controller|Actuator|Alarm|GenericBlock>", "valuetype": "<Temperature|Speed|...>" } }'
    params:
      - name: type
        type: string
        description: Sensor block type.
      - name: valuetype
        type: string
        description: Value type (Temperature, Speed, PWM, Voltage, Current, Power, Humidity, ...).

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo" }'
    params: []

  # --- DMX ---
  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels" }'
    params: []

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes" }'
    params: []

  # --- Firmware ---
  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents" }'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }'
    params: []

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }'
    params: []
    notes: Forces a component upgrade at the next reboot.

  # --- Illumination ---
  - id: illumination_clo_engage
    label: Engage CLO
    kind: action
    command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage" }'
    params: []
    notes: Engage Constant Light Output at the current light level.

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }'
    params: []

  # --- Color management ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Preset To Custom Color Slot
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<presetname>" } }'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Custom Color Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<presetname>" } }'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset to defaults.

  - id: image_color_p7_custom_resettonative
    label: Reset Custom Color To Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }'
    params: []
    notes: Cycles to the next RGB mode.

  # --- Example method shown in the source (notation reference) ---
  - id: ledctrl_blink
    label: Blink LED (Example Method)
    kind: action
    command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 } }'
    params:
      - name: led
        type: string
        description: LED identifier.
      - name: color
        type: string
        description: LED color.
      - name: period
        type: integer
        description: Blink period.

  # --- HTTP file endpoints (upload/download, separate from JSON-RPC) ---
  - id: upload_warp_grid
    label: Upload Warp Grid File
    kind: action
    command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
    params:
      - name: projector-ip
        type: string
        description: Projector IP address (source example 192.168.1.100).
    notes: HTTP multipart upload. Activate via property.set on image.processing.warp.file.selected / .file.enable.

  - id: download_warp_grid
    label: Download Warp Grid File
    kind: query
    command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer'
    params:
      - name: projector-ip
        type: string
        description: Projector IP address.

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
    params:
      - name: projector-ip
        type: string
        description: Projector IP address.
    notes: Grayscale PNG/JPEG/TIFF, 8 or 16 bit. Size must match projector blend layer.

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
    params:
      - name: projector-ip
        type: string
        description: Projector IP address.
```

## Feedbacks
```yaml
feedbacks:
  # Notification methods the CLIENT must implement; emitted unsolicited by the projector.
  - id: property_changed
    type: notification
    description: >
      Emitted when a subscribed property value changes. No `id`, no response required.
    example: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }'

  - id: signal_callback
    type: notification
    description: Emitted when a subscribed signal fires.
    example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }'

  - id: modelupdated_signal
    type: signal
    description: Triggered when the object structure changes (objects added or removed).
```

## Variables
```yaml
# Settable/readable properties exposed via property.set / property.get.
variables:
  - name: system.state
    type: enum
    access: read
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]

  - name: illumination.state
    type: enum
    access: read
    values: ["On", "Off"]

  - name: illumination.sources.laser.power
    type: float
    access: read_write
    description: Target laser power in percent.

  - name: illumination.sources.laser.minpower
    type: float
    access: read
    description: Minimum laser power in percent (dynamic).

  - name: illumination.sources.laser.maxpower
    type: float
    access: read
    description: Maximum laser power in percent (dynamic).

  - name: image.window.main.source
    type: string
    access: read_write
    description: Active source displayed in the main window.

  - name: image.window.main.position
    type: object
    access: read_write
    fields: { x: int, y: int }

  - name: image.window.main.size
    type: object
    access: read_write
    fields: { width: int, height: int }

  - name: image.window.main.scalingmode
    type: enum
    access: read_write
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

  - name: image.brightness
    type: float
    access: read_write
    constraints: { min: -1, max: 1, step: 1, precision: 0.01 }
    description: Normalized brightness/offset; 0 default.

  - name: image.contrast
    type: float
    access: read_write
    constraints: { min: 0, max: 2, step: 1, precision: 0.01 }
    description: Normalized contrast/gain; 1 default.

  - name: image.gamma
    type: float
    access: read_write
    constraints: { min: 1, max: 3, step: 1, precision: 0.1 }
    description: Image gamma; default 2.2.

  - name: image.saturation
    type: float
    access: read_write
    constraints: { min: 0, max: 2, step: 1, precision: 0.01 }
    description: Normalized saturation; 1 default.

  - name: image.sharpness
    type: int
    access: read_write
    constraints: { min: -2, max: 8, step: 1, precision: 1 }

  - name: image.orientation
    type: enum
    access: read_write
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

  - name: image.connector.<name>.detectedsignal
    type: object
    access: read
    description: Signal info for a connector object (e.g. displayport1, l1hdmi). Fields include active, name, resolutions, frequencies, color_space, gamma_type, etc.

  - name: image.processing.warp.enable
    type: boolean
    access: read_write

  - name: image.processing.warp.file.enable
    type: boolean
    access: read_write

  - name: image.processing.warp.file.selected
    type: string
    access: read_write

  - name: image.processing.blend.file.enable
    type: boolean
    access: read_write

  - name: image.processing.blend.file.selected
    type: array
    items: string
    access: read_write

  - name: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write

  - name: image.processing.blacklevel.file.selected
    type: string
    access: read_write

  - name: dmx.mode
    type: string
    access: read_write

  - name: dmx.startchannel
    type: int
    access: read_write
    description: DMX start channel [1..512].

  - name: dmx.shutdown
    type: boolean
    access: read_write

  - name: network.device.lan.ip4config
    type: object
    access: read_write
    fields: { Address: string, Mask: string, Gateway: string, NameServers: string }

  - name: network.device.lan.state
    type: enum
    access: read
    values: ["CONNECTED", "DISCONNECTED"]

  - name: optics.shutter.position
    type: enum
    access: read
    values: ["Open", "Closed"]

  - name: optics.shutter.target
    type: enum
    access: read_write
    values: ["Open", "Closed"]

  - name: optics.zoom.position
    type: int
    access: read

  - name: optics.focus.position
    type: int
    access: read

  - name: optics.lensshift.horizontal.position
    type: int
    access: read

  - name: optics.lensshift.vertical.position
    type: int
    access: read

  - name: system.standby.enable
    type: boolean
    access: read_write

  - name: system.eco.enable
    type: boolean
    access: read_write

  - name: environment.alarmstate
    type: enum
    access: read
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
```

## Events
```yaml
events:
  - id: property_changed_event
    description: Unsolicited property.changed notification (see Feedbacks).
  - id: signal_callback_event
    description: Unsolicited signal.callback notification (see Feedbacks).
  - id: modelupdated
    description: Object-structure-changed signal; subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences named as macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (best-practice, not hard interlocks):
#  - Verify system.state is standby/ready before system.poweron; no-op otherwise.
#  - Verify system.state is on before system.poweroff; no-op otherwise.
#  - ECO-mode wake requires WoL / keypad / remote / serial :POWR1\r.
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing hard requirements.
```

## Notes
- The Pulse API is JSON-RPC 2.0; the same command set applies over both TCP (port 9090) and RS-232. Connection type is irrelevant to command syntax.
- Parameters are passed by name; order does not matter.
- Wait for `property.set` confirmation before re-setting the same property to avoid flooding the server.
- Notifications carry no `id` and must not be answered.
- `system.poweron` / `system.poweroff` return `null` result on success (not an error).
- Source-selection delivers two `property.changed` notifications: first emptying the previous source, then naming the new one.
- The API surface is dynamic and model/peripheral-dependent (lens motorization, DMX channel count, illumination source type). Use `introspect` to discover the exact surface of a given unit.
- `foo.echo`, `tempctrl.fans.*` references in the source are notation examples, not real commands; `ledctrl.blink` is shown as the canonical method-invocation example.

<!-- UNRESOLVED: exact model string "F80 Lens Adaptor For Fldx" not verified against source text. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication pass-code value is an example only; real credential not documented. -->
<!-- UNRESOLVED: illumination source type (laser vs LED vs lamp) is model-specific; source examples assume laser. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:27:23.073Z
last_checked_at: 2026-08-05T08:00:39.030Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:00:39.030Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 action units and declared transport values are supported by the source, with no substantial unrepresented commands. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product/model string \"F80 Lens Adaptor For Fldx\" not literally present in source text; source is the generic Pulse \"RS232 and Network Command Catalog\". Model-specific API surface (e.g. available sources, illumination source type) must be confirmed via introspection on the actual unit."
- "no explicit multi-step sequences named as macros in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "exact model string \"F80 Lens Adaptor For Fldx\" not verified against source text."
- "firmware version compatibility not stated in source."
- "authentication pass-code value is an example only; real credential not documented."
- "illumination source type (laser vs LED vs lamp) is model-specific; source examples assume laser."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
