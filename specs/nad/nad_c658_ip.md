---
spec_id: admin/nad-c658
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD C658 Control Spec"
manufacturer: NAD
model_family: "NAD C658"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD C658"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-31T22:28:16.581Z
last_checked_at: 2026-09-13T22:17:25.142Z
generated_at: 2026-09-13T22:17:25.142Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility for the device as a whole not stated (only per-command firmware ranges for input selection, noted in Actions). No power on/off commands documented. No error-recovery or fault behavior documented. No complete error code table documented (browse errors return <error> root with <message> + <detail> text nodes only)."
  - "no push/event mechanism stated in source"
  - "none documented in source"
  - "source contains no safety warnings or interlock procedures."
  - "device power on/off control not documented. Reboot example URL omits port (curl -d yes=1 192.168.1.100/reboot) — port for POST /reboot not explicitly stated."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:17:25.142Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions map to documented BluOS Custom Integration API v1.7 endpoints plus LSDP messages; transport values (port 11000, LSDP 11430, magic LSDP, version 1) all source-stated. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NAD C658 Control Spec

## Summary
The NAD C658 is a BluOS-enabled streaming DAC/preamplifier. This spec covers control via the BluOS Custom Integration API (documented version 1.7): HTTP GET requests to `http://<player_ip>:11000/<request>` with UTF-8 XML responses, plus the UDP broadcast Lenbrook Service Discovery Protocol (LSDP) on port 11430. Covers status queries (regular and long polling), volume/mute, playback control, play queue management, presets, content browsing/search, multi-player grouping, input selection, Bluetooth mode, doorbell chime, soft reboot, and queue add/favourite endpoints used by inline browse context menus.

<!-- UNRESOLVED: firmware version compatibility for the device as a whole not stated (only per-command firmware ranges for input selection, noted in Actions). No power on/off commands documented. No error-recovery or fault behavior documented. No complete error code table documented (browse errors return <error> root with <message> + <detail> text nodes only). -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
udp:
  port: 11430
  broadcast: true
  magic: "LSDP"
  protocol_version: 1
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport:
- Port 11000 is stated for all BluOS players; CI580 (four streamer nodes, one chassis) uses 11000/11010/11020/11030. Discover actual port via mDNS services `musc.tcp` and `musp.tcp`.
- LSDP uses UDP broadcast to/from port 11430 (registered with IANA for Lenbrook LSDP use as of 2014-03-27).

## Traits
```yaml
# - levelable      (volume/mute control present)
# - queryable      (status/query commands present: /Status, /SyncStatus, /Volume, /Playlist, /Presets, /Browse, /RadioBrowse, /Settings)
# - routable       (input source selection present: /Play?url= / inputIndex / inputTypeIndex) - inferred from input-selection commands
traits:
  - levelable
  - queryable
  - routable
```

