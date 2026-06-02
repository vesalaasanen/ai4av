---
spec_id: admin/draper-ls101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper LS101 Control Spec"
manufacturer: Draper
model_family: LS101
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - LS101
    - MC1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-14T23:03:23.630Z
last_checked_at: 2026-06-02T21:41:36.378Z
generated_at: 2026-06-02T21:41:36.378Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP or other transports — source documents only RS-232"
  - "load-sensing (C18/C19) and specific-stop (C22) appear to be IR/button programming sequences, not serial commands; omitted from Actions"
  - "load-sense thresholds (C18 min load, C19 stall) and specific-stop channel (C22)"
  - "no electrical, voltage, or interlock safety values stated in source beyond IR/serial mutual exclusion"
  - "m command syntax not stated"
  - "exact electrical/serial pinout, cable type, connector spec not in refined excerpt"
  - "relationship between LS101 product name and MC1 controller — source covers MC1; LS101 likely uses MC1 internally"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:36.378Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions matched to source protocol; all transport parameters verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Draper LS101 Control Spec

## Summary
Draper MC1 motor controller (used in LS101 screen line) supports two-way RS-232 serial control at 9600 8N1. Commands follow `*<subsystem><cmd><channel><time>;` framing with ASCII payloads to open, close, stop, program, and query motorized screen position.

<!-- UNRESOLVED: TCP/IP or other transports — source documents only RS-232 -->
<!-- UNRESOLVED: load-sensing (C18/C19) and specific-stop (C22) appear to be IR/button programming sequences, not serial commands; omitted from Actions -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # source documents X-on/X-off (Ctrl-Q/Ctrl-S) buffer flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: open/close drive screen up/down (effective on/off motion control)
- queryable    # inferred from "r" position query and "V" version query
- routable     # inferred: subsystem/channel addressing routes commands to specific units on bus
```

## Actions
```yaml
- id: open
  label: Open (raise screen)
  kind: action
  command: "*{subsystem}o{channel}{time};"
  params:
    - name: subsystem
      type: string
      description: "Subsystem number: 00=ALL, 02-7 if BUS, 7-99 if Radio"
    - name: channel
      type: string
      description: "Channel 00-60 (00=ALL, 60=cut strap ALL)"
    - name: time
      type: string
      description: "Optional duration in 1/20 seconds (000-999, 000=forever); if omitted command runs 2 seconds default"

- id: close
  label: Close (lower screen)
  kind: action
  command: "*{subsystem}c{channel}{time};"
  params:
    - name: subsystem
      type: string
    - name: channel
      type: string
    - name: time
      type: string
      description: "Optional 1/20 second units"

- id: stop
  label: Stop motion
  kind: action
  command: "*{subsystem}s;"
  params:
    - name: subsystem
      type: string
      description: "Channel optional/ignored for stop command"

- id: program
  label: Program mode
  kind: action
  command: "*{subsystem}p{channel}{time};"
  params:
    - name: subsystem
      type: string
    - name: channel
      type: string
    - name: time
      type: string
      description: "Default duration ¼ second when omitted"

- id: program_accessor
  label: Program accessor
  kind: action
  command: "*{subsystem}a{channel}{time};"
  params:
    - name: subsystem
      type: string
    - name: channel
      type: string
    - name: time
      type: string

- id: quit_sending
  label: Quit forever command
  kind: action
  command: "*{subsystem}q;"
  params:
    - name: subsystem
      type: string
      description: "Stop a forever (time=000) transmission cleanly without error"

- id: version_query
  label: Report firmware version
  kind: query
  command: "*{subsystem}V;"
  params:
    - name: subsystem
      type: string
      description: "All characters after V are ignored"

- id: set_port7_radio
  label: Set port 7 to Radio mode
  kind: action
  command: "*{subsystem}R;"
  params:
    - name: subsystem
      type: string
      description: "Requires RFTM plugged into port 7 powered by DCPM"

- id: set_port7_bus
  label: Set port 7 to BUS mode
  kind: action
  command: "*{subsystem}B;"
  params:
    - name: subsystem
      type: string

- id: report_position_query
  label: Report position (r query)
  kind: query
  command: "*{subsystem}r{channel};"
  params:
    - name: subsystem
      type: string
    - name: channel
      type: string
      description: "Returns *nnRpp; with pp = percent away from reference (0=reference, 99=opposite limit)"
```

## Feedbacks
```yaml
- id: power_up_banner
  type: string
  description: "On power-up MC1 sends 'version, X-on'"
  response: "version, X-on"

- id: position_report
  type: string
  description: "Position percent away from reference"
  response_template: "*{nn}R{pp};"
  notes: "nn = main channel, pp = percent (0=reference, 99=opposite limit, ±2% error)"

