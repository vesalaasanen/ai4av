---
spec_id: admin/barco-convergence-extension-kit
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Convergence Extension Kit (Pulse API) Control Spec"
manufacturer: Barco
model_family: "Convergence Extension Kit"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Convergence Extension Kit"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:21:56.156Z
last_checked_at: 2026-08-05T07:24:37.287Z
generated_at: 2026-08-05T07:24:37.287Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not enumerate the exact model variants this Pulse API ships on; \"Convergence Extension Kit\" is the documented product name. Warp/blend/blacklevel file formats and many property enums are documented but peripheral-dependent (introspection required for a specific unit)."
  - "absolute min/max not stated; read minpower/maxpower at runtime"
  - "source describes no hard interlock/error-recovery sequences, voltage/current limits, or power-sequencing hard requirements."
  - "exact projector models this Pulse API ships on (only \"Convergence Extension Kit\" named in input metadata)."
  - "illumination source types per model (laser/LED/xenon/UHP) must be discovered via introspection of illumination.sources; only laser.power path is fully documented."
  - "absolute min/max for illumination power not stated as constants (read dynamically via minpower/maxpower)."
  - "firmware version compatibility range not stated."
  - "protocol/API version number not stated in source."
  - "authentication code scheme/format not documented beyond a numeric example (98765); credential distribution is out of scope."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:24:37.287Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions map verbatim to source methods/endpoints; transport (9090, 19200/8/N/1) matches; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco Convergence Extension Kit (Pulse API) Control Spec

## Summary
Barco Pulse projector control API exposed via JSON-RPC 2.0 over TCP/IP (port 9090) and RS-232 serial. Covers power state, illumination (laser power/CLO), input source selection, image picture settings, geometry (warp/blend/blacklevel via file upload), optics (shutter/zoom/focus/lens shift), environment telemetry (temperatures/fans/alarms), DMX, firmware, and network configuration. This spec covers the documented command surface of the Convergence Extension Kit / Pulse services.

<!-- UNRESOLVED: source does not enumerate the exact model variants this Pulse API ships on; "Convergence Extension Kit" is the documented product name. Warp/blend/blacklevel file formats and many property enums are documented but peripheral-dependent (introspection required for a specific unit). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # JSON-RPC service port (TCP/IP)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional_passcode  # source: authenticate method takes a "code" param; auth skippable for normal end-user access
```

## Traits
```yaml
traits:
  - powerable       # inferred from system.poweron / system.poweroff / :POWR1
  - queryable       # inferred from property.get / environment.getcontrolblocks / *.list methods
  - routable        # inferred from image.window.main.source selection
  - levelable       # inferred from image.brightness/contrast/gamma/saturation + illumination.sources.laser.power
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 messages on TCP/9090 unless noted. Serial ECO
# wake uses the raw ASCII :POWR1 sequence. Methods documented as distinct rows
# in the source "Methods" + "Quick start guide" + "Programmers guide" sections
# are emitted as separate actions. property.set / property.get / property.subscribe
# / property.unsubscribe / introspect / signal.subscribe / signal.unsubscribe are
# parameterized by the property/object/signal name (per source naming rules).
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

- id: eco_wake_serial_powr1
  label: ECO Wake via Serial (POWR1)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII sequence sent on RS-232 to wake a projector in ECO/power-save mode.

- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret passcode that sets the user access level.
    - name: id
      type: integer
      description: JSON-RPC request identifier.
  notes: Response {"jsonrpc":"2.0","result":true,"id":1}. Only required for elevated access; normal end-user auth may be skipped.

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Object.property name in dot notation (e.g. image.window.main.source).
    - name: value
      type: any
      description: Value to assign; type per the target property's schema.
  notes: Best practice to wait for confirmation before re-setting the same property.

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Object.property name, or an array of names to read multiple at once.
  notes: An array param returns a {name: value} object result.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name, or an array of names.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name, or an array of names.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated), or an array of names.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, or an array of names.

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", {recursive}]}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/"") introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed (default true).
  notes: Equivalent named-param form {"object":"...","recursive":true}. Result is restricted to the client's authenticated access level.

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []
  notes: Returns array of source-name strings (e.g. ["DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","Dual DVI","Dual DisplayPort","Dual Head DVI","Dual Head DisplayPort","HDBaseT","HDMI","SDI"]). Contents vary by projector model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []
  notes: Returns array of physical connector names; varies by projector model.

