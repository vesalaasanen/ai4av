---
spec_id: admin/nad-t778-with-volume-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T778 (with Volume) Series Control Spec"
manufacturer: NAD
model_family: "NAD T778 (with Volume) Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD T778 (with Volume) Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T23:31:27.763Z
last_checked_at: 2026-05-16T23:31:27.763Z
generated_at: 2026-05-16T23:31:27.763Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /Playlist
  - /RadioBrowse
  - "The source document covers all BluOS-capable NAD products; NAD T778-specific input types (HDMI ARC, analog, optical, etc.) available on this model are not individually enumerated in the source."
  - "no WebSocket or other push-notification mechanism described in source"
  - "no multi-step macros described in source"
  - "NAD T778-specific model capabilities (e.g. exact set of physical inputs, HDMI ARC/eARC support, preamp output behavior) not specified in source — source covers all BluOS devices generically."
  - "firmware version compatibility for all API commands not stated; inputTypeIndex requires v4.2.0+, inputIndex requires v3.8.0 to v4.2.0."
  - "volume range minimum/maximum values are device-configured (\"typically -80..0\") and not hard-coded in the API; the actual configured range for the T778 is not stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-16T23:31:27.763Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions map to literal source commands verbatim; transport port 11000 confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# NAD T778 (with Volume) Series Control Spec

## Summary

The NAD T778 (with Volume) Series uses the BluOS Custom Integration API (v1.7) for IP-based control over HTTP on port 11000. This spec covers playback control, volume and mute, play queue management, preset loading, content browsing, input selection, player grouping, and device discovery via the Lenbrook Service Discovery Protocol (LSDP). All commands are HTTP GET requests (except /reboot which uses HTTP POST); responses are UTF-8 encoded XML.

<!-- UNRESOLVED: The source document covers all BluOS-capable NAD products; NAD T778-specific input types (HDMI ARC, analog, optical, etc.) available on this model are not individually enumerated in the source. -->

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
- levelable       # inferred from volume control commands present
- queryable       # inferred from /Status and /SyncStatus query commands present
- routable        # inferred from input selection and player grouping commands present
```

## Actions

```yaml
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
  notes: "GET /Play?seek={seconds}"

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL of custom audio
  notes: "GET /Play?url={encodedStreamURL}"

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
  notes: "GET /Skip"

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  notes: "GET /Back — returns to start of track if >4s elapsed, else previous track"

- id: shuffle_on
  label: Shuffle On
  kind: action
  params: []
  notes: "GET /Shuffle?state=1"

- id: shuffle_off
  label: Shuffle Off
  kind: action
  params: []
  notes: "GET /Shuffle?state=0"

- id: repeat_queue
  label: Repeat Queue
  kind: action
  params: []
  notes: "GET /Repeat?state=0 — repeats the entire play queue"

- id: repeat_track
  label: Repeat Track
  kind: action
  params: []
  notes: "GET /Repeat?state=1 — repeats the current track"

- id: repeat_off
  label: Repeat Off
  kind: action
  params: []
  notes: "GET /Repeat?state=2"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0–100
    - name: tell_slaves
      type: integer
      description: "0 = only this player, 1 = all players in group (optional)"
  notes: "GET /Volume?level={level}&tell_slaves={on_off}"

