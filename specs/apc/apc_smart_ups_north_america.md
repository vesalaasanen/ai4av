---
spec_id: admin/apc-smart-ups-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "APC Smart UPS (North America) Control Spec"
manufacturer: APC
model_family: "Smart UPS (North America)"
aliases: []
compatible_with:
  manufacturers:
    - APC
    - "APC by Schneider Electric"
  models:
    - "Smart UPS (North America)"
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.zedt.eu
  - store.controlworks.com
source_urls:
  - http://manuals.zedt.eu/apc-sua-ups/UPS-Link_Protocol_Specification.pdf
  - https://store.controlworks.com/product_resources/documentation/APC_SmartUPS_Module_Help_v1.pdf
retrieved_at: 2026-06-14T21:11:17.558Z
last_checked_at: 2026-06-16T07:00:46.449Z
generated_at: 2026-06-16T07:00:46.449Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps:
  - "exact Smart-UPS model SKUs covered by the \"Smart UPS (North America)\" family are not enumerated in the source; the source lists reference models (250/400/600/900/1250/2000 and 3G 450/700/1000/1400/2200/3000 plus RM/XL derivatives) as examples only."
  - "source notes UPS-Link applies to all APC products supporting smart signaling; applicability to SURTD/SRT/SMX/SMT without AP9620 LCC is not addressed here."
  - "Measure-UPS feedback values (t/h/J/i) share the same opcode shapes"
  - "source does not document a separate variable-address space beyond"
  - "source does not define higher-level scripted sequences."
  - "source does not provide formal power-on sequencing voltage/timing"
  - "firmware-version compatibility matrix per command (source only states \"not available on v/s or Back-UPS Pro\" qualitatively; no version ranges)."
  - "actual SKU list for \"Smart UPS (North America)\" family — source gives reference models only."
  - "minimum time between transmissions (source defers to Appendix I, not present in refined excerpt)."
  - "ACK/NAK timing budgets and command-queue depth — not specified."
  - "whether this UPS-Link spec also applies to SURTD/SRT/SMX/SMT without AP9620 LCC (see recovery notes)."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:00:46.449Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec actions matched verbatim in the source and the source's full 72-command catalogue is completely covered; transport parameters confirmed in 2.1. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# APC Smart UPS (North America) Control Spec

## Summary
This spec covers the APC UPS-Link Communications Protocol — an ASCII-based control language over RS-232 ("smart signaling") used by APC by Schneider Electric Smart-UPS products (including the North America / 100/120/208 Vac voltage versions and their derivatives such as RM and XL). The protocol exposes UPS control (power on/off, battery test, bypass), status and power inquiry (line voltage, battery voltage, load, run time, hex-coded status registers), EEPROM customizing (transfer voltages, sensitivity, delays, alarms), and asynchronous alert messages (line fail, low battery, replace battery, abnormal condition). A Measure-UPS accessory extends the command set with ambient temperature, humidity, contact-closure, and alarm-limit commands. This spec applies to all Smart-UPS models that support smart signaling via the computer interface port; it does NOT cover "standard" contact-closure signaling.

<!-- UNRESOLVED: exact Smart-UPS model SKUs covered by the "Smart UPS (North America)" family are not enumerated in the source; the source lists reference models (250/400/600/900/1250/2000 and 3G 450/700/1000/1400/2200/3000 plus RM/XL derivatives) as examples only. -->
<!-- UNRESOLVED: source notes UPS-Link applies to all APC products supporting smart signaling; applicability to SURTD/SRT/SMX/SMT without AP9620 LCC is not addressed here. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400      # source §2.1: "Baud Rate: 2400 bits/second"
  data_bits: 8         # source §2.1: "Bits Per Character: 8"
  parity: none         # source §2.1: "Parity: none"
  stop_bits: 1         # source §2.1: "Stop Bits: 1"
  flow_control: none   # source §2.1: "Handshaking, flow control: none"
auth:
  type: none  # inferred: no auth procedure in source
