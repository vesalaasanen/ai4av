---
spec_id: admin/somfy-ilt2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ILT2 Control Spec"
manufacturer: Somfy
model_family: ILT2
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - ILT2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-06-02T05:04:19.396Z
last_checked_at: 2026-06-02T22:14:46.075Z
generated_at: 2026-06-02T22:14:46.075Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "speed ranges for SET_MOTOR_ROLLING_SPEED depend on the device technical datasheet, not included in this source."
  - "minimum/typical uptime values and wiring constraints come from a separate document (DOC114316) not included here."
  - "device is a motor controller; movement commands (UP/DOWN/Stop/MoveTo) are not classified as `powerable`, `routable`, or `levelable` per the AI4AV trait taxonomy."
  - "source describes no event/notification messages."
  - "source does not define multi-step sequences."
  - "source contains no explicit electrical/installation safety warnings"
  - "speed min/max ranges for SET_MOTOR_ROLLING_SPEED are device-specific; refer to the device technical datasheet."
  - "bus topology, cable lengths, and wiring constraints are in DOC114316 \"SDN Bus Wiring Guide\", not in this source."
  - "any safety / installation warnings in DOC114316 are not captured here."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:46.075Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy ILT2 Control Spec

## Summary
This spec covers the Somfy Digital Network (SDN) RS-485 bus protocol as implemented by the Somfy ILT2 (and other Somfy RS-485 products sharing the same protocol). Communication is half-duplex, master/slave, framed, with a complement checksum and a 3-byte NodeID address. Each framed message carries a 1-byte MSG opcode, an ACK/LEN byte, a NodeType byte, a 3-byte SOURCE@, a 3-byte DEST@, a DATA payload, and a 2-byte complement checksum.

<!-- UNRESOLVED: speed ranges for SET_MOTOR_ROLLING_SPEED depend on the device technical datasheet, not included in this source. -->
<!-- UNRESOLVED: minimum/typical uptime values and wiring constraints come from a separate document (DOC114316) not included here. -->

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
  character_coding: NRZ
  electrical: RS-485  # half-duplex, master/slave bus
  bit_order: LSBF  # least significant bit sent first
  inversion: data_bits_inverted_before_transmission  # e.g. 58h transmitted as A7h
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame structure (11–32 bytes):**

| Byte 1 | Byte 2 | Byte 3 | Bytes 4–6 | Bytes 7–9 | Bytes 10..n-2 | Bytes n-1..n |
|--------|--------|--------|-----------|-----------|---------------|--------------|
| MSG | ACK/LEN | NodeType (src/dest) | SOURCE@ (3 bytes, LSBF) | DEST@ (3 bytes, LSBF) | DATA (0–21 bytes) | CHECKSUM (2 bytes, complement sum) |

- `Byte 2` bits: `ACK` (b7) | `EXT=0` (b6..b5) | `LEN` (b4..b0)
- `Byte 3` bits: `SRC NodeType` (b7..b4) | `DEST NodeType` (b3..b0). `SRC NodeType=0h` for master devices.
- Addressing: point-to-point (DEST@=NodeID), group (DEST@=000000h, SOURCE@=GroupID), or broadcast (DEST@=FFFFFFh). NodeType filtering via DEST NodeType field.
- No port (RS-485 bus). No auth.
- Bus timings: `Tc` max 1 ms between characters, `Tfree` 3 ms bus-free timeout, `Trep` 5–255 ms (randomized) slave reply delay, `Treq` ≥ 10 ms master pre-send delay.

## Traits
```yaml
- queryable  # inferred: GET_xxx status request commands present
```

<!-- UNRESOLVED: device is a motor controller; movement commands (UP/DOWN/Stop/MoveTo) are not classified as `powerable`, `routable`, or `levelable` per the AI4AV trait taxonomy. -->

