---
spec_id: admin/controlbyweb-x320
schema_version: ai4av-public-spec-v1
revision: 1
title: "ControlByWeb X-320 Control Spec"
manufacturer: ControlByWeb
model_family: X-320
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
  models:
    - X-320
    - X-320-I
    - X-320-POE
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-320_um_v1.5.pdf
  - https://controlbyweb.com/legacy/x320/
  - https://www.controlbyweb.com
retrieved_at: 2026-06-30T14:54:35.269Z
last_checked_at: 2026-07-07T11:14:47.648Z
generated_at: 2026-07-07T11:14:47.648Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "full range not stated; used as script-accessible numeric"
  - "full range not stated"
  - "full OID prefix not given in source"
  - "voltage/current ratings not stated in source; max supply voltage \"DO NOT EXCEED\" referenced on pinout (9-28 VDC for X-320-I, 5 VDC for X-320-POE) - populate as safety constraints if confirmed."
  - "full SNMP enterprise OID prefix for Xytronix not stated in source excerpt; only relative identifiers (X320.65 etc.) given. Firmware version not stated. Analog voltage ranges (V in single-ended/differential) not stated. Full event0.xml–event99.xml range enumerated only as pattern."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:14:47.648Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions confirmed verbatim in source across XML/GET, Modbus/TCP, SNMP, and BASIC protocol sections; transport port 80 and HTTP Basic auth supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# ControlByWeb X-320 Control Spec

## Summary
The X-320 is an industrial I/O monitoring and control module with two configurable digital I/Os, two pulse counters, one frequency input, four analog inputs, and up to six digital temperature/humidity sensor inputs. This spec covers control over TCP/IP via an HTTP/XML interface, Modbus/TCP, and SNMP. A built-in BASIC interpreter allows user-defined automation scripts.

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
# The X-320 supports three transport interfaces:
# - HTTP/XML GET requests (default port 80, configurable 0-65535)
# - Modbus/TCP (default port 502, configurable 0-65535)
# - SNMP (default port 161, trap port 162)
#
# Base URL is derived from the device's IP address (default 192.168.1.2).
# Auth on the Control Page is optional (HTTP Basic, Base64 of "none:password");
# Modbus/TCP has no auth (Modbus disabled when Control Password enabled).
protocols:
  - tcp
addressing:
  port: 80
auth:
  type: basic  # optional Control Password; Modbus disabled when enabled
```

## Traits
```yaml
# - powerable       (relay on/off and pulse commands present)
# - routable        (digital I/O can be configured as input or output)
# - queryable       (state.xml, eventX.xml, diagnostics.xml read queries)
# - levelable       (pulse duration parameter)
# - scriptable      (onboard BASIC interpreter for custom automation)
```

## Actions
```yaml
# All XML/GET request commands documented in source. relayXState covers
# Output 1 (relay1State) and Output 2 (relay2State).
- id: output1_on
  label: Turn Output 1 ON
  kind: action
  command: "GET /state.xml?relay1State=1"
  params: []

- id: output1_off
  label: Turn Output 1 OFF
  kind: action
  command: "GET /state.xml?relay1State=0"
  params: []

- id: output2_on
  label: Turn Output 2 ON
  kind: action
  command: "GET /state.xml?relay2State=1"
  params: []

- id: output2_off
  label: Turn Output 2 OFF
  kind: action
  command: "GET /state.xml?relay2State=0"
  params: []

- id: output1_pulse_default
  label: Pulse Output 1 (preset duration)
  kind: action
  command: "GET /state.xml?relay1State=2"
  params: []

- id: output2_pulse_default
  label: Pulse Output 2 (preset duration)
  kind: action
  command: "GET /state.xml?relay2State=2"
  params: []

- id: output1_pulse_custom
  label: Pulse Output 1 (custom duration)
  kind: action
  command: "GET /state.xml?relay1State=2&pulseTime1={seconds}"
  params:
    - name: seconds
      type: number
      description: Pulse duration in seconds

