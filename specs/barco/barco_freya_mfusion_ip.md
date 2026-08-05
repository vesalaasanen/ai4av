---
spec_id: admin/barco-freya-mfusion
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Freya Mfusion Control Spec"
manufacturer: Barco
model_family: "Barco Freya Mfusion"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Freya Mfusion"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:10:08.958Z
last_checked_at: 2026-08-05T08:02:40.337Z
generated_at: 2026-08-05T08:02:40.337Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This spec reflects the Barco Pulse API generally; Freya Mfusion-specific peripherals (e.g. which illumination sources, which connectors, which optics) are not enumerated in the source. Use introspection (`method: introspect`) to discover the actual object tree for a given unit."
  - "- Firmware version compatibility / minimum firmware for the listed API not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:02:40.337Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions match source wire tokens verbatim (JSON-RPC methods, property paths, file endpoints, and serial wake command); transport fully verified. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Freya Mfusion Control Spec

## Summary

Control spec for Barco Freya Mfusion projector via the Barco Pulse API. Source is the Barco Pulse RS232 and Network Command Catalog (JSON-RPC 2.0 over TCP port 9090 and RS-232 19200 8N1). Covers power, sources/inputs, illumination, picture settings, warping, blending, optics, DMX, firmware, environment sensors, and event signals.

<!-- UNRESOLVED: This spec reflects the Barco Pulse API generally; Freya Mfusion-specific peripherals (e.g. which illumination sources, which connectors, which optics) are not enumerated in the source. Use introspection (`method: introspect`) to discover the actual object tree for a given unit. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # TCP service port for Pulse API
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source: `method: authenticate` with `params.code` (numeric pass code); can be skipped for normal end-user access
```

TCP framing is line-delimited JSON-RPC 2.0; no HTTP base URL for the RPC channel. Separate HTTP file endpoints exist under `/api/` (e.g. `/api/image/processing/warp/file/transfer`) but those are file transfer, not the RPC transport.

## Traits

```yaml
# powerable       (system.poweron, system.poweroff present)
# routable        (image.window.main.source selection present)
# queryable       (property.get, property.subscribe present)
# levelable       (image.brightness/contrast/gamma/saturation/sharpness, illumination power, optics zoom/focus/lensshift present)
```

## Actions

```yaml
# Pulse API is JSON-RPC 2.0; commands below use `command:` to carry the literal
# JSON-RPC payload from the source. `command_template` shown in the `notes:`
# field for parameterized ones (where the source shows the variable part).

# --- Authentication ---
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (source example value: 98765)
  notes: "Optional for normal end-user access. Required only to elevate above normal user level."

# --- System / power ---
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": {"id": 3, "property": "system.state"}, "id": 3}'
  notes: "Source recommends verifying system.state is `standby` or `ready` before invoking. Returns `result: null` (not an error)."

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": {"id": 4, "property": "system.state"}, "id": 4}'
  notes: "Source recommends verifying system.state is `on` before invoking. Returns `result: null`."

- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state", "id": 1}, "id": 1}'
  notes: "Returns one of: boot, eco, standby, ready, conditioning, on, deconditioning, service, error."

- id: system_state_subscribe
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "system.state", "id": 2}, "id": 2}'

- id: system_standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": true}, "id": 3}'
  notes: "Check availability first via introspection."

- id: system_eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": true}, "id": 3}'
  notes: "Check availability first via introspection."

# --- LED control (example method call) ---
- id: led_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "systemstatus", "color": "red", "period": 42, "id": 3}, "id": 3}'
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

# --- Sources / inputs ---
- id: source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "params": {"id": 1}, "id": 1}'
  notes: "Returns source name list (varies by model). Source example: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI."

- id: source_active_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source", "id": 0}, "id": 0}'

- id: source_active_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1", "id": 2}, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI"). Get valid values from `image.source.list`.
  notes: "Source recommends waiting for property.set confirmation before issuing another set on the same property."

- id: source_active_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.window.main.source", "id": 6}, "id": 6}'

- id: connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "params": {"id": 3}, "id": 3}'
  notes: "Connector set depends on projector model."

