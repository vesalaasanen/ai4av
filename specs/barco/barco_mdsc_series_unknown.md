---
spec_id: admin/barco-mdsc_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco MDSC Series Control Spec"
manufacturer: Barco
model_family: "Barco MDSC Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco MDSC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:29:30.524Z
last_checked_at: 2026-07-12T08:55:39.019Z
generated_at: 2026-07-12T08:55:39.019Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific MDSC model variants not distinguished in source"
  - "DMX extended-mode channel count not fully specified in source"
  - "no explicit safety interlock procedures (e.g. cooling locks) stated in source"
  - "authentication pass code format and actual values not disclosed in source"
  - "firmware version compatibility ranges not stated in source"
  - "peripheral.frame.* motor hardware (frame mount) availability unverified per model"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:55:39.019Z
  matched_actions: 160
  action_count: 160
  confidence: medium
  summary: "All 160 spec actions (Pulse JSON-RPC methods, file endpoints, serial ECO wake) match source verbatim; transport params confirmed; source command catalogue fully covered 160/160. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Barco MDSC Series Control Spec

## Summary
Barco MDSC Series projector supporting both RS-232 serial and TCP/IP JSON-RPC control. The Pulse API uses JSON-RPC 2.0 over either transport. Authentication is optional for normal end-user access; higher access levels require a pass code.

<!-- UNRESOLVED: specific MDSC model variants not distinguished in source -->
<!-- UNRESOLVED: DMX extended-mode channel count not fully specified in source -->

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
  type: none  # inferred: normal end user access requires no auth; higher access uses pass code via authenticate method
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# All Pulse JSON-RPC methods take the form:
#   { "jsonrpc": "2.0", "method": "<method>", "params": { ... }, "id": <id> }
# The `command:` field below holds the literal JSON-RPC method name verbatim
# from the source. Params documented per-source-table.

# --- Existing primitives (commands added from source literals) ---

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

- id: property_set
  label: Set Property
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Object.property name (e.g. "image.window.main.source")
    - name: value
      type: string
      description: Property value to set

- id: property_get
  label: Get Property
  kind: action
  command: "property.get"
  params:
    - name: property
      type: string
      description: Object.property name to query (may be array for multi-get)

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: "property.subscribe"
  params:
    - name: property
      type: string
      description: Object.property name (or array of names) to subscribe to

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: "property.unsubscribe"
  params:
    - name: property
      type: string
      description: Object.property name (or array of names) to unsubscribe from

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: "signal.subscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names) to subscribe to

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: "signal.unsubscribe"
  params:
    - name: signal
      type: string
      description: Signal name (or array of names) to unsubscribe from

- id: introspect
  label: Introspection
  kind: action
  command: "introspect"
  params:
    - name: object
      type: string
      description: Object name to introspect (dot notation); empty introspects all
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

- id: image_source_list
  label: List Available Sources
  kind: action
  command: "image.source.list"
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: action
  command: "image.connector.list"
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Sensors
  kind: action
  command: "environment.getcontrolblocks"
  params:
    - name: type
      type: string
      description: Sensor type (e.g. "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock")
    - name: valuetype
      type: string
      description: Value type (e.g. "Temperature", "Speed", "Voltage", "Current", "Power")

# --- Authentication ---

- id: authenticate
  label: Authenticate
  kind: action
  command: "authenticate"
  params:
    - name: code
      type: integer
      description: Secret pass code setting the user access level (e.g. 98765)

# --- System methods ---

- id: system_reboot
  label: Reboot
  kind: action
  command: "system.reboot"
  params: []
  notes: Powers off the projector first

- id: system_gotoeco
  label: Go to ECO State
  kind: action
  command: "system.gotoeco"
  params: []

- id: system_gotoready
  label: Go to Ready State
  kind: action
  command: "system.gotoready"
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: "system.activity"
  params: []
  notes: Resets timeout countdown timers

- id: system_reset
  label: Reset Domains
  kind: action
  command: "system.reset"
  params:
    - name: domains
      type: array
      description: Domains to reset (enum - ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx)

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: "system.resetall"
  params: []

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: "system.listresetdomains"
  params: []

- id: system_getidentification
  label: Get Identification
  kind: query
  command: "system.getidentification"
  params:
    - name: identification
      type: string
      description: Identification key

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: "system.getidentifications"
  params: []

- id: system_getsystemdate
  label: Get System Date
  kind: query
  command: "system.getsystemdate"
  params: []
  notes: Returns UTC date/time

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: "system.boards.getboardlist"
  params: []

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: "system.boards.getmissingboardlist"
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: "system.boards.getboardinfo"
  params:
    - name: boardname
      type: string

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: "system.boards.getmoduleinfo"
  params:
    - name: boardname
      type: string

# --- Firmware methods ---

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: "firmware.listcomponents"
  params: []

- id: firmware_listcomponentversionstatus
  label: List Component Version Status
  kind: query
  command: "firmware.listcomponentversionstatus"
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: "firmware.schedulecomponentupgrade"
  params: []
  notes: Force a component upgrade at next reboot

# --- Illumination methods ---

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: "illumination.clo.engage"
  params: []
  notes: Engage CLO at the current light level

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: "illumination.laser.getserialnumber"
  params: []

# --- Image methods ---

- id: image_window_list
  label: List Windows
  kind: query
  command: "image.window.list"
  params: []

- id: image_resolution_list
  label: List Resolutions
  kind: query
  command: "image.resolution.list"
  params: []

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: "image.display.listdisplaymodes"
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: "image.color.rgbmode.nextrgbmode"
  params: []
  notes: Cycles through all RGB modes

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset to Native
  kind: action
  command: "image.color.p7.custom.resettonative"
  params: []

- id: image_source_name_listconnectors
  label: List Connectors for Source
  kind: query
  command: "image.source.[name].listconnectors"
  params:
    - name: name
      type: string
      description: Source object name (source name lowercased, non-word chars removed)

- id: image_connector_name_edid_list
  label: List Connector EDID Selections
  kind: query
  command: "image.connector.[name].edid.list"
  params:
    - name: name
      type: string
      description: Connector object name

