---
spec_id: admin/somfy-sdn-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy SDN Series Control Spec"
manufacturer: Somfy
model_family: "Somfy SDN Series RS485"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy SDN Series RS485"
    - "Ø30 DC Serie RS485"
    - "Glydea RS485"
    - "Ø50 AC Serie RS485"
    - "Ø50 DC Serie RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-17T00:14:06.133Z
generated_at: 2026-05-17T00:14:06.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-17T00:14:06.133Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions verified against source; transport parameters confirmed; complete bilateral coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Somfy SDN Series Control Spec

## Summary

The Somfy SDN (SOMFY Digital Network) Series is a family of RS-485 motorized shade/blind controllers communicating over a binary half-duplex serial bus. This spec covers the SDN protocol for system integrators: binary framed messages with 3-byte NodeID addressing, acknowledgment/NACK error handling, motor position control, status queries, and configuration. The physical layer is RS-485; the host controller acts as MASTER and all motor nodes act as SLAVEs.

<!-- UNRESOLVED: RS-485 transceiver adapter details (USB-to-RS485, pinout) not stated in source -->
<!-- UNRESOLVED: maximum bus length and node count not stated in source -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from CTRL_MOVETO position and group addressing commands
- queryable   # inferred from GET_MOTOR_POSITION, GET_MOTOR_STATUS query commands
- levelable   # inferred from position-percentage and intermediate-position controls
```

## Actions

```yaml
- id: ctrl_moveto_down_limit
  label: Move to Down Limit
  kind: action
  params: []
  notes: "MSG=03h, Function=00h. Position field is ignored."

- id: ctrl_moveto_up_limit
  label: Move to Up Limit
  kind: action
  params: []
  notes: "MSG=03h, Function=01h. Position field is ignored."

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: Intermediate Position index (0 to 15)
  notes: "MSG=03h, Function=02h. Position field contains IP index."

- id: ctrl_moveto_percent
  label: Move to Position by Percentage
  kind: action
  params:
    - name: position_percent
      type: integer
      description: Target position as percentage of full travel range (0 to 100)
  notes: "MSG=03h, Function=04h. Position field contains % value."

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params: []
  notes: "MSG=02h. Motor is immediately stopped without speed ramp-down."

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0 to 15)
    - name: group_id
      type: bytes
      description: Associated 24-bit group address
  notes: "MSG=51h."

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: Text label up to 16 ASCII characters (padded with spaces to 16)
  notes: "MSG=55h. DATA length is always 16 characters."

- id: set_local_ui
  label: Set Local UI State
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h=All, 01h=DCT input, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: Lock priority (0x00–0xFF); greater number indicates higher priority
  notes: "MSG=17h. When unlocking all (UI_Index=00h), priority must be >= highest current lock level."

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Delete, 01h=Set at current position, 03h=Set at specified %, 04h=Divide full range"
    - name: ip_index
      type: integer
      description: IP entry (1 to 16); ignored for function 04h
    - name: value
      type: integer
      description: Position % for function 03h; IP count for function 04h; ignored otherwise
  notes: "MSG=15h."

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement in RPM (range per device datasheet)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement in RPM (range per device datasheet)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements in RPM (range per device datasheet)
  notes: "MSG=13h. Only available on DC motors. Valid range per device technical datasheet."

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock at current position, 03h=Save lock on power cycle, 04h=Do not save lock"
    - name: priority
      type: integer
      description: Lock priority (0x00–0xFF); ignored for functions 03h and 04h
  notes: "MSG=16h. When locked, only equal or higher priority commands accepted."

- id: get_node_addr
  label: Query Node Address
  kind: action
  params: []
  notes: "MSG=40h. Replies with POST_NODE_ADDR (60h). In broadcast, not all replies may be received."

- id: get_group_addr
  label: Query Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0 to 15)
  notes: "MSG=41h. Replies with POST_GROUP_ADDR (61h)."

- id: get_node_app_version
  label: Query Firmware Version
  kind: action
  params: []
  notes: "MSG=74h. Replies with POST_NODE_APP_VERSION (75h)."

- id: get_node_label
  label: Query Node Label
  kind: action
  params: []
  notes: "MSG=45h. Replies with POST_NODE_LABEL (65h)."

