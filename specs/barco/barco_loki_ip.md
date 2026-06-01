---
spec_id: admin/barco-loki
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Loki Control Spec"
manufacturer: Barco
model_family: "Barco Loki"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Loki"
    - "UDX (Pulse-based projectors)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:53:51.437Z
generated_at: 2026-05-20T05:53:51.437Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:53:51.437Z
  matched_actions: 82
  action_count: 82
  confidence: high
  summary: "All 82 spec actions map to documented Pulse API methods; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Barco Loki Control Spec

## Summary

The Barco Loki is a Pulse-based projector controlled via a JSON-RPC 2.0 API (referred to as the Pulse API). It supports both TCP/IP (port 9090) and RS-232 serial connections. This spec covers power control, input source selection, image settings, illumination, optics, and environment monitoring via the structured JSON-RPC method/property/signal interface.

<!-- UNRESOLVED: specific Loki hardware model identifiers not confirmed in source; document covers "Pulse-based projectors" and UDX series generically -->

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
  type: optional
  # Authentication is optional: normal end-user access requires no authentication.
  # A passcode-based authenticate method is available for elevated (power user / service) access.
  # Method: authenticate, params: { code: <integer passcode> }
```

## Traits

```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source set/get commands
- queryable       # inferred from property.get commands returning device state
- levelable       # inferred from image.brightness, image.contrast, illumination.sources.laser.power controls
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: >
    JSON-RPC method: system.poweron. Returns null on success.
    Best practice: verify system.state is "standby" or "ready" before issuing.

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: >
    JSON-RPC method: system.poweroff. Returns null on success.
    Best practice: verify system.state is "on" before issuing.

- id: reboot
  label: Reboot
  kind: action
  params: []
  notes: JSON-RPC method: system.reboot. Powers off projector first.

- id: goto_ready
  label: Go To Ready State
  kind: action
  params: []
  notes: JSON-RPC method: system.gotoready.

- id: goto_eco
  label: Go To ECO State
  kind: action
  params: []
  notes: JSON-RPC method: system.gotoeco.

- id: select_source
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: >
        Source name string, e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2",
        "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI",
        "Dual Head DisplayPort", "HDBaseT", "SDI"
  notes: >
    JSON-RPC method: property.set, property: "image.window.main.source", value: <source string>

- id: set_brightness
  label: Set Image Brightness
  kind: action
  params:
    - name: value
      type: float
      description: Normalized brightness offset. 0 = default, range -1.0 to 1.0, precision 0.01.
  notes: JSON-RPC method: property.set, property: "image.brightness"

- id: set_contrast
  label: Set Image Contrast
  kind: action
  params:
    - name: value
      type: float
      description: Normalized contrast/gain. 1 = default, range 0 to 2, precision 0.01.
  notes: JSON-RPC method: property.set, property: "image.contrast"

- id: set_saturation
  label: Set Image Saturation
  kind: action
  params:
    - name: value
      type: float
      description: Normalized saturation. 1 = default, range 0 to 2, precision 0.01.
  notes: JSON-RPC method: property.set, property: "image.saturation"

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Normalized sharpness. Range -2 to 8.
  notes: JSON-RPC method: property.set, property: "image.sharpness"

- id: set_gamma
  label: Set Image Gamma
  kind: action
  params:
    - name: value
      type: float
      description: Gamma value. Default 2.2, range 1 to 3, precision 0.1.
  notes: JSON-RPC method: property.set, property: "image.gamma"

- id: set_intensity
  label: Set Image Intensity
  kind: action
  params:
    - name: value
      type: float
      description: Intensity. Range 0 to 1, step 0.1, precision 0.01.
  notes: JSON-RPC method: property.set, property: "image.intensity"

- id: set_laser_power
  label: Set Laser Power
  kind: action
  params:
    - name: value
      type: float
      description: Target laser power in percent (0 to 100).
  notes: JSON-RPC method: property.set, property: "illumination.sources.laser.power"

