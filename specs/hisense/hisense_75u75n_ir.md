---
spec_id: admin/hisense-75u75n
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 75U75N Control Spec"
manufacturer: HiSense
model_family: 75U75N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 75U75N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T01:48:13.548Z
last_checked_at: 2026-06-02T01:48:13.548Z
generated_at: 2026-06-02T01:48:13.548Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "which series applies to the 75U75N specifically; source aggregates three series into one document"
  - "no continuous/parameterized variables beyond command parameters in source"
  - "source documents no multi-step sequences"
  - "which series (E / M / WR) maps to 75U75N"
  - "75U75N firmware version compatibility not stated"
  - "E-Series Power Off template/example mismatch"
  - "M-Series Set Volume example typo"
  - "source references \"numbers highlighted in red\" for check bit calculation; red not preserved in refined text — exact byte subset for XOR may differ from what is implied by the prose"
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:13.548Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched literally in source; all transport parameters verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 75U75N Control Spec

## Summary
RS-232 HEX control for HiSense 75U75N. Source doc covers E-Series, M-Series, WR-Series panels with distinct baud rates and command sets; spec enumerates all commands documented across the three series.

<!-- UNRESOLVED: which series applies to the 75U75N specifically; source aggregates three series into one document -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # E-Series; M-Series and WR-Series use 9600 (see Notes)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: power on/off commands present in all three series
- routable        # inferred: input selection commands present
- levelable       # inferred: set volume and set brightness commands present
- queryable       # inferred: status, input, power, version, volume query commands present
```

## Actions
```yaml
# E-Series commands (baud 115200, RJ45 pinout per E-Series table)
# Command template: A6 xx 00 00 00 <len> 01 <opcode> [<param>] yy
# xx = screen ID (00 = broadcast, 01..FF = specific panel)
# yy = XOR check bit over preceding bytes (computed per command; varies with ID)
# vv = volume level, 0..100 in hex
# ww = mains application mode: 00 standby, 01 power on, 02 last state

- id: e_series_power_on
  label: E-Series Power On
  kind: action
  command: "A6 xx 00 00 00 04 01 18 02 yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 18 02 B8. Uart Wake On must be On."

- id: e_series_power_off
  label: E-Series Power Off
  kind: action
  command: "A6 xx 00 00 00 04 01 18 01 yy"
  notes: "Example shown in source uses IR-style prefix (A6 01 00 00 00 05 01 B0 00 74 67); template and example disagree - preserve both."

- id: e_series_input_hdmi1
  label: E-Series HDMI 1 Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0D yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 0D 03"

- id: e_series_input_hdmi2
  label: E-Series HDMI 2 Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 06 yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 06 08"

- id: e_series_input_ops
  label: E-Series OPS Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0B yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 0B 05"

- id: e_series_input_cms
  label: E-Series CMS Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 15 yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 15 1B"

- id: e_series_input_pdf
  label: E-Series PDF Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 17 yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 17 19"

- id: e_series_input_media
  label: E-Series Media Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 16 yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 16 18"

- id: e_series_input_usb
  label: E-Series USB Input
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0C yy"
  notes: "Example for ID 01: A6 01 00 00 00 04 01 AC 0C 02"

- id: e_series_set_volume
  label: E-Series Set Volume
  kind: action
  command: "A6 xx 00 00 00 04 01 44 {vv} yy"
  params:
    - name: vv
      type: integer
      description: Volume level 0-100 (hex)
  notes: "Example for ID 01, volume 77: A6 01 00 00 00 04 01 44 4D AB"

- id: e_series_set_mains_app_mode
  label: E-Series Set Mains Application Mode
  kind: action
  command: "A6 01 00 00 00 04 01 A3 {ww} yy"
  params:
    - name: ww
      type: enum
      values: [standby, power_on, last_state]
      description: "00=standby, 01=power on, 02=last known state"
  notes: "Example standby: A6 01 00 00 00 04 01 A3 00 01"

- id: e_series_query_input
  label: E-Series Query Input Selection
  kind: query
  command: "A6 xx 00 00 00 03 01 AD yy"
  notes: "Response zz: 0D HDMI1, 06 HDMI2, 0B OPS, 15 CMS, 17 PDF, 16 Media, 0C USB, 14 Home"

- id: e_series_query_power
  label: E-Series Query Power State
  kind: query
  command: "A6 xx 00 00 00 03 01 19 yy"
  notes: "Response zz: 01 off, 02 on"

- id: e_series_query_software_version
  label: E-Series Query Software Version (Platform)
  kind: query
  command: "A6 xx 00 00 00 04 01 A2 02 yy"

