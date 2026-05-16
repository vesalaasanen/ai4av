---
spec_id: admin/barco-bdmc-server
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco BDMC Server Control Spec"
manufacturer: Barco
model_family: "BDMC Server"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "BDMC Server"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:35:56.006Z
generated_at: 2026-05-14T21:35:56.006Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:35:56.006Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched literally in source; transport parameters verified against RS-232 and network documentation; comprehensive method coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco BDMC Server Control Spec

## Summary
Barco BDMC Server (Pulse-based projector platform) controlled via JSON-RPC 2.0 over TCP/IP or RS-232 serial. Supports power management, source selection, image adjustment (brightness, contrast, saturation, gamma, sharpness), warp/blend/black-level processing, lens motor control (zoom, focus, shift, shutter), illumination (laser power, CLO), DMX, environment monitoring (temperature, fan speeds), firmware management, and test patterns.

<!-- UNRESOLVED: document is titled "For UDX" projectors; exact BDMC Server feature subset not specified -->
<!-- UNRESOLVED: HTTP file endpoints use base URL pattern http://<projector-ip>/api/... but HTTP is not a primary control transport — only used for file upload/download -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
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
  notes: Authentication optional for end-user access; required for power-user and higher levels. Passcode sent via "authenticate" JSON-RPC method.
