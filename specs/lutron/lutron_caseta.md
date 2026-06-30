---
spec_id: admin/lutron-caseta
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lutron Caseta Control Spec"
manufacturer: Lutron
model_family: Caseta
aliases: []
compatible_with:
  manufacturers:
    - Lutron
  models:
    - Caseta
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.lutron.com
  - web.archive.org
source_urls:
  - https://assets.lutron.com/a/documents/040249.pdf
  - https://web.archive.org/web/20241201153838/https://assets.lutron.com/a/documents/040249.pdf
retrieved_at: 2026-04-30T00:10:09.599Z
last_checked_at: 2026-06-25T10:29:05.137Z
generated_at: 2026-06-25T10:29:05.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Caseta-specific model numbers not enumerated in source; document covers broader Lutron integration protocol applicable to Caseta"
  - "Telnet port not explicitly stated in source"
  - "no explicit safety warnings or hazard procedures stated in source"
  - "Telnet port number not explicitly stated in source"
  - "Caseta-specific model numbers not enumerated in source"
  - "firmware version compatibility ranges not stated in source"
  - "UDP multicast port for RadioRA 2 device-discovery not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-25T10:29:05.137Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "deterministic presence proof: 68/68 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Lutron Caseta Control Spec

## Summary

Lutron Caseta is a home automation lighting and shading control system programmable via the Lutron integration protocol over RS-232 serial or Ethernet Telnet. The protocol uses ASCII command strings with operation characters `#` (execute), `?` (query), and `~` (report/monitor), terminated with `<CR><LF>`. The same protocol governs RadioRA 2, QS Standalone (QSE-CI-NWK-E), GRAFIK Eye QS, Maestro, Sivoia QS shades, and HVAC controllers; Caseta implements the subset defined by its integration access point.

<!-- UNRESOLVED: Caseta-specific model numbers not enumerated in source; document covers broader Lutron integration protocol applicable to Caseta -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: Telnet port not explicitly stated in source
auth:
  type: login  # inferred: login credentials documented (nwk, nwk2) with configurable passphrase
  credentials:
    - username: nwk
    - username: nwk2
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

RS-232 settings stated for QSE-CI-NWK-E: 9600/19200/38400/115200 (dipswitch-selectable), 8/N/1, no flow control. RadioRA 2 main repeater: 9600/8/N/1, no flow control. Default IPs: QS Standalone `192.168.250.1`; RadioRA 2 `192.168.1.50` (DHCP default).

## Traits

```yaml
- powerable      # inferred: dimmer zone-level on/off commands present
- routable       # inferred: output/area/shade group control commands present
- queryable      # inferred: ?OUTPUT, ?DEVICE, ?SYSTEM, etc. query commands present
- levelable      # inferred: zone-level commands 0-100% present
```

## Actions
```yaml
- id: parameter_count_mismatch_too_many_or_too_few_parameters_for_the_specified_action
  label: "Parameter count mismatch: Too many or too few parameters for the specified action"
  kind: action
  command: "Too many parameters when activating scene #AREA,2,6,1,1,1,1,1 <CR><LF>"
  params: []

- id: response
  label: "Response:"
  kind: action
  command: "~ERROR,1`<CR><LF>"
  params: []

- id: object_does_not_exist_the_integration_id_or_serial_number_entered_does_not_map_to_a_known_part_of_the_system
  label: "Object does not exist: The Integration ID or serial number entered does not map to a known part of the system"
  kind: action
  command: "Send command to an ID that is not valid #OUTPUT,1234,1,100.00 <CR><LF>"
  params: []

- id: response_2
  label: "Response:"
  kind: action
  command: "~ERROR,2`<CR><LF>"
  params: []

- id: invalid_action_the_action_does_not_exist_for_this_command
  label: "Invalid Action: The action does not exist for this command"
  kind: action
  command: "Send invalid action (4321) to Area 2 #AREA,2,4321 <CR><LF>"
  params: []

- id: response_3
  label: "Response:"
  kind: action
  command: "~ERROR,3`<CR><LF>"
  params: []

