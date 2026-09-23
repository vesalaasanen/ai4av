---
spec_id: admin/timemachines-clock
schema_version: ai4av-public-spec-v1
revision: 1
title: "TimeMachines Clock Control Spec"
manufacturer: TimeMachines
model_family: "POE Display (B series)"
aliases: []
compatible_with:
  manufacturers:
    - TimeMachines
  models:
    - "POE Display (B series)"
    - "POE Display (C series)"
    - "WiFi Display (B series)"
    - "WiFi Display (C series)"
    - "TM848 POE DotMatrix"
    - TM1000
    - TM2000
  firmware: "TM1000>=2.6; TM2000>=0.3.3; POE B>=4.9; POE C>=5.4; WiFi B>=2.6; WiFi C>=3.4 (firmware supporting this API per source table; series letter from first letter of serial number)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - timemachinescorp.com
source_urls:
  - https://timemachinescorp.com/wp-content/uploads/TimeMachinesControlAPI.pdf
retrieved_at: 2026-09-02T17:16:47.152Z
last_checked_at: 2026-09-22T11:46:57.803Z
generated_at: 2026-09-22T11:46:57.803Z
firmware_coverage: "TM1000>=2.6; TM2000>=0.3.3; POE B>=4.9; POE C>=5.4; WiFi B>=2.6; WiFi C>=3.4 (firmware supporting this API per source table; series letter from first letter of serial number)"
protocol_coverage: []
known_gaps:
  - "per-command firmware compatibility matrix beyond the section-level minimums stated in source"
  - "no persistent settable variables beyond the dimmer/color/revert"
  - "no unsolicited notification protocol documented; all responses"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "error response behavior for invalid commands not documented"
  - "maximum packet size / fragmentation handling not documented"
  - "whether device sends unsolicited notification on timer completion or relay trigger"
  - "byte offsets of TIMER_PROGRAM.color union within the 32-byte step not fully tabulated"
  - "full per-command firmware compatibility matrix not stated"
verification:
  verdict: verified
  checked_at: 2026-09-22T11:46:57.803Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions (28 wire commands + 11 timer step opcodes) match the refined source verbatim; transport port 7372 and UDP confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# TimeMachines Clock Control Spec

## Summary
Network-controllable clock/timer displays (POE, WiFi, DotMatrix, TM1000/TM2000 time servers) by TimeMachines. Control uses a binary UDP/IP protocol on port 7372 supporting device discovery/query, up/down/countdown-to-date timers, dot-matrix text display, relay control, dimming, RGB color set, and multi-step stored timer programs. API designed for TM-Manager but usable by third-party control systems. Document basis: Locator Protocol API version 2.3 (July 2025).

<!-- UNRESOLVED: per-command firmware compatibility matrix beyond the section-level minimums stated in source -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 7372
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable    # inferred: device query (A1 04 B2) returns IP, MAC, firmware, display mode, timer value, device name
- levelable    # inferred: dimmer set (B5) controls digit and indicator brightness 0-100
```

## Actions
```yaml
# All payloads are raw UDP byte sequences (hex), sent to port 7372.
# Most commands acknowledge with a single byte 'A' (0x41).
# Parameterized bytes shown as {var}.

- id: device_query
  label: Device Query
  kind: query
  command: "A1 04 B2"
  params: []
  description: >-
    3-byte query, unicast or broadcast to port 7372. Clocks respond with a
    40-byte packet; TM1000A/TM2000A respond with 80 bytes. See Feedbacks.

- id: use_up_timer
  label: Use UpTimer
  kind: action
  command: "A2 {display_mode}"
  params:
    - name: display_mode
      type: integer
      description: "0x00=MIN:SEC.Tenths, 0x01=HH:MM:SS"
  description: "Command byte 0xA2. Puts clock into UpTimer mode. Ack: 'A'."

- id: up_timer_start_pause
  label: UpTimer Start/Pause
  kind: action
  command: "A3 {action}"
  params:
    - name: action
      type: integer
      description: "0x00=Pause, 0x01=Count Up (added in API v1.1)"
  description: "Command byte 0xA3. Toggles UpTimer running/paused. Ack: 'A'."

