---
spec_id: admin/bluos-m10-v-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS M10 V Series Control Spec"
manufacturer: BluOS
model_family: "BluOS M10 V Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS M10 V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T21:09:54.783Z
last_checked_at: 2026-05-16T19:32:27.434Z
generated_at: 2026-05-16T19:32:27.434Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is the BluOS Custom Integration API and does not name the M10 V Series explicitly — it covers all BluOS players generically. Port 11000 applies to standard BluOS players; the CI580 uses ports 11000/11010/11020/11030. Physical/electrical specifications not covered."
  - "no persistent settable parameters beyond commands documented; populate from source if applicable"
  - "no multi-step sequences described explicitly in source"
  - "no safety warnings or interlock procedures found in source."
  - "No power on/off commands found in source (only /reboot POST). Physical specifications, firmware compatibility ranges beyond the noted v3.8.0/v4.2.0 boundaries, and error response handling details are not documented in this source."
verification:
  verdict: verified
  checked_at: 2026-05-16T19:32:27.434Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions match verbatim HTTP endpoints in the BluOS CI API source; transport port 11000 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS M10 V Series Control Spec

## Summary

The BluOS M10 V Series is a BluOS-enabled network music player that supports IP-based control via the BluOS Custom Integration API (version 1.7). This spec covers the HTTP GET/POST command set for playback control, volume management, play queue management, presets, content browsing, player grouping, and input selection. All commands are sent as HTTP requests to `http://<player_ip>:11000/<endpoint>` and responses are UTF-8 encoded XML.

<!-- UNRESOLVED: The source document is the BluOS Custom Integration API and does not name the M10 V Series explicitly — it covers all BluOS players generically. Port 11000 applies to standard BluOS players; the CI580 uses ports 11000/11010/11020/11030. Physical/electrical specifications not covered. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
  # Port discovered via mDNS (_musc._tcp, _musp._tcp) or LSDP (UDP port 11430)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable    # inferred from volume control commands (/Volume?level=, /Volume?db=, /Volume?mute=)
- routable     # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=)
- powerable    # inferred: /reboot (POST) present; no explicit power on/off found in source
```

## Actions

```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  params: []
  command: "GET /Play"
  notes: "Starts playback of the current audio source."

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: "Jump to position in seconds within the current track. Only valid if /Status includes <totlen>."
  command: "GET /Play?seek={seek}"

- id: play_seek_track
  label: Play Seek at Track
  kind: action
  params:
    - name: seek
      type: integer
      description: "Position in seconds."
    - name: id
      type: integer
      description: "Track id (position) in the play queue."
  command: "GET /Play?seek={seek}&id={id}"

- id: play_stream_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded stream URL of the audio to play."
  command: "GET /Play?url={encodedStreamURL}"

- id: pause
  label: Pause
  kind: action
  params: []
  command: "GET /Pause"
  notes: "Pauses the currently playing audio. If an alarm is playing with a timeout, the alarm timeout is canceled."

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params: []
  command: "GET /Pause?toggle=1"
  notes: "Toggles the current pause state."

- id: stop
  label: Stop
  kind: action
  params: []
  command: "GET /Stop"
  notes: "Stops the current playing audio. If an alarm is playing with a timeout, the alarm timeout is canceled."

- id: skip
  label: Skip
  kind: action
  params: []
  command: "GET /Skip"
  notes: "Skip to the next audio track in the play queue. Not available for sources with <streamUrl> that have no skip action."

- id: back
  label: Back
  kind: action
  params: []
  command: "GET /Back"
  notes: "If track has been playing more than 4 seconds, returns to start of current track. Otherwise goes to previous track."

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 to disable shuffle, 1 to enable shuffle."
  command: "GET /Shuffle?state={state}"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat entire queue, 1 = repeat current track, 2 = repeat off."
  command: "GET /Repeat?state={state}"

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  params:
    - name: service
      type: string
      description: "Service name (e.g. Slacker)."
    - name: action
      type: string
      description: "Action URL from /Status <actions> element (e.g. skip=trackid, ban=trackid, love=trackid)."
  command: "GET /Action?service={service}&{action}"
  notes: "Used for skip, back, love, ban actions on streaming radio stations. Action URL is taken from <action> element in /Status response."

# --- Volume Control ---

- id: set_volume
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume level, 0–100."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all players in group."
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: "Absolute volume in dB."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all grouped players."
  command: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"

- id: volume_relative_db
  label: Relative Volume Change (dB)
  kind: action
  params:
    - name: db
      type: number
      description: "Relative volume change in dB. Positive to increase, negative to decrease."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player, 1 = all grouped players."
  command: "GET /Volume?db={db}&tell_slaves={tell_slaves}"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: "GET /Volume?mute=1"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: "GET /Volume?mute=0"

# --- Play Queue Management ---

