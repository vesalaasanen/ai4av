---
spec_id: admin/bluos-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Volume Control Control Spec"
manufacturer: BluOS
model_family: "BluOS Player (general — Bluesound, NAD Electronics, DALI Loudspeakers, and others)"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS Player (general — Bluesound, NAD Electronics, DALI Loudspeakers, and others)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T18:38:12.112Z
last_checked_at: 2026-06-02T21:54:09.041Z
generated_at: 2026-06-02T21:54:09.041Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication mechanism not described in source — no login procedure found"
  - "no settable parameters beyond discrete actions found in source"
  - "no out-of-band event push protocol found in source"
  - "no multi-step sequences explicitly described in source as macros"
  - "no safety warnings or interlock procedures stated in source beyond standard reboot caution"
  - "authentication not described — assume no auth required but not explicitly confirmed for all environments"
  - "HTTPS support not mentioned; all examples use plain HTTP"
  - "error response format for HTTP-level errors (4xx/5xx) not documented"
  - "firmware version compatibility for volume/playback endpoints not stated (only input selection endpoints reference firmware versions)"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:09.041Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to BluOS volume control API. Comprehensive volume management with individual and group control confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS Volume Control Control Spec

## Summary

BluOS is an advanced operating system and music management software used in products from Bluesound, NAD Electronics, DALI Loudspeakers, and others. This spec covers the HTTP-based Custom Integration API (version 1.7), focusing on volume control, mute, playback control, play queue management, presets, content browsing, player grouping, and supporting commands. All requests are HTTP GET (except reboot, which is POST), sent to the player IP on port 11000 (default), with responses returned as UTF-8 encoded XML.

<!-- UNRESOLVED: authentication mechanism not described in source — no login procedure found -->

## Transport

```yaml
protocols:
  - http
addressing:
  host: "<player_ip>"  # discovered via mDNS (musc._tcp / musp._tcp) or LSDP (UDP broadcast port 11430)
  port: 11000  # default for all BluOS players except CI580 multi-node chassis (nodes use 11000, 11010, 11020, 11030)
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable    # inferred from volume set/up/down/mute commands
- queryable    # inferred from /Status, /SyncStatus, /Volume query commands returning state
- routable     # inferred from input selection commands and player grouping commands
```

## Actions

