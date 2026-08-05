---
spec_id: admin/barco-bifrost-tp15-e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Bifrost Tp15 E Control Spec"
manufacturer: Barco
model_family: "Barco Bifrost Tp15 E"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Bifrost Tp15 E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:38:36.552Z
last_checked_at: 2026-07-21T21:18:13.684Z
generated_at: 2026-07-21T21:18:13.684Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. The API is described as dynamic and may vary by projector configuration (e.g. motorized zoom lens, DMX extended mode)."
  - "detected-signal telemetry (image.connector.[name].detectedsignal) is"
  - "minpower is dynamic, read at runtime via illumination.sources.laser.minpower"
  - "maxpower is dynamic, read at runtime via illumination.sources.laser.maxpower"
  - "optics zoom/focus/lensshift position properties are documented as"
  - "source does not describe explicit interlock sequences, lamp/laser"
  - "firmware version compatibility not stated in source."
  - "authentication credential format/length for the authenticate code not fully specified (example shows integer 98765)."
  - "parameter signatures for firmware.schedulecomponentupgrade not documented."
  - "set targets for optics zoom/focus/lensshift not documented as writable in this source."
  - "HTTP file endpoints beyond warp/blend/blacklevel (if any) not enumerated."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:18:13.684Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literally; transport verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Bifrost Tp15 E Control Spec

## Summary
The Barco Bifrost Tp15 E is a Pulse-series projector with a laser illumination source. It exposes a JSON-RPC 2.0 "Pulse API" over both TCP/IP (port 9090) and an RS-232 serial port, supporting power control, source selection, illumination power, image/picture settings, warp/blend/black-level file management, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The API is described as dynamic and may vary by projector configuration (e.g. motorized zoom lens, DMX extended mode). -->

## Transport
```yaml
# Source documents both TCP/IP (port 9090) and RS-232 serial (19200 8N1).
# Both transports carry the same JSON-RPC 2.0 Pulse API. The ECO wake-up
# sequence additionally accepts a raw ASCII command on the serial port.
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
  # Source: "Authentication is only necessary when a higher level than normal
  # end user is required. For normal end user access the authentication can
  # be skipped." The optional authenticate method takes a numeric code.
  type: none  # inferred: no auth procedure required for normal end-user access
```

## Traits
```yaml
# Inferred from documented command examples.
- powerable    # inferred: system.poweron / system.poweroff methods present
- queryable    # inferred: property.get and list methods present
- levelable    # inferred: brightness/contrast/gamma/laser-power set commands present
```

## Actions
```yaml
# Each named JSON-RPC method or distinct documented operation is one action.
# Generic property/signal/introspect methods are parameterized by the property
# or signal name; concrete dedicated methods are listed individually.

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII wake-up command sent over the RS-232 serial port to wake a projector in ECO mode. Alternatives: wake-on-LAN (MAC address), IR remote power button, or keypad power button.

- id: authenticate
  label: Authenticate (Optional Higher Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code setting the user access level.
  notes: Optional. Only required for access levels above normal end user.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness, image.window.main.source).
    - name: value
      type: any
      description: Value to set; type depends on the target property.
  notes: Best practice to wait for confirmation before setting the same property again.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name to read. May be a single name or an array of names.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names to observe.
  notes: Generates property.changed notifications. Subscribing does not return the current value.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names to stop observing.

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Single signal name or array of signal names (e.g. modelupdated).

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Single signal name or array of signal names.

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/absent introspects everything.
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level). Defaults to true.
  notes: Returns metadata of available objects (methods, properties, signals) restricted by the client's authenticated access level.

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: Returns array of source names (e.g. DVI 1, DisplayPort 1, HDMI, SDI...); contents vary by projector model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: Returns array of physical input connector names; varies by projector model.

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: Source object name derived by stripping non-word characters and lowercasing the source name (e.g. 'DisplayPort 1' -> 'displayport1').
  notes: Returns array of connector info including name and grid position.

- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor block type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.
  notes: Returns dictionary of sensor name -> reading (e.g. fan tacho speeds, laser/heatsink temperatures).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm records {severity, timestamp, source, description, custommessage}.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns array of managed firmware component names.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns array of {name, versions{available, running}, status} where status is one of Unknown, OK, Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot. Parameters not detailed in source.

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: Returns string value.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7 Custom)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to defaults.

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native (P7 Custom)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode.

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns array of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns array of mode names.

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML file to upload.
    - name: projector_ip
      type: string
      description: Projector IP address.
  notes: HTTP POST upload. Warp file format matches MCM500/400.

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Grayscale PNG/JPEG/TIFF blend mask (8 or 16 bit). Size must match blend layer resolution.
    - name: projector_ip
      type: string
      description: Projector IP address.

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Grayscale PNG/JPEG/TIFF black level mask (8 or 16 bit). Size must match black level layer resolution.
    - name: projector_ip
      type: string
      description: Projector IP address.
```

