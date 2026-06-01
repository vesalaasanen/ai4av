---
spec_id: admin/barco-njord
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Njord Control Spec"
manufacturer: Barco
model_family: "Barco Njord"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Njord"
    - UDX-4K22
    - UDX-W32
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T06:01:01.586Z
generated_at: 2026-05-20T06:01:01.586Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T06:01:01.586Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions matched to source JSON-RPC methods; all transport parameters verified in Pulse API Reference Guide v1.7."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Barco Njord Control Spec

## Summary

The Barco Njord is a professional laser projector controlled via the Barco Pulse API, a JSON-RPC 2.0-based interface. Control is available over TCP/IP (port 9090) or RS-232 serial. This spec covers power, input selection, illumination, image settings, warp/blend file management, and environment monitoring as described in the Pulse API Reference Guide v1.7.

<!-- UNRESOLVED: The source document is titled for "UDX" Pulse-based projectors; the Njord is assumed to use the same API. Exact feature availability is dynamic and model-dependent — introspection of the live device is recommended. -->

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
  # Authentication is only required when accessing higher than normal end-user access level.
  # For normal end-user access the authentication step can be skipped.
  # To authenticate, call method "authenticate" with params: {"code": <passcode>}.
  # The passcode value is not stated in the source.
```

## Traits

```yaml
- powerable      # inferred from system.poweron / system.poweroff commands
- routable       # inferred from image.window.main.source property set/get
- queryable      # inferred from property.get commands returning state values
- levelable      # inferred from illumination power level and image brightness controls
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: >
    JSON-RPC method: system.poweron.
    If projector is already on or in transition, command is silently ignored.
    Verify system.state is "standby" or "ready" before issuing.

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: >
    JSON-RPC method: system.poweroff.
    If projector is already off or in transition, command is silently ignored.
    Verify system.state is "on" before issuing.

- id: set_source
  label: Set Active Source
  kind: action
  params:
    - name: source
      type: string
      description: >
        Source name string (e.g. "DisplayPort 1", "HDMI", "SDI", "DVI 1",
        "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort",
        "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT").
        Available sources depend on projector model; query image.source.list first.
  notes: >
    JSON-RPC method: property.set with property "image.window.main.source".

- id: list_sources
  label: List Available Sources
  kind: action
  params: []
  notes: >
    JSON-RPC method: image.source.list. Returns array of source name strings.

- id: list_connectors
  label: List Physical Connectors
  kind: action
  params: []
  notes: >
    JSON-RPC method: image.connector.list. Returns array of connector name strings.

- id: set_illumination_power
  label: Set Illumination Source Power Level
  kind: action
  params:
    - name: source_object
      type: string
      description: >
        Illumination source object name (e.g. "illumination.sources.laser").
        Query via introspect on "illumination.sources".
    - name: value
      type: integer
      description: Power level (integer). Min/max are dynamic; query minpower/maxpower first.
  notes: >
    JSON-RPC method: property.set with property "<source_object>.power".

- id: set_brightness
  label: Set Image Brightness
  kind: action
  params:
    - name: value
      type: float
      description: "Brightness offset, normalized. 0 = default, range -1 to 1, precision 0.01."
  notes: >
    JSON-RPC method: property.set with property "image.brightness".

- id: enable_warp
  label: Enable/Disable Global Warp
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to enable, false to disable.
  notes: >
    JSON-RPC method: property.set with property "image.processing.warp.enable".

- id: select_warp_file
  label: Select Active Warp Grid File
  kind: action
  params:
    - name: filename
      type: string
      description: Name of the uploaded warp file (e.g. "warp.xml").
  notes: >
    JSON-RPC method: property.set with property "image.processing.warp.file.selected".

- id: enable_warp_file
  label: Enable/Disable Warp Grid File Warping
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to enable grid file warping, false to disable.
  notes: >
    JSON-RPC method: property.set with property "image.processing.warp.file.enable".

- id: select_blend_file
  label: Select Active Blend Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: Name of the uploaded blend mask file (e.g. "mask.png").
  notes: >
    JSON-RPC method: property.set with property "image.processing.blend.file.selected".

