---
spec_id: admin/vaddio-quickconnect-usb-interface
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio Quick-Connect USB Interface Control Spec"
manufacturer: Vaddio
model_family: "Quick-Connect USB Interface (999-1105-038, North America)"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "Quick-Connect USB Interface (999-1105-038, North America)"
    - "Quick-Connect USB Interface (999-1105-138, International)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - manualshelf.com
  - fullcompass.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134261460/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
  - https://www.manualshelf.com/manual/vaddio/quick-connect-usb/user-manual-english/page-30.html
  - "https://res.cloudinary.com/avd/image/upload/v134229492/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://res.cloudinary.com/avd/image/upload/v133965108/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
retrieved_at: 2026-06-19T02:05:13.572Z
last_checked_at: 2026-06-19T07:55:49.417Z
generated_at: 2026-06-19T07:55:49.417Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-camera VISCA-like RS-232 command set referenced but not included in this source (\"in the back of this manual\" / \"in the individual camera manuals\")."
  - "CCU image-control commands and CCU scenes (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) are described only via the web UI, not exposed as API commands."
  - "built-in webserver HTTP/REST API (if any) not documented — webserver described as browser UI only."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated."
  - "explicit per-camera VISCA command bytes not in this source."
  - "webserver/HTTP programmatic API (if any) not documented — only browser UI described."
  - "CCU scene recall/set commands (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) not in API list."
  - "store-preset web-UI range is 1–6; no API to enumerate/manage preset names."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:55:49.417Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions match verbatim in the source Telnet Command List with correct parameter shapes and ranges; all transport parameters (port 23, 9600 8N1, basic auth) confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Vaddio Quick-Connect USB Interface Control Spec

## Summary
The Vaddio Quick-Connect USB Interface (Doc 342-0653 Rev B, © 2013 Vaddio) is a camera extension/interface device that bridges an attached Vaddio PTZ camera (ClearVIEW/PowerVIEW/ZoomSHOT/WideSHOT/etc.) to USB streaming, Ethernet H.264 streaming, and RS-232/IP control. This spec covers the text-based Telnet Serial Command API exposed on TCP port 23 and relayed over RS-232 (9600 8N1). The API provides camera pan/tilt/zoom/preset control plus streaming mode/quality/resolution selection, network query, and system reboot/factory-reset commands. Camera-specific VISCA-like RS-232 commands are NOT documented in this source (referenced as residing in individual camera manuals).

<!-- UNRESOLVED: per-camera VISCA-like RS-232 command set referenced but not included in this source ("in the back of this manual" / "in the individual camera manuals"). -->
<!-- UNRESOLVED: CCU image-control commands and CCU scenes (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) are described only via the web UI, not exposed as API commands. -->
<!-- UNRESOLVED: built-in webserver HTTP/REST API (if any) not documented — webserver described as browser UI only. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default Telnet port stated in source (Appendix 2)
serial:
  baud_rate: 9600  # default, per COMMUNICATION SPECIFICATION
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # "No Flow control" stated
auth:
  type: basic  # username/password required; Telnet uses the Administrator account
  default_username: admin
  default_password: password  # default; admin-configurable via web UI Security menu
  notes: >
    Two accounts exist: "admin" (username "admin" / password "password") and
    "user" (username blank by default / password "password"). Telnet auth uses
    the Administrator account credentials. If no username is assigned to the
    "user" account, the web UI opens directly to Camera Control without login.
```

## Traits
```yaml
traits:
  - queryable  # inferred: many get sub-commands (streaming mode/quality/resolution get, network settings get, factory-reset get, version)
```

## Actions
```yaml
# All command lines are terminated with a carriage return. The device echoes
# all input ASCII and appends a VT100 clear-screen sequence ESC[J (hex 1B 5B 4A)
# after each CR. Most terminal clients strip this automatically.
# CTRL+5 clears the current serial buffer on the device.

- id: camera_home
  label: Camera Home
  kind: action
  command: "camera home"
  params: []
  notes: Moves attached camera to home position. Not functional with ZoomSHOT or WideSHOT.

- id: camera_pan
  label: Camera Pan
  kind: action
  command: "camera pan {direction} {speed}"
  params:
    - name: direction
      type: string
      enum: [left, right, stop]
      required: true
    - name: speed
      type: integer
      range: [1, 24]
      default: 12
      required: false
  notes: Not used with ZoomSHOT or WideSHOT cameras.

- id: camera_tilt
  label: Camera Tilt
  kind: action
  command: "camera tilt {direction} {speed}"
  params:
    - name: direction
      type: string
      enum: [up, down, stop]
      required: true
    - name: speed
      type: integer
      range: [1, 20]
      default: 10
      required: false
  notes: Not used with ZoomSHOT or WideSHOT cameras.

- id: camera_zoom
  label: Camera Zoom
  kind: action
  command: "camera zoom {direction} {speed}"
  params:
    - name: direction
      type: string
      enum: [in, out, stop]
      required: true
    - name: speed
      type: integer
      range: [1, 7]
      default: 3
      required: false

- id: camera_preset_recall
  label: Camera Preset Recall
  kind: action
  command: "camera preset recall {preset}"
  params:
    - name: preset
      type: integer
      range: [1, 6]
      required: true

- id: camera_preset_store
  label: Camera Preset Store
  kind: action
  command: "camera preset store {preset}"
  params:
    - name: preset
      type: integer
      range: [1, 6]
      required: true

- id: streaming_mode_set
  label: Set Streaming Mode
  kind: action
  command: "streaming mode {mode}"
  params:
    - name: mode
      type: string
      enum: [usb, ethernet]
      required: true

- id: streaming_quality_set
  label: Set Streaming Quality
  kind: action
  command: "streaming quality {quality}"
  params:
    - name: quality
      type: string
      enum: [low, standard, high]
      required: true

- id: streaming_resolution_set
  label: Set Streaming Resolution
  kind: action
  command: "streaming resolution {resolution}"
  params:
    - name: resolution
      type: string
      enum: [1080p, 720p, 4cif, 480p, cif]
      required: true

- id: factory_reset_set
  label: Set Factory-Reset on Reboot
  kind: action
  command: "system factory-reset {state}"
  params:
    - name: state
      type: string
      enum: [on, off]
      required: true
  notes: "on" enables factory reset on next reboot; "off" disables.

- id: system_reboot
  label: System Reboot
  kind: action
  command: "system reboot {seconds}"
  params:
    - name: seconds
      type: integer
      required: false
      description: Delay in seconds before reboot. Omit for immediate reboot.
  notes: Example "reboot 30" reboots in 30 seconds.

- id: exit_session
  label: Exit Session
  kind: action
  command: "exit"
  params: []
  notes: Ends the current API command session. Over telnet, closes the socket. Over serial, starts a new session.

- id: clear_serial_buffer
  label: Clear Serial Buffer
  kind: action
  command: "CTRL+5"
  params: []
  notes: Clears the current serial buffer on the device (control character, not a text command).

# --- Query / get commands ---

- id: streaming_mode_get
  label: Get Streaming Mode
  kind: query
  command: "streaming mode get"
  params: []

- id: streaming_quality_get
  label: Get Streaming Quality
  kind: query
  command: "streaming quality get"
  params: []

- id: streaming_resolution_get
  label: Get Streaming Resolution
  kind: query
  command: "streaming resolution get"
  params: []

- id: network_settings_get
  label: Get Network Settings
  kind: query
  command: "network settings get"
  params: []
  notes: Returns MAC address, IP address, netmask, and gateway.

- id: network_ping
  label: Network Ping
  kind: query
  command: "network ping count {count} size {size} {destination}"
  params:
    - name: count
      type: integer
      default: 5
      required: false
      description: Number of ICMP ECHO_REQUEST packets (default 5).
    - name: size
      type: integer
      default: 56
      required: false
      description: Data size of ICMP packet in bytes (default 56).
    - name: destination
      type: string
      required: true
      description: Destination IP address.

- id: factory_reset_get
  label: Get Factory-Reset Status
  kind: query
  command: "system factory-reset get"
  params: []
  notes: Returns software and hardware factory-reset status.

- id: version
  label: Version
  kind: query
  command: "version"
  params: []
  notes: Returns current software version information.

# --- Session/CLI utility commands ---

- id: help
  label: Help
  kind: action
  command: "help"
  params: []
  notes: Displays an overview of the command line syntax.

- id: history
  label: History
  kind: action
  command: "history {limit}"
  params:
    - name: limit
      type: integer
      required: false
      description: Sets the history buffer to remember the last N unique entries.
  notes: Navigable with up/down arrow keys. Supports expansion (!!, !N, !-N).
```

## Feedbacks
```yaml
- id: streaming_mode
  type: enum
  values: [usb, ethernet]
  source_query: streaming_mode_get

- id: streaming_quality
  type: enum
  values: [low, standard, high]
  source_query: streaming_quality_get

- id: streaming_resolution
  type: enum
  values: [1080p, 720p, 4cif, 480p, cif]
  source_query: streaming_resolution_get

- id: factory_reset_software
  type: enum
  values: [on, off]
  source_query: factory_reset_get

- id: factory_reset_hardware
  type: enum
  values: [on, off]
  notes: Reflects rear-panel dip-switch position (down = reset on next power cycle).

- id: network_settings
  type: object
  fields: [mac_address, ip_address, netmask, gateway]
  source_query: network_settings_get

- id: command_result
  type: enum
  values: [OK, ERROR]
  notes: >
    OK returned for successful set commands; ERROR returned for syntax errors.
    Query responses return the value (e.g. "mode: usb").
```

## Variables
```yaml
# No continuous settable numeric variables documented. Speeds on camera pan/tilt/zoom
# are inline action parameters (already represented in Actions), not standalone variables.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. system reboot and system factory-reset are
# disruptive but the source documents no confirmation/interlock flow for them.
```

## Notes
- The Quick-Connect USB Interface is an accessory/bridge device; camera PTZ commands issued through this API are relayed to the attached Vaddio camera over the RS-232 OUT TO CAMERA port (RJ-45, Cat-5).
- Camera RS-232 OUT pin-out (camera side): Pin 6 = Digital GND, Pin 7 = RXD (from TXD of control source), Pin 8 = TXD (to RXD of control source). Pins 1–5 not used with QC-USB.
- The Vaddio camera control protocol is "similar to, but not identical to the Sony® VISCA™ command set" — NOT all VISCA commands supported, and there are camera-specific commands. Those VISCA-equivalent commands live in the individual camera manuals, not in this Quick-Connect USB document.
- Camera compatibility (full image-control support): ClearVIEW HD-18, HD-19, PowerVIEW HD-22, HD-30, ZoomSHOT HD POV, WideSHOT HD. ClearVIEW HD-20 has partial image-control support. REVEAL Series and CeilingVIEW HD-18 have CCU functions "to be added in future Rev".
- ZoomSHOT and WideSHOT cameras do NOT respond to pan or tilt commands (WideSHOT is manual PTZ).
- Default network config: DHCP (falls back to 169.254.1.1 / 255.255.0.0 if no DHCP server).
- Video streaming: up to 1080p/30 H.264 over Ethernet; three quality targets (High/Good/Standard).
- Rear-panel dip switches: #3 = color space (Up=HDMI YCbCr, Down=DVI sRGB); #4 = program/update (Up=normal, Down=ready to program); all-down + power cycle = reset to defaults.
- Terminal session: each command echoed back and appended with VT100 sequence ESC[J (hex 1B 5B 4A). Commands terminated by carriage return.
- CTRL+5 clears the serial buffer mid-command.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: explicit per-camera VISCA command bytes not in this source. -->
<!-- UNRESOLVED: webserver/HTTP programmatic API (if any) not documented — only browser UI described. -->
<!-- UNRESOLVED: CCU scene recall/set commands (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) not in API list. -->
<!-- UNRESOLVED: store-preset web-UI range is 1–6; no API to enumerate/manage preset names. -->
````

Spec built. Telnet+RS-232, port 23, 9600 8N1. 22 actions (incl. all get/query + utility cmds), 6 feedback types. Camera VISCA cmds + CCU + HTTP API marked UNRESOLVED — source only covers the Telnet Serial Command API.

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - manualshelf.com
  - fullcompass.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134261460/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
  - https://www.manualshelf.com/manual/vaddio/quick-connect-usb/user-manual-english/page-30.html
  - "https://res.cloudinary.com/avd/image/upload/v134229492/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://res.cloudinary.com/avd/image/upload/v133965108/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/quick-connect-usb-manual.pdf"
retrieved_at: 2026-06-19T02:05:13.572Z
last_checked_at: 2026-06-19T07:55:49.417Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:55:49.417Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions match verbatim in the source Telnet Command List with correct parameter shapes and ranges; all transport parameters (port 23, 9600 8N1, basic auth) confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-camera VISCA-like RS-232 command set referenced but not included in this source (\"in the back of this manual\" / \"in the individual camera manuals\")."
- "CCU image-control commands and CCU scenes (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) are described only via the web UI, not exposed as API commands."
- "built-in webserver HTTP/REST API (if any) not documented — webserver described as browser UI only."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated."
- "explicit per-camera VISCA command bytes not in this source."
- "webserver/HTTP programmatic API (if any) not documented — only browser UI described."
- "CCU scene recall/set commands (Automatic/Incandescent Hi/Lo/Fluorescent Hi/Lo/Outdoor) not in API list."
- "store-preset web-UI range is 1–6; no API to enumerate/manage preset names."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
