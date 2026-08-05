---
spec_id: admin/barco-apx-audio-processor
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Apx Audio Processor Control Spec"
manufacturer: Barco
model_family: "Apx Audio Processor"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Apx Audio Processor"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:58:39.847Z
last_checked_at: 2026-07-21T20:55:20.660Z
generated_at: 2026-07-21T20:55:20.660Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document provided is titled \"RS232 and Network Command Catalog\" for the Pulse API, but the requested device is \"Barco Apx Audio Processor\". Treating the document as the authoritative protocol source; audio-processor-specific commands not present."
  - "voltage/current/power specifications not stated in source"
  - "fault recovery sequences not stated in source"
  - "source describes optional passcode authentication (method \"authenticate\" with \"code\" param) for elevated access; normal end-user access skips it"
  - "source does not describe explicit multi-step macros; macros are composed client-side from the JSON-RPC primitives above."
  - "source does not document explicit safety warnings, interlock procedures, or power-on sequencing requirements. The ECO-wake hint (verify state before issuing poweron/poweroff) is operational guidance, not a safety interlock."
  - "entity_id placeholder \"barco_apx_audio_processor\" was provided but the source document describes the Pulse projector API, not an audio processor. Audio-processor-specific commands (mixing, EQ, routing, levels, etc.) are not present in this source."
  - "source document is named for the Pulse API but the operator requested the Apx Audio Processor. Operator should confirm whether this protocol applies to the audio processor family or whether a different source document is required."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:55:20.660Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions matched literally in source; transport parameters verified in RS232 section; spec comprehensively represents Pulse API. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Apx Audio Processor Control Spec

## Summary
JSON-RPC 2.0 control API for Barco Pulse projector family. Devices expose properties, methods and signals over TCP/IP (port 9090) or RS-232 (19200 baud). Covers power, sources, illumination, image processing, optics, DMX, environment sensors, firmware and notifications.

<!-- UNRESOLVED: source document provided is titled "RS232 and Network Command Catalog" for the Pulse API, but the requested device is "Barco Apx Audio Processor". Treating the document as the authoritative protocol source; audio-processor-specific commands not present. -->

<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

<!-- UNRESOLVED: fault recovery sequences not stated in source -->

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
  type: passcode  # UNRESOLVED: source describes optional passcode authentication (method "authenticate" with "code" param) for elevated access; normal end-user access skips it
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff method examples
- routable        # inferred from image.window.main.source input select examples
- queryable       # inferred from property.get / environment.getcontrolblocks examples
- levelable       # inferred from image.brightness / image.contrast / illumination.sources.laser.power settable examples
- subscribable    # inferred from property.subscribe / signal.subscribe examples
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated user access level

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: get_property
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Object name and property name in dot notation (e.g. image.brightness)

- id: set_property
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Object name and property name in dot notation
    - name: value
      type: string
      description: New property value (string, int, float, bool, array, object, or dictionary)

- id: get_multiple_properties
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: property
      type: array
      description: List of property names in dot notation

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property name to observe

- id: subscribe_multiple_properties
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: property
      type: array
      description: List of property names to observe

- id: unsubscribe_property
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Single property name to stop observing

- id: unsubscribe_multiple_properties
  label: Unsubscribe from Multiple Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{prop1}","{prop2}"]}}'
  params:
    - name: property
      type: array
      description: List of property names to stop observing

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation

- id: subscribe_multiple_signals
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{sig1}","{sig2}"]}}'
  params:
    - name: signal
      type: array
      description: List of signal names in dot notation

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation

- id: unsubscribe_multiple_signals
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{sig1}","{sig2}"]}}'
  params:
    - name: signal
      type: array
      description: List of signal names in dot notation

- id: introspect
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty/omitted = introspect everything)

- id: introspect_nonrecursive
  label: Introspect Object (One Level)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name as returned by image.source.list (e.g. DisplayPort 1, HDMI)

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors Used by a Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: Source object name (lowercase, no spaces, e.g. displayport1)

- id: get_connector_signal
  label: Get Detected Signal on Connector
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"}}'
  params:
    - name: connectorname
      type: string
      description: Connector object name (lowercase, no spaces)

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Illumination Power Level
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: set_laser_power
  label: Set Laser Illumination Power Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Power level in percent (consult laser.minpower / laser.maxpower for valid range)

