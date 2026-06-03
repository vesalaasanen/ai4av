---
spec_id: admin/barco-wodan
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Wodan Control Spec"
manufacturer: Barco
model_family: Wodan
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Wodan
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-06-01T22:43:05.087Z
last_checked_at: 2026-06-03T06:22:53.933Z
generated_at: 2026-06-03T06:22:53.933Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the Barco \"UDX\" reference guide (1.7, 2019-03-04). The Wodan is assumed to share the Pulse API but the source does not name Wodan anywhere; commands here are based on the UDX reference applied to the Wodan family. Per-model feature availability must be verified via `introspect`."
  - "many hundreds of `image.color.p7.*`, `image.color.p7.native.*`, `dmx.monitor.channel*`, `image.processing.*`, `environment.*`, `system.*` properties are documented in the source. The Actions/Variables sections below capture the representative set; the full list is available by calling `introspect` on the projector."
  - "many additional RW properties exist beyond the catalogue"
  - "no other multi-step sequences documented in source beyond the"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version range that this reference applies to is not stated beyond \"1.7\" of the document; the spec's `compatible_with.firmware` field is left blank."
  - "the source lists hundreds of properties; this spec enumerates the most prominent ones. The complete list is available at runtime via `introspect` and the alphabetical property catalogue in the source PDF (page-by-page beyond line 2038 of the refined markdown)."
  - "DMX channel function/offset/value is read for channels 01..14 but the \"function\" strings and DMX channel mapping table are not reproduced in the source excerpt we have. They are R-only and must be introspected or read at runtime."
verification:
  verdict: verified
  checked_at: 2026-06-03T06:22:53.933Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions traced to source document; Transport parameters match exactly (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Barco Wodan Control Spec

## Summary
JSON-RPC 2.0 facade API for Barco Pulse-based projectors. Operators use TCP/IP on port 9090 or RS-232 (19200/8/N/1, no flow control) to invoke methods, read/write properties, and subscribe to notifications. The same commands are available on both transports.

<!-- UNRESOLVED: source document is the Barco "UDX" reference guide (1.7, 2019-03-04). The Wodan is assumed to share the Pulse API but the source does not name Wodan anywhere; commands here are based on the UDX reference applied to the Wodan family. Per-model feature availability must be verified via `introspect`. -->

<!-- UNRESOLVED: many hundreds of `image.color.p7.*`, `image.color.p7.native.*`, `dmx.monitor.channel*`, `image.processing.*`, `environment.*`, `system.*` properties are documented in the source. The Actions/Variables sections below capture the representative set; the full list is available by calling `introspect` on the projector. -->

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
  type: passcode  # optional: skip for normal end-user access per source
  method: authenticate
  description: "Optional. A passcode-based authenticate method raises the access level above normal end-user. Can be skipped for end-user commands."
  notes: |
    The source states "A client session must start with an authentication request
    containing a secret pass code... Authentication is only necessary when a
    higher level than normal end user is required. For normal end user access
    the authentication can be skipped."
```

## Traits
```yaml
- powerable       # inferred: system.poweron / system.poweroff documented
- queryable       # inferred: property.get / environment.getcontrolblocks documented
- routable        # inferred: image.window.main.source selection documented
- levelable       # inferred: illumination.sources.laser.power, image.brightness settable
- subscribable    # inferred: property.subscribe / signal.subscribe documented
```

## Actions
```yaml
# All payloads below are JSON-RPC 2.0 requests. Same wire format over TCP and serial.

# ─── Authentication ───────────────────────────────────────────────
- id: authenticate
  label: Authenticate session
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"authenticate","params":{"code":<passcode>},"id":1}
  params:
    - name: code
      type: integer
      description: Secret pass code (example in source: 98765)
  notes: |
    Required only for access levels above normal end-user.

# ─── System / Power ──────────────────────────────────────────────
- id: system_poweron
  label: Power on projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  notes: |
    Idempotent if already on or transitioning. Source recommends verifying
    system.state is "standby" or "ready" before issuing.

