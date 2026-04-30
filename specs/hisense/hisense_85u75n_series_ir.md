---
schema_version: ai4av-public-spec-v1
device_id: hisense/85u75n-series
entity_id: hisense_85u75n_series
spec_id: admin/hisense-85u75n-series
revision: 1
author: admin
title: "Hisense 85U75N Series Control Spec"
status: published
manufacturer: Hisense
manufacturer_key: hisense
model_family: "85U75N Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "85U75N Series"
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
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "Hisense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "Hisense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:59:41.685Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:59:41.685Z
  matched_actions: 30
  action_count: 47
  confidence: high
  summary: "All 30 spec actions and 17 feedback entries map to literal commands in source; transport parameters verified; complete RS-232 command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 85U75N Series Control Spec

## Summary
Hisense Prosumer TV series (85U75N) controlled via RS-232 serial or Discrete IR. RS-232 uses ASCII protocol at 9600/8/N/1 with MAC-addressed client IDs and 8-bit checksummed commands. Supports discrete power on/off, input routing, picture/sound adjustment, and extensive query feedback. No authentication required.

<!-- UNRESOLVED: discrete IR hex codes (Pronto CCF format) not encoded as structured Actions — only documented as hex blobs -->

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
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# RS-232 ASCII command format: [S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][0x0D]
# Query format: Q[CLIENT_ID][COMMAND]????[CHECKSUM][0x0D]
# ACK format: [CLIENT_ID]:[OKAY|EROR|WAIT][DATA][CHECKSUM][0x0D]

- id: power_on
  label: Power On
  kind: action
  params: []
  description: POWR0001 — turn TV on

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
  description: POWR0000 — set TV to standby

- id: power_on_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
  description: PWRE0001 — allow RS-232 to power on from standby

- id: power_on_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
  description: PWRE0000 — disable RS-232 power-on capability

- id: input_tv
  label: Set Input TV
  kind: action
  params: []
  description: INPT0001

- id: input_av
  label: Set Input AV
  kind: action
  params: []
  description: INPT0004

- id: input_component
  label: Set Input Component
  kind: action
  params: []
  description: INPT0003

- id: input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
  description: INPT0009

- id: input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
  description: INPT0010

- id: input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
  description: INPT0011

- id: input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
  description: INPT0012

- id: input_vga
  label: Set Input VGA
  kind: action
  params: []
  description: INPT0006

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport
  description: PMOD command

- id: brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: BRIT command

- id: contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: CONT command

- id: color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: COLR command

- id: tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: TINT command

- id: sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]
      description: 0000–0020
  description: SHRP command

- id: aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1pixelmap, 7=Panoramic, 8=Cinema
  description: ASPT command

- id: overscan_on
  label: Overscan On
  kind: action
  params: []
  description: OVSN0000

- id: overscan_off
  label: Overscan Off
  kind: action
  params: []
  description: OVSN0002

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  params: []
  description: RSTP1000

- id: color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low
  description: CTEM command

- id: backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: BKLV command

- id: sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=LateNight
  description: AMOD command

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params: []
  description: RSTA2000

- id: volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 0000–0100
  description: VOLM command

- id: mute_on
  label: Mute On
  kind: action
  params: []
  description: MUTE0001

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  description: MUTE0000

- id: tv_speaker_on
  label: TV Speaker On
  kind: action
  params: []
  description: ASPK0002

- id: tv_speaker_off
  label: TV Speaker Off
  kind: action
  params: []
  description: ASPK0000

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  description: CHAN0001

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  description: CHAN0000

- id: caption_off
  label: Caption Off
  kind: action
  params: []
  description: CC##0000

- id: caption_on
  label: Caption On
  kind: action
  params: []
  description: CC##0002

- id: caption_on_mute
  label: Caption On When Mute
  kind: action
  params: []
  description: CC##0003

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  description: RSET9999

- id: standby_led_on
  label: Standby LED On
  kind: action
  params: []
  description: PLED0002

- id: standby_led_off
  label: Standby LED Off
  kind: action
  params: []
  description: PLED0000
```

## Feedbacks
```yaml
# Acknowledgements returned by TV after every command:
# OKAY — command accepted
# EROR — error
# WAIT — command received, processing

- id: ack_okay
  label: Command Acknowledged
  type: enum
  values: [OKAY, EROR, WAIT]
  description: Standard acknowledgement after any command

- id: power_state
  label: Power State Query
  type: enum
  values: [0, 1]
  description: POWR query — 0=standby, 1=power on

- id: current_input
  label: Current Input Source Query
  type: enum
  values: [1, 3, 4, 6, 9, 10, 11, 12]
  description: INPT query — 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4

- id: current_picture_mode
  label: Current Picture Mode Query
  type: enum
  values: [0, 2, 3, 4, 5, 6]
  description: PMOD query — 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

- id: current_aspect_ratio
  label: Current Aspect Ratio Query
  type: enum
  values: [0, 2, 3, 4, 5, 6, 7, 8]
  description: ASPT query — 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1pixelmap, 7=Panoramic, 8=Cinema

