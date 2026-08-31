---
spec_id: admin/barco-dp-projector-companion
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco DP Projector (Pulse Companion) Control Spec"
manufacturer: Barco
model_family: "DP Projector (Pulse Companion)"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "DP Projector (Pulse Companion)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - barco.com
source_urls:
  - https://www.barco.com/en/support/docs/R5975236
retrieved_at: 2026-08-30T10:33:14.558Z
last_checked_at: 2026-08-30T22:16:34.034Z
generated_at: 2026-08-30T22:16:34.034Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "firmware version compatibility not stated in source; specific DP projector SKU/model list not enumerated in this source (spec applies generically to \"Pulse\" projectors); full property catalogue beyond the samples shown was not transcribed."
verification:
  verdict: verified
  checked_at: 2026-08-30T22:16:34.034Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions map verbatim to source JSON-RPC methods/properties, the serial :POWR1 wake token, or HTTP file-upload endpoints; transport values confirmed. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Barco DP Projector (Pulse Companion) Control Spec

## Summary
This spec covers the Barco DP projector family that runs the Pulse control platform, exposed over both RS-232 serial and TCP/IP as a JSON-RPC 2.0 service. The same Pulse API is reachable via serial cable or network on TCP port 9090, with model-dependent connectors (DisplayPort, HDMI, HDBaseT, DVI, SDI). Authentication is optional for end-user access; an authentication code request can elevate privileges when required.

<!-- UNRESOLVED: list any major gaps here -->

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
  type: optional
  notes: "authenticate JSON-RPC method with code parameter; required only for elevated access. End-user access can skip auth."
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "authenticate", "params": { "code": {code} } }'
  params:
    - name: code
      type: integer
      description: Numeric pass code (e.g. 98765) to elevate access level
- id: power_on
  label: Power On
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.poweron" }'
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.poweroff" }'
  params: []
- id: property_set
  label: Set Property
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. image.window.main.source)
    - name: value
      type: string
      description: Value to assign to the property
- id: property_get
  label: Get Property
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": [ {properties} ] } }'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property paths
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": [ {properties} ] } }'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property paths
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": [ {properties} ] } }'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property paths
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string
      description: Dot-notation signal path
- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": [ {signals} ] } }'
  params:
    - name: signals
      type: array
      description: Array of dot-notation signal paths
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string
      description: Dot-notation signal path
- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": [ {signals} ] } }'
  params:
    - name: signals
      type: array
      description: Array of dot-notation signal paths
- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true } }'
  params:
    - name: object
      type: string
      description: Dot-notation object name
- id: introspect_non_recursive
  label: Introspect Object (Non Recursive)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": false } }'
  params:
    - name: object
      type: string
      description: Dot-notation object name
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": {period} } }'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period in seconds
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.list" }'
  params: []
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.list" }'
  params: []
- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.{source}.listconnectors" }'
  params:
    - name: source
      type: string
      description: Lowercase, alphanumeric source object name (e.g. displayport1)
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" } }'
  params:
    - name: type
      type: string
      description: 'Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)'
    - name: valuetype
      type: string
      description: 'Sensor value type (Temperature, Speed, Voltage, Current, Power, etc.)'
- id: system_get_state
  label: Get Projector State
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" } }'
  params: []
- id: illumination_get_state
  label: Get Illumination State
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" } }'
  params: []
- id: illumination_set_laser_power
  label: Set Laser Illumination Power
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": {value} } }'
  params:
    - name: value
      type: number
      description: Target power in percent
- id: image_set_brightness
  label: Set Image Brightness
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": {value} } }'
  params:
    - name: value
      type: number
      description: Brightness offset (-1 to 1, normalized; 0 is default)
- id: image_set_active_source
  label: Set Active Source
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" } }'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "HDBaseT", "DVI 1")
- id: warp_enable
  label: Enable Warp
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true } }'
  params: []
- id: warp_select_file
  label: Select Warp File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{filename}" } }'
  params:
    - name: filename
      type: string
      description: Name of warp file uploaded via HTTP
- id: warp_enable_file
  label: Enable Warp File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true } }'
  params: []
- id: blend_select_file
  label: Select Blend File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "{filename}" } }'
  params:
    - name: filename
      type: string
      description: Name of blend mask file uploaded via HTTP
- id: blend_enable_file
  label: Enable Blend File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true } }'
  params: []
