---
spec_id: admin/somfy-st-30-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Somfy ST-30 RS-232C Control Spec"
manufacturer: Somfy
model_family: ST-30
aliases: []
compatible_with:
  manufacturers:
    - Somfy
  models:
    - ST-30
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-10T00:54:17.267Z
last_checked_at: 2026-06-10T00:54:17.267Z
generated_at: 2026-06-10T00:54:17.267Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document covers the SDN protocol generally for all RS485 product families; ST-30-specific NodeType is 02h (Ø30 DC Serie RS485). Speed range min/max values for UP/DOWN/Slow speeds are device-datasheet-dependent and not included in the protocol doc."
  - "no persistent settable variables beyond those covered by SET_ actions above"
  - "no multi-step macro sequences described in source"
  - "The source document is the generic SDN protocol spec, not an ST-30-specific manual. ST-30 model name attribution is inferred from the entity context (NodeType 02h = Ø30 DC Serie RS485). Physical RS-232C interface details (connector pinout, RS-232 to RS-485 converter requirements) are not described in the source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:54:17.267Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec action MASTER commands matched literally with correct MSG codes; transport parameters verified against section 4.1; no source MASTER commands omitted. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Somfy ST-30 RS-232C Control Spec

## Summary

The Somfy ST-30 is a tubular motor (Ø30 DC series) controlled via the SOMFY Digital Network (SDN) protocol over RS-485 (RS-232C physical interface). This spec covers the binary SDN protocol for MASTER-initiated point-to-point, group, and broadcast communication: device discovery, group configuration, local UI management, intermediate positions, speed adjustment, network lock, move-to-position, stop, and motor status/position queries. All bytes must be bitwise-inverted before transmission per the SDN wire encoding rule.

<!-- UNRESOLVED: Source document covers the SDN protocol generally for all RS485 product families; ST-30-specific NodeType is 02h (Ø30 DC Serie RS485). Speed range min/max values for UP/DOWN/Slow speeds are device-datasheet-dependent and not included in the protocol doc. -->

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
- routable   # inferred from move-to-position and stop command examples
- queryable  # inferred from GET_MOTOR_POSITION and GET_MOTOR_STATUS query commands
- levelable  # inferred from position-percentage and speed-adjustment commands
```

## Actions

```yaml
- id: ctrl_moveto_down_limit
  label: Move to Down Limit
  kind: action
  params: []
  notes: "MSG=03h, Function=00h, Position ignored. All bytes must be bitwise-inverted on wire."

- id: ctrl_moveto_up_limit
  label: Move to Up Limit
  kind: action
  params: []
  notes: "MSG=03h, Function=01h, Position ignored."

- id: ctrl_moveto_ip
  label: Move to Intermediate Position
  kind: action
  params:
    - name: ip_index
      type: integer
      description: "Intermediate position index (0 to 15)"
  notes: "MSG=03h, Function=02h, Position field = IP index (0–15)."

- id: ctrl_moveto_percent
  label: Move to Position (Percent)
  kind: action
  params:
    - name: position_percent
      type: integer
      description: "Position as percentage of full travel range (0 to 100)"
  notes: "MSG=03h, Function=04h, Position field = percentage value."

- id: ctrl_stop
  label: Stop
  kind: action
  params: []
  notes: "MSG=02h. Motor is immediately stopped without speed ramp-down. DATA=1 byte reserved (00h)."

- id: set_group_addr
  label: Set Group Address
  kind: action
  params:
    - name: group_index
      type: integer
      description: "Entry in the group table (0–15)"
    - name: group_id
      type: string
      description: "24-bit GroupID in hex"
  notes: "MSG=51h, DATA length=4."

- id: set_motor_ip
  label: Set Intermediate Position
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Delete, 01h=Set at current pos, 03h=Set at %, 04h=Divide range equally"
    - name: ip_index
      type: integer
      description: "IP index (1–16); ignored for Function=04h"
    - name: value
      type: integer
      description: "Position % (Function=03h) or IP count (Function=04h); ignored for Function=00h/01h"
  notes: "MSG=15h, DATA length=4."

- id: set_motor_rolling_speed
  label: Set Motor Rolling Speed
  kind: action
  params:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm); range per device datasheet"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm); range per device datasheet"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm); range per device datasheet"
  notes: "MSG=13h, DATA length=3. Only available on DC motors."

- id: set_network_lock
  label: Set Network Lock
  kind: action
  params:
    - name: function
      type: integer
      description: "00h=Unlock, 01h=Lock at current pos, 03h=Save lock on power cycle, 04h=Do not save lock"
    - name: priority
      type: integer
      description: "Priority level (0–255); higher number = higher priority; ignored for Function=03h/04h"
  notes: "MSG=16h, DATA length=2."

- id: set_local_ui
  label: Set Local UI (HMI Management)
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
      description: "Priority level (0–255); greater = higher priority"
  notes: "MSG=17h, DATA length=3."

