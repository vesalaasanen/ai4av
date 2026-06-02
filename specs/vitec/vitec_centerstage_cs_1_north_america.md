---
spec_id: admin/vitec-centerstage-cs-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vitec CenterStage CS-1 (North America) Control Spec"
manufacturer: Vitec
model_family: "CenterStage CS-1"
aliases: []
compatible_with:
  manufacturers:
    - Vitec
  models:
    - "CenterStage CS-1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - curtpalme.com
  - applicationmarket.crestron.com
source_urls:
  - "https://www.curtpalme.com/docs/CenterStage1&2_UserGuide.pdf"
  - https://applicationmarket.crestron.com/vitec-centerstage-cs-1-north-america/
retrieved_at: 2026-04-29T20:24:50.290Z
last_checked_at: 2026-06-02T10:14:13.284Z
generated_at: 2026-06-02T10:14:13.284Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "baud rate is selectable (9600 or 57600) — spec must reflect both; firmware version not stated"
  - "per-register min/max/default values not documented in source"
  - "no unsolicited notification / asynchronous event stream documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source"
  - "firmware version not stated; per-register value ranges not documented; no timing/timeout specifications in source; no unsolicited event stream documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:13.284Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions verified against source; sharpness_write fix (0x91→0x90 = WRITE_SHARPNESS 0x60+0x30) is correct; all opcodes, transport params, and pinout confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Vitec CenterStage CS-1 (North America) Control Spec

## Summary
The Vitec CenterStage CS-1 is a video processor/scaler controllable over RS-232 (DB-9 female, rear panel). The protocol uses a fixed 6-byte frame with attention byte `0xEE`, length `0x04`, command byte, two ASCII-hex data bytes, and a 7-bit sum checksum. This spec covers the transport, protocol, and the 23 command opcodes documented in the vendor manual.

<!-- UNRESOLVED: baud rate is selectable (9600 or 57600) — spec must reflect both; firmware version not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source: "9600 or 57600 (selectable in Miscellaneous menu via front panel OSD)" - 9600 is the default; 57600 also valid
  data_bits: 8  # inferred: standard for 0-9, A-F ASCII byte protocol
  parity: none
  stop_bits: 1
  flow_control: none  # source: "No handshaking provided or required"
  connector: DB-9 female (rear panel)  # source: pinout table
  pinout:
    rx: 3
    tx: 2
    gnd: 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from WRITE_POWER (0x50) command
- routable        # inferred from WRITE_SELECT_INPUT (0x53) command
- queryable       # inferred from Read Command description and data-byte feedback behavior
- levelable       # inferred from WRITE_SHARPNESS / WRITE_CONTRAST / WRITE_BRIGHTNESS / WRITE_COLOR_ADJUST / WRITE_TINT_ADJUST commands
- resettable      # inferred from WRITE_RESET (0x55) command
```

## Actions
```yaml
# Each action uses the 6-byte RS-232 frame:
#   EE 04 {CMD} {MS} {LS} {CS}
# where CS = lower 7 bits of the sum of the preceding 5 bytes.
# Command variants (per source):
#   Relative Write : CMD = base
#   Absolute Write : CMD = base + 0x30
#   Read           : CMD = base + 0x60   (MS/LS = 0)
# All actions below expose the base opcode as documented in the source command set table.
# Data bytes are ASCII hex digits (0-9, A-F) representing an 8-bit value
# (0-255 unsigned, or -128..127 signed for relative writes).

- id: power_write
  label: Power
  kind: action
  command: "EE 04 80 {MS} {LS} {CS}"  # WRITE_POWER 0x50, absolute (0x50+0x30=0x80)
  params:
    - name: state
      type: integer
      description: Power state (absolute). Data byte carries 0-255 value.
  notes: "Base opcode 0x50 (relative). Absolute write uses 0x80. Read (status) uses 0xB0."

