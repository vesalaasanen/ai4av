---
spec_id: admin/barco-300w-uhp-ir-projector-lamp-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: "Barco Pulse Projector"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Pulse Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T09:02:13.945Z
last_checked_at: 2026-07-21T20:46:26.697Z
generated_at: 2026-07-21T20:46:26.697Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model number not stated in source (document covers the Pulse platform generically); firmware version compatibility not stated; DMX channel counts in extended mode not enumerated"
  - "full detectedsignal field set (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but formatting ambiguous in source"
  - "absolute min/max dynamic per lens/config; source notes they vary"
  - "no explicit multi-step sequences named as macros in source"
  - "no hard safety interlocks, power-on sequencing requirements, or"
  - "exact projector model number; firmware version compatibility; DMX extended-mode channel enumeration; absolute/dynamic laser power min-max bounds; full detectedsignal field schema (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but source table formatting ambiguous; serial pin-out described (2-2, 3-3, 5-5) but connector gender/host-side detail not a control concern"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:46:26.697Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally to source documentation; all transport values found in source; comprehensive API coverage with no missing commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Pulse Projector Control Spec

## Summary
Barco Pulse projector controlled via the Pulse API, a JSON-RPC 2.0 service reachable over TCP/IP on port 9090 or over an RS-232 serial link. The API exposes power control, source selection, illumination (laser) power, picture settings, warp/blend/black-level image processing, optics (shutter, zoom, focus, lens shift), DMX, environment monitoring, firmware management, and an introspection mechanism. A separate ASCII wake-on-serial command is documented for ECO-mode wake-up.

<!-- UNRESOLVED: exact projector model number not stated in source (document covers the Pulse platform generically); firmware version compatibility not stated; DMX channel counts in extended mode not enumerated -->

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
  # Authentication is optional for normal end-user access; required passcode for
  # higher access levels. Secret passcode format/example (98765) shown in source.
  type: passcode  # documented optional authenticate method with code param
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff methods
  - queryable    # inferred from property.get examples (state, source, power, brightness)
  - routable     # inferred from image.window.main.source selection commands
  - levelable    # inferred from brightness/contrast/gamma/saturation/power set commands
```

## Actions
```yaml
# All commands are JSON-RPC 2.0 over the Pulse API (TCP:9090 or RS-232).
# property.set is a generic method; the distinct operations below are the
# per-property commands documented with literal payloads in the source.
# Generic transport-level RPC methods are listed first, then documented
# property operations and methods.

# --- Generic RPC methods (documented with example payloads) ---

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness)
    - name: value
      type: any
      description: Value to set (type depends on property)

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]},"id":{id}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (or array of names)

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (or array of names)

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated)

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name (or array of names)

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty = all)
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level)

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}},"id":{id}}'
  params:
    - name: code
      type: integer
      description: Secret passcode (source example: 98765)

# --- Power / system methods ---

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":{id}}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":{id}}'
  params: []

- id: eco_wake_serial
  label: ECO Mode Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII command on RS-232 to wake a projector in ECO mode

# --- Source / connector methods ---

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":{id}}'
  params: []

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":{id}}'
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{name}.listconnectors","id":{id}}'
  params:
    - name: name
      type: string
      description: Source object name (lowercase, non-word chars removed, e.g. displayport1)

- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: Source name (e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, SDI)

# --- Illumination methods/properties ---

- id: set_illumination_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Target power in percent

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":{id}}'
  params: []
  notes: Engage Constant Light Output at the current light level

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":{id}}'
  params: []

# --- Picture settings ---

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Normalized offset, -1..1 (0 = default, step-size 1, precision 0.01)

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Normalized gain, 0..2 (1 = default, precision 0.01)

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Gamma, 1..3 (default 2.2, precision 0.1)

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}},"id":{id}}'
  params:
    - name: value
      type: float
      description: Normalized saturation, 0..2 (1 = default, precision 0.01)

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      description: Sharpness, -2..8 (step-size 1, precision 1)

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: 'Enum: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR'

- id: set_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: 'Enum: Fill, OneToOne, FillScreen, Stretch'

# --- Warp / blend / black-level ---

- id: set_warp_enable
  label: Enable/Disable All Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: set_warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: Warp grid file name (e.g. warp.xml)

- id: set_blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: Blend mask file name (e.g. mask.png)

- id: set_blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: Black level mask file name (e.g. blacklevel.png)

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address (e.g. 192.168.1.100)

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector_ip
      type: string

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector_ip
      type: string

# --- Optics ---

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string
      description: 'Enum: Open, Closed'

# --- DMX ---

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"},"id":{id}}'
  params:
    - name: value
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}},"id":{id}}'
  params:
    - name: value
      type: integer
      description: Start channel 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":{id}}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":{id}}'
  params: []

# --- System state enables ---

- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}},"id":{id}}'
  params:
    - name: value
      type: boolean

# --- Environment ---

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: type
      type: string
      description: 'Enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":{id}}'
  params: []

# --- Firmware ---

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":{id}}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":{id}}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":{id}}'
  params: []
  notes: Force a component upgrade at the following reboot

# --- Color management methods ---

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":{id}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":{id}}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":{id}}'
  params: []
  notes: Cycles to the next RGB mode
```

## Feedbacks
```yaml
# Observable states surfaced via property.get / property.changed notifications.

- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state

- id: illumination_laser_power
  type: number
  property: illumination.sources.laser.power

- id: illumination_laser_minpower
  type: number
  property: illumination.sources.laser.minpower

- id: illumination_laser_maxpower
  type: number
  property: illumination.sources.laser.maxpower

