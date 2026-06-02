---
spec_id: admin/barco-cse-200
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco CSE-200 Control Spec"
manufacturer: Barco
model_family: CSE-200
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - CSE-200
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.269Z
last_checked_at: 2026-06-02T21:49:52.074Z
generated_at: 2026-06-02T21:49:52.074Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact list of input sources varies by projector model"
  - "no multi-step macro sequences explicitly described in source"
  - "no explicit safety interlock or power-on sequencing warnings beyond"
  - "exact connector and source list for CSE-200 vs other Pulse projectors not specified"
  - "maximum concurrent TCP connections not stated"
  - "serial cable pinout specifies pins 2-2, 3-3, 5-5 but does not specify DTE/DCE or null-modem"
  - "protocol version number not stated in source"
  - "HTTP file endpoint authentication requirements not fully specified"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:49:52.074Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Barco CSE-200 Control Spec

## Summary
The Barco CSE-200 is a projector controllable via TCP/IP (JSON-RPC 2.0 on port 9090) and RS-232 serial using Barco's Pulse platform API. The API provides power control, input source routing, image adjustments (brightness, contrast, saturation, gamma, sharpness), illumination/laser power management, warp/blend/black level correction, optics (focus, zoom, lens shift, shutter), test patterns, DMX, environment monitoring, firmware updates, and file transfer endpoints. Authentication is optional for end-user access; a passcode is required for elevated privilege levels.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact list of input sources varies by projector model -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
  base_url: "http://{projector_ip}/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode
  description: >
    Authentication is optional for normal end-user access.
    A numeric passcode (e.g. 98765) is required to elevate to
    power-user or higher access levels via the authenticate method.
```

## Traits
```yaml
traits:
  - powerable    # system.poweron / system.poweroff commands
  - queryable    # property.get returns system state, illumination state, etc.
  - routable     # image.window.main.source selects input; image.source.list enumerates
  - levelable    # brightness, contrast, saturation, gamma, laser power, intensity
