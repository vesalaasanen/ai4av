---
spec_id: admin/barco-field-kit-udm
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Field Kit UDM Control Spec"
manufacturer: Barco
model_family: "Barco Field Kit UDM"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Field Kit UDM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:34:35.132Z
last_checked_at: 2026-08-05T08:02:15.053Z
generated_at: 2026-08-05T08:02:15.053Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state whether the Field Kit UDM exposes every property/method listed in the generic Pulse catalog; verification against a real device is required."
  - "source does not describe hardwired interlocks, voltage/current limits, or power-on sequencing requirements for the Field Kit UDM specifically."
  - "firmware version compatibility not stated in source; electrical ratings (voltage/current) not stated in source; default pass code value not stated in source (operator must configure on device)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:02:15.053Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions match verbatim JSON-RPC method/property tokens in the source; transport (port 9090, 19200/8N1) verified; every source method/property is represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Field Kit UDM Control Spec

## Summary
This spec covers the Barco Pulse API used by the Field Kit UDM projector family. Control is exposed via JSON-RPC 2.0 over TCP port 9090, with an RS-232 serial fallback carrying the same command set.

<!-- UNRESOLVED: source does not state whether the Field Kit UDM exposes every property/method listed in the generic Pulse catalog; verification against a real device is required. -->

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
  type: secret_pass_code  # source describes an "authenticate" method with a "code" param; credentials are session-scoped
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source selection commands
- queryable       # inferred from property.get examples returning state
- levelable       # inferred from illumination.sources.laser.power and image.brightness/contrast/gamma/saturation/sharpness setters
```

## Actions
```yaml
# --- Service / connection ---
- id: authenticate
  label: Authenticate Session
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": <pass_code> }, "id": <id>}'
  params:
    - name: pass_code
      type: integer
      description: Secret pass code that sets the session access level (omit for normal end user access)

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "<object>", "recursive": true }, "id": <id>}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default "" introspects everything)

- id: introspect_non_recursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": [ "<object>", false ], "id": <id>}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "<led>", "color": "<color>", "period": <period> }, "id": <id>}'
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

# --- Power / state ---
- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "id": <id>}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "id": <id>}'
  params: []

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": <id>}'
  params: []

- id: system_state_subscribe
  label: Subscribe Projector State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": <id>}'
  params: []

- id: system_standby_enable_set
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable or disable the standby state

- id: system_eco_enable_set
  label: Set ECO Enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable or disable the ECO state

- id: serial_wake_from_eco
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ':POWR1\r'
  params: []

# --- Sources / windows ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": <id>}'
  params: []

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": <id>}'
  params: []

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "<source>" }, "id": <id>}'
  params:
    - name: source
      type: string
      description: One of the source names returned by image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: image_window_main_source_subscribe
  label: Subscribe Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" }, "id": <id>}'
  params: []

- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": <x>, "y": <y> } }, "id": <id>}'
  params:
    - name: x
      type: integer
      description: Horizontal window position
    - name: y
      type: integer
      description: Vertical window position

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": <w>, "height": <h> } }, "id": <id>}'
  params:
    - name: width
      type: integer
      description: Window width in pixels
    - name: height
      type: integer
      description: Window height in pixels

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "<mode>" }, "id": <id>}'
  params:
    - name: mode
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

# --- Connectors / signal ---
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": <id>}'
  params: []

- id: image_source_connectors_list
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.<sourcename>.listconnectors", "id": <id>}'
  params:
    - name: sourcename
      type: string
      description: Source object name derived from source display name (strip non-word, lowercase, e.g. "displayport1")

- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.<connector>.detectedsignal" }, "id": <id>}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. "displayport1", "l1hdmi")

- id: image_connector_detectedsignal_subscribe
  label: Subscribe Connector Detected Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.connector.<connector>.detectedsignal" }, "id": <id>}'
  params:
    - name: connector
      type: string
      description: Connector object name

# --- Illumination ---
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": <id>}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": <id>}'
  params: []

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": <id>}'
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": <percent> }, "id": <id>}'
  params:
    - name: percent
      type: integer
      description: Target laser power as percent (clamped to current min/max reported by the device)

- id: illumination_laser_power_subscribe
  label: Subscribe Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": [ "illumination.sources.laser.power" ] }, "id": <id>}'
  params: []

- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": <id>}'
  params: []

- id: illumination_laser_maxpower_get
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": <id>}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO At Current Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": <id>}'
  params: []

- id: illumination_laser_serialnumber_get
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": <id>}'
  params: []

