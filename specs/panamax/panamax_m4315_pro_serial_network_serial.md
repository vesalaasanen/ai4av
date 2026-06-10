---
spec_id: admin/panamax-m4315-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panamax M4315-PRO Control Spec"
manufacturer: Panamax
model_family: M4315-PRO
aliases: []
compatible_with:
  manufacturers:
    - Panamax
  models:
    - M4315-PRO
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - panamax.com
source_urls:
  - https://panamax.com/wp-content/uploads/Nice-Panamax-M4315-PRO-User-Guide.pdf
retrieved_at: 2026-05-21T16:03:29.791Z
last_checked_at: 2026-06-10T00:12:12.431Z
generated_at: 2026-06-10T00:12:12.431Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "#CYCLE command only available via Telnet+BlueBOLT-CV3, not RS-232. Serial baud/config not stated in source."
  - "serial baud rate not stated in source"
  - "no explicit multi-step macros described in source"
  - "serial RS-232 baud rate, data bits, parity, stop bits not stated in source. UDP/HTTP command sets not detailed in source. Firmware version stated in ?ID response but revision string not extracted. Overvoltage/undervoltage threshold values not stated."
verification:
  verdict: verified
  checked_at: 2026-06-10T00:12:12.431Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched literally in source; complete command coverage with no additional commands in source not represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Panamax M4315-PRO Control Spec

## Summary
Power management unit with 8 outlets. Supports TCP (Telnet port 23, HTTP port 80), UDP (port 57010 via BlueBOLT-CV3), and RS-232 serial control. Controls outlet on/off, trigger assignment, turn on/off delays, reboot cycling, and monitors voltage, current, and fault status.

<!-- UNRESOLVED: #CYCLE command only available via Telnet+BlueBOLT-CV3, not RS-232. Serial baud/config not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet default; stated in source "Telnet (default port 23)"
serial:
  baud_rate: null  # UNRESOLVED: serial baud rate not stated in source
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: green_button
  label: Green Button
  kind: action
  params: []
- id: reboot_1
  label: Reboot 1
  kind: action
  params: []
- id: reboot_2
  label: Reboot 2
  kind: action
  params: []
- id: all_off
  label: All Off
  kind: action
  params: []
- id: all_on
  label: All On
  kind: action
  params: []
- id: switch_outlet
  label: Switch Outlet
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number {1..8}
    - name: state
      type: string
      enum: [ON, OFF]
      description: Desired state
- id: set_trigger
  label: Set Trigger
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number {1..8}
    - name: triggersource
      type: string
      enum: [NONE, BUTTON_1, BUTTON_2, BUTTON_GREEN, TRIGIN]
      description: Trigger source
- id: set_reboot_delay
  label: Set Reboot Delay
  kind: action
  params:
    - name: button_1
      type: integer
      description: Button 1 delay {1-255 seconds}
    - name: button_2
      type: integer
      description: Button 2 delay {1-255 seconds}
- id: set_delay
  label: Set Delay
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number {1..8}
    - name: ondelay
      type: integer
      description: Turn-on delay {0-255 seconds}
    - name: offdelay
      type: integer
      description: Turn-off delay {0-255 seconds}
- id: set_feedback_mode
  label: Set Feedback Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [ON, OFF]
      description: Unsolicited feedback mode
- id: set_linefeed_mode
  label: Set Linefeed Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [ON, OFF]
      description: Linefeed mode
- id: reset_factory_settings
  label: Reset Factory Settings
  kind: action
  params: []
- id: set_profile
  label: Set Profile
  kind: action
  params:
    - name: n
      type: integer
      description: Profile number {1,2,3,4}
- id: cycle_outlet
  label: Cycle Outlet
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number {1..8}
    - name: delay
      type: integer
      description: Delay in seconds {1-65535}
  note: "Only available via Telnet+BlueBOLT-CV3, not RS-232"
- id: query_id
  label: Query Identity
  kind: query
  params: []
- id: query_fault_status
  label: Query Fault Status
  kind: query
  params: []
- id: query_power_status
  label: Query Power Status
  kind: query
  params: []
- id: query_voltage
  label: Query Voltage
  kind: query
  params: []
- id: query_current
  label: Query Current
  kind: query
  params: []
- id: query_help
  label: Query Help
  kind: query
  params: []
- id: query_list_config
  label: Query List Config
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: outlet_status
  type: enum
  values: [ON, OFF]
  description: "Format: $OUTLETn = status, n={1..8}"
- id: power_status
  type: enum
  values: [ON, OFF, OVERVOLTAGE, UNDERVOLTAGE, RECOVERY, NORMAL]
  description: "Format: $PWR = status"
- id: breaker_status
  type: enum
  values: [FAULT, OK]
  description: "Format: $BREAKER = status"
- id: wire_fault_status
  type: enum
  values: [FAULT, OK]
  description: "Format: $WIRE FAULT = status"
