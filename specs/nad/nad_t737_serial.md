---
spec_id: admin/nad-t737
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T737 BluOS Control Spec"
manufacturer: NAD
model_family: "T 737"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "T 737"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
  - nadelectronics.com
  - cdn.shopify.com
  - scribd.com
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://nadelectronics.com/pages/software
  - "https://cdn.shopify.com/s/files/1/0784/9751/3722/files/NAD_TXX7_Control_Docs.zip?v=1771962717"
  - https://www.scribd.com/document/726326280/nad-rs232-2-02
retrieved_at: 2026-06-10T18:57:29.528Z
last_checked_at: 2026-06-11T13:42:37.746Z
generated_at: 2026-06-11T13:42:37.746Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "NAD T737-specific device page not located; spec derived from generic BluOS CI API document. Confirm firmware range supports all listed endpoints."
  - "full LSDP binary payload not reproduced in this spec; see source section 13.1"
  - "no unsolicited push events documented in source beyond long-polling semantics"
  - "source does not define composite macros"
  - "no explicit safety/interlock material in source"
  - "NAD T737 model not directly named in this BluOS CI document; spec applies to BluOS-enabled NAD models. Confirm T737 firmware supports all listed endpoints."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:42:37.746Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions have literal counterparts in the BluOS CI source; transport values confirmed; source inventory fully represented at spec granularity. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# NAD T737 BluOS Control Spec

## Summary
BluOS API control for NAD T737 and compatible BluOS-enabled players. HTTP-based control on TCP port 11000 (CI580 uses 11000/11010/11020/11030) returning UTF-8 XML. Discovery via LSDP (Lenbrook Service Discovery Protocol) on UDP port 11430, with mDNS fallback for `_musc._tcp` and `_musp._tcp`. Covers playback, volume, queue, presets, browse/search, grouping, reboot, doorbell, input selection, Bluetooth mode.

<!-- UNRESOLVED: NAD T737-specific device page not located; spec derived from generic BluOS CI API document. Confirm firmware range supports all listed endpoints. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: http://<player_ip>:11000
auth:
  type: none  # inferred: no auth procedure in source
```

```yaml
# LSDP discovery (separate UDP channel)
# port 11430, broadcast
```

## Traits
```yaml
- powerable       # inferred from reboot / standby behavior
- routable        # inferred from input selection commands
- queryable       # inferred from /Status, /SyncStatus
- levelable       # inferred from volume commands
```

## Actions
```yaml
- id: get_status
  label: Get Playback Status
  kind: query
  command: "GET /Status?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll duration in seconds (recommended 100, min 60, never <10)
    - name: etag
      type: string
      description: Etag from previous /Status response

- id: get_sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll interval in seconds (recommended 180)
    - name: etag
      type: string
      description: Etag from previous /SyncStatus response

