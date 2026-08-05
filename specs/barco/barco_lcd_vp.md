---
spec_id: admin/barco-lcd-vp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco LCD VP Control Spec"
manufacturer: Barco
model_family: "Barco LCD VP"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco LCD VP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T04:30:31.328Z
last_checked_at: 2026-07-13T06:40:28.190Z
generated_at: 2026-07-13T06:40:28.190Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants not enumerated in source"
  - "firmware version compatibility not stated"
  - "HTTP file-transfer TCP port not stated in source (curl examples omit port)"
  - "voltage/power specifications, fault behavior, error recovery sequences not stated"
  - "actual authentication pass code format/structure not stated in source"
  - "specific model variant list (this applies to entire LCD VP family)"
  - "voltage, current, power specifications not stated"
  - "fault behavior / error recovery sequences not stated"
  - "HTTP file-transfer TCP port not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-13T06:40:28.190Z
  matched_actions: 174
  action_count: 174
  confidence: medium
  summary: "All 174 spec actions map to literal JSON-RPC methods or HTTP file endpoints in source after removal of the 4 phantom duration params on runforward/runreverse; transport params (port 9090, 19200/8/N/1) verbatim-supported. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Barco LCD VP Control Spec

## Summary
Barco LCD VP laser projector supporting both RS-232 serial and TCP/IP control via JSON-RPC 2.0. The projector exposes a comprehensive property/method/signal API for controlling power, source selection, image adjustment, warping, blending, and system diagnostics. Port 9090 for TCP; RS-232 at 19200/8/N/1. File upload/download (warp grids, blend masks, EDID, firmware, test patterns) uses HTTP POST/GET to `/api/<endpoint>/file/transfer`.

<!-- UNRESOLVED: specific model variants not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: HTTP file-transfer TCP port not stated in source (curl examples omit port) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # stated: "service is available on port number 9090" (TCP JSON-RPC)
  base_url: "http://{host}/api"  # HTTP file-transfer endpoints (POST/GET). Port UNRESOLVED - source omits it.
serial:
  baud_rate: 19200  # stated: "Baud rate | 19200"
  data_bits: 8      # stated: "Data bits | 8"
  parity: none      # stated: "Parity | None"
  stop_bits: 1      # stated: "Stop bits | 1"
  flow_control: none  # stated: "Flow control | None"
auth:
  type: optional  # stated: "Authentication is only necessary when a higher level than normal end user is required"
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- queryable       # property.get, environment.getcontrolblocks, system.state queries present
- routable        # image.window.main.source property.set for input selection present
- levelable       # image.brightness, image.contrast, image.saturation, etc. present
```

## Actions
```yaml
# ============ Existing entries (preserved) ============
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "system.poweron"}

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "system.poweroff"}

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set"}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.window.main.source")
    - name: value
      type: any
      description: New value for the property
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "property.set", "params": {"property": "...", "value": ...}}
    Best practice: wait for confirmation before setting the same property again.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get"}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (or array of paths)
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "property.get", "params": {"property": "..."}}

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate"}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "authenticate", "params": {"code": ...}}
    Only needed for access levels higher than normal end user.

- id: system_gotoeco
  label: Set ECO Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.gotoeco"}'
  params: []

- id: system_gotoready
  label: Set Ready Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.gotoready"}'
  params: []

- id: system_reboot
  label: Reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.reboot"}'
  params: []
  description: Reboots the projector; powers off first.

- id: system_reset
  label: Reset Domain
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.reset"}'
  params:
    - name: domains
      type: array
      description: Array of domain names to reset (e.g. ["ImageSource", "ImageWarp"])

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.resetall"}'
  params: []

- id: image_source_list
  label: List Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
  description: Returns array of available source names (e.g. ["DVI 1", "HDMI", "DisplayPort 1"])

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []
  description: Returns array of available connector names

- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks"}'
  params:
    - name: type
      type: string
      description: Sensor type (e.g. "Sensor", "Filter", "Controller")
    - name: valuetype
      type: string
      description: Value type (e.g. "Temperature", "Speed", "Voltage", "Current", "Power")

- id: optics_zoom_runforward
  label: Zoom Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runforward"}'
  params: []

- id: optics_zoom_runreverse
  label: Zoom Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runreverse"}'
  params: []

- id: optics_zoom_stop
  label: Zoom Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stop"}'
  params: []

- id: optics_focus_runforward
  label: Focus Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runforward"}'
  params: []

- id: optics_focus_runreverse
  label: Focus Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runreverse"}'
  params: []

- id: optics_focus_stop
  label: Focus Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stop"}'
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.shutter.toggle"}'
  params: []

- id: optics_shifttocenter
  label: Lens Shift to Center
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.shifttocenter"}'
  params: []
  description: Shift lens to center of allowed shift range.

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendclickevent"}'
  params:
    - name: key
      type: string
      description: 'Key enum (e.g. "RC_POWER_ON", "RC_SHUTTER_OPEN", "KP_MENU")'

