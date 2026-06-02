---
spec_id: admin/apc-pdu
schema_version: ai4av-public-spec-v1
revision: 1
title: "APC Switched Rack PDU Control Spec"
manufacturer: APC
model_family: "APC Switched Rack PDU"
aliases: []
compatible_with:
  manufacturers:
    - APC
  models:
    - "APC Switched Rack PDU"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
retrieved_at: 2026-04-30T04:34:47.223Z
last_checked_at: 2026-06-01T23:12:08.375Z
generated_at: 2026-06-01T23:12:08.375Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port numbers for Telnet/SSH not stated in source; SSH/Telnet protocols are TCP-based but listener ports undocumented here."
  - "TCP port for Telnet/SSH listener not stated in source"
  - "data_bits, parity, stop_bits, flow_control not stated in source"
  - "username/password credentials and account types not specified; source describes 3 account types (Administrator, device manager, outlet user) with username+password login"
  - "source documents no unsolicited push notifications; CLI is query/response only."
  - "source documents no multi-step sequences beyond the login procedure and uploadini XMODEM transfer."
  - "no explicit user-facing safety warnings, high-voltage interlocks, or power-sequencing requirements stated in source."
  - "TCP listener ports for Telnet/SSH not stated in source. Serial data_bits/parity/stop_bits/flow_control not stated. Firmware compatibility range not stated. SSH host-key formats and KEX algorithms not stated. RADIUS integration details not stated (referenced indirectly via \"list\" output variants)."
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:08.375Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literally in source with complete bidirectional coverage; transport (TCP/serial @ 9600 baud) verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# APC Switched Rack PDU Control Spec

## Summary
CLI control surface for APC Switched Rack PDU. Reachable via Telnet, SSH v1/v2, or serial. Login with user name + password yields `APC>` prompt. Spec covers outlet on/off/reboot, status, current/power readings, alarm thresholds, user/outlet-group administration, and PDU configuration.

<!-- UNRESOLVED: TCP port numbers for Telnet/SSH not stated in source; SSH/Telnet protocols are TCP-based but listener ports undocumented here. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# UNRESOLVED: TCP port for Telnet/SSH listener not stated in source
# addressing:
#   port: null
serial:
  baud_rate: 9600
  # UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source
auth:
  type: password
  # UNRESOLVED: username/password credentials and account types not specified; source describes 3 account types (Administrator, device manager, outlet user) with username+password login
```

## Traits
```yaml
- powerable    # inferred from on/off/reboot commands
- queryable    # inferred from status, current, power, ver, whoami, list queries
- routable     # inferred from outlet assignment commands (assign/unassign)
```

## Actions
```yaml
# ---- User Management ----
- id: adduser
  label: Add Outlet User
  kind: action
  command: "adduser {user_name}"
  params:
    - name: user_name
      type: string
      description: One to ten printable ASCII characters
- id: assign
  label: Assign Outlets To User
  kind: action
  command: "assign {outlets} {user_name}"
  params:
    - name: outlets
      type: string
      description: Outlet number or hyphen-separated range, comma-delimited (e.g. "1-3,5,7")
    - name: user_name
      type: string
      description: Configured local-database user
- id: deluser
  label: Delete Outlet User
  kind: action
  command: "deluser {user_name}"
  params:
    - name: user_name
      type: string
      description: One to ten printable ASCII characters
- id: passwd
  label: Change Password
  kind: action
  command: "passwd [ {user_name} ]"
  params:
    - name: user_name
      type: string
      description: Optional; omit to change own password, specify to change another (admin only)
- id: unassign
  label: Unassign Outlets From User
  kind: action
  command: "unassign {outlets} {user_name}"
  params:
    - name: outlets
      type: string
      description: Outlet number or range, comma-delimited
    - name: user_name
      type: string
      description: Configured local-database user
- id: whoami
  label: Who Am I
  kind: query
  command: "whoami"

# ---- Outlet Control ----
- id: off
  label: Turn Outlet(s) Off
  kind: action
  command: "off {outlets}"
  params:
    - name: outlets
      type: string
      description: "outlet | range, comma-delimited, or 'all'"
