---
spec_id: admin/draper-mc1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper MC1 Control Spec"
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
retrieved_at: 2026-05-14T15:35:22.030Z
last_checked_at: 2026-06-02T00:54:00.603Z
generated_at: 2026-06-02T00:54:00.603Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no port number, voltage, or current specs in source."
  - "load-sensing thresholds (min load, stall) are configured by C18/C19"
  - "no electrical ratings, stall current defaults, or installation interlocks in source."
  - "no RS-232 port number (D-sub pinout / DB9/DB25) stated."
  - "no voltage, current draw, or power supply specs in source."
  - "firmware version compatibility range not stated; controller reports \"2.0\" on V query."
  - "factory-default values for min load and stall thresholds not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:54:00.603Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched verbatim in source with correct transport parameters (9600 baud, 8 data bits, no parity, 1 stop bit, software flow control). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Draper MC1 Control Spec

## Summary
RS-232 serial command protocol for Draper MC1 motor controller (used in AeroLift 100 projection screen lifts). Two-way communication at 9600 baud, ASCII framed by `*` header and `;` (or CR) terminator. Supports open/close/stop, calibration, position query, and load-sensing configuration.

<!-- UNRESOLVED: no port number, voltage, or current specs in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: software  # X-on/X-off per source: buffer half full = X-off, buffer empty = X-on
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from open/close commands
- queryable  # inferred from "r" position query
```

## Actions
```yaml
# Command format: *<subsystem><admin><command><channel><time>;
# Subsystem: 02-7 BUS, 7-99 Radio, 0 = ALL
# Channel: 00-60 (00 = ALL, 60 = cut strap ALL)
# Time: 000-999 in 1/20 sec (000 = forever; omit = 2 sec for motion, 1/4 sec for stop/program)
# Case insensitive.

- id: lower_screen
  label: Lower Screen (Open)
  kind: action
  command: "*{subsystem}{o}{channel}{time};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio, 0 = ALL"
    - name: channel
      type: integer
      description: "00-60; 00 = ALL, 60 = cut strap ALL"
    - name: time
      type: integer
      description: "000-999 in 1/20 sec; 000 = forever; omit for 2 sec default"

- id: raise_screen
  label: Raise Screen (Close)
  kind: action
  command: "*{subsystem}{c}{channel}{time};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio, 0 = ALL"
    - name: channel
      type: integer
      description: "00-60; 00 = ALL, 60 = cut strap ALL"
    - name: time
      type: integer
      description: "000-999 in 1/20 sec; 000 = forever; omit for 2 sec default"

- id: stop_motion
  label: Stop Motion
  kind: action
  command: "*{subsystem}{s}{channel};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio"
    - name: channel
      type: integer
      description: "Optional for stop; ignored if present"

- id: program
  label: Program
  kind: action
  command: "*{subsystem}{p}{channel};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio"
    - name: channel
      type: integer
      description: "Channel number to program"

- id: program_accessor
  label: Program Accessor
  kind: action
  command: "*{subsystem}{a}{channel};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio"
    - name: channel
      type: integer
      description: "Channel number"

- id: quit_forever
  label: Quit Sending (stop forever command)
  kind: action
  command: "*{subsystem}{q}{channel};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio"
    - name: channel
      type: integer
      description: "Channel number"

- id: position_query
  label: Position Query
  kind: query
  command: "*{subsystem}{r}{channel};"
  params:
    - name: subsystem
      type: integer
      description: "02-7 BUS, 7-99 Radio; 0 = ALL (excludes radio)"
    - name: channel
      type: integer
      description: "Channel number"

- id: version_query
  label: Version Query
  kind: query
  command: "*V;"
  params: []

- id: admin_radio
  label: Administer Port 7 as Radio
  kind: action
  command: "*R;"
  params: []

- id: admin_bus
  label: Administer Port 7 as BUS
  kind: action
  command: "*B;"
  params: []

- id: calibrate_motor
  label: Calibrate Motor
  kind: action
  command: "*p01;*c10;*o10;"
  params: []
  notes: "Per source: programs, closes to upper limit, opens to lower limit, returns to lower limit. Motor becomes calibrated."

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "*p00;*c00;*c01;*o01;*s;"
  params: []
  notes: "Per source: button cannot be held, use this command string to reset all settings to factory default."

- id: set_min_load
  label: Set Minimum Load Threshold
  kind: action
  command: "C18 O{x} O{y}"
  params:
    - name: x
      type: integer
      description: "Ox; O5-O9 ignored as out of range; O10 = y=0 shortcut"
    - name: y
      type: integer
      description: "Oy; ignored if 0"
  notes: "Source documents this as IR-style load-sense command, not RS-232 frame. Listed for completeness."

- id: set_stall_threshold
  label: Set Stall Load Threshold
  kind: action
  command: "C19 O{x} O{y}"
  params:
    - name: x
      type: integer
      description: "Ox; O5-O9 ignored as out of range; O10 = y=0 shortcut"
    - name: y
      type: integer
      description: "Oy; ignored if 0"
  notes: "IR-style load-sense command. Nudge with C19 O11 (up) or C19 O12 (down)."

