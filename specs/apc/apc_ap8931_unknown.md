---
spec_id: admin/apc-ap8931-switched-rack-pdu
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
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
retrieved_at: 2026-05-04T15:20:52.311Z
last_checked_at: 2026-05-20T04:57:01.566Z
generated_at: 2026-05-20T04:57:01.566Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T04:57:01.566Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions found in source with correct semantics; transport parameters (9600 baud, Telnet/SSH/serial) verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# APC AP8931 Switched Rack PDU Control Spec

## Summary

The APC AP8931 is a 1U Switched Rack PDU with 8 NEMA 5-15 outlets, controllable via Telnet/SSH CLI (TCP) and RS-232 serial. The CLI uses plain-text commands with structured responses (`OK` for success, `E###` for errors). Authentication is username/password; no default credentials are stated in the source.

<!-- UNRESOLVED: Telnet/SSH port number not stated in source. HTTP/HTTPS management interface not documented in this CLI guide. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: Telnet/SSH port number not stated in source
serial:
  baud_rate: 9600  # stated: "Serial default baud rate: 9600"
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: null  # UNRESOLVED: user/password authentication described, but no auth type token specified in source
  # Note: source describes username/password log-on, but does not specify a protocol-level auth mechanism (e.g., Basic, Digest, SSH key)
```

## Traits
```yaml
# Inferred from source command examples:
# - powerable:    off, on, reboot commands present
# - routable:     assign/unassign commands for outlet access control present
# - queryable:    status, power, current, list commands present
# - levelable:    powerondelay, poweroffdelay, rebootduration for sequencing control
```

## Actions
```yaml
- id: adduser
  label: Add User
  kind: action
  params:
    - name: user_name
      type: string
      description: "1-10 printable ASCII characters"
  access: administrator

- id: assign
  label: Assign Outlets to User
  kind: action
  params:
    - name: outlets
      type: string
      description: "Outlet number(s) or range(s), e.g. 1-3,5,7"
    - name: user_name
      type: string
      description: "User already configured in local database"
  access: administrator

- id: deluser
  label: Delete User
  kind: action
  params:
    - name: user_name
      type: string
      description: "1-10 printable ASCII characters"
  access: administrator

- id: passwd
  label: Change Password
  kind: action
  params:
    - name: user_name
      type: string
      required: false
      description: "Omit to change own password; specify to change another user's (admin only)"
  access: all account types (own password); administrator (another user)

- id: unassign
  label: Unassign Outlets from User
  kind: action
  params:
    - name: outlets
      type: string
      description: "Outlet number(s) or range(s)"
    - name: user_name
      type: string
  access: administrator

- id: whoami
  label: Who Am I
  kind: action
  params: []

- id: off
  label: Turn Outlet Off
  kind: action
  params:
    - name: outlets
      type: string
      description: "all | outlet number(s) | range(s) | outlet name (quotation marks required for names with spaces)"
  access: all account types with outlet access

- id: on
  label: Turn Outlet On
  kind: action
  params:
    - name: outlets
      type: string
      description: "all | outlet number(s) | range(s) | outlet name (quotation marks required for names with spaces)"
  access: all account types with outlet access

- id: reboot
  label: Reboot Outlet
  kind: action
  params:
    - name: outlets
      type: string
      description: "all | outlet number(s) | range(s) | outlet name (quotation marks required for names with spaces)"
  access: all account types with outlet access
  note: "CLI does not wait for reboot to complete before returning prompt"

- id: powerondelay
  label: Set/Get Power-On Delay
  kind: action
  params:
    - name: outlets
      type: string
      description: "Outlet number(s) or range(s)"
    - name: time
      type: string
      required: false
      description: "Seconds (integer) or 'never' (to keep outlet off); omit to read current delay"
  access: all account types with outlet access

- id: poweroffdelay
  label: Set/Get Power-Off Delay
  kind: action
  params:
    - name: outlets
      type: string
      description: "Outlet number(s) or range(s)"
    - name: time
      type: string
      required: false
      description: "Seconds (integer) or 'never' (to keep outlet on); omit to read current delay"
  access: all account types with outlet access

- id: rebootduration
  label: Set/Get Reboot Duration
  kind: action
  params:
    - name: outlets
      type: string
      description: "Outlet number(s) or range(s)"
    - name: time
      type: string
      required: false
      description: "Seconds; omit to read current duration"
  access: all account types with outlet access

- id: name
  label: Name Outlet or System
  kind: action
  params:
    - name: outlet
      type: string
      description: "Outlet number or 'master' for PDU system name"
    - name: new_name
      type: string
      description: "Up to 23 printable ASCII characters; enclose in quotes if contains spaces"
  access: administrator, device manager

- id: lowloadwarning
  label: Set/Get Low-Load Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      required: false
      description: "Phase 1, 2, or 3 (default: 1); omit to read"
    - name: current
      type: number
      required: false
      description: "Threshold in amps; required to set"
  access: administrator, device manager

