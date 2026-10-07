---
spec_id: admin/hisense-100e75lua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100E75LUA Series Control Spec"
manufacturer: HiSense
model_family: "100E75LUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100E75LUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-05-12T09:53:39.305Z
last_checked_at: 2026-10-07T12:50:35.496Z
generated_at: 2026-10-07T12:50:35.496Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not documented in source despite being listed as known protocol; this spec covers RS-232 only. Firmware version compatibility range not stated."
  - "source does not document discrete settable parameters outside of action commands"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "TCP/IP control interface not documented in source; XOR check bit computation algorithm not documented in source; firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:35.496Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec action frames match the source RS-232 hex frames exactly, transport values are supported, and the source has no additional commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# HiSense 100E75LUA Series Control Spec

## Summary
HiSense 100E75LUA Series commercial display control via RS-232 serial using hex command frames. Source documents power, input, volume, OSD navigation, and query commands with XOR checksum.

<!-- UNRESOLVED: TCP/IP control not documented in source despite being listed as known protocol; this spec covers RS-232 only. Firmware version compatibility range not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # source specifies Auth: none
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input selection commands
- queryable       # inferred from query command examples
- levelable       # inferred from volume set/query commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "A6 xx 00 00 00 04 01 18 02 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit (varies per screen_id)
    - name: yy
      type: integer
      description: Screen ID (0x01-0xFF, 0x00 = broadcast)

- id: power_off
  label: Power Off
  kind: action
  command: "A6 xx 00 00 00 04 01 18 01 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit (varies per screen_id)
    - name: yy
      type: integer
      description: Screen ID (0x01-0xFF, 0x00 = broadcast)

- id: set_mains_application_mode
  label: Set Mains Application Mode
  kind: action
  command: "A6 01 00 00 00 04 01 A3 ww yy"
  params:
    - name: ww
      type: integer
      description: Mode (00 = Standby, 01 = Power On, 02 = last known state)
    - name: yy
      type: integer
      description: Screen ID

- id: select_hdmi1
  label: Select HDMI 1
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0D yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_hdmi2
  label: Select HDMI 2
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 06 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_ops
  label: Select OPS
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0B yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_cms
  label: Select CMS
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 15 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_pdf
  label: Select PDF
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 17 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_media
  label: Select Media
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 16 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: select_usb
  label: Select USB
  kind: action
  command: "A6 xx 00 00 00 04 01 AC 0C yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: set_volume
  label: Set Volume
  kind: action
  command: "A6 xx 00 00 00 04 01 44 vv yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: vv
      type: integer
      description: Volume in hex (0x00-0x64, range 0-100)
    - name: yy
      type: integer
      description: Screen ID

- id: nav_source_menu
  label: Source Menu
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FA E9"
  params: []

- id: nav_settings_menu
  label: Settings Menu
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 FD EE"
  params: []

- id: nav_up
  label: Up
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 67 74"
  params: []

- id: nav_down
  label: Down
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6C 7F"
  params: []

- id: nav_ok
  label: Ok
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 1C 0F"
  params: []

- id: nav_right
  label: Right
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 6A 79"
  params: []

- id: nav_left
  label: Left
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 69 7A"
  params: []

- id: nav_home
  label: Home
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 66 75"
  params: []

- id: nav_vol_up
  label: Vol+
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 73 60"
  params: []

- id: nav_vol_down
  label: Vol-
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 72 61"
  params: []

- id: nav_return
  label: Return
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 0A 03"
  params: []

- id: nav_back
  label: Back
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 09 00"
  params: []

- id: nav_num_0
  label: Num 0
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 30 29"
  params: []

- id: nav_num_1
  label: Num 1
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 31 28"
  params: []

- id: nav_num_2
  label: Num 2
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 32 2B"
  params: []

- id: nav_num_3
  label: Num 3
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 33 2A"
  params: []

- id: nav_num_4
  label: Num 4
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 34 25"
  params: []

- id: nav_num_5
  label: Num 5
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 35 24"
  params: []

- id: nav_num_6
  label: Num 6
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 36 27"
  params: []

- id: nav_num_7
  label: Num 7
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 37 26"
  params: []

- id: nav_num_8
  label: Num 8
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 38 21"
  params: []

- id: nav_num_9
  label: Num 9
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 39 20"
  params: []

- id: nav_channel_up
  label: Channel Up
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 63 52"
  params: []

- id: nav_channel_down
  label: Channel Down
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 64 53"
  params: []

- id: nav_subtitle
  label: Subtitle
  kind: action
  command: "A6 01 00 00 00 05 01 B0 00 71 62"
  params: []

- id: query_power_state
  label: Power State Query
  kind: query
  command: "A6 xx 00 00 00 03 01 19 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: query_input_selection
  label: Input Selection Query
  kind: query
  command: "A6 xx 00 00 00 03 01 AD yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: query_software_version
  label: Software Version Query
  kind: query
  command: "A6 xx 00 00 00 04 01 A2 02 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID

- id: query_volume_level
  label: Volume Level Query
  kind: query
  command: "A6 xx 00 00 00 03 01 45 yy"
  params:
    - name: xx
      type: string
      description: XOR check bit
    - name: yy
      type: integer
      description: Screen ID
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  # Source: response zz byte 01 = Off, 02 = On

- id: input_selection
  type: enum
  values: [hdmi1, hdmi2, ops, cms, pdf, media, usb, home_screen]
  # Source: response codes 0D = HDMI 1, 06 = HDMI 2, 0B = OPS, 15 = CMS, 17 = PDF, 16 = Media, 0C = USB, 14 = Home Screen

- id: software_version
  type: string
  # Source: returns platform version

- id: volume_level
  type: integer
  # Source: hex byte 0x00-0x64
```

## Variables
```yaml
# UNRESOLVED: source does not document discrete settable parameters outside of action commands
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On command requires UART Wake On to be enabled on the display. If disabled, Power On command has no effect."
```

## Notes
Source documents RS-232 hex protocol only; no TCP/IP framing documented despite operator hint. XOR check bit (xx) varies per screen_id; consult manufacturer docs for computation routine. NAV_REMOTE commands broadcast to all devices (no screen_id). Volume range 0–100 decimal (0x00–0x64). Power State Query response byte 01 = Off, 02 = On.

<!-- UNRESOLVED: TCP/IP control interface not documented in source; XOR check bit computation algorithm not documented in source; firmware version compatibility range not stated. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-05-12T09:53:39.305Z
last_checked_at: 2026-10-07T12:50:35.496Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:35.496Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec action frames match the source RS-232 hex frames exactly, transport values are supported, and the source has no additional commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not documented in source despite being listed as known protocol; this spec covers RS-232 only. Firmware version compatibility range not stated."
- "source does not document discrete settable parameters outside of action commands"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "TCP/IP control interface not documented in source; XOR check bit computation algorithm not documented in source; firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
