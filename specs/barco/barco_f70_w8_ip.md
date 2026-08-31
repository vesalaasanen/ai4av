---
spec_id: admin/barco-f70-w8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F70 W8 Control Spec"
manufacturer: Barco
model_family: "F70 W8"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "F70 W8"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-30T10:29:36.426Z
last_checked_at: 2026-08-30T22:16:49.006Z
generated_at: 2026-08-30T22:16:49.006Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full property/method catalogue is dynamic per projector configuration; source recommends runtime introspection. Firmware version compatibility not stated."
  - "firmware version compatibility not stated in source"
  - "full runtime API surface dynamic; introspection required per unit"
  - "DMX channel mapping in extended mode not enumerated in source"
  - "authentication passcode format/value beyond example integer 98765 not stated"
verification:
  verdict: verified
  checked_at: 2026-08-30T22:16:49.006Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions map to documented JSON-RPC methods or the serial :POWR1 command; transport params (9090, 19200 8N1, /api) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Barco F70 W8 Control Spec

## Summary
Barco F70 W8 laser phosphor projector controlled via the Pulse API, a JSON-RPC 2.0 protocol available over TCP/IP (port 9090) and RS-232 serial (19200 8N1). HTTP file endpoints under /api support upload/download of warp grids, blend masks, and black level masks. This spec covers power, source selection, illumination/laser power, picture settings, optics, DMX, environment monitoring, and introspection.

<!-- UNRESOLVED: full property/method catalogue is dynamic per projector configuration; source recommends runtime introspection. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP - Pulse JSON-RPC service
  base_url: "http://{projector-ip}/api"  # HTTP file endpoints only (warp/blend/blacklevel transfer)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # Optional passcode: required only for access level above normal end user.
  # Request: {"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <passcode>}}
  type: passcode  # inferred: optional authenticate method documented; no credential format stated
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff methods
  - queryable    # inferred: property.get, image.source.list, environment.getcontrolblocks
  - routable     # inferred: image.window.main.source selection
  - levelable    # inferred: illumination.sources.laser.power, image.brightness, image.contrast
```

## Actions
```yaml
# JSON-RPC 2.0 requests. Parameter order does not matter (all params passed by name).
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  notes: "Result is null on success. No-op if already on or transitioning."

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  notes: "Result is null on success. No-op if already off or transitioning."

- id: eco_wake_serial
  label: Wake from ECO Mode (serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII bytes sent on RS-232 port to wake projector in ECO mode. Alternatives: Wake-on-LAN with MAC address, remote/keypad power button."

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {passcode}}}'
  params:
    - name: passcode
      type: integer
      description: Secret pass code; sets user access level
  notes: "Only needed above normal end user level. Response result is true."

- id: select_input
  label: Select Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{source}"}}'
  params:
    - name: source
      type: string
      description: "Source name from image.source.list, e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI (list varies by model)"

- id: set_property
  label: Set Property (generic)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: any
      description: Value to set
  notes: "Wait for confirmation before setting the same property again; flooding degrades performance."

- id: get_property
  label: Get Property (generic)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name, or array of property names for multi-read

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: subscribe_signal
  label: Subscribe to Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names, e.g. modelupdated, image.processing.warp.gridchanged

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything
    - name: recursive
      type: boolean
      description: "true (default): full metadata; false: list object names one level"
  notes: "Equivalent array form: params [\"foo\", true]."

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: "Source object name: strip non-word chars from source name, lowercase (e.g. 'DisplayPort 1' -> 'displayport1')"
  notes: "Returns array of {gridposition {row,column,plane}, name}."

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {level}}}'
  params:
    - name: level
      type: float
      description: Target power in percent (between minpower and maxpower; dynamic, lens-dependent)

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}'
  params:
    - name: value
      type: float
      description: "Normalized: -1..1, 0 default, precision 0.01"

- id: set_warp_enable
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": {enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded warp grid file name, e.g. warp.xml

- id: set_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": {enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded blend mask file name, e.g. mask.png

- id: set_blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": {enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: select_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{filename}"}}'
  params:
    - name: filename
      type: string
      description: Uploaded black level mask file name, e.g. blacklevel.png

- id: set_blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": {enabled}}}'
  params:
    - name: enabled
      type: boolean

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -F file=@warpgrid.xml http://{projector-ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string
      description: Projector IP address
  notes: "HTTP multipart POST. Warp file format same as MCM500/400."

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -F file=@mask.png http://{projector-ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector-ip
      type: string
  notes: "Grayscale PNG (up to 16 bit), JPEG, or TIFF. Mask size must match blend layer resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540). Color images: only blue channel used."

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -F file=@blacklevel.png http://{projector-ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector-ip
      type: string
  notes: "Same format/size rules as blend masks."