- id: up_timer_reset
  label: UpTimer Reset
  kind: action
  command: "A4 {display_mode}"
  params:
    - name: display_mode
      type: integer
      description: "0x00=MIN:SEC.Tenths, 0x01=HH:MM:SS"
  description: "Command byte 0xA4. Resets UpTimer to zero. Ack: 'A'."

- id: use_down_timer
  label: Use DownTimer
  kind: action
  command: "A5 {display_mode} {start_hour} {start_minute} {start_second} {start_tenths} {alarm_enable} {alarm_duration_sec} {start_days_lsb} {start_days_msb}"
  params:
    - name: display_mode
      type: integer
      description: "0x00=MIN:SEC.Tenths, 0x01=HH:MM:SS; bit 7 (0x80) = bargraph display on matrix clock"
    - name: start_hour
      type: integer
      description: Starting hour value for countdown
    - name: start_minute
      type: integer
      description: Starting minute value for countdown
    - name: start_second
      type: integer
      description: Starting second value for countdown
    - name: start_tenths
      type: integer
      description: Starting tenths-of-second value for countdown
    - name: alarm_enable
      type: integer
      description: "End-of-countdown alarm: 0=Disabled, 1=Enabled"
    - name: alarm_duration_sec
      type: integer
      description: Alarm duration in seconds
    - name: start_days_lsb
      type: integer
      required: false
      description: "Starting days LSB (optional, zero if omitted)"
    - name: start_days_msb
      type: integer
      required: false
      description: "Starting days MSB (optional, zero if omitted)"
  description: "Command byte 0xA5. Sets DownTimer mode with starting values. Ack: 'A'."

- id: down_timer_start_pause
  label: DownTimer Start/Pause
  kind: action
  command: "A6 {action}"
  params:
    - name: action
      type: integer
      description: "0x00=Pause, 0x01=Count Up (added in API v1.1)"
  description: "Command byte 0xA6. Toggles DownTimer running/paused. Ack: 'A'."

- id: down_timer_reset
  label: DownTimer Reset
  kind: action
  command: "A7 {display_mode} {start_hour} {start_minute} {start_second} {start_tenths} {alarm_enable} {alarm_duration_sec} {start_days_lsb} {start_days_msb}"
  params:
    - name: display_mode
      type: integer
      description: "0x00=MIN:SEC.Tenths, 0x01=HH:MM:SS; bit 7 (0x80) = bargraph display on matrix clock"
    - name: start_hour
      type: integer
      description: Starting hour value for countdown
    - name: start_minute
      type: integer
      description: Starting minute value for countdown
    - name: start_second
      type: integer
      description: Starting second value for countdown
    - name: start_tenths
      type: integer
      description: Starting tenths-of-second value for countdown
    - name: alarm_enable
      type: integer
      description: "0=Disabled, 1=Enabled"
    - name: alarm_duration_sec
      type: integer
      description: Alarm duration in seconds
    - name: start_days_lsb
      type: integer
      required: false
      description: "Starting days LSB (optional, zero if omitted)"
    - name: start_days_msb
      type: integer
      required: false
      description: "Starting days MSB (optional, zero if omitted)"
  description: "Command byte 0xA7. Resets DownTimer to starting value; must already be in DownTimer mode. Ack: 'A'."

- id: set_time_mode
  label: Set Clock to Time Mode
  kind: action
  command: "A8 01"
  params: []
  description: "Command byte 0xA8, byte 1=0x01. Returns clock from Up/Down timer modes to regular time display. Ack: 'A'."

