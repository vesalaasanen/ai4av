---
spec_id: admin/novastar-rx6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Novastar RX6 Control Spec"
manufacturer: Novastar
model_family: RX6
aliases: []
compatible_with:
  manufacturers:
    - Novastar
  models:
    - RX6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - oss.novastar.tech
  - github.com
source_urls:
  - https://oss.novastar.tech/uploads/2025/06/Control-Protocol-for-Multimedia-Playback-Software-Kompass-FX3-Pro-V2.1.3.pdf
  - https://github.com/bitfocus/companion-module-novastar-mediaserver/blob/master/src/actions.js
retrieved_at: 2026-06-02T02:38:06.246Z
last_checked_at: 2026-06-02T08:27:40.706Z
generated_at: 2026-06-02T08:27:40.706Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not confirm whether RX6 hardware runs this software natively or if RX6 is the controller endpoint"
  - "serial port parameters (baud rate, data bits, parity, stop bits) not stated in source"
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no explicit query for current volume in source"
  - "no explicit query for FTB state in source"
  - "no explicit query for sound state in source"
  - "no explicit query for test pattern state in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "serial port parameters (baud rate, data bits, parity, stop bits, flow control) not specified"
  - "no state query commands for volume, FTB, sound, test pattern — only set/enable/disable actions documented"
  - "no error codes or failure response format documented"
  - "maximum number of programs/layers not stated"
  - "whether UDP data reporting port 18961 carries event notifications or a different data format"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:27:40.706Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec action tags verified verbatim in source with matching parameter shapes and transport values; Add/Delete Program notifications are represented in spec Events section. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Novastar RX6 Control Spec

## Summary
Control protocol for Novastar Multimedia Playback Software (Kompass FX3 Pro) V2.1.3. Binary TLV protocol over UDP (port 18959), TCP (port 19958), or serial port. Supports program management, playback control, volume adjustment, FTB (blackout), test patterns, layer management, and timeline control.

<!-- UNRESOLVED: source does not confirm whether RX6 hardware runs this software natively or if RX6 is the controller endpoint -->
<!-- UNRESOLVED: serial port parameters (baud rate, data bits, parity, stop bits) not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 19958
  # UDP control port: 18959 (default, modifiable in software)
  # UDP data reporting port: 18961 (fixed, cannot be modified)
  # TCP port: 19958 (default, modifiable in software)
  # Online/offline detection services: UDP only
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Frame Structure
```yaml
# Binary TLV protocol, little-endian. Frame layout:
#   Head          4 bytes  0x55CC55CC (constant)
#   Packet Type   2 bytes  reserved
#   Protocol Ver  2 bytes  e.g. 0x0101 = v1.1
#   Sequence      2 bytes  incrementing, wraps
#   Content Len   2 bytes  total content length
#   Content:
#     Tag         2 bytes  service/command identifier (LE)
#     Length      2 bytes  value length in bytes (LE)
#     Value[]     N bytes  service data
#
# String fields are UTF-8 with null terminator.
# The Tag field uniquely identifies each command/service.
# Optional preamble Tag 0x00FF (255) with SoftName (64 bytes) may precede the command Tag.
```

## Traits
```yaml
traits:
  - queryable    # detect software, retrieve program list, retrieve layer list
  - levelable    # global volume adjust/increase/decrease, layer sound enable/disable
```

