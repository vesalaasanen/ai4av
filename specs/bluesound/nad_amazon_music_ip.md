---
spec_id: admin/bluesound-nad-amazon-music
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD BluOS Custom Integration API Control Spec"
manufacturer: Bluesound
model_family: "BluOS-enabled Bluesound and NAD players (CI580, PULSE, POWERNODE, HUB)"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "BluOS-enabled Bluesound and NAD players (CI580, PULSE, POWERNODE, HUB)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://bluos.io/become-a-partner/
retrieved_at: 2026-05-21T13:29:33.594Z
last_checked_at: 2026-09-13T22:16:53.769Z
generated_at: 2026-09-13T22:16:53.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model list above is generic because the source document does not enumerate a single product; it covers the BluOS platform across Bluesound/NAD/DALI. Treat as multi-family."
  - "explicit power on/off absent; soft reboot present"
  - "source describes no SSE/WebSocket/push event channel; LSDP Announce messages (UDP 11430) are the closest equivalent for discovery"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility ranges per endpoint not comprehensively captured above"
  - "full LSDP message-block encodings (Announce, Delete, TXT records) not transcribed; documented as protocol concept only"
  - "error response schema (<error> root with <message>/<detail>) not modelled in feedbacks"
verification:
  verdict: verified
  checked_at: 2026-09-13T22:16:53.769Z
  matched_actions: 55
  action_count: 55
  confidence: medium
  summary: "All 55 spec action units (HTTP endpoint variants + LSDP) appear verbatim in the source; transport port 11000 and base URL form are also documented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD BluOS Custom Integration API Control Spec

## Summary
HTTP-based Custom Integration API for BluOS-enabled Bluesound and NAD streaming products (also DALI). Players expose a REST-style HTTP control surface on TCP port 11000 (per-player ports 11000/11010/11020/11030 for the CI580), accepting URL-encoded GET/POST requests and returning UTF-8 encoded XML. This spec covers playback, volume, queue, presets, browsing/search, grouping, reboot, doorbell, direct-input, Bluetooth mode, and the LSDP discovery protocol.

<!-- UNRESOLVED: model list above is generic because the source document does not enumerate a single product; it covers the BluOS platform across Bluesound/NAD/DALI. Treat as multi-family. -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - udp  # LSDP discovery uses UDP broadcast on port 11430
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

**Discovery:** UDP port 11430 (LSDP, IANA-assigned to Lenbrook). mDNS services `musc.tcp` and `musp.tcp` used to discover actual TCP port.

## Traits
```yaml
# Inferred from command examples in source:
- powerable       # UNRESOLVED: explicit power on/off absent; soft reboot present
- queryable       # /Status, /SyncStatus return state
- routable        # input selection via /Play?inputTypeIndex=, /RadioBrowse?service=Capture
- levelable       # /Volume level/db/abs_db; mute control
- playable        # playback control family
```

