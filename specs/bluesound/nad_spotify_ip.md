---
spec_id: admin/bluesound-nad-spotify
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Spotify Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD Spotify"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD Spotify"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/support/downloads/
retrieved_at: 2026-05-21T14:39:47.299Z
last_checked_at: 2026-09-14T22:17:01.544Z
generated_at: 2026-09-14T22:17:01.544Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact hardware model and device-specific supported command subset not stated in source"
  - "unsolicited device notification message format not stated in source"
  - "no explicit multi-step macro sequence defined in source"
  - "exact Bluesound/NAD hardware model identity not stated beyond “Bluesound NAD Spotify”."
  - "firmware compatibility outside explicitly documented input-selection ranges."
  - "error response catalogue and recovery behavior not documented."
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:01.544Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions map to documented HTTP endpoints/parameters; LSDP Q/A/D present; transport port 11000 verbatim in source; bidirectional coverage is complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD Spotify Control Spec

## Summary
Bluesound NAD Spotify is controlled through BluOS HTTP GET requests and returns UTF-8 XML responses. The documented API covers playback, volume, queue management, presets, browsing, grouping, reboot, doorbell chimes, direct inputs, Bluetooth mode, and UDP-based LSDP discovery.

<!-- UNRESOLVED: exact hardware model and device-specific supported command subset not stated in source -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from reboot command; no power on/off command documented
- routable  # inferred from direct input and player grouping commands
- queryable  # inferred from status, queue, preset, browse, and settings queries
- levelable  # inferred from volume commands
```

## Actions
```yaml
- id: status
  label: Playback Status
  kind: query
  command: "/Status"
  params: []

- id: status_long_poll
  label: Playback Status Long Poll
  kind: query
  command: "/Status?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll duration in seconds
    - name: etag
      type: string
      description: Etag from previous response

- id: sync_status
  label: Player and Group Sync Status
  kind: query
  command: "/SyncStatus"
  params: []

- id: sync_status_long_poll
  label: Player and Group Sync Status Long Poll
  kind: query
  command: "/SyncStatus?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll duration in seconds
    - name: etag
      type: string
      description: Etag from previous response

- id: volume_set_level
  label: Set Volume Level
  kind: action
  command: "/Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level from 0 to 100
    - name: tell_slaves
      type: integer
      description: 0 changes selected player only; 1 changes all grouped players

- id: volume_set_mute
  label: Set Mute State
  kind: action
  command: "/Volume?mute={mute}&tell_slaves={tell_slaves}"
  params:
    - name: mute
      type: integer
      description: 1 mutes player; 0 unmutes player
    - name: tell_slaves
      type: integer
      description: 0 changes selected player only; 1 changes all grouped players

- id: volume_set_absolute_db
  label: Set Absolute Volume in dB
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 changes selected player only; 1 changes all grouped players

- id: volume_adjust_db
  label: Adjust Volume in dB
  kind: action
  command: "/Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative relative volume change in dB
    - name: tell_slaves
      type: integer
      description: 0 changes selected player only; 1 changes all grouped players

- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db={db}"
  params:
    - name: db
      type: number
      description: Volume increase step in dB; typical value is 2

- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Positive volume decrease step; typical value is 2

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
  params: []

- id: play_seek
  label: Play from Position
  kind: action
  command: "/Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in current track, in seconds

- id: play_track
  label: Play Queue Track from Position
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
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
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "/Pause"
  params: []

- id: pause_toggle
  label: Toggle Pause
  kind: action
  command: "/Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "/Stop"
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  command: "/Skip"
  params: []

- id: back
  label: Back to Track Start or Previous Track
  kind: action
  command: "/Back"
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  command: "/Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 disables shuffle; 1 enables shuffle

- id: repeat
  label: Set Repeat
  kind: action
  command: "/Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 repeats queue; 1 repeats current track; 2 disables repeat

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  command: "/Action?service={service-name}&action={action-URL}"
  params:
    - name: service-name
      type: string
      description: Service name
    - name: action-URL
      type: string
      description: Action URL supplied by the Status response action element

- id: playlist
  label: List Play Queue
  kind: query
  command: "/Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "/Playlist?length=1"
  params: []

- id: playlist_range
  label: List Play Queue Range
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First queue entry, starting from 0
    - name: last
      type: integer
      description: Last queue entry

- id: delete_track
  label: Delete Queue Track
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in current queue

- id: move_track
  label: Move Queue Track
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Original track position

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "/Clear"
  params: []

- id: save_queue
  label: Save Queue
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Saved playlist name

- id: presets
  label: List Presets
  kind: query
  command: "/Presets"
  params: []

- id: preset_load
  label: Load Preset
  kind: action
  command: "/Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset ID; source also documents literal +1 and -1 for next and previous preset

- id: preset_next
  label: Load Next Preset
  kind: action
  command: "/Preset?id=+1"
  params: []

- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "/Preset?id=-1"
  params: []

- id: browse
  label: Browse Music Content
  kind: query
  command: "/Browse"
  params: []

- id: browse_key
  label: Browse by Key
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey, nextKey, parentKey, or contextMenuKey

- id: browse_context_menu
  label: Browse with Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded browse key
    - name: withContextMenuItems
      type: integer
      description: Always 1

- id: browse_search
  label: Search Music Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: Search key; optional
    - name: searchText
      type: string
      description: Search string

