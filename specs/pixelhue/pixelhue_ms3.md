---
spec_id: admin/pixelhue-ms3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Pixelhue MS3 Control Spec"
manufacturer: Pixelhue
model_family: MS3
aliases: []
compatible_with:
  manufacturers:
    - Pixelhue
  models:
    - MS3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - en-pixelhue001.oss-us-east-1.aliyuncs.com
source_urls:
  - "https://en-pixelhue001.oss-us-east-1.aliyuncs.com/Specifications/Pilot%20MS3%20Pro%20Multimedia%20Playback%20Software%20Control%20Protocol-V2.5.0.pdf"
retrieved_at: 2026-04-30T04:45:41.485Z
last_checked_at: 2026-04-25T21:43:52.466Z
generated_at: 2026-04-25T21:43:52.466Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial port config (baud rate, data bits, parity, stop bits) not stated in source"
  - "no standalone settable parameters documented separately from actions"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "serial port configuration not documented, though protocol tables list \"UDP/TCP/Serial Port\" as supported"
  - "authentication mechanism not described"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-04-25T21:43:52.466Z
  matched_actions: 29
  action_count: 29
  confidence: low
  summary: "All 29 spec actions matched source commands; all transport parameters verified; complete bidirectional coverage (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Pixelhue MS3 Control Spec

## Summary
Pilot MS3 Pro is a multimedia playback software supporting UDP and TCP control. The software runs on a media server and accepts commands from a central control device. Default UDP port is 18959 (configurable); default TCP port is 19958 (configurable). UDP data reporting uses port 18961 (fixed). The protocol uses a TLV-based binary frame format with little-endian encoding.

<!-- UNRESOLVED: serial port config (baud rate, data bits, parity, stop bits) not stated in source -->

## Transport
```yaml
protocols:
  - udp
  - tcp
addressing:
  port: 18959  # default UDP port; configurable
  tcp_port: 19958  # default TCP port; configurable
  reporting_port: 18961  # UDP data reporting port; fixed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred: program/layer selection commands present
- levelable  # inferred: volume adjustment commands present
- queryable  # inferred: program list and layer list retrieval commands present
```

## Actions
```yaml
- id: add_program
  label: Add Program
  kind: action
  params:
    - name: program_count
      type: integer
      description: Total number of programs
    - name: program_index
      type: integer
      description: Program index in program list (0-based)
    - name: program_id
      type: integer
      description: Program ID (0-based)
    - name: program_name
      type: string
      description: Program name (UTF-8, up to 127 chars)
    - name: is_empty
      type: integer
      description: "0 = empty program, 1 = non-empty"

- id: delete_program
  label: Delete Single Program
  kind: action
  params:
    - name: program_id
      type: integer
      description: Program ID to delete (0-based)

- id: detect_software
  label: Detect Software
  kind: action
  params:
    - name: soft_name
      type: string
      description: Sender software name (UTF-8, up to 63 chars)

- id: retrieve_program_list
  label: Retrieve Program List
  kind: action
  params:
    - name: soft_name
      type: string
      description: Sender software name (UTF-8, up to 63 chars)

- id: send_program_fade
  label: Send Specified Program to Screen (Fade In/Fade Out)
  kind: action
  params:
    - name: soft_name
      type: string
      description: Sender software name (UTF-8, up to 63 chars)
    - name: program_id
      type: integer
      description: Program ID to display (0-based)

- id: send_program_cut
  label: Send Specified Program to Screen (Cut)
  kind: action
  params:
    - name: soft_name
      type: string
      description: Sender software name (UTF-8, up to 63 chars)
    - name: program_id
      type: integer
      description: Program ID to display (0-based)

- id: pause_program
  label: Pause Specified Program
  kind: action
  params:
    - name: program_id
      type: integer
      description: Program ID to pause (0-based)

- id: enable_ftb
  label: Enable FTB
  kind: action
  params: []

- id: disable_ftb
  label: Disable FTB
  kind: action
  params: []

- id: enable_global_sound
  label: Enable Global Sound
  kind: action
  params: []

- id: disable_global_sound
  label: Disable Global Sound
  kind: action
  params: []

- id: adjust_global_volume
  label: Adjust Global Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level (0-100)

- id: enable_layer_sound
  label: Enable Specified Layer Sound
  kind: action
  params:
    - name: layer
      type: integer
      description: Layer index (0-based)

- id: disable_layer_sound
  label: Disable Specified Layer Sound
  kind: action
  params:
    - name: layer
      type: integer
      description: Layer index (0-based)

- id: increase_global_volume
  label: Increase Global Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume step (1)

- id: decrease_global_volume
  label: Decrease Global Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume step (1)

- id: turn_page
  label: Turn Pages for PowerPoint/Excel/PDF/Word/Media Collections
  kind: action
  params:
    - name: layer_index
      type: integer
      description: Layer index
    - name: operation_type
      type: integer
      description: "1 = previous page, 2 = next page"

- id: pause_program_by_number
  label: Pause Specified Program by Program Number
  kind: action
  params:
    - name: program
      type: integer
      description: Program index (0-based)

- id: play_program_by_number
  label: Play Specified Program by Program Number
  kind: action
  params:
    - name: program
      type: integer
      description: Program index (0-based)

- id: stop_program_by_number
  label: Stop Specified Program by Program Number
  kind: action
  params:
    - name: program
      type: integer
      description: Program index (0-based)

- id: global_play_pause_stop
  label: Global Play, Pause and Stop
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Play, 1 = Pause, 2 = Stop"

- id: retrieve_layer_list
  label: Retrieve Layer List
  kind: action
  params: []

- id: enable_test_pattern
  label: Enable Test Pattern
  kind: action
  params: []

- id: disable_test_pattern
  label: Disable Test Pattern
  kind: action
  params: []

- id: play_previous_next_program
  label: Play Previous or Next Program
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = play previous, 1 = play next"

- id: pause_play_stop_timeline
  label: Pause, Play, or Stop Timeline
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Pause, 1 = Play, 2 = Stop, 3 = Play from beginning"

- id: jump_timeline_to_time
  label: Jump to Specified Time on Timeline
  kind: action
  params:
    - name: state
      type: integer
      description: Target time in milliseconds

- id: play_media_on_layer
  label: Play Media on Specific Layer
  kind: action
  params:
    - name: cow_index
      type: integer
      description: Column (program index)
    - name: row_index
      type: integer
      description: Row (layer index)

- id: jump_timeline_to_cue
  label: Jump Timeline to Specific Cue
  kind: action
  params:
    - name: cue_index
      type: integer
      description: Timeline cue index (0-based)
```

