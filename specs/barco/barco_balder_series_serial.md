---
spec_id: admin/barco-balder-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Balder Series Control Spec"
manufacturer: Barco
model_family: "Balder Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Balder Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-04T06:15:26.319Z
last_checked_at: 2026-06-02T21:47:49.953Z
generated_at: 2026-06-02T21:47:49.953Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact Balder sub-models not enumerated in source (doc covers generic Pulse API for UDX/Balder families)"
  - "no explicit multi-step macro sequences documented in source"
  - "full interlock procedures and safety warnings not detailed in source"
  - "exact Balder-specific connector list not stated (varies by model)"
  - "firmware version compatibility ranges not stated"
  - "protocol version number not stated"
  - "maximum concurrent TCP connections not stated"
  - "RS-232 pinout detailed for 9-pin but no mention of RJ-45 serial if applicable"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:47:49.953Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Barco Balder Series Control Spec

## Summary
Barco Balder Series projectors use the Pulse JSON-RPC 2.0 API, accessible via TCP/IP on port 9090 or RS-232 serial at 19200 baud. The API provides control over power, source selection, illumination, image adjustment, warp/blend, optics (lens shift, zoom, focus, shutter), DMX, environment monitoring, and firmware management. Authentication is optional for normal end-user access; a passcode is required for elevated privileges.

<!-- UNRESOLVED: exact Balder sub-models not enumerated in source (doc covers generic Pulse API for UDX/Balder families) -->

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
  type: optional  # inferred: normal end-user access requires no auth; elevated access requires passcode via authenticate method
```

## Traits
```yaml
- powerable    # inferred from system.poweron / system.poweroff commands
- queryable    # inferred from property.get and introspect commands
- routable     # inferred from image.window.main.source / image.source.list commands
- levelable    # inferred from illumination.sources.laser.power, image.brightness, image.contrast, etc.
```

## Actions
```yaml
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
  label: Go to ECO
  kind: action
  method: system.gotoeco
  params: []

- id: reboot
  label: Reboot
  kind: action
  method: system.reboot
  params: []
  description: Reboots the projector. Powers off first.

- id: select_source
  label: Select Source
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.source"
      description: Fixed property path
    - name: value
      type: string
      description: "Source name, e.g. DisplayPort 1, HDMI, HDBaseT, DVI 1, SDI"
  description: Sets the active source for the main window. Best practice to wait for confirmation before issuing another set.

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
      description: "Normalized value, -1 to 1, step 0.01"

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
      description: "Normalized value, 0 to 2, step 0.01, default 1"

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
      description: "Range 1 to 3, step 0.1, default 2.2"

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
      description: "Normalized value, 0 to 2, step 0.01, default 1"

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
      description: "Range -2 to 8, step 1"

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
      description: "Range 0 to 1, step 0.01"

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
      description: "Target power in percent"

- id: set_orientation
  label: Set Orientation
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.orientation"
    - name: value
      type: string
      description: "DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR"

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.scalingmode"
    - name: value
      type: string
      description: "Fill, OneToOne, FillScreen, Stretch"

- id: enable_warp
  label: Enable Warp
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.warp.enable"
    - name: value
      type: boolean

- id: enable_blend
  label: Enable Blend File
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.enable"
    - name: value
      type: boolean

- id: enable_blacklevel
  label: Enable Black Level File
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.enable"
    - name: value
      type: boolean

- id: shutter_toggle
  label: Toggle Shutter
  kind: action
  method: optics.shutter.toggle
  params: []

- id: set_test_pattern
  label: Select Test Pattern
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.testpattern.selected"
    - name: value
      type: string
      description: "Unique test pattern ID"

- id: show_test_pattern
  label: Show Test Pattern
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.testpattern.show"
    - name: value
      type: boolean

- id: reset_domains
  label: Reset Domains
  kind: action
  method: system.reset
  params:
    - name: domains
      type: array
      description: "List of domain enums, e.g. ImageFeatures, Optics, Illumination, etc."

- id: authenticate
  label: Authenticate
  kind: action
  method: authenticate
  params:
    - name: code
      type: integer
      description: "Secret passcode for elevated access level"

