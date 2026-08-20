---
spec_id: admin/barco-ibx1-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ibx1 2 Control Spec"
manufacturer: Barco
model_family: "Ibx1 2"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Ibx1 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:05:18.701Z
last_checked_at: 2026-08-19T08:39:06.454Z
generated_at: 2026-08-19T08:39:06.454Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not confirm Ibx1 2 model name explicitly (refined doc references \"Pulse projectors\"); using requested device name."
  - "no explicit multi-step sequences described in source."
  - "source does not contain explicit hazard warnings or electrical safety interlocks."
  - "source refined doc is generic \"Pulse API\" with no explicit Ibx1 2 model identifier; specific connector list / illumination type for Ibx1 2 not confirmed in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:39:06.454Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec action units (JSON-RPC methods, property paths, HTTP file endpoints, RS-232 ECO wake) appear verbatim in the source; transport parameters (port 9090, 192008N1) match source table; spec covers the full Pulse API surface documented in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Ibx1 2 Control Spec

## Summary
Pulse API control spec for Barco Ibx1 2 projector. Device exposes JSON-RPC 2.0 over TCP port 9090 and a RS-232 serial interface at 19200 baud. Source describes full Pulse API surface (system, image, illumination, optics, environment, dmx, firmware, file endpoints).

<!-- UNRESOLVED: source does not confirm Ibx1 2 model name explicitly (refined doc references "Pulse projectors"); using requested device name. -->

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
  type: passcode  # source documents optional authenticate() with numeric code; "normal end user" access skips auth
```

## Traits
```yaml
# Inferred from source-documented command examples
- powerable  # inferred from system.poweron/system.poweroff methods
- queryable  # inferred from property.get/environment.getcontrolblocks examples
- routable  # inferred from image.window.main.source selection examples
- levelable  # inferred from illumination.sources.laser.power, image.brightness/contrast/saturation/gamma/sharpness
```

## Actions
```yaml
# --- Authentication ---
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Numeric pass code granting elevated user level
  notes: Optional. Normal end-user access does not require authentication.

# --- System / Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: Verify system.state is "standby" or "ready" before issuing. Returns null result.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: Verify system.state is "on" before issuing. Returns null result.

- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []
  notes: Returns one of: boot, eco, standby, ready, conditioning, on, deconditioning, service, error.

- id: system_state_subscribe
  label: Subscribe System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: system_standby_enable_set
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: system_eco_enable_set
  label: Set ECO Mode Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean

# --- LED control ---
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color name (e.g. "red")
    - name: period
      type: integer
      description: Blink period

# --- Sources ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []
  notes: Returns array of source names; varies by projector model.

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")
  notes: Best practice - wait for property.set confirmation before issuing another set on same property.

- id: image_window_main_source_subscribe
  label: Subscribe Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"}}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []
  notes: Returns array of physical connector names; varies by projector model.

- id: image_source_displayport1_listconnectors
  label: List Connectors for Source (DisplayPort 1 example)
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors"}'
  params: []
  notes: Source object name = source name with non-word chars removed and lowercased (e.g. "DisplayPort 1" -> "displayport1").

# --- Window geometry ---
- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: value
      type: object

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":0,"height":0}}}'
  params:
    - name: value
      type: object

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: enum
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: enum
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

# --- Picture settings ---
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []
  notes: Normalized; 0 = default, 1 = 100% offset. Range -1..1, step 0.01.

- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15}}'
  params:
    - name: value
      type: float
      description: Normalized -1..1; default 0

- id: image_brightness_subscribe
  label: Subscribe Brightness Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"}}'
  params: []

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0}}'
  params:
    - name: value
      type: float
      description: Normalized 0..2; default 1

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: Range 1..3; default 2.2

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0}}'
  params:
    - name: value
      type: float
      description: Normalized 0..2; default 1

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: Range -2..8

# --- Color ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

# --- Illumination ---
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []
  notes: Returns "On" or "Off".

- id: illumination_state_subscribe
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_sources_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []
  notes: Returns percent value.

- id: illumination_sources_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40}}'
  params:
    - name: value
      type: integer
      description: Target power in percent. Check minpower/maxpower first.

- id: illumination_sources_laser_minpower_get
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: illumination_sources_laser_maxpower_get
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Optics ---
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []
  notes: Returns "Open" or "Closed".

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: enum
      description: "Open" or "Closed"

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

# --- Warp ---
- id: image_processing_warp_enable_set
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
  params:
    - name: value
      type: string
      description: Filename of uploaded warp file

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: ip
      type: string
      description: Projector IPv4 address
  notes: HTTP file endpoint. -X POST optional with -F.

# --- Blend ---
- id: image_processing_blend_file_enable_set
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: image_processing_blend_file_selected_set
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
  params:
    - name: value
      type: array
      description: Filenames of selected blend mask files

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: ip
      type: string

