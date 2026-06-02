---
spec_id: admin/barco-ldx-8482-t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco LDX 8482 T Control Spec"
manufacturer: Barco
model_family: "LDX 8482 T"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "LDX 8482 T"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:27:33.427Z
last_checked_at: 2026-06-02T22:04:12.959Z
generated_at: 2026-06-02T22:04:12.959Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source"
  - "additional methods present in source but truncated/partial:"
  - "variable ranges for zoom/focus/lensshift not stated in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "firmware version compatibility not stated in source"
  - "voltage/current/power specifications not stated in source"
  - "fault behavior and error recovery sequences not stated in source"
  - "precise variable ranges for optics (zoom/focus/lensshift) not stated in source"
  - "all DMX channel definitions not provided in source (only listchannels method)"
  - "authentication credential format beyond example code 98765 not specified"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:12.959Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco LDX 8482 T Control Spec

## Summary
Professional projection laser light engine. Control via JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial (19200 8N1). Supports power on/off, source routing, image adjustment, warp/blend/blacklevel file upload, environment monitoring, and DMX512 control. Authentication optional for normal user; higher-privilege operations require pass code.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # stated: "service is available on port number 9090"
serial:
  baud_rate: 19200  # stated: RS232 table
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: normal end user access requires no auth; optional higher-level auth via authenticate method
```

## Traits
```yaml
# inferred from command examples in source:
# - powerable       (system.poweron, system.poweroff present)
# - routable        (image.window.main.source set/get, image.source.list, image.connector.list)
# - queryable       (property.get, property.subscribe, system.state, illumination.state)
# - levelable       (image.brightness/contrast/saturation/sharpness/gamma all have set/get)
```

## Actions
```yaml
- id: system_poweron
  label: Power On
  kind: action
  params: []
  description: Power on projector. Result null on success. Idempotent - no effect if already on or transitioning.

- id: system_poweroff
  label: Power Off
  kind: action
  params: []
  description: Power off projector. Result null on success. Idempotent.

- id: property_set
  label: Set Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. "image.window.main.source")
    - name: value
      type: any
      description: New value for the property
  description: Set a property value. Best practice: wait for confirmation before setting same property again.

- id: property_get
  label: Get Property
  kind: action
  params:
    - name: property
      type: string
      description: Dot-notation property name
  description: Read current value of a property.

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  params:
    - name: property
      type: string | array
      description: Single property name or array of property names
  description: Subscribe to change notifications for property. Notifications delivered via property.changed signal.

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  params:
    - name: property
      type: string | array
      description: Single property name or array of property names
  description: Stop observing property changes.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  params:
    - name: signal
      type: string | array
      description: Signal name or array of signal names
  description: Subscribe to signal callbacks. Notifications delivered via signal.callback.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  params:
    - name: signal
      type: string | array
      description: Signal name or array of signal names
  description: Stop observing signal callbacks.

- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: code
      type: integer
      description: Pass code for elevated access level
  description: Start authenticated session with higher privilege. Not required for normal end user access.

- id: introspect
  label: Introspect Object
  kind: action
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation; empty/default introspects all)
    - name: recursive
      type: boolean
      description: If true, include nested object names (default true)
  description: Read metadata of available objects, methods, properties, and signals.

- id: image_source_list
  label: List Sources
  kind: action
  params: []
  description: Returns array of available source names (e.g. ["DVI 1", "HDMI", "DisplayPort 1", ...]).

- id: image_connector_list
  label: List Connectors
  kind: action
  params: []
  description: Returns array of available physical connector names.

- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: action
  params:
    - name: type
      type: string
      description: Sensor type - "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"
    - name: valuetype
      type: string
      description: Value type - "Temperature", "Speed", "Voltage", "Current", "Power", etc.
  description: Get snapshot of sensor readings (temperatures, fan speeds, etc.) as key-value dictionary.

- id: firmware_listcomponents
  label: List Firmware Components
  kind: action
  params: []
  description: Returns array of managed firmware component names.

- id: firmware_listcomponentversionstatus
  label: List Firmware Versions
  kind: action
  params: []
  description: Returns array of firmware components with available/running versions and upgrade status.

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  params: []
  description: Engage CLO (Constant Light Output) at current light level.

- id: dmx_listmodes
  label: List DMX Modes
  kind: action
  params: []
  description: Return list of all available DMX modes.

