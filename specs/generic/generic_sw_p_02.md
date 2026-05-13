---
spec_id: admin/generic-sw-p-02
schema_version: ai4av-public-spec-v1
revision: 1
title: "Generic SW-P-02 Control Spec"
manufacturer: Generic
model_family: "Generic SW-P-02"
aliases: []
compatible_with:
  manufacturers:
    - Generic
  models:
    - "Generic SW-P-02"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.rascular.com
  - docs.dataminer.services
  - yumpu.com
  - github.com
retrieved_at: 2026-04-29T23:57:03.635Z
last_checked_at: 2026-04-27T14:52:18.031Z
generated_at: 2026-04-27T14:52:18.031Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T14:52:18.031Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions have literal source counterparts; transport parameters verified against Pro-Bel SW-P-02 reference."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Generic SW-P-02 Control Spec

## Summary
SW-P-02 is a router/switcher control protocol originally from Pro-Bel, later supported by Snell/Grass Valley. Supports both RS-485 (default 38400, 8N1, even parity) and TCP control. Covers crosspoint routing, tally queries, salvo switching, status monitoring, and protect functions for video routers of various sizes.

<!-- UNRESOLVED: manufacturer entity bootstrap not confirmed; protocol also implemented by Rascular, Snell, Grass Valley -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: null  # UNRESOLVED: auth mechanism not described in source
```

## Traits
```yaml
- routable       # CONNECT, EXTENDED_CONNECT, CONNECT_ON_GO commands present
- queryable      # INTERROGATE, EXTENDED_INTERROGATE, STATUS_REQUEST present
```

## Actions
```yaml
- id: connect
  label: Connect (Route)
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number (0-based or 1-based per implementation)
    - name: source
      type: integer
      description: Source input number

- id: connect_on_go
  label: Connect On Go (Salvo Prepare)
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number
    - name: source
      type: integer
      description: Source input number

- id: go
  label: Execute Prepared Routes
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=SET, 0x01=CLEAR
    - name: destination
      type: integer
      description: Destination output number (0 = all)

- id: connect_on_go_group_salvo
  label: Connect On Go Group Salvo
  kind: action
  params:
    - name: salvo_id
      type: integer
      description: Salvo number (0-127)
    - name: destination
      type: integer
      description: Destination output number
    - name: source
      type: integer
      description: Source input number

- id: go_group_salvo
  label: Execute Group Salvo
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=SET, 0x01=CLEAR
    - name: salvo_id
      type: integer
      description: Salvo number (0-127)

- id: extended_connect
  label: Extended Connect (Large Router)
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number (supports up to 16384 destinations)
    - name: source
      type: integer
      description: Source input number (supports up to 16384 sources)

- id: extended_connect_on_go
  label: Extended Connect On Go
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number (supports up to 4096 destinations)
    - name: source
      type: integer
      description: Source input number

- id: protect_connect
  label: Protect Destination
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number to protect

- id: protect_disconnect
  label: Unprotect Destination
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number to unprotect

- id: mixer_connect
  label: Mixer Connect (TDM 4-Wire)
  kind: action
  params:
    - name: output
      type: integer
      description: Output number
    - name: source
      type: integer
      description: Source input number
    - name: gain
      type: integer
      description: Gain coefficient

- id: set_output_gain
  label: Set Output Gain (TDM 4-Wire)
  kind: action
  params:
    - name: output
      type: integer
      description: Output number
    - name: gain
      type: integer
      description: Gain coefficient
- id: database_checksum_request
  label: Database Checksum Request
  kind: query
  params:
    - name: target
      type: integer
      description: 0x00=REQUEST_CHECKSUM

- id: interrogate
  label: Interrogate (Request Tally)
  kind: query
  params:
    - name: destination
      type: integer
      description: Destination output number to query routing state for

- id: extended_interrogate
  label: Extended Interrogate (Large Router)
  kind: query
  params:
    - name: destination
      type: integer
      description: Destination output number; supports up to 16384 destinations

- id: status_request
  label: Status Request
  kind: query
  params:
    - name: target
      type: enum
      values: [0x00, 0x01]
      description: 0x00=LEFT_HAND_CONTROLLER, 0x01=RIGHT_HAND_CONTROLLER

- id: status_request2
  label: Status Request 2 (Fault Status)
  kind: query
  params: []

- id: enable_crosspoint_update
  label: Enable Crosspoint Update
  kind: action
  params: []

- id: source_lock_status_request
  label: Source Lock Status Request
  kind: query
  params:
    - name: target
      type: enum
      values: [0x00, 0x01]
      description: 0x00=LEFT_HAND_CONTROLLER, 0x01=RIGHT_HAND_CONTROLLER

- id: mixer_interrogate
  label: Mixer Interrogate
  kind: query
  params:
    - name: output
      type: integer
      description: Output number to query all contributing sources for (TDM 4-Wire Router)

- id: assign_slot
  label: Assign Slot
  kind: action
  params:
    - name: input
      type: integer
      description: Physical input number
    - name: slot
      type: integer
      description: Time slot number to assign; for routers > 384x384

- id: read_slot_assignment
  label: Read Slot Assignment
  kind: query
  params:
    - name: input
      type: integer
      description: Physical input number to query slot allocation for

- id: read_output_gain
  label: Read Output Gain
  kind: query
  params:
    - name: output
      type: integer
      description: Output number to read gain coefficient for (TDM 4-Wire Router)

- id: read_twinkler
  label: Read Twinkler (Signal Levels)
  kind: query
  params: []

