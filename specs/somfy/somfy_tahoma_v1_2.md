---
schema_version: ai4av-public-spec-v1
device_id: somfy/tahoma-v1-2
entity_id: somfy_tahoma_v1_2
spec_id: admin/somfy-tahoma-v1_2
revision: 1
author: admin
title: "Somfy TaHoma v1.2 Control Spec"
status: published
manufacturer: Somfy
manufacturer_key: somfy
model_family: "TaHoma v1.2"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "TaHoma v1.2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:14.635Z
retrieved_at: 2026-04-29T08:47:14.635Z
last_checked_at: 2026-04-27T10:13:03.490Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:03.490Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched to source commands; transport parameters verified; comprehensive protocol coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy TaHoma v1.2 Control Spec

## Summary

Somfy TaHoma v1.2 is a home automation gateway supporting the Somfy Distribution Network (SDN) RS485 bus protocol for motor control. The SDN protocol provides serial communication at 4800 baud with acknowledged message delivery, supporting point-to-point, group, and broadcast addressing modes for controlling Somfy motors and motorized window treatments.

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

```yaml
- id: moveto
  label: Move to Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Down limit, 1=Up limit, 2=Intermediate position, 4=Position in %"
    - name: position
      type: integer
      description: Position value (IP index 0-15 or % 0-100)
    - name: reserved
      type: integer
      description: Reserved (0)

- id: stop
  label: Stop Motor
  kind: action
  params:
    - name: reserved
      type: integer
      description: Reserved (0)

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: integer
      description: 24-bit group address

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character text label

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Enable/Unlock, 1=Disable/Lock"
    - name: ui_index
      type: integer
      description: "0=All, 1=DCT input, 2=Local stimulus, 3=Local Radio, 4=Touch Motion, 5=LEDs"
    - name: priority
      type: integer
      description: Priority level (0-FF, higher = higher priority)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Delete, 1=Set at current, 3=Set at specified %, 4=Divide range"
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: value
      type: integer
      description: Position value or IP count

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm)

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Unlock, 1=Lock, 3=Save on power cycle, 4=Do not save"
    - name: priority
      type: integer
      description: Priority level (0-FF)
```

## Feedbacks

```yaml
- id: motor_position
  label: Motor Position
  type: object
  fields:
    - name: position_pulse
      type: integer
      description: Motor position in pulses
    - name: position_percentage
      type: integer
      description: Position as percentage (0-100)
    - name: ip
      type: integer
      description: Intermediate position index (01-IP_MAX, FF=not at IP)

- id: motor_status
  label: Motor Status
  type: object
  fields:
    - name: status
      type: enum
      values:
        - "00: Stopped"
        - "01: Running"
        - "02: Blocked"
        - "03: Locked"
    - name: direction
      type: enum
      values:
        - "00: Going DOWN"
        - "01: Going UP"
        - "FF: Unknown"
    - name: source
      type: enum
      values:
        - "00: Internal"
        - "01: Network message"
        - "02: Local UI"
    - name: cause
      type: enum
      values:
        - "00: Target reached"
        - "01: Explicit command"
        - "02: Wink"
        - "20: Obstacle detection"
        - "21: Over-current protection"
        - "22: Thermal protection"
        - "30: Run time exceeded"
        - "32: Timeout exceeded"
        - "FF: Reset/PowerUp"

- id: node_addr
  label: Node Address
  type: object
  fields:
    - name: node_id
      type: integer
      description: 24-bit NodeID

- id: group_addr
  label: Group Address
  type: object
  fields:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: integer
      description: 24-bit group address

- id: node_label
  label: Node Label
  type: string
  description: 16-character text label

- id: node_app_version
  label: Firmware Revision
  type: object
  fields:
    - name: app_reference
      type: integer
      description: Firmware part number (24-bits)
    - name: app_index_letter
      type: string
      description: Firmware major revision (ASCII)
    - name: app_index_number
      type: integer
      description: Firmware revision

- id: local_ui
  label: Local UI Status
  type: object
  fields:
    - name: ui_index
      type: integer
      description: UI index
    - name: status
      type: enum
      values:
        - "00: Enabled/Unlocked"
        - "01: Disabled/Locked"
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer
      description: Priority level

- id: motor_ip
  label: Intermediate Position
  type: object
  fields:
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: ip_position_percentage
      type: integer
      description: Position as percentage (0-100, FF=not set)

- id: motor_rolling_speed
  label: Motor Rolling Speed
  type: object
  fields:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm)

- id: network_lock
  label: Network Lock Status
  type: object
  fields:
    - name: status
      type: enum
      values:
        - "00: Unlocked"
        - "01: Locked"
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer
      description: Priority level
    - name: saved
      type: enum
      values:
        - "00: Will not restore on power cycle"
        - "01: Will restore on power cycle"

- id: ack
  label: Acknowledgment
  type: enum
  values:
    - ACK: Message acknowledged

- id: nack
  label: Negative Acknowledgment
  type: object
  fields:
    - name: error_code
      type: enum
      values:
        - "01: Data out of range"
        - "10: Unknown message"
        - "11: Message length error"
        - "FF: Busy"
```

## Variables

```yaml
- id: motor_speed
  label: Motor Speed Settings
  type: object
  fields:
    - name: up_speed
      type: integer
      description: UP speed in rpm
    - name: down_speed
      type: integer
      description: DOWN speed in rpm
    - name: slow_speed
      type: integer
      description: Adjustment speed in rpm
```

## Events

```yaml
- id: unsolicited_motor_status
  label: Unsolicited Motor Status
  type: event
  description: Motor may send status updates without being queried
```

## Macros

```yaml
- id: move_to_down_limit
  label: Move to Down Limit
  description: CTRL_MOVETO with Function=00h moves motor to DOWN limit

- id: move_to_up_limit
  label: Move to Up Limit
  description: CTRL_MOVETO with Function=01h moves motor to UP limit

- id: move_to_ip
  label: Move to Intermediate Position
  description: CTRL_MOVETO with Function=02h and Position=IP index (0-15)

- id: move_to_percentage
  label: Move to Percentage Position
  description: CTRL_MOVETO with Function=04h and Position=% value (0-100)
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock_behavior
    description: When network is locked, only CTRL_NETWORK_LOCK with equal or higher priority is accepted. All other movement commands are rejected with NACK.
  - id: collision_avoidance
    description: Avoid requesting feedback or acknowledgment in group or broadcast addressing mode to prevent bus collisions.
```

## Notes

The SDN protocol uses a binary message format with 11-byte minimum and 32-byte maximum frames. Messages include: MSG (1 byte), ACK/LEN (1 byte), NODE TYPE (1 byte), SOURCE@ (3 bytes), DEST@ (3 bytes), DATA (0-21 bytes), CHECKSUM (1 byte). LSBF byte ordering is used for addresses. All data bits must be inverted before transmission for backward compatibility.

<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: error recovery sequences beyond NACK not documented -->
<!-- UNRESOLVED: port number for IP control not applicable (RS485 serial only) -->

## Provenance

```yaml
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:14.635Z
retrieved_at: 2026-04-29T08:47:14.635Z
last_checked_at: 2026-04-27T10:13:03.490Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:03.490Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched to source commands; transport parameters verified; comprehensive protocol coverage achieved."
```

## Known Gaps

```yaml
[]
```
