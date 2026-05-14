---
spec_id: admin/tascam-bd-mp1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tascam BD-MP1 Control Spec"
manufacturer: Tascam
model_family: BD-MP1
aliases: []
compatible_with:
  manufacturers:
    - Tascam
  models:
    - BD-MP1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-mp1/rs232c_ethernet_protocol_bd-mp1_v0104_en.pdf
  - https://www.tascam.eu/en/docs/BD-MP1_RS-232C_Ethernet_v104.pdf
  - https://www.tascam.eu/en/docs/BD-MP1MKII_RS-232C_Ethernet_v100.pdf
retrieved_at: 2026-04-30T01:50:10.712Z
last_checked_at: 2026-05-14T18:17:21.189Z
generated_at: 2026-05-14T18:17:21.189Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.189Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 71 spec actions match verbatim source tokens; transport parameters verified; semantic-id convention maps cleanly to wire protocols."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Tascam BD-MP1 Control Spec

## Summary
Professional Blu-ray Disc player with dual-control interface: RS-232C serial and Ethernet TCP/IP. Both protocols use ASCII message format with 3-character command opcodes, 2-character unit type prefix (`!7` for Blu-ray player), and carriage-return terminator. Supports full transport control, menu navigation, status query, and unsolicited status notifications.

<!-- UNRESOLVED: audio format selection commands not documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
addressing:
  port: 9030
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: Serial only - command invalid over Ethernet

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: Serial only - Ethernet connection dropped on power off

- id: stop
  label: Stop
  kind: action
  params: []

- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: chapter_skip_forward
  label: Chapter/Track Jump Next
  kind: action
  params:
    - name: count
      type: integer
      range: "1-2000"
      description: Number of chapters/tracks to skip forward

- id: chapter_skip_reverse
  label: Chapter/Track Jump Previous
  kind: action
  params: []

- id: title_skip_forward
  label: Title Jump Next
  kind: action
  params: []

- id: title_skip_reverse
  label: Title Jump Previous
  kind: action
  params: []

- id: title_jump
  label: Title Jump
  kind: action
  params:
    - name: title
      type: integer
      range: "0001-2000"
      description: Title/track number

- id: chapter_jump
  label: Chapter/Track Jump
  kind: action
  params:
    - name: position
      type: integer
      range: "0001-2000"
      description: Chapter/file number

- id: time_mode
  label: Time Mode Code
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - TL
        - TR
        - EL
        - RM
      description: "TL: Total Elapsed, TR: Total Remain, EL: Elapsed, RM: Remain"

- id: osd_toggle
  label: Hide Menu/On-Screen Display
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "'00': OSD on, '01': OSD off"

- id: setup_menu
  label: Setup Menu
  kind: action
  params: []

- id: top_menu
  label: Top Menu
  kind: action
  params: []

- id: option_menu
  label: Option Menu
  kind: action
  params: []

- id: popup_menu
  label: Pop Up Menu
  kind: action
  params: []

- id: return
  label: Return
  kind: action
  params: []

- id: audio_dialog
  label: Audio Dialog Selection
  kind: action
  params:
    - name: stream
      type: string
      description: "'+': Primary, '-': Secondary"

- id: subtitle
  label: Subtitle Language
  kind: action
  params:
    - name: stream
      type: integer
      description: Audio stream code

- id: enter
  label: Enter
  kind: action
  params: []

- id: disc_tray
  label: Disc Tray Open/Close
  kind: action
  params:
    - name: action
      type: enum
      values:
        - OP
        - CL
      description: "'OP': Open, 'CL': Close"

- id: video_resolution
  label: Video Resolution (HDMI)
  kind: action
  params:
    - name: resolution
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
      description: "'1': Auto, '2': 480/576i, '3': 480/576P, '4': 720P, '5': 1080i, '6': 1080P"

- id: display_info
  label: Display/Info
  kind: action
  params: []

- id: color_button
  label: Function/Color Button
  kind: action
  params:
    - name: color
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "'1':Red, '2':Green, '3':Blue, '4':Yellow"

- id: home_menu
  label: Home Menu
  kind: action
  params: []

- id: ten_key
  label: Ten Key Input
  kind: action
  params:
    - name: digit
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"

- id: slow_search
  label: Slow/Search
  kind: action
  params:
    - name: direction
      type: enum
      values:
        - F
        - R
      description: "'F': Forward, 'R': Reverse"
    - name: speed
      type: string
      description: "'f': fast (cyclic 1-5), 's': slow (1/16,1/8,1/4,1/2,1). 'Rs' not supported."

- id: mute
  label: MUTE
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "'00': Mute on, '01': Mute off"

- id: cursor
  label: Cursor Movement
  kind: action
  params:
    - name: direction
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "'1':Left, '2':Right, '3':Up, '4':Down"

- id: disc_auto_playback
  label: Disc Auto Playback
  kind: setting
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
      description: "'00': On(repeat off), '01': Off, '02': On(repeat on)"

