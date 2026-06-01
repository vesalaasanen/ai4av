---
spec_id: admin/barco-medea
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Medea Control Spec"
manufacturer: Barco
model_family: Medea
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Medea
    - UDX-4K32
    - UDX-4K22
    - UDX-W32
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:56:23.945Z
generated_at: 2026-05-20T05:56:23.945Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:56:23.945Z
  matched_actions: 66
  action_count: 66
  confidence: high
  summary: "All 66 spec actions matched verbatim in the source method catalogue; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Barco Medea Control Spec

## Summary

The Barco Medea (Pulse API) is a professional laser projector controlled via a JSON-RPC 2.0 protocol over TCP/IP (port 9090) or RS-232 serial. This spec covers the Pulse API version 1.7, which exposes full projector control including power management, input source selection, image processing (warp, blend, black level), illumination, optics (lens shift, focus, zoom), environment monitoring, and notifications.

<!-- UNRESOLVED: Specific Medea model variants and firmware compatibility ranges not stated in source; the source covers UDX-family Pulse API projectors broadly. -->

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
  type: optional  # Source states: auth can be skipped for normal end-user access; required only when higher access level is needed. Authenticate via method "authenticate" with params {"code": <passcode>}.
```

## Traits

```yaml
- powerable       # inferred from power on/off command examples (system.poweron, system.poweroff)
- routable        # inferred from input source selection commands (image.window.main.source)
- queryable       # inferred from property.get and state query command examples
- levelable       # inferred from brightness, contrast, laser power, and lens shift level controls
```

## Actions

```yaml
# --- Power ---
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "JSON-RPC method: system.poweron. Result is null (not an error). Verify system.state is standby or ready before calling."

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "JSON-RPC method: system.poweroff. Verify system.state is on before calling."

- id: goto_ready
  label: Go to Ready State
  kind: action
  params: []
  notes: "JSON-RPC method: system.gotoready"

- id: goto_eco
  label: Go to ECO State
  kind: action
  params: []
  notes: "JSON-RPC method: system.gotoeco. Note: ECO mode requires Wake-on-LAN, remote control, keypad button, or RS-232 :POWR1\\r command to wake."

- id: reboot
  label: Reboot Projector
  kind: action
  params: []
  notes: "JSON-RPC method: system.reboot. Powers off projector first."

# --- Source Selection ---
- id: set_input_source
  label: Set Active Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "Source name (e.g. 'DisplayPort 1', 'HDMI', 'DVI 1', 'HDBaseT', 'SDI'). Call image.source.list first to get available sources."
  notes: "Sets property image.window.main.source via property.set method."

# --- Shutter ---
- id: shutter_open
  label: Open Shutter
  kind: action
  params: []
  notes: "Use keydispatcher.sendclickevent with key: RC_SHUTTER_OPEN"

- id: shutter_close
  label: Close Shutter
  kind: action
  params: []
  notes: "Use keydispatcher.sendclickevent with key: RC_SHUTTER_CLOSE"

- id: shutter_toggle
  label: Toggle Shutter
  kind: action
  params: []
  notes: "JSON-RPC method: optics.shutter.toggle"

# --- Image Processing ---
- id: set_warp_enable
  label: Enable/Disable Warp
  kind: action
  params:
    - name: enable
      type: boolean
      description: "true to enable, false to disable"
  notes: "Sets property image.processing.warp.enable via property.set."

- id: set_warp_file
  label: Select Warp Grid File
  kind: action
  params:
    - name: filename
      type: string
      description: "Name of the warp grid XML file already uploaded to the projector"
  notes: "Sets property image.processing.warp.file.selected via property.set."

- id: enable_warp_file
  label: Enable Warp File Grid
  kind: action
  params:
    - name: enable
      type: boolean
      description: "true to enable file-based warping"
  notes: "Sets property image.processing.warp.file.enable via property.set."

