---
spec_id: admin/linn-genki-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Genki Control Spec"
manufacturer: Linn
model_family: Genki
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - Genki
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
  - applicationmarket.crestron.com
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america/
  - https://docs.linn.co.uk/wiki
retrieved_at: 2026-04-26T16:30:03.751Z
last_checked_at: 2026-06-02T03:24:54.530Z
generated_at: 2026-06-02T03:24:54.530Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial framing (data bits, parity, stop bits, flow control) not stated in source"
  - "physical connector / pinout not stated in source"
  - "not stated in source"
  - "numeric range not stated in source"
  - "numeric range and sign convention not stated in source"
  - "no multi-step macro sequences explicitly defined in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "RS-232 framing details (data bits/parity/stop bits/flow control) not stated in source."
  - "physical connector type / pinout not stated in source."
  - "numeric ranges for VOL and BAL not stated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:54.530Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec actions matched literally in source; transport parameters verified; bidirectional coverage achieved. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linn Genki Control Spec

## Summary
Linn Genki CD player controlled via RS-232 ASCII protocol (Version 1.00, 28 April 1999). Commands use `$cmnd$` delimiters with CR+LF line termination and optional source/group/destination identifier framing for multi-unit daisy-chain installations. Device is slave-only: transmits only in response to host commands (except Power_Up message activated by holding PAUSE on power-on).

<!-- UNRESOLVED: serial framing (data bits, parity, stop bits, flow control) not stated in source -->
<!-- UNRESOLVED: physical connector / pinout not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default on initialisation; 2400/4800/9600/19200/38400 also supported via $BAUD$
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null     # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
framing:
  command_delimiter_open: "$"
  command_delimiter_close: "$"
  line_terminator: "0x0D 0x0A"  # CR LF, per section 1.2
  source_id_delimiter: "#"
  group_id_delimiter: "&"
  destination_id_delimiter: "@"
  initial_response_timeout_ms: 10
```

## Traits
```yaml
- queryable   # inferred from query command examples ($MODE$, $TRACK ?$, $VOL ?$, etc.)
- levelable   # inferred from VOL and BAL set/inc/dec commands
```

## Actions
```yaml
# ---- System / identity commands (section 2) ----
- id: id_set
  label: Set Product Identifier
  kind: action
  command: "$ID {identifier}$"
  params:
    - name: identifier
      type: string
      description: ASCII alphanumeric, max 20 chars, no spaces

- id: id_remove
  label: Remove Product Identifier
  kind: action
  command: "$ID ~ {identifier}$"
  params:
    - name: identifier
      type: string

- id: id_query
  label: Query Product Identifier
  kind: query
  command: "$ID ?$"
  params: []

- id: gid_set
  label: Add To Group
  kind: action
  command: "$GID {identifier}$"
  params:
    - name: identifier
      type: string
      description: Group identifier; product may belong to up to 5 groups

- id: gid_remove
  label: Remove From Group
  kind: action
  command: "$GID ~ {identifier}$"
  params:
    - name: identifier
      type: string

- id: gid_query
  label: Query Group Identifiers
  kind: query
  command: "$GID ?$"
  params: []

- id: baud_set
  label: Set Baud Rate
  kind: action
  command: "$BAUD {baudrate}$"
  params:
    - name: baudrate
      type: enum
      values: [2400, 4800, 9600, 19200, 38400]
      description: Initial response at old baud, final response at new baud

- id: baud_query
  label: Query Baud Rate
  kind: query
  command: "$BAUD ?$"
  params: []

- id: reset
  label: Reset Comms Buffer
  kind: action
  command: "$RESET$"
  params: []

- id: echo
  label: Echo Text
  kind: action
  command: "$ECHO {text}$"
  params:
    - name: text
      type: string
      description: Echoed back enclosed in < and >

- id: poll_start
  label: Begin Polling Sequence
  kind: action
  command: "$POLL START$"
  params: []

