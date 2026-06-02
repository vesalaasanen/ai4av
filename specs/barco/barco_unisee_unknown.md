---
spec_id: admin/barco-unisee
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco UniSee Control Spec"
manufacturer: Barco
model_family: "Barco UniSee"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco UniSee"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:38:51.766Z
last_checked_at: 2026-05-14T21:40:20.532Z
generated_at: 2026-05-14T21:40:20.532Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific UniSee model variants not listed in source; document covers generic Pulse API projectors"
  - "firmware version compatibility not stated"
  - "protocol version not stated"
  - "ECO-mode wake-on-LAN details only described at high level"
  - "no multi-step sequences explicitly documented beyond sequential property.set calls"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "maximum concurrent connection limit not stated"
  - "JSON-RPC request size limits not stated"
  - "specific UniSee source list may differ from generic Pulse examples"
  - "illumination source types (laser vs LED vs lamp) vary by projector model"
verification:
  verdict: verified
  checked_at: 2026-05-14T21:40:20.532Z
  matched_actions: 56
  action_count: 57
  confidence: medium
  summary: "All 56 spec actions matched literally to Pulse API methods in source; all transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco UniSee Control Spec

## Summary

Barco UniSee LCD display wall module controlled via the Pulse API, a JSON-RPC 2.0 protocol over TCP/IP (port 9090) or RS-232 serial. Supports power management, input source selection, illumination control, picture adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/black-level file management, optics control (shutter, zoom, focus, lens shift), DMX, environment monitoring (temperatures, fan speeds), and firmware management.

<!-- UNRESOLVED: specific UniSee model variants not listed in source; document covers generic Pulse API projectors -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version not stated -->
<!-- UNRESOLVED: ECO-mode wake-on-LAN details only described at high level -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector-ip}/api/"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: pin
  # Authentication with pass code required for elevated access;
  # normal end-user access can skip authentication.
