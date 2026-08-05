---
spec_id: admin/panamax-mb1500-ups-serial-network
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panamax MB1500-UPS Serial Control Spec"
manufacturer: Panamax
model_family: MB1500-UPS
aliases: []
compatible_with:
  manufacturers:
    - Panamax
  models:
    - MB1500-UPS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - panamax.com
  - s3-us-west-1.amazonaws.com
  - manualshelf.com
source_urls:
  - https://panamax.com/wp-content/uploads/m1500-manual.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/MB1500/pdf_MB1500_manual.pdf
  - https://www.manualshelf.com/manual/panamax/mb-1500-ups/owner-s-manual-english-french.html
retrieved_at: 2026-05-22T08:33:41.342Z
last_checked_at: 2026-07-22T00:39:31.724Z
generated_at: 2026-07-22T00:39:31.724Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP/network control option not confirmed in source; MB1500 may support an optional IP card but no protocol documented"
  - "settable range and set command not documented in source; only default value via RESTORE"
  - "explicit fault/error recovery sequences not stated in source"
  - "optional IP/network control card (BlueBOLT) protocol not documented in this source"
  - "firmware version range compatibility not stated"
  - "fault behavior and error recovery sequences not stated"
  - "high/low voltage thresholds and battery_mode_voltage set commands not documented — only RESTORE defaults known"
  - "AVRBUCK1 bucking percentage — ?OUTPUTSTAT section omits percentage, async section states 15%"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:39:31.724Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec commands matched exactly in source with correct transport parameters; full coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Panamax MB1500-UPS Serial Control Spec

## Summary
Panamax MB1500-UPS is a 1500VA rack-mount UPS with two independently controllable outlet banks (Critical Load / Non-Critical Load) and RS-232 serial control at 2400 baud. The protocol is ASCII-based using plain-text commands terminated with `<CR>`. All commands are documented in the source.

<!-- UNRESOLVED: IP/network control option not confirmed in source; MB1500 may support an optional IP card but no protocol documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # MAIN_ON / MAIN_OFF commands present
- routable        # NCL_ON / NCL_OFF independently control outlet bank 1
- queryable       # ?OUTLETSTAT, ?INPUTVOLTS, ?OUTPUTSTAT, ?LOADSTAT, ?BATTERYSTAT, ?ID commands present
```

## Actions
```yaml
- id: main_on
  label: Main Power On
  kind: action
  command: "MAIN_ON<CR>"
  params: []
  description: Closes AC input relay / turns on inverter; energizes CL outlets. NCL outlets will also close if MAIN relay was already on.
  input_example: "MAIN_ON<CR>"
  output_example: "CL_OUTLETS_ON<CR>" or "LOWBATT<CR>" if low battery prevented switch

- id: main_off
  label: Main Power Off
  kind: action
  command: "MAIN_OFF<CR>"
  params: []
  description: Disconnects AC input relay and turns off inverter; de-energizes all outlets.
  input_example: "MAIN_OFF<CR>"
  output_example: "NCL_OUTLETS_OFF<CR>" then "CL_OUTLETS_OFF<CR>"

- id: ncl_on
  label: Non-Critical Load Outlets On
  kind: action
  command: "NCL_ON<CR>"
  params: []
  description: Closes NCL relay. Only energizes if MAIN relay is already ON.
  input_example: "NCL_ON<CR>"
  output_example: "NCL_OUTLETS_ON<CR>" if MAIN on, else "NCL_OUTLETS_OFF<CR>"

- id: ncl_off
  label: Non-Critical Load Outlets Off
  kind: action
  command: "NCL_OFF<CR>"
  params: []
  description: Opens NCL relay; NCL outlets de-energized.
  input_example: "NCL_OFF<CR>"
  output_example: "NCL_OUTLETS_OFF<CR>"

- id: beep_on
  label: Enable Audible Alarm
  kind: action
  command: "BEEPON<CR>"
  params: []
  description: Enables beeper when running on battery.
  input_example: "BEEPON<CR>"
  output_example: "BEEPISON<CR>"
  default: alarm is OFF

- id: beep_off
  label: Disable Warning Beeper
  kind: action
  command: "BEEPOFF<CR>"
  params: []
  description: Disables beeper when running on battery.
  input_example: "BEEPOFF<CR>"
  output_example: "BEEPISOFF<CR>"

