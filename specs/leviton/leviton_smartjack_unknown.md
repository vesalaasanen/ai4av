---
spec_id: admin/leviton-smartjack
schema_version: ai4av-public-spec-v1
revision: 1
title: "Leviton SmartJack (VRC0P Vizia RF + RS-232 Serial Interface) Control Spec"
manufacturer: Leviton
model_family: VRC0P
aliases: []
compatible_with:
  manufacturers:
    - Leviton
  models:
    - VRC0P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - leviton.com
  - applicationmarket.crestron.com
source_urls:
  - https://leviton.com/content/dam/leviton/residential/product_documents/application_note/VRC0P_ASCII_Programming_Application_Note.pdf
  - https://applicationmarket.crestron.com/content/Help/Leviton/dimensions_3000.pdf
retrieved_at: 2026-09-02T17:56:09.442Z
last_checked_at: 2026-09-12T22:17:07.299Z
generated_at: 2026-09-12T22:17:07.299Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current/firmware compatibility not stated in source"
  - "no settable parameter variables beyond command parameters listed in Actions"
  - "no multi-step macros defined in source beyond the multi-line GR+CMD patterns documented inline"
  - "voltage, current, wiring safety not stated in source. SS commands require VRC0P +3 back label and RF Installer Tool as primary."
  - "firmware version compatibility, electrical ratings, exact Z-Wave command class catalog not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-09-12T22:17:07.299Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec action units (N, ON, OFF, L, GR+ON/L/DI/BR/ST/S, S, DI, BR, ST, SE, SS, ?, UP, FI, SP, GS, PS, AP, NN, NL, DE, IN, AB, RO) appear verbatim in the source command table and prose; transport 9600 8N1 matches. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Leviton SmartJack (VRC0P) Control Spec

## Summary
The Leviton VRC0P is an RS-232 serial interface module for the Vizia RF + Z-Wave lighting control system. This spec covers ASCII programming commands for controlling Z-Wave nodes (dimmers, switches, scenes, groups, thermostats, door locks) over a serial port at 9600 baud, with optional higher baud rates.

<!-- UNRESOLVED: voltage/current/firmware compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from ON/OFF command examples
- routable        # inferred from RO (routes) and group/scene commands
- queryable       # inferred from ?, UP, FI query commands
- levelable       # inferred from L (set level 0-100) and DI/BR dim/bright commands
```

## Actions
```yaml
# Note: message prefix ">" is required; messages use uppercase ASCII.
# Format: >N[node(s)]CMD[params]  e.g. >N2ON  >N2,5,10L50  >GR1
# Default baud 9600; SP command can switch baud (see communication_speed).

- id: associate_nodes
  label: Start Association (N)
  kind: action
  command: ">N{node_list}"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs (e.g. "2" or "2,5,10"), or empty to clear association

- id: on
  label: On (ON)
  kind: action
  command: ">N{node_list}ON"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs, or empty for broadcast

- id: off
  label: Off (OFF)
  kind: action
  command: ">N{node_list}OFF"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs, or empty for broadcast

- id: set_level
  label: Set Level (L)
  kind: action
  command: ">N{node_list}L{level}"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
    - name: level
      type: integer
      description: Light level 0-100 (percent)

- id: group_recall_on
  label: Group Recall On (GR + ON)
  kind: action
  command: ">GR{group}\r\n>ON"
  params:
    - name: group
      type: integer
      description: Group number stored via GS command

- id: group_recall_level
  label: Group Recall Set Level (GR + L)
  kind: action
  command: ">GR{group}\r\n>L{level}"
  params:
    - name: group
      type: integer
      description: Group number stored via GS command
    - name: level
      type: integer
      description: Light level 0-100

- id: group_recall_dim
  label: Group Recall Dim (GR + DI)
  kind: action
  command: ">GR{group}\r\n>DI"
  params:
    - name: group
      type: integer
      description: Group number

- id: group_recall_bright
  label: Group Recall Bright (GR + BR)
  kind: action
  command: ">GR{group}\r\n>BR"
  params:
    - name: group
      type: integer
      description: Group number

- id: group_recall_stop
  label: Group Recall Stop (GR + ST)
  kind: action
  command: ">GR{group}\r\n>ST"
  params:
    - name: group
      type: integer
      description: Group number

- id: group_recall_scene
  label: Group Recall Scene (GR + S)
  kind: action
  command: ">GR{group}\r\n>S{scene},{fade}"
  params:
    - name: group
      type: integer
      description: Group number
    - name: scene
      type: integer
      description: Scene number 1-255
    - name: fade
      type: integer
      description: Fade rate 1-255