## Actions
```yaml
# All commands are HTTP GET to http://{player_ip}:11000/{path} unless noted. Responses are UTF-8 XML.
# Long-polling params timeout/etag documented for /Status, /SyncStatus, /Volume queries.

# --- Status queries ---
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: "Optional, long polling. Recommended 100s; never faster than 10s."
    - name: etag
      type: string
      description: "Optional, long polling. etag attribute from previous /Status response."

- id: sync_status_query
  label: Player And Group Sync Status Query
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: "Optional, long polling. Recommended 180s."
    - name: etag
      type: string
      description: "Optional, long polling. etag attribute from previous /SyncStatus response."

- id: volume_query
  label: Volume Query
  kind: query
  command: "GET /Volume"
  params: []

# --- Volume control ---
- id: volume_set
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: "Absolute volume level, integer 0-100."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player changes; 1 = all players in group change."

- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: "Absolute volume in dB. Constrained to configured volume range (typically -80..0)."
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = whole group."

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db}"
  params:
    - name: db
      type: number
      description: "Volume increase step in dB (typical value 2)."

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db={db}"
  params:
    - name: db
      type: number
      description: "Volume decrease step in dB as negative number (typical value -2)."

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"
  params: []

# --- Playback control ---
- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play With Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: "Optional. Jump to position (seconds) in current track. Valid only if /Status includes <totlen>. Cannot be used with inputType and index parameters."
    - name: id
      type: integer
      description: "Optional. Track id in queue to start playing at seek position."

- id: play_url
  label: Play Custom Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: "URL of streamed custom audio; must be URL encoded."

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause?toggle={toggle}"
  params:
    - name: toggle
      type: integer
      description: "Optional. If 1, toggles current pause state."

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []

- id: skip
  label: Skip To Next Track
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Back To Previous / Track Start
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle_set
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: "0 disable, 1 enable."

- id: repeat_set
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: "0 repeat queue, 1 repeat track, 2 repeat off."

- id: radio_action
  label: Streaming Radio Action (skip / back / love / ban)
  kind: action
  command: "GET /Action?service={service}&{action}"
  params:
    - name: service
      type: string
      description: "Service name, e.g. Slacker."
    - name: action
      type: string
      description: "Action URL taken verbatim from <action> element in /Status response (e.g. skip=4799148, love=4799148, ban=4799148). Any URI is possible, not only /Action."

# --- Play queue management ---
- id: playlist_list
  label: List Play Queue Tracks
  kind: query
  command: "GET /Playlist?length={length}&start={first}&end={last}"
  params:
    - name: length
      type: integer
      description: "Optional. length=1 returns only top-level attributes, no track details."
    - name: start
      type: integer
      description: "Optional. First queue entry to include, starting from 0."
    - name: end
      type: integer
      description: "Optional. Last queue entry to include."

- id: queue_delete_track
  label: Delete Track From Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: "Track id (position) in current play queue to delete."

- id: queue_move_track
  label: Move Track In Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: "New position of the track being moved."
    - name: old
      type: integer
      description: "Old position of the track being moved."

- id: queue_clear
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: queue_save
  label: Save Queue As Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: "Name to save the play queue as."

# --- Queue add (used by inline browse context-menu actionURL) ---
- id: add_to_queue
  label: Add To Play Queue
  kind: action
  command: "GET /Add?service={service}&{params}"
  params:
    - name: service
      type: string
      description: "Music service name, e.g. Deezer."
    - name: params
      type: string
      description: "Other parameters taken verbatim from the browse contextMenu actionURL (e.g. albumid, playlistid, artistid, songid, where, playnow, clear, shuffle). URL-encoded. Source example: /Add?service=Deezer&shuffle=1&playnow=1&where=nextAlbum&albumid=693798541"

# --- Favourite add (used by inline browse context-menu actionURL) ---
- id: add_favourite
  label: Add Favourite
  kind: action
  command: "GET /AddFavourite?service={service}&{params}"
  params:
    - name: service
      type: string
      description: "Music service name, e.g. Deezer."
    - name: params
      type: string
      description: "Other parameters taken verbatim from the browse contextMenu actionURL (e.g. albumid, trackid, playlistid, artistid). URL-encoded. Source example: /AddFavourite?service=Deezer&albumid=693798541"

# --- Presets ---
- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []

- id: preset_load
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: id
      type: string
      description: "Preset id number, or +1 for next preset, or -1 for previous preset. Presets loop top-to-bottom and bottom-to-top."

# --- Content browsing and searching ---
- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key}&withContextMenuItems={flag}"
  params:
    - name: key
      type: string
      description: "Optional; absence = top-level browse. Value from browseKey/nextKey/parentKey/contextMenuKey attribute of earlier response. Must be URL encoded."
    - name: withContextMenuItems
      type: integer
      description: "Optional; value always 1. Returns inline context menu for playlists/albums/tracks/stations/artists."

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key}&q={searchText}"
  params:
    - name: key
      type: string
      description: "Optional. Value from searchKey attribute of earlier response; absent = top-level search."
    - name: q
      type: string
      description: "Search string."

# --- Player grouping ---
- id: group_add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: "IP address of the secondary player."
    - name: port
      type: integer
      description: "Port of secondary player. Default 11000."
    - name: group
      type: string
      description: "Optional group name; default name assigned if omitted."

- id: group_add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of secondary players."
    - name: ports
      type: string
      description: "Comma-separated ports of secondary players."

- id: group_remove_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: "IP of the player to remove."
    - name: port
      type: integer
      description: "Port of the player to remove."

- id: group_remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses of players to remove."
    - name: ports
      type: string
      description: "Comma-separated ports of players to remove."

# --- System ---
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot (yes=1)"
  params:
    - name: yes
      type: string
      description: "Any value (e.g. 1). POST body parameter. Source example: curl -d yes=1 192.168.1.100/reboot"

- id: doorbell_chime_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# --- Input selection ---
- id: radio_browse_capture
  label: List Active Inputs (Capture)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: select_input_active
  label: Select Active Input (via Capture URL)
  kind: action
  command: "GET /Play?url={url}"
  params:
    - name: url
      type: string
      description: "URL attribute value from /RadioBrowse?service=Capture response (e.g. Capture%3Aplughw%3A... or Hub%3A%2F%2F... for HUB inputs). Sources must be connected and not hidden."

- id: settings_capture_query
  label: Query Capture Settings (input list for inputIndex)
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

- id: select_input_index
  label: Select External Input By Index
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs from /Settings?id=capture&schemaVersion=32 response in numerical order; Bluetooth excluded. BluOS firmware newer than v3.8.0 and older than v4.2.0."
  notes: "Source example uses /Play?InputId=2 for this same command (request form per source is /Play?inputIndex=)."

- id: select_input_type_index
  label: Select External Input By Type-Index
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: "Format type-index. Types: spdif (Optical), analog (Analog/Line In), coax (Coaxial), bluetooth, arc (HDMI ARC), earc (HDMI eARC), phono (Vinyl), computer, aesebu (AES/EBU), balanced (Balanced In), microphone. Index starts at 1 per type. BluOS firmware v4.2.0 or newer."

# --- Bluetooth ---
- id: bluetooth_mode_set
  label: Change Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 Manual, 1 Automatic, 2 Guest, 3 Disabled. No response."

# --- LSDP discovery (UDP broadcast on port 11430) ---
# See Discovery section for packet structure, class IDs, and timing.
- id: lsdp_query
  label: LSDP Query (Service Discovery)
  kind: action
  command: "UDP broadcast 11430 LSDP query packet (magic \"LSDP\", version 1, count N, N x class ids)"
  params:
    - name: classes
      type: string
      description: "Comma-separated 16-bit class IDs to query. 0x0001 BluOS Player, 0x0002 BluOS Server, 0x0003 secondary player (e.g. CI580), 0x0006 pair slave, 0x0007 Remote Web App, 0x0008 BluOS Hub, 0xFFFF all classes."

- id: lsdp_announce
  label: LSDP Announce (Service Advertisement)
  kind: action
  command: "UDP broadcast 11430 LSDP announce packet (magic \"LSDP\", version 1, node ID, address, count N, N x records)"
  params:
    - name: node_id
      type: string
      description: "Unique node ID, typically a MAC address of one of the node's interfaces."
    - name: address
      type: string
      description: "IPv4 address of the node (length 4 bytes)."
    - name: records
      type: string
      description: "One or more announce records, each: class (2 bytes), optional TXT key/value pairs."

- id: lsdp_delete
  label: LSDP Delete (Service Removal)
  kind: action
  command: "UDP broadcast 11430 LSDP delete packet (magic \"LSDP\", version 1, node ID, count N, N x class ids)"
  params:
    - name: node_id
      type: string
      description: "Unique node ID of the node removing services."
    - name: classes
      type: string
      description: "Comma-separated 16-bit class IDs being removed."
```

