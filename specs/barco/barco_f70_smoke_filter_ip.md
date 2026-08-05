---
spec_id: admin/barco-f70-smoke-filter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco F70 Smoke Filter Control Spec"
manufacturer: Barco
model_family: "F70 Smoke Filter"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "F70 Smoke Filter"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-30T18:03:01.241Z
last_checked_at: 2026-08-05T08:01:10.682Z
generated_at: 2026-08-05T08:01:10.682Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Pulse API catalog; model-specific property availability varies and should be confirmed via the `introspect` method on the actual device. Firmware version compatibility not stated."
  - "credential/pass-code format not published in source (example code 98765 is illustrative)."
  - "full per-sensor temperature/fan enumeration is dynamic; query via environment.getcontrolblocks."
  - "zoom/focus/lensshift value ranges not bounded in source."
  - "no explicit multi-step sequences are documented as named macros in source."
  - "no hardware interlock / lamp/laser safety procedures stated in source."
  - "model-specific source/connector list (source lists a superset incl. DVI, Dual DVI, Dual Head DVI, HDBaseT, SDI — availability varies)."
  - "firmware version compatibility ranges not stated."
  - "auth credential format / elevated access levels not specified beyond the example code."
  - "lens/optics value ranges and units not bounded in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:01:10.682Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions match JSON-RPC method names and property paths in source; transport params (port 9090, 19200 8N1) verbatim; coverage >0.9. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-30
---

# Barco F70 Smoke Filter Control Spec

## Summary
The Barco F70 Smoke Filter is a Pulse-architecture projector controlled via a JSON-RPC 2.0 API ("Pulse API"). Control is available over TCP/IP (port 9090) and over an RS-232 serial link (19200 baud, 8N1, no flow control). The API exposes power state, illumination/laser power, image (window/source/brightness/contrast/gamma/saturation/sharpness), warp/blend/black-level file handling, optics (shutter/zoom/focus/lens shift), DMX, environment sensors, and firmware management.

<!-- UNRESOLVED: source is a generic Pulse API catalog; model-specific property availability varies and should be confirmed via the `introspect` method on the actual device. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# JSON-RPC 2.0 framing over both transports (identical command set).
addressing:
  port: 9090  # TCP service port
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Pinout: 9-pin female host, 9-pin male projector; 2-2, 3-3, 5-5 (straight).
auth:
  # Optional: auth only required for elevated access levels.
  # Normal end-user access requires no authentication.
  type: optional  # inferred: auth procedure exists but skippable for end-user access
  # authenticate method: {"jsonrpc":"2.0","method":"authenticate","params":{"code":<secret>},"id":<n>}
  # Response: {"jsonrpc":"2.0","result":true,"id":<n>}
  # UNRESOLVED: credential/pass-code format not published in source (example code 98765 is illustrative).
