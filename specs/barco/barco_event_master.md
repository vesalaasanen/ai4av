---
spec_id: admin/barco-pulse-udx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Pulse/UDX Projector Control Spec"
manufacturer: Barco
model_family: Pulse
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Pulse
    - UDX
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-23T10:43:30.227Z
last_checked_at: 2026-06-23T10:43:30.227Z
generated_at: 2026-06-23T10:43:30.227Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document heading references \"Event Master\" but content describes the Pulse/UDX JSON-RPC API; entity_id barco_event_master retained per task brief"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-23T10:43:30.227Z
  matched_actions: 365
  action_count: 365
  confidence: medium
  summary: "All 365 spec actions (344 Actions + 21 Feedbacks) match verbatim JSON-RPC methods/properties; transport port 9090 + 19200 8N1 confirmed. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Barco Pulse/UDX Projector Control Spec

## Summary

The Barco Pulse/UDX projector exposes a JSON-RPC 2.0 API accessible over TCP/IP on port 9090 or via RS-232 serial. The API provides full control of power, source selection, image parameters (brightness, contrast, saturation, gamma, sharpness, intensity), optics (focus, zoom, lens shift, shutter), illumination, warp/blend/black-level geometry, test patterns, DMX, environment monitoring, and system management. Authentication is optional for normal end-user access; a numeric passcode is required only for elevated access levels.

<!-- UNRESOLVED: source document heading references "Event Master" but content describes the Pulse/UDX JSON-RPC API; entity_id barco_event_master retained per task brief -->

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
  type: optional  # source states auth can be skipped for normal end-user access; required for elevated access levels using a numeric passcode
framing: "JSON-RPC 2.0 objects, newline-delimited over TCP or serial"
```

## Traits

```yaml
- powerable       # system.poweron / system.poweroff methods documented
- routable        # image.window.main.source property set/get; image.source.list method
- queryable       # property.get method returns state for all properties
- levelable       # image.brightness, image.contrast, image.saturation, image.gamma, image.intensity, illumination.sources.laser.power
```

## Actions

```yaml
# Core JSON-RPC wire protocol:
#   method: property.set  ->  params: {property: "<name>", value: <val>}
#   method: property.get  ->  params: {property: "<name>"}
#   method: property.subscribe  ->  params: {property: "<name>" | ["<name>", ...]}
#   method: property.unsubscribe  ->  params: {property: "<name>" | ["<name>", ...]}
#   method: signal.subscribe  ->  params: {signal: "<name>" | ["<name>", ...]}
#   method: signal.unsubscribe  ->  params: {signal: "<name>" | ["<name>", ...]}
#   All requests include "jsonrpc": "2.0" and an optional "id" field.

# ── System / Power ───────────────────────────────────────────────────────────

- id: system_power_on
  label: Power On
  kind: action
  method: "system.poweron"
  params: []

- id: system_power_off
  label: Power Off
  kind: action
  method: "system.poweroff"
  params: []

- id: system_reboot
  label: Reboot Projector
  kind: action
  method: "system.reboot"
  params: []

- id: system_get_state
  label: Get System State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.state"
  notes: "Returns one of: boot, eco, standby, ready, conditioning, on, deconditioning, error"

- id: system_subscribe_state
  label: Subscribe to System State Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: string
      value: "system.state"

- id: system_goto_eco
  label: Set Device to ECO State
  kind: action
  method: "system.gotoeco"
  params: []

- id: system_goto_ready
  label: Set Device to Ready State
  kind: action
  method: "system.gotoready"
  params: []

- id: system_activity
  label: Signal User Activity (reset timeout countdown)
  kind: action
  method: "system.activity"
  params: []

- id: system_reset
  label: Reset Selected Domains
  kind: action
  method: "system.reset"
  params:
    - name: domains
      type: "array of enum"
      description: "One or more of: ImageConnector, ImageSource, ImageFeatures, ImageRealColor, ImageWarp, ImageBlend, ImageOrientation, ImageResolution, ImageStereo, ImageDisplay, ImageTestPattern, ImageConvergence, UserInterface, Optics, Illumination, Network, Screen, System, LightMeasurement, Dmx"

- id: system_reset_all
  label: Reset All Domains
  kind: action
  method: "system.resetall"
  params: []

- id: system_get_identification
  label: Get System Identification
  kind: query
  method: "system.getidentification"
  params: []

- id: system_get_identifications
  label: Get All System Identifications
  kind: query
  method: "system.getidentifications"
  params: []

- id: system_get_system_date
  label: Get System Date (UTC)
  kind: query
  method: "system.getsystemdate"
  params: []

- id: system_get_board_list
  label: Get Board List
  kind: query
  method: "system.boards.getboardlist"
  params: []

- id: system_get_board_info
  label: Get Board Info
  kind: query
  method: "system.boards.getboardinfo"
  params:
    - name: boardname
      type: string
      description: Name of the board

- id: system_get_module_info
  label: Get Module Info
  kind: query
  method: "system.boards.getmoduleinfo"
  params:
    - name: boardname
      type: string
      description: Name of the board

- id: system_get_missing_board_list
  label: Get Missing Board List
  kind: query
  method: "system.boards.getmissingboardlist"
  params: []

- id: system_list_reset_domains
  label: List Available Reset Domains
  kind: query
  method: "system.listresetdomains"
  params: []

- id: system_get_state_property
  label: Get system.state Property Value
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.state"

- id: system_get_model_name
  label: Get Model Name
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.modelname"

- id: system_get_family_name
  label: Get Family Name
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.familyname"

- id: system_get_serial_number
  label: Get Serial Number
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.serialnumber"

- id: system_get_article_number
  label: Get Article Number
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.articlenumber"

- id: system_get_firmware_version
  label: Get Firmware Version
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.firmwareversion"

- id: system_set_initial_state
  label: Set Initial State (on boot)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.initialstate"
    - name: value
      type: enum
      description: "One of: boot, eco, standby, ready, conditioning, on, service, deconditioning, error"

- id: system_eco_enable_set
  label: Enable/Disable ECO State
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.eco.enable"
    - name: value
      type: bool

- id: system_standby_enable_set
  label: Enable/Disable Standby State
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.standby.enable"
    - name: value
      type: bool

- id: system_standby_timeout_duration_set
  label: Set Standby Timeout Duration (seconds)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.standby.timeout.duration"
    - name: value
      type: int

- id: system_standby_timeout_enable_set
  label: Enable/Disable Standby Timeout
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.standby.timeout.enable"
    - name: value
      type: bool

- id: system_on_timeout_duration_set
  label: Set On-State Timeout Duration (seconds)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.on.timeout.duration"
    - name: value
      type: int

- id: system_on_timeout_enable_set
  label: Enable/Disable On-State Timeout
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.on.timeout.enable"
    - name: value
      type: bool

- id: system_ready_timeout_duration_set
  label: Set Ready-State Timeout Duration (seconds)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.ready.timeout.duration"
    - name: value
      type: int

- id: system_ready_timeout_enable_set
  label: Enable/Disable Ready-State Timeout
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.ready.timeout.enable"
    - name: value
      type: bool

- id: system_error_timeout_duration_set
  label: Set Error-State Timeout Duration (seconds)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.error.timeout.duration"
    - name: value
      type: int

- id: system_error_timeout_enable_set
  label: Enable/Disable Error-State Timeout
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "system.error.timeout.enable"
    - name: value
      type: bool

# ECO wake via serial (special ASCII command, not JSON-RPC)
- id: eco_wake_serial
  label: Wake from ECO Mode via Serial
  kind: action
  command: ":POWR1\r"
  notes: "ASCII serial command only; used when projector is in ECO mode and cannot accept JSON-RPC. Not applicable over TCP."
  params: []

