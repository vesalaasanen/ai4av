---
spec_id: admin/apc-ap8931
schema_version: ai4av-public-spec-v1
revision: 1
title: "APC AP8931 Switched Rack PDU Control Spec"
manufacturer: APC
model_family: AP8931
aliases: []
compatible_with:
  manufacturers:
    - APC
  models:
    - AP8931
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - iportal.se.com
  - manuals.zedt.eu
  - manualmachine.com
  - mouser.com
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
  - https://iportal.se.com/Contents/docs/UPS-PMAR-9LLM9N_R1_EN.PDF
  - http://manuals.zedt.eu/apc-sua-ups/UPS-Link_Protocol_Specification.pdf
  - https://manualmachine.com/apc/ap8941/392271-user-manual/
  - https://www.mouser.com/datasheet/3/187/8/AP8931_document.pdf
retrieved_at: 2026-05-14T10:59:22.676Z
last_checked_at: 2026-06-02T17:21:14.265Z
generated_at: 2026-06-02T17:21:14.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port numbers for Telnet/SSH not stated in source. Serial data bits / parity / stop bits / flow control not stated."
  - "Telnet and SSH TCP port numbers not stated in source"
  - "port number not stated in source"
  - "data_bits, parity, stop_bits, flow_control not stated in source"
  - "no CLI command shown in source to read or set this value; presumably configured via web UI."
  - "source does not describe unsolicited notifications the PDU sends."
  - "source does not describe multi-step macro sequences. The CLI"
  - "voltage/current/power specifications not stated in source. No"
  - "TCP port numbers for Telnet/SSH not stated in source (do not assume 22/23). Serial data bits, parity, stop bits, flow control not stated (do not assume 8N1). Firmware version compatibility range not stated. Source does not document unsolicited event notifications or macro scripting. The `current` command may be unsupported on AP8931 per source note."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:14.265Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# APC AP8931 Switched Rack PDU Control Spec

## Summary
The APC AP8931 is a NetShelter Switched Rack PDU providing eight NEMA 5-15 outlets with individual switching, current monitoring, and remote management. This spec covers the CLI command interface, which is accessible via Telnet, SSH (v1 or v2), or serial connection at 9600 baud. Authenticated users can switch outlets on/off, reboot them, query status and power readings, manage local user accounts, and configure alarm thresholds.

<!-- UNRESOLVED: TCP port numbers for Telnet/SSH not stated in source. Serial data bits / parity / stop bits / flow control not stated. -->

## Transport
```yaml
protocols:
  - tcp      # Telnet and SSH v1/v2
  - serial   # RS-232 console
# UNRESOLVED: Telnet and SSH TCP port numbers not stated in source
addressing:
  port: null  # UNRESOLVED: port number not stated in source
serial:
  baud_rate: 9600
  # UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source
auth:
  type: password  # source requires user name and password at log-on
  prompt:
    user: "User Name"
    password: "Password"
  notes: "Append space + -c to password when not using a KVM. Three failed attempts lock further log-on for two minutes. Default inactivity logout 3 minutes (configurable 1-10)."
```

## Traits
```yaml
- powerable       # on/off/reboot commands per outlet
- routable        # outlet status query, outlet group listing
- queryable       # current, power, status, ver queries
```

