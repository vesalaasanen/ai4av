---
spec_id: admin/barco-hdx-w12-w14-w18
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco HDX W12 W14 W18 Control Spec"
manufacturer: Barco
model_family: "HDX W12"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "HDX W12"
    - "HDX W14"
    - "HDX W18"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:52:47.997Z
last_checked_at: 2026-05-20T05:35:49.868Z
generated_at: 2026-05-20T05:35:49.868Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no multi-step macro sequences explicitly documented in source"
  - "source mentions verifying projector state before power commands and best practice"
  - "firmware version compatibility not stated in source"
  - "exact model differences (W12 vs W14 vs W18) not specified — source lists vary by projector model"
  - "HTTP file endpoint authentication requirements not stated"
  - "property.get/property.set payload size limits not stated"
  - "maximum number of concurrent subscriptions not stated"
verification:
  verdict: verified
  checked_at: 2026-05-20T05:35:49.868Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched with exact method and property names; transport parameters verified verbatim in source; comprehensive command coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco HDX W12 W14 W18 Control Spec

## Summary
Barco HDX series projectors (W12, W14, W18) controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. Supports power management, input source selection, illumination control, picture adjustments (brightness, contrast, gamma, saturation, sharpness), warp/blend/blacklevel file management, shutter, zoom, focus, lens shift, DMX, and environment monitoring (temperatures, fan speeds, alarms). Property subscription and signal callbacks provide real-time state updates.

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
  type: none  # inferred: auth is optional and only required for elevated access levels; normal end-user access skips authentication
