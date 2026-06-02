---
spec_id: admin/barco-f904k13-f90w13
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F904K13 / F90W13 Pulse Control Spec"
manufacturer: Barco
model_family: F904K13
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - F904K13
    - F90W13
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:44:27.857Z
last_checked_at: 2026-05-20T05:31:54.925Z
generated_at: 2026-05-20T05:31:54.925Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific optional peripherals (DMX channels, lens motorization) depend on installed hardware; source states API is dynamic and introspection is required per unit."
  - "no explicit multi-step sequences documented in source beyond the"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "any peripheral-specific properties (DMX, lens motorization, additional illumination sources) not enumerated in the static API list must be discovered via introspection per-unit."
verification:
  verdict: verified
  checked_at: 2026-05-20T05:31:54.925Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched source JSON-RPC methods; transport (TCP 9090, serial 19200/8/N/1) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco F904K13 / F90W13 Pulse Control Spec

## Summary
JSON-RPC 2.0 control API for Barco Pulse-platform projectors (F90-series, including F904K13 4K and F90W13 WUXGA). The same protocol is available over TCP/IP (port 9090) and RS-232 (19200 8N1); HTTP `/api` endpoints are used for file upload/download. Commands use dot-notation method names plus `property.get`/`property.set`/`property.subscribe` for state.

<!-- UNRESOLVED: device-specific optional peripherals (DMX channels, lens motorization) depend on installed hardware; source states API is dynamic and introspection is required per unit. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
http:
  base_url: "http://{device-ip}/api"
auth:
  type: passcode
  description: "Optional authenticate method (params: id, code) raises access level; normal end-user access requires no authentication."
  notes: "Per source: 'For normal end user access the authentication can be skipped.'"
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
# Power & system state
- id: power_on
  label: Power On
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweron" }
  params: []
  notes: "Verify system.state is 'standby' or 'ready' first. Result is null - not an error."

- id: power_off
  label: Power Off
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweroff" }
  params: []
  notes: "Verify system.state is 'on' first. Result is null."

- id: get_system_state
  label: Get System State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" } }
  params: []

- id: subscribe_system_state
  label: Subscribe System State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" } }
  params: []

- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

# Authentication
- id: authenticate
  label: Authenticate (raise access level)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": {code} } }
  params:
    - name: code
      type: integer
      description: "Secret pass code from integrator. Sets user access level."

# Property API - single
- id: property_set
  label: Set Property
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }
  params:
    - name: property
      type: string
    - name: value
      type: string
  notes: "Wait for confirmation before setting the same property again."

- id: property_get
  label: Get Property
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": ["{property1}", "{property2}"] } }
  params:
    - name: property1
      type: string
    - name: property2
      type: string

# Property API - subscribe
- id: property_subscribe
  label: Subscribe Property
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string

- id: property_subscribe_multi
  label: Subscribe Multiple Properties
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["{property1}", "{property2}"] } }
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_unsubscribe
  label: Unsubscribe Property
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Unsubscribe Multiple Properties
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["{property1}", "{property2}"] } }
  params:
    - name: property1
      type: string
    - name: property2
      type: string

# Signals
- id: signal_subscribe
  label: Subscribe Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }
  params:
    - name: signal
      type: string

- id: signal_subscribe_multi
  label: Subscribe Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["{signal1}", "{signal2}"] } }
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe Signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multi
  label: Unsubscribe Multiple Signals
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["{signal1}", "{signal2}"] } }
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

# Introspection
- id: introspect_recursive
  label: Introspect (Recursive)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true } }
  params:
    - name: object
      type: string

- id: introspect_nonrecursive
  label: Introspect (Non-recursive)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": false } }
  params:
    - name: object
      type: string

# Sources / connectors / window
- id: get_active_source
  label: Get Active Source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" } }
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" } }
  params:
    - name: source
      type: string
      description: "One of the names from image.source.list, e.g. 'DisplayPort 1', 'HDMI', 'DVI 1'."
  notes: "Source object name = source name stripped of non-word chars and lowercased (e.g. 'DisplayPort 1' -> 'displayport1')."

