---
spec_id: admin/lumens-digital-optics-inc-cl510
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens Digital Optics Inc CL510 Control Spec"
manufacturer: Lumens
model_family: CL510
aliases: []
compatible_with:
  manufacturers:
    - Lumens
    - "Lumens Digital Optics Inc"
  models:
    - CL510
  firmware: "PVL303 / PVM105"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://www.mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-06-02T05:46:07.112Z
generated_at: 2026-06-02T05:46:07.112Z
firmware_coverage: "PVL303 / PVM105"
protocol_coverage: []
known_gaps:
  - "An Ethernet command set for the CL510 is referenced in vendor indexes but was not included in the source for this revision. RS-232 only."
  - "flow control not stated in source"
  - "a printing artefact in the source duplicates \"Parameter1\" in the return packet table; the second instance is treated here as Parameter 3 to match the command packet structure."
  - "no input/source selection commands"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "serial flow control not stated; AC 50/60 Hz return value encoding not specified; reg3 row description contains source-side ambiguity; firmware compatibility range beyond PVL303 / PVM105 unknown; Ethernet command set not included."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:07.112Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions match source command table one-to-one with identical opcodes; transport parameters (9600 baud, 8N1) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lumens Digital Optics Inc CL510 Control Spec

## Summary
The Lumens CL510 is a document camera (visual presenter) controllable over RS-232 serial. This spec covers the V02 command set, transmitted as 6-byte packets (`A0h CMD P1 P2 P3 AFh`) at 9600 bps, 8N1, with the camera returning a status packet for every command.

<!-- UNRESOLVED: An Ethernet command set for the CL510 is referenced in vendor indexes but was not included in the source for this revision. RS-232 only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  start_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

### Command packet format
| Byte | Field        | Value      |
|------|--------------|------------|
| 1    | STX          | `A0h`      |
| 2    | CMD          | `00h`–`FFh`|
| 3    | Parameter 1  | `00h`–`FFh`|
| 4    | Parameter 2  | `00h`–`FFh`|
| 5    | Parameter 3  | `00h`–`FFh`|
| 6    | ETX          | `AFh`      |

### Return packet format
`A0h CMD P1 P2 P3 St AFh` — Status byte `St` bits:
- bit 0–1: `00` = ACK, `01` = NAK, `10` = IGNORE, `11` = Not Used
- bit 4: Focus moving/stop
- bit 5: Zoom moving/stop
- bit 6: Iris moving/stop

<!-- UNRESOLVED: a printing artefact in the source duplicates "Parameter1" in the return packet table; the second instance is treated here as Parameter 3 to match the command packet structure. -->

## Traits
```yaml
# - powerable       (Power B1h, System ON/OFF B0h)
# - queryable       (Call * query commands)
# - routable        # UNRESOLVED: no input/source selection commands
# - levelable       (Iris P2 brightness, focus/zoom position, brightness -1/+1)
```

## Actions

