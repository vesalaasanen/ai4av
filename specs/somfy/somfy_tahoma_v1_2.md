---
spec_id: admin/somfy-tahoma-v1-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy TaHoma v1.2 Control Spec"
manufacturer: Somfy
model_family: "Somfy TaHoma v1.2"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy TaHoma v1.2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:14.635Z
last_checked_at: 2026-06-02T22:14:52.221Z
generated_at: 2026-06-02T22:14:52.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TaHoma-specific gateway configuration (LAN/HTTP API, cloud pairing) is not covered by the supplied source."
  - "source describes SDN bus protocol generically; TaHoma-specific bindings (which NodeIDs TaHoma emulates) not stated."
  - "physical bus is RS-485 (per source); a \"serial\" transport block"
  - "data bit inversion is required: every byte is bitwise NOT before"
  - "source does not state RS-232 vs RS-485 explicitly inside the"
  - "source describes only solicited POST_xxx replies; no unsolicited"
  - "no multi-step sequences are explicitly defined in the source."
  - "source does not document any external interlocks (e.g. E-stop, safety"
  - "TaHoma v1.2-specific gateway configuration (LAN REST API, cloud pairing, Zigbee/RTS bridges) is not in the supplied source."
  - "device-specific speed ranges (\"See Technical Datasheet\") and the master NodeID value used by TaHoma on the SDN bus are not in the source."
  - "no firmware version compatibility range is stated; firmware field is left empty."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:52.221Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy TaHoma v1.2 Control Spec

## Summary
This spec covers the **Somfy Digital Network (SDN)** RS-485 bus protocol as exposed by the TaHoma v1.2 hub for controlling Somfy wired motors and actuators (e.g. Ø30 DC, Ø50 AC/DC, Glydea, RS485 RTS transmitter). The source document describes a master/slave asynchronous serial bus with device addressing, configuration, control, and status messages. No transport-layer authentication is documented.

<!-- UNRESOLVED: TaHoma-specific gateway configuration (LAN/HTTP API, cloud pairing) is not covered by the supplied source. -->
<!-- UNRESOLVED: source describes SDN bus protocol generically; TaHoma-specific bindings (which NodeIDs TaHoma emulates) not stated. -->

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
# UNRESOLVED: physical bus is RS-485 (per source); a "serial" transport block
# captures line settings. RS-485 specifics (termination, bias, max nodes) not
# enumerated in source beyond 3-byte NodeID addressing.
# UNRESOLVED: data bit inversion is required: every byte is bitwise NOT before
# transmission. Example: 58h -> A7h on the bus.
# UNRESOLVED: source does not state RS-232 vs RS-485 explicitly inside the
# serial config table, but §3 repeatedly references "RS485" devices/bus.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - routable        (move-to-position / stop controls are the core action set)
# - queryable       (status requests POST back position/status/lock/UI state)
# - levelable       # not applicable - no volume/gain/brightness; position % is a routable parameter
# - powerable       # not applicable - motors are not power-cycled via SDN; line-power devices
```

## Actions
```yaml
# All actions are framed as SDN messages:
#   Byte1=MSG | Byte2=ACK/LEN | Byte3=NODE_TYPE | Byte4-6=SRC@ (LSB first) | Byte7-9=DST@ (LSB first) | Byte10..n-1=DATA | Byten=CHECKSUM (sum of all preceding bytes)
# Min frame = 11 bytes (no DATA). Max = 32 bytes. Bytes are bitwise-NOT before transmission.
# MASTER sets NODE_TYPE=0h. NodeID is 3 bytes. Broadcast = FFFFFFh. Group = DST 000000h with GroupID in SRC@.

# --- Device Management ---
- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h"
  params: []
  notes: Broadcast request; replies may collide when many devices share the bus.

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h {group_index} {group_id_b0} {group_id_b1} {group_id_b2}"
  params:
    - name: group_index
      type: integer
      description: Entry in the group table (0-15)
    - name: group_id
      type: bytes
      description: 3-byte group address (24-bit)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h {group_index}"
  params:
    - name: group_index
      type: integer
      description: Group table entry to query (0-15)

