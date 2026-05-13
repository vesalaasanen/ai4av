---
spec_id: admin/somfy-somfy-connect-uai-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Somfy Connect UAI+ Control Spec"
manufacturer: Somfy
model_family: "Somfy Connect UAI+"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy Connect UAI+"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T15:20:01.954Z
generated_at: 2026-04-27T15:20:01.954Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T15:20:01.954Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "All 29 spec actions matched with verbatim msg_code values in source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy Somfy Connect UAI+ Control Spec

## Summary
The Somfy Connect UAI+ is an RS-485 bus interface for Somfy Digital Network (SDN) motorized shading devices. This spec covers the binary serial protocol used to control motors (move to position, stop), query motor status and position, configure intermediate positions, adjust speed (DC motors), manage groups, and lock network commands. The protocol uses an asynchronous serial link at 4800 baud with inverted data bits and a simple additive checksum.

<!-- UNRESOLVED: exact product dimensions, power specs, and pinout not in source -->
<!-- UNRESOLVED: flow control setting not explicitly stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable   # inferred from GET_MOTOR_POSITION, GET_MOTOR_STATUS, GET_NODE_APP_VERSION
- levelable   # inferred from MOVETO with percentage position, speed adjustment
```

## Actions
```yaml
- id: moveto
  label: Move to Position
  kind: action
  msg_code: "03h"
  params:
    - name: function
      type: enum
      values:
        - value: "00h"
          label: Move to DOWN limit
        - value: "01h"
          label: Move to UP limit
        - value: "02h"
          label: Move to Intermediate Position
        - value: "04h"
          label: Move to Position in %
      description: Movement target type
    - name: position
      type: integer
      description: "IP index (0-15) when function=02h, or percentage (0-100) when function=04h. Ignored for limit moves."

- id: stop
  label: Stop Motor
  kind: action
  msg_code: "02h"
  params: []
  notes: Motor is immediately stopped without speed ramp-down

- id: set_network_lock
  label: Set Network Lock
  kind: action
  msg_code: "16h"
  params:
    - name: function
      type: enum
      values:
        - value: "00h"
          label: Unlock
        - value: "01h"
          label: Lock at current position
        - value: "03h"
          label: Save lock on power cycle
        - value: "04h"
          label: Do not save lock on power cycle
      description: Lock function
    - name: priority
      type: integer
      min: 0
      max: 255
      description: Greater number = higher priority

- id: set_intermediate_position
  label: Set Intermediate Position
  kind: action
  msg_code: "15h"
  params:
    - name: function
      type: enum
      values:
        - value: "00h"
          label: Delete IP
        - value: "01h"
          label: Set IP at current position
        - value: "03h"
          label: Set IP at specified percentage
        - value: "04h"
          label: Divide range with equal IPs
      description: IP configuration function
    - name: ip_index
      type: integer
      min: 1
      max: 16
      description: Entry in the IP table
    - name: value
      type: integer
      description: "Percentage (0-100) for function=03h, or IP count for function=04h"

- id: set_rolling_speed
  label: Set Rolling Speed
  kind: action
  msg_code: "13h"
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm) - see motor datasheet for range
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm) - see motor datasheet for range
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm) - see motor datasheet for range
  notes: DC motors only

- id: set_local_ui
  label: Set Local UI
  kind: action
  msg_code: "17h"
  params:
    - name: function
      type: enum
      values:
        - value: "00h"
          label: Enable/Unlock
        - value: "01h"
          label: Disable/Lock
    - name: ui_index
      type: enum
      values:
        - value: "00h"
          label: All local controls and feedbacks
        - value: "01h"
          label: DCT input
        - value: "02h"
          label: Local stimuli (e.g. radio pairing button)
        - value: "03h"
          label: Local Radio access (e.g. Bluetooth)
        - value: "04h"
          label: Touch Motion
        - value: "05h"
          label: LEDs
    - name: priority
      type: integer
      min: 0
      max: 255
      description: Greater number = higher priority

- id: set_node_label
  label: Set Node Label
  kind: action
  msg_code: "55h"
  params:
    - name: label
      type: string
      max_length: 16
      description: Always 16 characters, pad with spaces

- id: set_group_addr
  label: Set Group Address
  kind: action
  msg_code: "51h"
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: Entry in the group table
    - name: group_id
      type: integer
      description: 24-bit group address
- id: get_node_addr
  label: Get Node Address
  kind: query
  msg_code: "40h"
  params: []
  notes: No data payload; device address is in the message header of the POST_NODE_ADDR response

- id: get_group_addr
  label: Get Group Address
  kind: query
  msg_code: "41h"
  params:
    - name: group_index
      type: integer
      min: 0
      max: 15
      description: Entry in the group table

- id: get_node_label
  label: Get Node Label
  kind: query
  msg_code: "45h"
  params: []

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  msg_code: "74h"
  params: []

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  msg_code: "27h"
  params:
    - name: ui_index
      type: integer
      min: 1
      description: Refer to UI list in SET_LOCAL_UI (01h-05h)

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  msg_code: "25h"
  params:
    - name: ip_index
      type: integer
      min: 1
      max: 16

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  msg_code: "23h"
  params: []
  notes: DC motors only

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  msg_code: "26h"
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: query
  msg_code: "0Ch"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  msg_code: "0Eh"
  params: []
```

## Feedbacks
```yaml
- id: motor_position
  label: Motor Position
  type: composite
  msg_code: "0Dh"
  fields:
    - name: position_pulse
      type: integer
      description: Position in pulses
    - name: position_percentage
      type: integer
      min: 0
      max: 100
      description: Position as percentage of travel range
    - name: ip
      type: integer
      description: "Matching IP index (FFh if none)"

