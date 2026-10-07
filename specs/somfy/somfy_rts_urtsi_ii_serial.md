---
spec_id: admin/somfy-rts-urtsi-ii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy RTS URTSI II Control Spec"
manufacturer: Somfy
model_family: "RTS URTSI II"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "RTS URTSI II"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-05-21T23:00:54.412Z
last_checked_at: 2026-10-01T10:51:05.924Z
generated_at: 2026-10-01T10:51:05.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical RS-232 port number on URTSI II not stated in source"
  - "byte inversion requirement noted in spec - clarify if this is handled by device firmware or must be applied by host"
  - "SDN protocol does not have independent settable parameters beyond Actions above."
  - "SDN is half-duplex MASTER/SLAVE - SLAVEs only respond to requests."
  - "no multi-step sequences defined in source."
  - "physical RS-232 port number on URTSI II gateway not stated"
  - "RS-485 bus default port number not stated"
  - "firmware version compatibility range not stated"
  - "voltage/current/power specifications not in source"
  - "byte inversion handling (host applies or device handles) not confirmed"
verification:
  verdict: verified
  checked_at: 2026-10-01T10:51:05.924Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions map 1:1 to the 18 MASTER-issued commands in source §6; POST_xxx responses represented as Feedbacks; transport values verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Somfy RTS URTSI II Control Spec

## Summary
Somfy RTS URTSI II is an RS-485 to RS-232 gateway that translates serial commands into SOMFY Digital Network (SDN) protocol for motor control. Supports half-duplex MASTER/SLAVE communication on RS-485 bus. Control interface is RS-232 at 4800 baud, 8 data bits, odd parity. SDN bus operates at 4800 baud RS-485 with 3-byte NodeID addressing, group addressing, and broadcast modes.

<!-- UNRESOLVED: physical RS-232 port number on URTSI II not stated in source -->

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
  # UNRESOLVED: byte inversion requirement noted in spec - clarify if this is handled by device firmware or must be applied by host
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred: CTRL_MOVETO, CTRL_STOP present
- queryable    # inferred: GET_MOTOR_POSITION, GET_MOTOR_STATUS present
- routable     # inferred: CTRL_MOVETO with IP index, group addressing present
- levelable    # inferred: position commands with percentage values present
```

## Actions
```yaml
- id: ctrl_moveto
  label: Move to Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Down limit, 1=Up limit, 2=Intermediate position, 4=Position in %"
    - name: position
      type: integer
      description: Position value (IP index 0-15 or % 0-100 depending on function)

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Unlock, 1=Lock, 3=Save lock on power cycle, 4=Do not save lock on power cycle"
    - name: priority
      type: integer
      description: Priority level 0-FFh (higher = more important)

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  params: []

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Delete IP, 1=Set at current position, 3=Set at specified position %, 4=Divide full range"
    - name: ip_index
      type: integer
      description: IP entry index 1-16
    - name: value
      type: integer
      description: Position value or IP count depending on function

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  params:
    - name: ip_index
      type: integer
      description: IP entry index 1-16

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "0=Enable/Unlock, 1=Disable/Lock"
    - name: ui_index
      type: integer
      description: "0=All, 1=DCT input, 2=Local stimulus, 3=Radio/Bluetooth, 4=Touch Motion, 5=LEDs"
    - name: priority
      type: integer
      description: Priority level 0-FFh

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  params:
    - name: ui_index
      type: integer
      description: UI index to query

- id: set_motor_rolling_speed
  label: Set Motor Speed
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
    - name: ip_index
      type: integer
      description: IP entry index 1-16
    - name: ip_position_percentage
      type: integer
      description: IP position 0-100 (FFh if not set)

- id: get_motor_rolling_speed
  label: Get Motor Speed
  kind: query
  params: []

- id: set_node_label
  label: Set Device Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character text label (padded with spaces)

- id: get_node_label
  label: Get Device Label
  kind: query
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: query
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry 0-15
    - name: group_id
      type: string
      description: 24-bit group NodeID

- id: get_group_addr
  label: Get Group Address
  kind: query
  params:
    - name: group_index
      type: integer
      description: Group table entry 0-15

- id: get_node_addr
  label: Get Node Address
  kind: query
  params: []

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Response
  type: object
  fields:
    - name: node_id
      type: string
      description: 3-byte NodeID (LSBF)