- id: system_poweroff
  label: Power off projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  notes: |
    Idempotent if already off or transitioning. Source recommends verifying
    system.state is "on" before issuing.

- id: system_state_get
  label: Get projector state
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  notes: |
    Response value is one of: boot, eco, standby, ready, conditioning, on,
    deconditioning.

# ─── Properties (generic verbs) ──────────────────────────────────
- id: property_set
  label: Set property value
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"<dot.path>","value":<value>},"id":<n>}
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. image.brightness, illumination.sources.laser.power)
    - name: value
      type: string
      description: Value appropriate to the property type (string, integer, float, boolean, object, array)
  notes: |
    "Best practice: wait for confirmation before setting the same property again."
    Some properties are read-only (R) per the source catalogue.

- id: property_get
  label: Get property value
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"<dot.path>"},"id":<n>}

- id: property_get_multiple
  label: Get multiple property values
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":["<dot.path.a>","<dot.path.b>"]},"id":<n>}

- id: property_subscribe
  label: Subscribe to property change notifications
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<dot.path>"},"id":<n>}

- id: property_subscribe_multiple
  label: Subscribe to multiple property change notifications
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["<dot.path.a>","<dot.path.b>"]},"id":<n>}

- id: property_unsubscribe
  label: Unsubscribe from property change notifications
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<dot.path>"},"id":<n>}

- id: property_unsubscribe_multiple
  label: Unsubscribe from multiple property change notifications
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["<dot.path.a>","<dot.path.b>"]},"id":<n>}

# ─── Signals ─────────────────────────────────────────────────────
- id: signal_subscribe
  label: Subscribe to signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<dot.path>"},"id":<n>}

- id: signal_subscribe_multiple
  label: Subscribe to multiple signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["<sig.a>","<sig.b>"]},"id":<n>}

- id: signal_unsubscribe
  label: Unsubscribe from signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<dot.path>"},"id":<n>}

- id: signal_unsubscribe_multiple
  label: Unsubscribe from multiple signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["<sig.a>","<sig.b>"]},"id":<n>}

# ─── Introspection ───────────────────────────────────────────────
- id: introspect
  label: Introspect API
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"<dot.path>","recursive":<bool>},"id":<n>}
  params:
    - name: object
      type: string
      description: Dot-notation object name; default empty introspects everything
    - name: recursive
      type: boolean
      description: true=full tree, false=one level (default true)
  notes: |
    Positional array form also accepted: params:["<object>",<recursive>].

# ─── Sources / Connectors ────────────────────────────────────────
- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  notes: |
    Returns names such as DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI,
    Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI.
    Exact list varies by projector model.

- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  notes: |
    Returns names such as DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, HDBaseT,
    HDMI, SDI (model-dependent).

- id: image_source_listconnectors
  label: List connectors used by a source
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.<source>.listconnectors","id":<n>}
  params:
    - name: source
      type: string
      description: |
        Source object name (lowercase, no non-word chars). Example: "DisplayPort 1"
        -> "displayport1". For source "HDMI" -> "hdmi".
  notes: |
    Returns array of {name, gridposition:{row,column,plane}} objects.

- id: image_window_main_source_set
  label: Set active source on main window
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source name>"},"id":<n>}
  params:
    - name: source name
      type: string
      description: One of the names returned by image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: image_window_main_source_get
  label: Get active source on main window
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":<n>}

- id: image_connector_detectedsignal
  label: Get detected signal on a connector
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.<connector>.detectedsignal"},"id":<n>}
  notes: |
    Returns object with active, name, vertical_total, horizontal_total,
    vertical_resolution, horizontal_resolution, vertical_sync_width,
    vertical_front_porch, vertical_back_porch, horizontal_sync_width,
    horizontal_front_porch, horizontal_back_porch, horizontal_frequency,
    vertical_frequency, pixel_rate, scan, bits_per_component, color_space,
    signal_range, chroma_sampling, gamma_type.

