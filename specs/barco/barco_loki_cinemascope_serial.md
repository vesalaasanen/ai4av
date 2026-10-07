---
spec_id: admin/barco-loki-cinemascope
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Loki Cinemascope Control Spec"
manufacturer: Barco
model_family: "Loki Cinemascope"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Loki Cinemascope"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T04:26:24.054Z
last_checked_at: 2026-10-01T08:02:39.371Z
generated_at: 2026-10-01T08:02:39.371Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact Loki Cinemascope model variant confirmed only by blend/black-level mask resolution table entry \"4K Cinemascope: 1280 x 540\"; the full property list in source covers multiple Barco Pulse projectors (UDX series, etc.) and not all properties are confirmed present on the Loki Cinemascope specifically"
  - "lens motor control properties (zoom, focus, shift) referenced as conditional on lens type but property names not documented in source excerpt"
  - "DMX channel function values for channels 03-14 depend on DMX mode setting; full enumeration not stated"
  - "authentication passcode format and default values not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T08:02:39.371Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions map to JSON-RPC methods or the ECO ASCII command documented verbatim in the source; transport values (port 9090, 19200 8N1) appear verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Barco Loki Cinemascope Control Spec

## Summary

The Barco Loki Cinemascope is a laser projector controlled via the Barco Pulse API, which uses the JSON-RPC 2.0 protocol over either TCP/IP (port 9090) or RS-232 serial. This spec covers the full JSON-RPC command set including power control, source selection, image adjustments, illumination control, environment monitoring, and warp/blend file management. An ECO-mode wake-up command using a legacy ASCII serial string (`:POWR1\r`) is also documented.

<!-- UNRESOLVED: exact Loki Cinemascope model variant confirmed only by blend/black-level mask resolution table entry "4K Cinemascope: 1280 x 540"; the full property list in source covers multiple Barco Pulse projectors (UDX series, etc.) and not all properties are confirmed present on the Loki Cinemascope specifically -->

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
  type: optional  # source states authentication is only required for access levels above "normal end user"; normal end user access can skip authentication
```

## Traits

```yaml
- powerable       # inferred from power on/off command examples
- routable        # inferred from source selection commands (image.window.main.source)
- queryable       # inferred from property.get / property.subscribe query command examples
- levelable       # inferred from illumination power, brightness, contrast, saturation control
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  description: Power on the projector. No effect if already on or in state transition.
  params: []
  wire:
    jsonrpc: "2.0"
    method: system.poweron

- id: power_off
  label: Power Off
  kind: action
  description: Power off the projector. No effect if already off or in state transition.
  params: []
  wire:
    jsonrpc: "2.0"
    method: system.poweroff

- id: eco_wake_serial
  label: Wake from ECO Mode (Serial)
  kind: action
  description: >
    Wake a projector in ECO mode via RS-232. Send the ASCII string `:POWR1\r`
    on the serial port. Alternative wake methods include Wake-on-LAN, remote
    control power button, and keypad power button.
  params: []
  wire:
    raw_ascii: ":POWR1\r"

- id: set_source
  label: Select Input Source
  kind: action
  description: Set the active source for the main window.
  params:
    - name: source
      type: string
      description: >
        Source name string as returned by image.source.list. Examples:
        "DVI 1", "DVI 2", "DisplayPort 1", "DisplayPort 2", "Dual DVI",
        "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort",
        "HDBaseT", "HDMI", "SDI". Available sources vary by projector model.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.window.main.source
      value: "{source}"

- id: list_sources
  label: List Available Input Sources
  kind: action
  description: Returns an array of all available source name strings.
  params: []
  wire:
    jsonrpc: "2.0"
    method: image.source.list

- id: list_connectors
  label: List Physical Connectors
  kind: action
  description: Returns an array of all physical connector names.
  params: []
  wire:
    jsonrpc: "2.0"
    method: image.connector.list

- id: list_source_connectors
  label: List Connectors Used by a Source
  kind: action
  description: >
    Returns an array of connector information (name + grid position) for the
    connectors that make up a given source. The source object name is derived
    from the friendly source name by removing all non-word characters and
    lowercasing (e.g. "DisplayPort 1" -> "displayport1").
  params:
    - name: source_object
      type: string
      description: >
        Source object name in dot notation, e.g. "displayport1". The method
        name is constructed as image.source.{source_object}.listconnectors.
  wire:
    jsonrpc: "2.0"
    method: "image.source.{source_object}.listconnectors"

