---
spec_id: admin/barco-bifrost-tp09-i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Bifrost Tp09 I Control Spec"
manufacturer: Barco
model_family: "Barco Bifrost Tp09 I"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Bifrost Tp09 I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:18:24.287Z
last_checked_at: 2026-07-21T21:18:12.247Z
generated_at: 2026-07-21T21:18:12.247Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact model variant configuration (lens, illumination type) affects available API surface"
  - "exact source list varies by projector model - use image.source.list to enumerate"
  - "min/max range not stated in source"
  - "no explicit multi-step sequences documented as named macros in source"
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated beyond good-practice state verification notes."
  - "exact source/connector list varies by projector model — must be queried at runtime via image.source.list"
  - "optics position ranges (zoom/focus/lensshift) not stated in source"
  - "DMX mode names and extended channel counts not fully enumerated in source"
  - "warp grid file format details beyond \"same as MCM500/400\" not provided"
  - "authentication pass code value is example only (98765) — actual code is device-specific"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:18:12.247Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched verbatim; transport parameters verified in source; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Bifrost Tp09 I Control Spec

## Summary
Barco Bifrost Tp09 I is a Pulse-platform projector controllable via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. The API exposes power control, source selection, illumination (laser power), image picture settings, warp/blend/black-level file management, lens optics, DMX, environment monitoring, and firmware management. File uploads/downloads for warp grids and blend/black-level masks use HTTP endpoints.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model variant configuration (lens, illumination type) affects available API surface -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector_ip}/api"  # HTTP file endpoints; projector IP not fixed
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents 'authenticate' method with secret code param; optional for normal end-user access
  notes: Authentication is only required for access levels above normal end user. Normal end-user access can skip authentication.
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff commands
  - queryable    # inferred from property.get query methods and list methods
  - routable     # inferred from source selection commands (image.window.main.source)
  - levelable    # inferred from brightness/contrast/gamma/saturation/laser power controls
