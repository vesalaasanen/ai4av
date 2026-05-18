---
spec_id: admin/bluos-b160s-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS B160S Volume Control Control Spec"
manufacturer: BluOS
model_family: B160S
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - B160S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T17:23:03.849Z
generated_at: 2026-05-16T17:23:03.849Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T17:23:03.849Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions have verbatim HTTP endpoint matches in the source; transport port 11000 and POST /reboot confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS B160S Volume Control Control Spec

## Summary

The BluOS B160S is a networked audio player / volume control running BluOS firmware. This spec covers the BluOS Custom Integration API v1.7, which exposes HTTP GET (and one POST) endpoints for volume control, playback control, queue management, presets, content browsing, player grouping, input selection, and reboot. All requests target `http://<player_ip>:<port>/<endpoint>` and responses are UTF-8 encoded XML.

<!-- UNRESOLVED: The source document is the BluOS Custom Integration API v1.7 and does not contain B160S-specific hardware details (physical I/O count, amplifier specs, supported input types for this model). Commands for firmware v3.8.0 vs v4.2.0 branches are documented for external input selection; exact firmware compatibility ranges for other endpoints are not stated. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # stated in source; note CI580 uses 11010/11020/11030 for nodes 2/3/4
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable       # volume set/up/down/mute commands present
- queryable       # /Status, /SyncStatus, /Volume, /Playlist, /Presets return state
- routable        # input selection commands present (/Play?url=, /Play?inputTypeIndex=)
```

## Actions

```yaml
# --- Volume ---
- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level, 0–100
    - name: tell_slaves
      type: integer
      description: "0 = only this player, 1 = all players in group (optional)"
  request: "GET /Volume?level={level}&tell_slaves={tell_slaves}"

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (typically -80..0)
    - name: tell_slaves
      type: integer
      description: "0 = only this player, 1 = all players in group (optional)"
  request: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"

- id: adjust_volume_db
  label: Adjust Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative dB change; positive = up, negative = down (typical +/-2)
    - name: tell_slaves
      type: integer
      description: "0 = only this player, 1 = all players in group (optional)"
  request: "GET /Volume?db={db}&tell_slaves={tell_slaves}"

- id: mute_on
  label: Mute
  kind: action
  params: []
  request: "GET /Volume?mute=1"

- id: mute_off
  label: Unmute
  kind: action
  params: []
  request: "GET /Volume?mute=0"

# --- Playback ---
- id: play
  label: Play
  kind: action
  params: []
  request: "GET /Play"

- id: play_seek
  label: Play from Position
  kind: action
  params:
    - name: seek
      type: integer
      description: Position in seconds within current track
  request: "GET /Play?seek={seek}"

- id: play_url
  label: Play URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL
  request: "GET /Play?url={url}"

- id: pause
  label: Pause
  kind: action
  params: []
  request: "GET /Pause"

- id: pause_toggle
  label: Toggle Pause
  kind: action
  params: []
  request: "GET /Pause?toggle=1"

- id: stop
  label: Stop
  kind: action
  params: []
  request: "GET /Stop"

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  request: "GET /Skip"

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  request: "GET /Back"

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = disable shuffle, 1 = enable shuffle"
  request: "GET /Shuffle?state={state}"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off"
  request: "GET /Repeat?state={state}"

# --- Presets ---
- id: list_presets
  label: List Presets
  kind: action
  params: []
  request: "GET /Presets"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id, or +1 for next preset, or -1 for previous preset"
  request: "GET /Preset?id={id}"

# --- Queue Management ---
- id: list_playlist
  label: List Play Queue
  kind: action
  params:
    - name: start
      type: integer
      description: First track index (0-based, optional)
    - name: end
      type: integer
      description: Last track index (optional)
  request: "GET /Playlist?start={start}&end={end}"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track position in queue
  request: "GET /Delete?id={id}"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Current position of the track
    - name: new
      type: integer
      description: Destination position for the track
  request: "GET /Move?new={new}&old={old}"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  request: "GET /Clear"

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist
  request: "GET /Save?name={name}"

