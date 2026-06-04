---
spec_id: admin/panamax-m7500-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panamax M7500-PRO Control Spec"
manufacturer: Panamax
model_family: M7500-PRO
aliases: []
compatible_with:
  manufacturers:
    - Panamax
  models:
    - M7500-PRO
    - "MAX 7500-PRO"
    - "MAX 74/7500-PRO"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - panamax.com
source_urls:
  - https://panamax.com/wp-content/uploads/m7500pro_manual.pdf
retrieved_at: 2026-06-03T11:10:08.022Z
last_checked_at: 2026-06-04T06:28:51.084Z
generated_at: 2026-06-04T06:28:51.084Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "known protocol was given as TCP/IP, but the source document describes only RS-232. No TCP/IP control documented."
  - "not applicable."
  - "no explicit safety warnings, no interlock procedures, no power-on sequencing requirements stated in source beyond immediate switch behavior."
  - "firmware version compatibility not stated in source. UNRESOLVED: DC trigger voltage/current ranges (3-24V, 4.6mA@3V, 58mA@24V in, <12V/<400mA out) are documented but are hardware electrical specs, not control-protocol fields — included in Notes context only."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:28:51.084Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec commands matched verbatim in source with correct parameters and transport settings verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Panamax M7500-PRO Control Spec

## Summary
The Panamax M7500-PRO is a sequenced power conditioner / outlet manager with an RS-232 control interface on a DB9 connector. This spec covers the ASCII command/response protocol used to switch outlet banks, configure triggers and delays, query power state, and enable unsolicited feedback.

<!-- UNRESOLVED: known protocol was given as TCP/IP, but the source document describes only RS-232. No TCP/IP control documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  null_modem: false  # stated: "cable not required"
  connector: DB9
  connector_pinout:
    pin2: RECEIVE DATA
    pin3: TRANSMIT DATA
    pin5: GROUND
auth:
  type: none  # inferred: no auth procedure in source
termination: "ASCII CR (13), LF (10), or NULL"
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from outlet bank switching examples
- queryable       # inferred from query command examples
- levelable       # inferred from !SET_BRIGHT (meter brightness) command
```

## Actions
```yaml
- id: button_on
  label: Front Panel Button ON
  kind: action
  command: "!BUTTON_ON\r"
  description: Changes the status of the front panel button to ON (equivalent to pressing the front panel button for 2 seconds).
  response: "$BUTTON = ON\r"
  params: []

- id: button_off
  label: Front Panel Button OFF
  kind: action
  command: "!BUTTON_OFF\r"
  description: Changes the status of the front panel button to OFF (equivalent to pressing the front panel button for 2 seconds).
  response: "$BUTTON = OFF\r"
  params: []

- id: all_off
  label: All Outlets OFF
  kind: action
  command: "!ALL_OFF\r"
  description: Turns off all outlets including always-on. Immediate, terminates any running sequence, overrides DC trigger input, sets front panel button OFF.
  response: "$BUTTON = OFF\r"
  params: []

- id: all_on
  label: All Outlets ON
  kind: action
  command: "!ALL_ON\r"
  description: Turns on all outlets. Immediate. Terminates any running sequence. Overrides DC trigger input, sets front panel button ON. Returns fault response on over/under-voltage.
  response:
    success: "$BUTTON = ON\r"
    overvoltage: "$PWR = OVERVOLTAGE\r"
    undervoltage: "$PWR = UNDERVOLTAGE\r"
  params: []

- id: switch
  label: Switch Outlet Bank
  kind: action
  command: "!SWITCH {bank} {state}\r"
  description: Turns a specific outlet bank or the trigger output on or off (immediate, no delay).
  response:
    invalid: "$INVALID_PARAMETER\r"
    confirmation: "see Feedbacks section 3.1"
    overvoltage: "$PWR = OVERVOLTAGE\r"
    undervoltage: "$PWR = UNDERVOLTAGE\r"
  params:
    - name: bank
      type: string
      enum: [1, 2, 3, 4, HC1, HC2, TRIGOUT]
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_bright
  label: Set Meter Brightness
  kind: action
  command: "!SET_BRIGHT {x}\r"
  description: Sets the voltmeter, ammeter and LED brightness to x%.
  response:
    valid: "$BRIGHTNESS = x\r"
    invalid: "$INVALID_PARAMETER\r"
  params:
    - name: x
      type: integer
      min: 10
      max: 100