- id: set_battery_threshold
  label: Set Low Battery NCL Shutoff Threshold
  kind: action
  command: "BATTHRESH<SP>{threshold}<CR>"
  params:
    - name: threshold
      type: integer
      description: Battery charge percentage (25-60) below which NCL outlets are de-energized. Sent as two ASCII digits.
      range: [25, 60]
  input_example: "BATTHRESH 40<CR>"
  output_example: "BTHRESH 40<CR>" if valid, "INVALIDCMD<CR>" if out of range

- id: restore_defaults
  label: Restore Default Settings
  kind: action
  command: "RESTORE<CR>"
  params: []
  description: Resets battery threshold to 66%, beeper disabled, high voltage threshold to 147V, low voltage threshold to 88V, battery mode voltage to 120V.
  input_example: "RESTORE<CR>"
  output_example: "DEFAULTSRESTORED<CR>"

- id: query_outlet_status
  label: Request Outlet Status
  kind: query
  command: "?OUTLETSTAT<CR>"
  params: []
  description: Reports current state of CL and NCL outlet banks.
  output_example: "CL_OUTLETS_ON<CR>" / "NCL_OUTLETS_OFF<CR>" (one per bank)

- id: query_input_voltage
  label: Request Input Voltage Level
  kind: query
  command: "?INPUTVOLTS<CR>"
  params: []
  description: Reports UPS input AC voltage.
  output_example: "120 VAC IN<CR>"

- id: query_output_status
  label: Request Output Voltage Status
  kind: query
  command: "?OUTPUTSTAT<CR>"
  params: []
  description: Reports UPS output AC voltage and current power mode.
  output_example: "120 VAC OUT<CR>" or mode token (NORMAL/AVRBOOST1/AVRBOOST2/AVRBUCK1/BATTERY)

- id: query_load_status
  label: Request Load Level Status
  kind: query
  command: "?LOADSTAT<CR>"
  params: []
  description: Reports load percentage on UPS.
  output_example: "42 %LOAD<CR>"

- id: query_battery_status
  label: Request Battery Charge Level Status
  kind: query
  command: "?BATTERYSTAT<CR>"
  params: []
  description: Reports battery charge percentage.
  output_example: "95 %BATTERY<CR>"

- id: query_id
  label: Identify Equipment
  kind: query
  command: "?ID<CR>"
  params: []
  description: Returns manufacturer, model, firmware part number, and revision across four CR-terminated lines.
  output_example: "PANAMAX<CR>" "M1500-UPS<CR>" "FW {partnumber}<CR>" "REV {revision}<CR>"

- id: help
  label: List All Commands and Queries
  kind: query
  command: "HELP<CR>"
  params: []
  description: Returns the full list of supported commands and queries, each CR-terminated.
  output_example: "MAIN_ON<CR>" "MAIN_OFF<CR>" "NCL_ON<CR>" "NCL_OFF<CR>" "BATTHRESH<CR>" "BEEPON<CR>" "BEEPOFF<CR>" "RESTORE<CR>" "?OUTLETSTAT<CR>" "?INPUTVOLTS<CR>" "?OUTPUTSTAT<CR>" "?LOADSTAT<CR>" "?BATTERYSTAT<CR>" "?ID<CR>" "HELP<CR>"
```

## Feedbacks
```yaml
# Acknowledgement and status strings returned by the device over serial.

- id: cl_outlets_on
  label: Critical Load Outlets On
  type: string
  values: ["CL_OUTLETS_ON"]
  description: Sent when CL outlet bank energizes.

- id: cl_outlets_off
  label: Critical Load Outlets Off
  type: string
  values: ["CL_OUTLETS_OFF"]
  description: Sent when CL outlet bank de-energizes.

- id: ncl_outlets_on
  label: Non-Critical Load Outlets On
  type: string
  values: ["NCL_OUTLETS_ON"]
  description: Sent when NCL outlet bank energizes.

- id: ncl_outlets_off
  label: Non-Critical Load Outlets Off
  type: string
  values: ["NCL_OUTLETS_OFF"]
  description: Sent when NCL outlet bank de-energizes.

- id: beepison
  label: Audible Alarm Enabled
  type: string
  values: ["BEEPISON"]
  description: Response to BEEPON command.

- id: beepisoff
  label: Audible Alarm Disabled
  type: string
  values: ["BEEPISOFF"]
  description: Response to BEEPOFF command.

- id: bthresh
  label: Battery Threshold Set
  type: string
  pattern: "BTHRESH<SP>{threshold}"
  description: Confirmation response to valid BATTHRESH command.

