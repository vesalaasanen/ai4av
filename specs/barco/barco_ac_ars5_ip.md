---
spec_id: admin/barco-ac-ars5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Ac Ars5 Control Spec"
manufacturer: Barco
model_family: "Ac Ars5"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Ac Ars5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-22T05:26:40.748Z
last_checked_at: 2026-07-22T07:36:22.019Z
generated_at: 2026-07-22T07:36:22.019Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the generic \"Pulse API\" family manual, not an Ac Ars5-specific datasheet. Peripherals (lenses, DMX mode, illumination type) depend on the specific configuration and must be discovered at runtime via `introspect`."
  - "parameter shape (component name, version) not given in source."
  - "no voltage/current/electrical safety warnings present in source beyond ECO wake note."
  - "firmware version compatibility, exact ECO wake semantics for non-serial paths, and DMX extended-mode channel inventory are not specified in this source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:36:22.019Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions matched verbatim in source with correct shapes; all transport parameters (port 9090, baud 19200/8/N/1) verified in specification. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Barco Ac Ars5 Control Spec

## Summary
Pulse API control spec for the Barco Ac Ars5 projector. The device exposes a JSON-RPC 2.0 service over TCP (port 9090) and an RS-232 serial interface (19200/8/N/1). Control covers power, sources, illumination, image properties, warping, blending, DMX, environment sensors, and firmware.

<!-- UNRESOLVED: source document is the generic "Pulse API" family manual, not an Ac Ars5-specific datasheet. Peripherals (lenses, DMX mode, illumination type) depend on the specific configuration and must be discovered at runtime via `introspect`. -->

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
  type: passcode  # JSON-RPC `authenticate` method with `code`; normal end-user access skips it (see Notes)
```

## Traits
```yaml
# - powerable       (system.poweron / system.poweroff)
# - routable        (image.window.main.source selection)
# - queryable       (property.get / property.subscribe)
# - levelable       (illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness)
```

## Actions
```yaml
# All JSON-RPC methods exposed by the Pulse service.
# Envelope shape: {"jsonrpc":"2.0","method":"<name>","params":{...},"id":<n>}
# Serial wake: `:POWR1\r` (ASCII, documented for ECO-mode wake only).

- id: authenticate
  label: Authenticate session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets the user access level. Normal end-user access can skip auth.

- id: ledctrl_blink
  label: Blink system-status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color name (e.g. "red").
    - name: period
      type: integer
      description: Blink period in (units UNRESOLVED).

- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. "image.brightness").
    - name: value
      type: string
      description: New value; type depends on the property (float / int / bool / string / enum).

