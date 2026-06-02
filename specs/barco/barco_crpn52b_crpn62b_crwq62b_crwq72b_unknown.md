---
spec_id: admin/barco-crpn52b-crpn62b-crwq62b-crwq72b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco CRPN52B CRPN62B CRWQ62B CRWQ72B Control Spec"
manufacturer: Barco
model_family: CRPN52B
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - CRPN52B
    - CRPN62B
    - CRWQ62B
    - CRWQ72B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:38:51.830Z
last_checked_at: 2026-05-20T05:20:50.840Z
generated_at: 2026-05-20T05:20:50.840Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "which specific models have ECO mode vs standby only"
  - "which specific models have laser vs LED vs other illumination"
  - "source does not describe explicit safety interlocks or power sequencing"
  - "maximum concurrent connections not stated"
  - "JSON-RPC batch request support not stated"
  - "command rate limits / throttling not stated"
  - "which illumination source types (laser/LED/xenon) per model not stated"
  - "HTTP file endpoint authentication requirements not stated"
  - "network IP configuration method (DHCP/static) not stated"
verification:
  verdict: verified
  checked_at: 2026-05-20T05:20:50.840Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match source commands; transport parameters verified in protocol documentation. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco CRPN52B CRPN62B CRWQ62B CRWQ72B Control Spec

## Summary
Barco Pulse projectors (CRPN52B, CRPN62B, CRWQ62B, CRWQ72B) controlled via JSON-RPC 2.0 over TCP/IP or RS-232 serial. API covers power management, source selection, illumination control, image adjustment, warp/blend, DMX, optics, and environment monitoring. Same command set across all connection types.

<!-- UNRESOLVED: which specific models have ECO mode vs standby only -->
<!-- UNRESOLVED: which specific models have laser vs LED vs other illumination -->

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
  type: passcode
  # Source: "A client session must start with an authentication request containing a secret pass code."
  # "Authentication is only necessary when a higher level than normal end user is required."
  # Method: authenticate with params.code
```

## Traits
```yaml
- powerable     # system.poweron / system.poweroff methods
- queryable     # property.get returns current state values
- routable      # image.window.main.source selects input
- levelable     # brightness, contrast, saturation, gamma, laser power adjustable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  method: system.poweron
  params: []
  notes: Result is null. Verify system.state is standby or ready before issuing.

- id: power_off
  label: Power Off
  kind: action
  method: system.poweroff
  params: []
  notes: Result is null. Verify system.state is on before issuing.

- id: eco_wake_serial
  label: ECO Wake (Serial)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: ASCII string sent over RS-232 to wake from ECO mode. Wake-on-LAN or IR also available.

- id: authenticate
  label: Authenticate
  kind: action
  method: authenticate
  params:
    - name: code
      type: integer
      description: Secret passcode for elevated access level

- id: set_source
  label: Set Active Source
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.source"
    - name: value
      type: string
      description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI, DVI 1, HDBaseT, SDI)"

- id: set_brightness
  label: Set Brightness
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.brightness"
    - name: value
      type: float
      description: "Normalized offset, -1 to 1, default 0, precision 0.01"

- id: set_contrast
  label: Set Contrast
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.contrast"
    - name: value
      type: float
      description: "Normalized gain, 0 to 2, default 1, precision 0.01"

- id: set_gamma
  label: Set Gamma
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.gamma"
    - name: value
      type: float
      description: "1 to 3, default 2.2, precision 0.1"

- id: set_saturation
  label: Set Saturation
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.saturation"
    - name: value
      type: float
      description: "0 to 2, default 1, precision 0.01"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.sharpness"
    - name: value
      type: integer
      description: "-2 to 8"

- id: set_laser_power
  label: Set Laser Power
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.power"
    - name: value
      type: float
      description: "Target power in percent (between minpower and maxpower)"

- id: set_orientation
  label: Set Orientation
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.orientation"
    - name: value
      type: string
      description: "DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR"

- id: set_scaling_mode
  label: Set Scaling Mode
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.window.main.scalingmode"
    - name: value
      type: string
      description: "Fill, OneToOne, FillScreen, Stretch"

- id: set_shutter
  label: Set Shutter Position
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "optics.shutter.position"
    - name: value
      type: string
      description: "Open or Closed"

- id: set_warp_enable
  label: Set Warp Enable
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.warp.enable"
    - name: value
      type: boolean

- id: set_blend_file_enable
  label: Set Blend File Enable
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.enable"
    - name: value
      type: boolean

- id: set_blacklevel_file_enable
  label: Set Black Level File Enable
  kind: action
  method: property.set
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.enable"
    - name: value
      type: boolean

