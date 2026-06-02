---
spec_id: admin/somfy-rts-6300554
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy RTS 6300554 Control Spec"
manufacturer: Somfy
model_family: "RTS 6300554"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "RTS 6300554"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-17T00:08:18.462Z
last_checked_at: 2026-05-17T00:08:18.462Z
generated_at: 2026-05-17T00:08:18.462Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model 6300554 firmware/range; user-supplied known protocol was RS-232C, source doc explicitly describes RS-485 — source wins."
  - "source says \"RS485\" but never states the exact electrical spec"
  - "no explicit power on/off commands in source"
  - "source notes some devices can send their address via pushbutton without MASTER request; transport not specified"
  - "source describes no multi-step sequences"
  - "thermal protection, obstacle detection, run-time limit behavior described in Cause codes"
  - "model 6300554 specific feature set, firmware compat range, max bus length, max node count per bus."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-17T00:08:18.462Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 actions matched exactly to source message codes; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Somfy RTS 6300554 Control Spec

## Summary
RS-485 transmitter in Somfy's SDN (SOMFY Digital Network) product line. Source doc covers the full SDN protocol: half-duplex master/slave bus, 4800-8-O-1, bit-inverted framing, 11-byte fixed header + variable data + checksum. Device family = NodeType 05h (RS485 RTS transmitter).

<!-- UNRESOLVED: model 6300554 firmware/range; user-supplied known protocol was RS-232C, source doc explicitly describes RS-485 — source wins. -->

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
  electrical: rs485  # UNRESOLVED: source says "RS485" but never states the exact electrical spec
  bit_inversion: true  # source: "all data bits need to be inverted before transmission"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred: GET_xxx queries return POST_xxx status
- routable        # inferred: CTRL_MOVETO + intermediate positions
- levelable       # inferred: SET_MOTOR_ROLLING_SPEED (DC motor speed)
- powerable       # UNRESOLVED: no explicit power on/off commands in source
```

## Actions
```yaml
# SDN framing: Byte 1 = MSG, Byte 2 = ACK/LEN, Byte 3 = NodeType (src/dst),
# Bytes 4-6 = SOURCE@, Bytes 7-9 = DEST@ (LSB first), Bytes 10..n-1 = DATA,
# Byte n = CHECKSUM (sum of all prior bytes). All bytes bit-inverted on wire.
# `command` here carries the MSG opcode; full frame assembly requires
# addressing + DATA + checksum per §5.

# --- Device Management ---
- id: get_node_address
  label: Get Node Address
  kind: query
  command: "40"  # MSG byte GET_NODE_ADDR, DATA length 0
  params: []

- id: set_group_address
  label: Set Group Address
  kind: action
  command: "51"  # MSG byte SET_GROUP_ADDR, DATA length 4
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)
    - name: group_id
      type: integer
      description: Associated group address (24-bit NodeID)

- id: get_group_address
  label: Get Group Address
  kind: query
  command: "41"  # MSG byte GET_GROUP_ADDR, DATA length 1
  params:
    - name: group_index
      type: integer
      description: Entry in group table (0-15)

# --- Ack / Errors ---
- id: ack
  label: Acknowledge
  kind: event
  command: "7F"  # MSG byte ACK, sent when ACK bit set in request
  params: []

- id: nack
  label: Negative Acknowledge
  kind: event
  command: "6F"  # MSG byte NACK, DATA length 1
  params:
    - name: error_code
      type: integer
      description: "01h=data out of range, 10h=unknown msg, 11h=length error, FFh=busy"

# --- Device Information ---
- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "74"  # MSG byte GET_NODE_APP_VERSION, DATA length 0
  params: []

- id: set_node_label
  label: Set Node Label
  kind: action
  command: "55"  # MSG byte SET_NODE_LABEL, DATA length 16 (pad with spaces)
  params:
    - name: label
      type: string
      description: Up to 16 ASCII chars, space-padded

- id: get_node_label
  label: Get Node Label
  kind: query
  command: "45"  # MSG byte GET_NODE_LABEL, DATA length 0
  params: []

