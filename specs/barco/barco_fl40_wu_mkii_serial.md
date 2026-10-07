---
spec_id: admin/barco-fl40-wu-mkii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco FL40 WU MKII Control Spec"
manufacturer: Barco
model_family: "FL40 WU MKII"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "FL40 WU MKII"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:43:46.039Z
last_checked_at: 2026-10-07T13:16:32.355Z
generated_at: 2026-10-07T13:16:32.355Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the Pulse API manual generic to the projector family; per-model availability of every method/property must be confirmed via introspect on the target unit."
  - "auth uses a secret pass code via JSON-RPC `authenticate`; code value is project-specific (example: 98765). No default stated."
  - "source defines individual commands only; no multi-step recipes."
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the recommended state-checks above."
  - "firmware version compatibility not stated in source."
  - "HTTP file-endpoint port number not stated in source (only JSON-RPC TCP port 9090 is documented)."
  - "authentication pass code value is project-specific (example value 98765 in source); no default available."
  - "per-model availability of every method/property must be verified via introspect on the specific FL40 WU MKII unit."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:32.355Z
  matched_actions: 93
  action_count: 93
  confidence: medium
  summary: "All 93 spec action units match source methods, properties, curl endpoints and the RS-232 wake string; transport supported; source is a generic Pulse API doc. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco FL40 WU MKII Control Spec

## Summary
The Barco FL40 WU MKII is a Pulse-series laser phosphor projector. This spec covers its RS-232 (serial) and TCP/IP (JSON-RPC 2.0) control interfaces, both of which expose the same Pulse API command set including power, source selection, illumination, picture settings, warping, blending, and environment monitoring.

<!-- UNRESOLVED: source document is the Pulse API manual generic to the projector family; per-model availability of every method/property must be confirmed via introspect on the target unit. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # UNRESOLVED: auth uses a secret pass code via JSON-RPC `authenticate`; code value is project-specific (example: 98765). No default stated.
  notes: "Authentication only required for elevated access; normal end-user access can skip it. Pass code value is configured per projector."
```

**Note:** RS-232 and TCP transports speak the same JSON-RPC 2.0 Pulse API. A special ASCII wake-up sequence (`:POWR1\r`) is sent over RS-232 to wake a projector from ECO mode. File upload/download uses HTTP POST/GET at `http://<address>/api/...` (separate endpoint from the JSON-RPC TCP port).

