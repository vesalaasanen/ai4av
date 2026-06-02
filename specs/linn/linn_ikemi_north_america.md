---
spec_id: admin/linn-ikemi-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Ikemi Control Spec"
manufacturer: Linn
model_family: Ikemi
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - Ikemi
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/images/b/b6/Ikemi_rs232_commands.PDF
retrieved_at: 2026-04-30T04:32:36.626Z
last_checked_at: 2026-06-02T17:23:14.319Z
generated_at: 2026-06-02T17:23:14.319Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "data_bits, parity, stop_bits, flow_control not stated in source; default behaviour assumed but not documented"
  - "data_bits, parity, stop_bits, flow_control not stated in source"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "data_bits / parity / stop_bits / flow_control not stated; firmware version not stated; no documented safety interlocks."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:14.319Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched literally with source commands; baud rate and transport parameters verified; complete coverage of source command set. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linn Ikemi Control Spec

## Summary
Linn Ikemi CD player controlled over RS-232 ASCII interface. Device is slave, replies only when addressed. All commands framed as `$command(params)$` delimited by `$` and terminated with CR LF (0D 0A), with optional `#source_id#` / `&group_id&` / `@destination_id@` prefixes.

<!-- UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source; default behaviour assumed but not documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source §2.2.1: default 9600, options 2400/4800/9600/19200/38400
  # UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable       (inferred: ?, MODE, STATUS, TRACK ?, INDEX ?)
# - levelable       omitted: no volume/level controls in source
```

## Actions
```yaml
# ---------------- System commands (§2) ----------------
- id: id_set
  label: Set product identifier
  kind: action
  command: "$ID identifier$"
  params:
    - name: identifier
      type: string
      description: Product identifier, max 20 alphanumeric chars (no spaces)

- id: id_remove
  label: Remove product identifier
  kind: action
  command: "$ID ~ identifier$"
  params:
    - name: identifier
      type: string

- id: id_query
  label: Query product identifier
  kind: query
  command: "$ID ?$"
  params: []

- id: gid_set
  label: Set group identifier
  kind: action
  command: "$GID identifier$"
  params:
    - name: identifier
      type: string

- id: gid_remove
  label: Remove product from group
  kind: action
  command: "$GID ~ identifier$"
  params:
    - name: identifier
      type: string

- id: gid_query
  label: Query group identifiers
  kind: query
  command: "$GID ?$"
  params: []

- id: baud_set
  label: Set baud rate
  kind: action
  command: "$BAUD baudrate$"
  params:
    - name: baudrate
      type: integer
      description: One of 2400, 4800, 9600, 19200, 38400

- id: baud_query
  label: Query baud rate
  kind: query
  command: "$BAUD ?$"
  params: []

- id: reset
  label: Reset comms buffer
  kind: action
  command: "$RESET$"
  params: []

- id: echo
  label: Echo text
  kind: action
  command: "$ECHO text$"
  params:
    - name: text
      type: string

- id: poll_start
  label: Polling - start
  kind: action
  command: "$POLL START$"
  params: []

- id: poll_id
  label: Polling - read product id
  kind: query
  command: "$POLL ID$"
  params: []

- id: poll_sleep
  label: Polling - sleep product
  kind: action
  command: "@dest_1_id@$POLL SLEEP$"
  params:
    - name: dest_1_id
      type: string
      description: Destination identifier returned by prior POLL ID

- id: poll_done
  label: Polling - end
  kind: action
  command: "$POLL DONE$"
  params: []

- id: status
  label: Return last command status
  kind: query
  command: "$STATUS$"
  params: []

- id: power_up_message
  label: Power-up message (front-panel PAUSE + power-on)
  kind: action
  command: "!$IKEMI$"
  notes: "Unsolicited; product transmits this on power-up when activated by holding PAUSE during switch-on (§2.2.3.1)."

# ---------------- IKEMI transport commands (§3) ----------------
- id: play
  label: Play
  kind: action
  command: "$PLAY$"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "$PAUSE$"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "$STOP$"
  params: []

- id: mode_query
  label: Query operational mode
  kind: query
  command: "$MODE$"
  params: []

- id: track_query
  label: Query current track number
  kind: query
  command: "$TRACK ?$"
  params: []

