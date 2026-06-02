---
spec_id: admin/barco-f80q9-f90-4k13-w13
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F80Q9 F90 4K13 W13 Control Spec"
manufacturer: Barco
model_family: F80Q9
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - F80Q9
    - "F90 4K13"
    - W13
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:45:24.811Z
last_checked_at: 2026-06-02T21:49:55.511Z
generated_at: 2026-06-02T21:49:55.511Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no multi-step macro sequences explicitly described in source"
  - "source does not describe explicit safety interlock sequences beyond good-practice state checks"
  - "firmware version compatibility not stated in source"
  - "exact laser power range per model not stated (min/max are dynamic, lens-dependent)"
  - "HTTP file transfer endpoint authentication not specified"
  - "exact available sources and connectors per model variant not listed"
  - "warp file format details only referenced as \"same as MCM500/400\""
  - "lens position integer ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:49:55.511Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco F80Q9 F90 4K13 W13 Control Spec

## Summary
Barco Pulse series projectors (F80Q9, F90 4K13, W13) controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Supports power management, source selection, illumination/laser power control, picture adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/blacklevel processing, optics (zoom, focus, lens shift, shutter), DMX, and environmental monitoring.

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
  description: Authentication via JSON-RPC method "authenticate" with code parameter. Only required for elevated access levels; normal end-user access can skip auth.
```

## Traits
```yaml
traits:
  - powerable    # system.poweron / system.poweroff
  - queryable    # property.get for all readable properties
  - routable     # image.window.main.source selection, image.source.list
  - levelable    # brightness, contrast, gamma, saturation, sharpness, laser power
