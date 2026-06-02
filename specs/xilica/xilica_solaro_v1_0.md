---
spec_id: admin/xilica-solaro-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Xilica Solaro Control Spec"
manufacturer: Xilica
model_family: "Solaro Series"
aliases: []
compatible_with:
  manufacturers:
    - Xilica
  models:
    - "Solaro Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.xilica.com
  - support.xilica.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://support.xilica.com/en/articles/3940994
  - https://support.xilica.com/en/articles/3942338
  - https://support.xilica.com/en/categories/1363842-programming-api
retrieved_at: 2026-04-29T20:51:03.649Z
last_checked_at: 2026-04-30T09:52:01.935Z
generated_at: 2026-04-30T09:52:01.935Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact Solaro model variants (e.g. Solaro QR1, QR5) not stated — source says \"Solaro Series\""
  - "firmware version compatibility not stated in source"
  - "UDP subscription port 10008 - no separate addressing field for secondary protocol"
  - "variable list is dynamic per device configuration (set up in Xilica Designer)"
  - "no macro sequences described in source"
  - "no safety interlock procedures stated in source"
  - "raw value scaling factor for SETRAW/GETRAW/INCRAW/DECRAW not documented"
  - "maximum number of subscriptions (error 107 implies a limit but value not stated)"
  - "maximum number of control groups (error 112 implies a limit but value not stated)"
  - "maximum control objects per group (error 113 implies a limit but value not stated)"
  - "verbose/simple mode (section 8) marked as future implementation"
  - "string data values (filter types, slopes, AFS settings, ramp types) — enumerated in section 11 but mapping to control objects not specified"
verification:
  verdict: verified
  checked_at: 2026-04-30T09:52:01.935Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched literally; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Xilica Solaro Control Spec

## Summary

Xilica Solaro Series DSP processors controlled via ASCII-based TCP/UDP protocol. TCP port 10007 for commands and responses; UDP port 10008 for subscription broadcast notifications. Supports parameter get/set, presets, subscriptions, control groups, and password-protected login. Keep-alive required every 60 seconds on TCP connection.

<!-- UNRESOLVED: exact Solaro model variants (e.g. Solaro QR1, QR5) not stated — source says "Solaro Series" -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 10007
  # UNRESOLVED: UDP subscription port 10008 - no separate addressing field for secondary protocol
auth:
  type: password
  description: >-
    Optional password protection. If enabled, LOGIN command must be sent before
    any other command. Auth persists for duration of TCP connection only.
    Re-login required after reconnection.
connection:
  keepalive_interval_ms: 60000
  keepalive_command: KEEPALIVE
  note: >-
    TCP keep-alive mandatory every 60 seconds. On disconnect all subscriptions
    and groups are lost and must be reconfigured.
```

## Traits
```yaml
traits:
  - powerable     # REBOOT command
  - queryable     # GET, GETRAW, REFRESH commands
  - levelable     # SET, INC, DEC commands for gain/fader parameters
