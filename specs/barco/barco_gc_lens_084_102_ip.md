---
spec_id: admin/barco-gc-lens-084-102
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gc Lens 084 102 Control Spec"
manufacturer: Barco
model_family: "Gc Lens 084 102"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Gc Lens 084 102"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T18:02:22.946Z
last_checked_at: 2026-08-05T08:06:08.172Z
generated_at: 2026-08-05T08:06:08.172Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. DMX extended-mode channel count not enumerated. Full per-connector/property list is dynamic and should be obtained via introspect at runtime."
  - "passcode value/credential format not documented in source"
  - "voltage/current/power environment blocks are read-only telemetry,"
  - "source describes multi-step procedures (upload warp grid then"
  - "source notes good practice to verify projector state (standby/"
  - "authentication passcode value/format not stated (example 98765 only). Firmware version compatibility not stated. Extended DMX channel count not enumerated. Per-model connector/source list varies."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:06:08.172Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match JSON-RPC methods/serial commands in source; transport port 9090, 19200 8N1, and passcode auth are all verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gc Lens 084 102 Control Spec

## Summary
Barco Pulse projector controllable via the Pulse JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200 baud). The API exposes methods for power, source selection, illumination/laser power, picture settings, warp/blend/black-level file management, optics (shutter/zoom/focus/lens shift), DMX, environment telemetry, and firmware management. Optional authentication via passcode raises the client access level.

<!-- UNRESOLVED: firmware version compatibility not stated in source. DMX extended-mode channel count not enumerated. Full per-connector/property list is dynamic and should be obtained via introspect at runtime. -->

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
  type: passcode  # source describes authenticate method with secret code
  # UNRESOLVED: passcode value/credential format not documented in source
```

## Traits
```yaml
# - powerable       (system.poweron / system.poweroff present)
# - routable        (image.window.main.source selection present)
# - queryable       (property.get returning state present)
# - levelable       (illumination power, brightness, contrast, gamma, saturation, sharpness present)
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (raise access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (value 98765 is example from source)

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: Wake from ECO mode (serial)
  kind: action
  command: ':POWR1\r'
  params: []

- id: introspect
  label: Introspect object metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty = everything)
    - name: recursive
      type: boolean
      description: If false, only one level of object names is listed

- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: any
      description: Value to set

- id: property_get
  label: Get property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation

- id: property_subscribe
  label: Subscribe to property change(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from property change(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":{id}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: signal_subscribe
  label: Subscribe to signal(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from signal(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":{id}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":1}'
  params: []

- id: image_source_listconnectors
  label: List connectors used by a source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors","id":1}'
  params:
    - name: sourceobject
      type: string
      description: Source object name (source name lowercased, non-word chars removed)

- id: select_source
  label: Select active source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
  params:
    - name: source
      type: string
      description: Source name e.g. "DisplayPort 1", "HDMI", "DVI 1", "HDBaseT", "SDI"

- id: set_laser_power
  label: Set laser power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: set_brightness
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized offset, min -1, max 1, default 0, precision 0.01

- id: set_contrast
  label: Set image contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized gain, min 0, max 2, default 1, precision 0.01

- id: set_gamma
  label: Set image gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}},"id":1}'
  params:
    - name: value
      type: float
      description: Gamma, min 1, max 3, default 2.2, precision 0.1

- id: set_saturation
  label: Set image saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized, min 0, max 2, default 1, precision 0.01

- id: set_sharpness
  label: Set image sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}},"id":1}'
  params:
    - name: value
      type: integer
      description: Normalized, min -2, max 8, step 1

- id: set_warp_enable
  label: Enable/disable all warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}},"id":10}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: set_warp_file_selected
  label: Select warp grid file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
  params:
    - name: filename
      type: string
      description: Warp grid file name

- id: set_warp_file_enable
  label: Enable warp file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}},"id":12}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: set_blend_file_selected
  label: Select blend mask file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
  params:
    - name: filename
      type: string
      description: Blend mask file name

- id: set_blend_file_enable
  label: Enable blend mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}},"id":14}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: set_blacklevel_file_selected
  label: Select black level mask file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
  params:
    - name: filename
      type: string
      description: Black level mask file name

- id: set_blacklevel_file_enable
  label: Enable black level mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}},"id":16}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: upload_warp_file
  label: Upload warp grid file (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address

- id: upload_blend_file
  label: Upload blend mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address

- id: upload_blacklevel_file
  label: Upload black level mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address

- id: environment_getcontrolblocks
  label: Get environment telemetry block
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: type
      type: string
      description: 'Sensor type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Value type enum e.g. Temperature, Speed, Voltage, Current, Humidity, Pressure'

- id: environment_getalarminfo
  label: Get alarm info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":1}'
  params: []

- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":1}'
  params: []

- id: dmx_listchannels
  label: List DMX channel names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":1}'
  params: []

- id: firmware_listcomponents
  label: List firmware components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":1}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List firmware component versions and status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":1}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule firmware component upgrade at next reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":1}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":1}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":1}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy color preset to custom (p7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"},"id":1}'
  params:
    - name: presetname
      type: string
      description: Preset name to copy

