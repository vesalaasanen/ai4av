---
spec_id: admin/vaddio-clearview-hd-usb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ClearVIEW HD-USB Control Spec"
manufacturer: Vaddio
model_family: "ClearVIEW HD-USB"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ClearVIEW HD-USB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - res.cloudinary.com
  - aca.im
retrieved_at: 2026-05-04T12:48:28.924Z
last_checked_at: 2026-05-04T16:17:52.391Z
generated_at: 2026-05-04T16:17:52.391Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T16:17:52.391Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "All 41 spec actions matched literally in source commands; all transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Vaddio ClearVIEW HD-USB Control Spec

## Summary
PTZ camera with dual control interfaces: RS-232 serial using a modified VISCA binary protocol, and Telnet (TCP) using a text-based ASCII CLI. The RS-232 port carries VISCA commands only; the Telnet CLI carries a separate set of high-level camera, streaming, and system commands. The VISCA command set is similar but not identical to Sony VISCA and is not compatible with Vaddio Joysticks.

<!-- UNRESOLVED: this source covers only the HD-USB model; other ClearVIEW HD models (HD-18, HD-19, HD-20, HD-22) use a different command set -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: USB 2.0 control protocol mentioned but not documented in this source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  notes: 38400 bps available via DIP switch; 9600 is default. RS-232 RJ-45 pin 7=RXD, pin 8=TXD, pin 6=GND.
addressing:
  port: 23
auth:
  type: basic  # Telnet requires admin username/password; RS-232 has no auth
  notes: Telnet uses same credentials as embedded web server admin account. Default credentials documented in source.
```

## Traits
```yaml
traits:
  - powerable    # CAM_Power on/off; system reboot
  - queryable    # VISCA inquiry commands; telnet get commands
  - levelable    # zoom/focus position; pan/tilt speed; streaming quality/resolution
```

## Actions
```yaml
# === RS-232 / VISCA Binary Commands ===

- id: visca_address_set
  label: Address Set (Broadcast)
  kind: action
  transport: serial
  command: "88 30 01 FF"
  params: []

- id: visca_if_clear
  label: Interface Clear
  kind: action
  transport: serial
  command: "88 01 00 01 FF"
  params: []

- id: visca_command_cancel
  label: Command Cancel
  kind: action
  transport: serial
  command: "8x 2p FF"
  params:
    - name: socket
      type: integer
      description: "Socket number (1 or 2)"

- id: visca_cam_power
  label: Camera Power
  kind: action
  transport: serial
  command:
    on: "8x 01 04 00 02 FF"
    off: "8x 01 04 00 03 FF"
  params:
    - name: state
      type: enum
      values: [on, off, standby]
      description: "off and standby both send the off packet"

- id: visca_cam_zoom
  label: Camera Zoom
  kind: action
  transport: serial
  command:
    stop: "8x 01 04 07 00 FF"
    tele: "8x 01 04 07 02 FF"
    wide: "8x 01 04 07 03 FF"
    tele_variable: "8x 01 04 07 2p FF"
    wide_variable: "8x 01 04 07 3p FF"
    direct: "8x 01 04 47 0p 0q 0r 0s FF"
    direct_variable: "8x 01 7E 01 4A 0v 0p0q0r 0s FF"
  params:
    - name: direction
      type: enum
      values: [stop, tele, wide]
      description: "Zoom direction or stop"
    - name: speed
      type: integer
      min: 0
      max: 7
      required: false
      description: "Variable speed (0-7) for tele_variable/wide_variable/direct_variable"
    - name: position
      type: integer
      min: 0
      max: 1715
      required: false
      description: "Direct zoom position (0x000-0x6B3 = 0-1715 decimal)"

- id: visca_cam_focus
  label: Camera Focus
  kind: action
  transport: serial
  command:
    stop: "8x 01 04 08 00 FF"
    far: "8x 01 04 08 02 FF"
    near: "8x 01 04 08 03 FF"
    far_variable: "8x 01 04 08 2p FF"
    near_variable: "8x 01 04 08 3p FF"
    auto: "8x 01 04 38 02 FF"
    manual: "8x 01 04 38 03 FF"
    toggle_auto_manual: "8x 01 04 38 10 FF"
    direct: "8x 01 04 48 0p0q0r 0s FF"
  params:
    - name: direction
      type: enum
      values: [stop, far, near]
      required: false
      description: "Focus direction or stop"
    - name: speed
      type: integer
      min: 0
      max: 15
      required: false
      description: "Variable speed for far_variable/near_variable"
    - name: mode
      type: enum
      values: [auto, manual, toggle]
      required: false
      description: "Focus mode"
    - name: position
      type: integer
      min: 0
      max: 49152
      required: false
      description: "Direct focus position (0x000-0xC000 = 0-49152 decimal). Dependent on zoom position."