```

## Traits
```yaml
traits:
  - powerable       # system.poweron / system.poweroff present
  - queryable       # property.get queries return values
  - routable        # image.window.main.source selection present
  - levelable       # brightness/contrast/gamma/saturation/sharpness/laser power present
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 request objects, verbatim per source.
# Responses omitted for brevity; source confirms result shapes per method.
actions:
  # --- System / power ---
  - id: system_poweron
    label: Power On
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: Result null (not an error). No-op if already on or transitioning. Verify system.state is standby/ready first.

  - id: system_poweroff
    label: Power Off
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: Result null. No-op if already off or transitioning. Verify system.state is on first.

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII sequence sent over RS-232 to wake a projector in ECO mode. Also wakeable via Wake-on-LAN (MAC), IR remote, or keypad.

  - id: authenticate
    label: Authenticate (Elevated Access)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":<secret>},"id":<n>}'
    params:
      - name: code
        type: integer
        description: Secret pass code setting the user access level.
    notes: Optional; only required for access levels above normal end user.

  # --- Source / window routing ---
  - id: select_source
    label: Set Active Source
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source>"}}'
    params:
      - name: source
        type: string
        description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI").

  - id: list_sources
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list"}'
    params: []
    notes: Returns array of source names; contents vary by model.

  - id: list_connectors
    label: List Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
    params: []
    notes: Returns array of physical connector names.

  - id: list_source_connectors
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.<sourceobj>.listconnectors"}'
    params:
      - name: sourceobj
        type: string
        description: Source object name (source name lowercased, non-word chars removed; e.g. "displayport1").

  # --- Illumination / laser ---
  - id: set_laser_power
    label: Set Laser Power
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<percent>}}'
    params:
      - name: percent
        type: float
        description: Target power in percent (range per minpower/maxpower).

  - id: engage_clo
    label: Engage CLO
    kind: action
    command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
    params: []
    notes: Engage Constant Light Output at the current light level.

  - id: laser_get_serial_number
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
    params: []

  # --- Picture settings (property.set pattern) ---
  - id: set_brightness
    label: Set Brightness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<value>}}'
    params:
      - name: value
        type: float
        description: Normalized offset, 0 default, range -1..1, precision 0.01.

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":<value>}}'
    params:
      - name: value
        type: float
        description: Normalized gain, 1 default, range 0..2, precision 0.01.

  - id: set_gamma
    label: Set Gamma
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":<value>}}'
    params:
      - name: value
        type: float
        description: Gamma, default 2.2, range 1..3, precision 0.1.

  - id: set_saturation
    label: Set Saturation
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":<value>}}'
    params:
      - name: value
        type: float
        description: Normalized, 1 default, range 0..2, precision 0.01.

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":<value>}}'
    params:
      - name: value
        type: integer
        description: Normalized, range -2..8, step 1.

  - id: set_window_position
    label: Set Window Position
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":<x>,"y":<y>}}}'
    params:
      - name: x
        type: integer
      - name: y
        type: integer

  - id: set_window_size
    label: Set Window Size
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":<w>,"height":<h>}}}'
    params:
      - name: width
        type: integer
      - name: height
        type: integer

  - id: set_scaling_mode
    label: Set Scaling Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"<mode>"}}'
    params:
      - name: mode
        type: string
        description: One of "Fill","OneToOne","FillScreen","Stretch".

  - id: set_orientation
    label: Set Image Orientation
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"<orientation>"}}'
    params:
      - name: orientation
        type: string
        description: One of "DESKTOP_FRONT","DESKTOP_REAR","CEILING_FRONT","CEILING_REAR".

  # --- Image color ---
  - id: copy_preset_to_custom
    label: Copy Preset to Custom (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"<name>"}}'
    params:
      - name: presetname
        type: string

  - id: reset_preset
    label: Reset Preset (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"<name>"}}'
    params:
      - name: presetname
        type: string

  - id: reset_to_native
    label: Reset to Native (P7)
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: next_rgb_mode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles through all possible RGB modes.

  # --- Warp ---
  - id: set_warp_enable
    label: Enable/Disable All Warp
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  - id: set_warp_file_enable
    label: Enable/Disable File Warp
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  - id: set_warp_file_selected
    label: Select Warp File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"}}'
    params:
      - name: filename
        type: string
        description: Warp grid file previously uploaded via HTTP POST.

  # --- Blend ---
  - id: set_blend_file_enable
    label: Enable/Disable File Blend
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  - id: set_blend_file_selected
    label: Select Blend File(s)
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["<file>"]}}'
    params:
      - name: files
        type: array
        description: Array of selected blend file names.

  # --- Black level ---
  - id: set_blacklevel_file_enable
    label: Enable/Disable Black Level Correction
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  - id: set_blacklevel_file_selected
    label: Select Black Level File
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"}}'
    params:
      - name: filename
        type: string

  # --- Optics ---
  - id: set_shutter_target
    label: Set Shutter Target
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"<target>"}}'
    params:
      - name: target
        type: string
        description: One of "Open","Closed".

  - id: set_standby_enable
    label: Enable/Disable Standby State
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  - id: set_eco_enable
    label: Enable/Disable ECO State
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":<bool>}}'
    params:
      - name: value
        type: boolean

  # --- DMX ---
  - id: dmx_listchannels
    label: DMX List Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
    params: []

  - id: dmx_listmodes
    label: DMX List Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
    params: []

  # --- Environment / firmware ---
  - id: get_control_blocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"<type>","valuetype":"<valuetype>"}}'
    params:
      - name: type
        type: string
        description: One of "Sensor","Filter","Controller","Actuator","Alarm","GenericBlock".
      - name: valuetype
        type: string
        description: One of "Temperature","Speed","PWM","Voltage","Current","Power","Altitude","Pressure","Humidity","ADC","Coordinate","Peltier","Waveform","Average","Delay","Difference","Interpolation","Limit","Median","Noise","Weighting","Comparison","Threshold","Formula","Driver","PID","Mode","State","Pump","Resistance","Simulation","Constant","Manual","Range","Any".
    notes: Returns dict of sensor-name -> reading.

  - id: get_alarm_info
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []
    notes: Returns array of {severity,timestamp,source,description,custommessage}.

  - id: firmware_list_components
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
    params: []

  - id: firmware_list_version_status
    label: List Firmware Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []
    notes: Returns array of {name,versions:{available,running},status} where status is "Unknown"|"OK"|"Upgradable".

  - id: firmware_schedule_upgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces a component upgrade at next reboot.

  # --- Introspection ---
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<obj>","recursive":<bool>}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty introspects everything.
      - name: recursive
        type: boolean
        description: If false, only one level of object names is listed.
    notes: Returns metadata restricted by authenticated access level. Best way to discover the exact API of a specific projector/config.

  # --- Subscription management ---
  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<prop>"}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names.
    notes: Returns true. Notifications delivered via property.changed.

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<prop>"}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names.

  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<signal>"}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names.

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<signal>"}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names.

  # --- File transfer (HTTP endpoints) ---
  # Upload/download via HTTP, not JSON-RPC. Documented base path: http://<projector-ip>/api/<endpoint>
  # Warp:     /api/image/processing/warp/file/transfer
  # Blend:    /api/image/processing/blend/file/transfer
  # Blacklvl: /api/image/processing/blacklevel/file/transfer