- id: set_shutter_target
  label: Set Shutter Position
  kind: action
  params:
    - name: target
      type: enum
      values: ["Open", "Closed"]
      description: Target shutter position.
  notes: JSON-RPC method: property.set, property: "optics.shutter.target"

- id: toggle_shutter
  label: Toggle Shutter
  kind: action
  params: []
  notes: JSON-RPC method: optics.shutter.toggle. Toggles between Open and Closed.

- id: set_orientation
  label: Set Image Orientation
  kind: action
  params:
    - name: orientation
      type: enum
      values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  notes: JSON-RPC method: property.set, property: "image.orientation"

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  notes: JSON-RPC method: property.set, property: "image.window.main.scalingmode"

- id: set_display_mode
  label: Set Display Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["Mono", "AutoStereo", "ActiveStereo", "NightVision", "IGPixelShift"]
  notes: JSON-RPC method: property.set, property: "image.display.desireddisplaymode"

- id: set_resolution
  label: Set Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: Resolution description string (use image.resolution.list to enumerate options).
  notes: JSON-RPC method: property.set, property: "image.resolution.resolution"

- id: enable_warp
  label: Enable/Disable Warp
  kind: action
  params:
    - name: enable
      type: boolean
  notes: JSON-RPC method: property.set, property: "image.processing.warp.enable"

- id: set_warp_file
  label: Select Warp File
  kind: action
  params:
    - name: filename
      type: string
  notes: JSON-RPC method: property.set, property: "image.processing.warp.file.selected"

- id: enable_warp_file
  label: Enable/Disable File Warp
  kind: action
  params:
    - name: enable
      type: boolean
  notes: JSON-RPC method: property.set, property: "image.processing.warp.file.enable"

- id: set_blend_file
  label: Select Blend Mask File
  kind: action
  params:
    - name: filename
      type: string
  notes: JSON-RPC method: property.set, property: "image.processing.blend.file.selected"

- id: enable_blend_file
  label: Enable/Disable File Blend
  kind: action
  params:
    - name: enable
      type: boolean
  notes: JSON-RPC method: property.set, property: "image.processing.blend.file.enable"

- id: set_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  params:
    - name: filename
      type: string
  notes: JSON-RPC method: property.set, property: "image.processing.blacklevel.file.selected"

- id: enable_blacklevel_file
  label: Enable/Disable Black Level File Correction
  kind: action
  params:
    - name: enable
      type: boolean
  notes: JSON-RPC method: property.set, property: "image.processing.blacklevel.file.enable"

- id: show_test_pattern
  label: Show/Hide Test Pattern
  kind: action
  params:
    - name: show
      type: boolean
  notes: JSON-RPC method: property.set, property: "image.testpattern.show"

- id: select_test_pattern
  label: Select Test Pattern
  kind: action
  params:
    - name: id
      type: string
      description: Unique pattern ID (use image.testpattern.list to enumerate).
  notes: JSON-RPC method: property.set, property: "image.testpattern.selected"

- id: system_reset
  label: Reset Domains
  kind: action
  params:
    - name: domains
      type: array
      description: >
        List of domain enum values to reset:
        ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp,
        ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay,
        ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination,
        Network, Screen, System, LightMeasurement, Dmx
  notes: JSON-RPC method: system.reset. Asynchronous; completion signalled by system.performed signal.

- id: system_reset_all
  label: Reset All Domains
  label: Reset All Domains
  kind: action
  params: []
  notes: JSON-RPC method: system.resetall.

