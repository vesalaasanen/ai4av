---
spec_id: admin/barco-barco-event-master-plugin
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Barco Event Master Plugin Control Spec"
manufacturer: Barco
model_family: "Barco Event Master Plugin"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Event Master Plugin"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/bitfocus/companion-module-barco-eventmaster/blob/master/companion/HELP.md
retrieved_at: 2026-06-10T18:05:28.486Z
last_checked_at: 2026-06-11T13:54:22.905Z
generated_at: 2026-06-11T13:54:22.905Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - image.connector.edid.transfer
  - system.boards.getdeviceinfo
  - "source describes generic \"Pulse\" API used across Barco projectors; the \"Event Master Plugin\" wrapper relationship is not clarified in the document."
  - "source does not document multi-step macro sequences beyond the upload-and-activate pattern for warp/blend/blacklevel files, which is described in prose and not formalized."
  - "no formal interlock procedures documented in source beyond ECO-wake guidance"
  - "- Device name \"Barco Event Master Plugin\" appears to wrap a generic \"Pulse\" projector JSON-RPC API; relationship between wrapper and Pulse service not clarified in the source."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:54:22.905Z
  matched_actions: 181
  action_count: 181
  confidence: medium
  summary: "All 181 spec actions confirmed verbatim in source Methods/Files sections; transport values port 9090 and 19200-8-N-1 match; only 2 minor source items not represented (deprecated getdeviceinfo, EDID transfer endpoint). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Barco Barco Event Master Plugin Control Spec

## Summary
JSON-RPC 2.0 control interface (the "Pulse" service) for Barco projectors. Access over TCP port 9090 or RS-232 serial at 19200-8-N-1. Authentication is optional (skippable for end-user access). Covers power, source/connector selection, illumination, image properties, warp/blend/blacklevel, optics, environment telemetry, signals, notifications, and file transfers.

<!-- UNRESOLVED: source describes generic "Pulse" API used across Barco projectors; the "Event Master Plugin" wrapper relationship is not clarified in the document. -->

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
  type: optional  # inferred: source states authentication is "only necessary when a higher level than normal end user is required" and "can be skipped" for end-user access
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from source/connector selection commands (image.window.main.source)
- queryable       # inferred from property.get / property.subscribe patterns
- levelable       # inferred from illumination.sources.laser.power and image.brightness/contrast/saturation properties
- subscribable    # inferred from property.subscribe / signal.subscribe patterns
```

## Actions
```yaml
# --- Connection / session ---
- id: authenticate
  label: Authenticate session
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 } }
  params:
    - name: code
      type: integer
      description: Secret pass code setting access level
  notes: Optional. End-user requests do not require it.

# --- Power / state ---
- id: system_poweron
  label: Power on projector
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweron" }
  params: []

- id: system_poweroff
  label: Power off projector
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweroff" }
  params: []

- id: system_gotoeco
  label: Set device in eco state
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.gotoeco" }
  params: []

- id: system_gotoready
  label: Set device in ready state
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.gotoready" }
  params: []

- id: system_reboot
  label: Reboot projector (powers off first)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.reboot" }
  params: []

- id: system_reset
  label: Reset selected domains
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.reset", "params": { "domains": ["{domain}"] } }
  params:
    - name: domain
      type: string
      description: Reset domain enum: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx

- id: system_resetall
  label: Reset all domains
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.resetall" }
  params: []

- id: serial_wake_eco
  label: Wake projector from ECO (serial ASCII)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: Send on RS-232 to wake from ECO mode. Alternative: WoL with MAC, remote power, or keypad power.

# --- Property generic get/set/subscribe/unsubscribe ---
- id: property_set
  label: Set property value
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.window.main.source)
    - name: value
      type: string
      description: Target value (string, int, float, bool, object, array)

- id: property_get
  label: Get property value
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string
      description: Dot-notation property name (single, or array for batch read)

- id: property_subscribe
  label: Subscribe to property change notifications
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from property change notifications
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }
  params:
    - name: property
      type: string
      description: Property name or array of property names

# --- Signal subscription ---
- id: signal_subscribe
  label: Subscribe to a signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }
  params:
    - name: signal
      type: string
      description: Signal name (string or array)

- id: signal_unsubscribe
  label: Unsubscribe from a signal
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }
  params:
    - name: signal
      type: string
      description: Signal name (string or array)