- id: temperature_status
  type: enum
  values: [FAULT, OK]
  description: "Format: $TEMPERATURE = status"
- id: button_1_triggered
  type: enum
  values: [TRIGGERED]
  description: "Format: $BUTTON_1 = TRIGGERED"
- id: button_2_triggered
  type: enum
  values: [TRIGGERED]
  description: "Format: $BUTTON_2 = TRIGGERED"
- id: trigin_status
  type: enum
  values: [ON, OFF]
  description: "Format: $TRIGIN = status"
- id: green_mode_status
  type: enum
  values: [ON, OFF]
  description: "Format: $GREEN MODE = status"
- id: feedback_mode
  type: enum
  values: [ON, OFF]
  description: "Format: $FEEDBACK = mode"
- id: linefeed_mode
  type: enum
  values: [ON, OFF]
  description: "Format: $LINEFEED = mode"
- id: factory_settings_restored
  type: string
  description: "Format: $FACTORY SETTINGS RESTORED"
- id: profile_selected
  type: string
  description: "Format: $PROFILE n SELECTED"
- id: invalid_parameter
  type: string
  description: "Format: $INVALID_PARAMETER"
```

## Variables
```yaml
- id: voltage
  type: integer
  description: "Input line voltage in decimal format. Format: $VOLTAGE = xxx"
- id: current
  type: integer
  description: "Input current in decimal format (xxx = current * 10). Format: $CURRENT = xxx"
- id: delay_for_outlet
  type: string
  description: "Format: $DELAY FOR n = ondelay,offdelay"
- id: trigger_for_outlet
  type: string
  description: "Format: $TRIGGER FOR n = triggersource"
- id: reboot_delay_1
  type: integer
  description: "Format: $REBOOT_DELAY1 = seconds"
- id: reboot_delay_2
  type: integer
  description: "Format: $REBOOT_DELAY2 = seconds"
- id: profile_number
  type: integer
  description: "Format: $PROFILE = n"
```

## Events
```yaml
- id: outlet_status_change
  description: "Sent when outlet changes state. Format: $OUTLETn = status. n={1..8}, status={ON,OFF}"
- id: trigger_status_change
  description: "Sent when trigger or button changes state. Formats: $BUTTON_1 = TRIGGERED, $BUTTON_2 = TRIGGERED, $TRIGIN = ON/OFF, $GREEN MODE = ON/OFF"
- id: overvoltage_event
  description: "Sent when input voltage exceeds overvoltage threshold. Format: $PWR = OVERVOLTAGE"
- id: undervoltage_event
  description: "Sent when input voltage falls below undervoltage threshold. Format: $PWR = UNDERVOLTAGE"
- id: recovery_event
  description: "Sent when voltage returns to safe range after fault. Format: $PWR = RECOVERY"
- id: normal_event
  description: "Sent when leaving recovery mode. Format: $PWR = NORMAL"
- id: breaker_fault_event
  description: "Sent when breaker status changes. Format: $BREAKER = status"
- id: wire_fault_event
  description: "Sent when wire fault detected. Format: $WIRE FAULT = status"
- id: temperature_fault_event
  description: "Sent when temperature exceeds safe limit. Format: $TEMPERATURE = status"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
RS-232 serial config (baud, parity, stop bits) not stated in source. #CYCLE command only available over Telnet with BlueBOLT-CV3 interface, not supported over serial RS-232 connection. UDP and HTTP interfaces mentioned (ports 57010 and 80 respectively) but full command sets not detailed in this source; referenced to BlueBOLT-CV3 user manual at Niceforyou.com. All messages terminated with CR (0Dh). Commands start with !, queries with ?, responses with $. Command prompt is >. Message buffer truncates at 32 characters.
<!-- UNRESOLVED: serial RS-232 baud rate, data bits, parity, stop bits not stated in source. UDP/HTTP command sets not detailed in source. Firmware version stated in ?ID response but revision string not extracted. Overvoltage/undervoltage threshold values not stated. -->

## Provenance

```yaml
source_domains:
  - panamax.com
source_urls:
  - https://panamax.com/wp-content/uploads/Nice-Panamax-M4315-PRO-User-Guide.pdf
retrieved_at: 2026-05-21T16:03:29.791Z
last_checked_at: 2026-06-10T00:12:12.431Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:12:12.431Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched literally in source; complete command coverage with no additional commands in source not represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "#CYCLE command only available via Telnet+BlueBOLT-CV3, not RS-232. Serial baud/config not stated in source."
- "serial baud rate not stated in source"
- "no explicit multi-step macros described in source"
- "serial RS-232 baud rate, data bits, parity, stop bits not stated in source. UDP/HTTP command sets not detailed in source. Firmware version stated in ?ID response but revision string not extracted. Overvoltage/undervoltage threshold values not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