```

## Traits
```yaml
traits:
  - powerable    # system.poweron / system.poweroff
  - routable     # image.window.main.source selection
  - queryable    # property.get for all readable properties
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

  - id: authenticate
    label: Authenticate
    kind: action
    method: authenticate
    params:
      - name: code
        type: integer
        description: Secret pass code to elevate access level

  - id: set_property
    label: Set Property
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        description: "Dot-notation property name (e.g. image.brightness)"
      - name: value
        type: any
        description: Value matching the property type

  - id: get_property
    label: Get Property
    kind: action
    method: property.get
    params:
      - name: property
        type: string
        description: "Dot-notation property name"

  - id: get_properties
    label: Get Multiple Properties
    kind: action
    method: property.get
    params:
      - name: property
        type: array
        description: "Array of dot-notation property names"

  - id: subscribe_property
    label: Subscribe to Property
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string
        description: "Dot-notation property name or array of names"

  - id: unsubscribe_property
    label: Unsubscribe from Property
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string
        description: "Dot-notation property name or array of names"

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names"

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string
        description: "Signal name or array of signal names"

  - id: introspect
    label: Introspect Object
    kind: action
    method: introspect
    params:
      - name: object
        type: string
        description: "Object name in dot notation (empty = root)"
      - name: recursive
        type: boolean
        description: "If false, only list immediate child object names"

  - id: select_source
    label: Select Input Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.window.main.source"
      - name: value
        type: string
        description: "Source name from image.source.list (e.g. DisplayPort 1, HDMI)"

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

  - id: list_source_connectors
    label: List Connectors for Source
    kind: action
    method: "image.source.{sourceName}.listconnectors"
    params: []

  - id: set_illumination_power
    label: Set Laser Power
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "illumination.sources.laser.power"
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
        value: "image.brightness"
      - name: value
        type: float
        description: "Brightness offset (-1 to 1, 0 = default)"

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
        description: "Contrast gain (0 to 2, 1 = default)"

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
        description: "Gamma value (1 to 3, default 2.2)"

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
        description: "Saturation (0 to 2, 1 = default)"

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
        description: "Sharpness (-2 to 8)"

  - id: set_orientation
    label: Set Image Orientation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.orientation"
      - name: value
        type: string
        description: "DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, or CEILING_REAR"

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
        description: "Fill, OneToOne, FillScreen, or Stretch"

  - id: enable_warp
    label: Enable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "image.processing.warp.enable"
      - name: value
        type: boolean

  - id: enable_file_warp
    label: Enable File Warp
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
        description: "Warp grid filename"

  - id: enable_blend
    label: Enable Blend Mask
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
        description: "Blend mask filename"

  - id: enable_blacklevel
    label: Enable Black Level Correction
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
        description: "Black level mask filename"

  - id: set_shutter
    label: Set Shutter Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.shutter.target"
      - name: value
        type: string
        description: "Open or Closed"

  - id: set_zoom
    label: Set Zoom Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.zoom.position"
      - name: value
        type: integer

  - id: set_focus
    label: Set Focus Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.focus.position"
      - name: value
        type: integer

  - id: set_lens_shift_horizontal
    label: Set Horizontal Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.lensshift.horizontal.position"
      - name: value
        type: integer

  - id: set_lens_shift_vertical
    label: Set Vertical Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: "optics.lensshift.vertical.position"
      - name: value
        type: integer

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
        description: "DMX start channel (1-512)"

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

  - id: engage_clo
    label: Engage Constant Light Output
    kind: action
    method: illumination.clo.engage
    params: []

  - id: get_environment_temperatures
    label: Get Temperature Readings
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

  - id: get_alarm_info
    label: Get Alarm Info
    kind: action
    method: environment.getalarminfo
    params: []

  - id: list_firmware_components
    label: List Firmware Components
    kind: action
    method: firmware.listcomponents
    params: []

  - id: list_firmware_version_status
    label: List Firmware Version Status
    kind: action
    method: firmware.listcomponentversionstatus
    params: []

  - id: schedule_firmware_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
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

  - id: get_laser_serial
    label: Get Laser Serial Number
    kind: action
    method: illumination.laser.getserialnumber
    params: []

  - id: blink_led
    label: Blink LED
    kind: action
    method: ledctrl.blink
    params:
      - name: led
        type: string
        description: "LED identifier (e.g. systemstatus)"
      - name: color
        type: string
        description: "Color name (e.g. red)"
      - name: period
        type: integer
        description: "Blink period"

  - id: eco_wake_serial
    label: Wake from ECO via Serial
    kind: action
    command: ":POWR1\\r"
    params: []
    description: "Send ASCII ':POWR1\\r' on RS-232 to wake from ECO mode"

  - id: copy_color_preset
    label: Copy Color Preset to Custom
    kind: action
    method: image.color.p7.custom.copypresettocustom
    params:
      - name: presetname
        type: string

  - id: reset_color_preset
    label: Reset Color Preset
    kind: action
    method: image.color.p7.custom.resetpreset
    params:
      - name: presetname
        type: string

  - id: next_rgb_mode
    label: Next RGB Mode
    kind: action
    method: image.color.rgbmode.nextrgbmode
    params: []

  - id: upload_warp_file
    label: Upload Warp Grid File
    kind: action
    transport: http
    http_method: POST
    path: "/api/image/processing/warp/file/transfer"
    params:
      - name: file
        type: file
        description: "Warp grid XML file"

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    transport: http
    http_method: POST
    path: "/api/image/processing/blend/file/transfer"
    params:
      - name: file
        type: file
        description: "Grayscale blend mask image (PNG/JPEG/TIFF)"

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    transport: http
    http_method: POST
    path: "/api/image/processing/blacklevel/file/transfer"
    params:
      - name: file
        type: file
        description: "Grayscale black level mask image (PNG/JPEG/TIFF)"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    label: System State
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    property: system.state

  - id: illumination_state
    label: Illumination State
    type: enum
    values: ["On", "Off"]
    property: illumination.state

  - id: laser_power
    label: Laser Power
    type: float
    description: "Current laser power in percent"
    property: illumination.sources.laser.power

  - id: laser_min_power
    label: Laser Minimum Power
    type: float
    property: illumination.sources.laser.minpower

  - id: laser_max_power
    label: Laser Maximum Power
    type: float
    property: illumination.sources.laser.maxpower

  - id: active_source
    label: Active Source
    type: string
    property: image.window.main.source

  - id: brightness
    label: Brightness
    type: float
    description: "Normalized brightness offset (-1 to 1)"
    property: image.brightness

  - id: contrast
    label: Contrast
    type: float
    description: "Normalized contrast gain (0 to 2)"
    property: image.contrast

  - id: gamma
    label: Gamma
    type: float
    property: image.gamma

  - id: saturation
    label: Saturation
    type: float
    property: image.saturation

  - id: sharpness
    label: Sharpness
    type: integer
    property: image.sharpness

  - id: orientation
    label: Image Orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    property: image.orientation

  - id: scaling_mode
    label: Scaling Mode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    property: image.window.main.scalingmode

  - id: shutter_position
    label: Shutter Position
    type: enum
    values: [Open, Closed]
    property: optics.shutter.position

  - id: shutter_target
    label: Shutter Target
    type: enum
    values: [Open, Closed]
    property: optics.shutter.target

  - id: zoom_position
    label: Zoom Position
    type: integer
    property: optics.zoom.position

  - id: focus_position
    label: Focus Position
    type: integer
    property: optics.focus.position

  - id: lens_shift_horizontal
    label: Horizontal Lens Shift
    type: integer
    property: optics.lensshift.horizontal.position

  - id: lens_shift_vertical
    label: Vertical Lens Shift
    type: integer
    property: optics.lensshift.vertical.position

  - id: alarm_state
    label: Alarm State
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    property: environment.alarmstate

  - id: network_state
    label: Network State
    type: enum
    values: [CONNECTED, DISCONNECTED]
    property: network.device.lan.state

  - id: connector_signal
    label: Connector Detected Signal
    type: object
    description: "Signal info including active, resolution, frequencies, color space"
    property: "image.connector.{name}.detectedsignal"

  - id: dmx_mode
    label: DMX Mode
    type: string
    property: dmx.mode

  - id: dmx_start_channel
    label: DMX Start Channel
    type: integer
    property: dmx.startchannel

  - id: dmx_shutdown
    label: DMX Shutdown
    type: boolean
    property: dmx.shutdown

  - id: standby_enabled
    label: Standby Enabled
    type: boolean
    property: system.standby.enable

  - id: eco_enabled
    label: ECO Mode Enabled
    type: boolean
    property: system.eco.enable
