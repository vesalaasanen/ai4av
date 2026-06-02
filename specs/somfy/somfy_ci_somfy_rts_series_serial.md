---
spec_id: admin/somfy-rs485-rts-transmitter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy RS485 RTS Transmitter (SDN) Control Spec"
manufacturer: Somfy
model_family: "RS485 RTS transmitter"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "RS485 RTS transmitter"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:09.501Z
last_checked_at: 2026-06-02T05:46:17.108Z
generated_at: 2026-06-02T05:46:17.108Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the protocol/family, not a specific SKU. No part number stated."
  - "no flow control stated; default none"
  - "not a transport spec field; documented in source"
  - "documented in source §4.2"
  - "documented in source §4.2 (NOT applied before TX)"
  - "no power ramp-down - motor stops immediately (source §6.4.2)"
  - "source does not document thermal-protection thresholds, obstacle-detection sensitivity, or run-time/timeout limits - do not infer."
  - "no specific SKU / part number, electrical limits, default-firmware behavior post-reset, or obstacle/thermal thresholds stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:17.108Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literally to source commands with correct hex codes; transport parameters verified verbatim; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy RS485 RTS Transmitter (SDN) Control Spec

## Summary
Spec for the Somfy RS485 RTS Transmitter (NodeType 05h) on the Somfy Digital Network (SDN) bus. Covers the asynchronous serial/RS-485 frame format, message identifiers (GET/SET/CTRL/POST/ACK/NACK), and the device-management, configuration, control, and status messages documented in the SDN Protocol Integration Guide.

<!-- UNRESOLVED: source describes the protocol/family, not a specific SKU. No part number stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none  # UNRESOLVED: no flow control stated; default none
  physical_layer: RS485  # UNRESOLVED: not a transport spec field; documented in source
  bit_order: LSB_first  # UNRESOLVED: documented in source §4.2
  data_inversion: true  # UNRESOLVED: documented in source §4.2 (NOT applied before TX)
auth:
  type: none  # inferred: no auth procedure in source

# Frame layout (source §5), 11-32 bytes total, all values transmitted
# LSB-first and bit-inverted (source §4.2 - actual bus byte = NOT(frame_byte)):
#   MSG | ACK/LEN | NODE_TYPE | SOURCE@ (3 bytes) | DEST@ (3 bytes) | DATA (0-21 bytes) | CHK
# CHK = sum of frame bytes 1..n-2 (source §5.6)
#
# Bus timing (source §4.3):
#   Tc  max 1ms between consecutive chars
#   Tfree  3ms bus free timeout
#   Trep  5-255ms slave reply delay (partially randomized)
#   Treq  min 10ms master quiet before next request
```

## Traits
```yaml
- queryable  # inferred: multiple GET_xxx commands
- routable  # inferred: group + broadcast + NodeType filtering in §3.4
- levelable  # inferred: SET_MOTOR_ROLLING_SPEED present
```

## Actions
```yaml
# Command field format: "<MSG> <ACK/LEN> <NODE_TYPE> <SRC@:3> <DST@:3> <DATA...> <CHK>"
# Each placeholder <...> is replaced by the implementer; CHK = sum(MSG..last DATA byte)
# Addressing modes (source §3.4): point-to-point (SRC=NodeID, DST=NodeID),
# group (SRC=GroupID, DST=000000h), broadcast (SRC=NodeID, DST=FFFFFFh).
# When ACK bit (B7 of byte 2) = 1, slave responds with ACK(7Fh) or NACK(6Fh).

# ===== Device Management =====

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40 <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=000000h|broadcast> <CHK>"
  params: []

- id: post_node_addr
  label: Node Address Report (slave → master)
  kind: feedback
  command: "60 <LEN=0> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> <CHK>"
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51 <ACK/LEN=84h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {group_index} {group_id_3bytes} <CHK>"
  params:
    - name: group_index
      type: integer
      description: Group table slot 0..15
    - name: group_id
      type: bytes
      description: 24-bit group address (3 bytes, LSBF)

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41 <ACK/LEN=81h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {group_index} <CHK>"
  params:
    - name: group_index
      type: integer
      description: Group table slot 0..15

- id: post_group_addr
  label: Group Address Report (slave → master)
  kind: feedback
  command: "61 <LEN=84h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {group_index} {group_id_3bytes} <CHK>"
  params: []

- id: ack
  label: Acknowledge
  kind: feedback
  command: "7F <LEN=0> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@=requester> <CHK>"
  params: []

- id: nack
  label: Negative Acknowledge / Error
  kind: feedback
  command: "6F <LEN=81h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@=requester> {error_code} <CHK>"
  params:
    - name: error_code
      type: enum
      description: "01h=data out of range, 10h=unknown message, 11h=length error, FFh=busy"

# ===== Device Information =====

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "74 <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_node_app_version
  label: Firmware Version Report (slave → master)
  kind: feedback
  command: "75 <LEN=86h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {app_ref_3bytes} {app_index_letter} {app_index_number} {reserved} <CHK>"
  params: []