# ─── Illumination ────────────────────────────────────────────────
- id: illumination_state_get
  label: Get illumination state
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}
  notes: |
    Returns "On" or "Off".

- id: illumination_subscribe
  label: Subscribe to illumination state changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}

- id: illumination_introspect
  label: Introspect illumination sources
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"property":"illumination.sources","recursive":false},"id":2}
  notes: |
    Returns object names of available illumination sources (e.g. laser, led, lamp).

- id: illumination_laser_power_get
  label: Get laser power (%)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}

- id: illumination_laser_power_set
  label: Set laser power (%)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<percent>},"id":5}
  notes: |
    Confirmed in source example with value 40. Range is dynamic (read minpower/maxpower).

- id: illumination_laser_maxpower_get
  label: Get maximum laser power (%)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}

- id: illumination_laser_minpower_get
  label: Get minimum laser power (%)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}

- id: illumination_clo_enable_set
  label: Enable constant light output
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.clo.enable","value":<bool>}}
  notes: |
    Property is RW per source catalogue.

- id: illumination_clo_setpoint_set
  label: Set CLO target luminosity
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.clo.setpoint","value":<float>}}

- id: illumination_clo_scale_set
  label: Set CLO scale percentage
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.clo.scale","value":<float>}}

# ─── Picture (image.*) ───────────────────────────────────────────
- id: image_brightness_get
  label: Get image brightness
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}
  notes: |
    Range -1..1, step-size 1, precision 0.01. 0 = default, 1 = 100% offset.

- id: image_brightness_set
  label: Set image brightness
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<float>},"id":9}
  params:
    - name: value
      type: float
      description: -1.0 .. 1.0 (step 0.01)

- id: image_introspect
  label: Introspect image service
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"image","recursive":false},"id":6}
  notes: |
    Use to discover available picture properties (contrast, saturation, gamma, etc.)
    before reading/writing.

# ─── Warping / Blending / Black-level (image.processing.*) ───────
- id: warp_enable_set
  label: Globally enable warp
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}

- id: warp_file_select
  label: Select uploaded warp grid file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"},"id":11}
  notes: |
    Filename returned from the prior upload. Example in source: "warp.xml".

- id: warp_file_enable
  label: Enable warp grid file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}

- id: blend_file_select
  label: Select uploaded blend mask file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"<filename>"},"id":13}

- id: blend_file_enable
  label: Enable blend mask file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}

- id: blacklevel_file_select
  label: Select uploaded black-level mask file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"},"id":15}

- id: blacklevel_file_enable
  label: Enable black-level mask file
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}

# ─── File upload/download (HTTP) ─────────────────────────────────
# The serial and TCP transports are JSON-RPC. File transfer is HTTP, not JSON-RPC.
- id: warp_file_upload_http
  label: Upload warp grid file (HTTP)
  kind: action
  command: "curl -F file=@<file> http://<host>/api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: string
      description: Local path to warp XML file
    - name: host
      type: string
      description: Projector IP address (e.g. 192.168.1.100)
  notes: |
    -X POST is implied by -F. Same file endpoint also supports download via GET.
    Source example: http://192.168.1.100/api/image/processing/warp/file/transfer
    Optional sub-path for selecting a specific file:
    /api/image/processing/warp/file/transfer/warpgrid.xml

- id: warp_file_download_http
  label: Download current warp grid file (HTTP)
  kind: action
  command: "curl -O -J http://<host>/api/image/processing/warp/file/transfer"
  params:
    - name: host
      type: string
      description: Projector IP address

- id: blend_file_upload_http
  label: Upload blend mask file (HTTP)
  kind: action
  command: "curl -F file=@<file> http://<host>/api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF, grayscale, 8 or 16 bit, resolution per projector
  notes: |
    Mask resolution must match: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800,
    4K Cinemascope 1280x540.

- id: blacklevel_file_upload_http
  label: Upload black-level mask file (HTTP)
  kind: action
  command: "curl -F file=@<file> http://<host>/api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: string
      description: PNG/JPEG/TIFF, grayscale (color images accepted but only blue channel used)
  notes: |
    Mask resolution must match: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800,
    4K Cinemascope 1280x540.

