---
spec_id: admin/hisense-pl2ne
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense PL2NE Control Spec"
manufacturer: Hisense
model_family: "E SERIES (Digital Signage)"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "E SERIES (Digital Signage)"
    - "M SERIES (24/7 Digital Signage)"
    - "WR SERIES (Interactive Touch Displays)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=399"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=447"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=855"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=521"
retrieved_at: 2026-06-27T18:11:47.399Z
last_checked_at: 2026-06-30T07:07:57.590Z
generated_at: 2026-06-30T07:07:57.590Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "CRITICAL SOURCE MISMATCH."
  - "full feedback formats for E-series queries beyond the return-byte"
  - "no explicit safety warnings, power-on sequencing, or interlock"
  - "CRITICAL — see Summary. Source is E/M/WR RS-232 signage guide,"
  - "E-series Power Off example in source (A6 01 00 00 00 05 01 B0 00 74 67)"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:07:57.590Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched their exact hex command sequences in source; transport serial/baud/parity verified across E/M/WR series. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-27
---

# Hisense PL2NE Control Spec

## Summary
<!-- UNRESOLVED: CRITICAL SOURCE MISMATCH.
     Operator requested device "Hisense PL2NE", protocol TCP/IP. The provided
     source artifact (hisense_pl2ne_ip.refined.md) is in fact an RS-232
     (serial) HEX command guide titled "EXTERNAL RS232 CONTROL GUIDE" covering
     the Hisense E SERIES, M SERIES, and WR SERIES digital-signage / touch
     displays. It contains NO reference to "PL2NE" and NO TCP/IP, telnet, HTTP,
     UDP, or OSC transport. Prior recovery memos (2026-06-04) explicitly
     confirmed this B2B RS-232 guide is irrelevant to the PL2 Laser Cinema
     family and that PL2NE is an ambiguous token (possibly a Gorenje HT360855
     service-part number, not a published model). No first-party IP/RS-232
     document for PL2NE is known to exist.
     This spec therefore transcribes the E/M/WR RS-232 content verbatim so the
     work is not wasted, but it should NOT be treated as a PL2NE control spec.
     Recommend operator: (a) confirm the intended model, or (b) accept a
     community MQTT (port 36669) third-party spec for the PL2 Laser Cinema, or
     (c) keep no_docs status. -->
This document is a serial (RS-232) HEX-command control spec transcribed from a
Hisense B2B guide. It covers E SERIES digital signage, M SERIES 24/7 digital
signage, and WR SERIES interactive touch displays. It is unrelated to the
requested PL2NE model.

## Transport
```yaml
# Source is RS-232 serial only. No TCP/IP, HTTP, UDP, or OSC in source.
# (Requested protocol "TCP/IP" is NOT supported by this source - see Summary.)
protocols:
  - serial
serial:
  baud_rate: 9600  # M-SERIES and WR-SERIES use 9600; E-SERIES uses 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# E-SERIES serial override: baud_rate 115200 (all other params identical).
# Pinouts differ per series (E: RJ45 pins 4/5/7; M: pins 3/5/8; WR: pins 2/3/5).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: Power On / Power Off commands present (all 3 series)
  - routable    # inferred: input-select commands present (all 3 series)
  - queryable   # inferred: query commands returning state present (all 3 series)
  - levelable   # inferred: Set Volume / Set Brightness present
```

