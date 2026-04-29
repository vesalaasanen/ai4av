---
schema_version: ai4av-public-spec-v1
device_id: datasat-digital-entertainment/ap20
entity_id: datasat_digital_entertainment_ap20
spec_id: admin/datasat_digital_entertainment-ap20
revision: 1
author: admin
title: "Datasat Digital Entertainment AP20/AP25 Control Spec"
status: published
manufacturer: "Datasat Digital Entertainment"
manufacturer_key: datasat-digital-entertainment
model_family: AP20
aliases: []
compatible_with:
  manufacturers:
    - "Datasat Digital Entertainment"
  models:
    - AP20
    - AP25
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: datasat_digital_entertainment_ap20.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T05:36:34.444Z
retrieved_at: 2026-04-23T05:36:34.444Z
last_checked_at: 2026-04-23T05:36:34.444Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T05:36:34.444Z
  matched_actions: 13
  action_count: 15
  confidence: high
  summary: "All 13 actionable spec commands found verbatim in source with matching parameter shapes and transport details."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Datasat Digital Entertainment AP20/AP25 Control Spec

## Summary
AP20 and AP25 are digital cinema audio processors supporting both serial (RS-232) and TCP/IP control. Commands follow `@COMMAND [args] <CR>` format. Two password levels (NetCmd/Operator and Setup) protect network commands via `AUTH` command.

<!-- UNRESOLVED: serial baud rate not stated in source (user configures via menu) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 14500  # stated in source
serial:
  baud_rate: null  # UNRESOLVED: user-configurable, value not stated; configure via System -> Automation -> Serial menu
  data_bits: null
  parity: null
  stop_bits: null
auth:
  type: password  # NetCmd Password and Setup Password; AUTH command required before protected commands
  notes: >
    Two levels: NetCmd Password (Operator) and Setup Password.
    NetCmd prevents network access only; Setup prevents all setup command access via serial and Ethernet.
    Operator-level commands (FORMAT, FADER, MUTED, etc.) do not require AUTH.
```

## Traits
```yaml
- queryable  # SYSTEM, IDENTIFY, HEALTH, BOARDINFO, SERIALNO, MAC commands return values
- levelable  # FADER, MONITORLEVEL support read/write
```

## Actions
```yaml
- id: system_info
  label: System Information
  kind: query
  params: []
  description: Returns software version, date, MAC address
  response_format: "VER [Version] LF VERDATE [Date] LF MAC [Mac Address]"

- id: identify
  label: Identify
  kind: query
  params: []
  description: Returns AP20/AP25, IP, Circuit, Theater, Screen info
  response_format: "AP20 [IP] [Circuit] [Theater] [Screen]"

- id: health
  label: Health Status
  kind: query
  params:
    - name: sub_cmd
      type: string
      description: "SUB_CMD: TEMPERATURE | H331VOLTS | H332VOLTS | H335VOLTS | H336VOLTS | H338VOLTS"
      required: true
  response_format: "HEALTH [SUB_CMD] [values]"

- id: board_info
  label: Board Information
  kind: query
  params: []
  description: Returns board list with hardware/PIC firmware versions

- id: authorize
  label: Authorize
  kind: action
  params:
    - name: password
      type: string
      description: Operator or Setup password
  response_format: "AUTH [SETUP|OP|SECERR]"
  notes: Returns SETUP for setup-level, OP for operator-level, SECERR if neither

- id: serial_number
  label: Serial Number
  kind: query
  params: []
  response_format: "SERIALNO [SN]"

- id: mac_address
  label: MAC Address
  kind: query
  params: []
  response_format: "MAC [Mac Address]"

- id: format_select
  label: Format Selection
  kind: read_write
  params:
    - name: new_format
      type: string
      description: Format name (exact match required; spaces allowed
      required: false
  response_format: "FORMAT [Format]"

- id: run_macro
  label: Run Macro
  kind: action
  params:
    - name: macro
      type: string
      description: Macro name (exact match required; spaces allowed)
  response_format: "OK | ERR no macro"

- id: fader_level
  label: Master Fader Level
  kind: read_write
  params:
    - name: new_level
      type: integer
      description: Fader level in tenths (e.g., 70 = 7.0)
      required: false
  response_format: "FADER [Level]"

- id: fader_mute
  label: Master Fader Mute
  kind: read_write
  params:
    - name: new_value
      type: integer
      description: 1 = mute, 0 = unmute
      required: false
  response_format: "MUTED [Value]"

- id: monitor_level
  label: Monitor Level
  kind: read_write
  params:
    - name: new_value
      type: integer
      description: 0 (min) to 100 (max)
      required: false
  response_format: "MONITORLEVEL [Value]"

- id: monitor_mute
  label: Monitor Mute
  kind: read_write
  params:
    - name: new_value
      type: integer
      description: 1 = mute, 0 = unmute
      required: false
  response_format: "MONITORMUTE [Value]"
```

## Feedbacks
```yaml
# All commands return ASCII text terminated by <CR>.
# Error responses include: SECERR (auth failed), ERR no macro (macro not found)
- id: command_response
  type: string
  description: Standard command response format
  terminator: "<CR>"  # ASCII 0x0D

- id: error_response
  type: enum
  values:
    - SECERR
    - ERR no macro
  description: Authentication or execution errors
```

## Variables
```yaml
# No standalone variables - commands are self-contained queries
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# AP20/AP25 supports user-defined macros; RUNMACRO command executes by name
# Macro names must match exactly; spaces allowed
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command prefix: `@`. Terminator: `<CR>` (ASCII 0x0D). Response also terminated by `<CR>`.

Inquiry commands (SYSTEM, IDENTIFY) work without password. Password required for setup-level and most configuration commands via `AUTH` before issuing protected commands. Auth valid for duration of TCP connection only.

Sample code at end of document shows TCP socket approach — connection to port 14500, send `@COMMAND\r`, read response until `<CR>`.

Serial config: user selects baud rate in menu System -> Automation -> Serial. Serial Command Mode must be set to AP20.
<!-- UNRESOLVED: default baud rate not stated, serial port parameters (data/parity/stop bits) not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: datasat_digital_entertainment_ap20.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T05:36:34.444Z
retrieved_at: 2026-04-23T05:36:34.444Z
last_checked_at: 2026-04-23T05:36:34.444Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:36:34.444Z
matched_actions: 13
action_count: 15
confidence: high
summary: "All 13 actionable spec commands found verbatim in source with matching parameter shapes and transport details."
```

## Known Gaps

```yaml
[]
```