- id: set_trigger
  label: Set Trigger Source
  kind: action
  command: "!SET_TRIGGER {bank} {triggersource}\r"
  description: Assigns the trigger(s) for an outlet bank or DC trigger output. Used in CUSTOM SETTINGS mode.
  response:
    valid: "$TRIGGER FOR {bank} = {triggersource}\r"
    invalid: "$INVALID_PARAMETER\r"
  params:
    - name: bank
      type: string
      enum: [1, 2, 3, 4, HC1, HC2, TRIGOUT]
    - name: triggersource
      type: string
      enum: [NONE, BUTTON, TRIGIN]

- id: set_delay
  label: Set On/Off Delay
  kind: action
  command: "!SET_DELAY {bank} {ondelay} {offdelay}\r"
  description: Assigns the turn-on and turn-off delays for an outlet bank or DC trigger output. Used in CUSTOM SETTINGS mode.
  response:
    valid: "$DELAY FOR {bank} = {ondelay} {offdelay}\r"
    invalid: "$INVALID_PARAMETER\r"
  params:
    - name: bank
      type: string
      enum: [1, 2, 3, 4, HC1, HC2, TRIGOUT]
    - name: ondelay
      type: integer
      min: 0
      max: 240
      unit: seconds
    - name: offdelay
      type: integer
      min: 0
      max: 240
      unit: seconds

- id: set_feedback
  label: Set Feedback Mode
  kind: action
  command: "!SET_FEEDBACK {mode}\r"
  description: Sets feedback to ON (unsolicited) or OFF (polled). When ON, the unit sends a message whenever an input/output/power state changes.
  response:
    on: "$FEEDBACK = ON\r"
    off: "$FEEDBACK = OFF\r"
    invalid: "$INVALID_PARAMETER\r"
  params:
    - name: mode
      type: string
      enum: [ON, OFF]

- id: set_linefeed
  label: Set Linefeed Mode
  kind: action
  command: "!SET_LINEFEED {mode}\r"
  description: Controls linefeeds (ASCII 10 / 0x0A) appended to each response.
  response:
    on: "$LINEFEED = ON\r"
    off: "$LINEFEED = OFF\r"
    invalid: "$INVALID_PARAMETER\r"
  params:
    - name: mode
      type: string
      enum: [ON, OFF]

- id: reset_all
  label: Reset All to Factory Defaults
  kind: action
  command: "!RESET_ALL\r"
  description: Resets all custom configuration settings (triggers, delays, meter brightness, feedback mode, linefeed mode) to factory defaults.
  response: "$FACTORY SETTINGS RESTORED\r"
  factory_defaults:
    TRIGGER FOR 1: BUTTON
    TRIGGER FOR 2: BUTTON
    TRIGGER FOR 3: BUTTON
    TRIGGER FOR 4: BUTTON
    TRIGGER FOR HC1: BUTTON
    TRIGGER FOR HC2: BUTTON
    TRIGGER FOR TRIGOUT: TRIGIN
    DELAY FOR 1: "000,005"
    DELAY FOR 2: "001,004"
    DELAY FOR 3: "002,003"
    DELAY FOR 4: "003,002"
    DELAY FOR HC1: "004,001"
    DELAY FOR HC2: "005,000"
    DELAY FOR TRIGOUT: "005,000"
    BRIGHTNESS: 100
    FEEDBACK: ON
    LINEFEED: ON
  params: []

- id: query_id
  label: Query Identity
  kind: query
  command: "?ID\r"
  description: Request that the unit identify itself.
  response:
    - "$PANAMAX\r"
    - "$MAX 74/7500-PRO\r"
    - "$FIRMWARE {revision}\r"
  params: []

- id: query_trigstat
  label: Query Trigger Status
  kind: query
  command: "?TRIGSTAT\r"
  description: Request the on/off status of the front panel button and input trigger.
  response:
    button_on: "$BUTTON = ON\r"
    button_off: "$BUTTON = OFF\r"
    trigin_on: "$TRIGIN = ON\r"
    trigin_off: "$TRIGIN = OFF\r"
  params: []

- id: query_outletstat
  label: Query Outlet Status
  kind: query
  command: "?OUTLETSTAT\r"
  description: Request the on/off status of the outlet banks and output trigger.
  response_template:
    BANK1: status
    BANK2: status
    BANK3: status
    BANK4: status
    HC1: status
    HC2: status
    TRIGOUT: status
  status_values: [ON, OFF]
  params: []

- id: query_powerstat
  label: Query Power Status
  kind: query
  command: "?POWERSTAT\r"
  description: Request the status of the input voltage.
  response:
    normal: "$PWR = NORMAL\r"
    overvoltage: "$PWR = OVERVOLTAGE\r"
    undervoltage: "$PWR = UNDERVOLTAGE\r"
    recovery: "$PWR = RECOVERY\r"
  params: []