# --- Device Configuration: HMI ---
- id: set_local_ui
  label: Set Local UI Lock State
  kind: action
  command: "17"  # MSG byte SET_LOCAL_UI, DATA length 3
  params:
    - name: function
      type: integer
      description: "00h=enable/unlock, 01h=disable/lock"
    - name: ui_index
      type: integer
      description: "00h=all, 01h=DCT, 02h=local stimuli, 03h=local radio, 04h=touch motion, 05h=LEDs"
    - name: priority
      type: integer
      description: 0-255, higher wins

- id: get_local_ui
  label: Get Local UI Lock State
  kind: query
  command: "27"  # MSG byte GET_LOCAL_UI, DATA length 1
  params:
    - name: ui_index
      type: integer
      description: 01h to UI_MAX

# --- Device Configuration: Intermediate Positions ---
- id: set_motor_ip
  label: Set Motor Intermediate Position
  kind: action
  command: "15"  # MSG byte SET_MOTOR_IP, DATA length 4
  params:
    - name: function
      type: integer
      description: "00h=delete IP, 01h=set at current pos, 03h=set at % pos, 04h=divide range into N IPs"
    - name: ip_index
      type: integer
      description: IP index 1-16 (ignored for function 04h)
    - name: value
      type: integer
      description: 16-bit, depends on function (% for 03h, IP count for 04h, ignored for 00h/01h)

- id: get_motor_ip
  label: Get Motor Intermediate Position
  kind: query
  command: "25"  # MSG byte GET_MOTOR_IP, DATA length 1
  params:
    - name: ip_index
      type: integer
      description: IP index 1-16

# --- Device Configuration: Speed (DC motors) ---
- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  command: "13"  # MSG byte SET_MOTOR_ROLLING_SPEED, DATA length 3
  params:
    - name: up_speed
      type: integer
      description: UP speed (rpm), per motor datasheet
    - name: down_speed
      type: integer
      description: DOWN speed (rpm), per motor datasheet
    - name: slow_speed
      type: integer
      description: Adjustment speed (rpm), per motor datasheet

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  command: "23"  # MSG byte GET_MOTOR_ROLLING_SPEED, DATA length 0
  params: []

# --- Device Configuration: Network Lock ---
- id: set_network_lock
  label: Set Network Lock
  kind: action
  command: "16"  # MSG byte SET_NETWORK_LOCK, DATA length 2
  params:
    - name: function
      type: integer
      description: "00h=unlock, 01h=lock, 03h=save on power cycle, 04h=do not save on power cycle"
    - name: priority
      type: integer
      description: 0-255, higher wins (ignored for 03h/04h)

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  command: "26"  # MSG byte GET_NETWORK_LOCK, DATA length 0
  params: []

# --- Device Control ---
- id: ctrl_moveto
  label: Move To Position
  kind: action
  command: "03"  # MSG byte CTRL_MOVETO, DATA length 4
  params:
    - name: function
      type: integer
      description: "00h=DOWN limit, 01h=UP limit, 02h=IP (position=ip index 0-15), 04h=% (position=0-100)"
    - name: position
      type: integer
      description: 16-bit; meaning depends on function (see function)
    - name: reserved
      type: integer
      description: Reserved byte

- id: ctrl_stop
  label: Stop Motor
  kind: action
  command: "02"  # MSG byte CTRL_STOP, DATA length 1 (reserved byte)
  params:
    - name: reserved
      type: integer
      description: Reserved byte

# --- Device Status ---
- id: get_motor_position
  label: Get Motor Position
  kind: query
  command: "0C"  # MSG byte GET_MOTOR_POSITION, DATA length 0
  params: []

- id: get_motor_status
  label: Get Motor Status
  kind: query
  command: "0E"  # MSG byte GET_MOTOR_STATUS, DATA length 0
  params: []
```

## Feedbacks
```yaml
- id: post_node_address
  type: integer
  description: "MSG 60h, reply to GET_NODE_ADDR; address in message header"