- id: e_series_query_volume
  label: E-Series Query Volume Level
  kind: query
  command: "A6 xx 00 00 00 03 01 45 yy"

# E-Series IR/menu navigation (no ID, fixed prefix A6 01 00 00 00 05 01 B0 00 ...)
- id: e_series_source_menu
  label: E-Series Source Menu
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FA"
  notes: "Trailing check byte: E9"

- id: e_series_settings_menu
  label: E-Series Settings Menu
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FD"
  notes: "Trailing check byte: EE"

- id: e_series_up
  label: E-Series Up
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 67"
  notes: "Trailing check byte: 74"

- id: e_series_down
  label: E-Series Down
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6C"
  notes: "Trailing check byte: 7F"

- id: e_series_ok
  label: E-Series OK
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 1C"
  notes: "Trailing check byte: 0F"

- id: e_series_right
  label: E-Series Right
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6A"
  notes: "Trailing check byte: 79"

- id: e_series_left
  label: E-Series Left
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 69"
  notes: "Trailing check byte: 7A"

- id: e_series_home
  label: E-Series Home
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 66"
  notes: "Trailing check byte: 75"

- id: e_series_vol_up
  label: E-Series Vol+
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 73"
  notes: "Trailing check byte: 60"

- id: e_series_vol_down
  label: E-Series Vol-
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 72"
  notes: "Trailing check byte: 61"

- id: e_series_return
  label: E-Series Return
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 0A"
  notes: "Trailing check byte: 03"

- id: e_series_back
  label: E-Series Back
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 09"
  notes: "Trailing check byte: 00"

- id: e_series_num_0
  label: E-Series Num 0
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 30"
  notes: "Trailing check byte: 29"

- id: e_series_num_1
  label: E-Series Num 1
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 31"
  notes: "Trailing check byte: 28"

- id: e_series_num_2
  label: E-Series Num 2
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 32"
  notes: "Trailing check byte: 2B"

- id: e_series_num_3
  label: E-Series Num 3
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 33"
  notes: "Trailing check byte: 2A"

- id: e_series_num_4
  label: E-Series Num 4
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 34"
  notes: "Trailing check byte: 25"

- id: e_series_num_5
  label: E-Series Num 5
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 35"
  notes: "Trailing check byte: 24"

- id: e_series_num_6
  label: E-Series Num 6
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 36"
  notes: "Trailing check byte: 27"

- id: e_series_num_7
  label: E-Series Num 7
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 37"
  notes: "Trailing check byte: 26"

- id: e_series_num_8
  label: E-Series Num 8
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 38"
  notes: "Trailing check byte: 21"

- id: e_series_num_9
  label: E-Series Num 9
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 39"
  notes: "Trailing check byte: 20"

- id: e_series_channel_up
  label: E-Series Channel Up
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 63"
  notes: "Trailing check byte: 52"

- id: e_series_channel_down
  label: E-Series Channel Down
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 64"
  notes: "Trailing check byte: 53"

- id: e_series_subtitle
  label: E-Series Subtitle
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 71"
  notes: "Trailing check byte: 62"

# M-Series commands (baud 9600, different RJ45 pinout)
# Format: DD FF <len> C1 <opcode> 00 00 {xx} {param} yy BB CC (then echoed)
# xx = screen ID hex (01..FF), yy = XOR check, vv = volume 0-100 hex

- id: m_series_power_on
  label: M-Series Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 {xx} BB BB {yy} BB CC"
  notes: "Source lists multiple example variants; preserve as documented."

- id: m_series_power_off
  label: M-Series Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 {xx} AA AA {yy} BB CC"

- id: m_series_input_displayport
  label: M-Series DisplayPort Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {xx} 16 {yy} BB CC"

- id: m_series_input_vga
  label: M-Series VGA Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {xx} 17 {yy} BB CC"

- id: m_series_input_hdmi
  label: M-Series HDMI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {xx} 08 {yy} BB CC"

- id: m_series_input_dvi
  label: M-Series DVI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 {xx} 09 {yy} BB CC"

- id: m_series_mute_on
  label: M-Series Mute Audio On
  kind: action
  command: "DD FF 00 07 C1 26 00 00 {xx} 01 {yy} BB CC"

- id: m_series_mute_off
  label: M-Series Mute Audio Off
  kind: action
  command: "DD FF 00 07 C1 26 00 00 {xx} 00 {yy} BB CC"

- id: m_series_set_volume
  label: M-Series Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 {xx} {vv} {yy} BB CC"
  params:
    - name: vv
      type: integer
      description: Volume level 0-100 (hex)
  notes: "Example in source has vv=01 and trailing 01 - likely source typo; template form used."