- id: image_source_listconnectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors", "id": 4}'
  params:
    - name: sourceobject
      type: string
      description: Source object name derived by stripping non-word chars from the source name and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
  notes: Example result is an array of {gridposition:{row,column,plane}, name}.

- id: environment_getcontrolblocks
  label: Read Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Sensor block type. Values "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock".
    - name: valuetype
      type: string
      description: Value type. Values "Temperature", "Speed", "PWM", "Voltage", "Current", "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate", "Peltier", "Waveform", "Average", "Delay", "Difference", "Interpolation", "Limit", "Median", "Noise", "Weighting", "Comparison", "Threshold", "Formula", "Driver", "PID", "Mode", "State", "Pump", "Resistance", "Simulation", "Constant", "Manual", "Range", "Any".
  notes: Returns {key: value} dictionary of sensor readings.

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
  notes: Returns array of available channel names. Basic mode exposes 2 channels; extended mode exposes more.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  notes: Returns array of mode-name strings.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  notes: Returns array of managed firmware component names.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version/Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns array of {name, versions:{available, running}, status}. status enum "Unknown"|"OK"|"Upgradable".

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the next reboot.

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
  notes: Returns string serial number.

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to defaults.

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native (P7)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# --- File-transfer endpoints (HTTP upload/download). JSON-RPC client selects the
# uploaded file via property.set on the matching *.file.selected property. ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML file path (MCM500/400 format).
    - name: host
      type: string
      description: Projector IP address.
  notes: HTTP multipart POST. Then set image.processing.warp.file.selected and image.processing.warp.file.enable=true.

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend-mask image (PNG up to 16 bit, JPEG, TIFF; grayscale, blue channel used if RGB).
    - name: host
      type: string
      description: Projector IP address.
  notes: Mask size must match projector blend-layer resolution (WUXGA 1920x1200, WQXGA/4K 1280x800, 4K CinemaScope 1280x540).

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black-level mask image (PNG up to 16 bit, JPEG, TIFF; grayscale).
    - name: host
      type: string
      description: Projector IP address.
  notes: Mask sizes match the blend-mask table.
```

## Feedbacks
```yaml
# Observable state via property.get / property.changed notifications.
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: illumination_sources_laser_power
  type: number
  property: illumination.sources.laser.power
  notes: Target power in percent. RW. min/max dynamic (read via minpower/maxpower).

- id: illumination_sources_laser_minpower
  type: number
  property: illumination.sources.laser.minpower
  notes: Minimum laser power in percent (read-only, dynamic).

- id: illumination_sources_laser_maxpower
  type: number
  property: illumination.sources.laser.maxpower
  notes: Maximum laser power in percent (read-only, dynamic).

- id: active_source
  type: string
  property: image.window.main.source
  notes: Name of the source displayed in the main window.

- id: image_brightness
  type: number
  property: image.brightness
  notes: Normalized brightness/offset, 0=default, range -1..1, precision 0.01.

- id: image_contrast
  type: number
  property: image.contrast
  notes: Normalized contrast/gain, 1=default, range 0..2, precision 0.01.

- id: image_gamma
  type: number
  property: image.gamma
  notes: Default 2.2. Range 1..3, precision 0.1.

- id: image_saturation
  type: number
  property: image.saturation
  notes: Normalized saturation, 1=default, range 0..2, precision 0.01.

- id: image_sharpness
  type: integer
  property: image.sharpness
  notes: Normalized sharpness. Range -2..8, step 1.

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  property: image.orientation

- id: image_window_main_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  property: image.window.main.scalingmode

- id: image_connector_detectedsignal
  type: object
  property: image.connector.{connector}.detectedsignal
  notes: Signal info {active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range ("0-255"|"16-235"), chroma_sampling ("4:4:4"|"4:2:2"|"4:2:0"), gamma_type ("POWER"|"sRGB"|"REC_BT1886"|"SMPTE_ST2084"), color_primaries ("REC709"|"REC2020"|"DCI-P3-D65"|"DCI-P3-Theater"), mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode ("None"|"Sequential"|"FramePacked"|"TopBottom"|"SideBySide")}.

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position

