---
spec_id: admin/barco-fs704k6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco FS704K6 Control Spec"
manufacturer: Barco
model_family: FS704K6
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - FS704K6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-15T21:12:44.366Z
generated_at: 2026-05-15T21:12:44.366Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-15T21:12:44.366Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched verbatim in source; transport parameters verified; complete API coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Barco FS704K6 Control Spec

## Summary
Barco FS704K6 is a Pulse-series projector controllable via JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial. The API provides power management, source selection, illumination control, picture adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/black-level file management, optics (shutter, zoom, focus, lens shift), DMX, environment monitoring, and firmware management. Authentication with a passcode is required only for elevated access levels; normal end-user control requires no authentication.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact list of available sources varies by projector model — source lists example names but states "list contents will vary depending on the projector model" -->

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
  type: none  # inferred: normal end-user access requires no authentication; elevated access uses passcode via "authenticate" method
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff commands
  - queryable    # inferred from property.get queries
  - routable     # inferred from source selection commands
  - levelable    # inferred from brightness, contrast, laser power controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    method: system.poweron
    params: []

  - id: power_off
    label: Power Off
    kind: action
    method: system.poweroff
    params: []

  - id: set_property
    label: Set Property
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "Dot-notation property name (e.g. image.window.main.source)"
      - name: value
        type: any
        description: "Value to set - type depends on property"

  - id: get_property
    label: Get Property
    kind: action
    method: property.get
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of property names for multi-get"

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of names for multi-subscribe"

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of names"

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string
        description: "Signal name, or array of signal names"

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: "Signal name, or array of signal names"

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: "Secret pass code to elevate access level"

  - id: introspect
    label: Introspect Objects
    kind: action
    method: introspect
    params:
      - name: object
        type: string
        description: "Object name in dot notation (empty for all)"
      - name: recursive
        type: boolean
        description: "If false, list only immediate child object names"

  - id: list_sources
    label: List Available Sources
    kind: action
    method: image.source.list
    params: []

  - id: list_connectors
    label: List Connectors
    kind: action
    method: image.connector.list
    params: []

  - id: list_source_connectors
    label: List Connectors for Source
    kind: action
    method: "image.source.{sourceName}.listconnectors"
    params: []

  - id: get_environment_controlblocks
    label: Get Environment Sensor Data
    kind: action
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
      - name: valuetype
        type: string
        description: "Value type: Temperature, Speed, PWM, Voltage, Current, Power, etc."

  - id: get_alarm_info
    label: Get Alarm Info
    kind: action
    method: environment.getalarminfo
    params: []

  - id: list_dmx_channels
    label: List DMX Channels
    kind: action
    method: dmx.listchannels
    params: []

  - id: list_dmx_modes
    label: List DMX Modes
    kind: action
    method: dmx.listmodes
    params: []

  - id: list_firmware_components
    label: List Firmware Components
    kind: action
    method: firmware.listcomponents
    params: []

  - id: list_firmware_version_status
    label: List Firmware Version Status
    kind: action
    method: firmware.listcomponentversionstatus
    params: []

  - id: schedule_firmware_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
    params: []

  - id: engage_clo
    label: Engage CLO
    kind: action
    method: illumination.clo.engage
    params: []

  - id: get_laser_serial
    label: Get Laser Serial Number
    kind: action
    method: illumination.laser.getserialnumber
    params: []

  - id: copy_color_preset_to_custom
    label: Copy Color Preset to Custom
    kind: action
    method: image.color.p7.custom.copypresettocustom
    params:
      - name: presetname
        type: string
        description: "Name of the preset to copy"

  - id: reset_color_preset
    label: Reset Color Preset
    kind: action
    method: image.color.p7.custom.resetpreset
    params:
      - name: presetname
        type: string
        description: "Name of the preset to reset"

  - id: reset_color_to_native
    label: Reset Color to Native
    kind: action
    method: image.color.p7.custom.resettonative
    params: []

  - id: next_rgb_mode
    label: Cycle RGB Mode
    kind: action
    method: image.color.rgbmode.nextrgbmode
    params: []

  - id: eco_wake_serial
    label: ECO Wake (Serial)
    kind: action
    description: "Wake projector from ECO mode via RS-232 serial port"
    command: ":POWR1\\r"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    property: system.state
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    description: "Current projector state"

  - id: illumination_state
    type: enum
    property: illumination.state
    values: [On, Off]
    description: "Illumination on/off state"

  - id: laser_power
    type: float
    property: illumination.sources.laser.power
    description: "Current laser power level in percent"

  - id: laser_min_power
    type: float
    property: illumination.sources.laser.minpower
    description: "Minimum laser power in percent"

  - id: laser_max_power
    type: float
    property: illumination.sources.laser.maxpower
    description: "Maximum laser power in percent"

  - id: active_source
    type: string
    property: image.window.main.source
    description: "Currently active source name"

  - id: available_sources
    type: array
    method: image.source.list
    description: "List of available source names"

  - id: brightness
    type: float
    property: image.brightness
    description: "Image brightness, range -1 to 1"

  - id: contrast
    type: float
    property: image.contrast
    description: "Image contrast, range 0 to 2"

  - id: gamma
    type: float
    property: image.gamma
    description: "Image gamma, range 1 to 3"

  - id: saturation
    type: float
    property: image.saturation
    description: "Image saturation, range 0 to 2"

  - id: sharpness
    type: integer
    property: image.sharpness
    description: "Image sharpness, range -2 to 8"

  - id: image_orientation
    type: enum
    property: image.orientation
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: scaling_mode
    type: enum
    property: image.window.main.scalingmode
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: shutter_position
    type: enum
    property: optics.shutter.position
    values: [Open, Closed]

  - id: shutter_target
    type: enum
    property: optics.shutter.target
    values: [Open, Closed]

  - id: zoom_position
    type: integer
    property: optics.zoom.position

  - id: focus_position
    type: integer
    property: optics.focus.position

  - id: lensshift_horizontal
    type: integer
    property: optics.lensshift.horizontal.position

  - id: lensshift_vertical
    type: integer
    property: optics.lensshift.vertical.position

  - id: alarm_state
    type: enum
    property: environment.alarmstate
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: network_state
    type: enum
    property: network.device.lan.state
    values: [CONNECTED, DISCONNECTED]

  - id: connector_detected_signal
    type: object
    property: "image.connector.{name}.detectedsignal"
    description: "Detected signal info including resolution, frequency, color space, etc."

  - id: firmware_versions
    type: array
    method: firmware.listcomponentversionstatus
    description: "Per-component firmware versions and upgrade status"