# Notes from source §2.1 / §3.0:
#  - Terminal type: ANSI.
#  - Computer interface port pin-out is nonstandard; use only APC-supplied
#    or APC-authorized UPS monitoring cables.
#  - To enter smart mode, host must send ASCII uppercase "Y" after UPS turn-on;
#    UPS responds with "SM". Until then the UPS is in standard signaling mode.
#  - All command responses are followed by CR/LF.
#  - Asynchronous alert messages are NOT followed by CR/LF.
#  - Minimum time between transmissions: see source Appendix I (not reproduced
#    in refined excerpt).
# port: N/A  # serial-only device; no TCP/UDP/HTTP transport described in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: K/K, S, Z/Z, @ddd, Ctrl N (turn on/off commands present)
  - queryable   # inferred: X, >, <, G, V, g, f, 9, Q, ~, ', 8, 7, n, m, j, y, a, b, Ctrl A, /, \, B, C, F, L, M, N, O, P, t, h, v, i, J (query commands present)
  - testable    # inferred: A, W, D (self-test / calibration commands present) - non-standard trait, retained because UPS-Link is explicitly test-oriented
# routable: N/A (no input/output routing commands in source)
# levelable: N/A (no continuous level set commands; EEPROM edit cycles through fixed enum lists)
```

## Actions
```yaml
# All opcodes documented in source §3.1-§3.5 and §4.1-§4.3 are enumerated.
# Per coverage rule, each distinct opcode/mnemonic = ONE action. Parameter
# ranges and enum lists inside one opcode do NOT multiply into separate
# actions (e.g. the "u" upper-transfer-voltage list of per-voltage-version
# values is one parameterized action, not N rows).
# `kind` values used: action | query | setting | modifier.
# Source §3.0: "Commands sent to a UPS must be in the case (upper or lower)
# indicated in each command description." OpCodes below preserve source case.

# ----- §3.1 UPS Control Commands -----

- id: set_smart_mode
  label: Set UPS to Smart Mode
  kind: action
  command: "Y"
  params: []
  response: "SM"
  notes: "Must be sent when UPS is turned on to enter smart signaling mode. Disables standard signaling outputs."

- id: test_lights_beeper
  label: Test Lights and Beeper
  kind: action
  command: "A"
  params: []
  response: "OK"
  notes: "Illuminates all front panel LEDs and sounds beeper for 2 seconds."

- id: turn_off_after_delay
  label: Turn Off after Delay
  kind: action
  command: "K(>1.5s)K"
  params: []
  response: "OK | * | NA"
  notes: "Two uppercase 'K' chars with >1.5 s delay between them. Turns off using Shutdown Delay (p command). Not supported on Smart-UPS 250/400/370ci."

- id: shutdown_on_battery
  label: Shut Down UPS on Battery
  kind: action
  command: "S"
  params: []
  response: "OK | NA"
  notes: "Only honored while on-battery. Output returns when utility restored. Following commands return NA: K(>1.5s)K, U, W, Z(>1.5s)Z, @ddd, -."

- id: simulate_power_failure
  label: Simulate Power Failure
  kind: action
  command: "U"
  params: []
  response: "OK | NA"
  notes: "Forces brief switch to battery operation."

- id: battery_test
  label: Battery Test
  kind: action
  command: "W"
  params: []
  response: "OK | NA"
  notes: "Runs ~8 s battery test. Result saved 5 min for retrieval via X command. Auto-test scheduling via E command."

- id: turn_off_immediate
  label: Turn Off UPS
  kind: action
  command: "Z(>1.5s)Z"
  params: []
  response: "OK | * | NA"
  notes: "Two uppercase 'Z' chars with >1.5 s delay. Immediate turn-off. Not supported on Smart-UPS 250/400/370ci."

- id: shutdown_delayed_wake
  label: Shut Down with Delayed Wake Up
  kind: action
  command: "@{tenths}"
  params:
    - name: tenths
      type: integer
      description: "Wake-up delay in tenths of an hour (3 ASCII digits ddd). e.g. @126 = restart after 12.6 h."
  response: "OK | * | NA"
  notes: "Turns off per Shutdown Delay (p), then restores load after ddd tenths of an hour plus Turn On Delay (r). UPS ignores invalid (non-numeric) chars after '@'."

- id: abort_shutdown
  label: Abort Shutdown
  kind: action
  command: "DEL"
  params: []
  response: "OK | NO"
  notes: "ASCII DEL char. Aborts @ddd, S, and K(>1.5s)K (K abort only during the delay). Valid on Matrix-UPS and newer Smart-UPS."

- id: run_time_calibration
  label: Run Time Calibration
  kind: action
  command: "D"
  params: []
  response: "OK | NO | NA"
  notes: "Discharges to <25% capacity (<35% on Matrix-UPS). Begins only if battery = 100%; else 'NO'. Send D again to abort. Not on Smart-UPS v/s or Back-UPS Pro."

- id: ups_to_bypass_toggle
  label: UPS to Bypass Toggle
  kind: action
  command: "^"
  params: []
  response: "BYP | INV | ERR"
  notes: "Toggles between on-line and bypass. BYP = transferring to bypass; INV = returning to inverter; ERR = unable. Matrix-UPS only."

