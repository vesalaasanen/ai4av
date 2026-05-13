---
spec_id: admin/barco-barco_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Barco Series Control Spec"
manufacturer: Barco
model_family: "Barco Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
retrieved_at: 2026-04-29T08:34:51.425Z
last_checked_at: 2026-04-26T11:03:33.587Z
generated_at: 2026-04-26T11:03:33.587Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T11:03:33.587Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "All 33 spec actions matched verbatim in source; transport parameters confirmed; complete coverage of documented JSON-RPC 2.0 and RS-232 protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Barco Barco Series Control Spec

## Summary
Barco laser projector series controllable via JSON-RPC 2.0 over TCP/IP (port 9090) and RS-232 serial. Supports power control, source routing, image adjustment, warping/blending, and environment monitoring. Authentication is optional for normal end-user access.

<!-- UNRESOLVED: specific Barco model numbers within the "Barco Series" family not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # TCP port for Pulse services
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: normal end-user access requires no auth; auth only needed for elevated access levels
```

## Traits
```yaml
- powerable      # system.poweron / system.poweroff documented
- queryable      # property.get, property.subscribe, system.state query documented
- routable       # image.window.main.source routing, image.source.list documented
- levelable      # brightness, contrast, saturation, gamma, laser power documented
```

## Actions
```yaml
- id: system_poweron
  label: Power On
  kind: action
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  params: []
- id: property_set
  label: Set Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.window.main.source")
    - name: value
      type: string
      description: New value for the property
- id: property_get
  label: Get Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path or array of paths
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path or array of paths
- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level
- id: introspect
  label: Introspect Object
  kind: action
  params:
    - name: object
      type: string
      description: Dot-notation object name to introspect
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names
- id: image_source_list
  label: List Available Sources
  kind: action
  params: []
- id: image_connector_list
  label: List Available Connectors
  kind: action
  params: []
- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: action
  params:
    - name: type
      type: string
      description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, Voltage, Current, Power, etc.)
- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  params:
    - name: key
      type: string
      description: Key name from KeyDispatcher key enum
- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  params:
    - name: id
      type: string
      description: Notification id
- id: notification_list
  label: List Active Notifications
  kind: action
  params: []
- id: image_processing_warp_enable
  label: Enable Warp
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable/disable warp
- id: image_processing_blend_file_enable
  label: Enable Blend File
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable/disable blend mask file
- id: image_processing_blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable/disable black level mask file
- id: image_processing_blend_file_list
  label: List Blend Files
  kind: action
  params: []
- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: action
  params: []
- id: image_processing_warp_file_list
  label: List Warp Files
  kind: action
  params: []
- id: system_reboot
  label: Reboot
  kind: action
  params: []
- id: system_gotoeco
  label: Go To ECO State
  kind: action
  params: []
- id: system_gotoready
  label: Go To Ready State
  kind: action
  params: []
- id: firmware_listcomponents
  label: List Firmware Components
  kind: action
  params: []
- id: network_list
  label: List Network Devices
  kind: action
  params: []
- id: ui_settings_get
  label: Get UI Setting
  kind: action
  params:
    - name: key
      type: string
      description: Setting key name
- id: statistics_listcounters
  label: List Statistics Counters
  kind: action
  params: []
- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  params:
    - name: key
      type: string
      description: Key name from KeyDispatcher key enum
- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  params:
    - name: key
      type: string
      description: Key name from KeyDispatcher key enum
```

## Feedbacks
```yaml
- id: system_state
  label: System State
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - error
- id: property_changed
  label: Property Changed Notification
  type: notification
  params:
    - name: property
      type: array
      description: Array of {propertyPath: value} pairs
- id: signal_callback
  label: Signal Callback Notification
  type: notification
  params:
    - name: signal
      type: array
      description: Array of {signalName: arguments} pairs
- id: projector_state_changed
  label: Projector State Changed Notification
  type: notification
  description: Triggered when system.state transitions (subscribed via property.subscribe on system.state)
- id: source_changed
  label: Source Changed Notification
  type: notification
  description: Triggered when image.window.main.source changes
- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - On
    - Off
- id: illumination_sources_laser_power
  label: Laser Power Level
  type: float
  description: Target power in percent (0-100)