- id: image_color_p7_custom_resetpreset
  label: Reset color preset to defaults (p7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"},"id":1}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset

- id: image_color_p7_custom_resettonative
  label: Reset p7 custom color to native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":1}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":1}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  query: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  query: illumination.state

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query: environment.alarmstate

- id: active_source
  type: string
  query: image.window.main.source

- id: laser_power
  type: integer
  query: illumination.sources.laser.power

- id: detected_signal
  type: object
  query: image.connector.{name}.detectedsignal
```

## Variables
```yaml
- id: laser_power_level
  type: integer
  min: 0
  max: 100
  description: Target laser power in percent (illumination.sources.laser.power)

- id: brightness
  type: float
  min: -1
  max: 1
  precision: 0.01

- id: contrast
  type: float
  min: 0
  max: 2
  precision: 0.01

- id: gamma
  type: float
  min: 1
  max: 3
  precision: 0.1

- id: saturation
  type: float
  min: 0
  max: 2
  precision: 0.01

- id: sharpness
  type: integer
  min: -2
  max: 8
  step: 1

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512
  description: DMX start channel (dmx.startchannel)

- id: dmx_mode
  type: string
  description: DMX mode (dmx.mode)

- id: dmx_shutdown
  type: boolean
  description: DMX shutdown enabled (dmx.shutdown)

- id: shutter_position
  type: enum
  values: [Open, Closed]
  description: optics.shutter.position

- id: zoom_position
  type: integer
  description: optics.zoom.position

- id: focus_position
  type: integer
  description: optics.focus.position

- id: lensshift_horizontal
  type: integer
  description: optics.lensshift.horizontal.position

- id: lensshift_vertical
  type: integer
  description: optics.lensshift.vertical.position

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  description: image.orientation

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  description: image.window.main.scalingmode

# UNRESOLVED: voltage/current/power environment blocks are read-only telemetry,
# not settable; not listed here as variables.
```

## Events
```yaml
- id: property_changed
  description: Unsolicited notification when a subscribed property value changes
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"{name}":{value}}]}}'

- id: signal_callback
  description: Unsolicited notification when a subscribed signal is emitted
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"{name}":{"arg1":{v}}}]}}

- id: modelupdated
  description: Signal triggered when the object structure changes (objects added/removed)
```

## Macros
```yaml
# UNRESOLVED: source describes multi-step procedures (upload warp grid then
# select then enable; ECO wake sequences) but does not name discrete macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - power_on
  - power_off
# UNRESOLVED: source notes good practice to verify projector state (standby/
# ready) before power_on and (on) before power_off, but states no enforced
# interlocks, sequencing requirements, or safety warnings beyond ECO wake.
```

## Notes
- API is JSON-RPC 2.0 over TCP (port 9090) and serial (RS-232, 19200/8N1, no flow control). Same command set on both transports.
- Wait for `property.set` confirmation before re-setting the same property; flooding degrades performance (source guidance, line 121).
- Notifications carry no `id`; clients must NOT send a response (line 183).
- Subscribing does NOT return the current value — use `property.get` first (line 493).
- Source selection emits two `property.changed` notifications: first clearing the old source, then setting the new one (line 463).
- ECO-mode wake options: WoL (MAC address), remote power button, keypad power button, or serial string `:POWR1\r` (lines 765–777).
- API is partially dynamic; lens/peripheral availability varies. Use `introspect` to discover the exact API of a configured projector (lines 779–783).
- DMX basic mode exposes 2 channels; extended mode exposes more (line 781).
<!-- UNRESOLVED: authentication passcode value/format not stated (example 98765 only). Firmware version compatibility not stated. Extended DMX channel count not enumerated. Per-model connector/source list varies. -->
````

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T18:02:22.946Z
last_checked_at: 2026-08-05T08:06:08.172Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:06:08.172Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match JSON-RPC methods/serial commands in source; transport port 9090, 19200 8N1, and passcode auth are all verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. DMX extended-mode channel count not enumerated. Full per-connector/property list is dynamic and should be obtained via introspect at runtime."
- "passcode value/credential format not documented in source"
- "voltage/current/power environment blocks are read-only telemetry,"
- "source describes multi-step procedures (upload warp grid then"
- "source notes good practice to verify projector state (standby/"
- "authentication passcode value/format not stated (example 98765 only). Firmware version compatibility not stated. Extended DMX channel count not enumerated. Per-model connector/source list varies."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
