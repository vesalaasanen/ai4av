---
spec_id: admin/linn-generic-ds-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Generic DS Series Control Spec"
manufacturer: Linn
model_family: "Linn Generic DS Series"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn Generic DS Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
retrieved_at: 2026-06-03T13:49:00.798Z
last_checked_at: 2026-06-04T06:27:09.603Z
generated_at: 2026-06-04T06:27:09.603Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "no explicit SetStandby / power on/off in source; ProductStandby is reported via EVENT but no documented ACTION mutates it"
  - "no safety warnings or interlock procedures stated in source"
  - "device.xml and service.xml URLs are derived from the protocol spec example — verify against actual device"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:27:09.603Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literal source commands with correct transport parameters (TCP port 23, no auth). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Linn Generic DS Series Control Spec

## Summary
The Linn Generic DS Series is a network audio player supporting LPEC (Linn Protocol over IP) control via raw TCP socket on port 23. The protocol uses an action/response model with SUBSCRIBE-based eventing for state changes. Supports up to 4 simultaneous LPEC sessions per device.

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence-based traits:
# - routable    (Ds/Product source selection commands present)
# - queryable   (GetVolume, Source, GetIdArray, preamp_volume_query present)
# - levelable   (SetVolume on RenderingControl and Preamp)
# - powerable   UNRESOLVED: no explicit SetStandby / power on/off in source; ProductStandby is reported via EVENT but no documented ACTION mutates it
routable: true
queryable: true
levelable: true
```

## Actions
```yaml
# LPEC ACTION format: ACTION [sub-device]/[service] [version] [action] "[inarg1]" "[inarg2]" ...
# All args XML-escaped and double-quoted per source.

# MediaRenderer/AVTransport (UPnP) - transport state:
- id: play
  label: Play
  kind: action
  command: "ACTION MediaRenderer/AVTransport 1 Play \"{instance_id}\" \"{speed}\""
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")
    - name: speed
      type: string
      description: Play speed (typically "1")

- id: pause
  label: Pause
  kind: action
  command: "ACTION MediaRenderer/AVTransport 1 Pause \"{instance_id}\""
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

- id: next
  label: Next
  kind: action
  command: "ACTION MediaRenderer/AVTransport 1 Next \"{instance_id}\""
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

- id: previous
  label: Previous
  kind: action
  command: "ACTION MediaRenderer/AVTransport 1 Previous \"{instance_id}\""
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

# MediaRenderer/RenderingControl (UPnP) - volume:
- id: get_volume
  label: Get Volume (RenderingControl)
  kind: action
  command: "ACTION MediaRenderer/RenderingControl 1 GetVolume \"{instance_id}\" \"{channel}\""
  params:
    - name: instance_id
      type: string
    - name: channel
      type: string
      description: Channel name (e.g., "Master")

- id: set_volume
  label: Set Volume (RenderingControl)
  kind: action
  command: "ACTION MediaRenderer/RenderingControl 1 SetVolume \"{instance_id}\" \"{channel}\" \"{desired_volume}\""
  params:
    - name: instance_id
      type: string
    - name: channel
      type: string
    - name: desired_volume
      type: integer
      description: Volume level (0-100)

# Preamp/Preamp (Linn-specific) - preamp state:
- id: preamp_volume_query
  label: Preamp Volume Query
  kind: action
  command: "ACTION Preamp/Preamp 1 Volume"
  params: []
  # Response: RESPONSE "[volume]"

- id: set_mute
  label: Set Mute (Preamp)
  kind: action
  command: "ACTION Preamp/Preamp 1 SetMute \"{muted}\""
  params:
    - name: muted
      type: boolean
      description: "true" to mute, "false" to unmute

# Ds/Product - source selection:
- id: set_source_index
  label: Set Source Index
  kind: action
  command: "ACTION Ds/Product 1 SetSourceIndex \"{source_index}\""
  params:
    - name: source_index
      type: integer
      description: Source number (0-based; subject to change with firmware or source visibility)

- id: set_source_by_system_name
  label: Set Source By System Name
  kind: action
  command: "ACTION Ds/Product 2 SetSourceBySystemName \"{system_name}\""
  params:
    - name: system_name
      type: string
      description: System source name (e.g., "Balanced", "Radio")

- id: set_source_index_by_name
  label: Set Source Index By Name
  kind: action
  command: "ACTION Ds/Product 2 SetSourceIndexByName \"{source_name}\""
  params:
    - name: source_name
      type: string
      description: Source name (e.g., "CD12")