- id: set_dotmatrix_text_tm848
  label: Set DotMatrix Text (TM848 POE dot matrix models)
  kind: action
  command: "A9 1B {scroll_just} {scroll_speed} {text} 00"
  params:
    - name: scroll_just
      type: integer
      description: "Bits 3:2 scroll direction (0=No Scroll, 1=Right to Left, 2=Bottom to Top); bits 1:0 justification (1=Left, 2=Center, 3=Right)"
    - name: scroll_speed
      type: integer
      description: Scroll speed
    - name: text
      type: string
      description: "Text starting at byte 4, null terminated, 250 chars maximum with null"
  description: "Command byte 0xA9, byte 1=0x1B (ESC formatting character). Ack: 'A'."

- id: set_dotmatrix_text_2line
  label: Set DotMatrix Text, 2 Line Clocks (POE 5.4 / WiFi 3.4 and greater)
  kind: action
  command: "A9 00 {text_attrs} {scroll_speed} {font} {color} {text} 00"
  params:
    - name: text_attrs
      type: integer
      description: "Bit 4 Blink (0=No Blink, 1=Blink); bits 3:2 scroll direction (0=No Scroll, 1=Right to Left, 2=Bottom to Top); bits 1:0 justification (1=Left, 2=Center, 3=Right)"
    - name: scroll_speed
      type: integer
      description: "Scroll speed, typically 60-150"
    - name: font
      type: integer
      description: "1=standard, 4=bold"
    - name: color
      type: integer
      description: "0-9, uses color palette stored on clock"
    - name: text
      type: string
      description: "Null terminated string; embed '\\n' for multiple lines"
  description: "Command byte 0xA9, byte 1=display address 0x00. Ack: 'A'."

- id: static_text_off
  label: Static Text Display Turn Off
  kind: action
  command: "BD 01"
  params: []
  description: "Command byte 0xBD, byte 1=0x01. Releases static text mode on 2nd line dot-matrix display, returns display to clock control. Ack: 'A'."

- id: set_up_timer_time_running
  label: Set UpTimer Time While Running
  kind: action
  command: "AA {hours} {minutes} {seconds} {tenths} {hundredths} {days_lsb} {days_msb}"
  params:
    - name: hours
      type: integer
      description: New HOUR value
    - name: minutes
      type: integer
      description: New MINUTE value
    - name: seconds
      type: integer
      description: New SECOND value
    - name: tenths
      type: integer
      description: New TENTHS of a second value
    - name: hundredths
      type: integer
      description: New HUNDREDTHS of a second value
    - name: days_lsb
      type: integer
      required: false
      description: "New DAYS value LSB (optional, zero if not present)"
    - name: days_msb
      type: integer
      required: false
      description: "New DAYS value MSB (optional, zero if not present)"
  description: "Command byte 0xAA. Instantaneously changes UpTimer time while running. Ack: 'A'."

- id: set_down_timer_time_running
  label: Set DownTimer Time While Running
  kind: action
  command: "AB {hours} {minutes} {seconds} {tenths} {hundredths} {days_lsb} {days_msb}"
  params:
    - name: hours
      type: integer
      description: New HOUR value
    - name: minutes
      type: integer
      description: New MINUTE value
    - name: seconds
      type: integer
      description: New SECOND value
    - name: tenths
      type: integer
      description: New TENTHS of a second value
    - name: hundredths
      type: integer
      description: New HUNDREDTHS of a second value
    - name: days_lsb
      type: integer
      required: false
      description: "New DAYS value LSB (optional, zero if not present)"
    - name: days_msb
      type: integer
      required: false
      description: "New DAYS value MSB (optional, zero if not present)"
  description: "Command byte 0xAB. Instantaneously changes DownTimer time while running. Ack: 'A'."