# --- Picture settings ---
- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" }, "id": <id>}'
  params: []

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": <value> }, "id": <id>}'
  params:
    - name: value
      type: number
      description: Normalized brightness offset; range -1 to 1, default 0, step 0.01

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": <value> }, "id": <id>}'
  params:
    - name: value
      type: number
      description: Normalized contrast gain; range 0 to 2, default 1, step 0.01

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": <value> }, "id": <id>}'
  params:
    - name: value
      type: number
      description: Gamma curve; range 1 to 3, default 2.2, step 0.1

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": <value> }, "id": <id>}'
  params:
    - name: value
      type: number
      description: Normalized color saturation; range 0 to 2, default 1, step 0.01

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": <value> }, "id": <id>}'
  params:
    - name: value
      type: integer
      description: Sharpness; range -2 to 8, step 1, precision 1

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "<orientation>" }, "id": <id>}'
  params:
    - name: orientation
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: image_rgbmode_next
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": <id>}'
  params: []

# --- Warp ---
- id: image_processing_warp_enable_set
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to globally enable warp functions

- id: image_processing_warp_file_upload
  label: Upload Warp File (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<projector>/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Warp grid file on the local drive (XML format)
    - name: projector
      type: string
      description: Projector IP address or hostname

- id: image_processing_warp_file_selected_set
  label: Select Uploaded Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "<file>" }, "id": <id>}'
  params:
    - name: file
      type: string
      description: Name of the uploaded warp file (e.g. "warp.xml")

- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable file-based warp

# --- Blend ---
- id: image_processing_blend_file_upload
  label: Upload Blend Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<projector>/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Blend mask image (PNG 8/16-bit, JPEG, or TIFF grayscale)
    - name: projector
      type: string
      description: Projector IP address or hostname

- id: image_processing_blend_file_selected_set
  label: Select Blend File(s)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": ["<file>"] }, "id": <id>}'
  params:
    - name: file
      type: string
      description: Name of the uploaded blend file (e.g. "mask.png")

- id: image_processing_blend_file_enable_set
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable file-based blending

# --- Black level ---
- id: image_processing_blacklevel_file_upload
  label: Upload Black Level Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<projector>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Black level mask (PNG 8/16-bit, JPEG, or TIFF grayscale)
    - name: projector
      type: string
      description: Projector IP address or hostname

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "<file>" }, "id": <id>}'
  params:
    - name: file
      type: string
      description: Name of the uploaded black level file (e.g. "blacklevel.png")

- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable file-based black level correction

# --- Color P7 ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<presetname>" }, "id": <id>}'
  params:
    - name: presetname
      type: string
      description: P7 preset name to copy

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<presetname>" }, "id": <id>}'
  params:
    - name: presetname
      type: string
      description: P7 preset name to reset

- id: image_color_p7_custom_resettonative
  label: Reset P7 Color To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": <id>}'
  params: []

# --- Optics ---
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "<target>" }, "id": <id>}'
  params:
    - name: target
      type: string
      description: "Open" or "Closed"

- id: optics_zoom_position_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.zoom.position", "value": <position> }, "id": <id>}'
  params:
    - name: position
      type: integer
      description: Motorized zoom position (int; valid range depends on installed lens)

- id: optics_focus_position_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.focus.position", "value": <position> }, "id": <id>}'
  params:
    - name: position
      type: integer
      description: Motorized focus position (int; valid range depends on installed lens)

- id: optics_lensshift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.horizontal.position", "value": <position> }, "id": <id>}'
  params:
    - name: position
      type: integer
      description: Motorized horizontal lens shift position

- id: optics_lensshift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.vertical.position", "value": <position> }, "id": <id>}'
  params:
    - name: position
      type: integer
      description: Motorized vertical lens shift position

# --- DMX ---
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": <id>}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": <id>}'
  params: []

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.mode" }, "id": <id>}'
  params: []

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "<mode>" }, "id": <id>}'
  params:
    - name: mode
      type: string
      description: DMX mode identifier returned by dmx.listmodes

- id: dmx_startchannel_get
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.startchannel" }, "id": <id>}'
  params: []

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": <channel> }, "id": <id>}'
  params:
    - name: channel
      type: integer
      description: DMX start channel, range 1..512

- id: dmx_shutdown_get
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.shutdown" }, "id": <id>}'
  params: []

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": <bool> }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: True/False to enable DMX-triggered shutdown

# --- Network ---
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }, "id": <id>}'
  params: []

- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": <id>}'
  params: []

# --- Environment ---
- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": <id>}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": <id>}'
  params: []

- id: environment_getcontrolblocks_temperatures
  label: Get Temperature Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": <id>}'
  params: []

- id: environment_getcontrolblocks_fanspeeds
  label: Get Fan Speed Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" }, "id": <id>}'
  params: []

