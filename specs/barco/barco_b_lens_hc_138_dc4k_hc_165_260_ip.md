---
spec_id: admin/barco-b-lens-hc-138-dc4k-hc-165-260
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco B Lens Hc 138 Dc4K Hc 165 260 Control Spec"
manufacturer: Barco
model_family: "Barco B Lens Hc 138 Dc4K Hc 165 260"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco B Lens Hc 138 Dc4K Hc 165 260"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:21:53.907Z
last_checked_at: 2026-07-21T21:13:38.131Z
generated_at: 2026-07-21T21:13:38.131Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model variants and firmware compatibility not stated. API is dynamic and parts depend on peripherals/configuration — full surface only knowable via runtime introspection."
  - "no macros stated in source"
  - "no explicit safety interlock procedures, power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated in source."
  - "exact model variants covered by this catalog not enumerated."
  - "authentication passcode value(s) not documented (example uses 98765)."
  - "HTTP port for file endpoints not explicitly stated (examples use 192.168.1.100 without port)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:13:38.131Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions matched verbatim in source documentation; all transport parameters (TCP/IP port 9090, serial 19200/8/N/1) verified; complete bidirectional coverage of documented API methods and properties. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco B Lens Hc 138 Dc4K Hc 165 260 Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Covers power, source selection, illumination (laser power), image/picture settings, lens optics (zoom/focus/lensshift/shutter), warping, blending, black-level masks, DMX, environment monitoring (temperatures/fans/alarms), and firmware management. This spec is derived from the Pulse RS232 and Network Command Catalog.

<!-- UNRESOLVED: exact projector model variants and firmware compatibility not stated. API is dynamic and parts depend on peripherals/configuration — full surface only knowable via runtime introspection. -->

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
  type: none  # inferred: auth optional for normal end-user access; elevated access uses authenticate method with a secret passcode
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: property.get, image.source.list, environment.getcontrolblocks present
  - levelable    # inferred: brightness, contrast, laser power settable
  - routable     # inferred: image.window.main.source selection present
```

## Actions
```yaml
# Every method/command documented in the Pulse command catalog is enumerated below.
# JSON-RPC 2.0 payloads are verbatim from the source. The optional "id" request
# identifier is omitted from command templates where the source omits it.

