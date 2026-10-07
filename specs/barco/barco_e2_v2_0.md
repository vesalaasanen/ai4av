---
spec_id: admin/barco-e2-v2-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco E2 v2.0 Control Spec"
manufacturer: Barco
model_family: "E2 v2.0"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "E2 v2.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - barco.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.barco.com/manuals/R5919184/index
  - https://www.barco.com/en/support/e2-gen-2
  - https://www.barco.com/manuals/R5919184/index.html
  - "https://applicationmarket.crestron.com/content/Help/Barco/Barco_JSON-RPC_for_Event_Master_processors_(9.2).pdf"
retrieved_at: 2026-08-16T12:45:52.777Z
last_checked_at: 2026-10-01T07:20:36.944Z
generated_at: 2026-10-01T07:20:36.944Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model/family naming and firmware version compatibility not stated. Source is a generic Pulse \"RS232 and Network Command Catalog\"; model \"E2 v2.0\" supplied by operator."
  - "full property catalogue (hundreds) not enumerated; see source \"Properties\" section."
  - "many more RW properties in source (dmx.*, image.color.p7.custom.*,"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "exact product model line/family not confirmed in source text (generic Pulse catalog)."
  - "protocol version / Pulse API version number not stated."
  - "binary/framing details for JSON-RPC over RS-232 not specified (assumed newline-delimited)."
  - "default authentication pass code value (98765 is an example only)."
verification:
  verdict: verified
  checked_at: 2026-10-01T07:20:36.944Z
  matched_actions: 213
  action_count: 213
  confidence: medium
  summary: "All 213 spec action literals (JSON-RPC methods, HTTP file endpoints, serial :POWR1) appear verbatim in the source Methods/Files sections. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Barco E2 v2.0 Control Spec

## Summary
Barco E2 v2.0 Pulse-based projector. Control via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial, plus HTTP file endpoints for warp/blend/blacklevel/EDID/firmware/testpattern transfer. Supports power, source selection, illumination (laser), image, optics (zoom/focus/lens shift/shutter), warping, blending, black level, environment monitoring, notifications, and UI control.

<!-- UNRESOLVED: exact model/family naming and firmware version compatibility not stated. Source is a generic Pulse "RS232 and Network Command Catalog"; model "E2 v2.0" supplied by operator. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # Pulse services TCP port
  base_url: "http://{host}/api"  # HTTP file endpoints
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # Source: authentication optional. Normal end-user access skips auth; higher
  # access levels require an `authenticate` request carrying a secret pass code.
  type: UNRESOLVED  # source does not state this (was inferred passcode: source documents authenticate method with code param)
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff
  - queryable     # inferred: property.get across many properties
  - levelable     # inferred: image.brightness, image.contrast, illumination power
  - routable      # inferred: image.window.main.source selection
```

## Actions
```yaml
# All actions are JSON-RPC 2.0 method invocations. Payload verbatim from source:
#   { "jsonrpc": "2.0", "method": "<method>", "params": {...}, "id": <id> }
# `command:` holds the literal method name (the JSON-RPC opcode). Params shown
# where source documents them. HTTP file endpoints listed separately with curl.

# ===== Authentication =====
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: "authenticate"
  params:
    - name: code
      type: integer
      description: Secret pass code (e.g. 98765)

# ===== Core JSON-RPC service methods =====
- id: property_set
  label: Set Property
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: value
      type: any
      description: Value to set
- id: property_get
  label: Get Property
  kind: query
  command: "property.get"
  params:
    - name: property
      type: string
      description: Property path (or array of paths)
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: "property.subscribe"
  params:
    - name: property
      type: string
      description: Property path (or array of paths)
- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: "property.unsubscribe"
  params:
    - name: property
      type: string
      description: Property path (or array of paths)
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: "signal.subscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names)
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: "signal.unsubscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names)
- id: introspect
  label: Introspect Object
  kind: query
  command: "introspect"
  params:
    - name: object
      type: string
      description: Object name (dot notation); empty = all
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level)

# ===== Power / system state =====
- id: system_poweron
  label: Power On
  kind: action
  command: "system.poweron"
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  command: "system.poweroff"
  params: []
- id: system_gotoeco
  label: Go to ECO state
  kind: action
  command: "system.gotoeco"
  params: []
- id: system_gotoready
  label: Go to Ready state
  kind: action
  command: "system.gotoready"
  params: []
- id: system_reboot
  label: Reboot (powers off first)
  kind: action
  command: "system.reboot"
  params: []
- id: system_reset
  label: Reset selected domains
  kind: action
  command: "system.reset"
  params:
    - name: domains
      type: array
      description: >-
        Enum values: ImageConnector, ImageSource, ImageFeatures, ImageRealColor,
        ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo,
        ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics,
        Illumination, Network, Screen, System, LightMeasurement, Dmx
- id: system_resetall
  label: Reset all domains
  kind: action
  command: "system.resetall"
  params: []
- id: system_activity
  label: Signal user activity (reset timeout timers)
  kind: action
  command: "system.activity"
  params: []
- id: system_getidentification
  label: Get identification
  kind: query
  command: "system.getidentification"
  params: []
- id: system_getidentifications
  label: Get all identifications
  kind: query
  command: "system.getidentifications"
  params: []
- id: system_getsystemdate
  label: Get system date (UTC)
  kind: query
  command: "system.getsystemdate"
  params: []
