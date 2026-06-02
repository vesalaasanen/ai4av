---
spec_id: admin/bluos-m33-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS M33 Volume Control Spec"
manufacturer: BluOS
model_family: "BluOS M33"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS M33"
    - "Bluesound players"
    - "NAD Electronics players"
    - "DALI Loudspeakers players"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T21:35:26.990Z
last_checked_at: 2026-05-16T19:42:14.529Z
generated_at: 2026-05-16T19:42:14.529Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Model-specific command support (which models have HDMI ARC, eARC, phono, etc.) is not stated in source. The CI580 multi-zone device uses non-standard port layout (11000/11010/11020/11030); this spec treats single-zone port 11000 as the default."
  - "No settable parameters outside of discrete actions documented in source."
  - "No multi-step macros are described explicitly in the source."
  - "No explicit interlock or power-sequencing requirements stated in source."
  - "Specific firmware version ranges for each model (M33 vs. Bluesound PULSE vs. NAD etc.) are not enumerated in the source. The spec assumes general BluOS API v1.7 compatibility."
  - "Error response format beyond the <error><message/><detail/></error> structure mentioned for /Browse is not documented in source for other endpoints."
  - "Authentication or access control mechanisms are not described; the API appears to be unauthenticated on the local network."
verification:
  verdict: verified
  checked_at: 2026-05-16T19:42:14.529Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched verbatim in the source with correct shapes and transport confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS M33 Volume Control Spec

## Summary

The BluOS Custom Integration API (v1.7) is an HTTP-based control protocol for BluOS players, including products from Bluesound, NAD Electronics, and DALI Loudspeakers. All commands are HTTP GET requests (except player reboot, which is POST) sent to `http://<player_ip>:<port>/<request>`; responses are UTF-8 encoded XML. This spec covers volume control, playback control, play queue management, presets, content browsing, player grouping, and input selection.

<!-- UNRESOLVED: Model-specific command support (which models have HDMI ARC, eARC, phono, etc.) is not stated in source. The CI580 multi-zone device uses non-standard port layout (11000/11010/11020/11030); this spec treats single-zone port 11000 as the default. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # stated in source; CI580 node 1 uses 11000, nodes 2-4 use 11010/11020/11030
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable       # volume set/get commands present
- queryable       # /Status, /SyncStatus, /Volume, /Playlist, /Presets, /Browse all return state
- powerable       # /reboot (soft reboot) command present; no power on/off toggle found in source
- routable        # input selection commands present (/Play?url=, /Play?inputIndex=, /Play?inputTypeIndex=)
```

## Actions

```yaml
# --- Volume Control ---

- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      range: "0..100"
      description: Absolute volume level (0–100). -1 indicates fixed volume (read-only).
    - name: tell_slaves
      type: integer
      range: "0|1"
      description: "Optional. If 1, applies volume change to all players in the group. If 0 (default), applies only to the addressed player."
  request: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  response_xml: "<volume db=\"...\" mute=\"0|1\" offsetDb=\"...\" etag=\"...\">{level}</volume>"

- id: set_volume_absolute_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume level in dB (typically -80..0 range, configured via BluOS Controller app).
    - name: tell_slaves
      type: integer
      range: "0|1"
      description: "Optional. If 1, applies to all grouped players."
  request: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"
  response_xml: "<volume db=\"...\" mute=\"0|1\" offsetDb=\"...\" etag=\"...\">{level}</volume>"

- id: set_volume_relative_db
  label: Set Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative volume change in dB. Positive increases volume, negative decreases.
    - name: tell_slaves
      type: integer
      range: "0|1"
      description: "Optional. If 1, applies to all grouped players."
  request: "GET /Volume?db={db}&tell_slaves={tell_slaves}"
  response_xml: "<volume db=\"...\" mute=\"0|1\" offsetDb=\"...\" etag=\"...\">{level}</volume>"

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: db
      type: number
      description: Volume increase in dB. Typical value is 2.
  request: "GET /Volume?db={db}"
  notes: "Typical call: /Volume?db=2"

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: db
      type: number
      description: Volume decrease in dB expressed as a negative number. Typical value is -2.
  request: "GET /Volume?db={db}"
  notes: "Typical call: /Volume?db=-2"

- id: mute_on
  label: Mute
  kind: action
  params: []
  request: "GET /Volume?mute=1"
  response_xml: "<volume muteDb=\"...\" db=\"-100\" muteVolume=\"...\" mute=\"1\" offsetDb=\"...\" etag=\"...\">0</volume>"

- id: mute_off
  label: Unmute
  kind: action
  params: []
  request: "GET /Volume?mute=0"
  response_xml: "<volume db=\"...\" mute=\"0\" offsetDb=\"...\" etag=\"...\">{level}</volume>"