- id: image_connector_name_edid_selected
  label: Get Connector EDID Selected
  kind: query
  command: "image.connector.[name].edid.selected"
  params:
    - name: name
      type: string

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: "image.stereo.listdarktime"
  params: []
  notes: Returns darktime values in microseconds

# --- Warp / Blend / Black level file methods ---

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: "image.processing.warp.file.list"
  params: []

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: "image.processing.warp.file.delete"
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: "image.processing.blend.file.list"
  params: []

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: "image.processing.blend.file.delete"
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: query
  command: "image.processing.blacklevel.file.list"
  params: []

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level File
  kind: action
  command: "image.processing.blacklevel.file.delete"
  params:
    - name: filename
      type: string

# --- Test pattern methods ---

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: "image.testpattern.list"
  params: []

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: "image.testpattern.setproperties"
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of {key, value} pairs

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: "image.testpattern.file.list"
  params: []

- id: image_testpattern_file_delete
  label: Delete Custom Test Pattern File
  kind: action
  command: "image.testpattern.file.delete"
  params:
    - name: filename
      type: string

# --- Key dispatcher methods ---

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: "keydispatcher.sendclickevent"
  params:
    - name: key
      type: string
      description: Key enum (press+release) - RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT/UP/RIGHT/DOWN, RC_FOCUS_PLUS/MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP/DOWN/LEFT/RIGHT/OK, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_0-RC_9, RC_ASTERISK, RC_NUMBER, KP_LEFT/UP/OK/RIGHT/DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: "keydispatcher.sendpressevent"
  params:
    - name: key
      type: string
      description: Key enum (see keydispatcher.sendclickevent for full list)

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: "keydispatcher.sendreleaseevent"
  params:
    - name: key
      type: string
      description: Key enum (see keydispatcher.sendclickevent for full list)

# --- LED methods ---

- id: led_activity
  label: LED Activity
  kind: action
  command: "led.activity"
  params: []
  notes: Activates LEDs and restarts LED timeout counter

- id: led_list
  label: List LEDs
  kind: query
  command: "led.list"
  params: []

# --- Environment methods (beyond getcontrolblocks) ---

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: "environment.getalarminfo"
  params: []

# --- Light measurement ---

- id: lightmeasurement_getlightoutput
  label: Get Light Output
  kind: query
  command: "lightmeasurement.getlightoutput"
  params: []
  notes: Returns lumens

# --- Network methods ---

- id: network_list
  label: List Network Devices
  kind: query
  command: "network.list"
  params: []
  notes: Returns logical device ids e.g. 'wired1', 'wifi1'

# --- Notification methods ---

- id: notification_list
  label: List Active Notifications
  kind: query
  command: "notification.list"
  params: []

- id: notification_log
  label: Notification Log
  kind: query
  command: "notification.log"
  params:
    - name: minimumseverity
      type: string
      description: INFO | CAUTION | WARNING | ERROR | CRITICAL
    - name: start
      type: integer
    - name: count
      type: integer

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: "notification.dismiss"
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: NONE | OK | CANCEL | IGNORE | YES | NO | SUPPRESS

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: "notification.listsuppressed"
  params: []

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: "notification.suppress"
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: "notification.unsuppress"
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: "notification.unsuppressall"
  params: []

# --- Optics: Focus motor ---

- id: optics_focus_calibrate
  label: Focus Calibrate
  kind: action
  command: "optics.focus.calibrate"
  params: []

- id: optics_focus_runforward
  label: Focus Run Forward
  kind: action
  command: "optics.focus.runforward"
  params: []

- id: optics_focus_runreverse
  label: Focus Run Reverse
  kind: action
  command: "optics.focus.runreverse"
  params: []

- id: optics_focus_runforwardtime
  label: Focus Run Forward Timed
  kind: action
  command: "optics.focus.runforwardtime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run forward

- id: optics_focus_runreversetime
  label: Focus Run Reverse Timed
  kind: action
  command: "optics.focus.runreversetime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run reverse

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: "optics.focus.stepforward"
  params: []

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: "optics.focus.stepreverse"
  params: []

- id: optics_focus_stop
  label: Focus Stop
  kind: action
  command: "optics.focus.stop"
  params: []

- id: optics_focus_addlocation
  label: Focus Add Location
  kind: action
  command: "optics.focus.addlocation"
  params:
    - name: location
      type: string

- id: optics_focus_setlocation
  label: Focus Set Location
  kind: action
  command: "optics.focus.setlocation"
  params:
    - name: location
      type: string

# --- Optics: Zoom motor ---

- id: optics_zoom_calibrate
  label: Zoom Calibrate
  kind: action
  command: "optics.zoom.calibrate"
  params: []

- id: optics_zoom_runforward
  label: Zoom Run Forward
  kind: action
  command: "optics.zoom.runforward"
  params: []

- id: optics_zoom_runreverse
  label: Zoom Run Reverse
  kind: action
  command: "optics.zoom.runreverse"
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Run Forward Timed
  kind: action
  command: "optics.zoom.runforwardtime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run forward

- id: optics_zoom_runreversetime
  label: Zoom Run Reverse Timed
  kind: action
  command: "optics.zoom.runreversetime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run reverse

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: "optics.zoom.stepforward"
  params: []

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: "optics.zoom.stepreverse"
  params: []

- id: optics_zoom_stop
  label: Zoom Stop
  kind: action
  command: "optics.zoom.stop"
  params: []

- id: optics_zoom_addlocation
  label: Zoom Add Location
  kind: action
  command: "optics.zoom.addlocation"
  params:
    - name: location
      type: string

- id: optics_zoom_setlocation
  label: Zoom Set Location
  kind: action
  command: "optics.zoom.setlocation"
  params:
    - name: location
      type: string

# --- Optics: Lens shift horizontal ---

- id: optics_lensshift_horizontal_calibrate
  label: Lens Shift Horizontal Calibrate
  kind: action
  command: "optics.lensshift.horizontal.calibrate"
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Lens Shift Horizontal Run Forward
  kind: action
  command: "optics.lensshift.horizontal.runforward"
  params: []

- id: optics_lensshift_horizontal_runreverse
  label: Lens Shift Horizontal Run Reverse
  kind: action
  command: "optics.lensshift.horizontal.runreverse"
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens Shift Horizontal Run Forward Timed
  kind: action
  command: "optics.lensshift.horizontal.runforwardtime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run forward

