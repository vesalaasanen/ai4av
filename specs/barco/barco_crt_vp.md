---
spec_id: admin/barco-crt-vp
schema_version: ai4av-public-spec-v1
revision: 2
title: "Barco CRT VP Control Spec"
manufacturer: Barco
model_family: "Barco CRT VP"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco CRT VP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T03:39:16.329Z
last_checked_at: 2026-07-13T06:40:27.320Z
generated_at: 2026-07-13T06:40:27.320Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model number not stated in source; derived from filename"
  - "explicit safety warnings or interlock procedures not present in source beyond standard \"verify state before issuing power commands\""
  - "specific model variant not stated — CRT VP family model designation unclear"
  - "firmware version compatibility not stated in source"
  - "authentication pass code format/entropy not stated"
  - "default IP address or DHCP behavior not stated"
  - "command timing / rate limiting not stated"
verification:
  verdict: verified
  checked_at: 2026-07-13T06:40:27.320Z
  matched_actions: 207
  action_count: 207
  confidence: medium
  summary: "All 207 spec actions match literal JSON-RPC methods, the RS-232 wake ASCII string, or curl file-transfer endpoints documented verbatim in source after removal of the fabricated firmware-download action; transport values (port 9090, 19200/8/N/1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Barco CRT VP Control Spec

## Summary
Barco CRT VP projector and professional display system. Supports both RS-232 serial and TCP/IP control via JSON-RPC 2.0 API on port 9090. Authentication is optional for normal end-user access; elevated access requires a numeric pass code. File upload/download via HTTP at `/api` endpoints. ECO mode wake also supports serial `:POWR1\r` ASCII command.

<!-- UNRESOLVED: specific model number not stated in source; derived from filename -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # stated: TCP service available on port number 9090
serial:
  baud_rate: 19200  # stated: baud rate 19200
  data_bits: 8  # stated: data bits 8
  parity: none  # stated: parity None
  stop_bits: 1  # stated: stop bits 1
  flow_control: none  # stated: flow control None
auth:
  type: none  # inferred: normal end-user access requires no auth; auth optional for higher access
```

## Traits
```yaml
- powerable    # inferred: system.poweron / system.poweroff commands present
- queryable    # inferred: property.get commands returning state present
- routable     # inferred: source selection and input routing commands present
- levelable    # inferred: brightness, contrast, gamma, color gain controls present
```

## Actions
```yaml
# CRITICAL: each method below is enumerated as one action; literal JSON-RPC payloads preserved verbatim from source.

- id: system_poweron
  label: Power On
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.poweron" }'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.poweroff" }'
  params: []

- id: system_gotoeco
  label: Set Device in ECO State
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.gotoeco" }'
  params: []

- id: system_gotoready
  label: Set Device in Ready State
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.gotoready" }'
  params: []

- id: system_reboot
  label: Reboot Projector (Powers Off First)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.reboot" }'
  params: []

- id: system_reset
  label: Reset Selected Domains (Asynchronous)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.reset", "params": { "domains": ["ImageConnector","ImageSource","ImageFeatures","ImageRealColor","ImageWarp","ImageBlend","ImageOrientation","ImageResolution","ImageStereo","ImageDisplay","ImageTestPattern","ImageConvergence","UserInterface","Optics","Illumination","Network","Screen","System","LightMeasurement","Dmx"] } }'
  params:
    - name: domains
      type: array
      description: Reset domains (ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx)

- id: system_resetall
  label: Reset All Domains (Asynchronous)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.resetall" }'
  params: []

- id: system_listresetdomains
  label: List Available Reset Domains
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.listresetdomains" }'
  params: []

- id: system_activity
  label: Signal User Activity (Resets Timeout Countdown Timers)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.activity" }'
  params: []

- id: system_getidentification
  label: Get System Identification
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.getidentification" }'
  params: []

- id: system_getidentifications
  label: Get All System Identifications
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.getidentifications" }'
  params: []

- id: system_getsystemdate
  label: Get System Date (UTC)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.getsystemdate" }'
  params: []

- id: system_boards_getboardinfo
  label: Get Board Properties
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.boards.getboardinfo", "params": { "boardname": "" } }'
  params:
    - name: boardname
      type: string
      description: Board name

- id: system_boards_getboardlist
  label: List Boards
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.boards.getboardlist" }'
  params: []

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.boards.getdeviceinfo", "params": { "boardname": "" } }'
  params:
    - name: boardname
      type: string

- id: system_boards_getmissingboardlist
  label: List Missing Boards
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.boards.getmissingboardlist" }'
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.boards.getmoduleinfo", "params": { "boardname": "" } }'
  params:
    - name: boardname
      type: string

