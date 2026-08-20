---
spec_id: admin/barco-gld-143m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gld 143M Control Spec"
manufacturer: Barco
model_family: "Gld 143M"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Gld 143M"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:25:24.140Z
last_checked_at: 2026-08-19T08:29:32.924Z
generated_at: 2026-08-19T08:29:32.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is the generic Pulse API catalog; exact feature availability for the Gld 143M model depends on its configuration (lens, peripherals). The source recommends runtime introspection to confirm the precise API surface."
  - "params for selecting component not specified in source"
  - "exact enum value sets for scan, color_space, chroma_sampling sub-fields partially listed in source (signal_range 0-255/16-235; chroma_sampling 4:4:4/4:2:2/4:2:0; gamma_type POWER/sRGB/REC_BT1886/SMPTE_ST2084; color_primaries REC709/REC2020/DCI-P3-D65/DCI-P3-Theater; stereo_mode None/Sequential/FramePacked/TopBottom/SideBySide; content_aspect_ratio 5:4/4:3/16:10/16:9/1.85:1/2.20:1/2.35:1/2.37:1/2.39:1/Unknown)."
  - "source lists enum values but does not state access; assumed configurable"
  - "access not explicitly stated"
  - "access not explicitly stated; availability depends on motorized lens"
  - "source describes procedural workflows (e.g. warp setup = enable warp -> upload file -> select file -> enable file warp) but not as named macros."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Power on/off are idempotent (no-op if already in target state or transitioning). Source recommends verifying state before issuing power commands but does not describe it as a safety interlock."
  - "firmware version compatibility not stated in source"
  - "protocol/API version number not stated in source"
  - "access (read/write) not explicitly stated for several optics, orientation, scalingmode, and dmx properties — inferred where plausible, flagged otherwise"
  - "exact Gld 143M model-specific source/connector list and illumination source type (laser vs LED) not confirmed; source uses generic Pulse examples"
  - "firmware.schedulecomponentupgrade parameter set (component selection) not documented"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:29:32.924Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec action units (32 actions + 10 feedbacks) match source methods/properties/serial/HTTP endpoints verbatim; transport params verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco Gld 143M Control Spec

## Summary
The Barco Gld 143M is a Pulse-platform projector controlled via the Pulse API, a JSON-RPC 2.0 interface accessible over TCP/IP (port 9090), RS-232 serial, and HTTP file endpoints. The API exposes power control, source selection, illumination (laser) power, picture settings, warping/blending/black-level image processing, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: Source is the generic Pulse API catalog; exact feature availability for the Gld 143M model depends on its configuration (lens, peripherals). The source recommends runtime introspection to confirm the precise API surface. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{host}/api"  # file endpoints (warp/blend/blacklevel transfers)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: auth optional for normal end-user access; elevated access requires secret passcode via authenticate method (see Actions)
```

## Traits
```yaml
# - powerable       (system.poweron / system.poweroff present)
# - routable        (image.window.main.source selection / connector listing present)
# - queryable       (property.get queries returning state present)
# - levelable       (laser power, brightness, contrast, gamma, saturation, sharpness settable)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# All JSON-RPC 2.0 request payloads are sent verbatim over the TCP/serial connection.
# HTTP file-transfer endpoints are POST uploads / GET downloads.
# id values are illustrative request identifiers.

# --- Power / system ---
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

- id: serial_eco_wake
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII string sent on RS-232 to wake a projector in ECO mode. Alternatives: Wake-on-LAN (MAC address), remote/keypad power button.

# --- Authentication ---
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level. Example value 98765 is illustrative only.
  notes: Optional for normal end-user access. Required only for higher-than-end-user levels.

# --- Generic property framework ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness).
    - name: value
      type: any
      description: Value to set; type depends on the target property.
  notes: Best practice to wait for confirmation before re-setting the same property.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation. May also be an array of property names for bulk read.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names.

# --- Signals ---
- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names (e.g. modelupdated).

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names.

# --- Introspection ---
- id: introspect
  label: Introspect API
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything.
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level).

# --- Sources / connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: Example result ["DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","Dual DVI","Dual DisplayPort","Dual Head DVI","Dual Head DisplayPort","HDBaseT","HDMI","SDI"]; contents vary by model.

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: Example result ["DVI 1","DVI 2","DisplayPort 1","DisplayPort 2","HDBaseT","HDMI","SDI"].

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors"}'
  params:
    - name: name
      type: string
      description: Source object name (source name lowercased, non-word chars removed; e.g. displayport1).

# --- Illumination ---
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