```

## Actions
```yaml
actions:
  - id: system_poweron
    label: Power On
    kind: action
    method: system.poweron
    params: []

  - id: system_poweroff
    label: Power Off
    kind: action
    method: system.poweroff
    params: []

  - id: set_property
    label: Set Property
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "Dot-notation property name, e.g. image.window.main.source"
      - name: value
        type: any
        description: "Value to set; type depends on property"

  - id: get_property
    label: Get Property
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        description: "Dot-notation property name"
      - name: id
        type: integer
        required: false
        description: "Request identifier"

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string
        description: "Property name or array of property names"

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string
        description: "Property name or array of property names"

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names"

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names"

  - id: introspect
    label: Introspect Object Tree
    kind: query
    method: introspect
    params:
      - name: object
        type: string
        required: false
        description: "Object name in dot notation; empty introspects everything"
      - name: recursive
        type: boolean
        required: false
        description: "If false, only list object names one level deep"

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: "Secret pass code for elevated access level"

  - id: list_sources
    label: List Available Sources
    kind: query
    method: image.source.list
    params: []

  - id: list_connectors
    label: List Connectors
    kind: query
    method: image.connector.list
    params: []

  - id: list_source_connectors
    label: List Connectors for Source
    kind: query
    method: "image.source.{sourceObjectName}.listconnectors"
    params:
      - name: sourceObjectName
        type: string
        description: "Source name converted to lowercase with non-word chars removed, e.g. displayport1"

  - id: set_active_source
    label: Set Active Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.window.main.source"
      - name: value
        type: string
        description: "Source name from image.source.list, e.g. DisplayPort 1, HDMI"

  - id: set_illumination_power
    label: Set Illumination Laser Power
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "illumination.sources.laser.power"
      - name: value
        type: float
        description: "Target power in percent"

  - id: set_brightness
    label: Set Brightness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.brightness"
      - name: value
        type: float
        description: "Normalized value, -1 to 1, default 0"

  - id: set_contrast
    label: Set Contrast
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.contrast"
      - name: value
        type: float
        description: "Normalized value, 0 to 2, default 1"

  - id: set_gamma
    label: Set Gamma
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.gamma"
      - name: value
        type: float
        description: "Value 1 to 3, default 2.2"

  - id: set_saturation
    label: Set Saturation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.saturation"
      - name: value
        type: float
        description: "Normalized value, 0 to 2, default 1"

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.sharpness"
      - name: value
        type: integer
        description: "Value -2 to 8"

  - id: set_orientation
    label: Set Orientation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.orientation"
      - name: value
        type: string
        description: "One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR"

  - id: set_scaling_mode
    label: Set Scaling Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.window.main.scalingmode"
      - name: value
        type: string
        description: "One of Fill, OneToOne, FillScreen, Stretch"

  - id: set_warp_enable
    label: Enable/Disable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.warp.enable"
      - name: value
        type: boolean

  - id: set_warp_file_enable
    label: Enable/Disable File Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.warp.file.enable"
      - name: value
        type: boolean

  - id: select_warp_file
    label: Select Warp File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.warp.file.selected"
      - name: value
        type: string
        description: "Filename of uploaded warp grid"

  - id: set_blend_enable
    label: Enable/Disable Blend Mask
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blend.file.enable"
      - name: value
        type: boolean

  - id: select_blend_file
    label: Select Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blend.file.selected"
      - name: value
        type: string
        description: "Filename of uploaded blend mask"

  - id: set_blacklevel_enable
    label: Enable/Disable Black Level Correction
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blacklevel.file.enable"
      - name: value
        type: boolean

  - id: select_blacklevel_file
    label: Select Black Level File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "image.processing.blacklevel.file.selected"
      - name: value
        type: string
        description: "Filename of uploaded black level mask"

  - id: set_shutter_position
    label: Set Shutter Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.shutter.position"
      - name: value
        type: string
        description: "One of Open, Closed"

  - id: set_zoom
    label: Set Zoom Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.zoom.position"
      - name: value
        type: integer

  - id: set_focus
    label: Set Focus Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.focus.position"
      - name: value
        type: integer

  - id: set_lens_shift_horizontal
    label: Set Horizontal Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.lensshift.horizontal.position"
      - name: value
        type: integer

  - id: set_lens_shift_vertical
    label: Set Vertical Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "optics.lensshift.vertical.position"
      - name: value
        type: integer

  - id: set_standby_enable
    label: Enable/Disable Standby State
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "system.standby.enable"
      - name: value
        type: boolean

  - id: set_eco_enable
    label: Enable/Disable ECO State
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "system.eco.enable"
      - name: value
        type: boolean

  - id: set_dmx_mode
    label: Set DMX Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "dmx.mode"
      - name: value
        type: string

  - id: set_dmx_start_channel
    label: Set DMX Start Channel
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "dmx.startchannel"
      - name: value
        type: integer
        description: "DMX start channel 1-512"

  - id: set_dmx_shutdown
    label: Set DMX Shutdown
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "dmx.shutdown"
      - name: value
        type: boolean

  - id: dmx_list_channels
    label: List DMX Channels
    kind: query
    method: dmx.listchannels
    params: []

  - id: dmx_list_modes
    label: List DMX Modes
    kind: query
    method: dmx.listmodes
    params: []

  - id: environment_get_control_blocks
    label: Get Environment Control Blocks
    kind: query
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
      - name: valuetype
        type: string
        description: "Value type: Temperature, Speed, PWM, Voltage, Current, Power, etc."

  - id: environment_get_alarm_info
    label: Get Alarm Info
    kind: query
    method: environment.getalarminfo
    params: []

  - id: firmware_list_components
    label: List Firmware Components
    kind: query
    method: firmware.listcomponents
    params: []

  - id: firmware_list_component_version_status
    label: List Firmware Version Status
    kind: query
    method: firmware.listcomponentversionstatus
    params: []

  - id: firmware_schedule_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
    params: []

  - id: illumination_clo_engage
    label: Engage CLO
    kind: action
    method: illumination.clo.engage
    params: []

  - id: illumination_laser_get_serial
    label: Get Laser Serial Number
    kind: query
    method: illumination.laser.getserialnumber
    params: []

  - id: led_blink
    label: Blink LED
    kind: action
    method: ledctrl.blink
    params:
      - name: led
        type: string
        description: "LED identifier, e.g. systemstatus"
      - name: color
        type: string
        description: "Color name, e.g. red"
      - name: period
        type: integer
        description: "Blink period"

  - id: eco_wakeup_serial
    label: ECO Wakeup via Serial
    kind: action
    transport: serial
    description: "Send ASCII :POWR1\\r over RS-232 to wake from ECO mode"
    params: []

  - id: image_color_copy_preset
    label: Copy Color Preset to Custom
    kind: action
    method: image.color.p7.custom.copypresettocustom
    params:
      - name: presetname
        type: string

  - id: image_color_reset_preset
    label: Reset Color Preset
    kind: action
    method: image.color.p7.custom.resetpreset
    params:
      - name: presetname
        type: string

  - id: image_color_reset_to_native
    label: Reset Color to Native
    kind: action
    method: image.color.p7.custom.resettonative
    params: []

  - id: next_rgb_mode
    label: Next RGB Mode
    kind: action
    method: image.color.rgbmode.nextrgbmode
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, "on", deconditioning, service, error]
    property: system.state
    description: "Current projector operating state"

  - id: illumination_state
    type: enum
    values: [On, Off]
    property: illumination.state
    description: "Illumination on/off state"

  - id: laser_power
    type: float
    property: illumination.sources.laser.power
    description: "Current laser power level in percent"

  - id: laser_min_power
    type: float
    property: illumination.sources.laser.minpower
    description: "Minimum laser power in percent"

  - id: laser_max_power
    type: float
    property: illumination.sources.laser.maxpower
    description: "Maximum laser power in percent"

  - id: active_source
    type: string
    property: image.window.main.source
    description: "Currently active source name"

  - id: brightness
    type: float
    property: image.brightness
    description: "Brightness value -1 to 1"

  - id: contrast
    type: float
    property: image.contrast
    description: "Contrast value 0 to 2"

  - id: gamma
    type: float
    property: image.gamma
    description: "Gamma value 1 to 3"

  - id: saturation
    type: float
    property: image.saturation
    description: "Saturation value 0 to 2"

  - id: sharpness
    type: integer
    property: image.sharpness
    description: "Sharpness value -2 to 8"

  - id: orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    property: image.orientation

  - id: scaling_mode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    property: image.window.main.scalingmode

  - id: shutter_position
    type: enum
    values: [Open, Closed]
    property: optics.shutter.position

  - id: shutter_target
    type: enum
    values: [Open, Closed]
    property: optics.shutter.target

  - id: zoom_position
    type: integer
    property: optics.zoom.position

  - id: focus_position
    type: integer
    property: optics.focus.position

  - id: lens_shift_horizontal
    type: integer
    property: optics.lensshift.horizontal.position

  - id: lens_shift_vertical
    type: integer
    property: optics.lensshift.vertical.position

  - id: network_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate
    description: "Current alarm severity"

  - id: dmx_mode
    type: string
    property: dmx.mode

  - id: dmx_start_channel
    type: integer
    property: dmx.startchannel

  - id: connector_detected_signal
    type: object
    property: "image.connector.{name}.detectedsignal"
    description: "Signal info for a connector: active, name, resolution, frequency, color_space, etc."

  - id: warp_enable
    type: boolean
    property: image.processing.warp.enable

  - id: warp_file_selected
    type: string
    property: image.processing.warp.file.selected
