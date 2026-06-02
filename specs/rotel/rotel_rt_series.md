---
spec_id: admin/rotel-rt1080
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RT-1080 Control Spec"
manufacturer: Rotel
model_family: RT-1080
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RT-1080
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:03.083Z
last_checked_at: 2026-06-02T05:46:10.116Z
generated_at: 2026-06-02T05:46:10.116Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power, input-select, volume, mute, or query commands documented in this source — the RT-1080 is a tuner, those functions live on the host amplifier."
  - "traits not applicable based on documented command set."
  - "no query commands documented in source. All state is reported via unsolicited feedback string below."
  - "no settable parameters documented in source beyond the discrete actions above."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing in source."
  - "Flag1–Flag5 bit assignments are partially documented in source (table truncated at end of PDF excerpt). Implementer must consult the full vendor PDF for complete bit definitions."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:10.116Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 control commands matched verbatim to source hex sequences; transport parameters (4800 baud, 8N1, no flow control) verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RT-1080 Control Spec

## Summary
RS-232 HEX control protocol for the Rotel RT-1080 AM/FM tuner. Communication is a fixed 6-byte frame at 4800 baud, 8N1, no handshaking, with a one-byte checksum and FD/FE meta-encoding. The source document is the vendor's original RS232 protocol specification (v1.00, 2012-02-06).

<!-- UNRESOLVED: no power, input-select, volume, mute, or query commands documented in this source — the RT-1080 is a tuner, those functions live on the host amplifier. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No powerable / routable / levelable evidence in source (tuner-only device).
# UNRESOLVED: traits not applicable based on documented command set.
```

## Actions
```yaml
# CRITICAL: command frames are 6 bytes - Start(0xFE) Count(0x03) ID(0x21) Type(0x10) Key(0xXX) Checksum(0xXX).
# Checksum is the 2's-complement low byte of the sum of Count, ID, Type, Key.
# Meta-encoding: bytes FD/FE in the payload must be escaped to FD 00 / FD 01 (N/A for these commands - none contain FD/FE).

- id: tune_up
  label: Tune Up
  kind: action
  command: "FE 03 21 10 19 4D"
  params: []

- id: tune_down
  label: Tune Down
  kind: action
  command: "FE 03 21 10 18 4C"
  params: []

- id: memory
  label: Memory
  kind: action
  command: "FE 03 21 10 0D 41"
  params: []

- id: band_toggle
  label: Band Toggle
  kind: action
  command: "FE 03 21 10 0B 3F"
  params: []

- id: auto_tuning
  label: Auto Tuning
  kind: action
  command: "FE 03 21 10 08 3C"
  params: []

- id: tune_preset
  label: Tune/Preset
  kind: action
  command: "FE 03 21 10 09 3D"
  params: []

- id: frequency_direct
  label: Frequency Direct
  kind: action
  command: "FE 03 21 10 27 5B"
  params: []

- id: preset_scan
  label: Preset Scan
  kind: action
  command: "FE 03 21 10 0A 3E"
  params: []

- id: tuner_display
  label: Tuner Display
  kind: action
  command: "FE 03 21 10 10 44"
  params: []

- id: rds_pty
  label: RDS PTY
  kind: action
  command: "FE 03 21 10 14 48"
  params: []

- id: rds_tp
  label: RDS TP
  kind: action
  command: "FE 03 21 10 13 47"
  params: []

- id: rds_ta
  label: RDS TA
  kind: action
  command: "FE 03 21 10 17 4B"
  params: []

- id: rds_af
  label: RDS AF
  kind: action
  command: "FE 03 21 10 12 46"
  params: []

- id: fm_mono
  label: FM Mono
  kind: action
  command: "FE 03 21 10 11 45"
  params: []

- id: antenna_attenuation
  label: Antenna Attenuation
  kind: action
  command: "FE 03 21 10 15 49"
  params: []

- id: fm_if_wide_narrow_toggle
  label: FM IF Wide/Narrow Toggle
  kind: action
  command: "FE 03 21 10 16 4A"
  params: []

- id: antenna_ab_toggle
  label: Antenna A/B Toggle
  kind: action
  command: "FE 03 21 10 1A 4E"
  params: []

- id: number_0
  label: Number 0
  kind: action
  command: "FE 03 21 10 07 3B"
  params: []

- id: number_1
  label: Number 1
  kind: action
  command: "FE 03 21 10 0F 43"
  params: []

- id: number_2
  label: Number 2
  kind: action
  command: "FE 03 21 10 00 34"
  params: []

- id: number_3
  label: Number 3
  kind: action
  command: "FE 03 21 10 01 35"
  params: []

- id: number_4
  label: Number 4
  kind: action
  command: "FE 03 21 10 02 36"
  params: []

- id: number_5
  label: Number 5
  kind: action
  command: "FE 03 21 10 03 37"
  params: []

- id: number_6
  label: Number 6
  kind: action
  command: "FE 03 21 10 0E 42"
  params: []

- id: number_7
  label: Number 7
  kind: action
  command: "FE 03 21 10 04 38"
  params: []

- id: number_8
  label: Number 8
  kind: action
  command: "FE 03 21 10 05 39"
  params: []

- id: number_9
  label: Number 9
  kind: action
  command: "FE 03 21 10 06 3A"
  params: []

- id: display_dimmer
  label: Display Dimmer
  kind: action
  command: "FE 03 21 10 26 5A"
  params: []

- id: display_refresh
  label: Display Refresh
  kind: action
  command: "FE 03 21 10 FF 33"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query commands documented in source. All state is reported via unsolicited feedback string below.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source beyond the discrete actions above.
```

## Events
```yaml
- id: front_display_change
  label: Front Display Change
  description: |
    Unsolicited 19-byte feedback string mirroring any change to the unit's
    front display. Frame layout:
      FE 12 21 20 [Flag1][Flag2][Flag3][Flag4][Flag5][Char1..Char11] [Checksum]
    Flag1-Flag5 are bitfield bytes describing illuminated display icons
    (see Flag table in source); Char1-Char11 are ASCII for the current
    frequency / RDS radio text. Triggered automatically on any display
    status change - no host command required.
  payload_format: "FE 12 21 20 F1 F2 F3 F4 F5 C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 C11 CS"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing in source.
```

## Notes
- Frame is 6 bytes exactly; Count byte (0x03) covers ID+Type+Key only, not Start or Checksum.
- Checksum is the 2's-complement (low byte) of the sum of Count, ID, Type, Key.
- Do NOT append CR/LF to commands.
- Meta-encoding only matters if a Key byte is 0xFD or 0xFE — none of the 30 documented commands require it.
- This is a tuner; power on/off, input routing, volume, and mute are NOT on this device.
- Doc version: v1.00, dated 2012-02-06 ("Original Specification").

<!-- UNRESOLVED: Flag1–Flag5 bit assignments are partially documented in source (table truncated at end of PDF excerpt). Implementer must consult the full vendor PDF for complete bit definitions. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:03.083Z
last_checked_at: 2026-06-02T05:46:10.116Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:10.116Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 control commands matched verbatim to source hex sequences; transport parameters (4800 baud, 8N1, no flow control) verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power, input-select, volume, mute, or query commands documented in this source — the RT-1080 is a tuner, those functions live on the host amplifier."
- "traits not applicable based on documented command set."
- "no query commands documented in source. All state is reported via unsolicited feedback string below."
- "no settable parameters documented in source beyond the discrete actions above."
- "no multi-step sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing in source."
- "Flag1–Flag5 bit assignments are partially documented in source (table truncated at end of PDF excerpt). Implementer must consult the full vendor PDF for complete bit definitions."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
