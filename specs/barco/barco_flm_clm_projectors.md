---
spec_id: admin/barco-flm-clm
schema_version: ai4av-public-spec-v1
revision: 2
title: "Barco FLM CLM Projector Control Spec"
manufacturer: Barco
model_family: "FLM CLM"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "FLM CLM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T18:01:02.770Z
last_checked_at: 2026-07-21T21:24:43.198Z
generated_at: 2026-07-21T21:24:43.198Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "pass code / authentication credential format not specified in source"
  - "pass code format not specified; source shows example code 98765"
  - "no explicit multi-step macros described in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "specific pass code format/credential not stated"
  - "voltage, current, power specifications not in source"
  - "DMX/artnet configuration details not fully documented"
  - "full property list exceeds what is captured here; introspection API available"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:24:43.198Z
  matched_actions: 178
  action_count: 178
  confidence: medium
  summary: "All 178 spec actions map 1:1 to documented JSON-RPC methods, RS-232 command, or file endpoints; transport params match verbatim; source fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Barco FLM CLM Projector Control Spec

## Summary
Barco FLM CLM projector controlled via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial. HTTP endpoints handle file upload/download (warp grids, blend/black-level masks, EDID, firmware, test patterns, notification logs). Supports power control, source routing, image adjustment, illumination management, warping, blending, optics (zoom/focus/lensshift/shutter), peripherals, environment monitoring, notifications, statistics, UI settings, and DMX/Art-Net control via JSON-RPC methods, property get/set, and signal subscription.

<!-- UNRESOLVED: pass code / authentication credential format not specified in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{host}/api"  # HTTP file endpoints; {host} = projector IP address
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # UNRESOLVED: pass code format not specified; source shows example code 98765
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ===== Existing core actions (commands added from source) =====

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g., "image.window.main.source")
    - name: value
      type: string
      description: Property value

- id: property_get
  label: Get Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (accepts a single name or an array)

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g., "modelupdated")

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: image_source_list
  label: List Available Sources
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: introspect
  label: Introspect Object
  kind: action
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name to introspect
    - name: recursive
      type: boolean
      description: Recursive introspection (default true)

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Pass code

# ===== ECO mode wake (serial special) =====

- id: eco_wake_serial
  label: ECO Mode Wake via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  description: Special ASCII command on RS-232 serial port to wake projector from ECO/power-save mode

# ===== System methods =====

- id: system_reboot
  label: Reboot Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.reboot"}'
  params: []
  description: Reboots the projector; powers off first

- id: system_gotoeco
  label: Go to ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.gotoeco"}'
  params: []

- id: system_gotoready
  label: Go to Ready State
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.gotoready"}'
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.activity"}'
  params: []
  description: Resets timeout countdown timers

- id: system_getsystemdate
  label: Get System Date
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.getsystemdate"}'
  params: []

- id: system_getidentification
  label: Get Identification
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.getidentification","params":{"identification":"{identification}"}}'
  params:
    - name: identification
      type: string
      description: Identification key

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.getidentifications"}'
  params: []

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.listresetdomains"}'
  params: []

- id: system_reset
  label: Reset Domains
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.reset","params":{"domains":{domains}}}'
  params:
    - name: domains
      type: array
      description: Array of reset domains (e.g., ImageWarp, ImageBlend, Optics, Illumination, Network, System, Dmx)

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.resetall"}'
  params: []

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.boards.getboardlist"}'
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.boards.getboardinfo","params":{"boardname":"{boardname}"}}'
  params:
    - name: boardname
      type: string
      description: Board name

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.boards.getdeviceinfo","params":{"boardname":"{boardname}"}}'
  params:
    - name: boardname
      type: string
      description: Board name
  description: DEPRECATED - use system.boards.getboardinfo

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.boards.getmissingboardlist"}'
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.boards.getmoduleinfo","params":{"boardname":"{boardname}"}}'
  params:
    - name: boardname
      type: string
      description: Board name

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set Maximum Light Output (Flex Brightness)
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.license.option.flexbrightness.setmaximumlightoutput","params":{"code":"{code}","lightoutput":{lightoutput}}}'
  params:
    - name: code
      type: string
      description: Authorization code
    - name: lightoutput
      type: integer
      description: Maximum light output value

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set Maximum Light Output via Code
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.license.option.flexbrightness.setmaximumlightoutputcode","params":{"lightoutput":{lightoutput},"signature":"{signature}","code":"{code}"}}'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string

- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get Maximum Light Output Code
  kind: query
  command: '{"jsonrpc":"2.0","method":"system.license.option.flexbrightness.getmaximumlightoutputcode"}'
  params: []

# ===== Illumination methods =====

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  description: Engage CLO at the current light level

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# ===== Environment methods =====

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Block type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, PWM, Voltage, Current, Power, Humidity, etc.)

# ===== Firmware methods =====

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  description: Force a component upgrade at next reboot

- id: firmware_transfer_upload
  label: Upload Firmware Image
  kind: action
  command: 'curl -F file=@firmware.dat http://{host}/api/firmware/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

# ===== DMX methods =====

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

# ===== Image / color / display / resolution / window methods =====

- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: image_color_p7_custom_resettonative
  label: Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.display.listdisplaymodes"}'
  params: []

- id: image_resolution_list
  label: List Resolutions
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.resolution.list"}'
  params: []

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.stereo.listdarktime"}'
  params: []

- id: image_window_list
  label: List Windows
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.window.list"}'
  params: []

# Parameterized per-source / per-connector methods (pattern; one method name per source/connector)
- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name (e.g., displayport1, l1hdmi, l2displayporta)

