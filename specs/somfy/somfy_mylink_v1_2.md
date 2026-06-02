---
spec_id: admin/somfy-mylink-v1-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy myLink v1.2 Control Spec"
manufacturer: Somfy
model_family: "Somfy myLink v1.2"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy myLink v1.2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-06-02T05:46:19.451Z
generated_at: 2026-06-02T05:46:19.451Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 7Fh
  - 6Fh
  - "source is the generic Somfy SDN protocol guide, not a myLink-specific datasheet. The myLink is a WiFi-to-RF bridge product; this protocol does not directly describe the myLink's externally-exposed control surface. Coverage of the myLink as such is not stated in the source."
  - "voltage, current, and power specifications not stated in source."
  - "cable length, bus topology, and termination details are in a separate document (DOC114316 \"SDN Bus Wiring Guide\") and are not reproduced here."
  - "flow control not stated in source (assumed none for half-duplex RS-485)"
  - "power-on sequencing and interlock macros are not enumerated in"
  - "physical safety warnings, installation interlocks, and motor"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:19.451Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched exactly to source; transport parameters (4800 baud, odd parity, bit inversion) verified verbatim; source coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy myLink v1.2 Control Spec

## Summary
This spec documents the Somfy Digital Network (SDN) bus protocol used by Somfy RS-485 motorized window-covering products. The source document (Somfy "SDN Integration Guide", DOC155888, Nov 2019) describes a half-duplex RS-485 master/slave protocol at 4800 baud, 8 data bits, odd parity, with master-driven SET/CTRL/GET messages and slave POST/ACK/NACK replies.

<!-- UNRESOLVED: source is the generic Somfy SDN protocol guide, not a myLink-specific datasheet. The myLink is a WiFi-to-RF bridge product; this protocol does not directly describe the myLink's externally-exposed control surface. Coverage of the myLink as such is not stated in the source. -->

<!-- UNRESOLVED: voltage, current, and power specifications not stated in source. -->
<!-- UNRESOLVED: cable length, bus topology, and termination details are in a separate document (DOC114316 "SDN Bus Wiring Guide") and are not reproduced here. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: odd
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source (assumed none for half-duplex RS-485)
  flow_control: null
  electrical: rs485
  bit_order: lsb_first
  bit_inversion: true   # source §4.2: all data bits are inverted before transmission for backward compatibility
  start_bit_level: 0
  stop_bit_level: 1
  character_coding: nrz
auth:
  type: none  # inferred: no auth procedure in source
```

The on-wire frame layout (source §5) is identical for every message:

| Byte 1 | Byte 2 | Byte 3 | Bytes 4-6 | Bytes 7-9 | Bytes 10..n-2 | Bytes n-1, n |
|---|---|---|---|---|---|---|
| MSG | ACK/LEN | NODE TYPE (src hi-nibble / dst lo-nibble) | SOURCE@ (LSBF) | DEST@ (LSBF) | DATA | CHECKSUM |

- Minimum frame size: 11 bytes (no DATA).
- Maximum frame size: 32 bytes (21 bytes of DATA).
- `ACK/LEN` byte: B7 = ACK request, b6 = EXT (reserved, always 0), b5..b0 = LEN.
- `CHECKSUM` = sum of Bytes 1..n-2 (complement-add error check, no correction).
- Bit inversion: every data byte is bitwise-NOTed before transmission (e.g. 58h → A7h).

## Traits
```yaml
# - queryable       (GET_xxx / POST_xxx status requests present in source)
# Source does not document explicit power on/off, input routing, or level control,
# so other listed traits are not added.
```

## Actions
```yaml
# All commands are framed as: MSG(1B) ACK/LEN(1B) NodeType(1B) SOURCE@(3B,LSBF)
# DEST@(3B,LSBF) DATA(nB) CHECKSUM(2B). Only the MSG byte and DATA payload vary
# by command; the header layout is documented in the Transport section above.
#
# Command field below names the MSG byte and DATA-field template per source §6.
# Parameterized fields are written as {Name} in the DATA template and enumerated
# in `params:`.
#
# Kind: action for SET_xxx and CTRL_xxx; kind: query for GET_xxx.