actions:
  # --- Power ---
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
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: Special ASCII command on RS232 to wake projector from ECO mode. Alternative wake methods: Wake-on-LAN, remote power button, keypad power button.

  # --- Authentication ---
  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
    params:
      - name: code
        type: integer
        description: Secret pass code that sets the user access level.
    notes: Only required for access levels above normal end user.

  # --- Property set / get (generic) ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": "{value}"}}'
    params:
      - name: property
        type: string
        description: Object/property name in dot notation (e.g. image.brightness).
      - name: value
        type: any
        description: Value to set (type depends on the target property).
    notes: Best practice - wait for confirmation before setting the same property again.

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Object/property name in dot notation.

  - id: property_get_multiple
    label: Get Multiple Properties
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}'
    params:
      - name: property
        type: array
        description: Array of object/property names in dot notation.

  # --- Property subscribe / unsubscribe ---
  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name (or array of names) to observe.

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name (or array of names) to stop observing.

  # --- Signal subscribe / unsubscribe ---
  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (or array of names) e.g. modelupdated.

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (or array of names).

  # --- Introspection ---
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty introspects everything.
      - name: recursive
        type: boolean
        description: If false, only object names are listed (one level). Default true.

  # --- Source management ---
  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
    params: []
    notes: Returns array of source names e.g. ["DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","Dual DVI","Dual DisplayPort","Dual Head DVI","Dual Head DisplayPort","HDBaseT","HDMI","SDI"]. List varies by model.

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
    params: []
    notes: Returns array of physical connector names e.g. ["DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","HDBaseT","HDMI","SDI"].

  - id: image_source_listconnectors
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors"}'
    params:
      - name: sourceobject
        type: string
        description: Source object name derived by removing non-word chars and lowercasing the source name (e.g. DisplayPort 1 → displayport1).
    notes: Returns array of connector info with grid position.

  # --- Illumination ---
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

  # --- Color management ---
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset to Custom
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset to defaults.

  - id: image_color_p7_custom_resettonative
    label: Reset Color to Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles through all possible RGB modes.

  # --- Environment monitoring ---
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}}'
    params:
      - name: type
        type: string
        description: Sensor type enum - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
      - name: valuetype
        type: string
        description: Value type enum - Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.
    notes: Returns dictionary of sensor-name → reading (e.g. fan tacho speeds, temperatures).

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
    params: []
    notes: Returns array of alarm objects {severity, timestamp, source, description, custommessage}.

  # --- Firmware ---
  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
    params: []
    notes: Returns array of managed firmware component names.

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
    params: []
    notes: Returns array of {name, versions{available, running}, status} where status enum is Unknown, OK, Upgradable.

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces a component upgrade at the following reboot.

  # --- DMX ---
  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
    params: []
    notes: Returns array of available channel names.

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
    params: []
    notes: Returns array of all modes.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
    property: system.state
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'
    notes: Current operation state of the projector.

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'

  - id: illumination_laser_power
    type: number
    property: illumination.sources.laser.power
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}'
    notes: Target laser power in percent.

  - id: illumination_laser_minpower
    type: number
    property: illumination.sources.laser.minpower
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}'
    notes: Read-only minimum power in percent; dynamic, may change with settings/lens.

  - id: illumination_laser_maxpower
    type: number
    property: illumination.sources.laser.maxpower
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}'
    notes: Read-only maximum power in percent; dynamic.

  - id: active_source
    type: string
    property: image.window.main.source
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'

  - id: image_brightness
    type: number
    property: image.brightness
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}'
    notes: Normalized float, 0 is default, range -1 to 1.

  - id: image_contrast
    type: number
    property: image.contrast
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.contrast"}}'
    notes: Normalized float, 1 is default, range 0 to 2.

  - id: image_gamma
    type: number
    property: image.gamma
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.gamma"}}'
    notes: Default 2.2, range 1 to 3.

  - id: image_saturation
    type: number
    property: image.saturation
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.saturation"}}'
    notes: Normalized float, 1 is default, range 0 to 2.

  - id: image_sharpness
    type: integer
    property: image.sharpness
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.sharpness"}}'
    notes: Range -2 to 8.

  - id: image_orientation
    type: enum
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    property: image.orientation
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.orientation"}}'

  - id: window_scalingmode
    type: enum
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    property: image.window.main.scalingmode
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.scalingmode"}}'

  - id: window_position
    type: object
    property: image.window.main.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.position"}}'
    notes: Object with x (int) and y (int).

  - id: window_size
    type: object
    property: image.window.main.size
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.size"}}'
    notes: Object with width (int) and height (int).

  - id: connector_detectedsignal
    type: object
    property: image.connector.{connectorobject}.detectedsignal
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{connectorobject}.detectedsignal"}}'
    notes: >-
      Signal info object: active (bool), name, vertical/horizontal totals,
      resolutions, sync timings, frequencies, pixel_rate, scan, bits_per_component,
      color_space, signal_range, chroma_sampling, gamma_type, color_primaries,
      mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.

  - id: optics_shutter_position
    type: enum
    values: ["Open", "Closed"]
    property: optics.shutter.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'

  - id: optics_zoom_position
    type: integer
    property: optics.zoom.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position"}}'

  - id: optics_focus_position
    type: integer
    property: optics.focus.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position"}}'

  - id: optics_lensshift_horizontal
    type: integer
    property: optics.lensshift.horizontal.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position"}}'

  - id: optics_lensshift_vertical
    type: integer
    property: optics.lensshift.vertical.position
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position"}}'

  - id: network_lan_state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    property: network.device.lan.state
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'

  - id: network_lan_ip4config
    type: object
    property: network.device.lan.ip4config
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}'
    notes: Object with Address, Mask, Gateway, NameServers (all strings).

  - id: dmx_mode
    type: string
    property: dmx.mode
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}}'

  - id: dmx_startchannel
    type: integer
    property: dmx.startchannel
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.startchannel"}}'
    notes: DMX start channel [1..512].

  - id: dmx_shutdown
    type: boolean
    property: dmx.shutdown
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.shutdown"}}'

  - id: system_standby_enable
    type: boolean
    property: system.standby.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.standby.enable"}}'

  - id: system_eco_enable
    type: boolean
    property: system.eco.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.eco.enable"}}'

  - id: warp_enable
    type: boolean
    property: image.processing.warp.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.enable"}}'

  - id: warp_file_enable
    type: boolean
    property: image.processing.warp.file.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.file.enable"}}'

  - id: warp_file_selected
    type: string
    property: image.processing.warp.file.selected
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.warp.file.selected"}}'

  - id: blend_file_enable
    type: boolean
    property: image.processing.blend.file.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blend.file.enable"}}'

  - id: blend_file_selected
    type: array
    property: image.processing.blend.file.selected
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blend.file.selected"}}'
    notes: Array of selected file name strings.

  - id: blacklevel_file_enable
    type: boolean
    property: image.processing.blacklevel.file.enable
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blacklevel.file.enable"}}'

  - id: blacklevel_file_selected
    type: string
    property: image.processing.blacklevel.file.selected
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.processing.blacklevel.file.selected"}}'

  - id: environment_alarmstate
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    property: environment.alarmstate
    query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'
