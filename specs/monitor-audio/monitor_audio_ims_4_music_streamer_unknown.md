---
spec_id: admin/monitor-audio-ims-4-music-streamer
schema_version: ai4av-public-spec-v1
revision: 1
title: "Monitor Audio IMS-4 Control Spec"
manufacturer: "Monitor Audio"
model_family: IMS-4
aliases: []
compatible_with:
  manufacturers:
    - "Monitor Audio"
  models:
    - IMS-4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
retrieved_at: 2026-07-14T18:06:24.210Z
last_checked_at: 2026-09-12T22:17:52.700Z
generated_at: 2026-09-12T22:17:52.700Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; IMS-4-specific quirks not in scope of upstream BluOS doc"
  - "source documents long-polling responses as the notification"
  - "source describes commands but no multi-step macro definitions."
  - "no explicit safety warnings or interlock procedures in source."
verification:
  verdict: verified
  checked_at: 2026-09-12T22:17:52.700Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions are present in the BluOS Custom Integration API source with matching paths, parameters, and shapes; transport values port 11000 and HTTP/UDP are documented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Monitor Audio IMS-4 Control Spec

## Summary
The Monitor Audio IMS-4 is a multi-source music streamer built on the BluOS platform. Control is exposed as an HTTP API (TCP port 11000) returning UTF-8 encoded XML, with the player IP and port discoverable via mDNS service types `musc.tcp` and `musp.tcp`. A UDP broadcast discovery protocol (LSDP, port 11430) is also documented as a fallback for networks where multicast is unreliable. This spec covers the upstream BluOS Custom Integration API v1.7, which is the protocol surface for the IMS-4.

<!-- UNRESOLVED: firmware version compatibility not stated in source; IMS-4-specific quirks not in scope of upstream BluOS doc -->

## Transport
```yaml
# BluOS Custom Integration API uses HTTP GET requests over TCP, returning
# UTF-8 encoded XML. Discovery via mDNS service types musc.tcp and musp.tcp.
# LSDP uses UDP broadcast on port 11430 as a fallback discovery mechanism.
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from source evidence: playback commands present, volume control
# present, mute present, queue management present, grouping present,
# input routing (Capture/RadioBrowse) present.
- powerable  # inferred from power command examples
- levelable  # inferred from volume/mute command examples
- queryable  # inferred from /Status and /SyncStatus query examples
- routable  # inferred from input selection and grouping examples
```