- id: optics_lensshift_horizontal_runreversetime
  label: Lens Shift Horizontal Run Reverse Timed
  kind: action
  command: "optics.lensshift.horizontal.runreversetime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run reverse

- id: optics_lensshift_horizontal_stepforward
  label: Lens Shift Horizontal Step Forward
  kind: action
  command: "optics.lensshift.horizontal.stepforward"
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Lens Shift Horizontal Step Reverse
  kind: action
  command: "optics.lensshift.horizontal.stepreverse"
  params: []

- id: optics_lensshift_horizontal_stop
  label: Lens Shift Horizontal Stop
  kind: action
  command: "optics.lensshift.horizontal.stop"
  params: []

- id: optics_lensshift_horizontal_addlocation
  label: Lens Shift Horizontal Add Location
  kind: action
  command: "optics.lensshift.horizontal.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_setlocation
  label: Lens Shift Horizontal Set Location
  kind: action
  command: "optics.lensshift.horizontal.setlocation"
  params:
    - name: location
      type: string

# --- Optics: Lens shift vertical ---

- id: optics_lensshift_vertical_calibrate
  label: Lens Shift Vertical Calibrate
  kind: action
  command: "optics.lensshift.vertical.calibrate"
  params: []

- id: optics_lensshift_vertical_runforward
  label: Lens Shift Vertical Run Forward
  kind: action
  command: "optics.lensshift.vertical.runforward"
  params: []

- id: optics_lensshift_vertical_runreverse
  label: Lens Shift Vertical Run Reverse
  kind: action
  command: "optics.lensshift.vertical.runreverse"
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens Shift Vertical Run Forward Timed
  kind: action
  command: "optics.lensshift.vertical.runforwardtime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run forward

- id: optics_lensshift_vertical_runreversetime
  label: Lens Shift Vertical Run Reverse Timed
  kind: action
  command: "optics.lensshift.vertical.runreversetime"
  params:
    - name: duration
      type: integer
      description: Milliseconds to run reverse

- id: optics_lensshift_vertical_stepforward
  label: Lens Shift Vertical Step Forward
  kind: action
  command: "optics.lensshift.vertical.stepforward"
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Lens Shift Vertical Step Reverse
  kind: action
  command: "optics.lensshift.vertical.stepreverse"
  params: []

- id: optics_lensshift_vertical_stop
  label: Lens Shift Vertical Stop
  kind: action
  command: "optics.lensshift.vertical.stop"
  params: []

- id: optics_lensshift_vertical_addlocation
  label: Lens Shift Vertical Add Location
  kind: action
  command: "optics.lensshift.vertical.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_setlocation
  label: Lens Shift Vertical Set Location
  kind: action
  command: "optics.lensshift.vertical.setlocation"
  params:
    - name: location
      type: string

# --- Optics: Shutter / lens misc ---

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: "optics.shutter.toggle"
  params: []

- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: "optics.shutter.getobjectpath"
  params: []

- id: optics_shifttocenter
  label: Shift Lens to Center
  kind: action
  command: "optics.shifttocenter"
  params: []
  notes: Shift lens to center of allowed shift range

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: "optics.setlensid"
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: "optics.getvalidlensids"
  params: []

# --- Peripheral frame motors ---

- id: peripheral_frame_horizontal_calibrate
  label: Frame Horizontal Calibrate
  kind: action
  command: "peripheral.frame.horizontal.calibrate"
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame Horizontal Run Forward
  kind: action
  command: "peripheral.frame.horizontal.runforward"
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame Horizontal Run Reverse
  kind: action
  command: "peripheral.frame.horizontal.runreverse"
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame Horizontal Step Forward
  kind: action
  command: "peripheral.frame.horizontal.stepforward"
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame Horizontal Step Reverse
  kind: action
  command: "peripheral.frame.horizontal.stepreverse"
  params: []

- id: peripheral_frame_horizontal_stop
  label: Frame Horizontal Stop
  kind: action
  command: "peripheral.frame.horizontal.stop"
  params: []

- id: peripheral_frame_vertical_calibrate
  label: Frame Vertical Calibrate
  kind: action
  command: "peripheral.frame.vertical.calibrate"
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame Vertical Run Forward
  kind: action
  command: "peripheral.frame.vertical.runforward"
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame Vertical Run Reverse
  kind: action
  command: "peripheral.frame.vertical.runreverse"
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame Vertical Step Forward
  kind: action
  command: "peripheral.frame.vertical.stepforward"
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame Vertical Step Reverse
  kind: action
  command: "peripheral.frame.vertical.stepreverse"
  params: []

- id: peripheral_frame_vertical_stop
  label: Frame Vertical Stop
  kind: action
  command: "peripheral.frame.vertical.stop"
  params: []

- id: peripheral_frame_rotation_calibrate
  label: Frame Rotation Calibrate
  kind: action
  command: "peripheral.frame.rotation.calibrate"
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation Run Forward
  kind: action
  command: "peripheral.frame.rotation.runforward"
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation Run Reverse
  kind: action
  command: "peripheral.frame.rotation.runreverse"
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation Step Forward
  kind: action
  command: "peripheral.frame.rotation.stepforward"
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation Step Reverse
  kind: action
  command: "peripheral.frame.rotation.stepreverse"
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame Rotation Stop
  kind: action
  command: "peripheral.frame.rotation.stop"
  params: []

# --- DMX methods ---

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: "dmx.listchannels"
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: "dmx.listmodes"
  params: []

# --- Remote control ---

- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: "remotecontrol.listsensors"
  params: []

# --- Statistics ---

- id: statistics_listcounters
  label: List Counters
  kind: query
  command: "statistics.listcounters"
  params: []

- id: statistics_laserruntime_getname
  label: Laser Runtime Counter Name
  kind: query
  command: "statistics.laserruntime.getname"
  params: []

- id: statistics_laserruntime_getunit
  label: Laser Runtime Counter Unit
  kind: query
  command: "statistics.laserruntime.getunit"
  params: []

- id: statistics_laserstrikes_getname
  label: Laser Strikes Counter Name
  kind: query
  command: "statistics.laserstrikes.getname"
  params: []