```yaml
- id: preset_or_factory_reset
  label: Preset / Factory Reset
  kind: action
  command: "A0 03 {p1} {p2} {p3} AF"
  params:
    - { name: p1, type: integer, description: "0=Preset, 1=Factory Reset" }
    - { name: p2, type: integer, description: "0=Load preset, 1=Save preset (when p1=0)" }
    - { name: p3, type: integer, description: "Preset index 1-8 (when p1=0)" }

- id: slideshow_on_off
  label: Slideshow On/Off
  kind: action
  command: "A0 04 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: slideshow_delay
  label: Slideshow Delay
  kind: action
  command: "A0 06 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=0.5s, 1=1s, 2=3s, 3=5s, 4=10s, 5=Manual" }

- id: image_record_quality
  label: Image / Record Quality
  kind: action
  command: "A0 07 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=High, 1=Medium, 2=Low" }

- id: copy_nand_to_usb
  label: Copy From Nand to USB
  kind: action
  command: "A0 08 00 00 00 AF"
  params: []

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "A0 10 00 00 00 AF"
  params: []

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  command: "A0 11 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Tele, 1=Wide" }
    - { name: p2, type: integer, description: "Speed (range not specified in source)" }

- id: zoom_direct_no_af
  label: Zoom Direct (Straight, No AF)
  kind: action
  command: "A0 13 {p1} 00 {p3} AF"
  params:
    - { name: p1, type: integer, description: "LowByte zoom position. XGA: 0-56, SXGA: 0-48, WXGA: 0-50, UXGA: 0-44, 1080P: 0-40" }
    - { name: p3, type: integer, description: "Speed (range not specified in source)" }

- id: auto_erase
  label: Auto Erase
  kind: action
  command: "A0 14 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  command: "A0 15 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0x01-0x0A (1x-10x digital zoom limit)" }

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  command: "A0 18 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "XGA: 0-44, SXGA: 0-52, WXGA: 0-50, UXGA: 0-56, 1080P: 0-60" }

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "A0 19 00 00 00 AF"
  params: []

- id: focus_start
  label: Focus Start
  kind: action
  command: "A0 1A {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Near, 1=Far" }
    - { name: p2, type: integer, description: "Speed 0-6" }

- id: focus_direct
  label: Focus Direct
  kind: action
  command: "A0 1B {p1} {p2} {p3} AF"
  params:
    - { name: p1, type: integer, description: "LowByte of focus position 0-478" }
    - { name: p2, type: integer, description: "HighByte of focus position 0-478" }
    - { name: p3, type: integer, description: "Speed 0-6" }

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  command: "A0 1D {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Tele, 1=Wide" }

- id: zoom_direct_with_af
  label: Zoom Direct (Straight, with AF)
  kind: action
  command: "A0 1F {p1} 00 {p3} AF"
  params:
    - { name: p1, type: integer, description: "LowByte zoom position. XGA: 0-56, SXGA: 0-48, WXGA: 0-50, UXGA: 0-44, 1080P: 0-40" }
    - { name: p3, type: integer, description: "Speed (range not specified in source)" }

- id: white_balance
  label: White Balance (AWB, Auto Tune)
  kind: action
  command: "A0 22 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Auto Tune, 1=AWB" }

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  command: "A0 26 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: mask_mode
  label: Mask Mode
  kind: action
  command: "A0 27 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Disable, 1=Mask, 2=Highlight" }

- id: freeze
  label: Freeze
  kind: action
  command: "A0 2C {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: iris
  label: Iris
  kind: action
  command: "A0 30 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=AE ON NightVision OFF, 1=Manual AE OFF, 2=AE OFF, 3=Manual" }
    - { name: p2, type: integer, description: "Brightness 0-100 (Normal 50/60Hz) or 0-80 (NightVision 60Hz)" }

- id: negative_film
  label: Negative (film)
  kind: action
  command: "A0 36 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: color_gray
  label: Color (gray)
  kind: action
  command: "A0 37 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Photo, 1=Gray" }

- id: language_select
  label: Language Select
  kind: action
  command: "A0 38 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=English, 1=Traditional Chinese, 2=German, 3=French, 4=Spanish, 5=Russian, 6=Dutch, 7=Finnish, 8=Polish, 9=Italian, 10=Portuguese, 11=Swedish, 12=Czech, 13=Simplified Chinese" }

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "A0 39 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=-1, 1=+1 (single-step nudge)" }

- id: disable_dz_after_optical_zoom
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  command: "A0 40 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Disable, 1=Enable" }

- id: call_master_version
  label: Call Master Version
  kind: query
  command: "A0 45 00 00 00 AF"
  params: []
  notes: "Return packet encodes PVLxxx ASCII in P1/P2/P3."

- id: call_ae_status
  label: Call AE Status
  kind: query
  command: "A0 46 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Off, 1=On."

- id: enable_disable_logo
  label: Enable / Disable LOGO Image
  kind: action
  command: "A0 47 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=power-on setting, 1=power-off setting" }
    - { name: p2, type: integer, description: "0=Default logo, 1=Customer logo" }

- id: playback_page_change
  label: Playback Image Index Change Page
  kind: action
  command: "A0 4A {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Page Up, 1=Page Down" }

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  command: "A0 4B {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: call_slave_version
  label: Call Slave Version
  kind: query
  command: "A0 4D 00 00 00 AF"
  params: []
  notes: "Return packet encodes PVMxxx ASCII in P1/P2/P3."

- id: call_laser_status
  label: Call Laser Status
  kind: query
  command: "A0 50 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Off, 1=On."

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  command: "A0 51 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Photo, 1=Text, 2=Gray."

- id: reg1
  label: reg1
  kind: action
  command: "A0 52 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Read, 1=Write" }
    - { name: p2, type: integer, description: "0x00-0xFF register value (write) or 0x00 (read - value returned in return packet)" }

- id: reg2
  label: reg2
  kind: action
  command: "A0 53 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Read, 1=Write" }
    - { name: p2, type: integer, description: "0x00-0xFF register value" }

- id: reg3
  label: reg3
  kind: action
  command: "A0 54 {p1} {p2} 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Read, 1=Write" }
    - { name: p2, type: integer, description: "0x00-0xFF register value" }
  notes: "Source description for this row contains a copy-paste artefact referencing AC 50/60Hz power state and zoom positions; behaviour not clearly specified."

- id: call_ac_50_60hz_power_state
  label: Call AC 50/60 Hz Power State
  kind: query
  command: "A0 58 00 00 00 AF"
  params: []

- id: call_zoom_position
  label: Call Zoom Position
  kind: query
  command: "A0 60 00 00 00 AF"
  params: []
  notes: "Return packet carries current optical zoom position in P1/P2."

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  command: "A0 62 00 00 00 AF"
  params: []
  notes: "P1 in return. XGA: 0-44, SXGA: 0-52, WXGA: 0-50, UXGA: 0-56, 1080P: 0-60."

- id: call_focus_position
  label: Call Focus Position
  kind: query
  command: "A0 64 00 00 00 AF"
  params: []
  notes: "P1 LowByte / P2 HighByte encode position 0-956; P3 carries speed 0-5."

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  command: "A0 78 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Off, 1=On."

- id: call_iris_status
  label: Call Iris Status
  kind: query
  command: "A0 7A 00 00 00 AF"
  params: []
  notes: "P1: 0=Auto, 1=Manual. P2: brightness 0-100 (Normal 50/60Hz) or 0-80 (NightVision 60Hz)."

- id: call_negative
  label: Call Negative
  kind: query
  command: "A0 87 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Off, 1=On."

- id: call_color
  label: Call Color
  kind: query
  command: "A0 88 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Photo, 1=Gray."

- id: call_brightness_position
  label: Call Brightness Position
  kind: query
  command: "A0 89 00 00 00 AF"
  params: []
  notes: "P2 in return. Normal 50/60Hz: 0-100. Microscope 60Hz: 0-134, Microscope 50Hz: 0-128. NightVision 60Hz: 0-80."

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: query
  command: "A0 8A 00 00 00 AF"
  params: []
  notes: "P1 in return: LowByte zoom position 0-100."

- id: call_menu_status
  label: Call Menu Status
  kind: query
  command: "A0 8B 00 00 00 AF"
  params: []
  notes: "P1 in return: 0=Off, 1=On."

- id: capture_type
  label: Capture Type
  kind: action
  command: "A0 96 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Single, 1=Continuous, 2=Disable" }

- id: capture_time
  label: Capture Time
  kind: action
  command: "A0 97 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=1hr, 1=2hr, 2=4hr, 3=8hr, 4=24hr, 5=48hr, 6=72hr" }

- id: capture_interval
  label: Capture Interval
  kind: action
  command: "A0 98 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=5s, 1=10s, 2=30s, 3=1min, 4=2min, 5=5min" }

- id: key_function
  label: Key Function
  kind: action
  command: "A0 A0 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "1=Enter, 2=Up, 3=Down, 4=Left, 5=Right, 6=Menu" }

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  command: "A0 A3 01 00 00 AF"
  params: []

- id: set_sharpness_gamma
  label: Set Sharpness (Gamma)
  kind: action
  command: "A0 A7 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Photo, 1=Text, 2=Gray" }

- id: set_image_mode
  label: Set Image Mode
  kind: action
  command: "A0 A9 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Normal, 1=Slide, 2=Film" }

- id: night_vision
  label: Night Vision
  kind: action
  command: "A0 AB {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: system_on_off
  label: System ON/OFF (All lamp on)
  kind: action
  command: "A0 B0 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: power
  label: Power
  kind: action
  command: "A0 B1 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }

- id: capture
  label: Capture
  kind: action
  command: "A0 B2 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Capture, 1=Record" }

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  command: "A0 B3 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Thumbnail, 1=PBP Thumbnail" }

- id: preview_rotation
  label: Preview Rotation
  kind: action
  command: "A0 B4 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Rotate 0°, 1=Rotate 90°, 2=Rotate 180°, 3=Rotate 270°" }

- id: delete
  label: Delete
  kind: action
  command: "A0 B6 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Delete one, 1=Delete all, 2=Format" }

- id: call_system_status
  label: Call System Status
  kind: query
  command: "A0 B7 00 00 00 AF"
  params: []
  notes: "Return P1: 0=not ready, 1=ready to receive command. Return P2: 0=power off, 1=power on."

- id: laser_on_off
  label: Laser On/Off
  kind: action
  command: "A0 C1 {p1} 00 00 AF"
  params:
    - { name: p1, type: integer, description: "0=Off, 1=On" }
```