- id: get_local_ui
  label: Query Local UI State
  kind: action
  params:
    - name: ui_index
      type: integer
      description: UI index (01h to UI_MAX); refer to SET_LOCAL_UI table
  notes: "MSG=27h. Replies with POST_LOCAL_UI (37h)."

- id: get_motor_ip
  label: Query Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: IP entry (1 to 16)
  notes: "MSG=25h. Replies with POST_MOTOR_IP (35h)."

- id: get_motor_rolling_speed
  label: Query Motor Rolling Speed
  kind: action
  params: []
  notes: "MSG=23h. Replies with POST_MOTOR_ROLLING_SPEED (33h)."

- id: get_network_lock
  label: Query Network Lock State
  kind: action
  params: []
  notes: "MSG=26h. Replies with POST_NETWORK_LOCK (36h)."

- id: get_motor_position
  label: Query Motor Position
  kind: action
  params: []
  notes: "MSG=0Ch. Replies with POST_MOTOR_POSITION (0Dh). Position is reported even while motor is running."

- id: get_motor_status
  label: Query Motor Status
  kind: action
  params: []
  notes: "MSG=0Eh. Replies with POST_MOTOR_STATUS (0Fh)."
```

## Feedbacks

```yaml
- id: post_node_addr
  label: Node Address Report
  type: event
  msg_id: "60h"
  notes: "Sent in response to GET_NODE_ADDR. Address is in message header, no DATA."

- id: post_group_addr
  label: Group Address Report
  type: object
  msg_id: "61h"
  fields:
    - name: group_index
      type: integer
      description: Entry in the group table (0 to 15)
    - name: group_id
      type: bytes
      description: Associated 24-bit group address

- id: post_node_app_version
  label: Firmware Version Report
  type: object
  msg_id: "75h"
  fields:
    - name: app_reference
      type: bytes
      description: 24-bit firmware part number
    - name: app_index_letter
      type: string
      description: Firmware major revision (ASCII A–Z)
    - name: app_index_number
      type: integer
      description: Firmware minor revision number

- id: post_node_label
  label: Node Label Report
  type: string
  msg_id: "65h"
  notes: "16-character ASCII label."

- id: post_local_ui
  label: Local UI State Report
  type: object
  msg_id: "37h"
  fields:
    - name: status
      type: enum
      values: ["00h=Enabled/Unlocked", "01h=Disabled/Locked"]
    - name: source_addr
      type: bytes
      description: NodeID of device that sent the lock command (000000h when unlocked)
    - name: priority
      type: integer
      description: Lock priority (00h when unlocked)

- id: post_motor_ip
  label: Intermediate Position Report
  type: object
  msg_id: "35h"
  fields:
    - name: ip_index
      type: integer
      description: IP entry (1 to 16)
    - name: ip_position_percentage
      type: integer
      description: Position as percentage (0 to 100); FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: object
  msg_id: "33h"
  fields:
    - name: up_speed
      type: integer
      description: Speed during UP movement (device-specific range)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (device-specific range)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (device-specific range)

- id: post_network_lock
  label: Network Lock State Report
  type: object
  msg_id: "36h"
  fields:
    - name: status
      type: enum
      values: ["00h=Unlocked", "01h=Locked"]
    - name: source_addr
      type: bytes
      description: NodeID of device that sent the lock command
    - name: priority
      type: integer
      description: Lock priority
    - name: saved
      type: enum
      values: ["00h=Not saved on power cycle", "01h=Saved on power cycle"]

- id: post_motor_position
  label: Motor Position Report
  type: object
  msg_id: "0Dh"
  fields:
    - name: position_pulse
      type: integer
      description: Position in pulses (UP_LIMIT to DOWN_LIMIT)
    - name: position_percentage
      type: integer
      description: Position as percentage (0 to 100)
    - name: ip
      type: integer
      description: Current IP index (01h to IP_MAX); FFh if not at an IP

- id: post_motor_status
  label: Motor Status Report
  type: object
  msg_id: "0Fh"
  fields:
    - name: status
      type: enum
      values: ["00h=Stopped", "01h=Running", "02h=Blocked", "03h=Locked"]
    - name: direction
      type: enum
      values: ["00h=Going DOWN", "01h=Going UP", "FFh=Unknown"]
    - name: source
      type: enum
      values: ["00h=Internal", "01h=Network message", "02h=Local UI"]
    - name: cause
      type: enum
      values: ["00h=Target reached", "01h=Explicit command", "02h=Wink", "20h=Obstacle detection", "21h=Over-current protection", "22h=Thermal protection", "30h=Run time exceeded", "32h=Timeout exceeded", "FFh=Reset/PowerUp"]

