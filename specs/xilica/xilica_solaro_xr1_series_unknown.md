---
spec_id: admin/xilica-solaro-xr1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Xilica Solaro xR1 Series Control Spec"
manufacturer: Xilica
model_family: "Solaro xR1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Xilica
  models:
    - "Solaro xR1 Series"
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
  - https://support.xilica.com/en/articles/3942530
retrieved_at: 2026-05-27T13:14:51.144Z
last_checked_at: 2026-05-31T22:46:44.300Z
generated_at: 2026-05-31T22:46:44.300Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific xR1 model variants (e.g. xR1-8x8, xR1-16x16) not enumerated in source"
  - "firmware version compatibility not stated in source"
  - "maximum number of simultaneous TCP connections not stated"
  - "specific DSP parameter ranges (gain min/max, filter frequency ranges, etc.)"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "maximum subscription count not stated (error 107 implies a limit exists)"
  - "maximum control group count not stated (error 112 implies a limit exists)"
  - "maximum objects per group not stated (error 113 implies a limit exists)"
  - "raw value scaling factors not documented (e.g. how many raw units per dB)"
  - "verbose/simple mode described as future implementation, not yet available"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:46:44.300Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match source commands one-to-one; transport parameters (TCP port 10007, keep-alive 60s, password auth) verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Xilica Solaro xR1 Series Control Spec

## Summary

Xilica Solaro xR1 Series DSP processors controlled via ASCII command protocol over TCP and UDP. TCP port 10007 carries command/response traffic with 60-second keep-alive requirement. UDP port 10008 carries subscription broadcast notifications. Control objects are user-defined strings configured in Xilica Designer and addressed by name.

<!-- UNRESOLVED: specific xR1 model variants (e.g. xR1-8x8, xR1-16x16) not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum number of simultaneous TCP connections not stated -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 10007
auth:
  type: password  # source describes LOGIN command with password; device may or may not require it
serial: null  # N/A - serial not mentioned in source
```

## Traits
```yaml
# - levelable     (SET/INC/DEC gain, fader, EQ parameters present)
# - queryable     (GET/GETRAW/REFRESH commands present)
# - powerable     (REBOOT command present)
# - subscribable  (SUBSCRIBE/UNSUBSCRIBE with TCP/UDP notification present)
```

## Actions
```yaml
- id: set
  label: Set Control Object Value
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name (groups prefixed with $)"
    - name: data
      type: string
      description: "Value to set - number, quoted string, or Boolean (TRUE/FALSE)"

- id: setraw
  label: Set Control Object Raw Value
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: data
      type: number
      description: "Raw numeric value (e.g. -3200 for -3.2 dB)"

- id: get
  label: Get Control Object Formatted Value
  kind: query
  params:
    - name: control_object
      type: string
      description: "Control object or group name"

- id: getraw
  label: Get Control Object Raw Value
  kind: query
  params:
    - name: control_object
      type: string
      description: "Control object or group name"

- id: inc
  label: Increment Control Object
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: step
      type: number
      description: "Increment amount (formatted units)"

- id: incraw
  label: Increment Control Object Raw
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: step
      type: number
      description: "Increment amount (raw units)"

- id: dec
  label: Decrement Control Object
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: step
      type: number
      description: "Decrement amount (formatted units)"

- id: decraw
  label: Decrement Control Object Raw
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: step
      type: number
      description: "Decrement amount (raw units)"

- id: toggle
  label: Toggle Control Object
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name (Boolean parameters only)"

- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: data
      type: string
      description: "Preset number or quoted preset name"

- id: subscribe
  label: Subscribe to Control Object
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"
    - name: transport
      type: string
      description: '"TCP" for unicast or "UDP" for broadcast (optional, default TCP)'

- id: unsubscribe
  label: Unsubscribe from Control Object
  kind: action
  params:
    - name: control_object
      type: string
      description: "Control object or group name"

- id: keepalive
  label: Keep-Alive
  kind: action
  params: []

- id: interval
  label: Set Subscription Interval
  kind: action
  params:
    - name: time_ms
      type: integer
      description: "Minimum interval in milliseconds (minimum 100)"

- id: login
  label: Login
  kind: action
  params:
    - name: password
      type: string
      description: "Password string (quoted)"

- id: reboot
  label: Reboot Device
  kind: action
  params: []