- id: introspect
  label: Introspect Object Tree
  kind: action
  method: introspect
  params:
    - name: object
      type: string
      description: "Object name in dot notation, empty for root"
    - name: recursive
      type: boolean
      description: "true = full metadata, false = list child objects only"

- id: list_sources
  label: List Available Sources
  kind: action
  method: image.source.list
  params: []

- id: list_connectors
  label: List Connectors
  kind: action
  method: image.connector.list
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: action
  method: dmx.listmodes
  params: []

- id: list_dmx_channels
  label: List DMX Channels
  kind: action
  method: dmx.listchannels
  params: []

- id: get_alarm_info
  label: Get Alarm Info
  kind: action
  method: environment.getalarminfo
  params: []

- id: engage_clo
  label: Engage CLO
  kind: action
  method: illumination.clo.engage
  params: []
  notes: Engages Constant Light Output at current light level

- id: list_firmware_components
  label: List Firmware Components
  kind: action
  method: firmware.listcomponents
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Upgrade
  kind: action
  method: firmware.schedulecomponentupgrade
  params: []
  notes: Force component upgrade at next reboot
- id: property_get
  label: Get Property Value
  kind: query
  method: property.get
  params:
    - name: property
      type: string
      description: "Property name in dot notation (e.g. system.state, image.brightness)"
  notes: Can also accept an array of property names to read multiple values at once.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  method: property.subscribe
  params:
    - name: property
      type: string
      description: "Property name or array of property names to subscribe to"
  notes: Server pushes property.changed notifications when value changes. Does not return current value; use property.get for that.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  method: property.unsubscribe
  params:
    - name: property
      type: string
      description: "Property name or array of property names to unsubscribe from"

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  method: signal.subscribe
  params:
    - name: signal
      type: string
      description: "Signal name or array of signal names (e.g. modelupdated, image.processing.warp.gridchanged)"
  notes: Server pushes signal.callback notifications when signal fires.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  method: signal.unsubscribe
  params:
    - name: signal
      type: string
      description: "Signal name or array of signal names to unsubscribe from"

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  method: illumination.laser.getserialnumber
  params: []

- id: color_p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  method: image.color.p7.custom.copypresettocustom
  params:
    - name: presetname
      type: string
      description: "Name of the preset to copy to custom"

- id: color_p7_reset_preset
  label: Reset P7 Preset to Default
  kind: action
  method: image.color.p7.custom.resetpreset
  params:
    - name: presetname
      type: string
      description: "Name of the preset to reset to its default values"
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  property: system.state
  description: "Current projector operating state"

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  property: illumination.state
  description: "Lamp/LED/laser illumination state"

- id: active_source
  type: string
  property: image.window.main.source
  description: "Currently displayed source name"

- id: brightness
  type: float
  property: image.brightness
  description: "Current brightness value (-1 to 1)"

- id: contrast
  type: float
  property: image.contrast
  description: "Current contrast value (0 to 2)"

- id: gamma
  type: float
  property: image.gamma
  description: "Current gamma value (1 to 3)"

- id: saturation
  type: float
  property: image.saturation
  description: "Current saturation value (0 to 2)"

- id: sharpness
  type: integer
  property: image.sharpness
  description: "Current sharpness value (-2 to 8)"

- id: laser_power
  type: float
  property: illumination.sources.laser.power
  description: "Current laser power in percent"

- id: laser_min_power
  type: float
  property: illumination.sources.laser.minpower
  description: "Minimum laser power in percent (read-only, dynamic)"

- id: laser_max_power
  type: float
  property: illumination.sources.laser.maxpower
  description: "Maximum laser power in percent (read-only, dynamic)"

- id: shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position
  description: "Current shutter position"

- id: zoom_position
  type: integer
  property: optics.zoom.position
  description: "Current zoom position"

- id: focus_position
  type: integer
  property: optics.focus.position
  description: "Current focus position"

- id: lensshift_horizontal
  type: integer
  property: optics.lensshift.horizontal.position
  description: "Current horizontal lens shift position"

- id: lensshift_vertical
  type: integer
  property: optics.lensshift.vertical.position
  description: "Current vertical lens shift position"

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate
  description: "Current alarm severity"

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state
  description: "LAN connection state"

- id: connector_signal
  type: object
  property: "image.connector.<name>.detectedsignal"
  description: "Detected signal info per connector (active, resolution, refresh, color space, etc.)"

- id: temperatures
  type: object
  method: environment.getcontrolblocks
  params:
    type: Sensor
    valuetype: Temperature
  description: "Dictionary of all temperature sensor readings"

