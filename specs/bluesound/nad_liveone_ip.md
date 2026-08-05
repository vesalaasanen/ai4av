---
spec_id: admin/bluesound-nad-liveone
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD LiveOne Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD LiveOne"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD LiveOne"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-07-22T00:46:01.723Z
last_checked_at: 2026-07-22T01:06:19.783Z
generated_at: 2026-07-22T01:06:19.783Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/AddFavourite?service=...&albumid=..."
  - "/Add?service=...&playnow=1&shuffle=..&where=.."
  - "The source documents BluOS player APIs and examples for other Bluesound/NAD models, but does not explicitly identify LiveOne-specific support for every endpoint."
  - "no unsolicited notification message format documented in source. Long polling is request/response behavior, not unsolicited event delivery."
  - "LiveOne-specific model identifier, firmware compatibility, error response catalog, authentication details beyond absent documented procedure, unsolicited event format, and safety interlocks not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:06:19.783Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions map literally to documented BluOS GET/POST endpoints; transport port 11000 and base URL form confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Bluesound NAD LiveOne Control Spec

## Summary

BluOS players receive HTTP GET requests over IP and respond with UTF-8 encoded XML. This spec documents playback, volume, queue, preset, browsing, grouping, input, Bluetooth, doorbell, reboot, status, and discovery controls described in the BluOS API Control Protocol excerpt.

<!-- UNRESOLVED: The source documents BluOS player APIs and examples for other Bluesound/NAD models, but does not explicitly identify LiveOne-specific support for every endpoint. -->

## Transport

```yaml
protocols:
  - http
addressing:
  base_url: "http://<player_ip>:11000"
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable  # inferred from direct input and player grouping commands
- queryable  # inferred from documented status and browse queries
- levelable  # inferred from documented volume controls
```

## Actions

```yaml
- id: set_volume
  label: Set Volume
  kind: action
  command: "GET /Volume?level={level}"
  params:
    - name: level
      type: integer
      description: Absolute volume level from 0 to 100

- id: set_mute
  label: Set Mute
  kind: action
  command: "GET /Volume?mute={mute}"
  params:
    - name: mute
      type: integer
      description: 1 mutes player; 0 unmutes player

- id: volume_relative
  label: Relative Volume
  kind: action
  command: "GET /Volume?db={delta-db}"
  params:
    - name: delta-db
      type: number
      description: Positive or negative relative volume change in dB

- id: set_volume_db
  label: Set Absolute Volume in dB
  kind: action
  command: "GET /Volume?abs_db={db}"
  params:
    - name: db
      type: number
      description: Absolute volume in dB

- id: set_group_volume
  label: Set Group Volume Behavior
  kind: action
  command: "GET /Volume?tell_slaves={on_off}"
  params:
    - name: on_off
      type: integer
      description: 0 changes selected player only; 1 changes all grouped players

- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play From Position
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in current track, in seconds

- id: play_queue_track
  label: Play Queue Track From Position
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in track, in seconds
    - name: trackid
      type: integer
      description: Track number in queue

- id: play_stream_url
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
  label: Toggle Pause
  kind: action
  command: "GET /Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []

- id: skip
  label: Skip
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Back
  kind: action
  command: "GET /Back"
  params: []

- id: set_shuffle
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 disables shuffle; 1 enables shuffle

- id: set_repeat
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 repeats queue; 1 repeats current track; 2 disables repeat

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  command: "GET /Action?service={service}&{action-URL}"
  params:
    - name: service
      type: string
      description: Streaming service name
    - name: action-URL
      type: string
      description: Action URL and parameters supplied by the Status response

- id: list_playlist
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: playlist_status
  label: Query Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: list_playlist_range
  label: List Play Queue Range
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First queue entry, starting from 0
    - name: last
      type: integer
      description: Last queue entry

- id: delete_playlist_track
  label: Delete Queue Track
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in current play queue

- id: move_playlist_track
  label: Move Queue Track
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Existing track position

- id: clear_playlist
  label: Clear Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: save_playlist
  label: Save Queue
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Saved playlist name

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
      description: Preset ID, +1 for next preset, or -1 for previous preset

- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse"
  params: []

- id: browse_key
  label: Browse Content Key
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URI-encoded browse key

- id: browse_context_menu
  label: Browse With Context Menu
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URI-encoded browse key

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: Search key from a Browse response
    - name: searchText
      type: string
      description: Search string

- id: group_player
  label: Group One Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary player IP address
    - name: secondaryPlayerPort
      type: integer
      description: Secondary player port
    - name: GroupName
      type: string
      description: Optional group name

- id: group_multiple_players
  label: Group Multiple Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: ungroup_player
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary player IP address
    - name: secondaryPlayerPort
      type: integer
      description: Secondary player port

- id: ungroup_multiple_players
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value; source example uses yes=1

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: select_active_input
  label: Select Active Input
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture

- id: list_inputs
  label: List Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: select_external_input_legacy
  label: Select External Input Legacy
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Input index from /Settings?id=capture&shcemaVersion=32; starts at 1 and excludes Bluetooth

- id: list_external_inputs
  label: List External Inputs
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

- id: select_external_input
  label: Select External Input
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: Input type and index, such as spdif-2 or analog-1

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 Manual; 1 Automatic; 2 Guest; 3 Disabled
```