- id: property_get
  label: Get property value (single)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_get_multi
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: property_subscribe
  label: Subscribe to property changes (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_subscribe_multi
  label: Subscribe to property changes (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: property_unsubscribe
  label: Unsubscribe from property (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Dot-notation property path.

- id: property_unsubscribe_multi
  label: Unsubscribe from properties (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths.

- id: signal_subscribe
  label: Subscribe to signal (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated").

- id: signal_subscribe_multi
  label: Subscribe to signals (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe from signal (single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name.

- id: signal_unsubscribe_multi
  label: Unsubscribe from signals (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: introspect
  label: Introspect object metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed). Empty/default introspects everything.
    - name: recursive
      type: boolean
      description: If false, only object names listed (one level). Default true.

- id: introspect_positional
  label: Introspect (positional params variant)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
      description: Object name.
    - name: recursive
      type: boolean
      description: Recursive flag.

- id: system_poweron
  label: Power on projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":3}'
  params: []

- id: system_poweroff
  label: Power off projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":4}'
  params: []

- id: system_state_get
  label: Get projector operation state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: system_state_subscribe
  label: Subscribe to system.state changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: system_standby_enable
  label: Enable/disable standby state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: True enables standby, false disables.

- id: system_eco_enable
  label: Enable/disable ECO state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: True enables ECO mode, false disables.

- id: serial_wake_from_eco
  label: Wake projector from ECO over RS-232
  kind: action
  command: ':POWR1\r'
  params: []

- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: image_source_connectors
  label: List connectors used by a source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source
      type: string
      description: Lowercase, alphanumeric-only source object name (e.g. "displayport1"). Derive by stripping non-word chars from display name.

- id: image_window_main_source_get
  label: Get active source for main window
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: image_window_main_source_set
  label: Set active source for main window
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source display name (e.g. "DisplayPort 1", "HDMI", "DVI 1").

- id: image_window_main_source_subscribe
  label: Subscribe to source changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

- id: image_window_main_position
  label: Set window position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":1}'
  params:
    - name: value
      type: object
      description: Object with integer fields x and y.

- id: image_window_main_size
  label: Set window size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}},"id":1}'
  params:
    - name: value
      type: object
      description: Object with integer fields width and height.

- id: image_window_main_scalingmode
  label: Set window scaling mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":1}'
  params:
    - name: value
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch".

- id: image_brightness_get
  label: Get image brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: image_brightness_set
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized -1..1, step 0.01, default 0.

- id: image_contrast_get
  label: Get image contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":1}'
  params: []

- id: image_contrast_set
  label: Set image contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized 0..2, step 0.01, default 1.

- id: image_gamma_get
  label: Get image gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":1}'
  params: []

- id: image_gamma_set
  label: Set image gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":1}'
  params:
    - name: value
      type: float
      description: 1..3, step 0.1, default 2.2.

- id: image_saturation_get
  label: Get image saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":1}'
  params: []

- id: image_saturation_set
  label: Set image saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Normalized 0..2, step 0.01, default 1.

- id: image_sharpness_get
  label: Get image sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":1}'
  params: []

- id: image_sharpness_set
  label: Set image sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: -2..8, default UNRESOLVED.

- id: image_orientation_set
  label: Set image orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":1}'
  params:
    - name: value
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR".

- id: image_color_p7_custom_copypresettocustom
  label: P7 custom: copy preset to custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy.

- id: image_color_p7_custom_resetpreset
  label: P7 custom: reset preset to defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""},"id":1}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset.

- id: image_color_p7_custom_resettonative
  label: P7 custom: reset to native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":1}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":1}'
  params: []

- id: image_processing_warp_enable
  label: Enable warp globally
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean
      description: True enables all warp functions.

- id: image_processing_warp_file_selected
  label: Select active warp file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: File name (e.g. "warp.xml").

- id: image_processing_warp_file_enable
  label: Enable file-based warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean
      description: True enables the selected warp file.

- id: image_processing_blend_file_selected
  label: Select active blend mask files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["mask.png"]},"id":13}'
  params:
    - name: value
      type: array
      description: Array of blend mask file names.

- id: image_processing_blend_file_enable
  label: Enable blend mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean
      description: True enables the blend mask.

- id: image_processing_blacklevel_file_selected
  label: Select active black-level mask file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: File name (e.g. "blacklevel.png").

- id: image_processing_blacklevel_file_enable
  label: Enable black-level mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean
      description: True enables the black-level mask.

- id: illumination_state_get
  label: Get illumination state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe to illumination state changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: illumination_laser_power_get
  label: Get laser power (percent)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: illumination_laser_power_set
  label: Set laser power (percent)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent. Range bounded by current minpower/maxpower of the unit.

- id: illumination_laser_power_subscribe
  label: Subscribe to laser power changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []

- id: illumination_laser_minpower_get
  label: Get laser minimum power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":1}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":1}'
  params: []

- id: illumination_sources_list
  label: Introspect illumination sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'
  params: []

- id: optics_shutter_position_get
  label: Get shutter position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":1}'
  params: []

- id: optics_shutter_target_set
  label: Set shutter target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Closed"},"id":1}'
  params:
    - name: value
      type: string
      description: One of "Open", "Closed".

- id: optics_zoom_position_get
  label: Get zoom position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":1}'
  params: []

- id: optics_focus_position_get
  label: Get focus position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":1}'
  params: []

- id: optics_lensshift_horizontal_get
  label: Get horizontal lens shift position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":1}'
  params: []

- id: optics_lensshift_vertical_get
  label: Get vertical lens shift position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":1}'
  params: []

- id: dmx_mode_set
  label: Set DMX mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""},"id":1}'
  params:
    - name: value
      type: string
      description: DMX mode name; list via dmx.listmodes.

- id: dmx_startchannel_set
  label: Set DMX start channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":1}'
  params:
    - name: value
      type: integer
      description: Start channel 1..512.

