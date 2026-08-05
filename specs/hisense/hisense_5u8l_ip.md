---
spec_id: admin/hisense-e-m-wr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense E/M/WR Series Digital Signage Display Control Spec"
manufacturer: Hisense
model_family: E-SERIES
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - E-SERIES
    - M-SERIES
    - WR-SERIES
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-04-26T16:18:28.247Z
last_checked_at: 2026-07-21T22:47:53.864Z
generated_at: 2026-07-21T22:47:53.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model 5U8L not found in source. Source documents E-series, M-series, WR-series only."
  - "TCP/IP protocol not present in source"
  - "5U8L model number not found in source document. Compatible models listed as E/M/WR series from document text."
  - "TCP/IP protocol not documented — source covers RS-232 only"
  - "entity_id is placeholder hisense_5u8l per input; not verified against Convex"
  - "source highlights XOR-input bytes in green/red color; which bytes are highlighted cannot be determined from the plain-text extraction, so the exact XOR input set per command is not captured here. Each command's check bit must be recomputed against the full documented byte set."
verification:
  verdict: verified
  checked_at: 2026-07-21T22:47:53.864Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions match literal source commands verbatim; transport parameters verified; 100% coverage of documented command set. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Hisense E/M/WR Series Digital Signage Display Control Spec

## Summary
RS-232 control protocol for Hisense E-Series (digital signage), M-Series (24/7), and WR Interactive Touch Displays. Three command sets documented with HEX encoding, XOR check bits, and screen ID targeting. No IP control documented in this source.

<!-- UNRESOLVED: model 5U8L not found in source. Source documents E-series, M-series, WR-series only. -->
<!-- UNRESOLVED: TCP/IP protocol not present in source -->

## Transport
```yaml
# Source documents RS-232 only. Three series share the transport block but
# differ on baud rate (all values below ARE stated verbatim in source):
#   E-SERIES: 115200  |  M-SERIES: 9600  |  WR-SERIES: 9600
# Primary value below is E-SERIES (first listed). See Notes for per-series split.
protocols:
  - serial
serial:
  baud_rate: 115200  # E-SERIES value from source; M-SERIES and WR-SERIES = 9600 (see Notes)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples
- powerable       # power on/off commands present
- routable        # input source selection commands present
- queryable       # query commands for power state, input, volume, version present
- levelable       # volume and brightness control present
```