- id: subscribe_active_source
  label: Subscribe Active Source
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" } }
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.list" }
  params: []
  notes: "Result example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI. Contents vary by model."

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.list" }
  params: []

- id: list_source_connectors
  label: List Connectors for a Source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors" }
  params:
    - name: sourcename
      type: string
      description: "Lowercased source name with non-word chars removed, e.g. 'displayport1'."

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.{connectorname}.detectedsignal" } }
  params:
    - name: connectorname
      type: string
      description: "Lowercased connector name with non-word chars removed, e.g. 'displayport1'."

- id: set_window_position
  label: Set Window Position
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": {value} } }
  params:
    - name: value
      type: object
      description: "Object with x:int and y:int."

- id: set_window_size
  label: Set Window Size
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": {value} } }
  params:
    - name: value
      type: object
      description: "Object with width:int and height:int."

- id: set_window_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "{mode}" } }
  params:
    - name: mode
      type: string
      description: "One of: Fill, OneToOne, FillScreen, Stretch."

# Image / picture
- id: get_brightness
  label: Get Brightness
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" } }
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": {value} } }
  params:
    - name: value
      type: float
      description: "Range -1 to 1; 0 default, 1 = 100% offset; step 0.01."

- id: subscribe_brightness
  label: Subscribe Brightness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" } }
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": {value} } }
  params:
    - name: value
      type: float
      description: "Range 0 to 2; 1 default; step 0.01."

- id: set_gamma
  label: Set Gamma
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": {value} } }
  params:
    - name: value
      type: float
      description: "Range 1 to 3; default 2.2; step 0.1."

- id: set_saturation
  label: Set Saturation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": {value} } }
  params:
    - name: value
      type: float
      description: "Range 0 to 2; 1 default; step 0.01."

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": {value} } }
  params:
    - name: value
      type: integer
      description: "Range -2 to 8; step 1; precision 1."

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "{orientation}" } }
  params:
    - name: orientation
      type: string
      description: "One of: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR."

# Illumination
- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" } }
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" } }
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" } }
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": {value} } }
  params:
    - name: value
      type: float
      description: "Target power in percent. Min/max are read-only and dynamic (depend on lens type/position)."

- id: subscribe_laser_power
  label: Subscribe Laser Power
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["illumination.sources.laser.power"] } }
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" } }
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" } }
  params: []

- id: engage_clo
  label: Engage CLO (Constant Light Output)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "illumination.clo.engage" }
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }
  params: []

# Warp / blend / blacklevel
- id: set_warp_enable
  label: Enable All Warp
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: set_warp_file_enable
  label: Enable File Warp
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{filename}" } }
  params:
    - name: filename
      type: string

- id: upload_warp_file
  label: Upload Warp File (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{device-ip}/api/image/processing/warp/file/transfer
  params:
    - name: filename
      type: string
      description: "Warp XML file, same format as MCM500/400."

- id: set_blend_file_enable
  label: Enable Blend File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: set_blend_file_selected
  label: Select Blend Files
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": {value} } }
  params:
    - name: value
      type: array
      description: "Array of blend-mask filenames."

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{device-ip}/api/image/processing/blend/file/transfer
  params:
    - name: filename
      type: string
      description: "8/16-bit grayscale PNG/JPEG/TIFF. Size must match blend layer."

- id: set_blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{filename}" } }
  params:
    - name: filename
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@{filename} http://{device-ip}/api/image/processing/blacklevel/file/transfer
  params:
    - name: filename
      type: string
      description: "8/16-bit grayscale PNG/JPEG/TIFF. Size must match black-level layer."

- id: download_warp_grid
  label: Download Current Warp Grid
  kind: action
  command: |
    curl -O -J http://{device-ip}/api/image/processing/warp/file/transfer
  params: []

# Color / P7 / RGB
- id: copy_p7_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string

- id: reset_p7_custom_preset
  label: Reset P7 Custom Preset
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string

- id: reset_p7_custom_to_native
  label: Reset P7 Custom to Native
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }
  params: []

