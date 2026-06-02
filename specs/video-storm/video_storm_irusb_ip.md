---
spec_id: admin/video-storm-irusb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Video Storm IRUSB Control Spec"
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
  - github.com
source_urls:
  - http://www.video-storm.com/manuals/IrUSB_protocol.pdf
  - "https://www.video-storm.com/Downloads/driver%20support.htm"
  - https://github.com/videostormdev/IRUSB_linux
  - "https://www.video-storm.com/proddetail.php?prod=IRUSB"
retrieved_at: 2026-04-29T15:41:24.131Z
last_checked_at: 2026-06-02T07:06:50.250Z
generated_at: 2026-06-02T07:06:50.250Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "usbMotion is a sibling/companion product; control surface overlaps but some sections (motion config, auto-mode) apply only to usbMotion. Spec lists both where source does."
  - "no settable parameter block is documented as a standalone"
  - "no multi-step sequences are documented in the source."
  - "source contains no explicit safety warnings, interlocks, or"
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:50.250Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions matched exactly in source with correct transport parameters (TCP port 9093, no auth). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Video Storm IRUSB Control Spec

## Summary
Spec covers Video Storm IRUSB and usbMotion devices over TCP/IP on port 9093. Protocol is line-based ASCII, commands prefixed with `Q` and terminated by `<cr>` (0x0D). Includes device discovery (multicast beacon + `QSTATVER` query), IR TX/RX, motion state/config (usbMotion), HID control, Android intent launching, and playback metadata queries.

<!-- UNRESOLVED: usbMotion is a sibling/companion product; control surface overlaps but some sections (motion config, auto-mode) apply only to usbMotion. Spec lists both where source does. -->

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
- queryable       # inferred from QSTATVER, QGETPLAY, QGETFG query commands
```

## Actions
```yaml
- id: restart
  label: Reboot IRUSB
  kind: action
  command: "QRESTART<cr>"
  params: []

- id: update_firmware
  label: Update Firmware and Reboot
  kind: action
  command: "QUPDATEFW<cr>"
  params: []

- id: send_identity_beacon
  label: Send Identity Multicast Beacon
  kind: action
  command: "QSDDPI<cr>"
  params: []

- id: wake
  label: Wake Device if Sleeping
  kind: action
  command: "QWAKE<cr>"
  params: []

- id: query_status_version
  label: Request Device Status
  kind: query
  command: "QSTATVER<cr>"
  params: []

- id: ir_tx_pulse
  label: Send IR Hex Code
  kind: action
  command: "QSIRPULSE ID={device_id} R={repeat} {hex_code}<cr>"
  params:
    - name: device_id
      type: string
      description: Optional 8-hex-digit IRUSB device_id. Omit (send `QSIRPULSE {hex_code}<cr>`) to broadcast to all attached devices.
    - name: repeat
      type: integer
      description: Optional number of times to repeat the code. Omit to send once.
    - name: hex_code
      type: string
      description: Proto hex format IR code (captured/general IR format only).

- id: ir_tx_database_sink
  label: Send Preconfigured Sink Code
  kind: action
  command: "QDIRCODE{yyy} ID={device_id} R={repeat}<cr>"
  params:
    - name: yyy
      type: string
      description: Preconfigured sink code index/name suffix.
    - name: device_id
      type: string
      description: Optional 8-hex-digit IRUSB device_id.
    - name: repeat
      type: integer
      description: Optional repeat count.

- id: ir_tx_database_source
  label: Send Preconfigured Source Code
  kind: action
  command: "QSIRCODE{yyy} ID={device_id} R={repeat}<cr>"
  params:
    - name: yyy
      type: string
      description: Preconfigured source code index/name suffix.
    - name: device_id
      type: string
      description: Optional 8-hex-digit IRUSB device_id.
    - name: repeat
      type: integer
      description: Optional repeat count.

- id: ir_tx_database_named
  label: Send Preconfigured Named Code
  kind: action
  command: "QSIRNCODE ID={device_id} R={repeat} {codename}<cr>"
  params:
    - name: device_id
      type: string
      description: Optional 8-hex-digit IRUSB device_id.
    - name: repeat
      type: integer
      description: Optional repeat count.
    - name: codename
      type: string
      description: Name of preconfigured code.