# ── Authentication ────────────────────────────────────────────────────────────

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  method: "authenticate"
  params:
    - name: code
      type: integer
      description: Numeric passcode for elevated access level
  notes: "Optional for normal end-user access. Required for Power User or higher."

# ── Property Core Methods ─────────────────────────────────────────────────────

- id: property_set
  label: Set Property Value
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      description: Dot-notation property name
    - name: value
      type: any
      description: New value for the property

- id: property_get
  label: Get Property Value
  kind: query
  method: "property.get"
  params:
    - name: property
      type: "string or array of string"
      description: Dot-notation property name, or array of names for multi-get

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: "string or array of string"
      description: Property name(s) to observe

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  method: "property.unsubscribe"
  params:
    - name: property
      type: "string or array of string"
      description: Property name(s) to stop observing

# ── Signal Methods ────────────────────────────────────────────────────────────

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  method: "signal.subscribe"
  params:
    - name: signal
      type: "string or array of string"
      description: Signal name(s) to subscribe to

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  method: "signal.unsubscribe"
  params:
    - name: signal
      type: "string or array of string"
      description: Signal name(s) to unsubscribe from

# ── Introspection ─────────────────────────────────────────────────────────────

- id: introspect
  label: Introspect API Object
  kind: query
  method: "introspect"
  params:
    - name: object
      type: string
      description: "Dot-notation object name; empty string for everything"
    - name: recursive
      type: bool
      description: "If false, only lists object names one level deep (default true)"

# ── Source / Input Selection ──────────────────────────────────────────────────

- id: source_get_active
  label: Get Active Source
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.window.main.source"

- id: source_set_active
  label: Set Active Source
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.window.main.source"
    - name: value
      type: string
      description: "Source name as returned by image.source.list (e.g. \"DisplayPort 1\", \"HDMI\", \"SDI\")"

- id: source_list
  label: List Available Sources
  kind: query
  method: "image.source.list"
  params: []

- id: connector_list
  label: List Available Connectors
  kind: query
  method: "image.connector.list"
  params: []

- id: source_subscribe_active
  label: Subscribe to Active Source Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: string
      value: "image.window.main.source"

- id: window_list
  label: List Available Windows
  kind: query
  method: "image.window.list"
  params: []

- id: window_scaling_mode_set
  label: Set Window Scaling Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.window.main.scalingmode"
    - name: value
      type: enum
      description: "One of: Fill, OneToOne, FillScreen, Stretch"

- id: window_scaling_mode_get
  label: Get Window Scaling Mode
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.window.main.scalingmode"

- id: window_position_set
  label: Set Window Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.window.main.position"
    - name: value
      type: "object {x: int, y: int}"

- id: window_size_set
  label: Set Window Size
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.window.main.size"
    - name: value
      type: "object {width: int, height: int}"

# Source connector listing methods (one per source type)
- id: source_l1displayport_listconnectors
  label: List Connectors for L1 DisplayPort Source
  kind: query
  method: "image.source.l1displayport.listconnectors"
  params: []

- id: source_l1hdbaset1_listconnectors
  label: List Connectors for L1 HDBaseT1 Source
  kind: query
  method: "image.source.l1hdbaset1.listconnectors"
  params: []

- id: source_l1hdbaset2_listconnectors
  label: List Connectors for L1 HDBaseT2 Source
  kind: query
  method: "image.source.l1hdbaset2.listconnectors"
  params: []

- id: source_l1hdmi_listconnectors
  label: List Connectors for L1 HDMI Source
  kind: query
  method: "image.source.l1hdmi.listconnectors"
  params: []

- id: source_l1quadsdi_listconnectors
  label: List Connectors for L1 Quad-SDI Source
  kind: query
  method: "image.source.l1quadsdi.listconnectors"
  params: []

- id: source_l1sdia_listconnectors
  label: List Connectors for L1 SDI-A Source
  kind: query
  method: "image.source.l1sdia.listconnectors"
  params: []

- id: source_l1sdib_listconnectors
  label: List Connectors for L1 SDI-B Source
  kind: query
  method: "image.source.l1sdib.listconnectors"
  params: []

- id: source_l1sdic_listconnectors
  label: List Connectors for L1 SDI-C Source
  kind: query
  method: "image.source.l1sdic.listconnectors"
  params: []

- id: source_l1sdid_listconnectors
  label: List Connectors for L1 SDI-D Source
  kind: query
  method: "image.source.l1sdid.listconnectors"
  params: []

- id: source_l2displayporta_listconnectors
  label: List Connectors for L2 DisplayPort-A Source
  kind: query
  method: "image.source.l2displayporta.listconnectors"
  params: []

- id: source_l2displayportb_listconnectors
  label: List Connectors for L2 DisplayPort-B Source
  kind: query
  method: "image.source.l2displayportb.listconnectors"
  params: []

- id: source_l2displayportc_listconnectors
  label: List Connectors for L2 DisplayPort-C Source
  kind: query
  method: "image.source.l2displayportc.listconnectors"
  params: []

- id: source_l2displayportd_listconnectors
  label: List Connectors for L2 DisplayPort-D Source
  kind: query
  method: "image.source.l2displayportd.listconnectors"
  params: []

- id: source_l2dualdpab_listconnectors
  label: List Connectors for L2 Dual-DP-AB Source
  kind: query
  method: "image.source.l2dualdpab.listconnectors"
  params: []

- id: source_l2dualdpac_listconnectors
  label: List Connectors for L2 Dual-DP-AC Source
  kind: query
  method: "image.source.l2dualdpac.listconnectors"
  params: []

- id: source_l2dualdpbd_listconnectors
  label: List Connectors for L2 Dual-DP-BD Source
  kind: query
  method: "image.source.l2dualdpbd.listconnectors"
  params: []

- id: source_l2dualdpcd_listconnectors
  label: List Connectors for L2 Dual-DP-CD Source
  kind: query
  method: "image.source.l2dualdpcd.listconnectors"
  params: []

- id: source_l2dualheaddpac_listconnectors
  label: List Connectors for L2 Dual-Head-DP-AC Source
  kind: query
  method: "image.source.l2dualheaddpac.listconnectors"
  params: []

- id: source_l2dualheaddpbd_listconnectors
  label: List Connectors for L2 Dual-Head-DP-BD Source
  kind: query
  method: "image.source.l2dualheaddpbd.listconnectors"
  params: []

- id: source_l2dualheaddualdpabcd_listconnectors
  label: List Connectors for L2 Dual-Head-Quad-DP Source
  kind: query
  method: "image.source.l2dualheaddualdpabcd.listconnectors"
  params: []

- id: source_l2quadcolumndp_listconnectors
  label: List Connectors for L2 Quad-Column-DP Source
  kind: query
  method: "image.source.l2quadcolumndp.listconnectors"
  params: []

- id: source_l2quaddp_listconnectors
  label: List Connectors for L2 Quad-DP Source
  kind: query
  method: "image.source.l2quaddp.listconnectors"
  params: []

# ── Image / Picture Settings ──────────────────────────────────────────────────

- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.brightness"
  notes: "Normalized float, 0 = default, range -1..1, precision 0.01"

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.brightness"
    - name: value
      type: float
      description: "Normalized, 0 is default, range -1..1, precision 0.01"

- id: image_brightness_subscribe
  label: Subscribe to Brightness Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: string
      value: "image.brightness"

- id: image_contrast_get
  label: Get Image Contrast
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.contrast"
  notes: "Normalized float, 1 = default, range 0..2, precision 0.01"

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.contrast"
    - name: value
      type: float
      description: "Normalized, 1 is default, range 0..2"

