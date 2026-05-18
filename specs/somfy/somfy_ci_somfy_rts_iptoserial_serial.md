---
spec_id: admin/somfy-sdn-rs485-iptoserial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy SDN RS485 IP-to-Serial Control Spec"
manufacturer: Somfy
model_family: "Somfy RS485 RTS Transmitter (NodeType 05h)"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "Somfy RS485 RTS Transmitter (NodeType 05h)"
    - "Somfy Ø30 DC Serie RS485 (NodeType 02h)"
    - "Somfy Glydea RS485 (NodeType 06h)"
    - "Somfy Ø50 AC Serie RS485 (NodeType 07h)"
    - "Somfy Ø50 DC Serie RS485 (NodeType 08h)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-16T23:51:53.105Z
generated_at: 2026-05-16T23:51:53.105Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T23:51:53.105Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions matched literally in source; transport parameters verified; source fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Somfy SDN RS485 IP-to-Serial Control Spec

## Summary

This spec covers the Somfy Digital Network (SDN) protocol used for bi-directional RS-485 serial control of Somfy motorized shading devices. The protocol operates in a MASTER/SLAVE half-duplex model over RS-485 at 4800 baud with odd parity. Commands cover motor movement control, position queries, group management, and device configuration including local UI locking and network command locking.

<!-- UNRESOLVED: Source document (DOC155888/000) covers the SDN protocol generally; specific IP-to-Serial adapter model documentation not present — adapter-specific addressing, TCP port, and any IP-layer auth are not described in this source. -->

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
  notes: >
    RS-485 half-duplex bus. All data bits must be inverted before transmission
    (e.g. 0x58 transmitted as 0xA7). LSB sent first. No synchronization byte;
    message boundary detected by bus inactivity (Treq >= 10ms between master
    transmissions; slave reply delay Trep 5–255ms).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from move-to-position and group addressing command examples
- queryable   # inferred from GET_MOTOR_POSITION, GET_MOTOR_STATUS query command examples
- levelable   # inferred from CTRL_MOVETO position-in-percentage and intermediate position commands
```

## Actions

```yaml
- id: ctrl_moveto_down_limit
  label: Move to Down Limit
  kind: action
  params: []
  wire:
    msg: 03h
    function: 00h
    description: Move motor to DOWN limit position

- id: ctrl_moveto_up_limit
  label: Move to Up Limit
  kind: action
  params: []
  wire:
    msg: 03h
    function: 01h
    description: Move motor to UP limit position

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: Intermediate Position index (0 to 15)
  wire:
    msg: 03h
    function: 02h
    description: Move motor to specified Intermediate Position index

- id: ctrl_moveto_position_percent
  label: Move to Position (Percent)
  kind: action
  params:
    - name: position_percent
      type: integer
      description: Target position as percentage of full travel range (0 to 100)
  wire:
    msg: 03h
    function: 04h
    description: Move motor to specified percentage of full travel range

- id: ctrl_stop
  label: Stop Motor
  kind: action
  params: []
  wire:
    msg: 02h
    description: Immediately stops the motor without speed ramp-down

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry index (0 to 15)
    - name: group_id
      type: integer
      description: 24-bit GroupID to assign
  wire:
    msg: 51h
    description: Assigns a GroupID to a group table entry on the device

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: 16-character ASCII text label (padded with spaces if shorter)
  wire:
    msg: 55h
    description: Assigns a user-defined text label to the device for identification

- id: set_local_ui
  label: Set Local UI State
  kind: action
  params:
    - name: function
      type: integer
      description: "00h = Enable/Unlock, 01h = Disable/Lock"
    - name: ui_index
      type: integer
      description: "00h=All, 01h=DCT input, 02h=Local stimuli, 03h=Local Radio, 04h=Touch Motion, 05h=LEDs"
    - name: priority
      type: integer
      description: Priority level 0–255; higher value = higher priority
  wire:
    msg: 17h
    description: Enable or disable a local UI element with a priority level

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Delete IP, 01h=Set at current pos, 03h=Set at specified %, 04h=Divide range by count"
    - name: ip_index
      type: integer
      description: IP table entry (1 to 16); ignored for function 04h
    - name: value
      type: integer
      description: Position percentage (function 03h) or IP count (function 04h); ignored for 00h and 01h
  wire:
    msg: 15h
    description: Configure an intermediate position for the motor

- id: set_motor_rolling_speed
  label: Set Motor Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: Speed during UP movement (rpm; range per device datasheet)
    - name: down_speed
      type: integer
      description: Speed during DOWN movement (rpm; range per device datasheet)
    - name: slow_speed
      type: integer
      description: Speed for adjustment movements (rpm; range per device datasheet)
  wire:
    msg: 13h
    description: Set motor rolling speeds; valid range defined per device technical datasheet

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock, 03h=Save lock on power cycle, 04h=Do not save lock"
    - name: priority
      type: integer
      description: Priority level 0–255 (ignored for functions 03h and 04h)
  wire:
    msg: 16h
    description: Lock or unlock network command execution on the device with a priority level