## Actions
```yaml
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 100; never <10)
    - name: etag
      type: string
      description: etag from prior /Status response

- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 180)
    - name: etag
      type: string
      description: etag from prior /SyncStatus response

- id: volume_set
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={0|1}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0..100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = propagate to group

- id: volume_set_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={0|1}"
  params:
    - name: abs_db
      type: number
      description: Volume in dB (within configured range, typically -80..0)
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = propagate to group

- id: volume_relative
  label: Volume Up/Down (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={0|1}"
  params:
    - name: db
      type: number
      description: Positive to increase, negative to decrease (typical step 2 dB)
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = propagate to group

- id: volume_up
  label: Volume Up (2 dB)
  kind: action
  command: "GET /Volume?db=2"
  params: []

- id: volume_down
  label: Volume Down (2 dB)
  kind: action
  command: "GET /Volume?db=-2"
  params: []

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

- id: play
  label: Play (resume current)
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seek
      type: integer
      description: Seconds into current track (only valid if /Status includes totlen)

- id: play_seek_id
  label: Play Track at Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Seconds offset
    - name: id
      type: integer
      description: Track number in queue (1-based)

- id: play_stream_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: url
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause"
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "GET /Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Back (Previous / Restart)
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle_on
  label: Shuffle On
  kind: action
  command: "GET /Shuffle?state=1"
  params: []

- id: shuffle_off
  label: Shuffle Off
  kind: action
  command: "GET /Shuffle?state=0"
  params: []

- id: repeat_queue
  label: Repeat Queue
  kind: action
  command: "GET /Repeat?state=0"
  params: []

- id: repeat_track
  label: Repeat Track
  kind: action
  command: "GET /Repeat?state=1"
  params: []

- id: repeat_off
  label: Repeat Off
  kind: action
  command: "GET /Repeat?state=2"
  params: []

- id: radio_action
  label: Streaming Radio Action (skip/love/ban/back)
  kind: action
  command: "GET /Action?service={service}&{action_param}={id}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker, RadioParadise, AmazonMusic)
    - name: action_param
      type: string
      description: Action name (skip, love, ban, back) with track id

- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status (top-level only)
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: playlist_paginate
  label: Play Queue (paginated)
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First entry (0-based)
    - name: end
      type: integer
      description: Last entry

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Position in queue to remove

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: Destination position
    - name: old
      type: integer
      description: Origin position

- id: clear_queue
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: save_queue
  label: Save Play Queue
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: Playlist name (URL-encoded)

- id: list_presets
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []

- id: load_preset
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: id
      type: integer
      description: Preset id from /Presets response

- id: preset_next
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
  params: []

- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"
  params: []

- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse?key={key_value}"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey / nextKey / parentKey / contextMenuKey from prior response

- id: browse_with_context_menu
  label: Browse Content with Inline Context Menu
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded browse key
    - name: withContextMenuItems
      type: integer
      description: Always 1

- id: search_content
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key
      type: string
      description: searchKey from prior response
    - name: q
      type: string
      description: Search term

- id: radio_browse
  label: Browse Inputs (Capture)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: add_favourite
  label: Add Favourite
  kind: action
  command: "GET /AddFavourite?service={service}&{key}={value}"
  params:
    - name: service
      type: string
      description: Music service name

- id: add_to_queue
  label: Add Item to Play Queue
  kind: action
  command: "GET /Add?service={service}&{key}={value}&where={position}"
  params:
    - name: where
      type: string
      description: next, nextAlbum, last

- id: add_slave
  label: Group One Player (slave)
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player (default 11000)
    - name: group
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Players (slaves)
  kind: action
  command: "GET /AddSlave?slaves={IP1,IP2,...}&ports={P1,P2,...}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary IPs
    - name: ports
      type: string
      description: Comma-separated secondary ports

- id: remove_slave
  label: Remove One Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: Secondary IP to ungroup
    - name: port
      type: integer
      description: Secondary port

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={IP1,IP2,...}&ports={P1,P2,...}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary IPs
    - name: ports
      type: string
      description: Comma-separated secondary ports

- id: reboot_player
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot  body: yes={any_value}"
  params: []

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: active_input_select
  label: Active Input Selection (via Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response (URL-encoded)

- id: external_input_select_legacy
  label: External Input Selection (firmware >3.8.0 and <4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: 1-based input index from /Settings?id=capture&schemaVersion=32 (Bluetooth excluded)

- id: external_input_select
  label: External Input Selection (firmware ≥4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: "{type}-{index}" where type ∈ spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone; index starts at 1

- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled

- id: settings_query
  label: Query Settings (input discovery)
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params:
    - name: schemaVersion
      type: integer
      description: Latest schema version (32 per source)

- id: artwork_fetch
  label: Fetch Artwork (with redirect avoidance)
  kind: query
  command: "GET /Artwork?{artwork_params}&followRedirects=1"
  params: []

- id: service_icon_fetch
  label: Fetch Service Icon
  kind: query
  command: "GET /Sources/images/{ServiceIcon}.png"
  params: []

- id: lsdp_query
  label: LSDP Discovery Query (UDP broadcast)
  kind: query
  command: "UDP broadcast to 255.255.255.255:11430 - LSDP Query message (magic 'LSDP', version=1, type=0x51 'Q' or 0x52 'R', count, class IDs)"
  params:
    - name: class_ids
      type: string
      description: 16-bit big-endian service class identifiers to query for
```

