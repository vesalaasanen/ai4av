---
spec_id: admin/telos-pdm-broadcast-delay
schema_version: ai4av-public-spec-v1
revision: 1
title: "Telos PDM Program Delay Manager Control Spec"
manufacturer: Telos
model_family: "PDM Program Delay Manager"
aliases: []
compatible_with:
  manufacturers:
    - Telos
  models:
    - "PDM Program Delay Manager"
    - "PDM II Broadcast Delay"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - telosalliance-uat.s3.amazonaws.com
source_urls:
  - https://telosalliance-uat.s3.amazonaws.com/public/25-Seven/PDM/25Seven-Manual-PDM-2.4a-C1914012.pdf
retrieved_at: 2026-04-30T01:59:33.876Z
last_checked_at: 2026-04-30T09:50:55.105Z
generated_at: 2026-04-30T09:50:55.105Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:50:55.105Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "All 8 spec commands matched semantic counterparts in source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Telos PDM Program Delay Manager Control Spec

## Summary
Broadcast audio delay system supporting RS-232/RS-485 serial control and TCP/IP network control via port 5443. Web interface on port 80 with Adobe Flash GUI on port 5444. Parallel GPIO via DB-25. Bi-directional data delay streams on ports 5445–5448. Commands are ASCII, case-sensitive, terminated by `<LF>`. Responses use `!` (success) or `?` (error) prefixes. No password on port 5443; web interface uses `pdmweb`/password auth.

<!-- UNRESOLVED: RS-232 baud rate not stated in source (source only says "choose standard values between 1200 and 115200 baud") -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5443  # TCP command port; no password required on this port
  base_url: http://  # Web interface on port 80
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable 1200-115200, no default stated in source
  data_bits: null
  parity: null
  stop_bits: null
auth:
  tcp:
    type: none  # inferred: source explicitly states "no further password checking" on port 5443
  http:
    type: password
    credentials:
      username: pdmweb
      password: pdmwebBnnn  # default; Bnnn = module code from Information screen
  serial:
    type: none  # inferred: no auth procedure for serial in source
```

## Traits
```yaml
- queryable  # inferred from get Depth, get PeakInput, get PeakOutput, get TemperatureC/F examples
- routable   # inferred: input/output routing via data delay streams (ports 5445-5448)
```

## Actions
```yaml
- id: down
  label: Down
  kind: action
  params:
    - name: argument
      type: string
      description: Event name (Build, Exit, Cough, Dump, Bypass, Cue1-Cue8, Flag1-Flag8)
- id: up
  label: Up
  kind: action
  params:
    - name: argument
      type: string
      description: Event name
- id: trigger
  label: Trigger
  kind: action
  params:
    - name: argument
      type: string
      description: Momentary activation of argument (same as down+up)
- id: get
  label: Get
  kind: action
  params:
    - name: variable
      type: string
      description: Variable to query (Depth, PeakInput, PeakOutput, TemperatureC, TemperatureF)
- id: help
  label: Help
  kind: action
  params: []
- id: help_command
  label: Help Command
  kind: action
  params:
    - name: command
      type: string
      description: Specific command to get help for
- id: enable
  label: Enable
  kind: action
  params:
    - name: event
      type: string
      description: EventName(s) to enable reporting; use "All" for all events
- id: disable
  label: Disable
  kind: action
  params:
    - name: event
      type: string
      description: EventName(s) to disable reporting; use "All" for all
```

## Feedbacks
```yaml
- id: command_success
  type: enum
  values:
    - "!"
  description: "PDM acknowledges command received and acted upon"
- id: command_error
  type: enum
  values:
    - "?"
  description: "PDM doesn't understand command or cannot act upon it"
- id: output_event
  type: string
  description: "Event message format: @NameOfEvent[=1 or =0]<LF>. Boolean absent for momentary events."
  variables:
    - DelaySafe
    - DelayFull
    - DelayEmpty
    - DelayUnsafe
    - Bypass
    - Muted
    - Building
    - Exiting
    - BuildTrig
    - DumpTrig
    - EmptyTrig
    - FullTrig
    - Cue1-Cue8
    - Flag1-Flag8
    - BuildLamp
    - ExitLamp
    - DumpLamp
    - CoughLamp
    - All
