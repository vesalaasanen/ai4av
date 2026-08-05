---
spec_id: admin/sonifex-s2-cds
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex S2-MT Meterbridge Timer Panel Control Spec"
manufacturer: Sonifex
model_family: S2-MT
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - S2-MT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad56550c.delivery.rocketcdn.me
  - cdn.abicart.com
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/S2-CDS/s2_hb.pdf
  - https://cdn.abicart.com/shop/ws42/76342/art41/159887241-5fe61b-sonifex_s2_manual.pdf
retrieved_at: 2026-07-22T05:08:55.986Z
last_checked_at: 2026-07-22T07:46:35.075Z
generated_at: 2026-07-22T07:46:35.075Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "user supplied device name \"S2 Cds\" but source document describes the S2-MT Meterbridge Timer Panel. Spec authored against S2-MT source."
  - "no safety warnings, interlocks, or power-on sequencing requirements present in source."
  - "source documents configuration as menu options (local button press),"
  - "source describes event-triggered timer behaviour but does not"
  - "source does not document multi-step RS-232 sequences."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-07-22T07:46:35.075Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 actions verified against source options and I/O formats; transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sonifex S2-MT Meterbridge Timer Panel Control Spec

## Summary
RS-232C serial control spec for the Sonifex S2-MT Meterbridge Timer Panel. Covers time-code synchronisation source selection, RS-232 port configuration (baud/data/stop/parity), RS-232 output string format, RS-232 input string format, date display format, and timer event configuration. Communication is via 9-pin D-type RS-232 port using ASCII text strings terminated with `\r\n`.

<!-- UNRESOLVED: user supplied device name "S2 Cds" but source document describes the S2-MT Meterbridge Timer Panel. Spec authored against S2-MT source. -->
<!-- UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements present in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default per source option 4 sub-option 0; configurable 9600/19200/38400/57600/115200
  data_bits: 8     # default per source option 1 sub-option 1; configurable 7 or 8
  stop_bits: 1     # default per source option 2 sub-option 0; configurable 1 or 2
  parity: none     # default per source option 3 sub-option 0; configurable none/even/odd
  flow_control: none  # inferred: source notes only pins 2 and 3 used; no RTS/CTS flow control mentioned
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable (RS-232 output string provides status)
```

## Actions
```yaml
# Time Code Synchronisation Source (Option 0)
- id: set_time_code_source_none
  label: Set Time Code Source - None
  kind: action
  command: "OPTION 0,0"  # local configuration, no RS-232 payload documented
  params: []
- id: set_time_code_source_msf
  label: Set Time Code Source - MSF Radio Time Code
  kind: action
  command: "OPTION 0,1"  # local configuration, no RS-232 payload documented
  params: []
- id: set_time_code_source_dcf
  label: Set Time Code Source - DCF Radio Time Code
  kind: action
  command: "OPTION 0,2"  # local configuration, no RS-232 payload documented
  params: []
- id: set_time_code_source_smpte
  label: Set Time Code Source - SMPTE/EBU Time Code
  kind: action
  command: "OPTION 0,3"  # local configuration, no RS-232 payload documented
  params: []
- id: set_time_code_source_rs232
  label: Set Time Code Source - RS232 Time Code String
  kind: action
  command: "OPTION 0,4"  # local configuration, no RS-232 payload documented
  params: []

# RS-232 Data Bits (Option 1)
- id: set_rs232_data_bits_7
  label: Set RS-232 Data Bits - 7
  kind: action
  command: "OPTION 1,0"
  params: []
- id: set_rs232_data_bits_8
  label: Set RS-232 Data Bits - 8
  kind: action
  command: "OPTION 1,1"
  params: []

# RS-232 Stop Bits (Option 2)
- id: set_rs232_stop_bits_1
  label: Set RS-232 Stop Bits - 1
  kind: action
  command: "OPTION 2,0"
  params: []
- id: set_rs232_stop_bits_2
  label: Set RS-232 Stop Bits - 2
  kind: action
  command: "OPTION 2,1"
  params: []

# RS-232 Parity (Option 3)
- id: set_rs232_parity_none
  label: Set RS-232 Parity - None
  kind: action
  command: "OPTION 3,0"
  params: []
- id: set_rs232_parity_even
  label: Set RS-232 Parity - Even
  kind: action
  command: "OPTION 3,1"
  params: []
- id: set_rs232_parity_odd
  label: Set RS-232 Parity - Odd
  kind: action
  command: "OPTION 3,2"
  params: []

# RS-232 Baud Rate (Option 4)
- id: set_rs232_baud_9600
  label: Set RS-232 Baud Rate - 9600
  kind: action
  command: "OPTION 4,0"
  params: []
- id: set_rs232_baud_19200
  label: Set RS-232 Baud Rate - 19200
  kind: action
  command: "OPTION 4,1"
  params: []
