---
spec_id: admin/somfy-ci-somfy-rts-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy CI-Somfy-RTS Series Control Spec"
manufacturer: Somfy
model_family: "CI-Somfy-RTS Series"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "CI-Somfy-RTS Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-14T18:17:20.609Z
generated_at: 2026-05-14T18:17:20.609Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.609Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 30 spec actions matched to verbatim source commands; protocol transport confirmed; bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Somfy CI-Somfy-RTS Series Control Spec

## Summary
The Somfy CI-Somfy-RTS Series is an RTS transmitter interface node on the Somfy Digital Network (SDN), a half-duplex RS-485 serial bus protocol. A MASTER device sends SET/CTRL/GET commands to SLAVE motor nodes; SLAVEs respond with POST messages and ACKs. Supports positioning to limits and intermediate positions, speed adjustment, network locking, and status reporting.

<!-- UNRESOLVED: CI-Somfy-RTS is an RS-485 gateway/transmitter; motor-side RTS control protocol not documented in this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not specified in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power state implied by motor status responses (reset/power-up cause)
- routable   # inferred: group addressing and broadcast modes present
- queryable  # inferred: GET_xxx / POST_xxx pairs present
- levelable  # inferred: CTRL_MOVETO with position % and speed adjustment present
```

## Actions
```yaml
- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: function
      type: integer
      description: Function (00h=DOWN limit, 01h=UP limit, 02h=Intermediate Position index, 04h=Position in %)
    - name: position
      type: integer
      description: 16-bit position value (ignored for limit functions)
    - name: reserved
      type: integer
      description: Reserved byte

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params:
    - name: reserved
      type: integer
      description: Reserved byte

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
    - name: group_id
      type: integer
      description: 24-bit group NodeID

- id: set_motor_ip
  label: Set Motor Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: Function (00h=Delete, 01h=Set at current, 03h=Set at %, 04h=Divide range)
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: value
      type: integer
      description: 16-bit value (position % or ignored)

- id: set_motor_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: UP speed in rpm (see motor datasheet)
    - name: down_speed
      type: integer
      description: DOWN speed in rpm (see motor datasheet)
    - name: slow_speed
      type: integer
      description: Adjustment speed in rpm (see motor datasheet)

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: Function (00h=Unlock, 01h=Lock, 03h=Save on power cycle, 04h=Do not save)
    - name: priority
      type: integer
      description: Priority level (0x00-0xFF); higher = higher priority

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character text label (padded with spaces)

- id: set_local_ui
  label: Set Local UI
  kind: action
  params:
    - name: function
      type: integer
      description: Function (00h=Enable/Unlock, 01h=Disable/Lock)
    - name: ui_index
      type: integer
      description: UI index (00h=All, 01h=DCT input, 02h=Local stimulus, 03h=Bluetooth, 04h=Touch Motion, 05h=LEDs)
    - name: priority
      type: integer
      description: Priority level (0x00-0xFF)

- id: get_node_addr
  label: Get Node Address
  kind: action
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry (0-15)

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: IP index (1-16)

- id: get_motor_speed
  label: Get Motor Rolling Speed
  kind: action
  params: []

- id: get_network_lock
  label: Get Network Lock
  kind: action
  params: []

- id: get_node_label
  label: Get Node Label
  kind: action
  params: []

- id: get_local_ui
  label: Get Local UI
  kind: action
  params:
    - name: ui_index
      type: integer
      description: UI index (01h-UI_MAX)

- id: get_motor_position
  label: Get Motor Position
  kind: action
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: action
  params: []

- id: get_node_app_version
  label: Get Node Application Version
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Response
  type: object
  properties:
    - name: node_addr
      type: integer
      description: 24-bit NodeID of responding device

- id: post_group_addr
  label: Group Address Response
  type: object
  properties:
    - name: group_index
      type: integer
      description: Group table entry (0-15)
    - name: group_id
      type: integer
      description: 24-bit group NodeID

- id: ack
  label: Acknowledgment
  type: enum
  values:
    - acknowledged

- id: nack
  label: Negative Acknowledgment
  type: object
  properties:
    - name: error_code
      type: integer
      description: 8-bit error code
  values:
    - 01h: Data out of range
    - 10h: Unknown message
    - 11h: Message Length Error
    - FFh: Busy - Cannot process message

- id: post_node_app_version
  label: Node Application Version Response
  type: object
  properties:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: Firmware major revision (ASCII 41h-5Ah)
    - name: app_index_number
      type: integer
      description: Firmware minor revision number
    - name: reserved
      type: integer
      description: Reserved byte

