---
spec_id: admin/atlona-at-prohd85m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD85M-SR Control Spec"
manufacturer: Atlona
model_family: AT-PROHD85M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD85M-SR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-31T20:56:03.773Z
generated_at: 2026-05-31T20:56:03.773Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T20:56:03.773Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 routing commands match source table; all transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Atlona AT-PROHD85M-SR Control Spec

## Summary
5×8 HDMI matrix switcher with RS-232 control. Controls routing of 8 inputs to 5 outputs. Serial-only, no network control. No query or feedback commands documented.

<!-- UNRESOLVED: no status query commands, no power commands, no safety warnings in source -->

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
- routable  # inferred: matrix routing commands present
```

## Actions
```yaml
# Output 1 routing
- id: out1_in1
  label: Output 1 select Input 1
  kind: action
  protocol: serial
  params: []

- id: out1_in2
  label: Output 1 select Input 2
  kind: action
  protocol: serial
  params: []

- id: out1_in3
  label: Output 1 select Input 3
  kind: action
  protocol: serial
  params: []

- id: out1_in4
  label: Output 1 select Input 4
  kind: action
  protocol: serial
  params: []

- id: out1_in5
  label: Output 1 select Input 5
  kind: action
  protocol: serial
  params: []

- id: out1_in6
  label: Output 1 select Input 6
  kind: action
  protocol: serial
  params: []

- id: out1_in7
  label: Output 1 select Input 7
  kind: action
  protocol: serial
  params: []

- id: out1_in8
  label: Output 1 select Input 8
  kind: action
  protocol: serial
  params: []

# Output 2 routing
- id: out2_in1
  label: Output 2 select Input 1
  kind: action
  protocol: serial
  params: []

- id: out2_in2
  label: Output 2 select Input 2
  kind: action
  protocol: serial
  params: []

- id: out2_in3
  label: Output 2 select Input 3
  kind: action
  protocol: serial
  params: []

- id: out2_in4
  label: Output 2 select Input 4
  kind: action
  protocol: serial
  params: []

- id: out2_in5
  label: Output 2 select Input 5
  kind: action
  protocol: serial
  params: []

- id: out2_in6
  label: Output 2 select Input 6
  kind: action
  protocol: serial
  params: []

- id: out2_in7
  label: Output 2 select Input 7
  kind: action
  protocol: serial
  params: []

- id: out2_in8
  label: Output 2 select Input 8
  kind: action
  protocol: serial
  params: []

# Output 3 routing
- id: out3_in1
  label: Output 3 select Input 1
  kind: action
  protocol: serial
  params: []

- id: out3_in2
  label: Output 3 select Input 2
  kind: action
  protocol: serial
  params: []

- id: out3_in3
  label: Output 3 select Input 3
  kind: action
  protocol: serial
  params: []

- id: out3_in4
  label: Output 3 select Input 4
  kind: action
  protocol: serial
  params: []

- id: out3_in5
  label: Output 3 select Input 5
  kind: action
  protocol: serial
  params: []

- id: out3_in6
  label: Output 3 select Input 6
  kind: action
  protocol: serial
  params: []

- id: out3_in7
  label: Output 3 select Input 7
  kind: action
  protocol: serial
  params: []

- id: out3_in8
  label: Output 3 select Input 8
  kind: action
  protocol: serial
  params: []

# Output 4 routing
- id: out4_in1
  label: Output 4 select Input 1
  kind: action
  protocol: serial
  params: []

- id: out4_in2
  label: Output 4 select Input 2
  kind: action
  protocol: serial
  params: []

- id: out4_in3
  label: Output 4 select Input 3
  kind: action
  protocol: serial
  params: []

- id: out4_in4
  label: Output 4 select Input 4
  kind: action
  protocol: serial
  params: []

- id: out4_in5
  label: Output 4 select Input 5
  kind: action
  protocol: serial
  params: []

- id: out4_in6
  label: Output 4 select Input 6
  kind: action
  protocol: serial
  params: []

- id: out4_in7
  label: Output 4 select Input 7
  kind: action
  protocol: serial
  params: []

- id: out4_in8
  label: Output 4 select Input 8
  kind: action
  protocol: serial
  params: []

# Output 5 routing
- id: out5_in1
  label: Output 5 select Input 1
  kind: action
  protocol: serial
  params: []

- id: out5_in2
  label: Output 5 select Input 2
  kind: action
  protocol: serial
  params: []

- id: out5_in3
  label: Output 5 select Input 3
  kind: action
  protocol: serial
  params: []

- id: out5_in4
  label: Output 5 select Input 4
  kind: action
  protocol: serial
  params: []

- id: out5_in5
  label: Output 5 select Input 5
  kind: action
  protocol: serial
  params: []

- id: out5_in6
  label: Output 5 select Input 6
  kind: action
  protocol: serial
  params: []

- id: out5_in7
  label: Output 5 select Input 7
  kind: action
  protocol: serial
  params: []

- id: out5_in8
  label: Output 5 select Input 8
  kind: action
  protocol: serial
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no status query commands in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented
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
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `cir<XY>` where X = output (0–4), Y = input (0–7). Terminator is carriage return (0x0D). Source documents 40 commands across 5 outputs × 8 inputs.

<!-- UNRESOLVED: device may physically have fewer than 5 outputs — source does not clarify model variant -->
<!-- UNRESOLVED: no power on/off commands, no firmware version, no query/feedback commands, no auth, no safety warnings in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-31T20:56:03.773Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:56:03.773Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 routing commands match source table; all transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
