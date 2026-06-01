---
spec_id: admin/vaddio-pcc-premier
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio PCC Premier Control Spec"
manufacturer: Vaddio
model_family: "PCC Premier"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "PCC Premier"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-19T17:13:32.099Z
generated_at: 2026-05-19T17:13:32.099Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:13:32.099Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched source command documentation; transport parameters verified; complete semantic-id mapping confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Vaddio PCC Premier Control Spec

## Summary
The Vaddio PCC Premier is a camera controller supporting up to 16 cameras over two Control A/B buses. Control is available via RS-232 serial and Telnet over Ethernet. The serial interface uses 9600 bps 8N1; Telnet runs on TCP port 23 and requires administrator login.

<!-- UNRESOLVED: HDMI streaming configuration beyond RTSP port 554 info not part of control API -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # default Telnet port; source explicitly states this
auth:
  type: telnet  # source states Telnet sessions require administrator account login
```

## Traits
```yaml
# UNRESOLVED: powerable, routable, queryable all suggested by commands present
# but no explicit power-on/off beyond standby toggle found in source
```

## Actions
```yaml
- id: camera_focus
  label: Camera Focus
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1-16)
    - name: direction
      type: enum
      values: [near, far, stop]
    - name: speed
      type: integer
      description: Optional speed 1-8 for near/far
    - name: mode
      type: enum
      values: [auto, manual, get]
      description: Focus mode; get returns current mode

- id: camera_home
  label: Camera Home
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1-16)

- id: camera_pan
  label: Camera Pan
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1-16)
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      description: Optional speed 1-24 (default 12)

- id: camera_tilt
  label: Camera Tilt
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1-16)
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      description: Optional speed 1-20 (default 10)

- id: camera_zoom
  label: Camera Zoom
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1-16)
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      description: Optional speed 1-7 (default 3)

- id: video_mute_pattern
  label: Video Mute Pattern
  kind: action
  params:
    - name: action
      type: enum
      values: [get, set]
    - name: pattern
      type: enum
      values: [color_bars, black_screen]
      description: Required when action is set

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: destination_ip
      type: string
    - name: count
      type: integer
      description: Optional packet count (default 5)
    - name: size
      type: integer
      description: Optional packet size in bytes (default 56)

- id: network_settings_get
  label: Network Settings Get
  kind: action
  params: []

- id: streaming_info_dump
  label: Streaming Info Dump
  kind: action
  params: []

- id: system_standby
  label: System Standby
  kind: action
  params:
    - name: action
      type: enum
      values: [get, on, off, toggle]

- id: system_reboot
  label: System Reboot
  kind: action
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds

- id: system_factory_reset
  label: System Factory Reset
  kind: action
  params:
    - name: action
      type: enum
      values: [get, on, off]

- id: sleep
  label: Sleep
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Integer 1-10000

- id: help
  label: Help
  kind: action
  params: []

- id: history
  label: History
  kind: action
  params:
    - name: limit
      type: integer
      description: Maximum number of commands to return

- id: version
  label: Version
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: feedbacks are implied by get-style query commands
# but source describes responses as free-form ASCII text, not structured enums
```

## Variables
```yaml
# UNRESOLVED: no discrete settable variables beyond action params documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Cameras 1-8 on Control A bus; cameras 9-16 on Control B bus. Command syntax uses `>` prompt prefix and `OK` / `ERROR` responses. Serial cables up to 500 ft (152.4 m) with Cat-5e or better 568B termination. Telnet sessions require administrator login; source does not specify credential format. RTSP streaming on port 554 typical; `streaming info dump` returns per-camera stream metadata. Power-on sequencing not documented. Factory reset has software and hardware independent flags.
<!-- UNRESOLVED: auth credential format not stated in source -->
<!-- UNRESOLVED: VLAN / network config commands not in source -->
<!-- UNRESOLVED: GPIO or relay control not in source -->
<!-- UNRESOLVED: video input routing beyond mute pattern not in source -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-19T17:13:32.099Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:13:32.099Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched source command documentation; transport parameters verified; complete semantic-id mapping confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