## Actions
```yaml
# Section 2 - Status Queries
- id: status_query
  label: Playback Status Query
  kind: query
  command: "/Status"
  params: []
- id: status_long_poll
  label: Playback Status (Long Poll)
  kind: query
  command: "/Status?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 100, never faster than 10).
    - name: etag
      type: string
      description: Etag attribute from previous /Status response.
- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "/SyncStatus"
  params: []
- id: sync_status_long_poll
  label: Sync Status (Long Poll)
  kind: query
  command: "/SyncStatus?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 180).
    - name: etag
      type: string
      description: Etag attribute from previous /SyncStatus response.

# Section 3 - Volume Control
- id: set_volume
  label: Set Volume (Level 0-100)
  kind: action
  command: "/Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100.
    - name: tell_slaves
      type: integer
      description: 0 = only selected player; 1 = apply to all players in group.
- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute volume in dB.
    - name: tell_slaves
      type: integer
      description: 0 = only selected player; 1 = apply to all players in group.
- id: set_volume_relative_db
  label: Set Volume (Relative dB)
  kind: action
  command: "/Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative dB delta from current volume.
    - name: tell_slaves
      type: integer
      description: 0 = only selected player; 1 = apply to all players in group.
- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Volume increase in dB (typical 2).
- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Volume decrease in dB (typical 2).
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

# Section 4 - Playback Control
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
      description: Seconds to jump into current track (requires totlen in /Status).
- id: play_seek_id
  label: Play with Seek and Track ID
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Seconds to jump into target track.
    - name: trackid
      type: integer
      description: Track id in queue (1-based).
- id: play_url
  label: Play Streamed URL
  kind: action
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL of streamed custom audio (must be URL encoded).
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
  label: Back to Previous Track
  kind: action
  command: "/Back"
  params: []
- id: shuffle
  label: Shuffle On/Off
  kind: action
  command: "/Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: "0 = disable shuffle, 1 = enable shuffle."
- id: repeat
  label: Set Repeat Mode
  kind: action
  command: "/Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off."
- id: radio_action
  label: Streaming Radio Action (Skip/Love/Ban)
  kind: action
  command: "/Action?service={service}&{action_key}={action_value}"
  params:
    - name: service
      type: string
      description: Music service name (e.g., Slacker).
    - name: action_key
      type: string
      description: Action key (skip, love, ban) per /Status <action> element.
    - name: action_value
      type: string
      description: Action value from /Status <action> element URL.

# Section 5 - Play Queue Management
- id: playlist_list
  label: List Play Queue Tracks
  kind: query
  command: "/Playlist"
  params: []
- id: playlist_status
  label: Play Queue Status Only
  kind: query
  command: "/Playlist?length=1"
  params: []
- id: playlist_range
  label: Play Queue Range (Pagination)
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry to include (0-based).
    - name: last
      type: integer
      description: Last entry to include.
- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track id (position) in queue to delete.
- id: move_track
  label: Move Track in Queue
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New position for the track.
    - name: origin
      type: integer
      description: Old position of the track.
- id: clear_queue
  label: Clear Play Queue
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
      description: Name for the saved BluOS playlist.

# Section 6 - Presets
- id: list_presets
  label: List Presets
  kind: query
  command: "/Presets"
  params: []
- id: load_preset
  label: Load Preset by ID
  kind: action
  command: "/Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset id from /Presets response.
- id: load_next_preset
  label: Load Next Preset
  kind: action
  command: "/Preset?id=+1"
  params: []
- id: load_previous_preset
  label: Load Previous Preset
  kind: action
  command: "/Preset?id=-1"
  params: []

# Section 7 - Content Browsing and Searching
- id: browse
  label: Browse Music Content
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey/nextKey/parentKey/contextMenuKey from prior response.
- id: browse_with_context_menu
  label: Browse with Inline Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded key from prior response.
- id: search
  label: Search Music Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: URL-encoded searchKey from prior response.
    - name: searchText
      type: string
      description: Search string.

# Section 8 - Player Grouping
- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP address of secondary player.
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player (default 11000).
    - name: GroupName
      type: string
      description: Optional group name.
- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs.
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports.
- id: remove_slave
  label: Remove One Secondary Player
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player to remove.
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player to remove.
- id: remove_slaves
  label: Remove Multiple Secondary Players
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs to remove.
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports to remove.

# Section 9 - Player Reboot
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: "Any value (e.g. 1) sent as POST body parameter."

# Section 10 - Doorbell Chimes
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []

# Section 11 - Direct Input
- id: play_input_url
  label: Select Active Input (via URL)
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response.
- id: play_input_index
  label: Select External Input by Index (firmware 3.8.0-4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Index (1-based) of input in /Settings?id=capture&schemaVersion=32 response. Bluetooth excluded.
- id: play_input_type_index
  label: Select External Input by Type and Index (firmware 4.2.0+)
  kind: action
  command: "/Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: 'Format "type-index" - type in {spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone}, index starts at 1.'

# Section 12 - Bluetooth
- id: set_bluetooth_mode
  label: Set Bluetooth Autoplay Mode
  kind: action
  command: "/audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
```

