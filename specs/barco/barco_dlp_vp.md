---
spec_id: admin/barco-dlp-vp
schema_version: ai4av-public-spec-v1
revision: 2
title: "Barco DLP VP Control Spec"
manufacturer: Barco
model_family: "Barco DLP VP"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco DLP VP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T03:47:59.335Z
last_checked_at: 2026-07-12T08:50:30.927Z
generated_at: 2026-07-12T08:50:30.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants not identified in source; list of available sources varies by projector model"
  - "per-connector property variants not enumerated individually; source documents ~30 distinct connector objects each with 4-5 properties"
  - "no explicit safety warnings or interlock procedures beyond operational notes in source"
  - "specific model name/variant not stated in source (generic \"DLP VP\" used)"
  - "firmware version not stated in source"
  - "full list of available sources/connectors not fixed (varies by model)"
  - "auth pass code format/length not specified beyond example value 98765"
  - "per-connector property variants (~30 connector objects) not individually enumerated as Variables; see source \"Properties\" alphabetical list"
  - "image.color.p7.custom.* color-management sub-properties (~40 coordinate/gain/luminance fields) not individually enumerated; source documents full CIE xy-coordinate + gain + luminance set for RGB/CMY/white"
  - "image.processing.warp.bow.* and fourcorners.* geometry sub-properties documented but not individually enumerated"
  - "ui.layer.* overlay rendering properties (adjustment, basicblacklevel, basicblend, fourcorner, grid, advancedblend) documented but not individually enumerated"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:50:30.927Z
  matched_actions: 208
  action_count: 208
  confidence: medium
  summary: "All 208 JSON-RPC/ASCII/HTTP spec actions match literal source commands one-to-one (S~207 incl. one command exposed under two ids); transport verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Barco DLP VP Control Spec

## Summary
Barco DLP VP projector controlled via JSON-RPC 2.0 over TCP (port 9090) or RS-232 serial. All commands are identical across both transport types. Authentication is optional; elevated access requires a pass code. The device supports power control, source routing, image adjustment, warp/blend configurations, optic motor control (focus/zoom/lens shift/shutter), environment monitoring, DMX, notifications, firmware management, and UI/OSD control.

<!-- UNRESOLVED: specific model variants not identified in source; list of available sources varies by projector model -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # TCP port for Pulse services
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: optional  # normal end user access requires no auth; elevated access uses authenticate method with pass code
```

## Traits
```yaml
- powerable     # system.poweron / system.poweroff / system.gotoeco / system.gotoready present
- queryable     # property.get, property.subscribe present
- routable      # image.window.main.source selection + image.source.list present
- levelable     # brightness, contrast, gamma, illumination power control present
```

## Actions
```yaml
# All JSON-RPC actions carry command equal to the method string. The full
# JSON-RPC 2.0 envelope is:
#   { "jsonrpc": "2.0", "method": "<command>", "params": {...}, "id": <n> }
# See Notes for transport details.

# ============================================================
# Core JSON-RPC service API
# ============================================================

- id: property_set
  label: Set Property Value
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Property path (e.g., "image.brightness")
    - name: value
      type: any
      description: New value for the property

- id: property_get
  label: Get Property Value
  kind: query
  command: "property.get"
  params:
    - name: property
      type: any
      description: Property path (string) or array of property paths

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: "property.subscribe"
  params:
    - name: property
      type: any
      description: Property path (string) or array of property paths

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: "property.unsubscribe"
  params:
    - name: property
      type: any
      description: Property path (string) or array of property paths

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: "signal.subscribe"
  params:
    - name: signal
      type: any
      description: Signal name (string) or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: "signal.unsubscribe"
  params:
    - name: signal
      type: any
      description: Signal name (string) or array of signal names

- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: "introspect"
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty = all)
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level)

- id: authenticate
  label: Authenticate
  kind: action
  command: "authenticate"
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: "ledctrl.blink"
  params:
    - name: led
      type: string
      description: LED identifier (e.g., "systemstatus")
    - name: color
      type: string
      description: LED color (e.g., "red")
    - name: period
      type: integer
      description: Blink period

# ============================================================
# System / power control
# ============================================================

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
  label: Go To Eco State
  kind: action
  command: "system.gotoeco"
  params: []

- id: system_gotoready
  label: Go To Ready State
  kind: action
  command: "system.gotoready"
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: "system.activity"
  description: Resets timeout countdown timers
  params: []

- id: system_reboot
  label: Reboot Projector
  kind: action
  command: "system.reboot"
  description: Powers off the projector first, then reboots
  params: []

- id: system_reset
  label: Reset Domains
  kind: action
  command: "system.reset"
  description: Asynchronously resets selected domains; completion signalled by system.performed
  params:
    - name: domains
      type: array
      description: Array of domain enums (ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx)

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
  label: Get System Date (UTC)
  kind: query
  command: "system.getsystemdate"
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: "system.boards.getboardinfo"
  params:
    - name: boardname
      type: string
      description: Board name

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: "system.boards.getboardlist"
  params: []

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: "system.boards.getdeviceinfo"
  description: DEPRECATED. Use GetBoardInfo instead
  params:
    - name: boardname
      type: string

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: "system.boards.getmissingboardlist"
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: "system.boards.getmoduleinfo"
  params:
    - name: boardname
      type: string

- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get Maximum Light Output Code
  kind: query
  command: "system.license.option.flexbrightness.getmaximumlightoutputcode"
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set Maximum Light Output
  kind: action
  command: "system.license.option.flexbrightness.setmaximumlightoutput"
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set Maximum Light Output Code
  kind: action
  command: "system.license.option.flexbrightness.setmaximumlightoutputcode"
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string

# ============================================================
# ECO mode wake (RS-232 ASCII, not JSON-RPC)
# ============================================================

- id: wake_from_eco_serial
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ":POWR1\r"
  description: ASCII wake command sent on RS-232 serial port for projectors in ECO/power save mode
  params: []

# ============================================================
# Sources / connectors / windows
# ============================================================

- id: set_active_source
  label: Set Active Source
  kind: action
  command: "property.set"
  params:
    - name: source
      type: string
      description: Source name (e.g., "DisplayPort 1", "HDMI")

- id: image_source_list
  label: List Available Sources
  kind: query
  command: "image.source.list"
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: "image.connector.list"
  params: []

- id: image_window_list
  label: List Available Windows
  kind: query
  command: "image.window.list"
  params: []

- id: image_resolution_list
  label: List Possible Resolutions
  kind: query
  command: "image.resolution.list"
  params: []

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: "image.display.listdisplaymodes"
  params: []

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: "image.stereo.listdarktime"
  params: []

# Per-source listconnectors methods (each is a distinct source row in source)
- id: image_source_l1displayport_listconnectors
  label: List Connectors - L1 DisplayPort
  kind: query
  command: "image.source.l1displayport.listconnectors"
  params: []

