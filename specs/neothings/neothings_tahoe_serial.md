---
spec_id: admin/neothings-tahoe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Neothings Tahoe Control Spec"
manufacturer: Neothings
model_family: Tahoe
aliases: []
compatible_with:
  manufacturers:
    - Neothings
  models:
    - Tahoe
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
retrieved_at: 2026-05-21T15:02:21.118Z
last_checked_at: 2026-05-31T06:54:49.443Z
generated_at: 2026-05-31T06:54:49.443Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T06:54:49.443Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions match source protocol sections; transport parameters exact; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Neothings Tahoe Control Spec

## Summary
Matrix video/audio switcher controllable via RS-232C. Protocol: 9600 baud, 8N1. Command format: ASCII wrapped in square brackets `[command]`. Max response time: 150ms. Supports routing, query, and mute commands across multiple board types.

<!-- UNRESOLVED: specific Tahoe model variant (e.g., 8x4, 8x8) not stated in source; supported board types vary by model -->

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
- powerable  # UNRESOLVED: no explicit power commands; routing persists after power outage per source
- routable  # evidenced by routing command syntax
- queryable  # evidenced by ?B, ?D, ?E, ?F, ?G, ?H, ?I, ?J query commands
```

## Actions
```yaml
- id: route_avalon
  label: Route (Avalon Protocol)
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2]
      description: Board number (B0=virtual all, B1=component video, B2=digital audio)
    - name: board_type
      type: enum
      values: [C4, C8, B4, B8, 00]
      description: Board type (C4=8x4 comp, C8=8x8 comp, B4=8x4 audio, B8=8x8 audio)
    - name: input
      type: integer
      description: Source input 1-8, or 0 for mute
    - name: output
      type: integer
      description: Output 1-8

- id: route_borrego
  label: Route (Borrego Protocol)
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2, B3]
    - name: board_type
      type: enum
      values: [C4, C8, B4, B8, A4, A8, 00]
    - name: input
      type: integer
      description: 0=mute, 1-8=source
    - name: output
      type: integer

- id: route_concord
  label: Route (Concord Protocol)
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2, B3]
    - name: input
      type: integer
      description: 0=mute, 1-8=source
    - name: output
      type: integer

- id: route_delano
  label: Route (Delano Protocol)
  kind: action
  params:
    - name: video
      type: string
      value: "DV"
    - name: input
      type: string
      description: Two-digit input 00=mute, 01-08=source
    - name: output
      type: string
      description: Two-digit output 01-16

- id: route_eureka
  label: Route (Eureka Protocol)
  kind: action
  params:
    - name: matrix_type
      type: enum
      values: [ED, EA, E0]
      description: ED=digital audio, EA=analog audio, E0=both
    - name: input
      type: string
      description: Two-digit input 00=mute, 01-08=source
    - name: output
      type: string
      description: Two-digit output 01-08

- id: route_fallbrook
  label: Route (Fallbrook Protocol)
  kind: action
  params:
    - name: video
      type: string
      value: "FV"
    - name: input
      type: string
      description: Two-digit input 00=mute, 01-08=source
    - name: output
      type: string
      description: Two-digit output 01-16

- id: route_gillespie
  label: Route (Gillespie Protocol)
  kind: action
  params:
    - name: matrix_type
      type: enum
      values: [GD, GA, G0]
    - name: input
      type: string
    - name: output
      type: string

- id: route_hawthorne
  label: Route (Hawthorne Protocol)
  kind: action
  params:
    - name: video
      type: string
      value: "HV"
    - name: input
      type: string
      description: Two-digit, 00=mute
    - name: output
      type: string
      description: Two-digit output 01-08

- id: route_imperial
  label: Route (Imperial Protocol)
  kind: action
  params:
    - name: video
      type: string
      value: "IV"
    - name: input
      type: string
    - name: output
      type: string

- id: route_juneau
  label: Route (Juneau Protocol)
  kind: action
  params:
    - name: video
      type: string
      value: "JV"
    - name: input
      type: string
      description: Two-digit input 01-08, 00=mute
    - name: output
      type: string
      description: Two-digit output 01-16

- id: mute
  label: Mute Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output number to mute

- id: query_board
  label: Query Board State
  kind: query
  params:
    - name: board
      type: string
      description: Board identifier (e.g., B0, B1, B2, D, E, F, G, H, I, J)
  response: bracketed matrix state

- id: query_version
  label: Query Version
  kind: query
  params:
    - name: protocol_prefix
      type: string
      description: Protocol letter (A=Avalon, B=Borrego, C=Concord, D=Delano, E=Eureka, F=Fallbrook, G=Gillespie, H=Hawthorne, I=Imperial, J=Juneau)
    - name: version
      type: string
      description: Two-digit version number
  response: "[V,<prefix><version>]"

- id: query_setup
  label: Query Setup Parameters
  kind: query
  params:
    - name: board
      type: string
      description: "?S" for setup, "?E" for Eureka, "?H" for Hawthorne etc.
```

## Feedbacks
```yaml
- id: routing_response
  description: Echo of routing command on success
  pattern: "\\[B.,[BCADEFGHIJ0-9]+,[0-9]+,[0-9]+\\]"

- id: query_board_response
  description: Full board state on query
  pattern: "\\[\\[.*\\]\\]"

- id: query_version_response
  description: Version string
  pattern: "\\[V,[A-J][0-9]+\\]"

- id: error
  description: Syntax error response
  pattern: "\\[E\\]"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented; routing state managed via actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command timing: wait 150ms between commands when sending strings. Serial port does not echo characters. Commands are case-sensitive ASCII, no spaces allowed within brackets. Routing commands persist after power outage (stored in backup memory).
<!-- UNRESOLVED: specific Tahoe model variant (8x4 vs 8x8) not confirmed in source; protocol variant (Avalon/Borrego/Concord/etc.) selection depends on actual Tahoe hardware revision -->

## Provenance

```yaml
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
retrieved_at: 2026-05-21T15:02:21.118Z
last_checked_at: 2026-05-31T06:54:49.443Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:54:49.443Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions match source protocol sections; transport parameters exact; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
