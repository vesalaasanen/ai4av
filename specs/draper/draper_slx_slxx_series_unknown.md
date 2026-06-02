---
spec_id: admin/draper-mc1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper MC1 Control Spec (SLx / SLxx Series Motor Controller)"
manufacturer: Draper
model_family: MC1
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - MC1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-14T15:36:19.448Z
last_checked_at: 2026-06-02T21:41:37.167Z
generated_at: 2026-06-02T21:41:37.167Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the MC1 controller, not the SLx/SLxx screen mechanics directly. Compatibility assumed at controller level."
  - "firmware version compatibility not stated in source."
  - "maximum number of MC1 receivers on a single RS-232 bus not stated."
  - "voltage/current ratings of MC1 not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:37.167Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literals in source; transport parameters verified; wire-level commands exact. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Draper MC1 Control Spec (SLx / SLxx Series Motor Controller)

## Summary
Two-way RS-232 serial command protocol for the Draper MC1 motor controller used to drive SLx / SLxx series projection screens. Covers open/close/stop/program primitives, position reporting, version query, administration (BUS / Radio port assignment), load-sense threshold setting, and specific-stop channel configuration. Connection: 9600 baud, 8N1, no parity, 1 stop bit, no authentication.

<!-- UNRESOLVED: source describes the MC1 controller, not the SLx/SLxx screen mechanics directly. Compatibility assumed at controller level. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: software  # X-on (Ctrl-Q, 0x11) / X-off (Ctrl-S, 0x13) documented
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power-up version broadcast
- routable        # inferred from open/close command examples
- queryable       # inferred from position + version query commands
- levelable       # inferred from open/close (screen position)
```

## Actions
```yaml
- id: open
  label: Open (lower screen)
  kind: action
  command: "*o{channel};"
  params:
    - name: channel
      type: string
      description: Channel 00-60 (00 = ALL, 60 = cut strap ALL); subsystem 02-7 BUS or 7-99 Radio
  notes: Example "*o01;". Time field optional; default pulse 2 sec. Use "q" to stop a forever pulse.

- id: close
  label: Close (raise screen)
  kind: action
  command: "*c{channel};"
  params:
    - name: channel
      type: string
      description: Channel 00-60
  notes: Example "*c10;".

- id: stop
  label: Stop motion
  kind: action
  command: "*s;"
  params: []
  notes: Default pulse 1/4 sec when sent alone.

- id: stop_specific
  label: Stop specific channel (serial)
  kind: action
  command: "*s{channel};"
  params:
    - name: channel
      type: string
      description: Channel 00-60
  notes: Serial-specific stop on a configured C22 channel. Open/Close on this channel also acts as stop.

- id: program
  label: Program command
  kind: action
  command: "*p{channel};"
  params:
    - name: channel
      type: string
      description: Channel 00-60
  notes: Used in calibration sequence. Example "*p01;". Default pulse 1/4 sec.

- id: quit_sending
  label: Quit sending (stop forever pulse)
  kind: action
  command: "*q;"
  params: []
  notes: "Footnote 6: stops a forever pulse; any other command also stops transmission but reports an error."

- id: query_position
  label: Query position
  kind: query
  command: "*r{channel};"
  params:
    - name: channel
      type: string
      description: Subsystem/main address to query
  notes: Response "*nnRpp;" (R=position report, pp=percent from reference), "*nnRN;" (not calibrated), or "*nnRU;" (unknown). Subsystem 0 = ALL systems (excludes radio).

- id: query_version
  label: Query version
  kind: query
  command: "*V;"
  params: []
  notes: Response "2.0;" or "3.0;R" (Radio) / "3.0;B" (BUS) followed by CR. Characters after V in command ignored.

- id: admin_report_version
  label: Administration - report version
  kind: action
  command: "*V3;"
  params: []
  notes: Returns version then R (Radio) or B (BUS) then CR.

- id: admin_make_radio
  label: Administration - make port 7 Radio
  kind: action
  command: "*R;"
  params: []
  notes: Requires RFTM plugged into port 7 jack powered by DCPM.

- id: admin_make_bus
  label: Administration - make port 7 BUS
  kind: action
  command: "*B;"
  params: []
  notes: Toggle port 7 from Radio back to BUS.

- id: program_accessor
  label: Program accessor
  kind: action
  command: "*a;"
  params: []
  notes: Administration command. Case-insensitive throughout protocol.

- id: set_minimum_load
  label: Set minimum load threshold
  kind: action
  command: "*C18 O{x} O{y};"
  params:
    - name: x
      type: string
      description: Position digit 1-9 (O5-O9 ignored as out of range)
    - name: y
      type: string
      description: Position digit 0-9; omit if 0 (O10). Extra digits ignored.
  notes: O10 = disable minimum load sense (useful for very small loads / relay-driven motors).

- id: set_stall_threshold
  label: Set stall threshold
  kind: action
  command: "*C19 O{x} O{y};"
  params:
    - name: x
      type: string
      description: Position digit 1-9
    - name: y
      type: string
      description: Position digit 0-9
  notes: Use C19 O12 O12 O12 to nudge down, C19 O11 to nudge up.

- id: set_specific_stop_channel
  label: Set "Specific Stop" channel
  kind: action
  command: "*C22 O\"{n}\";"
  params:
    - name: n
      type: string
      description: Channel number to bind as specific stop
  notes: Open/Close on this channel stops this motor if running, no motion if already stopped.

