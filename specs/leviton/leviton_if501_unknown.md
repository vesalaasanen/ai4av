---
spec_id: admin/leviton-if501
schema_version: ai4av-public-spec-v1
revision: 1
title: "Leviton IF501 Control Spec"
manufacturer: Leviton
model_family: IF501
aliases: []
compatible_with:
  manufacturers:
    - Leviton
  models:
    - IF501
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
retrieved_at: 2026-05-14T23:54:54.918Z
last_checked_at: 2026-06-02T22:08:46.986Z
generated_at: 2026-06-02T22:08:46.986Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model IF501 inferred from entity_id; source references \"Vizia RF + VRC0P\" — exact model correspondence not confirmed"
  - "no distinct settable variables beyond action parameters identified in source"
  - "no explicit safety warnings or interlock procedures in source."
  - "exact model number IF501 vs VRC0P correspondence not confirmed in source"
  - "maximum number of nodes/groups supported not stated"
  - "firmware version compatibility not stated"
  - "command timing requirements beyond ST (1-2ms between DI/BR) not specified"
  - "Z-Wave command class details referenced in appendices but not fully enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:46.986Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Leviton IF501 Control Spec

## Summary
Leviton IF501 (Vizia RF + VRC0P) RS-232 serial interface module for Z-Wave network control. Provides ASCII command protocol over serial for controlling lighting (on/off/dim/bright), scenes, groups, thermostats, door locks, and generic Z-Wave devices. Message format uses `>` prefix with uppercase ASCII commands, max 80 characters per line.

<!-- UNRESOLVED: device model IF501 inferred from entity_id; source references "Vizia RF + VRC0P" — exact model correspondence not confirmed -->

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
- powerable    # ON/OFF commands
- levelable    # L (level 0-100%), DI, BR commands
- queryable    # ? (request), UP (update) commands
```

## Actions
```yaml
- id: node_associate
  label: Associate Nodes
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers (e.g. "2,3,5")
  notes: ">N2,3,5 associates nodes. >N with no args clears association."

- id: power_on
  label: Power On
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers, or empty for broadcast
  notes: "Example: >N2ON or >N,ON (broadcast)"

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers, or empty for broadcast
  notes: "Example: >N2,5,10OFF"

- id: set_level
  label: Set Level
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
    - name: level
      type: integer
      description: Light level 0-100 percent

- id: group_recall
  label: Group Recall
  kind: action
  params:
    - name: group
      type: integer
      description: Group number (stored via GS command)
  notes: "Follow with a control command on next line (e.g. >ON, >L50)"

- id: scene_activate
  label: Activate Scene
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
    - name: scene
      type: integer
      description: Scene number (2-255)
    - name: fade_rate
      type: integer
      required: false
      description: Fade rate (1-255), optional

- id: dim
  label: Dim
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
  notes: "Dims toward 0%. Stop with ST command."

- id: bright
  label: Brighten
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
  notes: "Brightens toward 99%. Stop with ST command."

- id: stop
  label: Stop Dim/Bright
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
  notes: "Stops active DI/BR operation. Needs 1-2ms between DI and BR commands."

- id: send_zwave
  label: Send Z-Wave Command
  kind: action
  params:
    - name: nodes
      type: string
      description: Target node number(s)
    - name: command_class
      type: integer
      description: Z-Wave command class number
    - name: command
      type: integer
      description: Z-Wave command number
    - name: params
      type: string
      required: false
      description: Additional command parameters (comma-separated)
  notes: "Raw Z-Wave message. Example: >N5SE68,1,1"

- id: secure_send
  label: Secure Send Z-Wave Command
  kind: action
  params:
    - name: nodes
      type: string
      description: Target node number(s)
    - name: command_class
      type: integer
      description: Z-Wave command class number
    - name: command
      type: integer
      description: Z-Wave command number
    - name: params
      type: string
      required: false
      description: Additional command parameters (comma-separated)
  notes: "Encrypted Z-Wave message for security devices. Requires VRC0P with +3 label."

- id: group_store
  label: Store Group
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
    - name: group
      type: integer
      description: Group number to store

- id: program_scene
  label: Program Scene
  kind: action
  params:
    - name: nodes
      type: string
      description: Comma-separated node numbers
    - name: scene
      type: integer
      description: Scene number (2-255)
    - name: fade_rate
      type: integer
      required: false
      description: Fade rate (1-255)

- id: set_node_name
  label: Set Node Name
  kind: action
  params:
    - name: node
      type: integer
      description: Node number
    - name: charset
      type: integer
      description: "0=ASCII, 1=extended ASCII (recommended), 2=Unicode UTF-8"
    - name: name
      type: string
      description: "Name up to 16 characters"

- id: set_node_location
  label: Set Node Location
  kind: action
  params:
    - name: node
      type: integer
      description: Node number
    - name: charset
      type: integer
      description: "0=ASCII, 1=extended ASCII (recommended), 2=Unicode UTF-8"
    - name: location
      type: string
      description: "Location up to 16 characters"

