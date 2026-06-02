---
spec_id: admin/barco-pulse-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse Projector Control Spec"
manufacturer: Barco
model_family: ECU100
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - ECU100
    - ECU110
    - ECU200
    - CRM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:34:25.101Z
last_checked_at: 2026-06-01T23:12:21.213Z
generated_at: 2026-06-01T23:12:21.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document explicitly targets \"Pulse projectors\" but the catalog is applied to the ECU/CRM lines by the entity bootstrap. Device-to-API mapping (which model supports which methods) is model-dependent and partially dynamic per the source."
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility ranges not stated in source."
  - "per-model availability of specific properties (e.g., motorized zoom, DMX, illumination source type) must be discovered via introspection."
  - "HTTP base URL pattern beyond /api/file/transfer endpoints not stated. The source only documents specific file endpoint paths, not a generic API root or auth scheme for HTTP."
  - "exact TCP framing / message delimiter not stated; JSON-RPC 2.0 typically uses newline-delimited or length-prefixed framing but the source does not specify."
  - "serial message framing / line terminator not stated for general JSON-RPC over RS-232. The only documented serial string is the ECO wake :POWR1\\r."
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:21.213Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions match source methods/commands verbatim; transport values (port 9090, 19200 8N1, passcode auth) confirmed; source command catalogue fully covered. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Pulse Projector Control Spec

## Summary
This spec describes the Pulse API used to control Barco projectors (including the ECU100, ECU110, ECU200, and CRM product lines). The interface exposes a JSON-RPC 2.0 message protocol over both TCP/IP (port 9090) and RS-232 serial (19200 8N1), and covers projector state, source selection, illumination, image settings, warping, blending, optics, network, and environment telemetry.

<!-- UNRESOLVED: source document explicitly targets "Pulse projectors" but the catalog is applied to the ECU/CRM lines by the entity bootstrap. Device-to-API mapping (which model supports which methods) is model-dependent and partially dynamic per the source. -->

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
  type: passcode  # optional authenticate() call with numeric code; can be skipped for normal end-user access
  notes: "authenticate() sets the user access level. Required only for higher-than-end-user access. Skippable for end-user access."
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
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":3}'
  params: []
  notes: "Verify system.state is standby or ready before issuing. No-op if already on or transitioning."

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":4}'
  params: []
  notes: "Verify system.state is on before issuing. No-op if already off or transitioning."

- id: wake_from_eco_serial
  label: Wake from ECO mode (serial only)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: "ASCII string on RS-232 serial port. Used to wake a projector that is in ECO mode."

- id: authenticate
  label: Authenticate session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets the user access level. Optional for end-user access.

- id: led_blink
  label: LED blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
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

- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. image.brightness)
    - name: value
      type: string
      description: New property value; type depends on property

- id: property_get
  label: Read property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_get_multiple
  label: Read multiple property values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths

- id: property_subscribe
  label: Subscribe to property changes (one)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Dot-notation property path to observe

- id: property_subscribe_multiple
  label: Subscribe to property changes (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths to observe

- id: property_unsubscribe
  label: Unsubscribe from property changes (one)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Dot-notation property path to stop observing

- id: property_unsubscribe_multiple
  label: Unsubscribe from property changes (multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths to stop observing

- id: signal_subscribe
  label: Subscribe to a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated)

- id: signal_subscribe_multiple
  label: Subscribe to multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe from multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: introspect_recursive
  label: Introspect object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level)