## Actions
```yaml
- id: adduser
  label: Add Outlet User
  kind: action
  command: "adduser {user_name}"
  params:
    - name: user_name
      type: string
      description: 1-10 printable ASCII characters
  access: Administrator
  notes: Prompts for password interactively; returns `OK Password: _password_ Re-enter password: _password_ User name and password set for user _user_name_.`

- id: assign
  label: Assign Outlets to User
  kind: action
  command: "assign {outlet_or_range}[,{outlet_or_range} ...] {user_name}"
  params:
    - name: outlet_or_range
      type: string
      description: Outlet number, name, or hyphen-separated range (e.g. 1-3,5,7)
    - name: user_name
      type: string
      description: Outlet user configured in local database
  access: Administrator

- id: deluser
  label: Delete Outlet User
  kind: action
  command: "deluser {user_name}"
  params:
    - name: user_name
      type: string
      description: 1-10 printable ASCII characters
  access: Administrator

- id: passwd
  label: Change Password
  kind: action
  command: "passwd [{user_name}]"
  params:
    - name: user_name
      type: string
      description: Optional. Omit to change own password; admin only may specify other user
  access: All account types (self) / Administrator (other)
  notes: Prompts interactively for new password; 1-10 printable ASCII characters.

- id: unassign
  label: Unassign Outlets from User
  kind: action
  command: "unassign {outlet_or_range}[,{outlet_or_range} ...] {user_name}"
  params:
    - name: outlet_or_range
      type: string
      description: Outlet number, name, or hyphen-separated range
    - name: user_name
      type: string
      description: Outlet user configured in local database
  access: Administrator

- id: whoami
  label: Who Am I
  kind: query
  command: "whoami"
  params: []

- id: off
  label: Turn Outlet(s) Off
  kind: action
  command: "off {all|outlet_or_range}[,{outlet_or_range} ...]"
  params:
    - name: target
      type: string
      description: '`all` or outlet number/name/range (e.g. 1,5-7 or "Web Server")'
  access: Outlet user with assigned outlets

- id: on
  label: Turn Outlet(s) On
  kind: action
  command: "on {all|outlet_or_range}[,{outlet_or_range} ...]"
  params:
    - name: target
      type: string
      description: '`all` or outlet number/name/range (e.g. 1,5-7 or "Web Server")'
  access: Outlet user with assigned outlets

- id: outletgroups
  label: List Outlet Sync Groups
  kind: query
  command: "outletgroups"
  params: []

- id: poweroffdelay_read
  label: Read Power-Off Delay
  kind: query
  command: "poweroffdelay [{outlet_or_range}[,{outlet_or_range} ...]]"
  params:
    - name: target
      type: string
      description: Optional. Outlet number/name/range; omit to read all accessible outlets.

- id: poweroffdelay_set
  label: Set Power-Off Delay
  kind: action
  command: "poweroffdelay {outlet_or_range}[,{outlet_or_range} ...] {time|never}"
  params:
    - name: target
      type: string
      description: Outlet number/name/range
    - name: time
      type: string
      description: Delay in seconds, or `never` to keep outlet on
  access: Outlet user with assigned outlets

- id: powerondelay_read
  label: Read Power-On Delay
  kind: query
  command: "powerondelay [{outlet_or_range}[,{outlet_or_range} ...]]"
  params:
    - name: target
      type: string
      description: Optional. Outlet number/name/range; omit to read all accessible outlets.

- id: powerondelay_set
  label: Set Power-On Delay
  kind: action
  command: "powerondelay {outlet_or_range}[,{outlet_or_range} ...] {time|never}"
  params:
    - name: target
      type: string
      description: Outlet number/name/range
    - name: time
      type: string
      description: Delay in seconds, or `never` to keep outlet off
  access: Outlet user with assigned outlets

- id: reboot
  label: Reboot Outlet(s)
  kind: action
  command: "reboot {all|outlet_or_range}[,{outlet_or_range} ...]"
  params:
    - name: target
      type: string
      description: '`all` or outlet number/name/range'
  access: Outlet user with assigned outlets
  notes: Removes then restores power. CLI does not wait for completion.

- id: rebootduration_read
  label: Read Reboot Duration
  kind: query
  command: "rebootduration [{outlet_or_range}[,{outlet_or_range} ...]]"
  params:
    - name: target
      type: string
      description: Optional. Outlet number/name/range; omit to read all accessible outlets.

- id: rebootduration_set
  label: Set Reboot Duration
  kind: action
  command: "rebootduration {outlet_or_range}[,{outlet_or_range} ...]: {time}"
  params:
    - name: target
      type: string
      description: Outlet number/name/range, colon-separated from time
    - name: time
      type: integer
      description: Seconds the outlet remains off before restarting
  access: Outlet user with assigned outlets

- id: status
  label: Outlet Status
  kind: query
  command: "status {outlet_or_range}[,{outlet_or_range} ...]"
  params:
    - name: target
      type: string
      description: Outlet number/name/range
  notes: Output line format `_outlet_number_ : _outlet_status_ : _outlet_name_`. Trailing `*` on status indicates pending control action.

- id: current
  label: Total Current Draw
  kind: query
  command: "current"
  params: []
  notes: Single-phase/banked PDU output: `_current_ A`. 3-phase PDU output: `T1: _current_ A / T2: _current_ A / T3: _current_ A`. Source notes "the Switched Rack PDU does not track its total current draw" - command may not be supported on this model.

- id: list
  label: List Users and Outlet Assignments
  kind: query
  command: "list"
  params: []
  access: Administrator, device manager, outlet user

- id: lowloadwarning_read
  label: Read Low-Load Warning Threshold
  kind: query
  command: "lowloadwarning [{phase_number}]"
  params:
    - name: phase_number
      type: integer
      description: Optional. 1, 2, or 3. Default 1.

- id: lowloadwarning_set
  label: Set Low-Load Warning Threshold
  kind: action
  command: "lowloadwarning {phase_number} {current}"
  params:
    - name: phase_number
      type: integer
      description: 1, 2, or 3
    - name: current
      type: number
      description: Threshold in amps
  access: Administrator or device manager

- id: name
  label: Assign Name to Outlet or PDU
  kind: action
  command: "name {outlet|master} {new_name}"
  params:
    - name: target
      type: string
      description: 'Outlet number, or the string `master` to set the PDU system name'
    - name: new_name
      type: string
      description: Up to 23 printable ASCII characters; quote if contains spaces
  access: Administrator or device manager

- id: nearoverloadwarning_read
  label: Read Near-Overload Warning Threshold
  kind: query
  command: "nearoverloadwarning [{phase_number}]"
  params:
    - name: phase_number
      type: integer
      description: Optional. 1, 2, or 3. Default 1.

- id: nearoverloadwarning_set
  label: Set Near-Overload Warning Threshold
  kind: action
  command: "nearoverloadwarning {phase_number} {current}"
  params:
    - name: phase_number
      type: integer
      description: 1, 2, or 3
    - name: current
      type: number
      description: Threshold in amps
  access: Administrator or device manager

- id: overloadalarm_read
  label: Read Overload Alarm Threshold
  kind: query
  command: "overloadalarm [{phase_number}]"
  params:
    - name: phase_number
      type: integer
      description: Optional. 1, 2, or 3. Default 1.

- id: overloadalarm_set
  label: Set Overload Alarm Threshold
  kind: action
  command: "overloadalarm {phase_number} {current}"
  params:
    - name: phase_number
      type: integer
      description: 1, 2, or 3
    - name: current
      type: number
      description: Threshold in amps
  access: Administrator or device manager

- id: overloadrestriction_read
  label: Read Overload Restriction
  kind: query
  command: "overloadrestriction [{phase_number}]"
  params:
    - name: phase_number
      type: integer
      description: Optional. 1, 2, or 3. Default 1.

- id: overloadrestriction_set
  label: Set Overload Restriction
  kind: action
  command: "overloadrestriction {phase_number} {setting}"
  params:
    - name: phase_number
      type: integer
      description: 1, 2, or 3
    - name: setting
      type: string
      description: '`on` or `off` (not case-sensitive). When `on`, prevents outlets from turning on while overload threshold is violated.'
  access: Administrator or device manager

- id: pducoldstartdelay_read
  label: Read PDU Cold-Start Delay
  kind: query
  command: "pducoldstartdelay"
  params: []

- id: pducoldstartdelay_set
  label: Set PDU Cold-Start Delay
  kind: action
  command: "pducoldstartdelay {time|never}"
  params:
    - name: time
      type: string
      description: Seconds (0-300), or `never` to keep outlets off until explicit `on` command
  access: Administrator or device manager

- id: power
  label: Total Power Usage
  kind: query
  command: "power"
  params: []
  notes: Output `_power_in_volt-amps_ VA _power_in_watts_ W`.

- id: exit
  label: Exit CLI
  kind: action
  command: "{exit|logout|logoff|quit|bye}"
  params: []

- id: help
  label: CLI Help
  kind: query
  command: "help|? [{command}]"
  params:
    - name: command
      type: string
      description: Optional. Command name; omit to list all available commands.

- id: reset_defaults_pdu
  label: Reset PDU Defaults
  kind: action
  command: "reset_defaults_pdu"
  params: []
  access: Administrator
  notes: Resets only PDU and outlet configuration to defaults.

- id: uploadini
  label: Upload INI via XMODEM
  kind: action
  command: "uploadini"
  params: []
  access: Administrator or device manager
  notes: Serial-only. XMODEM-CRC transfer. Offered baud rates: 2400, 9600, 19200, 38400. After upload with non-default baud, reset PDU baud to default 9600.

- id: ver
  label: Device Version Info
  kind: query
  command: "ver"
  params: []
  notes: Output `APC OS _AOS_firmware_version_ Switched Rack PDU _PDU_firmware_version_ Model: _model_number_ Outlets: _number_of_outlets_ Max Current: _maximum_load_current_ A Input Type: _phase_configuration_`.
```

