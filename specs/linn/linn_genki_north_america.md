---
schema_version: ai4av-public-spec-v1
device_id: linn/linn-genki-north-america
entity_id: linn_genki_north_america
spec_id: admin/linn-genki-north_america
revision: 1
author: admin
title: "Linn Genki (North America) Control Spec"
status: published
manufacturer: Linn
manufacturer_key: linn
model_family: "Linn Genki (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn Genki (North America)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america
  - https://docs.linn.co.uk/wiki
source_documents:
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:25:14.716Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/index.php/RS232
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:15.237Z
  - title: "Linn public source"
    url: https://applicationmarket.crestron.com/linn-genki-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:16.144Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:17.027Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:25:39.860Z
retrieved_at: 2026-04-26T16:30:03.751Z
last_checked_at: 2026-04-27T09:04:49.758Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:49.758Z
  matched_actions: 65
  action_count: 65
  confidence: high
  summary: "All 65 spec actions match source command variants; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Linn Genki (North America) Control Spec

## Summary
Linn Genki CD Player with RS-232 ASCII interface for external control. Slave device responding only to host commands. Supports configurable baud rates (2400–38400), multi-unit daisy-chaining via group identifiers, and comprehensive transport/playback control.

<!-- UNRESOLVED: power on/off commands not documented in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable to 2400, 4800, 9600, 19200, 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: serial port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # MODE, TRACK ?, INDEX ?, VOL ?, BAL ?, MUTE ?, IR ?, PROGRAM ?, etc.
- levelable       # VOL +/-, BAL +/=, volume/brightness control
- playable        # PLAY, PAUSE, STOP playback control
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params: []
  description: Start playing disc or continue from paused position

- id: pause
  label: Pause
  kind: action
  params: []
  description: Pause playback at current position

- id: stop
  label: Stop
  kind: action
  params: []
  description: Stop playing the disc

- id: mode
  label: Query Mode
  kind: action
  params: []
  description: Return current operational status (PLAYING, PAUSED, STOPPED, NODISC)

- id: track_query
  label: Query Track
  kind: action
  params: []
  description: Return current track number

- id: track_plus
  label: Next Track
  kind: action
  params: []
  description: Increment current track number by one

- id: track_minus
  label: Previous Track
  kind: action
  params: []
  description: Decrement current track number by one

- id: track_select
  label: Select Track
  kind: action
  params:
    - name: number
      type: integer
      description: Track number (1-based)
  description: Select track number directly

- id: track_tot
  label: Total Tracks
  kind: action
  params: []
  description: Return total number of tracks on disc

- id: index_query
  label: Query Index
  kind: action
  params: []
  description: Return current index number

- id: index_plus
  label: Next Index
  kind: action
  params: []
  description: Increment current index number by one

- id: index_minus
  label: Previous Index
  kind: action
  params: []
  description: Decrement current index number by one

- id: index_select
  label: Select Index
  kind: action
  params:
    - name: number
      type: integer
      description: Index number
  description: Select index number directly

- id: intro_query
  label: Query Intro
  kind: action
  params: []
  description: Return current status of intro play

- id: intro_on
  label: Intro On
  kind: action
  params: []
  description: Start intro play mode

- id: intro_off
  label: Intro Off
  kind: action
  params: []
  description: Stop intro play mode

- id: search_backward
  label: Search Backward
  kind: action
  params: []
  description: Search backwards through disc until STOP (auto-terminates ~30s)

- id: search_forward
  label: Search Forward
  kind: action
  params: []
  description: Search forwards through disc until STOP (auto-terminates ~30s)

- id: search_stop
  label: Stop Search
  kind: action
  params: []
  description: Stop searching disc

- id: digital_query
  label: Query Digital Output
  kind: action
  params: []
  description: Return status of Digital Audio Output (ON/OFF)

- id: digital_on
  label: Enable Digital Output
  kind: action
  params: []
  description: Enable Digital Audio Output

- id: digital_off
  label: Disable Digital Output
  kind: action
  params: []
  description: Disable Digital Audio Output

- id: random_query
  label: Query Random
  kind: action
  params: []
  description: Return status of random program (ON/OFF/NODISC)

- id: random_on
  label: Random On
  kind: action
  params: []
  description: Turn random mode on

- id: random_off
  label: Random Off
  kind: action
  params: []
  description: Turn random mode off

- id: shuffle_query
  label: Query Shuffle
  kind: action
  params: []
  description: Return status of shuffle program (ON/OFF/NODISC)

- id: shuffle_on
  label: Shuffle On
  kind: action
  params: []
  description: Turn shuffle mode on

- id: shuffle_off
  label: Shuffle Off
  kind: action
  params: []
  description: Turn shuffle mode off

- id: program_query
  label: Query Program
  kind: action
  params: []
  description: Return current program status

- id: program_include
  label: Program Include
  kind: action
  params:
    - name: tracks
      type: array
      description: List of track numbers to include
  description: Create program list including specified tracks

