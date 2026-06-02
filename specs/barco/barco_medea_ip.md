---
spec_id: admin/barco-medea
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Medea Control Spec"
manufacturer: Barco
model_family: Medea
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Medea
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T04:26:26.016Z
last_checked_at: 2026-06-02T17:21:38.388Z
generated_at: 2026-06-02T17:21:38.388Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - peripheral.frame.horizontal.calibrate
  - peripheral.frame.horizontal.runforward
  - peripheral.frame.horizontal.runreverse
  - peripheral.frame.horizontal.stepforward
  - peripheral.frame.horizontal.stepreverse
  - peripheral.frame.horizontal.stop
  - "The refined source is the UDX-family \"RS232 and Network Command Catalog\" (Pulse API v1.7, 2019-03-04). Barco Medea shares the Pulse API per Barco product documentation, but the canonical Medea command catalog was not provided. Entries marked \"MODELS All\" in the source are taken to apply to Medea; entries tagged \"MODELS UDX-4K32 / UDX-4K22 / UDX-W32\" are listed for completeness but noted as not Medea-verified."
  - "No explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility not stated in source."
  - "voltage/current/power specifications not stated. The source only documents the JSON-RPC control interface, not the projector's electrical specifications."
  - "Barco Medea-specific command applicability. The refined source document is the UDX-family catalog (Pulse API v1.7, 2019-03-04). Entries marked \"MODELS All\" in the source are taken to apply to Medea. Entries marked \"MODELS UDX-4K32\", \"MODELS UDX-4K22\", or \"MODELS UDX-W32\" are listed but flagged as UDX-specific; their applicability to Medea was not directly confirmed by the supplied source. Notable UDX-only entries: optics.focus.*, optics.zoom.*, system.license.option.flexbrightness.*, dmx.monitor.channel03.value through channel14.value, l2displayporta/b/c/d connectors and their properties, peripheral.frame.* methods, and image.color.p7.native.normal.*."
  - "source connector list will vary by projector model per image.source.list. The catalog example shows DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI. Medea's actual connector set is not enumerated in the source."
  - "authentication passcode value not stated. The source shows `98765` as a literal example value in the documentation."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:38.388Z
  matched_actions: 158
  action_count: 158
  confidence: medium
  summary: "All 158 spec actions match source-documented JSON-RPC methods verbatim; transport values confirmed; 6 peripheral.frame UDX-4K22-only methods are in source but not in spec. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Medea Control Spec

## Summary
Control spec for the Barco Medea projector via the Barco Pulse JSON-RPC 2.0 facade API. The projector exposes a single command set over both TCP/IP (port 9090) and RS-232 (19200 8N1, no flow control), with HTTP file transfer endpoints under `/api`. This spec covers the Pulse API method/property catalog (system power, sources, illumination, picture settings, warp/blend/blacklevel, optics, statistics, notifications, firmware, DMX, UI).

<!-- UNRESOLVED: The refined source is the UDX-family "RS232 and Network Command Catalog" (Pulse API v1.7, 2019-03-04). Barco Medea shares the Pulse API per Barco product documentation, but the canonical Medea command catalog was not provided. Entries marked "MODELS All" in the source are taken to apply to Medea; entries tagged "MODELS UDX-4K32 / UDX-4K22 / UDX-W32" are listed for completeness but noted as not Medea-verified. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
http:
  base_url: "http://<projector-ip>/api"
auth:
  type: passcode
  # Source states: "A client session must start with an authentication request
  # containing a secret pass code." Authentication is only needed for access
  # above normal end-user level; end-user access can be skipped.
```

## Traits
```yaml
- powerable      # inferred from system.poweron / system.poweroff / system.gotoready / system.gotoeco
- routable       # inferred from image.window.main.source / image.source.list / image.connector.list
- queryable      # inferred from property.get / image.source.list / notification.list / statistics.listcounters
- levelable      # inferred from image.brightness / illumination.sources.laser.power / screen.hdrboost / screen.luminance
```

## Actions
```yaml
# JSON-RPC 2.0 facade. All actions are JSON-RPC requests over TCP port 9090
# (or RS-232, same payload). Literal payloads are shown verbatim.

# ---------- Authentication ----------
- id: authenticate
  label: Authenticate
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "authenticate",
      "params": { "code": 98765 },
      "id": 1
    }
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access (end-user access does not require this).

# ---------- Generic property / signal / introspection ----------
- id: property_set
  label: Set Property Value
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.set",
      "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }
    }
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness, illumination.sources.laser.power).
    - name: value
      type: any
      description: Value matching the property's type and constraints (see Variables).

- id: property_get
  label: Read Property Value
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.get",
      "params": { "property": "system.state" },
      "id": 1
    }
  params:
    - name: property
      type: string
      description: Property name in dot notation.

- id: property_get_multi
  label: Read Multiple Property Values
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.get",
      "params": { "property": ["image.brightness", "image.contrast"] },
      "id": 5
    }
  params:
    - name: property
      type: array
      description: List of property names to read in a single request.

- id: property_subscribe
  label: Subscribe To Property Changes (one)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.subscribe",
      "params": { "property": "image.brightness" },
      "id": 6
    }
  params:
    - name: property
      type: string
      description: Property name to subscribe to.

- id: property_subscribe_multi
  label: Subscribe To Property Changes (many)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.subscribe",
      "params": { "property": ["image.brightness", "image.contrast"] },
      "id": 7
    }
  params:
    - name: property
      type: array
      description: List of property names to subscribe to.

- id: property_unsubscribe
  label: Unsubscribe From Property (one)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.unsubscribe",
      "params": { "property": "image.brightness" },
      "id": 8
    }
  params:
    - name: property
      type: string
      description: Property name to unsubscribe from.

- id: property_unsubscribe_multi
  label: Unsubscribe From Properties (many)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "property.unsubscribe",
      "params": { "property": ["image.brightness", "image.contrast"] },
      "id": 9
    }
  params:
    - name: property
      type: array
      description: List of property names to unsubscribe from.

- id: signal_subscribe
  label: Subscribe To Signal (one)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "signal.subscribe",
      "params": { "signal": "modelupdated" },
      "id": 10
    }
  params:
    - name: signal
      type: string
      description: Signal name in dot notation.

- id: signal_subscribe_multi
  label: Subscribe To Signals (many)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "signal.subscribe",
      "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] },
      "id": 11
    }
  params:
    - name: signal
      type: array
      description: List of signal names to subscribe to.

- id: signal_unsubscribe
  label: Unsubscribe From Signal (one)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "signal.unsubscribe",
      "params": { "signal": "modelupdated" },
      "id": 12
    }
  params:
    - name: signal
      type: string
      description: Signal name to unsubscribe from.

- id: signal_unsubscribe_multi
  label: Unsubscribe From Signals (many)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "signal.unsubscribe",
      "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] },
      "id": 13
    }
  params:
    - name: signal
      type: array
      description: List of signal names to unsubscribe from.

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "introspect",
      "params": { "object": "foo", "recursive": true },
      "id": 1
    }
  params:
    - name: object
      type: string
      description: Object name in dot notation (default "" introspects everything).
    - name: recursive
      type: boolean
      description: If false, lists only object names one level deep.

# ---------- System power / lifecycle ----------
- id: system_poweron
  label: Power On
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweron" }
  params: []
  # Source: verify system.state is "standby" or "ready" before issuing.

- id: system_poweroff
  label: Power Off
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.poweroff" }
  params: []
  # Source: verify system.state is "on" before issuing.

