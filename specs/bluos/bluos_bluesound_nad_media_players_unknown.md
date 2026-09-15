---
spec_id: admin/bluos-bluesound-nad-media-players
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Bluesound / NAD Media Players Control Spec"
manufacturer: BluOS
model_family: "BluOS Players"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS Players"
    - "Bluesound Players"
    - "NAD Media Players"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-22T15:38:02.168Z
last_checked_at: 2026-09-09T22:16:48.223Z
generated_at: 2026-09-09T22:16:48.223Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not enumerate specific model numbers beyond citing CI580 and PULSE P300 examples; the set of compatible models is assumed from document scope."
  - "no enumerator-style parameters in source; section omitted intentionally."
  - "no unsolicited event channel documented in source."
  - "source does not document any multi-step macro primitives. Group"
  - "source documents no interlock sequences"
  - "source contains no safety warnings, voltage/power specs, or"
  - "firmware compatibility range not stated per model; full set of compatible models not enumerated in source beyond scope title. Bluetooth behavior (per-mode restrictions noted for /Skip, /Back) is service-dependent, not a global constraint."
verification:
  verdict: verified
  checked_at: 2026-09-09T22:16:48.223Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match HTTP endpoints documented verbatim in the source; transport and shapes agree; source catalogue is fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# BluOS Bluesound / NAD Media Players Control Spec

## Summary
This spec covers BluOS-based media players (Bluesound and NAD product lines) controlled via the BluOS Custom Integration HTTP API. All requests are HTTP GET (or POST for /reboot) sent to `http://<player_ip>:<port>/<request>`, returning UTF-8 encoded XML. Default port is 11000; NAD CI580 uses 11000/11010/11020/11030 per node. Discovery is via mDNS services `musc.tcp` and `musp.tcp`, or via the custom Lenbrook Service Discovery Protocol (LSDP) over UDP 11430.

<!-- UNRESOLVED: source document does not enumerate specific model numbers beyond citing CI580 and PULSE P300 examples; the set of compatible models is assumed from document scope. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

```yaml
# LSDP discovery uses separate transport - emitted as informational note,
# not as a primary control protocol.
# protocols: [udp]
# addressing:
#   port: 11430
```

## Traits
```yaml
traits:
  - levelable       # /Volume command sets absolute, relative dB, mute
  - queryable       # /Status, /SyncStatus, /Playlist, /Presets return state
  - routable        # /Play?url / /Play?inputTypeIndex select inputs/sources
```

## Actions
```yaml
- id: status
  label: Get Playback Status
  kind: query
  command: "GET /Status?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: "Optional. Long-poll duration in seconds. Recommended 100, min 10."
    - name: etag
      type: string
      description: "Optional. etag from previous /Status response."

- id: sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={timeout}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: "Optional. Long-poll duration in seconds. Recommended 180."
    - name: etag
      type: string
      description: "Optional. etag from previous /SyncStatus response."

- id: set_volume_level
  label: Set Volume (0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: "Integer 0..100."
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = apply to all grouped players."

- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: "Absolute dB level."
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = apply to all grouped players."

- id: set_volume_delta_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: "Signed dB delta (positive = louder, negative = quieter)."
    - name: tell_slaves
      type: integer
      description: "0 = this player only, 1 = apply to all grouped players."

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
    - name: seconds
      type: integer
      description: "Position within current track. Requires /Status response totlen."

- id: play_with_seek_and_track
  label: Play at Seek in Track
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: "Position within track."
    - name: trackid
      type: integer
      description: "Track id from /Status song attribute."

- id: play_url
  label: Play URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: "URL-encoded stream URL."

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

- id: repeat_set
  label: Set Repeat Mode
  kind: action
  command: "GET /Repeat?state={mode}"
  params:
    - name: mode
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off."

- id: action_radio
  label: Radio Station Action (skip/love/ban/back)
  kind: action
  command: "GET /Action?service={service}&{action}={value}"
  params:
    - name: service
      type: string
      description: "Music service name, e.g. Slacker."
    - name: action
      type: string
      description: "Action name from <action> element in /Status: skip, back, love, ban."
    - name: value
      type: string
      description: "Action-specific identifier from /Status response."

- id: playlist_list
  label: List Play Queue Tracks
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: "First entry to include (0-based)."
    - name: last
      type: integer
      description: "Last entry to include."

- id: playlist_status
  label: Get Play Queue Status
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
      description: "Track position in queue (1-based)."

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: "New position."
    - name: origin
      type: integer
      description: "Old position."

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
      description: "Name for the saved playlist."

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
    - name: presetId
      type: string
      description: "Preset id, '+1' for next, '-1' for previous."

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: "URL-encoded browseKey / nextKey / parentKey / contextMenuKey from prior response. Omit for top level."
    - name: withContextMenuItems
      type: integer
      description: "1 to include inline context menu."

- id: browse_search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={searchKey}&q={searchText}"
  params:
    - name: searchKey
      type: string
      description: "searchKey from prior browse response."
    - name: searchText
      type: string
      description: "Search query."

- id: add_slave_single
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: "IP address of the secondary player."
    - name: secondaryPlayerPort
      type: integer
      description: "Port of the secondary player. Default 11000."
    - name: GroupName
      type: string
      description: "Optional group name."

- id: add_slaves_multi
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: "Comma-separated IP addresses."
    - name: secondaryPlayerPorts
      type: string
      description: "Comma-separated port numbers."

- id: remove_slave_single
  label: Ungroup One Secondary Player
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: "Secondary player IP."
    - name: secondaryPlayerPort
      type: integer
      description: "Secondary player port."

- id: remove_slaves_multi
  label: Ungroup Multiple Secondary Players
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: "Comma-separated secondary IPs."
    - name: secondaryPlayerPorts
      type: string
      description: "Comma-separated secondary ports."

- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot with parameter yes=1"
  params: []

- id: doorbell_chime
  label: Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: play_input_capture
  label: Select Active Input (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: "URL attribute from /RadioBrowse?service=Capture response."

- id: play_input_index_legacy
  label: Select External Input by Index (firmware >3.8.0 and <4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: "1-based index from /Settings?id=capture&schemaVersion=32. Bluetooth excluded."

- id: play_input_typeindex
  label: Select External Input by Type and Index (firmware >=4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={type}-{index}"
  params:
    - name: type
      type: string
      description: "spdif|analog|coax|bluetooth|arc|earc|phono|computer|aesebu|balanced|microphone"
    - name: index
      type: integer
      description: "1-based index for inputs of the same type."

- id: radio_browse
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: settings_capture
  label: Get Capture Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

- id: set_bluetooth_mode
  label: Set Bluetooth Autoplay Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled."
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: "From /Status <state> and post-action responses."

- id: volume_percent
  type: integer
  description: "0..100 (or -1 for fixed volume). From /Status and /SyncStatus."

- id: volume_db
  type: number
  description: "Volume in dB. From /Status <db>."

- id: mute_state
  type: boolean
  description: "From <mute> element."

- id: shuffle_state
  type: enum
  values: [0, 1]
  description: "0=off, 1=on."

- id: repeat_state
  type: enum
  values: [0, 1, 2]
  description: "0=queue, 1=track, 2=off."

- id: current_track_metadata
  type: object
  description: "title1/title2/title3, name, artist, album, quality, streamFormat from /Status."

- id: sync_stat
  type: string
  description: "Opaque id indicating /SyncStatus or /Status change."

- id: etag
  type: string
  description: "Opaque value used for long-polling change detection."

- id: group_name
  type: string
  description: "From /SyncStatus <group>."

- id: group_volume
  type: integer
  description: "Group volume 0..100 from /SyncStatus."
```