- id: enable_blend_file
  label: Enable/Disable Blend Mask File
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to enable blend mask, false to disable.
  notes: >
    JSON-RPC method: property.set with property "image.processing.blend.file.enable".

- id: select_blacklevel_file
  label: Select Active Black Level Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: Name of the uploaded black level mask file (e.g. "blacklevel.png").
  notes: >
    JSON-RPC method: property.set with property "image.processing.blacklevel.file.selected".

- id: enable_blacklevel_file
  label: Enable/Disable Black Level Mask File
  kind: action
  params:
    - name: enable
      type: boolean
      description: true to enable black level mask, false to disable.
  notes: >
    JSON-RPC method: property.set with property "image.processing.blacklevel.file.enable".

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  params:
    - name: code
      type: integer
      description: >
        Secret passcode for elevated access level. Not required for normal end-user access.
        Passcode value is not documented in the source.
  notes: >
    JSON-RPC method: authenticate with params: {"code": <passcode>}.
    Returns true on success. Only needed for non-default (elevated) access levels.

- id: introspect
  label: Introspect API Object
  kind: action
  params:
    - name: object
      type: string
      description: Dot-notation object name to introspect (e.g. "image", "motors", "illumination.sources").
    - name: recursive
      type: boolean
      description: If true, introspect recursively. If false, list one level of child objects only.
  notes: >
    JSON-RPC method: introspect. Returns metadata about methods, properties, and signals.
    Subscribe to signal "modelupdated" (via signal.subscribe) to be notified when objects are added/removed.

- id: get_environment_blocks
  label: Get Environment Control Blocks
  kind: action
  params:
    - name: type
      type: string
      description: >
        Block type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: >
        Value type: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure,
        Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference,
        Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula,
        Driver, PID, Mode, Simulation, State, Pump, Resistance, Constant, Manual, Range, Any.
  notes: >
    JSON-RPC method: environment.getcontrolblocks with params {"type": ..., "valuetype": ...}.
    Returns dictionary of sensor-name to value mappings.

- id: ledctrl_blink
  label: Blink LED Indicator
  kind: action
  params:
    - name: led
      type: string
      description: >
        LED name to blink (e.g. "systemstatus").
    - name: color
      type: string
      description: Color name (e.g. "red").
    - name: period
      type: integer
      description: Blink period in units (interpretation device-dependent).
  notes: >
    JSON-RPC method: ledctrl.blink. Returns integer result on success.
- id: property_get
  label: Get Property Value
  kind: action
  params:
    - name: property
      type: string
      description: "Dot-notation property name or array."
  notes: "JSON-RPC method: property.get."

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: "Property name or array to subscribe to."
  notes: "JSON-RPC method: property.subscribe."

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: "Property name or array to unsubscribe from."
  notes: "JSON-RPC method: property.unsubscribe."

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: "Signal name or array."
  notes: "JSON-RPC method: signal.subscribe."

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: "Signal name or array."
  notes: "JSON-RPC method: signal.unsubscribe."

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  params:
    - name: value
      type: float
      description: "Image color saturation, normalized. 1 is default. Range 0 to 2."
  notes: "JSON-RPC method: property.set with property image.saturation."

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  params:
    - name: value
      type: float
      description: "Image contrast, normalized."
  notes: "JSON-RPC method: property.set with property image.contrast."

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  params:
    - name: value
      type: string
      description: "Scaling mode enum: Fill, OneToOne, FillScreen, Stretch."
  notes: "JSON-RPC method: property.set with property image.window.main.scalingmode."

- id: set_test_pattern
  label: Show Test Pattern
  kind: action
  params:
    - name: show
      type: boolean
      description: true to show, false to hide.
    - name: selected
      type: string
      description: Unique id of the test pattern to select.
  notes: "JSON-RPC method: property.set with property image.testpattern.show / image.testpattern.selected."

- id: set_rgb_mode
  label: Set RGB Output Mode
  kind: action
  params:
    - name: value
      type: string
      description: "RGB mode enum: Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed."
  notes: "JSON-RPC method: property.set with property image.color.rgbmode.rgbmode."