- id: input_aspect_write
  label: Input Aspect Ratio
  kind: action
  command: "EE 04 81 {MS} {LS} {CS}"  # WRITE_INPUT_ASPECT 0x51 → absolute 0x81
  params:
    - name: value
      type: integer
      description: Input aspect ratio setting
  notes: "Base opcode 0x51. Relative 0x51, absolute 0x81, read 0xB1."

- id: vid_proc_write
  label: Video Processing Mode
  kind: action
  command: "EE 04 82 {MS} {LS} {CS}"  # WRITE_VID_PROC 0x52 → absolute 0x82
  params:
    - name: value
      type: integer
      description: Video processing mode
  notes: "Base opcode 0x52. Relative 0x52, absolute 0x82, read 0xB2."

- id: select_input_write
  label: Select Input
  kind: action
  command: "EE 04 83 {MS} {LS} {CS}"  # WRITE_SELECT_INPUT 0x53 → absolute 0x83
  params:
    - name: input
      type: integer
      description: Input number
  notes: "Base opcode 0x53. Relative 0x53, absolute 0x83, read 0xB3."

- id: output_aspect_write
  label: Output Aspect Ratio
  kind: action
  command: "EE 04 84 {MS} {LS} {CS}"  # WRITE_OUTPUT_ASPECT 0x54 → absolute 0x84
  params:
    - name: value
      type: integer
      description: Output aspect ratio setting
  notes: "Base opcode 0x54. Relative 0x54, absolute 0x84, read 0xB4."

- id: reset_write
  label: Reset
  kind: action
  command: "EE 04 85 {MS} {LS} {CS}"  # WRITE_RESET 0x55 → absolute 0x85
  params:
    - name: value
      type: integer
      description: Reset sub-mode value
  notes: "Base opcode 0x55. Relative 0x55, absolute 0x85, read 0xB5."

- id: front_panel_write
  label: Front Panel
  kind: action
  command: "EE 04 86 {MS} {LS} {CS}"  # WRITE_FRONT_PANEL 0x56 → absolute 0x86
  params:
    - name: value
      type: integer
      description: Front panel state value
  notes: "Base opcode 0x56. Relative 0x56, absolute 0x86, read 0xB6."

- id: output_res_write
  label: Output Resolution
  kind: action
  command: "EE 04 87 {MS} {LS} {CS}"  # WRITE_OUTPUT_RES 0x57 → absolute 0x87
  params:
    - name: value
      type: integer
      description: Output resolution selection
  notes: "Base opcode 0x57. Relative 0x57, absolute 0x87, read 0xB7."

- id: sharpness_write
  label: Sharpness
  kind: action
  command: "EE 04 90 {MS} {LS} {CS}"  # WRITE_SHARPNESS base opcode 0x60, absolute write 0x60+0x30=0x90
  params:
    - name: value
      type: integer
      description: Sharpness level (range enforced by device; out-of-range values clamped to limit)
  notes: "Base opcode 0x60. Relative 0x60, absolute 0x90, read 0xC0."

- id: contrast_write
  label: Contrast
  kind: action
  command: "EE 04 91 {MS} {LS} {CS}"  # WRITE_CONTRAST 0x61 → absolute 0x91
  params:
    - name: value
      type: integer
      description: Contrast level (range enforced by device; out-of-range values clamped to limit)
  notes: "Base opcode 0x61. Relative 0x61, absolute 0x91, read 0xC1."

- id: brightness_write
  label: Brightness
  kind: action
  command: "EE 04 92 {MS} {LS} {CS}"  # WRITE_BRIGHTNESS 0x62 → absolute 0x92
  params:
    - name: value
      type: integer
      description: Brightness level (range enforced by device; out-of-range values clamped to limit)
  notes: "Base opcode 0x62. Relative 0x62, absolute 0x92, read 0xC2."