- id: blacklevel_select_file
  label: Select Black Level File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{filename}" } }'
  params:
    - name: filename
      type: string
      description: Name of black level mask file uploaded via HTTP
- id: blacklevel_enable_file
  label: Enable Black Level File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true } }'
  params: []
- id: eco_wake_serial
  label: Wake from ECO (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
- id: warp_upload_file
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local warp grid file (e.g. warp.xml)
- id: blend_upload_file
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local blend mask image (PNG/JPEG/TIFF)
- id: blacklevel_upload_file
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local black level mask image (PNG/JPEG/TIFF)
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: active_source
  type: string
  values_from: image.source.list
- id: available_sources
  type: array
  description: List of source names returned by image.source.list (model-dependent)
- id: available_connectors
  type: array
  description: List of connector names returned by image.connector.list (model-dependent)
- id: image_brightness
  type: number
  range: [-1, 1]
- id: illumination_laser_power
  type: number
  description: Laser illumination power in percent
- id: illumination_laser_minpower
  type: number
  description: Minimum laser power in percent (read-only)
- id: illumination_laser_maxpower
  type: number
  description: Maximum laser power in percent (read-only)
- id: environment_temperatures
  type: object
  description: Dictionary of sensor name to temperature reading (Celsius)
- id: environment_fan_speeds
  type: object
  description: Dictionary of fan name to RPM
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: firmware_firmwareversion
  type: string
- id: detected_signal
  type: object
  description: Detected signal info from image.connector.<name>.detectedsignal (active, name, h/v resolution/freq, scan, bits_per_component, color_space, etc.)
```

## Variables
```yaml
- name: image.brightness
  type: float
  range: [-1, 1]
  description: Image brightness/offset; 0 default, 1 is 100% offset
- name: image.window.main.source
  type: string
  description: Active source for the main window
- name: illumination.sources.laser.power
  type: float
  description: Laser illumination power target in percent
- name: illumination.sources.laser.minpower
  type: float
  read_only: true
  description: Minimum laser power in percent
- name: illumination.sources.laser.maxpower
  type: float
  read_only: true
  description: Maximum laser power in percent
- name: illumination.sources.laser.ispowerlimited
  type: bool
  read_only: true
  description: Whether laser power is currently limited
- name: illumination.sources.laser.powerlimitreason
  type: string
  read_only: true
  description: Reason power is limited
- name: image.processing.warp.enable
  type: bool
  description: Globally enable warp
- name: image.processing.warp.file.selected
  type: string
  description: Selected warp grid filename
- name: image.processing.warp.file.enable
  type: bool
  description: Enable selected warp file
- name: image.processing.blend.file.selected
  type: string
  description: Selected blend mask filename
- name: image.processing.blend.file.enable
  type: bool
  description: Enable selected blend mask
- name: image.processing.blacklevel.file.selected
  type: string
  description: Selected black level mask filename
- name: image.processing.blacklevel.file.enable
  type: bool
  description: Enable selected black level mask
- name: image.color.rgbmode.rgbmode
  type: enum
  values: [Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed]
  description: RGB mode
- name: image.color.p7.custom.whitetemperature
  type: int
  range: [3200, 13000]
  description: Desired white point temperature
- name: image.color.p7.custom.redgain
  type: float
  description: Desired red gain value
- name: image.color.p7.custom.greenx
  type: float
  description: Desired green x in xy-coordinates
- name: image.color.p7.custom.whitex
  type: float
  description: Desired white x in xy-coordinates
- name: image.connector.l1hdmi.signalrange
  type: enum
  values: [Auto, 0-255, 16-235]
- name: image.connector.l1hdmi.colorspace
  type: enum
  values: [Auto, RGB, REC709, REC601, REC2020]
- name: image.connector.l1displayport.colorprimaries
  type: enum
  values: [Auto, Uncorrected, REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]
- name: illumination.clo.enable
  type: bool
  description: Constant light output enabled
- name: illumination.clo.setpoint
  type: float
  description: Target luminosity of the light source
- name: illumination.clo.scale
  type: float
  description: Percentage to scale the CLO setpoint by
- name: dmx.artnet
  type: bool
  description: Artnet enabled
- name: dmx.shutdown
  type: bool
  description: DMX shutdown enabled
- name: dmx.shutdowntimeout
  type: int
  description: DMX shutdown timeout in minutes
- name: dmx.startchannel
  type: int
  range: [1, 512]
  description: DMX start channel
- name: gsm.pin
  type: string
  description: SIM card PIN (RW; requires elevated access)
- name: firmware.firmwareversion
  type: string
  read_only: true
```

## Events
```yaml
- id: property_changed
  description: Server emits notification when a subscribed property changes; payload is array of property/value pairs
  example: '{ "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }'
- id: signal_callback
  description: Server emits notification when a subscribed signal fires; payload is array of signal/argument-list pairs
  example: '{ "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }'
```

## Macros
```yaml
- id: select_displayport1
  label: Select DisplayPort 1 as input source
  kind: sequence
  steps:
    - property.set image.window.main.source = "DisplayPort 1"
- id: select_hdmi
  label: Select HDMI as input source
  kind: sequence
  steps:
    - property.set image.window.main.source = "HDMI"
- id: power_on_safe
  label: Power On (recommended)
  kind: sequence
  description: Source recommends verifying state is standby or ready before issuing power on
  steps:
    - property.get system.state
    - if state in [standby, ready]: system.poweron
- id: power_off_safe
  label: Power Off (recommended)
  kind: sequence
  description: Source recommends verifying state is on before issuing power off
  steps:
    - property.get system.state
    - if state == on: system.poweroff
- id: warp_apply
  label: Apply Warp File
  kind: sequence
  steps:
    - HTTP POST warp file to /api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected = filename
    - property.set image.processing.warp.file.enable = true
- id: blend_apply
  label: Apply Blend Mask
  kind: sequence
  steps:
    - HTTP POST blend image to /api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected = filename
    - property.set image.processing.blend.file.enable = true
- id: blacklevel_apply
  label: Apply Black Level Mask
  kind: sequence
  steps:
    - HTTP POST black level image to /api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected = filename
    - property.set image.processing.blacklevel.file.enable = true
- id: wake_from_eco
  label: Wake Projector from ECO Mode
  kind: sequence
  description: Source lists three methods: Wake-on-LAN, remote/keypad power button, or serial ":POWR1\r"
  steps:
    - send ":POWR1\r" on RS-232 serial port
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - system.poweron
interlocks:
  - source: "If the projector is already on (or transitioning), system.poweron is a no-op. If already off (or transitioning), system.poweroff is a no-op. Best practice: query system.state before issuing power commands."
  - source: "Best practice: wait for property.set confirmation before re-setting the same property to avoid flooding the server."
  - source: "Notifications are only sent on actual value changes; subscribing does not deliver the current value (use property.get for that)."
  - source: "ECO-mode projectors require explicit wake-up: Wake-on-LAN, remote/keypad power button, or serial ':POWR1\r'."
```

## Notes
Source describes Barco's "Pulse" JSON-RPC 2.0 control service that is exposed identically over RS-232 (19200 8N1, no flow control) and TCP port 9090. Property paths follow dot notation (e.g. image.window.main.source, illumination.sources.laser.power). The same protocol runs across DP projector models with model-dependent source/connector lists (DisplayPort 1/2, HDMI, HDBaseT 1/2, DVI 1/2, SDI A, plus dual-source variants). File endpoints under http://<address>/api/... are used for warp grid, blend mask, and black level mask uploads. Connectors for sources are addressed as image.source.<lowercasesourcename>.listconnectors, where <sourcename> is the source label with non-word chars stripped and lowercased (e.g. "DisplayPort 1" -> displayport1).

The refine input name in the request was `barco_dp_projector.refined.md`; the closest matching file on disk is `barco_dp_projector_companion.refined.md`, which is the Pulse Companion JSON-RPC reference. A separate `barco_dp_projector_companion.md` exists with the same content as a non-refined extract.

<!-- UNRESOLVED: firmware version compatibility not stated in source; specific DP projector SKU/model list not enumerated in this source (spec applies generically to "Pulse" projectors); full property catalogue beyond the samples shown was not transcribed. -->

## Provenance

```yaml
source_domains:
  - barco.com
source_urls:
  - https://www.barco.com/en/support/docs/R5975236
retrieved_at: 2026-08-30T10:33:14.558Z
last_checked_at: 2026-08-30T22:16:34.034Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:16:34.034Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions map verbatim to source JSON-RPC methods/properties, the serial :POWR1 wake token, or HTTP file-upload endpoints; transport values confirmed. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "firmware version compatibility not stated in source; specific DP projector SKU/model list not enumerated in this source (spec applies generically to \"Pulse\" projectors); full property catalogue beyond the samples shown was not transcribed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
