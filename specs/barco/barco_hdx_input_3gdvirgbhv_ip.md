---
spec_id: admin/barco-hdx-input-3gdvirgbhv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco HDX Input 3G-DVI-RGBHV Control Spec"
manufacturer: Barco
model_family: "Barco HDX Input 3G-DVI-RGBHV"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco HDX Input 3G-DVI-RGBHV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-09T18:10:36.504Z
last_checked_at: 2026-08-19T08:38:27.737Z
generated_at: 2026-08-19T08:38:27.737Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Pulse API catalog; exact model/family confirmation, firmware compatibility, and full per-model source/connector lists not stated."
  - "absolute min/max not fixed; minpower/maxpower are dynamic per source/lens"
  - "no interlock / power-sequencing / lamp-cooldown safety procedure stated in source"
  - "model identity — source is a generic Barco Pulse API catalog and does not name \"HDX Input 3G-DVI-RGBHV\" explicitly; model mapping assumed from device/file name."
  - "firmware version compatibility not stated in source."
  - "protocol/API version number not stated in source."
  - "exact per-model source/connector lists vary; only example lists documented."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:38:27.737Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 spec actions map to JSON-RPC methods or HTTP endpoints documented in the Pulse API catalog; transport parameters verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Barco HDX Input 3G-DVI-RGBHV Control Spec

## Summary
Barco Pulse-platform projector controlled via the Pulse JSON-RPC 2.0 API. Primary control is TCP/IP on port 9090 and/or RS-232 serial (19200 baud); the same command set is available over both transports. An HTTP file-endpoint interface (under `/api`) supports upload/download of warp grids, blend masks and black-level masks.

<!-- UNRESOLVED: source is a generic Pulse API catalog; exact model/family confirmation, firmware compatibility, and full per-model source/connector lists not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # Pulse JSON-RPC service on TCP
  base_url: "http://<projector-ip>/api"  # HTTP file endpoints; host address device-specific
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: source states authentication may be skipped for normal end-user access; optional `authenticate` method (secret code) exists for elevated access levels
```

## Traits
```yaml
traits:
  - powerable      # inferred: system.poweron / system.poweroff methods present
  - queryable      # inferred: property.get queries and list methods present
  - levelable      # inferred: brightness/contrast/gamma/saturation/sharpness/laser-power settable
  - routable       # inferred: image.window.main.source selection + window position/size present
```

## Actions
```yaml
# JSON-RPC 2.0 Pulse API. Each entry below is a distinct documented operation.
# Framing/transport notes: identical commands carried over TCP:9090 and RS-232.
# `id` in examples is the JSON-RPC request id and is omitted from command templates.

# --- System / Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: "No-op if already on or in transition. Verify system.state is standby/ready first."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: "No-op if already off or in transition. Verify system.state is on first."

- id: eco_wake_serial
  label: ECO Mode Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII serial command to wake projector in ECO mode. Alternatives: WoL (MAC), IR/panel power button."

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level. Optional for normal end-user access.
  notes: "Only required for higher-than-end-user access. Returns result:true on success."

# --- Generic property framework ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<object.property>","value":<value>}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: any
      description: Property value
  notes: "Wait for confirmation before re-setting the same property (flood risk)."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<object.property>"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (or array of paths for multi-get)

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["<prop1>","<prop2>"]}}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<object.property>"}}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths)

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<object.property>"}}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths)

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<signalname>"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names)

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<signalname>"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names)

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<object>","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation); empty introspects everything
    - name: recursive
      type: boolean
      description: "true (default) = full; false = object names only (one level)"

# --- Source / connector management ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: "Returns array of source names; contents vary by model (e.g. DVI 1, DVI 2, DisplayPort 1/2, Dual DVI, Dual DisplayPort, Dual Head DVI/DisplayPort, HDBaseT, HDMI, SDI)."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.<sourcename>.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: "Source object name = source name with non-word chars removed, lowercased (e.g. 'DisplayPort 1' -> 'displayport1')"
  notes: "Returns array of connector info (name, gridposition)."

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source>"}}'
  params:
    - name: source
      type: string
      description: "Source name from image.source.list (e.g. 'DisplayPort 1', 'HDMI')"

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

# --- Image / picture ---
- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<v>}}'
  params:
    - name: v
      type: float
      description: "Normalized offset; min -1, max 1, step 1, precision 0.01; 0 = default"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":<v>}}'
  params:
    - name: v
      type: float
      description: "Normalized gain; min 0, max 2, step 1, precision 0.01; 1 = default"

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":<v>}}'
  params:
    - name: v
      type: float
      description: "min 1, max 3, step 1, precision 0.1; default 2.2"

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":<v>}}'
  params:
    - name: v
      type: float
      description: "Normalized; min 0, max 2, step 1, precision 0.01; 1 = default"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":<v>}}'
  params:
    - name: v
      type: integer
      description: "min -2, max 8, step 1, precision 1; normalized"

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"<v>"}}'
  params:
    - name: v
      type: string
      description: "Enum: DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":<x>,"y":<y>}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":<w>,"height":<h>}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scalingmode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"<v>"}}'
  params:
    - name: v
      type: string
      description: "Enum: Fill | OneToOne | FillScreen | Stretch"