# ── Device Management ────────────────────────────────────────────────────────

- id: get_node_addr
  label: Get Node Address
  kind: query
  command: "MSG=40h DATA=<empty>"
  description: >
    Request a device (or all devices on the bus) to report its NodeID. Response
    is POST_NODE_ADDR (60h) with the NodeID carried in the SOURCE@ header.
    Note: with many devices on the bus, replies from all devices are not
    guaranteed (source §6.1.1).
  params: []

- id: set_group_addr
  label: Set Group Address
  kind: action
  command: "MSG=51h DATA=GroupIndex(1B) GroupID(3B,LSBF)"
  description: >
    Write a GroupID into one of the 16 group table entries of a device.
  params:
    - name: GroupIndex
      type: integer
      min: 0
      max: 15
      description: Entry index in the device's group table.
    - name: GroupID
      type: integer
      min: 0
      max: 16777215
      description: 24-bit group address, LSBF.

- id: get_group_addr
  label: Get Group Address
  kind: query
  command: "MSG=41h DATA=GroupIndex(1B)"
  description: >
    Read a GroupID from a device's group table.
  params:
    - name: GroupIndex
      type: integer
      min: 0
      max: 15

# ── Device Information ───────────────────────────────────────────────────────

- id: get_node_app_version
  label: Get Firmware Version
  kind: query
  command: "MSG=74h DATA=<empty>"
  description: >
    Request firmware version. Response is POST_NODE_APP_VERSION (75h) carrying
    App_Reference(3B), App_IndexLetter(1B ASCII 0x41..0x5A), App_IndexNumber(1B),
    Reserved(1B).
  params: []

- id: set_node_label
  label: Set User Label
  kind: action
  command: "MSG=55h DATA=Label(16B,ASCII,space-padded)"
  description: >
    Write a 16-character user-defined text label. Always 16 bytes; pad with
    space (0x20) if the string is shorter (source §6.2.2).
  params:
    - name: Label
      type: string
      max_length: 16
      description: Always padded/truncated to 16 ASCII bytes.

- id: get_node_label
  label: Get User Label
  kind: query
  command: "MSG=45h DATA=<empty>"
  description: Response is POST_NODE_LABEL (65h) with 16 ASCII bytes.
  params: []

# ── Device Configuration ─────────────────────────────────────────────────────

- id: set_local_ui
  label: Set Local UI Lock State
  kind: action
  command: "MSG=17h DATA=Function(1B) UI_Index(1B) Priority(1B)"
  description: >
    Enable/Unlock (Function=00h) or Disable/Lock (Function=01h) a local user
    interface element. UI_Index selects which element (00h=all, 01h=DCT input,
    02h=local stimuli, 03h=local radio, 04h=touch motion, 05h=LEDs). Priority
    governs whether a higher-priority controller can override the lock.
    Items disabled are ignored until re-enabled. Source §6.3.1.
  params:
    - name: Function
      type: enum
      values: [00h, 01h]
      description: 00h=Enable/Unlock, 01h=Disable/Lock.
    - name: UI_Index
      type: enum
      values: [00h, 01h, 02h, 03h, 04h, 05h]
      description: 00h=all local controls/feedbacks, 01h=DCT input, 02h=local stimuli, 03h=local radio, 04h=touch motion, 05h=LEDs.
    - name: Priority
      type: integer
      min: 0
      max: 255
      description: Higher number = higher priority.

