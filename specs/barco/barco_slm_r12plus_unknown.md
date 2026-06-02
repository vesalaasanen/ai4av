---
spec_id: admin/barco-slm-r12plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco SLM R12plus Control Spec"
manufacturer: Barco
model_family: "SLM R12plus"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "SLM R12plus"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:53:45.394Z
last_checked_at: 2026-05-14T21:38:41.419Z
generated_at: 2026-05-14T21:38:41.419Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-property minimum/firmware version constraints not stated; DMX, CLO, and P7 custom color features may not exist on every configuration — presence must be confirmed by introspection."
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "Pass code value, default DMX mode, default DMX start channel, exact list of available connectors per chassis variant, firmware version compatibility ranges, and any safety interlocks are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-05-14T21:38:41.419Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions found in source with exact method names; transport parameters (port 9090, baud 19200, serial params) verbatim; spec covers the complete Pulse API. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco SLM R12plus Control Spec

## Summary
Barco SLM R12plus projector using the Pulse API platform. Control interface is JSON-RPC 2.0 over TCP port 9090 and an equivalent RS-232 serial connection, plus HTTP file endpoints under `/api/...` for uploading warp grids, blend masks, and black-level masks. The same JSON-RPC command set is exposed over both transports.

<!-- UNRESOLVED: per-property minimum/firmware version constraints not stated; DMX, CLO, and P7 custom color features may not exist on every configuration — presence must be confirmed by introspection. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http  # used only for file transfer endpoints (warp, blend, blacklevel)
addressing:
  port: 9090
  base_url: "http://<projector-address>/api"  # file endpoint base; projector IP/hostname substituted by client
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source describes optional auth: end-user access allowed without code; elevated access via authenticate method with numeric code
  notes: "Optional. End-user access permitted without authentication. To access higher levels, send an `authenticate` JSON-RPC method with `params: { id: <int>, code: <secret pass code> }` and await `result: true`. Pass code value is not documented in the source."
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from image.window.main.source selection
- queryable       # inferred from property.get / property.subscribe API
- levelable       # inferred from illumination.sources.laser.power and image.brightness/contrast/gamma/saturation/sharpness
```

## Actions
```yaml
# Authentication (optional, for elevated access level)
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": <pass_code> } }
  params:
    - name: code
      type: integer
      description: Secret pass code; not documented in source - must be supplied by integrator
  notes: "Optional. Skip for normal end-user access."

# Power
- id: power_on
  label: Power On
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweron" }
  params: []
  notes: "Verify system.state is 'standby' or 'ready' before issuing. No-op if already on or transitioning."

- id: power_off
  label: Power Off
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweroff" }
  params: []
  notes: "Verify system.state is 'on' before issuing. No-op if already off or transitioning."

- id: power_state_get
  label: Get Power State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 1, "property": "system.state" } }
  params: []

- id: power_state_subscribe
  label: Subscribe to Power State Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 2, "property": "system.state" } }
  params: []

# Source selection
- id: list_sources
  label: List Available Sources
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.list", "id": 1 }
  params: []
  notes: "Returned list varies by projector model."

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.list", "id": 3 }
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 0, "property": "image.window.main.source" } }
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "<source_name>" } }
  params:
    - name: source_name
      type: string
      description: One of the names returned by image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "SDI", "HDBaseT", ...).
  notes: "Best practice: wait for confirmation of the previous property.set before issuing the same property.set again."

- id: subscribe_active_source
  label: Subscribe to Active Source Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 6, "property": "image.window.main.source" } }
  params: []

# Generic property get/set/subscribe/unsubscribe
- id: property_get
  label: Get Property Value
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": <n>, "property": "<objectname.propertyname>" } }
  params:
    - name: id
      type: integer
      description: Request identifier (any client-chosen string or number)
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.brightness")

- id: property_set
  label: Set Property Value
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": <n>, "property": "<objectname.propertyname>", "value": <value> } }
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: string
      description: Value matching the property's type/constraints (see Variables section)
  notes: "Wait for confirmation before re-issuing the same property.set to avoid flooding the server."

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": <n>, "property": ["<prop1>", "<prop2>"] } }
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

- id: property_subscribe
  label: Subscribe to Property Change
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": <n>, "property": "<objectname.propertyname>" } }
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_subscribe_multi
  label: Subscribe to Multiple Property Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": <n>, "property": ["<prop1>", "<prop2>"] } }
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

