---
spec_id: admin/bluos-b400s-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS B400S Control Spec"
manufacturer: BluOS
model_family: B400S
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - B400S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:06.537Z
last_checked_at: 2026-06-02T21:54:06.537Z
generated_at: 2026-06-02T21:54:06.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is the \"BluOS Custom Integration API\" which covers many BluOS players (Bluesound, NAD Electronics, DALI Loudspeakers, etc.). The B400S model is not explicitly named in the source — spec is derived from the common BluOS CI API applicable to all standard BluOS players."
  - "The API supports long polling on /Status and /SyncStatus which returns when state changes."
  - "No multi-step macros are explicitly described in the source."
  - "No electrical safety warnings or interlock procedures stated in source."
  - "The source is the generic BluOS Custom Integration API v1.7, not a B400S-specific document. Physical input types available depend on the specific player hardware."
  - "Authentication / session management: none described in source."
  - "Error response format: source mentions <error> root element with <message> and <detail> child nodes for /Browse errors; full error handling across all endpoints not specified."
  - "Maximum number of presets, queue length limits, or concurrent connection limits not stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:06.537Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions traced to BluOS API v1.7. Comprehensive playback, volume, input, preset, grouping, and queue management documented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS B400S Control Spec

## Summary
The BluOS B400S is a network music streaming player controlled via the BluOS Custom Integration API (version 1.7). All commands are HTTP GET requests (except reboot which uses POST) sent to the player's IP address on port 11000. Responses are UTF-8 encoded XML. The API covers playback control, volume, play queue management, content browsing, preset management, player grouping, and input selection.

<!-- UNRESOLVED: The source document is the "BluOS Custom Integration API" which covers many BluOS players (Bluesound, NAD Electronics, DALI Loudspeakers, etc.). The B400S model is not explicitly named in the source — spec is derived from the common BluOS CI API applicable to all standard BluOS players. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable       # volume level 0-100 and dB control commands present
- queryable       # /Status and /SyncStatus queries returning state present
- powerable       # /reboot command present; no power on/off toggle found in source
- routable        # input selection commands present (/Play?url=, /Play?inputTypeIndex=)
```

## Actions
```yaml
# Playback Control

- id: play
  label: Play
  kind: action
  params: []
  wire:
    method: GET
    path: /Play
  notes: Resumes playback of current audio source.

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: Position in seconds to seek to in the current track. Only valid if /Status includes <totlen>.
  wire:
    method: GET
    path: "/Play?seek={seek}"

- id: play_url
  label: Play URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play directly.
  wire:
    method: GET
    path: "/Play?url={url}"

- id: pause
  label: Pause
  kind: action
  params: []
  wire:
    method: GET
    path: /Pause

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params: []
  wire:
    method: GET
    path: /Pause?toggle=1

- id: stop
  label: Stop
  kind: action
  params: []
  wire:
    method: GET
    path: /Stop

- id: skip
  label: Skip (Next Track)
  kind: action
  params: []
  wire:
    method: GET
    path: /Skip

- id: back
  label: Back (Previous Track)
  kind: action
  params: []
  wire:
    method: GET
    path: /Back

- id: shuffle_on
  label: Shuffle On
  kind: action
  params: []
  wire:
    method: GET
    path: /Shuffle?state=1

- id: shuffle_off
  label: Shuffle Off
  kind: action
  params: []
  wire:
    method: GET
    path: /Shuffle?state=0

- id: repeat_queue
  label: Repeat Queue
  kind: action
  params: []
  wire:
    method: GET
    path: /Repeat?state=0
  notes: "state=0: repeat entire play queue"

- id: repeat_track
  label: Repeat Track
  kind: action
  params: []
  wire:
    method: GET
    path: /Repeat?state=1
  notes: "state=1: repeat current track"

- id: repeat_off
  label: Repeat Off
  kind: action
  params: []
  wire:
    method: GET
    path: /Repeat?state=2
  notes: "state=2: turn repeat off"

# Volume Control

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100.
  wire:
    method: GET
    path: "/Volume?level={level}"

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: db
      type: number
      description: Volume increase in dB (typical value 2).
  wire:
    method: GET
    path: "/Volume?db={db}"

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: db
      type: number
      description: Volume decrease in dB (pass as negative value, e.g. -2).
  wire:
    method: GET
    path: "/Volume?db={db}"