- id: introspect_non_recursive
  label: Introspect object (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

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

- id: image_source_list_connectors
  label: List connectors used by a source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source_object_name
      type: string
      description: "Source object name derived by stripping non-word chars and lowercasing the source name (e.g. 'DisplayPort 1' -> 'displayport1')"

- id: set_active_source
  label: Set active source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from the image.source.list result

- id: set_illumination_power
  label: Set illumination power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":1}'
  params: []

- id: illumination_laser_get_serial_number
  label: Get laser serial number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":1}'
  params: []

- id: set_brightness
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Brightness, normalized (0 = default, 1 = 100% offset). Range -1..1, step 0.01.

- id: set_contrast
  label: Set image contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Contrast, normalized (1 = default). Range 0..2, step 0.01.

- id: set_gamma
  label: Set image gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":1}'
  params:
    - name: value
      type: float
      description: Gamma. Range 1..3, step 0.1. Default 2.2.

- id: set_saturation
  label: Set image saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":1}'
  params:
    - name: value
      type: float
      description: Saturation, normalized (1 = default). Range 0..2, step 0.01.

- id: set_sharpness
  label: Set image sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Sharpness, normalized. Range -2..8, step 1.

- id: set_orientation
  label: Set image orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":1}'
  params:
    - name: value
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: set_window_scaling_mode
  label: Set window scaling mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":1}'
  params:
    - name: value
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: set_window_position
  label: Set window position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":1}'
  params:
    - name: value
      type: object
      description: Object with int fields x and y

- id: set_window_size
  label: Set window size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":0,"height":0}},"id":1}'
  params:
    - name: value
      type: object
      description: Object with int fields width and height

- id: enable_warp
  label: Enable warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload warp file
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "HTTP POST to the warp file endpoint. Implies -X POST when using -F."

- id: select_warp_file
  label: Select uploaded warp file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded warp file

- id: enable_warp_file
  label: Enable file warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: upload_blend_mask
  label: Upload blend mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "Grayscale 8-bit or 16-bit PNG/JPEG/TIFF. Mask size must match blend layer resolution."

- id: select_blend_file
  label: Select blend file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded blend file

- id: enable_blend_file
  label: Enable file blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: upload_blacklevel_mask
  label: Upload black level mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address
  notes: "Grayscale 8-bit or 16-bit PNG/JPEG/TIFF. Mask size must match black level layer resolution."

- id: select_blacklevel_file
  label: Select black level file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded black level file

- id: enable_blacklevel_file
  label: Enable black level file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: set_dmx_mode
  label: Set DMX mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"basic"},"id":1}'
  params:
    - name: value
      type: string
      description: DMX mode name (introspect via dmx.listmodes)

- id: set_dmx_start_channel
  label: Set DMX start channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":1}'
  params:
    - name: value
      type: integer
      description: DMX start channel in range 1..512

- id: set_dmx_shutdown
  label: Set DMX shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true},"id":1}'
  params:
    - name: value
      type: boolean

- id: dmx_list_channels
  label: List DMX channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":1}'
  params: []

- id: dmx_list_modes
  label: List DMX modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":1}'
  params: []

- id: set_lan_ipv4_config
  label: Set LAN IPv4 configuration
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{"Address":"","Mask":"","Gateway":"","NameServers":""}},"id":1}'
  params:
    - name: value
      type: object
      description: Object with string fields Address, Mask, Gateway, NameServers

- id: set_shutter_position
  label: Set shutter position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.position","value":"Open"},"id":1}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: set_shutter_target
  label: Set shutter target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"},"id":1}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: set_zoom_position
  label: Set zoom position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Zoom position (int; range model-dependent, introspect)

- id: set_focus_position
  label: Set focus position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Focus position (int; range model-dependent, introspect)

- id: set_lensshift_horizontal
  label: Set horizontal lens shift position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Horizontal lens shift position

- id: set_lensshift_vertical
  label: Set vertical lens shift position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":0},"id":1}'
  params:
    - name: value
      type: integer
      description: Vertical lens shift position

- id: set_standby_enable
  label: Enable standby state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
  notes: "Check availability before issuing."

- id: set_eco_enable
  label: Enable ECO state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
  notes: "Check availability before issuing. ECO mode requires special wake-up procedure (WOL, IR, keypad, or :POWR1 on serial)."

- id: environment_get_control_blocks
  label: Read environment control blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      enum: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: string
      description: Sensor value type (Temperature, Speed, PWM, Voltage, Current, Power, etc.)

- id: environment_get_alarm_info
  label: Read environment alarm info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":1}'
  params: []

- id: firmware_list_components
  label: List firmware component names
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":1}'
  params: []

- id: firmware_list_component_version_status
  label: List firmware component version status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":1}'
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule firmware component upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":1}'
  params: []
  notes: "Upgrade applies at next reboot."

- id: image_color_p7_custom_copy_preset_to_custom
  label: Copy P7 preset to custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","id":1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_reset_preset
  label: Reset P7 preset to defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","id":1}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_reset_to_native
  label: Reset P7 custom to native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":1}'
  params: []

- id: image_color_rgbmode_next
  label: Cycle to next RGB mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":1}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: image_window_main_source
  type: string
  description: "Name of the source currently displayed in the main window. Empty string indicates deselection."