- id: turn_ups_on
  label: Turn UPS On
  kind: action
  command: "Ctrl N(>1.5s)Ctrl N"
  params: []
  notes: "Ctrl+N or Ctrl+n twice with >1.5 s delay. Equivalent to pressing front ON button. Newer Smart-UPS only."

- id: return_to_simple_mode
  label: Return to Simple Mode
  kind: action
  command: "R"
  params: []
  response: "BYE"
  notes: "Forces UPS out of Smart mode. Send Y to re-enter. Valid on 3G Smart-UPS, Smart-UPS v/s, Back-UPS Pro. Not valid on Matrix-UPS."

# ----- §3.2 UPS Status Inquiry Commands -----

- id: battery_test_result
  label: Battery Test Result
  kind: query
  command: "X"
  params: []
  response: "OK | BT | NG | NO"
  notes: "OK=good, BT=fail (insufficient capacity), NG=invalid (overload), NO=no result available."

- id: num_battery_packs
  label: Number of Battery Packs
  kind: query
  command: ">"
  params: []
  response: "ddd (3-digit count)"
  notes: "Inquiry form. Valid only on UPSs that auto-sense SmartCell packs (Matrix-UPS). For 3G Smart-UPS XL manual config, see 'battery_pack_config' which shares the '>' opcode."

- id: num_bad_battery_packs
  label: Number of Bad Battery Packs
  kind: query
  command: "<"
  params: []
  response: "ddd (3-digit count)"
  notes: "Matrix-UPS only."

- id: transfer_cause
  label: Transfer Cause
  kind: query
  command: "G"
  params: []
  response: "R | H | L | T | O | S"
  notes: "R=rate-of-change, H=high line, L=low line, T=notch/spike, O=none yet, S=command/test induced."

- id: firmware_version
  label: Firmware Version
  kind: query
  command: "V"
  params: []
  response: "3-char alphanumeric"
  notes: "Char 1 = base model type, char 2 = firmware letter (3G Smart-UPS = 'W'), char 3 = utility voltage version. Not on Smart-UPS v/s or Back-UPS Pro."

- id: nominal_battery_voltage
  label: UPS Nominal Battery Voltage Rating
  kind: query
  command: "g"
  params: []
  response: "ddd (3-digit, e.g. 024/018/048)"

- id: battery_capacity
  label: Battery Capacity
  kind: query
  command: "f"
  params: []
  response: "ddd.d (percent of full charge)"

- id: acceptable_line_quality
  label: Acceptable Line Quality
  kind: query
  command: "9"
  params: []
  response: "FF | 00"
  notes: "FF=acceptable utility line quality, 00=unacceptable."

- id: ups_status_register
  label: UPS Status (Q register)
  kind: query
  command: "Q"
  params: []
  response: "2-hex (8-bit register)"
  notes: "Bits: 7=replace battery, 6=low battery, 5=overloaded, 4=on-battery, 3=on-line, 2=SmartBoost, 1=SmartTrim, 0=run time calibration running."

- id: state_register
  label: State Register (~)
  kind: query
  command: "~"
  params: []
  response: "2-hex (8-bit register)"
  notes: "Bits 7/6 reported by 3G Smart-UPS, v/s, Back-UPS Pro; full bit set only on Matrix-UPS. See source table §3.2."

- id: trip1_register
  label: Trip1 Register
  kind: query
  command: "'"
  params: []
  response: "2-hex (8-bit register)"
  notes: "Apostrophe opcode. Mainly fault conditions (bad output V, relay faults, fan failures). Matrix-UPS reports all bits except 7,6."

- id: trip_register
  label: Trip Register
  kind: query
  command: "8"
  params: []
  response: "2-hex (8-bit register)"
  notes: "Bits: over-temp, bypass relay fault, charger failure, S-shutdown, @ddd-sleep, main relay fault, overload-blocked-transfer, low-battery shutdown."

- id: dip_switch_position
  label: DIP Switch Position
  kind: query
  command: "7"
  params: []
  response: "2-hex (8-bit register)"
  notes: "Bits 3-0 map to option switches 1-4. Models without DIP switches return '00'."

- id: ups_serial_number
  label: UPS Serial Number
  kind: query
  command: "n"
  params: []
  response: ">=8 chars (12 chars on newer Smart-UPS)"

- id: ups_manufacture_date
  label: UPS Manufacture Date
  kind: query
  command: "m"
  params: []
  response: "dd/mm/yy (8 chars)"