- id: send_key_click
  label: Send Remote Control Key Click
  kind: action
  params:
    - name: key
      type: enum
      values:
        - RC_SHUTTER_OPEN
        - RC_SHUTTER_CLOSE
        - RC_POWER_ON
        - RC_POWER_OFF
        - RC_OSD
        - RC_LCD
        - RC_PATTERN
        - RC_RGB
        - RC_ZOOM_PLUS
        - RC_ZOOM_MINUS
        - RC_SHIFT_LEFT
        - RC_SHIFT_UP
        - RC_SHIFT_RIGHT
        - RC_SHIFT_DOWN
        - RC_FOCUS_PLUS
        - RC_FOCUS_MINUS
        - RC_MENU
        - RC_DEFAULT
        - RC_BACK
        - RC_UP
        - RC_LEFT
        - RC_OK
        - RC_RIGHT
        - RC_DOWN
        - RC_ADDRESS
        - RC_INPUT
        - RC_MACRO
        - RC_1
        - RC_2
        - RC_3
        - RC_4
        - RC_5
        - RC_6
        - RC_7
        - RC_8
        - RC_9
        - RC_0
        - RC_ASTERISK
        - RC_NUMBER
        - KP_LEFT
        - KP_UP
        - KP_OK
        - KP_RIGHT
        - KP_DOWN
        - KP_MENU
        - KP_POWER
        - KP_BACK
        - KP_OSD
        - KP_LENS
        - KP_PATTERN
        - KP_SHUTTER
        - KP_INPUT
        - KP_STANDBY
  notes: JSON-RPC method: keydispatcher.sendclickevent. Sends press + release.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names (dot-notation).
  notes: JSON-RPC method: property.subscribe. Client receives property.changed notifications.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names.
  notes: JSON-RPC method: property.unsubscribe.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names.
  notes: JSON-RPC method: signal.subscribe. Client receives signal.callback notifications.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string_or_array
  notes: JSON-RPC method: signal.unsubscribe.

- id: lens_shift_to_center
  label: Shift Lens to Center
  kind: action
  params: []
  notes: JSON-RPC method: optics.shifttocenter.

- id: enable_clo
  label: Enable Constant Light Output (CLO)
  kind: action
  params:
    - name: enable
      type: boolean
  notes: JSON-RPC method: property.set, property: "illumination.clo.enable"

- id: clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  params: []
  notes: JSON-RPC method: illumination.clo.engage.

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  params:
    - name: code
      type: integer
      description: Secret passcode for elevated access level.
  notes: >
    JSON-RPC method: authenticate. Only required for access levels above normal end-user.
    Returns true on success.
- id: property_get
  label: Get Property Value
  kind: query
  params:
    - name: property
      type: string
      description: Property name or array of property names (dot-notation).
  notes: "JSON-RPC method: property.get. Returns current value(s) of the named property/properties."

- id: introspect
  label: Introspect API Object
  kind: query
  params:
    - name: object
      type: string
      description: Object name to introspect (dot-notation). Omit or leave empty to introspect everything.
    - name: recursive
      type: boolean
      description: If false, only list one level of object names.
  notes: "JSON-RPC method: introspect. Returns metadata for the specified object."

- id: get_environment_control_blocks
  label: Get Environment Control Blocks
  kind: query
  params:
    - name: type
      type: string
      description: "Block type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)."
    - name: valuetype
      type: string
      description: "Value type (Temperature, Speed, PWM, Voltage, etc.)."
  notes: "JSON-RPC method: environment.getcontrolblocks."

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  params: []
  notes: "JSON-RPC method: environment.getalarminfo."

- id: list_reset_domains
  label: List Reset Domains
  kind: query
  params: []
  notes: "JSON-RPC method: system.listresetdomains."

- id: system_activity
  label: Signal User Activity
  kind: action
  params: []
  notes: "JSON-RPC method: system.activity. Resets timeout countdown timers."

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  params: []
  notes: "JSON-RPC method: firmware.listcomponents."

- id: list_firmware_component_version_status
  label: List Firmware Component Version Status
  kind: query
  params: []
  notes: "JSON-RPC method: firmware.listcomponentversionstatus."

- id: schedule_firmware_component_upgrade
  label: Schedule Component Firmware Upgrade
  kind: action
  params: []
  notes: "JSON-RPC method: firmware.schedulecomponentupgrade."

