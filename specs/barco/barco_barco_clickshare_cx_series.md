---
spec_id: admin/barco-clickshare-cx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco ClickShare CX Series Control Spec"
manufacturer: Barco
model_family: "Barco ClickShare CX Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco ClickShare CX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - barco.com
source_urls:
  - https://www.barco.com/manuals/R5915531/index
retrieved_at: 2026-06-10T18:13:23.212Z
last_checked_at: 2026-06-11T13:39:55.249Z
generated_at: 2026-06-11T13:39:55.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document references \"projector\" throughout (laser illumination, warp, blending, lens shift) — may not fully match ClickShare CX Series hardware capabilities. Verify which subset applies to this device family."
  - "firmware version compatibility not stated in source"
  - "no explicit multi-step sequences defined in source"
  - "source does not contain explicit safety warnings, interlock"
  - "source document uses \"projector\" terminology throughout but is assigned to ClickShare CX Series entity — confirm device family applicability"
  - "firmware version compatibility ranges not stated"
  - "protocol version not stated"
  - "maximum concurrent TCP connections not stated"
  - "authentication passcode format/range not specified beyond example value 98765"
  - "exact list of available sources varies by device model"
  - "HTTP API authentication for file endpoints not specified"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:39:55.249Z
  matched_actions: 195
  action_count: 195
  confidence: medium
  summary: "All 195 spec actions have literal method-name matches in the source's alphabetical Methods section; transport parameters verbatim. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Barco ClickShare CX Series Control Spec

## Summary

Barco ClickShare CX Series devices use the Pulse platform JSON-RPC 2.0 API over TCP/IP (port 9090) and RS-232 serial for control. The API exposes system power management, source routing, illumination control, image adjustment (brightness, contrast, saturation, gamma, sharpness), warp/blend/black-level processing, optics (zoom, focus, lens shift, shutter), DMX, environment monitoring, firmware management, and notification handling.

<!-- UNRESOLVED: source document references "projector" throughout (laser illumination, warp, blending, lens shift) — may not fully match ClickShare CX Series hardware capabilities. Verify which subset applies to this device family. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  # Source states: "A client session must start with an authentication request
  # containing a secret pass code." Authentication is only necessary for
  # elevated access; normal end-user access can skip it.
```

## Traits
```yaml
traits:
  - powerable     # system.poweron / system.poweroff
  - routable      # image.window.main.source routing via property.set
  - queryable     # property.get for many state queries
  - levelable     # brightness, contrast, saturation, gamma, sharpness, laser power, intensity
```

## Actions
```yaml
# ===================================================================
# System
# ===================================================================

- id: system_poweron
  label: Power On
  kind: action
  command: 'system.poweron'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: 'system.poweroff'
  params: []

- id: system_reboot
  label: Reboot
  kind: action
  command: 'system.reboot'
  params: []

- id: system_gotoeco
  label: Go to ECO Mode
  kind: action
  command: 'system.gotoeco'
  params: []

- id: system_gotoready
  label: Go to Ready Mode
  kind: action
  command: 'system.gotoready'
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: 'system.activity'
  params: []

- id: system_getidentification
  label: Get Identification
  kind: query
  command: 'system.getidentification'
  params:
    - name: identification
      type: string
      description: The identification key to query

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: 'system.getidentifications'
  params: []

- id: system_getsystemdate
  label: Get System Date
  kind: query
  command: 'system.getsystemdate'
  params: []

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: 'system.listresetdomains'
  params: []

- id: system_reset
  label: Reset Domains
  kind: action
  command: 'system.reset'
  params:
    - name: domains
      type: array
      description: >-
        List of domains to reset. Values: ImageConnector, ImageSource,
        ImageFeatures, ImageRealColor, ImageWarp, ImageBlend,
        ImageOrientation, ImageResolution, ImageStereo, ImageDisplay,
        ImageTestPattern, ImageConvergence, UserInterface, Optics,
        Illumination, Network, Screen, System, LightMeasurement, Dmx

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: 'system.resetall'
  params: []

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: 'system.boards.getboardlist'
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: 'system.boards.getboardinfo'
  params:
    - name: boardname
      type: string
      description: Name of the board to query

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: 'system.boards.getdeviceinfo'
  params:
    - name: boardname
      type: string
      description: Name of the board

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: 'system.boards.getmoduleinfo'
  params:
    - name: boardname
      type: string
      description: Name of the board

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: 'system.boards.getmissingboardlist'
  params: []

- id: system_license_flexbrightness_getcode
  label: Get Flex Brightness Light Output Code
  kind: query
  command: 'system.license.option.flexbrightness.getmaximumlightoutputcode'
  params:
    - name: lightoutput
      type: integer
      description: Light output value

