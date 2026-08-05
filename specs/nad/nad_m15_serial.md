---
spec_id: admin/nad-m15
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD M15 BluOS Control Spec"
manufacturer: NAD
model_family: M15
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - M15
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:27:50.909Z
last_checked_at: 2026-07-21T23:32:31.932Z
generated_at: 2026-07-21T23:32:31.932Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/RadioBrowse?service=Capture"
  - "/Settings?id=capture&schemaVersion=32"
  - "RS-232 protocol listed by operator as \"Known protocol\" but source document exclusively describes BluOS HTTP API and LSDP UDP discovery. No serial commands, baud rate, or pinout found in source."
  - "source documents queryable state (volume, mute, mode) but no settable"
  - "source describes long-polling change notifications via etag/syncStat but"
  - "source does not document user-defined multi-step sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing."
  - "firmware version compatibility not stated in source. Source distinguishes \"newer than v3.8.0 and older than v4.2.0\" vs \"v4.2.0 or newer\" only for /Play?inputIndex."
  - "M15-specific quirks (e.g. which input types are physically present) not stated; source describes a generic BluOS player API."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:32:31.932Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions map literally to documented BluOS HTTP endpoints; only two helper query endpoints are unrepresented, well under the short threshold. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# NAD M15 BluOS Control Spec

## Summary
The NAD M15 is a BluOS-enabled streaming component controlled via HTTP GET requests on TCP port 11000. This spec covers the BluOS Custom Integration (CI) API subset: status queries, volume, playback, queue, presets, browsing, grouping, reboot, doorbell, input selection, and Bluetooth mode.

<!-- UNRESOLVED: RS-232 protocol listed by operator as "Known protocol" but source document exclusively describes BluOS HTTP API and LSDP UDP discovery. No serial commands, baud rate, or pinout found in source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from /Status, /SyncStatus, /Volume queries
- levelable  # inferred from volume control commands
- routable   # inferred from input selection / direct input commands
```

## Actions
```yaml
# Each endpoint listed in the source as a distinct URL is one action.
# Parameterized endpoints (e.g. /Volume?level=N) use the {param} template.

- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 100, min 10, max ~60s)
    - name: etag
      type: string
      description: ETag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 180)
    - name: etag
      type: string
      description: ETag from previous /SyncStatus response

- id: volume_set
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0..100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to all grouped players

- id: volume_set_db_absolute
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to all grouped players

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Volume step in dB (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Negative volume step in dB (typical -2)

- id: volume_mute
  label: Mute
  kind: action
  command: "GET /Volume?mute=1&tell_slaves={tell_slaves}"
  params:
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to all grouped players

- id: volume_unmute
  label: Unmute
  kind: action
  command: "GET /Volume?mute=0&tell_slaves={tell_slaves}"
  params:
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to all grouped players

- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position to seek to in the current track
    - name: trackid
      type: integer
      description: Track id in the queue

- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause"
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "GET /Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []

- id: skip
  label: Skip Next
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Skip Back
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle
  label: Shuffle Queue
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = disable, 1 = enable

- id: repeat
  label: Repeat Mode
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off

- id: action_skip
  label: Streaming Radio Skip
  kind: action
  command: "GET /Action?service={service}&skip={id}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: id
      type: string
      description: Track id

- id: action_love
  label: Streaming Radio Love
  kind: action
  command: "GET /Action?service={service}&love={id}"
  params:
    - name: service
      type: string
      description: Service name
    - name: id
      type: string
      description: Track id

- id: action_ban
  label: Streaming Radio Ban
  kind: action
  command: "GET /Action?service={service}&ban={id}"
  params:
    - name: service
      type: string
      description: Service name
    - name: id
      type: string
      description: Track id

- id: playlist
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: If 1, return only top-level queue status
    - name: start
      type: integer
      description: First entry index (0-based) for paginated listing
    - name: end
      type: integer
      description: Last entry index for paginated listing

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in the queue

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Old track position

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: save_queue
  label: Save Queue as Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Name for the saved playlist (URL-encode spaces as +)

- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []

- id: preset_load
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: string
      description: Preset id, +1 for next, -1 for previous

- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse?key={key}&withContextMenuItems={withContextMenuItems}"
  params:
    - name: key
      type: string
      description: Browse key from a prior response (URL-encoded)
    - name: withContextMenuItems
      type: integer
      description: Set to 1 to include inline context menu

- id: browse_search
  label: Search Content
  kind: query
  command: "GET /Browse?key={key}&q={searchText}"
  params:
    - name: key
      type: string
      description: searchKey from a prior response (URL-encoded)
    - name: searchText
      type: string
      description: Search query

- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player (default 11000)
    - name: GroupName
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: remove_slave
  label: Remove One Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1)