- id: property_unsubscribe
  label: Unsubscribe from Property Change
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": <n>, "property": "<objectname.propertyname>" } }
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": <n>, "property": ["<prop1>", "<prop2>"] } }
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

# Signal subscription
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": <n>, "signal": "<signalname>" } }
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated")

- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": <n>, "signal": ["<signal1>", "<signal2>"] } }
  params:
    - name: signal
      type: array
      description: List of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": <n>, "signal": "<signalname>" } }
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": <n>, "signal": ["<signal1>", "<signal2>"] } }
  params:
    - name: signal
      type: array
      description: List of signal names

# Introspection
- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "<objectname>", "recursive": true }, "id": <n> }
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty/omitted introspects everything
    - name: recursive
      type: boolean
      description: When false, only top-level object names are listed (one level deep)

# LED control
- id: led_blink
  label: Blink System Status LED
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "id": 3, "led": "systemstatus", "color": "red", "period": 42 } }
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period (units not stated in source)

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 0, "property": "illumination.state" } }
  params: []

- id: illumination_state_subscribe
  label: Subscribe to Illumination State Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 1, "property": "illumination.state" } }
  params: []

- id: laser_power_get
  label: Get Laser Power (%)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 3, "property": "illumination.sources.laser.power" } }
  params: []

- id: laser_power_set
  label: Set Laser Power (%)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 5, "property": "illumination.sources.laser.power", "value": <percent> } }
  params:
    - name: percent
      type: integer
      description: Target power in percent; bounded by current minpower/maxpower

- id: laser_power_subscribe
  label: Subscribe to Laser Power Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 4, "property": "illumination.sources.laser.power" } }
  params: []

- id: laser_minpower_get
  label: Get Laser Minimum Power (%)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 6, "property": "illumination.sources.laser.minpower" } }
  params: []

- id: laser_maxpower_get
  label: Get Laser Maximum Power (%)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": "illumination.sources.laser.maxpower" } }
  params: []

- id: clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "illumination.clo.engage" }
  params: []

- id: laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }
  params: []

# Image / picture settings
- id: brightness_get
  label: Get Image Brightness
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 7, "property": "image.brightness" } }
  params: []

- id: brightness_set
  label: Set Image Brightness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 9, "property": "image.brightness", "value": <float> } }
  params:
    - name: value
      type: float
      description: Range -1..1; 0 default, 1 = 100% offset; step 0.01

- id: brightness_subscribe
  label: Subscribe to Brightness Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 8, "property": "image.brightness" } }
  params: []

- id: contrast_set
  label: Set Image Contrast
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": <float> } }
  params:
    - name: value
      type: float
      description: Range 0..2; 1 default; step 0.01

- id: gamma_set
  label: Set Image Gamma
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": <float> } }
  params:
    - name: value
      type: float
      description: Range 1..3; default 2.2; step 0.1

- id: saturation_set
  label: Set Image Saturation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": <float> } }
  params:
    - name: value
      type: float
      description: Range 0..2; 1 default; step 0.01

- id: sharpness_set
  label: Set Image Sharpness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": <int> } }
  params:
    - name: value
      type: integer
      description: Range -2..8; step 1

- id: orientation_set
  label: Set Image Orientation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "<orientation>" } }
  params:
    - name: value
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

# Window geometry
- id: window_position_set
  label: Set Window Position
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": <int>, "y": <int> } } }
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: window_size_set
  label: Set Window Size
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": <int>, "height": <int> } } }
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: scaling_mode_set
  label: Set Window Scaling Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "<mode>" } }
  params:
    - name: value
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

# Warp
- id: warp_enable_set
  label: Enable/Disable All Warp Functions
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 10, "property": "image.processing.warp.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean

- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: |
    curl -X POST -F file=@<file> http://<projector-address>/api/image/processing/warp/file/transfer
  params:
    - name: file
      type: string
      description: Local path to the warp grid XML (MCM500/400-compatible format)
    - name: projector-address
      type: string
      description: Projector IP or hostname

- id: warp_file_select
  label: Select Active Warp File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 11, "property": "image.processing.warp.file.selected", "value": "<filename>" } }
  params:
    - name: filename
      type: string

- id: warp_file_enable_set
  label: Enable/Disable File Warp
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 12, "property": "image.processing.warp.file.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean

# Blend
- id: blend_mask_upload
  label: Upload Blend Mask
  kind: action
  command: |
    curl -X POST -F file=@<file> http://<projector-address>/api/image/processing/blend/file/transfer
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF, 8- or 16-bit grayscale; resolution must match blend layer
    - name: projector-address
      type: string
  notes: |
    Mask resolutions per projector native resolution:
    WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540.
    Colour images accepted but only the blue channel is used.

- id: blend_file_select
  label: Select Active Blend Files
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 13, "property": "image.processing.blend.file.selected", "value": ["<filename>"] } }
  params:
    - name: filename
      type: array
      description: Array of file name strings

- id: blend_file_enable_set
  label: Enable/Disable File Blend
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 14, "property": "image.processing.blend.file.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean

# Black level
- id: blacklevel_mask_upload
  label: Upload Black-Level Mask
  kind: action
  command: |
    curl -X POST -F file=@<file> http://<projector-address>/api/image/processing/blacklevel/file/transfer
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF, 8- or 16-bit grayscale; resolution must match black-level layer
    - name: projector-address
      type: string
  notes: |
    Mask resolutions per projector native resolution:
    WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540.
    Colour images accepted but only the blue channel is used.

- id: blacklevel_file_select
  label: Select Active Black-Level File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 15, "property": "image.processing.blacklevel.file.selected", "value": "<filename>" } }
  params:
    - name: filename
      type: string

- id: blacklevel_file_enable_set
  label: Enable/Disable Black-Level Correction
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "id": 16, "property": "image.processing.blacklevel.file.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean

# Network
- id: lan_ip4config_get
  label: Get LAN IPv4 Configuration
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" } }
  params: []

- id: lan_state_get
  label: Get LAN Connection State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" } }
  params: []

# Optics
- id: shutter_position_get
  label: Get Shutter Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" } }
  params: []

- id: shutter_target_set
  label: Set Shutter Target
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "<Open|Closed>" } }
  params:
    - name: value
      type: string
      description: "Open" or "Closed"

- id: zoom_position_get
  label: Get Zoom Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" } }
  params: []
  notes: "Lens must support motorized zoom; otherwise property is absent (verify via introspection)."

- id: focus_position_get
  label: Get Focus Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" } }
  params: []
  notes: "Lens must support motorized focus; otherwise property is absent."

- id: lensshift_h_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" } }
  params: []

- id: lensshift_v_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" } }
  params: []

# System state toggles
- id: standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean
  notes: "Confirm property is present via introspection before setting."

- id: eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": <bool> } }
  params:
    - name: value
      type: boolean
  notes: "Confirm property is present via introspection before setting."

# ECO wake via serial
- id: eco_wake_serial
  label: Wake From ECO Mode (RS-232)
  kind: action
  command: ":POWR1\r"
  transport: serial
  params: []
  notes: "Send these exact ASCII characters on the serial port. Alternative wake methods: Wake-on-LAN to projector's MAC, or the projector's power button (remote or keypad)."

# Environment
- id: get_environment_controlblocks
  label: Get Environment Sensor Readings
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": <n> }
  params:
    - name: type
      type: string
      description: "Sensor" | "Filter" | "Controller" | "Actuator" | "Alarm" | "GenericBlock"
    - name: valuetype
      type: string
      description: "Temperature" | "Speed" | "PWM" | "Voltage" | "Current" | "Power" | "Altitude" | "Pressure" | "Humidity" | "ADC" | "Coordinate" | "Peltier" | "Waveform" | "Average" | "Delay" | "Difference" | "Interpolation" | "Limit" | "Median" | "Noise" | "Weighting" | "Comparison" | "Threshold" | "Formula" | "Driver" | "PID" | "Mode" | "State" | "Pump" | "Resistance" | "Simulation" | "Constant" | "Manual" | "Range" | "Any"

- id: get_alarm_info
  label: Get Environment Alarm Info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getalarminfo" }
  params: []

- id: alarm_state_get
  label: Get Environment Alarm State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" } }
  params: []

# Firmware
- id: firmware_list_components
  label: List Firmware Component Names
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponents" }
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade at Next Reboot
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": { "component": "<name>" } }
  params:
    - name: component
      type: string
      description: Component name (from firmware.listcomponents)
  notes: "Component parameter schema inferred - source documents the method but does not list param keys explicitly."

# Color management (P7 / RGB)
- id: p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<name>" } }
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: Reset P7 Custom Preset to Default
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<name>" } }
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: Reset P7 Color to Native
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }
  params: []

- id: rgbmode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }
  params: []