- id: volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB.
  wire:
    method: GET
    path: "/Volume?abs_db={abs_db}"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  wire:
    method: GET
    path: /Volume?mute=1

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  wire:
    method: GET
    path: /Volume?mute=0

- id: volume_group
  label: Set Volume (All Group Players)
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100.
  wire:
    method: GET
    path: "/Volume?level={level}&tell_slaves=1"

# Play Queue Management

- id: list_playlist
  label: List Play Queue
  kind: action
  params: []
  wire:
    method: GET
    path: /Playlist

- id: list_playlist_status
  label: List Play Queue Status Only
  kind: action
  params: []
  wire:
    method: GET
    path: /Playlist?length=1

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track position ID to delete from the play queue.
  wire:
    method: GET
    path: "/Delete?id={id}"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Original position of the track.
    - name: new
      type: integer
      description: New position for the track.
  wire:
    method: GET
    path: "/Move?new={new}&old={old}"

- id: clear_queue
  label: Clear Queue
  kind: action
  params: []
  wire:
    method: GET
    path: /Clear

- id: save_queue
  label: Save Queue
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist.
  wire:
    method: GET
    path: "/Save?name={name}"

# Presets

- id: list_presets
  label: List Presets
  kind: action
  params: []
  wire:
    method: GET
    path: /Presets

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset ID number, or +1 for next preset, or -1 for previous preset."
  wire:
    method: GET
    path: "/Preset?id={id}"

# Content Browsing

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Optional browse key (URL-encoded). Absence returns top-level browse.
  wire:
    method: GET
    path: "/Browse?key={key}"

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Search key value from a searchKey attribute in a previous browse response.
    - name: q
      type: string
      description: The search string.
  wire:
    method: GET
    path: "/Browse?key={key}&q={q}"

# Input Selection

- id: select_input_by_url
  label: Select Input by URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response.
  wire:
    method: GET
    path: "/Play?url={url}"

