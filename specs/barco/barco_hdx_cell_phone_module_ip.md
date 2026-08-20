---
spec_id: admin/barco-hdx-cell-phone-module
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Hdx Cell Phone Module Control Spec"
manufacturer: Barco
model_family: "Barco Hdx Cell Phone Module"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Hdx Cell Phone Module"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:13:11.366Z
last_checked_at: 2026-08-19T08:36:20.098Z
generated_at: 2026-08-19T08:36:20.098Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model and firmware version not stated in source. The device name \"Hdx Cell Phone Module\" does not appear in the document body; the document is the generic Barco Pulse projector API reference. DMX extended-mode channels and per-lens optics ranges are dynamic and must be read via introspection."
  - "full per-sensor environment feedback dictionaries are dynamic; read via environment.getcontrolblocks."
  - "no explicit multi-step named macros described in source beyond procedural"
  - "source contains no explicit interlock procedures or power-sequencing safety warnings beyond the operational notes above."
  - "firmware version compatibility not stated in source."
  - "exact projector model/family not confirmed — document is the generic Barco Pulse API reference."
  - "authentication pass-code format/token scope not specified beyond an integer example."
  - "per-connector object names beyond documented examples are dynamic (read via introspection)."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:36:20.098Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions found verbatim in source as JSON-RPC methods, property paths, or HTTP endpoints; transport values literal. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco Hdx Cell Phone Module Control Spec

## Summary
Barco projector controlled via the Pulse API, a JSON-RPC 2.0 interface. The service is reachable over TCP/IP on port 9090 and over an RS-232 serial link (19200 baud, 8N1, no flow control). This spec covers power control, source selection, illumination/laser power, picture settings, warp/blend/black-level file handling, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring, firmware management, and the introspection/subcription APIs.

<!-- UNRESOLVED: exact projector model and firmware version not stated in source. The device name "Hdx Cell Phone Module" does not appear in the document body; the document is the generic Barco Pulse projector API reference. DMX extended-mode channels and per-lens optics ranges are dynamic and must be read via introspection. -->

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
  type: optional  # source describes an `authenticate` method with a pass code; auth is only required for access levels above normal end user
```

**Notes on transport:** The source states "TCP/IP can be used to connect to Pulse services. The service is available on port number 9090." It also documents a standard 9-pin RS-232 serial cable (pin 2-2, 3-3, 5-5) with the parameters above. Some file operations (warp grid / blend mask / black-level mask upload/download) additionally use HTTP `POST`/`GET` at `http://<projector-ip>/api/...` endpoints.

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: property.get, image.source.list, environment.getcontrolblocks present
  - routable     # inferred: image.window.main.source selection present
  - levelable    # inferred: brightness/contrast/gamma/saturation/sharpness/laser power present
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 over the TCP/serial Pulse service unless noted.
# The `id` field is the client request identifier and is omitted or shown as an
# example value; it is not part of the command semantics.

# --- Power / state ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: Wake from ECO Mode (serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII command sent on the RS-232 serial port to wake a projector in ECO/power-save mode.

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code that sets the user access level.
  notes: Only required for access levels above normal end user.

# --- Source / connector management ---
- id: select_source_displayport1
  label: Select DisplayPort 1 as Input Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params: []

- id: select_source_hdmi
  label: Select HDMI as Input Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"HDMI"}}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DVI 1", "HDMI", "DisplayPort 1", "SDI", "HDBaseT").

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used by a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{objectname}.listconnectors"}'
  params:
    - name: objectname
      type: string
      description: Source object name = source name with non-word chars removed, lowercased (e.g. "displayport1").

# --- Generic property / signal / introspection verbs ---
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{objectname.propertyname}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation.
    - name: value
      type: any
      description: Value to set (type depends on the property).
  notes: Best practice to wait for confirmation before setting the same property again.

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{objectname.propertyname}"}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation.

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property paths to read in one request.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{objectname.propertyname}"}}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths) to observe.