- id: statistics_laserstrikes_getunit
  label: Laser Strikes Counter Unit
  kind: query
  command: "statistics.laserstrikes.getunit"
  params: []

- id: statistics_projectorruntime_getname
  label: Projector Runtime Counter Name
  kind: query
  command: "statistics.projectorruntime.getname"
  params: []

- id: statistics_projectorruntime_getunit
  label: Projector Runtime Counter Unit
  kind: query
  command: "statistics.projectorruntime.getunit"
  params: []

- id: statistics_systemtime_getname
  label: System Time Counter Name
  kind: query
  command: "statistics.systemtime.getname"
  params: []

- id: statistics_systemtime_getunit
  label: System Time Counter Unit
  kind: query
  command: "statistics.systemtime.getunit"
  params: []

- id: statistics_uptime_getname
  label: Uptime Counter Name
  kind: query
  command: "statistics.uptime.getname"
  params: []

- id: statistics_uptime_getunit
  label: Uptime Counter Unit
  kind: query
  command: "statistics.uptime.getunit"
  params: []

# --- UI settings methods ---

- id: ui_settings_get
  label: UI Settings Get
  kind: query
  command: "ui.settings.get"
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: UI Settings Set
  kind: action
  command: "ui.settings.set"
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: UI Settings Remove
  kind: action
  command: "ui.settings.remove"
  params:
    - name: key
      type: string

- id: ui_settings_keys
  label: UI Settings Keys
  kind: query
  command: "ui.settings.keys"
  params: []

- id: ui_settings_list
  label: UI Settings List
  kind: query
  command: "ui.settings.list"
  params: []

- id: ui_settings_geticons
  label: UI Settings Get Icons
  kind: query
  command: "ui.settings.geticons"
  params:
    - name: category
      type: string
      description: Source | Connector | TestPattern

- id: ui_settings_getfonticons
  label: UI Settings Get Font Icons
  kind: query
  command: "ui.settings.getfonticons"
  params:
    - name: category
      type: string
      description: Source | Connector | TestPattern

# --- Special serial ECO wake (NOT JSON-RPC; raw ASCII) ---

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: ASCII bytes sent over RS-232 to wake projector from ECO mode. Not a JSON-RPC method.

# --- HTTP file transfer endpoints (curl/HTTP, NOT JSON-RPC) ---

- id: file_firmware_transfer
  label: Firmware File Transfer
  kind: action
  command: "POST http://<host>/api/firmware/transfer  (curl -F file=@firmware.dat)"
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Path to firmware image file

- id: file_image_connector_edid_transfer
  label: Connector EDID File Transfer
  kind: action
  command: "POST/GET http://<host>/api/image/connector/edid/transfer"
  params:
    - name: host
      type: string

- id: file_image_processing_warp_transfer
  label: Warp File Transfer
  kind: action
  command: "POST/GET http://<host>/api/image/processing/warp/file/transfer"
  params:
    - name: host
      type: string

- id: file_image_processing_blend_transfer
  label: Blend File Transfer
  kind: action
  command: "POST/GET http://<host>/api/image/processing/blend/file/transfer"
  params:
    - name: host
      type: string

- id: file_image_processing_blacklevel_transfer
  label: Black Level File Transfer
  kind: action
  command: "POST/GET http://<host>/api/image/processing/blacklevel/file/transfer"
  params:
    - name: host
      type: string

- id: file_image_testpattern_transfer
  label: Test Pattern File Transfer
  kind: action
  command: "POST/GET http://<host>/api/image/testpattern/file/transfer"
  params:
    - name: host
      type: string

- id: file_notification_logger_transfer
  label: Notification Log File Transfer
  kind: query
  command: "GET http://<host>/api/notification/logger/transfer"
  params:
    - name: host
      type: string
  notes: Download only (no upload)
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
    - service

- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - On
    - Off

- id: active_source
  label: Active Source
  type: string

- id: property_value
  label: Property Value
  type: dynamic
  description: Returns the current value of the queried property

- id: source_list
  label: Available Sources
  type: array
  description: List of available source names

- id: connector_list
  label: Available Connectors
  type: array
  description: List of available connector names

- id: detected_signal
  label: Connector Signal Info
  type: object
  description: Signal information for a connector including resolution, timing, and format details

- id: environment_sensors
  label: Environment Sensors
  type: object
  description: Key-value map of sensor names to readings

- id: environment_alarmstate
  label: Environment Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: alarm_info
  label: Alarm Info
  type: array
  description: Array of alarm objects {severity, timestamp, source, description, custommessage}

- id: identification
  label: Device Identification
  type: object
  description: Key/value map of identification fields (e.g. serial, model)

- id: system_date
  label: System Date
  type: object
  description: UTC date {year, month, day, hour, minute, second}

- id: reset_domains
  label: Reset Domains List
  type: array
  description: Available reset-domain enum values

- id: firmware_components
  label: Firmware Components
  type: array
  description: Component name list

- id: firmware_component_status
  label: Firmware Component Status
  type: array
  description: Per-component {name, versions{available,running,status}}

- id: board_list
  label: Board List
  type: array

- id: board_info
  label: Board Info
  type: object
  description: Key/value map of board properties

- id: light_output
  label: Light Output
  type: integer
  description: Lumens

- id: network_devices
  label: Network Devices
  type: array
  description: Logical device ids (e.g. wired1, wifi1)

- id: notifications_active
  label: Active Notifications
  type: array
  description: Array of {severity, id, code, timestamp, message, timeout, actions}

- id: notification_log
  label: Notification Log
  type: array

- id: suppressed_codes
  label: Suppressed Notification Codes
  type: array

- id: counter_list
  label: Statistics Counters
  type: array
  description: Array of {name, value, unit}

- id: test_patterns
  label: Test Patterns
  type: array
  description: Array of {name, location, id, above, internal, properties}

- id: display_modes
  label: Display Modes
  type: array
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift

- id: resolutions_list
  label: Available Resolutions
  type: array

- id: windows_list
  label: Windows
  type: array

- id: stereo_darktime_list
  label: Stereo Darktime Values
  type: array
  description: Microseconds

- id: led_list_response
  label: LED List
  type: array