- id: system_reboot
  label: Reboot
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.reboot" }
  params: []

- id: system_gotoeco
  label: Go To ECO State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.gotoeco" }
  params: []

- id: system_gotoready
  label: Go To Ready State
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.gotoready" }
  params: []

- id: system_reset
  label: Reset Domains
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.reset",
      "params": { "domains": ["ImageConnector", "Optics"] }
    }
  params:
    - name: domains
      type: array
      description: 'One or more of: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx.'

- id: system_resetall
  label: Reset All Domains
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.resetall" }
  params: []

- id: system_listresetdomains
  label: List Reset Domains
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.listresetdomains" }
  params: []

- id: system_activity
  label: Signal User Activity
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "system.activity" }
  params: []

- id: system_getsystemdate
  label: Get System Date (UTC)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.getsystemdate" }
  params: []

- id: system_getidentification
  label: Get Identification
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.getidentification",
      "params": { "identification": "ProjectorName" }
    }
  params:
    - name: identification
      type: string
      description: Identification key.

- id: system_getidentifications
  label: Get All Identifications
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.getidentifications" }
  params: []

- id: system_boards_getboardlist
  label: Get Board List
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getboardlist" }
  params: []

- id: system_boards_getboardinfo
  label: Get Board Info
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.boards.getboardinfo",
      "params": { "boardname": "mainboard" }
    }
  params:
    - name: boardname
      type: string
      description: Board name from system.boards.getboardlist.

- id: system_boards_getdeviceinfo
  label: Get Device Info (deprecated)
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.boards.getdeviceinfo",
      "params": { "boardname": "mainboard" }
    }
  params:
    - name: boardname
      type: string
      description: Board name. Source marks this method DEPRECATED in favor of getboardinfo.

- id: system_boards_getmissingboardlist
  label: Get Missing Board List
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "system.boards.getmissingboardlist" }
  params: []

- id: system_boards_getmoduleinfo
  label: Get Module Info
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.boards.getmoduleinfo",
      "params": { "boardname": "mainboard" }
    }
  params:
    - name: boardname
      type: string
      description: Board name.

# ---------- Sources / windows / connectors ----------
- id: image_window_list
  label: List Windows
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.window.list" }
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.list" }
  params: []
  # Returns: DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort,
  # Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI (set varies by model).

- id: image_source_listconnectors
  label: List Source Connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors" }
  params:
    - name: source
      type: string
      description: 'Source object name (e.g. "displayport1", "hdmi", "sdia"). Translate by lowercasing the source name and removing non-word characters.'

- id: image_connector_list
  label: List Connectors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.list" }
  params: []

- id: image_resolution_list
  label: List Resolutions
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.resolution.list" }
  params: []

- id: image_stereo_listdarktime
  label: List Stereo Dark Time Values
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.stereo.listdarktime" }
  params: []
  # Returns list of darktime values in microseconds.

- id: image_display_listdisplaymodes
  label: List Display Modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.display.listdisplaymodes" }
  params: []
  # Values: Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift.

# ---------- Illumination ----------
- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "illumination.clo.engage" }
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }
  params: []

# ---------- Color (image.color.p7 / rgbmode) ----------
- id: image_color_p7_custom_copypresettocustom
  label: Copy Preset To Custom
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.color.p7.custom.copypresettocustom",
      "params": { "presetname": "P7_Custom_1" }
    }
  params:
    - name: presetname
      type: string
      description: Preset name to copy from.

- id: image_color_p7_custom_resetpreset
  label: Reset Preset
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.color.p7.custom.resetpreset",
      "params": { "presetname": "P7_Custom_1" }
    }
  params:
    - name: presetname
      type: string
      description: Preset name to reset.

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom To Native
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }
  params: []

# ---------- Connector EDID ----------
- id: image_connector_l1displayport_edid_list
  label: List L1 DisplayPort EDIDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.l1displayport.edid.list" }
  params: []

- id: image_connector_l1hdbaset1_edid_list
  label: List L1 HDBaseT1 EDIDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.l1hdbaset1.edid.list" }
  params: []

- id: image_connector_l1hdbaset2_edid_list
  label: List L1 HDBaseT2 EDIDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.l1hdbaset2.edid.list" }
  params: []

- id: image_connector_l1hdmi_edid_list
  label: List L1 HDMI EDIDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.l1hdmi.edid.list" }
  params: []

- id: image_connector_l2displayport_edid_list
  label: List L2 DisplayPort EDIDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.connector.l2displayporta.edid.list" }
  params: []
  # UDX-4K32 / UDX-4K22 only. Variants: l2displayporta/b/c/d.

# ---------- Processing (warp / blend / blacklevel) ----------
- id: image_processing_warp_file_list
  label: List Warp Files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warp.file.list" }
  params: []

- id: image_processing_warp_file_delete
  label: Delete Warp File
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.warp.file.delete",
      "params": { "filename": "warp.xml" }
    }
  params:
    - name: filename
      type: string
      description: Warp file name to delete.

- id: image_processing_warpgrid_getgrid
  label: Get Current Warp Grid (normalized)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgrid" }
  params: []

- id: image_processing_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.warpgrid.getgridsize" }
  params: []

- id: image_processing_warpgrid_getscaledgrid
  label: Get Scaled Warp Grid
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.warpgrid.getscaledgrid",
      "params": { "resolution": { "x": 1920, "y": 1200 } }
    }
  params:
    - name: resolution
      type: object
      description: 'Object with x (int) and y (int) for output resolution.'

- id: image_processing_warp_fourcorners_getscaledcorners
  label: Get Scaled Warp Corners
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.warp.fourcorners.getscaledcorners",
      "params": { "resolution": { "x": 1920, "y": 1200 } }
    }
  params:
    - name: resolution
      type: object
      description: 'Object with x (int) and y (int) for output resolution.'

- id: image_processing_warp_warpscaledpoints
  label: Warp Scaled Points
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.warp.warpscaledpoints",
      "params": { "points": [{"X":0.0,"Y":0.0}], "resolution": {"X":1920.0,"Y":1200.0} }
    }
  params:
    - name: points
      type: array
      description: 'Array of {X float, Y float} input points (normalized).'
    - name: resolution
      type: object
      description: 'Object with X (float) and Y (float) for output resolution.'

- id: image_processing_blend_file_list
  label: List Blend Files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blend.file.list" }
  params: []

- id: image_processing_blend_file_delete
  label: Delete Blend File
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blend.file.delete",
      "params": { "filename": "mask.png" }
    }
  params:
    - name: filename
      type: string
      description: Blend file name to delete.

- id: image_processing_blend_basicblend_getblendarea
  label: Get Blend Area
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blend.basicblend.getblendarea",
      "params": { "resolution_width": 1920, "resolution_height": 1200 }
    }
  params:
    - name: resolution_width
      type: float
      description: Resolution width.
    - name: resolution_height
      type: float
      description: Resolution height.

- id: image_processing_blend_basicblend_getwarpedblendarea
  label: Get Warped Blend Area
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blend.basicblend.getwarpedblendarea",
      "params": { "resolution_width": 1920, "resolution_height": 1200 }
    }
  params:
    - name: resolution_width
      type: float
      description: Resolution width.
    - name: resolution_height
      type: float
      description: Resolution height.

- id: image_processing_blacklevel_file_list
  label: List Blacklevel Files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.processing.blacklevel.file.list" }
  params: []

