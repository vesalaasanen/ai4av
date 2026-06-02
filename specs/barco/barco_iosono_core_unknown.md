---
spec_id: admin/barco-iosono-core
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco IOSONO Core Control Spec"
manufacturer: Barco
model_family: "IOSONO Core"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "IOSONO Core"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:32:46.530Z
last_checked_at: 2026-05-20T05:37:42.615Z
generated_at: 2026-05-20T05:37:42.615Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document describes \"Pulse API\" for Barco Pulse projectors, not IOSONO Core specifically — command availability may vary"
  - "firmware version compatibility not stated in source"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock procedures documented in source"
  - "source document describes \"Pulse API\" for Barco Pulse projectors; IOSONO Core command surface may differ significantly"
  - "HTTP file endpoint base URL uses default HTTP port — exact port not stated (only TCP JSON-RPC port 9090 documented)"
  - "illumination source type (laser/LED/xenon) varies by model — introspection required"
  - "network.device.lan.ip4config structure defined but DHCP/static configuration method not documented"
verification:
  verdict: verified
  checked_at: 2026-05-20T05:37:42.615Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched source command methods and all transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco IOSONO Core Control Spec

## Summary

Barco IOSONO Core audio/visual processor controlled via JSON-RPC 2.0 over TCP/IP or RS-232 serial. Supports power management, source selection, image adjustment (brightness, contrast, gamma, saturation, sharpness), illumination control, warp/blend/blacklevel file management, optics control (shutter, zoom, focus, lens shift), DMX, environment monitoring, and firmware updates. The source document titles the API "Pulse API" and references projector hardware throughout — the exact IOSONO Core command surface may differ.

<!-- UNRESOLVED: source document describes "Pulse API" for Barco Pulse projectors, not IOSONO Core specifically — command availability may vary -->
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
  type: passcode
  notes: "Authentication optional for normal end-user access; required for elevated access levels. Passcode sent via authenticate method."
```

## Traits

```yaml
traits:
  - powerable  # inferred: system.poweron / system.poweroff commands present
  - queryable  # inferred: property.get method and state queries present
  - levelable  # inferred: brightness, contrast, gamma, saturation, illumination power controls present
  - routable  # inferred: source selection via image.window.main.source present
```

## Actions

```yaml
actions:
  - id: authenticate
    label: Authenticate
    kind: action
    params:
      - name: code
        type: integer
        description: Secret passcode for elevated access level
    notes: "Required only for access levels above normal end user"

  - id: system_poweron
    label: Power On
    kind: action
    params: []
    method: system.poweron
    notes: "No-op if already on or in state transition"

  - id: system_poweroff
    label: Power Off
    kind: action
    params: []
    method: system.poweroff
    notes: "No-op if already off or in state transition"

  - id: property_set
    label: Set Property
    kind: action
    params:
      - name: property
        type: string
        description: "Dot-notation property name (e.g. image.brightness)"
      - name: value
        type: any
        description: Value to set
    method: property.set
    notes: "Best practice: wait for confirmation before setting same property again"

  - id: property_get
    label: Get Property
    kind: action
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of names for multi-get"
    method: property.get

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of names"
    method: property.subscribe

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of names"
    method: property.unsubscribe

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    params:
      - name: signal
        type: string
        description: "Signal name, or array of names"
    method: signal.subscribe

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    params:
      - name: signal
        type: string
        description: "Signal name, or array of names"
    method: signal.unsubscribe

  - id: introspect
    label: Introspect Object Tree
    kind: action
    params:
      - name: object
        type: string
        description: "Object name in dot notation (empty = all)"
      - name: recursive
        type: boolean
        description: "If false, list only immediate child object names"
    method: introspect

  - id: image_source_list
    label: List Available Sources
    kind: action
    params: []
    method: image.source.list

  - id: image_connector_list
    label: List Available Connectors
    kind: action
    params: []
    method: image.connector.list

  - id: set_active_source
    label: Set Active Source
    kind: action
    params:
      - name: source
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI)"
    method: property.set
    notes: "property: image.window.main.source"

  - id: environment_getcontrolblocks
    label: Get Environment Sensor Data
    kind: action
    params:
      - name: type
        type: string
        description: "Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)"
      - name: valuetype
        type: string
        description: "Value type (Temperature, Speed, Voltage, etc.)"
    method: environment.getcontrolblocks

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: action
    params: []
    method: environment.getalarminfo

  - id: illumination_clo_engage
    label: Engage CLO
    kind: action
    params: []
    method: illumination.clo.engage
    notes: "Engage Constant Light Output at current light level"

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: action
    params: []
    method: firmware.listcomponents

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: action
    params: []
    method: firmware.listcomponentversionstatus

  - id: firmware_scheduleupgrade
    label: Schedule Firmware Upgrade
    kind: action
    params: []
    method: firmware.schedulecomponentupgrade
    notes: "Schedules upgrade at next reboot"

  - id: dmx_listmodes
    label: List DMX Modes
    kind: action
    params: []
    method: dmx.listmodes

  - id: dmx_listchannels
    label: List DMX Channels
    kind: action
    params: []
    method: dmx.listchannels

  - id: image_source_listconnectors
    label: List Connectors for Source
    kind: action
    params:
      - name: source_object_name
        type: string
        description: "Source object name (e.g. displayport1 derived from 'DisplayPort 1')"
    method: "image.source.[name].listconnectors"
    notes: "Source name translated: remove non-word chars, lowercase"

  - id: eco_wake_serial
    label: Wake from ECO Mode (Serial)
    kind: action
    params: []
    notes: "Send ASCII ':POWR1\\r' on RS232 serial port"
  - id: illumination_laser_power_set
    label: Set Laser Power
    kind: action
    method: property.set
    params:
      - name: value
        type: float
        description: "Target laser power in percent"
    notes: "property: illumination.sources.laser.power"

  - id: illumination_laser_minpower_get
    label: Get Laser Minimum Power
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        description: "illumination.sources.laser.minpower"
    notes: "Read-only: minimum laser power in percent"

  - id: illumination_laser_maxpower_get
    label: Get Laser Maximum Power
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        description: "illumination.sources.laser.maxpower"
    notes: "Read-only: maximum laser power in percent"

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    method: illumination.laser.getserialnumber
    params: []

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Preset to Custom
    kind: action
    method: image.color.p7.custom.copypresettocustom
    params:
      - name: presetname
        type: string
        description: "Name of the preset to copy to custom"

  - id: image_color_p7_custom_resetpreset
    label: Reset Preset to Default
    kind: action
    method: image.color.p7.custom.resetpreset
    params:
      - name: presetname
        type: string
        description: "Name of the preset to reset back to default values"

  - id: image_color_p7_custom_resettonative
    label: Reset to Native
    kind: action
    method: image.color.p7.custom.resettonative
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    method: image.color.rgbmode.nextrgbmode
    params: []
    notes: "Cycles through all possible RGB modes"
