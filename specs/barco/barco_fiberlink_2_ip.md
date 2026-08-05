---
spec_id: admin/barco-pulse
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: Pulse
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Pulse
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:34:12.995Z
last_checked_at: 2026-08-05T08:01:15.465Z
generated_at: 2026-08-05T08:01:15.465Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - dmx.listchannels
  - dmx.listmodes
  - "SOURCE/ENTITY MISMATCH. The source artifact is named"
  - "no specific projector model number stated (only \"Pulse\" family)."
  - "no firmware version compatibility stated in source."
  - "no multi-step command sequences explicitly described as macros in the source."
  - "specific projector model number not stated (only \"Pulse\" family)."
  - "firmware version compatibility not stated."
  - "protocol/API version number not stated."
  - "laser power min/max are dynamic per device; not fixed in source."
  - "no explicit safety interlocks or power-sequencing locks stated beyond advisory best-practice notes."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:01:15.465Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match documented JSON-RPC methods, file endpoints, and serial wake sequence; transport params (port 9090, 19200 8N1) verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Pulse Projector Control Spec

## Summary
Barco Pulse projector control via the Pulse API, a JSON-RPC 2.0 service reachable over TCP/IP (port 9090), RS-232 serial (19200 baud), and HTTP file endpoints. Covers power, source selection, illumination/laser power, image picture settings, warp/blend/black-level file handling, optics, DMX, and environment telemetry.

> <!-- UNRESOLVED: SOURCE/ENTITY MISMATCH. The source artifact is named
> `barco_fiberlink_2_ip.refined.md` and the target entity is `barco_fiberlink_2`,
> but the document content is the Barco **Pulse projector** "RS232 and Network
> Command Catalog" / "Pulse API". The name "Fiberlink 2" does not appear in the
> source, and the documented feature set (lens shift, warp, blend, illumination,
> fans, temperatures) is a projector's, not a fiber-optic transport device's.
> This spec is authored faithfully from the source (model = Pulse). Verify the
> source-to-entity assignment before publishing. -->

<!-- UNRESOLVED: no specific projector model number stated (only "Pulse" family). -->
<!-- UNRESOLVED: no firmware version compatibility stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector_address}/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents an `authenticate` request with a `code`; optional (skippable for normal end-user access)
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: property.get and many list/status queries present
  - levelable    # inferred: brightness/contrast/gamma/saturation/sharpness/laser power controls present
  - routable     # inferred: image.window.main.source selection present
```

## Actions
```yaml
- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
- id: eco_wake_serial
  label: Wake From ECO Mode Over Serial
  kind: action
  command: ':POWR1\r'
  params: []
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code that sets the user access level
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness)
    - name: value
      type: any
      description: Value to assign; type and range depend on the target property
- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property names
- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or an array of names
- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or an array of names
- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, or an array of names
- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, or an array of names
- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/omitted introspects everything
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []
- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name; derived by stripping non-word chars and lowercasing the source name (e.g. displayport1)
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor block type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, Voltage, Current, Power, PWM, Humidity, etc.)
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade At Reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy
- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset To Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset
- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": 42}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period
- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: 'POST http://{projector_address}/api/image/processing/warp/file/transfer  (multipart form field: file=@warp.xml)'
  params:
    - name: file
      type: file
      description: Warp grid XML file (MCM500/400 compatible format)
- id: warp_file_download
  label: Download Warp Grid File
  kind: query
  command: 'GET http://{projector_address}/api/image/processing/warp/file/transfer'
  params: []
- id: blend_mask_upload
  label: Upload Blend Mask Image
  kind: action
  command: 'POST http://{projector_address}/api/image/processing/blend/file/transfer  (multipart form field: file=@mask.png)'
  params:
    - name: file
      type: file
      description: Grayscale blend mask (PNG up to 16 bit, JPEG, or TIFF); resolution must match blend layer
- id: blacklevel_mask_upload
  label: Upload Black Level Mask Image
  kind: action
  command: 'POST http://{projector_address}/api/image/processing/blacklevel/file/transfer  (multipart form field: file=@blacklevel.png)'
  params:
    - name: file
      type: file
      description: Grayscale black-level mask (PNG up to 16 bit, JPEG, or TIFF); resolution must match black-level layer
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: active_source
  type: string
- id: illumination_power
  type: float
  description: Current laser/illumination power level in percent
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: shutter_position
  type: enum
  values: [Open, Closed]
- id: connector_detectedsignal
  type: object
  description: Per-connector detected signal info (active, resolution, timings, color, etc.)
- id: property_changed_notification
  type: object
  description: Unsolicited notification carrying an array of property/value pairs
- id: signal_callback_notification
  type: object
  description: Unsolicited notification carrying an array of signal/argument pairs
```

## Variables
```yaml
- id: illumination_sources_laser_power
  type: float
  access: read_write
  unit: percent
  description: Target laser power level (min/max dynamic; read minpower/maxpower properties)
- id: image_window_main_source
  type: string
  access: read_write
  description: Source displayed in the main window