- id: parameter_data_out_of_range_the_parameter_data_is_out_of_range_for_this_action
  label: "Parameter data out of range: The parameter data is out of range for this action"
  kind: action
  command: "Send Output 11 to 120% #OUTPUT,11,1,120.00 <CR><LF>"
  params: []

- id: response_4
  label: "Response:"
  kind: action
  command: "~ERROR,4`<CR><LF>"
  params: []

- id: parameter_data_malformed_the_parameter_data_given_was_not_formatted_properly
  label: "Parameter data malformed: The parameter data given was not formatted properly"
  kind: action
  command: "Set Time to 12:23:24:25 #SYSTEM,1,12:23:24:25 <CR><LF>"
  params: []

- id: response_5
  label: "Response:"
  kind: action
  command: "~ERROR,5`<CR><LF>"
  params: []

- id: execute_set_time_to_5_45_pm
  label: "Execute: Set time to 5:45 PM"
  kind: action
  command: "#SYSTEM,1,17:45`<CR><LF>"
  params: []

- id: execute_set_date_to_june_1,_2009
  label: "Execute: Set date to June 1, 2009"
  kind: action
  command: "#SYSTEM,2,06/01/2009`<CR><LF>"
  params: []

- id: response_the_system_time_is_11_05_am
  label: "Response: The system time is 11:05 AM"
  kind: action
  command: "~SYSTEM,1,11:05:00`<CR><LF>"
  params: []

- id: response_the_system_date_is_july_3,_2009
  label: "Response: The system date is July 3, 2009"
  kind: action
  command: "~SYSTEM,2,07/03/2009`<CR><LF>"
  params: []

- id: execute_set_ip_address_to_192_168_250_1
  label: "Execute: Set IP Address to 192.168.250.1"
  kind: action
  command: "#ETHERNET,0,192.168.250.1`<CR><LF>"
  params: []

- id: execute_set_gateway_address_to_10_2_4_1
  label: "Execute: Set Gateway Address to 10.2.4.1"
  kind: action
  command: "#ETHERNET,1,10.2.4.1`<CR><LF>"
  params: []

- id: response_the_ip_address_is_192_168_250_1
  label: "Response: The IP Address is 192.168.250.1"
  kind: action
  command: "~ETHERNET,0=,192.168.250.1`<CR><LF>"
  params: []

- id: add_shade_at_100%_to_phantom_button_1
  label: "Add shade at 100% to phantom button 1"
  kind: action
  command: "#PROGRAMMING,1,1,1,living room sheer,0,100`<CR><LF>"
  params: []

- id: response_6
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,1,1,living room sheer,0,100`<CR><LF>"
  params: []

- id: add_venetian_blind_at_0%_lift_and_50%_tilt_to_phantom_button_2
  label: "Add Venetian blind at 0% lift and 50% tilt to phantom button 2"
  kind: action
  command: "#PROGRAMMING,1,2,5,kitchen venetian,0,0,50`<CR><LF>"
  params: []

- id: response_7
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,2,5,kitchen venetian,0,0,50`<CR><LF>"
  params: []

- id: add_venetian_blind_at_75%_tilt_to_phantom_button_3
  label: "Add Venetian blind at 75% tilt to phantom button 3"
  kind: action
  command: "#PROGRAMMING,1,3,6,kitchen venetian,0,75`<CR><LF>"
  params: []

- id: response_8
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,3,6,kitchen venetian,0,75`<CR><LF>"
  params: []

- id: add_venetian_blind_at_15%_lift_to_phantom_button_4
  label: "Add Venetian blind at 15% lift to phantom button 4"
  kind: action
  command: "#PROGRAMMING,1,4,7,kitchen venetian,0,15`<CR><LF>"
  params: []

- id: response_9
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,4,7,kitchen venetian,0,15`<CR><LF>"
  params: []

- id: turn_on_stop_if_moving_for_phantom_button_5
  label: "Turn On Stop-If-Moving for phantom button 5"
  kind: action
  command: "#PROGRAMMING,1,5,4,1`<CR><LF>"
  params: []

