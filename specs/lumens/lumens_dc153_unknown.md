---
spec_id: admin/lumens-dc153
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens DC153 Control Spec"
manufacturer: Lumens
model_family: DC153
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - DC153
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - mylumens.com
source_urls:
  - http://web.archive.org/web/20100925084728/http://lumens.com.tw/files/TechDoc/RS-232-DC153-2006-0814.pdf
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-09-16T03:39:11.424Z
last_checked_at: 2026-09-16T22:17:06.816Z
generated_at: 2026-09-16T22:17:06.816Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source"
  - "source contains no safety warnings, interlock procedures,"
  - "firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-16T22:17:06.816Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions match source rows 1-30 by unique CMD byte; transport params verified verbatim; 1:1 coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-16
---

# Lumens DC153 Control Spec

## Summary
The Lumens DC153 is a document camera supporting RS-232 serial control via a half-duplex asynchronous interface. This spec covers the binary command packet protocol (6-byte packets framed by STX/ACK handshake) including image, lamp, capture, playback, zoom, focus, brightness, and power functions.

<!-- UNRESOLVED: firmware version not stated in source -->

## Transport
```yaml
# RS-232 only per source. Wire diagram shows DB9 null-modem (PC RX/TX crossed, GND-GND).
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Flow control: NA"
auth:
  type: none  # inferred: no auth procedure in source
```

**Protocol framing (per source):**
- Transmit method: Asynchronous Half-Duplex Serial
- Handshake: PC sends STX = 0x73 ('s'), MASTER replies ACK = 0xAA
- Packet: 6 bytes — `A0h | CMD | P1 | P2 | P3 | AFh` (P3 reserved 00h for transmit; carries status byte `St` on return)
- Inter-byte delay: 0.1 ms
- Master active time: 10 ms < Time < 12 s
- Return status `St`: 0 = Action Succeed, 1 = NAK (No Action), 2 = Ignore (Command not in list)

## Traits
```yaml
# Inferred from documented commands:
# - powerable    (Power On/Off command present)
# - routable     (Source command switches Camera/PC input)
# - queryable    (multiple "Call *" status query commands present)
# - levelable    (Brightness Control, Zoom Control, Focus Control, Set R/B value)
```