- id: motion_set_state
  label: Manual Set Motion Trigger State (usbMotion)
  kind: action
  command: "QMOTSET ID={device_id} {a} {b}<cr>"
  params:
    - name: device_id
      type: string
      description: 8-hex-digit usbMotion device_id.
    - name: a
      type: integer
      description: Motion state to set (0 or 1).
    - name: b
      type: integer
      description: If 1, fire motion triggers on state change. If 0, suppress triggers.

- id: motion_config_sensitivity
  label: Motion Sensor Config (usbMotion)
  kind: action
  command: "QMOTCONFS ID={device_id} {a} {b} {c} {d} {e}<cr>"
  params:
    - name: device_id
      type: string
      description: 8-hex-digit usbMotion device_id.
    - name: a
      type: integer
      description: On sensitivity, 0-31. 0 = longest range, 10 recommended.
    - name: b
      type: integer
      description: Off sensitivity, 0-31. 0 = longest range, 10 recommended.
    - name: c
      type: integer
      description: On filter, 0-63. 2 recommended.
    - name: d
      type: integer
      description: Off filter, 0-63. 5 recommended.
    - name: e
      type: integer
      description: Config field. 1 recommended for setup, 3 otherwise.

- id: motion_config_hid_auto
  label: Motion HID Auto-Mode Code (usbMotion)
  kind: action
  command: "QMOTCONFH{a} ID={device_id} {ABBBCCC}<cr>"
  params:
    - name: a
      type: integer
      description: Code index. 0-3 = ON codes, 4-7 = OFF codes.
    - name: device_id
      type: string
      description: 8-hex-digit usbMotion device_id.
    - name: ABBBCCC
      type: string
      description: HID code in the same format as QHIDCODE payload.

- id: motion_config_ir_auto
  label: Motion IR Auto-Mode Code (usbMotion)
  kind: action
  command: "QMOTCONFI{a} ID={device_id} {hex_code}<cr>"
  params:
    - name: a
      type: integer
      description: Code index. 0 = on, 1 = off.
    - name: device_id
      type: string
      description: 8-hex-digit usbMotion device_id.
    - name: hex_code
      type: string
      description: Proto hex format IR code (captured/general IR format only).

- id: launch_android_app
  label: Launch Android App via Intent URL
  kind: action
  command: "QLAUNCH {url}<cr>"
  params:
    - name: url
      type: string
      description: android-app:// intent URL with package and component names. Example: `android-app://org.xbmc.kodi#Intent;component=org.xbmc.kod/.Splash;end`.

- id: hid_send_code
  label: Send HID Keyboard/Consumer Code
  kind: action
  command: "QHIDCODE{A}{BBB}{CCC}<cr>"
  params:
    - name: A
      type: integer
      description: "Type: 1=keyboard short, 2=consumer short, 5=keyboard long, 6=consumer long, 3=system command, 9=wakeup, 0=cancel all keys."
    - name: BBB
      type: integer
      description: "Control keys for keyboard, upper byte for consumer (decimal). Bits 0-7: L CTRL, L SHIFT, L ALT, L GUI, R CTRL, R SHIFT, R ALT, R GUI."
    - name: CCC
      type: integer
      description: "Key to send (decimal). See https://source.android.com/devices/input/keyboard-devices#hid-keyboard-and-keypadpage-0x07"

- id: get_playback_state
  label: Get A/V Playback State
  kind: query
  command: "QGETPLAY<cr>"
  params: []

- id: get_foreground_app
  label: Get Current Foreground App Package
  kind: query
  command: "QGETFG<cr>"
  params: []

- id: hid_voice_search
  label: Open Voice Search
  kind: action
  command: "QHIDVS<cr>"
  params: []

- id: hid_text_search
  label: Open Text Search
  kind: action
  command: "QHIDTS {searchtext}<cr>"
  params:
    - name: searchtext
      type: string
      description: Search query text.
```

## Feedbacks
```yaml
# IRUSB echoes back every valid command terminated by <cr>; this is the
# primary command ack mechanism. No separate success/failure string documented.
# Echo pattern: <original command><cr>
- id: command_echo
  type: none
  description: Every valid <cr>-terminated command sent to IRUSB is echoed back unchanged (no <lf> appended). Source notes this is the easiest way to verify cable connection.