- id: property_subscribe_multiple
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array
      description: Array of property paths to observe.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{objectname.propertyname}"}}'
  params:
    - name: property
      type: string
      description: Property path (or array of paths) to stop observing.

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property
      type: array

- id: signal_subscribe
  label: Subscribe to a Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signalname}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names).

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal
      type: array

- id: signal_unsubscribe
  label: Unsubscribe from a Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signalname}"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal
      type: array

- id: introspect_recursive
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{objectname}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty/default introspects everything.

- id: introspect_nonrecursive
  label: Introspect Object (one level)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{objectname}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name; only immediate child object names are listed.

# --- Example method invocation (documented in source) ---
- id: ledctrl_blink
  label: Blink LED (documented example)
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

# --- Illumination / laser ---
- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: float
      description: Target power in percent (between minpower and maxpower).

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: get_laser_minpower
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# --- Picture settings ---
- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized offset, min -1 max 1, default 0, step (step-size 1 x precision 0.01).

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized gain, min 0 max 2, default 1, precision 0.01.

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Default 2.2, min 1 max 3, precision 0.1.

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized, min 0 max 2, default 1, precision 0.01.

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Normalized, min -2 max 8, precision 1.

- id: set_image_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":{value}}}'
  params:
    - name: value
      type: string
      description: "Enum: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR."

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":{value}}}'
  params:
    - name: value
      type: string
      description: "Enum: Fill, OneToOne, FillScreen, Stretch."

# --- Warp ---
- id: warp_enable
  label: Enable All Warp Functions
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML file.
    - name: projector-ip
      type: string
  notes: HTTP upload; warp file format is the same as on the MCM500/400.

# --- Blend ---
- id: blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Grayscale PNG/JPEG/TIFF (8 or 16 bit); blue channel used if color.
    - name: projector-ip
      type: string
  notes: Mask resolution must match projector blend layer (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).

# --- Black level ---
- id: blacklevel_file_enable
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Grayscale PNG/JPEG/TIFF (8 or 16 bit); blue channel used if color.
    - name: projector-ip
      type: string

# --- Optics ---
- id: set_shutter_position
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: "Enum: Open, Closed."

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: "Enum: Open, Closed."

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_horizontal
  label: Set Lens Shift Horizontal Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{value}}}'
  params:
    - name: value
      type: integer

- id: set_lensshift_vertical
  label: Set Lens Shift Vertical Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{value}}}'
  params:
    - name: value
      type: integer

# --- DMX ---
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'
  params:
    - name: value
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
  params:
    - name: value
      type: integer
      description: DMX start channel [1..512].

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
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

# --- System standby / eco ---
- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
  notes: Check availability first.

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
  notes: Check availability first.

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: "Enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "Enum: Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode."
  notes: Returns a dictionary of sensor name -> reading. Examples documented: temperature sensors (laser banks/heatsinks/mainboard/etc.) and fan tacho speeds (ar1-5, driver, optics, pcb, phosphor, psu).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of {severity, timestamp, source, description, custommessage}.

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
  notes: Returns components with {name, versions:{available, running}, status} where status enum is Unknown, OK, Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot.

# --- Color ---
- id: color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
  notes: Resets preset back to its default values.

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
  notes: Cycles through all possible RGB modes.
```

## Feedbacks
```yaml
# Observable state values returned by queries / change notifications.

- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state

- id: active_source
  type: string
  property: image.window.main.source

- id: laser_power
  type: float
  property: illumination.sources.laser.power

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  property: environment.alarmstate

- id: network_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  property: network.device.lan.state

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  property: optics.shutter.position

- id: connector_detectedsignal
  type: object
  property: image.connector.{name}.detectedsignal
  notes: Object with active(bool), name, timing totals/resolutions/porches/sync, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.

# UNRESOLVED: full per-sensor environment feedback dictionaries are dynamic; read via environment.getcontrolblocks.
```

## Variables
```yaml
# Settable parameters exposed as properties (set via property.set).

- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  default: 0
  precision: 0.01

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  default: 2.2
  precision: 0.1

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  default: 1
  precision: 0.01

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  precision: 1

