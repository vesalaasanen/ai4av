---
schema_version: ai4av-public-spec-v1
device_id: barco/udx-4k22
entity_id: barco_hodr_series
spec_id: admin/barco-hodr-series
revision: 1
author: admin
title: "Barco Pulse Projector Control Spec"
status: published
manufacturer: Barco
manufacturer_key: barco
model_family: UDX-4K22
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - UDX-4K22
    - UDX-4K32
    - UDX-W32
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
source_documents:
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.269Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.425Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.514Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:53.622Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.418Z
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-04-23T15:19:25.936Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - image.source.list
  - image.connector.list
  - image.processing.blend
  - image.processing.blacklevel
  - environment.getcontrolblocks
  - led.activity
  - led.list
  - lightmeasurement.getlightoutput
  - network.list
  - notification.dismiss
  - notification.list
  - signal.subscribe
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:19:25.936Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 spec actions matched literally; transport parameters verified; spec properly represents the Pulse JSON-RPC API core command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Barco Pulse Projector Control Spec

## Summary
Barco Pulse-based projectors (UDX and Hodr series) controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. The API provides power control, source selection, image adjustment (brightness, contrast, saturation, gamma, sharpness), illumination management, warp/blend processing, lens motor control, test patterns, environmental monitoring, and notification management. All commands are identical across TCP and serial transports.

<!-- UNRESOLVED: exact Hodr series model names not listed in this document; source primarily references UDX-4K22, UDX-4K32, UDX-W32 -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

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
  # Source states authentication is required for elevated access levels.
  # End-user access can skip authentication. Passcode is numeric (e.g. 98765).
  # Full auth mechanism: {"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <passcode>}}
```

## Traits
```yaml
traits:
  - powerable     # system.poweron / system.poweroff commands
  - queryable     # property.get for all readable properties
  - routable      # image.window.main.source for input routing
  - levelable     # brightness, contrast, saturation, gamma, sharpness, laser power, intensity
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    method: system.poweron
    params: []
    description: Powers on the projector. No-op if already on or transitioning.

  - id: power_off
    label: Power Off
    kind: action
    method: system.poweroff
    params: []
    description: Powers off the projector. No-op if already off or transitioning.

  - id: goto_ready
    label: Go to Ready
    kind: action
    method: system.gotoready
    params: []

  - id: goto_eco
    label: Go to Eco
    kind: action
    method: system.gotoeco
    params: []

  - id: reboot
    label: Reboot
    kind: action
    method: system.reboot
    params: []
    description: Reboots the projector (powers off first).

  - id: select_source
    label: Select Input Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.window.main.source"
        description: Fixed property name
      - name: value
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI, HDBaseT, SDI, DVI 1)"
    description: Sets the active input source for the main window.

  - id: set_brightness
    label: Set Brightness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.brightness"
      - name: value
        type: float
        description: "Normalized brightness offset. Range -1 to 1, step 0.01, default 0."

  - id: set_contrast
    label: Set Contrast
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.contrast"
      - name: value
        type: float
        description: "Normalized contrast gain. Range 0 to 2, step 0.01, default 1."

  - id: set_saturation
    label: Set Saturation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.saturation"
      - name: value
        type: float
        description: "Normalized saturation. Range 0 to 2, step 0.01, default 1."

  - id: set_gamma
    label: Set Gamma
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.gamma"
      - name: value
        type: float
        description: "Gamma value. Range 1 to 3, step 0.1, default 2.2."

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.sharpness"
      - name: value
        type: integer
        description: "Range -2 to 8, step 1."

  - id: set_intensity
    label: Set Intensity
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.intensity"
      - name: value
        type: float
        description: "Range 0 to 1, step 0.01."

  - id: set_laser_power
    label: Set Laser Power
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "illumination.sources.laser.power"
      - name: value
        type: float
        description: "Target power in percent. Range between minpower and maxpower (query dynamically)."

  - id: set_orientation
    label: Set Orientation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.orientation"
      - name: value
        type: enum
        values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: set_scaling_mode
    label: Set Scaling Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.window.main.scalingmode"
      - name: value
        type: enum
        values: [Fill, OneToOne, FillScreen, Stretch]

  - id: set_warp_enable
    label: Enable/Disable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.warp.enable"
      - name: value
        type: boolean

  - id: set_test_pattern
    label: Show Test Pattern
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.testpattern.selected"
      - name: value
        type: string
        description: Pattern ID from image.testpattern.list

  - id: show_test_pattern
    label: Toggle Test Pattern Display
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.testpattern.show"
      - name: value
        type: boolean

  - id: shutter_toggle
    label: Toggle Shutter
    kind: action
    method: optics.shutter.toggle
    params: []

  - id: shutter_set
    label: Set Shutter Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.shutter.target"
      - name: value
        type: enum
        values: [Open, Closed]

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: Numeric passcode for elevated access level

  - id: reset_domains
    label: Reset Settings Domains
    kind: action
    method: system.reset
    params:
      - name: domains
        type: array
        description: "Array of domain enums: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx"

  - id: send_key_click
    label: Send Key Click Event
    kind: action
    method: keydispatcher.sendclickevent
    params:
      - name: key
        type: enum
        description: "Key name, e.g. RC_POWER_ON, RC_POWER_OFF, RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_INPUT, RC_MENU, etc."
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    property: system.state
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    description: Current operating state of the projector.

  - id: illumination_state
    type: enum
    property: illumination.state
    values: [On, Off]
    description: Whether the light source is currently on or off.

  - id: active_source
    type: string
    property: image.window.main.source
    description: Name of the currently active input source.

  - id: laser_power
    type: float
    property: illumination.sources.laser.power
    description: Current laser power level in percent.

  - id: laser_max_power
    type: float
    property: illumination.sources.laser.maxpower
    description: Maximum laser power (dynamic, read-only).

  - id: laser_min_power
    type: float
    property: illumination.sources.laser.minpower
    description: Minimum laser power (dynamic, read-only).

  - id: brightness
    type: float
    property: image.brightness
    description: Current brightness value (-1 to 1).

  - id: contrast
    type: float
    property: image.contrast
    description: Current contrast value (0 to 2).

  - id: saturation
    type: float
    property: image.saturation
    description: Current saturation value (0 to 2).

  - id: gamma
    type: float
    property: image.gamma
    description: Current gamma value (1 to 3).

  - id: shutter_position
    type: enum
    property: optics.shutter.position
    values: [Open, Closed]

  - id: alarm_state
    type: enum
    property: environment.alarmstate
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: firmware_version
    type: string
    property: system.firmwareversion

  - id: model_name
    type: string
    property: system.modelname

  - id: serial_number
    type: string
    property: system.serialnumber

  - id: detected_signal
    type: object
    property: "image.connector.<connectorname>.detectedsignal"
    description: Signal info including active, name, resolution, frequency, color_space, etc. Connector name is lowercase with non-word chars removed.

  - id: available_sources
    type: array
    method: image.source.list
    description: "List of available source names (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDMI, HDBaseT, SDI, Dual DVI, etc.)"