- id: dismiss_notification
  label: Dismiss Notification
  kind: action
  params:
    - name: id
      type: string
      description: Notification id.
    - name: response
      type: string
      description: "Response enum: NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS."
  notes: "JSON-RPC method: notification.dismiss."

- id: list_notifications
  label: List Active Notifications
  kind: query
  params: []
  notes: "JSON-RPC method: notification.list."

- id: log_notifications
  label: List Saved Notifications
  kind: query
  params:
    - name: minimumseverity
      type: string
      description: "Minimum severity enum: INFO, CAUTION, WARNING, ERROR, CRITICAL."
    - name: start
      type: integer
    - name: count
      type: integer
  notes: "JSON-RPC method: notification.log."

- id: suppress_notification
  label: Suppress Notification Code
  kind: action
  params:
    - name: code
      type: string
  notes: "JSON-RPC method: notification.suppress."

- id: unsuppress_notification
  label: Unsuppress Notification Code
  kind: action
  params:
    - name: code
      type: string
  notes: "JSON-RPC method: notification.unsuppress."

- id: unsuppress_all_notifications
  label: Unsuppress All Notification Codes
  kind: action
  params: []
  notes: "JSON-RPC method: notification.unsuppressall."

- id: list_suppressed_notifications
  label: List Suppressed Notification Codes
  kind: query
  params: []
  notes: "JSON-RPC method: notification.listsuppressed."

- id: send_key_press_event
  label: Send Remote Control Key Press Event
  kind: action
  params:
    - name: key
      type: string
      description: Key code enum value.
  notes: "JSON-RPC method: keydispatcher.sendpressevent."

- id: send_key_release_event
  label: Send Remote Control Key Release Event
  kind: action
  params:
    - name: key
      type: string
      description: Key code enum value.
  notes: "JSON-RPC method: keydispatcher.sendreleaseevent."

- id: list_connectors
  label: List Input Connectors
  kind: query
  params: []
  notes: "JSON-RPC method: image.connector.list."

- id: list_sources
  label: List Available Input Sources
  kind: query
  params: []
  notes: "JSON-RPC method: image.source.list."

- id: list_display_modes
  label: List Available Display Modes
  kind: query
  params: []
  notes: "JSON-RPC method: image.display.listdisplaymodes."

- id: list_resolutions
  label: List Available Resolutions
  kind: query
  params: []
  notes: "JSON-RPC method: image.resolution.list."

- id: list_test_patterns
  label: List Available Test Patterns
  kind: query
  params: []
  notes: "JSON-RPC method: image.testpattern.list."

- id: list_test_pattern_files
  label: List Custom Test Pattern Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.testpattern.file.list."

- id: delete_test_pattern_file
  label: Delete Test Pattern File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.testpattern.file.delete."

- id: set_test_pattern_properties
  label: Set Test Pattern Properties
  kind: action
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of key/value pairs.
  notes: "JSON-RPC method: image.testpattern.setproperties."

- id: list_warp_files
  label: List Warp Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.warp.file.list."

- id: delete_warp_file
  label: Delete Warp File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.warp.file.delete."

- id: list_blend_files
  label: List Blend Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.blend.file.list."

- id: delete_blend_file
  label: Delete Blend File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.blend.file.delete."

- id: list_blacklevel_files
  label: List Black Level Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.blacklevel.file.list."

- id: delete_blacklevel_file
  label: Delete Black Level File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.blacklevel.file.delete."

- id: get_warp_grid
  label: Get Warp Grid Points
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.warpgrid.getgrid."

- id: get_warp_grid_size
  label: Get Warp Grid Size
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.warpgrid.getgridsize."

- id: calibrate_focus
  label: Calibrate Focus Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.focus.calibrate."

- id: calibrate_lens_shift_horizontal
  label: Calibrate Horizontal Lens Shift Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.horizontal.calibrate."

- id: calibrate_lens_shift_vertical
  label: Calibrate Vertical Lens Shift Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.vertical.calibrate."

- id: calibrate_zoom
  label: Calibrate Zoom Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.zoom.calibrate."

