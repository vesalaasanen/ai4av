---
spec_id: admin/barco-event-master-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Event Master v1.0 Control Spec"
manufacturer: Barco
model_family: "Event Master"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Event Master"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.514Z
last_checked_at: 2026-06-02T17:21:37.589Z
generated_at: 2026-06-02T17:21:37.589Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range and per-model I/O layout not stated"
  - "source describes only single-step operations plus the"
  - "high-voltage, current, fault-recovery, and lens-calibration"
  - "firmware version compatibility range, per-model connector count, and exact motor calibration timing values are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:37.589Z
  matched_actions: 188
  action_count: 188
  confidence: medium
  summary: "All 188 spec actions have literal method matches in source; transport (port 9090, 19200 8N1, /api base) verified; coverage ratio 188/201 = 0.935 exceeds 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Event Master v1.0 Control Spec

## Summary
Barco Event Master (Pulse platform) family of large-venue projectors. The Pulse service exposes a JSON-RPC 2.0 API over TCP port 9090, the same commands are also reachable via RS-232 (19200 8N1) on the DB-9 service port. File transfer (firmware, warp grid, blend mask, black-level mask, EDID, test pattern, notification log) uses HTTP at `/api/...`. Optional pass-code authentication is required only for access levels above end-user.

<!-- UNRESOLVED: firmware version range and per-model I/O layout not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://<projector-ip>/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode
  required: false  # end-user access does not require auth; higher levels do
  method: jsonrpc
  notes: |
    "authenticate" method takes {"code": <int>}. Normal end-user access skips auth.
    Higher levels (POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT) require it.
```

## Traits
```yaml
- powerable        # system.poweron / system.poweroff
- routable         # image.window.main.source, image.source.list
- queryable        # property.get, image.connector.<name>.detectedsignal
- levelable        # image.brightness, image.contrast, illumination.sources.laser.power
- subscribable     # property.subscribe, signal.subscribe
- introspectable   # introspect
- file_transferable  # HTTP /api/... for firmware, warp, blend, blacklevel, EDID, testpattern, log
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweron"}
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweroff"}
  params: []

- id: system_reboot
  label: Reboot Projector
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.reboot"}
  params: []

- id: system_goto_eco
  label: Enter ECO State
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.gotoeco"}
  params: []

- id: system_goto_ready
  label: Enter Ready State
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.gotoready"}
  params: []

- id: eco_wake_serial
  label: Wake From ECO (Serial ASCII)
  kind: action
  command: ":POWR1\r"   # ASCII, sent on RS-232 only
  params: []
  notes: Source: "send a special command on the RS232 serial port" - wake-from-ECO ASCII sequence.

- id: authenticate
  label: Authenticate (pass code)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}
  params:
    - name: code
      type: integer
      description: Pass code for elevated access

- id: property_get
  label: Read Property
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":{id}}
  params:
    - name: property
      type: string
      description: Dot-notation property path (see Variables section)
    - name: id
      type: integer
      description: Request identifier (optional)

- id: property_set
  label: Write Property
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":{id}}
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: string
      description: Value as JSON (string, number, bool, object, array)
    - name: id
      type: integer
      description: Request identifier (optional)

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":[{property}]},"id":{id}}
  params:
    - name: property
      type: string
      description: Single property path or JSON array of paths
    - name: id
      type: integer

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":[{property}]},"id":{id}}
  params:
    - name: property
      type: string
    - name: id
      type: integer

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":[{signal}]},"id":{id}}
  params:
    - name: signal
      type: string
    - name: id
      type: integer

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":[{signal}]},"id":{id}}
  params:
    - name: signal
      type: string
    - name: id
      type: integer

- id: introspect
  label: Introspect Object
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}},"id":{id}}
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty string introspects everything
    - name: recursive
      type: boolean
    - name: id
      type: integer

- id: introspect_array
  label: Introspect (positional form)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":["{object}",{recursive}],"id":{id}}
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean
    - name: id
      type: integer

- id: image_source_list
  label: List Available Sources
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.list","id":{id}}
  params:
    - name: id
      type: integer

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.connector.list","id":{id}}
  params:
    - name: id
      type: integer

- id: image_window_list
  label: List Available Windows
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.window.list"}
  params: []

- id: image_resolution_list
  label: List Possible Resolutions
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.resolution.list"}
  params: []

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.display.listdisplaymodes"}
  params: []

- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.testpattern.list"}
  params: []

- id: image_stereo_listdarktime
  label: List Stereo Darktime Values
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.stereo.listdarktime"}
  params: []

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.{objectname}.listconnectors","id":{id}}
  params:
    - name: objectname
      type: string
      description: "Lowercase source name with non-word chars stripped (e.g. 'displayport1')"
    - name: id
      type: integer
  notes: |
    One method per source object: image.source.l1displayport.listconnectors,
    image.source.l1hdbaset1.listconnectors, image.source.l1hdbaset2.listconnectors,
    image.source.l1hdmi.listconnectors, image.source.l1quadsdi.listconnectors,
    image.source.l1sdia.listconnectors, image.source.l1sdib.listconnectors,
    image.source.l1sdic.listconnectors, image.source.l1sdid.listconnectors,
    image.source.l2displayporta.listconnectors, image.source.l2displayportb.listconnectors,
    image.source.l2displayportc.listconnectors, image.source.l2displayportd.listconnectors,
    image.source.l2dualdpab.listconnectors, image.source.l2dualdpac.listconnectors,
    image.source.l2dualdpbd.listconnectors, image.source.l2dualdpcd.listconnectors,
    image.source.l2dualheaddpac.listconnectors, image.source.l2dualheaddpbd.listconnectors,
    image.source.l2dualheaddualdpabcd.listconnectors,
    image.source.l2quadcolumndp.listconnectors, image.source.l2quaddp.listconnectors.