```

## Variables
```yaml
variables:
  - id: brightness_level
    label: Brightness
    type: float
    min: -1
    max: 1
    step: 0.01
    property: image.brightness

  - id: contrast_level
    label: Contrast
    type: float
    min: 0
    max: 2
    step: 0.01
    property: image.contrast

  - id: gamma_level
    label: Gamma
    type: float
    min: 1
    max: 3
    step: 0.1
    property: image.gamma

  - id: saturation_level
    label: Saturation
    type: float
    min: 0
    max: 2
    step: 0.01
    property: image.saturation

  - id: sharpness_level
    label: Sharpness
    type: integer
    min: -2
    max: 8
    property: image.sharpness

  - id: laser_power_level
    label: Laser Power
    type: float
    description: "Target power in percent; min/max are dynamic (read minpower/maxpower)"
    property: illumination.sources.laser.power

  - id: dmx_start_channel
    label: DMX Start Channel
    type: integer
    min: 1
    max: 512
    property: dmx.startchannel
```

## Events
```yaml
events:
  - id: property_changed
    label: Property Changed
    method: property.changed
    description: "Pushed when a subscribed property value changes. Params contain array of property/value pairs."

  - id: signal_callback
    label: Signal Callback
    method: signal.callback
    description: "Pushed when a subscribed signal fires. Params contain array of signal/argument pairs."

  - id: model_updated
    label: Model Updated
    signal: modelupdated
    description: "Triggered when the object structure changes (objects added or removed)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented beyond sequential property.set calls
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Best practice note: verify projector state is
# standby or ready before power-on; verify state is on before power-off.
```

## Notes

- All commands use JSON-RPC 2.0 format over both TCP and serial transports.
- Source object names are derived by stripping non-word characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
- `property.set` best practice: wait for confirmation before setting the same property again to avoid flooding.
- Source switch generates two `property.changed` notifications: one for deselection, one for selection.
- Warp grid file format is the same as Barco MCM500/400.
- Blend/black-level masks must be grayscale (PNG up to 16-bit, JPEG, TIFF); size must match projector resolution.
- File upload/download uses HTTP endpoints at `/api/...` paths (separate from JSON-RPC channel).
- ECO wake via serial sends raw ASCII `:POWR1\r`, not JSON-RPC.
- API is dynamic — available properties/methods depend on hardware configuration (lens type, DMX mode, etc.). Use `introspect` to discover the actual API of a specific unit.
- Notifications have no `id` field; no response should be returned for them.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->
<!-- UNRESOLVED: JSON-RPC request size limits not stated -->
<!-- UNRESOLVED: specific UniSee source list may differ from generic Pulse examples -->
<!-- UNRESOLVED: illumination source types (laser vs LED vs lamp) vary by projector model -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:38:51.766Z
last_checked_at: 2026-05-14T21:40:20.532Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:40:20.532Z
matched_actions: 56
action_count: 57
confidence: medium
summary: "All 56 spec actions matched literally to Pulse API methods in source; all transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific UniSee model variants not listed in source; document covers generic Pulse API projectors"
- "firmware version compatibility not stated"
- "protocol version not stated"
- "ECO-mode wake-on-LAN details only described at high level"
- "no multi-step sequences explicitly documented beyond sequential property.set calls"
- "source contains no explicit safety warnings, interlock procedures, or"
- "maximum concurrent connection limit not stated"
- "JSON-RPC request size limits not stated"
- "specific UniSee source list may differ from generic Pulse examples"
- "illumination source types (laser vs LED vs lamp) vary by projector model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
