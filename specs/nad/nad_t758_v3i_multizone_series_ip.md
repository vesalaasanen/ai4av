---
spec_id: admin/nad-t758-v3i-multizone-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T758 V3i MultiZone Series Control Spec"
manufacturer: NAD
model_family: "T758 V3i MultiZone Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "T758 V3i MultiZone Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T09:36:17.768Z
last_checked_at: 2026-06-02T22:09:51.420Z
generated_at: 2026-06-02T22:09:51.420Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact number and types of physical inputs specific to T758 V3i not enumerated (source is generic BluOS CI API)"
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "exact physical inputs (HDMI, analog, optical count) specific to T758 V3i not stated — must be discovered at runtime"
  - "firmware version compatibility range not stated"
  - "maximum number of grouped players not stated"
  - "error response format partially described (<error><message>) but full error codes not enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:51.420Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# NAD T758 V3i MultiZone Series Control Spec

## Summary
The NAD T758 V3i MultiZone Series is an AV receiver featuring BluOS network streaming. This spec covers the BluOS Custom Integration API (v1.7), an HTTP-based control interface on TCP port 11000 that accepts HTTP GET requests and returns UTF-8 XML responses. It provides playback control, volume management, play queue manipulation, preset recall, content browsing/searching, player grouping, input selection, Bluetooth mode control, doorbell chime, and player reboot.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact number and types of physical inputs specific to T758 V3i not enumerated (source is generic BluOS CI API) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{player_ip}:11000"
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: reboot command available
  - levelable    # inferred: volume level and mute commands present
  - queryable    # inferred: /Status, /SyncStatus, /Volume queries return state
  - routable     # inferred: input selection commands present
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
        description: "Jump to position in current track (seconds)"
      - name: id
        type: integer
        description: "Track ID in queue to play (used with seek)"
      - name: url
        type: string
        description: "URL-encoded stream URL to play"

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
    label: Skip
    kind: action
    params: []

  - id: back
    label: Back
    kind: action
    params: []

  - id: shuffle
    label: Shuffle
    kind: action
    params:
      - name: state
        type: integer
        description: "0 to disable shuffle, 1 to enable shuffle"

  - id: repeat
    label: Repeat
    kind: action
    params:
      - name: state
        type: integer
        description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

  - id: set_volume
    label: Set Volume
    kind: action
    params:
      - name: level
        type: integer
        description: "Absolute volume level 0-100"
      - name: db
        type: integer
        description: "Relative volume change in dB (positive or negative)"
      - name: abs_db
        type: number
        description: "Absolute volume in dB"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: mute_on
    label: Mute On
    kind: action
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    params: []

  - id: delete_track
    label: Delete Track
    kind: action
    params:
      - name: id
        type: integer
        description: "Track position in play queue to delete"

  - id: move_track
    label: Move Track
    kind: action
    params:
      - name: old
        type: integer
        description: "Current position of track"
      - name: new
        type: integer
        description: "Destination position"

  - id: clear_queue
    label: Clear Queue
    kind: action
    params: []

  - id: save_queue
    label: Save Queue
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
        description: "Preset ID number, or +1 for next, or -1 for previous"

  - id: browse
    label: Browse Content
    kind: action
    params:
      - name: key
        type: string
        description: "Browse key from previous response (URL-encoded)"
      - name: withContextMenuItems
        type: integer
        description: "Set to 1 to include inline context menu"

  - id: search
    label: Search Content
    kind: action
    params:
      - name: key
        type: string
        description: "Search key from browse response"
      - name: q
        type: string
        description: "Search text"

  - id: group_add_slave
    label: Group Add Slave
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

  - id: group_add_slaves
    label: Group Add Multiple Slaves
    kind: action
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses"
      - name: ports
        type: string
        description: "Comma-separated port numbers"

  - id: group_remove_slave
    label: Group Remove Slave
    kind: action
    params:
      - name: slave
        type: string
        description: "IP address of secondary player"
      - name: port
        type: integer
        description: "Port of secondary player"

  - id: group_remove_slaves
    label: Group Remove Multiple Slaves
    kind: action
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses"
      - name: ports
        type: string
        description: "Comma-separated port numbers"

  - id: reboot
    label: Reboot Player
    kind: action
    params:
      - name: yes
        type: string
        description: "Any value to confirm reboot (POST command)"

  - id: doorbell
    label: Doorbell Chime
    kind: action
    params:
      - name: play
        type: integer
        description: "Always 1"

  - id: select_input_active
    label: Select Active Input
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
        description: "1-based index from /Settings?id=capture (firmware v3.8.0-v4.2.0)"

  - id: select_input_type_index
    label: Select Input by Type-Index
    kind: action
    params:
      - name: inputTypeIndex
        type: string
        description: "Format type-index (e.g. spdif-1, analog-1, arc-1). Firmware v4.2.0+"

  - id: bluetooth_mode
    label: Change Bluetooth Mode
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
        description: "Action URL from /Status response <action> element"
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_status
    type: xml
    description: "Returns playback state, track info, volume, shuffle, repeat, etag, and more via /Status"
    fields:
      - name: state
        values: [play, pause, stop, stream, connecting]
      - name: volume
        description: "Volume level 0-100, -1 for fixed"
      - name: mute
        values: ["0", "1"]
      - name: shuffle
        values: ["0", "1"]
      - name: repeat
        values: ["0", "1", "2"]
      - name: artist
      - name: album
      - name: name
        description: "Track title"
      - name: secs
        description: "Seconds elapsed in current track"
      - name: totlen
        description: "Total track length in seconds"
      - name: etag
        description: "Opaque value for long-polling change detection"
      - name: syncStat
        description: "ID indicating /SyncStatus change"

  - id: sync_status
    type: xml
    description: "Returns player info, grouping, volume, model via /SyncStatus"
    fields:
      - name: name
        description: "Player name"
      - name: model
        description: "Player model ID"
      - name: modelName
      - name: brand
      - name: volume
        description: "Volume 0-100, -1 for fixed"
      - name: mute
        values: ["0", "1"]
      - name: group
        description: "Group name"
      - name: etag
      - name: syncStat
      - name: initialized
        values: ["true", "false"]

  - id: volume_status
    type: xml
    description: "Returns current volume level, dB, mute state via /Volume"
    fields:
      - name: volume
        description: "Volume level 0-100"
      - name: db
        description: "Volume in dB"
      - name: mute
        values: ["0", "1"]
      - name: muteVolume
        description: "Unmuted volume level 0-100"
      - name: muteDb
        description: "Unmuted volume in dB"

  - id: playlist_status
    type: xml
    description: "Returns play queue info via /Playlist"
    fields:
      - name: name
        description: "Queue name"
      - name: length
        description: "Number of tracks"
      - name: id
        description: "Unique queue ID"
      - name: modified
        values: ["0", "1"]

  - id: presets_list
    type: xml
    description: "Returns all presets via /Presets"
    fields:
      - name: id
        description: "Preset ID"
      - name: name
        description: "Preset name"
      - name: url
        description: "Preset source URL"
      - name: image
        description: "Image URL"

  - id: doorbell_status
    type: xml
    description: "Returns doorbell chime status"
    fields:
      - name: enable
      - name: volume
      - name: chime
        description: "Chime audio path"
