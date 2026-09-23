---
spec_id: admin/primare-systems-spa21
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare Systems SPA21 Control Spec"
manufacturer: Primare
model_family: SPA21
aliases: []
compatible_with:
  manufacturers:
    - Primare
    - "Primare Systems"
  models:
    - SPA21
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
  - yumpu.com
source_urls:
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
  - https://primare.net/support/documents-downloads/
  - https://www.yumpu.com/en/document/view/4275044/remote-control-keys-v22-primare
retrieved_at: 2026-09-03T02:04:38.427Z
last_checked_at: 2026-09-18T22:18:04.358Z
generated_at: 2026-09-18T22:18:04.358Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not explicitly confirm SPA21 coverage — preset/input rows are annotated \"(depending on model)\" and the DSP/surround section is annotated \"(SPA25 & SP25 model only)\". Requester states RS-232C as known protocol, but the source documents a TCP/IP API only; no RS-232 serial settings appear anywhere in the source."
  - "serial transport suspected for SPA21 but no serial config found in source"
  - "applicability to SPA21 not stated.'"
  - "exact encoding of xx xx not stated"
  - "none documented in source"
  - "none documented"
  - "no safety warnings or interlock procedures found in source"
  - "serial (RS-232C) transport config not in source; SPA21 model applicability of this command set not explicitly stated; response value encodings for xx placeholders not defined beyond command echoes; no firmware version compatibility stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:18:04.358Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions match source verbatim; TCP port 50006 confirmed; parameterized presets 1-17 and volumes 0-99 are enumerated rows in source, not extra commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Primare Systems SPA21 Control Spec

## Summary
TCP/IP control command set for the Primare Systems SPA21 amplifier, from a vendor command table (document updated 2025-06-13). Commands are ASCII strings prefixed `!1` and terminated with `<CR><LF>` (HEX `0D 0A`), covering power, preset/input selection, DSP/surround mode (SPA25 & SP25 only), mute, and volume (0–99).

<!-- UNRESOLVED: source does not explicitly confirm SPA21 coverage — preset/input rows are annotated "(depending on model)" and the DSP/surround section is annotated "(SPA25 & SP25 model only)". Requester states RS-232C as known protocol, but the source documents a TCP/IP API only; no RS-232 serial settings appear anywhere in the source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 50006
auth:
  type: none  # inferred: no auth procedure in source
# Command prefix: "!1" (HEX 21 31); end character: <CR><LF> (HEX 0D 0A) - stated in source header
# UNRESOLVED: serial transport suspected for SPA21 but no serial config found in source
```

## Traits
```yaml
# - powerable    (inferred: pow.1 / pow.0 commands present)
# - queryable    (inferred: ?.? status queries present for all functions)
# - levelable    (inferred: vol set 0-99 present)
# - routable     (inferred: preset/input selection commands present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All commands sent as ASCII prefixed "!1" and terminated with <CR><LF> (0D 0A).
# HEX column shows the verbatim byte sequence from the source.

- id: power_status_query
  label: Power Get Status
  kind: query
  command: "!1pow.?"
  description: 'Get power status. HEX: 21 31 70 6F 77 2E 3F. Response: !1pow.xx (see Feedbacks).'
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "!1pow.t"
  description: 'Toggle power. HEX: 21 31 70 6F 77 2E 74. Response: !1pow.xx.'
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "!1pow.1"
  description: 'Power ON. HEX: 21 31 70 6F 77 2E 31. Response echoes !1pow.1.'
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "!1pow.0"
  description: 'Power standby. HEX: 21 31 70 6F 77 2E 30. Response echoes !1pow.0.'
  params: []

- id: input_status_query
  label: Preset/Input Get Status
  kind: query
  command: "!1inp.?"
  description: 'Get preset/input status ("depending on model"). HEX: 21 31 69 6E 70 2E 3F. Response: !1inp.xx xx.'
  params: []

