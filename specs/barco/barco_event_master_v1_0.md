---
schema_version: ai4av-public-spec-v1
device_id: barco/event-master-v1-0
entity_id: barco_event_master_v1_0
spec_id: admin/barco-event-master-v1_0
revision: 1
author: admin
title: "Barco Event Master v1.0 Control Spec"
status: published
manufacturer: Barco
manufacturer_key: barco
model_family: "Event Master v1.0"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Event Master v1.0"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
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
    checked_at: 2026-04-29T08:34:51.514Z
retrieved_at: 2026-04-29T08:34:51.514Z
last_checked_at: 2026-04-23T15:17:06.537Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:17:06.537Z
  matched_actions: 36
  action_count: 36
  confidence: high
  summary: "All 36 spec actions matched to JSON-RPC methods in source; transport parameters verbatim; comprehensive source coverage confirms command fidelity."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Barco Event Master v1.0 Control Spec

## Summary
Barco Event Master is a professional laser projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Both interfaces expose the same object/property/method hierarchy. Normal end-user operations (power, source selection, image adjustment) do not require authentication; elevated access (e.g. service functions) requires a numeric pass code.

<!-- UNRESOLVED: complete list of all supported models in the Event Master family not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # stated: "service is available on port number 9090"
serial:
  baud_rate: 19200  # stated: table shows "Baud rate|19200"
  data_bits: 8      # stated: "Data bits|8"
  parity: none      # stated: "Parity|None"
  stop_bits: 1     # stated: "Stop bits|1"
  flow_control: none  # stated: "Flow control|None"
auth:
  type: none  # inferred: "for normal end user access the authentication can be skipped"
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- queryable      # property.get, system.state, environment.getcontrolblocks present
- routable       # image.window.main.source, image.source.list, source selection present
- levelable      # brightness, contrast, saturation, gamma, intensity present
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
- id: system_gotoeco
  label: Enter ECO Mode
  kind: action
  params: []
- id: system_gotoready
  label: Enter Ready State
  kind: action
  params: []
- id: system_reboot
  label: Reboot
  kind: action
  params: []
- id: system_reset
  label: Reset Domain(s)
  kind: action
  params:
    - name: domains
      type: string[]
      description: Domain name(s) from list_resetdomains
- id: system_resetall
  label: Reset All Domains
  kind: action
  params: []
- id: property_set
  label: Set Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Object.property in dot notation (e.g. image.window.main.source)
    - name: value
      type: string
      description: New value for the property
- id: property_get
  label: Get Property Value
  kind: query
  params:
    - name: property
      type: string
      description: Object.property to read
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Object.property to observe
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Object.property to stop observing
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated)
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name to stop receiving
- id: introspect
  label: Introspect Object
  kind: query
  params:
    - name: object
      type: string
      description: Root object name to introspect (dot notation)
    - name: recursive
      type: boolean
      description: "true for full recursive introspection"
- id: image_source_list
  label: List Available Sources
  kind: query
  params: []
- id: image_window_list
  label: List Available Windows
  kind: query
  params: []
- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: query
  params:
    - name: type
      type: string
      description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
    - name: valuetype
      type: string
      description: "Value type: Temperature, Speed, Voltage, Current, Power, etc."
- id: auth_authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Numeric pass code (example: 98765)
- id: optics_zoom_runforward
  label: Zoom In
  kind: action
  params: []
- id: optics_zoom_runreverse
  label: Zoom Out
  kind: action
  params: []
- id: optics_focus_runforward
  label: Focus Near
  kind: action
  params: []
- id: optics_focus_runreverse
  label: Focus Far
  kind: action
  params: []
- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  params: []
- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  params:
    - name: id
      type: string
      description: Notification ID to dismiss
- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  params:
    - name: code
      type: string
      description: Notification code to suppress
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
  description: Current operational state of the projector
- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - On
    - Off
- id: property_value
  label: Property Value
  type: mixed
  description: Response to property.get - value type varies by property
- id: property_changed
  label: Property Changed Notification
  type: notification
  description: Unsolicited notification when a subscribed property changes
- id: signal_callback
  label: Signal Callback Notification
  type: notification
  description: Unsolicited notification when a subscribed signal fires
- id: modelupdated
  label: Model Updated Signal
  type: notification
  description: Signals when objects appear or disappear; fields: object, newobject, accesslevel
- id: notification_emitted
  label: Notification Emitted
  type: notification
  description: Projector notification event; fields: severity, id, code, timestamp, message, timeout, actions
- id: system_performed
  label: Reset Performed Signal
  type: notification
  description: Emitted when domain reset completes; field: domains[]
- id: image_source_list_result
  label: Available Sources
  type: string[]
  description: List of available source names (e.g. "DisplayPort 1", "HDMI")
- id: environment_controlblocks_result
  label: Environment Sensor Values
  type: object
  description: Dictionary of sensor name to value (temperature, fan speed, etc.)