- id: set_volume
  label: Set Volume (0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0..100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to group

- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Volume in dB
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: set_volume_relative_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative dB delta
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: dB step (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: dB step (typical 2)

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"

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
    - name: seconds
      type: integer
      description: Position in current track (requires <totlen> in /Status)

- id: play_seek_track
  label: Play at Track/Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Seek position
    - name: trackid
      type: integer
      description: Track id in queue

- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
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
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on

- id: repeat
  label: Set Repeat Mode
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off

- id: radio_action
  label: Streaming Radio Action (skip/love/ban/back)
  kind: action
  command: "GET /Action?service={service}&{action}={value}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action
      type: string
      description: Action name (skip, love, ban, back)
    - name: value
      type: string
      description: Action value from <action> element

- id: list_playlist
  label: List Play Queue Tracks
  kind: query
  command: "GET /Playlist"
  params: []

- id: list_playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: list_playlist_range
  label: Play Queue Range
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First index (0-based)
    - name: last
      type: integer
      description: Last index

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in queue

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
      description: URL-encoded playlist name

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
      description: Preset id, or +1 next, or -1 previous

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key}&withContextMenuItems={wcmi}"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey / nextKey / parentKey
    - name: wcmi
      type: integer
      description: 1 to include context menu items

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from earlier response
    - name: searchText
      type: string
      description: Search term

- id: radio_browse
  label: Radio Browse (Capture inputs)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: group_one_slave
  label: Group Secondary Player
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

- id: group_many_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: ungroup_one_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player

- id: ungroup_many_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot"
  body:
    - name: yes
      type: string
      description: Any value (e.g. 1)

- id: doorbell
  label: Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: play_input_url
  label: Active Input Selection (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture

- id: play_input_index
  label: External Input Selection (inputIndex, fw 3.8.0..4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based index from /Settings?id=capture; Bluetooth excluded

- id: play_input_type_index
  label: External Input Selection (inputTypeIndex, fw >=4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Format type-index (spdif/analog/coax/bluetooth/arc/earc/phono/computer/aesebu/balanced/microphone); index starts at 1

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled

- id: get_capture_settings
  label: Get Capture/Input Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

- id: lsdp_query
  label: LSDP Query (Discovery)
  kind: action
  command: "LSDP Query on UDP 11430 broadcast"
  # UNRESOLVED: full LSDP binary payload not reproduced in this spec; see source section 13.1
```

## Feedbacks
```yaml
- id: playback_status
  type: object
  description: /Status XML response (album, artist, state, volume, mute, shuffle, repeat, seek position, etc.)

- id: sync_status
  type: object
  description: /SyncStatus XML response (group, master, slave, model, brand, volume, db)

- id: volume_response
  type: object
  description: <volume> element with db, mute, etag

- id: playlist
  type: object
  description: <playlist> with id, length, modified, songs

- id: presets
  type: object
  description: <presets> list with prid, name, id, url, image

- id: browse_result
  type: object
  description: <browse> element with serviceIcon, serviceName, type, items

- id: add_slave_response
  type: object
  description: <addSlave> with slave port/id

- id: doorbell_status
  type: object
  description: <status enable volume chime>

- id: state_after_command
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Reported by Play/Pause/Stop/Play URL commands
```

## Variables
```yaml
- id: volume_level
  type: integer
  range: 0..100
  description: Player volume percentage; -1 means fixed volume

- id: volume_db
  type: number
  range: -80..0
  description: Typical volume range in dB (configurable via BluOS Controller app)

- id: mute
  type: boolean
  description: Mute state

- id: shuffle_state
  type: enum
  values: [0, 1]
  description: 0 off, 1 on

- id: repeat_state
  type: enum
  values: [0, 1, 2]
  description: 0 repeat queue, 1 repeat track, 2 off

- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player state

- id: input_index
  type: integer
  description: 1-based input index from /Settings?id=capture
```

## Events
```yaml
# UNRESOLVED: no unsolicited push events documented in source beyond long-polling semantics
```

## Macros
```yaml
# UNRESOLVED: source does not define composite macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety/interlock material in source
```

## Notes
- Source explicitly states `http://<player_ip>:<port>/<request>` form; all listed endpoints are HTTP GET unless noted (`/reboot` is POST).
- Port 11000 is canonical for all BluOS players; CI580 nodes use 11000/11010/11020/11030. Discover actual port via mDNS services `musc.tcp` / `musp.tcp` or LSDP.
- Long-polling: limit regular polling to >=30s; never re-request same resource within 1s.
- LSDP discovery uses UDP port 11430 (registered with IANA to Lenbrook, 2014-03-27). Announce period ~57s + 0..6s random. Startup burst: 7 packets at t=[0,1,2,3,5,7,10]s + 0..250ms jitter.
- LSDP magic word: ASCII "LSDP" (4 bytes), protocol version 1, big-endian numerics.
- `/Action` payloads for streaming radio (skip/love/ban/back) are taken from `<action url=...>` attributes in the /Status response — do not hardcode service names or track ids.
- Input selection syntax differs by firmware: `inputIndex` for fw >3.8.0 and <4.2.0; `inputTypeIndex` for fw >=4.2.0.
- `/Settings?id=capture&schemaVersion=32` used to enumerate available inputs and derive `inputIndex`.

<!-- UNRESOLVED: NAD T737 model not directly named in this BluOS CI document; spec applies to BluOS-enabled NAD models. Confirm T737 firmware supports all listed endpoints. -->

## Provenance

```yaml
source_domains:
  - bluos.io
  - nadelectronics.com
  - cdn.shopify.com
  - scribd.com
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://nadelectronics.com/pages/software
  - "https://cdn.shopify.com/s/files/1/0784/9751/3722/files/NAD_TXX7_Control_Docs.zip?v=1771962717"
  - https://www.scribd.com/document/726326280/nad-rs232-2-02
retrieved_at: 2026-06-10T18:57:29.528Z
last_checked_at: 2026-06-11T13:42:37.746Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:42:37.746Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions have literal counterparts in the BluOS CI source; transport values confirmed; source inventory fully represented at spec granularity. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "NAD T737-specific device page not located; spec derived from generic BluOS CI API document. Confirm firmware range supports all listed endpoints."
- "full LSDP binary payload not reproduced in this spec; see source section 13.1"
- "no unsolicited push events documented in source beyond long-polling semantics"
- "source does not define composite macros"
- "no explicit safety/interlock material in source"
- "NAD T737 model not directly named in this BluOS CI document; spec applies to BluOS-enabled NAD models. Confirm T737 firmware supports all listed endpoints."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
