---
spec_id: admin/shinybow-sb-5562
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5562 Control Spec"
manufacturer: Shinybow
model_family: SB-5562
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5562
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-09-02T16:59:45.109Z
last_checked_at: 2026-09-21T22:16:46.399Z
generated_at: 2026-09-21T22:16:46.399Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is generic to the matrix/routing switcher series and uses an SB-5688 response header (e.g. `SB5688 00;`) throughout; response framing on the SB-5562 specifically is unconfirmed."
  - "source documents response strings (e.g. `POWER 00;`, `SB5688 00;`) but"
  - "source describes EDID mode presets as discrete command values"
  - "source does not document unsolicited notifications; section omitted pending source evidence."
  - "source does not document multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "per-channel output/input count limits on the SB-5562 not stated in source."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-21T22:16:46.399Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match literal wire tokens in the source; transport parameters (9600,8,N,1,none) verbatim; source has no commands beyond the 11-parameterized-command catalogue the spec covers. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Shinybow SB-5562 Control Spec

## Summary
RS-232C control protocol for the Shinybow SB-5562 matrix/routing switcher. Uses 9600 bps, 8-N-1 ASCII command strings of the form `[Command][ ][Data];`. The source document explicitly notes that "not all commands are supported on all devices", so this spec is a superset of the matrix/routing switcher series — verify each action against the target unit before relying on it.

<!-- UNRESOLVED: source document is generic to the matrix/routing switcher series and uses an SB-5688 response header (e.g. `SB5688 00;`) throughout; response framing on the SB-5562 specifically is unconfirmed. -->

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
traits:
  - powerable  # inferred: POWER set commands present
  - routable  # inferred: OUTPUT / OUTPUTALL routing commands present
  - queryable  # inferred: `?` query commands present
  - levelable  # inferred: VOLUME / BALANCE control commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "POWER 00;"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "POWER 01;"
  params: []
- id: power_status
  label: Power Status Query
  kind: query
  command: "POWER ?;"
  params: []
- id: lock_unlock
  label: Unlock System
  kind: action
  command: "LOCK 00;"
  params: []
- id: lock_lock
  label: Lock System
  kind: action
  command: "LOCK 01;"
  params: []
- id: lock_status
  label: Lock Status Query
  kind: query
  command: "LOCK ?;"
  params: []
- id: output_route
  label: Route Output To Input
  kind: action
  command: "OUTPUT{output} {input};"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
    - name: input
      type: integer
      description: Input channel (2-digit zero-padded)
- id: output_off
  label: Output Off
  kind: action
  command: "OUTPUT{output} 00;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: output_status
  label: Output Status Query
  kind: query
  command: "OUTPUT{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: activesource_status
  label: Active Source Status Query
  kind: query
  command: "ACTIVESOURCE ?;"
  params: []
- id: outputall_off
  label: All Outputs Off
  kind: action
  command: "OUTPUTALL 00;"
  params: []
- id: outputall_set
  label: Set All Outputs To One Source
  kind: action
  command: "OUTPUTALL {source};"
  params:
    - name: source
      type: integer
      description: Source number (2-digit zero-padded)
- id: outputall_status
  label: All Outputs Status Query
  kind: query
  command: "OUTPUTALL ?;"
  params: []
- id: memory_save
  label: Save Matrix Configuration To Memory
  kind: action
  command: "MEMORY {address};"
  params:
    - name: address
      type: string
      description: Memory address, two-digit hex (00..0F, addresses 1..16)
- id: memory_recall
  label: Recall Matrix Configuration From Memory
  kind: action
  command: "RECALL {address};"
  params:
    - name: address
      type: string
      description: Memory location, two-digit hex (00..0F)
- id: memory_recall_status
  label: Memory Configuration Query
  kind: query
  command: "RECALL{address} ?;"
  params:
    - name: address
      type: string
      description: Memory location, two-digit hex (00..0F)
- id: edid_set_00
  label: Set EDID to FSS
  kind: action
  command: "EDID 00;"
  params: []
- id: edid_set_01
  label: Set EDID to H24-3D
  kind: action
  command: "EDID 01;"
  params: []
- id: edid_set_02
  label: Set EDID to H24M-3D
  kind: action
  command: "EDID 02;"
  params: []
- id: edid_set_03
  label: Set EDID to H36-3D
  kind: action
  command: "EDID 03;"
  params: []
- id: edid_set_04
  label: Set EDID to H36-3D-M
  kind: action
  command: "EDID 04;"
  params: []
- id: edid_set_05
  label: Set EDID to DVI-D 1280x1024
  kind: action
  command: "EDID 05;"
  params: []
- id: edid_set_06
  label: Set EDID to DVI-D 1920x1200
  kind: action
  command: "EDID 06;"
  params: []
- id: edid_set_07
  label: Set EDID to Auto
  kind: action
  command: "EDID 07;"
  params: []
- id: edid_status
  label: EDID Status Query
  kind: query
  command: "EDID ?;"
  params: []