- id: query_voltage
  label: Query Line Voltage
  kind: query
  command: "?VOLTAGE\r"
  description: Request the line voltage.
  response:
    in_range: "$VOLTAGE = {xxx}\r"  # 140V > Vin > 90; leading zero for <100, e.g. 092
    overvoltage: "$VOLTAGE = OVERVOLTAGE"
    undervoltage: "$VOLTAGE = UNDERVOLTAGE"
  params: []

- id: query_current
  label: Query Input Current
  kind: query
  command: "?CURRENT\r"
  description: Request the input current draw.
  response: "$CURRENT = {xxx}\r"  # decimal; leading zero for <10, e.g. 03.3
  params: []

- id: query_help
  label: Query Help
  kind: query
  command: "?HELP\r"
  description: Request a list of all commands and queries.
  response: "Listing of all commands and queries"
  params: []

- id: query_list_config
  label: Query Configuration
  kind: query
  command: "?LIST_CONFIG\r"
  description: Request a list of all configurable parameters and current settings.
  response_template:
    - "$TRIGGER FOR 1 = {triggersource}\r"
    - "$TRIGGER FOR 2 = {triggersource}\r"
    - "$TRIGGER FOR 3 = {triggersource}\r"
    - "$TRIGGER FOR 4 = {triggersource}\r"
    - "$TRIGGER FOR HC1 = {triggersource}\r"
    - "$TRIGGER FOR HC2 = {triggersource}\r"
    - "$TRIGGER FOR TRIGOUT = {triggersource}\r"
    - "$DELAY FOR 1 = {ondelay} {offdelay}\r"
    - "$DELAY FOR 2 = {ondelay} {offdelay}\r"
    - "$DELAY FOR 3 = {ondelay} {offdelay}\r"
    - "$DELAY FOR 4 = {ondelay} {offdelay}\r"
    - "$DELAY FOR HC1 = {ondelay} {offdelay}\r"
    - "$DELAY FOR HC2 = {ondelay} {offdelay}\r"
    - "$DELAY FOR TRIGOUT = {ondelay} {offdelay}\r"
    - "$BRIGHTNESS = {x}\r"
    - "$FEEDBACK = {x}\r"
    - "$LINEFEED = {x}\r"
  params: []
```

## Feedbacks
```yaml
- id: outlet_bank_state
  type: object
  description: Unsolicited feedback when an outlet bank or trigger output changes state (requires SET_FEEDBACK ON).
  fields:
    BANK1: enum [ON, OFF]
    BANK2: enum [ON, OFF]
    BANK3: enum [ON, OFF]
    BANK4: enum [ON, OFF]
    HC1: enum [ON, OFF]
    HC2: enum [ON, OFF]
    TRIGOUT: enum [ON, OFF]
  example: "$BANK1 = ON\r"

- id: trigger_input_state
  type: object
  description: Unsolicited feedback when front panel button or input trigger changes state.
  fields:
    BUTTON: enum [ON, OFF]
    TRIGIN: enum [ON, OFF]
  example: "$BUTTON = OFF\r"

- id: power_overvoltage
  type: enum
  values: [OVERVOLTAGE]
  description: Input voltage rose above the overvoltage threshold.
  message: "$PWR = OVERVOLTAGE\r"

- id: power_undervoltage
  type: enum
  values: [UNDERVOLTAGE]
  description: Input voltage fell below the undervoltage threshold.
  message: "$PWR = UNDERVOLTAGE\r"

- id: power_recovery
  type: enum
  values: [RECOVERY]
  description: Input voltage returned to safe operating range after an over/under-voltage condition.
  message: "$PWR = RECOVERY\r"

- id: power_normal
  type: enum
  values: [NORMAL]
  description: Recovery completed, normal operation resumed.
  message: "$PWR = NORMAL\r"
```

## Variables
```yaml
- id: trigger_source
  label: Trigger Source per Bank
  type: string
  enum: [NONE, BUTTON, TRIGIN]
  description: Source that switches each outlet bank. NONE = always ON (RS-232 only). BUTTON = front panel button. TRIGIN = DC input trigger.
  scope: per-bank (1, 2, 3, 4, HC1, HC2, TRIGOUT)

- id: on_delay
  label: Turn-On Delay
  type: integer
  min: 0
  max: 240
  unit: seconds
  description: Delay applied to outlet bank turn-on. Used in CUSTOM SETTINGS mode.
  scope: per-bank (1, 2, 3, 4, HC1, HC2, TRIGOUT)