- id: v_sz_mode_input_write
  label: Vertical Size Mode (Input)
  kind: action
  command: "EE 04 93 {MS} {LS} {CS}"  # WRITE_V_SZ_MODE_INPUT 0x63 → absolute 0x93
  params:
    - name: value
      type: integer
      description: Vertical size mode (input) value
  notes: "Base opcode 0x63. Relative 0x63, absolute 0x93, read 0xC3."

- id: v_pos_input_write
  label: Vertical Position (Input)
  kind: action
  command: "EE 04 94 {MS} {LS} {CS}"  # WRITE_V_POS_INPUT 0x64 → absolute 0x94
  params:
    - name: value
      type: integer
      description: Vertical position (input) value
  notes: "Base opcode 0x64. Relative 0x64, absolute 0x94, read 0xC4."

- id: h_sz_input_write
  label: Horizontal Size (Input)
  kind: action
  command: "EE 04 95 {MS} {LS} {CS}"  # WRITE_H_SZ_INPUT 0x65 → absolute 0x95
  params:
    - name: value
      type: integer
      description: Horizontal size (input) value
  notes: "Base opcode 0x65. Relative 0x65, absolute 0x95, read 0xC5."

- id: h_pos_input_write
  label: Horizontal Position (Input)
  kind: action
  command: "EE 04 96 {MS} {LS} {CS}"  # WRITE_H_POS_INPUT 0x66 → absolute 0x96
  params:
    - name: value
      type: integer
      description: Horizontal position (input) value
  notes: "Base opcode 0x66. Relative 0x66, absolute 0x96, read 0xC6."

- id: v_sz_output_write
  label: Vertical Size (Output)
  kind: action
  command: "EE 04 97 {MS} {LS} {CS}"  # WRITE_V_SZ_OUTPUT 0x67 → absolute 0x97
  params:
    - name: value
      type: integer
      description: Vertical size (output) value
  notes: "Base opcode 0x67. Relative 0x67, absolute 0x97, read 0xC7."

- id: v_pos_output_write
  label: Vertical Position (Output)
  kind: action
  command: "EE 04 98 {MS} {LS} {CS}"  # WRITE_V_POS_OUTPUT 0x68 → absolute 0x98
  params:
    - name: value
      type: integer
      description: Vertical position (output) value
  notes: "Base opcode 0x68. Relative 0x68, absolute 0x98, read 0xC8."

- id: h_sz_output_write
  label: Horizontal Size (Output)
  kind: action
  command: "EE 04 99 {MS} {LS} {CS}"  # WRITE_H_SZ_OUTPUT 0x69 → absolute 0x99
  params:
    - name: value
      type: integer
      description: Horizontal size (output) value
  notes: "Base opcode 0x69. Relative 0x69, absolute 0x99, read 0xC9."

- id: h_pos_output_write
  label: Horizontal Position (Output)
  kind: action
  command: "EE 04 9A {MS} {LS} {CS}"  # WRITE_H_POS_OUTPUT 0x6A → absolute 0x9A
  params:
    - name: value
      type: integer
      description: Horizontal position (output) value
  notes: "Base opcode 0x6A. Relative 0x6A, absolute 0x9A, read 0xCA."

- id: color_adjust_write
  label: Color Adjust
  kind: action
  command: "EE 04 9B {MS} {LS} {CS}"  # WRITE_COLOR_ADJUST 0x6B → absolute 0x9B
  params:
    - name: value
      type: integer
      description: Color adjustment value
  notes: "Base opcode 0x6B. Relative 0x6B, absolute 0x9B, read 0xCB."

- id: tint_adjust_write
  label: Tint Adjust
  kind: action
  command: "EE 04 9C {MS} {LS} {CS}"  # WRITE_TINT_ADJUST 0x6C → absolute 0x9C
  params:
    - name: value
      type: integer
      description: Tint adjustment value
  notes: "Base opcode 0x6C. Relative 0x6C, absolute 0x9C, read 0xCC."