- id: image_processing_blacklevel_file_delete
  label: Delete Blacklevel File
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blacklevel.file.delete",
      "params": { "filename": "blacklevel.png" }
    }
  params:
    - name: filename
      type: string
      description: Blacklevel file name to delete.

- id: image_processing_blacklevel_basicblacklevel_getblacklevelarea
  label: Get Blacklevel Area
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blacklevel.basicblacklevel.getblacklevelarea",
      "params": { "resolution_width": 1920, "resolution_height": 1200 }
    }
  params:
    - name: resolution_width
      type: float
      description: Resolution width.
    - name: resolution_height
      type: float
      description: Resolution height.

- id: image_processing_blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Blacklevel Area
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea",
      "params": { "resolution_width": 1920, "resolution_height": 1200 }
    }
  params:
    - name: resolution_width
      type: float
      description: Resolution width.
    - name: resolution_height
      type: float
      description: Resolution height.

# ---------- Test patterns ----------
- id: image_testpattern_list
  label: List Test Patterns
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.list" }
  params: []

- id: image_testpattern_setproperties
  label: Set Test Pattern Properties
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.testpattern.setproperties",
      "params": { "id": "pattern1", "properties": [{"key":"color","value":"red"}] }
    }
  params:
    - name: id
      type: string
      description: Test pattern id.
    - name: properties
      type: array
      description: 'Array of {key string, value string} property assignments.'

- id: image_testpattern_file_list
  label: List Custom Test Pattern Files
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "image.testpattern.file.list" }
  params: []

- id: image_testpattern_file_delete
  label: Delete Test Pattern File
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "image.testpattern.file.delete",
      "params": { "filename": "mypattern.png" }
    }
  params:
    - name: filename
      type: string
      description: Test pattern file name to delete.

# ---------- Optics (lens shift / focus / zoom / shutter) ----------
- id: optics_setlensid
  label: Set Lens ID
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.setlensid",
      "params": { "lensid": 1, "powerlensid": 1 }
    }
  params:
    - name: lensid
      type: integer
      description: Lens id (from optics.getvalidlensids).
    - name: powerlensid
      type: integer
      description: Power lens id.

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "optics.getvalidlensids" }
  params: []

- id: optics_shifttocenter
  label: Shift Lens To Center
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.shifttocenter" }
  params: []

- id: optics_shutter_toggle
  label: Toggle Shutter
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.shutter.toggle" }
  params: []

- id: optics_shutter_getobjectpath
  label: Get Shutter Object Path
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "optics.shutter.getobjectpath" }
  params: []

# Lens shift horizontal
- id: optics_lensshift_horizontal_runforward
  label: Lens Shift Horizontal Run Forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runforward" }
  params: []

- id: optics_lensshift_horizontal_runforwardtime
  label: Lens Shift Horizontal Run Forward (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.runforwardtime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_lensshift_horizontal_runreverse
  label: Lens Shift Horizontal Run Reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.runreverse" }
  params: []

- id: optics_lensshift_horizontal_runreversetime
  label: Lens Shift Horizontal Run Reverse (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.runreversetime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_lensshift_horizontal_stepforward
  label: Lens Shift Horizontal Step Forward
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.stepforward",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_lensshift_horizontal_stepreverse
  label: Lens Shift Horizontal Step Reverse
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.stepreverse",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_lensshift_horizontal_stop
  label: Lens Shift Horizontal Stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.stop" }
  params: []

- id: optics_lensshift_horizontal_calibrate
  label: Lens Shift Horizontal Calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.horizontal.calibrate" }
  params: []

- id: optics_lensshift_horizontal_addlocation
  label: Lens Shift Horizontal Add Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.addlocation",
      "params": { "location": "pos1" }
    }
  params:
    - name: location
      type: string
      description: Location name to save the current horizontal lens shift position under.

- id: optics_lensshift_horizontal_setlocation
  label: Lens Shift Horizontal Set Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.horizontal.setlocation",
      "params": { "location": "pos1" }
    }
  params:
    - name: location
      type: string
      description: Location name to move to.

# Lens shift vertical (mirrors horizontal)
- id: optics_lensshift_vertical_runforward
  label: Lens Shift Vertical Run Forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runforward" }
  params: []

- id: optics_lensshift_vertical_runforwardtime
  label: Lens Shift Vertical Run Forward (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.runforwardtime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_lensshift_vertical_runreverse
  label: Lens Shift Vertical Run Reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.runreverse" }
  params: []

- id: optics_lensshift_vertical_runreversetime
  label: Lens Shift Vertical Run Reverse (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.runreversetime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_lensshift_vertical_stepforward
  label: Lens Shift Vertical Step Forward
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.stepforward",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_lensshift_vertical_stepreverse
  label: Lens Shift Vertical Step Reverse
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.stepreverse",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_lensshift_vertical_stop
  label: Lens Shift Vertical Stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.stop" }
  params: []

- id: optics_lensshift_vertical_calibrate
  label: Lens Shift Vertical Calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.lensshift.vertical.calibrate" }
  params: []

- id: optics_lensshift_vertical_addlocation
  label: Lens Shift Vertical Add Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.addlocation",
      "params": { "location": "pos1" }
    }
  params:
    - name: location
      type: string
      description: Location name to save the current vertical lens shift position under.

- id: optics_lensshift_vertical_setlocation
  label: Lens Shift Vertical Set Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.lensshift.vertical.setlocation",
      "params": { "location": "pos1" }
    }
  params:
    - name: location
      type: string
      description: Location name to move to.

# Focus (UDX-4K32 / UDX-4K22 in source - applicability to Medea UNRESOLVED)
- id: optics_focus_runforward
  label: Focus Run Forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runforward" }
  params: []

- id: optics_focus_runforwardtime
  label: Focus Run Forward (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.runforwardtime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_focus_runreverse
  label: Focus Run Reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.runreverse" }
  params: []

- id: optics_focus_runreversetime
  label: Focus Run Reverse (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.runreversetime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_focus_stepforward
  label: Focus Step Forward
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.stepforward",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_focus_stepreverse
  label: Focus Step Reverse
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.stepreverse",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_focus_stop
  label: Focus Stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.stop" }
  params: []

- id: optics_focus_calibrate
  label: Focus Calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.focus.calibrate" }
  params: []

- id: optics_focus_addlocation
  label: Focus Add Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.addlocation",
      "params": { "location": "focus1" }
    }
  params:
    - name: location
      type: string
      description: Location name.

- id: optics_focus_setlocation
  label: Focus Set Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.focus.setlocation",
      "params": { "location": "focus1" }
    }
  params:
    - name: location
      type: string
      description: Location name.

# Zoom (UDX-4K32 / UDX-4K22 in source)
- id: optics_zoom_runforward
  label: Zoom Run Forward
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runforward" }
  params: []

- id: optics_zoom_runforwardtime
  label: Zoom Run Forward (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.runforwardtime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_zoom_runreverse
  label: Zoom Run Reverse
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.runreverse" }
  params: []

- id: optics_zoom_runreversetime
  label: Zoom Run Reverse (timed)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.runreversetime",
      "params": { "milliseconds": 500 }
    }
  params:
    - name: milliseconds
      type: integer
      description: Duration in milliseconds.

- id: optics_zoom_stepforward
  label: Zoom Step Forward
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.stepforward",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_zoom_stepreverse
  label: Zoom Step Reverse
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.stepreverse",
      "params": { "steps": 10 }
    }
  params:
    - name: steps
      type: integer
      description: Number of steps.