```

## Actions
```yaml
actions:
  # ── System power ──
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

  # ── Authentication ──
  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
    params:
      - name: code
        type: integer
        description: Secret pass code

  # ── Property methods ──
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
    params:
      - name: property
        type: string
        description: Property path in dot notation (e.g. image.brightness)
      - name: value
        type: any
        description: Value to set

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Property path in dot notation

  - id: property_get_multiple
    label: Get Multiple Properties
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
    params:
      - name: property
        type: array
        description: Array of property paths in dot notation

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Property path or array of property paths

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
    params:
      - name: property
        type: string
        description: Property path or array of property paths

  # ── Signal methods ──
  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  # ── Introspection ──
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
    params:
      - name: object
        type: string
        description: Object name to introspect in dot notation; empty string introspects everything
      - name: recursive
        type: boolean
        description: If false, only object names are listed (one level). Default true.

  # ── Image source / connector methods ──
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
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
    params:
      - name: source
        type: string
        description: "Source object name - derived from source name by removing non-word chars and lowercasing (e.g. 'DisplayPort 1' → 'displayport1')"

  # ── Environment methods ──
  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
    params:
      - name: type
        type: string
        description: "Block type - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
      - name: valuetype
        type: string
        description: "Value type - Temperature, Speed, Voltage, Current, Power, PWM, Humidity, Pressure, etc."

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []

  # ── DMX methods ──
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

  # ── Firmware methods ──
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

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []

  # ── Illumination methods ──
  - id: illumination_clo_engage
    label: Engage CLO (Constant Light Output)
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []

  - id: illumination_laser_getserialnumber
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []

  # ── Color management methods ──
  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset to Custom
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to copy

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to reset to defaults

  - id: image_color_p7_custom_resettonative
    label: Reset Color to Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Cycle to Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []

  # ── LED control ──
  - id: ledctrl_blink
    label: LED Blink
    kind: action
    command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
    params:
      - name: led
        type: string
        description: LED identifier (e.g. systemstatus)
      - name: color
        type: string
        description: LED color (e.g. red)
      - name: period
        type: integer
        description: Blink period

  # ── Serial-only ECO wake ──
  - id: eco_wake_serial
    label: ECO Mode Wake via Serial
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII command sent over RS-232 serial port only. Used to wake projector from ECO/power-save mode.

  # ── HTTP file transfer endpoints ──
  - id: http_upload_warp_grid
    label: Upload Warp Grid File
    kind: action
    command: 'POST http://{projector_ip}/api/image/processing/warp/file/transfer  (multipart form: file=@warpgrid.xml)'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address
      - name: file
        type: file
        description: Warp grid XML file

  - id: http_download_warp_grid
    label: Download Warp Grid File
    kind: query
    command: 'GET http://{projector_ip}/api/image/processing/warp/file/transfer'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address

  - id: http_upload_blend_mask
    label: Upload Blend Mask File
    kind: action
    command: 'POST http://{projector_ip}/api/image/processing/blend/file/transfer  (multipart form: file=@mask.png)'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address
      - name: file
        type: file
        description: Blend mask image (PNG/JPEG/TIFF, grayscale)

  - id: http_upload_blacklevel_mask
    label: Upload Black Level Mask File
    kind: action
    command: 'POST http://{projector_ip}/api/image/processing/blacklevel/file/transfer  (multipart form: file=@blacklevel.png)'
    params:
      - name: projector_ip
        type: string
        description: Projector IP address
      - name: file
        type: file
        description: Black level mask image (PNG/JPEG/TIFF, grayscale)
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    description: Current projector operation state. Query via property.get on 'system.state'.

  - id: illumination_state
    type: enum
    values: [On, Off]
    description: Light source on/off state. Query via property.get on 'illumination.state'.

  - id: environment_alarmstate
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    description: Overall alarm state. Query via property.get on 'environment.alarmstate'.

  - id: optics_shutter_position
    type: enum
    values: [Open, Closed]
    description: Shutter position. Query via property.get on 'optics.shutter.position'.

  - id: network_device_lan_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    description: LAN device connection state.

  - id: active_source
    type: string
    description: Currently active source name. Query via property.get on 'image.window.main.source'.

  - id: detected_signal
    type: object
    description: Signal information for a connector. Query via property.get on 'image.connector.{name}.detectedsignal'. Contains active, name, resolution, timing, color info.

  - id: illumination_laser_power
    type: float
    description: Current laser power level in percent.

  - id: illumination_laser_minpower
    type: float
    description: Minimum laser power level in percent.

  - id: illumination_laser_maxpower
    type: float
    description: Maximum laser power level in percent.

  - id: environment_temperatures
    type: object
    description: Dictionary of temperature sensor readings. Query via environment.getcontrolblocks with type=Sensor, valuetype=Temperature.

  - id: environment_fan_speeds
    type: object
    description: Dictionary of fan speed readings. Query via environment.getcontrolblocks with type=Sensor, valuetype=Speed.

  - id: firmware_component_status
    type: object
    description: Firmware component versions and upgrade status. Query via firmware.listcomponentversionstatus.

  - id: alarm_info
    type: array
    description: Detailed alarm information. Query via environment.getalarminfo.
```

## Variables
```yaml
variables:
  - id: image_window_main_source
    property: image.window.main.source
    type: string
    access: read_write
    description: Source displayed in main window
    # UNRESOLVED: exact source list varies by projector model - use image.source.list to enumerate

  - id: image_brightness
    property: image.brightness
    type: float
    access: read_write
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: Image brightness/offset. 0 is default, 1 is 100% offset.

  - id: image_contrast
    property: image.contrast
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image contrast/gain. 1 is default.

  - id: image_gamma
    property: image.gamma
    type: float
    access: read_write
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: Image gamma. Default is 2.2.

  - id: image_saturation
    property: image.saturation
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image color saturation. 1 is default.

  - id: image_sharpness
    property: image.sharpness
    type: integer
    access: read_write
    min: -2
    max: 8
    step_size: 1
    precision: 1
    description: Image sharpness. Normalized.

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    access: read_write
    description: Scaling mode applied to source

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    access: read_write
    description: Projection orientation

  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    access: read_write
    description: Target laser power in percent

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: read_write
    description: Enable/disable all warp functions

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: read_write
    description: Enable/disable file warp

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: read_write
    description: Currently selected warp file

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: read_write
    description: Enable/disable file blend

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    access: read_write
    description: Currently selected blend files

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write
    description: Enable/disable black level correction

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: read_write
    description: Currently selected black level file

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: read_write
    description: Current DMX mode

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    access: read_write
    min: 1
    max: 512
    description: DMX start channel

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: read_write
    description: DMX shutdown enabled or not

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: read_write
    description: Enable/disable standby state availability

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: read_write
    description: Enable/disable ECO state availability

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer
    access: read_write
    description: Current zoom position
    # UNRESOLVED: min/max range not stated in source

  - id: optics_focus_position
    property: optics.focus.position
    type: integer
    access: read_write
    description: Current focus position
    # UNRESOLVED: min/max range not stated in source

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer
    access: read_write
    description: Current horizontal lens shift position
    # UNRESOLVED: min/max range not stated in source

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer
    access: read_write
    description: Current vertical lens shift position
    # UNRESOLVED: min/max range not stated in source

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]
    access: read_write
    description: Shutter target position

  - id: image_window_main_position
    property: image.window.main.position
    type: object
    access: read_write
    description: Window position (x int, y int)

  - id: image_window_main_size
    property: image.window.main.size
    type: object
    access: read_write
    description: Window size (width int, height int)

  - id: network_device_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    access: read_only
    description: IPv4 config (Address, Mask, Gateway, NameServers)