## Feedbacks
```yaml
# Observable state surfaced via property.get / property.changed notifications.

- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: laser_power
  type: number
  property: illumination.sources.laser.power

- id: active_source
  type: string
  property: image.window.main.source

- id: image_brightness
  type: number
  property: image.brightness

- id: image_contrast
  type: number
  property: image.contrast

- id: image_gamma
  type: number
  property: image.gamma

- id: image_saturation
  type: number
  property: image.saturation

- id: image_sharpness
  type: integer
  property: image.sharpness

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  property: image.orientation

- id: network_device_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

# UNRESOLVED: detected-signal telemetry (image.connector.[name].detectedsignal) is
# documented as a rich structured object (resolution, timings, color space, etc.)
# but per-connector object names are dynamic; left as introspection-driven.
```

## Variables
```yaml
# Settable parameters exposed via property.set.

- id: laser_power_set
  property: illumination.sources.laser.power
  type: number
  min: null  # UNRESOLVED: minpower is dynamic, read at runtime via illumination.sources.laser.minpower
  max: null  # UNRESOLVED: maxpower is dynamic, read at runtime via illumination.sources.laser.maxpower
  unit: percent

- id: image_brightness_set
  property: image.brightness
  type: number
  min: -1
  max: 1
  precision: 0.01

- id: image_contrast_set
  property: image.contrast
  type: number
  min: 0
  max: 2
  precision: 0.01

- id: image_gamma_set
  property: image.gamma
  type: number
  min: 1
  max: 3
  precision: 0.1
  default: 2.2

- id: image_saturation_set
  property: image.saturation
  type: number
  min: 0
  max: 2
  precision: 0.01

- id: image_sharpness_set
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: image_orientation_set
  property: image.orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: active_source_set
  property: image.window.main.source
  type: string
  notes: Value must be one of the names returned by image.source.list.

- id: image_window_scalingmode_set
  property: image.window.main.scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: optics_shutter_target_set
  property: optics.shutter.target
  type: enum
  values: ["Open", "Closed"]

- id: warp_enable_set
  property: image.processing.warp.enable
  type: boolean

- id: warp_file_enable_set
  property: image.processing.warp.file.enable
  type: boolean

- id: warp_file_selected_set
  property: image.processing.warp.file.selected
  type: string

- id: blend_file_enable_set
  property: image.processing.blend.file.enable
  type: boolean

- id: blend_file_selected_set
  property: image.processing.blend.file.selected
  type: array
  items: string

- id: blacklevel_file_enable_set
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: blacklevel_file_selected_set
  property: image.processing.blacklevel.file.selected
  type: string

- id: dmx_mode_set
  property: dmx.mode
  type: string

- id: dmx_startchannel_set
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown_set
  property: dmx.shutdown
  type: boolean

- id: system_standby_enable_set
  property: system.standby.enable
  type: boolean

- id: system_eco_enable_set
  property: system.eco.enable
  type: boolean

# UNRESOLVED: optics zoom/focus/lensshift position properties are documented as
# read-only integer positions in this source; set methods (e.g. target values)
# are not shown and are expected to be discovered via introspection on devices
# fitted with motorized optics.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; no response to return).

- id: property_changed
  method: property.changed
  description: Server pushes an array of {property: value} pairs whenever an observed property changes. Client must implement this handler.

- id: signal_callback
  method: signal.callback
  description: Server pushes an array of {signal: {args}} pairs whenever a subscribed signal fires. Client must implement this handler.

- id: modelupdated_signal
  method: signal via signal.callback
  description: modelupdated signal triggers when the object structure changes (objects added or removed). Payload includes introspect.objectchanged with {object, isnew}.
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.

- id: apply_warp_file
  description: Upload then activate a warp grid file.
  steps:
    - upload_warp_file  # HTTP POST to /api/image/processing/warp/file/transfer
    - property_set  # image.processing.warp.file.selected = "<filename>"
    - property_set  # image.processing.warp.file.enable = true
    - property_set  # image.processing.warp.enable = true (global warp enable)

- id: apply_blend_mask
  description: Upload then activate a blend mask.
  steps:
    - upload_blend_mask  # HTTP POST to /api/image/processing/blend/file/transfer
    - property_set  # image.processing.blend.file.selected = "<filename>"
    - property_set  # image.processing.blend.file.enable = true

- id: apply_blacklevel_mask
  description: Upload then activate a black level mask.
  steps:
    - upload_blacklevel_mask  # HTTP POST to /api/image/processing/blacklevel/file/transfer
    - property_set  # image.processing.blacklevel.file.selected = "<filename>"
    - property_set  # image.processing.blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: if the projector already is on, or in transition between states, nothing happens. Good practice to verify system.state is standby or ready before issuing system.poweron."
  - description: "Power off: if the projector already is off, or in transition between states, nothing happens. Good practice to verify system.state is on before issuing system.poweroff."
  - description: "ECO wake-up requires special handling: wake-on-LAN (MAC), IR remote, keypad, or the serial ASCII command ':POWR1\\r'."
# UNRESOLVED: source does not describe explicit interlock sequences, lamp/laser
# cool-down lockouts beyond the deconditioning state name, or power-on sequencing
# timing values.
```