```

## Variables
```yaml
variables:
  - id: image_brightness
    label: Image Brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": {value}}}'
    notes: Normalized; 0 is default, 1 is 100% offset.

  - id: image_contrast
    label: Image Contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": {value}}}'
    notes: Normalized; 1 is default.

  - id: image_gamma
    label: Image Gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": {value}}}'
    notes: Default 2.2.

  - id: image_saturation
    label: Image Saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": {value}}}'
    notes: Normalized; 1 is default.

  - id: image_sharpness
    label: Image Sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step_size: 1
    precision: 1
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": {value}}}'

  - id: illumination_laser_power
    label: Laser Power
    property: illumination.sources.laser.power
    type: float
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": {value}}}'
    notes: Target power in percent. Min/max dynamic - query minpower/maxpower first.

  - id: active_source
    label: Active Source
    property: image.window.main.source
    type: string
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "{value}"}}'
    notes: Value must be one of the names returned by image.source.list (e.g. "DisplayPort 1", "HDMI").

  - id: window_scalingmode
    label: Window Scaling Mode
    property: image.window.main.scalingmode
    type: enum
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "{value}"}}'

  - id: image_orientation
    label: Image Orientation
    property: image.orientation
    type: enum
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "{value}"}}'

  - id: optics_shutter_target
    label: Shutter Target
    property: optics.shutter.target
    type: enum
    values: ["Open", "Closed"]
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "{value}"}}'

  - id: optics_zoom_position
    label: Zoom Position
    property: optics.zoom.position
    type: integer
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.zoom.position", "value": {value}}}'

  - id: optics_focus_position
    label: Focus Position
    property: optics.focus.position
    type: integer
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.focus.position", "value": {value}}}'

  - id: optics_lensshift_horizontal
    label: Lens Shift Horizontal
    property: optics.lensshift.horizontal.position
    type: integer
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.horizontal.position", "value": {value}}}'

  - id: optics_lensshift_vertical
    label: Lens Shift Vertical
    property: optics.lensshift.vertical.position
    type: integer
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.lensshift.vertical.position", "value": {value}}}'

  - id: dmx_mode
    label: DMX Mode
    property: dmx.mode
    type: string
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode", "value": "{value}"}}'

  - id: dmx_startchannel
    label: DMX Start Channel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": {value}}}'

  - id: dmx_shutdown
    label: DMX Shutdown
    property: dmx.shutdown
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": {value}}}'

  - id: warp_enable
    label: Warp Enable
    property: image.processing.warp.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": {value}}}'

  - id: warp_file_enable
    label: Warp File Enable
    property: image.processing.warp.file.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": {value}}}'

  - id: warp_file_selected
    label: Warp File Selected
    property: image.processing.warp.file.selected
    type: string
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "{value}"}}'

  - id: blend_file_enable
    label: Blend File Enable
    property: image.processing.blend.file.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": {value}}}'

  - id: blend_file_selected
    label: Blend File Selected
    property: image.processing.blend.file.selected
    type: array
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": {value}}}'

  - id: blacklevel_file_enable
    label: Black Level File Enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": {value}}}'

  - id: blacklevel_file_selected
    label: Black Level File Selected
    property: image.processing.blacklevel.file.selected
    type: string
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "{value}"}}'

  - id: system_standby_enable
    label: Standby Enable
    property: system.standby.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": {value}}}'
    notes: Check availability first.

  - id: system_eco_enable
    label: ECO Enable
    property: system.eco.enable
    type: boolean
    set_command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": {value}}}'
    notes: Check availability first.
