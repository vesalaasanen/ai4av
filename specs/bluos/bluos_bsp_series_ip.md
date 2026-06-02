---
spec_id: admin/bluos-bsp-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS BSP Series Control Spec"
manufacturer: BluOS
model_family: "BSP Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BSP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T18:31:02.107Z
last_checked_at: 2026-05-16T18:31:02.107Z
generated_at: 2026-05-16T18:31:02.107Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific BSP Series model numbers are not listed in the source document; the source covers all BluOS players generically"
  - "no explicit settable parameter registry beyond what is covered in Actions/Feedbacks; volume range can be adjusted via BluOS Controller app (Settings -> Player -> Audio) but not via the API described in this document."
  - "no explicit multi-step macros defined in source."
  - "no explicit safety warnings or interlock procedures stated in source."
  - "specific BSP Series model numbers that implement this API are not enumerated in the source. The source covers \"BluOS players\" generically across Bluesound, NAD, and DALI product lines."
  - "authentication — source contains no login or credential procedure, so none is inferred. However, it is unclear whether the API enforces network-level isolation or whether any access control applies in enterprise environments."
  - "error response format — source mentions <error> root element with <message> and <detail> text nodes for /Browse errors but does not document the general error response schema for other endpoints."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-16T18:31:02.107Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions map 1:1 to documented endpoints in the source; transport port 11000 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS BSP Series Control Spec

## Summary

BluOS is a music management and streaming OS found in products from Bluesound, NAD Electronics, DALI Loudspeakers, and others. This spec covers the BluOS Custom Integration API v1.7, which provides HTTP GET-based control of BluOS players including playback control, volume, play queue management, preset loading, content browsing, player grouping, and input selection. All requests are sent as HTTP GET (or POST for reboot) to `http://<player_ip>:<port>/<command>` and responses are UTF-8 encoded XML. Port 11000 is standard for most players; the CI580 uses ports 11000/11010/11020/11030 for its four nodes.

<!-- UNRESOLVED: specific BSP Series model numbers are not listed in the source document; the source covers all BluOS players generically -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # default for all BluOS players except CI580 multi-node units; discover via mDNS (_musc._tcp / _musp._tcp) or LSDP (UDP port 11430)
  base_url: http://<player_ip>:11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- queryable    # inferred from query command examples (Status, SyncStatus, Volume, Playlist, Presets, Browse)
- levelable    # inferred from volume control commands (set level, mute, dB adjustment)
- routable     # inferred from input selection and player grouping commands
- powerable    # inferred from reboot command; no explicit power on/off command found — see Notes
```

## Actions

```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      description: Optional. Jump to this position in seconds in the current track. Only valid if /Status includes <totlen>.
      required: false
    - name: id
      type: integer
      description: Optional. Track position in queue to start playing (used with seek).
      required: false
    - name: url
      type: string
      description: Optional. URL-encoded stream URL to play directly.
      required: false
  notes: "GET /Play or /Play?seek=<seconds> or /Play?url=<encodedURL>"

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      description: Optional. If set to 1, toggles the current pause state.
      required: false
  notes: "GET /Pause or /Pause?toggle=1"

- id: stop
  label: Stop
  kind: action
  params: []
  notes: "GET /Stop"

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  notes: "GET /Skip — skips to next track in play queue. Not available for all streaming sources."

- id: back
  label: Back / Previous Track
  kind: action
  params: []
  notes: "GET /Back — returns to track start if >4 seconds played, otherwise goes to previous track."

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 to disable shuffle, 1 to enable shuffle."
      required: true
  notes: "GET /Shuffle?state=0|1"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat play queue; 1 = repeat current track; 2 = repeat off."
      required: true
  notes: "GET /Repeat?state=0|1|2"

- id: action_streaming
  label: Streaming Radio Action (Skip/Back/Love/Ban)
  kind: action
  params:
    - name: service
      type: string
      description: Service name (e.g., Slacker).
      required: true
    - name: action_param
      type: string
      description: "Action-specific parameter taken from the <action> element in /Status response (e.g., skip=<id>, ban=<id>, love=<id>)."
      required: true
  notes: "GET /Action?service=<name>&<action>=<value>. Exact URL is provided in the <action> element of the /Status response."

# --- Volume Control ---

- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level, 0–100.
      required: true
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = change only this player; 1 = change all players in group."
      required: false
  notes: "GET /Volume?level=<0-100>&tell_slaves=<0|1>"

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB.
      required: true
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = change only this player; 1 = change all players in group."
      required: false
  notes: "GET /Volume?abs_db=<db>"

- id: set_volume_relative_db
  label: Adjust Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative dB change (positive to increase, negative to decrease). Typical values +2 or -2.
      required: true
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = change only this player; 1 = change all players in group."
      required: false
  notes: "GET /Volume?db=<delta> (e.g., /Volume?db=2 or /Volume?db=-2)"

- id: mute
  label: Mute
  kind: action
  params: []
  notes: "GET /Volume?mute=1"

- id: unmute
  label: Unmute
  kind: action
  params: []
  notes: "GET /Volume?mute=0"

# --- Play Queue Management ---

- id: list_tracks
  label: List Play Queue Tracks
  kind: action
  params:
    - name: length
      type: integer
      description: "Optional. Set to 1 to return only top-level queue attributes (no track details)."
      required: false
    - name: start
      type: integer
      description: "Optional. First entry in the queue to include (0-based). For pagination."
      required: false
    - name: end
      type: integer
      description: "Optional. Last entry in the queue to include."
      required: false
  notes: "GET /Playlist or /Playlist?length=1 or /Playlist?start=<n>&end=<m>"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track position (id) in the play queue to remove.
      required: true
  notes: "GET /Delete?id=<position>"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: new
      type: integer
      description: New position for the track.
      required: true
    - name: old
      type: integer
      description: Current position of the track.
      required: true
  notes: "GET /Move?new=<dest>&old=<origin>"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  notes: "GET /Clear"

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: Name to save the play queue as.
      required: true
  notes: "GET /Save?name=<playlist_name>"

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  params: []
  notes: "GET /Presets"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id to load. Use +1 for next preset, -1 for previous preset, or a specific preset id number."
      required: true
  notes: "GET /Preset?id=<presetId|+1|-1>"

# --- Content Browsing ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from a previous response (browseKey, nextKey, parentKey, or contextMenuKey attribute)."
      required: false
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menu items."
      required: false
  notes: "GET /Browse or /Browse?key=<encoded-key>"

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: "Value from a searchKey attribute in a previous /Browse response."
      required: true
    - name: q
      type: string
      description: Search string.
      required: true
  notes: "GET /Browse?key=<searchKey>&q=<searchText>"

# --- Player Grouping ---

- id: add_slave
  label: Group Player (Add Secondary Player)
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to add.
      required: true
    - name: port
      type: integer
      description: Port number of the secondary player. Default is 11000.
      required: true
    - name: group
      type: string
      description: "Optional. Group name. If omitted, BluOS assigns a default."
      required: false
  notes: "GET /AddSlave?slave=<ip>&port=<port>"

- id: add_slaves
  label: Group Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to add.
      required: true
    - name: ports
      type: string
      description: Comma-separated port numbers corresponding to the secondary players.
      required: true
  notes: "GET /AddSlave?slaves=<ip1,ip2,...>&ports=<port1,port2,...>"

- id: remove_slave
  label: Remove Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the player to remove from the group.
      required: true
    - name: port
      type: integer
      description: Port of the player to remove.
      required: true
  notes: "GET /RemoveSlave?slave=<ip>&port=<port>"

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of players to remove.
      required: true
    - name: ports
      type: string
      description: Comma-separated port numbers of the players to remove.
      required: true
  notes: "GET /RemoveSlave?slaves=<ip1,ip2,...>&ports=<port1,port2,...>"

# --- Input Selection ---

- id: select_active_input
  label: Select Active Input (by URL)
  kind: action
  params:
    - name: url
      type: string
      description: "URL-encoded input URL from /RadioBrowse?service=Capture response."
      required: true
  notes: "GET /Play?url=<encoded-capture-url>. First query /RadioBrowse?service=Capture to get available input URLs."