- id: set_node_label
  label: Set Node Text Label
  kind: action
  command: "55 <ACK/LEN=90h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {label_16_bytes} <CHK>"
  params:
    - name: label
      type: string
      description: 16 ASCII characters, pad with 20h

- id: get_node_label
  label: Get Node Text Label
  kind: query
  command: "45 <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_node_label
  label: Node Text Label Report (slave → master)
  kind: feedback
  command: "65 <LEN=90h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {label_16_bytes} <CHK>"
  params: []

# ===== Device Configuration =====

- id: set_local_ui
  label: Set Local UI (lock/enable)
  kind: action
  command: "17 <ACK/LEN=83h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {function} {ui_index} {priority} <CHK>"
  params:
    - name: function
      type: enum
      description: "00h=enable/unlock, 01h=disable/lock"
    - name: ui_index
      type: enum
      description: "00h=all, 01h=DCT input, 02h=local stimuli, 03h=local radio, 04h=touch motion, 05h=LEDs"
    - name: priority
      type: integer
      description: 0..255; higher = higher priority

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  command: "27 <ACK/LEN=81h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {ui_index} <CHK>"
  params:
    - name: ui_index
      type: integer
      description: 1..UI_MAX

- id: post_local_ui
  label: Local UI Status Report (slave → master)
  kind: feedback
  command: "37 <LEN=85h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {ui_index} {status} {source_addr_3bytes} {priority} <CHK>"
  params: []

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15 <ACK/LEN=84h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {function} {ip_index} {value_lo} {value_hi} <CHK>"
  params:
    - name: function
      type: enum
      description: "00h=delete IP, 01h=set at current, 03h=set at % (Value=0..100), 04h=divide range into N IPs"
    - name: ip_index
      type: integer
      description: 1..16
    - name: value
      type: integer
      description: 16-bit; interpretation depends on function

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25 <ACK/LEN=81h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {ip_index} <CHK>"
  params:
    - name: ip_index
      type: integer
      description: 1..16

- id: post_motor_ip
  label: Intermediate Position Report (slave → master)
  kind: feedback
  command: "35 <LEN=84h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {ip_index} {reserved_lo} {reserved_hi} {ip_position_percentage} <CHK>"
  params: []

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed (DC motors only)
  kind: action
  command: "13 <ACK/LEN=83h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {up_speed} {down_speed} {slow_speed} <CHK>"
  params:
    - name: up_speed
      type: integer
      description: rpm; range per device technical datasheet
    - name: down_speed
      type: integer
      description: rpm; range per device technical datasheet
    - name: slow_speed
      type: integer
      description: rpm; range per device technical datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23 <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report (slave → master)
  kind: feedback
  command: "33 <LEN=83h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {up_speed} {down_speed} {slow_speed} <CHK>"
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16 <ACK/LEN=82h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {function} {priority} <CHK>"
  params:
    - name: function
      type: enum
      description: "00h=unlock, 01h=lock, 03h=save lock on power cycle, 04h=do not save lock on power cycle"
    - name: priority
      type: integer
      description: 0..255; required for functions 00h/01h, ignored for 03h/04h

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26 <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_network_lock
  label: Network Lock Status Report (slave → master)
  kind: feedback
  command: "36 <LEN=86h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {status} {source_addr_3bytes} {priority} {saved} <CHK>"
  params: []

# ===== Device Control =====

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "03 <ACK/LEN=84h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {function} {position_lo} {position_hi} {reserved=00h} <CHK>"
  params:
    - name: function
      type: enum
      description: "00h=down limit, 01h=up limit, 02h=IP index (Position=0..15), 04h=position % (Position=0..100)"
    - name: position
      type: integer
      description: 16-bit; meaning depends on function

- id: ctrl_stop
  label: Stop
  kind: action
  command: "02 <ACK/LEN=81h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> {reserved=00h} <CHK>"
  params: []
  # UNRESOLVED: no power ramp-down - motor stops immediately (source §6.4.2)

# ===== Device Status =====

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0C <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_motor_position
  label: Motor Position Report (slave → master)
  kind: feedback
  command: "0D <LEN=85h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {position_pulse_lo} {position_pulse_hi} {position_percentage} {reserved} {ip} <CHK>"
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0E <ACK/LEN=0|80h> <NODE_TYPE=05h> <SRC@> <DST@=target_NodeID> <CHK>"
  params: []

- id: post_motor_status
  label: Motor Status Report (slave → master)
  kind: feedback
  command: "0F <LEN=84h> <NODE_TYPE=05h> <SRC@=responding_NodeID> <DST@> {status} {direction} {source} {cause} <CHK>"
  params:
    - name: status
      type: enum
      description: "00h=stopped, 01h=running, 02h=blocked, 03h=locked"
    - name: direction
      type: enum
      description: "00h=going down, 01h=going up, FFh=unknown"
    - name: source
      type: enum
      description: "00h=internal, 01h=network message, 02h=local UI"
    - name: cause
      type: enum
      description: "00h=target reached, 01h=explicit cmd, 02h=wink, 20h=obstacle, 21h=over-current, 22h=thermal, 30h=run time exceeded, 32h=timeout (CTRL_MOVE > 2min), FFh=reset/power up"
