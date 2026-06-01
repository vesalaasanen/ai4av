---
spec_id: admin/barco-wodan
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Wodan Control Spec"
manufacturer: Barco
model_family: Wodan
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Wodan
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
last_checked_at: 2026-05-20T06:11:59.127Z
generated_at: 2026-05-20T06:11:59.127Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T06:11:59.127Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "All 64 spec actions matched their JSON-RPC methods and properties in the source document; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Barco Wodan Control Spec

## Summary

The Barco Wodan is a Barco projector family controlled via the Pulse API, a JSON-RPC 2.0 protocol accessible over TCP/IP (port 9090) or RS-232 serial. This spec covers the network and serial control interface for power, input source selection, illumination, image adjustment, and environment monitoring as described in the "RS232 and Network Command Catalog for JSON RPC/Pulse Based Projectors" reference guide v1.7.

<!-- UNRESOLVED: The Wodan model is referenced in the source document title but many property entries list "UDX" model variants (UDX-4K22, UDX-W32, All). It is unclear which properties apply exclusively to the Wodan vs. the full UDX family. Use introspection at runtime to discover the exact API surface for a specific unit. -->

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
  # Auth note: For normal end-user access, authentication can be skipped.
  # A session can authenticate with a numeric passcode to elevate access level.
  # Method: authenticate, params: {"code": <integer>}
  # Authentication is only required for higher-privilege operations.
```

## Traits

```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source set commands
- queryable       # inferred from property.get commands returning state
- levelable       # inferred from image.brightness, illumination.sources.laser.power controls
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"system.poweron"}. Result is null on success.
    Verify system.state is "standby" or "ready" before sending; ignored if already on
    or in state transition.
  params: []

- id: power_off
  label: Power Off
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"system.poweroff"}. Result is null on success.
    Verify system.state is "on" before sending; ignored if already off or in transition.
  params: []

- id: set_input_source
  label: Set Input Source
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source-name>"}}.
    Use image.source.list to retrieve available source names before setting.
  params:
    - name: source
      type: string
      description: >
        Source name string, e.g. "DisplayPort 1", "DisplayPort 2", "HDMI", "DVI 1",
        "DVI 2", "HDBaseT", "SDI", "Dual DVI", "Dual DisplayPort", "Dual Head DVI",
        "Dual Head DisplayPort". Available sources depend on the specific projector model.

- id: list_sources
  label: List Available Sources
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"image.source.list"}. Returns array of source name strings.
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"image.connector.list"}. Returns array of connector name strings.
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<float>}}.
    Range: -1.0 to 1.0, precision 0.01. 0 is default.
  params:
    - name: value
      type: float
      description: Normalized brightness offset. 0 = default, 1 = 100% offset. Range -1 to 1.

- id: set_laser_power
  label: Set Laser Power
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<float>}}.
    Value is percentage. Read illumination.sources.laser.minpower and illumination.sources.laser.maxpower
    first to determine valid range (dynamic, depends on lens and projector state).
  params:
    - name: value
      type: float
      description: Laser power in percent. Range is dynamic; read min/maxpower properties first.

- id: enable_warp
  label: Enable Warp Processing
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}.
  params:
    - name: enable
      type: boolean
      description: true to enable warp, false to disable.

- id: select_warp_file
  label: Select Warp Grid File
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"}}.
    File must be uploaded first via HTTP POST to /api/image/processing/warp/file/transfer.
  params:
    - name: filename
      type: string
      description: Filename of the warp grid XML file previously uploaded to the projector.

- id: enable_warp_file
  label: Enable Warp File Processing
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}.
  params:
    - name: enable
      type: boolean
      description: true to enable grid file warping.

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"<filename>"}}.
    File must be uploaded via HTTP POST to /api/image/processing/blend/file/transfer.
    Supported formats: PNG (up to 16-bit), JPEG, TIFF (grayscale; color accepted but only blue channel used).
  params:
    - name: filename
      type: string
      description: Filename of the blend mask image previously uploaded.

- id: enable_blend_file
  label: Enable Blend Mask
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}.
  params:
    - name: enable
      type: boolean
      description: true to enable blend mask.

- id: select_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"}}.
    File must be uploaded via HTTP POST to /api/image/processing/blacklevel/file/transfer.
  params:
    - name: filename
      type: string
      description: Filename of the black level mask image previously uploaded.

- id: enable_blacklevel_file
  label: Enable Black Level Mask
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}.
  params:
    - name: enable
      type: boolean
      description: true to enable black level mask.

- id: authenticate
  label: Authenticate Session
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"authenticate","params":{"code":<integer>},"id":1}.
    Only required for elevated access levels beyond normal end-user. Returns {"result":true} on success.
  params:
    - name: code
      type: integer
      description: Numeric passcode for the desired access level.