- id: set_active_source
  label: Set Active Source
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":{id}}
  params:
    - name: source
      type: string
      description: 'Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")'
    - name: id
      type: integer

- id: enable_warp
  label: Enable Warp (Global)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":{id}}
  params:
    - name: id
      type: integer

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":{id}}
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":{id}}
  params:
    - name: id
      type: integer

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":{id}}
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":{id}}
  params:
    - name: id
      type: integer

- id: select_blacklevel_file
  label: Select Black-Level File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":{id}}
  params:
    - name: filename
      type: string
    - name: id
      type: integer

- id: enable_blacklevel_file
  label: Enable Black-Level File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":{id}}
  params:
    - name: id
      type: integer

- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warp.file.list"}
  params: []

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blend.file.list"}
  params: []

- id: image_processing_blacklevel_file_list
  label: List Black-Level Files
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blacklevel.file.list"}
  params: []

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warp.file.delete","params":{"filename":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blend.file.delete","params":{"filename":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_file_delete
  label: Delete Black-Level File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blacklevel.file.delete","params":{"filename":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Warp Corners
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warp.fourcorners.getscaledcorners","params":{"resolution":{"x":{x},"y":{y}}}}
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warp.warpscaledpoints","params":{"points":[{"X":{x},"Y":{y}}],"resolution":{"X":{rx},"Y":{ry}}}}
  params:
    - name: x
      type: number
    - name: y
      type: number
    - name: rx
      type: number
    - name: ry
      type: number

- id: image_processing_warpgrid_getgrid
  label: Get Warp Grid
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warpgrid.getgrid"}
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warpgrid.getgridsize"}
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.warpgrid.getscaledgrid","params":{"resolution":{"x":{x},"y":{y}}}}
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blend.basicblend.getblendarea"}
  params: []

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blend.basicblend.getwarpedblendarea"}
  params: []

- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Black-Level Area
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blacklevel.basicblacklevel.getblacklevelarea"}
  params: []

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Black-Level Area
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea"}
  params: []

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.testpattern.setproperties","params":{"id":"{id}","properties":[{"key":"{key}","value":"{value}"}]}}
  params:
    - name: id
      type: string
    - name: key
      type: string
    - name: value
      type: string

- id: image_testpattern_file_list
  label: List Test Pattern Files
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.testpattern.file.list"}
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.testpattern.file.delete","params":{"filename":"{filename}"}}
  params:
    - name: filename
      type: string

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"illumination.clo.engage"}
  params: []

- id: illumination_laser_getserialnumber
  label: Read Laser Serial Number
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}
  params: []

- id: environment_getcontrolblocks
  label: Read Environment Sensors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"},"id":{id}}
  params:
    - name: type
      type: string
      description: 'Sensor category: "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"'
    - name: valuetype
      type: string
      description: 'One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'
    - name: id
      type: integer

- id: environment_getalarminfo
  label: Read Environment Alarms
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getalarminfo"}
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"firmware.listcomponents"}
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}
  params: []
  notes: Component name is implicit / method-specific; see source.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"dmx.listmodes"}
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"dmx.listchannels"}
  params: []

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}},"id":{id}}
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
      description: e.g. "red"
    - name: period
      type: integer
    - name: id
      type: integer

- id: led_activity
  label: Activate LEDs
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"led.activity"}
  params: []

- id: led_list
  label: List LEDs
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"led.list"}
  params: []

- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"keydispatcher.sendclickevent","params":{"key":"{key}"}}
  params:
    - name: key
      type: string
      description: 'RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_0..RC_9, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY'

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"keydispatcher.sendpressevent","params":{"key":"{key}"}}
  params:
    - name: key
      type: string

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"keydispatcher.sendreleaseevent","params":{"key":"{key}"}}
  params:
    - name: key
      type: string

- id: lightmeasurement_getlightoutput
  label: Read Light Output (lumens)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"lightmeasurement.getlightoutput"}
  params: []

- id: network_list
  label: List Network Devices
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"network.list"}
  params: []

- id: notification_list
  label: List Active Notifications
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"notification.list"}
  params: []

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"notification.listsuppressed"}
  params: []

- id: notification_log
  label: Read Notification Log
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"notification.log","params":{"minimumseverity":"{min}","start":{start},"count":{count}}}
  params:
    - name: min
      type: string
      description: 'INFO, CAUTION, WARNING, ERROR, CRITICAL'
    - name: start
      type: integer
    - name: count
      type: integer

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"notification.dismiss","params":{"id":"{id}","response":"{response}"}}
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: 'NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS'

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"notification.suppress","params":{"code":"{code}"}}
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"notification.unsuppress","params":{"code":"{code}"}}
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"notification.unsuppressall"}
  params: []