- id: defaultsrestored
  label: Defaults Restored
  type: string
  values: ["DEFAULTSRESTORED"]
  description: Response to RESTORE command.

- id: invalidcmd
  label: Invalid Command
  type: string
  values: ["INVALIDCMD"]
  description: Returned when command is not recognized or parameter out of range.

- id: lowbatt
  label: Low Battery Warning
  type: string
  values: ["LOWBATT"]
  description: Sent when battery charge falls below configured threshold.

- id: overvoltage
  label: Overvoltage Condition
  type: string
  values: ["OVERVOLTAGE"]
  description: Sent when input voltage exceeds high voltage failure threshold.

- id: undervoltage
  label: Undervoltage Condition
  type: string
  values: ["UNDERVOLTAGE"]
  description: Sent when input voltage falls below low voltage failure threshold.

- id: power_mode_normal
  label: Normal Power Mode
  type: string
  values: ["NORMAL"]
  description: UPS not in AVR or battery mode.

- id: power_mode_avrboost1
  label: AVR Boost 13%
  type: string
  values: ["AVRBOOST1"]
  description: UPS in AVR mode, boosting voltage by 13%.

- id: power_mode_avrboost2
  label: AVR Boost 26%
  type: string
  values: ["AVRBOOST2"]
  description: UPS in AVR mode, boosting voltage by 26%.

- id: power_mode_avrbuck1
  label: AVR Buck
  type: string
  values: ["AVRBUCK1"]
  description: UPS in AVR mode, bucking (lowering) voltage. Async section of source specifies bucking 15%.

- id: power_mode_battery
  label: Battery Mode
  type: string
  values: ["BATTERY"]
  description: UPS is running on battery.

- id: input_voltage
  label: Input Voltage Reading
  type: string
  pattern: "{volts}<SP>VAC<SP>IN"
  description: Response to ?INPUTVOLTS. {volts} is the input AC voltage in ASCII.

- id: output_voltage
  label: Output Voltage Reading
  type: string
  pattern: "{volts}<SP>VAC<SP>OUT"
  description: Response to ?OUTPUTSTAT when output present. {volts} is the output AC voltage in ASCII. Mode tokens (NORMAL/AVRBOOST1/AVRBOOST2/AVRBUCK1/BATTERY) returned without voltage value per source.

- id: load_level
  label: Load Level Reading
  type: string
  pattern: "{percent}<SP>%LOAD"
  description: Response to ?LOADSTAT. {percent} is load percentage in ASCII.

- id: battery_level
  label: Battery Charge Reading
  type: string
  pattern: "{percent}<SP>%BATTERY"
  description: Response to ?BATTERYSTAT. {percent} is battery charge percentage in ASCII.

- id: id_response
  label: Equipment Identification
  type: string
  pattern: "PANAMAX<CR>M1500-UPS<CR>FW<SP>{partnumber}<CR>REV<SP>{revision}<CR>"
  description: Four-line response to ?ID. Firmware part number and revision values are device-specific.
```

## Variables
```yaml
# Configurable parameters:

- id: battery_threshold
  label: Low Battery NCL Shutoff Threshold
  type: integer
  range: [25, 60]
  default: 66
  unit: "%"
  description: Battery charge level below which NCL outlets are automatically de-energized. Configured via BATTHRESH command (settable range 25-60). Default after RESTORE is 66%, which is outside the settable range - source documents this discrepancy without explanation.

- id: audible_alarm
  label: Audible Alarm
  type: boolean
  default: false
  description: Whether the beeper sounds when running on battery. Enabled via BEEPON, disabled via BEEPOFF.

- id: high_voltage_threshold
  label: High Voltage Failure Threshold
  type: integer
  default: 147
  unit: "V"
  description: Input voltage above which OVERVOLTAGE is triggered. Reset to 147V by RESTORE command.
  # UNRESOLVED: settable range and set command not documented in source; only default value via RESTORE

- id: low_voltage_threshold
  label: Low Voltage Failure Threshold
  type: integer
  default: 88
  unit: "V"
  description: Input voltage below which UNDERVOLTAGE is triggered. Reset to 88V by RESTORE command.
  # UNRESOLVED: settable range and set command not documented in source; only default value via RESTORE

- id: battery_mode_voltage
  label: Battery Mode Voltage
  type: integer
  default: 120
  unit: "V"
  description: Output voltage target when UPS is in battery mode. Reset to 120V by RESTORE command.
  # UNRESOLVED: settable range and set command not documented in source; only default value via RESTORE