- id: countdown_to_date_reset
  label: Countdown to Date Timer Reset
  kind: action
  command: "B9 {display_mode} {end_year_lsb} {end_year_msb} {end_month} {end_day} {end_hour} {end_minute} {end_second} {alarm_enable} {alarm_duration_sec}"
  params:
    - name: display_mode
      type: integer
      description: "0x00=(HR):MIN:SEC.Tenths, 0x01=(DAY):HH:MM:SS, 0x02=DD:HH:MM"
    - name: end_year_lsb
      type: integer
      description: "Ending year for countdown (e.g. 2022), LSB"
    - name: end_year_msb
      type: integer
      description: Ending year, MSB
    - name: end_month
      type: integer
      description: Ending month
    - name: end_day
      type: integer
      description: Ending day
    - name: end_hour
      type: integer
      description: Ending hour
    - name: end_minute
      type: integer
      description: Ending minute
    - name: end_second
      type: integer
      description: Ending second
    - name: alarm_enable
      type: integer
      description: "0=Disabled, 1=Enabled"
    - name: alarm_duration_sec
      type: integer
      description: Alarm duration in seconds
  description: "Command byte 0xB9. Resets countdown-to-date timer to starting value. Ack: 'A'."

- id: countdown_to_date_start_pause
  label: Countdown to Date Start/Pause
  kind: action
  command: "BA {action}"
  params:
    - name: action
      type: integer
      description: "0x00=Pause, 0x01=Count Up"
  description: "Command byte 0xBA. Toggles countdown-to-date timer running/paused. Ack: 'A'."

- id: get_program
  label: Get Program from Clock
  kind: query
  command: "B2 {program_number}"
  params:
    - name: program_number
      type: integer
      description: "Program number 0-9"
  description: "Command byte 0xB2. Clock returns requested program from flash memory. See Feedbacks: program_response."

- id: store_program
  label: Store Program to Clock
  kind: action
  command: "B3 {program_number} {program_name_12_bytes} {program_data}"
  params:
    - name: program_number
      type: integer
      description: "Program number 0-9; overwrites existing program at that location"
    - name: program_name_12_bytes
      type: string
      description: "Program name, must be exactly 12 bytes, null terminated"
    - name: program_data
      type: string
      description: "10 copies of the 32-byte TIMER_PROGRAM structure (bytes 14-333 of the packet); unset bytes default 0x00"
  description: "Command byte 0xB3. Stores a program to clock flash memory. Up to 10 programs. Ack: 'A'."

- id: get_active_program
  label: Get Clock Active Program
  kind: query
  command: "AF"
  params: []
  description: "Command byte 0xAF. Clock sends back the program it is currently set to run. See Feedbacks: program_response."

- id: load_program_reset
  label: Reset (Load and Prepare Program)
  kind: action
  command: "AC 4F {program_number} {program_name_12_bytes} {program_data}"
  params:
    - name: program_number
      type: integer
      description: "Program number 0-9"
    - name: program_name_12_bytes
      type: string
      description: "Program name, must be exactly 12 bytes, null terminated"
    - name: program_data
      type: string
      description: "10 copies of the TIMER_PROGRAM structure (bytes 15-334); unset bytes default 0x00"
  description: "Command byte 0xAC. Gets clock out of time mode and ready to run a specific program. Byte 1=0x4F (sum of program size, program name length, and 3)."

- id: program_start_pause
  label: Program Start/Pause
  kind: action
  command: "AE {action}"
  params:
    - name: action
      type: integer
      description: "0x00=Stop, 0x01=Start/Resume"
  description: "Command byte 0xAE. Starts, pauses, and resumes the clock's current program."

- id: execute_stored_program
  label: Execute Stored Program
  kind: action
  command: "B8 {program_number}"
  params:
    - name: program_number
      type: integer
      description: "Program number 0-9"
  description: "Command byte 0xB8. Loads a stored timer program from flash and begins executing it. Same mechanism the alarm system uses to trigger a stored program at a given time."

- id: relay_close
  label: Relay Close
  kind: action
  command: "B4 {duration_sec}"
  params:
    - name: duration_sec
      type: integer
      description: Number of seconds to close the relay
  description: "Command byte 0xB4. Immediately closes the relay on the display for X seconds."

- id: relay_toggle
  label: Relay Toggle
  kind: action
  command: "BC {state}"
  params:
    - name: state
      type: integer
      description: "0=open, 1=closed"
  description: "Command byte 0xBC. Sets relay to open or closed indefinitely. State is not checked by other events that could change relay position (e.g. a timer-triggered closure overrides it)."