- id: on
  label: Turn Outlet(s) On
  kind: action
  command: "on {outlets}"
  params:
    - name: outlets
      type: string
      description: "outlet | range, comma-delimited, or 'all'"
- id: outletgroups
  label: List Outlet Sync Groups
  kind: query
  command: "outletgroups"
- id: poweroffdelay
  label: Get/Set Power-Off Delay
  kind: action
  command: "poweroffdelay {outlets} [{time | never}]"
  params:
    - name: outlets
      type: string
      description: Outlet or range, comma-delimited. Omit to read all accessible outlets.
    - name: time
      type: string
      description: Delay in seconds, or 'never'
- id: powerondelay
  label: Get/Set Power-On Delay
  kind: action
  command: "powerondelay {outlets} [{time | never}]"
  params:
    - name: outlets
      type: string
      description: Outlet or range, comma-delimited. Omit to read all accessible outlets.
    - name: time
      type: string
      description: Delay in seconds, or 'never'
- id: reboot
  label: Reboot Outlet(s)
  kind: action
  command: "reboot {outlets}"
  params:
    - name: outlets
      type: string
      description: "outlet | range, comma-delimited, or 'all'"
- id: rebootduration
  label: Get/Set Reboot Duration
  kind: action
  command: "rebootduration {outlets}[: {time}]"
  params:
    - name: outlets
      type: string
      description: Outlet or range, comma-delimited. Omit to read all accessible.
    - name: time
      type: integer
      description: Off-time in seconds before restart
- id: status
  label: Outlet Status Query
  kind: query
  command: "status {outlets}"
  params:
    - name: outlets
      type: string
      description: Outlet or range, comma-delimited

# ---- PDU-Level ----
- id: current
  label: Current Draw Query
  kind: query
  command: "current"
- id: list
  label: List Users And Outlet Assignments
  kind: query
  command: "list"
- id: lowloadwarning
  label: Get/Set Low-Load Warning Threshold
  kind: action
  command: "lowloadwarning [{phase_number} [{current}]]"
  params:
    - name: phase_number
      type: integer
      description: "1, 2, or 3 (default 1)"
    - name: current
      type: number
      description: Threshold in amps
- id: name
  label: Set Outlet Or System Name
  kind: action
  command: "name {outlet} {new_name}"
  params:
    - name: outlet
      type: string
      description: "Outlet number, or 'master' for system name"
    - name: new_name
      type: string
      description: Up to 23 printable ASCII chars
- id: nearoverloadwarning
  label: Get/Set Near-Overload Warning Threshold
  kind: action
  command: "nearoverloadwarning [{phase_number} [{current}]]"
  params:
    - name: phase_number
      type: integer
      description: "1, 2, or 3 (default 1)"
    - name: current
      type: number
      description: Threshold in amps
- id: overloadalarm
  label: Get/Set Overload Alarm Threshold
  kind: action
  command: "overloadalarm [{phase_number} [{current}]]"
  params:
    - name: phase_number
      type: integer
      description: "1, 2, or 3 (default 1)"
    - name: current
      type: number
      description: Threshold in amps
- id: overloadrestriction
  label: Get/Set Overload Restriction
  kind: action
  command: "overloadrestriction [{phase_number} [{setting}]]"
  params:
    - name: phase_number
      type: integer
      description: "1, 2, or 3 (default 1 for read)"
    - name: setting
      type: string
      description: "on | off"
- id: pducoldstartdelay
  label: Get/Set PDU Cold-Start Delay
  kind: action
  command: "pducoldstartdelay [{time | never}]"
  params:
    - name: time
      type: integer
      description: "Delay in seconds, 0-300, or 'never'"
- id: power
  label: Total Power Query
  kind: query
  command: "power"

# ---- General Management ----
- id: exit
  label: Exit CLI
  kind: action
  command: "{exit|logout|logoff|quit|bye}"
- id: help
  label: Help
  kind: query
  command: "help|? [{command}]"
  params:
    - name: command
      type: string
      description: Optional command name; omit for full list