## Feedbacks
```yaml
- id: system_status
  type: enum
  values: [not_ready, ready]
  source: "Call System Status (A0 B7 ...) P1"

- id: power_state
  type: enum
  values: [off, on]
  source: "Power (A0 B1) or Call System Status P2"

- id: ae_status
  type: enum
  values: [off, on]
  source: "Call AE Status (A0 46 ...) P1"

- id: laser_status
  type: enum
  values: [off, on]
  source: "Call Laser Status (A0 50 ...) P1"

- id: text_photo_mode
  type: enum
  values: [photo, text, gray]
  source: "Call Text/Photo Status (A0 51 ...) P1"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "Call Freeze Status (A0 78 ...) P1"

- id: iris_mode
  type: enum
  values: [auto, manual]
  source: "Call Iris Status (A0 7A ...) P1"

- id: iris_brightness
  type: integer
  range: "0-100 (Normal 50/60Hz) or 0-80 (NightVision 60Hz)"
  source: "Call Iris Status P2"

- id: negative
  type: enum
  values: [off, on]
  source: "Call Negative (A0 87 ...) P1"

- id: color_mode
  type: enum
  values: [photo, gray]
  source: "Call Color (A0 88 ...) P1"

- id: brightness_position
  type: integer
  range: "0-100 (Normal), 0-128/0-134 (Microscope 50/60Hz), 0-80 (NightVision 60Hz)"
  source: "Call Brightness Position (A0 89 ...) P2"

- id: mix_zoom_position
  type: integer
  range: "0-100"
  source: "Call Mix Zoom Position (A0 8A ...) P1"

- id: menu_status
  type: enum
  values: [off, on]
  source: "Call Menu Status (A0 8B ...) P1"

- id: zoom_position
  type: integer
  range: "resolution-dependent (see action notes)"
  source: "Call Zoom Position (A0 60 ...) P1/P2"

- id: digital_zoom_position
  type: integer
  range: "XGA: 0-44, SXGA: 0-52, WXGA: 0-50, UXGA: 0-56, 1080P: 0-60"
  source: "Call Digital Zoom Position (A0 62 ...) P1"

- id: focus_position
  type: integer
  range: "0-956 (P1 LowByte / P2 HighByte)"
  source: "Call Focus Position (A0 64 ...) P1/P2"

- id: ac_power_state
  type: integer
  range: "50/60 Hz AC line frequency (encoding not specified)"
  source: "Call AC 50/60 Hz Power State (A0 58 ...)"

- id: master_version
  type: string
  source: "Call Master Version (A0 45 ...) - PVLxxx ASCII in P1/P2/P3"

- id: slave_version
  type: string
  source: "Call Slave Version (A0 4D ...) - PVMxxx ASCII in P1/P2/P3"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- This is a visual presenter / document camera; the listed commands are image-pipeline controls (zoom, focus, freeze, capture, slideshow, OSD) rather than AV routing.
- The vendor documentation labels the document "CL510,V02 Command Set" but only documents revision 1.0 dated 2020-02-14 applying to firmware PVL303 / PVM105. Whether later firmware revisions extend the command set is not stated.
- For zoom and focus, the position ranges differ by output resolution (XGA / SXGA / WXGA / UXGA / 1080P). An integrator must know the current output resolution to interpret position values.
- The `reg1` / `reg2` / `reg3` commands give generic read/write access to internal register space; semantics are not described in the source.
- An Ethernet command set for the CL510 exists per the vendor downloads index but is not part of this revision; this spec is RS-232 only.

<!-- UNRESOLVED: serial flow control not stated; AC 50/60 Hz return value encoding not specified; reg3 row description contains source-side ambiguity; firmware compatibility range beyond PVL303 / PVM105 unknown; Ethernet command set not included. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://www.mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-06-02T05:46:07.112Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:07.112Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions match source command table one-to-one with identical opcodes; transport parameters (9600 baud, 8N1) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "An Ethernet command set for the CL510 is referenced in vendor indexes but was not included in the source for this revision. RS-232 only."
- "flow control not stated in source"
- "a printing artefact in the source duplicates \"Parameter1\" in the return packet table; the second instance is treated here as Parameter 3 to match the command packet structure."
- "no input/source selection commands"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "serial flow control not stated; AC 50/60 Hz return value encoding not specified; reg3 row description contains source-side ambiguity; firmware compatibility range beyond PVL303 / PVM105 unknown; Ethernet command set not included."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
