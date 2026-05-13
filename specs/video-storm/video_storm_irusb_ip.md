---
spec_id: admin/video-storm-irusb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Video Storm IRUSB & usbMotion Control Spec"
manufacturer: "Video Storm"
model_family: IRUSB
aliases: []
compatible_with:
  manufacturers:
    - "Video Storm"
  models:
    - IRUSB
    - usbMotion
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - video-storm.com
retrieved_at: 2026-05-04T18:03:36.367Z
last_checked_at: 2026-04-30T09:51:57.196Z
generated_at: 2026-04-30T09:51:57.196Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:51:57.196Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched verbatim in source; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Video Storm IRUSB & usbMotion Control Spec

## Summary
Video Storm IRUSB is an IR transceiver over TCP/IP. usbMotion extends it with motion detection. Control via TCP port 9093. All commands start with Q and terminate with <cr>. Echo back confirms command receipt.

<!-- UNRESOLVED: IRUSB sends multicast discovery every 5min (239.255.255.250:1904) — not modelled as a transport discovery mechanism -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9093
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # QWAKE, QRESTART present
- queryable       # QSTATVER, QGETPLAY, QGETFG present
- routable        # IR TX transmit commands allow target device_id routing
```

## Actions
```yaml
- id: restart
  label: Reboot IRUSB
  kind: action
  params: []
  protocol_form: QRESTART<cr>

- id: update_firmware
  label: Update Firmware and Reboot
  kind: action
  params: []
  protocol_form: QUPDATEFW<cr>

- id: send_discovery_beacon
  label: Send Identity Multicast Beacon
  kind: action
  params: []
  protocol_form: QSDDPI<cr>

- id: wake_device
  label: Wake Device
  kind: action
  params: []
  protocol_form: QWAKE<cr>

- id: get_status_version
  label: Request Device Status
  kind: action
  params: []
  protocol_form: QSTATVER<cr>

- id: send_ir_pulse
  label: Send IR Hex Code
  kind: action
  params:
    - name: id
      type: string
      description: IRUSB_device_id target (optional; omit to broadcast)
    - name: repeat
      type: integer
      description: Number of repeats (optional)
    - name: hex_code
      type: string
      description: IR hex code in proto hex format
  protocol_form: QSIRPULSE ID=######## R=## hex_code<cr>

- id: send_dircode
  label: Send Preconfigured Sink Code
  kind: action
  params:
    - name: code
      type: string
      description: Predefined sink code number (yyy)
    - name: id
      type: string
      description: IRUSB_device_id target (optional)
    - name: repeat
      type: integer
      description: Number of repeats (optional)
  protocol_form: QDIRCODEyyy ID=######## R=##<cr>

- id: send_source_code
  label: Send Preconfigured Source Code
  kind: action
  params:
    - name: code
      type: string
      description: Predefined source code number (yyy)
    - name: id
      type: string
      description: IRUSB_device_id target (optional)
    - name: repeat
      type: integer
      description: Number of repeats (optional)
  protocol_form: QSIRCODEyyy ID=######## R=##<cr>

- id: send_named_code
  label: Send Preconfigured Named Code
  kind: action
  params:
    - name: codename
      type: string
      description: Named code string
    - name: id
      type: string
      description: IRUSB_device_id target (optional)
    - name: repeat
      type: integer
      description: Number of repeats (optional)
  protocol_form: QSIRNCODE ID=######## R=## CODENAME<cr>

- id: set_motion_trigger
  label: Set Motion Trigger State
  kind: action
  params:
    - name: id
      type: string
      description: 8-digit device id
    - name: state
      type: integer
      description: Motion state (0=off, 1=on)
    - name: trigger_enable
      type: integer
      description: 1=triggers fire on state change, 0=no triggers
  protocol_form: QMOTSET ID=######## a b<cr>

- id: config_motion_sensor
  label: Configure Motion Sensor Settings
  kind: action
  params:
    - name: id
      type: string
      description: 8-digit device id
    - name: on_sensitivity
      type: integer
      description: On sensitivity 0-31 (0=longest range, 10=recommended)
    - name: off_sensitivity
      type: integer
      description: Off sensitivity 0-31 (0=longest range, 10=recommended)
    - name: on_filter
      type: integer
      description: On filter 0-63 (2=recommended)
    - name: off_filter
      type: integer
      description: Off filter 0-63 (5=recommended)
    - name: config
      type: integer
      description: Config bit field (1=recommended for setup, 3=otherwise)
  protocol_form: QMOTCONFS ID=######## a b c d e<cr>

- id: config_auto_hid_code
  label: Configure Auto Mode HID Code
  kind: action
  params:
    - name: id
      type: string
      description: 8-digit device id
    - name: code_index
      type: integer
      description: Code index 0-3 (ON codes), 4-7 (OFF codes)
    - name: hid_code
      type: string
      description: HID code format (ABBBCCC)
  protocol_form: QMOTCONFHa ID=######## ABBBCCC<cr>

