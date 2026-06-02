---
spec_id: admin/hisense-75u78k
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 75U78K Control Spec"
manufacturer: HiSense
model_family: 75U78K
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 75U78K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T01:39:56.617Z
last_checked_at: 2026-06-02T05:46:06.357Z
generated_at: 2026-06-02T05:46:06.357Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents no commands for the 75U78K or U78K/U7K consumer-TV family. E-Series (A6 prefix), M-Series (DD FF 00 08/07/06 frame), and WR-Series (DD FF 01 04 / 00 07 frame) are all distinct command dialects. No U78K-specific baud rate, frame format, or opcode set is stated."
  - "75U78K baud rate not stated; M-Series and WR-Series use 9600, E-Series uses 115200. Applying M-Series default as best-guess inference."
  - "75U78K not stated; all three documented series use 8"
  - "75U78K not stated; all three documented series use none"
  - "75U78K not stated; all three documented series use 1"
  - "physical connector not stated for 75U78K. E-Series and WR-Series use RJ45-to-DB9; M-Series pinout differs."
  - "source contains no 75U78K-specific commands. The three documented"
  - "M-Series example with screen ID 01; verify against 75U78K"
  - "M-Series example"
  - "M-Series example; note M-Series frame is 11 bytes incl. wrapper"
  - "M-Series example; vv = volume 0x00-0x64, yy = XOR check bit"
  - "source documents M-Series status response format only; no 75U78K confirmation"
  - "source contains no settable parameter lists for 75U78K"
  - "source describes no unsolicited notification stream for 75U78K"
  - "source contains no multi-step sequences for 75U78K"
  - "source contains no safety warnings, interlock procedures, or"
  - "source does not document any commands for the 75U78K or U78K/U7K family. The closest analogue (M-Series signage) is documented above, but the spec is flagged `declared_confidence: low` and should not be used to drive hardware without lab verification."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:06.357Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions match M-Series command templates exactly; transport parameters verified verbatim in source. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 75U78K Control Spec

## Summary
HiSense 75U78K is a ULED/U7K-series 75-inch LCD TV. This spec is built from HiSense's generic "External RS232 Control Guide," which documents HEX-byte RS-232 command sets for the E-Series, M-Series, and WR-Series digital-signage/display lines. The 75U78K is **not explicitly named** in the source; commands are assumed (inferred) to share the same framing only by family resemblance to the M-Series 8-data-byte frame.

<!-- UNRESOLVED: source documents no commands for the 75U78K or U78K/U7K consumer-TV family. E-Series (A6 prefix), M-Series (DD FF 00 08/07/06 frame), and WR-Series (DD FF 01 04 / 00 07 frame) are all distinct command dialects. No U78K-specific baud rate, frame format, or opcode set is stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # UNRESOLVED: 75U78K baud rate not stated; M-Series and WR-Series use 9600, E-Series uses 115200. Applying M-Series default as best-guess inference.
  data_bits: 8  # UNRESOLVED: 75U78K not stated; all three documented series use 8
  parity: none  # UNRESOLVED: 75U78K not stated; all three documented series use none
  stop_bits: 1  # UNRESOLVED: 75U78K not stated; all three documented series use 1
  flow_control: none  # UNRESOLVED: 75U78K not stated; all three documented series use none
  # UNRESOLVED: physical connector not stated for 75U78K. E-Series and WR-Series use RJ45-to-DB9; M-Series pinout differs.
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
- powerable       # inferred: power on/off commands present in documented series
- routable        # inferred: input-select commands present in documented series
- queryable       # inferred: query commands present in documented series
- levelable       # inferred: set-volume commands present in documented series
```

## Actions
```yaml
# UNRESOLVED: source contains no 75U78K-specific commands. The three documented
# command dialects (E-Series A6-prefix, M-Series DD-FF-prefix, WR-Series
# DD-FF-prefix) are NOT interchangeable. Listing the M-Series commands below
# as the most-likely match for a consumer TV, but every entry carries an
# unresolved command and is NOT to be driven against a real 75U78K without
# hardware confirmation.
#
# All commands use HEX byte sequences. yy / xx denote check bits (XOR of the
# bytes highlighted in the source's red boxes); vv is a volume level 0x00-0x64.

- id: power_on
  label: Power On
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 BB BB DD BB CC"  # UNRESOLVED: M-Series example with screen ID 01; verify against 75U78K
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "DD FF 00 08 C1 15 00 00 01 AA AA DD BB CC"  # UNRESOLVED: M-Series example
  params: []

- id: hdmi_input
  label: HDMI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 08 C7"  # UNRESOLVED: M-Series example; note M-Series frame is 11 bytes incl. wrapper
  params: []

- id: displayport_input
  label: DisplayPort Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 16 D9"  # UNRESOLVED: M-Series example
  params: []

- id: vga_input
  label: VGA Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 17 D8"  # UNRESOLVED: M-Series example
  params: []

- id: dvi_input
  label: DVI Input
  kind: action
  command: "DD FF 00 07 C1 08 00 00 01 09 C6"  # UNRESOLVED: M-Series example
  params: []

- id: mute_on
  label: Mute Audio On
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 01 E0"  # UNRESOLVED: M-Series example
  params: []

- id: mute_off
  label: Mute Audio Off
  kind: action
  command: "DD FF 00 07 C1 26 00 00 01 00 E1"  # UNRESOLVED: M-Series example
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "DD FF 00 07 C1 27 00 00 01 {vv} {yy}"  # UNRESOLVED: M-Series example; vv = volume 0x00-0x64, yy = XOR check bit
  params:
    - name: vv
      type: integer
      description: Volume level 0x00-0x64 (0-100)
    - name: yy
      type: integer
      description: XOR check bit, computed from preceding bytes