- id: volume_set
  label: Set Output Volume
  kind: action
  command: "VOLUME{output} {level};"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
    - name: level
      type: integer
      description: Volume value 0..100 (0 = mute, 99 = max)
- id: volume_status
  label: Output Volume Query
  kind: query
  command: "VOLUME{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: volume_increment
  label: Increment Output Volume
  kind: action
  command: "VOLUME{output} +{step};"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
    - name: step
      type: integer
      description: Number of additional volume steps
- id: volume_decrement
  label: Decrement Output Volume
  kind: action
  command: "VOLUME{output} -{step};"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
    - name: step
      type: integer
      description: Number of volume steps to reduce
- id: balance_set
  label: Set Output Balance
  kind: action
  command: "BALANCE{output} {level};"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
    - name: level
      type: integer
      description: Balance value 0..99 (default 50, 0 = 100% left, 99 = 100% right)
- id: balance_status
  label: Output Balance Query
  kind: query
  command: "BALANCE{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: mute_on
  label: Mute Output On
  kind: action
  command: "MUTE{output} 01;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: mute_off
  label: Mute Output Off
  kind: action
  command: "MUTE{output} 00;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
- id: mute_status
  label: Mute Status Query
  kind: query
  command: "MUTE{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (2-digit zero-padded)
```

## Feedbacks
```yaml
# UNRESOLVED: source documents response strings (e.g. `POWER 00;`, `SB5688 00;`) but
# does not formally enumerate observable state values. Power/lock/mute binaries are
# inferred from command-response tables below.
- id: power_state
  type: enum
  values: [on, off]
  description: Inferred from POWER query responses (`POWER 00;` = off, `POWER 01;` = on).
- id: lock_state
  type: enum
  values: [locked, unlocked]
  description: Inferred from LOCK query responses (`Lock 00;` = unlocked, `Lock 01;` = locked).
- id: mute_state
  type: enum
  values: [on, off]
  description: Per-output, inferred from MUTEXX query responses (`MUTEXX ?#00;` / `#01;`).
- id: volume_level
  type: integer
  range: [0, 100]
  description: Per-output, 0 = mute, 99 = max. Returned in `VOLUMEXX ?#NN;`.
- id: balance_level
  type: integer
  range: [0, 99]
  description: Per-output, 50 = centered. Returned in `BALANCEXX ?#NN;`.
- id: output_routing
  type: string
  description: Per-output, two-digit input number returned in `OUTPUTxx ?;` and `OUTPUTALL ?;`.
- id: activesource_status
  type: string
  description: 16-character binary string from `ACTIVESOURCE ?;` indicating which sources are active (01) or inactive (00).
```

## Variables
```yaml
# UNRESOLVED: source describes EDID mode presets as discrete command values
# rather than a settable variable. Remove this section if not applicable.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications; section omitted pending source evidence.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
# Note: EDID changes trigger a soft-reboot - operator must wait >=5 seconds before issuing further commands (source-stated).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Data string format: `[Command][ ][Data];` — single space separator, terminates with `;`. ASCII, case-insensitive (source-stated).
- Response framing in source uses the header `SB5688` (e.g. `SB5688 00;` = OK, `SB5688 01;` = UNKNOWN command). Header on the SB-5562 specifically is unconfirmed.
- Volume/Balance/Mute responses append `#OK` or `#ER` (e.g. `VOLUME01 80#OK;`) and are echoed back rather than using the `SB5688` header.
- EDID changes trigger a soft-reboot; allow a minimum of 5 seconds between EDID commands and subsequent commands (source-stated).
- Memory addresses 00..0F map to locations 1..16 (source-stated).
- `ACTIVESOURCE` is noted as "Not available on all models" (source-stated).
- Document explicitly notes "not all commands are supported on all devices" — verify each command against the target unit before integration.

<!-- UNRESOLVED: per-channel output/input count limits on the SB-5562 not stated in source. -->
```

Saved to `/tmp/shinybow_sb_5562_spec.md`. Caveats:
- Source doc targets SB-5688 response framing — SB-5562 framing unconfirmed.
- "Not all commands supported on all devices" — actions are superset, verify per unit.
- No port, voltage, firmware info in source — left as UNRESOLVED.

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-09-02T16:59:45.109Z
last_checked_at: 2026-09-21T22:16:46.399Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:16:46.399Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match literal wire tokens in the source; transport parameters (9600,8,N,1,none) verbatim; source has no commands beyond the 11-parameterized-command catalogue the spec covers. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is generic to the matrix/routing switcher series and uses an SB-5688 response header (e.g. `SB5688 00;`) throughout; response framing on the SB-5562 specifically is unconfirmed."
- "source documents response strings (e.g. `POWER 00;`, `SB5688 00;`) but"
- "source describes EDID mode presets as discrete command values"
- "source does not document unsolicited notifications; section omitted pending source evidence."
- "source does not document multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "per-channel output/input count limits on the SB-5562 not stated in source."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
