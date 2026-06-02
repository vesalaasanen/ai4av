---
spec_id: admin/bluos-b160s
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS B160S Control Spec"
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
retrieved_at: 2026-05-16T17:46:59.255Z
last_checked_at: 2026-06-02T21:54:04.057Z
generated_at: 2026-06-02T21:54:04.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is the BluOS Custom Integration API, which covers the entire BluOS product family (Bluesound, NAD Electronics, DALI, etc.). It does not enumerate which specific features or inputs are present on the B160S model versus other models. Input types available on the B160S (analog, optical, Bluetooth, etc.) are not confirmed by the source for this specific model."
  - "no player-level settable parameters beyond the action endpoints above are documented in the source for per-player persistent configuration via the CI API."
  - "whether the B160S sends any unsolicited TCP/HTTP notifications outside of long polling."
  - "no multi-step macro sequences are documented in the source."
  - "no power sequencing requirements or safety interlocks are described in the source for the B160S."
  - "API version 1.7 (2025-04-09) is the source version. The spec does not document which BluOS firmware version maps to API version 1.7."
  - "Specific input types physically available on the B160S are not enumerated in this API document."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:54:04.057Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions traced to BluOS API v1.7. Standard playback, volume, input selection, grouping, and queue operations confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS B160S Control Spec

## Summary
The BluOS B160S is a network music player running the BluOS operating system. This spec covers the BluOS Custom Integration API v1.7 (HTTP/TCP, port 11000), which provides control of playback, volume, input selection, play queue management, presets, player grouping, and content browsing. All commands are HTTP GET requests (except reboot, which is an HTTP POST); responses are UTF-8 encoded XML.

<!-- UNRESOLVED: The source document is the BluOS Custom Integration API, which covers the entire BluOS product family (Bluesound, NAD Electronics, DALI, etc.). It does not enumerate which specific features or inputs are present on the B160S model versus other models. Input types available on the B160S (analog, optical, Bluetooth, etc.) are not confirmed by the source for this specific model. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
  # Note: The CI580 uses ports 11010, 11020, 11030 for nodes 2–4. For standard
  # single-streamer players including the B160S, port 11000 is used.
  # Port should be confirmed via mDNS (services _musc._tcp and _musp._tcp) or
  # the Lenbrook Service Discovery Protocol (LSDP, UDP port 11430).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable    # inferred from volume/mute control commands (/Volume?level=, /Volume?db=, /Volume?mute=)
- routable     # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=)
- powerable    # inferred from /reboot (soft reboot) command; power on/off not separately documented
```

## Actions
```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  params: []
  notes: "GET /Play — resumes current audio source"

- id: play_seek
  label: Play (Seek)
  kind: action
  params:
    - name: seek
      type: integer
      description: "Jump to position in seconds in the current track. Only valid if /Status response includes <totlen>."
    - name: id
      type: integer
      description: "Optional track id in queue (0-based). Combine with seek to jump to a position in a specific track."
  notes: "GET /Play?seek=<seconds>[&id=<trackid>]"

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded stream URL of custom audio to play."
  notes: "GET /Play?url=<encodedStreamURL>"

- id: pause
  label: Pause
  kind: action
  params: []
  notes: "GET /Pause"

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params:
    - name: toggle
      type: integer
      description: "Set to 1 to toggle current pause state."
  notes: "GET /Pause?toggle=1"

- id: stop
  label: Stop
  kind: action
  params: []
  notes: "GET /Stop"

- id: skip
  label: Skip (Next Track)
  kind: action
  params: []
  notes: "GET /Skip — skips to next track in play queue. Wraps to first if on last track."

