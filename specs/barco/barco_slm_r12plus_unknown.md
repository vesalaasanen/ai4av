---
spec_id: admin/barco-slm-r12plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco SLM R12plus Control Spec"
manufacturer: Barco
model_family: "SLM R12plus"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "SLM R12plus"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:38:41.419Z
generated_at: 2026-05-14T21:38:41.419Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:38:41.419Z
  matched_actions: 35
  action_count: 35
  confidence: high
  summary: "All 35 spec actions found in source with exact method names; transport parameters (port 9090, baud 19200, serial params) verbatim; spec covers the complete Pulse API."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco SLM R12plus Control Spec

## Summary
Barco SLM R12plus projector controlled via the Pulse JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200 baud). Supports power management, source selection, illumination control, image adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/blacklevel file management, lens optics (zoom, focus, lens shift, shutter), DMX, and environmental monitoring (temperatures, fan speeds, alarms). The API uses dot-notation property paths with get/set/subscribe semantics.

<!-- UNRESOLVED: source is a generic Pulse API document; SLM R12plus-specific source list, connector list, and available illumination sources may differ from examples shown -->

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
  type: passcode  # source: "authentication request containing a secret pass code"
  # note: auth skippable for normal end-user access level
```

## Traits
```yaml
traits:
  - powerable  # inferred: system.poweron / system.poweroff methods
  - queryable  # inferred: property.get for all readable properties
  - routable  # inferred: image.window.main.source select + image.source.list
  - levelable  # inferred: brightness, contrast, gamma, saturation, sharpness, laser power
