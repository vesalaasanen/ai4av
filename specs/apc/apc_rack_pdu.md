---
spec_id: admin/apc-rack-pdu
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
  - ckm-content.se.com
  - se.com
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
  - https://ckm-content.se.com/ckmContent/sfc/servlet.shepherd/document/download/0691H00000GejKSQAZ
  - https://www.se.com/us/en/product-range/61799-apc-netshelter-switched-rack-pdus/
retrieved_at: 2026-04-29T22:37:54.944Z
last_checked_at: 2026-04-30T14:19:54.487Z
generated_at: 2026-04-30T14:19:54.487Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet/SSH port number not stated in source. UNRESOLVED: TCP port number not stated in source."
  - "port number not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no unsolicited event notifications described in source - device sends"
  - "no explicit multi-step sequences described as macros in source."
  - "TCP port number not stated in source. UNRESOLVED: SSH version 1 security concerns (source mentions v1 and v2). UNRESOLVED: firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-04-30T14:19:54.487Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions found verbatim in source with matching syntax; transport values verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# APC Switched Rack PDU Control Spec

## Summary
APC Switched Rack PDU with CLI control via Telnet, SSH v1/v2, or serial RS-232. Supports outlet-level power control (on/off/reboot), user management, power monitoring, and configuration of delays, thresholds, and alarms. Authentication via username/password required.

<!-- UNRESOLVED: Telnet/SSH port number not stated in source. UNRESOLVED: TCP port number not stated in source. -->

## Transport
```yaml
protocols:
  - tcp      # inferred: Telnet and SSH explicitly listed, both run over TCP
  - serial
addressing:
  port: null  # UNRESOLVED: port number not stated in source
serial:
  baud_rate: 9600  # stated: "Serial default baud rate: 9600"
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null     # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: credentialed  # stated: login requires username + password
```

## Traits
```yaml
- powerable    # on/off/reboot commands present
- routable     # outletgroups command present
- queryable   # status, current, power, ver commands present
- levelable   # powerondelay, poweroffdelay, rebootduration, lowloadwarning, nearoverloadwarning, overloadalarm, overloadrestriction commands present
```