# --- Introspection ---
- id: introspect
  label: Introspect API (metadata)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": {recursive} } }
  params:
    - name: object
      type: string
      description: Object name in dot notation (default = all)
    - name: recursive
      type: boolean
      description: Recursively list sub-objects (default true)

# --- Image / sources / connectors ---
- id: image_source_list
  label: List available sources
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.list" }
  params: []

- id: image_connector_list
  label: List available connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.list" }
  params: []

- id: image_source_listconnectors
  label: List connectors used by a source
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.{name}.listconnectors" }
  params:
    - name: name
      type: string
      description: Source object name (lowercase, non-word stripped, e.g. displayport1)

- id: select_active_source
  label: Set the active source
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" } }
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI")

- id: image_resolution_list
  label: List possible resolutions
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.resolution.list" }
  params: []

- id: image_window_list
  label: List all available windows
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.window.list" }
  params: []

# --- Illumination ---
- id: illumination_laser_set_power
  label: Set laser illumination power (%)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": {power} } }
  params:
    - name: power
      type: float
      description: Target power in percent (clamped to minpower..maxpower)

- id: illumination_clo_engage
  label: Engage constant light output at current level
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "illumination.clo.engage" }
  params: []

- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }
  params: []

# --- Picture settings ---
- id: image_brightness_set
  label: Set image brightness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": {value} } }
  params:
    - name: value
      type: float
      description: -1..1 normalized, 0 default, 1 = 100% offset, precision 0.01

- id: image_contrast_set
  label: Set image contrast
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": {value} } }
  params:
    - name: value
      type: float
      description: 0..2 normalized, 1 default, precision 0.01

- id: image_saturation_set
  label: Set image saturation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": {value} } }
  params:
    - name: value
      type: float
      description: 0..2 normalized, 1 default, precision 0.01

- id: image_gamma_set
  label: Set image gamma
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": {value} } }
  params:
    - name: value
      type: float
      description: 1..3, default 2.2, step 0.1

- id: image_sharpness_set
  label: Set image sharpness
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": {value} } }
  params:
    - name: value
      type: integer
      description: -2..8 integer

- id: image_intensity_set
  label: Set image intensity
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.intensity", "value": {value} } }
  params:
    - name: value
      type: float
      description: 0..1, precision 0.01

- id: image_orientation_set
  label: Set image orientation
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "{orientation}" } }
  params:
    - name: orientation
      type: string
      description: DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR

# --- DMX ---
- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listmodes" }
  params: []

- id: dmx_listchannels
  label: List DMX channel names
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listchannels" }
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List managed firmware components
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponents" }
  params: []

- id: firmware_listcomponentversionstatus
  label: List firmware component versions/status
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule component upgrade at next reboot
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }
  params: []

# --- Color / P7 ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 preset to custom
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset P7 preset to defaults
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 custom to native
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }
  params: []

# --- Display / stereo / test pattern ---
- id: image_display_listdisplaymodes
  label: List possible display modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.display.listdisplaymodes" }
  params: []

- id: image_stereo_listdarktime
  label: List possible darktime values (us)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.stereo.listdarktime" }
  params: []

- id: image_testpattern_list
  label: List available test patterns
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.list" }
  params: []

- id: image_testpattern_setproperties
  label: Set properties of a pattern
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.setproperties", "params": { "id": "{id}", "properties": {properties} } }
  params:
    - name: id
      type: string
    - name: properties
      type: object
      description: key/value array of properties

# --- Optics ---
- id: optics_focus_calibrate
  label: Focus calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.calibrate" }
  params: []

- id: optics_focus_runforward
  label: Focus run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runforward" }
  params: []

- id: optics_focus_runforwardtime
  label: Focus run forward for X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runforwardtime" }
  params: []

- id: optics_focus_runreverse
  label: Focus run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runreverse" }
  params: []

- id: optics_focus_runreversetime
  label: Focus run reverse for X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runreversetime" }
  params: []

- id: optics_focus_setlocation
  label: Focus set target to saved location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.setlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_focus_addlocation
  label: Focus add current position as location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.addlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_focus_stepforward
  label: Focus step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.stepforward" }
  params: []

- id: optics_focus_stepreverse
  label: Focus step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.stepreverse" }
  params: []

- id: optics_focus_stop
  label: Focus stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.stop" }
  params: []

# --- Zoom (analogous pattern) ---
- id: optics_zoom_calibrate
  label: Zoom calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.calibrate" }
  params: []

- id: optics_zoom_runforward
  label: Zoom run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runforward" }
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom run forward for X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runforwardtime" }
  params: []

