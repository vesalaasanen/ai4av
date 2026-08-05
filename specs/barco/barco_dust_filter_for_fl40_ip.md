---
spec_id: admin/barco-dust-filter-for-fl40
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Dust Filter For FL40 Control Spec"
manufacturer: Barco
model_family: "Dust Filter For FL40"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Dust Filter For FL40"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:08:11.660Z
last_checked_at: 2026-08-05T07:28:37.922Z
generated_at: 2026-08-05T07:28:37.922Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "dust-filter-specific commands, endpoints, or properties are not documented separately in the source — only the generic Pulse API is provided."
  - "dust-filter-specific settable parameters not enumerated in source."
  - "source documents no explicit multi-step sequences other than the warp/blend/blacklevel workflows above (which are encoded as separate actions)."
  - "dust-filter-specific interlocks (filter presence detection, replacement warnings, airflow safety) not documented in source."
  - "dust-filter-specific commands, properties, events, interlocks, and firmware compatibility ranges are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:28:37.922Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "Every spec action and transport parameter matches verbatim against the Pulse API source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Dust Filter For FL40 Control Spec

## Summary
Control spec for the Barco Dust Filter For FL40 projector accessory, derived from the Barco Pulse API documentation (RS232 and JSON-RPC over TCP/IP). Covers TCP/IP on port 9090 (JSON-RPC 2.0) and RS-232 serial at 19200/8/N/1. The source document describes the generic Pulse API shared across the projector family; dust-filter-specific commands are not enumerated.

<!-- UNRESOLVED: dust-filter-specific commands, endpoints, or properties are not documented separately in the source — only the generic Pulse API is provided. -->

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
  type: secret_code  # source describes `authenticate` method with a numeric "code" param
```

## Traits
```yaml
powerable: true       # inferred from system.poweron / system.poweroff examples
routable: true        # inferred from image.window.main.source examples
queryable: true       # inferred from property.get examples throughout
levelable: true       # inferred from brightness/contrast/gamma/saturation/sharpness property examples
```

## Actions
```yaml
- id: authenticate
  label: Authenticate session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (access level dependent)

- id: power_on
  label: Power on projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power off projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100}}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.brightness")
    - name: value
      type: string
      description: Property value (string, int, float, bool, array, object)

- id: property_get
  label: Get property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_get_multi
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths

- id: property_subscribe
  label: Subscribe to property changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Property name (string) or array of property names

- id: property_unsubscribe
  label: Unsubscribe from property changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: signal_subscribe
  label: Subscribe to signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name (string) or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name (string) or array of signal names

- id: introspect
  label: Introspect object metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed); empty/omitted introspects all
    - name: recursive
      type: boolean
      description: If false, only one level of objects is listed

- id: ledctrl_blink
  label: Blink an LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
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

- id: select_input
  label: Set active source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: illumination_get_state
  label: Get illumination state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: illumination_subscribe_state
  label: Subscribe to illumination state changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: illumination_get_laser_power
  label: Get laser power level
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: illumination_set_laser_power
  label: Set laser power level
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: illumination_get_laser_minpower
  label: Get laser minimum power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: illumination_get_laser_maxpower
  label: Get laser maximum power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_get_serial_number
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: image_brightness_get
  label: Get image brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: image_brightness_set
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized; 0 = default, 1 = 100% offset. Range -1..1, step 0.01

- id: image_contrast_set
  label: Set image contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0}}'
  params:
    - name: value
      type: float
      description: Normalized; 1 = default. Range 0..2, step 0.01

- id: image_gamma_set
  label: Set image gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: Default 2.2. Range 1..3, step 0.1

- id: image_saturation_set
  label: Set image saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0}}'
  params:
    - name: value
      type: float
      description: Normalized; 1 = default. Range 0..2, step 0.01

- id: image_sharpness_set
  label: Set image sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: Normalized. Range -2..8, step 1

- id: image_orientation_set
  label: Set image orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: warp_enable
  label: Enable warp globally
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params: []

- id: warp_select_file
  label: Select uploaded warp file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST

- id: warp_file_enable
  label: Enable file warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params: []

- id: blend_select_file
  label: Select uploaded blend mask file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST

- id: blend_file_enable
  label: Enable file blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params: []

- id: blacklevel_select_file
  label: Select uploaded black level mask file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: Filename previously uploaded via HTTP POST

- id: blacklevel_file_enable
  label: Enable black level correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params: []

- id: shutter_set_target
  label: Set shutter target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: string
      description: "Open" or "Closed"

- id: shutter_get_position
  label: Get shutter position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: optics_zoom_get_position
  label: Get zoom position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: optics_focus_get_position
  label: Get focus position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: optics_lensshift_horizontal_get_position
  label: Get horizontal lens shift position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: optics_lensshift_vertical_get_position
  label: Get vertical lens shift position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: standby_enable_set
  label: Enable/disable standby state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params: []

- id: eco_enable_set
  label: Enable/disable ECO state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params: []

- id: dmx_mode_set
  label: Set DMX mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""}}'
  params:
    - name: value
      type: string
      description: DMX mode name (use dmx.listmodes to enumerate)

- id: dmx_startchannel_set
  label: Set DMX start channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: DMX start channel (1..512)

