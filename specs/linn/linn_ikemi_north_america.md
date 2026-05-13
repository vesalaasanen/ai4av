---
spec_id: admin/linn-ikemi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Ikemi Control Spec"
manufacturer: Linn
model_family: "Ikemi (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Ikemi (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
retrieved_at: 2026-04-30T04:32:36.626Z
last_checked_at: 2026-04-23T08:06:15.850Z
generated_at: 2026-04-23T08:06:15.850Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:06:15.850Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched verbatim in source; baud_rate 9600 and serial protocol confirmed; comprehensive command coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Linn Ikemi Control Spec

## Summary
Linn Ikemi CD player with RS-232 ASCII control interface. Slave device responding to host commands with initial and final acknowledgement sequence. Supports configurable baud rate (2400–38400, default 9600). No login/auth required.

<!-- UNRESOLVED: data_bits, parity, stop_bits not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable via $BAUD to 2400/4800/9600/19200/38400
  # UNRESOLVED: data_bits, parity, stop_bits not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: MODE?, TRACK?, INDEX?, BAUD?, etc.
- playable   # inferred: PLAY, PAUSE, STOP commands present
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: mode_query
  label: Query Mode
  kind: action
  params: []

- id: track_query
  label: Query Track
  kind: action
  params: []

- id: track_increment
  label: Increment Track
  kind: action
  params: []

- id: track_decrement
  label: Decrement Track
  kind: action
  params: []

- id: track_select
  label: Select Track
  kind: action
  params:
    - name: number
      type: integer
      description: Track number (1-based)

- id: track_total
  label: Get Total Tracks
  kind: action
  params: []

- id: index_query
  label: Query Index
  kind: action
  params: []

- id: index_increment
  label: Increment Index
  kind: action
  params: []

- id: index_decrement
  label: Decrement Index
  kind: action
  params: []

- id: index_select
  label: Select Index
  kind: action
  params:
    - name: number
      type: integer
      description: Index number

- id: intro_query
  label: Query Intro Status
  kind: action
  params: []

- id: intro_start
  label: Start Intro Play
  kind: action
  params: []

- id: intro_stop
  label: Stop Intro Play
  kind: action
  params: []

- id: search_backward
  label: Search Backward
  kind: action
  params: []

- id: search_forward
  label: Search Forward
  kind: action
  params: []

- id: search_stop
  label: Stop Search
  kind: action
  params: []

- id: digital_query
  label: Query Digital Output
  kind: action
  params: []

- id: digital_enable
  label: Enable Digital Output
  kind: action
  params: []

- id: digital_disable
  label: Disable Digital Output
  kind: action
  params: []

- id: random_query
  label: Query Random Mode
  kind: action
  params: []

- id: random_enable
  label: Enable Random Mode
  kind: action
  params: []

- id: random_disable
  label: Disable Random Mode
  kind: action
  params: []

- id: shuffle_query
  label: Query Shuffle Mode
  kind: action
  params: []

- id: shuffle_enable
  label: Enable Shuffle Mode
  kind: action
  params: []

- id: shuffle_disable
  label: Disable Shuffle Mode
  kind: action
  params: []

- id: program_query
  label: Query Program Status
  kind: action
  params: []

- id: program_include
  label: Program Include Tracks
  kind: action
  params:
    - name: tracks
      type: integer[]
      description: Track numbers to include

- id: program_exclude
  label: Program Exclude Tracks
  kind: action
  params:
    - name: tracks
      type: integer[]
      description: Track numbers to exclude

- id: program_clear
  label: Clear Program
  kind: action
  params: []

- id: repeat_query
  label: Query Repeat Status
  kind: action
  params: []

- id: repeat_enable
  label: Enable Repeat
  kind: action
  params: []

- id: repeat_disable
  label: Disable Repeat
  kind: action
  params: []

- id: repeat_begin
  label: Mark Repeat Start
  kind: action
  params: []

- id: repeat_end
  label: Mark Repeat End
  kind: action
  params: []