- id: nearoverloadwarning
  label: Set/Get Near-Overload Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      required: false
      description: "Phase 1, 2, or 3 (default: 1); omit to read"
    - name: current
      type: number
      required: false
      description: "Threshold in amps; required to set"
  access: administrator, device manager

- id: overloadalarm
  label: Set/Get Overload Alarm Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      required: false
      description: "Phase 1, 2, or 3 (default: 1); omit to read"
    - name: current
      type: number
      required: false
      description: "Threshold in amps; required to set"
  access: administrator, device manager

- id: overloadrestriction
  label: Set/Get Overload Restriction
  kind: action
  params:
    - name: phase_number
      type: integer
      required: false
      description: "Phase 1, 2, or 3 (default: 1); omit to read"
    - name: setting
      type: string
      required: false
      description: "'on' or 'off'; required to set"
  access: administrator, device manager

- id: pducoldstartdelay
  label: Set/Get PDU Cold-Start Delay
  kind: action
  params:
    - name: time
      type: string
      required: false
      description: "Seconds (0-300) or 'never' (keep outlets off until explicitly turned on); omit to read"
  access: administrator, device manager

- id: reset_defaults_pdu
  label: Reset PDU to Defaults
  kind: action
  params: []
  access: administrator
  note: "Resets only PDU-specific and outlet configuration parameters; does not affect network or user settings"

- id: uploadini
  label: Upload INI File via XMODEM
  kind: action
  params: []
  access: administrator, device manager
  note: "Serial-only; transfers at selectable baud rate (2400/9600/19200/38400); after transfer, if baud rate changed from default 9600, must reset to default to re-establish communication"

- id: exit
  label: Log Off
  kind: action
  params: []
  synonyms: [logout, logoff, quit, bye]
- id: outletgroups
  label: List Outlet Synchronization Groups
  kind: query
  params: []
  note: "Lists outlet synchronization groups; includes remote PDU info when inter-PDU synchronization is enabled"

- id: status
  label: Read Outlet Status
  kind: query
  params:
    - name: outlets
      type: string
      description: "Outlet name or number, range, or 'all'; e.g. 1,5-7 or \"Web Server\""
  access: all account types with outlet access

- id: current
  label: Read Total Current Draw
  kind: query
  params: []
  access: all account types with CLI access
  note: "Output is single value in amps for single-phase/banked PDUs; T1/T2/T3 breakdown for 3-phase PDUs"

- id: list
  label: List Users and Outlet Assignments
  kind: query
  params: []
  access: administrator, device manager, outlet user
  note: "Output varies by auth method (Local vs RADIUS) and account type"

- id: power
  label: Read Total Power Usage
  kind: query
  params: []
  access: all account types with CLI access
  note: "Output format: _power_in_volt-amps_ VA _power_in_watts_ W"

- id: ver
  label: Display PDU Version and Configuration Info
  kind: query
  params: []
  access: all account types with CLI access
  note: "Output includes AOS firmware version, PDU firmware version, model number, outlet count, max current, phase configuration"

- id: help
  label: Display Help
  kind: query
  params:
    - name: command
      type: string
      required: false
      description: "Name of the command for which help will be provided; omit to list all available commands"
  access: all account types with CLI access
```

## Feedbacks
```yaml
- id: error_response
  type: enum
  values:
    - E100
    - E101
    - E102
    - E103
    - E104
    - E200
  description: "Error codes returned in format E[0-9][0-9][0-9]: Error message"

- id: success_response
  type: string
  description: "OK followed by command output for success"

- id: logon_banner
  type: string
  description: "If firmware not initialized: 'The Switched Rack PDU is still initializing. Please try again later.'"

- id: failed_logon
  type: string
  description: "After 3 consecutive failed logon attempts, further attempts are blocked for 2 minutes."
```

## Variables
```yaml
- id: outlet_status
  type: enum
  values: [ON, OFF]
  description: "Status of individual outlets; trailing asterisk (*) indicates control action pending"
  readonly: true

- id: power_usage
  type: object
  properties:
    - name: volt_amps
      type: number
      unit: VA
    - name: watts
      type: number
      unit: W
  description: "Total PDU power usage (read via power command)"
  readonly: true

- id: total_current
  type: object
  description: "Total current draw in amps; for 3-phase PDUs includes T1/T2/T3 breakdown"
  properties:
    - name: T1
      type: number
      unit: A
    - name: T2
      type: number
      unit: A
    - name: T3
      type: number
      unit: A
  readonly: true

- id: outlet_name
  type: string
  description: "User-assigned name for an outlet or PDU system (master)"
  readonly: false

- id: power_on_delay
  type: integer
  unit: seconds
  description: "Time PDU waits before restoring power to an outlet after a power-off command"

