---
spec_id: admin/nad-t758-with-volume-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T758 (with Volume) Series Control Spec"
manufacturer: NAD
model_family: "T758 (with Volume) Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "T758 (with Volume) Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-01T00:18:29.488Z
last_checked_at: 2026-04-25T21:15:02.288Z
generated_at: 2026-04-25T21:15:02.288Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:15:02.288Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions map to documented BluOS API endpoints with correct transport (HTTP GET on port 11000, POST for reboot) and no hallucinated commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# NAD T758 (with Volume) Series Control Spec

## Summary
The NAD T758 (with Volume) Series is an AV receiver controllable via the BluOS Custom Integration API (v1.7). The API uses HTTP GET requests over TCP to port 11000, with UTF-8 XML responses. Commands cover playback control, volume management, play queue manipulation, presets, content browsing, player grouping, input selection, and system reboot.

<!-- UNRESOLVED: exact firmware versions compatible with this API version not stated -->
<!-- UNRESOLVED: RS-232 or other serial control not covered in this source -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable   # /Status, /SyncStatus, /Volume queries return device state
  - levelable   # volume control via level (0-100), dB (absolute/relative), and mute
  - routable    # input selection via /Play?url=, /Play?inputIndex=, /Play?inputTypeIndex=
```

## Actions
```yaml
actions:
  - id: play
    label: Play
    kind: action
    params:
      - name: seek
        type: integer
        description: "Jump to position in seconds within current track"
      - name: id
        type: integer
        description: "Track ID in queue to play"
      - name: url
        type: string
        description: "URL-encoded stream URL or input capture URL to play"

  - id: pause
    label: Pause
    kind: action
    params:
      - name: toggle
        type: integer
        description: "Set to 1 to toggle current pause state"

  - id: stop
    label: Stop
    kind: action
    params: []

  - id: skip
    label: Skip (Next Track)
    kind: action
    params: []

  - id: back
    label: Back (Previous Track)
    kind: action
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    params:
      - name: level
        type: integer
        description: "Absolute volume level 0-100"
      - name: db
        type: integer
        description: "Relative dB change (positive or negative)"
      - name: abs_db
        type: integer
        description: "Absolute volume in dB"
      - name: tell_slaves
        type: integer
        description: "For grouped players: 0=local only, 1=all group members"

  - id: mute_on
    label: Mute On
    kind: action
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    params: []

  - id: shuffle
    label: Set Shuffle
    kind: action
    params:
      - name: state
        type: integer
        description: "0=off, 1=on"

  - id: repeat
    label: Set Repeat
    kind: action
    params:
      - name: state
        type: integer
        description: "0=repeat queue, 1=repeat track, 2=off"

  - id: clear_queue
    label: Clear Play Queue
    kind: action
    params: []

  - id: delete_track
    label: Delete Track from Queue
    kind: action
    params:
      - name: id
        type: integer
        description: "Track position in queue"

  - id: move_track
    label: Move Track in Queue
    kind: action
    params:
      - name: old
        type: integer
        description: "Current position of track"
      - name: new
        type: integer
        description: "Destination position"

  - id: save_queue
    label: Save Queue as Playlist
    kind: action
    params:
      - name: name
        type: string
        description: "Name for the saved playlist"

  - id: load_preset
    label: Load Preset
    kind: action
    params:
      - name: id
        type: string
        description: "Preset ID number, +1 for next, -1 for previous"

  - id: select_input
    label: Select Input (Active)
    kind: action
    params:
      - name: url
        type: string
        description: "URL value from /RadioBrowse?service=Capture response"

  - id: select_input_index
    label: Select Input by Index
    kind: action
    params:
      - name: inputIndex
        type: integer
        description: "1-based index from /Settings?id=capture (firmware 3.8.0-4.2.0)"

  - id: select_input_type_index
    label: Select Input by Type-Index
    kind: action
    params:
      - name: inputTypeIndex
        type: string
        description: "Format type-index, e.g. spdif-1, analog-1, arc-1 (firmware 4.2.0+)"

  - id: add_slave
    label: Group Player
    kind: action
    params:
      - name: slave
        type: string
        description: "IP address of secondary player"
      - name: port
        type: integer
        description: "Port of secondary player"
      - name: group
        type: string
        description: "Optional group name"

  - id: remove_slave
    label: Ungroup Player
    kind: action
    params:
      - name: slave
        type: string
        description: "IP address of player to remove"
      - name: port
        type: integer
        description: "Port of player to remove"

  - id: reboot
    label: Soft Reboot
    kind: action
    params: []
    note: "POST /reboot with yes=1"

  - id: doorbell
    label: Doorbell Chime
    kind: action
    params:
      - name: play
        type: integer
        description: "Always 1"

  - id: bluetooth_mode
    label: Set Bluetooth Mode
    kind: action
    params:
      - name: bluetoothAutoplay
        type: integer
        description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"

  - id: streaming_action
    label: Streaming Radio Action
    kind: action
    params:
      - name: service
        type: string
        description: "Service name"
      - name: action
        type: string
        description: "Action URL from /Status <action> element (skip, back, love, ban)"

  - id: browse
    label: Browse Content
    kind: action
    params:
      - name: key
        type: string
        description: "Browse key from previous response"
      - name: q
        type: string
        description: "Search query string"
      - name: withContextMenuItems
        type: integer
        description: "Set to 1 to include inline context menu"
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_status
    type: xml
    description: "/Status response with state, volume, track info, etag"

  - id: sync_status
    type: xml
    description: "/SyncStatus response with player info, grouping, volume"

  - id: volume_state
    type: xml
    description: "/Volume response with level, dB, mute state, etag"

  - id: player_state
    type: enum
    values: [play, pause, stop, stream, connecting]
    description: "Current playback state from /Status or /Play response"

  - id: mute_state
    type: enum
    values: ["0", "1"]
    description: "1=muted, 0=unmuted"

  - id: shuffle_state
    type: enum
    values: ["0", "1"]
    description: "0=off, 1=on"

  - id: repeat_state
    type: enum
    values: ["0", "1", "2"]
    description: "0=repeat queue, 1=repeat track, 2=off"

  - id: volume_level
    type: integer
    description: "Volume level 0-100, or -1 for fixed volume"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    description: "Player volume level percentage"

  - id: volume_db
    type: number
    description: "Volume level in dB"

  - id: shuffle
    type: boolean
    description: "Shuffle state"

  - id: repeat
    type: integer
    description: "Repeat mode: 0=queue, 1=track, 2=off"