- id: dmx_shutdown_set
  label: Set DMX shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false}}'
  params: []

- id: dmx_listchannels
  label: List DMX channel names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: environment_getcontrolblocks
  label: Get environment sensor blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: e.g. Temperature, Speed, PWM, Voltage, Current, Power, Humidity, Pressure

- id: environment_getalarminfo
  label: Get environment alarm info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_alarmstate_get
  label: Get environment alarm state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: firmware_listcomponents
  label: List firmware components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List firmware component version status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule firmware component upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: network_get_ip4config
  label: Get IPv4 network configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: network_get_lan_state
  label: Get LAN state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: image_color_p7_copypresettocustom
  label: Copy P7 preset to custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string
      description: Source preset name

- id: image_color_p7_resetpreset
  label: Reset P7 preset to default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset

- id: image_color_p7_resettonative
  label: Reset P7 to native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_next
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: serial_wake_from_eco
  label: Wake projector from ECO via RS-232
  kind: action
  command: ":POWR1\r"
  params: []

- id: http_upload_warp_file
  label: Upload warp grid file (HTTP)
  kind: action
  command: "curl -X POST -F file=@warp.xml http://<address>/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: string
      description: Local path to warp XML file

- id: http_upload_blend_mask
  label: Upload blend mask file (HTTP)
  kind: action
  command: "curl -X POST -F file=@mask.png http://<address>/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: string
      description: Local path to PNG/JPEG/TIFF mask (grayscale, 8 or 16 bit)

- id: http_upload_blacklevel_mask
  label: Upload black level mask file (HTTP)
  kind: action
  command: "curl -X POST -F file=@blacklevel.png http://<address>/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: string
      description: Local path to PNG/JPEG/TIFF mask (grayscale, 8 or 16 bit)

- id: http_download_warp_file
  label: Download current warp file (HTTP)
  kind: query
  command: "GET http://<address>/api/image/processing/warp/file/transfer"
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: image_window_main_source
  type: string
  description: Active source name (e.g. "DisplayPort 1", "HDMI")

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: illumination_sources_laser_power
  type: float
  description: Current laser power in percent

- id: illumination_sources_laser_minpower
  type: float
  description: Laser minimum power in percent (read-only, dynamic)

- id: illumination_sources_laser_maxpower
  type: float
  description: Laser maximum power in percent (read-only, dynamic)

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: firmware_component_version_status
  type: enum
  values: [Unknown, OK, Upgradable]

- id: image_connector_detectedsignal_active
  type: boolean

- id: image_connector_detectedsignal_name
  type: string

- id: environment_temperatures
  type: object
  description: Dictionary of sensor-name -> temperature in degrees C
```

## Variables
```yaml
# UNRESOLVED: dust-filter-specific settable parameters not enumerated in source.
# All listed properties below are read/write per source but model applicability not confirmed for the Dust Filter For FL40 accessory.
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  description: Normalized brightness/offset; 0 = default, 1 = 100% offset

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  description: Normalized contrast/gain; 1 = default

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  description: Gamma; default 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  description: Normalized color saturation; 1 = default

- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1
  description: Normalized sharpness

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean
```

## Events
```yaml
- id: property_changed
  description: Server-to-client notification carrying an array of property/value pairs when subscribed properties change.
  payload: |
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<name>":<value>}]}}

- id: signal_callback
  description: Server-to-client notification carrying an array of signal/argument-list pairs.
  payload: |
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<name>":{"arg":<value>}}]}}

- id: modelupdated_signal
  description: Signal triggered when the introspection object structure changes (objects added/removed).
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences other than the warp/blend/blacklevel workflows above (which are encoded as separate actions).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Verify projector state is "standby" or "ready" before issuing system.poweron (no-op otherwise).
  - description: Verify projector state is "on" before issuing system.poweroff (no-op otherwise).
# UNRESOLVED: dust-filter-specific interlocks (filter presence detection, replacement warnings, airflow safety) not documented in source.
```

## Notes
Source document is the generic Barco Pulse API manual covering the projector family, not a dust-filter-specific command catalogue. All commands above are inherited from the shared Pulse API and may or may not apply to the Dust Filter For FL40 accessory; verify applicability by introspecting the device (`method: introspect`) once connected. Serial wake-from-ECO sequence uses ASCII `:POWR1\r`. HTTP file uploads support PNG, JPEG, and TIFF; mask images must be grayscale (8 or 16 bit) and match the projector's blend/blacklevel layer resolution. Authentication is optional for normal end-user access and uses a numeric `code` parameter; higher access levels require a pass code.

<!-- UNRESOLVED: dust-filter-specific commands, properties, events, interlocks, and firmware compatibility ranges are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:08:11.660Z
last_checked_at: 2026-08-05T07:28:37.922Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:28:37.922Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "Every spec action and transport parameter matches verbatim against the Pulse API source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "dust-filter-specific commands, endpoints, or properties are not documented separately in the source — only the generic Pulse API is provided."
- "dust-filter-specific settable parameters not enumerated in source."
- "source documents no explicit multi-step sequences other than the warp/blend/blacklevel workflows above (which are encoded as separate actions)."
- "dust-filter-specific interlocks (filter presence detection, replacement warnings, airflow safety) not documented in source."
- "dust-filter-specific commands, properties, events, interlocks, and firmware compatibility ranges are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
