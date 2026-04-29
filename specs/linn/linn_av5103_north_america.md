---
schema_version: ai4av-public-spec-v1
device_id: linn/linn-av5103
entity_id: linn_av5103_north_america
spec_id: admin/linn-av5103-north_america
revision: 1
author: admin
title: "Linn AV5103 (North America) Control Spec"
status: published
manufacturer: Linn
manufacturer_key: linn
model_family: "Linn AV5103"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn AV5103"
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
retrieved_at: 2026-04-26T16:25:39.860Z
last_checked_at: 2026-04-23T08:06:15.828Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:06:15.828Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions match source literals; transport parameters verified; spec fully represents documented command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Linn AV5103 (North America) Control Spec

## Summary
Linn AV5103 System Controller supporting RS-232 serial control. Commands use a structured format with source/group/destination identifiers, and responses are returned in two stages — initial acknowledgement within 10ms, final response within 3s depending on command complexity.

<!-- UNRESOLVED: TCP/IP control not mentioned in source — serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # factory default; configurable: 1200/2400/4800/9600/19200/38400
  data_bits: 7
  parity: even
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command set:
# - powerable: STBY (standby) command present
# - queryable: all commands support ? parameter for status queries
# - routable: AINP/VINP/DINP/MRAINP/MRVINP/MRDINP routing commands present
# - levelable: VAL command with +/-/INC/DEC for volume, balance, speaker levels
```

## Actions
```yaml
- id: mute
  label: Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [Y, N]
      description: Y=mute, N=un-mute

- id: osg
  label: On Screen Graphics
  kind: action
  params:
    - name: state
      type: enum
      values: [Y, N]
      description: Y=on, N=off

- id: stby
  label: Standby
  kind: action
  params:
    - name: state
      type: enum
      values: [Y, N]
      description: Y=enter standby, N=clear standby

- id: quiet
  label: Quiet Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [Y, N]
      description: Y=select quiet mode, N=clear quiet mode

- id: surr
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - STE    # stereo
        - STES   # stereo with subwoofer
        - PRL    # pro logic
        - PRLP   # pro logic phantom
        - PRLS   # pro logic 3 stereo
        - LIM3   # limbik 3
        - LIM5   # limbik 5
        - AC3    # DSP As Mix
        - AC3P   # DSP phantom
        - AC3S   # DSP 3 stereo
        - PARTY  # party mode
        - NXT    # next mode
      description: Select surround sound mode

- id: sel
  label: Select Operating Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [VOL, REAR, CNTR, SUB, BAL, NXT]
      description: VOL=volume, REAR=rear balance, CNTR=centre balance, SUB=subwoofer, BAL=stereo balance

- id: val
  label: Set Value
  kind: action
  params:
    - name: action
      type: enum
      values: [INC, DEC, ">", "<", S, nn, +?, -?, "?"]
      description: "INC/DEC=increment/decrement by 1, >/<=repeat until VAL S, S=stop, nn=set value, +?=max, -?=min, ?=query"

- id: ainp
  label: Select Audio Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, ANA_nn_ (1-10), DIG_n_ (1-5)"

- id: vinp
  label: Select Video Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, COMP_n_ (1-8), SVHS_n_ (1-2)"

- id: dinp
  label: Select Direct Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, ANA_nn_ (1-10), DIG_n_ (1-5), COMP_n_ (1-8), SVHS_n_ (1-2)"

- id: mrainp
  label: Multi-Room Audio Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, ANA_nn_ (1-10), DIG_n_ (1-5)"

- id: mrvinp
  label: Multi-Room Video Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, COMP_n_ (1-8), SVHS_n_ (1-2)"

- id: mrdinp
  label: Multi-Room Direct Input
  kind: action
  params:
    - name: source
      type: string
      description: "NONE, ANA_nn_ (1-10), DIG_n_ (1-5), COMP_n_ (1-8), SVHS_n_ (1-2)"

- id: drec
  label: Direct Record
  kind: action
  params:
    - name: input
      type: string
      description: "ANA1-10, DIG1-5, COMP1-8, SVHS1-2"
    - name: record_output
      type: string
      description: "NONE, RDIG, RANA1-3, RCOMP1-2, RSVHS"

- id: rout
  label: Record Connection Status
  kind: action
  params:
    - name: connector
      type: enum
      values: [RANA_n_, RDIG, RCOMP_n_, RSVHS]
      description: "Query record connector status"

- id: norm
  label: Normalise
  kind: action
  params: []

- id: reset
  label: Reset
  kind: action
  params: []

- id: clrec
  label: Clear All Record Paths
  kind: action
  params: []

- id: set_id
  label: Set Destination Identity
  kind: action
  params:
    - name: identity
      type: string
      description: "Up to 8 chars, no spaces. ~ to remove."

- id: set_gid
  label: Configure Group Identity
  kind: action
  params:
    - name: identity
      type: string
      description: "Up to 5 group names, ~XXX to remove one, ~ to remove all"

- id: baud
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: "1200, 2400, 4800, 9600, 19200, or 38400"

- id: echo
  label: Echo
  kind: action
  params:
    - name: string
      type: string
      description: "ASCII string to echo back"

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
  params: []

- id: poll_done
  label: Poll Done
  kind: action
  params: []
```

## Feedbacks
```yaml
# Primary response: ! (accepted) or !? (error) followed by CR LF
# Final response echoes command with current settings
#
# Query responses (?) return current state values:
# - MUTE: N or Y
# - OSG: N or Y
# - STBY: N or Y
# - QUIET: N or Y
# - SURR: current surround mode string
# - SEL: current mode string
# - VAL: current value nn
# - AINP/VINP/DINP: current source
# - ROUT: connector status (NONE, ANA1-10, DIG1-5, COMP1-8, SVHS1-2, UNAVAILABLE)
# - ID: current destination identity
# - GID: current group identities
# - BAUD: current baud rate
#
# Error responses: NAK character on framing/parity error or command > 46 chars
# UNRESOLVED: complete list of error codes/notifications
```

## Variables
```yaml
# Baud rate configurable: 1200/2400/4800/9600/19200/38400 bps
# Query current baud: $BAUD ?$ → !BAUD nn
baud_rate:
  type: integer
  writable: true
  values: [1200, 2400, 4800, 9600, 19200, 38400]
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited events (power-on message, etc.)
# Power-on message (if enabled): "LINN AV5103 SYSTEM CONTROLLER" sent on power up
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Standby mode (STBY Y) rejects all other commands until cleared (STBY N)"
  - "AV5103 must be last product in RS-232 daisy chain (no switchable return path)"
  - "Power-on sequence: press front panel + button while powering on to toggle RS-232 power-up message"
# UNRESOLVED: no explicit safety warnings in source beyond interlock behavior
```

## Notes
Command structure: `#SRC_ID#&GROUP_ID&@DEST_ID@$CMD(P)$` terminated by CR+LF.

Two-stage response: primary `!` (accepted) or `!?` (invalid) within 10ms; final response with actual settings within 10ms–3s depending on command complexity.

When no identifiers are present, the controller ignores unrecognized commands (assumes other product on shared link).

Repeated increment/decrement operates at ~10Hz until limit reached or VAL S issued.

Record output routing via DREC returns error message if source cannot be connected.

Factory default identity: `AV5103`. Factory default baud: `9600`.

Poll command enables auto-detection of daisy-chained Linn RS-232 devices.

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
retrieved_at: 2026-04-26T16:25:39.860Z
last_checked_at: 2026-04-23T08:06:15.828Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:06:15.828Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions match source literals; transport parameters verified; spec fully represents documented command set."
```

## Known Gaps

```yaml
[]
```