- id: get_light_output
  label: Get Light Output (Lumens)
  kind: query
  params: []
  notes: "JSON-RPC method: lightmeasurement.getlightoutput."

- id: list_network_devices
  label: List Network Devices
  kind: query
  params: []
  notes: "JSON-RPC method: network.list."

- id: get_system_date
  label: Get System Date (UTC)
  kind: query
  params: []
  notes: "JSON-RPC method: system.getsystemdate."

- id: list_statistics_counters
  label: List Statistics Counters
  kind: query
  params: []
  notes: "JSON-RPC method: statistics.listcounters."

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  params: []
  notes: "JSON-RPC method: illumination.laser.getserialnumber."

- id: list_remote_control_sensors
  label: List IR Remote Control Sensors
  kind: query
  params: []
  notes: "JSON-RPC method: remotecontrol.listsensors."

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  params: []
  notes: "JSON-RPC method: dmx.listmodes."

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  params: []
  notes: "JSON-RPC method: dmx.listchannels."

- id: next_rgb_mode
  label: Cycle to Next RGB Mode
  kind: action
  params: []
  notes: "JSON-RPC method: image.color.rgbmode.nextrgbmode."

- id: list_windows
  label: List Available Windows
  kind: query
  params: []
  notes: "JSON-RPC method: image.window.list."
```

## Feedbacks

```yaml
- id: system_state
  label: System State
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "error", "service"]
  notes: >
    JSON-RPC property: system.state (read-only).
    Subscribe via property.subscribe for change notifications.

- id: illumination_state
  label: Illumination State
  type: enum
  values: ["On", "Off"]
  notes: JSON-RPC property: illumination.state (read-only).

- id: shutter_position
  label: Shutter Position
  type: enum
  values: ["Open", "Closed"]
  notes: JSON-RPC property: optics.shutter.position (read-only).

- id: active_source
  label: Active Source
  type: string
  notes: >
    JSON-RPC property: image.window.main.source (read/write).
    Empty string indicates no source selected.

- id: alarm_state
  label: Alarm State
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  notes: JSON-RPC property: environment.alarmstate (read-only).

- id: laser_power
  label: Laser Power (current)
  type: float
  notes: JSON-RPC property: illumination.sources.laser.power (read/write, %).

- id: laser_max_power
  label: Laser Max Power
  type: float
  notes: JSON-RPC property: illumination.sources.laser.maxpower (read-only, %).

- id: laser_min_power
  label: Laser Min Power
  type: float
  notes: JSON-RPC property: illumination.sources.laser.minpower (read-only, %).

- id: laser_is_power_limited
  label: Laser Power Limited
  type: boolean
  notes: JSON-RPC property: illumination.sources.laser.ispowerlimited (read-only).

- id: laser_power_limit_reason
  label: Laser Power Limit Reason
  type: string
  notes: JSON-RPC property: illumination.sources.laser.powerlimitreason (read-only).

- id: display_mode
  label: Current Display Mode
  type: enum
  values: ["Mono", "AutoStereo", "ActiveStereo", "NightVision", "IGPixelShift"]
  notes: JSON-RPC property: image.display.displaymode (read-only).

- id: display_frequency
  label: Display Frequency
  type: float
  notes: JSON-RPC property: image.display.frequency (read-only).

- id: firmware_version
  label: Firmware Version
  type: string
  notes: JSON-RPC property: firmware.firmwareversion (read-only).

- id: network_state
  label: Network Device State
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  notes: JSON-RPC property: network.device.lan.state (read-only).

- id: clo_state
  label: CLO State
  type: enum
  values: ["Ok", "TooDim", "TooBright"]
  notes: JSON-RPC property: illumination.clo.state (read-only).

- id: clo_availability
  label: CLO Availability
  type: enum
  values: ["Available", "SensorUnavailable", "PendingWarmup", "Unavailable", "Unknown"]
  notes: JSON-RPC property: illumination.clo.availability (read-only).