- id: image_connector_edid_list
  label: List EDID Selections for Connector
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.{connector}.edid.list"}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g., l1displayport, l1hdmi, l2displayporta)

# ===== Image processing - black level =====

- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Black Level Area
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blacklevel.basicblacklevel.getblacklevelarea","params":{"resolution_width":{width},"resolution_height":{height}}}'
  params:
    - name: width
      type: float
    - name: height
      type: float

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Black Level Area
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea","params":{"resolution_width":{width},"resolution_height":{height}}}'
  params:
    - name: width
      type: float
    - name: height
      type: float

- id: image_processing_blacklevel_file_list
  label: List Black Level Files
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blacklevel.file.list"}'
  params: []

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.processing.blacklevel.file.delete","params":{"filename":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_transfer_upload
  label: Upload Black Level File
  kind: action
  command: 'curl -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string

- id: image_processing_blacklevel_file_transfer_download
  label: Download Black Level File
  kind: query
  command: 'curl -O -J http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string

# ===== Image processing - blend =====

- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blend.basicblend.getblendarea","params":{"resolution_width":{width},"resolution_height":{height}}}'
  params:
    - name: width
      type: float
    - name: height
      type: float

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blend.basicblend.getwarpedblendarea","params":{"resolution_width":{width},"resolution_height":{height}}}'
  params:
    - name: width
      type: float
    - name: height
      type: float

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.blend.file.list"}'
  params: []

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.processing.blend.file.delete","params":{"filename":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_transfer_upload
  label: Upload Blend File
  kind: action
  command: 'curl -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string

- id: image_processing_blend_file_transfer_download
  label: Download Blend File
  kind: query
  command: 'curl -O -J http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string

# ===== Image processing - warp =====

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warp.file.list"}'
  params: []

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.processing.warp.file.delete","params":{"filename":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Four Corners
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warp.fourcorners.getscaledcorners","params":{"resolution":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warp.warpscaledpoints","params":{"points":{points},"resolution":{"x":{x},"y":{y}}}}'
  params:
    - name: points
      type: array
      description: Array of {X,Y} float points
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_processing_warp_file_transfer_upload
  label: Upload Warp File
  kind: action
  command: 'curl -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string

- id: image_processing_warp_file_transfer_download
  label: Download Warp File
  kind: query
  command: 'curl -O -J http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string

- id: image_processing_warpgrid_getgrid
  label: Get Warp Grid
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warpgrid.getgrid"}'
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warpgrid.getgridsize"}'
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.processing.warpgrid.getscaledgrid","params":{"resolution":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

# ===== Image - test pattern =====

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.testpattern.list"}'
  params: []

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.testpattern.file.list"}'
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.testpattern.file.delete","params":{"filename":"{filename}"}}'
  params:
    - name: filename
      type: string

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.testpattern.setproperties","params":{"id":"{id}","properties":{properties}}}'
  params:
    - name: id
      type: string
    - name: properties
      type: array
      description: Array of {key,value} pairs

- id: image_testpattern_file_transfer_upload
  label: Upload Test Pattern File
  kind: action
  command: 'curl -F file=@testpattern.dat http://{host}/api/image/testpattern/file/transfer'
  params:
    - name: host
      type: string

- id: image_testpattern_file_transfer_download
  label: Download Test Pattern File
  kind: query
  command: 'curl -O -J http://{host}/api/image/testpattern/file/transfer'
  params:
    - name: host
      type: string

# ===== Image - connector EDID transfer =====

- id: image_connector_edid_transfer_upload
  label: Upload EDID File
  kind: action
  command: 'curl -F file=@edid.dat http://{host}/api/image/connector/edid/transfer'
  params:
    - name: host
      type: string

- id: image_connector_edid_transfer_download
  label: Download EDID File
  kind: query
  command: 'curl -O -J http://{host}/api/image/connector/edid/transfer'
  params:
    - name: host
      type: string

# ===== Key dispatcher =====

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: '{"jsonrpc":"2.0","method":"keydispatcher.sendclickevent","params":{"key":"{key}"}}'
  params:
    - name: key
      type: string
      description: Key enum (press + release), e.g. RC_POWER_ON, RC_OSD, KP_UP, KP_POWER

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: '{"jsonrpc":"2.0","method":"keydispatcher.sendpressevent","params":{"key":"{key}"}}'
  params:
    - name: key
      type: string
      description: Key enum

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: '{"jsonrpc":"2.0","method":"keydispatcher.sendreleaseevent","params":{"key":"{key}"}}'
  params:
    - name: key
      type: string
      description: Key enum

# ===== LED =====

- id: led_activity
  label: Activate LEDs
  kind: action
  command: '{"jsonrpc":"2.0","method":"led.activity"}'
  params: []
  description: Activates LEDs and restarts the LED timeout counter

- id: led_list
  label: List LEDs
  kind: query
  command: '{"jsonrpc":"2.0","method":"led.list"}'
  params: []

# ===== Light measurement =====

- id: lightmeasurement_getlightoutput
  label: Get Light Output
  kind: query
  command: '{"jsonrpc":"2.0","method":"lightmeasurement.getlightoutput"}'
  params: []

# ===== Network =====

- id: network_list
  label: List Network Devices
  kind: query
  command: '{"jsonrpc":"2.0","method":"network.list"}'
  params: []

# ===== Notification methods =====

- id: notification_list
  label: List Active Notifications
  kind: query
  command: '{"jsonrpc":"2.0","method":"notification.list"}'
  params: []