## Variables
```yaml
# Each preset and each entry in the play queue is identifiable by id but the API does not
# expose them as generic addressable parameters beyond id-based queries.
# UNRESOLVED: no enumerator-style parameters in source; section omitted intentionally.
```

## Events
```yaml
# The BluOS API is request/response; the device pushes no unsolicited events.
# Long-polling to /Status and /SyncStatus is the source's documented change-detection
# mechanism, not a true push event channel.
# UNRESOLVED: no unsolicited event channel documented in source.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro primitives. Group
# teardown on removing a primary player of 3+ is described behavior, not a
# user-defined macro. No section content to enumerate.
```

## Safety
```yaml
confirmation_required_for:
  - reboot            # POST /reboot restarts the player; affects availability
interlocks: []         # UNRESOLVED: source documents no interlock sequences
# UNRESOLVED: source contains no safety warnings, voltage/power specs, or
# power-on sequencing requirements. /reboot is the only state-disruptive action.
```

## Notes
- All endpoints accept HTTP GET and return UTF-8 XML. /reboot is the only documented POST endpoint.
- Default TCP port 11000; NAD CI580 uses 11010/11020/11030 for nodes 2/3/4. Discover actual port via mDNS services `musc.tcp` and `musp.tcp` or via LSDP.
- Polling discipline: regular poll ≤ once per 30 s; long-poll ≥ 1 s between requests for the same resource.
- Long-poll returns early only on `etag` change; track position (`secs`) does not trigger it.
- Volumes below 0 dB floor of the player's configured range are clamped; floor is typically -80..0 dB and is set in the BluOS Controller app.
- Two `/Play` input-selection forms coexist: `inputIndex` (firmware between v3.8.0 and v4.2.0) and `inputTypeIndex` (firmware v4.2.0+). Pick based on deployed firmware.
- LSDP (Lenbrook Service Discovery Protocol) runs over UDP broadcast on port 11430 and is documented in §13 of the source. It is a discovery-only side-channel, not a control transport, so it is not included in `protocols`.

<!-- UNRESOLVED: firmware compatibility range not stated per model; full set of compatible models not enumerated in source beyond scope title. Bluetooth behavior (per-mode restrictions noted for /Skip, /Back) is service-dependent, not a global constraint. -->
```

Spec written.

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-22T15:38:02.168Z
last_checked_at: 2026-09-09T22:16:48.223Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:16:48.223Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match HTTP endpoints documented verbatim in the source; transport and shapes agree; source catalogue is fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not enumerate specific model numbers beyond citing CI580 and PULSE P300 examples; the set of compatible models is assumed from document scope."
- "no enumerator-style parameters in source; section omitted intentionally."
- "no unsolicited event channel documented in source."
- "source does not document any multi-step macro primitives. Group"
- "source documents no interlock sequences"
- "source contains no safety warnings, voltage/power specs, or"
- "firmware compatibility range not stated per model; full set of compatible models not enumerated in source beyond scope title. Bluetooth behavior (per-mode restrictions noted for /Skip, /Back) is service-dependent, not a global constraint."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