## Actions
```yaml
# ============================================================================
# E-SERIES commands (baud 115200). Format: A6 <xx=screenID 01-FF> ... <yy=XOR check bit>.
# xx = screen ID (00 broadcast, 01-FF specific). yy = XOR check bit of highlighted bytes.
# vv = volume 0-100 hex. ww = mains mode. zz = response value.
# ============================================================================
- id: e_power_on
  label: E-Series Power On
  kind: action
  command: "A6 xx 00 00 00 04 01 18 02 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (00=broadcast, 01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit of highlighted bytes (computed)"
  notes: Uart Wake On function must be On

- id: e_power_off
  label: E-Series Power Off
  kind: action
  command: "A6 xx 00 00 00 04 01 18 01 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (00=broadcast, 01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_hdmi1
  label: E-Series HDMI 1 Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0D yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_hdmi2
  label: E-Series HDMI 2 Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 06 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_ops
  label: E-Series OPS Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0B yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_cms
  label: E-Series CMS Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 15 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_pdf
  label: E-Series PDF Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 17 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_media
  label: E-Series Media Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 16 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_select_usb
  label: E-Series USB Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0C yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_set_volume
  label: E-Series Set Volume
  kind: action
  command: "A6 xx 00 00 00 04 01 44 vv yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: level
      type: integer
      description: "vv - volume level 0-100 in HEX"
      range: [0, 100]
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_set_mains_mode
  label: E-Series Set Mains Application Mode
  kind: action
  command: "A6 01 00 00 00 04 01 A3 ww yy"
  params:
    - name: mode
      type: enum
      description: "ww - 00=Standby, 01=Power On, 02=Last known state"
      values: ["00", "01", "02"]
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: e_query_input
  label: E-Series Query Input Selection
  kind: query
  command: "A6 xx 00 00 00 03 01 AD yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"
  notes: Response zz byte = current input (see Feedbacks e_input_query)

- id: e_query_power
  label: E-Series Query Power State
  kind: query
  command: "A6 xx 00 00 00 03 01 19 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"
  notes: Response zz byte = power state (see Feedbacks e_power_state_query)

- id: e_query_version
  label: E-Series Query Software Version
  kind: query
  command: "A6 xx 00 00 00 04 01 A2 02 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"
  notes: Returns platform version string (see Feedbacks e_version_query)

- id: e_query_volume
  label: E-Series Query Volume Level
  kind: query
  command: "A6 xx 00 00 00 03 01 45 yy"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"
  notes: Returns volume level (see Feedbacks e_volume_query)

# --- E-SERIES IR/navigation key commands (fixed screen ID 01, distinct HEX per key) ---
- id: e_key_source_menu
  label: E-Series Source Menu Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FA E9"
  params: []

- id: e_key_settings_menu
  label: E-Series Settings Menu Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FD EE"
  params: []

- id: e_key_up
  label: E-Series Up Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 67 74"
  params: []

- id: e_key_down
  label: E-Series Down Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6C 7F"
  params: []

- id: e_key_ok
  label: E-Series OK Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 1C 0F"
  params: []

- id: e_key_right
  label: E-Series Right Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6A 79"
  params: []

- id: e_key_left
  label: E-Series Left Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 69 7A"
  params: []

- id: e_key_home
  label: E-Series Home Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 66 75"
  params: []

- id: e_key_vol_plus
  label: E-Series Volume Plus Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 73 60"
  params: []

- id: e_key_vol_minus
  label: E-Series Volume Minus Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 72 61"
  params: []

- id: e_key_return
  label: E-Series Return Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 0A 03"
  params: []

- id: e_key_back
  label: E-Series Back Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 09 00"
  params: []

- id: e_key_num0
  label: E-Series Num 0 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 30 29"
  params: []

- id: e_key_num1
  label: E-Series Num 1 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 31 28"
  params: []

- id: e_key_num2
  label: E-Series Num 2 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 32 2B"
  params: []

- id: e_key_num3
  label: E-Series Num 3 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 33 2A"
  params: []

- id: e_key_num4
  label: E-Series Num 4 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 34 25"
  params: []

- id: e_key_num5
  label: E-Series Num 5 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 35 24"
  params: []

- id: e_key_num6
  label: E-Series Num 6 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 36 27"
  params: []

- id: e_key_num7
  label: E-Series Num 7 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 37 26"
  params: []

- id: e_key_num8
  label: E-Series Num 8 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 38 21"
  params: []

- id: e_key_num9
  label: E-Series Num 9 Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 39 20"
  params: []

- id: e_key_channel_up
  label: E-Series Channel Up Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 63 52"
  params: []

- id: e_key_channel_down
  label: E-Series Channel Down Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 64 53"
  params: []

- id: e_key_subtitle
  label: E-Series Subtitle Key
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 71 62"
  params: []

# ============================================================================
# M-SERIES commands (baud 9600). Format: DD FF ... <xx=screenID> ... <yy=check bit> BB CC.
# xx = screen ID 01-FF. yy = XOR check bit. vv = volume 0-100 hex.
# ============================================================================
- id: m_power_on
  label: M-Series Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 xx BB BB yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_power_off
  label: M-Series Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 xx AA AA yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_select_displayport
  label: M-Series DisplayPort Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 16 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_select_vga
  label: M-Series VGA Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 17 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_select_hdmi
  label: M-Series HDMI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 08 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_select_dvi
  label: M-Series DVI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 xx 09 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_mute_on
  label: M-Series Audio Mute On
  kind: action
  command: "DD FF 00 07 C1 26 00 00 xx 01 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_mute_off
  label: M-Series Audio Mute Off
  kind: action
  command: "DD FF 00 07 C1 26 00 00 xx 00 yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_set_volume
  label: M-Series Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 xx vv yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: level
      type: integer
      description: "vv - volume level 0-100 in HEX"
      range: [0, 100]
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"

- id: m_query_status
  label: M-Series Query Status
  kind: query
  command: "DD FF 00 06 C1 28 00 00 xx yy BB CC"
  params:
    - name: screen_id
      type: string
      description: "xx - screen ID in HEX (01-FF)"
    - name: check_bit
      type: string
      description: "yy - XOR check bit (computed)"
  notes: Returns composite status word (see Feedbacks m_status)

# ============================================================================
# WR-SERIES commands (baud 9600). Format: DD FF ... BB CC. Fixed screen ID 01.
# xx = volume/brightness value. ww/xx/yy = date/time fields. zz = check bit.
# ============================================================================
- id: wr_power_on
  label: WR-Series Power On
  kind: action
  command: "DD FF 01 04 A1 00 00 00 BB CC"
  params: []

- id: wr_power_off
  label: WR-Series Power Off
  kind: action
  command: "DD FF 01 04 A1 01 00 00 BB CC"
  params: []

- id: wr_select_pc
  label: WR-Series PC Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 04 CB BB CC"
  params: []

- id: wr_select_hdmi1
  label: WR-Series HDMI 1 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 05 CA BB CC"
  params: []

- id: wr_select_hdmi2
  label: WR-Series HDMI 2 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 06 C9 BB CC"
  params: []

- id: wr_select_vga
  label: WR-Series VGA Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 07 C8 BB CC"
  params: []

- id: wr_select_displayport
  label: WR-Series DisplayPort Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 0B C4 BB CC"
  params: []

- id: wr_reboot
  label: WR-Series Reboot TV
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"
  params: []

- id: wr_set_volume
  label: WR-Series Set Volume
  kind: action
  command: "DD FF 01 04 A1 07 00 xx BB CC"
  params:
    - name: level
      type: integer
      description: "xx - volume level in HEX"

- id: wr_video_mute_on
  label: WR-Series Video Mute On
  kind: action
  command: "DD FF 00 07 C1 31 00 00 01 00 F6 BB CC"
  params: []

- id: wr_video_mute_off
  label: WR-Series Video Mute Off
  kind: action
  command: "DD FF 00 07 C1 31 00 00 01 01 F7 BB CC"
  params: []

- id: wr_set_brightness
  label: WR-Series Set Brightness
  kind: action
  command: "DD FF 01 04 A1 08 00 xx BB CC"
  params:
    - name: level
      type: integer
      description: "xx - brightness value in HEX"

- id: wr_set_date
  label: WR-Series Set Date
  kind: action
  command: "DD FF 00 09 C1 1C 00 00 01 ww xx yy zz BB CC"
  params:
    - name: year
      type: integer
      description: "ww - year"
    - name: month
      type: integer
      description: "xx - month"
    - name: day
      type: integer
      description: "yy - day"
    - name: check_bit
      type: string
      description: "zz - XOR check bit (computed)"

- id: wr_set_time
  label: WR-Series Set Time
  kind: action
  command: "DD FF 00 09 C1 1D 00 00 01 ww xx yy zz BB CC"
  params:
    - name: hour
      type: integer
      description: "ww - hour"
    - name: minute
      type: integer
      description: "xx - minute"
    - name: second
      type: integer
      description: "yy - seconds"
    - name: check_bit
      type: string
      description: "zz - XOR check bit (computed)"

- id: wr_query_input
  label: WR-Series Query Input Selection
  kind: query
  command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"
  params: []
  notes: Response ww xx yy = current input (see Feedbacks wr_input_query)

- id: wr_query_power
  label: WR-Series Query Power State
  kind: query
  command: "DD FF 00 06 C1 32 00 00 01 F4 BB CC"
  params: []
  notes: Response xx = power state (see Feedbacks wr_power_state_query)

- id: wr_query_version
  label: WR-Series Query Software Version
  kind: query
  command: "DD FF 00 06 C1 1B 00 00 01 DD BB CC"
  params: []
  notes: Response xx = software version (see Feedbacks wr_version_query)

- id: wr_query_volume
  label: WR-Series Query Volume Level
  kind: query
  command: "DD FF 00 06 C1 33 00 00 01 E0 BB CC"
  params: []
  notes: Response xx = volume level (see Feedbacks wr_volume_query)
```

