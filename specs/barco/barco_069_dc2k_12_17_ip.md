---
spec_id: admin/barco-069-dc2k-12-17
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 069 Dc2K 12 17 Pulse API Control Spec"
manufacturer: Barco
model_family: "069 Dc2K 12 17"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "069 Dc2K 12 17"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:55:50.449Z
last_checked_at: 2026-07-21T20:25:44.722Z
generated_at: 2026-07-21T20:25:44.722Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility and full property/method catalogue are dynamic; source explicitly states introspection is required to discover the exact API for a specific configuration."
  - "no additional safety warnings, lockout procedures, or interlock sequences documented in source."
  - "firmware version compatibility not stated; DMX channel/mode specifics depend on projector configuration; exact list of properties/methods/signals visible at runtime requires introspection against the target device."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:25:44.722Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions matched in source with complete transport parameter documentation; dynamic API is acknowledged in source. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 069 Dc2K 12 17 Control Spec

## Summary

This spec covers the Pulse API control surface for the Barco 069 Dc2K 12 17 projector. The device exposes a JSON-RPC 2.0 service over both TCP (port 9090) and RS-232 (19200/8/N/1) with the same command set on both transports. Optional authentication uses a numeric pass code via `authenticate`.

<!-- UNRESOLVED: firmware version compatibility and full property/method catalogue are dynamic; source explicitly states introspection is required to discover the exact API for a specific configuration. -->

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
  type: passcode  # source describes authenticate method with numeric code param; normal end-user access skips auth
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff
- routable        # image.window.main.source selection across multiple connectors
- queryable       # property.get, environment.getcontrolblocks, etc.
- levelable       # illumination.sources.laser.power, brightness, contrast, gamma, saturation, sharpness
```

## Actions
```yaml
# JSON-RPC 2.0 over TCP port 9090 or RS-232 at 19200/8/N/1.
# Request shape: {"jsonrpc":"2.0","method":"<method>","params":{...},"id":<n>}
# All actions below use this transport; the command field shows the JSON-RPC payload verbatim.

# --- Authentication ---
- id: authenticate
  label: Authenticate session
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Numeric pass code; sets user access level
    - name: id
      type: integer
      description: Request identifier

# --- Power & state ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"property":"system.state"},"id":3}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"property":"system.state"},"id":4}'
  params: []

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: system_state_subscribe
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: system_standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":<n>}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable

- id: system_eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":<n>}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable

# --- Sources / routing ---
- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: One of the names returned by image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: image_window_main_source_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

- id: image_source_displayport1_listconnectors
  label: List Connectors Used by DisplayPort 1
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params: []
  # NOTE: source name -> object name rule: strip non-word chars, lowercase. Example given for DisplayPort 1 -> displayport1. Each source has its own listconnectors method (image.source.<objectname>.listconnectors).

- id: image_connector_displayport1_detectedsignal_get
  label: Get DisplayPort 1 Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}'
  params: []
  # Same naming rule applies for any connector; replace displayport1 with the lowercased connector name (e.g. l1hdmi, hdmi, sdi, hdbaset, dvi1, dvi2, displayport2).

- id: image_connector_l1hdmi_detectedsignal_get
  label: Get L1HDMI Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.l1hdmi.detectedsignal"},"id":<n>}'
  params: []

# --- Window geometry ---
- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":<n>}'
  params:
    - name: x
      type: integer
      description: Horizontal pixel position
    - name: y
      type: integer
      description: Vertical pixel position

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1080}},"id":<n>}'
  params:
    - name: width
      type: integer
      description: Window width in pixels
    - name: height
      type: integer
      description: Window height in pixels

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":<n>}'
  params:
    - name: value
      type: enum
      values: [Fill, OneToOne, FillScreen, Stretch]

# --- Picture settings ---
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized brightness/offset; range [-1, 1], precision 0.01, default 0

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":<n>}'
  params:
    - name: value
      type: float
      description: Normalized contrast/gain; range [0, 2], precision 0.01, default 1

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":<n>}'
  params:
    - name: value
      type: float
      description: Gamma exponent; range [1, 3], precision 0.1, default 2.2

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":<n>}'
  params:
    - name: value
      type: float
      description: Normalized saturation; range [0, 2], precision 0.01, default 1

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":<n>}'
  params:
    - name: value
      type: integer
      description: Sharpness; range [-2, 8], precision 1

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":<n>}'
  params:
    - name: value
      type: enum
      values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

# --- Illumination ---
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: illumination_sources_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: illumination_sources_laser_power_set
  label: Set Laser Power (%)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target laser power in percent

- id: illumination_sources_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: illumination_sources_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":<n>}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":<n>}'
  params: []

# --- Optics (shutter / lens) ---
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":<n>}'
  params: []

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"},"id":<n>}'
  params:
    - name: value
      type: enum
      values: [Open, Closed]

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":<n>}'
  params: []

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":<n>}'
  params: []

- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":<n>}'
  params: []

- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":<n>}'
  params: []