- id: source_query
  label: Query Source
  kind: action
  command: "ACTION Ds/Product 2 Source \"{source_index}\""
  params:
    - name: source_index
      type: integer
      description: Source number to query

# Ds/Pins - PIN presets (Davaar 67+):
- id: invoke_pin
  label: Invoke PIN
  kind: action
  command: "ACTION Ds/Pins 1 InvokeId \"{pin_id}\""
  params:
    - name: pin_id
      type: integer
      description: PIN number to invoke

- id: read_pin_list
  label: Read PIN List
  kind: action
  command: "ACTION Ds/Pins 1 ReadList \"{pin_array_filter}\""
  params:
    - name: pin_array_filter
      type: string
      description: Filter string for PIN list, e.g. "[ 1]"

- id: get_pin_id_array
  label: Get PIN ID Array
  kind: action
  command: "ACTION Ds/Pins 1 GetIdArray"
  params: []

# Protocol-level messages:
- id: subscribe
  label: Subscribe
  kind: action
  command: "SUBSCRIBE {sub_device_service}"
  params:
    - name: sub_device_service
      type: string
      description: "[sub-device]/[service]" e.g. "Ds/Product"

- id: unsubscribe
  label: Unsubscribe
  kind: action
  command: "UNSUBSCRIBE {subscription_id_or_service}"
  params:
    - name: subscription_id_or_service
      type: string
      description: Subscription ID (e.g. "49") or "[sub-device]/[service]" (e.g. "Ds/Product"). Leave empty to unsubscribe from all.
```

## Feedbacks
```yaml
# Response to ACTION with no outargs:
- id: response_empty
  type: object
  description: 'RESPONSE <CR><LF> for ACTION with no outargs (e.g. SetVolume, SetMute)'

# Response to ACTION with outargs:
- id: response
  type: object
  description: 'RESPONSE "[outarg1]" "[outarg2]" ... "[outargn]"'
  properties:
    - name: outargs
      type: array
      description: Ordered list of output argument strings

# Response to SUBSCRIBE:
- id: subscribe_response
  type: object
  description: 'SUBSCRIBE [subscription-id]'
  properties:
    - name: subscription_id
      type: integer
      description: Numeric ID; use to correlate EVENT messages and to UNSUBSCRIBE

# Response to UNSUBSCRIBE (one per unsubscribed service; multiple may arrive for "UNSUBSCRIBE" with no args):
- id: unsubscribe_response
  type: object
  description: 'UNSUBSCRIBE [subscription-id]'
  properties:
    - name: subscription_id
      type: integer

# Event - initial state dump (sequence 0):
- id: event_initial
  type: object
  description: 'EVENT [subscription-id] 0 [var1-name] "[var1]" [var2-name] "[var2]" ...'
  properties:
    - name: subscription_id
      type: integer
    - name: sequence_no
      type: integer
      description: 0 = initial state dump; all evented variables for the service are reported
    - name: variables
      type: object
      description: Key-value pairs of all evented variables

# Event - change notification (sequence > 0):
- id: event_change
  type: object
  description: 'EVENT [subscription-id] [sequence-no] [var1-name] "[var1]" ...'
  properties:
    - name: subscription_id
      type: integer
    - name: sequence_no
      type: integer
      description: 32-bit unsigned; wraps to 1 after 2^32-1; increments per EVENT
    - name: variables
      type: object
      description: Key-value pairs of changed variables only

# Error responses (23 codes defined in source):
- id: error
  type: object
  description: 'ERROR [code] "[description]"'
  properties:
    - name: code
      type: integer
      description: |
        Defined codes: 101 "Command not recognised", 102 "Service not specified",
        103 "Service not found", 104 "Version invalid", 105 "Version not specified",
        106 "Version not supported", 107 "Method not specified",
        108 "Method execution exception", 201 "Boolean argument invalid",
        202 "String argument invalid", 203 "Unsigned numeric argument invalid",
        204 "Signed numeric invalid", 205 "Binary argument invalid",
        206 "Invalid argument escaping", 301 "Argument list incomplete",
        302 "Argument not quoted", 303 "Argument incomplete",
        401 "Already subscribed", 402 "Client has too many subscriptions",
        403 "Service has too many subscriptions", 404 "Subscription not found",
        405 "Service not subscribed", 406 "Invalid XML escaping".
        Service-specific ERROR messages may also be sent.
    - name: description
      type: string

