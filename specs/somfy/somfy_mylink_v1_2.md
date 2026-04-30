---
schema_version: ai4av-public-spec-v1
device_id: somfy/mylink-v1-2
entity_id: somfy_mylink_v1_2
spec_id: admin/somfy-mylink-v1-2
revision: 1
author: admin
title: "Somfy myLink v1.2 Control Spec"
status: published
manufacturer: Somfy
manufacturer_key: somfy
model_family: "myLink v1.2"
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - "myLink v1.2"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:12.406Z
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T10:13:02.628Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:02.628Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions match literal message codes in source; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Somfy myLink v1.2 Control Spec

## Summary
The Somfy myLink v1.2 implements the SOMFY Digital Network (SDN) protocol over RS-485 serial. This spec covers the binary half-duplex master/slave protocol used to control motorized window treatments — including move-to-position, stop, intermediate position configuration, speed adjustment (DC motors), network locking, and local UI management. Addressing supports point-to-point, group, and broadcast modes.

<!-- UNRESOLVED: the source is the generic SDN Integration Guide; myLink-specific extensions or deviations are not documented -->
<!-- UNRESOLVED: flow control not stated in source -->
<!-- UNRESOLVED: myLink v1.2 specific firmware version compatibility not stated -->

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

**Notes:** RS-485 half-duplex bus. All data bits must be inverted before transmission (e.g. byte 58h transmitted as A7h). No sync byte — messages delimited by bus inactivity. Frame structure: MSG (1B) + ACK/LEN (1B) + NODE_TYPE (1B) + SOURCE@ (3B) + DEST@ (3B) + DATA (0–21B) + CHECKSUM (2B). Checksum = complement sum of all preceding bytes. SOURCE@ and DEST@ are LSB-first.

## Traits
```yaml
traits:
  - queryable  # inferred: many GET_xxx / POST_xxx pairs returning device state
  - levelable  # inferred: position control in % and speed adjustment present
```