- id: optics_zoom_runreverse
  label: Zoom run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runreverse" }
  params: []

- id: optics_zoom_runreversetime
  label: Zoom run reverse for X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runreversetime" }
  params: []

- id: optics_zoom_setlocation
  label: Zoom set target to saved location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.setlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_zoom_addlocation
  label: Zoom add current position as location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.addlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_zoom_stepforward
  label: Zoom step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.stepforward" }
  params: []

- id: optics_zoom_stepreverse
  label: Zoom step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.stepreverse" }
  params: []

- id: optics_zoom_stop
  label: Zoom stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.stop" }
  params: []

# --- Lens shift horizontal (analogous) ---
- id: optics_lensshift_horizontal_calibrate
  label: Lens shift horizontal calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.calibrate" }
  params: []

- id: optics_lensshift_horizontal_runforward
  label: Lens shift horizontal run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforward" }
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens shift horizontal run forward X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforwardtime" }
  params: []

- id: optics_lensshift_horizontal_runreverse
  label: Lens shift horizontal run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreverse" }
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Lens shift horizontal run reverse X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreversetime" }
  params: []

- id: optics_lensshift_horizontal_setlocation
  label: Lens shift horizontal set target to location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.setlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_addlocation
  label: Lens shift horizontal add location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.addlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_lensshift_horizontal_stepforward
  label: Lens shift horizontal step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepforward" }
  params: []

- id: optics_lensshift_horizontal_stepreverse
  label: Lens shift horizontal step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stepreverse" }
  params: []

- id: optics_lensshift_horizontal_stop
  label: Lens shift horizontal stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stop" }
  params: []

# --- Lens shift vertical (analogous) ---
- id: optics_lensshift_vertical_calibrate
  label: Lens shift vertical calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.calibrate" }
  params: []

- id: optics_lensshift_vertical_runforward
  label: Lens shift vertical run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforward" }
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens shift vertical run forward X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforwardtime" }
  params: []

- id: optics_lensshift_vertical_runreverse
  label: Lens shift vertical run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreverse" }
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Lens shift vertical run reverse X ms
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreversetime" }
  params: []

- id: optics_lensshift_vertical_setlocation
  label: Lens shift vertical set target to location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.setlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_addlocation
  label: Lens shift vertical add location
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.addlocation", "params": { "location": "{location}" } }
  params:
    - name: location
      type: string

- id: optics_lensshift_vertical_stepforward
  label: Lens shift vertical step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepforward" }
  params: []

- id: optics_lensshift_vertical_stepreverse
  label: Lens shift vertical step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stepreverse" }
  params: []

- id: optics_lensshift_vertical_stop
  label: Lens shift vertical stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stop" }
  params: []

# --- Shutter / lens ---
- id: optics_shutter_toggle
  label: Toggle shutter
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.shutter.toggle" }
  params: []

- id: optics_shutter_getobjectpath
  label: Get shutter motor object path
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "optics.shutter.getobjectpath" }
  params: []

- id: optics_shifttocenter
  label: Shift lens to center
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.shifttocenter" }
  params: []

- id: optics_setlensid
  label: Set lens ID
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.setlensid", "params": { "lensid": {lensid}, "powerlensid": {powerlensid} } }
  params:
    - name: lensid
      type: integer
    - name: powerlensid
      type: integer

- id: optics_getvalidlensids
  label: Get valid lens IDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "optics.getvalidlensids" }
  params: []

# --- Peripheral frame axes (analogous pattern) ---
- id: peripheral_frame_horizontal_calibrate
  label: Frame horizontal calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.calibrate" }
  params: []

- id: peripheral_frame_horizontal_runforward
  label: Frame horizontal run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runforward" }
  params: []

- id: peripheral_frame_horizontal_runreverse
  label: Frame horizontal run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.runreverse" }
  params: []

- id: peripheral_frame_horizontal_stepforward
  label: Frame horizontal step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepforward" }
  params: []

- id: peripheral_frame_horizontal_stepreverse
  label: Frame horizontal step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stepreverse" }
  params: []

- id: peripheral_frame_horizontal_stop
  label: Frame horizontal stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.horizontal.stop" }
  params: []

- id: peripheral_frame_rotation_calibrate
  label: Frame rotation calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.calibrate" }
  params: []

- id: peripheral_frame_rotation_runforward
  label: Frame rotation run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.runforward" }
  params: []

- id: peripheral_frame_rotation_runreverse
  label: Frame rotation run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.runreverse" }
  params: []

