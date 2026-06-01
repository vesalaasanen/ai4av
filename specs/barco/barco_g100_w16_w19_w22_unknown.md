---
spec_id: admin/barco-g100-w16-w19-w22
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco G100 W16 W19 W22 Control Spec"
manufacturer: Barco
model_family: "G100 W16"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "G100 W16"
    - "G100 W19"
    - "G100 W22"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:33:28.702Z
generated_at: 2026-05-20T05:33:28.702Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:33:28.702Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions verified against source with complete wire-level method and property matches; transport parameters confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco G100 W16 W19 W22 Control Spec

## Summary

Barco Pulse-series laser projectors (G100 W16/W19/W22) controlled via JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial. API covers power, source selection, illumination, picture settings, warp/blend/black-level, optics, DMX, environment monitoring, and firmware management. All commands use named parameters; properties support subscribe/notify patterns.

<!-- UNRESOLVED: exact connector set per G100 variant not stated; source lists DVI 1/2, DisplayPort 1/2, HDMI, HDBaseT, SDI but notes "list contents will vary depending on projector model" -->

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
  # Authentication is optional for normal end-user access; required for elevated access levels.
  # Method: authenticate with param "code" (integer).
```

## Traits

```yaml
traits:
  - powerable     # system.poweron / system.poweroff
  - queryable     # property.get for all readable properties
  - routable      # image.window.main.source switching
  - levelable     # brightness, contrast, saturation, gamma, sharpness, laser power
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    method: system.poweron
    params: []
    notes: Best practice to verify system.state is standby or ready before issuing.

  - id: power_off
    label: Power Off
    kind: action
    method: system.poweroff
    params: []
    notes: Best practice to verify system.state is on before issuing.

  - id: eco_wake_serial
    label: ECO Wake via Serial
    kind: action
    command: ":POWR1\r"
    params: []
    notes: ASCII string sent over RS-232 to wake projector from ECO mode.

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: Secret pass code for elevated access level

  - id: set_property
    label: Set Property
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: Dot-notation property name (e.g. image.brightness)
      - name: value
        type: any
        description: Value to set (type depends on property)

  - id: get_property
    label: Get Property
    kind: action
    method: property.get
    params:
      - name: property
        type: string
        description: Dot-notation property name

  - id: get_properties
    label: Get Multiple Properties
    kind: action
    method: property.get
    params:
      - name: property
        type: array
        description: Array of dot-notation property names

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string
        description: Dot-notation property name or array of names

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string
        description: Dot-notation property name or array of names

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: Signal name or array of signal names

  - id: introspect
    label: Introspect Objects
    kind: action
    method: introspect
    params:
      - name: object
        type: string
        description: Object name in dot notation (empty = all)
      - name: recursive
        type: boolean
        description: If false, list only immediate child object names

  - id: select_source
    label: Select Input Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.window.main.source"
        description: Fixed property name
      - name: value
        type: string
        description: "Source name (e.g. DisplayPort 1, HDMI, DVI 1, HDBaseT, SDI)"

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
        description: Target power in percent

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
        description: "Normalized offset, -1 to 1, step 0.01"

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
        description: "Normalized gain, 0 to 2, step 0.01, default 1"

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
        description: "1 to 3, step 0.1, default 2.2"

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
        description: "0 to 2, step 0.01, default 1"

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
    label: Set Shutter
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
    label: Enable/Disable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.warp.enable"
      - name: value
        type: boolean

  - id: set_warp_file_enable
    label: Enable/Disable File Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.warp.file.enable"
      - name: value
        type: boolean

  - id: select_warp_file
    label: Select Warp File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.warp.file.selected"
      - name: value
        type: string
        description: Filename of uploaded warp grid

  - id: set_blend_file_enable
    label: Enable/Disable Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.blend.file.enable"
      - name: value
        type: boolean

  - id: select_blend_file
    label: Select Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.blend.file.selected"
      - name: value
        type: string
        description: Filename of uploaded blend mask

  - id: set_blacklevel_file_enable
    label: Enable/Disable Black Level File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.blacklevel.file.enable"
      - name: value
        type: boolean

  - id: select_blacklevel_file
    label: Select Black Level File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.blacklevel.file.selected"
      - name: value
        type: string
        description: Filename of uploaded black level mask

  - id: set_standby_enable
    label: Enable/Disable Standby
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "system.standby.enable"
      - name: value
        type: boolean

  - id: set_eco_enable
    label: Enable/Disable ECO Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "system.eco.enable"
      - name: value
        type: boolean

  - id: set_dmx_mode
    label: Set DMX Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "dmx.mode"
      - name: value
        type: string
        description: DMX mode name

  - id: set_dmx_start_channel
    label: Set DMX Start Channel
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "dmx.startchannel"
      - name: value
        type: integer
        description: "1..512"

  - id: engage_clo
    label: Engage CLO
    kind: action
    method: illumination.clo.engage
    params: []
    notes: Engages Constant Light Output at current light level

  - id: get_environment_temperatures
    label: Get Temperature Sensors
    kind: action
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: "Sensor"
      - name: valuetype
        type: string
        value: "Temperature"

  - id: get_environment_fan_speeds
    label: Get Fan Speeds
    kind: action
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: "Sensor"
      - name: valuetype
        type: string
        value: "Speed"

  - id: list_firmware_components
    label: List Firmware Components
    kind: action
    method: firmware.listcomponents
    params: []

  - id: list_firmware_versions
    label: List Firmware Version Status
    kind: action
    method: firmware.listcomponentversionstatus
    params: []

  - id: schedule_firmware_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
    params: []

  - id: get_alarm_info
    label: Get Alarm Info
    kind: action
    method: environment.getalarminfo
    params: []

  - id: list_dmx_channels
    label: List DMX Channels
    kind: action
    method: dmx.listchannels
    params: []

  - id: list_dmx_modes
    label: List DMX Modes
    kind: action
    method: dmx.listmodes
    params: []

  - id: blink_led
    label: Blink LED
    kind: action
    method: ledctrl.blink
    params:
      - name: led
        type: string
        description: LED identifier (e.g. systemstatus)
      - name: color
        type: string
        description: Color name (e.g. red)
      - name: period
        type: integer
        description: Blink period
  - id: get_laser_serial_number
    label: Get Laser Serial Number
    kind: action
    method: illumination.laser.getserialnumber
    params: []

  - id: copy_color_preset_to_custom
    label: Copy Color Preset to Custom
    kind: action
    method: image.color.p7.custom.copypresettocustom
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy to custom

  - id: reset_color_preset
    label: Reset Color Preset
    kind: action
    method: image.color.p7.custom.resetpreset
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset back to its default values

  - id: reset_color_to_native
    label: Reset Color to Native
    kind: action
    method: image.color.p7.custom.resettonative
    params: []

  - id: next_rgb_mode
    label: Next RGB Mode
    kind: action
    method: image.color.rgbmode.nextrgbmode
    params: []
    notes: Cycles through all possible RGB modes.