- id: set_volume_db
  label: Set Volume (absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (within configured range, typically -80..0)
  notes: "GET /Volume?abs_db={db}"

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: db
      type: number
      description: Volume increase in dB (typical value 2)
  notes: "GET /Volume?db={positive_db_value}"

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: db
      type: number
      description: Volume decrease in dB (typical value -2, must be negative)
  notes: "GET /Volume?db={negative_db_value}"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  notes: "GET /Volume?mute=1"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  notes: "GET /Volume?mute=0"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, '+1' for next preset, or '-1' for previous preset"
  notes: "GET /Preset?id={presetId|-1|+1}"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id (position) to remove from current play queue
  notes: "GET /Delete?id={position}"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: new
      type: integer
      description: New position
    - name: old
      type: integer
      description: Old (current) position
  notes: "GET /Move?new={destination}&old={origin}"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  notes: "GET /Clear"

- id: save_queue
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist
  notes: "GET /Save?name={playlist_name}"

- id: select_active_input
  label: Select Active Input
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response
  notes: "GET /Play?url={URL_value}"

- id: select_input_by_type_index
  label: Select Input by Type Index (firmware v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Type-index string, e.g. 'spdif-1', 'analog-1', 'bluetooth-1', 'arc-1', 'earc-1', 'phono-1', 'coax-1', 'computer-1', 'aesebu-1', 'balanced-1', 'microphone-1'"
  notes: "GET /Play?inputTypeIndex={type-index}"

- id: select_input_by_index
  label: Select Input by Index (firmware v3.8.0 to v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: Index (1-based) of input from /Settings?id=capture response; Bluetooth excluded
  notes: "GET /Play?inputIndex={IndexId}"

- id: group_add_player
  label: Group Add Player
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to add
    - name: port
      type: integer
      description: Port number of secondary player (default 11000)
    - name: group
      type: string
      description: Group name (optional)
  notes: "GET /AddSlave?slave={ip}&port={port}&group={name}"

- id: group_add_players
  label: Group Add Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players
    - name: ports
      type: string
      description: Comma-separated port numbers corresponding to each slave
  notes: "GET /AddSlave?slaves={ip1,ip2}&ports={port1,port2}"

- id: group_remove_player
  label: Group Remove Player
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove
    - name: port
      type: integer
      description: Port number of the secondary player
  notes: "GET /RemoveSlave?slave={ip}&port={port}"

- id: group_remove_players
  label: Group Remove Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to remove
    - name: ports
      type: string
      description: Comma-separated port numbers
  notes: "GET /RemoveSlave?slaves={ip1,ip2}&ports={port1,port2}"

- id: reboot
  label: Reboot Player
  kind: action
  params: []
  notes: "HTTP POST to /reboot with body yes=1"

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  params: []
  notes: "GET /Doorbell?play=1"

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"
  notes: "GET /audiomodes?bluetoothAutoplay={value}"

- id: browse_content
  label: Browse Content
  kind: action
  params:
    - name: key
      type: string
      description: Optional URL-encoded browse key from previous /Browse response; omit for top-level browse
    - name: withContextMenuItems
      type: integer
      description: "Set to 1 to include inline context menus (optional)"
  notes: "GET /Browse?key={key-value}&withContextMenuItems=1"

- id: search_content
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from a previous /Browse response
    - name: q
      type: string
      description: Search string
  notes: "GET /Browse?key={searchKey}&q={searchText}"

- id: streaming_radio_action
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action_params
      type: string
      description: Action parameters taken from the <action> element URL in /Status response
  notes: "GET /Action?service={service}&{action_params} — URLs are provided by <action> elements in /Status response"
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  type: object
  description: "Full playback state from GET /Status. Key fields: state (play|pause|stop|stream|connecting), volume (0–100 or -1 for fixed), mute (0|1), shuffle (0|1), repeat (0|1|2), title1, title2, title3, artist, album, totlen, secs, service, streamFormat, syncStat, pid, prid, sleep"
  notes: "Supports long polling: GET /Status?timeout={seconds}&etag={etag-from-previous-response}"

- id: sync_status
  label: Player and Group Sync Status
  type: object
  description: "Player and grouping info from GET /SyncStatus. Key fields: volume (0–100 or -1 for fixed), mute (0|1), name, modelName, model, brand, group, id (IP:port), mac, initialized, master, slave entries, syncStat, zone, zoneMaster, zoneSlave"
  notes: "Supports long polling: GET /SyncStatus?timeout={seconds}&etag={etag}"

- id: volume_state
  label: Volume State
  type: object
  description: "Volume info from GET /Volume. Fields: volume (0–100 or -1 for fixed), db (dB level), mute (0|1), muteDb (pre-mute dB if muted), muteVolume (pre-mute level 0–100 if muted)"

- id: player_state
  label: Playback State
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: "Current player state from /Status <state> element. play and stream are equivalent."

- id: queue_state
  label: Play Queue State
  type: object
  description: "Queue metadata from GET /Playlist?length=1. Fields: length (total tracks), id (queue id matching /Status <pid>), name, modified (0|1)"

- id: preset_list
  label: Preset List
  type: object
  description: "List of all presets from GET /Presets. Each preset has: id, name, url, image. prid matches /Status <prid>."
```

## Variables

```yaml
- id: volume_level
  label: Volume Level
  type: integer
  range: [0, 100]
  description: "Absolute volume level (0–100). -1 indicates fixed volume. Set via GET /Volume?level={level}"

- id: volume_db
  label: Volume Level (dB)
  type: number
  description: "Volume in dB within configured range (typically -80..0). Set via GET /Volume?abs_db={db}"

- id: mute
  label: Mute State
  type: integer
  values: [0, 1]
  description: "0 = unmuted, 1 = muted. Set via GET /Volume?mute={0|1}"

- id: shuffle_state
  label: Shuffle State
  type: integer
  values: [0, 1]
  description: "0 = off, 1 = on. Set via GET /Shuffle?state={0|1}"

- id: repeat_state
  label: Repeat State
  type: integer
  values: [0, 1, 2]
  description: "0 = repeat queue, 1 = repeat track, 2 = off. Set via GET /Repeat?state={0|1|2}"

- id: bluetooth_mode
  label: Bluetooth Mode
  type: integer
  values: [0, 1, 2, 3]
  description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled. Set via GET /audiomodes?bluetoothAutoplay={value}"
```

## Events

```yaml
# No unsolicited push notifications described in source.
# Long polling on /Status and /SyncStatus is the mechanism for change detection.
# - /Status long poll: recommended timeout 100 seconds; minimum 10 seconds between consecutive calls
# - /SyncStatus long poll: recommended timeout 180 seconds
# - Without long polling: client must not poll faster than once every 30 seconds
# UNRESOLVED: no WebSocket or other push-notification mechanism described in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for:
  - reboot
interlocks: []
# Note: /reboot requires HTTP POST (not GET) with body yes=1; a GET will not trigger reboot.
# Note: /Delete with wrong track id removes the wrong track permanently from the queue — no undo described in source.
```

## Notes

**Port discovery:** Port 11000 is used for all BluOS players except the NAD CI580 (which uses 11000, 11010, 11020, 11030 for its four internal nodes). The correct port should be discovered using mDNS (services `_musc._tcp` / `_musp._tcp`) or the Lenbrook Service Discovery Protocol (LSDP) on UDP broadcast port 11430.

**Long-polling pattern:** Two endpoints support long polling: `/Status` (playback + volume) and `/SyncStatus` (grouping + volume per player). The `etag` from the previous response is passed back; a response is only returned when state has changed or timeout expires. Clients must not issue two consecutive long-poll requests for the same resource less than 1 second apart.

**Playback state — play vs stream:** The `state` values `play` and `stream` have the same meaning. When `<streamUrl>` is present in `/Status`, the play queue is not the source; shuffle, repeat, and track position (song) are irrelevant.

**Input selection — firmware version dependency:** Two different parameter forms exist for external input selection:
- Firmware v3.8.0 to v4.2.0: `/Play?inputIndex={1-based-index}` (Bluetooth excluded from index)
- Firmware v4.2.0 or newer: `/Play?inputTypeIndex={type-index}` (e.g. `spdif-1`, `analog-1`, `arc-1`)

**Grouped players:** Secondary players proxy most requests (/Status, playback, queue, browse) to the primary player. Use `/SyncStatus` long polling to track per-player volume in a group. When setting group volume, use `tell_slaves=1` to apply to all players.

**Polling rate without long polling:** Clients must restrict to at most one request every 30 seconds per resource.

**LSDP discovery:** The Lenbrook Service Discovery Protocol uses UDP broadcast on port 11430. BluOS players broadcast Announce messages approximately every minute. Class ID `0x0001` identifies a BluOS Player.

<!-- UNRESOLVED: NAD T778-specific model capabilities (e.g. exact set of physical inputs, HDMI ARC/eARC support, preamp output behavior) not specified in source — source covers all BluOS devices generically. -->
<!-- UNRESOLVED: firmware version compatibility for all API commands not stated; inputTypeIndex requires v4.2.0+, inputIndex requires v3.8.0 to v4.2.0. -->
<!-- UNRESOLVED: volume range minimum/maximum values are device-configured ("typically -80..0") and not hard-coded in the API; the actual configured range for the T778 is not stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T23:31:27.763Z
last_checked_at: 2026-05-16T23:31:27.763Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T23:31:27.763Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions map to literal source commands verbatim; transport port 11000 confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /Playlist
- /RadioBrowse
- "The source document covers all BluOS-capable NAD products; NAD T778-specific input types (HDMI ARC, analog, optical, etc.) available on this model are not individually enumerated in the source."
- "no WebSocket or other push-notification mechanism described in source"
- "no multi-step macros described in source"
- "NAD T778-specific model capabilities (e.g. exact set of physical inputs, HDMI ARC/eARC support, preamp output behavior) not specified in source — source covers all BluOS devices generically."
- "firmware version compatibility for all API commands not stated; inputTypeIndex requires v4.2.0+, inputIndex requires v3.8.0 to v4.2.0."
- "volume range minimum/maximum values are device-configured (\"typically -80..0\") and not hard-coded in the API; the actual configured range for the T778 is not stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