- id: ui_menu
  label: Toggle OSD Menu
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "ui.menu"}}'
  params:
    - name: show
      type: boolean
      description: true to show, false to hide

- id: ui_osd
  label: Toggle OSD
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "ui.osd"}}'
  params:
    - name: enable
      type: boolean
      description: true to enable OSD

# ============ Added in upgrade pass ============

# --- Core JSON-RPC API methods (Service API / Signals / Introspection) ---
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe"}'
  params:
    - name: property
      type: string
      description: Property path or array of paths to observe
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "..."}}

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe"}'
  params:
    - name: property
      type: string
      description: Property path or array of paths
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "..."}}

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe"}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names (e.g. "modelupdated", "image.processing.warp.gridchanged")
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "..."}}

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe"}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "..."}}

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect"}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default/empty introspects everything)
      required: false
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level). Default true.
      required: false
  description: |
    JSON-RPC: {"jsonrpc": "2.0", "method": "introspect", "params": {"object": "...", "recursive": true}}

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
  description: Returns list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []
  description: Returns list of all DMX modes.

# --- Environment ---
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []
  description: Returns alarm info array (severity, timestamp, source, description, custommessage).

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
  description: Lists names of all managed firmware components.

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
  description: Lists firmware components with available/running version and upgrade status.

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  description: Force a component upgrade at the following reboot.

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  description: Engage CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

# --- Color management ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom"}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset"}'
  params:
    - name: presetname
      type: string
  description: Reset preset back to its default values.

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
  description: Cycles to the next RGB mode.

# --- Connectors / sources ---
- id: image_connector_edid_list
  label: List Connector EDID Selections
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.{connector}.edid.list"}'
  params:
    - name: connector
      type: string
      description: 'Connector object name (e.g. "l1displayport", "l1hdmi", "l2displayporta")'
  description: |
    Per-connector methods documented: image.connector.l1displayport.edid.list,
    image.connector.l1hdbaset1.edid.list, image.connector.l1hdbaset2.edid.list,
    image.connector.l1hdmi.edid.list, image.connector.l2displayporta.edid.list,
    image.connector.l2displayportb.edid.list, image.connector.l2displayportc.edid.list,
    image.connector.l2displayportd.edid.list

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: 'Source object name (e.g. "l1displayport", "l1hdmi", "l2quaddp")'
  description: |
    Per-source methods documented: image.source.l1displayport.listconnectors,
    image.source.l1hdbaset1.listconnectors, image.source.l1hdbaset2.listconnectors,
    image.source.l1hdmi.listconnectors, image.source.l1quadsdi.listconnectors,
    image.source.l1sdia.listconnectors, image.source.l1sdib.listconnectors,
    image.source.l1sdic.listconnectors, image.source.l1sdid.listconnectors,
    image.source.l2displayporta.listconnectors, image.source.l2displayportb.listconnectors,
    image.source.l2displayportc.listconnectors, image.source.l2displayportd.listconnectors,
    image.source.l2dualdpab.listconnectors, image.source.l2dualdpac.listconnectors,
    image.source.l2dualdpbd.listconnectors, image.source.l2dualdpcd.listconnectors,
    image.source.l2dualheaddpac.listconnectors, image.source.l2dualheaddpbd.listconnectors,
    image.source.l2dualheaddualdpabcd.listconnectors, image.source.l2quadcolumndp.listconnectors,
    image.source.l2quaddp.listconnectors

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.display.listdisplaymodes"}'
  params: []
  description: 'Returns enum list: "Mono" "AutoStereo" "ActiveStereo" "NightVision" "IGPixelShift".'

- id: image_resolution_list
  label: List Resolutions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.resolution.list"}'
  params: []
  description: Returns array of resolution strings.

- id: image_window_list
  label: List Windows
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.window.list"}'
  params: []

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.stereo.listdarktime"}'
  params: []
  description: Returns array of darktime values in microseconds.

# --- Black level ---
- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Black Level Area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getblacklevelarea"}'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float
  description: Returns four boxes describing the black level edges.

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Black Level Area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea"}'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.file.delete"}'
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.file.list"}'
  params: []

# --- Blend ---
- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getblendarea"}'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getwarpedblendarea"}'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.file.delete"}'
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.file.list"}'
  params: []

# --- Warp ---
- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.file.delete"}'
  params:
    - name: filename
      type: string

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.file.list"}'
  params: []

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Four Corners
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.fourcorners.getscaledcorners"}'
  params:
    - name: resolution
      type: object
      description: '{x: int, y: int}'
  description: Returns corners scaled to the given resolution.

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.warpscaledpoints"}'
  params:
    - name: points
      type: array
      description: Array of {X: float, Y: float}
    - name: resolution
      type: object
      description: '{X: float, Y: float}'
  description: Returns warped equivalents of the given points.

