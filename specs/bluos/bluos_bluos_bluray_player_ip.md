---
spec_id: admin/bluos-bluos-bluray-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS BluOS Bluray Player Control Spec"
manufacturer: BluOS
model_family: "BluOS Bluray Player"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS Bluray Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-10T20:30:44.027Z
last_checked_at: 2026-08-19T09:00:14.357Z
generated_at: 2026-08-19T09:00:14.357Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the generic BluOS CI API v1.7 — does not state which specific hardware models (other than example PULSE P300) implement it. \"BluOS Bluray Player\" used as device name per task input; model coverage not confirmed against device list."
  - "firmware version compatibility range not stated (one sub-feature references firmware v3.8.0 and v4.2.0 boundaries only)."
  - "protocol version (MDNS service discovery via musc.tcp / musp.tcp referenced but discovery details not specified)."
  - "MDNS discovery details (TXT records, service instance naming) not specified beyond service names."
  - "no push/websocket/sse mechanism described."
  - "no device-side macros described in source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "model coverage — source is generic BluOS CI API; not confirmed which exact models implement every command. \"BluOS Bluray Player\" used as device name from task input."
  - "schemaVersion — /SyncStatus returns schemaVersion attribute (e.g. \"25\"); /Settings examples reference schemaVersion=32 as \"the latest schema version\". Version-to-feature mapping not documented."
  - "firmware version → command availability table not provided (only the inputIndex boundary noted)."
  - "no explicit error code / fault response catalogue. /Browse may return <error><message/><detail/></error> but no enumeration of error codes."
  - "MDNS TXT record contents not specified."
  - "BluOS HUB fixed grouping commands referenced as \"out of scope for this document\" — not covered."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:00:14.357Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions match documented BluOS CI API endpoints verbatim; transport port and base URL match the source's HTTP convention. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# BluOS BluOS Bluray Player Control Spec

## Summary
BluOS network media player running the BluOS operating system. This spec covers the Custom Integration (CI) HTTP API: all requests sent as HTTP GET to `http://<player_ip>:<port>/<request>`, responses returned as UTF-8 encoded XML. Covers playback, volume, queue, presets, content browsing, player grouping, reboot, doorbell chime, and input selection.

<!-- UNRESOLVED: source document is the generic BluOS CI API v1.7 — does not state which specific hardware models (other than example PULSE P300) implement it. "BluOS Bluray Player" used as device name per task input; model coverage not confirmed against device list. -->
<!-- UNRESOLVED: firmware version compatibility range not stated (one sub-feature references firmware v3.8.0 and v4.2.0 boundaries only). -->
<!-- UNRESOLVED: protocol version (MDNS service discovery via musc.tcp / musp.tcp referenced but discovery details not specified). -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://<player_ip>:<port>
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on addressing:
- Default port 11000 for all BluOS players. Exception: NAD CI580 chassis uses four streamer nodes on one IP — node 1 port 11000, node 2 port 11010, node 3 port 11020, node 4 port 11030.
- Actual port should be discovered via MDNS using services `musc.tcp` and `musp.tcp`.
- All requests are HTTP GET (one exception: `/reboot` is POST). Parameters are URL-encoded name/value pairs. Responses are UTF-8 XML.
- Example base used throughout source: `http://192.168.1.100:11000`.

<!-- UNRESOLVED: MDNS discovery details (TXT records, service instance naming) not specified beyond service names. -->

## Traits
```yaml
traits:
  - queryable  # inferred from /Status, /SyncStatus, /Playlist, /Presets, /Volume query examples
  - levelable  # inferred from /Volume level/db/abs_db commands
```

