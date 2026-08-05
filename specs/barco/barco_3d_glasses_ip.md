---
spec_id: admin/barco-pulse-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: "Pulse Projector"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Pulse Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:08:12.057Z
last_checked_at: 2026-07-21T20:46:28.099Z
generated_at: 2026-07-21T20:46:28.099Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific projector model not stated; device-name token in input (\"3D Glasses\") conflicts with source content (Pulse projector)."
  - "WoL packet format not detailed in source"
  - "no formal interlock or power-sequencing table provided in source."
  - "input device name was \"Barco 3D Glasses\" but source content is the Pulse projector JSON-RPC API. Spec authored against actual source content; operator should reconcile entity_id/spec_id naming."
  - "specific Pulse model not stated; source says \"Pulse projectors\" generically."
  - "firmware version compatibility not stated."
  - "WoL packet format for ECO wake not detailed."
  - "source names a connector property \"image.connector.l1hdmi.detectedsignal\" but body examples reference \"displayport1\" — exact connector object names are model-dependent and not enumerated."
  - "authentication pass code value (98765) is an example, not a default."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:46:28.099Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 actions have direct method/command matches in source; transport parameters (TCP 9090, serial 19200/8N1) verified; JSON-RPC methods, settable properties, file upload endpoints, and RS-232 commands all present and match spec declarations. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-18
---

# Barco Pulse Projector Control Spec

## Summary
JSON-RPC 2.0 API ("Pulse") for Barco Pulse projectors. Two transports: TCP/IP on port 9090 and RS-232 serial (19200 baud). Covers power, sources, illumination, image, optics, warp/blend/blacklevel files, environment telemetry, DMX, firmware.

<!-- UNRESOLVED: specific projector model not stated; device-name token in input ("3D Glasses") conflicts with source content (Pulse projector). -->

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
  type: passcode  # source describes authenticate method with secret code; access level elevation optional
```

## Traits
```yaml
# inferred from documented commands:
# - powerable     (system.poweron / system.poweroff)
# - queryable     (property.get across many properties)
# - routable      (image.window.main.source selection)
# - levelable     (image.brightness/contrast/gamma/saturation/sharpness, illumination power)
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# Each entry = one documented JSON-RPC method or one settable property target
# (source lists each property as a separate row). Commands verbatim from source.

# --- System / Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: ECO Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII string on RS232 to wake from ECO mode

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765 shown in source)

# --- Introspection ---
- id: introspect_recursive
  label: Introspect (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty = all
    - name: recursive
      type: boolean
      description: If false, only one level listed

- id: introspect_nonrecursive
  label: Introspect (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["motors", false], "id": 2}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

# --- Property methods (generic) ---
- id: property_set
  label: Property Set
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "objectname.propertyname", "value": 100}}'
  params:
    - name: property
      type: string
    - name: value
      type: any
  notes: Wait for confirmation before setting same property again

- id: property_get
  label: Property Get
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "objectname.propertyname"}}'
  params:
    - name: property
      type: string

- id: property_get_multi
  label: Property Get Multiple
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 5}'
  params:
    - name: property
      type: array
      description: List of property names

- id: property_subscribe
  label: Property Subscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.brightness"}}'
  params:
    - name: property
      type: string  # also accepts array

- id: property_subscribe_multi
  label: Property Subscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness", "image.contrast"]}}'
  params:
    - name: property
      type: array

- id: property_unsubscribe
  label: Property Unsubscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "image.brightness"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Property Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["image.brightness", "image.contrast"]}}'
  params:
    - name: property
      type: array

# --- Signal methods ---
- id: signal_subscribe
  label: Signal Subscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "modelupdated"}}'
  params:
    - name: signal
      type: string

- id: signal_subscribe_multi
  label: Signal Subscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array

- id: signal_unsubscribe
  label: Signal Unsubscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "modelupdated"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multi
  label: Signal Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"]}}'
  params:
    - name: signal
      type: array