- id: set_node_label
  label: Set Node Label
  kind: action
  params:
    - name: label
      type: string
      description: "16-character ASCII label; pad with spaces if shorter"
  notes: "MSG=55h, DATA length=16 (always)."
- id: get_motor_position
  label: Get Motor Position
  kind: query
  params: []
  notes: "MSG=0Ch, DATA length=0. Response: POST_MOTOR_POSITION (0Dh)."

- id: get_motor_status
  label: Get Motor Status
  kind: query
  params: []
  notes: "MSG=0Eh, DATA length=0. Response: POST_MOTOR_STATUS (0Fh)."

- id: get_motor_rolling_speed
  label: Get Motor Rolling Speed
  kind: query
  params: []
  notes: "MSG=23h, DATA length=0. Response: POST_MOTOR_ROLLING_SPEED (33h). DC motors only."

- id: get_motor_ip
  label: Get Intermediate Position
  kind: query
  params:
    - name: ip_index
      type: integer
      description: "IP index (1-16)"
  notes: "MSG=25h, DATA length=1. Response: POST_MOTOR_IP (35h)."

- id: get_network_lock
  label: Get Network Lock Status
  kind: query
  params: []
  notes: "MSG=26h, DATA length=0. Response: POST_NETWORK_LOCK (36h)."

- id: get_local_ui
  label: Get Local UI Status
  kind: query
  params:
    - name: ui_index
      type: integer
      description: "UI element index (01h-05h); refer to SET_LOCAL_UI UI_Index table"
  notes: "MSG=27h, DATA length=1. Response: POST_LOCAL_UI (37h)."

- id: get_node_addr
  label: Get Node Address
  kind: query
  params: []
  notes: "MSG=40h, DATA length=0. Response: POST_NODE_ADDR (60h)."

- id: get_group_addr
  label: Get Group Address
  kind: query
  params:
    - name: group_index
      type: integer
      description: "Entry in the group table (0-15)"
  notes: "MSG=41h, DATA length=1. Response: POST_GROUP_ADDR (61h)."

- id: get_node_label
  label: Get Node Label
  kind: query
  params: []
  notes: "MSG=45h, DATA length=0. Response: POST_NODE_LABEL (65h)."

- id: get_node_app_version
  label: Get Firmware Revision
  kind: query
  params: []
  notes: "MSG=74h, DATA length=0. Response: POST_NODE_APP_VERSION (75h)."
```

## Feedbacks

```yaml
- id: post_motor_position
  label: Motor Position
  type: object
  description: "Response to GET_MOTOR_POSITION (0Ch). MSG=0Dh, DATA length=5."
  fields:
    - name: position_pulse
      type: integer
      description: "16-bit absolute pulse count between UP_LIMIT and DOWN_LIMIT"
    - name: position_percentage
      type: integer
      description: "Position as 0–100 percent"
    - name: ip
      type: integer
      description: "Current intermediate position index (01h–IP_MAX); FFh if not at any IP"

- id: post_motor_status
  label: Motor Status
  type: object
  description: "Response to GET_MOTOR_STATUS (0Eh). MSG=0Fh, DATA length=4."
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

- id: post_network_lock
  label: Network Lock Status
  type: object
  description: "Response to GET_NETWORK_LOCK (26h). MSG=36h, DATA length=6."
  fields:
    - name: status
      type: enum
      values: ["00h=Unlocked", "01h=Locked"]
    - name: source_addr
      type: string
      description: "24-bit NodeID of the device that sent the lock command"
    - name: priority
      type: integer
      description: "Priority level (0–255)"
    - name: saved
      type: enum
      values: ["00h=Not restored on power cycle", "01h=Restored on power cycle"]

- id: post_node_app_version
  label: Firmware Revision
  type: object
  description: "Response to GET_NODE_APP_VERSION (74h). MSG=75h, DATA length=6."
  fields:
    - name: app_reference
      type: string
      description: "24-bit firmware part number"
    - name: app_index_letter
      type: string
      description: "Firmware major revision (ASCII 41h–5Ah)"
    - name: app_index_number
      type: integer
      description: "Firmware revision number"

- id: post_node_label
  label: Node Label
  type: string
  description: "Response to GET_NODE_LABEL (45h). MSG=65h, DATA length=16. 16-character ASCII label."

- id: post_node_addr
  label: Node Address Report
  type: object
  description: "Response to GET_NODE_ADDR (40h). MSG=60h, DATA length=0. Address is carried in message header."

- id: post_group_addr
  label: Group Address
  type: object
  description: "Response to GET_GROUP_ADDR (41h). MSG=61h, DATA length=4."
  fields:
    - name: group_index
      type: integer
      description: "Entry in the group table (0–15)"
    - name: group_id
      type: string
      description: "24-bit GroupID"

