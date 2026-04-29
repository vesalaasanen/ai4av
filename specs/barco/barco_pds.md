---
schema_version: ai4av-public-spec-v1
device_id: barco/pds
entity_id: barco_pds
spec_id: admin/barco-pds
revision: 1
author: admin
title: "Barco PDS Control Spec"
status: published
manufacturer: Barco
manufacturer_key: barco
model_family: PDS
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - PDS
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
    checked_at: 2026-04-29T08:34:51.269Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.425Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.514Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:53.622Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.418Z
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-04-23T15:19:32.508Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:19:32.508Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions matched literal JSON-RPC method names in source; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Barco PDS Control Spec

## Summary
Barco PDS projector with dual-protocol control via RS-232 and TCP/IP (JSON-RPC 2.0). TCP service runs on port 9090. Serial uses 19200 baud, 8N1. Authentication is optional for normal end-user access; elevated privileges require a numeric pass code. Supports power control, source routing, image adjustment, lens control, warping/blending, and comprehensive monitoring via property/signal subscriptions.

<!-- UNRESOLVED: specific pass code value not disclosed in source -->

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
  type: optional  # normal end-user access requires no auth; elevated access uses pass code
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- queryable       # property.get, property.subscribe present
- routable        # image.window.main.source selection present
- levelable       # brightness, contrast, saturation, gamma, laser power, etc.
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
  label: Set Property
  kind: action
  params:
    - name: property
      type: string
      description: Object.property path (e.g. "image.window.main.source")
    - name: value
      type: any
      description: New value for the property

- id: property_get
  label: Get Property
  kind: query
  params:
    - name: property
      type: string
      description: Object.property path (single or array for bulk)

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Object.property path (single or array)

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Object.property path (single or array)

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated", "image.processing.warp.gridchanged")

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name

- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Numeric pass code for elevated access level

- id: introspect
  label: Introspect Object
  kind: query
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation)
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

- id: select_source
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI")

- id: system_gotoeco
  label: Set ECO Mode
  kind: action
  params: []

- id: system_gotoready
  label: Set Ready State
  kind: action
  params: []

- id: system_reboot
  label: Reboot Projector
  kind: action
  params: []

- id: system_reset
  label: Reset Domains
  kind: action
  params:
    - name: domains
      type: array
      description: List of domains to reset (e.g. ["ImageWarp", "ImageBlend"])

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values:
    - "boot"
    - "eco"
    - "standby"
    - "ready"
    - "conditioning"
    - "on"
    - "deconditioning"
    - "error"
  description: Current projector operating state

- id: property_changed
  type: notification
  description: |
    Property change notification sent via property.changed method.
    Payload: array of {propertyPath: value} pairs.

- id: signal_callback
  type: notification
  description: |
    Signal callback notification sent via signal.callback method.
    Payload: array of {signalName: arguments} pairs.

- id: modelupdated
  type: signal
  description: |
    Fired when objects appear or disappear.
    Payload: {object: string, newobject: bool, accesslevel: enum}
```

## Variables
```yaml
# Image Properties
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  description: Image brightness/offset (normalized)

- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  description: Image contrast/gain (normalized)

- id: image_saturation
  type: float
  range: [0, 2]
  default: 1
  description: Image color saturation (normalized)

- id: image_gamma
  type: float
  range: [1, 3]
  default: 2.2
  description: Image gamma

- id: image_sharpness
  type: integer
  range: [-2, 8]
  description: Image sharpness

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

# Illumination
- id: illumination_state
  type: enum
  values: ["On", "Off"]

- id: illumination_sources_laser_power
  type: float
  range: [0, 100]
  description: Laser power in percent

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent (read-only)

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent (read-only)

# Source/Window
- id: image_window_main_source
  type: string
  description: Currently active source name

- id: image_window_main_position
  type: object
  description: Window position {x, y}

- id: image_window_main_size
  type: object
  description: Window size {width, height}

- id: image_window_main_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

# Signal Detection
- id: image_connector_detectedsignal
  type: object
  description: |
    Detected signal info: {active, name, horizontal_resolution, vertical_resolution,
    horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component,
    color_space, signal_range, chroma_sampling, gamma_type, color_primaries,
    content_aspect_ratio, is_stereo, stereo_mode}

# Warp/Blend
- id: image_processing_warp_enable
  type: boolean
  description: Global warp enable/disable

- id: image_processing_warp_file_enable
  type: boolean
  description: File-based warp enable/disable

- id: image_processing_warp_file_selected
  type: string
  description: Active warp file name

- id: image_processing_blend_file_enable
  type: boolean
  description: File-based blend enable/disable

- id: image_processing_blend_file_selected
  type: array
  description: List of selected blend files

- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Black level correction enable/disable

# Optics
- id: optics_zoom_position
  type: integer
  description: Current zoom position

- id: optics_focus_position
  type: integer
  description: Current focus position

- id: optics_lensshift_horizontal_position
  type: integer
  description: Current horizontal lens shift position

