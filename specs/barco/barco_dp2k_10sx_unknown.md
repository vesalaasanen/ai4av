---
spec_id: admin/barco-dp2k-10sx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco DP2K-10sX Control Spec"
manufacturer: Barco
model_family: DP2K-10sX
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - DP2K-10sX
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:37:52.209Z
last_checked_at: 2026-06-01T23:12:20.487Z
generated_at: 2026-06-01T23:12:20.487Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full property/method catalogue is dynamic; introspect for exact model config"
  - "projector IP/host not stated; pattern is http://<address>/api/..."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "- firmware compatibility range not stated"
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:20.487Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions match verbatim JSON-RPC methods, RS-232 command, and HTTP endpoints documented in the source; transport (port 9090, baud 19200, serial params) confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco DP2K-10sX Control Spec

## Summary
The Barco DP2K-10sX is a Pulse-series DLP cinema projector. This spec covers the Pulse JSON-RPC 2.0 control API exposed over TCP port 9090, the RS-232 serial wake-up interface, and the HTTP file endpoints under `/api/`.

<!-- UNRESOLVED: full property/method catalogue is dynamic; introspect for exact model config -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: ""  # UNRESOLVED: projector IP/host not stated; pattern is http://<address>/api/...
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source: "authenticate" method with numeric "code"; required for elevated access, skippable for end-user level
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from image.window.main.source property
- queryable       # inferred from property.get / property.subscribe methods
- levelable       # inferred from illumination.sources.laser.power and image.brightness/contrast/gamma/saturation/sharpness properties
- observable      # inferred from property.changed / signal.callback notifications
```

## Actions
```yaml
# --- Authentication ---
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level

# --- System power ---
- id: system_poweron
  label: System Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
- id: system_poweroff
  label: System Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
- id: serial_wake_from_eco
  label: Wake Projector from ECO (RS-232)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: ASCII string on the RS-232 serial port; wakes projector from ECO mode.

# --- Generic property get/set ---
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.window.main.source")
    - name: value
      type: string
      description: Value to assign; type depends on the target property
- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property path, or array of property paths
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property path, or array of property paths

# --- Generic signal subscribe ---
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated") or array of names
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names

# --- Introspection ---
- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything
- id: introspect_nonrecursive
  label: Introspect Object (One Level)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false},"id":2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

# --- LED control ---
- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"id":3,"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period

# --- Sources / connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []
- id: image_source_listconnectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors","id":4}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. "displayport1") derived by lowercasing and stripping non-word characters from the source label

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Image / color ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to copy
- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset
- id: image_color_p7_custom_resettonative
  label: Reset P7 Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor type (e.g. "Sensor")
    - name: valuetype
      type: string
      description: Sensor value type (e.g. "Temperature", "Speed", "Voltage", "Power")
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

# --- DMX ---
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