- id: image_processing_warpgrid_getgrid
  label: Get Warp Grid
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getgrid"}'
  params: []
  description: Returns grid points as normalized and relative [{x: float, y: float}].

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getgridsize"}'
  params: []
  description: Returns {x: int, y: int}.

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getscaledgrid"}'
  params:
    - name: resolution
      type: object
      description: '{x: int, y: int}'

# --- Test patterns ---
- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.list"}'
  params: []
  description: Returns patterns [{name, location, id, above, internal, properties}].

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.setproperties"}'
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of {key, value}

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.file.list"}'
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.file.delete"}'
  params:
    - name: filename
      type: string

# --- Key dispatcher ---
- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendpressevent"}'
  params:
    - name: key
      type: string
      description: 'Key enum (same set as sendclickevent: RC_*, KP_*)'

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendreleaseevent"}'
  params:
    - name: key
      type: string
      description: 'Key enum (same set as sendclickevent: RC_*, KP_*)'

# --- LED ---
- id: led_activity
  label: Activate LEDs
  kind: action
  command: '{"jsonrpc": "2.0", "method": "led.activity"}'
  params: []
  description: Activates LEDs when enabled and restarts the LED timeout counter.

- id: led_list
  label: List LEDs
  kind: query
  command: '{"jsonrpc": "2.0", "method": "led.list"}'
  params: []

# --- Light measurement ---
- id: lightmeasurement_getlightoutput
  label: Get Light Output
  kind: query
  command: '{"jsonrpc": "2.0", "method": "lightmeasurement.getlightoutput"}'
  params: []
  description: Returns lumens (int).

# --- Network ---
- id: network_list
  label: List Network Devices
  kind: query
  command: '{"jsonrpc": "2.0", "method": "network.list"}'
  params: []
  description: Returns logical device ids e.g. ["wired1", "wifi1"].

# --- Notification management ---
- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.dismiss"}'
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: 'Enum: "NONE" "OK" "CANCEL" "IGNORE" "YES" "NO" "SUPPRESS"'

- id: notification_list
  label: List Active Notifications
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.list"}'
  params: []
  description: Returns notifications [{severity, id, code, timestamp, message, timeout, actions}].

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.listsuppressed"}'
  params: []

- id: notification_log
  label: Get Notification Log
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.log"}'
  params:
    - name: minimumseverity
      type: string
      description: 'Enum: "INFO" "CAUTION" "WARNING" "ERROR" "CRITICAL"'
    - name: start
      type: integer
    - name: count
      type: integer

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.suppress"}'
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.unsuppress"}'
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.unsuppressall"}'
  params: []

# --- Optics: focus ---
- id: optics_focus_addlocation
  label: Add Focus Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.addlocation"}'
  params:
    - name: location
      type: string
  description: Add current position to saved locations.

- id: optics_focus_calibrate
  label: Calibrate Focus
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.calibrate"}'
  params: []

- id: optics_focus_runforwardtime
  label: Focus Forward Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runforwardtime"}'
  params:
    - name: milliseconds
      type: integer
  description: Run forward for X milliseconds.

- id: optics_focus_runreversetime
  label: Focus Reverse Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runreversetime"}'
  params:
    - name: milliseconds
      type: integer
  description: Run reverse for X milliseconds.

- id: optics_focus_setlocation
  label: Set Focus Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.setlocation"}'
  params:
    - name: location
      type: string

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stepforward"}'
  params: []

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stepreverse"}'
  params: []

# --- Optics: zoom ---
- id: optics_zoom_addlocation
  label: Add Zoom Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.addlocation"}'
  params:
    - name: location
      type: string

- id: optics_zoom_calibrate
  label: Calibrate Zoom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.calibrate"}'
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Forward Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runforwardtime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_runreversetime
  label: Zoom Reverse Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runreversetime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_setlocation
  label: Set Zoom Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.setlocation"}'
  params:
    - name: location
      type: string

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stepforward"}'
  params: []

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stepreverse"}'
  params: []

# --- Optics: lensshift horizontal (runforward/reverse/stop/step/calibrate/location) ---
- id: optics_lensshift_horizontal_addlocation
  label: Add Horizontal Lens Shift Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.addlocation"}'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_calibrate
  label: Calibrate Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.calibrate"}'
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Horizontal Lens Shift Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforward"}'
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Horizontal Lens Shift Forward Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforwardtime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_runreverse
  label: Horizontal Lens Shift Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreverse"}'
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Horizontal Lens Shift Reverse Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreversetime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_setlocation
  label: Set Horizontal Lens Shift Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.setlocation"}'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_stepforward
  label: Horizontal Lens Shift Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepforward"}'
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Horizontal Lens Shift Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepreverse"}'
  params: []

- id: optics_lensshift_horizontal_stop
  label: Horizontal Lens Shift Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stop"}'
  params: []

# --- Optics: lensshift vertical (mirror of horizontal) ---
- id: optics_lensshift_vertical_addlocation
  label: Add Vertical Lens Shift Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.addlocation"}'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_calibrate
  label: Calibrate Vertical Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.calibrate"}'
  params: []