- id: doorbell
  label: Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: play_input_capture
  label: Active Input Selection (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response (URL-encoded)

- id: play_input_index
  label: External Input Selection (index, firmware v3.8.0 to v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Index of input (1-based, Bluetooth excluded) from /Settings?id=capture

- id: play_input_type_index
  label: External Input Selection (type-index, firmware v4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Format "type-index" e.g. spdif-2. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1.

- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
- id: volume_level
  type: integer
  description: Volume level 0..100, -1 means fixed volume
- id: volume_db
  type: number
  description: Volume level in dB
- id: mute
  type: enum
  values: [0, 1]
  description: 1 = muted, 0 = unmuted
- id: mute_volume
  type: integer
  description: Pre-mute volume level 0..100 (present when muted)
- id: mute_db
  type: number
  description: Pre-mute volume in dB (present when muted)
- id: shuffle_state
  type: enum
  values: [0, 1]
- id: repeat_state
  type: enum
  values: [0, 1, 2]
  description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: current_track
  type: object
  description: Album, artist, name, title1-3, song position, totlen, secs, quality, service
- id: sync_stat
  type: string
  description: Sync status id matching /Status syncStat
- id: etag
  type: string
  description: Opaque change-detection token for long polling
- id: group
  type: string
  description: Group name (when player is primary)
- id: group_volume
  type: integer
  description: Group volume 0..100 (primary only)
- id: player_id
  type: string
  description: "IP:port identifier from /SyncStatus"
- id: mac
  type: string
  description: Player network interface MAC
- id: schema_version
  type: integer
- id: battery
  type: object
  description: Optional battery info (level, charging, icon)
```

## Variables
```yaml
# UNRESOLVED: source documents queryable state (volume, mute, mode) but no settable
# parameters independent of the discrete actions above. Section retained per template.
```

## Events
```yaml
# UNRESOLVED: source describes long-polling change notifications via etag/syncStat but
# no unsolicited push events are documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document user-defined multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing.
```

## Notes
BluOS uses HTTP GET on port 11000 by default (CI580 uses 11000/11010/11020/11030 for its four streamer nodes). Port discovery recommended via mDNS (`musc.tcp`, `musp.tcp`) or LSDP (UDP broadcast on port 11430, ASCII magic "LSDP", protocol version 1).

Polling rate: cap at one request per 30 seconds without long-polling; do not issue two consecutive long-poll requests for the same resource within 1 second.

Long-polling: `/Status` and `/SyncStatus` accept `timeout` and `etag` parameters; result returns early on etag change or after timeout.

The operator-supplied "Known protocol: RS-232C" does not match this source. The source exclusively documents the BluOS HTTP CI API and LSDP UDP discovery protocol. No serial commands, baud rate, or pinout appear anywhere in the document. If RS-232 control is required for the M15, a separate source document must be supplied.

The `available volume range` (typically -80..0 dB) is configured via BluOS Controller app (Settings -> Player -> Audio); the API clamps requested levels to that range.

Input selection has two request forms: `/Play?inputIndex=N` for firmware between v3.8.0 and v4.2.0 (Bluetooth excluded), and `/Play?inputTypeIndex=type-index` for firmware v4.2.0 or newer. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.

`/AddSlave` and `/RemoveSlave` may be used with either `slave`+`port` (single) or `slaves`+`ports` (comma-separated, multiple). Player grouping: BluOS supports default grouping (covered) and fixed grouping (out of scope per source).

LSDP discovery: UDP broadcast, port 11430, magic "LSDP", version 1. Startup burst: 7 packets at absolute times [0,1,2,3,5,7,10s] + 0-250ms random. Steady-state announce: 57s + 0-6s random. Class IDs: 0x0001 BluOS Player (`musc.tcp`), 0x0002 BluOS Server, 0x0003 multi-zone secondary (`musp.tcp`), 0x0008 BluOS Hub, 0xFFFF query all.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Source distinguishes "newer than v3.8.0 and older than v4.2.0" vs "v4.2.0 or newer" only for /Play?inputIndex. -->
<!-- UNRESOLVED: M15-specific quirks (e.g. which input types are physically present) not stated; source describes a generic BluOS player API. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:27:50.909Z
last_checked_at: 2026-07-21T23:32:31.932Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:32:31.932Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions map literally to documented BluOS HTTP endpoints; only two helper query endpoints are unrepresented, well under the short threshold. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/RadioBrowse?service=Capture"
- "/Settings?id=capture&schemaVersion=32"
- "RS-232 protocol listed by operator as \"Known protocol\" but source document exclusively describes BluOS HTTP API and LSDP UDP discovery. No serial commands, baud rate, or pinout found in source."
- "source documents queryable state (volume, mute, mode) but no settable"
- "source describes long-polling change notifications via etag/syncStat but"
- "source does not document user-defined multi-step sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing."
- "firmware version compatibility not stated in source. Source distinguishes \"newer than v3.8.0 and older than v4.2.0\" vs \"v4.2.0 or newer\" only for /Play?inputIndex."
- "M15-specific quirks (e.g. which input types are physically present) not stated; source describes a generic BluOS player API."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