# --- Playback Control ---

- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      description: "Optional. Jump to position in seconds. Only valid when /Status includes <totlen>."
    - name: id
      type: integer
      description: "Optional. Track id in the queue. Used with seek."
    - name: url
      type: string
      description: "Optional. URL-encoded stream URL to play directly."
  request: "GET /Play[?seek={seconds}][&id={trackid}][?url={encodedStreamURL}]"
  response_xml: "<state>play</state>  <!-- or <state>stream</state> -->"

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      range: "0|1"
      description: "Optional. If 1, toggles current pause state."
  request: "GET /Pause[?toggle=1]"
  response_xml: "<state>pause</state>"

- id: stop
  label: Stop
  kind: action
  params: []
  request: "GET /Stop"
  response_xml: "<state>stop</state>"

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  request: "GET /Skip"
  response_xml: "<id>{track_id}</id>"
  notes: "Only works when playing from the play queue (no <streamUrl> in /Status response). For streaming radio, use /Action."

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  request: "GET /Back"
  response_xml: "<id>{track_id}</id>"
  notes: "If track has played >4 seconds, returns to start of current track. Otherwise goes to previous track. Only works when playing from the play queue."

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      range: "0|1"
      description: "0 to disable shuffle, 1 to enable shuffle."
  request: "GET /Shuffle?state={state}"
  response_xml: "<playlist name=\"...\" modified=\"0|1\" length=\"...\" shuffle=\"0|1\" id=\"...\"/>"

- id: repeat
  label: Set Repeat Mode
  kind: action
  params:
    - name: state
      type: integer
      range: "0|1|2"
      description: "0 = repeat entire queue, 1 = repeat current track, 2 = repeat off."
  request: "GET /Repeat?state={state}"
  response_xml: "<playlist length=\"...\" id=\"...\" repeat=\"0|1|2\"/>"

- id: streaming_radio_action
  label: Streaming Radio Action (Skip/Back/Love/Ban)
  kind: action
  params:
    - name: action_url
      type: string
      description: "The full action URL taken from the <action> element in /Status response (e.g., /Action?service=Slacker&skip=...)."
  request: "GET {action_url}"
  notes: "Use when <streamUrl> is present in /Status. Action URLs are provided by the player in the <actions> block of /Status response."

# --- Play Queue Management ---

- id: list_playlist
  label: List Play Queue
  kind: action
  params:
    - name: length
      type: integer
      description: "Optional. Set to 1 to return only queue status without track details."
    - name: start
      type: integer
      description: "Optional. First track index (0-based) for pagination."
    - name: end
      type: integer
      description: "Optional. Last track index for pagination."
  request: "GET /Playlist[?length=1][?start={first}&end={last}]"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id (position) in the play queue to delete.
  request: "GET /Delete?id={id}"
  response_xml: "<deleted>{position}</deleted>"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Current position of the track.
    - name: new
      type: integer
      description: New position for the track.
  request: "GET /Move?new={new}&old={old}"
  response_xml: "<moved>moved</moved>"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  request: "GET /Clear"
  response_xml: "<playlist modified=\"0\" length=\"0\" id=\"...\"/>"

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist.
  request: "GET /Save?name={playlist_name}"
  response_xml: "<saved><entries>{count}</entries></saved>"

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  params: []
  request: "GET /Presets"
  response_xml: "<presets prid=\"...\"><preset id=\"...\" name=\"...\" url=\"...\" image=\"...\"/>...</presets>"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, '+1' for next preset, or '-1' for previous preset."
  request: "GET /Preset?id={id}"
  response_xml: "<loaded service=\"...\"><entries>{count}</entries></loaded>  <!-- or <state>stream</state> for radio -->"

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from a previous response. Absent for top-level browse."
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menus in the response."
    - name: q
      type: string
      description: "Optional. Search string. Use with a searchKey to search within a service."
  request: "GET /Browse[?key={key}][&withContextMenuItems=1][&q={searchText}]"
  response_xml: "<browse ...><item .../> ...</browse>"

# --- Player Grouping ---

- id: add_slave
  label: Add Secondary Player(s) to Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of a single secondary player."
    - name: slaves
      type: string
      description: "Comma-separated IP addresses for adding multiple secondary players."
    - name: port
      type: integer
      description: "Port of the secondary player (default 11000)."
    - name: ports
      type: string
      description: "Comma-separated ports for multiple players."
    - name: group
      type: string
      description: "Optional. Group name. BluOS assigns default name if omitted."
  request: "GET /AddSlave?slave={ip}&port={port}[&group={name}]  <!-- or slaves={ips}&ports={ports} -->"
  response_xml: "<addSlave><slave port=\"...\" id=\"...\"/>...</addSlave>"

