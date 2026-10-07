---
spec_id: admin/somfy-sdn-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Somfy SDN Series Control Spec"
manufacturer: Somfy
model_family: "Somfy SDN Series"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy SDN Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:50:47.917Z
last_checked_at: 2026-10-01T12:00:27.743Z
generated_at: 2026-10-01T12:00:27.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "motor-specific speed range requires technical datasheet"
  - "unsolicited event messages not distinguished from POST responses in source"
  - "no explicit multi-step macros documented in source"
  - "exact binary frame payload encoding for each command requires message-header values, addresses, length/ACK bits, data bytes, and checksum calculation; source provides message identifiers and data structures but not complete per-command byte-frame examples."
  - "protocol version not stated in source"
  - "firmware compatibility range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T12:00:27.743Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec action mnemonics and hex codes appear verbatim in the source, shapes agree, and transport parameters are documented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Somfy Somfy SDN Series Control Spec

## Summary
Somfy SDN Series devices communicate over an asynchronous RS485 bus using addressed binary messages. Source documents device management, configuration, movement control, status queries, acknowledgments, timing, collision handling, and checksum behavior.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  character_coding: NRZ
  bit_order: least_significant_bit_first
  data_inversion: true
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- routable  # inferred from point-to-point, group, and broadcast addressing
- queryable  # inferred from GET_* status and configuration messages
- levelable  # inferred from position percentage control
```

## Actions
```yaml
- id: get_node_addr
  label: Get Node ID
  kind: query
  command: "MSG=40h GET_NODE_ADDR"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h SET_GROUP_ADDR"
  params:
    - name: group_index
      type: integer
      description: Group table entry, 0 through 15
    - name: group_id
      type: integer
      description: 24-bit group address

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h GET_GROUP_ADDR"
  params:
    - name: group_index
      type: integer
      description: Group table entry, 0 through 15

- id: ack
  label: Acknowledge
  kind: feedback
  command: "MSG=7Fh ACK"
  params: []

- id: nack
  label: Negative Acknowledge
  kind: feedback
  command: "MSG=6Fh NACK"
  params:
    - name: error_code
      type: integer
      description: 01h data out of range, 10h unknown message, 11h message length error, FFh busy

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "MSG=74h GET_NODE_APP_VERSION"
  params: []

- id: set_node_label
  label: Set User-defined Text Label
  kind: action
  command: "MSG=55h SET_NODE_LABEL"
  params:
    - name: label
      type: string
      description: 16-character label; pad shorter values with spaces

- id: get_node_label
  label: Get User-defined Text Label
  kind: query
  command: "MSG=45h GET_NODE_LABEL"
  params: []

- id: set_local_ui
  label: Set Local UI State
  kind: action
  command: "MSG=17h SET_LOCAL_UI"
  params:
    - name: function
      type: integer
      description: 00h enable/unlock, 01h disable/lock
    - name: ui_index
      type: integer
      description: 00h all local controls and feedbacks; 01h DCT input; 02h local stimuli; 03h local radio access; 04h Touch Motion; 05h LEDs
    - name: priority
      type: integer
      description: Priority 00h through FFh

- id: get_local_ui
  label: Get Local UI State
  kind: query
  command: "MSG=27h GET_LOCAL_UI"
  params:
    - name: ui_index
      type: integer
      description: UI index

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h SET_MOTOR_IP"
  params:
    - name: function
      type: integer
      description: 00h delete, 01h current position, 03h specified percentage, 04h divide full range
    - name: ip_index
      type: integer
      description: Intermediate-position index, 1 through 16
    - name: value
      type: integer
      description: Function-dependent 16-bit value

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h GET_MOTOR_IP"
  params:
    - name: ip_index
      type: integer
      description: Intermediate-position index, 1 through 16

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "MSG=13h SET_MOTOR_ROLLING_SPEED"
  params:
    - name: up_speed
      type: integer
      description: Speed during upward movement; range depends on motor technical datasheet
    - name: down_speed
      type: integer
      description: Speed during downward movement; range depends on motor technical datasheet
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements; range depends on motor technical datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "MSG=23h GET_MOTOR_ROLLING_SPEED"
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h SET_NETWORK_LOCK"
  params:
    - name: function
      type: integer
      description: 00h unlock, 01h lock at current position, 03h save across power cycle, 04h do not save across power cycle
    - name: priority
      type: integer
      description: Priority 00h through FFh

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "MSG=26h GET_NETWORK_LOCK"
  params: []