- id: set_revert_timeout
  label: Revert to Time Timeout
  kind: action
  command: "BB {timeout_lsb} {timeout_msb}"
  params:
    - name: timeout_lsb
      type: integer
      description: "Timeout in minutes, LSB"
    - name: timeout_msb
      type: integer
      description: "Timeout in minutes, MSB"
  description: "Command byte 0xBB. Changes the timeout that reverts the clock from a non-running, unused timer back to time display. 0 disables the revert timer. Not saved to non-volatile memory; must be re-sent after power loss."

- id: dimmer_set
  label: Dimmer Set
  kind: action
  command: "B5 {digit_brightness} {indicator_brightness}"
  params:
    - name: digit_brightness
      type: integer
      description: "Digit brightness 0-100"
    - name: indicator_brightness
      type: integer
      description: "AM/PM/Colon dot brightness 0-100"
  description: "Command byte 0xB5. Immediately changes display dimming. Not saved to non-volatile memory; only active until changed or reboot."

- id: timezone_variable_set
  label: TimeZone Variable Set
  kind: action
  command: "BE {variable_index} {text} 00"
  params:
    - name: variable_index
      type: integer
      description: "Which string variable to set, 0-4 (up to 5 variables)"
    - name: text
      type: string
      description: "Null terminated string stored for periodic display on second line (bytes 2-102)"
  description: "Command byte 0xBE. For two-line TimeZone clocks, POE 5.4 and WiFi 3.4 and greater. Not stored during loss of power."

- id: color_set
  label: Color Set
  kind: action
  command: "B6 {mmss_red} {mmss_green} {mmss_blue} {hh_red} {hh_green} {hh_blue}"
  params:
    - name: mmss_red
      type: integer
      description: "MM:SS digit red component 0-255"
    - name: mmss_green
      type: integer
      description: "MM:SS digit green component 0-255"
    - name: mmss_blue
      type: integer
      description: "MM:SS digit blue component 0-255"
    - name: hh_red
      type: integer
      description: "HH digit red component 0-255"
    - name: hh_green
      type: integer
      description: "HH digit green component 0-255"
    - name: hh_blue
      type: integer
      description: "HH digit blue component 0-255"
  description: "Command byte 0xB6. On RGB equipped displays, immediately changes displayed colors. Not saved to non-volatile memory; only active until changed or reboot."

# --- Timer Program Step Functions (TIMER_PROGRAM.command byte values, source 1.3.2) ---
# Each is byte 0 of a 32-byte TIMER_PROGRAM step inside the program blob sent
# by store_program / load_program_reset. Source lists each as a distinct row.

- id: timer_step_none
  label: Timer Step - None
  kind: action
  command: "00"
  params: []
  description: "Step command 0x00. Zero to show no current function."

- id: timer_step_interval_countdown
  label: Timer Step - Interval Countdown
  kind: action
  command: "01"
  params: []
  description: "Step command 0x01. Countdown between two set values with option to increment an interval."

- id: timer_step_interval_countup
  label: Timer Step - Interval Countup
  kind: action
  command: "02"
  params: []
  description: "Step command 0x02. Countup between two set values with option to increment an interval."

- id: timer_step_countup_ddd_hhmmss
  label: Timer Step - CountUp (DDD):HH:MM:SS
  kind: action
  command: "03"
  params: []
  description: "Step command 0x03. Countup with (DDD):HH:MM:SS format."

- id: timer_step_countup_hr_mmssts
  label: Timer Step - CountUp (HR):MM:SS:TS
  kind: action
  command: "04"
  params: []
  description: "Step command 0x04. Countup with (HR):MM:SS:TS format."

- id: timer_step_countdown_day_hhmmss
  label: Timer Step - CountDown (DAY):HH:MM:SS
  kind: action
  command: "05"
  params: []
  description: "Step command 0x05. Countdown with (DDD):HH:MM:SS format."

- id: timer_step_countdown_hr_mmssts
  label: Timer Step - CountDown (HR):MM:SS:TS
  kind: action
  command: "06"
  params: []
  description: "Step command 0x06. Countdown with (HR):MM:SS:TS format."

