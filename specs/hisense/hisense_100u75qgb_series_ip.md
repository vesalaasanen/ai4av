---
spec_id: admin/hisense-e-m-wr-series-control-spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense E/M/WR Series RS-232 Control Spec"
manufacturer: HiSense
model_family: "HiSense E SERIES Digital Signage"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "HiSense E SERIES Digital Signage"
    - "HiSense M SERIES 24/7 Digital Signage"
    - "HiSense WR INTERACTIVE TOUCH DISPLAYS"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=698"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-14T10:38:42.272Z
last_checked_at: 2026-06-02T19:39:07.664Z
generated_at: 2026-06-02T19:39:07.664Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "100U75QGB consumer TV series not present in source; compatibility inferred from manufacturer family only"
  - "source does not describe unsolicited event notifications"
  - "no explicit multi-step macros described in source"
  - "IP control protocol for this model not in source; prior attempt noted IP control guide at hisense-b2b.com but it was not retrieved for this spec"
  - "specific 100U75QGB RS-232 command protocol not confirmed; used commercial signage protocol family"
  - "firmware version compatibility not stated in source"
  - "TCP/IP port number not stated in source (TCP not supported by this doc)"
verification:
  verdict: verified
  checked_at: 2026-06-02T19:39:07.664Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions match verbatim source hex sequences across E/M/WR series; e_power_off byte 6 now correctly 04; transport verified; source fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# HiSense E/M/WR Series RS-232 Control Spec

## Summary
Hisense commercial digital signage and interactive touch displays support RS-232 control. Three protocol variants exist: **E SERIES** (115200 baud, wake-on-LAN for power-on), **M SERIES** (9600 baud, 12-byte commands with XOR check), and **WR SERIES** (9600 baud, 9-byte commands with XOR check). Command syntax is HEX-encoded binary; no ASCII. The 100U75QGB consumer TV model is not directly covered by this source — this spec documents the commercial signage protocol family.

<!-- UNRESOLVED: 100U75QGB consumer TV series not present in source; compatibility inferred from manufacturer family only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # E SERIES; M/WR SERIES use 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # power on/off commands present (E/M/WR)
- routable       # input selection commands present (E/M/WR)
- levelable      # volume, brightness settable (E/M/WR)
- queryable      # query commands for power state, input, volume (E/M/WR)
```

## Actions
```yaml
# E SERIES (baud 115200)
# Format: A6 xx [data...] yy  where xx=screen ID, yy=XOR check bit
- id: e_power_on
  label: E Series Power On
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF; 00 = broadcast
  notes: UART Wake On must be enabled on display
  hex: "A6 xx 00 00 00 04 01 18 02 yy"
  example: "A6 01 00 00 00 04 01 18 02 B8"

- id: e_power_off
  label: E Series Power Off
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 18 01 yy"
  example: "A6 01 00 00 00 04 01 18 01 BB"

- id: e_hdmi1_input
  label: E Series HDMI 1 Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 0D yy"
  example: "A6 01 00 00 00 04 01 AC 0D 03"

- id: e_hdmi2_input
  label: E Series HDMI 2 Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 06 yy"

- id: e_ops_input
  label: E Series OPS Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 0B yy"

- id: e_cms_input
  label: E Series CMS Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 15 yy"

- id: e_pdf_input
  label: E Series PDF Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 17 yy"

- id: e_media_input
  label: E Series Media Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 16 yy"

- id: e_usb_input
  label: E Series USB Input
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 AC 0C yy"

- id: e_set_volume
  label: E Series Set Volume
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
    - name: level
      type: integer
      description: Volume level 0-100 (hex 00-64)
  hex: "A6 xx 00 00 00 04 01 44 vv yy"
  example: "A6 01 00 00 00 04 01 44 4D AB"  # vv=4D = volume 77

- id: e_set_mains_mode
  label: E Series Set Mains Application Mode
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
    - name: mode
      type: integer
      description: 00=Standby, 01=Power On, 02=Last known state
  hex: "A6 xx 00 00 00 04 01 A3 ww yy"

- id: e_query_input
  label: E Series Query Input Selection
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 03 01 AD yy"
  response: "zz = 0D HDMI1, 06 HDMI2, 0B OPS, 15 CMS, 17 PDF, 16 Media, 0C USB, 14 Home"

- id: e_query_power_state
  label: E Series Query Power State
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 03 01 19 yy"
  response: "zz = 01 Off, 02 On"

- id: e_query_sw_version
  label: E Series Query Software Version
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 04 01 A2 02 yy"

