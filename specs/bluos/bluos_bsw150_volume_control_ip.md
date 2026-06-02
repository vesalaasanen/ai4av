---
spec_id: admin/bluos-bsw150-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS BSW150 Volume Control Control Spec"
manufacturer: BluOS
model_family: "BSW150 Volume Control"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BSW150 Volume Control"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T18:51:30.797Z
last_checked_at: 2026-05-16T18:51:30.797Z
generated_at: 2026-05-16T18:51:30.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document covers the full BluOS Custom Integration API and is not BSW150-specific; supported inputs and features may vary by hardware model."
  - "The source does not describe unsolicited push notifications. Long polling is the"
  - "No multi-step sequences are described explicitly in the source."
  - "no explicit interlock procedures or power-on sequencing requirements stated in source."
  - "BSW150-specific hardware capabilities (available physical inputs, supported services) not enumerated in the source. The API document covers all BluOS players generically."
  - "No error response codes or HTTP status codes documented in the source for failure cases (only <error> XML elements for /Browse)."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-16T18:51:30.797Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions match verbatim HTTP endpoints in the BluOS CI API source; shapes and transport verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS BSW150 Volume Control Control Spec

## Summary

The BluOS BSW150 Volume Control is a BluOS-enabled network audio player/controller. This spec covers the BluOS Custom Integration API (v1.7) for IP-based control via HTTP GET requests sent to the player's IP address on port 11000. All commands return UTF-8 encoded XML responses. The API supports volume control, mute, playback transport, play queue management, presets, content browsing, player grouping, input selection, Bluetooth mode, and player reboot.

<!-- UNRESOLVED: The source document covers the full BluOS Custom Integration API and is not BSW150-specific; supported inputs and features may vary by hardware model. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
  # Note: the CI580 multi-node chassis uses ports 11000, 11010, 11020, 11030 for nodes 1–4.
  # Actual port should be discovered via mDNS (_musc._tcp / _musp._tcp) or LSDP (UDP port 11430).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable       # volume set/get by integer 0-100, dB absolute, or dB relative
- queryable       # /Status and /SyncStatus return current state; long polling supported
- routable        # input source selection via /Play?url=, /Play?inputIndex=, /Play?inputTypeIndex=
- powerable       # /reboot (POST) and doorbell chime; no explicit power-on/off command in source
```

## Actions

```yaml
# --- Volume Control ---

- id: set_volume
  label: Set Volume (0–100)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: level
      type: integer
      description: Absolute volume level (0–100).
    - name: tell_slaves
      type: integer
      description: "0 = change only this player; 1 = change all grouped players."
      required: false

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: abs_db
      type: number
      description: Absolute volume level in dB. Constrained to configured range (typically -80..0).
    - name: tell_slaves
      type: integer
      description: "0 = change only this player; 1 = change all grouped players."
      required: false

- id: volume_relative_db
  label: Adjust Volume (Relative dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: db
      type: number
      description: Relative volume change in dB. Positive to increase, negative to decrease. Typical step is +2 or -2.
    - name: tell_slaves
      type: integer
      description: "0 = change only this player; 1 = change all grouped players."
      required: false

- id: mute_on
  label: Mute
  kind: action
  endpoint: "GET /Volume?mute=1"
  params: []

- id: mute_off
  label: Unmute
  kind: action
  endpoint: "GET /Volume?mute=0"
  params: []

# --- Playback Control ---

- id: play
  label: Play
  kind: action
  endpoint: "GET /Play"
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds within the current track. Only valid when /Status includes <totlen>.
      required: false
    - name: id
      type: integer
      description: Track id (queue position) to seek within. Used with seek.
      required: false
    - name: url
      type: string
      description: URL-encoded stream URL to play directly, or URL-encoded input capture URL for input selection.
      required: false

- id: pause
  label: Pause
  kind: action
  endpoint: "GET /Pause"
  params:
    - name: toggle
      type: integer
      description: "If set to 1, toggles the current pause state."
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

- id: back
  label: Back / Previous Track
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
      description: "0 = disable shuffle; 1 = enable shuffle."

- id: repeat
  label: Set Repeat
  kind: action
  endpoint: "GET /Repeat"
  params:
    - name: state
      type: integer
      description: "0 = repeat queue; 1 = repeat current track; 2 = repeat off."

- id: streaming_action
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  endpoint: "GET /Action"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker, RadioParadise).
    - name: action
      type: string
      description: Action parameter as provided in the <action> element of the /Status response.

# --- Play Queue Management ---

- id: list_playlist
  label: List Play Queue
  kind: action
  endpoint: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: "If set to 1, returns only top-level queue attributes (no track details)."
      required: false
    - name: start
      type: integer
      description: First track index to return (0-based). For pagination.
      required: false
    - name: end
      type: integer
      description: Last track index to return. For pagination.
      required: false