- id: calibrate_motor
  label: Calibrate motor (macro)
  kind: action
  command: "*p01;*c10;*o10;"
  params: []
  notes: Run motor to lower limit, then upper limit, then back to lower limit. Required after wiring change.

- id: factory_reset
  label: Factory reset (macro)
  kind: action
  command: "*p00;*c00;*c01;*o01;*s;"
  params: []
  notes: Extraneous characters sent before "*" are ignored but consume buffer.
```

## Feedbacks
```yaml
- id: position_report
  type: string
  description: "*nnRpp; - nn = main channel, pp = percent away from reference (0=reference, 99=opposite limit, ±2% error)."
  source_event: response to *r? query

- id: position_unknown_uncalibrated
  type: string
  description: "*nnRN; - N = position unknown, motor not yet calibrated."
  source_event: response to *r? query

- id: position_unknown
  type: string
  description: "*nnRU; - U = position unknown for other reasons."
  source_event: response to *r? query

- id: version_report
  type: string
  description: "2.0; or 3.0;R / 3.0;B + CR. R=Radio administered, B=BUS administered."
  source_event: response to *V; or *V3;

- id: ack_good_format
  type: string
  description: "G; - command formatted correctly and was not *r? or our *s?."
  source_event: after terminator received

- id: nack_bad_format
  type: string
  description: "U; - command not formatted correctly."
  source_event: after terminator received

- id: nack_uncalibrated
  type: string
  description: "X; - 'm' command cannot be executed (uncalibrated)."
  source_event: after terminator received

- id: power_up_banner
  type: string
  description: "\"version, X-on\" - sent when unit powers up."
  source_event: power up

- id: buffer_overflow
  type: string
  description: "O followed by X-on - buffer (120 bytes) overflowed and all data was purged."
  source_event: buffer overflow

- id: flow_control_xoff
  type: string
  description: "X-off (Ctrl-S, 0x13) - buffer half full, request sender pause."
  source_event: buffer half full

- id: flow_control_xon
  type: string
  description: "X-on (Ctrl-Q, 0x11) - buffer empty, resume sending (only if X-off was previously sent)."
  source_event: buffer empty
```

## Variables
```yaml
- id: subsystem_number
  type: integer
  range: "02-7 (BUS) or 7-99 (Radio)"
  description: Subsystem number prefix on each command after '*'.

- id: channel
  type: integer
  range: "00-60"
  description: 00 = ALL, 60 = "cut strap ALL".

- id: time_to_send
  type: integer
  range: "000-999 (20ths of a second)"
  description: Optional 3-digit field. 000 = forever (use *q; to stop). Max timed pulse = 50 sec. Radio values rounded up to nearest 10th sec.
```

## Events
```yaml
- id: power_up
  description: Unit broadcasts "version, X-on" on power up.

- id: position_drift_during_motion
  description: "If motor is moving when report command received, unit reports position at moment end-of-command is received. Result is true only at that instant."
```

## Macros
```yaml
- id: calibrate
  steps:
    - "*p01;  # program"
    - "*c10;  # close to upper limit"
    - "*o10;  # open to lower limit"
  purpose: "Required after wiring change or replacement. Establishes motor travel limits."

- id: factory_default_reset
  steps:
    - "*p00;  # program 00"
    - "*c00;  # close 00"
    - "*c01;  # close 01"
    - "*o01;  # open 01"
    - "*s;    # stop"
  purpose: "Reset all settings to factory default."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Stall sense: motor current must exceed and stay above stall load threshold for 1/4 sec before power is removed (not adjustable)."
  - "Minimum load: motor current must fall below and stay below minimum load threshold for 1/2 sec for MC1 to register limit reached (not adjustable)."
  - "IR/serial mutual exclusion: when an IR command is being sent, serial commands may be lost; when a serial command is received, an IR command may be lost."
  - "Buffer is 120 bytes; overflow purges all data and reports 'O' + X-on."
warnings:
  - "If stall level is set too low, motor will only run briefly in each direction because MC1 believes it is at the limit when it detects a stall."
  - "When entering Ox for C18/C19, commands O5-O9 are ignored as out of range."
```

## Notes
- Case-insensitive throughout: "o" same as "O".
- Terminator: ";" (0x3B) or "CR" (0x0D). "LF" (0x0A) ignored.
- Special chars: "*" (0x2A) start of command header.
- Total message length 2-10 characters, typically 6.
- Time between buffered commands = 0.5 sec; 0.1 sec after a stop.
- A button cannot be "held" — use the timed pulse field or *q; to terminate.
- If two-way serial is not used, several MC1 receivers can share one RS-232 link (each individually addressable via subsystem).
- Position percentage has up to ±2% error.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: maximum number of MC1 receivers on a single RS-232 bus not stated. -->
<!-- UNRESOLVED: voltage/current ratings of MC1 not stated in source. -->
```

Spec done. 19 actions enumerated (o, c, s, s-specific, p, q, r?, V, V3, R, B, a, C18, C19, C22, calibrate, factory_reset) plus feedbacks/variables/events/macros/safety per source. Empty sections removed. UNRESOLVED markers on gaps. No fabricated values.

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-14T15:36:19.448Z
last_checked_at: 2026-06-02T21:41:37.167Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:37.167Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literals in source; transport parameters verified; wire-level commands exact. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the MC1 controller, not the SLx/SLxx screen mechanics directly. Compatibility assumed at controller level."
- "firmware version compatibility not stated in source."
- "maximum number of MC1 receivers on a single RS-232 bus not stated."
- "voltage/current ratings of MC1 not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
