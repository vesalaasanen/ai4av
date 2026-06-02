---
spec_id: admin/barco-barco-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Barco Series Control Spec"
manufacturer: Barco
model_family: "Barco Barco Series"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Barco Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.425Z
last_checked_at: 2026-06-02T21:47:54.840Z
generated_at: 2026-06-02T21:47:54.840Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model numbers in \"Barco Series\" not enumerated in source; spec covers the family-level Pulse API"
  - "no formal interlock procedures stated in source; only practical recommendations to verify state before power transitions"
  - "firmware version compatibility not stated; model-specific behavior (presence of DMX, illumination type laser vs LED vs UHP) varies per projector model and must be introspected at runtime via `introspect`; authentication code values are not published in source; HDR boost / CLO availability varies by license (system.license.option.flexbrightness); specific voltage/current specs not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:47:54.840Z
  matched_actions: 182
  action_count: 182
  confidence: medium
  summary: "All 182 spec actions traced to source. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Barco Series Control Spec

## Summary
Barco projector family exposing "Pulse services" over RS-232 serial and TCP/IP (JSON-RPC 2.0), plus HTTP file endpoints. Supports power control, source/connector selection, image processing (warp, blend, black level, color), illumination/laser power, optics (focus/zoom/lensshift/shutter), environment telemetry, DMX, notifications, and firmware upload.

<!-- UNRESOLVED: specific model numbers in "Barco Series" not enumerated in source; spec covers the family-level Pulse API -->

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
  type: none  # inferred: source states authentication is required only for higher-than-end-user access; normal end-user access skips authenticate
```

HTTP file transfer uses `http://<projector-address>/api/...` (base path `/api`).

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff
- routable        # inferred from image.window.main.source / image.source.list
- queryable       # inferred from property.get / system.state / introspection
- levelable       # inferred from illumination.sources.laser.power, image.brightness, image.contrast, image.saturation
```

## Actions
```yaml
# --- Power ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []
- id: system_gotoeco
  label: Go to ECO state
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.gotoeco"}'
  params: []
- id: system_gotoready
  label: Go to Ready state
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.gotoready"}'
  params: []
- id: system_reboot
  label: Reboot projector (powers off first)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.reboot"}'
  params: []
- id: system_reset
  label: Reset selected domains
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.reset", "params": {"domains": ["<domain>"]}}'
  params:
    - name: domains
      type: array
      description: Reset domains (ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx)
- id: system_resetall
  label: Reset all domains
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.resetall"}'
  params: []
- id: system_activity
  label: Signal user activity (resets timeout countdowns)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.activity"}'
  params: []
- id: wake_eco_serial
  label: Wake from ECO mode via RS-232
  kind: action
  command: ":POWR1\r"
  notes: ASCII string sent on serial port; only documented method to wake from ECO when in low-power state

# --- Source / input selection ---
- id: image_window_main_source_set
  label: Set active source for main window
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "<source>"}}'
  params:
    - name: source
      type: string
      description: One of the source names returned by image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "SDI", "HDBaseT")
- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []
- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []
- id: image_window_list
  label: List available windows
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.window.list"}'
  params: []
- id: image_source_connector_list
  label: List connectors used by a source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.<sourceobj>.listconnectors"}'
  params:
    - name: sourceobj
      type: string
      description: Source object name (lowercase, non-word stripped, e.g. "displayport1" from "DisplayPort 1")
- id: image_connector_signal_get
  label: Get detected signal for a connector
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.<connectorobj>.detectedsignal"}}'
  params:
    - name: connectorobj
      type: string
      description: Connector object name in lowercase, non-word stripped

# --- Property get/set/subscribe (generic) ---
- id: property_get
  label: Get property value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "<property>"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name
- id: property_get_multi
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["<prop1>", "<prop2>"]}}'
  params:
    - name: properties
      type: array
      description: List of property names
- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "<property>", "value": <value>}}'
  params:
    - name: property
      type: string
    - name: value
      type: any
- id: property_subscribe
  label: Subscribe to one property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "<property>"}}'
  params:
    - name: property
      type: string
- id: property_subscribe_multi
  label: Subscribe to multiple properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["<prop1>", "<prop2>"]}}'
  params:
    - name: properties
      type: array