- id: optics_focus_calibrate
  label: Calibrate Focus
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.calibrate"}
  params: []

- id: optics_focus_stop
  label: Stop Focus Motor
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.stop"}
  params: []

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.stepforward"}
  params: []

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.stepreverse"}
  params: []

- id: optics_focus_runforward
  label: Focus Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.runforward"}
  params: []

- id: optics_focus_runreverse
  label: Focus Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.runreverse"}
  params: []

- id: optics_focus_runforwardtime
  label: Focus Run Forward (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.runforwardtime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer
      description: Time in milliseconds

- id: optics_focus_runreversetime
  label: Focus Run Reverse (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.runreversetime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_focus_addlocation
  label: Save Focus Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.addlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_focus_setlocation
  label: Recall Focus Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.focus.setlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_zoom_calibrate
  label: Calibrate Zoom
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.calibrate"}
  params: []

- id: optics_zoom_stop
  label: Stop Zoom Motor
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.stop"}
  params: []

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.stepforward"}
  params: []

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.stepreverse"}
  params: []

- id: optics_zoom_runforward
  label: Zoom Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.runforward"}
  params: []

- id: optics_zoom_runreverse
  label: Zoom Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.runreverse"}
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Run Forward (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.runforwardtime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_zoom_runreversetime
  label: Zoom Run Reverse (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.runreversetime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_zoom_addlocation
  label: Save Zoom Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.addlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_zoom_setlocation
  label: Recall Zoom Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.zoom.setlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_calibrate
  label: Calibrate Horizontal Lens Shift
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.calibrate"}
  params: []

- id: optics_lensshift_horizontal_stop
  label: Stop Horizontal Lens Shift
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stop"}
  params: []

- id: optics_lensshift_horizontal_stepforward
  label: Horizontal Shift Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stepforward"}
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Horizontal Shift Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.stepreverse"}
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Horizontal Shift Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runforward"}
  params: []

- id: optics_lensshift_horizontal_runreverse
  label: Horizontal Shift Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runreverse"}
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Horizontal Shift Run Forward (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runforwardtime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_lensshift_horizontal_runreversetime
  label: Horizontal Shift Run Reverse (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.runreversetime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_lensshift_horizontal_addlocation
  label: Save Horizontal Shift Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.addlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_setlocation
  label: Recall Horizontal Shift Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.horizontal.setlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_calibrate
  label: Calibrate Vertical Lens Shift
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.calibrate"}
  params: []

- id: optics_lensshift_vertical_stop
  label: Stop Vertical Lens Shift
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.stop"}
  params: []

- id: optics_lensshift_vertical_stepforward
  label: Vertical Shift Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.stepforward"}
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Vertical Shift Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.stepreverse"}
  params: []

- id: optics_lensshift_vertical_runforward
  label: Vertical Shift Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.runforward"}
  params: []

- id: optics_lensshift_vertical_runreverse
  label: Vertical Shift Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.runreverse"}
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Vertical Shift Run Forward (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.runforwardtime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_lensshift_vertical_runreversetime
  label: Vertical Shift Run Reverse (Timed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.runreversetime","params":{"ms":{ms}}}
  params:
    - name: ms
      type: integer

- id: optics_lensshift_vertical_addlocation
  label: Save Vertical Shift Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.addlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_setlocation
  label: Recall Vertical Shift Location
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.lensshift.vertical.setlocation","params":{"location":"{location}"}}
  params:
    - name: location
      type: string

- id: optics_shifttocenter
  label: Shift Lens to Center
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.shifttocenter"}
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.shutter.toggle"}
  params: []

- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"optics.shutter.getobjectpath"}
  params: []

- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"optics.setlensid","params":{"lensid":{lensid},"powerlensid":{powerlensid}}}
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"optics.getvalidlensids"}
  params: []

- id: peripheral_frame_horizontal_calibrate
  label: Calibrate Frame Horizontal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.calibrate"}
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame Horizontal Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.runforward"}
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame Horizontal Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.runreverse"}
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame Horizontal Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stepforward"}
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame Horizontal Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stepreverse"}
  params: []

- id: peripheral_frame_horizontal_stop
  label: Stop Frame Horizontal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.horizontal.stop"}
  params: []

- id: peripheral_frame_rotation_calibrate
  label: Calibrate Frame Rotation
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.calibrate"}
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame Rotation Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.runforward"}
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame Rotation Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.runreverse"}
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame Rotation Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.stepforward"}
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame Rotation Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.stepreverse"}
  params: []

- id: peripheral_frame_rotation_stop
  label: Stop Frame Rotation
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.rotation.stop"}
  params: []

- id: peripheral_frame_vertical_calibrate
  label: Calibrate Frame Vertical
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.calibrate"}
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame Vertical Run Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.runforward"}
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame Vertical Run Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.runreverse"}
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame Vertical Step Forward
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.stepforward"}
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame Vertical Step Reverse
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.stepreverse"}
  params: []

- id: peripheral_frame_vertical_stop
  label: Stop Frame Vertical
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"peripheral.frame.vertical.stop"}
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.activity"}
  params: []

- id: system_boards_getboardlist
  label: List Boards
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.boards.getboardlist"}
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.boards.getboardinfo","params":{"boardname":"{boardname}"}}
  params:
    - name: boardname
      type: string

- id: system_boards_getmissingboardlist
  label: List Missing Boards
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.boards.getmissingboardlist"}
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.boards.getmoduleinfo","params":{"boardname":"{boardname}"}}
  params:
    - name: boardname
      type: string

- id: system_boards_getdeviceinfo
  label: Get Device Info (Deprecated)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.boards.getdeviceinfo","params":{"boardname":"{boardname}"}}
  params:
    - name: boardname
      type: string
  notes: Deprecated. Use system.boards.getboardinfo.

- id: system_getidentification
  label: Get Single Identification
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.getidentification"}
  params: []

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.getidentifications"}
  params: []

- id: system_getsystemdate
  label: Get System Date (UTC)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.getsystemdate"}
  params: []

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.listresetdomains"}
  params: []

- id: system_reset
  label: Reset Selected Domains
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.reset","params":{"domains":["{domain}"]}}
  params:
    - name: domain
      type: string
      description: 'ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx'

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.resetall"}
  params: []

- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get FlexBrightness Max Light Output Code
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"system.license.option.flexbrightness.getmaximumlightoutputcode","params":{"lightoutput":{lightoutput}}}
  params:
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set FlexBrightness Max Light Output
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.license.option.flexbrightness.setmaximumlightoutput","params":{"code":"{code}","lightoutput":{lightoutput}}}
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set FlexBrightness Max Light Output (Signed)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.license.option.flexbrightness.setmaximumlightoutputcode","params":{"lightoutput":{lightoutput},"signature":"{signature}","code":"{code}"}}
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string

- id: statistics_listcounters
  label: List Statistics Counters
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.listcounters"}
  params: []

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Counter Name
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.laserruntime.getname"}
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Unit
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.laserruntime.getunit"}
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Counter Name
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.laserstrikes.getname"}
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Unit
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.laserstrikes.getunit"}
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Counter Name
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.projectorruntime.getname"}
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Unit
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.projectorruntime.getunit"}
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Counter Name
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.systemtime.getname"}
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Unit
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.systemtime.getunit"}
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Counter Name
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.uptime.getname"}
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Unit
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"statistics.uptime.getunit"}
  params: []

- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.get","params":{"key":"{key}"}}
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.set","params":{"key":"{key}","value":"{value}"}}
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.remove","params":{"key":"{key}"}}
  params:
    - name: key
      type: string

- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.list"}
  params: []

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.keys"}
  params: []

- id: ui_settings_geticons
  label: Get UI Icons (SVG)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.geticons","params":{"category":"{category}"}}
  params:
    - name: category
      type: string
      description: 'Source, Connector, TestPattern'

- id: ui_settings_getfonticons
  label: Get UI Icons (Font)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"ui.settings.getfonticons","params":{"category":"{category}"}}
  params:
    - name: category
      type: string

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (Deprecated)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ui.togglestealthmode"}
  params: []
  notes: Deprecated method.

- id: remotecontrol_listsensors
  label: List Remote-Control IR Sensors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"remotecontrol.listsensors"}
  params: []

