---
spec_id: admin/leviton-d42av-d4200-d4100-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Leviton D42AV D4200 D4100 Series Control Spec"
manufacturer: Leviton
model_family: D42AV
aliases: []
compatible_with:
  manufacturers:
    - Leviton
  models:
    - D42AV
    - D4200
    - D4100
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
retrieved_at: 2026-05-14T17:11:49.440Z
last_checked_at: 2026-06-02T22:08:45.379Z
generated_at: 2026-06-02T22:08:45.379Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model differences between D42AV / D4200 / D4100 not stated in source"
  - "firmware version compatibility not stated in source"
  - "no multi-step macro sequences explicitly documented"
  - "factory default (DE) requires physical button hold - potential safety consideration"
  - "maximum number of nodes / groups / scenes supported"
  - "Z-Wave command class details — source references Zensys spec appendices but does not include them"
  - "exact response timing requirements between commands"
  - "whether TCP/IP control is available in addition to serial"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:45.379Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Leviton D42AV D4200 D4100 Series Control Spec

## Summary

Leviton VRC0P RS-232 serial interface module for Z-Wave network control. Provides serial commands to control lighting, thermostats, door locks, and other Z-Wave devices. Command format: uppercase ASCII, prefixed with `>`, max 80 characters per line.

<!-- UNRESOLVED: exact model differences between D42AV / D4200 / D4100 not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  type: none
```

## Traits
```yaml
traits:
  - powerable
  - levelable
  - queryable
  - groupable