# --- Warp / blend / black level ---
- id: image_processing_warp_enable_set
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params:
    - name: value
      type: boolean

- id: image_processing_warp_file_enable_set
  label: Enable/Disable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename of an uploaded warp grid

- id: warp_file_upload
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to the warp grid file (XML)

- id: image_processing_blend_file_enable_set
  label: Enable/Disable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

- id: image_processing_blend_file_selected_set
  label: Select Blend File(s)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: array
      items: string
      description: One or more blend mask filenames

- id: blend_file_upload
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to blend mask (PNG/JPEG/TIFF, 8 or 16 bit grayscale)

- id: image_processing_blacklevel_file_enable_set
  label: Enable/Disable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: Filename of an uploaded black level mask

- id: blacklevel_file_upload
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to black level mask (PNG/JPEG/TIFF)

- id: warp_file_download
  label: Download Warp Grid (HTTP)
  kind: action
  command: 'http://<projector-ip>/api/image/processing/warp/file/transfer/warpgrid.xml'
  params: []
  # URL pattern http://<host>/api/image/processing/warp/file/transfer[ /<file> ]

# --- Color ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"},"id":<n>}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"},"id":<n>}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":<n>}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":<n>}'
  params: []

# --- Network ---
- id: network_device_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":<n>}'
  params: []

- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":<n>}'
  params: []

# --- DMX ---
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<mode>"},"id":<n>}'
  params:
    - name: value
      type: string
      description: Mode name from dmx.listmodes

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":<n>}'
  params:
    - name: value
      type: integer
      description: DMX start channel [1..512]

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true},"id":<n>}'
  params:
    - name: value
      type: boolean

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":<n>}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":<n>}'
  params: []

# --- Environment / alarms ---
- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":<n>}'
  params: []

- id: environment_getcontrolblocks_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params: []

- id: environment_getcontrolblocks_fans
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":19}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":<n>}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":<n>}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Versions/Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":<n>}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":<n>}'
  params: []

# --- Generic property helpers (apply to any property name) ---
- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<objectname.propertyname>"},"id":<n>}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness)

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      items: string

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<objectname.propertyname>","value":<value>},"id":<n>}'
  params:
    - name: property
      type: string
    - name: value
      type: any
      description: Type-appropriate for the property

- id: property_subscribe
  label: Subscribe to One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      items: string

- id: property_unsubscribe
  label: Unsubscribe from One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      items: string

# --- Signal subscription helpers ---
- id: signal_subscribe
  label: Subscribe to One Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      items: string

- id: signal_unsubscribe
  label: Unsubscribe from One Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array
      items: string

# --- LED control ---
- id: ledctl_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: Color name (e.g. red)
    - name: period
      type: integer
      description: Blink period

# --- Introspection ---
- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: If true, lists full metadata recursively

- id: introspect_positional
  label: Introspect (positional params)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

# --- ECO wake (RS-232 ASCII) ---
- id: serial_wake_from_eco
  label: Wake Projector from ECO Mode via RS-232
  kind: action
  command: ':POWR1\r'  # literal ASCII string sent on serial port
  params: []
  notes: |
    Send :POWR1\r as ASCII on the RS-232 port to wake from ECO mode.
    Alternative wake methods: Wake-on-LAN (MAC), remote control power button, keypad power button.

# --- HTTP file endpoints (URL templates) ---
- id: warp_file_download_default
  label: Download Default Warp Grid (browser/curl)
  kind: action
  command: 'curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer'
  params: []
  notes: |
    URL pattern: http://<host>/api/image/processing/warp/file/transfer[/<filename>]
    Without filename, projector's currently active warp grid is downloaded.

- id: blend_file_download
  label: Download Blend Mask
  kind: action
  command: 'http://<projector-ip>/api/image/processing/blend/file/transfer[ /<filename>]'
  params: []

- id: blacklevel_file_download
  label: Download Black Level Mask
  kind: action
  command: 'http://<projector-ip>/api/image/processing/blacklevel/file/transfer[ /<filename>]'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error, service]
  description: Returned by property.get on system.state

- id: illumination_state
  type: enum
  values: [On, Off]

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: firmware_status
  type: enum
  values: [Unknown, OK, Upgradable]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  precision: 0.01
  default: 0
  description: Normalized image brightness/offset

- id: image_contrast
  type: float
  range: [0, 2]
  precision: 0.01
  default: 1
  description: Normalized image contrast/gain

- id: image_gamma
  type: float
  range: [1, 3]
  precision: 0.1
  default: 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  precision: 0.01
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]
  precision: 1

- id: illumination_sources_laser_power
  type: integer
  description: Laser power in percent (range is dynamic; minpower/maxpower are read-only bounds)

- id: illumination_sources_laser_minpower
  type: integer
  access: read

- id: illumination_sources_laser_maxpower
  type: integer
  access: read

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: image_window_main_position
  type: object
  fields: {x: int, y: int}

- id: image_window_main_size
  type: object
  fields: {width: int, height: int}

- id: image_source
  type: string
  description: Source name; valid values come from image.source.list (varies by model)

