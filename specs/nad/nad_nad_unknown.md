---
spec_id: admin/nad-bluos-custom-integration
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD BluOS Custom Integration API Control Spec"
manufacturer: NAD
model_family: "NAD BluOS-enabled players"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD BluOS-enabled players"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-14T21:06:41.433Z
last_checked_at: 2026-08-19T09:35:23.542Z
generated_at: 2026-08-19T09:35:23.542Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific NAD model lineup covered by this API is not enumerated in the source. Some advanced endpoints are gated by firmware version (e.g. /Play?inputTypeIndex requires v4.2.0+; /Play?inputIndex was for v3.8.0–v4.2.0)."
  - "source documents no discrete settable parameters that are not already enumerated as Actions."
  - "source describes long-polling for /Status and /SyncStatus as a polling mechanism,"
  - "source does not document device-side multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "source does not state a single canonical firmware version; multiple firmware ranges are referenced (v3.8.0, v4.2.0, current doc v1.7)."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:35:23.542Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions map to documented endpoints in the refined source; transport (port 11000, HTTP, no auth) verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# NAD BluOS Custom Integration API Control Spec

## Summary
The BluOS Custom Integration API is a vendor-published HTTP interface for control of BluOS-enabled NAD products (e.g. CI580, and other streamers/players). All requests are HTTP GET (or POST for `/reboot`) sent to `http://<player_ip>:<port>/<request>` on TCP port 11000 (default). Responses are UTF-8 encoded XML. Source: "BluOS Custom Integration API" v1.7 (Lenbrook Industries Limited, 2025-04-09).

<!-- UNRESOLVED: specific NAD model lineup covered by this API is not enumerated in the source. Some advanced endpoints are gated by firmware version (e.g. /Play?inputTypeIndex requires v4.2.0+; /Play?inputIndex was for v3.8.0–v4.2.0). -->

## Transport
```yaml
protocols:
  - http
  - tcp  # inferred: HTTP over TCP
addressing:
  port: 11000  # default per source; CI580 uses 11000/11010/11020/11030 per node
  base_url: "http://<player_ip>:<port>"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: /Doorbell and /reboot commands present (no explicit power-on/off, but reboot exists)
- levelable  # inferred: /Volume with level/abs_db/db parameters
- routable  # inferred: /Play?inputIndex, /Play?inputTypeIndex, /Play?url for direct input selection
- queryable  # inferred: /Status, /SyncStatus, /Playlist, /Presets, /Volume all return state
```

