---
spec_id: admin/draper-euroscreencb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Draper EuroscreenCB Control Spec"
manufacturer: Draper
model_family: EuroscreenCB
aliases: []
compatible_with:
  manufacturers:
    - Draper
  models:
    - EuroscreenCB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-06-02T22:06:32.057Z
generated_at: 2026-06-02T22:06:32.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP, HTTP, or other network transport documented — serial only"
  - "firmware version compatibility not stated"
  - "no power/voltage/current specs for the screen or MC1"
  - "flow control not stated; X-on/X-off used for buffer management"
  - "no continuously-settable analog variables documented beyond load thresholds (covered in Actions)"
  - "unsolicited events are documented (power-up notification, buffer flow control)"
  - "source mentions stall detection and load sensing thresholds but does not"
  - "voltage/power specifications for MC1 and EuroscreenCB not stated"
  - "radio (RFTM/DCPM) configuration details not fully documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:06:32.057Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Draper EuroscreenCB Control Spec

## Summary
Motorized projection screen controlled via Draper MC1 receiver module over RS-232 serial. Spec covers the serial command protocol for screen open/close/stop, position query, programming, and load-sensing configuration.

<!-- UNRESOLVED: no TCP/IP, HTTP, or other network transport documented — serial only -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no power/voltage/current specs for the screen or MC1 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; X-on/X-off used for buffer management
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: open/close/stop commands control screen motion
  - queryable    # inferred: r command returns current position
```

## Actions
```yaml
actions:
  - id: screen_open
    label: Open Screen (Lower)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number (00 = all, 01-60). Default 01."
      - name: duration
        type: integer
        description: "Time in 20ths of a second (000-999). 000 = forever (use quit to stop). Optional - defaults to ~2 sec."
    command: "*{channel}o{duration};"
    description: "Lower the screen. Example: *o01; lowers screen on channel 01."

  - id: screen_close
    label: Close Screen (Raise)
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number (00 = all, 01-60). Default 01."
      - name: duration
        type: integer
        description: "Time in 20ths of a second (000-999). Optional."
    command: "*{channel}c{duration};"
    description: "Raise the screen."

  - id: screen_stop
    label: Stop Screen
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number. Optional for stop - ignored if provided."
    command: "*{channel}s;"
    description: "Stop screen motion immediately."

  - id: program
    label: Program
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number (01-60)."
    command: "*{channel}p;"
    description: "Enter programming mode for the specified channel."

  - id: program_accessor
    label: Program Accessor
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number."
    command: "*{channel}a;"
    description: "Program accessor function."

  - id: quit_forever
    label: Quit Forever Command
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number."
    command: "*{channel}q;"
    description: "Stop a 'forever' (duration 000) transmission."

  - id: query_position
    label: Query Position
    kind: action
    params:
      - name: channel
        type: integer
        description: "Subsystem/channel number to query."
    command: "*{channel}r;"
    description: "Request current position report from MC1."

  - id: report_version
    label: Report Version
    kind: action
    params: []
    command: "*V;"
    description: "Query MC1 firmware version. Characters after V are ignored."

  - id: set_port_radio
    label: Set Port 7 to Radio
    kind: action
    params: []
    command: "*R;"
    description: "Configure port 7 as Radio (requires RFTM + DCPM)."

  - id: set_port_bus
    label: Set Port 7 to BUS
    kind: action
    params: []
    command: "*B;"
    description: "Configure port 7 as BUS."

  - id: calibrate_motor
    label: Calibrate Motor
    kind: action
    params: []
    command: "*p01;*c10;*o10;"
    description: "Full calibration sequence - motor runs to lower limit, then upper limit, then back to lower limit."

  - id: factory_reset
    label: Factory Reset
    kind: action
    params: []
    command: "*p00;*c00;*c01;*o01;*s;"
    description: "Reset all settings to factory defaults."

  - id: set_min_load_threshold
    label: Set Minimum Load Threshold
    kind: action
    params:
      - name: channel
        type: integer
        description: "Channel number (C18 channel)."
      - name: value
        type: integer
        description: "Threshold value. 0 disables minimum load check."
    command: "*{channel}C18;O{value};"
    description: "Set the minimum load threshold for stall detection. 0 = disabled."

  - id: set_stall_threshold
    label: Set Stall Load Threshold
    kind: action
    params:
      - name: channel
        type: integer
        description: "Channel number (C19 channel)."
      - name: value
        type: integer
        description: "Stall threshold value."
    command: "*{channel}C19;O{value};"
    description: "Set the stall load threshold. Motor current above this for ¼ sec triggers shutoff."

  - id: set_specific_stop_channel
    label: Set Specific Stop Channel
    kind: action
    params:
      - name: channel_number
        type: integer
        description: "Channel number N assigned for specific stop."
    command: "*C22;O{channel_number};"
    description: "Assign a dedicated stop channel - open/close on this channel stops the motor if running, no motion if stopped."