- id: post_group_addr
  label: Group Address Response
  type: object
  fields:
    - name: group_index
      type: integer
    - name: group_id
      type: string

- id: post_node_app_version
  label: Firmware Version Response
  type: object
  fields:
    - name: app_reference
      type: string
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: ASCII major revision (41h-5Ah)
    - name: app_index_number
      type: integer
      description: Firmware revision number

- id: post_node_label
  label: Device Label Response
  type: string

- id: post_local_ui
  label: Local UI Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [enabled, disabled]
    - name: source_addr
      type: string
      description: NodeID of locking device
    - name: priority
      type: integer

- id: post_motor_ip
  label: Intermediate Position Response
  type: object
  fields:
    - name: ip_index
      type: integer
    - name: reserved
      type: integer
    - name: ip_position_percentage
      type: integer
      description: "0-100, FFh if IP not set"

- id: post_motor_rolling_speed
  label: Motor Speed Response
  type: object
  fields:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: post_network_lock
  label: Network Lock Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
    - name: source_addr
      type: string
    - name: priority
      type: integer
    - name: saved
      type: boolean
      description: true if lock restored on power cycle

- id: post_motor_position
  label: Motor Position Response
  type: object
  fields:
    - name: position_pulse
      type: integer
      description: Raw position in pulses
    - name: position_percentage
      type: integer
      description: 0-100
    - name: reserved
      type: integer
    - name: ip
      type: integer
      description: "IP index 01h-10h, FFh if not at an IP"

- id: post_motor_status
  label: Motor Status Response
  type: object
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
    - name: direction
      type: enum
      values: [going_down, going_up, unknown]
    - name: source
      type: enum
      values: [internal, network, local_ui]
    - name: cause
      type: enum
      values:
        - target_reached
        - explicit_command
        - wink
        - obstacle_detection
        - over_current
        - thermal_protection
        - run_time_exceeded
        - timeout_exceeded
        - reset_power_up

- id: ack
  label: Acknowledgment
  type: enum
  values: [ack, nack]

- id: nack
  label: Negative Acknowledgment
  type: object
  fields:
    - name: error_code
      type: enum
      values:
        - data_out_of_range
        - unknown_message
        - message_length_error
        - busy_cannot_process
```

## Variables
```yaml
# UNRESOLVED: SDN protocol does not have independent settable parameters beyond Actions above.
# All configuration is performed via SET_xxx / CTRL_xxx commands.
```

## Events
```yaml
# UNRESOLVED: SDN is half-duplex MASTER/SLAVE - SLAVEs only respond to requests.
# No unsolicited event notifications defined in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Network lock blocks all movement and limit changes except CTRL_NETWORK_LOCK with equal/higher priority
  - Motor blocked if thermal protection or obstacle detection active
  - Collision avoidance: avoid ACK requests and status queries in group/broadcast mode
```

## Notes
SDN protocol uses LSBF (least significant bit first) byte order. All data bits must be inverted before transmission (NOT 58h = A7h example in source).

Master/SLAVE half-duplex — MASTER sends requests, SLAVEs only respond when polled.

Bus timing critical: Trep (slave response delay) varies 5ms-255ms and is partially randomized. Master must wait Treq=10ms after bus activity before transmitting.

NodeID is 3 bytes, fixed at manufacturing. Addresses recycled every 3-5 years.

<!-- UNRESOLVED: physical RS-232 port number on URTSI II gateway not stated -->
<!-- UNRESOLVED: RS-485 bus default port number not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: byte inversion handling (host applies or device handles) not confirmed -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-05-21T23:00:54.412Z
last_checked_at: 2026-10-01T10:51:05.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:51:05.924Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions map 1:1 to the 18 MASTER-issued commands in source §6; POST_xxx responses represented as Feedbacks; transport values verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical RS-232 port number on URTSI II not stated in source"
- "byte inversion requirement noted in spec - clarify if this is handled by device firmware or must be applied by host"
- "SDN protocol does not have independent settable parameters beyond Actions above."
- "SDN is half-duplex MASTER/SLAVE - SLAVEs only respond to requests."
- "no multi-step sequences defined in source."
- "physical RS-232 port number on URTSI II gateway not stated"
- "RS-485 bus default port number not stated"
- "firmware version compatibility range not stated"
- "voltage/current/power specifications not in source"
- "byte inversion handling (host applies or device handles) not confirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