- id: system_license_flexbrightness_setoutput
  label: Set Flex Brightness Light Output
  kind: action
  command: 'system.license.option.flexbrightness.setmaximumlightoutput'
  params:
    - name: code
      type: string
      description: Authorization code
    - name: lightoutput
      type: integer
      description: Maximum light output value

- id: system_license_flexbrightness_setcode
  label: Set Flex Brightness Light Output Code
  kind: action
  command: 'system.license.option.flexbrightness.setmaximumlightoutputcode'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string

# ===================================================================
# Authentication
# ===================================================================

- id: authenticate
  label: Authenticate
  kind: action
  command: 'authenticate'
  params:
    - name: code
      type: integer
      description: Secret passcode for elevated access

# ===================================================================
# Generic Property API
# ===================================================================

- id: property_set
  label: Set Property
  kind: action
  command: 'property.set'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness)
    - name: value
      type: any
      description: Value to set (type depends on property)

- id: property_get
  label: Get Property
  kind: query
  command: 'property.get'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or array of property names

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: 'property.subscribe'
  params:
    - name: property
      type: string
      description: Property name or array of property names to observe

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: 'property.unsubscribe'
  params:
    - name: property
      type: string
      description: Property name or array of property names

# ===================================================================
# Signal API
# ===================================================================

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: 'signal.subscribe'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: 'signal.unsubscribe'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

# ===================================================================
# Introspection
# ===================================================================

- id: introspect
  label: Introspect Object
  kind: query
  command: 'introspect'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty for all)
    - name: recursive
      type: boolean
      description: If true, recurse into child objects

# ===================================================================
# LED Control
# ===================================================================

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: 'ledctrl.blink'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: led_activity
  label: Activate LEDs
  kind: action
  command: 'led.activity'
  params: []

- id: led_list
  label: List LEDs
  kind: query
  command: 'led.list'
  params: []

# ===================================================================
# Image Sources
# ===================================================================

- id: image_source_list
  label: List Sources
  kind: query
  command: 'image.source.list'
  params: []

- id: image_source_l1displayport_listconnectors
  label: List Connectors for L1 DisplayPort Source
  kind: query
  command: 'image.source.l1displayport.listconnectors'
  params: []

- id: image_source_l1hdbaset1_listconnectors
  label: List Connectors for L1 HDBaseT 1 Source
  kind: query
  command: 'image.source.l1hdbaset1.listconnectors'
  params: []

- id: image_source_l1hdbaset2_listconnectors
  label: List Connectors for L1 HDBaseT 2 Source
  kind: query
  command: 'image.source.l1hdbaset2.listconnectors'
  params: []

- id: image_source_l1hdmi_listconnectors
  label: List Connectors for L1 HDMI Source
  kind: query
  command: 'image.source.l1hdmi.listconnectors'
  params: []

- id: image_source_l1quadsdi_listconnectors
  label: List Connectors for L1 Quad SDI Source
  kind: query
  command: 'image.source.l1quadsdi.listconnectors'
  params: []

- id: image_source_l1sdia_listconnectors
  label: List Connectors for L1 SDI A Source
  kind: query
  command: 'image.source.l1sdia.listconnectors'
  params: []

- id: image_source_l1sdib_listconnectors
  label: List Connectors for L1 SDI B Source
  kind: query
  command: 'image.source.l1sdib.listconnectors'
  params: []

- id: image_source_l1sdic_listconnectors
  label: List Connectors for L1 SDI C Source
  kind: query
  command: 'image.source.l1sdic.listconnectors'
  params: []

- id: image_source_l1sdid_listconnectors
  label: List Connectors for L1 SDI D Source
  kind: query
  command: 'image.source.l1sdid.listconnectors'
  params: []

- id: image_source_l2displayporta_listconnectors
  label: List Connectors for L2 DisplayPort A Source
  kind: query
  command: 'image.source.l2displayporta.listconnectors'
  params: []

- id: image_source_l2displayportb_listconnectors
  label: List Connectors for L2 DisplayPort B Source
  kind: query
  command: 'image.source.l2displayportb.listconnectors'
  params: []

- id: image_source_l2displayportc_listconnectors
  label: List Connectors for L2 DisplayPort C Source
  kind: query
  command: 'image.source.l2displayportc.listconnectors'
  params: []

- id: image_source_l2displayportd_listconnectors
  label: List Connectors for L2 DisplayPort D Source
  kind: query
  command: 'image.source.l2displayportd.listconnectors'
  params: []

- id: image_source_l2dualdpab_listconnectors
  label: List Connectors for L2 Dual DP AB Source
  kind: query
  command: 'image.source.l2dualdpab.listconnectors'
  params: []

- id: image_source_l2dualdpac_listconnectors
  label: List Connectors for L2 Dual DP AC Source
  kind: query
  command: 'image.source.l2dualdpac.listconnectors'
  params: []