- id: move_to_position
  label: Move to Position
  kind: action
  command: "MSG=03h CTRL_MOVETO"
  params:
    - name: function
      type: integer
      description: 00h down limit, 01h up limit, 02h intermediate position, 04h percentage of full travel range
    - name: position
      type: integer
      description: Function-dependent position or intermediate-position index

- id: stop
  label: Stop
  kind: action
  command: "MSG=02h CTRL_STOP"
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch GET_MOTOR_POSITION"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh GET_MOTOR_STATUS"
  params: []
```

## Feedbacks
```yaml
- id: node_addr
  type: object
  description: Device NodeID included in POST_NODE_ADDR message header

- id: group_addr
  type: object
  description: Group index and associated 24-bit GroupID

- id: firmware_revision
  type: object
  description: Firmware part number, major revision letter, and revision number

- id: node_label
  type: string
  description: 16-character user-defined device label

- id: local_ui_state
  type: object
  description: UI index, enabled/disabled status, source address, and priority

- id: motor_ip
  type: object
  description: Intermediate-position index and percentage; FFh indicates position not set

- id: motor_rolling_speed
  type: object
  description: Up, down, and slow motor speeds

- id: network_lock_state
  type: object
  description: Lock status, source address, priority, and saved state

- id: motor_position
  type: object
  description: Position pulses, percentage, reserved byte, and intermediate-position index

- id: motor_status
  type: object
  description: Status, direction, source, and cause

- id: motor_status_values
  type: enum
  values:
    - stopped
    - running
    - blocked
    - locked

- id: motor_direction_values
  type: enum
  values:
    - down
    - up
    - unknown

- id: motor_status_cause_values
  type: enum
  values:
    - target_reached
    - explicit_command
    - wink
    - obstacle_detection
    - over_current_protection
    - thermal_protection
    - run_time_exceeded
    - timeout_exceeded
    - reset_or_power_up
```

## Variables
```yaml
- id: group_index
  type: integer
  range: [0, 15]

- id: group_id
  type: integer
  description: 24-bit group address

- id: label
  type: string
  length: 16

- id: ui_priority
  type: integer
  range: [0, 255]

- id: intermediate_position_percentage
  type: integer
  range: [0, 100]

- id: motor_speed
  type: integer
  description: Device-specific speed value; exact range unresolved
  # UNRESOLVED: motor-specific speed range requires technical datasheet
```

## Events
```yaml
<!-- UNRESOLVED: unsolicited event messages not distinguished from POST responses in source -->
```

## Macros
```yaml
<!-- UNRESOLVED: no explicit multi-step macros documented in source -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: network_locked
    effect: Movement and limit-changing messages are rejected unless CTRL_NETWORK_LOCK priority is equal to or higher than lock priority
  - condition: obstacle_detected
    effect: Motor status reports blocked state and obstacle-detection cause
  - condition: over_current_protection
    effect: Motor status reports over-current-protection cause
  - condition: thermal_protection
    effect: Motor status reports blocked state and thermal-protection cause
```

## Notes
SDN messages use an 11-byte minimum and 32-byte maximum frame. Frames contain message identifier, acknowledgment/length byte, node type, source and destination addresses, data, and checksum. Source and destination addresses are 24-bit LSBF values.

Checksum is calculated by adding the complement of every byte from Byte 1 through Byte n-2. All data bits must be inverted before transmission. Bus timing requires at least 10 ms inactivity before a master request, 3 ms bus-free timeout, and 5–255 ms slave reply delay.

Avoid requesting feedback or acknowledgments in group or broadcast addressing modes because RS485 collisions may prevent replies.

<!-- UNRESOLVED: exact binary frame payload encoding for each command requires message-header values, addresses, length/ACK bits, data bytes, and checksum calculation; source provides message identifiers and data structures but not complete per-command byte-frame examples. -->
<!-- UNRESOLVED: protocol version not stated in source -->
<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-07-21T23:50:47.917Z
last_checked_at: 2026-10-01T12:00:27.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:00:27.743Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec action mnemonics and hex codes appear verbatim in the source, shapes agree, and transport parameters are documented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "motor-specific speed range requires technical datasheet"
- "unsolicited event messages not distinguished from POST responses in source"
- "no explicit multi-step macros documented in source"
- "exact binary frame payload encoding for each command requires message-header values, addresses, length/ACK bits, data bytes, and checksum calculation; source provides message identifiers and data structures but not complete per-command byte-frame examples."
- "protocol version not stated in source"
- "firmware compatibility range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