# --- HTTP file endpoints ---
- id: upload_warp_grid
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<address>/api/image/processing/warp/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP/hostname
- id: upload_blend_mask
  label: Upload Blend Mask Image (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<address>/api/image/processing/blend/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP/hostname
- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<address>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP/hostname
- id: download_file
  label: Download File from Projector (HTTP)
  kind: action
  command: 'curl -O -J http://<address>/api/<endpoint>'
  params:
    - name: address
      type: string
      description: Projector IP/hostname
    - name: endpoint
      type: string
      description: File endpoint path (e.g. "image/processing/warp/file/transfer")
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
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate
- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source_property: network.device.lan.state
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.position
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.target
- id: detected_signal
  type: object
  description: Signal info dict (active, name, resolutions, frequencies, scan, color_space, etc.) per connector; see image.connector.<name>.detectedsignal
```

## Variables
```yaml
- id: illumination_laser_power
  property: illumination.sources.laser.power
  type: float
  access: RW
  description: Target laser power in percent
  range:
    min: 0
    max: 100
  notes: min/max dynamic; lens and lens position may affect
- id: illumination_laser_minpower
  property: illumination.sources.laser.minpower
  type: float
  access: R
  description: Minimum laser power in percent
- id: illumination_laser_maxpower
  property: illumination.sources.laser.maxpower
  type: float
  access: R
  description: Maximum laser power in percent
- id: image_brightness
  property: image.brightness
  type: float
  access: RW
  range: {min: -1, max: 1, step: 0.01}
  description: Normalized brightness/offset; 0 default, 1 = 100% offset
- id: image_contrast
  property: image.contrast
  type: float
  access: RW
  range: {min: 0, max: 2, step: 0.01}
  description: Normalized contrast/gain; 1 default
- id: image_gamma
  property: image.gamma
  type: float
  access: RW
  range: {min: 1, max: 3, step: 0.1}
  description: Gamma; 2.2 default
- id: image_saturation
  property: image.saturation
  type: float
  access: RW
  range: {min: 0, max: 2, step: 0.01}
  description: Normalized color saturation; 1 default
- id: image_sharpness
  property: image.sharpness
  type: integer
  access: RW
  range: {min: -2, max: 8, step: 1}
  description: Normalized image sharpness
- id: image_orientation
  property: image.orientation
  type: enum
  access: RW
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: image_window_main_source
  property: image.window.main.source
  type: string
  access: RW
  description: Active source label (e.g. "DisplayPort 1", "HDMI")
- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  access: RW
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: optics_zoom_position
  property: optics.zoom.position
  type: integer
  access: RW
- id: optics_focus_position
  property: optics.focus.position
  type: integer
  access: RW
- id: optics_lensshift_horizontal_position
  property: optics.lensshift.horizontal.position
  type: integer
  access: RW
- id: optics_lensshift_vertical_position
  property: optics.lensshift.vertical.position
  type: integer
  access: RW
- id: dmx_mode
  property: dmx.mode
  type: string
  access: RW
- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  access: RW
  range: {min: 1, max: 512}
- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: RW
- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  access: RW
- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: RW
- id: image_processing_warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: RW
- id: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: RW
- id: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  access: RW
  items: string
- id: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: RW
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification of property value changes; received via property.changed method
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":value}]}}'
- id: signal_callback
  description: Server-pushed notification of emitted signals
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{arg1:..,arg2:..}}]}}'
- id: modelupdated
  description: Signal fired when introspectable object structure changes (objects added/removed)
- id: introspect_objectchanged
  description: Signal fired when a specific introspected object is added (isnew=true) or removed (isnew=false)
```

## Macros
```yaml
- id: enable_warp_from_file
  description: Enable warping from a grid file (4-step sequence from source)
  steps:
    - id: upload_warp_grid
    - id: property_set image.processing.warp.file.selected = "warp.xml"
    - id: property_set image.processing.warp.file.enable = true
    - id: property_set image.processing.warp.enable = true
- id: enable_blend_mask
  description: Apply an uploaded blend mask (3-step sequence)
  steps:
    - id: upload_blend_mask
    - id: property_set image.processing.blend.file.selected = ["mask.png"]
    - id: property_set image.processing.blend.file.enable = true
- id: enable_blacklevel_mask
  description: Apply an uploaded black level mask (3-step sequence)
  steps:
    - id: upload_blacklevel_mask
    - id: property_set image.processing.blacklevel.file.selected = "blacklevel.png"
    - id: property_set image.processing.blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
# Implicit guidance only: "verify system.state is standby or ready before issuing system.poweron" and
# "verify system.state is on before issuing system.poweroff" - these are operational hints, not safety interlocks.
```

## Notes
All requests/responses are JSON-RPC 2.0 over TCP/9090; param position is irrelevant (named params). Best practice: wait for `property.set` confirmation before sending the same property again to avoid flooding. `system.poweron` / `system.poweroff` return `null` result, not an error. ECO-mode wake requires either Wake-on-LAN (MAC), the keypad/remote, or the RS-232 string `:POWR1\r` on the serial port. The API surface is dynamic and depends on connected peripherals (e.g. motorized lens, DMX mode); use `introspect` to enumerate the live model.

<!-- UNRESOLVED:
- firmware compatibility range not stated
- exact set of available connectors/sources varies by model — enumerated in source as a non-exhaustive example list (DVI 1/2, DisplayPort 1/2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)
- HTTP base URL host/port not stated (only pattern: http://<address>/api/...)
- lens model affects available properties
- projector address resolution (DHCP/static) not specified in this document
-->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:37:52.209Z
last_checked_at: 2026-06-01T23:12:20.487Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:20.487Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions match verbatim JSON-RPC methods, RS-232 command, and HTTP endpoints documented in the source; transport (port 9090, baud 19200, serial params) confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full property/method catalogue is dynamic; introspect for exact model config"
- "projector IP/host not stated; pattern is http://<address>/api/..."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "- firmware compatibility range not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
