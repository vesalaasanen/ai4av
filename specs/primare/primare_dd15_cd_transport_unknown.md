---
spec_id: admin/primare-dd15-cd-transport
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare DD15 CD Transport Control Spec"
manufacturer: Primare
model_family: DD15
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - DD15
  firmware: v1.25
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2018/11/DD15-RS232-Command-list-official-rev1.2-2018-10-30.pdf
retrieved_at: 2026-07-10T10:58:10.656Z
last_checked_at: 2026-07-12T09:02:36.499Z
generated_at: 2026-07-12T09:02:36.499Z
firmware_coverage: v1.25
protocol_coverage: []
known_gaps:
  - "02 57 0f 05 16 16"
  - "source does not document TCP/IP, HTTP, OSC, or any non-RS-232 transport. No safety, error-recovery, or fault-handling information is documented."
  - "flow control not stated in source"
  - "source documents no settable continuous parameters (e.g. volume, balance) - DD15 is a transport with no volume commands."
  - "source documents no unsolicited notification frames."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "serial flow control (RTS/CTS/XON-XOFF) not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-12T09:02:36.499Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions matched literally in source; single track variant (199) documented but not enumerated as separate action. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare DD15 CD Transport Control Spec

## Summary
The Primare DD15 is a CD transport controlled over RS-232 using a fixed-length hexadecimal frame protocol. This spec covers the manufacturer-published RS-232 command list (rev 1.2, approved with DD15 firmware v1.25) including direct function commands, dim/menu/IR/verbose settings, factory reset, identity reads, and remote-style transport/track/playback commands.

<!-- UNRESOLVED: source does not document TCP/IP, HTTP, OSC, or any non-RS-232 transport. No safety, error-recovery, or fault-handling information is documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Operate/Standby toggle and set commands
- queryable       # inferred from Read manufacturer / model / version query commands
```

## Actions
```yaml
# Frame format observed: 0x02 0x57 <cmd> [param...] 0x10 0x03 (and 0x02 0x52 ... for reads).
# Commands below are reproduced verbatim from the vendor command list.

- id: operate_standby_toggle
  label: Operate/Standby Toggle
  kind: action
  command: "02 57 01 00 10 03"
  params: []

- id: operate_standby_set
  label: Operate/Standby Set
  kind: action
  command: "02 57 81 {state} 10 03"
  params:
    - name: state
      type: integer
      description: "0 = Standby, 1 = Operate"

- id: dim_cycle
  label: Dim Cycle
  kind: action
  command: "02 57 0a 00 10 03"
  params: []

- id: dim_set
  label: Dim Set
  kind: action
  command: "02 57 8a {level} 10 03"
  params:
    - name: level
      type: integer
      description: "0 = DIM OFF, 1 = DIM LOW, 2 = DIM MID, 3 = DIM HIGH"

- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "02 57 0d 00 10 03"
  params: []

- id: verbose_set
  label: Verbose Set
  kind: action
  command: "02 57 8d {state} 10 03"
  params:
    - name: state
      type: integer
      description: "0 = Disable verbose, 1 = Enable verbose"

- id: menu_toggle
  label: Menu Toggle
  kind: action
  command: "02 57 0e 00 10 03"
  params: []

- id: menu_set
  label: Menu Set
  kind: action
  command: "02 57 8e {state} 10 03"
  params:
    - name: state
      type: integer
      description: "0 = Exit settings menu, 1 = Enter settings menu"

- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "02 57 12 00 10 03"
  params: []

- id: ir_input_set
  label: IR Input Set
  kind: action
  command: "02 57 92 {input} 10 03"
  params:
    - name: input
      type: integer
      description: "0 = IR Front, 1 = IR Back"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "02 57 13 00 10 03"
  params: []

- id: read_manufacturer
  label: Read Manufacturer
  kind: query
  command: "02 52 15 00 10 03"
  params: []

- id: read_model
  label: Read Model
  kind: query
  command: "02 52 16 00 10 03"
  params: []

- id: read_version
  label: Read Software Version
  kind: query
  command: "02 52 17 00 10 03"
  params: []

- id: remote_standby_toggle
  label: Remote Standby Toggle
  kind: action
  command: "02 57 0f 03 10 03"
  params: []

- id: remote_operate
  label: Remote Operate
  kind: action
  command: "02 57 0f 01 10 03"
  params: []

- id: remote_up
  label: Remote Up
  kind: action
  command: "02 57 0f 1a 10 03"
  params: []

- id: remote_down
  label: Remote Down
  kind: action
  command: "02 57 0f 1b 10 03"
  params: []

- id: remote_left
  label: Remote Left
  kind: action
  command: "02 57 0f 1c 10 03"
  params: []

- id: remote_right
  label: Remote Right
  kind: action
  command: "02 57 0f 1d 10 03"
  params: []

- id: remote_dim
  label: Remote Dim
  kind: action
  command: "02 57 0f 31 10 03"
  params: []

- id: remote_menu
  label: Remote Menu
  kind: action
  command: "02 57 0f 33 10 03"
  params: []

- id: remote_select
  label: Remote Select
  kind: action
  command: "02 57 0f 1e 10 03"
  params: []