- id: dmx_listchannels
  label: List DMX Channels
  kind: action
  params:
    - name: mode
      type: string
      description: DMX mode name
  description: Return list of available channel names for given DMX mode.

# UNRESOLVED: additional methods present in source but truncated/partial:
# - image.color.p7.custom.copypresettocustom, resetpreset, resettonative
# - image.color.rgbmode.nextrgbmode
# - illumination.laser.getserialnumber
# - firmware.schedulecomponentupgrade
# - image.source.[name].listconnectors
# - dmx.shutdown, dmx.mode, dmx.startchannel (properties, not methods)
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  method: environment.getalarminfo
  params: []
  description: Returns array of alarm info objects with severity, timestamp, source, description, custommessage fields.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  method: illumination.laser.getserialnumber
  params: []
  description: Returns the serial number of the laser illumination source as a string.

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  method: image.color.p7.custom.copypresettocustom
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy to custom slot
  description: Copy a named P7 color preset to the custom preset slot.

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  method: image.color.p7.custom.resetpreset
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset back to default values
  description: Reset a P7 color preset back to its default values.

- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  method: image.color.p7.custom.resettonative
  params: []
  description: Reset P7 color calibration to native/factory values.

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  method: image.color.rgbmode.nextrgbmode
  params: []
  description: Change to the next RGB mode; cycles through all possible modes.

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Firmware Upgrade
  kind: action
  method: firmware.schedulecomponentupgrade
  params: []
  description: Force a firmware component upgrade to occur at the following reboot.
```

## Feedbacks
```yaml
- id: system_state
  label: System State
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - error
  description: Current operational state of projector. Subscribe for change notifications.

- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - "On"
    - "Off"
  description: Laser/light engine on/off state. Subscribe for change notifications.

- id: active_source
  label: Active Source
  type: string
  description: Currently selected source name for main window (e.g. "DisplayPort 1", "HDMI").

- id: property_changed_notification
  label: Property Changed
  type: object
  description: |
    Unsolicited notification when a property value changes.
    Format: { "property": [{ "objectname.propertyname": <value> }, ...] }
    No id field; no response required.

- id: signal_callback_notification
  label: Signal Callback
  type: object
  description: |
    Unsolicited notification for signal events.
    Format: { "signal": [{ "objectname.signalname": { <args> } }, ...] }

- id: modelupdated_signal
  label: Model Updated Signal
  type: object
  description: Triggered when object structure changes (objects added or removed). Argument: object name and isnew boolean.

- id: network_device_state
  label: Network Device State
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarmstate
  label: Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: detected_signal
  label: Connector Detected Signal
  type: object
  description: |
    Signal detection info for a connector. Fields:
    - active (bool): true if signal present
    - name (string): resolution and rate (e.g. "2560x1600 @ 50.10Hz")
    - horizontal_resolution, vertical_resolution (int)
    - horizontal_frequency, vertical_frequency (float)
    - pixel_rate (int)
    - scan (enum: Progressive/Interlaced)
    - bits_per_component, color_space, signal_range, chroma_sampling, gamma_type
    - is_stereo, stereo_mode

- id: illumination_sources_laser_power
  label: Laser Power Level
  type: float
  description: Current laser power in percent (0-100). Read/write.

- id: illumination_sources_laser_minpower
  label: Laser Minimum Power
  type: float
  description: Minimum available power in percent. Dynamic - may vary with lens/firmware.

- id: illumination_sources_laser_maxpower
  label: Laser Maximum Power
  type: float
  description: Maximum available power in percent. Dynamic.

- id: image_brightness
  label: Brightness
  type: float
  description: Normalized -1 to 1, 0 is default, 1 is 100% offset.

- id: image_contrast
  label: Contrast
  type: float
  description: Normalized 0-2, 1 is default.

- id: image_gamma
  label: Gamma
  type: float
  description: 1-3, default 2.2.

- id: image_saturation
  label: Saturation
  type: float
  description: Normalized 0-2, 1 is default.

- id: image_sharpness
  label: Sharpness
  type: integer
  description: Normalized -2 to 8.

- id: image_orientation
  label: Orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: optics_shutter_position
  label: Shutter Position
  type: enum
  values:
    - Open
    - Closed

- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean
  description: Global warp enable/disable.

- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean
  description: Enable/disable uploaded blend mask.

- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean
  description: Enable/disable uploaded black level mask.

- id: dmx_mode
  label: DMX Mode
  type: string
  description: Current DMX mode name.

- id: dmx_startchannel
  label: DMX Start Channel
  type: integer
  description: DMX start channel [1..512].

- id: dmx_shutdown
  label: DMX Shutdown
  type: boolean
  description: DMX shutdown enabled/disabled.

- id: optics_shutter_target
  label: Shutter Target
  type: enum
  values:
    - Open
    - Closed

- id: system_standby_enable
  label: Standby Enable
  type: boolean
  description: Enable/disable standby state.

- id: system_eco_enable
  label: ECO Mode Enable
  type: boolean
  description: Enable/disable ECO/power save mode.

- id: network_device_lan_ip4config
  label: IPv4 Config
  type: object
  description: |
    Current IPv4 configuration.
    Fields: Address, Mask, Gateway, NameServers (all strings).

- id: optics_zoom_position
  label: Zoom Position
  type: integer
  description: Current zoom motor position.

- id: optics_focus_position
  label: Focus Position
  type: integer
  description: Current focus motor position.

- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal
  type: integer
  description: Current horizontal lens shift position.

- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical
  type: integer
  description: Current vertical lens shift position.

- id: image_window_main_position
  label: Window Position
  type: object
  description: Main window XY position { x: int, y: int }.

- id: image_window_main_size
  label: Window Size
  type: object
  description: Main window dimensions { width: int, height: int }.

- id: image_window_main_scalingmode
  label: Window Scaling Mode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_processing_warp_file_selected
  label: Selected Warp File
  type: string
  description: Currently selected warp grid file name.

- id: image_processing_blend_file_selected
  label: Selected Blend Files
  type: array
  description: Array of selected blend mask file names.

- id: image_processing_blacklevel_file_selected
  label: Selected Black Level File
  type: string
  description: Currently selected black level mask file name.
```

## Variables
```yaml
# Variables mirror Feedbacks - settable properties that are not discrete action calls.
# All property.get/set pairs listed in Feedbacks apply here as writeable Variables.
# Key writeable variables (not already listed in Feedbacks as separate types):
- id: illumination_sources_laser_power
  label: Laser Power
  type: float
  min: 0  # from minpower (dynamic)
  max: 100  # from maxpower (dynamic)
  default: null
  description: Target laser power in percent. Writeable via property.set.

- id: image_brightness
  label: Brightness
  type: float
  min: -1
  max: 1
  default: 0

- id: image_contrast
  label: Contrast
  type: float
  min: 0
  max: 2
  default: 1

- id: image_gamma
  label: Gamma
  type: float
  min: 1
  max: 3
  default: 2.2

- id: image_saturation
  label: Saturation
  type: float
  min: 0
  max: 2
  default: 1

- id: image_sharpness
  label: Sharpness
  type: integer
  min: -2
  max: 8
  default: 0

- id: dmx_startchannel
  label: DMX Start Channel
  type: integer
  min: 1
  max: 512
  default: 1

# UNRESOLVED: variable ranges for zoom/focus/lensshift not stated in source
```

## Events
```yaml
# Unsolicited notifications device sends to client:
- id: property_changed
  description: |
    Fires when any subscribed property changes.
    Format: { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [{ "<property>": <value> }] } }

- id: signal_callback
  description: |
    Fires when any subscribed signal emits.
    Format: { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [{ "<signal>": { <args> } }] } }

- id: modelupdated
  description: |
    Fires when object structure changes (objects added/removed).
    Format: signal callback with "introspect.objectchanged" signal.
    Args: object (string), isnew (bool).
```

## Macros
```yaml
# Multi-step sequences described in source:

- id: upload_and_activate_warp_grid
  label: Upload and Activate Warp Grid
  description: |
    Three-step sequence to enable warp geometry correction.
    Step 1: Upload warp XML via HTTP POST to /api/image/processing/warp/file/transfer
    Step 2: property.set "image.processing.warp.file.selected" = "<filename>"
    Step 3: property.set "image.processing.warp.file.enable" = true
    Also requires: property.set "image.processing.warp.enable" = true (global enable)