```

## Actions
```yaml
actions:
  - id: set
    label: Set Parameter
    kind: action
    description: "Set a control object or group to a value (number, string, or boolean)"
    command: "SET {control_object} {data}"
    params:
      - name: control_object
        type: string
        description: "Control object name or $group name (up to 32 chars, case-sensitive)"
      - name: data
        type: string
        description: "Number, quoted string, or boolean (TRUE/FALSE)"

  - id: setraw
    label: Set Raw Parameter
    kind: action
    description: "Set a control object or group using raw numeric value"
    command: "SETRAW {control_object} {data}"
    params:
      - name: control_object
        type: string
        description: "Control object name or $group name"
      - name: data
        type: number
        description: "Raw numeric value (e.g. -3200 for -3.2 dB)"

  - id: get
    label: Get Parameter
    kind: query
    description: "Get formatted value of a control object or group"
    command: "GET {control_object}"
    response: "{control_object}={data}"
    params:
      - name: control_object
        type: string
        description: "Control object name or $group name"

  - id: getraw
    label: Get Raw Parameter
    kind: query
    description: "Get raw numeric value of a control object or group"
    command: "GETRAW {control_object}"
    response: "{control_object}={data}"
    params:
      - name: control_object
        type: string
        description: "Control object name or $group name"

  - id: inc
    label: Increment Parameter
    kind: action
    description: "Increment a control object or group by a numeric amount (formatted)"
    command: "INC {control_object} {data}"
    params:
      - name: control_object
        type: string
      - name: data
        type: number
        description: "Increment amount (e.g. 0.5 for +0.5 dB)"

  - id: incraw
    label: Increment Raw Parameter
    kind: action
    description: "Increment a control object or group by raw numeric amount"
    command: "INCRAW {control_object} {data}"
    params:
      - name: control_object
        type: string
      - name: data
        type: number

  - id: dec
    label: Decrement Parameter
    kind: action
    description: "Decrement a control object or group by a numeric amount (formatted)"
    command: "DEC {control_object} {data}"
    params:
      - name: control_object
        type: string
      - name: data
        type: number

  - id: decraw
    label: Decrement Raw Parameter
    kind: action
    description: "Decrement a control object or group by raw numeric amount"
    command: "DECRAW {control_object} {data}"
    params:
      - name: control_object
        type: string
      - name: data
        type: number

  - id: toggle
    label: Toggle Parameter
    kind: action
    description: "Toggle boolean state of a control object or group"
    command: "TOGGLE {control_object}"
    params:
      - name: control_object
        type: string

  - id: preset_recall
    label: Recall Preset
    kind: action
    description: "Recall a preset by number or name"
    command: "PRESET {data}"
    params:
      - name: data
        type: string
        description: "Preset number (e.g. 4) or quoted preset name"

  - id: subscribe
    label: Subscribe to Parameter
    kind: action
    description: "Subscribe to notifications for a control object"
    command: "SUBSCRIBE {control_object} {transport}"
    params:
      - name: control_object
        type: string
      - name: transport
        type: string
        description: 'Optional: "TCP" (unicast, default) or "UDP" (broadcast on port 10008)'

  - id: unsubscribe
    label: Unsubscribe from Parameter
    kind: action
    description: "Unsubscribe from notifications for a control object"
    command: "UNSUBSCRIBE {control_object}"
    params:
      - name: control_object
        type: string

  - id: keepalive
    label: Keep Alive
    kind: action
    description: "Send keep-alive to maintain TCP connection. No response from device."
    command: "KEEPALIVE"
    params: []

  - id: interval
    label: Set Subscription Interval
    kind: action
    description: "Set global minimum notification interval for all subscriptions (Solaro: global across all connections)"
    command: "INTERVAL {time_ms}"
    params:
      - name: time_ms
        type: integer
        description: "Minimum interval in milliseconds (minimum 100)"

  - id: login
    label: Login
    kind: action
    description: "Authenticate if device is password-protected. Required before other commands when protection enabled."
    command: "LOGIN {password}"
    params:
      - name: password
        type: string
        description: "Quoted password string"

  - id: reboot
    label: Reboot Device
    kind: action
    description: "Remotely reboot the device. No response; device reboots immediately (Solaro behavior)."
    command: "REBOOT"
    params: []

  - id: refresh
    label: Refresh All Parameters
    kind: query
    description: "Get formatted data values for all control objects"
    command: "REFRESH"
    response: "{control_object}={data} {control_object}={data} ..."
    params: []

  - id: group_create
    label: Create Control Group
    kind: action
    description: "Create a named control group (no $ prefix needed in CREATE command; added automatically)"
    command: "CREATE {group_name}"
    params:
      - name: group_name
        type: string
        description: "Group name (up to 32 chars, no $ prefix, no double quotes)"

  - id: group_remove
    label: Remove Control Group
    kind: action
    description: "Remove a control group and free resources"
    command: "REMOVE ${group_name}"
    params:
      - name: group_name
        type: string
        description: "Group name with $ prefix"

  - id: group_join
    label: Join Control Group
    kind: action
    description: "Add a control object to a group"
    command: "JOIN ${group_name} {control_object}"
    params:
      - name: group_name
        type: string
        description: "Group name with $ prefix"
      - name: control_object
        type: string
        description: "Quoted control object name"

  - id: group_leave
    label: Leave Control Group
    kind: action
    description: "Remove a control object from a group"
    command: "LEAVE ${group_name} {control_object}"
    params:
      - name: group_name
        type: string
        description: "Group name with $ prefix"
      - name: control_object
        type: string
        description: "Quoted control object name"