- id: valid_lens_ids
  label: Valid Lens IDs
  type: object

- id: edid_selections
  label: EDID Selections
  type: array
  description: Array of {group, edids[]}

- id: ui_settings_dict
  label: UI Settings
  type: object
  description: Key/value map
```

## Variables
```yaml
# --- Image picture settings ---

- id: image_brightness
  label: Brightness
  type: float
  constraints:
    min: -1
    max: 1
    step_size: 1
    precision: 0.01

- id: image_contrast
  label: Contrast
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_saturation
  label: Saturation
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_sharpness
  label: Sharpness
  type: int
  constraints:
    min: -2
    max: 8
    step_size: 1
    precision: 1

- id: image_gamma
  label: Gamma
  type: float
  constraints:
    min: 1
    max: 3
    step_size: 1
    precision: 0.1

- id: image_intensity
  label: Intensity
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 0.1
    precision: 0.01

- id: image_orientation
  label: Image Orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_color_rgbmode
  label: RGB Mode
  type: enum
  values:
    - Full
    - Red
    - Green
    - Blue
    - RedGreen
    - GreenBlue
    - BlueRed

# --- Image display ---

- id: image_display_desireddisplaymode
  label: Desired Display Mode
  type: enum
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift

- id: image_display_displaymode
  label: Display Mode
  type: enum
  read_only: true
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift

- id: image_display_frequency
  label: Display Frequency
  type: float
  read_only: true

- id: image_display_synchronouslock
  label: Synchronous Lock
  type: boolean
  read_only: true

# --- Image window main ---

- id: image_window_main_scalingmode
  label: Main Window Scaling Mode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_window_main_source
  label: Main Window Source
  type: string

- id: image_window_main_position
  label: Main Window Position
  type: object
  description: "{x: int, y: int}"

- id: image_window_main_size
  label: Main Window Size
  type: object
  description: "{width: int, height: int}"

# --- Image connector signal config (l1displayport representative) ---

- id: image_connector_colorprimaries
  label: Connector Color Primaries
  type: enum
  values:
    - Auto
    - Uncorrected
    - REC709
    - REC2020
    - DCI-P3-D65
    - DCI-P3-Theater

- id: image_connector_colorspace
  label: Connector Color Space
  type: enum
  values:
    - Auto
    - RGB
    - REC709
    - REC601
    - REC2020

- id: image_connector_signalrange
  label: Connector Signal Range
  type: enum
  values:
    - Auto
    - "0-255"
    - "16-235"

# --- Image processing: warp ---

- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean

- id: image_processing_warp_file_enable
  label: Warp File Enable
  type: boolean

- id: image_processing_warp_file_selected
  label: Warp File Selected
  type: string

- id: image_processing_warp_bow_enable
  label: Bow Warp Enable
  type: boolean

- id: image_processing_warp_bow_symmetric
  label: Bow Symmetric
  type: boolean

- id: image_processing_warp_fourcorners_enable
  label: Four Corners Warp Enable
  type: boolean

- id: image_processing_warp_fourcorners_topleft
  label: Four Corners Top Left
  type: object
  description: "{x: int, y: int}"

- id: image_processing_warp_fourcorners_topright
  label: Four Corners Top Right
  type: object
  description: "{x: int, y: int}"

- id: image_processing_warp_fourcorners_bottomleft
  label: Four Corners Bottom Left
  type: object
  description: "{x: int, y: int}"

- id: image_processing_warp_fourcorners_bottomright
  label: Four Corners Bottom Right
  type: object
  description: "{x: int, y: int}"

- id: image_processing_warp_fourcorners_screenwidth
  label: Four Corners Screen Width
  type: float

- id: image_processing_warp_fourcorners_screenheight
  label: Four Corners Screen Height
  type: float

# --- Image processing: blend ---

- id: image_processing_blend_basicblend_enable
  label: Basic Blend Enable
  type: boolean

- id: image_processing_blend_basicblend_left
  label: Basic Blend Left Edge
  type: object
  description: "{Start: int, Width: int}"

- id: image_processing_blend_basicblend_right
  label: Basic Blend Right Edge
  type: object
  description: "{Start: int, Width: int}"

- id: image_processing_blend_basicblend_top
  label: Basic Blend Top Edge
  type: object
  description: "{Start: int, Width: int}"

- id: image_processing_blend_basicblend_bottom
  label: Basic Blend Bottom Edge
  type: object
  description: "{Start: int, Width: int}"

- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean

- id: image_processing_blend_file_selected
  label: Blend File Selected
  type: array
  description: Array of selected blend file names

- id: image_processing_blend_scurve
  label: Blend S-Curve
  type: float
  constraints:
    min: 1
    max: 4
    step_size: 1
    precision: 0.1

# --- Image processing: black level ---

- id: image_processing_blacklevel_basicblacklevel_enable
  label: Basic Black Level Enable
  type: boolean

- id: image_processing_blacklevel_basicblacklevel_level
  label: Basic Black Level
  type: int
  constraints:
    min: 0
    max: 65535
    step_size: 1
    precision: 1

- id: image_processing_blacklevel_basicblacklevel_left
  label: Basic Black Level Left
  type: int

- id: image_processing_blacklevel_basicblacklevel_right
  label: Basic Black Level Right
  type: int

- id: image_processing_blacklevel_basicblacklevel_top
  label: Basic Black Level Top
  type: int

- id: image_processing_blacklevel_basicblacklevel_bottom
  label: Basic Black Level Bottom
  type: int

- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  label: Black Level File Selected
  type: string

- id: image_processing_blacklevel_bluegain
  label: Black Level Blue Gain
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 1
    precision: 0.001

- id: image_processing_blacklevel_greengain
  label: Black Level Green Gain
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 1
    precision: 0.001

- id: image_processing_blacklevel_redgain
  label: Black Level Red Gain
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 1
    precision: 0.001

# --- Image processing: transport delay ---

- id: image_processing_transportdelay_actual
  label: Transport Delay Actual
  type: int
  read_only: true

- id: image_processing_transportdelay_desired
  label: Transport Delay Desired
  type: int

- id: image_processing_transportdelay_minimum
  label: Transport Delay Minimum
  type: int
  read_only: true