- id: pip_mark
  label: PIP Mark
  kind: setting
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"

- id: hdmi_3d_output
  label: HDMI 3D Output
  kind: setting
  params:
    - name: mode
      type: enum
      values:
        - AT
        - "01"
      description: "'AT': Auto, '01': Off"

- id: tv_aspect_ratio
  label: TV Aspect Ratio
  kind: setting
  params:
    - name: ratio
      type: enum
      values:
        - 9W
        - 9A
        - 3P
        - 3L
      description: "'9W': 16:9 Wide, '9A': 16:9 Wide/Auto, '3P': 4:3 Pan&Scan, '3L': 4:3 Letterbox"

- id: tv_system
  label: TV System
  kind: setting
  params:
    - name: system
      type: enum
      values:
        - NTS
        - PAL
        - SMS
      description: "'NTS': NTSC, 'PL': PAL, 'SMS': Multi-system"

- id: hdmi_1080p_24hz
  label: HDMI 1080p 24Hz Conversion
  kind: setting
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"

- id: hdmi_color_space
  label: HDMI Color Space
  kind: setting
  params:
    - name: space
      type: enum
      values:
        - RV
        - RP
        - Y4
        - Y2
      description: "'RV': RGB Video Level, 'RP': RGB PC Level, 'Y4': YCbCr 4:4:4, 'Y2': YCbCr 4:2:2"

- id: hdmi_deep_color
  label: HDMI Deep Color
  kind: setting
  params:
    - name: depth
      type: enum
      values:
        - "48"
        - "36"
        - "30"
        - OF
      description: "'48': 48Bits, '36': 36Bits, '30': 30Bits, 'OF': Off"

- id: secondary_audio
  label: Secondary Audio
  kind: setting
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"

- id: fs_setting
  label: Fs Setting (LPCM)
  kind: setting
  params:
    - name: rate
      type: enum
      values:
        - "48"
        - "96"
        - "19"
      description: "'48': 48k, '96': 96k, '19': 192k LPCM"

- id: speaker_config
  label: Speaker Configuration Down Mix Mode
  kind: setting
  params:
    - name: config
      type: enum
      values:
        - "21"
        - "31"
        - "41"
        - "51"
        - "61"
        - "71"
      description: "'21': 2.1Ch, '31': 3.1Ch, '41': 4.1Ch, '51': 5.1Ch, '61': 6.1Ch, '71': 7.1Ch"

- id: speaker_setting
  label: Speaker Configuration Individual Setting
  kind: setting
  params:
    - name: channel
      type: string
      description: "'C': center, 'L': L, 'R': R, 'l': Ls, 'r': Rs"
    - name: size
      type: enum
      values:
        - "0"
        - "1"
      description: "'0': Large, '1': Small"
    - name: level
      type: string
      description: "-01 to +10 dB"
    - name: delay
      type: integer
      description: Milliseconds (4 digits)

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  params:
    - name: method
      type: enum
      values:
        - US
        - DS
      description: "'US': Via USB, 'DS': Via Disc"

- id: hdmi_cec
  label: HDMI CEC
  kind: setting
  params:
    - name: port
      type: enum
      values:
        - H1
        - OF
      description: "'H1': HDMI1, 'OF': Off"

- id: reset_factory
  label: Reset Factory Defaults
  kind: action
  params: []

- id: bdlive_network
  label: BD-Live Network Access
  kind: setting
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - LT
        - "01"
      description: "'00': On, 'LT': Limited, '01': Off"
```

## Feedbacks
```yaml
- id: power_status
  query: !7?PWR
  response: ACK
  description: Returns ACK on power state command

- id: disc_status
  query: !7?MST
  responses:
    - !7MSTNC: No disc media
    - !7MSTCI: Disc media present
    - !7MSTUF: Unknown/unformatted media
    - !7MSTTO: Tray opening or open
    - !7MSTTC: Tray closing or closed
    - !7MSTTE: Tray error

- id: playback_status
  query: !7?SST
  responses:
    - !7SSTPL: Playing
    - !7SSTPP: Paused
    - !7SSTDVS_X: Search play (X = R/F direction)
    - !7SSTDVSU: Setup mode
    - !7SSTDVTR: Root menu playback
    - !7SSTDVHM: Home menu mode

- id: total_track_number
  query: !7?STT
  response: "!7TTN_XXXX_"
  format: "XXXX = 0000-9999 or UNKN"

- id: track_number
  query: !7?STC
  response: "!7TNM_XXXX_"
  format: "XXXX = 0000-9999 or UNKN"

- id: total_group_number
  query: !7?STG
  response: "!7TGN_XXXX_"
  format: "XXXX = 0000-9999 or UNKN"

- id: group_number
  query: !7?SGN
  response: "!7GNM_XXXX_"
  format: "XXXX = 0000-9999 or UNKN"

- id: elapsed_time
  query: !7?SET
  response: "!7SET_hhhmmss_"

- id: remain_time
  query: !7?SRT
  response: "!7SRT_hhhmmss_"