- id: image_source_l2dualdpbd_listconnectors
  label: List Connectors for L2 Dual DP BD Source
  kind: query
  command: 'image.source.l2dualdpbd.listconnectors'
  params: []

- id: image_source_l2dualdpcd_listconnectors
  label: List Connectors for L2 Dual DP CD Source
  kind: query
  command: 'image.source.l2dualdpcd.listconnectors'
  params: []

- id: image_source_l2dualheaddpac_listconnectors
  label: List Connectors for L2 Dual Head DP AC Source
  kind: query
  command: 'image.source.l2dualheaddpac.listconnectors'
  params: []

- id: image_source_l2dualheaddpbd_listconnectors
  label: List Connectors for L2 Dual Head DP BD Source
  kind: query
  command: 'image.source.l2dualheaddpbd.listconnectors'
  params: []

- id: image_source_l2dualheaddualdpabcd_listconnectors
  label: List Connectors for L2 Dual Head Dual DP ABCD Source
  kind: query
  command: 'image.source.l2dualheaddualdpabcd.listconnectors'
  params: []

- id: image_source_l2quadcolumndp_listconnectors
  label: List Connectors for L2 Quad Column DP Source
  kind: query
  command: 'image.source.l2quadcolumndp.listconnectors'
  params: []

- id: image_source_l2quaddp_listconnectors
  label: List Connectors for L2 Quad DP Source
  kind: query
  command: 'image.source.l2quaddp.listconnectors'
  params: []

# ===================================================================
# Image Connectors
# ===================================================================

- id: image_connector_list
  label: List Connectors
  kind: query
  command: 'image.connector.list'
  params: []

- id: image_connector_l1displayport_edid_list
  label: List EDID for L1 DisplayPort Connector
  kind: query
  command: 'image.connector.l1displayport.edid.list'
  params: []

- id: image_connector_l1hdbaset1_edid_list
  label: List EDID for L1 HDBaseT 1 Connector
  kind: query
  command: 'image.connector.l1hdbaset1.edid.list'
  params: []

- id: image_connector_l1hdbaset2_edid_list
  label: List EDID for L1 HDBaseT 2 Connector
  kind: query
  command: 'image.connector.l1hdbaset2.edid.list'
  params: []

- id: image_connector_l1hdmi_edid_list
  label: List EDID for L1 HDMI Connector
  kind: query
  command: 'image.connector.l1hdmi.edid.list'
  params: []

- id: image_connector_l2displayporta_edid_list
  label: List EDID for L2 DisplayPort A Connector
  kind: query
  command: 'image.connector.l2displayporta.edid.list'
  params: []

- id: image_connector_l2displayportb_edid_list
  label: List EDID for L2 DisplayPort B Connector
  kind: query
  command: 'image.connector.l2displayportb.edid.list'
  params: []

- id: image_connector_l2displayportc_edid_list
  label: List EDID for L2 DisplayPort C Connector
  kind: query
  command: 'image.connector.l2displayportc.edid.list'
  params: []

- id: image_connector_l2displayportd_edid_list
  label: List EDID for L2 DisplayPort D Connector
  kind: query
  command: 'image.connector.l2displayportd.edid.list'
  params: []

# ===================================================================
# Image Color
# ===================================================================

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: 'image.color.p7.custom.copypresettocustom'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: 'image.color.p7.custom.resetpreset'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: 'image.color.p7.custom.resettonative'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: 'image.color.rgbmode.nextrgbmode'
  params: []

# ===================================================================
# Image Display
# ===================================================================

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: 'image.display.listdisplaymodes'
  params: []

# ===================================================================
# Image Processing - Black Level
# ===================================================================

- id: image_processing_blacklevel_getblacklevelarea
  label: Get Black Level Area
  kind: query
  command: 'image.processing.blacklevel.basicblacklevel.getblacklevelarea'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blacklevel_getwarpedblacklevelarea
  label: Get Warped Black Level Area
  kind: query
  command: 'image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level File
  kind: action
  command: 'image.processing.blacklevel.file.delete'
  params:
    - name: filename
      type: string
      description: Name of the file to delete

- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: query
  command: 'image.processing.blacklevel.file.list'
  params: []

# ===================================================================
# Image Processing - Blend
# ===================================================================

- id: image_processing_blend_getblendarea
  label: Get Blend Area
  kind: query
  command: 'image.processing.blend.basicblend.getblendarea'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: 'image.processing.blend.basicblend.getwarpedblendarea'
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: 'image.processing.blend.file.delete'
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: 'image.processing.blend.file.list'
  params: []