- id: peripheral_frame_rotation_stepforward
  label: Frame rotation step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepforward" }
  params: []

- id: peripheral_frame_rotation_stepreverse
  label: Frame rotation step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stepreverse" }
  params: []

- id: peripheral_frame_rotation_stop
  label: Frame rotation stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.rotation.stop" }
  params: []

- id: peripheral_frame_vertical_calibrate
  label: Frame vertical calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.calibrate" }
  params: []

- id: peripheral_frame_vertical_runforward
  label: Frame vertical run forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.runforward" }
  params: []

- id: peripheral_frame_vertical_runreverse
  label: Frame vertical run reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.runreverse" }
  params: []

- id: peripheral_frame_vertical_stepforward
  label: Frame vertical step forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepforward" }
  params: []

- id: peripheral_frame_vertical_stepreverse
  label: Frame vertical step reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stepreverse" }
  params: []

- id: peripheral_frame_vertical_stop
  label: Frame vertical stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "peripheral.frame.vertical.stop" }
  params: []

# --- Notification mgmt ---
- id: notification_list
  label: List active notifications
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "notification.list" }
  params: []

- id: notification_dismiss
  label: Dismiss a notification
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "notification.dismiss", "params": { "id": "{id}", "response": "{response}" } }
  params:
    - name: id
      type: string
    - name: response
      type: string
      description: NONE | OK | CANCEL | IGNORE | YES | NO | SUPPRESS

- id: notification_log
  label: List saved notifications
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "notification.log", "params": { "minimumseverity": "{severity}", "start": {start}, "count": {count} } }
  params:
    - name: severity
      type: string
      description: INFO | CAUTION | WARNING | ERROR | CRITICAL
    - name: start
      type: integer
    - name: count
      type: integer

- id: notification_suppress
  label: Suppress a notification code
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "notification.suppress", "params": { "code": "{code}" } }
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Un-suppress a notification code
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "notification.unsuppress", "params": { "code": "{code}" } }
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Un-suppress all notification codes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "notification.unsuppressall" }
  params: []

# --- System / identity / network ---
- id: system_getidentification
  label: Get a single identification value
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.getidentification", "params": { "identification": "{identification}" } }
  params:
    - name: identification
      type: string

- id: system_getidentifications
  label: Get all identifications
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.getidentifications" }
  params: []

- id: system_getsystemdate
  label: Get system date (UTC)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.getsystemdate" }
  params: []

- id: system_boards_getboardinfo
  label: Get board info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getboardinfo", "params": { "boardname": "{boardname}" } }
  params:
    - name: boardname
      type: string

- id: system_boards_getboardlist
  label: Get list of boards
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getboardlist" }
  params: []

- id: system_boards_getmissingboardlist
  label: Get missing board list
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getmissingboardlist" }
  params: []

- id: system_boards_getmoduleinfo
  label: Get module info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getmoduleinfo", "params": { "boardname": "{boardname}" } }
  params:
    - name: boardname
      type: string

- id: system_activity
  label: Signal user activity (resets timers)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.activity" }
  params: []

- id: system_listresetdomains
  label: List reset domains
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.listresetdomains" }
  params: []

- id: network_list
  label: List network device IDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "network.list" }
  params: []

- id: ledctrl_blink
  label: Blink an LED
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": {period} } }
  params:
    - name: led
      type: string
      description: e.g. "systemstatus"
    - name: color
      type: string
    - name: period
      type: integer

- id: led_activity
  label: Activate LEDs (restart timeout)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "led.activity" }
  params: []

- id: led_list
  label: List LEDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "led.list" }
  params: []

# --- Key dispatch (remote / keypad simulation) ---
- id: keydispatcher_sendclickevent
  label: Send key click event
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "keydispatcher.sendclickevent", "params": { "key": "{key}" } }
  params:
    - name: key
      type: string
      description: RC_SHUTTER_OPEN | RC_SHUTTER_CLOSE | RC_POWER_ON | RC_POWER_OFF | RC_OSD | RC_LCD | RC_PATTERN | RC_RGB | RC_ZOOM_PLUS | RC_ZOOM_MINUS | RC_SHIFT_LEFT | RC_SHIFT_UP | RC_SHIFT_RIGHT | RC_SHIFT_DOWN | RC_FOCUS_PLUS | RC_FOCUS_MINUS | RC_MENU | RC_DEFAULT | RC_BACK | RC_UP | RC_LEFT | RC_OK | RC_RIGHT | RC_DOWN | RC_ADDRESS | RC_INPUT | RC_MACRO | RC_1..RC_0 | RC_ASTERISK | RC_NUMBER | KP_LEFT | KP_UP | KP_OK | KP_RIGHT | KP_DOWN | KP_MENU | KP_POWER | KP_BACK | KP_OSD | KP_LENS | KP_PATTERN | KP_SHUTTER | KP_INPUT | KP_STANDBY

