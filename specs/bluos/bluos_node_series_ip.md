---
spec_id: admin/bluos-node-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Node Series Control Spec"
manufacturer: BluOS
model_family: "Node Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "Node Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:15:31.069Z
last_checked_at: 2026-09-03T22:16:31.392Z
generated_at: 2026-09-03T22:16:31.392Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full LSDP discovery packet structure (Query/Announce/Delete message blocks beyond header) is referenced but not fully reproduced in source"
  - "no continuous setable variables beyond Volume (covered as actions above)"
  - "source describes responses to commands but no unsolicited notification mechanism beyond long-polling /Status and /SyncStatus"
  - "source does not document multi-step macro sequences; macros can be composed client-side from the actions above"
  - "source does not document power-on sequencing, fault behavior, or hardware interlocks"
  - "LSDP Announce/Delete message block byte layouts not reproduced in source chunk 2; protocol overview referenced but block details beyond header absent."
verification:
  verdict: verified
  checked_at: 2026-09-03T22:16:31.392Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions match documented BluOS CI API endpoints; transport port 11000 verified verbatim; bidirectional coverage of the source's stated subset is complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# BluOS Node Series Control Spec

## Summary
BluOS is a multi-room networked audio operating system found on Bluesound, NAD Electronics, DALI Loudspeakers and other products. This spec covers the Custom Integration (CI) HTTP API used to query status, control volume and playback, manage the play queue, browse music services, group players, change inputs, reboot the device, and trigger doorbell chimes. All requests are HTTP GET to `http://<player_ip>:<port>/<request>`, with responses as UTF-8 encoded XML.

<!-- UNRESOLVED: full LSDP discovery packet structure (Query/Announce/Delete message blocks beyond header) is referenced but not fully reproduced in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: http://<player_ip>:11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: reboot/soft-reboot endpoint present
- routable        # inferred: input selection and play queue management endpoints present
- queryable       # inferred: /Status, /SyncStatus, /Playlist, /Presets query endpoints
- levelable       # inferred: volume up/down/set/mute endpoints present
```

## Actions
```yaml
# Status queries
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds (recommended 100, min 10)
    - name: etag
      type: string
      description: Optional etag value from previous /Status response for long polling

- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "GET /SyncStatus"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds (recommended 180)
    - name: etag
      type: string
      description: Optional etag value from previous /SyncStatus response