## Actions
```yaml
# Coverage: every distinct command row in the source, across E/M/WR series.
# Each row is a separate action (per granularity rule).
# All payloads are HEX bytes, verbatim from source. xx = screen ID (01-FF, or 00
# for broadcast); yy = XOR check bit; vv = volume 00-64; ww = mode/value as noted.
# Commands are grouped by source series. E-SERIES requires baud 115200; M/WR use 9600.

# ===== E SERIES (Digital Signage) - baud 115200 =====
- id: e_power_on
  label: Power On (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 18 02 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF (00 = broadcast)"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Uart Wake On function must be On. Example (ID 01): A6 01 00 00 00 04 01 18 02 B8"

- id: e_power_off
  label: Power Off (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 18 01 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 05 01 B0 00 74 67"

- id: e_input_hdmi1
  label: HDMI 1 Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 0D yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 0D 03"

- id: e_input_hdmi2
  label: HDMI 2 Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 06 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 06 08"

- id: e_input_ops
  label: OPS Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 0B yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 0B 05"

- id: e_input_cms
  label: CMS Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 15 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 15 1B"

- id: e_input_pdf
  label: PDF Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 17 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 17 19"

- id: e_input_media
  label: Media Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 16 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 16 18"

- id: e_input_usb
  label: USB Input (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 AC 0C yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 AC 0C 02"

- id: e_set_volume
  label: Set Volume (E)
  kind: action
  series: E
  command: "A6 xx 00 00 00 04 01 44 vv yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: vv, type: hex, description: "Volume level 00-64 (0-100 decimal)"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 44 4D AB (vv=4D=77)"

- id: e_set_mains_app_mode
  label: Set Mains Application Mode (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 04 01 A3 ww yy"
  params:
    - {name: ww, type: hex, description: "00=Standby, 01=Power On, 02=Last known state"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): A6 01 00 00 00 04 01 A3 00 01 (ww=00 standby)"

- id: e_query_input_selection
  label: Query Input Selection (E)
  kind: query
  series: E
  command: "A6 xx 00 00 00 03 01 AD yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Returns zz = current input. 0D=HDMI1, 06=HDMI2, 0B=OPS, 15=CMS, 17=PDF, 16=Media, 0C=USB, 14=Home. Example (ID 01): A6 01 00 00 00 03 01 AD 08"

- id: e_query_power_state
  label: Query Power State (E)
  kind: query
  series: E
  command: "A6 xx 00 00 00 03 01 19 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Returns zz: 01=Off, 02=On. Example (ID 01): A6 01 00 00 00 03 01 19 BC"

- id: e_query_software_version
  label: Query Software Version (E)
  kind: query
  series: E
  command: "A6 xx 00 00 00 04 01 A2 02 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Get platform version. Example (ID 01): A6 01 00 00 00 04 01 A2 02 02"

- id: e_query_volume_level
  label: Query Volume Level (E)
  kind: query
  series: E
  command: "A6 xx 00 00 00 03 01 45 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Get volume. Example (ID 01): A6 01 00 00 00 03 01 45 E0"

- id: e_source_menu
  label: Source Menu (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 FA E9"
  params: []

- id: e_settings_menu
  label: Settings Menu (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 FD EE"
  params: []

- id: e_up
  label: Up (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 67 74"
  params: []

- id: e_down
  label: Down (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 6C 7F"
  params: []

- id: e_ok
  label: OK (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 1C 0F"
  params: []

- id: e_right
  label: Right (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 6A 79"
  params: []

- id: e_left
  label: Left (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 69 7A"
  params: []

- id: e_home
  label: Home (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 66 75"
  params: []

- id: e_vol_up
  label: Vol+ (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 73 60"
  params: []

- id: e_vol_down
  label: Vol- (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 72 61"
  params: []

- id: e_return
  label: Return (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 0A 03"
  params: []

- id: e_back
  label: Back (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 09 00"
  params: []

- id: e_num_0
  label: Num 0 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 30 29"
  params: []

- id: e_num_1
  label: Num 1 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 31 28"
  params: []

- id: e_num_2
  label: Num 2 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 32 2B"
  params: []

- id: e_num_3
  label: Num 3 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 33 2A"
  params: []

- id: e_num_4
  label: Num 4 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 34 25"
  params: []

- id: e_num_5
  label: Num 5 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 35 24"
  params: []

- id: e_num_6
  label: Num 6 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 36 27"
  params: []

- id: e_num_7
  label: Num 7 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 37 26"
  params: []

- id: e_num_8
  label: Num 8 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 38 21"
  params: []

- id: e_num_9
  label: Num 9 (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 39 20"
  params: []

- id: e_channel_up
  label: Channel Up (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 63 52"
  params: []

- id: e_channel_down
  label: Channel Down (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 64 53"
  params: []

- id: e_subtitle
  label: Subtitle (E)
  kind: action
  series: E
  command: "A6 01 00 00 00 05 01 B0 00 71 62"
  params: []

# ===== M SERIES (24/7 Digital Signage) - baud 9600 =====
- id: m_power_on
  label: Power On (M)
  kind: action
  series: M
  command: "DD FF 00 08 C1 15 00 00 xx BB BB yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"

- id: m_power_off
  label: Power Off (M)
  kind: action
  series: M
  command: "DD FF 00 08 C1 15 00 00 xx AA AA yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 08 C1 15 00 00 01 AA AA DD BB CC"

- id: m_input_displayport
  label: DisplayPort Input (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 08 00 00 xx 16 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 08 00 00 01 16 D9 BB CC"

- id: m_input_vga
  label: VGA Input (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 08 00 00 xx 17 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 08 00 00 01 17 D8 BB CC"

- id: m_input_hdmi
  label: HDMI Input (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 08 00 00 xx 08 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 08 00 00 01 08 C7 BB CC"

- id: m_input_dvi
  label: DVI Input (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 08 00 00 xx 09 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 08 00 00 01 09 C6 BB CC"

- id: m_mute_audio_on
  label: Mute Audio On (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 26 00 00 xx 01 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 26 00 00 01 01 E0 BB CC"

- id: m_mute_audio_off
  label: Mute Audio Off (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 26 00 00 xx 00 yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 26 00 00 01 00 E1 BB CC"

- id: m_set_volume
  label: Set Volume (M)
  kind: action
  series: M
  command: "DD FF 00 07 C1 27 00 00 xx vv yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: vv, type: hex, description: "Volume 00-64 (0-100 decimal)"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 07 C1 27 00 00 01 01 E1 BB CC"

- id: m_query_status
  label: Query Status (M)
  kind: query
  series: M
  command: "DD FF 00 06 C1 28 00 00 xx yy"
  params:
    - {name: xx, type: hex, description: "Screen ID 01-FF"}
    - {name: yy, type: hex, description: "XOR check bit"}
  notes: "Example (ID 01): DD FF 00 06 C1 28 00 00 01 EE BB CC. Response: AB AB 00 0C 28 00 00 xx aa bb cc dd ee ff yy CD CD"

# ===== WR SERIES (Interactive Touch Displays) - baud 9600 =====
- id: wr_power_on
  label: Power On (WR)
  kind: action
  series: WR
  command: "DD FF 01 04 A1 00 00 00 BB CC"
  params: []

- id: wr_power_off
  label: Power Off (WR)
  kind: action
  series: WR
  command: "DD FF 01 04 A1 01 00 00 BB CC"
  params: []

- id: wr_input_pc
  label: PC Input (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 08 00 00 01 04 CB BB CC"
  params: []

- id: wr_input_hdmi1
  label: HDMI 1 Input (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 08 00 00 01 05 CA BB CC"
  params: []

- id: wr_input_hdmi2
  label: HDMI 2 Input (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 08 00 00 01 06 C9 BB CC"
  params: []

- id: wr_input_vga
  label: VGA Input (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 08 00 00 01 07 C8 BB CC"
  params: []

- id: wr_input_displayport
  label: DisplayPort Input (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 08 00 00 01 0B C4 BB CC"
  params: []

- id: wr_reboot_tv
  label: Reboot TV (WR)
  kind: action
  series: WR
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"
  params: []

- id: wr_set_volume
  label: Set Volume (WR)
  kind: action
  series: WR
  command: "DD FF 01 04 A1 07 00 xx BB CC"
  params:
    - {name: xx, type: hex, description: "Volume value"}
  notes: "Example (ID 01): AB AB 01 04 A1 07 00 xx CD CD"

- id: wr_video_mute_on
  label: Video Mute On (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 31 00 00 01 00 F6 BB CC"
  params: []

- id: wr_video_mute_off
  label: Video Mute Off (WR)
  kind: action
  series: WR
  command: "DD FF 00 07 C1 31 00 00 01 01 F7 BB CC"
  params: []

- id: wr_set_brightness
  label: Set Brightness (WR)
  kind: action
  series: WR
  command: "DD FF 01 04 A1 08 00 xx BB CC"
  params:
    - {name: xx, type: hex, description: "Brightness value"}
  notes: "Example (ID 01): AB AB 01 04 A1 08 00 00 CD CD"

- id: wr_set_date
  label: Set Date (Y/M/D) (WR)
  kind: action
  series: WR
  command: "DD FF 00 09 C1 1C 00 00 01 ww xx yy zz BB CC"
  params:
    - {name: ww, type: hex, description: "Year"}
    - {name: xx, type: hex, description: "Month"}
    - {name: yy, type: hex, description: "Day"}
    - {name: zz, type: hex, description: "Check bit"}
  notes: "Example (ID 01): AB AB 00 09 C1 1C 00 00 01 ww xx yy zz CD CD"

- id: wr_set_time
  label: Set Time (H/M/S) (WR)
  kind: action
  series: WR
  command: "DD FF 00 09 C1 1D 00 00 01 ww xx yy zz BB CC"
  params:
    - {name: ww, type: hex, description: "Hour"}
    - {name: xx, type: hex, description: "Minute"}
    - {name: yy, type: hex, description: "Seconds"}
    - {name: zz, type: hex, description: "Check bit"}
  notes: "Example (ID 01): AB AB 00 09 C1 1D 00 00 01 ww xx yy zz CD CD"

- id: wr_query_input_selection
  label: Query Input Selection (WR)
  kind: query
  series: WR
  command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"
  params: []
  notes: "Response AB AB 00 09 C1 1A 00 00 01 ww xx yy zz CD CD. ww xx yy = 05 03 02 PC, 06 04 00 VGA, 05 05 00 HDMI1, 05 03 01 HDMI2, 05 03 03 DisplayPort"

- id: wr_query_power_state
  label: Query Power State (WR)
  kind: query
  series: WR
  command: "DD FF 00 06 C1 32 00 00 01 F4 BB CC"
  params: []
  notes: "Response AB AB 00 07 C1 32 00 00 01 xx yy CD CD. xx: 00=off, 01=on; yy=check bit"

- id: wr_query_software_version
  label: Query Software Version (WR)
  kind: query
  series: WR
  command: "DD FF 00 06 C1 1B 00 00 01 DD BB CC"
  params: []
  notes: "Response AB AB 00 07 C1 1B 00 00 01 xx yy CD CD. xx=software version, yy=check bit"

- id: wr_query_volume_level
  label: Query Volume Level (WR)
  kind: query
  series: WR
  command: "DD FF 00 06 C1 33 00 00 01 E0 BB CC"
  params: []
  notes: "Response AB AB 00 07 C1 33 00 00 01 xx yy CD CD. xx=volume level, yy=check bit"
```