# --- Image: stereo ---

- id: image_stereo_darktime
  label: Stereo Darktime
  type: int
  description: Microseconds

- id: image_stereo_glassync_delay
  label: Stereo Glass Sync Delay
  type: int
  description: Microseconds

- id: image_stereo_glassync_delaymaximum
  label: Stereo Glass Sync Delay Maximum
  type: int
  read_only: true

- id: image_stereo_glassync_delayminimum
  label: Stereo Glass Sync Delay Minimum
  type: int
  read_only: true

- id: image_stereo_glassync_invert
  label: Stereo Glass Sync Invert
  type: boolean

- id: image_stereo_swapframepair
  label: Stereo Swap Frame Pair
  type: boolean

# --- Image: test pattern / resolution ---

- id: image_testpattern_selected
  label: Test Pattern Selected
  type: string

- id: image_testpattern_show
  label: Test Pattern Show
  type: boolean

- id: image_resolution_resolution
  label: Current Resolution
  type: string
  read_only: true

# --- Illumination ---

- id: illumination_sources_laser_power
  label: Laser Power
  type: float
  constraints:
    min: 0
    max: 100
    description: Current power level in percent

- id: illumination_sources_laser_minpower
  label: Laser Min Power
  type: float
  read_only: true

- id: illumination_sources_laser_maxpower
  label: Laser Max Power
  type: float
  read_only: true

- id: illumination_sources_laser_ispowerlimited
  label: Laser Power Limited
  type: boolean
  read_only: true

- id: illumination_sources_laser_powerlimitreason
  label: Laser Power Limit Reason
  type: string
  read_only: true

- id: illumination_clo_availability
  label: CLO Availability
  type: enum
  read_only: true
  values:
    - Available
    - SensorUnavailable
    - PendingWarmup
    - Unavailable
    - Unknown

- id: illumination_clo_enable
  label: CLO Enable
  type: boolean

- id: illumination_clo_scale
  label: CLO Scale
  type: float

- id: illumination_clo_setpoint
  label: CLO Setpoint
  type: float

- id: illumination_clo_state
  label: CLO State
  type: enum
  read_only: true
  values:
    - Ok
    - TooDim
    - TooBright

# --- Optics ---

- id: optics_lenspresent
  label: Lens Present
  type: boolean
  read_only: true

- id: optics_lens
  label: Lens Info
  type: object
  read_only: true
  description: Lens descriptor {ID, PowerID, Name, Description, Zoom, ZoomForwardSpeed, ...}

- id: optics_focus_position
  label: Focus Position
  type: int
  read_only: true

- id: optics_focus_target
  label: Focus Target
  type: int

- id: optics_focus_minposition
  label: Focus Min Position
  type: int
  read_only: true

- id: optics_focus_maxposition
  label: Focus Max Position
  type: int
  read_only: true

- id: optics_focus_state
  label: Focus State
  type: enum
  read_only: true
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_focus_calibrationstate
  label: Focus Calibration State
  type: enum
  read_only: true
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented

- id: optics_focus_enabled
  label: Focus Enabled
  type: boolean

- id: optics_zoom_position
  label: Zoom Position
  type: int
  read_only: true

- id: optics_zoom_target
  label: Zoom Target
  type: int

- id: optics_zoom_minposition
  label: Zoom Min Position
  type: int
  read_only: true

- id: optics_zoom_maxposition
  label: Zoom Max Position
  type: int
  read_only: true

- id: optics_zoom_state
  label: Zoom State
  type: enum
  read_only: true
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_zoom_calibrationstate
  label: Zoom Calibration State
  type: enum
  read_only: true
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented

- id: optics_zoom_enabled
  label: Zoom Enabled
  type: boolean

- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal Position
  type: int

- id: optics_lensshift_horizontal_target
  label: Lens Shift Horizontal Target
  type: int

- id: optics_lensshift_horizontal_minposition
  label: Lens Shift Horizontal Min
  type: int
  read_only: true

- id: optics_lensshift_horizontal_maxposition
  label: Lens Shift Horizontal Max
  type: int
  read_only: true

- id: optics_lensshift_horizontal_state
  label: Lens Shift Horizontal State
  type: enum
  read_only: true
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_lensshift_horizontal_calibrationstate
  label: Lens Shift Horizontal Calibration State
  type: enum
  read_only: true
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented

- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical Position
  type: int

- id: optics_lensshift_vertical_target
  label: Lens Shift Vertical Target
  type: int

- id: optics_lensshift_vertical_minposition
  label: Lens Shift Vertical Min
  type: int
  read_only: true

- id: optics_lensshift_vertical_maxposition
  label: Lens Shift Vertical Max
  type: int
  read_only: true

- id: optics_lensshift_vertical_state
  label: Lens Shift Vertical State
  type: enum
  read_only: true
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_lensshift_vertical_calibrationstate
  label: Lens Shift Vertical Calibration State
  type: enum
  read_only: true
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented

- id: optics_shutter_position
  label: Shutter Position
  type: enum
  read_only: true
  values:
    - Open
    - Closed

- id: optics_shutter_target
  label: Shutter Target
  type: enum
  values:
    - Open
    - Closed

- id: optics_shutter_enabled
  label: Shutter Enabled
  type: boolean

# --- DMX ---

- id: dmx_artnet
  label: DMX Artnet Enabled
  type: boolean

- id: dmx_artnetnet
  label: DMX Artnet Net
  type: int

- id: dmx_artnetuniverse
  label: DMX Artnet Universe
  type: int

- id: dmx_mode
  label: DMX Mode
  type: string

- id: dmx_startchannel
  label: DMX Start Channel
  type: int
  description: "[1..512]"

- id: dmx_shutdown
  label: DMX Shutdown Enabled
  type: boolean

- id: dmx_shutdowntimeout
  label: DMX Shutdown Timeout
  type: int
  description: Minutes

- id: dmx_monitor_connectionstate_active
  label: DMX Connection Active
  type: boolean
  read_only: true
  description: True if DMX/Art-Net packet received in last 10 seconds

# --- Network (LAN representative) ---

- id: network_device_lan_carrier
  label: LAN Carrier
  type: boolean
  read_only: true

