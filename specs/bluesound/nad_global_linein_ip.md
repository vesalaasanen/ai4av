---
spec_id: admin/bluesound-nad-global-linein
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Global Linein Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD Global Linein"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD Global Linein"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
retrieved_at: 2026-06-01T21:51:30.565Z
last_checked_at: 2026-07-21T23:32:30.729Z
generated_at: 2026-07-21T23:32:30.729Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific hardware model details not stated — document covers all BluOS players generically"
  - "firmware version compatibility ranges not stated"
  - "no multi-step sequences explicitly documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing documented in source"
  - "exact firmware versions for inputTypeIndex vs inputIndex feature boundaries (stated as v3.8.0 < fw < v4.2.0 for inputIndex, v4.2.0+ for inputTypeIndex)"
  - "voltage, current, power specifications not stated in source"
  - "fault behavior or error recovery sequences not documented"
  - "maximum number of grouped players not stated"
  - "maximum play queue size not stated"
  - "full /Settings endpoint schema beyond capture sub-step reference not documented"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:32:30.729Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match literal BluOS HTTP endpoints and LSDP message types in source with correct params, and the source command catalogue is fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bluesound NAD Global Linein Control Spec

## Summary

BluOS network audio player supporting HTTP-based control for playback, volume, play queue management, presets, content browsing, player grouping, and input selection. All commands are HTTP GET requests (except reboot which is POST) to `http://<player_ip>:<port>/<request>`, returning UTF-8 XML responses. Default port is 11000 (CI580 uses 11000/11010/11020/11030 per node). LSDP (Lenbrook Service Discovery Protocol) provides UDP-based player discovery on port 11430 as an mDNS alternative.

<!-- UNRESOLVED: specific hardware model details not stated — document covers all BluOS players generically -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://{player_ip}:11000"
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
udp:
  port: 11430  # LSDP discovery protocol broadcast port
  mode: broadcast  # inferred: source states UDP broadcast packets to/from port 11430
  notes: "Lenbrook Service Discovery Protocol (LSDP). IANA-assigned to Lenbrook March 27 2014. Used as mDNS alternative for player discovery."
```

## Traits
```yaml
traits:
  - queryable    # inferred: /Status, /SyncStatus, /Volume queries return state
  - levelable    # inferred: volume control with level, dB absolute, dB relative
  - routable     # inferred: input selection and player grouping commands