- id: set_specific_stop
  label: Set Specific Stop Channel
  kind: action
  command: "C22 O{N}"
  params:
    - name: N
      type: integer
      description: "Channel number to bind as specific-stop for this motor"
  notes: "IR-style. Serial users can use plain 's' command on any channel."
```

## Feedbacks
```yaml
- id: powerup_message
  description: Sent on power-up, before command traffic
  payload: '"version, X-on"  # version string followed by X-on (0x11)'

- id: position_report
  description: Periodic position report, also on "r" query
  payload: "*nnRpp;  # nn = main channel, pp = percent away from reference (0-99, 0=at reference, 99=opposite limit)"

- id: position_unknown_uncalibrated
  description: Response to "r" query when position unknown because not yet calibrated
  payload: "*nnRN;"

- id: position_unknown
  description: Response to "r" query when position unknown for other reason
  payload: "*nnRU;"

- id: ack_good
  description: Command formatted correctly and not "r" or "s"
  payload: "G;"

- id: nack_format
  description: Command not formatted correctly
  payload: "U;"

- id: nack_uncalibrated
  description: "m" command cannot be executed because motor is uncalibrated
  payload: "X;"

- id: version_response
  description: Response to "V" query
  payload: "2.0;"

- id: buffer_overflow
  description: 120-byte buffer overflowed, all data purged
  payload: "O followed by X-on (0x11)"

- id: flow_control_xoff
  description: Buffer half full; sender must pause
  payload: "X-off (0x13, Ctrl-S)"

- id: flow_control_xon
  description: Buffer empty; sender may resume (only if X-off was sent)
  payload: "X-on (0x11, Ctrl-Q)"
```

## Variables
```yaml
# UNRESOLVED: load-sensing thresholds (min load, stall) are configured by C18/C19
# commands (see Actions). No read-back query documented in source.
```

## Events
```yaml
- id: powerup
  description: "On power-up, controller sends 'version, X-on' before any command traffic."

- id: motion_complete
  description: "While motor moves, controller emits periodic position reports. Report reflects position at moment end-of-command character is received, not at time of report generation."
  # See Feedbacks.position_report
```

## Macros
```yaml
# Multi-step sequences documented in source.
- id: calibrate_motor
  description: Calibrate motor to its limits
  steps:
    - "*p01;   # program"
    - "*c10;   # close to upper limit (10 = 0.5 sec pulse)"
    - "*o10;   # open to lower limit"

- id: factory_reset
  description: Reset all settings to factory default
  steps:
    - "*p00;"
    - "*c00;"
    - "*c01;"
    - "*o01;"
    - "*s;     # stop"
  notes: "Source: 'button cannot be held, so to reset everything to factory default send this sequence.'"

- id: lower_screen_test
  description: Initial connection test from source
  steps:
    - "*o01;   # lower screen; verify motion + report received"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Load sensing: motor stops if current exceeds stall threshold for 1/4 sec, or stays below min load for 1/2 sec after start."
  - "Source warning: when IR command is being sent, serial commands may be lost; when serial command is received, IR command may be lost."
  # UNRESOLVED: no electrical ratings, stall current defaults, or installation interlocks in source.
```

## Notes
- **Message length:** 2-10 characters, typically 6.
- **Case insensitive:** `o` == `O`, etc.
- **Time field default:** omitted = 2 sec for motion commands, 1/4 sec for stop/program. Time between buffered commands = 0.5 sec (0.1 sec after a stop). Max timed pulse = 50 sec.
- **Position accuracy:** percentage may have up to 2% error.
- **Address filtering:** "no response" if `r`, `m`, or `s` command not addressed to this unit.
- **Radio mode:** subsystem 7-99 requires RFTM plugged into port 7 jack, powered by DCPM.
- **Report timing:** position report reflects state at end-of-command, not at report emission time.
- **Calibration prerequisite:** motor must be calibrated (`*p01;*c10;*o10;`) before position queries return meaningful percentages.
- **Stall tuning procedure** in source: measure running current or read motor rating label, enter as C19 threshold, run to stall point, verify MC1 shuts off 1/4 sec after stall. If MC1 keeps running, threshold too high; nudge down (C19 O12). If motor stops mid-travel, too sensitive; nudge up (C19 O11).
- **C18/C19/C22 commands** are documented as IR-style load-sense configuration, not the framed RS-232 protocol. Included for completeness; their framing differs from `*...;` syntax.

<!-- UNRESOLVED: no RS-232 port number (D-sub pinout / DB9/DB25) stated. -->
<!-- UNRESOLVED: no voltage, current draw, or power supply specs in source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated; controller reports "2.0" on V query. -->
<!-- UNRESOLVED: factory-default values for min load and stall thresholds not stated. -->

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-14T15:35:22.030Z
last_checked_at: 2026-06-02T00:54:00.603Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:54:00.603Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched verbatim in source with correct transport parameters (9600 baud, 8 data bits, no parity, 1 stop bit, software flow control). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no port number, voltage, or current specs in source."
- "load-sensing thresholds (min load, stall) are configured by C18/C19"
- "no electrical ratings, stall current defaults, or installation interlocks in source."
- "no RS-232 port number (D-sub pinout / DB9/DB25) stated."
- "no voltage, current draw, or power supply specs in source."
- "firmware version compatibility range not stated; controller reports \"2.0\" on V query."
- "factory-default values for min load and stall thresholds not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
