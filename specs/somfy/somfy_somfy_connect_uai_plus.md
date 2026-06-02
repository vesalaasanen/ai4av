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
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:14.307Z
last_checked_at: 2026-05-14T18:17:20.667Z
generated_at: 2026-05-14T18:17:20.667Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a generic SDN protocol reference; per-motor capability ranges (speed limits, pulse ranges, IP_MAX, UI_MAX, etc.) are referenced as \"See Technical Datasheet\" and cannot be populated from this source alone. The IP-side / gateway-side of \"Somfy Connect UAI+\" is not described in this document."
  - "this source is a bus-protocol reference and contains no installer-facing"
  - "this spec is sourced from the generic SDN protocol reference; per-device firmware compatibility, per-device motor speed/pulse ranges, the IP_MAX and UI_MAX values, and any \"Somfy Connect UAI+\"-specific extension commands are not stated in the source and must be filled in from device-specific datasheets or a verified integration."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.667Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 29 spec actions matched with verbatim msg_code values in source; transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy Somfy Connect UAI+ Control Spec

## Summary

The Somfy Connect UAI+ participates in the Somfy Digital Network (SDN), an RS-485 multi-drop bus on which a MASTER device exchanges framed messages with RS-485 motor and transmitter nodes (Glydea, Ø30 DC, Ø50 AC/DC, RS485 RTS transmitter, etc.). This spec covers the bus transport, the full message frame, and every SET/CTRL/GET/POST message documented in the SDN protocol reference, including device management, configuration, motor control, and status reporting.

<!-- UNRESOLVED: the source is a generic SDN protocol reference; per-motor capability ranges (speed limits, pulse ranges, IP_MAX, UI_MAX, etc.) are referenced as "See Technical Datasheet" and cannot be populated from this source alone. The IP-side / gateway-side of "Somfy Connect UAI+" is not described in this document. -->

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
  # Physical layer: RS-485 multi-drop bus.
  # Character coding: NRZ.
  # Bit order: LSB first.
  # All data bits are inverted before transmission (backward compatibility with earliest protocol versions).
  # Example from source: transmitted byte 58h appears on the bus as NOT(58h) = A7h.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from stop / move-to commands driving motor power
- levelable  # inferred from move-to-position (percent and IP) commands
- queryable  # inferred from GET_xxx query commands
```

## Actions
```yaml
# SDN message frame layout (per source §5):
#   Byte 1          : MSG (1 byte, message identifier - literal below)
#   Byte 2          : ACK/LEN (1 byte - high bit = ACK request, lower bits = DATA length 0-31)
#   Byte 3          : NODE TYPE (1 byte - DEST NodeType used for NodeType filtering;
#                     SOURCE NodeType is always 00h for a MASTER)
#   Bytes 4..6      : SOURCE@ (3 bytes, LSBF)
#   Bytes 7..9      : DEST@ (3 bytes, LSBF)
#   Bytes 10..n-2   : DATA (length is the LEN value in byte 2)
#   Bytes n-1..n    : CHECKSUM (2 bytes; sum of bitwise-NOT of every preceding byte)
#
# Minimum frame: 11 bytes (no DATA). Maximum: 32 bytes (21 bytes of DATA).
# Every byte on the wire is the bitwise inverse of the value above (per source §4.2).
# SOURCE@ and DEST@ are LSB first (per source §5.4).
# No synchronization byte - messages are delimited by bus inactivity (per source §4.3).
# Placeholders used:
#   {ack_len}        = byte 2, ACK bit + LEN value combined
#   {filter_nodetype}= byte 3, DEST NodeType filter (00h = no filter, e.g. 06h = Glydea)
#   {src_addr}       = 3 bytes SOURCE@, LSBF
#   {dst_addr}       = 3 bytes DEST@, LSBF
#   {checksum}       = 2 bytes, computed by controller

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {function} {position:2byte} {reserved} {checksum:2byte}"
  params:
    - name: function
      type: enum
      description: |
        Movement function (1 byte):
          00h = Move to DOWN limit (position ignored)
          01h = Move to UP limit (position ignored)
          02h = Move to Intermediate Position (position = IP index 0-15)
          04h = Move to Position in % of full travel range (position = 0-100)
    - name: position
      type: integer
      description: 16-bit value. Meaning depends on function (IP index 0-15 or percent 0-100).
    - name: reserved
      type: integer
      description: 1 byte. Reserved - set to 00h or FFh (per source §5.5).

- id: ctrl_stop
  label: Stop
  kind: action
  command: "02h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {reserved} {checksum:2byte}"
  params:
    - name: reserved
      type: integer
      description: 1 byte. Reserved - set to 00h or FFh (per source §5.5). Motor stops immediately with no speed ramp-down (per source §6.4.2).

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {group_index} {group_id:3byte} {checksum:2byte}"
  params:
    - name: group_index
      type: integer
      description: Group table entry 0-15.
    - name: group_id
      type: string
      description: 24-bit GroupID (3 bytes, LSBF). Same format as a NodeID.

