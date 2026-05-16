---
spec_id: admin/barco-dp2k-10sx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco DP2K 10sX Control Spec"
manufacturer: Barco
model_family: "DP2K 10sX"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "DP2K 10sX"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:35:59.224Z
generated_at: 2026-05-14T21:35:59.224Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - environment.getalarminfo
  - illumination.laser.getserialnumber
  - image.color.p7.custom.copypresettocustom
  - image.color.p7.custom.resetpreset
  - image.color.p7.custom.resettonative
  - image.color.rgbmode.nextrgbmode
verification:
  verdict: verified
  checked_at: 2026-05-14T21:35:59.224Z
  matched_actions: 43
  action_count: 48
  confidence: high
  summary: "All 43 spec actions matched documented methods/properties; transport parameters fully verified verbatim; spec covers canonical API surface."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco DP2K 10sX Control Spec

## Summary
Barco DP2K 10sX laser projector with JSON-RPC 2.0 API over TCP (port 9090) and RS-232 serial. Supports power on/off, source routing, illumination control, picture settings, warp/blend/blacklevel file upload, environment monitoring, and signal change notifications. Authentication optional for normal user access; higher access levels require pass code.

<!-- UNRESOLVED: full property set depends on installed peripherals and lens options; introspection recommended -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # TCP port stated in source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # source describes optional auth; normal user access skips auth
```

## Traits
```yaml
# inferred from documented commands:
# - powerable: system.poweron / system.poweroff
# - queryable: property.get calls returning state values
# - routable: image.window.main.source set/get, source/connector listing
# - levelable: brightness, contrast, saturation, sharpness, gamma, illumination power
```

## Actions
```yaml
# Power
- id: system_poweron
  label: Power On
  kind: action
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  params: []

# Source routing
- id: property_set
  label: Set Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Object.property name (dot notation)
    - name: value
      type: string
      description: New value for the property
- id: property_get
  label: Get Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Object.property name to read
- id: image_source_list
  label: List Available Sources
  kind: action
  params: []
- id: image_connector_list
  label: List Available Connectors
  kind: action
  params: []

# Subscription management
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Property name to observe
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Property name to stop observing
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name to subscribe to
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name to unsubscribe from

# Introspection
- id: introspect
  label: Introspect Object
  kind: action
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation)
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

# Authentication
- id: authenticate
  label: Authenticate Session
  kind: action
  params:
    - name: code
      type: integer
      description: Pass code for elevated access level

# Environment
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

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: action
  params: []
- id: illumination_sources_laser_power_get
  label: Get Laser Power Level
  kind: action
  params: []
- id: illumination_sources_laser_power_set
  label: Set Laser Power Level
  kind: action
  params:
    - name: value
      type: integer
      description: Power level in percent
- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  params: []

# Picture settings
- id: image_brightness_get
  label: Get Brightness
  kind: action
  params: []
- id: image_brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: float
      description: Brightness value (-1 to 1, normalized; 0 = default)
- id: image_contrast_get
  label: Get Contrast
  kind: action
  params: []
- id: image_contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: float
      description: Contrast value (0 to 2, normalized; 1 = default)
- id: image_saturation_get
  label: Get Saturation
  kind: action
  params: []
- id: image_saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: float
      description: Saturation value (0 to 2, normalized; 1 = default)
- id: image_sharpness_get
  label: Get Sharpness
  kind: action
  params: []
- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness value (-2 to 8)
- id: image_gamma_get
  label: Get Gamma
  kind: action
  params: []
- id: image_gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: float
      description: Gamma value (1 to 3; default 2.2)

# Warp/blend/blacklevel file operations
- id: image_processing_warp_enable_set
  label: Enable/Disable Warp
  kind: action
  params:
    - name: value
      type: boolean
      description: true to enable warp
- id: image_processing_warp_file_enable_set
  label: Enable/Disable File Warp
  kind: action
  params:
    - name: value
      type: boolean
- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  params:
    - name: value
      type: string
      description: Filename of warp grid XML
- id: image_processing_blend_file_enable_set
  label: Enable/Disable File Blend
  kind: action
  params:
    - name: value
      type: boolean
- id: image_processing_blend_file_selected_set
  label: Select Blend File
  kind: action
  params:
    - name: value
      type: string
- id: image_processing_blacklevel_file_enable_set
  label: Enable/Disable Black Level Correction
  kind: action
  params:
    - name: value
      type: boolean
- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  params:
    - name: value
      type: string

# Optics
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  params:
    - name: value
      type: string
      description: "Open" or "Closed"
- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: action
  params: []
- id: optics_focus_position_get
  label: Get Focus Position
  kind: action
  params: []
- id: optics_lensshift_horizontal_position_get
  label: Get Lens Shift Horizontal Position
  kind: action
  params: []
- id: optics_lensshift_vertical_position_get
  label: Get Lens Shift Vertical Position
  kind: action
  params: []

# ECO mode
- id: system_eco_enable_set
  label: Enable/Disable ECO Mode
  kind: action
  params:
    - name: value
      type: boolean
- id: system_standby_enable_set
  label: Enable/Disable Standby Mode
  kind: action
  params:
    - name: value
      type: boolean

# DMX
- id: dmx_listmodes
  label: List DMX Modes
  kind: action
  params: []
- id: dmx_listchannels
  label: List DMX Channels
  kind: action
  params:
    - name: mode
      type: string
      description: DMX mode name
- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  params:
    - name: value
      type: integer
      description: Start channel (1-512)
- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  params:
    - name: value
      type: boolean

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: action
  params: []
- id: firmware_listcomponentversionstatus
  label: List Component Version Status
  kind: action
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  params:
    - name: component
      type: string
      description: Component name
```

## Feedbacks
```yaml
# Property change notifications (unsolicited)
- id: property_changed
  type: notification
  description: Fired when any subscribed property value changes. Payload contains array of {property: value} pairs.
- id: signal_callback
  type: notification
  description: Fired when a subscribed signal is emitted. Payload contains array of {signal: args} pairs.

# Queryable state enums
- id: system_state
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - service
    - error
  description: Projector operational state

- id: illumination_state
  type: enum
  values:
    - "On"
    - "Off"

- id: optics_shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: network_device_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch
```

## Variables
```yaml
# Illuminations power - laser
- id: illumination_sources_laser_power
  type: float
  access: READ_WRITE
  description: Target laser power in percent
  range: [0, 100]
- id: illumination_sources_laser_minpower
  type: float
  access: READ_ONLY
  description: Minimum power in percent (dynamic, varies with lens)
- id: illumination_sources_laser_maxpower
  type: float
  access: READ_ONLY
  description: Maximum power in percent (dynamic, varies with lens)

# Picture
- id: image_brightness
  type: float
  access: READ_WRITE
  description: Image brightness (-1 to 1; 0 = default)
- id: image_contrast
  type: float
  access: READ_WRITE
  description: Image contrast (0 to 2; 1 = default)
- id: image_saturation
  type: float
  access: READ_WRITE
  description: Image saturation (0 to 2; 1 = default)
- id: image_sharpness
  type: integer
  access: READ_WRITE
  description: Image sharpness (-2 to 8)
- id: image_gamma
  type: float
  access: READ_WRITE
  description: Image gamma (1 to 3; default 2.2)

# Source
- id: image_window_main_source
  type: string
  access: READ_WRITE
  description: Active source name for main window (e.g. "DisplayPort 1", "HDMI")

# Window geometry
- id: image_window_main_position
  type: object
  access: READ_WRITE
  description: Window position {x: int, y: int}
- id: image_window_main_size
  type: object
  access: READ_WRITE
  description: Window size {width: int, height: int}

# Network
- id: network_device_lan_ip4config
  type: object
  access: READ_ONLY
  description: IP v4 config {address, mask, gateway, nameservers}

# Optics positions
- id: optics_zoom_position
  type: integer
  access: READ_ONLY
  description: Current zoom position
- id: optics_focus_position
  type: integer
  access: READ_ONLY
  description: Current focus position
- id: optics_lensshift_horizontal_position
  type: integer
  access: READ_ONLY
  description: Current horizontal lens shift
- id: optics_lensshift_vertical_position
  type: integer
  access: READ_ONLY
  description: Current vertical lens shift

# DMX
- id: dmx_mode
  type: string
  access: READ_WRITE
  description: Current DMX mode
- id: dmx_startchannel
  type: integer
  access: READ_WRITE
  description: DMX start channel [1-512]
- id: dmx_shutdown
  type: boolean
  access: READ_WRITE
  description: DMX shutdown enabled/disabled

# System
- id: system_standby_enable
  type: boolean
  access: READ_WRITE
  description: Standby state enable/disable
- id: system_eco_enable
  type: boolean
  access: READ_WRITE
  description: ECO mode enable/disable

# Signal detection (per connector)
- id: image_connector_detectedsignal
  type: object
  access: READ_ONLY
  description: >
    Detected signal info per connector. Properties: active (bool), name (string),
    resolutions, sync timing, pixel_rate, scan, bits_per_component, color_space,
    signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance,
    content_aspect_ratio, is_stereo, stereo_mode

