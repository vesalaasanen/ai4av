---
schema_version: ai4av-public-spec-v1
device_id: blackmagic-design/blackmagic-smart-videohub
entity_id: blackmagic_design_videohub
spec_id: admin/blackmagic_design-videohub
revision: 1
author: admin
title: "Blackmagic Design Videohub Control Spec"
status: published
manufacturer: "Blackmagic Design"
manufacturer_key: blackmagic-design
model_family: "Blackmagic Smart Videohub"
aliases: []
compatible_with:
  manufacturers:
    - "Blackmagic Design"
  models:
    - "Blackmagic Smart Videohub"
    - "Blackmagic Videohub (family)"
  firmware: "\"4.9.1\" # version stated in source (Videohub 4.9.1 software)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: blackmagic_design_videohub_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T11:24:40.262Z
retrieved_at: 2026-04-26T11:24:40.262Z
last_checked_at: 2026-04-26T11:24:40.262Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"4.9.1\" # version stated in source (Videohub 4.9.1 software)"
protocol_coverage: []
known_gaps:
  - "PROTOCOL PREAMBLE"
  - "VIDEOHUB DEVICE"
  - "VIDEO INPUT STATUS"
  - "VIDEO OUTPUT STATUS"
  - "SERIAL PORT STATUS"
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T11:24:40.262Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions match source commands with correct parameters and transport details verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blackmagic Design Videohub Control Spec

## Summary

The Blackmagic Videohub Ethernet Protocol is a text-based TCP/IP control protocol accessed on port 9990. It controls Videohub video routing devices, allowing clients to read and write input-to-output routes, port labels, lock states, and serial port directions. The server pushes full state dumps on connection and delta updates on every change.

<!-- UNRESOLVED: specific model variants (e.g., Universal Videohub, Workgroup Videohub) not enumerated in source beyond Smart Videohub example -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9990
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
- powerable      # UNRESOLVED: power commands not described in source
- routable       # evidenced by VIDEO OUTPUT ROUTING, SERIAL PORT ROUTING, etc.
- queryable      # evidenced by status dump requests and PING command
- lockable       # evidenced by VIDEO OUTPUT LOCKS, SERIAL PORT LOCKS blocks
- labelable      # evidenced by INPUT LABELS, OUTPUT LABELS, SERIAL PORT LABELS blocks
```

## Actions
```yaml
- id: set_video_output_routing
  label: Set Video Output Routing
  kind: action
  params:
    - name: output
      type: integer
      description: Output port index (0-based)
    - name: input
      type: integer
      description: Input port index to route to output (0-based)
  request_format: "VIDEO OUTPUT ROUTING:\n{output} {input}\n"
  response: "ACK on success, NAK on failure, followed by status update block"

- id: set_monitoring_output_routing
  label: Set Monitoring Output Routing
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
  request_format: "VIDEO MONITORING OUTPUT ROUTING:\n{output} {input}\n"

- id: set_serial_port_routing
  label: Set Serial Port Routing
  kind: action
  params:
    - name: port
      type: integer
    - name: input
      type: integer
  request_format: "SERIAL PORT ROUTING:\n{port} {input}\n"

- id: lock_port
  label: Lock Port
  kind: action
  params:
    - name: port_type
      type: string
      enum: [video_output, monitoring_output, serial_port, processing_unit, frame_buffer]
    - name: port_index
      type: integer
  request_format: "{PORT_TYPE} LOCKS:\n{port_index} O\n"
  note: "O = lock for current client IP; F = force unlock a port locked by another client; U = unlock"

- id: set_input_label
  label: Set Input Label
  kind: action
  params:
    - name: input
      type: integer
    - name: label
      type: string
  request_format: "INPUT LABELS:\n{input} {label}\n"

- id: set_output_label
  label: Set Output Label
  kind: action
  params:
    - name: output
      type: integer
    - name: label
      type: string
  request_format: "OUTPUT LABELS:\n{output} {label}\n"

- id: set_serial_port_direction
  label: Set Serial Port Direction
  kind: action
  params:
    - name: port
      type: integer
    - name: direction
      type: string
      enum: [control, slave, auto]
      description: "control = In (Workstation), slave = Out (Deck), auto = Automatic"
  request_format: "SERIAL PORT DIRECTIONS:\n{port} {direction}\n"

- id: request_status_dump
  label: Request Status Dump
  kind: action
  params:
    - name: block_header
      type: string
      description: Block header to request (e.g., "OUTPUT LABELS", "VIDEO OUTPUT ROUTING")
  request_format: "{block_header}\n\n"
  response: "ACK followed by full block contents"

- id: ping
  label: Ping
  kind: action
  params: []
  request_format: "PING:\n"
  response: "ACK"
- id: set_monitoring_output_label
  label: Set Monitoring Output Label
  kind: action
  params:
    - name: output
      type: integer
      description: Monitoring output port index (0-based)
    - name: label
      type: string
      description: Label text to assign
  request_format: "MONITORING OUTPUT LABELS:\n{output} {label}\n"

- id: set_serial_port_label
  label: Set Serial Port Label
  kind: action
  params:
    - name: port
      type: integer
      description: Serial port index (0-based)
    - name: label
      type: string
      description: Label text to assign
  request_format: "SERIAL PORT LABELS:\n{port} {label}\n"