```

## Actions
```yaml
actions:
  - id: authenticate
    label: Authenticate
    kind: action
    description: Authenticate with the projector to elevate access level
    params:
      - name: code
        type: integer
        description: Numeric passcode

  - id: system_poweron
    label: Power On
    kind: action
    description: Power on the projector
    command:
      method: system.poweron
    params: []

  - id: system_poweroff
    label: Power Off
    kind: action
    description: Power off the projector
    command:
      method: system.poweroff
    params: []

  - id: system_reboot
    label: Reboot
    kind: action
    description: Reboot the projector (powers off first)
    command:
      method: system.reboot
    params: []

  - id: system_gotoeco
    label: Go to ECO Mode
    kind: action
    description: Set the device to ECO/power-save state
    command:
      method: system.gotoeco
    params: []

  - id: system_gotoready
    label: Go to Ready
    kind: action
    description: Set the device to ready state
    command:
      method: system.gotoready
    params: []

  - id: select_source
    label: Select Input Source
    kind: action
    description: Set the active input source for the main window
    command:
      method: property.set
    params:
      - name: source
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI)"

  - id: list_sources
    label: List Available Sources
    kind: action
    description: Returns a list of all available input source names
    command:
      method: image.source.list
    params: []

  - id: list_connectors
    label: List Connectors
    kind: action
    description: Returns a list of all available physical connectors
    command:
      method: image.connector.list
    params: []

  - id: property_set
    label: Set Property
    kind: action
    description: Set the value of a named property
    command:
      method: property.set
    params:
      - name: property
        type: string
        description: Dot-notation property name
      - name: value
        type: any
        description: Value to set

  - id: property_get
    label: Get Property
    kind: action
    description: Read the current value of one or more properties
    command:
      method: property.get
    params:
      - name: property
        type: string_or_array
        description: Dot-notation property name or array of names

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    description: Subscribe to change notifications for one or more properties
    command:
      method: property.subscribe
    params:
      - name: property
        type: string_or_array
        description: Dot-notation property name or array of names

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    description: Stop observing changes on one or more properties
    command:
      method: property.unsubscribe
    params:
      - name: property
        type: string_or_array
        description: Dot-notation property name or array of names

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    description: Subscribe to one or more signals
    command:
      method: signal.subscribe
    params:
      - name: signal
        type: string_or_array
        description: Signal name or array of names

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    description: Unsubscribe from one or more signals
    command:
      method: signal.unsubscribe
    params:
      - name: signal
        type: string_or_array
        description: Signal name or array of names

  - id: introspect
    label: Introspect Objects
    kind: action
    description: Read metadata of available objects, methods, properties, and signals
    command:
      method: introspect
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty for root)
      - name: recursive
        type: boolean
        description: If false, only list object names one level deep

  - id: environment_getcontrolblocks
    label: Get Environment Data
    kind: action
    description: Get sensor readings (temperatures, fan speeds, voltages, etc.)
    command:
      method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        description: "Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)"
      - name: valuetype
        type: string
        description: "Value type (Temperature, Speed, Voltage, Current, etc.)"

  - id: system_reset
    label: Reset Domains
    kind: action
    description: Reset selected configuration domains
    command:
      method: system.reset
    params:
      - name: domains
        type: array
        description: "List of domain enums (ImageConnector, ImageSource, ImageFeatures, etc.)"

  - id: system_resetall
    label: Reset All Domains
    kind: action
    description: Reset all configuration domains
    command:
      method: system.resetall
    params: []

  - id: shutter_toggle
    label: Toggle Shutter
    kind: action
    description: Toggle the lens shutter open/closed
    command:
      method: optics.shutter.toggle
    params: []

  - id: eco_wake_serial
    label: Wake from ECO (Serial)
    kind: action
    description: Send ASCII wake command over RS-232 to wake from ECO mode
    command:
      raw: ":POWR1\r"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    label: System State
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    description: Current operational state of the projector
    query:
      method: property.get
      params:
        property: system.state
    subscribe:
      method: property.subscribe
      params:
        property: system.state

  - id: illumination_state
    label: Illumination State
    type: enum
    values: [On, Off]
    description: Whether the light source is on or off
    query:
      method: property.get
      params:
        property: illumination.state

  - id: active_source
    label: Active Source
    type: string
    description: Name of the currently active input source
    query:
      method: property.get
      params:
        property: image.window.main.source

  - id: alarm_state
    label: Alarm State
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    description: Current alarm state of the projector
    query:
      method: property.get
      params:
        property: environment.alarmstate

  - id: firmware_version
    label: Firmware Version
    type: string
    description: Currently installed firmware version
    query:
      method: property.get
      params:
        property: system.firmwareversion

  - id: detected_signal
    label: Connector Detected Signal
    type: object
    description: >
      Signal information on a connector (active, resolution, refresh rate, color space, etc.).
      Queried per connector, e.g. image.connector.l1displayport.detectedsignal
    query:
      method: property.get
      params:
        property: "image.connector.{connectorname}.detectedsignal"

  - id: model_name
    label: Model Name
    type: string
    query:
      method: property.get
      params:
        property: system.modelname

  - id: serial_number
    label: Serial Number
    type: string
    query:
      method: property.get
      params:
        property: system.serialnumber

  - id: shutter_position
    label: Shutter Position
    type: enum
    values: [Open, Closed]
    query:
      method: property.get
      params:
        property: optics.shutter.position
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: float
    min: -1
    max: 1
    step: 0.01
    default: 0
    property: image.brightness

  - id: contrast
    label: Contrast
    type: float
    min: 0
    max: 2
    step: 0.01
    default: 1
    property: image.contrast

  - id: saturation
    label: Saturation
    type: float
    min: 0
    max: 2
    step: 0.01
    default: 1
    property: image.saturation

  - id: gamma
    label: Gamma
    type: float
    min: 1
    max: 3
    step: 0.1
    default: 2.2
    property: image.gamma

  - id: sharpness
    label: Sharpness
    type: integer
    min: -2
    max: 8
    step: 1
    property: image.sharpness

  - id: intensity
    label: Intensity
    type: float
    min: 0
    max: 1
    step: 0.01
    property: image.intensity

  - id: laser_power
    label: Laser Power
    type: float
    min_property: illumination.sources.laser.minpower
    max_property: illumination.sources.laser.maxpower
    property: illumination.sources.laser.power
    description: Target laser power in percent

  - id: orientation
    label: Image Orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    property: image.orientation

  - id: warp_enable
    label: Warp Enable
    type: boolean
    property: image.processing.warp.enable

  - id: clo_enable
    label: Constant Light Output Enable
    type: boolean
    property: illumination.clo.enable

  - id: clo_scale
    label: CLO Scale
    type: float
    property: illumination.clo.scale
    description: Percentage to scale the CLO setpoint by