- id: image_saturation_get
  label: Get Image Saturation
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.saturation"
  notes: "Normalized float, 1 = default, range 0..2, precision 0.01"

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.saturation"
    - name: value
      type: float
      description: "Normalized, 1 is default, range 0..2"

- id: image_gamma_get
  label: Get Image Gamma
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.gamma"
  notes: "Float, default 2.2, range 1..3, precision 0.1"

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.gamma"
    - name: value
      type: float
      description: "Default 2.2, range 1..3, precision 0.1"

- id: image_sharpness_get
  label: Get Image Sharpness
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.sharpness"
  notes: "Integer, range -2..8, precision 1"

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.sharpness"
    - name: value
      type: int
      description: "Range -2..8"

- id: image_intensity_get
  label: Get Image Intensity
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.intensity"
  notes: "Float, range 0..1, step 0.1, precision 0.01"

- id: image_intensity_set
  label: Set Image Intensity
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.intensity"
    - name: value
      type: float
      description: "Range 0..1"

- id: image_orientation_get
  label: Get Image Orientation
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.orientation"

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.orientation"
    - name: value
      type: enum
      description: "One of: DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR"

- id: image_resolution_get
  label: Get Current Resolution Description
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.resolution.resolution"

- id: image_resolution_list
  label: List Possible Resolutions
  kind: query
  method: "image.resolution.list"
  params: []

# ── Display Mode ──────────────────────────────────────────────────────────────

- id: image_display_mode_set
  label: Set Desired Display Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.display.desireddisplaymode"
    - name: value
      type: enum
      description: "One of: Mono, AutoStereo, ActiveStereo, NightVision, IGPixelShift"

- id: image_display_mode_get
  label: Get Current Display Mode
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.display.displaymode"

- id: image_display_mode_list
  label: List Possible Display Modes
  kind: query
  method: "image.display.listdisplaymodes"
  params: []

# ── RGB Mode ──────────────────────────────────────────────────────────────────

- id: image_rgbmode_get
  label: Get RGB Mode
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.color.rgbmode.rgbmode"

- id: image_rgbmode_set
  label: Set RGB Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.rgbmode.rgbmode"
    - name: value
      type: enum
      description: "One of: Full, Red, Green, Blue, RedGreen, GreenBlue, BlueRed"

- id: image_rgbmode_next
  label: Cycle to Next RGB Mode
  kind: action
  method: "image.color.rgbmode.nextrgbmode"
  params: []

# ── P7 Color ──────────────────────────────────────────────────────────────────

- id: image_color_p7_mode_set
  label: Set P7 Color Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.mode"
    - name: value
      type: string

- id: image_color_p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  method: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string

- id: image_color_p7_reset_preset
  label: Reset P7 Preset to Default Values
  kind: action
  method: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string

- id: image_color_p7_reset_to_native
  label: Reset P7 Color to Native
  kind: action
  method: "image.color.p7.custom.resettonative"
  params: []

- id: image_color_p7_redgain_set
  label: Set P7 Red Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.redgain"
    - name: value
      type: float

- id: image_color_p7_greengain_set
  label: Set P7 Green Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.greengain"
    - name: value
      type: float

- id: image_color_p7_bluegain_set
  label: Set P7 Blue Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.bluegain"
    - name: value
      type: float

- id: image_color_p7_cyangain_set
  label: Set P7 Cyan Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.cyangain"
    - name: value
      type: float

- id: image_color_p7_magentagain_set
  label: Set P7 Magenta Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.magentagain"
    - name: value
      type: float

- id: image_color_p7_yellowgain_set
  label: Set P7 Yellow Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.yellowgain"
    - name: value
      type: float

- id: image_color_p7_whitegain_set
  label: Set P7 White Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.whitegain"
    - name: value
      type: float

- id: image_color_p7_whitemode_set
  label: Set P7 White Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.whitemode"
    - name: value
      type: enum
      description: "One of: Coordinates, Temperature"

- id: image_color_p7_whitetemperature_set
  label: Set P7 White Temperature
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.color.p7.custom.whitetemperature"
    - name: value
      type: int
      description: "Range 3200..13000, step 100"

# ── Convergence ───────────────────────────────────────────────────────────────

- id: image_convergence_red_set
  label: Set Red Convergence Offset
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.convergence.red"
    - name: value
      type: "object {X: {base: int}, Y: {base: int}}"
      description: "Horizontal and vertical convergence offsets, range -2..2"

- id: image_convergence_green_set
  label: Set Green Convergence Offset
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.convergence.green"
    - name: value
      type: "object {X: {base: int}, Y: {base: int}}"

- id: image_convergence_blue_set
  label: Set Blue Convergence Offset
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.convergence.blue"
    - name: value
      type: "object {X: {base: int}, Y: {base: int}}"

# ── Illumination ──────────────────────────────────────────────────────────────

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.state"
  notes: "Returns On or Off"

- id: illumination_state_subscribe
  label: Subscribe to Illumination State Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: string
      value: "illumination.state"

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.power"
  notes: "Target power in percent (float)"

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.power"
    - name: value
      type: float
      description: "Power level in percent"

- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power Changes
  kind: action
  method: "property.subscribe"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.power"

- id: illumination_laser_maxpower_get
  label: Get Laser Maximum Power
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.maxpower"

- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.minpower"

- id: illumination_laser_ispowerlimited_get
  label: Get Whether Laser Power Is Limited
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.ispowerlimited"

- id: illumination_laser_powerlimitreason_get
  label: Get Laser Power Limit Reason
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.sources.laser.powerlimitreason"

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  method: "illumination.laser.getserialnumber"
  params: []

- id: illumination_clo_enable_set
  label: Enable/Disable Constant Light Output (CLO)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "illumination.clo.enable"
    - name: value
      type: bool

- id: illumination_clo_scale_set
  label: Set CLO Scale (percentage of setpoint)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "illumination.clo.scale"
    - name: value
      type: float

- id: illumination_clo_setpoint_set
  label: Set CLO Target Luminosity
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "illumination.clo.setpoint"
    - name: value
      type: float

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  method: "illumination.clo.engage"
  params: []

- id: illumination_clo_availability_get
  label: Get CLO Availability
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.clo.availability"
  notes: "Enum: Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown"

- id: illumination_clo_state_get
  label: Get CLO State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "illumination.clo.state"
  notes: "Enum: Ok, TooDim, TooBright"

# ── Test Patterns ─────────────────────────────────────────────────────────────

- id: testpattern_show_set
  label: Show/Hide Test Pattern
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.testpattern.show"
    - name: value
      type: bool

- id: testpattern_selected_set
  label: Select Test Pattern by ID
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.testpattern.selected"
    - name: value
      type: string
      description: Unique ID of the pattern

- id: testpattern_list
  label: List Available Test Patterns
  kind: query
  method: "image.testpattern.list"
  params: []

- id: testpattern_set_properties
  label: Set Test Pattern Properties
  kind: action
  method: "image.testpattern.setproperties"
  params:
    - name: id
      type: string
      description: Pattern ID
    - name: properties
      type: "array of {key: string, value: string}"

- id: testpattern_file_list
  label: List Custom Uploaded Test Pattern Files
  kind: query
  method: "image.testpattern.file.list"
  params: []

- id: testpattern_file_delete
  label: Delete Custom Test Pattern File
  kind: action
  method: "image.testpattern.file.delete"
  params:
    - name: filename
      type: string

# ── Warp ──────────────────────────────────────────────────────────────────────

- id: warp_enable_set
  label: Enable/Disable All Warp Functions
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.enable"
    - name: value
      type: bool

- id: warp_file_enable_set
  label: Enable/Disable File Warp
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.file.enable"
    - name: value
      type: bool

- id: warp_file_selected_set
  label: Select Warp Grid File
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.file.selected"
    - name: value
      type: string
      description: Filename of warp grid to activate

