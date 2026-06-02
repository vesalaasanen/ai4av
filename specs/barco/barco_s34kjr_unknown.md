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
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T20:24:52.276Z
last_checked_at: 2026-05-20T06:04:25.021Z
generated_at: 2026-05-20T06:04:25.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - illumination.clo.engage
  - image.color.p7.custom.resettonative
  - "firmware version compatibility not stated in source; the source notes that some API parts are dynamic and depend on installed peripherals."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing"
  - "firmware version compatibility not stated in source; voltage/current/power specs not stated; fault behavior / error recovery sequences not stated; DMX channel payload semantics and the full set of available channels in extended mode not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-05-20T06:04:25.021Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions match source commands with correct transport parameters. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco S34KJr Control Spec

## Summary
The Barco S34KJr is a Pulse-series projector controllable over TCP/IP (port 9090), RS-232, and HTTP file endpoints via a JSON-RPC 2.0 service. The same command set is exposed over all three transports, with HTTP additionally used for uploading warp grids, blend masks, and black-level files.

<!-- UNRESOLVED: firmware version compatibility not stated in source; the source notes that some API parts are dynamic and depend on installed peripherals. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://<projector-address>/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional
  # Inferred from source: authentication is optional for normal end-user access.
  # Elevated access requires an "authenticate" JSON-RPC call with a pass code parameter "code".
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source / image.source.list / image.connector.list
- queryable       # inferred from property.get / environment.getcontrolblocks examples
- levelable       # inferred from image.brightness / image.contrast / illumination.sources.laser.power
```

## Actions
```yaml
# All JSON-RPC 2.0 methods documented in the source are enumerated as separate actions.
# Each method count is a distinct entry even when its payload is empty.

- id: power_on
  label: Power On
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweron", "id": 3 }
  params: []
  notes: "Result is null. Verify projector state is 'standby' or 'ready' before issuing."

- id: power_off
  label: Power Off
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweroff", "id": 4 }
  params: []
  notes: "Result is null. Verify projector state is 'on' before issuing."

- id: property_set
  label: Set Property Value
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} }, "id": 9 }
  params:
    - name: property
      type: string
      description: "Dot-notation property path, e.g. 'image.window.main.source' or 'illumination.sources.laser.power'"
    - name: value
      type: string
      description: "JSON-typed value (string/number/bool/object) per the target property's type"
  notes: "Best practice: wait for confirmation before re-setting the same property to avoid flooding."

- id: property_get
  label: Get Property Value
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" }, "id": 4 }
  params:
    - name: property
      type: string
      description: "Dot-notation property path"

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": ["{property1}", "{property2}"] }, "id": 5 }
  params:
    - name: property1
      type: string
    - name: property2
      type: string
    - name: propertyN
      type: string
      description: "Additional property names; JSON-RPC array form"

- id: property_subscribe
  label: Subscribe to One Property
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" }, "id": 6 }
  params:
    - name: property
      type: string
      description: "Dot-notation property path"

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["{property1}", "{property2}"] }, "id": 7 }
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_unsubscribe
  label: Unsubscribe from One Property
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" }, "id": 8 }
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["{property1}", "{property2}"] }, "id": 9 }
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: signal_subscribe
  label: Subscribe to One Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" }, "id": 10 }
  params:
    - name: signal
      type: string
      description: "Signal name in dot notation, e.g. 'modelupdated'"

- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["{signal1}", "{signal2}"] }, "id": 11 }
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe from One Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" }, "id": 12 }
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["{signal1}", "{signal2}"] }, "id": 13 }
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true }, "id": 1 }
  params:
    - name: object
      type: string
      description: "Object name (dot notation allowed); default empty introspects everything"

- id: introspect_recursive_positional
  label: Introspect Object (Recursive, Positional Params)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": ["{object}", true], "id": 1 }
  params:
    - name: object
      type: string

- id: introspect_non_recursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": false }, "id": 2 }
  params:
    - name: object
      type: string

- id: introspect_non_recursive_positional
  label: Introspect Object (Non-Recursive, Positional Params)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": ["{object}", false], "id": 2 }
  params:
    - name: object
      type: string

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": {code} } }
  params:
    - name: code
      type: integer
      description: "Pass code; required only for access levels above normal end user"
  notes: "Optional for normal end-user access; skip when default level is sufficient."

- id: ledctrl_blink
  label: Blink an LED
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "id": 3, "led": "{led}", "color": "{color}", "period": {period} } }
  params:
    - name: led
      type: string
      description: "LED name, e.g. 'systemstatus'"
    - name: color
      type: string
      description: "LED color, e.g. 'red'"
    - name: period
      type: integer
      description: "Blink period"

- id: image_source_list
  label: List Available Sources
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.list", "id": 1 }
  params: []
  notes: "Result varies by projector model."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.list", "id": 3 }
  params: []
  notes: "Result varies by projector model."

