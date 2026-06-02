---
spec_id: admin/hegel-av-receiver
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hegel AV Receiver IP Control Spec"
manufacturer: Hegel
model_family: H95
aliases: []
compatible_with:
  manufacturers:
    - Hegel
  models:
    - H95
    - H120
    - H190
    - H390
    - H590
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.hegel.com
source_urls:
  - https://support.hegel.com/component/jdownloads/download/102-h95-h120-h190-h390-h590-ip-control-codes
retrieved_at: 2026-04-30T04:31:40.082Z
last_checked_at: 2026-06-02T22:07:34.853Z
generated_at: 2026-06-02T22:07:34.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "daisy-chain / linking behavior not documented"
  - "no discrete settable parameters beyond actions"
  - "no unsolicited event notifications described in source"
  - "no safety warnings or interlock procedures in source"
  - "input names per model not fully mapped; consult Hegel Input Table for model-specific assignments"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:34.853Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hegel AV Receiver IP Control Spec

## Summary
Hegel integrated amplifiers and AV receivers (models H95, H120, H190, H390, H590) support TCP/IP control on port 50001. Commands follow the pattern `-[command].[parameter]<CR>`. Status queries use the `?` parameter to retrieve current device state.

<!-- UNRESOLVED: daisy-chain / linking behavior not documented -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 50001
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (p.1/0, p.t)
- queryable  # inferred from status request commands (? parameter)
- levelable  # inferred from volume control commands (v, u, d)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 1 = on

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = off

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-11 per model)

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (percentage)

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params:
    - name: value
      type: integer
      description: 1 = mute on

- id: mute_off
  label: Mute Off
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = mute off

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: reset_connection
  label: Reset Connection Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Reset connection after [minutes]. Sending -r.3<CR> every 2 minutes keeps connection alive during controller reboot.

- id: stop_reset_timer
  label: Stop Reset Timer
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "1"  # on
    - "0"  # off

- id: input_state
  label: Input State
  type: integer
  description: Current input number (1-11)

- id: volume_state
  label: Volume State
  type: integer
  description: Current volume 0-100

- id: mute_state
  label: Mute State
  type: enum
  values:
    - "1"  # muted
    - "0"  # unmuted

- id: error_response
  label: Error Response
  type: enum
  values:
    - "e"  # error
  description: Device returns (e) on invalid command
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
- id: keepalive_reconnect
  label: Keepalive Reconnect
  description: Send -r.3<CR> every 2 minutes to ensure connection resets during controller reboot, allowing reconnect.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Port 50001 is the TCP control port. Command syntax: `-[command].[parameter]<CR>` (e.g., `-v.50<CR>` for 50% volume). Query current state by appending `?` to any command (e.g., `-v.?<CR>`). Invalid commands return `(e)`.

Input numbering varies by model (1–11 per Hegel Input Table). Volume range is 0–100%.
<!-- UNRESOLVED: input names per model not fully mapped; consult Hegel Input Table for model-specific assignments -->

## Provenance

```yaml
source_domains:
  - support.hegel.com
source_urls:
  - https://support.hegel.com/component/jdownloads/download/102-h95-h120-h190-h390-h590-ip-control-codes
retrieved_at: 2026-04-30T04:31:40.082Z
last_checked_at: 2026-06-02T22:07:34.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:34.853Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "daisy-chain / linking behavior not documented"
- "no discrete settable parameters beyond actions"
- "no unsolicited event notifications described in source"
- "no safety warnings or interlock procedures in source"
- "input names per model not fully mapped; consult Hegel Input Table for model-specific assignments"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