- id: image_connector_edid_list
  label: List EDID Files (per connector)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.connector.{connector}.edid.list"}
  params:
    - name: connector
      type: string
      description: 'l1displayport, l1hdbaset1, l1hdbaset2, l1hdmi, l2displayporta, l2displayportb, l2displayportc, l2displayportd'
  notes: One method per connector listed in source.

- id: upload_firmware
  label: Upload Firmware (HTTP POST)
  kind: action
  command: 'curl -F file=@firmware.dat http://<projector-ip>/api/firmware/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: upload_warp_file
  label: Upload Warp File (HTTP POST)
  kind: action
  command: 'curl -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: upload_blend_file
  label: Upload Blend File (HTTP POST)
  kind: action
  command: 'curl -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: upload_blacklevel_file
  label: Upload Black-Level File (HTTP POST)
  kind: action
  command: 'curl -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: upload_edid_file
  label: Upload EDID File (HTTP POST)
  kind: action
  command: 'curl -F file=@edid.dat http://<projector-ip>/api/image/connector/edid/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: upload_testpattern_file
  label: Upload Test Pattern File (HTTP POST)
  kind: action
  command: 'curl -F file=@testpattern.dat http://<projector-ip>/api/image/testpattern/file/transfer'
  params:
    - name: filename
      type: string
  transport: http

