---
spec_id: admin/toa-am-cf1
schema_version: ai4av-public-spec-v1
revision: 1
title: "TOA AM-CF1 Control Spec"
manufacturer: TOA
model_family: AM-CF1
aliases: []
compatible_with:
  manufacturers:
    - TOA
  models:
    - AM-CF1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - toa.com.sg
  - go2.toa-global.com
source_urls:
  - "https://toa.com.sg/document/2496-am-cf1-integrated-audio-collaboration-system-(firmware-updating-procedure)-others.pdf"
  - https://go2.toa-global.com/am-cf1
retrieved_at: 2026-04-29T19:25:10.564Z
last_checked_at: 2026-04-27T15:47:24.452Z
generated_at: 2026-04-27T15:47:24.452Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical form factor, audio channel counts, wattage, operating temperature range not stated in source"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated in source"
  - "physical dimensions, weight, power consumption not stated in source"
  - "default username/password (admin/admin) noted in example but source does not state how to change credentials"
  - "maximum concurrent TCP sessions not stated in source"
  - "error code semantics beyond ACK/NACK not detailed in source"
  - "factory reset procedure not documented in source"
verification:
  verdict: verified
  checked_at: 2026-04-27T15:47:24.452Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literal commands in source; transport parameters verified; bidirectional coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# TOA AM-CF1 Control Spec

## Summary

The AM-CF1 is an integrated audio collaboration system controllable over TCP/IP via a binary command protocol. Third-party controllers authenticate with a username/password combination before issuing commands to control speaker gain, mute, memory presets, standby mode, Bluetooth, and microphone beam steering. The device operates as a TCP server on a configurable port (default 3000) and maintains connection with keepalive messages.

<!-- UNRESOLVED: physical form factor, audio channel counts, wattage, operating temperature range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 3000  # default; configurable per source: "Set the port number according to the remote controller to be connected"
auth:
  type: password
  mechanism: binary challenge (username + 16-byte ASCII password, command 80H, 20H)
connection:
  keepalive: send at least 1 byte every 10s (0xFF if no status data), or connection drops after 60s silence
```

## Traits
```yaml
- powerable  # standby mode ON/OFF commands present (F3H)
- routable  # memory preset recall commands present (F1H)
- queryable  # status request commands for gain, mute, preset, standby, bluetooth, beam steering
- levelable  # speaker output gain absolute and step commands present (91H)
```

## Actions
```yaml
- id: login
  label: Log In
  kind: action
  params:
    - name: username
      type: string
      description: 16-byte ASCII; pad with 0x00 if shorter
    - name: password
      type: string
      description: 16-byte ASCII; pad with 0x00 if shorter
  command: 80H, 20H, <username>, <password>
  response: 80H, 01H, 01H (ACK) or 80H, 01H, 00H (NACK)

- id: logout
  label: Log Out
  kind: action
  params: []
  command: 81H, 00H
  response: 81H, 00H

- id: set_speaker_gain_absolute
  label: Set Speaker Output Gain (Absolute)
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: "01H = Speaker Out (fixed)"
    - name: channel_number
      type: integer
      description: "00H (fixed)"
    - name: position
      type: integer
      description: 00H-3FH maps to -∞ to 0dB per gain table; default 3DH (0dB)
  command: 91H, 03H, <channel_attribute>, <channel_number>, <position>
  response: 91H, 03H, <channel_attribute>, <channel_number>, <position>

- id: set_speaker_gain_step
  label: Set Speaker Output Gain (Step)
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: "01H = Speaker Out; 00H = Mic In (also updates web gain)"
    - name: channel_number
      type: integer
      description: "00H (fixed)"
    - name: step
      type: integer
      description: "41H-5FH = 1-31 steps up; 61H-7FH = 1-31 steps down (min position 01H)"
  command: 91H, 03H, <channel_attribute>, <channel_number>, <step>
  response: 91H, 03H, <channel_attribute>, <channel_number>, <position>

- id: set_mute
  label: Set Mute Mode
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: "00H = Mic In; 01H = Speaker Out"
    - name: channel_number
      type: integer
      description: "00H (fixed)"
    - name: on_off
      type: integer
      description: "00H = unmute; 01H = mute"
  command: 98H, 03H, <channel_attribute>, <channel_number>, <on_off>
  response: 98H, 03H, <channel_attribute>, <channel_number>, <on_off>

- id: recall_preset
  label: Recall Memory Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "00H = Preset 1; 01H = Preset 2"
  command: F1H, 02H, 00H, <preset_number>
  response: F1H, 02H, 00H, <preset_number>
  note: Requires processing time; adjust response wait time accordingly