- id: optics_zoom_stop
  label: Zoom Stop
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.stop" }
  params: []

- id: optics_zoom_calibrate
  label: Zoom Calibrate
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "optics.zoom.calibrate" }
  params: []

- id: optics_zoom_addlocation
  label: Zoom Add Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.addlocation",
      "params": { "location": "zoom1" }
    }
  params:
    - name: location
      type: string
      description: Location name.

- id: optics_zoom_setlocation
  label: Zoom Set Location
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "optics.zoom.setlocation",
      "params": { "location": "zoom1" }
    }
  params:
    - name: location
      type: string
      description: Location name.

# ---------- Notifications ----------
- id: notification_list
  label: List Active Notifications
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "notification.list" }
  params: []

- id: notification_log
  label: List Notification Log
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "notification.log",
      "params": { "minimumseverity": "INFO", "start": 0, "count": 100 }
    }
  params:
    - name: minimumseverity
      type: string
      description: 'One of INFO, CAUTION, WARNING, ERROR, CRITICAL.'
    - name: start
      type: integer
      description: Log start index.
    - name: count
      type: integer
      description: Number of entries to return.

- id: notification_dismiss
  label: Dismiss Notification
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "notification.dismiss",
      "params": { "id": "n1", "response": "OK" }
    }
  params:
    - name: id
      type: string
      description: Notification id.
    - name: response
      type: string
      description: 'One of NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS.'

- id: notification_suppress
  label: Suppress Notification Code
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "notification.suppress",
      "params": { "code": "lampwarning" }
    }
  params:
    - name: code
      type: string
      description: Notification code.

- id: notification_unsuppress
  label: Unsuppress Notification Code
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "notification.unsuppress",
      "params": { "code": "lampwarning" }
    }
  params:
    - name: code
      type: string
      description: Notification code.

- id: notification_unsuppressall
  label: Unsuppress All Notification Codes
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "notification.unsuppressall" }
  params: []

- id: notification_listsuppressed
  label: List Suppressed Notification Codes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "notification.listsuppressed" }
  params: []

# ---------- Statistics ----------
- id: statistics_listcounters
  label: List Counters
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.listcounters" }
  params: []

- id: statistics_laserruntime_getname
  label: Get Laser Runtime Counter Name
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.laserruntime.getname" }
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Counter Unit
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.laserruntime.getunit" }
  params: []

- id: statistics_laserstrikes_getname
  label: Get Laser Strikes Counter Name
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.laserstrikes.getname" }
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Counter Unit
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.laserstrikes.getunit" }
  params: []

- id: statistics_projectorruntime_getname
  label: Get Projector Runtime Counter Name
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.projectorruntime.getname" }
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Counter Unit
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.projectorruntime.getunit" }
  params: []

- id: statistics_systemtime_getname
  label: Get System Time Counter Name
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.systemtime.getname" }
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Counter Unit
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.systemtime.getunit" }
  params: []

- id: statistics_uptime_getname
  label: Get Uptime Counter Name
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.uptime.getname" }
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Counter Unit
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "statistics.uptime.getunit" }
  params: []

# ---------- Firmware ----------
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponents" }
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade At Next Reboot
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }
  params: []

# ---------- Environment / sensors ----------
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "environment.getalarminfo" }
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "environment.getcontrolblocks",
      "params": { "type": "Sensor", "valuetype": "Temperature" }
    }
  params:
    - name: type
      type: string
      description: 'One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.'
    - name: valuetype
      type: string
      description: 'One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.'

# ---------- DMX ----------
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listchannels" }
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "dmx.listmodes" }
  params: []

# ---------- Network ----------
- id: network_list
  label: List Network Devices
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "network.list" }
  params: []
  # Returns logical device ids (e.g. 'wired1', 'wifi1').

# ---------- LEDs ----------
- id: led_list
  label: List LEDs
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "led.list" }
  params: []

- id: led_activity
  label: LED Activity (restart timeout)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "led.activity" }
  params: []

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ledctrl.blink",
      "params": { "led": "systemstatus", "color": "red", "period": 42 }
    }
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus).
    - name: color
      type: string
      description: LED color (e.g. red, green, blue).
    - name: period
      type: integer
      description: Blink period.

# ---------- Remote control ----------
- id: remotecontrol_listsensors
  label: List IR Sensors
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "remotecontrol.listsensors" }
  params: []

# ---------- Key dispatcher (remote / keypad events) ----------
- id: keydispatcher_sendclickevent
  label: Send Key Click Event
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "keydispatcher.sendclickevent",
      "params": { "key": "RC_POWER_ON" }
    }
  params:
    - name: key
      type: string
      description: 'One of RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1, RC_2, RC_3, RC_4, RC_5, RC_6, RC_7, RC_8, RC_9, RC_0, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY.'

- id: keydispatcher_sendpressevent
  label: Send Key Press Event
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "keydispatcher.sendpressevent",
      "params": { "key": "RC_OK" }
    }
  params:
    - name: key
      type: string
      description: 'Same enum as keydispatcher.sendclickevent.'

- id: keydispatcher_sendreleaseevent
  label: Send Key Release Event
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "keydispatcher.sendreleaseevent",
      "params": { "key": "RC_OK" }
    }
  params:
    - name: key
      type: string
      description: 'Same enum as keydispatcher.sendclickevent.'

# ---------- Light measurement ----------
- id: lightmeasurement_getlightoutput
  label: Get Light Output (lumens)
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "lightmeasurement.getlightoutput" }
  params: []

# ---------- UI settings ----------
- id: ui_settings_get
  label: Get UI Setting
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ui.settings.get",
      "params": { "key": "some.setting" }
    }
  params:
    - name: key
      type: string
      description: Setting key.

- id: ui_settings_set
  label: Set UI Setting
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ui.settings.set",
      "params": { "key": "some.setting", "value": "1" }
    }
  params:
    - name: key
      type: string
      description: Setting key.
    - name: value
      type: string
      description: Setting value.

- id: ui_settings_remove
  label: Remove UI Setting
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ui.settings.remove",
      "params": { "key": "some.setting" }
    }
  params:
    - name: key
      type: string
      description: Setting key.

- id: ui_settings_list
  label: List UI Settings
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.list" }
  params: []

- id: ui_settings_keys
  label: List UI Setting Keys
  kind: query
  command: |
    { "jsonrpc": "2.0", "method": "ui.settings.keys" }
  params: []

- id: ui_settings_geticons
  label: Get UI Icons (SVG sprite)
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ui.settings.geticons",
      "params": { "category": "Source" }
    }
  params:
    - name: category
      type: string
      description: 'One of Source, Connector, TestPattern.'

- id: ui_settings_getfonticons
  label: Get UI Font Icons
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "ui.settings.getfonticons",
      "params": { "category": "Source" }
    }
  params:
    - name: category
      type: string
      description: 'One of Source, Connector, TestPattern.'

- id: ui_togglestealthmode
  label: Toggle Stealth Mode (deprecated)
  kind: action
  command: |
    { "jsonrpc": "2.0", "method": "ui.togglestealthmode" }
  params: []
  # Source marks this method DEPRECATED.

# ---------- System license (flex brightness, UDX-4K32 in source) ----------
- id: system_license_option_flexbrightness_getmaximumlightoutputcode
  label: Flex Brightness Get Maximum Light Output Code
  kind: query
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.license.option.flexbrightness.getmaximumlightoutputcode",
      "params": { "lightoutput": 32000, "signature": "..." }
    }
  params:
    - name: lightoutput
      type: integer
      description: Desired maximum light output.
    - name: signature
      type: string
      description: Authorization signature.