- id: run_time_remaining
  label: Run Time Remaining
  kind: query
  command: "j"
  params: []
  response: "dddd: (minutes)"
  notes: "Returns '>>>>:' when undeterminable."

- id: copyright
  label: Copyright
  kind: query
  command: "y"
  params: []
  response: "(C) APCC"
  notes: "Validates UPS as genuine APC. Requires firmware letter later than 'O'."

- id: all_commands_available
  label: All Commands Available from UPS
  kind: query
  command: "a"
  params: []
  response: "x.x.x.x[,]x.x.x.x"
  notes: "Format: 'UPS-Link level'.'async chars'.'single-char commands'."

- id: version_in_decimal
  label: Version in Decimal
  kind: query
  command: "b"
  params: []
  response: "xxx.xxx.x"
  notes: "Fields: SKU.firmware.country_code (I/D/A/M/J)."

- id: ups_model_name
  label: UPS Model
  kind: query
  command: "Ctrl A"
  params: []
  response: "<32-char ASCII model name"

# ----- §3.3 UPS Power Inquiry Commands -----

- id: load_current
  label: Load Current
  kind: query
  command: "/"
  params: []
  response: "dd.dd (true RMS amps)"
  notes: "Matrix-UPS only."

- id: apparent_load_power
  label: Apparent Load Power
  kind: query
  command: "\\"
  params: []
  response: "ddd.dd (percent of rated VA)"
  notes: "Matrix-UPS only."

- id: battery_voltage
  label: Battery Voltage
  kind: query
  command: "B"
  params: []
  response: "dd.dd (Vdc)"

- id: ups_internal_temperature
  label: UPS Internal Temperature
  kind: query
  command: "C"
  params: []
  response: "ddd.d (°C)"

- id: operating_frequency
  label: UPS & Utility Operating Frequency
  kind: query
  command: "F"
  params: []
  response: "dd.dd (Hz)"

- id: line_voltage
  label: Line Voltage
  kind: query
  command: "L"
  params: []
  response: "ddd.d (Vac input)"

- id: max_line_voltage
  label: Maximum Line Voltage
  kind: query
  command: "M"
  params: []
  response: "ddd.d (Vac)"
  notes: "Max since previous M query."

- id: min_line_voltage
  label: Minimum Line Voltage
  kind: query
  command: "N"
  params: []
  response: "ddd.d (Vac)"
  notes: "Min since previous N query."

- id: output_voltage
  label: Output Voltage
  kind: query
  command: "O"
  params: []
  response: "ddd.d (Vac)"

- id: load_power
  label: Load Power
  kind: query
  command: "P"
  params: []
  response: "ddd.d (percent of rated W)"

# ----- §3.4 UPS Customizing Commands -----

- id: read_all_eeprom
  label: Read All Configurable EEPROM Parameters
  kind: query
  command: "Ctrl Z"
  params: []
  response: "#dddddddd... (multi-item string)"
  notes: "Matrix-UPS and newer Smart-UPS only. Format described in source §3.4."

- id: reset_eeprom
  label: Reset UPS EEPROM Variables
  kind: action
  command: "z"
  params: []
  response: "CLEAR"
  notes: "Restores defaults for all customizing commands except c and x."

- id: edit_next
  label: Edit (advance to next setting)
  kind: modifier
  command: "-"
  params: []
  response: "OK | NO | NA"
  notes: "Sent immediately after a customizing command (u/l/o/s/q/k/p/r/e/E/w/[/]/{/}/I) to advance to the next enum value. After 'c' or 'x', allows direct ASCII entry. Disallowed when any option switch is OFF (except DIP #4 on 250/370ci/400)."

- id: output_voltage_selection
  label: Output Voltage Selection
  kind: setting
  command: "Ctrl V"
  params: []
  response: "A | M | I"
  notes: "A=auto, M=208 Vac, I=240 Vac. Matrix-UPS only; newer Smart-UPS returns NA."

- id: front_panel_language
  label: Front Panel Language Selection
  kind: setting
  command: "Ctrl L"
  params: []
  response: "E | F | G | S | 1 | 2 | 3 | 4"
  notes: "E=English, F=French, G=German, S=Spanish. Matrix-UPS only."

- id: auto_battery_test_setting
  label: Automatic Battery Test
  kind: setting
  command: "E"
  params: []
  response: "336 | 168 | ON  | OFF"
  notes: "336=every 14 days, 168=every 7 days, ON=upon startup, OFF=none. 'ON' has trailing space."