- id: set_processing_unit_routing
  label: Set Processing Unit Routing
  kind: action
  params:
    - name: unit
      type: integer
      description: Processing unit index (0-based); Workgroup Videohub only
    - name: input
      type: integer
      description: Input port index to route to processing unit (0-based)
  request_format: "PROCESSING UNIT ROUTING:\n{unit} {input}\n"

- id: set_frame_buffer_routing
  label: Set Frame Buffer Routing
  kind: action
  params:
    - name: buffer
      type: integer
      description: Frame buffer index (0-based); Workgroup Videohub only
    - name: input
      type: integer
      description: Input port index to route to frame buffer (0-based)
  request_format: "FRAME BUFFER ROUTING:\n{buffer} {input}\n"

- id: set_frame_label
  label: Set Frame Label
  kind: action
  params:
    - name: frame
      type: integer
      description: Frame index (0-based); Workgroup Videohub only
    - name: label
      type: string
      description: Label text to assign
  request_format: "FRAME LABELS:\n{frame} {label}\n"
```

## Feedbacks
```yaml
- id: protocol_preamble
  type: block
  description: First block sent on every connection, contains protocol version
  fields:
    - name: Version
      type: string
      example: "2.3"

- id: device_info
  type: block
  description: Device presence and model information
  fields:
    - name: Device present
      type: enum
      values: [true, false, "needs update"]
    - name: Model name
      type: string
    - name: Video inputs
      type: integer
    - name: Video outputs
      type: integer
    - name: Serial ports
      type: integer

- id: video_output_routing
  type: block
  description: Maps each output index to an input index
  fields:
    - name: "{output_index}"
      type: integer
      description: Input index routed to this output

- id: video_output_locks
  type: block
  description: Lock status of each output port
  fields:
    - name: "{port_index}"
      type: enum
      values: [O, L, U]
      description: "O=owned by current client, L=locked by another client, U=unlocked"

- id: ack
  type: enum
  values: [ACK, NAK]
  description: Server acknowledgement of client commands

- id: status_update
  type: block
  description: Asynchronous push of changed state; format mirrors request blocks
```

## Variables
```yaml
# Port labels are settable state tracked by the server as Variables:
- id: input_label
  label: Input Label
  type: string
  indices:
    - name: input
      type: integer

- id: output_label
  label: Output Label
  type: string
  indices:
    - name: output
      type: integer

- id: serial_port_label
  label: Serial Port Label
  type: string
  indices:
    - name: port
      type: integer

- id: serial_port_direction
  label: Serial Port Direction
  type: string
  enum: [control, slave, auto]
  indices:
    - name: port
      type: integer

- id: video_input_status
  label: Video Input Status
  type: string
  enum: [None, BNC, Optical]
  indices:
    - name: input
      type: integer
  description: Physical connector type; Universal Videohub only

- id: video_output_status
  label: Video Output Status
  type: string
  enum: [None, BNC, Optical]
  indices:
    - name: output
      type: integer
  description: Physical connector type; Universal Videohub only

- id: serial_port_status
  label: Serial Port Status
  type: string
  enum: [None, RS422]
  indices:
    - name: port
      type: integer
  description: Physical connector type; Universal Videohub only
```

## Events
```yaml
# The Videohub Server pushes the following unsolicited events:
- id: route_change
  type: block
  description: Pushed when any routing, label, or lock changes; contains only changed items
  example: "VIDEO OUTPUT ROUTING:\n7 2\n"

- id: device_change
  type: block
  description: Pushed when a new Videohub is attached; all blocks except preamble are resent
  note: "Indicates device changed; client should refresh full state cache"

- id: hardware_status_change
  type: block
  description: Pushed when a card is plugged or removed on Universal Videohub
  blocks: [VIDEO INPUT STATUS, VIDEO OUTPUT STATUS, SERIAL PORT STATUS]
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Force unlock (F) overrides a lock held by another client; use with caution to avoid conflicting control"
    source: "Protocol description of F override character"
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source beyond port locking behavior
```

## Notes

The protocol is entirely text-based with line-oriented blocks. Each block has an all-caps header ending in a colon, followed by key-value lines, and terminated by a blank line. Clients should ignore unrecognized block headers and unrecognized lines within known blocks to remain resilient to future protocol extensions.

Ports are numbered 0-based in the protocol, corresponding to 1-based numbering on the chassis.

The server sends the full state dump on connection, then only delta updates thereafter. A client can request a full dump of any block by sending its header with a trailing blank line.

Routing changes are acknowledged with `ACK` or `NAK` and confirmed via the subsequent push update — clients must not assume the route was applied until the server confirms it.

<!-- UNRESOLVED: power on/off commands not described in source -->
<!-- UNRESOLVED: compatible_with.models limited to Smart Videohub example; other Videohub models (Universal, Workgroup) confirmed present by protocol blocks but not explicitly enumerated -->
<!-- UNRESOLVED: firmware compatibility range not stated beyond Videohub 4.9.1 -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: blackmagic_design_videohub_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T11:24:40.262Z
retrieved_at: 2026-04-26T11:24:40.262Z
last_checked_at: 2026-04-26T11:24:40.262Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:24:40.262Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions match source commands with correct parameters and transport details verified."
```

## Known Gaps

```yaml
- "PROTOCOL PREAMBLE"
- "VIDEOHUB DEVICE"
- "VIDEO INPUT STATUS"
- "VIDEO OUTPUT STATUS"
- "SERIAL PORT STATUS"
```
