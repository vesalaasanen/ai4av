---
spec_id: admin/somfy-animeo-sdn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy Animeo (SDN RS-485) Control Spec"
manufacturer: Somfy
model_family: "Ø30 DC Serie RS485"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Ø30 DC Serie RS485"
    - "RS485 RTS transmitter"
    - "Glydea RS485"
    - "Ø50 AC Serie RS485"
    - "Ø50 DC Serie RS485"
    - "Ø40 AC Serie RS485"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:07.493Z
last_checked_at: 2026-06-02T05:46:14.717Z
generated_at: 2026-06-02T05:46:14.717Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model behavior (e.g. Glydea vs. Ø50) is governed by NodeType filtering but the source does not document which commands a specific model implements."
  - "physical layer details (cable type, termination, max bus length) not stated in this source."
  - "settable parameters that are not discrete action mnemonics: only the"
  - "the protocol has no unsolicited event channel. Every SLAVE response"
  - "source does not describe multi-step sequences. Power-on"
  - "source contains no operator-facing safety warnings, lockout"
  - "per-product capability matrix (which MSG identifiers each NodeType implements) is not in this protocol guide; the matrix lives in each product's technical datasheet."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:14.717Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions matched literally to source MSG codes and parameters; transport parameters verified against serial config (4800 baud, 8 data bits, odd parity); full bidirectional coverage of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy Animeo (SDN RS-485) Control Spec

## Summary
Spec covers the SOMFY Digital Network (SDN) protocol used by Somfy RS-485 products (Animeo-compatible motor controllers and transmitters: Ø30 DC, Glydea, Ø50 AC/DC series, RS485 RTS transmitter). Transport is half-duplex asynchronous serial on an RS-485 bus at 4800 baud, 8 data bits, odd parity, NRZ with bit-inversion for backward compatibility. The protocol carries SET (configuration), CTRL (control), GET (request), POST (response), and ACK/NACK messages between a single MASTER and one or more SLAVEs.

<!-- UNRESOLVED: per-model behavior (e.g. Glydea vs. Ø50) is governed by NodeType filtering but the source does not document which commands a specific model implements. -->

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
  # UNRESOLVED: physical layer details (cable type, termination, max bus length) not stated in this source.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from GET_xxx command catalogue
- levelable  # inferred from MOVETO position-in-% control and intermediate-position (IP) presets
```

## Actions
```yaml
# SDN frame layout (all messages, verbatim from §5 of source):
#   Byte 1       : MSG          (message identifier)
#   Byte 2       : ACK/LEN      (ACK bit + 5-bit LEN, 0..31)
#   Byte 3       : NODE TYPE    (4-bit SRC NodeType | 4-bit DEST NodeType; SRC=0h for MASTER)
#   Bytes 4..6   : SOURCE @     (3 bytes NodeID, LSBF)
#   Bytes 7..9   : DEST @       (3 bytes NodeID, LSBF; FFFFFFh for broadcast)
#   Bytes 10..n-2: DATA         (per-message payload, see §6)
#   Bytes n-1,n  : CHECKSUM     (two copies of NOT(Σ bytes 1..n-2))
# All data bits are transmitted inverted (NOT of intended byte) on the wire.
# `{ack}` = ACK/LEN byte; `{nodetype}` = NODE TYPE byte; `{src3}` = 3 SRC @ bytes;
# `{dest3}` = 3 DEST @ bytes; `{checksum}` = 2-byte CHECKSUM; `LSBF` = least-significant
# byte first within multi-byte fields.

# ---------------- Device Management ----------------

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "40 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 40h, DATA length 0. SLAVE replies with POST_NODE_ADDR (60h).

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "51 {ack} {nodetype} {src3} {dest3} {groupindex} {groupid3} {checksum}"
  params:
    - name: groupindex
      type: integer
      description: Group table entry index (0..15)
    - name: groupid
      type: string
      description: 24-bit GroupID (3 bytes, LSBF). Any NodeID not used by another device on the bus.
  notes: MSG 51h, DATA length 4. See §6.1.2.

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "41 {ack} {nodetype} {src3} {dest3} {groupindex} {checksum}"
  params:
    - name: groupindex
      type: integer
      description: Group table entry index (0..15)
  notes: MSG 41h, DATA length 1. SLAVE replies with POST_GROUP_ADDR (61h).

- id: ack
  label: Acknowledge
  kind: feedback
  command: "7F {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 7Fh, DATA length 0. Only sent by SLAVE when ACK bit was 1 in the originating request. Sent on successful Settings save or Control execution start. §6.1.3.