# --- Black level ---
- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
  params:
    - name: value
      type: string

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: ip
      type: string

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params:
    - name: type
      type: enum
      description: One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: enum
      description: One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any
  notes: Returns dict of sensor-key → float value.

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []
  notes: Returns one of Fatal, Error, Alert, Warning, Ok.

# --- Network ---
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []
  notes: Returns CONNECTED or DISCONNECTED.

# --- DMX ---
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""}}'
  params:
    - name: value
      type: string
      description: DMX mode name

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: Range 1..512

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true}}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces upgrade at next reboot.

# --- Introspection ---
- id: introspect_recursive
  label: Introspect (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true}}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: introspect_nonrecursive
  label: Introspect (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false}}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

# --- Property batch ops ---
- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array
      description: List of property names

- id: property_subscribe_multiple
  label: Subscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array

- id: property_unsubscribe_one
  label: Unsubscribe One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]}}'
  params:
    - name: property
      type: array

# --- Signals (subscribe/unsubscribe) ---
- id: signal_subscribe_one
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array

- id: signal_unsubscribe_one
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array

# --- ECO wake (RS-232 only) ---
- id: serial_wake_from_eco
  label: Wake Projector from ECO (Serial)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: Send via RS-232 serial port to wake projector from ECO/power-save mode. ASCII string, 6 bytes + CR.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_connector_detectedsignal
  type: object
  description: Detailed timing/format info for active input signal

- id: environment_temperature_readings
  type: object
  description: Dict of sensor name -> Celsius float

- id: environment_fan_readings
  type: object
  description: Dict of fan name -> RPM float

- id: firmware_component_versions
  type: object
  description: Per-component name, available, running, status (Unknown/OK/Upgradable)
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  description: Normalized image brightness/offset

- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  description: Normalized contrast/gain

- id: image_gamma
  type: float
  range: [1, 3]
  default: 2.2
  description: Image gamma

- id: image_saturation
  type: float
  range: [0, 2]
  default: 1
  description: Normalized color saturation

- id: image_sharpness
  type: integer
  range: [-2, 8]
  default: 0
  description: Normalized image sharpness

- id: illumination_sources_laser_power
  type: integer
  range: [illumination_sources_laser_minpower, illumination_sources_laser_maxpower]
  description: Laser power in percent

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: dmx_startchannel
  type: integer
  range: [1, 512]
```

## Events
```yaml
- id: property_changed
  description: Server pushes {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<name>": <value>}]}}
  payload_format: jsonrpc

- id: signal_callback
  description: Server pushes {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<name>":{"arg":...}}]}}
  payload_format: jsonrpc

- id: modelupdated
  description: Signal triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - system.poweron
  # Source advises verifying system.state before issuing power commands; projector in transition ignores commands.
interlocks:
  - "Verify system.state is 'standby' or 'ready' before system.poweron"
  - "Verify system.state is 'on' before system.poweroff"
# UNRESOLVED: source does not contain explicit hazard warnings or electrical safety interlocks.
```

## Notes
- All Pulse API JSON-RPC commands use TCP port 9090. Same command set available over RS-232 (19200 baud, 8N1) per source.
- Param order in `params` object is irrelevant (named parameters).
- property.set returns `result: true` on success; client should wait for confirmation before issuing another set on the same property to avoid flooding.
- Source explicitly notes the API surface is dynamic and depends on peripherals/configuration — introspection is the authoritative way to enumerate available objects.
- File endpoints use HTTP POST to `http://<projector-ip>/api/<path>` (curl example). The `/api` base is consistent across warp/blend/blacklevel endpoints.
- ECO wake on RS-232 uses the literal ASCII command `:POWR1\r` (note: appears inconsistent with the JSON-RPC `system.poweron` method — keep both verbatim).
- Wake-on-LAN (MAC address) and physical power buttons are alternative ways to wake from ECO.

<!-- UNRESOLVED: source refined doc is generic "Pulse API" with no explicit Ibx1 2 model identifier; specific connector list / illumination type for Ibx1 2 not confirmed in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:05:18.701Z
last_checked_at: 2026-08-19T08:39:06.454Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:39:06.454Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec action units (JSON-RPC methods, property paths, HTTP file endpoints, RS-232 ECO wake) appear verbatim in the source; transport parameters (port 9090, 192008N1) match source table; spec covers the full Pulse API surface documented in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not confirm Ibx1 2 model name explicitly (refined doc references \"Pulse projectors\"); using requested device name."
- "no explicit multi-step sequences described in source."
- "source does not contain explicit hazard warnings or electrical safety interlocks."
- "source refined doc is generic \"Pulse API\" with no explicit Ibx1 2 model identifier; specific connector list / illumination type for Ibx1 2 not confirmed in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