- id: system_boards_getboardinfo
  label: Get board properties
  kind: query
  command: "system.boards.getboardinfo"
  params:
    - name: boardname
      type: string
- id: system_boards_getboardlist
  label: Get board list
  kind: query
  command: "system.boards.getboardlist"
  params: []
- id: system_boards_getdeviceinfo
  label: Get device info (DEPRECATED, use getboardinfo)
  kind: query
  command: "system.boards.getdeviceinfo"
  params:
    - name: boardname
      type: string
- id: system_boards_getmissingboardlist
  label: Get missing board list
  kind: query
  command: "system.boards.getmissingboardlist"
  params: []
- id: system_boards_getmoduleinfo
  label: Get module info
  kind: query
  command: "system.boards.getmoduleinfo"
  params:
    - name: boardname
      type: string
- id: system_listresetdomains
  label: List available reset domains
  kind: query
  command: "system.listresetdomains"
  params: []
- id: system_license_flexbrightness_getmaximumlightoutputcode
  label: Get max light output code
  kind: query
  command: "system.license.option.flexbrightness.getmaximumlightoutputcode"
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
- id: system_license_flexbrightness_setmaximumlightoutput
  label: Set max light output
  kind: action
  command: "system.license.option.flexbrightness.setmaximumlightoutput"
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer
- id: system_license_flexbrightness_setmaximumlightoutputcode
  label: Set max light output code
  kind: action
  command: "system.license.option.flexbrightness.setmaximumlightoutputcode"
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string

# ===== Sources / connectors =====
- id: image_source_list
  label: List available sources
  kind: query
  command: "image.source.list"
  params: []
- id: image_connector_list
  label: List available connectors
  kind: query
  command: "image.connector.list"
  params: []
- id: image_window_list
  label: List windows
  kind: query
  command: "image.window.list"
  params: []

# Per-source listconnectors methods (each documented as a distinct row):
- id: image_source_l1displayport_listconnectors
  label: List connectors - source l1displayport
  kind: query
  command: "image.source.l1displayport.listconnectors"
  params: []
- id: image_source_l1hdbaset1_listconnectors
  label: List connectors - source l1hdbaset1
  kind: query
  command: "image.source.l1hdbaset1.listconnectors"
  params: []
- id: image_source_l1hdbaset2_listconnectors
  label: List connectors - source l1hdbaset2
  kind: query
  command: "image.source.l1hdbaset2.listconnectors"
  params: []
- id: image_source_l1hdmi_listconnectors
  label: List connectors - source l1hdmi
  kind: query
  command: "image.source.l1hdmi.listconnectors"
  params: []
- id: image_source_l1quadsdi_listconnectors
  label: List connectors - source l1quadsdi
  kind: query
  command: "image.source.l1quadsdi.listconnectors"
  params: []
- id: image_source_l1sdia_listconnectors
  label: List connectors - source l1sdia
  kind: query
  command: "image.source.l1sdia.listconnectors"
  params: []
- id: image_source_l1sdib_listconnectors
  label: List connectors - source l1sdib
  kind: query
  command: "image.source.l1sdib.listconnectors"
  params: []
- id: image_source_l1sdic_listconnectors
  label: List connectors - source l1sdic
  kind: query
  command: "image.source.l1sdic.listconnectors"
  params: []
- id: image_source_l1sdid_listconnectors
  label: List connectors - source l1sdid
  kind: query
  command: "image.source.l1sdid.listconnectors"
  params: []
- id: image_source_l2displayporta_listconnectors
  label: List connectors - source l2displayporta
  kind: query
  command: "image.source.l2displayporta.listconnectors"
  params: []
- id: image_source_l2displayportb_listconnectors
  label: List connectors - source l2displayportb
  kind: query
  command: "image.source.l2displayportb.listconnectors"
  params: []
- id: image_source_l2displayportc_listconnectors
  label: List connectors - source l2displayportc
  kind: query
  command: "image.source.l2displayportc.listconnectors"
  params: []
- id: image_source_l2displayportd_listconnectors
  label: List connectors - source l2displayportd
  kind: query
  command: "image.source.l2displayportd.listconnectors"
  params: []
- id: image_source_l2dualdpab_listconnectors
  label: List connectors - source l2dualdpab
  kind: query
  command: "image.source.l2dualdpab.listconnectors"
  params: []
- id: image_source_l2dualdpac_listconnectors
  label: List connectors - source l2dualdpac
  kind: query
  command: "image.source.l2dualdpac.listconnectors"
  params: []
- id: image_source_l2dualdpbd_listconnectors
  label: List connectors - source l2dualdpbd
  kind: query
  command: "image.source.l2dualdpbd.listconnectors"
  params: []
- id: image_source_l2dualdpcd_listconnectors
  label: List connectors - source l2dualdpcd
  kind: query
  command: "image.source.l2dualdpcd.listconnectors"
  params: []
- id: image_source_l2dualheaddpac_listconnectors
  label: List connectors - source l2dualheaddpac
  kind: query
  command: "image.source.l2dualheaddpac.listconnectors"
  params: []
- id: image_source_l2dualheaddpbd_listconnectors
  label: List connectors - source l2dualheaddpbd
  kind: query
  command: "image.source.l2dualheaddpbd.listconnectors"
  params: []
- id: image_source_l2dualheaddualdpabcd_listconnectors
  label: List connectors - source l2dualheaddualdpabcd
  kind: query
  command: "image.source.l2dualheaddualdpabcd.listconnectors"
  params: []