- id: blink_led
  label: Blink LED
  kind: action
  description: >
    Drive a status LED. Documented in the source as the canonical method
    invocation example for the Pulse API. Returns an integer status.
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color (e.g. "red").
    - name: period
      type: integer
      description: Blink period.
  wire:
    jsonrpc: "2.0"
    method: ledctrl.blink
    params:
      led: "{led}"
      color: "{color}"
      period: "{period}"

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  description: >
    Authenticate with a passcode to gain elevated access level. Not required
    for normal end-user control operations.
  params:
    - name: code
      type: integer
      description: Numeric passcode for elevated access level.
  wire:
    jsonrpc: "2.0"
    method: authenticate
    params:
      code: "{code}"

- id: set_property
  label: Set Property
  kind: action
  description: Generic property setter for any writable Pulse API property.
  params:
    - name: property
      type: string
      description: Full dot-notation property name (e.g. "image.brightness").
    - name: value
      type: any
      description: Value to set. Type depends on the property.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: "{property}"
      value: "{value}"

- id: get_property
  label: Get Property
  kind: action
  description: Generic property getter for any readable Pulse API property. Accepts a single property name or an array of property names.
  params:
    - name: property
      type: string or array of string
      description: Full dot-notation property name (e.g. "system.state"), or an array of names to read multiple values in one request.
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: "{property}"

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  description: Subscribe to change notifications for one or more properties.
  params:
    - name: property
      type: string or array of string
      description: Property name or array of property names.
  wire:
    jsonrpc: "2.0"
    method: property.subscribe
    params:
      property: "{property}"

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string or array of string
      description: Property name or array of property names.
  wire:
    jsonrpc: "2.0"
    method: property.unsubscribe
    params:
      property: "{property}"

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  description: Subscribe to one or more signals (e.g. "modelupdated").
  params:
    - name: signal
      type: string or array of string
      description: Signal name or array of signal names.
  wire:
    jsonrpc: "2.0"
    method: signal.subscribe
    params:
      signal: "{signal}"

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string or array of string
      description: Signal name or array of signal names.
  wire:
    jsonrpc: "2.0"
    method: signal.unsubscribe
    params:
      signal: "{signal}"

- id: introspect
  label: Introspect API Object
  kind: action
  description: Read metadata about available methods, properties, and signals.
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation). Empty string introspects everything.
    - name: recursive
      type: boolean
      description: If true, recursively introspect sub-objects. If false, list only immediate children.
  wire:
    jsonrpc: "2.0"
    method: introspect
    params:
      object: "{object}"
      recursive: "{recursive}"

- id: set_brightness
  label: Set Image Brightness
  kind: action
  params:
    - name: value
      type: float
      description: "Normalized brightness offset. Range: -1.0 to 1.0. 0 is default. Step 0.01."
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.brightness
      value: "{value}"

- id: set_laser_power
  label: Set Laser Power
  kind: action
  params:
    - name: value
      type: float
      description: >
        Target laser power level as a percentage. Minimum and maximum values
        are dynamic and depend on projector configuration and lens type.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: illumination.sources.laser.power
      value: "{value}"

- id: enable_warp
  label: Enable Warp Processing
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to enable warp, false to disable.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.warp.enable
      value: "{enable}"

- id: select_warp_file
  label: Select Warp Grid File
  kind: action
  params:
    - name: filename
      type: string
      description: Filename of the previously uploaded warp grid XML file (e.g. "warp.xml").
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.warp.file.selected
      value: "{filename}"

- id: enable_warp_file
  label: Enable Warp Grid File
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to activate the selected warp grid file.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.warp.file.enable
      value: "{enable}"

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: Filename of the previously uploaded blend mask image (e.g. "mask.png").
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.blend.file.selected
      value: "{filename}"

- id: enable_blend_file
  label: Enable Blend Mask File
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to activate the selected blend mask file.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.blend.file.enable
      value: "{enable}"

- id: select_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: Filename of the previously uploaded black level mask image.
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.blacklevel.file.selected
      value: "{filename}"

- id: enable_blacklevel_file
  label: Enable Black Level Mask File
  kind: action
  params:
    - name: enable
      type: boolean
  wire:
    jsonrpc: "2.0"
    method: property.set
    params:
      property: image.processing.blacklevel.file.enable
      value: "{enable}"