## Actions
```yaml
# Every MSG-classed message documented in the source is enumerated below as
# a separate action. POST/ACK/NACK responses are captured in Feedbacks.
# `command:` carries the MSG opcode and the DATA-length code; the surrounding
# frame (NodeType / SOURCE@ / DEST@ / CHECKSUM) is documented in Transport.
# For parameterized messages the DATA field layout is given in `params:`.

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "MSG=03h (CTRL_MOVETO) LEN=04h"
  params:
    - name: function
      type: integer
      description: 00h=down limit, 01h=up limit, 02h=intermediate position, 04h=position in %
    - name: position
      type: integer
      description: 16-bit; IP index (0..15) for function 02h, % value (0..100) for function 04h, ignored otherwise
    - name: reserved
      type: integer
      description: 8-bit, send 00h

- id: ctrl_stop
  label: Stop
  kind: action
  command: "MSG=02h (CTRL_STOP) LEN=01h"
  params:
    - name: reserved
      type: integer
      description: 8-bit, send 00h

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (DC motors only)
  kind: action
  command: "MSG=13h (SET_MOTOR_ROLLING_SPEED) LEN=03h"
  params:
    - name: up_speed
      type: integer
      description: 8-bit; rpm during UP movement (range per device datasheet)
    - name: down_speed
      type: integer
      description: 8-bit; rpm during DOWN movement (range per device datasheet)
    - name: slow_speed
      type: integer
      description: 8-bit; rpm for adjustment movements (range per device datasheet)

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h (SET_MOTOR_IP) LEN=04h"
  params:
    - name: function
      type: integer
      description: 00h=delete IP, 01h=set IP at current position, 03h=set IP at given %, 04h=divide full range
    - name: ip_index
      type: integer
      description: 8-bit; 1..16
    - name: value
      type: integer
      description: 16-bit; % for function 03h, IP count for function 04h, ignored for 00h/01h

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h (SET_NETWORK_LOCK) LEN=02h"
  params:
    - name: function
      type: integer
      description: 00h=Unlock, 01h=Lock, 03h=Save lock across power cycle, 04h=Do not save
    - name: priority
      type: integer
      description: 8-bit; higher = higher priority; ignored for function 03h/04h

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  command: "MSG=17h (SET_LOCAL_UI) LEN=03h"
  params:
    - name: function
      type: integer
      description: 00h=Enable/Unlock, 01h=Disable/Lock
    - name: ui_index
      type: integer
      description: 00h=All local controls, 01h=DCT input, 02h=Local stimuli, 03h=Local radio (BT), 04h=Touch Motion, 05h=LEDs
    - name: priority
      type: integer
      description: 8-bit; higher = higher priority

- id: set_node_label
  label: Set Node Text Label
  kind: action
  command: "MSG=55h (SET_NODE_LABEL) LEN=10h"
  params:
    - name: label
      type: string
      description: 16 ASCII chars (pad with spaces if shorter)

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h (SET_GROUP_ADDR) LEN=04h"
  params:
    - name: group_index
      type: integer
      description: 8-bit; 0..15
    - name: group_id
      type: integer
      description: 24-bit NodeID-format group address (LSBF)

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "MSG=40h (GET_NODE_ADDR) LEN=00h"
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h (GET_GROUP_ADDR) LEN=01h"
  params:
    - name: group_index
      type: integer
      description: 8-bit; 0..15

- id: get_node_label
  label: Get Node Text Label
  kind: query
  command: "MSG=45h (GET_NODE_LABEL) LEN=00h"
  params: []

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "MSG=74h (GET_NODE_APP_VERSION) LEN=00h"
  params: []

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h (GET_MOTOR_IP) LEN=01h"
  params:
    - name: ip_index
      type: integer
      description: 8-bit; 1..16

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed (DC motors only)
  kind: query
  command: "MSG=23h (GET_MOTOR_ROLLING_SPEED) LEN=00h"
  params: []

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "MSG=26h (GET_NETWORK_LOCK) LEN=00h"
  params: []

- id: get_local_ui
  label: Get Local UI Lock Status
  kind: query
  command: "MSG=27h (GET_LOCAL_UI) LEN=01h"
  params:
    - name: ui_index
      type: integer
      description: 8-bit; 01h..UI_MAX (refer to SET_LOCAL_UI list)

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch (GET_MOTOR_POSITION) LEN=00h"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh (GET_MOTOR_STATUS) LEN=00h"
  params: []
```