- id: download_warp_file
  label: Download Warp File (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer'
  transport: http

- id: download_blend_file
  label: Download Blend File (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/blend/file/transfer'
  transport: http

- id: download_blacklevel_file
  label: Download Black-Level File (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  transport: http

- id: download_edid_file
  label: Download EDID File (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/connector/edid/transfer'
  transport: http

- id: download_testpattern_file
  label: Download Test Pattern File (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/testpattern/file/transfer'
  transport: http

- id: download_notification_log
  label: Download Notification Log (HTTP GET)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/notification/logger/transfer'
  transport: http
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  source_property: system.state
  notes: Source also lists "service" and "error" in the property enum but the quick-start chapter omits them.

- id: illumination_state
  type: enum
  values: [On, Off]
  source_property: illumination.state

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate

- id: gsm_pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
  source_property: gsm.pinstate

- id: clo_availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
  source_property: illumination.clo.availability

- id: clo_state
  type: enum
  values: [Ok, TooDim, TooBright]
  source_property: illumination.clo.state

- id: optics_focus_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
  source_property: optics.focus.state

- id: optics_zoom_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
  source_property: optics.zoom.state

- id: optics_lensshift_horizontal_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
  source_property: optics.lensshift.horizontal.state

- id: optics_lensshift_vertical_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
  source_property: optics.lensshift.vertical.state

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.position

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.target

- id: detected_signal
  type: object
  source_property: image.connector.<name>.detectedsignal
  notes: Dictionary: active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.

- id: temperature_sensors
  type: object
  source_method: environment.getcontrolblocks
  notes: Returned as dictionary keyed by sensor name (e.g. environment.laser.board0.bank0.temperature) with float values.

- id: fan_speeds
  type: object
  source_method: environment.getcontrolblocks
  notes: Returned as dictionary keyed by fan tach name (e.g. environment.fan.ar1.tacho) with int values.
```

## Variables
```yaml
# Properties accessed via property.get / property.set / property.subscribe.
# Only properties with non-trivial types or constraints documented in the source
# are listed; the full property catalogue is in the source (Properties section).

- name: system.state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  access: RO

- name: system.initialstate
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  access: RW

- name: system.firmwareversion
  type: string
  access: RO

- name: system.modelname
  type: string
  access: RO

- name: system.serialnumber
  type: string
  access: RO

- name: system.familyname
  type: string
  access: RO

- name: system.articlenumber
  type: string
  access: RO

- name: system.colorwheel
  type: string
  access: RO

- name: system.colorwheelname
  type: string
  access: RO

- name: system.eco.available
  type: bool
  access: RO

- name: system.eco.enable
  type: bool
  access: RW

- name: system.standby.available
  type: bool
  access: RO

- name: system.standby.enable
  type: bool
  access: RW

- name: system.standby.timeout.enable
  type: bool
  access: RW

- name: system.standby.timeout.duration
  type: int
  access: RW

- name: system.ready.timeout.enable
  type: bool
  access: RW

- name: system.ready.timeout.duration
  type: int
  access: RW

- name: system.on.timeout.enable
  type: bool
  access: RW

- name: system.on.timeout.duration
  type: int
  access: RW

- name: system.error.timeout.enable
  type: bool
  access: RW

- name: system.error.timeout.duration
  type: int
  access: RW

- name: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01
  access: RW

- name: image.contrast
  type: float
  range: [0, 2]
  step: 0.01
  access: RW

- name: image.saturation
  type: float
  range: [0, 2]
  step: 0.01
  access: RW

- name: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
  access: RW

- name: image.sharpness
  type: int
  range: [-2, 8]
  step: 1
  access: RW

- name: image.intensity
  type: float
  range: [0, 1]
  step: 0.01
  access: RW

- name: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  access: RW

- name: image.display.desireddisplaymode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
  access: RW

- name: image.display.displaymode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
  access: RO

- name: image.display.frequency
  type: float
  access: RO

- name: image.display.synchronouslock
  type: bool
  access: RO

- name: image.window.main.source
  type: string
  access: RW

- name: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  access: RW

- name: image.window.main.position
  type: object
  access: RW
  notes: "{x: int, y: int}"

- name: image.window.main.size
  type: object
  access: RW
  notes: "{width: int, height: int}"

- name: image.testpattern.show
  type: bool
  access: RW

- name: image.testpattern.selected
  type: string
  access: RW

- name: image.stereo.darktime
  type: int
  access: RW

- name: image.stereo.swapframepair
  type: bool
  access: RW

- name: image.stereo.glassync.delay
  type: int
  access: RW

- name: illumination.sources.laser.power
  type: float
  access: RW
  notes: Target power in percent.

- name: illumination.sources.laser.minpower
  type: float
  access: RO

- name: illumination.sources.laser.maxpower
  type: float
  access: RO

- name: illumination.sources.laser.ispowerlimited
  type: bool
  access: RO

- name: illumination.sources.laser.powerlimitreason
  type: string
  access: RO

- name: illumination.clo.enable
  type: bool
  access: RW

- name: illumination.clo.scale
  type: float
  access: RW

- name: illumination.clo.setpoint
  type: float
  access: RW

- name: screen.hdrboost
  type: float
  range: [0.8, 1.2]
  step: 0.01
  access: RW

- name: screen.luminance
  type: float
  range: [50, 10000]
  step: 10
  access: RW

- name: network.hostname
  type: string
  access: RW

- name: network.device.lan.carrier
  type: bool
  access: RO

- name: network.device.lan.configuration
  type: enum
  values: [AUTO, MANUAL]
  access: RW

- name: network.device.lan.devicetype
  type: enum
  values: [UNKNOWN, WIRED, WIRELESS]
  access: RO

- name: network.device.lan.hwaddress
  type: string
  access: RO

- name: network.device.lan.ip4config
  type: object
  access: RW
  notes: "{Address, Mask, Gateway, NameServers}"

- name: network.device.lan.ip4configmanual
  type: object
  access: RW
  notes: Same shape as ip4config.

- name: network.device.lan.ip6config
  type: object
  access: RW

- name: network.device.lan.ip6configmanual
  type: object
  access: RW

- name: network.device.lan.speed
  type: int
  access: RO

- name: network.device.lan.state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  access: RO

- name: network.device.lan.stateinfo
  type: string
  access: RO

- name: network.version
  type: string
  access: RO

- name: remotecontrol.address
  type: int
  range: [1, 31]
  access: RW

- name: remotecontrol.broadcastaddress
  type: int
  range: [0, 1]
  access: RW

- name: ui.osd
  type: bool
  access: RW

- name: ui.menu
  type: bool
  access: RW

- name: ui.minimize
  type: bool
  access: RW

- name: ui.backlight.state
  type: enum
  values: [Off, On, Auto]
  access: RW

- name: ui.backlight.timeout
  type: int
  access: RW

- name: ui.stealthmode
  type: enum
  values: [Off, On]
  access: RW

- name: ui.hasstealthmode
  type: bool
  access: RO

- name: ui.sourcesignal
  type: bool
  access: RW

- name: ui.poweroffhint
  type: bool
  access: RW

- name: image.color.rgbmode.rgbmode
  type: enum
  values: [Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed]
  access: RW

- name: image.color.p7.custom.whitetemperature
  type: int
  range: [3200, 13000]
  step: 100
  access: RW

- name: image.color.p7.custom.mode
  type: string
  access: RW

- name: image.color.p7.custom.whitemode
  type: enum
  values: [Coordinates, Temperature]
  access: RW

- name: image.color.p7.custom.target
  type: object
  access: RW
  notes: "{red:{x,y}, green:{x,y}, blue:{x,y}, white:{x,y}}"

- name: firmware.firmwareversion
  type: string
  access: RO

- name: gsm.available
  type: bool
  access: RO

- name: gsm.pin
  type: string
  access: RW

- name: gsm.pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
  access: RO

- name: dmx.artnet
  type: bool
  access: RW

- name: dmx.artnetnet
  type: int
  access: RW

- name: dmx.artnetuniverse
  type: int
  access: RW

- name: dmx.mode
  type: string
  access: RW

- name: dmx.startchannel
  type: int
  range: [1, 512]
  access: RW

- name: dmx.shutdown
  type: bool
  access: RW

- name: dmx.shutdowntimeout
  type: int
  access: RW

- name: dmx.monitor.connectionstate.active
  type: bool
  access: RO

- name: dmx.monitor.channel01.offset
  type: int
  access: RO

- name: dmx.monitor.channel01.value
  type: int
  access: RO

- name: optics.lenspresent
  type: bool
  access: RO

- name: optics.lens
  type: object
  access: RO
  notes: 'Composite: {ID, PowerID, Name, Description, Zoom{...}, Focus{...}, Iris{...}}'

- name: optics.focus.position
  type: int
  access: RO

- name: optics.focus.target
  type: int
  access: RW

- name: optics.focus.minposition
  type: int
  access: RO

- name: optics.focus.maxposition
  type: int
  access: RO

- name: optics.focus.enabled
  type: bool
  access: RO

- name: optics.focus.safetooperate
  type: bool
  access: RO

- name: optics.focus.safetocalibrate
  type: bool
  access: RO

- name: optics.zoom.position
  type: int
  access: RO

- name: optics.zoom.target
  type: int
  access: RW

- name: optics.zoom.minposition
  type: int
  access: RO

- name: optics.zoom.maxposition
  type: int
  access: RO

- name: optics.zoom.enabled
  type: bool
  access: RO

- name: optics.zoom.safetooperate
  type: bool
  access: RO

- name: optics.zoom.safetocalibrate
  type: bool
  access: RO

- name: optics.lensshift.horizontal.position
  type: int
  access: RO

- name: optics.lensshift.horizontal.target
  type: int
  access: RW

- name: optics.lensshift.horizontal.minposition
  type: int
  access: RO

- name: optics.lensshift.horizontal.maxposition
  type: int
  access: RO

- name: optics.lensshift.horizontal.enabled
  type: bool
  access: RO

- name: optics.lensshift.horizontal.safetooperate
  type: bool
  access: RO

- name: optics.lensshift.horizontal.safetocalibrate
  type: bool
  access: RO

- name: optics.lensshift.vertical.position
  type: int
  access: RO

- name: optics.lensshift.vertical.target
  type: int
  access: RW

- name: optics.lensshift.vertical.minposition
  type: int
  access: RO

- name: optics.lensshift.vertical.maxposition
  type: int
  access: RO

- name: optics.lensshift.vertical.enabled
  type: bool
  access: RO

- name: optics.lensshift.vertical.safetooperate
  type: bool
  access: RO

- name: optics.lensshift.vertical.safetocalibrate
  type: bool
  access: RO

- name: optics.shutter.enabled
  type: bool
  access: RO

- name: optics.filteravailable
  type: bool
  access: RO

- name: image.processing.warp.enable
  type: bool
  access: RW

- name: image.processing.warp.file.enable
  type: bool
  access: RW

- name: image.processing.warp.file.selected
  type: string
  access: RW

- name: image.processing.blend.file.enable
  type: bool
  access: RW

- name: image.processing.blend.file.selected
  type: array
  access: RW

- name: image.processing.blend.file.maxselected
  type: int
  access: RO

- name: image.processing.blend.scurve
  type: float
  range: [1, 4]
  step: 0.1
  access: RW

- name: image.processing.blend.basicblend.enable
  type: bool
  access: RW

- name: image.processing.blacklevel.file.enable
  type: bool
  access: RW

- name: image.processing.blacklevel.file.selected
  type: string
  access: RW

- name: image.processing.blacklevel.basicblacklevel.enable
  type: bool
  access: RW

- name: image.processing.blacklevel.basicblacklevel.level
  type: int
  range: [0, 65535]
  access: RW

- name: image.processing.blacklevel.basicblacklevel.top
  type: int
  access: RW

- name: image.processing.blacklevel.basicblacklevel.bottom
  type: int
  access: RW

- name: image.processing.blacklevel.basicblacklevel.left
  type: int
  access: RW

- name: image.processing.blacklevel.basicblacklevel.right
  type: int
  access: RW

- name: image.processing.blacklevel.redgain
  type: float
  range: [0, 1]
  access: RW

- name: image.processing.blacklevel.greengain
  type: float
  range: [0, 1]
  access: RW

- name: image.processing.blacklevel.bluegain
  type: float
  range: [0, 1]
  access: RW

- name: image.processing.transportdelay.desired
  type: int
  access: RW

- name: image.processing.transportdelay.actual
  type: int
  access: RO

- name: image.processing.transportdelay.minimum
  type: int
  access: RO

- name: ui.layer.adjustment.enable
  type: bool
  access: RW

- name: ui.layer.adjustment.icon
  type: string
  access: RW

- name: ui.layer.adjustment.layerposition
  type: enum
  values: [TopLeft, Top, TopRight, Right, BottomRight, Bottom, BottomLeft, Left, Center]
  access: RW

- name: ui.layer.grid.points
  type: enum
  values: ["2x2", "3x3", "5x5", "9x9", "17x17", "33x33"]
  access: RW

- name: ui.layer.grid.showlines
  type: bool
  access: RW

- name: ui.layer.grid.showpoints
  type: bool
  access: RW

- name: system.license.applicable
  type: bool
  access: RO

- name: system.license.available
  type: bool
  access: RO

- name: system.license.valid
  type: bool
  access: RO

- name: system.license.option.flexbrightness.enabled
  type: bool
  access: RO

- name: system.license.option.flexbrightness.maximumlightoutput
  type: int
  access: RW

- name: system.license.option.flexbrightness.maximumlightoutputattemptsleft
  type: int
  access: RO

- name: system.license.option.flexbrightness.maximumlightoutputs
  type: array
  access: RO
```

## Events
```yaml
# Notifications the device emits. Subscribe via signal.subscribe,
# receive via JSON-RPC method "signal.callback".

- id: property_changed
  source_method: property.changed
  payload: 'array of {property_name: value}'
  notes: Server-initiated; client must implement property.changed handler.

- id: signal_callback
  source_method: signal.callback
  payload: 'array of {signal_name: {arg1, arg2, ...}}'
  notes: Server-initiated; client must implement signal.callback handler.

- id: modelupdated
  source_signal: modelupdated
  payload: '{object: string, newobject: bool, accesslevel: enum}'

- id: edid_listchanged
  source_signal: image.connector.<name>.edid.listchanged
  notes: One per connector: l1displayport, l1hdbaset1, l1hdbaset2, l1hdmi, l2displayporta, l2displayportb, l2displayportc, l2displayportd.

- id: warp_file_listchanged
  source_signal: image.processing.warp.file.listchanged

- id: blend_file_listchanged
  source_signal: image.processing.blend.file.listchanged

- id: blacklevel_file_listchanged
  source_signal: image.processing.blacklevel.file.listchanged

- id: warpgrid_changed
  source_signal: image.processing.warpgrid.changed

- id: warpgrid_gridchanged
  source_signal: image.processing.warpgrid.gridchanged
  payload: 'array of {x: float, y: float}'

- id: testpattern_added
  source_signal: image.testpattern.added
  payload: '{pattern: {name,location,id,above,internal,properties}}'

- id: testpattern_changed
  source_signal: image.testpattern.changed
  payload: '{id, properties}'

- id: testpattern_removed
  source_signal: image.testpattern.removed
  payload: '{pattern: {name,location,id,above,internal,properties}}'

- id: testpattern_file_listchanged
  source_signal: image.testpattern.file.listchanged

- id: network_added
  source_signal: network.added
  payload: '{id: string}'

- id: network_removed
  source_signal: network.removed
  payload: '{id: string}'

- id: notification_dismissed
  source_signal: notification.dismissed
  payload: '{id: string, response: enum}'

- id: notification_emitted
  source_signal: notification.emitted
  payload: '{notification: {severity,id,code,timestamp,message,timeout,actions}}'

- id: system_identificationchanged
  source_signal: system.identificationchanged
  payload: '{identification: string}'

- id: system_license_licensechanged
  source_signal: system.license.licensechanged

- id: system_performed
  source_signal: system.performed
  payload: 'array of {domain: enum}'
  notes: 'Emitted one or more times after system.reset / system.resetall; lists completed domains.'

- id: ui_settings_added
  source_signal: ui.settings.added
  payload: '{key, value}'

- id: ui_settings_changed
  source_signal: ui.settings.changed
  payload: '{key, value}'

- id: ui_settings_removed
  source_signal: ui.settings.removed
  payload: '{key}'
```

## Macros
```yaml
# UNRESOLVED: source describes only single-step operations plus the
# ECO-wake sequence and login/authenticate; no multi-step macro sequences
# are defined in the source.
```

## Safety
```yaml
confirmation_required_for:
  - system.reboot
  - system.reset
  - system.resetall
interlocks:
  - id: optics_focus_safetooperate
    description: 'optics.focus.safetooperate must be true before running focus motor'
    source_property: optics.focus.safetooperate
  - id: optics_zoom_safetooperate
    description: 'optics.zoom.safetooperate must be true before running zoom motor'
    source_property: optics.zoom.safetooperate
  - id: optics_lensshift_h_safetooperate
    description: 'optics.lensshift.horizontal.safetooperate must be true before running horizontal shift motor'
    source_property: optics.lensshift.horizontal.safetooperate
  - id: optics_lensshift_v_safetooperate
    description: 'optics.lensshift.vertical.safetooperate must be true before running vertical shift motor'
    source_property: optics.lensshift.vertical.safetooperate
  - id: illumination_state_prerequisite
    description: 'Source: poweron returns null and "it's good practice to verify that the projector state is either standby or ready before issuing the power on command".'
    source_property: system.state
  - id: illumination_poweroff_prerequisite
    description: 'Source: "good practice to verify that the projector state is on before issuing the power off command".'
    source_property: system.state
# UNRESOLVED: high-voltage, current, fault-recovery, and lens-calibration
# safety procedures are not described in the source.
```

## Notes
- JSON-RPC 2.0 over TCP/9090 is the canonical Pulse service transport. The same JSON-RPC commands are reachable over RS-232 (19200 8N1, no flow control, DB-9 straight-through, pin 2↔2, 3↔3, 5↔5) — the source explicitly states "The type of connection is not important. The same commands are available for all connection types."
- ECO wake-up: the projector accepts the ASCII string `:POWR1\r` on the RS-232 port as a wake-from-ECO trigger. Other wake paths are Wake-on-LAN, remote control, and keypad.
- Authentication is optional for end-user access. For POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT levels, call `authenticate` with `{"code": <int>}` before invoking restricted methods. The signals model carries an `accesslevel` field reflecting the same ladder (UNAUTHENTICATED_END_USER, END_USER, POWER_USER, SERVICE_PARTNER, MANUFACTURING, DEVELOPMENT, INACCESSIBLE).
- File upload uses HTTP POST multipart (`-F file=@...`) at `/api/...`; downloads use HTTP GET. For warp/blend/blacklevel files the URL pattern is `http://<ip>/api/image/processing/{warp|blend|blacklevel}/file/transfer`. For test pattern files: `/api/image/testpattern/file/transfer`. For EDID: `/api/image/connector/edid/transfer`. For firmware: `/api/firmware/transfer`. For notification log: `/api/notification/logger/transfer`.
- Source-object naming: source names with non-word characters stripped and lowercased (e.g. `DisplayPort 1` → `displayport1`) become object names used in `image.source.<name>.listconnectors`, `image.source.<name>.layout`, `image.connector.<name>.detectedsignal`, etc. The available source list varies per model.
- Property-set best practice: wait for the result confirmation before issuing another `property.set` on the same property (source: "Continuously setting the same property without waiting for confirmation may flood the server with unnecessary request and may reduce performance.").
- The source enumerates two parallel forms for several methods (object/boolean params object vs positional array). Both forms are valid JSON-RPC and accepted by the server; for example `introspect` accepts either `{"object":"foo","recursive":true}` or `["foo",true]`.
- The `eco_wake_serial` action is the only command on this spec that uses a non-JSON-RPC payload (raw ASCII); the rest of the action catalogue is JSON-RPC.
- `system.gotoeco` sets the device into ECO state; for waking from ECO, use the ECO-wake actions above. ECO availability is gated by `system.eco.available` / `system.eco.enable`.
- `firmware.schedulecomponentupgrade` schedules an upgrade at the next reboot; the source does not document the parameter shape (it shows only the method name with a short note), so payload is UNRESOLVED.
- `image.connector.<name>.signalrange`, `image.connector.<name>.colorprimariesavailable`, `image.connector.<name>.edid.selected`, and several other per-connector properties are documented in the source without full type tables; they are treated as opaque property paths (property.get/property.set) and not enumerated individually here.
- `image.color.p7.*` exposes an extensive custom-color preset tree (dozens of `redgain`/`greenx`/`yellowlum`-style properties per primary); only high-level structural ones are listed; the full flat list is in the source.
- `ui.keyboardshortcut` is marked DEPRECATED in the source.

<!-- UNRESOLVED: firmware version compatibility range, per-model connector count, and exact motor calibration timing values are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.514Z
last_checked_at: 2026-06-02T17:21:37.589Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:37.589Z
matched_actions: 188
action_count: 188
confidence: medium
summary: "All 188 spec actions have literal method matches in source; transport (port 9090, 19200 8N1, /api base) verified; coverage ratio 188/201 = 0.935 exceeds 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range and per-model I/O layout not stated"
- "source describes only single-step operations plus the"
- "high-voltage, current, fault-recovery, and lens-calibration"
- "firmware version compatibility range, per-model connector count, and exact motor calibration timing values are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
