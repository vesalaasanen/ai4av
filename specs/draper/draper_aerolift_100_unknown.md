---
spec_id: admin/draper-aerolift-100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper AeroLift 100 Control Spec"
manufacturer: Draper
model_family: "AeroLift 100"
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - "AeroLift 100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-15T21:30:19.133Z
generated_at: 2026-05-15T21:30:19.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-15T21:30:19.133Z
  matched_actions: 10
  action_count: 10
  confidence: high
  summary: "All 10 spec actions matched source commands literally; transport parameters verified; core command table fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Draper AeroLift 100 Control Spec

## Summary
Draper AeroLift 100 motorised projection screen controller. MC1 serial protocol over RS-232. Two-way communication: commands to control open/close/stop/program, position feedback via response strings. Supports single or multi-unit bus.

<!-- UNRESOLVED: device rated voltage/current/power not stated in source. UNRESOLVED: IR command overlap behavior not fully documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # MC1 sends X-off when buffer half full, X-on when empty
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: open/close/stop commands present
- queryable  # inferred: r query returns position, V query returns version
```

## Actions
```yaml
- id: open
  label: Open (Lower Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)
    - name: time
      type: integer
      description: Optional time in 20ths of seconds (000-999, 000 = forever)

- id: close
  label: Close (Raise Screen)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)
    - name: time
      type: integer
      description: Optional time in 20ths of seconds

- id: stop
  label: Stop Motor
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)

- id: program
  label: Program Motor Limits
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)
    - name: mode
      type: string
      description: "Program mode: c=close limit, o=open limit, 00=reset all"

- id: program_accessor
  label: Program Accessor
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)

- id: set_radio_mode
  label: Set Port 7 Radio Mode
  kind: action
  params: []
  description: "R command - configure port 7 as Radio. Requires RFTM plugged into port 7, powered by DCPM."

- id: set_bus_mode
  label: Set Port 7 Bus Mode
  kind: action
  params: []
  description: "B command - configure port 7 as BUS."

- id: report_position
  label: Report Position
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99, 00 = all)

- id: report_version
  label: Report Version
  kind: action
  params: []

- id: quit_sending
  label: Quit Sending
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (2-99)
```

## Feedbacks
```yaml
- id: position_report
  description: "*nnRpp; - returns channel nn, position pp percent from reference (0=reference, 99=opposite limit)"
  type: string
  example: "*02R50;"

- id: position_unknown_not_calibrated
  description: "*nnRN; - position unknown, motor not yet calibrated"
  type: string
  example: "*02RN;"

- id: position_unknown
  description: "*nnRU; - position unknown"
  type: string
  example: "*02RU;"

- id: command_accepted
  description: "G; - command formatted correctly and accepted"
  type: string
  example: "G;"

- id: command_malformed
  description: "U; - command not formatted correctly"
  type: string
  example: "U;"

- id: command_cannot_execute
  description: "X; - m command cannot be executed (uncalibrated)"
  type: string
  example: "X;"

- id: version_response
  description: "2.0; - firmware version report"
  type: string
  example: "2.0;"

- id: buffer_overflow
  description: "O + X-on - buffer overflow, all data purged"
  type: string
  example: "OX-on"

- id: buffer_half_full
  description: "X-off - buffer is half full (Ctrl-S)"
  type: string
  example: "X-off"

- id: buffer_empty
  description: "X-on - buffer is empty (Ctrl-Q), sent only if X-off was previously sent"
  type: string
  example: "X-on"

- id: powered_up
  description: "version report and X-on sent on startup"
  type: string
  example: "version, X-on"
```

## Variables
```yaml
- id: load_sense_minimum
  label: Minimum Load Threshold
  description: "C18 Ox Oy - set minimum load threshold. O5-O9 invalid. O10 = zero (disable check)."

- id: stall_threshold
  label: Stall Threshold
  description: "C19 Ox Oy - set stall threshold. Motor stops 1/4s after stall detected."

- id: specific_stop_channel
  label: Specific Stop Channel
  description: "C22 O'N' - assign a specific channel for bus stop command."

- id: motor_position
  label: Motor Position
  description: "Read-only. Reported as percentage 0-99 via r command. 0 = reference (lower limit), 99 = opposite limit. Accuracy ±2%."
```

## Events
```yaml
# UNRESOLVED: MC1 does not appear to send unsolicited events; all communication is request/response.
```

## Macros
```yaml
- id: factory_reset
  label: Factory Reset
  description: "*p00;*c00;*c01;*o01;*s;"
  steps:
    - "*p00;"
    - "*c00;"
    - "*c01;"
    - "*o01;"
    - "*s;"

- id: calibrate_motor
  label: Calibrate Motor
  description: "Runs motor to lower limit, upper limit, back to lower limit."
  steps:
    - "*p01;"
    - "*c10;"
    - "*o10;"

- id: reset_to_reference
  label: Reset to Reference
  description: "Send screen to lower (reference) position."
  steps:
    - "*o01;"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety interlock or confirmation procedure stated in source.
# WARNING present: IR commands and serial commands may conflict/lost when the other is active.
# Load sensing (stall/minimum threshold) described but no explicit safety thresholds stated.
```

## Notes

**Command format:** `*nnXpp;` — asterisk header, 2-digit channel, 1-char command, optional 3-digit time (20ths of sec), semicolon terminator or CR. Max message 10 chars, typically 6.

**Terminator:** semicolon (ASCII 59 / 0x3B) or CR (ASCII 13 / 0x0D). LF (ASCII 10 / 0x0A) is ignored. Extraneous characters before `*` are ignored but count toward buffer fill.

**Channel 00** = all units (super group). Does not include radio channels. Channel 60 = "cut strap ALL".

**Case insensitive:** o = O, c = C, etc.

**Time behavior:** default 2s if no digits, except stop/program which default to 0.25s. Max timed pulse 50s. 000 = forever (use q to stop). Radio time values rounded up to nearest 10th second.

**Buffer:** 120 bytes. XON/XOFF flow control — MC1 sends X-off (Ctrl-S, 0x13) when half full, X-on (Ctrl-Q, 0x11) when empty. Time between commands 0.5s for buffered commands, 0.1s after stop.

**Position accuracy:** ±2%. Position may change between report and receipt — motor may still be moving.

**Radio mode:** requires RFTM plugged into port 7, powered by DCPM.

**Factory reset sequence:** `*p00;*c00;*c01;*o01;*s;`

**Calibration sequence:** `*p01;*c10;*o10;` — motor runs to lower limit, upper limit, back to lower limit.

<!-- UNRESOLVED: maximum cable length not stated. UNRESOLVED: EMC/radio compliance not stated. UNRESOLVED: recommended fuse/overcurrent protection not stated. -->
````

**Changes from B/C spec:**

| What | Why |
|------|-----|
| Added `program_accessor` action (`a` command) | Source line 32 lists `a = program accessor` |
| Added `set_radio_mode` action (`R` command) | Source line 30: "R = make port 7 Radio" |
| Added `set_bus_mode` action (`B` command) | Source line 31: "B = make port 7 BUS" |
| Resolved `flow_control: xon_xoff` | Source lines 51-52 describe X-off/X-on explicitly |
| Removed `addressing.port` block | Serial-only device per template rule |
| Expanded Notes: terminator detail, ASCII codes, case insensitivity, channel 60, radio time rounding | Source footnotes provide this explicitly |

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-05-15T21:30:19.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:30:19.133Z
matched_actions: 10
action_count: 10
confidence: high
summary: "All 10 spec actions matched source commands literally; transport parameters verified; core command table fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