## Feedbacks
```yaml
# Unsolicited and request-driven responses from the device.

- id: post_node_addr
  label: Node Address Report
  type: bytes
  command: "MSG=60h (POST_NODE_ADDR) LEN=00h"
  description: Slave replies with its NodeID; no DATA - address carried in header (SOURCE@).

- id: post_group_addr
  label: Group Address Report
  type: object
  command: "MSG=61h (POST_GROUP_ADDR) LEN=04h"
  fields:
    - name: group_index
      type: integer
      description: 8-bit; 0..15
    - name: group_id
      type: integer
      description: 24-bit group NodeID (LSBF)

- id: post_node_label
  label: Node Text Label Report
  type: string
  command: "MSG=65h (POST_NODE_LABEL) LEN=10h"
  description: 16 ASCII chars.

- id: post_node_app_version
  label: Firmware Version Report
  type: object
  command: "MSG=75h (POST_NODE_APP_VERSION) LEN=06h"
  fields:
    - name: app_reference
      type: integer
      description: 24-bit; firmware part number
    - name: app_index_letter
      type: integer
      description: 8-bit ASCII (41h..5Ah); firmware major revision letter
    - name: app_index_number
      type: integer
      description: 8-bit; firmware revision
    - name: reserved
      type: integer
      description: 8-bit

- id: post_local_ui
  label: Local UI Lock Status Report
  type: object
  command: "MSG=37h (POST_LOCAL_UI) LEN=05h"
  fields:
    - name: status
      type: enum
      values: [enabled, disabled]
    - name: source_addr
      type: integer
      description: 24-bit NodeID of the device that issued the lock (000000h when unlocked)
    - name: priority
      type: integer
      description: 8-bit; 00h when unlocked

- id: post_motor_ip
  label: Intermediate Position Report
  type: object
  command: "MSG=35h (POST_MOTOR_IP) LEN=04h"
  fields:
    - name: ip_index
      type: integer
      description: 8-bit; 1..16
    - name: reserved
      type: integer
      description: 16-bit
    - name: ip_position_percentage
      type: integer
      description: 8-bit; 0..100; FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report (DC motors only)
  type: object
  command: "MSG=33h (POST_MOTOR_ROLLING_SPEED) LEN=03h"
  fields:
    - name: up_speed
      type: integer
      description: 8-bit
    - name: down_speed
      type: integer
      description: 8-bit
    - name: slow_speed
      type: integer
      description: 8-bit

- id: post_network_lock
  label: Network Lock Status Report
  type: object
  command: "MSG=36h (POST_NETWORK_LOCK) LEN=06h"
  fields:
    - name: status
      type: enum
      values: [unlocked, locked]
    - name: source_addr
      type: integer
      description: 24-bit NodeID of locker
    - name: priority
      type: integer
      description: 8-bit
    - name: saved
      type: enum
      values: [not_saved, saved]
      description: Whether lock is restored on power cycle

- id: post_motor_position
  label: Motor Position Report
  type: object
  command: "MSG=0Dh (POST_MOTOR_POSITION) LEN=05h"
  fields:
    - name: position_pulse
      type: integer
      description: 16-bit; raw position between UP_LIMIT and DOWN_LIMIT
    - name: position_percentage
      type: integer
      description: 8-bit; 0..100
    - name: reserved
      type: integer
      description: 8-bit
    - name: ip
      type: integer
      description: 8-bit; current IP index (01h..IP_MAX), FFh if not at an IP

- id: post_motor_status
  label: Motor Status Report
  type: object
  command: "MSG=0Fh (POST_MOTOR_STATUS) LEN=04h"
  fields:
    - name: status
      type: enum
      values: [stopped, running, blocked, locked]
      description: 00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle), 03h=Locked (NETWORK_LOCK)
    - name: direction
      type: enum
      values: [down, up, unknown]
      description: 00h=Down, 01h=Up, FFh=Unknown
    - name: source
      type: enum
      values: [internal, network, local_ui]
      description: Origin of last command
    - name: cause
      type: integer
      description: 00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle, 21h=Over-current, 22h=Thermal, 30h=Run time exceeded, 32h=Timeout, FFh=Reset/PowerUp

- id: ack
  label: Acknowledge
  type: enum
  values: [ok]
  command: "MSG=7Fh (ACK) LEN=00h"
  description: Sent by slave when ACK bit was set in the request and processing succeeded.

- id: nack
  label: Negative Acknowledge / Error
  type: object
  command: "MSG=6Fh (NACK) LEN=01h"
  fields:
    - name: error_code
      type: integer
      description: 01h=Data out of range, 10h=Unknown message, 11h=Message length error, FFh=Busy/cannot process
```

## Variables
```yaml
# Persistent settings stored on the device; some are writable via Actions, all
# readable via the corresponding GET request and POST feedback.
- name: node_id
  description: 3-byte built-in NodeID. Read-only; programmed at manufacturing.
- name: node_label
  description: 16-char user text label. Writable via SET_NODE_LABEL.
- name: firmware_version
  description: App_Reference (3 bytes) + App_IndexLetter (1 byte ASCII) + App_IndexNumber (1 byte). Read-only.
- name: group_membership
  description: Up to 16 group table entries (GroupIndex 0..15) each holding a GroupID. Writable via SET_GROUP_ADDR.
- name: local_ui_locks
  description: Per-UI lock state, source NodeID and priority for each UI_Index. Writable via SET_LOCAL_UI.
- name: motor_intermediate_positions
  description: Up to 16 IPs (IP_Index 1..16) each with a position in 0..100%. Writable via SET_MOTOR_IP.
- name: motor_rolling_speeds
  description: UP/DOWN/Slow rpm for DC motors. Writable via SET_MOTOR_ROLLING_SPEED.
- name: network_lock
  description: Lock state, source NodeID, priority, and save-across-power-cycle flag. Writable via SET_NETWORK_LOCK.
```