- id: property_set
  label: Set Property
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "image.window.main.source")
    - name: value
      type: mixed
      description: New value for the property

- id: property_get
  label: Get Property
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Property name in dot notation (single string or array)

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Property name or array of names to subscribe to

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Property name or array of names to unsubscribe from

- id: authenticate
  label: Authenticate
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "authenticate", "params": { "code": {code} } }'
  params:
    - name: code
      type: integer
      description: Pass code for elevated access level

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string
      description: Signal name or array of names to subscribe to

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string
      description: Signal name or array of names to unsubscribe from

- id: introspect
  label: Introspect Object
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true } }'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty introspects everything)
    - name: recursive
      type: boolean
      description: Whether to recursively introspect (default true)

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.list" }'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.list" }'
  params: []

- id: image_window_list
  label: List Available Windows
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.window.list" }'
  params: []

- id: image_resolution_list
  label: List Possible Resolutions
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.resolution.list" }'
  params: []

- id: image_display_listdisplaymodes
  label: List Possible Display Modes
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.display.listdisplaymodes" }'
  params: []

- id: image_source_l1displayport_listconnectors
  label: List Connectors for Source l1displayport
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1displayport.listconnectors" }'
  params: []

- id: image_source_l1hdbaset1_listconnectors
  label: List Connectors for Source l1hdbaset1
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1hdbaset1.listconnectors" }'
  params: []

- id: image_source_l1hdbaset2_listconnectors
  label: List Connectors for Source l1hdbaset2
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1hdbaset2.listconnectors" }'
  params: []

- id: image_source_l1hdmi_listconnectors
  label: List Connectors for Source l1hdmi
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1hdmi.listconnectors" }'
  params: []

- id: image_source_l1quadsdi_listconnectors
  label: List Connectors for Source l1quadsdi
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1quadsdi.listconnectors" }'
  params: []

- id: image_source_l1sdia_listconnectors
  label: List Connectors for Source l1sdia
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1sdia.listconnectors" }'
  params: []

- id: image_source_l1sdib_listconnectors
  label: List Connectors for Source l1sdib
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1sdib.listconnectors" }'
  params: []

- id: image_source_l1sdic_listconnectors
  label: List Connectors for Source l1sdic
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1sdic.listconnectors" }'
  params: []

- id: image_source_l1sdid_listconnectors
  label: List Connectors for Source l1sdid
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l1sdid.listconnectors" }'
  params: []

- id: image_source_l2displayporta_listconnectors
  label: List Connectors for Source l2displayporta
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2displayporta.listconnectors" }'
  params: []

- id: image_source_l2displayportb_listconnectors
  label: List Connectors for Source l2displayportb
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2displayportb.listconnectors" }'
  params: []

- id: image_source_l2displayportc_listconnectors
  label: List Connectors for Source l2displayportc
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2displayportc.listconnectors" }'
  params: []

- id: image_source_l2displayportd_listconnectors
  label: List Connectors for Source l2displayportd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2displayportd.listconnectors" }'
  params: []

- id: image_source_l2dualdpab_listconnectors
  label: List Connectors for Source l2dualdpab
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualdpab.listconnectors" }'
  params: []

- id: image_source_l2dualdpac_listconnectors
  label: List Connectors for Source l2dualdpac
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualdpac.listconnectors" }'
  params: []

- id: image_source_l2dualdpbd_listconnectors
  label: List Connectors for Source l2dualdpbd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualdpbd.listconnectors" }'
  params: []

- id: image_source_l2dualdpcd_listconnectors
  label: List Connectors for Source l2dualdpcd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualdpcd.listconnectors" }'
  params: []

- id: image_source_l2dualheaddpac_listconnectors
  label: List Connectors for Source l2dualheaddpac
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualheaddpac.listconnectors" }'
  params: []

- id: image_source_l2dualheaddpbd_listconnectors
  label: List Connectors for Source l2dualheaddpbd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualheaddpbd.listconnectors" }'
  params: []

- id: image_source_l2dualheaddualdpabcd_listconnectors
  label: List Connectors for Source l2dualheaddualdpabcd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2dualheaddualdpabcd.listconnectors" }'
  params: []

- id: image_source_l2quadcolumndp_listconnectors
  label: List Connectors for Source l2quadcolumndp
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2quadcolumndp.listconnectors" }'
  params: []

- id: image_source_l2quaddp_listconnectors
  label: List Connectors for Source l2quaddp
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.source.l2quaddp.listconnectors" }'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Sensors / Control Blocks
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" } }'
  params:
    - name: type
      type: string
      description: 'Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)'
    - name: valuetype
      type: string
      description: 'Value type (Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any)'