- id: dmx_shutdown_set
  label: Set DMX shutdown flag
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false},"id":1}'
  params:
    - name: value
      type: boolean
      description: True enables DMX-driven shutdown.

- id: dmx_listchannels
  label: List DMX channel names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":1}'
  params: []

- id: dmx_listmodes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":1}'
  params: []

- id: network_lan_ipv4config_get
  label: Get IPv4 network config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":1}'
  params: []

- id: network_lan_state_get
  label: Get LAN state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":1}'
  params: []

- id: environment_alarmstate_get
  label: Get environment alarm state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":1}'
  params: []

- id: environment_getcontrolblocks
  label: Get environment sensor blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      description: One of "Sensor","Filter","Controller","Actuator","Alarm","GenericBlock".
    - name: valuetype
      type: string
      description: One of "Temperature","Speed","PWM","Voltage","Current","Power","Altitude","Pressure","Humidity","ADC","Coordinate","Peltier","Waveform","Average","Delay","Difference","Interpolation","Limit","Median","Noise","Weighting","Comparison","Threshold","Formula","Driver","PID","Mode","State","Pump","Resistance","Simulation","Constant","Manual","Range","Any".

- id: environment_getalarminfo
  label: Get active alarms
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":1}'
  params: []

- id: firmware_listcomponents
  label: List firmware components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":1}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List firmware component versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":1}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule firmware component upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":1}'
  params: []
  # UNRESOLVED: parameter shape (component name, version) not given in source.
```

## Feedbacks
```yaml
- id: system_state
  label: Projector operation state
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

- id: illumination_state
  label: Light engine state
  type: enum
  values:
    - "On"
    - "Off"

- id: image_window_main_source
  label: Active main window source name
  type: string

- id: image_window_main_scalingmode
  label: Window scaling mode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  label: Image orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: illumination_sources_laser_power
  label: Current laser power (percent)
  type: integer

- id: illumination_sources_laser_minpower
  label: Laser minimum power (percent)
  type: integer

- id: illumination_sources_laser_maxpower
  label: Laser maximum power (percent)
  type: integer

- id: optics_shutter_position
  label: Shutter position
  type: enum
  values:
    - Open
    - Closed

- id: network_device_lan_state
  label: LAN state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarmstate
  label: Environment alarm state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: detectedsignal
  label: Connector detected signal info
  type: object
  description: Dictionary with keys active(bool), name(string), vertical_total(int), horizontal_total(int), vertical_resolution(int), horizontal_resolution(int), vertical_sync_width(int), vertical_front_porch(int), vertical_back_porch(int), horizontal_sync_width(int), horizontal_front_porch(int), horizontal_back_porch(int), horizontal_frequency(float), vertical_frequency(float), pixel_rate(int), scan(enum), bits_per_component(int), color_space(enum), signal_range(enum "0-255"|"16-235"), chroma_sampling(enum "4:4:4"|"4:2:2"|"4:2:0"), gamma_type(enum "POWER"|"sRGB"|"REC_BT1886"|"SMPTE_ST2084"), color_primaries(enum "REC709"|"REC2020"|"DCI-P3-D65"|"DCI-P3-Theater"), mastering_luminance(float), content_aspect_ratio(enum), is_stereo(bool), stereo_mode(enum "None"|"Sequential"|"FramePacked"|"TopBottom"|"SideBySide").
```

## Variables
```yaml
- name: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  description: Normalized; 0 default, 1 is 100% offset.

- name: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  description: Normalized; 1 default.

- name: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  description: Default 2.2.

- name: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  description: Normalized; 1 default.

- name: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1
  description: Normalized sharpness.

- name: illumination_sources_laser_power
  type: integer
  range: [minpower, maxpower]
  description: Target laser power in percent; bounded by dynamic min/max.

- name: dmx_startchannel
  type: integer
  range: [1, 512]

- name: image_window_main_position
  type: object
  description: Window position with integer x, y.

- name: image_window_main_size
  type: object
  description: Window size with integer width, height.
```

## Events
```yaml
- id: property_changed
  label: Property value changed (notification)
  kind: notification
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<property>":<value>}]}}'
  description: Sent by server when a subscribed property changes. No `id` field; client must not respond.