## Actions
```yaml
actions:
  - id: ctrl_moveto
    label: Move to Position
    kind: action
    command_code: "0x03"
    description: "Move motor to a target position (down limit, up limit, intermediate position index, or percentage)."
    params:
      - name: function
        type: enum
        values:
          - id: down_limit
            value: "0x00"
            description: Move to DOWN limit; position ignored
          - id: up_limit
            value: "0x01"
            description: Move to UP limit; position ignored
          - id: intermediate_position
            value: "0x02"
            description: Move to intermediate position index (0-15)
          - id: position_pct
            value: "0x04"
            description: Move to position in % of full travel (0-100)
      - name: position
        type: integer
        description: "IP index (0-15) when function=0x02; percentage (0-100) when function=0x04; ignored otherwise"
      - name: reserved
        type: integer
        description: Set to 0x00

  - id: ctrl_stop
    label: Stop Motor
    kind: action
    command_code: "0x02"
    description: "Immediately stop the motor without speed ramp-down."
    params:
      - name: reserved
        type: integer
        description: Set to 0x00

  - id: set_group_addr
    label: Set Group Address
    kind: action
    command_code: "0x51"
    description: "Configure a group table entry for this device."
    params:
      - name: group_index
        type: integer
        min: 0
        max: 15
        description: Entry in the group table (0-based)
      - name: group_id
        type: integer
        description: 24-bit group address

  - id: set_node_label
    label: Set Device Label
    kind: action
    command_code: "0x55"
    description: "Assign a user-defined text label to the device. Always 16 characters; pad with spaces."
    params:
      - name: label
        type: string
        description: 16-character label string

  - id: set_local_ui
    label: Set Local UI State
    kind: action
    command_code: "0x17"
    description: "Enable/disable local UI elements (buttons, LEDs, DCT, Bluetooth, touch motion)."
    params:
      - name: function
        type: enum
        values:
          - id: enable
            value: "0x00"
            description: Enable/unlock the feature
          - id: disable
            value: "0x01"
            description: Disable/lock the feature
      - name: ui_index
        type: enum
        values:
          - id: all
            value: "0x00"
            description: All local controls and feedbacks
          - id: dct_input
            value: "0x01"
          - id: local_stimuli
            value: "0x02"
            description: Radio pairing pushbutton etc.
          - id: local_radio
            value: "0x03"
            description: Bluetooth etc.
          - id: touch_motion
            value: "0x04"
          - id: leds
            value: "0x05"
      - name: priority
        type: integer
        min: 0
        max: 255
        description: "Greater number = higher priority. Must equal or exceed current lock level."

  - id: set_motor_ip
    label: Set Intermediate Position
    kind: action
    command_code: "0x15"
    description: "Configure an intermediate position (IP) for the motor."
    params:
      - name: function
        type: enum
        values:
          - id: delete_ip
            value: "0x00"
            description: Delete the IP; value ignored
          - id: set_current_position
            value: "0x01"
            description: Set IP at current motor position; value ignored
          - id: set_pct
            value: "0x03"
            description: Set IP at specified position in %
          - id: divide_range
            value: "0x04"
            description: "Divide full range into N equally spaced IPs; IP_index ignored"
      - name: ip_index
        type: integer
        min: 1
        max: 16
        description: "Intermediate position index (1-based). Ignored when function=0x04."
      - name: value
        type: integer
        description: "Position in % (0-100) when function=0x03; IP count when function=0x04; ignored otherwise."

  - id: set_motor_rolling_speed
    label: Set Motor Rolling Speed
    kind: action
    command_code: "0x13"
    description: "Set motor speed for DC motors only. Min/max values vary by motor - refer to technical datasheet."
    params:
      - name: up_speed
        type: integer
        description: Speed during UP movement (rpm encoding per datasheet)
      - name: down_speed
        type: integer
        description: Speed during DOWN movement (rpm encoding per datasheet)
      - name: slow_speed
        type: integer
        description: Speed for adjustment movements (rpm encoding per datasheet)

  - id: set_network_lock
    label: Set Network Lock
    kind: action
    command_code: "0x16"
    description: "Lock or unlock the device to prevent/allow network commands. Supports priority levels and persistence across power cycles."
    params:
      - name: function
        type: enum
        values:
          - id: unlock
            value: "0x00"
            description: Unlock device
          - id: lock
            value: "0x01"
            description: Lock device at current position
          - id: save_on_power_cycle
            value: "0x03"
            description: "Save NETWORK_LOCK across power cycle; priority ignored"
          - id: do_not_save
            value: "0x04"
            description: "Do not save NETWORK_LOCK across power cycle; priority ignored"
      - name: priority
        type: integer
        min: 0
        max: 255
        description: "Greater number = higher priority. Required for lock function."

  - id: get_node_addr
    label: Query Node Address
    kind: query
    command_code: "0x40"
    description: "Request all devices to report their NodeID. Warning: replies from many devices may collide."
    params: []

  - id: get_group_addr
    label: Query Group Address
    kind: query
    command_code: "0x41"
    description: "Query the group address stored at a given index."
    params:
      - name: group_index
        type: integer
        min: 0
        max: 15

  - id: get_node_app_version
    label: Query Firmware Version
    kind: query
    command_code: "0x74"
    description: Request the firmware revision from the device.
    params: []

  - id: get_node_label
    label: Query Device Label
    kind: query
    command_code: "0x45"
    description: Request the user-defined text label.
    params: []

  - id: get_local_ui
    label: Query Local UI State
    kind: query
    command_code: "0x27"
    description: Query the enabled/disabled state of a local UI element.
    params:
      - name: ui_index
        type: integer
        min: 1
        description: "UI element index (see SET_LOCAL_UI for list)"

  - id: get_motor_ip
    label: Query Intermediate Position
    kind: query
    command_code: "0x25"
    description: Query the intermediate position value at a given index.
    params:
      - name: ip_index
        type: integer
        min: 1
        max: 16

  - id: get_motor_rolling_speed
    label: Query Motor Rolling Speed
    kind: query
    command_code: "0x23"
    description: Query the current speed settings.
    params: []

  - id: get_network_lock
    label: Query Network Lock State
    kind: query
    command_code: "0x26"
    description: Query the current network lock status, source, priority, and persistence.
    params: []

  - id: get_motor_position
    label: Query Motor Position
    kind: query
    command_code: "0x0C"
    description: Request current motor position (returned even while running).
    params: []

  - id: get_motor_status
    label: Query Motor Status
    kind: query
    command_code: "0x0E"
    description: "Request motor status, direction, command source, and cause."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: ack
    response_code: "0x7F"
    description: "Acknowledgment. Sent when ACK bit was set in the request and message was processed."
    data_length: 0

  - id: nack
    response_code: "0x6F"
    description: "Negative acknowledgment with error code."
    data_length: 1
    fields:
      - name: error_code
        type: enum
        values:
          - id: data_out_of_range
            value: "0x01"
            description: DATA field values not within expected range
          - id: unknown_message
            value: "0x10"
            description: MSG identifier is unknown
          - id: message_length_error
            value: "0x11"
            description: Message length below minimum
          - id: busy
            value: "0xFF"
            description: Cannot process message

  - id: post_node_addr
    response_code: "0x60"
    description: "Device NodeID (address is in the message header SOURCE@ field)."
    data_length: 0

  - id: post_group_addr
    response_code: "0x61"
    description: Group address stored at the queried index.
    data_length: 4
    fields:
      - name: group_index
        type: integer
        min: 0
        max: 15
      - name: group_id
        type: integer
        description: 24-bit associated group address

  - id: post_node_app_version
    response_code: "0x75"
    description: Firmware revision information.
    data_length: 6
    fields:
      - name: app_reference
        type: integer
        description: 24-bit firmware part number
      - name: app_index_letter
        type: string
        description: "Firmware major revision (ASCII A-Z)"
      - name: app_index_number
        type: integer
        description: Firmware revision number
      - name: reserved
        type: integer

  - id: post_node_label
    response_code: "0x65"
    description: User-defined text label.
    data_length: 16
    fields:
      - name: label
        type: string
        description: 16-character label string

  - id: post_local_ui
    response_code: "0x37"
    description: Local UI element state.
    data_length: 5
    fields:
      - name: status
        type: enum
        values:
          - id: enabled
            value: "0x00"
          - id: disabled
            value: "0x01"
      - name: source_addr
        type: integer
        description: NodeID of the device that sent the lock command
      - name: priority
        type: integer
        description: Lock priority level

  - id: post_motor_ip
    response_code: "0x35"
    description: Intermediate position value.
    data_length: 4
    fields:
      - name: ip_index
        type: integer
        min: 1
        max: 16
      - name: reserved
        type: integer
      - name: ip_position_percentage
        type: integer
        min: 0
        max: 100
        description: "0-100, or 0xFF if IP not set"

  - id: post_motor_rolling_speed
    response_code: "0x33"
    description: Current motor speed settings.
    data_length: 3
    fields:
      - name: up_speed
        type: integer
        description: Speed during UP movement
      - name: down_speed
        type: integer
        description: Speed during DOWN movement
      - name: slow_speed
        type: integer
        description: Speed for adjustment movements

  - id: post_network_lock
    response_code: "0x36"
    description: Network lock status.
    data_length: 6
    fields:
      - name: status
        type: enum
        values:
          - id: unlocked
            value: "0x00"
          - id: locked
            value: "0x01"
      - name: source_addr
        type: integer
        description: NodeID of device that sent lock command
      - name: priority
        type: integer
        description: Lock priority level
      - name: saved
        type: enum
        values:
          - id: not_restored
            value: "0x00"
            description: Lock will not be restored on power cycle
          - id: restored
            value: "0x01"
            description: Lock will be restored on power cycle

  - id: post_motor_position
    response_code: "0x0D"
    description: Current motor position (sent even while running).
    data_length: 5
    fields:
      - name: position_pulse
        type: integer
        description: Position in encoder pulses
      - name: position_percentage
        type: integer
        min: 0
        max: 100
        description: Position as percentage of travel
      - name: reserved
        type: integer
      - name: ip
        type: integer
        description: "Matching IP index (1-based), or 0xFF if not at any IP"

  - id: post_motor_status
    response_code: "0x0F"
    description: "Motor status, direction, command source, and cause."
    data_length: 4
    fields:
      - name: status
        type: enum
        values:
          - id: stopped
            value: "0x00"
          - id: running
            value: "0x01"
          - id: blocked
            value: "0x02"
            description: "Cannot move (thermal protection, obstacle)"
          - id: locked
            value: "0x03"
            description: Locked by NETWORK_LOCK
      - name: direction
        type: enum
        values:
          - id: going_down
            value: "0x00"
          - id: going_up
            value: "0x01"
            description: "Last movement direction if stopped"
          - id: unknown
            value: "0xFF"
      - name: source
        type: enum
        values:
          - id: internal
            value: "0x00"
            description: "Limit/IP reached, over-current, obstacle, thermal protection, etc."
          - id: network
            value: "0x01"
            description: SDN bus message
          - id: local_ui
            value: "0x02"
            description: "DCT, local stimulus, local wireless"
      - name: cause
        type: enum
        values:
          - id: target_reached
            value: "0x00"
            description: Reached limit or IP or already at position
          - id: explicit_command
            value: "0x01"
          - id: wink
            value: "0x02"
          - id: obstacle_detection
            value: "0x20"
          - id: over_current
            value: "0x21"
          - id: thermal_protection
            value: "0x22"
          - id: run_time_exceeded
            value: "0x30"
          - id: timeout_exceeded
            value: "0x32"
            description: ">2 min elapsed during CTRL_MOVE adjustment"
          - id: reset_powerup
            value: "0xFF"
            description: Power recycled or no command after startup
```

