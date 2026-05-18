---
spec_id: admin/bluos-ci-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS CI Series Control Spec"
manufacturer: BluOS
model_family: "BluOS CI Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS CI Series"
    - CI580
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:22:51.129Z
generated_at: 2026-05-16T19:22:51.129Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /RadioBrowse
  - /Settings
verification:
  verdict: verified
  checked_at: 2026-05-16T19:22:51.129Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions matched source endpoints with correct shapes; transport verified; mute polarity confirmed by source examples in 3.4/3.5."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS CI Series Control Spec

## Summary

The BluOS CI Series encompasses network music streaming players (including multi-zone devices such as the CI580) running the BluOS operating system. This spec covers the BluOS Custom Integration API v1.7, which exposes HTTP GET (and limited POST) endpoints for playback control, volume, queue management, preset recall, content browsing, player grouping, and physical input selection. All commands are directed to the player's IP address over HTTP on port 11000 (with the CI580 using ports 11000/11010/11020/11030 for its four internal nodes). Responses are UTF-8 encoded XML.

<!-- UNRESOLVED: the source is a CI-subset of the full BluOS API; undocumented endpoints exist but are out of scope -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # stated in source; CI580 node 2 uses 11010, node 3 uses 11020, node 4 uses 11030
  base_url: "http://<player_ip>:<port>"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- queryable       # inferred from /Status, /SyncStatus, /Volume, /Playlist query commands
- levelable       # inferred from /Volume level/dB/mute commands
- routable        # inferred from /Play?url, /Play?inputTypeIndex, /Play?inputIndex input selection commands
- powerable       # inferred from /reboot command (soft reboot only; no hard power-on/off command found in source)
```

## Actions

```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  endpoint: "GET /Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  endpoint: "GET /Play"
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds within the current track. Only valid when /Status includes <totlen>.
    - name: id
      type: integer
      description: Optional track id (queue position) to seek within.

- id: play_url
  label: Play Stream URL
  kind: action
  endpoint: "GET /Play"
  params:
    - name: url
      type: string
      description: URL-encoded stream URL or capture input URL to play.

- id: pause
  label: Pause
  kind: action
  endpoint: "GET /Pause"
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  endpoint: "GET /Pause"
  params:
    - name: toggle
      type: integer
      description: Set to 1 to toggle current pause state.

- id: stop
  label: Stop
  kind: action
  endpoint: "GET /Stop"
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  endpoint: "GET /Skip"
  params: []

- id: back
  label: Go Back
  kind: action
  endpoint: "GET /Back"
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  endpoint: "GET /Shuffle"
  params:
    - name: state
      type: integer
      description: "0 = disable shuffle; 1 = enable shuffle"

- id: repeat
  label: Set Repeat
  kind: action
  endpoint: "GET /Repeat"
  params:
    - name: state
      type: integer
      description: "0 = repeat queue; 1 = repeat current track; 2 = repeat off"

- id: action_streaming
  label: Streaming Radio Action
  kind: action
  endpoint: "GET /Action"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker).
    - name: skip
      type: string
      description: Track id to skip (service-specific).
    - name: love
      type: string
      description: Track id to mark as loved.
    - name: ban
      type: string
      description: Track id to ban.

# --- Volume Control ---

