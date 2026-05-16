---
spec_id: admin/barco-galaxy-4k-23-hfr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Galaxy 4K 23 HFR Control Spec"
manufacturer: Barco
model_family: "Galaxy 4K 23 HFR"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Galaxy 4K 23 HFR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:37:20.677Z
generated_at: 2026-05-14T21:37:20.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:37:20.677Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched verbatim in source; all transport parameters verified; Methods section fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco Galaxy 4K 23 HFR Control Spec

## Summary
Pulse API-based projector supporting both RS-232 serial and TCP/IP network control on port 9090. JSON-RPC 2.0 protocol. Supports power control, input/source routing, image adjustment, warping, blending, and environmental monitoring. Authentication optional for basic access; higher access levels require pass code authentication.

<!-- UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source -->

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
  type: passcode  # stated: authentication request required for higher access levels
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
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
      description: Property name in dot notation (e.g. "image.window.main.source")
    - name: value
      type: string
      description: Property value to set

- id: property_get
  label: Get Property
  kind: action
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  params:
    - name: property
      type: string
      description: Property name or array of property names to subscribe to

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  params:
    - name: property
      type: string
      description: Property name or array of property names to unsubscribe from

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: image_source_list
  label: List Available Sources
  kind: action
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: action
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: action
  params:
    - name: type
      type: string
      description: Sensor type (e.g. "Sensor")
    - name: valuetype
      type: string
      description: Value type (e.g. "Temperature", "Speed")

- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Pass code for authentication

- id: introspect
  label: Introspection
  kind: action
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation)
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

- id: dmx_listchannels
  label: List DMX Channels
  kind: action
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: action
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: action
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: action
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: action
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  params:
    - name: component
      type: string
    - name: version
      type: string
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
    - deconditioning
    - service
    - error
  description: Projector operational state

- id: illumination_state
  type: enum
  values:
    - "On"
    - "Off"

- id: image_window_main_source
  type: string
  description: Currently active source name (e.g. "DisplayPort 1", "HDMI")

- id: image_brightness
  type: float
  description: Normalized brightness (-1 to 1, default 0)

- id: image_contrast
  type: float
  description: Normalized contrast (0 to 2, default 1)

- id: image_gamma
  type: float
  description: Gamma value (1 to 3, default 2.2)

- id: image_saturation
  type: float
  description: Color saturation (0 to 2, default 1)

- id: image_sharpness
  type: integer
  description: Sharpness value (-2 to 8)

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: illumination_sources_laser_power
  type: float
  description: Laser power level in percent

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent

- id: image_processing_warp_enable
  type: boolean
  description: Global warp enable/disable

- id: image_processing_warp_file_enable
  type: boolean
  description: File-based warp enable/disable

- id: image_processing_warp_file_selected
  type: string
  description: Selected warp grid file name

- id: image_processing_blend_file_enable
  type: boolean
  description: Blend mask enable/disable

- id: image_processing_blend_file_selected
  type: string
  description: Selected blend mask file name

- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Black level correction enable/disable

- id: image_processing_blacklevel_file_selected
  type: string
  description: Selected black level mask file name

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

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: image_connector_detectedsignal
  type: object
  description: Signal info object with fields: active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode
```

## Variables
```yaml
- id: image_window_main_position
  type: object
  properties:
    x: integer
    y: integer

- id: image_window_main_size
  type: object
  properties:
    width: integer
    height: integer

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: network_device_lan_ip4config
  type: object
  properties:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
```

## Events
```yaml
- id: property_changed
  type: notification
  description: Fired when a property value changes. Payload contains array of property/value pairs.

- id: signal_callback
  type: notification
  description: Fired when a subscribed signal is emitted. Payload contains array of signal/argument-list pairs.

- id: modelupdated
  type: signal
  description: Fired when object structure changes (objects added or removed).
```

## Macros
```yaml
- id: eco_wakeup_serial
  label: ECO Mode Wakeup via Serial
  description: Send ASCII command ":POWR1\r" on RS-232 serial port to wake projector from ECO mode
  steps:
    - action: send_serial_command
      command: ":POWR1\r"
      protocol: serial
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements
# stated in source. ECO wakeup procedure documented but no safety-critical sequencing found.
```

## Notes
The Pulse API uses JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial. Authentication is optional for normal end-user access; higher access levels require pass code authentication via `authenticate` method. Property set operations should wait for confirmation before setting the same property again to avoid flooding the server. The API is partially dynamic — some objects/methods depend on installed peripherals (e.g., lens type) and are only discoverable via introspection. Projector state transitions (power on/off) are idempotent; it is good practice to verify current state before issuing commands. ECO mode wakeup requires either WoL, remote/keypad, or the `:POWR1\r` serial command. File upload/download uses HTTP on the projector base URL via `/api/<endpoint>` paths.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: specific error codes and fault recovery sequences not detailed in source -->
<!-- UNRESOLVED: protocol version number not explicitly stated in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-14T21:37:20.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:37:20.677Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched verbatim in source; all transport parameters verified; Methods section fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