# --- Acknowledgement and Errors ---
- id: ack
  label: Acknowledge
  kind: feedback
  command: "7Fh"
  params: []
  notes: Returned by SLAVE when ACK bit set in the request and processing succeeded.

- id: nack
  label: Negative Acknowledge
  kind: feedback
  command: "6Fh {error_code}"
  params:
    - name: error_code
      type: enum
      description: "01h=Data out of range, 10h=Unknown message, 11h=Message Length Error, FFh=Busy"

# --- Device Information ---
- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "74h"
  params: []

- id: set_node_label
  label: Set User Label
  kind: action
  command: "55h {label[16]}"
  params:
    - name: label
      type: string
      description: Always 16 characters; pad with spaces if shorter.

- id: get_node_label
  label: Get User Label
  kind: query
  command: "45h"
  params: []

# --- Device Configuration: HMI Management ---
- id: set_local_ui
  label: Set Local UI Lock State
  kind: action
  command: "17h {function} {ui_index} {priority}"
  params:
    - name: function
      type: enum
      description: "00h=Enable/Unlock, 01h=Disable/Lock"
    - name: ui_index
      type: enum
      description: "00h=All, 01h=DCT input, 02h=Local stimuli, 03h=Local Radio (BT), 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: 0-255; higher = higher priority. Lock re-set/removed only at >= existing lock level.

- id: get_local_ui
  label: Get Local UI Lock State
  kind: query
  command: "27h {ui_index}"
  params:
    - name: ui_index
      type: integer
      description: "01h..UI_MAX"

# --- Device Configuration: Intermediate Positions ---
- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h {function} {ip_index} {value_lo} {value_hi}"
  params:
    - name: function
      type: enum
      description: "00h=Delete IP, 01h=Set IP at current position, 03h=Set IP at % position, 04h=Divide full range into N equal IPs"
    - name: ip_index
      type: integer
      description: 1-16
    - name: value
      type: integer
      description: Position % (function 03h) or IP count (function 04h); ignored otherwise.

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25h {ip_index}"
  params:
    - name: ip_index
      type: integer
      description: 1-16

# --- Device Configuration: Speed Adjustment (DC motors only) ---
- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13h {up_speed} {down_speed} {slow_speed}"
  params:
    - name: up_speed
      type: integer
      description: Speed (rpm) during UP movement. Range is per motor datasheet.
    - name: down_speed
      type: integer
      description: Speed (rpm) during DOWN movement. Range is per motor datasheet.
    - name: slow_speed
      type: integer
      description: Speed (rpm) for adjustment movements. Range is per motor datasheet.

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h"
  params: []

# --- Device Configuration: Network Lock ---
- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h {function} {priority}"
  params:
    - name: function
      type: enum
      description: "00h=Unlock, 01h=Lock, 03h=Save lock across power cycle, 04h=Do not save lock across power cycle"
    - name: priority
      type: integer
      description: 0-255. Required for 00h/01h; ignored for 03h/04h.

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "26h"
  params: []

# --- Device Control ---
- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03h {function} {position_lo} {position_hi} {reserved}"
  params:
    - name: function
      type: enum
      description: "00h=Move to DOWN limit, 01h=Move to UP limit, 02h=Move to IP, 04h=Move to % position"
    - name: position
      type: integer
      description: IP index (0-15) for function 02h, or % (0-100) for function 04h. Ignored for 00h/01h.
    - name: reserved
      type: bytes
      description: 8-bit reserved field.

- id: ctrl_stop
  label: Stop
  kind: action
  command: "02h {reserved}"
  params:
    - name: reserved
      type: bytes
      description: 8-bit reserved field.
  notes: Motor stops immediately without speed ramp-down.

# --- Device Status ---
- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh"
  params: []