- id: program_exclude
  label: Program Exclude
  kind: action
  params:
    - name: tracks
      type: array
      description: List of track numbers to exclude
  description: Create program list excluding specified tracks

- id: program_clear
  label: Clear Program
  kind: action
  params: []
  description: Clear current program list

- id: repeat_query
  label: Query Repeat
  kind: action
  params: []
  description: Return current repeat status (ON/OFF)

- id: repeat_on
  label: Repeat On
  kind: action
  params: []
  description: Turn repeat on

- id: repeat_off
  label: Repeat Off
  kind: action
  params: []
  description: Turn repeat off

- id: repeat_begin
  label: Repeat Begin
  kind: action
  params: []
  description: Mark start of repeat section

- id: repeat_end
  label: Repeat End
  kind: action
  params: []
  description: Mark end of repeat section and start repeating

- id: vol_query
  label: Query Volume
  kind: action
  params: []
  description: Return current volume setting

- id: vol_up
  label: Volume Up
  kind: action
  params:
    - name: amount
      type: integer
      required: false
      description: Optional increment amount (default 1)
  description: Increase volume

- id: vol_down
  label: Volume Down
  kind: action
  params:
    - name: amount
      type: integer
      required: false
      description: Optional decrement amount (default 1)
  description: Decrease volume

- id: vol_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level to set
  description: Set volume to specific value

- id: bal_query
  label: Query Balance
  kind: action
  params: []
  description: Return current balance setting

- id: bal_up
  label: Balance Right
  kind: action
  params:
    - name: amount
      type: integer
      required: false
      description: Optional increment amount (default 1)
  description: Increase balance (shift right)

- id: bal_down
  label: Balance Left
  kind: action
  params:
    - name: amount
      type: integer
      required: false
      description: Optional decrement amount (default 1)
  description: Decrease balance (shift left)

- id: bal_set
  label: Set Balance
  kind: action
  params:
    - name: level
      type: integer
      description: Balance level to set (negative=left, positive=right)
  description: Set balance to specific value

- id: mute_query
  label: Query Mute
  kind: action
  params: []
  description: Return current mute status (ON/OFF)

- id: mute_on
  label: Mute On
  kind: action
  params: []
  description: Enable mute

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  description: Disable mute

- id: ir_query
  label: Query IR Control
  kind: action
  params: []
  description: Return current IR control status (ON/OFF)

- id: ir_on
  label: IR Enable
  kind: action
  params: []
  description: Enable IR control of product

- id: ir_off
  label: IR Disable
  kind: action
  params: []
  description: Disable IR control of product

- id: id_set
  label: Set Device ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Unique device identifier (max 20 chars alphanumeric)
  description: Configure product identifier on one-to-one basis

- id: id_remove
  label: Remove Device ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Identifier to remove
  description: Remove product identifier

- id: id_query
  label: Query Device ID
  kind: action
  params: []
  description: Return product identifier

- id: gid_set
  label: Set Group ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Group identifier (max 20 chars alphanumeric)
  description: Configure product as part of a group (max 5 groups per product)

- id: gid_remove
  label: Remove Group ID
  kind: action
  params:
    - name: identifier
      type: string
      description: Group identifier to remove
  description: Remove product from a particular group

- id: gid_query
  label: Query Group IDs
  kind: action
  params: []
  description: Return list of currently defined group identifiers

- id: baud_set
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      enum: [2400, 4800, 9600, 19200, 38400]
      description: Baud rate
  description: Select new baud rate (initial response at current rate, final at new rate)

- id: baud_query
  label: Query Baud Rate
  kind: action
  params: []
  description: Returns current baud rate

- id: reset
  label: Reset
  kind: action
  params: []
  description: Clear comms buffer on product

- id: echo
  label: Echo
  kind: action
  params:
    - name: text
      type: string
      description: Text to echo back enclosed in < >
  description: Echo text back for communication testing

- id: poll_start
  label: Poll Start
  kind: action
  params: []
  description: Marks the start of polling

- id: poll_id
  label: Poll ID
  kind: action
  params: []
  description: Returns product id for polling detection

- id: poll_sleep
  label: Poll Sleep
  kind: action
  params:
    - name: destination_id
      type: string
      description: Product destination id from POLL ID response
  description: Product ignores all commands until POLL DONE received

- id: poll_done
  label: Poll Done
  kind: action
  params: []
  description: All products return to active operation

- id: status
  label: Status
  kind: action
  params: []
  description: Return the status of the last command (debugging aid)

- id: cmd_help
  label: Command Help
  kind: action
  params:
    - name: command
      type: string
      description: Command name to get help for
  description: Find out what parameters a command requires

- id: list_commands
  label: List Commands
  kind: action
  params: []
  description: Return full command set of the product (separated by spaces)