```

## Feedbacks

```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
    property: system.state

  - id: illumination_state
    type: enum
    values: [On, Off]
    property: illumination.state

  - id: laser_power
    type: float
    description: Current laser power in percent
    property: illumination.sources.laser.power

  - id: laser_min_power
    type: float
    description: Minimum laser power in percent
    property: illumination.sources.laser.minpower

  - id: laser_max_power
    type: float
    description: Maximum laser power in percent
    property: illumination.sources.laser.maxpower

  - id: active_source
    type: string
    description: Currently active source name
    property: image.window.main.source

  - id: brightness
    type: float
    description: "Image brightness offset, -1 to 1"
    property: image.brightness

  - id: contrast
    type: float
    description: "Image contrast gain, 0 to 2"
    property: image.contrast

  - id: gamma
    type: float
    description: "Image gamma, 1 to 3"
    property: image.gamma

  - id: saturation
    type: float
    description: "Image saturation, 0 to 2"
    property: image.saturation

  - id: sharpness
    type: integer
    description: "Image sharpness, -2 to 8"
    property: image.sharpness

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

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: network_lan_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: connector_detected_signal
    type: object
    description: Detailed signal info on a connector (active, resolution, frequency, color space, etc.)
    # UNRESOLVED: connector names vary by model; property path is image.connector.[name].detectedsignal
```

## Variables

```yaml
variables:
  - id: laser_power_level
    property: illumination.sources.laser.power
    type: float
    min: null  # UNRESOLVED: minpower is dynamic, read from illumination.sources.laser.minpower
    max: null  # UNRESOLVED: maxpower is dynamic, read from illumination.sources.laser.maxpower
    unit: percent

  - id: brightness_level
    property: image.brightness
    type: float
    min: -1
    max: 1
    step: 0.01

  - id: contrast_level
    property: image.contrast
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: gamma_level
    property: image.gamma
    type: float
    min: 1
    max: 3
    step: 0.1

  - id: saturation_level
    property: image.saturation
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: sharpness_level
    property: image.sharpness
    type: integer
    min: -2
    max: 8
```

## Events

```yaml
events:
  - id: property_changed
    method: property.changed
    description: "Pushed when a subscribed property changes. Params contain array of property/value pairs."
    payload:
      - name: property
        type: array
        description: "Array of {objectname.propertyname: value} objects"

  - id: signal_callback
    method: signal.callback
    description: "Pushed when a subscribed signal fires. Params contain array of signal/argument pairs."
    payload:
      - name: signal
        type: array
        description: "Array of {objectname.signalname: {args}} objects"

  - id: model_updated
    method: signal.callback
    description: "Triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe with signal=modelupdated."
    payload:
      - name: object
        type: string
      - name: isnew
        type: boolean
        description: "true = object added, false = object removed"
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on does nothing if projector already on or in state transition;
# power off does nothing if already off or in transition.
# Best practice: verify state before issuing power commands.
# UNRESOLVED: no explicit safety interlock sequences documented in source
```

## Notes

- All commands use JSON-RPC 2.0 format over both TCP and serial transports.
- Property names use dot notation (e.g. `image.brightness`). Objects and members are lowercase.
- `property.set` best practice: wait for confirmation before re-setting the same property to avoid flooding the server.
- Source-to-object-name translation: strip non-word characters and lowercase (e.g. "DisplayPort 1" → "displayport1").
- File upload/download (warp grids, blend masks, black level masks) uses HTTP POST to `http://<projector-ip>/api/<endpoint>`.
- Source notifications deliver two events on source switch: one for deselection (empty value), one for new selection.
- API is partially dynamic — available objects depend on projector configuration and connected peripherals. Use introspection to discover the exact API for a specific unit.
- ECO wake via serial uses ASCII `:POWR1\r` (not JSON-RPC).
- Subscribe does not return current value; use `property.get` first to initialize.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact available sources and connectors per G100 variant not stated -->
<!-- UNRESOLVED: window position/size properties documented but no worked example for multi-window setup -->
<!-- UNRESOLVED: lens shift, zoom, focus position value ranges not stated -->
<!-- UNRESOLVED: warp grid file format described as "same as MCM500/400" but no spec provided -->
<!-- UNRESOLVED: DMX mode names and channel mappings not enumerated -->
<!-- UNRESOLVED: illumination source types beyond laser (LED, xenon, UHP) not enumerated for this model -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:33:28.702Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:33:28.702Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions verified against source with complete wire-level method and property matches; transport parameters confirmed verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