## Actions
```yaml
# Each row from the source command packet table is a separate action.
# Literal hex payloads preserved verbatim from source (A0h prefix + CMD byte + params + 00h + AFh suffix).
# "Call *" entries are queries (kind: query) returning state.

- id: reset
  label: Reset to Factory
  kind: action
  command: "A0 03 00 00 00 AF"
  params: []
  notes: "P1 must be 00h for factory reset."

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  command: "A0 A3 00 00 00 AF"
  params: []
  notes: "Triggers one-shot autofocus."

- id: white_balance_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  command: "A0 22 00 00 00 AF"
  params: []
  notes: "Triggers one-shot auto white balance."

- id: freeze
  label: Freeze
  kind: action
  command: "A0 2C {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00 = Off, 01 = On"

- id: image_mode
  label: Image Mode
  kind: action
  command: "A0 36 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Normal, 01=Gray, 02=Film, 03=Positive, 04=Microscope"

- id: source_select
  label: Source Select
  kind: action
  command: "A0 37 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Camera, 01=PC"

- id: lamp
  label: Lamp
  kind: action
  command: "A0 38 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Off, 01=On"

- id: key_function
  label: Remote Key Function
  kind: action
  command: "A0 A0 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "01=Set, 02=Up, 03=Down, 04=Left, 05=Right, 06=Menu"

- id: set_rb_value
  label: Set R/B Gain
  kind: action
  command: "A0 A1 {P1} {P2} 00 AF"
  params:
    - name: P1
      type: integer
      description: "Red gain value (0~96)"
    - name: P2
      type: integer
      description: "Blue gain value (0~96)"

- id: call_rb_value
  label: Call R/B Value
  kind: query
  command: "A0 A2 00 00 00 AF"
  params: []
  notes: "Returns Red value in P1 (0~96), Blue value in P2 (0~96)."

- id: set_sharpness
  label: Set Sharpness (Gamma)
  kind: action
  command: "A0 A7 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Photo, 01=Text"

- id: power_on_off
  label: Power On/Off
  kind: action
  command: "A0 B1 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Off, 01=On"

- id: capture
  label: Capture
  kind: action
  command: "A0 B2 00 {P2} 00 AF"
  params:
    - name: P2
      type: integer
      description: "00 = Normal Capture. Returned RP2 = amount of currently stored images."

- id: playback
  label: Playback
  kind: action
  command: "A0 B3 00 {P2} 00 AF"
  params:
    - name: P2
      type: integer
      description: "00 = Normal Playback (80-picture playback index). Returned RP2 = amount of currently stored images."

- id: flip
  label: Flip
  kind: action
  command: "A0 B5 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=Disable, 01=Flip"

- id: delete
  label: Delete
  kind: action
  command: "A0 B6 {P1} {P2} 00 AF"
  params:
    - name: P1
      type: integer
      description: "00=delete one picture, 01=delete all pictures, 02=Format"
    - name: P2
      type: integer
      description: "00 = Delete one image (Execute Playback and Playback Index only). Returned RP2 = amount of currently stored images."

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  command: "A0 62 00 00 00 AF"
  params: []
  notes: "Returns P1: 100 (Wide) ~ 1600 (Tele)."

- id: call_focus_position
  label: Call Focus Position
  kind: query
  command: "A0 64 00 00 00 AF"
  params: []
  notes: "Returns P1P2 (16-bit): 0 (Near) ~ Max (Far)."

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  command: "A0 78 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Off, 01=On."

- id: call_flip_status
  label: Call Flip Status
  kind: query
  command: "A0 79 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Off, 01=On."

- id: call_ae_status
  label: Call AE Status
  kind: query
  command: "A0 80 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Manual, 01=Auto; P2: Brightness value."

- id: call_image
  label: Call Image Mode
  kind: query
  command: "A0 87 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Normal, 01=Gray, 02=Film, 03=Positive, 04=Microscope."

- id: call_lamp_status
  label: Call Lamp Status
  kind: query
  command: "A0 50 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Off, 01=On."

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  command: "A0 51 00 00 00 AF"
  params: []
  notes: "Returns P1: 00=Photo, 01=Text."

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "A0 39 {P1} {P2} 00 AF"
  params:
    - name: P1
      type: integer
      description: "02=Set brightness to P2 value directly, 01=Increase (+1), 00=Decrease (-1)"
    - name: P2
      type: integer
      description: "When P1=02, target brightness value (auto adjusts to that value)."

- id: zoom_control
  label: Zoom Control
  kind: action
  command: "A0 3A {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "01=Zoom In (+1), 00=Zoom Out (-1). Returned RP1(LOW)/RP2(HIGH) = Zoom position."

- id: focus_control
  label: Focus Control
  kind: action
  command: "A0 3B {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "01=Focus (+1, far), 00=Focus (-1, near). Returned RP1(LOW)/RP2(HIGH) = Focus position."

- id: reflash_eeprom
  label: Reflash Important Values on EEPROM
  kind: action
  command: "A0 42 {P1} 00 00 AF"
  params:
    - name: P1
      type: integer
      description: "02=Image Data, 03=User Preset, 04=Error Code. Clears saved EEPROM values; returns to defaults after reboot."

- id: call_version
  label: Call Version
  kind: query
  command: "A0 45 00 00 00 AF"
  params: []
  notes: "Returns firmware version as 'DK P1.P2 P3'."

- id: call_preset_menu
  label: Call Preset Menu
  kind: query
  command: "A0 A4 00 00 00 AF"
  params: []
```