- id: delete_track
  label: Delete Track from Queue
  kind: action
  endpoint: "GET /Delete"
  params:
    - name: id
      type: integer
      description: Track id (queue position) to remove.

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
      description: Name for the saved playlist. URL-encode spaces.

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
      description: "Preset id to load. Use +1 for next preset, -1 for previous preset."

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  endpoint: "GET /Browse"
  params:
    - name: key
      type: string
      description: Browse key (URL-encoded). Omit for top-level browse. Taken from browseKey, nextKey, parentKey, or contextMenuKey in a previous response.
      required: false
    - name: withContextMenuItems
      type: integer
      description: "Always 1 when used. Returns inline context menu items for each browse result."
      required: false
    - name: q
      type: string
      description: Search string. Used with key (searchKey from previous response) to search within a service.
      required: false

# --- Player Grouping ---

- id: add_slave
  label: Group Player(s) to Primary
  kind: action
  endpoint: "GET /AddSlave"
  params:
    - name: slave
      type: string
      description: IP address of a single secondary player to add. Use with port.
      required: false
    - name: port
      type: integer
      description: Port of the secondary player (default 11000).
      required: false
    - name: group
      type: string
      description: Optional group name. BluOS assigns a default if omitted.
      required: false
    - name: slaves
      type: string
      description: Comma-separated IP addresses of multiple secondary players. Use instead of slave for multi-player grouping.
      required: false
    - name: ports
      type: string
      description: Comma-separated port numbers matching the slaves parameter.
      required: false

- id: remove_slave
  label: Remove Player(s) from Group
  kind: action
  endpoint: "GET /RemoveSlave"
  params:
    - name: slave
      type: string
      description: IP address of a single secondary player to remove. Use with port.
      required: false
    - name: port
      type: integer
      description: Port of the secondary player.
      required: false
    - name: slaves
      type: string
      description: Comma-separated IP addresses of multiple secondary players to remove.
      required: false
    - name: ports
      type: string
      description: Comma-separated port numbers matching the slaves parameter.
      required: false

# --- Player Reboot ---

- id: reboot
  label: Soft Reboot Player
  kind: action
  endpoint: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1). Required by the endpoint.

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  endpoint: "GET /Doorbell"
  params:
    - name: play
      type: integer
      description: Always 1.

# --- Input Selection ---

- id: select_input_active
  label: Select Active Input (via capture URL)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: url
      type: string
      description: URL-encoded capture URL from /RadioBrowse?service=Capture response (e.g. Capture%3Ahw%3A...).

- id: select_input_by_index
  label: Select External Input by Index (firmware v3.8.0–v4.1.x)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputIndex
      type: integer
      description: Index (1-based) of input from /Settings?id=capture response, excluding Bluetooth.

- id: select_input_by_type_index
  label: Select External Input by Type-Index (firmware v4.2.0+)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: <type>-<index>. Type values: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Example: spdif-2 selects Optical Input 2."

# --- Bluetooth ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  endpoint: "GET /audiomodes"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual; 1 = Automatic; 2 = Guest; 3 = Disabled."
```

## Feedbacks

```yaml
# /Status response (poll or long-poll)
- id: playback_state
  label: Playback State
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: "GET /Status → <state>"

- id: volume_level
  label: Volume Level (0–100)
  type: integer
  range: [-1, 100]
  description: "-1 means fixed volume."
  source: "GET /Status or GET /Volume → <volume> text node"

- id: volume_db
  label: Volume Level (dB)
  type: number
  source: "GET /Status or GET /Volume → db attribute"

- id: mute_state
  label: Mute State
  type: integer
  values: [0, 1]
  description: "1 = muted, 0 = unmuted."
  source: "GET /Status → <mute> or GET /Volume → mute attribute"

- id: mute_volume
  label: Pre-mute Volume Level (0–100)
  type: integer
  source: "GET /Status or GET /Volume → muteVolume attribute"

- id: mute_db
  label: Pre-mute Volume (dB)
  type: number
  source: "GET /Status or GET /Volume → muteDb attribute"

- id: track_title
  label: Track Title (line 1)
  type: string
  source: "GET /Status → <title1>"

- id: track_artist
  label: Track Artist (line 2)
  type: string
  source: "GET /Status → <title2>"

- id: track_album
  label: Track Album (line 3)
  type: string
  source: "GET /Status → <title3>"

- id: track_position_secs
  label: Track Playback Position (seconds)
  type: integer
  source: "GET /Status → <secs>"
  description: "Not included in etag; clients must increment locally."

- id: track_total_length_secs
  label: Track Total Length (seconds)
  type: integer
  source: "GET /Status → <totlen>"

- id: shuffle_state
  label: Shuffle State
  type: integer
  values: [0, 1]
  description: "0 = off, 1 = on."
  source: "GET /Status → <shuffle>"