- id: ir_enable
  label: Enable IR Control
  kind: action
  params: []

- id: ir_disable
  label: Disable IR Control
  kind: action
  params: []

- id: ir_query
  label: Query IR Status
  kind: action
  params: []

- id: id_write
  label: Write Product ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Product identifier (max 20 chars)

- id: id_remove
  label: Remove Product ID
  kind: action
  params:
    - name: identifier
      type: string

- id: id_query
  label: Query Product ID
  kind: action
  params: []

- id: gid_write
  label: Write Group ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Group identifier (max 20 chars)

- id: gid_remove
  label: Remove Group ID
  kind: action
  params:
    - name: identifier
      type: string

- id: gid_query
  label: Query Group IDs
  kind: action
  params: []

- id: baud_set
  label: Set Baud Rate
  kind: action
  params:
    - name: baudrate
      type: integer
      description: 2400, 4800, 9600, 19200, or 38400

- id: baud_query
  label: Query Baud Rate
  kind: action
  params: []

- id: reset
  label: Reset
  kind: action
  params: []

- id: echo
  label: Echo
  kind: action
  params:
    - name: text
      type: string
      description: Text to echo back

- id: poll_start
  label: Poll Start
  kind: action
  params: []

- id: poll_id
  label: Poll ID
  kind: action
  params: []

- id: poll_sleep
  label: Poll Sleep
  kind: action
  params:
    - name: dest_id
      type: string
      description: Destination product ID

- id: poll_done
  label: Poll Done
  kind: action
  params: []

- id: status
  label: Status
  kind: action
  params: []

- id: command_help
  label: Command Help
  kind: action
  params:
    - name: command
      type: string
      description: Command name to get help on

- id: list_commands
  label: List Commands
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: play_state
  type: enum
  values: [PLAYING, PAUSED, STOPPED, NODISC]
  description: Playback state

- id: track_number
  type: integer
  description: Current track number

- id: index_number
  type: integer
  description: Current index number

- id: total_tracks
  type: integer
  description: Total tracks on disc

- id: digital_output
  type: enum
  values: [ON, OFF]
  description: Digital audio output state

- id: random_mode
  type: enum
  values: [ON, OFF, NODISC]

- id: shuffle_mode
  type: enum
  values: [ON, OFF, NODISC]

- id: program_state
  type: enum
  values: [OFF, INCLUDE, EXCLUDE, NODISC]

- id: repeat_mode
  type: enum
  values: [ON, OFF, BADREPEAT]

- id: ir_enabled
  type: enum
  values: [ON, OFF]

- id: intro_state
  type: enum
  values: [PLAY, STOP, NODISC]

- id: search_state
  type: enum
  values: [NODISC, BADSEARCH]

- id: device_status
  type: integer
  description: Status code from last command

- id: error_code
  type: integer
  description: Error code (00=no error, 01-47 general; 48-55 product-specific)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters - all commands handled via Actions
```

## Events
```yaml
# UNRESOLVED: device is RS-232 slave - no unsolicited events defined in source
```

## Macros
```yaml
# Polling sequence (documented in source):
# $POLL START$ → $POLL ID$ → @dest_id@ $POLL SLEEP$ (repeat for each device) → $POLL DONE$
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Device acts as RS-232 slave; host must send command before any response. Initial response within 10ms. Message format: `(Source_ID)(Group_ID)(Destination_ID) !response NL`. Identifiers optional per section 1.3 rules. Power-up message `!$IKEMI$` sent when PAUSE pressed during power-on. All products in group mode suppress acknowledgements to avoid reply clash.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: data_bits, parity, stop_bits not stated in source -->
<!-- UNRESOLVED: TCP/IP support not mentioned — serial only -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
retrieved_at: 2026-04-30T04:32:36.626Z
last_checked_at: 2026-04-23T08:06:15.850Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:06:15.850Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched verbatim in source; baud_rate 9600 and serial protocol confirmed; comprehensive command coverage verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
