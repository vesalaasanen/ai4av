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
  - drivers.control4.com
  - manualslib.com
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
  - https://drivers.control4.com/avswitch_232_neothings_Tahoe_v23_enc.c4i
  - https://neoprointegrator.us/wp-content/uploads/2024/01/NeoPro-Tahoe-UserGuide.pdf
  - https://www.manualslib.com/manual/4219559/Neopro-Tahoe-Veo.html
retrieved_at: 2026-05-21T15:02:21.118Z
last_checked_at: 2026-06-02T17:23:35.982Z
generated_at: 2026-06-02T17:23:35.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers the broader Neothings/NeoPro family (protocols named Avalon, Borrego, Concord, Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, Juneau). The Tahoe-specific protocol variant is not named in the source."
  - "the source describes a family of protocol variants (Avalon, Borrego,"
  - "per-protocol route command shape is variant-specific. The source"
  - "device-driven state-change notifications (unsolicited messages)"
  - "persistent setup parameters exist (the source mentions a `[?S]"
  - "the source does not describe any unsolicited device-to-host"
  - "the source mentions a \"virtual board\" (B0) concept for"
  - "the source contains no safety warnings, interlock procedures,"
  - "firmware version compatibility, voltage/current draw, fault behavior, and error-recovery sequences are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:35.982Z
  matched_actions: 2
  action_count: 2
  confidence: medium
  summary: "Both spec actions (command envelope and version query) are documented verbatim in source; transport parameters match exactly. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Neothings Tahoe Control Spec

## Summary
RS-232 serial control for the Neothings Tahoe matrix switch. Commands are human-readable ASCII wrapped in square brackets, terminated by the closing bracket (no CR/LF required). The Tahoe is part of the Neothings product family, and the source document describes the family-level serial protocol; the specific protocol variant for Tahoe is not identified in the source.

<!-- UNRESOLVED: source covers the broader Neothings/NeoPro family (protocols named Avalon, Borrego, Concord, Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, Juneau). The Tahoe-specific protocol variant is not named in the source. -->

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

**RS-232 pinout (from source):**
- Pin 2: Transmit (data out of unit)
- Pin 3: Receive (data into unit)
- Pin 5: Ground
- Pin 1: for reference only

The matrix is also controllable via USB COM port with identical settings (9600 8N1, no flow control). Per the source, the control system does not distinguish between USB and RS-232 ports.

## Traits
```yaml
- routable   # inferred from per-input/per-output routing command examples
- queryable  # inferred from [?Bx]-style state query examples
```

## Actions
```yaml
# UNRESOLVED: the source describes a family of protocol variants (Avalon, Borrego,
# Concord, Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, Juneau).
# The Tahoe's specific protocol variant is not identified in the source, so the
# routing opcodes below cannot be populated without fabrication. Only the
# cross-protocol envelope and version query pattern are common to every variant
# in the family and are listed verbatim.

- id: send_command_envelope
  label: Send bracketed command
  kind: action
  command: "[{payload}]"
  params:
    - name: payload
      type: string
      description: Protocol-specific command body. The closing `]` triggers processing; no CR/LF required. All commands are case sensitive; spaces are not allowed between the brackets.
  notes: |
    Maximum processing time before response: 150 ms. The serial port does NOT
    echo sent characters. When sending a string of commands, wait at least
    150 ms between each command. Any character outside the matching `[ ]`
    braces is ignored; characters inside the braces are processed and an
    error response is returned if invalid.

# The following entries represent the family-level command patterns the source
# documents. The Tahoe may use any one of the variants - the source does not
# state which.

# UNRESOLVED: per-protocol route command shape is variant-specific. The source
# documents the following shapes across the family:
#   - Avalon / Borrego:  [Bx,Xx,X,Y]   (board, board-type, input, output)
#   - Concord:           [Bx,X,Y]      (board, input, output)
#   - Delano:            [DV,XX,YY]    (video, input, output)
#   - Eureka / Gillespie:[EX,XX,YY] / [GX,XX,YY]  (audio-variant, input, output)
#   - Fallbrook:         [FV,XX,YY]
#   - Hawthorne:         [HV,XX,YY]
#   - Imperial:          [IV,XX,YY]
#   - Juneau:            [JV,XX,YY]
# Inputs use 0 (mute) or 1-8 (sources). Outputs use 1-8 (model-dependent max).
# Tahoe's variant is not stated in source.

- id: version_query
  label: Version / product ID query
  kind: query
  command: "[V,{prefix}{major}{minor}]"
  params:
    - name: prefix
      type: string
      description: Single-letter family prefix. Tahoe's prefix is not stated in the source; the family uses A (Avalon), B (Borrego), C (Concord), D (Delano), E (Eureka), F (Fallbrook), G (Gillespie), H (Hawthorne), I (Imperial), J (Juneau).
    - name: major
      type: integer
      description: Major firmware version digit.
    - name: minor
      type: integer
      description: Minor firmware version digit.
  notes: |
    The source's version query is documented only as a pattern that returns
    the product ID and version (e.g. `[V,A12]` = Avalon v1.2). It is unclear
    from the source whether the device sends this on operator request or
    whether the bracketed form itself is a request the device echoes back.
    Verify against a real device before depending on the response payload.
```

