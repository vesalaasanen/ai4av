---
spec_id: admin/nad-nad-av-receiver
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD AV Receiver Control Spec"
manufacturer: NAD
model_family: "NAD AV Receiver"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD AV Receiver"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T09:36:11.630Z
last_checked_at: 2026-06-02T22:09:49.886Z
generated_at: 2026-06-02T22:09:49.886Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific NAD AVR model numbers not stated in source — document covers all BluOS-capable NAD players"
  - "no power on/off command documented; only soft reboot"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing found in source"
  - "no power on/off command documented"
  - "specific NAD AVR model numbers not identified in source"
  - "firmware version compatibility not stated beyond input selection commands"
  - "error response format not fully documented"
  - "maximum concurrent connection limit not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:49.886Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# NAD AV Receiver Control Spec

## Summary
NAD AV receivers running BluOS firmware expose an HTTP-based Custom Integration API (BluOS CI API v1.7). All commands are HTTP GET requests returning UTF-8 encoded XML. The default TCP port is 11000. This spec covers playback control, volume, mute, play queue management, presets, content browsing, player grouping, input selection, Bluetooth mode, doorbell chime, and reboot.

<!-- UNRESOLVED: specific NAD AVR model numbers not stated in source — document covers all BluOS-capable NAD players -->
<!-- UNRESOLVED: no power on/off command documented; only soft reboot -->

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
- queryable    # /Status, /SyncStatus, /Volume, /Playlist, /Presets queries
- levelable    # volume level (0-100), dB control, mute
- routable     # input source selection (analog, optical, HDMI ARC, Bluetooth, etc.)
```

## Actions
```yaml
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
      description: "URL-encoded stream URL to play"

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      description: "If 1, toggle current pause state"

- id: stop
  label: Stop
  kind: action
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  params: []

- id: back
  label: Back to Previous Track
  kind: action
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 to disable, 1 to enable shuffle"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: set_volume
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume 0-100"
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = all grouped players"

- id: set_volume_db
  label: Set Volume dB
  kind: action
  params:
    - name: abs_db
      type: number
      description: "Absolute volume in dB scale"

- id: adjust_volume_db
  label: Adjust Volume dB
  kind: action
  params:
    - name: db
      type: number
      description: "Relative volume change in dB (positive or negative)"
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = all grouped players"

- id: mute_on
  label: Mute On
  kind: action
  params:
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = all grouped players"

- id: mute_off
  label: Mute Off
  kind: action
  params:
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = all grouped players"

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

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []

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
  label: Select Input by URL
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
      description: "1-based index from /Settings?id=capture (Bluetooth excluded). Firmware < v4.2.0"

- id: select_input_type_index
  label: Select Input by Type-Index
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: type-index (e.g. spdif-1, analog-2, arc-1, phono-1). Firmware >= v4.2.0"

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
      description: "Search key from browse response (URL-encoded)"
    - name: q
      type: string
      description: "Search text"

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  params:
    - name: service
      type: string
      description: "Service name (e.g. Slacker)"
    - name: action_param
      type: string
      description: "Action URL from /Status <actions> element (skip, love, ban)"

- id: group_add_slave
  label: Add Player to Group
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

- id: group_add_multiple_slaves
  label: Add Multiple Players to Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses"
    - name: ports
      type: string
      description: "Comma-separated port numbers"

- id: group_remove_slave
  label: Remove Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of player to remove"
    - name: port
      type: integer
      description: "Port of player to remove"

- id: group_remove_multiple_slaves
  label: Remove Multiple Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses"
    - name: ports
      type: string
      description: "Comma-separated port numbers"

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: "Always 1"

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"

- id: reboot
  label: Soft Reboot
  kind: action
  params:
    - name: yes
      type: string
      description: "Any value (POST request)"
```

## Feedbacks
```yaml
- id: playback_status
  type: xml
  description: "Full playback status from /Status including state, volume, track info, shuffle, repeat, mute"

- id: sync_status
  type: xml
  description: "Player and group status from /SyncStatus including volume, mute, model, grouping"

- id: volume_status
  type: xml
  description: "Volume level (0-100), dB, mute state from /Volume"

- id: playlist_status
  type: xml
  description: "Play queue info from /Playlist - name, length, track list"

- id: presets_list
  type: xml
  description: "List of presets from /Presets with id, name, url, image"
```

## Variables
```yaml
- name: volume_level
  type: integer
  min: 0
  max: 100
  description: "Player volume percentage; -1 means fixed volume"

- name: volume_db
  type: number
  description: "Volume level in dB (typically -80..0 range)"

- name: mute
  type: boolean
  description: "Mute state"

- name: shuffle
  type: boolean
  description: "Shuffle state"

- name: repeat
  type: enum
  values: [queue, track, off]
  description: "Repeat mode: 0=queue, 1=track, 2=off"

- name: bluetooth_mode
  type: enum
  values: [manual, automatic, guest, disabled]
  description: "Bluetooth autoplay mode"
```

## Events
```yaml
# Long polling on /Status and /SyncStatus acts as an event mechanism.
# /Status?timeout=100&etag=<etag> returns only when state changes or timeout.
# /SyncStatus?timeout=180&etag=<etag> returns only when sync state changes or timeout.
# Recommended polling: /Status at 100s intervals, /SyncStatus at 180s intervals.
# Minimum interval between consecutive requests for same resource: 1 second.
# Non-long-polling clients: max 1 request per 30 seconds.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing found in source
```

## Notes
- All requests are HTTP GET (except /reboot which is POST with body `yes=1`).
- Responses are UTF-8 encoded XML.
- The CI580 multi-zone player uses ports 11000, 11010, 11020, 11030 for its four streamer nodes.
- Port discovery should use mDNS (services `musc.tcp` and `musp.tcp`) or LSDP (UDP broadcast on port 11430).
- Long polling uses `etag` from previous response and `timeout` parameter to reduce polling overhead.
- Grouped players proxy many requests to the primary player automatically.
- Input selection has three methods: by URL (`/Play?url=`), by index (`/Play?inputIndex=` for firmware < v4.2.0), and by type-index (`/Play?inputTypeIndex=` for firmware >= v4.2.0).
- Image URLs starting with `/Artwork` may redirect; add `followRedirects=1` parameter to avoid redirects.
- Volume range is typically -80..0 dB and configurable via BluOS Controller app.
- `/Status` response `secs` element is not included in etag calculation; clients must track playback position locally.

<!-- UNRESOLVED: no power on/off command documented -->
<!-- UNRESOLVED: specific NAD AVR model numbers not identified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated beyond input selection commands -->
<!-- UNRESOLVED: error response format not fully documented -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T09:36:11.630Z
last_checked_at: 2026-06-02T22:09:49.886Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:49.886Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific NAD AVR model numbers not stated in source — document covers all BluOS-capable NAD players"
- "no power on/off command documented; only soft reboot"
- "no explicit multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing found in source"
- "no power on/off command documented"
- "specific NAD AVR model numbers not identified in source"
- "firmware version compatibility not stated beyond input selection commands"
- "error response format not fully documented"
- "maximum concurrent connection limit not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