- id: qstatver_response
  type: string
  description: "QSTATVER response format: `OK<cr>` followed by `Driver/app Version string<cr>`, then one `IRUSB_device_version   IRUSB_device_id<cr>` line per attached IRUSB. usbMotion devices return V3XX version strings and append `0` or `1` motion-state to that line."

- id: getplay_response
  type: enum
  values: [no_av_playing, av_playing]
  description: "QGETPLAY returns `0<cr>` if no A/V playing, `1<cr>` if A/V is playing."

- id: getfg_response
  type: string
  description: "QGETFG returns `app_package<cr>` - package name of the current foreground app."
```

## Variables
```yaml
# UNRESOLVED: no settable parameter block is documented as a standalone
# non-action variable in the source. Motion config fields (sensitivity, filters)
# are emitted as parameters of the motion_config_sensitivity action above.
```

## Events
```yaml
- id: ir_rx_raw_pulse
  label: IR RX Raw Pulse
  description: "Sent to all connected TCP sockets when any attached IRUSB device receives an IR code."
  payload: "QSIRPULSE000 {hex_code}<cr>"

- id: ir_rx_database_match
  label: IR RX Database Match
  description: "Sent to all connected TCP sockets (and the Cloud socket is restricted to these) when an IRUSB receives a code matching a configured RX database code."
  payload: "QSIRNCODE {codename}<cr>"

- id: motion_on
  label: usbMotion Trigger ON
  description: "Sent to all connected TCP sockets when an attached usbMotion device receives a motion trigger."
  payload: "QMOTIONON {devid}<cr>"

- id: motion_off
  label: usbMotion Trigger OFF
  description: "Sent to all connected TCP sockets when an attached usbMotion device motion clears."
  payload: "QMOTIONOFF {devid}<cr>"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements.
```

## Notes
- All commands start with `Q` and terminate with `<cr>` (0x0D, single ASCII char — NOT the 4-char sequence `<cr>`). IRUSB does not append `<lf>` after `<cr>`. On Windows Hyper-terminal enable line-feed-on-carriage-return if needed.
- IRUSB echoes every valid command — easiest cable-connection sanity check.
- Multiple TCP connections supported on port 9093. IRUSB also runs a Cloud socket on a different TCP port; only IR RX database-match events are forwarded to the Cloud socket.
- 3rd-party Global Cache iTach protocol is supported in parallel on a different TCP port for IR TX; iTach device drivers should work against IRUSB.
- Device discovery: IRUSB sends a multicast beacon every 5 min to `239.255.255.250:1904` with payload `Notify \nUUID \nIP_ADDRESS \nPORT \n0 \n\r` (PORT always 9093). Use `QSTATVER` to enumerate attached IRUSB device_ids.
- Version strings: IRUSB devices start with `V2XX`, usbMotion devices return `V3XX`. usbMotion `QSTATVER` line also includes motion state (`0`/`1`).
- usbMotion only: `QMOTSET`, `QMOTCONFS`, `QMOTCONFH`, `QMOTCONFI`, and `QMOTIONON`/`QMOTIONOFF` events. Auto-mode (`QMOTCONFH`/`QMOTCONFI`) should only be configured when not using the IRUSB app/driver for control.
- IR TX ID field (`ID=########`) is the 8-hex-digit IRUSB device_id; omit to broadcast to all attached devices.
- IR USB Motion sensitivity note: values below 5 may cause false triggers; use non-zero On/Off filters at higher sensitivity.
- HID code mapping: `https://source.android.com/devices/input/keyboard-devices#hid-keyboard-and-keypadpage-0x07`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - video-storm.com
  - github.com
source_urls:
  - http://www.video-storm.com/manuals/IrUSB_protocol.pdf
  - "https://www.video-storm.com/Downloads/driver%20support.htm"
  - https://github.com/videostormdev/IRUSB_linux
  - "https://www.video-storm.com/proddetail.php?prod=IRUSB"
retrieved_at: 2026-04-29T15:41:24.131Z
last_checked_at: 2026-06-02T07:06:50.250Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:50.250Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions matched exactly in source with correct transport parameters (TCP port 9093, no auth). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "usbMotion is a sibling/companion product; control surface overlaps but some sections (motion config, auto-mode) apply only to usbMotion. Spec lists both where source does."
- "no settable parameter block is documented as a standalone"
- "no multi-step sequences are documented in the source."
- "source contains no explicit safety warnings, interlocks, or"
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