## Feedbacks
```yaml
# All commands return a response TLV with a Tag matching the request
# Response format: Tag + Length + Value[] (empty for most commands)
#
# Retrieve Program List response contains:
#   - ProgramCount: total number of programs
#   - ProgramIndex: program ID index (0-based)
#   - ProgramId: program ID (0-based)
#   - ProgramName: program name (UTF-8, up to 127 chars)
#   - IsEmpty: 0=empty, 1=non-empty
#
# Detect Software response contains:
#   - HostName: media server name
#   - Ip: media server IP
#   - SoftName: multimedia playback software name
#   - SoftVersion: software version
#
# Retrieve Layer List response contains:
#   - LayerId: layer index (0-based)
#   - LayerName: layer name (UTF-8, up to 31 chars)
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented separately from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

The protocol frame structure uses a 4-byte head `0x55CC55CC` followed by: Packet Type (2 bytes), Protocol Version (2 bytes), Sequence (2 bytes), Content Length (2 bytes). Content area uses nested TLV (Tag-Length-Value) encoding. Little-endian byte order is used throughout.

Program IDs start from 0 and are reordered on software restart. Program numbers are stable across delete/add operations. Layer numbers start from 0 (top to bottom on display).

UDP data reporting port 18961 is fixed and cannot be changed. Online and offline services only support UDP; other services may use TCP.

<!-- UNRESOLVED: serial port configuration not documented, though protocol tables list "UDP/TCP/Serial Port" as supported -->
<!-- UNRESOLVED: authentication mechanism not described -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - en-pixelhue001.oss-us-east-1.aliyuncs.com
source_urls:
  - "https://en-pixelhue001.oss-us-east-1.aliyuncs.com/Specifications/Pilot%20MS3%20Pro%20Multimedia%20Playback%20Software%20Control%20Protocol-V2.5.0.pdf"
retrieved_at: 2026-04-30T04:45:41.485Z
last_checked_at: 2026-04-25T21:43:52.466Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:43:52.466Z
matched_actions: 29
action_count: 29
confidence: low
summary: "All 29 spec actions matched source commands; all transport parameters verified; complete bidirectional coverage (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial port config (baud rate, data bits, parity, stop bits) not stated in source"
- "no standalone settable parameters documented separately from actions"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "serial port configuration not documented, though protocol tables list \"UDP/TCP/Serial Port\" as supported"
- "authentication mechanism not described"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