## Actions
```yaml
actions:
  # --- Status Queries (Section 2) ---
  - id: status_query
    label: Playback Status Query
    kind: query
    command: "GET /Status"
    params:
      - name: timeout
        type: integer
        description: Optional long-poll timeout in seconds. Recommended 100; never faster than 10.
      - name: etag
        type: string
        description: Optional etag from previous /Status response, used for long polling.

  - id: sync_status_query
    label: Player and Group Sync Status Query
    kind: query
    command: "GET /SyncStatus"
    params:
      - name: timeout
        type: integer
        description: Optional long-poll interval in seconds. Recommended 180.
      - name: etag
        type: string
        description: Optional etag from previous /SyncStatus response.

  # --- Volume Control (Section 3) ---
  - id: volume_set_level
    label: Set Volume (Level)
    kind: action
    command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
    params:
      - name: level
        type: integer
        description: Absolute volume level, integer 0..100.
      - name: tell_slaves
        type: integer
        description: Grouped players. 0 = only selected player changes; 1 = all group players change.

  - id: volume_set_absolute_db
    label: Set Volume (Absolute dB)
    kind: action
    command: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"
    params:
      - name: abs_db
        type: number
        description: Absolute volume on dB scale (range typically -80..0).
      - name: tell_slaves
        type: integer
        description: 0 = only selected player; 1 = all group players.

  - id: volume_change_relative_db
    label: Volume Change (Relative dB)
    kind: action
    command: "GET /Volume?db={db}&tell_slaves={tell_slaves}"
    params:
      - name: db
        type: number
        description: Relative dB change; positive = up, negative = down. Typical step 2 or -2.
      - name: tell_slaves
        type: integer
        description: 0 = only selected player; 1 = all group players.

  - id: volume_mute_set
    label: Set Mute State
    kind: action
    command: "GET /Volume?mute={mute}&tell_slaves={tell_slaves}"
    params:
      - name: mute
        type: integer
        description: 0 = unmute (per source's /Volume?mute= parameter convention); 1 = mute.
      - name: tell_slaves
        type: integer
        description: 0 = only selected player; 1 = all group players.

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

  # --- Playback Control (Section 4) ---
  - id: play
    label: Play
    kind: action
    command: "GET /Play"
    params: []

  - id: play_seek
    label: Play at Seek Position
    kind: action
    command: "GET /Play?seek={seek}"
    params:
      - name: seek
        type: integer
        description: Jump to position in seconds within current track. Requires /Status <totlen>. Cannot combine with inputType/index.

  - id: play_seek_id
    label: Play at Seek Position in Specific Track
    kind: action
    command: "GET /Play?seek={seek}&id={id}"
    params:
      - name: seek
        type: integer
        description: Position in seconds within the track.
      - name: id
        type: integer
        description: Track id in the play queue (0-based).

  - id: play_url
    label: Play URL / Stream
    kind: action
    command: "GET /Play?url={url}"
    params:
      - name: url
        type: string
        description: URL-encoded stream URL to play.

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
    label: Skip to Next Track
    kind: action
    command: "GET /Skip"
    params: []

  - id: back
    label: Back to Previous Track / Start
    kind: action
    command: "GET /Back"
    params: []

  - id: shuffle_set
    label: Set Shuffle
    kind: action
    command: "GET /Shuffle?state={state}"
    params:
      - name: state
        type: integer
        description: 0 = shuffle off; 1 = shuffle on.

  - id: repeat_set
    label: Set Repeat
    kind: action
    command: "GET /Repeat?state={state}"
    params:
      - name: state
        type: integer
        description: 0 = repeat queue; 1 = repeat track; 2 = repeat off.

  - id: action_streaming_radio
    label: Streaming Radio Action (skip/back/love/ban)
    kind: action
    command: "GET /Action?service={service}&{action_param}={action_value}"
    params:
      - name: service
        type: string
        description: Service name (e.g. Slacker). Taken from /Status <service> or <action> element.
      - name: action_param
        type: string
        description: One of skip, back, love, ban. The URL/value comes from <action> element in /Status response.
      - name: action_value
        type: string
        description: Action-specific value from the <action> url attribute.

  # --- Play Queue Management (Section 5) ---
  - id: playlist_list
    label: List Play Queue
    kind: query
    command: "GET /Playlist"
    params: []

  - id: playlist_list_status
    label: List Play Queue Status Only
    kind: query
    command: "GET /Playlist?length=1"
    params: []

  - id: playlist_list_range
    label: List Play Queue Range
    kind: query
    command: "GET /Playlist?start={start}&end={end}"
    params:
      - name: start
        type: integer
        description: First queue entry to include (0-based).
      - name: end
        type: integer
        description: Last queue entry to include.

  - id: delete_track
    label: Delete Track
    kind: action
    command: "GET /Delete?id={id}"
    params:
      - name: id
        type: integer
        description: Track id (queue position) to remove.

  - id: move_track
    label: Move Track
    kind: action
    command: "GET /Move?new={new}&old={old}"
    params:
      - name: new
        type: integer
        description: New position of the track being moved.
      - name: old
        type: integer
        description: Old position of the track being moved.

  - id: clear_queue
    label: Clear Play Queue
    kind: action
    command: "GET /Clear"
    params: []

  - id: save_queue
    label: Save Queue as Playlist
    kind: action
    command: "GET /Save?name={name}"
    params:
      - name: name
        type: string
        description: Name to save the play queue under (URL-encoded).

  # --- Presets (Section 6) ---
  - id: list_presets
    label: List Presets
    kind: query
    command: "GET /Presets"
    params: []

  - id: load_preset
    label: Load Preset
    kind: action
    command: "GET /Preset?id={id}"
    params:
      - name: id
        type: string
        description: Preset id, or +1 for next preset, or -1 for previous preset.

  # --- Content Browsing and Searching (Section 7) ---
  - id: browse_top
    label: Top-Level Browse
    kind: query
    command: "GET /Browse"
    params: []

  - id: browse_key
    label: Browse by Key
    kind: query
    command: "GET /Browse?key={key}"
    params:
      - name: key
        type: string
        description: URL-encoded key from browseKey / nextKey / parentKey / contextMenuKey of prior response. Omit for top-level.

  - id: browse_with_context_menu
    label: Browse with Inline Context Menu
    kind: query
    command: "GET /Browse?key={key}&withContextMenuItems=1"
    params:
      - name: key
        type: string
        description: URL-encoded browse key.

  - id: search
    label: Search Music Content
    kind: query
    command: "GET /Browse?key={key}&q={q}"
    params:
      - name: key
        type: string
        description: URL-encoded searchKey from prior response. May be omitted for top-level search.
      - name: q
        type: string
        description: URL-encoded search string.

  # --- Player Grouping (Section 8) ---
  - id: group_one_player
    label: Group One Player (Add Slave)
    kind: action
    command: "GET /AddSlave?slave={slave}&port={port}&group={group}"
    params:
      - name: slave
        type: string
        description: IP address of the secondary player.
      - name: port
        type: integer
        description: Port of the secondary player. Default 11000.
      - name: group
        type: string
        description: OPTIONAL group name. If omitted BluOS assigns a default name.

  - id: group_multiple_players
    label: Group Multiple Players (Add Slaves)
    kind: action
    command: "GET /AddSlave?slaves={slaves}&ports={ports}"
    params:
      - name: slaves
        type: string
        description: Comma-separated IP addresses of secondary players.
      - name: ports
        type: string
        description: Comma-separated port numbers of secondary players.

  - id: remove_one_player
    label: Remove One Player From Group
    kind: action
    command: "GET /RemoveSlave?slave={slave}&port={port}"
    params:
      - name: slave
        type: string
        description: IP address of the player to remove.
      - name: port
        type: integer
        description: Port of the player to remove.

  - id: remove_multiple_players
    label: Remove Multiple Players From Group
    kind: action
    command: "GET /RemoveSlave?slaves={slaves}&ports={ports}"
    params:
      - name: slaves
        type: string
        description: Comma-separated IP addresses of secondary players to remove.
      - name: ports
        type: string
        description: Comma-separated port numbers.

  # --- Player Reboot (Section 9) ---
  - id: reboot
    label: Soft Reboot Player
    kind: action
    command: "POST /reboot"
    params:
      - name: yes
        type: string
        description: Confirmation value (any value, e.g. 1). Sent as POST body (curl example: curl -d yes=1).

  # --- Doorbell Chimes (Section 10) ---
  - id: doorbell
    label: Doorbell Chime
    kind: action
    command: "GET /Doorbell?play=1"
    params: []

  # --- Direct Input Selection (Section 11) ---
  - id: play_active_input
    label: Select Active Input by URL
    kind: action
    command: "GET /Play?url={url}"
    params:
      - name: url
        type: string
        description: URL attribute from /RadioBrowse?service=Capture response (URL-encoded).

  - id: play_external_input_index
    label: Select External Input by Index
    kind: action
    command: "GET /Play?inputIndex={inputIndex}"
    params:
      - name: inputIndex
        type: integer
        description: 1-based index of inputs from /Settings?id=capture&schemaVersion=32 in numerical order. Bluetooth excluded. (BluOS firmware newer than v3.8.0 and older than v4.2.0.)

  - id: radiobrowse_capture
    label: List Capture Inputs (RadioBrowse)
    kind: query
    command: "GET /RadioBrowse?service=Capture"
    params: []

  - id: settings_capture
    label: Get Capture Settings
    kind: query
    command: "GET /Settings?id=capture&schemaVersion=32"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: volume_state
    type: object
    description: Volume response from /Volume. Fields include db (dB level), mute (0/1), offsetDb, etag, body text = level 0..100 or -1 for fixed volume. Also muteDb / muteVolume when muted.
    source: /Volume response

  - id: playback_status
    type: object
    description: Full /Status response. Many attributes including state (play/pause/stop/stream/connecting), volume, shuffle, repeat, secs, totlen, title1/title2/title3, artist, album, name, image, quality, streamFormat, pid, prid, syncStat, etag, canSeek, etc.
    source: /Status response

  - id: sync_status
    type: object
    description: Full /SyncStatus response. Player attributes including volume, modelName, name, model, brand, etag, id, mac, group, syncStat, master (if secondary), slave(s) (if primary), zone info, battery info.
    source: /SyncStatus response

  - id: play_state
    type: enum
    values: [play, pause, stop, stream, connecting]
    description: State element returned by /Play, /Pause, /Stop. play and stream should be treated as equivalent.

  - id: shuffle_state
    type: enum
    values: ["0", "1"]
    description: Shuffle state. 0 = off, 1 = on. Returned by /Shuffle and in /Status <shuffle>.

  - id: repeat_state
    type: enum
    values: ["0", "1", "2"]
    description: Repeat state. 0 = repeat queue, 1 = repeat track, 2 = repeat off. Returned by /Repeat and in /Status <repeat>.

  - id: presets_list
    type: object
    description: /Presets response. Each preset has id, name, url, image. Root has prid.

  - id: playlist_state
    type: object
    description: /Playlist response. Attributes name, modified, length, id; song entries when listing.
```