- id: get_environment_temperatures
  label: Get All Temperature Sensor Readings
  kind: action
  description: Returns a dictionary of all temperature sensor names and their current values in degrees Celsius.
  params: []
  wire:
    jsonrpc: "2.0"
    method: environment.getcontrolblocks
    params:
      type: Sensor
      valuetype: Temperature

- id: get_environment_fan_speeds
  label: Get All Fan Speed Readings
  kind: action
  description: Returns a dictionary of all fan sensor names and their current RPM values.
  params: []
  wire:
    jsonrpc: "2.0"
    method: environment.getcontrolblocks
    params:
      type: Sensor
      valuetype: Speed

- id: get_environment_data
  label: Get Environment Sensor Data
  kind: action
  description: >
    Generic environment sensor query. Sensor types: Sensor, Filter, Controller,
    Actuator, Alarm, GenericBlock. Value types: Temperature, Speed, PWM, Voltage,
    Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier,
    Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise,
    Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, Simulation,
    State, Pump, Resistance, Constant, Manual, Range, Any.
  params:
    - name: type
      type: string
      description: Sensor block type (see description).
    - name: valuetype
      type: string
      description: Value type to filter by (see description).
  wire:
    jsonrpc: "2.0"
    method: environment.getcontrolblocks
    params:
      type: "{type}"
      valuetype: "{valuetype}"
```

## Feedbacks

```yaml
- id: system_state
  label: Projector System State
  type: enum
  values:
    - boot          # projector is booting up
    - eco           # projector is in ECO/power save mode
    - standby       # projector is in standby mode
    - ready         # projector is in ready mode
    - conditioning  # projector is warming up
    - on            # projector is on
    - deconditioning  # projector is cooling down
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: system.state
  notification_method: property.changed
  notification_property: system.state

- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - "On"
    - "Off"
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.state
  notification_method: property.changed
  notification_property: illumination.state

- id: active_source
  label: Active Input Source
  type: string
  description: Name of the currently active source on the main window.
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: image.window.main.source
  notification_method: property.changed
  notification_property: image.window.main.source

- id: laser_power
  label: Laser Power Level
  type: float
  description: Current laser power target as a percentage.
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.sources.laser.power
  notification_method: property.changed
  notification_property: illumination.sources.laser.power

- id: laser_max_power
  label: Laser Maximum Power
  type: float
  description: Maximum allowed laser power as a percentage (dynamic, read-only).
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.sources.laser.maxpower

- id: laser_min_power
  label: Laser Minimum Power
  type: float
  description: Minimum allowed laser power as a percentage (dynamic, read-only).
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.sources.laser.minpower

- id: laser_is_power_limited
  label: Laser Power Limited
  type: boolean
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.sources.laser.ispowerlimited

- id: laser_power_limit_reason
  label: Laser Power Limit Reason
  type: string
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.sources.laser.powerlimitreason

- id: image_brightness
  label: Image Brightness
  type: float
  description: "Normalized brightness offset. Range: -1.0 to 1.0. 0 is default."
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: image.brightness
  notification_method: property.changed
  notification_property: image.brightness

- id: environment_alarm_state
  label: Environment Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: environment.alarmstate

- id: firmware_version
  label: Firmware Version
  type: string
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: firmware.firmwareversion

- id: clo_availability
  label: Constant Light Output Availability
  type: enum
  values:
    - Available
    - SensorUnavailable
    - PendingWarmup
    - Unavailable
    - Unknown
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.clo.availability

- id: clo_state
  label: Constant Light Output State
  type: enum
  values:
    - Ok
    - TooDim
    - TooBright
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: illumination.clo.state

- id: dmx_connection_active
  label: DMX/ArtNet Connection Active
  type: boolean
  description: True if a DMX or ArtNet packet was received in the last 10 seconds.
  wire:
    jsonrpc: "2.0"
    method: property.get
    params:
      property: dmx.monitor.connectionstate.active
```

## Variables

```yaml
- id: illumination_clo_enable
  label: Constant Light Output Enable
  type: boolean
  wire_property: illumination.clo.enable
  access: RW

- id: illumination_clo_setpoint
  label: Constant Light Output Setpoint
  type: float
  description: Target luminosity of the light source.
  wire_property: illumination.clo.setpoint
  access: RW

- id: illumination_clo_scale
  label: Constant Light Output Scale
  type: float
  description: Percentage to scale the CLO setpoint by.
  wire_property: illumination.clo.scale
  access: RW

- id: dmx_artnet_enable
  label: ArtNet Enable
  type: boolean
  wire_property: dmx.artnet
  access: RW

