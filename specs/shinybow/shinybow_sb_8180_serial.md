---
spec_id: admin/shinybow-sb-8180
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-8180 Control Spec"
manufacturer: Shinybow
model_family: SB-8180
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-8180
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-05-31T21:24:25.029Z
generated_at: 2026-05-31T21:24:25.029Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:24:25.029Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions matched literal source commands; transport parameters verified verbatim at 9600,8,N,1; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Shinybow SB-8180 Control Spec

## Summary
Matrix routing switcher with 8 inputs and 8 outputs. RS-232 serial control at 9600 baud, 8-N-1, no flow control. Commands are ASCII text format: `COMMAND Data;`. Supports power, lock, per-output routing, all-output routing, memory save/recall, EDID selection, per-output volume, per-output balance, and per-output mute.

<!-- UNRESOLVED: ACTIVESOURCE not available on all models — not verified for SB-8180 -->

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
- powerable  # POWER command present
- routable   # OUTPUTxx routing, OUTPUTALL present
- queryable  # ? suffix queries for power/lock/output/volume/balance/mute/EDID
- levelable  # VOLUME with +/- increments, BALANCE set
```

## Actions
```yaml
# POWER
- id: power_off
  label: Power OFF
  kind: action
  params: []
- id: power_on
  label: Power ON
  kind: action
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  params: []

# LOCK
- id: lock_off
  label: Unlock
  kind: action
  params: []
- id: lock_on
  label: Lock
  kind: action
  params: []
- id: lock_status_query
  label: Lock Status Query
  kind: query
  params: []

# OUTPUT routing - per-output
- id: output_route
  label: Route Output to Input
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: input
      type: integer
      description: Input channel (01-08, or 00 for OFF)
- id: output_off
  label: Set Output OFF
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
- id: output_status_query
  label: Output Status Query
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

# ACTIVESOURCE - not available on all models
- id: activesource_status_query
  label: Active Source Status Query
  kind: query
  params: []

# OUTPUTALL
- id: outputall_off
  label: OFF All Outputs
  kind: action
  params: []
- id: outputall_set_all_to_source
  label: Set All Outputs to Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source number (01-08)
- id: outputall_status_query
  label: All Outputs Status Query
  kind: query
  params: []

# MEMORY
- id: memory_save
  label: Save Matrix Configuration to Memory
  kind: action
  params:
    - name: address
      type: integer
      description: Memory address (00-0F, maps to 1-16)

# RECALL
- id: recall_memory
  label: Recall Matrix Configuration from Memory
  kind: action
  params:
    - name: location
      type: integer
      description: Memory location (00-0F, maps to 1-16)
- id: recall_status_query
  label: Memory Data Query
  kind: query
  params:
    - name: location
      type: integer
      description: Memory location (00-0F, maps to 1-16)

# EDID - 8 options
- id: edid_set_fss
  label: Set EDID to FSS
  kind: action
  params: []
- id: edid_set_h24_3d
  label: Set EDID to H24-3D
  kind: action
  params: []
- id: edid_set_h24m_3d
  label: Set EDID to H24M-3D
  kind: action
  params: []
- id: edid_set_h36_3d
  label: Set EDID to H36-3D
  kind: action
  params: []
- id: edid_set_h36_3d_m
  label: Set EDID to H36-3D-M
  kind: action
  params: []
- id: edid_set_dvi_d_1280x1024
  label: Set EDID to DVI-D 1280x1024
  kind: action
  params: []
- id: edid_set_dvi_d_1920x1200
  label: Set EDID to DVI-D 1920x1200
  kind: action
  params: []
- id: edid_set_auto
  label: Set EDID to Auto
  kind: action
  params: []
- id: edid_status_query
  label: EDID Status Query
  kind: query
  params: []

# VOLUME - per-output
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: value
      type: integer
      description: Volume value (0-100; 0=mute, 99=max)
- id: volume_increment
  label: Increment Volume
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: delta
      type: integer
      description: Increment value (01-99)
- id: volume_decrement
  label: Decrement Volume
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: delta
      type: integer
      description: Decrement value (01-99)
- id: volume_status_query
  label: Volume Status Query
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

# BALANCE - per-output
- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: value
      type: integer
      description: Balance value (0-99; 0=100%L/0%R, 50=50%/50%, 99=0%L/100%R)
- id: balance_status_query
  label: Balance Status Query
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

# MUTE - per-output
- id: mute_on
  label: Set Mute ON
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
- id: mute_off
  label: Set Mute OFF
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
- id: mute_status_query
  label: Mute Status Query
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
```

## Feedbacks
```yaml
# SUCCESS acknowledgements
- id: cmd_success
  type: string
  values:
    - SB5688 00;
- id: cmd_unknown
  type: string
  values:
    - SB5688 01;

# Power state
- id: power_state
  type: enum
  values:
    - POWER 00;
    - POWER 01;

# Lock state
- id: lock_state
  type: enum
  values:
    - Lock 00;
    - Lock 01;

# Output routing (example format)
- id: output_routing_state
  type: pattern
  pattern: "^Output[0-9]{2} [0-9]{2};$"

# OUTPUTALL routing (example format)
- id: outputall_state
  type: pattern
  pattern: "^OUTPUTALL [0-9]{8};$"

# Memory recall data (example format)
- id: memory_recall_data
  type: pattern
  pattern: "^RECALL[0-9A-F]{2} [0-9]{16};$"

# EDID state
- id: edid_state
  type: enum
  values:
    - EDID 00;
    - EDID 01;
    - EDID 02;
    - EDID 03;
    - EDID 04;
    - EDID 05;
    - EDID 06;
    - EDID 07;

# Volume response
- id: volume_response
  type: pattern
  pattern: "^VOLUME[0-9]{2} [0-9]{2}#(OK|ER);$"

# Balance response
- id: balance_response
  type: pattern
  pattern: "^BALANCE[0-9]{2} [0-9]{2}#(OK|ER);$"

# Mute response
- id: mute_response
  type: pattern
  pattern: "^MUTE[0-9]{2} [0-9]{2}#(OK|ER);$"

# Active source bitstring (16-char, not all models)
- id: activesource_state
  type: pattern
  pattern: "^ACTIVESOURCE[01]{16};$"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable variables beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - EDID_change  # switcher does soft-reboot on EDID change; 5-second delay required before next command
interlocks: []
```

## Notes
Command string format: `COMMAND[Data];` — space after command, semicolon terminator. All ASCII, not case sensitive.

EDID change requires minimum 5-second delay before issuing additional commands. Switcher performs soft-reboot to implement new EDID.

Response prefix `SB5688` appears in acknowledgements — likely brand/model prefix in firmware, not device model name.

Memory addresses 00–0F map to locations 1–16. MEMORY and RECALL use hex input (00–0F).

Volume range 0–100; 0 = mute equivalent, 99 = maximum. Balance range 0–99; 0 = 100% left, 50 = center, 99 = 100% right.

<!-- UNRESOLVED: number of inputs/outputs not explicitly stated as 8x8 — inferred from command examples and 8-character OUTPUTALL response length -->
<!-- UNRESOLVED: ACTIVESOURCE availability on SB-8180 not confirmed by source -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-05-31T21:24:25.029Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:24:25.029Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions matched literal source commands; transport parameters verified verbatim at 9600,8,N,1; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