# Volume control
- id: set_volume_level
  label: Set Volume (0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100
    - name: tell_slaves
      type: integer
      description: 0=player only, 1=also apply to group slaves

- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0=player only, 1=also apply to group slaves

- id: set_volume_relative_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Relative volume change in dB (positive or negative)
    - name: tell_slaves
      type: integer
      description: 0=player only, 1=also apply to group slaves

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db=2"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-2"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"
  params: []

# Playback control
- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Seconds to seek into current track

- id: play_seek_track
  label: Play Track at Seek Position
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Seconds to seek into track
    - name: trackid
      type: integer
      description: Track id in queue

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
  label: Skip Next Track
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Skip Previous Track
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable

- id: repeat
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0=repeat queue, 1=repeat track, 2=off

# Streaming radio actions
- id: action_skip
  label: Streaming Radio Skip
  kind: action
  command: "GET /Action?service={service-name}&{action-URL}"
  params:
    - name: service-name
      type: string
      description: Music service name
    - name: action-URL
      type: string
      description: URL from <action url="..."> element in /Status response

- id: action_love
  label: Streaming Radio Love Track
  kind: action
  command: "GET /Action?service={service-name}&{action-URL}"
  params:
    - name: service-name
      type: string
      description: Music service name
    - name: action-URL
      type: string
      description: Love URL from <action> element

- id: action_ban
  label: Streaming Radio Ban Track
  kind: action
  command: "GET /Action?service={service-name}&{action-URL}"
  params:
    - name: service-name
      type: string
      description: Music service name
    - name: action-URL
      type: string
      description: Ban URL from <action> element

# Play queue management
- id: list_playlist
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: list_playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: list_playlist_paginated
  label: List Play Queue (Paginated)
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First queue index (starts from 0)
    - name: last
      type: integer
      description: Last queue index

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Position in queue

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New position
    - name: origin
      type: integer
      description: Old position

- id: clear_queue
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Name for the saved playlist

# Presets
- id: list_presets
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []

- id: load_preset
  label: Load Preset by ID
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset ID number

- id: load_next_preset
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
  params: []

- id: load_previous_preset
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"
  params: []

# Content browsing and search
- id: browse_root
  label: Browse Root
  kind: query
  command: "GET /Browse"
  params: []

- id: browse_key
  label: Browse by Key
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey/nextKey/parentKey/contextMenuKey

- id: browse_key_with_context
  label: Browse by Key with Context Menu
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded key value
    - name: withContextMenuItems
      type: integer
      description: Always 1

- id: search_content
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: searchKey from prior response (URL-encoded)
    - name: searchText
      type: string
      description: Search string

# Player grouping
- id: group_one_slave
  label: Group One Slave to Primary
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP address of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port number of secondary player (default 11000)
    - name: GroupName
      type: string
      description: Optional group name

- id: group_multiple_slaves
  label: Group Multiple Slaves to Primary
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: ungroup_one_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player to ungroup
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player to ungroup

- id: ungroup_multiple_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

# Player reboot
- id: reboot_player
  label: Reboot Player
  kind: action
  command: "POST /reboot (body: yes=1)"
  params: []

# Doorbell
- id: play_doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# Direct input selection
- id: active_input_select
  label: Active Input Selection
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response

- id: external_input_select_legacy
  label: External Input Selection (firmware >v3.8.0, <v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Index from /Settings?id=capture response (Bluetooth excluded, starts at 1)

- id: external_input_select_typed
  label: External Input Selection (firmware >=v4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Format type-index, e.g. spdif-2, analog-1, bluetooth-1, arc-1, earc-1, phono-1, coax-1, computer-1, aesebu-1, balanced-1, microphone-1

# Bluetooth mode
- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
```

## Feedbacks
```yaml
# /Status feedback (per-response fields)
- id: status_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player state from /Status <state>
- id: status_volume
  type: integer
  description: Volume level 0-100 (-1 means fixed volume)
- id: status_db
  type: number
  description: Volume in dB
- id: status_mute
  type: enum
  values: [0, 1]
  description: Mute state (1=muted)
- id: status_mute_db
  type: number
  description: Unmuted dB volume when muted
- id: status_mute_volume
  type: integer
  description: Unmuted 0-100 volume when muted
- id: status_shuffle
  type: enum
  values: [0, 1]
  description: Shuffle state
- id: status_repeat
  type: enum
  values: [0, 1, 2]
  description: Repeat state (0=queue, 1=track, 2=off)
- id: status_song
  type: integer
  description: Current track position in queue
- id: status_totlen
  type: integer
  description: Total track length in seconds
- id: status_secs
  type: integer
  description: Seconds played in current track
- id: status_can_seek
  type: enum
  values: [0, 1]
  description: Whether seek is supported on current track
- id: status_can_move_playback
  type: boolean
  description: Whether playback can be moved to another player
- id: status_album
  type: string
  description: Album of current track
- id: status_artist
  type: string
  description: Artist of current track
- id: status_title1
  type: string
  description: First metadata line
- id: status_title2
  type: string
  description: Second metadata line
- id: status_title3
  type: string
  description: Third metadata line
- id: status_service
  type: string
  description: Music service id
- id: status_quality
  type: string
  description: Audio quality (cd/hd/dolbyAudio/mqa/mqaAuthored/numeric bitrate)
- id: status_stream_url
  type: string
  description: Presence indicates play queue is not source of audio
- id: status_sleep
  type: integer
  description: Minutes remaining before sleep timer
- id: status_indexing
  type: enum
  values: [0, 1]
  description: Indexing in progress flag

# /SyncStatus feedback
- id: sync_status_etag
  type: string
  description: Etag for long polling
- id: sync_status_group
  type: string
  description: Group name
- id: sync_status_volume
  type: integer
  description: Volume level 0-100
- id: sync_status_mute
  type: enum
  values: [0, 1]
  description: Mute state
- id: sync_status_initialized
  type: boolean
  description: Whether player has been set up
- id: sync_status_schema_version
  type: integer
  description: Software schema version
- id: sync_status_mac
  type: string
  description: Player MAC address
- id: sync_status_brand
  type: string
  description: Player brand name
- id: sync_status_model
  type: string
  description: Player model id
- id: sync_status_model_name
  type: string
  description: Player model name
- id: sync_status_name
  type: string
  description: Player name

# /Volume feedback
- id: volume_response_etag
  type: string
  description: Etag of volume response

# /Playlist feedback
- id: playlist_id
  type: integer
  description: Unique id for current queue state
- id: playlist_length
  type: integer
  description: Total number of tracks in queue
- id: playlist_modified
  type: enum
  values: [0, 1]
  description: 1=queue modified since loaded

# /Presets feedback
- id: presets_prid
  type: integer
  description: Unique id for player presets
```

## Variables
```yaml
# UNRESOLVED: no continuous setable variables beyond Volume (covered as actions above)
```

## Events
```yaml
# UNRESOLVED: source describes responses to commands but no unsolicited notification mechanism beyond long-polling /Status and /SyncStatus
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences; macros can be composed client-side from the actions above
```

## Safety
```yaml
confirmation_required_for:
  - context_menu_delete  # inferred: source notes user confirmation should be requested for delete context menu items
interlocks: []
# UNRESOLVED: source does not document power-on sequencing, fault behavior, or hardware interlocks
```

## Notes
- Port 11000 used for all BluOS players except CI580 (which uses 11000/11010/11020/11030 for nodes 1-4).
- mDNS services `musc.tcp` and `musp.tcp` should be used to discover players and their ports.
- Long-polling pattern: `/Status` and `/SyncStatus` accept `timeout` and `etag` query params. Recommended polling interval is at most one request every 30 seconds when not using long polling. For long polling: /Status recommended 100s (60s+), /SyncStatus recommended 180s. No two consecutive long-poll requests for the same resource within one second.
- /Status covers playback state; /SyncStatus covers player/group identity and volume. Use `syncStat` element to detect changes.
- /Pause and /Stop cancel alarm timeouts when an alarm is playing.
- /Preset id accepts "+1" and "-1" for next/previous preset. Presets loop top-to-bottom and bottom-to-top.
- /Shuffle retains original queue for restore when disabled.
- Section 11.2 documents two firmware-dependent input selection paths: `inputIndex` for firmware between v3.8.0 and v4.2.0, and `inputTypeIndex` for v4.2.0+. Bluetooth excluded from inputIndex enumeration; spdif/analog/coax/bluetooth/arc/earc/phono/computer/aesebu/balanced/microphone are valid type names for inputTypeIndex.
- LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast to/from port 11430. Magic word "LSDP" (4 ASCII bytes), current protocol version 1.
- 7 startup packets sent at absolute times [0, 1, 2, 3, 5, 7, 10s] + 0-250ms random jitter; main announce period 57s + 0-6s random; query response delay 0-750ms random.

<!-- UNRESOLVED: LSDP Announce/Delete message block byte layouts not reproduced in source chunk 2; protocol overview referenced but block details beyond header absent. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:15:31.069Z
last_checked_at: 2026-09-03T22:16:31.392Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:16:31.392Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions match documented BluOS CI API endpoints; transport port 11000 verified verbatim; bidirectional coverage of the source's stated subset is complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full LSDP discovery packet structure (Query/Announce/Delete message blocks beyond header) is referenced but not fully reproduced in source"
- "no continuous setable variables beyond Volume (covered as actions above)"
- "source describes responses to commands but no unsolicited notification mechanism beyond long-polling /Status and /SyncStatus"
- "source does not document multi-step macro sequences; macros can be composed client-side from the actions above"
- "source does not document power-on sequencing, fault behavior, or hardware interlocks"
- "LSDP Announce/Delete message block byte layouts not reproduced in source chunk 2; protocol overview referenced but block details beyond header absent."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
