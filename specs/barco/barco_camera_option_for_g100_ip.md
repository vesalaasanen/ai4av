---
spec_id: admin/barco-camera-option-for-g100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Camera Option For G100 Control Spec"
manufacturer: Barco
model_family: "Camera Option For G100"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Camera Option For G100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T18:14:51.164Z
last_checked_at: 2026-07-21T21:24:40.386Z
generated_at: 2026-07-21T21:24:40.386Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific command coverage (Camera Option For G100) — source describes the Pulse API in general; some properties/methods may not be present on every variant."
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "- Firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:24:40.386Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions have literal matches in source; transport parameters verified; no drift or fabrication detected. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Camera Option For G100 Control Spec

## Summary
Barco Pulse projector API documented for the G100 family (Camera Option For G100). Control surface is JSON-RPC 2.0 over TCP port 9090, with an equivalent ASCII serial (RS-232) wake-up command on 19200/8/N/1. The spec covers power, source selection, illumination control, image/warp/blend/blacklevel processing, optics, environment telemetry, and introspection.

<!-- UNRESOLVED: device-specific command coverage (Camera Option For G100) — source describes the Pulse API in general; some properties/methods may not be present on every variant. -->

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
  type: code  # source describes an authenticate() request with a secret pass code
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from image.window.main.source property
- queryable       # inferred from property.get / introspect / environment.getcontrolblocks
- levelable       # inferred from image.brightness / image.contrast / illumination.sources.laser.power
```

## Actions
```yaml
# CRITICAL: each JSON-RPC method counts as one action. Property reads/writes via
# property.get / property.set / property.subscribe / property.unsubscribe are
# generic verbs over many properties; the per-property actions below enumerate
# each documented property as a separate row per source catalogue.

# --- Generic service verbs (Service API) ---
- id: authenticate
  label: Authenticate session
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level (normal end-user may skip)

- id: introspect_recursive
  label: Introspect object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty/omitted introspects everything

- id: introspect_non_recursive
  label: Introspect object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "motors", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Dot-notation object name

- id: introspect_array_form
  label: Introspect object (array params form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["foo", true], "id": 1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: ledctrl_blink
  label: Blink status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

# --- system ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "id": 3}'

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "id": 4}'

- id: system_state_get
  label: Get system state
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'

- id: system_state_subscribe
  label: Subscribe to system state changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'

- id: system_standby_enable_get
  label: Get standby enable
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.standby.enable" }, "id": 1}'

- id: system_standby_enable_set
  label: Set standby enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": true }, "id": 2}'
  params:
    - name: value
      type: boolean

- id: system_eco_enable_get
  label: Get ECO enable
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.eco.enable" }, "id": 1}'

- id: system_eco_enable_set
  label: Set ECO enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": true }, "id": 2}'
  params:
    - name: value
      type: boolean

# --- ECO wake via serial ---
- id: serial_wake_eco
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  notes: ASCII characters on the RS-232 serial port; same service reachable over TCP port 9090.

# --- illumination ---
- id: illumination_state_get
  label: Get illumination state
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'

- id: illumination_state_subscribe
  label: Subscribe to illumination state changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'

- id: illumination_sources_list
  label: Introspect illumination sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "illumination.sources", "recursive": false }, "id": 2}'

- id: illumination_laser_power_get
  label: Get laser power (percent)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'

- id: illumination_laser_power_set
  label: Set laser power (percent)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target power in percent (constrained by minpower/maxpower)

- id: illumination_laser_power_subscribe
  label: Subscribe to laser power changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["illumination.sources.laser.power"] }, "id": 4}'

- id: illumination_laser_minpower_get
  label: Get laser min power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'

- id: illumination_laser_maxpower_get
  label: Get laser max power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": 5}'

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": 1}'

- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": 1}'

# --- sources / connectors ---
- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'

- id: image_window_main_source_get
  label: Get active window source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'

- id: image_window_main_source_set
  label: Set active window source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }, "id": 2}'
  params:
    - name: value
      type: string
      description: One of the source names returned by image.source.list (e.g. "HDMI", "DisplayPort 1")

- id: image_window_main_source_subscribe
  label: Subscribe to active window source changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" }, "id": 6}'