- id: lens_present
  label: Lens Present
  type: boolean
  notes: JSON-RPC property: optics.lenspresent (read-only).

- id: connector_detected_signal
  label: Connector Detected Signal Info
  type: object
  notes: >
    JSON-RPC property: image.connector.[connector].detectedsignal (read-only).
    Returns: active (bool), name (string), resolution, timing params, color_space, scan, gamma_type, etc.
```

## Variables

```yaml
- id: image_brightness
  label: Image Brightness
  type: float
  constraints: {min: -1, max: 1, precision: 0.01}
  notes: JSON-RPC property: image.brightness (read/write).

- id: image_contrast
  label: Image Contrast
  type: float
  constraints: {min: 0, max: 2, precision: 0.01}
  notes: JSON-RPC property: image.contrast (read/write).

- id: image_saturation
  label: Image Saturation
  type: float
  constraints: {min: 0, max: 2, precision: 0.01}
  notes: JSON-RPC property: image.saturation (read/write).

- id: image_sharpness
  label: Image Sharpness
  type: integer
  constraints: {min: -2, max: 8}
  notes: JSON-RPC property: image.sharpness (read/write).

- id: image_gamma
  label: Image Gamma
  type: float
  constraints: {min: 1, max: 3, precision: 0.1}
  notes: JSON-RPC property: image.gamma (read/write). Default 2.2.

- id: image_intensity
  label: Image Intensity
  type: float
  constraints: {min: 0, max: 1, step: 0.1, precision: 0.01}
  notes: JSON-RPC property: image.intensity (read/write).

- id: illumination_laser_power
  label: Laser Power Target
  type: float
  constraints: {min: 0, max: 100}
  notes: JSON-RPC property: illumination.sources.laser.power (read/write, in percent).

- id: clo_setpoint
  label: CLO Setpoint (target luminosity)
  type: float
  notes: JSON-RPC property: illumination.clo.setpoint (read/write).

- id: clo_scale
  label: CLO Scale (setpoint scale %)
  type: float
  notes: JSON-RPC property: illumination.clo.scale (read/write).

- id: screen_luminance
  label: Screen Luminance
  type: float
  constraints: {min: 50, max: 10000, step: 10}
  notes: JSON-RPC property: screen.luminance (read/write, cd/m2).

- id: screen_hdr_boost
  label: HDR Boost Intensity
  type: float
  constraints: {min: 0.8, max: 1.2, step: 0.01}
  notes: JSON-RPC property: screen.hdrboost (read/write).

- id: transport_delay_desired
  label: Desired Transport Delay
  type: integer
  notes: JSON-RPC property: image.processing.transportdelay.desired (read/write).

- id: image_orientation
  label: Image Orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  notes: JSON-RPC property: image.orientation (read/write).

- id: initial_state
  label: Initial State on Power-up
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  notes: JSON-RPC property: system.initialstate (read/write).

- id: eco_enable
  label: ECO Mode Enabled
  type: boolean
  notes: JSON-RPC property: system.eco.enable (read/write).

- id: dmx_artnet_enable
  label: ArtNet Enabled
  type: boolean
  notes: JSON-RPC property: dmx.artnet (read/write).

- id: dmx_start_channel
  label: DMX Start Channel
  type: integer
  constraints: {min: 1, max: 512}
  notes: JSON-RPC property: dmx.startchannel (read/write).

- id: rgb_mode
  label: RGB Mode
  type: enum
  values: ["Full", "Red", "Green", "Blue", "RedGreen", "GreenBlue", "BlueRed"]
  notes: JSON-RPC property: image.color.rgbmode.rgbmode (read/write).
```

## Events

```yaml
# Unsolicited notifications delivered as JSON-RPC notifications (no id field, no response expected).

- id: property_changed
  label: Property Changed
  notes: >
    JSON-RPC method: property.changed. Params: { property: [ { "name": value }, ... ] }
    Sent when any subscribed property changes value.