- id: image_source_l2quadcolumndp_listconnectors
  label: List connectors - source l2quadcolumndp
  kind: query
  command: "image.source.l2quadcolumndp.listconnectors"
  params: []
- id: image_source_l2quaddp_listconnectors
  label: List connectors - source l2quaddp
  kind: query
  command: "image.source.l2quaddp.listconnectors"
  params: []

# Per-connector EDID list methods (each documented as a distinct row):
- id: image_connector_l1displayport_edid_list
  label: List EDIDs - connector l1displayport
  kind: query
  command: "image.connector.l1displayport.edid.list"
  params: []
- id: image_connector_l1hdbaset1_edid_list
  label: List EDIDs - connector l1hdbaset1
  kind: query
  command: "image.connector.l1hdbaset1.edid.list"
  params: []
- id: image_connector_l1hdbaset2_edid_list
  label: List EDIDs - connector l1hdbaset2
  kind: query
  command: "image.connector.l1hdbaset2.edid.list"
  params: []
- id: image_connector_l1hdmi_edid_list
  label: List EDIDs - connector l1hdmi
  kind: query
  command: "image.connector.l1hdmi.edid.list"
  params: []
- id: image_connector_l2displayporta_edid_list
  label: List EDIDs - connector l2displayporta
  kind: query
  command: "image.connector.l2displayporta.edid.list"
  params: []
- id: image_connector_l2displayportb_edid_list
  label: List EDIDs - connector l2displayportb
  kind: query
  command: "image.connector.l2displayportb.edid.list"
  params: []
- id: image_connector_l2displayportc_edid_list
  label: List EDIDs - connector l2displayportc
  kind: query
  command: "image.connector.l2displayportc.edid.list"
  params: []
- id: image_connector_l2displayportd_edid_list
  label: List EDIDs - connector l2displayportd
  kind: query
  command: "image.connector.l2displayportd.edid.list"
  params: []

# ===== Display / resolution / stereo =====
- id: image_display_listdisplaymodes
  label: List display modes
  kind: query
  command: "image.display.listdisplaymodes"
  params: []
- id: image_resolution_list
  label: List resolutions
  kind: query
  command: "image.resolution.list"
  params: []
- id: image_stereo_listdarktime
  label: List stereo darktime values (us)
  kind: query
  command: "image.stereo.listdarktime"
  params: []

# ===== Warp / blend / black level / grid =====
- id: blacklevel_basic_getblacklevelarea
  label: Get black level edges
  kind: query
  command: "image.processing.blacklevel.basicblacklevel.getblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float
- id: blacklevel_basic_getwarpedblacklevelarea
  label: Get black level edges (after warp)
  kind: query
  command: "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float
- id: blacklevel_file_delete
  label: Delete black level file
  kind: action
  command: "image.processing.blacklevel.file.delete"
  params:
    - name: filename
      type: string
- id: blacklevel_file_list
  label: List black level files
  kind: query
  command: "image.processing.blacklevel.file.list"
  params: []
- id: blend_basic_getblendarea
  label: Get blend edges
  kind: query
  command: "image.processing.blend.basicblend.getblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float
- id: blend_basic_getwarpedblendarea
  label: Get blend edges (after warp)
  kind: query
  command: "image.processing.blend.basicblend.getwarpedblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float
- id: blend_file_delete
  label: Delete blend file
  kind: action
  command: "image.processing.blend.file.delete"
  params:
    - name: filename
      type: string
- id: blend_file_list
  label: List blend files
  kind: query
  command: "image.processing.blend.file.list"
  params: []
- id: warp_file_delete
  label: Delete warp file
  kind: action
  command: "image.processing.warp.file.delete"
  params:
    - name: filename
      type: string
- id: warp_file_list
  label: List warp files
  kind: query
  command: "image.processing.warp.file.list"
  params: []
- id: warp_fourcorners_getscaledcorners
  label: Get four-corners scaled to resolution
  kind: query
  command: "image.processing.warp.fourcorners.getscaledcorners"
  params:
    - name: resolution
      type: object
      description: "{ x: int, y: int }"
- id: warp_warpscaledpoints
  label: Warp an array of points
  kind: query
  command: "image.processing.warp.warpscaledpoints"
  params:
    - name: points
      type: array
      description: Array of { X: float, Y: float }
    - name: resolution
      type: object
      description: "{ X: float, Y: float }"
- id: warpgrid_getgrid
  label: Get grid points (normalized/relative)
  kind: query
  command: "image.processing.warpgrid.getgrid"
  params: []
- id: warpgrid_getgridsize
  label: Get grid size
  kind: query
  command: "image.processing.warpgrid.getgridsize"
  params: []
- id: warpgrid_getscaledgrid
  label: Get grid scaled to resolution
  kind: query
  command: "image.processing.warpgrid.getscaledgrid"
  params:
    - name: resolution
      type: object
      description: "{ x: int, y: int }"

# ===== Test patterns =====
- id: testpattern_file_delete
  label: Delete test pattern file
  kind: action
  command: "image.testpattern.file.delete"
  params:
    - name: filename
      type: string
- id: testpattern_file_list
  label: List custom uploaded patterns
  kind: query
  command: "image.testpattern.file.list"
  params: []
- id: testpattern_list
  label: List available patterns
  kind: query
  command: "image.testpattern.list"
  params: []
- id: testpattern_setproperties
  label: Set pattern properties
  kind: action
  command: "image.testpattern.setproperties"
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of { key, value }