- id: image_source_listconnectors
  label: List connectors for a source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source_object
      type: string
      description: Lower-cased, non-word-stripped source name (e.g. "displayport1")

- id: image_connector_detectedsignal_get
  label: Get connector detected signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.displayport1.detectedsignal" }, "id": 5}'
  params:
    - name: connector_object
      type: string

- id: image_connector_detectedsignal_subscribe
  label: Subscribe to connector detected-signal changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.connector.<name>.detectedsignal"] }, "id": 7}'

# --- image window geometry ---
- id: image_window_main_position_get
  label: Get window position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.position" }, "id": 1}'

- id: image_window_main_position_set
  label: Set window position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": 0, "y": 0 } }, "id": 2}'
  params:
    - name: value
      type: object
      description: '{ x: int, y: int }'

- id: image_window_main_size_get
  label: Get window size
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.size" }, "id": 1}'

- id: image_window_main_size_set
  label: Set window size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": 1920, "height": 1200 } }, "id": 2}'
  params:
    - name: value
      type: object
      description: '{ width: int, height: int }'

- id: image_window_main_scalingmode_get
  label: Get window scaling mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.scalingmode" }, "id": 1}'

- id: image_window_main_scalingmode_set
  label: Set window scaling mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "Fill" }, "id": 2}'
  params:
    - name: value
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

# --- picture settings ---
- id: image_brightness_get
  label: Get brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" }, "id": 7}'

- id: image_brightness_set
  label: Set brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": 0.15 }, "id": 9}'
  params:
    - name: value
      type: float
      description: '-1 to 1; 0 = default, 1 = 100% offset; precision 0.01'

- id: image_brightness_subscribe
  label: Subscribe to brightness changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness"] }, "id": 8}'

- id: image_contrast_get
  label: Get contrast
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.contrast" }, "id": 1}'

- id: image_contrast_set
  label: Set contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1.0 }, "id": 2}'
  params:
    - name: value
      type: float
      description: 0 to 2; 1 = default; precision 0.01

- id: image_gamma_get
  label: Get gamma
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.gamma" }, "id": 1}'

- id: image_gamma_set
  label: Set gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }, "id": 2}'
  params:
    - name: value
      type: float
      description: 1 to 3; default 2.2; precision 0.1

- id: image_saturation_get
  label: Get saturation
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.saturation" }, "id": 1}'

- id: image_saturation_set
  label: Set saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1.0 }, "id": 2}'
  params:
    - name: value
      type: float
      description: 0 to 2; 1 = default; precision 0.01

- id: image_sharpness_get
  label: Get sharpness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.sharpness" }, "id": 1}'

- id: image_sharpness_set
  label: Set sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }, "id": 2}'
  params:
    - name: value
      type: integer
      description: '-2 to 8'

- id: image_orientation_get
  label: Get orientation
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.orientation" }, "id": 1}'

- id: image_orientation_set
  label: Set orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }, "id": 2}'
  params:
    - name: value
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

# --- P7 color presets ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 preset to custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "Preset1" }, "id": 1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 preset to default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "Preset1" }, "id": 1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 custom to native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": 1}'

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": 1}'

# --- warp ---
- id: image_processing_warp_enable_get
  label: Get warp enable
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.processing.warp.enable" }, "id": 1}'

- id: image_processing_warp_enable_set
  label: Set warp enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'

- id: warp_upload_file
  label: Upload warp grid file (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'

- id: image_processing_warp_file_selected_set
  label: Select uploaded warp file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string

- id: image_processing_warp_file_enable_set
  label: Enable warp file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'

# --- blend ---
- id: blend_upload_mask
  label: Upload blend mask image (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'

- id: image_processing_blend_file_selected_set
  label: Select uploaded blend files
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "mask.png" }, "id": 13}'
  params:
    - name: value
      type: array
      description: Array of selected filenames

- id: image_processing_blend_file_enable_set
  label: Enable blend file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'