## Feedbacks

```yaml
- id: playback_status
  type: xml
  command: "GET /Status"
  fields:
    etag: opaque string
    state: string
    volume: integer
    secs: integer
    totlen: integer
    mute: integer
    shuffle: integer
    repeat: integer
    service: string
    title1: string
    title2: string
    title3: string
    song: integer
    pid: integer
    syncStat: integer

- id: sync_status
  type: xml
  command: "GET /SyncStatus"
  fields:
    brand: string
    model: string
    modelName: string
    name: string
    group: string
    volume: integer
    mute: integer
    syncStat: integer
    id: string
    mac: string
    schemaVersion: integer
    initialized: boolean

- id: volume_state
  type: xml
  command: "GET /Volume"
  fields:
    db: number
    mute: integer
    muteDb: number
    muteVolume: integer
    volume: integer
    offsetDb: number
    etag: string

- id: playback_acknowledgement
  type: enum
  values: [play, stream, pause, stop]

- id: skip_acknowledgement
  type: xml
  command: "GET /Skip"
  fields:
    id: integer

- id: back_acknowledgement
  type: xml
  command: "GET /Back"
  fields:
    id: integer

- id: playlist_state
  type: xml
  command: "GET /Playlist"
  fields:
    name: string
    modified: integer
    length: integer
    id: integer

- id: delete_acknowledgement
  type: xml
  command: "GET /Delete?id={position}"
  fields:
    deleted: integer

- id: move_acknowledgement
  type: xml
  command: "GET /Move?new={destination}&old={origin}"
  fields:
    moved: string

- id: clear_acknowledgement
  type: xml
  command: "GET /Clear"
  fields:
    modified: integer
    length: integer
    id: integer

- id: save_acknowledgement
  type: xml
  command: "GET /Save?name={playlist_name}"
  fields:
    entries: integer

- id: preset_list
  type: xml
  command: "GET /Presets"
  fields:
    prid: integer
    presets: array

- id: preset_acknowledgement
  type: xml
  command: "GET /Preset?id={presetId}"
  fields:
    service: string
    entries: integer
    state: string

- id: browse_response
  type: xml
  command: "GET /Browse"
  fields:
    browse: object
    item: array
    category: array
    error: object

- id: streaming_action_acknowledgement
  type: xml
  values: [skip, back, love, ban, response]

- id: grouping_acknowledgement
  type: xml
  command: "GET /AddSlave or /RemoveSlave"
  fields:
    slave: array

- id: doorbell_status
  type: xml
  command: "GET /Doorbell?play=1"
  fields:
    enable: integer
    volume: integer
    chime: string

- id: input_playback_state
  type: enum
  values: [stream]

- id: reboot_response
  type: text
  values: ["Settings Updated", "Rebooting. Please close this window.", "Please wait..."]
```

