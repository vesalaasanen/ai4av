---
schema_version: ai4av-public-spec-v1
device_id: barco/f50
entity_id: barco_f50
spec_id: admin/barco-f50
revision: 1
author: admin
title: "Barco F50 Control Spec"
status: published
manufacturer: Barco
manufacturer_key: barco
model_family: F50
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - F50
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
    checked_at: 2026-04-29T08:34:53.622Z
retrieved_at: 2026-04-29T08:34:53.622Z
last_checked_at: 2026-04-23T15:17:15.384Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - dmx.listchannels
  - dmx.listmodes
  - image.color.p7.custom.copypresettocustom
  - image.color.p7.custom.resetpreset
  - image.color.rgbmode.nextrgbmode
  - image.display.listdisplaymodes
  - image.processing.blacklevel.basicblacklevel.getblacklevelarea
  - image.processing.warp.fourcorners.getscaledcorners
  - optics.focus.calibrate
  - optics.lensshift.horizontal.calibrate
  - peripheral.frame.horizontal.calibrate
  - statistics.listcounters
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:17:15.384Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions verified as literal command-level matches in source; all transport parameters confirmed in RS232 and Network sections; spec covers essential control surface comprehensively."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Barco F50 Control Spec

## Summary

The Barco F50 is a laser projector controlled via Barco's Pulse platform, using JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. The API provides methods for power control, source selection, image adjustment (brightness, contrast, saturation, gamma, sharpness, intensity), illumination/laser power, lens optics (zoom, focus, shift, shutter), warp/blend/black level processing, test patterns, environment monitoring (temperatures, fan speeds), and notification management. File transfer operations (warp grids, blend masks, firmware, EDID) use HTTP endpoints.

