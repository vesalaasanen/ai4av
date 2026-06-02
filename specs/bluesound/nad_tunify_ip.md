---
spec_id: admin/bluesound-nad-tunify
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Tunify Control Spec"
manufacturer: Bluesound
model_family: "NAD Tunify"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "NAD Tunify"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
  - https://www.bluesound.com/pages/downloads
retrieved_at: 2026-06-01T21:59:58.800Z
last_checked_at: 2026-06-02T08:27:34.493Z
generated_at: 2026-06-02T08:27:34.493Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command catalogue beyond sections 1-12 (the source describes only a subset of the full BluOS API). No safety or interlock material in source."
  - "source does not document any unsolicited event/notification stream."
  - "source does not document any multi-step command sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility ranges, authentication credentials (none documented), full set of capture / input types per device, response status/error codes not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:27:34.493Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions have literal endpoint matches in the source and transport values (port 11000, HTTP, no auth) are confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bluesound NAD Tunify Control Spec

## Summary
BluOS-based control surface (HTTP API) for Bluesound/NAD Tunify players. All commands are HTTP GET requests with URL-encoded parameters against `http://<player_ip>:<port>/<request>` on TCP port 11000; responses are UTF-8 encoded XML. A subset of the BluOS Custom Integration API plus the UDP-based LSDP discovery protocol (port 11430) are documented.

<!-- UNRESOLVED: full command catalogue beyond sections 1-12 (the source describes only a subset of the full BluOS API). No safety or interlock material in source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000  # HTTP control port for BluOS players; LSDP discovery uses UDP port 11430
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       inferred: no explicit power on/off command in source subset
- queryable       # inferred: /Status and /SyncStatus query commands present
- routable        # inferred: input selection via /Play?url= and /Play?inputTypeIndex= present
- levelable       # inferred: /Volume control with level, abs_db, and relative db parameters present
```

## Actions
```yaml
- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 100)
    - name: etag
      type: string
      description: Etag from previous /Status response
- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 180)
    - name: etag
      type: string
      description: Etag from previous /SyncStatus response