- id: source_connector_list
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "params": {"id": 4}, "id": 4}'
  notes: "Object name = source name with non-word chars stripped and lowercased (e.g. \"DisplayPort 1\" -> \"displayport1\")."

- id: connector_signal_get
  label: Get Detected Signal on Connector
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.displayport1.detectedsignal", "id": 5}, "id": 5}'
  notes: "Object name = connector name with non-word chars stripped and lowercased."

- id: connector_signal_subscribe
  label: Subscribe to Connector Signal Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.connector.displayport1.detectedsignal"], "id": 4}, "id": 4}'

# --- Window layout ---
- id: window_position_set
  label: Set Main Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": 0, "y": 0}, "id": 3}, "id": 3}'
  params:
    - name: x
      type: integer
      description: X position
    - name: y
      type: integer
      description: Y position

- id: window_size_set
  label: Set Main Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": 0, "height": 0}, "id": 3}, "id": 3}'
  params:
    - name: width
      type: integer
      description: Width
    - name: height
      type: integer
      description: Height

- id: window_scaling_mode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "Fill", "id": 3}, "id": 3}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

# --- Image / picture settings ---
- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness", "id": 7}, "id": 7}'
  notes: "Range -1..1 (float), default 0, precision 0.01, step-size 1."

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15, "id": 9}, "id": 9}'
  params:
    - name: value
      type: number
      description: Brightness offset (float -1..1, default 0)

- id: image_brightness_subscribe
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness"], "id": 8}, "id": 8}'

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": 1.0, "id": 3}, "id": 3}'
  params:
    - name: value
      type: number
      description: Contrast gain (float 0..2, default 1, precision 0.01)

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": 2.2, "id": 3}, "id": 3}'
  params:
    - name: value
      type: number
      description: Gamma (float 1..3, default 2.2, precision 0.1)

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": 1.0, "id": 3}, "id": 3}'
  params:
    - name: value
      type: number
      description: Saturation (float 0..2, default 1, precision 0.01)

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": 0, "id": 3}, "id": 3}'
  params:
    - name: value
      type: integer
      description: Sharpness (int -2..8, precision 1)

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "DESKTOP_FRONT", "id": 3}, "id": 3}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: rgb_mode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "params": {"id": 3}, "id": 3}'

- id: color_p7_custom_copy_to_custom
  label: Copy P7 Color Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "presetname", "id": 3}, "id": 3}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy

- id: color_p7_custom_reset_preset
  label: Reset P7 Color Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "presetname", "id": 3}, "id": 3}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset

- id: color_p7_custom_reset_to_native
  label: Reset P7 Color to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "params": {"id": 3}, "id": 3}'

# --- Warping ---
- id: warp_enable_set
  label: Enable/Disable All Warp Functions
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true, "id": 10}, "id": 10}'
  params:
    - name: value
      type: boolean

- id: warp_file_upload
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP/hostname
    - name: filename
      type: string
      description: Local warp grid filename (XML, MCM500/400 format)
  notes: "HTTP POST to /api/image/processing/warp/file/transfer; -X POST is implied by -F."

- id: warp_file_select
  label: Select Uploaded Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml", "id": 11}, "id": 11}'
  params:
    - name: value
      type: string
      description: Filename to activate

- id: warp_file_enable_set
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true, "id": 12}, "id": 12}'
  params:
    - name: value
      type: boolean

# --- Blending ---
- id: blend_file_upload
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP/hostname
    - name: filename
      type: string
      description: Local blend mask filename (PNG/JPEG/TIFF, grayscale 8 or 16 bit; size must match blend layer resolution per projector mode: WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540)

- id: blend_file_select
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": ["mask.png"], "id": 13}, "id": 13}'
  params:
    - name: value
      type: array
      description: Array of filenames to activate

- id: blend_file_enable_set
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true, "id": 14}, "id": 14}'
  params:
    - name: value
      type: boolean

# --- Black level ---
- id: blacklevel_file_upload
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP/hostname
    - name: filename
      type: string
      description: Local black level mask filename (PNG/JPEG/TIFF, grayscale 8 or 16 bit; size per projector mode as in blend)

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png", "id": 15}, "id": 15}'
  params:
    - name: value
      type: string
      description: Filename to activate