- id: dmx_mode
  label: DMX Mode
  type: string
  wire_property: dmx.mode
  access: RW

- id: dmx_start_channel
  label: DMX Start Channel
  type: integer
  description: "DMX start channel [1..512]."
  wire_property: dmx.startchannel
  access: RW

- id: dmx_shutdown_enable
  label: DMX Shutdown Enable
  type: boolean
  wire_property: dmx.shutdown
  access: RW

- id: dmx_shutdown_timeout
  label: DMX Shutdown Timeout (minutes)
  type: integer
  wire_property: dmx.shutdowntimeout
  access: RW

- id: image_color_p7_white_temperature
  label: White Point Temperature
  type: integer
  description: "Desired white point temperature in Kelvin. Range: 3200-13000, step 100."
  wire_property: image.color.p7.custom.whitetemperature
  access: RW

- id: image_color_p7_white_mode
  label: White Point Mode
  type: enum
  values:
    - Coordinates
    - Temperature
  wire_property: image.color.p7.custom.whitemode
  access: RW

- id: image_contrast
  label: Image Contrast
  type: float
  description: "Image contrast/gain. Normalized, 1 is default. Range: 0-2, step 0.01."
  wire_property: image.contrast
  access: RW

- id: image_saturation
  label: Image Saturation
  type: float
  description: "Image color saturation. Normalized, 1 is default. Range: 0-2, step 0.01."
  wire_property: image.saturation
  access: RW

- id: image_gamma
  label: Image Gamma
  type: float
  description: "Image gamma. Default is 2.2. Range: 1-3, step 0.1."
  wire_property: image.gamma
  access: RW

- id: image_intensity
  label: Image Intensity
  type: float
  description: "Image intensity. Range: 0-1, step 0.1, precision 0.01."
  wire_property: image.intensity
  access: RW

- id: image_sharpness
  label: Image Sharpness
  type: integer
  description: "Image sharpness. Normalized. Range: -2 to 8, step 1."
  wire_property: image.sharpness
  access: RW
```

## Events

```yaml
- id: property_changed
  label: Property Changed
  description: >
    Unsolicited notification sent by the server when a subscribed property changes
    value. The client must implement a property.changed handler to receive these.
  wire:
    jsonrpc: "2.0"
    method: property.changed
    params:
      property:
        - objectname.propertyname: <new_value>

- id: signal_callback
  label: Signal Callback
  description: >
    Unsolicited notification sent when a subscribed signal fires. The client must
    implement a signal.callback handler.
  wire:
    jsonrpc: "2.0"
    method: signal.callback
    params:
      signal:
        - objectname.signalname:
            arg1: <value>

- id: model_updated
  label: Model Updated (Object Added/Removed)
  description: >
    Signal fired when API objects are dynamically added or removed (e.g. when
    a lens with motorized zoom is mounted). Subscribe via signal.subscribe with
    signal name "modelupdated".
  wire:
    jsonrpc: "2.0"
    method: signal.callback
    params:
      signal:
        - introspect.objectchanged:
            object: <object_name>
            isnew: <bool>
```

## Macros

```yaml
- id: upload_and_activate_warp_grid
  label: Upload and Activate Warp Grid File
  description: >
    Three-step sequence to apply a warp grid file. The HTTP upload step
    requires direct HTTP access (not available via serial).
  steps:
    - step: 1
      label: Upload warp grid via HTTP POST
      notes: >
        curl -X POST -F file=@warp.xml http://<projector_ip>/api/image/processing/warp/file/transfer
        (HTTP file upload - not a JSON-RPC call)
    - step: 2
      label: Select the uploaded file
      action: select_warp_file
      params:
        filename: warp.xml
    - step: 3
      label: Enable warp grid file
      action: enable_warp_file
      params:
        enable: true

- id: upload_and_activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - step: 1
      label: Upload blend mask via HTTP POST
      notes: >
        curl -X POST -F file=@mask.png http://<projector_ip>/api/image/processing/blend/file/transfer
        Blend mask for 4K Cinemascope must be 1280 x 540 px grayscale (PNG/JPEG/TIFF, up to 16-bit).
    - step: 2
      label: Select the uploaded file
      action: select_blend_file
      params:
        filename: mask.png
    - step: 3
      label: Enable blend mask file
      action: enable_blend_file
      params:
        enable: true