- id: system_license_option_flexbrightness_setmaximumlightoutput
  label: Flex Brightness Set Maximum Light Output
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.license.option.flexbrightness.setmaximumlightoutput",
      "params": { "code": "...", "lightoutput": 32000 }
    }
  params:
    - name: code
      type: string
      description: Authorization code from getmaximumlightoutputcode.
    - name: lightoutput
      type: integer
      description: Desired maximum light output.

- id: system_license_option_flexbrightness_setmaximumlightoutputcode
  label: Flex Brightness Set Maximum Light Output (with code)
  kind: action
  command: |
    {
      "jsonrpc": "2.0",
      "method": "system.license.option.flexbrightness.setmaximumlightoutputcode",
      "params": { "lightoutput": 32000, "signature": "...", "code": "..." }
    }
  params:
    - name: lightoutput
      type: integer
      description: Desired maximum light output.
    - name: signature
      type: string
      description: Authorization signature.
    - name: code
      type: string
      description: Authorization code.

# ---------- ECO wake-up (serial-only ASCII shortcut) ----------
- id: serial_eco_wake
  label: Wake From ECO Mode Via Serial (ASCII)
  kind: action
  command: ":POWR1\r"
  params: []
  # RS-232 only. ASCII string sent on the serial port. The source says this is one
  # of four wake-up methods (also: Wake-on-LAN to MAC, IR remote power button,
  # keypad power button).
```

## Feedbacks
```yaml
# system.state - current unit state.
# - id: system_state
#   source: "property.get system.state"
#   type: enum
#   values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
#
# illumination.state - On or Off.
# - id: illumination_state
#   source: "property.get illumination.state"
#   type: enum
#   values: [On, Off]
#
# illumination.clo.availability - CLO availability.
# - id: illumination_clo_availability
#   source: "property.get illumination.clo.availability"
#   type: enum
#   values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
#
# illumination.clo.state - CLO state.
# - id: illumination_clo_state
#   source: "property.get illumination.clo.state"
#   type: enum
#   values: [Ok, TooDim, TooBright]
#
# illumination.sources.laser.ispowerlimited - whether laser power is currently limited.
# - id: illumination_laser_ispowerlimited
#   source: "property.get illumination.sources.laser.ispowerlimited"
#   type: boolean
#
# illumination.sources.laser.powerlimitreason - reason text.
# - id: illumination_laser_powerlimitreason
#   source: "property.get illumination.sources.laser.powerlimitreason"
#   type: string
#
# environment.alarmstate - overall alarm state.
# - id: environment_alarmstate
#   source: "property.get environment.alarmstate"
#   type: enum
#   values: [Fatal, Error, Alert, Warning, Ok]
#
# firmware.firmwareversion - currently installed firmware version.
# - id: firmware_version
#   source: "property.get firmware.firmwareversion"
#   type: string
#
# gsm.available - GSM card present.
# - id: gsm_available
#   source: "property.get gsm.available"
#   type: boolean
#
# gsm.pinstate - GSM PIN state.
# - id: gsm_pinstate
#   source: "property.get gsm.pinstate"
#   type: enum
#   values: [Accepted, Failed, Locked, Unknown]
#
# system.firmwareversion - firmware version.
# - id: system_firmwareversion
#   source: "property.get system.firmwareversion"
#   type: string
#
# system.articlenumber - article number.
# - id: system_articlenumber
#   source: "property.get system.articlenumber"
#   type: string
#
# system.colorwheel / system.colorwheelname - installed color wheel info.
# - id: system_colorwheel
#   source: "property.get system.colorwheel"
#   type: string
# - id: system_colorwheelname
#   source: "property.get system.colorwheelname"
#   type: string
#
# system.familyname - projector family.
# - id: system_familyname
#   source: "property.get system.familyname"
#   type: string
#
# system.modelname - projector model.
# - id: system_modelname
#   source: "property.get system.modelname"
#   type: string
#
# system.serialnumber - projector serial number.
# - id: system_serialnumber
#   source: "property.get system.serialnumber"
#   type: string
#
# system.license.applicable / system.license.available / system.license.valid - license state.
# - id: system_license_applicable
#   source: "property.get system.license.applicable"
#   type: boolean
# - id: system_license_available
#   source: "property.get system.license.available"
#   type: boolean
# - id: system_license_valid
#   source: "property.get system.license.valid"
#   type: boolean
#
# dmx.monitor.connectionstate.active - DMX/Artnet activity within last 10s.
# - id: dmx_connectionstate_active
#   source: "property.get dmx.monitor.connectionstate.active"
#   type: boolean
#
# dmx.monitor.channelNN.value - current DMX value (channels 01-14).
# - id: dmx_channel_value
#   source: "property.get dmx.monitor.channelNN.value"
#   type: integer
#
# source signal snapshot (per connector) - vertical/horizontal resolution, frequency,
# pixel rate, scan type, color space, signal range, chroma sampling, gamma type,
# color primaries, mastering luminance, content aspect ratio, is_stereo, stereo_mode.
# - id: detected_signal
#   source: "property.get image.connector.<name>.detectedsignal"
#   type: object
```

## Variables
```yaml
# All addressable via property.set / property.get / property.subscribe. Types
# and constraints are verbatim from the source Properties section. "MODELS All"
# entries are taken to apply to Medea; "MODELS UDX-..." entries are listed for
# completeness but are UNRESOLVED for Medea.

# --- DMX (MODELS All) ---
- id: dmx.artnet
  type: boolean
  access: RW
  notes: "Artnet enabled or not."

- id: dmx.artnetnet
  type: integer
  access: RW
  notes: "Artnet net selection."

- id: dmx.artnetuniverse
  type: integer
  access: RW
  notes: "Artnet universe selection."

- id: dmx.mode
  type: string
  access: RW
  notes: "Current DMX mode."

- id: dmx.shutdown
  type: boolean
  access: RW
  notes: "Shutdown enabled or not."

- id: dmx.shutdowntimeout
  type: integer
  access: RW
  notes: "Time out for shutdown in minutes."

- id: dmx.startchannel
  type: integer
  access: RW
  constraints: { min: 1, max: 512, step: 1, precision: 1 }
  notes: "DMX start channel."

# --- Illumination (MODELS All) ---
- id: illumination.clo.enable
  type: boolean
  access: RW
  notes: "True if constant light output is enabled."

- id: illumination.clo.scale
  type: float
  access: RW
  notes: "The percentage to scale the setpoint by."

- id: illumination.clo.setpoint
  type: float
  access: RW
  notes: "The target luminosity of the light source."

- id: illumination.sources.laser.power
  type: float
  access: RW
  notes: "Target power in percent."
  # Source example: 30 (minpower 0, maxpower 100).

- id: illumination.sources.laser.maxpower
  type: float
  access: R
  notes: "Maximum power in percent."

- id: illumination.sources.laser.minpower
  type: float
  access: R
  notes: "Minimum power in percent."

# --- Screen (MODELS All) ---
- id: screen.hdrboost
  type: float
  access: RW
  constraints: { min: 0.8, max: 1.2, step: 0.01, precision: 0.1 }
  notes: "HDR intensity."

- id: screen.luminance
  type: float
  access: RW
  constraints: { min: 50, max: 10000, step: 10, precision: 1 }
  notes: "Maximum screen luminance in cd/m^2."