```

## Actions
```yaml
actions:
  - id: status_query
    label: Playback Status Query
    kind: query
    command: "/Status"
    params:
      - name: timeout
        type: integer
        description: "Long-poll timeout in seconds (recommended 100)"
      - name: etag
        type: string
        description: "etag from previous /Status response for long-polling"
    notes: "Returns volume, playback state, track info, shuffle, repeat, etc. Long-polling returns only on change or timeout."

  - id: sync_status_query
    label: Player and Group Sync Status Query
    kind: query
    command: "/SyncStatus"
    params:
      - name: timeout
        type: integer
        description: "Long-poll timeout in seconds (recommended 180)"
      - name: etag
        type: string
        description: "etag from previous /SyncStatus response for long-polling"
    notes: "Returns player info, grouping, volume. Long-polling returns only on change or timeout."

  - id: set_volume_level
    label: Set Volume Level
    kind: action
    command: "/Volume?level={level}"
    params:
      - name: level
        type: integer
        description: "Absolute volume level 0-100"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: set_volume_db_absolute
    label: Set Volume dB Absolute
    kind: action
    command: "/Volume?abs_db={db}"
    params:
      - name: db
        type: number
        description: "Absolute volume in dB (within configured range, typically -80..0)"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: set_volume_db_relative
    label: Set Volume dB Relative
    kind: action
    command: "/Volume?db={delta_db}"
    params:
      - name: delta_db
        type: number
        description: "Relative volume change in dB (positive or negative, typical step 2)"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"
    notes: "Positive values increase volume, negative decrease. Typical step is 2dB."

  - id: volume_query
    label: Volume Query
    kind: query
    command: "/Volume"
    params:
      - name: timeout
        type: integer
        description: "Optional long-poll timeout in seconds"
      - name: etag
        type: string
        description: "Optional etag from previous /Volume response for long-polling"
    notes: "Pure query form of /Volume. Source 3.1 states /Volume both queries and sets volume; query supports long-polling. Returns volume, db, mute, muteDb, muteVolume, offsetDb, etag."

  - id: mute_on
    label: Mute On
    kind: action
    command: "/Volume?mute=1"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "/Volume?mute=0"
    params: []

  - id: play
    label: Play
    kind: action
    command: "/Play"
    params:
      - name: seek
        type: integer
        description: "Jump to position in seconds (only if /Status has totlen)"
      - name: id
        type: integer
        description: "Track ID in queue (used with seek)"
    notes: "Cannot use seek with inputType/index parameters."

  - id: play_url
    label: Play Stream URL
    kind: action
    command: "/Play?url={encodedStreamURL}"
    params:
      - name: url
        type: string
        description: "URL-encoded stream URL to play"

  - id: pause
    label: Pause
    kind: action
    command: "/Pause"
    params: []
    notes: "Cancels alarm timeout if alarm is playing."

  - id: pause_toggle
    label: Pause Toggle
    kind: action
    command: "/Pause?toggle=1"
    params: []

  - id: stop
    label: Stop
    kind: action
    command: "/Stop"
    params: []
    notes: "Cancels alarm timeout if alarm is playing."

  - id: skip
    label: Skip to Next Track
    kind: action
    command: "/Skip"
    params: []
    notes: "Only works when playing from play queue (no streamUrl in /Status). Wraps from last to first track in queue regardless of repeat setting."

  - id: back
    label: Back to Previous Track
    kind: action
    command: "/Back"
    params: []
    notes: "If track playing >4s, returns to start. Otherwise goes to previous track. Wraps from first to last in queue."

  - id: shuffle
    label: Set Shuffle
    kind: action
    command: "/Shuffle?state={state}"
    params:
      - name: state
        type: integer
        description: "0 = shuffle off, 1 = shuffle on"

  - id: repeat
    label: Set Repeat
    kind: action
    command: "/Repeat?state={state}"
    params:
      - name: state
        type: integer
        description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

  - id: streaming_action
    label: Streaming Radio Action
    kind: action
    command: "/Action?service={service}&{action_param}={action_value}"
    params:
      - name: service
        type: string
        description: "Music service name (e.g. Slacker)"
      - name: action_param
        type: string
        description: "Action name: skip, love, ban"
      - name: action_value
        type: string
        description: "Action value from /Status <action> element"
    notes: "URL is dynamic, taken from <actions> element in /Status response."

  - id: playlist_list
    label: List Play Queue
    kind: query
    command: "/Playlist"
    params: []
    notes: "Returns all tracks in play queue. Use start/end params for pagination. Not recommended without length or start/end params (very long response)."

  - id: playlist_status
    label: Play Queue Status
    kind: query
    command: "/Playlist?length=1"
    params: []
    notes: "Returns queue status without track details."

  - id: playlist_range
    label: List Play Queue Range
    kind: query
    command: "/Playlist?start={first}&end={last}"
    params:
      - name: start
        type: integer
        description: "First entry index (0-based)"
      - name: end
        type: integer
        description: "Last entry index"

  - id: delete_track
    label: Delete Track from Queue
    kind: action
    command: "/Delete?id={position}"
    params:
      - name: id
        type: integer
        description: "Track position in queue to delete"

  - id: move_track
    label: Move Track in Queue
    kind: action
    command: "/Move?new={destination}&old={origin}"
    params:
      - name: new
        type: integer
        description: "New position"
      - name: old
        type: integer
        description: "Old position"

  - id: clear_queue
    label: Clear Play Queue
    kind: action
    command: "/Clear"
    params: []

  - id: save_queue
    label: Save Play Queue as Playlist
    kind: action
    command: "/Save?name={playlist_name}"
    params:
      - name: name
        type: string
        description: "Name for the saved playlist"

  - id: list_presets
    label: List Presets
    kind: query
    command: "/Presets"
    params: []

  - id: load_preset
    label: Load Preset
    kind: action
    command: "/Preset?id={presetId}"
    params:
      - name: id
        type: string
        description: "Preset ID number, +1 for next, -1 for previous"
    notes: "Preset numbers need not be sequential. Wraps top-to-bottom and bottom-to-top."

  - id: browse
    label: Browse Content
    kind: query
    command: "/Browse"
    params:
      - name: key
        type: string
        description: "Browse key from previous response (URL-encoded). Omit for top level."
      - name: withContextMenuItems
        type: integer
        description: "Set to 1 to include inline context menu"
    notes: "Error responses are enclosed in <error> root element with <message> and zero or more <detail> text nodes."

  - id: search_content
    label: Search Music Content
    kind: query
    command: "/Browse?key={key}&q={searchText}"
    params:
      - name: key
        type: string
        description: "Value from searchKey attribute from earlier browse response. Omit for top-level search."
      - name: q
        type: string
        description: "Search string. URL-encoded."
    notes: "Source section 7.2 documents search as distinct command from browse. Returns top-level search categories (Artists/Albums/Songs/Playlists); further results require /Browse with browseKey."

  - id: group_add_slave
    label: Group Player (Single)
    kind: action
    command: "/AddSlave?slave={slave_ip}&port={slave_port}"
    params:
      - name: slave
        type: string
        description: "IP address of secondary player"
      - name: port
        type: integer
        description: "Port of secondary player (default 11000)"
      - name: group
        type: string
        description: "Optional group name"

  - id: group_add_slaves_multi
    label: Group Players (Multiple)
    kind: action
    command: "/AddSlave?slaves={slave_ips}&ports={slave_ports}"
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses of secondary players"
      - name: ports
        type: string
        description: "Comma-separated port numbers of secondary players"

  - id: ungroup_remove_slave
    label: Ungroup Player (Single)
    kind: action
    command: "/RemoveSlave?slave={slave_ip}&port={slave_port}"
    params:
      - name: slave
        type: string
        description: "IP of secondary player to remove"
      - name: port
        type: integer
        description: "Port of secondary player to remove"
    notes: "If removing primary from group of 3+, primary ungroups and remaining slaves form new group."

  - id: ungroup_remove_slaves_multi
    label: Ungroup Players (Multiple)
    kind: action
    command: "/RemoveSlave?slaves={slave_ips}&ports={slave_ports}"
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses to remove"
      - name: ports
        type: string
        description: "Comma-separated port numbers to remove"

  - id: reboot
    label: Reboot Player
    kind: action
    command: "POST /reboot"
    params:
      - name: yes
        type: string
        description: "Any value (e.g. 1) to confirm reboot"
    notes: "HTTP POST, not GET. Soft reboot only."

  - id: doorbell_chime
    label: Play Doorbell Chime
    kind: action
    command: "/Doorbell?play=1"
    params: []

  - id: select_active_input
    label: Select Active Input
    kind: action
    command: "/Play?url={URL_value}"
    params:
      - name: url
        type: string
        description: "URL from /RadioBrowse?service=Capture response item"
    notes: "First query /RadioBrowse?service=Capture to get available input URLs. Only source supporting BluOS HUB inputs selection."

  - id: radio_browse_capture
    label: Browse Capture Inputs
    kind: query
    command: "/RadioBrowse?service=Capture"
    params: []
    notes: "Returns available input sources with URL values for active input selection."

  - id: settings_capture_query
    label: Capture Settings Query
    kind: query
    command: "/Settings?id=capture&schemaVersion=32"
    params:
      - name: id
        type: string
        description: "Setting group id (e.g. capture)"
      - name: schemaVersion
        type: integer
        description: "Schema version (32 is latest per source)"
    notes: "Returns input list for inputIndex lookup. Referenced by source section 11.2 step 1 for external input selection."

  - id: select_external_input_index
    label: Select External Input by Index
    kind: action
    command: "/Play?inputIndex={IndexId}"
    params:
      - name: inputIndex
        type: integer
        description: "1-based index from /Settings?id=capture response (Bluetooth excluded)"
    notes: "BluOS firmware newer than v3.8.0 and older than v4.2.0 only. Recommended for CI external input selection."

  - id: select_external_input_type_index
    label: Select External Input by Type Index
    kind: action
    command: "/Play?inputTypeIndex={typeIndex}"
    params:
      - name: inputTypeIndex
        type: string
        description: "Format: {type}-{index}. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1."
    notes: "BluOS firmware v4.2.0 or newer."

  - id: change_bluetooth_mode
    label: Change Bluetooth Mode
    kind: action
    command: "/audiomodes?bluetoothAutoplay={value}"
    params:
      - name: bluetoothAutoplay
        type: integer
        description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"

  - id: lsdp_query
    label: LSDP Discovery Query
    kind: query
    command: "UDP broadcast port 11430 - Message Type 0x51 (Q) broadcast or 0x52 (R) unicast"
    params:
      - name: message_type
        type: string
        description: "\"Q\" (0x51) for broadcast response, \"R\" (0x52) for unicast response"
      - name: count
        type: integer
        description: "Number of classes to query (1 byte)"
      - name: classes
        type: array
        description: "16-bit class identifiers (e.g. 0x0001 BluOS Player, 0x0002 BluOS Server, 0x0003 secondary, 0x0008 BluOS Hub, 0xFFFF All Classes)"
    notes: "Lenbrook Service Discovery Protocol (LSDP). Packet header: Length (1B), Magic 'LSDP' (4B ASCII), Protocol Version 1 (1B). All multi-byte values big-endian. On startup send 7 query packets at t=[0,1,2,3,5,7,10s] + 0-250ms random."

  - id: lsdp_announce
    label: LSDP Discovery Announce
    kind: event
    command: "UDP broadcast port 11430 - Message Type 0x41 (A)"
    params:
      - name: node_id
        type: string
        description: "Unique node ID (usually MAC address), variable length prefixed by Node ID Length (1B)"
      - name: address
        type: string
        description: "IP address of node, variable length prefixed by Address Length (1B, =4 for IPv4)"
      - name: records
        type: array
        description: "Announce records: Class (2B) + TXT records (Count 1B + key/value length-prefixed pairs)"
    notes: "Sent in response to LSDP Query after random delay 0-750ms. Steady-state broadcast ~every 57s + 0-6s random. Sent 7x at startup with intervals [0,1,2,3,5,7,10s] + 0-250ms random."

  - id: lsdp_delete
    label: LSDP Discovery Delete
    kind: event
    command: "UDP broadcast port 11430 - Message Type 0x44 (D)"
    params:
      - name: node_id
        type: string
        description: "Unique node ID of node sending delete (usually MAC address)"
      - name: count
        type: integer
        description: "Number of classes to follow"
      - name: classes
        type: array
        description: "16-bit class identifiers being withdrawn"
    notes: "Broadcast when service no longer available. Sent 7x at startup intervals per LSDP timing."
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_state
    type: enum
    values: [play, pause, stop, stream, connecting]
    description: "Current player state from /Status response <state> element. play and stream have same meaning."

  - id: volume_level
    type: integer
    values: "0..100 or -1 (fixed)"
    description: "Current volume percentage from /Status or /Volume response"

  - id: volume_db
    type: number
    description: "Current volume in dB from /Volume response"

  - id: volume_offset_db
    type: number
    description: "Volume offset in dB from /Volume response offsetDb attribute"

  - id: mute_state
    type: enum
    values: ["0", "1"]
    description: "Mute state from /Status or /Volume. 1=muted, 0=unmuted."

  - id: mute_volume
    type: integer
    description: "Unmuted volume level (0..100) from /Volume response when muted"

  - id: mute_db
    type: number
    description: "Unmuted volume in dB from /Volume or /Status response when muted"

  - id: shuffle_state
    type: enum
    values: ["0", "1"]
    description: "Shuffle state from /Status response"

  - id: repeat_state
    type: enum
    values: ["0", "1", "2"]
    description: "Repeat state: 0=repeat queue, 1=repeat track, 2=off"

  - id: now_playing
    type: object
    description: "Track metadata from /Status: title1, title2, title3, album, artist, name"

  - id: now_playing_twoline
    type: object
    description: "Two-line now-playing metadata from /Status: twoline_title1, twoline_title2 (when present, MUST be used for two-line UI)"

  - id: stream_url_flag
    type: boolean
    description: "Presence of <streamUrl> in /Status. If present: queue not source, shuffle/repeat not relevant, next/prev unavailable."

  - id: can_seek
    type: boolean
    description: "From /Status canSeek. If 1, scrubbing via /Play?seek supported in range 0..totlen."

  - id: can_move_playback
    type: boolean
    description: "From /Status canMovePlayback. True if current content can be moved to another player."

  - id: sleep_timer
    type: integer
    description: "Minutes remaining before sleep timer activates from /Status <sleep>"

  - id: alarm_seconds_remaining
    type: integer
    description: "Seconds before alarm-triggered playback stops (from /Status, when playback is from alarm)"

  - id: audio_quality
    type: string
    description: "Quality of playing source from /Status: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate"

  - id: stream_format
    type: string
    description: "Audio format from /Status streamFormat (e.g. MP3 320 kb/s)"

  - id: battery_state
    type: object
    description: "From /Status or /SyncStatus when player has battery: level (percent), charging (1/0), icon URL"

  - id: sync_status
    type: object
    description: "Player/group info from /SyncStatus: name, model, modelName, brand, volume, group, master, slaves, zone, zoneMaster, zoneSlave, initialized, mac, schemaVersion, icon"

  - id: group_name
    type: string
    description: "Group name from /Status groupName. Player must be primary in group."

  - id: group_volume
    type: integer
    description: "Group volume level from /Status groupVolume. Player must be primary in group."

  - id: queue_info
    type: object
    description: "Play queue info from /Playlist: name, length, id, modified"

  - id: presets_list
    type: object
    description: "Preset list from /Presets: prid, preset items with id/name/url/image"

  - id: etag
    type: string
    description: "Opaque etag from /Status or /SyncStatus for long-polling change detection"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    description: "Player volume level percentage. -1 means fixed volume."

  - id: volume_db
    type: number
    description: "Player volume in dB. Range typically -80..0."

  - id: volume_offset_db
    type: number
    description: "Volume offset in dB from /Volume offsetDb"

  - id: mute
    type: boolean
    description: "Mute state"

  - id: shuffle
    type: boolean
    description: "Shuffle state"

  - id: repeat
    type: integer
    description: "0=repeat queue, 1=repeat track, 2=off"

  - id: sleep_timer
    type: integer
    description: "Minutes remaining before sleep timer activates"

  - id: bluetooth_mode
    type: integer
    description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"