# --- Color presets (P7 custom) ---
- id: color_p7_custom_copypreset
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset Custom Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_rgbmode_next
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycles through all possible RGB modes."

# --- Illumination / laser ---
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<v>}}'
  params:
    - name: v
      type: float
      description: "Target power in percent; range per minpower/maxpower (read-only, dynamic)"

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: "Engage Constant Light Output at current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Optics ---
- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"<v>"}}'
  params:
    - name: v
      type: string
      description: "Enum: Open | Closed"

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

# --- Warp ---
- id: set_warp_enable
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":<v>}}'
  params:
    - name: v
      type: boolean

- id: set_warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":<v>}}'
  params:
    - name: v
      type: boolean

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string
      description: "Warp grid file name (e.g. 'warp.xml'); MCM500/400 format"

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string
      description: Projector IP address
  notes: "HTTP file endpoint. -X POST implied with -F."

- id: download_warp_file
  label: Download Warp Grid File
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: projector-ip
      type: string
  notes: "Current grid; or append /<filename> for a specific file."

# --- Blend ---
- id: set_blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":<v>}}'
  params:
    - name: v
      type: boolean

- id: set_blend_file_selected
  label: Select Blend File(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["<file>"]}}'
  params:
    - name: file
      type: array
      description: Array of selected blend file names

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: projector-ip
      type: string
  notes: "Grayscale PNG (up to 16 bit) / JPEG / TIFF. Only blue channel used if color. Size per projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540)."

# --- Black level ---
- id: set_blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":<v>}}'
  params:
    - name: v
      type: boolean

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector-ip
      type: string
  notes: "Grayscale PNG/JPEG/TIFF; same size table as blend masks."

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: "Returns available channel names. Extended mode exposes more channels."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<v>"}}'
  params:
    - name: v
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":<v>}}'
  params:
    - name: v
      type: integer
      description: "Range 1..512"

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":<v>}}'
  params:
    - name: v
      type: boolean

# --- System state enable flags ---
- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":<v>}}'
  params:
    - name: v
      type: boolean
  notes: "Check availability first."

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":<v>}}'
  params:
    - name: v
      type: boolean
  notes: "Check availability first."

# --- Environment / diagnostics ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"<type>","valuetype":"<valuetype>"}}'
  params:
    - name: type
      type: string
      description: "Enum: Sensor | Filter | Controller | Actuator | Alarm | GenericBlock"
    - name: valuetype
      type: string
      description: "Enum: Temperature | Speed | PWM | Voltage | Current | Power | Altitude | Pressure | Humidity | ADC | Coordinate | Peltier | Waveform | Average | Delay | Difference | Interpolation | Limit | Median | Noise | Weighting | Comparison | Threshold | Formula | Driver | PID | Mode | State | Pump | Resistance | Simulation | Constant | Manual | Range | Any"
  notes: "Returns dict of sensor->reading (e.g. temperatures, fan tachos)."

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: get_alarm_state
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity, timestamp, source, description, custommessage}."

- id: get_connector_detectedsignal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.<name>.detectedsignal"}}'
  params:
    - name: name
      type: string
      description: "Connector object name, lowercased (e.g. 'displayport1', 'l1hdmi')"
  notes: "Returns active bool + timing/color info; disregard if active=false."

# --- Network ---
- id: get_network_ip4config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns components with {name, versions{available,running}, status: Unknown|OK|Upgradable}."

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Forces a component upgrade at next reboot."
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "service", "error"]
  source_property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  source_property: illumination.state

- id: active_source
  type: string
  source_property: image.window.main.source

- id: laser_power
  type: float
  source_property: illumination.sources.laser.power

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  source_property: environment.alarmstate

- id: network_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  source_property: network.device.lan.state

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  source_property: optics.shutter.position

- id: connector_detectedsignal
  type: object
  source_property: image.connector.<name>.detectedsignal
  notes: "active, name, resolution/timing, color_space, chroma_sampling, gamma_type, etc."
```

## Variables
```yaml
- id: brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  default: 0
  access: read_write

- id: contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  access: read_write

- id: gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  default: 2.2
  access: read_write

- id: saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  access: read_write

