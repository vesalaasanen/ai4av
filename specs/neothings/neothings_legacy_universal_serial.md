---
spec_id: admin/neothings-legacy-universal
schema_version: ai4av-public-spec-v1
revision: 1
title: "Neothings Legacy Universal Control Spec"
manufacturer: Neothings
model_family: "Legacy Universal"
aliases: []
compatible_with:
  manufacturers:
    - Neothings
  models:
    - "Legacy Universal"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
retrieved_at: 2026-05-21T14:57:53.170Z
last_checked_at: 2026-10-07T17:16:18.182Z
generated_at: 2026-10-07T17:16:18.182Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model name \"Legacy Universal\" not stated in source; source covers general Neothings/NeoPro serial protocol family."
  - "no discrete settable parameters found beyond routing commands"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "The source's power-state query command and response are left blank."
  - "The source states that Hawthorne query `[?S]` returns setup parameters but does not provide the parameters or response format."
  - "Specific protocol-to-model mapping is not stated in the source."
  - "The exact applicability of this protocol guide to the named `Legacy Universal` model is not established by the source."
verification:
  verdict: verified
  checked_at: 2026-10-07T17:16:18.182Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 action units map to documented bracket commands, the serial settings match, and the source catalogue is fully represented. Applicability to the model is generic. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Neothings Legacy Universal Control Spec

## Summary
Serial control protocols for Neothings/NeoPro products over USB or RS-232. Both ports use 9600 baud, 8 data bits, no parity, 1 stop bit, and no flow control. Commands use case-sensitive ASCII text in square brackets; the closing bracket triggers processing. The guide documents ten protocol families. Specific model applicability remains unresolved.

<!-- UNRESOLVED: specific model name "Legacy Universal" not stated in source; source covers general Neothings/NeoPro serial protocol family. -->

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
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
- routable
- queryable
```

## Actions
```yaml
- id: route_avalon
  label: Route Avalon Matrix
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2]
      description: Board number - B0=virtual all, B1=component video, B2=digital audio
    - name: board_type
      type: enum
      values: ["00", "C4", "C8", "B4", "B8"]
      description: Board type - 00=virtual, C4=8x4 component video, C8=8x8 component video, B4=8x4 digital audio, B8=8x8 digital audio
    - name: input
      type: integer
      description: Input number - 0=mute, 1-8=source input; command form [Bx,Xx,X,Y]
    - name: output
      type: integer
      description: Output number 1-8, up to the model's maximum

- id: route_borrego
  label: Route Borrego Matrix
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2, B3]
      description: Board - B0=virtual all, B1=component video, B2=analog audio, B3=composite video or SPDIF
    - name: board_type
      type: enum
      values: ["00", "C4", "C8", "B4", "B8", "A4", "A8"]
      description: Board type - 00=virtual, C4/C8=component video, B4/B8=analog audio, A4/A8=composite video or SPDIF
    - name: input
      type: integer
      description: Input number - 0=mute, 1-8=source input; command form [Bx,Xx,X,Y]
    - name: output
      type: integer
      description: Output number 1-8, up to the model's maximum

- id: route_concord
  label: Route Concord Matrix
  kind: action
  params:
    - name: board
      type: enum
      values: [B0, B1, B2, B3]
      description: Board - B0=virtual all, B1=component video, B2=analog audio, B3=digital audio or composite video
    - name: input
      type: integer
      description: Input number - 0=mute, 1-8=source input; command form [Bx,X,Y]
    - name: output
      type: integer
      description: Output number 1-8, up to the model's maximum

- id: route_delano
  label: Route Delano Video
  kind: action
  params:
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [DV,XX,YY]
    - name: output
      type: string
      description: Two-character output; range 01-16 is shown by the full-state query example

- id: route_eureka
  label: Route Eureka Audio
  kind: action
  params:
    - name: matrix_type
      type: enum
      values: [ED, EA, E0]
      description: ED=digital audio, EA=analog audio, E0=both
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [EX,XX,YY]
    - name: output
      type: string
      description: Two-character output; range 01-16 is shown by the full-state query example

- id: route_fallbrook
  label: Route Fallbrook Video
  kind: action
  params:
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [FV,XX,YY]
    - name: output
      type: string
      description: Two-character output; range 01-16 is shown by the full-state query example