## Feedbacks
```yaml
- id: state
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: /Status <state>

- id: volume
  type: integer
  source: /Status <volume> (0..100; -1 = fixed)

- id: volume_db
  type: number
  source: /Status <db> and /Volume <db>

- id: mute
  type: enum
  values: [0, 1]
  source: /Status <mute>

- id: mute_db
  type: number
  source: /Status <muteDb>

- id: mute_volume
  type: integer
  source: /Status <muteVolume>

- id: shuffle
  type: enum
  values: [0, 1]
  source: /Status <shuffle>

- id: repeat
  type: enum
  values: [0, 1, 2]
  source: /Status <repeat> (0=queue, 1=track, 2=off)

- id: song_position
  type: integer
  source: /Status <song>

- id: track_total_length
  type: integer
  source: /Status <totlen> (seconds)

- id: playback_position_secs
  type: integer
  source: /Status <secs>

- id: can_seek
  type: enum
  values: [0, 1]
  source: /Status <canSeek>

- id: can_move_playback
  type: enum
  values: [true, false]
  source: /Status <canMovePlayback>

- id: service
  type: string
  source: /Status <service>

- id: quality
  type: string
  source: /Status <quality> (cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate)

- id: stream_format
  type: string
  source: /Status <streamFormat>

- id: sleep_timer
  type: string
  source: /Status <sleep>

- id: alarm_remaining_seconds
  type: integer
  source: /Status <alarmsecondsremaining>

- id: title1
  type: string
  source: /Status <title1>

- id: title2
  type: string
  source: /Status <title2>

- id: title3
  type: string
  source: /Status <title3>

- id: pid
  type: integer
  source: /Status <pid> (play queue id)

- id: prid
  type: integer
  source: /Status <prid> (preset id)

- id: sync_stat
  type: integer
  source: /Status <syncStat> and /SyncStatus <syncStat>

- id: etag
  type: string
  source: /Status root attribute <etag>

- id: player_name
  type: string
  source: /SyncStatus <name>

- id: player_brand
  type: string
  source: /SyncStatus <brand>

- id: player_model
  type: string
  source: /SyncStatus <model>

- id: player_model_name
  type: string
  source: /SyncStatus <modelName>

- id: player_id
  type: string
  source: /SyncStatus <id> ("<ip>:<port>")

- id: player_mac
  type: string
  source: /SyncStatus <mac>

- id: player_initialized
  type: enum
  values: [true, false]
  source: /SyncStatus <initialized>

- id: group_name
  type: string
  source: /SyncStatus <group>

- id: master_ip
  type: string
  source: /SyncStatus <master>

- id: slave_ips
  type: array
  source: /SyncStatus <slave> elements

- id: battery_level_percent
  type: integer
  source: /SyncStatus or /Status <battery> (when battery pack present)

- id: doorbell_status
  type: object
  source: /Doorbell <status enable volume chime>
```

## Variables
```yaml
# Settable parameters beyond discrete actions:
- id: tell_slaves
  type: enum
  values: [0, 1]
  description: Group propagation flag (volume, volume dB, etc.)
- id: long_poll_timeout
  type: integer
  description: timeout parameter for /Status and /SyncStatus long-polling
- id: etag
  type: string
  description: Opaque tag for long-polling change detection
- id: seek_position
  type: integer
  description: Seconds into current track (paired with /Play)
- id: queue_pagination
  type: object
  description: start/end offsets for /Playlist pagination
- id: bluetooth_autoplay_mode
  type: enum
  values: [0, 1, 2, 3]
  description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
- id: input_type_index
  type: string
  description: {type}-{index} format for firmware >=4.2.0 input selection
- id: sleep_timer
  type: integer
  description: sleep minutes remaining (read-only feedback but documented as parameter concept)
```