- id: warp_file_list
  label: List Available Warp Files
  kind: query
  method: "image.processing.warp.file.list"
  params: []

- id: warp_file_delete
  label: Delete Warp File
  kind: action
  method: "image.processing.warp.file.delete"
  params:
    - name: filename
      type: string

- id: warp_fourcorners_enable_set
  label: Enable/Disable Four-Corners Warp
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.enable"
    - name: value
      type: bool

- id: warp_fourcorners_topleft_set
  label: Set Four-Corners Warp Top-Left
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.topleft"
    - name: value
      type: "object {x: int, y: int}"

- id: warp_fourcorners_topright_set
  label: Set Four-Corners Warp Top-Right
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.topright"
    - name: value
      type: "object {x: int, y: int}"

- id: warp_fourcorners_bottomleft_set
  label: Set Four-Corners Warp Bottom-Left
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.bottomleft"
    - name: value
      type: "object {x: int, y: int}"

- id: warp_fourcorners_bottomright_set
  label: Set Four-Corners Warp Bottom-Right
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.bottomright"
    - name: value
      type: "object {x: int, y: int}"

- id: warp_fourcorners_getscaledcorners
  label: Get Four-Corners Scaled to Given Resolution
  kind: query
  method: "image.processing.warp.fourcorners.getscaledcorners"
  params:
    - name: resolution
      type: "object {x: int, y: int}"

- id: warp_fourcorners_screenwidth_set
  label: Set Four-Corners Screen Width
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.screenwidth"
    - name: value
      type: float

- id: warp_fourcorners_screenheight_set
  label: Set Four-Corners Screen Height
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.fourcorners.screenheight"
    - name: value
      type: float

- id: warp_bow_enable_set
  label: Enable/Disable Bow Warp
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.enable"
    - name: value
      type: bool

- id: warp_bow_symmetric_set
  label: Enable/Disable Bow Warp Symmetric Mode
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.symmetric"
    - name: value
      type: bool

- id: warp_bow_topleftu_set
  label: Set Bow Warp Top-Left U Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.topleftu"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_topleftv_set
  label: Set Bow Warp Top-Left V Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.topleftv"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_toprightu_set
  label: Set Bow Warp Top-Right U Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.toprightu"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_toprightv_set
  label: Set Bow Warp Top-Right V Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.toprightv"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_bottomleftu_set
  label: Set Bow Warp Bottom-Left U Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.bottomleftu"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_bottomleftv_set
  label: Set Bow Warp Bottom-Left V Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.bottomleftv"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_bottomrightu_set
  label: Set Bow Warp Bottom-Right U Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.bottomrightu"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_bow_bottomrightv_set
  label: Set Bow Warp Bottom-Right V Vector
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.warp.bow.bottomrightv"
    - name: value
      type: "object {angle: float, length: float}"

- id: warp_warpgrid_getgrid
  label: Get Warp Grid Points (normalized)
  kind: query
  method: "image.processing.warpgrid.getgrid"
  params: []

- id: warp_warpgrid_getgridsize
  label: Get Warp Grid Size
  kind: query
  method: "image.processing.warpgrid.getgridsize"
  params: []

- id: warp_warpgrid_getscaledgrid
  label: Get Warp Grid Scaled to Resolution
  kind: query
  method: "image.processing.warpgrid.getscaledgrid"
  params:
    - name: resolution
      type: "object {x: int, y: int}"

- id: warp_warpscaledpoints
  label: Warp Scaled Points (returns warped equivalents)
  kind: query
  method: "image.processing.warp.warpscaledpoints"
  params:
    - name: points
      type: "array of {X: float, Y: float}"
    - name: resolution
      type: "object {X: float, Y: float}"

# ── Blend ─────────────────────────────────────────────────────────────────────

- id: blend_file_enable_set
  label: Enable/Disable File Blend
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.enable"
    - name: value
      type: bool

- id: blend_file_selected_set
  label: Select Blend Mask File(s)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.file.selected"
    - name: value
      type: "array of string"

- id: blend_file_list
  label: List Available Blend Files
  kind: query
  method: "image.processing.blend.file.list"
  params: []

- id: blend_file_delete
  label: Delete Blend File
  kind: action
  method: "image.processing.blend.file.delete"
  params:
    - name: filename
      type: string

- id: blend_basicblend_enable_set
  label: Enable/Disable Basic Blend
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.basicblend.enable"
    - name: value
      type: bool

- id: blend_basicblend_left_set
  label: Set Basic Blend Left Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.basicblend.left"
    - name: value
      type: "object {Start: int, Width: int}"

- id: blend_basicblend_right_set
  label: Set Basic Blend Right Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.basicblend.right"
    - name: value
      type: "object {Start: int, Width: int}"

- id: blend_basicblend_top_set
  label: Set Basic Blend Top Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.basicblend.top"
    - name: value
      type: "object {Start: int, Width: int}"

- id: blend_basicblend_bottom_set
  label: Set Basic Blend Bottom Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.basicblend.bottom"
    - name: value
      type: "object {Start: int, Width: int}"

- id: blend_basicblend_getblendarea
  label: Get Basic Blend Area (four boxes)
  kind: query
  method: "image.processing.blend.basicblend.getblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: blend_basicblend_getwarpedblendarea
  label: Get Warped Basic Blend Area
  kind: query
  method: "image.processing.blend.basicblend.getwarpedblendarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: blend_scurve_set
  label: Set Blend S-Curve Exponent
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blend.scurve"
    - name: value
      type: float
      description: "Range 1..4, precision 0.1"

# ── Black Level ───────────────────────────────────────────────────────────────

- id: blacklevel_file_enable_set
  label: Enable/Disable Black Level File Correction
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.enable"
    - name: value
      type: bool

- id: blacklevel_file_selected_set
  label: Select Black Level Correction File
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.file.selected"
    - name: value
      type: string

- id: blacklevel_file_list
  label: List Available Black Level Correction Files
  kind: query
  method: "image.processing.blacklevel.file.list"
  params: []

- id: blacklevel_file_delete
  label: Delete Black Level Correction File
  kind: action
  method: "image.processing.blacklevel.file.delete"
  params:
    - name: filename
      type: string

- id: blacklevel_basicblacklevel_enable_set
  label: Enable/Disable Basic Black Level
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.enable"
    - name: value
      type: bool

- id: blacklevel_basicblacklevel_level_set
  label: Set Basic Black Level
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.level"
    - name: value
      type: int
      description: "Range 0..65535"

- id: blacklevel_basicblacklevel_left_set
  label: Set Basic Black Level Left Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.left"
    - name: value
      type: int

- id: blacklevel_basicblacklevel_right_set
  label: Set Basic Black Level Right Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.right"
    - name: value
      type: int

- id: blacklevel_basicblacklevel_top_set
  label: Set Basic Black Level Top Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.top"
    - name: value
      type: int

- id: blacklevel_basicblacklevel_bottom_set
  label: Set Basic Black Level Bottom Edge
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.basicblacklevel.bottom"
    - name: value
      type: int

- id: blacklevel_redgain_set
  label: Set Black Level Red Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.redgain"
    - name: value
      type: float
      description: "Range 0..1, precision 0.001"

- id: blacklevel_greengain_set
  label: Set Black Level Green Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.greengain"
    - name: value
      type: float

- id: blacklevel_bluegain_set
  label: Set Black Level Blue Gain
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.blacklevel.bluegain"
    - name: value
      type: float

- id: blacklevel_basicblacklevel_getblacklevelarea
  label: Get Basic Black Level Area
  kind: query
  method: "image.processing.blacklevel.basicblacklevel.getblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

- id: blacklevel_basicblacklevel_getwarpedblacklevelarea
  label: Get Warped Basic Black Level Area
  kind: query
  method: "image.processing.blacklevel.basicblacklevel.getwarpedblacklevelarea"
  params:
    - name: resolution_width
      type: float
    - name: resolution_height
      type: float