# ===== Color =====
- id: color_p7_custom_copypresettocustom
  label: Copy preset to custom
  kind: action
  command: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string
- id: color_p7_custom_resetpreset
  label: Reset preset to defaults
  kind: action
  command: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string
- id: color_p7_custom_resettonative
  label: Reset to native
  kind: action
  command: "image.color.p7.custom.resettonative"
  params: []
- id: color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: "image.color.rgbmode.nextrgbmode"
  params: []

# ===== DMX =====
- id: dmx_listchannels
  label: List DMX channel names
  kind: query
  command: "dmx.listchannels"
  params: []
- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: "dmx.listmodes"
  params: []

# ===== Environment =====
- id: environment_getalarminfo
  label: Get alarm info
  kind: query
  command: "environment.getalarminfo"
  params: []
- id: environment_getcontrolblocks
  label: Get control blocks (sensors)
  kind: query
  command: "environment.getcontrolblocks"
  params:
    - name: type
      type: string
      description: >-
        Enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: >-
        Enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude,
        Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay,
        Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison,
        Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance,
        Simulation, Constant, Manual, Range, Any

# ===== Firmware =====
- id: firmware_listcomponents
  label: List firmware component names
  kind: query
  command: "firmware.listcomponents"
  params: []
- id: firmware_listcomponentversionstatus
  label: List firmware components/versions/status
  kind: query
  command: "firmware.listcomponentversionstatus"
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule component upgrade at next reboot
  kind: action
  command: "firmware.schedulecomponentupgrade"
  params: []

# ===== Illumination =====
- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: "illumination.clo.engage"
  params: []
- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: "illumination.laser.getserialnumber"
  params: []

# ===== Key dispatcher (remote/keypad emulation) =====
- id: keydispatcher_sendclickevent
  label: Send key click (press+release)
  kind: action
  command: "keydispatcher.sendclickevent"
  params:
    - name: key
      type: string
      description: >-
        Enum: RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF,
        RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS,
        RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS,
        RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK,
        RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1..RC_0,
        RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN,
        KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER,
        KP_INPUT, KP_STANDBY
- id: keydispatcher_sendpressevent
  label: Send key press
  kind: action
  command: "keydispatcher.sendpressevent"
  params:
    - name: key
      type: string
      description: See keydispatcher_sendclickevent key enum
- id: keydispatcher_sendreleaseevent
  label: Send key release
  kind: action
  command: "keydispatcher.sendreleaseevent"
  params:
    - name: key
      type: string
      description: See keydispatcher_sendclickevent key enum

# ===== LED =====
- id: led_activity
  label: Activate LEDs (reset timeout)
  kind: action
  command: "led.activity"
  params: []
- id: led_list
  label: List LEDs
  kind: query
  command: "led.list"
  params: []

# ===== Light measurement =====
- id: lightmeasurement_getlightoutput
  label: Get light output (lumens)
  kind: query
  command: "lightmeasurement.getlightoutput"
  params: []

# ===== Network =====
- id: network_list
  label: List logical network devices
  kind: query
  command: "network.list"
  params: []

# ===== Notifications =====
- id: notification_dismiss
  label: Dismiss notification
  kind: action
  command: "notification.dismiss"
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: Enum: NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS
- id: notification_list
  label: List active notifications
  kind: query
  command: "notification.list"
  params: []
- id: notification_listsuppressed
  label: List suppressed notification codes
  kind: query
  command: "notification.listsuppressed"
  params: []
- id: notification_log
  label: List saved notifications
  kind: query
  command: "notification.log"
  params:
    - name: minimumseverity
      type: string
      description: Enum: INFO, CAUTION, WARNING, ERROR, CRITICAL
    - name: start
      type: integer
    - name: count
      type: integer
- id: notification_suppress
  label: Suppress notification code
  kind: action
  command: "notification.suppress"
  params:
    - name: code
      type: string
- id: notification_unsuppress
  label: Unsuppress notification code
  kind: action
  command: "notification.unsuppress"
  params:
    - name: code
      type: string
- id: notification_unsuppressall
  label: Unsuppress all notification codes
  kind: action
  command: "notification.unsuppressall"
  params: []

# ===== Optics - focus =====
- id: optics_focus_addlocation
  label: Focus - add current position to location
  kind: action
  command: "optics.focus.addlocation"
  params:
    - name: location
      type: string
- id: optics_focus_calibrate
  label: Focus - calibrate
  kind: action
  command: "optics.focus.calibrate"
  params: []
- id: optics_focus_runforward
  label: Focus - run forward
  kind: action
  command: "optics.focus.runforward"
  params: []
- id: optics_focus_runforwardtime
  label: Focus - run forward for X ms
  kind: action
  command: "optics.focus.runforwardtime"
  params: []
- id: optics_focus_runreverse
  label: Focus - run reverse
  kind: action
  command: "optics.focus.runreverse"
  params: []
- id: optics_focus_runreversetime
  label: Focus - run reverse for X ms
  kind: action
  command: "optics.focus.runreversetime"
  params: []
- id: optics_focus_setlocation
  label: Focus - set target to location
  kind: action
  command: "optics.focus.setlocation"
  params:
    - name: location
      type: string
- id: optics_focus_stepforward
  label: Focus - step forward
  kind: action
  command: "optics.focus.stepforward"
  params: []
- id: optics_focus_stepreverse
  label: Focus - step reverse
  kind: action
  command: "optics.focus.stepreverse"
  params: []