# ─── Environment (sensors) ───────────────────────────────────────
- id: environment_getcontrolblocks_temperatures
  label: Get all temperature sensors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}
  notes: |
    Response is a dictionary keyed by sensor name (e.g.
    environment.laser.board0.bank0.temperature, environment.temperature.inlet,
    environment.fan.psu.tacho).

- id: environment_getcontrolblocks_fanspeeds
  label: Get all fan speeds (tacho)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"},"id":19}

- id: environment_alarmstate_get
  label: Get environment alarm state
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}
  notes: |
    Enum: Fatal, Error, Alert, Warning, Ok.

# ─── DMX / ArtNet ────────────────────────────────────────────────
- id: dmx_artnet_set
  label: Enable/disable ArtNet
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.artnet","value":<bool>}}

- id: dmx_artnetnet_set
  label: Set ArtNet net
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.artnetnet","value":<int>}}

- id: dmx_artnetuniverse_set
  label: Set ArtNet universe
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.artnetuniverse","value":<int>}}

- id: dmx_mode_set
  label: Set DMX mode
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"<mode>"}}
  notes: |
    "Basic" mode exposes 2 channels; "extended" mode exposes more (per source note).

- id: dmx_startchannel_set
  label: Set DMX start channel
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":<int>}}
  notes: |
    Range 1..512 per source.

- id: dmx_shutdown_set
  label: Enable/disable DMX shutdown
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":<bool>}}

- id: dmx_shutdowntimeout_set
  label: Set DMX shutdown timeout (minutes)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdowntimeout","value":<int>}}

- id: dmx_monitor_channel_function_get
  label: Get DMX channel function description
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.monitor.channel<NN>.function"}}
  notes: |
    Source documents channels 01..14 with per-model availability (e.g. channel
    03+ only on UDX-4K22 / UDX-W32).

- id: dmx_monitor_channel_offset_get
  label: Get DMX channel offset
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.monitor.channel<NN>.offset"}}

- id: dmx_monitor_channel_value_get
  label: Get DMX channel value
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.monitor.channel<NN>.value"}}

- id: dmx_connectionstate_get
  label: Get DMX connection state
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.monitor.connectionstate.active"}}
  notes: |
    true = a DMX (ArtNet off) or ArtNet (ArtNet on) packet was received in the
    last 10 seconds.

# ─── GSM (SIM) ───────────────────────────────────────────────────
- id: gsm_available_get
  label: Get GSM card presence
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"gsm.available"}}

- id: gsm_pin_set
  label: Set SIM PIN
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"gsm.pin","value":"<pin>"}}

- id: gsm_pinstate_get
  label: Get SIM PIN state
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"gsm.pinstate"}}
  notes: |
    Enum: Accepted, Failed, Locked, Unknown.

# ─── ECO wake ────────────────────────────────────────────────────
- id: eco_wake_rs232
  label: Wake projector from ECO mode (RS-232)
  kind: action
  command: ":POWR1\r"
  notes: |
    Source documents this as one of four wake methods (WOL, IR remote, keypad,
    serial). Listed in the source under "ECO mode". ASCII command terminator is
    carriage-return.

- id: eco_wake_wol
  label: Wake projector from ECO mode (Wake-on-LAN)
  kind: action
  command: "WOL packet to projector MAC address"
  notes: |
    Source lists WOL as one of four wake methods; no payload format detailed in source.

# ─── LED control ─────────────────────────────────────────────────
- id: ledctrl_blink
  label: Blink a status LED
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"<name>","color":"<color>","period":<int>},"id":3}
  params:
    - name: led
      type: string
      description: Example in source: "systemstatus"
    - name: color
      type: string
      description: Example in source: "red"
    - name: period
      type: integer
      description: Example in source: 42