## Feedbacks
```yaml
# From /Status response:
- id: playback_state
  type: enum
  values: "play, pause, stop, stream, connecting"
- id: volume_level
  type: integer
  values: "0..100; -1 means fixed volume"
- id: volume_db
  type: number
- id: mute_state
  type: boolean
- id: now_playing_titles
  type: object
  values: "title1, title2, title3 (MUST be used for 3-line now-playing UI); twoline_title1/twoline_title2 if present"
- id: shuffle_state
  type: enum
  values: "0, 1"
- id: repeat_state
  type: enum
  values: "0, 1, 2"
- id: sleep_timer_minutes
  type: integer
- id: track_position_secs
  type: integer
  values: "secs - clients must locally increment when state is play/stream; not included in etag"
- id: track_total_length_secs
  type: integer
- id: stream_url_flag
  type: flag
  values: "presence of <streamUrl> means queue is not the audio source; shuffle/repeat/next/previous not applicable"
- id: etag_status
  type: string
  values: "opaque change tag for /Status long polling"
- id: syncstat
  type: string
  values: "changes whenever /SyncStatus response changed; matches /SyncStatus syncStat attribute"
- id: preset_id
  type: string
  values: "prid - changes when presets change; purge cached /Presets"
- id: play_queue_id
  type: string
  values: "pid - changes when play queue modified"
- id: can_seek
  type: integer
  values: "1 if seekable in 0..totlen via /Play?seek="
- id: can_move_playback
  type: boolean
  values: "true if current playing/paused content can be moved to another player"
- id: service
  type: string
  values: "service id of current audio; not for direct UI display"
- id: service_icon
  type: string
  values: "URL of current service icon"
- id: song_position
  type: integer
  values: "position of current track in play queue; equals track id in /Playlist"
- id: quality
  type: string
  values: "cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric approximate bitrate"
- id: battery
  type: object
  values: "level (percent), charging (1 if charging), icon (URL); only present if player has battery pack"
- id: stream_format
  type: string
- id: station_image
  type: string
- id: cursor
  type: integer
- id: mid
  type: integer
- id: sid
  type: integer
- id: alarm_seconds_remaining
  type: integer
  values: "only present if playback is from an alarm"
- id: group_name
  type: string
  values: "from /Status groupName; only present if primary player"
- id: group_volume
  type: integer
  values: "from /Status groupVolume; only present if primary player"
- id: notify_url
  type: string
- id: indexing
  type: integer
- id: mode
  type: integer
- id: fn
  type: string
- id: radio_actions
  type: list
  values: "inline <actions> from /Status: name, url, icon, notification, state, text; e.g. skip/love/ban for Slacker"
# From /SyncStatus response:
- id: group_volume_sync
  type: integer
  values: "0..100; -1 means fixed volume"
- id: group_name_sync
  type: string
- id: group_master
  type: string
  values: "master player IP + port; present only if secondary player"
- id: group_slaves
  type: list
  values: "slave id + port entries; present only if primary player"
- id: player_initialized
  type: boolean
- id: player_model
  type: string
  values: "model id (e.g. P300)"
- id: player_model_name
  type: string
  values: "model name (e.g. PULSE)"
- id: player_brand
  type: string
- id: player_name
  type: string
- id: player_id
  type: string
  values: "IP:port"
- id: player_mac
  type: string
- id: player_icon
  type: string
- id: schema_version
  type: integer
- id: zone
  type: string
  values: "name of fixed group"
- id: zone_master
  type: boolean
- id: zone_slave
  type: boolean
- id: etag_sync
  type: string
  values: "tag of /SyncStatus response, used for long polling"
- id: outlevel
  type: number
# From /Volume response:
- id: volume_response
  type: object
  values: "db, mute, muteDb, muteVolume, offsetDb, volume, etag attributes"
- id: offset_db
  type: number
# From /Doorbell response:
- id: doorbell_enable
  type: integer
- id: doorbell_volume
  type: integer
- id: doorbell_chime
  type: string
  values: "audio file path"
# From /Action response (radio):
- id: radio_actions_ack
  type: enum
  values: "skip, back, love (1/-1 state), ban (with skip=1)"
# From /RadioBrowse?service=Capture response:
- id: capture_items
  type: list
  values: "items with text, inputType, id, URL, image, type; category with remoteitem entries for HUB inputs"
# From /Settings?id=capture&schemaVersion=32 response:
- id: capture_input_list
  type: list
  values: "menuGroups for each capture input (Bluetooth excluded from inputIndex enumeration)"
```