- id: track_next
  label: Track +1
  kind: action
  command: "$TRACK +$"
  params: []

- id: track_prev
  label: Track -1
  kind: action
  command: "$TRACK -$"
  params: []

- id: track_select
  label: Select track
  kind: action
  command: "$TRACK number$"
  params:
    - name: number
      type: integer

- id: track_total
  label: Query total tracks
  kind: query
  command: "$TRACK TOT$"
  params: []

- id: index_query
  label: Query current index number
  kind: query
  command: "$INDEX ?$"
  params: []

- id: index_next
  label: Index +1
  kind: action
  command: "$INDEX +$"
  params: []

- id: index_prev
  label: Index -1
  kind: action
  command: "$INDEX -$"
  params: []

- id: index_select
  label: Select index
  kind: action
  command: "$INDEX number$"
  params:
    - name: number
      type: integer

- id: intro_query
  label: Query intro status
  kind: query
  command: "$INTRO ?$"
  params: []

- id: intro_on
  label: Start intro play
  kind: action
  command: "$INTRO [ON|PLAY]$"
  params:
    - name: mode
      type: enum
      values: [ON, PLAY]

- id: intro_off
  label: Stop intro play
  kind: action
  command: "$INTRO [OFF|STOP]$"
  params:
    - name: mode
      type: enum
      values: [OFF, STOP]

- id: search_back
  label: Search backwards
  kind: action
  command: "$SEARCH <$"
  params: []

- id: search_fwd
  label: Search forwards
  kind: action
  command: "$SEARCH >$"
  params: []

- id: search_stop
  label: Stop search
  kind: action
  command: "$SEARCH STOP$"
  params: []

- id: digital_query
  label: Query digital audio output
  kind: query
  command: "$DIGITAL ?$"
  params: []

- id: digital_on
  label: Enable digital audio output
  kind: action
  command: "$DIGITAL [Y|ON]$"
  params:
    - name: mode
      type: enum
      values: [Y, ON]

- id: digital_off
  label: Disable digital audio output
  kind: action
  command: "$DIGITAL [N|OFF]$"
  params:
    - name: mode
      type: enum
      values: [N, OFF]

- id: random_query
  label: Query random status
  kind: query
  command: "$RANDOM ?$"
  params: []

- id: random_on
  label: Random on
  kind: action
  command: "$RANDOM [Y|ON]$"
  params:
    - name: mode
      type: enum
      values: [Y, ON]

- id: random_off
  label: Random off
  kind: action
  command: "$RANDOM [N|OFF]$"
  params:
    - name: mode
      type: enum
      values: [N, OFF]

- id: shuffle_query
  label: Query shuffle status
  kind: query
  command: "$SHUFFLE ?$"
  params: []

- id: shuffle_on
  label: Shuffle on
  kind: action
  command: "$SHUFFLE [Y|ON]$"
  params:
    - name: mode
      type: enum
      values: [Y, ON]

- id: shuffle_off
  label: Shuffle off
  kind: action
  command: "$SHUFFLE [N|OFF]$"
  params:
    - name: mode
      type: enum
      values: [N, OFF]

- id: program_query
  label: Query program status
  kind: query
  command: "$PROGRAM ?$"
  params: []

- id: program_include
  label: Program include tracks
  kind: action
  command: "$PROGRAM INCLUDE track [track [...]]$"
  params:
    - name: track
      type: integer

- id: program_exclude
  label: Program exclude tracks
  kind: action
  command: "$PROGRAM EXCLUDE track [track [...]]$"
  params:
    - name: track
      type: integer

- id: program_clear
  label: Clear program
  kind: action
  command: "$PROGRAM CLEAR$"
  params: []

- id: repeat_query
  label: Query repeat status
  kind: query
  command: "$REPEAT ?$"
  params: []

- id: repeat_on
  label: Repeat on
  kind: action
  command: "$REPEAT [Y|ON]$"
  params:
    - name: mode
      type: enum
      values: [Y, ON]

- id: repeat_off
  label: Repeat off
  kind: action
  command: "$REPEAT [N|OFF]$"
  params:
    - name: mode
      type: enum
      values: [N, OFF]