# ── Transport Delay ───────────────────────────────────────────────────────────

- id: transportdelay_desired_set
  label: Set Desired Transport Delay
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.processing.transportdelay.desired"
    - name: value
      type: int

- id: transportdelay_actual_get
  label: Get Actual Transport Delay
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.processing.transportdelay.actual"

- id: transportdelay_minimum_get
  label: Get Minimum Transport Delay
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "image.processing.transportdelay.minimum"

# ── Stereo ────────────────────────────────────────────────────────────────────

- id: stereo_glassync_delay_set
  label: Set Stereo Glass Sync Delay (us)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.stereo.glassync.delay"
    - name: value
      type: int

- id: stereo_glassync_invert_set
  label: Set Stereo Glass Sync Invert
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.stereo.glassync.invert"
    - name: value
      type: bool

- id: stereo_swapframepair_set
  label: Set Stereo Swap Frame Pair
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "image.stereo.swapframepair"
    - name: value
      type: bool

- id: stereo_listdarktime
  label: List All Possible Dark-Time Values (us)
  kind: query
  method: "image.stereo.listdarktime"
  params: []

# ── EDID ──────────────────────────────────────────────────────────────────────

- id: edid_list_l1displayport
  label: List EDID Selections for L1 DisplayPort
  kind: query
  method: "image.connector.l1displayport.edid.list"
  params: []

- id: edid_list_l1hdbaset1
  label: List EDID Selections for L1 HDBaseT1
  kind: query
  method: "image.connector.l1hdbaset1.edid.list"
  params: []

- id: edid_list_l1hdbaset2
  label: List EDID Selections for L1 HDBaseT2
  kind: query
  method: "image.connector.l1hdbaset2.edid.list"
  params: []

- id: edid_list_l1hdmi
  label: List EDID Selections for L1 HDMI
  kind: query
  method: "image.connector.l1hdmi.edid.list"
  params: []

- id: edid_list_l2displayporta
  label: List EDID Selections for L2 DisplayPort-A
  kind: query
  method: "image.connector.l2displayporta.edid.list"
  params: []

- id: edid_list_l2displayportb
  label: List EDID Selections for L2 DisplayPort-B
  kind: query
  method: "image.connector.l2displayportb.edid.list"
  params: []

- id: edid_list_l2displayportc
  label: List EDID Selections for L2 DisplayPort-C
  kind: query
  method: "image.connector.l2displayportc.edid.list"
  params: []

- id: edid_list_l2displayportd
  label: List EDID Selections for L2 DisplayPort-D
  kind: query
  method: "image.connector.l2displayportd.edid.list"
  params: []

# ── Optics / Lens ─────────────────────────────────────────────────────────────

- id: optics_focus_position_set
  label: Set Focus Target Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "optics.focus.target"
    - name: value
      type: int

- id: optics_focus_position_get
  label: Get Current Focus Position
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "optics.focus.position"

- id: optics_focus_runforward
  label: Run Focus Motor Forward
  kind: action
  method: "optics.focus.runforward"
  params: []

- id: optics_focus_runreverse
  label: Run Focus Motor Reverse
  kind: action
  method: "optics.focus.runreverse"
  params: []

- id: optics_focus_runforwardtime
  label: Run Focus Motor Forward for X Milliseconds
  kind: action
  method: "optics.focus.runforwardtime"
  params: []

- id: optics_focus_runreversetime
  label: Run Focus Motor Reverse for X Milliseconds
  kind: action
  method: "optics.focus.runreversetime"
  params: []

- id: optics_focus_stepforward
  label: Step Focus Motor Forward
  kind: action
  method: "optics.focus.stepforward"
  params: []

- id: optics_focus_stepreverse
  label: Step Focus Motor Reverse
  kind: action
  method: "optics.focus.stepreverse"
  params: []

- id: optics_focus_stop
  label: Stop Focus Motor
  kind: action
  method: "optics.focus.stop"
  params: []

- id: optics_focus_calibrate
  label: Calibrate Focus Motor
  kind: action
  method: "optics.focus.calibrate"
  params: []

- id: optics_focus_addlocation
  label: Add Current Focus Position to Named Location
  kind: action
  method: "optics.focus.addlocation"
  params:
    - name: location
      type: string

- id: optics_focus_setlocation
  label: Move Focus to Named Location
  kind: action
  method: "optics.focus.setlocation"
  params:
    - name: location
      type: string

- id: optics_zoom_position_set
  label: Set Zoom Target Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "optics.zoom.target"
    - name: value
      type: int

- id: optics_zoom_position_get
  label: Get Current Zoom Position
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "optics.zoom.position"

- id: optics_zoom_runforward
  label: Run Zoom Motor Forward
  kind: action
  method: "optics.zoom.runforward"
  params: []

- id: optics_zoom_runreverse
  label: Run Zoom Motor Reverse
  kind: action
  method: "optics.zoom.runreverse"
  params: []

- id: optics_zoom_runforwardtime
  label: Run Zoom Motor Forward for X Milliseconds
  kind: action
  method: "optics.zoom.runforwardtime"
  params: []

- id: optics_zoom_runreversetime
  label: Run Zoom Motor Reverse for X Milliseconds
  kind: action
  method: "optics.zoom.runreversetime"
  params: []

- id: optics_zoom_stepforward
  label: Step Zoom Motor Forward
  kind: action
  method: "optics.zoom.stepforward"
  params: []

- id: optics_zoom_stepreverse
  label: Step Zoom Motor Reverse
  kind: action
  method: "optics.zoom.stepreverse"
  params: []

- id: optics_zoom_stop
  label: Stop Zoom Motor
  kind: action
  method: "optics.zoom.stop"
  params: []

- id: optics_zoom_calibrate
  label: Calibrate Zoom Motor
  kind: action
  method: "optics.zoom.calibrate"
  params: []

- id: optics_zoom_addlocation
  label: Add Current Zoom Position to Named Location
  kind: action
  method: "optics.zoom.addlocation"
  params:
    - name: location
      type: string

- id: optics_zoom_setlocation
  label: Move Zoom to Named Location
  kind: action
  method: "optics.zoom.setlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_h_target_set
  label: Set Horizontal Lens Shift Target Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "optics.lensshift.horizontal.target"
    - name: value
      type: int

- id: optics_lensshift_h_position_get
  label: Get Current Horizontal Lens Shift Position
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "optics.lensshift.horizontal.position"

- id: optics_lensshift_h_runforward
  label: Run Horizontal Lens Shift Motor Forward
  kind: action
  method: "optics.lensshift.horizontal.runforward"
  params: []

- id: optics_lensshift_h_runreverse
  label: Run Horizontal Lens Shift Motor Reverse
  kind: action
  method: "optics.lensshift.horizontal.runreverse"
  params: []

- id: optics_lensshift_h_runforwardtime
  label: Run Horizontal Lens Shift Motor Forward for X ms
  kind: action
  method: "optics.lensshift.horizontal.runforwardtime"
  params: []

- id: optics_lensshift_h_runreversetime
  label: Run Horizontal Lens Shift Motor Reverse for X ms
  kind: action
  method: "optics.lensshift.horizontal.runreversetime"
  params: []

- id: optics_lensshift_h_stepforward
  label: Step Horizontal Lens Shift Motor Forward
  kind: action
  method: "optics.lensshift.horizontal.stepforward"
  params: []

- id: optics_lensshift_h_stepreverse
  label: Step Horizontal Lens Shift Motor Reverse
  kind: action
  method: "optics.lensshift.horizontal.stepreverse"
  params: []