# --- Image / color ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy.

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset to defaults.

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# --- LED control ---
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus).
    - name: color
      type: string
      description: LED color (e.g. red).
    - name: period
      type: integer
      description: Blink period.

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: 'Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.'
    - name: valuetype
      type: string
      description: 'Value type. Values: Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode.'
  notes: Returns a dictionary of sensor name -> reading (e.g. fan tachos, laser board temps).

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of {severity,timestamp,source,description,custommessage}.

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns list of all modes.

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: Returns components with {name, versions{available,running}, status}. Status values: Unknown, OK, Upgradable.

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at next reboot.  # UNRESOLVED: params for selecting component not specified in source

# --- HTTP file endpoints ---
- id: http_warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML file path.
    - name: host
      type: string
      description: Projector IP address.
  notes: HTTP multipart upload. Warp grid format same as MCM500/400.

- id: http_warp_file_download
  label: Download Warp Grid File
  kind: query
  command: 'curl -O -J http://{host}/api/image/processing/warp/file/transfer/{filename}'
  params:
    - name: filename
      type: string
      description: Optional specific file (e.g. warpgrid.xml).
    - name: host
      type: string
      description: Projector IP address.

- id: http_blend_file_upload
  label: Upload Blend Mask File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask image (PNG up to 16-bit / JPEG / TIFF, grayscale; color accepted, blue channel used).
    - name: host
      type: string
      description: Projector IP address.
  notes: Mask resolution must match projector blend-layer resolution (WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540).

- id: http_blacklevel_file_upload
  label: Upload Black Level Mask File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask image (PNG up to 16-bit / JPEG / TIFF, grayscale).
    - name: host
      type: string
      description: Projector IP address.
  notes: Mask resolution must match projector black-level-layer resolution (same size table as blend masks).
```

## Feedbacks
```yaml
# Queryable state via property.get; observable via property.changed notifications (see Events).
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

- id: active_source
  type: string
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'

- id: laser_power
  type: float
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'

- id: laser_minpower
  type: float
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'

- id: laser_maxpower
  type: float
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'

- id: network_device_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'

- id: connector_detectedsignal
  type: object
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{name}.detectedsignal"}}'
  notes: Returns {active,name,vertical_total,horizontal_total,vertical_resolution,horizontal_resolution,vertical_sync_width,vertical_front_porch,vertical_back_porch,horizontal_sync_width,horizontal_front_porch,horizontal_back_porch,horizontal_frequency,vertical_frequency,pixel_rate,scan,bits_per_component,color_space,signal_range,chroma_sampling,gamma_type,color_primaries,mastering_luminance,content_aspect_ratio,is_stereo,stereo_mode}. {name} = connector object name.
  # UNRESOLVED: exact enum value sets for scan, color_space, chroma_sampling sub-fields partially listed in source (signal_range 0-255/16-235; chroma_sampling 4:4:4/4:2:2/4:2:0; gamma_type POWER/sRGB/REC_BT1886/SMPTE_ST2084; color_primaries REC709/REC2020/DCI-P3-D65/DCI-P3-Theater; stereo_mode None/Sequential/FramePacked/TopBottom/SideBySide; content_aspect_ratio 5:4/4:3/16:10/16:9/1.85:1/2.20:1/2.35:1/2.37:1/2.39:1/Unknown).
```

## Variables
```yaml
# Settable properties via property.set. Each entry shows the property name and source-documented constraints.
- id: laser_power_level
  property: illumination.sources.laser.power
  type: float
  access: read_write
  unit: percent
  description: Target laser illumination power in percent.

- id: image_brightness
  property: image.brightness
  type: float
  access: read_write
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: Image brightness/offset. Normalized; 0 default, 1 = 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Image contrast/gain. Normalized; 1 default.

- id: image_gamma
  property: image.gamma
  type: float
  access: read_write
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: Image gamma. Default 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: Image color saturation. Normalized; 1 default.

- id: image_sharpness
  property: image.sharpness
  type: integer
  access: read_write
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: Image sharpness. Normalized.

- id: image_orientation
  property: image.orientation
  type: enum
  access: read_write  # UNRESOLVED: source lists enum values but does not state access; assumed configurable
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: window_main_source
  property: image.window.main.source
  type: string
  access: read_write
  description: Source displayed in main window. Value is a source name from image.source.list.

- id: window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  access: read_write  # UNRESOLVED: access not explicitly stated
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: read_write
  description: Globally enable/disable all warp functions.

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: read_write
  description: Enable/disable file warp.

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: read_write
  description: Currently selected warp grid file.

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: read_write
  description: Enable/disable file blend.

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array  # [ string ]
  access: read_write
  description: Currently selected blend files.

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write
  description: Enable/disable black level correction.

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: read_write
  description: Currently selected black level file.

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write  # UNRESOLVED: access not explicitly stated
  description: Current DMX mode.

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  access: read_write  # UNRESOLVED: access not explicitly stated
  min: 1
  max: 512
  description: DMX start channel [1..512].

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write  # UNRESOLVED: access not explicitly stated
  description: Shutdown enabled or not.

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  access: read_write  # UNRESOLVED: access not explicitly stated
  values: ["Open", "Closed"]
  description: Target shutter position.