- id: get_local_ui
  label: Get Local UI Lock State
  kind: query
  command: "MSG=27h DATA=UI_Index(1B)"
  description: >
    Read the current lock state of a UI element. Response is POST_LOCAL_UI
    (37h) with Status(1B), Source_Addr(3B), Priority(1B). Source §6.3.1.
  params:
    - name: UI_Index
      type: integer
      min: 1
      description: 0x01..UI_MAX (refer to UI list in SET_LOCAL_UI).

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  command: "MSG=15h DATA=Function(1B) IP_Index(1B) Value(2B)"
  description: >
    Manage intermediate positions (IPs). Function: 00h=delete IP, 01h=set IP at
    current position, 03h=set IP at specified % (Value = 0..100), 04h=divide
    full range into N equally-spaced IPs (Value = N, IP_Index ignored). IP_Index
    range 1..16. Setting an IP outside the configured limits returns
    NACK(DATA_ERROR). Source §6.3.2.
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 03h, 04h]
    - name: IP_Index
      type: integer
      min: 1
      max: 16
    - name: Value
      type: integer
      description: Depends on Function: 00h/01h=ignored, 03h=position % (0..100), 04h=IP count.

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  command: "MSG=25h DATA=IP_Index(1B)"
  description: >
    Read the percentage of one IP. Response is POST_MOTOR_IP (35h) with
    IP_index(1B), Reserved(2B), IP_position_percentage(1B, FFh if not set).
  params:
    - name: IP_Index
      type: integer
      min: 1
      max: 16

- id: set_motor_rolling_speed
  label: Set Motor Speed (DC motors only)
  kind: action
  command: "MSG=13h DATA=UP_Speed(1B) DOWN_Speed(1B) Slow_Speed(1B)"
  description: >
    Set UP / DOWN / Slow speeds in rpm. Speed range and default depend on the
    specific motor - refer to device technical datasheet (not in this source).
    Source §6.3.3.
  params:
    - name: UP_Speed
      type: integer
      description: Speed during UP movement, rpm. Range per motor datasheet.
    - name: DOWN_Speed
      type: integer
      description: Speed during DOWN movement, rpm. Range per motor datasheet.
    - name: Slow_Speed
      type: integer
      description: Speed for adjustment movements, rpm. Range per motor datasheet.

- id: get_motor_rolling_speed
  label: Get Motor Speed
  kind: query
  command: "MSG=23h DATA=<empty>"
  description: >
    Read current UP/DOWN/Slow speeds. Response is POST_MOTOR_ROLLING_SPEED
    (33h).
  params: []

- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "MSG=16h DATA=Function(1B) Priority(1B)"
  description: >
    Lock or unlock the device from network commands. Function: 00h=Unlock,
    01h=Lock, 03h=Save lock state across power cycle, 04h=Do not save.
    When locked, only CTRL_xxx messages with Priority ≥ current lock are
    accepted; others are rejected with NACK(NODE_IS_LOCKED). Default factory
    state is "Do not save" (Function=04h). Source §6.3.4.
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 03h, 04h]
    - name: Priority
      type: integer
      min: 0
      max: 255
      description: Higher number = higher priority. Ignored for Function 03h/04h.

- id: get_network_lock
  label: Get Network Lock
  kind: query
  command: "MSG=26h DATA=<empty>"
  description: >
    Read current network-lock state. Response is POST_NETWORK_LOCK (36h) with
    Status(1B), Source_Addr(3B), Priority(1B), Saved(1B).
  params: []

# ── Device Control ───────────────────────────────────────────────────────────

- id: ctrl_moveto
  label: Move to Position
  kind: action
  command: "MSG=03h DATA=Function(1B) Position(2B) Reserved(1B)"
  description: >
    Drive motor to a position. Function: 00h=DOWN limit (Position ignored),
    01h=UP limit (Position ignored), 02h=Intermediate Position (Position = IP
    index 0..15), 04h=Position in % of full travel (Position = 0..100).
    Source §6.4.1.
  params:
    - name: Function
      type: enum
      values: [00h, 01h, 02h, 04h]
    - name: Position
      type: integer
      description: Meaning depends on Function: ignored for 00h/01h, IP index (0..15) for 02h, % (0..100) for 04h.

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "MSG=02h DATA=Reserved(1B)"
  description: >
    Immediately stop the motor without speed ramp-down. Source §6.4.2.
  params: []

# ── Device Status ────────────────────────────────────────────────────────────

- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "MSG=0Ch DATA=<empty>"
  description: >
    Read current position. Response is POST_MOTOR_POSITION (0Dh) with
    Position_pulse(2B), Position_percentage(1B), Reserved(1B), IP(1B, FFh if
    not at an IP). Position is sent even while motor is running.
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "MSG=0Eh DATA=<empty>"
  description: >
    Read motor state. Response is POST_MOTOR_STATUS (0Fh) with
    Status(1B), Direction(1B), Source(1B), Cause(1B). Source §6.5.2.
  params: []