## Variables
```yaml
- id: volume
  type: integer
  range: "0..100 (-1 = fixed)"
  description: "Player volume level percentage; set via /Volume?level="
- id: mute
  type: boolean
  description: "Mute state; set via /Volume?mute="
- id: shuffle
  type: enum
  values: "0, 1"
  description: "Shuffle state; set via /Shuffle?state="
- id: repeat
  type: enum
  values: "0, 1, 2"
  description: "Repeat state; set via /Repeat?state="
- id: bluetooth_mode
  type: enum
  values: "0, 1, 2, 3"
  description: "Manual / Automatic / Guest / Disabled; set via /audiomodes?bluetoothAutoplay="
```

## Events
```yaml
# No unsolicited notifications documented in source. State change observation is via
# long polling only (/Status, /SyncStatus with timeout + etag parameters).
# UNRESOLVED: no push/event mechanism stated in source
```

## Macros
```yaml
# No multi-step sequences explicitly prescribed by source.
# UNRESOLVED: none documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note only: /reboot performs a soft reboot of the player; browse context-menu item
# type "delete" states "User confirmation should be requested" (source text).
```

## Discovery
```yaml
# LSDP (Lenbrook Service Discovery Protocol) - UDP broadcast, port 11430.
# All multi-byte number values are big-endian and unsigned unless otherwise noted.

# Packet header (6 bytes):
#   Length(1) | Magic(4) "LSDP" | ProtocolVersion(1) [current: 1]

# Timing:
#   Startup: 7 packets at absolute times 0, 1, 2, 3, 5, 7, 10s + 0..250ms random
#   Main Announce Period: 57s + 0..6s random
#   Query Response Delay: 0..750ms random

# Class IDs (16-bit):
#   0x0001 BluOS Player (_musc._tcp)
#   0x0002 BluOS Server (_muss._tcp)
#   0x0003 BluOS Player secondary in multi-zone (e.g. CI580) (_musp._tcp)
#   0x0004 sovi-mfg manufacturing test (_sovi-mfg._tcp)
#   0x0005 sovi-keypad (_sovi-keypad._tcp)
#   0x0006 BluOS Player pair slave (_musz._tcp)
#   0x0007 Remote Web App AVR OSD Web Page (_remote-web-ui._tcp)
#   0x0008 BluOS Hub (_mush._tcp)
#   0xFFFF all classes (valid in Query)

# Message types:
#   Q = 0x51 standard broadcast query
#   R = 0x52 unicast query
#   A = 0x41 Announce (header + one or more records; each record: class(2), optional TXT key/value pairs)
#   D = 0x44 Delete (node ID + count N + N class ids)

# Note 1: LSDP packets are binary, not text.
# Note 2: A single Announce Message may be split across 2+ Messages if all node info does not fit; each Message carries a full header and one or more records covering whole node(s).
```