- id: route_gillespie
  label: Route Gillespie Audio
  kind: action
  params:
    - name: matrix_type
      type: enum
      values: [GD, GA, G0]
      description: GD=digital audio, GA=analog audio, G0=both
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [GX,XX,YY]
    - name: output
      type: string
      description: Two-character output; range 01-16 is shown by the full-state query example

- id: route_hawthorne
  label: Route Hawthorne Video
  kind: action
  params:
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [HV,XX,YY]
    - name: output
      type: string
      description: Two-character output; valid range unresolved because the source gives conflicting output ranges

- id: route_imperial
  label: Route Imperial Video
  kind: action
  params:
    - name: input
      type: string
      description: Two-character input; 00=mute; valid source-input range not stated; command form [IV,XX,YY]
    - name: output
      type: string
      description: Two-character output; valid range not stated

- id: route_juneau
  label: Route Juneau Video
  kind: action
  params:
    - name: input
      type: string
      description: Two-character input; 00=mute; source input encoding is unresolved because the source gives conflicting ranges; command form [JV,XX,YY]
    - name: output
      type: string
      description: Two-character output; range 01-16 is shown by the full-state query example

- id: mute
  label: Mute Output
  kind: action
  params:
    - name: protocol
      type: enum
      values: [avalon, borrego, concord, delano, eureka, fallbrook, gillespie, hawthorne, imperial, juneau]
      description: Selects the documented protocol family
    - name: output
      type: integer
      description: Output number to mute by routing input 0 using the selected protocol's command format; valid range depends on the protocol and model

- id: setup_command_p_1
  label: Setup Command [P,1]
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: routing_confirmation
  type: string
  description: Routing command response is the same command, e.g. [B1,C4,3,1] for Avalon; response format depends on protocol

- id: matrix_state_query
  type: string
  description: Query with [?B0], [?B1], [?B2], or [?B3] for Avalon/Borrego/Concord; [?D], [?E], [?F], [?G], [?H], [?I], or [?J] for Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, or Juneau respectively. Returns the queried matrix state; response format depends on protocol
  query_command: ["[?B0]", "[?B1]", "[?B2]", "[?B3]", "[?D]", "[?E]", "[?F]", "[?G]", "[?H]", "[?I]", "[?J]"]

- id: error_response
  type: enum
  values: ["[E]"]
  description: Syntax error response

- id: version_response
  type: string
  description: Query with [?V]; response contains product ID and firmware version, e.g. [V,A12] for Avalon
  query_command: "[?V]"

- id: setup_parameters_response
  type: string
  description: Query returns all setup parameters; response format is not stated in the source
  query_command: "[?S]"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found beyond routing commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are case-sensitive ASCII text wrapped in square brackets `[...]`; spaces are not allowed inside commands.
- No carriage return or line feed is required; the closing bracket triggers processing.
- Maximum response time: 150mS.
- Wait 150ms between sequential commands when sending multiple commands.
- The serial port does not echo characters.
- Routing commands are stored in backup memory and survive a power outage.
- Source documents ten protocol families (Avalon, Borrego, Concord, Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, Juneau); a device may implement one or more depending on model.
- USB and RS-232 use the same command and response protocols and serial settings. The guide does not describe a TCP/IP variant.
- UNRESOLVED: The source's power-state query command and response are left blank.
- UNRESOLVED: The source states that Hawthorne query `[?S]` returns setup parameters but does not provide the parameters or response format.
- UNRESOLVED: Specific protocol-to-model mapping is not stated in the source.
- UNRESOLVED: The exact applicability of this protocol guide to the named `Legacy Universal` model is not established by the source.

## Provenance

```yaml
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
retrieved_at: 2026-05-21T14:57:53.170Z
last_checked_at: 2026-10-07T17:16:18.182Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:16:18.182Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 action units map to documented bracket commands, the serial settings match, and the source catalogue is fully represented. Applicability to the model is generic. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model name \"Legacy Universal\" not stated in source; source covers general Neothings/NeoPro serial protocol family."
- "no discrete settable parameters found beyond routing commands"
- "no unsolicited event notifications described in source"
- "no explicit multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "The source's power-state query command and response are left blank."
- "The source states that Hawthorne query `[?S]` returns setup parameters but does not provide the parameters or response format."
- "Specific protocol-to-model mapping is not stated in the source."
- "The exact applicability of this protocol guide to the named `Legacy Universal` model is not established by the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