```

## Events
```yaml
# Source does not document unsolicited push events over HTTP.
# Long-polling /Status and /SyncStatus provide change detection but are client-initiated.
# LSDP Announce and Delete are unsolicited UDP broadcast events (see lsdp_announce, lsdp_delete actions).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes

- All commands are HTTP GET requests except `/reboot` which is POST.
- Default TCP port is 11000 for all BluOS players. CI580 uses ports 11000, 11010, 11020, 11030 for its four streamer nodes.
- Port should be discovered via mDNS (services `musc.tcp` for primary player, `musp.tcp` for secondary, `muss.tcp` for server, `mush.tcp` for Hub) or LSDP (UDP broadcast port 11430).
- Long-polling supported on `/Status` (recommended timeout 100s) and `/SyncStatus` (recommended timeout 180s) and `/Volume`.
- Without long-polling, restrict polling to max one request per 30 seconds.
- With long-polling, minimum 1 second between consecutive requests for same resource.
- Volume range is configurable via BluOS Controller app (Settings → Player → Audio), typically -80..0 dB.
- When grouped, secondary players proxy many requests to the primary player internally: /Status, Playback Control, Play Queue Management, Content Browsing and Searching.
- `/Play?inputTypeIndex` format uses type-index (e.g. `spdif-1`, `analog-1`, `arc-1`). Available types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.
- LSDP discovery protocol uses UDP broadcast on port 11430 (IANA-assigned to Lenbrook March 27 2014). Packet starts with header: Length (1B), Magic "LSDP" (4B ASCII), Protocol Version (1B, currently 1). Followed by message blocks: Query (Q=0x51 broadcast, R=0x52 unicast), Announce (A=0x41), Delete (D=0x44). All multi-byte values big-endian unsigned.
- LSDP Class IDs: 0x0001 BluOS Player (_musc._tcp), 0x0002 BluOS Server (_muss._tcp), 0x0003 BluOS secondary in multi-zone players like CI580 (_musp._tcp), 0x0004 sovi-mfg, 0x0005 sovi-keypad, 0x0006 BluOS pair slave (_musz._tcp), 0x0007 Remote Web App / AVR OSD Web Page (_remote-web-ui._tcp), 0x0008 BluOS Hub (_mush._tcp), 0xFFFF All Classes (for Query only).
- LSDP startup timing: 7 packets at absolute times [0,1,2,3,5,7,10s] + 0-250ms random. Main Announce period: 57s + 0-6s random. Query response delay: 0-750ms random. LSDP supports TXT records similar to mDNS for arbitrary metadata.
- XML responses may contain undocumented elements which should be ignored.
- For UI displaying three lines of now-playing metadata, MUST use title1/title2/title3 from /Status (not album/artist/name). For two-line displays, use twoline_title1/twoline_title2 when present.
- /Browse responses: items have type attribute (link/audio/artist/composer/album/playlist/track/text/section/folder) as display hint. browseKey presence indicates descendable; playURL presence indicates playable; autoplayURL indicates queue-and-play. Relative URIs resolved per RFC 3986. All keys must be percent-escaped when used as key parameter.
- Context menu item types from /Browse with withContextMenuItems=1: favourite-add, favourite-delete, add-now, add-next, add-last, addAll-now, addAll-next, addAll-last, add-shuffle, playRadio, delete (user confirmation required).