## Actions
```yaml
- id: detect_software
  label: Detect Software
  kind: query
  command: "0x0080"
  description: "Discover multimedia playback software on the network. Response contains hostname, IP, software name, and version."
  params:
    - name: soft_name
      type: string
      description: "Sender software name (UTF-8, 64 bytes). Optional preamble Tag 0x00FF."
  response:
    fields:
      - name: hostname
        type: string
        size: 64
        description: "Media server hostname (UTF-8)"
      - name: ip
        type: string
        size: 16
        description: "Media server IP address"
      - name: soft_name
        type: string
        size: 32
        description: "Multimedia playback software name (UTF-8)"
      - name: soft_version
        type: string
        size: 32
        description: "Multimedia playback software version"

- id: retrieve_program_list
  label: Retrieve Program List
  kind: query
  command: "0x0081"
  description: "Retrieve the full program list from the software."
  params:
    - name: soft_name
      type: string
      description: "Sender software name (UTF-8, 64 bytes). Optional preamble Tag 0x00FF."
  response:
    fields:
      - name: program_count
        type: integer
        size: 4
        description: "Total number of programs"
      - name: program_index
        type: integer
        size: 4
        description: "Program position in the list, starting from 0. Repeats per program."
      - name: program_id
        type: integer
        size: 4
        description: "Program ID, starting from 0. Reorders on restart."
      - name: program_name
        type: string
        size: 128
        description: "Program name (UTF-8). Repeats per program."
      - name: is_empty
        type: integer
        size: 1
        description: "0 = empty program, 1 = non-empty. Repeats per program."

- id: select_program
  label: Select Specified Program
  kind: action
  command: "0x0082 {program_id:u32le}"
  description: "Select a program by its program ID."
  params:
    - name: program_id
      type: integer
      size: 4
      description: "Program ID, starting from 0."

- id: send_program_fade
  label: Send Specified Program to Screen (Fade In/Out)
  kind: action
  command: "0x0083 {program_id:u32le}"
  description: "Send the specified program to screen with fade in/fade out transition."
  params:
    - name: program_id
      type: integer
      size: 4
      description: "Program ID, starting from 0."

- id: send_program_cut
  label: Send Specified Program to Screen (Cut)
  kind: action
  command: "0x0084 {program_id:u32le}"
  description: "Send the specified program to screen with cut transition."
  params:
    - name: program_id
      type: integer
      size: 4
      description: "Program ID, starting from 0."

- id: pause_program_by_id
  label: Pause Specified Program (by ID)
  kind: action
  command: "0x0085 {program_id:u32le}"
  description: "Pause the specified program by its program ID."
  params:
    - name: program_id
      type: integer
      size: 4
      description: "Program ID, starting from 0."

- id: enable_test_pattern
  label: Enable Test Pattern
  kind: action
  command: "0x0102"
  description: "Enable the test pattern display."
  params: []

- id: disable_test_pattern
  label: Disable Test Pattern
  kind: action
  command: "0x0103"
  description: "Disable the test pattern display."
  params: []

- id: enable_ftb
  label: Enable FTB (Blackout)
  kind: action
  command: "0x0104"
  description: "Enable FTB (Fade to Black / blackout)."
  params: []

- id: disable_ftb
  label: Disable FTB (Blackout)
  kind: action
  command: "0x0105"
  description: "Disable FTB (Fade to Black / blackout)."
  params: []

- id: enable_global_sound
  label: Enable Global Sound
  kind: action
  command: "0x0106"
  description: "Unmute global audio output."
  params: []

- id: disable_global_sound
  label: Disable Global Sound
  kind: action
  command: "0x0107"
  description: "Mute global audio output."
  params: []

- id: adjust_global_volume
  label: Adjust Global Volume
  kind: action
  command: "0x0108 {volume:u8}"
  description: "Set global volume to an absolute value."
  params:
    - name: volume
      type: integer
      size: 1
      min: 0
      max: 100
      description: "Volume level (0-100)."

- id: enable_layer_sound
  label: Enable Specified Layer Sound
  kind: action
  command: "0x0109 {layer_index:u32le}"
  description: "Unmute audio for the specified layer."
  params:
    - name: layer_index
      type: integer
      size: 4
      description: "Layer index, starting from 0."

- id: disable_layer_sound
  label: Disable Specified Layer Sound
  kind: action
  command: "0x010A {layer_index:u32le}"
  description: "Mute audio for the specified layer."
  params:
    - name: layer_index
      type: integer
      size: 4
      description: "Layer index, starting from 0."

- id: retrieve_layer_list
  label: Retrieve Layer List
  kind: query
  command: "0x0113"
  description: "Retrieve the full layer list from the software."
  params: []
  response:
    fields:
      - name: layer_id
        type: integer
        size: 4
        description: "Layer index, starting from 0. Repeats per layer."
      - name: layer_name
        type: string
        size: 32
        description: "Layer name (UTF-8). Repeats per layer."

- id: increase_global_volume
  label: Increase Global Volume
  kind: action
  command: "0x0148 {step:u32le}"
  description: "Increase global volume by the specified step."
  params:
    - name: step
      type: integer
      size: 4
      description: "Volume increment (stepping: 1)."

- id: decrease_global_volume
  label: Decrease Global Volume
  kind: action
  command: "0x0149 {step:u32le}"
  description: "Decrease global volume by the specified step."
  params:
    - name: step
      type: integer
      size: 4
      description: "Volume decrement (stepping: 1)."

- id: turn_pages_layer
  label: Turn Pages for PowerPoint/Media Collections in Specified Layer
  kind: action
  command: "0x016C {layer_index:u16le} {operation_type:u8}"
  description: "Navigate pages in PowerPoint/Excel/PDF/Word or media collections on the specified layer."
  params:
    - name: layer_index
      type: integer
      size: 2
      description: "Layer index."
    - name: operation_type
      type: integer
      size: 1
      description: "1 = previous page, 2 = next page."

- id: pause_program_by_number
  label: Pause Specified Program (by Number)
  kind: action
  command: "0x016D {program_number:u32le}"
  description: "Pause the specified program by its program number."
  params:
    - name: program_number
      type: integer
      size: 4
      description: "Program number (index), starting from 0. Does not change on add/delete."

- id: play_program_by_number
  label: Play Specified Program (by Number)
  kind: action
  command: "0x016E {program_number:u32le}"
  description: "Play the specified program by its program number."
  params:
    - name: program_number
      type: integer
      size: 4
      description: "Program number (index), starting from 0. Does not change on add/delete."

- id: stop_program_by_number
  label: Stop Specified Program (by Number)
  kind: action
  command: "0x016F {program_number:u32le}"
  description: "Stop the specified program by its program number."
  params:
    - name: program_number
      type: integer
      size: 4
      description: "Program number (index), starting from 0. Does not change on add/delete."

- id: global_play_pause_stop
  label: Global Play, Pause and Stop
  kind: action
  command: "0x0183 {state:u8}"
  description: "Globally play, pause, or stop all programs."
  params:
    - name: state
      type: integer
      size: 1
      description: "0 = play, 1 = pause, 2 = stop."

- id: play_prev_next_program
  label: Play Previous or Next Program
  kind: action
  command: "0x0184 {state:u8}"
  description: "Navigate to the previous or next program."
  params:
    - name: state
      type: integer
      size: 1
      description: "0 = previous program, 1 = next program."

- id: timeline_control
  label: Pause, Play, or Stop Timeline
  kind: action
  command: "0x0185 {state:u8}"
  description: "Control the timeline playback state."
  params:
    - name: state
      type: integer
      size: 1
      description: "0 = pause timeline, 1 = play timeline, 2 = stop timeline, 3 = play from beginning."

- id: jump_timeline
  label: Jump to Specified Time on Timeline
  kind: action
  command: "0x0186 {time_ms:u32le}"
  description: "Jump to a specified position on the timeline."
  params:
    - name: time_ms
      type: integer
      size: 4
      description: "Target time in milliseconds."
```