- id: notification_listsuppressed
  label: List Suppressed Notifications
  kind: query
  command: '{"jsonrpc":"2.0","method":"notification.listsuppressed"}'
  params: []

- id: notification_log
  label: List Saved Notification Log
  kind: query
  command: '{"jsonrpc":"2.0","method":"notification.log"}'
  params: []

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: '{"jsonrpc":"2.0","method":"notification.dismiss","params":{"id":"{id}","response":"{response}"}}'
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: Response enum (NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS)

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: '{"jsonrpc":"2.0","method":"notification.suppress","params":{"code":"{code}"}}'
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: '{"jsonrpc":"2.0","method":"notification.unsuppress","params":{"code":"{code}"}}'
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: '{"jsonrpc":"2.0","method":"notification.unsuppressall"}'
  params: []

- id: notification_logger_transfer_download
  label: Download Notification Log File
  kind: query
  command: 'curl -O -J http://{host}/api/notification/logger/transfer'
  params:
    - name: host
      type: string

# ===== Optics - focus =====

- id: optics_focus_calibrate
  label: Calibrate Focus
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.calibrate"}'
  params: []

- id: optics_focus_runforward
  label: Focus Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.runforward"}'
  params: []

- id: optics_focus_runreverse
  label: Focus Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.runreverse"}'
  params: []

- id: optics_focus_stop
  label: Focus Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.stop"}'
  params: []

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.stepforward"}'
  params: []

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.stepreverse"}'
  params: []

- id: optics_focus_runforwardtime
  label: Focus Run Forward for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.runforwardtime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer
      description: Duration in milliseconds

- id: optics_focus_runreversetime
  label: Focus Run Reverse for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.runreversetime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer
      description: Duration in milliseconds

- id: optics_focus_addlocation
  label: Add Focus Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.addlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

- id: optics_focus_setlocation
  label: Set Focus to Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.focus.setlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

# ===== Optics - lensshift horizontal =====

- id: optics_lensshift_horizontal_calibrate
  label: Calibrate Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.calibrate"}'
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Lens Shift Horizontal Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runforward"}'
  params: []

- id: optics_lensshift_horizontal_runreverse
  label: Lens Shift Horizontal Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runreverse"}'
  params: []

- id: optics_lensshift_horizontal_stop
  label: Lens Shift Horizontal Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stop"}'
  params: []

- id: optics_lensshift_horizontal_stepforward
  label: Lens Shift Horizontal Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stepforward"}'
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Lens Shift Horizontal Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stepreverse"}'
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens Shift Horizontal Run Forward for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runforwardtime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_lensshift_horizontal_runreversetime
  label: Lens Shift Horizontal Run Reverse for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runreversetime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_lensshift_horizontal_addlocation
  label: Add Lens Shift Horizontal Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.addlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_setlocation
  label: Set Lens Shift Horizontal to Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.horizontal.setlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

# ===== Optics - lensshift vertical =====

- id: optics_lensshift_vertical_calibrate
  label: Calibrate Lens Shift Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.calibrate"}'
  params: []

- id: optics_lensshift_vertical_runforward
  label: Lens Shift Vertical Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.runforward"}'
  params: []

- id: optics_lensshift_vertical_runreverse
  label: Lens Shift Vertical Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.runreverse"}'
  params: []

- id: optics_lensshift_vertical_stop
  label: Lens Shift Vertical Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.stop"}'
  params: []

- id: optics_lensshift_vertical_stepforward
  label: Lens Shift Vertical Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.stepforward"}'
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Lens Shift Vertical Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.stepreverse"}'
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens Shift Vertical Run Forward for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.runforwardtime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_lensshift_vertical_runreversetime
  label: Lens Shift Vertical Run Reverse for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.runreversetime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_lensshift_vertical_addlocation
  label: Add Lens Shift Vertical Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.addlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_setlocation
  label: Set Lens Shift Vertical to Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.lensshift.vertical.setlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

# ===== Optics - zoom =====

- id: optics_zoom_calibrate
  label: Calibrate Zoom
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.calibrate"}'
  params: []

- id: optics_zoom_runforward
  label: Zoom Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.runforward"}'
  params: []

- id: optics_zoom_runreverse
  label: Zoom Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.runreverse"}'
  params: []

- id: optics_zoom_stop
  label: Zoom Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.stop"}'
  params: []

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.stepforward"}'
  params: []

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.stepreverse"}'
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Run Forward for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.runforwardtime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_zoom_runreversetime
  label: Zoom Run Reverse for Duration
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.runreversetime","params":{"duration":{duration}}}'
  params:
    - name: duration
      type: integer

- id: optics_zoom_addlocation
  label: Add Zoom Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.addlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

- id: optics_zoom_setlocation
  label: Set Zoom to Location
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.zoom.setlocation","params":{"location":"{location}"}}'
  params:
    - name: location
      type: string

# ===== Optics - other =====

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: '{"jsonrpc":"2.0","method":"optics.getvalidlensids"}'
  params: []

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.setlensid","params":{"lensid":{lensid},"powerlensid":{powerlensid}}}'
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_shifttocenter
  label: Shift Lens to Center
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.shifttocenter"}'
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: '{"jsonrpc":"2.0","method":"optics.shutter.toggle"}'
  params: []

- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: '{"jsonrpc":"2.0","method":"optics.shutter.getobjectpath"}'
  params: []

# ===== Peripheral - frame horizontal =====

- id: peripheral_frame_horizontal_calibrate
  label: Calibrate Frame Horizontal
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.calibrate"}'
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame Horizontal Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.runforward"}'
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame Horizontal Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.runreverse"}'
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame Horizontal Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stepforward"}'
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame Horizontal Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stepreverse"}'
  params: []