## Variables
```yaml
variables:
  - id: volume_level
    type: integer
    range: [-1, 0, 100]
    description: Player volume 0..100; -1 means fixed volume. Set via /Volume?level=.

  - id: volume_db
    type: number
    description: Volume in dB. Typically -80..0. Set via /Volume?abs_db=.

  - id: mute
    type: integer
    enum: [0, 1]
    description: 0 = unmuted, 1 = muted. Set via /Volume?mute=.

  - id: shuffle
    type: integer
    enum: [0, 1]
    description: 0 = off, 1 = on. Set via /Shuffle?state=.

  - id: repeat
    type: integer
    enum: [0, 1, 2]
    description: 0 = repeat queue, 1 = repeat track, 2 = off. Set via /Repeat?state=.
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited (HTTP request → response).
# Long-polling via /Status and /SyncStatus with etag/timeout is the closest mechanism to event delivery.
# UNRESOLVED: no push/websocket/sse mechanism described.
```

## Macros
```yaml
# No explicit multi-step sequences documented as macros. Input selection workflows
# (Section 11.1 / 11.2) describe a 2-step sequence (query inputs → /Play?url= or /Play?inputIndex=)
# but these are presented as caller-side orchestration, not device-side macros.
# UNRESOLVED: no device-side macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements. /reboot is a soft reboot that disconnects the player (response:
# "Rebooting. Please close this window.") - caller-side confirmation recommended but not
# specified by vendor. /Doorbell pre-empts current audio (implied) but no interlock stated.
```