- id: config_auto_ir_code
  label: Configure Auto Mode IR Code
  kind: action
  params:
    - name: id
      type: string
      description: 8-digit device id
    - name: code_index
      type: integer
      description: Code index 0=on, 1=off
    - name: hex_code
      type: string
      description: IR hex code in proto hex format
  protocol_form: QMOTCONFIa ID=######## hex_code<cr>

- id: launch_app
  label: Launch Android App via Intent URL
  kind: action
  params:
    - name: url
      type: string
      description: Android intent URL (android-app://...)
  protocol_form: QLAUNCH URL<cr>

- id: send_hid_code
  label: Send HID Control Code
  kind: action
  params:
    - name: mode
      type: integer
      description: >
        1=keyboard short press, 2=consumer short press,
        5=keyboard long press, 6=consumer long press,
        3=System command, 9=Wakeup command, 0=cancel all keys
    - name: ctrl_keys
      type: integer
      description: Control keys / upper byte for consumer (decimal)
    - name: key_code
      type: integer
      description: Key code (decimal)
  protocol_form: QHIDCODEABBBCCC<cr>

- id: open_voice_search
  label: Open Voice Search
  kind: action
  params: []
  protocol_form: QHIDVS<cr>

- id: text_search
  label: Open Text Search
  kind: action
  params:
    - name: searchtext
      type: string
      description: Search text string
  protocol_form: QHIDTS searchtext<cr>
```

## Feedbacks
```yaml
- id: command_echo
  description: IRUSB echoes every valid command back, terminated by <cr>
  type: string

- id: status_version_response
  description: >
    Response to QSTATVER: QSTATVER<cr> OK<cr> version_string<cr> device_version device_id[<cr> motion_state]
    IRUSB devices: version starts with V2XX. usbMotion: V3XX + optional motion state (0=no motion, 1=motion)
  type: string

- id: ir_pulse_received
  description: Received IR code transmitted to all connected TCP sockets
  type: string
  protocol_form: QSIRPULSE000 hex_code<cr>

- id: named_code_received
  description: Named code event from RX database match
  type: string
  protocol_form: QSIRNCODE CODENAME<cr>

- id: motion_on
  description: Motion trigger ON event (usbMotion only)
  type: string
  protocol_form: QMOTIONON devid<cr>

- id: motion_off
  description: Motion trigger OFF event (usbMotion only)
  type: string
  protocol_form: QMOTIONOFF devid<cr>

- id: playback_state
  description: Response to QGETPLAY
  type: enum
  values:
    - "0"
    - "1"
  protocol_form: QGETPLAY<cr> → 0<cr> or 1<cr>

- id: foreground_app
  description: Package name of current foreground app (QGETFG)
  type: string
  protocol_form: QGETFG<cr> → app_package<cr>
```

## Variables
```yaml
- id: motion_trigger_state
  label: Motion Trigger State
  type: enum
  values: [0, 1]
  protocol_form: QMOTSET ID=######## a b<cr>

- id: motion_sensor_config
  label: Motion Sensor Configuration
  type: object
  fields:
    - on_sensitivity: integer (0-31)
    - off_sensitivity: integer (0-31)
    - on_filter: integer (0-63)
    - off_filter: integer (0-63)
    - config: integer
  protocol_form: QMOTCONFS ID=######## a b c d e<cr>

- id: auto_mode_hid_code
  label: Auto Mode HID Code Config
  type: object
  fields:
    - code_index: integer (0-7)
    - hid_code: string (ABBBCCC)
  protocol_form: QMOTCONFHa ID=######## ABBBCCC<cr>

- id: auto_mode_ir_code
  label: Auto Mode IR Code Config
  type: object
  fields:
    - code_index: integer (0-1)
    - hex_code: string
  protocol_form: QMOTCONFIa ID=######## hex_code<cr>
```

## Events
```yaml
- id: discovery_beacon
  description: Multicast discovery packet sent every 5 minutes
  type: string
  protocol_form: Notify\nUUID\nIP_ADDRESS\nPORT\n0\n<cr>
  address: 239.255.255.250
  port: 1904

- id: ir_code_received
  description: IR code received by any attached IRUSB device, broadcast to all TCP sockets
  type: string
  protocol_form: QSIRPULSE000 hex_code<cr>

- id: named_code_database_match
  description: Named code event when IR matches RX database entry
  type: string
  protocol_form: QSIRNCODE CODENAME<cr>

- id: motion_on_event
  description: Motion detected ON (usbMotion only)
  type: string
  protocol_form: QMOTIONON devid<cr>

- id: motion_off_event
  description: Motion detected OFF (usbMotion only)
  type: string
  protocol_form: QMOTIONOFF devid<cr>
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
All commands start with Q and terminate with a single <cr> (0xD ascii). IRUSB echoes every valid command back as confirmation. The IRUSB does not add <lf> after <cr> — serial terminals must be configured accordingly.

Global Cache 3rd party protocol (iTach-compatible) supported on separate TCP port.

LED visibility can interfere with motion detection at high sensitivity — recommend disabling LED after installation.

## Provenance

```yaml
source_domains:
  - video-storm.com
retrieved_at: 2026-05-04T18:03:36.367Z
last_checked_at: 2026-04-30T09:51:57.196Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:51:57.196Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched verbatim in source; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