# ===================================================================
# Image Processing - Warp
# ===================================================================

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: 'image.processing.warp.file.delete'
  params:
    - name: filename
      type: string

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: 'image.processing.warp.file.list'
  params: []

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Warp Four Corners
  kind: query
  command: 'image.processing.warp.fourcorners.getscaledcorners'
  params:
    - name: resolution
      type: object
      description: Resolution object with x and y integers

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: 'image.processing.warp.warpscaledpoints'
  params:
    - name: points
      type: array
      description: Array of {X: float, Y: float} objects
    - name: resolution
      type: object
      description: Resolution object with X and Y floats

# ===================================================================
# Image Processing - Warp Grid
# ===================================================================

- id: image_processing_warpgrid_getgrid
  label: Get Warp Grid
  kind: query
  command: 'image.processing.warpgrid.getgrid'
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: 'image.processing.warpgrid.getgridsize'
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: 'image.processing.warpgrid.getscaledgrid'
  params:
    - name: resolution
      type: object
      description: Resolution object with x and y integers

# ===================================================================
# Image Resolution
# ===================================================================

- id: image_resolution_list
  label: List Resolutions
  kind: query
  command: 'image.resolution.list'
  params: []

# ===================================================================
# Image Stereo
# ===================================================================

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: 'image.stereo.listdarktime'
  params: []

# ===================================================================
# Image Test Patterns
# ===================================================================

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: 'image.testpattern.file.delete'
  params:
    - name: filename
      type: string

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: 'image.testpattern.file.list'
  params: []

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: 'image.testpattern.list'
  params: []

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: 'image.testpattern.setproperties'
  params:
    - name: id
      type: string
      description: Pattern ID
    - name: properties
      type: array
      description: Array of {key: string, value: string} pairs

# ===================================================================
# Image Windows
# ===================================================================

- id: image_window_list
  label: List Windows
  kind: query
  command: 'image.window.list'
  params: []

# ===================================================================
# Key Dispatcher
# ===================================================================

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: 'keydispatcher.sendclickevent'
  params:
    - name: key
      type: string
      description: >-
        Key identifier. Values: RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE,
        RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB,
        RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP,
        RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS,
        RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT,
        RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1..RC_9, RC_0,
        RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT,
        KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS,
        KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: 'keydispatcher.sendpressevent'
  params:
    - name: key
      type: string
      description: Key identifier (same values as keydispatcher.sendclickevent)

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: 'keydispatcher.sendreleaseevent'
  params:
    - name: key
      type: string
      description: Key identifier (same values as keydispatcher.sendclickevent)

# ===================================================================
# Light Measurement
# ===================================================================

- id: lightmeasurement_getlightoutput
  label: Get Light Output
  kind: query
  command: 'lightmeasurement.getlightoutput'
  params: []

# ===================================================================
# Network
# ===================================================================

- id: network_list
  label: List Network Devices
  kind: query
  command: 'network.list'
  params: []

# ===================================================================
# Notifications
# ===================================================================

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: 'notification.dismiss'
  params:
    - name: id
      type: string
      description: Notification ID
    - name: response
      type: string
      description: >-
        Dismissal response. Values: NONE, OK, CANCEL, IGNORE, YES, NO,
        SUPPRESS

- id: notification_list
  label: List Active Notifications
  kind: query
  command: 'notification.list'
  params: []

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: 'notification.listsuppressed'
  params: []

- id: notification_log
  label: Get Notification Log
  kind: query
  command: 'notification.log'
  params:
    - name: minimumseverity
      type: string
      description: >-
        Minimum severity. Values: INFO, CAUTION, WARNING, ERROR, CRITICAL
    - name: start
      type: integer
    - name: count
      type: integer

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: 'notification.suppress'
  params:
    - name: code
      type: string
      description: Notification code to suppress

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: 'notification.unsuppress'
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: 'notification.unsuppressall'
  params: []

# ===================================================================
# Optics - Focus
# ===================================================================

- id: optics_focus_addlocation
  label: Focus Add Location
  kind: action
  command: 'optics.focus.addlocation'
  params:
    - name: location
      type: string
      description: Location name

- id: optics_focus_calibrate
  label: Focus Calibrate
  kind: action
  command: 'optics.focus.calibrate'
  params: []

- id: optics_focus_runforward
  label: Focus Run Forward
  kind: action
  command: 'optics.focus.runforward'
  params: []

- id: optics_focus_runforwardtime
  label: Focus Run Forward for Duration
  kind: action
  command: 'optics.focus.runforwardtime'
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds

- id: optics_focus_runreverse
  label: Focus Run Reverse
  kind: action
  command: 'optics.focus.runreverse'
  params: []

- id: optics_focus_runreversetime
  label: Focus Run Reverse for Duration
  kind: action
  command: 'optics.focus.runreversetime'
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds

- id: optics_focus_setlocation
  label: Focus Set Location
  kind: action
  command: 'optics.focus.setlocation'
  params:
    - name: location
      type: string

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: 'optics.focus.stepforward'
  params: []

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: 'optics.focus.stepreverse'
  params: []

- id: optics_focus_stop
  label: Focus Stop
  kind: action
  command: 'optics.focus.stop'
  params: []

# ===================================================================
# Optics - General
# ===================================================================

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: 'optics.getvalidlensids'
  params: []

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: 'optics.setlensid'
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_shifttocenter
  label: Shift Lens to Center
  kind: action
  command: 'optics.shifttocenter'
  params: []

# ===================================================================
# Optics - Lens Shift Horizontal
# ===================================================================

- id: optics_lensshift_horizontal_addlocation
  label: Lens Shift Horizontal Add Location
  kind: action
  command: 'optics.lensshift.horizontal.addlocation'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_calibrate
  label: Lens Shift Horizontal Calibrate
  kind: action
  command: 'optics.lensshift.horizontal.calibrate'
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Lens Shift Horizontal Run Forward
  kind: action
  command: 'optics.lensshift.horizontal.runforward'
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens Shift Horizontal Run Forward for Duration
  kind: action
  command: 'optics.lensshift.horizontal.runforwardtime'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_runreverse
  label: Lens Shift Horizontal Run Reverse
  kind: action
  command: 'optics.lensshift.horizontal.runreverse'
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Lens Shift Horizontal Run Reverse for Duration
  kind: action
  command: 'optics.lensshift.horizontal.runreversetime'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_setlocation
  label: Lens Shift Horizontal Set Location
  kind: action
  command: 'optics.lensshift.horizontal.setlocation'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_stepforward
  label: Lens Shift Horizontal Step Forward
  kind: action
  command: 'optics.lensshift.horizontal.stepforward'
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Lens Shift Horizontal Step Reverse
  kind: action
  command: 'optics.lensshift.horizontal.stepreverse'
  params: []

- id: optics_lensshift_horizontal_stop
  label: Lens Shift Horizontal Stop
  kind: action
  command: 'optics.lensshift.horizontal.stop'
  params: []

# ===================================================================
# Optics - Lens Shift Vertical
# ===================================================================

- id: optics_lensshift_vertical_addlocation
  label: Lens Shift Vertical Add Location
  kind: action
  command: 'optics.lensshift.vertical.addlocation'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_calibrate
  label: Lens Shift Vertical Calibrate
  kind: action
  command: 'optics.lensshift.vertical.calibrate'
  params: []

- id: optics_lensshift_vertical_runforward
  label: Lens Shift Vertical Run Forward
  kind: action
  command: 'optics.lensshift.vertical.runforward'
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens Shift Vertical Run Forward for Duration
  kind: action
  command: 'optics.lensshift.vertical.runforwardtime'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_runreverse
  label: Lens Shift Vertical Run Reverse
  kind: action
  command: 'optics.lensshift.vertical.runreverse'
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Lens Shift Vertical Run Reverse for Duration
  kind: action
  command: 'optics.lensshift.vertical.runreversetime'
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_setlocation
  label: Lens Shift Vertical Set Location
  kind: action
  command: 'optics.lensshift.vertical.setlocation'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_stepforward
  label: Lens Shift Vertical Step Forward
  kind: action
  command: 'optics.lensshift.vertical.stepforward'
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Lens Shift Vertical Step Reverse
  kind: action
  command: 'optics.lensshift.vertical.stepreverse'
  params: []

- id: optics_lensshift_vertical_stop
  label: Lens Shift Vertical Stop
  kind: action
  command: 'optics.lensshift.vertical.stop'
  params: []

# ===================================================================
# Optics - Shutter
# ===================================================================

- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: 'optics.shutter.getobjectpath'
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: 'optics.shutter.toggle'
  params: []

# ===================================================================
# Optics - Zoom
# ===================================================================

- id: optics_zoom_addlocation
  label: Zoom Add Location
  kind: action
  command: 'optics.zoom.addlocation'
  params:
    - name: location
      type: string

- id: optics_zoom_calibrate
  label: Zoom Calibrate
  kind: action
  command: 'optics.zoom.calibrate'
  params: []

- id: optics_zoom_runforward
  label: Zoom Run Forward
  kind: action
  command: 'optics.zoom.runforward'
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Run Forward for Duration
  kind: action
  command: 'optics.zoom.runforwardtime'
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_runreverse
  label: Zoom Run Reverse
  kind: action
  command: 'optics.zoom.runreverse'
  params: []