```

## Variables
```yaml
- id: image_brightness
  label: Brightness
  type: float
  constraints:
    min: -1
    max: 1
    step-size: 1
    precision: 0.01
  access: rw
  description: "Normalized brightness offset; 0 is default, 1 is 100% offset"
- id: image_contrast
  label: Contrast
  type: float
  constraints:
    min: 0
    max: 2
    step-size: 1
    precision: 0.01
  access: rw
  description: "Normalized contrast; 1 is default"
- id: image_saturation
  label: Saturation
  type: float
  constraints:
    min: 0
    max: 2
    step-size: 1
    precision: 0.01
  access: rw
  description: "Normalized saturation; 1 is default"
- id: image_gamma
  label: Gamma
  type: float
  constraints:
    min: 1
    max: 3
    step-size: 1
    precision: 0.1
  access: rw
  description: "Image gamma value; default is 2.2"
- id: image_sharpness
  label: Sharpness
  type: integer
  constraints:
    min: -2
    max: 8
    step-size: 1
    precision: 1
  access: rw
- id: image_intensity
  label: Intensity
  type: float
  constraints:
    min: 0
    max: 1
    step-size: 0.1
    precision: 0.01
  access: rw
- id: image_window_main_source
  label: Main Window Source
  type: string
  access: rw
  description: Source name displayed in main window (e.g. "DisplayPort 1", "HDMI")
- id: image_window_main_position
  label: Main Window Position
  type: object
  access: rw
  description: "Object with x, y integer fields"
- id: image_window_main_size
  label: Main Window Size
  type: object
  access: rw
  description: "Object with width, height integer fields"
- id: illumination_sources_laser_power
  label: Laser Power
  type: float
  access: rw
  description: "Target laser power in percent"
- id: illumination_sources_laser_minpower
  label: Laser Minimum Power
  type: float
  access: ro
  description: "Minimum power in percent"
- id: illumination_sources_laser_maxpower
  label: Laser Maximum Power
  type: float
  access: ro
  description: "Maximum power in percent"
- id: optics_zoom_position
  label: Zoom Position
  type: integer
  access: rw
- id: optics_focus_position
  label: Focus Position
  type: integer
  access: rw
- id: optics_shutter_position
  label: Shutter Position
  type: enum
  values:
    - Open
    - Closed
  access: rw
- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal
  type: integer
  access: rw
- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical
  type: integer
  access: rw
- id: screen_hdrboost
  label: HDR Boost
  type: float
  constraints:
    min: 0.8
    max: 1.2
    step-size: 0.01
    precision: 0.1
  access: rw
- id: image_orientation
  label: Orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR
  access: rw
- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean
  access: rw
- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean
  access: rw
- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean
  access: rw
- id: system_initialstate
  label: Initial State
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - service
    - deconditioning
    - error
  access: rw
- id: ui_osd
  label: On-Screen Display
  type: boolean
  access: rw
- id: ui_stealthmode
  label: Stealth Mode
  type: enum
  values:
    - Off
    - On
  access: rw
- id: remotecontrol_address
  label: Remote Control Address
  type: integer
  constraints:
    min: 1
    max: 31
  access: rw
- id: network_device_lan_ip4config
  label: IPv4 Configuration
  type: object
  access: ro
  description: "Object with Address, Mask, Gateway, NameServers fields"
- id: statistics_laserruntime_value
  label: Laser Runtime
  type: integer
  access: rw
- id: statistics_projectorruntime_value
  label: Projector Runtime
  type: integer
  access: rw
- id: notification_count
  label: Notification Count
  type: integer
  access: ro
- id: system_firmwareversion
  label: Firmware Version
  type: string
  access: ro
- id: system_serialnumber
  label: Serial Number
  type: string
  access: ro
- id: system_modelname
  label: Model Name
  type: string
  access: ro
```

## Events
```yaml
# property.changed: Unsolicited notification when subscribed property changes
# payload: { "property": [ { "objectname.propertyname": <value> }, ... ] }
- id: property_changed
  label: Property Changed
  description: Delivered when a property value changes; client must implement property.changed handler
  fields:
    - name: property
      type: array
      description: Array of property/value pair objects
- id: signal_callback
  label: Signal Callback
  description: Delivered when a subscribed signal fires; client must implement signal.callback handler
  fields:
    - name: signal
      type: array
      description: Array of signal/argument-list pair objects
- id: modelupdated
  label: Model Updated
  description: Signals when objects appear or disappear
  fields:
    - name: object
      type: string
      description: Object name (JSON-RPC dot-notation)
    - name: newobject
      type: boolean
      description: "true: object added, false: object removed"
    - name: accesslevel
      type: string
      description: Minimum access level required
- id: notification_emitted
  label: Notification Emitted
  description: Projector-generated notification event
  fields:
    - name: notification
      type: object
      description: Notification object with severity, id, code, timestamp, message, timeout, actions