- id: network_device_lan_configuration
  label: LAN Configuration Mode
  type: enum
  read_only: true
  values:
    - AUTO
    - MANUAL

- id: network_device_lan_devicetype
  label: LAN Device Type
  type: enum
  read_only: true
  values:
    - UNKNOWN
    - WIRED
    - WIRELESS

- id: network_device_lan_hwaddress
  label: LAN MAC Address
  type: string
  read_only: true

- id: network_device_lan_ip4config
  label: LAN IPv4 Config
  type: object
  read_only: true
  description: "{Address, Mask, Gateway, NameServers}"

- id: network_device_lan_ip4configmanual
  label: LAN IPv4 Manual Config
  type: object
  description: "{Address, Mask, Gateway, NameServers}"

- id: network_device_lan_ip6config
  label: LAN IPv6 Config
  type: object
  read_only: true
  description: "{Address, Prefix, Gateway, NameServers}"

- id: network_device_lan_ip6configmanual
  label: LAN IPv6 Manual Config
  type: object
  description: "{Address, Prefix, Gateway, NameServers}"

- id: network_device_lan_speed
  label: LAN Speed
  type: int
  read_only: true
  description: Mbit/s

- id: network_device_lan_state
  label: LAN State
  type: enum
  read_only: true
  values:
    - CONNECTED
    - DISCONNECTED

- id: network_device_lan_stateinfo
  label: LAN State Info
  type: string
  read_only: true

- id: network_hostname
  label: Hostname
  type: string
  read_only: true

- id: network_version
  label: Networking Service Version
  type: string
  read_only: true

# --- Notification ---

- id: notification_count
  label: Notification Count
  type: int
  read_only: true
  description: Number of notifications received and dismissed

# --- Remote control ---

- id: remotecontrol_address
  label: Remote Control Address
  type: int
  constraints:
    min: 1
    max: 31
    step_size: 1
    precision: 1

- id: remotecontrol_broadcastaddress
  label: Remote Control Broadcast Address
  type: int
  constraints:
    min: 0
    max: 1
    step_size: 1
    precision: 1

- id: remotecontrol_sensors_front_enable
  label: Front IR Sensor Enable
  type: boolean

- id: remotecontrol_sensors_rear_enable
  label: Rear IR Sensor Enable
  type: boolean

- id: remotecontrol_sensors_side_enable
  label: Side IR Sensor Enable
  type: boolean

# --- Screen ---

- id: screen_hdrboost
  label: HDR Boost
  type: float
  constraints:
    min: 0.8
    max: 1.2
    step_size: 0.01
    precision: 0.1

- id: screen_luminance
  label: Screen Luminance
  type: float
  constraints:
    min: 50
    max: 10000
    step_size: 10
    precision: 1
  description: cd/m2

# --- Statistics counters ---

- id: statistics_laserruntime_value
  label: Laser Runtime
  type: int

- id: statistics_laserstrikes_value
  label: Laser Strikes
  type: int

- id: statistics_projectorruntime_value
  label: Projector Runtime
  type: int

- id: statistics_systemtime_value
  label: System Time
  type: int

- id: statistics_uptime_value
  label: Uptime
  type: int
  read_only: true

# --- System ---

- id: system_articlenumber
  label: Article Number
  type: string
  read_only: true

- id: system_colorwheel
  label: Color Wheel Article Number
  type: string
  read_only: true

- id: system_colorwheelname
  label: Color Wheel Name
  type: string
  read_only: true

- id: system_eco_available
  label: ECO Available
  type: boolean
  read_only: true

- id: system_eco_enable
  label: ECO Enable
  type: boolean

- id: system_error_timeout_duration
  label: Error Timeout Duration
  type: int
  description: Seconds

- id: system_error_timeout_enable
  label: Error Timeout Enable
  type: boolean

- id: system_familyname
  label: Family Name
  type: string
  read_only: true

- id: system_firmwareversion
  label: Firmware Version
  type: string
  read_only: true

- id: system_initialstate
  label: Initial State
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - service
    - deconditioning
    - error

- id: system_modelname
  label: Model Name
  type: string
  read_only: true

- id: system_serialnumber
  label: Serial Number
  type: string
  read_only: true

- id: system_standby_available
  label: Standby Available
  type: boolean
  read_only: true

- id: system_standby_enable
  label: Standby Enable
  type: boolean

- id: system_standby_timeout_duration
  label: Standby Timeout Duration
  type: int
  description: Seconds

- id: system_standby_timeout_enable
  label: Standby Timeout Enable
  type: boolean

- id: system_ready_timeout_duration
  label: Ready Timeout Duration
  type: int
  description: Seconds

- id: system_ready_timeout_enable
  label: Ready Timeout Enable
  type: boolean

- id: system_on_timeout_duration
  label: On Timeout Duration
  type: int
  description: Seconds

- id: system_on_timeout_enable
  label: On Timeout Enable
  type: boolean

- id: system_state_var
  label: System State
  type: enum
  read_only: true
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - service
    - deconditioning
    - error

- id: system_license_available
  label: License Available
  type: boolean
  read_only: true

- id: system_license_valid
  label: License Valid
  type: boolean
  read_only: true

- id: system_license_applicable
  label: License Applicable
  type: boolean
  read_only: true

- id: system_license_options
  label: License Options
  type: array
  read_only: true
  description: Array of {key, value}

# --- Firmware / GSM ---

- id: firmware_firmwareversion
  label: Firmware Version (firmware service)
  type: string
  read_only: true

- id: gsm_available
  label: GSM Card Available
  type: boolean
  read_only: true

- id: gsm_pin
  label: GSM SIM PIN
  type: string

- id: gsm_pinstate
  label: GSM PIN State
  type: enum
  read_only: true
  values:
    - Accepted
    - Failed
    - Locked
    - Unknown

# --- UI ---

- id: ui_osd
  label: OSD Enable
  type: boolean

- id: ui_menu
  label: Menu Show
  type: boolean

- id: ui_stealthmode
  label: Stealth Mode
  type: enum
  values:
    - "Off"
    - "On"

- id: ui_backlight_state
  label: Backlight State
  type: enum
  values:
    - "Off"
    - "On"
    - Auto