- id: nack
  label: Negative Acknowledge
  kind: feedback
  command: "6F {ack} {nodetype} {src3} {dest3} {errorcode} {checksum}"
  params:
    - name: errorcode
      type: integer
      description: "01h Data out of range | 10h Unknown message | 11h Message length error | FFh Busy"
  notes: MSG 6Fh, DATA length 1. §6.1.3.

# ---------------- Device Information ----------------

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  command: "74 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 74h, DATA length 0. SLAVE replies with POST_NODE_APP_VERSION (75h). §6.2.1.

- id: set_node_label
  label: Set User Label
  kind: action
  command: "55 {ack} {nodetype} {src3} {dest3} {label16} {checksum}"
  params:
    - name: label
      type: string
      description: 16 ASCII characters; pad with spaces if shorter.
  notes: MSG 55h, DATA length 16. §6.2.2.

- id: get_node_label
  label: Get User Label
  kind: query
  command: "45 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 45h, DATA length 0. SLAVE replies with POST_NODE_LABEL (65h) carrying the 16-char label. §6.2.2.

# ---------------- Device Configuration ----------------

- id: set_local_ui
  label: Set Local UI Lock
  kind: action
  command: "17 {ack} {nodetype} {src3} {dest3} {function} {ui_index} {priority} {checksum}"
  params:
    - name: function
      type: integer
      description: "00h Enable/Unlock | 01h Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h All local controls & feedbacks | 01h DCT input | 02h Local stimuli (e.g. radio pairing) | 03h Local radio (e.g. Bluetooth) | 04h Touch Motion | 05h LEDs"
    - name: priority
      type: integer
      description: 0..255; greater number = higher priority. Must be >= current lock level for that UI, else NACK(LOW_PRIORITY).
  notes: MSG 17h, DATA length 3. §6.3.1.

- id: get_local_ui
  label: Get Local UI Lock
  kind: query
  command: "27 {ack} {nodetype} {src3} {dest3} {ui_index} {checksum}"
  params:
    - name: ui_index
      type: integer
      description: "01h..UI_MAX (see SET_LOCAL_UI UI_Index table)"
  notes: MSG 27h, DATA length 1. SLAVE replies with POST_LOCAL_UI (37h). §6.3.1.

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "15 {ack} {nodetype} {src3} {dest3} {function} {ip_index} {value2} {checksum}"
  params:
    - name: function
      type: integer
      description: "00h Delete IP | 01h Set IP at current position | 03h Set IP at given % | 04h Divide full range into N equally-spaced IPs"
    - name: ip_index
      type: integer
      description: 1..16; ignored when function=04h.
    - name: value
      type: integer
      description: 16-bit; position in % (function 03h) or IP count (function 04h). Ignored for functions 00h/01h.
  notes: MSG 15h, DATA length 4. §6.3.2.

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "25 {ack} {nodetype} {src3} {dest3} {ip_index} {checksum}"
  params:
    - name: ip_index
      type: integer
      description: 1..16
  notes: MSG 25h, DATA length 1. SLAVE replies with POST_MOTOR_IP (35h). §6.3.2.

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13 {ack} {nodetype} {src3} {dest3} {up_speed} {down_speed} {slow_speed} {checksum}"
  params:
    - name: up_speed
      type: integer
      description: UP-movement speed in rpm; see device technical datasheet for valid range.
    - name: down_speed
      type: integer
      description: DOWN-movement speed in rpm; see device technical datasheet.
    - name: slow_speed
      type: integer
      description: Adjustment-movement speed in rpm; see device technical datasheet.
  notes: MSG 13h, DATA length 3. DC motors only. §6.3.3.

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 23h, DATA length 0. SLAVE replies with POST_MOTOR_ROLLING_SPEED (33h). §6.3.3.

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16 {ack} {nodetype} {src3} {dest3} {function} {priority} {checksum}"
  params:
    - name: function
      type: integer
      description: "00h Unlock | 01h Lock at current position | 03h Save NETWORK_LOCK across power cycle | 04h Do not save across power cycle"
    - name: priority
      type: integer
      description: 0..255; greater = higher priority. Ignored for functions 03h/04h.
  notes: MSG 16h, DATA length 2. When locked, only CTRL messages with equal/higher priority are accepted. §6.3.4.

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "26 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 26h, DATA length 0. SLAVE replies with POST_NETWORK_LOCK (36h). §6.3.4.

# ---------------- Device Control ----------------

- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03 {ack} {nodetype} {src3} {dest3} {function} {position2} {reserved} {checksum}"
  params:
    - name: function
      type: integer
      description: "00h Move to DOWN limit | 01h Move to UP limit | 02h Move to Intermediate Position (IP index in Position) | 04h Move to % of full range"
    - name: position
      type: integer
      description: 16-bit. IP index 0..15 for function 02h; % value 0..100 for function 04h; ignored for 00h/01h.
  notes: MSG 03h, DATA length 4. §6.4.1.

- id: ctrl_stop
  label: Stop
  kind: action
  command: "02 {ack} {nodetype} {src3} {dest3} {reserved} {checksum}"
  params:
    - name: reserved
      type: integer
      description: Set to 00h; ignored by device.
  notes: MSG 02h, DATA length 1. Motor stops immediately without ramp-down. §6.4.2.

# ---------------- Device Status ----------------

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0C {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 0Ch, DATA length 0. SLAVE replies with POST_MOTOR_POSITION (0Dh). §6.5.1.

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0E {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 0Eh, DATA length 0. SLAVE replies with POST_MOTOR_STATUS (0Fh). §6.5.2.
```

## Feedbacks
```yaml
- id: post_node_addr
  label: Node Address Report
  type: bytes
  command: "60 {ack} {nodetype} {src3} {dest3} {checksum}"
  notes: MSG 60h, DATA length 0. SLAVE-side reply to GET_NODE_ADDR (40h). Address carried in SRC@ header bytes.

- id: post_group_addr
  label: Group Address Report
  type: bytes
  command: "61 {ack} {nodetype} {src3} {dest3} {groupindex} {groupid3} {checksum}"
  notes: MSG 61h, DATA length 4. Reply to GET_GROUP_ADDR (41h).

- id: post_node_app_version
  label: Firmware Revision Report
  type: bytes
  command: "75 {ack} {nodetype} {src3} {dest3} {app_reference3} {app_indexletter} {app_indexnumber} {reserved} {checksum}"
  notes: MSG 75h, DATA length 6. App_Reference 24-bit part number, App_IndexLetter ASCII major (41h..5Ah), App_IndexNumber 8-bit revision, 8-bit reserved. Example: 5063486A02 → 4Dh 43h 3Eh 41h 02h.

- id: post_node_label
  label: User Label Report
  type: bytes
  command: "65 {ack} {nodetype} {src3} {dest3} {label16} {checksum}"
  notes: MSG 65h, DATA length 16. Reply to GET_NODE_LABEL (45h).

- id: post_local_ui
  label: Local UI Lock Report
  type: bytes
  command: "37 {ack} {nodetype} {src3} {dest3} {status} {source_addr3} {priority} {checksum}"
  notes: MSG 37h, DATA length 5. Status: 00h Enabled/Unlocked, 01h Disabled/Locked. Source_Addr/Priority reset to 0 when unlocked.

- id: post_motor_ip
  label: Intermediate Position Report
  type: bytes
  command: "35 {ack} {nodetype} {src3} {dest3} {ip_index} {reserved2} {ip_position_percentage} {checksum}"
  notes: MSG 35h, DATA length 4. IP_position_percentage: 0..100, or FFh if IP not set.

- id: post_motor_rolling_speed
  label: Motor Rolling Speed Report
  type: bytes
  command: "33 {ack} {nodetype} {src3} {dest3} {up_speed} {down_speed} {slow_speed} {checksum}"
  notes: MSG 33h, DATA length 3. Reply to GET_MOTOR_ROLLING_SPEED (23h). DC motors only.

- id: post_network_lock
  label: Network Lock Report
  type: bytes
  command: "36 {ack} {nodetype} {src3} {dest3} {status} {source_addr3} {priority} {saved} {checksum}"
  notes: MSG 36h, DATA length 6. Status: 00h Unlocked | 01h Locked. Saved: 00h not restored on power cycle | 01h restored on power cycle. Source_Addr/Priority reset when unlocked.

- id: post_motor_position
  label: Motor Position Report
  type: bytes
  command: "0D {ack} {nodetype} {src3} {dest3} {position_pulse2} {position_percentage} {reserved} {ip} {checksum}"
  notes: MSG 0Dh, DATA length 5. Position_pulse 16-bit between UP_LIMIT and DOWN_LIMIT. Position_percentage 0..100. IP byte 01h..IP_MAX, or FFh if no IP matches.

- id: post_motor_status
  label: Motor Status Report
  type: bytes
  command: "0F {ack} {nodetype} {src3} {dest3} {status} {direction} {source} {cause} {checksum}"
  notes: MSG 0Fh, DATA length 4. See §6.5.2 for enumerations.

- id: motor_status_state
  label: Motor State (Status field of POST_MOTOR_STATUS)
  type: enum
  values:
    - stopped
    - running
    - blocked
    - locked

- id: motor_status_direction
  label: Last Direction (Direction field of POST_MOTOR_STATUS)
  type: enum
  values:
    - down
    - up
    - unknown

- id: motor_status_source
  label: Command Origin (Source field of POST_MOTOR_STATUS)
  type: enum
  values:
    - internal
    - network
    - local_ui

- id: motor_status_cause
  label: Cause (Cause field of POST_MOTOR_STATUS)
  type: enum
  values:
    - target_reached
    - explicit_command
    - wink
    - obstacle_detection
    - over_current
    - thermal_protection
    - runtime_exceeded
    - timeout_exceeded
    - reset_powerup
```

## Variables
```yaml
# UNRESOLVED: settable parameters that are not discrete action mnemonics: only the
# variable-bearing action params (groupindex, groupid, ui_index, priority, ip_index,
# function, position, up/down/slow_speed) exist; they are encoded inside the action
# commands above. No standalone "Variables" entries apply.
```

## Events
```yaml
# UNRESOLVED: the protocol has no unsolicited event channel. Every SLAVE response
# (POST_xxx, ACK, NACK) is a reply to a MASTER GET/SET/CTRL. No spontaneous
# notifications are documented in the source.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences. Power-on
# sequencing and lock priority overrides are application-layer concerns.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no operator-facing safety warnings, lockout
# procedures, or mandatory confirmation rules beyond the priority-based
# network-lock mechanism (which is captured in SET_NETWORK_LOCK above). Per
# §3.6 the source itself recommends ACK-with-retry, but that is a bus
# reliability recommendation, not a safety interlock.
```

## Notes
Half-duplex RS-485, MASTER/SLAVE. Only one MASTER may drive the bus at a time. Slave response delay `Trep` is partially randomized 5–255 ms; master must wait `Treq ≥ 10 ms` after last bus activity before transmitting; inter-character gap `Tc ≤ 1 ms`. All payload bytes are sent bit-inverted (e.g. 58h → A7h on wire) for backward compatibility with earliest SDN revisions. Frame is delimited by bus inactivity — there is no sync byte — so `Tc` discipline is mandatory. Checksum is the byte-wise NOT of all preceding frame bytes (issued twice as two checksum bytes). All multi-byte fields (NodeID, GroupID, position) are LSB first.

Broadcast (`DEST@ = FFFFFFh`) and group addressing are supported, but ACK/feedback should not be requested in those modes (high collision risk; §3.7).

Set `priority` on `SET_NETWORK_LOCK` to a value at least equal to the highest currently-held lock, otherwise the SLAVE returns NACK with cause consistent with `NODE_IS_LOCKED` (§6.3.4). The lock blocks all movement and limit-changing commands, not just network MOVETO.

For `SET_MOTOR_IP` function 04h, the IP count is in `value` and `ip_index` is ignored. Example: `value=2` → IP1 at 33%, IP2 at 66%. Existing IPs are overwritten.

NodeType filtering (§3.2.2) lets a MASTER address a single product family by setting the DEST NodeType nibble in byte 3 — e.g. `02h` for Ø30 DC, `06h` for Glydea, `07h` for Ø50 AC.
<!-- UNRESOLVED: per-product capability matrix (which MSG identifiers each NodeType implements) is not in this protocol guide; the matrix lives in each product's technical datasheet. -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:07.493Z
last_checked_at: 2026-06-02T05:46:14.717Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:14.717Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions matched literally to source MSG codes and parameters; transport parameters verified against serial config (4800 baud, 8 data bits, odd parity); full bidirectional coverage of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model behavior (e.g. Glydea vs. Ø50) is governed by NodeType filtering but the source does not document which commands a specific model implements."
- "physical layer details (cable type, termination, max bus length) not stated in this source."
- "settable parameters that are not discrete action mnemonics: only the"
- "the protocol has no unsolicited event channel. Every SLAVE response"
- "source does not describe multi-step sequences. Power-on"
- "source contains no operator-facing safety warnings, lockout"
- "per-product capability matrix (which MSG identifiers each NodeType implements) is not in this protocol guide; the matrix lives in each product's technical datasheet."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
