---
spec_id: admin/nad-t765
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T765 BluOS Control Spec"
manufacturer: NAD
model_family: T765
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - T765
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:44:22.156Z
last_checked_at: 2026-06-12T19:27:37.122Z
generated_at: 2026-06-12T19:27:37.122Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "User indicated RS-232C as the known protocol, but the source document exclusively documents the BluOS HTTP API. RS-232C commands are not present in the source and have been intentionally omitted."
  - "RS-232C details (baud, data bits, parity, stop bits) — source does not document serial transport. LSDP discovery uses UDP port 11430 (stated)."
  - "factory-default volume range for T765"
  - "source does not document unsolicited push events from the device."
  - "source does not define any multi-step command sequences."
  - "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
  - "User reported \"Known protocol: RS-232C\" for the T765 but the supplied source exclusively documents the BluOS HTTP API plus LSDP UDP discovery. RS-232C command set is not in this source and is intentionally omitted."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:27:37.122Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions match source endpoints verbatim; transport port 11000 and base URL pattern confirmed; source documents exactly the same command set the spec represents. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# NAD T765 BluOS Control Spec

## Summary
This spec covers the BluOS API control protocol used by the NAD T765, a BluOS-enabled network player/AVR. The interface is HTTP GET over TCP; requests are URL-encoded and responses are UTF-8 XML. Discovery uses mDNS (musc.tcp / musp.tcp) or the Lenbrook LSDP UDP broadcast protocol on port 11430.

<!-- UNRESOLVED: User indicated RS-232C as the known protocol, but the source document exclusively documents the BluOS HTTP API. RS-232C commands are not present in the source and have been intentionally omitted. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: RS-232C details (baud, data bits, parity, stop bits) — source does not document serial transport. LSDP discovery uses UDP port 11430 (stated). -->

## Traits
```yaml
# - powerable       (Reboot endpoint present; explicit power on/off not documented in this subset)
- queryable       # inferred from /Status, /SyncStatus query examples
- levelable       # inferred from /Volume level set examples
- routable        # inferred from /Play?url input routing examples
```

