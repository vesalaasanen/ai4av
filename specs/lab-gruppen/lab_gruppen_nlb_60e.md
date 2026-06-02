---
spec_id: admin/lab_gruppen-nlb_60e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lab.gruppen NLB 60E Control Spec"
manufacturer: Lab.gruppen
model_family: "NLB 60E"
aliases: []
compatible_with:
  manufacturers:
    - Lab.gruppen
  models:
    - "NLB 60E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - prodgsystems.com
source_urls:
  - "https://prodgsystems.com/public/pdf/119_Third%20party%20integration%20protocol.pdf"
retrieved_at: 2026-04-30T04:36:28.729Z
last_checked_at: 2026-04-25T20:54:49.416Z
generated_at: 2026-04-25T20:54:49.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings or interlock procedures in source"
  - "no discrete settable parameters beyond VDN table management"
  - "no unsolicited event notifications described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "power-on sequencing not described"
  - "firmware compatibility range not stated"
  - "physical connection type (ethernet port) not stated"
verification:
  verdict: verified
  checked_at: 2026-04-25T20:54:49.416Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions matched source commands with correct semantics; transport (TCP port 65010, no auth) verified; source catalogue fully covered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Lab.gruppen NLB 60E Control Spec

## Summary
The NLB 60E is a NomadLink bridge/controller for Lab.gruppen amplifiers. Third-party control via text-based TCP on port 65010. Supports subnet-level and per-device control for power, mute, and status monitoring. Commands are case-insensitive alphanumerical strings terminated with CR+LF.

<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 65010  # stated: "3rd party control 65010"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # Power On/Off commands present for subnet and individual devices
- routable     # VDN-based device addressing provides routing capability
- queryable    # Status, MuteStatus, StatusOk queries present
```

## Actions
```yaml
- id: subnet_power_set
  label: Set Subnet Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = off, 1 = on

- id: subnet_power_get
  label: Get Subnet Power
  kind: action
  params: []

- id: subnet_mute_set
  label: Set Subnet Mute
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = unmute, 1 = mute

- id: subnet_mute_get
  label: Get Subnet Mute
  kind: action
  params: []

- id: subnet_statusok
  label: Get Subnet Status OK
  kind: action
  params: []

- id: subnet_status
  label: Get Subnet Status
  kind: action
  params: []

- id: subnet_serial_at_pos
  label: Get Subnet Serial at Position
  kind: action
  params:
    - name: position
      type: integer
      description: Position 1-60

- id: subnet_vdn_set
  label: Set Subnet VDN Entry
  kind: action
  params:
    - name: index
      type: integer
      description: VDN slot 1-60
    - name: vdn
      type: string
      description: Virtual device name (alphanumerical, '@', '-', max 10 chars)
    - name: serial
      type: string
      description: Serial number to associate

- id: device_power_set
  label: Set Device Power
  kind: action
  params:
    - name: vdn
      type: string
      description: Virtual device name
    - name: value
      type: integer
      description: 0 = off, 1 = on

- id: device_power_get
  label: Get Device Power
  kind: action
  params:
    - name: vdn
      type: string

- id: device_mute_set
  label: Set Device Channel Mute
  kind: action
  params:
    - name: vdn
      type: string
    - name: channel
      type: string
      description: Channel A, B, C, D, E, F, G, or H
    - name: value
      type: integer
      description: 0 = unmute, 1 = mute

- id: device_mute_get
  label: Get Device Channel Mute
  kind: action
  params:
    - name: vdn
      type: string
    - name: channel
      type: string

- id: device_mute_status
  label: Get Device Mute Status (all channels)
  kind: action
  params:
    - name: vdn
      type: string

- id: device_status
  label: Get Device Status
  kind: action
  params:
    - name: vdn
      type: string
```

## Feedbacks
```yaml
- id: subnet_power_state
  label: Subnet Power State
  type: enum
  values:
    - 0  # all off
    - 1  # all on
    - 2  # mixed
    - 3  # in transition

- id: subnet_mute_state
  label: Subnet Mute State
  type: enum
  values:
    - 0  # unmute
    - 1  # muted

- id: subnet_statusok
  label: Subnet Status OK
  type: enum
  values:
    - 0  # faults present
    - 1  # no faults

- id: subnet_status
  label: Subnet Status Reply
  type: string
  description: >
    Whitespace-separated: subnet_number device_count mute_state loop_state
    GPI1 GPI2 GPI3 power_status fault_present [fault_vdn_list]

- id: subnet_serial_at_pos
  label: Subnet Serial at Position Reply
  type: string

- id: subnet_vdn_reply
  label: Subnet VDN Reply
  type: string
  description: "VDN serial_number space-separated. '*' means unassigned."

- id: device_power_state
  label: Device Power State
  type: enum
  values:
    - 0  # desired off
    - 1  # desired on

- id: device_mute_state
  label: Device Channel Mute State
  type: enum
  values:
    - 0  # unmute
    - 1  # muted

- id: device_mute_status_all
  label: Device Mute Status All Channels
  type: string
  description: "8 values (A-H) space-separated. 0=unmute, 1=mute."

- id: device_status_reply
  label: Device Status Reply
  type: string
  description: >
    fault_flag power_warning PAL_active [channel_data...] each channel:
    attenuation_dB VPL_flag CPL_flag VHF_fault DC_fault
    load_short_fault temp_fault high_imp_warning temp_warning

- id: error
  label: Error Reply
  type: string
  description: "'ERROR! <message>' format. Messages: parse error, VDN not found, device not found, Device Control connected, channel out of range, internal error."
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond VDN table management
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
VDN format: up to 10 alphanumerical chars, '@' and '-' allowed. Whitespace and 'Subnet' forbidden. Serial number associates to one VDN only. Up to 60 VDNs per bridge. Source recommends static IP for fixed installs.

Message format: `AddressContext.Parameter = value` (set) or `AddressContext.Parameter ?` (get). Reply to set = same as get reply. All strings case-insensitive, terminated CR+LF.

Subnet power transition: reply may be "In transition" (value 3) while devices change state.

Error format: `ERROR! <description>`. Possible errors: parse failure, VDN does not exist, Device not found, Device Control connected, channel out of range, internal error code.

<!-- UNRESOLVED: power-on sequencing not described -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: physical connection type (ethernet port) not stated -->

## Provenance

```yaml
source_domains:
  - prodgsystems.com
source_urls:
  - "https://prodgsystems.com/public/pdf/119_Third%20party%20integration%20protocol.pdf"
retrieved_at: 2026-04-30T04:36:28.729Z
last_checked_at: 2026-04-25T20:54:49.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:54:49.416Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions matched source commands with correct semantics; transport (TCP port 65010, no auth) verified; source catalogue fully covered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings or interlock procedures in source"
- "no discrete settable parameters beyond VDN table management"
- "no unsolicited event notifications described in source"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "power-on sequencing not described"
- "firmware compatibility range not stated"
- "physical connection type (ethernet port) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