- id: response_10
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,5,4,1`<CR><LF>"
  params: []

- id: clear_programming_from_all_the_phantom_buttons
  label: "Clear programming from all the phantom buttons"
  kind: action
  command: "#PROGRAMMING,1,0,3`<CR><LF>"
  params: []

- id: response_11
  label: "Response"
  kind: action
  command: "Repeat command to clear all phantom button programming"
  params: []

- id: repeat_command_to_clear_all_phantom_button_programming
  label: "Repeat command to clear all phantom button programming"
  kind: action
  command: "#PROGRAMMING,1,0,3`<CR><LF>"
  params: []

- id: response_12
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,0,3`<CR><LF>"
  params: []

- id: clear_programming_from_phantom_button_6
  label: "Clear programming from phantom button 6"
  kind: action
  command: "#PROGRAMMING,1,6,3`<CR><LF>"
  params: []

- id: response_13
  label: "Response"
  kind: action
  command: "~PROGRAMMING,1,6,3`<CR><LF>"
  params: []

- id: execute_press_button_1
  label: "Execute: Press Button 1"
  kind: action
  command: "#DEVICE,4,1,3`<CR><LF>"
  params: []

- id: execute_release_button_1
  label: "Execute: Release Button 1"
  kind: action
  command: "#DEVICE,4,1,4`<CR><LF>"
  params: []

- id: execute_turn_on_led_1
  label: "Execute: Turn On LED 1"
  kind: action
  command: "#DEVICE,4,101,9`<CR><LF>"
  params: []

- id: response_led_1_is_on
  label: "Response: LED 1 is On"
  kind: action
  command: "~DEVICE,4,101,9,1`<CR><LF>"
  params: []

- id: execute_disable_diagnostic_monitoring
  label: "Execute: Disable Diagnostic Monitoring"
  kind: action
  command: "#MONITORING,1,2`<CR><LF>"
  params: []

- id: execute_enable_event_monitoring
  label: "Execute: Enable Event Monitoring"
  kind: action
  command: "#MONITORING,2,1`<CR><LF>"
  params: []

- id: response_diagnostic_monitoring_is_disabled
  label: "Response: Diagnostic Monitoring is disabled"
  kind: action
  command: "~MONITORING,1,2`<CR><LF>"
  params: []

- id: execute_execute_the_3rd_event_of_the_time_clock
  label: "Execute: Execute the 3rd event of the time clock"
  kind: action
  command: "#TIMECLOCK,4,5,3`<CR><LF>"
  params: []

- id: response_the_time_the_sun_rises
  label: "Response: The time the sun rises"
  kind: action
  command: "~TIMECLOCK,4,2,05:32`<CR><LF>"
  params: []

- id: execute_set_dimmer_to_75%_with_a_1_min_30_sec_fade
  label: "Execute: Set dimmer to 75% with a 1 min 30 sec fade"
  kind: action
  command: "#OUTPUT,1,1,75,01:30`<CR><LF>"
  params: []

- id: execute_start_raising_zone_level
  label: "Execute: Start Raising zone level"
  kind: action
  command: "#OUTPUT,1,2`<CR><LF>"
  params: []

- id: execute_stop_raising_lowering_zone_level
  label: "Execute: Stop Raising/Lowering zone level"
  kind: action
  command: "#OUTPUT,1,4`<CR><LF>"
  params: []

- id: response_output_level_is_set_to_90%
  label: "Response: Output level is set to 90%"
  kind: action
  command: "~OUTPUT,1,1,90.00`<CR><LF>"
  params: []

- id: execute_set_venetian_blind_to_lift_0%,_tilt_50%
  label: "Execute: Set Venetian blind to lift 0%, tilt 50%"
  kind: action
  command: "#OUTPUT,1,10,0,50`<CR><LF>"
  params: []

- id: execute_start_raising_venetian_tilt
  label: "Execute: Start raising Venetian tilt"
  kind: action
  command: "#OUTPUT,1,11`<CR><LF>"
  params: []