```

## Feedbacks
```yaml
# Derived from POST_xxx response messages (slave → master). Each entry mirrors
# one POST payload so a controller can interpret any slave response it sees on
# the bus.

- id: post_node_addr
  type: object
  description: >
    Reply to GET_NODE_ADDR (40h). Carries no DATA - the reporting NodeID is in
    the frame's SOURCE@ header. Source §6.1.1.

- id: post_group_addr
  type: object
  description: >
    Reply to GET_GROUP_ADDR (41h). DATA: GroupIndex(1B), GroupID(3B,LSBF).
    Source §6.1.2.

- id: post_node_app_version
  type: object
  description: >
    Reply to GET_NODE_APP_VERSION (74h). DATA: App_Reference(3B),
    App_IndexLetter(1B ASCII 0x41..0x5A), App_IndexNumber(1B), Reserved(1B).
    Source §6.2.1.

- id: post_node_label
  type: object
  description: >
    Reply to GET_NODE_LABEL (45h). DATA: 16 ASCII bytes (space-padded).
    Source §6.2.2.

- id: post_local_ui
  type: object
  description: >
    Reply to GET_LOCAL_UI (27h). DATA: Status(1B), Source_Addr(3B), Priority(1B).
    Status: 00h=Enabled/Unlocked, 01h=Disabled/Locked. When unlocked,
    Source_Addr=000000h and Priority=00h. Source §6.3.1.

- id: post_motor_ip
  type: object
  description: >
    Reply to GET_MOTOR_IP (25h). DATA: IP_index(1B), Reserved(2B),
    IP_position_percentage(1B, 0..100, FFh if IP not set). Source §6.3.2.

- id: post_motor_rolling_speed
  type: object
  description: >
    Reply to GET_MOTOR_ROLLING_SPEED (23h). DATA: UP_Speed(1B), DOWN_Speed(1B),
    Slow_Speed(1B). Source §6.3.3.

- id: post_network_lock
  type: object
  description: >
    Reply to GET_NETWORK_LOCK (26h). DATA: Status(1B), Source_Addr(3B),
    Priority(1B), Saved(1B). Status: 00h=Unlocked, 01h=Locked. Saved: 00h=not
    restored on power cycle, 01h=restored. When unlocked, Source_Addr=000000h,
    Priority=00h. Source §6.3.4.

- id: post_motor_position
  type: object
  description: >
    Reply to GET_MOTOR_POSITION (0Ch). DATA: Position_pulse(2B, range
    UP_LIMIT..DOWN_LIMIT), Position_percentage(1B, 0..100), Reserved(1B),
    IP(1B, 01h..IP_MAX, FFh if not at an IP). Source §6.5.1.

- id: post_motor_status
  type: object
  description: >
    Reply to GET_MOTOR_STATUS (0Eh). DATA: Status(1B), Direction(1B), Source(1B),
    Cause(1B). Source §6.5.2.
    Status: 00h=Stopped, 01h=Running, 02h=Blocked (thermal/obstacle),
    03h=Locked by another device (NETWORK_LOCK).
    Direction: 00h=Going DOWN, 01h=Going UP (or last direction if stopped),
    FFh=Unknown.
    Source: 00h=Internal (limit/IP/over-current/obstacle/thermal), 01h=Network
    message, 02h=Local UI.
    Cause: 00h=Target reached, 01h=Explicit command, 02h=Wink, 20h=Obstacle
    detection, 21h=Over-current protection, 22h=Thermal protection,
    30h=Run time exceeded, 32h=Timeout exceeded (CTRL_MOVE > 2 min),
    FFh=Reset/PowerUp.
```

## Events
```yaml
- id: ack
  description: >
    Acknowledgement (MSG=7Fh, 0 bytes DATA). Sent by a slave when the master
    requested an ACK and the message was processed without error. Source §6.1.3.