- id: poll_id
  label: Poll Next Product ID
  kind: query
  command: "$POLL ID$"
  params: []

- id: poll_sleep
  label: Silence Polled Product
  kind: action
  command: "$POLL SLEEP$"
  params: []  # should be addressed to the pid returned by previous POLL ID

- id: poll_done
  label: End Polling Sequence
  kind: action
  command: "$POLL DONE$"
  params: []

- id: status_query
  label: Query Last Command Status
  kind: query
  command: "$STATUS$"
  params: []

- id: command_help
  label: Command Help
  kind: query
  command: "$? {cmnd}$"
  params:
    - name: cmnd
      type: string
      description: Command name, or "?" to list entire command set

# ---- Transport (CD player) commands (section 3.3) ----
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
  label: Query Transport Mode
  kind: query
  command: "$MODE$"
  params: []

# ---- TRACK ----
- id: track_query
  label: Query Current Track
  kind: query
  command: "$TRACK ?$"
  params: []

- id: track_increment
  label: Next Track
  kind: action
  command: "$TRACK +$"
  params: []

- id: track_decrement
  label: Previous Track
  kind: action
  command: "$TRACK -$"
  params: []

- id: track_select
  label: Select Track
  kind: action
  command: "$TRACK {number}$"
  params:
    - name: number
      type: integer
      description: Track number

- id: track_total_query
  label: Query Total Tracks
  kind: query
  command: "$TRACK TOT$"
  params: []

# ---- INDEX ----
- id: index_query
  label: Query Current Index
  kind: query
  command: "$INDEX ?$"
  params: []

- id: index_increment
  label: Increment Index
  kind: action
  command: "$INDEX +$"
  params: []

- id: index_decrement
  label: Decrement Index
  kind: action
  command: "$INDEX -$"
  params: []

- id: index_select
  label: Select Index
  kind: action
  command: "$INDEX {number}$"
  params:
    - name: number
      type: integer

# ---- INTRO ----
- id: intro_query
  label: Query Intro Play Status
  kind: query
  command: "$INTRO ?$"
  params: []

- id: intro_on
  label: Start Intro Play
  kind: action
  command: "$INTRO ON$"  # also accepts $INTRO PLAY$
  params: []

- id: intro_off
  label: Stop Intro Play
  kind: action
  command: "$INTRO OFF$"  # also accepts $INTRO STOP$
  params: []

# ---- SEARCH ----
- id: search_backwards
  label: Search Backwards
  kind: action
  command: "$SEARCH <$"
  params: []
  notes: Continues until STOP command or ~30 s automatic timeout

- id: search_forwards
  label: Search Forwards
  kind: action
  command: "$SEARCH >$"
  params: []
  notes: Continues until STOP command or ~30 s automatic timeout

- id: search_stop
  label: Stop Searching
  kind: action
  command: "$SEARCH STOP$"
  params: []

# ---- DIGITAL ----
- id: digital_query
  label: Query Digital Audio Output Status
  kind: query
  command: "$DIGITAL ?$"
  params: []

- id: digital_on
  label: Enable Digital Audio Output
  kind: action
  command: "$DIGITAL ON$"  # also accepts $DIGITAL Y$
  params: []

- id: digital_off
  label: Disable Digital Audio Output
  kind: action
  command: "$DIGITAL OFF$"  # also accepts $DIGITAL N$
  params: []

# ---- RANDOM ----
- id: random_query
  label: Query Random Program Status
  kind: query
  command: "$RANDOM ?$"
  params: []

- id: random_on
  label: Enable Random Mode
  kind: action
  command: "$RANDOM ON$"  # also accepts $RANDOM Y$
  params: []

- id: random_off
  label: Disable Random Mode
  kind: action
  command: "$RANDOM OFF$"  # also accepts $RANDOM N$
  params: []

# ---- SHUFFLE ----
- id: shuffle_query
  label: Query Shuffle Program Status
  kind: query
  command: "$SHUFFLE ?$"
  params: []