- id: property_unsubscribe
  label: Unsubscribe from one property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "<property>"}}'
  params:
    - name: property
      type: string
- id: property_unsubscribe_multi
  label: Unsubscribe from multiple properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["<prop1>", "<prop2>"]}}'
  params:
    - name: properties
      type: array

# --- Signals ---
- id: signal_subscribe
  label: Subscribe to a signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "<signal>"}}'
  params:
    - name: signal
      type: string
      description: e.g. "modelupdated"
- id: signal_subscribe_multi
  label: Subscribe to multiple signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["<s1>", "<s2>"]}}'
  params:
    - name: signals
      type: array
- id: signal_unsubscribe
  label: Unsubscribe from a signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "<signal>"}}'
  params:
    - name: signal
      type: string
- id: signal_unsubscribe_multi
  label: Unsubscribe from multiple signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["<s1>", "<s2>"]}}'
  params:
    - name: signals
      type: array

# --- Introspection ---
- id: introspect
  label: Introspect object metadata
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "<object>", "recursive": <bool>}}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

# --- Authentication (higher access levels) ---
- id: authenticate
  label: Authenticate with access code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": <code>}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access; end-user level works without it

# --- Illumination / laser power ---
- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []
- id: lightmeasurement_getlightoutput
  label: Get current light output (lumens)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "lightmeasurement.getlightoutput"}'
  params: []

# --- Picture settings (image service) ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy preset to custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "<name>"}}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resetpreset
  label: Reset color preset to defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "<name>"}}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resettonative
  label: Reset color to native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []
- id: image_display_listdisplaymodes
  label: List possible display modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.display.listdisplaymodes"}'
  params: []
- id: image_resolution_list
  label: List possible resolutions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.resolution.list"}'
  params: []
- id: image_stereo_listdarktime
  label: List possible stereo darktime values (us)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.stereo.listdarktime"}'
  params: []

# --- Image processing: warp ---
- id: image_processing_warp_enable
  label: Enable all warp functions
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}'
  params: []
- id: image_processing_warp_file_select
  label: Select uploaded warp file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "<file>"}}'
  params:
    - name: file
      type: string
- id: image_processing_warp_file_enable
  label: Enable file warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}'
  params: []
- id: image_processing_warp_file_list
  label: List warp files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.file.list"}'
  params: []
- id: image_processing_warp_file_delete
  label: Delete warp file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.file.delete", "params": {"filename": "<name>"}}'
  params:
    - name: filename
      type: string
- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get scaled warp corners
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.fourcorners.getscaledcorners", "params": {"resolution": {"x": <x>, "y": <y>}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
- id: image_processing_warp_warpscaledpoints
  label: Warp a list of points
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warp.warpscaledpoints", "params": {"points": [{"X": <x>, "Y": <y>}], "resolution": {"X": <x>, "Y": <y>}}}'
  params:
    - name: points
      type: array
    - name: resolution
      type: object
- id: image_processing_warpgrid_getgrid
  label: Get current warp grid
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getgrid"}'
  params: []
- id: image_processing_warpgrid_getgridsize
  label: Get warp grid size
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getgridsize"}'
  params: []
- id: image_processing_warpgrid_getscaledgrid
  label: Get warp grid scaled to resolution
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.warpgrid.getscaledgrid", "params": {"resolution": {"x": <x>, "y": <y>}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
- id: image_processing_warpgrid_changed_subscribe
  label: Subscribe to warpgrid.changed
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "image.processing.warpgrid.changed"}}'
  params: []
- id: image_processing_warpgrid_gridchanged_subscribe
  label: Subscribe to warpgrid.gridchanged
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "image.processing.warpgrid.gridchanged"}}'
  params: []

# --- Image processing: blend ---
- id: image_processing_blend_file_select
  label: Select uploaded blend file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": ["<file>"]}}'
  params:
    - name: file
      type: string
- id: image_processing_blend_file_enable
  label: Enable blend file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}'
  params: []
- id: image_processing_blend_file_list
  label: List blend files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.file.list"}'
  params: []
- id: image_processing_blend_file_delete
  label: Delete blend file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.file.delete", "params": {"filename": "<name>"}}'
  params:
    - name: filename
      type: string