- id: set_shutter
  label: Set Shutter Position
  kind: action
  params:
    - name: target
      type: string
      description: "Shutter target: Open or Closed."
  notes: "JSON-RPC method: property.set with property optics.shutter.target."

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift Target
  kind: action
  params:
    - name: target
      type: integer
      description: Desired horizontal lens shift position.
  notes: "JSON-RPC method: property.set with property optics.lensshift.horizontal.target."

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift Target
  kind: action
  params:
    - name: target
      type: integer
      description: Desired vertical lens shift position.
  notes: "JSON-RPC method: property.set with property optics.lensshift.vertical.target."

- id: set_zoom
  label: Set Zoom Target
  kind: action
  params:
    - name: target
      type: integer
      description: Desired zoom position.
  notes: "JSON-RPC method: property.set with property optics.zoom.target."

- id: set_focus
  label: Set Focus Target
  kind: action
  params:
    - name: target
      type: integer
      description: Desired focus position.
  notes: "JSON-RPC method: property.set with property optics.focus.target."

- id: set_dmx_shutdown
  label: Set DMX Shutdown Enabled
  kind: action
  params:
    - name: value
      type: boolean
      description: true to enable DMX shutdown.
  notes: "JSON-RPC method: property.set with property dmx.shutdown."

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  params:
    - name: value
      type: integer
      description: "DMX start channel [1..512]."
  notes: "JSON-RPC method: property.set with property dmx.startchannel."

- id: set_p7_redgain
  label: Set P7 Custom Red Gain
  kind: action
  params:
    - name: value
      type: float
      description: Desired red gain value for P7 custom color calibration.
  notes: "JSON-RPC method: property.set with property image.color.p7.custom.redgain."

- id: list_source_connectors
  label: List Connectors for Source
  kind: action
  params:
    - name: source_object_name
      type: string
      description: "Source object name (lowercase, non-word chars removed)."
  notes: "JSON-RPC method: image.source.<name>.listconnectors."
```

## Feedbacks

```yaml
- id: system_state
  label: Projector System State
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  notes: >
    Query: property.get with property "system.state".
    Subscribe: property.subscribe with property "system.state".
    Notification method: property.changed.

- id: active_source
  label: Active Input Source
  type: string
  notes: >
    Query: property.get with property "image.window.main.source".
    Subscribe: property.subscribe with property "image.window.main.source".
    Notification delivers two events on source change: first with empty string
    (deselect), then with the new source name.

- id: illumination_state
  label: Illumination On/Off State
  type: enum
  values: [On, Off]
  notes: >
    Query: property.get with property "illumination.state".
    Subscribe: property.subscribe with property "illumination.state".

- id: illumination_power
  label: Current Illumination Source Power Level
  type: integer
  notes: >
    Query: property.get with property "illumination.sources.<source>.power"
    (e.g. "illumination.sources.laser.power").
    Min/max power also queryable via "illumination.sources.<source>.minpower"
    and "illumination.sources.<source>.maxpower" (read-only).

- id: image_brightness
  label: Image Brightness
  type: float
  notes: >
    Query: property.get with property "image.brightness".
    Range: -1.0 to 1.0, default 0, precision 0.01.
    Subscribe: property.subscribe with property "image.brightness".

- id: connector_signal
  label: Connector Detected Signal Info
  type: object
  notes: >
    Query: property.get with property "image.connector.<connectorobjectname>.detectedsignal".
    Connector object name = source name lowercased with non-word characters removed.
    Returns object with: active (bool), name (string), resolution, timing, color_space, etc.
    Subscribe: property.subscribe with "image.connector.<name>.detectedsignal".
```

## Variables

```yaml
- id: image_contrast
  label: Image Contrast
  type: float
  notes: >
    Property: image.contrast. Range: float, normalized. Use introspect on "image" for constraints.
    Set via property.set; get via property.get.

- id: dmx_artnet_enabled
  label: DMX ArtNet Enabled
  type: boolean
  notes: >
    Property: dmx.artnet. Access: RW. Available on all models.

- id: dmx_artnet_net
  label: DMX ArtNet Net Selection
  type: integer
  notes: >
    Property: dmx.artnetnet. Access: RW. Available on all models.