```

## Events
```yaml
events:
  - id: property_changed
    description: Unsolicited notification sent when a subscribed property value changes. No response required from client.
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{property}":{value}}]}}'

  - id: signal_callback
    description: Unsolicited notification sent when a subscribed signal is emitted. No response required from client.
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{signal}":{"arg1":{val}}}]}}

  - id: modelupdated
    description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no explicit multi-step sequences documented as named macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Verify projector state is standby or ready before issuing system.poweron. If already on or transitioning, nothing happens."
  - description: "Verify projector state is on before issuing system.poweroff. If already off or transitioning, nothing happens."
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated beyond good-practice state verification notes.
```

## Notes
- All JSON-RPC parameters are passed by name; parameter order does not matter.
- Best practice: wait for `property.set` confirmation before setting the same property again. Continuous setting without confirmation may flood the server and reduce performance.
- Source selection generates two `property.changed` notifications: first when the previous source is deselected (empty string value), then when the new source is selected.
- Subscribing to a property does NOT return the current value — use `property.get` for that. Notifications are only sent on actual value changes.
- Source object names are derived from source names by removing all non-word characters and converting to lowercase (e.g. "DisplayPort 1" → "displayport1"). Same applies to connector object names.
- Parts of the API are dynamic and depend on projector configuration (lens type, peripherals, DMX mode). Use introspection to discover the exact API surface for a specific device.
- Warp file format is the same as MCM500/400.
- Blend/black-level masks: grayscale only (8 or 16 bit). Color images accepted but only the blue channel is used. Supported formats: PNG (up to 16 bit), JPEG, TIFF. Mask resolution depends on projector resolution (WUXGA: 1920×1200, WQXGA/4K: 1280×800, 4K Cinemascope: 1280×540).
- ECO mode wake requires either Wake-on-LAN (MAC address), remote/keypad power button, or the serial command `:POWR1\r`.
- The `ledctrl.blink` method is documented only as an example in the API guide but is a valid method invocation.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact source/connector list varies by projector model — must be queried at runtime via image.source.list -->
<!-- UNRESOLVED: optics position ranges (zoom/focus/lensshift) not stated in source -->
<!-- UNRESOLVED: DMX mode names and extended channel counts not fully enumerated in source -->
<!-- UNRESOLVED: warp grid file format details beyond "same as MCM500/400" not provided -->
<!-- UNRESOLVED: authentication pass code value is example only (98765) — actual code is device-specific -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:18:24.287Z
last_checked_at: 2026-07-21T21:18:12.247Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:18:12.247Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched verbatim; transport parameters verified in source; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact model variant configuration (lens, illumination type) affects available API surface"
- "exact source list varies by projector model - use image.source.list to enumerate"
- "min/max range not stated in source"
- "no explicit multi-step sequences documented as named macros in source"
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated beyond good-practice state verification notes."
- "exact source/connector list varies by projector model — must be queried at runtime via image.source.list"
- "optics position ranges (zoom/focus/lensshift) not stated in source"
- "DMX mode names and extended channel counts not fully enumerated in source"
- "warp grid file format details beyond \"same as MCM500/400\" not provided"
- "authentication pass code value is example only (98765) — actual code is device-specific"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