- id: image_processing_blend_basicblend_getblendarea
  label: Get blend edges
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getblendarea", "params": {"resolution_width": <w>, "resolution_height": <h>}}'
  params:
    - name: resolution_width
      type: number
    - name: resolution_height
      type: number
- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get warped blend edges
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getwarpedblendarea", "params": {"resolution_width": <w>, "resolution_height": <h>}}'
  params:
    - name: resolution_width
      type: number
    - name: resolution_height
      type: number

# --- Image processing: black level ---
- id: image_processing_blacklevel_file_select
  label: Select uploaded black level file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "<file>"}}'
  params:
    - name: file
      type: string
- id: image_processing_blacklevel_file_enable
  label: Enable black level file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}'
  params: []
- id: image_processing_blacklevel_file_list
  label: List black level files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.file.list"}'
  params: []
- id: image_processing_blacklevel_file_delete
  label: Delete black level file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.file.delete", "params": {"filename": "<name>"}}'
  params:
    - name: filename
      type: string
- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get black level area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getblacklevelarea", "params": {"resolution_width": <w>, "resolution_height": <h>}}'
  params:
    - name: resolution_width
      type: number
    - name: resolution_height
      type: number
- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get warped black level area
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea", "params": {"resolution_width": <w>, "resolution_height": <h>}}'
  params:
    - name: resolution_width
      type: number
    - name: resolution_height
      type: number

# --- Test patterns ---
- id: image_testpattern_list
  label: List test patterns
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.list"}'
  params: []
- id: image_testpattern_setproperties
  label: Set test pattern properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.setproperties", "params": {"id": "<id>", "properties": [{"key": "<k>", "value": "<v>"}]}}'
  params:
    - name: id
      type: string
    - name: properties
      type: array
- id: image_testpattern_file_list
  label: List custom test pattern files
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.file.list"}'
  params: []
- id: image_testpattern_file_delete
  label: Delete custom test pattern file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.testpattern.file.delete", "params": {"filename": "<name>"}}'
  params:
    - name: filename
      type: string

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get environment control blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "<type>", "valuetype": "<valuetype>"}}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any
- id: environment_getalarminfo
  label: Get alarm info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List firmware components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List firmware component versions and status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule firmware component upgrade on next reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

# --- LEDs ---
- id: ledctrl_blink
  label: Blink an LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "<led>", "color": "<color>", "period": <period>}}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer
- id: led_activity
  label: Activate LEDs and reset timeout
  kind: action
  command: '{"jsonrpc": "2.0", "method": "led.activity"}'
  params: []
- id: led_list
  label: List LEDs
  kind: query
  command: '{"jsonrpc": "2.0", "method": "led.list"}'
  params: []

# --- Key dispatch (remote control / keypad emulation) ---
- id: keydispatcher_sendclickevent
  label: Send key click event (press+release)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendclickevent", "params": {"key": "<key>"}}'
  params:
    - name: key
      type: string
      description: One of RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1..RC_0, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY
- id: keydispatcher_sendpressevent
  label: Send key press event
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendpressevent", "params": {"key": "<key>"}}'
  params:
    - name: key
      type: string
- id: keydispatcher_sendreleaseevent
  label: Send key release event
  kind: action
  command: '{"jsonrpc": "2.0", "method": "keydispatcher.sendreleaseevent", "params": {"key": "<key>"}}'
  params:
    - name: key
      type: string

# --- Optics: focus ---
- id: optics_focus_addlocation
  label: Save current focus position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.addlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_focus_calibrate
  label: Calibrate focus
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.calibrate"}'
  params: []
- id: optics_focus_runforward
  label: Run focus forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runforward"}'
  params: []
- id: optics_focus_runforwardtime
  label: Run focus forward for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runforwardtime"}'
  params: []
- id: optics_focus_runreverse
  label: Run focus reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runreverse"}'
  params: []
- id: optics_focus_runreversetime
  label: Run focus reverse for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.runreversetime"}'
  params: []
- id: optics_focus_setlocation
  label: Set focus to saved location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.setlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_focus_stepforward
  label: Step focus forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stepforward"}'
  params: []