```

## Events
```yaml
# Unsolicited status messages sent by the UPS when conditions change:

- id: outlet_status_change
  label: Outlet Bank Status Change
  description: UPS sends CL_OUTLETS_ON/OFF or NCL_OUTLETS_ON/OFF when an outlet bank switches state.
  triggers:
    - condition: CL outlet bank turns on
      value: "CL_OUTLETS_ON"
    - condition: CL outlet bank turns off
      value: "CL_OUTLETS_OFF"
    - condition: NCL outlet bank turns on
      value: "NCL_OUTLETS_ON"
    - condition: NCL outlet bank turns off
      value: "NCL_OUTLETS_OFF"

- id: power_status_change
  label: Power Status Change
  description: UPS sends power mode change messages asynchronously.
  triggers:
    - condition: UPS enters normal mode
      value: "NORMAL"
    - condition: UPS enters AVR boost 13%
      value: "AVRBOOST1"
    - condition: UPS enters AVR boost 26%
      value: "AVRBOOST2"
    - condition: UPS enters AVR buck
      value: "AVRBUCK1"
    - condition: UPS switches to battery
      value: "BATTERY"
    - condition: Battery below threshold
      value: "LOWBATT"
    - condition: Input overvoltage
      value: "OVERVOLTAGE"
    - condition: Input undervoltage
      value: "UNDERVOLTAGE"
```

## Macros
```yaml
# No explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - main_off  # De-energizes all outlets; critical load equipment will lose power
interlocks:
  - NCL outlets cannot be energized unless CL outlets are already on. The NCL relay will not activate if MAIN relay is off, and NCL outlets will automatically de-energize if battery charge falls below the configured threshold (BATTHRESH, default 66%).
  # UNRESOLVED: explicit fault/error recovery sequences not stated in source
```

## Notes
The MB1500-UPS serial protocol is open and fully documented in ASCII. Commands are case-sensitive and terminated with `<CR>` (0x0D). All responses are also `<CR>`-terminated. Query commands are prefixed with `?`. HELP command lists all available commands. The device identifies as `PANAMAX`, `M1500-UPS` with firmware part number and revision via `?ID`. `<SP>` denotes ASCII space (0x20) in the documented payloads.

<!-- UNRESOLVED: optional IP/network control card (BlueBOLT) protocol not documented in this source -->
<!-- UNRESOLVED: firmware version range compatibility not stated -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated -->
<!-- UNRESOLVED: high/low voltage thresholds and battery_mode_voltage set commands not documented — only RESTORE defaults known -->
<!-- UNRESOLVED: AVRBUCK1 bucking percentage — ?OUTPUTSTAT section omits percentage, async section states 15% -->

Upgrade done. Adds vs on-disk:

- **+7 actions**: `query_outlet_status`, `query_input_voltage`, `query_output_status`, `query_load_status`, `query_battery_status`, `query_id`, `help`
- **+5 feedbacks**: `input_voltage`, `output_voltage`, `load_level`, `battery_level`, `id_response`
- **+1 variable**: `battery_mode_voltage`
- **`command:` field** added to all actions (policy-mandated, payload verbatim)
- Preserved all existing IDs, shapes, descriptions
- Flagged source discrepancy: AVRBUCK1 buck % differs between sections

## Provenance

```yaml
source_domains:
  - panamax.com
  - s3-us-west-1.amazonaws.com
  - manualshelf.com
source_urls:
  - https://panamax.com/wp-content/uploads/m1500-manual.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/MB1500/pdf_MB1500_manual.pdf
  - https://www.manualshelf.com/manual/panamax/mb-1500-ups/owner-s-manual-english-french.html
retrieved_at: 2026-05-22T08:33:41.342Z
last_checked_at: 2026-07-22T00:39:31.724Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:39:31.724Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec commands matched exactly in source with correct transport parameters; full coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP/network control option not confirmed in source; MB1500 may support an optional IP card but no protocol documented"
- "settable range and set command not documented in source; only default value via RESTORE"
- "explicit fault/error recovery sequences not stated in source"
- "optional IP/network control card (BlueBOLT) protocol not documented in this source"
- "firmware version range compatibility not stated"
- "fault behavior and error recovery sequences not stated"
- "high/low voltage thresholds and battery_mode_voltage set commands not documented — only RESTORE defaults known"
- "AVRBUCK1 bucking percentage — ?OUTPUTSTAT section omits percentage, async section states 15%"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