- id: optics_shutter_target
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.target

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: network_device_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: network_device_lan_ip4config
  type: object
  property: network.device.lan.ip4config
  notes: {Address, Mask, Gateway, NameServers} (all strings).

- id: image_processing_warp_enable
  type: boolean
  property: image.processing.warp.enable
  notes: Enable/Disable all warp functions.

- id: image_processing_warp_file_enable
  type: boolean
  property: image.processing.warp.file.enable

- id: image_processing_warp_file_selected
  type: string
  property: image.processing.warp.file.selected

- id: image_processing_blend_file_enable
  type: boolean
  property: image.processing.blend.file.enable

- id: image_processing_blend_file_selected
  type: array
  items: string
  property: image.processing.blend.file.selected
  notes: Currently selected blend files.

- id: image_processing_blacklevel_file_enable
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: image_processing_blacklevel_file_selected
  type: string
  property: image.processing.blacklevel.file.selected

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: integer
  property: dmx.startchannel
  notes: DMX start channel [1..512].

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: system_standby_enable
  type: boolean
  property: system.standby.enable
  notes: Enable/disable standby state availability.

- id: system_eco_enable
  type: boolean
  property: system.eco.enable
  notes: Enable/disable ECO state availability.

- id: optics_zoom_position
  type: integer
  property: optics.zoom.position

- id: optics_focus_position
  type: integer
  property: optics.focus.position

- id: optics_lensshift_horizontal_position
  type: integer
  property: optics.lensshift.horizontal.position

- id: optics_lensshift_vertical_position
  type: integer
  property: optics.lensshift.vertical.position

- id: image_window_main_position
  type: object
  property: image.window.main.position
  notes: {x:int, y:int}.

- id: image_window_main_size
  type: object
  property: image.window.main.size
  notes: {width:int, height:int}.
```

## Variables
```yaml
# Settable scalars exposed via property.set; type/range mirrors the Feedbacks entries above.
- id: illumination_sources_laser_power_set
  property: illumination.sources.laser.power
  type: number
  range: {min: dynamic, max: dynamic}  # UNRESOLVED: absolute min/max not stated; read minpower/maxpower at runtime
  unit: percent

- id: image_brightness_set
  property: image.brightness
  type: number
  range: {min: -1, max: 1}
  precision: 0.01

- id: image_contrast_set
  property: image.contrast
  type: number
  range: {min: 0, max: 2}
  precision: 0.01

- id: image_gamma_set
  property: image.gamma
  type: number
  range: {min: 1, max: 3}
  precision: 0.1

- id: image_saturation_set
  property: image.saturation
  type: number
  range: {min: 0, max: 2}
  precision: 0.01

- id: image_sharpness_set
  property: image.sharpness
  type: integer
  range: {min: -2, max: 8}
  step: 1

- id: image_window_main_source_set
  property: image.window.main.source
  type: string
  notes: Value must be one of the strings returned by image.source.list.

- id: dmx_mode_set
  property: dmx.mode
  type: string
  notes: Value must be one of the strings returned by dmx.listmodes.

- id: dmx_startchannel_set
  property: dmx.startchannel
  type: integer
  range: {min: 1, max: 512}

- id: dmx_shutdown_set
  property: dmx.shutdown
  type: boolean
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; client must not reply).
- id: property_changed
  method: property.changed
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname": value}, ...]}}'
  notes: Delivered on any subscribed-property change. Source selection emits two notifications (old source deselected, then new selected).

- id: signal_callback
  method: signal.callback
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}, ...]}}'
  notes: Delivered on any subscribed signal emission.

- id: modelupdated
  method: signal.callback (signal introspect.objectchanged)
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
  notes: Triggered when the object structure changes (objects added/removed). Subscribe via signal.subscribe on "modelupdated".
```

## Macros
```yaml
# Multi-step sequences documented verbatim in source.
- id: enable_warp_from_file
  label: Enable Warp from Uploaded File
  steps:
    - property.set image.processing.warp.enable = true
    - upload warp file via HTTP POST to /api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected = "<filename>"
    - property.set image.processing.warp.file.enable = true
  source: "Warping with grid files + Upload warp file + activate file"