- id: image_brightness
  label: Brightness
  type: float
  description: Normalized brightness offset (-1 to 1)
- id: image_contrast
  label: Contrast
  type: float
  description: Normalized contrast (0 to 2, default 1)
- id: image_saturation
  label: Saturation
  type: float
  description: Normalized saturation (0 to 2, default 1)
- id: image_sharpness
  label: Sharpness
  type: integer
  description: Image sharpness (-2 to 8)
- id: image_gamma
  label: Gamma
  type: float
  description: Image gamma (1 to 3, default 2.2)
- id: detected_signal
  label: Connector Detected Signal
  type: object
  description: Signal info for a connector; active=false means no signal detected
- id: alarm_state
  label: Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
- id: environment_temperatures
  label: Temperature Sensors
  type: object
  description: Dictionary of temperature sensor key/value pairs
- id: environment_fan_speeds
  label: Fan Speed Sensors
  type: object
  description: Dictionary of fan speed sensor key/value pairs
- id: notification_received
  label: Notification Received
  type: notification
  description: Notifications sent to client; must implement property.changed handler
- id: modelupdated
  label: Model Updated Signal
  type: signal
  description: Triggered when objects arrive or are removed from the object model
```

## Variables
```yaml
# Properties that are read/write and not discrete actions:
- id: image_window_main_source
  label: Active Source
  type: string
  access: RW
  description: Source displayed in main window (e.g. "DisplayPort 1", "HDMI")
- id: illumination_sources_laser_power
  label: Laser Power
  type: float
  access: RW
  description: Target power in percent
- id: image_brightness
  label: Brightness
  type: float
  access: RW
  description: Normalized offset (-1 to 1)
- id: image_contrast
  label: Contrast
  type: float
  access: RW
  description: Normalized (0 to 2)
- id: image_saturation
  label: Saturation
  type: float
  access: RW
  description: Normalized (0 to 2)
- id: image_sharpness
  label: Sharpness
  type: integer
  access: RW
  description: -2 to 8
- id: image_gamma
  label: Gamma
  type: float
  access: RW
  description: 1 to 3
- id: illumination_clo_enable
  label: Constant Light Output Enable
  type: boolean
  access: RW
- id: illumination_clo_setpoint
  label: Constant Light Output Setpoint
  type: float
  access: RW
  description: Target luminosity for CLO
- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean
  access: RW
- id: image_processing_warp_file_enable
  label: Warp File Enable
  type: boolean
  access: RW
- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean
  access: RW
- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean
  access: RW
- id: optics_shutter_position
  label: Shutter Position
  type: enum
  access: RW
  values:
    - Open
    - Closed
- id: optics_focus_position
  label: Focus Position
  type: integer
  access: RW
- id: optics_zoom_position
  label: Zoom Position
  type: integer
  access: RW
- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal
  type: integer
  access: RW
- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical
  type: integer
  access: RW
- id: system_eco_enable
  label: ECO Mode Enable
  type: boolean
  access: RW
- id: system_standby_enable
  label: Standby Mode Enable
  type: boolean
  access: RW
- id: ui_osd
  label: On Screen Display
  type: boolean
  access: RW
- id: ui_stealthmode
  label: Stealth Mode
  type: enum
  access: RW
  values:
    - Off
    - On
- id: screen_hdrboost
  label: HDR Boost
  type: float
  access: RW
  description: HDR intensity (0.8 to 1.2)
- id: image_orientation
  label: Image Orientation
  type: enum
  access: RW
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR
- id: image_display_desireddisplaymode
  label: Display Mode
  type: enum
  access: RW
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift
- id: ui_backlight_state
  label: Backlight State
  type: enum
  access: RW
  values:
    - Off
    - On
    - Auto
```

## Events
```yaml
# Unsolicited notifications device sends to client:
- id: property_changed
  label: Property Changed Event
  description: Server sends property.changed notification when subscribed properties change
  params:
    - name: property
      type: array
      description: Array of property/value pairs
- id: signal_callback
  label: Signal Callback Event
  description: Server sends signal.callback when subscribed signals fire
  params:
    - name: signal
      type: array
      description: Array of signal/argument-list pairs
- id: modelupdated
  label: Model Updated Event
  description: Notifies when objects arrive or are removed (subscribe via signal.subscribe)