- id: input_next
  label: Next Preset/Input
  kind: action
  command: "!1inp.n"
  description: 'Next preset/input. HEX: 21 31 69 6E 70 2E 6E. Response: !1inp.xx xx.'
  params: []

- id: input_previous
  label: Previous Preset/Input
  kind: action
  command: "!1inp.p"
  description: 'Previous preset/input. HEX: 21 31 69 6E 70 2E 70. Response: !1inp.xx xx.'
  params: []

- id: select_preset_input
  label: Select Preset/Input
  kind: action
  command: "!1inp.{preset}"
  description: 'Direct preset/input select 1-17; source lists rows !1inp.1 through !1inp.17 (e.g. !1inp.10 HEX: 21 31 69 6E 70 2E 31 30). Response echoes command. "Depending on model."'
  params:
    - name: preset
      type: integer
      description: "Preset/input number, 1 to 17"

- id: surround_mode_query
  label: DSP/Surround Mode Get Status
  kind: query
  command: "!1sur.?"
  description: 'Get DSP/surround mode status. SPA25 & SP25 model only. HEX: 21 31 73 75 72 2E 3F. Response: !1sur.xx.'
  params: []

- id: surround_mode_next
  label: DSP/Surround Mode Next
  kind: action
  command: "!1sur.n"
  description: 'Next DSP/surround mode. SPA25 & SP25 model only. HEX: 21 31 73 75 72 2E 6E. Response: !1sur.xx.'
  params: []

- id: surround_mode_previous
  label: DSP/Surround Mode Previous
  kind: action
  command: "!1sur.p"
  description: 'Previous DSP/surround mode. SPA25 & SP25 model only. HEX: 21 31 73 75 72 2E 70. Response: !1sur.xx.'
  params: []

- id: set_surround_mode
  label: Set DSP/Surround Mode
  kind: action
  command: "!1sur.{mode}"
  description: 'Set DSP/surround mode; source lists named values 1-9. SPA25 & SP25 model only. Response echoes command. # UNRESOLVED: applicability to SPA21 not stated.'
  params:
    - name: mode
      type: enum
      description: "1=Auto (21 31 73 75 72 2E 31), 2=Bypass, 3=Stereo, 4=Party, 5=Dolby Digital: Movie, 6=Dolby Digital: Music, 7=Dolby Digital: Night, 8=DTS Neural:X, 9=Native"
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

- id: mute_status_query
  label: Mute Get Status
  kind: query
  command: "!1mut.?"
  description: 'Get mute status. HEX: 21 31 6D 75 74 2E 3F. Response: !1mut.xx.'
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "!1mut.t"
  description: 'Toggle mute. HEX: 21 31 6D 75 74 2E 74. Response: !1mut.xx.'
  params: []

- id: mute_enable
  label: Mute Enable
  kind: action
  command: "!1mut.1"
  description: 'Enable mute. HEX: 21 31 6D 75 74 2E 31. Response echoes !1mut.1.'
  params: []

- id: mute_disable
  label: Mute Disable
  kind: action
  command: "!1mut.0"
  description: 'Disable mute. HEX: 21 31 6D 75 74 2E 30. Response echoes !1mut.0.'
  params: []

- id: volume_status_query
  label: Volume Get Status
  kind: query
  command: "!1vol.?"
  description: 'Get volume status. HEX: 21 31 76 6F 6C 2E 3F. Response: !1vol.xx xx.'
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "!1vol.u"
  description: 'Volume up one step. HEX: 21 31 76 6F 6C 2E 75. Response: !1vol.xx xx.'
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!1vol.d"
  description: 'Volume down one step. HEX: 21 31 76 6F 6C 2E 64. Response: !1vol.xx xx.'
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "!1vol.{level}"
  description: 'Set volume 0 to 99 by ASCII (source lists rows !1vol.0 through !1vol.99; e.g. !1vol.10 HEX: 21 31 76 6F 6C 2E 31 30). Response echoes command.'
  params:
    - name: level
      type: integer
      description: "Volume level, 0 to 99 (ASCII digits)"