- id: image_source_l1hdbaset1_listconnectors
  label: List Connectors - L1 HDBaseT 1
  kind: query
  command: "image.source.l1hdbaset1.listconnectors"
  params: []

- id: image_source_l1hdbaset2_listconnectors
  label: List Connectors - L1 HDBaseT 2
  kind: query
  command: "image.source.l1hdbaset2.listconnectors"
  params: []

- id: image_source_l1hdmi_listconnectors
  label: List Connectors - L1 HDMI
  kind: query
  command: "image.source.l1hdmi.listconnectors"
  params: []

- id: image_source_l1quadsdi_listconnectors
  label: List Connectors - L1 Quad SDI
  kind: query
  command: "image.source.l1quadsdi.listconnectors"
  params: []

- id: image_source_l1sdia_listconnectors
  label: List Connectors - L1 SDI A
  kind: query
  command: "image.source.l1sdia.listconnectors"
  params: []

- id: image_source_l1sdib_listconnectors
  label: List Connectors - L1 SDI B
  kind: query
  command: "image.source.l1sdib.listconnectors"
  params: []

- id: image_source_l1sdic_listconnectors
  label: List Connectors - L1 SDI C
  kind: query
  command: "image.source.l1sdic.listconnectors"
  params: []

- id: image_source_l1sdid_listconnectors
  label: List Connectors - L1 SDI D
  kind: query
  command: "image.source.l1sdid.listconnectors"
  params: []

- id: image_source_l2displayporta_listconnectors
  label: List Connectors - L2 DisplayPort A
  kind: query
  command: "image.source.l2displayporta.listconnectors"
  params: []

- id: image_source_l2displayportb_listconnectors
  label: List Connectors - L2 DisplayPort B
  kind: query
  command: "image.source.l2displayportb.listconnectors"
  params: []

- id: image_source_l2displayportc_listconnectors
  label: List Connectors - L2 DisplayPort C
  kind: query
  command: "image.source.l2displayportc.listconnectors"
  params: []

- id: image_source_l2displayportd_listconnectors
  label: List Connectors - L2 DisplayPort D
  kind: query
  command: "image.source.l2displayportd.listconnectors"
  params: []

- id: image_source_l2dualdpab_listconnectors
  label: List Connectors - L2 Dual DP AB
  kind: query
  command: "image.source.l2dualdpab.listconnectors"
  params: []

- id: image_source_l2dualdpac_listconnectors
  label: List Connectors - L2 Dual DP AC
  kind: query
  command: "image.source.l2dualdpac.listconnectors"
  params: []

- id: image_source_l2dualdpbd_listconnectors
  label: List Connectors - L2 Dual DP BD
  kind: query
  command: "image.source.l2dualdpbd.listconnectors"
  params: []

- id: image_source_l2dualdpcd_listconnectors
  label: List Connectors - L2 Dual DP CD
  kind: query
  command: "image.source.l2dualdpcd.listconnectors"
  params: []

- id: image_source_l2dualheaddpac_listconnectors
  label: List Connectors - L2 Dual Head DP AC
  kind: query
  command: "image.source.l2dualheaddpac.listconnectors"
  params: []

- id: image_source_l2dualheaddpbd_listconnectors
  label: List Connectors - L2 Dual Head DP BD
  kind: query
  command: "image.source.l2dualheaddpbd.listconnectors"
  params: []

- id: image_source_l2dualheaddualdpabcd_listconnectors
  label: List Connectors - L2 Dual Head Dual DP ABCD
  kind: query
  command: "image.source.l2dualheaddualdpabcd.listconnectors"
  params: []

- id: image_source_l2quadcolumndp_listconnectors
  label: List Connectors - L2 Quad Column DP
  kind: query
  command: "image.source.l2quadcolumndp.listconnectors"
  params: []

- id: image_source_l2quaddp_listconnectors
  label: List Connectors - L2 Quad DP
  kind: query
  command: "image.source.l2quaddp.listconnectors"
  params: []

# Per-connector EDID list methods
- id: image_connector_l1displayport_edid_list
  label: List EDID - L1 DisplayPort
  kind: query
  command: "image.connector.l1displayport.edid.list"
  params: []

- id: image_connector_l1hdbaset1_edid_list
  label: List EDID - L1 HDBaseT 1
  kind: query
  command: "image.connector.l1hdbaset1.edid.list"
  params: []

- id: image_connector_l1hdbaset2_edid_list
  label: List EDID - L1 HDBaseT 2
  kind: query
  command: "image.connector.l1hdbaset2.edid.list"
  params: []

- id: image_connector_l1hdmi_edid_list
  label: List EDID - L1 HDMI
  kind: query
  command: "image.connector.l1hdmi.edid.list"
  params: []

- id: image_connector_l2displayporta_edid_list
  label: List EDID - L2 DisplayPort A
  kind: query
  command: "image.connector.l2displayporta.edid.list"
  params: []

- id: image_connector_l2displayportb_edid_list
  label: List EDID - L2 DisplayPort B
  kind: query
  command: "image.connector.l2displayportb.edid.list"
  params: []

- id: image_connector_l2displayportc_edid_list
  label: List EDID - L2 DisplayPort C
  kind: query
  command: "image.connector.l2displayportc.edid.list"
  params: []

- id: image_connector_l2displayportd_edid_list
  label: List EDID - L2 DisplayPort D
  kind: query
  command: "image.connector.l2displayportd.edid.list"
  params: []

# ============================================================
# Color management
# ============================================================

- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: "image.color.p7.custom.resettonative"
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: "image.color.rgbmode.nextrgbmode"
  description: Cycle to next RGB mode
  params: []

# ============================================================
# Warp / blend / black level file & geometry methods
# ============================================================

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

- id: image_processing_warpgrid_getgrid
  label: Get Warp Grid
  kind: query
  command: "image.processing.warpgrid.getgrid"
  description: Returns current grid points as normalized and relative
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: "image.processing.warpgrid.getgridsize"
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: "image.processing.warpgrid.getscaledgrid"
  params:
    - name: resolution
      type: object
      description: "{ x: int, y: int }"

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Four-Corner Coordinates
  kind: query
  command: "image.processing.warp.fourcorners.getscaledcorners"
  params:
    - name: resolution
      type: object
      description: "{ x: int, y: int }"

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: "image.processing.warp.warpscaledpoints"
  params:
    - name: points
      type: array
      description: "Array of { X: float, Y: float }"
    - name: resolution
      type: object
      description: "{ X: float, Y: float }"

- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Black Level Area
  kind: query
  command: "image.processing.blacklevel.basicblacklevel.getblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Black Level Area
  kind: query
  command: "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area
  kind: query
  command: "image.processing.blend.basicblend.getblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: "image.processing.blend.basicblend.getwarpedblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