- id: optics_lensshift_vertical_position
  type: integer
  description: Current vertical lens shift position

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]

# Network
- id: network_device_lan_ip4config
  type: object
  description: IPv4 configuration {Address, Mask, Gateway, NameServers}

- id: network_device_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]

- id: network_hostname
  type: string

# System
- id: system_modelname
  type: string

- id: system_firmwareversion
  type: string

- id: system_serialnumber
  type: string

- id: system_articlenumber
  type: string

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]

- id: statistics_laserruntime_value
  type: integer
  description: Laser runtime counter

- id: statistics_projectorruntime_value
  type: integer
  description: Projector runtime counter

- id: notification_count
  type: integer
  description: Number of notifications received and dismissed
```

## Events
```yaml
# Unsolicited notifications the device sends (client must implement handlers):

- id: property_changed
  method: property.changed
  description: Property value changed notification
  params:
    - name: property
      type: array
      description: Array of {objectPath: newValue} pairs

- id: signal_callback
  method: signal.callback
  description: Signal callback notification
  params:
    - name: signal
      type: array
      description: Array of {signalName: arguments} pairs

- id: modelupdated
  method: signal.modelupdated
  description: Object tree changed
  params:
    - name: object
      type: string
    - name: newobject
      type: boolean
    - name: accesslevel
      type: enum

- id: notification_emitted
  method: notification.emitted
  description: New notification
  params:
    - name: notification
      type: object
      description: {severity, id, code, timestamp, message, timeout, actions}

- id: notification_dismissed
  method: notification.dismissed
  description: Notification was dismissed
  params:
    - name: id
      type: string
    - name: response
      type: enum

- id: image_processing_warpgrid_gridchanged
  method: image.processing.warpgrid.gridchanged
  description: Warp grid changed
  params:
    - name: grid
      type: array
      description: Array of {x, y} points

- id: system_license_licensechanged
  method: system.license.licensechanged
  description: License changed

- id: system_performed
  method: system.performed
  description: Domain reset completed
  params:
    - name: domains
      type: array
      description: List of domains that completed reset

- id: ui_settings_added
  method: ui.settings.added
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_changed
  method: ui.settings.changed
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_removed
  method: ui.settings.removed
  params:
    - name: key
      type: string
```

## Macros
```yaml
# ECO Wake-Up Procedure (from source):
# 1. Send wake-on-LAN with projector MAC address, OR
# 2. Use power button on remote/keypad, OR
# 3. Send ":POWR1\r" on RS-232 serial port

# Source Switching Flow (from source):
# 1. Call image.source.list to get available sources
# 2. Translate source name to object name: remove non-word chars, lowercase
#    (e.g. "DisplayPort 1" -> "displayport1")
# 3. Call property.set with property="image.window.main.source" and value=<sourceName>
# 4. Wait for property.changed notification confirming the change

# File Upload Pattern (HTTP POST via curl):
# curl -F file=@<filename> http://<ip>/api/<endpoint>/transfer
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Verify projector state is standby/ready before issuing power on"
    reference: "Source states: 'If the projector already is on, or if it's in transition between states, nothing will happen.'"
  - description: "Verify projector state is on before issuing power off"
    reference: "Source states: 'If the projector already is off, or if it's in transition between states, nothing will happen.'"
  - description: "Wait for property.set confirmation before setting the same property again"
    reference: "Source states: 'It is best practice to wait for the confirmation of the property.set before setting the same property again.'"
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source beyond state-transition notes above
```

## Notes
**Protocol**: JSON-RPC 2.0 over TCP (port 9090) or serial. All commands are JSON objects with `jsonrpc: "2.0"`, `method`, optional `params`, and optional `id`. Responses include `result` or `error` with matching `id`. Notifications have no `id` and require no response.

**Authentication**: Normal end-user access requires no authentication. Higher access levels require `authenticate` with a numeric pass code. The source does not disclose the pass code value.

**Available Sources** (example, varies by model): DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI

**File Transfer**: Uses HTTP POST to `/api/<service>/file/transfer` endpoints. Firmware, EDID, warp, blend, black level, and test pattern files can be uploaded/downloaded.

**ECO Mode**: Projectors in ECO mode require wake-on-LAN, physical power button, or serial `:POWR1\r` command to wake.

**Serial Cable**: 9-pin female to host, 9-pin male to projector. Pin 2-to-2, Pin 3-to-3, Pin 5-to-5 (null modem).

<!-- UNRESOLVED: authentication pass code value not disclosed -->
<!-- UNRESOLVED: specific model variants or firmware compatibility not stated -->
<!-- UNRESOLVED: DMX/RDM protocol details not covered in this companion document -->

## Provenance

```yaml
source_urls:
  - "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
source_documents:
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.269Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.425Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:51.514Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:53.622Z
  - title: "Barco public source"
    url: "https://audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.418Z
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-04-23T15:19:32.508Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:19:32.508Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions matched literal JSON-RPC method names in source; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```