- id: enable_blend_from_file
  label: Enable Blend from Uploaded Mask
  steps:
    - upload blend mask via HTTP POST to /api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected = "mask.png"
    - property.set image.processing.blend.file.enable = true
  source: "Blending with images + Uploading a blend mask"

- id: enable_blacklevel_from_file
  label: Enable Black Level from Uploaded Mask
  steps:
    - upload black-level mask via HTTP POST to /api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected = "blacklevel.png"
    - property.set image.processing.blacklevel.file.enable = true
  source: "Black level adjustment with images + Uploading a black level mask"

- id: wake_eco_projector
  label: Wake ECO-Mode Projector
  steps:
    - send wake-on-LAN with projector MAC address
    # OR
    - send serial ASCII ':POWR1\r'
  source: "ECO mode section"
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff        # source: verify projector state is "on" before issuing poweroff
  - firmware_schedulecomponentupgrade  # forces upgrade at next reboot
interlocks:
  - id: poweron_state_guard
    rule: Good practice to verify system.state is "standby" or "ready" before issuing system.poweron; if already on or transitioning, command is a no-op.
    source: "Power on section"
  - id: poweroff_state_guard
    rule: Good practice to verify system.state is "on" before issuing system.poweroff; if already off or transitioning, command is a no-op.
    source: "Power off section"
  - id: property_set_rate
    rule: Wait for property.set confirmation before re-setting the same property; continuous unconfirmed sets may flood the server and reduce performance.
    source: "Properties / Set value of a property section"
# UNRESOLVED: source describes no hard interlock/error-recovery sequences, voltage/current limits, or power-sequencing hard requirements.
```

## Notes
- API surface is dynamic: properties/objects depend on peripherals and projector config (e.g. motorized zoom absent without motorized lens; DMX basic mode exposes 2 channels, extended mode exposes more). Source recommends `introspect` for the exact API of a specific unit.
- JSON-RPC params are passed by name; order does not matter.
- Notifications carry no `id` and must not be answered.
- Warp file format matches MCM500/400.
- Blend/black-level masks: grayscale, blue channel used if RGB supplied; supported formats PNG (up to 16 bit), JPEG, TIFF.
- Connector/source object-name derivation: strip non-word chars, lowercase (e.g. "DisplayPort 1" -> "displayport1").

<!-- UNRESOLVED: exact projector models this Pulse API ships on (only "Convergence Extension Kit" named in input metadata). -->
<!-- UNRESOLVED: illumination source types per model (laser/LED/xenon/UHP) must be discovered via introspection of illumination.sources; only laser.power path is fully documented. -->
<!-- UNRESOLVED: absolute min/max for illumination power not stated as constants (read dynamically via minpower/maxpower). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: protocol/API version number not stated in source. -->
<!-- UNRESOLVED: authentication code scheme/format not documented beyond a numeric example (98765); credential distribution is out of scope. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:21:56.156Z
last_checked_at: 2026-08-05T07:24:37.287Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:24:37.287Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions map verbatim to source methods/endpoints; transport (9090, 19200/8/N/1) matches; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not enumerate the exact model variants this Pulse API ships on; \"Convergence Extension Kit\" is the documented product name. Warp/blend/blacklevel file formats and many property enums are documented but peripheral-dependent (introspection required for a specific unit)."
- "absolute min/max not stated; read minpower/maxpower at runtime"
- "source describes no hard interlock/error-recovery sequences, voltage/current limits, or power-sequencing hard requirements."
- "exact projector models this Pulse API ships on (only \"Convergence Extension Kit\" named in input metadata)."
- "illumination source types per model (laser/LED/xenon/UHP) must be discovered via introspection of illumination.sources; only laser.power path is fully documented."
- "absolute min/max for illumination power not stated as constants (read dynamically via minpower/maxpower)."
- "firmware version compatibility range not stated."
- "protocol/API version number not stated in source."
- "authentication code scheme/format not documented beyond a numeric example (98765); credential distribution is out of scope."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
