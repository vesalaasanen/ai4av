---
spec_id: admin/barco-g62-wx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco G62 Wx Series Control Spec"
manufacturer: Barco
model_family: "Barco G62 Wx Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco G62 Wx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:37:19.283Z
generated_at: 2026-05-14T21:37:19.283Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - system.standby.enable
  - system.eco.enable
verification:
  verdict: verified
  checked_at: 2026-05-14T21:37:19.283Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions matched literal method names and properties in source; transport parameters verified exact; spec covers documented Pulse API comprehensively."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco G62 Wx Series Control Spec

## Summary
Barco G62 Wx Series Pulse projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Supports power management, source selection, image adjustment (brightness, contrast, gamma, saturation, sharpness), illumination control, warp/blend/black level file management, optics (shutter, zoom, focus, lens shift), DMX, and environment monitoring. Authentication is optional and uses a numeric passcode to elevate access level.

<!-- UNRESOLVED: specific G62 model variants not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: HTTP file transfer endpoints have no auth requirement documented -->

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
  type: optional  # source: "Authentication is only necessary when a higher level than normal end user is required"
  method: jsonrpc_authenticate
  description: >
    Authenticate via JSON-RPC method "authenticate" with params {"code": <passcode>}.
    Normal end-user access does not require authentication.
```

## Traits
```yaml
- powerable    # system.poweron / system.poweroff methods
- queryable    # property.get method for all readable properties
- levelable    # image.brightness, image.contrast, image.gamma, image.saturation, image.sharpness, illumination power
- routable     # image.window.main.source selection from image.source.list
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  jsonrpc_method: system.poweron
  params: []
  note: Verify projector state is standby or ready before issuing.

- id: power_off
  label: Power Off
  kind: action
  jsonrpc_method: system.poweroff
  params: []
  note: Verify projector state is on before issuing.

- id: eco_wake_serial
  label: ECO Wake via Serial
  kind: action
  command: ":POWR1\\r"
  transport: serial
  params: []
  note: ASCII command sent over RS-232 to wake projector from ECO mode.

- id: authenticate
  label: Authenticate
  kind: action
  jsonrpc_method: authenticate
  params:
    - name: code
      type: integer
      description: Secret passcode for elevated access level

- id: set_property
  label: Set Property
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. "image.brightness")
    - name: value
      type: any
      description: Value to set (type depends on property)

- id: get_property
  label: Get Property
  kind: action
  jsonrpc_method: property.get
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: get_properties
  label: Get Multiple Properties
  kind: action
  jsonrpc_method: property.get
  params:
    - name: property
      type: array
      description: Array of dot-notation property names

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  jsonrpc_method: property.subscribe
  params:
    - name: property
      type: string_or_array
      description: Single property name or array of property names

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: action
  jsonrpc_method: property.unsubscribe
  params:
    - name: property
      type: string_or_array
      description: Single property name or array of property names

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  jsonrpc_method: signal.subscribe
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  jsonrpc_method: signal.unsubscribe
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names

- id: introspect
  label: Introspect Object Metadata
  kind: action
  jsonrpc_method: introspect
  params:
    - name: object
      type: string
      description: "Object name in dot notation (empty for all). Default: empty."
    - name: recursive
      type: boolean
      description: "If false, only list object names (one level). Default: true."

- id: select_source
  label: Select Input Source
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.source"
      description: Fixed property name
    - name: value
      type: string
      description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI, DVI 1)"

- id: list_sources
  label: List Available Sources
  kind: action
  jsonrpc_method: image.source.list
  params: []
  response_type: array
  response_description: Array of source name strings

- id: list_connectors
  label: List Available Connectors
  kind: action
  jsonrpc_method: image.connector.list
  params: []
  response_type: array
  response_description: Array of connector name strings

- id: list_source_connectors
  label: List Connectors for Source
  kind: action
  jsonrpc_method: "image.source.<sourcename>.listconnectors"
  params: []
  note: "Source object name derived from source name by removing non-word chars and lowercasing (e.g. DisplayPort 1 → displayport1)"
  response_type: array
  response_description: Array of connector info objects with name and gridposition

- id: set_brightness
  label: Set Brightness
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.brightness"
    - name: value
      type: float
      description: "Normalized brightness offset. -1 to 1. Default 0."

- id: set_contrast
  label: Set Contrast
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.contrast"
    - name: value
      type: float
      description: "Normalized contrast/gain. 0 to 2. Default 1."

- id: set_gamma
  label: Set Gamma
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.gamma"
    - name: value
      type: float
      description: "Gamma value. 1 to 3. Default 2.2."

- id: set_saturation
  label: Set Saturation
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.saturation"
    - name: value
      type: float
      description: "Normalized saturation. 0 to 2. Default 1."

- id: set_sharpness
  label: Set Sharpness
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.sharpness"
    - name: value
      type: integer
      description: "-2 to 8."