- id: property_get
  label: Get Property Value
  kind: action
  notes: >
    Generic property read. Send {"jsonrpc":"2.0","method":"property.get","params":{"property":"<name>"}}.
    Can also accept an array of property names to read multiple values at once.
  params:
    - name: property
      type: string
      description: Dot-notation property name, e.g. "system.state", "image.brightness".

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<name>"}}.
    Can accept a single string or array of strings. Generates property.changed notifications on change.
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names to subscribe to.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<name>"}}.
  params:
    - name: property
      type: string_or_array
      description: Property name or array of property names to unsubscribe from.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<name>"}}.
    Can accept string or array. Generates signal.callback notifications.
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names, e.g. "modelupdated".

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<name>"}}.
  params:
    - name: signal
      type: string_or_array
      description: Signal name or array of signal names.

- id: introspect
  label: Introspect API Objects
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"introspect","params":{"object":"<name>","recursive":<bool>}}.
    Default object is "" (introspects everything). recursive=false lists only one level of objects.
    Results are restricted by the client's authenticated access level.
  params:
    - name: object
      type: string
      description: Dot-notation object name to introspect. Empty string introspects everything.
    - name: recursive
      type: boolean
      description: If true (default), recurse into child objects. If false, list one level only.

- id: get_temperatures
  label: Get Temperature Readings
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}.
    Returns a dictionary of sensor name to temperature reading (float, degrees Celsius).
  params: []

- id: get_fan_speeds
  label: Get Fan Speed Readings
  kind: action
  notes: >
    Send {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}.
    Returns a dictionary of fan name to speed reading (int, RPM).
  params: []
- id: set_contrast
  label: Set Image Contrast
  kind: action
  notes: "Send property.set with property image.contrast. Range: 0 to 2."
  params:
    - name: value
      type: float
      description: Normalized contrast. 1 = default. Range 0 to 2.

- id: set_saturation
  label: Set Image Saturation
  kind: action
  notes: "Send property.set with property image.saturation. Range: 0 to 2."
  params:
    - name: value
      type: float
      description: Normalized saturation. 1 = default. Range 0 to 2.

- id: set_gamma
  label: Set Image Gamma
  kind: action
  notes: "Send property.set with property image.gamma. Default 2.2. Range 1 to 3."
  params:
    - name: value
      type: float
      description: Gamma value. Range 1 to 3.

- id: set_intensity
  label: Set Image Intensity
  kind: action
  notes: "Send property.set with property image.intensity. Range 0 to 1."
  params:
    - name: value
      type: float
      description: Image intensity. Range 0 to 1.

- id: set_orientation
  label: Set Image Orientation
  kind: action
  notes: "Send property.set with property image.orientation."
  params:
    - name: value
      type: string
      description: "Orientation: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR."

- id: set_rgb_mode
  label: Set RGB Mode
  kind: action
  notes: "Send property.set with property image.color.rgbmode.rgbmode."
  params:
    - name: value
      type: string
      description: "RGB mode: Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed."

- id: set_p7_redgain
  label: Set P7 Red Gain
  kind: action
  notes: "Send property.set with property image.color.p7.custom.redgain."
  params:
    - name: value
      type: float
      description: Desired red gain for P7 custom color management.

- id: set_connector_colorspace
  label: Set Connector Color Space Override
  kind: action
  notes: "Send property.set with property image.connector.l1displayport.colorspace (or other connector object name)."
  params:
    - name: value
      type: string
      description: "Color space: Auto, RGB, REC709, REC601, REC2020."

- id: set_shutter
  label: Set Shutter Position
  kind: action
  notes: "Send property.set with property optics.shutter.target."
  params:
    - name: value
      type: string
      description: "Shutter target: Open or Closed."

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift
  kind: action
  notes: "Send property.set with property optics.lensshift.horizontal.target. Read min/maxposition first."
  params:
    - name: value
      type: integer
      description: Target horizontal lens shift position.

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift
  kind: action
  notes: "Send property.set with property optics.lensshift.vertical.target. Read min/maxposition first."
  params:
    - name: value
      type: integer
      description: Target vertical lens shift position.

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  notes: "Send property.set with property image.window.main.scalingmode."
  params:
    - name: value
      type: string
      description: "Scaling mode: Fill, OneToOne, FillScreen, Stretch."

- id: set_testpattern
  label: Show Test Pattern
  kind: action
  notes: "Set image.testpattern.show to display, image.testpattern.selected to pick pattern id."
  params:
    - name: show
      type: boolean
      description: true to display, false to hide.
    - name: selected
      type: string
      description: Unique id of the test pattern.