- id: optics_zoom_runreversetime
  label: Zoom Run Reverse for Duration
  kind: action
  command: 'optics.zoom.runreversetime'
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_setlocation
  label: Zoom Set Location
  kind: action
  command: 'optics.zoom.setlocation'
  params:
    - name: location
      type: string

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: 'optics.zoom.stepforward'
  params: []

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: 'optics.zoom.stepreverse'
  params: []

- id: optics_zoom_stop
  label: Zoom Stop
  kind: action
  command: 'optics.zoom.stop'
  params: []

# ===================================================================
# Peripheral Frame - Horizontal
# ===================================================================

- id: peripheral_frame_horizontal_calibrate
  label: Frame Horizontal Calibrate
  kind: action
  command: 'peripheral.frame.horizontal.calibrate'
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame Horizontal Run Forward
  kind: action
  command: 'peripheral.frame.horizontal.runforward'
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame Horizontal Run Reverse
  kind: action
  command: 'peripheral.frame.horizontal.runreverse'
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame Horizontal Step Forward
  kind: action
  command: 'peripheral.frame.horizontal.stepforward'
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame Horizontal Step Reverse
  kind: action
  command: 'peripheral.frame.horizontal.stepreverse'
  params: []

- id: peripheral_frame_horizontal_stop
  label: Frame Horizontal Stop
  kind: action
  command: 'peripheral.frame.horizontal.stop'
  params: []

# ===================================================================
# Peripheral Frame - Rotation
# ===================================================================

- id: peripheral_frame_rotation_calibrate
  label: Frame Rotation Calibrate
  kind: action
  command: 'peripheral.frame.rotation.calibrate'
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation Run Forward
  kind: action
  command: 'peripheral.frame.rotation.runforward'
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation Run Reverse
  kind: action
  command: 'peripheral.frame.rotation.runreverse'
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation Step Forward
  kind: action
  command: 'peripheral.frame.rotation.stepforward'
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation Step Reverse
  kind: action
  command: 'peripheral.frame.rotation.stepreverse'
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame Rotation Stop
  kind: action
  command: 'peripheral.frame.rotation.stop'
  params: []

# ===================================================================
# Peripheral Frame - Vertical
# ===================================================================

- id: peripheral_frame_vertical_calibrate
  label: Frame Vertical Calibrate
  kind: action
  command: 'peripheral.frame.vertical.calibrate'
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame Vertical Run Forward
  kind: action
  command: 'peripheral.frame.vertical.runforward'
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame Vertical Run Reverse
  kind: action
  command: 'peripheral.frame.vertical.runreverse'
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame Vertical Step Forward
  kind: action
  command: 'peripheral.frame.vertical.stepforward'
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame Vertical Step Reverse
  kind: action
  command: 'peripheral.frame.vertical.stepreverse'
  params: []

- id: peripheral_frame_vertical_stop
  label: Frame Vertical Stop
  kind: action
  command: 'peripheral.frame.vertical.stop'
  params: []

# ===================================================================
# Remote Control
# ===================================================================

- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: 'remotecontrol.listsensors'
  params: []

# ===================================================================
# Statistics
# ===================================================================

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Counter Name
  kind: query
  command: 'statistics.laserruntime.getname'
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Counter Unit
  kind: query
  command: 'statistics.laserruntime.getunit'
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Counter Name
  kind: query
  command: 'statistics.laserstrikes.getname'
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Counter Unit
  kind: query
  command: 'statistics.laserstrikes.getunit'
  params: []

- id: statistics_listcounters
  label: List All Counters
  kind: query
  command: 'statistics.listcounters'
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Counter Name
  kind: query
  command: 'statistics.projectorruntime.getname'
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Counter Unit
  kind: query
  command: 'statistics.projectorruntime.getunit'
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Counter Name
  kind: query
  command: 'statistics.systemtime.getname'
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Counter Unit
  kind: query
  command: 'statistics.systemtime.getunit'
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Counter Name
  kind: query
  command: 'statistics.uptime.getname'
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Counter Unit
  kind: query
  command: 'statistics.uptime.getunit'
  params: []

# ===================================================================
# UI
# ===================================================================

- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: 'ui.settings.get'
  params:
    - name: key
      type: string

- id: ui_settings_getfonticons
  label: Get Font Icons
  kind: query
  command: 'ui.settings.getfonticons'
  params:
    - name: category
      type: string
      description: Values: Source, Connector, TestPattern

- id: ui_settings_geticons
  label: Get Icons
  kind: query
  command: 'ui.settings.geticons'
  params:
    - name: category
      type: string
      description: Values: Source, Connector, TestPattern

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: 'ui.settings.keys'
  params: []

- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: 'ui.settings.list'
  params: []

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: 'ui.settings.remove'
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: 'ui.settings.set'
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (Deprecated)
  kind: action
  command: 'ui.togglestealthmode'
  params: []

