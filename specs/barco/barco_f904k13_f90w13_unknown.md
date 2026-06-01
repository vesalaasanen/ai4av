---
spec_id: admin/barco-f904k13-f90w13
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F904K13 F90W13 Control Spec"
manufacturer: Barco
model_family: "F904K13 F90W13"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "F904K13 F90W13"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:31:54.925Z
generated_at: 2026-05-20T05:31:54.925Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:31:54.925Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched source JSON-RPC methods; transport (TCP 9090, serial 19200/8/N/1) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco F904K13 F90W13 Control Spec

## Summary
Barco Pulse projector controllable via TCP/IP (port 9090) or RS232 serial. JSON-RPC 2.0 API. Supports power on/off, source selection, image adjustment (brightness, contrast, saturation, gamma, sharpness), warp/blend/blacklevel file upload, environment monitoring, and signal subscription. Authentication optional — normal user access requires no login.

<!-- UNRESOLVED: complete method list not enumerated; introspection recommended for full per-device API -->

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
  type: none  # inferred: normal user access requires no auth; higher access uses optional auth request
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
      description: Dot-notation property path (e.g. "image.window.main.source")
    - name: value
      type: string
      description: Property value to set

- id: property_get
  label: Get Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path to subscribe to

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property path to unsubscribe from

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

- id: image_source_list
  label: List Available Sources
  kind: action
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: action
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: action
  params:
    - name: type
      type: string
      description: Sensor type (e.g. "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock")
    - name: valuetype
      type: string
      description: Sensor value type (e.g. "Temperature", "Speed", "Voltage", "Current", "Power")

- id: dmx_listchannels
  label: List DMX Channels
  kind: action
  params: []

- id: dmx_listmodes
  label: List DMX Modes
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

- id: introspect
  label: Introspect Object
  kind: action
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation, optional)
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: action
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  params:
    - name: component
      type: string
      description: Name of firmware component to schedule for upgrade at next reboot

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: action
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset To Custom
  kind: action
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy to custom

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to default values

- id: image_color_p7_custom_resettonative
  label: Reset To Native
  kind: action
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  params: []

- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  description: Current projector state
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

- id: illumination_state
  type: enum
  description: Light source state
  values:
    - "On"
    - "Off"

- id: image_brightness
  type: float
  description: Image brightness (-1 to 1, normalized; 0 is default)

- id: image_contrast
  type: float
  description: Image contrast (0 to 2, normalized; 1 is default)

- id: image_saturation
  type: float
  description: Image saturation (0 to 2, normalized; 1 is default)

- id: image_gamma
  type: float
  description: Image gamma (1 to 3; default 2.2)

- id: image_sharpness
  type: int
  description: Image sharpness (-2 to 8)

- id: image_window_main_source
  type: string
  description: Currently active source name for main window

- id: image_orientation
  type: enum
  description: Projector orientation
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: optics_shutter_position
  type: enum
  description: Shutter position
  values:
    - Open
    - Closed

- id: network_device_lan_state
  type: enum
  description: LAN connection state
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarmstate
  type: enum
  description: Alarm severity level
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: property_changed
  type: notification
  description: Unsolicited property change notification from projector

- id: signal_callback
  type: notification
  description: Unsolicited signal notification from projector
```

## Variables
```yaml
- id: illumination_laser_power
  label: Laser Power Level
  type: float
  description: Current laser power in percent
  access: READ_WRITE
  min: illumination.sources.laser.minpower
  max: illumination.sources.laser.maxpower

- id: illumination_laser_minpower
  label: Minimum Laser Power
  type: float
  description: Minimum laser power in percent (read-only, dynamic)

- id: illumination_laser_maxpower
  label: Maximum Laser Power
  type: float
  description: Maximum laser power in percent (read-only, dynamic)

- id: image_window_main_position
  label: Window Position
  type: object
  description: Main window position {x, y}
  access: READ_WRITE

