---
schema_version: ai4av-public-spec-v1
device_id: pesa-switching-systems/2400e-controller
entity_id: pesa_switching_systems_premiere_north_america
spec_id: admin/pesa-switching-systems-premiere
revision: 1
author: admin
title: "Pesa Switching Systems Premiere Control Spec"
status: published
manufacturer: "Pesa Switching Systems"
manufacturer_key: pesa-switching-systems
model_family: "2400E Controller"
aliases: []
compatible_with:
  manufacturers:
    - "Pesa Switching Systems"
  models:
    - "2400E Controller"
    - "3300 Controller (EX, S, D, SE)"
    - "3500 Controller (EX, S, D, SE)"
    - "3500Plus Controller (EX, S, D, SE)"
    - "6600E/EX Controller"
    - "Bobcat Control System"
    - "Ocelot Control System"
    - "LNS-8 Control System"
    - "PCI Interface for RC5000 Systems"
    - "RC5000 Controller"
    - "RC5500 Controller"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: pesa_switching_systems_premiere_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:43:51.498Z
retrieved_at: 2026-04-25T21:43:51.498Z
last_checked_at: 2026-04-25T21:43:51.498Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:43:51.498Z
  matched_actions: 15
  action_count: 15
  confidence: low
  summary: "All 15 spec actions matched literals in source; all transport parameters verified; complete CPU Link Protocol No. 1 coverage"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Pesa Switching Systems Premiere Control Spec

## Summary
CPU Link Protocol No. 1 (P1) for PESA routing switch controllers. RS-232 serial interface with ASCII command/response protocol supporting matrix crosspoint switching, salvo management, lock/protect status, and full switcher status queries. Covers 2400E, 3300, 3500, 3500Plus, 6600E/EX, Bobcat, Ocelot, LNS-8, PCI-5000, RC5000, and RC5500 controllers.

<!-- UNRESOLVED: TCP/IP or other network transport not covered in source — some controllers may support it but it is not documented here -->
<!-- UNRESOLVED: Protocol extensions (P1E) for 3300/3500/3500Plus are mentioned but not detailed -->
<!-- UNRESOLVED: RS-422 multi-drop addressing details partially covered but not fully specified for all controllers -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: rts_cts
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred from switcher change/routing commands (H, T, All Call)
- queryable   # inferred from status query commands (J, Y, Z, W)
```

## Actions
```yaml
- id: change_switcher
  label: Change Switcher
  kind: action
  params:
    - name: destination
      type: integer
      description: "Output/Destination number (3 ASCII digits, 001-999 or A00-J99 for 1000-1999)"
    - name: levels
      type: array
      description: "Source numbers per level (3 ASCII digits each, one per configured level; 000 = NULL/no action)"
  command_format: "H DST L1 L2 L3 L4 CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error"
    L: "Destination was locked"
    N: "Invalid destination number"
  notes: "All configured levels must be specified. Break-away switching supported by using NULL (000) or out-of-range source on levels not to be switched."

- id: all_call
  label: All Call
  kind: action
  params:
    - name: levels
      type: array
      description: "Source numbers per level - switches ALL destinations to specified sources per level"
  command_format: "T L1 L2 L3 L4 CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error"
    N: "Format error"
  notes: "Matrix stays in All Call until a change switcher or restore command is sent. Not supported by RC5000, RC5500, Ocelot, LNS-8, Bobcat."

- id: restore_all_call
  label: Restore System From All Call
  kind: action
  params: []
  command_format: "R CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error"
  notes: "Restores matrix to last status before All Call. Not supported by RC5000, RC5500, Ocelot, LNS-8, Bobcat."

- id: change_lock
  label: Change Lock Status
  kind: action
  params:
    - name: destination
      type: integer
      description: "Output/Destination number (3 ASCII digits)"
  command_format: "L S DST CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error"
    L: "Destination was locked by equal or higher priority device (3300, 3500, RC5000, RC5500 only)"
    N: "Invalid destination number"
    P: "Destination was protected by equal or higher priority device (3300, 3500 only)"
  notes: "Toggles lock state. Not all controllers support the P response."

- id: change_protect
  label: Change Protect Status
  kind: action
  params:
    - name: destination
      type: integer
      description: "Output/Destination number (3 ASCII digits)"
  command_format: "P S DST CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error"
    L: "Destination was locked by equal or higher priority device"
    N: "Invalid destination number"
    P: "Destination was protected by equal or higher priority device"
  notes: "Toggles protect state. Not supported by 6600E/EX, RC5000, PCI-5000, Ocelot, LNS-8, Bobcat, RC5500."

- id: change_salvo_entry
  label: Change Salvo Entry
  kind: action
  params:
    - name: salvo_group
      type: integer
      description: "Salvo group number (2 ASCII digits, 01-99 or A0-E9+ for 100+)"
    - name: destination
      type: integer
      description: "Output/Destination number (3 ASCII digits)"
    - name: levels
      type: array
      description: "Source numbers per level (3 ASCII digits each)"
  command_format: "C SLV S DST L1 L2 L3 L4 CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error, invalid salvo number, or invalid format"
    N: "Invalid destination number"
  notes: "Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: delete_salvo_entry
  label: Delete Salvo Entry
  kind: action
  params:
    - name: salvo_group
      type: integer
      description: "Salvo group number (2 ASCII digits)"
    - name: destination
      type: integer
      description: "Output/Destination number (3 ASCII digits)"
  command_format: "D SLV S DST CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error, invalid salvo number, or invalid destination number"
  notes: "Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: de_allocate_salvo_group
  label: De-Allocate Salvo Group
  kind: action
  params:
    - name: salvo_group
      type: integer
      description: "Salvo group number (2 ASCII digits)"
  command_format: "F SLV CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error or invalid salvo number"
  notes: "Removes entire salvo group from controller memory. Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: transmit_salvo_group
  label: Transmit Salvo Group
  kind: action
  params:
    - name: salvo_group
      type: integer
      description: "Salvo group number (2 ASCII digits)"
  command_format: "V SLV CS CR LF"
  response:
    G: "Command accepted and performed"
    E: "Transmission error or invalid salvo number"
  notes: "Fires a pre-loaded salvo. Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."