- id: e_query_volume
  label: E Series Query Volume Level
  kind: action
  params:
    - name: screen_id
      type: integer
      description: Screen ID 01-FF
  hex: "A6 xx 00 00 00 03 01 45 yy"

# E SERIES navigation (no screen_id prefix; fixed check byte)
- id: e_source_menu
  label: E Series Source Menu
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 FA"

- id: e_settings_menu
  label: E Series Settings Menu
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 FD"

- id: e_up
  label: E Series Up
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 67"

- id: e_down
  label: E Series Down
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 6C"

- id: e_ok
  label: E Series Ok
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 1C"

- id: e_right
  label: E Series Right
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 6A"

- id: e_left
  label: E Series Left
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 69"

- id: e_home
  label: E Series Home
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 66"

- id: e_vol_up
  label: E Series Volume Up
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 73"

- id: e_vol_down
  label: E Series Volume Down
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 72"

- id: e_return
  label: E Series Return
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 0A"

- id: e_back
  label: E Series Back
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 09"

- id: e_num_0
  label: E Series Num 0
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 30"

- id: e_num_1
  label: E Series Num 1
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 31"

- id: e_num_2
  label: E Series Num 2
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 32"

- id: e_num_3
  label: E Series Num 3
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 33"

- id: e_num_4
  label: E Series Num 4
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 34"

- id: e_num_5
  label: E Series Num 5
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 35"

- id: e_num_6
  label: E Series Num 6
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 36"

- id: e_num_7
  label: E Series Num 7
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 37"

- id: e_num_8
  label: E Series Num 8
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 38"

- id: e_num_9
  label: E Series Num 9
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 39"

- id: e_ch_up
  label: E Series Channel Up
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 63"

- id: e_ch_down
  label: E Series Channel Down
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 64"

- id: e_subtitle
  label: E Series Subtitle
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 71"

# M SERIES (baud 9600)
# Format: DD FF 00 LL C1 SS 00 00 xx VV yy BB CC [response] CD CD
# where xx=device ID, VV=data, yy=XOR check
- id: m_power_on
  label: M Series Power On
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 08 C1 15 00 00 xx BB BB yy BB CC"
  example: "DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"
  response: "DD BB CC AB AB 00 08 C1 15 00 00 xx BB BB yy CD CD"

- id: m_power_off
  label: M Series Power Off
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 08 C1 15 00 00 xx AA AA yy BB CC"
  response: "DD BB CC AB AB 00 08 C1 15 00 00 xx AA AA yy CD CD"

- id: m_displayport_input
  label: M Series DisplayPort Input
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 08 00 00 xx 16 yy BB CC"
  response: "CD CD"

- id: m_vga_input
  label: M Series VGA Input
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 08 00 00 xx 17 yy BB CC"
  response: "CD CD"

- id: m_hdmi_input
  label: M Series HDMI Input
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 08 00 00 xx 08 yy BB CC"
  response: "CD CD"

- id: m_dvi_input
  label: M Series DVI Input
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 08 00 00 xx 09 yy BB CC"
  response: "CD CD"

- id: m_mute_audio_on
  label: M Series Mute Audio On
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 26 00 00 xx 01 yy BB CC"

- id: m_mute_audio_off
  label: M Series Mute Audio Off
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 07 C1 26 00 00 xx 00 yy BB CC"

- id: m_set_volume
  label: M Series Set Volume
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
    - name: level
      type: integer
      description: Volume level 0-100 in hex
  hex: "DD FF 00 07 C1 27 00 00 xx vv yy BB CC"

- id: m_query_status
  label: M Series Query Status
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID 01-FF in hex
  hex: "DD FF 00 06 C1 28 00 00 xx yy BB CC"
  response: "aa=volume, bb cc=input (05 02 DVI, 05 03 displayport, 05 04 HDMI, 08 01 VGA), dd=power (00 on, FF off), ee=mute (01 muted, 00 unmuted), ff=signal (00 absent, 01 present)"

# WR SERIES (baud 9600)
# Format: DD FF [addr bytes] C1 SS [data] xx [check] BB CC / CD CD
- id: wr_power_on
  label: WR Series Power On
  kind: action
  params: []
  hex: "DD FF 01 04 A1 00 00 00 BB CC AB AB 01 04 A1 00 00 00 CD CD"
  feedback: "CD CD"

- id: wr_power_off
  label: WR Series Power Off
  kind: action
  params: []
  hex: "DD FF 01 04 A1 01 00 00 BB CC AB AB 01 04 A1 01 00 00 CD CD"