## Actions
```yaml
- id: off
  label: Turn Outlet Off
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number, or "all"
        - type: string
          description: Range "start-end"
      description: Outlet(s) to turn off
  example: "off 1,5-7"

- id: on
  label: Turn Outlet On
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number, or "all"
        - type: string
          description: Range "start-end"
      description: Outlet(s) to turn on
  example: "on 1,5-7"

- id: reboot
  label: Reboot Outlet
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number, or "all"
        - type: string
          description: Range "start-end"
      description: Outlet(s) to reboot
  example: "reboot 1,5-7"

- id: powerondelay
  label: Set Power-On Delay
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number
        - type: string
          description: Range "start-end"
    - name: time
      type: union
      variants:
        - type: integer
          description: Delay in seconds
        - type: string
          description: "never" to keep outlet off
  example: "powerondelay 1 5"

- id: poweroffdelay
  label: Set Power-Off Delay
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number
        - type: string
          description: Range "start-end"
    - name: time
      type: union
      variants:
        - type: integer
          description: Delay in seconds
        - type: string
          description: "never" to keep outlet on
  example: "poweroffdelay 1 3"

- id: rebootduration
  label: Set Reboot Duration
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet name or number
        - type: string
          description: Range "start-end"
    - name: time
      type: integer
      description: Seconds outlet remains off before restarting
  example: "rebootduration 1 10"

- id: adduser
  label: Add User
  kind: action
  params:
    - name: user_name
      type: string
      description: User name (1-10 printable ASCII characters)
  example: "adduser john_reynolds"

- id: deluser
  label: Delete User
  kind: action
  params:
    - name: user_name
      type: string
      description: User name (1-10 printable ASCII characters)
  example: "deluser john_reynolds"

- id: assign
  label: Assign Outlets to User
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet number or name
        - type: string
          description: Range "start-end"
    - name: user_name
      type: string
      description: User name
  example: "assign 1-3,5,7 john_reynolds"

- id: unassign
  label: Unassign Outlets from User
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet number or name
        - type: string
          description: Range "start-end"
    - name: user_name
      type: string
      description: User name
  example: "unassign 1-3,5,7 john_reynolds"

- id: passwd
  label: Change Password
  kind: action
  params:
    - name: user_name
      type: string
      description: Optional user name (administrator can change other user's password)
  example: "passwd john_reynolds"

- id: name
  label: Name Outlet or PDU
  kind: action
  params:
    - name: outlet
      type: union
      variants:
        - type: string
          description: Outlet number, or "master" for PDU system name
        - type: string
          description: Outlet name
    - name: new_name
      type: string
      description: Name to assign (up to 23 printable ASCII characters)
  example: 'name 1 "Web Server"'

- id: lowloadwarning
  label: Set Low-Load Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3; default 1)
    - name: current
      type: number
      description: Threshold in amps
  example: "lowloadwarning 1 5"

- id: nearoverloadwarning
  label: Set Near-Overload Warning Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3; default 1)
    - name: current
      type: number
      description: Threshold in amps
  example: "nearoverloadwarning 1 15"

- id: overloadalarm
  label: Set Overload Alarm Threshold
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3; default 1)
    - name: current
      type: number
      description: Threshold in amps
  example: "overloadalarm 1 16"

- id: overloadrestriction
  label: Set Overload Restriction
  kind: action
  params:
    - name: phase_number
      type: integer
      description: Phase number (1, 2, or 3; default 1)
    - name: setting
      type: string
      description: "on" or "off"
  example: "overloadrestriction 1 on"

- id: pducoldstartdelay
  label: Set PDU Cold-Start Delay
  kind: action
  params:
    - name: time
      type: union
      variants:
        - type: integer
          description: Delay in seconds (0-300)
        - type: string
          description: "never" to keep outlets off until explicitly turned on
  example: "pducoldstartdelay 30"

- id: reset_defaults_pdu
  label: Reset PDU to Defaults
  kind: action
  params: []
  example: "reset_defaults_pdu"

- id: uploadini
  label: Upload INI File
  kind: action
  params: []
  description: Upload INI file via XMODEM-CRC over serial connection
  example: "uploadini"

- id: exit
  label: Exit CLI
  kind: action
  params: []
  description: Exit CLI session (alias: logout, logoff, quit, bye)
  example: "exit"

- id: help
  label: Help
  kind: action
  params:
    - name: command
      type: string
      description: Optional command name for specific help
  example: "help"
- id: whoami
  label: Show Active User
  kind: action
  params: []
  description: Display the user name of the currently logged-in user.
  example: "whoami"

- id: outletgroups
  label: List Outlet Groups
  kind: action
  params: []
  description: List the outlet synchronization groups defined on the Switched Rack PDU, including remote PDU members when inter-PDU synchronization is enabled.
  example: "outletgroups"

- id: current
  label: Read Current Draw
  kind: action
  params: []
  description: Display the total current draw in amps. Single-phase and banked PDUs report a single value; 3-phase PDUs report T1/T2/T3.
  example: "current"

- id: list
  label: List Users and Outlet Assignments
  kind: action
  params: []
  description: List all users and their assigned outlet numbers. Output varies by caller account type and authentication method (local vs RADIUS).
  example: "list"

- id: power
  label: Read Total Power Usage
  kind: action
  params: []
  description: Read the total power usage of the Switched Rack PDU in volt-amps and watts.
  example: "power"

- id: ver
  label: Show Device Info
  kind: action
  params: []
  description: Display firmware version, model number, outlet count, maximum current, and phase configuration of the Switched Rack PDU.
  example: "ver"
```

