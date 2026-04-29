---
schema_version: ai4av-public-spec-v1
device_id: hisense/75u75n
entity_id: hisense_75u75n
spec_id: admin/hisense-75u75n
revision: 1
author: admin
title: "Hisense 75U75N Control Spec"
status: published
manufacturer: Hisense
manufacturer_key: hisense
model_family: 75U75N
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 75U75N
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
last_checked_at: 2026-04-26T13:10:09.225Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T13:10:09.225Z
  matched_actions: 59
  action_count: 59
  confidence: high
  summary: "All 59 spec actions matched to source commands; E/M/WR series transport parameters verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 75U75N Control Spec

## Summary
Hisense digital signage display supporting RS-232 control. The source document covers three command families (E-Series at 115200 baud, M-Series and WR-Series at 9600 baud) with power, input routing, volume, and query functionality.

<!-- UNRESOLVED: unable to verify which series (E/M/WR) the 75U75N model belongs to; all three series commands included -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # E-Series uses 115200; M/WR use 9600
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
# E-Series Commands
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Send A6 xx 00 00 00 04 01 18 02 yy — requires UART Wake On enabled

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: hdmi1_input
  label: HDMI 1 Input
  kind: action
  params: []

- id: hdmi2_input
  label: HDMI 2 Input
  kind: action
  params: []

- id: ops_input
  label: OPS Input
  kind: action
  params: []

- id: cms_input
  label: CMS Input
  kind: action
  params: []

- id: pdf_input
  label: PDF Input
  kind: action
  params: []

- id: media_input
  label: Media Input
  kind: action
  params: []

- id: usb_input
  label: USB Input
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0–100 (sent as hex vv)

- id: set_mains_application_mode
  label: Set Mains Application Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Standby, 01=Power On, 02=Last known state"

- id: source_menu
  label: Source Menu
  kind: action
  params: []

- id: settings_menu
  label: Settings Menu
  kind: action
  params: []

- id: nav_up
  label: Up
  kind: action
  params: []

- id: nav_down
  label: Down
  kind: action
  params: []

- id: nav_ok
  label: Ok
  kind: action
  params: []

- id: nav_right
  label: Right
  kind: action
  params: []

- id: nav_left
  label: Left
  kind: action
  params: []

- id: nav_home
  label: Home
  kind: action
  params: []

- id: vol_up
  label: Vol+
  kind: action
  params: []

- id: vol_down
  label: Vol-
  kind: action
  params: []

- id: nav_return
  label: Return
  kind: action
  params: []

- id: nav_back
  label: Back
  kind: action
  params: []

- id: num_0
  label: Num 0
  kind: action
  params: []

- id: num_1
  label: Num 1
  kind: action
  params: []

- id: num_2
  label: Num 2
  kind: action
  params: []

- id: num_3
  label: Num 3
  kind: action
  params: []

- id: num_4
  label: Num 4
  kind: action
  params: []

- id: num_5
  label: Num 5
  kind: action
  params: []

- id: num_6
  label: Num 6
  kind: action
  params: []

- id: num_7
  label: Num 7
  kind: action
  params: []

- id: num_8
  label: Num 8
  kind: action
  params: []

- id: num_9
  label: Num 9
  kind: action
  params: []

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: subtitle
  label: Subtitle
  kind: action
  params: []

# M/WR-Series Commands
- id: m_power_on
  label: M-Series Power On
  kind: action
  params: []

- id: m_power_off
  label: M-Series Power Off
  kind: action
  params: []

- id: m_displayport_input
  label: DisplayPort Input
  kind: action
  params: []

- id: m_vga_input
  label: VGA Input
  kind: action
  params: []

- id: m_hdmi_input
  label: HDMI Input
  kind: action
  params: []

- id: m_dvi_input
  label: DVI Input
  kind: action
  params: []

- id: m_mute_audio_on
  label: Mute Audio On
  kind: action
  params: []

- id: m_mute_audio_off
  label: Mute Audio Off
  kind: action
  params: []

- id: m_set_volume
  label: M-Series Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0–100 (sent as hex vv)

- id: wr_pc_input
  label: PC Input
  kind: action
  params: []

- id: wr_hdmi1_input
  label: WR HDMI 1 Input
  kind: action
  params: []

- id: wr_hdmi2_input
  label: WR HDMI 2 Input
  kind: action
  params: []

- id: wr_vga_input
  label: WR VGA Input
  kind: action
  params: []

- id: wr_displayport_input
  label: WR DisplayPort Input
  kind: action
  params: []

- id: wr_reboot_tv
  label: Reboot TV
  kind: action
  params: []

- id: wr_set_volume
  label: WR Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0–100 (sent as hex xx)

- id: wr_video_mute_on
  label: Video Mute On
  kind: action
  params: []