# ============================================================
# Test patterns
# ============================================================

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: "image.testpattern.list"
  params: []

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: "image.testpattern.file.list"
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: "image.testpattern.file.delete"
  params:
    - name: filename
      type: string

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: "image.testpattern.setproperties"
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of { key, value }

# ============================================================
# Optics - focus motor
# ============================================================

- id: optics_focus_addlocation
  label: Focus - Add Current Position To Location
  kind: action
  command: "optics.focus.addlocation"
  params:
    - name: location
      type: string

- id: optics_focus_calibrate
  label: Focus - Calibrate
  kind: action
  command: "optics.focus.calibrate"
  params: []

- id: optics_focus_runforward
  label: Focus - Run Forward
  kind: action
  command: "optics.focus.runforward"
  params: []

- id: optics_focus_runforwardtime
  label: Focus - Run Forward For Time
  kind: action
  command: "optics.focus.runforwardtime"
  params:
    - name: milliseconds
      type: integer

- id: optics_focus_runreverse
  label: Focus - Run Reverse
  kind: action
  command: "optics.focus.runreverse"
  params: []

- id: optics_focus_runreversetime
  label: Focus - Run Reverse For Time
  kind: action
  command: "optics.focus.runreversetime"
  params:
    - name: milliseconds
      type: integer

- id: optics_focus_setlocation
  label: Focus - Set Location
  kind: action
  command: "optics.focus.setlocation"
  params:
    - name: location
      type: string

- id: optics_focus_stepforward
  label: Focus - Step Forward
  kind: action
  command: "optics.focus.stepforward"
  params: []

- id: optics_focus_stepreverse
  label: Focus - Step Reverse
  kind: action
  command: "optics.focus.stepreverse"
  params: []

- id: optics_focus_stop
  label: Focus - Stop
  kind: action
  command: "optics.focus.stop"
  params: []

# ============================================================
# Optics - lens shift horizontal motor
# ============================================================

- id: optics_lensshift_horizontal_addlocation
  label: Lens Shift H - Add Location
  kind: action
  command: "optics.lensshift.horizontal.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_calibrate
  label: Lens Shift H - Calibrate
  kind: action
  command: "optics.lensshift.horizontal.calibrate"
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Lens Shift H - Run Forward
  kind: action
  command: "optics.lensshift.horizontal.runforward"
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens Shift H - Run Forward For Time
  kind: action
  command: "optics.lensshift.horizontal.runforwardtime"
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_runreverse
  label: Lens Shift H - Run Reverse
  kind: action
  command: "optics.lensshift.horizontal.runreverse"
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Lens Shift H - Run Reverse For Time
  kind: action
  command: "optics.lensshift.horizontal.runreversetime"
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_horizontal_setlocation
  label: Lens Shift H - Set Location
  kind: action
  command: "optics.lensshift.horizontal.setlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_stepforward
  label: Lens Shift H - Step Forward
  kind: action
  command: "optics.lensshift.horizontal.stepforward"
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Lens Shift H - Step Reverse
  kind: action
  command: "optics.lensshift.horizontal.stepreverse"
  params: []

- id: optics_lensshift_horizontal_stop
  label: Lens Shift H - Stop
  kind: action
  command: "optics.lensshift.horizontal.stop"
  params: []

# ============================================================
# Optics - lens shift vertical motor
# ============================================================

- id: optics_lensshift_vertical_addlocation
  label: Lens Shift V - Add Location
  kind: action
  command: "optics.lensshift.vertical.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_calibrate
  label: Lens Shift V - Calibrate
  kind: action
  command: "optics.lensshift.vertical.calibrate"
  params: []

- id: optics_lensshift_vertical_runforward
  label: Lens Shift V - Run Forward
  kind: action
  command: "optics.lensshift.vertical.runforward"
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens Shift V - Run Forward For Time
  kind: action
  command: "optics.lensshift.vertical.runforwardtime"
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_runreverse
  label: Lens Shift V - Run Reverse
  kind: action
  command: "optics.lensshift.vertical.runreverse"
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Lens Shift V - Run Reverse For Time
  kind: action
  command: "optics.lensshift.vertical.runreversetime"
  params:
    - name: milliseconds
      type: integer

- id: optics_lensshift_vertical_setlocation
  label: Lens Shift V - Set Location
  kind: action
  command: "optics.lensshift.vertical.setlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_stepforward
  label: Lens Shift V - Step Forward
  kind: action
  command: "optics.lensshift.vertical.stepforward"
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Lens Shift V - Step Reverse
  kind: action
  command: "optics.lensshift.vertical.stepreverse"
  params: []

- id: optics_lensshift_vertical_stop
  label: Lens Shift V - Stop
  kind: action
  command: "optics.lensshift.vertical.stop"
  params: []

# ============================================================
# Optics - zoom motor
# ============================================================

- id: optics_zoom_addlocation
  label: Zoom - Add Location
  kind: action
  command: "optics.zoom.addlocation"
  params:
    - name: location
      type: string

- id: optics_zoom_calibrate
  label: Zoom - Calibrate
  kind: action
  command: "optics.zoom.calibrate"
  params: []

- id: optics_zoom_runforward
  label: Zoom - Run Forward
  kind: action
  command: "optics.zoom.runforward"
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom - Run Forward For Time
  kind: action
  command: "optics.zoom.runforwardtime"
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_runreverse
  label: Zoom - Run Reverse
  kind: action
  command: "optics.zoom.runreverse"
  params: []

- id: optics_zoom_runreversetime
  label: Zoom - Run Reverse For Time
  kind: action
  command: "optics.zoom.runreversetime"
  params:
    - name: milliseconds
      type: integer

- id: optics_zoom_setlocation
  label: Zoom - Set Location
  kind: action
  command: "optics.zoom.setlocation"
  params:
    - name: location
      type: string

- id: optics_zoom_stepforward
  label: Zoom - Step Forward
  kind: action
  command: "optics.zoom.stepforward"
  params: []

- id: optics_zoom_stepreverse
  label: Zoom - Step Reverse
  kind: action
  command: "optics.zoom.stepreverse"
  params: []

- id: optics_zoom_stop
  label: Zoom - Stop
  kind: action
  command: "optics.zoom.stop"
  params: []

# ============================================================
# Optics - shutter, lens ID, shift center
# ============================================================

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

- id: optics_shifttocenter
  label: Shift Lens To Center
  kind: action
  command: "optics.shifttocenter"
  description: Shift lens to center of allowed shift range
  params: []

# ============================================================
# Peripheral frame motors (horizontal / vertical / rotation)
# ============================================================