- id: installed_modules_status_request
  label: Installed Modules Status Request
  kind: query
  params:
    - name: target
      type: enum
      values: [0x00, 0x01]
      description: 0x00=LEFT_HAND_CONTROLLER, 0x01=RIGHT_HAND_CONTROLLER

- id: extended_connect_on_go_group_salvo
  label: Extended Connect On Go Group Salvo
  kind: action
  params:
    - name: salvo_id
      type: integer
      description: Salvo number (0-127)
    - name: destination
      type: integer
      description: Destination output number; supports up to 4096 destinations
    - name: source
      type: integer
      description: Source input number

- id: router_input_output_parameters_interrogate
  label: Router Input/Output Parameters Interrogate
  kind: query
  params:
    - name: start_source
      type: integer
      description: First source number to request; max 64 sources per request

- id: status_data_request
  label: Status Data Request
  kind: query
  params:
    - name: target
      type: integer
      description: Target system identifier

- id: router_configuration_request
  label: Router Configuration Request
  kind: query
  params: []

- id: dual_controller_status_request
  label: Dual Controller Status Request
  kind: query
  params: []

- id: extended_protect_interrogate
  label: Extended Protect Interrogate
  kind: query
  params:
    - name: destination
      type: integer
      description: Destination output number to get protect status for

- id: extended_protect_connect
  label: Extended Protect Connect (Protect Destination)
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number to protect

- id: extended_protect_disconnect
  label: Extended Protect Disconnect (Unprotect Destination)
  kind: action
  params:
    - name: destination
      type: integer
      description: Destination output number to remove protection from

- id: protect_device_name_request
  label: Protect Device Name Request
  kind: query
  params:
    - name: destination
      type: integer
      description: Destination output number to request protecting device name for

- id: extended_protect_tally_dump_request
  label: Extended Protect Tally Dump Request
  kind: query
  params: []

- id: preprocessing_config_request
  label: Preprocessing Config Request
  kind: query
  params: []

- id: preprocessing_interrogate
  label: Preprocessing Interrogate
  kind: query
  params:
    - name: destination
      type: integer
      description: Destination output number to query pre-processing tally for

- id: x_tally_interrogate
  label: X Tally Interrogate
  kind: query
  params:
    - name: output
      type: integer
      description: Output number to request bitmap of video and key sources for (Charisma Ten X)

- id: x_tally_status_ack
  label: X Tally Status Acknowledge
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: tally
  type: object
  description: Current routing state returned in response to INTERROGATE or EXTENDED_INTERROGATE

- id: connected
  type: object
  description: Confirms crosspoint set. Issued on ALL ports after route made.

- id: status_response
  type: object
  description: Device status returned in response to STATUS_REQUEST. Multiple variants (STATUS_RESPONSE1-6) for different card types.

- id: router_configuration
  type: object
  description: Bitmap showing which levels configured, number of sources/destinations per level. Response to ROUTER_CONFIGURATION_REQUEST.

- id: protect_tally
  type: object
  description: Current protect status of a destination. Response to EXTENDED_PROTECT_INTERROGATE.

- id: go_done_ack
  type: object
  description: Indicates GO command executed. Mode field: 0x00=SET, 0x01=CLEAR, 0x02=NONE.

- id: cannot_execute
  type: object
  description: Response when command cannot be executed. Opcode 0x78.
```

## Variables
```yaml
- id: destination_routing
  type: integer
  description: Current source routed to a given destination output

- id: source_lock_status
  type: enum
  values: [locked, unlocked]
  description: Source lock status on input modules (HD digital video routers only)

- id: dual_controller_status
  type: object
  description: Master/slave active status and idle controller fault status

- id: output_gain
  type: integer
  description: Gain coefficient applied on given output (TDM 4-Wire Router)

- id: twinkler_status
  type: object
  description: Input signal levels on all 96 ports (TDM 4-Wire Router)

- id: protect_status
  type: enum
  values: [protected, unprotected]
  description: Protection state of a destination
```

## Events
```yaml
# UNRESOLVED: no unsolicited event definitions found in source.
# The CONNECTED and TALLY messages are issued in response to commands, not unprompted.
# Fault status broadcast (STATUS_RESPONSE6) is sent when fault status changes - field not populated.
```

## Macros
```yaml
# Salvo switching: prepare multiple routes with CONNECT_ON_GO, then execute all with GO command.
# Group Salvo: prepare up to 128 routes with CONNECT_ON_GO_GROUP_SALVO, then execute with GO_GROUP_SALVO.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
```

## Notes

SW-P-02 has no concept of levels. Helm and RouteMaster implementations automatically map high-numbered destinations to higher levels based on router size (e.g., router with 32 outputs and 2 levels: outputs 32-63 represent second level). Only destination numbers use this mapping; source numbers are unchanged.

The protocol uses destination offset for multi-level router control. Add offset equal to router output count to reach higher-level destinations.

Message format: `SOM | COMMAND | MESSAGE | CHECKSUM` where SOM=0xFF, CHECKSUM is 7-bit 2's complement sum of COMMAND and MESSAGE fields.

Extended command set (0x7B sub-opcode): monitor row operations for Charisma Ten X series.

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: flow control configuration not stated in source -->
<!-- UNRESOLVED: auth type not stated in source -->
<!-- UNRESOLVED: unsolicited event conditions not fully enumerated -->

## Provenance

```yaml
source_domains:
  - support.rascular.com
  - docs.dataminer.services
  - yumpu.com
  - github.com
retrieved_at: 2026-04-29T23:57:03.635Z
last_checked_at: 2026-04-27T14:52:18.031Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T14:52:18.031Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions have literal source counterparts; transport parameters verified against Pro-Bel SW-P-02 reference."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