## Feedbacks
```yaml
- id: status
  label: Outlet Status
  type: enum
  values:
    - ON
    - OFF
    - "ON*"     # asterisk = control action pending
    - "OFF*"
  description: Format "_n_:ON:_name_" or "_n_:OFF:_name_", trailing asterisk indicates pending action

- id: power_state
  label: Power State
  type: enum
  values: [on, off]

- id: power_on_delay
  label: Power-On Delay
  type: union
  variants:
    - type: integer
      description: Seconds
    - type: string
      description: "never"

- id: power_off_delay
  label: Power-Off Delay
  type: union
  variants:
    - type: integer
      description: Seconds
    - type: string
      description: "never"

- id: reboot_duration
  label: Reboot Duration
  type: integer
  description: Seconds outlet remains off before restarting

- id: current_draw
  label: Current Draw
  type: union
  variants:
    - type: number
      description: Amps (single-phase/banked)
    - type: object
      description: 3-phase, keys T1/T2/T3 each with number in amps

- id: total_power
  label: Total Power
  type: object
  properties:
    - name: volt_amps
      type: number
      description: VA
    - name: watts
      type: number
      description: W

- id: device_info
  label: Device Information
  type: object
  properties:
    - name: aos_firmware_version
      type: string
    - name: pdu_firmware_version
      type: string
    - name: model
      type: string
    - name: outlet_count
      type: integer
    - name: max_current
      type: number
      description: Amps
    - name: phase_configuration
      type: string
      description: Single, Banked, or 3 Phase

- id: user_list
  label: User List
  type: object
  properties:
    - name: users
      type: array
      items:
        type: object
        properties:
          - name: auth_type
            type: string
            description: "Local" or "Radius"
          - name: user
            type: string
          - name: outlets
            type: array
            items:
              type: integer

- id: outlet_group_list
  label: Outlet Group List
  type: array
  items:
    type: object
    properties:
      - name: group_name
        type: string
      - name: members
        type: array
        items:
          type: object
          properties:
            - name: ip_address
              type: string
            - name: outlets
              type: array
              items:
                type: integer

- id: low_load_warning_threshold
  label: Low-Load Warning Threshold
  type: object
  properties:
    - name: phase
      type: integer
    - name: current
      type: number
      description: Amps

- id: near_overload_warning_threshold
  label: Near-Overload Warning Threshold
  type: object
  properties:
    - name: phase
      type: integer
    - name: current
      type: number
      description: Amps

- id: overload_alarm_threshold
  label: Overload Alarm Threshold
  type: object
  properties:
    - name: phase
      type: integer
    - name: current
      type: number
      description: Amps

- id: overload_restriction
  label: Overload Restriction
  type: object
  properties:
    - name: phase
      type: integer
    - name: setting
      type: string
      description: "on" or "off"

- id: cold_start_delay
  label: PDU Cold-Start Delay
  type: union
  variants:
    - type: integer
      description: Seconds
    - type: string
      description: "never"

- id: error_response
  label: CLI Error Response
  type: enum
  values:
    - E100  # Command does not exist
    - E101  # Invalid command arguments
    - E102  # User already exists
    - E103  # User does not exist
    - E104  # User does not have access to this command
    - E200  # Input error (required input not received within 3 minutes)
```

## Variables
```yaml
# No distinct Variables section - all settable parameters are exposed via Actions above.
# The status command serves as the primary query mechanism for outlet state.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source - device sends
# only command responses, no push-style events.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described as macros in source.
# Synchronized outlet groups (via outletgroups command) enable coordinated multi-outlet
# control but are not documented as named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      Overload restriction (overloadrestriction on) prevents outlets from turning on
      while the overload alarm threshold is violated. Must be explicitly configured.
  - description: >-
      Three consecutive failed log-on attempts triggers a 2-minute lockout.
  - description: >-
      Cold-start delay (pducoldstartdelay never) keeps outlets off after AC power
      is applied until explicitly turned on via the on command.
  - description: >-
      CLI activity auto-logs off after 3 minutes of inactivity (configurable 1-10 minutes).
  - description: >-
      XMODEM file transfer at non-default baud rate requires resetting baud rate
      to 9600 to re-establish communication after transfer completes.
```

## Notes
Serial connection uses default 9600 baud, 8N1 (assumed; data_bits/parity/stop_bits not stated in source). Telnet/SSH port number not stated in source — prior research indicated port 1023 for some models but this was not confirmed in the source document. CLI accepts commands in any capitalization; arguments are case-sensitive. String arguments containing spaces, commas, or semicolons must be enclosed in double quotes. Escape character is backslash only — no standard escape sequences recognized. Inactivity logout default is 3 minutes (range 1-10 minutes configurable).
<!-- UNRESOLVED: TCP port number not stated in source. UNRESOLVED: SSH version 1 security concerns (source mentions v1 and v2). UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - ckm-content.se.com
  - se.com
source_urls:
  - https://usermanual.wiki/Apc/ApcCommandLineInterfaceUsersManual470947.999847818.pdf
  - https://ckm-content.se.com/ckmContent/sfc/servlet.shepherd/document/download/0691H00000GejKSQAZ
  - https://www.se.com/us/en/product-range/61799-apc-netshelter-switched-rack-pdus/
retrieved_at: 2026-04-29T22:37:54.944Z
last_checked_at: 2026-04-30T14:19:54.487Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T14:19:54.487Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions found verbatim in source with matching syntax; transport values verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet/SSH port number not stated in source. UNRESOLVED: TCP port number not stated in source."
- "port number not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no unsolicited event notifications described in source - device sends"
- "no explicit multi-step sequences described as macros in source."
- "TCP port number not stated in source. UNRESOLVED: SSH version 1 security concerns (source mentions v1 and v2). UNRESOLVED: firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