## Actions
```yaml
# Coverage note: every endpoint documented in the source is enumerated.
# Compound endpoints with multiple HTTP parameter variants are split into
# parameterized actions to keep the command payload verbatim.

# ---- Section 2: Status Queries ----
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 100, min 10, max ~60)
    - name: etag
      type: string
      description: ETag from previous /Status response
- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll interval in seconds (recommended 180)
    - name: etag
      type: string
      description: ETag from previous /SyncStatus response

# ---- Section 3: Volume Control ----
- id: volume_set_level
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = include grouped slaves
- id: volume_set_mute
  label: Set Mute (set mute)
  kind: action
  command: "GET /Volume?mute={mute}&tell_slaves={tell_slaves}"
  params:
    - name: mute
      type: integer
      description: 0 = mute, 1 = unmute
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = include grouped slaves
- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = include grouped slaves
- id: volume_set_relative_db
  label: Set Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Relative dB change (positive or negative)
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = include grouped slaves
- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: dB increase (typical value 2)
- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: dB decrease (typical value 2)
- id: volume_mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"
- id: volume_mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"

# ---- Section 4: Playback Control ----
- id: play
  label: Play
  kind: action
  command: "GET /Play"
- id: play_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Jump position in current track
- id: play_seek_id
  label: Play with Seek and Track ID
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Jump position in current track
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
- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "GET /Pause?toggle=1"
- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
- id: skip
  label: Skip Next Track
  kind: action
  command: "GET /Skip"
- id: back
  label: Skip Previous Track
  kind: action
  command: "GET /Back"
- id: shuffle
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on
- id: repeat
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: action_streaming_radio
  label: Execute Streaming Radio Action
  kind: action
  command: "GET /Action?service={service_name}&action={action_URL}"
  params:
    - name: service_name
      type: string
      description: Service id from status response
    - name: action_URL
      type: string
      description: Action URL from <action> element (e.g. /Action?service=Slacker&skip=4799148)

# ---- Section 5: Play Queue Management ----
- id: playlist_list
  label: List All Tracks in Queue
  kind: query
  command: "GET /Playlist"
- id: playlist_status
  label: Get Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
- id: playlist_range
  label: List Play Queue Range
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry index (0-based)
    - name: last
      type: integer
      description: Last entry index
- id: playlist_delete
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Position in queue
- id: playlist_move
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
- id: playlist_clear
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
- id: playlist_save
  label: Save Play Queue as BluOS Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Saved queue name (URL-encoded)

# ---- Section 6: Presets ----
- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"
- id: preset_load
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset id (or +1 / -1 for next/previous)
- id: preset_next
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"

# ---- Section 7: Content Browsing and Searching ----
- id: browse_top
  label: Top Level Browse
  kind: query
  command: "GET /Browse"
- id: browse_key
  label: Browse by Key
  kind: query
  command: "GET /Browse?key={key_value}"
  params:
    - name: key_value
      type: string
      description: URL-encoded browseKey/nextKey/parentKey/contextMenuKey
- id: browse_key_with_context
  label: Browse by Key with Context Menu
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key_value
      type: string
      description: URL-encoded key
- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: URL-encoded searchKey from earlier response
    - name: searchText
      type: string
      description: Search term

# ---- Section 8: Player Grouping ----
- id: group_add_slave
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
- id: group_add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs of secondary players
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports of secondary players
- id: group_remove_slave
  label: Remove One Secondary Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player
- id: group_remove_slaves
  label: Remove Multiple Secondary Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary ports

# ---- Section 9: Player Reboot ----
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot with yes={yes_value}"
  params:
    - name: yes_value
      type: string
      description: Any value (e.g. 1)

# ---- Section 10: Doorbell Chimes ----
- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"

# ---- Section 11: Direct Input ----
- id: input_active_select
  label: Active Input Selection via RadioBrowse URL
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response
- id: radio_browse_capture
  label: List Capture Inputs (Active Inputs)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
- id: input_external_select_index
  label: External Input Selection (firmware between v3.8.0 and v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Input index (1-based; Bluetooth excluded)
- id: input_external_select_typetype
  label: External Input Selection (firmware v4.2.0 or newer)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Type-index combo (e.g. spdif-2). Types: spdif/analog/coax/bluetooth/arc/earc/phono/computer/aesebu/balanced/microphone
- id: settings_capture
  label: Get Capture Input Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"

# ---- Section 12: Bluetooth ----
- id: bluetooth_mode
  label: Change Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
```