```

## Actions
```yaml
actions:
  - id: node_associate
    label: Associate Node(s)
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs (e.g. "2,5,10")
    description: "Associate single or group of nodes to serial interface. Send >N alone to clear current association."
    examples:
      - ">N2"
      - ">N2,5,10"
      - ">N"

  - id: power_on
    label: Power On
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
    description: "Turn ON node or group. Send >N,ON to broadcast to all nearby nodes."
    examples:
      - ">N2ON"
      - ">N2,5,10ON"
      - ">N,ON"

  - id: power_off
    label: Power Off
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
    description: "Turn OFF node or group."
    examples:
      - ">N2OFF"
      - ">N2,5,10OFF"

  - id: set_level
    label: Set Level
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
      - name: level
        type: integer
        description: "Light level 0-100 (%)"
    description: "Set light level for dimmer node(s)."
    examples:
      - ">N2L50"
      - ">N2,5,10L50"

  - id: group_recall
    label: Group Recall
    kind: action
    params:
      - name: group_number
        type: integer
        description: Group number stored via GS command
    description: "Select a stored group for subsequent control command."
    examples:
      - ">GR1"

  - id: scene_activate
    label: Activate Scene
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
      - name: scene_number
        type: integer
        description: "Scene number (2-255)"
      - name: fade_rate
        type: integer
        required: false
        description: "Fade rate (1-255)"
    description: "Activate a scene programmed with PS command."
    examples:
      - ">N2,3S2"
      - ">S2,255"

  - id: dim
    label: Dim
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
    description: "Dim light level toward 0%. Stop with ST command."
    examples:
      - ">N2DI"

  - id: bright
    label: Brighten
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
    description: "Brighten light level toward 99%. Stop with ST command."
    examples:
      - ">N2BR"

  - id: stop
    label: Stop Dim/Bright
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
    description: "Stop active dim/bright operation. Needs 1-2ms gap after DI/BR."
    examples:
      - ">N2ST"

  - id: send_zwave
    label: Send Z-Wave Command
    kind: action
    params:
      - name: nodes
        type: string
        description: Target node ID(s)
      - name: command_class
        type: integer
        description: Z-Wave command class number
      - name: command
        type: integer
        description: Command number within class
      - name: params
        type: string
        required: false
        description: Additional comma-separated parameters
    description: "Send raw Z-Wave message. Used for thermostat and non-lighting control."
    examples:
      - ">N5SE69,2"
      - ">N5SE68,1,1"

  - id: secure_send
    label: Secure Send
    kind: action
    params:
      - name: nodes
        type: string
        description: Target node ID(s)
      - name: command_class
        type: integer
        description: Z-Wave command class number
      - name: command
        type: integer
        description: Command number within class
      - name: params
        type: string
        required: false
        description: Additional comma-separated parameters
    description: "Send encrypted Z-Wave message. Requires VRC0P with +3 label. Used for door locks."
    examples:
      - ">N6SS98,1,0"
      - ">N6SS98,1,255"

  - id: group_store
    label: Group Store
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
      - name: group_number
        type: integer
        description: Group number to store
    description: "Store current association list to non-volatile memory."
    examples:
      - ">N2,5,10GS1"

  - id: program_scene
    label: Program Scene
    kind: action
    params:
      - name: nodes
        type: string
        description: Comma-separated node IDs
      - name: scene_number
        type: integer
        description: "Scene number (2-255)"
      - name: fade_rate
        type: integer
        required: false
        description: "Fade rate (1-255)"
    description: "Store current light levels as a scene."
    examples:
      - ">N2,5,10PS2,255"

  - id: append
    label: Append Command
    kind: action
    params:
      - name: continuation
        type: string
        description: Continuation of command exceeding 80 characters
    description: "Extend a command that exceeds 80-character line limit."
    examples:
      - ">AP,25,26,ON"

  - id: set_node_name
    label: Set Node Name
    kind: action
    params:
      - name: node
        type: integer
        description: Node ID
      - name: charset
        type: integer
        description: "0=standard ASCII, 1=extended ASCII, 2=Unicode UTF8"
      - name: name
        type: string
        description: "Name up to 16 characters"
    description: "Assign name to a node."
    examples:
      - ">N4NN1BEDROOM DIMMER"

  - id: set_node_location
    label: Set Node Location
    kind: action
    params:
      - name: node
        type: integer
        description: Node ID
      - name: charset
        type: integer
        description: "0=standard ASCII, 1=extended ASCII, 2=Unicode UTF8"
      - name: location
        type: string
        description: "Location up to 16 characters"
    description: "Assign location to a node."
    examples:
      - ">N4NL1MASTER BEDROOM"

  - id: factory_default
    label: Factory Default
    kind: action
    params: []
    description: "Reset serial interface to factory defaults. Must send DE while pressing and holding the LED button on the RS232 module."

  - id: include_exclude
    label: Include/Exclude
    kind: action
    params: []
    description: "Place serial interface in Z-Wave include or exclude mode."

  - id: abort
    label: Abort
    kind: action
    params: []
    description: "Cancel any previous transmission from serial interface."

  - id: set_routes
    label: Set Routes
    kind: action
    params:
      - name: source_node
        type: integer
        description: Routing slave node ID
      - name: dest_node
        type: integer
        description: "Destination node (0 to delete all routes)"
    description: "Assign or delete return routes for routing slaves. Up to 5 routes per slave."
    examples:
      - ">RO2,0"
      - ">RO2,10"

  - id: set_baud_rate
    label: Set Communication Speed
    kind: action
    params:
      - name: speed_index
        type: integer
        description: "0=9600, 1=19200, 2=38400, 3=57600, 4=115200"
    description: "Change serial baud rate. Requires VRC0P with +3 label. Resets to 9600 on power cycle."
    examples:
      - ">SP1"