- id: back
  label: Back (Previous Track)
  kind: action
  params: []
  notes: "GET /Back — returns to start of current track if >4s played, else goes to previous track."

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 to disable shuffle, 1 to enable shuffle."
  notes: "GET /Shuffle?state=<0|1>"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off."
  notes: "GET /Repeat?state=<0|1|2>"

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  params:
    - name: action_url
      type: string
      description: "Full action URL taken from the <action> element in /Status response (e.g., /Action?service=Slacker&skip=<id>)."
  notes: "GET <action_url> — used for skip, back, love, ban on streaming radio stations such as Slacker, Radio Paradise, Amazon Music Prime Stations."

# --- Volume Control ---

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume level 0–100."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = affect only this player, 1 = affect all grouped players."
  notes: "GET /Volume?level=<level>[&tell_slaves=<0|1>]"

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: "Absolute volume in dB. Clamped to configured available range (typically -80..0)."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = affect only this player, 1 = affect all grouped players."
  notes: "GET /Volume?abs_db=<db>[&tell_slaves=<0|1>]"

- id: volume_relative_db
  label: Volume Relative Adjust (dB)
  kind: action
  params:
    - name: db
      type: number
      description: "Relative dB change; positive = up, negative = down. Typical value is ±2."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = affect only this player, 1 = affect all grouped players."
  notes: "GET /Volume?db=<delta-db>[&tell_slaves=<0|1>]"

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

# --- Play Queue Management ---

- id: queue_delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: "Track id (position) in play queue to remove."
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
      description: "Destination position for the track."
  notes: "GET /Move?new=<destination>&old=<origin>"

- id: queue_clear
  label: Clear Play Queue
  kind: action
  params: []
  notes: "GET /Clear"

- id: queue_save
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: "Name for the saved BluOS playlist."
  notes: "GET /Save?name=<playlist_name>"

# --- Presets ---

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, or '+1' for next preset, or '-1' for previous preset."
  notes: "GET /Preset?id=<presetId|+1|-1>"

# --- Input Selection ---

- id: select_input_active
  label: Select Active Input (by URL)
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response."
  notes: "GET /Play?url=<URL_value> — for active inputs. Discover available URL values via GET /RadioBrowse?service=Capture."