## Events
```yaml
# No explicit unsolicited event/notification endpoint documented.
# Long-polling on /Status or /SyncStatus is the documented change-detection mechanism.
<!-- UNRESOLVED: source describes no SSE/WebSocket/push event channel; LSDP Announce messages (UDP 11430) are the closest equivalent for discovery -->
```

## Macros
```yaml
# Source documents a two-step "Load Preset / Play Input" sequence pattern:
- id: load_external_input_via_settings
  label: Load External Input via Settings (firmware >3.8.0, <4.2.0)
  steps:
    - "GET /Settings?id=capture&schemaVersion=32"
    - "Identify inputIndex from response (Bluetooth excluded, 1-based)"
    - "GET /Play?inputIndex={n}"

- id: load_active_input_via_capture
  label: Load Active Input via Capture
  steps:
    - "GET /RadioBrowse?service=Capture"
    - "Pick URL attribute for desired input"
    - "GET /Play?url={URL_value}"

- id: soft_reboot_poll
  label: Soft Reboot with Status Poll
  steps:
    - "POST /reboot body yes=1"
    - "Long-poll /SyncStatus until player re-initializes"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
# Source notes "delete playlist" actions may require user confirmation in UI but does not define device-side interlock.
```

## Notes
- API base URL form: `http://<player_ip>:<port>/<request>` with `port = 11000` for standard players.
- CI580 chassis uses four streamers: node 1=11000, node 2=11010, node 3=11020, node 4=11030.
- Actual port discoverable via mDNS services `musc.tcp` and `musp.tcp` (fallback: LSDP on UDP 11430).
- All endpoints accept standard URL-encoded name/value pair parameters.
- Responses are UTF-8 encoded XML.
- Polling guidance: ≤1 request per 30s without long-polling; for long-polling, no two consecutive identical-resource requests <1s apart.
- Direct input commands differ by firmware: pre-3.8.0 use `/Play?url=` only; 3.8.0–4.1.x use `/Play?inputIndex=`; ≥4.2.0 use `/Play?inputTypeIndex={type}-{index}`.
- `/Action` is generic; specific action URI taken from `<action>` element of current /Status response.
- Source revision: BluOS Custom Integration API v1.7 (2025-04-09).

<!-- UNRESOLVED: firmware version compatibility ranges per endpoint not comprehensively captured above -->
<!-- UNRESOLVED: full LSDP message-block encodings (Announce, Delete, TXT records) not transcribed; documented as protocol concept only -->
<!-- UNRESOLVED: error response schema (<error> root with <message>/<detail>) not modelled in feedbacks -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://bluos.io/become-a-partner/
retrieved_at: 2026-05-21T13:29:33.594Z
last_checked_at: 2026-09-13T22:16:53.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:16:53.769Z
matched_actions: 55
action_count: 55
confidence: medium
summary: "All 55 spec action units (HTTP endpoint variants + LSDP) appear verbatim in the source; transport port 11000 and base URL form are also documented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model list above is generic because the source document does not enumerate a single product; it covers the BluOS platform across Bluesound/NAD/DALI. Treat as multi-family."
- "explicit power on/off absent; soft reboot present"
- "source describes no SSE/WebSocket/push event channel; LSDP Announce messages (UDP 11430) are the closest equivalent for discovery"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility ranges per endpoint not comprehensively captured above"
- "full LSDP message-block encodings (Announce, Delete, TXT records) not transcribed; documented as protocol concept only"
- "error response schema (<error> root with <message>/<detail>) not modelled in feedbacks"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