- id: blink_led
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "{led}", "color": "{color}", "period": {period}}}'
  params:
    - name: led
      type: string
      description: e.g. systemstatus
    - name: color
      type: string
      description: e.g. red
    - name: period
      type: integer
      description: e.g. 42

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
  params:
    - name: type
      type: string
      description: "Sensor, Filter, Controller, Actuator, Alarm, or GenericBlock"
    - name: valuetype
      type: string
      description: "Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, or Any"
  notes: "Returns dictionary of sensor-name -> float value (e.g. environment.fan.ar1.tacho: 1800)."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity, timestamp, source, description, custommessage}."

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
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns components with {name, versions {available, running}, status}: Unknown/OK/Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot.

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engages Constant Light Output at current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
  notes: Returns string.

- id: color_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string
  notes: Resets preset to default values.

- id: color_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: color_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.
```

## Feedbacks
```yaml
- id: property_changed
  type: object
  description: 'Unsolicited notification: {"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"objectname.propertyname": value}, ...]}} - array of property/value pairs.'

- id: signal_callback
  type: object
  description: 'Unsolicited notification: {"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {args}}, ...]}} - array of signal/argument-list pairs.'

- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  description: Queried via property.get on system.state; changes pushed via property.changed.

- id: illumination_state
  type: enum
  values: [on, off]
  description: Queried via property.get on illumination.state ("On"/"Off").

- id: active_source
  type: string
  description: Queried via property.get on image.window.main.source.

- id: source_list
  type: array
  description: Result of image.source.list - array of source name strings, varies by model.

- id: connector_list
  type: array
  description: Result of image.connector.list - array of connector name strings.

- id: detectedsignal
  type: object
  description: 'image.connector.[name].detectedsignal: {active bool, name string, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch (int), horizontal_frequency, vertical_frequency (float), pixel_rate int, scan enum (Progressive), bits_per_component int, color_space enum (RGB), signal_range enum (0-255, 16-235), chroma_sampling enum (4:4:4, 4:2:2, 4:2:0), gamma_type enum (POWER, sRGB, REC_BT1886, SMPTE_ST2084), color_primaries enum (REC709, REC2020, DCI-P3-D65, DCI-P3-Theater), mastering_luminance float, content_aspect_ratio enum (5:4, 4:3, 16:10, 16:9, 1.85:1, 2.20:1, 2.35:1, 2.37:1, 2.39:1, Unknown), is_stereo bool, stereo_mode enum (None, Sequential, FramePacked, TopBottom, SideBySide)}. If active is false, disregard rest.'

- id: environment_alarmstate
  type: enum
  values: [fatal, error, alert, warning, ok]
  description: environment.alarmstate property.

- id: network_state
  type: enum
  values: [connected, disconnected]
  description: network.device.lan.state property.
```

## Variables
```yaml
- id: system.state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  access: read

- id: system.standby.enable
  type: boolean
  access: write
  description: Enable/disable use of standby state. Check availability first.

- id: system.eco.enable
  type: boolean
  access: write
  description: Enable/disable use of ECO state. Check availability first.

- id: illumination.state
  type: enum
  values: ["On", "Off"]
  access: read

- id: illumination.sources.laser.power
  type: float
  access: read_write
  description: Target laser power in percent.

- id: illumination.sources.laser.minpower
  type: float
  access: read
  description: Minimum power in percent; dynamic (lens type/position affect).

- id: illumination.sources.laser.maxpower
  type: float
  access: read
  description: Maximum power in percent; dynamic (lens type/position affect).

- id: image.window.main.source
  type: string
  access: read_write

- id: image.window.main.position
  type: object
  access: read_write
  description: "{x int, y int}"

- id: image.window.main.size
  type: object
  access: read_write
  description: "{width int, height int}"

- id: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  access: read_write

- id: image.brightness
  type: float
  access: read_write
  constraints: {min: -1, max: 1, step_size: 1, precision: 0.01}
  description: Normalized; 0 default, 1 is 100% offset.

- id: image.contrast
  type: float
  access: read_write
  constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
  description: Normalized; 1 default.

- id: image.gamma
  type: float
  access: read_write
  constraints: {min: 1, max: 3, step_size: 1, precision: 0.1}
  description: Default 2.2.

- id: image.saturation
  type: float
  access: read_write
  constraints: {min: 0, max: 2, step_size: 1, precision: 0.01}
  description: Normalized; 1 default.

- id: image.sharpness
  type: integer
  access: read_write
  constraints: {min: -2, max: 8, step_size: 1, precision: 1}
  description: Normalized.

- id: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  access: read_write

- id: image.connector.l1hdmi.detectedsignal
  type: object
  access: read
  description: See detectedsignal feedback for full structure.

- id: image.processing.warp.enable
  type: boolean
  access: read_write

- id: image.processing.warp.file.enable
  type: boolean
  access: read_write

- id: image.processing.warp.file.selected
  type: string
  access: read_write