- id: ups_id
  label: UPS ID
  kind: setting
  command: "c"
  params:
    - name: name
      type: string
      description: "Exactly 8 ASCII chars (use spaces if needed). Hyphen '-' not allowed. Set via Edit (-) then direct entry."
  response: "8-char string | OK (after edit)"

- id: battery_replacement_date
  label: Battery Replacement Date
  kind: setting
  command: "x"
  params:
    - name: date
      type: string
      description: "8 chars dd/mm/yy. Set via Edit (-) then direct entry."
  response: "dd/mm/yy | OK (after edit)"

- id: upper_transfer_voltage
  label: Upper Transfer Voltage
  kind: setting
  command: "u"
  params: []
  response: "3-digit Vac (per-version enum list)"
  notes: "Enum list varies by utility voltage version (100/120/208/220-240 Vac, plus Matrix-UPS configs). See source table §3.4."

- id: lower_transfer_voltage
  label: Lower Transfer Voltage
  kind: setting
  command: "l"
  params: []
  response: "3-digit Vac (per-version enum list)"
  notes: "Not valid on Matrix-UPS (returns NO)."

- id: min_battery_capacity_restart
  label: Minimum Battery Capacity to Restart
  kind: setting
  command: "e"
  params: []
  response: "00 | 15 | 50 | 90  (newer Smart-UPS)  OR  00 | 10 | 25 | 90  (other models)"
  notes: "Percent of full capacity. Not valid on Matrix-UPS (returns NO)."

- id: output_voltage_setting
  label: Output Voltage
  kind: setting
  command: "o"
  params: []
  response: "3-digit Vac"
  notes: "100/120/208 Vac versions return fixed '100'/'115'/'208'. 220-240 Vac configurable: 225/230/240/220."

- id: utility_failure_sensitivity
  label: Utility Failure Sensitivity
  kind: setting
  command: "s"
  params: []
  response: "H | M | L | A"
  notes: "H/M/L on Smart-UPS (L repeated as 4th); A=auto-adjust on Matrix-UPS only."

- id: low_battery_warning
  label: Low Battery Warning Interval
  kind: setting
  command: "q"
  params: []
  response: "02 | 05 | 07 | 10  (minutes)"

- id: audible_alarm
  label: Audible Alarm
  kind: setting
  command: "k"
  params: []
  response: "0 | T | L | N"
  notes: "0=immediate, T=delayed 30 s on utility fail, L=low-battery only, N=disabled."

- id: shutdown_delay
  label: Shutdown Delay
  kind: setting
  command: "p"
  params: []
  response: "020 | 180 | 300 | 600  (seconds)"

- id: turn_on_delay
  label: Turn On Delay
  kind: setting
  command: "r"
  params: []
  response: "000 | 060 | 180 | 300  (seconds)"

- id: run_time_conservation
  label: Run Time Conservation
  kind: setting
  command: "w"
  params: []
  response: "NO | 02 | 05 | 08  (minutes after low-battery warning)"
  notes: "Matrix-UPS only."

- id: battery_pack_config
  label: Battery Pack Configuration
  kind: setting
  command: ">"
  params: []
  response: "new count | NA"
  notes: "Shares '>' opcode with num_battery_packs inquiry. For 3G Smart-UPS XL that cannot auto-sense: send '>' then '+'/'-' (Edit) to increment/decrement count by 1 and return the new setting."

# ----- §4.1 Measure-UPS Inquiry Commands -----
# (Accessory; pass-through only when a Measure-UPS is connected downstream.)

- id: ambient_temperature
  label: Ambient Temperature
  kind: query
  command: "t"
  params: []
  response: "dd.dd (°C, Measure-UPS)"
  notes: "Measure-UPS accessory. Not on Smart-UPS v/s."

- id: humidity
  label: Humidity
  kind: query
  command: "h"
  params: []
  response: "ddd.d (% RH, Measure-UPS)"

- id: measureups_firmware
  label: Measure-UPS Firmware Version
  kind: query
  command: "v"
  params: []
  response: "3-char (model '4' + firmware letter + 'x')"
  notes: "Measure-UPS accessory."

- id: dip_external_contact_status
  label: DIP Switch & External Contact Status
  kind: query
  command: "i"
  params: []
  response: "2-hex (8-bit register, Measure-UPS)"
  notes: "Bits 7-4 = contact inputs #4-#1 (0=open,1=closed); bits 3-0 = DIP switches #4-#1 (0=NO,1=NC)."

