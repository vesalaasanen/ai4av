---
schema_version: ai4av-public-spec-v1
device_id: apart/unknown
entity_id: apart_apart_unknown
spec_id: admin/apart-unknown
revision: 1
author: admin
title: "Apart Unknown Tuner Control Spec"
status: published
manufacturer: Apart
manufacturer_key: apart
model_family: Unknown
aliases: []
compatible_with:
  manufacturers:
    - Apart
  models:
    - Unknown
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://manualslib.com/manual/1564403/Apart-Pm1122-Int.html
  - https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
source_documents:
  - title: "Apart public source"
    url: https://manualslib.com/manual/1564403/Apart-Pm1122-Int.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:08:50.061Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T17:08:50.397Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:09:08.325Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:12:12.122Z
retrieved_at: 2026-04-26T17:12:12.122Z
last_checked_at: 2026-04-27T08:57:42.307Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T08:57:42.307Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions matched source semantically; transport parameters verified or reasonably inferred; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Apart Unknown Tuner Control Spec

## Summary
RS232-controlled radio tuner. Complete command set via serial. Default baud 19200, supports 2400–38400. Stereo/AM/FM operation, preset storage, RDS reception.

<!-- UNRESOLVED: model name not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # standby command present
- routable       # preset recall/store present
- queryable      # get info, get rdsinf commands present
- levelable      # frequency tuning, volume-related commands present
```

## Actions
```yaml
- id: set_echo
  label: Set Echo
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_standby
  label: Set Standby
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_baudrate
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: enum
      values: [2400, 4800, 9600, 19200, 38400]

- id: get_info
  label: Get Info
  kind: action
  params: []

- id: rcl_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-based)

- id: str_preset
  label: Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-based)

- id: set_mantun
  label: Set Manual Tune
  kind: action
  params:
    - name: frequency
      type: number
      description: Frequency in MHz (e.g. 100.90)

- id: set_stereo
  label: Set Stereo
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: inc_search
  label: Increment Search
  kind: action
  params: []

- id: dec_search
  label: Decrement Search
  kind: action
  params: []

- id: set_modula
  label: Set Modulation
  kind: action
  params:
    - name: band
      type: enum
      values: [AM, FM]

- id: inc_mantun
  label: Increment Manual Tune
  kind: action
  params: []

- id: dec_mantun
  label: Decrement Manual Tune
  kind: action
  params: []

- id: get_rdsinf_ps
  label: Get RDS Station Name
  kind: action
  params: []

- id: get_rdsinf_rt
  label: Get RDS Radio Text
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: response strings not documented in source
```

## Variables
```yaml
# UNRESOLVED: no persistent parameters documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Default serial settings: baud 19200, echo on, CR on, BS on, valfb on. Frequency step: FM 50 kHz, AM 9 kHz. Commands not in list are unsupported.
<!-- UNRESOLVED: device model name not stated in source -->

## Provenance

```yaml
source_urls:
  - https://manualslib.com/manual/1564403/Apart-Pm1122-Int.html
  - https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
source_documents:
  - title: "Apart public source"
    url: https://manualslib.com/manual/1564403/Apart-Pm1122-Int.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:08:50.061Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T17:08:50.397Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:09:08.325Z
  - title: "Apart public source"
    url: https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:12:12.122Z
retrieved_at: 2026-04-26T17:12:12.122Z
last_checked_at: 2026-04-27T08:57:42.307Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T08:57:42.307Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions matched source semantically; transport parameters verified or reasonably inferred; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