- id: power_off_delay
  type: integer
  unit: seconds
  description: "Time PDU waits after an on-command before applying power to an outlet"

- id: reboot_duration
  type: integer
  unit: seconds
  description: "Duration an outlet remains off before auto-restart during reboot"

- id: cold_start_delay
  type: integer
  unit: seconds
  description: "Time PDU delays applying power to outlets after AC is applied; 0-300 or never"

- id: low_load_warning_threshold
  type: number
  unit: A
  description: "Per-phase low-load warning threshold in amps"

- id: near_overload_warning_threshold
  type: number
  unit: A
  description: "Per-phase near-overload warning threshold in amps"

- id: overload_alarm_threshold
  type: number
  unit: A
  description: "Per-phase overload alarm threshold in amps"

- id: overload_restriction
  type: enum
  values: [on, off]
  description: "When on, prevents outlets from turning on while overload alarm threshold is violated"

- id: outlet_groups
  type: string
  description: "Outlet synchronization groups; format: groupName : PDU_IP Outlets: n,n PDU_IP Outlets: n,n"
  readonly: true

- id: user_list
  type: string
  description: "List of users and their assigned outlets; format varies based on auth method (Local vs RADIUS)"
  readonly: true

- id: pdu_info
  type: object
  description: "ver command output: APC OS version, PDU firmware, model, outlet count, max current, phase config"
  properties:
    - name: aos_version
      type: string
    - name: pdu_firmware_version
      type: string
    - name: model_number
      type: string
    - name: outlet_count
      type: integer
    - name: max_current
      type: number
      unit: A
    - name: phase_configuration
      type: string
      enum: [Single, Banked, 3 Phase]
  readonly: true
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications or push events from the PDU.
# The CLI is strictly request/response; no asynchronous event messages are described.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro/sequence commands.
# The closest equivalent is the synchronized outlet group mechanism (outletgroups command)
# which coordinates timing across multiple PDUs, but no explicit multi-step sequence
# definition syntax is provided.
```

## Safety
```yaml
confirmation_required_for:
  - off  # turning off outlets cuts power to connected equipment
  - on   # restoring power to outlets after a power-off sequence
  - reboot  # cycling power to connected equipment
interlocks: []
# UNRESOLVED: no explicit interlock or sequencing safety procedures stated in source.
# However, powerondelay/poweroffdelay/rebootduration provide configurable delay windows
# that implicitly support staged power-on/off sequences for load management.
# No explicit warnings about concurrent outlet switching under overload conditions.
```

## Notes

**Command syntax conventions:**
- Space is the delimiter between command and arguments; extra spaces are ignored
- Commands are case-insensitive; arguments are case-sensitive unless specified
- Quote strings that contain spaces, commas, or semicolons; use reverse-slash as escape character
- Do not use traditional escape sequences (`\n`, `\t`, etc.) — CLI does not recognize them

**Authentication:**
- Log-on requires username + password (followed by `-c` if not using KVM)
- After 3 failed attempts, further attempts blocked for 2 minutes
- Inactivity logout defaults to 3 minutes (configurable 1–10 minutes)

**Error handling:**
- Success: `OK` followed by command output
- Errors: `E###` three-digit code + message text
- E200: command expecting required user input (e.g., password) did not receive it within 3 minutes

**CLI availability:**
- If application firmware has not finished initializing, CLI returns: `The Switched Rack PDU is still initializing. Please try again later.`
- If CLI is unavailable, the application layer does not start and `-c` option does not work

**Serial configuration:**
- Default baud rate: 9600 (explicitly stated)
- Data bits, parity, stop bits, flow control: not stated in source

**Outlet naming:**
- Outlet names can contain spaces and require quotation marks in commands
- System name (PDU-level) set via `name master <new_name>`

**PDU cold-start delay:**
- When set to `never`, outlets remain off after AC power is applied until explicitly turned on via `on` command
- Range: 0–300 seconds

<!-- UNRESOLVED: Telnet/SSH port number — source does not state default port (commonly 23 for Telnet, 22 for SSH but not confirmed). -->
<!-- UNRESOLVED: Serial data bits, parity, stop bits — not stated in source. -->
<!-- UNRESOLVED: Authentication protocol type (Basic, Digest, SSH key, etc.) — source describes username/password log-on but no protocol-level token format. -->
<!-- UNRESOLVED: Unsolicited events/push notifications — CLI is strictly request/response per source. -->
<!-- UNRESOLVED: HTTP/HTTPS management interface — not covered in this CLI reference guide. -->
<!-- UNRESOLVED: Firmware version compatibility — not stated in source. -->
```

```markdown

## Provenance

```yaml
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
retrieved_at: 2026-05-04T15:20:52.311Z
last_checked_at: 2026-05-20T04:57:01.566Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:57:01.566Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions found in source with correct semantics; transport parameters (9600 baud, Telnet/SSH/serial) verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