```

## Actions
```yaml
actions:
  - id: system_poweron
    label: Power On
    kind: action
    params: []
    jsonrpc:
      method: system.poweron

  - id: system_poweroff
    label: Power Off
    kind: action
    params: []
    jsonrpc:
      method: system.poweroff

  - id: set_property
    label: Set Property
    kind: action
    params:
      - name: property
        type: string
        description: Dot-notation property path (e.g. image.brightness)
      - name: value
        type: any
        description: Value to set (type depends on property)
    jsonrpc:
      method: property.set

  - id: get_property
    label: Get Property
    kind: action
    params:
      - name: property
        type: string
        description: Dot-notation property path
    jsonrpc:
      method: property.get

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    params:
      - name: property
        type: string_or_array
        description: Single property name or array of property names
    jsonrpc:
      method: property.subscribe

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    params:
      - name: property
        type: string_or_array
        description: Single property name or array of property names
    jsonrpc:
      method: property.unsubscribe

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    params:
      - name: signal
        type: string_or_array
        description: Signal name or array of signal names
    jsonrpc:
      method: signal.subscribe

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    params:
      - name: signal
        type: string_or_array
        description: Signal name or array of signal names
    jsonrpc:
      method: signal.unsubscribe

  - id: introspect
    label: Introspect Object Metadata
    kind: action
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty for root)
      - name: recursive
        type: boolean
        description: Recurse into sub-objects (default true)
    jsonrpc:
      method: introspect

  - id: authenticate
    label: Authenticate
    kind: action
    params:
      - name: code
        type: integer
        description: Secret pass code for elevated access level
    jsonrpc:
      method: authenticate

  - id: select_source
    label: Select Input Source
    kind: action
    params:
      - name: source
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI, DVI 1)"
    jsonrpc:
      method: property.set
      note: "property: image.window.main.source"

  - id: list_sources
    label: List Available Sources
    kind: action
    params: []
    jsonrpc:
      method: image.source.list

  - id: list_connectors
    label: List Available Connectors
    kind: action
    params: []
    jsonrpc:
      method: image.connector.list

  - id: list_source_connectors
    label: List Connectors for Source
    kind: action
    params:
      - name: source_object_name
        type: string
        description: "Source name lowercased with non-word chars removed (e.g. displayport1)"
    jsonrpc:
      method: "image.source.[name].listconnectors"

  - id: set_warp_enable
    label: Enable/Disable Warp
    kind: action
    params:
      - name: enable
        type: boolean
    jsonrpc:
      method: property.set
      note: "property: image.processing.warp.enable"

  - id: set_warp_file
    label: Select Warp File
    kind: action
    params:
      - name: filename
        type: string
        description: "Uploaded warp grid filename (e.g. warp.xml)"
    jsonrpc:
      method: property.set
      note: "property: image.processing.warp.file.selected"

  - id: set_warp_file_enable
    label: Enable/Disable File Warp
    kind: action
    params:
      - name: enable
        type: boolean
    jsonrpc:
      method: property.set
      note: "property: image.processing.warp.file.enable"

  - id: select_blend_file
    label: Select Blend File
    kind: action
    params:
      - name: filename
        type: string
        description: "Uploaded blend mask filename (e.g. mask.png)"
    jsonrpc:
      method: property.set
      note: "property: image.processing.blend.file.selected"

  - id: set_blend_enable
    label: Enable/Disable Blend
    kind: action
    params:
      - name: enable
        type: boolean
    jsonrpc:
      method: property.set
      note: "property: image.processing.blend.file.enable"

  - id: select_blacklevel_file
    label: Select Black Level File
    kind: action
    params:
      - name: filename
        type: string
        description: "Uploaded black level mask filename"
    jsonrpc:
      method: property.set
      note: "property: image.processing.blacklevel.file.selected"

  - id: set_blacklevel_enable
    label: Enable/Disable Black Level Correction
    kind: action
    params:
      - name: enable
        type: boolean
    jsonrpc:
      method: property.set
      note: "property: image.processing.blacklevel.file.enable"

  - id: environment_getcontrolblocks
    label: Get Environment Sensor Data
    kind: action
    params:
      - name: type
        type: string
        description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
      - name: valuetype
        type: string
        description: "Value type: Temperature, Speed, Voltage, Current, etc."
    jsonrpc:
      method: environment.getcontrolblocks

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: action
    params: []
    jsonrpc:
      method: environment.getalarminfo

  - id: illumination_clo_engage
    label: Engage Constant Light Output
    kind: action
    params: []
    jsonrpc:
      method: illumination.clo.engage

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: action
    params: []
    jsonrpc:
      method: illumination.laser.getserialnumber

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: action
    params: []
    jsonrpc:
      method: firmware.listcomponents

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: action
    params: []
    jsonrpc:
      method: firmware.listcomponentversionstatus

  - id: firmware_scheduleupgrade
    label: Schedule Firmware Upgrade
    kind: action
    params: []
    jsonrpc:
      method: firmware.schedulecomponentupgrade

  - id: dmx_listmodes
    label: List DMX Modes
    kind: action
    params: []
    jsonrpc:
      method: dmx.listmodes

  - id: dmx_listchannels
    label: List DMX Channels
    kind: action
    params: []
    jsonrpc:
      method: dmx.listchannels

  - id: color_copypresettocustom
    label: Copy Color Preset to Custom
    kind: action
    params:
      - name: presetname
        type: string
    jsonrpc:
      method: image.color.p7.custom.copypresettocustom

  - id: color_resetpreset
    label: Reset Color Preset
    kind: action
    params:
      - name: presetname
        type: string
    jsonrpc:
      method: image.color.p7.custom.resetpreset

  - id: color_resettonative
    label: Reset Color to Native
    kind: action
    params: []
    jsonrpc:
      method: image.color.p7.custom.resettonative

  - id: nextrgbmode
    label: Cycle RGB Mode
    kind: action
    params: []
    jsonrpc:
      method: image.color.rgbmode.nextrgbmode

  - id: eco_wake_serial
    label: Wake from ECO Mode (Serial)
    kind: action
    params: []
    note: "Send ASCII ':POWR1\\r' on RS-232 serial port"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, "on", deconditioning, service, error]
    jsonrpc:
      method: property.get
      property: system.state

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    jsonrpc:
      method: property.get
      property: illumination.state

  - id: active_source
    type: string
    jsonrpc:
      method: property.get
      property: image.window.main.source

  - id: available_sources
    type: array
    description: "List of available source names (varies by projector model)"
    jsonrpc:
      method: image.source.list

  - id: connector_detected_signal
    type: object
    description: "Detected signal info for a connector (active, name, resolution, freq, color space, etc.)"
    jsonrpc:
      method: property.get
      property: "image.connector.[name].detectedsignal"

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    jsonrpc:
      method: property.get
      property: environment.alarmstate

  - id: alarm_info
    type: array
    description: "Array of alarm objects with severity, timestamp, source, description, custommessage"
    jsonrpc:
      method: environment.getalarminfo

  - id: laser_power
    type: float
    description: "Current laser power in percent"
    jsonrpc:
      method: property.get
      property: illumination.sources.laser.power

  - id: laser_min_power
    type: float
    jsonrpc:
      method: property.get
      property: illumination.sources.laser.minpower

  - id: laser_max_power
    type: float
    jsonrpc:
      method: property.get
      property: illumination.sources.laser.maxpower

  - id: image_brightness
    type: float
    description: "Normalized brightness, 0=default, range -1 to 1"
    jsonrpc:
      method: property.get
      property: image.brightness

  - id: image_contrast
    type: float
    description: "Normalized contrast, 1=default, range 0 to 2"
    jsonrpc:
      method: property.get
      property: image.contrast

  - id: image_gamma
    type: float
    description: "Gamma value, default 2.2, range 1 to 3"
    jsonrpc:
      method: property.get
      property: image.gamma

  - id: image_saturation
    type: float
    description: "Normalized saturation, 1=default, range 0 to 2"
    jsonrpc:
      method: property.get
      property: image.saturation

  - id: image_sharpness
    type: integer
    description: "Sharpness, range -2 to 8"
    jsonrpc:
      method: property.get
      property: image.sharpness

  - id: image_orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    jsonrpc:
      method: property.get
      property: image.orientation

  - id: shutter_position
    type: enum
    values: ["Open", "Closed"]
    jsonrpc:
      method: property.get
      property: optics.shutter.position

  - id: zoom_position
    type: integer
    jsonrpc:
      method: property.get
      property: optics.zoom.position

  - id: focus_position
    type: integer
    jsonrpc:
      method: property.get
      property: optics.focus.position

  - id: lensshift_horizontal
    type: integer
    jsonrpc:
      method: property.get
      property: optics.lensshift.horizontal.position

  - id: lensshift_vertical
    type: integer
    jsonrpc:
      method: property.get
      property: optics.lensshift.vertical.position

  - id: network_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    jsonrpc:
      method: property.get
      property: network.device.lan.state

  - id: firmware_version_status
    type: array
    description: "Components with available, running versions and upgrade status"
    jsonrpc:
      method: firmware.listcomponentversionstatus