- id: shuffle_on
  label: Enable Shuffle Mode
  kind: action
  command: "$SHUFFLE ON$"  # also accepts $SHUFFLE Y$
  params: []

- id: shuffle_off
  label: Disable Shuffle Mode
  kind: action
  command: "$SHUFFLE OFF$"  # also accepts $SHUFFLE N$
  params: []

# ---- PROGRAM ----
- id: program_query
  label: Query Current Program
  kind: query
  command: "$PROGRAM ?$"
  params: []

- id: program_include
  label: Create Include Program
  kind: action
  command: "$PROGRAM INCLUDE {tracks}$"
  params:
    - name: tracks
      type: string
      description: One or more track numbers separated by spaces

- id: program_exclude
  label: Create Exclude Program
  kind: action
  command: "$PROGRAM EXCLUDE {tracks}$"
  params:
    - name: tracks
      type: string
      description: One or more track numbers separated by spaces

- id: program_clear
  label: Clear Program
  kind: action
  command: "$PROGRAM CLEAR$"
  params: []

# ---- REPEAT ----
- id: repeat_query
  label: Query Repeat Status
  kind: query
  command: "$REPEAT ?$"
  params: []

- id: repeat_on
  label: Enable Repeat
  kind: action
  command: "$REPEAT ON$"  # also accepts $REPEAT Y$
  params: []

- id: repeat_off
  label: Disable Repeat
  kind: action
  command: "$REPEAT OFF$"  # also accepts $REPEAT N$
  params: []

- id: repeat_section_begin
  label: Mark Start Of Repeat Section
  kind: action
  command: "$REPEAT BEG$"
  params: []

- id: repeat_section_end
  label: Mark End Of Repeat Section
  kind: action
  command: "$REPEAT END$"
  params: []

# ---- VOL ----
- id: vol_query
  label: Query Volume
  kind: query
  command: "$VOL ?$"
  params: []

- id: vol_up
  label: Volume Up One Step
  kind: action
  command: "$VOL +$"
  params: []

- id: vol_down
  label: Volume Down One Step
  kind: action
  command: "$VOL -$"
  params: []

- id: vol_inc_by
  label: Volume Up By Amount
  kind: action
  command: "$VOL +{number}$"
  params:
    - name: number
      type: integer
      description: Amount to add to current volume

- id: vol_dec_by
  label: Volume Down By Amount
  kind: action
  command: "$VOL -{number}$"
  params:
    - name: number
      type: integer
      description: Amount to subtract from current volume

- id: vol_set
  label: Set Volume Absolute
  kind: action
  command: "$VOL = {number}$"
  params:
    - name: number
      type: integer

# ---- BAL ----
- id: bal_query
  label: Query Balance
  kind: query
  command: "$BAL ?$"
  params: []

- id: bal_right
  label: Balance Right One Step
  kind: action
  command: "$BAL +$"
  params: []

- id: bal_left
  label: Balance Left One Step
  kind: action
  command: "$BAL -$"
  params: []

- id: bal_inc_by
  label: Balance Increment By Amount
  kind: action
  command: "$BAL +{number}$"
  params:
    - name: number
      type: integer

- id: bal_dec_by
  label: Balance Decrement By Amount
  kind: action
  command: "$BAL -{number}$"
  params:
    - name: number
      type: integer

- id: bal_set
  label: Set Balance Absolute
  kind: action
  command: "$BAL = {number}$"
  params:
    - name: number
      type: integer
      description: Signed value (+ or - allowed)

# ---- MUTE ----
- id: mute_query
  label: Query Mute Status
  kind: query
  command: "$MUTE ?$"
  params: []

- id: mute_on
  label: Enable Mute
  kind: action
  command: "$MUTE ON$"  # also accepts $MUTE Y$
  params: []

- id: mute_off
  label: Disable Mute
  kind: action
  command: "$MUTE OFF$"  # also accepts $MUTE N$
  params: []