- id: optics_focus_stepreverse
  label: Step focus reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stepreverse"}'
  params: []
- id: optics_focus_stop
  label: Stop focus
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.focus.stop"}'
  params: []

# --- Optics: lens shift horizontal ---
- id: optics_lensshift_horizontal_addlocation
  label: Save current H-shift position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.addlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_lensshift_horizontal_calibrate
  label: Calibrate H-shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.calibrate"}'
  params: []
- id: optics_lensshift_horizontal_runforward
  label: Run H-shift forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforward"}'
  params: []
- id: optics_lensshift_horizontal_runforwardtime
  label: Run H-shift forward for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforwardtime"}'
  params: []
- id: optics_lensshift_horizontal_runreverse
  label: Run H-shift reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreverse"}'
  params: []
- id: optics_lensshift_horizontal_runreversetime
  label: Run H-shift reverse for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreversetime"}'
  params: []
- id: optics_lensshift_horizontal_setlocation
  label: Set H-shift to saved location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.setlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_lensshift_horizontal_stepforward
  label: Step H-shift forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepforward"}'
  params: []
- id: optics_lensshift_horizontal_stepreverse
  label: Step H-shift reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepreverse"}'
  params: []
- id: optics_lensshift_horizontal_stop
  label: Stop H-shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stop"}'
  params: []

# --- Optics: lens shift vertical ---
- id: optics_lensshift_vertical_addlocation
  label: Save current V-shift position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.addlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_lensshift_vertical_calibrate
  label: Calibrate V-shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.calibrate"}'
  params: []
- id: optics_lensshift_vertical_runforward
  label: Run V-shift forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforward"}'
  params: []
- id: optics_lensshift_vertical_runforwardtime
  label: Run V-shift forward for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforwardtime"}'
  params: []
- id: optics_lensshift_vertical_runreverse
  label: Run V-shift reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreverse"}'
  params: []
- id: optics_lensshift_vertical_runreversetime
  label: Run V-shift reverse for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreversetime"}'
  params: []
- id: optics_lensshift_vertical_setlocation
  label: Set V-shift to saved location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.setlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_lensshift_vertical_stepforward
  label: Step V-shift forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepforward"}'
  params: []
- id: optics_lensshift_vertical_stepreverse
  label: Step V-shift reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepreverse"}'
  params: []
- id: optics_lensshift_vertical_stop
  label: Stop V-shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.lensshift.vertical.stop"}'
  params: []

# --- Optics: zoom ---
- id: optics_zoom_addlocation
  label: Save current zoom position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.addlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_zoom_calibrate
  label: Calibrate zoom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.calibrate"}'
  params: []
- id: optics_zoom_runforward
  label: Run zoom forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runforward"}'
  params: []
- id: optics_zoom_runforwardtime
  label: Run zoom forward for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runforwardtime"}'
  params: []
- id: optics_zoom_runreverse
  label: Run zoom reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runreverse"}'
  params: []
- id: optics_zoom_runreversetime
  label: Run zoom reverse for X ms
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.runreversetime"}'
  params: []
- id: optics_zoom_setlocation
  label: Set zoom to saved location
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.setlocation", "params": {"location": "<name>"}}'
  params:
    - name: location
      type: string
- id: optics_zoom_stepforward
  label: Step zoom forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stepforward"}'
  params: []
- id: optics_zoom_stepreverse
  label: Step zoom reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stepreverse"}'
  params: []
- id: optics_zoom_stop
  label: Stop zoom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.zoom.stop"}'
  params: []

# --- Optics: shutter + lens ---
- id: optics_shutter_toggle
  label: Toggle shutter
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.shutter.toggle"}'
  params: []
- id: optics_shutter_getobjectpath
  label: Get shutter motor object path
  kind: query
  command: '{"jsonrpc": "2.0", "method": "optics.shutter.getobjectpath"}'
  params: []
- id: optics_shifttocenter
  label: Shift lens to center
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.shifttocenter"}'
  params: []
- id: optics_setlensid
  label: Set lens by ID
  kind: action
  command: '{"jsonrpc": "2.0", "method": "optics.setlensid", "params": {"lensid": <lensid>, "powerlensid": <powerlensid>}}'
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer
- id: optics_getvalidlensids
  label: Get valid lens IDs
  kind: query
  command: '{"jsonrpc": "2.0", "method": "optics.getvalidlensids"}'
  params: []