- id: laser_power_var
  property: illumination.sources.laser.power
  type: float
  unit: percent
  min_property: illumination.sources.laser.minpower
  max_property: illumination.sources.laser.maxpower

- id: zoom_position
  property: optics.zoom.position
  type: integer

- id: focus_position
  property: optics.focus.position
  type: integer

- id: lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer

- id: lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; no response to return).

- id: property_changed
  method: property.changed
  description: Sent whenever a subscribed property value changes. params.property is an array of {property: value} objects.

- id: signal_callback
  method: signal.callback
  description: Sent when a subscribed signal is emitted. params.signal is an array of {signal: {args}} objects.

- id: modelupdated
  method: modelupdated  # delivered via signal.callback
  description: Triggered when the object structure changes (objects added or removed).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step named macros described in source beyond procedural
# guidance (e.g. wake-from-ECO, upload-then-select-then-enable warp/blend/blacklevel files).
# Those sequences are documented as steps, not packaged macros, so omitted.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "Power on is a no-op if projector is already on or in a state transition; verify system.state is standby or ready before issuing system.poweron."
  - "Power off is a no-op if projector is already off or transitioning; verify system.state is on before issuing system.poweroff."
  - "Waking from ECO mode requires Wake-on-LAN (MAC address), IR/keypad power button, or the special RS-232 command :POWR1\\r."
  - "Continuously setting the same property without waiting for confirmation may flood the server and reduce performance."
# UNRESOLVED: source contains no explicit interlock procedures or power-sequencing safety warnings beyond the operational notes above.
```

## Notes
- The API is partly dynamic: available objects/properties depend on peripherals and configuration (e.g. motorized zoom lens, DMX extended mode). Use `introspect` to discover the exact API of a given projector.
- Object/member names use dot notation, lowercase (JavaScript-like). Multiple objects of a kind are modeled as collections (e.g. `tempctrl.fans.mainfan`).
- All JSON-RPC params are passed by name; order does not matter.
- Source-name to object-name translation: strip non-word characters and lowercase (e.g. "DisplayPort 1" -> "displayport1").
- File upload/download endpoints are reached via HTTP at `http://<projector-ip>/api/...` (e.g. `/api/image/processing/warp/file/transfer`).
- Subscriptions only deliver change notifications; to read the current value use `property.get`.
- When switching sources, two `property.changed` notifications are sent: first clearing the previous source, then setting the new one.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact projector model/family not confirmed — document is the generic Barco Pulse API reference. -->
<!-- UNRESOLVED: authentication pass-code format/token scope not specified beyond an integer example. -->
<!-- UNRESOLVED: per-connector object names beyond documented examples are dynamic (read via introspection). -->
````

Spec written. JSON-RRC Pulse API, ~70 actions covering power, source routing, illumination, picture, warp/blend/blacklevel, optics, DMX, environment, firmware, color + introspection. Port 9090 + RS-232 19200 8N1 verbatim from source. All gaps marked `UNRESOLVED`. No invented voltages/ports/baud.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:13:11.366Z
last_checked_at: 2026-08-19T08:36:20.098Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:36:20.098Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions found verbatim in source as JSON-RPC methods, property paths, or HTTP endpoints; transport values literal. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model and firmware version not stated in source. The device name \"Hdx Cell Phone Module\" does not appear in the document body; the document is the generic Barco Pulse projector API reference. DMX extended-mode channels and per-lens optics ranges are dynamic and must be read via introspection."
- "full per-sensor environment feedback dictionaries are dynamic; read via environment.getcontrolblocks."
- "no explicit multi-step named macros described in source beyond procedural"
- "source contains no explicit interlock procedures or power-sequencing safety warnings beyond the operational notes above."
- "firmware version compatibility not stated in source."
- "exact projector model/family not confirmed — document is the generic Barco Pulse API reference."
- "authentication pass-code format/token scope not specified beyond an integer example."
- "per-connector object names beyond documented examples are dynamic (read via introspection)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