# --- Content Browsing ---
- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Browse key (URL-encoded); absent for top-level browse (optional)
    - name: withContextMenuItems
      type: integer
      description: "Set to 1 to include inline context menus (optional)"
  request: "GET /Browse?key={key}&withContextMenuItems={withContextMenuItems}"

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: searchKey value from a prior browse response
    - name: q
      type: string
      description: Search term
  request: "GET /Browse?key={key}&q={q}"

# --- Player Grouping ---
- id: add_slave
  label: Add Secondary Player to Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player
    - name: port
      type: integer
      description: Port of the secondary player (default 11000)
    - name: group
      type: string
      description: Optional group name
  request: "GET /AddSlave?slave={slave}&port={port}&group={group}"

- id: add_slaves
  label: Add Multiple Secondary Players to Group
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players
    - name: ports
      type: string
      description: Comma-separated port numbers corresponding to slaves
  request: "GET /AddSlave?slaves={slaves}&ports={ports}"

- id: remove_slave
  label: Remove Secondary Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove
    - name: port
      type: integer
      description: Port of the secondary player
  request: "GET /RemoveSlave?slave={slave}&port={port}"

- id: remove_slaves
  label: Remove Multiple Secondary Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to remove
    - name: ports
      type: string
      description: Comma-separated port numbers
  request: "GET /RemoveSlave?slaves={slaves}&ports={ports}"

# --- Input Selection ---
- id: select_active_input
  label: Select Active Input (by URL)
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response
  request: "GET /Play?url={url}"