- id: next_rgb_mode
  label: Cycle Next RGB Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }
  params: []

# Optics
- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" } }
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "{target}" } }
  params:
    - name: target
      type: string
      description: "Open or Closed."

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" } }
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" } }
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" } }
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" } }
  params: []

# Network
- id: get_lan_ip4config
  label: Get LAN IPv4 Config
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" } }
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" } }
  params: []

# Environment
- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" } }
  params:
    - name: type
      type: string
      description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "Value type, e.g. Temperature, Speed, Voltage, Current, Power, Humidity, Pressure, PWM, etc."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getalarminfo" }
  params: []

- id: get_alarm_state
  label: Get Alarm State
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" } }
  params: []

# DMX
- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.mode" } }
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "{mode}" } }
  params:
    - name: mode
      type: string

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.startchannel" } }
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": {value} } }
  params:
    - name: value
      type: integer
      description: "1..512."

- id: get_dmx_shutdown
  label: Get DMX Shutdown Flag
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.shutdown" } }
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown Flag
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": {value} } }
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
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

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponents" }
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }
  params: []
  notes: "Force a component upgrade at the following reboot."

# LED control
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": {period} } }
  params:
    - name: led
      type: string
      description: "e.g. 'systemstatus'."
    - name: color
      type: string
      description: "e.g. 'red'."
    - name: period
      type: integer
      description: "Blink period."

# ECO wake (serial only)
- id: eco_wake_serial
  label: Wake From ECO (RS-232 ASCII)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: "Send literal ASCII bytes ':POWR1<CR>'. Used to wake a projector in ECO/power-save mode. Alternative wakes: WoL packet (HW/MAC), remote-control power button, or keypad power button."

```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  source: property "system.state"

- id: illumination_state
  type: enum
  values: [On, Off]
  source: property "illumination.state"

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source: property "environment.alarmstate"

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source: property "network.device.lan.state"

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  source: property "image.window.main.scalingmode"

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  source: property "image.orientation"

- id: shutter_position
  type: enum
  values: [Open, Closed]
  source: property "optics.shutter.position"

- id: shutter_target
  type: enum
  values: [Open, Closed]
  source: property "optics.shutter.target"

- id: detected_signal
  type: object
  source: property "image.connector.{name}.detectedsignal"
  fields:
    - active: bool
    - name: string
    - vertical_total: int
    - horizontal_total: int
    - vertical_resolution: int
    - horizontal_resolution: int
    - vertical_sync_width: int
    - vertical_front_porch: int
    - vertical_back_porch: int
    - horizontal_sync_width: int
    - horizontal_front_porch: int
    - horizontal_back_porch: int
    - horizontal_frequency: float
    - vertical_frequency: float
    - pixel_rate: int
    - scan: enum [Progressive, ...]
    - bits_per_component: int
    - color_space: enum
    - signal_range: enum [0-255, 16-235]
    - chroma_sampling: enum [4:4:4, 4:2:2, 4:2:0]
    - gamma_type: enum [POWER, sRGB, REC_BT1886, SMPTE_ST2084]
    - color_primaries: enum [REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]
    - mastering_luminance: float
    - content_aspect_ratio: enum [5:4, 4:3, 16:10, 16:9, 1.85:1, 2.20:1, 2.35:1, 2.37:1, 2.39:1, Unknown]
    - is_stereo: bool
    - stereo_mode: enum [None, Sequential, FramePacked, TopBottom, SideBySide]

```