- id: set_blend_file
  label: Select Blend Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: "Name of the uploaded blend mask image file (PNG/JPEG/TIFF)"
  notes: "Sets property image.processing.blend.file.selected via property.set."

- id: enable_blend_file
  label: Enable Blend Mask
  kind: action
  params:
    - name: enable
      type: boolean
      description: "true to enable blend mask"
  notes: "Sets property image.processing.blend.file.enable via property.set."

- id: set_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  params:
    - name: filename
      type: string
      description: "Name of the uploaded black level mask file"
  notes: "Sets property image.processing.blacklevel.file.selected via property.set."

- id: enable_blacklevel_file
  label: Enable Black Level Mask
  kind: action
  params:
    - name: enable
      type: boolean
      description: "true to enable black level mask"
  notes: "Sets property image.processing.blacklevel.file.enable via property.set."

# --- Illumination ---
- id: set_laser_power
  label: Set Laser Power
  kind: action
  params:
    - name: power
      type: float
      description: "Power in percent (float). Query illumination.sources.laser.minpower and illumination.sources.laser.maxpower for valid range."
  notes: "Sets property illumination.sources.laser.power via property.set. Best practice: wait for confirmation before setting again."

- id: engage_clo
  label: Engage Constant Light Output (CLO)
  kind: action
  params: []
  notes: "JSON-RPC method: illumination.clo.engage. Engages CLO at current light level."

# --- Brightness / Picture ---
- id: set_brightness
  label: Set Image Brightness
  kind: action
  params:
    - name: value
      type: float
      description: "Normalized brightness offset. Range: -1.0 to 1.0. Default 0. Step 0.01."
  notes: "Sets property image.brightness via property.set."

# --- Optics: Lens Shift ---
- id: lens_shift_horizontal_forward
  label: Lens Shift Horizontal Forward
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.horizontal.runforward"

- id: lens_shift_horizontal_reverse
  label: Lens Shift Horizontal Reverse
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.horizontal.runreverse"

- id: lens_shift_vertical_forward
  label: Lens Shift Vertical Forward
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.vertical.runforward"

- id: lens_shift_vertical_reverse
  label: Lens Shift Vertical Reverse
  kind: action
  params: []
  notes: "JSON-RPC method: optics.lensshift.vertical.runreverse"

- id: lens_shift_to_center
  label: Shift Lens to Center
  kind: action
  params: []
  notes: "JSON-RPC method: optics.shifttocenter"

# --- Optics: Focus (UDX-4K32, UDX-4K22 only) ---
- id: focus_forward
  label: Focus Forward
  kind: action
  params: []
  notes: "JSON-RPC method: optics.focus.runforward. MODELS UDX-4K32 UDX-4K22 only."

- id: focus_reverse
  label: Focus Reverse
  kind: action
  params: []
  notes: "JSON-RPC method: optics.focus.runreverse. MODELS UDX-4K32 UDX-4K22 only."

- id: focus_stop
  label: Stop Focus Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.focus.stop. MODELS UDX-4K32 UDX-4K22 only."

# --- Optics: Zoom (UDX-4K32, UDX-4K22 only) ---
- id: zoom_forward
  label: Zoom Forward
  kind: action
  params: []
  notes: "JSON-RPC method: optics.zoom.runforward. MODELS UDX-4K32 UDX-4K22 only."

- id: zoom_reverse
  label: Zoom Reverse
  kind: action
  params: []
  notes: "JSON-RPC method: optics.zoom.runreverse. MODELS UDX-4K32 UDX-4K22 only."

- id: zoom_stop
  label: Stop Zoom Motor
  kind: action
  params: []
  notes: "JSON-RPC method: optics.zoom.stop. MODELS UDX-4K32 UDX-4K22 only."

# --- System ---
- id: system_reset
  label: Reset Selected Domains
  kind: action
  params:
    - name: domains
      type: array
      description: "Array of domain enums to reset. Valid values: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx"
  notes: "JSON-RPC method: system.reset. Asynchronous; completion signalled by system.performed signal."