- id: motor_status
  label: Motor Status
  type: composite
  msg_code: "0Fh"
  fields:
    - name: status
      type: enum
      values:
        - value: "00h"
          label: Stopped
        - value: "01h"
          label: Running
        - value: "02h"
          label: Blocked
        - value: "03h"
          label: Locked (NETWORK_LOCK)
    - name: direction
      type: enum
      values:
        - value: "00h"
          label: Going DOWN
        - value: "01h"
          label: Going UP
        - value: "FFh"
          label: Unknown
    - name: source
      type: enum
      values:
        - value: "00h"
          label: Internal
        - value: "01h"
          label: Network message
        - value: "02h"
          label: Local UI
    - name: cause
      type: enum
      values:
        - value: "00h"
          label: Target reached
        - value: "01h"
          label: Explicit command
        - value: "02h"
          label: Wink
        - value: "20h"
          label: Obstacle detection
        - value: "21h"
          label: Over-current protection
        - value: "22h"
          label: Thermal protection
        - value: "30h"
          label: Run time exceeded
        - value: "32h"
          label: Timeout exceeded
        - value: "FFh"
          label: Reset / PowerUp

- id: node_addr
  label: Node Address
  type: raw
  msg_code: "60h"
  description: NodeID from message header (no data payload)

- id: network_lock
  label: Network Lock Status
  type: composite
  msg_code: "36h"
  fields:
    - name: status
      type: enum
      values:
        - value: "00h"
          label: Unlocked
        - value: "01h"
          label: Locked
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer
      description: Lock priority level
    - name: saved
      type: enum
      values:
        - value: "00h"
          label: Will not be restored on power cycle
        - value: "01h"
          label: Will be restored on power cycle

- id: firmware_version
  label: Firmware Revision
  type: composite
  msg_code: "75h"
  fields:
    - name: app_reference
      type: integer
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: Major revision (ASCII A-Z)
    - name: app_index_number
      type: integer
      description: Firmware revision number

- id: rolling_speed
  label: Rolling Speed
  type: composite
  msg_code: "33h"
  fields:
    - name: up_speed
      type: integer
    - name: down_speed
      type: integer
    - name: slow_speed
      type: integer

- id: intermediate_position
  label: Intermediate Position
  type: composite
  msg_code: "35h"
  fields:
    - name: ip_index
      type: integer
      min: 1
      max: 16
    - name: ip_position_percentage
      type: integer
      min: 0
      max: 100
      description: "FFh if IP not set"

- id: local_ui
  label: Local UI Status
  type: composite
  msg_code: "37h"
  fields:
    - name: ui_index
      type: integer
    - name: status
      type: enum
      values:
        - value: "00h"
          label: Enabled/Unlocked
        - value: "01h"
          label: Disabled/Locked
    - name: source_addr
      type: integer
      description: NodeID of device that sent lock command
    - name: priority
      type: integer

- id: group_addr
  label: Group Address
  type: composite
  msg_code: "61h"
  fields:
    - name: group_index
      type: integer
    - name: group_id
      type: integer
      description: 24-bit group address

- id: ack
  label: Acknowledgment
  type: raw
  msg_code: "7Fh"
  description: Sent when ACK bit is set to 1 in the request

- id: nack
  label: Negative Acknowledgment
  type: composite
  msg_code: "6Fh"
  fields:
    - name: error_code
      type: enum
      values:
        - value: "01h"
          label: Data out of range
        - value: "10h"
          label: Unknown message
        - value: "11h"
          label: Message length error
        - value: "FFh"
          label: Busy - cannot process message
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond those modeled as actions
```

## Events
```yaml
# No unsolicited events described in source. All feedbacks are responses to GET requests.
# ACK/NACK responses are only sent when ACK bit is set in the request.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Network lock: when locked, all movement commands (CTRL_xxx) are rejected with NACK(NODE_IS_LOCKED). Only unlock commands with equal or higher priority are accepted."
  - description: "Local UI lock: UI items can be disabled with priority levels; unlock requires equal or higher priority."
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes

**Binary protocol:** All data bits must be inverted (NOT) before transmission. Example: byte `58h` is transmitted as `A7h` on the bus.

**Frame structure:** Messages are 11–32 bytes: `MSG (1) | ACK/LEN (1) | NODE_TYPE (1) | SOURCE@ (3) | DEST@ (3) | DATA (0–21) | CHECKSUM (1)`. Checksum = sum of all preceding bytes.

**Addressing modes:** Point-to-point (DEST@ = target NodeID), Group (SOURCE@ = GroupID, DEST@ = 000000h), Broadcast (DEST@ = FFFFFFh).

**Timing:** Bus free timeout (Tfree) = 3 ms. Slave reply delay (Trep) = 5–255 ms (randomized). Master request delay (Treq) = 10 ms. Max inter-character gap (Tc) = 1 ms.

**Acknowledgment:** ACK bit (byte 2, bit 7) must be set to 1 to request acknowledgment. Retries recommended on NACK or ACK timeout.

<!-- UNRESOLVED: collision recovery strategy not fully specified beyond retry recommendation -->
<!-- UNRESOLVED: exact speed ranges for SET_MOTOR_ROLLING_SPEED depend on motor datasheet, not in source -->
<!-- UNRESOLVED: maximum number of devices on bus not stated in source -->
<!-- UNRESOLVED: physical layer specs (cable type, max length, termination) not in source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T15:20:01.954Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:20:01.954Z
matched_actions: 29
action_count: 29
confidence: high
summary: "All 29 spec actions matched with verbatim msg_code values in source; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