```

## Events
```yaml
# Long-polling mechanism via /Status?timeout=&etag= and /SyncStatus?timeout=&etag=
# returns updated XML when state changes or on timeout. No unsolicited push events.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source. Reboot command has no confirmation requirement documented.
```

## Notes
- All commands are HTTP GET requests except `/reboot` which is a POST.
- Responses are UTF-8 encoded XML.
- Long polling is supported via `timeout` and `etag` parameters on `/Status` and `/SyncStatus`. Recommended polling intervals: 100s for `/Status`, 180s for `/SyncStatus`.
- Without long polling, clients should poll at most once every 30 seconds. With long polling, consecutive requests must be at least 1 second apart.
- Volume range is typically -80..0 dB, configurable via BluOS Controller app.
- Input selection has three methods depending on firmware version: active URL-based (`/Play?url=`), index-based (`/Play?inputIndex=`, firmware 3.8–4.2), and type-index-based (`/Play?inputTypeIndex=`, firmware 4.2+).
- Player grouping uses primary/secondary terminology. Requests to secondary players are proxied to the primary.
- The LSDP discovery protocol uses UDP broadcast on port 11430 as an mDNS alternative.

<!-- UNRESOLVED: exact NAD T758-specific input types not enumerated in this BluOS CI API doc -->
<!-- UNRESOLVED: power on/off commands not present — device may need CEC or IR for power control -->
<!-- UNRESOLVED: maximum number of grouped players not stated -->
<!-- UNRESOLVED: error response codes and handling not fully documented -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-01T00:18:29.488Z
last_checked_at: 2026-04-25T21:15:02.288Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:15:02.288Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions map to documented BluOS API endpoints with correct transport (HTTP GET on port 11000, POST for reboot) and no hallucinated commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
