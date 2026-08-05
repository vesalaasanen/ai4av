---
spec_id: admin/kmtronic-r2s8cr
schema_version: ai4av-public-spec-v1
revision: 1
title: "KMTRONIC R2S8CR Control Spec"
manufacturer: KMTronic
model_family: R2S8CR
aliases: []
compatible_with:
  manufacturers:
    - KMTronic
    - "KMTRONIC LTD"
  models:
    - R2S8CR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kmtronic.com
  - info.kmtronic.com
  - scribd.com
  - github.com
  - manualslib.com
source_urls:
  - https://kmtronic.com/userfiles/product_files_shared/R2S8CR_RS232_EIGHT_CHANNEL_RELAY.pdf
  - https://info.kmtronic.com/manuals/user_manuals/R2S8CR_RS232_EIGHT_CHANNEL_RELAY.pdf
  - https://www.scribd.com/document/228948038/Kmtronic-8-Relay-Rs232-Manual
  - https://github.com/jvengin/homeassistantcore_KMTronicUdp
  - https://www.manualslib.com/brand/kmtronic/
retrieved_at: 2026-07-22T06:25:13.763Z
last_checked_at: 2026-07-22T07:41:59.978Z
generated_at: 2026-07-22T07:41:59.978Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "UD8CR variant mentioned in entity_id but no documentation provided for it; spec covers R2S8CR only."
  - "no named settable parameters beyond the relay mask action above."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "UD8CR variant named in entity_id has no documentation; spec covers R2S8CR only. Firmware version compatibility not stated. No checksum, terminator, or inter-frame delay documented."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:41:59.978Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions match literally in source; transport parameters verified; perfect one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# KMTRONIC R2S8CR Control Spec

## Summary
KMTronic R2S8CR is an 8-channel RS-232 relay controller. This spec covers its serial command set for turning relays on/off individually or as a group and querying relay state.

<!-- UNRESOLVED: UD8CR variant mentioned in entity_id but no documentation provided for it; spec covers R2S8CR only. -->

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
- queryable  # inferred from status request command (FF 09 00)
```

## Actions
```yaml
- id: relay_1_on
  label: Turn ON Relay 1
  kind: action
  command: "FF 01 01"
  params: []

- id: relay_2_on
  label: Turn ON Relay 2
  kind: action
  command: "FF 02 01"
  params: []

- id: relay_3_on
  label: Turn ON Relay 3
  kind: action
  command: "FF 03 01"
  params: []

- id: relay_4_on
  label: Turn ON Relay 4
  kind: action
  command: "FF 04 01"
  params: []

- id: relay_5_on
  label: Turn ON Relay 5
  kind: action
  command: "FF 05 01"
  params: []

- id: relay_6_on
  label: Turn ON Relay 6
  kind: action
  command: "FF 06 01"
  params: []

- id: relay_7_on
  label: Turn ON Relay 7
  kind: action
  command: "FF 07 01"
  params: []

- id: relay_8_on
  label: Turn ON Relay 8
  kind: action
  command: "FF 08 01"
  params: []

- id: relay_1_off
  label: Turn OFF Relay 1
  kind: action
  command: "FF 01 00"
  params: []

- id: relay_2_off
  label: Turn OFF Relay 2
  kind: action
  command: "FF 02 00"
  params: []

- id: relay_3_off
  label: Turn OFF Relay 3
  kind: action
  command: "FF 03 00"
  params: []

- id: relay_4_off
  label: Turn OFF Relay 4
  kind: action
  command: "FF 04 00"
  params: []

- id: relay_5_off
  label: Turn OFF Relay 5
  kind: action
  command: "FF 05 00"
  params: []

- id: relay_6_off
  label: Turn OFF Relay 6
  kind: action
  command: "FF 06 00"
  params: []

- id: relay_7_off
  label: Turn OFF Relay 7
  kind: action
  command: "FF 07 00"
  params: []

- id: relay_8_off
  label: Turn OFF Relay 8
  kind: action
  command: "FF 08 00"
  params: []

- id: status_request
  label: Status Request
  kind: query
  command: "FF 09 00"
  params: []

- id: set_relays_mask
  label: Set All Relays by Mask
  kind: action
  command: "FF 0A {mask}"
  params:
    - name: mask
      type: string
      description: 8-bit hex mask, one bit per relay (LSB = relay 1). e.g. FF=all on, 00=all off, 10=relay 5 on only.
```

## Feedbacks
```yaml
- id: relay_states
  type: bytes
  description: 8-byte reply to status request. Each byte = one relay state (01=ON, 00=OFF). Byte order: relay 1 first.
```

## Variables
```yaml
# UNRESOLVED: no named settable parameters beyond the relay mask action above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Commands are 3-byte HEX frames transmitted over RS-232 at 9600/8/N/1. No checksum is documented in the source; frames are sent as-is. The status request returns 8 bytes, one per relay, with byte position N corresponding to relay N+1 (relay 1 = first byte).

<!-- UNRESOLVED: UD8CR variant named in entity_id has no documentation; spec covers R2S8CR only. Firmware version compatibility not stated. No checksum, terminator, or inter-frame delay documented. -->

## Provenance

```yaml
source_domains:
  - kmtronic.com
  - info.kmtronic.com
  - scribd.com
  - github.com
  - manualslib.com
source_urls:
  - https://kmtronic.com/userfiles/product_files_shared/R2S8CR_RS232_EIGHT_CHANNEL_RELAY.pdf
  - https://info.kmtronic.com/manuals/user_manuals/R2S8CR_RS232_EIGHT_CHANNEL_RELAY.pdf
  - https://www.scribd.com/document/228948038/Kmtronic-8-Relay-Rs232-Manual
  - https://github.com/jvengin/homeassistantcore_KMTronicUdp
  - https://www.manualslib.com/brand/kmtronic/
retrieved_at: 2026-07-22T06:25:13.763Z
last_checked_at: 2026-07-22T07:41:59.978Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:41:59.978Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions match literally in source; transport parameters verified; perfect one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "UD8CR variant mentioned in entity_id but no documentation provided for it; spec covers R2S8CR only."
- "no named settable parameters beyond the relay mask action above."
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "UD8CR variant named in entity_id has no documentation; spec covers R2S8CR only. Firmware version compatibility not stated. No checksum, terminator, or inter-frame delay documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