## Feedbacks
```yaml
# /Status response attributes exposed as observable state
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player state (per /Status response)
- id: volume_level
  type: integer
  range: [0, 100]
  description: Volume level (0-100; -1 means fixed volume)
- id: volume_db
  type: number
  description: Volume level in dB
- id: mute_state
  type: integer
  range: [0, 1]
  description: 1 if muted, 0 if not
- id: mute_db
  type: number
  description: Unmuted volume in dB when muted
- id: mute_volume
  type: integer
  description: Unmuted volume level (0-100) when muted
- id: shuffle_state
  type: integer
  range: [0, 1]
  description: 0 = off, 1 = on
- id: repeat_state
  type: integer
  range: [0, 1, 2]
  description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: current_track_title
  type: string
  description: Name of current track
- id: current_album
  type: string
  description: Album name
- id: current_artist
  type: string
  description: Artist name
- id: current_service
  type: string
  description: Service id (e.g. Deezer, Tidal)
- id: track_quality
  type: string
  description: cd / hd / dolbyAudio / mqa / mqaAuthored / numeric bitrate
- id: track_position
  type: integer
  description: Position in current play queue (song)
- id: track_total_length
  type: integer
  description: Total length in seconds (totlen)
- id: track_seconds_played
  type: integer
  description: Seconds of current track played (secs)
- id: sleep_timer
  type: integer
  description: Minutes remaining before sleep timer activates
- id: sleep_remaining
  type: integer
  description: Seconds remaining before alarm stops (alarmsecondsremaining)
- id: can_seek
  type: integer
  range: [0, 1]
  description: 1 if track is seekable
- id: can_move_playback
  type: boolean
  description: True if playback can be moved to another player
- id: playback_id
  type: integer
  description: Unique play queue id (pid)
- id: preset_id
  type: integer
  description: Unique preset id (prid)
- id: sync_stat
  type: integer
  description: Unique id for /SyncStatus changes
- id: stream_url_present
  type: boolean
  description: Presence of <streamUrl> indicates play queue not source

# /SyncStatus response attributes
- id: player_id
  type: string
  description: Player IP and port
- id: player_mac
  type: string
  description: Player unique network id (often MAC)
- id: player_brand
  type: string
  description: Player brand name
- id: player_model
  type: string
  description: Player model id
- id: player_model_name
  type: string
  description: Player model name
- id: player_name
  type: string
  description: Player name
- id: player_icon
  type: string
  description: URL of player icon image
- id: player_initialized
  type: boolean
  description: True if player is set up
- id: player_zone
  type: string
  description: Name of fixed group
- id: player_zone_master
  type: boolean
  description: True if primary player in fixed group
- id: player_zone_slave
  type: boolean
  description: True if secondary player in fixed group
- id: player_group_name
  type: string
  description: Group name (primary only)
- id: player_group_volume
  type: integer
  description: Group volume level (primary only)
- id: master_player
  type: string
  description: Master player IP+port (secondary only)
- id: slave_players
  type: string
  description: Secondary player IPs+ports (primary only)
- id: schema_version
  type: integer
  description: Software schema version
- id: etag
  type: string
  description: ETag for long-polling
- id: battery_level
  type: integer
  description: Battery state of charge percentage (if applicable)
- id: battery_charging
  type: integer
  range: [0, 1]
  description: 1 if currently charging
- id: doorbell_enable
  type: integer
  description: 1 if doorbell chime enabled
- id: doorbell_volume
  type: integer
  description: Doorbell chime volume
- id: doorbell_chime_audio
  type: string
  description: Chime audio file reference
```

## Variables
```yaml
# None observed beyond parameterized commands.
# UNRESOLVED: source documents no discrete settable parameters that are not already enumerated as Actions.
```

## Events
```yaml
# UNRESOLVED: source describes long-polling for /Status and /SyncStatus as a polling mechanism,
# not an unsolicited push/notification channel. No device-initiated events documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document device-side multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Port 11000 is the default for all BluOS players; the NAD CI580 uses four ports (11000, 11010, 11020, 11030) — one per streamer node, discoverable via mDNS services `musc.tcp` and `musp.tcp`.
- Long-polling: regular polling should be limited to one request per 30 s; long-polling requests for the same resource must be at least 1 s apart.
- Source distinguishes between regular polling (returns immediately) and long-polling (returns when info changes or timeout).
- Section 11.2 documents two firmware-range-specific input selection commands: `/Play?inputIndex` for firmware between v3.8.0 and v4.2.0, and `/Play?inputTypeIndex` for firmware v4.2.0 or newer.
- LSDP (Lenbrook Service Discovery Protocol) is described in Appendix 13.1. It uses UDP broadcast on port 11430 (IANA-assigned to Lenbrook). LSDP packets begin with magic word "LSDP" (4 ASCII bytes), header length byte, and protocol version byte (current: 1). It is a discovery protocol only — not exercised for device control in this spec.
- Source document does not enumerate specific NAD models covered by this API; CI580 is explicitly named, and the API applies to all BluOS-enabled products (Bluesound, NAD Electronics, DALI).

<!-- UNRESOLVED: source does not state a single canonical firmware version; multiple firmware ranges are referenced (v3.8.0, v4.2.0, current doc v1.7). -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-14T21:06:41.433Z
last_checked_at: 2026-08-19T09:35:23.542Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:35:23.542Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions map to documented endpoints in the refined source; transport (port 11000, HTTP, no auth) verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific NAD model lineup covered by this API is not enumerated in the source. Some advanced endpoints are gated by firmware version (e.g. /Play?inputTypeIndex requires v4.2.0+; /Play?inputIndex was for v3.8.0–v4.2.0)."
- "source documents no discrete settable parameters that are not already enumerated as Actions."
- "source describes long-polling for /Status and /SyncStatus as a polling mechanism,"
- "source does not document device-side multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "source does not state a single canonical firmware version; multiple firmware ranges are referenced (v3.8.0, v4.2.0, current doc v1.7)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