```

## Traits
```yaml
traits:
  - powerable    # system.poweron / system.poweroff methods
  - queryable    # property.get for state, signal, environment readings
  - routable     # image.window.main.source for input selection
  - levelable    # brightness, contrast, gamma, saturation, sharpness, illumination power
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

  - id: eco_wakeup_serial
    label: ECO Wakeup via Serial
    kind: action
    description: Send ASCII ":POWR1\r" on RS232 to wake projector from ECO mode
    params: []

  - id: select_source
    label: Select Input Source
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.window.main.source
        description: Fixed property name
      - name: value
        type: string
        description: "Source name from image.source.list, e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, HDBaseT, SDI"

  - id: set_illumination_power
    label: Set Illumination Power
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: illumination.sources.laser.power
        description: Fixed property name
      - name: value
        type: float
        description: "Power level in percent (min/max dynamic via minpower/maxpower properties)"

  - id: set_brightness
    label: Set Brightness
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.brightness
      - name: value
        type: float
        description: "Normalized offset, -1 to 1, step 0.01, default 0"

  - id: set_contrast
    label: Set Contrast
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.contrast
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
        value: image.gamma
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
        value: image.saturation
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
        value: image.sharpness
      - name: value
        type: integer
        description: "-2 to 8, step 1"

  - id: set_orientation
    label: Set Orientation
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.orientation
      - name: value
        type: enum
        values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: set_scaling_mode
    label: Set Scaling Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.window.main.scalingmode
      - name: value
        type: enum
        values: [Fill, OneToOne, FillScreen, Stretch]

  - id: set_shutter_position
    label: Set Shutter Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: optics.shutter.position
      - name: value
        type: enum
        values: [Open, Closed]

  - id: set_zoom_position
    label: Set Zoom Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: optics.zoom.position
      - name: value
        type: integer

  - id: set_focus_position
    label: Set Focus Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: optics.focus.position
      - name: value
        type: integer

  - id: set_lensshift_horizontal
    label: Set Horizontal Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: optics.lensshift.horizontal.position
      - name: value
        type: integer

  - id: set_lensshift_vertical
    label: Set Vertical Lens Shift
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: optics.lensshift.vertical.position
      - name: value
        type: integer

  - id: set_warp_enable
    label: Enable Warp
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.warp.enable
      - name: value
        type: boolean

  - id: set_warp_file_enable
    label: Enable Warp File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.warp.file.enable
      - name: value
        type: boolean

  - id: select_warp_file
    label: Select Warp File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.warp.file.selected
      - name: value
        type: string
        description: "Filename of uploaded warp grid, e.g. warp.xml"

  - id: set_blend_file_enable
    label: Enable Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.blend.file.enable
      - name: value
        type: boolean

  - id: select_blend_file
    label: Select Blend File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.blend.file.selected
      - name: value
        type: string
        description: "Filename of uploaded blend mask, e.g. mask.png"

  - id: set_blacklevel_file_enable
    label: Enable Black Level File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.blacklevel.file.enable
      - name: value
        type: boolean

  - id: select_blacklevel_file
    label: Select Black Level File
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.processing.blacklevel.file.selected
      - name: value
        type: string
        description: "Filename of uploaded black level mask, e.g. blacklevel.png"

  - id: set_dmx_mode
    label: Set DMX Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: dmx.mode
      - name: value
        type: string

  - id: set_dmx_startchannel
    label: Set DMX Start Channel
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: dmx.startchannel
      - name: value
        type: integer
        description: "DMX start channel, 1-512"

  - id: set_dmx_shutdown
    label: Set DMX Shutdown
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: dmx.shutdown
      - name: value
        type: boolean

  - id: set_standby_enable
    label: Enable Standby Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: system.standby.enable
      - name: value
        type: boolean

  - id: set_eco_enable
    label: Enable ECO Mode
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: system.eco.enable
      - name: value
        type: boolean

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
    label: List Source Connectors
    kind: query
    method: "image.source.{sourcename}.listconnectors"
    params:
      - name: sourcename
        type: string
        description: "Source name lowercased with non-word chars removed, e.g. displayport1"

  - id: get_property
    label: Get Property Value
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        description: "Dot-notation property name, e.g. system.state"

  - id: subscribe_property
    label: Subscribe to Property Changes
    kind: action
    method: property.subscribe
    params:
      - name: property
        type: string_or_array
        description: "Property name or array of property names"

  - id: unsubscribe_property
    label: Unsubscribe from Property Changes
    kind: action
    method: property.unsubscribe
    params:
      - name: property
        type: string_or_array

  - id: subscribe_signal
    label: Subscribe to Signal
    kind: action
    method: signal.subscribe
    params:
      - name: signal
        type: string_or_array
        description: "Signal name or array of signal names, e.g. modelupdated"

  - id: unsubscribe_signal
    label: Unsubscribe from Signal
    kind: action
    method: signal.unsubscribe
    params:
      - name: signal
        type: string_or_array

  - id: introspect
    label: Introspect Objects
    kind: query
    method: introspect
    params:
      - name: object
        type: string
        description: "Object name to introspect (dot notation), empty for all"
      - name: recursive
        type: boolean
        description: "true = full metadata, false = object names only (one level)"

  - id: get_environment_temperatures
    label: Get Environment Temperatures
    kind: query
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: Sensor
      - name: valuetype
        type: string
        value: Temperature

  - id: get_environment_fan_speeds
    label: Get Fan Speeds
    kind: query
    method: environment.getcontrolblocks
    params:
      - name: type
        type: string
        value: Sensor
      - name: valuetype
        type: string
        value: Speed

  - id: get_alarm_info
    label: Get Alarm Info
    kind: query
    method: environment.getalarminfo
    params: []

  - id: firmware_list_components
    label: List Firmware Components
    kind: query
    method: firmware.listcomponents
    params: []

  - id: firmware_list_version_status
    label: List Firmware Version Status
    kind: query
    method: firmware.listcomponentversionstatus
    params: []

  - id: firmware_schedule_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    method: firmware.schedulecomponentupgrade
    params: []

  - id: clo_engage
    label: Engage Constant Light Output
    kind: action
    method: illumination.clo.engage
    params: []

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
  - id: get_system_state
    label: Get System State
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: system.state
        description: "Fixed property name for projector state"

  - id: get_illumination_state
    label: Get Illumination State
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: illumination.state
        description: "Fixed property name for illumination state"

  - id: get_illumination_minpower
    label: Get Illumination Min Power
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: illumination.sources.laser.minpower
        description: "Read-only minimum laser power percent"

  - id: get_illumination_maxpower
    label: Get Illumination Max Power
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: illumination.sources.laser.maxpower
        description: "Read-only maximum laser power percent"

  - id: get_network_lan_ip4config
    label: Get LAN IP4 Configuration
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: network.device.lan.ip4config
        description: "Returns Address, Mask, Gateway, NameServers"

  - id: get_network_lan_state
    label: Get LAN State
    kind: query
    method: property.get
    params:
      - name: property
        type: string
        value: network.device.lan.state
        description: "Returns CONNECTED or DISCONNECTED"

  - id: set_window_main_position
    label: Set Main Window Position
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.window.main.position
        description: "Fixed property name"
      - name: value
        type: object
        description: "Object with x (int) and y (int) fields"

  - id: set_window_main_size
    label: Set Main Window Size
    kind: action
    method: property.set
    params:
      - name: property
        type: string
        value: image.window.main.size
        description: "Fixed property name"
      - name: value
        type: object
        description: "Object with width (int) and height (int) fields"

  - id: illumination_laser_get_serial
    label: Get Laser Serial Number
    kind: query
    method: illumination.laser.getserialnumber
    params: []

  - id: image_color_p7_next_rgb_mode
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
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    description: "Current projector state via property.get on system.state"

  - id: illumination_state
    type: enum
    values: ["On", "Off"]

  - id: illumination_power
    type: float
    description: "Current laser power percent via illumination.sources.laser.power"

  - id: illumination_min_power
    type: float
    description: "Minimum laser power percent"

  - id: illumination_max_power
    type: float
    description: "Maximum laser power percent"

  - id: active_source
    type: string
    description: "Currently active source name via image.window.main.source"

  - id: available_sources
    type: array
    description: "List of available source names from image.source.list"

  - id: available_connectors
    type: array
    description: "List of available connector names from image.connector.list"

  - id: connector_signal
    type: object
    description: "Detected signal info on a connector (active, name, resolution, frequencies, color space, etc.) via image.connector.{name}.detectedsignal"

  - id: brightness
    type: float
    description: "Current brightness value, -1 to 1"

  - id: contrast
    type: float
    description: "Current contrast value, 0 to 2"

  - id: gamma
    type: float
    description: "Current gamma value, 1 to 3"

  - id: saturation
    type: float
    description: "Current saturation value, 0 to 2"

  - id: sharpness
    type: integer
    description: "Current sharpness value, -2 to 8"

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]

  - id: network_state
    type: enum
    values: [CONNECTED, DISCONNECTED]

  - id: shutter_position
    type: enum
    values: [Open, Closed]

  - id: shutter_target
    type: enum
    values: [Open, Closed]

  - id: zoom_position
    type: integer

  - id: focus_position
    type: integer

  - id: lensshift_horizontal
    type: integer

  - id: lensshift_vertical
    type: integer

  - id: orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: scaling_mode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: temperatures
    type: dictionary
    description: "Temperature readings keyed by sensor name via environment.getcontrolblocks"

  - id: fan_speeds
    type: dictionary
    description: "Fan speed readings keyed by sensor name via environment.getcontrolblocks"