- id: remove_slave
  label: Remove Secondary Player(s) from Group
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of the secondary player to remove."
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of multiple secondary players to remove."
    - name: port
      type: integer
      description: "Port of the secondary player."
    - name: ports
      type: string
      description: "Comma-separated ports."
  request: "GET /RemoveSlave?slave={ip}&port={port}  <!-- or slaves={ips}&ports={ports} -->"
  response_xml: "<SyncStatus ...>...</SyncStatus>"

# --- Input Selection ---

- id: select_active_input
  label: Select Active Input
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response."
  request: "GET /Play?url={encodedInputURL}"
  response_xml: "<state>stream</state>"
  notes: "First call /RadioBrowse?service=Capture to get available input URLs."

- id: select_external_input_by_index
  label: Select External Input by Index (firmware <4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture&schemaVersion=32 (excluding Bluetooth)."
  request: "GET /Play?inputIndex={index}"
  response_xml: "<state>stream</state>"
  notes: "Only for firmware newer than v3.8.0 and older than v4.2.0."

- id: select_external_input_by_type_index
  label: Select External Input by Type-Index (firmware v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Type-index string in the format '{type}-{index}', e.g. 'spdif-1', 'analog-1', 'bluetooth-1'. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone."
  request: "GET /Play?inputTypeIndex={type}-{index}"
  response_xml: "<state>stream</state>"
  notes: "Only for firmware v4.2.0 or newer."

# --- Reboot ---

- id: reboot_player
  label: Reboot Player (Soft Reboot)
  kind: action
  params:
    - name: yes
      type: string
      description: "Any value (e.g. '1'). Required."
  request: "POST /reboot  (body: yes=1)"
  notes: "Uses HTTP POST, not GET. Example: curl -d yes=1 192.168.1.100/reboot"

# --- Doorbell ---

- id: play_doorbell
  label: Play Doorbell Chime
  kind: action
  params: []
  request: "GET /Doorbell?play=1"
  response_xml: "<status enable=\"1\" volume=\"...\" chime=\"...\"/>"

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      range: "0|1|2|3"
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  request: "GET /audiomodes?bluetoothAutoplay={value}"
  notes: "No response body returned."
```

## Feedbacks

```yaml
- id: volume_state
  label: Volume State
  type: object
  query_request: "GET /Volume"
  response_xml: "<volume db=\"{db}\" mute=\"{0|1}\" muteDb=\"{db}\" muteVolume=\"{0..100}\" offsetDb=\"{offset}\" etag=\"{etag}\">{level 0..100 or -1}</volume>"
  fields:
    - name: volume
      type: integer
      description: "Current volume level 0..100, or -1 for fixed volume."
    - name: db
      type: number
      description: "Volume level in dB."
    - name: mute
      type: integer
      values: [0, 1]
      description: "1 if muted, 0 if not muted."
    - name: muteDb
      type: number
      description: "Unmuted volume in dB, present only when muted."
    - name: muteVolume
      type: integer
      description: "Unmuted volume 0..100, present only when muted."
    - name: etag
      type: string
      description: "Opaque value for long-polling."

- id: playback_status
  label: Playback Status
  type: object
  query_request: "GET /Status[?timeout={seconds}&etag={etag}]"
  polling_notes: "Supports long polling via timeout and etag parameters. Regular polling must not exceed once per 30 seconds. Long poll interval should not exceed 60 seconds and never faster than 10 seconds."
  key_fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
      description: "Current player state."
    - name: volume
      type: integer
      description: "Volume 0..100 or -1 for fixed volume."
    - name: mute
      type: integer
      values: [0, 1]
      description: "1 if muted."
    - name: shuffle
      type: integer
      values: [0, 1]
    - name: repeat
      type: integer
      values: [0, 1, 2]
      description: "0=repeat queue, 1=repeat track, 2=repeat off."
    - name: title1
      type: string
      description: "First line of now-playing metadata. MUST be used for UI display."
    - name: title2
      type: string
      description: "Second line of now-playing metadata."
    - name: title3
      type: string
      description: "Third line of now-playing metadata."
    - name: syncStat
      type: string
      description: "Changes when /SyncStatus changes. Use to know when to refresh /SyncStatus."
    - name: pid
      type: integer
      description: "Unique play queue id."
    - name: prid
      type: integer
      description: "Unique preset id."
    - name: secs
      type: integer
      description: "Seconds played of current track. NOT included in etag calculation — client must increment locally."

- id: sync_status
  label: Player and Group Sync Status
  type: object
  query_request: "GET /SyncStatus[?timeout={seconds}&etag={etag}]"
  polling_notes: "Supports long polling. Recommended interval 180 seconds. Required to track volume of secondary players in a group."
  key_fields:
    - name: volume
      type: integer
      description: "Volume 0..100 or -1 for fixed."
    - name: mute
      type: integer
      values: [0, 1]
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
      description: "Group name if player is primary."
    - name: master
      type: string
      description: "Primary player IP. Only present if this player is a secondary."
    - name: slave
      type: string
      description: "Secondary player IP(s). Only present if this player is primary."
    - name: initialized
      type: boolean
      description: "True if player is set up; false means setup via BluOS Controller app is required."
```

## Variables

```yaml
# UNRESOLVED: No settable parameters outside of discrete actions documented in source.
# Volume range (typically -80..0 dB) is adjustable via the BluOS Controller app UI, not via API.
```

## Events

```yaml
# Unsolicited events are not described in the source as push notifications.
# The API uses long-polling (not server-push) for state change detection.
# Long-poll endpoints: /Status and /SyncStatus (with timeout + etag parameters).
```

## Macros

```yaml
# UNRESOLVED: No multi-step macros are described explicitly in the source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot_player  # soft reboot; source implies irreversible action during the operation
interlocks: []
# UNRESOLVED: No explicit interlock or power-sequencing requirements stated in source.
```

## Notes

**Port discovery:** Port 11000 is used for all standard BluOS players. The CI580 uses ports 11000/11010/11020/11030 for its four streaming nodes. The authoritative port should be discovered via mDNS services `_musc._tcp` / `_musp._tcp`, or via the Lenbrook Service Discovery Protocol (LSDP) on UDP port 11430.

**Long polling:** Both `/Status` and `/SyncStatus` support long polling via `timeout` (seconds) and `etag` (from previous response) parameters. Long polling significantly reduces polling frequency. The client must not make two consecutive requests for the same resource less than 1 second apart. Only one of `/Status` or `/SyncStatus` needs long-poll active at a time; `/Status` includes a `syncStat` element to signal when `/SyncStatus` has changed.

**Grouped players:** When players are grouped, `/Status` on a secondary player mirrors the primary player. Use `/SyncStatus` long-polling to track the volume of individual players in a group. Volume changes with `tell_slaves=1` propagate to all players in the group.

**Input selection:** Two separate firmware-gated methods exist for external input selection: `inputIndex` (firmware >3.8.0, <4.2.0) and `inputTypeIndex` (firmware ≥4.2.0). Active inputs (visible in `/RadioBrowse?service=Capture`) can use the `/Play?url=` method regardless of firmware version.

**secs field:** The `secs` field in `/Status` is not factored into the etag calculation. A long-poll will NOT return early just because playback seconds have advanced. Clients must increment playback position locally while state is `play` or `stream`.

**Now-playing display:** Always use `title1`, `title2`, `title3` for three-line UI display. If `twoline_title1` / `twoline_title2` are present, use them for two-line display. Do not use `album`, `artist`, `name` fields directly in UI.

**Streaming radio vs. play queue:** If `<streamUrl>` is present in `/Status`, the player is streaming a radio station. `/Skip`, `/Back`, and shuffle/repeat controls are not relevant. Use the `/Action` command with URLs from the `<actions>` block in `/Status` for skip/back/love/ban on streaming radio.

**LSDP discovery:** Lenbrook Service Discovery Protocol (LSDP) uses UDP broadcast on port 11430. It is an alternative to mDNS for networks where multicast traffic is unreliable. Packets use binary format with "LSDP" magic word and big-endian encoding.

<!-- UNRESOLVED: Specific firmware version ranges for each model (M33 vs. Bluesound PULSE vs. NAD etc.) are not enumerated in the source. The spec assumes general BluOS API v1.7 compatibility. -->
<!-- UNRESOLVED: Error response format beyond the <error><message/><detail/></error> structure mentioned for /Browse is not documented in source for other endpoints. -->
<!-- UNRESOLVED: Authentication or access control mechanisms are not described; the API appears to be unauthenticated on the local network. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T21:35:26.990Z
last_checked_at: 2026-05-16T19:42:14.529Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:42:14.529Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched verbatim in the source with correct shapes and transport confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Model-specific command support (which models have HDMI ARC, eARC, phono, etc.) is not stated in source. The CI580 multi-zone device uses non-standard port layout (11000/11010/11020/11030); this spec treats single-zone port 11000 as the default."
- "No settable parameters outside of discrete actions documented in source."
- "No multi-step macros are described explicitly in the source."
- "No explicit interlock or power-sequencing requirements stated in source."
- "Specific firmware version ranges for each model (M33 vs. Bluesound PULSE vs. NAD etc.) are not enumerated in the source. The spec assumes general BluOS API v1.7 compatibility."
- "Error response format beyond the <error><message/><detail/></error> structure mentioned for /Browse is not documented in source for other endpoints."
- "Authentication or access control mechanisms are not described; the API appears to be unauthenticated on the local network."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