## Variables

```yaml
- id: volume_level
  name: Volume Level
  type: integer
  range: [0, 100]

- id: volume_db
  name: Volume in dB
  type: number

- id: mute_state
  name: Mute State
  type: integer
  values: [0, 1]

- id: shuffle_state
  name: Shuffle State
  type: integer
  values: [0, 1]

- id: repeat_state
  name: Repeat State
  type: integer
  values: [0, 1, 2]

- id: bluetooth_autoplay_mode
  name: Bluetooth Autoplay Mode
  type: integer
  values: [0, 1, 2, 3]

- id: playback_position
  name: Playback Position
  type: integer
  unit: seconds

- id: playback_length
  name: Playback Length
  type: integer
  unit: seconds
```

## Events

```yaml
<!-- UNRESOLVED: no unsolicited notification message format documented in source. Long polling is request/response behavior, not unsolicited event delivery. -->
```

## Macros

```yaml
- id: select_active_input
  description: Query available capture inputs, then invoke Play with returned URL.
  steps:
    - "GET /RadioBrowse?service=Capture"
    - "GET /Play?url={URL_value}"

- id: select_external_input_legacy
  description: Query capture settings, determine input index, then invoke Play.
  steps:
    - "GET /Settings?id=capture&schemaVersion=32"
    - "GET /Play?inputIndex={IndexId}"

- id: discover_player_port
  description: Discover player communication port through mDNS services musc.tcp and musp.tcp.
  steps:
    - "Discover mDNS service musc.tcp or musp.tcp"
    - "Use discovered player port"

- id: discover_player_lsdp
  description: Discover BluOS players through Lenbrook Service Discovery Protocol.
  steps:
    - "Send or receive UDP broadcast on port 11430"
    - "Parse LSDP Announce, Query, or Delete messages"
```

## Safety

```yaml
confirmation_required_for:
  - delete_browse_object
  - reboot
interlocks: []
```

## Notes

BluOS requests use standard URL-encoded name/value parameters and return UTF-8 XML. HTTP requests are documented at `http://<player_ip>:<port>/<request>`.

Port 11000 is used for BluOS players, except CI580 nodes, which use ports 11000, 11010, 11020, and 11030. The source states that the actual port should be discovered through mDNS services `musc.tcp` and `musp.tcp`.

Regular polling should not exceed one request every 30 seconds. Long polling uses `timeout` and `etag`; clients must not make two consecutive requests for the same resource less than one second apart.

Volume commands constrained to configured available volume range, typically `-80..0`; exact configured range is device-dependent.

The documented reboot request is POST, unlike other documented requests, and source example omits the stated port.

LSDP uses UDP broadcast on port 11430. Its packet header contains magic word `LSDP` and protocol version 1. Query, Announce, and Delete message types are documented.

<!-- UNRESOLVED: LiveOne-specific model identifier, firmware compatibility, error response catalog, authentication details beyond absent documented procedure, unsolicited event format, and safety interlocks not stated in source. -->

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-07-22T00:46:01.723Z
last_checked_at: 2026-07-22T01:06:19.783Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:06:19.783Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions map literally to documented BluOS GET/POST endpoints; transport port 11000 and base URL form confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/AddFavourite?service=...&albumid=..."
- "/Add?service=...&playnow=1&shuffle=..&where=.."
- "The source documents BluOS player APIs and examples for other Bluesound/NAD models, but does not explicitly identify LiveOne-specific support for every endpoint."
- "no unsolicited notification message format documented in source. Long polling is request/response behavior, not unsolicited event delivery."
- "LiveOne-specific model identifier, firmware compatibility, error response catalog, authentication details beyond absent documented procedure, unsolicited event format, and safety interlocks not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