- id: alarm_status
  label: Alarm Status
  kind: query
  command: "J"
  params: []
  response: "2-hex (8-bit register, Measure-UPS)"
  notes: "Temp/humidity limits exceeded + per-channel contact alarm states."

# ----- §4.2 Measure-UPS Customizing Commands -----
# Note: "-" Edit opcode is shared with UPS customizing; see edit_next above.

- id: upper_temp_alarm_limit
  label: Upper Temperature Alarm Limit
  kind: setting
  command: "["
  params: []
  response: "32.13 | 45.90 | 54.06 | 23.97  (°C, Measure-UPS)"

- id: lower_temp_alarm_limit
  label: Lower Temperature Alarm Limit
  kind: setting
  command: "]"
  params: []
  response: "04.08 | 09.94 | 14.02 | 18.10  (°C, Measure-UPS)"

- id: upper_rh_alarm_limit
  label: Upper Relative Humidity Alarm Limit
  kind: setting
  command: "{"
  params: []
  response: "070.0 | 080.0 | 084.5 | 090.1  (% RH, Measure-UPS)"

- id: lower_rh_alarm_limit
  label: Lower Relative Humidity Alarm Limit
  kind: setting
  command: "}"
  params: []
  response: "010.0 | 020.1 | 030.2 | 040.3  (% RH, Measure-UPS)"

- id: alarm_enable
  label: Alarm Enable
  kind: setting
  command: "I"
  params:
    - name: mask
      type: string
      description: "2-hex byte; bit=1 enables alarm for that condition. Bit 7=upper temp, 6=lower temp, 5=upper RH, 4=lower RH, 3-0=contact channels #4-#1."
  response: "2-hex current mask | OK (after valid edit)"
  notes: "Set via Edit (-) then 2-hex entry. Measure-UPS ignores invalid hex."
```

## Feedbacks
```yaml
# Discrete query responses (also see Actions with kind: query for full opcode set).
# Below: observable state values most useful for control-loop feedback.

- id: power_state
  type: enum
  values: [on_line, on_battery, bypass, sleep, off]
  source_query: ups_status_register  # Q command bits 4/3 + state_register ~ bits

- id: battery_test_state
  type: enum
  values: [ok, failed, invalid_overload, no_result]
  source_query: battery_test_result  # X command

- id: transfer_cause_state
  type: enum
  values: [rate_of_change, high_line, low_line, notch_spike, none, command_test]
  source_query: transfer_cause  # G command

- id: line_quality_state
  type: enum
  values: [acceptable, unacceptable]
  source_query: acceptable_line_quality  # 9 command

- id: battery_capacity_percent
  type: number
  unit: percent
  source_query: battery_capacity  # f command

- id: run_time_remaining_minutes
  type: number
  unit: minutes
  source_query: run_time_remaining  # j command

- id: line_voltage_vac
  type: number
  unit: Vac
  source_query: line_voltage  # L command

- id: output_voltage_vac
  type: number
  unit: Vac
  source_query: output_voltage  # O command

- id: battery_voltage_vdc
  type: number
  unit: Vdc
  source_query: battery_voltage  # B command

- id: internal_temperature_c
  type: number
  unit: degC
  source_query: ups_internal_temperature  # C command

- id: load_power_percent
  type: number
  unit: percent
  source_query: load_power  # P command

- id: status_register_q
  type: hex_byte
  bit_map:
    bit7: replace_battery_condition
    bit6: low_battery_condition
    bit5: overloaded_output
    bit4: on_battery_mode
    bit3: on_line_mode
    bit2: smart_boost_mode
    bit1: smart_trim_mode
    bit0: run_time_calibration_running
  source_query: ups_status_register  # Q

- id: trip_register_8
  type: hex_byte
  bit_map:
    bit7: fault_internal_over_temperature
    bit6: fault_bypass_relay_malfunction
    bit5: fault_battery_charger_failure
    bit4: shutdown_via_S_command
    bit3: sleep_via_at_ddd_command
    bit2: fault_main_relay_malfunction
    bit1: unable_to_transfer_on_battery_overload
    bit0: output_unpowered_low_battery_shutdown
  source_query: trip_register  # 8

- id: trip1_register
  type: hex_byte
  source_query: trip1_register  # '
  notes: "Fault conditions; bit map per source §3.2."

- id: state_register
  type: hex_byte
  source_query: state_register  # ~
  notes: "Bypass / ready-to-power state; bit map per source §3.2."

- id: dip_switch_register
  type: hex_byte
  source_query: dip_switch_position  # 7

