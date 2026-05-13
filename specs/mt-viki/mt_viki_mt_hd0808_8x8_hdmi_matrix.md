---
spec_id: admin/mt-viki-mt-hd0808-8x8-hdmi-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "MT VIKI MT-HD0808 8x8 HDMI Matrix Control Spec"
manufacturer: "MT VIKI"
model_family: MT-HD0808
aliases: []
compatible_with:
  manufacturers:
    - "MT VIKI"
  models:
    - MT-HD0808
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mt-viki.net
retrieved_at: 2026-04-30T14:17:03.133Z
last_checked_at: 2026-04-30T15:22:12.346Z
generated_at: 2026-04-30T15:22:12.346Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:22:12.346Z
  matched_actions: 10
  action_count: 10
  confidence: high
  summary: "All 10 spec actions matched source; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# MT VIKI MT-HD0808 8x8 HDMI Matrix Control Spec

## Summary
8×8 HDMI matrix switcher with RS-232 serial control. Supports input-output routing, all-port broadcast, save/recall presets, and buzzer control. Protocol uses text-based command strings terminated with a period.

<!-- UNRESOLVED: TCP/IP or HTTP control not documented; serial-only confirmed -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: power on/off commands not present in source
- routable  # inferred from routing commands ([x1]X[x2], [x1]All., All[1.])
- queryable  # UNRESOLVED: query commands returning state not documented
- levelable  # UNRESOLVED: volume/gain/brightness control not applicable to matrix
```

## Actions
```yaml
- id: route_input_to_all
  label: Route Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel number (1-8 for 8×8 matrix)
  example: "3All."

- id: close_all_outputs
  label: Close All Outputs
  kind: action
  params: []
  example: "0All."

- id: close_single_output
  label: Close Single Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number to close
  example: "0X5."

- id: set_one_to_one
  label: Set All Channels One-to-One
  kind: action
  params: []
  example: "All1."

- id: route_input_to_output
  label: Route Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number
  example: "3X5."

- id: route_input_to_multiple_outputs
  label: Route Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: outputs
      type: string
      description: Output channel numbers separated by & (e.g., "5&6&7&8")
  example: "3X5&6&7&8."

- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot number (1-9)
  example: "Save7."

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot number (1-9)
  example: "Recall7."

- id: beep_on
  label: Enable Buzzer
  kind: action
  params: []
  example: "BeepON."

- id: beep_off
  label: Disable Buzzer
  kind: action
  params: []
  example: "BeepOFF."
```

## Feedbacks
```yaml
# UNRESOLVED: response strings or acknowledgement patterns not documented in source
```

## Variables
```yaml
# No discrete settable parameters separate from routing actions.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications from device not documented
```

## Macros
```yaml
# Multi-step sequences not explicitly documented as named macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format: `[x1]All.`, `[x0]X[x1].`, `[x1]X[x2].`, `All[1].`, `Save[Y].`, `Recall[Y].`, `BeepON.`, `BeepOFF.`
- Commands terminated by period (`.`), English punctuation only
- Letters case-insensitive
- Channel range 1-10 (effective 1-8 for 8×8 model); out-of-range triggers command error
- Brackets `[` `]` are not sent characters — denote parameter placeholders only
- USB-to-RS232 adapter supported for direct matrix serial port connection
<!-- UNRESOLVED: TCP/IP control path not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - mt-viki.net
retrieved_at: 2026-04-30T14:17:03.133Z
last_checked_at: 2026-04-30T15:22:12.346Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:22:12.346Z
matched_actions: 10
action_count: 10
confidence: high
summary: "All 10 spec actions matched source; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
