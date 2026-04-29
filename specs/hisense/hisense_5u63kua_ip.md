---
schema_version: ai4av-public-spec-v1
device_id: hisense/5u63kua
entity_id: hisense_5u63kua
spec_id: admin/hisense-5u63kua
revision: 1
author: admin
title: "HiSense 5U63KUA Control Spec"
status: published
manufacturer: HiSense
manufacturer_key: hisense
model_family: 5U63KUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U63KUA
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
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
last_checked_at: 2026-04-26T12:56:11.490Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T12:56:11.490Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions and transport parameters verified against RS-232 command reference in source document."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 5U63KUA Control Spec

## Summary
Hisense Prosumer TV supporting both RS-232 serial and Ethernet (IP) control. Protocol is ASCII-based with 13-byte fixed-length commands: operation direction, client ID, command, data, checksum, termination. No authentication required for either control path.

<!-- UNRESOLVED: TCP port number not stated in source — serial-only spec generated. Ethernet/IP control section present in doc but port unspecified. -->

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
  label: Power Off
  kind: action
  params: []
- id: enable_rs232_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
- id: disable_rs232_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: 1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA
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
      description: 0000-0100
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0020
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1pixel map, 7=Panoramic, 8=Cinema
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=On, 2=Off
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
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
      description: 0000-0100
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
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
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On
- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC ONLY, 1=ALL
- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET
- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ENABLE, 1=DISABLE, 2=PARTIAL
- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE
- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE
- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0=DISABLE, 1=ENABLE
- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE
- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET
- id: set_power_on_input
  label: Set Power On Input Selection
  kind: action
  params:
    - name: source
      type: integer
      description: 0=LAST, 1=Air, 2=AV, 3=Component, 9+=HDMI variants
- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: string
      description: Button code e.g. CH+, VOL-, POWER, MUTE, 0-9, UP, DOWN, LEFT, RIGHT, OK, MENU, EXIT, etc.
- id: SPKM
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=SPEAKER, 1=OFF, 2=ARC FIRST
- id: B2BM
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ENABLE, 1=DISABLE
- id: USBM
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Home, 1=B2B
- id: PSHF
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: TSCN
  label: Automatic Channel Search
  kind: action
  params: []
- id: RSET
  label: Restore Factory Settings
  kind: action
  params: []
- id: MAVL
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
- id: VLFL
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - OKAY
    - EROR
    - WAIT
  description: Every command returns an ACK. OKAY=success, EROR=failure, WAIT=in progress.
```

## Variables
```yaml
- id: current_input
  type: integer
  description: Current input source — query with INPT????
  values:
    - 1: TV
    - 4: AV
    - 3: Component
    - 9: HDMI1
    - 10: HDMI2
    - 11: HDMI3
    - 12: HDMI4
    - 6: VGA
- id: current_picture_mode
  type: integer
  description: Query with PMOD????
  values:
    - 0: Standard
    - 2: Vivid
    - 3: EnergySaving
    - 4: Theater
    - 5: Game
    - 6: Sport
- id: current_brightness
  type: integer
  range: [0, 100]
  description: Query with BRIT????
- id: current_contrast
  type: integer
  range: [0, 100]
  description: Query with CONT????
- id: current_color_saturation
  type: integer
  range: [0, 100]
  description: Query with COLR????
- id: current_tint
  type: integer
  range: [0, 100]
  description: Query with TINT????
- id: current_sharpness
  type: integer
  range: [0, 20]
  description: Query with SHRP????
- id: current_aspect_ratio
  type: integer
  description: Query with ASPT????
  values:
    - 0: Auto
    - 2: Normal
    - 3: Zoom
    - 4: Wide
    - 5: Direct
    - 6: 1-to-1 pixel map
    - 7: Panoramic
    - 8: Cinema
- id: overscan_state
  type: integer
  description: Query with OVSN????
  values:
    - 0: On
    - 2: Off