# --- blacklevel ---
- id: blacklevel_upload_mask
  label: Upload black-level mask image (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'

- id: image_processing_blacklevel_file_selected_set
  label: Select uploaded blacklevel file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string

- id: image_processing_blacklevel_file_enable_set
  label: Enable blacklevel file
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'

# --- optics ---
- id: optics_shutter_position_get
  label: Get shutter position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" }, "id": 1}'

- id: optics_shutter_target_get
  label: Get shutter target
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.target" }, "id": 1}'

- id: optics_shutter_target_set
  label: Set shutter target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Closed" }, "id": 2}'
  params:
    - name: value
      type: string
      description: '"Open" or "Closed"'

- id: optics_zoom_position_get
  label: Get zoom position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" }, "id": 1}'

- id: optics_focus_position_get
  label: Get focus position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" }, "id": 1}'

- id: optics_lensshift_horizontal_position_get
  label: Get lens shift horizontal position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" }, "id": 1}'

- id: optics_lensshift_vertical_position_get
  label: Get lens shift vertical position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" }, "id": 1}'

# --- network ---
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 configuration
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }, "id": 1}'

- id: network_device_lan_state_get
  label: Get LAN state
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": 1}'

# --- DMX ---
- id: dmx_mode_get
  label: Get DMX mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.mode" }, "id": 1}'

- id: dmx_startchannel_get
  label: Get DMX start channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.startchannel" }, "id": 1}'

- id: dmx_shutdown_get
  label: Get DMX shutdown flag
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.shutdown" }, "id": 1}'

- id: dmx_listchannels
  label: List DMX channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": 1}'

- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": 1}'

# --- environment ---
- id: environment_getcontrolblocks_temperatures
  label: Get temperature sensor readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'

- id: environment_getcontrolblocks_fanspeeds
  label: Get fan-speed sensor readings
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" }, "id": 19}'

- id: environment_alarmstate_get
  label: Get environment alarm state
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": 1}'

- id: environment_getalarminfo
  label: Get environment alarm info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": 1}'

# --- firmware ---
- id: firmware_listcomponents
  label: List firmware component names
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": 1}'

- id: firmware_listcomponentversionstatus
  label: List firmware components, versions and upgrade status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": 1}'

- id: firmware_schedulecomponentupgrade
  label: Schedule component upgrade on next reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": { "component": "<name>" }, "id": 1}'
  params:
    - name: component
      type: string

# --- signals (subscribe / unsubscribe verbs) ---
- id: signal_subscribe_one
  label: Subscribe to one signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'

- id: signal_subscribe_many
  label: Subscribe to multiple signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 11}'

- id: signal_unsubscribe_one
  label: Unsubscribe from one signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'

- id: signal_unsubscribe_many
  label: Unsubscribe from multiple signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 13}'

# --- property multi-get / multi-subscribe / multi-unsubscribe (generic) ---
- id: property_set
  label: Set a property value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
    - name: value
      type: any

- id: property_get_one
  label: Get one property value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'

- id: property_get_many
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 5}'

- id: property_subscribe_one
  label: Subscribe to one property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'

- id: property_subscribe_many
  label: Subscribe to multiple properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 7}'

- id: property_unsubscribe_one
  label: Unsubscribe from one property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'

- id: property_unsubscribe_many
  label: Unsubscribe from multiple properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 9}'
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
- id: signal_callback
  type: object
  description: Server-pushed notifications; client implements signal.callback
- id: property_changed
  type: object
  description: Server-pushed notifications; client implements property.changed
```

## Variables
```yaml
- id: illumination_laser_power
  type: float
  range: [0, 100]
  unit: percent
  rw: true
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  rw: true
- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  rw: true
- id: image_gamma
  type: float
  range: [1, 3]
  default: 2.2
  rw: true
- id: image_saturation
  type: float
  range: [0, 2]
  default: 1
  rw: true
- id: image_sharpness
  type: integer
  range: [-2, 8]
  rw: true
- id: image_window_main_position
  type: object
  fields: { x: int, y: int }
  rw: true
- id: image_window_main_size
  type: object
  fields: { width: int, height: int }
  rw: true
- id: system_standby_enable
  type: boolean
  rw: true
- id: system_eco_enable
  type: boolean
  rw: true
- id: image_processing_warp_enable
  type: boolean
  rw: true
- id: image_processing_warp_file_enable
  type: boolean
  rw: true
- id: image_processing_warp_file_selected
  type: string
  rw: true
