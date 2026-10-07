---
spec_id: admin/seura-ent4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura ENT4 Series Control Spec"
manufacturer: Seura
model_family: ENT4-65
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - ENT4-65
    - ENT4-75
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2020/10/RS232Control-ENT4.pdf
retrieved_at: 2026-04-30T04:28:55.975Z
last_checked_at: 2026-09-27T15:00:07.394Z
generated_at: 2026-09-27T15:00:07.394Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP/TCP control not documented in this source; only RS-232 commands documented"
  - "no independent variables documented; all settable params are action-based"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "TCP/IP control protocol not covered in this source document"
verification:
  verdict: verified
  checked_at: 2026-09-27T15:00:07.394Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 serial units and transport values match the ENT4 guide; command framing and input mappings are explicit. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Seura ENT4 Series Control Spec

## Summary
Seura ENT4 Entertainment TV Mirrors (ENT4-65, ENT4-75) support RS-232 serial control. Commands use ASCII text wrapped in 0x02/0x03
envelope bytes. Supported functions include power, input selection, channel, volume,
and mute control.

<!-- UNRESOLVED: IP/TCP control not documented in this source; only RS-232 commands documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # Authentication requirements are not stated in the source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  command: "PWD:0"
  label: Power Off
  kind: action
  params: []
- id: power_on
  command: "PWD:1"
  label: Power On
  kind: action
  params: []
- id: power_toggle
  command: "PWD:3"
  label: Power Toggle
  kind: action
  params: []
- id: power_query
  command: "PWD:?"
  label: Power Query
  kind: action
  params: []
- id: input_select
  command: "INP:"
  wire_template: "INP:{input}"
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      values: [0, 1, 2, 3, 4, 5, 7]
      description: Input number (0=TV, 1=HDMI1, 2=HDMI2, 3=HDMI3, 4=Component, 5=AV, 7=USB Media)
- id: input_query
  command: "INP:?"
  label: Input Query
  kind: action
  params: []
- id: channel_up
  command: "CHA:+"
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  command: "CHA:-"
  label: Channel Down
  kind: action
  params: []
- id: channel_set
  command: "CHA:X.Y"
  wire_template: "CHA:{channel}"
  label: Set Channel
  kind: action
  params:
    - name: channel
      type: string
      description: "X.Y for digital TV, X for analog TV"
- id: channel_query
  command: "CHA:?"
  label: Channel Query
  kind: action
  params: []
- id: volume_up
  command: "VOL:+"
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  command: "VOL:-"
  label: Volume Down
  kind: action
  params: []
- id: volume_set
  command: "VOL:XXX"
  wire_template: "VOL:{level}"
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100
- id: volume_query
  command: "VOL:?"
  label: Volume Query
  kind: action
  params: []
- id: mute_on
  command: "MUT:1"
  label: Mute On
  kind: action
  params: []
- id: mute_off
  command: "MUT:0"
  label: Mute Off
  kind: action
  params: []
- id: mute_toggle
  command: "MUT:3"
  label: Mute Toggle
  kind: action
  params: []
- id: mute_query
  command: "MUT:?"
  label: Mute Query
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
- id: input_state
  label: Input State
  type: enum
  values: [0, 1, 2, 3, 4, 5, 7]
- id: channel_state
  label: Channel State
  type: string
- id: volume_state
  label: Volume State
  type: integer
- id: mute_state
  label: Mute State
  type: enum
  values: [0, 1]
- id: command_ack
  label: Command Acknowledge
  type: enum
  values: [OK]
```

## Variables
```yaml
# UNRESOLVED: no independent variables documented; all settable params are action-based
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command envelope: all commands start with 0x02 and end with 0x03 (hex bytes).
Example: `[0x02]PWD:0[0x03]` → `[0x02]Power(OK)[0x03]`
<!-- UNRESOLVED: TCP/IP control protocol not covered in this source document -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2020/10/RS232Control-ENT4.pdf
retrieved_at: 2026-04-30T04:28:55.975Z
last_checked_at: 2026-09-27T15:00:07.394Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-27T15:00:07.394Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 serial units and transport values match the ENT4 guide; command framing and input mappings are explicit. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP/TCP control not documented in this source; only RS-232 commands documented"
- "no independent variables documented; all settable params are action-based"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures stated in source"
- "TCP/IP control protocol not covered in this source document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