# --- Image picture settings (MODELS All unless noted) ---
- id: image.brightness
  type: float
  access: RW
  constraints: { min: -1, max: 1, step: 1, precision: 0.01 }
  notes: "Image brightness/offset. 0 = default, 1 = 100% offset."

- id: image.color.rgbmode.rgbmode
  type: enum
  values: [Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed]
  access: RW
  notes: "RGB Mode."

# Color P7 custom (MODELS All) - primary/secondary/white x, y, lum, gain
- id: image.color.p7.custom.redx
  type: float
  access: RW
- id: image.color.p7.custom.redy
  type: float
  access: RW
- id: image.color.p7.custom.redlum
  type: float
  access: RW
- id: image.color.p7.custom.redgain
  type: float
  access: RW
- id: image.color.p7.custom.greenx
  type: float
  access: RW
- id: image.color.p7.custom.greeny
  type: float
  access: RW
- id: image.color.p7.custom.greenlum
  type: float
  access: RW
- id: image.color.p7.custom.greengain
  type: float
  access: RW
- id: image.color.p7.custom.bluex
  type: float
  access: RW
- id: image.color.p7.custom.bluey
  type: float
  access: RW
- id: image.color.p7.custom.bluelum
  type: float
  access: RW
- id: image.color.p7.custom.bluegain
  type: float
  access: RW
- id: image.color.p7.custom.cyanx
  type: float
  access: RW
- id: image.color.p7.custom.cyany
  type: float
  access: RW
- id: image.color.p7.custom.cyanlum
  type: float
  access: RW
- id: image.color.p7.custom.cyangain
  type: float
  access: RW
- id: image.color.p7.custom.magentax
  type: float
  access: RW
- id: image.color.p7.custom.magentay
  type: float
  access: RW
- id: image.color.p7.custom.magentalum
  type: float
  access: RW
- id: image.color.p7.custom.magentagain
  type: float
  access: RW
- id: image.color.p7.custom.yellowx
  type: float
  access: RW
- id: image.color.p7.custom.yellowy
  type: float
  access: RW
- id: image.color.p7.custom.yellowlum
  type: float
  access: RW
- id: image.color.p7.custom.yellowgain
  type: float
  access: RW
- id: image.color.p7.custom.whitex
  type: float
  access: RW
- id: image.color.p7.custom.whitey
  type: float
  access: RW
- id: image.color.p7.custom.whitelum
  type: float
  access: RW
- id: image.color.p7.custom.whitegain
  type: float
  access: RW
- id: image.color.p7.custom.whitetemperature
  type: integer
  access: RW
  constraints: { min: 3200, max: 13000, step: 100, precision: 1 }
  notes: "Desired white point temperature."
- id: image.color.p7.custom.whitemode
  type: enum
  values: [Coordinates, Temperature]
  access: RW
- id: image.color.p7.custom.mode
  type: string
  access: RW
- id: image.color.p7.custom.modes
  type: array
  access: R
  notes: "Array of {group enum 'Custom'|'Preset', modes [string]}."
- id: image.color.p7.custom.target
  type: object
  access: R
  notes: "Target color coordinates for the current preset (red, green, blue, white x/y)."

# Color P7 native (MODELS All)
- id: image.color.p7.native.rgbw
  type: object
  access: RW
  notes: "Native red/green/blue/white x, y, lum."
- id: image.color.p7.native.normal.rgbw
  type: object
  access: RW
- id: image.color.p7.native.c1
  type: object
  access: RW
  notes: "Native C1 x, y, lum."
- id: image.color.p7.native.c1available
  type: boolean
  access: R
- id: image.color.p7.native.c2
  type: object
  access: RW
- id: image.color.p7.native.c2available
  type: boolean
  access: R
- id: image.color.p7.native.list
  type: array
  access: R
  notes: "List of available native sets."

# --- Image window / source / processing (MODELS All unless noted) ---
- id: image.window.main.source
  type: string
  access: RW
  notes: "Active source for the main window. Set with values from image.source.list."

- id: image.processing.warp.enable
  type: boolean
  access: RW
  notes: "Globally enable warp."

- id: image.processing.warp.file.selected
  type: string
  access: RW
  notes: "Selected warp file name."

- id: image.processing.warp.file.enable
  type: boolean
  access: RW
  notes: "Enable the selected warp file."

- id: image.processing.blend.file.selected
  type: string
  access: RW
  notes: "Selected blend file name."

- id: image.processing.blend.file.enable
  type: boolean
  access: RW
  notes: "Enable the selected blend file."

- id: image.processing.blacklevel.file.selected
  type: string
  access: RW
  notes: "Selected blacklevel file name."

- id: image.processing.blacklevel.file.enable
  type: boolean
  access: RW
  notes: "Enable the selected blacklevel file."

# --- Connector signal override settings (per connector) ---
# Source documents these for image.connector.l1displayport, .l1hdbaset1,
# .l1hdbaset2, .l1hdmi, .l1sdia/b/c/d, and (UDX-only) .l2displayporta/b/c/d.
# Each connector has: colorprimaries, colorprimariesavailable, colorspace,
# detectedsignal, edid.selected, signalrange.
- id: image.connector.<name>.colorprimaries
  type: enum
  values: [Auto, Uncorrected, REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]
  access: RW
  notes: "Override detected signal color primaries. Set to Auto for automatic."
- id: image.connector.<name>.colorspace
  type: enum
  values: [Auto, RGB, REC709, REC601, REC2020]
  access: RW
  notes: "Override detected signal color space."
- id: image.connector.<name>.edid.selected
  type: string
  access: RW
  notes: "Selected EDID for the connector (MEDEA connectors: l1displayport, l1hdbaset1, l1hdbaset2, l1hdmi, l1sdia, l1sdib, l1sdic, l1sdid)."
- id: image.connector.<name>.signalrange
  type: enum
  values: [Auto, 0-255, 16-235]
  access: RW
  notes: "Override detected signal range."

# --- Black content detection (DEPRECATED) ---
- id: image.blackcontentdetection.dimminginterval
  type: integer
  access: RW
  constraints: { min: 0, max: 3000, step: 10, precision: 1 }
  notes: "DEPRECATED. Power dimming interval in ms upon black content detection."
- id: image.blackcontentdetection.enable
  type: boolean
  access: RW
  notes: "DEPRECATED."
- id: image.blackcontentdetection.sampleinterval
  type: integer
  access: RW
  constraints: { min: 500, max: 3000, step: 10, precision: 1 }
  notes: "DEPRECATED."
- id: image.blackcontentdetection.threshold
  type: integer
  access: RW
  constraints: { min: 0, max: 255, step: 1, precision: 1 }
  notes: "DEPRECATED."

# --- UI / system ---
- id: ui.osd
  type: boolean
  access: RW
  notes: "Enable/disable on-screen display."

- id: ui.stealthmode
  type: enum
  values: [Off, On]
  access: RW
  notes: "When stealth mode is On, all controllable LEDs are switched off."

- id: system.initialstate
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  access: RW
  notes: "State to transition to when the unit is started."

- id: system.eco.enable
  type: boolean
  access: RW
  notes: "Enable/disable the use of ECO state. Check system.eco.available first."
- id: system.eco.available
  type: boolean
  access: R

- id: system.standby.enable
  type: boolean
  access: RW
  notes: "Enable/disable the use of standby state."
- id: system.standby.available
  type: boolean
  access: R

- id: system.ready.timeout.enable
  type: boolean
  access: RW