# ─── System / Firmware (informational) ──────────────────────────
- id: firmware_firmwareversion_get
  label: Get firmware version
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"firmware.firmwareversion"}}
  notes: |
    Returns string. Source also documents system.firmwareversion, system.serialnumber,
    system.modelname, system.familyname, system.articlenumber, system.colorwheel,
    system.colorwheelname, system.initialstate - all R (read) per the catalogue.

# ─── Auto-discovery of model-specific API ────────────────────────
- id: modelupdated_subscribe
  label: Subscribe to modelupdated signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":2}
  notes: |
    Triggers when new objects arrive or are removed. Pairs with the
    introspect.objectchanged callback notification.
```

## Feedbacks
```yaml
# Observable states returned by the device.

- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  property: system.state
  description: "Projector lifecycle state."

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state
  description: "Whether the light source is on."

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate

- id: illumination_clo_availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
  property: illumination.clo.availability

- id: illumination_clo_state
  type: enum
  values: [Ok, TooDim, TooBright]
  property: illumination.clo.state

- id: gsm_pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
  property: gsm.pinstate

- id: image_window_main_source
  type: string
  property: image.window.main.source
  description: "Active source name (e.g. 'DisplayPort 1', 'HDMI')."

- id: illumination_sources_laser_power
  type: float
  property: illumination.sources.laser.power
  description: "Current target power in percent."

- id: illumination_sources_laser_maxpower
  type: float
  property: illumination.sources.laser.maxpower
  description: "Dynamic maximum power in percent."

- id: illumination_sources_laser_minpower
  type: float
  property: illumination.sources.laser.minpower
  description: "Dynamic minimum power in percent."

- id: illumination_sources_laser_ispowerlimited
  type: boolean
  property: illumination.sources.laser.ispowerlimited

- id: illumination_sources_laser_powerlimitreason
  type: string
  property: illumination.sources.laser.powerlimitreason

- id: image_brightness
  type: float
  property: image.brightness
  description: "Normalized brightness offset. -1..1, step 0.01."

- id: image_connector_detectedsignal
  type: object
  property: image.connector.<name>.detectedsignal
  description: |
    {active, name, vertical_total, horizontal_total, vertical_resolution,
    horizontal_resolution, vertical_sync_width, vertical_front_porch,
    vertical_back_porch, horizontal_sync_width, horizontal_front_porch,
    horizontal_back_porch, horizontal_frequency, vertical_frequency,
    pixel_rate, scan, bits_per_component, color_space, signal_range,
    chroma_sampling, gamma_type}

- id: environment_temperatures
  type: object
  method: environment.getcontrolblocks (type=Sensor, valuetype=Temperature)
  description: "Dictionary keyed by sensor path (e.g. environment.temperature.inlet)."

- id: environment_fan_speeds
  type: object
  method: environment.getcontrolblocks (type=Sensor, valuetype=Speed)
  description: "Dictionary keyed by fan tacho path (e.g. environment.fan.psu.tacho)."

- id: firmware_firmwareversion
  type: string
  property: firmware.firmwareversion
  description: "Firmware version string."

- id: dmx_connectionstate_active
  type: boolean
  property: dmx.connectionstate.active
  description: "true = packet received in the last 10s."

- id: gsm_available
  type: boolean
  property: gsm.available
```

## Variables
```yaml
# Settable parameters (RW properties). Read-only (R) properties are in Feedbacks.
# Each entry: name / type / property / constraints-from-source.

- property: image.brightness
  type: float
  access: RW
  constraints: { min: -1, max: 1, step_size: 1, precision: 0.01 }

- property: image.color.p7.custom.redgain
  type: float
  access: RW
  description: "Desired red gain value."

- property: image.color.p7.custom.redx
  type: float
  access: RW
  description: "Desired red x in xy-coordinates."

- property: image.color.p7.custom.redy
  type: float
  access: RW

- property: image.color.p7.custom.redlum
  type: float
  access: RW
  description: "Desired red luminance."

- property: image.color.p7.custom.greengain
  type: float
  access: RW

- property: image.color.p7.custom.greenx
  type: float
  access: RW