- id: fan_speeds
  type: object
  method: environment.getcontrolblocks
  params:
    type: Sensor
    valuetype: Speed
  description: "Dictionary of all fan speed readings in RPM"

- id: firmware_status
  type: object
  method: firmware.listcomponentversionstatus
  description: "Firmware components with available/running versions and upgrade status"
```

## Variables
```yaml
- id: window_position
  property: image.window.main.position
  type: object
  fields:
    - name: x
      type: integer
    - name: y
      type: integer
  description: "Window position"

- id: window_size
  property: image.window.main.size
  type: object
  fields:
    - name: width
      type: integer
    - name: height
      type: integer
  description: "Window size"

- id: dmx_mode
  property: dmx.mode
  type: string
  description: "Current DMX mode"

- id: dmx_start_channel
  property: dmx.startchannel
  type: integer
  description: "DMX start channel (1-512)"

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  description: "DMX shutdown enabled"

- id: standby_enable
  property: system.standby.enable
  type: boolean
  description: "Enable/disable standby state availability"

- id: eco_enable
  property: system.eco.enable
  type: boolean
  description: "Enable/disable ECO state availability"

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  description: "Currently selected warp grid filename"

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  description: "Currently selected blend mask filenames"

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  description: "Currently selected black level mask filename"
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: "Pushed when any subscribed property value changes. Params contain array of property/value pairs."
  params:
    - name: property
      type: array
      description: "Array of {objectname.propertyname: value} objects"

- id: signal_callback
  method: signal.callback
  description: "Pushed when a subscribed signal fires."
  params:
    - name: signal
      type: array
      description: "Array of {objectname.signalname: {args}} objects"

- id: model_updated
  signal: modelupdated
  description: "Fired when object structure changes (objects added or removed). Callback includes object name and isnew flag."
```

## Macros
```yaml
- id: warp_grid_apply
  label: Apply Warp Grid File
  steps:
    - description: "Upload warp grid via HTTP POST"
      method: "curl -F file=@warp.xml http://<projector_ip>/api/image/processing/warp/file/transfer"
    - method: property.set
      params:
        property: image.processing.warp.file.selected
        value: "<filename>"
    - method: property.set
      params:
        property: image.processing.warp.file.enable
        value: true

- id: blend_mask_apply
  label: Apply Blend Mask File
  steps:
    - description: "Upload blend mask via HTTP POST"
      method: "curl -F file=@mask.png http://<projector_ip>/api/image/processing/blend/file/transfer"
    - method: property.set
      params:
        property: image.processing.blend.file.selected
        value: "<filename>"
    - method: property.set
      params:
        property: image.processing.blend.file.enable
        value: true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe explicit safety interlocks or power sequencing
# beyond recommending state verification before power commands
```

## Notes
- JSON-RPC 2.0 protocol. All methods use `property.set`/`property.get` pattern with dot-notation property names.
- `property.set` best practice: wait for confirmation before setting the same property again to avoid flooding.
- Source names are model-dependent; use `image.source.list` to discover available sources at runtime.
- Source object names derived by stripping non-word chars and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- File uploads (warp grids, blend masks, black level masks) use HTTP POST to `/api/<path>/file/transfer`.
- The API is dynamic — introspection is the authoritative way to discover available objects/methods/properties for a specific projector configuration.
- ECO wake via serial uses raw ASCII `:POWR1\r`, not JSON-RPC.
- Property subscriptions (`property.subscribe`) only deliver change notifications; use `property.get` for current value.
- Source change generates two notifications: deselection of old source (empty string), then selection of new source.

<!-- UNRESOLVED: maximum concurrent connections not stated -->
<!-- UNRESOLVED: JSON-RPC batch request support not stated -->
<!-- UNRESOLVED: command rate limits / throttling not stated -->
<!-- UNRESOLVED: which illumination source types (laser/LED/xenon) per model not stated -->
<!-- UNRESOLVED: HTTP file endpoint authentication requirements not stated -->
<!-- UNRESOLVED: network IP configuration method (DHCP/static) not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:38:51.830Z
last_checked_at: 2026-05-20T05:20:50.840Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:20:50.840Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match source commands; transport parameters verified in protocol documentation. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "which specific models have ECO mode vs standby only"
- "which specific models have laser vs LED vs other illumination"
- "source does not describe explicit safety interlocks or power sequencing"
- "maximum concurrent connections not stated"
- "JSON-RPC batch request support not stated"
- "command rate limits / throttling not stated"
- "which illumination source types (laser/LED/xenon) per model not stated"
- "HTTP file endpoint authentication requirements not stated"
- "network IP configuration method (DHCP/static) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
