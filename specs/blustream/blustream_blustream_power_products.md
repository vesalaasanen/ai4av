---
spec_id: admin/blustream-cmx88ab
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream CMX88AB Control Spec"
manufacturer: Blustream
model_family: CMX88AB
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - CMX88AB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:57.416Z
last_checked_at: 2026-04-23T15:23:28.509Z
generated_at: 2026-04-23T15:23:28.509Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "?"
  - HELP
verification:
  verdict: verified
  checked_at: 2026-04-23T15:23:28.509Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched literally in source command table with correct syntax and parameters; transport settings verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blustream CMX88AB Control Spec

## Summary
Blustream CMX88AB is an 8x8 HDMI matrix switcher supporting RS-232 and TCP/IP control. This spec covers power control, input/output routing, EDID management, and system configuration via serial or Telnet commands.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: user_pass  # inferred: username/password stated in source
  username: blustream
  password: "1234"
```

## Traits
```yaml
- powerable  # inferred: PON/POFF commands present
- routable   # inferred: OUTxxFRyy routing commands present
- queryable  # inferred: STATUS command present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: output_on
  label: Set Output On
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-08)

- id: output_off
  label: Set Output Off
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-08)

- id: route_output
  label: Route Output to Input
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (01-08)
    - name: input
      type: integer
      description: Input number (01-04)

- id: copy_edid
  label: Copy EDID
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (00=ALL, 01-08)
    - name: output
      type: integer
      description: Output number (00=ALL, 01-02)

- id: set_edid_default
  label: Set EDID to Default
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (00=ALL, 01-04)
    - name: edid
      type: integer
      description: EDID preset (00-14)

- id: ir_on
  label: IR Control On
  kind: action
  params: []

- id: ir_off
  label: IR Control Off
  kind: action
  params: []

- id: key_on
  label: Key Control On
  kind: action
  params: []

- id: key_off
  label: Key Control Off
  kind: action
  params: []

- id: debug_on
  label: Debug Mode On
  kind: action
  params: []

- id: debug_off
  label: Debug Mode Off
  kind: action
  params: []

- id: beep_on
  label: Beep On
  kind: action
  params: []

- id: beep_off
  label: Beep Off
  kind: action
  params: []

- id: reset_system
  label: Reset System
  kind: action
  params:
    - name: confirm
      type: string
      description: Must type "Yes" to confirm

- id: reset_defaults
  label: Restore Factory Defaults
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: system_status
  label: System Status
  type: string
  description: Returns matrix zone status, connection types
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - reset_system  # requires "Yes" confirmation
interlocks: []
```

## Notes
Command syntax: commands are ASCII strings terminated by carriage return (<CR>, \r, 0x0D). No spaces between command characters unless required by control software.

DHCP is enabled by default; if no DHCP server is present, default IP is 192.168.0.200.

Output numbers are 01-08. EDID input selection uses 00 for ALL, 01-08 for individual. EDID output selection uses 00 for ALL, 01-02 for individual.
<!-- UNRESOLVED: TCP control port number not stated in source -->
<!-- UNRESOLVED: Telnet vs raw TCP not distinguished in source -->
<!-- UNRESOLVED: unsolicited status change notifications not documented -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
retrieved_at: 2026-04-29T08:34:57.416Z
last_checked_at: 2026-04-23T15:23:28.509Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:23:28.509Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched literally in source command table with correct syntax and parameters; transport settings verified."
```

## Known Gaps

```yaml
- "?"
- HELP
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