- id: select_external_input_index
  label: Select External Input by Index (firmware < v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture (Bluetooth excluded); firmware v3.8.0–v4.1.x"
  request: "GET /Play?inputIndex={inputIndex}"

- id: select_external_input_type
  label: Select External Input by Type (firmware >= v4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: {type}-{index}, e.g. spdif-1, analog-1, bluetooth, arc-1, phono-1"
  request: "GET /Play?inputTypeIndex={inputTypeIndex}"

# --- Bluetooth Mode ---
- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"
  request: "GET /audiomodes?bluetoothAutoplay={bluetoothAutoplay}"

# --- Doorbell ---
- id: play_doorbell
  label: Play Doorbell Chime
  kind: action
  params: []
  request: "GET /Doorbell?play=1"

# --- Reboot ---
- id: reboot
  label: Reboot Player
  kind: action
  params: []
  notes: "Uses HTTP POST with parameter yes=1; e.g. POST /reboot with body: yes=1"
  request: "POST /reboot (body: yes=1)"
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  type: object
  description: "Full playback and volume state from GET /Status"
  fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
    - name: volume
      type: integer
      description: "Volume level 0–100; -1 means fixed volume"
    - name: db
      type: number
      description: Volume level in dB
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteVolume
      type: integer
      description: Unmuted volume (0..100) when muted
    - name: muteDb
      type: number
      description: Unmuted dB when muted
    - name: shuffle
      type: integer
      values: [0, 1]
    - name: repeat
      type: integer
      values: [0, 1, 2]
      description: "0 = repeat queue, 1 = repeat track, 2 = off"
    - name: title1
      type: string
      description: First line of now-playing metadata (use this, not name/artist)
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
      description: Seconds played in current track (does not drive long-poll etag)
    - name: canSeek
      type: integer
      values: [0, 1]
    - name: syncStat
      type: string
      description: Opaque id; changes when SyncStatus changes
    - name: etag
      type: string
      description: Opaque etag for long-polling

- id: sync_status
  label: Player and Group Sync Status
  type: object
  description: "Player grouping and volume state from GET /SyncStatus"
  fields:
    - name: volume
      type: integer
      description: "Volume 0..100; -1 = fixed"
    - name: db
      type: number
      description: Volume in dB
    - name: mute
      type: integer
      values: [0, 1]
    - name: name
      type: string
      description: Player name
    - name: model
      type: string
    - name: brand
      type: string
    - name: group
      type: string
      description: Group name (primary player only)
    - name: syncStat
      type: string
      description: Changes when any SyncStatus item changes
    - name: etag
      type: string

- id: volume_response
  label: Volume Response
  type: object
  description: "Returned by GET /Volume (query or set)"
  fields:
    - name: volume
      type: integer
      description: "Current volume 0..100; -1 = fixed"
    - name: db
      type: number
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteDb
      type: number
    - name: muteVolume
      type: integer
    - name: etag
      type: string
```

## Variables

```yaml
- id: long_poll_timeout
  label: Long Poll Timeout
  type: integer
  description: "Seconds for long-polling /Status or /SyncStatus. Recommended: 100s for /Status, 180s for /SyncStatus. Never faster than 10s. Non-long-poll rate: at most 1 request/30s."

- id: group_volume
  label: Group Volume (tell_slaves)
  type: integer
  description: "Pass tell_slaves=1 with /Volume commands to apply volume change to all grouped players simultaneously."
```

## Events

```yaml
# Long-poll mechanism: /Status and /SyncStatus accept timeout + etag parameters.
# The server holds the connection and returns only when state changes or timeout expires.
# etag is returned in each response root element and must be echoed in the next long-poll call.
# - Polling /Status covers playback + volume + syncStat change indicator.
# - Polling /SyncStatus covers per-player name, volume, and grouping (especially for secondary players).
# Clients must not make two consecutive requests for the same resource less than 1 second apart,
# even if the prior response returned in under 1 second.
# UNRESOLVED: no unsolicited push/WebSocket notifications documented; polling is the only mechanism.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source.
# Typical integration pattern for input selection:
# 1. GET /RadioBrowse?service=Capture to discover active input URLs
# 2. GET /Play?url={URL} to switch input
# For external inputs (firmware >= v4.2.0): GET /Play?inputTypeIndex={type}-{index} directly.
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # irreversible soft reboot via POST /reboot?yes=1
interlocks: []
# UNRESOLVED: no power interlock or sequencing requirements stated in source.
# Reboot response is "Settings Updated / Rebooting. Please close this window." — no recovery confirmation.
```

## Notes

- **Port discovery:** Port 11000 is standard. The CI580 (four-node chassis) uses 11010/11020/11030 for nodes 2/3/4. Actual port should be discovered via mDNS services `musc._tcp` and `musp._tcp`.
- **Long-poll rate limits:** When NOT long-polling, restrict to at most 1 request per 30 seconds. When long-polling, never make two consecutive requests for the same resource less than 1 second apart.
- **Secondary player proxying:** When a player is grouped as secondary, /Status, playback, queue, and browse requests directed to it are internally proxied to the primary player. Use /SyncStatus on secondary players to track their individual volume.
- **etag semantics:** The etag in /Status and /SyncStatus is opaque. If etag is unchanged, the response is guaranteed unchanged (except `secs`, which is excluded from etag calculation).
- **Input selection firmware split:** `/Play?inputIndex=` works for firmware v3.8.0–v4.1.x; `/Play?inputTypeIndex=` works for v4.2.0+. Use the type-index form for new integrations where firmware version is v4.2.0 or newer.
- **Streaming radio actions:** Skip/back/love/ban for streaming stations use `/Action?service=...&<action>=<id>` where the exact URL is provided by `<action>` elements in the /Status response — do not hard-code these URLs.
- **All requests are HTTP GET** except `/reboot`, which requires HTTP POST with form body `yes=1`.
- **Responses are XML** (UTF-8). Integrators should ignore undocumented elements in responses.

<!-- UNRESOLVED: B160S-specific hardware capabilities (number of analog/optical/HDMI inputs, amplifier specs) not documented in this API reference. The source is a generic BluOS CI API guide; B160S model-specific constraints are not stated. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T17:23:03.849Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T17:23:03.849Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions have verbatim HTTP endpoint matches in the source; transport port 11000 and POST /reboot confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