- id: timer_step_goto_line
  label: Timer Step - Goto Line
  kind: action
  command: "07"
  params: []
  description: "Step command 0x07. Repeat sequences, jump to a specific line (gotoLine 0-9) and choose how many times to repeat (repeatCountSet, 0=infinite)."

- id: timer_step_end_program
  label: Timer Step - End Program
  kind: action
  command: "08"
  params: []
  description: "Step command 0x08. Ends the program. gotoLine bit 0 (0x01) resets program after finish; bit 1 (0x02) stops program after finish."

- id: timer_step_change_colors
  label: Timer Step - Change Colors
  kind: action
  command: "09"
  params: []
  description: "Step command 0x09. For older devices, how the clock color is changed. Still supported but not needed from POE 5.4 / WiFi 3.4 forward (commands can change color inline)."

- id: timer_step_countup_dd_hhmm
  label: Timer Step - CountUp DD:HH:MM
  kind: action
  command: "0A"
  params: []
  description: "Step command 0x0A. Countup with DD:HH:MM format."

- id: timer_step_countdown_dd_hhmm
  label: Timer Step - CountDown DD:HH:MM
  kind: action
  command: "0B"
  params: []
  description: "Step command 0x0B. Countdown with DD:HH:MM format."
```

## Feedbacks
```yaml
- id: clock_query_response
  type: binary
  description: >-
    40-byte response to device query (A1 04 B2) from POE/WiFi/DotMatrix clocks.
    Byte 0 device type (0x01=POE, 0x02=WiFi, 0x03=DotMatrix); 1-4 client IP;
    5-10 MAC; 11-12 firmware Major:Minor; 13-14 NTP sync count; 15-17 displayed
    time/timer value HH MM SS; 18 tenths of second; 19 display mode (bits 2-0:
    000=time 001=Up Timer 010=Down Timer 011=Interval Count Up 100=Interval
    Count Down; bit5 0x20=1 D:H:M mode (bit7 cleared); bit6 0x40 start/stop
    0=stopped 1=running; bit7 0x80 0=H:M:S 1=M:S:Tenths); 20 downtimer alarm
    set (bits 0-6 alarm duration, bit7 alarm checked 0=unchecked 1=checked);
    21 days displayed MSB; 22 digits value (0=4/6 digits, 1=(D):H:M:S,
    2=(H):M:S.Tenths; top 3 bits are MSBs of day value); 23 WiFi signal
    strength (0=wired, otherwise negative dBm); 24-39 device name null
    terminated ASCII.

- id: tm1000_tm2000_query_response
  type: binary
  description: >-
    80-byte response to device query (A1 04 B2) from TM1000A/TM2000A. Byte 0:
    0x04=TM1000A, 0x05=TM2000A; 1-4 client IP; 5-10 MAC; 11-12 firmware
    Major:Minor; 13 lock status (0=No Lock, 1=2D Lock, 2=3D Lock); 14-17 NTP
    sync count 32-bit MSB to LSB; 18-20 current time H:M:S UTC; 21-45 location
    (latitude, longitude, null terminated, 25 bytes); 46-79 time server name
    null terminated.

- id: command_ack
  type: enum
  values: ["A"]
  description: >-
    Single character 'A' (0x41) acknowledgement sent back for most commands
    when no data is being requested.

- id: program_response
  type: binary
  description: >-
    Full program data returned by get_program (B2) and get_active_program
    (AF). Per source 1.3.4/1.3.6 layout: program number, 12-byte null
    terminated program name, then 10 copies of the 32-byte TIMER_PROGRAM
    structure (command byte, 3 reserved bytes 0x00, incrementInterval,
    gotoLine, repeatCountSet, repeatCountAct, startSeconds 4 bytes LSB,
    stopSeconds 4 bytes LSB, relayTimeSec, digitColor, matrixAttrib, rsrvd3,
    matrixStrig 12 bytes null terminated).
