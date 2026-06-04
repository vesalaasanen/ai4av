---
spec_id: admin/sony-str-dn1050
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony STR-DN1050 Control Spec"
manufacturer: Sony
model_family: STR-DN1050
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - STR-DN1050
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pdf.textfiles.com
  - manualsdump.com
source_urls:
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/Sony%20Consumer/Manual/-%20Receiver%20-%20Protocol.pdf"
  - https://manualsdump.com/en/manuals/sony-rs-232c/218983/1
retrieved_at: 2026-06-01T07:05:19.690Z
last_checked_at: 2026-06-04T06:30:22.505Z
generated_at: 2026-06-04T06:30:22.505Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone variable parameters identified in source"
  - "source states amplifier never sends unsolicited messages"
  - "no multi-step sequences documented"
  - "input numbers, volume range, trigger modes, sound function modes, tuner bands, and preset banks not enumerated in source"
  - "response data field structure (which bits map to which status indicators) not detailed"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:30:22.505Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched to source commands with correct opcodes and parameters; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Sony STR-DN1050 Control Spec

## Summary
Sony STR-DN1050 AV receiver. RS-232C control protocol. Host controller sends commands; amplifier returns ACK/NACK or response data. Only power-on and status commands accepted when unit is powered off.

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
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: power_set
  label: Power Set
  kind: action
  params: []

- id: input_select
  label: Input Select
  kind: action
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  params: []

- id: mute_set
  label: Mute Set
  kind: action
  params: []

- id: trigger_12v
  label: 12V Trigger
  kind: action
  params: []

- id: sf_select
  label: Sound Function Select
  kind: action
  params: []

- id: preset_select
  label: Preset Select
  kind: action
  params: []

- id: status_req
  label: Status Request
  kind: query
  params: []

- id: volume_status_req
  label: Volume Status Request
  kind: query
  params: []

- id: sf_status_req
  label: Sound Function Status Request
  kind: query
  params: []

- id: preset_data_req
  label: Preset Data Request
  kind: query
  params: []

- id: preset_name_req
  label: Preset Name Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: ACK
  type: integer
  values:
    - 0xFD

- id: nack
  label: NACK
  type: integer
  values:
    - 0xFE

- id: no_executable
  label: No-Executable
  description: Command understood but cannot execute
  type: integer
  values:
    - 0x0E

- id: no_function
  label: No-Function
  description: Command not recognized
  type: integer
  values:
    - 0x0F

- id: status_data
  label: Status Data
  type: integer
  values: []

- id: volume_status_data
  label: Volume Status Data
  type: integer
  values: []

- id: sf_status_data
  label: Sound Function Status Data
  type: integer
  values: []

- id: preset_data
  label: Preset Data
  type: integer
  values: []

- id: preset_name_data
  label: Preset Name Data
  type: integer
  values: []
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters identified in source
```

## Events
```yaml
# UNRESOLVED: source states amplifier never sends unsolicited messages
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When powered off, only Power ON and Status Request commands accepted. All other commands return NACK.
  - Host must wait for reply before transmitting next command.
  - Host must not exceed 10ms inter-byte interval when sending.
  - Amplifier must respond within 500ms.
```

## Notes
Data format: STX + BC + PDC + CMD + Data1...DataN + CS. BC = byte count from PDC through CS. CS = lower 8 bits of sum from BC through CS set to 0. Commands 0x00-0x7F return single-byte ACK (0xFD) or NACK (0xFE). Commands 0x80+ return full protocol response.

<!-- UNRESOLVED: input numbers, volume range, trigger modes, sound function modes, tuner bands, and preset banks not enumerated in source -->
<!-- UNRESOLVED: response data field structure (which bits map to which status indicators) not detailed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - pdf.textfiles.com
  - manualsdump.com
source_urls:
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/Sony%20Consumer/Manual/-%20Receiver%20-%20Protocol.pdf"
  - https://manualsdump.com/en/manuals/sony-rs-232c/218983/1
retrieved_at: 2026-06-01T07:05:19.690Z
last_checked_at: 2026-06-04T06:30:22.505Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:30:22.505Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched to source commands with correct opcodes and parameters; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone variable parameters identified in source"
- "source states amplifier never sends unsolicited messages"
- "no multi-step sequences documented"
- "input numbers, volume range, trigger modes, sound function modes, tuner bands, and preset banks not enumerated in source"
- "response data field structure (which bits map to which status indicators) not detailed"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
