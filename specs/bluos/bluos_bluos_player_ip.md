---
spec_id: admin/bluos-bluos-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Player Control Spec"
manufacturer: BluOS
model_family: "BluOS Player"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:07.819Z
last_checked_at: 2026-06-02T21:54:07.819Z
generated_at: 2026-06-02T21:54:07.819Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication/security model not described in source; no login or token procedure documented"
  - "no unsolicited server-push event mechanism documented; all state changes are discovered via long-poll or regular poll"
  - "no other explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures documented in source"
  - "authentication/authorization model not described — no login, token, or session mechanism documented in source"
  - "error response format not fully documented — source mentions <error> root element with <message> and <detail> nodes for /Browse errors only; error handling for other endpoints not described"
  - "firmware version compatibility ranges for most API features not stated (exception: input selection commands in section 11.2 document v3.8.0 and v4.2.0 thresholds)"
  - "HTTPS/TLS support not mentioned in source; assumed plain HTTP"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:07.819Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions traced to BluOS Custom Integration API v1.7. Full player control including playback, volume, grouping, presets, and queue confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS Player Control Spec

## Summary

BluOS is an advanced operating system and music management software found in products from Bluesound, NAD Electronics, DALI Loudspeakers, and others. This spec covers the BluOS Custom Integration API (version 1.7), which provides HTTP GET-based control over playback, volume, presets, content browsing, queue management, player grouping, and direct input selection. All requests are sent as HTTP GET (except reboot which uses POST) to `http://<player_ip>:<port>/<command>` and responses are returned as UTF-8 encoded XML.

<!-- UNRESOLVED: authentication/security model not described in source; no login or token procedure documented -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # Default port for all BluOS players except CI580; CI580 node 1=11000, node 2=11010, node 3=11020, node 4=11030
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable    # inferred from volume control commands (/Volume with level, db, abs_db, mute parameters)
- routable     # inferred from direct input selection commands (/Play?url=, /Play?inputTypeIndex=)
```

## Actions

```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  params: []
  notes: "GET /Play — starts playback of current audio source"

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds in the current track (only valid if /Status includes <totlen>)
  notes: "GET /Play?seek=<seconds>"

- id: play_seek_track
  label: Play Track at Position
  kind: action
  params:
    - name: seek
      type: integer
      description: Position in seconds
    - name: id
      type: integer
      description: Track id (position in queue)
  notes: "GET /Play?seek=<seconds>&id=<trackid>"

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL of audio to play
  notes: "GET /Play?url=<encodedStreamURL>"

- id: pause
  label: Pause
  kind: action
  params: []
  notes: "GET /Pause"

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params: []
  notes: "GET /Pause?toggle=1 — toggles current pause state"

- id: stop
  label: Stop
  kind: action
  params: []
  notes: "GET /Stop"

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  notes: "GET /Skip — skips to next track in queue; wraps to first if at last"

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  notes: "GET /Back — goes to start of track if >4s played, else previous track"

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = disable shuffle, 1 = enable shuffle"
  notes: "GET /Shuffle?state=<0|1>"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off"
  notes: "GET /Repeat?state=<0|1|2>"

- id: action_service
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  params:
    - name: action_url
      type: string
      description: Full action URI as provided in <action> element from /Status response
  notes: "Streaming radio actions (skip, back, love, ban); URL is taken from <action> element in /Status; not all stations support all actions"

# --- Volume Control ---

- id: volume_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0–100
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all players in group"
  notes: "GET /Volume?level=<level>&tell_slaves=<0|1>"

- id: volume_set_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (range typically -80 to 0)
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all players in group"
  notes: "GET /Volume?abs_db=<db>"