- id: m_series_query_status
  label: M-Series Query Status
  kind: query
  command: "DD FF 00 06 C1 28 00 00 {xx} {yy} BB CC"
  notes: "Response: aa=volume, bb cc=input (05 02 DVI, 05 03 DP, 05 04 HDMI, 08 01 VGA), dd=power (00 on, FF off), ee=mute (01 muted, 00 unmuted), ff=signal (00 absent, 01 present)"

# WR-Series commands (baud 9600, different RJ45 pinout)
# Format: DD FF <len> C1 <opcode> 00 00 01 <param> <check> BB CC (Power on/off use A1 opcode)

- id: wr_series_power_on
  label: WR-Series Power On
  kind: action
  command: "DD FF 01 04 A1 00 00 00 BB CC"

- id: wr_series_power_off
  label: WR-Series Power Off
  kind: action
  command: "DD FF 01 04 A1 01 00 00 BB CC"

- id: wr_series_input_pc
  label: WR-Series PC Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 04 CB BB CC"

- id: wr_series_input_hdmi1
  label: WR-Series HDMI 1 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 05 CA BB CC"

- id: wr_series_input_hdmi2
  label: WR-Series HDMI 2 Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 06 C9 BB CC"

- id: wr_series_input_vga
  label: WR-Series VGA Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 07 C8 BB CC"

- id: wr_series_input_displayport
  label: WR-Series DisplayPort Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 0B C4 BB CC"

- id: wr_series_reboot
  label: WR-Series Reboot TV
  kind: action
  command: "DD FF 00 06 C1 1E 00 00 01 D8 BB CC"

- id: wr_series_set_volume
  label: WR-Series Set Volume
  kind: action
  command: "DD FF 01 04 A1 07 00 {xx} BB CC"
  params:
    - name: xx
      type: integer
      description: Volume value

- id: wr_series_video_mute_on
  label: WR-Series Video Mute On
  kind: action
  command: "DD FF 00 07 C1 31 00 00 01 00 F6 BB CC"

- id: wr_series_video_mute_off
  label: WR-Series Video Mute Off
  kind: action
  command: "DD FF 00 07 C1 31 00 00 01 01 F7 BB CC"

- id: wr_series_set_brightness
  label: WR-Series Set Brightness
  kind: action
  command: "DD FF 01 04 A1 08 00 {xx} BB CC"
  params:
    - name: xx
      type: integer
      description: Brightness value

- id: wr_series_set_date
  label: WR-Series Set Date (Y/M/D)
  kind: action
  command: "DD FF 00 09 C1 1C 00 00 01 {ww} {xx} {yy} {zz} BB CC"
  params:
    - name: ww
      type: integer
      description: Year
    - name: xx
      type: integer
      description: Month
    - name: yy
      type: integer
      description: Day
    - name: zz
      type: integer
      description: Check bit (XOR)

- id: wr_series_set_time
  label: WR-Series Set Time (H/M/S)
  kind: action
  command: "DD FF 00 09 C1 1D 00 00 01 {ww} {xx} {yy} {zz} BB CC"
  params:
    - name: ww
      type: integer
      description: Hour
    - name: xx
      type: integer
      description: Minute
    - name: yy
      type: integer
      description: Seconds
    - name: zz
      type: integer
      description: Check bit (XOR)

- id: wr_series_query_input
  label: WR-Series Query Input Selection
  kind: query
  command: "DD FF 00 06 C1 1A 00 00 01 DC BB CC"
  notes: "Response ww xx yy: 05 03 02 PC, 06 04 00 VGA, 05 05 00 HDMI1, 05 03 01 HDMI2, 05 03 03 DisplayPort"

- id: wr_series_query_power
  label: WR-Series Query Power State
  kind: query
  command: "DD FF 00 06 C1 32 00 00 01 F4 BB CC"
  notes: "Response xx: 00 off, 01 on; yy check bit"

- id: wr_series_query_software_version
  label: WR-Series Query Software Version
  kind: query
  command: "DD FF 00 06 C1 1B 00 00 01 DD BB CC"
  notes: "Response xx = software version, yy = check bit"

- id: wr_series_query_volume
  label: WR-Series Query Volume Level
  kind: query
  command: "DD FF 00 06 C1 33 00 00 01 E0 BB CC"
  notes: "Response xx = volume level, yy = check bit"