- id: image.processing.blend.file.enable
  type: boolean
  access: read_write

- id: image.processing.blend.file.selected
  type: array
  access: read_write
  description: Array of selected file names.

- id: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- id: image.processing.blacklevel.file.selected
  type: string
  access: read_write

- id: dmx.mode
  type: string
  access: read_write

- id: dmx.startchannel
  type: integer
  access: read_write
  constraints: {min: 1, max: 512}

- id: dmx.shutdown
  type: boolean
  access: read_write

- id: network.device.lan.ip4config
  type: object
  access: read
  description: "{Address string, Mask string, Gateway string, NameServers string}"

- id: network.device.lan.state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  access: read

- id: optics.shutter.position
  type: enum
  values: [Open, Closed]
  access: read

- id: optics.shutter.target
  type: enum
  values: [Open, Closed]
  access: read_write

- id: optics.zoom.position
  type: integer
  access: read_write

- id: optics.focus.position
  type: integer
  access: read_write

- id: optics.lensshift.horizontal.position
  type: integer
  access: read_write

- id: optics.lensshift.vertical.position
  type: integer
  access: read_write

- id: environment.alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  access: read
```

## Events
```yaml
- id: property.changed
  description: Pushed on any subscribed property value change; array of property/value pairs. No id, no response to return.

- id: signal.callback
  description: Pushed when a subscribed signal emits; array of signal/argument-list pairs. No response to return.

- id: modelupdated
  description: Introspection signal triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe; callback delivers introspect.objectchanged with {object string, isnew bool}.
```

## Macros
```yaml
- id: apply_warp_grid
  name: Apply Warp Grid File
  steps:
    - 'curl -F file=@warp.xml http://{projector-ip}/api/image/processing/warp/file/transfer (upload)'
    - 'property.set image.processing.warp.file.selected = "warp.xml" (select/activate)'
    - 'property.set image.processing.warp.file.enable = true (enable grid file warp)'
  notes: Source documents this exact three-step sequence.

- id: apply_blend_mask
  name: Apply Blend Mask
  steps:
    - 'curl -F file=@mask.png http://{projector-ip}/api/image/processing/blend/file/transfer (upload)'
    - 'property.set image.processing.blend.file.selected = "mask.png" (select)'
    - 'property.set image.processing.blend.file.enable = true (enable)'
  notes: Source documents this exact three-step sequence.

- id: apply_blacklevel_mask
  name: Apply Black Level Mask
  steps:
    - 'curl -F file=@blacklevel.png http://{projector-ip}/api/image/processing/blacklevel/file/transfer (upload)'
    - 'property.set image.processing.blacklevel.file.selected = "blacklevel.png" (select)'
    - 'property.set image.processing.blacklevel.file.enable = true (enable)'
  notes: Source documents this exact three-step sequence.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on: verify system.state is standby or ready before issuing system.poweron; command no-ops if already on or transitioning (source: programmers guide good practice)."
  - "Power off: verify system.state is on before issuing system.poweroff; command no-ops if already off or transitioning (source: programmers guide good practice)."
```

## Notes
- Protocol is JSON-RPC 2.0 over TCP 9090 or RS-232; identical commands on all connection types.
- Serial cable: 9-pin female (host) to 9-pin male (projector); pin 2→2, 3→3, 5→5.
- All params passed by name; parameter order irrelevant.
- Wait for property.set confirmation before re-setting the same property — flooding the server degrades performance.
- Source change delivers two property.changed notifications (deselect old, select new).
- Subscriptions only push on change; use property.get for current value.
- API is dynamic: parts depend on peripherals/configuration (e.g. no motorized zoom lens → zoom API absent; DMX extended mode exposes more channels). Runtime introspection is the authoritative API listing.
- ECO wake: Wake-on-LAN (MAC), remote/keypad power button, or serial ":POWR1\r".
- File downloads via browser or curl at /api endpoints; some endpoints require explicit filename (e.g. .../transfer/warpgrid.xml).
- File endpoints support download of current file only where endpoint supports it.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: full runtime API surface dynamic; introspection required per unit -->
<!-- UNRESOLVED: DMX channel mapping in extended mode not enumerated in source -->
<!-- UNRESOLVED: authentication passcode format/value beyond example integer 98765 not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-30T10:29:36.426Z
last_checked_at: 2026-08-30T22:16:49.006Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:16:49.006Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions map to documented JSON-RPC methods or the serial :POWR1 command; transport params (9090, 19200 8N1, /api) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full property/method catalogue is dynamic per projector configuration; source recommends runtime introspection. Firmware version compatibility not stated."
- "firmware version compatibility not stated in source"
- "full runtime API surface dynamic; introspection required per unit"
- "DMX channel mapping in extended mode not enumerated in source"
- "authentication passcode format/value beyond example integer 98765 not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