```

## Traits
```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
actions:
  - id: system_poweron
    label: Power On
    kind: action
    method: system.poweron
    params: []

  - id: system_poweroff
    label: Power Off
    kind: action
    method: system.poweroff
    params: []

  - id: system_reboot
    label: Reboot
    kind: action
    method: system.reboot
    params: []

  - id: system_gotoeco
    label: Go to ECO Mode
    kind: action
    method: system.gotoeco
    params: []

  - id: system_gotoready
    label: Go to Ready
    kind: action
    method: system.gotoready
    params: []

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: Secret passcode for elevated access level

  - id: property_set
    label: Set Property
    kind: action
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
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array of names)

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array of names)

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string
        description: Dot-notation property name (or array of names)

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string
        description: Signal name (or array of names)

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: Signal name (or array of names)

  - id: introspect
    label: Introspect Object
    kind: query
    method: introspect
    params:
      - name: object
        type: string
        description: Object name in dot notation
      - name: recursive
        type: boolean
        description: If false, only list child object names

  - id: image_source_list
    label: List Available Sources
    kind: query
    method: image.source.list
    params: []

  - id: select_source
    label: Select Input Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.window.main.source"
      - name: value
        type: string
        description: "Source name e.g. DisplayPort 1, HDMI, DVI 1, HDBaseT, SDI"

  - id: image_connector_list
    label: List Connectors
    kind: query
    method: image.connector.list
    params: []

  - id: set_brightness
    label: Set Brightness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.brightness"
      - name: value
        type: float
        description: "Normalized brightness (-1 to 1, default 0)"

  - id: set_contrast
    label: Set Contrast
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.contrast"
      - name: value
        type: float
        description: "Normalized contrast (0 to 2, default 1)"

  - id: set_saturation
    label: Set Saturation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.saturation"
      - name: value
        type: float
        description: "Normalized saturation (0 to 2, default 1)"

  - id: set_gamma
    label: Set Gamma
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.gamma"
      - name: value
        type: float
        description: "Gamma value (1 to 3, default 2.2)"

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.sharpness"
      - name: value
        type: integer
        description: "Sharpness (-2 to 8)"

  - id: set_laser_power
    label: Set Laser Power
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "illumination.sources.laser.power"
      - name: value
        type: float
        description: "Laser power percentage"

  - id: set_orientation
    label: Set Orientation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.orientation"
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
        description: "image.window.main.scalingmode"
      - name: value
        type: string
        description: "Fill, OneToOne, FillScreen, Stretch"

  - id: enable_warp
    label: Enable/Disable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.warp.enable"
      - name: value
        type: boolean

  - id: select_warp_file
    label: Select Warp File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.warp.file.selected"
      - name: value
        type: string
        description: Warp file name

  - id: enable_blend
    label: Enable/Disable Blend
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blend.file.enable"
      - name: value
        type: boolean

  - id: select_blend_file
    label: Select Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blend.file.selected"
      - name: value
        type: string
        description: Blend file name

  - id: set_shutter
    label: Set Shutter Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.shutter.target"
      - name: value
        type: string
        description: "Open or Closed"

  - id: toggle_shutter
    label: Toggle Shutter
    kind: action
    method: optics.shutter.toggle
    params: []

  - id: set_zoom_target
    label: Set Zoom Target
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.zoom.target"
      - name: value
        type: integer

  - id: set_focus_target
    label: Set Focus Target
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.focus.target"
      - name: value
        type: integer

  - id: set_lens_shift_horizontal
    label: Set Horizontal Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.lensshift.horizontal.target"
      - name: value
        type: integer

  - id: set_lens_shift_vertical
    label: Set Vertical Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.lensshift.vertical.target"
      - name: value
        type: integer

  - id: system_reset
    label: Reset Domains
    kind: action
    method: system.reset
    params:
      - name: domains
        type: array
        description: "List of reset domains e.g. ImageConnector, ImageSource, Optics, Illumination, etc."

  - id: system_resetall
    label: Reset All Domains
    kind: action
    method: system.resetall
    params: []

  - id: environment_getcontrolblocks
    label: Get Environment Sensors
    kind: query
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        description: "Sensor, Filter, Controller, Actuator, Alarm, or GenericBlock"
      - name: valuetype
        type: string
        description: "Temperature, Speed, Voltage, Current, etc."

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    method: environment.getalarminfo
    params: []

  - id: notification_list
    label: List Active Notifications
    kind: query
    method: notification.list
    params: []

  - id: notification_dismiss
    label: Dismiss Notification
    kind: action
    method: notification.dismiss
    params:
      - name: id
        type: string
      - name: response
        type: string
        description: "NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS"

  - id: eco_wake_serial
    label: Wake from ECO (Serial)
    kind: action
    command: ":POWR1\r"
    params: []
    notes: ASCII command sent over RS-232 to wake projector from ECO/power-save mode

  - id: firmware_schedule_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
    params: []

  - id: set_display_mode
    label: Set Display Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.display.desireddisplaymode"
      - name: value
        type: string
        description: "Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift"

  - id: keydispatcher_sendclickevent
    label: Send Key Click
    kind: action
    method: keydispatcher.sendclickevent
    params:
      - name: key
        type: string
        description: "Key enum e.g. RC_POWER_ON, RC_SHUTTER_OPEN, KP_MENU, etc."
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    property: system.state
    values:
      - boot
      - eco
      - standby
      - ready
      - conditioning
      - "on"
      - deconditioning
      - service
      - error

  - id: illumination_state
    type: enum
    property: illumination.state
    values:
      - "On"
      - "Off"

  - id: active_source
    type: string
    property: image.window.main.source
    description: Currently active input source name

  - id: available_sources
    type: array
    method: image.source.list
    description: List of available source names (varies by model)

  - id: laser_power
    type: float
    property: illumination.sources.laser.power
    description: Current laser power percentage

  - id: laser_power_limit_reason
    type: string
    property: illumination.sources.laser.powerlimitreason
    description: Reason if laser power is limited

  - id: brightness
    type: float
    property: image.brightness
    description: "Current brightness (-1 to 1)"

  - id: contrast
    type: float
    property: image.contrast
    description: "Current contrast (0 to 2)"

  - id: alarm_state
    type: enum
    property: environment.alarmstate
    values:
      - Fatal
      - Error
      - Alert
      - Warning
      - Ok

  - id: firmware_version
    type: string
    property: firmware.firmwareversion

  - id: model_name
    type: string
    property: system.modelname

  - id: serial_number
    type: string
    property: system.serialnumber

  - id: connector_detected_signal
    type: object
    property: image.connector.<name>.detectedsignal
    description: Signal info including active, resolution, refresh rate, color space, etc.

  - id: shutter_position
    type: enum
    property: optics.shutter.position
    values:
      - Open
      - Closed

  - id: zoom_position
    type: integer
    property: optics.zoom.position

  - id: focus_position
    type: integer
    property: optics.focus.position

  - id: orientation
    type: enum
    property: image.orientation
    values:
      - DESKTOP_FRONT
      - DESKTOP_REAR
      - CEILING_FRONT
      - CEILING_REAR

  - id: display_mode
    type: enum
    property: image.display.displaymode
    values:
      - Mono
      - AutoStereo
      - ActiveStereo
      - NightVision
      - IGPixelShift

  - id: temperatures
    type: object
    method: environment.getcontrolblocks
    description: Dictionary of temperature sensor readings (laser banks, heatsinks, mainboard, inlet, outlet, etc.)

  - id: fan_speeds
    type: object
    method: environment.getcontrolblocks
    description: Dictionary of fan speed (tacho) readings

  - id: network_state
    type: enum
    property: network.device.lan.state
    values:
      - CONNECTED
      - DISCONNECTED