```yaml
# --- Volume Control ---

- id: set_volume_level
  label: Set Volume Level
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: level
      type: integer
      range: "0..100"
      description: Absolute volume level (0–100).
    - name: tell_slaves
      type: integer
      range: "0|1"
      description: "If 1, applies to all grouped players. If 0, only the selected player."
      required: false

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (constrained to configured available range, typically -80..0).
    - name: tell_slaves
      type: integer
      range: "0|1"
      required: false

- id: adjust_volume_db
  label: Adjust Volume (Relative dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: db
      type: number
      description: Relative volume change in dB (positive = up, negative = down; typical +2 or -2).
    - name: tell_slaves
      type: integer
      range: "0|1"
      required: false

- id: mute_on
  label: Mute
  kind: action
  endpoint: "GET /Volume?mute=1"
  params:
    - name: mute
      type: integer
      value: 1
      description: Set to 1 to mute player.
    - name: tell_slaves
      type: integer
      range: "0|1"
      required: false

- id: mute_off
  label: Unmute
  kind: action
  endpoint: "GET /Volume?mute=0"
  params:
    - name: mute
      type: integer
      value: 0
      description: Set to 0 to unmute player.
    - name: tell_slaves
      type: integer
      range: "0|1"
      required: false

# --- Playback Control ---

- id: play
  label: Play
  kind: action
  endpoint: "GET /Play"
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds in the current track. Only valid if /Status response includes <totlen>.
      required: false
    - name: id
      type: integer
      description: Track id in the play queue. Used with seek.
      required: false
    - name: url
      type: string
      description: URL-encoded stream URL for direct stream playback.
      required: false

- id: pause
  label: Pause
  kind: action
  endpoint: "GET /Pause"
  params:
    - name: toggle
      type: integer
      value: 1
      description: If set to 1, toggles the current pause state.
      required: false

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
  notes: "Only valid when playing from play queue (no <streamUrl> in /Status response)."

- id: back
  label: Back / Previous Track
  kind: action
  endpoint: "GET /Back"
  params: []
  notes: "If track has been playing more than 4 seconds, returns to start of current track; otherwise goes to previous track. Only valid from play queue."

- id: shuffle
  label: Set Shuffle
  kind: action
  endpoint: "GET /Shuffle"
  params:
    - name: state
      type: integer
      range: "0|1"
      description: "0 to disable shuffle, 1 to enable shuffle."

- id: repeat
  label: Set Repeat
  kind: action
  endpoint: "GET /Repeat"
  params:
    - name: state
      type: integer
      range: "0|1|2"
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off."

- id: stream_action
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  endpoint: "GET /Action"
  params:
    - name: service
      type: string
      description: Service name (e.g., Slacker, RadioParadise).
    - name: action
      type: string
      description: Action parameter as provided by <action> element in /Status response.
  notes: "Specific URL is provided by <action> elements in /Status response. Only available for supported streaming radio stations."

# --- Play Queue Management ---

- id: list_queue
  label: List Play Queue
  kind: action
  endpoint: "GET /Playlist"
  params:
    - name: length
      type: integer
      value: 1
      description: "If 1, return only top-level queue attributes without track details."
      required: false
    - name: start
      type: integer
      description: First entry to include (0-based). Used for pagination.
      required: false
    - name: end
      type: integer
      description: Last entry to include. Used for pagination.
      required: false

- id: delete_track
  label: Delete Track from Queue
  kind: action
  endpoint: "GET /Delete"
  params:
    - name: id
      type: integer
      description: Track position id to remove from play queue.

- id: move_track
  label: Move Track in Queue
  kind: action
  endpoint: "GET /Move"
  params:
    - name: new
      type: integer
      description: New position for the track.
    - name: old
      type: integer
      description: Current position of the track.

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
      description: Name for the saved playlist.

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
      description: "Preset id number, or +1 for next preset, or -1 for previous preset."

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  endpoint: "GET /Browse"
  params:
    - name: key
      type: string
      description: "Browse key (URL-encoded). Absent = top-level browse. Value taken from browseKey, nextKey, parentKey, or contextMenuKey attribute of a prior response."
      required: false
    - name: withContextMenuItems
      type: integer
      value: 1
      description: "Always 1 when used. Enables inline context menus in response."
      required: false
    - name: q
      type: string
      description: "Search term. Used with key set to a searchKey value from a prior response."
      required: false

# --- Player Grouping ---

- id: add_slave
  label: Group Player(s) to Primary
  kind: action
  endpoint: "GET /AddSlave"
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to add (single player).
      required: false
    - name: port
      type: integer
      description: Port number of the secondary player (default 11000).
      required: false
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players (for multiple).
      required: false
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players (for multiple).
      required: false
    - name: group
      type: string
      description: Optional group name. If not provided, BluOS assigns a default name.
      required: false

- id: remove_slave
  label: Remove Player(s) from Group
  kind: action
  endpoint: "GET /RemoveSlave"
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove (single player).
      required: false
    - name: port
      type: integer
      description: Port of the secondary player to remove.
      required: false
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to remove (multiple).
      required: false
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players to remove (multiple).
      required: false

# --- Input Selection ---

- id: select_active_input
  label: Select Active Input Source
  kind: action
  endpoint: "GET /Play"
  params:
    - name: url
      type: string
      description: "URL attribute from /RadioBrowse?service=Capture response (URL-encoded)."
  notes: "Supported input types include Bluetooth, Analog, Optical, HDMI ARC, Phono, etc. Hub inputs supported."

- id: select_external_input_by_index
  label: Select External Input by Index (firmware <4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputIndex
      type: integer
      description: "Index (1-based, excluding Bluetooth) of inputs from /Settings?id=capture&schemaVersion=32 response."
  notes: "For BluOS firmware newer than v3.8.0 and older than v4.2.0."

- id: select_external_input_by_type
  label: Select External Input by Type (firmware >=4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputTypeIndex
      type: string
      description: "Input type-index string (e.g., spdif-1, analog-1, bluetooth-1, arc-1, earc-1, phono-1, coax-1, computer-1, aesebu-1, balanced-1, microphone-1)."
  notes: "For BluOS firmware v4.2.0 or newer."

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  endpoint: "GET /audiomodes"
  params:
    - name: bluetoothAutoplay
      type: integer
      range: "0|1|2|3"
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  notes: "No response body returned."

# --- Reboot ---

- id: reboot
  label: Reboot Player
  kind: action
  endpoint: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g., 1). Required to trigger reboot.
  notes: "Uses HTTP POST. Response is plain text: 'Settings Updated / Rebooting. Please close this window. / Please wait...'"

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  endpoint: "GET /Doorbell"
  params:
    - name: play
      type: integer
      value: 1
      description: Always 1 to play doorbell chime.
```