```

## Variables
```yaml
variables:
  - id: laser_power_level
    property: illumination.sources.laser.power
    type: float
    unit: percent
    min_source: illumination.sources.laser.minpower
    max_source: illumination.sources.laser.maxpower
    description: Laser illumination power level.

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

  - id: saturation
    property: image.saturation
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

  - id: sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step: 1

  - id: intensity
    property: image.intensity
    type: float
    min: 0
    max: 1
    step: 0.01
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Unsolicited notification sent when a subscribed property changes. Contains array of property/value pairs."
    payload: |
      {"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"objectname.propertyname": value}]}}

  - id: signal_callback
    method: signal.callback
    description: "Unsolicited notification for subscribed signals. Contains array of signal/argument pairs."
    payload: |
      {"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {"arg1": value}}]}}

  - id: model_updated
    signal: modelupdated
    description: "Fired when API objects appear or disappear (e.g. lens mounted/removed). Subscribe via signal.subscribe."

  - id: notification_emitted
    signal: notification.emitted
    description: "Fired when a new notification is emitted. Includes severity, code, message, and available actions."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
# The ECO wake-up procedure is a multi-step process but involves WOL/physical buttons/serial ASCII, not JSON-RPC sequence.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions best practices like verifying projector state before power commands,
# but does not describe explicit safety interlock procedures or power-on sequencing requirements.
```

## Notes
- All commands use JSON-RPC 2.0 format. Parameters are passed by name; order does not matter.
- Both TCP and serial transports use identical JSON-RPC commands. The ECO wake-up via serial uses a special ASCII command `:POWR1\r` instead of JSON-RPC.
- The API is partially dynamic: available properties/methods depend on the projector model, installed peripherals, and configuration. Use the `introspect` method to discover the exact API at runtime.
- Source names must be translated to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
- Best practice: wait for `property.set` confirmation before setting the same property again to avoid flooding.
- File upload/download (warp grids, blend masks, test patterns, firmware, EDIDs) uses HTTP endpoints at `http://<projector-ip>/api/<endpoint-path>`.
- Notifications have no `id` field and require no response.
- Authentication with a passcode is optional for end-user access but required for power-user and above.

<!-- UNRESOLVED: exact Hodr-series specific model identifiers not listed in this document -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: ECO mode wake-on-LAN details beyond mentioning it as an option -->
<!-- UNRESOLVED: maximum concurrent connection limits not stated -->
<!-- UNRESOLVED: TCP keepalive / connection timeout behavior not stated -->
<!-- UNRESOLVED: serial cable pinout beyond pin 2-2, 3-3, 5-5 not fully specified (crossover vs straight) -->

## Provenance

```yaml
source_urls:
  - "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
source_documents:
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.269Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.425Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.514Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:53.622Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.418Z
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-04-23T15:19:25.936Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:19:25.936Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 spec actions matched literally; transport parameters verified; spec properly represents the Pulse JSON-RPC API core command set."
```

## Known Gaps

```yaml
- image.source.list
- image.connector.list
- image.processing.blend
- image.processing.blacklevel
- environment.getcontrolblocks
- led.activity
- led.list
- lightmeasurement.getlightoutput
- network.list
- notification.dismiss
- notification.list
- signal.subscribe
```