# ===================================================================
# Environment
# ===================================================================

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: 'environment.getcontrolblocks'
  params:
    - name: type
      type: string
      description: >-
        Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: >-
        Values: Temperature, Speed, PWM, Voltage, Current, Power,
        Altitude, Pressure, Humidity, ADC, Coordinate, Peltier,
        Waveform, Average, Delay, Difference, Interpolation, Limit,
        Median, Noise, Weighting, Comparison, Threshold, Formula,
        Driver, PID, Mode, State, Pump, Resistance, Simulation,
        Constant, Manual, Range, Any

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: 'environment.getalarminfo'
  params: []

# ===================================================================
# Firmware
# ===================================================================

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: 'firmware.listcomponents'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: 'firmware.listcomponentversionstatus'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: 'firmware.schedulecomponentupgrade'
  params: []

# ===================================================================
# Illumination
# ===================================================================

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: 'illumination.clo.engage'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: 'illumination.laser.getserialnumber'
  params: []

# ===================================================================
# DMX
# ===================================================================

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: 'dmx.listchannels'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: 'dmx.listmodes'
  params: []

# ===================================================================
# ECO Mode Wake (Serial Only)
# ===================================================================

- id: eco_wake_serial
  label: ECO Mode Wake via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII command sent over RS-232 serial to wake device from ECO mode
```

## Feedbacks
```yaml
# property.changed notification - delivered when a subscribed property value changes
- id: property_changed
  type: object
  description: >-
    Unsolicited notification sent by the device when a subscribed property
    changes. Contains an array of property/value pairs.
  values:
    - property_changed

# signal.callback notification - delivered when a subscribed signal fires
- id: signal_callback
  type: object
  description: >-
    Unsolicited notification sent by the device when a subscribed signal fires.
    Contains an array of signal/argument-list pairs.
  values:
    - signal_callback

# system.state feedback
- id: system_state
  type: enum
  description: Current operating state of the device
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - error

# illumination.state feedback
- id: illumination_state
  type: enum
  description: State of the illumination (light source)
  values:
    - "On"
    - "Off"

# environment.alarmstate feedback
- id: environment_alarmstate
  type: enum
  description: Current alarm state
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

# illumination.clo.state feedback
- id: illumination_clo_state
  type: enum
  description: Constant Light Output state
  values:
    - Ok
    - TooDim
    - TooBright

# gsm.pinstate feedback
- id: gsm_pinstate
  type: enum
  description: GSM SIM card PIN state
  values:
    - Accepted
    - Failed
    - Locked
    - Unknown

# optics.shutter.position feedback
- id: optics_shutter_position
  type: enum
  description: Current shutter position
  values:
    - Open
    - Closed
```

## Variables
```yaml
# Image adjustment properties - set via property.set, read via property.get
- id: image_brightness
  type: float
  min: -1
  max: 1
  step: 0.01
  description: Image brightness/offset (0=default)

- id: image_contrast
  type: float
  min: 0
  max: 2
  step: 0.01
  description: Image contrast/gain (1=default)

- id: image_saturation
  type: float
  min: 0
  max: 2
  step: 0.01
  description: Color saturation (1=default)

- id: image_gamma
  type: float
  min: 1
  max: 3
  step: 0.1
  description: Image gamma (default 2.2)

- id: image_sharpness
  type: integer
  min: -2
  max: 8
  step: 1
  description: Image sharpness

- id: image_intensity
  type: float
  min: 0
  max: 1
  step: 0.01
  description: Intensity

- id: image_window_main_source
  type: string
  description: >-
    Active source name for main window (e.g. DisplayPort 1, HDMI)

- id: illumination_sources_laser_power
  type: float
  description: Laser power percentage

- id: illumination_clo_setpoint
  type: float
  description: CLO target luminosity

- id: illumination_clo_scale
  type: float
  description: CLO setpoint scaling percentage

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR
  description: Projection orientation

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch
  description: Source scaling mode

- id: image_display_desireddisplaymode
  type: enum
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift
  description: Desired display mode

- id: ui_backlight_state
  type: enum
  values:
    - "Off"
    - "On"
    - Auto
  description: LCD backlight state

- id: ui_stealthmode
  type: enum
  values:
    - "Off"
    - "On"
  description: Stealth mode (all controllable LEDs off)

- id: remotecontrol_address
  type: integer
  min: 1
  max: 31
  description: Remote control address

- id: screen_hdrboost
  type: float
  min: 0.8
  max: 1.2
  step: 0.01
  description: HDR intensity boost

- id: screen_luminance
  type: float
  min: 50
  max: 10000
  step: 1
  description: Maximum screen luminance in cd/m2

- id: dmx_startchannel
  type: integer
  description: DMX start channel (1-512)