- id: welcome
  type: string
  description: "@Welcome to PDM xxxx<LF> sent on boot or socket connection (xxxx = serial number)"
```

## Variables
```yaml
- id: Depth
  type: number
  unit: seconds
  description: Current audio delay length in seconds and tenths
- id: PeakInput
  type: number
  unit: dBFS
  description: Peak input level, both channels
- id: PeakOutput
  type: number
  unit: dBFS
  description: Peak output level, both channels
- id: TemperatureC
  type: number
  unit: degrees Celsius
  description: Internal temperature in whole degrees Celsius
- id: TemperatureF
  type: number
  unit: degrees Fahrenheit
  description: Internal temperature in whole degrees Fahrenheit
```

## Events
```yaml
# PDM sends unsolicited Output Events when enabled.
# Boolean =1 or =0 sent only for ongoing states; absent for momentary events.
- id: DelaySafe
  type: boolean
  description: Memory now has enough audio to cover at least one complete dump
- id: DelayFull
  type: boolean
  description: Delay memory is now full
- id: DelayEmpty
  type: boolean
  description: Memory is empty
- id: DelayUnsafe
  type: boolean
  description: Memory contains audio but not full dump increment
- id: Bypass
  type: boolean
  description: PDM is in bypass mode
- id: Muted
  type: boolean
  description: PDM output is muted
- id: Building
  type: boolean
  description: PDM is building up a delay
- id: Exiting
  type: boolean
  description: PDM is exiting a delay
- id: BuildTrig
  type: momentary
  description: BUILD button pressed
- id: DumpTrig
  type: momentary
  description: DUMP button pressed
- id: EmptyTrig
  type: momentary
  description: Memory just completely emptied
- id: FullTrig
  type: momentary
  description: Memory just completely filled
- id: Cue1-Cue8
  type: momentary
  description: Cue point n reached
- id: Flag1-Flag8
  type: boolean
  description: Flag point n state
- id: BuildLamp
  type: boolean
  description: BUILD button lamp state
- id: ExitLamp
  type: boolean
  description: EXIT button lamp state
- id: DumpLamp
  type: boolean
  description: DUMP button lamp state
- id: CoughLamp
  type: boolean
  description: COUGH button lamp state
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Port 5443 TCP has **no password** after connection — source warns: "Use a firewall, or keep your PDM on a dedicated (closed) network, for protection."
- Web interface (port 80) uses `pdmweb`/password auth; default password is `pdmwebBnnn` (Bnnn = module code from Information screen).
- RS-232 can serve only one function at a time: either control OR data delay, not both.
- Data delay streams: Stream A input port 5445, Stream B input port 5446; Stream A output port 5447, Stream B output port 5448.
- RS-232 TX/RX on DB-25 pins 2/3. RS-485 differential on pins 8–12.
- Carriage Return (ASCII 13) is ignored by the system; Line Feed (ASCII 10) terminates commands.
- Commands are case-sensitive, all lower-case.
- GPIO trigger pulse length configurable 100–1000 ms (default 250 ms) in Hardware GPIO configuration.
- Cue marks generate 250 ms triggers (configurable 100–1000 ms); Flag marks reflect continuous logic state.
<!-- UNRESOLVED: RS-232 baud rate, data bits, parity, stop bits not stated in source (configurable 1200–115200 only) -->
<!-- UNRESOLVED: firmware version not stated in source -->

## Provenance

```yaml
source_domains:
  - telosalliance-uat.s3.amazonaws.com
source_urls:
  - https://telosalliance-uat.s3.amazonaws.com/public/25-Seven/PDM/25Seven-Manual-PDM-2.4a-C1914012.pdf
retrieved_at: 2026-04-30T01:59:33.876Z
last_checked_at: 2026-04-30T09:50:55.105Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:50:55.105Z
matched_actions: 8
action_count: 8
confidence: high
summary: "All 8 spec commands matched semantic counterparts in source; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