- id: optics_lensshift_h_stop
  label: Stop Horizontal Lens Shift Motor
  kind: action
  method: "optics.lensshift.horizontal.stop"
  params: []

- id: optics_lensshift_h_calibrate
  label: Calibrate Horizontal Lens Shift Motor
  kind: action
  method: "optics.lensshift.horizontal.calibrate"
  params: []

- id: optics_lensshift_h_addlocation
  label: Add Current H Lens Shift Position to Named Location
  kind: action
  method: "optics.lensshift.horizontal.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_h_setlocation
  label: Move Horizontal Lens Shift to Named Location
  kind: action
  method: "optics.lensshift.horizontal.setlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_v_target_set
  label: Set Vertical Lens Shift Target Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "optics.lensshift.vertical.target"
    - name: value
      type: int

- id: optics_lensshift_v_position_get
  label: Get Current Vertical Lens Shift Position
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "optics.lensshift.vertical.position"

- id: optics_lensshift_v_runforward
  label: Run Vertical Lens Shift Motor Forward
  kind: action
  method: "optics.lensshift.vertical.runforward"
  params: []

- id: optics_lensshift_v_runreverse
  label: Run Vertical Lens Shift Motor Reverse
  kind: action
  method: "optics.lensshift.vertical.runreverse"
  params: []

- id: optics_lensshift_v_runforwardtime
  label: Run Vertical Lens Shift Motor Forward for X ms
  kind: action
  method: "optics.lensshift.vertical.runforwardtime"
  params: []

- id: optics_lensshift_v_runreversetime
  label: Run Vertical Lens Shift Motor Reverse for X ms
  kind: action
  method: "optics.lensshift.vertical.runreversetime"
  params: []

- id: optics_lensshift_v_stepforward
  label: Step Vertical Lens Shift Motor Forward
  kind: action
  method: "optics.lensshift.vertical.stepforward"
  params: []

- id: optics_lensshift_v_stepreverse
  label: Step Vertical Lens Shift Motor Reverse
  kind: action
  method: "optics.lensshift.vertical.stepreverse"
  params: []

- id: optics_lensshift_v_stop
  label: Stop Vertical Lens Shift Motor
  kind: action
  method: "optics.lensshift.vertical.stop"
  params: []

- id: optics_lensshift_v_calibrate
  label: Calibrate Vertical Lens Shift Motor
  kind: action
  method: "optics.lensshift.vertical.calibrate"
  params: []

- id: optics_lensshift_v_addlocation
  label: Add Current V Lens Shift Position to Named Location
  kind: action
  method: "optics.lensshift.vertical.addlocation"
  params:
    - name: location
      type: string

- id: optics_lensshift_v_setlocation
  label: Move Vertical Lens Shift to Named Location
  kind: action
  method: "optics.lensshift.vertical.setlocation"
  params:
    - name: location
      type: string

- id: optics_shifttocenter
  label: Shift Lens to Center of Allowed Range
  kind: action
  method: "optics.shifttocenter"
  params: []

- id: optics_shutter_target_set
  label: Set Shutter Position
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "optics.shutter.target"
    - name: value
      type: enum
      description: "One of: Open, Closed"

- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "optics.shutter.position"
  notes: "Returns Open or Closed"

- id: optics_shutter_toggle
  label: Toggle Shutter Position
  kind: action
  method: "optics.shutter.toggle"
  params: []

- id: optics_getvalidlensids
  label: Get Valid Lens IDs
  kind: query
  method: "optics.getvalidlensids"
  params: []

- id: optics_setlensid
  label: Set Active Lens ID
  kind: action
  method: "optics.setlensid"
  params:
    - name: lensid
      type: int
    - name: powerlensid
      type: int

# ── DMX ───────────────────────────────────────────────────────────────────────

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "dmx.mode"

- id: dmx_artnet_enable_set
  label: Enable/Disable ArtNet
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.artnet"
    - name: value
      type: bool

- id: dmx_artnet_enable_get
  label: Get ArtNet Enabled State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "dmx.artnet"

- id: dmx_artnetnet_set
  label: Set ArtNet Net
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.artnetnet"
    - name: value
      type: int

- id: dmx_artnetuniverse_set
  label: Set ArtNet Universe
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.artnetuniverse"
    - name: value
      type: int

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.startchannel"
    - name: value
      type: int
      description: "Range 1..512"

- id: dmx_shutdown_set
  label: Enable/Disable DMX Shutdown
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.shutdown"
    - name: value
      type: bool

- id: dmx_shutdowntimeout_set
  label: Set DMX Shutdown Timeout (minutes)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "dmx.shutdowntimeout"
    - name: value
      type: int

- id: dmx_listchannels
  label: List Available DMX Channel Names
  kind: query
  method: "dmx.listchannels"
  params: []

- id: dmx_listmodes
  label: List All DMX Modes
  kind: query
  method: "dmx.listmodes"
  params: []

# ── Environment / Monitoring ──────────────────────────────────────────────────

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks (temperatures, fans, etc.)
  kind: query
  method: "environment.getcontrolblocks"
  params:
    - name: type
      type: enum
      description: "One of: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock"
    - name: valuetype
      type: enum
      description: "One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any"

- id: environment_getalarminfo
  label: Get Environment Alarm Info
  kind: query
  method: "environment.getalarminfo"
  params: []

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "environment.alarmstate"
  notes: "Enum: Fatal, Error, Alert, Warning, Ok"

# ── Screen ────────────────────────────────────────────────────────────────────

- id: screen_hdrboost_set
  label: Set HDR Boost Intensity
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "screen.hdrboost"
    - name: value
      type: float
      description: "Range 0.8..1.2, step 0.01"

- id: screen_hdrboost_get
  label: Get HDR Boost Intensity
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "screen.hdrboost"

- id: screen_luminance_set
  label: Set Screen Maximum Luminance (cd/m2)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "screen.luminance"
    - name: value
      type: float
      description: "Range 50..10000, step 10"

- id: screen_luminance_get
  label: Get Screen Maximum Luminance (cd/m2)
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "screen.luminance"

# ── Network ───────────────────────────────────────────────────────────────────

- id: network_list
  label: List Network Devices
  kind: query
  method: "network.list"
  params: []

- id: network_hostname_get
  label: Get Network Hostname
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "network.hostname"

- id: network_lan_ip4config_get
  label: Get LAN IPv4 Configuration
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "network.device.lan.ip4config"

- id: network_lan_ip4configmanual_set
  label: Set LAN Manual IPv4 Configuration
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "network.device.lan.ip4configmanual"
    - name: value
      type: "object {Address: string, Mask: string, Gateway: string, NameServers: string}"

- id: network_lan_configuration_set
  label: Set LAN Configuration Method
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "network.device.lan.configuration"
    - name: value
      type: enum
      description: "One of: AUTO, MANUAL"

# ── Statistics ────────────────────────────────────────────────────────────────

- id: statistics_listcounters
  label: List All Statistics Counters
  kind: query
  method: "statistics.listcounters"
  params: []

- id: statistics_laserruntime_getunit
  label: Get Laser Runtime Counter Unit
  kind: query
  method: "statistics.laserruntime.getunit"
  params: []

- id: statistics_laserstrikes_getunit
  label: Get Laser Strikes Counter Unit
  kind: query
  method: "statistics.laserstrikes.getunit"
  params: []

- id: statistics_projectorruntime_getunit
  label: Get Projector Runtime Counter Unit
  kind: query
  method: "statistics.projectorruntime.getunit"
  params: []

- id: statistics_systemtime_getunit
  label: Get System Time Counter Unit
  kind: query
  method: "statistics.systemtime.getunit"
  params: []

- id: statistics_uptime_getunit
  label: Get Uptime Counter Unit
  kind: query
  method: "statistics.uptime.getunit"
  params: []

