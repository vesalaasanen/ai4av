---
spec_id: admin/bluos-bsw150-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS BSW150 Control Spec"
manufacturer: BluOS
model_family: BSW150
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - BSW150
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:10.874Z
last_checked_at: 2026-06-02T21:54:10.874Z
generated_at: 2026-06-02T21:54:10.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific hardware capabilities (inputs, outputs, amplifier specs) not described in source; source is the generic BluOS CI API document applicable to multiple Bluesound/NAD/DALI products"
  - "no multi-step macro sequences described explicitly in source; populate if applicable"
  - "no safety warnings or interlock procedures stated in source"
  - "BSW150-specific hardware capabilities (number/type of physical inputs, amplifier details) not described in source — source is generic BluOS CI API v1.7 document"
  - "firmware version compatibility range for the BSW150 model specifically not stated"
  - "whether BSW150 supports all endpoints documented (e.g., /Doorbell, HUB inputs) — source is a platform-wide API reference"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:10.874Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions traced to BluOS API v1.7. Full playback, volume, grouping, preset, and queue control documented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS BSW150 Control Spec

## Summary

The BluOS BSW150 is a network music player running the BluOS operating system. This spec covers the BluOS Custom Integration API (version 1.7), which exposes HTTP GET-based control over playback, volume, queue management, presets, input selection, player grouping, and device discovery. All commands are sent as HTTP requests to `http://<player_ip>:11000/<endpoint>` and responses are UTF-8 encoded XML.

<!-- UNRESOLVED: device-specific hardware capabilities (inputs, outputs, amplifier specs) not described in source; source is the generic BluOS CI API document applicable to multiple Bluesound/NAD/DALI products -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
  # Note: CI580 multi-zone chassis uses ports 11000/11010/11020/11030 per node.
  # Actual port should be discovered via mDNS (musc._tcp, musp._tcp) or LSDP (UDP port 11430).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- queryable       # inferred from extensive query commands returning state (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable       # inferred from volume control commands (set level, mute, dB control)
- routable        # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=)
```

## Actions

```yaml
# Playback Control
- id: play
  label: Play
  kind: action
  params: []
  notes: "GET /Play — starts playback of current source"

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: "Jump to position in current track (seconds). Only valid if /Status includes <totlen>."
  notes: "GET /Play?seek=<seconds>"

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded stream URL to play directly."
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
  notes: "GET /Pause?toggle=1 — toggles pause state"

- id: stop
  label: Stop
  kind: action
  params: []
  notes: "GET /Stop"

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  notes: "GET /Skip — skips to next track in play queue; wraps to first if at end"

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  notes: "GET /Back — returns to start of current track if >4s elapsed, else previous track"

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
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"
  notes: "GET /Repeat?state=<0|1|2>"

# Volume Control
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume level 0–100."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = this player only, 1 = all players in group."
  notes: "GET /Volume?level=<level>&tell_slaves=<0|1>"

- id: volume_set_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: "Absolute dB volume level."
  notes: "GET /Volume?abs_db=<db>"

- id: volume_adjust_db
  label: Adjust Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: "Relative dB change; positive = up, negative = down. Typical step: ±2 dB."
  notes: "GET /Volume?db=<delta-db>"

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

# Preset Control
- id: preset_load
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, +1 (next preset), or -1 (previous preset)."
  notes: "GET /Preset?id=<id|+1|-1>"

# Play Queue Management
- id: queue_delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: "Track id (position) to remove from play queue."
  notes: "GET /Delete?id=<position>"

- id: queue_move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: "Current position of the track."
    - name: new
      type: integer
      description: "Destination position."
  notes: "GET /Move?new=<destination>&old=<origin>"

- id: queue_clear
  label: Clear Play Queue
  kind: action
  params: []
  notes: "GET /Clear"

- id: queue_save
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: "Name for the saved playlist."
  notes: "GET /Save?name=<playlist_name>"

# Input Selection
- id: select_input_url
  label: Select Input by URL (Active Inputs)
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded input capture URL from /RadioBrowse?service=Capture response."
  notes: "GET /Play?url=<URL_value> — for active inputs including HUB inputs"