- id: image_window_main_scalingmode
  type: enum
  access: read_write
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: image_window_main_position
  type: object
  access: read_write
  description: Window position with x and y integer fields
- id: image_window_main_size
  type: object
  access: read_write
  description: Window size with width and height integer fields
- id: image_brightness
  type: float
  access: read_write
  min: -1
  max: 1
  description: Normalized brightness/offset (0 default, 1 = 100% offset)
- id: image_contrast
  type: float
  access: read_write
  min: 0
  max: 2
  description: Normalized contrast/gain (1 default)
- id: image_gamma
  type: float
  access: read_write
  min: 1
  max: 3
  description: Image gamma (default 2.2)
- id: image_saturation
  type: float
  access: read_write
  min: 0
  max: 2
  description: Normalized color saturation (1 default)
- id: image_sharpness
  type: integer
  access: read_write
  min: -2
  max: 8
  description: Normalized image sharpness
- id: image_orientation
  type: enum
  access: read_write
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: image_processing_warp_enable
  type: boolean
  access: read_write
  description: Enable/disable all warp functions
- id: image_processing_warp_file_enable
  type: boolean
  access: read_write
  description: Enable/disable file warp
- id: image_processing_warp_file_selected
  type: string
  access: read_write
  description: Currently selected warp file
- id: image_processing_blend_file_enable
  type: boolean
  access: read_write
  description: Enable/disable file blend
- id: image_processing_blend_file_selected
  type: array
  access: read_write
  description: Currently selected blend files
- id: image_processing_blacklevel_file_enable
  type: boolean
  access: read_write
  description: Enable/disable black-level correction
- id: image_processing_blacklevel_file_selected
  type: string
  access: read_write
  description: Currently selected black-level file
- id: dmx_mode
  type: string
  access: read_write
  description: Current DMX mode
- id: dmx_startchannel
  type: integer
  access: read_write
  min: 1
  max: 512
  description: DMX start channel
- id: dmx_shutdown
  type: boolean
  access: read_write
  description: Shutdown enabled or not
- id: optics_shutter_target
  type: enum
  access: read_write
  values: [Open, Closed]
- id: system_standby_enable
  type: boolean
  access: read_write
  description: Enable/disable use of the standby state
- id: system_eco_enable
  type: boolean
  access: read_write
  description: Enable/disable use of the ECO state
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when a subscribed property value changes; carries an array of property/value pairs
- id: signal_callback
  description: Server-pushed notification when a subscribed signal is emitted; carries an array of signal/argument pairs
- id: modelupdated
  description: Signal triggered when the object structure changes (objects added or removed)
- id: introspect_objectchanged
  description: Callback reporting an introspected object was added or removed, with the object name and an isnew flag
```

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: no multi-step command sequences explicitly described as macros in the source. -->

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- **Source/entity mismatch (critical):** see the UNRESOLVED block in the Summary. The source is the Barco Pulse projector API; it does not describe a "Fiberlink 2" device. Reconcile before publishing.
- The API is JSON-RPC 2.0. Request parameters are passed by name and are order-independent. Notifications carry no `id` and must not be answered.
- Best practice from source: wait for the `property.set` confirmation before setting the same property again; repeated sets without confirmation may flood the server.
- Power on/off are idempotent in transition states. Source recommends verifying `system.state` is `standby`/`ready` before `system.poweron`, and `on` before `system.poweroff`.
- ECO-mode wake requires one of: wake-on-LAN (MAC address), remote/keypad power button, or the serial ASCII sequence `:POWR1\r`.
- File endpoints: warp grid format matches MCM500/400. Blend/black-level masks are grayscale (8 or 16 bit); color images accepted but only the blue channel is used. Mask resolution must match the projector's blend/black-level layer (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).
- Parts of the API are dynamic and depend on the fitted peripherals (e.g. motorized lens, DMX channel mode). Introspection is the authoritative way to discover the exact API of a specific unit.

<!-- UNRESOLVED: specific projector model number not stated (only "Pulse" family). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol/API version number not stated. -->
<!-- UNRESOLVED: laser power min/max are dynamic per device; not fixed in source. -->
<!-- UNRESOLVED: no explicit safety interlocks or power-sequencing locks stated beyond advisory best-practice notes. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:34:12.995Z
last_checked_at: 2026-08-05T08:01:15.465Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:01:15.465Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match documented JSON-RPC methods, file endpoints, and serial wake sequence; transport params (port 9090, 19200 8N1) verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- dmx.listchannels
- dmx.listmodes
- "SOURCE/ENTITY MISMATCH. The source artifact is named"
- "no specific projector model number stated (only \"Pulse\" family)."
- "no firmware version compatibility stated in source."
- "no multi-step command sequences explicitly described as macros in the source."
- "specific projector model number not stated (only \"Pulse\" family)."
- "firmware version compatibility not stated."
- "protocol/API version number not stated."
- "laser power min/max are dynamic per device; not fixed in source."
- "no explicit safety interlocks or power-sequencing locks stated beyond advisory best-practice notes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
