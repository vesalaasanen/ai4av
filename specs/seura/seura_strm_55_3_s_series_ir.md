---
spec_id: admin/seura-strm-55-3-s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura STRM-55.3-S Series Control Spec"
manufacturer: Seura
model_family: "STRM-55.3-S Series"
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - "STRM-55.3-S Series"
    - STM3-49-S
    - STM3-49-U
    - STM3-55-S
    - STM3-55-U
    - STM3-65-S
    - STM3-65-U
    - STM3-86-S
    - STM3-86-U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:59:50.755Z
last_checked_at: 2026-04-30T09:49:35.722Z
generated_at: 2026-04-30T09:49:35.722Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:49:35.722Z
  matched_actions: 12
  action_count: 12
  confidence: high
  summary: "All 12 spec actions matched verbatim to source command tables; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Seura STRM-55.3-S Series Control Spec

## Summary
Seura STRM-55.3-S Series outdoor display with RS-232 serial control protocol. Supports power on/off, input routing, volume, and mute control via ASCII command strings wrapped in STX/ETX framing. No authentication required.

<!-- UNRESOLVED: USB control, IR, and network control variants not covered in this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: select_hdmi1
  label: Select HDMI 1
  kind: action
  params: []
- id: select_hdmi2
  label: Select HDMI 2
  kind: action
  params: []
- id: select_hdmi3
  label: Select HDMI 3
  kind: action
  params: []
- id: select_display_port
  label: Select Display Port
  kind: action
  params: []
- id: select_component
  label: Select Component
  kind: action
  params: []
- id: select_hdbaset
  label: Select HDBaseT
  kind: action
  params: []
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100
- id: mute
  label: Mute
  kind: action
  params: []
- id: unmute
  label: Un-Mute
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
- id: input_state
  label: Input State
  type: enum
  values:
    - "1"
    - "6"
    - "7"
    - "9"
    - "10"
    - "11"
- id: volume_state
  label: Volume State
  type: integer
  values: [0-100]
- id: mute_state
  label: Mute State
  type: enum
  values:
    - "0"
    - "1"
- id: ack_ok
  label: Acknowledgement OK
  type: string
  values:
    - STX "OK" ETX
- id: ack_error
  label: Acknowledgement Error
  type: string
  values:
    - STX "ER" ETX
- id: ack_invalid
  label: Invalid Command
  type: string
  values:
    - STX "INVALID" ETX
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions listed above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: all commands wrapped in STX (0x02) and ETX (0x03) with colon-separated parameters. ID number 000 broadcasts to all devices. Acknowledgements: OK on success, ER on error, INVALID for unsupported commands.
<!-- UNRESOLVED: Service Menu ID configuration procedure not documented -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:59:50.755Z
last_checked_at: 2026-04-30T09:49:35.722Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:49:35.722Z
matched_actions: 12
action_count: 12
confidence: high
summary: "All 12 spec actions matched verbatim to source command tables; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