- id: wr_pc_input
  label: WR Series PC Input
  kind: action
  params: []
  hex: "DD FF 00 07 C1 08 00 00 01 04 CB BB CC AB AB 00 07 C1 08 00 00 01 04 CB BB CC"
  response: "CD CD"

- id: wr_hdmi1_input
  label: WR Series HDMI 1 Input
  kind: action
  params: []
  hex: "DD FF 00 07 C1 08 00 00 01 05 CA BB CC AB AB 00 07 C1 08 00 00 01 05 CA BB CC"

- id: wr_hdmi2_input
  label: WR Series HDMI 2 Input
  kind: action
  params: []
  hex: "DD FF 00 07 C1 08 00 00 01 06 C9 BB CC AB AB 00 07 C1 08 00 00 01 06 C9 BB CC"

- id: wr_vga_input
  label: WR Series VGA Input
  kind: action
  params: []
  hex: "DD FF 00 07 C1 08 00 00 01 07 C8 BB CC AB AB 00 07 C1 08 00 00 01 07 C8 BB CC"

- id: wr_displayport_input
  label: WR Series DisplayPort Input
  kind: action
  params: []
  hex: "DD FF 00 07 C1 08 00 00 01 0B C4 BB CC AB AB 00 07 C1 08 00 00 01 0B C4 BB CC"

- id: wr_reboot
  label: WR Series Reboot TV
  kind: action
  params: []
  hex: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC AB AB 00 06 C1 1E 00 00 01 CD CD"

- id: wr_set_volume
  label: WR Series Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume value (hex)
  hex: "DD FF 01 04 A1 07 00 xx BB CC AB AB 01 04 A1 07 00 xx CD CD"
  feedback: "CD CD"

- id: wr_video_mute_on
  label: WR Series Video Mute On
  kind: action
  params: []
  hex: "DD FF 00 07 C1 31 00 00 01 00 F6 BB CC AB AB 00 07 C1 31 00 00 01 00 F6 CD CD"

- id: wr_video_mute_off
  label: WR Series Video Mute Off
  kind: action
  params: []
  hex: "DD FF 00 07 C1 31 00 00 01 01 F7 BB CC AB AB 00 07 C1 31 00 00 01 01 F7 CD CD"

- id: wr_set_brightness
  label: WR Series Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness value (hex)
  hex: "DD FF 01 04 A1 08 00 xx BB CC AB AB 01 04 A1 08 00 00 CD CD"
  feedback: "CD CD"

- id: wr_set_date
  label: WR Series Set Date
  kind: action
  params:
    - name: year
      type: integer
      description: Year (ww)
    - name: month
      type: integer
      description: Month (xx)
    - name: day
      type: integer
      description: Day (yy)
    - name: check
      type: integer
      description: XOR check bit (zz)
  hex: "DD FF 00 09 C1 1C 00 00 01 ww xx yy zz BB CC AB AB 00 09 C1 1C 00 00 01 ww xx yy zz CD CD"

- id: wr_set_time
  label: WR Series Set Time
  kind: action
  params:
    - name: hour
      type: integer
      description: Hour (ww)
    - name: minute
      type: integer
      description: Minute (xx)
    - name: second
      type: integer
      description: Seconds (yy)
    - name: check
      type: integer
      description: XOR check bit (zz)
  hex: "DD FF 00 09 C1 1D 00 00 01 ww xx yy zz BB CC AB AB 00 09 C1 1D 00 00 01 ww xx yy zz CD CD"

- id: wr_query_input
  label: WR Series Query Input Selection
  kind: action
  params: []
  hex: "DD FF 00 06 C1 1A 00 00 01 DC BB CC AB AB 00 09 C1 1A 00 00 01 ww xx yy zz CD CD"
  response: "05 03 02=PC, 06 04 00=VGA, 05 05 00=HDMI1, 05 03 01=HDMI2, 05 03 03=Displayport"

- id: wr_query_power_state
  label: WR Series Query Power State
  kind: action
  params: []
  hex: "DD FF 00 06 C1 32 00 00 01 F4 BB CC AB AB 00 07 C1 32 00 00 01 xx yy CD CD"
  response: "xx=00 off, 01 on"

- id: wr_query_sw_version
  label: WR Series Query Software Version
  kind: action
  params: []
  hex: "DD FF 00 06 C1 1B 00 00 01 DD BB CC AB AB 00 07 C1 1B 00 00 01 xx yy CD CD"