- id: environment_getalarminfo
  label: Get Alarm Information
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "environment.getalarminfo" }'
  params: []

- id: firmware_listcomponents
  label: List Managed Firmware Components
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "firmware.listcomponents" }'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Components / Versions / Upgrade Status
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade at Next Reboot
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "illumination.clo.engage" }'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Defaults
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }'
  params: []

- id: image_connector_l1displayport_edid_list
  label: List EDIDs for Connector l1displayport
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l1displayport.edid.list" }'
  params: []

- id: image_connector_l1hdbaset1_edid_list
  label: List EDIDs for Connector l1hdbaset1
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l1hdbaset1.edid.list" }'
  params: []

- id: image_connector_l1hdbaset2_edid_list
  label: List EDIDs for Connector l1hdbaset2
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l1hdbaset2.edid.list" }'
  params: []

- id: image_connector_l1hdmi_edid_list
  label: List EDIDs for Connector l1hdmi
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l1hdmi.edid.list" }'
  params: []

- id: image_connector_l2displayporta_edid_list
  label: List EDIDs for Connector l2displayporta
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l2displayporta.edid.list" }'
  params: []

- id: image_connector_l2displayportb_edid_list
  label: List EDIDs for Connector l2displayportb
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l2displayportb.edid.list" }'
  params: []

- id: image_connector_l2displayportc_edid_list
  label: List EDIDs for Connector l2displayportc
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l2displayportc.edid.list" }'
  params: []

- id: image_connector_l2displayportd_edid_list
  label: List EDIDs for Connector l2displayportd
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.connector.l2displayportd.edid.list" }'
  params: []

- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Black Level Area (Before Warp)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getblacklevelarea" }'
  params: []

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Black Level Area
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea" }'
  params: []

- id: image_processing_blacklevel_file_delete
  label: Delete Black Level Correction File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blacklevel.file.delete", "params": { "filename": "{filename}" } }'
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_list
  label: List Black Level Correction Files
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blacklevel.file.list" }'
  params: []

- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area (Before Warp)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getblendarea" }'
  params: []

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getwarpedblendarea" }'
  params: []

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blend.file.delete", "params": { "filename": "{filename}" } }'
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.blend.file.list" }'
  params: []

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warp.file.delete", "params": { "filename": "{filename}" } }'
  params:
    - name: filename
      type: string

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warp.file.list" }'
  params: []

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Four Corners
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warp.fourcorners.getscaledcorners", "params": { "resolution": { "x": 0, "y": 0 } } }'
  params:
    - name: resolution
      type: object
      description: 'Resolution object {x: int, y: int}'

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warp.warpscaledpoints", "params": { "points": [], "resolution": {} } }'
  params:
    - name: points
      type: array
      description: Array of {x,y} points
    - name: resolution
      type: object
      description: Resolution {x,y}

- id: image_processing_warpgrid_getgrid
  label: Get Current Warp Grid (Normalized)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgrid" }'
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgridsize" }'
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.processing.warpgrid.getscaledgrid", "params": { "resolution": { "x": 0, "y": 0 } } }'
  params:
    - name: resolution
      type: object

- id: image_stereo_listdarktime
  label: List All Possible Stereo Darktime Values (us)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.stereo.listdarktime" }'
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.testpattern.file.delete", "params": { "filename": "{filename}" } }'
  params:
    - name: filename
      type: string

- id: image_testpattern_file_list
  label: List Available Custom Test Patterns
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.testpattern.file.list" }'
  params: []

- id: image_testpattern_list
  label: List Available Test Patterns
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "image.testpattern.list" }'
  params: []

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "image.testpattern.setproperties", "params": { "id": "{id}", "properties": [] } }'
  params:
    - name: id
      type: string
      description: Pattern id
    - name: properties
      type: array
      description: 'Array of {key,value} string pairs'

- id: keydispatcher_sendclickevent
  label: Send Key Click Event (Press + Release)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "keydispatcher.sendclickevent", "params": { "key": "{key}" } }'
  params:
    - name: key
      type: string
      description: 'Key name (RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_0..RC_9, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY)'

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "keydispatcher.sendpressevent", "params": { "key": "{key}" } }'
  params:
    - name: key
      type: string
      description: 'Key name (same enum as sendclickevent)'

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "keydispatcher.sendreleaseevent", "params": { "key": "{key}" } }'
  params:
    - name: key
      type: string
      description: 'Key name (same enum as sendclickevent)'

- id: led_activity
  label: Activate LEDs / Restart LED Timeout
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "led.activity" }'
  params: []

