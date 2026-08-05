---
spec_id: admin/barco-fsn-universal-input-card-uic
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco FSN Universal Input Card UIC Control Spec"
manufacturer: Barco
model_family: "Barco FSN Universal Input Card UIC"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco FSN Universal Input Card UIC"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:06:36.840Z
last_checked_at: 2026-08-05T08:04:53.538Z
generated_at: 2026-08-05T08:04:53.538Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device name in prompt is \"Barco FSN Universal Input Card UIC\" but source document is titled \"RS232 and Network Command Catalog\" for Pulse projectors. Source does not explicitly name the FSN UIC. Model applicability to FSN UIC is inferred from prompt metadata."
  - "Source does not state default TCP credentials, pass-code format details, or rate limits. Authentication \"code\" param type and range not specified beyond one example value of 98765. Source URL pattern for downloads uses IP-based examples; no DNS hostname format documented."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:04:53.538Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions map literally to JSON-RPC methods or the :POWR1\\r serial token in the source; transport parameters (port 9090, 19200 8N1) verified. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco FSN Universal Input Card UIC Control Spec

## Summary
JSON-RPC 2.0 control spec for Barco Pulse-based products, accessed via TCP/IP on port 9090 or RS-232 serial at 19200 baud. Covers power control, source selection, illumination, picture settings, warp/blend/blacklevel files, environment sensors, optics, network, firmware, and introspection.

<!-- UNRESOLVED: Device name in prompt is "Barco FSN Universal Input Card UIC" but source document is titled "RS232 and Network Command Catalog" for Pulse projectors. Source does not explicitly name the FSN UIC. Model applicability to FSN UIC is inferred from prompt metadata. -->

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
  type: code  # source: "A client session must start with an authentication request containing a secret pass code. The purpose of the authentication protocol is to set the user access level. Authentication is only necessary when a higher level than normal end user is required. For normal end user access the authentication can be skipped."
```

## Traits
```yaml
- powerable  # inferred from system.poweron / system.poweroff
- routable  # inferred from image.window.main.source / image.source.list
- queryable  # inferred from property.get, introspect, environment.getcontrolblocks
- levelable  # inferred from image.brightness / image.contrast / image.gamma / illumination.sources.laser.power
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":3}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":4}'
  params: []

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Property path in dot notation

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: value
      type: string
      description: Value (string, int, float, bool, array, object)

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: property_subscribe
  label: Subscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Property path

- id: property_subscribe_multiple
  label: Subscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: property_unsubscribe
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Property path

- id: property_unsubscribe_multiple
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: signal_subscribe
  label: Subscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multiple
  label: Subscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: recursive
      type: boolean
      description: Recursive flag

- id: introspect_alt
  label: Introspect Object (positional)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: image_source_listconnectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source_object_name
      type: string
      description: Source object name derived from source name by stripping non-word chars and lowercasing

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":1}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":1}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":1}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":1}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      enum: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: string
      enum: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":1}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":1}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":1}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":1}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":1}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":1}'
  params: []

- id: wake_from_eco_serial
  label: Wake from ECO (RS-232)
  kind: action
  command: ':POWR1\r'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: image_window_main_source
  type: string
  description: Currently active source name

- id: illumination_sources_laser_power
  type: float
  description: Current laser power in percent

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power in percent

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power in percent

- id: image_brightness
  type: float
  description: Image brightness/offset (normalized, 0=default)

- id: image_contrast
  type: float
  description: Image contrast/gain (normalized, 1=default)

- id: image_gamma
  type: float
  description: Image gamma (default 2.2)

- id: image_saturation
  type: float
  description: Image color saturation (normalized, 1=default)

- id: image_sharpness
  type: int
  description: Image sharpness

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_connector_detectedsignal
  type: object
  description: Signal info (active, name, resolutions, frequencies, scan, color_space, etc.)

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_zoom_position
  type: int

- id: optics_focus_position
  type: int

- id: optics_lensshift_horizontal_position
  type: int