- id: visca_cam_backlight
  label: Camera Backlight
  kind: action
  transport: serial
  command:
    on: "8x 01 04 33 02 FF"
    off: "8x 01 04 33 03 FF"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: visca_cam_memory
  label: Camera Preset Memory
  kind: action
  transport: serial
  command:
    reset: "8x 01 04 3F 00 0p FF"
    set: "8x 01 04 3F 01 0p FF"
    recall: "8x 01 04 3F 02 0p FF"
  params:
    - name: action
      type: enum
      values: [reset, set, recall]
      description: "Reset clears, Set stores, Recall moves to preset"
    - name: preset
      type: integer
      min: 0
      max: 14
      description: "Preset number (0x0-0xE = 0-14)"

- id: visca_pan_tilt_drive
  label: Pan-Tilt Drive
  kind: action
  transport: serial
  command:
    up: "8x 01 06 01 VV WW 03 01 FF"
    down: "8x 01 06 01 VV WW 03 02 FF"
    left: "8x 01 06 01 VV WW 01 03 FF"
    right: "8x 01 06 01 VV WW 02 03 FF"
    up_left: "8x 01 06 01 VV WW 01 01 FF"
    up_right: "8x 01 06 01 VV WW 02 01 FF"
    down_left: "8x 01 06 01 VV WW 01 02 FF"
    down_right: "8x 01 06 01 VV WW 02 02 FF"
    stop: "8x 01 06 01 VV WW 03 03 FF"
  params:
    - name: direction
      type: enum
      values: [up, down, left, right, up_left, up_right, down_left, down_right, stop]
    - name: pan_speed
      type: integer
      min: 1
      max: 24
      description: "Pan speed (WW, 0x01-0x18)"
    - name: tilt_speed
      type: integer
      min: 1
      max: 20
      description: "Tilt speed (VV, 0x01-0x14)"

- id: visca_pan_tilt_absolute
  label: Pan-Tilt Absolute Position
  kind: action
  transport: serial
  command: "81 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 24
      description: "Pan speed (WW, 0x01-0x18)"
    - name: tilt_speed
      type: integer
      min: 1
      max: 20
      description: "Tilt speed (VV, 0x01-0x14)"
    - name: pan_position
      type: integer
      min: -32700
      max: 32700
      description: "Pan position (0x8044-0x7FBC = -32700 to +32700)"
    - name: tilt_position
      type: integer
      min: -5999
      max: 19499
      description: "Tilt position (0xE891-0x4C2B = -5999 to +19499)"

- id: visca_pan_tilt_home
  label: Pan-Tilt Home
  kind: action
  transport: serial
  command: "8x 01 06 04 FF"
  params: []

- id: visca_pan_tilt_reset
  label: Pan-Tilt Reset
  kind: action
  transport: serial
  command: "81 01 06 05 FF"
  params: []

- id: visca_tally
  label: Tally
  kind: action
  transport: serial
  command:
    on: "8x 01 7E 01 0A 00 02 FF"
    off: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: visca_preset_speed
  label: Set Preset Speed
  kind: action
  transport: serial
  command: "81 01 7E 01 0B WW SS ZZ FF"
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 24
      description: "Pan speed (WW, 0x01-0x18)"
    - name: tilt_speed
      type: integer
      min: 1
      max: 20
      description: "Tilt speed (SS, 0x01-0x14)"
    - name: zoom_speed
      type: integer
      min: 0
      max: 7
      description: "Zoom speed (ZZ, 0x00-0x07)"

# === Telnet / TCP ASCII Commands ===

- id: telnet_camera_home
  label: Camera Home
  kind: action
  transport: tcp
  command: "camera home"
  response: "OK"
  params: []

- id: telnet_camera_pan
  label: Camera Pan
  kind: action
  transport: tcp
  command: "camera pan {direction} [speed]"
  response: "OK"
  params:
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      min: 1
      max: 24
      required: false
      default: 12
      description: "Pan speed (default: 12)"

- id: telnet_camera_tilt
  label: Camera Tilt
  kind: action
  transport: tcp
  command: "camera tilt {direction} [speed]"
  response: "OK"
  params:
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      min: 1
      max: 20
      required: false
      default: 10
      description: "Tilt speed (default: 10)"

- id: telnet_camera_zoom
  label: Camera Zoom
  kind: action
  transport: tcp
  command: "camera zoom {direction} [speed]"
  response: "OK"
  params:
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      min: 1
      max: 7
      required: false
      default: 3
      description: "Zoom speed (default: 3)"

