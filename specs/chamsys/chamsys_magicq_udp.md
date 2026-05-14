---
spec_id: admin/chamsys-magicq-udp
schema_version: ai4av-public-spec-v1
revision: 1
title: "ChamSys MagicQ Control Spec"
manufacturer: ChamSys
model_family: "MagicQ (UDP)"
aliases: []
compatible_with:
  manufacturers:
    - ChamSys
  models:
    - "MagicQ (UDP)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.chamsys.co.uk
  - secure.chamsys.co.uk
source_urls:
  - https://docs.chamsys.co.uk/magicq/_exports/magicq.pdf
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_network.html
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_commands.html
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_serial.html
retrieved_at: 2026-04-29T23:09:54.537Z
last_checked_at: 2026-04-30T09:38:05.971Z
generated_at: 2026-04-30T09:38:05.971Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:38:05.971Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All nine spec actions match Q-Sys plugin control features documented in source; port 6553 and UDP protocol confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# ChamSys MagicQ Control Spec

## Summary
MagicQ lighting console supports ChamSys Remote Ethernet Protocol (CREP) — a UDP/IP protocol for remote controlling playbacks, cue stacks, and 10Scene zones on MagicQ consoles and PC/Mac software. Operates on port 6553 by default in broadcast mode. Protocol also supports operation without CREP header for simpler integration.

<!-- UNRESOLVED: RS-232 serial control section not included in this source; see `remote_control_serial.html` for serial variant -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 6553  # default; can be changed in Setup > View Settings > Network > Playback Sync Port
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: playback Go/Stop commands present
- routable  # inferred: 10Scene zone selection commands present
- queryable  # inferred: Q-Sys plugin polls playback levels and zone state
```

## Actions
```yaml
- id: playback_toggle
  label: Playback Toggle
  kind: action
  params:
    - name: playback_number
      type: integer
      description: Playback number (1-10)
  description: Toggles playback between active (100%) and inactive

- id: playback_level
  label: Playback Level
  kind: action
  params:
    - name: playback_number
      type: integer
      description: Playback number (1-10)
    - name: level
      type: integer
      description: Direct level (0-100)
  description: Sets playback to specific level directly

- id: scene_toggle
  label: 10Scene Zone Toggle
  kind: action
  params:
    - name: zone
      type: integer
      description: 10Scene zone number (1-100 on MagicQ, 1-10 on QuickQ)
  description: Toggles selected 10Scene zone active/inactive

- id: scene_increase
  label: 10Scene Zone Increase
  kind: action
  params:
    - name: zone
      type: integer
      description: 10Scene zone number
  description: Increases zone level by 5%

- id: scene_decrease
  label: 10Scene Zone Decrease
  kind: action
  params:
    - name: zone
      type: integer
      description: 10Scene zone number
  description: Decreases zone level by 5%

- id: scene_level
  label: 10Scene Zone Level
  kind: action
  params:
    - name: zone
      type: integer
      description: 10Scene zone number
    - name: level
      type: integer
      description: Direct level (0-100)
  description: Sets 10Scene zone to specific level directly

- id: cuestack_toggle
  label: Cue Stack Toggle
  kind: action
  params:
    - name: stack_number
      type: integer
      description: Cue stack number (1-100)
  description: Toggles cue stack active/inactive with programmed fade times

- id: cuestack_trigger
  label: Cue Stack Trigger
  kind: action
  params:
    - name: stack_number
      type: integer
      description: Cue stack number (1-100)
  description: Triggers cue stack with programmed fade times

- id: ethernet_tx
  label: Ethernet TX (Y Macro)
  kind: action
  params:
    - name: data
      type: string
      description: ASCII data to send, or comma-separated decimal/hex values
  description: Sends raw data via UDP using Y macro format. Data encapsulated in CREP header or raw depending on Ethernet Remote Protocol setting.
```

## Feedbacks
```yaml
- id: playback_level_feedback
  label: Playback Level Feedback
  type: integer
  description: Current level of playback (0-100) returned to Q-Sys plugin on poll

- id: scene_zone_feedback
  label: 10Scene Zone State
  type: enum
  values: [active, inactive]
  description: Current state of a 10Scene zone

- id: cuestack_state_feedback
  label: Cue Stack State
  type: enum
  values: [active, inactive]
  description: Simple active/inactive state of cue stack

- id: command_ack
  label: Command Acknowledgement
  type: string
  description: Received commands ending in A-Z or a-z are acknowledged via backward sequence number in CREP header
```

## Variables
```yaml
# UNRESOLVED: discrete settable parameters not explicitly enumerated in source.
# The source describes Q-Sys plugin polling behavior but does not define
# individual variable names/addresses for direct query.
```

## Events
```yaml
# UNRESOLVED: unsolicited event emission from MagicQ not described in source.
# Q-Sys plugin uses polling rather than push events.
```

## Macros
```yaml
# Y macro (MagicQ Cue Stack Macro field) used to transmit Ethernet commands.
# Y"Hello World",10,13 - sends ASCII string with CR/LF terminators
# Y0,1,2,3,4 - sends raw byte sequence
# Y command must be sole macro in field when transmitting Ethernet data.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not found in source
```

## Notes
ChamSys Remote Ethernet Protocol is an open protocol — no permission required for own use. On MagicQ PC/Mac, protocol only enabled when connected to a MagicQ Wing or Interface (not MagicDMX). Not supported when net session mode is in use. Port changeable via Setup > View Settings > Network > Playback Sync Port. Protocol header is little-endian (CREP appears as PERC on wire). Commands are text strings ending in A–Z or a–z; spaces, tabs, and carriage returns ignored. Supports no-header mode via Ethernet Remote Protocol setting: "ChamSys Rem (rx no header)", "ChamSys Rem (tx no header)", or "ChamSys Rem (tx + rx no header)".

## Provenance

```yaml
source_domains:
  - docs.chamsys.co.uk
  - secure.chamsys.co.uk
source_urls:
  - https://docs.chamsys.co.uk/magicq/_exports/magicq.pdf
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_network.html
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_commands.html
  - https://secure.chamsys.co.uk/docs/magicq/manual/remote_control_serial.html
retrieved_at: 2026-04-29T23:09:54.537Z
last_checked_at: 2026-04-30T09:38:05.971Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:38:05.971Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All nine spec actions match Q-Sys plugin control features documented in source; port 6553 and UDP protocol confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