```

## Feedbacks

```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    property: system.state
    notes: "Current projector state"

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state

  - id: active_source
    type: string
    property: image.window.main.source
    notes: "Currently displayed source name"

  - id: environment_alarmstate
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: connector_detected_signal
    type: object
    property: "image.connector.[name].detectedsignal"
    notes: "Signal info including resolution, refresh rate, color space, scan type"

  - id: illumination_power
    type: float
    property: "illumination.sources.laser.power"
    notes: "Current laser power in percent"

  - id: illumination_min_power
    type: float
    property: "illumination.sources.laser.minpower"

  - id: illumination_max_power
    type: float
    property: "illumination.sources.laser.maxpower"
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
    access: read_write

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    access: read_write

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    access: read_write
    notes: "Default 2.2"

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    access: read_write

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    access: read_write

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    access: read_write

  - id: image_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    access: read_write

  - id: optics_shutter_position
    property: optics.shutter.position
    type: enum
    values: [Open, Closed]
    access: read_only

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]
    access: read_write

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer
    access: read_write

  - id: optics_focus_position
    property: optics.focus.position
    type: integer
    access: read_write

  - id: optics_lensshift_horizontal
    property: optics.lensshift.horizontal.position
    type: integer
    access: read_write

  - id: optics_lensshift_vertical
    property: optics.lensshift.vertical.position
    type: integer
    access: read_write

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: read_write

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    access: read_write
    notes: "Range 1..512"

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: read_write

  - id: network_lan_state
    property: network.device.lan.state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    access: read_only

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: read_write

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: read_write

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: read_write

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: read_write

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: read_write

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: read_write

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    access: read_write

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: read_write
```

## Events

```yaml
events:
  - id: property_changed
    description: "Unsolicited notification when a subscribed property value changes"
    method: property.changed
    payload:
      - name: property
        type: array
        description: "Array of {objectname.propertyname: value} objects"

  - id: signal_callback
    description: "Unsolicited notification when a subscribed signal fires"
    method: signal.callback
    payload:
      - name: signal
        type: array
        description: "Array of {objectname.signalname: {args}} objects"

  - id: modelupdated
    description: "Triggered when object structure changes (objects added or removed)"
    signal: modelupdated
    notes: "Subscribe via signal.subscribe; callback includes object name and isnew flag"
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Source recommends verifying system.state is standby/ready before power on,
  and on before power off. No-op if already in target state or transitioning.
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes

- All commands use JSON-RPC 2.0 format over both TCP and serial connections.
- Source object names derived by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- File uploads (warp grids, blend masks, blacklevel masks) use HTTP POST to `/api/...` endpoints, not JSON-RPC.
- API is partially dynamic — available properties/methods depend on hardware configuration and peripherals. Use introspect to discover exact surface.
- ECO wake via serial requires raw ASCII `:POWR1\r` (not JSON-RPC).

<!-- UNRESOLVED: source document describes "Pulse API" for Barco Pulse projectors; IOSONO Core command surface may differ significantly -->
<!-- UNRESOLVED: HTTP file endpoint base URL uses default HTTP port — exact port not stated (only TCP JSON-RPC port 9090 documented) -->
<!-- UNRESOLVED: illumination source type (laser/LED/xenon) varies by model — introspection required -->
<!-- UNRESOLVED: network.device.lan.ip4config structure defined but DHCP/static configuration method not documented -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:32:46.530Z
last_checked_at: 2026-05-20T05:37:42.615Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:37:42.615Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched source command methods and all transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document describes \"Pulse API\" for Barco Pulse projectors, not IOSONO Core specifically — command availability may vary"
- "firmware version compatibility not stated in source"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock procedures documented in source"
- "source document describes \"Pulse API\" for Barco Pulse projectors; IOSONO Core command surface may differ significantly"
- "HTTP file endpoint base URL uses default HTTP port — exact port not stated (only TCP JSON-RPC port 9090 documented)"
- "illumination source type (laser/LED/xenon) varies by model — introspection required"
- "network.device.lan.ip4config structure defined but DHCP/static configuration method not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