# Discovery - sub-device presence:
- id: alive
  type: object
  description: 'ALIVE [sub-device] [udn] - sent on connect for each enabled sub-device, and on re-enable'
  properties:
    - name: sub_device
      type: string
    - name: udn
      type: string
      description: Unique Device Name (URN format, e.g. "4c494e4e-0050-c221-71e5-df000003013f")

# Discovery - sub-device removal:
- id: bye
  label: BYEBYE
  type: object
  description: 'BYEBYE [sub-device] [udn] - sent on sub-device disable, and for all sub-devices on reboot (after which LPEC connection is closed by device)'
  properties:
    - name: sub_device
      type: string
    - name: udn
      type: string
```

## Variables
```yaml
# Variables exposed via EVENT messages after SUBSCRIBE.
# From source EVENT example (Ds/Product service):
- id: ProductName
  type: string
  description: Friendly product name (e.g. "Sneaky Music DS")
- id: ProductRoom
  type: string
  description: Room name the product belongs to (e.g. "Main Room")
- id: ProductStandby
  type: boolean
  description: true when product is in standby
- id: ProductSourceIndex
  type: integer
  description: Currently selected source index
# From source example (Preamp/Preamp service):
- id: Volume
  type: integer
  description: Preamp volume (0-100)
```

## Events
```yaml
# Subscriptions produce unsolicited EVENT messages when variables change.
# Format: EVENT [subscription-id] [sequence-no] [var1-name] "[var1]" ...
# Only changed variables are reported.
# A sequence number of 0 indicates the initial state dump (all evented variables).
# Sequence numbers wrap around to 1 after reaching 2^32-1.
#
# Sub-device lifecycle messages on the same LPEC connection:
# - ALIVE [sub-device] [udn]    on initial connect (per enabled sub-device), and on re-enable
# - BYEBYE [sub-device] [udn]   on sub-device disable, and for all sub-devices on reboot
#   (followed by LPEC connection close on reboot)
# When a sub-device is disabled, all subscriptions to its services are forcibly
# revoked - BYEBYE is commonly preceded by a number of unsolicited UNSUBSCRIBE messages.
#
# Subscription limits:
# - Up to 16 services may be subscribed simultaneously per device
# - Up to 4 simultaneous LPEC sessions per device
```

## Macros
```yaml
# PIN-based presets (Ds/Pins service):
# - Invoke a PIN preset by ID
# - Read PIN contents with filter
# - Get live PIN ID array
# Note: PIN numbers may change after reboot if recently altered.
# Requires Davaar 67+ for PIN LPEC functions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
The LPEC protocol is accessed via raw TCP socket on port 23. Each product supports up to 4 simultaneous LPEC sessions. A known bug causes the first command after initial ALIVE messages to generate an error — workaround is to send a blank command immediately after ALIVE messages are received.

Source selection via SetSourceIndex is not stable across firmware versions or when sources are disabled. Use SetSourceBySystemName or SetSourceIndexByName for reliable source selection in Davaar 50+.

Service discovery is done via UPnP, with device descriptions available at `http://[device-ip]:55178/Ds/device.xml`. Specific service descriptions (e.g., Media, Preamp) are at corresponding paths.
<!-- UNRESOLVED: device.xml and service.xml URLs are derived from the protocol spec example — verify against actual device -->

<!-- Source TELNET session-management tip: "Some Crestron processors will re-open TELNET ports without closing existing ones. So it is recommended that on any control device, if the Touchpanel is asleep the TELNET connection is closed." -->

<!-- Source contains a self-contradiction: connection section states "The Linn DS can only support up to 4 simultaneous sessions" while "Other Considerations" states "Each product supports only one concurrent LPEC session." This spec uses the 4-session figure (from the connection section). -->

<!-- LPEC argument format: all input/output arguments are XML-escaped and enclosed in double-quotes per source. -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
retrieved_at: 2026-06-03T13:49:00.798Z
last_checked_at: 2026-06-04T06:27:09.603Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:27:09.603Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literal source commands with correct transport parameters (TCP port 23, no auth). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "no explicit SetStandby / power on/off in source; ProductStandby is reported via EVENT but no documented ACTION mutates it"
- "no safety warnings or interlock procedures stated in source"
- "device.xml and service.xml URLs are derived from the protocol spec example — verify against actual device"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