- id: set_rs232_baud_38400
  label: Set RS-232 Baud Rate - 38400
  kind: action
  command: "OPTION 4,2"
  params: []
- id: set_rs232_baud_57600
  label: Set RS-232 Baud Rate - 57600
  kind: action
  command: "OPTION 4,3"
  params: []
- id: set_rs232_baud_115200
  label: Set RS-232 Baud Rate - 115200
  kind: action
  command: "OPTION 4,4"
  params: []

# RS-232 Output Enable (Option 5)
- id: set_rs232_output_disable
  label: Set RS-232 Output - Disable
  kind: action
  command: "OPTION 5,0"
  params: []
- id: set_rs232_output_enable
  label: Set RS-232 Output - Enable
  kind: action
  command: "OPTION 5,1"
  params: []

# Date Display Format (Option 6)
- id: set_date_format_dd_mm_yy
  label: Set Date Display Format - dd/mm/yy
  kind: action
  command: "OPTION 6,0"
  params: []
- id: set_date_format_dd_yy_mm
  label: Set Date Display Format - dd/yy/mm
  kind: action
  command: "OPTION 6,1"
  params: []
- id: set_date_format_mm_dd_yy
  label: Set Date Display Format - mm/dd/yy
  kind: action
  command: "OPTION 6,2"
  params: []
- id: set_date_format_mm_yy_dd
  label: Set Date Display Format - mm/yy/dd
  kind: action
  command: "OPTION 6,3"
  params: []
- id: set_date_format_yy_dd_mm
  label: Set Date Display Format - yy/dd/mm
  kind: action
  command: "OPTION 6,4"
  params: []
- id: set_date_format_yy_mm_dd
  label: Set Date Display Format - yy/mm/dd
  kind: action
  command: "OPTION 6,5"
  params: []

# Timer 1 Display Behaviour (Option 7)
- id: set_timer1_no_display
  label: Set Timer 1 - On event do not display
  kind: action
  command: "OPTION 7,0"
  params: []
- id: set_timer1_display1
  label: Set Timer 1 - On event show to display 1
  kind: action
  command: "OPTION 7,1"
  params: []
- id: set_timer1_display2
  label: Set Timer 1 - On event show to display 2
  kind: action
  command: "OPTION 7,2"
  params: []

# Timer 1 Event Option (Option 8)
- id: set_timer1_event_restart
  label: Set Timer 1 Event - Restart
  kind: action
  command: "OPTION 8,0"
  params: []
- id: set_timer1_event_split
  label: Set Timer 1 Event - Split
  kind: action
  command: "OPTION 8,1"
  params: []

# Timer 2 Display Behaviour (Option 9)
- id: set_timer2_no_display
  label: Set Timer 2 - On event do not display
  kind: action
  command: "OPTION 9,0"
  params: []
- id: set_timer2_display1
  label: Set Timer 2 - On event show to display 1
  kind: action
  command: "OPTION 9,1"
  params: []
- id: set_timer2_display2
  label: Set Timer 2 - On event show to display 2
  kind: action
  command: "OPTION 9,2"
  params: []

# Timer 2 Event Option (Option 10)
- id: set_timer2_event_restart
  label: Set Timer 2 Event - Restart
  kind: action
  command: "OPTION 10,0"
  params: []
- id: set_timer2_event_split
  label: Set Timer 2 Event - Split
  kind: action
  command: "OPTION 10,1"
  params: []

# Mic Timer Display Behaviour (Option 11)
- id: set_mic_timer_no_display
  label: Set Mic Timer - On event do not display
  kind: action
  command: "OPTION 11,0"
  params: []
- id: set_mic_timer_display1
  label: Set Mic Timer - On event show to display 1
  kind: action
  command: "OPTION 11,1"
  params: []
- id: set_mic_timer_display2
  label: Set Mic Timer - On event show to display 2
  kind: action
  command: "OPTION 11,2"
  params: []

# Mic Timer Control (Option 12)
- id: set_mic_timer_auto
  label: Set Mic Timer Control - Auto
  kind: action
  command: "OPTION 12,0"
  params: []
- id: set_mic_timer_manual
  label: Set Mic Timer Control - Manual
  kind: action
  command: "OPTION 12,1"
  params: []

# Freeze Time (Option 13)
- id: set_freeze_time_1s
  label: Set Freeze Time - 1 second
  kind: action
  command: "OPTION 13,0"
  params: []
- id: set_freeze_time_2s
  label: Set Freeze Time - 2 seconds
  kind: action
  command: "OPTION 13,1"
  params: []
- id: set_freeze_time_3s
  label: Set Freeze Time - 3 seconds
  kind: action
  command: "OPTION 13,2"
  params: []
- id: set_freeze_time_4s
  label: Set Freeze Time - 4 seconds
  kind: action
  command: "OPTION 13,3"
  params: []
