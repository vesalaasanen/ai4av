---
spec_id: admin/bluesound-nad-calm-radio
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Calm Radio Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD Calm Radio"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD Calm Radio"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluos.io
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/become-a-partner/
retrieved_at: 2026-06-07T20:52:55.756Z
last_checked_at: 2026-09-13T22:17:14.691Z
generated_at: 2026-09-13T22:17:14.691Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "settable parameters beyond discrete commands not enumerated as separate actions in source"
  - "source documents long-polling responses via /Status?timeout=... but does not describe unsolicited push notifications as separate event types"
  - "source does not describe multi-step macro sequences; remove section if not applicable"
  - "source does not contain explicit safety warnings or interlock procedures"
  - "LSDP discovery protocol (Section 13) binary message formats (Query, Announce, Delete) not enumerated as HTTP actions; described separately as a UDP protocol on port 11430."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:17:14.691Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec action literals found verbatim in source; transport (port 11000, HTTP GET, no auth) confirmed; source's 24 distinct endpoints are fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD Calm Radio Control Spec

## Summary
HTTP-based control protocol for BluOS-powered players (Bluesound, NAD Electronics, DALI Loudspeakers product lines). The spec covers playback control, volume, queue management, presets, content browsing/search, player grouping, reboot, doorbell chimes, and direct input selection over TCP/IP using HTTP GET requests on port 11000.

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable  # inferred from volume/mute commands
- queryable  # inferred from /Status and /SyncStatus queries
- routable   # inferred from input selection commands
- powerable  # inferred from /reboot endpoint
```

## Actions
```yaml
- id: get_playback_status
  label: Get Playback Status
  kind: query
  command: "/Status"
  params: []

- id: get_sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "/SyncStatus"
  params: []

- id: set_volume_level
  label: Set Volume (Level)
  kind: action
  command: "/Volume?level={level}"
  params:
    - name: level
      type: integer
      description: Volume level 0-100

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "/Volume?abs_db={db}"
  params:
    - name: db
      type: number
      description: Volume in dB

- id: set_volume_relative_db
  label: Adjust Volume (Relative dB)
  kind: action
  command: "/Volume?db={delta-db}"
  params:
    - name: delta-db
      type: number
      description: Relative volume change in dB

- id: set_mute
  label: Set Mute
  kind: action
  command: "/Volume?mute={on_off}"
  params:
    - name: on_off
      type: integer
      description: 1 to mute, 0 to unmute

- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db=2"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-2"
  params: []

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

- id: play_with_seek
  label: Play With Seek
  kind: action
  command: "/Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in track to seek to

- id: play_with_seek_and_id
  label: Play With Seek and Track ID
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in track
    - name: trackid
      type: integer
      description: Track number in queue

- id: play_url
  label: Play Custom URL
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
  label: Pause Toggle
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
  label: Back to Previous Track
  kind: action
  command: "/Back"
  params: []

- id: set_shuffle
  label: Set Shuffle
  kind: action
  command: "/Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on

- id: set_repeat
  label: Set Repeat
  kind: action
  command: "/Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = off

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  command: "/Action?service={service-name}&{action-URL}"
  params:
    - name: service-name
      type: string
      description: Service name (e.g. Slacker)
    - name: action-URL
      type: string
      description: Action URL from /Status response (skip, love, ban, back)

- id: list_playlist
  label: List Play Queue
  kind: query
  command: "/Playlist"
  params: []

- id: get_playlist_status
  label: Get Play Queue Status
  kind: query
  command: "/Playlist?length=1"
  params: []

- id: get_playlist_page
  label: Get Play Queue Page
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First queue entry
    - name: last
      type: integer
      description: Last queue entry

- id: delete_track
  label: Delete Track From Queue
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position to remove

- id: move_track
  label: Move Track In Queue
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Old track position

- id: clear_queue
  label: Clear Play Queue
  kind: action
  command: "/Clear"
  params: []

- id: save_queue
  label: Save Play Queue
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Name for saved playlist

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
    - name: presetId
      type: integer
      description: Preset id; +1 for next, -1 for previous