## Actions
```yaml
# Status / queries
- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 100)
    - name: etag
      type: string
      description: ETag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params:
    - name: timeout
      type: integer
      description: Long-poll timeout in seconds (recommended 180)
    - name: etag
      type: string
      description: ETag from previous /SyncStatus response

# Volume control
- id: volume_set_level
  label: Set Volume Level (0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Volume level 0-100
    - name: tell_slaves
      type: integer
      description: 0 = this player only; 1 = apply to grouped players

- id: volume_mute_set
  label: Set Mute State
  kind: action
  command: "GET /Volume?mute={mute}&tell_slaves={tell_slaves}"
  params:
    - name: mute
      type: integer
      description: 0 = unmute; 1 = mute
    - name: tell_slaves
      type: integer
      description: 0 = this player only; 1 = apply to grouped players

- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute dB value
    - name: tell_slaves
      type: integer
      description: 0 = this player only; 1 = apply to grouped players

- id:_volume_relative_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Signed dB delta (e.g. 2, -2)
    - name: tell_slaves
      type: integer
      description: 0 = this player only; 1 = apply to grouped players

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Volume increase in dB (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Volume decrease in dB (typical 2)

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

# Playback control
- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in current track

- id: play_seek_id
  label: Play with Seek and Track ID
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in track
    - name: trackid
      type: integer
      description: Track number in queue

- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL of streamed custom audio (URL encoded)

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
  label: Back to Previous Track
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle
  label: Set Shuffle State
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off; 1 = on

- id: repeat
  label: Set Repeat State
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue; 1 = repeat track; 2 = repeat off

- id: radio_action
  label: Streaming Radio Station Action
  kind: action
  command: "GET /Action?service={service_name}&{action}={id}"
  params:
    - name: service_name
      type: string
      description: e.g. Slacker, RadioParadise
    - name: action
      type: string
      description: skip / back / love / ban
    - name: id
      type: string
      description: Action ID (URL value)

# Play queue management
- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: Optional. 1 returns status only.
    - name: start
      type: integer
      description: First entry index (0-based)
    - name: end
      type: integer
      description: Last entry index

- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track id (position) in queue

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New position
    - name: origin
      type: integer
      description: Old position

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
    - name: playlist_name
      type: string
      description: Saved playlist name (URL encoded)

# Presets
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
    - name: presetId
      type: string
      description: Preset id; +1 = next; -1 = previous

# Content browsing / searching
- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse?key={key_value}"
  params:
    - name: key_value
      type: string
      description: URL-encoded browse key (from earlier response)
    - name: withContextMenuItems
      type: integer
      description: Optional. Always 1 to include context menu.

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: searchKey from prior response (URL encoded)
    - name: searchText
      type: string
      description: Search term

# Player grouping
- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player (default 11000)
    - name: GroupName
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: remove_slave
  label: Remove One Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary IP
    - name: secondaryPlayerPort
      type: integer
      description: Secondary port

- id: remove_slaves
  label: Remove Multiple Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

# Player reboot
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1)

# Doorbell
- id: doorbell_chime
  label: Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# Direct input (active, Capture)
- id: play_capture_url
  label: Play Active Input (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL from /RadioBrowse?service=Capture response (URL encoded)

# External input (firmware 3.8.0 - 4.2.0)
- id: play_input_index
  label: Play External Input (inputIndex)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based input index from /Settings?id=capture; Bluetooth excluded.

# External input (firmware 4.2.0+)
- id: play_input_type_index
  label: Play External Input (inputTypeIndex)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Format type-index; e.g. spdif-2 (Optical Input 2). Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.

# Bluetooth mode
- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual; 1 = Automatic; 2 = Guest; 3 = Disabled
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: From <state> element in /Status

- id: volume_level
  type: integer
  description: 0..100 scale; -1 means fixed volume. From <volume> in /Status.

- id: volume_db
  type: number
  description: Volume in dB. From <volume db=...> in /Status.

- id: mute_state
  type: integer
  description: 1 = muted; 0 = unmuted.

- id: mute_db
  type: number
  description: Pre-mute dB value (when muted).

- id: mute_volume
  type: integer
  description: Pre-mute level 0..100 (when muted).

- id: shuffle_state
  type: integer
  description: 0 = off; 1 = on. From <shuffle> in /Status.

- id: repeat_state
  type: integer
  description: 0 = repeat queue; 1 = repeat track; 2 = off. From <repeat> in /Status.

- id: song_position
  type: integer
  description: Current track position in queue. From <song> in /Status.

- id: track_total_length
  type: integer
  description: Total track length in seconds. From <totlen> in /Status.

- id: track_seconds_played
  type: integer
  description: Seconds played in current track. From <secs> in /Status.

- id: service
  type: string
  description: Current service id (e.g. Deezer). From <service> in /Status.

- id: title1
  type: string
  description: First line of now-playing metadata.

- id: title2
  type: string
  description: Second line of now-playing metadata.

- id: title3
  type: string
  description: Third line of now-playing metadata.

- id: quality
  type: string
  description: Source quality: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate.

- id: stream_format
  type: string
  description: Audio stream format description. From <streamFormat>.

- id: can_seek
  type: integer
  description: 1 if track is seekable.

- id: can_move_playback
  type: boolean
  description: True if playback can be moved to another player.

- id: sleep_timer_minutes
  type: integer
  description: Minutes remaining before sleep timer. From <sleep>.

- id: alarm_seconds_remaining
  type: integer
  description: Seconds remaining for an active alarm.

- id: queue_id
  type: integer
  description: Unique play queue id. From <pid> in /Status / <id> in /Playlist.

- id: queue_name
  type: string
  description: Name of current play queue. From <playlist name="...">.

- id: queue_length
  type: integer
  description: Number of tracks in current queue.

- id: queue_modified
  type: integer
  description: 1 if queue modified since loaded; 0 if not.

- id: group_name
  type: string
  description: Group name (only on primary player). From <group> in /SyncStatus.

- id: group_volume
  type: integer
  description: Group volume level 0..100 (primary player only).

- id: player_id
  type: string
  description: Player IP:port identifier. From <id> in /SyncStatus.

- id: player_mac
  type: string
  description: Player unique id (typically MAC). From <mac> in /SyncStatus.

- id: player_model
  type: string
  description: Player model id. From <model> in /SyncStatus.

- id: player_model_name
  type: string
  description: Player model name. From <modelName> in /SyncStatus.

- id: player_brand
  type: string
  description: Player brand name. From <brand> in /SyncStatus.

- id: player_name
  type: string
  description: Player name. From <name> in /SyncStatus.

- id: player_initialized
  type: boolean
  description: True if player is set up; false if setup required via BluOS Controller app.

- id: schema_version
  type: integer
  description: Software schema version. From <schemaVersion>.

- id: master_ip
  type: string
  description: Master player IP. From <master> when player is secondary.

- id: slave_ips
  type: string
  description: Comma-separated slave IPs. From <slave> elements.

- id: zone_master
  type: boolean
  description: True if primary player in fixed group.

- id: zone_slave
  type: boolean
  description: True if secondary player in fixed group.
```