```

## Variables
```yaml
variables:
  - id: laser_power_level
    property: illumination.sources.laser.power
    type: float
    min: null  # UNRESOLVED: min value is dynamic - read illumination.sources.laser.minpower
    max: null  # UNRESOLVED: max value is dynamic - read illumination.sources.laser.maxpower

  - id: brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step: 0.01

  - id: contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step: 0.1

  - id: saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8

  - id: active_source
    property: image.window.main.source
    type: string

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: scaling_mode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: shutter
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]

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

  - id: dmx_start_channel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string

  - id: standby_enable
    property: system.standby.enable
    type: boolean

  - id: eco_enable
    property: system.eco.enable
    type: boolean
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Sent when a subscribed property value changes"
    params:
      - name: property
        type: array
        description: "Array of {property_name: value} objects"

  - id: signal_callback
    method: signal.callback
    description: "Sent when a subscribed signal is emitted"
    params:
      - name: signal
        type: array
        description: "Array of {signal_name: arguments} objects"

  - id: model_updated
    signal: modelupdated
    description: "Sent when the object structure changes (objects added or removed)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source beyond the
# warp/blend/blacklevel upload-then-select-then-enable workflows (documented as Notes below)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on should verify projector is in standby or ready state first.
# Power off should verify projector is in on state first.
# ECO mode wake-up requires special serial command or Wake-on-LAN.
# No explicit safety interlocks documented in source.
```

## Notes
- All commands use JSON-RPC 2.0 framing over both TCP and serial connections. The same command set applies regardless of transport.
- **ECO wake-up** requires either Wake-on-LAN, physical power button, or the special serial-only ASCII command `:POWR1\r`.
- **Best practice:** wait for `property.set` confirmation before re-setting the same property; continuous setting without confirmation may flood the server.
- **Source selection** produces two notifications: one with empty string (deselection of old source), then one with new source name.
- **File uploads** (warp grids, blend masks, black level masks) use HTTP POST to `http://{projector-ip}/api/{endpoint}`, separate from the JSON-RPC channel. Supported formats: PNG (up to 16-bit), JPEG, TIFF (grayscale only; color images use blue channel).
- **Dynamic API:** the exact set of available properties/methods depends on projector configuration, installed peripherals, and mode (e.g. DMX extended mode exposes more channels). Use the `introspect` method to discover the live API.
- **Authentication** is only required for elevated access; normal end-user control skips the `authenticate` step entirely.
- Laser power min/max values are dynamic and may change based on lens type and position.
- Connector signal detection property `image.connector.{name}.detectedsignal` returns detailed timing info (resolution, sync parameters, color space, chroma sampling, HDR gamma type, etc.).

<!-- UNRESOLVED: HTTP file endpoint base URL path is constructed from projector IP — no fixed base URL stated -->
<!-- UNRESOLVED: exact connector and source names vary by projector configuration -->
<!-- UNRESOLVED: zoom/focus/lens shift position value ranges not stated -->
<!-- UNRESOLVED: window position and size coordinate system/ranges not stated -->
<!-- UNRESOLVED: color preset names and color management properties not fully documented -->
<!-- UNRESOLVED: firmware upgrade command parameters not specified beyond method name -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-15T21:12:44.366Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:12:44.366Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched verbatim in source; transport parameters verified; complete API coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