```

## Feedbacks
```yaml
# Response format documented in source: prefix !1 + function + "." + value, terminated <CR><LF>.
# Set/enable commands echo back the same command; queries return current value as "xx" placeholders.
- id: power_state
  type: enum
  response_pattern: "!1pow.xx"  # HEX: 21 31 70 6F 77 2Exx
  values: [on, standby]  # inferred: xx = 1 (on) / 0 (standby) per pow.1 / pow.0 commands
- id: input_preset
  type: integer
  response_pattern: "!1inp.xx xx"  # HEX: 21 31 69 6E 70 2Exx xx; two-digit value 1-17 # UNRESOLVED: exact encoding of xx xx not stated
- id: surround_mode
  type: enum
  response_pattern: "!1sur.xx"  # HEX: 21 31 73 75 72 2Exx
  values: [auto, bypass, stereo, party, dolby_digital_movie, dolby_digital_music, dolby_digital_night, dts_neural_x, native]  # inferred from named mode values 1-9
- id: mute_state
  type: enum
  response_pattern: "!1mut.xx"  # HEX: 21 31 6D 75 74 2Exx
  values: [enabled, disabled]  # inferred: xx = 1 / 0 per mut.1 / mut.0
- id: volume_level
  type: integer
  response_pattern: "!1vol.xx xx"  # HEX: 21 31 76 6F 6C 2Exx xx; value 0-99 # UNRESOLVED: exact encoding of xx xx not stated
```

## Variables
```yaml
# No settable parameters beyond the discrete set actions above.
# UNRESOLVED: none documented in source
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: none documented
```

## Macros
```yaml
# No multi-step sequences documented in source.
# UNRESOLVED: none documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands: ASCII, prefix `!1` (HEX `21 31`), end character `<CR><LF>` (HEX `0D 0A`). TCP port 50006 stated in source header ("TCP/IP API").
- Source document header: "Updated: 2025-06-13".
- Source is the vendor Prisma-style API table. Preset/input section annotated "(depending on model)"; DSP/surround section annotated "(SPA25 & SP25 model only)" — SPA21 coverage of individual sections is not explicitly confirmed. Prior research notes the Prisma API does not explicitly cover pre-Prisma SPA20/SPA21.
- Requester states RS-232C as the known SPA21 protocol, but this source documents TCP/IP only; no serial port settings (baud, parity, etc.) appear. Treat serial transport as unconfirmed.
<!-- UNRESOLVED: serial (RS-232C) transport config not in source; SPA21 model applicability of this command set not explicitly stated; response value encodings for xx placeholders not defined beyond command echoes; no firmware version compatibility stated in source -->

## Provenance

```yaml
source_domains:
  - primare.net
  - yumpu.com
source_urls:
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
  - https://primare.net/support/documents-downloads/
  - https://www.yumpu.com/en/document/view/4275044/remote-control-keys-v22-primare
retrieved_at: 2026-09-03T02:04:38.427Z
last_checked_at: 2026-09-18T22:18:04.358Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:18:04.358Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions match source verbatim; TCP port 50006 confirmed; parameterized presets 1-17 and volumes 0-99 are enumerated rows in source, not extra commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not explicitly confirm SPA21 coverage — preset/input rows are annotated \"(depending on model)\" and the DSP/surround section is annotated \"(SPA25 & SP25 model only)\". Requester states RS-232C as known protocol, but the source documents a TCP/IP API only; no RS-232 serial settings appear anywhere in the source."
- "serial transport suspected for SPA21 but no serial config found in source"
- "applicability to SPA21 not stated.'"
- "exact encoding of xx xx not stated"
- "none documented in source"
- "none documented"
- "no safety warnings or interlock procedures found in source"
- "serial (RS-232C) transport config not in source; SPA21 model applicability of this command set not explicitly stated; response value encodings for xx placeholders not defined beyond command echoes; no firmware version compatibility stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