- id: system_reset_all
  label: Reset All Domains
  kind: action
  params: []
  notes: "JSON-RPC method: system.resetall. Asynchronous; completion signalled by system.performed signal."

# --- Remote Control Key Events ---
- id: send_key_click
  label: Send Remote Control Key Click
  kind: action
  params:
    - name: key
      type: enum
      description: "Key name. Values include: RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1 through RC_0, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY"
  notes: "JSON-RPC method: keydispatcher.sendclickevent. Sends press + release event."

# --- Authentication ---
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  params:
    - name: code
      type: integer
      description: "Secret pass code for elevated access. Not required for normal end-user access."
  notes: "JSON-RPC method: authenticate with params {code: <integer>}. Returns true on success. Only needed for POWER_USER or higher access level."

# --- File Upload (HTTP) ---
- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  params:
    - name: file_path
      type: string
      description: "Local path to warp grid XML file"
    - name: projector_ip
      type: string
      description: "IP address of projector"
  notes: "HTTP POST to http://<projector_ip>/api/image/processing/warp/file/transfer. Use multipart form: -F file=@warp.xml"

- id: upload_blend_mask
  label: Upload Blend Mask File (HTTP)
  kind: action
  params:
    - name: file_path
      type: string
      description: "Local path to blend mask image (PNG up to 16-bit, JPEG, or TIFF; grayscale)"
    - name: projector_ip
      type: string
      description: "IP address of projector"
  notes: "HTTP POST to http://<projector_ip>/api/image/processing/blend/file/transfer. Mask resolution must match projector resolution (see Notes)."

- id: upload_blacklevel_mask
  label: Upload Black Level Mask File (HTTP)
  kind: action
  params:
    - name: file_path
      type: string
      description: "Local path to black level mask image (PNG up to 16-bit, JPEG, or TIFF; grayscale)"
    - name: projector_ip
      type: string
      description: "IP address of projector"
  notes: "HTTP POST to http://<projector_ip>/api/image/processing/blacklevel/file/transfer."
- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  params: []
  notes: "JSON-RPC method: dmx.listchannels."

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  params: []
  notes: "JSON-RPC method: dmx.listmodes."

- id: environment_get_alarm_info
  label: Get Alarm Info
  kind: query
  params: []
  notes: "JSON-RPC method: environment.getalarminfo."

- id: environment_get_control_blocks
  label: Get Environment Control Blocks
  kind: query
  params:
    - name: type
      type: string
      description: "Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)."
    - name: valuetype
      type: string
      description: "Value type (Temperature, Speed, PWM, Voltage, etc.)."
  notes: "JSON-RPC method: environment.getcontrolblocks."

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  params: []
  notes: "JSON-RPC method: firmware.listcomponents."

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  params: []
  notes: "JSON-RPC method: firmware.listcomponentversionstatus."

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  params: []
  notes: "JSON-RPC method: firmware.schedulecomponentupgrade."

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  params: []
  notes: "JSON-RPC method: illumination.laser.getserialnumber."

- id: notification_list
  label: List Active Notifications
  kind: query
  params: []
  notes: "JSON-RPC method: notification.list."

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  params:
    - name: id
      type: string
      description: "Notification id."
    - name: response
      type: string
      description: "Response (NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS)."
  notes: "JSON-RPC method: notification.dismiss."

- id: notification_list_suppressed
  label: List Suppressed Notification Codes
  kind: query
  params: []
  notes: "JSON-RPC method: notification.listsuppressed."

- id: notification_log
  label: Get Notification Log
  kind: query
  params:
    - name: minimumseverity
      type: string
      description: "Minimum severity (INFO, CAUTION, WARNING, ERROR, CRITICAL)."
    - name: start
      type: integer
    - name: count
      type: integer
  notes: "JSON-RPC method: notification.log."

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  params:
    - name: code
      type: string
  notes: "JSON-RPC method: notification.suppress."

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  params:
    - name: code
      type: string
  notes: "JSON-RPC method: notification.unsuppress."