- id: peripheral_frame_horizontal_calibrate
  label: Frame Horizontal - Calibrate
  kind: action
  command: "peripheral.frame.horizontal.calibrate"
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame Horizontal - Run Forward
  kind: action
  command: "peripheral.frame.horizontal.runforward"
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame Horizontal - Run Reverse
  kind: action
  command: "peripheral.frame.horizontal.runreverse"
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame Horizontal - Step Forward
  kind: action
  command: "peripheral.frame.horizontal.stepforward"
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame Horizontal - Step Reverse
  kind: action
  command: "peripheral.frame.horizontal.stepreverse"
  params: []

- id: peripheral_frame_horizontal_stop
  label: Frame Horizontal - Stop
  kind: action
  command: "peripheral.frame.horizontal.stop"
  params: []

- id: peripheral_frame_vertical_calibrate
  label: Frame Vertical - Calibrate
  kind: action
  command: "peripheral.frame.vertical.calibrate"
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame Vertical - Run Forward
  kind: action
  command: "peripheral.frame.vertical.runforward"
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame Vertical - Run Reverse
  kind: action
  command: "peripheral.frame.vertical.runreverse"
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame Vertical - Step Forward
  kind: action
  command: "peripheral.frame.vertical.stepforward"
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame Vertical - Step Reverse
  kind: action
  command: "peripheral.frame.vertical.stepreverse"
  params: []

- id: peripheral_frame_vertical_stop
  label: Frame Vertical - Stop
  kind: action
  command: "peripheral.frame.vertical.stop"
  params: []

- id: peripheral_frame_rotation_calibrate
  label: Frame Rotation - Calibrate
  kind: action
  command: "peripheral.frame.rotation.calibrate"
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation - Run Forward
  kind: action
  command: "peripheral.frame.rotation.runforward"
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation - Run Reverse
  kind: action
  command: "peripheral.frame.rotation.runreverse"
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation - Step Forward
  kind: action
  command: "peripheral.frame.rotation.stepforward"
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation - Step Reverse
  kind: action
  command: "peripheral.frame.rotation.stepreverse"
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame Rotation - Stop
  kind: action
  command: "peripheral.frame.rotation.stop"
  params: []

# ============================================================
# Illumination
# ============================================================

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: "illumination.clo.engage"
  description: Engage CLO at the current light level
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: "illumination.laser.getserialnumber"
  params: []

# ============================================================
# Environment
# ============================================================

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: "environment.getcontrolblocks"
  params:
    - name: type
      type: string
      description: "Sensor | Filter | Controller | Actuator | Alarm | GenericBlock"
    - name: valuetype
      type: string
      description: "Temperature | Speed | PWM | Voltage | Current | Power | Altitude | Pressure | Humidity | ADC | Coordinate | Peltier | Waveform | Average | Delay | Difference | Interpolation | Limit | Median | Noise | Weighting | Comparison | Threshold | Formula | Driver | PID | Mode | State | Pump | Resistance | Simulation | Constant | Manual | Range | Any"

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: "environment.getalarminfo"
  params: []

# ============================================================
# Firmware management
# ============================================================

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: "firmware.listcomponents"
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions And Status
  kind: query
  command: "firmware.listcomponentversionstatus"
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: "firmware.schedulecomponentupgrade"
  description: Force a component upgrade at the following reboot
  params: []

# ============================================================
# Statistics / counters
# ============================================================

- id: statistics_listcounters
  label: List All Counters
  kind: query
  command: "statistics.listcounters"
  params: []

- id: statistics_laserruntime_getname
  label: Laser Runtime - Get Name
  kind: query
  command: "statistics.laserruntime.getname"
  params: []

- id: statistics_laserruntime_getunit
  label: Laser Runtime - Get Unit
  kind: query
  command: "statistics.laserruntime.getunit"
  params: []

- id: statistics_laserstrikes_getname
  label: Laser Strikes - Get Name
  kind: query
  command: "statistics.laserstrikes.getname"
  params: []

- id: statistics_laserstrikes_getunit
  label: Laser Strikes - Get Unit
  kind: query
  command: "statistics.laserstrikes.getunit"
  params: []

- id: statistics_projectorruntime_getname
  label: Projector Runtime - Get Name
  kind: query
  command: "statistics.projectorruntime.getname"
  params: []

- id: statistics_projectorruntime_getunit
  label: Projector Runtime - Get Unit
  kind: query
  command: "statistics.projectorruntime.getunit"
  params: []

- id: statistics_systemtime_getname
  label: System Time - Get Name
  kind: query
  command: "statistics.systemtime.getname"
  params: []

- id: statistics_systemtime_getunit
  label: System Time - Get Unit
  kind: query
  command: "statistics.systemtime.getunit"
  params: []

- id: statistics_uptime_getname
  label: Uptime - Get Name
  kind: query
  command: "statistics.uptime.getname"
  params: []

- id: statistics_uptime_getunit
  label: Uptime - Get Unit
  kind: query
  command: "statistics.uptime.getunit"
  params: []

# ============================================================
# DMX
# ============================================================

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

# ============================================================
# Light measurement
# ============================================================

- id: lightmeasurement_getlightoutput
  label: Get Light Output
  kind: query
  command: "lightmeasurement.getlightoutput"
  params: []

# ============================================================
# Network
# ============================================================

- id: network_list
  label: List Network Devices
  kind: query
  command: "network.list"
  description: List logical device IDs (e.g., "wired1", "wifi1")
  params: []

# ============================================================
# Notifications
# ============================================================

- id: notification_list
  label: List Active Notifications
  kind: query
  command: "notification.list"
  params: []

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: "notification.dismiss"
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: "NONE | OK | CANCEL | IGNORE | YES | NO | SUPPRESS"

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: "notification.listsuppressed"
  params: []

- id: notification_log
  label: List Notification Log
  kind: query
  command: "notification.log"
  params:
    - name: minimumseverity
      type: string
      description: "INFO | CAUTION | WARNING | ERROR | CRITICAL"
    - name: start
      type: integer
    - name: count
      type: integer

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

# ============================================================
# Remote control
# ============================================================

- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: "remotecontrol.listsensors"
  params: []

# ============================================================
# Key dispatcher (RC / keypad simulation)
# ============================================================

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: "keydispatcher.sendclickevent"
  description: Key press followed immediately by key release
  params:
    - name: key
      type: string
      description: "Key enum (e.g., RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_SHUTTER_OPEN, KP_MENU, KP_INPUT, etc.)"

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: "keydispatcher.sendpressevent"
  params:
    - name: key
      type: string

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: "keydispatcher.sendreleaseevent"
  params:
    - name: key
      type: string

# ============================================================
# LED control
# ============================================================

- id: led_activity
  label: Activate LEDs
  kind: action
  command: "led.activity"
  description: Activates LEDs when enabled and restarts the LED timeout counter
  params: []

- id: led_list
  label: List LEDs
  kind: query
  command: "led.list"
  params: []

# ============================================================
# UI / OSD / settings
# ============================================================

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (Deprecated)
  kind: action
  command: "ui.togglestealthmode"
  description: DEPRECATED
  params: []

- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: "ui.settings.get"
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: "ui.settings.set"
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: "ui.settings.remove"
  params:
    - name: key
      type: string

- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: "ui.settings.list"
  params: []

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: "ui.settings.keys"
  params: []

- id: ui_settings_geticons
  label: Get UI Icons
  kind: query
  command: "ui.settings.geticons"
  params:
    - name: category
      type: string
      description: "Source | Connector | TestPattern"

- id: ui_settings_getfonticons
  label: Get UI Font Icons
  kind: query
  command: "ui.settings.getfonticons"
  params:
    - name: category
      type: string
      description: "Source | Connector | TestPattern"

# ============================================================
# HTTP file endpoints (uses POST /api/...; not JSON-RPC)
# ============================================================

- id: firmware_transfer_upload
  label: Upload Firmware Image
  kind: action
  command: "POST /api/firmware/transfer"
  description: HTTP multipart upload of firmware image file
  params:
    - name: file
      type: string
      description: Path to firmware.dat

- id: image_connector_edid_transfer_upload
  label: Upload EDID File
  kind: action
  command: "POST /api/image/connector/edid/transfer"
  params:
    - name: file
      type: string

- id: image_connector_edid_transfer_download
  label: Download EDID File
  kind: query
  command: "GET /api/image/connector/edid/transfer"
  params: []

- id: image_processing_warp_file_transfer_upload
  label: Upload Warp File
  kind: action
  command: "POST /api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: string

- id: image_processing_warp_file_transfer_download
  label: Download Warp File
  kind: query
  command: "GET /api/image/processing/warp/file/transfer"
  params: []

- id: image_processing_blend_file_transfer_upload
  label: Upload Blend File
  kind: action
  command: "POST /api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: string

- id: image_processing_blend_file_transfer_download
  label: Download Blend File
  kind: query
  command: "GET /api/image/processing/blend/file/transfer"
  params: []

- id: image_processing_blacklevel_file_transfer_upload
  label: Upload Black Level File
  kind: action
  command: "POST /api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: string

- id: image_processing_blacklevel_file_transfer_download
  label: Download Black Level File
  kind: query
  command: "GET /api/image/processing/blacklevel/file/transfer"
  params: []

- id: image_testpattern_file_transfer_upload
  label: Upload Test Pattern Image
  kind: action
  command: "POST /api/image/testpattern/file/transfer"
  params:
    - name: file
      type: string

- id: image_testpattern_file_transfer_download
  label: Download Test Pattern Image
  kind: query
  command: "GET /api/image/testpattern/file/transfer"
  params: []

- id: notification_logger_transfer_download
  label: Download Notification Log
  kind: query
  command: "GET /api/notification/logger/transfer"
  params: []
```

## Feedbacks
```yaml
# System state query
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
    - service
    - deconditioning
    - error

# Active source query
- id: active_source
  label: Active Source
  type: string

# Property value query (generic)
- id: property_value
  label: Property Value
  type: any

# Multiple property query response
- id: property_batch_response
  label: Property Batch Response
  type: object

# Property change notification
- id: property_changed
  label: Property Changed
  type: object

# Signal callback notification
- id: signal_callback
  label: Signal Callback
  type: object

# Illumination state
- id: illumination_state
  label: Illumination State
  type: enum
  values:
    - On
    - Off

# Illumination power level
- id: illumination_power
  label: Illumination Power (percent)
  type: float

# Authentication result
- id: authenticate_response
  label: Authentication Response
  type: boolean

# Board info response
- id: board_info
  label: Board Info
  type: object

# Identification response
- id: identification
  label: Identification
  type: string

# System date response
- id: system_date
  label: System Date (UTC)
  type: object

# EDID list response
- id: edid_list
  label: EDID List
  type: array

# Source list response
- id: source_list
  label: Source List
  type: array

# Connector list response
- id: connector_list
  label: Connector List
  type: array

# Alarm info response
- id: alarm_info
  label: Alarm Info
  type: array

# Firmware components response
- id: firmware_components
  label: Firmware Components
  type: array

# Statistics counter list response
- id: counter_list
  label: Counter List
  type: array

# Notification list response
- id: notification_list_response
  label: Notification List
  type: array

# Environment control blocks response
- id: environment_blocks
  label: Environment Control Blocks
  type: object

# Lens IDs response
- id: lens_ids
  label: Valid Lens IDs
  type: object

# Test pattern list response
- id: testpattern_list
  label: Test Pattern List
  type: array

# Light output response
- id: light_output
  label: Light Output (lumens)
  type: integer
```

## Variables
```yaml
# Image adjustments (read/write via property.get/property.set)
- id: image_brightness
  label: Brightness
  type: float
  constraints:
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    default: 0

- id: image_contrast
  label: Contrast
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    default: 1

- id: image_gamma
  label: Gamma
  type: float
  constraints:
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    default: 2.2

- id: image_saturation
  label: Saturation
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    default: 1

- id: image_sharpness
  label: Sharpness
  type: integer
  constraints:
    min: -2
    max: 8
    step_size: 1
    precision: 1

- id: image_intensity
  label: Intensity
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 0.1
    precision: 0.01

- id: image_window_main_source
  label: Main Window Source
  type: string

- id: image_window_main_scalingmode
  label: Main Window Scaling Mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_window_main_position
  label: Main Window Position
  type: object

- id: image_window_main_size
  label: Main Window Size
  type: object

- id: image_orientation
  label: Image Orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_testpattern_selected
  label: Selected Test Pattern ID
  type: string

- id: image_testpattern_show
  label: Show Test Pattern
  type: boolean

# Display mode
- id: image_display_desireddisplaymode
  label: Desired Display Mode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]

- id: image_display_displaymode
  label: Current Display Mode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]

- id: image_display_frequency
  label: Display Frequency
  type: float

- id: image_display_synchronouslock
  label: Display Synchronous Lock
  type: boolean

# RGB mode
- id: image_color_rgbmode
  label: RGB Mode
  type: enum
  values: [Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed]

# Stereo
- id: image_stereo_darktime
  label: Stereo Darktime (us)
  type: integer

- id: image_stereo_glassync_delay
  label: Stereo Glass Sync Delay (us)
  type: integer

- id: image_stereo_glassync_invert
  label: Stereo Glass Sync Invert
  type: boolean

- id: image_stereo_swapframepair
  label: Stereo Swap Frame Pair
  type: boolean

# Illumination
- id: illumination_sources_laser_power
  label: Laser Power (percent)
  type: float
  constraints:
    min: 0
    max: 100

- id: illumination_sources_laser_maxpower
  label: Laser Maximum Power (percent)
  type: float

- id: illumination_sources_laser_minpower
  label: Laser Minimum Power (percent)
  type: float

- id: illumination_sources_laser_ispowerlimited
  label: Laser Power Limited
  type: boolean