- id: optics_lensshift_vertical_runforward
  label: Vertical Lens Shift Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforward"}'
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Vertical Lens Shift Forward Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforwardtime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_runreverse
  label: Vertical Lens Shift Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreverse"}'
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Vertical Lens Shift Reverse Timed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreversetime"}'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_setlocation
  label: Set Vertical Lens Shift Location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.setlocation"}'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_stepforward
  label: Vertical Lens Shift Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepforward"}'
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Vertical Lens Shift Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepreverse"}'
  params: []

- id: optics_lensshift_vertical_stop
  label: Vertical Lens Shift Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stop"}'
  params: []

# --- Optics: shutter/lens misc ---
- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: '{"jsonrpc": "2.0", "method": "optics.shutter.getobjectpath"}'
  params: []
  description: Returns path string of shutter motor object.

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: '{"jsonrpc": "2.0", "method": "optics.getvalidlensids"}'
  params: []
  description: Returns lensids mapping [{key, value:{0:int, 1:string}}].

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.setlensid"}'
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

# --- Peripheral frame: horizontal ---
- id: peripheral_frame_horizontal_calibrate
  label: Calibrate Horizontal Frame
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.calibrate"}'
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Horizontal Frame Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runforward"}'
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Horizontal Frame Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runreverse"}'
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Horizontal Frame Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepforward"}'
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Horizontal Frame Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepreverse"}'
  params: []

- id: peripheral_frame_horizontal_stop
  label: Horizontal Frame Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stop"}'
  params: []

# --- Peripheral frame: vertical ---
- id: peripheral_frame_vertical_calibrate
  label: Calibrate Vertical Frame
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.calibrate"}'
  params: []

- id: peripheral_frame_vertical_runforward
  label: Vertical Frame Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.runforward"}'
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Vertical Frame Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.runreverse"}'
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Vertical Frame Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepforward"}'
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Vertical Frame Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepreverse"}'
  params: []

- id: peripheral_frame_vertical_stop
  label: Vertical Frame Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stop"}'
  params: []

# --- Peripheral frame: rotation ---
- id: peripheral_frame_rotation_calibrate
  label: Calibrate Frame Rotation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.calibrate"}'
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.runforward"}'
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.runreverse"}'
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation Step Forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepforward"}'
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation Step Reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepreverse"}'
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame Rotation Stop
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stop"}'
  params: []

# --- Remote control ---
- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "remotecontrol.listsensors"}'
  params: []
  description: Returns object names of the IR sensors.

# --- Statistics ---
- id: statistics_listcounters
  label: List Counters
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.listcounters"}'
  params: []
  description: Returns [{name, value, unit}].

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserruntime.getname"}'
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserruntime.getunit"}'
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserstrikes.getname"}'
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserstrikes.getunit"}'
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.projectorruntime.getname"}'
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.projectorruntime.getunit"}'
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.systemtime.getname"}'
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.systemtime.getunit"}'
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.uptime.getname"}'
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.uptime.getunit"}'
  params: []

# --- System ---
- id: system_activity
  label: Signal User Activity
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.activity"}'
  params: []
  description: Resets timeout countdown timers.

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getboardlist"}'
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getboardinfo"}'
  params:
    - name: boardname
      type: string

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getmissingboardlist"}'
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getmoduleinfo"}'
  params:
    - name: boardname
      type: string

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getdeviceinfo"}'
  params:
    - name: boardname
      type: string
  description: DEPRECATED. Use GetBoardInfo instead.

- id: system_getidentification
  label: Get Identification
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getidentification"}'
  params:
    - name: identification
      type: string
  description: Returns {identification, value}.

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getidentifications"}'
  params: []
  description: Returns [{key, value}].

- id: system_getsystemdate
  label: Get System Date
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getsystemdate"}'
  params: []
  description: Returns UTC date {year, month, day, hour, minute, second}.

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.listresetdomains"}'
  params: []
  description: 'Returns enum list: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx.'

- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get Flex Brightness Code
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.getmaximumlightoutputcode"}'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
  description: Returns {lightoutput, signature, code}.

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set Flex Brightness Maximum Light Output
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutput"}'
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set Flex Brightness Code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutputcode"}'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
  description: Returns {lightoutput, signature, code}.

# --- UI settings ---
- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.list"}'
  params: []
  description: Returns [{key, value}].

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.keys"}'
  params: []

- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.get"}'
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.settings.set"}'
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.settings.remove"}'
  params:
    - name: key
      type: string

- id: ui_settings_geticons
  label: Get UI Icons
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.geticons"}'
  params:
    - name: category
      type: string
      description: 'Enum: "Source" "Connector" "TestPattern"'

- id: ui_settings_getfonticons
  label: Get UI Font Icons
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.getfonticons"}'
  params:
    - name: category
      type: string
      description: 'Enum: "Source" "Connector" "TestPattern"'

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (Deprecated)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.togglestealthmode"}'
  params: []
  description: DEPRECATED.