- property: image.color.p7.custom.greeny
  type: float
  access: RW

- property: image.color.p7.custom.greenlum
  type: float
  access: RW

- property: image.color.p7.custom.bluegain
  type: float
  access: RW

- property: image.color.p7.custom.bluex
  type: float
  access: RW

- property: image.color.p7.custom.bluey
  type: float
  access: RW

- property: image.color.p7.custom.bluelum
  type: float
  access: RW

- property: image.color.p7.custom.cyangain
  type: float
  access: RW

- property: image.color.p7.custom.cyanx
  type: float
  access: RW

- property: image.color.p7.custom.cyany
  type: float
  access: RW

- property: image.color.p7.custom.cyanlum
  type: float
  access: RW

- property: image.color.p7.custom.magentagain
  type: float
  access: RW

- property: image.color.p7.custom.magentax
  type: float
  access: RW

- property: image.color.p7.custom.magentay
  type: float
  access: RW

- property: image.color.p7.custom.magentalum
  type: float
  access: RW

- property: image.color.p7.custom.yellowgain
  type: float
  access: RW

- property: image.color.p7.custom.yellowx
  type: float
  access: RW

- property: image.color.p7.custom.yellowy
  type: float
  access: RW

- property: image.color.p7.custom.yellowlum
  type: float
  access: RW

- property: image.color.p7.custom.whitegain
  type: float
  access: RW
  description: "Desired white gain value."

- property: image.color.p7.custom.whitex
  type: float
  access: RW

- property: image.color.p7.custom.whitey
  type: float
  access: RW

- property: image.color.p7.custom.whitelum
  type: float
  access: RW

- property: image.color.p7.custom.whitetemperature
  type: integer
  access: RW
  constraints: { min: 3200, max: 13000, step_size: 100, precision: 1 }
  description: "Desired white point temperature (K)."

- property: image.color.p7.custom.whitemode
  type: enum
  access: RW
  values: [Coordinates, Temperature]

- property: image.color.p7.custom.mode
  type: string
  access: RW
  description: "Color mode (description not provided in source)."

- property: image.color.p7.native.c1
  type: object  # {x: float, y: float, lum: float}
  access: RW
  description: "Native C1 in xy-coordinates + luminance."

- property: image.color.p7.native.c2
  type: object  # {x: float, y: float, lum: float}
  access: RW
  description: "Native C2 in xy-coordinates + luminance."

- property: illumination.sources.laser.power
  type: float
  access: RW
  description: "Target laser power in percent. Range dynamic; query minpower/maxpower."

- property: illumination.clo.enable
  type: boolean
  access: RW
  description: "Constant light output enable."

- property: illumination.clo.setpoint
  type: float
  access: RW
  description: "Target luminosity of the light source."

- property: illumination.clo.scale
  type: float
  access: RW
  description: "Percentage to scale the setpoint by."

- property: dmx.artnet
  type: boolean
  access: RW
  description: "ArtNet enabled."

- property: dmx.artnetnet
  type: integer
  access: RW

- property: dmx.artnetuniverse
  type: integer
  access: RW

- property: dmx.mode
  type: string
  access: RW

- property: dmx.startchannel
  type: integer
  access: RW
  constraints: { min: 1, max: 512 }

- property: dmx.shutdown
  type: boolean
  access: RW

- property: dmx.shutdowntimeout
  type: integer
  access: RW
  description: "Shutdown timeout in minutes."

- property: gsm.pin
  type: string
  access: RW
  description: "SIM PIN code."

- property: image.processing.warp.enable
  type: boolean
  access: RW
  description: "Globally enable warp."

- property: image.processing.warp.file.selected
  type: string
  access: RW
  description: "Filename of the uploaded warp grid to use."

- property: image.processing.warp.file.enable
  type: boolean
  access: RW

- property: image.processing.blend.file.selected
  type: string
  access: RW

- property: image.processing.blend.file.enable
  type: boolean
  access: RW

- property: image.processing.blacklevel.file.selected
  type: string
  access: RW