```

## Feedbacks
```yaml
# Observable state via property.get and property.changed notifications.
feedbacks:
  - id: system_state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "deconditioning", "service", "error"]
    property: system.state

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state

  - id: laser_power
    type: number
    property: illumination.sources.laser.power

  - id: active_source
    type: string
    property: image.window.main.source

  - id: alarm_state
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    property: environment.alarmstate

  - id: network_state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    property: network.device.lan.state

  - id: shutter_position
    type: enum
    values: ["Open", "Closed"]
    property: optics.shutter.position

  - id: detected_signal
    type: object
    property: image.connector.<name>.detectedsignal
    notes: Contains active,name,resolution,totals,porch,sync,frequencies,pixel_rate,scan,bits_per_component,color_space,signal_range,chroma_sampling,gamma_type,color_primaries,mastering_luminance,content_aspect_ratio,is_stereo,stereo_mode.
  # UNRESOLVED: full per-sensor temperature/fan enumeration is dynamic; query via environment.getcontrolblocks.
```

## Variables
```yaml
# Settable scalar properties (parameterized via property.set; see Actions for setters).
variables:
  - id: laser_power_level
    property: illumination.sources.laser.power
    type: float
    unit: percent
    min_source: illumination.sources.laser.minpower  # dynamic
    max_source: illumination.sources.laser.maxpower  # dynamic

  - id: brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    precision: 0.01

  - id: contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    precision: 0.01

  - id: gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    precision: 0.1

  - id: saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    precision: 0.01

  - id: sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8

  - id: zoom_position
    property: optics.zoom.position
    type: integer

  - id: focus_position
    property: optics.focus.position
    type: integer

  - id: lensshift_horizontal
    property: optics.lensshift.horizontal.position
    type: integer

  - id: lensshift_vertical
    property: optics.lensshift.vertical.position
    type: integer

  - id: dmx_mode
    property: dmx.mode
    type: string

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
  # UNRESOLVED: zoom/focus/lensshift value ranges not bounded in source.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id; client must not respond).