# --- Peripheral: frame motor (H/V/rotation) ---
- id: peripheral_frame_horizontal_calibrate
  label: Calibrate H frame motor
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.calibrate"}'
  params: []
- id: peripheral_frame_horizontal_runforward
  label: Run H frame forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runforward"}'
  params: []
- id: peripheral_frame_horizontal_runreverse
  label: Run H frame reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runreverse"}'
  params: []
- id: peripheral_frame_horizontal_stepforward
  label: Step H frame forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepforward"}'
  params: []
- id: peripheral_frame_horizontal_stepreverse
  label: Step H frame reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepreverse"}'
  params: []
- id: peripheral_frame_horizontal_stop
  label: Stop H frame
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stop"}'
  params: []
- id: peripheral_frame_vertical_calibrate
  label: Calibrate V frame motor
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.calibrate"}'
  params: []
- id: peripheral_frame_vertical_runforward
  label: Run V frame forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.runforward"}'
  params: []
- id: peripheral_frame_vertical_runreverse
  label: Run V frame reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.runreverse"}'
  params: []
- id: peripheral_frame_vertical_stepforward
  label: Step V frame forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepforward"}'
  params: []
- id: peripheral_frame_vertical_stepreverse
  label: Step V frame reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepreverse"}'
  params: []
- id: peripheral_frame_vertical_stop
  label: Stop V frame
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.vertical.stop"}'
  params: []
- id: peripheral_frame_rotation_calibrate
  label: Calibrate rotation motor
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.calibrate"}'
  params: []
- id: peripheral_frame_rotation_runforward
  label: Run rotation forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.runforward"}'
  params: []
- id: peripheral_frame_rotation_runreverse
  label: Run rotation reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.runreverse"}'
  params: []
- id: peripheral_frame_rotation_stepforward
  label: Step rotation forward
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepforward"}'
  params: []
- id: peripheral_frame_rotation_stepreverse
  label: Step rotation reverse
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepreverse"}'
  params: []
- id: peripheral_frame_rotation_stop
  label: Stop rotation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "peripheral.frame.rotation.stop"}'
  params: []

# --- Notifications ---
- id: notification_list
  label: List active notifications
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.list"}'
  params: []
- id: notification_dismiss
  label: Dismiss a notification
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.dismiss", "params": {"id": "<id>", "response": "<response>"}}'
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS
- id: notification_suppress
  label: Suppress a notification code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.suppress", "params": {"code": "<code>"}}'
  params:
    - name: code
      type: string
- id: notification_unsuppress
  label: Unsuppress a notification code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.unsuppress", "params": {"code": "<code>"}}'
  params:
    - name: code
      type: string
- id: notification_unsuppressall
  label: Unsuppress all notification codes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "notification.unsuppressall"}'
  params: []
- id: notification_listsuppressed
  label: List suppressed notification codes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.listsuppressed"}'
  params: []
- id: notification_log
  label: List saved notifications
  kind: query
  command: '{"jsonrpc": "2.0", "method": "notification.log", "params": {"minimumseverity": "<sev>", "start": <start>, "count": <count>}}'
  params:
    - name: minimumseverity
      type: string
      description: INFO, CAUTION, WARNING, ERROR, CRITICAL
    - name: start
      type: integer
    - name: count
      type: integer

# --- System info / board / network ---
- id: system_getidentification
  label: Get system identification
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getidentification"}'
  params: []
- id: system_getidentifications
  label: Get system identifications
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getidentifications"}'
  params: []
- id: system_getsystemdate
  label: Get system date (UTC)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.getsystemdate"}'
  params: []
- id: system_listresetdomains
  label: List available reset domains
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.listresetdomains"}'
  params: []
- id: system_boards_getboardlist
  label: List boards
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getboardlist"}'
  params: []
- id: system_boards_getboardinfo
  label: Get board info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getboardinfo", "params": {"boardname": "<name>"}}'
  params:
    - name: boardname
      type: string
- id: system_boards_getmoduleinfo
  label: Get board module info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getmoduleinfo", "params": {"boardname": "<name>"}}'
  params:
    - name: boardname
      type: string