- id: scene_activate
  label: Scene Activate (S)
  kind: action
  command: ">N{node_list}S{scene}"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
    - name: scene
      type: integer
      description: Scene number 1-255

- id: dim
  label: Dim (DI)
  kind: action
  command: ">N{node_list}DI"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs

- id: bright
  label: Bright (BR)
  kind: action
  command: ">N{node_list}BR"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs

- id: stop
  label: Stop (ST)
  kind: action
  command: ">N{node_list}ST"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
  notes: "Requires 1-2 ms between DI and BR commands"

- id: send_zwave
  label: Send Z-Wave Message (SE)
  kind: action
  command: ">N{node}SE{cmd_class},{cmd},{params}"
  params:
    - name: node
      type: integer
      description: Node ID
    - name: cmd_class
      type: integer
      description: Z-Wave command class
    - name: cmd
      type: integer
      description: Z-Wave command
    - name: params
      type: string
      description: Comma-separated command-class-specific parameters

- id: secure_send
  label: Secure Send Z-Wave Message (SS)
  kind: action
  command: ">N{node}SS{cmd_class},{cmd},{params}"
  params:
    - name: node
      type: integer
      description: Node ID (e.g. door lock)
    - name: cmd_class
      type: integer
      description: Z-Wave command class
    - name: cmd
      type: integer
      description: Z-Wave command
    - name: params
      type: string
      description: Comma-separated parameters
  notes: "Requires VRC0P +3 back label and RF Installer Tool as primary"

- id: request_status
  label: Request Information (?)
  kind: kind: action
  command: ">?N{node}"
  params:
    - name: node
      type: integer
      description: Node ID

- id: update
  label: Update (UP)
  kind: action
  command: ">N{node_list}UP"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
  notes: "Append to control commands; wait a few seconds between control and update"

- id: find_node
  label: Find Node (FI)
  kind: action
  command: ">FI{bbb},{ggg},{sss},{iii}"
  params:
    - name: bbb
      type: integer
      description: Basic class (1=Controller, 2=Static Controller, 3=Slave, 4=Routing Slave)
    - name: ggg
      type: integer
      description: Generic class (16=switch, 17=dimmer, 8=thermostat)
    - name: sss
      type: integer
      description: Specific class (0=any if omitted)
    - name: iii
      type: integer
      description: Instance 1-232

- id: communication_speed
  label: Communication Speed (SP)
  kind: action
  command: ">SP{x}"
  params:
    - name: x
      type: integer
      description: "Baud rate index: 0=9600 (default), 1=19200, 2=38400, 3=57600, 4=115200"
  notes: "Requires VRC0P +3 back label. Returns to 9600 after power cycle."

- id: group_store
  label: Group Store (GS)
  kind: action
  command: ">N{node_list}GS{group}"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
    - name: group
      type: integer
      description: Group number to store association under

- id: program_scene
  label: Program Scene (PS)
  kind: action
  command: ">N{node_list}PS{scene},{fade}"
  params:
    - name: node_list
      type: string
      description: Comma-separated node IDs
    - name: scene
      type: integer
      description: Scene number 2-255
    - name: fade
      type: integer
      description: Fade rate 1-255 (255 = default)

- id: append
  label: Append (AP)
  kind: action
  command: ">AP{node_list},{cmd}"
  params:
    - name: node_list
      type: string
      description: Additional comma-separated node IDs
    - name: cmd
      type: string
      description: Continuation of prior command (e.g. ON, OFF)

- id: node_name
  label: Node Name (NN)
  kind: action
  command: ">N{node}NN{charset}{name}"
  params:
    - name: node
      type: integer
      description: Node ID
    - name: charset
      type: integer
      description: "0=standard ASCII, 1=extended ASCII (recommended), 2=Unicode UTF-8"
    - name: name
      type: string
      description: Up to 16 characters

- id: node_location
  label: Node Location (NL)
  kind: action
  command: ">N{node}NL{charset}{location}"
  params:
    - name: node
      type: integer
      description: Node ID
    - name: charset
      type: integer
      description: "0=standard ASCII, 1=extended ASCII (recommended), 2=Unicode UTF-8"
    - name: location
      type: string
      description: Up to 16 characters

- id: default_reset
  label: Default Reset (DE)
  kind: action
  command: ">DE"
  notes: "Hold LED button on RS-232 module while sending"

- id: include_exclude
  label: Include/Exclude Mode (IN)
  kind: action
  command: ">IN"
  notes: "Puts module into include or exclude mode"

- id: abort
  label: Abort (AB)
  kind: action
  command: ">AB"
  notes: "Cancels any prior transmission from serial interface"