## Variables
```yaml
variables:
  - id: motor_position_pct
    type: integer
    min: 0
    max: 100
    unit: "%"
    description: Current motor position as percentage of full travel range
    readable: true
    writable: true
    write_action: ctrl_moveto
    write_param: position_pct

  - id: up_speed
    type: integer
    description: Motor speed during UP movement
    readable: true
    writable: true
    write_action: set_motor_rolling_speed

  - id: down_speed
    type: integer
    description: Motor speed during DOWN movement
    readable: true
    writable: true
    write_action: set_motor_rolling_speed

  - id: slow_speed
    type: integer
    description: Motor speed for adjustment movements
    readable: true
    writable: true
    write_action: set_motor_rolling_speed

  - id: network_lock_state
    type: enum
    values: [unlocked, locked]
    description: Current network lock state
    readable: true
    writable: true
    write_action: set_network_lock

  - id: node_label
    type: string
    max_length: 16
    description: User-defined text label for device identification
    readable: true
    writable: true
    write_action: set_node_label
```

## Events
```yaml
# The SDN protocol is strictly request-response from MASTER. SLAVEs only send
# POST_xxx replies and ACK/NACK in response to MASTER requests. There are no
# unsolicited notifications from the device.
# Exception: devices can send POST_NODE_ADDR when the user presses a local button,
# but this is not a bus-initiated event usable by a controller.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "NETWORK_LOCK prevents all movement commands (CTRL_xxx, SET_MOTOR_LIMITS, SET_TILT_LIMITS) when device is locked. Only CTRL_NETWORK_LOCK and SET_NETWORK_LOCK with equal or higher priority can unlock."
  - description: "SET_LOCAL_UI with UI_Index=0x00 requires priority equal to or higher than the highest lock level across all UI elements."
# UNRESOLVED: power-on sequencing requirements not stated in source
# UNRESOLVED: obstacle detection behavior beyond cause code not detailed
```