- id: post_group_address
  type: object
  description: "MSG 61h, reply to GET_GROUP_ADDR; DATA = GroupIndex + GroupID"
- id: post_node_app_version
  type: object
  description: "MSG 75h; App_Reference (24-bit), App_IndexLetter (ASCII A-Z), App_IndexNumber, Reserved"
- id: post_node_label
  type: string
  description: "MSG 65h; 16-char label (space-padded)"
- id: post_local_ui
  type: object
  description: "MSG 37h; Status, Source_Addr, Priority"
- id: post_motor_ip
  type: object
  description: "MSG 35h; IP_index, Reserved, IP_position_percentage (FFh=unset)"
- id: post_motor_rolling_speed
  type: object
  description: "MSG 33h; UP_Speed, DOWN_Speed, Slow_Speed"
- id: post_network_lock
  type: object
  description: "MSG 36h; Status, Source_Addr, Priority, Saved"
- id: post_motor_position
  type: object
  description: "MSG 0Dh; Position_pulse, Position_percentage, Reserved, IP (FFh=no match)"
- id: post_motor_status
  type: object
  description: "MSG 0Fh; Status (00h stopped / 01h running / 02h blocked / 03h locked), Direction, Source, Cause"
```

## Variables
```yaml
- id: motor_ip
  type: integer
  description: Intermediate position 1-16, settable 0-100%
- id: motor_rolling_speed
  type: object
  description: UP/DOWN/Slow speed (rpm); ranges per motor datasheet
- id: network_lock
  type: object
  description: Status (locked/unlocked), priority, persistence flag
- id: node_label
  type: string
  description: 16-char ASCII identifier
```

## Events
```yaml
- id: ack
  description: "MSG 7Fh; sent when ACK bit=1 in request and message processed"
- id: nack
  description: "MSG 6Fh; DATA = ErrorCode (01h, 10h, 11h, FFh)"
- id: post_node_address_pushbutton
  description: UNRESOLVED: source notes some devices can send their address via pushbutton without MASTER request; transport not specified
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - network_lock  # source: SET_NETWORK_LOCK / CTRL_NETWORK_LOCK blocks other CTRL messages unless priority matches
# UNRESOLVED: thermal protection, obstacle detection, run-time limit behavior described in Cause codes
# but no explicit safety procedure / recovery sequence is documented.
```

## Notes
- User-supplied known protocol "RS-232C" contradicts source — source doc is RS-485 (SDN bus). Source wins.
- All data bits bit-inverted on wire (backward compat): 58h → A7h on the bus.
- LSB first for all multi-byte fields (SOURCE@, DEST@, Position, Value, GroupID).
- Bus is half-duplex; master must wait Treq=10ms before new request; slave reply within Trep 5-255ms (randomized).
- Master should request ACKs and implement retry on NACK or timeout (recommended in §3.6).
- Speed/IP/lock default behavior: factory default is "all UI enabled" + "network lock not saved on power cycle".
- Speed range (UP/DOWN/Slow) varies per motor — refer to device datasheet, not generic.
- This spec covers the SDN protocol family; the 6300554 specifically is the "RS485 RTS transmitter" (NodeType 05h), but the protocol doc enumerates all NodeTypes 02h/05h-09h, so the action set may include commands a transmitter does not itself implement.

<!-- UNRESOLVED: model 6300554 specific feature set, firmware compat range, max bus length, max node count per bus. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-17T00:08:18.462Z
last_checked_at: 2026-05-17T00:08:18.462Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:08:18.462Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 actions matched exactly to source message codes; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model 6300554 firmware/range; user-supplied known protocol was RS-232C, source doc explicitly describes RS-485 — source wins."
- "source says \"RS485\" but never states the exact electrical spec"
- "no explicit power on/off commands in source"
- "source notes some devices can send their address via pushbutton without MASTER request; transport not specified"
- "source describes no multi-step sequences"
- "thermal protection, obstacle detection, run-time limit behavior described in Cause codes"
- "model 6300554 specific feature set, firmware compat range, max bus length, max node count per bus."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