- id: set_display_mode
  label: Set Desired Display Mode
  kind: action
  notes: "Send property.set with property image.display.desireddisplaymode."
  params:
    - name: value
      type: string
      description: "Display mode: Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift."
```

## Feedbacks

```yaml
- id: system_state
  label: Projector System State
  property: system.state
  type: enum
  values:
    - boot         # projector is booting up
    - eco          # projector is in ECO/power save mode
    - standby      # projector is in standby mode
    - ready        # projector is in ready mode
    - conditioning # projector is warming up
    - on           # projector is on
    - deconditioning # projector is cooling down
  notes: >
    Read with property.get {"property":"system.state"}. Subscribe with property.subscribe
    to receive property.changed notifications on state transitions.

- id: illumination_state
  label: Illumination (Light Source) State
  property: illumination.state
  type: enum
  values:
    - "On"
    - "Off"
  notes: Subscribe to illumination.state for change notifications.

- id: active_source
  label: Currently Active Input Source
  property: image.window.main.source
  type: string
  notes: >
    Returns the name of the currently active source (e.g. "DisplayPort 1").
    Subscribe for change notifications; two notifications are sent on source switch
    (deselect old source: empty string, then select new source: source name).

- id: laser_power
  label: Laser Power Level
  property: illumination.sources.laser.power
  type: float
  notes: Current laser power as a percentage. Read/Write.

- id: laser_minpower
  label: Laser Minimum Power
  property: illumination.sources.laser.minpower
  type: float
  notes: Minimum allowable laser power in percent. Read-only. Dynamic value.

- id: laser_maxpower
  label: Laser Maximum Power
  property: illumination.sources.laser.maxpower
  type: float
  notes: Maximum allowable laser power in percent. Read-only. Dynamic value.

- id: laser_ispowerlimited
  label: Laser Power Limited Flag
  property: illumination.sources.laser.ispowerlimited
  type: boolean
  notes: True if laser power is currently being limited by the system.

- id: laser_powerlimitreason
  label: Laser Power Limit Reason
  property: illumination.sources.laser.powerlimitreason
  type: string
  notes: If power is limited, gives the reason string.

- id: image_brightness
  label: Image Brightness
  property: image.brightness
  type: float
  notes: Normalized brightness offset. 0 = default. Range -1 to 1, precision 0.01.

- id: environment_alarmstate
  label: Environment Alarm State
  property: environment.alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
  notes: Read-only alarm state from the environment service.

- id: firmware_version
  label: Firmware Version
  property: firmware.firmwareversion
  type: string
  notes: Currently installed firmware version string. Read-only.

- id: clo_state
  label: Constant Light Output (CLO) State
  property: illumination.clo.state
  type: enum
  values:
    - Ok
    - TooDim
    - TooBright
  notes: State of the CLO feature. Read-only.

- id: clo_availability
  label: CLO Availability
  property: illumination.clo.availability
  type: enum
  values:
    - Available
    - SensorUnavailable
    - PendingWarmup
    - Unavailable
    - Unknown
  notes: Current availability of the CLO feature.

- id: dmx_connection_active
  label: DMX Connection Active
  property: dmx.monitor.connectionstate.active
  type: boolean
  notes: >
    True if a DMX or ArtNet packet was received in the last 10 seconds. Read-only.
```

## Variables

```yaml
- id: illumination_clo_enable
  label: Constant Light Output Enable
  property: illumination.clo.enable
  type: boolean
  notes: True if CLO is enabled. Read/Write.

- id: illumination_clo_scale
  label: CLO Scale
  property: illumination.clo.scale
  type: float
  notes: Percentage to scale the CLO setpoint by. Read/Write.

- id: illumination_clo_setpoint
  label: CLO Target Luminosity Setpoint
  property: illumination.clo.setpoint
  type: float
  notes: Target luminosity of the light source for CLO. Read/Write.

- id: dmx_artnet
  label: ArtNet Enabled
  property: dmx.artnet
  type: boolean
  notes: Enable/disable ArtNet protocol. Read/Write.

- id: dmx_artnetnet
  label: ArtNet Net Selection
  property: dmx.artnetnet
  type: integer
  notes: ArtNet net selection. Read/Write.

- id: dmx_artnetuniverse
  label: ArtNet Universe Selection
  property: dmx.artnetuniverse
  type: integer
  notes: ArtNet universe selection. Read/Write.

- id: dmx_mode
  label: DMX Mode
  property: dmx.mode
  type: string
  notes: Current DMX mode. Read/Write.

- id: dmx_startchannel
  label: DMX Start Channel
  property: dmx.startchannel
  type: integer
  notes: DMX start channel [1..512]. Read/Write.