- id: optics_focus_stop
  label: Focus - stop
  kind: action
  command: "optics.focus.stop"
  params: []

# ===== Optics - lens shift horizontal =====
- id: optics_lensshift_horizontal_addlocation
  label: Lens shift H - add location
  kind: action
  command: "optics.lensshift.horizontal.addlocation"
  params:
    - name: location
      type: string
- id: optics_lensshift_horizontal_calibrate
  label: Lens shift H - calibrate
  kind: action
  command: "optics.lensshift.horizontal.calibrate"
  params: []
- id: optics_lensshift_horizontal_runforward
  label: Lens shift H - run forward
  kind: action
  command: "optics.lensshift.horizontal.runforward"
  params: []
- id: optics_lensshift_horizontal_runforwardtime
  label: Lens shift H - run forward for X ms
  kind: action
  command: "optics.lensshift.horizontal.runforwardtime"
  params: []
- id: optics_lensshift_horizontal_runreverse
  label: Lens shift H - run reverse
  kind: action
  command: "optics.lensshift.horizontal.runreverse"
  params: []
- id: optics_lensshift_horizontal_runreversetime
  label: Lens shift H - run reverse for X ms
  kind: action
  command: "optics.lensshift.horizontal.runreversetime"
  params: []
- id: optics_lensshift_horizontal_setlocation
  label: Lens shift H - set target to location
  kind: action
  command: "optics.lensshift.horizontal.setlocation"
  params:
    - name: location
      type: string
- id: optics_lensshift_horizontal_stepforward
  label: Lens shift H - step forward
  kind: action
  command: "optics.lensshift.horizontal.stepforward"
  params: []
- id: optics_lensshift_horizontal_stepreverse
  label: Lens shift H - step reverse
  kind: action
  command: "optics.lensshift.horizontal.stepreverse"
  params: []
- id: optics_lensshift_horizontal_stop
  label: Lens shift H - stop
  kind: action
  command: "optics.lensshift.horizontal.stop"
  params: []

# ===== Optics - lens shift vertical =====
- id: optics_lensshift_vertical_addlocation
  label: Lens shift V - add location
  kind: action
  command: "optics.lensshift.vertical.addlocation"
  params:
    - name: location
      type: string
- id: optics_lensshift_vertical_calibrate
  label: Lens shift V - calibrate
  kind: action
  command: "optics.lensshift.vertical.calibrate"
  params: []
- id: optics_lensshift_vertical_runforward
  label: Lens shift V - run forward
  kind: action
  command: "optics.lensshift.vertical.runforward"
  params: []
- id: optics_lensshift_vertical_runforwardtime
  label: Lens shift V - run forward for X ms
  kind: action
  command: "optics.lensshift.vertical.runforwardtime"
  params: []
- id: optics_lensshift_vertical_runreverse
  label: Lens shift V - run reverse
  kind: action
  command: "optics.lensshift.vertical.runreverse"
  params: []
- id: optics_lensshift_vertical_runreversetime
  label: Lens shift V - run reverse for X ms
  kind: action
  command: "optics.lensshift.vertical.runreversetime"
  params: []
- id: optics_lensshift_vertical_setlocation
  label: Lens shift V - set target to location
  kind: action
  command: "optics.lensshift.vertical.setlocation"
  params:
    - name: location
      type: string
- id: optics_lensshift_vertical_stepforward
  label: Lens shift V - step forward
  kind: action
  command: "optics.lensshift.vertical.stepforward"
  params: []
- id: optics_lensshift_vertical_stepreverse
  label: Lens shift V - step reverse
  kind: action
  command: "optics.lensshift.vertical.stepreverse"
  params: []
- id: optics_lensshift_vertical_stop
  label: Lens shift V - stop
  kind: action
  command: "optics.lensshift.vertical.stop"
  params: []

# ===== Optics - zoom =====
- id: optics_zoom_addlocation
  label: Zoom - add location
  kind: action
  command: "optics.zoom.addlocation"
  params:
    - name: location
      type: string
- id: optics_zoom_calibrate
  label: Zoom - calibrate
  kind: action
  command: "optics.zoom.calibrate"
  params: []
- id: optics_zoom_runforward
  label: Zoom - run forward
  kind: action
  command: "optics.zoom.runforward"
  params: []
- id: optics_zoom_runforwardtime
  label: Zoom - run forward for X ms
  kind: action
  command: "optics.zoom.runforwardtime"
  params: []
- id: optics_zoom_runreverse
  label: Zoom - run reverse
  kind: action
  command: "optics.zoom.runreverse"
  params: []
- id: optics_zoom_runreversetime
  label: Zoom - run reverse for X ms
  kind: action
  command: "optics.zoom.runreversetime"
  params: []
- id: optics_zoom_setlocation
  label: Zoom - set target to location
  kind: action
  command: "optics.zoom.setlocation"
  params:
    - name: location
      type: string
- id: optics_zoom_stepforward
  label: Zoom - step forward
  kind: action
  command: "optics.zoom.stepforward"
  params: []
- id: optics_zoom_stepreverse
  label: Zoom - step reverse
  kind: action
  command: "optics.zoom.stepreverse"
  params: []
- id: optics_zoom_stop
  label: Zoom - stop
  kind: action
  command: "optics.zoom.stop"
  params: []

# ===== Optics - misc =====
- id: optics_getvalidlensids
  label: Get valid lens IDs
  kind: query
  command: "optics.getvalidlensids"
  params: []