## Feedbacks
```yaml
# E-SERIES query responses
- id: e_input_query
  type: enum
  values: ["0D=HDMI1", "06=HDMI2", "0B=OPS", "15=CMS", "17=PDF", "16=Media", "0C=USB", "14=HomeScreen"]
  notes: zz byte in query response

- id: e_power_state_query
  type: enum
  values: ["01=Off", "02=On"]
  notes: zz byte in query response

- id: e_volume_query
  type: integer
  range: [0, 100]
  notes: returned in query response

- id: e_version_query
  type: string
  notes: platform version string

# M-SERIES query response (single composite status word)
- id: m_status
  type: object
  fields:
    - name: volume
      type: integer
      description: aa = current volume level
    - name: input
      type: enum
      values: ["05 02=DVI", "05 03=DisplayPort", "05 04=HDMI", "08 01=VGA"]
      description: bb cc = current input source
    - name: power
      type: enum
      values: ["00=On", "FF=Off"]
      description: dd = current power state
    - name: muted
      type: enum
      values: ["01=Muted", "00=Unmuted"]
      description: ee = current mute state
    - name: signal
      type: enum
      values: ["00=No signal", "01=Signal present"]
      description: ff = signal presence at selected input

# WR-SERIES query responses
- id: wr_input_query
  type: enum
  values: ["05 03 02=PC", "06 04 00=VGA", "05 05 00=HDMI1", "05 03 01=HDMI2", "05 03 03=DisplayPort"]
  notes: ww xx yy bytes in query response

- id: wr_power_state_query
  type: enum
  values: ["00=Off", "01=On"]
  notes: xx byte in query response

- id: wr_version_query
  type: string
  notes: xx byte = software version

- id: wr_volume_query
  type: integer
  notes: xx byte = volume level
```