- id: keydispatcher_sendpressevent
  label: Send key press event
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "keydispatcher.sendpressevent", "params": { "key": "{key}" } }
  params:
    - name: key
      type: string
      description: Same key enum as sendclickevent

- id: keydispatcher_sendreleaseevent
  label: Send key release event
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "keydispatcher.sendreleaseevent", "params": { "key": "{key}" } }
  params:
    - name: key
      type: string
      description: Same key enum as sendclickevent

- id: remotecontrol_listsensors
  label: List IR sensor object names
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "remotecontrol.listsensors" }
  params: []

# --- Warp / blend / blacklevel file management ---
- id: image_processing_warp_upload
  label: Upload warp file (HTTP POST)
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP
    - name: filename
      type: string

- id: image_processing_warp_select
  label: Select uploaded warp file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{filename}" } }
  params:
    - name: filename
      type: string

- id: image_processing_warp_enable_file
  label: Enable warp file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true } }
  params: []

- id: image_processing_warp_enable_all
  label: Enable all warp functions
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true } }
  params: []

- id: image_processing_warp_filelist
  label: List warp files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warp.file.list" }
  params: []

- id: image_processing_warp_filedelete
  label: Delete warp file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warp.file.delete", "params": { "filename": "{filename}" } }
  params:
    - name: filename
      type: string

- id: image_processing_blend_upload
  label: Upload blend mask (HTTP POST)
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
    - name: filename
      type: string

- id: image_processing_blend_select
  label: Select uploaded blend file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "{filename}" } }
  params:
    - name: filename
      type: string

- id: image_processing_blend_enable_file
  label: Enable blend file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true } }
  params: []

- id: image_processing_blend_filelist
  label: List blend files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blend.file.list" }
  params: []

- id: image_processing_blend_filedelete
  label: Delete blend file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blend.file.delete", "params": { "filename": "{filename}" } }
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_upload
  label: Upload black level mask (HTTP POST)
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
    - name: filename
      type: string

- id: image_processing_blacklevel_select
  label: Select uploaded black level file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{filename}" } }
  params:
    - name: filename
      type: string

- id: image_processing_blacklevel_enable_file
  label: Enable black level file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true } }
  params: []

- id: image_processing_blacklevel_filelist
  label: List black level files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blacklevel.file.list" }
  params: []

- id: image_processing_blacklevel_filedelete
  label: Delete black level file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blacklevel.file.delete", "params": { "filename": "{filename}" } }
  params:
    - name: filename
      type: string

# --- Environment / telemetry ---
- id: environment_getcontrolblocks
  label: Get environment control blocks
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" } }
  params:
    - name: type
      type: string
      description: Sensor | Filter | Controller | Actuator | Alarm | GenericBlock
    - name: valuetype
      type: string
      description: Temperature | Speed | PWM | Voltage | Current | Power | Altitude | Pressure | Humidity | ADC | Coordinate | Peltier | Waveform | Average | Delay | Difference | Interpolation | Limit | Median | Noise | Weighting | Comparison | Threshold | Formula | Driver | PID | Mode | State | Pump | Resistance | Simulation | Constant | Manual | Range | Any

- id: environment_getalarminfo
  label: Get environment alarm info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getalarminfo" }
  params: []

# --- Statistics / counters ---
- id: statistics_listcounters
  label: List all counters
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.listcounters" }
  params: []

# --- UI settings ---
- id: ui_settings_get
  label: Get UI setting value
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.get", "params": { "key": "{key}" } }
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI setting value
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.set", "params": { "key": "{key}", "value": "{value}" } }
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_remove
  label: Remove UI setting
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.remove", "params": { "key": "{key}" } }
  params:
    - name: key
      type: string

- id: ui_settings_keys
  label: List UI setting keys
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.keys" }
  params: []

- id: ui_settings_list
  label: List UI settings key/value pairs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.list" }
  params: []

- id: ui_togglestealthmode
  label: Toggle stealth mode (deprecated)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ui.togglestealthmode" }
  params: []