- id: load_next_preset
  label: Load Next Preset
  kind: action
  command: "/Preset?id=+1"
  params: []

- id: load_previous_preset
  label: Load Previous Preset
  kind: action
  command: "/Preset?id=-1"
  params: []

- id: browse
  label: Browse Content
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browse key

- id: browse_with_context
  label: Browse With Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded browse key

- id: search
  label: Search Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: URL-encoded key from searchKey attribute
    - name: searchText
      type: string
      description: Search query string

- id: add_slave
  label: Group Slave Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player
    - name: GroupName
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Slave Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary ports

- id: remove_slave
  label: Ungroup Slave Player
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player

- id: remove_slaves
  label: Ungroup Multiple Slave Players
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary ports

- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot with parameter yes=1"
  params: []

- id: doorbell_chime
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
      description: URL attribute from /RadioBrowse?service=Capture response

- id: external_input_legacy
  label: External Input Selection (firmware <v3.8.0 or >v4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Input index (starts at 1), Bluetooth excluded

- id: external_input_v4_2
  label: External Input Selection (firmware v4.2.0+)
  kind: action
  command: "/Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: Format type-index (e.g. spdif-2); type can be spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "/audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player state from /Status response

- id: volume_level
  type: integer
  description: Volume level 0-100; -1 means fixed volume

- id: volume_db
  type: number
  description: Volume level in dB

- id: mute_state
  type: integer
  description: 1 if muted, 0 if unmuted

- id: shuffle_state
  type: integer
  description: 0 = off, 1 = on

- id: repeat_state
  type: integer
  description: 0 = repeat queue, 1 = repeat track, 2 = off

- id: sync_status
  type: object
  description: Player and group sync status from /SyncStatus response

- id: preset_list
  type: object
  description: List of presets from /Presets response

- id: playlist_status
  type: object
  description: Play queue status from /Playlist response
```

## Variables
```yaml
# UNRESOLVED: settable parameters beyond discrete commands not enumerated as separate actions in source
```

## Events
```yaml
# UNRESOLVED: source documents long-polling responses via /Status?timeout=... but does not describe unsolicited push notifications as separate event types
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences; remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings or interlock procedures
```

## Notes
HTTP GET requests are sent to http://player_ip:port/request (port 11000 by default). Responses are UTF-8 encoded XML. Long-polling available via /Status?timeout=N&etag=... and /SyncStatus?timeout=N&etag=... (recommended interval 100s for Status, 180s for SyncStatus; do not poll faster than once per 30s without long-polling). The CI580 chassis uses ports 11000, 11010, 11020, 11030 for its four streamer nodes. Actual port should be discovered via mDNS using musc.tcp and musp.tcp services. Section 13 (LSDP discovery) describes a UDP broadcast discovery protocol on port 11430 but is out of scope for HTTP control commands. Custom integration commands documented in version 1.7 of the BluOS Custom Integration API.

<!-- UNRESOLVED: LSDP discovery protocol (Section 13) binary message formats (Query, Announce, Delete) not enumerated as HTTP actions; described separately as a UDP protocol on port 11430. -->

## Provenance

```yaml
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluos.io
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/become-a-partner/
retrieved_at: 2026-06-07T20:52:55.756Z
last_checked_at: 2026-09-13T22:17:14.691Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:17:14.691Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec action literals found verbatim in source; transport (port 11000, HTTP GET, no auth) confirmed; source's 24 distinct endpoints are fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "settable parameters beyond discrete commands not enumerated as separate actions in source"
- "source documents long-polling responses via /Status?timeout=... but does not describe unsolicited push notifications as separate event types"
- "source does not describe multi-step macro sequences; remove section if not applicable"
- "source does not contain explicit safety warnings or interlock procedures"
- "LSDP discovery protocol (Section 13) binary message formats (Query, Announce, Delete) not enumerated as HTTP actions; described separately as a UDP protocol on port 11430."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
