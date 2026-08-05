---
spec_id: admin/atlona-at-hd-v81
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD-V81 Control Spec"
manufacturer: Atlona
model_family: AT-HD-V81
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HD-V81
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD-V81.pdf
  - https://atlona.com/pdf/rs232/AT-HD-V81_RS232.xls
retrieved_at: 2026-07-21T22:55:55.808Z
last_checked_at: 2026-07-21T23:10:45.212Z
generated_at: 2026-07-21T23:10:45.212Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input count and topology (e.g. 1x8 vs 2x8) not explicitly stated in the extracted source section"
  - "no settable parameters documented in source beyond discrete actions"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
  - "device topology (e.g. 1x8 vs 2x8 input count) not stated in source; firmware version not stated; no query/feedback commands documented beyond OK/NG acknowledgement"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:10:45.212Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions match verbatim in the source command table; transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Atlona AT-HD-V81 Control Spec

## Summary
Atlona AT-HD-V81 is an 8-output HDMI splitter controllable over RS-232C. This spec covers the ASCII text command set documented in the vendor manual: per-output port switching (PORT 1..PORT 8), signal-enhance toggle (SIGNAL 0/1), and power on/off (POWER 0/1). Commands are terminated by CR; the unit replies `OK` for legal commands and `NG` for illegal ones.

<!-- UNRESOLVED: input count and topology (e.g. 1x8 vs 2x8) not explicitly stated in the extracted source section -->

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
- powerable  # inferred from POWER 0/POWER 1 command examples
- routable   # inferred from PORT 1..PORT 8 command examples
```

## Actions
```yaml
- id: port_1_on
  label: Select Output 1
  kind: action
  command: "PORT 1"
  params: []

- id: port_2_on
  label: Select Output 2
  kind: action
  command: "PORT 2"
  params: []

- id: port_3_on
  label: Select Output 3
  kind: action
  command: "PORT 3"
  params: []

- id: port_4_on
  label: Select Output 4
  kind: action
  command: "PORT 4"
  params: []

- id: port_5_on
  label: Select Output 5
  kind: action
  command: "PORT 5"
  params: []

- id: port_6_on
  label: Select Output 6
  kind: action
  command: "PORT 6"
  params: []

- id: port_7_on
  label: Select Output 7
  kind: action
  command: "PORT 7"
  params: []

- id: port_8_on
  label: Select Output 8
  kind: action
  command: "PORT 8"
  params: []

- id: signal_enhance_on
  label: Enable Signal Enhance
  kind: action
  command: "SIGNAL 1"
  params: []

- id: signal_enhance_off
  label: Disable Signal Enhance
  kind: action
  command: "SIGNAL 0"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWER 1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "POWER 0"
  params: []
```

## Feedbacks
```yaml
- id: command_ack_ok
  type: enum
  values: [ok]
  description: "Reply `OK` (followed by CR) when a legal command is received."

- id: command_ack_ng
  type: enum
  values: [ng]
  description: "Reply `NG` (followed by CR) when an illegal/unrecognised command is received."
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements found in source
```

## Notes
Command format: ASCII text, command code parts separated by SPACE, terminated by CR (carriage return). On CR, the unit replies `OK` for legal commands and `NG` for illegal ones. The splitter exposes a 9-pin D-sub female connector for RS-232. Pinout is a null-modem (crossover) cable: splitter TxD (pin 2) ↔ controller RxD (pin 2), splitter RxD (pin 3) ↔ controller TxD (pin 3), GND (pin 5) ↔ GND (pin 5). The model number "V81" implies an 8-output device; the eight PORT commands are consistent with this, but the input count is not stated in the extracted source.

<!-- UNRESOLVED: device topology (e.g. 1x8 vs 2x8 input count) not stated in source; firmware version not stated; no query/feedback commands documented beyond OK/NG acknowledgement -->
````

Upgrade pass result: source documents exactly 12 commands, all already in spec verbatim. Transport 9600 8N1 matches source exactly. Only delta: filled `entity_id` (was placeholder), added explicit UNRESOLVED markers for empty Variables/Events/Macros sections (template hygiene). No new commands to add — spec was complete.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD-V81.pdf
  - https://atlona.com/pdf/rs232/AT-HD-V81_RS232.xls
retrieved_at: 2026-07-21T22:55:55.808Z
last_checked_at: 2026-07-21T23:10:45.212Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:10:45.212Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions match verbatim in the source command table; transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input count and topology (e.g. 1x8 vs 2x8) not explicitly stated in the extracted source section"
- "no settable parameters documented in source beyond discrete actions"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
- "device topology (e.g. 1x8 vs 2x8 input count) not stated in source; firmware version not stated; no query/feedback commands documented beyond OK/NG acknowledgement"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
