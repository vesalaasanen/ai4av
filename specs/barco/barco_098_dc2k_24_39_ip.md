---
spec_id: admin/barco-098-dc2k-24-39
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 098 Dc2K 24 39 Control Spec"
manufacturer: Barco
model_family: "Barco 098 Dc2K 24 39"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 098 Dc2K 24 39"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:51:28.056Z
last_checked_at: 2026-07-21T20:30:38.447Z
generated_at: 2026-07-21T20:30:38.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model family not explicitly stated; \"Pulse projector\" is the platform name. The device name \"098 Dc2K 24 39\" was provided externally."
  - "minpower is dynamic and device-specific"
  - "maxpower is dynamic and device-specific"
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated in source beyond the operational notes above."
  - "firmware version compatibility not stated in source"
  - "exact laser power min/max are dynamic and device-specific"
  - "protocol version number not stated in source"
  - "voltage/current/power specifications not stated in source"
  - "DMX extended mode channel count not documented beyond \"basic mode has 2 channels\""
verification:
  verdict: verified
  checked_at: 2026-07-21T20:30:38.447Z
  matched_actions: 97
  action_count: 97
  confidence: medium
  summary: "All 97 spec actions are documented verbatim in source with correct transport parameters (port 9090, baud 19200, passcode auth optional). Complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 098 Dc2K 24 39 Control Spec

## Summary
Barco Pulse projector controlled via JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial. Supports power control, source selection, illumination/laser power, picture settings (brightness, contrast, gamma, saturation, sharpness), lens optics (zoom, focus, lens shift, shutter), warping, blending, black level correction, DMX, environment monitoring (temperatures, fan speeds, alarms), and firmware management. File endpoints for warp grids, blend masks, and black level masks are available via HTTP.

<!-- UNRESOLVED: exact projector model family not explicitly stated; "Pulse projector" is the platform name. The device name "098 Dc2K 24 39" was provided externally. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP/IP service port for JSON-RPC Pulse API
  base_url: "http://{projector-ip}/api"  # HTTP file endpoints; IP is device-specific
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # optional: authentication required only for elevated access levels; normal end user access skips auth
```

## Traits
```yaml
traits:
  - powerable       # inferred from system.poweron / system.poweroff commands
  - queryable       # inferred from property.get query commands
  - routable        # inferred from source selection commands
  - levelable       # inferred from brightness/contrast/gamma/laser power level controls
```

## Actions
```yaml
# ============================================================================
# JSON-RPC 2.0 methods - all communication uses JSON-RPC 2.0 over TCP (port
# 9090) or serial. Each action carries the verbatim JSON-RPC payload from the
# source. Parameterized actions show the variable part in braces.
# ============================================================================

# --- Power control ---

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
  label: ECO Mode Wake via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII serial command to wake projector from ECO/power-save mode. Only applies to projectors with ECO mode.

# --- Authentication ---

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{passcode}}}'
  params:
    - name: passcode
      type: integer
      description: Secret pass code for elevated access level
  notes: Optional. Required only when higher-than-normal user access is needed.

# --- Illumination ---

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

# --- Lens / optics control (property.set) ---

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{target}}}'
  params:
    - name: target
      type: string
      description: Shutter target - "Open" or "Closed"

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{position}}}'
  params:
    - name: position
      type: integer
      description: Zoom position value

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{position}}}'
  params:
    - name: position
      type: integer
      description: Focus position value

- id: set_lensshift_horizontal
  label: Set Horizontal Lens Shift Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{position}}}'
  params:
    - name: position
      type: integer
      description: Horizontal lens shift position value

- id: set_lensshift_vertical
  label: Set Vertical Lens Shift Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{position}}}'
  params:
    - name: position
      type: integer
      description: Vertical lens shift position value

# --- Source selection (property.set) ---

- id: set_source
  label: Select Input Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI")

# --- Picture settings (property.set) ---

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized brightness offset. 0 is default, 1 is 100% offset. Range -1 to 1, precision 0.01.

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized contrast gain. 1 is default. Range 0 to 2, precision 0.01.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma value. Default is 2.2. Range 1 to 3, precision 0.1.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized saturation. 1 is default. Range 0 to 2, precision 0.01.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness value. Range -2 to 8, step size 1.

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":{value}}}'
  params:
    - name: value
      type: string
      description: Orientation - "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
      description: Window X position
    - name: y
      type: integer
      description: Window Y position

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}'
  params:
    - name: width
      type: integer
      description: Window width
    - name: height
      type: integer
      description: Window height

