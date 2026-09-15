---
spec_id: admin/bluesound-nad-prestomusic
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD PrestoMusic Control Spec"
manufacturer: Bluesound
model_family: PrestoMusic
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - PrestoMusic
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluesoundprofessional.com/software-and-drivers/
  - https://bluesoundprofessional.com/control-systems/
retrieved_at: 2026-05-21T14:13:45.664Z
last_checked_at: 2026-09-13T22:18:16.810Z
generated_at: 2026-09-13T22:18:16.810Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the BluOS Custom Integration API subset of the full BluOS API Control Protocol; some commands in the full protocol are not covered here."
  - "no explicit power on/off commands in source; reboot exists"
  - "source does not document unsolicited notification pushes (only long-polling for /Status and /SyncStatus). The only documented notification surface is the <notifyurl> element returned in /Status."
  - "no multi-step macro sequences described in source."
  - "firmware compatibility ranges across the various command revisions not fully enumerated. No `powerable` evidence: source lacks explicit power on/off commands (only `reboot` via POST /reboot)."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:18:16.810Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions map verbatim to endpoints in the BluOS Custom Integration API source; transport values port 11000 and 11430 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD PrestoMusic Control Spec

## Summary
BluOS-based multi-room music streamer from Bluesound / NAD Electronics. Control via HTTP GET/POST requests sent to port 11000 on the player IP; responses are UTF-8 encoded XML. Discovery optionally via mDNS (services `musc.tcp` and `musp.tcp`) or via LSDP (Lenbrook Service Discovery Protocol) over UDP broadcast on port 11430.

<!-- UNRESOLVED: source describes the BluOS Custom Integration API subset of the full BluOS API Control Protocol; some commands in the full protocol are not covered here. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<player_ip>:11000"
  port: 11000
  discovery_port: 11430
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: no explicit power on/off commands in source; reboot exists
- queryable  # inferred from /Status, /SyncStatus, /Volume query examples
- routable  # inferred from /Play?inputTypeIndex, /Play?inputIndex, and /Play?url input selection examples
- levelable  # inferred from /Volume?level, /Volume?db, mute commands
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
      description: Optional long-poll interval in seconds (recommended 100)
    - name: etag
      type: string
      description: Optional etag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Optional long-poll interval in seconds (recommended 180)
    - name: etag
      type: string
      description: Optional etag from previous /SyncStatus response

- id: volume_set
  label: Set Volume (Level)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = include all grouped players

- id: volume_set_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = include all grouped players

- id: volume_set_relative_db
  label: Set Volume (Relative dB)
  kind: action
  command: "GET /Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Relative volume change in dB (positive or negative)
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = include all grouped players

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

- id: play_seek
  label: Play at Seek Position
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seek
      type: integer
      description: Position in seconds within current track

- id: play_seek_id
  label: Play at Seek Position by Track ID
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Position in seconds
    - name: id
      type: integer
      description: Track id within play queue

- id: play_url
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
  label: Back / Previous Track
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle
  label: Shuffle Queue
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = disable shuffle, 1 = enable shuffle

- id: repeat
  label: Set Repeat Mode
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off

- id: action_streaming_radio
  label: Streaming Radio Action
  kind: action
  command: "GET /Action?service={service-name}&action={action-URL}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action
      type: string
      description: Action URL from <action> element in /Status response

- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: playlist_paginate
  label: Paginate Play Queue
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
      description: Position of track to delete in queue

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New position
    - name: old
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
    - name: name
      type: string
      description: Playlist name

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
      description: Preset id, or +1 for next, -1 for previous

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey / nextKey / parentKey

- id: browse_with_context
  label: Browse with Inline Context Menu
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey
    - name: withContextMenuItems
      type: string
      description: Always "1"

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from earlier response
    - name: q
      type: string
      description: Search string

- id: add_slave
  label: Group Two Players
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port
    - name: group
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports

- id: remove_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port

- id: remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports

- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1); required as POST body (`-d yes=1`)

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: active_input_select
  label: Active Input Selection
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response