- id: network_device_lan_ip4config
  type: object
  fields: {Address: string, Mask: string, Gateway: string, NameServers: string}
```

## Events
```yaml
- id: property_changed
  description: Server-initiated notification with no id; client must implement property.changed handler.
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "property.changed",
      "params": { "property": [ { "<objectname.propertyname>": <value> } ] }
    }

- id: signal_callback
  description: Server-initiated notification when subscribed signal fires; client must implement signal.callback handler.
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "signal.callback",
      "params": { "signal": [ { "<objectname.signalname>": { "arg1": <v>, "arg2": <v> } } ] }
    }

- id: introspect_objectchanged
  description: Callback payload via signal.callback when the model updates (objects added or removed).
  payload: |
    { "introspect.objectchanged": { "object": "<objectname>", "newobject": true|false } }
  notes: Subscribed via signal.subscribe with signal name "modelupdated".

- id: modelupdated_signal
  description: Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
- name: power_on_safe
  steps:
    - Get system.state
    - If state in [standby, ready], issue system.poweron
  notes: Source explicitly recommends verifying state before issuing power on to avoid no-op when in transition.

- name: power_off_safe
  steps:
    - Get system.state
    - If state == on, issue system.poweroff
  notes: Source explicitly recommends verifying state before issuing power off.

- name: select_source
  steps:
    - Call image.source.list to get valid names
    - Translate chosen source name to object name (strip non-word chars, lowercase)
    - Issue property.set on image.window.main.source with the chosen name

- name: subscribe_connector_signals
  steps:
    - Store source names and connector object names
    - Call image.source.list
    - Translate source names to object names
    - For each source: image.source.<objectname>.listconnectors
    - Translate connector names to object names
    - For each connector: subscribe to image.connector.<objectname>.detectedsignal

- name: upload_and_activate_warp
  steps:
    - curl -X POST -F file=@warp.xml http://<host>/api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected = "<warp.xml>"
    - property.set image.processing.warp.file.enable = true

- name: upload_and_activate_blend
  steps:
    - curl -X POST -F file=@mask.png http://<host>/api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected = "<mask.png>"
    - property.set image.processing.blend.file.enable = true

- name: upload_and_activate_blacklevel
  steps:
    - curl -X POST -F file=@blacklevel.png http://<host>/api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected = "<blacklevel.png>"
    - property.set image.processing.blacklevel.file.enable = true

- name: wake_from_eco
  steps:
    - On RS-232: send ASCII ":POWR1\r"
    # Alternative wake methods not part of API: Wake-on-LAN (MAC), remote power key, keypad power key.
```

## Safety
```yaml
confirmation_required_for:
  - system.poweron  # source recommends verifying state == standby or ready before issuing
  - system.poweroff  # source recommends verifying state == on before issuing
interlocks: []
# UNRESOLVED: no additional safety warnings, lockout procedures, or interlock sequences documented in source.
```

## Notes

- Naming rule for source/connector object names: strip non-word chars and lowercase the display name (e.g. "DisplayPort 1" -> `displayport1`, "L1HDMI" -> `l1hdmi`). Each source has its own `image.source.<objectname>.listconnectors` method, and each connector has a `image.connector.<objectname>.detectedsignal` property.
- Position- vs named-parameter equivalence: JSON-RPC `params` may be either an object (named) or a positional array; source documents both forms (e.g. introspect).
- Parameter ordering inside `params` object is irrelevant; named params only.
- `property.set` is fire-and-confirm; continuously setting the same property without waiting for the confirmation may flood the server and reduce performance — wait for the response before re-issuing.
- The API is partly dynamic and configuration-dependent (lens, illumination variant, DMX mode). Source explicitly says: "use introspection to discover the exact API of your projector."
- Supporting file upload formats for warp/blend/black-level: PNG (up to 16 bit), JPEG, TIFF; color images accepted but only the blue channel is used (gray-scale only).
- Blend mask resolution depends on projector resolution: WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540.
- HTTP file endpoint base path: `http://<host>/api/` followed by object-specific path (e.g. `/image/processing/warp/file/transfer`).
- Authentication: a numeric pass-code via `authenticate` raises access level above normal end-user; not required for normal operations.
- Source explicitly notes the documentation may be incomplete for a specific configuration; introspection is the authoritative discovery mechanism.

<!-- UNRESOLVED: firmware version compatibility not stated; DMX channel/mode specifics depend on projector configuration; exact list of properties/methods/signals visible at runtime requires introspection against the target device. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:55:50.449Z
last_checked_at: 2026-07-21T20:25:44.722Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:25:44.722Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions matched in source with complete transport parameter documentation; dynamic API is acknowledged in source. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility and full property/method catalogue are dynamic; source explicitly states introspection is required to discover the exact API for a specific configuration."
- "no additional safety warnings, lockout procedures, or interlock sequences documented in source."
- "firmware version compatibility not stated; DMX channel/mode specifics depend on projector configuration; exact list of properties/methods/signals visible at runtime requires introspection against the target device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