```

## Feedbacks
```yaml
- id: node_address
  type: bytes
  description: 3-byte NodeID returned in POST_NODE_ADDR (60h)
- id: group_address
  type: bytes
  description: 3-byte GroupID returned in POST_GROUP_ADDR (61h)
- id: firmware_version
  type: object
  description: POST_NODE_APP_VERSION (75h) - 24-bit App_Reference, ASCII major letter, minor number, reserved
- id: node_label
  type: string
  description: 16-byte ASCII label returned in POST_NODE_LABEL (65h)
- id: local_ui_status
  type: object
  description: POST_LOCAL_UI (37h) - UI_Index, Status (00h=enabled/01h=disabled), Source_Addr, Priority
- id: motor_ip
  type: object
  description: POST_MOTOR_IP (35h) - IP_index, position percentage (FFh=not set)
- id: motor_rolling_speed
  type: object
  description: POST_MOTOR_ROLLING_SPEED (33h) - UP, DOWN, Slow speeds
- id: network_lock_status
  type: object
  description: POST_NETWORK_LOCK (36h) - Status, Source_Addr, Priority, Saved flag
- id: motor_position
  type: object
  description: POST_MOTOR_POSITION (0Dh) - pulse count, percentage, IP index (FFh=no match)
- id: motor_status
  type: object
  description: POST_MOTOR_STATUS (0Fh) - Status/Direction/Source/Cause
- id: ack_nack
  type: enum
  description: ACK(7Fh) success or NACK(6Fh) error code (01h/10h/11h/FFh)
```

## Variables
```yaml
- id: group_table
  description: Up to 16 GroupID entries per device (GroupIndex 0..15)
- id: node_label
  description: 16-char ASCII label per device
- id: local_ui_locks
  description: Per UI_Index (00h..05h) enable/lock state with priority 0..255
- id: motor_intermediate_positions
  description: Up to 16 IP slots (IP_Index 1..16), position 0..100%
- id: motor_rolling_speed
  description: UP/DOWN/Slow speed triplet (DC motors only)
- id: network_lock
  description: Lock state + priority + power-cycle persist flag
```

## Safety
```yaml
confirmation_required_for:
  - ctrl_moveto  # physical movement; could pinch/crush
  - set_motor_ip  # modifies limit positions
interlocks:
  - "When NETWORK_LOCK=locked, all CTRL_xxx and limit-modifying SET messages are rejected (NACK NODE_IS_LOCKED) unless sender priority ≥ lock priority"
  - "Lock may be re-set or removed only by message with equal or higher priority (source §6.3.4)"
# UNRESOLVED: source does not document thermal-protection thresholds, obstacle-detection sensitivity, or run-time/timeout limits - do not infer.
```

## Notes
- Source protocol is **RS-485** (not RS-232C as hinted in input); physical-layer detail recorded as `serial.physical_layer` in Transport.
- All bytes on the wire are **bit-inverted** (LSB-first) before transmission: actual_bus_byte = NOT(frame_byte) (source §4.2).
- No synchronization byte; message boundary detected by bus inactivity (≥ Tfree = 3 ms).
- Acknowledged control messages should be retried on NACK or ACK timeout ≥ Treq (10 ms) (source §3.6).
- In group/broadcast modes the source recommends NOT requesting ACK or feedback to avoid collision risk (source §3.7).
- Each device's 3-byte NodeID is factory-programmed and not changeable; recycle period 3–5 years (source §3.2.1).
- POST messages are slave-originated responses to GET requests and are also enumerated above for completeness so an implementer can recognize unsolicited-looking frames.
- Firmware major letter is ASCII 41h..5Ah (A..Z); minor number is separate byte (source §6.2.1).

<!-- UNRESOLVED: no specific SKU / part number, electrical limits, default-firmware behavior post-reset, or obstacle/thermal thresholds stated in source. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:09.501Z
last_checked_at: 2026-06-02T05:46:17.108Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:17.108Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literally to source commands with correct hex codes; transport parameters verified verbatim; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the protocol/family, not a specific SKU. No part number stated."
- "no flow control stated; default none"
- "not a transport spec field; documented in source"
- "documented in source §4.2"
- "documented in source §4.2 (NOT applied before TX)"
- "no power ramp-down - motor stops immediately (source §6.4.2)"
- "source does not document thermal-protection thresholds, obstacle-detection sensitivity, or run-time/timeout limits - do not infer."
- "no specific SKU / part number, electrical limits, default-firmware behavior post-reset, or obstacle/thermal thresholds stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
