---
spec_id: admin/hisense-100e80kua-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Hisense 100E80KUA Series Control Spec"
manufacturer: HiSense
model_family: "100E80KUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100E80KUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-07-13T23:18:41.782Z
last_checked_at: 2026-10-07T13:31:56.206Z
generated_at: 2026-10-07T13:31:56.206Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "whether this device additionally supports IP/Telnet control — not stated in source"
  - "no discrete settable parameters beyond actions listed above"
  - "no unsolicited event notifications documented"
  - "no multi-step macro sequences documented"
  - "safety procedures not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:31:56.206Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 E-series action units match the source frames and serial parameters; M and WR series sections excluded as other product lines. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Hisense 100E80KUA Series Control Spec

## Summary
Hisense 100E80KUA Series commercial display (100-inch 4K UHD). Controls via RS-232 using HEX command protocol with XOR check bit. Supports power on/off, input selection, volume control, and query of power state, input, volume, and software version. The source identifies screen IDs 01–FF. The broadcast byte position is UNRESOLVED because the source gives conflicting placeholder assignments.

<!-- UNRESOLVED: whether this device additionally supports IP/Telnet control — not stated in source -->

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
  type: UNRESOLVED
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 18 02 yy"
  example: "A6 01 00 00 00 04 01 18 02 B8"
  notes: Screen ID 01. Requires UART Wake On enabled.

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 18 01 yy"
  example: UNRESOLVED
  notes: The source command and example conflict; the example is not a Power Off command.

- id: set_hdmi1_input
  label: HDMI 1 Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 0D yy"
  example: "A6 01 00 00 00 04 01 AC 0D 03"

- id: set_hdmi2_input
  label: HDMI 2 Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 06 yy"
  example: "A6 01 00 00 00 04 01 AC 06 08"

- id: set_ops_input
  label: OPS Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 0B yy"
  example: "A6 01 00 00 00 04 01 AC 0B 05"

- id: set_cms_input
  label: CMS Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 15 yy"
  example: "A6 01 00 00 00 04 01 AC 15 1B"

- id: set_pdf_input
  label: PDF Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 17 yy"
  example: "A6 01 00 00 00 04 01 AC 17 19"

- id: set_media_input
  label: Media Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 16 yy"
  example: "A6 01 00 00 00 04 01 AC 16 18"

- id: set_usb_input
  label: USB Input
  kind: action
  params: []
  hex: "A6 xx 00 00 00 04 01 AC 0C yy"
  example: "A6 01 00 00 00 04 01 AC 0C 02"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (hex 00-64)
      range: [0, 100]
  hex: "A6 xx 00 00 00 04 01 44 vv yy"
  example: "A6 01 00 00 00 04 01 44 4D AB"
  notes: vv is volume in hex. Example vv=4D is volume 77.

- id: set_mains_application_mode
  label: Set Mains Application Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Standby, 01=Power On, 02=Last known state"
      values:
        0: Standby
        1: Power On
        2: Last known state
  hex: "A6 01 00 00 00 04 01 A3 ww yy"
  example: "A6 01 00 00 00 04 01 A3 00 01"

- id: source_menu
  label: Source Menu
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 FA E9"

- id: settings_menu
  label: Settings Menu
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 FD EE"

- id: nav_up
  label: Up
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 67 74"

- id: nav_down
  label: Down
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 6C 7F"

- id: nav_ok
  label: Ok
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 1C 0F"

- id: nav_right
  label: Right
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 6A 79"

- id: nav_left
  label: Left
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 69 7A"

- id: nav_home
  label: Home
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 66 75"

- id: vol_up
  label: Vol+
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 73 60"

- id: vol_down
  label: Vol-
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 72 61"

- id: nav_return
  label: Return
  kind: action
  params: []
  hex: "A6 01 00 00 00 05 01 B0 00 9E 8D"
  notes: Matches the E-series source table.
```

## Feedbacks
```yaml
- id: query_input_selection
  label: Query Input Selection
  kind: query
  query_command: "A6 xx 00 00 00 03 01 AD yy"
  hex_request: "A6 xx 00 00 00 03 01 AD yy"
  hex_response: "zz = current input code"
  values_map:
    0D: HDMI 1
    06: HDMI 2
    0B: OPS
    15: CMS
    17: PDF
    16: Media
    0C: USB
    14: Home Screen

- id: query_power_state
  label: Query Power State
  kind: query
  query_command: "A6 xx 00 00 00 03 01 19 yy"
  hex_request: "A6 xx 00 00 00 03 01 19 yy"
  hex_response: "zz = power state"
  values_map:
    01: Off
    02: On

- id: query_software_version
  label: Query Software Version
  kind: query
  query_command: "A6 xx 00 00 00 04 01 A2 02 yy"
  hex_request: "A6 xx 00 00 00 04 01 A2 02 yy"
  notes: Returns platform version.

- id: query_volume_level
  label: Query Volume Level
  kind: query
  query_command: "A6 xx 00 00 00 03 01 45 yy"
  hex_request: "A6 xx 00 00 00 03 01 45 yy"
  notes: Returns current volume as hex.
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions listed above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety procedures not stated in source
```

## Notes
- HEX bytes only — commands are NOT ASCII. Do not send ASCII representations of these codes.
- **Screen ID (xx):** The E-series command table and examples place the screen ID in `xx`; the source states IDs 01–FF.
- **Check bit (yy):** XOR the bytes highlighted in the source. It changes with the screen ID; do not reuse a check bit from one screen ID on another. The source's introductory broadcast note assigns broadcast value 00 to `yy`, conflicting with its command examples and closing placeholder definitions; broadcast addressing is UNRESOLVED.
- **Volume table:** hex values 00–64 (0–100) defined in back of vendor manual. Not reproduced here.
- Wake On function must be enabled for Power On via RS-232 to work.
- M-series and WR-series protocols exist in source but differ significantly (different baud rates, different command structures). This spec covers E-series protocol only.
- Pin configuration for E-series RJ-45: pin 4=GND, pin 5=RX, pin 7=TX. DB-9F: pin 2=RX, pin 3=TX, pin 5=GND. RJ45↔DB-9F mapping: RJ45-4→DB9-5, RJ45-5→DB9-2, RJ45-7→DB9-3.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-07-13T23:18:41.782Z
last_checked_at: 2026-10-07T13:31:56.206Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:31:56.206Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 E-series action units match the source frames and serial parameters; M and WR series sections excluded as other product lines. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "whether this device additionally supports IP/Telnet control — not stated in source"
- "no discrete settable parameters beyond actions listed above"
- "no unsolicited event notifications documented"
- "no multi-step macro sequences documented"
- "safety procedures not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