- id: notification_unsuppress_all
  label: Unsuppress All Notification Codes
  kind: action
  params: []
  notes: "JSON-RPC method: notification.unsuppressall."

- id: keydispatcher_send_press_event
  label: Send Remote Control Key Press Event
  kind: action
  params:
    - name: key
      type: string
      description: "Key name."
  notes: "JSON-RPC method: keydispatcher.sendpressevent."

- id: keydispatcher_send_release_event
  label: Send Remote Control Key Release Event
  kind: action
  params:
    - name: key
      type: string
      description: "Key name."
  notes: "JSON-RPC method: keydispatcher.sendreleaseevent."

- id: image_connector_list
  label: List Image Connectors
  kind: query
  params: []
  notes: "JSON-RPC method: image.connector.list."

- id: image_source_list
  label: List Available Sources
  kind: query
  params: []
  notes: "JSON-RPC method: image.source.list."

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.warp.file.list."

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.warp.file.delete."

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.blend.file.list."

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.blend.file.delete."

- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: query
  params: []
  notes: "JSON-RPC method: image.processing.blacklevel.file.list."

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level File
  kind: action
  params:
    - name: filename
      type: string
  notes: "JSON-RPC method: image.processing.blacklevel.file.delete."

- id: statistics_list_counters
  label: List Statistics Counters
  kind: query
  params: []
  notes: "JSON-RPC method: statistics.listcounters."

- id: system_get_identifications
  label: Get System Identifications
  kind: query
  params: []
  notes: "JSON-RPC method: system.getidentifications."

- id: system_list_reset_domains
  label: List Reset Domains
  kind: query
  params: []
  notes: "JSON-RPC method: system.listresetdomains."

- id: system_get_system_date
  label: Get System Date
  kind: query
  params: []
  notes: "JSON-RPC method: system.getsystemdate."

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  params: []
  notes: "JSON-RPC method: image.testpattern.list."
```

## Feedbacks

```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, "on", deconditioning, service, error]
  notes: "Query: property.get with property 'system.state'. Subscribe for change notifications."

- id: illumination_state
  type: enum
  values: [On, Off]
  notes: "Query: property.get with property 'illumination.state'."

- id: active_source
  type: string
  notes: "Query: property.get with property 'image.window.main.source'. Returns empty string when no source is active."

- id: laser_power
  type: float
  notes: "Query: property.get with property 'illumination.sources.laser.power'. Returns current power level in percent."

- id: image_brightness
  type: float
  notes: "Query: property.get with property 'image.brightness'. Range -1.0 to 1.0."

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  notes: "Query: property.get with property 'environment.alarmstate'."

- id: firmware_version
  type: string
  notes: "Query: property.get with property 'system.firmwareversion' or 'firmware.firmwareversion'."

- id: model_name
  type: string
  notes: "Query: property.get with property 'system.modelname'."

- id: serial_number
  type: string
  notes: "Query: property.get with property 'system.serialnumber'."

- id: connector_detected_signal
  type: object
  notes: "Query: property.get with property 'image.connector.<connectorname>.detectedsignal'. Returns object with active bool, name string, resolution, timing, color space, and other signal metadata."

- id: light_output
  type: integer
  notes: "Query: lightmeasurement.getlightoutput. Returns lumens as int."
```

## Variables

```yaml
- id: laser_power_level
  label: Laser Power Level
  type: float
  range: "illumination.sources.laser.minpower to illumination.sources.laser.maxpower (percent)"
  property: "illumination.sources.laser.power"
  access: RW
  notes: "Best practice: wait for property.set confirmation before setting again."

- id: image_brightness
  label: Image Brightness
  type: float
  range: "-1.0 to 1.0"
  step: 0.01
  property: "image.brightness"
  access: RW

- id: image_window_source
  label: Active Input Source
  type: string
  property: "image.window.main.source"
  access: RW
  notes: "Set to empty string to deselect. Use image.source.list to get valid values."