- id: execute_stop_raising_venetian_tilt
  label: "Execute: Stop raising Venetian tilt"
  kind: action
  command: "#OUTPUT,1,13`<CR><LF>"
  params: []

- id: response_venetian_lift_level_is_0%,_tilt_level_50%
  label: "Response: Venetian lift level is 0%, tilt level 50%"
  kind: action
  command: "~OUTPUT,1,10,0.00,50.00`<CR><LF>"
  params: []

- id: execute_set_fan_speed_to_medium_high
  label: "Execute: Set fan speed to Medium High"
  kind: action
  command: "#OUTPUT,1,1,75`<CR><LF>"
  params: []

- id: response_output_level_is_set_to_high
  label: "Response: Output level is set to High"
  kind: action
  command: "~OUTPUT,1,1,100.00`<CR><LF>"
  params: []

- id: set_set_output_to_open
  label: "Set: Set output to open"
  kind: action
  command: "#OUTPUT,21,1,0`<CR><LF>"
  params: []

- id: set_set_output_to_close
  label: "Set: Set output to close"
  kind: action
  command: "#OUTPUT,21,1,1`<CR><LF>"
  params: []

- id: response_output_state_is_closed
  label: "Response: Output state is closed"
  kind: action
  command: "~OUTPUT,21,1,100.00`<CR><LF>"
  params: []
```

## Feedbacks
```yaml
- id: query_what_is_the_system_time?
  label: "Query: What is the system time?"
  kind: query
  query_command: "?SYSTEM,1`<CR><LF>"

- id: query_what_is_the_system_date?
  label: "Query: What is the system date?"
  kind: query
  query_command: "?SYSTEM,2`<CR><LF>"

- id: query_what_is_the_ip_address?
  label: "Query: What is the IP Address?"
  kind: query
  query_command: "?ETHERNET,0`<CR><LF>"

- id: query_what_is_the_login_information_for_user_1?
  label: "Query: What is the Login Information for user 1?"
  kind: query
  query_command: "?ETHERNET,3,1`<CR><LF>"

- id: query_what_is_the_login_information_for_all_users?_note_0_=_all
  label: "Query: What is the Login Information for ALL users? (Note: 0 = ALL)"
  kind: query
  query_command: "?ETHERNET,3,0`<CR><LF>"

- id: query_what_is_the_state_of_led_1?
  label: "Query: What is the state of LED 1?"
  kind: query
  query_command: "?DEVICE,4,101,9`<CR><LF>"

- id: query_is_diagnostic_monitoring_disabled?
  label: "Query: Is Diagnostic Monitoring disabled?"
  kind: query
  query_command: "?MONITORING,1`<CR><LF>"

- id: query_what_is_the_sunrise_time?
  label: "Query: What is the sunrise time?"
  kind: query
  query_command: "?TIMECLOCK,4,2`<CR><LF>"

- id: query_what_is_the_state_of_the_output?
  label: "Query: What is the state of the output?"
  kind: query
  query_command: "?OUTPUT,1,1`<CR><LF>"

- id: query_what_is_the_state_of_the_venetian_lift_and_tilt?
  label: "Query: What is the state of the Venetian lift and tilt?"
  kind: query
  query_command: "?OUTPUT,1,10`<CR><LF>"

- id: query_what_is_the_state_of_the_output?_2
  label: "Query: What is the state of the output?"
  kind: query
  query_command: "?OUTPUT,21,1`<CR><LF>"

- id: query_what_is_the_temperature_sensors_battery_status?
  label: "Query: What is the Temperature Sensor's Battery Status?"
  kind: query
  query_command: "?DEVICE,1,1,22`<CR><LF>"

- id: response_status_report
  label: "Response: Status Report"
  kind: query
  query_command: "~DEVICE,1,1,22,0x123ABCDE,1,1,03/27/2018 12:55:00`<CR><LF>"
