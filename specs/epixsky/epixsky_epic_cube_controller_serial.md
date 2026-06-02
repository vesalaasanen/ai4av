---
spec_id: admin/epixsky-epic-cube
schema_version: ai4av-public-spec-v1
revision: 1
title: "EpixSky EPIC CUBE Control Spec"
manufacturer: EpixSky
model_family: "EPIC CUBE 2.1.0"
aliases: []
compatible_with:
  manufacturers:
    - EpixSky
  models:
    - "EPIC CUBE 2.1.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/CUBE-Command-Sheet.pdf
  - https://www.epixsky.com/wp-content/uploads/2024/03/All-Command-Sheets.pdf
retrieved_at: 2026-05-20T21:53:20.399Z
last_checked_at: 2026-05-26T07:42:03.501Z
generated_at: 2026-05-26T07:42:03.501Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no HTTP, TCP, or UDP support documented"
  - "port number not stated in source"
  - "no unsolicited event notifications documented"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "command response format not documented"
  - "maximum concurrent commands per second not stated"
  - "wired pinout for RS-232 connector not provided"
verification:
  verdict: verified
  checked_at: 2026-05-26T07:42:03.501Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched to distinct source commands with correct semantics; transport parameters fully supported; coverage ratio 15/16 exceeds 0.9 threshold. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# EpixSky EPIC CUBE Control Spec

## Summary
LED dimmer/controller for two channels (A and B). RS-232C serial control at 9600 8N1. All commands terminated with carriage return (`\r`). Channel levels and ramp rate stored in EEPROM; persist across power cycles.

<!-- UNRESOLVED: no HTTP, TCP, or UDP support documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # emlon, emloff, emalla, emallb commands present
- levelable  # brighten/dim commands present; emlzxxx, emlaxxx, emlbxxx set levels
```

## Actions
```yaml
- id: set_both_channels_level
  label: Set Both Channels Level
  kind: action
  params:
    - name: level
      type: integer
      description: Level 1-100 (percent)
      range: [1, 100]

- id: set_channel_a_level
  label: Set Channel A Level
  kind: action
  params:
    - name: level
      type: integer
      description: Level 1-100 (percent)
      range: [1, 100]

- id: set_channel_b_level
  label: Set Channel B Level
  kind: action
  params:
    - name: level
      type: integer
      description: Level 1-100 (percent)
      range: [1, 100]

- id: channel_a_on_b_off
  label: Channel A On, B Off
  kind: action
  params: []

- id: channel_b_on_a_off
  label: Channel B On, A Off
  kind: action
  params: []

- id: both_channels_on
  label: Both Channels On
  kind: action
  params: []

- id: set_ramp_rate
  label: Set Ramp Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: 0 (fastest) to 254 (slowest), default is 4
      range: [0, 254]

- id: brighten_channel_a
  label: Brighten Channel A
  kind: action
  params: []

- id: brighten_channel_b
  label: Brighten Channel B
  kind: action
  params: []

- id: brighten_both_channels
  label: Brighten Both Channels
  kind: action
  params: []

- id: dim_channel_a
  label: Dim Channel A
  kind: action
  params: []

- id: dim_channel_b
  label: Dim Channel B
  kind: action
  params: []

- id: dim_both_channels
  label: Dim Both Channels
  kind: action
  params: []

- id: both_channels_off
  label: Both Channels Off
  kind: action
  params: []

- id: globalloff
  label: Global All Off
  description: All Mini Lights and other connected Epic devices off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: version
  label: Version
  kind: query
  description: Returns version information from serial port
  params: []
```

## Variables
```yaml
- id: channel_a_level
  label: Channel A Level
  type: integer
  range: [0, 100]
  description: Current channel A brightness level (percent)

- id: channel_b_level
  label: Channel B Level
  type: integer
  range: [0, 100]
  description: Current channel B brightness level (percent)

- id: ramp_rate
  label: Ramp Rate
  type: integer
  range: [0, 254]
  description: Transition speed, 0=fastest, 254=slowest, default 4
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Brighten/dim commands adjust by 4% per command. Mini Lights recall stored EEPROM levels on power-up.
<!-- UNRESOLVED: command response format not documented -->
<!-- UNRESOLVED: maximum concurrent commands per second not stated -->
<!-- UNRESOLVED: wired pinout for RS-232 connector not provided -->

## Provenance

```yaml
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/CUBE-Command-Sheet.pdf
  - https://www.epixsky.com/wp-content/uploads/2024/03/All-Command-Sheets.pdf
retrieved_at: 2026-05-20T21:53:20.399Z
last_checked_at: 2026-05-26T07:42:03.501Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T07:42:03.501Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched to distinct source commands with correct semantics; transport parameters fully supported; coverage ratio 15/16 exceeds 0.9 threshold. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no HTTP, TCP, or UDP support documented"
- "port number not stated in source"
- "no unsolicited event notifications documented"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "command response format not documented"
- "maximum concurrent commands per second not stated"
- "wired pinout for RS-232 connector not provided"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