- id: illumination_sources_laser_powerlimitreason
  label: Laser Power Limit Reason
  type: string

- id: illumination_clo_availability
  label: CLO Availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]

- id: illumination_clo_enable
  label: CLO Enable
  type: boolean

- id: illumination_clo_scale
  label: CLO Scale (percent)
  type: float

- id: illumination_clo_setpoint
  label: CLO Setpoint
  type: float

- id: illumination_clo_state
  label: CLO State
  type: enum
  values: [Ok, TooDim, TooBright]

# Environment monitoring (read via environment.getcontrolblocks)
- id: temperature_readings
  label: Temperature Sensors
  type: object

- id: fan_speeds
  label: Fan Speeds
  type: object

- id: environment_alarmstate
  label: Environment Alarm State
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

# Warp/blend/blacklevel enable flags
- id: image_processing_warp_enable
  label: Warp Enable
  type: boolean

- id: image_processing_warp_file_enable
  label: Warp File Enable
  type: boolean

- id: image_processing_warp_file_selected
  label: Warp File Selected
  type: string

- id: image_processing_blend_file_enable
  label: Blend File Enable
  type: boolean

- id: image_processing_blend_file_selected
  label: Blend File Selected
  type: array

- id: image_processing_blend_scurve
  label: Blend S-Curve Exponent
  type: float
  constraints:
    min: 1
    max: 4
    precision: 0.1

- id: image_processing_blacklevel_file_enable
  label: Black Level File Enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  label: Black Level File Selected
  type: string

- id: image_processing_blacklevel_basicblacklevel_enable
  label: Basic Black Level Enable
  type: boolean

- id: image_processing_blacklevel_basicblacklevel_level
  label: Basic Black Level Level
  type: integer
  constraints:
    min: 0
    max: 65535

- id: image_processing_blend_basicblend_enable
  label: Basic Blend Enable
  type: boolean

- id: image_processing_transportdelay_desired
  label: Desired Transport Delay
  type: integer

- id: image_processing_transportdelay_actual
  label: Actual Transport Delay
  type: integer

- id: image_processing_transportdelay_minimum
  label: Minimum Transport Delay
  type: integer

# Optics
- id: optics_lenspresent
  label: Lens Present
  type: boolean

- id: optics_filteravailable
  label: Optics Filter Available
  type: boolean

- id: optics_focus_enabled
  label: Focus Enabled
  type: boolean

- id: optics_focus_position
  label: Focus Position
  type: integer

- id: optics_focus_target
  label: Focus Target
  type: integer

- id: optics_focus_state
  label: Focus State
  type: enum
  values: [Stopped, Running, Calibrating, Homing]

- id: optics_zoom_enabled
  label: Zoom Enabled
  type: boolean

- id: optics_zoom_position
  label: Zoom Position
  type: integer

- id: optics_zoom_target
  label: Zoom Target
  type: integer

- id: optics_zoom_state
  label: Zoom State
  type: enum
  values: [Stopped, Running, Calibrating, Homing]

- id: optics_lensshift_horizontal_enabled
  label: Lens Shift Horizontal Enabled
  type: boolean

- id: optics_lensshift_horizontal_position
  label: Lens Shift Horizontal Position
  type: integer

- id: optics_lensshift_horizontal_target
  label: Lens Shift Horizontal Target
  type: integer

- id: optics_lensshift_horizontal_state
  label: Lens Shift Horizontal State
  type: enum
  values: [Stopped, Running, Calibrating, Homing]

- id: optics_lensshift_vertical_enabled
  label: Lens Shift Vertical Enabled
  type: boolean

- id: optics_lensshift_vertical_position
  label: Lens Shift Vertical Position
  type: integer

- id: optics_lensshift_vertical_target
  label: Lens Shift Vertical Target
  type: integer

- id: optics_lensshift_vertical_state
  label: Lens Shift Vertical State
  type: enum
  values: [Stopped, Running, Calibrating, Homing]

- id: optics_shutter_enabled
  label: Shutter Motor Enabled
  type: boolean

- id: optics_shutter_position
  label: Shutter Position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  label: Shutter Target
  type: enum
  values: [Open, Closed]

# System
- id: system_modelname
  label: Model Name
  type: string

- id: system_familyname
  label: Family Name
  type: string

- id: system_serialnumber
  label: Serial Number
  type: string

- id: system_articlenumber
  label: Article Number
  type: string

- id: system_firmwareversion
  label: Firmware Version
  type: string

- id: system_initialstate
  label: Initial State
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: system_eco_available
  label: Eco State Available
  type: boolean

- id: system_eco_enable
  label: Eco State Enable
  type: boolean

- id: system_standby_available
  label: Standby State Available
  type: boolean

- id: system_standby_enable
  label: Standby State Enable
  type: boolean

- id: system_standby_timeout_duration
  label: Standby Timeout Duration (s)
  type: integer

- id: system_standby_timeout_enable
  label: Standby Timeout Enable
  type: boolean

- id: system_ready_timeout_duration
  label: Ready Timeout Duration (s)
  type: integer

- id: system_ready_timeout_enable
  label: Ready Timeout Enable
  type: boolean

- id: system_on_timeout_duration
  label: On Timeout Duration (s)
  type: integer

- id: system_on_timeout_enable
  label: On Timeout Enable
  type: boolean

- id: system_error_timeout_duration
  label: Error Timeout Duration (s)
  type: integer

- id: system_error_timeout_enable
  label: Error Timeout Enable
  type: boolean

- id: system_license_applicable
  label: License Applicable
  type: boolean

- id: system_license_available
  label: License Available
  type: boolean

- id: system_license_valid
  label: License Valid
  type: boolean

- id: system_license_options
  label: License Options
  type: object

- id: system_colorwheel
  label: Color Wheel Article Number
  type: string

- id: system_colorwheelname
  label: Color Wheel Name
  type: string

# Network
- id: network_hostname
  label: Network Hostname
  type: string

- id: network_version
  label: Networking Service Version
  type: string

- id: network_device_lan_carrier
  label: LAN Carrier
  type: boolean

- id: network_device_lan_state
  label: LAN State
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_device_lan_speed
  label: LAN Speed (Mbit/s)
  type: integer

- id: network_device_lan_hwaddress
  label: LAN MAC Address
  type: string

- id: network_device_lan_ip4config
  label: LAN IPv4 Config
  type: object

- id: network_device_lan_ip6config
  label: LAN IPv6 Config
  type: object

# Firmware
- id: firmware_firmwareversion
  label: Firmware Version Property
  type: string

# GSM
- id: gsm_available
  label: GSM Card Available
  type: boolean

- id: gsm_pinstate
  label: GSM PIN State
  type: enum
  values: [Accepted, Failed, Locked, Unknown]

- id: gsm_pin
  label: GSM PIN Code
  type: string