## Feedbacks

```yaml
# --- Playback Status (/Status) ---

- id: playback_status
  label: Playback Status
  endpoint: "GET /Status"
  type: xml
  notes: "Supports long polling with timeout and etag parameters. Polling limit: at most one request every 30 seconds without long-polling; at least 1 second between consecutive long-poll requests."
  attributes:
    - name: etag
      type: string
      description: Opaque value for long-polling change detection (root element attribute).
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
      description: Current player playback state.
    - name: volume
      type: integer
      range: "-1..100"
      description: "Volume level (0–100); -1 means fixed volume."
    - name: db
      type: number
      description: Volume level in dB.
    - name: mute
      type: integer
      range: "0|1"
      description: "1 if muted, 0 if not muted."
    - name: muteVolume
      type: integer
      description: Unmuted volume level (0–100) when muted.
    - name: muteDb
      type: number
      description: Unmuted volume in dB when muted.
    - name: title1
      type: string
      description: First line of now-playing metadata (MUST be used for UI display).
    - name: title2
      type: string
      description: Second line of now-playing metadata.
    - name: title3
      type: string
      description: Third line of now-playing metadata.
    - name: artist
      type: string
    - name: album
      type: string
    - name: name
      type: string
      description: Title of current playing audio track.
    - name: shuffle
      type: integer
      range: "0|1"
      description: "0 = off, 1 = on."
    - name: repeat
      type: integer
      range: "0|1|2"
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off."
    - name: totlen
      type: integer
      description: Total length of current track in seconds.
    - name: secs
      type: integer
      description: Seconds played of current track (not included in etag calculation; client must increment independently).
    - name: canSeek
      type: integer
      range: "0|1"
      description: "1 if scrubbing is possible via /Play?seek=."
    - name: canMovePlayback
      type: boolean
      description: True if playback can be moved to another player.
    - name: service
      type: string
      description: Service id of current audio.
    - name: serviceIcon
      type: string
      description: URL of current service icon.
    - name: image
      type: string
      description: URL of artwork for current audio.
    - name: quality
      type: string
      description: "Audio quality: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate."
    - name: pid
      type: integer
      description: Unique play queue id.
    - name: prid
      type: integer
      description: Unique preset id.
    - name: syncStat
      type: integer
      description: Changes whenever /SyncStatus response changes.
    - name: sleep
      type: string
      description: Minutes remaining before sleep timer activates.
    - name: streamUrl
      type: string
      description: "If present, indicates play queue is not the audio source; shuffle/repeat/skip/back not relevant."
    - name: groupName
      type: string
      description: Group name (primary player only).
    - name: groupVolume
      type: number
      description: Group volume level (primary player only).
    - name: actions
      type: xml_element
      description: Available streaming radio actions (back, skip, love, ban) as <action> elements.

# --- Sync Status (/SyncStatus) ---

- id: sync_status
  label: Player and Group Sync Status
  endpoint: "GET /SyncStatus"
  type: xml
  notes: "Supports long polling. Recommended polling interval: 180 seconds."
  attributes:
    - name: volume
      type: integer
      range: "-1..100"
      description: "Volume level; -1 = fixed."
    - name: db
      type: number
      description: Volume level in dB.
    - name: mute
      type: integer
      range: "0|1"
    - name: muteVolume
      type: integer
    - name: muteDb
      type: number
    - name: name
      type: string
      description: Player name.
    - name: model
      type: string
    - name: modelName
      type: string
    - name: brand
      type: string
    - name: group
      type: string
      description: Group name.
    - name: id
      type: string
      description: Player IP and port.
    - name: mac
      type: string
      description: Player unique network id (may be MAC address).
    - name: initialized
      type: boolean
      description: True if player is set up; false if setup required via BluOS Controller app.
    - name: master
      type: xml_element
      description: Primary player IP (only if this player is secondary). Attributes: port, reconnecting.
    - name: slave
      type: xml_element
      description: Secondary player IPs (only if this player is primary). May be multiple.
    - name: syncStat
      type: integer
    - name: zone
      type: string
      description: Name of fixed group.
    - name: zoneMaster
      type: boolean
    - name: zoneSlave
      type: boolean
    - name: etag
      type: string

# --- Volume Response (/Volume) ---

- id: volume_state
  label: Volume State
  endpoint: "GET /Volume"
  type: xml
  attributes:
    - name: volume
      type: integer
      range: "-1..100"
      description: "Current volume (0..100); -1 = fixed."
    - name: db
      type: number
    - name: mute
      type: integer
      range: "0|1"
    - name: muteDb
      type: number
    - name: muteVolume
      type: integer
    - name: etag
      type: string

# --- Doorbell Response ---

- id: doorbell_status
  label: Doorbell Chime Status
  endpoint: "GET /Doorbell"
  type: xml
  attributes:
    - name: enable
      type: integer
      description: Indicates chime is enabled.
    - name: volume
      type: integer
      description: Chime volume.
    - name: chime
      type: string
      description: Chime audio path.
```