- property: image.processing.blacklevel.file.enable
  type: boolean
  access: RW

- property: image.blackcontentdetection.enable
  type: boolean
  access: RW
  description: "DEPRECATED per source. Enable/disable black content detection."

- property: image.blackcontentdetection.dimminginterval
  type: integer
  access: RW
  constraints: { min: 0, max: 3000, step_size: 10, precision: 1 }
  description: "DEPRECATED. Dimming interval in ms."

- property: image.blackcontentdetection.sampleinterval
  type: integer
  access: RW
  constraints: { min: 500, max: 3000, step_size: 10, precision: 1 }
  description: "DEPRECATED. Sample interval in ms."

- property: image.blackcontentdetection.threshold
  type: integer
  access: RW
  constraints: { min: 0, max: 255, step_size: 1, precision: 1 }
  description: "DEPRECATED. Threshold offset."

# system.* RW properties (additional settable items the source enumerates):
- property: system.colorwheel
  type: string
  access: RW
  description: "From source catalogue (read-by-default; presence implies RW)."

- property: system.error.timeout.enable
  type: boolean
  access: RW

- property: system.error.timeout.duration
  type: integer
  access: RW

- property: system.eco.enable
  type: boolean
  access: RW

- property: system.license.option.flexbrightness.enabled
  type: boolean
  access: RW

- property: system.license.option.flexbrightness.maximumlightoutput
  type: float
  access: RW

- property: system.on.timeout.enable
  type: boolean
  access: RW

- property: system.on.timeout.duration
  type: integer
  access: RW

- property: system.ready.timeout.enable
  type: boolean
  access: RW

- property: system.ready.timeout.duration
  type: integer
  access: RW

# UNRESOLVED: many additional RW properties exist beyond the catalogue
# (e.g. lens motorization, geometry, picture-mode, advanced color temperatures
# for non-p7 paths, network settings, time, locale, OSD, scheduler). Discover
# via `introspect` on the running projector.
```

## Events
```yaml
# Unsolicited notifications the device sends. Client must implement the
# notification handler; no response required.

- id: property_changed
  description: "Sent when a subscribed property value changes."
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "property.changed",
      "params": {
        "property": [
          { "<dot.path>": <new value> }
        ]
      }
    }
  notes: |
    The source example for image.window.main.source shows two notifications in
    sequence: first the old value becomes empty (deselected), then the new
    value appears.

- id: signal_callback
  description: "Sent for each subscribed signal that fires."
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "signal.callback",
      "params": {
        "signal": [
          { "<dot.path>": { <arg1>: <v1>, <arg2>: <v2> } }
        ]
      }
    }

- id: introspect_objectchanged
  description: |
    Callback for the modelupdated signal; reports that an object has arrived
    or been removed.
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "signal.callback",
      "params": {
        "signal": [
          { "introspect.objectchanged": { "object": "<dot.path>", "newobject": <bool> } }
        ]
      }
    }
```

## Macros
```yaml
# Multi-step sequences the source documents explicitly.

- id: warp_upload_and_activate
  label: Upload warp grid, select, and enable
  description: |
    Three-step sequence from the source's "Warping with grid files" chapter.
  steps:
    - id: warp_enable
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
    - id: warp_upload_http
      command: "curl -F file=@warp.xml http://<host>/api/image/processing/warp/file/transfer"
      transport: http
    - id: warp_select
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
    - id: warp_file_enable
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'

- id: blend_upload_and_activate
  label: Upload blend mask, select, and enable
  steps:
    - id: blend_upload_http
      command: "curl -F file=@mask.png http://<host>/api/image/processing/blend/file/transfer"
      transport: http
    - id: blend_select
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"}}'
    - id: blend_enable
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'

- id: blacklevel_upload_and_activate
  label: Upload black-level mask, select, and enable
  steps:
    - id: blacklevel_upload_http
      command: "curl -F file=@blacklevel.png http://<host>/api/image/processing/blacklevel/file/transfer"
      transport: http
    - id: blacklevel_select
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
    - id: blacklevel_enable
      command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'

