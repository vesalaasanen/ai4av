---
schema_version: ai4av-public-spec-v1
device_id: vitec/centerstage-cs-1-north-america
entity_id: vitec_centerstage_cs_1_north_america
spec_id: admin/vitec-centerstage-cs-1-north-america
revision: 1
author: admin
title: "Vitec CenterStage CS-1 (North America) Control Spec"
status: published
manufacturer: Vitec
manufacturer_key: vitec
model_family: "CenterStage CS-1 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Vitec
  models:
    - "CenterStage CS-1 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: vitec_centerstage_cs_1_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:19.474Z
retrieved_at: 2026-04-27T10:13:19.474Z
last_checked_at: 2026-04-27T10:13:19.474Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:19.474Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions matched source command tokens; transport parameters verified; source catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Vitec CenterStage CS-1 (North America) Control Spec

## Summary
RS-232 serial control protocol for Vitec CenterStage CS-1. 6-byte command structure with attention byte (0xEE), checksum validation, and ACK/NAK responses. Supports power, input selection, aspect ratio, video processing, and image adjustment commands. No authentication required.

<!-- UNRESOLVED: factory default baud rate not stated (9600 listed but 57600 also available via OSD) -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
Traits:
  - powerable
  - routable
  - levelable
```

## Actions
```yaml
Actions:
  - id: write_power
    label: Write Power
    kind: action
    params:
      - name: value
        type: integer
        description: Relative adjustment (signed byte)
  - id: write_input_aspect
    label: Write Input Aspect
    kind: action
    params:
      - name: value
        type: integer
  - id: write_vid_proc
    label: Write Video Processor
    kind: action
    params:
      - name: value
        type: integer
  - id: write_select_input
    label: Select Input
    kind: action
    params:
      - name: value
        type: integer
  - id: write_output_aspect
    label: Write Output Aspect
    kind: action
    params:
      - name: value
        type: integer
  - id: write_reset
    label: Write Reset
    kind: action
    params:
      - name: value
        type: integer
  - id: write_front_panel
    label: Write Front Panel
    kind: action
    params:
      - name: value
        type: integer
  - id: write_output_res
    label: Write Output Resolution
    kind: action
    params:
      - name: value
        type: integer
  - id: write_sharpness
    label: Write Sharpness
    kind: action
    params:
      - name: value
        type: integer
  - id: write_contrast
    label: Write Contrast
    kind: action
    params:
      - name: value
        type: integer
  - id: write_brightness
    label: Write Brightness
    kind: action
    params:
      - name: value
        type: integer
  - id: write_v_sz_mode_input
    label: Write Vertical Size Mode Input
    kind: action
    params:
      - name: value
        type: integer
  - id: write_v_pos_input
    label: Write Vertical Position Input
    kind: action
    params:
      - name: value
        type: integer
  - id: write_h_sz_input
    label: Write Horizontal Size Input
    kind: action
    params:
      - name: value
        type: integer
  - id: write_h_pos_input
    label: Write Horizontal Position Input
    kind: action
    params:
      - name: value
        type: integer
  - id: write_v_sz_output
    label: Write Vertical Size Output
    kind: action
    params:
      - name: value
        type: integer
  - id: write_v_pos_output
    label: Write Vertical Position Output
    kind: action
    params:
      - name: value
        type: integer
  - id: write_h_sz_output
    label: Write Horizontal Size Output
    kind: action
    params:
      - name: value
        type: integer
  - id: write_h_pos_output
    label: Write Horizontal Position Output
    kind: action
    params:
      - name: value
        type: integer
  - id: write_color_adjust
    label: Write Color Adjust
    kind: action
    params:
      - name: value
        type: integer
  - id: write_tint_adjust
    label: Write Tint Adjust
    kind: action
    params:
      - name: value
        type: integer
  - id: write_op_fmt
    label: Write Operation Format
    kind: action
    params:
      - name: value
        type: integer
  - id: write_color_mode
    label: Write Color Mode
    kind: action
    params:
      - name: value
        type: integer
```

## Feedbacks
```yaml
Feedbacks:
  - id: ack_response
    label: ACK Response
    type: string
    description: ASCII ACK (0x06) - command accepted
  - id: nak_response
    label: NAK Response
    type: string
    description: ASCII NAK (0x15) - command rejected
  - id: read_response
    label: Read Response
    type: string
    description: 6-byte response with data bytes reflecting current setting
```

## Macros
```yaml
Macros:
  - id: absolute_write_variant
    label: Absolute Write Command
    description: Relative Write value + 0x30 = absolute write command code
  - id: read_variant
    label: Read Command
    description: Relative Write value + 0x60 = read command code
```

## Safety
```yaml
Safety:
  confirmation_required_for: []
  interlocks: []
```

## Notes

Command encoding — 6 bytes total:
- Byte 0: Attention Byte 0xEE
- Byte 1: Number of bytes to follow (0x04)
- Byte 2: Command Byte (relative write value)
- Byte 3: Data Byte 0 (ASCII hex digit, MS hex)
- Byte 4: Data Byte 1 (ASCII hex digit, LS hex)
- Byte 5: Checksum — 7-bit sum of preceding 5 bytes, MSB = 0

Read command → wait for response or NAK before next transmission.
Absolute write → wait for ACK or NAK before next transmission.
Relative write → wait for ACK or NAK before next transmission.

Register limits enforced — response reflects limit value, not erroneous input.
No handshaking pins used.

<!-- UNRESOLVED: data byte value ranges for each specific command not enumerated in source -->
<!-- UNRESOLVED: front panel lock/unlock command details not in excerpt -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: vitec_centerstage_cs_1_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:19.474Z
retrieved_at: 2026-04-27T10:13:19.474Z
last_checked_at: 2026-04-27T10:13:19.474Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:19.474Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions matched source command tokens; transport parameters verified; source catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