- id: get_node_addr
  label: Get Node Address
  kind: action
  params: []
  wire:
    msg: 40h
    description: Request node address; device replies with POST_NODE_ADDR (60h)

- id: get_group_addr
  label: Get Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: Group table entry index (0 to 15)
  wire:
    msg: 41h
    description: Request group address for a given index; device replies with POST_GROUP_ADDR (61h)

- id: get_node_app_version
  label: Get Firmware Version
  kind: action
  params: []
  wire:
    msg: 74h
    description: Request firmware version; device replies with POST_NODE_APP_VERSION (75h)

- id: get_node_label
  label: Get Node Label
  kind: action
  params: []
  wire:
    msg: 45h
    description: Request user-defined label; device replies with POST_NODE_LABEL (65h)

- id: get_local_ui
  label: Get Local UI State
  kind: action
  params:
    - name: ui_index
      type: integer
      description: UI index (01h to UI_MAX; see SET_LOCAL_UI for values)
  wire:
    msg: 27h
    description: Request local UI state; device replies with POST_LOCAL_UI (37h)

- id: get_motor_ip
  label: Get Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: IP table entry (1 to 16)
  wire:
    msg: 25h
    description: Request intermediate position value; device replies with POST_MOTOR_IP (35h)

- id: get_motor_rolling_speed
  label: Get Motor Speed
  kind: action
  params: []
  wire:
    msg: 23h
    description: Request motor rolling speeds; device replies with POST_MOTOR_ROLLING_SPEED (33h)

- id: get_network_lock
  label: Get Network Lock State
  kind: action
  params: []
  wire:
    msg: 26h
    description: Request network lock state; device replies with POST_NETWORK_LOCK (36h)

- id: get_motor_position
  label: Get Motor Position
  kind: action
  params: []
  wire:
    msg: 0Ch
    description: Request current motor position; device replies with POST_MOTOR_POSITION (0Dh)

- id: get_motor_status
  label: Get Motor Status
  kind: action
  params: []
  wire:
    msg: 0Eh
    description: Request current motor status; device replies with POST_MOTOR_STATUS (0Fh)
```

## Feedbacks

```yaml
- id: post_motor_position
  label: Motor Position Report
  type: compound
  wire:
    msg: 0Dh
    fields:
      - name: position_pulse
        type: integer
        description: Position in encoder pulses (UP_LIMIT to DOWN_LIMIT)
      - name: position_percentage
        type: integer
        description: Position as percentage of full travel range (0 to 100)
      - name: ip
        type: integer
        description: Current intermediate position index (01h–IP_MAX); FFh if not at any IP

- id: post_motor_status
  label: Motor Status Report
  type: compound
  wire:
    msg: 0Fh
    fields:
      - name: status
        type: enum
        values:
          00h: stopped
          01h: running
          02h: blocked
          03h: locked
      - name: direction
        type: enum
        values:
          00h: going_down
          01h: going_up
          FFh: unknown
      - name: source
        type: enum
        values:
          00h: internal
          01h: network_message
          02h: local_ui
      - name: cause
        type: enum
        values:
          00h: target_reached
          01h: explicit_command
          02h: wink
          20h: obstacle_detection
          21h: over_current_protection
          22h: thermal_protection
          30h: run_time_exceeded
          32h: timeout_exceeded
          FFh: reset_or_powerup

- id: post_node_addr
  label: Node Address Report
  type: compound
  wire:
    msg: 60h
    description: No data payload; NodeID included in message header

- id: post_group_addr
  label: Group Address Report
  type: compound
  wire:
    msg: 61h
    fields:
      - name: group_index
        type: integer
        description: Group table entry index (0 to 15)
      - name: group_id
        type: integer
        description: 24-bit associated group address

- id: post_node_app_version
  label: Firmware Version Report
  type: compound
  wire:
    msg: 75h
    fields:
      - name: app_reference
        type: integer
        description: 24-bit firmware part number
      - name: app_index_letter
        type: string
        description: ASCII major revision letter (41h=A to 5Ah=Z)
      - name: app_index_number
        type: integer
        description: Firmware revision number

- id: post_node_label
  label: Node Label Report
  type: string
  wire:
    msg: 65h
    description: 16-character ASCII label string

- id: post_local_ui
  label: Local UI State Report
  type: compound
  wire:
    msg: 37h
    fields:
      - name: status
        type: enum
        values:
          00h: enabled_unlocked
          01h: disabled_locked
      - name: source_addr
        type: integer
        description: NodeID of device that sent the lock command (reset to 0x000000 when unlocked)
      - name: priority
        type: integer
        description: Lock priority level (reset to 0x00 when unlocked)