- id: upload_and_activate_blend_mask
  label: Upload and Activate Blend Mask
  description: |
    Three-step sequence for multi-channel blending.
    Step 1: Upload PNG via HTTP POST to /api/image/processing/blend/file/transfer
    Step 2: property.set "image.processing.blend.file.selected" = "<filename>"
    Step 3: property.set "image.processing.blend.file.enable" = true

- id: upload_and_activate_blacklevel_mask
  label: Upload and Activate Black Level Mask
  description: |
    Three-step sequence for black level correction in blended setups.
    Step 1: Upload PNG via HTTP POST to /api/image/processing/blacklevel/file/transfer
    Step 2: property.set "image.processing.blacklevel.file.selected" = "<filename>"
    Step 3: property.set "image.processing.blacklevel.file.enable" = true

- id: wake_from_eco_mode
  label: Wake from ECO Mode
  description: |
    One of: (1) Wake on LAN with projector MAC address, (2) power button on remote, (3) power button on keypad,
    (4) RS-232 send ASCII ":POWR1\\r"

- id: verify_power_on_prerequisite
  label: Verify Before Power On
  description: |
    Best practice: check system.state is "standby" or "ready" before sending system.poweron.
    Idempotent - command has no effect if already on or transitioning.

- id: subscribe_to_all_image_changes
  label: Subscribe to All Image Changes
  description: |
    For source + signal updates: subscribe to image.window.main.source for source changes,
    plus image.connector.[name].detectedsignal for each connector in active source.
    Full client-side reflection pattern described in source: list sources → translate to object names →
    list connectors per source → translate connector names → subscribe to detectedsignal per connector.

- id: set_brightness_with_wait
  label: Set Brightness with Confirmation
  description: |
    Best practice sequence:
    Step 1: property.set image.brightness = <value>
    Step 2: Wait for confirmation result: true
    Step 3: property.subscribe ["image.brightness"] for change notification
    Step 4: Receive property.changed notification confirming new value
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
**Protocol**: JSON-RPC 2.0 over TCP (port 9090) or RS-232. All commands are JSON objects with `jsonrpc: "2.0"`, `method`, optional `params` (with optional `id`), and optional `id` for request correlation.

**Authentication**: Optional. Normal end user access skips auth. Higher privilege requires `authenticate` method with pass code. Example code shown in docs: 98765. Not enforced for basic operations.

**ECO mode wake**: Projector in ECO mode requires Wake-on-LAN, remote/keypad button, or RS-232 ASCII `:POWR1\r` to exit ECO before power commands work.

**File upload**: HTTP POST to projector at `<ip>/api/<endpoint>/file/transfer`. Upload blend masks (PNG/JPEG/TIFF, up to 16-bit grayscale, size must match projector resolution per resolution table), black level masks (same format requirements), or warp grids (XML format same as MCM500/400).

**Dynamic API note**: Source states parts of API are dynamic and depend on peripherals/configuration. Lens without motorized zoom won't expose zoom API. DMX in basic mode has 2 channels; extended mode exposes more. Introspection is recommended to discover exact available objects/properties for a specific configuration.

**Property.set best practice**: Wait for confirmation before setting same property again. Continuously setting without waiting may flood server and reduce performance.

**Property notification**: Notifications only fire on actual value changes. Subscribing to a property does not deliver the current value — use property.get to retrieve current state.

**Source naming translation**: Source names like "DisplayPort 1" translate to object names via regex `/\W/g` + lowercase → "displayport1". Connector names follow same translation.

**Image formats**: Blend/blacklevel masks accept PNG (up to 16-bit), JPEG, TIFF. Interface uses grayscale only; color images use blue channel only.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated in source -->
<!-- UNRESOLVED: precise variable ranges for optics (zoom/focus/lensshift) not stated in source -->
<!-- UNRESOLVED: all DMX channel definitions not provided in source (only listchannels method) -->
<!-- UNRESOLVED: authentication credential format beyond example code 98765 not specified -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:27:33.427Z
last_checked_at: 2026-06-02T22:04:12.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:12.959Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source"
- "additional methods present in source but truncated/partial:"
- "variable ranges for zoom/focus/lensshift not stated in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "firmware version compatibility not stated in source"
- "voltage/current/power specifications not stated in source"
- "fault behavior and error recovery sequences not stated in source"
- "precise variable ranges for optics (zoom/focus/lensshift) not stated in source"
- "all DMX channel definitions not provided in source (only listchannels method)"
- "authentication credential format beyond example code 98765 not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