- id: blacklevel_file_enable_set
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true, "id": 16}, "id": 16}'
  params:
    - name: value
      type: boolean

# --- Illumination ---
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state", "id": 0}, "id": 0}'
  notes: "Returns On or Off."

- id: illumination_state_subscribe
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state", "id": 1}, "id": 1}'

- id: illumination_sources_introspect
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "illumination.sources", "recursive": false, "id": 2}, "id": 2}'
  notes: "Discovers which illumination sources exist (e.g. laser, LED, UHP, xenon)."

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power", "id": 3}, "id": 3}'
  notes: "Power as percent. Read min/max with `illumination.sources.laser.minpower` and `illumination.sources.laser.maxpower`."

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40, "id": 5}, "id": 5}'
  params:
    - name: value
      type: number
      description: Target power in percent (float, RW)

- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["illumination.sources.laser.power"], "id": 4}, "id": 4}'

- id: illumination_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower", "id": 6}, "id": 6}'

- id: illumination_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower", "id": 5}, "id": 5}'

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "params": {"id": 3}, "id": 3}'

- id: illumination_laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "params": {"id": 3}, "id": 3}'

# --- Optics ---
- id: shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position", "id": 3}, "id": 3}'
  notes: "Returns Open or Closed."

- id: shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "Open", "id": 3}, "id": 3}'
  params:
    - name: value
      type: string
      description: Open or Closed

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position", "id": 3}, "id": 3}'

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position", "id": 3}, "id": 3}'

- id: optics_lensshift_horizontal_get
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position", "id": 3}, "id": 3}'

- id: optics_lensshift_vertical_get
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position", "id": 3}, "id": 3}'

# --- DMX ---
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode", "value": "basic", "id": 3}, "id": 3}'
  params:
    - name: value
      type: string

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode", "id": 3}, "id": 3}'

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": 1, "id": 3}, "id": 3}'
  params:
    - name: value
      type: integer
      description: 1..512

- id: dmx_startchannel_get
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.startchannel", "id": 3}, "id": 3}'

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": false, "id": 3}, "id": 3}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "params": {"id": 3}, "id": 3}'

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "params": {"id": 3}, "id": 3}'

# --- Network ---
- id: network_lan_ip4config_get
  label: Get LAN IPv4 Configuration
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config", "id": 3}, "id": 3}'
  notes: "Returns object with Address, Mask, Gateway, NameServers."

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state", "id": 3}, "id": 3}'
  notes: "Returns CONNECTED or DISCONNECTED."

# --- Environment ---
- id: environment_temperatures_get
  label: Get All Temperature Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature", "id": 18}, "id": 18}'

- id: environment_fan_speeds_get
  label: Get All Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Speed", "id": 19}, "id": 19}'

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks (Generic)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature", "id": 3}, "id": 3}'
  notes: "Sensor types: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock. Sensor value types: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "params": {"id": 3}, "id": 3}'

- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate", "id": 3}, "id": 3}'
  notes: "Returns one of: Fatal, Error, Alert, Warning, Ok."

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "params": {"id": 3}, "id": 3}'

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions and Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "params": {"id": 3}, "id": 3}'
  notes: "Status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade on Next Reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": {"id": 3}, "id": 3}'

# --- Introspection ---
- id: introspect_recursive
  label: Introspect Object Tree (Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true, "id": 1}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty introspects everything)
    - name: recursive
      type: boolean
      description: If false, only one level of objects is listed

- id: introspect_non_recursive
  label: Introspect Object Tree (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "motors", "recursive": false, "id": 2}, "id": 2}'

# --- Subscriptions / signals ---
- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"], "id": 5}, "id": 5}'
  notes: "Returns dictionary keyed by full property name."

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness", "image.contrast"], "id": 7}, "id": 7}'

- id: property_unsubscribe_one
  label: Unsubscribe from One Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "image.brightness", "id": 8}, "id": 8}'

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["image.brightness", "image.contrast"], "id": 9}, "id": 9}'