- id: nack
  description: >
    Negative acknowledgement (MSG=6Fh, 1 byte ErrorCode). Sent by a slave when
    the master requested an ACK but the message could not be processed.
    Source §6.1.3.
  error_codes:
    - code: 01h
      meaning: "Data out of range"
    - code: 10h
      meaning: "Unknown message (MSG identifier not recognized)"
    - code: 11h
      meaning: "Message length error (below minimum)"
    - code: FFh
      meaning: "Busy - cannot process message"
```

## Macros
```yaml
# No multi-step sequences are described in source.
# UNRESOLVED: power-on sequencing and interlock macros are not enumerated in
# the source protocol guide; relevant wiring/bus-topology guidance lives in
# DOC114316 (separate document).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: network_lock
    description: >
      When SET_NETWORK_LOCK(01h) is active on a device, all CTRL_xxx
      movements and limit-changing SETs are rejected with NACK(NODE_IS_LOCKED)
      unless the incoming message carries a Priority ≥ the current lock
      priority. Source §6.3.4.
# UNRESOLVED: physical safety warnings, installation interlocks, and motor
# thermal/obstacle protection behavior are referenced in the protocol (Cause
# codes 20h/21h/22h) but not detailed as safety procedures in this source.
```

## Notes

- **Source scope:** This spec was generated from Somfy's generic "SDN Integration
  Guide" (DOC155888, Nov 2019). The document covers the RS-485 SDN bus used by
  multiple Somfy motorized product families, not the myLink specifically. The
  myLink is a WiFi-to-RF bridge product; whether it exposes the SDN RS-485
  surface described here is not stated in this source and is left UNRESOLVED.
- **Bit inversion (source §4.2):** Every data byte is bitwise-NOTed on the
  wire for backward compatibility with early protocol versions. Implementers
  must invert again on receive (e.g. 58h on the application side ↔ A7h on the
  bus). The CHECKSUM is calculated over the pre-inversion (logical) bytes.
- **Bit order:** LSB first on the wire (source §4.2).
- **Addressing modes (source §3.4, §5.4):** Point-to-point (specific NodeID),
  Group (DEST@=000000h), Broadcast (DEST@=FFFFFFh), and NodeType filtering
  (DEST NodeType in byte 3). SOURCE@ and DEST@ are LSBF.
- **Timing (source §4.3):** Tc ≤ 1ms between consecutive characters in a
  frame; Tfree ≥ 3ms bus idle; Treq ≥ 10ms master wait before next request;
  Trep 5..255ms (randomized) slave reply delay. No sync byte — frames are
  delimited by bus inactivity.
- **Collisions (source §3.7):** RS-485 is collision-prone. Source recommends
  avoiding ACK/feedback in group or broadcast addressing; if ACKs are used,
  implement a retry strategy on NACK or ACK timeout.
- **Data length caveat (source §5.5):** The "DATA length" column is a minimum;
  devices may append extra bytes. Reserved fields must be transmitted (set to
  00h or FFh per the source).
- **NodeType table (source §3.2.2):** Reserved NodeTypes in this document:
  02h=Ø30 DC Serie RS485, 05h=RS485 RTS transmitter, 06h=Glydea RS485,
  07h=Ø50 AC Serie RS485, 08h=Ø50 DC Serie RS485, 09h=Ø40 AC Serie RS485
  (not yet available at publication).
- **Companion documents:** DOC114316 "SDN Bus Wiring Guide" (bus topology,
  cable length, wiring) and "SDN Frame Builder" PC tool (encode/decode helper)
  are referenced by the source but not reproduced here.

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-06-02T05:46:19.451Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:19.451Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched exactly to source; transport parameters (4800 baud, odd parity, bit inversion) verified verbatim; source coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 7Fh
- 6Fh
- "source is the generic Somfy SDN protocol guide, not a myLink-specific datasheet. The myLink is a WiFi-to-RF bridge product; this protocol does not directly describe the myLink's externally-exposed control surface. Coverage of the myLink as such is not stated in the source."
- "voltage, current, and power specifications not stated in source."
- "cable length, bus topology, and termination details are in a separate document (DOC114316 \"SDN Bus Wiring Guide\") and are not reproduced here."
- "flow control not stated in source (assumed none for half-duplex RS-485)"
- "power-on sequencing and interlock macros are not enumerated in"
- "physical safety warnings, installation interlocks, and motor"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