- id: volume_relative_db
  label: Volume Relative Change (dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative dB change; positive = up, negative = down (typical: +2 or -2)
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all players in group"
  notes: "GET /Volume?db=<delta>"

- id: mute_on
  label: Mute
  kind: action
  params: []
  notes: "GET /Volume?mute=1"

- id: mute_off
  label: Unmute
  kind: action
  params: []
  notes: "GET /Volume?mute=0"

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  params: []
  notes: "GET /Presets — returns all presets on the player"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, or +1 for next preset, or -1 for previous preset"
  notes: "GET /Preset?id=<id|+1|-1>"

# --- Play Queue Management ---

- id: list_tracks
  label: List Play Queue
  kind: action
  params:
    - name: length
      type: integer
      description: "Optional. Set to 1 to return only queue status (no track details)"
    - name: start
      type: integer
      description: "Optional. First entry to include (0-based) for pagination"
    - name: end
      type: integer
      description: "Optional. Last entry to include for pagination"
  notes: "GET /Playlist — not recommended without length or start/end due to potentially large response"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id (position in queue) to remove
  notes: "GET /Delete?id=<position>"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: new
      type: integer
      description: New position in queue
    - name: old
      type: integer
      description: Original position in queue
  notes: "GET /Move?new=<dest>&old=<origin>"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  notes: "GET /Clear — removes all tracks from the play queue"

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist
  notes: "GET /Save?name=<playlist_name>"

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Optional. Browse key (URL-encoded) from a prior /Browse response; omit for top-level browse"
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menus in response"
  notes: "GET /Browse?key=<key>&withContextMenuItems=1"

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Value from a 'searchKey' attribute in a prior /Browse response
    - name: q
      type: string
      description: Search string
  notes: "GET /Browse?key=<searchKey>&q=<searchText>"

# --- Player Grouping ---

- id: add_slave
  label: Group Secondary Player
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of secondary player to add
    - name: port
      type: integer
      description: "Port of secondary player (default 11000)"
    - name: group
      type: string
      description: "Optional. Group name; BluOS assigns default if not provided"
  notes: "GET /AddSlave?slave=<ip>&port=<port>&group=<name>"

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players
  notes: "GET /AddSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

- id: remove_slave
  label: Remove Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of player to remove
    - name: port
      type: integer
      description: Port of player to remove
  notes: "GET /RemoveSlave?slave=<ip>&port=<port>"

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of players to remove
    - name: ports
      type: string
      description: Comma-separated ports of players to remove
  notes: "GET /RemoveSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

# --- Player Reboot ---

- id: reboot
  label: Soft Reboot
  kind: action
  params: []
  notes: "POST /reboot with body yes=1 (HTTP POST, not GET)"

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params: []
  notes: "GET /Doorbell?play=1"

# --- Direct Input Selection ---

- id: play_input_url
  label: Play Active Input by URL
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response"
  notes: "GET /Play?url=<URL_value>; requires querying /RadioBrowse?service=Capture first"

- id: play_input_index
  label: Play Input by Index (firmware < 4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture&schemaVersion=32 (Bluetooth excluded)"
  notes: "GET /Play?inputIndex=<index>; valid for firmware newer than v3.8.0 and older than v4.2.0"

- id: play_input_type_index
  label: Play Input by Type and Index (firmware >= 4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: <type>-<index>, e.g. spdif-1, analog-1, coax-1, bluetooth-1, arc-1, earc-1, phono-1, computer-1, aesebu-1, balanced-1, microphone-1"
  notes: "GET /Play?inputTypeIndex=<type>-<index>; valid for firmware v4.2.0 or newer"

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"
  notes: "GET /audiomodes?bluetoothAutoplay=<value>; no response body"
```

## Feedbacks

```yaml
# --- /Status response fields ---

- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  notes: "From /Status <state>; 'play' and 'stream' are equivalent"

- id: volume
  type: integer
  notes: "From /Status or /Volume; 0–100 scale; -1 means fixed volume"

- id: volume_db
  type: number
  notes: "From /Status or /Volume; volume level in dB"

- id: mute
  type: enum
  values: ["0", "1"]
  notes: "From /Status or /Volume; 1 = muted, 0 = unmuted"

- id: mute_volume
  type: integer
  notes: "From /Volume or /Status; unmuted volume (0–100) when player is muted"

- id: mute_db
  type: number
  notes: "From /Volume or /Status; unmuted volume in dB when player is muted"

- id: title1
  type: string
  notes: "First line of now-playing metadata; MUST be used in any 3-line UI"

- id: title2
  type: string
  notes: "Second line of now-playing metadata"

- id: title3
  type: string
  notes: "Third line of now-playing metadata"

- id: twoline_title1
  type: string
  notes: "First of two lines of now-playing metadata; MUST be used in any 2-line UI if present"

- id: twoline_title2
  type: string
  notes: "Second of two lines of now-playing metadata"

- id: artist
  type: string
  notes: "Artist name of current track; prefer title2 for UI display"

- id: album
  type: string
  notes: "Album name of current track; prefer title3 for UI display"

- id: track_name
  type: string
  notes: "Track name; prefer title1 for UI display (from <name> element)"

- id: image
  type: string
  notes: "URL of image for current audio; may redirect — use followRedirects=1 to avoid"

- id: service
  type: string
  notes: "Service id of current audio; not suitable for UI display"

- id: service_icon
  type: string
  notes: "URL of current service icon"

- id: shuffle
  type: enum
  values: ["0", "1"]
  notes: "0 = shuffle off, 1 = shuffle on"

- id: repeat
  type: enum
  values: ["0", "1", "2"]
  notes: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: current_position_secs
  type: integer
  notes: "Seconds played of current track; not used in etag; must be incremented client-side during playback"

- id: total_length_secs
  type: integer
  notes: "Total length of current track in seconds (from <totlen>)"

- id: can_seek
  type: enum
  values: ["0", "1"]
  notes: "1 if seek is possible for current track"

- id: can_move_playback
  type: boolean
  notes: "True if current content can be moved to another player"

- id: stream_url_flag
  type: string
  notes: "Presence of <streamUrl> means play queue is not the source; shuffle/repeat irrelevant; next/previous unavailable"

- id: sleep_minutes_remaining
  type: integer
  notes: "Minutes remaining before sleep timer activates"

- id: pid
  type: integer
  notes: "Unique play queue id; matches /Playlist id attribute"

- id: prid
  type: integer
  notes: "Unique preset id; changes if preset is modified"

- id: sync_stat
  type: integer
  notes: "Unique id indicating /SyncStatus changes; matches syncStat attribute of /SyncStatus response"

- id: quality
  type: string
  notes: "Audio quality: 'cd', 'hd', 'dolbyAudio', 'mqa', 'mqaAuthored', or numeric approximate bitrate"

- id: stream_format
  type: string
  notes: "Format of audio, e.g. 'MP3 320 kb/s'"

# --- /SyncStatus response fields ---

- id: sync_player_name
  type: string
  notes: "Player name from /SyncStatus <name>"

- id: sync_model_name
  type: string
  notes: "Player model name from /SyncStatus <modelName>"

- id: sync_model
  type: string
  notes: "Player model id from /SyncStatus <model>"

- id: sync_brand
  type: string
  notes: "Player brand name from /SyncStatus <brand>"

- id: sync_group
  type: string
  notes: "Group name from /SyncStatus <group>"

- id: sync_volume
  type: integer
  notes: "Volume level 0–100 from /SyncStatus; -1 = fixed volume"

- id: sync_initialized
  type: boolean
  notes: "True if player is set up; false if setup required via BluOS Controller app"

- id: sync_mac
  type: string
  notes: "Player MAC address / unique network interface id"

- id: sync_master
  type: string
  notes: "Master player IP; only present if this player is secondary in a group"

- id: sync_slaves
  type: array
  notes: "Secondary player IP addresses; only present if this player is the primary"

- id: sync_zone
  type: string
  notes: "Name of fixed group"
```

## Variables

```yaml
- id: polling_timeout
  type: integer
  description: "Long-poll timeout in seconds for /Status (recommended: 100s, minimum: 10s) and /SyncStatus (recommended: 180s)"
  notes: "Clients must not make two consecutive long-poll requests for same resource less than 1 second apart; regular polling limit is 1 request per 30 seconds"

- id: etag
  type: string
  description: "Opaque etag value returned in responses; used as parameter for subsequent long-poll requests to detect changes"
```

## Events

```yaml
# The BluOS API uses long-polling rather than push notifications.
# /Status and /SyncStatus support long-polling via timeout + etag parameters.
# Unsolicited push notifications are not described in source.
# UNRESOLVED: no unsolicited server-push event mechanism documented; all state changes are discovered via long-poll or regular poll
```

## Macros

```yaml
# Multi-step input selection workflow (required before playing a physical input):
# Step 1: GET /RadioBrowse?service=Capture to retrieve available input URLs
# Step 2: GET /Play?url=<URL_value> using URL from step 1
# Alternatively for firmware >= 4.2.0: GET /Play?inputTypeIndex=<type>-<index>

# UNRESOLVED: no other explicit multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# Notes: The reboot command (/reboot POST) is irreversible in the short term; the source
# does not describe any safety interlock or confirmation requirement for this command,
# but integrators should consider adding a confirmation step in their UI.
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes

**Protocol overview:** All requests are HTTP GET to `http://<player_ip>:<port>/<command>` except player reboot which is HTTP POST. Responses are UTF-8 encoded XML. Port 11000 is used for all standard BluOS players. The CI580 has four streamer nodes sharing one chassis: node 1 = port 11000, node 2 = 11010, node 3 = 11020, node 4 = 11030. Actual port should be discovered via mDNS (services `musc._tcp` and `musp._tcp`) or the proprietary Lenbrook Service Discovery Protocol (LSDP) over UDP broadcast on port 11430.

**Long polling:** BluOS supports long polling on `/Status` and `/SyncStatus` via `timeout` and `etag` parameters. Regular polling is limited to at most one request per 30 seconds. Long polling clients must not send two consecutive requests for the same resource less than 1 second apart. The `/Status` response includes a `<syncStat>` element that indicates whether `/SyncStatus` has changed, reducing the need to poll both endpoints.

**Grouped players:** When players are grouped, the primary player controls the source. Requests directed to secondary players for status, playback, queue, and browsing are internally proxied to the primary player. Volume of each secondary player must be tracked via `/SyncStatus` long polling.

**Image URL redirects:** Any URL beginning with `/Artwork` may result in an HTTP redirect. Add `followRedirects=1` as a request parameter when retrieving such images to avoid redirect handling in integrations.

**`streamUrl` flag:** The presence of a `<streamUrl>` element in `/Status` means the play queue is not the source. When present, shuffle and repeat are irrelevant and should be hidden from UI; next/previous track navigation may be unavailable unless streaming radio actions are provided.

**Now-playing metadata display rule:** Always use `title1`, `title2`, `title3` for 3-line UI displays, and `twoline_title1` / `twoline_title2` (when present) for 2-line UI displays. Do not use raw `name`, `artist`, `album` fields for UI text.

**Input selection firmware variants:** The `/Play?inputIndex=` command works only for firmware newer than v3.8.0 and older than v4.2.0. The `/Play?inputTypeIndex=` command works for firmware v4.2.0 or newer. Integrators should implement both and detect firmware version at runtime to select the appropriate variant.

**Device discovery (LSDP):** BluOS implements a custom discovery protocol (LSDP) using UDP broadcast on port 11430 (IANA registered). Class ID 0x0001 = BluOS Player, 0x0003 = BluOS Player secondary (CI580), 0x0008 = BluOS Hub. Players also support mDNS (`_musc._tcp`, `_musp._tcp`). LSDP is preferred for networks where multicast is unreliable.

<!-- UNRESOLVED: authentication/authorization model not described — no login, token, or session mechanism documented in source -->
<!-- UNRESOLVED: error response format not fully documented — source mentions <error> root element with <message> and <detail> nodes for /Browse errors only; error handling for other endpoints not described -->
<!-- UNRESOLVED: firmware version compatibility ranges for most API features not stated (exception: input selection commands in section 11.2 document v3.8.0 and v4.2.0 thresholds) -->
<!-- UNRESOLVED: HTTPS/TLS support not mentioned in source; assumed plain HTTP -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:07.819Z
last_checked_at: 2026-06-02T21:54:07.819Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:07.819Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions traced to BluOS Custom Integration API v1.7. Full player control including playback, volume, grouping, presets, and queue confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication/security model not described in source; no login or token procedure documented"
- "no unsolicited server-push event mechanism documented; all state changes are discovered via long-poll or regular poll"
- "no other explicit multi-step macros described in source"
- "no safety warnings or interlock procedures documented in source"
- "authentication/authorization model not described — no login, token, or session mechanism documented in source"
- "error response format not fully documented — source mentions <error> root element with <message> and <detail> nodes for /Browse errors only; error handling for other endpoints not described"
- "firmware version compatibility ranges for most API features not stated (exception: input selection commands in section 11.2 document v3.8.0 and v4.2.0 thresholds)"
- "HTTPS/TLS support not mentioned in source; assumed plain HTTP"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