## Feedbacks
```yaml
# One entry per observable state surfaced by a "Call *" query or return-packet field.

- id: power_state
  type: enum
  values: [on, off]
  source_query: power_on_off

- id: freeze_state
  type: enum
  values: [off, on]
  source_query: call_freeze_status

- id: flip_state
  type: enum
  values: [disabled, enabled]
  source_query: call_flip_status

- id: lamp_state
  type: enum
  values: [off, on]
  source_query: call_lamp_status

- id: image_mode
  type: enum
  values: [normal, gray, film, positive, microscope]
  source_query: call_image

- id: source_input
  type: enum
  values: [camera, pc]
  source_query: source_select

- id: sharpness_mode
  type: enum
  values: [photo, text]
  source_query: call_text_photo_status

- id: ae_mode
  type: enum
  values: [manual, auto]
  source_query: call_ae_status

- id: brightness_value
  type: integer
  source_query: call_ae_status
  notes: "Returned in P2 of AE Status response."

- id: digital_zoom_position
  type: integer
  range: [100, 1600]
  source_query: call_digital_zoom_position
  notes: "P1 of response. 100=Wide, 1600=Tele."

- id: focus_position
  type: integer
  range: [0, 65535]
  source_query: call_focus_position
  notes: "P1P2 (16-bit little-endian) of response. 0=Near, Max=Far."

- id: red_gain
  type: integer
  range: [0, 96]
  source_query: call_rb_value

- id: blue_gain
  type: integer
  range: [0, 96]
  source_query: call_rb_value

- id: stored_image_count
  type: integer
  source_query: capture
  notes: "Returned in RP2 after Capture, Playback, or Delete operations."

- id: firmware_version
  type: string
  source_query: call_version
  notes: "Format: 'DK P1.P2 P3'."

- id: command_status
  type: enum
  values: [succeed, nak, ignore]
  notes: "Status byte St in every return packet: 0=Action Succeed, 1=NAK (No Action), 2=Ignore (Command not in list)."
```

## Variables
```yaml
# Section omitted: every documented parameter is either a discrete command
# (covered as an Action) or returned via a query (covered as a Feedback).
# No standalone settable-but-not-discrete variables exist in this protocol.
```

## Events
```yaml
# Section omitted: source describes no unsolicited push notifications.
# All device-to-host traffic is solicited (reply to a sent command).
```

## Macros
```yaml
# Section omitted: source defines no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements. Only the Reflash EEPROM command
# mentions a side effect (clears saved EEPROM, defaults restored after reboot);
# controller-side confirmation is recommended but not mandated by source.
```

## Notes
- Packet framing is non-standard ASCII: bytes are 6-byte fixed frames `A0h CMD P1 P2 P3 AFh`, not ASCII text or VISCA. STX (`0x73`) / ACK (`0xAA`) handshake precedes every command; PC must wait for ACK before transmitting the 6 payload bytes.
- Inter-byte gap of 0.1 ms is required during payload transmission; Master reply may take 10 ms–12 s depending on command.
- Return packets mirror the request structure but byte 5 carries the status byte `St` (0=OK, 1=NAK, 2=Ignore) instead of the reserved `00h`.
- Source contains obvious typos: "FlIm" (Film), "Microscpoe" (Microscope), "Reflash" (Reflash), "Uncton" (Function). Param values copied verbatim from source where present; inferred corrections only applied to labels/descriptions.
- The DC153 was discontinued by Lumens; this protocol document is the only known machine-readable spec and appears to predate the current mylumens.com catalog.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - mylumens.com
source_urls:
  - http://web.archive.org/web/20100925084728/http://lumens.com.tw/files/TechDoc/RS-232-DC153-2006-0814.pdf
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-09-16T03:39:11.424Z
last_checked_at: 2026-09-16T22:17:06.816Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:17:06.816Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions match source rows 1-30 by unique CMD byte; transport params verified verbatim; 1:1 coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source"
- "source contains no safety warnings, interlock procedures,"
- "firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