- id: external_input_select_legacy
  label: External Input Selection (firmware >v3.8.0 and <v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: Input index (starts at 1); Bluetooth excluded

- id: external_input_select_v4_2
  label: External Input Selection (firmware v4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: inputTypeIndex
      type: string
      description: Format type-index (e.g. spdif-2). Type is one of spdif|analog|coax|bluetooth|arc|earc|phono|computer|aesebu|balanced|microphone

- id: bluetooth_mode_set
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"

- id: settings_get
  label: Get Settings (Capture)
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []
```

## Feedbacks
```yaml
- id: playback_status
  type: object
  description: "/Status XML response; key fields include state (play|pause|stop|stream|connecting), volume (0..100 or -1 fixed), mute (0|1), db, muteDb, muteVolume, song, totlen, secs, repeat (0|1|2), shuffle (0|1), service, album, artist, title1, title2, title3, image, canSeek (0|1), canMovePlayback, pid, prid, syncStat, etag"

- id: sync_status
  type: object
  description: "/SyncStatus XML response; key fields include volume (0..100 or -1), db, mute (0|1), muteDb, muteVolume, model, modelName, brand, name, group, id (ip:port), mac, icon, schemaVersion, initialized, syncStat, etag; plus master/slave entries with port and id"

- id: volume_state
  type: object
  description: "/Volume response: <volume db=\"...\" mute=\"0|1\" offsetDb=\"...\" etag=\"...\">level</volume>; muteDb and muteVolume present when muted"

- id: play_state
  type: enum
  values: [play, stream, pause, stop, connecting]
  description: State attribute after playback commands"

- id: doorbell_status
  type: object
  description: "<status enable=\"0|1\" volume=\"...\" chime=\"...\"/> response for doorbell"

- id: radio_browse_capture
  type: object
  description: "/RadioBrowse?service=Capture response lists available active inputs with URL attribute"

- id: load_preset_response
  type: object
  description: "/Preset response: <loaded service=\"...\"> <entries>N</entries> </loaded> for playlists; <state>stream</state> for radio"

- id: preset_state
  type: enum
  values: [stream]
  description: State when loaded preset is a radio"

- id: streaming_radio_action_ack
  type: object
  description: "/Action response: <skip/>, <back/>, <love>1</love>, or <love skip=\"1\">0</love>"

- id: playlist_status
  type: object
  description: "<playlist name=\"...\" modified=\"0|1\" length=\"...\" id=\"...\" shuffle=\"0|1\" repeat=\"0|1|2\"> with <song> entries"

- id: delete_ack
  type: integer
  description: "<deleted>position</deleted> from /Delete"

- id: move_ack
  type: string
  description: "<moved>moved</moved> from /Move"

- id: clear_status
  type: object
  description: "<playlist modified=\"0|1\" length=\"0\" id=\"...\"/> from /Clear"

- id: save_status
  type: object
  description: "<saved><entries>N</entries></saved> from /Save"

- id: add_slave_ack
  type: object
  description: "<addSlave><slave port=\"...\" id=\"...\"/></addSlave> from /AddSlave"
```

## Variables
```yaml
- id: volume_level
  type: integer
  range: "0..100 (or -1 = fixed)"
  description: Settable via /Volume?level

- id: volume_db
  type: number
  description: Settable via /Volume?abs_db or /Volume?db; constrained to configured available volume range (typically -80..0)

- id: mute_state
  type: integer
  enum: [0, 1]
  description: Settable via /Volume?mute

- id: repeat_state
  type: integer
  enum: [0, 1, 2]
  description: 0 = repeat queue, 1 = repeat track, 2 = repeat off

- id: shuffle_state
  type: integer
  enum: [0, 1]
  description: 0 = off, 1 = on (via /Shuffle?state)

- id: seek_position
  type: integer
  description: Seconds within current track (via /Play?seek)

- id: doorbell_volume
  type: integer
  description: Returned by /Doorbell response

- id: bluetooth_autoplay
  type: integer
  enum: [0, 1, 2, 3]
  description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled (via /audiomodes?bluetoothAutoplay)"

- id: input_type_index
  type: string
  description: '{type}-{index}; type in spdif|analog|coax|bluetooth|arc|earc|phono|computer|aesebu|balanced|microphone, index starts at 1'
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification pushes (only long-polling for /Status and /SyncStatus). The only documented notification surface is the <notifyurl> element returned in /Status.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- All requests are HTTP GET (except `/reboot` which is HTTP POST); responses are UTF-8 encoded XML.
- Discovery: mDNS services `musc.tcp` and `musp.tcp` should be used to discover the player IP and port. Alternatively, LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast on port 11430 (registered with IANA, assigned to Lenbrook as of 2014-03-27). Source: section 13.1.
- Polling rate limit: regular polling should be at most once every 30 seconds; long-polling clients must not make two consecutive requests for the same resource less than one second apart.
- For CI580 (4 streamers in one chassis): node 1 = port 11000, node 2 = 11010, node 3 = 11020, node 4 = 11030.
- Grouping: only the primary player selects source; many requests directed at secondary players are internally proxied to the primary. Use `/SyncStatus` long-polling to track per-secondary volume.
- Input selection command changed in BluOS firmware v4.2.0: legacy `/Play?inputIndex=N` (Bluetooth excluded, 1-based order in `/Settings?id=capture&schemaVersion=32`) replaced by `/Play?inputTypeIndex={type}-{index}`.
- Source document is "BluOS Custom Integration API" versions 1.0-1.7 (last updated 2025-04-09); describes only a subset of the full BluOS API Control Protocol.

<!-- UNRESOLVED: firmware compatibility ranges across the various command revisions not fully enumerated. No `powerable` evidence: source lacks explicit power on/off commands (only `reboot` via POST /reboot). -->

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluesoundprofessional.com/software-and-drivers/
  - https://bluesoundprofessional.com/control-systems/
retrieved_at: 2026-05-21T14:13:45.664Z
last_checked_at: 2026-09-13T22:18:16.810Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:18:16.810Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions map verbatim to endpoints in the BluOS Custom Integration API source; transport values port 11000 and 11430 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the BluOS Custom Integration API subset of the full BluOS API Control Protocol; some commands in the full protocol are not covered here."
- "no explicit power on/off commands in source; reboot exists"
- "source does not document unsolicited notification pushes (only long-polling for /Status and /SyncStatus). The only documented notification surface is the <notifyurl> element returned in /Status."
- "no multi-step macro sequences described in source."
- "firmware compatibility ranges across the various command revisions not fully enumerated. No `powerable` evidence: source lacks explicit power on/off commands (only `reboot` via POST /reboot)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