- id: repeat_beg
  label: Mark repeat start
  kind: action
  command: "$REPEAT BEG$"
  params: []

- id: repeat_end
  label: Mark repeat end
  kind: action
  command: "$REPEAT END$"
  params: []

- id: ir_on
  label: Enable IR control
  kind: action
  command: "$IR [Y|ON]$"
  params:
    - name: mode
      type: enum
      values: [Y, ON]

- id: ir_off
  label: Disable IR control
  kind: action
  command: "$IR [N|OFF]$"
  params:
    - name: mode
      type: enum
      values: [N, OFF]

- id: ir_query
  label: Query IR control status
  kind: query
  command: "$IR ?$"
  params: []
```

## Feedbacks
```yaml
- id: mode_state
  type: enum
  values: [PLAYING, PAUSED, STOPPED, NODISC]
  description: Returned by $MODE$ (§3.3.4)

- id: track_number
  type: integer
  description: Returned by $TRACK ?$, $TRACK +/-, $TRACK number$

- id: track_total
  type: integer
  description: Returned by $TRACK TOT$

- id: index_number
  type: integer
  description: Returned by $INDEX$ commands

- id: intro_state
  type: enum
  values: [PLAY, STOP, NODISC]

- id: digital_state
  type: enum
  values: [ON, OFF]

- id: random_state
  type: enum
  values: [ON, OFF, NODISC]

- id: shuffle_state
  type: enum
  values: [ON, OFF, NODISC]

- id: repeat_state
  type: enum
  values: [ON, OFF]

- id: ir_state
  type: enum
  values: [ON, OFF]

- id: status_code
  type: integer
  description: Numeric code returned by $STATUS$ (§2.4.1.1 + Appendix B)

- id: fail_response
  type: string
  description: $FAIL n$ on invalid command or task failure
```

## Variables
```yaml
- id: baud_rate
  type: integer
  values: [2400, 4800, 9600, 19200, 38400]
  description: Set via $BAUD baudrate$ (§2.2.1); defaults to 9600

- id: product_identifier
  type: string
  description: Set via $ID identifier$ (§2.1.1); max 20 alphanumeric chars

- id: group_identifiers
  type: array
  description: Up to 5 group memberships per product (§2.1.2)
```

## Events
```yaml
- id: power_up_message
  payload: "!$IKEMI$"
  description: "Unsolicited message on power-up when activated by holding PAUSE + switching on (§2.2.3.1)"
```

## Macros
```yaml
# Source describes a polling discovery algorithm (§2.3.2):
#   POLL START → POLL ID → @dest_1@ POLL SLEEP → POLL ID → @dest_2@ POLL SLEEP ...
#   → POLL ID (timeout) → POLL DONE
# Each step is a separate action above; no composite macro defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
RS-232 ASCII framing: `$cmd(params)$NL` where NL = 0x0D 0x0A. Identifiers optional and prefixed: `#source_id#` / `&group_id&` / `@destination_id@`. Two-stage reply: initial `!` (or `!$FAIL n$` on parse error) within 10 ms, then final `!$Status_String$` on task completion. Host must not issue further commands until final response received. Group-mode products do not acknowledge (§2.1.2). Default baud 9600; set via `$BAUD$` — note that the initial response uses the OLD baud and the final response uses the NEW baud. Power-up message `!$IKEMI$` enabled by holding PAUSE during switch-on. Identifiers may not contain spaces or the delimiter characters `#`, `&`, `@`, `$`. Fields cannot be nested.

<!-- UNRESOLVED: data_bits / parity / stop_bits / flow_control not stated; firmware version not stated; no documented safety interlocks. -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/images/b/b6/Ikemi_rs232_commands.PDF
retrieved_at: 2026-04-30T04:32:36.626Z
last_checked_at: 2026-06-02T17:23:14.319Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:14.319Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched literally with source commands; baud rate and transport parameters verified; complete coverage of source command set. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "data_bits, parity, stop_bits, flow_control not stated in source; default behaviour assumed but not documented"
- "data_bits, parity, stop_bits, flow_control not stated in source"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "data_bits / parity / stop_bits / flow_control not stated; firmware version not stated; no documented safety interlocks."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