- id: set_standby
  label: Set Standby Mode
  kind: action
  params:
    - name: standby_mode
      type: integer
      description: "00H = standby OFF; 01H = standby ON"
  command: F3H, 02H, 00H, <standby_mode>
  response: F3H, 02H, 00H, <standby_mode>

- id: set_bluetooth
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: "00H = OFF (disconnect/cancel); 01H = ON (start pairing)"
  command: F5H, 02H, 00H, <on_off>
  response: F5H, 02H, 00H, <bluetooth_mode>
  notes:
    - Bluetooth Mode response values: 00H = OFF, 01H = In pairing registration, 02H = In connection

- id: set_mic_beam_steering
  label: Set Microphone Beam Steering
  kind: action
  params:
    - name: auto_manual
      type: integer
      description: "00H = Auto; 01H = Manual"
    - name: direction
      type: integer
      description: "Signed 1-byte; -90 to 90 deg (Manual); 0 (Auto)"
    - name: distance
      type: integer
      description: "Big-endian unsigned 2-byte; Manual: 0-2400 (inch×10) or 0-6000 (cm×10)"
    - name: unit
      type: integer
      description: "00H = inch; 01H = cm"
  command: A0H, 05H, <auto_manual>, <direction>, <distance>, <unit>
  response: A0H, 05H, <auto_manual>, <direction>, <distance>, <unit>

- id: set_status_notification
  label: Set Status Notification
  kind: action
  params:
    - name: on_off
      type: integer
      description: "00H = OFF; 01H = ON; default OFF"
  command: F2H, 02H, 00H, <on_off>
  response: F2H, 02H, 00H, <on_off>
  note: Only active during logged-in session

- id: set_beam_steering_notification
  label: Set Microphone Beam Steering Status Notification
  kind: action
  params:
    - name: interval
      type: integer
      description: "00H = immediate; 01H-0AH = 100-1000msec in 100msec units"
    - name: unit
      type: integer
      description: "00H = inch; 01H = cm"
    - name: on_off
      type: integer
      description: "00H = OFF; 01H = ON; default OFF"
  command: F2H, 04H, 01H, <interval>, <unit>, <on_off>
  response: F2H, 04H, 01H, <interval>, <unit>, <on_off>
  note: Notification sent at interval regardless of value change; only active during logged-in session
- id: get_speaker_gain
  label: Get Speaker Output Gain Position
  kind: query
  params:
    - name: channel_attribute
      type: integer
      description: "01H = Speaker Out (fixed)"
    - name: channel_number
      type: integer
      description: "00H (fixed)"
  command: "F0H, 03H, 11H, <channel_attribute>, <channel_number>"
  response: "91H, 03H, <Channel Attribute>, <Channel Number>, <Position>"

- id: get_mute_mode
  label: Get Mute Mode
  kind: query
  params:
    - name: channel_attribute
      type: integer
      description: "00H = Mic In; 01H = Speaker Out"
    - name: channel_number
      type: integer
      description: "00H (fixed)"
  command: "F0H, 03H, 18H, <channel_attribute>, <channel_number>"
  response: "98H, 03H, <Channel Attribute>, <Channel Number>, <ON/OFF>"

- id: get_preset_number
  label: Get Memory Preset Number
  kind: query
  params: []
  command: "F0H, 02H, 71H, 00H"
  response: "F1H, 02H, 00H, <Preset Number>"

- id: get_standby_mode
  label: Get Standby Mode
  kind: query
  params: []
  command: "F0H, 02H, 72H, 00H"
  response: "F3H, 02H, 00H, <Standby mode>"

- id: get_bluetooth_mode
  label: Get Bluetooth Mode
  kind: query
  params: []
  command: "F0H, 02H, 74H, 00H"
  response: "F5H, 02H, 00H, <Bluetooth Mode>"

- id: get_beam_steering_setting
  label: Get Microphone Beam Steering Setting
  kind: query
  params: []
  command: "F0H, 05H, 20H, 00H, 00H, 00H, 00H"
  response: "A0H, 05H, <Auto/Manual>, <Direction>, <Distance>, <inch/cm>"

- id: get_beam_steering_position
  label: Get Microphone Beam Steering Position
  kind: query
  params:
    - name: unit
      type: integer
      description: "00H = inch; 01H = cm"
  command: "F0H, 06H, 50H, 00H, 00H, 00H, 00H, <unit>"
  response: "D0H, 06H, A0H, <X coordinate>, <Y coordinate>, <inch/cm>"
```

## Feedbacks
```yaml
- id: login_result
  type: enum
  values:
    - ack  (80H, 01H, 01H - credentials matched)
    - nack (80H, 01H, 00H - credentials did not match)
  note: Returns NACK for any command issued before successful login (except login/logout)