- id: peripheral_frame_horizontal_stop
  label: Frame Horizontal Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stop"}'
  params: []

# ===== Peripheral - frame vertical =====

- id: peripheral_frame_vertical_calibrate
  label: Calibrate Frame Vertical
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.calibrate"}'
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame Vertical Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.runforward"}'
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame Vertical Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.runreverse"}'
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame Vertical Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.stepforward"}'
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame Vertical Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.stepreverse"}'
  params: []

- id: peripheral_frame_vertical_stop
  label: Frame Vertical Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.vertical.stop"}'
  params: []

# ===== Peripheral - frame rotation =====

- id: peripheral_frame_rotation_calibrate
  label: Calibrate Frame Rotation
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.calibrate"}'
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation Run Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.runforward"}'
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation Run Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.runreverse"}'
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation Step Forward
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.stepforward"}'
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation Step Reverse
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.stepreverse"}'
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame Rotation Stop
  kind: action
  command: '{"jsonrpc":"2.0","method":"peripheral.frame.rotation.stop"}'
  params: []

# ===== Remote control =====

- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"remotecontrol.listsensors"}'
  params: []

# ===== Statistics =====

- id: statistics_listcounters
  label: List Counters
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.listcounters"}'
  params: []

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Counter Name
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.laserruntime.getname"}'
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Counter Unit
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.laserruntime.getunit"}'
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Counter Name
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.laserstrikes.getname"}'
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Counter Unit
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.laserstrikes.getunit"}'
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Counter Name
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.projectorruntime.getname"}'
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Counter Unit
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.projectorruntime.getunit"}'
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Counter Name
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.systemtime.getname"}'
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Counter Unit
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.systemtime.getunit"}'
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Counter Name
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.uptime.getname"}'
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Counter Unit
  kind: query
  command: '{"jsonrpc":"2.0","method":"statistics.uptime.getunit"}'
  params: []

# ===== UI settings =====

- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: '{"jsonrpc":"2.0","method":"ui.settings.get","params":{"key":"{key}"}}'
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: '{"jsonrpc":"2.0","method":"ui.settings.set","params":{"key":"{key}","value":"{value}"}}'
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: '{"jsonrpc":"2.0","method":"ui.settings.remove","params":{"key":"{key}"}}'
  params:
    - name: key
      type: string

- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: '{"jsonrpc":"2.0","method":"ui.settings.list"}'
  params: []

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: '{"jsonrpc":"2.0","method":"ui.settings.keys"}'
  params: []

- id: ui_settings_geticons
  label: Get UI Icons
  kind: query
  command: '{"jsonrpc":"2.0","method":"ui.settings.geticons","params":{"category":"{category}"}}'
  params:
    - name: category
      type: string
      description: Category enum (Source, Connector, TestPattern)

- id: ui_settings_getfonticons
  label: Get UI Font Icons
  kind: query
  command: '{"jsonrpc":"2.0","method":"ui.settings.getfonticons","params":{"category":"{category}"}}'
  params:
    - name: category
      type: string
      description: Category enum (Source, Connector, TestPattern)

- id: ui_togglestealthmode
  label: Toggle Stealth Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"ui.togglestealthmode"}'
  params: []
  description: Deprecated; prefer setting ui.stealthmode property
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  description: Projector power state
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

- id: illumination_state
  type: enum
  description: Light source state
  values:
    - On
    - Off

- id: active_source
  type: string
  description: Currently active source name

- id: property_changed
  type: notification
  description: Property change notification

- id: signal_callback
  type: notification
  description: Signal callback notification

- id: environment_data
  type: object
  description: Temperature, fan speed, and other environment sensor readings

- id: environment_alarmstate
  type: enum
  description: Environment alarm state
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: illumination_clo_availability
  type: enum
  description: Constant Light Output availability
  values:
    - Available
    - SensorUnavailable
    - PendingWarmup
    - Unavailable
    - Unknown

- id: illumination_clo_state
  type: enum
  description: CLO state
  values:
    - Ok
    - TooDim
    - TooBright

- id: illumination_sources_laser_ispowerlimited
  type: boolean
  description: Whether laser power is currently limited

- id: optics_shutter_position
  type: enum
  description: Shutter position
  values:
    - Open
    - Closed

- id: firmware_firmwareversion
  type: string
  description: Installed firmware version

- id: system_modelname
  type: string
  description: Projector model name

- id: system_serialnumber
  type: string
  description: Projector serial number

- id: connector_detectedsignal
  type: object
  description: Detected signal info on a connector (active, resolution, refresh, color space, etc.)

- id: network_device_state
  type: enum
  description: Network device state
  values:
    - CONNECTED
    - DISCONNECTED
```

## Variables
```yaml
- id: image_brightness
  type: float
  constraints:
    min: -1
    max: 1
    step: 0.01
  description: Image brightness offset (0 = default)

- id: image_contrast
  type: float
  constraints:
    min: 0
    max: 2
    step: 0.01
  description: Image contrast/gain (1 = default)

- id: image_saturation
  type: float
  constraints:
    min: 0
    max: 2
    step: 0.01
  description: Image color saturation (1 = default)

- id: image_sharpness
  type: integer
  constraints:
    min: -2
    max: 8
    step: 1
  description: Image sharpness (normalized)

- id: image_gamma
  type: float
  constraints:
    min: 1
    max: 3
    step: 0.1
  description: Image gamma (default 2.2)

- id: image_intensity
  type: float
  constraints:
    min: 0
    max: 1
    step: 0.01
  description: Intensity