- id: eco_wake_serial
  label: ECO Wake (Serial Only)
  kind: action
  description: "Send ASCII :POWR1\\r over RS-232 to wake from ECO mode"
  params: []

- id: set_display_mode
  label: Set Display Mode
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.display.desireddisplaymode"
    - name: value
      type: string
      description: "Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift"

- id: set_rgb_mode
  label: Set RGB Mode
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.color.rgbmode.rgbmode"
    - name: value
      type: string
      description: "Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed"

- id: set_stealth_mode
  label: Set Stealth Mode
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "ui.stealthmode"
    - name: value
      type: string
      description: "Off, On. When on, all controllable LEDs are switched off."

- id: set_osd
  label: Enable/Disable OSD
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "ui.osd"
    - name: value
      type: boolean

- id: signal_user_activity
  label: Signal User Activity
  kind: action
  method: system.activity
  params: []
  description: Resets timeout countdown timers.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  property: system.state
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  subscribable: true

- id: illumination_state
  type: enum
  property: illumination.state
  values: [On, Off]
  subscribable: true

- id: laser_power
  type: float
  property: illumination.sources.laser.power
  description: Current laser power in percent
  subscribable: true

- id: laser_max_power
  type: float
  property: illumination.sources.laser.maxpower
  description: Maximum laser power in percent (read-only)

- id: laser_min_power
  type: float
  property: illumination.sources.laser.minpower
  description: Minimum laser power in percent (read-only)

- id: active_source
  type: string
  property: image.window.main.source
  subscribable: true
  description: "Name of the currently active source, e.g. DisplayPort 1"

- id: brightness
  type: float
  property: image.brightness
  subscribable: true
  description: "Normalized, -1 to 1"

- id: contrast
  type: float
  property: image.contrast
  subscribable: true
  description: "Normalized, 0 to 2"

- id: gamma
  type: float
  property: image.gamma
  subscribable: true

- id: saturation
  type: float
  property: image.saturation
  subscribable: true

- id: sharpness
  type: integer
  property: image.sharpness
  subscribable: true

- id: intensity
  type: float
  property: image.intensity
  subscribable: true

- id: connector_detected_signal
  type: object
  property: "image.connector.<name>.detectedsignal"
  subscribable: true
  description: "Signal info per connector including active, resolution, frequency, color space, etc."

- id: alarm_state
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: firmware_version
  type: string
  property: firmware.firmwareversion
  description: Currently installed firmware version (read-only)

- id: model_name
  type: string
  property: system.modelname
  description: Projector model name (read-only)

- id: serial_number
  type: string
  property: system.serialnumber
  description: Projector serial number (read-only)

- id: display_mode
  type: enum
  property: image.display.displaymode
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
  subscribable: true

- id: orientation
  type: enum
  property: image.orientation
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: scaling_mode
  type: enum
  property: image.window.main.scalingmode
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: lens_present
  type: boolean
  property: optics.lenspresent
  description: Whether a lens is mounted (read-only)

- id: lens_info
  type: object
  property: optics.lens
  description: Lens details including ID, Name, Zoom/Focus/Iris capabilities and speeds (read-only)

- id: clo_state
  type: enum
  property: illumination.clo.state
  values: [Ok, TooDim, TooBright]

- id: clo_availability
  type: enum
  property: illumination.clo.availability
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]

- id: laser_power_limited
  type: boolean
  property: illumination.sources.laser.ispowerlimited

- id: network_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]
```

## Variables
```yaml
- id: laser_power_target
  property: illumination.sources.laser.power
  type: float
  min: 0
  max: dynamic  # see illumination.sources.laser.maxpower
  description: Laser target power in percent

- id: brightness_value
  property: image.brightness
  type: float
  min: -1
  max: 1
  step: 0.01

- id: contrast_value
  property: image.contrast
  type: float
  min: 0
  max: 2
  step: 0.01

- id: gamma_value
  property: image.gamma
  type: float
  min: 1
  max: 3
  step: 0.1

- id: saturation_value
  property: image.saturation
  type: float
  min: 0
  max: 2
  step: 0.01

