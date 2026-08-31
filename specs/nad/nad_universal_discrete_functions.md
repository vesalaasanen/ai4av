---
spec_id: admin/nad-universal-discrete-functions
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD BluOS Universal Discrete Functions Control Spec"
manufacturer: NAD
model_family: "NAD BluOS Players"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD BluOS Players"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-20T18:01:06.887Z
last_checked_at: 2026-08-20T22:16:13.077Z
generated_at: 2026-08-20T22:16:13.077Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list of supported NAD models not enumerated in source; spec applies to the BluOS player family generically"
  - "no explicit power on/off commands; soft reboot only"
  - "no explicit multi-step sequences documented in source."
  - "source does not document safety warnings, interlocks, or power-on sequencing."
  - "LSDP discovery details not transcribed (binary packet structure); port 11430 only noted as UDP discovery reference."
  - "list of supported NAD models not enumerated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-20T22:16:13.077Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions match source HTTP endpoint paths verbatim; transport port 11000 and base_url form are documented in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-20
---

# NAD BluOS Universal Discrete Functions Control Spec

## Summary
This spec covers the BluOS Custom Integration API — Universal Discrete Functions for NAD BluOS streaming players. The interface is HTTP over TCP, with XML responses, on port 11000 (11000/11010/11020/11030 for the CI580 multi-node chassis). Discrete commands include playback control, volume, mute, play queue management, presets, content browsing, player grouping, reboot, doorbell chime, direct input selection, and Bluetooth mode.

<!-- UNRESOLVED: list of supported NAD models not enumerated in source; spec applies to the BluOS player family generically -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:<port>"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # UNRESOLVED: no explicit power on/off commands; soft reboot only
# - levelable       # inferred: volume set/up/down/dB commands present
# - queryable       # inferred: /Status, /SyncStatus, /Volume, /Playlist queries present
# - routable        # inferred: input selection via /Play?url= and /Play?inputTypeIndex= present
```

## Actions
```yaml
# CRITICAL - coverage rule applies. Enumerate every distinct endpoint documented in source.
# Each endpoint is documented as a separate row in the source; treat as one action.
# Parameter ranges (e.g. level 0..100, db delta) are collapsed into one action per endpoint.

# --- 2. Status Queries ---
- id: status_query
  label: Playback Status
  kind: query
  command: "/Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 60-100; never faster than 10)
    - name: etag
      type: string
      description: ETag from previous response

# --- 3. Volume Control ---
- id: volume_set
  label: Set Volume (percent)
  kind: action
  command: "/Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Volume 0..100
    - name: tell_slaves
      type: integer
      description: 0 = only selected player; 1 = all players in group

- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: volume_delta_db
  label: Relative Volume Change (dB)
  kind: action
  command: "/Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Positive or negative dB delta
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db={db_value}"
  params:
    - name: db
      type: number
      description: Positive dB step (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-{db_value}"
  params:
    - name: db
      type: number
      description: Magnitude of dB step (typical 2)

- id: mute_on
  label: Mute On
  kind: action
  command: "/Volume?mute=1"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "/Volume?mute=0"
  params: []

# --- 4. Playback Control ---
- id: play
  label: Play
  kind: action
  command: "/Play"
  params: []

- id: play_seek
  label: Play With Seek
  kind: action
  command: "/Play?seek={seconds}"
  params:
    - name: seek
      type: integer
      description: Seek position in seconds

- id: play_seek_id
  label: Play With Seek and Track ID
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Seek position in seconds
    - name: id
      type: integer
      description: Track number in queue (1-based)

- id: play_url
  label: Play Stream URL
  kind: action
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: url
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "/Pause"
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "/Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "/Stop"
  params: []

- id: skip
  label: Skip Next Track
  kind: action
  command: "/Skip"
  params: []

- id: back
  label: Skip Previous Track
  kind: action
  command: "/Back"
  params: []

- id: shuffle
  label: Shuffle On
  kind: action
  command: "/Shuffle?state=1"
  params: []

- id: shuffle_off
  label: Shuffle Off
  kind: action
  command: "/Shuffle?state=0"
  params: []

- id: repeat_queue
  label: Repeat Queue
  kind: action
  command: "/Repeat?state=0"
  params: []

- id: repeat_track
  label: Repeat Track
  kind: action
  command: "/Repeat?state=1"
  params: []

- id: repeat_off
  label: Repeat Off
  kind: action
  command: "/Repeat?state=2"
  params: []

- id: action_streaming
  label: Streaming Radio Action
  kind: action
  command: "/Action?service={service-name}&{action-URL}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker, Radio Paradise, Amazon Music)
    - name: action_url
      type: string
      description: URL from <action> element in /Status response

# --- 5. Play Queue Management ---
- id: playlist_list
  label: List Playlist
  kind: query
  command: "/Playlist"
  params: []

- id: playlist_status
  label: Playlist Status
  kind: query
  command: "/Playlist?length=1"
  params: []

- id: playlist_paginate
  label: Playlist Paginate
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First entry (0-based)
    - name: end
      type: integer
      description: Last entry

- id: playlist_delete
  label: Delete Track From Queue
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track id to delete

- id: playlist_move
  label: Move Track In Queue
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New position
    - name: old
      type: integer
      description: Old position

- id: playlist_clear
  label: Clear Queue
  kind: action
  command: "/Clear"
  params: []

- id: playlist_save
  label: Save Queue As Playlist
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: Playlist name

# --- 6. Presets ---
- id: presets_list
  label: List Presets
  kind: query
  command: "/Presets"
  params: []

- id: preset_load
  label: Load Preset By ID
  kind: action
  command: "/Preset?id={presetId}"
  params:
    - name: id
      type: integer
      description: Preset id from /Presets

- id: preset_next
  label: Load Next Preset
  kind: action
  command: "/Preset?id=+1"
  params: []

- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "/Preset?id=-1"
  params: []

# --- 7. Content Browsing and Searching ---
- id: browse_top
  label: Top Level Browse
  kind: query
  command: "/Browse"
  params: []

- id: browse
  label: Browse By Key
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key
      type: string
      description: URL-encoded key from previous response

- id: browse_with_context
  label: Browse With Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded key from previous response

- id: browse_search
  label: Search Music Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from previous response
    - name: q
      type: string
      description: Search string

# --- 8. Player Grouping ---
- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port
    - name: group
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated IPs
    - name: ports
      type: string
      description: Comma-separated ports

- id: remove_slave
  label: Ungroup One Player
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port

- id: remove_slaves
  label: Ungroup Multiple Players
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated IPs
    - name: ports
      type: string
      description: Comma-separated ports

- id: sync_status
  label: Player and Group Sync Status
  kind: query
  command: "/SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Polling interval (recommended 180)
    - name: etag
      type: string
      description: ETag from previous response

# --- 9. Player Reboot ---
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot?yes=1"
  params: []

# --- 10. Doorbell Chimes ---
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []

# --- 11. Direct Input ---
- id: play_active_input
  label: Active Input Selection
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL from /RadioBrowse?service=Capture response

- id: play_input_index
  label: External Input Selection (firmware v3.8.0 - v4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of inputs from /Settings?id=capture (excluding Bluetooth)

- id: play_input_type_index
  label: External Input Selection (firmware v4.2.0+)
  kind: action
  command: "/Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: Format type-index (e.g. spdif-2). Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index 1-based.

# --- 12. Bluetooth ---
- id: bluetooth_mode_manual
  label: Bluetooth Mode Manual
  kind: action
  command: "/audiomodes?bluetoothAutoplay=0"
  params: []

- id: bluetooth_mode_automatic
  label: Bluetooth Mode Automatic
  kind: action
  command: "/audiomodes?bluetoothAutoplay=1"
  params: []

- id: bluetooth_mode_guest
  label: Bluetooth Mode Guest
  kind: action
  command: "/audiomodes?bluetoothAutoplay=2"
  params: []

- id: bluetooth_mode_disabled
  label: Bluetooth Mode Disabled
  kind: action
  command: "/audiomodes?bluetoothAutoplay=3"
  params: []
```

## Feedbacks
```yaml
- id: volume
  type: integer
  description: Volume level 0..100 or -1 for fixed volume
- id: volume_db
  type: number
  description: Volume in dB
- id: mute
  type: enum
  values: [0, 1]
  description: 1 if muted, 0 if unmuted
- id: mute_volume
  type: integer
  description: Pre-mute volume level (0..100)
- id: mute_db
  type: number
  description: Pre-mute volume level in dB
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
- id: repeat
  type: enum
  values: [0, 1, 2]
  description: 0 repeat queue, 1 repeat track, 2 repeat off
- id: shuffle
  type: enum
  values: [0, 1]
- id: sleep
  type: integer
  description: Minutes remaining before sleep timer
- id: song_position
  type: integer
  description: Position of current track in play queue
- id: total_length
  type: integer
  description: Total track length in seconds
- id: seconds_played
  type: integer
  description: Seconds elapsed in current track
- id: group_name
  type: string
- id: group_volume
  type: integer
- id: sync_stat
  type: string
  description: Uptime sync id
- id: model
  type: string
- id: model_name
  type: string
- id: brand
  type: string
- id: name
  type: string
  description: Player name
- id: mac
  type: string
- id: initialized
  type: enum
  values: [true, false]
- id: battery_level
  type: integer
  description: Battery state of charge percent (if present)
- id: battery_charging
  type: enum
  values: [0, 1]
- id: quality
  type: string
  description: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate
- id: image
  type: string
  description: URL of associated image
- id: etag
  type: string
- id: alarm_seconds_remaining
  type: integer
- id: schema_version
  type: integer
- id: can_seek
  type: enum
  values: [0, 1]
- id: can_move_playback
  type: enum
  values: [true, false]
```

## Variables
```yaml
# Volume and mute state are returned via /Volume query; treated as feedbacks above.
# No additional persistent settable variables documented in source.
```

## Events
```yaml
# Long-polling signals via etag changes on /Status and /SyncStatus.
# No explicit unsolicited notification mechanism documented in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
```

## Notes
- Port 11000 is standard; CI580 multi-node uses 11000/11010/11020/11030.
- Discover port via mDNS services `musc.tcp` and `musp.tcp` when port is unknown.
- Volume range typically -80..0 dB, adjustable via BluOS Controller app.
- Long-polling recommended interval: 100s for /Status, 180s for /SyncStatus; never faster than 10s for /Status.
- Concurrent requests for same resource must be at least 1 second apart under long-polling.
- Secondary player requests for /Status, playback, queue, and browsing are proxied to the primary player.
- Input selection command differs by firmware: `inputIndex` for v3.8.0-v4.2.0, `inputTypeIndex` for v4.2.0+.
- LSDP discovery protocol uses UDP broadcast on port 11430 (out of scope for this HTTP control spec).

<!-- UNRESOLVED: LSDP discovery details not transcribed (binary packet structure); port 11430 only noted as UDP discovery reference. -->
<!-- UNRESOLVED: list of supported NAD models not enumerated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-20T18:01:06.887Z
last_checked_at: 2026-08-20T22:16:13.077Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-20T22:16:13.077Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions match source HTTP endpoint paths verbatim; transport port 11000 and base_url form are documented in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list of supported NAD models not enumerated in source; spec applies to the BluOS player family generically"
- "no explicit power on/off commands; soft reboot only"
- "no explicit multi-step sequences documented in source."
- "source does not document safety warnings, interlocks, or power-on sequencing."
- "LSDP discovery details not transcribed (binary packet structure); port 11430 only noted as UDP discovery reference."
- "list of supported NAD models not enumerated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
