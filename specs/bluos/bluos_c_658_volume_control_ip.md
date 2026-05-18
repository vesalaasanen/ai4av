---
spec_id: admin/bluos-c-658-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS C 658 Volume Control Spec"
manufacturer: BluOS
model_family: "C 658"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "C 658"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:01:38.268Z
generated_at: 2026-05-16T19:01:38.268Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T19:01:38.268Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec actions map 1-to-1 to documented endpoints in the BluOS CI API source with matching parameters and transport."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS C 658 Volume Control Spec

## Summary

The BluOS C 658 is a network streaming player controlled via the BluOS Custom Integration API (v1.7). All commands are HTTP GET requests (except /reboot which is HTTP POST) sent to the player IP on port 11000. The player responds with UTF-8 encoded XML. This spec covers volume control, playback control, play queue management, presets, content browsing, player grouping, direct input selection, and Bluetooth mode control.

<!-- UNRESOLVED: No authentication/login procedure described in source — auth inferred as none. -->
<!-- UNRESOLVED: Exact C 658 model-specific inputs not enumerated in source; input type examples are drawn from generic BluOS API doc. -->

## Transport

```yaml
protocols:
  - http
addressing:
  base_url: "http://<player_ip>:11000"
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes:**
- Port 11000 is used for all BluOS players except the CI580 (which uses 11000/11010/11020/11030 for nodes 1-4).
- The actual port can be discovered via mDNS services `_musc._tcp` and `_musp._tcp`, or via LSDP (Lenbrook Service Discovery Protocol) on UDP port 11430.
- All requests follow the form: `http://<player_ip>:<port>/<request>`.

## Traits

```yaml
- levelable       # inferred from volume set/up/down/mute commands
- queryable       # inferred from /Status, /SyncStatus, /Volume query commands
- powerable       # inferred from /reboot (soft reboot) command
- routable        # inferred from direct input selection and player grouping commands
```

## Actions