- id: get_laser_min_power
  label: Get Laser Minimum Power Level
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_max_power
  label: Get Laser Maximum Power Level
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized brightness offset (-1 to 1, step 0.01)

- id: get_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized contrast gain (0 to 2, step 0.01)

- id: get_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma value (1 to 3, step 0.1; default 2.2)

- id: get_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized saturation (0 to 2, step 0.01)

- id: get_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness (-2 to 8, step 1)

- id: get_orientation
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"}}'
  params: []

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{orientation}"}}'
  params:
    - name: orientation
      type: enum
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: get_window_position
  label: Get Main Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"}}'
  params: []

- id: set_window_position
  label: Set Main Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
      description: X position
    - name: y
      type: integer
      description: Y position

- id: get_window_size
  label: Get Main Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"}}'
  params: []

- id: set_window_size
  label: Set Main Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}'
  params:
    - name: width
      type: integer
      description: Window width
    - name: height
      type: integer
      description: Window height

- id: get_window_scaling_mode
  label: Get Main Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"}}'
  params: []

- id: set_window_scaling_mode
  label: Set Main Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{mode}"}}'
  params:
    - name: mode
      type: enum
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: enable_warp
  label: Enable All Warp Functions
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: select_warp_file
  label: Select Warp Grid File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Name of uploaded warp file

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address (e.g. 192.168.1.100)
    - name: filename
      type: string
      description: Local path to warp grid file

- id: enable_blend_file
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["{filename}"]}}'
  params:
    - name: filename
      type: string
      description: Name of uploaded blend mask file

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local path to blend mask image (PNG up to 16-bit, JPEG, TIFF)

- id: enable_blacklevel_file
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: select_blacklevel_file
  label: Select Black Level Mask File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Name of uploaded black level mask file

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: address
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local path to black level mask image (PNG up to 16-bit, JPEG, TIFF)

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

- id: get_lensshift_horizontal
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: get_shutter_target
  label: Get Shutter Target
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"}}'
  params:
    - name: target
      type: enum
      description: One of Open, Closed

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_lan_ip4config
  label: Get IPv4 Network Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_environment_sensors
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: enum
      description: One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: enum
      description: One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any

- id: get_alarm_info
  label: Get Alarm Information
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: enable_standby
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable standby state usage, false to disable (check availability first)

- id: enable_eco
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable ECO state usage, false to disable (check availability first)

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: list_dmx_channels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{mode}"}}'
  params:
    - name: mode
      type: string
      description: DMX mode name

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{channel}}}'
  params:
    - name: channel
      type: integer
      description: DMX start channel (1 to 512)