- id: output2_pulse_custom
  label: Pulse Output 2 (custom duration)
  kind: action
  command: "GET /state.xml?relay2State=2&pulseTime2={seconds}"
  params:
    - name: seconds
      type: number
      description: Pulse duration in seconds

- id: output1_on_noreply
  label: Turn Output 1 ON (no XML reply)
  kind: action
  command: "GET /state.xml?relay1State=1&noReply=1"
  params: []

- id: output1_off_noreply
  label: Turn Output 1 OFF (no XML reply)
  kind: action
  command: "GET /state.xml?relay1State=0&noReply=1"
  params: []

- id: set_counter1
  label: Set Counter 1
  kind: action
  command: "GET /state.xml?count1={value}"
  params:
    - name: value
      type: integer
      description: Counter value to set

- id: get_state_xml
  label: Read state.xml (all I/O, counters, sensors)
  kind: query
  command: "GET /state.xml"
  params: []

- id: get_event_xml
  label: Read event XML (event 0-99)
  kind: query
  command: "GET /event{n}.xml"
  params:
    - name: n
      type: integer
      description: Event number 0-99

- id: get_diagnostics_xml
  label: Read diagnostics.xml
  kind: query
  command: "GET /diagnostics.xml"
  params: []

- id: get_log_txt
  label: Read data log file
  kind: query
  command: "GET /log.txt"
  params: []

- id: erase_log_txt
  label: Erase data log file
  kind: action
  command: "GET /log.txt?erase=1"
  params: []

- id: get_syslog_txt
  label: Read system log file
  kind: query
  command: "GET /syslog.txt"
  params: []

- id: erase_syslog_txt
  label: Erase system log file
  kind: action
  command: "GET /syslog.txt?erase=1"
  params: []

- id: clear_rtc_powerup_flag
  label: Clear RTC power-up flag
  kind: action
  command: "GET /diagnostics.xml?memoryPowerUpFlag=0"
  params: []

- id: clear_device_powerup_flag
  label: Clear device power-up flag
  kind: action
  command: "GET /diagnostics.xml?devicePowerUpFlag=0"
  params: []

- id: clear_power_loss_counter
  label: Clear power loss counter
  kind: action
  command: "GET /diagnostics.xml?powerLossCounter=0"
  params: []

- id: configure_event
  label: Configure scheduled event
  kind: action
  command: "GET /eventSetup.srv?e{n}={epoch};{period};{units};{count};{sched};{action};{pulse};0;{desc};{days};{actnum};"
  params:
    - name: n
      type: integer
      description: Event number 0-99
    - name: epoch
      type: integer
      description: Start time in seconds since 1970-01-01
    - name: period
      type: integer
      description: Period value
    - name: units
      type: integer
      description: Period units (0=S, 1=M, 2=H, 3=D, 4=W)
    - name: count
      type: integer
      description: Number of occurrences (0=continuous)
    - name: sched
      type: integer
      description: Schedule number 0-4
    - name: action
      type: integer
      description: "0=No Action, 1=On, 2=Off, 3=Pulse, 4=Toggle, 5=Change sched, 7=Set extVar0, 8=Clear extVar0"
    - name: pulse
      type: number
      description: Pulse duration
    - name: desc
      type: string
      description: Description up to 20 chars
    - name: days
      type: integer
      description: "Days-of-week bitmask (Bit0=Sat, Bit6=Sun); 127=all days"
    - name: actnum
      type: integer
      description: "Output/schedule bitmask (Bit0=Output1/Sched1)"

# --- Modbus/TCP actions ---
- id: modbus_read_coils
  label: Modbus Read Coils (Outputs 1-2)
  kind: query
  command: "Modbus FC01 addr=0x0000 qty=1-2"
  params: []

- id: modbus_read_discrete_inputs
  label: Modbus Read Discrete Inputs (1-6)
  kind: query
  command: "Modbus FC02 addr=0x0000-0x0005 qty=1-6"
  params: []