## Notes
- The Pulse API is JSON-RPC 2.0. The same command set is available over TCP/IP (port 9090) and RS-232 serial (19200 baud, 8N1, no flow control).
- Request parameters are passed by name; parameter order does not matter.
- Notifications (`property.changed`, `signal.callback`) have no `id` and must not be answered.
- Source selection produces two `property.changed` notifications when switching sources: first the old source is deselected (value `""`), then the new source is selected.
- The API is dynamic: portions depend on peripherals/configuration (e.g. motorized zoom lens, DMX extended mode). The canonical method/property list for a specific unit is obtained via `introspect`.
- DMX basic mode exposes 2 channels; extended mode exposes more.
- Source-signal telemetry (`image.connector.[name].detectedsignal`) returns a detailed timing/color object; connector object names are derived by lowercasing and stripping non-word characters (e.g. `DisplayPort 1` -> `displayport1`).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication credential format/length for the authenticate code not fully specified (example shows integer 98765). -->
<!-- UNRESOLVED: parameter signatures for firmware.schedulecomponentupgrade not documented. -->
<!-- UNRESOLVED: set targets for optics zoom/focus/lensshift not documented as writable in this source. -->
<!-- UNRESOLVED: HTTP file endpoints beyond warp/blend/blacklevel (if any) not enumerated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:38:36.552Z
last_checked_at: 2026-07-21T21:18:13.684Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:18:13.684Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literally; transport verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. The API is described as dynamic and may vary by projector configuration (e.g. motorized zoom lens, DMX extended mode)."
- "detected-signal telemetry (image.connector.[name].detectedsignal) is"
- "minpower is dynamic, read at runtime via illumination.sources.laser.minpower"
- "maxpower is dynamic, read at runtime via illumination.sources.laser.maxpower"
- "optics zoom/focus/lensshift position properties are documented as"
- "source does not describe explicit interlock sequences, lamp/laser"
- "firmware version compatibility not stated in source."
- "authentication credential format/length for the authenticate code not fully specified (example shows integer 98765)."
- "parameter signatures for firmware.schedulecomponentupgrade not documented."
- "set targets for optics zoom/focus/lensshift not documented as writable in this source."
- "HTTP file endpoints beyond warp/blend/blacklevel (if any) not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