- id: append
  label: Append Command
  kind: action
  params:
    - name: continuation
      type: string
      description: Continuation of command exceeding 80 chars
  notes: "Extends previous command line. Example: >AP,25,26,ON"

- id: set_speed
  label: Set Communication Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: "0=9600, 1=19200, 2=38400, 3=57600, 4=115200"
  notes: "Requires VRC0P with +3 label. Reverts to 9600 on power cycle."

- id: factory_default
  label: Factory Default
  kind: action
  params: []
  notes: "Must hold LED button while sending DE command."

- id: include_exclude
  label: Include/Exclude
  kind: action
  params: []
  notes: "Puts RS232 module into network include/exclude mode."

- id: abort
  label: Abort
  kind: action
  params: []
  notes: "Cancels any previous transmission."

- id: set_routes
  label: Assign/Delete Routes
  kind: action
  params:
    - name: source_node
      type: integer
      description: Routing slave node number
    - name: target_node
      type: integer
      description: "Target node. 0 to delete all routes for source."
```

## Feedbacks
```yaml
- id: error_code
  type: enum
  values: [E000, E001, E002, E003, E004, E005, E006, E007, E008, E009, E010]
  description: >
    E000=no error, E001=wrong start symbol, E002=input buffer overflow,
    E003=cannot start RF (buffers full), E004=previous RF not finished,
    E005=unrecognized command, E006=RS232 buffer collision,
    E007=send message missing data fields, E008=cannot stop SUC mode,
    E009=EEPROM busy, E010=no devices found

- id: transmission_result
  type: enum
  values: [X000, X002]
  description: "X000=success, X002=transmission error"

- id: node_report
  type: string
  description: >
    Unsolicited report from nodes. Format: <Nxxx:ccc,mmm,...>
    xxx=node ID, ccc=command class, mmm=command/data bytes.
    Security responses use lowercase 'n' prefix.

- id: find_result
  type: string
  description: "Node ID found. Format: <Fxxx where xxx is node ID."

- id: node_level_report
  type: string
  description: >
    Level report from update/request. Format: <Nxxx:044,003,sss,lll,fff>
    sss=scene number, lll=light level, fff=fade rate
```

## Variables
```yaml
# UNRESOLVED: no distinct settable variables beyond action parameters identified in source
```

## Events
```yaml
- id: unsolicited_node_report
  description: >
    Device forwards incoming Z-Wave messages to serial output as
    <Nxxx:...> or <nxxx:...> (security). Occurs when nodes send
    unsolicited reports to the serial interface.

- id: network_change
  description: >
    Interface replies after adding/removing itself to/from a Z-Wave network.
```

## Macros
```yaml
- id: dimmer_off_sequence
  steps:
    - ">N2OFF"
    - ">N2UP"
  notes: "Turn dimmer OFF with update. Source appendix D."

- id: set_level_with_update
  steps:
    - ">N2L50UP"
  notes: "Set level and request update in single command. Source appendix D."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Factory default (DE) requires physical button hold - noted in action params.
```

## Notes
- All commands must use uppercase letters and start with `>` prefix.
- Input string limited to 80 characters; use AP (append) to extend.
- Communication speed reverts to 9600 baud after power cycle.
- Secure Send (SS) requires VRC0P hardware revision with +3 on back label.
- Update (UP) command recommended over Request (?) for status queries; wait a few seconds between control command and update command.
- Z-Wave routing slaves support up to 5 return routes via RO command.

<!-- UNRESOLVED: exact model number IF501 vs VRC0P correspondence not confirmed in source -->
<!-- UNRESOLVED: maximum number of nodes/groups supported not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command timing requirements beyond ST (1-2ms between DI/BR) not specified -->
<!-- UNRESOLVED: Z-Wave command class details referenced in appendices but not fully enumerated -->

## Provenance

```yaml
source_domains:
  - leviton.com
  - applicationmarket.crestron.com
source_urls:
  - https://leviton.com/content/dam/leviton/residential/product_documents/application_note/VRC0P_ASCII_Programming_Application_Note.pdf
  - https://applicationmarket.crestron.com/content/Help/Leviton/dimensions_3000.pdf
retrieved_at: 2026-05-14T23:54:54.918Z
last_checked_at: 2026-06-02T22:08:46.986Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:46.986Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model IF501 inferred from entity_id; source references \"Vizia RF + VRC0P\" — exact model correspondence not confirmed"
- "no distinct settable variables beyond action parameters identified in source"
- "no explicit safety warnings or interlock procedures in source."
- "exact model number IF501 vs VRC0P correspondence not confirmed in source"
- "maximum number of nodes/groups supported not stated"
- "firmware version compatibility not stated"
- "command timing requirements beyond ST (1-2ms between DI/BR) not specified"
- "Z-Wave command class details referenced in appendices but not fully enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