# --- License / flex brightness ---
- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Get flex-brightness max-light-output code
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.getmaximumlightoutputcode" }
  params: []

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Set flex-brightness max-light-output
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutput", "params": { "code": "{code}", "lightoutput": {lightoutput} } }
  params:
    - name: code
      type: string
    - name: lightoutput
      type: integer

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Set flex-brightness max-light-output (code+sig)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.license.option.flexbrightness.setmaximumlightoutputcode", "params": { "lightoutput": {lightoutput}, "signature": "{signature}", "code": "{code}" } }
  params:
    - name: lightoutput
      type: integer
    - name: signature
      type: string
    - name: code
      type: string
# --- Light measurement ---
- id: lightmeasurement_getlightoutput
  label: Get light output (lumens)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "lightmeasurement.getlightoutput" }
  params: []

# --- Connector EDID list (per-connector) ---
- id: image_connector_edid_list
  label: List EDID selections for a connector
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.{connector}.edid.list" }
  params:
    - name: connector
      type: string
      description: Connector object name, e.g. l1displayport | l1hdbaset1 | l1hdbaset2 | l1hdmi | l2displayporta | l2displayportb | l2displayportc | l2displayportd

# --- Warp grid ---
- id: image_processing_warpgrid_getgrid
  label: Get current warp grid points (normalized)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgrid" }
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get warp grid size
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgridsize" }
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get warp grid scaled to a given resolution
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warpgrid.getscaledgrid", "params": { "resolution": { "x": {x}, "y": {y} } } }
  params:
    - name: x
      type: integer
      description: Resolution width
    - name: y
      type: integer
      description: Resolution height

# --- Four-corners warp helpers ---
- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get four-corners scaled to a resolution
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warp.fourcorners.getscaledcorners", "params": { "resolution": { "x": {x}, "y": {y} } } }
  params:
    - name: x
      type: integer
      description: Resolution width
    - name: y
      type: integer
      description: Resolution height

- id: image_processing_warp_warpscaledpoints
  label: Warp-transform an array of points
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warp.warpscaledpoints", "params": { "points": {points}, "resolution": { "X": {rx}, "Y": {ry} } } }
  params:
    - name: points
      type: array
      description: Array of {X: float, Y: float} objects
    - name: rx
      type: float
      description: Resolution X
    - name: ry
      type: float
      description: Resolution Y

# --- Black level area helpers ---
- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get black level edge boxes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getblacklevelarea", "params": { "resolution_width": {resolution_width}, "resolution_height": {resolution_height} } }
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get black level edge boxes (after warp)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea", "params": { "resolution_width": {resolution_width}, "resolution_height": {resolution_height} } }
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

# --- Blend area helpers ---
- id: image_processing_blend_basicblend_getblendarea
  label: Get blend edge boxes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getblendarea", "params": { "resolution_width": {resolution_width}, "resolution_height": {resolution_height} } }
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get blend edge boxes (after warp)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blend.basicblend.getwarpedblendarea", "params": { "resolution_width": {resolution_width}, "resolution_height": {resolution_height} } }
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

# --- Notification ---
- id: notification_listsuppressed
  label: List suppressed notification codes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "notification.listsuppressed" }
  params: []

# --- Statistics counter names/units ---
- id: statistics_counter_getname
  label: Get display name of a counter
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.{counter}.getname" }
  params:
    - name: counter
      type: string
      description: Counter object name: laserruntime | laserstrikes | projectorruntime | systemtime | uptime

- id: statistics_counter_getunit
  label: Get unit of a counter
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.{counter}.getunit" }
  params:
    - name: counter
      type: string
      description: Counter object name: laserruntime | laserstrikes | projectorruntime | systemtime | uptime
      notes: Returns unit enum — none | hours | minutes | seconds | number | percent

# --- Test pattern file management ---
- id: image_testpattern_file_list
  label: List custom uploaded test pattern files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.file.list" }
  params: []

- id: image_testpattern_file_delete
  label: Delete a custom test pattern file
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.file.delete", "params": { "filename": "{filename}" } }
  params:
    - name: filename
      type: string

# --- UI settings icons ---
- id: ui_settings_getfonticons
  label: Get font icon names for a category
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.getfonticons", "params": { "category": "{category}" } }
  params:
    - name: category
      type: string
      description: Source | Connector | TestPattern

- id: ui_settings_geticons
  label: Get SVG sprite icon names for a category
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.geticons", "params": { "category": "{category}" } }
  params:
    - name: category
      type: string
      description: Source | Connector | TestPattern