- id: get_dmx_shutdown
  label: Get DMX Shutdown Setting
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown Setting
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: True to enable DMX shutdown, false to disable

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: list_firmware_versions
  label: List Firmware Component Versions and Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: engage_clo
  label: Engage Constant Light Output (CLO)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: p7_copy_preset_to_custom
  label: P7 - Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: p7_reset_preset
  label: P7 - Reset Preset to Default
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: p7_reset_to_native
  label: P7 - Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rgbmode_next
  label: RGB Mode - Next
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED name (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: serial_wake_from_eco
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  notes: ASCII sent on RS-232 serial port; use when projector is in ECO mode. Alternative: Wake-on-LAN, remote power button, keypad power button.
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  notes: One of the projector lifecycle states.

- id: illumination_state
  type: enum
  values: [On, Off]

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: window_scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: dmx_firmware_status
  type: enum
  values: [Unknown, OK, Upgradable]

- id: detected_signal
  type: object
  description: Active signal info on a connector (resolution, frequencies, pixel rate, scan type, color info, etc.)
```

## Variables
```yaml
- name: brightness
  path: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01

- name: contrast
  path: image.contrast
  type: float
  range: [0, 2]
  step: 0.01

- name: gamma
  path: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2

- name: saturation
  path: image.saturation
  type: float
  range: [0, 2]
  step: 0.01

- name: sharpness
  path: image.sharpness
  type: integer
  range: [-2, 8]
  step: 1

- name: laser_power
  path: illumination.sources.laser.power
  type: integer
  description: Target laser power in percent. Range depends on runtime minpower/maxpower.

- name: laser_min_power
  path: illumination.sources.laser.minpower
  type: integer
  read_only: true

- name: laser_max_power
  path: illumination.sources.laser.maxpower
  type: integer
  read_only: true

- name: dmx_mode
  path: dmx.mode
  type: string

- name: dmx_startchannel
  path: dmx.startchannel
  type: integer
  range: [1, 512]

- name: dmx_shutdown
  path: dmx.shutdown
  type: boolean

- name: standby_enable
  path: system.standby.enable
  type: boolean

- name: eco_enable
  path: system.eco.enable
  type: boolean

- name: window_position
  path: image.window.main.position
  type: object
  fields: [x:int, y:int]

- name: window_size
  path: image.window.main.size
  type: object
  fields: [width:int, height:int]

- name: lan_ip4config
  path: network.device.lan.ip4config
  type: object
  fields: [Address:string, Mask:string, Gateway:string, NameServers:string]
```

## Events
```yaml
- id: modelupdated
  description: Signal triggered when object structure changes (objects added or removed).
  notification_method: signal.callback

- id: property_changed
  description: Server-to-client notification delivering property/value pairs when subscribed property values change.
  notification_method: property.changed

- id: signal_callback
  description: Generic signal callback delivering an array of signal/argument-list pairs.
  notification_method: signal.callback

- id: introspect_objectchanged
  description: Signal exposed by the introspect object when an object is added or removed.
  args:
    object: string (object name)
    isnew: boolean
```

## Macros
```yaml
# UNRESOLVED: source does not describe explicit multi-step macros; macros are composed client-side from the JSON-RPC primitives above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, interlock procedures, or power-on sequencing requirements. The ECO-wake hint (verify state before issuing poweron/poweroff) is operational guidance, not a safety interlock.
```

## Notes
Document title is "RS232 and Network Command Catalog — Pulse API". Content describes the JSON-RPC 2.0 Pulse API used across Barco Pulse projectors (not specifically the Apx Audio Processor). The same command set applies to both TCP (port 9090) and RS-232 (19200 8N1) transports.

Object/method naming uses dot notation in lowercase (JavaScript-like). Position of params object keys does not matter; "id" is optional but recommended for matching requests to responses. Methods that return no value yield `result: null`, not an error.

Best practice: wait for the `property.set` confirmation before issuing another `property.set` on the same property to avoid flooding the server.

Authentication is optional and only required for elevated access (above normal end user). Normal end-user operation can proceed without an authenticate call.

API surface is dynamic — parts depend on installed peripherals (lens, DMX module, etc.). Use the `introspect` method to discover the exact API available on a given unit at runtime.

Warp file format matches the MCM500/400 projector family. Blend/black-level masks must match the resolution of the corresponding layer (e.g. WUXGA → 1920x1200, 4K → 1280x800).

ECO-mode wake-up: send ASCII `:POWR1\r` on RS-232, or use Wake-on-LAN (projector MAC), or remote/keypad power button.

<!-- UNRESOLVED: entity_id placeholder "barco_apx_audio_processor" was provided but the source document describes the Pulse projector API, not an audio processor. Audio-processor-specific commands (mixing, EQ, routing, levels, etc.) are not present in this source. -->

<!-- UNRESOLVED: source document is named for the Pulse API but the operator requested the Apx Audio Processor. Operator should confirm whether this protocol applies to the audio processor family or whether a different source document is required. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:58:39.847Z
last_checked_at: 2026-07-21T20:55:20.660Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:55:20.660Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions matched literally in source; transport parameters verified in RS232 section; spec comprehensively represents Pulse API. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document provided is titled \"RS232 and Network Command Catalog\" for the Pulse API, but the requested device is \"Barco Apx Audio Processor\". Treating the document as the authoritative protocol source; audio-processor-specific commands not present."
- "voltage/current/power specifications not stated in source"
- "fault recovery sequences not stated in source"
- "source describes optional passcode authentication (method \"authenticate\" with \"code\" param) for elevated access; normal end-user access skips it"
- "source does not describe explicit multi-step macros; macros are composed client-side from the JSON-RPC primitives above."
- "source does not document explicit safety warnings, interlock procedures, or power-on sequencing requirements. The ECO-wake hint (verify state before issuing poweron/poweroff) is operational guidance, not a safety interlock."
- "entity_id placeholder \"barco_apx_audio_processor\" was provided but the source document describes the Pulse projector API, not an audio processor. Audio-processor-specific commands (mixing, EQ, routing, levels, etc.) are not present in this source."
- "source document is named for the Pulse API but the operator requested the Apx Audio Processor. Operator should confirm whether this protocol applies to the audio processor family or whether a different source document is required."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
