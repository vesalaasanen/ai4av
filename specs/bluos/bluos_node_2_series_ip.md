---
spec_id: admin/bluos-node-2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Node 2 Series Control Spec"
manufacturer: BluOS
model_family: "Node 2 Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "Node 2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:12:24.739Z
last_checked_at: 2026-09-03T22:16:41.619Z
generated_at: 2026-09-03T22:16:41.619Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /RadioBrowse
  - /Settings
  - /Load
  - "firmware version compatibility not stated in source"
  - "source does not document unsolicited notifications beyond long-polling /Status and /SyncStatus responses. BluOS does not appear to define an event push channel; clients must poll."
  - "source does not define any multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-09-03T22:16:41.619Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec action units map verbatim to documented BluOS HTTP endpoints; transport (port 11000, base_url) confirmed in source intro. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# BluOS Node 2 Series Control Spec

## Summary
The BluOS Node 2 Series is a network-attached music streamer running the BluOS operating system, controllable over TCP/IP via HTTP GET requests returning UTF-8 encoded XML responses. This spec covers the Custom Integration HTTP API (section 2-12) for status queries, playback, queue management, presets, browsing/searching, grouping, reboot, doorbell, direct input selection, and Bluetooth mode, plus the Lenbrook Service Discovery Protocol (LSDP) over UDP for discovery.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport:
- HTTP control port is **11000** (per source, all BluOS players except CI580). CI580 nodes use 11000/11010/11020/11030.
- LSDP discovery uses UDP broadcast to/from port **11430** (registered with IANA for Lenbrook).
- Actual port should be discovered via mDNS services `musc.tcp` and `musp.tcp`.

## Traits
```yaml
- queryable       # inferred from /Status and /SyncStatus query commands
- levelable       # inferred from volume / mute commands
- routable        # inferred from input selection, browse, preset load, grouping
```