- id: routes
  label: Routes (RO)
  kind: action
  command: ">RO{node},{target}"
  params:
    - name: node
      type: integer
      description: Routing slave node ID
    - name: target
      type: integer
      description: "Target node ID; 0 deletes all routes for node"
```

## Feedbacks
```yaml
# All replies framed as <...;
- id: ack
  type: enum
  values: [ok, error]
  description: "<Exxx reply where xxx is error code (000=no error)"

- id: error_code
  type: integer
  description: "0=no error, 1=wrong start symbol, 2=buffer overflow, 3=RF buffers full, 4=RF not finished, 5=unrecognized command, 6=RS232 buffer busy, 7=missing data fields, 8=cannot stop SUC mode, 9=EEPROM busy, 10=no devices found"

- id: rf_transmission_result
  type: enum
  values: [success, error]
  description: "<X000=success, <X002=error during transmission"

- id: node_report
  type: string
  description: "Format <Nxxx:ccc,cmd,ppp,value. Example: <N002:044,003,000,050 = node 2 dimmer level 50%"

- id: find_node_reply
  type: string
  description: "<Fxxx reports node ID found by FI command"

- id: scene_report
  type: string
  description: "<Nxxx:044,003,###,lll,fff where ###=scene, lll=level, fff=fade rate"

- id: thermostat_report
  type: string
  description: "<Nxxx:068,003,mmm = thermostat mode report"

- id: multilevel_sensor_report
  type: string
  description: "<Nxxx:049,005,001,009,075 = temperature 75F from sensor"

- id: security_nonce
  type: string
  description: "<Nxxx:152,128,... = security nonce message"

- id: door_lock_battery
  type: string
  description: "<nxxx:000,128,003,070 = door lock battery 70% (lowercase 'n')"
```

## Variables
```yaml
# UNRESOLVED: no settable parameter variables beyond command parameters listed in Actions
```

## Events
```yaml
- id: unsolicited_node_update
  description: "Device forwards Z-Wave messages not processed by the controller itself to serial output as <Nxxx:... replies"
- id: rf_transmission_complete
  description: "<Xyyy reply emitted after every RF transmission finishes"
- id: network_join_event
  description: "Reply emitted when module is added/removed from a Z-Wave network"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros defined in source beyond the multi-line GR+CMD patterns documented inline
```

## Safety
```yaml
confirmation_required_for:
  - default_reset   # DE command factory-resets the module
  - abort           # AB cancels any in-flight transmission
interlocks: []
# UNRESOLVED: voltage, current, wiring safety not stated in source. SS commands require VRC0P +3 back label and RF Installer Tool as primary.
```

## Notes
- All messages start with ">" and use uppercase ASCII; max 80 chars per line (use AP to extend).
- Default serial: 9600 baud, 8N1, no flow control. SP command switches baud but returns to 9600 on power cycle.
- DI/BR commands need 1-2 ms gap; UP appended after control commands for state sync; wait a few seconds before UP.
- SP, SS, and Secure Send (SS) require VRC0P with "+3" on back label.
- "FIND" (FI) basic/generic/specific class values: 0=any, 1=Controller, 2=Static Controller, 3=Slave, 4=Routing Slave; generic 16=switch, 17=dimmer, 8=thermostat.
- Source titled "Vizia RF + RS232 Serial Interface ASCII Programming"; underlying physical product identified as Leviton SmartJack with model VRC0P.

<!-- UNRESOLVED: firmware version compatibility, electrical ratings, exact Z-Wave command class catalog not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - leviton.com
  - applicationmarket.crestron.com
source_urls:
  - https://leviton.com/content/dam/leviton/residential/product_documents/application_note/VRC0P_ASCII_Programming_Application_Note.pdf
  - https://applicationmarket.crestron.com/content/Help/Leviton/dimensions_3000.pdf
retrieved_at: 2026-09-02T17:56:09.442Z
last_checked_at: 2026-09-12T22:17:07.299Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:17:07.299Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec action units (N, ON, OFF, L, GR+ON/L/DI/BR/ST/S, S, DI, BR, ST, SE, SS, ?, UP, FI, SP, GS, PS, AP, NN, NL, DE, IN, AB, RO) appear verbatim in the source command table and prose; transport 9600 8N1 matches. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current/firmware compatibility not stated in source"
- "no settable parameter variables beyond command parameters listed in Actions"
- "no multi-step macros defined in source beyond the multi-line GR+CMD patterns documented inline"
- "voltage, current, wiring safety not stated in source. SS commands require VRC0P +3 back label and RF Installer Tool as primary."
- "firmware version compatibility, electrical ratings, exact Z-Wave command class catalog not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