- id: select_input_by_index
  label: Select Input by Index (Firmware < v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of input from /Settings?id=capture response (Bluetooth excluded)."
  notes: "GET /Play?inputIndex=<IndexId> — requires firmware newer than v3.8.0 and older than v4.2.0"

- id: select_input_by_type_index
  label: Select Input by Type-Index (Firmware >= v4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: <type>-<index>. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1."
  notes: "GET /Play?inputTypeIndex=<type>-<index> — requires firmware v4.2.0 or newer"

# Bluetooth Mode
- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  notes: "GET /audiomodes?bluetoothAutoplay=<value> — no response body on success"

# Player Grouping
- id: group_add_slave
  label: Add Secondary Player to Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of the secondary player."
    - name: port
      type: integer
      description: "Port of the secondary player (default 11000)."
    - name: group
      type: string
      description: "Optional group name. BluOS assigns default if omitted."
  notes: "GET /AddSlave?slave=<ip>&port=<port>&group=<name>"

- id: group_add_slaves
  label: Add Multiple Secondary Players to Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of secondary players."
    - name: ports
      type: string
      description: "Comma-separated port numbers matching each slave IP."
  notes: "GET /AddSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

- id: group_remove_slave
  label: Remove Secondary Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of secondary player to remove."
    - name: port
      type: integer
      description: "Port of secondary player."
  notes: "GET /RemoveSlave?slave=<ip>&port=<port>"

- id: group_remove_slaves
  label: Remove Multiple Secondary Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses."
    - name: ports
      type: string
      description: "Comma-separated port numbers."
  notes: "GET /RemoveSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

# Reboot
- id: reboot
  label: Reboot Player
  kind: action
  params: []
  notes: "POST /reboot with body: yes=1 — soft reboot; no XML response, returns plain text confirmation"

# Doorbell
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params: []
  notes: "GET /Doorbell?play=1"

# Streaming Radio Station Actions
- id: action_skip
  label: Skip (Streaming Radio)
  kind: action
  params: []
  notes: "GET action URL from <action name='skip'> element in /Status response"

- id: action_back
  label: Back (Streaming Radio)
  kind: action
  params: []
  notes: "GET action URL from <action name='back'> element in /Status response"

- id: action_love
  label: Love Track (Streaming Radio)
  kind: action
  params: []
  notes: "GET action URL from <action name='love'> element in /Status response"

- id: action_ban
  label: Ban Track (Streaming Radio)
  kind: action
  params: []
  notes: "GET action URL from <action name='ban'> element in /Status response — also skips to next track"
```

## Feedbacks

```yaml
# Playback Status — GET /Status
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  notes: "From <state> element in /Status response. 'play' and 'stream' are equivalent."

- id: current_track_title
  type: string
  notes: "From <title1> element in /Status. MUST be used as first line of now-playing UI."

- id: current_track_artist
  type: string
  notes: "From <title2> element in /Status."

- id: current_track_album
  type: string
  notes: "From <title3> element in /Status."

- id: current_position_secs
  type: integer
  notes: "From <secs> element in /Status. Not included in etag calculation; client must self-increment during playback."

- id: track_total_length_secs
  type: integer
  notes: "From <totlen> element in /Status."

- id: can_seek
  type: boolean
  notes: "From <canSeek> element (1=true) in /Status."

- id: shuffle_state
  type: enum
  values: ["0", "1"]
  notes: "From <shuffle> in /Status. 0=off, 1=on."

- id: repeat_state
  type: enum
  values: ["0", "1", "2"]
  notes: "From <repeat> in /Status. 0=repeat queue, 1=repeat track, 2=repeat off."

- id: volume_level
  type: integer
  notes: "From <volume> in /Status or /Volume response. Range 0–100. -1 means fixed volume."

- id: volume_db
  type: number
  notes: "From db attribute in /Volume response."

- id: mute_state
  type: boolean
  notes: "From <mute> or mute attribute (1=muted, 0=unmuted) in /Status or /Volume response."

- id: sleep_timer_remaining
  type: integer
  notes: "From <sleep> in /Status — minutes remaining before sleep timer activates."

- id: current_service
  type: string
  notes: "From <service> element in /Status — service id of current audio source."

- id: current_image_url
  type: string
  notes: "From <image> in /Status — artwork URL for current audio."

- id: stream_format
  type: string
  notes: "From <streamFormat> in /Status."

- id: play_queue_id
  type: integer
  notes: "From <pid> in /Status — unique play queue id."

- id: preset_id
  type: integer
  notes: "From <prid> in /Status — unique preset id."

- id: battery_level
  type: integer
  notes: "From battery.level attribute in /Status — only present if player has battery pack."

# SyncStatus — GET /SyncStatus
- id: player_name
  type: string
  notes: "From name attribute in /SyncStatus response."

- id: player_model
  type: string
  notes: "From modelName attribute in /SyncStatus response."

- id: group_name
  type: string
  notes: "From group attribute in /SyncStatus response."

- id: group_volume
  type: integer
  notes: "From volume attribute in /SyncStatus response."

- id: sync_status_id
  type: string
  notes: "From syncStat in /Status — indicates any change in SyncStatus; matches syncStat in /SyncStatus."

- id: player_initialized
  type: boolean
  notes: "From initialized attribute in /SyncStatus — false means player needs setup via BluOS Controller app."

# Play Queue — GET /Playlist
- id: queue_length
  type: integer
  notes: "From <length> in /Playlist response."

- id: queue_modified
  type: boolean
  notes: "From modified attribute in /Playlist response. 1=modified since loaded."

# Doorbell — GET /Doorbell?play=1
- id: doorbell_volume
  type: integer
  notes: "From volume attribute in /Doorbell response."

- id: doorbell_chime
  type: string
  notes: "From chime attribute in /Doorbell response."
```

## Variables

```yaml
# Long-poll parameters available on /Status and /SyncStatus
- id: status_etag
  type: string
  description: "etag from /Status response — pass back to enable long-polling change detection."

- id: syncstatus_etag
  type: string
  description: "etag from /SyncStatus response — pass back to enable long-polling change detection."

# Volume range
- id: volume_range
  type: string
  description: "Configurable via BluOS Controller app (Settings -> Player -> Audio). Default range typically -80..0 dB."
  notes: "Not directly settable via CI API; shown for integration reference only."
```

## Events

```yaml
# Long polling provides change-notification semantics on /Status and /SyncStatus.
# When a long-poll request returns early (before timeout), the player state has changed.
# Clients must NOT make two consecutive long-poll requests less than 1 second apart.
# Regular polling (non-long-poll) must be no faster than once every 30 seconds.
- id: status_changed
  type: poll_response
  notes: "GET /Status?timeout=<seconds>&etag=<prev-etag> — returns immediately on state change or after timeout. Recommended timeout: 100s."

- id: syncstatus_changed
  type: poll_response
  notes: "GET /SyncStatus?timeout=<seconds>&etag=<prev-etag> — returns immediately on sync state change or after timeout. Recommended timeout: 180s."
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described explicitly in source; populate if applicable
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
# Note: /reboot command performs a soft reboot — operator should confirm intent before issuing
```

## Notes

**Discovery:** BluOS players advertise via mDNS (`_musc._tcp`, `_musp._tcp`) and also via the proprietary Lenbrook Service Discovery Protocol (LSDP) over UDP broadcast port 11430. LSDP class ID 0x0001 = BluOS Player. Discovery via LSDP is recommended for networks with unreliable multicast.

**Port:** Standard port is 11000 for all BluOS players except the CI580, which uses 11000/11010/11020/11030 per streamer node.

**Protocol:** All CI API commands are plain HTTP GET requests (except `/reboot` which is POST). Responses are UTF-8 XML. No authentication is required.

**Long polling:** Supported on `/Status` and `/SyncStatus`. Use `timeout` and `etag` parameters. The `/Status` response includes a `<syncStat>` element that indicates if `/SyncStatus` has changed, reducing the need to poll both endpoints simultaneously.

**Input selection firmware split:** External input selection via index changed with firmware version:
- Firmware > v3.8.0 and < v4.2.0: use `/Play?inputIndex=<1-based-index>`
- Firmware >= v4.2.0: use `/Play?inputTypeIndex=<type>-<index>` (e.g., `spdif-1`, `analog-2`)

**Streaming radio actions:** Skip, back, love, and ban for streaming radio stations (e.g., Slacker, Radio Paradise, Amazon Music Prime) are accessed via action URLs embedded in the `/Status` response `<actions>` block, not via fixed endpoint paths.

**Browse / search:** Content browsing and search available via `/Browse?key=<key>` with hierarchical navigation. All `key` parameters must be URL-encoded. Use `withContextMenuItems=1` to retrieve inline context menus.

**Grouping model:** Primary player controls the music source; secondary players proxy most requests to the primary. Volume of each secondary player tracked via `/SyncStatus` long-polling.

<!-- UNRESOLVED: BSW150-specific hardware capabilities (number/type of physical inputs, amplifier details) not described in source — source is generic BluOS CI API v1.7 document -->
<!-- UNRESOLVED: firmware version compatibility range for the BSW150 model specifically not stated -->
<!-- UNRESOLVED: whether BSW150 supports all endpoints documented (e.g., /Doorbell, HUB inputs) — source is a platform-wide API reference -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T21:54:10.874Z
last_checked_at: 2026-06-02T21:54:10.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:10.874Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions traced to BluOS API v1.7. Full playback, volume, grouping, preset, and queue control documented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific hardware capabilities (inputs, outputs, amplifier specs) not described in source; source is the generic BluOS CI API document applicable to multiple Bluesound/NAD/DALI products"
- "no multi-step macro sequences described explicitly in source; populate if applicable"
- "no safety warnings or interlock procedures stated in source"
- "BSW150-specific hardware capabilities (number/type of physical inputs, amplifier details) not described in source — source is generic BluOS CI API v1.7 document"
- "firmware version compatibility range for the BSW150 model specifically not stated"
- "whether BSW150 supports all endpoints documented (e.g., /Doorbell, HUB inputs) — source is a platform-wide API reference"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
