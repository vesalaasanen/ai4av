---
schema_version: ai4av-public-spec-v1
device_id: apc/apc-switched-rack-pdu
entity_id: apc_pdu
spec_id: admin/apc-switched-rack-pdu
revision: 1
author: admin
title: "Apc Switched Rack PDU Control Spec"
status: published
manufacturer: Apc
manufacturer_key: apc
model_family: "APC Switched Rack PDU"
aliases: []
compatible_with:
  manufacturers:
    - Apc
  models:
    - "APC Switched Rack PDU"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: apc_pdu.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-22T22:08:06.722Z
retrieved_at: 2026-04-22T22:08:06.722Z
last_checked_at: 2026-04-22T22:08:06.722Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-22T22:08:06.722Z
  matched_actions: 35
  action_count: 35
  confidence: high
  summary: "All 35 spec actions matched literally in the source document with correct syntax, parameters, and transport details verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Apc Switched Rack PDU Control Spec

## Summary
APC Switched Rack PDU with CLI control via Telnet, SSH v1/v2, or serial. Controls individual outlet power (on/off/reboot), monitors current draw and power usage, and manages user outlet access. Three account types: Administrator, Device Manager, and Outlet User.

<!-- UNRESOLVED: TCP port numbers not stated in source. Serial data bits/parity/stop bits not fully specified. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port numbers not stated in source
serial:
  baud_rate: 9600  # stated: "Serial default baud rate: 9600"
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: userpass  # stated: username and password required for log-on
```

## Traits
```yaml
- powerable       # on, off, reboot commands present
- routable        # assign/unassign outlet access commands present
- queryable       # status, current, power, ver commands present
- levelable       # powerondelay, poweroffdelay, rebootduration present
```

## Actions
```yaml
- id: off
  label: Turn Off Outlets
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number, range (e.g. "1,5-7"), name, or "all"
    - name: outlets
      type: string
      description: Additional outlets/ranges separated by commas

- id: on
  label: Turn On Outlets
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number, range (e.g. "1,5-7"), name, or "all"
    - name: outlets
      type: string
      description: Additional outlets/ranges separated by commas

- id: reboot
  label: Reboot Outlets
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number, range (e.g. "1,5-7"), name, or "all"
    - name: outlets
      type: string
      description: Additional outlets/ranges separated by commas

- id: poweroffdelay
  label: Set Power-Off Delay
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number or range
    - name: time
      type: integer
      description: Delay in seconds, or "never" to keep outlets on
    - name: outlets
      type: string
      description: Additional outlets/ranges

- id: powerondelay
  label: Set Power-On Delay
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number or range
    - name: time
      type: integer
      description: Delay in seconds, or "never" to keep outlets off
    - name: outlets
      type: string
      description: Additional outlets/ranges

- id: rebootduration
  label: Set Reboot Duration
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number or range
    - name: time
      type: integer
      description: Duration in seconds outlet remains off before restarting

- id: adduser
  label: Add User
  kind: action
  params:
    - name: user_name
      type: string
      description: User name (1-10 printable ASCII characters)

- id: deluser
  label: Delete User
  kind: action
  params:
    - name: user_name
      type: string
      description: User name to delete

- id: assign
  label: Assign Outlets to User
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number, range, or comma-separated list
    - name: user_name
      type: string
      description: User name to grant access to

- id: unassign
  label: Unassign Outlets from User
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number, range, or comma-separated list
    - name: user_name
      type: string
      description: User name to remove access from

- id: passwd
  label: Change Password
  kind: action
  params:
    - name: user_name
      type: string
      description: User name (omit to change own password, requires admin to change others)

- id: name
  label: Set Outlet or System Name
  kind: action
  params:
    - name: outlet
      type: string
      description: Outlet number or "master" for system name
    - name: new_name
      type: string
      description: Name to assign (up to 23 printable ASCII characters)

- id: lowloadwarning
  label: Set Low-Load Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), defaults to 1
    - name: current
      type: number
      description: Threshold in amps

- id: nearoverloadwarning
  label: Set Near-Overload Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), defaults to 1
    - name: current
      type: number
      description: Threshold in amps

- id: overloadalarm
  label: Set Overload Alarm Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), defaults to 1
    - name: current
      type: number
      description: Threshold in amps

- id: overloadrestriction
  label: Set Overload Restriction
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), defaults to 1
    - name: setting
      type: string
      enum: [on, off]
      description: "on" prevents outlets from turning on during overload alarm violation

- id: pducoldstartdelay
  label: Set PDU Cold-Start Delay
  kind: action
  params:
    - name: time
      type: integer
      description: Delay in seconds (0-300), or "never" to keep outlets off until explicitly turned on

- id: reset_defaults_pdu
  label: Reset PDU to Defaults
  kind: action
  params: []

- id: uploadini
  label: Upload INI File via XMODEM
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: status
  label: Outlet Status
  kind: feedback
  params:
    - name: outlet
      type: string
      description: Outlet number, range, or comma-separated list
  output:
    format: "{outlet_number}:{ON|OFF*}:{outlet_name}"
    example: "1:ON:Database Server"
  notes: Trailing asterisk (*) indicates control action pending

- id: current
  label: Total Current Draw
  kind: feedback
  params: []
  output:
    format: "{current} A"
    example: "12.5 A"
    three_phase_format: "T1: {current} A\nT2: {current} A\nT3: {current} A"

- id: power
  label: Power Usage
  kind: feedback
  params: []
  output:
    format: "{volt_amps} VA {watts} W"
    example: "1200 VA 1100 W"

- id: poweroffdelay
  label: Power-Off Delay Setting
  kind: feedback
  params:
    - name: outlet
      type: string
      description: Outlet number or range (omit to read all accessible outlets)
  output:
    format: "{outlet_number} : {outlet_name} : Power off delay is {time} seconds."