- id: modbus_read_analog_inputs
  label: Modbus Read Analog Inputs (1-4)
  kind: query
  command: "Modbus FC03 addr=0x0010-0x0016 qty=2 step=2"
  params: []

- id: modbus_read_sensors
  label: Modbus Read Sensors (1-6)
  kind: query
  command: "Modbus FC03 addr=0x0110-0x011A qty=2 step=2"
  params: []

- id: modbus_read_counters
  label: Modbus Read Counters (1-2)
  kind: query
  command: "Modbus FC03 addr=0x0210-0x0212 qty=2 step=2"
  params: []

- id: modbus_read_frequency
  label: Modbus Read Frequency Input
  kind: query
  command: "Modbus FC03 addr=0x0214 qty=2"
  params: []

- id: modbus_read_pulse_rate
  label: Modbus Read Pulse Rate (1-2)
  kind: query
  command: "Modbus FC03 addr=0x0216-0x0218 qty=2 step=2"
  params: []

- id: modbus_read_extvars
  label: Modbus Read Extvars (0-3)
  kind: query
  command: "Modbus FC03 addr=0x0410-0x0416 qty=2 step=2"
  params: []

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (Output 1-2)
  kind: action
  command: "Modbus FC05 addr=0x0000-0x0001 value=0x00|0xFF"
  params: []

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils
  kind: action
  command: "Modbus FC15 addr=0x0000-0x0001 qty=1-2 value=0x00-0x03"
  params: []

- id: modbus_pulse_coils
  label: Modbus Pulse Outputs
  kind: action
  command: "Modbus FC16 addr=0x0310-0x0312 value=float_seconds"
  params:
    - name: value
      type: number
      description: "Pulse time in seconds (0.1-86400, IEEE754 float)"

- id: modbus_set_counter
  label: Modbus Set Counter (1-2)
  kind: action
  command: "Modbus FC16 addr=0x0210-0x0212 value=uint32"
  params: []

- id: modbus_write_extvars
  label: Modbus Write Extvars (0-3)
  kind: action
  command: "Modbus FC16 addr=0x0410-0x0416 value=float32"
  params: []

# --- SNMP set actions ---
- id: snmp_set_output1
  label: SNMP Set Output 1
  kind: action
  command: "SNMP SET x320OutputOne=0|1|2"
  params: []

- id: snmp_set_output2
  label: SNMP Set Output 2
  kind: action
  command: "SNMP SET x320OutputTwo=0|1|2"
  params: []

# --- Remote relay control via XML ---
- id: rmt_relay1_on
  label: Remote Relay 1 ON (BASIC)
  kind: action
  command: "LET rmt_relay1 = 1"
  params: []

- id: rmt_relay1_off
  label: Remote Relay 1 OFF (BASIC)
  kind: action
  command: "LET rmt_relay1 = 0"
  params: []

- id: rmt_relay1_pulse
  label: Remote Relay 1 pulse (BASIC)
  kind: action
  command: "LET rmt_relay1 = 2"
  params: []

- id: rmt_relay1_toggle
  label: Remote Relay 1 toggle (BASIC)
  kind: action
  command: "LET rmt_relay1 = 5"
  params: []

- id: rmt_relay2_on
  label: Remote Relay 2 ON (BASIC)
  kind: action
  command: "LET rmt_relay2 = 1"
  params: []

- id: rmt_relay2_off
  label: Remote Relay 2 OFF (BASIC)
  kind: action
  command: "LET rmt_relay2 = 0"
  params: []

- id: rmt_relay2_pulse
  label: Remote Relay 2 pulse (BASIC)
  kind: action
  command: "LET rmt_relay2 = 2"
  params: []

- id: rmt_relay2_toggle
  label: Remote Relay 2 toggle (BASIC)
  kind: action
  command: "LET rmt_relay2 = 5"
  params: []