- id: wr_video_mute_off
  label: Video Mute Off
  kind: action
  params: []

- id: wr_set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness value (sent as hex xx)

- id: wr_set_date
  label: Set Date (Y/M/D)
  kind: action
  params:
    - name: year
      type: integer
    - name: month
      type: integer
    - name: day
      type: integer

- id: wr_set_time
  label: Set Time (H/M/S)
  kind: action
  params:
    - name: hour
      type: integer
    - name: minute
      type: integer
    - name: second
      type: integer
# E-Series Query Commands
- id: e_query_input_selection
  label: Query Input Selection
  kind: query
  params: []
  description: Query currently selected input (E-Series)

- id: e_query_power_state
  label: Query Power State
  kind: query
  params: []
  description: Query current power state (E-Series)

- id: e_query_software_version
  label: Query Software Version
  kind: query
  params: []
  description: Get platform version (E-Series)

- id: e_query_volume_level
  label: Query Volume Level
  kind: query
  params: []
  description: Get volume level (E-Series)

# M-Series Query Commands
- id: m_query_status
  label: M-Series Query Status
  kind: query
  params: []
  description: Query status (M-Series); response includes volume, input source, power state, mute state, signal presence

# WR-Series Power Commands
- id: wr_power_on
  label: WR Power On
  kind: action
  params: []

- id: wr_power_off
  label: WR Power Off
  kind: action
  params: []

# WR-Series Query Commands
- id: wr_query_input_selection
  label: WR Query Input Selection
  kind: query
  params: []
  description: Query currently selected input (WR-Series)

- id: wr_query_power_state
  label: WR Query Power State
  kind: query
  params: []
  description: Query power state (WR-Series)

- id: wr_query_software_version
  label: WR Query Software Version
  kind: query
  params: []
  description: Query software version (WR-Series)

- id: wr_query_volume_level
  label: WR Query Volume Level
  kind: query
  params: []
  description: Query volume level (WR-Series)
```

## Feedbacks
```yaml
- id: e_input_selection_response
  type: enum
  values: [HDMI1, HDMI2, OPS, CMS, PDF, Media, USB, HomeScreen]
  description: "zz values: 0D=HDMI1, 06=HDMI2, 0B=OPS, 15=CMS, 17=PDF, 16=Media, 0C=USB, 14=HomeScreen"

- id: e_power_state_response
  type: enum
  values: [off, on]
  description: "zz values: 01=Off, 02=On"

- id: e_volume_level_response
  type: integer
  description: Current volume level

- id: e_software_version_response
  type: string
  description: Platform version

- id: m_status_response
  type: object
  description: "Query Status returns: volume (aa), input source (bb cc), power state (dd), mute state (ee), signal presence (ff)"
  properties:
    volume:
      type: integer
      description: Current volume level
    input_source:
      type: string
      description: "05 02=DVI, 05 03=DisplayPort, 05 04=HDMI, 08 01=VGA"
    power_state:
      type: string
      description: "00=On, FF=Off"
    mute_state:
      type: string
      description: "01=Muted, 00=Unmuted"
    signal_presence:
      type: string
      description: "00=No signal, 01=Signal present"

- id: wr_input_selection_response
  type: enum
  values: [PC, VGA, HDMI1, HDMI2, DisplayPort]
  description: "ww xx yy: 05 03 02=PC, 06 04 00=VGA, 05 05 00=HDMI1, 05 03 01=HDMI2, 05 03 03=DisplayPort"

- id: wr_power_state_response
  type: enum
  values: [off, on]
  description: "xx values: 00=Off, 01=On"

- id: wr_software_version_response
  type: string
  description: Software version

- id: wr_volume_level_response
  type: integer
  description: Current volume level
```

## Variables
```yaml
# No discrete settable parameters beyond the action params listed above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# None described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "E-Series Power On requires UART Wake On function to be On"
    source: "E-Series Power On command notes"
```

## Notes
The source document covers three distinct RS-232 command families for Hisense E-Series (115200 baud), M-Series (9600 baud), and WR-Series (9600 baud) digital signage displays. Each family uses different HEX command structures. The E-Series uses a `A6 xx` header format with XOR check bits; M/WR-Series use a `DD FF` header format. A screen ID (xx, 01–FF) is required for most E-Series commands; broadcast mode (`00`) sends to all screens in a daisy chain. XOR calculations are required for check bit (yy) generation on applicable commands.
<!-- UNRESOLVED: specific model 75U75N series assignment could not be verified; all three series included -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
last_checked_at: 2026-04-26T13:10:09.225Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:10:09.225Z
matched_actions: 59
action_count: 59
confidence: high
summary: "All 59 spec actions matched to source commands; E/M/WR series transport parameters verified in source."
```

## Known Gaps

```yaml
[]
```