```

## Variables
```yaml
variables:
  - id: volume_level
    type: integer
    min: 0
    max: 100
    description: "Player volume level percentage; -1 means fixed volume"

  - id: volume_db
    type: number
    description: "Player volume in dB"

  - id: mute_state
    type: enum
    values: [muted, unmuted]
    description: "Mute state"

  - id: shuffle_state
    type: enum
    values: [off, on]

  - id: repeat_state
    type: enum
    values: [queue, track, off]
    description: "0=repeat queue, 1=repeat track, 2=repeat off"

  - id: bluetooth_mode
    type: enum
    values: [manual, automatic, guest, disabled]
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
# Long-polling via etag/timeout is the closest mechanism (poll-based, not push)
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
# requirements found in source. Reboot command noted but no safety constraints specified.
```

## Notes
- All API commands are HTTP GET requests (except reboot which is POST) returning UTF-8 XML.
- Default TCP port is 11000 for all BluOS players. CI580 uses ports 11000, 11010, 11020, 11030 for its four nodes.
- Port discovery should be performed via mDNS (services `musc.tcp` and `musp.tcp`) or LSDP (UDP broadcast on port 11430).
- Long-polling is supported on `/Status` and `/SyncStatus` using `timeout` and `etag` parameters. Recommended polling interval for `/Status` is 100 seconds; for `/SyncStatus` is 180 seconds.
- Without long-polling, restrict polling to at most once every 30 seconds.
- Input selection has three methods depending on firmware version: active input via `/Play?url=`, index-based via `/Play?inputIndex=` (firmware v3.8.0–v4.2.0), and type-index via `/Play?inputTypeIndex=` (firmware v4.2.0+).
- Input types for `inputTypeIndex`: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.
- Available inputs must be discovered via `/RadioBrowse?service=Capture` or `/Settings?id=capture&schemaVersion=32`.
- Grouped players: secondary player requests are proxied to the primary player for most commands.
- LSDP discovery protocol uses UDP broadcast on port 11430 with binary packet format (header + message blocks).
- Volume range is typically -80..0 dB but configurable via BluOS Controller app.

<!-- UNRESOLVED: exact physical inputs (HDMI, analog, optical count) specific to T758 V3i not stated — must be discovered at runtime -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: maximum number of grouped players not stated -->
<!-- UNRESOLVED: error response format partially described (<error><message>) but full error codes not enumerated -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T09:36:17.768Z
last_checked_at: 2026-06-02T22:09:51.420Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:51.420Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact number and types of physical inputs specific to T758 V3i not enumerated (source is generic BluOS CI API)"
- "no unsolicited event/notification mechanism described in source"
- "no multi-step sequences explicitly described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "exact physical inputs (HDMI, analog, optical count) specific to T758 V3i not stated — must be discovered at runtime"
- "firmware version compatibility range not stated"
- "maximum number of grouped players not stated"
- "error response format partially described (<error><message>) but full error codes not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
