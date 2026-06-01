---
spec_id: admin/draper-ls101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper LS101 Control Spec"
manufacturer: Draper
model_family: "Draper LS101"
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - "Draper LS101"
    - MC1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-20T11:44:07.857Z
generated_at: 2026-05-20T11:44:07.857Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:44:07.857Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Draper LS101 Control Spec

## Summary
Motorized projection screen controlled via RS-232 serial through the Draper MC1 controller. Supports open, close, stop, calibration, load sensing, and position reporting. Protocol uses ASCII command frames with asterisk header and semicolon terminator.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: motor open/close/stop commands
- queryable    # inferred: "r" query returns position percentage
```

## Actions
```yaml
- id: open
  label: Open (Lower Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (00-60, 00 = ALL)"
    - name: duration
      type: integer
      description: "Optional time in 1/20th seconds (000-999). 000 = forever. Omit for default 2 seconds."
  notes: "Command letter 'o'. Example: *o01; lowers screen on channel 01."

- id: close
  label: Close (Raise Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (00-60, 00 = ALL)"
    - name: duration
      type: integer
      description: "Optional time in 1/20th seconds (000-999). Omit for default 2 seconds."
  notes: "Command letter 'c'."

- id: stop
  label: Stop Motor
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (00-60). Optional - ignored if omitted."
  notes: "Command letter 's'. Channel value optional and ignored for stop."

- id: quit_sending
  label: Quit Sending (Stop Forever Command)
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (00-60). Optional for quit."
  notes: "Command letter 'q'. Stops a running forever (000 duration) command."

- id: calibrate
  label: Calibrate Motor
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (00-60)"
  notes: "Full calibration sequence: *p{ch};*c{ch}10;*o{ch}10; - motor runs to lower limit, upper limit, then back to lower limit."

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  notes: "Sequence *p00;*c00;*c01;*o01;*s; resets all to factory defaults."

- id: set_min_load_threshold
  label: Set Minimum Load Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: value
      type: integer
      description: "Threshold value (O10 = 0 disables minimum load check). 05-09 ignored."
  notes: "Command C18 Ox Oy. A value of 0 (O10) disables minimum load sensing."

- id: set_stall_threshold
  label: Set Stall Load Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: value
      type: integer
      description: "Stall threshold value"
  notes: "Command C19 Ox Oy. Can nudge down with repeated O12, nudge up with O11."

- id: set_specific_stop_channel
  label: Set Specific Stop Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number to assign for specific stop"
  notes: "Command C22 O\"N\". Open or close on this channel stops motor without causing motion if already stopped."

- id: report_version
  label: Report Firmware Version
  kind: action
  params: []
  notes: "Command V. Response: version string (e.g. 2.0;) followed by R (radio) or B (BUS) and CR."
- id: program_accessor
  label: Program Accessor
  kind: action
  params:
    - name: channel
      type: integer
    - name: duration
      type: integer
      description: "1/20th seconds (000-999)"
  notes: "Command letter a. Program accessor command."

- id: uncalibrated_response
  label: Move (Uncalibrated Response)
  kind: action
  params:
    - name: channel
      type: integer
    - name: duration
      type: integer
  notes: "Command letter m. Returns X if motor uncalibrated."

- id: query_position
  label: Query Position
  kind: query
  params:
    - name: channel
      type: integer
  notes: "Command letter r. Response: *nnRpp; or *nnRN; or *nnRU;"

- id: make_port7_radio
  label: Make Port 7 Radio
  kind: action
  params: []
  notes: "Administration command R."

- id: make_port7_bus
  label: Make Port 7 BUS
  kind: action
  params: []
  notes: "Administration command B."
```

## Feedbacks
```yaml
- id: position_report
  type: string
  values:
    - pattern: "*nnRpp;"
      description: "nn = channel, pp = percent away from reference (0-99). 0 = at reference, 99 = at opposite limit."
  notes: "Response to 'r' query. Up to 2% error. Position may change between report and read."

- id: position_unknown
  type: enum
  values: [N, U]
  notes: "N = not yet calibrated. U = position unknown."

- id: command_ack
  type: enum
  values: [G, U, X]
  notes: "G = formatted correctly. U = format error. X = command cannot execute (e.g. uncalibrated for 'm')."

- id: buffer_status
  type: enum
  values: [X-off, X-on, O]
  notes: "X-off (Ctrl-S) = buffer half full, stop sending. X-on (Ctrl-Q) = buffer empty, resume. O + X-on = buffer overflow, all data purged."

- id: power_up
  type: string
  values:
    - pattern: "version, X-on"
      description: "Sent on power-up."
```

## Variables
```yaml
- id: position_percent
  type: integer
  min: 0
  max: 99
  unit: percent
  description: "Screen position as percent away from reference. Queried via 'r' command."
```

## Events
```yaml
- id: power_on_notification
  description: "MC1 sends 'version, X-on' on power-up, followed by *nnRpp; (current position)."

- id: buffer_overflow
  description: "MC1 sends 'O' followed by X-on when 120-byte buffer overflows and all data is purged."

- id: buffer_half_full
  description: "MC1 sends X-off (Ctrl-S) when buffer is half full - sender should pause."

- id: buffer_empty
  description: "MC1 sends X-on (Ctrl-Q) when buffer empties, only if X-off was previously sent."
```

## Macros
```yaml
- id: full_calibration
  label: Full Motor Calibration
  steps:
    - action: program
      params: { channel: "{ch}" }
    - action: close
      params: { channel: "{ch}", duration: 10 }
    - action: open
      params: { channel: "{ch}", duration: 10 }
  notes: "Motor runs to lower limit → upper limit → back to lower limit. Command: *p{ch};*c{ch}10;*o{ch}10;"

- id: factory_reset
  label: Factory Default Reset
  steps:
    - action: program
      params: { channel: 0 }
    - action: close
      params: { channel: 0 }
    - action: close
      params: { channel: 1 }
    - action: open
      params: { channel: 1 }
    - action: stop
      params: {}
  notes: "Command sequence: *p00;*c00;*c01;*o01;*s;"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: |
  Load sensing stops motor on stall (exceeds stall threshold for 1/4 second) or 
  limit reached (below minimum load threshold for 1/2 second). Timings not adjustable.
  IR and serial commands can interfere - IR commands may be lost during serial receive 
  and vice versa.
```

## Notes
- Command frame format: `*` (header) + subsystem/channel (2 digits) + command (1 char) + optional time (3 digits, 1/20th sec) + `;` or CR (terminator). Total 2–10 characters.
- Channel 00 = ALL. Channels 01–60 for individual motors. Channels 02–07 for BUS, 07–99 for Radio.
- Default command duration: 2 seconds (except stop = 1/4 second, program = 1/4 second). Duration `000` = forever (stop with `q`).
- Max timed pulse: 50 seconds. Radio commands round up to nearest 1/10th second.
- Minimum 0.5 second between buffered commands (0.1 second after stop).
- 120-byte serial buffer. Extraneous characters before `*` are ignored but count toward buffer.
- Case insensitive commands.
- Position reporting has up to 2% error. Reading while motor is moving reports position at command receipt time, not current time.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: "m" command mentioned but not fully documented (returns X; if uncalibrated) -->
<!-- UNRESOLVED: "a" (program accessor) command mentioned but not documented -->
<!-- UNRESOLVED: BUS/Radio port 7 configuration details (R/B commands) not fully specified -->
<!-- UNRESOLVED: exact voltage/current/power specifications not stated -->
<!-- UNRESOLVED: RFTM and DCPM hardware requirements for radio mode not specified -->

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-20T11:44:07.857Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:44:07.857Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