- id: op_fmt_write
  label: Output Format
  kind: action
  command: "EE 04 9D {MS} {LS} {CS}"  # WRITE_OP_FMT 0x6D → absolute 0x9D
  params:
    - name: value
      type: integer
      description: Output format selection
  notes: "Base opcode 0x6D. Relative 0x6D, absolute 0x9D, read 0xCD."

- id: color_mode_write
  label: Color Mode
  kind: action
  command: "EE 04 9E {MS} {LS} {CS}"  # WRITE_COLOR_MODE 0x6E → absolute 0x9E
  params:
    - name: value
      type: integer
      description: Color mode selection
  notes: "Base opcode 0x6E. Relative 0x6E, absolute 0x9E, read 0xCE."
```

## Feedbacks
```yaml
- id: ack
  type: signal
  description: "ASCII ACK (0x06) - valid command received, accepted"
- id: nak
  type: signal
  description: "ASCII NAK (0x15) - invalid/bad command received"
- id: read_response
  type: object
  description: "6-byte response to a Read command. Frame: 0xEE 0x04 {cmd} {MS} {LS} {CS}, where {cmd} = base+0x60, and {MS}/{LS} carry the current setting of the queried function as ASCII hex digits."
- id: limit_clamp
  type: signal
  description: "When a Write command's Data Byte exceeds the register's accepted range, the device clamps to the limit and the response's Data Byte reflects that limit (not the sent value)."
```

## Variables
```yaml
# Each command in the Actions section represents a settable register / observable value.
# Source does not document specific register ranges or default values per register.
# UNRESOLVED: per-register min/max/default values not documented in source
```

## Events
```yaml
# Source describes only solicited responses (ACK/NAK/Read_Response) - no unsolicited events documented.
# UNRESOLVED: no unsolicited notification / asynchronous event stream documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements documented in source
```

## Notes
- All 23 command opcodes (0x50-0x57 and 0x60-0x6E) are listed as Relative Write base values in the source. Absolute Write uses base+0x30, Read uses base+0x60.
- The 6-byte frame checksum is the lower 7 bits of the sum of the first 5 bytes (`EE 04 {cmd} {MS} {LS}`).
- The Data Bytes are ASCII hex digit characters (0-9, A-F), not raw nibbles. Each Data Byte is the ASCII representation of the hex digit.
- The client MUST wait for ACK/NAK (or a 6-byte Read_Response) after every command before sending the next — no pipelining.
- The `Limits` section states that any out-of-range Data Byte will be clamped to the register's limit; the response will reflect the clamped value, not the erroneous sent value.
- Baud rate is selectable between 9600 and 57600 via the front panel OSD Miscellaneous menu; no auto-baud-detection documented.
- "No handshaking provided or required" — no RTS/CTS or XON/XOFF.

<!-- UNRESOLVED: firmware version not stated; per-register value ranges not documented; no timing/timeout specifications in source; no unsolicited event stream documented -->
```

Spec emitted. 23 actions, transport + auth + traits populated from source, gaps marked unresolved. 23 command opcodes all covered.

## Provenance

```yaml
source_domains:
  - curtpalme.com
  - applicationmarket.crestron.com
source_urls:
  - "https://www.curtpalme.com/docs/CenterStage1&2_UserGuide.pdf"
  - https://applicationmarket.crestron.com/vitec-centerstage-cs-1-north-america/
retrieved_at: 2026-04-29T20:24:50.290Z
last_checked_at: 2026-06-02T10:14:13.284Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:13.284Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions verified against source; sharpness_write fix (0x91→0x90 = WRITE_SHARPNESS 0x60+0x30) is correct; all opcodes, transport params, and pinout confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "baud rate is selectable (9600 or 57600) — spec must reflect both; firmware version not stated"
- "per-register min/max/default values not documented in source"
- "no unsolicited notification / asynchronous event stream documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source"
- "firmware version not stated; per-register value ranges not documented; no timing/timeout specifications in source; no unsolicited event stream documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