# --- File transfer HTTP endpoints (HTTP POST upload / GET download) ---
- id: firmware_transfer
  label: Upload Firmware File
  kind: action
  command: 'curl -F file=@firmware.dat http://{host}/api/firmware/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address (e.g. 192.168.1.100)
    - name: file
      type: string
      description: Path to firmware.dat
  description: 'HTTP POST file upload. Example: curl -F file=@firmware.dat http://192.168.1.100/api/firmware/transfer'

- id: image_connector_edid_transfer
  label: Upload/Download EDID File
  kind: action
  command: 'curl -F file=@edid.dat http://{host}/api/image/connector/edid/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string
  description: 'Upload: curl -F file=@edid.dat http://192.168.1.100/api/image/connector/edid/transfer. Download: curl -O -J http://192.168.1.100/api/image/connector/edid/transfer'

- id: image_processing_blacklevel_file_transfer
  label: Upload/Download Black Level File
  kind: action
  command: 'curl -F file=@blacklevel.dat http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string

- id: image_processing_blend_file_transfer
  label: Upload/Download Blend File
  kind: action
  command: 'curl -F file=@blend.dat http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string

- id: image_processing_warp_file_transfer
  label: Upload/Download Warp File
  kind: action
  command: 'curl -F file=@warp.dat http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string

- id: image_testpattern_file_transfer
  label: Upload/Download Test Pattern File
  kind: action
  command: 'curl -F file=@testpattern.dat http://{host}/api/image/testpattern/file/transfer'
  params:
    - name: host
      type: string
    - name: file
      type: string

- id: notification_logger_transfer
  label: Download Notification Log
  kind: query
  command: 'curl -O -J http://{host}/api/notification/logger/transfer'
  params:
    - name: host
      type: string
  description: Download-only HTTP GET endpoint.
```

## Feedbacks
```yaml
# ============ Existing entries (preserved) ============
- id: system_state
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "error"]
  description: |
    Query: property.get system.state
    Notification: property.changed with system.state value

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  description: |
    Query: property.get illumination.state
    Notification: property.changed with illumination.state value

- id: illumination_sources_laser_power
  type: float
  description: |
    Laser power in percent (0-100). Query property.get illumination.sources.laser.power
    Min: illumination.sources.laser.minpower, Max: illumination.sources.laser.maxpower

- id: active_source
  type: string
  description: |
    Currently active source name. Query: property.get image.window.main.source
    Example values: "DisplayPort 1", "HDMI", "DVI 1"

- id: connector_detected_signal
  type: object
  description: |
    Signal info for a connector. Query: property.get image.connector.{name}.detectedsignal
    Contains: active (bool), name, resolution, frequency, pixel_rate, scan, color_space, etc.

- id: environment_temperatures
  type: object
  description: |
    All temperature sensors. Returns key-value pairs of sensor name to Celsius value.
    Query: environment.getcontrolblocks with valuetype "Temperature"

- id: environment_fan_speeds
  type: object
  description: |
    All fan speed sensors. Returns key-value pairs of fan name to RPM.
    Query: environment.getcontrolblocks with valuetype "Speed"

- id: environment_alarmstate
  type: enum
  values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
  description: Query: property.get environment.alarmstate

- id: network_lan_state
  type: enum
  values: ["CONNECTED", "DISCONNECTED"]
  description: Query: property.get network.device.lan.state

- id: optics_shutter_position
  type: enum
  values: ["Open", "Closed"]
  description: Query: property.get optics.shutter.position

- id: image_brightness
  type: float
  description: |
    Image brightness offset, normalized. Range -1 to 1, default 0.
    Query: property.get image.brightness

- id: image_contrast
  type: float
  description: |
    Image contrast/gain, normalized. Range 0 to 2, default 1.
    Query: property.get image.contrast

- id: image_saturation
  type: float
  description: |
    Image color saturation, normalized. Range 0 to 2, default 1.
    Query: property.get image.saturation

- id: image_sharpness
  type: integer
  description: |
    Image sharpness. Range -2 to 8.
    Query: property.get image.sharpness

- id: image_gamma
  type: float
  description: |
    Image gamma. Range 1 to 3, default 2.2.
    Query: property.get image.gamma

- id: ui_access_enduser
  type: boolean
  description: Whether end user access privileges are available

- id: ui_access_poweruser
  type: boolean
  description: Whether power user access privileges are available

- id: notification_emitted
  type: object
  description: |
    Unsolicited notification. method: "notification.emitted"
    Contains: severity, id, code, timestamp, message, timeout, actions

- id: modelupdated
  type: object
  description: |
    Signal when objects appear/disappear. Subscribe: signal.subscribe with "modelupdated"
    Contains: object (string), newobject (bool), accesslevel

# ============ Added in upgrade pass ============
- id: system_modelname
  type: string
  description: Query property.get system.modelname

- id: system_familyname
  type: string
  description: Query property.get system.familyname