- id: post_motor_ip
  label: Intermediate Position Report
  type: compound
  wire:
    msg: 35h
    fields:
      - name: ip_index
        type: integer
        description: IP table entry index (1 to 16)
      - name: ip_position_percentage
        type: integer
        description: IP position as percentage (0 to 100); FFh if IP not set

- id: post_motor_rolling_speed
  label: Motor Speed Report
  type: compound
  wire:
    msg: 33h
    fields:
      - name: up_speed
        type: integer
        description: Speed during UP movement (rpm)
      - name: down_speed
        type: integer
        description: Speed during DOWN movement (rpm)
      - name: slow_speed
        type: integer
        description: Speed for adjustment movements (rpm)

- id: post_network_lock
  label: Network Lock State Report
  type: compound
  wire:
    msg: 36h
    fields:
      - name: status
        type: enum
        values:
          00h: unlocked
          01h: locked
      - name: source_addr
        type: integer
        description: NodeID of device that sent the lock command
      - name: priority
        type: integer
        description: Lock priority level
      - name: saved
        type: enum
        values:
          00h: not_saved_on_power_cycle
          01h: saved_on_power_cycle

- id: ack
  label: Acknowledgement
  type: enum
  values: [ack]
  wire:
    msg: 7Fh
    description: Sent by slave when ACK bit is set in request and command was accepted

- id: nack
  label: Negative Acknowledgement
  type: compound
  wire:
    msg: 6Fh
    fields:
      - name: error_code
        type: enum
        values:
          01h: data_out_of_range
          10h: unknown_message
          11h: message_length_error
          FFh: busy_cannot_process
```

## Variables

```yaml
# UNRESOLVED: No settable parameters distinct from discrete actions found in source
```

## Events

```yaml
- id: unsolicited_node_addr
  label: Unsolicited Node Address Broadcast
  type: event
  description: >
    Some devices can transmit their NodeID without a MASTER request (e.g. triggered
    by a pushbutton on the device). Carries POST_NODE_ADDR (60h) message.
```

## Macros

```yaml
# UNRESOLVED: No multi-step sequences explicitly described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: >
      When NETWORK_LOCK is active (SET_NETWORK_LOCK function 01h), all movement and limit-change
      commands (CTRL_XXX, SET_MOTOR_LIMITS, SET_TILT_LIMITS) are rejected with NACK(NODE_IS_LOCKED).
      Only SET_NETWORK_LOCK or CTRL_NETWORK_LOCK with equal or higher priority level can unlock the device.
  - description: >
      CTRL_STOP immediately halts motor without speed ramp-down. Use only when safe to do so.
  - description: >
      Motor status 02h (Blocked) indicates thermal protection or obstacle detection; do not continue
      issuing movement commands until status is cleared.
```

## Notes

**Message framing:** All SDN messages are binary-encoded with a minimum length of 11 bytes and a maximum of 32 bytes. Every byte in the message must have its bits inverted before transmission. The frame format is: MSG | ACK/LEN | NODE_TYPE | SOURCE@ (3 bytes) | DEST@ (3 bytes) | DATA (0–21 bytes) | CHECKSUM (2 bytes). SOURCE@ and DEST@ are little-endian (LSBF).

**Addressing modes:** Three modes are supported: Point-to-Point (specific NodeID), Group (GroupID with DEST@=000000h), and Broadcast (DEST@=FFFFFFh). NodeType filtering is also available via the NODE_TYPE byte.

**Checksum calculation:** CHECKSUM = complement of the sum of all preceding frame bytes.

**Timing requirements:** Master must wait at least Treq=10ms since last bus activity before transmitting. Slave reply delay (Trep) is 5–255ms and partially randomized. Maximum inter-character gap within a message is Tc=1ms.

**Acknowledgements:** ACK requests are optional (ACK bit in byte 2). Recommended for reliable operation. For group and broadcast modes, avoid requesting acknowledgements or status feedback to reduce collision risk.

**DC motor speed:** Speed range and defaults vary by motor model. Refer to the individual device technical datasheet for valid UP_Speed, DOWN_Speed, and Slow_Speed ranges.

**Intermediate positions:** Up to 16 IPs per device. IPs cannot be set outside the configured limits range. Function 04h (divide) overwrites existing IPs with equally spaced positions.

**IP-to-Serial adapter specifics:** This spec is derived from the SDN protocol guide (DOC155888/000, November 2019). The specific Somfy CI-Somfy-RTS-IPToSerial adapter's IP-layer parameters (TCP port, HTTP endpoint, firmware version) are not documented in this source and remain unresolved.

<!-- UNRESOLVED: TCP/IP adapter port number not stated in source -->
<!-- UNRESOLVED: Adapter firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Whether the IP-to-Serial adapter exposes a Telnet, raw TCP, or HTTP interface is not described in this source -->

## Provenance

```yaml
source_domains:
  - service.somfy.com
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-05-16T23:51:53.105Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T23:51:53.105Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions matched literally in source; transport parameters verified; source fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