<!-- UNRESOLVED: specific F50 input connectors and supported resolutions not fully enumerated — connector list varies by projector model -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

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
  description: >-
    Authentication via JSON-RPC "authenticate" method with numeric pass code.
    Required for access levels above end user. End user access does not require
    authentication. Example: {"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}
  # UNRESOLVED: default pass code value not stated in source
```

## Traits
```yaml
traits:
  - powerable     # system.poweron / system.poweroff / system.reboot
  - queryable     # property.get for all readable properties
  - routable      # image.window.main.source selection via property.set
  - levelable     # brightness, contrast, saturation, gamma, sharpness, intensity, laser power
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command:
      method: system.poweron
      format: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: Returns null result. Good practice to verify system.state is standby or ready first.

  - id: power_off
    label: Power Off
    kind: action
    command:
      method: system.poweroff
      format: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: Returns null result. Good practice to verify system.state is on first.

  - id: reboot
    label: Reboot
    kind: action
    command:
      method: system.reboot
    params: []

  - id: goto_eco
    label: Go to ECO Mode
    kind: action
    command:
      method: system.gotoeco
    params: []

  - id: goto_ready
    label: Go to Ready Mode
    kind: action
    command:
      method: system.gotoready
    params: []

  - id: select_source
    label: Select Input Source
    kind: action
    command:
      method: property.set
      format: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source_name>"}}'
    params:
      - name: source
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI, HDBaseT, SDI)"
    notes: Best practice to wait for confirmation before setting same property again.

  - id: set_property
    label: Set Property Value
    kind: action
    command:
      method: property.set
      format: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<property_name>","value":<value>}}'
    params:
      - name: property
        type: string
        description: "Dot-notation property name (e.g. image.brightness)"
      - name: value
        type: any
        description: "Value matching the property type (string, int, float, bool)"

  - id: get_property
    label: Get Property Value
    kind: action
    command:
      method: property.get
      format: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<property_name>"}}'
    params:
      - name: property
        type: string
        description: "Dot-notation property name, or array of property names for bulk get"

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    command:
      method: property.subscribe
    params:
      - name: property
        type: string
        description: "Property name or array of property names"

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    command:
      method: property.unsubscribe
    params:
      - name: property
        type: string
        description: "Property name or array of property names"

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    command:
      method: signal.subscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names (e.g. modelupdated)"

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    command:
      method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names"

  - id: introspect
    label: Introspect Object Model
    kind: action
    command:
      method: introspect
      format: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<object>","recursive":true}}'
    params:
      - name: object
        type: string
        description: "Object name in dot notation; empty string introspects everything"
      - name: recursive
        type: boolean
        description: "If false, only list immediate child object names"

  - id: authenticate
    label: Authenticate
    kind: action
    command:
      method: authenticate
      format: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":<passcode>}}'
    params:
      - name: code
        type: integer
        description: "Numeric pass code for elevated access level"

  - id: list_sources
    label: List Available Sources
    kind: action
    command:
      method: image.source.list
    params: []
    notes: Returns array of source names. List varies by projector model.

  - id: list_connectors
    label: List Connectors
    kind: action
    command:
      method: image.connector.list
    params: []

  - id: list_test_patterns
    label: List Test Patterns
    kind: action
    command:
      method: image.testpattern.list
    params: []

  - id: show_test_pattern
    label: Show Test Pattern
    kind: action
    command:
      method: property.set
    params:
      - name: selected
        type: string
        description: "Pattern ID from image.testpattern.list"
    notes: Set image.testpattern.selected then image.testpattern.show to true.

  - id: shutter_toggle
    label: Toggle Shutter
    kind: action
    command:
      method: optics.shutter.toggle
    params: []

  - id: reset_domains
    label: Reset Domains
    kind: action
    command:
      method: system.reset
    params:
      - name: domains
        type: array
        description: "Array of domain enums: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx"

  - id: eco_wake_serial
    label: Wake from ECO via Serial
    kind: action
    command:
      format: ":POWR1\r"
    params: []
    notes: ASCII command sent over RS-232 to wake projector from ECO mode. Wake-on-LAN also supported.

  - id: get_environment_temperatures
    label: Get Temperature Readings
    kind: action
    command:
      method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: "Sensor"
      - name: valuetype
        type: string
        value: "Temperature"

  - id: get_environment_fan_speeds
    label: Get Fan Speeds
    kind: action
    command:
      method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: "Sensor"
      - name: valuetype
        type: string
        value: "Speed"

  - id: get_alarm_info
    label: Get Alarm Info
    kind: action
    command:
      method: environment.getalarminfo
    params: []

  - id: list_notifications
    label: List Active Notifications
    kind: action
    command:
      method: notification.list
    params: []

  - id: dismiss_notification
    label: Dismiss Notification
    kind: action
    command:
      method: notification.dismiss
    params:
      - name: id
        type: string
        description: Notification ID
      - name: response
        type: string
        description: "Response enum: NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS"

  - id: send_key_click
    label: Send Key Click
    kind: action
    command:
      method: keydispatcher.sendclickevent
    params:
      - name: key
        type: string
        description: "Key enum (e.g. RC_POWER_ON, RC_INPUT, KP_MENU, KP_STANDBY)"

  - id: get_identifications
    label: Get System Identifications
    kind: action
    command:
      method: system.getidentifications
    params: []

  - id: list_firmware_components
    label: List Firmware Components
    kind: action
    command:
      method: firmware.listcomponentversionstatus
    params: []

  - id: engage_clo
    label: Engage Constant Light Output
    kind: action
    command:
      method: illumination.clo.engage
    params: []
    notes: Engages CLO at the current light level.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    label: System State
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, error]
    property: system.state
    subscribable: true

  - id: illumination_state
    label: Illumination State
    type: enum
    values: [On, Off]
    property: illumination.state
    subscribable: true

  - id: laser_power
    label: Laser Power
    type: float
    property: illumination.sources.laser.power
    subscribable: true
    notes: Percentage value. Min/max via illumination.sources.laser.minpower / maxpower.

  - id: laser_power_limited
    label: Laser Power Limited
    type: boolean
    property: illumination.sources.laser.ispowerlimited

  - id: active_source
    label: Active Source
    type: string
    property: image.window.main.source
    subscribable: true
    notes: Source name string. Two notifications on change (deselected then selected).

  - id: brightness
    label: Brightness
    type: float
    property: image.brightness
    subscribable: true
    constraints: { min: -1, max: 1, precision: 0.01 }

  - id: contrast
    label: Contrast
    type: float
    property: image.contrast
    subscribable: true
    constraints: { min: 0, max: 2, precision: 0.01 }

  - id: saturation
    label: Saturation
    type: float
    property: image.saturation
    subscribable: true
    constraints: { min: 0, max: 2, precision: 0.01 }

  - id: gamma
    label: Gamma
    type: float
    property: image.gamma
    subscribable: true
    constraints: { min: 1, max: 3, precision: 0.1 }

  - id: sharpness
    label: Sharpness
    type: integer
    property: image.sharpness
    constraints: { min: -2, max: 8 }

  - id: intensity
    label: Intensity
    type: float
    property: image.intensity
    constraints: { min: 0, max: 1, precision: 0.01 }

  - id: image_orientation
    label: Image Orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    property: image.orientation

  - id: display_mode
    label: Display Mode
    type: enum
    values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
    property: image.display.displaymode

  - id: scaling_mode
    label: Scaling Mode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    property: image.window.main.scalingmode

  - id: alarm_state
    label: Alarm State
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: firmware_version
    label: Firmware Version
    type: string
    property: firmware.firmwareversion

  - id: model_name
    label: Model Name
    type: string
    property: system.modelname

  - id: serial_number
    label: Serial Number
    type: string
    property: system.serialnumber

  - id: shutter_position
    label: Shutter Position
    type: enum
    values: [Open, Closed]
    property: optics.shutter.position

  - id: lens_present
    label: Lens Present
    type: boolean
    property: optics.lenspresent

  - id: focus_state
    label: Focus Motor State
    type: enum
    values: [Stopped, Running, Calibrating, Homing]
    property: optics.focus.state

  - id: zoom_state
    label: Zoom Motor State
    type: enum
    values: [Stopped, Running, Calibrating, Homing]
    property: optics.zoom.state

  - id: detected_signal
    label: Connector Detected Signal
    type: object
    property: image.connector.<name>.detectedsignal
    notes: "Returns object with: active (bool), name (string), resolution info, frequencies, scan type, color info. Property path uses lowercase connector name."

  - id: network_state
    label: Network Connection State
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: clo_availability
    label: CLO Availability
    type: enum
    values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
    property: illumination.clo.availability

  - id: eco_available
    label: ECO Mode Available
    type: boolean
    property: system.eco.available