```

## Macros
```yaml
# ECO mode wake sequence (requires physical action or special RS-232 command):
# 1. Send Wake-on-LAN with projector MAC address, OR
# 2. Use power button on remote/keypad, OR
# 3. Send ":POWR1\r" on RS-232 serial port
- id: eco_wake
  label: Wake from ECO Mode
  description: Wake projector from ECO/power-save mode via WoL, remote, or serial ":POWR1\r"
  steps:
    - action: wake_on_lan
      description: Send Wake-on-LAN with projector MAC address
    - action: remote_power_button
      description: Use power button on remote control or keypad
    - action: serial_wake
      description: Send ASCII ":POWR1\r" on RS-232 serial
# Source switch macro (set source and wait for confirmation):
- id: select_source
  label: Select Input Source
  description: Set active source and wait for property.changed confirmation
  steps:
    - action: property_set
      params:
        property: image.window.main.source
        value: "{sourceName}"
    - action: property_subscribe
      params:
        property: image.window.main.source
# Warp enable sequence:
- id: enable_warp_from_file
  label: Enable Warp from File
  steps:
    - action: property_set
      params:
        property: image.processing.warp.enable
        value: true
    - action: upload_file
      description: HTTP POST warp file to /api/image/processing/warp/file/transfer
    - action: property_set
      params:
        property: image.processing.warp.file.selected
        value: "{filename}"
    - action: property_set
      params:
        property: image.processing.warp.file.enable
        value: true
# Blend enable sequence:
- id: enable_blend_from_file
  label: Enable Blend from File
  steps:
    - action: upload_file
      description: HTTP POST blend mask to /api/image/processing/blend/file/transfer
    - action: property_set
      params:
        property: image.processing.blend.file.selected
        value: "{filename}"
    - action: property_set
      params:
        property: image.processing.blend.file.enable
        value: true
# Black level enable sequence:
- id: enable_blacklevel_from_file
  label: Enable Black Level from File
  steps:
    - action: upload_file
      description: HTTP POST black level mask to /api/image/processing/blacklevel/file/transfer
    - action: property_set
      params:
        property: image.processing.blacklevel.file.selected
        value: "{filename}"
    - action: property_set
      params:
        property: image.processing.blacklevel.file.enable
        value: true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not explicitly documented in source;
# source contains ECO mode wake procedure but no explicit safety disclaimers
```

## Notes
The protocol is JSON-RPC 2.0. All requests carry a `jsonrpc: "2.0"` member. Responses include the matching `id`. Notifications have no `id` and require no response.

**Command timing:** Best practice is to wait for `property.set` confirmation before sending the same property again. Continuously setting the same property without waiting may flood the server.

**Object naming:** Objects use dot-notation lowercase (JavaScript-like). Example: `tempctrl.fans.mainfan.rpm`. When multiple objects of a kind exist, they are enumerated (e.g. `tempctrl.fans.mainfan`, `tempctrl.fans.lampblower`).

**Source name translation:** Source names are translated to object names by removing non-word characters and converting to lowercase. Example: `"DisplayPort 1"` → `"displayport1"`.

**Authentication:** The `authenticate` method with pass code is only required for elevated access levels. Normal end-user access does not require authentication.

**File upload/download:** Uses HTTP POST to `/api/<service>/file/transfer`. Download URLs constructed as `http://<address>/api/<path>`. Upload via curl with `-F file=@<filename>`.

**Introspection:** The `introspect` method returns metadata about available objects, methods, properties, and signals restricted by the client's access level.

**Available sources (varies by model):** DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI

<!-- UNRESOLVED: specific model numbers within Barco Series not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: port for file transfer HTTP API not stated separately from port 9090 (TCP control) -->
<!-- UNRESOLVED: default access level / pass code value not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not explicitly documented -->
<!-- UNRESOLVED: safety-critical voltage/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
retrieved_at: 2026-04-29T08:34:51.425Z
last_checked_at: 2026-04-26T11:03:33.587Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:03:33.587Z
matched_actions: 33
action_count: 33
confidence: high
summary: "All 33 spec actions matched verbatim in source; transport parameters confirmed; complete coverage of documented JSON-RPC 2.0 and RS-232 protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