```

## Feedbacks
```yaml
feedbacks:
  - id: parameter_value
    type: string
    description: "Current formatted value of a control object"
    trigger: "Response to GET command"
    format: "{control_object}={data}"

  - id: parameter_raw_value
    type: number
    description: "Current raw value of a control object"
    trigger: "Response to GETRAW command"
    format: "{control_object}={data}"

  - id: subscription_notification
    type: string
    description: "Unsolicited notification of data change on subscribed control object"
    trigger: "Automatic on subscribed parameter change"
    format: "#{control_object}={data}"
    note: "Sent via TCP unicast or UDP broadcast per subscription config"

  - id: error_response
    type: enum
    description: "Error code returned for invalid commands"
    trigger: "Invalid command or arguments"
    format: "ERROR={code}"
    values:
      - "101"  # Invalid Command
      - "102"  # Bad Arguments
      - "103"  # Invalid Data Format
      - "104"  # Control Object Not Found
      - "105"  # Parameter Not Found
      - "106"  # Data Value Not Found
      - "107"  # Max Subscription Reached
      - "108"  # Password Error
      - "109"  # Not Yet Login
      - "110"  # Command Not Supported for Control Object
      - "111"  # Invalid Group Name
      - "112"  # Max Control Group Reached
      - "113"  # Max Control Object in Group Reached
      - "114"  # Object Already in Group
      - "115"  # Object Not in Group
      - "116"  # Conflicting With Other Objects in Group
      - "117"  # Invalid Preset #
      - "118"  # Invalid Preset Name

  - id: ok_response
    type: enum
    description: "Success acknowledgement for most commands"
    values: ["OK"]
```

## Variables
```yaml
# Control objects are user-defined in Xilica Designer and discovered at runtime.
# No static variable list available from source.
# UNRESOLVED: variable list is dynamic per device configuration (set up in Xilica Designer)
```

## Events
```yaml
events:
  - id: subscription_update
    description: "Pushed when a subscribed control object's value changes"
    format: "#{control_object}={data}<CR>"
    transport: "TCP unicast or UDP broadcast per subscription setting"
```

## Macros
```yaml
# UNRESOLVED: no macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # No response, immediate reboot; all subscriptions and groups lost
interlocks: []
note: >-
  REBOOT on Solaro has no response - device reboots immediately.
  TCP disconnect causes loss of all subscriptions and group configurations.
  Control object names must be configured in Xilica Designer before use.
# UNRESOLVED: no safety interlock procedures stated in source
```

## Notes

- Command strings are ASCII, fields separated by single space, terminated with `<CR>`. Multiple spaces cause parse errors.
- Control object names are case-sensitive, up to 32 chars, no double quotes, cannot start with `$`.
- Group names always prefixed with `$` (except in CREATE command where `$` is auto-added).
- String data values must be enclosed in double quotes.
- Boolean values are `TRUE` or `FALSE` (case-sensitive).
- INTERAL (sic — source typo for INTERVAL) command is global on Solaro (all connections share one interval), unlike Neutrino where it is per-connection.
- UDP port 10008 used for subscription broadcast when `"UDP"` specified in SUBSCRIBE command.
- REFRESH returns all control object values in a single response.
- SETRAW uses fixed-point raw values (e.g. -3200 for -3.2 dB); raw scaling factor not documented.

<!-- UNRESOLVED: raw value scaling factor for SETRAW/GETRAW/INCRAW/DECRAW not documented -->
<!-- UNRESOLVED: maximum number of subscriptions (error 107 implies a limit but value not stated) -->
<!-- UNRESOLVED: maximum number of control groups (error 112 implies a limit but value not stated) -->
<!-- UNRESOLVED: maximum control objects per group (error 113 implies a limit but value not stated) -->
<!-- UNRESOLVED: verbose/simple mode (section 8) marked as future implementation -->
<!-- UNRESOLVED: string data values (filter types, slopes, AFS settings, ramp types) — enumerated in section 11 but mapping to control objects not specified -->

## Provenance

```yaml
source_domains:
  - cdn.xilica.com
  - support.xilica.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://support.xilica.com/en/articles/3940994
  - https://support.xilica.com/en/articles/3942338
  - https://support.xilica.com/en/categories/1363842-programming-api
retrieved_at: 2026-04-29T20:51:03.649Z
last_checked_at: 2026-04-30T09:52:01.935Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:52:01.935Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched literally; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact Solaro model variants (e.g. Solaro QR1, QR5) not stated — source says \"Solaro Series\""
- "firmware version compatibility not stated in source"
- "UDP subscription port 10008 - no separate addressing field for secondary protocol"
- "variable list is dynamic per device configuration (set up in Xilica Designer)"
- "no macro sequences described in source"
- "no safety interlock procedures stated in source"
- "raw value scaling factor for SETRAW/GETRAW/INCRAW/DECRAW not documented"
- "maximum number of subscriptions (error 107 implies a limit but value not stated)"
- "maximum number of control groups (error 112 implies a limit but value not stated)"
- "maximum control objects per group (error 113 implies a limit but value not stated)"
- "verbose/simple mode (section 8) marked as future implementation"
- "string data values (filter types, slopes, AFS settings, ramp types) — enumerated in section 11 but mapping to control objects not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