## Feedbacks
```yaml
# Volume state from /Volume response
- id: volume_level
  type: integer
  description: Player volume level 0-100 (-1 = fixed volume).
- id: volume_db
  type: number
  description: Volume level in dB (typical range -80..0).
- id: mute_state
  type: boolean
  description: "1 if muted, 0 if unmuted."
- id: mute_db
  type: number
  description: Pre-mute volume in dB (only present when muted).
- id: mute_volume
  type: integer
  description: Pre-mute volume in 0..100 scale (only present when muted).
- id: volume_offset_db
  type: number
  description: Volume offsetDb attribute.
- id: volume_etag
  type: string
  description: Etag attribute for long-polling.

# Playback state from /Status response
- id: playback_state
  type: enum
  values: "play, pause, stop, stream, connecting"
- id: track_title
  type: string
  description: Current playing track title (title1/title2/title3 used for UI).
- id: track_artist
  type: string
  description: Current artist name.
- id: track_album
  type: string
  description: Current album name.
- id: track_totlen
  type: integer
  description: Total track length in seconds.
- id: track_secs
  type: integer
  description: Seconds played into current track.
- id: track_quality
  type: string
  description: "Source quality: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate."
- id: repeat_state
  type: integer
  description: "0 = repeat queue, 1 = repeat track, 2 = off."
- id: shuffle_state
  type: integer
  description: "0 = off, 1 = on."
- id: sleep_remaining
  type: integer
  description: Minutes remaining before sleep timer activates.
- id: can_seek
  type: integer
  description: "1 if track supports seek."
- id: can_move_playback
  type: boolean
  description: True if current content can be moved to another player.
- id: indexing
  type: integer
  description: Indexing status.
- id: stream_format
  type: string
  description: Format of the playing audio.
- id: service
  type: string
  description: Music service id of current audio.
- id: service_icon
  type: string
  description: URL of current service icon.
- id: image_url
  type: string
  description: URL of current artwork image.
- id: song_id
  type: integer
  description: Current track position in queue.
- id: playlist_id
  type: integer
  description: Current play queue id (pid).
- id: preset_id
  type: integer
  description: Current preset id (prid).
- id: sync_stat
  type: integer
  description: Sync status change indicator.

# Sync status from /SyncStatus
- id: player_name
  type: string
  description: Player name.
- id: player_brand
  type: string
  description: Player brand name.
- id: player_model
  type: string
  description: Player model id.
- id: player_model_name
  type: string
  description: Player model name.
- id: player_mac
  type: string
  description: Player unique network id (often a MAC address).
- id: player_id
  type: string
  description: Player IP and port.
- id: player_icon
  type: string
  description: URL of player icon image.
- id: player_initialized
  type: boolean
  description: True if player is set up.
- id: group_name
  type: string
  description: Group name (if primary player).
- id: master_ip
  type: string
  description: Master player IP (if secondary player).
- id: master_port
  type: integer
  description: Master player port (if secondary player).
- id: slave_ips
  type: string
  description: Comma list of slave IPs (if primary player).
- id: slave_ports
  type: string
  description: Comma list of slave ports (if primary player).
- id: schema_version
  type: integer
  description: Software schema version.

# Doorbell chime status
- id: chime_enable
  type: integer
  description: Indicates chime enabled state.
- id: chime_volume
  type: integer
  description: Chime volume.
- id: chime_audio
  type: string
  description: Chime audio path.
```

## Variables
```yaml
# Volume range is configurable via BluOS Controller app - out of scope here.
# Bluetooth mode is a discrete set of values, expressed via /audiomodes action.
```

## Events
```yaml
# UNRESOLVED: source documents long-polling responses as the notification
# mechanism, not unsolicited events. No push/event subscription API described.
```

## Macros
```yaml
# UNRESOLVED: source describes commands but no multi-step macro definitions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: /Volume mute=0 unmutes; /Stop cancels alarm timeout. These are
# described behavior, not safety interlocks.
```

## Notes
All commands are HTTP GET requests (except /reboot, which is HTTP POST) sent to `http://<player_ip>:11000/<request>`. Responses are UTF-8 encoded XML. Player IP and port are discoverable via mDNS service types `musc.tcp` and `musp.tcp`; the CI580 uses ports 11000/11010/11020/11030 for its four streamer nodes.

Long-polling rate limits: regular polling should not exceed one request every 30 seconds; long-polling requests for the same resource must not be made less than one second apart. Recommended /Status long-poll timeout is 100 seconds (never faster than 10); recommended /SyncStatus long-poll timeout is 180 seconds.

`/Pause?toggle=1` and `/Stop` cancel the alarm timeout if an alarm is currently playing.

`/Skip`/`/Back` are only meaningful when there is no `<streamUrl>` element in the /Status response (i.e., the play queue is the audio source). For streaming radio skip/back/love/ban, use `/Action` with the URL from the `<action>` element in /Status.

`/Preset?id=+1` and `/Preset?id=-1` loop around the preset list.

`/Play?inputIndex` requires BluOS firmware between v3.8.0 and v4.2.0 (Bluetooth excluded from index). `/Play?inputTypeIndex` requires firmware v4.2.0 or newer and uses `type-index` format (e.g., `spdif-2`).

The LSDP appendix (section 13) describes a UDP broadcast discovery protocol on port 11430 as a fallback for networks where mDNS multicast is unreliable. The BluOS Custom Integration API document explicitly omits fixed grouping ("BluOS also supports fixed grouping, which is out of scope for this document").
```

Self-check: status=draft, declared_confidence=low, derived_from=vendor_manual, port 11000 stated in source, no auth inferred, firmware marked UNRESOLVED, every action carries literal command path, YAML blocks valid (no bare list lines, no trailing content after fences).

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
retrieved_at: 2026-07-14T18:06:24.210Z
last_checked_at: 2026-09-12T22:17:52.700Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:17:52.700Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions are present in the BluOS Custom Integration API source with matching paths, parameters, and shapes; transport values port 11000 and HTTP/UDP are documented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; IMS-4-specific quirks not in scope of upstream BluOS doc"
- "source documents long-polling responses as the notification"
- "source describes commands but no multi-step macro definitions."
- "no explicit safety warnings or interlock procedures in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