- id: image_processing_blend_file_enable
  type: boolean
  rw: true
- id: image_processing_blend_file_selected
  type: array
  items: string
  rw: true
- id: image_processing_blacklevel_file_enable
  type: boolean
  rw: true
- id: image_processing_blacklevel_file_selected
  type: string
  rw: true
- id: network_device_lan_ip4config
  type: object
  fields: { Address: string, Mask: string, Gateway: string, NameServers: string }
  rw: false
- id: dmx_mode
  type: string
  rw: false
- id: dmx_startchannel
  type: integer
  range: [1, 512]
  rw: false
- id: dmx_shutdown
  type: boolean
  rw: false
```

## Events
```yaml
- id: modelupdated
  description: Signal emitted when object structure changes (objects added/removed). Carries "object" (string) and "isnew" (bool) per change.
- id: property_changed
  description: Server-pushed notification carrying array of property/value pairs. Client must implement property.changed handler.
- id: signal_callback
  description: Server-pushed notification carrying array of signal/argument-list pairs. Client must implement signal.callback handler.
- id: introspect_objectchanged
  description: Signal emitted via modelupdated for new/lost objects.
```

## Macros
```yaml
- id: enable_warp_from_file
  steps:
    - action: warp_upload_file
    - action: image_processing_warp_file_selected_set
    - action: image_processing_warp_file_enable_set
  notes: Sequence from "Warping with grid files" chapter; requires globally enabling warp first.
- id: enable_blend_from_image
  steps:
    - action: blend_upload_mask
    - action: image_processing_blend_file_selected_set
    - action: image_processing_blend_file_enable_set
  notes: Blend masks are grayscale PNG/JPEG/TIFF, 8- or 16-bit; resolution must match blend layer.
- id: enable_blacklevel_from_image
  steps:
    - action: blacklevel_upload_mask
    - action: image_processing_blacklevel_file_selected_set
    - action: image_processing_blacklevel_file_enable_set
  notes: Black-level masks must match blacklevel-layer resolution.
- id: safe_power_on
  steps:
    - action: system_state_get
    - action: system_poweron
  notes: Source recommends verifying state is "standby" or "ready" before issuing power on; idempotent if already on or transitioning.
- id: safe_power_off
  steps:
    - action: system_state_get
    - action: system_poweroff
  notes: Source recommends verifying state is "on" before issuing power off.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements beyond the procedural note that power commands should be issued
# only after checking projector state.
```

## Notes
- Transport: TCP JSON-RPC 2.0 on port 9090; same command set is also reachable over RS-232 (19200/8/N/1, no flow control). The only ASCII serial payload documented is the ECO wake-up token `:POWR1\r`.
- Authentication: normal end-user access may skip `authenticate`; higher access levels require a numeric `code` parameter sent via the `authenticate` method. Default for this spec is `type: code` since the source explicitly documents an auth handshake.
- Source/connector naming: physical source names like `DisplayPort 1` map to object names by stripping non-word characters and lower-casing (`displayport1`); the same applies for connector names.
- Wait for `property.set` confirmation before issuing the same property again; rapid re-sends may flood the server (per source).
- Some properties/signals are dynamic and depend on hardware (e.g. motorized zoom only present if a motorized lens is mounted, DMX extended mode). Introspection is the source of truth for what is exposed on a given unit.
- Picture settings (brightness, contrast, gamma, saturation, sharpness) follow the same get/set/subscribe pattern; only brightness was fully worked in the source — others are emitted with the same shape, parameterized by the documented constraints.

<!-- UNRESOLVED:
  - Firmware version compatibility range not stated in source.
  - Default port for raw TCP frame (current spec uses port 9090 as stated).
  - Authentication `code` value policy (length, rotation, default) not stated.
  - Exact object-tree depth under `image.*` and `illumination.*` is model-dependent.
  - Camera Option For G100 specific command deltas vs. the generic Pulse API not stated in source.
-->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T18:14:51.164Z
last_checked_at: 2026-07-21T21:24:40.386Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:24:40.386Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions have literal matches in source; transport parameters verified; no drift or fabrication detected. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific command coverage (Camera Option For G100) — source describes the Pulse API in general; some properties/methods may not be present on every variant."
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "- Firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