- id: signal_callback
  label: Signal emitted (notification)
  kind: notification
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<signal>":{<args>}}]}}'
  description: Sent by server when a subscribed signal fires. No `id` field.

- id: introspect_objectchanged
  label: Object added/removed in model (via modelupdated signal)
  kind: notification
  payload: '{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}'
  description: Fires under modelupdated subscription.
```

## Macros
```yaml
- id: enable_warp_from_file
  label: Upload + select + enable a warp file
  steps:
    - "POST http://<projector-ip>/api/image/processing/warp/file/transfer with multipart form field file=@warp.xml"
    - property.set property=image.processing.warp.file.selected value=<uploaded-filename>
    - property.set property=image.processing.warp.file.enable value=true

- id: enable_blend_mask
  label: Upload + select + enable a blend mask
  steps:
    - "POST http://<projector-ip>/api/image/processing/blend/file/transfer with multipart form field file=@mask.png"
    - property.set property=image.processing.blend.file.selected value=["<uploaded-filename>"]
    - property.set property=image.processing.blend.file.enable value=true

- id: enable_blacklevel_mask
  label: Upload + select + enable a black-level mask
  steps:
    - "POST http://<projector-ip>/api/image/processing/blacklevel/file/transfer with multipart form field file=@blacklevel.png"
    - property.set property=image.processing.blacklevel.file.selected value=<uploaded-filename>
    - property.set property=image.processing.blacklevel.file.enable value=true

- id: safe_power_on
  label: Power on only if standby/ready
  steps:
    - property.get property=system.state
    - if value in ["standby","ready"]: system.poweron

- id: safe_power_off
  label: Power off only if on
  steps:
    - property.get property=system.state
    - if value == "on": system.poweroff
```

## Safety
```yaml
confirmation_required_for:
  - firmware.schedulecomponentupgrade  # forces upgrade at next reboot
  - dmx.shutdown  # can shut the unit down via DMX
interlocks:
  - "Verify system.state is 'standby' or 'ready' before issuing system.poweron; nothing happens for other states."
  - "Verify system.state is 'on' before issuing system.poweroff; nothing happens for other states."
# UNRESOLVED: no voltage/current/electrical safety warnings present in source beyond ECO wake note.
```

## Notes
- JSON-RPC 2.0 framing: `{"jsonrpc":"2.0","method":"...","params":{...},"id":<n>}`. Parameters pass by name; order doesn't matter.
- Authentication: send `authenticate` with `code` to elevate access level. Normal end-user operations do not require auth and may skip it.
- Serial wake from ECO: send ASCII `:POWR1\r` over RS-232. Alternatives: Wake-on-LAN to projector MAC, or physical power button.
- Source object naming: derive by stripping non-word chars and lowercasing the display name (e.g. "DisplayPort 1" → "displayport1").
- File endpoints: HTTP `http://<ip>/api/.../file/transfer`. Upload via `curl -X POST -F file=@<filename> http://<ip>/api/.../file/transfer`. Download via browser or `curl -O -J`.
- Wait for `property.set` confirmation before re-setting the same property; flooding reduces server performance.
- The API is partially dynamic and configuration-dependent (lens peripherals, DMX mode). Use `introspect` to discover the actual surface for a given unit.
- Image formats supported for blend/blacklevel masks: PNG (up to 16 bit), JPEG, TIFF. Grayscale only — color uploads use the blue channel.

<!-- UNRESOLVED: firmware version compatibility, exact ECO wake semantics for non-serial paths, and DMX extended-mode channel inventory are not specified in this source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-22T05:26:40.748Z
last_checked_at: 2026-07-22T07:36:22.019Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:36:22.019Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions matched verbatim in source with correct shapes; all transport parameters (port 9090, baud 19200/8/N/1) verified in specification. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the generic \"Pulse API\" family manual, not an Ac Ars5-specific datasheet. Peripherals (lenses, DMX mode, illumination type) depend on the specific configuration and must be discovered at runtime via `introspect`."
- "parameter shape (component name, version) not given in source."
- "no voltage/current/electrical safety warnings present in source beyond ECO wake note."
- "firmware version compatibility, exact ECO wake semantics for non-serial paths, and DMX extended-mode channel inventory are not specified in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