```

## Feedbacks
```yaml
feedbacks:
  - id: request_node_info
    label: Request Node Info
    type: string
    description: "Request status information for a node. Response format: <Nxxx:ccc,ccc,sss,lll,fff"
    examples:
      - command: ">?N2"
        response: "<N002:044,003,000,050"

  - id: request_scene_info
    label: Request Scene Info
    type: string
    description: "Request scene info for a node. yyy=0 returns current scene. Response: scene number, light level, fade rate."
    examples:
      - command: ">N2?Syyy"
        response: "<N002:044,003,###,lll,fff"

  - id: update
    label: Update
    type: string
    description: "Get status of node(s) after control command. Append UP after control commands. Wait a few seconds between control and update."
    examples:
      - command: ">N1,10,13ON >UP"

  - id: find_node
    label: Find Node
    type: string
    description: "Find unknown node ID by device class. Response: <Fxxx where xxx is node ID."
    params:
      - name: basic_class
        type: integer
        description: "1=Controller, 2=Static Controller, 3=Slave, 4=Routing Slave"
      - name: generic_class
        type: integer
        description: "16=switch, 17=dimmer, 8=thermostat"
      - name: specific_class
        type: integer
        required: false
        description: "Defaults to 0"
      - name: instance
        type: integer
        required: false
        description: "Instance number 1-232, defaults to 1"
    examples:
      - command: ">FI4,17,0,1"
        response: "<F004"

  - id: error_response
    label: Error Response
    type: enum
    values:
      - "E000"
      - "E001"
      - "E002"
      - "E003"
      - "E004"
      - "E005"
      - "E006"
      - "E007"
      - "E008"
      - "E009"
      - "E010"
    description: "E000=no error, E001=wrong start symbol, E002=buffer overflow, E003=RF buffers full, E004=previous RF not finished, E005=unrecognized command, E006=buffer collision, E007=missing data fields, E008=cannot stop SUC, E009=EEPROM busy, E010=device not found"

  - id: rf_transmission_result
    label: RF Transmission Result
    type: enum
    values:
      - "X000"
      - "X002"
    description: "X000=transmission successful, X002=transmission error"
```

## Variables
```yaml
variables:
  - id: baud_rate
    label: Baud Rate
    type: enum
    values:
      - 9600
      - 19200
      - 38400
      - 57600
      - 115200
    description: "Current serial baud rate. Default 9600. Reset to 9600 on power cycle."
```

## Events
```yaml
# The serial interface replies after every command and after finishing every RF transmission.
# Unsolicited messages: node status updates forwarded from Z-Wave network to serial output.
# Format: <Nxxx:ccc,ccc,... (device reports)
# Format: <nxxx:... (security responses, lowercase n)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: factory default (DE) requires physical button hold - potential safety consideration
```

## Notes

- Commands must be uppercase. Start with `>`, max 80 characters per line. Use AP command to extend beyond 80 chars.
- After RF transmission completes, interface replies `<Xyyy;` — wait for this before sending next command.
- Secure Send (SS) requires VRC0P hardware with `+3` label and RF Installer Tool as primary.
- Baud rate changes via SP command persist until power cycle (reverts to 9600).
- Group Recall (GR) is two-step: select group with `>GRn`, then send control command on separate line.
- Update (UP) recommended after every control command to sync network controllers. Wait a few seconds between control and update.
- Error code `<E005` indicates unrecognized command. Error code `<E003` or `<E004` indicates RF congestion.
- Security responses use lowercase `<n` prefix vs standard uppercase `<N`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum number of nodes / groups / scenes supported -->
<!-- UNRESOLVED: Z-Wave command class details — source references Zensys spec appendices but does not include them -->
<!-- UNRESOLVED: exact response timing requirements between commands -->
<!-- UNRESOLVED: whether TCP/IP control is available in addition to serial -->

## Provenance

```yaml
source_domains:
  - leviton.com
  - applicationmarket.crestron.com
source_urls:
  - https://leviton.com/content/dam/leviton/residential/product_documents/application_note/VRC0P_ASCII_Programming_Application_Note.pdf
  - https://applicationmarket.crestron.com/content/Help/Leviton/dimensions_3000.pdf
retrieved_at: 2026-05-14T17:11:49.440Z
last_checked_at: 2026-06-02T22:08:45.379Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:45.379Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model differences between D42AV / D4200 / D4100 not stated in source"
- "firmware version compatibility not stated in source"
- "no multi-step macro sequences explicitly documented"
- "factory default (DE) requires physical button hold - potential safety consideration"
- "maximum number of nodes / groups / scenes supported"
- "Z-Wave command class details — source references Zensys spec appendices but does not include them"
- "exact response timing requirements between commands"
- "whether TCP/IP control is available in addition to serial"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