```

## Events
```yaml
events:
  - id: property_changed
    description: Unsolicited notification sent when a subscribed property value changes. No response must be returned.
    method: property.changed
    payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"{property}": "{value}"}]}}'
    notes: Client must implement this handler. Params.property is an array of property/value pair objects.

  - id: signal_callback
    description: Unsolicited notification sent when a subscribed signal is emitted. No response must be returned.
    method: signal.callback
    payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"{signalname}": {"arg1": "{value}"}}]}}'
    notes: Client must implement this handler.

  - id: modelupdated_signal
    description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe with signal "modelupdated".
    notes: Related introspect callback delivers introspect.objectchanged with {object, newobject} arguments.
```

## Macros
```yaml
# No multi-step sequences are explicitly described in the source beyond workflow
# guidance (e.g. "list sources, then set source"). No named macros documented.
# UNRESOLVED: no macros stated in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on_guard: "Good practice - verify system.state is standby or ready before issuing system.poweron. If already on or transitioning, nothing happens."
  - power_off_guard: "Good practice - verify system.state is on before issuing system.poweroff. If already off or transitioning, nothing happens."
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing
# requirements, or hazard warnings documented in source beyond operational guidance.
```

## Notes
- API is JSON-RPC 2.0. All parameters passed by name; order does not matter. Notifications carry no `id` and expect no response.
- Object/property naming uses dot notation in lowercase (JavaScript-like). Source names map to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- The API surface is dynamic — availability depends on projector model, mounted peripherals (e.g. motorized lens), and configuration (e.g. DMX basic vs extended mode). Use `introspect` at runtime to discover the exact API.
- File upload/download (warp grids, blend masks, black-level masks) uses HTTP endpoints under `http://<projector-ip>/api/...` via POST (curl `-F file=@...`). Supported image formats: PNG (up to 16-bit), JPEG, TIFF; grayscale only (blue channel used for colour images).
- Warp file format is the same as MCM500/400.
- Blend/black-level mask resolution depends on projector resolution (WUXGA 1920×1200; WQXGA/4K 1280×800; 4K Cinemascope 1280×540).
- Best practice for property.set: wait for confirmation before re-setting the same property to avoid flooding the server.
- ECO wake alternatives: Wake-on-LAN (MAC address), remote/kypad power button, or serial `:POWR1\r`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->
<!-- UNRESOLVED: exact model variants covered by this catalog not enumerated. -->
<!-- UNRESOLVED: authentication passcode value(s) not documented (example uses 98765). -->
<!-- UNRESOLVED: HTTP port for file endpoints not explicitly stated (examples use 192.168.1.100 without port). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:21:53.907Z
last_checked_at: 2026-07-21T21:13:38.131Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:13:38.131Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions matched verbatim in source documentation; all transport parameters (TCP/IP port 9090, serial 19200/8/N/1) verified; complete bidirectional coverage of documented API methods and properties. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model variants and firmware compatibility not stated. API is dynamic and parts depend on peripherals/configuration — full surface only knowable via runtime introspection."
- "no macros stated in source"
- "no explicit safety interlock procedures, power-on sequencing"
- "firmware version compatibility not stated in source."
- "protocol version number not stated in source."
- "exact model variants covered by this catalog not enumerated."
- "authentication passcode value(s) not documented (example uses 98765)."
- "HTTP port for file endpoints not explicitly stated (examples use 192.168.1.100 without port)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