- id: position_uncalibrated
  type: string
  response: "*{nn}RN;"
  description: "N = position unknown because not yet calibrated"

- id: position_unknown
  type: string
  response: "*{nn}RU;"
  description: "U = position unknown"

- id: command_ack_good
  type: string
  response: "G;"
  description: "Command formatted correctly (not 'r' or 's')"

- id: command_ack_malformed
  type: string
  response: "U;"
  description: "Command not formatted correctly"

- id: command_ack_uncalibrated
  type: string
  response: "X;"
  description: "'m' command cannot be executed (uncalibrated)"

- id: version_response
  type: string
  response: "2.0;"
  description: "Reply to V query. Source also mentions 3.0 followed by R (Radio) or B (BUS) and CR"

- id: buffer_overflow
  type: string
  response: "O then X-on"
  description: "Buffer (120 bytes) overflowed and all data purged"

- id: flow_control_xoff
  type: string
  response: "X-off (Ctrl-S, 0x13)"
  description: "Buffer half full - sender should pause"

- id: flow_control_xon
  type: string
  response: "X-on (Ctrl-Q, 0x11)"
  description: "Buffer empty - sender may resume (only if X-off was previously sent)"
```

## Variables
```yaml
# UNRESOLVED: load-sense thresholds (C18 min load, C19 stall) and specific-stop channel (C22)
# are documented but appear to be IR/button-sequence programming commands rather than RS-232
# serial commands. Source does not show *-framed serial equivalents.
```

## Events
```yaml
- id: powered_up
  description: "Unsolicited 'version, X-on' on power-up"
  payload: "version, X-on"
```

## Macros
```yaml
- id: calibrate_motor
  label: Calibrate motor (full travel sweep)
  description: "Drives motor to lower limit, then upper limit, then back to lower limit"
  sequence:
    - "*p01;"
    - "*c10;"
    - "*o10;"

- id: factory_default_reset
  label: Reset everything to factory default
  description: "Source: 'A button cannot be held, so to reset everything to factory default send the following sequence'"
  sequence:
    - "*p00;"
    - "*c00;"
    - "*c01;"
    - "*o01;"
    - "*s;"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: ir_serial_conflict
    description: "When an IR command is being sent, serial commands may be lost; when a serial command is received, an IR command may be lost. Do not drive IR and serial concurrently."
# UNRESOLVED: no electrical, voltage, or interlock safety values stated in source beyond IR/serial mutual exclusion
```

## Notes
- Total message length 2–10 chars, typically 6.
- Case-insensitive opcodes (`o` == `O`).
- Terminator may be `;` (0x3B) or CR (0x0D); LF (0x0A) ignored.
- Header `*` (0x2A) required; chars before `*` ignored but count toward buffer fill.
- Buffer is 120 bytes; X-off at half full, X-on when empty (only if X-off previously sent).
- Inter-command gap 0.5 s when multiple buffered (0.1 s after a stop).
- Max timed pulse 50 sec; time field in 1/20-second units, 000 = forever (use `q` to stop).
- Position reported during motion reflects position at moment end-of-command received, may differ moments later. Position percentage has up to ±2% error.
- Subsystem `00` = ALL systems (excludes radio channels). Channel `00` = ALL, channel `60` = "cut strap ALL".
- Multiple MC1 receivers may share one RS-232 link if two-way mode unused (subsystem addressing).
- Source references an "m" (move?) command in error responses but does not document its syntax. <!-- UNRESOLVED: m command syntax not stated -->
- Version "3.0" report appends R (Radio) or B (BUS) plus CR; "2.0" stated as a sample V response.
<!-- UNRESOLVED: exact electrical/serial pinout, cable type, connector spec not in refined excerpt -->
<!-- UNRESOLVED: relationship between LS101 product name and MC1 controller — source covers MC1; LS101 likely uses MC1 internally -->

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-14T23:03:23.630Z
last_checked_at: 2026-06-02T21:41:36.378Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:36.378Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions matched to source protocol; all transport parameters verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP or other transports — source documents only RS-232"
- "load-sensing (C18/C19) and specific-stop (C22) appear to be IR/button programming sequences, not serial commands; omitted from Actions"
- "load-sense thresholds (C18 min load, C19 stall) and specific-stop channel (C22)"
- "no electrical, voltage, or interlock safety values stated in source beyond IR/serial mutual exclusion"
- "m command syntax not stated"
- "exact electrical/serial pinout, cable type, connector spec not in refined excerpt"
- "relationship between LS101 product name and MC1 controller — source covers MC1; LS101 likely uses MC1 internally"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