- id: optics_zoom_position
  property: optics.zoom.position
  type: integer
  access: read_write  # UNRESOLVED: access not explicitly stated; availability depends on motorized lens
  description: Current zoom position.

- id: optics_focus_position
  property: optics.focus.position
  type: integer
  access: read_write  # UNRESOLVED: access not explicitly stated
  description: Current focus position.

- id: optics_lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer
  access: read_write  # UNRESOLVED: access not explicitly stated
  description: Current horizontal lens shift position.

- id: optics_lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer
  access: read_write  # UNRESOLVED: access not explicitly stated
  description: Current vertical lens shift position.

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  access: read_write
  description: Enable/disable standby state. Check availability first.

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: read_write
  description: Enable/disable ECO state. Check availability first.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; no response must be returned).
- id: property_changed
  method: property.changed
  description: Fired when a subscribed property value changes. Client must implement this handler.
  payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":100}]}}'

- id: signal_callback
  method: signal.callback
  description: Fired when a subscribed signal is emitted. Client must implement this handler.
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'

# Notable signal:
- id: modelupdated_signal
  method: signal (subscribe via signal.subscribe)
  description: Triggered when object structure changes (objects added/removed). Subscribe name "modelupdated".
```

## Macros
```yaml
# No multi-step sequences explicitly defined as named macros in source.
# UNRESOLVED: source describes procedural workflows (e.g. warp setup = enable warp -> upload file -> select file -> enable file warp) but not as named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Power on/off are idempotent (no-op if already in target state or transitioning). Source recommends verifying state before issuing power commands but does not describe it as a safety interlock.
```

## Notes
- The Pulse API is dynamic: parts depend on peripherals and configuration (e.g. motorized lens, DMX channel count). The documented surface may not be complete for the Gld 143M specifically. Runtime `introspect` is the authoritative way to confirm the exact API.
- JSON-RPC 2.0 over TCP (port 9090) and RS-232 share the same command set.
- Notifications carry no `id`; clients must not send a response for them.
- Source selection produces two `property.changed` notifications (deselect old, then select new).
- Subscribing to a property does NOT return its current value — use `property.get` for that.
- Object name translation: source/connector names are lowercased with non-word characters removed (e.g. "DisplayPort 1" -> "displayport1").
- The `authenticate` pass code example (98765) is illustrative; real codes are deployment-specific.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol/API version number not stated in source -->
<!-- UNRESOLVED: access (read/write) not explicitly stated for several optics, orientation, scalingmode, and dmx properties — inferred where plausible, flagged otherwise -->
<!-- UNRESOLVED: exact Gld 143M model-specific source/connector list and illumination source type (laser vs LED) not confirmed; source uses generic Pulse examples -->
<!-- UNRESOLVED: firmware.schedulecomponentupgrade parameter set (component selection) not documented -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:25:24.140Z
last_checked_at: 2026-08-19T08:29:32.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:29:32.924Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec action units (32 actions + 10 feedbacks) match source methods/properties/serial/HTTP endpoints verbatim; transport params verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is the generic Pulse API catalog; exact feature availability for the Gld 143M model depends on its configuration (lens, peripherals). The source recommends runtime introspection to confirm the precise API surface."
- "params for selecting component not specified in source"
- "exact enum value sets for scan, color_space, chroma_sampling sub-fields partially listed in source (signal_range 0-255/16-235; chroma_sampling 4:4:4/4:2:2/4:2:0; gamma_type POWER/sRGB/REC_BT1886/SMPTE_ST2084; color_primaries REC709/REC2020/DCI-P3-D65/DCI-P3-Theater; stereo_mode None/Sequential/FramePacked/TopBottom/SideBySide; content_aspect_ratio 5:4/4:3/16:10/16:9/1.85:1/2.20:1/2.35:1/2.37:1/2.39:1/Unknown)."
- "source lists enum values but does not state access; assumed configurable"
- "access not explicitly stated"
- "access not explicitly stated; availability depends on motorized lens"
- "source describes procedural workflows (e.g. warp setup = enable warp -> upload file -> select file -> enable file warp) but not as named macros."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Power on/off are idempotent (no-op if already in target state or transitioning). Source recommends verifying state before issuing power commands but does not describe it as a safety interlock."
- "firmware version compatibility not stated in source"
- "protocol/API version number not stated in source"
- "access (read/write) not explicitly stated for several optics, orientation, scalingmode, and dmx properties — inferred where plausible, flagged otherwise"
- "exact Gld 143M model-specific source/connector list and illumination source type (laser vs LED) not confirmed; source uses generic Pulse examples"
- "firmware.schedulecomponentupgrade parameter set (component selection) not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
