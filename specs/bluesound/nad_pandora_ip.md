---
spec_id: admin/bluesound-nad-pandora
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Pandora Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD Pandora"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD Pandora"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://bluos.io/
retrieved_at: 2026-06-01T21:56:37.094Z
last_checked_at: 2026-09-13T22:18:20.414Z
generated_at: 2026-09-13T22:18:20.414Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific quirks for the Pandora model not documented in this API reference"
  - "feedback entries derivable from /Status, /SyncStatus, /Volume XML responses"
  - "variables are largely encoded as command parameters; the section"
  - "source describes long-poll change notifications but no formal"
  - "source does not define multi-step macros on the device."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "device-specific power-on/off (standby) commands for the Pandora model not documented in this CI API subset."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:18:20.414Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match the source HTTP endpoint catalogue with correct shapes; transport port 11000 confirmed; source command set essentially fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD Pandora Control Spec

## Summary
BluOS-powered network streamer for custom integration (CI). Spec covers the HTTP-based BluOS Custom Integration API: playback control, volume, play queue management, presets, content browsing/searching, player grouping, soft reboot, doorbell chime, and direct input selection. Protocol is HTTP over TCP.

<!-- UNRESOLVED: device-specific quirks for the Pandora model not documented in this API reference -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://{player_ip}:11000"
  port: 11000
  notes: "Default BluOS CI port; CI580 uses 11000/11010/11020/11030 per node. Discovered via mDNS services musc.tcp and musp.tcp."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from /reboot (soft reboot) command
- routable        # inferred from /Play?inputTypeIndex and /Play?url=... input selection
- queryable       # inferred from /Status, /SyncStatus, /Playlist, /Presets queries
- levelable       # inferred from /Volume (level, abs_db, db) commands
```

## Actions
```yaml
- id: get_status
  label: Get Playback Status
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: "Optional long-poll interval (recommended 100s; min 10s)"
    - name: etag
      type: string
      description: "Optional previous /Status etag for long polling"

- id: get_sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: "Optional long-poll interval (recommended 180s)"
    - name: etag
      type: string
      description: "Optional previous /SyncStatus etag"

- id: set_volume
  label: Set Volume
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: "Absolute volume 0..100"
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = apply to all grouped players"

- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: "Absolute volume in dB (within configured range, typically -80..0)"
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = apply to all grouped players"

- id: adjust_volume_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={on_off}"
  params:
    - name: delta_db
      type: number
      description: "Relative dB change (positive or negative); typical step 2dB"
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = apply to all grouped players"

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: "dB increase (typical 2)"

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: "dB decrease (typical 2)"

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
  label: Play With Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: "Seek position within current track"

- id: play_with_seek_and_track
  label: Play With Seek and Track ID
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: "Seek position within current track"
    - name: trackid
      type: integer
      description: "Track id in queue"

- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: "URL-encoded stream URL"

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
  label: Skip Next
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Skip Back
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
      description: "0 = off, 1 = on"

- id: repeat
  label: Set Repeat State
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  command: "GET /Action?service={service_name}&action={action_url}"
  params:
    - name: service_name
      type: string
      description: "Service id (e.g. Slacker)"
    - name: action_url
      type: string
      description: "URL taken from <action> element in /Status response"

- id: list_playlist
  label: List Tracks In Play Queue
  kind: query
  command: "GET /Playlist?length={length}"
  params:
    - name: length
      type: integer
      description: "Optional; 1 returns top-level attributes only"

- id: list_playlist_page
  label: List Play Queue (paginated)
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: "First entry index (0-based)"
    - name: last
      type: integer
      description: "Last entry index"

- id: delete_track
  label: Delete Track From Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: "Position in queue of track to remove"

- id: move_track
  label: Move Track In Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: "New track position"
    - name: origin
      type: integer
      description: "Old track position"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: save_queue
  label: Save Play Queue As Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: "Playlist name (URL encoded)"

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
      description: "Preset id, or +1 / -1 for next/previous preset"

- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse?key={key_value}"
  params:
    - name: key_value
      type: string
      description: "URL-encoded key from prior browseKey / nextKey / parentKey / contextMenuKey"

- id: browse_with_context_menu
  label: Browse With Inline Context Menu
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key_value
      type: string
      description: "URL-encoded key"
    - name: withContextMenuItems
      type: integer
      description: "Always 1"

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: "URL-encoded searchKey from earlier response"
    - name: searchText
      type: string
      description: "Search string"

- id: add_slave
  label: Add Secondary Player To Group
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: "IP of secondary player"
    - name: secondaryPlayerPort
      type: integer
      description: "Port of secondary player (default 11000)"
    - name: group
      type: string
      description: "Optional group name"

- id: add_slaves
  label: Add Multiple Secondary Players To Group
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: "Comma-separated secondary player IPs"
    - name: secondaryPlayerPorts
      type: string
      description: "Comma-separated secondary player ports"