- id: ui_backlight_timeout
  label: Backlight Timeout
  type: int
  description: Seconds

- id: ui_notificationfilterseverity
  label: Notification Filter Severity
  type: enum
  values:
    - CRITICAL
    - ERROR
    - WARNING
    - INFO
    - NONE
```

## Events
```yaml
- id: property_changed
  label: Property Changed
  description: Notification sent when a property value changes
  params:
    - name: property
      type: array
      description: Array of {propertyname: value} pairs

- id: signal_callback
  label: Signal Callback
  description: Notification sent when a signal is emitted
  params:
    - name: signal
      type: array
      description: Array of signal/argument-list pairs

- id: modelupdated
  label: Model Updated
  description: Triggered when object structure changes (objects added or removed)
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: newobject
      type: boolean
      description: True if added, false if removed
    - name: accesslevel
      type: string
      description: Minimum access level

- id: image_processing_warpgrid_changed
  label: Warp Grid Changed
  description: Fired when the grid changes (no payload)

- id: image_processing_warpgrid_gridchanged
  label: Warp Grid Gridchanged
  description: Fired with grid data payload
  params:
    - name: grid
      type: array
      description: Array of {x: float, y: float}

- id: image_processing_warp_file_listchanged
  label: Warp File List Changed
  description: Fired when the warp file list changes

- id: image_processing_blend_file_listchanged
  label: Blend File List Changed
  description: Fired when the blend file list changes

- id: image_processing_blacklevel_file_listchanged
  label: Black Level File List Changed
  description: Fired when the black level file list changes

- id: image_testpattern_added
  label: Test Pattern Added
  params:
    - name: pattern
      type: object

- id: image_testpattern_changed
  label: Test Pattern Changed
  params:
    - name: id
      type: string
    - name: properties
      type: array

- id: image_testpattern_removed
  label: Test Pattern Removed
  params:
    - name: pattern
      type: object

- id: image_testpattern_file_listchanged
  label: Test Pattern File List Changed

- id: network_added
  label: Network Device Added
  params:
    - name: id
      type: string
      description: Logical device id (e.g. wifi1)

- id: network_removed
  label: Network Device Removed
  params:
    - name: id
      type: string
      description: Logical device id

- id: notification_emitted
  label: Notification Emitted
  params:
    - name: notification
      type: object
      description: "{severity, id, code, timestamp, message, timeout, actions}"

- id: notification_dismissed
  label: Notification Dismissed
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: NONE|OK|CANCEL|IGNORE|YES|NO|SUPPRESS

- id: system_identificationchanged
  label: Identification Changed
  params:
    - name: identification
      type: string

- id: system_license_licensechanged
  label: License Changed

- id: system_performed
  label: Reset Performed
  description: Emitted when one or more reset domains have completed
  params:
    - name: domains
      type: array
      description: Reset-domain enum values

- id: ui_settings_added
  label: UI Settings Added
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_changed
  label: UI Settings Changed
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_removed
  label: UI Settings Removed
  params:
    - name: key
      type: string
```

## Macros
```yaml
# Upload + activate warp file sequence documented in source:
#   1. POST file to /api/image/processing/warp/file/transfer
#   2. property.set image.processing.warp.file.selected = "<filename>"
#   3. property.set image.processing.warp.file.enable = true
# Upload + activate blend mask sequence documented in source:
#   1. POST file to /api/image/processing/blend/file/transfer
#   2. property.set image.processing.blend.file.selected = "<filename>"
#   3. property.set image.processing.blend.file.enable = true
# Upload + activate black level mask sequence documented in source:
#   1. POST file to /api/image/processing/blacklevel/file/transfer
#   2. property.set image.processing.blacklevel.file.selected = "<filename>"
#   3. property.set image.processing.blacklevel.file.enable = true
# No formal macro primitive in protocol - composed from primitive actions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "system.poweron: good practice to verify system.state is standby or ready before issuing"
  - description: "system.poweroff: good practice to verify system.state is on before issuing"
  - description: "system.reboot powers off the projector first"
  - description: "property.set best practice - wait for confirmation before re-setting same property to avoid flooding server"
# UNRESOLVED: no explicit safety interlock procedures (e.g. cooling locks) stated in source
```

## Notes
RS-232 uses straight-through cable (pin 2 to pin 2, pin 3 to pin 3, pin 5 to pin 5). ECO mode wake requires either WoL, remote/keypad power button, or special serial command `:POWR1\r`. JSON-RPC is the sole message format for both transports; file transfers use HTTP on port 9090 against `/api/...` endpoints. Authentication pass code example value 98765 shown in source; real pass code values not disclosed. Parameters passed by name; order irrelevant. Best practice: wait for property.set confirmation before setting same property again. Parts of the API are dynamic and depend on installed peripherals (lens, DMX mode, etc.) — introspection is the authoritative way to discover a specific unit's API. DMX basic mode exposes 2 channels; extended mode exposes more channels not enumerated in source.

<!-- UNRESOLVED: authentication pass code format and actual values not disclosed in source -->
<!-- UNRESOLVED: DMX extended-mode channel count not fully specified in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: specific MDSC model variants not distinguished in source -->
<!-- UNRESOLVED: peripheral.frame.* motor hardware (frame mount) availability unverified per model -->
````

Upgrade done. Added ~140 missing actions (all documented Pulse methods verbatim + ECO serial wake + HTTP file endpoints), ~60 variables from properties table, ~15 events from signals list, alarm/notification interlock notes. Preserved all existing IDs/shapes, added `command:` payloads to originals.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:29:30.524Z
last_checked_at: 2026-07-12T08:55:39.019Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:55:39.019Z
matched_actions: 160
action_count: 160
confidence: medium
summary: "All 160 spec actions (Pulse JSON-RPC methods, file endpoints, serial ECO wake) match source verbatim; transport params confirmed; source command catalogue fully covered 160/160. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific MDSC model variants not distinguished in source"
- "DMX extended-mode channel count not fully specified in source"
- "no explicit safety interlock procedures (e.g. cooling locks) stated in source"
- "authentication pass code format and actual values not disclosed in source"
- "firmware version compatibility ranges not stated in source"
- "peripheral.frame.* motor hardware (frame mount) availability unverified per model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