## Traits
```yaml
- powerable       # inferred: system.poweron / system.poweroff present
- queryable       # inferred: property.get, introspect, environment.getcontrolblocks present
- routable        # inferred: image.window.main.source selection present
- levelable       # inferred: illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness present
- subscribable    # inferred: property.subscribe, signal.subscribe present
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Example: 98765. Real value is configured per projector.
  notes: "Optional. Only required for access above normal end-user level."

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"property":"system.state"},"id":3}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"property":"system.state"},"id":4}'
  params: []

- id: get_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: subscribe_state
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI", "HDBaseT", "SDI", "DVI 1", "DVI 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort")

- id: subscribe_active_source
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: list_source_connectors
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors","id":4}'
  params:
    - name: sourcename
      type: string
      description: Object name of source (lowercase, non-word chars removed; e.g. "DisplayPort 1" -> "displayport1")

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"},"id":5}'
  params:
    - name: connectorname
      type: string
      description: Connector object name (e.g. "displayport1", "l1hdmi")

- id: subscribe_connector_signal
  label: Subscribe to Connector Signal Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connectorname}.detectedsignal"},"id":7}'
  params:
    - name: connectorname
      type: string

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: set_laser_power
  label: Set Laser Power (%)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent (between current minpower and maxpower)

- id: get_laser_min_power
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: get_laser_max_power
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: introspect_illumination_sources
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'
  params: []

- id: clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized brightness offset; 0 = default, 1 = 100% offset. Range: -1 to 1, precision 0.01.

- id: get_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"},"id":7}'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized contrast gain; 1 = default. Range: 0 to 2, precision 0.01.

- id: get_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"},"id":7}'
  params: []

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":9}'
  params:
    - name: value
      type: float
      description: Gamma exponent. Range: 1 to 3, precision 0.1. Default 2.2.

- id: get_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"},"id":7}'
  params: []

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized color saturation; 1 = default. Range: 0 to 2, precision 0.01.

- id: get_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"},"id":7}'
  params: []

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":9}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness. Range: -2 to 8, precision 1.

- id: get_orientation
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"},"id":7}'
  params: []

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":9}'
  params:
    - name: value
      type: enum
      description: One of: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR.

- id: get_window_position
  label: Get Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"},"id":7}'
  params: []

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":9}'
  params:
    - name: value
      type: object
      description: Object with integer fields x and y.

- id: get_window_size
  label: Get Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"},"id":7}'
  params: []

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1200}},"id":9}'
  params:
    - name: value
      type: object
      description: Object with integer fields width and height.

- id: get_scaling_mode
  label: Get Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"},"id":7}'
  params: []

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":9}'
  params:
    - name: value
      type: enum
      description: One of: Fill, OneToOne, FillScreen, Stretch.

- id: enable_warp
  label: Enable Warp (global)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address (e.g. 192.168.1.100).

- id: select_warp_file
  label: Select Active Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: File name of uploaded warp grid.

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: address
      type: string

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: array
      description: Array of blend file names.

- id: enable_blend_file
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: address
      type: string

- id: select_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Closed"}}'
  params:
    - name: value
      type: enum
      description: One of: Open, Closed.

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: get_lensshift_h_position
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_v_position
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_standby_enable
  label: Get Standby Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"}}'
  params: []

- id: set_standby_enable
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: get_eco_enable
  label: Get ECO Enable State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"}}'
  params: []

- id: set_eco_enable
  label: Set ECO Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean

- id: get_lan_ip4_config
  label: Get LAN IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_environment_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_environment_sensor_block
  label: Get Environment Sensor Block
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: enum
      description: One of: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: enum
      description: One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.

- id: get_environment_alarm_info
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: get_dmx_start_channel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: get_dmx_shutdown
  label: Get DMX Shutdown State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: list_firmware_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: copy_p7_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string

- id: reset_p7_custom_preset
  label: Reset P7 Custom Preset to Default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":""}}'
  params:
    - name: presetname
      type: string

- id: reset_p7_custom_to_native
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: next_rgb_mode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: introspect_recursive
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Dot-notation object path. Empty introspects everything.
    - name: recursive
      type: boolean

- id: introspect_non_recursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}'
  params:
    - name: object
      type: string

- id: subscribe_signal
  label: Subscribe to Single Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated").

- id: subscribe_signals_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string

- id: unsubscribe_signals_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array

- id: property_get_multi
  label: Read Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: Array of property names.

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array

- id: led_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color (e.g. "red").
    - name: period
      type: integer
      description: Blink period.

- id: eco_wakeup_serial
  label: Wake Projector from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  transport: serial
  notes: "ASCII string sent verbatim on the RS-232 port. For network-attached projectors use wake-on-LAN, the remote, or the keypad instead."
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  source_property: system.state
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'

- id: illumination_state
  type: enum
  values: [On, Off]
  source_property: illumination.state
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source_property: network.device.lan.state

- id: shutter_position
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.position

- id: shutter_target
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.target

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  source_property: image.window.main.scalingmode

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  source_property: image.orientation

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
  source_property: firmware.listcomponentversionstatus[].status
  query_command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'

- id: connector_signal
  type: object
  description: Detected signal info keyed by connector object name; fields: active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.
  source_property: image.connector.{name}.detectedsignal
  query_command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{name}.detectedsignal"}}'
```