- id: image_window_main_size
  label: Window Size
  type: object
  description: Main window size {width, height}
  access: READ_WRITE

- id: image_window_main_scalingmode
  label: Scaling Mode
  type: enum
  description: How source is scaled to window
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: optics_zoom_position
  label: Zoom Position
  type: int
  description: Current zoom lens position

- id: optics_focus_position
  label: Focus Position
  type: int
  description: Current focus lens position

- id: optics_lensshift_horizontal_position
  label: Horizontal Lens Shift
  type: int
  description: Current horizontal lens shift position

- id: optics_lensshift_vertical_position
  label: Vertical Lens Shift
  type: int
  description: Current vertical lens shift position

- id: dmx_mode
  label: DMX Mode
  type: string
  description: Current DMX mode

- id: dmx_startchannel
  label: DMX Start Channel
  type: int
  description: DMX start channel (1-512)

- id: dmx_shutdown
  label: DMX Shutdown
  type: boolean
  description: DMX shutdown enabled state

- id: system_standby_enable
  label: Standby Mode Enable
  type: boolean
  description: Enable/disable standby state

- id: system_eco_enable
  label: ECO Mode Enable
  type: boolean
  description: Enable/disable ECO mode

- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean
  description: Enable/disable all warp functions

- id: image_processing_warp_file_enable
  label: Warp File Enable
  type: boolean
  description: Enable/disable uploaded warp grid file

- id: image_processing_warp_file_selected
  label: Warp File Selected
  type: string
  description: Currently selected warp grid filename

- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean
  description: Enable/disable blend mask

- id: image_processing_blend_file_selected
  label: Blend File Selected
  type: string
  description: Currently selected blend mask filename(s)

- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean
  description: Enable/disable black level correction

- id: image_processing_blacklevel_file_selected
  label: Black Level File Selected
  type: string
  description: Currently selected black level mask filename

- id: network_device_lan_ip4config
  label: IPv4 Configuration
  type: object
  description: Current IPv4 settings (address, mask, gateway, nameservers)
```

## Events
```yaml
- id: modelupdated
  label: Model Updated
  description: Triggered when object structure changes (objects added or removed)

- id: property_changed_event
  label: Property Changed
  description: Triggered when a property value changes - client must implement property.changed listener

- id: signal_callback_event
  label: Signal Callback
  description: Triggered when a signal is emitted - client must implement signal.callback listener
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not found in source; single commands only
```

## Safety
```yaml
warnings: []
destructive_actions: []
confirmation_required_for: []
interlocks: []
cooldowns: []
# UNRESOLVED: safety warnings, interlocks, and power-on sequencing requirements not explicitly stated in source
```

## Notes
The Pulse API uses JSON-RPC 2.0 over both TCP/IP (port 9090) and RS232. All parameters passed by name; parameter order is irrelevant. Authentication is optional — normal end-user operations require no login. Higher-privilege operations send an authenticate request with a pass code. It is best practice to wait for property.set confirmation before issuing the same property.set again to avoid flooding the server. ECO mode wake-up requires either Wake-on-LAN, remote/keypad power button, or a special serial command `:POWR1\r`. Property and signal subscriptions are persistent — they remain active until explicitly unsubscribed. File upload/download uses HTTP (curl -X POST -F file=@...) to the projector base URL. Warp, blend, and blacklevel use separate grid/mask image upload workflows. The API is dynamic — some properties/methods depend on installed hardware (e.g. lens type) and may not be available on all configurations; introspection is recommended for full per-device discovery. The modelupdated signal notifies when the object structure changes (objects added/removed). Connector signal detection properties track detected input signals including resolution, sync timing, color space, and scan mode.
<!-- UNRESOLVED: full alphabetical method list not complete in source; introspection recommended -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:31:54.925Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:31:54.925Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched source JSON-RPC methods; transport (TCP 9090, serial 19200/8/N/1) verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
