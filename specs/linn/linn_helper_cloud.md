---
schema_version: ai4av-public-spec-v1
device_id: linn/linn-ds
entity_id: linn_helper
spec_id: admin/linn-lpec-protocol
revision: 1
author: admin
title: "Linn LPEC Protocol Control Spec"
status: published
manufacturer: Linn
manufacturer_key: linn
model_family: "Linn DS"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn DS"
    - "Linn DSI"
    - "Linn DSM"
    - "Linn Preamp"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america
  - https://docs.linn.co.uk/wiki
source_documents:
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:25:14.716Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/index.php/RS232
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:15.237Z
  - title: "Linn public source"
    url: https://applicationmarket.crestron.com/linn-genki-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:16.144Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:17.027Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:25:39.860Z
retrieved_at: 2026-04-26T16:25:39.860Z
last_checked_at: 2026-04-23T08:06:15.911Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:06:15.911Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions matched literally in source; transport port and auth verified; full command vocabulary represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Linn LPEC Protocol Control Spec

## Summary
LPEC is Linn's raw TCP socket control protocol for DS/DSI/DSM players and preamps. Connection on port 23. Clients send ACTION/SUBSCRIBE/UNSUBSCRIBE messages; device responds with RESPONSE/EVENT/ERROR. No authentication required.

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: none
```

## Traits
```yaml
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (usually "0")
    - name: speed
      type: string
      description: Speed (usually "1")
- id: pause
  label: Pause
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (usually "0")
- id: next
  label: Next Track
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (usually "0")
- id: previous
  label: Previous Track
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (usually "0")
- id: get_volume
  label: Get Volume
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (usually "0")
    - name: channel
      type: string
      description: Channel (e.g., "Master")
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: instance_id
      type: string
    - name: channel
      type: string
    - name: level
      type: integer
      description: Volume level (0-100)
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: mute
      type: boolean
      description: "true" to mute, "false" to unmute
- id: set_source_index
  label: Set Source by Index
  kind: action
  params:
    - name: index
      type: integer
      description: Source index number
- id: set_source_by_system_name
  label: Set Source by System Name
  kind: action
  params:
    - name: name
      type: string
      description: Source system name (e.g., "Balanced", "Radio")
- id: set_source_index_by_name
  label: Set Source by Name
  kind: action
  params:
    - name: name
      type: string
      description: Source name (e.g., "CD12")
- id: get_source
  label: Get Source Info
  kind: action
  params:
    - name: index
      type: integer
      description: Source index
- id: invoke_pin
  label: Invoke PIN
  kind: action
  params:
    - name: id
      type: integer
      description: PIN ID number
- id: read_pin_list
  label: Read PIN List
  kind: action
  params:
    - name: index
      type: string
      description: PIN index
- id: get_pin_array
  label: Get PIN Array
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: response
  type: object
  description: RESPONSE "[outarg1]" "[outarg2]" ... — replies to ACTION, contains all output args
- id: subscribe_ack
  type: integer
  description: SUBSCRIBE [subscription-id] — confirms subscription, id used for unsubscribe
- id: event
  type: object
  description: EVENT messages contain variable name/value pairs for subscribed services
- id: alive
  type: object
  description: ALIVE [sub-device] [udn] — sent on connect for each enabled sub-device
- id: byebye
  type: object
  description: BYEBYE [sub-device] [udn] — sent when sub-device disabled
- id: error
  type: object
  description: ERROR [code] "[description]" — error response
```

## Variables
```yaml
- id: volume
  type: integer
  description: Current volume level (0-100)
- id: mute
  type: boolean
  description: Current mute state
- id: source_index
  type: integer
  description: Current source selection index
- id: source_name
  type: string
  description: Current source system name
- id: product_name
  type: string
  description: Device product name
- id: product_room
  type: string
  description: Device room name
- id: product_standby
  type: boolean
  description: Device standby state
```

## Events
```yaml
- id: state_change
  type: object
  description: Unsolicited EVENT messages sent when subscribed variables change
- id: device_event
  type: object
  description: BYEBYE/ALIVE messages when sub-devices enabled/disabled
```

## Macros
```yaml
- id: subscribe_service
  description: Send SUBSCRIBE [sub-device]/[service] to receive ongoing state updates
- id: unsubscribe_service
  description: Send UNSUBSCRIBE [subscription-id] or UNSUBSCRIBE [sub-device]/[service]
- id: unsubscribe_all
  description: Send UNSUBSCRIBE (no args) to unsubscribe all services
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Max 4 simultaneous LPEC sessions. Crestron processors may reopen Telnet ports without closing existing ones — close connection when touchpanel asleep. First command after ALIVE may error — send blank command to clear.

Source names: Playlist(0), Radio(1), Songcast(2), NetAux(3), UpnpAv(4), plus fixed inputs Analog1/Phono/Balanced/Front Aux/HDMI1/SPDIF1/TOSLINK1 with configurable names.

PIN numbers may change after reboot if recently altered.

<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: LPEC protocol version not stated -->

## Provenance

```yaml
source_urls:
  - https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://applicationmarket.crestron.com/linn-genki-north-america
  - https://docs.linn.co.uk/wiki
source_documents:
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:25:14.716Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/index.php/RS232
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:15.237Z
  - title: "Linn public source"
    url: https://applicationmarket.crestron.com/linn-genki-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:16.144Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:25:17.027Z
  - title: "Linn public source"
    url: https://docs.linn.co.uk/wiki/images/d/d6/Genki_rs232_commands.PDF
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T16:25:39.860Z
retrieved_at: 2026-04-26T16:25:39.860Z
last_checked_at: 2026-04-23T08:06:15.911Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:06:15.911Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions matched literally in source; transport port and auth verified; full command vocabulary represented."
```

## Known Gaps

```yaml
[]
```