## Variables
```yaml
# Volume range is configurable in the BluOS Controller app (Settings -> Player -> Audio).
# Source states "typically -80..0" but does not state exact device-default range for T765.
# UNRESOLVED: factory-default volume range for T765
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push events from the device.
# Long-polling is the documented change-notification mechanism.
```

## Macros
```yaml
# UNRESOLVED: source does not define any multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlocks, or power-on sequencing requirements.
# Context menu "delete" actions on playlists are described as requiring user confirmation at the UI layer.
```

## Notes
- All BluOS API requests are HTTP GET with URL-encoded name/value parameters unless explicitly noted (reboot is HTTP POST).
- Responses are UTF-8 encoded XML; the source notes that undocumented response attributes may be present and should be ignored.
- Polling discipline: regular polling should be capped at one request per 30 seconds; long-polling should not issue the same resource more often than once per second.
- LSDP (Lenbrook Service Discovery Protocol) is the alternative discovery method, using UDP broadcast on port 11430. Class 0x0001 = BluOS Player (_musc._tcp equivalent), 0x0002 = BluOS Server, 0x0003 = BluOS Player (secondary in multi-zone CI580), 0x0006 = BluOS Player (pair slave), 0x0007 = Remote Web App (AVR OSD), 0x0008 = BluOS Hub. Announce period ~57s + random; startup sequence is 7 packets at 0,1,2,3,5,7,10s.
- Multi-port devices: CI580 uses ports 11000, 11010, 11020, 11030 for its four streamer nodes. Source uses 11000 for all examples.
- Streaming radio actions (skip/back/love/ban) are not standard /Skip or /Back — they are dispatched via /Action using the URL attribute provided in the /Status <actions> block for the current service.
- Input selection: For firmware 3.8.0 - 4.2.0 use /Play?inputIndex=N; for firmware 4.2.0+ use /Play?inputTypeIndex=type-index (e.g. spdif-2). The CI580-specific /RadioBrowse?service=Capture step is required to enumerate active inputs.
- Doorbell chime response includes <chime> element naming the audio asset (e.g. Doorbell:audio/chime_1.mp3).
<!-- UNRESOLVED: User reported "Known protocol: RS-232C" for the T765 but the supplied source exclusively documents the BluOS HTTP API plus LSDP UDP discovery. RS-232C command set is not in this source and is intentionally omitted. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:44:22.156Z
last_checked_at: 2026-06-12T19:27:37.122Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:27:37.122Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions match source endpoints verbatim; transport port 11000 and base URL pattern confirmed; source documents exactly the same command set the spec represents. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "User indicated RS-232C as the known protocol, but the source document exclusively documents the BluOS HTTP API. RS-232C commands are not present in the source and have been intentionally omitted."
- "RS-232C details (baud, data bits, parity, stop bits) — source does not document serial transport. LSDP discovery uses UDP port 11430 (stated)."
- "factory-default volume range for T765"
- "source does not document unsolicited push events from the device."
- "source does not define any multi-step command sequences."
- "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
- "User reported \"Known protocol: RS-232C\" for the T765 but the supplied source exclusively documents the BluOS HTTP API plus LSDP UDP discovery. RS-232C command set is not in this source and is intentionally omitted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