```yaml
# --- Volume Control ---

- id: set_volume
  label: Set Volume (Absolute Level)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: level
      type: integer
      description: Absolute volume level (0–100).
    - name: tell_slaves
      type: integer
      description: "If 1, all grouped players change volume. If 0 (default), only this player changes."

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
      description: "If 1, all grouped players change volume. If 0, only this player."

- id: volume_relative_db
  label: Adjust Volume (Relative dB)
  kind: action
  endpoint: "GET /Volume"
  params:
    - name: db
      type: number
      description: Relative volume change in dB (positive = up, negative = down). Typical value ±2 dB.
    - name: tell_slaves
      type: integer
      description: "If 1, all grouped players change volume."

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
      description: "Optional. Jump to specified position (seconds) in current track. Only valid if /Status returns <totlen>."
    - name: id
      type: integer
      description: "Optional. Track id in queue to seek within."
    - name: url
      type: string
      description: "Optional. URL-encoded stream URL to play directly."

- id: pause
  label: Pause
  kind: action
  endpoint: "GET /Pause"
  params:
    - name: toggle
      type: integer
      description: "Optional. If 1, toggles current pause state."

- id: stop
  label: Stop
  kind: action
  endpoint: "GET /Stop"
  params: []

- id: skip
  label: Skip (Next Track)
  kind: action
  endpoint: "GET /Skip"
  params: []

- id: back
  label: Back (Previous Track)
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

- id: action_streaming
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  endpoint: "GET /Action"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker).
    - name: action
      type: string
      description: Action URL taken from <action> element in /Status response.

# --- Play Queue Management ---

- id: playlist_list
  label: List Play Queue
  kind: action
  endpoint: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: "Optional. If 1, return only queue status (no track details)."
    - name: start
      type: integer
      description: "Optional. First track position to include (0-based)."
    - name: end
      type: integer
      description: "Optional. Last track position to include."

- id: delete_track
  label: Delete Track from Queue
  kind: action
  endpoint: "GET /Delete"
  params:
    - name: id
      type: integer
      description: Track id (queue position) to delete.

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
      description: Destination position of the track.

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
      description: "Preset id to load. Use +1 for next preset, -1 for previous preset."

# --- Content Browsing and Searching ---

- id: browse
  label: Browse Music Content
  kind: action
  endpoint: "GET /Browse"
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from a previous /Browse response (browseKey, nextKey, parentKey, or searchKey)."
    - name: withContextMenuItems
      type: integer
      description: "Optional. Always 1 when used. Returns inline context menus."
    - name: q
      type: string
      description: "Optional. Search query string. Used with searchKey."

# --- Direct Input Selection ---

- id: play_active_input
  label: Play Active Input (by URL)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response."

- id: play_input_by_index
  label: Play External Input by Index (firmware < v4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of input from /Settings?id=capture response (Bluetooth excluded). Firmware newer than v3.8.0 and older than v4.2.0."

- id: play_input_by_type_index
  label: Play External Input by Type-Index (firmware >= v4.2.0)
  kind: action
  endpoint: "GET /Play"
  params:
    - name: inputTypeIndex
      type: string
      description: "Input specifier in format 'type-index', e.g. 'spdif-1', 'analog-1', 'bluetooth-1'. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone."

# --- Player Grouping ---

- id: add_slave
  label: Group a Secondary Player
  kind: action
  endpoint: "GET /AddSlave"
  params:
    - name: slave
      type: string
      description: IP address of the secondary player.
    - name: port
      type: integer
      description: Port of the secondary player (default 11000).
    - name: group
      type: string
      description: "Optional. Group name."

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  endpoint: "GET /AddSlave"
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players.
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players.

- id: remove_slave
  label: Ungroup a Secondary Player
  kind: action
  endpoint: "GET /RemoveSlave"
  params:
    - name: slave
      type: string
      description: IP address of the player to remove.
    - name: port
      type: integer
      description: Port of the player to remove.

- id: remove_slaves
  label: Ungroup Multiple Secondary Players
  kind: action
  endpoint: "GET /RemoveSlave"
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of players to remove.
    - name: ports
      type: string
      description: Comma-separated port numbers of players to remove.

# --- Reboot ---

- id: reboot
  label: Soft Reboot Player
  kind: action
  endpoint: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1). Required to confirm reboot.

# --- Doorbell Chimes ---

- id: doorbell_play
  label: Activate Doorbell Chime
  kind: action
  endpoint: "GET /Doorbell"
  params:
    - name: play
      type: integer
      description: Always 1.

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  endpoint: "GET /audiomodes"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
```

## Feedbacks

```yaml
# /Status response fields (polled or long-polled)

- id: playback_state
  label: Playback State
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: "GET /Status -> <state>"

- id: volume_level
  label: Volume Level (0–100)
  type: integer
  range: [0, 100]
  note: "-1 means fixed volume"
  source: "GET /Status -> <volume>"

- id: volume_db
  label: Volume Level (dB)
  type: number
  source: "GET /Status -> <db>"

- id: mute_state
  label: Mute State
  type: integer
  values: [0, 1]
  note: "1 = muted"
  source: "GET /Status -> <mute>"

- id: mute_volume
  label: Unmuted Volume Level (when muted)
  type: integer
  range: [0, 100]
  source: "GET /Status -> <muteVolume>"

- id: mute_db
  label: Unmuted Volume in dB (when muted)
  type: number
  source: "GET /Status -> <muteDb>"

- id: shuffle_state
  label: Shuffle State
  type: integer
  values: [0, 1]
  source: "GET /Status -> <shuffle>"

- id: repeat_state
  label: Repeat State
  type: integer
  values: [0, 1, 2]
  note: "0 = repeat queue, 1 = repeat track, 2 = off"
  source: "GET /Status -> <repeat>"

- id: track_title1
  label: Now Playing Title Line 1
  type: string
  source: "GET /Status -> <title1>"

- id: track_title2
  label: Now Playing Title Line 2
  type: string
  source: "GET /Status -> <title2>"

- id: track_title3
  label: Now Playing Title Line 3
  type: string
  source: "GET /Status -> <title3>"

- id: track_position_secs
  label: Track Position (seconds)
  type: integer
  source: "GET /Status -> <secs>"
  note: "Not used in etag calculation; clients must increment locally."

- id: track_total_length
  label: Track Total Length (seconds)
  type: integer
  source: "GET /Status -> <totlen>"

- id: current_service
  label: Current Service
  type: string
  source: "GET /Status -> <service>"

- id: sleep_timer
  label: Sleep Timer (minutes remaining)
  type: integer
  source: "GET /Status -> <sleep>"

- id: sync_stat
  label: SyncStatus Change ID
  type: integer
  source: "GET /Status -> <syncStat>"

# /SyncStatus response fields

- id: sync_player_name
  label: Player Name
  type: string
  source: "GET /SyncStatus -> name attribute"

- id: sync_volume
  label: Player Volume (SyncStatus)
  type: integer
  range: [0, 100]
  note: "-1 means fixed volume"
  source: "GET /SyncStatus -> volume attribute"

- id: sync_group
  label: Group Name
  type: string
  source: "GET /SyncStatus -> group attribute"

- id: sync_initialized
  label: Player Initialized
  type: boolean
  source: "GET /SyncStatus -> initialized attribute"

# /Volume response fields

- id: volume_response_db
  label: Volume Response dB
  type: number
  source: "GET /Volume -> db attribute"

- id: volume_response_mute
  label: Volume Response Mute State
  type: integer
  values: [0, 1]
  source: "GET /Volume -> mute attribute"
```