- id: select_input_by_index
  label: Select External Input (by Index, firmware <4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture&schemaVersion=32 response, excluding Bluetooth."
  notes: "GET /Play?inputIndex=<IndexId> — for firmware newer than v3.8.0 and older than v4.2.0."

- id: select_input_by_type_index
  label: Select External Input (by Type-Index, firmware ≥4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Input type-index string, e.g. 'spdif-1', 'analog-1', 'bluetooth-1', 'arc-1', 'earc-1', 'phono-1', 'coax-1', 'computer-1', 'aesebu-1', 'balanced-1', 'microphone-1'. Index starts at 1 per type."
  notes: "GET /Play?inputTypeIndex=<type-index> — for firmware v4.2.0 or newer."

# --- Player Grouping ---

- id: group_add_player
  label: Add Player to Group (Single)
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of secondary player to add."
    - name: port
      type: integer
      description: "Port of secondary player (default 11000)."
    - name: group
      type: string
      description: "Optional. Name for the group."
  notes: "GET /AddSlave?slave=<ip>&port=<port>[&group=<GroupName>] — direct to primary player."

- id: group_add_multiple_players
  label: Add Multiple Players to Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of secondary players."
    - name: ports
      type: string
      description: "Comma-separated port numbers for secondary players."
  notes: "GET /AddSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

- id: group_remove_player
  label: Remove Player from Group (Single)
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of player to remove from group."
    - name: port
      type: integer
      description: "Port of player to remove."
  notes: "GET /RemoveSlave?slave=<ip>&port=<port>"

- id: group_remove_multiple_players
  label: Remove Multiple Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of players to remove."
    - name: ports
      type: string
      description: "Comma-separated port numbers."
  notes: "GET /RemoveSlave?slaves=<ip1,ip2>&ports=<port1,port2>"

# --- Player Reboot ---

- id: reboot
  label: Reboot Player (Soft)
  kind: action
  params:
    - name: yes
      type: string
      description: "Any value (e.g. '1')."
  notes: "HTTP POST /reboot with body yes=1. This is the only POST command in the API."

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params: []
  notes: "GET /Doorbell?play=1"

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  notes: "GET /audiomodes?bluetoothAutoplay=<value>. No response body returned."

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from prior /Browse response (browseKey, nextKey, parentKey, or contextMenuKey). Absence returns top-level browse."
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menu items in response."
  notes: "GET /Browse[?key=<key-value>][&withContextMenuItems=1]"

- id: search_music
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "URL-encoded searchKey value from a prior /Browse response."
    - name: q
      type: string
      description: "Search query string."
  notes: "GET /Browse?key=<searchKey>&q=<searchText>"
```

## Feedbacks
```yaml
- id: playback_status
  type: object
  description: "Full playback and volume state. Poll via GET /Status. Supports long polling with timeout and etag parameters."
  attributes:
    state:
      type: enum
      values: [play, stream, pause, stop, connecting]
    volume:
      type: integer
      description: "Volume 0–100, or -1 for fixed volume."
    db:
      type: number
      description: "Volume level in dB."
    mute:
      type: integer
      values: [0, 1]
    muteVolume:
      type: integer
      description: "Unmuted volume (0–100) when player is muted."
    muteDb:
      type: number
      description: "Unmuted volume in dB when player is muted."
    repeat:
      type: integer
      values: [0, 1, 2]
      description: "0=repeat queue, 1=repeat track, 2=repeat off."
    shuffle:
      type: integer
      values: [0, 1]
    album:
      type: string
    artist:
      type: string
    name:
      type: string
    title1:
      type: string
      description: "First line of now-playing metadata. MUST be used instead of album/artist/name in UI."
    title2:
      type: string
    title3:
      type: string
    secs:
      type: integer
      description: "Seconds played. Not included in etag calculation."
    totlen:
      type: integer
      description: "Total track length in seconds."
    canSeek:
      type: integer
      values: [0, 1]
    pid:
      type: integer
      description: "Unique play queue id."
    prid:
      type: integer
      description: "Unique preset id."
    syncStat:
      type: integer
      description: "Changes when /SyncStatus response changes."
    service:
      type: string
    streamFormat:
      type: string
    quality:
      type: string
      description: "cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate."
    sleep:
      type: string
      description: "Minutes remaining before sleep timer activates."
    actions:
      type: object
      description: "Present for streaming radio stations. Contains action elements with skip/back/love/ban URLs."
    etag:
      type: string
      description: "Opaque value for long-polling change detection."

- id: sync_status
  type: object
  description: "Player identity, grouping, and volume state. Poll via GET /SyncStatus. Supports long polling."
  attributes:
    name:
      type: string
      description: "Player name."
    modelName:
      type: string
    model:
      type: string
    brand:
      type: string
    volume:
      type: integer
      description: "Volume 0–100, or -1 for fixed."
    mute:
      type: integer
    group:
      type: string
    id:
      type: string
      description: "Player IP:port."
    mac:
      type: string
    initialized:
      type: boolean
    master:
      type: string
      description: "Primary player IP (only present if this player is secondary in a group)."
    slave:
      type: array
      description: "Secondary players (only present if this player is primary in a group)."
    syncStat:
      type: integer
    etag:
      type: string

- id: volume_state
  type: object
  description: "Current volume state returned by GET /Volume (also returned after any /Volume set command)."
  attributes:
    volume:
      type: integer
      description: "0–100, or -1 for fixed."
    db:
      type: number
    mute:
      type: integer
    muteVolume:
      type: integer
    muteDb:
      type: number

- id: playlist_state
  type: object
  description: "Play queue status from GET /Playlist or GET /Playlist?length=1."
  attributes:
    name:
      type: string
    modified:
      type: integer
      values: [0, 1]
    length:
      type: integer
    id:
      type: integer
    songs:
      type: array
      description: "Array of song elements. Each has albumid, service, artistid, songid, id (queue position), title, art, alb."

- id: presets_list
  type: object
  description: "All presets on the player from GET /Presets."
  attributes:
    prid:
      type: integer
    presets:
      type: array
      description: "Each preset has id, name, url, image."
```

## Variables
```yaml
# UNRESOLVED: no player-level settable parameters beyond the action endpoints above are documented in the source for per-player persistent configuration via the CI API.
```

## Events
```yaml
# The API supports long polling (timeout + etag) on /Status and /SyncStatus for change
# notification, but does not define unsolicited push events. The /Status <syncStat> element
# signals when /SyncStatus has changed, avoiding the need to separately poll both endpoints.
# UNRESOLVED: whether the B160S sends any unsolicited TCP/HTTP notifications outside of long polling.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # soft reboot is irreversible during the reboot window; source implies user acknowledgement via browser UI
interlocks: []
# UNRESOLVED: no power sequencing requirements or safety interlocks are described in the source for the B160S.
```

## Notes

**Request format:** All commands (except reboot) are HTTP GET to `http://<player_ip>:11000/<command>?<params>`. Parameters are standard URL-encoded name/value pairs. Responses are UTF-8 encoded XML. The reboot command is HTTP POST to `/reboot` with body `yes=1`.

**Port discovery:** Port 11000 is the default for single-streamer BluOS players. The actual port should be discovered via mDNS (_musc._tcp, _musp._tcp) or the Lenbrook Service Discovery Protocol (LSDP) on UDP port 11430.

**Long polling:** /Status and /SyncStatus both support long polling. Pass `timeout=<seconds>` and `etag=<value-from-previous-response>`. The connection is held until state changes or timeout. Without long polling, clients should poll at most once every 30 seconds. With long polling active, do not make two consecutive requests for the same resource less than 1 second apart.

**Player grouping:** When players are grouped, the secondary players proxy most requests to the primary player. Volume of individual secondary players is tracked via /SyncStatus, not /Status.

**Input selection (firmware branching):** Two command variants exist for external input selection. Use `/Play?inputIndex=` for firmware newer than v3.8.0 and older than v4.2.0. Use `/Play?inputTypeIndex=` for firmware v4.2.0 or newer. Active inputs (visible in /RadioBrowse?service=Capture) can also be selected via `/Play?url=<URL_value>`.

**Streaming radio actions:** Skip, back, love, and ban are not available on all streaming sources. Check for the presence of `<actions>` in the /Status response before presenting these controls. The action URLs must be used verbatim from the response.

**secs field in /Status:** The `secs` value (elapsed playback seconds) is excluded from the etag calculation and will not by itself cause a long-poll to return. Clients must increment the displayed position locally based on elapsed time since the response when state is `play` or `stream`.

<!-- UNRESOLVED: API version 1.7 (2025-04-09) is the source version. The spec does not document which BluOS firmware version maps to API version 1.7. -->
<!-- UNRESOLVED: Specific input types physically available on the B160S are not enumerated in this API document. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T17:46:59.255Z
last_checked_at: 2026-06-02T21:54:04.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:54:04.057Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions traced to BluOS API v1.7. Standard playback, volume, input selection, grouping, and queue operations confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is the BluOS Custom Integration API, which covers the entire BluOS product family (Bluesound, NAD Electronics, DALI, etc.). It does not enumerate which specific features or inputs are present on the B160S model versus other models. Input types available on the B160S (analog, optical, Bluetooth, etc.) are not confirmed by the source for this specific model."
- "no player-level settable parameters beyond the action endpoints above are documented in the source for per-player persistent configuration via the CI API."
- "whether the B160S sends any unsolicited TCP/HTTP notifications outside of long polling."
- "no multi-step macro sequences are documented in the source."
- "no power sequencing requirements or safety interlocks are described in the source for the B160S."
- "API version 1.7 (2025-04-09) is the source version. The spec does not document which BluOS firmware version maps to API version 1.7."
- "Specific input types physically available on the B160S are not enumerated in this API document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