## Notes
- **Data bit inversion:** All bytes must be bitwise inverted (NOT) before transmission on the bus. Example: data byte 0x58 is sent as 0xA7.
- **Timing constraints:** Treq ≥ 10 ms (master delay before new request); Trep = 5–255 ms (randomized slave reply delay); Tc ≤ 1 ms (max inter-character gap); Tfree = 3 ms (bus free timeout).
- **Addressing modes:** Point-to-point (DEST@ = specific NodeID), Group (SOURCE@ = GroupID, DEST@ = 000000h), Broadcast (DEST@ = FFFFFFh).
- **ACK recommendations:** Acknowledgments are optional but strongly recommended. Implement retry on NACK or ACK timeout.
- **Collision risk:** Avoid requesting ACKs or feedback in group/broadcast mode to reduce RS-485 bus collisions.
- **Speed ranges:** SET_MOTOR_ROLLING_SPEED min/max values vary by motor model — must consult the specific motor's technical datasheet. DC motors only.
- **Intermediate positions (IPs):** Up to 16 IPs per device. Function 04h (divide range) distributes IPs equally (e.g. 2 IPs → 33%/66%, 3 IPs → 25%/50%/75%).
- **Frame size:** Minimum 11 bytes (no DATA), maximum 32 bytes (21 bytes DATA).

<!-- UNRESOLVED: myLink v1.2 specific product features or deviations from generic SDN protocol not documented in source -->
<!-- UNRESOLVED: exact NodeTypes supported by myLink v1.2 not stated -->
<!-- UNRESOLVED: whether myLink acts as MASTER or can also be configured as SLAVE not stated -->

## Provenance

```yaml
source_urls:
  - https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
source_documents:
  - title: "Somfy public source"
    url: https://service.somfy.com/downloads/bui_v4/sdn-integration-guide--preliminary.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:47:12.406Z
retrieved_at: 2026-04-29T08:47:12.406Z
last_checked_at: 2026-04-27T10:13:02.628Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:02.628Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions match literal message codes in source; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```