- id: off_delay
  label: Turn-Off Delay
  type: integer
  min: 0
  max: 240
  unit: seconds
  description: Delay applied to outlet bank turn-off. Used in CUSTOM SETTINGS mode.
  scope: per-bank (1, 2, 3, 4, HC1, HC2, TRIGOUT)

- id: meter_brightness
  label: Meter / LED Brightness
  type: integer
  min: 10
  max: 100
  unit: percent
  description: Brightness of voltmeter, ammeter, and LEDs.

- id: feedback_mode
  label: Feedback Mode
  type: string
  enum: [ON, OFF]
  description: When ON, unit sends unsolicited state-change messages.

- id: linefeed_mode
  label: Linefeed Mode
  type: string
  enum: [ON, OFF]
  description: When ON, each response is terminated with a linefeed (LF / 0x0A) in addition to CR.
```

## Events
```yaml
- id: outlet_state_changed
  description: An outlet bank or trigger output transitioned state.
  payload: "$BANK{n} = {state}\r"  # or $HC1, $HC2, $TRIGOUT
  trigger: state change, requires feedback_mode=ON

- id: trigger_input_changed
  description: Front panel button or DC input trigger changed state.
  payload: "$BUTTON = {state}\r" or "$TRIGIN = {state}\r"
  trigger: state change, requires feedback_mode=ON

- id: power_fault_overvoltage
  description: Input voltage exceeded the overvoltage threshold.
  payload: "$PWR = OVERVOLTAGE\r"
  trigger: Vin > 140V

- id: power_fault_undervoltage
  description: Input voltage dropped below the undervoltage threshold.
  payload: "$PWR = UNDERVOLTAGE\r"
  trigger: Vin < 90V

- id: power_fault_recovery
  description: Input voltage re-entered safe range after a fault.
  payload: "$PWR = RECOVERY\r"
  trigger: 90V <= Vin <= 140V after fault

- id: power_fault_normal
  description: Recovery completed, normal operation resumed.
  payload: "$PWR = NORMAL\r"
  trigger: post-recovery transition
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# All commands in the source are atomic. UNRESOLVED: not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "!ALL_OFF and !ALL_ON terminate any running turn-on/turn-off sequence and override the DC trigger input."
  - "Over/under-voltage faults abort !ALL_ON and return $PWR = OVERVOLTAGE / UNDERVOLTAGE."
# UNRESOLVED: no explicit safety warnings, no interlock procedures, no power-on sequencing requirements stated in source beyond immediate switch behavior.
```

## Notes
- Source describes only RS-232 on DB9 (no TCP/IP, REST, or other network protocol documented). The "Known protocol" hint (TCP/IP) in the intake did not match the source — spec reflects source.
- All commands and responses are ASCII terminated by CR (0x0D), LF (0x0A), or NULL. SET_LINEFEED controls whether LF is appended to responses.
- DB9 wiring: pin 2 = RX, pin 3 = TX, pin 5 = GND. Null-modem cable not required (suggests the M7500-PRO is already wired as a DTE or uses straight-through to host DTE; see source page 2 for diagram).
- ID response advertises the model string "MAX 74/7500-PRO" — preserved as-is in compatible_with and query_id.
- Factory defaults stored in non-volatile EEPROM are restored by !RESET_ALL.

<!-- UNRESOLVED: firmware version compatibility not stated in source. UNRESOLVED: DC trigger voltage/current ranges (3-24V, 4.6mA@3V, 58mA@24V in, <12V/<400mA out) are documented but are hardware electrical specs, not control-protocol fields — included in Notes context only. -->

## Provenance

```yaml
source_domains:
  - panamax.com
source_urls:
  - https://panamax.com/wp-content/uploads/m7500pro_manual.pdf
retrieved_at: 2026-06-03T11:10:08.022Z
last_checked_at: 2026-06-04T06:28:51.084Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:28:51.084Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec commands matched verbatim in source with correct parameters and transport settings verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "known protocol was given as TCP/IP, but the source document describes only RS-232. No TCP/IP control documented."
- "not applicable."
- "no explicit safety warnings, no interlock procedures, no power-on sequencing requirements stated in source beyond immediate switch behavior."
- "firmware version compatibility not stated in source. UNRESOLVED: DC trigger voltage/current ranges (3-24V, 4.6mA@3V, 58mA@24V in, <12V/<400mA out) are documented but are hardware electrical specs, not control-protocol fields — included in Notes context only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