events:
  - id: property_changed
    method: property.changed
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<name>":<value>}]}}'
    notes: Delivered on any subscribed property change. Two notifications may fire for a source switch (deselect then select).

  - id: signal_callback
    method: signal.callback
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<name>":{"<arg>":<value>}}]}}'
    notes: Delivered when a subscribed signal is emitted.

  - id: modelupdated
    method: via signal.callback for "modelupdated" / "introspect.objectchanged"
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"<name>","newobject":<bool>}}]}}'
    notes: Fires when objects are added/removed. Subscribe via signal.subscribe "modelupdated".
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences are documented as named macros in source.
# (Power-on guard pattern is recommended in prose: verify system.state before poweron/poweroff.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source recommends verifying system.state before poweron (expect standby/ready) and before
# poweroff (expect on); issuing during transitions is a no-op. No explicit safety interlocks,
# power-sequencing requirements, or warnings are documented.
# UNRESOLVED: no hardware interlock / lamp/laser safety procedures stated in source.
```

## Notes
- The API is JSON-RPC 2.0; the same command set works over TCP/IP (port 9090) and RS-232. Parameter order in `params` objects does not matter.
- Best practice: wait for the `property.set` confirmation before re-setting the same property (flooding degrades performance).
- Subscriptions deliver change notifications only; to read the current value use `property.get`.
- File endpoints (warp/blend/blacklevel masks) use HTTP POST (`curl -F file=@<file> http://<ip>/api/<endpoint>`) for upload and GET for download. Supported image formats: PNG (up to 16-bit), JPEG, TIFF; grayscale only (blue channel used for RGB-saved grayscale).
- ECO wake options: Wake-on-LAN (MAC address), IR remote power key, keypad power key, or RS-232 ASCII `:POWR1\r`.
- The documented API is partly dynamic: actual property availability depends on projector model and connected peripherals (e.g. motorized lens, DMX extended mode). Use `introspect` to discover the exact API of a specific unit.

<!-- UNRESOLVED: model-specific source/connector list (source lists a superset incl. DVI, Dual DVI, Dual Head DVI, HDBaseT, SDI — availability varies). -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: auth credential format / elevated access levels not specified beyond the example code. -->
<!-- UNRESOLVED: lens/optics value ranges and units not bounded in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-30T18:03:01.241Z
last_checked_at: 2026-08-05T08:01:10.682Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:01:10.682Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions match JSON-RPC method names and property paths in source; transport params (port 9090, 19200 8N1) verbatim; coverage >0.9. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Pulse API catalog; model-specific property availability varies and should be confirmed via the `introspect` method on the actual device. Firmware version compatibility not stated."
- "credential/pass-code format not published in source (example code 98765 is illustrative)."
- "full per-sensor temperature/fan enumeration is dynamic; query via environment.getcontrolblocks."
- "zoom/focus/lensshift value ranges not bounded in source."
- "no explicit multi-step sequences are documented as named macros in source."
- "no hardware interlock / lamp/laser safety procedures stated in source."
- "model-specific source/connector list (source lists a superset incl. DVI, Dual DVI, Dual Head DVI, HDBaseT, SDI — availability varies)."
- "firmware version compatibility ranges not stated."
- "auth credential format / elevated access levels not specified beyond the example code."
- "lens/optics value ranges and units not bounded in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