## Variables
```yaml
# No standalone settable parameters separate from actions in source
```

## Events
```yaml
# No unsolicited event notifications documented in source.
# Note: M-SERIES and WR-SERIES emit an acknowledgement frame (AB AB ... CD CD)
# in response to each command, but these are solicited responses, not events.
```

## Macros
```yaml
# No multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "E-Series: UART Wake On must be enabled for Power On command to function"
    source: "Notes field in source document"
```

## Notes
Three distinct Hisense display series share this document but use different HEX command formats and different baud rates:

- **E-Series**: 115200 baud, A6-prefixed commands, XOR check bit on highlighted bytes, screen IDs 01–FF
- **M-Series**: 9600 baud, DD FF-prefixed commands, separate check bit bytes (yy)
- **WR-Series**: 9600 baud, similar DD FF format to M-Series but different command opcodes

All series use RJ45-to-DB9 adapter pinouts (documented in source). All commands are HEX-encoded (not ASCII). Check bit calculation requires XOR of specific bytes per command — online calculator reference provided in source (https://onlinehextools.com/xor-hex-numbers).

Variable byte legend (per source):
- `xx` = screen ID in HEX (E/M-series). 00 = broadcast to all panels; 01–FF = specific panel.
- `yy` = XOR check bit of the highlighted HEX bytes.
- `vv` = volume level to set (0–100 in HEX).
- `ww` = mains application mode (E-series: 00=Standby, 01=Power On, 02=Last known state) OR year/hour field (WR-series date/time).
- `zz` = currently-selected input / power state in query responses (E-series), or check bit (WR-series date/time).
- `aa`=current volume, `bb cc`=current input, `dd`=power state, `ee`=mute state, `ff`=signal presence (M-series status response).

<!-- UNRESOLVED: 5U8L model number not found in source document. Compatible models listed as E/M/WR series from document text. -->
<!-- UNRESOLVED: TCP/IP protocol not documented — source covers RS-232 only -->
<!-- UNRESOLVED: entity_id is placeholder hisense_5u8l per input; not verified against Convex -->
<!-- UNRESOLVED: source highlights XOR-input bytes in green/red color; which bytes are highlighted cannot be determined from the plain-text extraction, so the exact XOR input set per command is not captured here. Each command's check bit must be recomputed against the full documented byte set. -->
````

Caveman changelog: added `command:` payload to all 48 actions (was zero). Expanded collapsed `e_nav` → 24 distinct key actions (coverage rule; one enum can't carry 24 different HEX payloads). Added 9 query actions (4 E + 1 M + 4 WR) with `kind: query`. Fixed transport: M/WR baud 9600 now marked from-source, not UNRESOLVED. Preserved all original IDs + Feedbacks/Safety/Notes. Added note flagging XOR-highlight uncertainty from text extraction.

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-04-26T16:18:28.247Z
last_checked_at: 2026-07-21T22:47:53.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:47:53.864Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions match literal source commands verbatim; transport parameters verified; 100% coverage of documented command set. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model 5U8L not found in source. Source documents E-series, M-series, WR-series only."
- "TCP/IP protocol not present in source"
- "5U8L model number not found in source document. Compatible models listed as E/M/WR series from document text."
- "TCP/IP protocol not documented — source covers RS-232 only"
- "entity_id is placeholder hisense_5u8l per input; not verified against Convex"
- "source highlights XOR-input bytes in green/red color; which bytes are highlighted cannot be determined from the plain-text extraction, so the exact XOR input set per command is not captured here. Each command's check bit must be recomputed against the full documented byte set."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