```

## Variables
```yaml
variables:
  - id: laser_power_setpoint
    label: Laser Power
    property: illumination.sources.laser.power
    type: float
    constraints: { min_from: illumination.sources.laser.minpower, max_from: illumination.sources.laser.maxpower }

  - id: brightness
    label: Brightness
    property: image.brightness
    type: float
    constraints: { min: -1, max: 1 }

  - id: contrast
    label: Contrast
    property: image.contrast
    type: float
    constraints: { min: 0, max: 2 }

  - id: saturation
    label: Saturation
    property: image.saturation
    type: float
    constraints: { min: 0, max: 2 }

  - id: gamma
    label: Gamma
    property: image.gamma
    type: float
    constraints: { min: 1, max: 3 }

  - id: sharpness
    label: Sharpness
    property: image.sharpness
    type: integer
    constraints: { min: -2, max: 8 }

  - id: intensity
    label: Intensity
    property: image.intensity
    type: float
    constraints: { min: 0, max: 1 }

  - id: image_orientation
    label: Image Orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: display_mode_desired
    label: Desired Display Mode
    property: image.display.desireddisplaymode
    type: enum
    values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]

  - id: active_source
    label: Active Source
    property: image.window.main.source
    type: string

  - id: window_position
    label: Window Position
    property: image.window.main.position
    type: object
    subparams:
      - name: x
        type: integer
      - name: y
        type: integer

  - id: window_size
    label: Window Size
    property: image.window.main.size
    type: object
    subparams:
      - name: width
        type: integer
      - name: height
        type: integer

  - id: warp_enable
    label: Warp Enable
    property: image.processing.warp.enable
    type: boolean

  - id: blend_enable
    label: Blend Enable
    property: image.processing.blend.basicblend.enable
    type: boolean

  - id: blacklevel_enable
    label: Black Level Enable
    property: image.processing.blacklevel.basicblacklevel.enable
    type: boolean

  - id: osd_enable
    label: OSD Enable
    property: ui.osd
    type: boolean

  - id: stealth_mode
    label: Stealth Mode
    property: ui.stealthmode
    type: enum
    values: [Off, On]
    notes: When on, all controllable LEDs are switched off.

  - id: eco_enable
    label: ECO Mode Enable
    property: system.eco.enable
    type: boolean

  - id: initial_state
    label: Initial Boot State
    property: system.initialstate
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

  - id: dmx_artnet_enable
    label: DMX ArtNet Enable
    property: dmx.artnet
    type: boolean

  - id: dmx_start_channel
    label: DMX Start Channel
    property: dmx.startchannel
    type: integer
    constraints: { min: 1, max: 512 }

  - id: transport_delay_desired
    label: Transport Delay Desired
    property: image.processing.transportdelay.desired
    type: integer