- id: dmx_artnet
  type: boolean
  description: Artnet enabled or not

- id: image_processing_transportdelay_desired
  type: integer
  description: Desired transport delay

- id: image_color_p7_custom_whitetemperature
  type: integer
  min: 3200
  max: 13000
  step: 100
  description: White point temperature

- id: system_initialstate
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
  description: State to transition to on startup

- id: network_device_lan_configuration
  type: enum
  values:
    - AUTO
    - MANUAL
  description: LAN configuration method
```

## Events
```yaml
# Unsolicited notifications the device sends
- id: property_changed_event
  description: >-
    property.changed notification. Delivered when a subscribed property
    value changes. Method: "property.changed", params: {property:
    [{objectname.propertyname: value}, ...]}

- id: signal_callback_event
  description: >-
    signal.callback notification. Delivered when a subscribed signal fires.
    Method: "signal.callback", params: {signal:
    [{objectname.signalname: {arg1: val}}, ...]}

- id: modelupdated_event
  description: >-
    modelupdated signal. Fires when objects appear or disappear.
    Arguments: object (string), newobject (bool), accesslevel (enum).

- id: notification_emitted_event
  description: >-
    notification.emitted signal. Fires when a new notification is generated.
    Includes severity, id, code, timestamp, message, timeout, actions.

- id: notification_dismissed_event
  description: >-
    notification.dismissed signal. Fires when a notification is dismissed.
    Includes id and response.

- id: network_added_event
  description: Raised when a new network device is added.

- id: network_removed_event
  description: Raised when a network device is removed.

- id: system_performed_event
  description: >-
    Emitted when one or more reset domains have completed resetting.

- id: system_identificationchanged_event
  description: Raised when an identification value changes.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock
# procedures, or power-on sequencing requirements beyond noting that it is
# good practice to verify system.state before issuing power commands.
```

## Notes

The API uses JSON-RPC 2.0 over both TCP (port 9090) and RS-232 serial. All commands share the same format regardless of transport. The `property.set` / `property.get` methods form the backbone of the API — most device control is done by reading and writing named properties in dot notation (e.g. `image.brightness`, `illumination.sources.laser.power`). It is best practice to wait for the confirmation response from `property.set` before setting the same property again.

Authentication with a secret passcode is required for elevated access (power user and above). Normal end-user access does not require authentication.

The `introspect` method provides runtime discovery of all available objects, methods, properties, and signals — including type constraints (min/max/step/precision for numeric values, enum values for enumeration types).

File upload/download (warp grids, blend masks, black level masks, EDID files, firmware, test patterns) uses HTTP POST/GET at `http://{device-ip}/api/{endpoint}`.

To wake from ECO mode via serial, send the ASCII string `:POWR1\r` (not JSON-RPC).

<!-- UNRESOLVED: source document uses "projector" terminology throughout but is assigned to ClickShare CX Series entity — confirm device family applicability -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: protocol version not stated -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: authentication passcode format/range not specified beyond example value 98765 -->
<!-- UNRESOLVED: exact list of available sources varies by device model -->
<!-- UNRESOLVED: HTTP API authentication for file endpoints not specified -->
````Spec generated. ~160 actions enumerated covering all methods from the source. Key flags:

- **Source mismatch**: Document describes Barco Pulse projector API (laser, warp, lens shift, blending) but entity is ClickShare CX Series. Verify applicability.
- **Auth**: `type: passcode` — source states auth required for elevated access; normal user access skips it.
- **ECO wake**: Special ASCII `:POWR1\r` on serial, not JSON-RPC.
- **No fabricated values** — port 9090, baud 19200, serial config all from source verbatim.

## Provenance

```yaml
source_domains:
  - barco.com
source_urls:
  - https://www.barco.com/manuals/R5915531/index
retrieved_at: 2026-06-10T18:13:23.212Z
last_checked_at: 2026-06-11T13:39:55.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:39:55.249Z
matched_actions: 195
action_count: 195
confidence: medium
summary: "All 195 spec actions have literal method-name matches in the source's alphabetical Methods section; transport parameters verbatim. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document references \"projector\" throughout (laser illumination, warp, blending, lens shift) — may not fully match ClickShare CX Series hardware capabilities. Verify which subset applies to this device family."
- "firmware version compatibility not stated in source"
- "no explicit multi-step sequences defined in source"
- "source does not contain explicit safety warnings, interlock"
- "source document uses \"projector\" terminology throughout but is assigned to ClickShare CX Series entity — confirm device family applicability"
- "firmware version compatibility ranges not stated"
- "protocol version not stated"
- "maximum concurrent TCP connections not stated"
- "authentication passcode format/range not specified beyond example value 98765"
- "exact list of available sources varies by device model"
- "HTTP API authentication for file endpoints not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