## Actions
```yaml
- id: status_query
  label: Playback Status Query
  kind: query
  command: "/Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Long-polling duration in seconds (recommended 100, never faster than 10)
    - name: etag-value
      type: string
      description: etag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "/SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 180)
    - name: etag-value
      type: string
      description: etag from previous /SyncStatus response

- id: volume_set
  label: Set Volume (level 0-100)
  kind: action
  command: "/Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0..100
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to whole group

- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Absolute dB value (within configured volume range, typically -80..0)
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Volume increase in dB (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Volume decrease in dB (typical 2)

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

- id: play
  label: Play
  kind: action
  command: "/Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  command: "/Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in seconds within the current track

- id: play_seek_track
  label: Play with Seek and Track ID
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in seconds
    - name: trackid
      type: integer
      description: Queue track id (1-based position)

- id: play_url
  label: Play Streamed Custom Audio
  kind: action
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL of streamed custom audio (must be URL encoded)

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
  label: Skip to Next Track
  kind: action
  command: "/Skip"
  params: []

- id: back
  label: Back / Previous Track
  kind: action
  command: "/Back"
  params: []

- id: shuffle_on
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

- id: action_radio
  label: Radio Station Action (skip/back/love/ban)
  kind: action
  command: "/Action?service={service-name}&action={action-URL}"
  params:
    - name: service-name
      type: string
      description: Music service id (e.g. Slacker)
    - name: action-URL
      type: string
      description: URL from <action> element in /Status response (skip/back/love/ban)

- id: playlist_query
  label: List Play Queue
  kind: query
  command: "/Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "/Playlist?length=1"
  params: []

- id: playlist_paginate
  label: Play Queue Pagination
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry index (0-based)
    - name: last
      type: integer
      description: Last entry index

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Position in queue (1-based)

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New position
    - name: origin
      type: integer
      description: Old position

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "/Clear"
  params: []

- id: save_queue
  label: Save Queue as Playlist
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Playlist name (URL-encoded if needed)

- id: presets_list
  label: List Presets
  kind: query
  command: "/Presets"
  params: []

- id: preset_load
  label: Load Preset
  kind: action
  command: "/Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset id (from /Presets); use +1 for next, -1 for previous

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

- id: browse
  label: Browse Music Content
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: browseKey / nextKey / parentKey / contextMenuKey from prior response (URL encoded)

- id: browse_with_context
  label: Browse with Inline Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey

- id: search
  label: Search Music Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: searchKey from prior response (URL encoded)
    - name: searchText
      type: string
      description: Search string

- id: add_favourite
  label: Add Favourite (context-menu action)
  kind: action
  command: "/AddFavourite?service={service}&{id_field}={id_value}"
  params:
    - name: service
      type: string
      description: Music service id
    - name: id_field
      type: string
      description: Field name (albumid, artistid, etc.) per <actionURL> in browse response
    - name: id_value
      type: string
      description: Identifier value

- id: add_to_queue
  label: Add to Play Queue (context-menu action)
  kind: action
  command: "/Add?service={service}&{params}"
  params:
    - name: service
      type: string
      description: Music service id
    - name: params
      type: string
      description: Parameters per <actionURL> in browse response (e.g. albumid, playnow, clear, shuffle, where)

- id: group_two_players
  label: Group Two Players
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
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

- id: group_multiple_players
  label: Group Multiple Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs of secondary players
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: ungroup_one_player
  label: Remove One Player from Group
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player to remove
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player

- id: ungroup_multiple_players
  label: Remove Multiple Players from Group
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: reboot_player
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (form-encoded, e.g. yes=1)

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []

- id: direct_input_active
  label: Active Input Selection (via Play URL)
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response

- id: direct_input_external_legacy
  label: External Input Selection (firmware 3.8.0 .. <4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Input index from /Settings?id=capture&schemaVersion=32 (1-based; Bluetooth excluded)

- id: direct_input_external_new
  label: External Input Selection (firmware >=4.2.0)
  kind: action
  command: "/Play?inputTypeIndex={type}-{index}"
  params:
    - name: type
      type: string
      description: "Input type: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone"
    - name: index
      type: integer
      description: Index of input of that type (starts from 1)

- id: bluetooth_autoplay_manual
  label: Bluetooth Mode - Manual
  kind: action
  command: "/audiomodes?bluetoothAutoplay=0"
  params: []

- id: bluetooth_autoplay_automatic
  label: Bluetooth Mode - Automatic
  kind: action
  command: "/audiomodes?bluetoothAutoplay=1"
  params: []

- id: bluetooth_autoplay_guest
  label: Bluetooth Mode - Guest
  kind: action
  command: "/audiomodes?bluetoothAutoplay=2"
  params: []

- id: bluetooth_autoplay_disabled
  label: Bluetooth Mode - Disabled
  kind: action
  command: "/audiomodes?bluetoothAutoplay=3"
  params: []
```

## Feedbacks
```yaml
- id: playback_status
  type: object
  description: |
    Root element <status> with attributes: etag, alarmsecondsremaining, action, album, artist,
    battery {level, charging, icon}, canMovePlayback, canSeek, db, groupName, groupVolume,
    image, mute, muteDb, muteVolume, name, notifyurl, pid, prid, quality, repeat, secs,
    service, serviceIcon, shuffle, sleep, song, state, stationImage, streamFormat, streamUrl,
    syncStat, title1, title2, title3, totlen, twoline_title1, twoline_title2, volume, secs.

- id: volume
  type: object
  description: |
    <volume> with attributes: db, mute (0/1), muteDb, muteVolume, offsetDb, etag, and text node
    0..100 (or -1 for fixed).

- id: player_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: The current player state from /Status <state>.

- id: sync_status
  type: object
  description: |
    Root element <SyncStatus> with attributes: battery, brand, db, etag, group, icon, id,
    initialized, mac, model, modelName, mute, muteDb, muteVolume, name, schemaVersion,
    syncStat, volume, zone, zoneMaster, zoneSlave. Contains <master port=".."> and
    <slave port=".." id=".."/> children.

- id: playlist
  type: object
  description: |
    <playlist> with attributes: name, modified (0/1), length, id, shuffle, repeat. Optional
    <song> children with attributes albumid, service, artistid, songid, id and elements
    title, art, alb, fn.

- id: presets
  type: object
  description: |
    <presets prid=".."> with <preset id=".." name=".." url=".." image=".."/> children.

- id: browse_result
  type: object
  description: |
    <browse> with attributes sid, type, serviceIcon, serviceName, searchKey, nextKey,
    parentKey. Contains <item> and/or <category> children (see source for full attribute
    set). Context menu items include favourite-add/-delete, add (-now/-next/-last),
    addAll (-now/-next/-last), playRadio, delete.

- id: loaded_preset
  type: object
  description: |
    <loaded service=".."> with <entries>..</entries>, or <state>stream</state> for radio.

- id: shuffle_result
  type: object
  description: |
    <playlist name=".." modified=".." length=".." shuffle=".." id=".."/>.

- id: doorbell_status
  type: object
  description: |
    <status enable=".." volume=".." chime=".."/>.

- id: input_state
  type: enum
  values: [stream]
  description: Response <state>stream</state> after input switch commands.
```