- id: system_boards_getmissingboardlist
  label: Get missing board list
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getmissingboardlist"}'
  params: []
- id: system_boards_getdeviceinfo
  label: Get device info (DEPRECATED)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.boards.getdeviceinfo", "params": {"boardname": "<name>"}}'
  params:
    - name: boardname
      type: string
  notes: DEPRECATED: use getboardinfo instead
- id: network_list
  label: List logical network devices
  kind: query
  command: '{"jsonrpc": "2.0", "method": "network.list"}'
  params: []
- id: remotecontrol_listsensors
  label: List IR sensor object names
  kind: query
  command: '{"jsonrpc": "2.0", "method": "remotecontrol.listsensors"}'
  params: []

# --- DMX ---
- id: dmx_listchannels
  label: List DMX channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []
- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

# --- Statistics ---
- id: statistics_listcounters
  label: List statistic counters
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.listcounters"}'
  params: []
- id: statistics_laserruntime_getname
  label: Get laser runtime counter name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserruntime.getname"}'
  params: []
- id: statistics_laserruntime_getunit
  label: Get laser runtime counter unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserruntime.getunit"}'
  params: []
- id: statistics_laserstrikes_getname
  label: Get laser strikes counter name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserstrikes.getname"}'
  params: []
- id: statistics_laserstrikes_getunit
  label: Get laser strikes counter unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.laserstrikes.getunit"}'
  params: []
- id: statistics_projectorruntime_getname
  label: Get projector runtime counter name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.projectorruntime.getname"}'
  params: []
- id: statistics_projectorruntime_getunit
  label: Get projector runtime counter unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.projectorruntime.getunit"}'
  params: []
- id: statistics_systemtime_getname
  label: Get system time counter name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.systemtime.getname"}'
  params: []
- id: statistics_systemtime_getunit
  label: Get system time counter unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.systemtime.getunit"}'
  params: []
- id: statistics_uptime_getname
  label: Get uptime counter name
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.uptime.getname"}'
  params: []
- id: statistics_uptime_getunit
  label: Get uptime counter unit
  kind: query
  command: '{"jsonrpc": "2.0", "method": "statistics.uptime.getunit"}'
  params: []

# --- UI settings ---
- id: ui_settings_get
  label: Get UI setting
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.get", "params": {"key": "<key>"}}'
  params:
    - name: key
      type: string
- id: ui_settings_set
  label: Set UI setting
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.settings.set", "params": {"key": "<key>", "value": "<value>"}}'
  params:
    - name: key
      type: string
    - name: value
      type: string
- id: ui_settings_remove
  label: Remove UI setting
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.settings.remove", "params": {"key": "<key>"}}'
  params:
    - name: key
      type: string
- id: ui_settings_keys
  label: List UI setting keys
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.keys"}'
  params: []
- id: ui_settings_list
  label: List all UI settings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.list"}'
  params: []
- id: ui_settings_geticons
  label: Get SVG sprite icons for category
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.geticons", "params": {"category": "<category>"}}'
  params:
    - name: category
      type: string
      description: Source, Connector, TestPattern
- id: ui_settings_getfonticons
  label: Get font icons for category
  kind: query
  command: '{"jsonrpc": "2.0", "method": "ui.settings.getfonticons", "params": {"category": "<category>"}}'
  params:
    - name: category
      type: string
      description: Source, Connector, TestPattern
- id: ui_togglestealthmode
  label: Toggle stealth mode (DEPRECATED)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ui.togglestealthmode"}'
  params: []
  notes: Source marks this method as deprecated

# --- License / flexbrightness ---
- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get maximum light output code
  kind: query
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.getmaximumlightoutputcode", "params": {"lightoutput": <lumens>, "signature": "<sig>"}}'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set maximum light output
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutput", "params": {"code": "<code>", "lightoutput": <lumens>}}'
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer
- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set maximum light output code
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutputcode", "params": {"lightoutput": <lumens>, "signature": "<sig>", "code": "<code>"}}'
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'
- id: illumination_state
  type: enum
  values: [On, Off]
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: gsm_pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
- id: illumination_clo_state
  type: enum
  values: [Ok, TooDim, TooBright]