- id: disc_auto_playback_status
  query: !7?APL
  responses:
    - !7APL00: On (repeat off)
    - !7APL01: Off
    - !7APL02: On (repeat on)

- id: pip_mark_status
  query: !7?PMK
  responses:
    - !7PMK00: On
    - !7PMK01: Off

- id: hdmi_3d_output_status
  query: !7?3DO
  responses:
    - !73DOAT: Auto
    - !73DO01: Off

- id: tv_aspect_ratio_status
  query: !7?ASC
  responses:
    - !7ASC9W: 16:9 Wide
    - !7ASC9A: 16:9 Wide/Auto
    - !7ASC3P: 4:3 Pan & Scan
    - !7ASC3L: 4:3 Letterbox

- id: tv_system_status
  query: !7?TVS
  responses:
    - !7TVSNT: NTSC
    - !7TVSPL: PAL
    - !7TVSMS: Multi-system

- id: hdmi_1080p_24hz_status
  query: !7?R1K
  responses:
    - !7R1K00: On
    - !7R1K01: Off

- id: hdmi_color_space_status
  query: !7?CLS
  responses:
    - !7CLSRV: RGB Video Level
    - !7CLSRP: RGB PC Level
    - !7CLSY4: YCbCr 4:4:4
    - !7CLSY2: YCbCr 4:2:2

- id: hdmi_deep_color_status
  query: !7?DPC
  responses:
    - !7DPC48: 48 Bits
    - !7DPC36: 36 Bits
    - !7DPC30: 30 Bits
    - !7DPCOF: Off

- id: secondary_audio_status
  query: !7?SCA
  responses:
    - !7SCA00: On
    - !7SCA01: Off

- id: fs_setting_status
  query: !7?COO
  responses:
    - !7COO48: 48k LPCM
    - !7COO96: 96k LPCM
    - !7COO19: 192k LPCM

- id: speaker_config_status
  query: !7?SPC
  format: "!7SPC_XX_"

- id: hdmi_cec_status
  query: !7?CCR
  responses:
    - !7CCRH1: HDMI1
    - !7CCROF: Off

- id: bdlive_network_status
  query: !7?LNA
  responses:
    - !7LNA00: On
    - !7LNALT: Limited
    - !7LNA01: Off

- id: osd_status
  query: !7?OSD
  responses:
    - !7OSD00: OSD on
    - !7OSD01: OSD off

- id: video_resolution_status
  query: !7?RSC
  responses:
    - !7RSC1: Auto
    - !7RSC2: 480/576i
    - !7RSC3: 480/576P
    - !7RSC4: 720P
    - !7RSC5: 1080i
    - !7RSC6: 1080P

- id: mute_status
  query: !7?MUT
  responses:
    - !7MUT00: Mute on
    - !7MUT01: Mute off

- id: slow_search_status
  query: !7?SCN
  format: "!7SCN_ds_"
  description: "d: direction (F/R), s: speed"
```

## Variables
```yaml
# All settable parameters captured in Actions as setting kind entries.
# No additional variables.
```

## Events
```yaml
# Device sends unsolicited status notifications on state changes.
# Same payload as query responses.
# Notification triggers: transport state change, track/group change,
# media mount/unmount, tray open/close.
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Pin 7 on RS-232 connector outputs 5V/500mA power. Do not short or misuse."
```

## Notes
- Message format: `!` (start) + `7` (unit type = Blu-ray player) + 3-char opcode + parameters + `[CR]`
- ACK: `ack` (0x61 0x63 0x6B) — command received OK
- NACK: `nack` (0x6E 0x61 0x63 0x6B) — transmission error detected
- NACK triggers: CR received before `!`, missing `7` after `!`, unknown char after `!7`, unknown command, out-of-range parameter, abnormal data size, 5ms between characters exceeded
- TCP/IP timeout: 30ms. Serial timeout: 300ms. Retry same message up to 3 times before recovery process
- Minimum inter-command interval: 30ms (TCP/IP), 500ms before status request after ACK
- Character interval within a command: max 5ms (device sends NACK if exceeded)
- Device accepts ISO/IEC8859-1 character set only
- TCP connections are exclusive — one controller at a time
- Power On/Off commands via Ethernet are invalid/no-op (serial only)
<!-- UNRESOLVED: audio format selection commands not in source -->
<!-- UNRESOLVED: BD-Live timeout or connection keepalive parameters not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-mp1/rs232c_ethernet_protocol_bd-mp1_v0104_en.pdf
  - https://www.tascam.eu/en/docs/BD-MP1_RS-232C_Ethernet_v104.pdf
  - https://www.tascam.eu/en/docs/BD-MP1MKII_RS-232C_Ethernet_v100.pdf
retrieved_at: 2026-04-30T01:50:10.712Z
last_checked_at: 2026-05-14T18:17:21.189Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.189Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 71 spec actions match verbatim source tokens; transport parameters verified; semantic-id convention maps cleanly to wire protocols."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