- id: screen_hdrboost
  type: float
  constraints:
    min: 0.8
    max: 1.2
    step: 0.01
  description: HDR intensity

- id: screen_luminance
  type: float
  constraints:
    min: 50
    max: 10000
    step: 10
  description: Maximum luminance on screen in cd/m2

- id: illumination_sources_laser_power
  type: float
  description: Laser power percentage

- id: illumination_sources_laser_minpower
  type: float
  description: Minimum laser power percentage

- id: illumination_sources_laser_maxpower
  type: float
  description: Maximum laser power percentage

- id: illumination_clo_setpoint
  type: float
  description: CLO target luminosity

- id: illumination_clo_scale
  type: float
  description: CLO setpoint scale percentage

- id: image_processing_warp_enable
  type: boolean
  description: Global warp enable

- id: image_processing_warp_file_selected
  type: string
  description: Selected warp grid filename

- id: image_processing_warp_file_enable
  type: boolean
  description: Warp file enable

- id: image_processing_blend_file_selected
  type: string
  description: Selected blend mask filename(s)

- id: image_processing_blend_file_enable
  type: boolean
  description: Blend mask enable

- id: image_processing_blend_scurve
  type: float
  constraints:
    min: 1
    max: 4
    step: 0.1
  description: Blend S-curve exponent

- id: image_processing_blacklevel_file_selected
  type: string
  description: Selected black level mask filename

- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Black level mask enable

- id: image_processing_blacklevel_basicblacklevel_level
  type: integer
  constraints:
    min: 0
    max: 65535
    step: 1
  description: Black level adjustment upper level

- id: image_processing_blacklevel_basicblacklevel_top
  type: integer
  description: Black level top edge

- id: image_processing_blacklevel_basicblacklevel_bottom
  type: integer
  description: Black level bottom edge

- id: image_processing_blacklevel_basicblacklevel_left
  type: integer
  description: Black level left edge

- id: image_processing_blacklevel_basicblacklevel_right
  type: integer
  description: Black level right edge

- id: image_processing_blacklevel_basicblacklevel_enable
  type: boolean
  description: Black level basic enable

- id: image_processing_blend_basicblend_top_start
  type: integer
  description: Blend top edge Start

- id: image_processing_blend_basicblend_top_width
  type: integer
  description: Blend top edge Width

- id: image_processing_blend_basicblend_bottom_start
  type: integer
  description: Blend bottom edge Start

- id: image_processing_blend_basicblend_bottom_width
  type: integer
  description: Blend bottom edge Width

- id: image_processing_blend_basicblend_left_start
  type: integer
  description: Blend left edge Start

- id: image_processing_blend_basicblend_left_width
  type: integer
  description: Blend left edge Width

- id: image_processing_blend_basicblend_right_start
  type: integer
  description: Blend right edge Start

- id: image_processing_blend_basicblend_right_width
  type: integer
  description: Blend right edge Width

- id: image_processing_blend_basicblend_enable
  type: boolean
  description: Blend basic enable

- id: image_processing_warp_bow_enable
  type: boolean
  description: Bow warp enable

- id: image_processing_warp_bow_symmetric
  type: boolean
  description: Bow warp symmetric mode

- id: image_processing_warp_bow_topleftu_angle
  type: float
  description: Bow warp top-left U angle

- id: image_processing_warp_bow_topleftu_length
  type: float
  description: Bow warp top-left U length

- id: image_processing_warp_bow_topleftv_angle
  type: float
  description: Bow warp top-left V angle

- id: image_processing_warp_bow_topleftv_length
  type: float
  description: Bow warp top-left V length

- id: image_processing_warp_bow_toprightu_angle
  type: float
  description: Bow warp top-right U angle

- id: image_processing_warp_bow_toprightu_length
  type: float
  description: Bow warp top-right U length

- id: image_processing_warp_bow_toprightv_angle
  type: float
  description: Bow warp top-right V angle

- id: image_processing_warp_bow_toprightv_length
  type: float
  description: Bow warp top-right V length

- id: image_processing_warp_bow_bottomleftu_angle
  type: float
  description: Bow warp bottom-left U angle

- id: image_processing_warp_bow_bottomleftu_length
  type: float
  description: Bow warp bottom-left U length

- id: image_processing_warp_bow_bottomleftv_angle
  type: float
  description: Bow warp bottom-left V angle

- id: image_processing_warp_bow_bottomleftv_length
  type: float
  description: Bow warp bottom-left V length

- id: image_processing_warp_bow_bottomrightu_angle
  type: float
  description: Bow warp bottom-right U angle

- id: image_processing_warp_bow_bottomrightu_length
  type: float
  description: Bow warp bottom-right U length

- id: image_processing_warp_bow_bottomrightv_angle
  type: float
  description: Bow warp bottom-right V angle

- id: image_processing_warp_bow_bottomrightv_length
  type: float
  description: Bow warp bottom-right V length

- id: image_processing_warp_fourcorners_enable
  type: boolean
  description: Four corners warp enable

- id: image_processing_warp_fourcorners_screenwidth
  type: float
  description: Four corners screen width

- id: image_processing_warp_fourcorners_screenheight
  type: float
  description: Four corners screen height

- id: image_processing_warp_fourcorners_topleft_x
  type: integer
  description: Top-left corner X

- id: image_processing_warp_fourcorners_topleft_y
  type: integer
  description: Top-left corner Y

- id: image_processing_warp_fourcorners_topright_x
  type: integer
  description: Top-right corner X