- id: repeat_state
  label: Repeat State
  type: integer
  values: [0, 1, 2]
  description: "0 = repeat queue, 1 = repeat track, 2 = repeat off."
  source: "GET /Status → <repeat>"

- id: sync_status_etag
  label: SyncStatus Change ID
  type: string
  source: "GET /Status → <syncStat>"

# /SyncStatus response (poll or long-poll)
- id: player_name
  label: Player Name
  type: string
  source: "GET /SyncStatus → name attribute"

- id: player_model
  label: Player Model Name
  type: string
  source: "GET /SyncStatus → modelName attribute"

- id: player_group
  label: Group Name
  type: string
  source: "GET /SyncStatus → group attribute"

- id: player_initialized
  label: Player Initialized
  type: boolean
  source: "GET /SyncStatus → initialized attribute"

- id: group_volume
  label: Group Volume Level (0–100)
  type: integer
  source: "GET /Status → <groupVolume>"
```

## Variables

```yaml
- id: poll_timeout
  label: Long-Poll Timeout (seconds)
  type: integer
  description: >
    Timeout in seconds for long-polling /Status or /SyncStatus.
    Recommended: 100s for /Status, 180s for /SyncStatus.
    Never faster than 10s for /Status; never two consecutive requests less than 1s apart.
  endpoints: ["/Status?timeout=", "/SyncStatus?timeout="]

- id: etag
  label: Long-Poll ETag
  type: string
  description: >
    Opaque value returned as the etag attribute on the response root element.
    Pass back as etag parameter on the next long-poll request.
  endpoints: ["/Status?etag=", "/SyncStatus?etag=", "/Volume (long-poll)"]
```

## Events

```yaml
# UNRESOLVED: The source does not describe unsolicited push notifications. Long polling is the
# mechanism for change detection — not server-push events.
```

## Macros

```yaml
# UNRESOLVED: No multi-step sequences are described explicitly in the source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # POST /reboot causes an immediate soft reboot; no confirmation prompt in the API itself
interlocks: []
# UNRESOLVED: no explicit interlock procedures or power-on sequencing requirements stated in source.
```

## Notes

- All requests are HTTP GET except `/reboot`, which requires HTTP POST with body parameter `yes=<any value>`.
- The base URL pattern is `http://<player_ip>:11000/<command>`. The CI580 uses ports 11000/11010/11020/11030 for its four streamer nodes.
- Player discovery: use mDNS services `_musc._tcp` and `_musp._tcp`, or Lenbrook's LSDP protocol (UDP broadcast on port 11430).
- Long-polling: pass `timeout` (seconds) and `etag` (from previous response) to `/Status` or `/SyncStatus`. Clients must not issue two consecutive requests for the same resource less than 1 second apart. Without long polling, restrict polling to at most once every 30 seconds.
- When players are grouped, the secondary players proxy most requests to the primary. Use `/SyncStatus` long-polling to track each secondary player's individual volume.
- The `title1`, `title2`, `title3` fields from `/Status` MUST be used for 3-line now-playing UI; the individual `name`, `artist`, `album` fields are supplementary.
- For 2-line UI, use `twoline_title1` / `twoline_title2` if present.
- Volume range is typically -80..0 dB; the range can be adjusted via the BluOS Controller app.
- Input selection for firmware v3.8.0–v4.1.x uses `/Play?inputIndex=<n>`; for v4.2.0+ use `/Play?inputTypeIndex=<type>-<index>`. The older `inputIndex` form excludes Bluetooth from the count.
- The `/Browse` API supports hierarchical content navigation; all `key` parameter values must be URL-encoded (percent-escaped).
- Source API version: BluOS Custom Integration API v1.7 (2025-04-09).

<!-- UNRESOLVED: BSW150-specific hardware capabilities (available physical inputs, supported services) not enumerated in the source. The API document covers all BluOS players generically. -->
<!-- UNRESOLVED: No error response codes or HTTP status codes documented in the source for failure cases (only <error> XML elements for /Browse). -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T18:51:30.797Z
last_checked_at: 2026-05-16T18:51:30.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T18:51:30.797Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions match verbatim HTTP endpoints in the BluOS CI API source; shapes and transport verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document covers the full BluOS Custom Integration API and is not BSW150-specific; supported inputs and features may vary by hardware model."
- "The source does not describe unsolicited push notifications. Long polling is the"
- "No multi-step sequences are described explicitly in the source."
- "no explicit interlock procedures or power-on sequencing requirements stated in source."
- "BSW150-specific hardware capabilities (available physical inputs, supported services) not enumerated in the source. The API document covers all BluOS players generically."
- "No error response codes or HTTP status codes documented in the source for failure cases (only <error> XML elements for /Browse)."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