# UNRESOLVED: no other multi-step sequences documented in source beyond the
# three warp/blend/blacklevel macros above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Source does recommend verifying system.state
# before poweron/poweroff, but does not call this a safety interlock.
```

## Notes
- The source document is Barco's UDX Pulse API Power User Reference, document version 1.7 dated 2019-03-04. It is being applied to the Wodan on the assumption that the Wodan shares the Pulse API; the source itself never names "Wodan." Verify against a real device or call `introspect` before relying on any property.
- Wire format is JSON-RPC 2.0 over both TCP (port 9090) and RS-232 (19200 baud, 8 data bits, no parity, 1 stop bit, no flow control). Parameters may be passed by name or position; order is not significant.
- Authentication is optional for end-user commands. The `authenticate` method takes a `code` (integer) parameter; the example in source uses `98765`.
- File transfer is HTTP, not JSON-RPC. Endpoints: `/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`. Uploads use `curl -F file=@<file> http://<host>/api/...`; downloads use `curl -O -J http://<host>/api/...`. The full `192.168.1.100` URL example in source is `http://192.168.1.100/api/image/processing/warp/file/transfer`.
- ECO-mode wake methods: WOL packet (MAC address), IR remote, keypad, or serial `":POWR1\r"`. Source does not document the WOL magic-packet format in detail.
- Best practice from source: "wait for the confirmation of the property.set before setting the same property again. Continuously setting the same property without waiting for confirmation may flood the server with unnecessary request and may reduce performance."
- Subscribing to a property does not return its current value; you must also call `property.get` to seed state. Notifications are only sent on actual value change.
- The source explicitly states: "Parts of the API are dynamic, other parts depend on peripherals or other factors. This means that the documentation shown here may not be complete with respect to a specific projector with a specific configuration. For example, if a lens is mounted that does not have motorized zoom, that part of the API will not be available, even if it's shown here." The recommended discovery mechanism is `introspect`.

<!-- UNRESOLVED: firmware version range that this reference applies to is not stated beyond "1.7" of the document; the spec's `compatible_with.firmware` field is left blank. -->

<!-- UNRESOLVED: the source lists hundreds of properties; this spec enumerates the most prominent ones. The complete list is available at runtime via `introspect` and the alphabetical property catalogue in the source PDF (page-by-page beyond line 2038 of the refined markdown). -->

<!-- UNRESOLVED: DMX channel function/offset/value is read for channels 01..14 but the "function" strings and DMX channel mapping table are not reproduced in the source excerpt we have. They are R-only and must be introspected or read at runtime. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-06-01T22:43:05.087Z
last_checked_at: 2026-06-03T06:22:53.933Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:22:53.933Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions traced to source document; Transport parameters match exactly (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the Barco \"UDX\" reference guide (1.7, 2019-03-04). The Wodan is assumed to share the Pulse API but the source does not name Wodan anywhere; commands here are based on the UDX reference applied to the Wodan family. Per-model feature availability must be verified via `introspect`."
- "many hundreds of `image.color.p7.*`, `image.color.p7.native.*`, `dmx.monitor.channel*`, `image.processing.*`, `environment.*`, `system.*` properties are documented in the source. The Actions/Variables sections below capture the representative set; the full list is available by calling `introspect` on the projector."
- "many additional RW properties exist beyond the catalogue"
- "no other multi-step sequences documented in source beyond the"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version range that this reference applies to is not stated beyond \"1.7\" of the document; the spec's `compatible_with.firmware` field is left blank."
- "the source lists hundreds of properties; this spec enumerates the most prominent ones. The complete list is available at runtime via `introspect` and the alphabetical property catalogue in the source PDF (page-by-page beyond line 2038 of the refined markdown)."
- "DMX channel function/offset/value is read for channels 01..14 but the \"function\" strings and DMX channel mapping table are not reproduced in the source excerpt we have. They are R-only and must be introspected or read at runtime."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