## Events
```yaml
# No unsolicited push events are defined by this protocol. All device
# information is delivered only in response to a MASTER GET request.
# UNRESOLVED: source describes no event/notification messages.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: When NETWORK_LOCK is active, all CTRL_xxx movement commands and SET_MOTOR_LIMITS / SET_TILT_LIMITS are rejected with NACK(NODE_IS_LOCKED) unless the controlling message carries a priority equal to or higher than the active lock priority.
  - description: When Local UI items are disabled/locked, all actions and feedback related to those items are ignored until re-enabled.
# UNRESOLVED: source contains no explicit electrical/installation safety warnings
# (wiring and topology guidance is in a separate document DOC114316 not in scope).
```

## Notes
- This spec covers the SDN bus protocol in general. The Somfy ILT2 is one of the RS-485 devices that implements it; the spec is structurally applicable to any SDN node (NodeTypes 02h, 05h, 06h, 07h, 08h, 09h). Device-specific capabilities (e.g. rolling speed is "DC motors only") vary per NodeType.
- Data bits are inverted before transmission for backward compatibility with earliest protocol versions (e.g. `58h` on the wire = `NOT(58h) = A7h`). Every byte in the frame (MSG, ACK/LEN, NodeType, SOURCE@, DEST@, DATA, checksum) must be inverted on transmit and de-inverted on receive.
- SOURCE@ and DEST@ are LSBF (least significant byte first).
- Frame bytes are 11..32; DATA length 0..21. Reserved fields should be set to `00h` or `FFh`.
- `CHECKSUM` = 2-byte complement sum of bytes 1..n-2: `CHECKSUM = (Byte 1 + ... + Byte n-2) complement`. No error correction; consider retries on NACK or ACK timeout.
- ACK bit in `Byte 2` is set by the master when an acknowledgement is required. Status requests do not produce ACK; the POST_xxx reply is the feedback.
- Avoid requesting feedback (ACK or POST) in group or broadcast addressing to lower collision risk.
- MOTOR_IP function `04h` ("divide full range with given number of IPs") distributes IPs equally between top and bottom limits. Example: 2 IPs → IP1=33%, IP2=66%. Existing IPs are overwritten.
- `SET_MOTOR_IP` function `02h` is not listed in the source table (only 00h, 01h, 03h, 04h are documented). Treat 02h as reserved unless the device datasheet states otherwise.
- For `SET_MOTOR_IP` function `04h` the source says `IP_Index is ignored`, so the IP_Index byte in the frame should be sent as `00h`.
- `CTRL_STOP` halts the motor immediately without speed ramp-down.
- POST_MOTOR_POSITION may be sent while the motor is running; the `IP` field returns `FFh` when the position does not match any defined IP (with a small tolerance that is motor-dependent).

<!-- UNRESOLVED: speed min/max ranges for SET_MOTOR_ROLLING_SPEED are device-specific; refer to the device technical datasheet. -->
<!-- UNRESOLVED: bus topology, cable lengths, and wiring constraints are in DOC114316 "SDN Bus Wiring Guide", not in this source. -->
<!-- UNRESOLVED: any safety / installation warnings in DOC114316 are not captured here. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-06-02T05:04:19.396Z
last_checked_at: 2026-06-02T22:14:46.075Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:46.075Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "speed ranges for SET_MOTOR_ROLLING_SPEED depend on the device technical datasheet, not included in this source."
- "minimum/typical uptime values and wiring constraints come from a separate document (DOC114316) not included here."
- "device is a motor controller; movement commands (UP/DOWN/Stop/MoveTo) are not classified as `powerable`, `routable`, or `levelable` per the AI4AV trait taxonomy."
- "source describes no event/notification messages."
- "source does not define multi-step sequences."
- "source contains no explicit electrical/installation safety warnings"
- "speed min/max ranges for SET_MOTOR_ROLLING_SPEED are device-specific; refer to the device technical datasheet."
- "bus topology, cable lengths, and wiring constraints are in DOC114316 \"SDN Bus Wiring Guide\", not in this source."
- "any safety / installation warnings in DOC114316 are not captured here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