## Feedbacks
```yaml
- id: outlet_status
  type: enum
  values: [on, off, "on*", "off*"]
  description: From `status` command. Trailing `*` indicates a control action is pending.
  source_line: "1:ON:Database Server"

- id: outlet_status_lines
  type: object
  fields:
    - outlet_number
    - outlet_status
    - outlet_name
  description: One line per outlet from `status` query.

- id: current_draw
  type: object
  description: Total current draw from `current` command. Single-phase/banked: `_current_ A`. 3-phase: `T1`, `T2`, `T3` per-phase amps.

- id: power_usage
  type: string
  description: From `power` command. Format: `_power_in_volt-amps_ VA _power_in_watts_ W`.

- id: whoami_user
  type: string
  description: Active user name from `whoami` command.

- id: version_info
  type: object
  fields:
    - aos_firmware_version
    - pdu_firmware_version
    - model_number
    - number_of_outlets
    - maximum_load_current
    - phase_configuration
  description: From `ver` command. phase_configuration is `Single`, `Banked`, or `3 Phase`.

- id: command_error
  type: object
  fields:
    - code
    - message
  description: Format `E[0-9][0-9][0-9]: Error message`. Known codes: E100 (command does not exist), E101 (invalid command arguments), E102 (user already exists), E103 (user does not exist), E104 (user does not have access), E200 (input error / 3-minute input timeout).

- id: command_ok
  type: string
  description: Successful command response: `OK` followed by command output.

- id: outlet_groups
  type: string
  description: From `outletgroups` command. Format `_group_name_ : _IP_address_of_local_PDU_ Outlets: _number_, _number... IP_address_of_remote_PDU_ Outlets: _number_, _number...`.

- id: power_on_delay
  type: object
  description: From `powerondelay` query. Format `_outlet_number_ : _outlet_name_ : Power on delay is _time_ seconds.`

- id: power_off_delay
  type: object
  description: From `poweroffdelay` query. Format `_outlet_number_ : _outlet_name_ : Power off delay is _time_ seconds.`

- id: reboot_duration
  type: object
  description: From `rebootduration` query. Format `_outlet_number_ : _outlet_name_ : Reboot duration is _time_ seconds.`

- id: coldstart_delay
  type: object
  description: From `pducoldstartdelay` query. Format `_PDU_name_: PDU coldstart delay is _time_ seconds.`

- id: low_load_warning_threshold
  type: object
  description: From `lowloadwarning` query. Format `Low load warning threshold is _current_ A.`

- id: near_overload_warning_threshold
  type: object
  description: From `nearoverloadwarning` query. Format `Near overload warning threshold is _current_ A.`

- id: overload_alarm_threshold
  type: object
  description: From `overloadalarm` query. Format `Overload alarm threshold for _phase_number_ is _current_ A.`

- id: overload_restriction
  type: object
  description: From `overloadrestriction` query. Format `Overload restriction is _setting_ for _phase_number_.`

- id: user_listing
  type: object
  description: From `list` command. Format `OK Local: _user_: _outlet_number_, _outlet_number_ ...` and `OK Radius: _user_: _outlet_number_, _outlet_number_ ...`.
```