```

## Events
```yaml
events:
  - id: property_changed
    label: Property Changed
    description: >-
      Sent when a subscribed property value changes. Client must implement this
      notification handler.
    format: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<property_name>":<value>}]}}'
    notes: Notification has no id; no response must be returned.

  - id: signal_callback
    label: Signal Callback
    description: >-
      Sent when a subscribed signal fires. Client must implement this handler.
    format: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<signal_name>":{"arg1":<val>}}]}}'
    notes: Notification has no id; no response must be returned.

  - id: model_updated
    label: Model Updated
    description: Fires when objects appear or disappear from the object model.
    signal: modelupdated
    params:
      - name: object
        type: string
        description: Object name in dot notation
      - name: newobject
        type: boolean
        description: True if added, false if removed
      - name: accesslevel
        type: string
        description: "Minimum access level (UNAUTHENTICATED_END_USER, END_USER, POWER_USER, etc.)"

  - id: notification_emitted
    label: Notification Emitted
    description: Fired when a new notification is emitted by the projector.
    signal: notification.emitted
    params:
      - name: severity
        type: enum
        values: [INFO, CAUTION, WARNING, ERROR, CRITICAL]
      - name: id
        type: string
      - name: code
        type: string
      - name: message
        type: string

  - id: notification_dismissed
    label: Notification Dismissed
    signal: notification.dismissed

  - id: network_added
    label: Network Device Added
    signal: network.added

  - id: network_removed
    label: Network Device Removed
    signal: network.removed

  - id: reset_performed
    label: Reset Domain Performed
    description: Emitted when domain reset completes.
    signal: system.performed