## Feedbacks
```yaml
- id: detect_software_response
  type: struct
  tag: "0x0001"
  description: "Response to detect_software query. Contains hostname, IP, software name, and version."
  fields:
    - name: hostname
      type: string
      size: 64
    - name: ip
      type: string
      size: 16
    - name: soft_name
      type: string
      size: 32
    - name: soft_version
      type: string
      size: 32

- id: program_list_response
  type: struct
  tag: "0x0081"
  description: "Response to retrieve_program_list query. Repeats per program."
  fields:
    - name: program_count
      type: integer
      size: 4
    - name: program_index
      type: integer
      size: 4
    - name: program_id
      type: integer
      size: 4
    - name: program_name
      type: string
      size: 128
    - name: is_empty
      type: enum
      values: ["empty", "non-empty"]

- id: select_program_response
  type: ack
  tag: "0x0082"
  description: "Acknowledgement for select_program command."

- id: send_program_fade_response
  type: ack
  tag: "0x0083"
  description: "Acknowledgement for send_program_fade command."

- id: send_program_cut_response
  type: ack
  tag: "0x0084"
  description: "Acknowledgement for send_program_cut command."

- id: pause_program_response
  type: ack
  tag: "0x0085"
  description: "Acknowledgement for pause_program_by_id command."

- id: layer_list_response
  type: struct
  tag: "0x0113"
  description: "Response to retrieve_layer_list query. Repeats per layer."
  fields:
    - name: layer_id
      type: integer
      size: 4
    - name: layer_name
      type: string
      size: 32
```