- id: image_window_main_scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  default: 0

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: illumination_sources_laser_power
  type: integer
  description: "Target laser power in percent. Dynamic min/max via illumination.sources.laser.minpower / maxpower."

- id: illumination_sources_laser_minpower
  type: integer
  description: "Minimum laser power in percent (read-only, dynamic)."

- id: illumination_sources_laser_maxpower
  type: integer
  description: "Maximum laser power in percent (read-only, dynamic)."

- id: image_connector_detected_signal
  type: object
  description: "Dictionary returned by property.get on image.connector.{name}.detectedsignal. Includes active, name, vertical/horizontal resolution, sync widths, frequencies, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode."

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_device_lan_ip4config
  type: object
  description: "Object with string fields Address, Mask, Gateway, NameServers."

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_temperatures
  type: object
  description: "Dictionary of sensor name -> temperature (Celsius). Returned by environment.getcontrolblocks with type=Sensor, valuetype=Temperature."

- id: environment_fan_speeds
  type: object
  description: "Dictionary of fan name -> speed (RPM). Returned by environment.getcontrolblocks with type=Sensor, valuetype=Speed."

- id: firmware_component_version_status
  type: object
  description: "Array of objects with name, versions {available, running}, and status enum [Unknown, OK, Upgradable]."

- id: image_source_list
  type: array
  description: "Array of source name strings. Contents vary by model."

- id: image_connector_list
  type: array
  description: "Array of connector name strings. Contents vary by model."

- id: authenticate_result
  type: boolean
  description: "Result of authenticate method: true on success."
```

## Variables
```yaml
# Variables captured as object-typed parameters are also exposed via property.get on the same paths.
# All settable property paths are listed below; their values are dynamically introspectable.
- id: image_brightness
  property: image.brightness
  type: float
  range: [-1, 1]
  default: 0

- id: image_contrast
  property: image.contrast
  type: float
  range: [0, 2]
  default: 1

- id: image_gamma
  property: image.gamma
  type: float
  range: [1, 3]
  default: 2.2

- id: image_saturation
  property: image.saturation
  type: float
  range: [0, 2]
  default: 1

- id: image_sharpness
  property: image.sharpness
  type: integer
  range: [-2, 8]

- id: illumination_sources_laser_power
  property: illumination.sources.laser.power
  type: integer
  range: "[minpower, maxpower] (dynamic)"
```

## Events
```yaml
- id: modelupdated
  trigger: "Object structure changes (objects added or removed)."
  subscribe: signal.subscribe
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
  args:
    - name: object
      type: string
      description: "Name of the changed object"
    - name: isnew
      type: boolean
      description: "true if object is new, false if removed"

- id: property_changed
  trigger: "A subscribed property value changes."
  subscribe: property.subscribe
  payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
  args:
    - name: property
      type: array
      description: "Array of property/value pairs"

- id: signal_callback
  trigger: "A subscribed signal is emitted."
  subscribe: signal.subscribe
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'
  args:
    - name: signal
      type: array
      description: "Array of signal/argument-list pairs"
  notes: "Notifications have no id and do not require a response message."
```

## Macros
```yaml
- id: power_on_sequence
  description: "Recommended power-on sequence per source documentation."
  steps:
    - "property.get system.state"
    - "If state is standby or ready, issue system.poweron"
    - "Subscribe to system.state to receive the ready/on transition notification"

- id: power_off_sequence
  description: "Recommended power-off sequence per source documentation."
  steps:
    - "property.get system.state"
    - "If state is on, issue system.poweroff"
    - "Subscribe to system.state to receive the standby notification"

- id: warp_apply_sequence
  description: "Three-step procedure to apply a warp grid file."
  steps:
    - "POST warp file to /api/image/processing/warp/file/transfer"
    - "property.set image.processing.warp.file.selected <warp.xml>"
    - "property.set image.processing.warp.file.enable true"
    - "property.set image.processing.warp.enable true"

- id: blend_mask_apply_sequence
  description: "Three-step procedure to apply a blend mask."
  steps:
    - "POST mask file to /api/image/processing/blend/file/transfer"
    - "property.set image.processing.blend.file.selected <mask.png>"
    - "property.set image.processing.blend.file.enable true"