- id: led_list
  label: List LEDs
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "led.list" }'
  params: []

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 } }'
  params:
    - name: led
      type: string
      description: 'LED name (e.g. "systemstatus")'
    - name: color
      type: string
      description: 'LED color (e.g. "red")'
    - name: period
      type: integer
      description: Blink period

- id: lightmeasurement_getlightoutput
  label: Get Light Output (Lumens)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "lightmeasurement.getlightoutput" }'
  params: []

- id: network_list
  label: List Network Devices
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "network.list" }'
  params: []

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "notification.dismiss", "params": { "id": "{id}", "response": "OK" } }'
  params:
    - name: id
      type: string
      description: Notification id
    - name: response
      type: string
      description: 'Response (NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS)'

- id: notification_list
  label: List Active Notifications
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "notification.list" }'
  params: []

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "notification.listsuppressed" }'
  params: []

- id: notification_log
  label: Get Saved Notification Log
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "notification.log" }'
  params: []

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "notification.suppress", "params": { "code": "{code}" } }'
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "notification.unsuppress", "params": { "code": "{code}" } }'
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "notification.unsuppressall" }'
  params: []

- id: optics_focus_addlocation
  label: Add Focus Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.addlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_focus_calibrate
  label: Calibrate Focus
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.calibrate" }'
  params: []

- id: optics_focus_runforward
  label: Run Focus Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.runforward" }'
  params: []

- id: optics_focus_runforwardtime
  label: Run Focus Forward for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.runforwardtime" }'
  params: []

- id: optics_focus_runreverse
  label: Run Focus Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.runreverse" }'
  params: []

- id: optics_focus_runreversetime
  label: Run Focus Reverse for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.runreversetime" }'
  params: []

- id: optics_focus_setlocation
  label: Set Focus Target to Saved Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.setlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_focus_stepforward
  label: Step Focus Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.stepforward" }'
  params: []

- id: optics_focus_stepreverse
  label: Step Focus Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.stepreverse" }'
  params: []

- id: optics_focus_stop
  label: Stop Focus
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.focus.stop" }'
  params: []

- id: optics_lensshift_horizontal_addlocation
  label: Add Lens Shift H Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.addlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_calibrate
  label: Calibrate Lens Shift H
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.calibrate" }'
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Run Lens Shift H Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforward" }'
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Run Lens Shift H Forward for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforwardtime" }'
  params: []

- id: optics_lensshift_horizontal_runreverse
  label: Run Lens Shift H Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreverse" }'
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Run Lens Shift H Reverse for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreversetime" }'
  params: []

- id: optics_lensshift_horizontal_setlocation
  label: Set Lens Shift H Target to Saved Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.setlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_stepforward
  label: Step Lens Shift H Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepforward" }'
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Step Lens Shift H Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepreverse" }'
  params: []

- id: optics_lensshift_horizontal_stop
  label: Stop Lens Shift H
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stop" }'
  params: []

- id: optics_lensshift_vertical_addlocation
  label: Add Lens Shift V Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.addlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_calibrate
  label: Calibrate Lens Shift V
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.calibrate" }'
  params: []

- id: optics_lensshift_vertical_runforward
  label: Run Lens Shift V Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforward" }'
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Run Lens Shift V Forward for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforwardtime" }'
  params: []

- id: optics_lensshift_vertical_runreverse
  label: Run Lens Shift V Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreverse" }'
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Run Lens Shift V Reverse for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreversetime" }'
  params: []

- id: optics_lensshift_vertical_setlocation
  label: Set Lens Shift V Target to Saved Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.setlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_stepforward
  label: Step Lens Shift V Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepforward" }'
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Step Lens Shift V Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepreverse" }'
  params: []

- id: optics_lensshift_vertical_stop
  label: Stop Lens Shift V
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stop" }'
  params: []

- id: optics_zoom_addlocation
  label: Add Zoom Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.addlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_zoom_calibrate
  label: Calibrate Zoom
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.calibrate" }'
  params: []

- id: optics_zoom_runforward
  label: Run Zoom Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.runforward" }'
  params: []

- id: optics_zoom_runforwardtime
  label: Run Zoom Forward for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.runforwardtime" }'
  params: []

- id: optics_zoom_runreverse
  label: Run Zoom Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.runreverse" }'
  params: []

- id: optics_zoom_runreversetime
  label: Run Zoom Reverse for Time (ms)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.runreversetime" }'
  params: []

- id: optics_zoom_setlocation
  label: Set Zoom Target to Saved Location
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.setlocation", "params": { "location": "{location}" } }'
  params:
    - name: location
      type: string

- id: optics_zoom_stepforward
  label: Step Zoom Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.stepforward" }'
  params: []

- id: optics_zoom_stepreverse
  label: Step Zoom Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.stepreverse" }'
  params: []