```

## Variables

```yaml
# No discrete Variables section - system exposes state via query (?OUTPUT, ?DEVICE,
# ?SYSTEM, ?TIMECLOCK, ?HVAC, ?GROUP, ?AREA, ?SHADEGRP) and unsolicited monitor (~)
# reports. Variable-like state is captured in the Feedbacks section.
```

## Events

```yaml
# Unsolicited monitor reports (~) emitted when system state changes locally.
# Type/scope defined by the corresponding MONITORING enable command.
- id: zone_level_changed
  description: "~OUTPUT,<id>,1,<level> - emitted when zone level changes locally or via command (requires Zone Monitoring)"
- id: button_pressed
  description: "~DEVICE,<id>,<button>,3 - emitted on button press (requires Button Monitoring)"
- id: button_released
  description: "~DEVICE,<id>,<button>,4 - emitted on button release (requires Button Monitoring)"
- id: occupancy_changed
  description: "~DEVICE,<id>,2,3|4 - occupancy sensor state transition (requires Occupancy Monitoring)"
- id: led_state_changed
  description: "~DEVICE,<id>,<led>,9,<state> - LED state change (requires LED Monitoring)"
- id: hvac_state_changed
  description: "~HVAC,<id>,<action>,<params> - HVAC state change (requires HVAC Monitoring)"
- id: error
  description: "~ERROR,<code> - emitted on invalid command; codes 1-6"
```

## Macros

```yaml
# No explicit multi-step macros documented in source. Source best-practice note:
# build multi-light scenes in the Lutron system itself, then activate via a single
# #DEVICE scene command rather than several #OUTPUT commands.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - Raise/Lower commands on areas, shades, and outputs continue until a Stop command is received; always issue Stop to halt
  - Fade time parameter accepted but ignored on Sivoia QS shades and Venetian blinds (constant-rate motion)
  - Delay time: min 0 s, max 4 hours; fractional seconds rounded down to nearest 1/4 s
  - Send a valid Zone Level to stop a flashing output (Start Flashing runs until cancelled)
  - For Venetian blinds, Delay time min is 0.25 s, max 4 hours
# UNRESOLVED: no explicit safety warnings or hazard procedures stated in source
```

## Notes

Command syntax: `#<COMMAND>,<integration_id>,<action>,<params><CR><LF>` (execute); `?<COMMAND>,<id>,<action>` (query); `~<COMMAND>,<id>,<action>,<params>` (report/monitor). ASCII, case-insensitive, spaces and leading zeros ignored.

Inter-message delay: 100 ms after `#` commands; 1500 ms after `?` queries. Use monitoring (`#MONITORING`) to maintain current state rather than polling queries.

Authentication: Telnet login. QS Standalone ships with logins `nwk` and `nwk2`, passphrases configurable. RadioRA 2 logins defined in the RadioRA 2 software (up to 10 additional). RS-232 and Ethernet are mutually exclusive on QSE-CI-NWK-E.

Scene numbering: Scene 0 = Off. Scenes 1–16 standard (Athena); Quantum 0–326. Shade presets: 0 = Open, 30 = Closed. For switched outputs any non-zero level = on/closed; 0 = off/open.

HVAC note: changing a setpoint turns Eco Mode off. Use `255` as placeholder to leave a parameter unchanged.

<!-- UNRESOLVED: Telnet port number not explicitly stated in source -->
<!-- UNRESOLVED: Caseta-specific model numbers not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: UDP multicast port for RadioRA 2 device-discovery not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.lutron.com
  - web.archive.org
source_urls:
  - https://assets.lutron.com/a/documents/040249.pdf
  - https://web.archive.org/web/20241201153838/https://assets.lutron.com/a/documents/040249.pdf
retrieved_at: 2026-04-30T00:10:09.599Z
last_checked_at: 2026-06-25T10:29:05.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T10:29:05.137Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "deterministic presence proof: 68/68 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Caseta-specific model numbers not enumerated in source; document covers broader Lutron integration protocol applicable to Caseta"
- "Telnet port not explicitly stated in source"
- "no explicit safety warnings or hazard procedures stated in source"
- "Telnet port number not explicitly stated in source"
- "Caseta-specific model numbers not enumerated in source"
- "firmware version compatibility ranges not stated in source"
- "UDP multicast port for RadioRA 2 device-discovery not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