## Notes
- **Transport nuance:** Source calls it "TCP/IP" / "HTTP" interchangeably. Strictly, all requests are HTTP GET except `/reboot` which is POST. Underlying transport is TCP. Spec uses `http` as the protocol identifier since that is the application layer the API defines.
- **Port discovery:** Use MDNS services `musc.tcp` and `musp.tcp` to discover the actual port. 11000 is the documented default for single-node players; CI580 uses 11000/11010/11020/11030 for its four nodes.
- **Long polling:** Both `/Status` and `/SyncStatus` support long polling via `timeout` + `etag` query params. When not long-polling, clients must limit to ≤1 request per 30 seconds per resource. When long-polling, ≥1 second between consecutive requests for the same resource.
- **Grouping semantics:** Primary player = group source selector. Secondary players proxy many requests (Status, Playback, Queue, Browse) to the primary internally. To track individual secondary volume, poll each secondary's `/SyncStatus`.
- **`tell_slaves` semantics:** Only meaningful for grouped players. 0 = selected player only, 1 = all players in group.
- **Volume range:** Configurable via BluOS Controller app (Settings → Player → Audio). Typically -80..0 dB.
- **Mute parameter convention:** Source's `/Volume?mute=` description says "If set to 0, the player is muted. If set to 1, the player is unmuted" (section 3.1 table) — this is INVERTED relative to sections 3.4 (`/Volume?mute=1` = Mute On) and 3.5 (`/Volume?mute=0` = Mute Off), as well as inverted relative to every `<mute>` response attribute (1 = muted). The 3.1 parameter description appears to be a documentation error; sections 3.4/3.5 and the response attribute convention are authoritative: `mute=1` mutes, `mute=0` unmutes.
- **Input selection variants:** Section 11.1 (`/Play?url=` from `/RadioBrowse?service=Capture`) covers active inputs and HUB inputs. Section 11.2 (`/Play?inputIndex=`) covers external inputs (active or inactive) and is recommended for CI; firmware-bound to >v3.8.0 and <v4.2.0 per source. A v4.2.0+ variant is implied but not documented.
- **`/Play?url=` overloaded:** Same endpoint used for streaming a custom URL (section 4.1) and for active input selection (section 11.1) — caller context determines intent.
- **Browse key encoding:** All `key`, `browseKey`, `contextMenuKey`, `searchKey` values must be percent-encoded when used as the `key` parameter. URIs are relative with absolute path and resolved per RFC 3986.