<!-- UNRESOLVED: exact firmware versions for inputTypeIndex vs inputIndex feature boundaries (stated as v3.8.0 < fw < v4.2.0 for inputIndex, v4.2.0+ for inputTypeIndex) -->
<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior or error recovery sequences not documented -->
<!-- UNRESOLVED: maximum number of grouped players not stated -->
<!-- UNRESOLVED: maximum play queue size not stated -->
<!-- UNRESOLVED: full /Settings endpoint schema beyond capture sub-step reference not documented -->
````

Added 6 new actions: `volume_query`, `search_content`, `settings_capture_query`, `lsdp_query`, `lsdp_announce`, `lsdp_delete`. Added `udp` protocol + LSDP block in transport. Added 12 new feedbacks (volume_offset_db, mute_volume, mute_db, now_playing_twoline, stream_url_flag, can_seek, can_move_playback, sleep_timer, alarm_seconds_remaining, audio_quality, stream_format, battery_state, group_name, group_volume). Added 2 new variables (volume_offset_db, sleep_timer). Expanded notes w/ LSDP details + browse context menu types. Preserved all existin' entries.

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
retrieved_at: 2026-06-01T21:51:30.565Z
last_checked_at: 2026-07-21T23:32:30.729Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:32:30.729Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match literal BluOS HTTP endpoints and LSDP message types in source with correct params, and the source command catalogue is fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific hardware model details not stated — document covers all BluOS players generically"
- "firmware version compatibility ranges not stated"
- "no multi-step sequences explicitly documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing documented in source"
- "exact firmware versions for inputTypeIndex vs inputIndex feature boundaries (stated as v3.8.0 < fw < v4.2.0 for inputIndex, v4.2.0+ for inputTypeIndex)"
- "voltage, current, power specifications not stated in source"
- "fault behavior or error recovery sequences not documented"
- "maximum number of grouped players not stated"
- "maximum play queue size not stated"
- "full /Settings endpoint schema beyond capture sub-step reference not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