- id: signal_subscribe_one
  label: Subscribe to One Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "modelupdated", "id": 10}, "id": 10}'

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"], "id": 11}, "id": 11}'

- id: signal_unsubscribe_one
  label: Unsubscribe from One Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "modelupdated", "id": 12}, "id": 12}'

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"], "id": 13}, "id": 13}'

# --- ECO wake (serial) ---
- id: eco_wake_serial
  label: Wake Projector from ECO Mode via Serial
  kind: action
  command: ":POWR1\r"
  notes: "ASCII sent on RS-232 serial port. Other wake methods: Wake-on-LAN (MAC), remote power button, keypad power button."
```

## Feedbacks

```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: image_window_main_source
  type: string
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: image_brightness
  type: float
  range: [-1, 1]
- id: image_contrast
  type: float
  range: [0, 2]
- id: image_gamma
  type: float
  range: [1, 3]
- id: image_saturation
  type: float
  range: [0, 2]
- id: image_sharpness
  type: integer
  range: [-2, 8]
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: illumination_sources_laser_power
  type: float
  unit: percent
- id: illumination_sources_laser_minpower
  type: float
  unit: percent
- id: illumination_sources_laser_maxpower
  type: float
  unit: percent
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
- id: optics_zoom_position
  type: integer
- id: optics_focus_position
  type: integer
- id: optics_lensshift_horizontal_position
  type: integer
- id: optics_lensshift_vertical_position
  type: integer
- id: dmx_mode
  type: string
- id: dmx_startchannel
  type: integer
  range: [1, 512]
- id: dmx_shutdown
  type: boolean
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: network_device_lan_ip4config
  type: object
  properties: [Address, Mask, Gateway, NameServers]
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: environment_temperatures
  type: object
  description: Dictionary of temperature sensor readings (e.g. environment.laser.board0.bank0.temperature)
- id: environment_fan_speeds
  type: object
  description: Dictionary of fan tachometer readings (e.g. environment.fan.ar1.tacho)
- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
- id: image_connector_detectedsignal
  type: object
  description: Signal descriptor (active, name, resolutions, frequencies, scan, color_space, chroma, gamma, etc.)
```

## Variables

```yaml
# Parameters that are settable scalars but documented as properties. Each maps
# to a property.set action above. Listed here as the conceptual "what can be
# adjusted at runtime" view; the action list is the executable form.
- id: image_brightness
  type: float
  range: [-1, 1]
  property: image.brightness
- id: image_contrast
  type: float
  range: [0, 2]
  property: image.contrast
- id: image_gamma
  type: float
  range: [1, 3]
  property: image.gamma
- id: image_saturation
  type: float
  range: [0, 2]
  property: image.saturation
- id: image_sharpness
  type: integer
  range: [-2, 8]
  property: image.sharpness
- id: illumination_sources_laser_power
  type: float
  unit: percent
  property: illumination.sources.laser.power
- id: image_window_main_position
  type: object
  properties: {x: int, y: int}
  property: image.window.main.position
- id: image_window_main_size
  type: object
  properties: {width: int, height: int}
  property: image.window.main.size
```

## Events

```yaml
# Server-to-client notifications. JSON-RPC requests from the server have no
# `id` and require no response. Source documents these notification methods
# the client must implement:
- id: property_changed
  description: Emitted when a subscribed property changes value. Params carry an array of {property: value} pairs.
  example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"illumination.state": "On"}]}}'
- id: signal_callback
  description: Emitted when a subscribed signal fires. Params carry an array of {signal: args} pairs.
  example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'
# Known signals (per source):
- id: signal_modelupdated
  description: Triggered when the introspect model changes (objects added or removed)
- id: signal_introspect_objectchanged
  description: Fires with `object` and `isnew` (true=new, false=lost) when objects are added or removed
```

## Macros

```yaml
# Multi-step procedures described explicitly in source.
- id: warp_grid_upload_and_activate
  label: Upload, Select, and Enable Warp Grid
  steps:
    - action: warp_file_upload
    - action: warp_file_select
    - action: warp_file_enable_set
    - action: warp_enable_set
  notes: "Source sequence for uploading and activating a warp grid file."