<!-- UNRESOLVED: model coverage — source is generic BluOS CI API; not confirmed which exact models implement every command. "BluOS Bluray Player" used as device name from task input. -->
<!-- UNRESOLVED: schemaVersion — /SyncStatus returns schemaVersion attribute (e.g. "25"); /Settings examples reference schemaVersion=32 as "the latest schema version". Version-to-feature mapping not documented. -->
<!-- UNRESOLVED: firmware version → command availability table not provided (only the inputIndex boundary noted). -->
<!-- UNRESOLVED: no explicit error code / fault response catalogue. /Browse may return <error><message/><detail/></error> but no enumeration of error codes. -->
<!-- UNRESOLVED: MDNS TXT record contents not specified. -->
<!-- UNRESOLVED: BluOS HUB fixed grouping commands referenced as "out of scope for this document" — not covered. -->
````

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-10T20:30:44.027Z
last_checked_at: 2026-08-19T09:00:14.357Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:00:14.357Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions match documented BluOS CI API endpoints verbatim; transport port and base URL match the source's HTTP convention. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the generic BluOS CI API v1.7 — does not state which specific hardware models (other than example PULSE P300) implement it. \"BluOS Bluray Player\" used as device name per task input; model coverage not confirmed against device list."
- "firmware version compatibility range not stated (one sub-feature references firmware v3.8.0 and v4.2.0 boundaries only)."
- "protocol version (MDNS service discovery via musc.tcp / musp.tcp referenced but discovery details not specified)."
- "MDNS discovery details (TXT records, service instance naming) not specified beyond service names."
- "no push/websocket/sse mechanism described."
- "no device-side macros described in source."
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "model coverage — source is generic BluOS CI API; not confirmed which exact models implement every command. \"BluOS Bluray Player\" used as device name from task input."
- "schemaVersion — /SyncStatus returns schemaVersion attribute (e.g. \"25\"); /Settings examples reference schemaVersion=32 as \"the latest schema version\". Version-to-feature mapping not documented."
- "firmware version → command availability table not provided (only the inputIndex boundary noted)."
- "no explicit error code / fault response catalogue. /Browse may return <error><message/><detail/></error> but no enumeration of error codes."
- "MDNS TXT record contents not specified."
- "BluOS HUB fixed grouping commands referenced as \"out of scope for this document\" — not covered."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