# ---- IR ----
- id: ir_query
  label: Query IR Control Status
  kind: query
  command: "$IR ?$"
  params: []

- id: ir_on
  label: Enable IR Control
  kind: action
  command: "$IR ON$"  # also accepts $IR Y$
  params: []

- id: ir_off
  label: Disable IR Control
  kind: action
  command: "$IR OFF$"  # also accepts $IR N$
  params: []
```

## Feedbacks
```yaml
- id: initial_response_ack
  description: Positive initial acknowledgement on receipt of valid command (within 10 ms)
  type: literal
  pattern: "(Source_ID)(Group_ID)(Destination_ID) !{NL}"

- id: initial_response_fail
  description: Initial response failure; no final response will follow
  type: pattern
  pattern: "!$FAIL {n}$"
  params:
    - name: n
      type: integer
      description: Status code (see Appendix B and section 2.4.1.1)

- id: final_response_fail
  description: Task could not be completed
  type: pattern
  pattern: "!$FAIL {n}$"

- id: power_up_message
  description: Transmitted on power-on when PAUSE held during boot
  type: literal
  pattern: "!$GENKI$"

- id: transport_mode
  type: enum
  values: [PLAYING, PAUSED, STOPPED, NODISC]
  query_command: "$MODE$"
  response_pattern: "!$MODE {state}$"

- id: play_state
  type: enum
  values: [PLAYING, NODISC]
  response_pattern: "!$PLAY {state}$"

- id: pause_state
  type: enum
  values: [PAUSED, NODISC]
  response_pattern: "!$PAUSE {state}$"

- id: stop_state
  type: enum
  values: [STOPPED, NODISC]
  response_pattern: "!$STOP {state}$"

- id: track_number
  type: integer
  response_pattern: "!$TRACK {number}$"
  alt_pattern: "!$TRACK NODISC$"

- id: track_total
  type: integer
  response_pattern: "!$TRACK TOT {number}$"
  alt_pattern: "!$TRACK TOT NODISC$"

- id: index_number
  type: integer
  response_pattern: "!$INDEX {number}$"
  alt_pattern: "!$INDEX NODISC$"

- id: intro_state
  type: enum
  values: [PLAY, STOP, "NO DISC"]
  response_pattern: "!$INTRO {state}$"

- id: search_state
  type: enum
  values: ["<", ">", STOP, NODISC, BADSEARCH]
  response_pattern: "!$SEARCH {state}$"

- id: digital_state
  type: enum
  values: [ON, OFF]
  response_pattern: "!$DIGITAL {state}$"

- id: random_state
  type: enum
  values: [ON, OFF, NODISC]
  response_pattern: "!$RANDOM {state}$"

- id: shuffle_state
  type: enum
  values: [ON, OFF, NODISC]
  response_pattern: "!$SHUFFLE {state}$"

- id: program_state
  type: enum
  values: [OFF, INCLUDE, EXCLUDE, CLEAR, NODISC, BADTRACK, PREVIOUSACTIVE]
  response_pattern: "!$PROGRAM {state} {tracks?}$"

- id: repeat_state
  type: enum
  values: [ON, OFF, BEG, END, BADREPEAT]
  response_pattern: "!$REPEAT {state}$"

- id: mute_state
  type: enum
  values: [ON, OFF]
  response_pattern: "!$MUTE {state}$"

- id: ir_state
  type: enum
  values: [ON, OFF]
  response_pattern: "!$IR {state}$"

- id: identifier_value
  type: string
  response_pattern: "$ID {identifier}$"

- id: group_identifier_list
  type: string
  response_pattern: "$GID {identifier[identifier[...]]}$"