```

## Events
```yaml
events:
  - id: property_changed
    label: Property Changed
    description: >
      Sent when a subscribed property changes value. Contains an array of
      property/value pairs.
    method: property.changed
    payload:
      - name: property
        type: array
        description: Array of objects with single key-value pairs ({ "property.name": value })

  - id: signal_callback
    label: Signal Callback
    description: >
      Sent when a subscribed signal fires. Contains an array of
      signal/argument-list pairs.
    method: signal.callback
    payload:
      - name: signal
        type: array
        description: Array of objects mapping signal names to their argument objects

  - id: model_updated
    label: Model Updated
    description: Fired when objects appear or disappear in the introspection model
    signal: modelupdated
    payload:
      - name: object
        type: string
        description: Object name in dot notation
      - name: newobject
        type: boolean
        description: True if added, false if removed
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Issuing system.poweron when the projector is already on or transitioning
      between states has no effect. Good practice is to verify system.state is
      standby or ready before power on, and on before power off.
  - description: >
      Wait for property.set confirmation before setting the same property again.
      Continuously setting without waiting may flood the server.
# UNRESOLVED: no explicit safety interlock or power-on sequencing warnings beyond
# the state-transition guidance described above
```

## Notes
- All commands use JSON-RPC 2.0 format over both TCP and serial connections. The same API is available regardless of transport.
- Properties are accessed via dot notation (e.g. `image.brightness`). Objects are introspectable via the `introspect` method.
- Property subscription only delivers change notifications; the current value must be obtained via `property.get` separately.
- Source name to object name translation: remove all non-word characters and convert to lowercase (e.g. "DisplayPort 1" → "displayport1").
- File uploads (warp grids, blend masks, EDID, firmware, test patterns) use HTTP POST to `http://{projector_ip}/api/{endpoint}`.
- The ECO wake command over serial is raw ASCII `:POWR1\r` — this is not JSON-RPC.
- Connector names are model-specific. The CSE-200 supports connectors including DisplayPort, HDMI, HDBaseT, SDI (multiple variants).
- Access levels: UNAUTHENTICATED_END_USER, END_USER, POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT.

<!-- UNRESOLVED: exact connector and source list for CSE-200 vs other Pulse projectors not specified -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: serial cable pinout specifies pins 2-2, 3-3, 5-5 but does not specify DTE/DCE or null-modem -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: HTTP file endpoint authentication requirements not fully specified -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.269Z
last_checked_at: 2026-06-02T21:49:52.074Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:49:52.074Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact list of input sources varies by projector model"
- "no multi-step macro sequences explicitly described in source"
- "no explicit safety interlock or power-on sequencing warnings beyond"
- "exact connector and source list for CSE-200 vs other Pulse projectors not specified"
- "maximum concurrent TCP connections not stated"
- "serial cable pinout specifies pins 2-2, 3-3, 5-5 but does not specify DTE/DCE or null-modem"
- "protocol version number not stated in source"
- "HTTP file endpoint authentication requirements not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