- id: group_player
  label: Group One Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP address of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player
    - name: GroupName
      type: string
      description: Optional group name

- id: group_multiple_players
  label: Group Multiple Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: ungroup_player
  label: Remove One Player from Group
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary player IP address
    - name: secondaryPlayerPort
      type: integer
      description: Secondary player port

- id: ungroup_multiple_players
  label: Remove Multiple Players from Group
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IP addresses
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports

- id: reboot
  label: Soft Reboot
  kind: action
  command: "POST /reboot yes={value}"
  params:
    - name: value
      type: string
      description: Any value; source example uses 1

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []

- id: active_input_selection
  label: Select Active Input
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture

- id: external_input_selection_legacy
  label: Select External Input Legacy
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: One-based input index from capture settings; Bluetooth excluded
  notes: Applies to firmware newer than v3.8.0 and older than v4.2.0

- id: external_input_selection
  label: Select External Input
  kind: action
  command: "/Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: Input type and one-based index, such as spdif-2 or analog-1
  notes: Applies to firmware v4.2.0 or newer

- id: bluetooth_mode
  label: Change Bluetooth Mode
  kind: action
  command: "/audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 Manual; 1 Automatic; 2 Guest; 3 Disabled

- id: lsdp_query
  label: LSDP Query
  kind: query
  command: "LSDP Q"
  params:
    - name: classes
      type: string
      description: Class identifiers documented by LSDP packet structure

- id: lsdp_announce
  label: LSDP Announce
  kind: action
  command: "LSDP A"
  params: []

- id: lsdp_delete
  label: LSDP Delete
  kind: action
  command: "LSDP D"
  params: []
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]

- id: volume_level
  type: integer
  values: "0..100; -1 means fixed volume"

- id: volume_db
  type: number
  description: Volume level in dB

- id: mute_state
  type: enum
  values: [muted, unmuted]
  source_values: "mute=1 means muted; mute=0 means unmuted"

- id: shuffle_state
  type: enum
  values: [off, on]
  source_values: "shuffle=0 means off; shuffle=1 means on"

- id: repeat_state
  type: enum
  values: [queue, track, off]
  source_values: "repeat=0 queue; repeat=1 track; repeat=2 off"

- id: current_track_position
  type: integer
  description: Current track position in queue from Status song element

- id: playback_position_seconds
  type: integer
  description: Elapsed playback seconds from Status secs element

- id: track_length_seconds
  type: integer
  description: Current track length from Status totlen element

- id: now_playing_title
  type: string
  description: Status title1, title2, and title3 metadata

- id: player_group_status
  type: object
  description: SyncStatus player and grouping information

- id: playlist_status
  type: object
  description: Playlist length, ID, name, and modified state

- id: preset_status
  type: object
  description: Preset list and preset revision ID

- id: response_state
  type: enum
  values: [play, stream, pause, stop]

- id: reboot_response
  type: string
  description: Settings Updated, Rebooting. Please close this window., Please wait...
```

## Variables
```yaml
- id: volume_level
  name: Volume Level
  type: integer
  range: "0..100"
  description: Absolute player volume percentage

- id: volume_db
  name: Volume in dB
  type: number
  description: Absolute or relative dB volume value

- id: mute
  name: Mute
  type: integer
  values: [0, 1]

- id: shuffle
  name: Shuffle
  type: integer
  values: [0, 1]

- id: repeat
  name: Repeat
  type: integer
  values: [0, 1, 2]

- id: bluetooth_autoplay
  name: Bluetooth Autoplay Mode
  type: integer
  values: [0, 1, 2, 3]
```

## Events
```yaml
# UNRESOLVED: unsolicited device notification message format not stated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequence defined in source
```

## Safety
```yaml
confirmation_required_for:
  - delete
interlocks: []
```

## Notes
HTTP requests use form `http://<player_ip>:<port>/<request>`. Port 11000 is documented for BluOS players; CI580 nodes use ports 11000, 11010, 11020, and 11030, with discovery through mDNS services `musc.tcp` and `musp.tcp`. LSDP uses UDP broadcast on port 11430.

Clients should limit regular polling to at most one request every 30 seconds. Long-poll requests must not be made consecutively for same resource less than one second apart; source recommends `/Status` timeout around 100 seconds and `/SyncStatus` timeout around 180 seconds.

<!-- UNRESOLVED: exact Bluesound/NAD hardware model identity not stated beyond “Bluesound NAD Spotify”. -->
<!-- UNRESOLVED: firmware compatibility outside explicitly documented input-selection ranges. -->
<!-- UNRESOLVED: error response catalogue and recovery behavior not documented. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/support/downloads/
retrieved_at: 2026-05-21T14:39:47.299Z
last_checked_at: 2026-09-14T22:17:01.544Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:01.544Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions map to documented HTTP endpoints/parameters; LSDP Q/A/D present; transport port 11000 verbatim in source; bidirectional coverage is complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact hardware model and device-specific supported command subset not stated in source"
- "unsolicited device notification message format not stated in source"
- "no explicit multi-step macro sequence defined in source"
- "exact Bluesound/NAD hardware model identity not stated beyond “Bluesound NAD Spotify”."
- "firmware compatibility outside explicitly documented input-selection ranges."
- "error response catalogue and recovery behavior not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