# Remote control
- id: remotecontrol_address
  label: Remote Control Address
  type: integer
  constraints:
    min: 1
    max: 31

- id: remotecontrol_broadcastaddress
  label: Remote Control Broadcast Address
  type: integer
  constraints:
    min: 0
    max: 1

# Screen
- id: screen_hdrboost
  label: Screen HDR Boost
  type: float
  constraints:
    min: 0.8
    max: 1.2
    step_size: 0.01
    precision: 0.1

- id: screen_luminance
  label: Screen Luminance (cd/m2)
  type: float
  constraints:
    min: 50
    max: 10000
    step_size: 10
    precision: 1

# Statistics counters (read/write)
- id: statistics_laserruntime_value
  label: Laser Runtime
  type: integer

- id: statistics_laserstrikes_value
  label: Laser Strikes
  type: integer

- id: statistics_projectorruntime_value
  label: Projector Runtime
  type: integer

- id: statistics_systemtime_value
  label: System Time
  type: integer

- id: statistics_uptime_value
  label: Uptime
  type: integer

# DMX
- id: dmx_artnet
  label: DMX Artnet Enabled
  type: boolean

- id: dmx_artnetnet
  label: DMX Artnet Net
  type: integer

- id: dmx_artnetuniverse
  label: DMX Artnet Universe
  type: integer

- id: dmx_mode
  label: DMX Mode
  type: string

- id: dmx_shutdown
  label: DMX Shutdown Enabled
  type: boolean

- id: dmx_shutdowntimeout
  label: DMX Shutdown Timeout (minutes)
  type: integer

- id: dmx_startchannel
  label: DMX Start Channel (1..512)
  type: integer

# UI
- id: ui_menu
  label: UI Menu Visible
  type: boolean

- id: ui_osd
  label: OSD Enabled
  type: boolean

- id: ui_minimize
  label: UI Menu Minimized
  type: boolean

- id: ui_stealthmode
  label: Stealth Mode
  type: enum
  values: [Off, On]

- id: ui_hasstealthmode
  label: Has Stealth Mode
  type: boolean

- id: ui_backlight_state
  label: Backlight State
  type: enum
  values: [Off, On, Auto]

- id: ui_backlight_timeout
  label: Backlight Timeout (s)
  type: integer

- id: ui_access_enduser
  label: End User Access
  type: boolean

- id: ui_access_poweruser
  label: Power User Access
  type: boolean

- id: ui_poweroffhint
  label: Power Off Hint
  type: boolean

- id: ui_sourcesignal
  label: Show Source Signal
  type: boolean

- id: notification_count
  label: Notification Count
  type: integer

# Connector-level signal / color properties (per-connector variants documented
# in source for l1displayport, l1hdbaset1/2, l1hdmi, l1sdia-d, l2displayporta-d).
# each with 4-5 properties; see source for the full per-connector list.
```
<!-- UNRESOLVED: per-connector property variants not enumerated individually; source documents ~30 distinct connector objects each with 4-5 properties -->
```

## Events
```yaml
# Property value change notifications (device pushes when subscribed property changes)
- id: property_changed_event
  description: Pushed when subscribed property changes value
  params:
    - name: property
      type: array
      description: "Array of {propertyname: value} pairs"

# Signal notifications
- id: signal_callback_event
  description: Pushed when subscribed signal fires
  params:
    - name: signal
      type: array
      description: "Array of {signalname: arguments} pairs"

# System state change notifications
- id: system_state_changed
  description: Pushed when projector state changes
  params:
    - name: system_state
      type: string
      description: New state value

# Model updated signal
- id: modelupdated
  description: Pushed when functionality for an object appears or disappears (new objects arrive or are removed)
  params:
    - name: object
      type: string
      description: Object name in JSON-RPC dot notation
    - name: newobject
      type: boolean
      description: True if functionality added, false if removed
    - name: accesslevel
      type: string
      description: "UNAUTHENTICATED_END_USER | END_USER | POWER_USER | SERVICE_PARTNER | MANUFACTURING | DEVELOPMENT | INACCESSIBLE"

# System identification changed
- id: system_identificationchanged
  description: Raised whenever an identification is changed
  params:
    - name: identification
      type: string

# System license changed
- id: system_license_licensechanged
  description: Raised when the license file changes
  params: []

# System reset performed
- id: system_performed
  description: Emitted when one or more reset domains have completed
  params:
    - name: domains
      type: array
      description: Array of completed domain enums

# Warp grid changed (no payload)
- id: image_processing_warpgrid_changed
  description: Fired when the warp grid changes, without grid data payload
  params: []

# Warp grid changed (with payload)
- id: image_processing_warpgrid_gridchanged
  description: Fired when the warp grid changes, with grid data
  params:
    - name: grid
      type: array
      description: "Array of { x: float, y: float }"

# File-list changed signals
- id: image_processing_warp_file_listchanged
  description: Fired when warp file list changes
  params: []

- id: image_processing_blend_file_listchanged
  description: Fired when blend file list changes
  params: []

- id: image_processing_blacklevel_file_listchanged
  description: Fired when black level file list changes
  params: []

- id: image_testpattern_file_listchanged
  description: Fired when test pattern file list changes
  params: []

# Per-connector EDID list-changed signals
- id: image_connector_l1displayport_edid_listchanged
  description: EDID list changed for L1 DisplayPort
  params: []

- id: image_connector_l1hdbaset1_edid_listchanged
  description: EDID list changed for L1 HDBaseT 1
  params: []

- id: image_connector_l1hdbaset2_edid_listchanged
  description: EDID list changed for L1 HDBaseT 2
  params: []

- id: image_connector_l1hdmi_edid_listchanged
  description: EDID list changed for L1 HDMI
  params: []

- id: image_connector_l2displayporta_edid_listchanged
  description: EDID list changed for L2 DisplayPort A
  params: []

- id: image_connector_l2displayportb_edid_listchanged
  description: EDID list changed for L2 DisplayPort B
  params: []

- id: image_connector_l2displayportc_edid_listchanged
  description: EDID list changed for L2 DisplayPort C
  params: []

- id: image_connector_l2displayportd_edid_listchanged
  description: EDID list changed for L2 DisplayPort D
  params: []

# Test pattern signals
- id: image_testpattern_added
  description: Fired when a new test pattern is added
  params:
    - name: pattern
      type: object

- id: image_testpattern_changed
  description: Fired when a test pattern changes
  params:
    - name: id
      type: string
    - name: properties
      type: array

- id: image_testpattern_removed
  description: Fired when a test pattern is removed
  params:
    - name: pattern
      type: object

# Network device signals
- id: network_added
  description: Raised when a new network device is added
  params:
    - name: id
      type: string
      description: Logical device ID (e.g., "wifi1")

- id: network_removed
  description: Raised when a network device is removed
  params:
    - name: id
      type: string

# Notification signals
- id: notification_emitted
  description: Fired when a new notification is emitted
  params:
    - name: notification
      type: object

- id: notification_dismissed
  description: Fired when a notification is dismissed
  params:
    - name: id
      type: string
    - name: response
      type: string

# UI settings signals
- id: ui_settings_added
  description: Fired when a new key/value pair is added
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_changed
  description: Fired when a key value is updated
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_removed
  description: Fired when a key is removed
  params:
    - name: key
      type: string
```