- id: wr_query_volume
  label: WR Series Query Volume Level
  kind: action
  params: []
  hex: "DD FF 00 06 C1 33 00 00 01 E0 BB CC AB AB 00 07 C1 33 00 00 01 xx yy CD CD"
  response: "xx=volume level"
```

## Feedbacks
```yaml
# E SERIES feedback (echoed command with computed check bit)
- id: e_feedback
  label: E Series Command Echo
  type: string
  description: Echoes the sent command with computed check bit yy

# M SERIES status query response breakdown
- id: m_status_response
  label: M Series Status Response
  type: object
  fields:
    aa: Volume level
    bb_cc: Input source (05 02=DVI, 05 03=displayport, 05 04=HDMI, 08 01=VGA)
    dd: Power state (00=on, FF=off)
    ee: Mute state (01=muted, 00=unmuted)
    ff: Signal presence (00=absent, 01=present)

# WR SERIES responses
- id: wr_command_ack
  label: WR Series Command Ack
  type: string
  description: "CD CD" acknowledgement byte pair
- id: wr_query_input_response
  label: WR Series Input Query Response
  type: object
  fields:
    source: Input source code (05 03 02=PC, 06 04 00=VGA, 05 05 00=HDMI1, 05 03 01=HDMI2, 05 03 03=Displayport)
- id: wr_query_power_response
  label: WR Series Power Query Response
  type: object
  fields:
    state: Power state (00=off, 01=on)
```

## Variables
```yaml
# E SERIES levelable parameters
- id: e_volume
  label: E Series Volume
  type: integer
  range: [0, 100]
  default: 0

# M SERIES levelable parameters
- id: m_volume
  label: M Series Volume
  type: integer
  range: [0, 100]
  default: 0

# WR SERIES levelable parameters
- id: wr_volume
  label: WR Series Volume
  type: integer
  range: [0, 100]
  default: 0
- id: wr_brightness
  label: WR Series Brightness
  type: integer
  range: [0, 100]
  default: 0
- id: wr_date
  label: WR Series Date
  type: object
  fields:
    year: integer
    month: integer
    day: integer
- id: wr_time
  label: WR Series Time
  type: object
  fields:
    hour: integer
    minute: integer
    second: integer
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: e_wake_on lan
    description: |
      E SERIES Power On command (A6 xx ... 18 02 yy) requires UART Wake On 
      feature to be enabled on the display. Without this setting, the power-on 
      command will have no effect.
      Source: "Uart Wake On function must be On" - External RS232 Control Guide
```

## Notes
Three distinct RS-232 protocol variants documented for Hisense commercial display series.

**E SERIES** — 115200 baud, 9-byte commands, XOR check bit, supports full IR-emulation navigation + input/volume/power control. Check bit calculated over all bytes highlighted in red in the source table.

**M SERIES** — 9600 baud, 12-byte commands, XOR check bit, supports power, input, audio mute, volume, and status query. Status query returns full state block (volume, input, power, mute, signal).

**WR SERIES** — 9600 baud, 9-byte commands, XOR check bit, adds date/time setting, brightness control, video mute, and reboot. Input query returns encoded source tuple.

**XOR check calculation** — all three series use XOR of specific bytes (highlighted in green/red in source) to generate the check bit. Example calculator: https://onlinehextools.com/xor-hex-numbers. The check bit value changes with screen/device ID.

**100U75QGB compatibility note** — this source covers E/M/WR commercial signage series. The consumer TV model 100U75QGB was not directly documented; family compatibility is inferred from manufacturer lineage only. Consumer TV models may use different command syntax.

<!-- UNRESOLVED: IP control protocol for this model not in source; prior attempt noted IP control guide at hisense-b2b.com but it was not retrieved for this spec -->
<!-- UNRESOLVED: specific 100U75QGB RS-232 command protocol not confirmed; used commercial signage protocol family -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP port number not stated in source (TCP not supported by this doc) -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=698"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-14T10:38:42.272Z
last_checked_at: 2026-06-02T19:39:07.664Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T19:39:07.664Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions match verbatim source hex sequences across E/M/WR series; e_power_off byte 6 now correctly 04; transport verified; source fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "100U75QGB consumer TV series not present in source; compatibility inferred from manufacturer family only"
- "source does not describe unsolicited event notifications"
- "no explicit multi-step macros described in source"
- "IP control protocol for this model not in source; prior attempt noted IP control guide at hisense-b2b.com but it was not retrieved for this spec"
- "specific 100U75QGB RS-232 command protocol not confirmed; used commercial signage protocol family"
- "firmware version compatibility not stated in source"
- "TCP/IP port number not stated in source (TCP not supported by this doc)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