- id: reset_defaults_pdu
  label: Reset PDU Configuration To Defaults
  kind: action
  command: "reset_defaults_pdu"
- id: uploadini
  label: Upload INI File (XMODEM, Serial Only)
  kind: action
  command: "uploadini"
- id: ver
  label: Show Firmware / Model Info
  kind: query
  command: "ver"
```

## Feedbacks
```yaml
- id: outlet_status
  type: enum
  values: [ON, OFF]
  # trailing '*' in output indicates pending control action
- id: error_code
  type: string
  # Format: E[0-9][0-9][0-9]: Error message
  values: [E100, E101, E102, E103, E104, E200]
- id: prompt
  type: string
  values: ["APC>"]
```

## Variables
```yaml
- id: inactivity_logout
  type: integer
  description: Auto log-off timeout in minutes (default 3, range 1-10)
- id: power_off_delay
  type: integer
  description: Seconds PDU waits before restoring power to an outlet
- id: power_on_delay
  type: integer
  description: Seconds PDU waits before restoring power to an outlet
- id: reboot_duration
  type: integer
  description: Seconds outlet remains off during reboot
- id: cold_start_delay
  type: integer
  description: Seconds PDU delays applying power after AC applied (0-300, or never)
- id: low_load_threshold
  type: number
  description: Low-load warning threshold in amps (per phase)
- id: near_overload_threshold
  type: number
  description: Near-overload warning threshold in amps (per phase)
- id: overload_alarm_threshold
  type: number
  description: Overload alarm threshold in amps (per phase)
- id: overload_restriction
  type: enum
  values: [on, off]
  description: When on, prevents outlets from turning on while overload threshold is violated
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited push notifications; CLI is query/response only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences beyond the login procedure and uploadini XMODEM transfer.
```

## Safety
```yaml
confirmation_required_for:
  - reset_defaults_pdu
interlocks:
  - overloadrestriction  # when on, blocks outlet turn-on while threshold violated
# UNRESOLVED: no explicit user-facing safety warnings, high-voltage interlocks, or power-sequencing requirements stated in source.
```

## Notes
- Login lockout: 3 consecutive failed attempts locks further attempts for 2 minutes.
- CLI prompt is `APC>`. All commands (not arguments) are case-insensitive.
- Space (ASCII 0x20) is the sole delimiter; multiple spaces are tolerated.
- Strings containing spaces, commas, or semicolons must be quoted. Reverse-slash escapes only `"` and `\` itself — no traditional `\n` etc.
- For XMODEM upload (`uploadini`), supported baud options are 2400, 9600, 19200, 38400; default is 9600 and must be restored post-transfer if changed.
- `current` command is documented but source notes the PDU does not actually track total current draw.

<!-- UNRESOLVED: TCP listener ports for Telnet/SSH not stated in source. Serial data_bits/parity/stop_bits/flow_control not stated. Firmware compatibility range not stated. SSH host-key formats and KEX algorithms not stated. RADIUS integration details not stated (referenced indirectly via "list" output variants). -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
retrieved_at: 2026-04-30T04:34:47.223Z
last_checked_at: 2026-06-01T23:12:08.375Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:08.375Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literally in source with complete bidirectional coverage; transport (TCP/serial @ 9600 baud) verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port numbers for Telnet/SSH not stated in source; SSH/Telnet protocols are TCP-based but listener ports undocumented here."
- "TCP port for Telnet/SSH listener not stated in source"
- "data_bits, parity, stop_bits, flow_control not stated in source"
- "username/password credentials and account types not specified; source describes 3 account types (Administrator, device manager, outlet user) with username+password login"
- "source documents no unsolicited push notifications; CLI is query/response only."
- "source documents no multi-step sequences beyond the login procedure and uploadini XMODEM transfer."
- "no explicit user-facing safety warnings, high-voltage interlocks, or power-sequencing requirements stated in source."
- "TCP listener ports for Telnet/SSH not stated in source. Serial data_bits/parity/stop_bits/flow_control not stated. Firmware compatibility range not stated. SSH host-key formats and KEX algorithms not stated. RADIUS integration details not stated (referenced indirectly via \"list\" output variants)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