```

## Feedbacks
```yaml
feedbacks:
  - id: position_report
    label: Position Report
    type: string
    description: "MC1 reports position as *nnRpp; where nn=channel, pp=percent away from reference (0=reference, 99=opposite limit). ±2% error."
    pattern: "*{nn}R{pp};"

  - id: position_unknown_uncalibrated
    label: Position Unknown (Uncalibrated)
    type: enum
    values: [N, U]
    description: "N = position unknown (not calibrated). U = position unknown."

  - id: command_accepted
    label: Command Accepted
    type: enum
    values: [G]
    description: "G; returned when command formatted correctly and is not a query or status report."

  - id: command_format_error
    label: Command Format Error
    type: enum
    values: [U]
    description: "U; returned when command is not formatted correctly."

  - id: command_cannot_execute
    label: Command Cannot Execute
    type: enum
    values: [X]
    description: "X; returned when m command cannot execute (e.g., motor uncalibrated)."

  - id: version_report
    label: Version Report
    type: string
    description: "Firmware version string, e.g. 2.0; followed by R (Radio) or B (BUS) and carriage return."

  - id: buffer_overflow
    label: Buffer Overflow
    type: enum
    values: [O]
    description: "O followed by X-on - 120-byte buffer overflowed, all data purged."

  - id: buffer_half_full
    label: Buffer Half Full
    type: enum
    values: [X-off]
    description: "X-off (Ctrl-S, 0x13) sent when buffer is half full."

  - id: buffer_empty
    label: Buffer Empty
    type: enum
    values: [X-on]
    description: "X-on (Ctrl-Q, 0x11) sent when buffer empties after a prior X-off."

  - id: power_up_notification
    label: Power Up Notification
    type: string
    description: "On power-up MC1 sends version string, X-on, then *nnRpp; position report."
```

## Variables
```yaml
# UNRESOLVED: no continuously-settable analog variables documented beyond load thresholds (covered in Actions)
```

## Events
```yaml
# UNRESOLVED: unsolicited events are documented (power-up notification, buffer flow control)
# but are better categorized as feedbacks. No asynchronous event subscription model described.
```

## Macros
```yaml
macros:
  - id: calibrate_motor
    label: Motor Calibration Sequence
    steps:
      - command: "*p01;"
        description: "Enter program mode on channel 01"
      - command: "*c10;"
        description: "Close screen to lower limit"
      - command: "*o10;"
        description: "Open screen to upper limit, then back to lower limit"
    description: "Full motor calibration - runs to lower limit, upper limit, then back to lower limit."

  - id: factory_reset
    label: Factory Reset Sequence
    steps:
      - command: "*p00;"
      - command: "*c00;"
      - command: "*c01;"
      - command: "*o01;"
      - command: "*s;"
    description: "Reset all settings to factory defaults."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions stall detection and load sensing thresholds but does not
# describe explicit safety interlocks or power-on sequencing beyond the calibration procedure.
```

## Notes
- Command format: `*<subsystem><command><channel><duration>;` — total message length 2–10 characters, typically 6.
- Terminator: semicolon (`;`, 0x3B) or carriage return (CR, 0x0D). LF (0x0A) is ignored.
- Case-insensitive commands.
- Channel 00 = all subsystems. Channel range 01–60.
- Duration 000 = forever (must use `q` command to stop).
- Max timed pulse = 50 seconds. Radio commands rounded up to nearest 10th second.
- Time between buffered commands = 0.5 sec (0.1 sec after a stop command).
- Buffer size: 120 bytes. Flow control via X-on/X-off.
- If motor is moving when position query received, report reflects position at moment command is received — may be stale by the time it is read.
- Position percentage has up to ±2% error.
- IR and serial commands can interfere — serial commands may be lost during IR transmission and vice versa.
- Extraneous characters before `*` are ignored but count toward buffer fill.
<!-- UNRESOLVED: voltage/power specifications for MC1 and EuroscreenCB not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: radio (RFTM/DCPM) configuration details not fully documented -->

## Provenance

```yaml
source_domains:
  - draperinc.com
source_urls:
  - "https://www.draperinc.com/documentdownload.aspx?path=ProjectionScreens/Instructions&file=SerialComm-RS232_Inst.pdf"
retrieved_at: 2026-05-15T01:42:53.684Z
last_checked_at: 2026-06-02T22:06:32.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:06:32.057Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP, HTTP, or other network transport documented — serial only"
- "firmware version compatibility not stated"
- "no power/voltage/current specs for the screen or MC1"
- "flow control not stated; X-on/X-off used for buffer management"
- "no continuously-settable analog variables documented beyond load thresholds (covered in Actions)"
- "unsolicited events are documented (power-up notification, buffer flow control)"
- "source mentions stall detection and load sensing thresholds but does not"
- "voltage/power specifications for MC1 and EuroscreenCB not stated"
- "radio (RFTM/DCPM) configuration details not fully documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
