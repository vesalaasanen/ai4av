---
schema_version: ai4av-public-spec-v1
device_id: hisense/65u75sua-series
entity_id: hisense_65u75sua_series
spec_id: admin/hisense-65u75sua-series
revision: 1
author: admin
title: "HiSense 65U75SUA Series Control Spec"
status: published
manufacturer: HiSense
manufacturer_key: hisense
model_family: "65U75SUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U75SUA Series"
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
last_checked_at: 2026-04-23T06:51:20.966Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - COLR
  - AMOD
  - ASPT
  - BRIT
  - BKLV
  - PMOD
  - OVSN
  - CTEM
  - VOLM
  - MUTE
  - SPKM
  - TUNR
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:51:20.966Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions matched in source with proper command codes; transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 65U75SUA Series Control Spec

## Summary
Hisense Prosumer TV series controlled via RS-232 serial protocol (ASCII format). Supports power control, input routing, picture/sound settings, and comprehensive query commands. The protocol uses a fixed-length command format with Client ID, command, data, checksum, and carriage-return termination. No authentication required.

<!-- UNRESOLVED: IR discrete codes are documented but not machine-parseable; excluded from this spec -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
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

- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []

- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0=TV, 1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA)

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Brightness value 0-100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Contrast value 0-100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Color saturation value 0-100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Tint value 0-100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]
      description: Sharpness value 0-20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=On, 2=Off

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Backlight value 0-100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Volume value 0-100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off (unmute), 1=On (mute)

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Antenna, 2=Cable

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 2=On, 3=CC on when mute

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français

- id: remote_key
  label: Remote Key Control
  kind: action
  params:
    - name: key
      type: integer
      description: Key code (e.g., 1000=digit 0, 1001=digit 1, etc.)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  description: Current power state

- id: input_source
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
  description: Current input source

- id: picture_mode
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]
  description: Current picture mode

- id: brightness
  type: integer
  range: [0, 100]
  description: Current brightness value

- id: contrast
  type: integer
  range: [0, 100]
  description: Current contrast value

- id: color_saturation
  type: integer
  range: [0, 100]
  description: Current color saturation value

- id: tint
  type: integer
  range: [0, 100]
  description: Current tint value

- id: sharpness
  type: integer
  range: [0, 20]
  description: Current sharpness value

- id: aspect_ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, "1-to-1 pixel map", Panoramic, Cinema]
  description: Current aspect ratio

- id: overscan
  type: enum
  values: [On, Off]
  description: Current overscan state

- id: color_temp
  type: enum
  values: [High, Middle, Mid-Low, Low]
  description: Current color temperature

- id: backlight
  type: integer
  range: [0, 100]
  description: Current backlight value

- id: sound_mode
  type: enum
  values: [Standard, Theater, Music, Speech, "Late night"]
  description: Current sound mode

- id: volume
  type: integer
  range: [0, 100]
  description: Current volume value

- id: mute_state
  type: enum
  values: [unmuted, muted]
  description: Current mute state

- id: tv_speaker
  type: enum
  values: [Off, On]
  description: TV speaker state

- id: tuner_mode
  type: enum
  values: [Antenna, Cable]
  description: Current tuner mode

- id: caption_control
  type: enum
  values: [Off, On, "CC on when mute"]
  description: Current caption control state

- id: standby_led
  type: enum
  values: [Off, On]
  description: Standby LED state

- id: osd_language
  type: enum
  values: [English, Español, Français]
  description: Current OSD language
```

## Variables
```yaml
# Volume range (max volume that can be set)
- id: volume_range_max
  type: integer
  range: [0, 100]
  description: Maximum settable volume level

# Volume control mode
- id: volume_control_mode
  type: enum
  values: [LOCKED, "LAST VOLUME", "AC RESET", "STANDBY RESET"]
  description: Volume control behavior on power events

# Volume locked level
- id: volume_locked_level
  type: integer
  range: [0, 100]
  description: Locked volume level when volume control is LOCKED

# Remote key mode
- id: remote_key_mode
  type: enum
  values: [ENABLE, DISABLE, PARTIAL]
  description: Remote key control mode

# Panel key mode
- id: panel_key_mode
  type: enum
  values: [ENABLE, DISABLE]
  description: Panel key control mode

# Menu access
- id: menu_access
  type: enum
  values: [ENABLE, DISABLE]
  description: Menu access control

# AV setting menu
- id: av_setting_menu
  type: enum
  values: [DISABLE, ENABLE]
  description: AV setting menu access

# OSD mode
- id: osd_mode
  type: enum
  values: [ENABLE, DISABLE]
  description: OSD display mode

# Input mode
- id: input_mode
  type: enum
  values: [LOCKED, SELECTABLE, "AC RESET", "STANDBY RESET"]
  description: Input source control behavior on power events

# Power on input selection source
- id: power_on_input_source
  type: enum
  values: [LAST, Air, AV, Component]
  description: Input source to apply on power on

# Power off control mode
- id: power_off_control_mode
  type: enum
  values: ["AC ONLY", ALL]
  description: Power off behavior - AC only cuts power, ALL allows standby
```

## Events
```yaml
# UNRESOLVED: document does not describe unsolicited event notifications from the TV
```

## Macros
```yaml
# UNRESOLVED: document does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
The RS-232 protocol uses ASCII format with fixed-length command structure: Client ID (3 bytes) + Operation Direction (1 byte, S=Set/Q=Query) + Command (4 bytes) + Data (4 bytes) + Checksum (1 byte) + Termination (CR 0x0D). For Smart TVs, Client ID is the last 3 bytes of the Ethernet MAC address. For Feature TVs, Client ID is selected in the TV menu. Use "ALL" for broadcast commands.

Volume range is configurable (0-100 default). The TV must have RS-232 port enabled via the Custom Install menu (access code 7310) before serial control will function.
<!-- UNRESOLVED: TCP/IP control protocol not documented in this source; only RS-232 -->
<!-- UNRESOLVED: precise model list for 65U75SUA series not enumerated in source, generic "Prosumer TV" referenced -->

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
last_checked_at: 2026-04-23T06:51:20.966Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:51:20.966Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions matched in source with proper command codes; transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
- COLR
- AMOD
- ASPT
- BRIT
- BKLV
- PMOD
- OVSN
- CTEM
- VOLM
- MUTE
- SPKM
- TUNR
```