- id: image_source_listconnectors
  label: List Connectors for a Source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors", "id": 4 }
  params:
    - name: sourcename
      type: string
      description: "Source object name (e.g. 'displayport1') - derive by lowercasing and stripping non-word characters from the source name"

- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" }, "id": 18 }
  params:
    - name: type
      type: string
      description: "Sensor type, e.g. 'Sensor'"
    - name: valuetype
      type: string
      description: "Value type, e.g. 'Temperature' or 'Speed'"
  notes: "Returns a dictionary of sensor-name → value pairs."

- id: environment_getalarminfo
  label: Get Environment Alarm Information
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getalarminfo" }
  params: []
  notes: "Returns array of alarm objects with severity, timestamp, source, description, custommessage."

- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listchannels" }
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listmodes" }
  params: []

- id: firmware_listcomponents
  label: List Managed Firmware Components
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponents" }
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions and Status
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Firmware Upgrade
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }
  params: []
  notes: "Forces a component upgrade at the following reboot."

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "illumination.clo.engage" }
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset to Default
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }
  params: []

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer
  params:
    - name: address
      type: string
      description: "Projector IP address, e.g. '192.168.1.100'"
    - name: filename
      type: string
      description: "Local path to the warp grid file (e.g. 'warp.xml')"
  notes: "Format is the same as on the MCM500/400. Activate after upload with image.processing.warp.file.selected."

- id: download_warp_file
  label: Download Current Warp Grid File (HTTP)
  kind: action
  command: |
    curl -O -J http://{address}/api/image/processing/warp/file/transfer
  params:
    - name: address
      type: string
      description: "Projector IP address"

- id: upload_blend_mask
  label: Upload Blend Mask Image (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer
  params:
    - name: address
      type: string
    - name: filename
      type: string
      description: "Local path to a PNG/JPEG/TIFF blend mask (grayscale 8 or 16 bit)"
  notes: "Mask resolution must match projector blend layer resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540)."

- id: upload_blacklevel_mask
  label: Upload Black-Level Mask Image (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer
  params:
    - name: address
      type: string
    - name: filename
      type: string
      description: "Local path to a PNG/JPEG/TIFF black-level mask (grayscale 8 or 16 bit)"
  notes: "Mask resolution must match projector black-level layer resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540)."

- id: serial_wake_from_eco
  label: Wake Projector from ECO (RS-232)
  kind: action
  command: |
    :POWR1\r
  params: []
  notes: "Send this ASCII string on the RS-232 serial port to wake a projector that is in ECO mode."
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  source_property: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  source_property: illumination.state

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  source_property: image.orientation

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  source_property: image.window.main.scalingmode

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.position

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.target

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source_property: network.device.lan.state

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate

- id: firmware_status
  type: enum
  values: [Unknown, OK, Upgradable]
  source_property: firmware.listcomponentversionstatus[].status
```

## Variables
```yaml
- name: image_brightness
  property: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01
  description: "Image brightness/offset. 0 is default, 1 is 100% offset."

- name: image_contrast
  property: image.contrast
  type: float
  range: [0, 2]
  step: 0.01
  description: "Image contrast/gain. 1 is default."

- name: image_gamma
  property: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
  description: "Image gamma. Default is 2.2."

- name: image_saturation
  property: image.saturation
  type: float
  range: [0, 2]
  step: 0.01
  description: "Image color saturation. 1 is default."

- name: image_sharpness
  property: image.sharpness
  type: integer
  range: [-2, 8]
  step: 1
  description: "Image sharpness, normalized."

- name: illumination_sources_laser_power
  property: illumination.sources.laser.power
  type: float
  range: [illumination.sources.laser.minpower, illumination.sources.laser.maxpower]
  description: "Laser target power in percent. Min and max are dynamic and may change with lens type and lens position."

- name: illumination_sources_laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  read_only: true
  description: "Minimum laser power in percent (dynamic)."

- name: illumination_sources_laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  read_only: true
  description: "Maximum laser power in percent (dynamic)."

- name: image_window_main_source
  property: image.window.main.source
  type: string
  description: "Active source name. See image.source.list for available values."

- name: image_window_main_position
  property: image.window.main.position
  type: object
  fields: { x: int, y: int }
  description: "Window position."

- name: image_window_main_size
  property: image.window.main.size
  type: object
  fields: { width: int, height: int }
  description: "Window size."

- name: optics_zoom_position
  property: optics.zoom.position
  type: integer
  description: "Current zoom position."

- name: optics_focus_position
  property: optics.focus.position
  type: integer
  description: "Current focus position."

- name: optics_lensshift_horizontal_position
  property: optics.lensshift.horizontal.position
  type: integer
  description: "Current horizontal lens-shift position."

- name: optics_lensshift_vertical_position
  property: optics.lensshift.vertical.position
  type: integer
  description: "Current vertical lens-shift position."

- name: dmx_mode
  property: dmx.mode
  type: string
  description: "Current DMX mode."

- name: dmx_startchannel
  property: dmx.startchannel
  type: integer
  range: [1, 512]
  description: "DMX start channel."

- name: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  description: "DMX shutdown enabled or not."

- name: system_standby_enable
  property: system.standby.enable
  type: boolean
  description: "Enable/disable use of the standby state. Check availability first."

- name: system_eco_enable
  property: system.eco.enable
  type: boolean
  description: "Enable/disable use of the ECO state. Check availability first."

- name: image_processing_warp_enable
  property: image.processing.warp.enable
  type: boolean
  description: "Enable/disable all warp functions."

- name: image_processing_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  description: "Enable/disable file-based warp."

- name: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  description: "Currently selected warp file (e.g. 'warp.xml')."

- name: image_processing_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  description: "Enable/disable file-based blend."

- name: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  description: "Currently selected blend files."

- name: image_processing_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  description: "Enable/disable black level correction."

- name: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  description: "Currently selected black-level file (e.g. 'blacklevel.png')."

- name: network_device_lan_ip4config
  property: network.device.lan.ip4config
  type: object
  fields: { Address: string, Mask: string, Gateway: string, NameServers: string }
  description: "Current IPv4 configuration."

- name: image_connector_detectedsignal
  property: image.connector.{name}.detectedsignal
  type: object
  description: |
    Detected signal information for a connector. Includes active, name, vertical/horizontal
    total/resolution/sync widths, front/back porch, frequencies, pixel_rate, scan,
    bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries,
    mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.
```

## Events
```yaml
- id: property_changed
  description: "Server-pushed notification when a subscribed property value changes. Client must implement the property.changed method."
  example: |
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }

- id: signal_callback
  description: "Server-pushed notification when a subscribed signal is emitted. Client must implement the signal.callback method."
  example: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }

- id: modelupdated
  description: "Introspect signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe."
  signal: modelupdated
```

## Macros
```yaml
# Source describes the following explicit multi-step sequences.
- id: enable_file_warp
  label: Enable File-Based Warp (Upload → Select → Enable)
  steps:
    - action: upload_warp_file
    - action: property_set
      args: { property: "image.processing.warp.file.selected", value: "{filename}" }
    - action: property_set
      args: { property: "image.processing.warp.file.enable", value: true }
  notes: "Warp must be globally enabled separately via image.processing.warp.enable."

- id: enable_file_blend
  label: Enable File-Based Blend (Upload → Select → Enable)
  steps:
    - action: upload_blend_mask
    - action: property_set
      args: { property: "image.processing.blend.file.selected", value: "{filename}" }
    - action: property_set
      args: { property: "image.processing.blend.file.enable", value: true }

- id: enable_blacklevel_mask
  label: Enable Black-Level Mask (Upload → Select → Enable)
  steps:
    - action: upload_blacklevel_mask
    - action: property_set
      args: { property: "image.processing.blacklevel.file.selected", value: "{filename}" }
    - action: property_set
      args: { property: "image.processing.blacklevel.file.enable", value: true }

- id: subscribe_connector_signal
  label: Subscribe to Source-Connector Signal Changes
  steps:
    - action: image_source_list
    - action: property_set
      notes: "For each source name, lower-case and strip non-word characters to get the source object name."
    - action: image_source_listconnectors
      notes: "Call image.source.<objectname>.listconnectors for each source."
    - action: property_subscribe
      args: { property: "image.connector.<objectname>.detectedsignal" }
      notes: "For each discovered connector, subscribe to its detectedsignal property."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing
# requirements. It only advises verifying the system.state is 'standby' or 'ready' before
# poweron, and 'on' before poweroff, plus waking from ECO via WOL / remote / keypad / :POWR1\r.
# These are operational best-practices, not safety interlocks.
```

## Notes
JSON-RPC parameter order does not matter — parameters are passed by name. Subscribing to a property does not return the current value; use property.get for that. Notifications are only sent on actual change. Some API parts are dynamic and depend on installed peripherals (e.g. motorized zoom lenses, DMX extended mode); the best way to discover the exact API of a given unit is to introspect. The pulse serial wake string is `:POWR1\r`. Same JSON-RPC commands are available on all three transports (TCP/serial/HTTP file endpoints).
<!-- UNRESOLVED: firmware version compatibility not stated in source; voltage/current/power specs not stated; fault behavior / error recovery sequences not stated; DMX channel payload semantics and the full set of available channels in extended mode not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T20:24:52.276Z
last_checked_at: 2026-05-20T06:04:25.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T06:04:25.021Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions match source commands with correct transport parameters. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- illumination.clo.engage
- image.color.p7.custom.resettonative
- "firmware version compatibility not stated in source; the source notes that some API parts are dynamic and depend on installed peripherals."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing"
- "firmware version compatibility not stated in source; voltage/current/power specs not stated; fault behavior / error recovery sequences not stated; DMX channel payload semantics and the full set of available channels in extended mode not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