- id: lightmeasurement_getlightoutput
  label: Get Light Output in Lumens
  kind: query
  method: "lightmeasurement.getlightoutput"
  params: []

# ── Firmware ──────────────────────────────────────────────────────────────────

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  method: "firmware.listcomponents"
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions and Upgrade Status
  kind: query
  method: "firmware.listcomponentversionstatus"
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Firmware Upgrade at Next Reboot
  kind: action
  method: "firmware.schedulecomponentupgrade"
  params: []

# ── Notifications ─────────────────────────────────────────────────────────────

- id: notification_list
  label: List Active Notifications
  kind: query
  method: "notification.list"
  params: []

- id: notification_dismiss
  label: Dismiss a Notification
  kind: action
  method: "notification.dismiss"
  params:
    - name: id
      type: string
    - name: response
      type: enum
      description: "One of: NONE, OK, CANCEL, IGNORE, YES, NO, SUPPRESS"

- id: notification_log
  label: List Saved (Historical) Notifications
  kind: query
  method: "notification.log"
  params:
    - name: minimumseverity
      type: enum
      description: "One of: INFO, CAUTION, WARNING, ERROR, CRITICAL"
    - name: start
      type: int
    - name: count
      type: int

- id: notification_listsuppressed
  label: Get List of Suppressed Notification Codes
  kind: query
  method: "notification.listsuppressed"
  params: []

- id: notification_suppress
  label: Suppress a Notification Code
  kind: action
  method: "notification.suppress"
  params:
    - name: code
      type: string

- id: notification_unsuppress
  label: Stop Suppressing a Notification Code
  kind: action
  method: "notification.unsuppress"
  params:
    - name: code
      type: string

- id: notification_unsuppressall
  label: Stop Suppressing All Notification Codes
  kind: action
  method: "notification.unsuppressall"
  params: []

# ── Remote Control / Key Dispatcher ──────────────────────────────────────────

- id: keydispatcher_sendclickevent
  label: Send Remote Control Key Click (press + release)
  kind: action
  method: "keydispatcher.sendclickevent"
  params:
    - name: key
      type: enum
      description: "One of: RC_SHUTTER_OPEN, RC_SHUTTER_CLOSE, RC_POWER_ON, RC_POWER_OFF, RC_OSD, RC_LCD, RC_PATTERN, RC_RGB, RC_ZOOM_PLUS, RC_ZOOM_MINUS, RC_SHIFT_LEFT, RC_SHIFT_UP, RC_SHIFT_RIGHT, RC_SHIFT_DOWN, RC_FOCUS_PLUS, RC_FOCUS_MINUS, RC_MENU, RC_DEFAULT, RC_BACK, RC_UP, RC_LEFT, RC_OK, RC_RIGHT, RC_DOWN, RC_ADDRESS, RC_INPUT, RC_MACRO, RC_1..RC_0, RC_ASTERISK, RC_NUMBER, KP_LEFT, KP_UP, KP_OK, KP_RIGHT, KP_DOWN, KP_MENU, KP_POWER, KP_BACK, KP_OSD, KP_LENS, KP_PATTERN, KP_SHUTTER, KP_INPUT, KP_STANDBY"

- id: keydispatcher_sendpressevent
  label: Send Remote Control Key Press Event
  kind: action
  method: "keydispatcher.sendpressevent"
  params:
    - name: key
      type: enum
      description: "Same key enum as keydispatcher.sendclickevent"

- id: keydispatcher_sendreleaseevent
  label: Send Remote Control Key Release Event
  kind: action
  method: "keydispatcher.sendreleaseevent"
  params:
    - name: key
      type: enum
      description: "Same key enum as keydispatcher.sendclickevent"

- id: remotecontrol_listsensors
  label: List IR Sensor Object Names
  kind: query
  method: "remotecontrol.listsensors"
  params: []

- id: remotecontrol_address_set
  label: Set Remote Control Address
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "remotecontrol.address"
    - name: value
      type: int
      description: "Range 1..31"

# ── UI / LED / Stealth ────────────────────────────────────────────────────────

- id: ui_stealthmode_set
  label: Set Stealth Mode (all LEDs off when On)
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      value: "ui.stealthmode"
    - name: value
      type: enum
      description: "One of: Off, On"

- id: ui_stealthmode_get
  label: Get Stealth Mode
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "ui.stealthmode"

- id: led_list
  label: List Available LEDs
  kind: query
  method: "led.list"
  params: []

- id: led_activity
  label: Activate LEDs and Reset LED Timeout Counter
  kind: action
  method: "led.activity"
  params: []

- id: ui_settings_get
  label: Get UI Setting Value by Key
  kind: query
  method: "ui.settings.get"
  params:
    - name: key
      type: string

- id: ui_settings_set
  label: Set UI Setting Value
  kind: action
  method: "ui.settings.set"
  params:
    - name: key
      type: string
    - name: value
      type: string

- id: ui_settings_list
  label: List All UI Settings
  kind: query
  method: "ui.settings.list"
  params: []

- id: ui_settings_keys
  label: List All UI Setting Keys
  kind: query
  method: "ui.settings.keys"
  params: []

- id: ui_settings_remove
  label: Remove UI Setting Key
  kind: action
  method: "ui.settings.remove"
  params:
    - name: key
      type: string

- id: ui_settings_geticons
  label: Get Icon Dictionary for Category
  kind: query
  method: "ui.settings.geticons"
  params:
    - name: category
      type: enum
      description: "One of: Source, Connector, TestPattern"

- id: ui_settings_getfonticons
  label: Get Font Icon Dictionary for Category
  kind: query
  method: "ui.settings.getfonticons"
  params:
    - name: category
      type: enum
      description: "One of: Source, Connector, TestPattern"

# ── License ───────────────────────────────────────────────────────────────────

- id: license_applicable_get
  label: Get License Applicability
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.license.applicable"

- id: license_available_get
  label: Get License File Availability
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.license.available"

- id: license_valid_get
  label: Get License File Validity
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.license.valid"

- id: license_options_get
  label: Get License Options Dictionary
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.license.options"

- id: license_flexbrightness_enabled_get
  label: Get Flex Brightness License Option State
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      value: "system.license.option.flexbrightness.enabled"

- id: license_flexbrightness_maxoutput_set
  label: Set Flex Brightness Maximum Light Output
  kind: action
  method: "system.license.option.flexbrightness.setmaximumlightoutput"
  params:
    - name: code
      type: string
    - name: lightoutput
      type: int

- id: license_flexbrightness_getmaxoutputcode
  label: Get Flex Brightness Maximum Light Output Activation Code
  kind: query
  method: "system.license.option.flexbrightness.getmaximumlightoutputcode"
  params:
    - name: lightoutput
      type: int
    - name: signature
      type: string

# ── Peripheral Frame ──────────────────────────────────────────────────────────

- id: peripheral_frame_h_runforward
  label: Run Peripheral Frame Horizontal Motor Forward
  kind: action
  method: "peripheral.frame.horizontal.runforward"
  params: []

- id: peripheral_frame_h_runreverse
  label: Run Peripheral Frame Horizontal Motor Reverse
  kind: action
  method: "peripheral.frame.horizontal.runreverse"
  params: []

- id: peripheral_frame_h_stepforward
  label: Step Peripheral Frame Horizontal Motor Forward
  kind: action
  method: "peripheral.frame.horizontal.stepforward"
  params: []

- id: peripheral_frame_h_stepreverse
  label: Step Peripheral Frame Horizontal Motor Reverse
  kind: action
  method: "peripheral.frame.horizontal.stepreverse"
  params: []

- id: peripheral_frame_h_stop
  label: Stop Peripheral Frame Horizontal Motor
  kind: action
  method: "peripheral.frame.horizontal.stop"
  params: []