- id: optics_zoom_stop
  label: Stop Zoom
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.zoom.stop" }'
  params: []

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "optics.getvalidlensids" }'
  params: []

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.setlensid", "params": { "lensid": 0, "powerlensid": 0 } }'
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_shifttocenter
  label: Shift Lens to Center
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.shifttocenter" }'
  params: []

- id: optics_shutter_getobjectpath
  label: Get Shutter Motor Object Path
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "optics.shutter.getobjectpath" }'
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter Position
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "optics.shutter.toggle" }'
  params: []

- id: peripheral_frame_horizontal_calibrate
  label: Calibrate Frame H
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.calibrate" }'
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Run Frame H Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runforward" }'
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Run Frame H Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runreverse" }'
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Step Frame H Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepforward" }'
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Step Frame H Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepreverse" }'
  params: []

- id: peripheral_frame_horizontal_stop
  label: Stop Frame H
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stop" }'
  params: []

- id: peripheral_frame_rotation_calibrate
  label: Calibrate Frame Rotation
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.calibrate" }'
  params: []

- id: peripheral_frame_rotation_runforward
  label: Run Frame Rotation Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.runforward" }'
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Run Frame Rotation Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.runreverse" }'
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Step Frame Rotation Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepforward" }'
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Step Frame Rotation Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepreverse" }'
  params: []

- id: peripheral_frame_rotation_stop
  label: Stop Frame Rotation
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stop" }'
  params: []

- id: peripheral_frame_vertical_calibrate
  label: Calibrate Frame V
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.calibrate" }'
  params: []

- id: peripheral_frame_vertical_runforward
  label: Run Frame V Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.runforward" }'
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Run Frame V Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.runreverse" }'
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Step Frame V Forward
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepforward" }'
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Step Frame V Reverse
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepreverse" }'
  params: []

- id: peripheral_frame_vertical_stop
  label: Stop Frame V
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stop" }'
  params: []

- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "remotecontrol.listsensors" }'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "dmx.listchannels" }'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "dmx.listmodes" }'
  params: []

- id: statistics_listcounters
  label: List All Counter Names
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.listcounters" }'
  params: []

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Counter Name
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.laserruntime.getname" }'
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Counter Unit
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.laserruntime.getunit" }'
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Counter Name
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.laserstrikes.getname" }'
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Counter Unit
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.laserstrikes.getunit" }'
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Counter Name
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.projectorruntime.getname" }'
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Counter Unit
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.projectorruntime.getunit" }'
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Counter Name
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.systemtime.getname" }'
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Counter Unit
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.systemtime.getunit" }'
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Counter Name
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.uptime.getname" }'
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Counter Unit
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "statistics.uptime.getunit" }'
  params: []

- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get Flex Brightness Maximum Light Output Code
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.getmaximumlightoutputcode" }'
  params: []

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set Flex Brightness Maximum Light Output
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutput", "params": { "code": "{code}", "lightoutput": 0 } }'
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set Flex Brightness Maximum Light Output Code
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutputcode", "params": { "lightoutput": 0, "signature": "{signature}", "code": "{code}" } }'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string

- id: ui_settings_get
  label: Get UI Setting Value
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.get", "params": { "key": "{key}" } }'
  params:
    - name: key
      type: string

- id: ui_settings_getfonticons
  label: Get Font Icons for Category
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.getfonticons", "params": { "category": "Source" } }'
  params:
    - name: category
      type: string
      description: 'Source, Connector, or TestPattern'

- id: ui_settings_geticons
  label: Get SVG Icons for Category
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.geticons", "params": { "category": "Source" } }'
  params:
    - name: category
      type: string
      description: 'Source, Connector, or TestPattern'

- id: ui_settings_keys
  label: Get UI Setting Keys
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.keys" }'
  params: []

- id: ui_settings_list
  label: List UI Settings (Key/Value Pairs)
  kind: query
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.list" }'
  params: []

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.remove", "params": { "key": "{key}" } }'
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "ui.settings.set", "params": { "key": "{key}", "value": "{value}" } }'
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (Deprecated)
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "ui.togglestealthmode" }'
  params: []

# Serial wake-up command (ECO mode)
- id: serial_wake_from_eco
  label: Wake Projector from ECO Mode via RS-232
  kind: action
  command: ":POWR1\r"
  params: []

# HTTP file endpoints (upload/download)
- id: http_firmware_transfer_upload
  label: Upload Firmware Image (HTTP POST)
  kind: action
  command: "curl -F file=@firmware.dat http://{projector_ip}/api/firmware/transfer"
  params:
    - name: file
      type: string
      description: Path to firmware file
    - name: projector_ip
      type: string
      description: Projector IP address