- id: illumination_clo_availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'
- id: optics_focus_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
- id: optics_lensshift_horizontal_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
- id: optics_lensshift_vertical_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
- id: optics_zoom_state
  type: enum
  values: [Stopped, Running, Calibrating, Homing]
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: dmx_monitor_connectionstate_active
  type: boolean
- id: image_window_main_source
  type: string
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'
- id: system_modelname
  type: string
- id: system_firmwareversion
  type: string
- id: system_serialnumber
  type: string
- id: system_articlenumber
  type: string
- id: system_familyname
  type: string
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": <value>}}'
- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": <value>}}'
- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": <value>}}'
- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": <value>}}'
- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": <value>}}'
- id: image_intensity
  type: float
  range: [0, 1]
  step: 0.1
  precision: 0.01
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.intensity", "value": <value>}}'
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "<value>"}}'
- id: image_display_desireddisplaymode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
- id: image_display_displaymode
  type: enum
  values: [Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift]
- id: illumination_sources_laser_power
  type: float
  range: [0, 100]
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": <value>}}'
- id: illumination_clo_enable
  type: boolean
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.clo.enable", "value": <value>}}'
- id: illumination_clo_scale
  type: float
- id: illumination_clo_setpoint
  type: float
- id: optics_focus_target
  type: integer
  range: [optics.focus.minposition, optics.focus.maxposition]
- id: optics_focus_position
  type: integer
- id: optics_zoom_target
  type: integer
- id: optics_zoom_position
  type: integer
- id: optics_lensshift_horizontal_target
  type: integer
- id: optics_lensshift_horizontal_position
  type: integer
- id: optics_lensshift_vertical_target
  type: integer
- id: optics_lensshift_vertical_position
  type: integer
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
- id: image_processing_warp_enable
  type: boolean
- id: image_processing_blend_scurve
  type: float
  range: [1, 4]
  step: 0.1
- id: image_processing_transportdelay_desired
  type: integer
- id: system_eco_enable
  type: boolean
- id: system_standby_enable
  type: boolean
- id: system_initialstate
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- id: ui_backlight_state
  type: enum
  values: [Off, On, Auto]
- id: ui_backlight_timeout
  type: integer
- id: ui_stealthmode
  type: enum
  values: [Off, On]
- id: ui_osd
  type: boolean
- id: screen_hdrboost
  type: float
  range: [0.8, 1.2]
  step: 0.01
- id: screen_luminance
  type: float
  range: [50, 10000]
  step: 10
- id: remotecontrol_address
  type: integer
  range: [1, 31]
- id: remotecontrol_broadcastaddress
  type: integer
  range: [0, 1]
- id: dmx_artnet
  type: boolean
- id: dmx_artnetnet
  type: integer
- id: dmx_artnetuniverse
  type: integer
- id: dmx_startchannel
  type: integer
  range: [1, 512]
- id: dmx_shutdown
  type: boolean
- id: dmx_shutdowntimeout
  type: integer
- id: dmx_mode
  type: string
- id: network_hostname
  type: string
- id: network_device_lan_ip4configmanual
  type: object
  fields: [Address, Mask, Gateway, NameServers]
- id: network_device_lan_ip6configmanual
  type: object
  fields: [Address, Prefix, Gateway, NameServers]
```

## Events
```yaml
- id: property_changed
  description: Notification sent by server on subscribed property change
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"<property>": <value>}]}}'
- id: signal_callback
  description: Notification sent by server for subscribed signals
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"<signal>": {<args>}}]}}'
- id: modelupdated
  description: Signal sent when objects appear/disappear
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "<obj>", "newobject": true}}]}}'
- id: notification_emitted
  description: New notification pushed to client
- id: notification_dismissed
  description: Notification dismissed
- id: system_performed
  description: Emitted when one or more reset domains complete
- id: system_identificationchanged
  description: Identification value changed
- id: system_license_licensechanged
  description: License changed
- id: network_added
  description: New network device added
- id: network_removed
  description: Network device removed
- id: image_processing_warpgrid_changed
  description: Warp grid changed (no payload)
- id: image_processing_warpgrid_gridchanged
  description: Warp grid changed (with grid payload)
