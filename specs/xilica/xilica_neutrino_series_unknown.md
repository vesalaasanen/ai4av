---
spec_id: admin/xilica-neutrino-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Xilica Neutrino Series Control Spec"
manufacturer: Xilica
model_family: "Neutrino Series"
aliases: []
compatible_with:
  manufacturers:
    - Xilica
  models:
    - "Neutrino Series"
    - "Solaro Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.xilica.com
  - cn.xilica.com
  - proaudio-technik.de
  - starfelt.se
  - manualmachine.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://cn.xilica.com/wp-content/uploads/2022/01/210630045859_XIL003_UserManual_Neutrino.pdf
  - "https://www.proaudio-technik.de/media/pdf/12/9f/12/560401_Xilica%20Solaro%20Third%20Party%20Guide.pdf"
  - https://www.starfelt.se/manualer/1100890092_3rdpart.pdf
  - https://manualmachine.com/xilica/neutrino/1808966-user-manual/
retrieved_at: 2026-05-19T04:24:08.275Z
last_checked_at: 2026-06-02T22:16:24.487Z
generated_at: 2026-06-02T22:16:24.487Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "specific DSP parameters (gain, EQ, filter, etc.) are user-defined"
  - "device-initiated events other than parameter change notifications"
  - "no explicit multi-step macro sequences documented."
  - "serial/RS-232 support — source documents only TCP/UDP"
  - "TCP port assumed 10007 for command channel; UDP 10008 for subscription broadcasts — stated in source"
  - "voltage, current, power specifications — not applicable to control protocol"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:16:24.487Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Xilica Neutrino Series Control Spec

## Summary
Xilica Neutrino (and Solaro) Series DSP processors support third-party control via TCP port 10007 and UDP port 10008. All commands are human-readable ASCII with whitespace-separated fields terminated by a carriage return. Control objects are user-defined strings assigned via Xilica Designer software. Subscription model supports both TCP Unicast and UDP Broadcast for parameter change notifications. Password protection supported via LOGIN command.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 10007  # TCP command port; UDP port 10008 for subscription broadcasts
auth:
  type: password  # explicit: LOGIN command required for protected devices
```

## Traits
```yaml
- queryable  # GET, GETRAW, REFRESH commands present
- routable   # JOIN/LEAVE group commands present
```

## Actions
```yaml
- id: set
  label: Set Parameter Value
  kind: action
  params:
    - name: control_object
      type: string
      description: User-defined control object name (up to 32 chars, no leading $)
    - name: data
      type: oneOf
      subtypes:
        - number
        - string
        - boolean
      description: New value (type must match parameter type)

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
    - name: delta
      type: number

- id: incraw
  label: Increment Raw Parameter
  kind: action
  params:
    - name: control_object
      type: string
    - name: delta
      type: number

- id: dec
  label: Decrement Parameter
  kind: action
  params:
    - name: control_object
      type: string
    - name: delta
      type: number

- id: decraw
  label: Decrement Raw Parameter
  kind: action
  params:
    - name: control_object
      type: string
    - name: delta
      type: number

- id: toggle
  label: Toggle Boolean Parameter
  kind: action
  params:
    - name: control_object
      type: string

- id: preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: oneOf
      subtypes:
        - number
        - string
      description: Preset number or name

- id: subscribe
  label: Subscribe to Parameter Changes
  kind: subscription
  params:
    - name: control_object
      type: string
    - name: transport
      type: string
      description: '"TCP" or "UDP"; defaults to TCP Unicast'

- id: unsubscribe
  label: Unsubscribe from Parameter
  kind: action
  params:
    - name: control_object
      type: string

- id: keepalive
  label: Keep TCP Connection Alive
  kind: action
  params: []

- id: interval
  label: Set Subscription Interval
  kind: action
  params:
    - name: time_ms
      type: integer
      description: Minimum interval in milliseconds (minimum 100ms)

- id: login
  label: Unlock Device
  kind: action
  params:
    - name: password
      type: string
      description: Device password set in Xilica Designer software

- id: reboot
  label: Remotely Reboot Device
  kind: action
  params: []

- id: refresh
  label: Get All Control Object Values
  kind: query
  params: []

- id: create
  label: Create Control Group
  kind: action
  params:
    - name: group_name
      type: string
      description: Group name without leading $ (auto-added)