- id: http_edid_transfer_upload
  label: Upload EDID File (HTTP POST)
  kind: action
  command: "curl -F file=@edid.dat http://{projector_ip}/api/image/connector/edid/transfer"
  params:
    - name: file
      type: string
    - name: projector_ip
      type: string

- id: http_edid_transfer_download
  label: Download EDID File (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/image/connector/edid/transfer"
  params:
    - name: projector_ip
      type: string

- id: http_blacklevel_file_transfer_upload
  label: Upload Black Level File (HTTP POST)
  kind: action
  command: "curl -F file=@blacklevel.dat http://{projector_ip}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: string
    - name: projector_ip
      type: string

- id: http_blacklevel_file_transfer_download
  label: Download Black Level File (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/image/processing/blacklevel/file/transfer"
  params:
    - name: projector_ip
      type: string

- id: http_blend_file_transfer_upload
  label: Upload Blend File (HTTP POST)
  kind: action
  command: "curl -F file=@blend.dat http://{projector_ip}/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: string
    - name: projector_ip
      type: string

- id: http_blend_file_transfer_download
  label: Download Blend File (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/image/processing/blend/file/transfer"
  params:
    - name: projector_ip
      type: string

- id: http_warp_file_transfer_upload
  label: Upload Warp File (HTTP POST)
  kind: action
  command: "curl -F file=@warp.dat http://{projector_ip}/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: string
    - name: projector_ip
      type: string

- id: http_warp_file_transfer_download
  label: Download Warp File (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/image/processing/warp/file/transfer"
  params:
    - name: projector_ip
      type: string

- id: http_testpattern_file_transfer_upload
  label: Upload Test Pattern Image (HTTP POST)
  kind: action
  command: "curl -F file=@testpattern.dat http://{projector_ip}/api/image/testpattern/file/transfer"
  params:
    - name: file
      type: string
    - name: projector_ip
      type: string

- id: http_testpattern_file_transfer_download
  label: Download Test Pattern Image (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/image/testpattern/file/transfer"
  params:
    - name: projector_ip
      type: string

- id: http_notification_logger_transfer_download
  label: Download Notification Log (HTTP GET)
  kind: action
  command: "curl -O -J http://{projector_ip}/api/notification/logger/transfer"
  params:
    - name: projector_ip
      type: string
```

## Feedbacks
```yaml
- id: property_changed
  label: Property Changed Notification
  type: notification
  command: '{ "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "objectname.propertyname": 100 } ] } }'
  params:
    - name: property
      type: array
      description: Array of property/value pairs that changed

- id: signal_callback
  label: Signal Callback Notification
  type: notification
  command: '{ "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { "arg1": 100, "arg2": "cat" } } ] } }'
  params:
    - name: signal
      type: array
      description: Array of signal/argument-list pairs

- id: system_state_feedback
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

- id: illumination_state_feedback
  label: Illumination State
  type: enum
  values:
    - On
    - Off

- id: environment_alarmstate_feedback
  label: Environment Alarm State
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: gsm_pinstate_feedback
  label: GSM PIN State
  type: enum
  values:
    - Accepted
    - Failed
    - Locked
    - Unknown

- id: illumination_clo_availability_feedback
  label: CLO Availability
  type: enum
  values:
    - Available
    - SensorUnavailable
    - PendingWarmup
    - Unavailable
    - Unknown

- id: illumination_clo_state_feedback
  label: CLO State
  type: enum
  values:
    - Ok
    - TooDim
    - TooBright

- id: dmx_monitor_connectionstate_feedback
  label: DMX/Artnet Connection Active
  type: boolean
  description: 'true if DMX or Artnet packet received in last 10 seconds'

- id: image_orientation_feedback
  label: Image Orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: image_display_mode_feedback
  label: Display Mode
  type: enum
  values:
    - Mono
    - AutoStereo
    - ActiveStereo
    - NightVision
    - IGPixelShift

- id: optics_shutter_position_feedback
  label: Shutter Position
  type: enum
  values:
    - Open
    - Closed

- id: optics_focus_state_feedback
  label: Focus Motor State
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_zoom_state_feedback
  label: Zoom Motor State
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: optics_lensshift_state_feedback
  label: Lens Shift Motor State
  type: enum
  values:
    - Stopped
    - Running
    - Calibrating
    - Homing

- id: network_device_lan_state_feedback
  label: Network Device State
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: notification_severity_feedback
  label: Notification Severity
  type: enum
  values:
    - INFO
    - CAUTION
    - WARNING
    - ERROR
    - CRITICAL

- id: ui_backlight_state_feedback
  label: UI Backlight State
  type: enum
  values:
    - Off
    - On
    - Auto

- id: ui_stealthmode_feedback
  label: UI Stealth Mode
  type: enum
  values:
    - Off
    - On
```

## Variables
```yaml
# Settable properties documented in source:
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  read_only: false

- id: image_window_main_source
  type: string
  description: Active source for main window

- id: image_brightness
  type: float
  constraints:
    min: -1
    max: 1
    step_size: 1
    precision: 0.01

- id: image_contrast
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_saturation
  type: float
  constraints:
    min: 0
    max: 2
    step_size: 1
    precision: 0.01

- id: image_gamma
  type: float
  constraints:
    min: 1
    max: 3
    step_size: 1
    precision: 0.1

- id: image_sharpness
  type: integer
  constraints:
    min: -2
    max: 8
    step_size: 1
    precision: 1

- id: image_intensity
  type: float
  constraints:
    min: 0
    max: 1
    step_size: 0.1
    precision: 0.01

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_display_desireddisplaymode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]

- id: illumination_sources_laser_power
  type: float
  description: Laser power in percent
  constraints:
    min: 0
    max: 100

- id: illumination_state
  type: enum
  values: [On, Off]

- id: illumination_clo_enable
  type: boolean

- id: illumination_clo_scale
  type: float

- id: illumination_clo_setpoint
  type: float

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blend_scurve
  type: float
  constraints:
    min: 1
    max: 4
    step_size: 1
    precision: 0.1

- id: image_processing_transportdelay_desired
  type: integer

- id: screen_hdrboost
  type: float
  constraints:
    min: 0.8
    max: 1.2
    step_size: 0.01
    precision: 0.1

- id: screen_luminance
  type: float
  constraints:
    min: 50
    max: 10000
    step_size: 10
    precision: 1

- id: system_initialstate
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: system_eco_enable
  type: boolean

- id: system_standby_enable
  type: boolean

- id: system_on_timeout_duration
  type: integer

- id: system_ready_timeout_duration
  type: integer

- id: system_standby_timeout_duration
  type: integer

- id: system_error_timeout_duration
  type: integer

- id: remotecontrol_address
  type: integer
  constraints:
    min: 1
    max: 31

- id: dmx_artnet
  type: boolean

- id: dmx_artnetnet
  type: integer

- id: dmx_artnetuniverse
  type: integer

- id: dmx_startchannel
  type: integer
  constraints:
    min: 1
    max: 512

- id: dmx_shutdown
  type: boolean

- id: dmx_shutdowntimeout
  type: integer

- id: ui_osd
  type: boolean

- id: ui_menu
  type: boolean

- id: ui_minimize
  type: boolean

- id: ui_stealthmode
  type: enum
  values: [Off, On]

- id: ui_backlight_state
  type: enum
  values: [Off, On, Auto]

- id: ui_backlight_timeout
  type: integer

- id: ui_poweroffhint
  type: boolean

- id: ui_sourcesignal
  type: boolean

- id: gsm_pin
  type: string
  description: PIN code for SIM card

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: optics_focus_target
  type: integer

- id: optics_zoom_target
  type: integer

- id: optics_lensshift_horizontal_target
  type: integer

- id: optics_lensshift_vertical_target
  type: integer
```

## Events
```yaml
# Server-initiated notifications client must implement:
- id: property.changed
  description: Fired when any subscribed property value changes
  command: '{ "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] } }'

- id: signal.callback
  description: Fired when any subscribed signal is triggered
  command: '{ "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": {} } ] } }'

- id: modelupdated
  description: Fired when new objects arrive or objects are removed
  command: '{ "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }'

- id: image_connector_edid_listchanged
  description: EDID list changed for one or more connectors

- id: image_processing_blacklevel_file_listchanged
  description: Black level file list changed

- id: image_processing_blend_file_listchanged
  description: Blend file list changed

- id: image_processing_warp_file_listchanged
  description: Warp file list changed

- id: image_processing_warpgrid_changed
  description: Warp grid changed (no payload)

- id: image_processing_warpgrid_gridchanged
  description: Warp grid changed with grid payload

- id: image_testpattern_added
  description: New test pattern added

- id: image_testpattern_changed
  description: Test pattern properties changed

- id: image_testpattern_removed
  description: Test pattern removed

- id: network_added
  description: Network device added

- id: network_removed
  description: Network device removed

- id: notification_emitted
  description: New notification emitted by device

- id: notification_dismissed
  description: Notification dismissed

- id: system_identificationchanged
  description: System identification changed

- id: system_license_licensechanged
  description: License changed

- id: system_performed
  description: Reset domains completed (emitted per domain group)

- id: ui_settings_added
  description: UI setting added

- id: ui_settings_changed
  description: UI setting value changed

- id: ui_settings_removed
  description: UI setting removed
```

## Macros
```yaml
# Multi-step sequences described in source:

- id: warp_upload_and_enable
  label: Upload and Enable Warp Grid
  steps:
    - Upload warp file via HTTP POST to http://{projector_ip}/api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected to filename
    - property.set image.processing.warp.file.enable to true
    - property.set image.processing.warp.enable to true

- id: blend_upload_and_enable
  label: Upload and Enable Blend Mask
  steps:
    - Upload blend file via HTTP POST to http://{projector_ip}/api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected to filename
    - property.set image.processing.blend.file.enable to true

- id: blacklevel_upload_and_enable
  label: Upload and Enable Black Level Mask
  steps:
    - Upload black level file via HTTP POST to http://{projector_ip}/api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected to filename
    - property.set image.processing.blacklevel.file.enable to true

- id: edid_upload_and_select
  label: Upload EDID and Select
  steps:
    - Upload EDID file via HTTP POST to http://{projector_ip}/api/image/connector/edid/transfer
    - property.set image.connector.{name}.edid.selected to filename

- id: firmware_upload_and_upgrade
  label: Upload Firmware and Schedule Upgrade
  steps:
    - Upload firmware via HTTP POST to http://{projector_ip}/api/firmware/transfer
    - firmware.schedulecomponentupgrade (force upgrade at next reboot)
    - system.reboot

- id: eco_wake_serial
  label: Wake Projector from ECO via RS-232
  steps:
    - Send ASCII ":POWR1\r" over RS-232

- id: source_signal_subscribe_setup
  label: Subscribe to Source/Connector Signal Updates
  steps:
    - Call image.source.list to enumerate sources
    - Translate source names to object names (remove non-word chars, lowercase)
    - For each source call image.source.{name}.listconnectors
    - For each connector subscribe to image.connector.{name}.detectedsignal
    - Subscribe to image.window.main.source for active source changes

- id: picture_settings_set
  label: Set Picture Settings (brightness/contrast/saturation/gamma)
  steps:
    - introspect image to discover property constraints
    - property.set image.brightness {value}
    - property.set image.contrast {value}
    - property.set image.saturation {value}
    - property.set image.gamma {value}
```

## Safety
```yaml
confirmation_required_for:
  - system.reboot
  - system.reset
  - system.resetall
  - system.poweroff
interlocks: []
# UNRESOLVED: explicit safety warnings or interlock procedures not present in source beyond standard "verify state before issuing power commands"
```

## Notes
JSON-RPC 2.0 is the sole protocol over TCP/serial. All commands use method invocation with named parameters. Properties use dot-notation (e.g. `image.window.main.source`). Authentication pass code shown in documentation is example value 98765 — actual credential not stated.

File upload/download uses HTTP with projector IP address and `/api` endpoint path. Example projector address `192.168.1.100` appears in documentation — not a default or stated value.

For ECO mode wake: send wake on LAN with MAC address, use remote/keypad, or send `:POWR1\r` via RS-232.

Best practice: wait for `property.set` confirmation before sending next property.set on same property. Subscribing does not deliver current value — use `property.get` to read current.

System supports three file-based image types: blend masks (PNG/JPEG/TIFF, grayscale; blue channel used if color), black level masks (PNG/JPEG/TIFF, grayscale), warp files (MCM500/400 format). Blend/blacklevel mask sizes vary by projector resolution (WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540).

Reset domains: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx.

Key dispatcher supports RC_*/KP_* prefixed key codes for remote and keypad events.

<!-- UNRESOLVED: specific model variant not stated — CRT VP family model designation unclear -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: authentication pass code format/entropy not stated -->
<!-- UNRESOLVED: default IP address or DHCP behavior not stated -->
<!-- UNRESOLVED: command timing / rate limiting not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-12T03:39:16.329Z
last_checked_at: 2026-07-13T06:40:27.320Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-13T06:40:27.320Z
matched_actions: 207
action_count: 207
confidence: medium
summary: "All 207 spec actions match literal JSON-RPC methods, the RS-232 wake ASCII string, or curl file-transfer endpoints documented verbatim in source after removal of the fabricated firmware-download action; transport values (port 9090, 19200/8/N/1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model number not stated in source; derived from filename"
- "explicit safety warnings or interlock procedures not present in source beyond standard \"verify state before issuing power commands\""
- "specific model variant not stated — CRT VP family model designation unclear"
- "firmware version compatibility not stated in source"
- "authentication pass code format/entropy not stated"
- "default IP address or DHCP behavior not stated"
- "command timing / rate limiting not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