- id: query_status
  label: Query Status
  kind: query
  command: "DD FF 00 06 C1 28 00 00 01 EE"  # UNRESOLVED: M-Series example
  params: []
  returns:
    - name: aa
      type: integer
      description: Current volume level
    - name: bb_cc
      type: string
      description: Current input source (05 02=DVI, 05 03=DisplayPort, 05 04=HDMI, 08 01=VGA)
    - name: dd
      type: integer
      description: Power state (00=on, FF=off)
    - name: ee
      type: integer
      description: Mute state (01=muted, 00=unmuted)
    - name: ff
      type: integer
      description: Signal presence (00=absent, 01=present)
```

## Feedbacks
```yaml
# UNRESOLVED: source documents M-Series status response format only; no 75U78K confirmation
- id: power_state
  type: enum
  values: [on, off]
  source: "M-Series Query Status response byte dd: 00=on, FF=off"

- id: volume_level
  type: integer
  range: [0, 100]
  source: "M-Series Query Status response byte aa"

- id: input_source
  type: enum
  values: [dvi, displayport, hdmi, vga]
  source: "M-Series Query Status response bytes bb cc"

- id: mute_state
  type: enum
  values: [muted, unmuted]
  source: "M-Series Query Status response byte ee: 01=muted, 00=unmuted"

- id: signal_presence
  type: enum
  values: [absent, present]
  source: "M-Series Query Status response byte ff: 00=absent, 01=present"
```

## Variables
```yaml
# UNRESOLVED: source contains no settable parameter lists for 75U78K
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notification stream for 75U78K
```

## Macros
```yaml
# UNRESOLVED: source contains no multi-step sequences for 75U78K
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements specific to the 75U78K.
```

## Notes
- Source document is HiSense's generic "External RS232 Control Guide" — the 75U78K (U78K / U7K consumer-TV family) is **not mentioned** anywhere. Three distinct command dialects are documented (E-Series A6-prefix, M-Series DD-FF-00-prefix, WR-Series DD-FF-01-prefix); they are NOT mutually compatible.
- The actions above are transcribed from the M-Series section (lines 143–171) as the most plausible match for a consumer TV, but this assignment is **inference, not source evidence**. None of these bytes have been confirmed against an actual 75U78K unit.
- All commands include XOR check bits (denoted `yy` in source). The check-bit algorithm is: XOR of the "highlighted red" bytes in the source's frame. For a real implementation, the dev must replicate the source's XOR framing exactly — substituting screen ID `01` for a different ID changes the check bit.
- E-Series uses baud 115200, 8N1, no flow control, with an 8-byte RJ45-to-DB9 pinout. M-Series and WR-Series use 9600 8N1, no flow control, with their own RJ45-to-DB9 pinouts (RX/TX on different pins per series). The 75U78K's serial parameters are not in the source.
- The "Uart Wake On" function must be enabled on E-Series panels for the power-on command to work; equivalent requirement for 75U78K is unknown.
- Volume range across documented series: 0–100 decimal (0x00–0x64).
- HDMI / VGA / DisplayPort / DVI / OPS / CMS / PDF / Media / USB / Home-Screen input codes are listed in the E-Series section (lines 55–63, 104); these are E-Series-specific opcodes and not interchangeable with M-Series codes.
- Consumer-TV features expected on a 75U78K (channel up/down, number pad, EPG, app launch, smart-home integration) are entirely absent from the source.

<!-- UNRESOLVED: source does not document any commands for the 75U78K or U78K/U7K family. The closest analogue (M-Series signage) is documented above, but the spec is flagged `declared_confidence: low` and should not be used to drive hardware without lab verification. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T01:39:56.617Z
last_checked_at: 2026-06-02T05:46:06.357Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:06.357Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions match M-Series command templates exactly; transport parameters verified verbatim in source. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents no commands for the 75U78K or U78K/U7K consumer-TV family. E-Series (A6 prefix), M-Series (DD FF 00 08/07/06 frame), and WR-Series (DD FF 01 04 / 00 07 frame) are all distinct command dialects. No U78K-specific baud rate, frame format, or opcode set is stated."
- "75U78K baud rate not stated; M-Series and WR-Series use 9600, E-Series uses 115200. Applying M-Series default as best-guess inference."
- "75U78K not stated; all three documented series use 8"
- "75U78K not stated; all three documented series use none"
- "75U78K not stated; all three documented series use 1"
- "physical connector not stated for 75U78K. E-Series and WR-Series use RJ45-to-DB9; M-Series pinout differs."
- "source contains no 75U78K-specific commands. The three documented"
- "M-Series example with screen ID 01; verify against 75U78K"
- "M-Series example"
- "M-Series example; note M-Series frame is 11 bytes incl. wrapper"
- "M-Series example; vv = volume 0x00-0x64, yy = XOR check bit"
- "source documents M-Series status response format only; no 75U78K confirmation"
- "source contains no settable parameter lists for 75U78K"
- "source describes no unsolicited notification stream for 75U78K"
- "source contains no multi-step sequences for 75U78K"
- "source contains no safety warnings, interlock procedures, or"
- "source does not document any commands for the 75U78K or U78K/U7K family. The closest analogue (M-Series signage) is documented above, but the spec is flagged `declared_confidence: low` and should not be used to drive hardware without lab verification."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