# UNRESOLVED: Measure-UPS feedback values (t/h/J/i) share the same opcode shapes
# as their Actions; their typed Feedbacks can be added when a Measure-UPS target
# is in scope.
```

## Variables
```yaml
# Settable EEPROM parameters are modeled as Actions (kind: setting) above because
# each has a dedicated opcode and is exercised via the Edit (-) modifier. No
# additional free-floating variables are documented in the source.

# UNRESOLVED: source does not document a separate variable-address space beyond
# the EEPROM customizing commands.
```

## Events
```yaml
# Asynchronous alert messages from source §3.5 (UPS) and §4.3 (Measure-UPS).
# Per source §3.0 these are NOT followed by CR/LF and do NOT interrupt any
# command currently being processed.

- id: line_fail
  opcode: "!"
  description: "UPS transferred to on-battery operation. Repeated every 30 s during extended outage until low battery."

- id: return_from_line_fail
  opcode: "$"
  description: "UPS returned from on-battery. Sent only if '!' was sent first."

- id: low_battery
  opcode: "%"
  description: "Low battery condition. Not on Smart-UPS v/s or Back-UPS Pro."

- id: return_from_low_battery
  opcode: "+"
  description: "Battery recharged to sufficient capacity. Sent only if '%' was sent first."

- id: abnormal_condition
  opcode: "?"
  description: "UPS entered abnormal state (overload shutdown, low-battery shutdown, PC reboot). Also auto-sent within 10 min of turn-on."

- id: return_from_abnormal_condition
  opcode: "="
  description: "UPS recovered from abnormal condition. Sent only if '?' was sent first; not sent after the turn-on '?'."

- id: ups_about_to_turn_load_off
  opcode: "*"
  description: "UPS commanded to turn off; no further commands processed. Not on newer Smart-UPS, v/s, or Back-UPS Pro."

- id: replace_battery
  opcode: "#"
  description: "Battery test found replace-battery condition. Repeats every 5 h until new test passes or UPS turned off."

- id: eeprom_variable_change
  opcode: "|"
  description: "Any UPS EEPROM variable changed via Customizing Commands. Newer Smart-UPS and Matrix-UPS only."

- id: measureups_alarm
  opcode: "&"
  description: "Measure-UPS: ambient temp/humidity outside limits, or a contact-closure input changed from its normal state. Sent every 2 min while alarm condition exists. Cause via J query."
```

## Macros
```yaml
# No multi-step command sequences are formally defined in the source beyond
# the implicit enter-smart-mode handshake (Y -> SM) and the per-customizing-
# command Edit (-) sequence. These are documented inline on the relevant
# Actions rather than as named macros.

# UNRESOLVED: source does not define higher-level scripted sequences.
```

## Safety
```yaml
confirmation_required_for:
  - turn_off_after_delay        # K(>1.5s)K - removes load power
  - turn_off_immediate          # Z(>1.5s)Z - removes load power immediately
  - shutdown_on_battery         # S - removes load power
  - shutdown_delayed_wake       # @ddd - removes load power on a timer
  - simulate_power_failure      # U - forces on-battery
  - run_time_calibration        # D - discharges battery below 25%
  - ups_to_bypass_toggle        # ^ - bypasses inverter protection
  - turn_ups_on                 # Ctrl N(>1.5s)Ctrl N - energizes output
  - reset_eeprom                # z - restores defaults; may change transfer voltages / alarms
interlocks:
  - "Y command must be sent after UPS turn-on before any other command is accepted in smart mode (source §3.0)."
  - "shutdown_on_battery (S) is honored only while on-battery; following commands return NA: K(>1.5s)K, U, W, Z(>1.5s)Z, @ddd, - (source §3.1 'S')."
  - "Edit (-) is disallowed when any DIP option switch is OFF, except DIP #4 on Smart-UPS 250/370ci/400 which may be in any position (source §3.4)."
  - "Matrix-UPS battery charger is disabled when shut off via K(>1.5s)K or Z(>1.5s)Z; do not operate Matrix-UPS in this mode for extended periods or batteries may discharge (source §3.1)."
  - "Automatic turn-on feature on Smart-UPS 400 and UPS 370ci must be disabled via option switch for S and @ddd commands to take effect (source §3.1)."
  - "Use only APC-supplied or APC-authorized UPS monitoring cables; the computer interface port pin-out is nonstandard (source §2.1)."
  - "Source §2.0: use ONLY the commands documented in this specification; any others are APC-internal and can produce unintended results."