```

## Feedbacks
```yaml
- id: motor_position
  type: object
  description: |
    POST_MOTOR_POSITION (0Dh) reply. Fields:
    Position_pulse (16-bit, UP_LIMIT..DOWN_LIMIT),
    Position_percentage (8-bit, 0..100),
    Reserved (8-bit),
    IP (8-bit, 1..IP_MAX, FFh if not at an IP).

- id: motor_status
  type: object
  description: |
    POST_MOTOR_STATUS (0Fh) reply. Fields:
    Status (00h Stopped, 01h Running, 02h Blocked, 03h Locked),
    Direction (00h Going DOWN, 01h Going UP, FFh Unknown),
    Source (00h Internal, 01h Network, 02h Local UI),
    Cause (00h Target reached, 01h Explicit command, 02h Wink, 20h Obstacle, 21h Over-current, 22h Thermal, 30h Run time exceeded, 32h Timeout, FFh Reset/PowerUp).

- id: group_address
  type: object
  description: |
    POST_GROUP_ADDR (61h) reply. GroupIndex (8-bit) + GroupID (24-bit).

- id: node_app_version
  type: object
  description: |
    POST_NODE_APP_VERSION (75h) reply. App_Reference (24-bit) + App_IndexLetter (8-bit ASCII 41h..5Ah) + App_IndexNumber (8-bit) + Reserved (8-bit).

- id: node_label
  type: string
  description: |
    POST_NODE_LABEL (65h) reply. 16-character string.

- id: local_ui_state
  type: object
  description: |
    POST_LOCAL_UI (37h) reply. UI_Index, Status (00h Enabled/Unlocked, 01h Disabled/Locked), Source_Addr (24-bit), Priority (8-bit).

- id: motor_ip
  type: object
  description: |
    POST_MOTOR_IP (35h) reply. IP_index (1..16), Reserved (16-bit), IP_position_percentage (0..100, FFh if not set).

- id: motor_rolling_speed
  type: object
  description: |
    POST_MOTOR_ROLLING_SPEED (33h) reply. UP_Speed, DOWN_Speed, Slow_Speed (8-bit each, units per motor datasheet).

- id: network_lock_state
  type: object
  description: |
    POST_NETWORK_LOCK (36h) reply. Status (00h Unlocked, 01h Locked), Source_Addr (24-bit), Priority (8-bit), Saved (00h not restored, 01h restored on power cycle).

- id: nack_error
  type: enum
  values: [data_out_of_range, unknown_message, length_error, busy]
  description: |
    ErrorCode from NACK (6Fh). 01h/10h/11h/FFh respectively.
```

## Variables
```yaml
- id: intermediate_position
  description: User-defined motor preset position as percentage of full travel (0..100). Up to 16 IPs per motor.
- id: motor_rolling_speed
  description: Per-direction RPM (UP/DOWN/Slow). Range varies by motor - see device datasheet.
- id: network_lock_priority
  description: 0..255 priority gating whether network CTRL messages execute while a lock is active.
- id: local_ui_priority
  description: 0..255 priority for a given UI lock; higher than existing lock required to re-lock/unlock.
```

## Events
```yaml
# UNRESOLVED: source describes only solicited POST_xxx replies; no unsolicited
# asynchronous notifications are documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are explicitly defined in the source.
# Operators may compose CTRL_MOVETO + GET_MOTOR_POSITION as a "move and verify"
# pattern, but the source does not prescribe this.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When SET_LOCAL_UI UI_Index=00h, priority must be >= highest existing lock level or NACK(LOW_PRIORITY) is returned."
  - description: "When a per-item UI_Index lock is set, priority must be >= that item's lock level or NACK(LOW_PRIORITY) is returned."
  - description: "When NETWORK_LOCK is active, only CTRL_NETWORK_LOCK with equal or higher priority is accepted; all other movement messages (CTRL_xxx, SET_MOTOR_LIMITS, SET_TILT_LIMITS) are rejected with NACK(NODE_IS_LOCKED)."
  - description: "Motor status 02h (Blocked) and Cause codes 20h/21h/22h/30h indicate thermal protection, obstacle, over-current, or run-time exceeded; controller should treat as fault state."