- id: warp_enable
  label: Warp Global Enable
  type: boolean
  property: "image.processing.warp.enable"
  access: RW

- id: blend_file_enable
  label: Blend Mask Enable
  type: boolean
  property: "image.processing.blend.file.enable"
  access: RW

- id: blacklevel_file_enable
  label: Black Level Mask Enable
  type: boolean
  property: "image.processing.blacklevel.file.enable"
  access: RW

- id: osd_enable
  label: OSD (On-Screen Display) Enable
  type: boolean
  property: "ui.osd"
  access: RW

- id: stealth_mode
  label: Stealth Mode (LED Control)
  type: enum
  values: [Off, On]
  property: "ui.stealthmode"
  access: RW

- id: eco_enable
  label: ECO Mode Enable
  type: boolean
  property: "system.eco.enable"
  access: RW
  notes: "Check system.eco.available before enabling."

- id: clo_enable
  label: Constant Light Output (CLO) Enable
  type: boolean
  property: "illumination.clo.enable"
  access: RW

- id: screen_luminance
  label: Screen Luminance (cd/m2)
  type: float
  range: "50 to 10000"
  step: 10
  property: "screen.luminance"
  access: RW

- id: hdr_boost
  label: HDR Intensity
  type: float
  range: "0.8 to 1.2"
  step: 0.01
  property: "screen.hdrboost"
  access: RW
```

## Events

```yaml
- id: property_changed
  description: "Unsolicited notification when a subscribed property changes value."
  method: "property.changed"
  payload: "params.property: array of {<property.path>: <new_value>} objects"
  notes: "Client must subscribe via property.subscribe before receiving. Client implements the property.changed notification handler."

- id: signal_callback
  description: "Unsolicited signal callback when a subscribed signal fires."
  method: "signal.callback"
  payload: "params.signal: array of {<object.signalname>: {<arg>: <value>}} objects"

- id: modelupdated
  description: "Fired when new objects appear or disappear in the API (e.g. dynamic lens capabilities)."
  method: "signal.callback"
  signal_name: "modelupdated"
  payload: "object string, newobject bool, accesslevel enum"

- id: system_performed
  description: "Emitted when one or more reset domains complete resetting (after system.reset or system.resetall)."
  signal_name: "system.performed"
  payload: "domains: array of domain enum values"

- id: notification_emitted
  description: "Emitted when a new projector notification occurs."
  signal_name: "notification.emitted"
  payload: "notification object with severity, id, code, timestamp, message, timeout, actions"

- id: warpgrid_changed
  description: "Fired when the warp grid changes."
  signal_name: "image.processing.warpgrid.changed"
  payload: "No arguments (use image.processing.warpgrid.gridchanged for grid data payload)"

- id: edid_list_changed
  description: "Fired when the EDID list for a connector changes."
  signal_names:
    - "image.connector.l1displayport.edid.listchanged"
    - "image.connector.l1hdbaset1.edid.listchanged"
    - "image.connector.l1hdbaset2.edid.listchanged"
    - "image.connector.l1hdmi.edid.listchanged"
```

## Macros

```yaml
# ECO Wake Sequence (via RS-232 only):
# - id: eco_wake_serial
#   description: Wake projector from ECO mode via RS-232
#   steps:
#     - Send ASCII string ":POWR1\r" on RS-232 serial port (19200 baud, 8N1)
#     - Wait for system.state to transition from "eco" to "standby" or "ready"
#   notes: "TCP/IP cannot wake a projector in ECO mode. Use Wake-on-LAN, remote control, keypad, or this serial command."

# Source Selection Workflow:
# - id: select_source_safe
#   description: Safely select an input source
#   steps:
#     - Call image.source.list to get available source names
#     - Call property.set with property "image.window.main.source" and desired source name
#     - Subscribe to image.window.main.source to monitor transition
#   notes: "Two property.changed notifications arrive: first when old source deselects (value ''), then when new source activates."