```

## Feedbacks
```yaml
- id: power_up_message
  type: string
  values:
    - "!$GENKI$"
  description: Power up message sent on link verification (activated by PAUSE+power on)

- id: initial_ack
  type: string
  description: "(Source_ID) (Group_ID) (Destination_ID) ! NL" - command received/understood

- id: initial_nack
  type: string
  description: "(Source_ID) (Group_ID) (Destination_ID) !$FAIL n$ NL" - invalid command

- id: final_response
  type: string
  description: "(Source_ID) (Group_ID) (Destination_ID) !$Status_String$ NL" - task completed

- id: final_nack
  type: string
  description: "(Source_ID) (Group_ID) (Destination_ID) !$FAIL n$ NL" - task failed

- id: play_state
  type: enum
  values: [PLAYING, PAUSED, STOPPED, NODISC]
  description: Current playback state

- id: track_number
  type: integer
  description: Current track number (1-based)

- id: track_total
  type: integer
  description: Total tracks on current disc

- id: index_number
  type: integer
  description: Current index number

- id: intro_state
  type: enum
  values: [PLAY, STOP, "NO DISC"]
  description: Current intro play state

- id: digital_state
  type: enum
  values: [ON, OFF]
  description: Digital audio output state

- id: random_state
  type: enum
  values: [ON, OFF, NODISC]
  description: Random mode state

- id: shuffle_state
  type: enum
  values: [ON, OFF, NODISC]
  description: Shuffle mode state

- id: program_state
  type: string
  description: Current program status (OFF, INCLUDE track [...], EXCLUDE track [...])

- id: repeat_state
  type: enum
  values: [ON, OFF, BADREPEAT]
  description: Repeat mode state

- id: volume_level
  type: integer
  description: Current volume level

- id: balance_level
  type: integer
  description: Current balance setting (negative=left, positive=right)

- id: mute_state
  type: enum
  values: [ON, OFF]
  description: Mute state

- id: ir_state
  type: enum
  values: [ON, OFF]
  description: IR control enabled state

- id: device_id
  type: string
  description: Product identifier

- id: group_ids
  type: array
  items:
    type: string
  description: List of group identifiers product belongs to

- id: baud_rate
  type: enum
  values: [2400, 4800, 9600, 19200, 38400]
  description: Current serial baud rate

- id: echo_response
  type: string
  description: Echoed text in < > brackets

- id: poll_device_id
  type: string
  description: Product id returned from POLL ID

- id: status_code
  type: integer
  description: Last command status code (0=no error)

- id: error_status
  type: string
  description: Status string from !$Status_String$ response

- id: search_state
  type: enum
  values: ["<", ">", STOP, NODISC, BADSEARCH]
  description: Current search direction/state

# UNRESOLVED: error status codes (0-47 general, 48-55 product-specific) documented in source
# but actual error string mappings not fully enumerated
```

## Variables
```yaml
# No discrete settable parameters outside action commands documented
# All controllable state accessed via query commands (VOL ?, BAL ?, etc.)
```

## Events
```yaml
# Device is slave-only; does not transmit unless first receives a command.
# No unsolicited event notifications documented.
# UNRESOLVED: verify whether device sends any autonomous status updates
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POLL SLEEP must be used with product identifier from POLL ID - without this all products stop responding and polling fails"
    source: "Section 2.3.1"
  - description: "Daisy chain: if a product is switched off, the RS-232 chain is broken; removed products require chain re-establishment"
    source: "Section 2.3.2 Hardware Note"
# UNRESOLVED: power-on sequencing requirements not documented in source
```

## Notes
Command syntax uses ASCII delimiters: `#source_id#`, `@destination_id@`, `&group_id&`, `$command$`. Command termination requires both carriage return (0x0D) and line feed (0x0A). Product supports up to 5 group memberships for flexible addressing. When in group mode, products do not acknowledge commands to avoid simultaneous replies. All commands are uppercase keywords; parameters are lowercase. Boolean parameters accept `Y/ON` (enable) or `N/OFF` (disable). Initial response expected within 10ms; host should wait for final response before issuing further commands.

<!-- UNRESOLVED: power on/off commands not present in source document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial port number (COM1, etc.) not stated in source -->
<!-- UNRESOLVED: electrical specifications (voltage, current) not stated in source -->

## Provenance

```yaml
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america
  - https://docs.linn.co.uk/wiki
source_documents:
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:25:14.716Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/index.php/RS232
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:15.237Z
  - title: "Linn public source"
    url: https://applicationmarket.crestron.com/linn-genki-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:16.144Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:17.027Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:25:39.860Z
retrieved_at: 2026-04-26T16:30:03.751Z
last_checked_at: 2026-04-27T09:04:49.758Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:49.758Z
matched_actions: 65
action_count: 65
confidence: high
summary: "All 65 spec actions match source command variants; transport verified."
```

## Known Gaps

```yaml
[]
```