# DMX
- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listchannels" }
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listmodes" }
  params: []

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "<mode>" } }
  params:
    - name: value
      type: string

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": <int> } }
  params:
    - name: value
      type: integer
      description: 1..512

- id: dmx_shutdown_set
  label: Enable/Disable DMX Shutdown
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": <bool> } }
  params:
    - name: value
      type: boolean

# Source / connector helpers
- id: list_source_connectors
  label: List Connectors for a Source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.<source_object_name>.listconnectors", "id": <n> }
  params:
    - name: source_object_name
      type: string
      description: Source name with non-word chars stripped and lowercased (e.g. "DisplayPort 1" -> "displayport1")
  notes: "Source object name must be derived from the source name; the method name is constructed per source."

- id: get_connector_signal
  label: Get Detected Signal on Connector
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": "image.connector.<connector_object_name>.detectedsignal" } }
  params:
    - name: connector_object_name
      type: string
      description: Lowercased connector name with non-word chars stripped (e.g. "DisplayPort 1" -> "displayport1", "l1hdmi" shown in source example)

# Subscribing to source/connector signal changes
- id: subscribe_connector_signal
  label: Subscribe to Connector Signal Changes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.connector.<connector_object_name>.detectedsignal" } }
  params:
    - name: connector_object_name
      type: string
      description: Lowercased connector name with non-word chars stripped
```

## Feedbacks
```yaml
- id: system_state
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

- id: illumination_state
  type: enum
  values:
    - "On"
    - "Off"

- id: image_window_main_source
  type: string
  description: Active source name (e.g. "DisplayPort 1", "HDMI", ...)

- id: illumination_sources_laser_power
  type: integer
  description: Current laser power in percent

- id: illumination_sources_laser_minpower
  type: integer
  description: Minimum laser power in percent (read-only; dynamic; depends on lens type/position)

- id: illumination_sources_laser_maxpower
  type: integer
  description: Maximum laser power in percent (read-only; dynamic; depends on lens type/position)

- id: image_brightness
  type: float
  range: [-1, 1]

- id: image_contrast
  type: float
  range: [0, 2]

- id: image_gamma
  type: float
  range: [1, 3]

- id: image_saturation
  type: float
  range: [0, 2]

- id: image_sharpness
  type: integer
  range: [-2, 8]

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_window_main_position
  type: object
  fields:
    x: integer
    y: integer

- id: image_window_main_size
  type: object
  fields:
    width: integer
    height: integer

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: optics_shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: optics_shutter_target
  type: enum
  values:
    - Open
    - Closed

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array
  items: string

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: network_device_lan_ip4config
  type: object
  fields:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string

- id: network_device_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: image_connector_detectedsignal
  type: object
  fields:
    active: boolean
    name: string
    vertical_total: integer
    horizontal_total: integer
    vertical_resolution: integer
    horizontal_resolution: integer
    vertical_sync_width: integer
    vertical_front_porch: integer
    vertical_back_porch: integer
    horizontal_sync_width: integer
    horizontal_front_porch: integer
    horizontal_back_porch: integer
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: integer
    scan: enum [Progressive]
    bits_per_component: integer
    color_space: enum
    signal_range: enum [0-255, 16-235]
    chroma_sampling: enum [4:4:4, 4:2:2, 4:2:0]
    gamma_type: enum [POWER, sRGB, REC_BT1886, SMPTE_ST2084]
    color_primaries: enum [REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]
    mastering_luminance: float
    content_aspect_ratio: enum [5:4, 4:3, 16:10, 16:9, 1.85:1, 2.20:1, 2.35:1, 2.37:1, 2.39:1, Unknown]
    is_stereo: boolean
    stereo_mode: enum [None, Sequential, FramePacked, TopBottom, SideBySide]
```

## Variables
```yaml
# JSON-RPC transport: id field in request/response
- id: request_id
  type: string_or_integer
  description: Client-chosen request identifier; mirrored in response (omitted in notifications)

# Notifications are sent without an id and require no response
```

## Events
```yaml
- id: property_changed
  description: |
    Server -> client notification when a subscribed property changes value.
    Client must implement `property.changed` listener.
    Example payload:
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }

- id: signal_callback
  description: |
    Server -> client notification when a subscribed signal is emitted.
    Client must implement `signal.callback` listener.
    Example payload:
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "modelupdated": { ...args } } ] } }

- id: modelupdated_signal
  description: |
    Emitted when the introspection object model changes (objects added or removed). Subscribe via signal.subscribe "modelupdated".