- id: optics_lensshift_vertical_position
  type: int
```

## Variables
```yaml
- id: image_window_main_position
  type: object
  description: Window position {x: int, y: int}

- id: image_window_main_size
  type: object
  description: Window size {width: int, height: int}

- id: image_processing_warp_enable
  type: boolean
  description: Enable/disable all warp functions

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string
  description: Currently selected warp file

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array
  description: Array of currently selected blend files

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: int
  description: DMX start channel [1..512]

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  description: {Address, Mask, Gateway, NameServers}

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
```

## Events
```yaml
- id: property_changed
  description: Notification when subscribed property value changes. No id, no response required.
  format: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":value}]}}'

- id: signal_callback
  description: Notification when subscribed signal fires. No id, no response required.
  format: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":value}}]}}'

- id: modelupdated
  description: Triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe.

- id: introspect_objectchanged
  description: Introspect API signal triggered when new objects arrive or are removed.
  format: '{"object":"object.name","newobject":true}'
```

## Macros
```yaml
- id: warp_upload_and_activate
  label: Upload and Activate Warp File
  description: 3-step macro: HTTP POST warp file, set selected, enable
  steps:
    - command: "curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'

- id: blend_mask_upload_and_activate
  label: Upload and Activate Blend Mask
  description: 3-step macro: HTTP POST blend mask, set selected, enable
  steps:
    - command: "curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'

- id: blacklevel_mask_upload_and_activate
  label: Upload and Activate Black Level Mask
  description: 3-step macro: HTTP POST blacklevel mask, set selected, enable
  steps:
    - command: "curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer"
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
    - command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - system.poweron
  - firmware.schedulecomponentupgrade
interlocks: []
```

## Notes
- Same JSON-RPC 2.0 commands work over both TCP/9090 and RS-232/19200; the source explicitly states "The type of connection is not important. The same commands are available for all connection types."
- Best practice: verify system.state is `standby` or `ready` before issuing `system.poweron`, and verify `on` before `system.poweroff`. Issuing power commands during state transitions is a no-op.
- Best practice: wait for confirmation of `property.set` before issuing another `property.set` on the same property to avoid flooding the server.
- Source explicitly warns: "Parts of the API are dynamic, other parts depend on peripherals or other factors. This means that the documentation shown here may not be complete with respect to a specific projector with a specific configuration... The best way to know the exact API of your projector is to do an introspection."
- File endpoint URL pattern: `http://<projector-ip>/api/<endpoint-path>` (e.g. `/image/processing/warp/file/transfer`, `/image/processing/blend/file/transfer`, `/image/processing/blacklevel/file/transfer`).
- Source document is the Pulse API command catalog; the prompt identifies the target device as "Barco FSN Universal Input Card UIC" but the source does not explicitly mention this model. The protocol and command set documented here are assumed to apply to that product line.
- ECO wake-up options: wake-on-LAN (MAC address), remote power button, keypad power button, or RS-232 ASCII `:POWR1\r`.

<!-- UNRESOLVED: Source does not state default TCP credentials, pass-code format details, or rate limits. Authentication "code" param type and range not specified beyond one example value of 98765. Source URL pattern for downloads uses IP-based examples; no DNS hostname format documented. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:06:36.840Z
last_checked_at: 2026-08-05T08:04:53.538Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:04:53.538Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions map literally to JSON-RPC methods or the :POWR1\\r serial token in the source; transport parameters (port 9090, 19200 8N1) verified. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device name in prompt is \"Barco FSN Universal Input Card UIC\" but source document is titled \"RS232 and Network Command Catalog\" for Pulse projectors. Source does not explicitly name the FSN UIC. Model applicability to FSN UIC is inferred from prompt metadata."
- "Source does not state default TCP credentials, pass-code format details, or rate limits. Authentication \"code\" param type and range not specified beyond one example value of 98765. Source URL pattern for downloads uses IP-based examples; no DNS hostname format documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
