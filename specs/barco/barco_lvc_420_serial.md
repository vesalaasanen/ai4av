---
spec_id: admin/barco-lvc-420
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco LVC 420 Control Spec"
manufacturer: Barco
model_family: "LVC 420"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "LVC 420"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:10:03.042Z
last_checked_at: 2026-08-19T08:56:50.356Z
generated_at: 2026-08-19T08:56:50.356Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Pulse API catalog; model-specific command availability varies (dynamic API — introspection recommended). Firmware compatibility not stated."
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility not stated in source"
  - "full enumeration of laser/LED illumination source properties beyond laser not stated; requires introspection of illumination object"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:56:50.356Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions map to documented JSON-RPC methods, properties, or serial/curl commands in the refined source; transport parameters (port 9090, 19200 8N1) are verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco LVC 420 Control Spec

## Summary
Barco LVC 420 laser projector (Pulse platform) controlled via JSON-RPC 2.0 "Pulse API". Same command set available over TCP/IP (port 9090), RS-232 serial (19200 8N1, no flow control), and HTTP file endpoints (`/api/...`) for upload/download of warp grids, blend masks, and black level masks.

<!-- UNRESOLVED: source is a generic Pulse API catalog; model-specific command availability varies (dynamic API — introspection recommended). Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: 'http://{projector-address}/api'  # HTTP file endpoints only (warp/blend/blacklevel transfer)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: normal end-user access skips authentication; optional "authenticate" method (secret pass code) exists for elevated access levels
```

## Traits
```yaml
- powerable    # inferred: system.poweron / system.poweroff methods documented
- queryable    # inferred: property.get / list / environment query methods documented
- routable     # inferred: input source selection via image.window.main.source documented
- levelable    # inferred: brightness, contrast, gamma, saturation, sharpness, laser power settable
```

## Actions
```yaml
# JSON-RPC 2.0 request payloads shown verbatim from source. Parameter order is
# irrelevant (all params passed by name). "id" is an optional request identifier.

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: Result is null on success (not an error). No-op if already on or in state transition; good practice to verify state is standby/ready first.

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: Result is null on success. No-op if already off or in state transition; good practice to verify state is on first.

- id: eco_wake_serial
  label: Wake from ECO Mode (serial only)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Special ASCII wake command sent on RS232 port only. ECO wake also possible via wake-on-LAN (MAC address), remote power button, or keypad power button.

- id: select_input
  label: Select Main Window Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI"); list varies by model

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {code}}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level. Only needed above normal end-user level.
  notes: Response {"result": true} on success.

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}, "id": 4}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "system.state"); array accepted to read multiple properties at once

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}, "id": 3}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "objectname.propertyname")
    - name: value
      type: any
      description: Value to set; type per property introspection
  notes: Wait for confirmation before setting the same property again; flooding the server degrades performance.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}, "id": 6}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}, "id": 8}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names (e.g. "modelupdated")

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything
    - name: recursive
      type: boolean
      description: "true (default): full metadata; false: list object names one level only"
  notes: Result restricted by authenticated access level. Equivalent positional form: params: ["foo", true].

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []
  notes: Returns array of source names; contents vary by projector model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{objectname}.listconnectors", "id": 4}'
  params:
    - name: objectname
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. "DisplayPort 1" -> "displayport1")
  notes: Returns connector name and grid position (row/column/plane).

- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}, "id": 18}'
  params:
    - name: type
      type: string
      description: 'One of: "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"'
    - name: valuetype
      type: string
      description: 'One of: "Temperature", "Speed", "PWM", "Voltage", "Current", "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate", "Peltier", "Waveform", "Average", "Delay", "Difference", "Interpolation", "Limit", "Median", "Noise", "Weighting", "Comparison", "Threshold", "Formula", "Driver", "PID", "Mode", "State", "Pump", "Resistance", "Simulation", "Constant", "Manual", "Range", "Any"'
  notes: Returns dictionary of sensor-name -> float value (temperatures, fan tacho speeds, etc.).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  notes: Returns list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: Returns list of all modes.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns array of {name, versions{available, running}, status} where status is "Unknown" | "OK" | "Upgradable".

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot.

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
  notes: Returns string value.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Resets preset back to default values

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}, "id": 3}'
  params:
    - name: led
      type: string
      description: LED name (e.g. "systemstatus")
    - name: color
      type: string
      description: Color name (e.g. "red")
    - name: period
      type: integer
      description: Blink period (e.g. 42)
  notes: Documented as the worked example of method invocation.

- id: file_download
  label: Download File (HTTP endpoint)
  kind: query
  command: 'GET http://{projector-address}/api/{endpoint}/{filename}'
  params:
    - name: endpoint
      type: string
      description: 'File endpoint path, e.g. "image/processing/warp/file/transfer"'
    - name: filename
      type: string
      description: File to download; required for endpoints that do not support downloading the current file (e.g. warpgrid.xml)
  notes: Example: curl -O -J http://192.168.1.100/api/image/processing/warp/file/transfer

