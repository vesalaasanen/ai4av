---
spec_id: admin/barco-pulse-platform
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Platform Control Spec"
manufacturer: Barco
model_family: "Barco Pulse Platform"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Pulse Platform"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-22T15:45:48.460Z
last_checked_at: 2026-07-12T08:55:39.755Z
generated_at: 2026-07-12T08:55:39.755Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants not distinguished in source"
  - "no explicit multi-step macro sequences described in source"
  - "full list of DMX modes not enumerated in source (discoverable via dmx.listmodes)"
  - "specific connector signal property names not fully cataloged (only examples given: image.connector.l1hdmi.detectedsignal, image.connector.displayport1.detectedsignal)"
  - "firmware version compatibility not stated in source"
  - "voltage, current, power consumption specifications not present in source"
  - "HTTP port for file endpoints not explicitly stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:55:39.755Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions have literal counterparts in the source; all transport parameters verified with exact matches; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Barco Pulse Platform Control Spec

## Summary
Barco Pulse Platform projector control via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Supports power control, source routing, image adjustment, warping/blending, environment monitoring, and full introspection. File transfer (warp grids, blend masks, black level masks) via HTTP endpoints. Normal end-user access skips authentication; elevated access requires pass code authentication.

<!-- UNRESOLVED: specific model variants not distinguished in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http  # file transfer endpoints (warp/blend/blacklevel upload+download)
addressing:
  port: 9090  # stated: "service is available on port number 9090" (TCP JSON-RPC)
  base_url: "http://{host}/api"  # stated: file endpoints use http://{projector-address}/api/{endpoint}; HTTP port not explicitly stated in source
serial:
  baud_rate: 19200  # stated: "Baud rate 19200"
  data_bits: 8  # stated: "Data bits 8"
  parity: none  # stated: "Parity None"
  stop_bits: 1  # stated: "Stop bits 1"
  flow_control: none  # stated: "Flow control None"
auth:
  type: optional  # inferred: normal end user access skips auth, elevated access requires authenticate method
```

## Traits
```yaml
- powerable  # inferred: system.poweron, system.poweroff present
- queryable  # inferred: property.get, introspection, environment.getcontrolblocks present
- routable  # inferred: image.window.main.source, image.source.list, image.connector.list present
- levelable  # inferred: image.brightness, image.contrast, image.gamma, image.saturation, image.sharpness present
```

## Actions
```yaml
# All commands are JSON-RPC 2.0 method names. Envelope:
#   { "jsonrpc": "2.0", "method": "<command>", "params": { ... }, "id": <n> }
# File-transfer actions use HTTP POST to the base_url endpoint.

- id: system_poweron
  label: Power On
  kind: action
  command: "system.poweron"
  params: []
  description: Power on projector. Result is null. Best practice: verify state is standby or ready before issuing.

- id: system_poweroff
  label: Power Off
  kind: action
  command: "system.poweroff"
  params: []
  description: Power off projector. Result is null. Best practice: verify state is on before issuing.

- id: property_set
  label: Set Property
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Object.property name (e.g., "image.window.main.source")
    - name: value
      type: mixed
      description: Value to set

- id: property_get
  label: Get Property
  kind: query
  command: "property.get"
  params:
    - name: property
      type: string
      description: Object.property name to read (string for single, array of strings for multiple)

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: "property.subscribe"
  params:
    - name: property
      type: string
      description: Object.property name (or array of names) to subscribe to

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: "property.unsubscribe"
  params:
    - name: property
      type: string
      description: Object.property name (or array of names) to unsubscribe from

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: "signal.subscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names) to subscribe to

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: "signal.unsubscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names) to unsubscribe from

- id: image_source_list
  label: List Available Sources
  kind: query
  command: "image.source.list"
  params: []
  description: Returns array of available source names (e.g., "DVI 1", "DisplayPort 1", "HDMI", "SDI")

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: "image.connector.list"
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: "image.source.{name}.listconnectors"
  params:
    - name: name
      type: string
      description: Source object name (source name lowercased with non-word chars removed, e.g. "displayport1")
  description: Returns array of connector info (name + grid position) used by the given source.

- id: introspect
  label: Introspect Object
  kind: query
  command: "introspect"
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation); empty/default introspects everything
    - name: recursive
      type: boolean
      description: Recursive introspection (default true); false lists only one level of object names