- id: system_serialnumber
  type: string
  description: Query property.get system.serialnumber

- id: system_articlenumber
  type: string
  description: Query property.get system.articlenumber

- id: system_firmwareversion
  type: string
  description: Query property.get system.firmwareversion (or firmware.firmwareversion)

- id: system_initialstate
  type: enum
  values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
  description: State to transition to when unit started. Query property.get system.initialstate

- id: system_eco_available
  type: boolean
  description: True if eco state available. Query property.get system.eco.available

- id: system_standby_available
  type: boolean
  description: True if standby state available. Query property.get system.standby.available

- id: illumination_sources_laser_maxpower
  type: float
  description: Max laser power percent. Query property.get illumination.sources.laser.maxpower

- id: illumination_sources_laser_minpower
  type: float
  description: Min laser power percent. Query property.get illumination.sources.laser.minpower

- id: illumination_sources_laser_ispowerlimited
  type: boolean
  description: Whether power currently limited. Query property.get illumination.sources.laser.ispowerlimited

- id: illumination_sources_laser_powerlimitreason
  type: string
  description: Reason power limited. Query property.get illumination.sources.laser.powerlimitreason

- id: illumination_clo_availability
  type: enum
  values: ["Available", "SensorUnavailable", "PendingWarmup", "Unavailable", "Unknown"]
  description: Query property.get illumination.clo.availability

- id: illumination_clo_state
  type: enum
  values: ["Ok", "TooDim", "TooBright"]
  description: Query property.get illumination.clo.state

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
  description: Query property.get image.orientation

- id: image_intensity
  type: float
  description: 'Range 0-1, step 0.1, precision 0.01. Query property.get image.intensity'

- id: image_display_displaymode
  type: enum
  values: ["Mono", "AutoStereo", "ActiveStereo", "NightVision", "IGPixelShift"]
  description: Query property.get image.display.displaymode

- id: image_window_main_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
  description: Query property.get image.window.main.scalingmode

- id: image_testpattern_selected
  type: string
  description: Unique id of selected pattern. Query property.get image.testpattern.selected

- id: image_testpattern_show
  type: boolean
  description: Query property.get image.testpattern.show

- id: optics_zoom_position
  type: integer
  description: Query property.get optics.zoom.position

- id: optics_zoom_state
  type: enum
  values: ["Stopped", "Running", "Calibrating", "Homing"]
  description: Query property.get optics.zoom.state

- id: optics_focus_position
  type: integer
  description: Query property.get optics.focus.position

- id: optics_focus_state
  type: enum
  values: ["Stopped", "Running", "Calibrating", "Homing"]
  description: Query property.get optics.focus.state

- id: optics_lensshift_horizontal_position
  type: integer
  description: Query property.get optics.lensshift.horizontal.position

- id: optics_lensshift_vertical_position
  type: integer
  description: Query property.get optics.lensshift.vertical.position

- id: optics_lenspresent
  type: boolean
  description: Query property.get optics.lenspresent

- id: optics_filteravailable
  type: boolean
  description: Query property.get optics.filteravailable

- id: remotecontrol_address
  type: integer
  description: 'Remote control address 1..31. Query property.get remotecontrol.address'

- id: screen_luminance
  type: float
  description: 'Max luminance cd/m2, range 50-10000. Query property.get screen.luminance'

- id: screen_hdrboost
  type: float
  description: 'HDR intensity, range 0.8-1.2. Query property.get screen.hdrboost'

- id: network_hostname
  type: string
  description: Query property.get network.hostname

- id: network_device_lan_hwaddress
  type: string
  description: Active MAC address. Query property.get network.device.lan.hwaddress

- id: network_device_lan_ip4config
  type: object
  description: '{Address, Mask, Gateway, NameServers}. Query property.get network.device.lan.ip4config'

- id: ui_stealthmode
  type: enum
  values: ["Off", "On"]
  description: Query property.get ui.stealthmode

- id: ui_backlight_state
  type: enum
  values: ["Off", "On", "Auto"]
  description: Query property.get ui.backlight.state

- id: firmware_version
  type: string
  description: Query property.get firmware.firmwareversion

- id: gsm_available
  type: boolean
  description: GSM card present. Query property.get gsm.available
```

## Variables
```yaml
# ============ Existing entries (preserved) ============
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0

- id: image_contrast
  type: float
  range: [0, 2]
  default: 1

- id: image_saturation
  type: float
  range: [0, 2]
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]
  default: 0

- id: image_gamma
  type: float
  range: [1, 3]
  default: 2.2

- id: illumination_sources_laser_power
  type: float
  range: [0, 100]
  description: Laser power percentage

- id: optics_shutter_target
  type: enum
  values: ["Open", "Closed"]

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: image_window_main_source
  type: string
  description: Active source name (e.g. "HDMI", "DisplayPort 1")

- id: image_window_main_position
  type: object
  description: Window position {x, y}

- id: image_window_main_size
  type: object
  description: Window size {width, height}