- id: set_orientation
  label: Set Image Orientation
  kind: action
  jsonrpc_method: property.set
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
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.scalingmode"
    - name: value
      type: enum
      values: [Fill, OneToOne, FillScreen, Stretch]

- id: set_laser_power
  label: Set Laser Power
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.power"
    - name: value
      type: float
      description: "Target power in percent. Check minpower/maxpower for valid range."

- id: set_shutter
  label: Set Shutter Position
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "optics.shutter.target"
    - name: value
      type: enum
      values: [Open, Closed]

- id: set_zoom
  label: Set Zoom Position
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "optics.zoom.position"
    - name: value
      type: integer

- id: set_focus
  label: Set Focus Position
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "optics.focus.position"
    - name: value
      type: integer

- id: set_lens_shift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "optics.lensshift.horizontal.position"
    - name: value
      type: integer

- id: set_lens_shift_vertical
  label: Set Vertical Lens Shift
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "optics.lensshift.vertical.position"
    - name: value
      type: integer

- id: set_warp_enable
  label: Enable/Disable Warp
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.warp.enable"
    - name: value
      type: boolean

- id: set_warp_file
  label: Select Warp File
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.warp.file.selected"
    - name: value
      type: string
      description: Warp grid filename (e.g. warp.xml)

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.warp.file.enable"
    - name: value
      type: boolean

- id: set_blend_file
  label: Select Blend Mask File
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.selected"
    - name: value
      type: string
      description: Blend mask filename (e.g. mask.png)

- id: enable_blend_file
  label: Enable Blend Mask
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.enable"
    - name: value
      type: boolean

- id: set_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.selected"
    - name: value
      type: string
      description: Black level mask filename (e.g. blacklevel.png)

- id: enable_blacklevel_file
  label: Enable Black Level Mask
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.enable"
    - name: value
      type: boolean

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "dmx.mode"
    - name: value
      type: string

- id: set_dmx_start_channel
  label: Set DMX Start Channel
  kind: action
  jsonrpc_method: property.set
  params:
    - name: property
      type: string
      value: "dmx.startchannel"
    - name: value
      type: integer
      description: "DMX start channel, 1 to 512."

- id: list_dmx_channels
  label: List DMX Channels
  kind: action
  jsonrpc_method: dmx.listchannels
  params: []
  response_type: array

- id: list_dmx_modes
  label: List DMX Modes
  kind: action
  jsonrpc_method: dmx.listmodes
  params: []
  response_type: array

- id: get_environment_sensors
  label: Get Environment Sensor Data
  kind: action
  jsonrpc_method: environment.getcontrolblocks
  params:
    - name: type
      type: enum
      values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: enum
      values: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]
  response_type: object
  response_description: Dictionary of sensor name to float value

- id: get_alarm_info
  label: Get Alarm Info
  kind: action
  jsonrpc_method: environment.getalarminfo
  params: []
  response_type: array
  response_description: Array of alarm objects with severity, timestamp, source, description, custommessage

- id: engage_clo
  label: Engage Constant Light Output
  kind: action
  jsonrpc_method: illumination.clo.engage
  params: []
  note: Engages CLO at current light level.

- id: list_firmware_components
  label: List Firmware Components
  kind: action
  jsonrpc_method: firmware.listcomponents
  params: []
  response_type: array

- id: list_firmware_version_status
  label: List Firmware Version Status
  kind: action
  jsonrpc_method: firmware.listcomponentversionstatus
  params: []
  response_type: array

- id: schedule_firmware_upgrade
  label: Schedule Firmware Upgrade
  kind: action
  jsonrpc_method: firmware.schedulecomponentupgrade
  params: []
  note: Forces component upgrade at next reboot.

- id: copy_color_preset
  label: Copy Color Preset to Custom
  kind: action
  jsonrpc_method: image.color.p7.custom.copypresettocustom
  params:
    - name: presetname
      type: string

- id: reset_color_preset
  label: Reset Color Preset
  kind: action
  jsonrpc_method: image.color.p7.custom.resetpreset
  params:
    - name: presetname
      type: string

- id: reset_color_to_native
  label: Reset Color to Native
  kind: action
  jsonrpc_method: image.color.p7.custom.resettonative
  params: []

- id: next_rgb_mode
  label: Next RGB Mode
  kind: action
  jsonrpc_method: image.color.rgbmode.nextrgbmode
  params: []
  note: Cycles through all possible RGB modes.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  property: system.state
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  property: illumination.state
  values: ["On", "Off"]

- id: active_source
  type: string
  property: image.window.main.source

- id: detected_signal
  type: object
  property: "image.connector.<name>.detectedsignal"
  note: Object with active, name, resolution, frequency, scan, color_space, etc.

- id: laser_power
  type: float
  property: illumination.sources.laser.power

- id: laser_min_power
  type: float
  property: illumination.sources.laser.minpower