# UNRESOLVED: source does not provide formal power-on sequencing voltage/timing
# specs; only operational interlocks are documented.
```

## Notes
- **Voltage-version scope.** Source targets all APC UPSs supporting smart signaling. The 1st-character model table in §3.2 ("V" command) enumerates Smart-UPS 250/400/600/900/1250/2000 and 3G 450/700/1000/1400/2200/3000 (plus RM/XL derivatives) and Matrix-UPS 3000/5000. The 3rd-character voltage table covers 100/120/208/220-230-240 Vac. "Smart UPS (North America)" most plausibly maps to the 100/120/208 Vac columns; confirm against the actual SKU before relying on per-version enum lists (u, l, o).
- **Protocol entry handshake.** Host must send ASCII uppercase `Y` after UPS turn-on; UPS responds `SM`. Until then the UPS is in standard signaling mode and smart commands are ignored. A stray `?` alert is auto-sent at turn-on.
- **Case sensitivity.** Commands must be sent in the exact case documented (e.g. `S` ≠ `s`, `c` ≠ `C`). Responses are uppercase except for `c`, `n`, `m`, `x` which may be mixed case.
- **Line endings.** Command responses are CR/LF-terminated; asynchronous alerts are NOT CR/LF-terminated.
- **Timing.** `K(>1.5s)K`, `Z(>1.5s)Z`, `Ctrl N(>1.5s)Ctrl N` require >1.5 s between the two characters or the UPS will not recognize the command; any other command interleaved invalidates the sequence.
- **Measure-UPS accessory.** Commands in §4.x (t, h, v, i, J, [, ], {, }, I, &) apply only when a Measure-UPS accessory is connected downstream. The Measure-UPS passes through all §3.x UPS commands.
- **Model exclusions.** Many commands are explicitly unavailable on Smart-UPS v/s, Back-UPS Pro, Smart-UPS 250/400/370ci, or Matrix-UPS; see per-action `notes`.
- **Quirks.** `@ddd` ignores invalid (non-numeric) chars after `@` and must be retried. `j` (run time) may return `>>>>:` when undeterminable. `c`/`x` cannot be reset by `z` and cannot contain `-`.

<!-- UNRESOLVED: firmware-version compatibility matrix per command (source only states "not available on v/s or Back-UPS Pro" qualitatively; no version ranges). -->
<!-- UNRESOLVED: actual SKU list for "Smart UPS (North America)" family — source gives reference models only. -->
<!-- UNRESOLVED: minimum time between transmissions (source defers to Appendix I, not present in refined excerpt). -->
<!-- UNRESOLVED: ACK/NAK timing budgets and command-queue depth — not specified. -->
<!-- UNRESOLVED: whether this UPS-Link spec also applies to SURTD/SRT/SMX/SMT without AP9620 LCC (see recovery notes). -->

## Provenance

```yaml
source_domains:
  - manuals.zedt.eu
  - store.controlworks.com
source_urls:
  - http://manuals.zedt.eu/apc-sua-ups/UPS-Link_Protocol_Specification.pdf
  - https://store.controlworks.com/product_resources/documentation/APC_SmartUPS_Module_Help_v1.pdf
retrieved_at: 2026-06-14T21:11:17.558Z
last_checked_at: 2026-06-16T07:00:46.449Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:00:46.449Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec actions matched verbatim in the source and the source's full 72-command catalogue is completely covered; transport parameters confirmed in 2.1. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact Smart-UPS model SKUs covered by the \"Smart UPS (North America)\" family are not enumerated in the source; the source lists reference models (250/400/600/900/1250/2000 and 3G 450/700/1000/1400/2200/3000 plus RM/XL derivatives) as examples only."
- "source notes UPS-Link applies to all APC products supporting smart signaling; applicability to SURTD/SRT/SMX/SMT without AP9620 LCC is not addressed here."
- "Measure-UPS feedback values (t/h/J/i) share the same opcode shapes"
- "source does not document a separate variable-address space beyond"
- "source does not define higher-level scripted sequences."
- "source does not provide formal power-on sequencing voltage/timing"
- "firmware-version compatibility matrix per command (source only states \"not available on v/s or Back-UPS Pro\" qualitatively; no version ranges)."
- "actual SKU list for \"Smart UPS (North America)\" family — source gives reference models only."
- "minimum time between transmissions (source defers to Appendix I, not present in refined excerpt)."
- "ACK/NAK timing budgets and command-queue depth — not specified."
- "whether this UPS-Link spec also applies to SURTD/SRT/SMX/SMT without AP9620 LCC (see recovery notes)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
