---
spec_id: admin/xilica-solarofr1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Xilica Solaro Series Control Spec"
manufacturer: Xilica
model_family: SolaroFR1
aliases: []
compatible_with:
  manufacturers:
    - Xilica
  models:
    - SolaroFR1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.xilica.com
  - support.xilica.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://support.xilica.com/en/categories/1363842-programming-api
retrieved_at: 2026-05-27T13:10:20.490Z
last_checked_at: 2026-05-31T22:46:45.017Z
generated_at: 2026-05-31T22:46:45.017Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants (FR1, Q1, etc.) firmware compatibility not stated"
  - "specific parameter names (gain, mute, EQ, etc.) not stated in source"
  - "specific trigger conditions not enumerated in source"
  - "firmware version compatibility not stated"
  - "specific DSP parameters (gain ranges, frequency steps, etc.) not enumerated in source"
  - "maximum number of subscriptions, control groups, or objects per group not specified"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:46:45.017Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match source commands verbatim; transport parameters (TCP 10007, UDP 10008, password auth) confirmed; no omitted source commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Xilica Solaro Series Control Spec

## Summary
Xilica Solaro Series DSP platform controlled via TCP (port 10007) and UDP (port 10008). ASCII text command protocol with subscription-based change notifications. Control objects are user-defined strings assigned via Xilica Designer; control groups aggregate multiple parameters under a $-prefixed name. Password-protected device operation requires LOGIN before issuing commands.

<!-- UNRESOLVED: specific model variants (FR1, Q1, etc.) firmware compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 10007
  secondary_port: 10008
auth:
  type: password
  note: LOGIN command required if device is password-protected
```

## Traits
```yaml
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: set
  label: Set Parameter Value
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: "[number|string|boolean]"

- id: setraw
  label: Set Raw Parameter Value
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: number

- id: get
  label: Get Formatted Parameter Value
  kind: query
  params:
    - name: control_object
      type: string

- id: getraw
  label: Get Raw Parameter Value
  kind: query
  params:
    - name: control_object
      type: string

- id: inc
  label: Increment Parameter
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: number

- id: incraw
  label: Increment Parameter Raw
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: number

- id: dec
  label: Decrement Parameter
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: number

- id: decraw
  label: Decrement Parameter Raw
  kind: action
  params:
    - name: control_object
      type: string
    - name: data
      type: number

- id: toggle
  label: Toggle Parameter State
  kind: action
  params:
    - name: control_object
      type: string

- id: preset
  label: Recall Preset
  kind: action
  params:
    - name: data
      type: "[number|string]"

- id: subscribe
  label: Subscribe to Parameter Notifications
  kind: action
  params:
    - name: control_object
      type: string
    - name: protocol
      type: string
      description: '"TCP" or "UDP", defaults to TCP'

- id: unsubscribe
  label: Unsubscribe from Parameter Notifications
  kind: action
  params:
    - name: control_object
      type: string

- id: keepalive
  label: Keep TCP Connection Alive
  kind: action
  params: []

- id: interval
  label: Set Subscription Notification Interval
  kind: action
  params:
    - name: time_ms
      type: number
      description: Minimum interval in milliseconds (minimum 100)

- id: login
  label: Unlock Password-Protected Device
  kind: action
  params:
    - name: password
      type: string

- id: reboot
  label: Remotely Reboot Device
  kind: action
  params: []

- id: refresh
  label: Get Formatted Data for All Control Objects
  kind: query
  params: []

- id: create
  label: Create Control Group
  kind: action
  params:
    - name: group_name
      type: string
      description: "$ prefix auto-added by device"

- id: remove
  label: Remove Control Group
  kind: action
  params:
    - name: group_name
      type: string

- id: join
  label: Add Control Object to Group
  kind: action
  params:
    - name: group_name
      type: string
    - name: control_object
      type: string