- id: introspect_objectchanged
  description: |
    Argument of modelupdated signal. Object: <object name>; isnew: <bool> (true = new, false = removed).
    Example payload:
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }
```

## Macros
```yaml
# Multi-step sequences described in source
- id: upload_and_activate_warp
  description: |
    1. HTTP POST the warp grid file:
       curl -X POST -F file=@<file> http://<projector>/api/image/processing/warp/file/transfer
    2. Set property "image.processing.warp.file.selected" to the uploaded filename.
    3. Set property "image.processing.warp.file.enable" to true.
    4. (Optionally) set property "image.processing.warp.enable" to true to globally enable warp.

- id: upload_and_activate_blend
  description: |
    1. HTTP POST the blend mask:
       curl -X POST -F file=@<mask> http://<projector>/api/image/processing/blend/file/transfer
    2. Set property "image.processing.blend.file.selected" to the uploaded filename.
    3. Set property "image.processing.blend.file.enable" to true.

- id: upload_and_activate_blacklevel
  description: |
    1. HTTP POST the black-level mask:
       curl -X POST -F file=@<mask> http://<projector>/api/image/processing/blacklevel/file/transfer
    2. Set property "image.processing.blacklevel.file.selected" to the uploaded filename.
    3. Set property "image.processing.blacklevel.file.enable" to true.

- id: wake_from_eco
  description: |
    Possible methods to wake a projector in ECO mode:
    1. Wake-on-LAN to projector's MAC address, OR
    2. Press the projector's power button (remote or keypad), OR
    3. Send the ASCII string ":POWR1\r" on the RS-232 serial port.

- id: power_on_safe
  description: |
    1. property.get "system.state".
    2. If value is "standby" or "ready", issue system.poweron.
       (No-op otherwise; the source explicitly recommends this guard.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements are documented in the source. The source recommends verifying
# system.state before poweron/poweroff and notes that nothing happens if the
# device is already in the target state, but these are operational guidelines,
# not formal safety interlocks.
```

## Notes
- Protocol is JSON-RPC 2.0. The same method set is exposed over both TCP port 9090 and RS-232. Parameters are passed by name; ordering within `params` does not matter.
- All `id` values in the request/response examples are client-chosen; the projector mirrors them in the response. Notifications omit the `id` and require no reply.
- `result: null` on `system.poweron` / `system.poweroff` is documented as a non-error (the method returns no result). Errors are returned via the JSON-RPC `error` member.
- Authentication: end-user access is allowed without a pass code. Elevated access levels require the `authenticate` method with a numeric `code`. The actual pass code is not documented in the source.
- `property.set` is synchronous but the source recommends awaiting the result before re-issuing the same property to avoid flooding the server.
- Source object names for `image.source.<name>.listconnectors` and connector property paths are derived by lowercasing the source/connector name and stripping non-word characters (e.g. "DisplayPort 1" -> "displayport1"; "L1HDMI" example -> "l1hdmi").
- Property availability depends on hardware/peripheral configuration (e.g. motorized lens, DMX mode, illumination source type). Use the `introspect` method to confirm presence before issuing a get/set/subscribe.
- The source notes that part of the API is dynamic and may not be complete for a given projector configuration; introspection is the canonical way to discover the actual API surface.
- File endpoints (warp, blend, blacklevel) accept only the formats listed (PNG up to 16-bit, JPEG, TIFF). For colour images, only the blue channel is used.
- HTTP file downloads are also supported at the same `/api/...` paths; e.g. `http://192.168.1.100/api/image/processing/warp/file/transfer/warpgrid.xml`.
- ECO mode wake on serial is an ASCII literal — the source spells the string as `:POWR1\r`.

<!-- UNRESOLVED: Pass code value, default DMX mode, default DMX start channel, exact list of available connectors per chassis variant, firmware version compatibility ranges, and any safety interlocks are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:53:45.394Z
last_checked_at: 2026-05-14T21:38:41.419Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:38:41.419Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions found in source with exact method names; transport parameters (port 9090, baud 19200, serial params) verbatim; spec covers the complete Pulse API. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-property minimum/firmware version constraints not stated; DMX, CLO, and P7 custom color features may not exist on every configuration — presence must be confirmed by introspection."
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "Pass code value, default DMX mode, default DMX start channel, exact list of available connectors per chassis variant, firmware version compatibility ranges, and any safety interlocks are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