```

## Variables
```yaml
variables:
  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step: 0.01

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step: 0.1

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8

  - id: image_intensity
    property: image.intensity
    type: float
    min: 0
    max: 1
    step: 0.01

  - id: laser_power_level
    property: illumination.sources.laser.power
    type: float
    description: Laser power in percent (min/max dynamic - query illumination.sources.laser.minpower / maxpower)

  - id: screen_luminance
    property: screen.luminance
    type: float
    min: 50
    max: 10000
    step: 10
    description: Maximum luminance in cd/m2

  - id: blend_scurve
    property: image.processing.blend.scurve
    type: float
    min: 1
    max: 4
    step: 0.1

  - id: hdr_boost
    property: screen.hdrboost
    type: float
    min: 0.8
    max: 1.2
    step: 0.01
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Fired when a subscribed property value changes. Params contain array of property/value pairs.
    params:
      - name: property
        type: array
        description: "Array of {objectname.propertyname: value} objects"

  - id: signal_callback
    method: signal.callback
    description: Fired when a subscribed signal triggers. Params contain array of signal/argument pairs.
    params:
      - name: signal
        type: array
        description: "Array of {objectname.signalname: {args}} objects"

  - id: model_updated
    signal: modelupdated
    description: Fired when objects appear or disappear in the API
    params:
      - name: object
        type: string
      - name: newobject
        type: boolean
      - name: accesslevel
        type: string

  - id: notification_emitted
    signal: notification.emitted
    description: New notification emitted
    params:
      - name: severity
        type: string
      - name: id
        type: string
      - name: code
        type: string
      - name: message
        type: string

  - id: network_added
    signal: network.added
    description: Network device added

  - id: network_removed
    signal: network.removed
    description: Network device removed
```

## Macros
```yaml
macros:
  - id: warp_grid_upload_and_activate
    label: Upload and Activate Warp Grid
    steps:
      - description: "Enable warp: property.set image.processing.warp.enable = true"
      - description: "Upload warp file via HTTP POST to /api/image/processing/warp/file/transfer"
      - description: "Select file: property.set image.processing.warp.file.selected = <filename>"
      - description: "Enable file warp: property.set image.processing.warp.file.enable = true"

  - id: blend_mask_upload_and_activate
    label: Upload and Activate Blend Mask
    steps:
      - description: "Upload blend mask via HTTP POST to /api/image/processing/blend/file/transfer"
      - description: "Select file: property.set image.processing.blend.file.selected = <filename>"
      - description: "Enable blend: property.set image.processing.blend.file.enable = true"

  - id: blacklevel_upload_and_activate
    label: Upload and Activate Black Level Mask
    steps:
      - description: "Upload mask via HTTP POST to /api/image/processing/blacklevel/file/transfer"
      - description: "Select file: property.set image.processing.blacklevel.file.selected = <filename>"
      - description: "Enable black level: property.set image.processing.blacklevel.file.enable = true"
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_reset
  - system_resetall
interlocks:
  - description: "Power on has no effect if projector is already on or in state transition. Verify state is standby or ready before issuing power on."
  - description: "Power off has no effect if projector is already off or in state transition. Verify state is on before issuing power off."
  - description: "Best practice to wait for property.set confirmation before setting same property again to avoid flooding the server."
# UNRESOLVED: source does not describe specific safety interlocks for lamp/laser shutdown sequences
```

## Notes
- API is based on JSON-RPC 2.0. All parameters passed by name; order does not matter.
- The API is dynamic — available objects/properties depend on projector model, connected peripherals, and configuration. Use the introspect method to discover the exact API for a given device.
- Source names translate to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- HTTP file endpoints at `http://<projector-ip>/api/<path>` support upload (POST with multipart form) and download (GET) for warp grids, blend masks, black level masks, EDID files, firmware images, test patterns, and notification logs.
- ECO mode wake requires either WOL (MAC address), remote control power button, keypad power button, or serial command `:POWR1\r`.
- Properties have metadata (type, min, max, step-size, precision, access level) discoverable via introspection.
- Connector signal detection provides detailed timing info: resolution, refresh rate, sync parameters, color space, chroma sampling, bit depth, etc.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: exact connector/source set for BDMC Server model not specified — document references UDX-4K32/UDX-4K22 models -->
<!-- UNRESOLVED: laser min/max power range is dynamic (depends on lens, position) — not a fixed range -->
<!-- UNRESOLVED: ECO wake serial command (:POWR1\r) uses raw ASCII, not JSON-RPC — protocol switching required -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:35:56.006Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:35:56.006Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched literally in source; transport parameters verified against RS-232 and network documentation; comprehensive method coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