- id: laser_max_power
  type: float
  property: illumination.sources.laser.maxpower

- id: brightness
  type: float
  property: image.brightness
  range: [-1, 1]

- id: contrast
  type: float
  property: image.contrast
  range: [0, 2]

- id: gamma
  type: float
  property: image.gamma
  range: [1, 3]

- id: saturation
  type: float
  property: image.saturation
  range: [0, 2]

- id: sharpness
  type: integer
  property: image.sharpness
  range: [-2, 8]

- id: alarm_state
  type: enum
  property: environment.alarmstate
  values: [Fatal, Error, Alert, Warning, Ok]

- id: shutter_position
  type: enum
  property: optics.shutter.position
  values: [Open, Closed]

- id: network_state
  type: enum
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: temperatures
  type: object
  method: environment.getcontrolblocks
  params: { type: Sensor, valuetype: Temperature }

- id: fan_speeds
  type: object
  method: environment.getcontrolblocks
  params: { type: Sensor, valuetype: Speed }
```

## Variables
```yaml
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  default: 0

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  default: 1

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  default: 1

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  unit: percent

- id: dmx_start_channel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512

- id: window_position_x
  property: image.window.main.position.x
  type: integer

- id: window_position_y
  property: image.window.main.position.y
  type: integer

- id: window_size_width
  property: image.window.main.size.width
  type: integer

- id: window_size_height
  property: image.window.main.size.height
  type: integer
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: >
    Unsolicited notification sent when a subscribed property value changes.
    Params contain an array of property/value pairs.
  payload:
    property:
      type: array
      description: "Array of {\"objectname.propertyname\": value} objects"

- id: signal_callback
  method: signal.callback
  description: >
    Unsolicited notification sent when a subscribed signal is emitted.
    Params contain an array of signal/argument-list pairs.
  payload:
    signal:
      type: array
      description: "Array of {\"objectname.signalname\": {arg1: val, ...}} objects"

- id: model_updated
  method: signal.callback (signal: introspect.objectchanged)
  description: Triggered when the object structure changes (objects added or removed).
  payload:
    object:
      type: string
      description: Name of changed object
    isnew:
      type: boolean
      description: "true: object added, false: object removed"
```

## Macros
```yaml
- id: upload_and_activate_warp
  label: Upload and Activate Warp Grid
  steps:
    - description: Upload warp grid file via HTTP POST
      http: "POST /api/image/processing/warp/file/transfer (multipart file upload)"
    - description: Select the uploaded warp file
      jsonrpc_method: property.set
      params: { property: "image.processing.warp.file.selected", value: "<filename>" }
    - description: Enable file-based warp
      jsonrpc_method: property.set
      params: { property: "image.processing.warp.file.enable", value: true }
    - description: Enable global warp
      jsonrpc_method: property.set
      params: { property: "image.processing.warp.enable", value: true }

- id: upload_and_activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - description: Upload blend mask via HTTP POST
      http: "POST /api/image/processing/blend/file/transfer (multipart file upload)"
    - description: Select the uploaded blend file
      jsonrpc_method: property.set
      params: { property: "image.processing.blend.file.selected", value: "<filename>" }
    - description: Enable blend mask
      jsonrpc_method: property.set
      params: { property: "image.processing.blend.file.enable", value: true }
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks or power-on sequencing beyond
# recommending state verification before power commands
```

## Notes
- All commands use JSON-RPC 2.0 format over both TCP and serial connections.
- Source object names derived from display names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- Best practice: wait for `property.set` confirmation before setting the same property again to avoid flooding.
- Property subscriptions only deliver change notifications; use `property.get` for current value.
- Source selection generates two notifications (deselection of old source, selection of new source).
- API is dynamic — available methods/properties depend on projector configuration, peripherals, and connected hardware. Use introspection for the exact API surface.
- Warp grid file format is the same as Barco MCM500/400.
- Blend and black level masks must be grayscale (8 or 16-bit), matching the projector's blend layer resolution. PNG/JPEG/TIFF accepted; color images use only the blue channel.
- ECO wake via serial uses raw ASCII `:POWR1\r` outside JSON-RPC.
- HTTP file endpoints: `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`.
<!-- UNRESOLVED: zoom/focus/lens shift position value ranges not specified -->
<!-- UNRESOLVED: DMX extended mode channel details not specified -->
<!-- UNRESOLVED: CLO behavior details not specified beyond engage method -->
<!-- UNRESOLVED: color preset names and P7 color mode details not fully documented -->
<!-- UNRESOLVED: HTTP file transfer authentication requirements not stated -->
<!-- UNRESOLVED: laser serial number method (illumination.laser.getserialnumber) response format partially documented -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:37:19.283Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:37:19.283Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions matched literal method names and properties in source; transport parameters verified exact; spec covers documented Pulse API comprehensively."
```

## Known Gaps

```yaml
- system.standby.enable
- system.eco.enable
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