# --- HTTP file endpoints ---
- id: firmware_transfer_upload
  label: Upload firmware image (HTTP POST)
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/firmware/transfer'
  params:
    - name: host
      type: string
      description: Projector IP
    - name: filename
      type: string

- id: image_testpattern_file_transfer_upload
  label: Upload test pattern image (HTTP POST)
  kind: action
  command: 'curl -F file=@{filename} http://{host}/api/image/testpattern/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP
    - name: filename
      type: string

- id: notification_logger_transfer_download
  label: Download notification log file (HTTP GET)
  kind: query
  command: 'curl -O -J http://{host}/api/notification/logger/transfer'
  params:
    - name: host
      type: string
      description: Projector IP
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error]
  description: System operational state. Read via property.get on system.state.
- id: illumination_state
  type: enum
  values: [On, Off]
  description: Illumination state. Read via property.get on illumination.state.
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  description: Overall environment alarm severity.
- id: image_window_main_source
  type: string
  description: Currently active source name (e.g. "DisplayPort 1", "HDMI").
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  description: Current shutter position.
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  description: Network device state.
- id: dmx_monitor_connectionstate_active
  type: boolean
  description: True when DMX/Artnet packet received in last 10s.
- id: gsm_pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
- id: ui_stealthmode
  type: enum
  values: [Off, On]
```

## Variables
```yaml
# Properties used as settable parameters. Each is a property.get / property.set target.
# All values illustrative ranges extracted from the source property catalog.
- name: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01
- name: image.contrast
  type: float
  range: [0, 2]
  step: 0.01
- name: image.saturation
  type: float
  range: [0, 2]
  step: 0.01
- name: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
- name: image.sharpness
  type: integer
  range: [-2, 8]
- name: image.intensity
  type: float
  range: [0, 1]
  step: 0.01
- name: image.orientation
  type: string
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- name: illumination.sources.laser.power
  type: float
  range: [0, 100]
  description: Percent of laser power (bounded by minpower/maxpower at runtime)
- name: illumination.sources.laser.minpower
  type: float
  range: [0, 100]
  read_only: true
- name: illumination.sources.laser.maxpower
  type: float
  range: [0, 100]
  read_only: true
- name: illumination.clo.enable
  type: boolean
- name: illumination.clo.setpoint
  type: float
- name: illumination.clo.scale
  type: float
- name: system.initialstate
  type: string
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- name: system.eco.enable
  type: boolean
- name: system.standby.enable
  type: boolean
- name: system.on.timeout.duration
  type: integer
- name: system.on.timeout.enable
  type: boolean
- name: system.ready.timeout.duration
  type: integer
- name: system.ready.timeout.enable
  type: boolean
- name: system.standby.timeout.duration
  type: integer
- name: system.standby.timeout.enable
  type: boolean
- name: system.error.timeout.duration
  type: integer
- name: system.error.timeout.enable
  type: boolean
- name: remotecontrol.address
  type: integer
  range: [1, 31]
- name: remotecontrol.broadcastaddress
  type: integer
  range: [0, 1]
- name: optics.zoom.target
  type: integer
- name: optics.focus.target
  type: integer
- name: optics.lensshift.horizontal.target
  type: integer
- name: optics.lensshift.vertical.target
  type: integer
- name: screen.luminance
  type: float
  range: [50, 10000]
  step: 10
- name: screen.hdrboost
  type: float
  range: [0.8, 1.2]
  step: 0.01
- name: image.processing.transportdelay.desired
  type: integer
- name: image.processing.blend.scurve
  type: float
  range: [1, 4]
  step: 0.1
- name: image.color.p7.custom.whitetemperature
  type: integer
  range: [3200, 13000]
  step: 100
- name: dmx.startchannel
  type: integer
  range: [1, 512]
- name: dmx.shutdowntimeout
  type: integer
- name: dmx.shutdown
  type: boolean
- name: dmx.artnet
  type: boolean
- name: dmx.artnetnet
  type: integer
- name: dmx.artnetuniverse
  type: integer
```

## Events
```yaml
- id: modelupdated
  description: Signals when functionality appears or disappears in the object model.
  payload: { object: string, newobject: bool, accesslevel: enum }
- id: image.processing.warp.file.listchanged
  description: Warp file list changed.
- id: image.processing.blend.file.listchanged
  description: Blend file list changed.
- id: image.processing.blacklevel.file.listchanged
  description: Black level file list changed.