- id: image_orientation
  type: enum
  values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_blend_file_enable
  type: boolean

- id: screen_hdrboost
  type: float
  range: [0.8, 1.2]

- id: ui_backlight_state
  type: enum
  values: ["Off", "On", "Auto"]

- id: ui_stealthmode
  type: enum
  values: ["Off", "On"]

# ============ Added in upgrade pass ============
- id: image_intensity
  type: float
  range: [0, 1]
  default: 0

- id: image_window_main_scalingmode
  type: enum
  values: ["Fill", "OneToOne", "FillScreen", "Stretch"]

- id: image_testpattern_show
  type: boolean

- id: image_testpattern_selected
  type: string

- id: image_display_desireddisplaymode
  type: enum
  values: ["Mono", "AutoStereo", "ActiveStereo", "NightVision", "IGPixelShift"]

- id: illumination_clo_enable
  type: boolean
  description: Constant light output enabled

- id: illumination_clo_scale
  type: float
  description: Percentage to scale the setpoint by

- id: illumination_clo_setpoint
  type: float
  description: Target luminosity of the light source

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_blend_file_selected
  type: string
  description: Array of selected blend files

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: image_processing_blend_scurve
  type: float
  range: [1, 4]

- id: screen_luminance
  type: float
  range: [50, 10000]

- id: remotecontrol_address
  type: integer
  range: [1, 31]

- id: remotecontrol_broadcastaddress
  type: integer
  range: [0, 1]

- id: remotecontrol_sensors_front_enable
  type: boolean

- id: remotecontrol_sensors_rear_enable
  type: boolean

- id: remotecontrol_sensors_side_enable
  type: boolean

- id: network_device_lan_configuration
  type: enum
  values: ["AUTO", "MANUAL"]

- id: network_device_lan_ip4configmanual
  type: object
  description: '{Address, Mask, Gateway, NameServers}'

- id: network_device_lan_ip6configmanual
  type: object
  description: '{Address, Prefix, Gateway, NameServers}'

- id: ui_backlight_timeout
  type: integer
  description: Seconds before LCD backlight switches off

- id: system_eco_enable
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_standby_timeout_duration
  type: integer

- id: system_ready_timeout_duration
  type: integer

- id: system_on_timeout_duration
  type: integer

- id: system_error_timeout_duration
  type: integer

- id: image_color_p7_custom_whitetemperature
  type: integer
  range: [3200, 13000]

- id: image_blackcontentdetection_threshold
  type: integer
  range: [0, 255]
  description: DEPRECATED

- id: dmx_artnet
  type: boolean

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_mode
  type: string
```

## Events
```yaml
# ============ Existing entries (preserved) ============
- id: property_changed
  description: |
    method: "property.changed"
    params: { "property": [ {"objectname.propertyname": value}, ... ] }
    Fired when subscribed properties change.

- id: signal_callback
  description: |
    method: "signal.callback"
    params: { "signal": [ {"objectname.signalname": { args } }, ... ] }
    Fired for subscribed signals.

- id: modelupdated
  description: |
    Fired when objects appear or disappear. Params: object (string), newobject (bool), accesslevel

- id: notification_emitted
  description: |
    Fired for system notifications. Params: severity, id, code, timestamp, message, actions

- id: notification_dismissed
  description: |
    Fired when notification is dismissed. Params: id, response

- id: system_identificationchanged
  description: Fired when system identification changes

- id: system_performed
  description: |
    Fired when reset domain completes. Params: domains (array of completed domains)

- id: image_processing_warpgrid_changed
  description: Fired when warp grid changes

- id: image_testpattern_added
  description: Fired when custom test pattern is added

- id: image_testpattern_removed
  description: Fired when custom test pattern is removed

# ============ Added in upgrade pass ============
- id: image_processing_warpgrid_gridchanged
  description: |
    signal.subscribe "image.processing.warpgrid.gridchanged". Params: grid [{x: float, y: float}]

- id: image_testpattern_changed
  description: Fired when a test pattern changes. Params: id, properties.

- id: image_connector_edid_listchanged
  description: |
    Per-connector EDID list changed signals documented:
    image.connector.l1displayport.edid.listchanged, image.connector.l1hdbaset1.edid.listchanged,
    image.connector.l1hdbaset2.edid.listchanged, image.connector.l1hdmi.edid.listchanged,
    image.connector.l2displayporta.edid.listchanged, image.connector.l2displayportb.edid.listchanged,
    image.connector.l2displayportc.edid.listchanged, image.connector.l2displayportd.edid.listchanged

- id: image_processing_warp_file_listchanged
  description: signal.subscribe "image.processing.warp.file.listchanged"

- id: image_processing_blend_file_listchanged
  description: signal.subscribe "image.processing.blend.file.listchanged"

- id: image_processing_blacklevel_file_listchanged
  description: signal.subscribe "image.processing.blacklevel.file.listchanged"