```

## Variables
```yaml
# UNRESOLVED: no persistent settable variables beyond the dimmer/color/revert
# timeout actions (all volatile, not stored in non-volatile memory).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented; all responses
# are query-reply or command-ack.
```

## Macros
```yaml
- id: timer_program
  label: Timer Program
  description: >-
    Multi-step program of up to 10 steps (last step always End Program), each
    a 32-byte TIMER_PROGRAM structure whose first byte is a step function
    opcode 0x00-0x0B (see timer_step_* actions). Store via store_program
    (B3), load and prepare via load_program_reset (AC), execute via
    execute_stored_program (B8), start/pause via program_start_pause (AE).
    Source recommends using TM-Manager to create programs, then modifying
    bytes for timing changes. Example invocation with Ncat:
    ncat --udp 192.168.1.1 7372 < file.bin
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes
- Binary UDP protocol — all commands are raw byte sequences, not ASCII text. 7372 is the standard port for communication with the clocks; device query also responds to broadcast on that port.
- Most commands acknowledge with single byte 'A' (0x41); Get Program/Get Active Program return full program data.
- Volatile settings (lost on power cycle): revert-to-time timeout (BB), dimmer set (B5), timezone variables (BE), color set (B6).
- Timer program structure is exactly 32 bytes per step; 3 bytes of padding follow the command byte before the union. Programs occupy 334 bytes (name + 10 steps).
- TIMER_PROGRAM.color union members (red1/grn1/blu1/red2/grn2/blu2/colorIndex1/colorIndex2) exist for Change Colors on older firmware; from POE 5.4 / WiFi 3.4 the color section is no longer needed but maintained for older clocks.
- Start/Pause second-byte semantics (A3/A6/BA) added in API v1.1 to prevent repeated packets negating previous packet's meaning; supported from WiFi clock 2.3, POE clock 4.5, DotMatrix 1.1.
- API v2.3 supports only models in the firmware table; see v1.1 of the source document for earlier models. Series letter (B vs C) determined by first letter of device serial number.
- TM-Manager / TM-Timer use this protocol to find and monitor clocks; a Wireshark capture of that software shows example data transfer.
- Source document: Locator Protocol API version 2.3, July 2025. Revision history: v1.0 Feb 2018 (initial); v1.1 Mar 2018 (start/pause byte semantics, TM2000A); v2.0 Mar 2021 (real-time timer reporting, relay/dimmer/RGB); v2.1 (countdown to date, 9-digit displays, relay toggle); v2.2 May 2023 (2-line dot matrix, bargraph bit); v2.3 July 2025 (timer program documentation).

<!-- UNRESOLVED: error response behavior for invalid commands not documented -->
<!-- UNRESOLVED: maximum packet size / fragmentation handling not documented -->
<!-- UNRESOLVED: whether device sends unsolicited notification on timer completion or relay trigger -->
<!-- UNRESOLVED: byte offsets of TIMER_PROGRAM.color union within the 32-byte step not fully tabulated -->
<!-- UNRESOLVED: full per-command firmware compatibility matrix not stated -->

## Provenance

```yaml
source_domains:
  - timemachinescorp.com
source_urls:
  - https://timemachinescorp.com/wp-content/uploads/TimeMachinesControlAPI.pdf
retrieved_at: 2026-09-02T17:16:47.152Z
last_checked_at: 2026-09-22T11:46:57.803Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:46:57.803Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions (28 wire commands + 11 timer step opcodes) match the refined source verbatim; transport port 7372 and UDP confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-command firmware compatibility matrix beyond the section-level minimums stated in source"
- "no persistent settable variables beyond the dimmer/color/revert"
- "no unsolicited notification protocol documented; all responses"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "error response behavior for invalid commands not documented"
- "maximum packet size / fragmentation handling not documented"
- "whether device sends unsolicited notification on timer completion or relay trigger"
- "byte offsets of TIMER_PROGRAM.color union within the 32-byte step not fully tabulated"
- "full per-command firmware compatibility matrix not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