- id: ack
  label: Acknowledgment
  type: event
  msg_id: "7Fh"
  notes: "Sent only when ACK bit is set to 1 in the MASTER request. No DATA."

- id: nack
  label: Negative Acknowledgment / Error
  type: object
  msg_id: "6Fh"
  fields:
    - name: error_code
      type: enum
      values: ["01h=Data out of range", "10h=Unknown message", "11h=Message Length Error", "FFh=Busy – Cannot process message"]
```

## Variables

```yaml
# UNRESOLVED: no settable parameters beyond action-driven configuration found in source
```

## Events

```yaml
- id: node_addr_spontaneous
  label: Spontaneous Node Address Broadcast
  notes: >
    Some devices can send their NodeID without a MASTER request when the user presses a pushbutton
    on the device. Received as POST_NODE_ADDR (60h). No DATA; address is in message header.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: network_lock
    description: >
      When NETWORK_LOCK is active, all movement commands (CTRL_XXX) and limit-change commands
      (SET_MOTOR_LIMITS, SET_TILT_LIMITS) are rejected with NACK (NODE_IS_LOCKED).
      Only SET_NETWORK_LOCK or CTRL_NETWORK_LOCK with equal or higher priority level can override.
  - id: thermal_protection
    description: >
      Motor reports Status=02h (Blocked) with Cause=22h (Thermal protection) when thermal limit is reached.
      No movement is possible until the motor cools down.
  - id: obstacle_detection
    description: >
      Motor reports Status=02h (Blocked) with Cause=20h (Obstacle detection) when an obstacle is encountered.
```

## Notes

**Frame format:** All SDN messages are binary-framed. Minimum frame length is 11 bytes (no DATA). Maximum is 32 bytes (21 bytes of DATA). Fields: MSG (1 byte), ACK/LEN (1 byte), NODE TYPE (1 byte), SOURCE@ (3 bytes, LSBF), DEST@ (3 bytes, LSBF), DATA (0–21 bytes), CHECKSUM (2 bytes). Checksum is the complement sum of all preceding bytes.

**Data inversion:** All data bits MUST be inverted before transmission for backward compatibility with earliest protocol versions. Example: transmitting 0x58 sends NOT(0x58) = 0xA7 on the bus.

**Byte order:** SOURCE@ and DEST@ are Little-Endian (Least Significant Byte First / LSBF).

**Timing requirements:**
- Tc (max): 1 ms between consecutive characters within a frame
- Tfree: 3 ms bus-free timeout
- Trep: 5–255 ms (randomized) — SLAVE wait before replying
- Treq: 10 ms minimum — MASTER wait before sending a new request

**Acknowledgment strategy:** It is strongly recommended to request ACK for all MASTER messages. Implement a retry strategy when NACK is received or when no ACK arrives within the expected timeout.

**Collision avoidance:** Avoid requesting ACK or feedback in group or broadcast addressing mode due to RS-485 bus collision risk.

**Speed adjustment:** SET_MOTOR_ROLLING_SPEED and GET_MOTOR_ROLLING_SPEED are only available on DC motor variants. Valid speed ranges are device-specific; consult the individual product technical datasheet.

**NodeType filtering:** Byte 3 of every frame encodes SOURCE NodeType (high nibble, always 0x0 for MASTER) and DEST NodeType (low nibble). Set DEST NodeType to 0x0 to address all device types, or use the specific NodeType value to target a product family.

<!-- UNRESOLVED: CTRL_NETWORK_LOCK message (separate from SET_NETWORK_LOCK) is referenced in the source but its MSG byte and DATA format are not documented in this excerpt -->
<!-- UNRESOLVED: SET_MOTOR_LIMITS and SET_TILT_LIMITS messages are referenced but not documented in this source excerpt -->
<!-- UNRESOLVED: RS-485 physical connector pinout and wiring not stated in source -->
<!-- UNRESOLVED: maximum number of devices per bus segment not stated in source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-17T00:14:06.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:14:06.133Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions verified against source; transport parameters confirmed; complete bilateral coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
