---
spec_id: admin/barco-event-master-xml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: "Barco Pulse Projector"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Pulse Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
retrieved_at: 2026-04-29T22:42:13.413Z
last_checked_at: 2026-04-23T15:17:09.370Z
generated_at: 2026-04-23T15:17:09.370Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:17:09.370Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched literally in source; transport parameters (port 9090, 19200 baud, 8-N-1) verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Barco Pulse Projector Control Spec

## Summary
Control spec for Barco Pulse projectors using JSON-RPC 2.0 over TCP/IP (port 9090) and RS-232 serial. Covers power management, source selection, image adjustment (brightness, contrast, saturation, gamma), laser illumination control, optics (focus, zoom, lens shift, shutter), warping, blending, black level correction, DMX, environmental monitoring, and notification management. File transfers (firmware, warp grids, blend masks, EDID, test patterns) use HTTP endpoints at `/api/` paths.

<!-- UNRESOLVED: exact projector model names not stated in source; source refers generically to "Pulse services" -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector_ip}/api/"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code
  description: >-
    Passcode-based authentication for elevated access levels.
    End-user access does not require authentication.
    Request: {"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <passcode>}}
    Response: {"jsonrpc": "2.0", "result": true, "id": <id>}
```

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
actions:
  - id: system_poweron
    label: Power On
    kind: action
    command:
      method: system.poweron
    params: []
    notes: Returns null result. Verify state is standby or ready before issuing.

  - id: system_poweroff
    label: Power Off
    kind: action
    command:
      method: system.poweroff
    params: []
    notes: Returns null result. Verify state is on before issuing.

  - id: system_reboot
    label: Reboot
    kind: action
    command:
      method: system.reboot
    params: []
    notes: Powers off the projector first then reboots.

  - id: system_gotoeco
    label: Go to ECO Mode
    kind: action
    command:
      method: system.gotoeco
    params: []

  - id: system_gotoready
    label: Go to Ready Mode
    kind: action
    command:
      method: system.gotoready
    params: []

  - id: system_reset
    label: Reset Domains
    kind: action
    command:
      method: system.reset
    params:
      - name: domains
        type: array
        description: List of reset domain enums
        values:
          - ImageConnector
          - ImageSource
          - ImageFeatures
          - ImageRealColor
          - ImageWarp
          - ImageBlend
          - ImageOrientation
          - ImageResolution
          - ImageStereo
          - ImageDisplay
          - ImageTestPattern
          - ImageConvergence
          - UserInterface
          - Optics
          - Illumination
          - Network
          - Screen
          - System
          - LightMeasurement
          - Dmx

  - id: system_resetall
    label: Reset All Domains
    kind: action
    command:
      method: system.resetall
    params: []

  - id: authenticate
    label: Authenticate
    kind: action
    command:
      method: authenticate
    params:
      - name: code
        type: integer
        description: Secret passcode for elevated access level

  - id: property_set
    label: Set Property
    kind: action
    command:
      method: property.set
    params:
      - name: property
        type: string
        description: Property name in dot notation
      - name: value
        type: any
        description: Value to set
    notes: Wait for confirmation before setting the same property again.

  - id: property_get
    label: Get Property
    kind: action
    command:
      method: property.get
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: property_subscribe
    label: Subscribe to Property
    kind: action
    command:
      method: property.subscribe
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: property_unsubscribe
    label: Unsubscribe from Property
    kind: action
    command:
      method: property.unsubscribe
    params:
      - name: property
        type: string
        description: Property name or array of property names

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command:
      method: signal.subscribe
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command:
      method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: introspect
    label: Introspect Object
    kind: action
    command:
      method: introspect
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty for root)
      - name: recursive
        type: boolean
        description: If false only list object names one level deep

  - id: select_source
    label: Select Input Source
    kind: action
    command:
      method: property.set
    params:
      - name: property
        type: string
        constant: "image.window.main.source"
      - name: value
        type: string
        description: Source name from image.source.list (e.g. DisplayPort 1, HDMI, HDBaseT, SDI)

  - id: image_source_list
    label: List Available Sources
    kind: action
    command:
      method: image.source.list
    params: []

  - id: image_connector_list
    label: List Connectors
    kind: action
    command:
      method: image.connector.list
    params: []

  - id: shutter_toggle
    label: Toggle Shutter
    kind: action
    command:
      method: optics.shutter.toggle
    params: []

  - id: eco_wake_serial
    label: Wake from ECO via Serial
    kind: action
    command:
      raw: ":POWR1\r"
    params: []
    notes: ASCII command sent over RS-232 only to wake from ECO mode. Alternatives include Wake-on-LAN or physical buttons.

  - id: environment_getcontrolblocks
    label: Get Environment Sensors
    kind: action
    command:
      method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
      - name: valuetype
        type: string
        values: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: action
    command:
      method: environment.getalarminfo
    params: []

  - id: notification_list
    label: List Active Notifications
    kind: action
    command:
      method: notification.list
    params: []

  - id: notification_dismiss
    label: Dismiss Notification
    kind: action
    command:
      method: notification.dismiss
    params:
      - name: id
        type: string
      - name: response
        type: string
        values: [NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS]

  - id: notification_suppress
    label: Suppress Notification Code
    kind: action
    command:
      method: notification.suppress
    params:
      - name: code
        type: string

  - id: system_getidentification
    label: Get Device Identification
    kind: action
    command:
      method: system.getidentification
    params: []

  - id: system_getidentifications
    label: Get All Identifications
    kind: action
    command:
      method: system.getidentifications
    params: []

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: action
    command:
      method: firmware.listcomponents
    params: []

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: action
    command:
      method: firmware.listcomponentversionstatus
    params: []

  - id: statistics_listcounters
    label: List Statistics Counters
    kind: action
    command:
      method: statistics.listcounters
    params: []

  - id: system_boards_getboardlist
    label: Get Board List
    kind: action
    command:
      method: system.boards.getboardlist
    params: []

  - id: system_boards_getboardinfo
    label: Get Board Info
    kind: action
    command:
      method: system.boards.getboardinfo
    params:
      - name: boardname
        type: string

  - id: system_activity
    label: Signal User Activity
    kind: action
    command:
      method: system.activity
    params: []
    notes: Resets timeout countdown timers.

  - id: keydispatcher_sendclickevent
    label: Send Key Click
    kind: action
    command:
      method: keydispatcher.sendclickevent
    params:
      - name: key
        type: string
        values: [RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1, RC_2, RC_3, RC_4, RC_5, RC_6, RC_7, RC_8, RC_9, RC_0, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY]

  - id: image_testpattern_list
    label: List Test Patterns
    kind: action
    command:
      method: image.testpattern.list
    params: []

  - id: image_testpattern_setproperties
    label: Set Test Pattern Properties
    kind: action
    command:
      method: image.testpattern.setproperties
    params:
      - name: id
        type: string
      - name: properties
        type: array
        description: Array of {key, value} pairs

  - id: image_window_list
    label: List Windows
    kind: action
    command:
      method: image.window.list
    params: []

  - id: network_list
    label: List Network Devices
    kind: action
    command:
      method: network.list
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    property: system.state

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state

  - id: active_source
    type: string
    property: image.window.main.source

  - id: laser_power
    type: float
    property: illumination.sources.laser.power

  - id: laser_max_power
    type: float
    property: illumination.sources.laser.maxpower

  - id: laser_min_power
    type: float
    property: illumination.sources.laser.minpower

  - id: laser_power_limited
    type: boolean
    property: illumination.sources.laser.ispowerlimited

  - id: laser_power_limit_reason
    type: string
    property: illumination.sources.laser.powerlimitreason

  - id: brightness
    type: float
    property: image.brightness
    constraints: {min: -1, max: 1, precision: 0.01}

  - id: contrast
    type: float
    property: image.contrast
    constraints: {min: 0, max: 2, precision: 0.01}

  - id: saturation
    type: float
    property: image.saturation
    constraints: {min: 0, max: 2, precision: 0.01}

  - id: gamma
    type: float
    property: image.gamma
    constraints: {min: 1, max: 3, precision: 0.1}

  - id: sharpness
    type: integer
    property: image.sharpness
    constraints: {min: -2, max: 8}

  - id: intensity
    type: float
    property: image.intensity
    constraints: {min: 0, max: 1, precision: 0.01}

  - id: shutter_position
    type: enum
    values: [Open, Closed]
    property: optics.shutter.position

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: firmware_version
    type: string
    property: system.firmwareversion

  - id: model_name
    type: string
    property: system.modelname

  - id: serial_number
    type: string
    property: system.serialnumber

  - id: family_name
    type: string
    property: system.familyname

  - id: article_number
    type: string
    property: system.articlenumber

  - id: orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    property: image.orientation

  - id: display_mode
    type: enum
    values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
    property: image.display.displaymode

  - id: detected_signal
    type: object
    property: "image.connector.{name}.detectedsignal"
    description: Returns active bool, resolution name, horizontal/vertical totals, frequencies, pixel rate, scan type, bits per component, color space, signal range, chroma sampling, gamma type

  - id: eco_available
    type: boolean
    property: system.eco.available

  - id: standby_available
    type: boolean
    property: system.standby.available

  - id: network_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: network_ip4config
    type: object
    property: network.device.lan.ip4config
    description: Current IPv4 config with Address, Mask, Gateway, NameServers

  - id: network_hwaddress
    type: string
    property: network.device.lan.hwaddress

  - id: clo_state
    type: enum
    values: [Ok, TooDim, TooBright]
    property: illumination.clo.state

  - id: clo_availability
    type: enum
    values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
    property: illumination.clo.availability

  - id: license_valid
    type: boolean
    property: system.license.valid

  - id: resolution
    type: string
    property: image.resolution.resolution
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
    access: rw
    description: Normalized brightness/offset. 0 is default.

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    precision: 0.01
    access: rw
    description: Normalized contrast/gain. 1 is default.

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    precision: 0.01
    access: rw
    description: Normalized saturation. 1 is default.

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    precision: 0.1
    access: rw
    description: Image gamma. Default is 2.2.

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    access: rw

  - id: image_intensity
    property: image.intensity
    type: float
    min: 0
    max: 1
    precision: 0.01
    access: rw

  - id: laser_power
    property: illumination.sources.laser.power
    type: float
    access: rw
    description: Target laser power in percent.

  - id: window_source
    property: image.window.main.source
    type: string
    access: rw
    description: Active source name for main window.

  - id: window_position
    property: image.window.main.position
    type: object
    access: rw
    description: "{x: int, y: int}"

  - id: window_size
    property: image.window.main.size
    type: object
    access: rw
    description: "{width: int, height: int}"

  - id: scaling_mode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    access: rw

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: rw
    description: Globally enable/disable warp.

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: rw

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: rw
    description: Name of the selected warp grid file.

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: rw

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: string
    access: rw

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: rw

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: rw

  - id: orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    access: rw

  - id: initial_state
    property: system.initialstate
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    access: rw
    description: State to transition to when unit starts.

  - id: eco_enable
    property: system.eco.enable
    type: boolean
    access: rw

  - id: standby_enable
    property: system.standby.enable
    type: boolean
    access: rw

  - id: network_configuration
    property: network.device.lan.configuration
    type: enum
    values: [AUTO, MANUAL]
    access: rw

  - id: network_ip4config_manual
    property: network.device.lan.ip4configmanual
    type: object
    access: rw
    description: "{Address, Mask, Gateway, NameServers}"

  - id: dmx_artnet
    property: dmx.artnet
    type: boolean
    access: rw
    description: Enable/disable ArtNet.

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512
    access: rw

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: rw
    description: Enable/disable DMX shutdown.

  - id: dmx_shutdowntimeout
    property: dmx.shutdowntimeout
    type: integer
    access: rw
    description: Shutdown timeout in minutes.

  - id: stealth_mode
    property: ui.stealthmode
    type: enum
    values: [Off, On]
    access: rw
    description: When on all controllable LEDs are switched off.

  - id: testpattern_show
    property: image.testpattern.show
    type: boolean
    access: rw

  - id: testpattern_selected
    property: image.testpattern.selected
    type: string
    access: rw
    description: Unique ID of the selected pattern.

  - id: clo_enable
    property: illumination.clo.enable
    type: boolean
    access: rw
    description: Enable constant light output.

  - id: clo_scale
    property: illumination.clo.scale
    type: float
    access: rw
    description: Percentage to scale CLO setpoint by.

  - id: clo_setpoint
    property: illumination.clo.setpoint
    type: float
    access: rw
    description: Target luminosity for CLO.

  - id: display_desired_mode
    property: image.display.desireddisplaymode
    type: enum
    values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
    access: rw

  - id: blend_scurve
    property: image.processing.blend.scurve
    type: float
    min: 1
    max: 4
    precision: 0.1
    access: rw

  - id: remotecontrol_address
    property: remotecontrol.address
    type: integer
    min: 1
    max: 31
    access: rw
    description: IR remote control address.
```

## Events
```yaml
events:
  - id: property_changed
    description: Fired when a subscribed property value changes
    method: property.changed
    payload:
      property: "array of {property_name: value} objects"

  - id: signal_callback
    description: Fired when a subscribed signal triggers
    method: signal.callback
    payload:
      signal: "array of {signal_name: {arg1: val1, ...}} objects"

  - id: model_updated
    description: Fired when API objects appear or disappear
    signal: modelupdated
    payload:
      object: string
      newobject: boolean
      accesslevel: "enum [UNAUTHENTICATED_END_USER, END_USER, POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT, INACCESSIBLE]"

  - id: notification_emitted
    description: Fired when a new notification is emitted
    signal: notification.emitted
    payload:
      notification: "object with severity, id, code, timestamp, message, timeout, actions"

  - id: notification_dismissed
    description: Fired when a notification is dismissed
    signal: notification.dismissed

  - id: system_performed
    description: Fired when reset domains complete resetting
    signal: system.performed
    payload:
      domains: "array of domain enum values"

  - id: system_identificationchanged
    description: Fired when an identification changes
    signal: system.identificationchanged

  - id: warp_file_listchanged
    description: Fired when warp file list changes
    signal: image.processing.warp.file.listchanged

  - id: blend_file_listchanged
    description: Fired when blend file list changes
    signal: image.processing.blend.file.listchanged

  - id: blacklevel_file_listchanged
    description: Fired when black level file list changes
    signal: image.processing.blacklevel.file.listchanged

  - id: testpattern_added
    description: Fired when a test pattern is added
    signal: image.testpattern.added

  - id: testpattern_removed
    description: Fired when a test pattern is removed
    signal: image.testpattern.removed

  - id: testpattern_changed
    description: Fired when a test pattern changes
    signal: image.testpattern.changed

  - id: network_added
    description: Fired when a network device is added
    signal: network.added

  - id: network_removed
    description: Fired when a network device is removed
    signal: network.removed
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe explicit safety interlock procedures.
# Source notes: good practice to verify projector state before power on/off.
# ECO mode wake requires special handling (WOL, serial :POWR1\r, or physical button).
```

## Notes
- All commands use JSON-RPC 2.0 over both TCP (port 9090) and RS-232 serial. The same command set is available on both transports.
- Object and method names use lowercase dot notation (e.g. `image.brightness`, `system.state`).
- Properties are accessed via generic `property.get` / `property.set` / `property.subscribe` / `property.unsubscribe` methods. Dedicated methods exist for listing operations (e.g. `image.source.list`, `image.connector.list`).
- Property subscriptions deliver change notifications via `property.changed` on the client. Initial values are NOT sent on subscribe; use `property.get` to read current value first.
- Source selection generates two `property.changed` notifications: one for deselection of old source (empty string value), one for selection of new source.
- `property.set` should not be called repeatedly for the same property without waiting for confirmation, as this may flood the server and reduce performance.
- The introspection API (`introspect` method) allows runtime discovery of all available objects, properties, methods, and signals. Metadata includes type constraints (min, max, precision, step-size) for building UI controls.
- Authentication is optional for end-user access; a passcode is required only for elevated access levels (power user, service, etc.). Access levels include: UNAUTHENTICATED_END_USER, END_USER, POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT, INACCESSIBLE.
- File transfers use HTTP POST (upload) and GET (download) at endpoints like `http://{ip}/api/image/processing/warp/file/transfer`. Supported formats include PNG (up to 16-bit), JPEG, TIFF for blend/black level masks.
- ECO mode wake requires Wake-on-LAN (MAC address), physical power button, or serial ASCII command `:POWR1\r`.
- The full property catalog is extensive (hundreds of properties). The introspect API should be used for complete runtime discovery. Key property groups: system, image, illumination, optics, network, environment, dmx, ui, statistics, notification.
- Connector signal detection (`image.connector.{name}.detectedsignal`) returns detailed signal info including resolution, frequencies, color space, chroma sampling, and stereo mode.
- The `environment.getcontrolblocks` method provides access to temperature sensors, fan speeds, voltages, and other environmental data as a flat dictionary.

<!-- UNRESOLVED: exact projector model names and hardware variants not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: maximum concurrent TCP/serial connection limits not stated -->
<!-- UNRESOLVED: JSON-RPC message size limits or fragmentation behavior not documented -->
<!-- UNRESOLVED: error recovery sequences and fault behavior not documented beyond error response objects -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
retrieved_at: 2026-04-29T22:42:13.413Z
last_checked_at: 2026-04-23T15:17:09.370Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:17:09.370Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched literally in source; transport parameters (port 9090, 19200 baud, 8-N-1) verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