## Macros
```yaml
# ECO mode wakeup sequence (for projectors in ECO/power save mode)
- id: wake_from_eco
  description: Wake projector from ECO mode via serial port
  steps:
    - send: ":POWR1\r"
      description: Send ASCII wake command on RS-232

# Black level adjustment using file upload
- id: apply_blacklevel_mask
  description: Upload and enable black level mask image
  steps:
    - http_post: "http://{address}/api/image/processing/blacklevel/file/transfer"
      params:
        file: "@blacklevel.png"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.blacklevel.file.selected
          value: "blacklevel.png"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.blacklevel.file.enable
          value: true

# Blend mask upload and enable
- id: apply_blend_mask
  description: Upload and enable blend mask image
  steps:
    - http_post: "http://{address}/api/image/processing/blend/file/transfer"
      params:
        file: "@mask.png"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.blend.file.selected
          value: "mask.png"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.blend.file.enable
          value: true

# Warp file upload and enable
- id: apply_warp_grid
  description: Upload and enable warp grid file
  steps:
    - http_post: "http://{address}/api/image/processing/warp/file/transfer"
      params:
        file: "@warp.xml"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.warp.file.selected
          value: "warp.xml"
    - jsonrpc:
        method: property.set
        params:
          property: image.processing.warp.enable
          value: true

# Firmware upgrade via upload + scheduled upgrade + reboot
- id: upgrade_firmware
  description: Upload firmware image, schedule component upgrade, and reboot
  steps:
    - http_post: "http://{address}/api/firmware/transfer"
      params:
        file: "@firmware.dat"
    - jsonrpc:
        method: firmware.schedulecomponentupgrade
    - jsonrpc:
        method: system.reboot

# EDID upload to a connector
- id: apply_edid
  description: Upload EDID file to a connector
  steps:
    - http_post: "http://{address}/api/image/connector/edid/transfer"
      params:
        file: "@edid.dat"

# Test pattern upload and selection
- id: apply_testpattern
  description: Upload custom test pattern image
  steps:
    - http_post: "http://{address}/api/image/testpattern/file/transfer"
      params:
        file: "@testpattern.dat"
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff
  - system_reboot
  - system_reset
  - system_resetall
  - firmware_transfer_upload
  - firmware_schedulecomponentupgrade
interlocks:
  - description: Verify projector state is standby or ready before issuing power on command
  - description: Verify projector state is on before issuing power off command
  - description: Wait for property.set confirmation before setting same property again to avoid flooding server
  - description: system.reboot powers off the projector first
  - description: Subsequent calls to system.reset or system.resetall will fail until all domains have completed (signalled by system.performed)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond operational notes in source
```

## Notes
JSON-RPC 2.0 is the sole command protocol, identical across TCP and RS-232 transports. TCP runs on port 9090. Serial uses 19200/8N1, no flow control, standard 9-pin cable (pin 2-2, 3-3, 5-5). Authentication is optional and only required for elevated access beyond normal end user privileges; pass code is numeric (example uses 98765). Property subscriptions push notifications asynchronously; the client must implement `property.changed` and `signal.callback` listener methods. Environment monitoring provides temperature, fan speed, voltage, and other sensor readings via `environment.getcontrolblocks` using type/valuetype filter enums. File upload/download uses HTTP POST/GET to `/api` endpoints.

The service API is fully introspectable via the `introspect` method; metadata is restricted by the client's authenticated access level. Property paths use JavaScript-like dot notation (e.g., `image.brightness`, `illumination.sources.laser.power`). Available sources and connectors vary by projector model and must be enumerated at runtime via `image.source.list` / `image.connector.list`. Per-source `listconnectors` methods are exposed under each source object (e.g., `image.source.l1displayport.listconnectors`). Per-connector properties (`detectedsignal`, `colorprimaries`, `colorspace`, `signalrange`, `edid.selected`) are documented for ~12 connectors in the source.

Best practice from source: wait for `property.set` confirmation before re-setting the same property; subscribe to `system.state` before issuing power commands to verify state; reflect source/connector structure in client to manage signal-detection subscriptions per active source.

<!-- UNRESOLVED: specific model name/variant not stated in source (generic "DLP VP" used) -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: full list of available sources/connectors not fixed (varies by model) -->
<!-- UNRESOLVED: auth pass code format/length not specified beyond example value 98765 -->
<!-- UNRESOLVED: per-connector property variants (~30 connector objects) not individually enumerated as Variables; see source "Properties" alphabetical list -->
<!-- UNRESOLVED: image.color.p7.custom.* color-management sub-properties (~40 coordinate/gain/luminance fields) not individually enumerated; source documents full CIE xy-coordinate + gain + luminance set for RGB/CMY/white -->
<!-- UNRESOLVED: image.processing.warp.bow.* and fourcorners.* geometry sub-properties documented but not individually enumerated -->
<!-- UNRESOLVED: ui.layer.* overlay rendering properties (adjustment, basicblacklevel, basicblend, fourcorner, grid, advancedblend) documented but not individually enumerated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T03:47:59.335Z
last_checked_at: 2026-07-12T08:50:30.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:50:30.927Z
matched_actions: 208
action_count: 208
confidence: medium
summary: "All 208 JSON-RPC/ASCII/HTTP spec actions match literal source commands one-to-one (S~207 incl. one command exposed under two ids); transport verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants not identified in source; list of available sources varies by projector model"
- "per-connector property variants not enumerated individually; source documents ~30 distinct connector objects each with 4-5 properties"
- "no explicit safety warnings or interlock procedures beyond operational notes in source"
- "specific model name/variant not stated in source (generic \"DLP VP\" used)"
- "firmware version not stated in source"
- "full list of available sources/connectors not fixed (varies by model)"
- "auth pass code format/length not specified beyond example value 98765"
- "per-connector property variants (~30 connector objects) not individually enumerated as Variables; see source \"Properties\" alphabetical list"
- "image.color.p7.custom.* color-management sub-properties (~40 coordinate/gain/luminance fields) not individually enumerated; source documents full CIE xy-coordinate + gain + luminance set for RGB/CMY/white"
- "image.processing.warp.bow.* and fourcorners.* geometry sub-properties documented but not individually enumerated"
- "ui.layer.* overlay rendering properties (adjustment, basicblacklevel, basicblend, fourcorner, grid, advancedblend) documented but not individually enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