- id: system.ready.timeout.duration
  type: integer
  access: RW
  notes: "Seconds to wait in ready state before transitioning lower."
- id: system.on.timeout.enable
  type: boolean
  access: RW
- id: system.on.timeout.duration
  type: integer
  access: RW
  notes: "Seconds to wait in on state before transitioning lower."
- id: system.error.timeout.enable
  type: boolean
  access: RW
- id: system.error.timeout.duration
  type: integer
  access: RW
  notes: "Seconds to wait in error state before transitioning lower."
- id: system.standby.timeout.enable
  type: boolean
  access: RW
- id: system.standby.timeout.duration
  type: integer
  access: RW
  notes: "Seconds to wait in standby state before transitioning lower."

# --- Statistics counters (RW per source) ---
- id: statistics.laserruntime.value
  type: integer
  access: RW
- id: statistics.laserstrikes.value
  type: integer
  access: RW
- id: statistics.projectorruntime.value
  type: integer
  access: RW
- id: statistics.systemtime.value
  type: integer
  access: RW
- id: statistics.uptime.value
  type: integer
  access: RW

# --- GSM (MODELS All) ---
- id: gsm.pin
  type: string
  access: RW
  notes: "Pin code for SIM card."

# --- Remote control sensors (MODELS All) ---
- id: remotecontrol.address
  type: integer
  access: RW
  constraints: { min: 1, max: 31, step: 1, precision: 1 }
  notes: "IR remote address the projector responds to."
- id: remotecontrol.broadcastaddress
  type: integer
  access: RW
  constraints: { min: 0, max: 1, step: 1, precision: 1 }
- id: remotecontrol.sensors.front.enable
  type: boolean
  access: RW
- id: remotecontrol.sensors.rear.enable
  type: boolean
  access: RW
- id: remotecontrol.sensors.side.enable
  type: boolean
  access: RW

# --- Flex Brightness (UDX-4K32 in source) ---
- id: system.license.option.flexbrightness.enabled
  type: boolean
  access: R
  notes: "UDX-4K32 only per source. Medea applicability UNRESOLVED."
- id: system.license.option.flexbrightness.maximumlightoutput
  type: integer
  access: R
  notes: "UDX-4K32 only. UNRESOLVED for Medea."
- id: system.license.option.flexbrightness.maximumlightoutputattemptsleft
  type: integer
  access: R
  notes: "UDX-4K32 only. UNRESOLVED for Medea."
- id: system.license.option.flexbrightness.maximumlightoutputs
  type: array
  access: R
  notes: "List of valid maximum light outputs. UDX-4K32 only. UNRESOLVED for Medea."
```

## Events
```yaml
# Unsolicited JSON-RPC 2.0 notifications (no id, no reply required).
# Client must implement property.changed and signal.callback handlers.

# Property change (subscribed properties)
- id: property_changed
  source: "Server-initiated JSON-RPC 2.0 notification (no id)"
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "property.changed",
      "params": {
        "property": [
          { "image.brightness": 0.15 }
        ]
      }
    }
  notes: "Fires when any property the client subscribed to via property.subscribe changes."

# Signal callback (subscribed signals)
- id: signal_callback
  source: "Server-initiated JSON-RPC 2.0 notification (no id)"
  payload: |
    {
      "jsonrpc": "2.0",
      "method": "signal.callback",
      "params": {
        "signal": [
          { "objectname.signalname": { "arg1": 100, "arg2": "cat" } }
        ]
      }
    }

# --- Documented signals ---
- id: modelupdated
  source: "signal modelupdated"
  notes: "Fires when functionality for an object appears or disappears. Args: object (string), newobject (bool), accesslevel (enum)."

- id: edid_listchanged_l1displayport
  source: "signal image.connector.l1displayport.edid.listchanged"
  notes: "EDID list changed for L1 DisplayPort."

- id: edid_listchanged_l1hdbaset1
  source: "signal image.connector.l1hdbaset1.edid.listchanged"

- id: edid_listchanged_l1hdbaset2
  source: "signal image.connector.l1hdbaset2.edid.listchanged"

- id: edid_listchanged_l1hdmi
  source: "signal image.connector.l1hdmi.edid.listchanged"

- id: edid_listchanged_l2displayport
  source: "signal image.connector.l2displayporta/b/c/d.edid.listchanged"
  notes: "UDX-4K32 / UDX-4K22 only per source."

- id: blacklevel_file_listchanged
  source: "signal image.processing.blacklevel.file.listchanged"

- id: blend_file_listchanged
  source: "signal image.processing.blend.file.listchanged"

- id: warp_file_listchanged
  source: "signal image.processing.warp.file.listchanged"

- id: warpgrid_changed
  source: "signal image.processing.warpgrid.changed"
  notes: "Fired when the grid changes (no payload)."

- id: warpgrid_gridchanged
  source: "signal image.processing.warpgrid.gridchanged"
  notes: "Payload: grid [ {x float, y float} ]."

- id: testpattern_added
  source: "signal image.testpattern.added"
- id: testpattern_changed
  source: "signal image.testpattern.changed"
- id: testpattern_removed
  source: "signal image.testpattern.removed"
- id: testpattern_file_listchanged
  source: "signal image.testpattern.file.listchanged"

- id: network_added
  source: "signal network.added"
  notes: "Args: id (string, e.g. 'wifi1')."
- id: network_removed
  source: "signal network.removed"

- id: notification_emitted
  source: "signal notification.emitted"
  notes: "Payload: notification object (severity, id, code, timestamp, message, timeout, actions)."
- id: notification_dismissed
  source: "signal notification.dismissed"
  notes: "Args: id (string), response (enum)."

- id: identificationchanged
  source: "signal system.identificationchanged"
  notes: "Args: identification (string)."

- id: licensechanged
  source: "signal system.license.licensechanged"
  notes: "No arguments."

- id: performed
  source: "signal system.performed"
  notes: "Fires when one or more reset domains have completed. May be emitted multiple times. Args: domains [ enum ]."

- id: ui_settings_added
  source: "signal ui.settings.added"
  notes: "Args: key (string), value (string)."
- id: ui_settings_changed
  source: "signal ui.settings.changed"
- id: ui_settings_removed
  source: "signal ui.settings.removed"
```

## Macros
```yaml
# Power on sequence (source: Power on section).
- id: power_on_sequence
  description: |
    Verify the projector is in standby or ready state before issuing poweron.
    From the source: "If the projector already is on, or if it's in transition
    between states, nothing will happen. Therefore, it's good practice to verify
    that the projector state is either standby or ready before issuing the
    power on command."
  steps:
    - get_property: system.state
    - if_state_in: [standby, ready]
      then: call: system.poweron

# Power off sequence (source: Power off section).
- id: power_off_sequence
  description: |
    Verify the projector is in the on state before issuing poweroff. From the
    source: "If the projector already is off, or it's in transition between
    states, nothing will happen. Therefore, it's good practice to verify that
    the projector state is on before issuing the power off command."
  steps:
    - get_property: system.state
    - if_state: on
      then: call: system.poweroff

# ECO wake-up sequence (source: ECO mode section). One of four wake methods:
# Wake-on-LAN to MAC, IR remote, keypad, or serial ASCII ":POWR1\r".
- id: eco_wakeup
  description: |
    To wake a projector in ECO mode, either send a Wake-on-LAN packet to the
    projector's MAC address, press the power button on the IR remote or keypad,
    or send the ASCII string ":POWR1\r" on the RS-232 serial port.
  steps:
    - method: serial_or_wol
      command: ":POWR1\r"
      notes: "RS-232 only ASCII shortcut."

