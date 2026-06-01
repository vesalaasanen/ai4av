---
spec_id: admin/barco-s34kjr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco S34KJr Control Spec"
manufacturer: Barco
model_family: S34KJr
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - S34KJr
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T06:04:25.021Z
generated_at: 2026-05-20T06:04:25.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - illumination.clo.engage
  - image.color.p7.custom.resettonative
verification:
  verdict: verified
  checked_at: 2026-05-20T06:04:25.021Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions match source commands with correct transport parameters."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco S34KJr Control Spec

## Summary
Barco Pulse projector platform supporting both TCP/IP (port 9090) and RS-232 serial control via JSON-RPC 2.0. Supports power control, input source routing, image adjustment, warping/blending workflows, illumination management, and environment monitoring via property/signal APIs.

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
  type: null  # UNRESOLVED: auth required for elevated access; pass code not stated in source
```

## Traits
```yaml
- powerable
- routable
- queryable
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
  label: Set Property Value
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. "image.window.main.source")
    - name: value
      type: string
      description: New value for the property

- id: property_get
  label: Get Property Value
  kind: query
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property name to observe

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  params:
    - name: property
      type: string

- id: image_source_list
  label: List Available Sources
  kind: query
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  params: []

- id: illumination_sources_laser_power_set
  label: Set Laser Power
  kind: action
  params:
    - name: value
      type: float
      description: Power level in percent

- id: image_brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: float
      description: Normalized value (-1 to 1)

- id: image_contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: float
      description: Normalized value (0 to 2)

- id: image_gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: float
      description: Gamma value (1 to 3)

- id: image_saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: float
      description: Normalized value (0 to 2)

- id: image_processing_warp_enable
  label: Enable Warp
  kind: action
  params:
    - name: value
      type: boolean

- id: image_processing_blend_file_enable
  label: Enable Blend Mask
  kind: action
  params:
    - name: value
      type: boolean

- id: image_processing_blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  params:
    - name: value
      type: boolean

- id: optics_shutter_target
  label: Set Shutter Target
  kind: action
  params:
    - name: value
      type: enum
      values:
        - Open
        - Closed

- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: query
  params:
    - name: type
      type: string
      description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, Voltage, Current, Power, etc.)

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

- id: introspect
  label: Introspection API
  kind: query
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation)
    - name: recursive
      type: boolean
      description: Recursive introspection
- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access

- id: ledctrl_blink
  label: Blink LED
  kind: action
  params:
    - name: led
      type: string
      description: LED name (e.g. systemstatus)
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period in ms

- id: image_source_displayport1_listconnectors
  label: List Connectors for DisplayPort 1 Source
  kind: query
  params:
    - name: source_object
      type: string
      description: Source object name derived from source name (e.g. displayport1)

- id: image_connector_displayport1_detectedsignal
  label: Get Detected Signal for DisplayPort 1 Connector
  kind: query
  params:
    - name: property
      type: string
      description: Property path e.g. image.connector.displayport1.detectedsignal

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Firmware Upgrade
  kind: action
  params:
    - name: component
      type: string
      description: Component name to schedule upgrade for

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  params:
    - name: presetname
      type: string

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  params: []

- id: system_standby_enable
  label: Enable Standby Mode
  kind: action
  params:
    - name: value
      type: boolean
      description: Enable or disable standby state

- id: system_eco_enable
  label: Enable ECO Mode
  kind: action
  params:
    - name: value
      type: boolean
      description: Enable or disable ECO state
```

## Feedbacks
```yaml
- id: property_changed
  type: notification
  params:
    - name: property
      type: array
      description: Array of property/value pairs

- id: signal_callback
  type: notification
  params:
    - name: signal
      type: array
      description: Array of signal/argument-list pairs

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
    - error

- id: illumination_state
  type: enum
  values:
    - On
    - Off

- id: image_window_main_source
  type: string
  description: Currently active source name

- id: image_connector_detectedsignal
  type: object
  properties:
    - active: boolean
    - name: string
    - horizontal_resolution: int
    - vertical_resolution: int
    - horizontal_frequency: float
    - vertical_frequency: float
    - pixel_rate: int
    - scan: enum
    - bits_per_component: int
    - color_space: enum
    - signal_range: enum
    - chroma_sampling: enum
    - gamma_type: enum

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
```

## Variables
```yaml
# UNRESOLVED: dynamic properties discovered via introspection; source documents a subset only

- id: image_brightness
  type: float
  range:
    min: -1
    max: 1
  default: 0

- id: image_contrast
  type: float
  range:
    min: 0
    max: 2
  default: 1

- id: image_gamma
  type: float
  range:
    min: 1
    max: 3
  default: 2.2

- id: image_saturation
  type: float
  range:
    min: 0
    max: 2
  default: 1

- id: image_sharpness
  type: int
  range:
    min: -2
    max: 8

- id: illumination_sources_laser_power
  type: float
  description: Current laser power level in percent

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent

- id: optics_shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: optics_zoom_position
  type: int

- id: optics_focus_position
  type: int

- id: optics_lensshift_horizontal_position
  type: int

- id: optics_lensshift_vertical_position
  type: int

- id: image_window_main_position
  type: object
  properties:
    x: int
    y: int

- id: image_window_main_size
  type: object
  properties:
    width: int
    height: int

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: network_device_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED
```

## Events
```yaml
# UNRESOLVED: events are signal-based notifications; full event catalog requires device introspection

- id: modelupdated
  description: Triggered when object structure changes (objects added/removed)

- id: property_changed
  description: Triggered when a property value changes

- id: signal_callback
  description: Generic signal callback for subscribed signals
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not documented; workflows composed via API calls

- id: wake_from_eco
  description: |
    ECO mode wake procedure (documented in source):
    1. Send wake-on-LAN with projector MAC address, OR
    2. Use power button on remote control, OR
    3. Use power button on keypad, OR
    4. Send ASCII ":POWR1\r" on RS-232 serial port
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety-critical interlock procedures not explicitly documented in source
```

## Notes
Serial connector pinout: 9-pin female to host, 9-pin male to projector. Pin 2-to-2, pin 3-to-3, pin 5-to-5 straight-through.

File upload/download via HTTP to `http://<address>/api/<endpoint>`. Warp, blend, and black level mask files uploaded via curl HTTP POST.

Property set best practice: wait for confirmation before setting the same property again to avoid flooding the server.

Introspection API provides full object/method/property/signal metadata; the documented properties are a subset — exact API varies by projector configuration (e.g., lens type, installed options).

The pass code for authentication is not stated in the source; elevated access protocols are documented but credentials are not provided.

Source signal updates require subscribing to both window source property and individual connector detectedsignal properties.

<!-- UNRESOLVED: authentication pass code not stated in source -->
<!-- UNRESOLVED: DMX channel count and configuration not fully documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: complete property list requires device introspection; source documents a representative subset -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T06:04:25.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T06:04:25.021Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions match source commands with correct transport parameters."
```

## Known Gaps

```yaml
- illumination.clo.engage
- image.color.p7.custom.resettonative
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
