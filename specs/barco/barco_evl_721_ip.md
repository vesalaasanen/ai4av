---
spec_id: admin/barco-evl-721
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Evl 721 Control Spec"
manufacturer: Barco
model_family: "Barco Evl 721"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Evl 721"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:17:25.065Z
last_checked_at: 2026-08-05T07:30:22.943Z
generated_at: 2026-08-05T07:30:22.943Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. API surface is dynamic and depends on projector configuration/peripherals (e.g. motorized lens, DMX extended mode) — full API requires runtime introspection."
  - "no explicit multi-step named macros documented as presets in source."
  - "no hardware interlock voltages/currents, lamp-cooldown lockouts, or error-recovery sequences stated in source beyond the state-machine notes above."
  - "firmware version compatibility not stated."
  - "authentication code format/scheme not specified beyond a numeric example (code: 98765)."
  - "no binary framing details for serial JSON-RPC transport stated (message delimiters/framing unspecified)."
  - "voltage/current/power hardware specifications not in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:30:22.943Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions map to JSON-RPC methods or the ECO serial sequence documented verbatim in the source; transport parameters (port 9090, 19200/8N1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Evl 721 Control Spec

## Summary
Barco Evl 721 is a Pulse-platform projector controlled via the Pulse JSON-RPC 2.0 API. The device accepts commands over TCP/IP (port 9090) and over an RS-232 serial link. Operations include power control, source selection, image adjustment (brightness/contrast/gamma/saturation/sharpness), illumination (laser) power control, lens optics, warp/blend/black-level file management, DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: firmware version compatibility not stated in source. API surface is dynamic and depends on projector configuration/peripherals (e.g. motorized lens, DMX extended mode) — full API requires runtime introspection. -->

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
  type: none  # inferred: authentication optional; normal end-user access skips auth. `authenticate` method exists for elevated access levels (code-based).
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff methods present
  - queryable    # inferred: property.get and list methods present
  - levelable    # inferred: brightness/contrast/laser power settable float values present
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP (port 9090) or RS-232. Each entry below is one distinct
# JSON-RPC method (or, for the ECO wake command, one ASCII serial sequence).
# Parameterized methods (property.set/get/subscribe/unsubscribe) are single
# actions; settable targets are listed under Variables.
actions:
  - id: system_poweron
    label: Power On
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
    params: []

  - id: system_poweroff
    label: Power Off
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
    params: []

  - id: authenticate
    label: Authenticate (elevated access)
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {code}}}'
    params:
      - name: code
        type: integer
        description: Secret pass code setting the user access level.

  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": {property}, "value": {value}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name (see Variables for settable targets).
      - name: value
        type: any
        description: Value to set; type depends on the target property.

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": {property}}}'
    params:
      - name: property
        type: string
        description: Dot-notation property name, or array of names for multi-get.

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": {property}}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": {property}}}'
    params:
      - name: property
        type: string
        description: Property name or array of property names.

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": {signal}}}'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated) or array of names.

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": {signal}}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of names.

  - id: introspect
    label: Introspect Object Metadata
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": {object}, "recursive": {recursive}}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty introspects everything.
      - name: recursive
        type: boolean
        description: If false, only one level of object names is listed.

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
    params: []

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
    params: []

  - id: image_source_listconnectors
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.{name}.listconnectors"}'
    params:
      - name: name
        type: string
        description: Source object name (source name lowercased, non-word chars removed; e.g. displayport1).

  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": {type}, "valuetype": {valuetype}}}'
    params:
      - name: type
        type: string
        description: Sensor type enum (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock).
      - name: valuetype
        type: string
        description: Value type enum (Temperature, Speed, Voltage, Current, Power, ...).

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
    params: []

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
    params: []

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
    params: []

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
    params: []

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
    params: []

  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
    params: []

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
    params: []

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": {presetname}}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Custom Color Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": {presetname}}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset.

  - id: image_color_p7_custom_resettonative
    label: Reset Custom Color To Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Cycle To Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
    params: []

  - id: eco_wake_serial
    label: Wake From ECO Mode (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII serial sequence used to wake a projector in ECO/power-save mode over RS-232. Wake-on-LAN, IR remote, or keypad also wake the device.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    property: system.state
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    description: Current operating state of the projector.

  - id: illumination_state
    type: enum
    property: illumination.state
    values: ["On", "Off"]
    description: Whether the light source is on or off.

  - id: active_source
    type: string
    property: image.window.main.source
    description: Name of the source currently displayed in the main window.

  - id: environment_alarmstate
    type: enum
    property: environment.alarmstate
    values: [Fatal, Error, Alert, Warning, Ok]
    description: Aggregate alarm state.

  - id: network_lan_state
    type: enum
    property: network.device.lan.state
    values: [CONNECTED, DISCONNECTED]
    description: LAN device connection state.

  - id: illumination_laser_power
    type: number
    property: illumination.sources.laser.power
    description: Current laser power level in percent.

  - id: illumination_laser_minpower
    type: number
    property: illumination.sources.laser.minpower
    access: read_only
    description: Minimum laser power level in percent (dynamic).

  - id: illumination_laser_maxpower
    type: number
    property: illumination.sources.laser.maxpower
    access: read_only
    description: Maximum laser power level in percent (dynamic).

  - id: connector_detectedsignal
    type: object
    property: image.connector.{name}.detectedsignal
    description: Signal info for a connector (active, name, resolutions, timings, color space, etc.). Disregard fields when active is false.
```

## Variables
```yaml
variables:
  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: Normalized brightness/offset; 0 default, 1 = 100% offset.

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Normalized contrast/gain; 1 default.

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: Image gamma; default 2.2.

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Normalized color saturation; 1 default.

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step_size: 1
    precision: 1

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: illumination_laser_power_set
    property: illumination.sources.laser.power
    type: float
    description: Target laser power in percent. Bounds dynamic - consult minpower/maxpower.

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    description: Globally enable/disable all warp functions.

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    description: Selected warp grid file. Upload via HTTP POST to /api/image/processing/warp/file/transfer.

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    items: string
    description: Selected blend mask files. Upload via HTTP POST to /api/image/processing/blend/file/transfer.

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    description: Selected black-level mask file. Upload via HTTP POST to /api/image/processing/blacklevel/file/transfer.

  - id: dmx_mode
    property: dmx.mode
    type: string

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    description: Enable/disable standby state availability.

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    description: Enable/disable ECO state availability.
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification carrying an array of changed property/value pairs. No request id; client must not respond.
    payload: array of {property: value} objects.

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification carrying an array of emitted signal/argument-list pairs. No request id; client must not respond.

  - id: modelupdated
    method: signal (subscribe via signal.subscribe)
    description: Triggered when the object structure changes (objects added or removed). Callback delivered via signal.callback as introspect.objectchanged.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named macros documented as presets in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on: "Verify system.state is standby or ready before issuing system.poweron; command is a no-op if already on or in transition."
  - power_off: "Verify system.state is on before issuing system.poweroff; command is a no-op if already off or in transition."
  - property_set_rate: "Wait for property.set confirmation before re-setting the same property; flooding the server degrades performance."
# UNRESOLVED: no hardware interlock voltages/currents, lamp-cooldown lockouts, or error-recovery sequences stated in source beyond the state-machine notes above.
```

## Notes
- API is JSON-RPC 2.0. Requests may omit `params` when no arguments are needed; `id` is optional but required to receive a result response. Notifications (server-initiated) carry no `id` and must not be answered.
- Object/property naming is dot-notation, lowercase (JavaScript-like). Source and connector object names are derived by stripping non-word characters and lowercasing (e.g. "DisplayPort 1" → `displayport1`).
- Source/connector list contents vary by projector model and fitted hardware.
- File endpoints (warp grid, blend mask, black-level mask) are HTTP POST upload + JSON-RPC select/enable; supported image formats: PNG (up to 16-bit), JPEG, TIFF. Interface uses grayscale only (blue channel if RGB supplied).
- ECO-mode wake requires Wake-on-LAN, IR remote, keypad, or the `:POWR1\r` ASCII serial sequence — JSON-RPC `system.poweron` does not wake from ECO.
- Warp file format matches MCM500/400.
- Best practice: use `introspect` at runtime to discover the exact API surface for a given unit/configuration.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: authentication code format/scheme not specified beyond a numeric example (code: 98765). -->
<!-- UNRESOLVED: no binary framing details for serial JSON-RPC transport stated (message delimiters/framing unspecified). -->
<!-- UNRESOLVED: voltage/current/power hardware specifications not in source. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:17:25.065Z
last_checked_at: 2026-08-05T07:30:22.943Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:30:22.943Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions map to JSON-RPC methods or the ECO serial sequence documented verbatim in the source; transport parameters (port 9090, 19200/8N1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. API surface is dynamic and depends on projector configuration/peripherals (e.g. motorized lens, DMX extended mode) — full API requires runtime introspection."
- "no explicit multi-step named macros documented as presets in source."
- "no hardware interlock voltages/currents, lamp-cooldown lockouts, or error-recovery sequences stated in source beyond the state-machine notes above."
- "firmware version compatibility not stated."
- "authentication code format/scheme not specified beyond a numeric example (code: 98765)."
- "no binary framing details for serial JSON-RPC transport stated (message delimiters/framing unspecified)."
- "voltage/current/power hardware specifications not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