## Variables
```yaml
- id: volume_level
  type: integer
  range: 0..100
  description: Current volume level (-1 indicates fixed volume)
  command: "/Volume?level={level}"

- id: volume_db
  type: number
  range: -80..0
  description: Volume level in dB (typical configured range)
  command: "/Volume?abs_db={db}"

- id: mute
  type: integer
  range: 0..1
  description: Mute state (1 muted, 0 unmuted)
  command: "/Volume?mute={on_off}"

- id: shuffle_state
  type: integer
  range: 0..1
  description: Shuffle state
  command: "/Shuffle?state={state}"

- id: repeat_state
  type: integer
  range: 0..2
  description: Repeat state (0 queue, 1 track, 2 off)
  command: "/Repeat?state={state}"

- id: bluetooth_autoplay
  type: integer
  range: 0..3
  description: Bluetooth mode (0 manual, 1 auto, 2 guest, 3 disabled)
  command: "/audiomodes?bluetoothAutoplay={value}"

- id: tell_slaves
  type: integer
  range: 0..1
  description: Apply volume command to all grouped players (0 = only selected)
  command: "/Volume?level={level}&tell_slaves={on_off}"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications beyond long-polling /Status and /SyncStatus responses. BluOS does not appear to define an event push channel; clients must poll.
```

## Macros
```yaml
# UNRESOLVED: source does not define any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
# The browse context-menu `delete` action on playlists "should" prompt user confirmation per the
# source prose, but no formal safety interlock is defined.
```

## Notes
- All BluOS HTTP control commands are GET requests and return UTF-8 encoded XML.
- Default control port is **11000** (per source, all BluOS players except CI580). CI580 uses ports 11000/11010/11020/11030.
- Actual port should be discovered via mDNS service types `musc.tcp` and `musp.tcp`.
- Long-polling: clients should restrict regular polling to at most one request every 30 seconds. With long-polling, no two consecutive requests for the same resource less than 1 second apart.
- LSDP discovery uses UDP port **11430** (registered with IANA for Lenbrook). Announce messages broadcast approximately every 60s. Startup sends 7 packets at [0, 1, 2, 3, 5, 7, 10s] + 0..250ms random. LSDP magic word: ASCII "LSDP"; protocol version 1; big-endian, unsigned values.
- Secondary players in a group proxy many requests (Status, Playback, Queue, Browse) to the primary player internally.
- Direct input selection command differs by firmware: `inputIndex` for firmware >3.8.0 and <4.2.0; `inputTypeIndex` for firmware >=4.2.0.
- Image URLs starting with `/Artwork` may redirect; pass `followRedirects=1` to avoid.
- `/Play?url=` requires a URL-encoded stream URL for custom audio sources.
- The 11.2 section notes the older `/Play?InputId=2` example in the source text appears to be a typo for `inputIndex=2`; the source explicitly states `inputIndex` is the parameter.

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:12:24.739Z
last_checked_at: 2026-09-03T22:16:41.619Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:16:41.619Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec action units map verbatim to documented BluOS HTTP endpoints; transport (port 11000, base_url) confirmed in source intro. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /RadioBrowse
- /Settings
- /Load
- "firmware version compatibility not stated in source"
- "source does not document unsolicited notifications beyond long-polling /Status and /SyncStatus responses. BluOS does not appear to define an event push channel; clients must poll."
- "source does not define any multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