## Variables

```yaml
# UNRESOLVED: no settable parameters beyond discrete actions found in source
```

## Events

```yaml
# Long-poll unsolicited notifications via etag change detection on /Status and /SyncStatus.
# No push/subscribe mechanism described in source.
# UNRESOLVED: no out-of-band event push protocol found in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source as macros
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # reboot command causes service interruption; confirmation recommended
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source beyond standard reboot caution
```

## Notes

**Port discovery:** Port 11000 is the default for all BluOS players. The CI580 four-node chassis uses ports 11000, 11010, 11020, 11030 for nodes 1–4. Actual port should be discovered via mDNS (services `musc._tcp` and `musp._tcp`) or the proprietary LSDP protocol (UDP broadcast on port 11430).

**Long-polling:** The API supports long-polling on `/Status` and `/SyncStatus`. Without long-polling, clients must restrict polling to at most one request every 30 seconds. With long-polling, consecutive requests for the same resource must be at least 1 second apart. Recommended timeout for `/Status` long-poll: 100 seconds; for `/SyncStatus`: 180 seconds.

**Secondary player proxying:** When a player is a secondary (slave) in a group, many requests directed to it are internally proxied to the primary player. This includes `/Status`, playback control, play queue, and content browsing requests.

**`secs` field:** The `secs` field in `/Status` is not included in the etag calculation. Clients must increment the playback position themselves based on elapsed time when state is `play` or `stream`.

**`streamUrl` flag:** If `<streamUrl>` is present in `/Status`, the play queue is not the audio source; shuffle, repeat, skip, and back are not relevant.

**`title1`/`title2`/`title3` display rule:** These MUST be used for three-line now-playing UI. Do not use `album`, `artist`, or `name` directly. If `twoline_title1`/`twoline_title2` are present they MUST be used for two-line UI.

**Image redirects:** Image URLs beginning with `/Artwork` may result in HTTP redirects. Add `followRedirects=1` parameter when fetching to avoid redirect handling.

**Browse key encoding:** All `key` parameter values in `/Browse` requests must be URL-encoded (percent-escaped). browseKey, contextMenuKey, and searchKey attribute values must always be URI-encoded when used as key parameters.

**LSDP discovery:** The Lenbrook Service Discovery Protocol uses UDP broadcast on port 11430 (IANA-registered). Class IDs: 0x0001 = BluOS Player, 0x0003 = BluOS Player (secondary in multi-zone), 0x0008 = BluOS Hub. Packet header magic word is ASCII "LSDP". Announce messages broadcast approximately every minute at steady state.

**API version:** Source document is BluOS Custom Integration API Version 1.7.

<!-- UNRESOLVED: authentication not described — assume no auth required but not explicitly confirmed for all environments -->
<!-- UNRESOLVED: HTTPS support not mentioned; all examples use plain HTTP -->
<!-- UNRESOLVED: error response format for HTTP-level errors (4xx/5xx) not documented -->
<!-- UNRESOLVED: firmware version compatibility for volume/playback endpoints not stated (only input selection endpoints reference firmware versions) -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T18:38:12.112Z
last_checked_at: 2026-06-02T21:54:09.041Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:09.041Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to BluOS volume control API. Comprehensive volume management with individual and group control confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication mechanism not described in source — no login procedure found"
- "no settable parameters beyond discrete actions found in source"
- "no out-of-band event push protocol found in source"
- "no multi-step sequences explicitly described in source as macros"
- "no safety warnings or interlock procedures stated in source beyond standard reboot caution"
- "authentication not described — assume no auth required but not explicitly confirmed for all environments"
- "HTTPS support not mentioned; all examples use plain HTTP"
- "error response format for HTTP-level errors (4xx/5xx) not documented"
- "firmware version compatibility for volume/playback endpoints not stated (only input selection endpoints reference firmware versions)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