- id: set_scalingmode
  label: Set Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":{value}}}'
  params:
    - name: value
      type: string
      description: Scaling mode - "Fill", "OneToOne", "FillScreen", "Stretch"

# --- Illumination power (property.set) ---

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: float
      description: Target laser power in percent

# --- Warp control (property.set) ---

- id: set_warp_enable
  label: Enable/Disable All Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable all warp functions, false to disable

- id: set_warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable file warp, false to disable

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Warp grid file name (e.g. "warp.xml")

# --- Blend control (property.set) ---

- id: set_blend_file_enable
  label: Enable/Disable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable file blend, false to disable

- id: set_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Blend mask file name (e.g. "mask.png")

# --- Black level control (property.set) ---

- id: set_blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable black level correction, false to disable

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Black level mask file name (e.g. "blacklevel.png")

# --- System state enable (property.set) ---

- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Enable or disable use of standby state. Check availability first.

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Enable or disable use of ECO state. Check availability first.

# --- DMX control (property.set) ---

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":{value}}}'
  params:
    - name: value
      type: string
      description: DMX mode string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
  params:
    - name: value
      type: integer
      description: DMX start channel, range 1 to 512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Shutdown enabled or not

# --- LED control ---

- id: led_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":{led},"color":{color},"period":{period}}}'
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

# --- Color management ---

- id: color_copy_preset_to_custom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: color_reset_preset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset to defaults

- id: color_reset_to_native
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_next_rgb_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# --- Firmware management ---

- id: firmware_schedule_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot.

# --- Subscription management ---

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names to observe

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names to stop observing

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names (e.g. "modelupdated")

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names to stop observing

# --- HTTP file endpoints ---

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: "POST {base_url}/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Warp grid file (XML format, same as MCM500/400)
  notes: HTTP multipart upload. Example: curl -F file=@warp.xml http://{ip}/api/image/processing/warp/file/transfer

- id: download_warp_file
  label: Download Warp Grid File
  kind: action
  command: "GET {base_url}/image/processing/warp/file/transfer"
  params: []
  notes: HTTP GET. Some endpoints require specifying the file name in the URL path.

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: "POST {base_url}/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: Blend mask image (PNG up to 16 bit, JPEG, or TIFF; grayscale only)
  notes: Mask size must match projector resolution (WUXGA: 1920x1200, WQXGA/4K: 1280x800, 4K Cinemascope: 1280x540).

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: "POST {base_url}/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: Black level mask image (PNG up to 16 bit, JPEG, or TIFF; grayscale only)
  notes: Mask size must match projector resolution (WUXGA: 1920x1200, WQXGA/4K: 1280x800, 4K Cinemascope: 1280x540).

# ============================================================================
# Queries (kind: query)
# ============================================================================

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []
  returns: enum - "boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []
  returns: enum - "On", "Off"

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []
  returns: float - current laser power in percent

- id: get_laser_minpower
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []
  returns: float - minimum laser power in percent

- id: get_laser_maxpower
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []
  returns: float - maximum laser power in percent

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  returns: string

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []
  returns: string - name of currently active source

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  returns: array of strings - source names (contents vary by projector model)

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  returns: array of strings - connector names

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: Source object name derived from source name (remove non-word chars, lowercase; e.g. "displayport1")
  returns: array of objects - connector info with name and grid position

- id: get_detected_signal
  label: Get Detected Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorobject}.detectedsignal"}}'
  params:
    - name: connectorobject
      type: string
      description: Connector object name (e.g. "displayport1")
  returns: object - signal info including active, name, resolution, frequency, color space, scan type, etc.

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []
  returns: float - normalized brightness offset, 0 is default

- id: get_contrast
  label: Get Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []
  returns: float - normalized contrast gain, 1 is default

- id: get_gamma
  label: Get Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []
  returns: float - gamma value, default 2.2

- id: get_saturation
  label: Get Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []
  returns: float - normalized saturation, 1 is default

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []
  returns: integer - sharpness value

- id: get_orientation
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"}}'
  params: []
  returns: enum - "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: get_window_position
  label: Get Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"}}'
  params: []
  returns: object - {x: int, y: int}

- id: get_window_size
  label: Get Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"}}'
  params: []
  returns: object - {width: int, height: int}

- id: get_scalingmode
  label: Get Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"}}'
  params: []
  returns: enum - "Fill", "OneToOne", "FillScreen", "Stretch"

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []
  returns: enum - "Open", "Closed"