- id: set_freeze_time_5s
  label: Set Freeze Time - 5 seconds
  kind: action
  command: "OPTION 13,4"
  params: []

# Time Setting (Option 14)
- id: set_time_disallow_locked
  label: Set Time Setting - Disallow while locked
  kind: action
  command: "OPTION 14,0"
  params: []
- id: set_time_allow_locked
  label: Set Time Setting - Allow while locked
  kind: action
  command: "OPTION 14,1"
  params: []

# SMPTE/EBU Timecode Settings (Option 15)
- id: set_smpte_ignore_date
  label: Set SMPTE/EBU - Ignore date
  kind: action
  command: "OPTION 15,0"
  params: []
- id: set_smpte_date_format_1
  label: Set SMPTE/EBU - Date Format 1
  kind: action
  command: "OPTION 15,1"
  params: []
- id: set_smpte_date_format_2
  label: Set SMPTE/EBU - Date Format 2
  kind: action
  command: "OPTION 15,2"
  params: []
- id: set_smpte_date_format_3
  label: Set SMPTE/EBU - Date Format 3
  kind: action
  command: "OPTION 15,3"
  params: []

# RS-232 I/O
- id: send_time_code_input
  label: Send Time Code Input String
  kind: action
  command: "\"dd/mm/yy,hh:mm:ss\\r\\n\""
  params:
    - name: date
      type: string
      description: Date string in configured display format
    - name: time
      type: string
      description: Time string hh:mm:ss
- id: query_status_output
  label: Receive RS-232 Status Output
  kind: query
  command: "\"dd/mm/yy,hh:mm:ss,A,B,C,D,hh:mm:ss.tt,hh:mm:ss.tt,hh:mm:ss.tt\\r\\n\""
  params: []
```

## Feedbacks
```yaml
- id: rs232_output_string
  type: string
  description: >-
    Output emitted when RS-232 output enabled. Format:
    "dd/mm/yy,hh:mm:ss,A,B,C,D,hh:mm:ss.tt,hh:mm:ss.tt,hh:mm:ss.tt\r\n"
    where A=date format, B=time code source, C=lock status (0=not locked,
    1=signal/not locked, 2=locked), D=timecode presence (0=no signal,
    1=signal present), then Timer1, Timer2, MicTimer.
- id: lock_status
  type: enum
  values: [not_locked, signal_not_locked, locked]
- id: time_code_source
  type: enum
  values: [none, msf, dcf, smpte_ebu, rs232]
```

## Variables
```yaml
# UNRESOLVED: source documents configuration as menu options (local button press),
# not as RS-232 commands. No variable parameters exposed over the serial link
# beyond the date/time string input.
```

## Events
```yaml
# UNRESOLVED: source describes event-triggered timer behaviour but does not
# document unsolicited RS-232 event notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step RS-232 sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
User supplied device name "Sonifex S2 Cds" but source document describes the S2-MT Meterbridge Timer Panel. Spec authored against the S2-MT source.

Source documents configuration options (options 0-15) accessed via local front-panel button sequence (hold lower-timer Mode button 5s, increment options, set sub-option with Start/Stop & Reset, final press stores). RS-232 port is used for time-code string I/O and status output, not for menu configuration; no RS-232 commands for setting options 0-15 are documented.

RS-232 input: ASCII string `"dd/mm/yy,hh:mm:ss\r\n"` (date format depends on option 6 setting).

RS-232 output: ASCII string `"dd/mm/yy,hh:mm:ss,A,B,C,D,hh:mm:ss.tt,hh:mm:ss.tt,hh:mm:ss.tt\r\n"` emitted periodically when output enabled (option 5 sub-option 1).

Only pins 2 (RX) and 3 (TX) of the 9-pin D-type connector are used per source.

Action `command` fields for options 0-15 are placeholders showing the conceptual operation, not literal RS-232 byte sequences. Source does not document an RS-232 command protocol for these configuration actions.
```

Spec drafted. Caveat: source doc = S2-MT Meterbridge Timer Panel, not "S2 Cds" as supplied. Flagged in Notes.

## Provenance

```yaml
source_domains:
  - ad56550c.delivery.rocketcdn.me
  - cdn.abicart.com
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/S2-CDS/s2_hb.pdf
  - https://cdn.abicart.com/shop/ws42/76342/art41/159887241-5fe61b-sonifex_s2_manual.pdf
retrieved_at: 2026-07-22T05:08:55.986Z
last_checked_at: 2026-07-22T07:46:35.075Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:46:35.075Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 actions verified against source options and I/O formats; transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "user supplied device name \"S2 Cds\" but source document describes the S2-MT Meterbridge Timer Panel. Spec authored against S2-MT source."
- "no safety warnings, interlocks, or power-on sequencing requirements present in source."
- "source documents configuration as menu options (local button press),"
- "source describes event-triggered timer behaviour but does not"
- "source does not document multi-step RS-232 sequences."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