- id: speaker_gain_position
  type: integer
  range: 00H-3FH
  note: 00H = -∞dB, 3DH = 0dB, 3EH/3FH = 0dB; maps to Gain Table in source

- id: mute_state
  type: enum
  values:
    - unmuted (00H)
    - muted   (01H)

- id: preset_number
  type: enum
  values:
    - preset_1 (00H)
    - preset_2 (01H)

- id: standby_mode
  type: enum
  values:
    - off (00H)
    - on  (01H)

- id: bluetooth_mode
  type: enum
  values:
    - off (00H)
    - pairing_registration (01H)
    - connected (02H)

- id: mic_beam_steering_setting
  type: object
  fields:
    auto_manual: integer (00H=Auto, 01H=Manual)
    direction: integer (-90 to 90 for Manual, 0 for Auto)
    distance: integer (big-endian 2-byte, unit: inch×10 or cm×10)
    unit: integer (00H=inch, 01H=cm)

- id: mic_beam_steering_position
  type: object
  fields:
    x: integer (big-endian signed 2-byte; -600.0 to 600.0 cm/inch)
    y: integer (big-endian unsigned 2-byte; 0.0 to 600.0 cm/inch)
    unit: integer (00H=inch, 01H=cm)
  note: Unsolicited notification via D0H, 06H, A0H command when beam steering notification is enabled

- id: status_notification
  type: object
  description: Unsolicited status push; format matches corresponding status request response; only sent when status notification is ON and session is logged in
  note: Beam steering position pushed at configured interval when beam steering notification is ON
```

## Variables
```yaml
# All controllable settings are command-driven via Actions; no separate Variables section
# Gain table positions 00H-3FH map to dB values (-∞ to 0dB) per table in source
```

## Events
```yaml
- id: beam_steering_position_update
  description: AM-CF1 pushes current microphone beam steering position at the configured interval when beam steering status notification is enabled
  command: D0H, 06H, A0H, <X coordinate>, <Y coordinate>, <unit>
  fields:
    x: integer  (big-endian signed 2-byte; -240.0 to 240.0 inch or -600.0 to 600.0 cm)
    y: integer  (big-endian unsigned 2-byte; 0.0 to 240.0 inch or 0.0 to 600.0 cm)
    unit: integer (00H=inch, 01H=cm)
  note: Only active when beam steering status notification is ON and session is logged in
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

- AM-CF1 acts as TCP server; must maintain connection with keepalive (1 byte every 10s or 60s timeout)
- Binary command format: command byte (80H–FFH), data length byte, data bytes; max message 1024 bytes
- All commands require successful login (80H, 20H) first; login/logout are the only commands accepted without authentication
- If communication drops, controller must re-login
- Speaker gain step down minimum position is 01H (not 00H which is -∞dB)
- Preset recall requires processing time — wait before polling status
- Bluetooth ON puts device in discoverable/pairing mode; OFF disconnects or cancels pairing
- Beam steering position: X is signed (-90 to +90 deg effectively via coordinate system), Y is unsigned (0 to max distance)
- Default speaker gain position is 3DH (0dB)
- Status notification is OFF by default; beam steering notification is OFF by default
- Connection dropped if no data received from controller for 60 seconds
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: physical dimensions, weight, power consumption not stated in source -->
<!-- UNRESOLVED: default username/password (admin/admin) noted in example but source does not state how to change credentials -->
<!-- UNRESOLVED: maximum concurrent TCP sessions not stated in source -->
<!-- UNRESOLVED: error code semantics beyond ACK/NACK not detailed in source -->
<!-- UNRESOLVED: factory reset procedure not documented in source -->

## Provenance

```yaml
source_domains:
  - toa.com.sg
  - go2.toa-global.com
source_urls:
  - "https://toa.com.sg/document/2496-am-cf1-integrated-audio-collaboration-system-(firmware-updating-procedure)-others.pdf"
  - https://go2.toa-global.com/am-cf1
retrieved_at: 2026-04-29T19:25:10.564Z
last_checked_at: 2026-04-27T15:47:24.452Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:47:24.452Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literal commands in source; transport parameters verified; bidirectional coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical form factor, audio channel counts, wattage, operating temperature range not stated in source"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated in source"
- "physical dimensions, weight, power consumption not stated in source"
- "default username/password (admin/admin) noted in example but source does not state how to change credentials"
- "maximum concurrent TCP sessions not stated in source"
- "error code semantics beyond ACK/NACK not detailed in source"
- "factory reset procedure not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