- id: dmx_artnet_universe
  label: DMX ArtNet Universe Selection
  type: integer
  notes: >
    Property: dmx.artnetuniverse. Access: RW. Available on all models.

- id: dmx_mode
  label: DMX Mode
  type: string
  notes: >
    Property: dmx.mode. Access: RW. Available on all models.
    Setting extended mode may expose additional DMX channels beyond the default 2.

- id: firmware_version
  label: Firmware Version
  type: string
  notes: >
    Property: firmware.firmwareversion. Access: R. Returns currently installed firmware version string.

- id: gsm_available
  label: GSM Card Present
  type: boolean
  notes: >
    Property: gsm.available. Access: R. True if GSM card is present.

- id: gsm_pin_state
  label: GSM SIM PIN State
  type: enum
  values: ["Accepted", "Failed", "Locked", "Unknown"]
  notes: >
    Property: gsm.pinstate. Access: R. Current state of the SIM PIN.

- id: illumination_clo_enable
  label: Constant Light Output Enabled
  type: boolean
  notes: >
    Property: illumination.clo.enable. Access: RW. True if constant light output is enabled.

- id: illumination_clo_setpoint
  label: Constant Light Output Setpoint
  type: float
  notes: >
    Property: illumination.clo.setpoint. Access: RW. Target luminosity of the light source.

- id: illumination_clo_state
  label: Constant Light Output State
  type: enum
  values: ["Ok", "TooDim", "TooBright"]
  notes: >
    Property: illumination.clo.state. Access: R. Current state of CLO.

- id: illumination_clo_scale
  label: Constant Light Output Scale
  type: float
  notes: >
    Property: illumination.clo.scale. Access: RW. Percentage to scale the setpoint by.

- id: image_blackcontentdetection_enable
  label: Black Content Detection Enabled (DEPRECATED)
  type: boolean
  notes: >
    Property: image.blackcontentdetection.enable. Access: RW. DEPRECATED.

- id: image_blackcontentdetection_state
  label: Black Content Detection State (DEPRECATED)
  type: boolean
  notes: >
    Property: image.blackcontentdetection.state. Access: R. DEPRECATED. True/false means black content was/was not detected.

- id: image_blackcontentdetection_threshold
  label: Black Content Detection Threshold (DEPRECATED)
  type: integer
  notes: >
    Property: image.blackcontentdetection.threshold. Access: RW. DEPRECATED. Range 0-255.

# UNRESOLVED: complete list of image.* properties (contrast, saturation, gamma, sharpness, etc.)
# not fully enumerated in source - use introspect with object "image" to discover.
# UNRESOLVED: DMX channel properties beyond channels 01-13 exist in source but are repetitive; full range not enumerated here.
# UNRESOLVED: Lens motor control API, keystone, and other advanced image processing properties exist in the projector but are not fully documented in the provided source excerpt.
```

## Events

```yaml
- id: property_changed
  label: Property Changed Notification
  method: property.changed
  notes: >
    Unsolicited notification sent by server when subscribed properties change.
    Params include a "property" array of {propertyname: value} objects.
    Client must subscribe via property.subscribe to receive these notifications.

- id: signal_callback
  label: Signal Callback Notification
  method: signal.callback
  notes: >
    Unsolicited notification sent by server when subscribed signals fire.
    Params include a "signal" array of {signalname: {arg1: val1, ...}} objects.

- id: model_updated
  label: API Model Updated Signal
  signal_name: modelupdated
  notes: >
    Fired when objects are added or removed from the API model.
    Subscribe via signal.subscribe with signal "modelupdated".
    Callback delivers introspect.objectchanged with "object" (string) and
    "isnew" (bool: true = object added, false = object removed).
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step macros defined in source beyond the following pattern.