- id: list_tracks
  label: List Play Queue
  kind: action
  params:
    - name: length
      type: integer
      description: "Optional. Set to 1 to return only queue status (no track details)."
    - name: start
      type: integer
      description: "Optional. First entry (0-based) for pagination."
    - name: end
      type: integer
      description: "Optional. Last entry for pagination."
  command: "GET /Playlist"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: "Track id (position) of the track to remove."
  command: "GET /Delete?id={id}"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: "Current position of the track."
    - name: new
      type: integer
      description: "Destination position."
  command: "GET /Move?new={new}&old={old}"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  command: "GET /Clear"

- id: save_queue
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: "Name for the saved playlist."
  command: "GET /Save?name={name}"

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  params: []
  command: "GET /Presets"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id to load. Use +1 for next preset, -1 for previous preset."
  command: "GET /Preset?id={id}"

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from a previous browse response. Absent for top-level browse."
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menus in response."
  command: "GET /Browse?key={key}&withContextMenuItems={withContextMenuItems}"

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Search key from a searchKey attribute in a previous browse response."
    - name: q
      type: string
      description: "Search string."
  command: "GET /Browse?key={key}&q={q}"

# --- Player Grouping ---

- id: add_slave
  label: Group Secondary Player
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of the secondary player."
    - name: port
      type: integer
      description: "Port number of the secondary player (default 11000)."
    - name: group
      type: string
      description: "Optional group name."
  command: "GET /AddSlave?slave={slave}&port={port}&group={group}"

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of secondary players."
    - name: ports
      type: string
      description: "Comma-separated port numbers of secondary players."
  command: "GET /AddSlave?slaves={slaves}&ports={ports}"

- id: remove_slave
  label: Remove Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of the secondary player to remove."
    - name: port
      type: integer
      description: "Port number of the secondary player."
  command: "GET /RemoveSlave?slave={slave}&port={port}"

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of secondary players."
    - name: ports
      type: string
      description: "Comma-separated port numbers."
  command: "GET /RemoveSlave?slaves={slaves}&ports={ports}"

# --- Input Selection ---

- id: select_input_active
  label: Select Active Input (by URL)
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded URL attribute from /RadioBrowse?service=Capture response."
  command: "GET /Play?url={url}"
  notes: "Use for active inputs appearing in /RadioBrowse?service=Capture. Works for BluOS HUB inputs."