- id: image_processing_warp_fourcorners_topright_y
  type: integer
  description: Top-right corner Y

- id: image_processing_warp_fourcorners_bottomleft_x
  type: integer
  description: Bottom-left corner X

- id: image_processing_warp_fourcorners_bottomleft_y
  type: integer
  description: Bottom-left corner Y

- id: image_processing_warp_fourcorners_bottomright_x
  type: integer
  description: Bottom-right corner X

- id: image_processing_warp_fourcorners_bottomright_y
  type: integer
  description: Bottom-right corner Y

- id: image_processing_transportdelay_desired
  type: integer
  description: Desired transport delay

- id: image_processing_transportdelay_actual
  type: integer
  description: Actual transport delay

- id: image_processing_transportdelay_minimum
  type: integer
  description: Minimum transport delay

- id: image_testpattern_selected
  type: string
  description: Selected test pattern id

- id: image_testpattern_show
  type: boolean
  description: Show test pattern

- id: image_window_main_source
  type: string
  description: Source displayed in main window

- id: image_window_main_scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch
  description: Main window scaling mode

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR
  description: Projection orientation

- id: image_display_desireddisplaymode
  type: enum
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift
  description: Desired display mode

- id: image_display_displaymode
  type: enum
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift
  description: Current display mode

- id: image_display_frequency
  type: float
  description: Display frequency

- id: image_display_synchronouslock
  type: boolean
  description: Display synchronous lock

- id: image_convergence_red_x
  type: integer
  description: Red convergence X

- id: image_convergence_red_y
  type: integer
  description: Red convergence Y

- id: image_convergence_green_x
  type: integer
  description: Green convergence X

- id: image_convergence_green_y
  type: integer
  description: Green convergence Y

- id: image_convergence_blue_x
  type: integer
  description: Blue convergence X

- id: image_convergence_blue_y
  type: integer
  description: Blue convergence Y

- id: image_stereo_darktime
  type: integer
  description: Stereo darktime in microseconds

- id: image_stereo_swapframepair
  type: boolean
  description: Swap stereo frame pair

- id: image_stereo_glassync_delay
  type: integer
  description: Glass sync delay in microseconds

- id: image_stereo_glassync_invert
  type: boolean
  description: Glass sync invert

- id: image_color_p7_custom_redgain
  type: float
  description: Red gain

- id: image_color_p7_custom_greengain
  type: float
  description: Green gain

- id: image_color_p7_custom_bluegain
  type: float
  description: Blue gain

- id: image_color_p7_custom_cyangain
  type: float
  description: Cyan gain

- id: image_color_p7_custom_magentagain
  type: float
  description: Magenta gain

- id: image_color_p7_custom_yellowgain
  type: float
  description: Yellow gain

- id: image_color_p7_custom_whitegain
  type: float
  description: White gain

- id: image_color_p7_custom_whitetemperature
  type: integer
  constraints:
    min: 3200
    max: 13000
    step: 100
  description: White point temperature

- id: image_color_rgbmode_rgbmode
  type: enum
  values:
    - Full
    - Red
    - Green
    - Blue
    - RedGreen
    - GreenBlue
    - BlueRed
  description: RGB mode

- id: optics_zoom_position
  type: integer
  description: Current zoom position

- id: optics_zoom_target
  type: integer
  description: Desired zoom target

- id: optics_zoom_minposition
  type: integer
  description: Minimum zoom position

- id: optics_zoom_maxposition
  type: integer
  description: Maximum zoom position

- id: optics_zoom_enabled
  type: boolean
  description: Zoom enabled

- id: optics_zoom_safetooperate
  type: boolean
  description: Zoom safe to operate

- id: optics_zoom_safetocalibrate
  type: boolean
  description: Zoom safe to calibrate

- id: optics_zoom_state
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing
  description: Zoom motor state

- id: optics_zoom_calibrationstate
  type: enum
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented
  description: Zoom calibration state

- id: optics_focus_position
  type: integer
  description: Current focus position

- id: optics_focus_target
  type: integer
  description: Desired focus target

- id: optics_focus_minposition
  type: integer
  description: Minimum focus position

- id: optics_focus_maxposition
  type: integer
  description: Maximum focus position

- id: optics_focus_enabled
  type: boolean
  description: Focus enabled

- id: optics_focus_safetooperate
  type: boolean
  description: Focus safe to operate

- id: optics_focus_safetocalibrate
  type: boolean
  description: Focus safe to calibrate

- id: optics_focus_state
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing
  description: Focus motor state

- id: optics_focus_calibrationstate
  type: enum
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented
  description: Focus calibration state

- id: optics_lensshift_horizontal_position
  type: integer
  description: Current lens shift horizontal position

- id: optics_lensshift_horizontal_target
  type: integer
  description: Desired lens shift horizontal target

- id: optics_lensshift_horizontal_minposition
  type: integer
  description: Minimum lens shift horizontal position

- id: optics_lensshift_horizontal_maxposition
  type: integer
  description: Maximum lens shift horizontal position

- id: optics_lensshift_horizontal_enabled
  type: boolean
  description: Lens shift horizontal enabled

- id: optics_lensshift_horizontal_safetooperate
  type: boolean
  description: Lens shift horizontal safe to operate

- id: optics_lensshift_horizontal_safetocalibrate
  type: boolean
  description: Lens shift horizontal safe to calibrate

- id: optics_lensshift_horizontal_state
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing
  description: Lens shift horizontal motor state

- id: optics_lensshift_horizontal_calibrationstate
  type: enum
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented
  description: Lens shift horizontal calibration state