- id: optics_setlensid
  label: Set lens ID
  kind: action
  command: "optics.setlensid"
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer
- id: optics_shifttocenter
  label: Shift lens to center of shift range
  kind: action
  command: "optics.shifttocenter"
  params: []
- id: optics_shutter_getobjectpath
  label: Get shutter motor object path
  kind: query
  command: "optics.shutter.getobjectpath"
  params: []
- id: optics_shutter_toggle
  label: Toggle shutter
  kind: action
  command: "optics.shutter.toggle"
  params: []

# ===== Peripheral frame (horizontal / rotation / vertical) =====
- id: peripheral_frame_horizontal_calibrate
  label: Frame H - calibrate
  kind: action
  command: "peripheral.frame.horizontal.calibrate"
  params: []
- id: peripheral_frame_horizontal_runforward
  label: Frame H - run forward
  kind: action
  command: "peripheral.frame.horizontal.runforward"
  params: []
- id: peripheral_frame_horizontal_runreverse
  label: Frame H - run reverse
  kind: action
  command: "peripheral.frame.horizontal.runreverse"
  params: []
- id: peripheral_frame_horizontal_stepforward
  label: Frame H - step forward
  kind: action
  command: "peripheral.frame.horizontal.stepforward"
  params: []
- id: peripheral_frame_horizontal_stepreverse
  label: Frame H - step reverse
  kind: action
  command: "peripheral.frame.horizontal.stepreverse"
  params: []
- id: peripheral_frame_horizontal_stop
  label: Frame H - stop
  kind: action
  command: "peripheral.frame.horizontal.stop"
  params: []
- id: peripheral_frame_rotation_calibrate
  label: Frame rotation - calibrate
  kind: action
  command: "peripheral.frame.rotation.calibrate"
  params: []
- id: peripheral_frame_rotation_runforward
  label: Frame rotation - run forward
  kind: action
  command: "peripheral.frame.rotation.runforward"
  params: []
- id: peripheral_frame_rotation_runreverse
  label: Frame rotation - run reverse
  kind: action
  command: "peripheral.frame.rotation.runreverse"
  params: []
- id: peripheral_frame_rotation_stepforward
  label: Frame rotation - step forward
  kind: action
  command: "peripheral.frame.rotation.stepforward"
  params: []
- id: peripheral_frame_rotation_stepreverse
  label: Frame rotation - step reverse
  kind: action
  command: "peripheral.frame.rotation.stepreverse"
  params: []
- id: peripheral_frame_rotation_stop
  label: Frame rotation - stop
  kind: action
  command: "peripheral.frame.rotation.stop"
  params: []
- id: peripheral_frame_vertical_calibrate
  label: Frame V - calibrate
  kind: action
  command: "peripheral.frame.vertical.calibrate"
  params: []
- id: peripheral_frame_vertical_runforward
  label: Frame V - run forward
  kind: action
  command: "peripheral.frame.vertical.runforward"
  params: []
- id: peripheral_frame_vertical_runreverse
  label: Frame V - run reverse
  kind: action
  command: "peripheral.frame.vertical.runreverse"
  params: []
- id: peripheral_frame_vertical_stepforward
  label: Frame V - step forward
  kind: action
  command: "peripheral.frame.vertical.stepforward"
  params: []
- id: peripheral_frame_vertical_stepreverse
  label: Frame V - step reverse
  kind: action
  command: "peripheral.frame.vertical.stepreverse"
  params: []
- id: peripheral_frame_vertical_stop
  label: Frame V - stop
  kind: action
  command: "peripheral.frame.vertical.stop"
  params: []

# ===== Remote control =====
- id: remotecontrol_listsensors
  label: List IR sensor object names
  kind: query
  command: "remotecontrol.listsensors"
  params: []

# ===== Statistics counters =====
- id: statistics_listcounters
  label: List all counters
  kind: query
  command: "statistics.listcounters"
  params: []
- id: statistics_laserruntime_getname
  label: Get laser runtime counter name
  kind: query
  command: "statistics.laserruntime.getname"
  params: []
- id: statistics_laserruntime_getunit
  label: Get laser runtime unit
  kind: query
  command: "statistics.laserruntime.getunit"
  params: []
- id: statistics_laserstrikes_getname
  label: Get laser strikes counter name
  kind: query
  command: "statistics.laserstrikes.getname"
  params: []
- id: statistics_laserstrikes_getunit
  label: Get laser strikes unit
  kind: query
  command: "statistics.laserstrikes.getunit"
  params: []
- id: statistics_projectorruntime_getname
  label: Get projector runtime counter name
  kind: query
  command: "statistics.projectorruntime.getname"
  params: []
- id: statistics_projectorruntime_getunit
  label: Get projector runtime unit
  kind: query
  command: "statistics.projectorruntime.getunit"
  params: []
- id: statistics_systemtime_getname
  label: Get system time counter name
  kind: query
  command: "statistics.systemtime.getname"
  params: []
- id: statistics_systemtime_getunit
  label: Get system time unit
  kind: query
  command: "statistics.systemtime.getunit"
  params: []
- id: statistics_uptime_getname
  label: Get uptime counter name
  kind: query
  command: "statistics.uptime.getname"
  params: []
- id: statistics_uptime_getunit
  label: Get uptime unit
  kind: query
  command: "statistics.uptime.getunit"
  params: []