## Feedbacks
```yaml
- id: syntax_error
  type: enum
  values: [error]
  description: |
    Any command syntax error results in the response `[E]`. The device only
    attempts to process content between matching `[ ]` braces.

- id: route_echo
  type: object
  description: |
    Successful routing commands are echoed back verbatim. Example:
    sending `[B0,00,2,4]` returns `[B0,00,2,4]`. (Avalon example; Tahoe's
    echo payload will match whatever variant it uses.)

- id: matrix_state
  type: object
  description: |
    Query responses return the full state of the matrix wrapped in an outer
    pair of square brackets, with one `[Bx,...]` sub-structure per output.
    Example Avalon 8x4 response to `[?B0]`:
    `[[B1,C4,3,1][B1,C4,2,2][B1,C4,6,3][B1,C4,2,4][B2,B4,3,1][B2,B4,2,2][B2,B4,3,3][B2,B4,2,4]]`
    Tahoe's query prefix and sub-structure shape are not stated in source.

# UNRESOLVED: device-driven state-change notifications (unsolicited messages)
# are not described in the source.
```

## Variables
```yaml
# UNRESOLVED: persistent setup parameters exist (the source mentions a `[?S]`
# query that "returns all setup parameters" on the Hawthorne variant and
# notes that routing state is "stored in backup memory and will still be set
# after a power outage"), but the parameter set is not enumerated in the
# source.
```

## Events
```yaml
# UNRESOLVED: the source does not describe any unsolicited device-to-host
# notifications. Remove this section if Tahoe has no async events.
```

## Macros
```yaml
# UNRESOLVED: the source mentions a "virtual board" (B0) concept for
# controlling all switching levels in parallel, but does not document any
# user-defined multi-step macro facility. Remove if Tahoe has no macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: the source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements. Do not infer.
```

## Notes
- All commands are case sensitive; no spaces are allowed between the brackets.
- The closing `]` triggers the device to process the command; no CR/LF required.
- The serial port does NOT echo sent characters. Responses arrive within 150 ms max.
- When sending a string of commands, wait ≥150 ms between each.
- Routing state is stored in non-volatile memory and survives power loss (per source).
- The source describes ten protocol variants for the broader NeoPro/Neothings family. The Tahoe is not explicitly mapped to any of them in the source; verification against a real device is required before driving Tahoe-specific opcodes.
- The Hawthorne variant additionally documents a `[?S]` query returning all setup parameters; the parameter list itself is not enumerated in the source.

<!-- UNRESOLVED: firmware version compatibility, voltage/current draw, fault behavior, and error-recovery sequences are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - neoprointegrator.us
  - drivers.control4.com
  - manualslib.com
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00007-I_Serial-Protocols.pdf
  - https://drivers.control4.com/avswitch_232_neothings_Tahoe_v23_enc.c4i
  - https://neoprointegrator.us/wp-content/uploads/2024/01/NeoPro-Tahoe-UserGuide.pdf
  - https://www.manualslib.com/manual/4219559/Neopro-Tahoe-Veo.html
retrieved_at: 2026-05-21T15:02:21.118Z
last_checked_at: 2026-06-02T17:23:35.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:35.982Z
matched_actions: 2
action_count: 2
confidence: medium
summary: "Both spec actions (command envelope and version query) are documented verbatim in source; transport parameters match exactly. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers the broader Neothings/NeoPro family (protocols named Avalon, Borrego, Concord, Delano, Eureka, Fallbrook, Gillespie, Hawthorne, Imperial, Juneau). The Tahoe-specific protocol variant is not named in the source."
- "the source describes a family of protocol variants (Avalon, Borrego,"
- "per-protocol route command shape is variant-specific. The source"
- "device-driven state-change notifications (unsolicited messages)"
- "persistent setup parameters exist (the source mentions a `[?S]"
- "the source does not describe any unsolicited device-to-host"
- "the source mentions a \"virtual board\" (B0) concept for"
- "the source contains no safety warnings, interlock procedures,"
- "firmware version compatibility, voltage/current draw, fault behavior, and error-recovery sequences are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
