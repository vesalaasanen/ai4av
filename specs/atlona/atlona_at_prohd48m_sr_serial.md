---
spec_id: admin/atlona-at-prohd48m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD48M-SR Control Spec"
manufacturer: Atlona
model_family: AT-PROHD48M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD48M-SR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PROHD48M-SR_manual.pdf
  - https://atlona.com/pdf/rs232/AT-PROHD48M-SR_RS232.xls
retrieved_at: 2026-05-27T13:14:53.917Z
last_checked_at: 2026-10-07T13:02:25.397Z
generated_at: 2026-10-07T13:02:25.397Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not documented in source"
  - "no TCP control port is stated in source"
  - "response format or query commands not documented in source"
  - "no settable parameters documented"
  - "unsolicited notifications not documented in source"
  - "multi-step sequences not documented in source"
  - "safety warnings or interlock procedures not present in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:02:25.397Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 actions map to the 48 RS-232 rows (8 outputs x prev/next/4 inputs) and the transport values match; the prev/next and select-input ids are each duplicated by a _command id. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Atlona AT-PROHD48M-SR Control Spec

## Summary
The source documents RS-232 control for 8 outputs, with previous/next input cycling and direct selection of inputs 1-4 for each output. LAN control uses the NETCTL application and a web interface; the documented default web password is `000000000`.

<!-- UNRESOLVED: power on/off commands not documented in source -->

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
addressing:
  port: null  # UNRESOLVED: no TCP control port is stated in source
auth:
  type: password
  password: "000000000"  # documented default web-interface password
```

## Traits
```yaml
- routable  # inferred: per-output input selection commands are documented
```

## Actions
```yaml
- id: output1_select_input_prev
  label: Output 1 Select Previous Input
  kind: action
  params: []

- id: output1_select_input_next
  label: Output 1 Select Next Input
  kind: action
  params: []

- id: output1_select_input
  label: Output 1 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output2_select_input_prev
  label: Output 2 Select Previous Input
  kind: action
  params: []

- id: output2_select_input_next
  label: Output 2 Select Next Input
  kind: action
  params: []

- id: output2_select_input
  label: Output 2 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output3_select_input_prev
  label: Output 3 Select Previous Input
  kind: action
  params: []

- id: output3_select_input_next
  label: Output 3 Select Next Input
  kind: action
  params: []

- id: output3_select_input
  label: Output 3 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output4_select_input_prev
  label: Output 4 Select Previous Input
  kind: action
  params: []

- id: output4_select_input_next
  label: Output 4 Select Next Input
  kind: action
  params: []

- id: output4_select_input
  label: Output 4 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output5_select_input_prev
  label: Output 5 Select Previous Input
  kind: action
  params: []

- id: output5_select_input_next
  label: Output 5 Select Next Input
  kind: action
  params: []

- id: output5_select_input
  label: Output 5 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output6_select_input_prev
  label: Output 6 Select Previous Input
  kind: action
  params: []

- id: output6_select_input_next
  label: Output 6 Select Next Input
  kind: action
  params: []

- id: output6_select_input
  label: Output 6 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output7_select_input_prev
  label: Output 7 Select Previous Input
  kind: action
  params: []

- id: output7_select_input_next
  label: Output 7 Select Next Input
  kind: action
  params: []

- id: output7_select_input
  label: Output 7 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output8_select_input_prev
  label: Output 8 Select Previous Input
  kind: action
  params: []

- id: output8_select_input_next
  label: Output 8 Select Next Input
  kind: action
  params: []

- id: output8_select_input
  label: Output 8 Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: output1_select_input_command
  label: Output 1 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 09; Input2: cir 1D; Input3: cir 1F; Input4: cir 0D"

- id: output2_select_input_command
  label: Output 2 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 19; Input2: cir 1B; Input3: cir 11; Input4: cir 15"

- id: output3_select_input_command
  label: Output 3 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 17; Input2: cir 12; Input3: cir 59; Input4: cir 08"

- id: output4_select_input_command
  label: Output 4 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 50; Input2: cir 55; Input3: cir 48; Input4: cir 4A"

- id: output5_select_input_command
  label: Output 5 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 5E; Input2: cir 06; Input3: cir 05; Input4: cir 03"

- id: output6_select_input_command
  label: Output 6 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 47; Input2: cir 07; Input3: cir 40; Input4: cir 02"

- id: output7_select_input_command
  label: Output 7 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 18; Input2: cir 44; Input3: cir 0F; Input4: cir 51"

- id: output8_select_input_command
  label: Output 8 Select Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "Input1: cir 0A; Input2: cir 1E; Input3: cir 0E; Input4: cir 1A"

- id: output1_select_input_prev_command
  label: Output 1 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 61"

- id: output1_select_input_next_command
  label: Output 1 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 60"

- id: output2_select_input_prev_command
  label: Output 2 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 63"

- id: output2_select_input_next_command
  label: Output 2 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 62"

- id: output3_select_input_prev_command
  label: Output 3 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 65"

- id: output3_select_input_next_command
  label: Output 3 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 64"

- id: output4_select_input_prev_command
  label: Output 4 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 67"

- id: output4_select_input_next_command
  label: Output 4 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 66"

- id: output5_select_input_prev_command
  label: Output 5 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 69"

- id: output5_select_input_next_command
  label: Output 5 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 68"

- id: output6_select_input_prev_command
  label: Output 6 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 6B"

- id: output6_select_input_next_command
  label: Output 6 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 6A"

- id: output7_select_input_prev_command
  label: Output 7 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 6D"

- id: output7_select_input_next_command
  label: Output 7 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 6C"

- id: output8_select_input_prev_command
  label: Output 8 Select Previous Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "< cir 6F"

- id: output8_select_input_next_command
  label: Output 8 Select Next Input Command
  kind: action
  params:
    - name: command
      type: string
      description: "> cir 6E"
```

## Feedbacks
```yaml
# UNRESOLVED: response format or query commands not documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not present in source
```

## Notes
The RS-232 wiring shown in the source connects controller Tx (pin 2) to Rx, Rx (pin 3) to Tx, and GND (pin 5) to GND. The source identifies carriage return as the command terminator. NETCTL discovers connected devices and displays their IP addresses; its Read Device function displays the device name. Opening a device launches the web login page, whose documented default password is `000000000`. The LAN instructions describe NETCTL and web-interface operation but do not specify a TCP control port.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PROHD48M-SR_manual.pdf
  - https://atlona.com/pdf/rs232/AT-PROHD48M-SR_RS232.xls
retrieved_at: 2026-05-27T13:14:53.917Z
last_checked_at: 2026-10-07T13:02:25.397Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:02:25.397Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 actions map to the 48 RS-232 rows (8 outputs x prev/next/4 inputs) and the transport values match; the prev/next and select-input ids are each duplicated by a _command id. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not documented in source"
- "no TCP control port is stated in source"
- "response format or query commands not documented in source"
- "no settable parameters documented"
- "unsolicited notifications not documented in source"
- "multi-step sequences not documented in source"
- "safety warnings or interlock procedures not present in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
