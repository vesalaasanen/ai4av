---
spec_id: admin/rotel-rt_1080
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
retrieved_at: 2026-04-30T04:32:03.083Z
last_checked_at: 2026-04-23T08:24:47.244Z
generated_at: 2026-04-23T08:24:47.244Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:24:47.244Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "All 29 spec actions matched exactly in source; transport parameters verified verbatim; complete command catalogue coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RT-1080 Control Spec

## Summary
Rotel RT-1080 tuner with RS-232 HEX protocol. Serial-only control at 4800 baud, 8-N-1. Device ID 0x21. Meta encoding escapes 0xFD/0xFE. Feedback mirrors front panel display.

<!-- UNRESOLVED: only RT-1080 covered; other RT Series models unconfirmed -->

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
# UNRESOLVED: power commands not present in source; infer if applicable
# levelable: dimmer command present
```

## Actions
```yaml
- id: tuner_tune_up
  label: Tune Up
  kind: action
  params: []
- id: tuner_tune_down
  label: Tune Down
  kind: action
  params: []
- id: tuner_memory
  label: Memory
  kind: action
  params: []
- id: tuner_band_toggle
  label: Band Toggle
  kind: action
  params: []
- id: tuner_auto_tuning
  label: Auto Tuning
  kind: action
  params: []
- id: tuner_preset
  label: Tune/Preset
  kind: action
  params: []
- id: tuner_frequency_direct
  label: Frequency Direct
  kind: action
  params: []
- id: tuner_preset_scan
  label: Preset Scan
  kind: action
  params: []
- id: tuner_display
  label: Tuner Display
  kind: action
  params: []
- id: rds_pty
  label: RDS PTY
  kind: action
  params: []
- id: rds_tp
  label: RDS TP
  kind: action
  params: []
- id: rds_ta
  label: RDS TA
  kind: action
  params: []
- id: rds_af
  label: RDS AF
  kind: action
  params: []
- id: fm_mono
  label: FM Mono
  kind: action
  params: []
- id: antenna_attenuation
  label: Antenna Attenuation
  kind: action
  params: []
- id: fm_if_wide_narrow_toggle
  label: FM IF Wide/Narrow Toggle
  kind: action
  params: []
- id: antenna_ab_toggle
  label: Antenna A/B Toggle
  kind: action
  params: []
- id: number_0
  label: Number 0
  kind: action
  params: []
- id: number_1
  label: Number 1
  kind: action
  params: []
- id: number_2
  label: Number 2
  kind: action
  params: []
- id: number_3
  label: Number 3
  kind: action
  params: []
- id: number_4
  label: Number 4
  kind: action
  params: []
- id: number_5
  label: Number 5
  kind: action
  params: []
- id: number_6
  label: Number 6
  kind: action
  params: []
- id: number_7
  label: Number 7
  kind: action
  params: []
- id: number_8
  label: Number 8
  kind: action
  params: []
- id: number_9
  label: Number 9
  kind: action
  params: []
- id: display_dimmer
  label: Display Dimmer
  kind: action
  params: []
- id: display_refresh
  label: Display Refresh
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: display_state
  label: Display State
  description: |
    18-byte response mirroring front panel. Start=0xFE, Count=0x12, ID=0x21, Type=0x20.
    Flag1-Flag5 bytes encode icon states (Band, RDS, Tuned, Signal strength, etc.).
    Char1-Char11 contain ASCII display text (frequency, RDS radio text).
  kind: feedback
  params:
    - name: flags
      type: object
      description: "Flag1-Flag5: bit-encoded front panel icon states"
    - name: display_text
      type: string
      description: "Char1-Char11: ASCII text from front display"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback on front panel changes;
# full event list not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command structure:** 6-byte HEX commands — Start(0xFE) + Count(0x03) + DeviceID(0x21) + Type(0x10) + Key(0xXX) + Checksum(0xXX). Count excludes Start and Checksum.

**Meta encoding:** Any occurrence of 0xFD or 0xFE in the command payload must be escaped as FD 00 or FD 01 to avoid false start-byte detection.

**No terminators:** Do not send CR/LF after commands.

**Feedback:** Unit sends 18-byte response on any front panel change. No command triggers feedback — it is unsolicited. Response structure: Start(0xFE) + Count(0x12) + ID(0x21) + Type(0x20) + Flag1-5 + Char1-11 + Checksum.

## Provenance

```yaml
source_domains:
  - rotel.com
retrieved_at: 2026-04-30T04:32:03.083Z
last_checked_at: 2026-04-23T08:24:47.244Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:24:47.244Z
matched_actions: 29
action_count: 29
confidence: high
summary: "All 29 spec actions matched exactly in source; transport parameters verified verbatim; complete command catalogue coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