- id: telnet_camera_preset
  label: Camera Preset
  kind: action
  transport: tcp
  command: "camera preset {action} {preset}"
  response: "OK"
  params:
    - name: action
      type: enum
      values: [recall, store]
    - name: preset
      type: integer
      min: 1
      max: 6
      description: "Preset number (1-6)"

- id: telnet_streaming_mode
  label: Streaming Mode
  kind: action
  transport: tcp
  command: "streaming mode {mode}"
  response: "OK"
  params:
    - name: mode
      type: enum
      values: [usb, ethernet]

- id: telnet_streaming_quality
  label: Streaming Quality
  kind: action
  transport: tcp
  command: "streaming quality {quality}"
  response: "OK"
  params:
    - name: quality
      type: enum
      values: [low, standard, high]

- id: telnet_streaming_resolution
  label: Streaming Resolution
  kind: action
  transport: tcp
  command: "streaming resolution {resolution}"
  response: "OK"
  params:
    - name: resolution
      type: enum
      values: ["1080p", "720p", "4cif", "480p", "cif"]

- id: telnet_system_factory_reset
  label: System Factory Reset
  kind: action
  transport: tcp
  command: "system factory-reset {state}"
  response: "factory-reset (software): {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: "Enable/disable factory reset on next reboot"

- id: telnet_system_reboot
  label: System Reboot
  kind: action
  transport: tcp
  command: "system reboot [seconds]"
  response: "Reboots system"
  params:
    - name: delay_seconds
      type: integer
      required: false
      description: "Seconds to delay before reboot"

- id: telnet_network_ping
  label: Network Ping
  kind: action
  transport: tcp
  command: "network ping [count <count>] [size <size>] <destination-ip>"
  params:
    - name: destination
      type: string
      description: "Destination IP address"
    - name: count
      type: integer
      required: false
      default: 5
      description: "Number of ECHO_REQUEST packets (default: 5)"
    - name: size
      type: integer
      required: false
      default: 56
      description: "ICMP packet data size in bytes (default: 56)"
```

## Feedbacks
```yaml
# === VISCA Inquiry Commands (serial) ===

- id: visca_power_inquiry
  label: Power State Inquiry
  transport: serial
  command: "8x 09 04 00 FF"
  response:
    on: "y0 50 02 FF"
    off: "y0 50 03 FF"
  type: enum
  values: [on, off, standby]

- id: visca_zoom_position_inquiry
  label: Zoom Position Inquiry
  transport: serial
  command: "8x 09 04 47 FF"
  response: "y0 50 0p0q0r 0s FF"
  type: integer
  min: 0
  max: 1715
  description: "Zoom position (0x000-0x6B3)"

- id: visca_focus_position_inquiry
  label: Focus Position Inquiry
  transport: serial
  command: "8x 09 04 48 FF"
  response: "y0 50 0p0q0r 0s FF"
  type: integer
  min: 0
  max: 49152
  description: "Focus position (0x000-0xC000). Dependent on zoom position."

- id: visca_backlight_inquiry
  label: Backlight Mode Inquiry
  transport: serial
  command: "8x 09 04 33 FF"
  response:
    on: "y0 50 02 FF"
    off: "y0 50 03 FF"
  type: enum
  values: [on, off]

- id: visca_memory_inquiry
  label: Current Preset Inquiry
  transport: serial
  command: "8x 09 04 3F FF"
  response: "y0 50 0p FF"
  type: integer
  min: 0
  max: 15
  description: "Current preset number (0x0-0xF)"

- id: visca_pan_tilt_max_speed_inquiry
  label: Pan-Tilt Max Speed Inquiry
  transport: serial
  command: "8x 09 06 11 FF"
  response: "y0 50 pp qq FF"
  type: object
  description: "pp=Pan max speed (0x01-0x18), qq=Tilt max speed (0x01-0x14)"

- id: visca_pan_tilt_position_inquiry
  label: Pan-Tilt Position Inquiry
  transport: serial
  command: "8x 09 06 12 FF"
  response: "FF y0 50 0p 0p 0p 0p 0q 0q 0q 0q FF"
  type: object
  description: "pppp=Pan position (0x8044-0x7FB2), qqqq=Tilt position (0xE890-0x4C2C)"

- id: visca_tally_inquiry
  label: Tally State Inquiry
  transport: serial
  command: "8x 09 7E 01 0A FF"
  response:
    on: "y0 50 02 FF"
    off: "y0 50 03 FF"
  type: enum
  values: [on, off]

