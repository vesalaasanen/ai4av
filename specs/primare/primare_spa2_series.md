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
last_checked_at: 2026-04-30T15:28:13.625Z
generated_at: 2026-04-30T15:28:13.625Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:28:13.625Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions matched to source commands; full coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Primare SPA2 Series Control Spec

## Summary
Primare SPA2 Series integrated amplifier/preamp network player. Control via TCP/IP on port 50006. Command prefix `!1`, end character `<CR><LF>`. Commands for power, input/preset selection, mute, and volume. DSP/surround mode commands are documented for SPA25 and SP25 models only — not applicable to SPA20/SPA21.

<!-- UNRESOLVED: RS-232 serial commands not documented in source; only TCP/IP API provided. DSP mode commands apply to SPA25/SP25 only. -->

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
- powerable  # inferred: power on/off commands present
- routable   # inferred: input/preset selection commands present
- levelable  # inferred: volume up/down/set commands present
```

## Actions
```yaml
- id: power_status
  label: Get Power Status
  kind: action
  params: []
- id: power_toggle
  label: Toggle Power
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
- id: input_status
  label: Get Input/Preset Status
  kind: action
  params: []
- id: input_next
  label: Next Preset/Input
  kind: action
  params: []
- id: input_previous
  label: Previous Preset/Input
  kind: action
  params: []
- id: input_select
  label: Select Preset/Input
  kind: action
  params:
    - name: input
      type: integer
      description: Preset/input number (1-17)
- id: mute_status
  label: Get Mute Status
  kind: action
  params: []
- id: mute_toggle
  label: Toggle Mute
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: volume_status
  label: Get Volume Status
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-99 (ASCII representation)
- id: surround_status
  label: Get Surround Mode Status
  kind: action
  params: []
- id: surround_next
  label: Next Surround Mode
  kind: action
  params: []
- id: surround_previous
  label: Previous Surround Mode
  kind: action
  params: []
- id: surround_auto
  label: Surround Mode Auto
  kind: action
  params: []
- id: surround_bypass
  label: Surround Mode Bypass
  kind: action
  params: []
- id: surround_stereo
  label: Surround Mode Stereo
  kind: action
  params: []
- id: surround_party
  label: Surround Mode Party
  kind: action
  params: []
- id: surround_dolby_movie
  label: Surround Mode Dolby Movie
  kind: action
  params: []
- id: surround_dolby_music
  label: Surround Mode Dolby Music
  kind: action
  params: []
- id: surround_dolby_night
  label: Surround Mode Dolby Night
  kind: action
  params: []
- id: surround_dts_neural_x
  label: Surround Mode DTS Neural X
  kind: action
  params: []
- id: surround_native
  label: Surround Mode Native
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_response
  label: Power Response
  type: string
  description: Returns !1pow.1 (on) or !1pow.0 (off)
- id: input_response
  label: Input/Preset Response
  type: string
  description: Returns !1inp.<n> where n is current preset/input number
- id: mute_response
  label: Mute Response
  type: string
  description: Returns !1mut.1 (muted) or !1mut.0 (unmuted)
- id: volume_response
  label: Volume Response
  type: string
  description: Returns !1vol.<n> where n is current volume level (0-99)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond volume level documented
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
Command format: `!1<command>.<value><CR><LF>` (ASCII) or prefix `21 31` followed by command bytes. Port 50006 TCP. DSP mode commands (`!1sur.*`) apply to SPA25 and SP25 models only — not SPA20/SPA21.
<!-- UNRESOLVED: RS-232 serial protocol parameters (baud, data bits, parity, stop bits) not stated in source. RS-232 support unconfirmed. -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
retrieved_at: 2026-04-30T10:34:35.871Z
last_checked_at: 2026-04-30T15:28:13.625Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:28:13.625Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions matched to source commands; full coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
