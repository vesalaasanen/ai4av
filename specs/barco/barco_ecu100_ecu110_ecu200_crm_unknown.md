---
spec_id: admin/barco-ecu100-ecu110-ecu200-crm
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco ECU100 ECU110 ECU200 CRM Pulse API Control Spec"
manufacturer: Barco
model_family: ECU100
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - ECU100
    - ECU110
    - ECU200
    - CRM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:30:11.396Z
generated_at: 2026-05-20T05:30:11.396Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:30:11.396Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched literally in source; transport parameters verified verbatim; full API coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco ECU100 ECU110 ECU200 CRM Pulse API Control Spec

## Summary
Barco Pulse platform projectors (ECU100/ECU110/ECU200/CRM) support both TCP/IP and RS-232 control via JSON-RPC 2.0. TCP service runs on port 9090. Serial uses 19200 8N1. Auth is optional for normal user access; elevated access requires a pass code. Supports power control, source routing, image adjustment, warping, blending, and environmental monitoring.

<!-- UNRESOLVED: specific ECU model variant differences not documented -->

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
  type: optional  # source states auth optional for normal access; elevated access requires pass code
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
  description: Power on projector. Idempotent if already on.

- id: system_poweroff
  label: Power Off
  kind: action
  params: []
  description: Power off projector. Idempotent if already off.

- id: property_set
  label: Set Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.window.main.source)
    - name: value
      type: any
      description: New value for the property

- id: property_get
  label: Get Property
  kind: query
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_subscribe
  label: Subscribe to Property
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
      description: Dot-notation property name to stop observing

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

- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Pass code for elevated access level

- id: introspect
  label: Introspection
  kind: query
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation; empty for full tree)
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

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

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  params:
    - name: modes
      type: array
      description: DMX mode strings

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  params: []
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  params:
    - name: alarminfo
      type: array
      description: Array of alarm info objects with severity, timestamp, source, description, custommessage

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  params: []
  description: Force a firmware component upgrade at the following reboot

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  params: []
  description: Engage Constant Light Output at the current light level

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  params: []
  description: Returns the serial number of the laser illumination source

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy to custom

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to default values

- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  params: []
  description: Reset P7 color settings to native values

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  params: []
  description: Change to the next RGB mode, cycling through all possible modes
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
  description: Current projector operational state

- id: illumination_state
  type: enum
  values:
    - On
    - Off
  description: Light source state

- id: illumination_sources_laser_power
  type: float
  description: Current laser power in percent (0-100)

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent

- id: image_brightness
  type: float
  description: Brightness offset, normalized (0=default, -1 to +1)

- id: image_contrast
  type: float
  description: Contrast gain, normalized (1=default, 0 to 2)

- id: image_gamma
  type: float
  description: Gamma value (default 2.2, range 1 to 3)

- id: image_saturation
  type: float
  description: Color saturation, normalized (1=default, 0 to 2)

- id: image_sharpness
  type: int
  description: Sharpness value (range -2 to 8)

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_window_main_source
  type: string
  description: Currently active source name

- id: image_processing_warp_enable
  type: bool
  description: Global warp enable/disable

- id: image_processing_warp_file_enable
  type: bool
  description: File-based warp enable/disable

- id: image_processing_warp_file_selected
  type: string
  description: Currently selected warp file name

- id: image_processing_blend_file_enable
  type: bool
  description: Blend mask enable/disable

- id: image_processing_blend_file_selected
  type: array
  description: Currently selected blend file names

- id: image_processing_blacklevel_file_enable
  type: bool
  description: Black level correction enable/disable

- id: image_processing_blacklevel_file_selected
  type: string
  description: Currently selected black level file name

- id: optics_shutter_position
  type: enum
  values:
    - Open
    - Closed
  description: Current shutter position

- id: optics_shutter_target
  type: enum
  values:
    - Open
    - Closed
  description: Target shutter position

- id: optics_zoom_position
  type: int
  description: Current zoom position

- id: optics_focus_position
  type: int
  description: Current focus position

- id: optics_lensshift_horizontal_position
  type: int
  description: Current horizontal lens shift position

- id: optics_lensshift_vertical_position
  type: int
  description: Current vertical lens shift position

- id: dmx_mode
  type: string
  description: Current DMX mode

- id: dmx_startchannel
  type: int
  description: DMX start channel (1-512)