## Variables
```yaml
- name: image.brightness
  type: float
  range: [-1, 1]
  default: 0
  source: image.brightness property

- name: image.contrast
  type: float
  range: [0, 2]
  default: 1
  source: image.contrast property

- name: image.gamma
  type: float
  range: [1, 3]
  default: 2.2
  source: image.gamma property

- name: image.saturation
  type: float
  range: [0, 2]
  default: 1
  source: image.saturation property

- name: image.sharpness
  type: integer
  range: [-2, 8]
  source: image.sharpness property

- name: illumination.sources.laser.power
  type: float
  range: [dynamic, dynamic]
  source: illumination.sources.laser.power property

- name: illumination.sources.laser.minpower
  type: float
  access: read-only
  source: illumination.sources.laser.minpower property

- name: illumination.sources.laser.maxpower
  type: float
  access: read-only
  source: illumination.sources.laser.maxpower property

- name: image.window.main.position
  type: object
  fields: { x: int, y: int }
  source: image.window.main.position property

- name: image.window.main.size
  type: object
  fields: { width: int, height: int }
  source: image.window.main.size property

- name: dmx.startchannel
  type: integer
  range: [1, 512]
  source: dmx.startchannel property

- name: dmx.shutdown
  type: boolean
  source: dmx.shutdown property

- name: system.standby.enable
  type: boolean
  source: system.standby.enable property

- name: system.eco.enable
  type: boolean
  source: system.eco.enable property

- name: network.device.lan.ip4config
  type: object
  fields:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
  source: network.device.lan.ip4config property

- name: optics.zoom.position
  type: integer
  source: optics.zoom.position property

- name: optics.focus.position
  type: integer
  source: optics.focus.position property

- name: optics.lensshift.horizontal.position
  type: integer
  source: optics.lensshift.horizontal.position property

- name: optics.lensshift.vertical.position
  type: integer
  source: optics.lensshift.vertical.position property

```

## Events
```yaml
- id: property_changed
  direction: server_to_client
  payload: |
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "objectname.propertyname": value } ] } }
  notes: "No id field; client must not respond. Client must implement this notification handler to receive property change notifications for any subscribed property."

- id: signal_callback
  direction: server_to_client
  payload: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { arg1, arg2, ... } } ] } }
  notes: "No id field; client must not respond."

- id: modelupdated
  signal: modelupdated
  description: "Triggered when the object structure changes (objects added/removed)."

- id: introspect_objectchanged
  signal: introspect.objectchanged
  payload: { object: string, isnew: bool }
  description: "Fires when new objects arrive or objects are removed."

```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source beyond the
# three-step warp upload (upload file -> select -> enable) and blend/blacklevel
# equivalents, which are documented as individual property.set actions above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing constraints beyond: verify system.state is 'standby' or
# 'ready' before system.poweron, and verify system.state is 'on' before
# system.poweroff. The ECO-mode wake-on-serial ASCII sequence (':POWR1\r') is the
# only documented wake procedure.
```

## Notes
- API surface is dynamic; source recommends `introspect` against the live unit rather than relying on this document alone. Peripherals (DMX channels, motorized lens features) appear or disappear based on installed hardware.
- All JSON-RPC commands are available identically on TCP/IP (port 9090) and RS-232 (19200 8N1). HTTP `/api` endpoints are used only for file upload/download.
- For parameter-setting sub-commands that mirror brightness (contrast, gamma, saturation, sharpness), the same `property.get` / `property.set` / `property.subscribe` pattern applies — captured as one `set_contrast`/`set_gamma`/etc. action each above, since the source lists them as separate property rows.
- `id` field in JSON-RPC is optional and is a request identifier; not echoed in notifications.
- `result: null` on power methods is not an error — methods without return values simply omit a result.
- ECO wake via serial uses literal ASCII `:POWR1` followed by carriage return.
- DMX in basic mode exposes 2 channels; extended mode exposes more (per source).
<!-- UNRESOLVED: any peripheral-specific properties (DMX, lens motorization, additional illumination sources) not enumerated in the static API list must be discovered via introspection per-unit. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:44:27.857Z
last_checked_at: 2026-05-20T05:31:54.925Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:31:54.925Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched source JSON-RPC methods; transport (TCP 9090, serial 19200/8/N/1) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific optional peripherals (DMX channels, lens motorization) depend on installed hardware; source states API is dynamic and introspection is required per unit."
- "no explicit multi-step sequences documented in source beyond the"
- "source contains no explicit safety warnings, interlock procedures,"
- "any peripheral-specific properties (DMX, lens motorization, additional illumination sources) not enumerated in the static API list must be discovered via introspection per-unit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