- id: post_local_ui
  label: Local UI Status
  type: object
  description: "Response to GET_LOCAL_UI (27h). MSG=37h, DATA length=5."
  fields:
    - name: status
      type: enum
      values: ["00h=Enabled/Unlocked", "01h=Disabled/Locked"]
    - name: source_addr
      type: string
      description: "24-bit NodeID that issued the lock"
    - name: priority
      type: integer
      description: "Priority level (0–255)"

- id: post_motor_ip
  label: Intermediate Position Value
  type: object
  description: "Response to GET_MOTOR_IP (25h). MSG=35h, DATA length=4."
  fields:
    - name: ip_index
      type: integer
      description: "IP index (1–16)"
    - name: ip_position_percentage
      type: integer
      description: "IP position as 0–100 percent; FFh if IP not set"

- id: post_motor_rolling_speed
  label: Motor Rolling Speed
  type: object
  description: "Response to GET_MOTOR_ROLLING_SPEED (23h). MSG=33h, DATA length=3."
  fields:
    - name: up_speed
      type: integer
      description: "Speed during UP movement (rpm)"
    - name: down_speed
      type: integer
      description: "Speed during DOWN movement (rpm)"
    - name: slow_speed
      type: integer
      description: "Speed for adjustment movements (rpm)"

- id: ack
  label: Acknowledgment
  type: enum
  values: ["7Fh=ACK"]
  description: "Sent by SLAVE when ACK bit set in request and operation succeeded."

- id: nack
  label: Negative Acknowledgment
  type: object
  description: "MSG=6Fh, DATA length=1. Sent when ACK requested but error detected."
  fields:
    - name: error_code
      type: enum
      values: ["01h=Data out of range", "10h=Unknown message", "11h=Message length error", "FFh=Busy"]
```

## Variables

```yaml
# UNRESOLVED: no persistent settable variables beyond those covered by SET_ actions above
```

## Events

```yaml
- id: post_node_addr_unsolicited
  label: Unsolicited Node Address
  description: "Some devices send POST_NODE_ADDR (60h) without a MASTER request when the user presses the device pushbutton. Address is in the message header, no DATA."
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "When NETWORK_LOCK is active, only CTRL_NETWORK_LOCK messages with equal or higher priority are accepted. Movement commands and limit-change commands are rejected with NACK (NODE_IS_LOCKED)."
  - description: "Motor is blocked (Status=02h) due to thermal protection or obstacle detection; movement commands will not execute until condition clears."
  - description: "Avoid requesting ACK or feedback in group/broadcast addressing mode to reduce RS-485 bus collision risk."
```

## Notes

**Wire encoding:** All data bytes MUST be bitwise-inverted before transmission (SDN backward-compatibility requirement). Example: to transmit 58h, send A7h on the wire.

**Byte order:** SOURCE@ and DEST@ are transmitted LSB-first (LSBF).

**Timing constraints:**
- Tc (max between consecutive characters): 1 ms
- Tfree (bus free timeout): 3 ms
- Trep (slave reply delay): 5–255 ms (partially randomized)
- Treq (master inter-request delay): 10 ms minimum

**Message framing:** No synchronization byte exists. Message boundaries are detected by bus inactivity (Tfree timeout).

**Message length:** Minimum 11 bytes (no DATA), maximum 32 bytes (up to 21 bytes DATA). When receiving, treat DATA length field as minimum — actual DATA may be longer.

**Checksum:** Sum of complements of all bytes except the two checksum bytes. Two bytes at frame end.

**NodeType for ST-30:** 02h (Ø30 DC Serie RS485).

**ACK strategy:** It is strongly recommended to request ACK on all MASTER messages and implement a retry when NACK is received or no ACK arrives within timeout.

**Speed range:** UP/DOWN/Slow speed valid ranges are motor-model-specific; consult the ST-30 technical datasheet for exact rpm limits.

<!-- UNRESOLVED: The source document is the generic SDN protocol spec, not an ST-30-specific manual. ST-30 model name attribution is inferred from the entity context (NodeType 02h = Ø30 DC Serie RS485). Physical RS-232C interface details (connector pinout, RS-232 to RS-485 converter requirements) are not described in the source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-10T00:54:17.267Z
last_checked_at: 2026-06-10T00:54:17.267Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:54:17.267Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec action MASTER commands matched literally with correct MSG codes; transport parameters verified against section 4.1; no source MASTER commands omitted. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document covers the SDN protocol generally for all RS485 product families; ST-30-specific NodeType is 02h (Ø30 DC Serie RS485). Speed range min/max values for UP/DOWN/Slow speeds are device-datasheet-dependent and not included in the protocol doc."
- "no persistent settable variables beyond those covered by SET_ actions above"
- "no multi-step macro sequences described in source"
- "The source document is the generic SDN protocol spec, not an ST-30-specific manual. ST-30 model name attribution is inferred from the entity context (NodeType 02h = Ø30 DC Serie RS485). Physical RS-232C interface details (connector pinout, RS-232 to RS-485 converter requirements) are not described in the source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