```

## Variables
```yaml
variables:
  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    precision: 0.01
    description: "Normalized brightness/offset, 0=default"

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    precision: 0.01
    description: "Normalized contrast/gain, 1=default"

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    precision: 0.1
    description: "Gamma, default 2.2"

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    precision: 0.01
    description: "Normalized saturation, 1=default"

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    description: "Sharpness value"

  - id: laser_power
    property: illumination.sources.laser.power
    type: float
    description: "Target laser power in percent"
    # UNRESOLVED: min/max are dynamic, read from illumination.sources.laser.minpower/maxpower

  - id: scaling_mode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: shutter_target
    property: optics.shutter.target
    type: enum
    values: ["Open", "Closed"]

  - id: zoom_position
    property: optics.zoom.position
    type: integer

  - id: focus_position
    property: optics.focus.position
    type: integer

  - id: lensshift_horizontal
    property: optics.lensshift.horizontal.position
    type: integer

  - id: lensshift_vertical
    property: optics.lensshift.vertical.position
    type: integer

  - id: dmx_mode
    property: dmx.mode
    type: string

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    description: "DMX start channel 1-512"

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean

  - id: standby_enable
    property: system.standby.enable
    type: boolean

  - id: eco_enable
    property: system.eco.enable
    type: boolean

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    description: "Array of selected blend filenames"

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
```

## Events
```yaml
events:
  - id: property_changed
    description: "Pushed when a subscribed property value changes. Contains array of property/value pairs."
    jsonrpc:
      method: property.changed

  - id: signal_callback
    description: "Pushed when a subscribed signal is emitted. Contains array of signal/argument pairs."
    jsonrpc:
      method: signal.callback

  - id: modelupdated
    description: "Triggered when the object structure changes (objects added or removed)."
    jsonrpc:
      signal: modelupdated
      note: "Subscribe via signal.subscribe; callback includes object name and isnew flag"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Best practice: verify system.state is standby or ready before issuing system.poweron"
  - "Best practice: verify system.state is on before issuing system.poweroff"
  - "Best practice: wait for property.set confirmation before setting same property again"
# UNRESOLVED: no explicit safety interlocks or power-on sequencing requirements stated in source
```

## Notes
- All commands use JSON-RPC 2.0 format over both TCP and serial connections. Same command set available on all connection types.
- Property paths use dot notation in lowercase (e.g. `image.brightness`, `illumination.sources.laser.power`).
- Source names translate to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- File uploads (warp grids, blend masks, black level masks) use HTTP POST to `http://<projector_ip>/api/<endpoint>`. File downloads use HTTP GET on the same URL.
- Warp grid file format is the same as Barco MCM500/400.
- Blend and black level masks must be grayscale PNG/JPEG/TIFF matching the projector's blend layer resolution.
- The API is partially dynamic; available properties/methods depend on projector configuration and peripherals. Use `introspect` for the exact API of a specific projector.
- ECO wake-up via serial sends ASCII `:POWR1\r` (distinct from the JSON-RPC API).
- `environment.getcontrolblocks` returns sensor dictionaries keyed by sensor name. Supported sensor types: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock. Value types include Temperature, Speed, Voltage, Current, PWM, Humidity, Pressure, and many others.
- Authentication is passcode-based; normal end-user access does not require authentication.

<!-- UNRESOLVED: source document covers the generic Pulse API; SLM R12plus-specific available sources, connectors, and illumination source types (laser vs LED vs lamp) not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: serial ECO wake command `:POWR1\r` details — is this the only out-of-band serial command, or are there others? -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:38:41.419Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:38:41.419Z
matched_actions: 35
action_count: 35
confidence: high
summary: "All 35 spec actions found in source with exact method names; transport parameters (port 9090, baud 19200, serial params) verbatim; spec covers the complete Pulse API."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