## Variables

```yaml
# UNRESOLVED: No explicit settable-parameter registry in source beyond what is covered by Actions above.
```

## Events

```yaml
# Long-polling is supported on /Status and /SyncStatus. The server returns only when state changes or timeout expires.
# - timeout: polling interval in seconds (recommended 100s for /Status, 180s for /SyncStatus; never faster than 10s for /Status, or two consecutive requests within 1s).
# - etag: opaque value from previous response, used to detect changes.
# UNRESOLVED: No unsolicited push notifications described in source. All state delivery is via polling or long-polling.
```

## Macros

```yaml
# UNRESOLVED: No multi-step sequences explicitly described in source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # POST /reboot causes player soft reboot; source requires explicit 'yes' parameter
interlocks: []
# UNRESOLVED: No further safety warnings or power-on sequencing requirements stated in source.
```

## Notes

**Polling rate limits:**
- Without long-polling: at most one request every 30 seconds per resource.
- With long-polling: never two consecutive requests for the same resource less than 1 second apart.

**Long-polling:** Supported on `/Status` and `/SyncStatus`. Pass `timeout=<seconds>` and `etag=<previous-etag>`. Response is held until state changes or timeout expires.

**Primary vs. secondary players in groups:** Secondary player `/Status`, playback control, queue, and browse requests are proxied to the primary player. Use `/SyncStatus` long-polling to track individual secondary player volumes.

**Input selection — firmware dependency:**
- Firmware > v3.8.0 and < v4.2.0: use `/Play?inputIndex=N`.
- Firmware >= v4.2.0: use `/Play?inputTypeIndex=type-index` (e.g. `spdif-2`).

**Discovery:** Devices can be discovered via mDNS (`_musc._tcp`, `_musp._tcp`) or Lenbrook Service Discovery Protocol (LSDP) on UDP port 11430. LSDP is preferred for networks where multicast is unreliable.

**CI580 multi-node:** The NAD CI580 has four streamer nodes sharing one IP with ports 11000, 11010, 11020, 11030 for nodes 1–4.

**Reboot command:** Uses HTTP POST (`curl -d yes=1 <ip>/reboot`), not GET. Returns a plain-text "Rebooting" confirmation page.

**Bluetooth mode:** No response body is returned from `/audiomodes?bluetoothAutoplay=N`.

**Content browse:** All `key` parameter values must be URL-encoded (percent-escaped). The `withContextMenuItems=1` parameter returns inline `<contextMenu>` elements for each item.

<!-- UNRESOLVED: Exact firmware version range for the C 658 model is not stated in the source. -->
<!-- UNRESOLVED: No specific authentication or API key mechanism is described. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:01:38.268Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:01:38.268Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec actions map 1-to-1 to documented endpoints in the BluOS CI API source with matching parameters and transport."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