- id: current_mute_status
  label: Mute Status Query
  type: enum
  values: [0, 1]
  description: MUTE query — 0=not muted, 1=muted

- id: current_volume
  label: Current Volume Query
  type: range
  range: [0, 100]
  description: VOLM query returns 0-100

- id: current_brightness
  label: Current Brightness Query
  type: range
  range: [0, 100]
  description: BRIT query returns 0-100

- id: current_contrast
  label: Current Contrast Query
  type: range
  range: [0, 100]
  description: CONT query returns 0-100

- id: current_color_saturation
  label: Current Color Saturation Query
  type: range
  range: [0, 100]
  description: COLR query returns 0-100

- id: current_tint
  label: Current Tint Query
  type: range
  range: [0, 100]
  description: TINT query returns 0-100

- id: current_sharpness
  label: Current Sharpness Query
  type: range
  range: [0, 20]
  description: SHRP query returns 0-20

- id: current_backlight
  label: Current Backlight Query
  type: range
  range: [0, 100]
  description: BKLV query returns 0-100

- id: current_sound_mode
  label: Current Sound Mode Query
  type: enum
  values: [0, 2, 3, 4, 5]
  description: AMOD query — 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=LateNight

- id: current_color_temp
  label: Current Color Temperature Query
  type: enum
  values: [0, 2, 3, 4]
  description: CTEM query — 0=High, 2=Middle, 3=Mid-Low, 4=Low

- id: current_tv_speaker
  label: TV Speaker Status Query
  type: enum
  values: [0, 2]
  description: ASPK query — 0=off, 2=on

- id: current_overscan
  label: Overscan Status Query
  type: enum
  values: [0, 2]
  description: OVSN query — 0=on, 2=off
```

## Variables
```yaml
# Tuner/input configuration settings:
- id: tuner_mode
  label: Tuner Mode
  type: enum
  values: [0, 2]
  description: TUNR — 0=Antenna, 2=Cable

- id: power_on_input
  label: Power On Input Selection
  type: enum
  values: [0, 1, 2, 3]
  description: POIS — 0=Last, 1=Air, 2=AV, 3=Component

- id: volume_lock
  label: Volume Lock Setting
  type: enum
  values: [0, 1, 2, 3]
  description: SVOL — 0=LOCKED, 1=LASTVOLUME, 2=ACRESET, 3=STANDBYRESET

- id: remote_key_mode
  label: Remote Key Mode
  type: enum
  values: [0, 1, 2]
  description: RMOT — 0=ENABLE, 1=DISABLE, 2=PARTIAL

- id: panel_key_mode
  label: Panel Key Mode
  type: enum
  values: [0, 1]
  description: PANL — 0=ENABLE, 1=DISABLE

- id: osd_mode
  label: OSD Mode
  type: enum
  values: [0, 1]
  description: OSD# — 0=ENABLE, 1=DISABLE

- id: input_lock_mode
  label: Input Lock Mode
  type: enum
  values: [0, 1, 2, 3]
  description: INPM — 0=LOCKED, 1=SELECTABLE, 2=ACRESET, 3=STANDBYRESET

- id: volume_locked_level
  label: Volume Locked Level
  type: range
  range: [0, 100]
  description: VLFL — 0–100

- id: power_off_control
  label: Power Off Control Mode
  type: enum
  values: [0, 1]
  description: PBTN — 0=ACONLY, 1=ALL
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification messages documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: rs232_poweron_requires_enable
    description: |
      To power on TV via RS-232 when TV is in standby, RS-232 Remote Power On must first be 
      enabled via the Custom Install menu (access: Quick Settings > 7310) or by sending PWRE0001.
      Without this setting, the RS-232 port is inactive while the TV is in standby.
# UNRESOLVED: populate if source contains additional safety warnings
```

## Notes
Client ID format: last 3 bytes of Ethernet MAC address for Smart TVs; selected in TV menu for Feature TVs. Use "ALL" (ASCII) for broadcast. Protocol is case-sensitive. Checksum is 8-bit, such that the sum of all bytes including the checksum equals zero. Termination is carriage return (0x0D).

Power on via RS-232 only works when the TV is in standby and RS-232 Remote Power On is enabled. Query command POWR is not available when TV is in standby mode.

<!-- UNRESOLVED: discrete IR Pronto CCF hex codes not encoded as AI4AV actions — source provides raw Pronto hex blobs only -->
<!-- UNRESOLVED: RS-232 port number (COM port) not stated -->
<!-- UNRESOLVED: specific model names within the 85U75N series not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error code definitions (EROR) not enumerated -->
<!-- UNRESOLVED: WAIT acknowledgement timing not specified -->

## Provenance

```yaml
source_urls:
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://hisense-b2b.com/
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
source_documents:
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "Hisense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "Hisense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "Hisense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:59:41.685Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:59:41.685Z
matched_actions: 30
action_count: 47
confidence: high
summary: "All 30 spec actions and 17 feedback entries map to literal commands in source; transport parameters verified; complete RS-232 command coverage."
```

## Known Gaps

```yaml
[]
```