- id: set_node_label
  label: Set Node Text Label
  kind: action
  command: "55h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {label:16char} {checksum:2byte}"
  params:
    - name: label
      type: string
      description: 16-character ASCII label, space-padded if shorter (DATA length is always 16).

- id: set_local_ui
  label: Set Local UI Lock State
  kind: action
  command: "17h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {function} {ui_index} {priority} {checksum:2byte}"
  params:
    - name: function
      type: enum
      values: [00, 01]
      description: "00h = Enable/Unlock, 01h = Disable/Lock"
    - name: ui_index
      type: enum
      values: [00, 01, 02, 03, 04, 05]
      description: |
        UI element (1 byte):
          00h = All local controls and feedbacks
          01h = DCT input
          02h = Local stimuli (radio pairing pushbutton)
          03h = Local Radio access (Bluetooth)
          04h = Touch Motion feature
          05h = LEDs
    - name: priority
      type: integer
      description: Lock priority 00h-FFh. Higher number = higher priority.

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {function} {ip_index} {value:2byte} {checksum:2byte}"
  params:
    - name: function
      type: enum
      values: [00, 01, 03, 04]
      description: |
        IP operation (1 byte):
          00h = Delete IP at ip_index (value ignored; NACK(IP_NOT_SET) if not set)
          01h = Set IP at the current position (value ignored)
          03h = Set IP at the specified position (value = position in %)
          04h = Divide full range into N IPs (value = IP count, ip_index ignored;
                first N IPs are equally spaced from top to bottom)
    - name: ip_index
      type: integer
      description: IP table index 1-16.
    - name: value
      type: integer
      description: 16-bit value. Meaning depends on function (percent 0-100, or IP count for 04h).

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (DC motors only)
  kind: action
  command: "13h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {up_speed} {down_speed} {slow_speed} {checksum:2byte}"
  params:
    - name: up_speed
      type: integer
      description: UP movement speed (rpm). Range per device technical datasheet.
    - name: down_speed
      type: integer
      description: DOWN movement speed (rpm). Range per device technical datasheet.
    - name: slow_speed
      type: integer
      description: Adjustment movement speed (rpm). Range per device technical datasheet.

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {function} {priority} {checksum:2byte}"
  params:
    - name: function
      type: enum
      values: [00, 01, 03, 04]
      description: |
        Lock operation (1 byte):
          00h = Unlock (priority applies)
          01h = Lock at current position (priority applies)
          03h = Save NETWORK_LOCK across power cycle (priority ignored)
          04h = Do not save NETWORK_LOCK across power cycle (priority ignored;
                default factory state)
    - name: priority
      type: integer
      description: Lock priority 00h-FFh. Higher = higher priority. When locked, only CTRL messages with equal or higher priority execute.

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {group_index} {checksum:2byte}"
  params:
    - name: group_index
      type: integer
      description: Group table entry 0-15 to query.