- id: authenticate
  label: Authenticate
  kind: action
  command: "authenticate"
  params:
    - name: code
      type: integer
      description: Pass code for elevated access level

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: "environment.getcontrolblocks"
  params:
    - name: type
      type: string
      description: Sensor type enum (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type enum (Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any)
  description: Returns dictionary of sensor/value readings (e.g. temperatures, fan speeds, voltages).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: "environment.getalarminfo"
  params: []
  description: Returns array of alarm info objects (severity, timestamp, source, description, custommessage).

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: "dmx.listchannels"
  params: []
  description: Return a list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: "dmx.listmodes"
  params: []
  description: Return a list of all DMX modes.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: "firmware.listcomponents"
  params: []
  description: List the names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: "firmware.listcomponentversionstatus"
  params: []
  description: List firmware components with available/running versions and upgrade status (Unknown, OK, Upgradable).

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: "firmware.schedulecomponentupgrade"
  params: []
  description: Force a component upgrade at the following reboot.

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: "illumination.clo.engage"
  params: []
  description: Engage CLO (Constant Light Output) at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: "illumination.laser.getserialnumber"
  params: []
  description: Returns the laser serial number string.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string
      description: Name of preset to reset to defaults

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: "image.color.p7.custom.resettonative"
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: "image.color.rgbmode.nextrgbmode"
  params: []
  description: Change to the next RGB mode; cycles through all possible modes.

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: "ledctrl.blink"
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period
  description: Control LED blinking. Result is an integer status code.

- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: "POST /api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Warp grid XML file (same format as MCM500/400)
  description: HTTP file upload. Example: curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer

- id: warp_file_download
  label: Download Warp Grid File
  kind: query
  command: "GET /api/image/processing/warp/file/transfer"
  params: []
  description: HTTP file download. Example: curl -O -J http://{host}/api/image/processing/warp/file/transfer . Append /{filename} to download a specific file.

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: "POST /api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: Grayscale blend mask (PNG up to 16-bit, JPEG, or TIFF); uses blue channel if color
  description: HTTP file upload. Example: curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: "POST /api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: Grayscale black level mask (PNG up to 16-bit, JPEG, or TIFF); uses blue channel if color
  description: HTTP file upload. Example: curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer
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
    - service
    - deconditioning
    - error

- id: property_changed
  label: Property Changed Notification
  type: notification
  description: Unsolicited notification when property value changes. Format: { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [{ "objectname.propertyname": value }] } }

- id: signal_callback
  label: Signal Callback Notification
  type: notification
  description: Unsolicited notification when signal fires. Format: { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [{ "objectname.signalname": args }] } }

- id: modelupdated
  label: Model Updated Signal
  type: signal
  description: Triggered when the object structure changes (objects added or removed). Delivered via signal.callback with object name and isnew flag (true = added, false = removed).

- id: warp_gridchanged
  label: Warp Grid Changed Signal
  type: signal
  description: Triggered when the warp grid changes. Signal name: image.processing.warp.gridchanged. Delivered via signal.callback.

- id: introspect_objectchanged
  label: Object Changed Signal
  type: signal
  description: Triggered via introspect when new objects arrive or are removed. Delivered via signal.callback as introspect.objectchanged with object name and isnew flag.
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
  default: 0
  description: Image brightness/offset. 0 is default, 1 is 100% offset.

- id: image_contrast
  label: Contrast
  type: float
  constraints:
    min: 0
    max: 2
    step-size: 1
    precision: 0.01
  default: 1

- id: image_gamma
  label: Gamma
  type: float
  constraints:
    min: 1
    max: 3
    step-size: 1
    precision: 0.1
  default: 2.2

- id: image_saturation
  label: Saturation
  type: float
  constraints:
    min: 0
    max: 2
    step-size: 1
    precision: 0.01
  default: 1

- id: image_sharpness
  label: Sharpness
  type: int
  constraints:
    min: -2
    max: 8
    step-size: 1
    precision: 1

- id: image_orientation
  label: Image Orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - On
    - Off

- id: illumination_sources_laser_power
  label: Laser Power
  type: float
  description: Target power in percent

- id: illumination_sources_laser_minpower
  label: Laser Min Power
  type: float
  description: Minimum power in percent (read-only)

- id: illumination_sources_laser_maxpower
  label: Laser Max Power
  type: float
  description: Maximum power in percent (read-only)

- id: image_window_main_source
  label: Main Window Source
  type: string
  description: Source displayed in main window (e.g., "DisplayPort 1", "HDMI")

- id: image_window_main_position
  label: Window Position
  type: object
  properties:
    x: int
    y: int

- id: image_window_main_size
  label: Window Size
  type: object
  properties:
    width: int
    height: int

- id: image_window_main_scalingmode
  label: Scaling Mode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean

- id: image_processing_warp_file_enable
  label: File Warp Enable
  type: boolean

- id: image_processing_warp_file_selected
  label: Selected Warp File
  type: string

- id: image_processing_blend_file_enable
  label: Blend Enable
  type: boolean

- id: image_processing_blend_file_selected
  label: Selected Blend Files
  type: array
  items:
    type: string

- id: image_processing_blacklevel_file_enable
  label: Black Level Enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  label: Selected Black Level File
  type: string

- id: optics_shutter_position
  label: Shutter Position
  type: enum
  values:
    - Open
    - Closed

- id: optics_shutter_target
  label: Shutter Target
  type: enum
  values:
    - Open
    - Closed

- id: optics_zoom_position
  label: Zoom Position
  type: int

- id: optics_focus_position
  label: Focus Position
  type: int

- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal
  type: int

- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical
  type: int

- id: environment_alarmstate
  label: Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: network_device_lan_state
  label: LAN State
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: network_device_lan_ip4config
  label: LAN IPv4 Configuration
  type: object
  properties:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
  description: Current IPv4 configuration (read-only).

- id: image_connector_detectedsignal
  label: Connector Detected Signal
  type: object
  description: Signal information for a connector (parameterized by connector object name, e.g. image.connector.displayport1.detectedsignal). If active is false, no signal detected and other fields should be disregarded.
  properties:
    active: boolean
    name: string
    vertical_total: int
    horizontal_total: int
    vertical_resolution: int
    horizontal_resolution: int
    vertical_sync_width: int
    vertical_front_porch: int
    vertical_back_porch: int
    horizontal_sync_width: int
    horizontal_front_porch: int
    horizontal_back_porch: int
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: int
    scan: string
    bits_per_component: int
    color_space: string
    signal_range: string
    chroma_sampling: string
    gamma_type: string

- id: system_standby_enable
  label: Standby Enable
  type: boolean

- id: system_eco_enable
  label: ECO Mode Enable
  type: boolean

- id: dmx_mode
  label: DMX Mode
  type: string

- id: dmx_startchannel
  label: DMX Start Channel
  type: int
  constraints:
    min: 1
    max: 512

- id: dmx_shutdown
  label: DMX Shutdown
  type: boolean
```

## Events
```yaml
# Unsolicited notifications delivered as JSON-RPC messages with no id.
# Documented notification methods:
#   - property.changed  (property/value pairs array)
#   - signal.callback   (signal/argument-list pairs array)
# Specific named signals beyond modelupdated and image.processing.warp.gridchanged
# are discovered via introspection per device configuration.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: eco_wakeup
    description: To wake projector from ECO mode, send wake on LAN with HW (MAC) address, use physical power button, or send ":POWR1\r" via RS-232 serial. Do not send standard power commands while in ECO mode.
```

## Notes
JSON-RPC 2.0 protocol. All parameters passed by name; order does not matter. Best practice: wait for property.set confirmation before setting same property again to avoid flooding server. File upload/download via HTTP on the projector address with `/api` endpoint (e.g., `curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer`). ECO mode requires special wake-up procedure (WOL or serial `:POWR1\r`). API is partially dynamic; introspection recommended to discover available objects for specific configuration. Source-object names derived from source display names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1"). Warp file format is shared with MCM500/400. Blend and black level masks are grayscale (8 or 16-bit); interface accepts color images but uses only the blue channel. Mask resolution depends on projector resolution (WUXGA 1920×1200; WQXGA/4K 1280×800; 4K Cinemascope 1280×540).

<!-- UNRESOLVED: full list of DMX modes not enumerated in source (discoverable via dmx.listmodes) -->
<!-- UNRESOLVED: specific connector signal property names not fully cataloged (only examples given: image.connector.l1hdmi.detectedsignal, image.connector.displayport1.detectedsignal) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage, current, power consumption specifications not present in source -->
<!-- UNRESOLVED: HTTP port for file endpoints not explicitly stated in source -->
````

Upgrade done. Summary of adds (caveman mode):

**Transport:** added `http` protocol + `base_url` for file endpoints.

**Actions** — added `command:` field to all 12 existing actions (payload rule). Added 16 new actions:
- `image_source_listconnectors`, `environment_getcontrolblocks`, `environment_getalarminfo`
- `dmx_listchannels`, `dmx_listmodes`
- `firmware_listcomponents`, `firmware_listcomponentversionstatus`, `firmware_schedulecomponentupgrade`
- `illumination_clo_engage`, `illumination_laser_getserialnumber`
- `image_color_p7_custom_copypresettocustom`, `image_color_p7_custom_resetpreset`, `image_color_p7_custom_resettonative`, `image_color_rgbmode_nextrgbmode`
- `ledctrl_blink`
- `warp_file_upload`, `warp_file_download`, `blend_file_upload`, `blacklevel_file_upload`

**Feedbacks:** added `service` to `system_state` enum; added `warp_gridchanged` + `introspect_objectchanged` signals.

**Variables:** added `image_orientation`, `network_device_lan_ip4config`, `image_connector_detectedsignal`.

Existing IDs/shapes preserved. No valid entries deleted.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-22T15:45:48.460Z
last_checked_at: 2026-07-12T08:55:39.755Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:55:39.755Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions have literal counterparts in the source; all transport parameters verified with exact matches; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants not distinguished in source"
- "no explicit multi-step macro sequences described in source"
- "full list of DMX modes not enumerated in source (discoverable via dmx.listmodes)"
- "specific connector signal property names not fully cataloged (only examples given: image.connector.l1hdmi.detectedsignal, image.connector.displayport1.detectedsignal)"
- "firmware version compatibility not stated in source"
- "voltage, current, power consumption specifications not present in source"
- "HTTP port for file endpoints not explicitly stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