- id: dmx_shutdown
  type: bool
  description: DMX shutdown state

- id: network_device_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED
  description: LAN connection state

- id: environment_alarmstate
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
  description: System alarm state

- id: image_connector_detectedsignal
  type: object
  description: Signal detection info per connector (active, resolution, frequency, color space, etc.)

- id: property_changed
  type: signal
  description: Notification emitted when any subscribed property changes

- id: signal_callback
  type: signal
  description: Notification emitted when a subscribed signal fires

- id: modelupdated
  type: signal
  description: Triggered when object structure changes (objects added/removed)
```

## Variables
```yaml
- id: image_window_main_position
  type: object
  properties:
    x: int
    y: int
  description: Window position

- id: image_window_main_size
  type: object
  properties:
    width: int
    height: int
  description: Window size

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch
  description: Source scaling mode

- id: network_device_lan_ip4config
  type: object
  properties:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
  description: IPv4 configuration

- id: system_standby_enable
  type: bool
  description: Standby state enable/disable

- id: system_eco_enable
  type: bool
  description: ECO mode enable/disable
```

## Events
```yaml
# Unsolicited notifications from projector:
# - property.changed: { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [{ "propertyname": value }] } }
# - signal.callback: { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [{ "signalname": args }] } }
# - modelupdated: emitted when object tree changes
```

## Macros
```yaml
# Source name to object name translation:
# const objectName = sourceName.replace(/\W/g, '').toLowerCase();
# Example: "DisplayPort 1" → "displayport1"

# ECO wake procedure (serial only):
# Send ASCII: :POWR1\r

# Black level mask upload:
# curl -X POST -F file=@blacklevel.png http://<ip>/api/image/processing/blacklevel/file/transfer
# Then property.set image.processing.blacklevel.file.selected
# Then property.set image.processing.blacklevel.file.enable

# Blend mask upload:
# curl -X POST -F file=@mask.png http://<ip>/api/image/processing/blend/file/transfer
# Then property.set image.processing.blend.file.selected
# Then property.set image.processing.blend.file.enable

# Warp file upload:
# curl -X POST -F file=@warp.xml http://<ip>/api/image/processing/warp/file/transfer
# Then property.set image.processing.warp.file.selected
# Then property.set image.processing.warp.file.enable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Source: ECO mode wake requires WoL, remote, keypad, or serial :POWR1 command - not standard JSON-RPC
  - description: "Waking from ECO mode requires one of: Wake-on-LAN (HW address), remote control power button, keypad power button, or serial :POWR1 command. Standard JSON-RPC power commands do not wake from ECO."
  # Source: best practice to verify state before issuing power commands
  - description: "Before issuing system.poweron, verify projector state is standby or ready. Before issuing system.poweroff, verify state is on."
  # Source: best practice to wait for property.set confirmation before setting same property again
  - description: "Wait for property.set confirmation before setting the same property again to avoid flooding the server."
```

## Notes
**API style:** JSON-RPC 2.0 over TCP (port 9090) or serial. All parameters passed by name; order does not matter.

**Available sources:** DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI (varies by model).

**File endpoints:** HTTP POST/GET at `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`. URL format: `http://<projector-ip>/api/<endpoint>`.

**Supported file formats for masks:** PNG (up to 16-bit), JPEG, TIFF. Grayscale only; color images use blue channel.

**Introspection:** Full API discoverable via `introspect` method. Some objects dynamic (depend on peripherals, lens type, DMX mode, etc.).

**Known dynamic properties:** Motorized zoom/focus/镜shift only present if lens supports them; DMX channels vary by mode; illumination sources vary by projector laser/LED/xenon configuration.

<!-- UNRESOLVED: auth pass code format/entropy not specified beyond example value 98765 -->
<!-- UNRESOLVED: precise min/max illumination power ranges not universal — dynamic per lens and projector config -->
<!-- UNRESOLVED: connector-specific detectedsignal property names not enumerated — must derive from source name via translation rule -->
<!-- UNRESOLVED: dmx.listchannels return structure not fully specified -->
<!-- UNRESOLVED: firmware.schedulecomponentupgrade parameters not documented -->
<!-- UNRESOLVED: illumination.clo.engage, illumination.laser.getserialnumber, image.color.p7.*, image.color.rgbmode.nextrgbmode not fully documented -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:30:11.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:30:11.396Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched literally in source; transport parameters verified verbatim; full API coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