- id: upload_and_activate_blacklevel_mask
  label: Upload and Activate Black Level Mask
  steps:
    - step: 1
      label: Upload black level mask via HTTP POST
      notes: >
        curl -X POST -F file=@blacklevel.png http://<projector_ip>/api/image/processing/blacklevel/file/transfer
        Black level mask for 4K Cinemascope must be 1280 x 540 px grayscale.
    - step: 2
      label: Select the uploaded file
      action: select_blacklevel_file
      params:
        filename: blacklevel.png
    - step: 3
      label: Enable black level mask file
      action: enable_blacklevel_file
      params:
        enable: true
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_state_check
    description: >
      Source recommends verifying that system.state is "standby" or "ready"
      before issuing system.poweron. Issuing power on while the projector is
      already on or in a state transition has no effect.
  - id: power_off_state_check
    description: >
      Source recommends verifying that system.state is "on" before issuing
      system.poweroff. Issuing power off while already off or in transition
      has no effect.
  - id: property_set_wait
    description: >
      It is best practice to wait for confirmation of a property.set response
      before setting the same property again. Continuously setting without
      waiting may flood the server and reduce performance.
```

## Notes

The Barco Loki Cinemascope uses the Barco Pulse API, a JSON-RPC 2.0 protocol. All commands (power, source, image, illumination) use the same wire format regardless of whether the connection is TCP/IP or RS-232 serial — the only exception is the ECO-mode wake command, which is a raw ASCII string (`:POWR1\r`) sent over the serial port rather than a JSON-RPC call.

**Transport notes:**
- TCP/IP connection: port 9090.
- Serial: 9-pin cable, pin 2 to pin 2, pin 3 to pin 3, pin 5 to pin 5 (standard null-modem wiring).
- Authentication is optional for normal end-user access; only elevated access (service/engineering level) requires the `authenticate` method with a passcode.

**API dynamism:** The Pulse API is partially dynamic — available objects and properties depend on the installed peripherals (lenses, input cards, etc.). The source documentation explicitly notes that properties shown may not be available on a specific projector configuration. The recommended way to discover the exact API of a given unit is to use the `introspect` method.

**File upload:** Warp grid files (XML), blend masks, and black level masks must be uploaded via HTTP POST to the projector's REST file endpoint (`http://<ip>/api/<path>/file/transfer`). This HTTP transfer is separate from the JSON-RPC channel and requires network connectivity; it is not available over serial.

**Blend/black level mask resolution for 4K Cinemascope:** 1280 x 540 pixels. Supported image formats: PNG (up to 16-bit), JPEG, TIFF. Color images are accepted but only the blue channel is used; grayscale is recommended.

**Notifications:** The server only pushes notifications for properties and signals that the client has explicitly subscribed to. Subscribing does not return the current value; use `property.get` to obtain the initial value before relying on change notifications.

**ECO mode:** Wake-on-LAN (WoL) targeting the projector's MAC address is an alternative to the serial wake command for networked projectors in ECO mode.

<!-- UNRESOLVED: lens motor control properties (zoom, focus, shift) referenced as conditional on lens type but property names not documented in source excerpt -->
<!-- UNRESOLVED: DMX channel function values for channels 03-14 depend on DMX mode setting; full enumeration not stated -->
<!-- UNRESOLVED: authentication passcode format and default values not stated in source -->

---

Upgrade done. Added:
- `list_source_connectors` action (`image.source.{name}.listconnectors`)
- `blink_led` action (`ledctrl.blink`)
- 5 Variables: contrast, saturation, gamma, intensity, sharpness (resolved prior UNRESOLVED)
- `get_property` param widened to accept array (source documents multi-property read)

Preserved all existing IDs/shapes.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T04:26:24.054Z
last_checked_at: 2026-10-01T08:02:39.371Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T08:02:39.371Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions map to JSON-RPC methods or the ECO ASCII command documented verbatim in the source; transport values (port 9090, 19200 8N1) appear verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact Loki Cinemascope model variant confirmed only by blend/black-level mask resolution table entry \"4K Cinemascope: 1280 x 540\"; the full property list in source covers multiple Barco Pulse projectors (UDX series, etc.) and not all properties are confirmed present on the Loki Cinemascope specifically"
- "lens motor control properties (zoom, focus, shift) referenced as conditional on lens type but property names not documented in source excerpt"
- "DMX channel function values for channels 03-14 depend on DMX mode setting; full enumeration not stated"
- "authentication passcode format and default values not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