## Variables
```yaml
- id: brightness
  source_property: image.brightness
  type: float
  range: [-1, 1]
  precision: 0.01
  access: read_write

- id: contrast
  source_property: image.contrast
  type: float
  range: [0, 2]
  precision: 0.01
  access: read_write

- id: gamma
  source_property: image.gamma
  type: float
  range: [1, 3]
  precision: 0.1
  default: 2.2
  access: read_write

- id: saturation
  source_property: image.saturation
  type: float
  range: [0, 2]
  precision: 0.01
  access: read_write

- id: sharpness
  source_property: image.sharpness
  type: integer
  range: [-2, 8]
  precision: 1
  access: read_write

- id: laser_power
  source_property: illumination.sources.laser.power
  type: integer
  description: Target power in percent. Bounded dynamically by minpower/maxpower.
  access: read_write

- id: laser_min_power
  source_property: illumination.sources.laser.minpower
  type: integer
  access: read_only

- id: laser_max_power
  source_property: illumination.sources.laser.maxpower
  type: integer
  access: read_only

- id: window_position
  source_property: image.window.main.position
  type: object
  fields: { x: integer, y: integer }
  access: read_write

- id: window_size
  source_property: image.window.main.size
  type: object
  fields: { width: integer, height: integer }
  access: read_write

- id: active_source
  source_property: image.window.main.source
  type: string
  access: read_write

- id: standby_enable
  source_property: system.standby.enable
  type: boolean
  access: read_write

- id: eco_enable
  source_property: system.eco.enable
  type: boolean
  access: read_write

- id: lan_ip4_config
  source_property: network.device.lan.ip4config
  type: object
  fields: { Address: string, Mask: string, Gateway: string, NameServers: string }
  access: read

- id: dmx_mode
  source_property: dmx.mode
  type: string
  access: read

- id: dmx_start_channel
  source_property: dmx.startchannel
  type: integer
  range: [1, 512]
  access: read

- id: dmx_shutdown
  source_property: dmx.shutdown
  type: boolean
  access: read

- id: zoom_position
  source_property: optics.zoom.position
  type: integer
  access: read

- id: focus_position
  source_property: optics.focus.position
  type: integer
  access: read

- id: lensshift_h_position
  source_property: optics.lensshift.horizontal.position
  type: integer
  access: read

- id: lensshift_v_position
  source_property: optics.lensshift.vertical.position
  type: integer
  access: read
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when a subscribed property's value changes. No response required from client.
  payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
  note: Client must implement this method.

- id: signal_callback
  description: Server-pushed notification for subscribed signal emissions.
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'
  note: Client must implement this method.

- id: introspect_object_changed
  description: Fires (via signal.callback) when objects are added or removed from the model. Signaled via "modelupdated" subscription.
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
```

## Macros
```yaml
# No composite macro sequences are explicitly documented in the source.
# UNRESOLVED: source defines individual commands only; no multi-step recipes.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source recommends verifying state is "on" before issuing system.poweroff
  - power_on   # source recommends verifying state is standby/ready before issuing system.poweron
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the recommended state-checks above.
```

## Notes
- Both transports (RS-232 and TCP/9090) speak the same JSON-RPC 2.0 Pulse API. The same method/property names apply over either link.
- A wake-up-from-ECO sequence (`:POWR1\r`) is sent verbatim over RS-232 only. Over TCP, wake the projector via wake-on-LAN, the IR remote, or the keypad.
- File endpoints use HTTP POST/GET to `http://<address>/api/...`. This is a separate channel from the JSON-RPC TCP port (9090). The HTTP server itself has no port number stated in source.
- Object/method/property/signal names use lowercase dot notation. Source names like "DisplayPort 1" become object names like `displayport1` (strip non-word chars, lowercase).
- Parameter order in `params` does not matter; all params are passed by name.
- Wait for the `property.set` confirmation before issuing another `property.set` on the same property; otherwise request flooding may degrade performance.
- Power/ECO/standby transitions are async; the source recommends polling `system.state` before issuing power commands rather than firing them blindly.
- Lens/zoom/focus/motor API surface depends on the mounted lens hardware — use `introspect` on the target unit to confirm presence of motor endpoints.
- DMX basic mode exposes 2 channels; extended mode exposes more — exact channel set must be discovered via `dmx.listchannels` after `dmx.listmodes`.
- Per-property minimum/maximum values (e.g. laser minpower/maxpower) are dynamic and depend on lens type/position and other projector settings.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: HTTP file-endpoint port number not stated in source (only JSON-RPC TCP port 9090 is documented). -->
<!-- UNRESOLVED: authentication pass code value is project-specific (example value 98765 in source); no default available. -->
<!-- UNRESOLVED: per-model availability of every method/property must be verified via introspect on the specific FL40 WU MKII unit. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:43:46.039Z
last_checked_at: 2026-10-07T13:16:32.355Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:32.355Z
matched_actions: 93
action_count: 93
confidence: medium
summary: "All 93 spec action units match source methods, properties, curl endpoints and the RS-232 wake string; transport supported; source is a generic Pulse API doc. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the Pulse API manual generic to the projector family; per-model availability of every method/property must be confirmed via introspect on the target unit."
- "auth uses a secret pass code via JSON-RPC `authenticate`; code value is project-specific (example: 98765). No default stated."
- "source defines individual commands only; no multi-step recipes."
- "no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the recommended state-checks above."
- "firmware version compatibility not stated in source."
- "HTTP file-endpoint port number not stated in source (only JSON-RPC TCP port 9090 is documented)."
- "authentication pass code value is project-specific (example value 98765 in source); no default available."
- "per-model availability of every method/property must be verified via introspect on the specific FL40 WU MKII unit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