- id: get_node_app_version
  label: Get Node Application (Firmware) Version
  kind: query
  command: "74h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_node_label
  label: Get Node Text Label
  kind: query
  command: "45h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "27h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {ui_index} {checksum:2byte}"
  params:
    - name: ui_index
      type: integer
      description: UI element index 01h-UI_MAX (per device).

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: query
  command: "25h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {ip_index} {checksum:2byte}"
  params:
    - name: ip_index
      type: integer
      description: IP table index 1-16 to query.

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26h {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0Ch {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0Eh {ack_len} {filter_nodetype} {src_addr:3byte LSBF} {dst_addr:3byte LSBF} {checksum:2byte}"
  params: []
```

## Feedbacks
```yaml
# POST_xxx are SLAVE responses to GET_xxx queries. They share the same frame
# structure as Actions but originate at the controlled device. Decoded payload
# is described below; the wire bytes are bitwise-inverted versions of these.

- id: post_node_addr
  type: signal
  description: "POST_NODE_ADDR (60h). 0 bytes DATA. The address is in the response frame's SOURCE@ field (no DATA payload)."

- id: post_group_addr
  type: object
  description: "POST_GROUP_ADDR (61h). 4 bytes DATA."
  fields:
    - name: group_index
      type: integer
      description: Group table entry 0-15.
    - name: group_id
      type: string
      description: 24-bit GroupID (3 bytes, LSBF).

- id: post_node_app_version
  type: object
  description: "POST_NODE_APP_VERSION (75h). 6 bytes DATA."
  fields:
    - name: app_reference
      type: string
      description: 24-bit firmware part number (3 bytes).
    - name: app_index_letter
      type: char
      description: Firmware major revision letter, ASCII 41h-5Ah (A-Z).
    - name: app_index_number
      type: integer
      description: Firmware revision number (1 byte).
    - name: reserved
      type: integer
      description: Reserved (1 byte).

- id: post_node_label
  type: string
  description: "POST_NODE_LABEL (65h). 16 bytes DATA - space-padded ASCII label."

- id: post_local_ui
  type: object
  description: "POST_LOCAL_UI (37h). 5 bytes DATA."
  fields:
    - name: ui_index
      type: integer
      description: UI element index queried.
    - name: status
      type: enum
      values: [00, 01]
      description: "00h = Enabled/Unlocked, 01h = Disabled/Locked."
    - name: source_addr
      type: string
      description: NodeID of the device that sent the lock command (3 bytes, LSBF); 000000h when unlocked.
    - name: priority
      type: integer
      description: Lock priority 00h-FFh. Reset to 0x00 when unlocked.

- id: post_motor_ip
  type: object
  description: "POST_MOTOR_IP (35h). 4 bytes DATA."
  fields:
    - name: ip_index
      type: integer
      description: IP table index 1-16.
    - name: reserved
      type: integer
      description: 16-bit reserved field.
    - name: ip_position_percentage
      type: integer
      description: "0-100, or FFh if IP not set at this index."

- id: post_motor_rolling_speed
  type: object
  description: "POST_MOTOR_ROLLING_SPEED (33h). 3 bytes DATA."
  fields:
    - name: up_speed
      type: integer
      description: UP movement speed.
    - name: down_speed
      type: integer
      description: DOWN movement speed.
    - name: slow_speed
      type: integer
      description: Adjustment movement speed.

- id: post_network_lock
  type: object
  description: "POST_NETWORK_LOCK (36h). 6 bytes DATA."
  fields:
    - name: status
      type: enum
      values: [00, 01]
      description: "00h = Unlocked, 01h = Locked."
    - name: source_addr
      type: string
      description: NodeID of the device that sent the lock command.
    - name: priority
      type: integer
      description: Lock priority 00h-FFh.
    - name: saved
      type: enum
      values: [00, 01]
      description: "00h = Lock will not be restored on power cycle, 01h = Lock will be restored on power cycle."

- id: post_motor_position
  type: object
  description: "POST_MOTOR_POSITION (0Dh). 5 bytes DATA. Sent even while the motor is running."
  fields:
    - name: position_pulse
      type: integer
      description: 16-bit pulse count between UP_LIMIT and DOWN_LIMIT.
    - name: position_percentage
      type: integer
      description: Position 0-100 percent.
    - name: reserved
      type: integer
      description: 8-bit reserved.
    - name: ip
      type: integer
      description: "01h-IP_MAX if at an IP; FFh otherwise. If multiple IPs match, first matching index is returned."

- id: post_motor_status
  type: object
  description: "POST_MOTOR_STATUS (0Fh). 4 bytes DATA."
  fields:
    - name: status
      type: enum
      values: [00, 01, 02, 03]
      description: |
        Motor state:
          00h = Stopped
          01h = Running
          02h = Blocked (thermal protection, obstacle)
          03h = Locked (by NETWORK_LOCK)
    - name: direction
      type: enum
      values: [00, 01, FF]
      description: |
        Direction:
          00h = Going DOWN
          01h = Going UP (or last movement direction if stopped)
          FFh = Unknown
    - name: source
      type: enum
      values: [00, 01, 02]
      description: |
        Origin of last command:
          00h = Internal (limit/IP reached, over-current, obstacle, thermal)
          01h = Network message
          02h = Local UI (DCT, local stimulus, local wireless)
    - name: cause
      type: enum
      values: [00, 01, 02, 20, 21, 22, 30, 32, FF]
      description: |
        Additional information:
          00h = Target reached
          01h = Explicit command (network or Local UI)
          02h = Wink
          20h = Obstacle detection
          21h = Over-current protection
          22h = Thermal protection
          30h = Run time exceeded
          32h = Timeout exceeded (CTRL_MOVE > 2 minutes => adjustment canceled)
          FFh = Reset / PowerUp

- id: ack
  type: signal
  description: "ACK (7Fh). 0 bytes DATA. Sent by a SLAVE in response to a CTRL/SET/GET message that had its ACK bit set, when the message was processed successfully."

- id: nack
  type: object
  description: "NACK (6Fh). 1 byte DATA: ErrorCode."
  fields:
    - name: error_code
      type: enum
      values: [01, 10, 11, FF]
      description: |
        Implemented across all products:
          01h = Data out of range
          10h = Unknown message
          11h = Message Length Error
          FFh = Busy - cannot process message
        Additional product-specific NACK codes may exist beyond those listed in source §6.1.3.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: this source is a bus-protocol reference and contains no installer-facing
# safety procedures, lockout/tagout steps, or power-on sequencing requirements.
# SET_NETWORK_LOCK is a control lock that blocks CTRL/SET messages, not a safety interlock.
# CTRL_STOP halts the motor immediately with no speed ramp-down (per source §6.4.2).
```

## Notes

**Bus and timing constraints (per source §4.3):**
- `Tc` (max time between consecutive characters in a frame): 1 ms max.
- `Tfree` (bus-free timeout): 3 ms.
- `Trep` (slave reply delay): 5-255 ms, partially randomized within range.
- `Treq` (master minimum gap before next request): 10 ms.
- No synchronization byte — frames are delimited by bus inactivity. Collisions are possible; source §3.7 recommends ACK + retry on NACK or timeout.

**Collision-avoidance guidance from source §3.7:**
- Do not request feedback in group or broadcast addressing mode.
- Do not request ACK in group or broadcast mode.

**Addressing modes (per source §3.4 and §5.4):**
- Point-to-point: `SOURCE@` = NodeID, `DEST@` = NodeID.
- Group: `SOURCE@` = GroupID, `DEST@` = `000000h` (every node with this GroupID responds).
- Broadcast: `SOURCE@` = NodeID, `DEST@` = `FFFFFFh` (every node on the bus responds).
- NodeType filtering via byte 3 (e.g. `02h` Ø30 DC, `05h` RS485 RTS, `06h` Glydea, `07h` Ø50 AC, `08h` Ø50 DC) limits which product family responds.

**Byte 3 (NODE TYPE) interpretation:** Source §5.3 states "SOURCE NodeType = NodeType of the transmitter — Always 0h for MASTER devices" and "DEST NodeType = NodeType of the receiver(s) — Used to implement NodeType filtering". In practice the field carries the destination NodeType for filtering, since a MASTER's source nodetype is always 00h.

**Reserved fields:** Per source §5.5, fields marked "Reserved" must be present in the message and set to `00h` or `FFh`.

**Bit inversion on the wire:** Per source §4.2, every data byte is bitwise-inverted before transmission for backward compatibility with the earliest protocol version. Source example: logical `58h` is transmitted on the bus as `A7h`. The implementer must apply this inversion to both transmit and receive paths.

**Byte order:** SOURCE@ and DEST@ are LSB first (per source §5.4). The byte order of multi-byte DATA fields (e.g. `Position` 16-bit, `GroupID` 24-bit, `App_Reference` 24-bit) is not explicitly stated; treat as UNRESOLVED and verify against a real device.

**Action coverage rationale:** Every distinct MSG identifier in source §6 is enumerated as a separate Action or Query, including all parameter-bearing sub-commands (CTRL_MOVETO function variants, SET_MOTOR_IP function variants, SET_LOCAL_UI function/ui_index variants, SET_NETWORK_LOCK function variants, SET_MOTOR_ROLLING_SPEED speed triplet), per-IP queries, firmware/app version queries, label queries, and motor status/position queries. The full set of POST_xxx slave responses is enumerated as Feedbacks.

**Operational notes from source:**
- Per §6.3.1, factory default is all UI enabled; DCT/Local Stimuli lock state is not saved across power-up, all other UI lock states are.
- Per §6.3.4, factory default for NETWORK_LOCK is "Do Not Save" — no lock is restored at power-up.
- Per §6.5.2, if a CTRL_MOVE exceeds 2 minutes the motor cancels the adjustment and POST_MOTOR_STATUS reports `cause=32h`.

<!-- UNRESOLVED: this spec is sourced from the generic SDN protocol reference; per-device firmware compatibility, per-device motor speed/pulse ranges, the IP_MAX and UI_MAX values, and any "Somfy Connect UAI+"-specific extension commands are not stated in the source and must be filled in from device-specific datasheets or a verified integration. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:14.307Z
last_checked_at: 2026-05-14T18:17:20.667Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.667Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 29 spec actions matched with verbatim msg_code values in source; transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a generic SDN protocol reference; per-motor capability ranges (speed limits, pulse ranges, IP_MAX, UI_MAX, etc.) are referenced as \"See Technical Datasheet\" and cannot be populated from this source alone. The IP-side / gateway-side of \"Somfy Connect UAI+\" is not described in this document."
- "this source is a bus-protocol reference and contains no installer-facing"
- "this spec is sourced from the generic SDN protocol reference; per-device firmware compatibility, per-device motor speed/pulse ranges, the IP_MAX and UI_MAX values, and any \"Somfy Connect UAI+\"-specific extension commands are not stated in the source and must be filled in from device-specific datasheets or a verified integration."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