# File warp/blend/blacklevel
- id: image_processing_warp_enable
  type: boolean
  access: READ_WRITE
  description: Global warp enable
- id: image_processing_warp_file_enable
  type: boolean
  access: READ_WRITE
  description: File warp enable
- id: image_processing_warp_file_selected
  type: string
  access: READ_WRITE
  description: Selected warp file name
- id: image_processing_blend_file_enable
  type: boolean
  access: READ_WRITE
  description: File blend enable
- id: image_processing_blend_file_selected
  type: string
  access: READ_WRITE
  description: Selected blend file name
- id: image_processing_blacklevel_file_enable
  type: boolean
  access: READ_WRITE
  description: Black level correction enable
- id: image_processing_blacklevel_file_selected
  type: string
  access: READ_WRITE
  description: Selected black level file name
```

## Events
```yaml
# modelupdated - triggered when object structure changes (objects added/removed)
- id: modelupdated
  description: Fired when the object tree changes (new objects added or removed)

# property.changed - see Feedbacks section above
# signal.callback - see Feedbacks section above
```

## Macros
```yaml
# Source switching (documented as common task)
# 1. Call image_source_list to get available sources
# 2. Translate source name: remove non-word chars, lowercase (e.g. "DisplayPort 1" → "displayport1")
# 3. Call property.set with property="image.window.main.source" and value=<source-name>

# Signal monitoring (documented as common task)
# 1. Call image_source_list
# 2. Translate each source name to object name
# 3. For each source, call image.source.<name>.listconnectors
# 4. For each connector, subscribe to image.connector.<name>.detectedsignal
# 5. Implement property.changed listener to receive notifications

# ECO wakeup sequence (documented)
# 1. Send WoL packet with projector MAC address, OR
# 2. Use remote control power button, OR
# 3. On RS-232: send ASCII ":POWR1\r"

# Warp file upload workflow (documented)
# 1. HTTP POST warp XML to /api/image/processing/warp/file/transfer
# 2. property.set image.processing.warp.file.selected = "warp.xml"
# 3. property.set image.processing.warp.file.enable = true

# Black level mask upload workflow (documented)
# 1. HTTP POST grayscale PNG to /api/image/processing/blacklevel/file/transfer
# 2. property.set image.processing.blacklevel.file.selected = "blacklevel.png"
# 3. property.set image.processing.blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures in source
# ECO mode wakeup note: sending power on to already-on projector or transitioning projector is no-op (doc states "nothing will happen")
# Best practice: verify state before power on/off (check system.state is standby/ready before poweron, on before poweroff)
```

## Notes
JSON-RPC 2.0 over TCP port 9090 or RS-232 19200 8N1. Authentication optional; normal user access works without auth. Higher access levels require pass code in authenticate request. All API calls are JSON-RPC 2.0 with named parameters.

Best practice for property.set: wait for confirmation before setting same property again — flooding server without waiting may reduce performance.

API is dynamic — available objects/methods/properties vary by projector configuration (e.g., motorized lens options, DMX mode). Introspection API recommended to discover exact available surface.

Available sources and connectors vary by model. Source name translation rule: remove non-word chars + lowercase (JavaScript: `sourceName.replace(/\W/g, '').toLowerCase()`).

File upload uses HTTP POST to `/api/<path>/file/transfer`. Download uses HTTP GET on same endpoint. Warp, blend, and blacklevel mask files supported (PNG/JPEG/TIFF grayscale, 8-bit or 16-bit).

Supported mask resolutions: WUXGA 1920×1200, WQXGA 1280×800, 4K 1280×800, 4K Cinemascope 1280×540.

<!-- UNRESOLVED: full peripheral-driven property set (motorized lens, DMX extended channels, etc.) — requires introspection at runtime -->
<!-- UNRESOLVED: firmware version compatibility — not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences — not documented in source -->
<!-- UNRESOLVED: voltage/current/power specifications — not stated in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:35:59.224Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:35:59.224Z
matched_actions: 43
action_count: 48
confidence: high
summary: "All 43 spec actions matched documented methods/properties; transport parameters fully verified verbatim; spec covers canonical API surface."
```

## Known Gaps

```yaml
- environment.getalarminfo
- illumination.laser.getserialnumber
- image.color.p7.custom.copypresettocustom
- image.color.p7.custom.resetpreset
- image.color.p7.custom.resettonative
- image.color.rgbmode.nextrgbmode
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