# --- Image source / connector ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_listconnectors
  label: Source List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors", "id": 4}'
  params:
    - name: sourcename
      type: string
      description: Source name lowercased with non-word chars removed (e.g. displayport1)

# --- Environment ---
- id: environment_getcontrolblocks
  label: Environment Get Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}, "id": 18}'
  params:
    - name: type
      type: string
      description: 'One of: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

# --- DMX ---
- id: dmx_listchannels
  label: DMX List Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: DMX List Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces upgrade at next reboot

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engage CLO at current light level

- id: illumination_laser_getserialnumber
  label: Laser Get Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

# --- Image color ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": ""}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": ""}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

# --- LED (from example) ---
- id: ledctrl_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "systemstatus", "color": "red", "period": 42}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

# --- Settable properties (each documented property = one set action) ---
- id: set_image_window_main_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1"}}'
  params:
    - name: value
      type: string
      description: 'Source name. Examples: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI'

- id: set_image_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15}}'
  params:
    - name: value
      type: float
      description: Min -1, Max 1, Step 1, Precision 0.01

- id: set_image_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast"}}'
  params:
    - name: value
      type: float
      description: Min 0, Max 2, Step 1, Precision 0.01

- id: set_image_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma"}}'
  params:
    - name: value
      type: float
      description: Min 1, Max 3, Step 1, Precision 0.1. Default 2.2

- id: set_image_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation"}}'
  params:
    - name: value
      type: float
      description: Min 0, Max 2, Step 1, Precision 0.01

- id: set_image_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness"}}'
  params:
    - name: value
      type: integer
      description: Min -2, Max 8, Step 1, Precision 1

- id: set_image_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation"}}'
  params:
    - name: value
      type: string
      description: 'One of: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR'

- id: set_image_window_main_scalingmode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode"}}'
  params:
    - name: value
      type: string
      description: 'One of: Fill, OneToOne, FillScreen, Stretch'

- id: set_image_window_main_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position"}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_image_window_main_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size"}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_illumination_sources_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40}}'
  params:
    - name: value
      type: float
      description: Target power in percent

- id: set_image_processing_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_image_processing_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_image_processing_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}}'
  params:
    - name: value
      type: string

- id: set_image_processing_blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_image_processing_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}}'
  params:
    - name: value
      type: string

- id: set_image_processing_blacklevel_file_enable
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_image_processing_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}}'
  params:
    - name: value
      type: string

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode"}}'
  params:
    - name: value
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel"}}'
  params:
    - name: value
      type: integer
      description: 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown"}}'
  params:
    - name: value
      type: boolean

- id: set_optics_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.position"}}'
  params:
    - name: value
      type: string
      description: 'One of: Open, Closed'

- id: set_optics_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target"}}'
  params:
    - name: value
      type: string
      description: 'One of: Open, Closed'

- id: set_system_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable"}}'
  params:
    - name: value
      type: boolean

- id: set_system_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable"}}'
  params:
    - name: value
      type: boolean

# --- File upload (HTTP) ---
- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector_ip
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector_ip
      type: string
```

## Feedbacks
```yaml
# Each documented property.get target and property.changed notification
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: illumination_sources_laser_power
  type: number

- id: illumination_sources_laser_minpower
  type: number

- id: illumination_sources_laser_maxpower
  type: number

- id: image_window_main_source
  type: string

- id: image_window_main_position
  type: object
  values: [{x: int, y: int}]

- id: image_window_main_size
  type: object
  values: [{width: int, height: int}]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  type: number
  range: [-1, 1]

- id: image_contrast
  type: number
  range: [0, 2]

- id: image_gamma
  type: number
  range: [1, 3]

- id: image_saturation
  type: number
  range: [0, 2]

