---
spec_id: admin/primare-spa2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare SPA2 Series Control Spec"
manufacturer: Primare
model_family: "SPA2 Series"
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - "SPA2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
retrieved_at: 2026-04-30T10:34:35.871Z
last_checked_at: 2026-06-02T17:23:52.719Z
generated_at: 2026-06-02T17:23:52.719Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no additional settable parameters beyond the discrete actions documented above"
  - "source does not document unsolicited event notifications"
  - "source does not document multi-step macro sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "source PDF may contain an RS-232 section not present in this refined excerpt; only TCP/IP commands documented here"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:52.719Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec command literals match source table verbatim; transport (TCP/IP port 50006, no auth) confirmed; one-to-one coverage with source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Primare SPA2 Series Control Spec

## Summary
Primare SPA2 Series amplifier control via TCP/IP on port 50006 using ASCII commands prefixed with `!1` and terminated with `<CR><LF>`. Source document is the generic Primare Prisma API manual dated 2025-06-13; applicability to specific SPA2 Series models must be verified by the integrator.

<!-- UNRSOLVED: RS-232 section of source PDF not present in refined excerpt; only TCP/IP commands documented below -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 50006
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from preset/input command examples
- queryable       # inferred from get-status command examples
- levelable       # inferred from volume command examples
```

## Actions
```yaml
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "!1pow.?"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "!1pow.t"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "!1pow.1"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "!1pow.0"
  params: []

- id: input_status_query
  label: Input/Preset Status Query
  kind: query
  command: "!1inp.?"
  params: []

- id: input_next
  label: Next Input/Preset
  kind: action
  command: "!1inp.n"
  params: []

- id: input_previous
  label: Previous Input/Preset
  kind: action
  command: "!1inp.p"
  params: []

- id: input_1
  label: Preset/Input 1
  kind: action
  command: "!1inp.1"
  params: []

- id: input_2
  label: Preset/Input 2
  kind: action
  command: "!1inp.2"
  params: []

- id: input_3
  label: Preset/Input 3
  kind: action
  command: "!1inp.3"
  params: []

- id: input_4
  label: Preset/Input 4
  kind: action
  command: "!1inp.4"
  params: []

- id: input_5
  label: Preset/Input 5
  kind: action
  command: "!1inp.5"
  params: []

- id: input_6
  label: Preset/Input 6
  kind: action
  command: "!1inp.6"
  params: []

- id: input_7
  label: Preset/Input 7
  kind: action
  command: "!1inp.7"
  params: []

- id: input_8
  label: Preset/Input 8
  kind: action
  command: "!1inp.8"
  params: []

- id: input_9
  label: Preset/Input 9
  kind: action
  command: "!1inp.9"
  params: []

- id: input_10
  label: Preset/Input 10
  kind: action
  command: "!1inp.10"
  params: []

- id: input_11
  label: Preset/Input 11
  kind: action
  command: "!1inp.11"
  params: []

- id: input_12
  label: Preset/Input 12
  kind: action
  command: "!1inp.12"
  params: []

- id: input_13
  label: Preset/Input 13
  kind: action
  command: "!1inp.13"
  params: []

- id: input_14
  label: Preset/Input 14
  kind: action
  command: "!1inp.14"
  params: []

- id: input_15
  label: Preset/Input 15
  kind: action
  command: "!1inp.15"
  params: []

- id: input_16
  label: Preset/Input 16
  kind: action
  command: "!1inp.16"
  params: []

- id: input_17
  label: Preset/Input 17
  kind: action
  command: "!1inp.17"
  params: []

- id: surround_status_query
  label: DSP/Surround Mode Status Query
  kind: query
  command: "!1sur.?"
  params: []

- id: surround_next
  label: DSP/Surround Mode Next
  kind: action
  command: "!1sur.n"
  params: []

- id: surround_previous
  label: DSP/Surround Mode Previous
  kind: action
  command: "!1sur.p"
  params: []

- id: surround_auto
  label: DSP/Surround Mode Auto
  kind: action
  command: "!1sur.1"
  params: []

- id: surround_bypass
  label: DSP/Surround Mode Bypass
  kind: action
  command: "!1sur.2"
  params: []

- id: surround_stereo
  label: DSP/Surround Mode Stereo
  kind: action
  command: "!1sur.3"
  params: []

- id: surround_party
  label: DSP/Surround Mode Party
  kind: action
  command: "!1sur.4"
  params: []

- id: surround_dd_movie
  label: DSP/Surround Mode Dolby Digital Movie
  kind: action
  command: "!1sur.5"
  params: []

- id: surround_dd_music
  label: DSP/Surround Mode Dolby Digital Music
  kind: action
  command: "!1sur.6"
  params: []

- id: surround_dd_night
  label: DSP/Surround Mode Dolby Digital Night
  kind: action
  command: "!1sur.7"
  params: []

- id: surround_dts_neural_x
  label: DSP/Surround Mode DTS Neural:X
  kind: action
  command: "!1sur.8"
  params: []

- id: surround_native
  label: DSP/Surround Mode Native
  kind: action
  command: "!1sur.9"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "!1mut.?"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "!1mut.t"
  params: []

- id: mute_enable
  label: Mute Enable
  kind: action
  command: "!1mut.1"
  params: []

- id: mute_disable
  label: Mute Disable
  kind: action
  command: "!1mut.0"
  params: []

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "!1vol.?"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "!1vol.u"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!1vol.d"
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  command: "!1vol.{level}"
  params:
    - name: level
      type: integer
      description: Volume level 0-99 (ASCII)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: input_state
  type: string
  values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]
- id: surround_state
  type: string
  values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: volume_state
  type: integer
  range: [0, 99]
```

## Variables
```yaml
# UNRESOLVED: no additional settable parameters beyond the discrete actions documented above
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Command prefix `!1` (hex `21 31`); all commands terminated with `<CR><LF>` (hex `0D 0A`).
- Source is the generic Primare Prisma API manual (2025-06-13); SPA2 Series model applicability must be verified by integrator.
- DSP/surround mode commands (`!1sur.*`) marked in source as SPA25 & SP25 only — not all SPA2 Series models support these.
- Source response payloads shown only as `21 31 70 6F 77 2Exx` / `21 31 69 6E 70 2Exx xx` placeholders; full response bytes for each variant not expanded in source.

<!-- UNRESOLVED: source PDF may contain an RS-232 section not present in this refined excerpt; only TCP/IP commands documented here -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
retrieved_at: 2026-04-30T10:34:35.871Z
last_checked_at: 2026-06-02T17:23:52.719Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:52.719Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec command literals match source table verbatim; transport (TCP/IP port 50006, no auth) confirmed; one-to-one coverage with source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no additional settable parameters beyond the discrete actions documented above"
- "source does not document unsolicited event notifications"
- "source does not document multi-step macro sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "source PDF may contain an RS-232 section not present in this refined excerpt; only TCP/IP commands documented here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