- id: get_shutter_target
  label: Get Shutter Target
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"}}'
  params: []
  returns: enum - "Open", "Closed"

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []
  returns: integer

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []
  returns: integer

- id: get_lensshift_horizontal
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []
  returns: integer

- id: get_lensshift_vertical
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []
  returns: integer

- id: get_warp_enable
  label: Get Warp Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.warp.enable"}}'
  params: []
  returns: boolean

- id: get_warp_file_enable
  label: Get Warp File Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.warp.file.enable"}}'
  params: []
  returns: boolean

- id: get_warp_file_selected
  label: Get Selected Warp File
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.warp.file.selected"}}'
  params: []
  returns: string - selected warp file name

- id: get_blend_file_enable
  label: Get Blend File Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blend.file.enable"}}'
  params: []
  returns: boolean

- id: get_blend_file_selected
  label: Get Selected Blend File(s)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blend.file.selected"}}'
  params: []
  returns: array of strings - selected blend file names

- id: get_blacklevel_file_enable
  label: Get Black Level File Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blacklevel.file.enable"}}'
  params: []
  returns: boolean

- id: get_blacklevel_file_selected
  label: Get Selected Black Level File
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.processing.blacklevel.file.selected"}}'
  params: []
  returns: string - selected black level file name

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []
  returns: string

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []
  returns: integer - range 1 to 512

- id: get_dmx_shutdown
  label: Get DMX Shutdown State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []
  returns: boolean

- id: get_network_state
  label: Get Network Device State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []
  returns: enum - "CONNECTED", "DISCONNECTED"

- id: get_network_ip4config
  label: Get Network IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []
  returns: object - {Address: string, Mask: string, Gateway: string, NameServers: string}

- id: get_standby_enable
  label: Get Standby Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"}}'
  params: []
  returns: boolean

- id: get_eco_enable
  label: Get ECO Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"}}'
  params: []
  returns: boolean

- id: get_alarm_state
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []
  returns: enum - "Fatal", "Error", "Alert", "Warning", "Ok"

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  returns: array of objects - each with severity, timestamp, source, description, custommessage

- id: get_environment_temperatures
  label: Get Temperature Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []
  returns: dictionary - sensor name to temperature value

- id: get_environment_fan_speeds
  label: Get Fan Speed Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []
  returns: dictionary - fan name to tacho RPM value

- id: get_environment_controlblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":{type},"valuetype":{valuetype}}}'
  params:
    - name: type
      type: string
      description: Sensor type - "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"
    - name: valuetype
      type: string
      description: Value type - "Temperature", "Speed", "PWM", "Voltage", "Current", "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate", "Peltier", "Waveform", "Average", "Delay", "Difference", "Interpolation", "Limit", "Median", "Noise", "Weighting", "Comparison", "Threshold", "Formula", "Driver", "PID", "Mode", "State", "Pump", "Resistance", "Simulation", "Constant", "Manual", "Range", "Any"
  returns: array of key/value pairs

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  returns: array of strings - available channel names

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  returns: array of strings - available mode names

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  returns: array of strings - component names

- id: list_firmware_version_status
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  returns: array of objects - each with name, versions (available, running), status ("Unknown", "OK", "Upgradable")

- id: introspect
  label: Introspect API
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":{object},"recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name to introspect in dot notation. Empty/default introspects everything.
    - name: recursive
      type: boolean
      description: If true (default), lists all methods/properties/signals. If false, only lists object names one level.
  returns: object - metadata of available objects (methods, properties, signals)
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  description: Current projector operating state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  description: Illumination on/off state

- id: laser_power
  type: number
  description: Current laser power level in percent

- id: active_source
  type: string
  description: Name of currently active source

- id: brightness
  type: number
  description: Current brightness offset value (-1 to 1)

- id: contrast
  type: number
  description: Current contrast gain value (0 to 2)

- id: gamma
  type: number
  description: Current gamma value (default 2.2)

- id: saturation
  type: number
  description: Current saturation value (0 to 2)

- id: sharpness
  type: integer
  description: Current sharpness value (-2 to 8)

- id: shutter_position
  type: enum
  values: ["Open", "Closed"]
  description: Physical shutter position

- id: network_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  description: LAN device connection state

- id: alarm_state
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  description: Overall environment alarm state

- id: detected_signal
  type: object
  description: Detected signal information for a connector (active, name, resolution, frequency, color space, etc.)