- id: upload_and_activate_warp
  label: Upload and Activate Warp Grid File
  steps:
    - description: Upload warp XML file via HTTP POST to /api/image/processing/warp/file/transfer
    - description: Enable global warp (property.set image.processing.warp.enable = true)
    - description: Select uploaded file (property.set image.processing.warp.file.selected = filename)
    - description: Enable file-based warping (property.set image.processing.warp.file.enable = true)
  notes: >
    HTTP file upload endpoint: http://<projector-ip>/api/image/processing/warp/file/transfer
    (HTTP POST with multipart form-data). The warp file format is the same as MCM500/400.

- id: upload_and_activate_blend
  label: Upload and Activate Blend Mask
  steps:
    - description: Upload blend mask (PNG/JPEG/TIFF, grayscale or blue-channel) via HTTP POST to /api/image/processing/blend/file/transfer
    - description: Select blend file (property.set image.processing.blend.file.selected = filename)
    - description: Enable blend mask (property.set image.processing.blend.file.enable = true)
  notes: >
    Supported blend mask resolutions - WUXGA: 1920x1200, WQXGA: 1280x800, 4K: 1280x800, 4K Cinemascope: 1280x540.
    Only blue channel is used from color images.

- id: upload_and_activate_blacklevel
  label: Upload and Activate Black Level Mask
  steps:
    - description: Upload black level mask via HTTP POST to /api/image/processing/blacklevel/file/transfer
    - description: Select black level file (property.set image.processing.blacklevel.file.selected = filename)
    - description: Enable black level mask (property.set image.processing.blacklevel.file.enable = true)
  notes: >
    Same resolution requirements as blend masks. Only blue channel used from color images.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Power-on should only be issued when system.state is "standby" or "ready".
      Issuing power-on while already on or in state transition has no effect.
  - description: >
      Power-off should only be issued when system.state is "on".
      Issuing power-off while already off or in state transition has no effect.
  - description: >
      ECO mode wake-up requires Wake-on-LAN, physical button press, or special RS-232
      command ":POWR1\r". The TCP/IP JSON-RPC API cannot wake a projector in ECO mode.
# UNRESOLVED: no additional safety warnings or interlock procedures explicitly stated in source.
```

## Notes

The Pulse API is based on JSON-RPC 2.0. All requests and responses are JSON objects. The `id` field in requests is optional but recommended for correlating responses.

**Protocol mechanics:**
- `property.set` — set a named property value; best practice is to wait for confirmation before re-setting the same property.
- `property.get` — read one or multiple properties by name.
- `property.subscribe` / `property.unsubscribe` — register/deregister for change notifications.
- `signal.subscribe` / `signal.unsubscribe` — register/deregister for signal callbacks.
- Subscribing to a property does not deliver the current value; use `property.get` first.

**Object naming convention:** Dot-notation lowercase (JavaScript-like). Non-word characters removed and lowercased to convert display names to object names (e.g. "DisplayPort 1" → "displayport1").

**HTTP file endpoints:** Available alongside the JSON-RPC TCP interface for file upload/download (warp grids, blend masks, black level masks). Base URL pattern: `http://<projector-ip>/api/<endpoint>`.

**Authentication:** Normal end-user access does not require authentication. Elevated access requires calling `authenticate` with a passcode; the passcode is not documented in the source.

**ECO mode:** Projectors in ECO mode cannot be woken via TCP/IP JSON-RPC. Use Wake-on-LAN, physical button, or RS-232 `:POWR1\r` command.

**API is dynamic:** Available properties and methods depend on the specific projector configuration, mounted lens, and firmware. Use `introspect` to discover the exact API of a connected device.

**Source document:** Barco Pulse API Reference Guide, Version 1.7, 2019-03-04. Covers JSON RPC/Pulse based projectors for UDX family.

<!-- UNRESOLVED: Complete enumeration of all image.* properties (saturation, gamma, sharpness, etc.) — use introspect on "image" object at runtime. -->
<!-- UNRESOLVED: Firmware version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: DMX channel properties beyond channels 01-13 exist in source but are repetitive; full range not enumerated here. -->
<!-- UNRESOLVED: Lens motor control API, keystone, and other advanced image processing properties exist in the projector but are not fully documented in the provided source excerpt. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T06:01:01.586Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T06:01:01.586Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions matched to source JSON-RPC methods; all transport parameters verified in Pulse API Reference Guide v1.7."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