```

## Feedbacks
```yaml
# E-Series query responses
- id: e_series_input_state
  type: enum
  description: "Currently selected input on E-Series panel"
  values:
    - code: 0D
      name: HDMI_1
    - code: 06
      name: HDMI_2
    - code: 0B
      name: OPS
    - code: 15
      name: CMS
    - code: 17
      name: PDF
    - code: 16
      name: MEDIA
    - code: 0C
      name: USB
    - code: 14
      name: HOME_SCREEN

- id: e_series_power_state
  type: enum
  values:
    - code: 01
      name: off
    - code: 02
      name: on

# M-Series query status response (single multi-field reply)
- id: m_series_status
  type: object
  description: "Multi-field status: aa=volume, bb/cc=input, dd=power, ee=mute, ff=signal"
  fields:
    - name: volume
      range: 0-100
    - name: input
      values: ["05 02 DVI", "05 03 DisplayPort", "05 04 HDMI", "08 01 VGA"]
    - name: power
      values: ["00 on", "FF off"]
    - name: mute
      values: ["00 unmuted", "01 muted"]
    - name: signal
      values: ["00 absent", "01 present"]

# WR-Series query responses
- id: wr_series_input_state
  type: enum
  values:
    - code: "05 03 02"
      name: PC
    - code: "06 04 00"
      name: VGA
    - code: "05 05 00"
      name: HDMI_1
    - code: "05 03 01"
      name: HDMI_2
    - code: "05 03 03"
      name: DisplayPort

- id: wr_series_power_state
  type: enum
  values:
    - code: 00
      name: off
    - code: 01
      name: on
```

## Variables
```yaml
# UNRESOLVED: no continuous/parameterized variables beyond command parameters in source
```

## Events
```yaml
# Source documents "Feedback from Screen" framing - these are responses to queries, not unsolicited events.
# M-Series and WR-Series both echo commands back as part of the protocol; treat as feedback, not events.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# E-Series Power On notes: "Uart Wake On function must be On" - required setting for command to function
# No additional safety warnings, interlocks, or power-on sequencing documented in source
```

## Notes
Source aggregates three HiSense product series in one RS-232 control document with distinct parameters and command sets:
- **E-Series (Digital Signage):** 115200 baud, 8N1, no flow control. RJ45 pinout uses pins 4 (GND), 5 (RX), 7 (TX). Commands prefixed `A6`. Note: Power On example checksum B8 disagrees with XOR of the preceding bytes; Power Off example uses different prefix entirely (`05 01 B0 00`) — source contains internal inconsistencies, preserved verbatim.
- **M-Series (24/7 Digital Signage):** 9600 baud, 8N1, no flow control. RJ45 pinout uses pins 3 (GND), 5 (RX), 8 (TX). Commands prefixed `DD FF`. Set Volume example in source has volume=01 with trailing `01`; treated as likely source typo.
- **WR-Series (Interactive Touch Displays):** 9600 baud, 8N1, no flow control. RJ45 pinout uses pins 1 (RX), 2 (TX), 5 (GND). Commands prefixed `DD FF`. Power on/off use opcode `A1`; all others use opcode `C1`.

Check bit (`yy` / `zz`): XOR of preceding HEX bytes (per source — "numbers highlighted in red" in original; red not preserved in refined text). Use onlinehextools.com/xor-hex-numbers for calculation. Check bit changes with screen ID.

75U75N: consumer ULED TV, not signage or interactive display. Source aggregates all three series without device-to-series mapping. Spec includes all documented commands; operator must determine which series applies to the 75U75N before deployment.

<!-- UNRESOLVED: which series (E / M / WR) maps to 75U75N -->
<!-- UNRESOLVED: 75U75N firmware version compatibility not stated -->
<!-- UNRESOLVED: E-Series Power Off template/example mismatch -->
<!-- UNRESOLVED: M-Series Set Volume example typo -->
<!-- UNRESOLVED: source references "numbers highlighted in red" for check bit calculation; red not preserved in refined text — exact byte subset for XOR may differ from what is implied by the prose -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T01:48:13.548Z
last_checked_at: 2026-06-02T01:48:13.548Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:13.548Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched literally in source; all transport parameters verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "which series applies to the 75U75N specifically; source aggregates three series into one document"
- "no continuous/parameterized variables beyond command parameters in source"
- "source documents no multi-step sequences"
- "which series (E / M / WR) maps to 75U75N"
- "75U75N firmware version compatibility not stated"
- "E-Series Power Off template/example mismatch"
- "M-Series Set Volume example typo"
- "source references \"numbers highlighted in red\" for check bit calculation; red not preserved in refined text — exact byte subset for XOR may differ from what is implied by the prose"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