- id: leave
  label: Remove Control Object from Group
  kind: action
  params:
    - name: group_name
      type: string
    - name: control_object
      type: string
```

## Feedbacks
```yaml
- id: error_response
  type: string
  description: ERROR=<error code> for invalid commands
  values: []
  note: Error codes 101-118 defined in source

- id: get_response
  type: string
  description: <control_object>=<data>

- id: refresh_response
  type: string
  description: <control_object>=<data> repeated for all control objects

- id: ok_response
  type: enum
  values: [OK]

- id: subscription_notification
  type: string
  description: "#<control_object>=<data>"

- id: login_response
  type: enum
  values: [OK, ERROR]
  note: OK returned on successful login; ERROR (108) on bad password

- id: reboot_response
  type: enum
  values: [OK, none]
  note: Neutrino returns OK; Solaro sends no response before rebooting
```

## Variables
```yaml
# Control object values are set via SET/SETRAW actions and queried via GET/GETRAW.
# Variables depend on user-defined control objects configured in Xilica Designer.
# UNRESOLVED: specific parameter names (gain, mute, EQ, etc.) not stated in source
```

## Events
```yaml
# Unsolicited subscription notifications sent via TCP or UDP.
# Format: #<control_object>=<data>
# UNRESOLVED: specific trigger conditions not enumerated in source
```

## Macros
```yaml
# No explicit multi-step macros documented.
# Control groups provide batch control: CREATE, JOIN, LEAVE, REMOVE.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - TCP disconnection clears all subscriptions and group settings; must reconfigure after reconnect
  - UDP Broadcast subscription requires separate TCP connection for keep-alive
  - Password authentication required per connection; re-login needed after TCP disconnect
```

## Notes
Control objects are user-defined strings (up to 32 chars, no double quotes, first char cannot be $). Control groups are $-prefixed strings. Both case-sensitive. White space separating fields is required; extra whitespace causes parse error. Responses end with <CR>. Subscription notifications use # prefix to distinguish from explicit GET responses.

String value options: Filter Type (Butterworth, LR, Bessel), Filter Slope (6-48db/Oct in 6db steps), AFS Sensitivity (Very Low to Very High), AFS Type (Dynamic, Fixed), Control Ramp Type (Linear, Log, Audio).

Error codes: 101 Invalid Command, 102 Bad Arguments, 103 Invalid Data Format, 104 Control Object Not Found, 105 Parameter Not Found, 106 Data Value Not Found, 107 Max Subscription Reached, 108 Password Error, 109 Not Yet Login, 110 Command Not Supported, 111 Invalid Group Name, 112 Max Control Group Reached, 113 Max Control Object in Group Reached, 114 Object Already in Group, 115 Object Not in Group, 116 Conflicting With Other Objects in Group, 117 Invalid Preset #, 118 Invalid Preset Name.

INTERVAL applies globally on Solaro (per-connection on Neutrino). KEEPALIVE required every 60s or connection dropped.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific DSP parameters (gain ranges, frequency steps, etc.) not enumerated in source -->
<!-- UNRESOLVED: maximum number of subscriptions, control groups, or objects per group not specified -->

## Provenance

```yaml
source_domains:
  - cdn.xilica.com
  - support.xilica.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://support.xilica.com/en/categories/1363842-programming-api
retrieved_at: 2026-05-27T13:10:20.490Z
last_checked_at: 2026-05-31T22:46:45.017Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:46:45.017Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match source commands verbatim; transport parameters (TCP 10007, UDP 10008, password auth) confirmed; no omitted source commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants (FR1, Q1, etc.) firmware compatibility not stated"
- "specific parameter names (gain, mute, EQ, etc.) not stated in source"
- "specific trigger conditions not enumerated in source"
- "firmware version compatibility not stated"
- "specific DSP parameters (gain ranges, frequency steps, etc.) not enumerated in source"
- "maximum number of subscriptions, control groups, or objects per group not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