- id: signal_callback
  label: Signal Callback
  notes: >
    JSON-RPC method: signal.callback. Params: { signal: [ { "name": { args } }, ... ] }
    Sent when a subscribed signal fires.

- id: model_updated
  label: Model Updated
  notes: >
    Signal: modelupdated. Args: object (string), newobject (bool), accesslevel (enum).
    Fires when API objects are added or removed (e.g. after firmware change).

- id: notification_emitted
  label: Notification Emitted
  notes: >
    Signal: notification.emitted. Args: notification object with severity, id, code, message, timeout, actions.
    Severity values: INFO, CAUTION, WARNING, ERROR, CRITICAL.

- id: system_performed
  label: System Reset Performed
  notes: >
    Signal: system.performed. Args: domains [ enum ].
    Emitted when one or more reset domains complete their reset.

- id: warp_grid_changed
  label: Warp Grid Changed
  notes: Signal: image.processing.warpgrid.gridchanged. Args: grid [ { x: float, y: float } ].

- id: source_changed
  label: Source Changed
  notes: >
    Delivered as property.changed notification on "image.window.main.source".
    Two notifications: first deselection (empty string), then selection (source name).
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step sequences defined in source beyond individual API calls.
# Example workflow (not a defined macro): power on sequence requires polling system.state
# until "standby" or "ready" before issuing system.poweron.
```

## Safety

```yaml
confirmation_required_for:
  - system.poweroff   # source recommends verifying system.state == "on" before issuing
  - system.poweron    # source recommends verifying system.state == "standby" or "ready" before issuing
  - system.reset      # asynchronous; subsequent reset calls fail until domains complete
  - system.resetall   # resets all domains simultaneously
interlocks:
  - description: >
      ECO mode wake-up via serial requires a special ASCII command ":POWR1\r" on RS-232
      (not the standard JSON-RPC method), or Wake-on-LAN, or physical button press.
  - description: >
      property.set should not be issued for the same property again until confirmation
      response is received (per source best practice note).
```

## Notes

The Barco Loki uses the Pulse API: JSON-RPC 2.0 framed messages over either TCP (port 9090) or RS-232 (19200 baud, 8N1). All commands are JSON objects with `jsonrpc`, `method`, and optional `params` and `id` fields.

**Protocol framing:** No explicit message delimiter is documented. Each JSON object is a complete request. The `id` field correlates requests to responses; omit it for fire-and-forget calls.

**Authentication:** For normal end-user operations (power, source selection, image settings), authentication is not required. Call `authenticate` with the passcode only when power-user or higher access is needed.

**HTTP file endpoints:** A secondary HTTP API at `http://[projector-ip]/api/[endpoint]` supports file upload/download for warp grids, blend masks, black level masks, EDID files, test patterns, and firmware. These use standard HTTP POST (multipart/form-data) and GET, not JSON-RPC.

**Introspection:** The API supports runtime introspection via the `introspect` method, allowing clients to discover available objects, methods, properties, and signals dynamically.

**Property access levels:** The `modelupdated` signal reports an `accesslevel` field indicating which access tier can see a given object. Some properties/methods are only accessible at power-user or service-partner level after authentication.

**ECO mode:** On projectors with ECO mode, waking from ECO via RS-232 requires sending the ASCII string `:POWR1\r` — this is a legacy serial command, not a JSON-RPC message.

<!-- UNRESOLVED: specific Barco Loki hardware article number or model identifier not found in source; the document covers "Pulse-based projectors" and UDX variants generically. -->
<!-- UNRESOLVED: authentication passcode value not stated in source (intentionally secret). -->
<!-- UNRESOLVED: complete list of available source names is device-dependent; use image.source.list to enumerate at runtime. -->
<!-- UNRESOLVED: warp grid XML file format not detailed in this document. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:53:51.437Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:53:51.437Z
matched_actions: 82
action_count: 82
confidence: high
summary: "All 82 spec actions map to documented Pulse API methods; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