- id: environment_getcontrolblocks_other
  label: Get Other Environment Readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "<type>", "valuetype": "<valuetype>" }, "id": <id>}'
  params:
    - name: type
      type: string
      description: 'Sensor type: "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"'
    - name: valuetype
      type: string
      description: 'Value type, e.g. "ADC", "PWM", "Voltage", "Current", "Power", "Pressure", "Humidity", etc.'

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": <id>}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": <id>}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": { "component": "<component>" }, "id": <id>}'
  params:
    - name: component
      type: string
      description: Firmware component name (as returned by firmware.listcomponents)

# --- Property bulk helpers ---
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "<property>", "value": <value> }, "id": <id>}'
  params:
    - name: property
      type: string
      description: Fully qualified property name in dot notation
    - name: value
      type: string
      description: Value appropriate to the property's type (string, integer, float, boolean, object)

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "<property>" }, "id": <id>}'
  params:
    - name: property
      type: string
      description: Fully qualified property name in dot notation

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["<prop1>", "<prop2>"] }, "id": <id>}'
  params:
    - name: property
      type: array
      description: Array of property names to read

- id: property_subscribe
  label: Subscribe To Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "<property>" }, "id": <id>}'
  params:
    - name: property
      type: string
      description: Fully qualified property name in dot notation

- id: property_subscribe_multi
  label: Subscribe To Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["<prop1>", "<prop2>"] }, "id": <id>}'
  params:
    - name: property
      type: array
      description: Array of property names to subscribe

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "<property>" }, "id": <id>}'
  params:
    - name: property
      type: string
      description: Fully qualified property name in dot notation

- id: property_unsubscribe_multi
  label: Unsubscribe From Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["<prop1>", "<prop2>"] }, "id": <id>}'
  params:
    - name: property
      type: array
      description: Array of property names to unsubscribe

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "<signal>" }, "id": <id>}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation (e.g. "modelupdated")

- id: signal_subscribe_multi
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["<sig1>", "<sig2>"] }, "id": <id>}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "<signal>" }, "id": <id>}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multi
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["<sig1>", "<sig2>"] }, "id": <id>}'
  params:
    - name: signal
      type: array
      description: Array of signal names
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  description: Normalized image brightness offset (default 0)

- id: image_contrast
  type: float
  range: [0, 2]
  description: Normalized image contrast gain (default 1)

- id: image_gamma
  type: float
  range: [1, 3]
  description: Image gamma curve (default 2.2)

- id: image_saturation
  type: float
  range: [0, 2]
  description: Normalized color saturation (default 1)

- id: image_sharpness
  type: integer
  range: [-2, 8]
  description: Normalized image sharpness

- id: illumination_sources_laser_power
  type: integer
  range: [min, max]
  description: Laser illumination power in percent (min/max are device- and lens-dependent; query illumination.sources.laser.minpower and .maxpower)

- id: illumination_sources_laser_minpower
  type: integer
  description: Minimum laser power in percent (read-only, dynamic)

- id: illumination_sources_laser_maxpower
  type: integer
  description: Maximum laser power in percent (read-only, dynamic)

- id: image_window_main_source
  type: string
  description: Active source displayed in the main window (free-form source name)

- id: image_window_main_position
  type: object
  description: Window position with int fields x, y

- id: image_window_main_size
  type: object
  description: Window size with int fields width, height

- id: dmx_mode
  type: string
  description: Current DMX mode

- id: dmx_startchannel
  type: integer
  range: [1, 512]
  description: DMX start channel

- id: dmx_shutdown
  type: boolean
  description: Whether DMX-triggered shutdown is enabled

- id: system_standby_enable
  type: boolean
  description: Whether standby state is enabled

- id: system_eco_enable
  type: boolean
  description: Whether ECO state is enabled

- id: image_processing_warp_enable
  type: boolean
  description: Globally enable/disable warp functions

- id: image_processing_warp_file_enable
  type: boolean
  description: Enable/disable file-based warp

- id: image_processing_warp_file_selected
  type: string
  description: Currently selected warp file name

- id: image_processing_blend_file_enable
  type: boolean
  description: Enable/disable file-based blend

- id: image_processing_blend_file_selected
  type: array
  description: Currently selected blend file name(s)

- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Enable/disable file-based black level

- id: image_processing_blacklevel_file_selected
  type: string
  description: Currently selected black level file name
```

## Events
```yaml
- id: property_changed
  kind: notification
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "<objectname.propertyname>": <value> } ] }}'
  description: Server-pushed notification when a subscribed property changes value. Sent only on actual change, not on subscribe.

- id: signal_callback
  kind: notification
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "<objectname.signalname>": { <arg1>: <value> } } ] }}'
  description: Server-pushed notification when a subscribed signal fires (e.g. "modelupdated", "image.processing.warp.gridchanged").