- id: blend_mask_upload_and_activate
  label: Upload, Select, and Enable Blend Mask
  steps:
    - action: blend_file_upload
    - action: blend_file_select
    - action: blend_file_enable_set

- id: blacklevel_mask_upload_and_activate
  label: Upload, Select, and Enable Black Level Mask
  steps:
    - action: blacklevel_file_upload
    - action: blacklevel_file_select
    - action: blacklevel_file_enable_set

- id: safe_power_on
  label: Safe Power-On
  steps:
    - action: system_state_get
    - check: "system.state in [standby, ready]"
    - action: power_on

- id: safe_power_off
  label: Safe Power-Off
  steps:
    - action: system_state_get
    - check: "system.state == on"
    - action: power_off

- id: wake_from_eco
  label: Wake Projector from ECO Mode
  steps:
    - action: eco_wake_serial
  notes: "Source lists four wake methods; choose one. Serial ASCII \":POWR1\\r\" is the documented JSON-RPC/serial path."
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# Source advises verifying system.state is `standby` or `ready` before power_on,
# and `on` before power_off (idempotent but no-op during state transitions).
# No explicit interlock, lockout, or hazard procedures in the source.
```

## Notes

- **Protocol:** JSON-RPC 2.0 over TCP port 9090; identical commands are also available over RS-232 serial at 19200 8N1. RS-232 also accepts the ASCII wake command `:POWR1\r` to wake from ECO.
- **Authentication:** Optional `authenticate` request with numeric `code`; not required for normal end-user access. Pass code shown in source: `98765` (example value only).
- **Property vs Method:** Properties are addressable state with `property.get`/`property.set`/`property.subscribe`. Methods are RPC calls without persistent state. The catalog at the end of the document enumerates both.
- **File endpoints:** File transfer uses HTTP POST to `/api/<path>/file/transfer` (e.g. `/api/image/processing/warp/file/transfer`). This is separate from the JSON-RPC TCP channel.
- **Object naming:** Object names use lowercase dot notation; source/connector names are normalized by stripping non-word characters and lowercasing (e.g. `DisplayPort 1` -> `displayport1`).
- **Introspection-first:** Per the source, the actual API surface depends on model and peripherals. Use `method: introspect` to enumerate objects before issuing property/method calls. Lenses without motorized zoom, for example, will not expose `optics.zoom.position`.
- **DMX modes:** Basic DMX exposes 2 channels; extended modes expose more (not enumerated in source).
- **ECO mode:** Cannot be reached via the standard power-off command; has dedicated wake-up paths (WOL, remote, keypad, serial `:POWR1\r`).
- **Source:** Barco Pulse API — "RS232 and Network Command Catalog" (refined excerpt at `docs/pdfs/barco_freya_mfusion_ip.refined.md`).

<!-- UNRESOLVED:
- Firmware version compatibility / minimum firmware for the listed API not stated in source.
- Whether Freya Mfusion specifically exposes laser vs UHP/xenon illumination not stated (introspect to discover).
- Exact set of physical connectors on Freya Mfusion not stated (introspect or image.connector.list).
- Whether DMX is present on this model not stated (introspect).
- Pass code value `98765` is shown as an example in the source; actual pass code is deployment-specific.
- ECO/Standby feature enable flags (`system.standby.enable`, `system.eco.enable`) — availability check via introspection not documented as a procedure here.
- No explicit safety/lockout/hazard procedures in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:10:08.958Z
last_checked_at: 2026-08-05T08:02:40.337Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:02:40.337Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions match source wire tokens verbatim (JSON-RPC methods, property paths, file endpoints, and serial wake command); transport fully verified. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This spec reflects the Barco Pulse API generally; Freya Mfusion-specific peripherals (e.g. which illumination sources, which connectors, which optics) are not enumerated in the source. Use introspection (`method: introspect`) to discover the actual object tree for a given unit."
- "- Firmware version compatibility / minimum firmware for the listed API not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