- id: rmt_relay3_on
  label: Remote Relay 3 ON (BASIC)
  kind: action
  command: "LET rmt_relay3 = 1"
  params: []

- id: rmt_relay3_off
  label: Remote Relay 3 OFF (BASIC)
  kind: action
  command: "LET rmt_relay3 = 0"
  params: []

# --- External Variables (XML + BASIC accessible) ---
- id: set_extvar1
  label: Set ExtVar 1
  kind: action
  command: "GET /state.xml?extvar1={value}"
  params:
    - name: value
      type: number
      description: Float value

# --- Logging config (setup) ---
- id: load_basic_script
  label: Upload BASIC script (max 2 KB)
  kind: action
  command: "POST /upload (script .txt file, max 2048 bytes)"
  params: []
```

## Feedbacks
```yaml
# state.xml fields observable via GET /state.xml
- id: io1_state
  type: enum
  values: [0, 1]
  description: Digital I/O 1 state (0=OFF, 1=ON)
- id: io2_state
  type: enum
  values: [0, 1]
  description: Digital I/O 2 state (0=OFF, 1=ON)
- id: hightime1
  type: number
  description: Seconds Input 1 was last held ON
- id: hightime2
  type: number
  description: Seconds Input 2 was last held ON
- id: raw_count1
  type: integer
  description: Pulse counter 1 OFF→ON transitions
- id: count1
  type: number
  description: Scaled counter 1 value (raw * multiplier + offset)
- id: raw_count2
  type: integer
  description: Pulse counter 2 OFF→ON transitions
- id: count2
  type: number
  description: Scaled counter 2 value
- id: raw_rate1
  type: number
  description: Raw pulse rate 1
- id: rate1
  type: number
  description: Scaled pulse rate 1
- id: raw_rate2
  type: number
  description: Raw pulse rate 2
- id: rate2
  type: number
  description: Scaled pulse rate 2
- id: raw_frequency
  type: number
  description: Frequency input raw Hz
- id: frequency
  type: number
  description: Scaled frequency input
- id: freq_alrm
  type: enum
  values: [0, 1, 2]
  description: Frequency alarm state (0=Normal, 1=Alarm1, 2=Alarm2)
- id: an1_state
  type: number
  description: Scaled analog input 1
- id: an2_state
  type: number
  description: Scaled analog input 2
- id: an3_state
  type: number
  description: Scaled analog input 3
- id: an4_state
  type: number
  description: Scaled analog input 4
- id: an1_alrm
  type: enum
  values: [0, 1, 2]
- id: an2_alrm
  type: enum
  values: [0, 1, 2]
- id: an3_alrm
  type: enum
  values: [0, 1, 2]
- id: an4_alrm
  type: enum
  values: [0, 1, 2]
- id: units
  type: enum
  values: [F, C]
  description: Temperature units
- id: sensor1_temp
  type: string
  description: Sensor 1 reading (x.x=not attached, 77.3=temperature, H24.9=humidity)
- id: sensor2_temp
  type: string
- id: sensor3_temp
  type: string
- id: sensor4_temp
  type: string
- id: sensor5_temp
  type: string
- id: sensor6_temp
  type: string
- id: s1_alrm
  type: enum
  values: [0, 1, 2]
- id: s2_alrm
  type: enum
  values: [0, 1, 2]
- id: s3_alrm
  type: enum
  values: [0, 1, 2]
- id: s4_alrm
  type: enum
  values: [0, 1, 2]
- id: s5_alrm
  type: enum
  values: [0, 1, 2]
- id: s6_alrm
  type: enum
  values: [0, 1, 2]
- id: extvar0
  type: number
- id: extvar1
  type: number
- id: extvar2
  type: number
- id: extvar3
  type: number
- id: serial_number
  type: string
  description: MAC-derived serial number (00:0C:C8:xx:xx:xx)
- id: time_epoch
  type: integer
  description: Unix epoch seconds

# diagnostics.xml fields
- id: internal_temp
  type: number
  description: Internal device temperature