# ===== UI settings =====
- id: ui_settings_get
  label: Get UI setting value
  kind: query
  command: "ui.settings.get"
  params:
    - name: key
      type: string
- id: ui_settings_getfonticons
  label: Get font icons for category
  kind: query
  command: "ui.settings.getfonticons"
  params:
    - name: category
      type: string
      description: Enum: Source, Connector, TestPattern
- id: ui_settings_geticons
  label: Get SVG icons for category
  kind: query
  command: "ui.settings.geticons"
  params:
    - name: category
      type: string
      description: Enum: Source, Connector, TestPattern
- id: ui_settings_keys
  label: List all UI setting keys
  kind: query
  command: "ui.settings.keys"
  params: []
- id: ui_settings_list
  label: List all UI settings
  kind: query
  command: "ui.settings.list"
  params: []
- id: ui_settings_remove
  label: Remove UI setting key
  kind: action
  command: "ui.settings.remove"
  params:
    - name: key
      type: string
- id: ui_settings_set
  label: Set UI setting key/value
  kind: action
  command: "ui.settings.set"
  params:
    - name: key
      type: string
    - name: value
      type: string
- id: ui_togglestealthmode
  label: Toggle stealth mode (DEPRECATED)
  kind: action
  command: "ui.togglestealthmode"
  params: []

# ===== Serial-only ECO wake (raw ASCII, not JSON-RPC) =====
- id: serial_eco_wake
  label: Wake from ECO mode via RS-232
  kind: action
  command: ":POWR1\r"
  params: []
  notes: Raw ASCII bytes on serial port; used only to wake projector in ECO mode.

# ===== HTTP file endpoints (curl-style) =====
- id: http_firmware_transfer
  label: Upload firmware image
  kind: action
  command: "curl -F file=@firmware.dat http://{host}/api/firmware/transfer"
  params:
    - name: host
      type: string
      description: Projector IP address
- id: http_connector_edid_transfer_upload
  label: Upload EDID file
  kind: action
  command: "curl -F file=@edid.dat http://{host}/api/image/connector/edid/transfer"
  params:
    - name: host
      type: string
- id: http_connector_edid_transfer_download
  label: Download EDID file
  kind: action
  command: "curl -O -J http://{host}/api/image/connector/edid/transfer"
  params:
    - name: host
      type: string
- id: http_blacklevel_file_transfer_upload
  label: Upload black level file
  kind: action
  command: "curl -F file=@blacklevel.dat http://{host}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: host
      type: string
- id: http_blacklevel_file_transfer_download
  label: Download black level file
  kind: action
  command: "curl -O -J http://{host}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: host
      type: string
- id: http_blend_file_transfer_upload
  label: Upload blend file
  kind: action
  command: "curl -F file=@blend.dat http://{host}/api/image/processing/blend/file/transfer"
  params:
    - name: host
      type: string
- id: http_blend_file_transfer_download
  label: Download blend file
  kind: action
  command: "curl -O -J http://{host}/api/image/processing/blend/file/transfer"
  params:
    - name: host
      type: string
- id: http_warp_file_transfer_upload
  label: Upload warp file
  kind: action
  command: "curl -F file=@warp.dat http://{host}/api/image/processing/warp/file/transfer"
  params:
    - name: host
      type: string
- id: http_warp_file_transfer_download
  label: Download warp file
  kind: action
  command: "curl -O -J http://{host}/api/image/processing/warp/file/transfer"
  params:
    - name: host
      type: string
- id: http_testpattern_file_transfer_upload
  label: Upload test pattern image
  kind: action
  command: "curl -F file=@testpattern.dat http://{host}/api/image/testpattern/file/transfer"
  params:
    - name: host
      type: string
- id: http_testpattern_file_transfer_download
  label: Download test pattern image
  kind: action
  command: "curl -O -J http://{host}/api/image/testpattern/file/transfer"
  params:
    - name: host
      type: string
- id: http_notification_logger_transfer_download
  label: Download notification log
  kind: action
  command: "curl -O -J http://{host}/api/notification/logger/transfer"
  params:
    - name: host
      type: string
```

## Feedbacks
```yaml
# Queryable states (via property.get) and JSON-RPC notifications (property.changed / signal.callback).
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  query_command: 'property.get "system.state"'
- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: 'property.get "illumination.state"'
- id: illumination_laser_power
  type: number
  query_command: 'property.get "illumination.sources.laser.power"'
- id: active_source
  type: string
  query_command: 'property.get "image.window.main.source"'
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  query_command: 'property.get "environment.alarmstate"'
- id: firmware_version
  type: string
  query_command: 'property.get "firmware.firmwareversion"'
- id: detected_signal
  type: object
  query_command: 'property.get "image.connector.{name}.detectedsignal"'
# UNRESOLVED: full property catalogue (hundreds) not enumerated; see source "Properties" section.
```

## Variables
```yaml
# Settable properties (via property.set). Ranges verbatim from source.
- id: image_brightness
  type: float
  range: { min: -1, max: 1, step: 1, precision: 0.01 }
  set_command: 'property.set "image.brightness" = {value}'
- id: image_contrast
  type: float
  range: { min: 0, max: 2, step: 1, precision: 0.01 }
  set_command: 'property.set "image.contrast" = {value}'
- id: image_saturation
  type: float
  range: { min: 0, max: 2, step: 1, precision: 0.01 }
  set_command: 'property.set "image.saturation" = {value}'