- id: file_upload
  label: Upload File (HTTP endpoint)
  kind: action
  command: 'curl -F file=@{filename} http://{projector-address}/api/{endpoint}'
  params:
    - name: filename
      type: string
      description: Local file to upload (warp grid XML, blend/blacklevel mask PNG/JPEG/TIFF)
    - name: endpoint
      type: string
      description: 'e.g. "image/processing/warp/file/transfer", "image/processing/blend/file/transfer", "image/processing/blacklevel/file/transfer"'
  notes: HTTP POST implied by -F.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  query: property.get "system.state"

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query: property.get "illumination.state"

- id: active_source
  type: string
  query: property.get "image.window.main.source"

- id: available_sources
  type: array
  query: image.source.list

- id: available_connectors
  type: array
  query: image.connector.list

- id: detected_signal
  type: object
  query: property.get "image.connector.{name}.detectedsignal"
  fields: [active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode]
  notes: If active=false, disregard remaining fields.

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query: property.get "environment.alarmstate"

- id: laser_power
  type: float
  query: property.get "illumination.sources.laser.power"

- id: laser_minpower
  type: float
  query: property.get "illumination.sources.laser.minpower"

- id: laser_maxpower
  type: float
  query: property.get "illumination.sources.laser.maxpower"
```

## Variables
```yaml
# All set via property.set; read via property.get; ranges from source introspection data.

- id: illumination_sources_laser_power
  label: Laser Power (percent)
  type: float
  access: rw
  property: illumination.sources.laser.power

- id: image_window_main_source
  label: Main Window Source
  type: string
  access: rw
  property: image.window.main.source

- id: image_window_main_position
  label: Main Window Position
  type: object
  access: rw
  property: image.window.main.position
  fields: {x: int, y: int}

- id: image_window_main_size
  label: Main Window Size
  type: object
  access: rw
  property: image.window.main.size
  fields: {width: int, height: int}

- id: image_window_main_scalingmode
  label: Main Window Scaling Mode
  type: enum
  access: rw
  property: image.window.main.scalingmode
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  label: Brightness
  type: float
  access: rw
  property: image.brightness
  constraints: {min: -1, max: 1, step_size: 1, precision: 0.01}
  notes: Normalized; 0 default, 1 is 100% offset.

- id: image_contrast
  label: Contrast
  type: float
  access: rw
  property: image.contrast
  constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
  notes: Normalized; 1 default.

- id: image_gamma
  label: Gamma
  type: float
  access: rw
  property: image.gamma
  constraints: {min: 1, max: 3, step_size: 1, precision: 0.1}
  notes: Default 2.2.

- id: image_saturation
  label: Saturation
  type: float
  access: rw
  property: image.saturation
  constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
  notes: Normalized; 1 default.

- id: image_sharpness
  label: Sharpness
  type: int
  access: rw
  property: image.sharpness
  constraints: {min: -2, max: 8, step_size: 1, precision: 1}
  notes: Normalized.

- id: image_orientation
  label: Image Orientation
  type: enum
  access: rw
  property: image.orientation
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_processing_warp_enable
  label: Warp Enable (global)
  type: boolean
  access: rw
  property: image.processing.warp.enable

- id: image_processing_warp_file_enable
  label: File Warp Enable
  type: boolean
  access: rw
  property: image.processing.warp.file.enable

- id: image_processing_warp_file_selected
  label: Selected Warp File
  type: string
  access: rw
  property: image.processing.warp.file.selected

- id: image_processing_blend_file_enable
  label: File Blend Enable
  type: boolean
  access: rw
  property: image.processing.blend.file.enable

- id: image_processing_blend_file_selected
  label: Selected Blend Files
  type: array
  access: rw
  property: image.processing.blend.file.selected

- id: image_processing_blacklevel_file_enable
  label: Black Level Correction Enable
  type: boolean
  access: rw
  property: image.processing.blacklevel.file.enable

- id: image_processing_blacklevel_file_selected
  label: Selected Black Level File
  type: string
  access: rw
  property: image.processing.blacklevel.file.selected

- id: dmx_mode
  label: DMX Mode
  type: string
  access: rw
  property: dmx.mode

- id: dmx_startchannel
  label: DMX Start Channel
  type: int
  access: rw
  property: dmx.startchannel
  constraints: {min: 1, max: 512}

- id: dmx_shutdown
  label: DMX Shutdown Enable
  type: boolean
  access: rw
  property: dmx.shutdown

- id: network_device_lan_ip4config
  label: LAN IPv4 Config
  type: object
  access: r
  property: network.device.lan.ip4config
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}