- id: powerondelay
  label: Power-On Delay Setting
  kind: feedback
  params:
    - name: outlet
      type: string
      description: Outlet number or range (omit to read all accessible outlets)
  output:
    format: "{outlet_number} : {outlet_name} : Power on delay is {time} seconds."

- id: rebootduration
  label: Reboot Duration Setting
  kind: feedback
  params:
    - name: outlet
      type: string
      description: Outlet number or range (omit to read all accessible outlets)
  output:
    format: "{outlet_number} : {outlet_name} : Reboot duration is {time} seconds."

- id: outletgroups
  label: Outlet Synchronization Groups
  kind: feedback
  params: []
  output:
    format: "{group_name} : {local_pdu_ip} Outlets: {numbers...} {remote_pdu_ip} Outlets: {numbers...}"

- id: list
  label: User and Outlet List
  kind: feedback
  params: []
  output:
    format: "OK {user_type}: {user_name}: {outlet_numbers...}"
    example: "OK Local: admin: 1,2,3,4,5,6,7,8"

- id: whoami
  label: Active User Name
  kind: feedback
  params: []
  output:
    format: "{active_user_name}"

- id: lowloadwarning
  label: Low-Load Warning Threshold
  kind: feedback
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), omit to read all
  output:
    format: "Low load warning threshold is {current} A."

- id: nearoverloadwarning
  label: Near-Overload Warning Threshold
  kind: feedback
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), omit to read all
  output:
    format: "Near overload warning threshold is {current} A."

- id: overloadalarm
  label: Overload Alarm Threshold
  kind: feedback
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), omit to read all
  output:
    format: "Overload alarm threshold for {phase_number} is {current} A."

- id: overloadrestriction
  label: Overload Restriction Setting
  kind: feedback
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3), omit to read phase 1
  output:
    format: "Overload restriction is {setting} for {phase_number}."

- id: pducoldstartdelay
  label: PDU Cold-Start Delay
  kind: feedback
  params: []
  output:
    format: "{pdu_name}: PDU coldstart delay is {time} seconds."

- id: ver
  label: Device Information
  kind: feedback
  params: []
  output:
    format: "APC OS {aos_version} Switched Rack PDU {pdu_version} Model: {model} Outlets: {count} Max Current: {max} A Input Type: {phase_config}"
    example: "APC OS 5.1.6 Switched Rack PDU 3.9.4 Model: AP8941 Outlets: 24 Max Current: 30 A Input Type: 3 Phase"
  notes: phase_config is Single, Banked, or 3 Phase

- id: help
  label: CLI Help
  kind: feedback
  params:
    - name: command
      type: string
      description: Command name (omit to list all available commands)
  output:
    format: "{command_syntax} {help_text}"
    all_commands_format: "{command} : {command} : {command} : {command}"
```

## Variables
```yaml
- id: poweroffdelay_value
  label: Power-Off Delay
  type: integer
  unit: seconds
  description: Time PDU waits before restoring power to an outlet after off command

- id: powerondelay_value
  label: Power-On Delay
  type: integer
  unit: seconds
  description: Time PDU waits before restoring power to an outlet after on command

- id: rebootduration_value
  label: Reboot Duration
  type: integer
  unit: seconds
  description: Time an outlet remains off before restarting during reboot

- id: lowloadwarning_threshold
  label: Low-Load Warning Threshold
  type: number
  unit: amps
  per_phase: true

- id: nearoverloadwarning_threshold
  label: Near-Overload Warning Threshold
  type: number
  unit: amps
  per_phase: true

- id: overloadalarm_threshold
  label: Overload Alarm Threshold
  type: number
  unit: amps
  per_phase: true

- id: overloadrestriction_value
  label: Overload Restriction
  type: enum
  values: [on, off]
  per_phase: true
  description: When on, prevents outlets from turning on while overload alarm threshold is violated

- id: pducoldstartdelay_value
  label: PDU Cold-Start Delay
  type: integer
  unit: seconds
  range: [0, 300]
  description: Time PDU delays applying power to outlets after AC power applied
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from the device
```

## Macros
```yaml
# UNRESOLVED: source does not describe explicit multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - off          # Power loss to connected equipment
  - on           # Power restore to equipment
  - reboot       # Power cycle to equipment
  - reset_defaults_pdu  # Configuration reset
interlocks:
  - overloadrestriction: When set to on, prevents outlets from turning on while overload alarm threshold is violated (per phase)
# UNRESOLVED: no explicit interlock procedures or safety warnings in source beyond overload restriction behavior
```

## Notes
Log-on required: username + password. After three consecutive failed attempts, further attempts blocked for 2 minutes. Inactivity logout defaults to 3 minutes (configurable 1-10 minutes). CLI commands are case-insensitive for keywords, case-sensitive for arguments. Space is the command delimiter; extra spaces ignored. String arguments containing spaces, commas, or semicolons must be enclosed in quotation marks. Error format: `E[0-9][0-9][0-9]: Error message`. Success format: `OK` followed by command output.

<!-- UNRESOLVED: TCP port numbers for Telnet/SSH not stated. Serial data bits, parity, stop bits not fully specified beyond 9600 baud. No information about unsolicited event notifications. No explicit macro definitions in source. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: apc_pdu.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-22T22:08:06.722Z
retrieved_at: 2026-04-22T22:08:06.722Z
last_checked_at: 2026-04-22T22:08:06.722Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T22:08:06.722Z
matched_actions: 35
action_count: 35
confidence: high
summary: "All 35 spec actions matched literally in the source document with correct syntax, parameters, and transport details verified."
```

## Known Gaps

```yaml
[]
```
