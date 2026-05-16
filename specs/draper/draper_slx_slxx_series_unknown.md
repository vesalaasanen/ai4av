---
spec_id: admin/draper-slx-slxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper SLx SLxx Series Control Spec"
manufacturer: Draper
model_family: "SLx SLxx Series"
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - "SLx SLxx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-15T21:32:06.221Z
generated_at: 2026-05-15T21:32:06.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "R (make port 7 Radio)"
  - "B (make port 7 BUS)"
  - "a (program accessor)"
verification:
  verdict: verified
  checked_at: 2026-05-15T21:32:06.221Z
  matched_actions: 10
  action_count: 10
  confidence: high
  summary: "All 10 spec actions matched literals in source; transport parameters verified; 3 extra administrative commands below short threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Draper SLx SLxx Series Control Spec

## Summary
Draper SLx SLxx Series motorised projection screen controller (MC1). Serial RS-232 control protocol using asterisk-prefixed ASCII command strings. Supports open, close, stop, program, and position query commands via a simple request-response scheme.

<!-- UNRESOLVED: intended for projection screens only; other product types in the SLx SLxx range not covered by this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: hardware flow control not mentioned in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # open/close commands drive motor
- routable     # channel-based addressing allows multiple units on one serial link
- queryable    # r query returns position, V query returns version
```

## Actions
```yaml
- id: open
  label: Open (Lower Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 008-609 (2 digits), 00 = all systems
    - name: time
      type: integer
      description: Time in 20ths of a second (optional, max 999 = ~50s). If omitted, default 2s
  example: "*o01;"   # open channel 01

- id: close
  label: Close (Raise Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 008-609, 00 = all systems
    - name: time
      type: integer
      description: Time in 20ths of a second (optional)
  example: "*c01;"

- id: stop
  label: Stop Motor
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 008-609
  example: "*s01;"

- id: program
  label: Program
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 008-609
    - name: time
      type: integer
      description: Time in 20ths of a second (optional)
  example: "*p01;*c10;*o10;"

- id: quit
  label: Quit Transmission
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 008-609
  example: "*q01;"

- id: report_version
  label: Report Version
  kind: action
  params: []
  example: "*V;"

- id: report_position
  label: Report Position
  kind: action
  params:
    - name: channel
      type: integer
      description: Main address channel
  example: "*nnR;"

- id: set_minimum_load
  label: Set Minimum Load Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: Load value O5-O9 valid, O10 = 0 (disabled)
  example: "*C18 O12 O0;"

- id: set_stall_threshold
  label: Set Stall Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: Stall threshold value
  example: "*C19 O12;"

- id: specific_stop_channel
  label: Set Specific Stop Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number for specific stop
    - name: stop_channel
      type: integer
      description: Stop channel number
  example: "*C22 O1;"
```

## Feedbacks
```yaml
- id: position_report
  description: |
    *nnRpp; - pp = percent away from reference (00 = reference, 99 = opposite limit)
    *nnRN; - position unknown, not yet calibrated
    *nnRU; - position unknown
  values:
    - Rpp: position percent (0-99)
    - N: not calibrated
    - U: unknown

- id: version_report
  description: "2.0;" followed by R (Radio) or B (BUS) on port 7 query

- id: ack_ok
  description: "G;" - command formatted correctly and accepted (not r, m, or s)

- id: ack_bad_format
  description: "U;" - command not formatted correctly

- id: ack_uncalibrated
  description: "X;" - m command cannot execute (uncalibrated)

- id: no_response
  description: No response if command was not addressed to this unit

- id: buffer_overflow
  description: "O" followed by X-on - buffer overflow, all data purged

- id: buffer_half_full
  description: "X-off" (Ctrl-S) - buffer is half full

- id: buffer_empty
  description: "X-on" (Ctrl-Q) - buffer empty, resumes transmission

- id: powered_up
  description: "version, X-on" on startup

- id: radio_percent
  description: "*nnRpp;" - nn = main channel, pp = percent (radio)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond load sensing thresholds
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages defined beyond responses to queries
```

## Macros
```yaml
- id: factory_reset
  label: Factory Reset
  description: Reset all settings to factory defaults
  steps:
    - "*p00;*c00;*c01;*o01;*s;"

- id: calibrate_motor
  label: Calibrate Motor
  description: Motor travels to lower limit, upper limit, then back to lower limit
  steps:
    - "*p01;*c10;*o10;"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit interlock or confirmation procedure in source
#
# WARNING (from source): when an IR command is being sent, serial commands may be
# lost, and when a serial command is received, an IR command may be lost.
#
# Stall threshold note: if set too low, motor runs briefly in both directions
# because MC1 believes it is at the limit. Requires careful calibration.
```

## Notes

Command format: `*[subsystem][command][channel][time];`
- Header: `*` (asterisk, ASCII 0x2A)
- Subsystem: 02–99 for BUS, 7 for Radio
- Command: o=open, c=close, s=stop, p=program, a=program accessor, q=quit, r=report, V=version
- Channel: 2 digits 008–609 (00 = all)
- Time: optional 3 digits in 20ths of a second (000 = forever, max 999 = ~50s)
- Terminator: `;` (semicolon, ASCII 0x3B) or CR (carriage return, ASCII 0x0D)

If motor is moving when position report is received, reported position is true only at that moment — motor may have moved immediately after.

Position percentage may have up to 2% error. 00 = at reference, 99 = at opposite limit.

Minimum load sensing disabled when set to 0 (C18 O10). Stall sensing requires current above threshold for ¼ second before power removal. Minimum load detection requires current below threshold for ½ second.

Buffer is 120 bytes. Extraneous characters before `*` are ignored but fill the buffer.

<!-- UNRESOLVED: max command message length not explicitly bounded in source beyond typical 6 chars and max 10 chars noted -->
<!-- UNRESOLVED: supported models list incomplete — source covers MC1 controller, not full SLx SLxx range specifics -->

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-15T21:32:06.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:32:06.221Z
matched_actions: 10
action_count: 10
confidence: high
summary: "All 10 spec actions matched literals in source; transport parameters verified; 3 extra administrative commands below short threshold."
```

## Known Gaps

```yaml
- "R (make port 7 Radio)"
- "B (make port 7 BUS)"
- "a (program accessor)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