- id: network_device_lan_state
  label: LAN State
  type: enum
  access: r
  property: network.device.lan.state
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  label: Shutter Position
  type: enum
  access: r
  property: optics.shutter.position
  values: [Open, Closed]

- id: optics_shutter_target
  label: Shutter Target
  type: enum
  access: rw
  property: optics.shutter.target
  values: [Open, Closed]

- id: optics_zoom_position
  label: Zoom Position
  type: int
  access: rw
  property: optics.zoom.position

- id: optics_focus_position
  label: Focus Position
  type: int
  access: rw
  property: optics.focus.position

- id: optics_lensshift_horizontal_position
  label: Horizontal Lens Shift Position
  type: int
  access: rw
  property: optics.lensshift.horizontal.position

- id: optics_lensshift_vertical_position
  label: Vertical Lens Shift Position
  type: int
  access: rw
  property: optics.lensshift.vertical.position

- id: system_standby_enable
  label: Standby State Enable
  type: boolean
  access: rw
  property: system.standby.enable
  notes: Check availability first.

- id: system_eco_enable
  label: ECO State Enable
  type: boolean
  access: rw
  property: system.eco.enable
  notes: Check availability first.
```

## Events
```yaml
- id: property_changed
  description: Server notification when a subscribed property value changes. Client must implement this method.
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"{objectname.propertyname}": {value}}]}}'
  notes: Notifications carry no id and require no response. Source-change on image.window.main.source delivers two notifications (deselect then select). Only sent on actual value change; subscribing does not return current value.

- id: signal_callback
  description: Server notification when a subscribed signal is emitted. Client must implement this method.
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"{objectname.signalname}": {args}}]}}'

- id: modelupdated
  description: Signal triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe.
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'
  notes: Callback arg "newobject" true = object added, false = object lost.
```

## Macros
```yaml
- id: activate_warp_grid
  label: Upload and Activate Warp Grid
  steps:
    - property.set image.processing.warp.enable = true
    - 'HTTP upload: curl -F file=@warp.xml http://{projector-address}/api/image/processing/warp/file/transfer'
    - property.set image.processing.warp.file.selected = "warp.xml"
    - property.set image.processing.warp.file.enable = true
  notes: Warp file format same as MCM500/400.

- id: activate_blend_mask
  label: Upload and Activate Blend Mask
  steps:
    - 'HTTP upload: curl -F file=@mask.png http://{projector-address}/api/image/processing/blend/file/transfer'
    - property.set image.processing.blend.file.selected = "mask.png"
    - property.set image.processing.blend.file.enable = true
  notes: 'Mask must match blend layer resolution: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540. Grayscale 8/16-bit; color images use blue channel only. PNG (up to 16 bit), JPEG, TIFF supported.'

- id: activate_blacklevel_mask
  label: Upload and Activate Black Level Mask
  steps:
    - 'HTTP upload: curl -F file=@blacklevel.png http://{projector-address}/api/image/processing/blacklevel/file/transfer'
    - property.set image.processing.blacklevel.file.selected = "blacklevel.png"
    - property.set image.processing.blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
```

## Notes
- Serial cable: 9-pin female to host, 9-pin male to projector; pin 2-2, 3-3, 5-5 (straight-through).
- Same JSON-RPC command set over all connection types (TCP 9090, serial, and via HTTP file endpoints for transfers).
- All parameters passed by name; parameter order irrelevant.
- Best practice: wait for property.set confirmation before re-setting the same property (flooding degrades server performance).
- Good practice: verify state standby/ready before power on, on before power off. Power commands are no-ops in transitions.
- ECO-mode wake requires wake-on-LAN, remote/keypad power button, or serial `:POWR1\r`.
- API is dynamic: availability depends on peripherals and configuration (e.g. no motorized zoom API without motorized lens; DMX extended mode exposes more channels). Use introspection for exact per-unit API.
- Source-name to object-name translation: strip non-word characters, lowercase ("DisplayPort 1" -> "displayport1").
- Notifications only delivered on actual value change; use property.get for current values.
- <!-- UNRESOLVED: firmware version compatibility not stated in source -->
- <!-- UNRESOLVED: full enumeration of laser/LED illumination source properties beyond laser not stated; requires introspection of illumination object -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:10:03.042Z
last_checked_at: 2026-08-19T08:56:50.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:56:50.356Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions map to documented JSON-RPC methods, properties, or serial/curl commands in the refined source; transport parameters (port 9090, 19200 8N1) are verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Pulse API catalog; model-specific command availability varies (dynamic API — introspection recommended). Firmware compatibility not stated."
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility not stated in source"
- "full enumeration of laser/LED illumination source properties beyond laser not stated; requires introspection of illumination object"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