## Feedbacks
```yaml
# M-SERIES Query Status response frame (most complete feedback in source):
- id: m_status_frame
  type: object
  format: "AB AB 00 0C 28 00 00 xx aa bb cc dd ee ff yy CD CD"
  fields:
    - {name: aa, meaning: "current volume level"}
    - {name: "bb cc", meaning: "selected input (05 02=DVI, 05 03=DisplayPort, 05 04=HDMI, 08 01=VGA)"}
    - {name: dd, meaning: "power state (00=on, FF=off)"}
    - {name: ee, meaning: "mute state (01=muted, 00=unmuted)"}
    - {name: ff, meaning: "signal presence (00=absent, 01=present)"}

# Per-command ACK/echo frames documented (verbatim prefixes):
- id: m_ack_prefix
  type: raw
  format: "BB CC / AB AB ... CD CD"  # request/response wrappers for M & WR series

- id: e_query_response_power
  type: enum
  values: ["01=Off", "02=On"]
  notes: "E-SERIES Query Power State return byte zz"

- id: e_query_response_input
  type: enum
  values: ["0D=HDMI1", "06=HDMI2", "0B=OPS", "15=CMS", "17=PDF", "16=Media", "0C=USB", "14=Home"]

# UNRESOLVED: full feedback formats for E-series queries beyond the return-byte
# descriptions are not fully specified in the source.
```