- id: optics_lensshift_vertical_position
  type: integer
  description: Current lens shift vertical position

- id: optics_lensshift_vertical_target
  type: integer
  description: Desired lens shift vertical target

- id: optics_lensshift_vertical_minposition
  type: integer
  description: Minimum lens shift vertical position

- id: optics_lensshift_vertical_maxposition
  type: integer
  description: Maximum lens shift vertical position

- id: optics_lensshift_vertical_enabled
  type: boolean
  description: Lens shift vertical enabled

- id: optics_lensshift_vertical_safetooperate
  type: boolean
  description: Lens shift vertical safe to operate

- id: optics_lensshift_vertical_safetocalibrate
  type: boolean
  description: Lens shift vertical safe to calibrate

- id: optics_lensshift_vertical_state
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing
  description: Lens shift vertical motor state

- id: optics_lensshift_vertical_calibrationstate
  type: enum
  values:
    - Unknown
    - Ok
    - Busy
    - Error
    - NotImplemented
  description: Lens shift vertical calibration state

- id: optics_shutter_target
  type: enum
  values:
    - Open
    - Closed
  description: Shutter target

- id: optics_shutter_enabled
  type: boolean
  description: Shutter enabled

- id: optics_lenspresent
  type: boolean
  description: Lens installed

- id: dmx_artnet
  type: boolean
  description: Artnet enabled

- id: dmx_artnetnet
  type: integer
  description: Artnet net

- id: dmx_artnetuniverse
  type: integer
  description: Artnet universe

- id: dmx_mode
  type: string
  description: Current DMX mode

- id: dmx_startchannel
  type: integer
  constraints:
    min: 1
    max: 512
  description: DMX start channel

- id: dmx_shutdown
  type: boolean
  description: DMX shutdown enabled

- id: dmx_shutdowntimeout
  type: integer
  description: DMX shutdown timeout (minutes)

- id: dmx_monitor_connectionstate_active
  type: boolean
  description: DMX/Artnet connection active in last 10s

- id: dmx_monitor_channel01_function
  type: string
  description: DMX monitor channel 1 function

- id: dmx_monitor_channel01_offset
  type: integer
  description: DMX monitor channel 1 offset

- id: dmx_monitor_channel01_value
  type: integer
  description: DMX monitor channel 1 value

- id: remotecontrol_address
  type: integer
  constraints:
    min: 1
    max: 31
  description: Remote control address

- id: remotecontrol_broadcastaddress
  type: integer
  constraints:
    min: 0
    max: 1
  description: Remote control broadcast address

- id: remotecontrol_sensors_front_enable
  type: boolean
  description: Front IR sensor enable

- id: remotecontrol_sensors_rear_enable
  type: boolean
  description: Rear IR sensor enable

- id: remotecontrol_sensors_side_enable
  type: boolean
  description: Side IR sensor enable

- id: ui_backlight_state
  type: enum
  values:
    - "Off"
    - "On"
    - Auto
  description: LCD backlight state

- id: ui_backlight_timeout
  type: integer
  description: LCD backlight timeout (seconds)

- id: ui_stealthmode
  type: enum
  values:
    - "Off"
    - "On"
  description: Stealth mode (all controllable LEDs off)

- id: ui_osd
  type: boolean
  description: On-screen display enable

- id: ui_menu
  type: boolean
  description: Menu show/hide

- id: ui_minimize
  type: boolean
  description: Minimize menu when enabled

- id: ui_sourcesignal
  type: boolean
  description: Source signal info popup

- id: ui_poweroffhint
  type: boolean
  description: Show power-off hint dialog

- id: ui_access_enduser
  type: boolean
  description: End user access available

- id: ui_access_poweruser
  type: boolean
  description: Power user access available

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
  description: Power-on initial state

- id: system_eco_enable
  type: boolean
  description: ECO state enable

- id: system_eco_available
  type: boolean
  description: ECO state available

- id: system_standby_enable
  type: boolean
  description: Standby state enable

- id: system_standby_available
  type: boolean
  description: Standby state available

- id: system_error_timeout_enable
  type: boolean
  description: Error timeout enable

- id: system_error_timeout_duration
  type: integer
  description: Error timeout duration (seconds)

- id: system_ready_timeout_enable
  type: boolean
  description: Ready timeout enable

- id: system_ready_timeout_duration
  type: integer
  description: Ready timeout duration (seconds)

- id: system_on_timeout_enable
  type: boolean
  description: On-state timeout enable

- id: system_on_timeout_duration
  type: integer
  description: On-state timeout duration (seconds)

- id: system_standby_timeout_enable
  type: boolean
  description: Standby timeout enable

- id: system_standby_timeout_duration
  type: integer
  description: Standby timeout duration (seconds)

- id: gsm_available
  type: boolean
  description: GSM card present

- id: gsm_pinstate
  type: enum
  values:
    - Accepted
    - Failed
    - Locked
    - Unknown
  description: GSM PIN state

- id: network_hostname
  type: string
  description: Network hostname

- id: network_version
  type: string
  description: Networking Service version

- id: notification_count
  type: integer
  description: Notifications received and dismissed

- id: notificationfiltercodes
  type: array
  description: Filter display of notifications by code

- id: notificationfilterseverity
  type: enum
  values:
    - CRITICAL
    - ERROR
    - WARNING
    - INFO
    - NONE
  description: Filter display of notifications by severity
```

## Events
```yaml
- id: property_changed
  params:
    - name: property
      type: array
      description: Array of property/value pairs

- id: signal_callback
  params:
    - name: signal
      type: array
      description: Array of signal/argument pairs

