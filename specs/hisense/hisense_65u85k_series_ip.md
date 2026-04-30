---
schema_version: ai4av-public-spec-v1
device_id: hisense/65u85k-series
entity_id: hisense_65u85k_series
spec_id: admin/hisense-65u85k-series
revision: 1
author: admin
title: "HiSense 65U85K Series Control Spec"
status: published
manufacturer: HiSense
manufacturer_key: hisense
model_family: "65U85K Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U85K Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://hisense-b2b.com/
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
source_documents:
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "HiSense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "HiSense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:55:00.968Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:55:00.968Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# HiSense 65U85K Series Control Spec

## Summary
Hisense Prosumer TV series controlled via RS-232 serial protocol. Supports power on/off, input selection, picture/sound adjustment, aspect ratio, and query commands. Serial config: 9600 baud, 8N1, no flow control. Client ID uses last 3 bytes of TV MAC address for Smart TV models; "ALL" for broadcast.

<!-- UNRESOLVED: no TCP/IP command set in this source — only RS-232 and discrete IR -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  termination: "0x0D (CR)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # POWR, PWRE commands present
- routable   # INPT input selection commands present
- queryable  # query variants for all major parameters present
- levelable  # BRIT, CONT, COLR, TINT, SHRP, VOLM, BKLV commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: input
      type: enum
      values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
      description: Input source selection
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [standard, vivid, energy_saving, theater, game, sport]
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [auto, normal, zoom, wide, direct, pixel_1to1, panoramic, cinema]
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: enum
      values: [high, middle, mid_low, low]
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [standard, theater, music, speech, late_night]
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
- id: set_power_on_command
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]
- id: send_remote_button
  label: Simulate Remote Button Press
  kind: action
  params:
    - name: button
      type: enum
      values: [ch_up, ch_down, vol_up, vol_down, mute, power, input, menu, exit, ok, up, down, left, right, back, info, sleep, tv_media, dash, digits_0_9, play, pause, stop, ffw, frw, prev, next, cc, red, green, yellow, blue, guide, freeze, pip, pip_swap, pip_input, pip_position, pip_size, connected_home, live_tv]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: current_input
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
- id: picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
- id: brightness
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: color_saturation
  type: integer
  range: [0, 100]
- id: tint
  type: integer
  range: [0, 100]
- id: sharpness
  type: integer
  range: [0, 20]
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_1to1, panoramic, cinema]
- id: overscan
  type: enum
  values: [on, off]
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
- id: backlight
  type: integer
  range: [0, 100]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
- id: volume
  type: integer
  range: [0, 100]
- id: mute_state
  type: enum
  values: [on, off]
- id: tv_speaker_state
  type: enum
  values: [on, off]
- id: standby_led
  type: enum
  values: [on, off]
- id: power_on_command_setting
  type: enum
  values: [enable, disable]
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
- id: volume_locked_level
  type: integer
  range: [0, 100]
- id: volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
- id: remote_key_mode
  type: enum
  values: [enable, disable, partial]
- id: panel_key_mode
  type: enum
  values: [enable, disable]
- id: menu_access
  type: enum
  values: [enable, disable]
- id: osd_mode
  type: enum
  values: [enable, disable]
- id: osd_language
  type: enum
  values: [english, espanol, francais]
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
- id: power_on_input
  type: enum
  values: [last, air, av, component]
- id: tuner_mode
  type: enum
  values: [antenna, cable]
- id: caption_control
  type: enum
  values: [off, on, on_when_mute]
```

## Variables
```yaml
# All settable parameters that also have query commands are listed under Feedbacks.
# No additional variable section applies.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - To enable RS-232 control while TV is in standby, set "Power On Command" to Enable in the Custom Install menu (code 7310 on remote).
  - Serial port must be enabled via Custom Install menu before any RS-232 control will function.
```

## Notes
Command protocol is ASCII-based with the following structure:

- **Set command format:** `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]`
- **Query command format:** `Q[CLIENT_ID][COMMAND]????[CHECKSUM][CR]`
- **Response format:** `[CLIENT_ID]:OKAY[DATA][CHECKSUM][CR]` (or `EROR`, `WAIT`)
- **Client ID:** Last 3 bytes of MAC address for Smart TV; "ALL" for broadcast
- **Termination:** Carriage return (0x0D)
- **Checksum:** 8-bit checksum of entire command string; sum of all bytes including checksum equals zero

Command reference (generic HEX, all TVs):
| Command | Function |
|---------|----------|
| PWRE | Power On Command Enable/Query |
| POWR | Power On/Off Control |
| INPT | Input Source Selection |
| PMOD | Picture Mode |
| BRIT | Brightness |
| CONT | Contrast |
| COLR | Color Saturation |
| TINT | Tint |
| SHRP | Sharpness |
| ASPT | Aspect Ratio |
| OVSN | Overscan |
| CTEM | Color Temperature |
| BKLV | Backlight |
| AMOD | Sound Mode |
| VOLM | Volume |
| MUTE | Mute |
| ASPK | TV Speaker |
| PLED | Standby LED |
| BTTN | Remote Button Simulator |
| TUNR | Tuner Mode |
| CC## | Caption Control |
| LANG | OSD Language |
| RSET | Factory Reset |
| RSTP | Reset Picture Settings |
| RSTA | Reset Audio Settings |

<!-- UNRESOLVED: no TCP/IP control protocol in this source document -->
<!-- UNRESOLVED: no UDP, HTTP, OSC, or other protocol mentioned -->
<!-- UNRESOLVED: exact model list for this protocol version not enumerated (doc covers "E/M/WR Series" collectively) -->

## Provenance

```yaml
source_urls:
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://hisense-b2b.com/
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
source_documents:
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "HiSense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "HiSense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:55:00.968Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:55:00.968Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section."
```

## Known Gaps

```yaml
[]
```