# Source switch sequence (source: Set the active source section).
- id: set_active_source
  description: |
    First call image.source.list to enumerate available source names, then
    set image.window.main.source via property.set using one of the returned
    names.
  steps:
    - call: image.source.list
    - choose_value_from: result
    - set_property: image.window.main.source
      value: <chosen source name>

# Warp grid upload + activate (source: Warping with grid files section).
- id: warp_upload_and_activate
  description: |
    Upload a warp grid file via HTTP POST, then select the file via JSON-RPC
    and enable grid warping.
  steps:
    - upload: |
        curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer
    - set_property: image.processing.warp.file.selected
      value: warp.xml
    - set_property: image.processing.warp.file.enable
      value: true
    - set_property: image.processing.warp.enable
      value: true

# Blend mask upload + activate (source: Blending with images section).
- id: blend_upload_and_activate
  description: |
    Upload a grayscale blend mask (PNG/JPEG/TIFF, up to 16-bit), then select
    and enable. Mask resolution must match the projector's blend layer
    resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).
  steps:
    - upload: |
        curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer
    - set_property: image.processing.blend.file.selected
      value: mask.png
    - set_property: image.processing.blend.file.enable
      value: true

# Blacklevel upload + activate (source: Black level adjustment section).
- id: blacklevel_upload_and_activate
  description: |
    Upload a grayscale black level mask, select, and enable.
  steps:
    - upload: |
        curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer
    - set_property: image.processing.blacklevel.file.selected
      value: blacklevel.png
    - set_property: image.processing.blacklevel.file.enable
      value: true

# Source + signal tracking (source: Source and signal updates section).
- id: track_source_changes
  description: |
    Subscribe to image.window.main.source for change notifications. Source
    delivers two notifications on switch: first the previously selected source
    is deselected (empty string), then the new source is reported.
  steps:
    - subscribe: image.window.main.source
    - on_property_changed: image.window.main.source
      treat_empty_string_as: source_deselected

# Firmware upload (source: firmware.transfer file endpoint).
- id: firmware_upload
  description: |
    Upload firmware via HTTP POST to /api/firmware/transfer. Use
    firmware.schedulecomponentupgrade to mark for upgrade at next reboot.
  steps:
    - upload: |
        curl -F file=@firmware.dat http://<projector-ip>/api/firmware/transfer
    - call: firmware.schedulecomponentupgrade
    - call: system.reboot

# Reset selected domains and wait for completion (source: system.reset section).
- id: reset_domains_and_wait
  description: |
    system.reset is asynchronous. The completion of one or more domains is
    signalled by the system.performed signal. Subsequent calls to
    system.resetall or system.reset will fail until all requested domains
    have completed.
  steps:
    - call: system.reset
      params: { domains: [<list>] }
    - subscribe: system.performed
    - on_signal: system.performed
      wait_until: all_requested_domains_reported
```

## Safety
```yaml
confirmation_required_for:
  - system.poweron
  - system.poweroff
  - system.reboot
  - system.reset
  - system.resetall
  - firmware.schedulecomponentupgrade
interlocks: []
# UNRESOLVED: No explicit safety warnings, interlock procedures, or power-on
# sequencing requirements are stated in the source. The only cautionary notes
# relate to: (1) verifying system.state before poweron/poweroff, (2) not
# flooding the server with repeated property.set calls without waiting for
# confirmation, (3) ECO mode requires special wake-up sequence, (4)
# system.reset is asynchronous and subsequent resets will fail until completion.
```

## Notes
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage/current/power specifications not stated. The source only documents the JSON-RPC control interface, not the projector's electrical specifications. -->
<!-- UNRESOLVED: Barco Medea-specific command applicability. The refined source document is the UDX-family catalog (Pulse API v1.7, 2019-03-04). Entries marked "MODELS All" in the source are taken to apply to Medea. Entries marked "MODELS UDX-4K32", "MODELS UDX-4K22", or "MODELS UDX-W32" are listed but flagged as UDX-specific; their applicability to Medea was not directly confirmed by the supplied source. Notable UDX-only entries: optics.focus.*, optics.zoom.*, system.license.option.flexbrightness.*, dmx.monitor.channel03.value through channel14.value, l2displayporta/b/c/d connectors and their properties, peripheral.frame.* methods, and image.color.p7.native.normal.*. -->
<!-- UNRESOLVED: source connector list will vary by projector model per image.source.list. The catalog example shows DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI. Medea's actual connector set is not enumerated in the source. -->
<!-- UNRESOLVED: authentication passcode value not stated. The source shows `98765` as a literal example value in the documentation. -->
<!-- Source: "The best way to know the exact API of your projector is to do an introspection as described in the previous chapters." Parts of the API are dynamic and depend on peripherals/configuration. -->
<!-- Source: "if a lens is mounted that does not have motorized zoom, that part of the API will not be available, even if it's shown here." -->
<!-- Source: "It is best practice to wait for the confirmation of the property.set before setting the same property again. Continuously setting the same property without waiting for confirmation may flood the server with unnecessary request and may reduce performance." -->
<!-- ECO mode wake-up methods (source): Wake-on-LAN to MAC, IR remote power button, keypad power button, or serial ASCII ":POWR1\r". -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T04:26:26.016Z
last_checked_at: 2026-06-02T17:21:38.388Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:38.388Z
matched_actions: 158
action_count: 158
confidence: medium
summary: "All 158 spec actions match source-documented JSON-RPC methods verbatim; transport values confirmed; 6 peripheral.frame UDX-4K22-only methods are in source but not in spec. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- peripheral.frame.horizontal.calibrate
- peripheral.frame.horizontal.runforward
- peripheral.frame.horizontal.runreverse
- peripheral.frame.horizontal.stepforward
- peripheral.frame.horizontal.stepreverse
- peripheral.frame.horizontal.stop
- "The refined source is the UDX-family \"RS232 and Network Command Catalog\" (Pulse API v1.7, 2019-03-04). Barco Medea shares the Pulse API per Barco product documentation, but the canonical Medea command catalog was not provided. Entries marked \"MODELS All\" in the source are taken to apply to Medea; entries tagged \"MODELS UDX-4K32 / UDX-4K22 / UDX-W32\" are listed for completeness but noted as not Medea-verified."
- "No explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility not stated in source."
- "voltage/current/power specifications not stated. The source only documents the JSON-RPC control interface, not the projector's electrical specifications."
- "Barco Medea-specific command applicability. The refined source document is the UDX-family catalog (Pulse API v1.7, 2019-03-04). Entries marked \"MODELS All\" in the source are taken to apply to Medea. Entries marked \"MODELS UDX-4K32\", \"MODELS UDX-4K22\", or \"MODELS UDX-W32\" are listed but flagged as UDX-specific; their applicability to Medea was not directly confirmed by the supplied source. Notable UDX-only entries: optics.focus.*, optics.zoom.*, system.license.option.flexbrightness.*, dmx.monitor.channel03.value through channel14.value, l2displayporta/b/c/d connectors and their properties, peripheral.frame.* methods, and image.color.p7.native.normal.*."
- "source connector list will vary by projector model per image.source.list. The catalog example shows DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI. Medea's actual connector set is not enumerated in the source."
- "authentication passcode value not stated. The source shows `98765` as a literal example value in the documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