## Variables
```yaml
- id: global_volume
  type: integer
  min: 0
  max: 100
  description: "Current global volume level (0-100)."
  read_command: null  # UNRESOLVED: no explicit query for current volume in source
  write_command: adjust_global_volume

- id: ftb_state
  type: enum
  values: [enabled, disabled]
  description: "FTB (blackout) state."
  read_command: null  # UNRESOLVED: no explicit query for FTB state in source
  write_command: null  # controlled via enable_ftb / disable_ftb actions

- id: global_sound_state
  type: enum
  values: [enabled, disabled]
  description: "Global sound mute state."
  read_command: null  # UNRESOLVED: no explicit query for sound state in source
  write_command: null  # controlled via enable_global_sound / disable_global_sound actions

- id: test_pattern_state
  type: enum
  values: [enabled, disabled]
  description: "Test pattern display state."
  read_command: null  # UNRESOLVED: no explicit query for test pattern state in source
  write_command: null  # controlled via enable_test_pattern / disable_test_pattern actions
```

## Events
```yaml
- id: program_added_updated
  tag: "0x0005"
  description: "Notification from multimedia playback software when a program is added or updated."
  fields:
    - name: program_count
      type: integer
      size: 4
      description: "Total number of programs."
    - name: program_index
      type: integer
      size: 4
      description: "Program position in the list, starting from 0."
    - name: program_id
      type: integer
      size: 4
      description: "Program ID, starting from 0."
    - name: program_name
      type: string
      size: 128
      description: "Program name (UTF-8)."
    - name: is_empty
      type: integer
      size: 1
      description: "0 = empty, 1 = non-empty."

- id: program_deleted
  tag: "0x0006"
  description: "Notification from multimedia playback software when a program is deleted."
  fields:
    - name: program_id
      type: integer
      size: 4
      description: "Deleted program ID."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
- Binary TLV protocol with little-endian byte order. Frame head is `0x55CC55CC` (4 bytes).
- All commands support UDP, TCP, and serial port transport. Online/offline detection is UDP-only.
- Program ID vs Program Number distinction: Program IDs reorder on software restart; program numbers are stable across add/delete operations. Both start from 0.
- Layer numbers start from 0, displayed top-to-bottom in the software UI.
- Optional preamble TLV with Tag `0x00FF` (255) and SoftName (64 bytes) may precede any command TLV.
- Protocol version in examples is `0x0101` (v1.1). Packet Type field is reserved.
- Example from Detect Software response shows software name "Kompass FX3 Pro" with version "V3.8.0.D2".
- Protocol document version is V2.1.3 (2025-05-27).

<!-- UNRESOLVED: serial port parameters (baud rate, data bits, parity, stop bits, flow control) not specified -->
<!-- UNRESOLVED: no state query commands for volume, FTB, sound, test pattern — only set/enable/disable actions documented -->
<!-- UNRESOLVED: no error codes or failure response format documented -->
<!-- UNRESOLVED: maximum number of programs/layers not stated -->
<!-- UNRESOLVED: whether UDP data reporting port 18961 carries event notifications or a different data format -->

## Provenance

```yaml
source_domains:
  - oss.novastar.tech
  - github.com
source_urls:
  - https://oss.novastar.tech/uploads/2025/06/Control-Protocol-for-Multimedia-Playback-Software-Kompass-FX3-Pro-V2.1.3.pdf
  - https://github.com/bitfocus/companion-module-novastar-mediaserver/blob/master/src/actions.js
retrieved_at: 2026-06-02T02:38:06.246Z
last_checked_at: 2026-06-02T08:27:40.706Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:27:40.706Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec action tags verified verbatim in source with matching parameter shapes and transport values; Add/Delete Program notifications are represented in spec Events section. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not confirm whether RX6 hardware runs this software natively or if RX6 is the controller endpoint"
- "serial port parameters (baud rate, data bits, parity, stop bits) not stated in source"
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no explicit query for current volume in source"
- "no explicit query for FTB state in source"
- "no explicit query for sound state in source"
- "no explicit query for test pattern state in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "serial port parameters (baud rate, data bits, parity, stop bits, flow control) not specified"
- "no state query commands for volume, FTB, sound, test pattern — only set/enable/disable actions documented"
- "no error codes or failure response format documented"
- "maximum number of programs/layers not stated"
- "whether UDP data reporting port 18961 carries event notifications or a different data format"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