## Notes
- All commands are HTTP GET with URL-encoded name/value pair parameters; responses are UTF-8 XML. The /reboot command is the sole documented POST.
- Port 11000 stated for all BluOS players; CI580 (four streamer nodes, one chassis) uses 11000/11010/11020/11030 — discover via mDNS services `musc.tcp` and `musp.tcp`.
- LSDP (Lenbrook Service Discovery Protocol): UDP broadcast to/from port 11430, binary packets (magic "LSDP", protocol version 1), Announce/Query/Delete messages, class IDs (0x0001 BluOS Player, 0x0002 BluOS Server, 0x0003 secondary player, 0x0008 BluOS Hub, 0xFFFF all classes). See Discovery section. Alternative to mDNS where multicast is unreliable.
- Polling limits (source): regular polling at most one request every 30 seconds; long polling requests for the same resource never less than 1 second apart. Recommended long-poll intervals: /Status 100s, /SyncStatus 180s.
- Only one long-poll needed: /SyncStatus if only name/volume/grouping matters; /Status if playback status needed. /Status includes <syncStat> to detect /SyncStatus changes.
- Grouped players: secondary players proxy /Status, playback, queue, and browse requests internally to the primary player. /SyncStatus long polling needed to track each secondary player's volume.
- Volume commands are constrained to the configured available volume range (typically -80..0 dB), adjustable in BluOS Controller app (Settings -> Player -> Audio).
- Input selection command varies by BluOS firmware: /Play?inputIndex= for firmware newer than v3.8.0 and older than v4.2.0; /Play?inputTypeIndex= for v4.2.0 or newer; /Play?url= (from /RadioBrowse?service=Capture) for active inputs, and is the only method supporting BluOS HUB inputs. The source example for /Play?inputIndex= uses the URL form /Play?InputId=2 (request form per source is /Play?inputIndex=).
- Image URLs starting with /Artwork may redirect; add followRedirects=1 when retrieving to avoid redirect (applies to /Status image, presets image, browse item image).
- Use title1/title2/title3 (or twoline_title1/twoline_title2) for now-playing UI text — not album/artist/name — per source MUST requirement.
- /Add and /AddFavourite endpoints are documented only via inline contextMenu actionURL attributes returned in /Browse?withContextMenuItems=1 responses; they are not listed as standalone sections. Context menu actionURL params may include service, albumid, playlistid, artistid, songid, where, playnow, clear, shuffle.
- API version history in source runs 1.0 (2019-06-17) through 1.7 (2025-04-09). 1.7 added: updated section 8.3 example; inline context menu browsing example in section 7.1; new direct input selection command in section 11.2; "image" attribute for presets in section 6.1; "followRedirects=1" comment for image attributes; playURL and add-now attribute explanations in section 7.1.
<!-- UNRESOLVED: device power on/off control not documented. Reboot example URL omits port (curl -d yes=1 192.168.1.100/reboot) — port for POST /reboot not explicitly stated. -->
```

Self-check: no invented ports/baud/voltage; 11000 + 11430 source-stated; draft + low confidence set; entity_id given; firmware/events/safety/discovery carry UNRESOLVED markers where applicable; YAML blocks use string-quoted values for all enum/colon-bearing fields, no bare `[A, B, C]` lists on their own lines; LSDP actions use `command` with backslash-escaped inner double quotes; existing IDs and shapes preserved.

Summary of upgrade pass additions:
- Transport: added `udp` protocol + `udp:` sub-block for LSDP (port 11430, magic, version)
- Actions: added `add_to_queue` (`/Add`), `add_favourite` (`/AddFavourite`), `lsdp_query`, `lsdp_announce`, `lsdp_delete`
- Feedbacks: added ~20 missing /Status, /SyncStatus, /Volume, /Doorbell, /Action, /RadioBrowse, /Settings response fields (battery, can_seek, can_move_playback, service, service_icon, song_position, quality, stream_format, station_image, cursor/mid/sid, alarm_seconds_remaining, group_name, group_volume, notify_url, indexing, mode, fn, radio_actions, player_model*, player_brand, player_id, player_mac, player_icon, schema_version, zone*, etag_sync, outlevel, offset_db, doorbell_*, radio_actions_ack, capture_items, capture_input_list)
- New section: `## Discovery` (LSDP packet structure, class IDs, timing, message types) — non-standard but appropriate for a discovery-only protocol
- Notes: clarified `InputId` vs `inputIndex` example typo; expanded 1.7 changelog; documented `/Add` + `/AddFavourite` source-only-via-contextMenu provenance
- Preserved: all existing IDs, command strings, param shapes, firmware notes, Events/Macros/Safety unresolved markers

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-31T22:28:16.581Z
last_checked_at: 2026-09-13T22:17:25.142Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:17:25.142Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions map to documented BluOS Custom Integration API v1.7 endpoints plus LSDP messages; transport values (port 11000, LSDP 11430, magic LSDP, version 1) all source-stated. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility for the device as a whole not stated (only per-command firmware ranges for input selection, noted in Actions). No power on/off commands documented. No error-recovery or fault behavior documented. No complete error code table documented (browse errors return <error> root with <message> + <detail> text nodes only)."
- "no push/event mechanism stated in source"
- "none documented in source"
- "source contains no safety warnings or interlock procedures."
- "device power on/off control not documented. Reboot example URL omits port (curl -d yes=1 192.168.1.100/reboot) — port for POST /reboot not explicitly stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