## Variables
```yaml
- id: power_on_delay_seconds
  type: integer
  description: Seconds the PDU waits after a command before restoring power to an outlet. Set per outlet via `powerondelay`.
  settable_via: powerondelay_set

- id: power_off_delay_seconds
  type: integer
  description: Seconds the PDU waits after a command before removing power from an outlet. Set per outlet via `poweroffdelay`.
  settable_via: poweroffdelay_set

- id: reboot_duration_seconds
  type: integer
  description: Seconds an outlet remains off during a reboot cycle.
  settable_via: rebootduration_set

- id: pdu_cold_start_delay_seconds
  type: integer
  description: Seconds the PDU delays applying power to outlets after AC power is applied. Allowed 0-300.
  settable_via: pducoldstartdelay_set

- id: low_load_warning_threshold_amps
  type: number
  description: Low-load warning threshold per phase.
  settable_via: lowloadwarning_set

- id: near_overload_warning_threshold_amps
  type: number
  description: Near-overload warning threshold per phase.
  settable_via: nearoverloadwarning_set

- id: overload_alarm_threshold_amps
  type: number
  description: Overload alarm threshold per phase.
  settable_via: overloadalarm_set

- id: overload_restriction
  type: enum
  values: [on, off]
  description: When `on`, prevents outlets from turning on while overload alarm threshold is violated.
  settable_via: overloadrestriction_set

- id: outlet_name
  type: string
  description: Per-outlet label, up to 23 printable ASCII characters.
  settable_via: name

- id: pdu_system_name
  type: string
  description: System name for the PDU, set via `name master {new_name}`.
  settable_via: name

- id: inactivity_logout_minutes
  type: integer
  description: Inactivity logout time. Default 3 minutes, configurable 1-10. UNRESOLVED: no CLI command shown in source to read or set this value; presumably configured via web UI.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications the PDU sends.
# Inactivity logout, overload alarm, and cold-start events may exist but are not
# documented in the refined CLI excerpt.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences. The CLI
# itself does not include a macro language in the refined excerpt. Synchronized
# outlet groups exist (see `outletgroups`) but are configured elsewhere.
```