```

## Macros
```yaml
macros:
  - id: warp_file_activate
    label: Activate Warp Grid from File
    steps:
      - description: Upload warp grid file via HTTP POST
        command: "curl -F file=@warp.xml http://<projector_ip>/api/image/processing/warp/file/transfer"
      - description: Select the uploaded file
        command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
      - description: Enable file warp
        command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
      - description: Enable global warp
        command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'

  - id: blend_mask_activate
    label: Activate Blend Mask from File
    steps:
      - description: Upload blend mask via HTTP POST
        command: "curl -F file=@mask.png http://<projector_ip>/api/image/processing/blend/file/transfer"
      - description: Select the uploaded file
        command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
      - description: Enable file blend
        command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

  - id: firmware_upgrade
    label: Firmware Upgrade
    steps:
      - description: Upload firmware file via HTTP POST
        command: "curl -F file=@firmware.dat http://<projector_ip>/api/firmware/transfer"
      - description: Schedule upgrade at reboot
        command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: good practice to verify system.state is standby or ready before issuing system.poweron"
  - description: "Power off: good practice to verify system.state is on before issuing system.poweroff"
  - description: "property.set: wait for confirmation before setting same property again to avoid flooding"
# UNRESOLVED: no explicit safety interlocks or power-on sequencing requirements stated in source
# UNRESOLVED: no explicit error recovery sequences stated in source
```

## Notes

- **JSON-RPC 2.0 protocol**: All commands are JSON-RPC 2.0 requests. Parameters are passed by name; order does not matter. Request `id` is optional but recommended for matching responses.
- **Same commands for all transports**: Whether connected via TCP or RS-232, the same JSON-RPC command set applies.
- **Introspection**: The full object model can be discovered at runtime via the `introspect` method. This is useful for building dynamic UIs and determining available properties for a specific projector model.
- **Connector/source naming convention**: Source names (e.g. "DisplayPort 1") translate to object names by removing non-word characters and lowercasing (e.g. "displayport1"). Use `image.source.list` and `image.connector.list` for runtime discovery.
- **Notifications are push-only**: Subscribing to a property does not return its current value. Use `property.get` first, then subscribe for ongoing changes.
- **Source change produces two notifications**: When switching sources, a `property.changed` with empty string (deselected) arrives first, then the new source name.
- **ECO mode wake-up**: In addition to WOL and physical buttons, the serial command `:POWR1\r` (ASCII) wakes the projector from ECO mode.
- **HTTP file endpoints**: File uploads/downloads use `http://<projector_ip>/api/<endpoint_path>`. Supports warp grids, blend masks, black level masks, EDID files, test patterns, firmware, and notification logs.
- **Environment monitoring**: The `environment.getcontrolblocks` method provides access to temperatures, fan speeds, voltages, currents, and other sensor data using type/valuetype filter parameters.
- **DMX/ArtNet support**: Projector can be controlled via DMX with configurable start channel and ArtNet settings.

<!-- UNRESOLVED: exact list of available sources for F50 model not confirmed — image.source.list response varies by model -->
<!-- UNRESOLVED: maximum concurrent JSON-RPC sessions not stated -->
<!-- UNRESOLVED: TCP keepalive or heartbeat mechanism not documented -->
<!-- UNRESOLVED: serial cable pinout details beyond pin 2-2, 3-3, 5-5 not specified -->
<!-- UNRESOLVED: exact voltage/current/power specifications not stated in this document -->
<!-- UNRESOLVED: error code catalog or comprehensive error handling not documented -->

## Provenance

```yaml
source_urls:
  - "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
source_documents:
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:53.622Z
retrieved_at: 2026-04-29T08:34:53.622Z
last_checked_at: 2026-04-23T15:17:15.384Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:17:15.384Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions verified as literal command-level matches in source; all transport parameters confirmed in RS232 and Network sections; spec covers essential control surface comprehensively."
```

## Known Gaps

```yaml
- dmx.listchannels
- dmx.listmodes
- image.color.p7.custom.copypresettocustom
- image.color.p7.custom.resetpreset
- image.color.rgbmode.nextrgbmode
- image.display.listdisplaymodes
- image.processing.blacklevel.basicblacklevel.getblacklevelarea
- image.processing.warp.fourcorners.getscaledcorners
- optics.focus.calibrate
- optics.lensshift.horizontal.calibrate
- peripheral.frame.horizontal.calibrate
- statistics.listcounters
```