```

## Feedbacks
```yaml
- id: display_switcher_status
  label: Display Switcher Status (No Error Info)
  type: string
  command_format: "J CS CR LF"
  response_format: "L1 L2 L3 L4 … L1 L2 L3 L4 CS CR LF"
  description: "Returns full matrix status - source numbers per level grouped by destination. No readback/confidence error information included."
  notes: "3300/3500 reject requests where response would exceed 2KB."

- id: send_switcher_status_single
  label: Send Switcher Status (Single Destination)
  type: string
  command_format: "Y DST CS CR LF"
  response_format: "DST STAT L1 L2 L3 L4 CS CR LF"
  description: "Returns status of a single destination with readback/confidence error info in STAT field."
  notes: "Always returns minimum of two levels. STAT field uses 2-char ASCII (0x30-0x3F) encoding per level pair."

- id: send_switcher_status_all
  label: Send Switcher Status (All Destinations)
  type: string
  command_format: "Z CS CR LF"
  response_format: "DST1 STAT L1 L2 L3 L4 … DSTn STAT L1 L2 L3 L4 CS CR LF"
  description: "Returns full matrix status with readback/confidence error info per crosspoint."
  notes: "3300/3500 reject requests where response would exceed 2KB. Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: display_salvo
  label: Display Salvo
  type: string
  command_format: "B SLV CS CR LF"
  response_format: "S DST L1 L2 L3 L4 … S DST L1 L2 L3 L4 CS CR LF"
  description: "Returns salvo table entries for specified salvo group."
  notes: "Not supported by RC5000, RC5500, 2400E, Ocelot, LNS-8, Bobcat."

- id: display_lock_status
  label: Display Lock/Protect Status
  type: string
  command_format: "W S CS CR LF"
  response_format: "X X X … X CS CR LF"
  description: "Returns lock/protect status for all destinations. Each byte: 0=unlocked, 1=locked, 2=protected."
  notes: "S portion of command is optional (W CS CR LF). Not all controllers support protect concept."

- id: reply_response
  label: Reply Response Codes
  type: enum
  values:
    - E: "Error in transmission"
    - G: "Good transmission"
    - L: "Locked destinations"
    - N: "Requested function not allowed or equipment malfunction"
    - P: "Protected destination"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (e.g. volume, gain) found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source - controller only responds to queries
```

## Macros
```yaml
- id: salvo_macro
  label: Salvo Operations
  description: "Multi-step salvo sequences: change individual entries (C), display salvo table (B), transmit/fire salvo (V), delete entry (D), de-allocate entire group (F). Salvo groups are pre-loaded switching presets."
  # UNRESOLVED: specific salvo preset contents are controller-dependent and not documented in this protocol spec
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- **Checksum**: Two ASCII characters computed by summing ASCII codes of all preceding bytes, taking mod 256, then splitting into upper/lower nibbles each offset by 48 (ASCII '0'). Example: `H 0 0 1 0 0 5` → checksum `6 >`.
- **Terminator**: CR (0x0D) + LF (0x0A). Some controllers (6600E/EX v2.30+, 3300 v3.0+, all 3500/3500Plus) allow configurable terminators (CR-only, LF-only, or CR+LF).
- **Flow control**: RTS/CTS hardware flow control. Bobcat, LNS-8, and Ocelot do not use flow control. The external computer must accept their output without regulation.
- **DSR requirement**: 3300, 3500, and 3500Plus require DSR input pin to be active; removing it resets the CPU link port.
- **RS-422 multi-drop**: Bobcat, LNS-8, and Ocelot support RS-422 multi-drop by prepending a controller address (ASCII numeric) before each command. No address in response. Flow control is disabled in multi-drop mode.
- **Virtual matrix mapping**: Some controllers (RC5000, RC5500, 3300, 3500, 3500Plus) use source/destination groups rather than physical inputs/outputs. Non-existent destinations return status "000".
- **Level count**: Commands must specify all configured levels. Fewer levels causes an error; extra levels are ignored.
- **Post-command timing**: After a change switcher command, wait at least 32ms before requesting status on 6600E, RC5000, RC5500, and PCI5000 controllers.
- **Hex checksum option**: 3300 v3.0+, and all 3500/3500Plus releases support standard hex checksum and checksum omission.

<!-- UNRESOLVED: RS-422 pin-out and cabling details not provided — refer to equipment-specific manuals -->
<!-- UNRESOLVED: P1E (Protocol 1 with Extensions) commands for 3300/3500/3500Plus are listed as reserved and not documented -->
<!-- UNRESOLVED: specific privilege/user-level system for lock/protect is mentioned but not detailed -->
<!-- UNRESOLVED: controller address range for RS-422 multi-drop not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: pesa_switching_systems_premiere_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:43:51.498Z
retrieved_at: 2026-04-25T21:43:51.498Z
last_checked_at: 2026-04-25T21:43:51.498Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:43:51.498Z
matched_actions: 15
action_count: 15
confidence: low
summary: "All 15 spec actions matched literals in source; all transport parameters verified; complete CPU Link Protocol No. 1 coverage"
```

## Known Gaps

```yaml
[]
```