- id: vin
  type: number
  description: DC voltage on Vin+/Vin-
- id: internal_6volt
  type: number
  description: Internal 6V supply
- id: memory_powerup_flag
  type: enum
  values: [0, 1]
  description: RTC power-loss flag
- id: device_powerup_flag
  type: enum
  values: [0, 1]
  description: Device power-loss flag
- id: power_loss_counter
  type: integer
  description: Count of main power losses

# event0.xml fields (representative; event 0-99)
- id: event_active
  type: enum
  values: [yes, no]
- id: event_current_time
  type: string
- id: event_next_event
  type: string
- id: event_period
  type: string
  description: "Period with unit suffix (s/m/h/d/w); 0=disabled"
- id: event_count
  type: integer
  description: Remaining occurrences (0=always on if active)
- id: event_relay
  type: integer
  description: Output 1 or 2
- id: event_action
  type: string
  description: "turn relay(s) on, off, pulse, toggle, set extVar0, clear extVar0, change schedules"
- id: event_pulse_duration
  type: string
```

## Variables
```yaml
# External Variables are settable parameters exposed via XML and BASIC.
- id: extvar0
  type: float
  range: null  # UNRESOLVED: full range not stated; used as script-accessible numeric
  description: "External variable 0, accessible via XML and BASIC scripts"
- id: extvar1
  type: float
  range: null  # UNRESOLVED: full range not stated
  description: "External variable 1, settable via /state.xml?extvar1="
- id: extvar2
  type: float
  range: null  # UNRESOLVED: full range not stated
  description: "External variable 2"
- id: extvar3
  type: float
  range: null  # UNRESOLVED: full range not stated
  description: "External variable 3"
- id: pulse_time1
  type: number
  description: One-shot pulse duration for Output 1 (seconds)
- id: pulse_time2
  type: number
  description: One-shot pulse duration for Output 2 (seconds)
```

## Events
```yaml
# SNMP Traps sent unsolicited from the X-320.
# Community string = Control Password (or none if password disabled).
- id: trap_output1_change
  oid: 1.3.6.1.4.1.30556.75  # UNRESOLVED: full OID prefix not given in source
  description: Relay 1 state change (0=OFF, 1=ON)
- id: trap_output2_change
  oid: 1.3.6.1.4.1.30556.76  # UNRESOLVED: full OID prefix not given in source
  description: Relay 2 state change
- id: trap_input1_change
  oid: 1.3.6.1.4.1.30556.95
  description: Input 1 state change
- id: trap_input2_change
  oid: 1.3.6.1.4.1.30556.96
  description: Input 2 state change
- id: trap_input3_change
  oid: 1.3.6.1.4.1.30556.97
- id: trap_input4_change
  oid: 1.3.6.1.4.1.30556.98
- id: trap_input5_change
  oid: 1.3.6.1.4.1.30556.99
- id: trap_input6_change
  oid: 1.3.6.1.4.1.30556.100
- id: trap_analog1_alarm
  oid: 1.3.6.1.4.1.30556.120
  description: Analog 1 alarm (xxx.x)
- id: trap_analog2_alarm
  oid: 1.3.6.1.4.1.30556.121
- id: trap_analog3_alarm
  oid: 1.3.6.1.4.1.30556.122
- id: trap_analog4_alarm
  oid: 1.3.6.1.4.1.30556.123
- id: trap_frequency1_alarm
  oid: 1.3.6.1.4.1.30556.150
  description: Frequency 1 alarm (xxx.xxxxx)
- id: trap_sensor1_alarm
  oid: 1.3.6.1.4.1.30556.65
  description: Sensor 1 alarm (xx.x)
- id: trap_sensor2_alarm
  oid: 1.3.6.1.4.1.30556.66
- id: trap_sensor3_alarm
  oid: 1.3.6.1.4.1.30556.67
- id: trap_sensor4_alarm
  oid: 1.3.6.1.4.1.30556.68