- id: sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  access: read_write

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  unit: percent
  access: read_write
  # UNRESOLVED: absolute min/max not fixed; minpower/maxpower are dynamic per source/lens

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
  access: read_write
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response to return).
- id: property_changed
  method: property.changed
  description: "Pushed when a subscribed property value changes. params.property = array of {<property>: <value>} pairs. Two notifications may fire on source change (deselect old, select new)."

- id: signal_callback
  method: signal.callback
  description: "Pushed when a subscribed signal is emitted. params.signal = array of {<signal>: {args}}."

- id: modelupdated
  method: modelupdated
  description: "Signal: object structure changed (objects added/removed). Subscribe via signal.subscribe."
```

## Macros
```yaml
# Source: Power-on best-practice sequence (programmers guide)
- id: poweron_safe
  label: Safe Power-On
  steps:
    - get_system_state                        # verify standby or ready
    - system_poweron                          # issue only if in standby/ready
  notes: "If already on or in transition, system.poweron is a no-op."

# Source: Warp grid activation sequence (warping chapter)
- id: warp_file_activate
  label: Activate Uploaded Warp File
  steps:
    - upload_warp_file                        # HTTP POST grid to /api/image/processing/warp/file/transfer
    - set_warp_file_selected                  # property.set ...file.selected
    - set_warp_file_enable                    # property.set ...file.enable = true
    - set_warp_enable                         # property.set ...warp.enable = true (global)

# Source: Blend mask activation sequence
- id: blend_file_activate
  label: Activate Uploaded Blend Mask
  steps:
    - upload_blend_mask                       # HTTP POST to /api/image/processing/blend/file/transfer
    - set_blend_file_selected
    - set_blend_file_enable                   # ...blend.file.enable = true

# Source: Black-level mask activation sequence
- id: blacklevel_file_activate
  label: Activate Uploaded Black-Level Mask
  steps:
    - upload_blacklevel_mask                  # HTTP POST to /api/image/processing/blacklevel/file/transfer
    - set_blacklevel_file_selected
    - set_blacklevel_file_enable              # ...blacklevel.file.enable = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Power-on/off are no-ops during state transitions; source recommends verifying
# system.state before issuing system.poweron (expect standby/ready) or
# system.poweroff (expect on). No explicit safety interlock procedure documented.
# <!-- UNRESOLVED: no interlock / power-sequencing / lamp-cooldown safety procedure stated in source -->
```

## Notes
- Pulse API is JSON-RPC 2.0 over TCP:9090 **and** RS-232 (19200/8/N/1/none). Same command set on both. JSON-RPC request `id` is the client request identifier (string or number); omitted from command templates above.
- Property order is irrelevant (params passed by name).
- Best practice: wait for `property.set` confirmation before re-setting the same property (flooding reduces performance).
- API is partly dynamic: available objects/properties depend on peripherals and config (e.g. motorized zoom lens, DMX extended mode). Use `introspect` to discover the exact runtime API of a specific unit.
- Source name -> object name transform: strip non-word chars, lowercase (e.g. `DisplayPort 1` -> `displayport1`).
- Source: wake-from-ECO options are WoL (MAC), IR/panel power button, or serial ASCII `:POWR1\r`.

<!-- UNRESOLVED: model identity — source is a generic Barco Pulse API catalog and does not name "HDX Input 3G-DVI-RGBHV" explicitly; model mapping assumed from device/file name. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol/API version number not stated in source. -->
<!-- UNRESOLVED: exact per-model source/connector lists vary; only example lists documented. -->
```

Spec built. Pulse JSON-RPC API — TCP:9090 + RS-232 19200/8/N/1 + HTTP file endpoints. ~60 actions covering power, sources, image, illumination, optics, warp/blend/blacklevel, DMX, firmware, environment. Power-on/warp/blend/blacklevel macros from programmers-guide sequences. Unresolved markers: model identity confirmation, firmware compat, API version, per-model source lists, dynamic laser power bounds.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-09T18:10:36.504Z
last_checked_at: 2026-08-19T08:38:27.737Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:38:27.737Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 spec actions map to JSON-RPC methods or HTTP endpoints documented in the Pulse API catalog; transport parameters verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Pulse API catalog; exact model/family confirmation, firmware compatibility, and full per-model source/connector lists not stated."
- "absolute min/max not fixed; minpower/maxpower are dynamic per source/lens"
- "no interlock / power-sequencing / lamp-cooldown safety procedure stated in source"
- "model identity — source is a generic Barco Pulse API catalog and does not name \"HDX Input 3G-DVI-RGBHV\" explicitly; model mapping assumed from device/file name."
- "firmware version compatibility not stated in source."
- "protocol/API version number not stated in source."
- "exact per-model source/connector lists vary; only example lists documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