- id: image_processing_warp_file_listchanged
  description: Warp file list changed
- id: image_processing_blend_file_listchanged
  description: Blend file list changed
- id: image_processing_blacklevel_file_listchanged
  description: Black level file list changed
- id: image_testpattern_added
  description: New test pattern added
- id: image_testpattern_changed
  description: Test pattern changed
- id: image_testpattern_removed
  description: Test pattern removed
- id: image_testpattern_file_listchanged
  description: Test pattern file list changed
- id: image_connector_edid_listchanged
  description: EDID list changed for any connector
- id: ui_settings_added
  description: New UI setting key/value added
- id: ui_settings_changed
  description: UI setting value updated
- id: ui_settings_removed
  description: UI setting key removed
```

## Macros
```yaml
# Documented multi-step sequences in source
- id: enable_file_warp
  label: Enable file-based warp (3 steps)
  steps:
    - action: image_processing_warp_enable
    - upload: "POST http://<address>/api/image/processing/warp/file/transfer (curl -F file=@warp.xml)"
    - action: image_processing_warp_file_select
      params: {file: warp.xml}
    - action: image_processing_warp_file_enable
- id: enable_file_blend
  label: Enable file-based blend (3 steps)
  steps:
    - upload: "POST http://<address>/api/image/processing/blend/file/transfer (curl -F file=@mask.png)"
    - action: image_processing_blend_file_select
      params: {file: mask.png}
    - action: image_processing_blend_file_enable
- id: enable_file_blacklevel
  label: Enable file-based black level (3 steps)
  steps:
    - upload: "POST http://<address>/api/image/processing/blacklevel/file/transfer (curl -F file=@blacklevel.png)"
    - action: image_processing_blacklevel_file_select
      params: {file: blacklevel.png}
    - action: image_processing_blacklevel_file_enable
- id: power_on_safely
  label: Power on only if state permits
  notes: Source recommends verifying system.state is standby or ready before issuing system.poweron
  steps:
    - query: system_state
    - action: system_poweron
- id: power_off_safely
  label: Power off only if state permits
  notes: Source recommends verifying system.state is on before issuing system.poweroff
  steps:
    - query: system_state
    - action: system_poweroff
- id: wake_from_eco
  label: Wake projector from ECO state
  notes: ECO state requires special wake - wake-on-LAN, remote, keypad, or serial :POWR1
  steps:
    - action: wake_eco_serial
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_reset
  - system_resetall
  - optics_setlensid
  - system_license_option_flexbrightness_setmaximumlightoutput
  - system_license_option_flexbrightness_setmaximumlightoutputcode
interlocks: []
# UNRESOLVED: no formal interlock procedures stated in source; only practical recommendations to verify state before power transitions
```

## Notes
JSON-RPC 2.0 protocol; property names use dot notation (lowercase, JavaScript-like). Notification messages have no `id` and require no response. Continuous `property.set` without waiting for confirmation is discouraged. File uploads use HTTP POST `curl -F file=@<file> http://<address>/api/<path>/file/transfer`. Source-connector naming: strip non-word characters and lowercase the source name. ECO state is a true low-power mode requiring wake-on-LAN, IR remote, keypad, or serial `":POWR1\r"`.

<!-- UNRESOLVED: firmware version compatibility not stated; model-specific behavior (presence of DMX, illumination type laser vs LED vs UHP) varies per projector model and must be introspected at runtime via `introspect`; authentication code values are not published in source; HDR boost / CLO availability varies by license (system.license.option.flexbrightness); specific voltage/current specs not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-04-29T08:34:51.425Z
last_checked_at: 2026-06-02T21:47:54.840Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:47:54.840Z
matched_actions: 182
action_count: 182
confidence: medium
summary: "All 182 spec actions traced to source. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model numbers in \"Barco Series\" not enumerated in source; spec covers the family-level Pulse API"
- "no formal interlock procedures stated in source; only practical recommendations to verify state before power transitions"
- "firmware version compatibility not stated; model-specific behavior (presence of DMX, illumination type laser vs LED vs UHP) varies per projector model and must be introspected at runtime via `introspect`; authentication code values are not published in source; HDR boost / CLO availability varies by license (system.license.option.flexbrightness); specific voltage/current specs not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