- id: trap_sensor5_alarm
  oid: 1.3.6.1.4.1.30556.69
- id: trap_sensor6_alarm
  oid: 1.3.6.1.4.1.30556.70
```

## Macros
```yaml
# BASIC script statements documented in source Appendix G.
- id: basic_let
  description: "LET <var> = <expr> - assign variable"
- id: basic_if_then
  description: "IF <var> <op> <expr> THEN ... ELSE ... END IF"
- id: basic_for
  description: "FOR <var> = <expr> TO <expr> ... NEXT <var>"
- id: basic_do_while
  description: "DO WHILE <var> <op> <expr> ... LOOP"
- id: basic_log
  description: "LOG - log per Logging setup"
- id: basic_email
  description: "EMAIL [relayX|inputX|tempX] - send status email"
- id: basic_call
  description: "CALL <subname>"
- id: basic_sub
  description: "SUB <name> ... END SUB (follows END statement)"
- id: basic_print
  description: "PRINT - PC interpreter only (not supported on device)"
```

## Safety
```yaml
confirmation_required_for:
  - remote_relay_control  # source warns remote relay states cannot be read; not for safety-critical use
interlocks:
  - modbus_disabled_when_control_password_enabled  # Modbus cannot carry passwords
  - diagnostics_xml_no_password_required           # source states diagnostics.xml requests do not require a password
# UNRESOLVED: voltage/current ratings not stated in source; max supply voltage "DO NOT EXCEED" referenced on pinout (9-28 VDC for X-320-I, 5 VDC for X-320-POE) - populate as safety constraints if confirmed.
```

## Notes
- Default HTTP port is 80; Modbus default is 502; both configurable 0–65535 in setup. Source recommends ports >8000 to avoid conflicts.
- Default IP 192.168.1.2, subnet 255.255.255.0, gateway 192.168.1.1.
- Control Password is independent of Setup Password; default for both is `webrelay`. Setup username is `admin`.
- HTTP Basic auth header is Base64 of `none:<password>` for Control Page access.
- Modbus TCP uses IEEE 754 float (little- or big-endian per setting); sensor addresses/registers must be even.
- Pulse via Modbus FC16 range: 0.1 to 86400 seconds (clamped). New commands before pulse expires cancel it.
- Remote Services: device initiates outgoing TCP to a server (default port 8000); ideal for installations without router forwarding.
- Power-cycle required after Network tab changes; remote services apply immediately.
- Logging reduces Pulse Counter max rate to 25 Hz when enabled; Frequency >95 kHz affected by high logging rate.
- BASIC script limit: 2 KB (1900 bytes reserved for scripts per source memory note).

<!-- UNRESOLVED: full SNMP enterprise OID prefix for Xytronix not stated in source excerpt; only relative identifiers (X320.65 etc.) given. Firmware version not stated. Analog voltage ranges (V in single-ended/differential) not stated. Full event0.xml–event99.xml range enumerated only as pattern. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2024/01/X-320_um_v1.5.pdf
  - https://controlbyweb.com/legacy/x320/
  - https://www.controlbyweb.com
retrieved_at: 2026-06-30T14:54:35.269Z
last_checked_at: 2026-07-07T11:14:47.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:14:47.648Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions confirmed verbatim in source across XML/GET, Modbus/TCP, SNMP, and BASIC protocol sections; transport port 80 and HTTP Basic auth supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "full range not stated; used as script-accessible numeric"
- "full range not stated"
- "full OID prefix not given in source"
- "voltage/current ratings not stated in source; max supply voltage \"DO NOT EXCEED\" referenced on pinout (9-28 VDC for X-320-I, 5 VDC for X-320-POE) - populate as safety constraints if confirmed."
- "full SNMP enterprise OID prefix for Xytronix not stated in source excerpt; only relative identifiers (X320.65 etc.) given. Firmware version not stated. Analog voltage ranges (V in single-ended/differential) not stated. Full event0.xml–event99.xml range enumerated only as pattern."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