- id: active_source
  type: string
  property: image.window.main.source

- id: brightness
  type: number
  property: image.brightness

- id: contrast
  type: number
  property: image.contrast

- id: gamma
  type: number
  property: image.gamma

- id: saturation
  type: number
  property: image.saturation

- id: sharpness
  type: number
  property: image.sharpness

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  property: image.orientation

- id: window_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  property: image.window.main.scalingmode

- id: warp_enable
  type: boolean
  property: image.processing.warp.enable

- id: warp_file_enable
  type: boolean
  property: image.processing.warp.file.enable

- id: warp_file_selected
  type: string
  property: image.processing.warp.file.selected

- id: blend_file_enable
  type: boolean
  property: image.processing.blend.file.enable

- id: blend_file_selected
  type: string
  property: image.processing.blend.file.selected

- id: blacklevel_file_enable
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: blacklevel_file_selected
  type: string
  property: image.processing.blacklevel.file.selected

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: number
  property: dmx.startchannel

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state

- id: shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position

- id: shutter_target
  type: enum
  values: [Open, Closed]
  property: optics.shutter.target

- id: zoom_position
  type: number
  property: optics.zoom.position

- id: focus_position
  type: number
  property: optics.focus.position

- id: lensshift_horizontal_position
  type: number
  property: optics.lensshift.horizontal.position

- id: lensshift_vertical_position
  type: number
  property: optics.lensshift.vertical.position

- id: standby_enable
  type: boolean
  property: system.standby.enable

- id: eco_enable
  type: boolean
  property: system.eco.enable

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate

- id: connector_detectedsignal
  type: object
  property: image.connector.{name}.detectedsignal
  fields: [active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type]
  # UNRESOLVED: full detectedsignal field set (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but formatting ambiguous in source
```

## Variables
```yaml
# Settable parameters exposed via property.set; ranges from source introspection.
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01

- id: image_sharpness
  property: image.sharpness
  type: int
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  min: 0  # inferred from minpower example (result 0)
  max: 100  # inferred from maxpower example (result 100)
  # UNRESOLVED: absolute min/max dynamic per lens/config; source notes they vary
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response expected).

- id: property_changed
  method: property.changed
  description: Pushed when a subscribed property value changes. Params contain an array of {property: value} pairs.
  payload:
    property: array

- id: signal_callback
  method: signal.callback
  description: Pushed when a subscribed signal is emitted. Params contain an array of {signal: arguments} pairs.
  payload:
    signal: array

- id: modelupdated_signal
  method: signal.callback  # via signal subscription
  description: Emitted when the object structure changes (objects added/removed). Subscribe via signal name modelupdated.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences named as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - note: |
      Source recommends verifying projector state before issuing power commands:
      verify system.state is standby or ready before system.poweron; verify
      system.state is on before system.poweroff. Issuing power commands while
      the unit is in transition has no effect. This is a recommendation, not a
      documented hard interlock.
# UNRESOLVED: no hard safety interlocks, power-on sequencing requirements, or
# fault-recovery procedures explicitly stated in source. Lamp/ECO wake behavior
# documented (Wake-on-LAN, remote/keypad power, serial :POWR1) but no lockout
# or interlock procedure given.
```

## Notes
- The Pulse API uses JSON-RPC 2.0. Notifications (no `id`) must not be answered. Request `id` is string-or-number, optional.
- Parameter order is irrelevant; parameters are passed by name.
- Best practice: wait for `property.set` confirmation before re-setting the same property to avoid flooding the server.
- The API is partly dynamic and peripheral-dependent; exact surface varies by projector model and config. The recommended discovery method is `introspect`.
- Source-name → object-name translation rule: remove non-word characters and lowercase (e.g. `DisplayPort 1` → `displayport1`).
- Two `property.changed` notifications are delivered on a source switch: first the deselection (empty value), then the new selection.
- Subscribing does not return the current value; use `property.get` to read current value.
- File transfer endpoints live under HTTP `/api/...` and accept multipart POST (`curl -F`).
- Supported blend/black-level mask image formats: PNG (up to 16 bit), JPEG, TIFF. Grayscale only; color images use the blue channel.
- Mask resolutions by projector resolution: WUXGA → 1920×1200; WQXGA → 1280×800; 4K → 1280×800; 4K Cinemascope → 1280×540.
- Warp file format is identical to MCM500/400.

<!-- UNRESOLVED: exact projector model number; firmware version compatibility; DMX extended-mode channel enumeration; absolute/dynamic laser power min-max bounds; full detectedsignal field schema (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but source table formatting ambiguous; serial pin-out described (2-2, 3-3, 5-5) but connector gender/host-side detail not a control concern -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T09:02:13.945Z
last_checked_at: 2026-07-21T20:46:26.697Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:46:26.697Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally to source documentation; all transport values found in source; comprehensive API coverage with no missing commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model number not stated in source (document covers the Pulse platform generically); firmware version compatibility not stated; DMX channel counts in extended mode not enumerated"
- "full detectedsignal field set (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but formatting ambiguous in source"
- "absolute min/max dynamic per lens/config; source notes they vary"
- "no explicit multi-step sequences named as macros in source"
- "no hard safety interlocks, power-on sequencing requirements, or"
- "exact projector model number; firmware version compatibility; DMX extended-mode channel enumeration; absolute/dynamic laser power min-max bounds; full detectedsignal field schema (color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode) listed but source table formatting ambiguous; serial pin-out described (2-2, 3-3, 5-5) but connector gender/host-side detail not a control concern"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