```

## Variables
```yaml
variables:
  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step: 0.01

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step: 0.1

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step: 0.01

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step: 1

  - id: illumination_laser_power
    property: illumination.sources.laser.power
    type: float
    description: "Target power in percent; min/max dynamic"

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
    description: "Fired when the object structure changes (objects added or removed)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions verifying projector state before power commands and best practice
# of waiting for property.set confirmation before re-setting, but no explicit safety interlocks documented.
```

## Notes
- All commands use JSON-RPC 2.0 format over both TCP and serial connections. Same command set regardless of transport.
- Source names must be translated to object names by removing non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1").
- File uploads (warp grids, blend masks, black level masks) use HTTP POST to `/api/...` endpoints. Supported formats: PNG (up to 16-bit), JPEG, TIFF. Grayscale only; color images use blue channel.
- `property.set` best practice: wait for confirmation before setting the same property again to avoid flooding.
- ECO mode wakeup via serial requires sending ASCII `:POWR1\r`.
- Authentication is optional; only required for elevated access levels beyond normal end-user.
- API is dynamic — actual available methods/properties depend on projector model and connected peripherals. Use `introspect` to discover the full API at runtime.
- Warp file format is compatible with Barco MCM500/400.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model differences (W12 vs W14 vs W18) not specified — source lists vary by projector model -->
<!-- UNRESOLVED: HTTP file endpoint authentication requirements not stated -->
<!-- UNRESOLVED: property.get/property.set payload size limits not stated -->
<!-- UNRESOLVED: maximum number of concurrent subscriptions not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:52:47.997Z
last_checked_at: 2026-05-20T05:35:49.868Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:35:49.868Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched with exact method and property names; transport parameters verified verbatim in source; comprehensive command coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no multi-step macro sequences explicitly documented in source"
- "source mentions verifying projector state before power commands and best practice"
- "firmware version compatibility not stated in source"
- "exact model differences (W12 vs W14 vs W18) not specified — source lists vary by projector model"
- "HTTP file endpoint authentication requirements not stated"
- "property.get/property.set payload size limits not stated"
- "maximum number of concurrent subscriptions not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