- id: status_code
  type: integer
  response_pattern: "!$STATUS {number}$"
  notes: |
    Codes 0-24 general (see section 2.4.1.1): 0=no error,
    1=unexpected termination, 2=unrecognised char, 3=corrupted message,
    4-6=duplicate identifier, 7-9=identifier too large, 10-12=identifier corrupted,
    13=unknown group, 14=unknown destination, 15=unknown command,
    16=unknown parameter, 17=missing ID param, 18=unknown product id,
    19=missing GID param, 20=unknown group (delete), 21=group exists,
    22=group list full, 23=polling not started, 24=invalid poll command.
    Codes 25-47 reserved. Product-specific codes (Appendix B):
    48=NODISC, 49=TRAYOPEN, 50=BADTRACK, 51=BADSEARCH, 52=BADTIME,
    53=BADPROGRAM, 54=BADREPEAT, 55=PREVIOUSACTIVE.
```

## Variables
```yaml
- id: volume
  type: integer
  writable: true
  readable: true
  set_action: vol_set
  query_action: vol_query
  # UNRESOLVED: numeric range not stated in source

- id: balance
  type: integer
  writable: true
  readable: true
  set_action: bal_set
  query_action: bal_query
  # UNRESOLVED: numeric range and sign convention not stated in source

- id: current_track
  type: integer
  writable: true
  readable: true
  set_action: track_select
  query_action: track_query

- id: current_index
  type: integer
  writable: true
  readable: true
  set_action: index_select
  query_action: index_query

- id: baud_rate
  type: enum
  values: [2400, 4800, 9600, 19200, 38400]
  default: 9600
  writable: true
  readable: true
  set_action: baud_set
  query_action: baud_query
```

## Events
```yaml
- id: power_up_genki
  description: Optional power-on banner; emitted only when PAUSE key held during power-on
  pattern: "!$GENKI$"
# Otherwise device is strictly slave: emits responses only after host commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- Protocol Version 1.00, dated 28 April 1999 (Barry W Christie).
- Device is slave-only; only the Power_Up `!$GENKI$` banner is unsolicited and requires PAUSE to be held during power-on.
- Identifier framing: `(#source_id#)(&group_id&)(@destination_id@) $command$ NL`. Identifiers are optional; all eight combinations of presence/absence are defined in section 1.3. In group mode (`&group_id&` used without destination) products do NOT send acknowledgement to avoid bus contention.
- Initial response arrives within 10 ms of a valid command; the final response follows on task completion. Host should not send the next command before the final response.
- `BAUD` change: initial response sent at the old baud rate, final response at the new baud rate. Default baud after init is 9600.
- Y/ON and N/OFF are interchangeable for all boolean-style commands (DIGITAL, RANDOM, SHUFFLE, REPEAT, MUTE, IR, INTRO uses ON/PLAY and OFF/STOP).
- VOL/BAL accept four mutation forms (step `+`/`-`, signed-delta, absolute `=`). Each is a distinct documented row in the source.
- POLL uses RS-232 return-path hardware switching for daisy-chain auto-discovery; `POLL SLEEP` must be addressed using the pid returned by `POLL ID`, otherwise polling stalls.
- No power on/off command exists in the protocol — `powerable` trait omitted.
- All keywords are case-sensitive uppercase per Appendix A.
<!-- UNRESOLVED: RS-232 framing details (data bits/parity/stop bits/flow control) not stated in source. -->
<!-- UNRESOLVED: physical connector type / pinout not stated in source. -->
<!-- UNRESOLVED: numeric ranges for VOL and BAL not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
  - applicationmarket.crestron.com
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america/
  - https://docs.linn.co.uk/wiki
retrieved_at: 2026-04-26T16:30:03.751Z
last_checked_at: 2026-06-02T03:24:54.530Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:54.530Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec actions matched literally in source; transport parameters verified; bidirectional coverage achieved. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial framing (data bits, parity, stop bits, flow control) not stated in source"
- "physical connector / pinout not stated in source"
- "not stated in source"
- "numeric range not stated in source"
- "numeric range and sign convention not stated in source"
- "no multi-step macro sequences explicitly defined in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "RS-232 framing details (data bits/parity/stop bits/flow control) not stated in source."
- "physical connector type / pinout not stated in source."
- "numeric ranges for VOL and BAL not stated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