- id: remove_slave
  label: Remove Secondary Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: "IP of player to remove"
    - name: secondaryPlayerPort
      type: integer
      description: "Port of player to remove"

- id: remove_slaves
  label: Remove Multiple Secondary Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: "Comma-separated IPs"
    - name: secondaryPlayerPorts
      type: string
      description: "Comma-separated ports"

- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params: []
  notes: "POST with form field yes=1 (any value)"

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: select_input_active
  label: Active Input Selection
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: "URL attribute from /RadioBrowse?service=Capture response"
  notes: "BluOS HUB inputs selection only supported by this command."

- id: select_input_external_v3_v4
  label: External Input Selection (firmware newer than v3.8.0 and older than v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: "Index (starts at 1) of inputs from /Settings?id=capture&shcemaVersion=32 (Bluetooth excluded)"

- id: select_input_type_index
  label: External Input Selection (firmware v4.2.0 or newer)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: "Format type-index, e.g. spdif-2. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone"

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"

- id: list_inputs
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: get_capture_settings
  label: Get Capture Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: feedback entries derivable from /Status, /SyncStatus, /Volume XML responses
# are extensive. Below are the principal scalar fields. Source describes XML response
# elements verbatim; implementation should consume the full XML payload.

- id: volume_percent
  type: integer
  source: "/Status, /SyncStatus, /Volume"
  description: "Current volume 0..100; -1 means fixed volume"

- id: volume_db
  type: number
  source: "/Status, /SyncStatus, /Volume"
  description: "Current volume in dB"

- id: mute_state
  type: enum
  values: [muted, unmuted]
  source: "/Status, /SyncStatus, /Volume"

- id: play_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: "/Status"

- id: shuffle_state
  type: enum
  values: [off, on]
  source: "/Status"

- id: repeat_state
  type: enum
  values: [queue, track, off]
  source: "/Status"

- id: player_name
  type: string
  source: "/SyncStatus"
  description: "Player name"

- id: player_model
  type: string
  source: "/SyncStatus"
  description: "Player model id"

- id: player_model_name
  type: string
  source: "/SyncStatus"
  description: "Player model name"

- id: player_brand
  type: string
  source: "/SyncStatus"
  description: "Player brand name"

- id: player_mac
  type: string
  source: "/SyncStatus"
  description: "Player MAC or unique id"

- id: group_name
  type: string
  source: "/SyncStatus"
  description: "Group name when player is primary"

- id: sleep_remaining_minutes
  type: integer
  source: "/Status"
  description: "Minutes remaining before sleep timer activates"

- id: stream_url
  type: string
  source: "/Status"
  description: "Opaque flag indicating play queue is not the source"
```

## Variables
```yaml
# Settable parameters from the source that are not discrete actions above.
# UNRESOLVED: variables are largely encoded as command parameters; the section
# is kept sparse.
```

## Events
```yaml
# UNRESOLVED: source describes long-poll change notifications but no formal
# event/push channel separate from /Status and /SyncStatus responses.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macros on the device.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- BluOS protocol used across Bluesound, NAD Electronics, DALI Loudspeakers and others; this spec covers the Custom Integration (CI) subset.
- All requests are HTTP GET with URL-encoded query parameters; responses are UTF-8 encoded XML.
- Default port 11000; CI580 uses 11000/11010/11020/11030 per node.
- Discovery: mDNS services `musc.tcp` and `musp.tcp`; Lenbrook also provides LSDP (UDP broadcast on port 11430) as a fallback discovery protocol (Appendix 13).
- Long polling: `/Status` recommended interval 100s (min 10s); `/SyncStatus` recommended 180s. Restrict to one request per resource per second.
- `/Play?inputIndex` valid for firmware newer than v3.8.0 and older than v4.2.0; `/Play?inputTypeIndex` valid for firmware v4.2.0 or newer.
- External inputs include spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.
- Grouping: secondary players proxy many requests (Status, Playback, Queue, Browse) to the primary player.

<!-- UNRESOLVED: device-specific power-on/off (standby) commands for the Pandora model not documented in this CI API subset. -->
```

Self-check: no voltages/ports/baud invented (port 11000 stated in source). `status: draft`, `declared_confidence: low`, `derived_from: vendor_manual` set. `entity_id` populated from input. Every action carries `command:` field with source payload. UNRESOLVED markers left where source silent.

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://bluos.io/
retrieved_at: 2026-06-01T21:56:37.094Z
last_checked_at: 2026-09-13T22:18:20.414Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:18:20.414Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match the source HTTP endpoint catalogue with correct shapes; transport port 11000 confirmed; source command set essentially fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific quirks for the Pandora model not documented in this API reference"
- "feedback entries derivable from /Status, /SyncStatus, /Volume XML responses"
- "variables are largely encoded as command parameters; the section"
- "source describes long-poll change notifications but no formal"
- "source does not define multi-step macros on the device."
- "source contains no explicit safety warnings, interlock procedures,"
- "device-specific power-on/off (standby) commands for the Pandora model not documented in this CI API subset."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