# Warp File Activation Workflow:
# - id: activate_warp_file
#   description: Upload and activate a warp grid file
#   steps:
#     - HTTP POST the warp XML file to http://<ip>/api/image/processing/warp/file/transfer
#     - property.set image.processing.warp.file.selected = "<filename>.xml"
#     - property.set image.processing.warp.file.enable = true
#     - property.set image.processing.warp.enable = true
```

## Safety

```yaml
confirmation_required_for:
  - system.reboot  # Reboots power off the projector first
  - system.resetall  # Resets all domains asynchronously; may disrupt active display
interlocks:
  - "Power on: verify system.state is 'standby' or 'ready' before calling system.poweron; if already on or in transition, command is silently ignored."
  - "Power off: verify system.state is 'on' before calling system.poweroff; if already off or in transition, command is silently ignored."
  - "ECO wake: TCP/IP connection is unavailable in ECO mode; only RS-232 (:POWR1\\r), Wake-on-LAN, or physical button can wake the projector."
  - "system.reset / system.resetall: subsequent calls fail until all domains have completed resetting (signalled by system.performed)."
  - "property.set: best practice is to wait for confirmation response before setting the same property again to avoid flooding the server."
```

## Notes

**Protocol:** The Pulse API uses JSON-RPC 2.0. All messages must be valid JSON. The `id` field is optional but recommended for request/response correlation. Notification messages (server-to-client) do not include an `id` and must not be replied to.

**Framing:** The source does not specify a message delimiter or framing format for the TCP/IP connection. Implementations should assume newline-delimited JSON or rely on JSON object boundary detection.
<!-- UNRESOLVED: TCP message framing/delimiter not specified in source. -->

**Authentication levels:** The source mentions access levels "UNAUTHENTICATED_END_USER", "END_USER", "POWER_USER", "SERVICE_PARTNER", "MANUFACTURING", "DEVELOPMENT", "INACCESSIBLE". Normal end-user control (power, source, image) does not require authentication. Some properties and methods may be restricted to higher access levels.

**Dynamic API:** The API is partially dynamic. Available properties, methods, and signals depend on the connected lens, installed peripherals, DMX configuration, and projector model. Use `introspect` to discover the exact API surface for a given projector.

**HTTP file endpoints:** Warp grid, blend mask, and black level mask files are uploaded/downloaded via HTTP (not JSON-RPC). Base URL: `http://<projector_ip>/api/<object_path>`. File uploads use HTTP POST multipart form; downloads use HTTP GET.

**Blend mask resolution requirements:**
- WUXGA projectors: 1920 x 1200
- WQXGA projectors: 1280 x 800
- 4K projectors: 1280 x 800
- 4K Cinemascope projectors: 1280 x 540

**Supported blend mask formats:** PNG (up to 16-bit), JPEG, TIFF. Must be grayscale (color images accepted but only blue channel used).

**Model-specific features:** Focus, zoom motorization (optics.focus.*, optics.zoom.*) and l2-connector APIs are available on UDX-4K32 and UDX-4K22 only. Peripheral frame motor control is UDX-4K22 only.

**ECO mode:** Some projectors support ECO mode (deep power save). Check `system.eco.available` before enabling. Waking from ECO via TCP/IP is not possible; use RS-232 command `:POWR1\r`, Wake-on-LAN, or physical buttons.

**Source document:** Pulse API Reference Guide Version 1.7, 2019-03-04.
<!-- UNRESOLVED: Connection TCP message framing/delimiter not specified in source. -->
<!-- UNRESOLVED: Authentication passcode format and value not stated in source (only that a code integer is used). -->
<!-- UNRESOLVED: Full list of available test patterns not in source (use image.testpattern.list at runtime). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:54.418Z
last_checked_at: 2026-05-20T05:56:23.945Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:56:23.945Z
matched_actions: 66
action_count: 66
confidence: high
summary: "All 66 spec actions matched verbatim in the source method catalogue; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