- id: select_input_by_index
  label: Select External Input by Index (firmware < v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "Index (1-based) of inputs from /Settings?id=capture response, excluding Bluetooth."
  command: "GET /Play?inputIndex={inputIndex}"
  notes: "Applies to BluOS firmware newer than v3.8.0 and older than v4.2.0."

- id: select_input_by_type_index
  label: Select External Input by Type Index (firmware >= v4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: {type}-{index}. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts from 1."
  command: "GET /Play?inputTypeIndex={inputTypeIndex}"
  notes: "Applies to BluOS firmware v4.2.0 or newer."

# --- Bluetooth ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  command: "GET /audiomodes?bluetoothAutoplay={bluetoothAutoplay}"
  notes: "No response body is returned."

# --- Player Reboot ---

- id: reboot
  label: Reboot Player
  kind: action
  params: []
  command: "POST /reboot (body: yes=1)"
  notes: "Soft reboot. POST request with body parameter yes=1. Example: curl -d yes=1 192.168.1.100/reboot"

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params: []
  command: "GET /Doorbell?play=1"
```

## Feedbacks

```yaml
# --- /Status response ---
- id: playback_status
  type: object
  description: "Full playback and volume status. Poll GET /Status or long-poll with timeout and etag parameters."
  fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
      description: "Current player state."
    - name: volume
      type: integer
      description: "Volume level 0–100; -1 means fixed volume."
    - name: mute
      type: integer
      values: [0, 1]
      description: "1 if muted."
    - name: muteVolume
      type: integer
      description: "Unmuted volume level (0–100) when muted."
    - name: db
      type: number
      description: "Volume level in dB."
    - name: muteDb
      type: number
      description: "Unmuted volume in dB when muted."
    - name: shuffle
      type: integer
      values: [0, 1]
      description: "0 = off, 1 = on."
    - name: repeat
      type: integer
      values: [0, 1, 2]
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off."
    - name: title1
      type: string
      description: "First line of now-playing metadata (must be used in UI)."
    - name: title2
      type: string
      description: "Second line of now-playing metadata."
    - name: title3
      type: string
      description: "Third line of now-playing metadata."
    - name: artist
      type: string
    - name: album
      type: string
    - name: name
      type: string
    - name: service
      type: string
    - name: streamFormat
      type: string
    - name: quality
      type: string
      description: "cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate."
    - name: totlen
      type: integer
      description: "Total track length in seconds."
    - name: secs
      type: integer
      description: "Seconds played; not counted in etag."
    - name: canSeek
      type: integer
      values: [0, 1]
    - name: canMovePlayback
      type: boolean
    - name: pid
      type: integer
      description: "Unique play queue id."
    - name: prid
      type: integer
      description: "Unique preset id."
    - name: syncStat
      type: integer
      description: "Id indicating /SyncStatus changes."
    - name: sleep
      type: string
      description: "Minutes remaining before sleep timer activates."
    - name: etag
      type: string
      description: "Opaque value for long-polling."
    - name: actions
      type: object
      description: "Available actions for streaming radio (skip, back, love, ban). Present only when applicable."

# --- /SyncStatus response ---
- id: sync_status
  type: object
  description: "Player and group sync status. Poll GET /SyncStatus or long-poll with timeout and etag parameters."
  fields:
    - name: volume
      type: integer
      description: "Volume 0–100; -1 = fixed."
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteDb
      type: number
    - name: muteVolume
      type: integer
    - name: db
      type: number
    - name: name
      type: string
      description: "Player name."
    - name: model
      type: string
    - name: modelName
      type: string
    - name: brand
      type: string
    - name: group
      type: string
    - name: id
      type: string
      description: "Player IP:port."
    - name: mac
      type: string
    - name: initialized
      type: boolean
    - name: syncStat
      type: integer
    - name: schemaVersion
      type: integer
    - name: master
      type: string
      description: "Primary player IP; only present when this is a secondary player."
    - name: slave
      type: array
      description: "Secondary player IPs; only present when this is the primary player."
    - name: zone
      type: string
    - name: zoneMaster
      type: boolean
    - name: zoneSlave
      type: boolean
    - name: etag
      type: string

# --- /Volume response ---
- id: volume_state
  type: object
  description: "Current volume state, returned after any /Volume command."
  fields:
    - name: volume
      type: integer
      description: "Current volume 0–100 or -1 for fixed."
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
# UNRESOLVED: no persistent settable parameters beyond commands documented; populate from source if applicable
```

## Events

```yaml
# Long-poll mechanism: /Status?timeout={seconds}&etag={etag} and /SyncStatus?timeout={seconds}&etag={etag}
# The server holds the connection and returns only when state changes or timeout expires.
# Recommended polling interval for /Status: 100 seconds (never faster than 10 seconds).
# Recommended polling interval for /SyncStatus: 180 seconds.
# secs (playback position) is not tracked via etag; clients must increment locally.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
```

## Notes

- All HTTP commands are GET requests except /reboot which is POST.
- Port 11000 is standard for all BluOS players except the CI580 (which uses 11000/11010/11020/11030 for its four internal nodes).
- Discovery of the correct port should use mDNS services `_musc._tcp` and `_musp._tcp`, or the proprietary LSDP protocol (UDP broadcast on port 11430).
- Responses are UTF-8 encoded XML.
- Long-polling is supported on /Status and /SyncStatus. When long-polling: never make two consecutive requests for the same resource less than 1 second apart. Without long-polling: limit polling to at most one request every 30 seconds.
- The `etag` attribute in responses is an opaque value used to detect changes in long-poll responses; pass it back as the `etag` parameter on the next request.
- When players are grouped, the primary player is the main control point. Requests to secondary players for /Status, playback control, play queue management, and content browsing are proxied to the primary.
- Input selection: for firmware ≥ v4.2.0, use `/Play?inputTypeIndex={type}-{index}`; for firmware between v3.8.0 and v4.2.0, use `/Play?inputIndex={n}`; for active inputs (including HUB), use `/Play?url={URL-encoded-capture-URL}` from `/RadioBrowse?service=Capture`.
- The `title1`, `title2`, `title3` fields from /Status MUST be used as now-playing display text in any UI; do not use `artist`/`album`/`name` directly.
- Doorbell chime (`/Doorbell?play=1`) requires port 11000 as per the standard command format.
- LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast on port 11430 for player discovery; this is an alternative to mDNS where multicast is unreliable.
- The source document is "BluOS Custom Integration API Version 1.7" and applies broadly to BluOS-enabled devices (Bluesound, NAD Electronics, DALI Loudspeakers, and others including the M10 V Series).

<!-- UNRESOLVED: No power on/off commands found in source (only /reboot POST). Physical specifications, firmware compatibility ranges beyond the noted v3.8.0/v4.2.0 boundaries, and error response handling details are not documented in this source. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T21:09:54.783Z
last_checked_at: 2026-05-16T19:32:27.434Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:32:27.434Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions match verbatim HTTP endpoints in the BluOS CI API source; transport port 11000 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is the BluOS Custom Integration API and does not name the M10 V Series explicitly — it covers all BluOS players generically. Port 11000 applies to standard BluOS players; the CI580 uses ports 11000/11010/11020/11030. Physical/electrical specifications not covered."
- "no persistent settable parameters beyond commands documented; populate from source if applicable"
- "no multi-step sequences described explicitly in source"
- "no safety warnings or interlock procedures found in source."
- "No power on/off commands found in source (only /reboot POST). Physical specifications, firmware compatibility ranges beyond the noted v3.8.0/v4.2.0 boundaries, and error response handling details are not documented in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