- id: set_volume_level
  label: Set Volume (0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all group members
- id: set_volume_abs_db
  label: Set Volume (dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all group members
- id: set_volume_relative_db
  label: Set Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Relative volume delta in dB (positive or negative)
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all group members
- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db=2"
  params: []
- id: volume_down
  label: Volume Down
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
  label: Play
  kind: action
  command: "GET /Play"
  params: []
- id: play_with_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seek
      type: integer
      description: Jump to position in current track (seconds)
- id: play_with_seek_and_id
  label: Play with Seek and Track ID
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Position in current track (seconds)
    - name: id
      type: integer
      description: Track id in the play queue
- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: url
      type: string
      description: URL-encoded stream URL
- id: play_input_index
  label: Play External Input (firmware <4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: Input index from /Settings?id=capture&schemaVersion=32 (1-based, Bluetooth excluded)
- id: play_input_type_index
  label: Play External Input (firmware >=4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: Format type-index, e.g. spdif-1, analog-1, coax-1, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone
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
  label: Back / Previous Track
  kind: action
  command: "GET /Back"
  params: []
- id: shuffle
  label: Shuffle On/Off
  kind: action
  command: "GET /Shuffle?state={0|1}"
  params:
    - name: state
      type: integer
      description: 0 to disable, 1 to enable
- id: repeat
  label: Repeat Mode
  kind: action
  command: "GET /Repeat?state={0|1|2}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: action_skip
  label: Streaming Radio Skip
  kind: action
  command: "GET /Action?service={service-name}&skip={id}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: skip
      type: string
      description: Opaque id from /Status <action> url attribute
- id: action_love
  label: Streaming Radio Love
  kind: action
  command: "GET /Action?service={service-name}&love={id}"
  params:
    - name: service
      type: string
      description: Service name
    - name: love
      type: string
      description: Opaque id from /Status <action> url attribute
- id: action_ban
  label: Streaming Radio Ban
  kind: action
  command: "GET /Action?service={service-name}&ban={id}"
  params:
    - name: service
      type: string
      description: Service name
    - name: ban
      type: string
      description: Opaque id from /Status <action> url attribute
- id: action_back
  label: Streaming Radio Back
  kind: action
  command: "GET /Action?service={service-name}&back={id}"
  params:
    - name: service
      type: string
      description: Service name
    - name: back
      type: string
      description: Opaque id from /Status <action> url attribute
- id: playlist_list
  label: List Play Queue Tracks
  kind: query
  command: "GET /Playlist"
  params: []
- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []
- id: playlist_paginate
  label: Play Queue Pagination
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First queue index (0-based)
    - name: end
      type: integer
      description: Last queue index
- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track position in the play queue
- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New track position
    - name: old
      type: integer
      description: Old track position
- id: clear_queue
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []
- id: save_queue
  label: Save Play Queue as Playlist
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
- id: load_next_preset
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
  params: []
- id: load_previous_preset
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"
  params: []
- id: browse_top
  label: Top-Level Browse
  kind: query
  command: "GET /Browse"
  params: []
- id: browse_level
  label: Browse Hierarchy Level
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey/nextKey/parentKey value
- id: browse_with_context
  label: Browse with Inline Context Menu
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded key value
    - name: withContextMenuItems
      type: integer
      description: Always 1
- id: search
  label: Search Music Service
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from earlier browse response
    - name: q
      type: string
      description: Search term
- id: radio_browse_capture
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []
- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player (default 11000)
- id: add_slave_named
  label: Group Player with Group Name
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player
    - name: group
      type: string
      description: Optional group name
- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
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
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player
- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary IPs
    - name: ports
      type: string
      description: Comma-separated secondary ports
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot  body: yes={value}"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1)
- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params:
    - name: play
      type: integer
      description: Always 1
- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
- id: get_capture_settings
  label: Get Capture Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params:
    - name: schemaVersion
      type: integer
      description: 32 is the latest schema version per source
```

## Feedbacks
```yaml
- id: playback_state
  label: Playback State
  type: enum
  values:
    - play
    - pause
    - stop
    - stream
    - connecting
- id: volume_level
  label: Volume Level
  type: integer
  description: 0..100; -1 means fixed volume
- id: volume_db
  label: Volume in dB
  type: number
  description: Current volume in dB
- id: mute_state
  label: Mute State
  type: enum
  values:
    - "0"
    - "1"
- id: mute_volume
  label: Unmuted Volume (0..100)
  type: integer
  description: Pre-mute volume level
- id: mute_db
  label: Unmuted Volume (dB)
  type: number
  description: Pre-mute volume in dB
- id: shuffle_state
  label: Shuffle State
  type: enum
  values:
    - "0"
    - "1"
- id: repeat_state
  label: Repeat State
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: 0 = queue, 1 = track, 2 = off
- id: track_position
  label: Current Track Index
  type: integer
  description: Position of current track in play queue
- id: track_total_length
  label: Total Track Length
  type: integer
  description: Total track length in seconds
- id: track_playback_seconds
  label: Seconds Played
  type: integer
- id: song_metadata
  label: Now-Playing Metadata
  type: object
  description: title1/title2/title3 from /Status; UI should prefer these over album/artist/name
- id: service
  label: Current Service ID
  type: string
- id: audio_quality
  label: Audio Quality
  type: string
  description: cd / hd / dolbyAudio / mqa / mqaAuthored / numeric bitrate
- id: stream_format
  label: Audio Stream Format
  type: string
- id: group_name
  label: Group Name
  type: string
  description: Present on primary player only
- id: group_volume
  label: Group Volume
  type: integer
  description: Group volume 0..100 (primary player only)
- id: sync_etag
  label: Sync Status Etag
  type: string
  description: Matches /Status <syncStat>; increments on group changes
- id: battery
  label: Battery (if equipped)
  type: object
  description: level, charging, icon URL
- id: doorbell_status
  label: Doorbell Status
  type: object
  description: enable, volume, chime URL
- id: preset_list
  label: Presets
  type: array
  description: id, name, url, image
- id: play_queue
  label: Play Queue Listing
  type: array
  description: name, modified, length, id, song entries
- id: browse_result
  label: Browse Result
  type: object
  description: item list with type/link/audio attributes and browseKey/playURL/actionURL
```

## Variables
```yaml
- name: volume
  type: integer
  range: 0..100
  description: Player volume level
- name: volume_db
  type: number
  description: Volume in dB; typically constrained to -80..0 via Controller app
- name: mute
  type: enum
  values: ["0", "1"]
- name: seek_position
  type: integer
  description: Seconds into current track
- name: track_id
  type: integer
  description: Track id in the play queue
- name: stream_url
  type: string
  description: URL-encoded custom audio stream
- name: shuffle
  type: enum
  values: ["0", "1"]
- name: repeat
  type: enum
  values: ["0", "1", "2"]
- name: bluetooth_mode
  type: enum
  values: ["0", "1", "2", "3"]
  description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
- name: input_type_index
  type: string
  description: Format type-index (spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone) with 1-based index
- name: preset_id
  type: integer
  description: Use +1 / -1 for next/previous
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event/notification stream.
# Long-polling on /Status and /SyncStatus is the only change-detection mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- BluOS control API is HTTP GET; responses are UTF-8 XML. UDP/11430 (LSDP) is for service discovery only, not control. mDNS services `musc.tcp` and `musp.tcp` are used to discover the actual HTTP port per the source.
- Default port 11000 for all BluOS players. CI580 (4 streamer nodes, 1 chassis) uses 11000 / 11010 / 11020 / 11030 for nodes 1-4.
- Polling: at most one request per 30s without long-polling. With long-polling, never <1s between same-resource requests.
- Recommended long-poll timeouts: 100s for /Status, 180s for /SyncStatus.
- Secondary player endpoints (e.g. /Status, /Play, /Browse) are internally proxied to the primary player of a group.
- /Action endpoint shape varies by service; back/skip/love/ban URLs come from /Status <actions><action url="...">. The source's `/Action?service=Slacker&skip=...` is one concrete instance; per-action command templates above use the documented pattern.
- Stream URLs must be URL-encoded. Capture URL examples: `Capture%3Aplughw%3Aimxnadadc%2C0%2F48000%2F24%2F2%3Fid%3Dinput0`, `Hub%3A%2F%2F192.168.1.149%3A11000%2Finput0`.
- LSDP (Lenbrook Service Discovery Protocol): UDP broadcast on port 11430, magic word "LSDP", protocol version 1. Startup: 7 packets at [0,1,2,3,5,7,10s] + 0-250ms random. Steady-state Announce period: 57s + 0-6s random. Class IDs: 0x0001 BluOS Player, 0x0002 BluOS Server, 0x0003 BluOS Player secondary, 0x0004 sovi-mfg, 0x0005 sovi-keypad, 0x0006 BluOS Player pair slave, 0x0007 Remote Web App, 0x0008 BluOS Hub.
- /Play?inputIndex is documented for firmware newer than v3.8.0 and older than v4.2.0; /Play?inputTypeIndex is documented for firmware v4.2.0 or newer.
- /Settings?id=capture&schemaVersion=32 — schemaVersion=32 is "the latest" per the source; newer schema versions may be unsupported.
- This spec covers a subset of the full BluOS API. Source explicitly states "It contains a subset of the API requests documented in the full BluOS API Control Protocol."

<!-- UNRESOLVED: firmware version compatibility ranges, authentication credentials (none documented), full set of capture / input types per device, response status/error codes not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
  - https://www.bluesound.com/pages/downloads
retrieved_at: 2026-06-01T21:59:58.800Z
last_checked_at: 2026-06-02T08:27:34.493Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:27:34.493Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions have literal endpoint matches in the source and transport values (port 11000, HTTP, no auth) are confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command catalogue beyond sections 1-12 (the source describes only a subset of the full BluOS API). No safety or interlock material in source."
- "source does not document any unsolicited event/notification stream."
- "source does not document any multi-step command sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility ranges, authentication credentials (none documented), full set of capture / input types per device, response status/error codes not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