- id: modelupdated
  description: Triggered when objects are added or removed
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: newobject
      type: boolean
      description: True if added, false if removed
    - name: accesslevel
      type: enum
      description: Minimum access level for the object

- id: image_processing_warpgrid_gridchanged
  description: Fired when warp grid changes (with grid payload)

- id: image_processing_warpgrid_changed
  description: Fired when the warp grid changes (without payload)

- id: image_processing_warp_file_listchanged
  description: Fired when warp file list changes

- id: image_processing_blend_file_listchanged
  description: Fired when blend file list changes

- id: image_processing_blacklevel_file_listchanged
  description: Fired when black level file list changes

- id: image_connector_l1displayport_edid_listchanged
  description: Fired when L1 DisplayPort EDID list changes

- id: image_connector_l1hdbaset1_edid_listchanged
  description: Fired when L1 HDBaseT1 EDID list changes

- id: image_connector_l1hdbaset2_edid_listchanged
  description: Fired when L1 HDBaseT2 EDID list changes

- id: image_connector_l1hdmi_edid_listchanged
  description: Fired when L1 HDMI EDID list changes

- id: image_connector_l2displayporta_edid_listchanged
  description: Fired when L2 DisplayPort A EDID list changes

- id: image_connector_l2displayportb_edid_listchanged
  description: Fired when L2 DisplayPort B EDID list changes

- id: image_connector_l2displayportc_edid_listchanged
  description: Fired when L2 DisplayPort C EDID list changes

- id: image_connector_l2displayportd_edid_listchanged
  description: Fired when L2 DisplayPort D EDID list changes

- id: image_testpattern_added
  description: Fired when a test pattern is added

- id: image_testpattern_changed
  description: Fired when a test pattern changes

- id: image_testpattern_removed
  description: Fired when a test pattern is removed

- id: image_testpattern_file_listchanged
  description: Fired when custom test pattern file list changes

- id: network_added
  description: Raised when a new network device is added
  params:
    - name: id
      type: string
      description: Logical device id

- id: network_removed
  description: Raised when a network device is removed
  params:
    - name: id
      type: string
      description: Logical device id

- id: notification_emitted
  description: Fired when a new notification is emitted

- id: notification_dismissed
  description: Fired when a notification is dismissed

- id: system_performed
  description: Emitted when one or more reset domains have completed resetting

- id: system_identificationchanged
  description: Raised whenever an identification changes

- id: system_license_licensechanged
  description: Raised when the license file changes

- id: ui_settings_added
  description: Fired when a new UI settings key/value pair is added

- id: ui_settings_changed
  description: Fired when a UI settings key value updates

- id: ui_settings_removed
  description: Fired when a UI settings key is removed
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- JSON-RPC 2.0 is the wire protocol for both TCP and serial connections
- All parameters passed by name; order does not matter
- It is best practice to wait for `property.set` confirmation before setting the same property again
- ECO mode wake-up requires wake-on-LAN, remote/keypad, or special RS-232 command `:POWR1\r`
- File upload/download uses HTTP endpoints (e.g., `/api/image/processing/warp/file/transfer`) via curl `-F file=@<path>` (upload) or `curl -O -J` (download)
- Source names translated to object names by removing non-word characters and converting to lowercase (e.g., "DisplayPort 1" -> "displayport1")
- Authentication is optional for normal end user access; required only for elevated access levels (POWER_USER, SERVICE_PARTNER, etc.)
- Per-source and per-connector methods (e.g., `image.source.{name}.listconnectors`, `image.connector.{name}.edid.list`) follow a parameterized pattern; the full set of valid object names is discovered via `image.source.list`, `image.connector.list`, and `introspect`
- Warp file format is the same as on the MCM500/400
- Blend/black-level masks are grayscale PNG/JPEG/TIFF; colour images accepted but only the blue channel is used
- Per-connector properties exist for level1 and level2 connectors (DisplayPort, HDBaseT, HDMI, SDI-A/B/C/D); access via `property.get`/`property.set` with dot notation (e.g., `image.connector.l1hdmi.signalrange`)
- Per-source layout properties exist for each source object (e.g., `image.source.l1quadsdi.layout`); access via `property.get`/`property.set`
- Image processing basic black level / basic blend corner positions are 4-sided rectangles (start + width); bow warp and four-corners warp are alternatives for finer geometric correction
- DMX monitor exposes per-channel function/offset/value properties (channel01..channelNN as discovered via introspection)
- Flex Brightness licensing restricts maximum light output, settable via authorization code or signed code/signature pair
<!-- UNRESOLVED: specific pass code format/credential not stated -->
<!-- UNRESOLVED: voltage, current, power specifications not in source -->
<!-- UNRESOLVED: DMX/artnet configuration details not fully documented -->
<!-- UNRESOLVED: full property list exceeds what is captured here; introspection API available -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T18:01:02.770Z
last_checked_at: 2026-07-21T21:24:43.198Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:24:43.198Z
matched_actions: 178
action_count: 178
confidence: medium
summary: "All 178 spec actions map 1:1 to documented JSON-RPC methods, RS-232 command, or file endpoints; transport params match verbatim; source fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "pass code / authentication credential format not specified in source"
- "pass code format not specified; source shows example code 98765"
- "no explicit multi-step macros described in source"
- "no explicit safety warnings or interlock procedures in source"
- "specific pass code format/credential not stated"
- "voltage, current, power specifications not in source"
- "DMX/artnet configuration details not fully documented"
- "full property list exceeds what is captured here; introspection API available"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