- id: peripheral_frame_h_calibrate
  label: Calibrate Peripheral Frame Horizontal Motor
  kind: action
  method: "peripheral.frame.horizontal.calibrate"
  params: []

- id: peripheral_frame_v_runforward
  label: Run Peripheral Frame Vertical Motor Forward
  kind: action
  method: "peripheral.frame.vertical.runforward"
  params: []

- id: peripheral_frame_v_runreverse
  label: Run Peripheral Frame Vertical Motor Reverse
  kind: action
  method: "peripheral.frame.vertical.runreverse"
  params: []

- id: peripheral_frame_v_stepforward
  label: Step Peripheral Frame Vertical Motor Forward
  kind: action
  method: "peripheral.frame.vertical.stepforward"
  params: []

- id: peripheral_frame_v_stepreverse
  label: Step Peripheral Frame Vertical Motor Reverse
  kind: action
  method: "peripheral.frame.vertical.stepreverse"
  params: []

- id: peripheral_frame_v_stop
  label: Stop Peripheral Frame Vertical Motor
  kind: action
  method: "peripheral.frame.vertical.stop"
  params: []

- id: peripheral_frame_v_calibrate
  label: Calibrate Peripheral Frame Vertical Motor
  kind: action
  method: "peripheral.frame.vertical.calibrate"
  params: []

- id: peripheral_frame_rot_runforward
  label: Run Peripheral Frame Rotation Motor Forward
  kind: action
  method: "peripheral.frame.rotation.runforward"
  params: []

- id: peripheral_frame_rot_runreverse
  label: Run Peripheral Frame Rotation Motor Reverse
  kind: action
  method: "peripheral.frame.rotation.runreverse"
  params: []

- id: peripheral_frame_rot_stepforward
  label: Step Peripheral Frame Rotation Motor Forward
  kind: action
  method: "peripheral.frame.rotation.stepforward"
  params: []

- id: peripheral_frame_rot_stepreverse
  label: Step Peripheral Frame Rotation Motor Reverse
  kind: action
  method: "peripheral.frame.rotation.stepreverse"
  params: []

- id: peripheral_frame_rot_stop
  label: Stop Peripheral Frame Rotation Motor
  kind: action
  method: "peripheral.frame.rotation.stop"
  params: []

- id: peripheral_frame_rot_calibrate
  label: Calibrate Peripheral Frame Rotation Motor
  kind: action
  method: "peripheral.frame.rotation.calibrate"
  params: []

# ── Connector Signal Detection ────────────────────────────────────────────────

- id: connector_detectedsignal_get
  label: Get Detected Signal Info for a Connector
  kind: query
  method: "property.get"
  params:
    - name: property
      type: string
      description: "e.g. image.connector.l1displayport.detectedsignal — returns active bool, timing, resolution, color space, etc."

- id: connector_colorspace_set
  label: Set Connector Color Space
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      description: "e.g. image.connector.l1displayport.colorspace"
    - name: value
      type: enum
      description: "One of: Auto, RGB, REC709, REC601, REC2020"

- id: connector_colorprimaries_set
  label: Set Connector Color Primaries
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      description: "e.g. image.connector.l1displayport.colorprimaries"
    - name: value
      type: enum
      description: "One of: Auto, Uncorrected, REC709, REC2020, DCI-P3-D65, DCI-P3-Theater"

- id: connector_signalrange_set
  label: Set Connector Signal Range
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      description: "e.g. image.connector.l1displayport.signalrange"
    - name: value
      type: enum
      description: "One of: Auto, 0-255, 16-235"

- id: connector_edid_selected_set
  label: Set Connector EDID Selection
  kind: action
  method: "property.set"
  params:
    - name: property
      type: string
      description: "e.g. image.connector.l1displayport.edid.selected"
    - name: value
      type: string
      description: "EDID name string"
```

## Feedbacks

```yaml
- id: fb_system_state
  label: System State
  query_command: property.get
  params:
    property: "system.state"
  notes: "Values: boot, eco, standby, ready, conditioning, on, deconditioning, error"

- id: fb_illumination_state
  label: Illumination State
  query_command: property.get
  params:
    property: "illumination.state"

- id: fb_laser_power
  label: Laser Power (%)
  query_command: property.get
  params:
    property: "illumination.sources.laser.power"

- id: fb_active_source
  label: Active Source
  query_command: property.get
  params:
    property: "image.window.main.source"

- id: fb_image_brightness
  label: Image Brightness
  query_command: property.get
  params:
    property: "image.brightness"

- id: fb_image_contrast
  label: Image Contrast
  query_command: property.get
  params:
    property: "image.contrast"

- id: fb_image_gamma
  label: Image Gamma
  query_command: property.get
  params:
    property: "image.gamma"

- id: fb_image_intensity
  label: Image Intensity
  query_command: property.get
  params:
    property: "image.intensity"

- id: fb_display_mode
  label: Current Display Mode
  query_command: property.get
  params:
    property: "image.display.displaymode"

- id: fb_orientation
  label: Image Orientation
  query_command: property.get
  params:
    property: "image.orientation"

- id: fb_focus_position
  label: Focus Motor Position
  query_command: property.get
  params:
    property: "optics.focus.position"

- id: fb_zoom_position
  label: Zoom Motor Position
  query_command: property.get
  params:
    property: "optics.zoom.position"

- id: fb_lensshift_h_position
  label: Horizontal Lens Shift Position
  query_command: property.get
  params:
    property: "optics.lensshift.horizontal.position"

- id: fb_lensshift_v_position
  label: Vertical Lens Shift Position
  query_command: property.get
  params:
    property: "optics.lensshift.vertical.position"

- id: fb_shutter_position
  label: Shutter Position
  query_command: property.get
  params:
    property: "optics.shutter.position"

- id: fb_clo_state
  label: CLO State
  query_command: property.get
  params:
    property: "illumination.clo.state"

- id: fb_alarm_state
  label: Alarm State
  query_command: property.get
  params:
    property: "environment.alarmstate"

- id: fb_stealth_mode
  label: Stealth Mode
  query_command: property.get
  params:
    property: "ui.stealthmode"

- id: fb_available_sources
  label: Available Sources List
  query_command: image.source.list
  params: {}

- id: fb_transport_delay_actual
  label: Actual Transport Delay
  query_command: property.get
  params:
    property: "image.processing.transportdelay.actual"
```

## Variables

```yaml
[]
```

## Events

```yaml
[]
```

## Macros

```yaml
[]
```

## Safety

```yaml
confirmation_required_for:
  - system_power_off
  - system_reboot
  - system_reset_all
  - warp_file_delete
  - blend_file_delete
  - blacklevel_file_delete
  - testpattern_file_delete
interlocks: []
```

## Notes

The API surface is dynamic and model-dependent; features such as motorized optics (zoom, focus, lens shift) and stereo are only present when the corresponding hardware is installed. The DMX channel count expands in extended mode beyond the 14 channels shown in the property list. File uploads (warp grids, blend masks, black level corrections, test patterns, firmware) use HTTP POST to `http://<ip>/api/<endpoint>` rather than JSON-RPC, while management (list, select, delete, enable) uses the standard JSON-RPC property interface.

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-23T10:43:30.227Z
last_checked_at: 2026-06-23T10:43:30.227Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:43:30.227Z
matched_actions: 365
action_count: 365
confidence: medium
summary: "All 365 spec actions (344 Actions + 21 Feedbacks) match verbatim JSON-RPC methods/properties; transport port 9090 + 19200 8N1 confirmed. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document heading references \"Event Master\" but content describes the Pulse/UDX JSON-RPC API; entity_id barco_event_master retained per task brief"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