- id: image_sharpness
  type: integer
  range: [-2, 8]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: detectedsignal
  type: object
  description: image.connector.{name}.detectedsignal - signal info struct
  fields: [active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode]

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  fields: [Address, Mask, Gateway, NameServers]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

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

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
```

## Variables
```yaml
# Properties with ranges exposed as variables (already represented as Feedbacks above).
# Source treats them as property.get/property.set; nothing additional to model here.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications from server (no id, no response expected).
- id: property_changed
  description: property.changed - array of property/value pairs
  payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"image.brightness": 0.15}]}}'

- id: signal_callback
  description: signal.callback - array of signal/argument-list pairs
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'

- id: modelupdated_signal
  description: Triggered when object structure changes (objects added/removed)
```

## Macros
```yaml
# Source describes a multi-step "ECO mode wake" procedure:
- id: eco_mode_wake
  description: Wake projector from ECO mode
  steps:
    - option_a: Send wake-on-LAN request with projector MAC address
    - option_b: Press power button on remote
    - option_c: Press power button on keypad
    - option_d: Send ':POWR1\r' on RS232 serial
  # UNRESOLVED: WoL packet format not detailed in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: poweron_state_check
    description: Source recommends verifying system.state is standby or ready before issuing system.poweron; if already on or transitioning, nothing happens.
  - id: poweroff_state_check
    description: Source recommends verifying system.state is on before issuing system.poweroff.
  - id: property_set_wait
    description: Best practice - wait for property.set confirmation before re-setting same property; flooding may degrade server performance.
# UNRESOLVED: no formal interlock or power-sequencing table provided in source.
```

## Notes
- API is JSON-RPC 2.0 over TCP (port 9090) and RS-232 (19200/8N1, no flow control).
- Object/property naming is dot notation, lowercase, JavaScript-like.
- API surface is partially dynamic — actual objects depend on projector config (lens, peripherals). Best practise is to introspect.
- Warp file format shared with MCM500/400.
- Supported image upload formats: PNG (up to 16-bit), JPEG, TIFF. Only grayscale/blue channel used.
- Blend/black-level mask sizes vary by projector resolution (WUXGA/WQXGA/4K/4K Cinemascope).
- DMX has basic mode (2 channels) and extended mode (more channels exposed).

<!-- UNRESOLVED: input device name was "Barco 3D Glasses" but source content is the Pulse projector JSON-RPC API. Spec authored against actual source content; operator should reconcile entity_id/spec_id naming. -->
<!-- UNRESOLVED: specific Pulse model not stated; source says "Pulse projectors" generically. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: WoL packet format for ECO wake not detailed. -->
<!-- UNRESOLVED: source names a connector property "image.connector.l1hdmi.detectedsignal" but body examples reference "displayport1" — exact connector object names are model-dependent and not enumerated. -->
<!-- UNRESOLVED: authentication pass code value (98765) is an example, not a default. -->
````

Self-check pass: no voltage/current/power invented, port 9090 + baud 19200 verbatim from source, status/confidence/derived_from correct, entity_id placeholder kept, UNRESOLVED markers on all gaps.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-18T06:08:12.057Z
last_checked_at: 2026-07-21T20:46:28.099Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:46:28.099Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 actions have direct method/command matches in source; transport parameters (TCP 9090, serial 19200/8N1) verified; JSON-RPC methods, settable properties, file upload endpoints, and RS-232 commands all present and match spec declarations. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific projector model not stated; device-name token in input (\"3D Glasses\") conflicts with source content (Pulse projector)."
- "WoL packet format not detailed in source"
- "no formal interlock or power-sequencing table provided in source."
- "input device name was \"Barco 3D Glasses\" but source content is the Pulse projector JSON-RPC API. Spec authored against actual source content; operator should reconcile entity_id/spec_id naming."
- "specific Pulse model not stated; source says \"Pulse projectors\" generically."
- "firmware version compatibility not stated."
- "WoL packet format for ECO wake not detailed."
- "source names a connector property \"image.connector.l1hdmi.detectedsignal\" but body examples reference \"displayport1\" — exact connector object names are model-dependent and not enumerated."
- "authentication pass code value (98765) is an example, not a default."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