- id: blacklevel_apply_sequence
  description: "Three-step procedure to apply a black level mask."
  steps:
    - "POST black level file to /api/image/processing/blacklevel/file/transfer"
    - "property.set image.processing.blacklevel.file.selected <blacklevel.png>"
    - "property.set image.processing.blacklevel.file.enable true"

- id: wake_from_eco_options
  description: "ECO mode wake-up options per source documentation."
  steps:
    - "Send a wake-on-LAN request to the projector's MAC address"
    - "Use the power button on the remote control"
    - "Use the power button on the keypad"
    - "Send the ASCII string ':POWR1\\r' on the RS-232 serial port"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: |
  No explicit safety warnings, interlocks, or power-on sequencing requirements
  were stated in the source document. The source recommends verifying
  system.state before issuing power on/off to avoid no-op calls during
  transitions, but this is best practice rather than a safety interlock.
<!-- UNRESOLVED: source contains no explicit safety warnings or interlock procedures. -->
```

## Notes
- The API is partially dynamic; clients should use `introspect` to enumerate available objects, methods, properties, and signals for their specific projector model and configuration (e.g., lens motorization, DMX mode, attached peripherals).
- The source document does not specify a default `id` field policy. Examples use small integer ids (1..19) or omit `id`. The `id` is optional in requests; the server uses it to correlate responses.
- Notifications (`property.changed`, `signal.callback`) do not carry an `id` and do not require a response.
- Order of fields inside the JSON-RPC envelope is not significant; the server treats request and response as unordered key/value maps.
- It is best practice to await the confirmation response from `property.set` before issuing the same `property.set` again. Continuously setting the same property without waiting may flood the server.
- Authentication is optional; for normal end-user access the `authenticate` call can be skipped. Higher access levels require a numeric pass code.
- Subscribing to a property does not deliver the current value; use `property.get` to read the current state and `property.subscribe` to receive future change notifications.
- DMX is configuration-dependent: in basic mode only 2 channels are present; extended mode exposes more channels. Always run `dmx.listmodes` and `dmx.listchannels` to discover the active set.
- HTTP file endpoints live under `/api/...`. Two example endpoint patterns are documented: `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`. Other endpoints may exist and should be discovered via introspection.
- The `image.source.{name}.listconnectors` and `image.connector.{name}.detectedsignal` paths are dynamic, derived from the source/connector list. Source object names are obtained by stripping non-word characters and lowercasing the source name (e.g., "DisplayPort 1" -> "displayport1").
- For the warp file format, the source explicitly defers to the MCM500/400 documentation.
- ECO mode projectors require a special wake-up procedure; the serial wake string is `:POWR1\r` (ASCII, with CR).
- The source does not document voltage, current, or power specifications. Do not fabricate them.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: per-model availability of specific properties (e.g., motorized zoom, DMX, illumination source type) must be discovered via introspection. -->
<!-- UNRESOLVED: HTTP base URL pattern beyond /api/file/transfer endpoints not stated. The source only documents specific file endpoint paths, not a generic API root or auth scheme for HTTP. -->
<!-- UNRESOLVED: exact TCP framing / message delimiter not stated; JSON-RPC 2.0 typically uses newline-delimited or length-prefixed framing but the source does not specify. -->
<!-- UNRESOLVED: serial message framing / line terminator not stated for general JSON-RPC over RS-232. The only documented serial string is the ECO wake :POWR1\r. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - docs
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-14T11:34:25.101Z
last_checked_at: 2026-06-01T23:12:21.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:21.213Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions match source methods/commands verbatim; transport values (port 9090, 19200 8N1, passcode auth) confirmed; source command catalogue fully covered. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document explicitly targets \"Pulse projectors\" but the catalog is applied to the ECU/CRM lines by the entity bootstrap. Device-to-API mapping (which model supports which methods) is model-dependent and partially dynamic per the source."
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility ranges not stated in source."
- "per-model availability of specific properties (e.g., motorized zoom, DMX, illumination source type) must be discovered via introspection."
- "HTTP base URL pattern beyond /api/file/transfer endpoints not stated. The source only documents specific file endpoint paths, not a generic API root or auth scheme for HTTP."
- "exact TCP framing / message delimiter not stated; JSON-RPC 2.0 typically uses newline-delimited or length-prefixed framing but the source does not specify."
- "serial message framing / line terminator not stated for general JSON-RPC over RS-232. The only documented serial string is the ECO wake :POWR1\\r."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