- id: select_input_by_type_index
  label: Select Input by Type and Index (firmware v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Input type and index, e.g. spdif-1, analog-1, bluetooth-1, arc-1, earc-1, phono-1, coax-1, computer-1, aesebu-1, balanced-1, microphone-1."
  wire:
    method: GET
    path: "/Play?inputTypeIndex={inputTypeIndex}"
  notes: Requires firmware v4.2.0 or newer.

- id: select_input_by_index
  label: Select Input by Index (firmware v3.8.0–v4.1.x)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of inputs from /Settings?id=capture response, excluding Bluetooth.
  wire:
    method: GET
    path: "/Play?inputIndex={inputIndex}"
  notes: Works with firmware newer than v3.8.0 and older than v4.2.0.

# Player Grouping

- id: add_slave
  label: Group a Secondary Player
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player.
    - name: port
      type: integer
      description: Port of the secondary player (default 11000).
    - name: group
      type: string
      description: Optional group name; BluOS assigns default if not provided.
  wire:
    method: GET
    path: "/AddSlave?slave={slave}&port={port}"

- id: remove_slave
  label: Remove a Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the player to remove.
    - name: port
      type: integer
      description: Port of the player to remove.
  wire:
    method: GET
    path: "/RemoveSlave?slave={slave}&port={port}"

# Bluetooth

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled."
  wire:
    method: GET
    path: "/audiomodes?bluetoothAutoplay={bluetoothAutoplay}"
  notes: No response body returned.

# Doorbell

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params: []
  wire:
    method: GET
    path: /Doorbell?play=1

# Reboot

- id: reboot
  label: Reboot Player
  kind: action
  params: []
  wire:
    method: POST
    path: /reboot
    body: "yes=1"
  notes: POST request. Uses curl form: curl -d yes=1 <player_ip>/reboot (note no port in reboot example from source).

# Streaming Radio Actions

- id: radio_action
  label: Execute Radio Station Action
  kind: action
  params:
    - name: action_url
      type: string
      description: Full action URL as provided in the <action> element of a /Status response (e.g. /Action?service=Slacker&skip=...).
  wire:
    method: GET
    path: "{action_url}"
  notes: Used for skip, back, love, ban on streaming radio stations. The exact URL is dynamically provided per-station in the /Status response actions block.
```

## Feedbacks
```yaml
- id: playback_status
  label: Playback Status
  endpoint: /Status
  type: xml
  polling:
    regular: true
    long_poll: true
    long_poll_params:
      timeout: integer  # recommended ~100 seconds
      etag: string      # from previous response etag attribute
  key_attributes:
    - state           # play, pause, stop, stream, connecting, etc.
    - volume          # 0-100; -1 means fixed volume
    - mute            # 1 if muted, 0 if not
    - title1          # first line of now-playing metadata (MUST be used in UI)
    - title2          # second line of now-playing metadata
    - title3          # third line of now-playing metadata
    - album
    - artist
    - name
    - repeat          # 0=repeat queue, 1=repeat track, 2=repeat off
    - shuffle         # 0=off, 1=on
    - quality         # cd/hd/dolbyAudio/mqa/mqaAuthored or numeric bitrate
    - pid             # play queue id
    - prid            # preset id
    - syncStat        # sync status change indicator
    - secs            # seconds played (client must increment manually for play/stream state)
    - totlen          # total track length in seconds
    - sleep           # minutes until sleep timer
    - canSeek         # 1 if seek is possible
    - canMovePlayback # true if playback can be moved to another player
    - streamUrl       # present when playing from streaming source (not queue)

- id: sync_status
  label: Player and Group Sync Status
  endpoint: /SyncStatus
  type: xml
  polling:
    regular: true
    long_poll: true
    long_poll_params:
      timeout: integer  # recommended ~180 seconds
      etag: string
  key_attributes:
    - name          # player name
    - modelName     # player model name
    - model         # player model id
    - brand         # player brand
    - volume        # 0-100; -1 means fixed volume
    - mute          # 1 if muted
    - group         # group name
    - id            # player IP:port
    - mac           # player unique id / MAC address
    - initialized   # true if player is setup
    - schemaVersion
    - syncStat      # sync status id; matches syncStat in /Status

- id: volume_state
  label: Volume State
  endpoint: /Volume
  type: xml
  key_attributes:
    - volume    # current volume level 0-100; -1 for fixed
    - db        # volume in dB
    - mute      # 1 if muted, 0 if not
    - muteDb    # unmuted volume in dB (when muted)
    - muteVolume  # unmuted volume 0-100 (when muted)
```

## Variables
```yaml
- id: volume_level
  label: Volume Level
  type: integer
  range: 0-100
  description: Player volume level. -1 indicates fixed volume.
  get_endpoint: /Volume
  set_endpoint: "/Volume?level={value}"

- id: volume_db
  label: Volume Level (dB)
  type: number
  description: Volume level in dB. Range typically -80 to 0.
  get_endpoint: /Volume
  set_endpoint: "/Volume?abs_db={value}"

- id: mute_state
  label: Mute State
  type: boolean
  description: "1 = muted, 0 = unmuted."
  get_endpoint: /Volume
  set_endpoint: "/Volume?mute={value}"

- id: shuffle_state
  label: Shuffle State
  type: boolean
  description: "1 = shuffled, 0 = not shuffled."
  get_endpoint: /Status
  set_endpoint: "/Shuffle?state={value}"

- id: repeat_state
  label: Repeat State
  type: enum
  values:
    - 0  # repeat queue
    - 1  # repeat track
    - 2  # repeat off
  get_endpoint: /Status
  set_endpoint: "/Repeat?state={value}"
```

## Events
```yaml
# UNRESOLVED: The API supports long polling on /Status and /SyncStatus which returns when state changes.
# These are polling-based state change notifications rather than true push events.
# No unsolicited push notifications are described in the source.

- id: status_changed
  label: Playback Status Changed
  mechanism: long-poll
  endpoint: /Status
  notes: Use timeout and etag parameters. Returns only when state changes or timeout expires.

- id: sync_status_changed
  label: Sync Status Changed
  mechanism: long-poll
  endpoint: /SyncStatus
  notes: Use timeout and etag parameters. Recommended for tracking volume and grouping of players.
```

## Macros
```yaml
# UNRESOLVED: No multi-step macros are explicitly described in the source.
# The following are common integration patterns implied by the documentation:

- id: get_and_play_input
  label: Discover and Select Physical Input
  description: >
    Step 1: GET /RadioBrowse?service=Capture to obtain current input URLs.
    Step 2: GET /Play?url={URL_from_step1} to activate the input.
  notes: Required for active input selection. Alternatively use /Play?inputTypeIndex= (firmware v4.2.0+).
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # soft reboots the player; interrupts all active playback
interlocks: []
# UNRESOLVED: No electrical safety warnings or interlock procedures stated in source.
# Reboot (POST /reboot) is a disruptive action and should require confirmation in control UIs.
```

## Notes
- All requests are HTTP GET (except /reboot which uses HTTP POST with form body `yes=1`).
- Port 11000 is used for all standard BluOS players. The CI580 multi-zone chassis uses ports 11000, 11010, 11020, 11030 for nodes 1-4. The actual port should be discovered via mDNS (services `musc._tcp` and `musp._tcp`) or via the proprietary LSDP (Lenbrook Service Discovery Protocol) using UDP broadcast on port 11430.
- Long polling is supported on `/Status` and `/SyncStatus`. When long polling, do not make two consecutive requests for the same resource less than 1 second apart. When not long polling, restrict to at most one request every 30 seconds.
- The `secs` attribute in `/Status` is excluded from etag calculation; clients must manually increment playback position when state is `play` or `stream`.
- When `<streamUrl>` is present in `/Status`, the player is not using the play queue; shuffle/repeat controls and next/previous track are not applicable.
- The `title1`, `title2`, `title3` attributes MUST be used (not `album`/`artist`/`name`) for any 3-line now-playing UI display. Similarly `twoline_title1` and `twoline_title2` for 2-line displays.
- Input selection for firmware v4.2.0+ uses `/Play?inputTypeIndex=type-index` (e.g. `spdif-2` for Optical Input 2). For older firmware (v3.8.0–v4.1.x) use `/Play?inputIndex=N` where N is the 1-based non-Bluetooth input index from `/Settings?id=capture&schemaVersion=32`.
- Grouped players: secondary players proxy most requests to the primary player. Use `/SyncStatus` long polling to track individual secondary player volumes.
- Service discovery: LSDP uses UDP broadcast on port 11430 with Announce messages ~every 60 seconds. Class ID 0x0001 = BluOS Player, 0x0003 = BluOS secondary player (multi-zone), 0x0008 = BluOS Hub.

<!-- UNRESOLVED: The source is the generic BluOS Custom Integration API v1.7, not a B400S-specific document. Physical input types available depend on the specific player hardware. -->
<!-- UNRESOLVED: Authentication / session management: none described in source. -->
<!-- UNRESOLVED: Error response format: source mentions <error> root element with <message> and <detail> child nodes for /Browse errors; full error handling across all endpoints not specified. -->
<!-- UNRESOLVED: Maximum number of presets, queue length limits, or concurrent connection limits not stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:06.537Z
last_checked_at: 2026-06-02T21:54:06.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:06.537Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions traced to BluOS API v1.7. Comprehensive playback, volume, input, preset, grouping, and queue management documented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is the \"BluOS Custom Integration API\" which covers many BluOS players (Bluesound, NAD Electronics, DALI Loudspeakers, etc.). The B400S model is not explicitly named in the source — spec is derived from the common BluOS CI API applicable to all standard BluOS players."
- "The API supports long polling on /Status and /SyncStatus which returns when state changes."
- "No multi-step macros are explicitly described in the source."
- "No electrical safety warnings or interlock procedures stated in source."
- "The source is the generic BluOS Custom Integration API v1.7, not a B400S-specific document. Physical input types available depend on the specific player hardware."
- "Authentication / session management: none described in source."
- "Error response format: source mentions <error> root element with <message> and <detail> child nodes for /Browse errors; full error handling across all endpoints not specified."
- "Maximum number of presets, queue length limits, or concurrent connection limits not stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