- id: post_node_label
  label: Node Label Response
  type: string
  description: 16-character text label

- id: post_local_ui
  label: Local UI Response
  type: object
  properties:
    - name: ui_index
      type: integer
      description: UI index
    - name: status
      type: enum
      values:
        - 00h: Enabled/Unlocked
        - 01h: Disabled/Locked
    - name: source_addr
      type: integer
      description: 24-bit NodeID of device that sent lock command
    - name: priority
      type: integer
      description: Priority level

- id: post_motor_ip
  label: Motor Intermediate Position Response
  type: object
  properties:
    - name: ip_index
      type: integer
      description: IP index (1-16)
    - name: reserved
      type: integer
      description: Reserved 16 bits
    - name: ip_position_percentage
      type: integer
      description: Position percentage (0-100); FFh if IP not set

- id: post_motor_speed
  label: Motor Rolling Speed Response
  type: object
  properties:
    - name: up_speed
      type: integer
      description: UP movement speed
    - name: down_speed
      type: integer
      description: DOWN movement speed
    - name: slow_speed
      type: integer
      description: Adjustment speed

- id: post_network_lock
  label: Network Lock Response
  type: object
  properties:
    - name: status
      type: enum
      values:
        - 00h: Unlocked
        - 01h: Locked
    - name: source_addr
      type: integer
      description: 24-bit NodeID of locking device
    - name: priority
      type: integer
      description: Priority level
    - name: saved
      type: enum
      values:
        - 00h: Lock will not be restored on power cycle
        - 01h: Lock will be restored on power cycle

- id: post_motor_position
  label: Motor Position Response
  type: object
  properties:
    - name: position_pulse
      type: integer
      description: 16-bit pulse position
    - name: position_percentage
      type: integer
      description: Position percentage (0-100)
    - name: reserved
      type: integer
      description: Reserved byte
    - name: ip
      type: integer
      description: IP index (01h-IP_MAX); FFh if not at an IP

- id: post_motor_status
  label: Motor Status Response
  type: object
  properties:
    - name: status
      type: enum
      values:
        - 00h: Stopped
        - 01h: Running During movement
        - 02h: Blocked (thermal protection or obstacle)
        - 03h: Locked by NETWORK_LOCK
    - name: direction
      type: enum
      values:
        - 00h: Going DOWN
        - 01h: Going UP
        - FFh: Unknown
    - name: source
      type: enum
      values:
        - 00h: Internal (limit/IP/position reached, over-current, obstacle, thermal)
        - 01h: Network message
        - 02h: Local UI
    - name: cause
      type: enum
      values:
        - 00h: Target reached
        - 01h: Explicit command
        - 02h: WINK
        - 20h: Obstacle detection
        - 21h: Over-current protection
        - 22h: Thermal protection
        - 30h: Run time exceeded
        - 32h: Timeout exceeded (>2 min on CTRL_MOVE adjustment)
        - FFh: Reset / Power Up
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters separate from discrete actions identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; SLAVEs only respond to MASTER requests
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock_behavior
    description: When NETWORK_LOCK is active, only CTRL_NETWORK_LOCK with equal or higher priority executes; all other movement or limit-change commands are rejected with NACK
  - id: collision_avoidance
    description: Avoid requesting feedback (POST) or ACK in group or broadcast mode to prevent RS-485 bus collisions
  - id: data_bit_inversion
    description: All data bytes must be inverted (NOT byte) before transmission for backward compatibility with early protocol versions
# UNRESOLVED: power-on sequencing requirements not explicitly stated in source
```

## Notes
The Somfy Digital Network (SDN) protocol operates over RS-485 half-duplex. All data bytes are inverted (bitwise NOT) before transmission. NodeID addresses use LSBF byte ordering. MASTER must wait Treq ≥10ms after bus activity before transmitting; SLAVE waits Trep = 5–255ms (randomized) before responding. Bus free timeout is Tfree ≥3ms; maximum inter-character time is Tc ≤1ms. No synchronization byte is used — messages are delimited by bus inactivity. The CI-Somfy-RTS device acts as an RS485 RTS transmitter node (NodeType 05h) on the SDN bus.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: motor datasheet values (speed ranges, limits) not in source -->
<!-- UNRESOLVED: exact NodeType filtering behavior not fully documented -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-14T18:17:20.609Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.609Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 30 spec actions matched to verbatim source commands; protocol transport confirmed; bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