- id: introspect_objectchanged
  kind: notification
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "<name>", "newobject": <bool> } } ] }}'
  description: Fires when the introspection model gains or loses an object.

- id: source_selection_pair
  kind: notification
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "image.window.main.source": "" }, { "image.window.main.source": "<new source>" } ] }}'
  description: Two notifications delivered in sequence when the source is changed: first the deselect (empty string), then the new selection.
```

## Macros
```yaml
# Each macro is a sequence of actions above. Listed verbatim from the source's
# "Programmers guide" recipes; chain the corresponding action ids.

- id: upload_and_activate_warp_file
  label: Upload And Activate Warp File
  description: HTTP-POST a warp grid, select it, then enable file-based warp.
  steps:
    - image_processing_warp_file_upload
    - image_processing_warp_file_selected_set
    - image_processing_warp_file_enable_set

- id: upload_and_activate_blend_mask
  label: Upload And Activate Blend Mask
  description: HTTP-POST a grayscale blend mask, select it, then enable file-based blending.
  steps:
    - image_processing_blend_file_upload
    - image_processing_blend_file_selected_set
    - image_processing_blend_file_enable_set

- id: upload_and_activate_blacklevel_mask
  label: Upload And Activate Black Level Mask
  description: HTTP-POST a grayscale black level mask, select it, then enable file-based black level correction.
  steps:
    - image_processing_blacklevel_file_upload
    - image_processing_blacklevel_file_selected_set
    - image_processing_blacklevel_file_enable_set

- id: safe_power_on
  label: Safe Power On
  description: Verify projector is in standby or ready, then power on.
  steps:
    - system_state_get
    # source states: "good practice to verify that the projector state is either standby or ready before issuing the power on command"
    - system_poweron

- id: safe_power_off
  label: Safe Power Off
  description: Verify projector is on, then power off.
  steps:
    - system_state_get
    # source states: "good practice to verify that the projector state is on before issuing the power off command"
    - system_poweroff

- id: set_picture_brightness
  label: Adjust Picture Brightness
  description: Introspect the image service to confirm property bounds, then set brightness.
  steps:
    - introspect_recursive  # introspect "image" object with bounds/min/max info
    - image_brightness_set
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff      # source: "verify that the projector state is on before issuing the power off command"
  - system.poweron       # source: "verify that the projector state is either standby or ready before issuing the power on command"
interlocks: []
# UNRESOLVED: source does not describe hardwired interlocks, voltage/current limits, or power-on sequencing requirements for the Field Kit UDM specifically.
```

## Notes
- The Pulse API is the same JSON-RPC surface whether reached over TCP port 9090 or via the RS-232 serial port (19200/8N1, no flow control). Commands are interchangeable; only the framing differs (HTTP-style newline-delimited JSON over TCP, ASCII line over serial).
- For RS-232 ECO wake-up, send the ASCII sequence `:POWR1\r` on the serial port. Other ECO wake paths are Wake-on-LAN (MAC address) or the physical power button on the keypad/remote.
- The source explicitly cautions that parts of the API are dynamic and depend on installed peripherals (e.g. motorized zoom only present when a motorized lens is mounted; DMX channel count varies by mode). Use `introspect` on the actual device to discover the available surface before driving a feature.
- It is "best practice to wait for the confirmation of the property.set before setting the same property again" — repeatedly issuing set without waiting may flood the server.
- For `image.window.main.source`, two `property.changed` notifications are emitted back-to-back on a switch: one with the empty-string deselect and one with the new source.
- `system.poweron` and `system.poweroff` both return `result: null`; that is normal, not an error.
- File upload/download uses the HTTP endpoint root `/api` on the projector (e.g. `http://192.168.1.100/api/image/processing/warp/file/transfer`). Some endpoints also accept a `GET` to download the currently active file.
- The warp file format is described as identical to the MCM500/400; that document is not included here.
- Source refine artifacts only describe the generic Pulse API — they do not enumerate Field Kit UDM-specific add-ons, GPIO pinouts, or hardware interlocks.

<!-- UNRESOLVED: firmware version compatibility not stated in source; electrical ratings (voltage/current) not stated in source; default pass code value not stated in source (operator must configure on device). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:34:35.132Z
last_checked_at: 2026-08-05T08:02:15.053Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:02:15.053Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions match verbatim JSON-RPC method/property tokens in the source; transport (port 9090, 19200/8N1) verified; every source method/property is represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state whether the Field Kit UDM exposes every property/method listed in the generic Pulse catalog; verification against a real device is required."
- "source does not describe hardwired interlocks, voltage/current limits, or power-on sequencing requirements for the Field Kit UDM specifically."
- "firmware version compatibility not stated in source; electrical ratings (voltage/current) not stated in source; default pass code value not stated in source (operator must configure on device)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