- id: image_testpattern_file_listchanged
  description: signal.subscribe "image.testpattern.file.listchanged"

- id: network_added
  description: Raised when a new device added. Params: id (logical device id).

- id: network_removed
  description: Raised when a device removed. Params: id.

- id: system_license_licensechanged
  description: Fired when license changes.

- id: ui_settings_added
  description: Fired when a new key/value pair added. Params: key, value.

- id: ui_settings_changed
  description: Fired when a key value updated. Params: key, value.

- id: ui_settings_removed
  description: Fired when a key removed. Params: key.
```

## Macros
```yaml
# ============ Existing entries (preserved) ============
- id: select_source
  label: Select Input Source
  steps:
    - action: image_source_list
      capture: sources
    - action: property_set
      params:
        property: image.window.main.source
        value: "{{source_name}}"  # e.g. "DisplayPort 1", "HDMI"

- id: wake_from_eco
  label: Wake from ECO Mode
  description: |
    ECO mode requires special wake procedure:
    - Send Wake-on-LAN with projector MAC address, OR
    - Use remote control power button, OR
    - Use keypad power button, OR
    - Send ":POWR1\r" on serial port

- id: enable_warp
  label: Enable Warp with File
  steps:
    - action: property_set
      params: {property: image.processing.warp.enable, value: true}
    - action: property_set
      params: {property: image.processing.warp.file.selected, value: "warp.xml"}
    - action: property_set
      params: {property: image.processing.warp.file.enable, value: true}

- id: enable_blend
  label: Enable Blend with File
  steps:
    - action: property_set
      params: {property: image.processing.blend.file.selected, value: "mask.png"}
    - action: property_set
      params: {property: image.processing.blend.file.enable, value: true}

# ============ Added in upgrade pass ============
- id: enable_blacklevel
  label: Enable Black Level with File
  steps:
    - action: property_set
      params: {property: image.processing.blacklevel.file.selected, value: "blacklevel.png"}
    - action: property_set
      params: {property: image.processing.blacklevel.file.enable, value: true}
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      Do not power off during "conditioning" state - wait for "on" state.
      Docs: "If the projector already is on, or if it's in transition between states, nothing will happen."
  - description: |
      Verify projector state before issuing power commands.
      Docs: "It's good practice to verify that the projector state is either standby or ready before issuing the power on command."
  - description: |
      Best practice for property.set: wait for confirmation before setting same property again.
      Docs: "It is best practice to wait for the confirmation of the property.set before setting the same property again."
  - description: |
      ECO mode wake requires specific procedure (WoL, remote, keypad, or serial :POWR1 command).
# UNRESOLVED: voltage/power specifications, fault behavior, error recovery sequences not stated
```

## Notes
The Barco LCD VP uses JSON-RPC 2.0 as its control protocol, tunneled over either TCP (port 9090) or RS-232 serial. The API is object-oriented with dot-notation (e.g. `image.brightness`, `system.state`). Properties support get/set/subscribe; Methods are invoked directly; Signals provide unsolicited notifications. Authentication is optional and only required for elevated access levels beyond normal end-user. The pass code format is not disclosed in this document — it must be obtained from Barco documentation or the device administrator.

File upload/download uses HTTP POST/GET to `/api/<endpoint>/file/transfer` (e.g. `/api/image/processing/warp/file/transfer`, `/api/firmware/transfer`, `/api/image/connector/edid/transfer`, `/api/image/testpattern/file/transfer`, `/api/notification/logger/transfer`). Example upload: `curl -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer`. The HTTP port is not stated in the source (curl examples omit it, implying the standard HTTP port).

The ECO-mode serial wake command is the ASCII literal `:POWR1\r` (documented verbatim in the ECO mode section).

<!-- UNRESOLVED: actual authentication pass code format/structure not stated in source -->
<!-- UNRESOLVED: specific model variant list (this applies to entire LCD VP family) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage, current, power specifications not stated -->
<!-- UNRESOLVED: fault behavior / error recovery sequences not stated -->
<!-- UNRESOLVED: HTTP file-transfer TCP port not stated in source -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T04:30:31.328Z
last_checked_at: 2026-07-13T06:40:28.190Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-13T06:40:28.190Z
matched_actions: 174
action_count: 174
confidence: medium
summary: "All 174 spec actions map to literal JSON-RPC methods or HTTP file endpoints in source after removal of the 4 phantom duration params on runforward/runreverse; transport params (port 9090, 19200/8/N/1) verbatim-supported. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants not enumerated in source"
- "firmware version compatibility not stated"
- "HTTP file-transfer TCP port not stated in source (curl examples omit port)"
- "voltage/power specifications, fault behavior, error recovery sequences not stated"
- "actual authentication pass code format/structure not stated in source"
- "specific model variant list (this applies to entire LCD VP family)"
- "voltage, current, power specifications not stated"
- "fault behavior / error recovery sequences not stated"
- "HTTP file-transfer TCP port not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