- id: set_volume
  label: Set Volume
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0–100.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: abs_db
      type: number
      description: Absolute volume level in dB.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: volume_relative_db
  label: Volume Relative Change (dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: db
      type: number
      description: Relative dB change; positive to increase, negative to decrease. Typical step is ±2 dB.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: mute
  label: Mute
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: mute
      type: integer
      description: "1 = mute; 0 = unmute"

# --- Queue Management ---

- id: list_playlist
  label: List Play Queue
  kind: action
  endpoint: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: "If set to 1, return only queue status (no track details)."
    - name: start
      type: integer
      description: First track index (0-based) for pagination.
    - name: end
      type: integer
      description: Last track index for pagination.

- id: delete_track
  label: Delete Track from Queue
  kind: action
  endpoint: "GET /Delete"
  params:
    - name: id
      type: integer
      description: Track id (position) to remove from the play queue.

- id: move_track
  label: Move Track in Queue
  kind: action
  endpoint: "GET /Move"
  params:
    - name: old
      type: integer
      description: Current position of the track.
    - name: new
      type: integer
      description: Destination position for the track.

- id: clear_queue
  label: Clear Play Queue
  kind: action
  endpoint: "GET /Clear"
  params: []

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  endpoint: "GET /Save"
  params:
    - name: name
      type: string
      description: Name to save the playlist under.

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  endpoint: "GET /Presets"
  params: []

- id: load_preset
  label: Load Preset
  kind: action
  endpoint: "GET /Preset"
  params:
    - name: id
      type: string
      description: "Preset id to load; use +1 for next preset, -1 for previous."

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  endpoint: "GET /Browse"
  params:
    - name: key
      type: string
      description: "Optional browse key (URL-encoded). Omit for top-level browse."
    - name: withContextMenuItems
      type: integer
      description: "Set to 1 to include inline context menus."

- id: search
  label: Search Music Content
  kind: action
  endpoint: "GET /Browse"
  params:
    - name: key
      type: string
      description: Search key taken from a searchKey attribute in a previous response.
    - name: q
      type: string
      description: Search text string.

# --- Player Grouping ---

- id: add_slave
  label: Add Player(s) to Group
  kind: action
  endpoint: "GET /AddSlave"
  params:
    - name: slave
      type: string
      description: IP address of secondary player to add.
    - name: port
      type: integer
      description: Port of secondary player (default 11000).
    - name: group
      type: string
      description: Optional group name; BluOS assigns a default if omitted.
    - name: slaves
      type: string
      description: Comma-separated IP addresses for adding multiple secondary players.
    - name: ports
      type: string
      description: Comma-separated ports for multiple secondary players.

- id: remove_slave
  label: Remove Player(s) from Group
  kind: action
  endpoint: "GET /RemoveSlave"
  params:
    - name: slave
      type: string
      description: IP address of secondary player to remove.
    - name: port
      type: integer
      description: Port of secondary player.
    - name: slaves
      type: string
      description: Comma-separated IP addresses for removing multiple secondary players.
    - name: ports
      type: string
      description: Comma-separated ports for multiple secondary players.

# --- Input Selection ---

- id: select_input_url
  label: Select Active Input (by URL)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response. Works for active inputs including BluOS HUB inputs."

- id: select_input_index
  label: Select External Input (by Index, firmware <v4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture&schemaVersion=32, excluding Bluetooth. Valid for firmware newer than v3.8.0 and older than v4.2.0."

- id: select_input_type_index
  label: Select External Input (by Type+Index, firmware >=v4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: <type>-<index>. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1. Example: spdif-2 for Optical Input 2."

# --- Doorbell ---

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  endpoint: "GET /Doorbell"
  params:
    - name: play
      type: integer
      description: "Always set to 1 to activate doorbell chime."

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  endpoint: "GET /audiomodes"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual; 1 = Automatic; 2 = Guest; 3 = Disabled"

# --- Reboot ---

- id: reboot
  label: Soft Reboot Player
  kind: action
  endpoint: "POST /reboot"
  params:
    - name: yes
      type: string
      description: "Any value (e.g. 1) to confirm reboot."
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  endpoint: "GET /Status"
  type: object
  description: Returns current playback state, track metadata, volume, shuffle, repeat, and group info.
  fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
    - name: volume
      type: integer
      description: "0–100; -1 means fixed volume"
    - name: mute
      type: integer
      description: "1 = muted; 0 = not muted"
    - name: shuffle
      type: integer
      description: "0 = off; 1 = on"
    - name: repeat
      type: integer
      description: "0 = repeat queue; 1 = repeat track; 2 = repeat off"
    - name: title1
      type: string
      description: First line of now-playing metadata (MUST use instead of name/artist/album)
    - name: title2
      type: string
      description: Second line of now-playing metadata
    - name: title3
      type: string
      description: Third line of now-playing metadata
    - name: totlen
      type: integer
      description: Total track length in seconds
    - name: secs
      type: integer
      description: Seconds elapsed in current track (not included in etag; increment client-side)
    - name: canSeek
      type: integer
      description: "1 if seek is supported for current track"
    - name: syncStat
      type: integer
      description: Changes when /SyncStatus changes; use to decide whether to re-poll /SyncStatus
    - name: pid
      type: integer
      description: Unique play queue id; matches /Playlist id attribute
    - name: prid
      type: integer
      description: Unique preset id; matches /Presets prid attribute

- id: sync_status
  label: Player and Group Sync Status
  endpoint: "GET /SyncStatus"
  type: object
  description: Returns player identity, grouping, volume, and network information.
  fields:
    - name: volume
      type: integer
      description: "0–100; -1 = fixed volume"
    - name: mute
      type: integer
      description: "1 = muted"
    - name: name
      type: string
      description: Player name
    - name: model
      type: string
      description: Player model id
    - name: modelName
      type: string
      description: Player model name
    - name: brand
      type: string
      description: Player brand
    - name: group
      type: string
      description: Group name
    - name: initialized
      type: boolean
      description: "true = player is set up; false = needs setup via BluOS Controller app"
    - name: master
      type: string
      description: Primary player IP; present only when this player is a secondary
    - name: slave
      type: array
      description: Secondary player IPs; present only when this player is the primary

- id: volume_state
  label: Volume State
  endpoint: "GET /Volume"
  type: object
  fields:
    - name: volume
      type: integer
      description: "Current volume 0–100; -1 = fixed"
    - name: db
      type: number
      description: Volume in dB
    - name: mute
      type: integer
      description: "1 = muted; 0 = not muted"
    - name: muteDb
      type: number
      description: Pre-mute volume in dB (present when muted)
    - name: muteVolume
      type: integer
      description: Pre-mute volume 0–100 (present when muted)
```

## Variables

```yaml
# Long-polling parameters apply to /Status, /SyncStatus, and /Volume queries.
# Pass timeout (seconds) and etag (from previous response root element) to enable long polling.
# Recommended /Status poll interval: 100s; never faster than 10s.
# Recommended /SyncStatus poll interval: 180s.
# When not using long polling, restrict to at most one /Status request per 30 seconds.
# When using long polling, never make two consecutive requests for the same resource less than 1 second apart.
```

## Events

```yaml
# BluOS does not push unsolicited events. State change detection relies on long polling
# (/Status?timeout=<seconds>&etag=<etag> and /SyncStatus?timeout=<seconds>&etag=<etag>).
# The server holds the connection until either the state changes or the timeout elapses.
```

## Macros

```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # soft reboot via POST /reboot; no hard power control available in this API
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures beyond the reboot command.
# Never infer power sequencing requirements.
```

## Notes

- All requests are HTTP GET (except `/reboot`, which is HTTP POST). Parameters are standard URL-encoded name/value pairs. Responses are UTF-8 encoded XML.
- Default port is **11000** for all BluOS players. The CI580 uses 11000 (node 1), 11010 (node 2), 11020 (node 3), and 11030 (node 4). The actual port should be discovered via mDNS (`musc.tcp` / `musp.tcp`) or the proprietary LSDP (Lenbrook Service Discovery Protocol) over UDP port 11430.
- For grouped players, requests directed to a secondary player are internally proxied to the primary player for most endpoints (/Status, playback control, queue management, browsing). Volume of individual secondary players must be tracked via /SyncStatus long polling.
- The `secs` field in /Status is excluded from etag calculation; clients must increment playback position client-side when state is `play` or `stream`.
- `title1`, `title2`, and `title3` (or `twoline_title1`/`twoline_title2` for two-line UIs) MUST be used for now-playing display. Do not use `name`, `artist`, or `album` directly.
- The `streamUrl` element in /Status (when present) signals that the play queue is not the audio source; `song`, `shuffle`, and `repeat` become irrelevant, and skip/back may not be available.
- Image URLs starting with `/Artwork` may redirect; append `followRedirects=1` when fetching artwork to avoid redirect issues.
- Content browsing keys, contextMenuKeys, and searchKeys must be URL-encoded when used as the `key` parameter in subsequent /Browse requests.
- Input selection for inactive physical inputs (not shown in /RadioBrowse?service=Capture) should use the `/Play?inputTypeIndex=<type>-<index>` form (firmware v4.2.0+) or `/Play?inputIndex=<n>` (firmware v3.8.0–v4.2.0). Active inputs (including BluOS HUB inputs) use `/Play?url=<encoded-capture-url>`.
- Bluetooth mode options: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled. The `/audiomodes` endpoint returns no response body.
- Player discovery uses either mDNS (_musc._tcp / _musp._tcp) or LSDP (UDP broadcast on port 11430). LSDP class IDs: 0x0001 = BluOS Player, 0x0003 = BluOS secondary node (e.g. CI580), 0x0008 = BluOS Hub.

<!-- UNRESOLVED: The source is a CI subset of the full BluOS API; additional endpoints exist in the full protocol. API version covered is 1.7 (dated 2025-04-09). -->
<!-- UNRESOLVED: No error response codes or error handling behavior is specified beyond a generic <error><message/></error> XML structure for /Browse errors. -->
<!-- UNRESOLVED: Authentication/authorization model is not addressed in the source; assumed none required. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:22:51.129Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:22:51.129Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions matched source endpoints with correct shapes; transport verified; mute polarity confirmed by source examples in 3.4/3.5."
```

## Known Gaps

```yaml
- /RadioBrowse
- /Settings
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