- id: select_input_by_index
  label: Select External Input by Index (firmware <4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "Index (1-based) of the input in /Settings?id=capture&schemaVersion=32 response (Bluetooth excluded)."
      required: true
  notes: "GET /Play?InputId=<index>. For firmware newer than v3.8.0 and older than v4.2.0."

- id: select_input_by_type_index
  label: Select External Input by Type-Index (firmware >=4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: <type>-<index>. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Example: spdif-2 for Optical Input 2."
      required: true
  notes: "GET /Play?inputTypeIndex=<type>-<index>. For firmware v4.2.0 or newer."

# --- Doorbell ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: Always set to 1.
      required: true
  notes: "GET /Doorbell?play=1"

# --- Bluetooth ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual; 1 = Automatic; 2 = Guest; 3 = Disabled."
      required: true
  notes: "GET /audiomodes?bluetoothAutoplay=<0|1|2|3>. No response body is returned."

# --- Reboot ---

- id: reboot
  label: Reboot Player
  kind: action
  params:
    - name: yes
      type: string
      description: Any value (e.g., 1).
      required: true
  notes: "POST /reboot with body parameter yes=1. Example: curl -d yes=1 http://<player_ip>/reboot"
```

## Feedbacks

```yaml
# --- Playback Status (/Status) ---

- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: "/Status response <state> element"
  notes: "play and stream should be treated as equivalent. Use /Play to resume from pause; cannot resume from stop state."

- id: playback_title1
  type: string
  source: "/Status response <title1> element"
  notes: "First line of now-playing metadata. MUST be used (not album/artist/name) in any 3-line UI."

- id: playback_title2
  type: string
  source: "/Status response <title2> element"

- id: playback_title3
  type: string
  source: "/Status response <title3> element"

- id: volume_level
  type: integer
  range: "-1 to 100"
  source: "/Status or /Volume response <volume> element"
  notes: "-1 means fixed volume."

- id: volume_db
  type: number
  source: "/Status or /Volume response db attribute"

- id: mute_state
  type: integer
  values: [0, 1]
  source: "/Status or /Volume response mute attribute"
  notes: "1 = muted, 0 = unmuted."

- id: shuffle_state
  type: integer
  values: [0, 1]
  source: "/Status response <shuffle> element"

- id: repeat_state
  type: integer
  values: [0, 1, 2]
  source: "/Status response <repeat> element"
  notes: "0 = repeat queue, 1 = repeat track, 2 = repeat off."

- id: current_track_position_secs
  type: integer
  source: "/Status response <secs> element"
  notes: "Not included in etag calculation; clients must increment position locally between polls."

- id: total_track_length_secs
  type: integer
  source: "/Status response <totlen> element"

- id: current_queue_id
  type: integer
  source: "/Status response <pid> element"

- id: preset_id
  type: integer
  source: "/Status response <prid> element"

- id: sync_stat
  type: integer
  source: "/Status response <syncStat> element"
  notes: "Changes when /SyncStatus changes. If monitoring playback only, /Status long-polling is sufficient; check this field to know when to also query /SyncStatus."

- id: service_name
  type: string
  source: "/Status response <service> element"

- id: stream_format
  type: string
  source: "/Status response <streamFormat> element"

- id: quality
  type: string
  source: "/Status response <quality> element"
  notes: "cd = CD-quality lossless; hd = hi-res lossless; dolbyAudio = Dolby/AC3; mqa = MQA decoded; mqaAuthored = MQA-Authored decoded; numeric = approximate compressed bitrate."

- id: is_stream_url_mode
  type: boolean
  source: "/Status response <streamUrl> presence"
  notes: "If present, play queue is not the source; shuffle/repeat/skip/back are not applicable."

# --- Sync Status (/SyncStatus) ---

- id: player_name
  type: string
  source: "/SyncStatus response name attribute"

- id: player_model
  type: string
  source: "/SyncStatus response model attribute"

- id: player_brand
  type: string
  source: "/SyncStatus response brand attribute"

- id: group_name
  type: string
  source: "/SyncStatus response group attribute"

- id: player_initialized
  type: boolean
  source: "/SyncStatus response initialized attribute"
  notes: "false means player needs setup via the BluOS Controller app."

- id: is_master
  type: boolean
  source: "/SyncStatus — master element absent means player is primary; master element present means secondary."

- id: slave_players
  type: array
  source: "/SyncStatus response <slave> elements"
  notes: "Each slave has id (IP:port) attribute."
```

## Variables

```yaml
# UNRESOLVED: no explicit settable parameter registry beyond what is covered in Actions/Feedbacks; volume range can be adjusted via BluOS Controller app (Settings -> Player -> Audio) but not via the API described in this document.
```

## Events

```yaml
# Long polling is supported on /Status and /SyncStatus. These are not unsolicited push events but rather held HTTP responses:

- id: status_changed
  description: "Long-poll on /Status?timeout=<seconds>&etag=<prev-etag> — response held until state changes or timeout. Recommended interval: 100 seconds; minimum: 10 seconds."

- id: sync_status_changed
  description: "Long-poll on /SyncStatus?timeout=<seconds>&etag=<prev-etag> — response held until grouping/volume/name changes or timeout. Recommended interval: 180 seconds."

- id: volume_changed
  description: "Long-poll on /Volume (supports long polling, not illustrated in source)."
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step macros defined in source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # inferred: reboot command triggers a soft reboot; no warning text in source but integrators should confirm before invoking
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source.
```

## Notes

**Port discovery:** Port 11000 is standard. For CI580 (4-node chassis), use 11000/11010/11020/11030 per node. Actual port should be discovered via mDNS services `_musc._tcp` and `_musp._tcp`, or via the Lenbrook Service Discovery Protocol (LSDP) on UDP port 11430.

**Long polling:** The API supports long polling on /Status and /SyncStatus (and /Volume). When using long polling, clients must not make two consecutive requests for the same resource less than 1 second apart. When not using long polling, restrict polling to at most once every 30 seconds.

**Grouped players:** Secondary players proxy most requests to the primary player. To track individual secondary player volume, long-poll /SyncStatus on each secondary player.

**Input selection API version split:** Two APIs exist for external input selection — the older `/Play?InputId=<index>` (firmware >v3.8.0 and <v4.2.0) and the newer `/Play?inputTypeIndex=<type>-<index>` (firmware v4.2.0+). Integrators should detect firmware version or use active input selection via `/RadioBrowse?service=Capture` where possible.

**Power on/off:** No explicit power on or power off HTTP command was found in this API document. The reboot command (`POST /reboot?yes=1`) triggers a soft reboot only. Power-on may require Wake-on-LAN or physical power; power-off is not documented.

**Streaming radio actions:** Skip, back, love, and ban for streaming radio stations (e.g., Slacker, Radio Paradise) are performed via `/Action` with parameters taken from the `<actions>` block in the /Status response. The exact URL parameters vary per service.

**LSDP (Lenbrook Service Discovery Protocol):** A UDP broadcast discovery protocol using port 11430 with packet magic "LSDP". Announce packets are sent roughly every minute at steady state and burst 7 times at startup. Class ID 0x0001 = BluOS Player, 0x0003 = BluOS Player secondary (CI580), 0x0008 = BluOS Hub.

<!-- UNRESOLVED: specific BSP Series model numbers that implement this API are not enumerated in the source. The source covers "BluOS players" generically across Bluesound, NAD, and DALI product lines. -->
<!-- UNRESOLVED: authentication — source contains no login or credential procedure, so none is inferred. However, it is unclear whether the API enforces network-level isolation or whether any access control applies in enterprise environments. -->
<!-- UNRESOLVED: error response format — source mentions <error> root element with <message> and <detail> text nodes for /Browse errors but does not document the general error response schema for other endpoints. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T18:31:02.107Z
last_checked_at: 2026-05-16T18:31:02.107Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T18:31:02.107Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions map 1:1 to documented endpoints in the source; transport port 11000 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific BSP Series model numbers are not listed in the source document; the source covers all BluOS players generically"
- "no explicit settable parameter registry beyond what is covered in Actions/Feedbacks; volume range can be adjusted via BluOS Controller app (Settings -> Player -> Audio) but not via the API described in this document."
- "no explicit multi-step macros defined in source."
- "no explicit safety warnings or interlock procedures stated in source."
- "specific BSP Series model numbers that implement this API are not enumerated in the source. The source covers \"BluOS players\" generically across Bluesound, NAD, and DALI product lines."
- "authentication — source contains no login or credential procedure, so none is inferred. However, it is unclear whether the API enforces network-level isolation or whether any access control applies in enterprise environments."
- "error response format — source mentions <error> root element with <message> and <detail> text nodes for /Browse errors but does not document the general error response schema for other endpoints."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