## Safety
```yaml
confirmation_required_for:
  - reset_defaults_pdu  # Resets PDU and outlet configuration to defaults
interlocks:
  - id: overload_restriction
    description: When overload restriction is `on`, the PDU prevents outlets from turning on while the overload alarm threshold is violated. Source: `overloadrestriction` command description.
  - id: application_init
    description: While application firmware is initializing, CLI commands are rejected with `The Switched Rack PDU is still initializing. Please try again later.`
  - id: logon_lockout
    description: Three consecutive unsuccessful log-on attempts lock further attempts for two minutes. Source: log-on responses section.
# UNRESOLVED: voltage/current/power specifications not stated in source. No
# explicit safety warnings in the refined excerpt beyond the lockouts and
# interlock procedures above.
```

## Notes
- The refined source explicitly notes "the Switched Rack PDU does not track its total current draw" — the `current` command is documented but likely unsupported on this model class.
- Log-off command accepts five aliases: `exit`, `logout`, `logoff`, `quit`, `bye`.
- `uploadini` is serial-only and uses XMODEM-CRC. Transfer baud can be 2400, 9600, 19200, or 38400. After a non-default transfer baud, restore PDU baud to default 9600 to re-establish communication.
- Trailing `*` on a `status` output indicates a control action is pending (in-flight on/off/reboot).
- `-c` suffix on password: append a space then `-c` to the password when not using a KVM, per source log-on procedure.
- Commands are case-insensitive for command keywords, case-sensitive for arguments unless noted.
- The CLI uses single ASCII 0x20 space as delimiter; extra spaces are ignored.
- Quoted strings: if a string value starts/ends with space or contains commas/semicolons, enclose in quotation marks. Reverse slant (`\`) is the only escape character.

<!-- UNRESOLVED: TCP port numbers for Telnet/SSH not stated in source (do not assume 22/23). Serial data bits, parity, stop bits, flow control not stated (do not assume 8N1). Firmware version compatibility range not stated. Source does not document unsolicited event notifications or macro scripting. The `current` command may be unsupported on AP8931 per source note. -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - iportal.se.com
  - manuals.zedt.eu
  - manualmachine.com
  - mouser.com
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
  - https://iportal.se.com/Contents/docs/UPS-PMAR-9LLM9N_R1_EN.PDF
  - http://manuals.zedt.eu/apc-sua-ups/UPS-Link_Protocol_Specification.pdf
  - https://manualmachine.com/apc/ap8941/392271-user-manual/
  - https://www.mouser.com/datasheet/3/187/8/AP8931_document.pdf
retrieved_at: 2026-05-14T10:59:22.676Z
last_checked_at: 2026-06-02T17:21:14.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:14.265Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port numbers for Telnet/SSH not stated in source. Serial data bits / parity / stop bits / flow control not stated."
- "Telnet and SSH TCP port numbers not stated in source"
- "port number not stated in source"
- "data_bits, parity, stop_bits, flow_control not stated in source"
- "no CLI command shown in source to read or set this value; presumably configured via web UI."
- "source does not describe unsolicited notifications the PDU sends."
- "source does not describe multi-step macro sequences. The CLI"
- "voltage/current/power specifications not stated in source. No"
- "TCP port numbers for Telnet/SSH not stated in source (do not assume 22/23). Serial data bits, parity, stop bits, flow control not stated (do not assume 8N1). Firmware version compatibility range not stated. Source does not document unsolicited event notifications or macro scripting. The `current` command may be unsupported on AP8931 per source note."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