- id: remove
  label: Remove Control Group
  kind: action
  params:
    - name: group_name
      type: string
      description: Group name with leading $ (e.g., $group1)

- id: join
  label: Add Object to Control Group
  kind: action
  params:
    - name: group_name
      type: string
    - name: control_object
      type: string

- id: leave
  label: Remove Object from Control Group
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
  label: Error Response
  kind: event
  params:
    - name: error_code
      type: integer
  values:
    - 101  # Invalid Command
    - 102  # Bad Arguments
    - 103  # Invalid Data Format
    - 104  # Control Object Not Found
    - 105  # Parameter Not Found
    - 106  # Data Value Not Found
    - 107  # Max Subscription Reached
    - 108  # Password Error
    - 109  # Not Yet Login
    - 110  # Command Not Supported for Control Object
    - 111  # Invalid Group Name
    - 112  # Max Control Group Reached
    - 113  # Max Control Object in Group Reached
    - 114  # Object Already in Group
    - 115  # Object Not in Group
    - 116  # Conflicting With Other Objects in Group
    - 117  # Invalid Preset #
    - 118  # Invalid Preset Name

- id: parameter_notification
  label: Parameter Change Notification
  kind: event
  description: Unsolicited notification via SUBSCRIBE; format is "#<CONTROL OBJECT>=<DATA><CR>"
  params:
    - name: control_object
      type: string
    - name: data
      type: oneOf
      subtypes:
        - number
        - string
        - boolean
```

## Variables
```yaml
# UNRESOLVED: specific DSP parameters (gain, EQ, filter, etc.) are user-defined
# via Xilica Designer software and not enumerated in this protocol document.
# String values referenced: Filter Type, Filter Slope, AFS Sensitivity, AFS Type,
# Control Ramp Type - enum values listed in Data String section.
```

## Events
```yaml
# UNRESOLVED: device-initiated events other than parameter change notifications
# are not documented. Subscription notifications are covered via SUBSCRIBE.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "REBOOT command: on Neutrino Series returns OK before reboot;
      on Solaro Series device reboots with no response. Plan accordingly
      when scripting remote reboot across both series."
      # inferred from documented behavioral difference (not safety-critical)
```

## Notes
Control objects must be pre-configured in Xilica Designer before use over the API. Control groups and subscriptions are persistent only for the active TCP connection; both must be recreated if the connection drops. A KEEPALIVE message must be sent every 60 seconds over TCP or the connection will be terminated. LOGIN persists only for the current connection session. Verbose/Simple mode (Section 8) noted as future implementation. Interval command applies per-TCP-connection on Neutrino Series but globally on Solaro Series. String values (Filter Type, Filter Slope, AFS Sensitivity, AFS Type, Control Ramp Type) enumerated in Section 11.
<!-- UNRESOLVED: serial/RS-232 support — source documents only TCP/UDP -->
<!-- UNRESOLVED: TCP port assumed 10007 for command channel; UDP 10008 for subscription broadcasts — stated in source -->
<!-- UNRESOLVED: voltage, current, power specifications — not applicable to control protocol -->

## Provenance

```yaml
source_domains:
  - cdn.xilica.com
  - cn.xilica.com
  - proaudio-technik.de
  - starfelt.se
  - manualmachine.com
source_urls:
  - https://cdn.xilica.com/designer/FAQ/X22_Solaro_API_Guide.pdf
  - https://cn.xilica.com/wp-content/uploads/2022/01/210630045859_XIL003_UserManual_Neutrino.pdf
  - "https://www.proaudio-technik.de/media/pdf/12/9f/12/560401_Xilica%20Solaro%20Third%20Party%20Guide.pdf"
  - https://www.starfelt.se/manualer/1100890092_3rdpart.pdf
  - https://manualmachine.com/xilica/neutrino/1808966-user-manual/
retrieved_at: 2026-05-19T04:24:08.275Z
last_checked_at: 2026-06-02T22:16:24.487Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:16:24.487Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "specific DSP parameters (gain, EQ, filter, etc.) are user-defined"
- "device-initiated events other than parameter change notifications"
- "no explicit multi-step macro sequences documented."
- "serial/RS-232 support — source documents only TCP/UDP"
- "TCP port assumed 10007 for command channel; UDP 10008 for subscription broadcasts — stated in source"
- "voltage, current, power specifications — not applicable to control protocol"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