```

## Variables
```yaml
- id: laser_power_level
  property: illumination.sources.laser.power
  type: float
  access: read-write
  min: null  # UNRESOLVED: minpower is dynamic and device-specific
  max: null  # UNRESOLVED: maxpower is dynamic and device-specific
  description: Target laser power in percent

- id: brightness_level
  property: image.brightness
  type: float
  access: read-write
  min: -1
  max: 1
  precision: 0.01
  description: Normalized brightness offset, 0 is default

- id: contrast_level
  property: image.contrast
  type: float
  access: read-write
  min: 0
  max: 2
  precision: 0.01
  description: Normalized contrast gain, 1 is default

- id: gamma_level
  property: image.gamma
  type: float
  access: read-write
  min: 1
  max: 3
  precision: 0.1
  description: Gamma value, default 2.2

- id: saturation_level
  property: image.saturation
  type: float
  access: read-write
  min: 0
  max: 2
  precision: 0.01
  description: Normalized saturation, 1 is default

- id: sharpness_level
  property: image.sharpness
  type: integer
  access: read-write
  min: -2
  max: 8
  description: Image sharpness
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: >
    Unsolicited notification sent by the server when a subscribed property value changes.
    Client must implement this handler. The params.property field contains an array of
    objects mapping property names to their new values.
  payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
  notes: Two notifications may be delivered for source changes - first when the old source is deselected (empty string), then when the new source is selected.

- id: signal_callback
  method: signal.callback
  description: >
    Unsolicited notification sent by the server when a subscribed signal is emitted.
    Client must implement this handler. The params.signal field contains an array of
    objects mapping signal names to their argument objects.
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"modelupdated":{"object":"motors.motor1","newobject":true}}]}}'

- id: model_updated
  signal: modelupdated
  description: Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe with signal "modelupdated".
```

## Macros
```yaml
# No multi-step sequences are explicitly described in the source as named macros.
# The source does describe implicit sequences (e.g. upload warp file → select file → enable warp),
# but these are presented as individual steps, not named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: good practice to verify projector state is standby or ready before issuing power on. If already on or transitioning, nothing happens."
  - description: "Power off: good practice to verify projector state is on before issuing power off. If already off or transitioning, nothing happens."
  - description: "property.set: best practice to wait for confirmation before setting the same property again. Flooding with repeated sets may reduce performance."
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated in source beyond the operational notes above.
```

## Notes
- The projector uses a JSON-RPC 2.0 API called "Pulse API". All commands are identical regardless of connection type (TCP or serial).
- TCP/IP connection uses port 9090. Serial connection uses RS-232 with a standard 9-pin cable (pin 2↔2, pin 3↔3, pin 5↔5).
- Authentication is optional — only needed for elevated access levels. Normal end-user access can skip authentication entirely.
- The API is dynamic: available objects/methods/properties depend on projector configuration and attached peripherals. Introspection (`introspect` method) is the recommended way to discover the exact API for a specific device.
- Source/connector object names are derived by removing all non-word characters from the display name and converting to lowercase (e.g. "DisplayPort 1" → "displayport1").
- Warp file format is the same as MCM500/400.
- Blend and black level masks support PNG (up to 16-bit), JPEG, and TIFF. Only grayscale data is used; color images use only the blue channel.
- Mask resolution must match projector resolution: WUXGA → 1920×1200, WQXGA → 1280×800, 4K → 1280×800, 4K Cinemascope → 1280×540.
- ECO mode wake requires either Wake-on-LAN, IR remote power button, keypad power button, or the serial command `:POWR1\r`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact laser power min/max are dynamic and device-specific -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: DMX extended mode channel count not documented beyond "basic mode has 2 channels" -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:51:28.056Z
last_checked_at: 2026-07-21T20:30:38.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:30:38.447Z
matched_actions: 97
action_count: 97
confidence: medium
summary: "All 97 spec actions are documented verbatim in source with correct transport parameters (port 9090, baud 19200, passcode auth optional). Complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model family not explicitly stated; \"Pulse projector\" is the platform name. The device name \"098 Dc2K 24 39\" was provided externally."
- "minpower is dynamic and device-specific"
- "maxpower is dynamic and device-specific"
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements stated in source beyond the operational notes above."
- "firmware version compatibility not stated in source"
- "exact laser power min/max are dynamic and device-specific"
- "protocol version number not stated in source"
- "voltage/current/power specifications not stated in source"
- "DMX extended mode channel count not documented beyond \"basic mode has 2 channels\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