# UNRESOLVED: source does not document any external interlocks (e.g. E-stop, safety
# contactors) - only protocol-level priority gating.
```

## Notes
- **Byte inversion**: Every data byte is bitwise-NOTed before transmission. Example: byte `0x58` goes on the bus as `0xA7`. Same for the address and checksum fields.
- **Bit order**: Least significant bit sent first within each byte.
- **Frame delimiters**: No sync/header byte. A frame ends when the bus is idle for `Tfree` (3 ms).
- **Timing constraints**:
  - `Tc` <= 1 ms max gap between consecutive bytes in a frame.
  - `Treq` >= 10 ms idle time before the master can start a new request.
  - `Trep` = 5..255 ms (partially randomized) slave reply delay after bus activity.
- **Addressing modes**:
  - Point-to-point: SRC@ = sender NodeID, DST@ = target NodeID.
  - Group: SRC@ = GroupID, DST@ = `000000h`.
  - Broadcast: SRC@ = NodeID, DST@ = `FFFFFFh`.
  - NodeType filtering: set DST NODE_TYPE to target a family (02h=Ø30 DC, 05h=RS485 RTS, 06h=Glydea, 07h=Ø50 AC, 08h=Ø50 DC, 09h=Ø40 AC).
- **ACK strategy**: Source strongly recommends requesting ACKs (set ACK bit in Byte 2) and implementing retry on NACK or ACK timeout. Avoid ACKs in group/broadcast mode to limit collision risk.
- **Length field (LEN)**: 0..31, equals the number of DATA bytes in the message.
- **CHECKSUM**: `sum of Byte 1..Byte n-2` (basic additive checksum, no error correction).
- **NodeType table** (from §3.2.2): 02h=Ø30 DC Serie RS485, 05h=RS485 RTS transmitter, 06h=Glydea RS485, 07h=Ø50 AC Serie RS485, 08h=Ø50 DC Serie RS485, 09h=Ø40 AC Serie RS485 (not yet available).
- **Master NodeType**: Always `0h`.
- **Per-source caveat** (NACK §6.1.3): "Above mentioned NACK values are implemented in all products" — other error codes may exist on specific products.
- **MOVETO function 04h**: Position is 0..100, treated as % of full travel.
- **MOTOR_IP function 04h**: `Value` = desired IP count; sets the first N IPs to evenly-spaced positions (e.g. N=2 → IP1=33%, IP2=66%).

<!-- UNRESOLVED: TaHoma v1.2-specific gateway configuration (LAN REST API, cloud pairing, Zigbee/RTS bridges) is not in the supplied source. -->
<!-- UNRESOLVED: device-specific speed ranges ("See Technical Datasheet") and the master NodeID value used by TaHoma on the SDN bus are not in the source. -->
<!-- UNRESOLVED: no firmware version compatibility range is stated; firmware field is left empty. -->
```
<br>

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:14.635Z
last_checked_at: 2026-06-02T22:14:52.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:52.221Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TaHoma-specific gateway configuration (LAN/HTTP API, cloud pairing) is not covered by the supplied source."
- "source describes SDN bus protocol generically; TaHoma-specific bindings (which NodeIDs TaHoma emulates) not stated."
- "physical bus is RS-485 (per source); a \"serial\" transport block"
- "data bit inversion is required: every byte is bitwise NOT before"
- "source does not state RS-232 vs RS-485 explicitly inside the"
- "source describes only solicited POST_xxx replies; no unsolicited"
- "no multi-step sequences are explicitly defined in the source."
- "source does not document any external interlocks (e.g. E-stop, safety"
- "TaHoma v1.2-specific gateway configuration (LAN REST API, cloud pairing, Zigbee/RTS bridges) is not in the supplied source."
- "device-specific speed ranges (\"See Technical Datasheet\") and the master NodeID value used by TaHoma on the SDN bus are not in the source."
- "no firmware version compatibility range is stated; firmware field is left empty."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