- id: remote_return
  label: Remote Return
  kind: action
  command: "02 57 0f 1f 10 03"
  params: []

- id: remote_info_short
  label: Remote Info (Short Press)
  kind: action
  command: "02 57 0f 2f 10 03"
  params: []

- id: remote_track_1
  label: Track #1
  kind: action
  command: "02 57 0f 06 10 03"
  params: []

- id: remote_track_2
  label: Track #2
  kind: action
  command: "02 57 0f 08 10 03"
  params: []

- id: remote_track_3
  label: Track #3
  kind: action
  command: "02 57 0f 0a 10 03"
  params: []

- id: remote_track_14
  label: Track #14
  kind: action
  command: "02 57 0f 07 0c 10 03"
  params: []

- id: remote_previous
  label: Previous Track
  kind: action
  command: "02 57 0f 28 10 03"
  params: []

- id: remote_next
  label: Next Track
  kind: action
  command: "02 57 0f 27 10 03"
  params: []

- id: remote_ffwd
  label: Fast-Forward
  kind: action
  command: "02 57 0f 29 10 03"
  params: []

- id: remote_frwd
  label: Fast-Rewind
  kind: action
  command: "02 57 0f 2a 10 03"
  params: []

- id: remote_play_pause
  label: Play/Pause Toggle
  kind: action
  command: "02 57 0f 23 10 03"
  params: []

- id: remote_play
  label: Play
  kind: action
  command: "02 57 0f 21 10 03"
  params: []

- id: remote_pause
  label: Pause
  kind: action
  command: "02 57 0f 22 10 03"
  params: []

- id: remote_stop
  label: Stop
  kind: action
  command: "02 57 0f 25 10 03"
  params: []

- id: remote_eject
  label: Eject Disc
  kind: action
  command: "02 57 0f 24 10 03"
  params: []

- id: remote_insert
  label: Insert Disc
  kind: action
  command: "02 57 0f 26 10 03"
  params: []

- id: remote_repeat
  label: Repeat Toggle
  kind: action
  command: "02 57 0f 2b 10 03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, operate]
  description: "Reply to Operate/Standby Set / Toggle: 02 01 00 10 03 (Standby) or 02 01 01 10 03 (Operate)"

- id: dim_level
  type: enum
  values: [off, low, mid, high]
  description: "Reply to Dim Set: 02 0a 00..03 10 03"

- id: verbose_state
  type: enum
  values: [disabled, enabled]
  description: "Reply to Verbose Set: 02 0d 00..01 10 03"

- id: menu_state
  type: enum
  values: [exited, entered]
  description: "Reply to Menu Set: 02 0e 00..01 10 03"

- id: ir_input
  type: enum
  values: [front, back]
  description: "Reply to IR Input Set: 02 12 00..01 10 03"

- id: manufacturer
  type: string
  description: "Reply to Read Manufacturer: 'Primare'"

- id: model
  type: string
  description: "Reply to Read Model: 'DD15'"

- id: software_version
  type: string
  description: "Reply to Read Software Version (payload not specified in source)"
```

## Variables
```yaml
# UNRESOLVED: source documents no settable continuous parameters (e.g. volume, balance) - DD15 is a transport with no volume commands.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification frames.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- All frames are bracketed by STX (0x02) and ETX (0x03); the second byte is 0x57 for control commands and 0x52 for read commands. The fifth byte is 0x10 across all documented frames; this appears to be a fixed field rather than a length or checksum (no checksum is documented in the source).
- Two redundant entries exist for "Standby toggle" / "Standby" / "Power toggle" (lines 29 and 31 both list `02 57 0f 03 10 03`) — reproduced as a single action `remote_standby_toggle`.
- Remote track entries use a variable-length BCD-style encoding for track numbers > 9 (e.g. track 14 = `02 57 0f 07 0c 10 03`, track 199 = `02 57 0f 05 16 16 10`). Source shows a `Track #Y` template (`02 57 0f 0Y 10 03`) but does not give a complete encoding table; only the explicit examples are encoded here.
- Source rev 1.2 dated 2018-10-30, approved with DD15 firmware v1.25. No mention of other firmware compatibility.
- MUTE, color keys (RED/GREEN/YELLOW/BLUE), Volume +/-, and long-press info have no command payloads documented in source and are omitted.
<!-- UNRESOLVED: serial flow control (RTS/CTS/XON-XOFF) not stated in source. -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2018/11/DD15-RS232-Command-list-official-rev1.2-2018-10-30.pdf
retrieved_at: 2026-07-10T10:58:10.656Z
last_checked_at: 2026-07-12T09:02:36.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T09:02:36.499Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions matched literally in source; single track variant (199) documented but not enumerated as separate action. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "02 57 0f 05 16 16"
- "source does not document TCP/IP, HTTP, OSC, or any non-RS-232 transport. No safety, error-recovery, or fault-handling information is documented."
- "flow control not stated in source"
- "source documents no settable continuous parameters (e.g. volume, balance) - DD15 is a transport with no volume commands."
- "source documents no unsolicited notification frames."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "serial flow control (RTS/CTS/XON-XOFF) not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