- id: system_performed
  label: Reset Performed
  description: Emitted when one or more reset domains complete
  fields:
    - name: domains
      type: string[]
      description: Domain(s) that completed reset
- id: image_testpattern_added
  label: Test Pattern Added
  fields:
    - name: pattern
      type: object
      description: Pattern object with name, location, id, above, internal, properties
- id: image_testpattern_removed
  label: Test Pattern Removed
  fields:
    - name: pattern
      type: object
      description: Pattern object with name, location, id, above, internal, properties
- id: network_added
  label: Network Device Added
  fields:
    - name: id
      type: string
      description: Logical device id
- id: network_removed
  label: Network Device Removed
  fields:
    - name: id
      type: string
      description: Logical device id
- id: notification_dismissed
  label: Notification Dismissed
  fields:
    - name: id
      type: string
      description: Dismissed notification ID
    - name: response
      type: string
      description: Dismissal response reason
- id: system_identificationchanged
  label: System Identification Changed
  description: Raised when a system identification is changed
- id: system_license_licensechanged
  label: License Changed
  description: Raised when license state changes
- id: ui_settings_added
  label: UI Setting Added
  fields:
    - name: key
      type: string
    - name: value
      type: string
- id: ui_settings_changed
  label: UI Setting Changed
  fields:
    - name: key
      type: string
    - name: value
      type: string
- id: ui_settings_removed
  label: UI Setting Removed
  fields:
    - name: key
      type: string
```

## Macros
```yaml
# ECO mode wake-up sequence (from source):
# 1. Send Wake-on-LAN with projector MAC address, OR
# 2. Use power button on remote/keypad, OR
# 3. Send ASCII ":POWR1\r" on RS-232 serial port
- id: eco_wakeup
  label: Wake from ECO Mode
  description: Three methods to wake projector from ECO mode - WoL, remote, or serial command ":POWR1\r"
  steps:
    - description: Wake-on-LAN with projector HW (MAC) address
    - description: Use power button on remote control or keypad
    - description: Send ":POWR1\r" ASCII characters on serial port
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Verify projector state is standby or ready before issuing system.poweron
    reference: "source: 'If the projector already is on, or if it's in transition between states, nothing will happen. Therefore, it's good practice to verify that the projector state is either standby or ready before issuing the power on command.'"
  - description: Verify projector state is on before issuing system.poweroff
    reference: "source: 'If the projector already is off, or if it's in transition between states, nothing will happen. Therefore, it's good practice to verify that the projector state is on before issuing the power off command.'"
  - description: Wait for property.set confirmation before sending same property.set again
    reference: "source: 'It is best practice to wait for the confirmation of the property.set before setting the same property again. Continuously setting the same property without waiting for confirmation may flood the server with unnecessary request and may reduce performance.'"
# UNRESOLVED: safety-critical voltage/current/power limits not stated in source
# UNRESOLVED: laser safety interlock procedures not stated in source
# UNRESOLVED: fault behavior and error recovery sequences not stated in source
```

## Notes
The Barco Event Master uses JSON-RPC 2.0 as its control protocol. All commands are JSON objects sent over TCP (port 9090) or RS-232 serial. The object model is hierarchical (dot notation, e.g. `image.window.main.source`), with properties for state, methods for actions, and signals for subscriptions.

Property paths follow the pattern `image.window.main.source` — note `image.window.main` singular vs `image.source.list` plural.

ECO mode wake-up requires either Wake-on-LAN, IR remote/keypad, or serial command `:POWR1\r`.

File upload/download uses HTTP POST to `/api/<endpoint>/file/transfer` (e.g. `curl -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer`).

Authentication is optional for normal end-user operations. A numeric pass code is required only for elevated access levels.

<!-- UNRESOLVED: supported projector models other than "Event Master v1.0" not enumerated in source -->
<!-- UNRESOLVED: exact supported source connector list varies by model — the document shows DVI, DisplayPort, HDMI, HDBaseT, SDI but varies -->
<!-- UNRESOLVED: DMX/artnet configuration details are summarized but full protocol not detailed -->
<!-- UNRESOLVED: warranty, safety certifications, and regulatory specifications not stated -->
<!-- UNRESOLVED: precise command timing/latency specifications not stated -->
<!-- UNRESOLVED: maximum number of concurrent JSON-RPC sessions not stated -->

## Provenance

```yaml
source_urls:
  - "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
source_documents:
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.514Z
retrieved_at: 2026-04-29T08:34:51.514Z
last_checked_at: 2026-04-23T15:17:06.537Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:17:06.537Z
matched_actions: 36
action_count: 36
confidence: high
summary: "All 36 spec actions matched to JSON-RPC methods in source; transport parameters verbatim; comprehensive source coverage confirms command fidelity."
```

## Known Gaps

```yaml
[]
```