- id: image_sharpness
  type: integer
  range: { min: -2, max: 8, step: 1, precision: 1 }
  set_command: 'property.set "image.sharpness" = {value}'
- id: image_gamma
  type: float
  range: { min: 1, max: 3, step: 1, precision: 0.1 }
  set_command: 'property.set "image.gamma" = {value}'
- id: illumination_laser_power_set
  type: float
  set_command: 'property.set "illumination.sources.laser.power" = {value}'
- id: image_window_main_source
  type: string
  set_command: 'property.set "image.window.main.source" = {value}'
  description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")
- id: remotecontrol_address
  type: integer
  range: { min: 1, max: 31, step: 1, precision: 1 }
  set_command: 'property.set "remotecontrol.address" = {value}'
# UNRESOLVED: many more RW properties in source (dmx.*, image.color.p7.custom.*,
# image.processing.*, optics.*, ui.*, network.device.lan.ip4configmanual, etc.)
# not enumerated here for brevity.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; client must implement handlers).
- id: property_changed
  description: Property value change notification
  payload_method: "property.changed"
  payload_shape: '{ "property": [ { "<name>": <value> }, ... ] }'
- id: signal_callback
  description: Signal fire notification
  payload_method: "signal.callback"
  payload_shape: '{ "signal": [ { "<name>": { <args> } }, ... ] }'
# Documented signals (subscribe via signal.subscribe):
#   modelupdated, image.connector.*.edid.listchanged,
#   image.processing.{blacklevel,blend,warp}.file.listchanged,
#   image.processing.warpgrid.changed / gridchanged,
#   image.testpattern.added / changed / removed / file.listchanged,
#   network.added / removed, notification.dismissed / emitted,
#   system.identificationchanged, system.license.licensechanged,
#   system.performed, ui.settings.added / changed / removed
```

## Macros
```yaml
# Warp-grid activation sequence documented in source:
#   1. property.set "image.processing.warp.enable" = true
#   2. Upload warp file via HTTP POST to /api/image/processing/warp/file/transfer
#   3. property.set "image.processing.warp.file.selected" = "<filename>"
#   4. property.set "image.processing.warp.file.enable" = true
# Blend-mask activation sequence:
#   1. Upload via /api/image/processing/blend/file/transfer
#   2. property.set "image.processing.blend.file.selected" = "<filename>"
#   3. property.set "image.processing.blend.file.enable" = true
# Black-level-mask activation sequence:
#   1. Upload via /api/image/processing/blacklevel/file/transfer
#   2. property.set "image.processing.blacklevel.file.selected" = "<filename>"
#   3. property.set "image.processing.blacklevel.file.enable" = true
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Power-on hint: verify system.state is
# "standby" or "ready" before system.poweron; verify "on" before system.poweroff
# (recommended practice, not a stated interlock).
```

## Notes
- JSON-RPC 2.0 over TCP (port 9090) and RS-232 share the same command set.
- RS-232: 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control. Pinout 2-2, 3-3, 5-5 (straight, 9-pin female host / 9-pin male projector).
- Auth optional: normal end-user access skips authentication; higher access levels require `authenticate` with a secret pass code (example code `98765` in source).
- Best practice: wait for `property.set` confirmation before re-setting the same property (avoids server flooding).
- `system.poweron` / `system.poweroff` return `null` on success (not an error). No-op if already in target state or transitioning.
- Two `property.changed` notifications fire on source switch (deselect old, then select new).
- ECO wake options: WoL (MAC address), IR remote power, keypad power, or raw serial ASCII `:POWR1\r`.
- HTTP file transfer base path: `http://<host>/api/...`. Upload via `curl -F file=@<file> <url>`; download via `curl -O -J <url>`.

<!-- UNRESOLVED: exact product model line/family not confirmed in source text (generic Pulse catalog). -->
<!-- UNRESOLVED: protocol version / Pulse API version number not stated. -->
<!-- UNRESOLVED: binary/framing details for JSON-RPC over RS-232 not specified (assumed newline-delimited). -->
<!-- UNRESOLVED: default authentication pass code value (98765 is an example only). -->
```

## Provenance

```yaml
source_domains:
  - barco.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.barco.com/manuals/R5919184/index
  - https://www.barco.com/en/support/e2-gen-2
  - https://www.barco.com/manuals/R5919184/index.html
  - "https://applicationmarket.crestron.com/content/Help/Barco/Barco_JSON-RPC_for_Event_Master_processors_(9.2).pdf"
retrieved_at: 2026-08-16T12:45:52.777Z
last_checked_at: 2026-10-01T07:20:36.944Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:20:36.944Z
matched_actions: 213
action_count: 213
confidence: medium
summary: "All 213 spec action literals (JSON-RPC methods, HTTP file endpoints, serial :POWR1) appear verbatim in the source Methods/Files sections. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model/family naming and firmware version compatibility not stated. Source is a generic Pulse \"RS232 and Network Command Catalog\"; model \"E2 v2.0\" supplied by operator."
- "full property catalogue (hundreds) not enumerated; see source \"Properties\" section."
- "many more RW properties in source (dmx.*, image.color.p7.custom.*,"
- "source contains no explicit safety warnings, interlock procedures,"
- "exact product model line/family not confirmed in source text (generic Pulse catalog)."
- "protocol version / Pulse API version number not stated."
- "binary/framing details for JSON-RPC over RS-232 not specified (assumed newline-delimited)."
- "default authentication pass code value (98765 is an example only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