## Variables
```yaml
# Discrete settable parameters captured as actions (Set Volume, Set Brightness,
# Set Mains Application Mode, Set Date, Set Time). No additional variables.
```

## Events
```yaml
# No unsolicited notifications documented. All responses are query-driven.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes Power Off command exists but states no interlock/confirmation
# procedure. Uart Wake On function must be On for E-series Power On to work.
# UNRESOLVED: no explicit safety warnings, power-on sequencing, or interlock
# procedures stated in source.
```

## Notes
<!-- UNRESOLVED: CRITICAL — see Summary. Source is E/M/WR RS-232 signage guide,
     not a PL2NE TCP/IP doc. Operator must reconcile before this spec is usable
     as a PL2NE control spec. -->
- All Hisense RS-232 commands are HEX codes, not ASCII.
- XOR check bit (yy / xx / zz depending on series) must be computed per target
  screen ID; value differs per ID. Source links https://onlinehextools.com/xor-hex-numbers.
- Screen ID 00 = broadcast to all daisy-chained panels in a video wall (E-series).
- Pinouts differ per series:
  - E-SERIES RJ45: pin 4=GND, 5=RX, 7=TX (DB-9F: 5,2,3).
  - M-SERIES RJ45: pin 3=GND, 5=RX, 8=TX.
  - WR-SERIES RJ45: pin 2=RX, 3=TX, 5=GND.
- Baud differs per series: E=115200, M=9600, WR=9600 (all 8N1, no flow control).
<!-- UNRESOLVED: E-series Power Off example in source (A6 01 00 00 00 05 01 B0 00 74 67)
     does not match its stated command template (A6 xx 00 00 00 04 01 18 01 yy) —
     source likely has a documentation error; flagged for verifier/operator. -->
````

---

**TL;DR**: Source mismatch. Output faithful E/M/WR RS-232 signage spec + glaring UNRESOLVED. Not PL2NE, not TCP/IP. Operator pick: confirm model / use community MQTT (port 36669) / keep `no_docs`. Caught 1 source doc-bug in E-series Power Off example too.

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=399"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=447"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=855"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=521"
retrieved_at: 2026-06-27T18:11:47.399Z
last_checked_at: 2026-06-30T07:07:57.590Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:07:57.590Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched their exact hex command sequences in source; transport serial/baud/parity verified across E/M/WR series. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "CRITICAL SOURCE MISMATCH."
- "full feedback formats for E-series queries beyond the return-byte"
- "no explicit safety warnings, power-on sequencing, or interlock"
- "CRITICAL — see Summary. Source is E/M/WR RS-232 signage guide,"
- "E-series Power Off example in source (A6 01 00 00 00 05 01 B0 00 74 67)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