```

## Variables
```yaml
variables:
  - id: laser_power
    property: illumination.sources.laser.power
    type: float
    min: 0
    max: 100
    description: "Laser power target in percent"

  - id: brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    precision: 0.01
    description: "Image brightness offset, 0 is default"

  - id: contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    precision: 0.01
    description: "Image contrast gain, 1 is default"

  - id: gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    precision: 0.1
    description: "Image gamma, default 2.2"

  - id: saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    precision: 0.01
    description: "Color saturation, 1 is default"

  - id: sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    description: "Image sharpness"

  - id: zoom_position
    property: optics.zoom.position
    type: integer
    description: "Zoom position"

  - id: focus_position
    property: optics.focus.position
    type: integer
    description: "Focus position"

  - id: lens_shift_h
    property: optics.lensshift.horizontal.position
    type: integer
    description: "Horizontal lens shift"

  - id: lens_shift_v
    property: optics.lensshift.vertical.position
    type: integer
    description: "Vertical lens shift"

  - id: dmx_start_channel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Pushed when a subscribed property value changes. Params contain array of property/value pairs."

  - id: signal_callback
    method: signal.callback
    description: "Pushed when a subscribed signal fires. Params contain array of signal/argument pairs."

  - id: model_updated
    signal: modelupdated
    description: "Triggered when object structure changes (objects added or removed)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Verify projector state is standby or ready before issuing power on"
    applies_to: [system_poweron]
  - description: "Verify projector state is on before issuing power off"
    applies_to: [system_poweroff]
# UNRESOLVED: source does not describe explicit safety interlock sequences beyond good-practice state checks
```

## Notes
- All commands use JSON-RPC 2.0 framing. Parameter order is insignificant.
- Source names vary by projector model; always query `image.source.list` before setting.
- Source-to-object-name mapping: strip non-word chars and lowercase (e.g. "DisplayPort 1" → "displayport1").
- Best practice: wait for `property.set` confirmation before re-setting same property.
- File upload (warp grids, blend masks, black level masks) via HTTP POST to `http://{projector-ip}/api/{endpoint}`.
- ECO mode wakeup via serial: send ASCII `:POWR1\r`.
- API is partially dynamic — introspection (`introspect` method) is the authoritative way to discover available objects/properties for a specific unit and configuration.
- Connector signal info includes detailed timing: resolution, sync, frequency, color space, chroma sampling, gamma type, color primaries.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact laser power range per model not stated (min/max are dynamic, lens-dependent) -->
<!-- UNRESOLVED: HTTP file transfer endpoint authentication not specified -->
<!-- UNRESOLVED: exact available sources and connectors per model variant not listed -->
<!-- UNRESOLVED: warp file format details only referenced as "same as MCM500/400" -->
<!-- UNRESOLVED: lens position integer ranges not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:45:24.811Z
last_checked_at: 2026-06-02T21:49:55.511Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:49:55.511Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no multi-step macro sequences explicitly described in source"
- "source does not describe explicit safety interlock sequences beyond good-practice state checks"
- "firmware version compatibility not stated in source"
- "exact laser power range per model not stated (min/max are dynamic, lens-dependent)"
- "HTTP file transfer endpoint authentication not specified"
- "exact available sources and connectors per model variant not listed"
- "warp file format details only referenced as \"same as MCM500/400\""
- "lens position integer ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