- id: current_color_temp
  type: integer
  description: Query with CTEM????
  values:
    - 0: High
    - 2: Middle
    - 3: Mid-Low
    - 4: Low
- id: current_backlight
  type: integer
  range: [0, 100]
  description: Query with BKLV????
- id: current_sound_mode
  type: integer
  description: Query with AMOD????
  values:
    - 0: Standard
    - 2: Theater
    - 3: Music
    - 4: Speech
    - 5: Late night
- id: current_volume
  type: integer
  range: [0, 100]
  description: Query with VOLM????
- id: mute_state
  type: integer
  description: Query with MUTE????
  values:
    - 0: Not Mute
    - 1: Mute
- id: tv_speaker_state
  type: integer
  description: Query with ASPK????
  values:
    - 0: Off
    - 2: On
- id: current_tuner_mode
  type: integer
  description: Query with TUNR????
  values:
    - 0: Antenna
    - 2: Cable
- id: caption_control_state
  type: integer
  description: Query with CC##????
  values:
    - 0: Off
    - 2: On
    - 3: CC on when mute
- id: current_osd_language
  type: integer
  description: Query with LANG????
  values:
    - 0: English
    - 2: Español
    - 3: Français
- id: standby_led_state
  type: integer
  description: Query with PLED????
  values:
    - 0: Off
    - 2: On
- id: power_off_control_mode
  type: integer
  description: Query with PBTN????
  values:
    - 0: AC ONLY
    - 1: ALL
- id: volume_control_mode
  type: integer
  description: Query with SVOL????
  values:
    - 0: LOCKED
    - 1: LAST VOLUME
    - 2: AC RESET
    - 3: STANDBY RESET
- id: remote_key_mode
  type: integer
  description: Query with RMOT????
  values:
    - 0: ENABLE
    - 1: DISABLE
    - 2: PARTIAL
- id: panel_key_mode
  type: integer
  description: Query with PANL????
  values:
    - 0: ENABLE
    - 1: DISABLE
- id: menu_access_mode
  type: integer
  description: Query with MENU????
  values:
    - 0: ENABLE
    - 1: DISABLE
- id: av_setting_menu_mode
  type: integer
  description: Query with AVMN????
  values:
    - 0: DISABLE
    - 1: ENABLE
- id: osd_mode_state
  type: integer
  description: Query with OSD#????
  values:
    - 0: ENABLE
    - 1: DISABLE
- id: input_mode_state
  type: integer
  description: Query with INPM????
  values:
    - 0: LOCKED
    - 1: SELECTABLE
    - 2: AC RESET
    - 3: STANDBY RESET
- id: rs232_power_on_setting
  type: integer
  description: Query with PWRE????
  values:
    - 0: Disable
    - 1: Enable
- id: power_state
  type: integer
  description: Query with POWR????
  values:
    - 0: Standby
    - 1: Power on
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
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

RS-232 config: 9600 baud, 8N1, no flow control. Enable RS-232 port via Custom Install menu (code 7310). Optional: enable "Power On Command" to allow remote power-on from standby.

Command format: 13-byte fixed-length ASCII. Structure: `[S/Q][CLIENT_ID(3)][COMMAND(4)][DATA(4)][CHECKSUM(2)][0x0D]`. Query uses `?` placeholders for data. ACK format: `[CLIENT_ID(3)]:[OKAY|EROR|WAIT][DATA(4)][CHECKSUM(4)][0x0D]`. Client ID for Smart TVs = last 3 bytes of Ethernet MAC address; for Feature TVs set via menu; `ALL` = broadcast.

Ethernet/IP control documented but TCP port number not stated in source — serial-only transport emitted.

<!-- UNRESOLVED: TCP port number not stated in source. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: no unsolicited event notifications described in source. -->

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
last_checked_at: 2026-04-26T12:56:11.490Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T12:56:11.490Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions and transport parameters verified against RS-232 command reference in source document."
```

## Known Gaps

```yaml
[]
```