- id: refresh
  label: Refresh All Control Objects
  kind: query
  params: []

- id: create_group
  label: Create Control Group
  kind: action
  params:
    - name: group_name
      type: string
      description: "Group name (no $ prefix - added automatically)"

- id: remove_group
  label: Remove Control Group
  kind: action
  params:
    - name: group_name
      type: string
      description: "Group name with $ prefix"

- id: join_group
  label: Join Control Object to Group
  kind: action
  params:
    - name: group_name
      type: string
      description: "Group name with $ prefix"
    - name: control_object
      type: string
      description: "Control object name (quoted)"

- id: leave_group
  label: Leave Control Object from Group
  kind: action
  params:
    - name: group_name
      type: string
      description: "Group name with $ prefix"
    - name: control_object
      type: string
      description: "Control object name (quoted)"
```

## Feedbacks
```yaml
- id: control_object_value
  type: string
  description: "Response to GET/GETRAW: <CONTROL OBJECT>=<DATA>"

- id: control_object_notification
  type: string
  description: "Subscription notification: #<CONTROL OBJECT>=<DATA>"

- id: error_response
  type: enum
  values:
    - "101"
    - "102"
    - "103"
    - "104"
    - "105"
    - "106"
    - "107"
    - "108"
    - "109"
    - "110"
    - "111"
    - "112"
    - "113"
    - "114"
    - "115"
    - "116"
    - "117"
    - "118"

- id: ok_response
  type: enum
  values: ["OK"]
```

## Variables
```yaml
# UNRESOLVED: specific DSP parameter ranges (gain min/max, filter frequency ranges, etc.)
# not enumerated in source - control object names and ranges are configured per-design in Xilica Designer
```

## Events
```yaml
- id: subscription_notification
  description: "Unsolicited notification on subscribed control object value change, sent via TCP unicast or UDP broadcast"
  format: "#<CONTROL OBJECT>=<DATA><CR>"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Commands and control object names are case-sensitive.
- Fields separated by exactly one space; extra whitespace causes parse errors.
- Messages terminated with carriage return (`<CR>`).
- TCP keep-alive required every 60 seconds or connection drops.
- On TCP disconnect all subscriptions and group settings are lost and must be reconfigured.
- Control groups: member objects must share same type and support same commands.
- Solaro-specific: INTERVAL command is global across all connections (unlike Neutrino where it is per-connection).
- REBOOT on Solaro: no response returned, device reboots immediately.
- Password protection is optional per-device; LOGIN persists only for the duration of the TCP connection.
- Control object names are user-defined in Xilica Designer, up to 32 ASCII chars, no double quotes, cannot start with `$`.
- UDP port 10008 used for subscription broadcast when `"UDP"` transport selected.

<!-- UNRESOLVED: maximum subscription count not stated (error 107 implies a limit exists) -->
<!-- UNRESOLVED: maximum control group count not stated (error 112 implies a limit exists) -->
<!-- UNRESOLVED: maximum objects per group not stated (error 113 implies a limit exists) -->
<!-- UNRESOLVED: raw value scaling factors not documented (e.g. how many raw units per dB) -->
<!-- UNRESOLVED: verbose/simple mode described as future implementation, not yet available -->

## Provenance

```yaml
source_domains:
  - cdn.xilica.com
  - support.xilica.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://support.xilica.com/en/articles/3940994
  - https://support.xilica.com/en/articles/3942530
retrieved_at: 2026-05-27T13:14:51.144Z
last_checked_at: 2026-05-31T22:46:44.300Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:46:44.300Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match source commands one-to-one; transport parameters (TCP port 10007, keep-alive 60s, password auth) verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific xR1 model variants (e.g. xR1-8x8, xR1-16x16) not enumerated in source"
- "firmware version compatibility not stated in source"
- "maximum number of simultaneous TCP connections not stated"
- "specific DSP parameter ranges (gain min/max, filter frequency ranges, etc.)"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "maximum subscription count not stated (error 107 implies a limit exists)"
- "maximum control group count not stated (error 112 implies a limit exists)"
- "maximum objects per group not stated (error 113 implies a limit exists)"
- "raw value scaling factors not documented (e.g. how many raw units per dB)"
- "verbose/simple mode described as future implementation, not yet available"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