- id: dmx_shutdown
  label: DMX Shutdown Enabled
  property: dmx.shutdown
  type: boolean
  notes: Shutdown enabled or not. Read/Write.

- id: dmx_shutdowntimeout
  label: DMX Shutdown Timeout
  property: dmx.shutdowntimeout
  type: integer
  notes: Timeout for DMX-triggered shutdown in minutes. Read/Write.
```

## Events

```yaml
- id: property_changed
  label: Property Changed Notification
  notes: >
    Unsolicited notification from server when a subscribed property changes.
    Format: {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<property-name>": <value>},...]}}.
    Client must implement a property.changed handler to receive these.

- id: signal_callback
  label: Signal Callback Notification
  notes: >
    Unsolicited notification from server when a subscribed signal fires.
    Format: {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<signal-name>":{"arg1":<v>,...}},...]}}.
    Client must implement a signal.callback handler.

- id: modelupdated
  label: Model Updated Signal
  notes: >
    Signal fired when new objects arrive or objects are removed from the API model.
    Subscribe with signal.subscribe {"signal":"modelupdated"}.
    Callback payload: {"introspect.objectchanged":{"object":"<name>","newobject":<bool>}}.
    isnew=true means a new object appeared; isnew=false means an object was removed.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described explicitly in source beyond
# the warp/blend enable workflows, which are documented as discrete Actions above.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Power on is ignored if projector is already on or in a state transition.
      Always verify system.state is "standby" or "ready" before sending system.poweron.
  - description: >
      Power off is ignored if projector is already off or in a state transition.
      Always verify system.state is "on" before sending system.poweroff.
  - description: >
      ECO mode wake-up requires Wake-on-LAN (MAC address), physical button press,
      or a special RS-232 ASCII command ":POWR1\r". TCP/IP commands will not wake
      a projector from ECO mode.
# UNRESOLVED: no explicit electrical safety warnings or interlock sequences stated in source.
```

## Notes

**Protocol:** The Pulse API uses JSON-RPC 2.0 over a persistent TCP connection to port 9090, or via RS-232 at 19200 baud. All commands and responses use JSON objects. The same command set is available on both transports.

**Request IDs:** The `id` field in requests is optional but recommended; it allows matching responses to requests. Notifications from the server (property.changed, signal.callback) do not include an `id` and must not receive a response.

**Property set best practice:** Wait for confirmation of a property.set before sending another set on the same property. Flooding the server with rapid successive sets to the same property may degrade performance.

**Authentication:** For normal end-user operations (power, source select, image adjust), no authentication is needed. Authentication with a numeric code is required only for higher-privilege operations. The protocol does not specify what code value(s) are valid — these are device-configured.

**Dynamic API:** Parts of the API are model-dependent and hardware-dependent (e.g., lens type affects available motorized zoom properties; DMX extended mode exposes additional channels). Use the introspect method to discover the actual API surface of a specific unit at runtime.

**ECO mode wake:** A projector in ECO mode cannot be woken via TCP/IP. Use Wake-on-LAN (requires the projector's MAC address), the physical power button, or the RS-232 serial command `:POWR1\r`.

**HTTP file upload endpoint:** Warp grid, blend mask, and black level mask files can be uploaded via HTTP POST to `http://<ip>/api/<path>/file/transfer`. File formats supported: PNG (up to 16-bit), JPEG, TIFF. Color images are accepted but only the blue channel is used (grayscale images saved as RGB are supported this way).

**Source naming:** Source object names used in method calls (e.g. `image.source.displayport1.listconnectors`) are derived by stripping non-word characters and lowercasing the display name (e.g. "DisplayPort 1" → "displayport1").

**Illumination power range:** The min and max laser power values are dynamic and depend on projector configuration (lens type, lens position, etc.). Always read these before constraining a power set command.

<!-- UNRESOLVED: Wodan-specific model numbers are not listed in the source property tables; most properties list "All" or specific UDX variants (UDX-4K22, UDX-W32). The mapping of "Wodan" to specific property availability is not documented in this source. -->
<!-- UNRESOLVED: No color management property ranges (image.color.p7.*) are fully documented with min/max constraints in the reviewed sections. -->
<!-- UNRESOLVED: RS-232 cable pinout: pin 2 to pin 2, pin 3 to pin 3, pin 5 to pin 5 (9-pin female host to 9-pin male projector), but full null-modem vs straight-through configuration is not explicitly confirmed. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T06:11:59.127Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T06:11:59.127Z
matched_actions: 64
action_count: 64
confidence: high
summary: "All 64 spec actions matched their JSON-RPC methods and properties in the source document; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