- id: image.processing.warpgrid.changed
  description: Warp grid changed.
- id: image.processing.warpgrid.gridchanged
  description: Warp grid changed (with grid data payload).
  payload: { grid: [{x: float, y: float}] }
- id: image.testpattern.added
  description: New test pattern added.
- id: image.testpattern.changed
  description: Test pattern properties changed.
- id: image.testpattern.removed
  description: Test pattern removed.
- id: network.added
  description: Network device added.
  payload: { id: string }
- id: network.removed
  description: Network device removed.
  payload: { id: string }
- id: notification.dismissed
  description: Notification dismissed.
  payload: { id: string, response: enum }
- id: notification.emitted
  description: New notification emitted.
  payload: { notification: object }
- id: system.identificationchanged
  description: Identification value changed.
- id: system.license.licensechanged
  description: License file changed.
- id: system.performed
  description: Emitted when one or more reset domains complete.
  payload: { domains: [enum] }
- id: ui.settings.added
  description: UI setting key added.
- id: ui.settings.changed
  description: UI setting value changed.
- id: ui.settings.removed
  description: UI setting key removed.
- id: property.changed
  description: Generic property change notification (subscribed via property.subscribe).
  payload: { property: [{name: value}] }
- id: signal.callback
  description: Generic signal callback (subscribed via signal.subscribe).
  payload: { signal: [{name: {args}}] }
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences beyond the upload-and-activate pattern for warp/blend/blacklevel files, which is described in prose and not formalized.
```

## Safety
```yaml
confirmation_required_for:
  - system.poweron
  - system.poweroff
  - system.reboot
  - system.reset
  - system.resetall
  # inferred: power/resets should be preceded by state verification per source ("good practice to verify that the projector state is either standby or ready before issuing the power on command")
interlocks: []
# UNRESOLVED: no formal interlock procedures documented in source beyond ECO-wake guidance
```

## Notes
- Protocol: JSON-RPC 2.0 over TCP port 9090 (per "Network" section), or ASCII serial 19200-8-N-1. Commands documented in source use ASCII `:POWR1\r` only for the ECO-wake use case over RS-232; everything else is JSON-RPC.
- Same commands are available for both transport types (per source).
- All JSON-RPC params are passed by name; order does not matter.
- It is best practice to wait for `property.set` confirmation before setting the same property again to avoid flooding.
- For source-connector translation: drop non-word chars and lowercase the source name to derive the object name (e.g. "DisplayPort 1" -> "displayport1").
- Connector availability depends on the projector model; example list in source: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT, HDMI, SDI.
- File transfer endpoints use HTTP POST (`-F file=@…`) and HTTP GET on the `/api/.../file/transfer` paths.
- ECO mode wake options: Wake-on-LAN (MAC), remote power, keypad power, or RS-232 `:POWR1\r`.

<!-- UNRESOLVED:
- Device name "Barco Event Master Plugin" appears to wrap a generic "Pulse" projector JSON-RPC API; relationship between wrapper and Pulse service not clarified in the source.
- Firmware version compatibility not stated.
- Voltage, current, wattage, fault-recovery sequences: not stated.
- Authentication code: only the example value 98765 is given; the actual code-list/management API is not documented in this source.
- Protocol version of the JSON-RPC service: not stated beyond "2.0".
- Bearer-token / password authentication procedures: not stated.
-->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/bitfocus/companion-module-barco-eventmaster/blob/master/companion/HELP.md
retrieved_at: 2026-06-10T18:05:28.486Z
last_checked_at: 2026-06-11T13:54:22.905Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:54:22.905Z
matched_actions: 181
action_count: 181
confidence: medium
summary: "All 181 spec actions confirmed verbatim in source Methods/Files sections; transport values port 9090 and 19200-8-N-1 match; only 2 minor source items not represented (deprecated getdeviceinfo, EDID transfer endpoint). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- image.connector.edid.transfer
- system.boards.getdeviceinfo
- "source describes generic \"Pulse\" API used across Barco projectors; the \"Event Master Plugin\" wrapper relationship is not clarified in the document."
- "source does not document multi-step macro sequences beyond the upload-and-activate pattern for warp/blend/blacklevel files, which is described in prose and not formalized."
- "no formal interlock procedures documented in source beyond ECO-wake guidance"
- "- Device name \"Barco Event Master Plugin\" appears to wrap a generic \"Pulse\" projector JSON-RPC API; relationship between wrapper and Pulse service not clarified in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