- id: sharpness_value
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: intensity_value
  property: image.intensity
  type: float
  min: 0
  max: 1
  step: 0.01

- id: dmx_start_channel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_mode
  property: dmx.mode
  type: string

- id: hostname
  property: network.hostname
  type: string

- id: on_timeout_duration
  property: system.on.timeout.duration
  type: integer
  description: Time in seconds before transitioning to lower state

- id: ready_timeout_duration
  property: system.ready.timeout.duration
  type: integer
  description: Time in seconds before transitioning to lower state

- id: standby_timeout_duration
  property: system.standby.timeout.duration
  type: integer
  description: Time in seconds before transitioning to lower state
```

## Events
```yaml
- id: property_changed
  description: >
    Unsolicited notification sent when a subscribed property changes.
    Method: property.changed. Params contain an array of property/value pairs.
  format:
    method: property.changed
    params:
      property:
        - "<objectname.propertyname>": <value>

- id: signal_callback
  description: >
    Unsolicited notification sent when a subscribed signal fires.
    Method: signal.callback. Params contain an array of signal/argument pairs.
  format:
    method: signal.callback
    params:
      signal:
        - "<objectname.signalname>":
            arg1: value

- id: model_updated
  description: >
    Fires when objects appear or disappear (e.g. peripherals connected/disconnected).
    Subscribe via signal.subscribe with signal "modelupdated".
  args:
    object: string
    newobject: boolean
    accesslevel: enum

- id: notification_emitted
  description: >
    Fires when the projector emits a notification (info, caution, warning, error, critical).
  args:
    severity: enum [INFO, CAUTION, WARNING, ERROR, CRITICAL]
    id: string
    code: string
    message: string

- id: system_performed
  description: Emitted when one or more reset domains have completed resetting.
  args:
    domains: "array of domain enums"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - system.reboot
  - system.poweroff
interlocks:
  - description: >
      Power on is a no-op if projector is already on or transitioning between states.
      Best practice: verify system.state is standby or ready before issuing power on.
  - description: >
      Power off is a no-op if projector is already off or transitioning.
      Best practice: verify system.state is on before issuing power off.
  - description: >
      ECO wake requires special serial command (:POWR1\\r), Wake-on-LAN, or physical button press.
# UNRESOLVED: full interlock procedures and safety warnings not detailed in source
```

## Notes
- The API uses JSON-RPC 2.0 over both TCP/IP and RS-232. All commands are identical regardless of transport.
- Property subscription uses `property.subscribe` for change notifications; the client must implement `property.changed` to receive them.
- Signal subscription uses `signal.subscribe`; client implements `signal.callback`.
- The API is dynamic -- available objects/properties vary by projector model and connected peripherals. Use `introspect` to discover the exact API for a given unit.
- Source names are translated to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" becomes "displayport1").
- Best practice: wait for `property.set` confirmation before setting the same property again to avoid flooding.
- File transfer (warp grids, blend masks, black level masks, firmware, EDIDs, test patterns) uses HTTP POST/GET at `http://<projector-ip>/api/<endpoint>`.
- Supported image formats for masks: PNG (up to 16-bit), JPEG, TIFF. Grayscale only (blue channel used for RGB images).
- Authentication is tiered: UNAUTHENTICATED_END_USER, END_USER, POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT, INACCESSIBLE. Normal end-user access requires no authentication.
- Access levels for the `authenticate` method: `{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <passcode>}}`.
<!-- UNRESOLVED: exact Balder-specific connector list not stated (varies by model) -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: RS-232 pinout detailed for 9-pin but no mention of RJ-45 serial if applicable -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-04T06:15:26.319Z
last_checked_at: 2026-06-02T21:47:49.953Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:47:49.953Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact Balder sub-models not enumerated in source (doc covers generic Pulse API for UDX/Balder families)"
- "no explicit multi-step macro sequences documented in source"
- "full interlock procedures and safety warnings not detailed in source"
- "exact Balder-specific connector list not stated (varies by model)"
- "firmware version compatibility ranges not stated"
- "protocol version number not stated"
- "maximum concurrent TCP connections not stated"
- "RS-232 pinout detailed for 9-pin but no mention of RJ-45 serial if applicable"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