- id: visca_preset_speed_inquiry
  label: Preset Speed Inquiry
  transport: serial
  command: "8x 09 7E 01 0B FF"
  response: "y0 50 pp qq rr FF"
  type: object
  description: "pp=Pan speed (0x01-0x18), qq=Tilt speed (0x01-0x14), rr=Zoom speed (0x00-0x07)"

- id: visca_motor_config_inquiry
  label: Motor Config Inquiry
  transport: serial
  command: "8x 09 7E 01 70 FF"
  response:
    hard_stops: "y0 50 00 FF"
    soft_stops: "y0 50 01 FF"
  type: enum
  values: [hard_motor_stops, soft_motor_stops]

# === Telnet Get Commands (TCP) ===

- id: telnet_network_settings
  label: Network Settings
  transport: tcp
  command: "network settings get"
  response: "MAC Address: xx:xx:xx:xx:xx:xx IP Address: x.x.x.x Netmask: x.x.x.x Gateway: x.x.x.x"
  type: object
  description: "Returns MAC address, IP address, netmask, and gateway"

- id: telnet_streaming_mode_get
  label: Streaming Mode Query
  transport: tcp
  command: "streaming mode get"
  response: "mode: {usb|ethernet}"
  type: enum
  values: [usb, ethernet]

- id: telnet_streaming_quality_get
  label: Streaming Quality Query
  transport: tcp
  command: "streaming quality get"
  response: "quality: {low|standard|high}"
  type: enum
  values: [low, standard, high]

- id: telnet_streaming_resolution_get
  label: Streaming Resolution Query
  transport: tcp
  command: "streaming resolution get"
  response: "resolution: {1080p|720p|4cif|480p|cif}"
  type: enum
  values: ["1080p", "720p", "4cif", "480p", "cif"]

- id: telnet_factory_reset_status_get
  label: Factory Reset Status Query
  transport: tcp
  command: "system factory-reset get"
  response: "factory-reset (software): {on|off}"
  type: object
  description: "Returns software and hardware factory reset status"

- id: telnet_version_get
  label: Software Version Query
  transport: tcp
  command: "version"
  response: "Version string"
  type: string
  description: "Returns current software version"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables beyond action-params identified in source
```

## Events
```yaml
# No unsolicited notification events documented in source.
```

## Macros
```yaml
# No multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - telnet_system_factory_reset
  - telnet_system_reboot
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Device has two independent control protocols on separate interfaces: VISCA binary on RS-232, text CLI on Telnet. The command sets are not interchangeable between interfaces.
- VISCA uses modified Sony VISCA format. `x` in command bytes denotes the camera address (1-7). `y` in response bytes denotes the responder address.
- RS-232 baud rate selectable via DIP switch: 9600 (default) or 38400 bps.
- Telnet session echoes all characters with VT100 escape sequence `ESC[J` (hex 1B 5B 4A) appended. Most terminal programs strip this automatically.
- Telnet commands terminated by carriage return.
- `CTRL+5` clears the current serial buffer on the device during Telnet session.
- Default IP address: 169.254.1.1 (fallback when no DHCP server found), subnet 255.255.0.0.
- VISCA preset memory: 16 presets (0-15) via RS-232; 6 presets (1-6) via Telnet.
- VISCA zoom range: 0x000-0x6B3 (0-1715). Focus range: 0x000-0xC000 (0-49152), dependent on zoom position.
- Pan range: -32700 to +32700 (0x8044-0x7FBC). Tilt range: -5999 to +19499 (0xE891-0x4C2B).
- RTSP port configurable via web interface: 554, or 1024-65535. HLS port fixed at 80.
- IP streaming supports RTSP and HLS formats (H.264, CIF through 1080p/30).
- Default streaming quality resolution via DIP rotary switch positions 0-7 (USB 2.0 output).

<!-- UNRESOLVED: USB 2.0 control interface mentioned but protocol not documented -->
<!-- UNRESOLVED: web interface control mentioned but API not documented -->
<!-- UNRESOLVED: IR remote commander commands not mapped to protocol equivalents -->
<!-- UNRESOLVED: exact firmware version requirements for IP streaming (Release 2.0.x mentioned) -->
<!-- UNRESOLVED: error recovery / fault behavior sequences not documented -->
<!-- UNRESOLVED: command timing constraints not documented -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
  - aca.im
retrieved_at: 2026-05-04T12:48:28.924Z
last_checked_at: 2026-05-04T16:17:52.391Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T16:17:52.391Z
matched_actions: 41
action_count: 41
confidence: high
summary: "All 41 spec actions matched literally in source commands; all transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
